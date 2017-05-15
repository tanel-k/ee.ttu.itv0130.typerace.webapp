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
define('lib/message-types',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var CONNECT_RESPONSE = exports.CONNECT_RESPONSE = 'CONNECT_RESPONSE';
  var SET_NICKNAME_RESPONSE = exports.SET_NICKNAME_RESPONSE = 'SET_NICKNAME_RESPONSE';
  var BROADCAST_WORD = exports.BROADCAST_WORD = 'BROADCAST_WORD';
  var TYPE_WORD_RESPONSE = exports.TYPE_WORD_RESPONSE = 'TYPE_WORD_RESPONSE';
  var TERMINATE_GAME = exports.TERMINATE_GAME = 'TERMINATE_GAME';
  var WORD_MISMATCH = exports.WORD_MISMATCH = 'WORD_MISMATCH';
  var ROUND_WON = exports.ROUND_WON = 'ROUND_WON';
  var ROUND_LOST = exports.ROUND_LOST = 'ROUND_LOST';

  var SET_NICKNAME = exports.SET_NICKNAME = 'SET_NICKNAME';
  var JOIN_GAME = exports.JOIN_GAME = 'JOIN_GAME';
  var TYPE_WORD = exports.TYPE_WORD = 'TYPE_WORD';
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
define('resources/index',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;
  function configure(config) {
    config.globalResources(['./attributes/key-return', './attributes/take-focus', './attributes/no-select', './elements/ui-wrappers/bs-row']);
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

  var _dec, _class, _desc, _value, _class2, _descriptor, _descriptor2;

  var GameContainer = exports.GameContainer = (_dec = (0, _aureliaFramework.inject)(Element, _dataApi.DataAPI, _connectionApi.ConnectionAPI), _dec(_class = (_class2 = function () {
    function GameContainer(element, dataAPI, connectionAPI) {
      _classCallCheck(this, GameContainer);

      _initDefineProp(this, 'currentNickname', _descriptor, this);

      _initDefineProp(this, 'word', _descriptor2, this);

      this.element = element;
      this.dataAPI = dataAPI;
      this.connectionAPI = connectionAPI;
    }

    GameContainer.prototype.attached = function attached() {
      this.audioBank = {
        victoryDing: new Audio('media/audio/victory-ding.ogg'),
        lossDing: new Audio('media/audio/loss-ding.ogg'),
        closeItem: new Audio('media/audio/close-item.ogg'),
        loserPointDing: new Audio('media/audio/loser-point-ding.ogg'),
        winnerPointDing: new Audio('media/audio/winner-point-ding.ogg'),
        wordMismatch: new Audio('media/audio/word-mismatch.ogg'),
        joinGame: new Audio('media/audio/join-game.ogg'),
        opponentFound: new Audio('media/audio/opponent-found.ogg')
      };

      this.initStateModel();
      this.initDOMHooks();
      this.attachDOMListeners();

      this.connectToServer();
    };

    GameContainer.prototype.detached = function detached() {
      this.detachDOMListeners();
    };

    GameContainer.prototype.initStateModel = function initStateModel() {
      this.isConnectingToServer = false;
      this.isSettingNickname = false;
      this.isWaitingForOpponent = false;
      this.isCheckingWord = false;

      this.showWinStatus = false;
      this.canJoinGame = false;
      this.canDisplayTutorial = false;

      this.sessionId = null;
      this.didWin = null;
      this.isNicknameSet = false;
      this.loadingText = null;
      this.currentScore = 0;
    };

    GameContainer.prototype.initDOMHooks = function initDOMHooks() {
      var _this = this;

      this.getVictoryBanner = function () {
        return _this.element.querySelector('#victory-banner');
      };
    };

    GameContainer.prototype.attachDOMListeners = function attachDOMListeners() {};

    GameContainer.prototype.detachDOMListeners = function detachDOMListeners() {};

    GameContainer.prototype.connectToServer = function connectToServer() {
      var serverSocket = this.serverSocket = this.connectionAPI.getGameSocketConnection();
      this.hookUpServerSocket(serverSocket);
    };

    GameContainer.prototype.hookUpServerSocket = function hookUpServerSocket(serverSocket) {
      var _this2 = this;

      this.isConnectingToServer = true;
      this.loadingText = 'Connecting to server...';
      serverSocket.onopen = function (event) {
        _this2.isConnectingToServer = false;
      };

      serverSocket.onclose = function (event) {};

      serverSocket.onmessage = function (event) {
        var data = JSON.parse(event.data);
        console.log(data);
        switch (data.type) {
          case MessageTypes.CONNECT_RESPONSE:
            _this2.handleConnectResponse(data);
            break;
          case MessageTypes.SET_NICKNAME_RESPONSE:
            _this2.handleSetNicknameResponse(data);
            break;
          case MessageTypes.BROADCAST_WORD:
            _this2.handleBroadcastWord(data);
            break;
          case MessageTypes.TYPE_WORD_RESPONSE:
            _this2.handleTypeWordResponse(data);
            break;
          case MessageTypes.TERMINATE_GAME:
            _this2.handleTerminateGame(data);
            break;
          default:
            break;
        }
      };
    };

    GameContainer.prototype.handleConnectResponse = function handleConnectResponse(data) {
      this.sessionId = data.sessionId;
    };

    GameContainer.prototype.handleSetNicknameResponse = function handleSetNicknameResponse(data) {
      this.isSettingNickname = false;
      this.isNicknameSet = true;

      this.canDisplayTutorial = true;
      this.canJoinGame = true;
      this.isInGame = false;
    };

    GameContainer.prototype.handleBroadcastWord = function handleBroadcastWord(data) {
      playAudio(this.audioBank.opponentFound);

      this.isWaitingForOpponent = false;
      this.currentWord = data.word;
      this.currentOpponent = data.opponentNickname;
      this.isInGame = true;
      this.hasNotSentWord = true;
    };

    GameContainer.prototype.handleTypeWordResponse = function handleTypeWordResponse(data) {
      this.isCheckingWord = false;
      switch (data.gameMessageType) {
        case MessageTypes.WORD_MISMATCH:
          this.handleWordMismatch();
          break;
        case MessageTypes.ROUND_WON:
          this.handleRoundWon(data);
          break;
        case MessageTypes.ROUND_LOST:
          this.handleRoundLost(data);
          break;
        default:
          break;
      }
    };

    GameContainer.prototype.handleWordMismatch = function handleWordMismatch() {
      playAudio(this.audioBank.wordMismatch);
    };

    GameContainer.prototype.handleRoundWon = function handleRoundWon(data) {
      var _this3 = this;

      playAudio(this.audioBank.victoryDing);
      this.showWinStatus = true;
      this.didWin = true;

      var victoryBanner = this.getVictoryBanner();
      victoryBanner.classList.remove('fadeOut');
      setTimeout(function () {
        victoryBanner.classList.add('fadeOut');
        setTimeout(function () {
          _this3.showWinStatus = false;
          _this3.didWin = null;
        }, 500);
      }, 1000);
    };

    GameContainer.prototype.handleRoundLost = function handleRoundLost(data) {
      var _this4 = this;

      playAudio(this.audioBank.lossDing);
      this.showWinStatus = true;
      this.didWin = false;
      var victoryBanner = this.getVictoryBanner();

      victoryBanner.classList.remove('fadeOut');
      setTimeout(function () {
        victoryBanner.classList.add('fadeOut');
        setTimeout(function () {
          _this4.showWinStatus = false;
          _this4.didWin = null;
        }, 500);
      }, 1000);
    };

    GameContainer.prototype.handleTerminateGame = function handleTerminateGame(data) {};

    GameContainer.prototype.handleSetNicknameClick = function handleSetNicknameClick() {
      playAudio(this.audioBank.closeItem);
      this.setNickname();
    };

    GameContainer.prototype.handleJoinGameClick = function handleJoinGameClick() {
      playAudio(this.audioBank.joinGame);
      this.joinGame();
    };

    GameContainer.prototype.handleWordSubmit = function handleWordSubmit() {
      if (this.canSubmitWord) {
        this.sendWord();
      }
    };

    GameContainer.prototype.setNickname = function setNickname() {
      this.loadingText = 'Setting nickname...';
      this.isSettingNickname = true;
      var nickname = this.currentNickname;
      var message = constructMessage(MessageTypes.SET_NICKNAME, { nickname: nickname });
      this.sendToServer(message);
    };

    GameContainer.prototype.joinGame = function joinGame() {
      this.loadingText = 'Waiting for an opponent...';
      this.isWaitingForOpponent = true;
      this.canDisplayTutorial = false;
      this.canJoinGame = false;
      var message = constructMessage(MessageTypes.JOIN_GAME);
      this.sendToServer(message);
    };

    GameContainer.prototype.sendWord = function sendWord() {
      this.isCheckingWord = true;
      var message = constructMessage(MessageTypes.TYPE_WORD, { word: this.word });
      this.sendToServer(message);
    };

    GameContainer.prototype.sendToServer = function sendToServer(message) {
      sendMessage(this.serverSocket, message);
    };

    _createClass(GameContainer, [{
      key: 'showLoadingBanner',
      get: function get() {
        return this.isConnectingToServer || !this.sessionId || this.isSettingNickname || this.isWaitingForOpponent;
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
    }, {
      key: 'showTutorial',
      get: function get() {
        return this.canDisplayTutorial;
      }
    }, {
      key: 'showJoinGameForm',
      get: function get() {
        return this.canJoinGame;
      }
    }, {
      key: 'showGameArea',
      get: function get() {
        return this.isInGame;
      }
    }, {
      key: 'canSubmitWord',
      get: function get() {
        return !(0, _stringUtils.isEmpty)(this.word);
      }
    }, {
      key: 'isWordInputDisabled',
      get: function get() {
        return this.isCheckingWord;
      }
    }]);

    return GameContainer;
  }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'currentNickname', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: function initializer() {
      return '';
    }
  }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'word', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: function initializer() {
      return '';
    }
  })), _class2)) || _class);


  var playAudio = function playAudio(audioNode) {
    audioNode.cloneNode().play();
  };

  var sendMessage = function sendMessage(socket, message) {
    socket.send(JSON.stringify(message));
  };

  var constructMessage = function constructMessage(type) {
    var content = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

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
define('resources/elements/ui-wrappers/bs-row',['exports', 'aurelia-framework'], function (exports, _aureliaFramework) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.BsRow = undefined;

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

  var _class, _desc, _value, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4;

  var DEFAULT_SIZE = 12;

  var BsRow = exports.BsRow = (0, _aureliaFramework.containerless)(_class = (_class2 = function () {
    function BsRow() {
      _classCallCheck(this, BsRow);

      _initDefineProp(this, 'lg', _descriptor, this);

      _initDefineProp(this, 'md', _descriptor2, this);

      _initDefineProp(this, 'sm', _descriptor3, this);

      _initDefineProp(this, 'xs', _descriptor4, this);
    }

    BsRow.prototype.attached = function attached() {};

    return BsRow;
  }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'lg', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: function initializer() {
      return DEFAULT_SIZE;
    }
  }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'md', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: function initializer() {
      return DEFAULT_SIZE;
    }
  }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, 'sm', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: function initializer() {
      return DEFAULT_SIZE;
    }
  }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, 'xs', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: function initializer() {
      return DEFAULT_SIZE;
    }
  })), _class2)) || _class;
});
define('resources/attributes/no-select',['exports', 'aurelia-framework'], function (exports, _aureliaFramework) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.NoSelect = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _dec2, _class;

  var NoSelect = exports.NoSelect = (_dec = (0, _aureliaFramework.customAttribute)('no-select'), _dec2 = (0, _aureliaFramework.inject)(Element), _dec(_class = _dec2(_class = function () {
    function NoSelect(element) {
      _classCallCheck(this, NoSelect);

      this.element = element;
    }

    NoSelect.prototype.attached = function attached() {
      var element = this.element;
      if (!element.style) {
        element.style = {};
      }

      element.style['user-select'] = 'none';
      element.style['-webkit-user-select'] = 'none';
      element.style['-moz-user-select'] = 'none';
      element.style['-ms-user-select'] = 'none';
      element.style.cursor = 'default';
    };

    return NoSelect;
  }()) || _class) || _class);
});
define('text!app.html', ['module'], function(module) { module.exports = "<template><router-view></router-view></template>"; });
define('text!containers/game-container/game-container.html', ['module'], function(module) { module.exports = "<template><require from=\"./game-container.css\"></require><require from=\"../../styles/utility-styles.css\"></require><div class=\"container\"><div class=\"page-header\" no-select><bs-row lg=\"8\" md=\"7\" sm=\"6\"><h1><img style=\"width:50px;height:50px\" src=\"icon.png\"> Typerace</h1></bs-row></div><bs-row if.bind=\"showLoadingBanner\"><h3 no-select><i class=\"fa fa-circle-o-notch fa-spin\"></i> ${loadingText}</h3></bs-row><bs-row if.bind=\"showNicknameForm\"><div class=\"form-group\"><h6>Provide a nickname<input take-focus key-return.call=\"handleSetNicknameClick()\" class=\"form-control\" type=\"text\" value.bind=\"currentNickname\" placeholder=\"\"></h6></div><button click.trigger=\"handleSetNicknameClick()\" disabled.bind=\"!canSetNickname\" class=\"btn btn-primary btn-block\">Begin</button></bs-row><bs-row if.bind=\"showTutorial\"><p>TODO!</p></bs-row><bs-row if.bind=\"showJoinGameForm\"><button class=\"btn btn-success btn-block\" click.trigger=\"handleJoinGameClick()\">${showTutorial ? 'Got it!' : 'Join game'}</button></bs-row><bs-row><h4 no-select class=\"text-right\">Score: <span id=\"score-container\"><i class=\"fa fa-star\"></i> ${currentScore}</span></h4></bs-row><bs-row if.bind=\"showGameArea ||true\"><div class=\"animated fadeIn pulse\" if.bind=\"true\"><div no-select><h2 class=\"text-center\"><small>Challenge:</small></h2><h2 class=\"text-center\"><em>${currentWord}aaaaa</em></h2></div><input take-focus type=\"text\" key-return.call=\"handleWordSubmit()\" class=\"form-control\" disabled.bind=\"isWordInputDisabled\" value.bind=\"word\"></div></bs-row><bs-row><div id=\"victory-banner\" no-select class=\"animated fadeIn ${!showWinStatus ? 'hidden' : ''}\"><h2 class=\"text-center ${didWin ? 'victory-text' : 'loss-text'}\"><strong>${didWin ? 'You won!' : 'You lost!'}</strong></h2></div></bs-row></div></template>"; });
define('text!resources/elements/ui-wrappers/bs-row.html', ['module'], function(module) { module.exports = "<template><div class=\"row\"><div class=\"col-xs-${xs} col-sm-${sm} col-md-${md} col-lg-${lg}\"><slot></slot></div></div></template>"; });
define('text!containers/game-container/game-container.css', ['module'], function(module) { module.exports = ".victory-text {\r\n  color: yellowgreen;\r\n}\r\n\r\n.loss-text {\r\n  color: palevioletred;\r\n}\r\n\r\n#score-container {\r\n  color: gold;\r\n}\r\n"; });
define('text!styles/utility-styles.css', ['module'], function(module) { module.exports = ""; });
define('text!resources/attributes/no-select.html', ['module'], function(module) { module.exports = "<template><require from=\"./no-select.css\"></require></template>"; });
define('text!resources/attributes/no-select.css', ['module'], function(module) { module.exports = ""; });
//# sourceMappingURL=app-bundle.js.map