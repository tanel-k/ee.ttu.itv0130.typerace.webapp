export class App {
  constructor() { }

  configureRouter(cfg, router) {
    this.router = router;
    cfg.title = 'Typerace';

    cfg.map([
      {
        route: '',
        name: 'game',
        moduleId: 'containers/game-container/game-container'
      }
    ]);
  }
}
