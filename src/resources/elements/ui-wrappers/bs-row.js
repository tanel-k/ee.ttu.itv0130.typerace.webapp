import { bindable, containerless } from 'aurelia-framework';

const DEFAULT_SIZE = 12;

/* Bootstrap row wrapper */
@containerless
export class BsRow {
  @bindable lg = DEFAULT_SIZE;
  @bindable md = DEFAULT_SIZE;
  @bindable sm = DEFAULT_SIZE;
  @bindable xs = DEFAULT_SIZE;

  attached() {}
}
