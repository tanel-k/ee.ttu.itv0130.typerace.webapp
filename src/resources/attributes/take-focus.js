import { customAttribute, inject } from 'aurelia-framework';

@customAttribute('take-focus')
@inject(Element)
export class KeyReturn {
  constructor(element) {
    this.element = element;
  }

  attached() {
    this.element.focus();
  }
}
