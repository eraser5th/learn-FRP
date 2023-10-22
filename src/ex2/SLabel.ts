import { Cell, Operational } from 'sodiumjs';
import { ViewItem } from '../util/ViewItem';

class SLabel implements ViewItem<HTMLHeadingElement> {
  private label: HTMLHeadingElement;

  constructor(text: Cell<string>) {
    Operational.updates(text).listen((t) => {
      this.setText(t);
    });

    this.label = document.createElement('h5');
  }

  setText(t: string) {
    this.label.textContent = t;
  }

  getElement() {
    return this.label;
  }

  appendChild(...cs: ViewItem[]) {
    this.label.append(...cs.map((c) => c.getElement()));
    return this;
  }

  render(t: Element) {
    t.appendChild(this.label);
  }
}

export default SLabel;
