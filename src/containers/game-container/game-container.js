import { inject, bindable } from 'aurelia-framework';

import { DataAPI } from '../../gateways/data/data-api';
import { ConnectionAPI } from '../../gateways/connection/connection-api';

import { isEmpty } from '../../lib/string-utils';
import * as MessageTypes from '../../lib/message-types';

@inject(Element, DataAPI, ConnectionAPI)
export class GameContainer {
  @bindable currentNickname = '';

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

    serverSocket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      switch (data.type) {
      case MessageTypes.CONNECT_RESPONSE:
        this.handleConnectResponse(data);
        break;
      case MessageTypes.SET_NICKNAME_RESPONSE:
        this.handleSetNicknameResponse(data);
        break;
      default:
        break;
      }
      console.log(data);
    };
  }

  handleConnectResponse(data) {
    this.sessionId = data.sessionId;
  }

  handleSetNicknameResponse(data) {
    this.isSettingNickname = false;
    this.isNicknameSet = true;
    this.canDisplayTutorial = true;
    this.canJoinGame = true;
  }

  handleSetNicknameClick() {
    playAudio(this.audioBank.closeItem);
    this.setNickname();
  }

  setNickname() {
    this.loadingText = 'Setting nickname...';
    this.isSettingNickname = true;
    const nickname = this.currentNickname;
    const message = constructMessage(MessageTypes.SET_NICKNAME, { nickname });
    this.sendToServer(message);
  }

  handleJoinGameClick() {
    playAudio(this.audioBank.joinGame);
    this.joinGame();
  }

  joinGame() {
    this.loadingText = 'Waiting for an opponent...';
    this.isWaitingForOpponent = true;
    this.canDisplayTutorial = false;
    this.canJoinGame = false;
    const message = constructMessage(MessageTypes.JOIN_GAME);
    this.sendToServer(message);
  }

  initStateModel() {
    this.isConnectingToServer = false;
    this.isSettingNickname = false;

    this.canJoinGame = false;
    this.canDisplayTutorial = false;

    this.sessionId = null;
    this.isNicknameSet = false;
    this.loadingText = null;
  }

  initDOMHooks() {

  }

  attachDOMListeners() {

  }

  detachDOMListeners() {

  }

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

  sendToServer(message) {
    sendMessage(this.serverSocket, message);
  }
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
