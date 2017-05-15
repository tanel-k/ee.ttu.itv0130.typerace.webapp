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
  }

  setNickname() {
    this.loadingText = 'Setting nickname...';
    this.isSettingNickname = true;
    const nickname = this.currentNickname;
    const message = constructMessage(MessageTypes.SET_NICKNAME, { nickname });
    this.sendToServer(message);
  }

  initStateModel() {
    this.isConnectingToServer = false;
    this.isSettingNickname = false;

    this.sessionId = null;
    this.isNicknameSet = false;
  }

  initDOMHooks() {

  }

  attachDOMListeners() {

  }

  detachDOMListeners() {

  }

  get showLoadingBanner() {
    return this.isConnectingToServer || !this.sessionId || this.isSettingNickname;
  }

  get showNicknameForm() {
    return !this.isConnectingToServer && !this.isNicknameSet;
  }

  get canSetNickname() {
    return !isEmpty(this.currentNickname);
  }

  sendToServer(message) {
    sendMessage(this.serverSocket, message);
  }
}

const sendMessage = (socket, message) => {
  socket.send(JSON.stringify(message));
};

const constructMessage = (type, content) => {
  return {
    type,
    ...content
  };
};
