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
define('containers/game-container/game-container',['exports', 'aurelia-framework', '../../gateways/data/data-api', '../../gateways/connection/connection-api', '../../lib/string-utils', '../../lib/message-types', 'jquery', 'jquery-ui-dist'], function (exports, _aureliaFramework, _dataApi, _connectionApi, _stringUtils, _messageTypes) {
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
        opponentFound: new Audio('media/audio/opponent-found.ogg'),
        opponentLeft: new Audio('media/audio/opponent-left.ogg')
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
      this.isWaitingForNextRound = false;
      this.isCheckingWord = false;
      this.hasJoinedGameAtLeastOnce = false;

      this.isInRound = true;
      this.showWinStatus = false;
      this.showMessageBanner = false;
      this.canJoinGame = false;
      this.canDisplayTutorial = false;

      this.currentOpponent = null;
      this.sessionId = null;
      this.didWin = null;
      this.isNicknameSet = false;
      this.loadingText = null;
      this.currentMessage = null;
      this.challengeWaitText = null;
      this.currentScore = 0;
    };

    GameContainer.prototype.initDOMHooks = function initDOMHooks() {
      var _this = this;

      this.getVictoryBanner = function () {
        return _this.element.querySelector('#victory-banner');
      };
      this.getMessageBanner = function () {
        return _this.element.querySelector('#message-banner');
      };
      this.getScoreWrapper = function () {
        return _this.element.querySelector('#score-wrapper');
      };
      this.getVictoryTextContainer = function () {
        return _this.element.querySelector('#victory-text-container');
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

      this.hasJoinedGameAtLeastOnce = true;
      this.isWaitingForOpponent = false;
      this.isWaitingForNextRound = false;
      this.isInRound = true;
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
      if (this.messageBannerHideTimeout) {
        clearTimeout(this.messageBannerHideTimeout);
      }

      playAudio(this.audioBank.wordMismatch);
      this.flashMessage('Try again!', 1000);
    };

    GameContainer.prototype.handleRoundWon = function handleRoundWon(data) {
      this.handleRoundEnd(data, true);
    };

    GameContainer.prototype.handleRoundLost = function handleRoundLost(data) {
      this.handleRoundEnd(data, false);
    };

    GameContainer.prototype.handleTerminateGame = function handleTerminateGame(data) {
      var _this3 = this;

      playAudio(this.audioBank.opponentLeft);
      this.isInGame = false;
      this.isInRound = false;
      this.currentOpponent = null;
      this.flashMessage('Your opponent left!', 2000);
      setTimeout(function () {
        return _this3.canJoinGame = true;
      }, 2000);
    };

    GameContainer.prototype.handleRoundEnd = function handleRoundEnd(data, victory) {
      var _this4 = this;

      if (victory) {
        playAudio(this.audioBank.victoryDing);
      } else {
        playAudio(this.audioBank.lossDing);
      }

      this.showMessageBanner = false;
      this.isInRound = false;
      this.showWinStatus = true;
      this.challengeWaitText = victory ? 'Waiting for opponent to finish...' : 'Waiting for next challenge...';
      this.didWin = victory;
      this.typedWord = '';

      var victoryBanner = this.getVictoryBanner();
      victoryBanner.classList.remove('fadeOut');

      setTimeout(function () {
        return _this4.transferPoints(data.playerScore, victory);
      }, 500);

      setTimeout(function () {
        victoryBanner.classList.add('fadeOut');
        setTimeout(function () {
          _this4.showWinStatus = false;
          _this4.isWaitingForNextRound = true;
          _this4.didWin = null;
        }, 500);
      }, 1000);
    };

    GameContainer.prototype.transferPoints = function transferPoints(points, victory) {
      var _this5 = this;

      var scoreWrapper = this.getScoreWrapper();
      var victoryTextContainer = this.getVictoryTextContainer();

      var $scoreWrapper = $(scoreWrapper);
      var $victoryTextContainer = $(victoryTextContainer);

      var startTopOffset = $victoryTextContainer.offset().top + 20;
      var startLeftOffset = $victoryTextContainer.offset().left + 85;
      var endTopOffset = $scoreWrapper.offset().top;
      var endLeftOffset = $scoreWrapper.offset().left;
      var starIcon = document.createElement('i');
      var pointsDiv = document.createElement('div');

      var pointsDivCss = {
        color: 'green',
        'font-weight': 'bold',
        'font-size': '13px'
      };
      pointsDiv.css = pointsDivCss;

      starIcon.classList.add('fa');
      starIcon.classList.add('fa-star');
      var starIconCss = {
        'font-size': '24px',
        position: 'absolute'
      };
      starIcon.style = starIconCss;

      var moveStar = function moveStar(color, amount) {
        var $starIcon = $(starIcon.cloneNode());
        $starIcon.offset({
          top: startTopOffset,
          left: startLeftOffset
        }).css(Object.assign({
          opacity: '0.5',
          color: color,
          position: 'absolute',
          'z-index': '100'
        }, starIconCss)).appendTo($('body')).animate({
          'top': endTopOffset,
          'left': endLeftOffset
        }, 500, 'easeInOutExpo', function () {
          if (victory) {
            playAudio(_this5.audioBank.winnerPointDing);
          } else {
            playAudio(_this5.audioBank.loserPointDing);
          }

          $scoreWrapper.effect('bounce', { times: victory ? 2 : 1 }, 100);
          $starIcon.remove();
          _this5.currentScore += amount;
          var $pointsDiv = $(pointsDiv.cloneNode());
          $pointsDiv.text('+' + amount).css(Object.assign({
            opacity: '0.5',
            color: color,
            position: 'absolute',
            'z-index': '100'
          }, pointsDivCss)).offset({
            top: endTopOffset,
            left: endLeftOffset
          }).appendTo($('body')).addClass('animated fadeOutUp');
          setTimeout(function () {
            return $pointsDiv.remove();
          }, 500);
        });
      };

      var i = 1;
      var color = void 0;
      var transfers = void 0;
      var amount = void 0;
      if (victory) {
        color = 'gold';
        amount = 10;
        transfers = points / 10;
      } else {
        color = '#CD7F32';
        amount = 1;
        transfers = points;
      }

      while (transfers-- > 0) {
        setTimeout(function () {
          return moveStar(color, amount);
        }, 150 * i++);
      }
    };

    GameContainer.prototype.handleSetNicknameClick = function handleSetNicknameClick() {
      if (this.currentNickname) {
        playAudio(this.audioBank.closeItem);
        this.setNickname();
      }
    };

    GameContainer.prototype.handleJoinGameClick = function handleJoinGameClick() {
      playAudio(this.audioBank.joinGame);
      this.joinGame();
    };

    GameContainer.prototype.handleWordSubmit = function handleWordSubmit() {
      if (this.canSubmitWord) {
        this.sendWord();
      } else {
        this.handleWordMismatch();
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
      var message = constructMessage(MessageTypes.TYPE_WORD, { word: this.typedWord });
      this.sendToServer(message);
    };

    GameContainer.prototype.sendToServer = function sendToServer(message) {
      sendMessage(this.serverSocket, message);
    };

    GameContainer.prototype.flashMessage = function flashMessage(message) {
      var _this6 = this;

      var durationMillis = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1000;

      this.showMessageBanner = true;
      this.currentMessage = message;

      var messageBanner = this.getMessageBanner();
      messageBanner.classList.remove('fadeOut');
      this.messageBannerHideTimeout = setTimeout(function () {
        messageBanner.classList.add('fadeOut');
        _this6.messageBannerHideTimeout = setTimeout(function () {
          _this6.showMessageBanner = false;
        }, parseInt(durationMillis * 0.5, 10));
      }, parseInt(durationMillis * 0.5, 10));
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
      key: 'showCurrentScore',
      get: function get() {
        return this.isInGame || this.hasJoinedGameAtLeastOnce;
      }
    }, {
      key: 'showChallengeArea',
      get: function get() {
        return this.isInRound && !this.isWaitingForNextRound;
      }
    }, {
      key: 'showChallengeWaitArea',
      get: function get() {
        return !this.isInRound && this.isWaitingForNextRound;
      }
    }, {
      key: 'currentScoreString',
      get: function get() {
        return ('0000' + this.currentScore).slice(-5);
      }
    }, {
      key: 'canSubmitWord',
      get: function get() {
        return !(0, _stringUtils.isEmpty)(this.typedWord);
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
define('components/history-sidebar/history-sidebar',['exports', 'aurelia-framework', 'jquery'], function (exports, _aureliaFramework) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.HistorySidebar = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var HistorySidebar = exports.HistorySidebar = (_dec = (0, _aureliaFramework.inject)(Element), _dec(_class = function () {
    function HistorySidebar(element) {
      _classCallCheck(this, HistorySidebar);

      this.element = element;
    }

    HistorySidebar.prototype.attached = function attached() {
      this.initDOMHooks();
      this.attachEventListeners();
    };

    HistorySidebar.prototype.initStateModel = function initStateModel() {
      this.isActive = false;
    };

    HistorySidebar.prototype.initDOMHooks = function initDOMHooks() {
      this.historyContainer = this.element.querySelector('.history-container');
      this.closeButton = this.element.querySelector('.close-button');
    };

    HistorySidebar.prototype.attachEventListeners = function attachEventListeners() {
      var _this = this;

      this.historyContainer.addEventListener('click', function () {
        _this.activateHistoryContainer();
      });
    };

    HistorySidebar.prototype.activateHistoryContainer = function activateHistoryContainer() {
      var _this2 = this;

      if (!this.isActive) {
        this.historyContainer.classList.add('active');
        var overlayDiv = document.createElement('div');
        overlayDiv.classList.add('page-overlay');
        document.body.appendChild(overlayDiv);
        overlayDiv.addEventListener('click', function () {
          return _this2.deactivateHistoryContainer();
        });
        this.isActive = true;
      }
    };

    HistorySidebar.prototype.deactivateHistoryContainer = function deactivateHistoryContainer() {
      if (this.isActive) {
        this.historyContainer.classList.remove('active');
        var overlayDiv = document.querySelector('.page-overlay');
        if (overlayDiv) {
          document.body.removeChild(overlayDiv);
        }
        this.isActive = false;
      }
    };

    return HistorySidebar;
  }()) || _class);
});
define('text!app.html', ['module'], function(module) { module.exports = "<template><require from=\"jquery-ui-dist/jquery-ui.css\"></require><router-view></router-view></template>"; });
define('text!styles/utility-styles.css', ['module'], function(module) { module.exports = "/* lg */\r\n@media (min-width: 1200px) {\r\n   .hidden-lg {\r\n     visibility: hidden;\r\n   }\r\n}\r\n\r\n/* md */\r\n@media (min-width: 992px) and (max-width: 1199px) {\r\n   .hidden-md {\r\n     visibility: hidden;\r\n   }\r\n}\r\n\r\n/* sm */\r\n@media (min-width: 768px) and (max-width: 991px) {\r\n   .hidden-sm {\r\n     visibility: hidden;\r\n   }\r\n}\r\n\r\n/* xs */\r\n@media (max-width: 767px) {\r\n   .hidden-xs {\r\n     visibility: hidden;\r\n   }\r\n}"; });
define('text!containers/game-container/game-container.html', ['module'], function(module) { module.exports = "<template><require from=\"./game-container.css\"></require><require from=\"../../styles/utility-styles.css\"></require><compose view-model=\"../../components/history-sidebar/history-sidebar\" model.bind=\"{ }\"></compose><div class=\"container\"><div class=\"page-header\" no-select><bs-row lg=\"8\" md=\"7\" sm=\"6\"><h1><img style=\"width:50px;height:50px\" src=\"icon.png\"> Typerace</h1></bs-row></div><bs-row><h4></h4><h4 no-select id=\"score-container\" class=\"${!showCurrentScore ? 'hidden' : ''}\"><span id=\"opponent-wrapper\" if.bind=\"currentOpponent\"><i class=\"fa fa-user\"></i> Opponent: <em>${currentOpponent}</em> </span><span id=\"score-wrapper\"><i class=\"fa fa-star\"></i> ${currentScoreString}</span></h4></bs-row><bs-row if.bind=\"showLoadingBanner\"><h3 no-select class=\"text-center\"><i class=\"fa fa-circle-o-notch fa-spin\"></i> ${loadingText}</h3></bs-row><bs-row if.bind=\"showNicknameForm\"><div class=\"form-group\"><h6>Provide a nickname<input take-focus key-return.call=\"handleSetNicknameClick()\" class=\"form-control\" type=\"text\" value.bind=\"currentNickname\" placeholder=\"\"></h6></div><button click.trigger=\"handleSetNicknameClick()\" disabled.bind=\"!canSetNickname\" class=\"btn btn-primary btn-block\">Begin</button></bs-row><bs-row if.bind=\"showTutorial\"><p>TODO!</p></bs-row><bs-row if.bind=\"showJoinGameForm\"><button take-focus class=\"btn btn-success btn-block\" click.trigger=\"handleJoinGameClick()\">${showTutorial ? 'Got it!' : 'Join game'}</button></bs-row><bs-row if.bind=\"showGameArea\"><div class=\"animated fadeIn pulse type-area\" if.bind=\"showChallengeArea\"><div no-select><h2 class=\"text-center\"><small>Challenge:</small></h2><h2 class=\"text-center\"><em>${currentWord}</em></h2></div><input take-focus type=\"text\" key-return.call=\"handleWordSubmit()\" class=\"form-control\" disabled.bind=\"isWordInputDisabled\" value.bind=\"typedWord\"></div><div class=\"type-area\" if.bind=\"showChallengeWaitArea\"><h3 no-select class=\"text-center\"><i class=\"fa fa-circle-o-notch fa-spin\"></i> ${challengeWaitText}</h3></div></bs-row><bs-row><div id=\"message-banner\" no-select class=\"animated fadeIn ${!showMessageBanner ? 'hidden' : ''}\"><h2 class=\"text-center\"><strong id=\"message-text-container\">${currentMessage}</strong></h2></div></bs-row><bs-row><div id=\"victory-banner\" no-select class=\"message-banner animated fadeIn ${!showWinStatus ? 'hidden' : ''}\"><h2 class=\"text-center ${didWin ? 'victory-text' : 'loss-text'}\"><strong id=\"victory-text-container\">${didWin ? 'You won!' : 'You lost!'}</strong></h2></div></bs-row></div></template>"; });
define('text!containers/game-container/game-container.css', ['module'], function(module) { module.exports = ".victory-text {\r\n  color: gold;\r\n}\r\n\r\n.loss-text {\r\n  color: #CD7F32;\r\n}\r\n\r\n#score-container {\r\n  height: 50px;\r\n}\r\n\r\n#message-text-container {\r\n  color: #7D658D;\r\n}\r\n\r\n#score-wrapper {\r\n  color: gold;\r\n  display: block;\r\n  width: 100px;\r\n  float: right;\r\n}\r\n\r\n#opponent-wrapper {\r\n  color: #444444;\r\n  width: 400px;\r\n  float: left;\r\n  display: block;\r\n  text-overflow: ellipsis;\r\n  overflow: hidden;\r\n  white-space: nowrap;\r\n}\r\n\r\n.type-area {\r\n  height: 170px !important;\r\n}\r\n"; });
define('text!resources/elements/ui-wrappers/bs-row.html', ['module'], function(module) { module.exports = "<template><div class=\"row\"><div class=\"col-xs-${xs} col-sm-${sm} col-md-${md} col-lg-${lg}\"><slot></slot></div></div></template>"; });
define('text!components/history-sidebar/history-sidebar.html', ['module'], function(module) { module.exports = "<template><require from=\"./history-sidebar.css\"></require><div no-select class=\"history-container inactive hidden-xs animated fadeIn\"><div class=\"history-heading\"><i class=\"fa-sidebar fa fa-history\"></i><h5 class=\"history-text\">History</h5></div><table class=\"table table-hover history-table\"><thead><th class=\"col-xs-4 col-sm-4 col-md-4\">Word</th><th class=\"col-xs-4 col-sm-4 col-md-4\">Your time</th><th class=\"col-xs-4 col-sm-4 col-md-4\">Opponent's time</th></thead><tbody><tr><td>soliloquy</td><td>45s</td><td>1m 30s</td></tr><tr><td>soliloquy</td><td>45s</td><td>1m 30s</td></tr></tbody></table></div></template>"; });
define('text!components/history-sidebar/history-sidebar.css', ['module'], function(module) { module.exports = ".history-container {\r\n  background:#fbfbfb;\r\n  border-right:1px solid #e5e5e5;\r\n  position:absolute;\r\n  top:0;\r\n  bottom:0;\r\n  height:100%;\r\n  left:0;\r\n  width:60px;\r\n  overflow:hidden;\r\n  z-index:1000;\r\n  cursor: pointer !important;\r\n}\r\n\r\n/*.history-container:hover,*/\r\n.history-container.active {\r\n  width: 500px;\r\n  overflow: visible;\r\n  cursor: default !important;\r\n}\r\n\r\n.history-container:not(.active):hover {\r\n  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);\r\n}\r\n\r\n.fa-sidebar {\r\n  position: relative;\r\n  display: table-cell;\r\n  width: 60px;\r\n  height: 36px;\r\n  text-align: center;\r\n  vertical-align: middle;\r\n  font-size:20px;\r\n}\r\n\r\n.history-line > .history-text {\r\n  left: 60px;\r\n}\r\n\r\n.history-table {\r\n  display: block;\r\n  left: 60px;\r\n  position: absolute;\r\n  margin-top: 20px;\r\n}\r\n\r\n.history-container .history-heading {\r\n  margin: 7px 0;\r\n  position: relative;\r\n  display: block;\r\n  width: 250px;\r\n    outline:0;\r\n  margin:0;\r\n  padding:0;\r\n}\r\n\r\n.history-lines-container {\r\n  margin: 7px 0;\r\n  position: relative;\r\n  display: block;\r\n  width: 250px;\r\n    outline:0;\r\n  margin:0;\r\n  padding:0;\r\n}\r\n\r\n.history-container .history-text {\r\n  position:relative;\r\n  display:table-cell;\r\n  vertical-align:middle;\r\n  width:190px;\r\n}\r\n\r\n.page-overlay {\r\n  opacity:    0.5; \r\n  background: #000; \r\n  width:      100%;\r\n  height:     100%; \r\n  z-index:    999;\r\n  top:        0; \r\n  left:       0; \r\n  position:   fixed; \r\n}\r\n"; });
//# sourceMappingURL=app-bundle.js.map