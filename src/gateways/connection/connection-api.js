import environment from '../../environment';

export class ConnectionAPI {
  constructor() {
    this.socketRootURL = environment.socketRootURL;
  }

  getGameSocketConnection() {
    return new WebSocket(`${this.socketRootURL}/game`);
  }
}
