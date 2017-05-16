import { inject } from 'aurelia-framework';

import 'jquery';

@inject(Element)
export class HistorySidebar {
  constructor(element) {
    this.element = element;
  }

  attached() {
    this.initDOMHooks();
    this.attachEventListeners();
  }

  initStateModel() {
    this.isActive = false;
  }

  initDOMHooks() {
    this.historyContainer = this.element.querySelector('.history-container');
    this.closeButton = this.element.querySelector('.close-button');
  }

  attachEventListeners() {
    this.historyContainer.addEventListener('click', () => {
      this.activateHistoryContainer();
    });
/*
    this.closeButton.addEventListener('click', () => {
      this.deactivateHistoryContainer();
    });
*/
  }

  activateHistoryContainer() {
    if (!this.isActive) {
      this.historyContainer.classList.add('active');
      const overlayDiv = document.createElement('div');
      overlayDiv.classList.add('page-overlay');
      document.body.appendChild(overlayDiv);
      overlayDiv.addEventListener('click', () => this.deactivateHistoryContainer());
      this.isActive = true;
    }
  }

  deactivateHistoryContainer() {
    if (this.isActive) {
      this.historyContainer.classList.remove('active');
      const overlayDiv = document.querySelector('.page-overlay');
      if (overlayDiv) {
        document.body.removeChild(overlayDiv);
      }
      this.isActive = false;
    }
  }
}
