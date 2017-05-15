import { customAttribute, inject } from 'aurelia-framework';

@customAttribute('no-select')
@inject(Element)
export class NoSelect {
  constructor(element) {
    this.element = element;
  }

  attached() {
    const element = this.element;
    if (!element.style) {
      element.style = {};
    }

    element.style['user-select'] = 'none';
    element.style['-webkit-user-select'] = 'none';
    element.style['-moz-user-select'] = 'none';
    element.style['-ms-user-select'] = 'none';
    element.style.cursor = 'default';
  }
}
