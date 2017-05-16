import { inject, bindable } from 'aurelia-framework';

import 'jquery';
import 'jquery-ui-dist';

import { DataAPI } from '../../gateways/data/data-api';
import { ConnectionAPI } from '../../gateways/connection/connection-api';

import { isEmpty } from '../../lib/string-utils';
import * as MessageTypes from '../../lib/message-types';

@inject(Element, DataAPI, ConnectionAPI)
export class GameContainer {
  @bindable currentNickname = '';
  @bindable word = '';

  constructor(element, dataAPI, connectionAPI) {
    this.element = element;
    this.dataAPI = dataAPI;
    this.connectionAPI = connectionAPI;
  }

  attached() {
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
  }

  detached() {
    this.detachDOMListeners();
  }

  /* INITIALIZERS */
  initStateModel() {
    this.isConnectingToServer = false;
    this.isSettingNickname = false;
    this.isWaitingForOpponent = false;
    this.isWaitingForNextRound = false;
    this.isCheckingWord = false;

    this.isInRound = true;
    this.showWinStatus = false;
    this.showMessageBanner = false;
    this.canJoinGame = false;
    this.canDisplayTutorial = false;

    this.sessionId = null;
    this.didWin = null;
    this.isNicknameSet = false;
    this.loadingText = null;
    this.currentMessage = null;
    this.challengeWaitText = null;
    this.currentScore = 0;
  }

  initDOMHooks() {
    this.getVictoryBanner = () => (this.element.querySelector('#victory-banner'));
    this.getMessageBanner = () => (this.element.querySelector('#message-banner'));
    this.getScoreWrapper = () => (this.element.querySelector('#score-wrapper'));
    this.getVictoryTextContainer = () => (this.element.querySelector('#victory-text-container'));
  }

  attachDOMListeners() {

  }

  detachDOMListeners() {

  }

  connectToServer() {
    const serverSocket = this.serverSocket = this.connectionAPI.getGameSocketConnection();
    this.hookUpServerSocket(serverSocket);
  }

