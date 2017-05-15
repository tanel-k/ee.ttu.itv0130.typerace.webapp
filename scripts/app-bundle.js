define('app',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var App = exports.App = function () {
    function App() {
      _classCallCheck(this, App);
    }

    App.prototype.configureRouter = function configureRouter(cfg, router) {
      this.router = router;
      cfg.title = 'Typerace';

      cfg.map([{
        route: '',
        name: 'game',
        moduleId: 'containers/game-container/game-container'
      }]);
    };

    return App;
  }();
});
define('environment',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    debug: true,
    testing: true,
    gatewayRootURL: 'https://localhost:8081',
    socketRootURL: 'ws://localhost:8081'
  };
});
define('main',['exports', './environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;

  var _environment2 = _interopRequireDefault(_environment);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  Promise.config({
    warnings: {
      wForgottenReturn: false
    }
  });

  function configure(aurelia) {
    aurelia.use.standardConfiguration().feature('resources');

    if (_environment2.default.debug) {
      aurelia.use.developmentLogging();
    }

    if (_environment2.default.testing) {
      aurelia.use.plugin('aurelia-testing');
    }

    aurelia.start().then(function () {
      return aurelia.setRoot();
    });
  }
});
define('resources/index',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;
  function configure(config) {
    config.globalResources(['./attributes/key-return', './attributes/take-focus']);
  }
});
define('containers/game-container/game-container',['exports', 'aurelia-framework', '../../gateways/data/data-api', '../../gateways/connection/connection-api', '../../lib/string-utils', '../../lib/message-types'], function (exports, _aureliaFramework, _dataApi, _connectionApi, _stringUtils, _messageTypes) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.GameContainer = undefined;

  var MessageTypes = _interopRequireWildcard(_messageTypes);

  function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) {
      return obj;
    } else {
      var newObj = {};

      if (obj != null) {
        for (var key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
        }
      }

      newObj.default = obj;
      return newObj;
    }
  }

  var _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  function _initDefineProp(target, property, descriptor, context) {
    if (!descriptor) return;
    Object.defineProperty(target, property, {
      enumerable: descriptor.enumerable,
      configurable: descriptor.configurable,
      writable: descriptor.writable,
      value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
    });
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  function _initializerWarningHelper(descriptor, context) {
    throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
  }

  var _dec, _class, _desc, _value, _class2, _descriptor;

  var GameContainer = exports.GameContainer = (_dec = (0, _aureliaFramework.inject)(Element, _dataApi.DataAPI, _connectionApi.ConnectionAPI), _dec(_class = (_class2 = function () {
    function GameContainer(element, dataAPI, connectionAPI) {
      _classCallCheck(this, GameContainer);

      _initDefineProp(this, 'currentNickname', _descriptor, this);

      this.element = element;
      this.dataAPI = dataAPI;
      this.connectionAPI = connectionAPI;
    }

    GameContainer.prototype.attached = function attached() {
      this.initStateModel();
      this.initDOMHooks();
      this.attachDOMListeners();

      this.connectToServer();
    };

    GameContainer.prototype.detached = function detached() {
      this.detachDOMListeners();
    };

    GameContainer.prototype.connectToServer = function connectToServer() {
      var serverSocket = this.serverSocket = this.connectionAPI.getGameSocketConnection();
      this.hookUpServerSocket(serverSocket);
    };

    GameContainer.prototype.hookUpServerSocket = function hookUpServerSocket(serverSocket) {
      var _this = this;

      this.isConnectingToServer = true;
      this.loadingText = 'Connecting to server...';
      serverSocket.onopen = function (event) {
        _this.isConnectingToServer = false;
      };
      serverSocket.onmessage = function (event) {
        var data = JSON.parse(event.data);
        switch (data.type) {
          case MessageTypes.CONNECT_RESPONSE:
            _this.handleConnectResponse(data);
            break;
          case MessageTypes.SET_NICKNAME_RESPONSE:
            _this.handleSetNicknameResponse(data);
            break;
          default:
            break;
        }
        console.log(data);
      };
    };

    GameContainer.prototype.handleConnectResponse = function handleConnectResponse(data) {
      this.sessionId = data.sessionId;
    };

    GameContainer.prototype.handleSetNicknameResponse = function handleSetNicknameResponse(data) {
      this.isSettingNickname = false;
      this.isNicknameSet = true;
    };

    GameContainer.prototype.setNickname = function setNickname() {
      this.loadingText = 'Setting nickname...';
      this.isSettingNickname = true;
      var nickname = this.currentNickname;
      var message = constructMessage(MessageTypes.SET_NICKNAME, { nickname: nickname });
      this.sendToServer(message);
    };

    GameContainer.prototype.initStateModel = function initStateModel() {
      this.isConnectingToServer = false;
      this.isSettingNickname = false;

      this.sessionId = null;
      this.isNicknameSet = false;
    };

    GameContainer.prototype.initDOMHooks = function initDOMHooks() {};

    GameContainer.prototype.attachDOMListeners = function attachDOMListeners() {};

    GameContainer.prototype.detachDOMListeners = function detachDOMListeners() {};

    GameContainer.prototype.sendToServer = function sendToServer(message) {
      sendMessage(this.serverSocket, message);
    };

    _createClass(GameContainer, [{
      key: 'showLoadingBanner',
      get: function get() {
        return this.isConnectingToServer || !this.sessionId || this.isSettingNickname;
      }
    }, {
      key: 'showNicknameForm',
      get: function get() {
        return !this.isConnectingToServer && !this.isNicknameSet;
      }
    }, {
      key: 'canSetNickname',
      get: function get() {
        return !(0, _stringUtils.isEmpty)(this.currentNickname);
      }
    }]);

    return GameContainer;
  }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'currentNickname', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: function initializer() {
      return '';
    }
  })), _class2)) || _class);


  var sendMessage = function sendMessage(socket, message) {
    socket.send(JSON.stringify(message));
  };

  var constructMessage = function constructMessage(type, content) {
    return _extends({
      type: type
    }, content);
  };
});
define('gateways/connection/connection-api',['exports', '../../environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.ConnectionAPI = undefined;

  var _environment2 = _interopRequireDefault(_environment);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var ConnectionAPI = exports.ConnectionAPI = function () {
    function ConnectionAPI() {
      _classCallCheck(this, ConnectionAPI);

      this.socketRootURL = _environment2.default.socketRootURL;
    }

    ConnectionAPI.prototype.getGameSocketConnection = function getGameSocketConnection() {
      return new WebSocket(this.socketRootURL + '/game');
    };

    return ConnectionAPI;
  }();
});
define('gateways/data/data-api',['exports', 'aurelia-framework', 'aurelia-http-client', '../../environment'], function (exports, _aureliaFramework, _aureliaHttpClient, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.DataAPI = undefined;

  var _environment2 = _interopRequireDefault(_environment);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var DataAPI = exports.DataAPI = (_dec = (0, _aureliaFramework.inject)(_aureliaHttpClient.HttpClient), _dec(_class = function () {
    function DataAPI(client) {
      _classCallCheck(this, DataAPI);

      this.client = client.configure(function (cfg) {
        return cfg.withBaseUrl(_environment2.default.gatewayRootURL);
      });
    }

    DataAPI.prototype.getScoreRequest = function getScoreRequest(sessionId) {
      return this.client.createRequest('/scores/' + sessionId).asGet();
    };

    return DataAPI;
  }()) || _class);
});
define('lib/game-logic',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var MSG_TYPE_CONNECT_RESPONSE = exports.MSG_TYPE_CONNECT_RESPONSE = 'CONNECT_RESPONSE';
});
define('lib/message-types',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var CONNECT_RESPONSE = exports.CONNECT_RESPONSE = 'CONNECT_RESPONSE';
  var SET_NICKNAME_RESPONSE = exports.SET_NICKNAME_RESPONSE = 'SET_NICKNAME_RESPONSE';

  var SET_NICKNAME = exports.SET_NICKNAME = 'SET_NICKNAME';
  var JOIN_GAME = exports.JOIN_GAME = 'JOIN_GAME';
});
define('resources/attributes/key-return',['exports', 'aurelia-framework'], function (exports, _aureliaFramework) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.KeyReturn = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _dec2, _class;

  var KeyReturn = exports.KeyReturn = (_dec = (0, _aureliaFramework.customAttribute)('key-return'), _dec2 = (0, _aureliaFramework.inject)(Element), _dec(_class = _dec2(_class = function () {
    function KeyReturn(element) {
      var _this = this;

      _classCallCheck(this, KeyReturn);

      this.enterPressed = function () {};

      this.element = element;

      this.enterPressed = function (e) {
        var key = e.which || e.keyCode;
        if (key === 13) {
          _this.value();
        }
      };
    }

    KeyReturn.prototype.attached = function attached() {
      this.element.addEventListener('keypress', this.enterPressed);
    };

    KeyReturn.prototype.detached = function detached() {
      this.element.removeEventListener('keypress', this.enterPressed);
    };

    return KeyReturn;
  }()) || _class) || _class);
});
define('lib/utils',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.isEmpty = isEmpty;
  function isEmpty(val) {
    return !val || !val.trim();
  }
});
define('lib/string-utils',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.isEmpty = isEmpty;
  function isEmpty(val) {
    return !val || !val.trim();
  }
});
define('resources/attributes/take-focus',['exports', 'aurelia-framework'], function (exports, _aureliaFramework) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.KeyReturn = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _dec2, _class;

  var KeyReturn = exports.KeyReturn = (_dec = (0, _aureliaFramework.customAttribute)('take-focus'), _dec2 = (0, _aureliaFramework.inject)(Element), _dec(_class = _dec2(_class = function () {
    function KeyReturn(element) {
      _classCallCheck(this, KeyReturn);

      this.element = element;
    }

    KeyReturn.prototype.attached = function attached() {
      this.element.focus();
    };

    return KeyReturn;
  }()) || _class) || _class);
});
define('text!app.html', ['module'], function(module) { module.exports = "<template><router-view></router-view></template>"; });
define('text!containers/game-container/game-container.html', ['module'], function(module) { module.exports = "<template><div class=\"container\"><div class=\"page-header\"><div class=\"row\"><div class=\"col-lg-8 col-md-7 col-sm-6\"><h1>Typerace</h1></div></div></div><div class=\"row\" if.bind=\"showLoadingBanner\"><div class=\"col-md-12\"><h3><i class=\"fa fa-circle-o-notch fa-spin\"></i> ${loadingText}</h3></div></div><div class=\"row\" if.bind=\"showNicknameForm\"><div class=\"col-md-12\"><div class=\"form-group\"><h6>Provide a nickname<input take-focus key-return.call=\"setNickname()\" class=\"form-control\" type=\"text\" value.bind=\"currentNickname\" placeholder=\"\"></h6></div><button click.trigger=\"setNickname()\" disabled.bind=\"!canSetNickname\" class=\"btn btn-primary btn-block\">Begin</button></div></div></div></template>"; });
//# sourceMappingURL=app-bundle.js.map