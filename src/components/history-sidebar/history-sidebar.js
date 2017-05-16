import { inject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';

import 'jquery';
import 'jquery-ui-dist';

import * as eventTypes from '../../events/event-types';
import { formatSeconds } from '../../lib/time-utils';

@inject(Element, EventAggregator)
export class HistorySidebar {
  constructor(element, ea) {
    this.element = element;
    this.ea = ea;
  }

  attached() {
    this.initStateModel();
    this.initDOMHooks();
    this.attachEventListeners();
  }

  initStateModel() {
    this.isActive = false;
    this.scoreEntries = [];
  }

  initDOMHooks() {
    this.historyContainer = this.element.querySelector('.history-container');
    this.closeButton = this.element.querySelector('.close-button');
  }

  attachEventListeners() {
    this.historyContainer.addEventListener('click', () => {
      this.activateHistoryContainer();
    });

    this.ea.subscribe(eventTypes.NewScore, event => {
      this.addScoreEntry(event.scoreData);
      /*
      this.animatePriceLabel();
      this.audioBank.cartClank.cloneNode().play();
      this.$cartIcon.effect('shake', { times: 2 }, 200);
      */
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

  addScoreEntry({ opponentTimeMillis, playerTimeMillis, word}) {
    this.scoreEntries.push({
      word,
      playerTimeString: formatMillis(playerTimeMillis),
      opponentTimeString: formatMillis(opponentTimeMillis),
      didWin: opponentTimeMillis > playerTimeMillis
    });
  }
}

const formatMillis = (millis) => (formatSeconds(millis / 1000));