  hookUpServerSocket(serverSocket) {
    this.isConnectingToServer = true;
    this.loadingText = 'Connecting to server...';
    serverSocket.onopen = (event) => {
      this.isConnectingToServer = false;
    };

    serverSocket.onclose = (event) => {
      // TODO
    };

    serverSocket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log(data);
      switch (data.type) {
      case MessageTypes.CONNECT_RESPONSE:
        this.handleConnectResponse(data);
        break;
      case MessageTypes.SET_NICKNAME_RESPONSE:
        this.handleSetNicknameResponse(data);
        break;
      case MessageTypes.BROADCAST_WORD:
        this.handleBroadcastWord(data);
        break;
      case MessageTypes.TYPE_WORD_RESPONSE:
        this.handleTypeWordResponse(data);
        break;
      case MessageTypes.TERMINATE_GAME:
        this.handleTerminateGame(data);
        break;
      default:
        break;
      }
    };
  }
  /* /INITIALIZERS */

  /* SERVER MESSAGE HANDLERS */
  handleConnectResponse(data) {
    this.sessionId = data.sessionId;
  }

  handleSetNicknameResponse(data) {
    this.isSettingNickname = false;
    this.isNicknameSet = true;

    this.canDisplayTutorial = true;
    this.canJoinGame = true;
    this.isInGame = false;
  }

  handleBroadcastWord(data) {
    playAudio(this.audioBank.opponentFound);

    this.isWaitingForOpponent = false;
    this.isWaitingForNextRound = false;
    this.isInRound = true;
    this.currentWord = data.word;
    this.currentOpponent = data.opponentNickname;
    this.isInGame = true;
    this.hasNotSentWord = true;
  }

  handleTypeWordResponse(data) {
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
  }

  handleWordMismatch() {
    if (this.messageBannerHideTimeout) {
      clearTimeout(this.messageBannerHideTimeout);
    }

    playAudio(this.audioBank.wordMismatch);
    this.showMessageBanner = true;
    this.currentMessage = 'Try again!';

    const messageBanner = this.getMessageBanner();
    messageBanner.classList.remove('fadeOut');
    this.messageBannerHideTimeout = setTimeout(() => {
      messageBanner.classList.add('fadeOut');
      this.messageBannerHideTimeout = setTimeout(() => {
        this.showMessageBanner = false;
      }, 500);
    }, 500);
  }

  handleRoundWon(data) {
    playAudio(this.audioBank.victoryDing);
    this.showMessageBanner = false;
    this.isInRound = false;
    this.showWinStatus = true;
    this.challengeWaitText = 'Waiting for opponent to finish...';
    this.didWin = true;
    this.typedWord = '';

    const victoryBanner = this.getVictoryBanner();
    victoryBanner.classList.remove('fadeOut');

    setTimeout(() => this.transferPoints(data.playerScore, true), 500);

    setTimeout(() => {
      victoryBanner.classList.add('fadeOut');
      setTimeout(() => {
        this.showWinStatus = false;
        this.isWaitingForNextRound = true;
        this.didWin = null;
      }, 500);
    }, 1000);
  }

  handleRoundLost(data) {
    playAudio(this.audioBank.lossDing);
    this.showMessageBanner = false;
    this.isInRound = false;
    this.showWinStatus = true;
    this.challengeWaitText = 'Waiting for next challenge...';
    this.didWin = false;
    this.typedWord = '';

    const victoryBanner = this.getVictoryBanner();
    victoryBanner.classList.remove('fadeOut');

    setTimeout(() => this.transferPoints(data.playerScore, false), 500);

    setTimeout(() => {
      victoryBanner.classList.add('fadeOut');
      setTimeout(() => {
        this.showWinStatus = false;
        this.isWaitingForNextRound = true;
        this.didWin = null;
      }, 500);
    }, 1000);
  }

  transferPoints(points, victory) {
    const scoreWrapper = this.getScoreWrapper();
    const victoryTextContainer = this.getVictoryTextContainer();

    const $scoreWrapper = $(scoreWrapper);
    const $victoryTextContainer = $(victoryTextContainer);

    const startTop = $victoryTextContainer.offset().top + 20;
    const startLeft = $victoryTextContainer.offset().left + 85;
    const starIcon = document.createElement('i');
    starIcon.classList.add('fa');
    starIcon.classList.add('fa-star');
    const css =  {
      'font-size': '24px'
    };
    starIcon.style = css;

    const moveStar = (color, amount) => {
      const $starIcon = $(starIcon.cloneNode());
      $starIcon
        .offset({
          top: startTop,
          left: startLeft
        })
        .css(Object.assign({
          opacity: '0.5',
          color,
          position: 'absolute',
          'z-index': '100'
        }, css))
        .appendTo($('body'))
        .animate({
          'top': $scoreWrapper.offset().top,
          'left': $scoreWrapper.offset().left
        }, 500, 'easeInOutExpo', () => {
          if (victory) {
            playAudio(this.audioBank.winnerPointDing);
          } else {
            playAudio(this.audioBank.loserPointDing);
          }

          $scoreWrapper.effect('shake', { times: victory ? 2 : 1 }, 100);
          $starIcon.remove();
          this.currentScore += amount;
        });
    };

    let i = 1;
    let color;
    let transfers;
    let amount;
    if (victory) {
      color = 'gold';
      amount = 10;
      transfers = points / 10;
    } else {
      // bronze
      color = '#CD7F32';
      amount = 1;
      transfers = points;
    }

    while (transfers-- > 0) {
      setTimeout(() => moveStar(color, amount), 150 * i++);
    }
  }
  /* /SERVER MESSAGE HANDLERS */

  /* USER INTERACTION HANDLERS */
  handleTerminateGame(data) {
    // TODO
  }

  handleSetNicknameClick() {
    playAudio(this.audioBank.closeItem);
    this.setNickname();
  }

  handleJoinGameClick() {
    playAudio(this.audioBank.joinGame);
    this.joinGame();
  }

  handleWordSubmit() {
    if (this.canSubmitWord) {
      this.sendWord();
    } else {
      this.handleWordMismatch();
    }
  }
  /* /USER INTERACTION HANDLERS */

  /* APP LOGIC */
  setNickname() {
    this.loadingText = 'Setting nickname...';
    this.isSettingNickname = true;
    const nickname = this.currentNickname;
    const message = constructMessage(MessageTypes.SET_NICKNAME, { nickname });
    this.sendToServer(message);
  }

  joinGame() {
    this.loadingText = 'Waiting for an opponent...';
    this.isWaitingForOpponent = true;
    this.canDisplayTutorial = false;
    this.canJoinGame = false;
    const message = constructMessage(MessageTypes.JOIN_GAME);
    this.sendToServer(message);
  }

  sendWord() {
    this.isCheckingWord = true;
    const message = constructMessage(MessageTypes.TYPE_WORD, { word: this.typedWord });
    this.sendToServer(message);
  }
  /* /APP LOGIC */

  /* VISIBLITY LOGIC */
  get showLoadingBanner() {
    return this.isConnectingToServer || !this.sessionId || this.isSettingNickname || this.isWaitingForOpponent;
  }

  get showNicknameForm() {
    return !this.isConnectingToServer && !this.isNicknameSet;
  }

  get canSetNickname() {
    return !isEmpty(this.currentNickname);
  }

  get showTutorial() {
    return this.canDisplayTutorial;
  }

  get showJoinGameForm() {
    return this.canJoinGame;
  }

  get showGameArea() {
    return this.isInGame;
  }

  get showCurrentScore() {
    return this.isInGame;
  }

  get showChallengeArea() {
    return this.isInRound && !this.isWaitingForNextRound;
  }

  get showChallengeWaitArea() {
    return !this.isInRound && this.isWaitingForNextRound;
  }
  /* /VISIBLITY LOGIC */

  /* DISPLAY FORMAT LOGIC */
  get currentScoreString() {
    return ('0000' + this.currentScore).slice(-5);
  }
  /* /DISPLAY FORMAT LOGIC */

  /* GATEWAY LOGIC */
  get canSubmitWord() {
    return !isEmpty(this.typedWord);
  }

  get isWordInputDisabled() {
    return this.isCheckingWord;
  }
  /* /GATEWAY LOGIC /

  /* SHARED UTILS */
  sendToServer(message) {
    sendMessage(this.serverSocket, message);
  }
  /* /SHARED UTILS */
}

const playAudio = (audioNode) => {
  audioNode.cloneNode().play();
};

const sendMessage = (socket, message) => {
  socket.send(JSON.stringify(message));
};

const constructMessage = (type, content = {}) => {
  return {
    type,
    ...content
  };
};
