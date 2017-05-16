define("app",["exports"],function(e){"use strict";function t(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0});e.App=function(){function e(){t(this,e)}return e.prototype.configureRouter=function(e,t){this.router=t,e.title="Typerace",e.map([{route:"",name:"game",moduleId:"containers/game-container/game-container"}])},e}()}),define("environment",["exports"],function(e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={type:"prod",debug:!1,testing:!1,gatewayRootURL:"http://custom-env.74nv6kcqe2.eu-central-1.elasticbeanstalk.com",socketRootURL:"ws://custom-env.74nv6kcqe2.eu-central-1.elasticbeanstalk.com"}}),define("main",["exports","./environment"],function(e,t){"use strict";function n(e){e.use.standardConfiguration().feature("resources"),i.default.debug&&e.use.developmentLogging(),i.default.testing&&e.use.plugin("aurelia-testing"),e.start().then(function(){return e.setRoot()})}Object.defineProperty(e,"__esModule",{value:!0}),e.configure=n;var i=function(e){return e&&e.__esModule?e:{default:e}}(t);Promise.config({warnings:{wForgottenReturn:!1}})}),define("consts/environment-types",["exports"],function(e){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.DEV="dev",e.PROD="prod"}),define("events/event-types",["exports"],function(e){"use strict";function t(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0});e.NewScore=function e(n){t(this,e),this.scoreData=n}}),define("lib/message-types",["exports"],function(e){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.CONNECT_RESPONSE="CONNECT_RESPONSE",e.SET_NICKNAME_RESPONSE="SET_NICKNAME_RESPONSE",e.BROADCAST_WORD="BROADCAST_WORD",e.TYPE_WORD_RESPONSE="TYPE_WORD_RESPONSE",e.TERMINATE_GAME="TERMINATE_GAME",e.WORD_MISMATCH="WORD_MISMATCH",e.ROUND_WON="ROUND_WON",e.ROUND_LOST="ROUND_LOST",e.SET_NICKNAME="SET_NICKNAME",e.JOIN_GAME="JOIN_GAME",e.TYPE_WORD="TYPE_WORD"}),define("lib/string-utils",["exports"],function(e){"use strict";function t(e){return!e||!e.trim()}Object.defineProperty(e,"__esModule",{value:!0}),e.isEmpty=t}),define("lib/time-utils",["exports"],function(e){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var t=(e.formatSeconds=function(e){var n=parseInt(e,10),i=parseInt(e/3600,10);n%=3600;var r=parseInt(n/60,10);return n%=60,t(i,"hour"," ")+t(r,"minute"," ")+t(n,"second"," ")},e.formatTimePart=function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"";return e?e>1?""+n+e+" "+t+"s"+n:""+n+e+" "+t+n:""})}),define("resources/index",["exports"],function(e){"use strict";function t(e){e.globalResources(["./attributes/key-return","./attributes/take-focus","./attributes/no-select","./elements/ui-wrappers/bs-row"])}Object.defineProperty(e,"__esModule",{value:!0}),e.configure=t}),define("components/history-sidebar/history-sidebar",["exports","aurelia-framework","aurelia-event-aggregator","../../events/event-types","../../lib/time-utils","jquery","jquery-ui-dist"],function(e,t,n,i,r){"use strict";function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0}),e.HistorySidebar=void 0;var s,a,c=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t}(i),l=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),u=(e.HistorySidebar=(s=(0,t.inject)(Element,n.EventAggregator))(a=function(){function e(t,n){o(this,e),this.element=t,this.ea=n}return e.prototype.attached=function(){this.initStateModel(),this.initDOMHooks(),this.attachEventListeners()},e.prototype.initStateModel=function(){this.isActive=!1,this.scoreEntries=[]},e.prototype.initDOMHooks=function(){this.historyContainer=this.element.querySelector(".history-container"),this.closeButton=this.element.querySelector(".close-history-button"),this.historyIcon=this.element.querySelector(".history-icon"),this.$historyIcon=$(this.historyIcon)},e.prototype.attachEventListeners=function(){var e=this;this.historyContainer.addEventListener("click",function(){return e.activateHistoryContainer()}),this.closeButton.addEventListener("click",function(t){t.stopPropagation(),e.deactivateHistoryContainer()}),this.ea.subscribe(c.NewScore,function(t){e.addScoreEntry(t.scoreData),e.$historyIcon.effect("highlight",{times:1},500)})},e.prototype.activateHistoryContainer=function(){var e=this;if(!this.isActive){this.historyContainer.classList.add("active");var t=document.createElement("div");t.classList.add("page-overlay"),document.body.appendChild(t),t.addEventListener("click",function(){return e.deactivateHistoryContainer()}),this.isActive=!0}},e.prototype.deactivateHistoryContainer=function(){if(this.isActive){this.historyContainer.classList.remove("active");var e=document.querySelector(".page-overlay");e&&document.body.removeChild(e),this.isActive=!1}},e.prototype.addScoreEntry=function(e){var t=e.opponentTimeMillis,n=e.playerTimeMillis,i=e.word;this.scoreEntries.push({word:i,playerTimeString:u(n),opponentTimeString:u(t),didWin:t>n})},l(e,[{key:"winCount",get:function(){return this.scoreEntries?this.scoreEntries.reduce(function(e,t){return t.didWin?e+1:e},0):0}},{key:"lossCount",get:function(){return this.scoreEntries?this.scoreEntries.length-this.winCount:0}}]),e}())||a,function(e){return(0,r.formatSeconds)(e/1e3)})}),define("components/page-locker/page-locker",["exports"],function(e){"use strict";function t(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0});e.PageLocker=function e(){t(this,e)}}),define("containers/game-container/game-container",["exports","aurelia-framework","aurelia-event-aggregator","../../environment","../../gateways/data/data-api","../../gateways/connection/connection-api","../../lib/string-utils","../../events/event-types","../../lib/message-types","../../consts/environment-types","jquery","jquery-ui-dist"],function(e,t,n,i,r,o,s,a,c,l){"use strict";function u(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t}function d(e,t,n,i){n&&Object.defineProperty(e,t,{enumerable:n.enumerable,configurable:n.configurable,writable:n.writable,value:n.initializer?n.initializer.call(i):void 0})}function h(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function p(e,t,n,i,r){var o={};return Object.keys(i).forEach(function(e){o[e]=i[e]}),o.enumerable=!!o.enumerable,o.configurable=!!o.configurable,("value"in o||o.initializer)&&(o.writable=!0),o=n.slice().reverse().reduce(function(n,i){return i(e,t,n)||n},o),r&&void 0!==o.initializer&&(o.value=o.initializer?o.initializer.call(r):void 0,o.initializer=void 0),void 0===o.initializer&&(Object.defineProperty(e,t,o),o=null),o}Object.defineProperty(e,"__esModule",{value:!0}),e.GameContainer=void 0;var f,m,g,y,v,b=function(e){return e&&e.__esModule?e:{default:e}}(i),w=u(a),k=u(c),x=u(l),S=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(e[i]=n[i])}return e},O=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),E=(e.GameContainer=(f=(0,t.inject)(Element,n.EventAggregator,r.DataAPI,o.ConnectionAPI))((g=function(){function e(t,n,i,r){h(this,e),d(this,"currentNickname",y,this),d(this,"word",v,this),this.element=t,this.eventAggregator=n,this.dataAPI=i,this.connectionAPI=r,this.initStateModel()}return e.prototype.attached=function(){this.audioBank={victoryDing:new Audio("media/audio/victory-ding.ogg"),lossDing:new Audio("media/audio/loss-ding.ogg"),closeItem:new Audio("media/audio/close-item.ogg"),loserPointDing:new Audio("media/audio/loser-point-ding.ogg"),winnerPointDing:new Audio("media/audio/winner-point-ding.ogg"),wordMismatch:new Audio("media/audio/word-mismatch.ogg"),joinGame:new Audio("media/audio/join-game.ogg"),opponentFound:new Audio("media/audio/opponent-found.ogg"),opponentLeft:new Audio("media/audio/opponent-left.ogg")},this.initStateModel(),this.initDOMHooks(),this.attachDOMListeners(),this.connectToServer()},e.prototype.detached=function(){this.detachDOMListeners(),this.clearPingInterval()},e.prototype.initStateModel=function(){this.isApplicationLocked=!1,this.isConnectingToServer=!0,this.isSettingNickname=!1,this.isWaitingForOpponent=!1,this.isWaitingForNextRound=!1,this.isCheckingWord=!1,this.hasJoinedGameAtLeastOnce=!1,this.isInRound=!0,this.showWinStatus=!1,this.showMessageBanner=!1,this.canJoinGame=!1,this.canDisplayTutorial=!1,this.pingInterval=null,this.isInGame=!1,this.lastScoreIndex=null,this.currentOpponent=null,this.sessionId=null,this.didWin=null,this.isNicknameSet=!1,this.loadingText=null,this.currentMessage=null,this.challengeWaitText=null,this.currentScore=0},e.prototype.initDOMHooks=function(){var e=this;this.getVictoryBanner=function(){return e.element.querySelector("#victory-banner")},this.getMessageBanner=function(){return e.element.querySelector("#message-banner")},this.getScoreWrapper=function(){return e.element.querySelector("#score-wrapper")},this.getVictoryTextContainer=function(){return e.element.querySelector("#victory-text-container")},this.getWordInput=function(){return e.element.querySelector(".word-input")}},e.prototype.attachDOMListeners=function(){},e.prototype.detachDOMListeners=function(){},e.prototype.connectToServer=function(){var e=this.serverSocket=this.connectionAPI.getGameSocketConnection();this.hookUpServerSocket(e)},e.prototype.hookUpServerSocket=function(e){var t=this;this.isConnectingToServer=!0,this.loadingText="Connecting to server...",e.onopen=function(e){t.isConnectingToServer=!1},e.onclose=function(e){console.warn(e),t.isApplicationLocked=!0,t.clearPingInterval()},e.onerror=function(){console.warn(event),t.isApplicationLocked=!0,t.clearPingInterval()},e.onmessage=function(e){var n=JSON.parse(e.data);switch(n.type){case k.CONNECT_RESPONSE:t.handleConnectResponse(n);break;case k.SET_NICKNAME_RESPONSE:t.handleSetNicknameResponse(n);break;case k.BROADCAST_WORD:t.handleBroadcastWord(n);break;case k.TYPE_WORD_RESPONSE:t.handleTypeWordResponse(n);break;case k.TERMINATE_GAME:t.handleTerminateGame(n)}},b.default.type===x.PROD&&(this.pingInterval=setInterval(function(){console.info("keep-alive"),t.sendToServer({type:"PING"})},5e3))},e.prototype.clearPingInterval=function(){this.pingInterval&&(clearInterval(this.pingInterval),this.pingInterval=null)},e.prototype.handleConnectResponse=function(e){this.sessionId=e.sessionId},e.prototype.handleSetNicknameResponse=function(e){this.isSettingNickname=!1,this.isNicknameSet=!0,this.canDisplayTutorial=!0,this.canJoinGame=!0,this.isInGame=!1},e.prototype.handleBroadcastWord=function(e){var t=this;E(this.audioBank.opponentFound),this.hasJoinedGameAtLeastOnce=!0,this.isWaitingForOpponent=!1,this.isWaitingForNextRound=!1,this.isInRound=!0,this.currentWord=e.word,this.currentOpponent=e.opponentNickname,this.isInGame=!0,this.hasNotSentWord=!0,this.dataAPI.getScoreRequest(this.sessionId,this.lastScoreIndex||"0").send().then(function(e){e.content.roundScores.forEach(function(e){t.eventAggregator.publish(new w.NewScore(e)),t.lastScoreIndex=e.index})}).catch(function(e){})},e.prototype.handleTypeWordResponse=function(e){switch(this.isCheckingWord=!1,e.gameMessageType){case k.WORD_MISMATCH:this.handleWordMismatch();break;case k.ROUND_WON:this.handleRoundWon(e);break;case k.ROUND_LOST:this.handleRoundLost(e)}},e.prototype.handleWordMismatch=function(){this.messageBannerHideTimeout&&clearTimeout(this.messageBannerHideTimeout),E(this.audioBank.wordMismatch),this.flashMessage("Try again!",1e3)},e.prototype.handleRoundWon=function(e){this.handleRoundEnd(e,!0)},e.prototype.handleRoundLost=function(e){this.handleRoundEnd(e,!1)},e.prototype.handleTerminateGame=function(e){var t=this;E(this.audioBank.opponentLeft),this.isInGame=!1,this.isInRound=!1,this.currentOpponent=null,this.flashMessage("Your opponent left!",2e3),setTimeout(function(){return t.canJoinGame=!0},2e3)},e.prototype.handleRoundEnd=function(e,t){var n=this;E(t?this.audioBank.victoryDing:this.audioBank.lossDing),this.showMessageBanner=!1,this.isInRound=!1,this.showWinStatus=!0,this.challengeWaitText=t?"Waiting for opponent to finish...":"Waiting for next challenge...",this.didWin=t,this.typedWord="";var i=this.getVictoryBanner();i.classList.remove("fadeOut"),setTimeout(function(){return n.transferPoints(e.playerScore,t)},500),setTimeout(function(){i.classList.add("fadeOut"),setTimeout(function(){n.showWinStatus=!1,n.isWaitingForNextRound=!0,n.didWin=null},500)},1e3)},e.prototype.transferPoints=function(e,t){var n=this,i=this.getScoreWrapper(),r=this.getVictoryTextContainer(),o=$(i),s=$(r),a=s.offset().top+20,c=s.offset().left+85,l=o.offset().top,u=o.offset().left,d=document.createElement("i"),h=document.createElement("div"),p={color:"green","font-weight":"bold","font-size":"13px"};h.css=p,d.classList.add("fa"),d.classList.add("fa-star");var f={"font-size":"24px",position:"absolute"};d.style=f;var m=function(e,i){var r=$(d.cloneNode());r.offset({top:a,left:c}).css(Object.assign({opacity:"0.5",color:e,position:"absolute","z-index":"100"},f)).appendTo($("body")).animate({top:l,left:u},500,"easeInOutExpo",function(){E(t?n.audioBank.winnerPointDing:n.audioBank.loserPointDing),o.effect("bounce",{times:t?2:1},100),r.remove(),n.currentScore+=i;var s=$(h.cloneNode());s.text("+"+i).css(Object.assign({opacity:"0.5",color:e,position:"absolute","z-index":"100"},p)).offset({top:l,left:u}).appendTo($("body")).addClass("animated fadeOutUp"),setTimeout(function(){return s.remove()},500)})},g=1,y=void 0,v=void 0,b=void 0;for(t?(y="gold",b=10,v=e/10):(y="#CD7F32",b=1,v=e);v-- >0;)setTimeout(function(){return m(y,b)},150*g++)},e.prototype.handleSetNicknameClick=function(){this.currentNickname&&(E(this.audioBank.closeItem),this.setNickname())},e.prototype.handleJoinGameClick=function(){E(this.audioBank.joinGame),this.joinGame()},e.prototype.handleWordSubmit=function(){this.isWordInputDisabled||(this.canSubmitWord?this.sendWord():this.handleWordMismatch())},e.prototype.setNickname=function(){this.loadingText="Setting nickname...",this.isSettingNickname=!0;var e=this.currentNickname,t=_(k.SET_NICKNAME,{nickname:e});this.sendToServer(t)},e.prototype.joinGame=function(){this.loadingText="Waiting for an opponent...",this.isWaitingForOpponent=!0,this.canDisplayTutorial=!1,this.canJoinGame=!1;var e=_(k.JOIN_GAME);this.sendToServer(e)},e.prototype.sendWord=function(){this.isCheckingWord=!0;var e=_(k.TYPE_WORD,{word:this.typedWord});this.sendToServer(e)},e.prototype.sendToServer=function(e){T(this.serverSocket,e)},e.prototype.flashMessage=function(e){var t=this,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1e3;this.showMessageBanner=!0,this.currentMessage=e;var i=this.getMessageBanner();i.classList.remove("fadeOut"),this.messageBannerHideTimeout=setTimeout(function(){i.classList.add("fadeOut"),t.messageBannerHideTimeout=setTimeout(function(){t.showMessageBanner=!1},parseInt(.5*n,10))},parseInt(.5*n,10))},O(e,[{key:"showLoadingBanner",get:function(){return this.isConnectingToServer||!this.sessionId||this.isSettingNickname||this.isWaitingForOpponent}},{key:"showNicknameForm",get:function(){return!this.isConnectingToServer&&!this.isNicknameSet}},{key:"canSetNickname",get:function(){return!(0,s.isEmpty)(this.currentNickname)}},{key:"showTutorial",get:function(){return this.canDisplayTutorial}},{key:"showJoinGameForm",get:function(){return this.canJoinGame}},{key:"showGameArea",get:function(){return this.isInGame&&!this.isConnectingToServer}},{key:"showCurrentScore",get:function(){return this.isInGame||this.hasJoinedGameAtLeastOnce}},{key:"showChallengeArea",get:function(){return this.isInRound&&!this.isWaitingForNextRound}},{key:"showChallengeWaitArea",get:function(){return!this.isInRound&&this.isWaitingForNextRound}},{key:"showHistorySidebar",get:function(){return this.showCurrentScore}},{key:"currentScoreString",get:function(){return("0000"+this.currentScore).slice(-5)}},{key:"canSubmitWord",get:function(){return!(0,s.isEmpty)(this.typedWord)}},{key:"isWordInputDisabled",get:function(){return this.isCheckingWord}}]),e}(),y=p(g.prototype,"currentNickname",[t.bindable],{enumerable:!0,initializer:function(){return""}}),v=p(g.prototype,"word",[t.bindable],{enumerable:!0,initializer:function(){return""}}),m=g))||m,function(e){e.cloneNode().play()}),T=function(e,t){e.send(JSON.stringify(t))},_=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return S({type:e},t)}}),define("gateways/connection/connection-api",["exports","../../environment"],function(e,t){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0}),e.ConnectionAPI=void 0;var i=function(e){return e&&e.__esModule?e:{default:e}}(t);e.ConnectionAPI=function(){function e(){n(this,e),this.socketRootURL=i.default.socketRootURL}return e.prototype.getGameSocketConnection=function(){return new WebSocket(this.socketRootURL+"/game")},e}()}),define("gateways/data/data-api",["exports","aurelia-framework","aurelia-http-client","../../environment"],function(e,t,n,i){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0}),e.DataAPI=void 0;var o,s,a=function(e){return e&&e.__esModule?e:{default:e}}(i);e.DataAPI=(o=(0,t.inject)(n.HttpClient))(s=function(){function e(t){r(this,e),this.client=t.configure(function(e){return e.withBaseUrl(a.default.gatewayRootURL)})}return e.prototype.getScoreRequest=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"0";return this.client.createRequest("/scores/"+e+"?afterIndex="+t).asGet()},e}())||s}),define("resources/attributes/key-return",["exports","aurelia-framework"],function(e,t){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0}),e.KeyReturn=void 0;var i,r,o;e.KeyReturn=(i=(0,t.customAttribute)("key-return"),r=(0,t.inject)(Element),i(o=r(o=function(){function e(t){var i=this;n(this,e),this.enterPressed=function(){},this.element=t,this.enterPressed=function(e){13===(e.which||e.keyCode)&&i.value()}}return e.prototype.attached=function(){this.element.addEventListener("keypress",this.enterPressed)},e.prototype.detached=function(){this.element.removeEventListener("keypress",this.enterPressed)},e}())||o)||o)}),define("resources/attributes/no-select",["exports","aurelia-framework"],function(e,t){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0}),e.NoSelect=void 0;var i,r,o;e.NoSelect=(i=(0,t.customAttribute)("no-select"),r=(0,t.inject)(Element),i(o=r(o=function(){function e(t){n(this,e),this.element=t}return e.prototype.attached=function(){var e=this.element;e.style||(e.style={}),e.style["user-select"]="none",e.style["-webkit-user-select"]="none",e.style["-moz-user-select"]="none",e.style["-ms-user-select"]="none",e.style.cursor="default"},e}())||o)||o)}),define("resources/attributes/take-focus",["exports","aurelia-framework"],function(e,t){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0}),e.KeyReturn=void 0;var i,r,o;e.KeyReturn=(i=(0,t.customAttribute)("take-focus"),r=(0,t.inject)(Element),i(o=r(o=function(){function e(t){n(this,e),this.element=t}return e.prototype.attached=function(){this.element.focus()},e}())||o)||o)}),define("resources/elements/ui-wrappers/bs-row",["exports","aurelia-framework"],function(e,t){"use strict";function n(e,t,n,i){n&&Object.defineProperty(e,t,{enumerable:n.enumerable,configurable:n.configurable,writable:n.writable,value:n.initializer?n.initializer.call(i):void 0})}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t,n,i,r){var o={};return Object.keys(i).forEach(function(e){o[e]=i[e]}),o.enumerable=!!o.enumerable,o.configurable=!!o.configurable,("value"in o||o.initializer)&&(o.writable=!0),o=n.slice().reverse().reduce(function(n,i){return i(e,t,n)||n},o),r&&void 0!==o.initializer&&(o.value=o.initializer?o.initializer.call(r):void 0,o.initializer=void 0),void 0===o.initializer&&(Object.defineProperty(e,t,o),o=null),o}Object.defineProperty(e,"__esModule",{value:!0}),e.BsRow=void 0;var o,s,a,c,l,u;e.BsRow=(0,t.containerless)((s=function(){function e(){i(this,e),n(this,"lg",a,this),n(this,"md",c,this),n(this,"sm",l,this),n(this,"xs",u,this)}return e.prototype.attached=function(){},e}(),a=r(s.prototype,"lg",[t.bindable],{enumerable:!0,initializer:function(){return 12}}),c=r(s.prototype,"md",[t.bindable],{enumerable:!0,initializer:function(){return 12}}),l=r(s.prototype,"sm",[t.bindable],{enumerable:!0,initializer:function(){return 12}}),u=r(s.prototype,"xs",[t.bindable],{enumerable:!0,initializer:function(){return 12}}),o=s))||o}),define("text!app.html",["module"],function(e){e.exports='<template><require from="jquery-ui-dist/jquery-ui.css"></require><router-view></router-view></template>'}),define("text!styles/utility-styles.css",["module"],function(e){e.exports="/* lg */\r\n@media (min-width: 1200px) {\r\n   .hidden-lg {\r\n     visibility: hidden;\r\n   }\r\n}\r\n\r\n/* md */\r\n@media (min-width: 992px) and (max-width: 1199px) {\r\n   .hidden-md {\r\n     visibility: hidden;\r\n   }\r\n}\r\n\r\n/* sm */\r\n@media (min-width: 768px) and (max-width: 991px) {\r\n   .hidden-sm {\r\n     visibility: hidden;\r\n   }\r\n}\r\n\r\n/* xs */\r\n@media (max-width: 767px) {\r\n   .hidden-xs {\r\n     visibility: hidden;\r\n   }\r\n}"}),define("text!components/history-sidebar/history-sidebar.html",["module"],function(e){e.exports='<template><require from="./history-sidebar.css"></require><div no-select class="history-container hidden-xs animated fadeIn"><div class="close-history-button"><i class="close-history-button fa fa-times fa-2x"></i></div><div class="history-heading"><i class="fa-sidebar fa fa-history history-icon"></i><h5 class="history-text">History</h5></div><div class="history-lines-container"><div class="history-line"><span class="history-text"><em>Wins: ${winCount}</em></span></div><div class="history-line"><span class="history-text"><em>Losses: ${lossCount}</em></span></div></div><table class="table table-hover history-table"><thead><th class="col-xs-4">Word</th><th class="col-xs-4">Your time</th><th class="col-xs-4">Opponent\'s time</th></thead><tbody><tr repeat.for="scoreEntry of scoreEntries"><td>${scoreEntry.word}</td><td class="${scoreEntry.didWin ? \'winner-entry\' : \'\'}">${scoreEntry.playerTimeString}</td><td class="${!scoreEntry.didWin ? \'winner-entry\' : \'\'}">${scoreEntry.opponentTimeString}</td></tr></tbody></table></div></template>'}),define("text!components/history-sidebar/history-sidebar.css",["module"],function(e){e.exports=".history-container {\r\n  background:#fbfbfb;\r\n  border-right:1px solid #e5e5e5;\r\n  position:absolute;\r\n  top:0;\r\n  bottom:0;\r\n  height:100%;\r\n  left:0;\r\n  width:60px;\r\n  overflow:hidden;\r\n  z-index:1000;\r\n  cursor: pointer !important;\r\n}\r\n\r\n/*.history-container:hover,*/\r\n.history-container.active {\r\n  width: 500px;\r\n  overflow: visible;\r\n  cursor: default !important;\r\n  overflow-y: auto;\r\n  overflow-x: hidden;\r\n}\r\n\r\n.history-container:not(.active):hover {\r\n  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);\r\n}\r\n\r\n.fa-sidebar {\r\n  position: relative;\r\n  display: table-cell;\r\n  width: 60px;\r\n  height: 36px;\r\n  text-align: center;\r\n  vertical-align: middle;\r\n  font-size:20px;\r\n}\r\n\r\n.history-container:not(.active) .history-heading .history-text {\r\n  left: 60px;\r\n}\r\n\r\n.history-line > .history-text {\r\n  left: 60px;\r\n}\r\n\r\n.history-table {\r\n  display: block;\r\n  left: 60px;\r\n  position: absolute;\r\n  margin-top: 20px;\r\n}\r\n\r\n.history-container .history-heading {\r\n  margin: 7px 0;\r\n  position: relative;\r\n  display: block;\r\n  width: 250px;\r\n    outline:0;\r\n  margin:0;\r\n  padding:0;\r\n}\r\n\r\n.history-lines-container {\r\n  margin: 7px 0;\r\n  position: relative;\r\n  display: block;\r\n  width: 250px;\r\n    outline:0;\r\n  margin:0;\r\n  padding:0;\r\n}\r\n\r\n.history-container .history-text {\r\n  position:relative;\r\n  display:table-cell;\r\n  vertical-align:middle;\r\n  width:190px;\r\n}\r\n\r\n.close-history-button {\r\n  position: absolute;\r\n  padding-right: 10px;\r\n  padding-bottom: 0;\r\n  left: 90%;\r\n  top: 5px;\r\n  display: inline-block;\r\n  cursor: pointer !important;\r\n}\r\n\r\n.close-history-button:hover > i {\r\n  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);\r\n}\r\n\r\n.page-overlay {\r\n  opacity:    0.5; \r\n  background: #000; \r\n  width:      100%;\r\n  height:     100%; \r\n  z-index:    999;\r\n  top:        0; \r\n  left:       0; \r\n  position:   fixed;\r\n}\r\n\r\n.winner-entry {\r\n  font-weight: bold;\r\n  color: gold;\r\n}"}),define("text!components/page-locker/page-locker.html",["module"],function(e){e.exports='<template><require from="./page-locker.css"></require><div class="container"><div class="jumbotron"><h1>Application locked!</h1><p>No connection to remote server. Please <a href="">try again</a> in a few moments.</p></div></div></template>'}),define("text!components/page-locker/page-locker.css",["module"],function(e){e.exports=""}),define("text!containers/game-container/game-container.html",["module"],function(e){e.exports='<template><require from="./game-container.css"></require><require from="../../styles/utility-styles.css"></require><compose if.bind="isApplicationLocked" view-model="../../components/page-locker/page-locker" model.bind="{ }"></compose><template if.bind="!isApplicationLocked"><compose if.bind="showHistorySidebar" view-model="../../components/history-sidebar/history-sidebar" model.bind="{ }"></compose><div class="container" if.bind="!isApplicationLocked"><div class="page-header" no-select><bs-row lg="8" md="7" sm="6"><h1><img style="width:50px;height:50px" src="icon.png"> Typerace</h1></bs-row></div><bs-row><h4 no-select id="score-container" class="${!showCurrentScore ? \'hidden\' : \'\'}"><span id="opponent-wrapper" if.bind="currentOpponent"><i class="fa fa-user"></i> Opponent: <em>${currentOpponent}</em> </span><span id="score-wrapper"><i class="fa fa-star"></i> ${currentScoreString}</span></h4></bs-row><bs-row if.bind="showLoadingBanner"><h3 no-select class="text-center"><i class="fa fa-circle-o-notch fa-spin"></i> ${loadingText}</h3></bs-row><bs-row if.bind="showNicknameForm"><div class="form-group"><h6>Provide a nickname<input take-focus key-return.call="handleSetNicknameClick()" class="form-control" type="text" value.bind="currentNickname" placeholder=""></h6></div><button click.trigger="handleSetNicknameClick()" disabled.bind="!canSetNickname" class="btn btn-primary btn-block">Begin</button></bs-row><bs-row if.bind="showTutorial"><h4>Instructions</h4><img class="tutorial-image" src="media/image/tutorial.png"></bs-row><bs-row if.bind="showJoinGameForm"><button take-focus class="btn btn-success btn-block btn-join-game" click.trigger="handleJoinGameClick()">${showTutorial ? \'Got it!\' : \'Join game\'}</button></bs-row><bs-row if.bind="showGameArea"><div class="animated fadeIn pulse type-area" if.bind="showChallengeArea"><div no-select><h2 class="text-center"><small>Challenge:</small></h2><h2 class="text-center"><em>${currentWord}</em></h2></div><input take-focus type="text" key-return.call="handleWordSubmit()" class="form-control word-input" value.bind="typedWord" placeholder="Type the challenge here..."></div><div class="type-area" if.bind="showChallengeWaitArea"><h3 no-select class="text-center"><i class="fa fa-circle-o-notch fa-spin"></i> ${challengeWaitText}</h3></div></bs-row><bs-row><div id="message-banner" no-select class="animated fadeIn ${!showMessageBanner ? \'hidden\' : \'\'}"><h2 class="text-center"><strong id="message-text-container">${currentMessage}</strong></h2></div></bs-row><bs-row><div id="victory-banner" no-select class="message-banner animated fadeIn ${!showWinStatus ? \'hidden\' : \'\'}"><h2 class="text-center ${didWin ? \'victory-text\' : \'loss-text\'}"><strong id="victory-text-container">${didWin ? \'You won!\' : \'You lost!\'}</strong></h2></div></bs-row></div></template></template>'}),define("text!containers/game-container/game-container.css",["module"],function(e){e.exports=".victory-text {\r\n  color: gold;\r\n}\r\n\r\n.loss-text {\r\n  color: #CD7F32;\r\n}\r\n\r\n#score-container {\r\n  height: 50px;\r\n}\r\n\r\n#message-text-container {\r\n  color: #7D658D;\r\n}\r\n\r\n#score-wrapper {\r\n  color: gold;\r\n  display: block;\r\n  width: 100px;\r\n  float: right;\r\n}\r\n\r\n#opponent-wrapper {\r\n  color: #444444;\r\n  width: 400px;\r\n  float: left;\r\n  display: block;\r\n  text-overflow: ellipsis;\r\n  overflow: hidden;\r\n  white-space: nowrap;\r\n}\r\n\r\n.type-area {\r\n  height: 170px !important;\r\n}\r\n\r\n.tutorial-image {\r\n  display: block;\r\n  margin: 0 auto;\r\n  height: 600px;\r\n  margin-bottom: 20px;\r\n}\r\n\r\n.tutorial-image {\r\n  display: block;\r\n  margin: 0 auto;\r\n  height: 400px;\r\n  margin-bottom: 20px;\r\n}\r\n\r\n.btn-join-game {\r\n  margin-bottom: 20px;\r\n}\r\n"}),define("text!resources/elements/ui-wrappers/bs-row.html",["module"],function(e){e.exports='<template><div class="row"><div class="col-xs-${xs} col-sm-${sm} col-md-${md} col-lg-${lg}"><slot></slot></div></div></template>'});