import { ViewItem } from '../util/ViewItem';

export class Template implements ViewItem<HTMLDivElement> {
  private element: HTMLDivElement;

  constructor() {
    this.element = document.createElement('div');
  }

  getElement() {
    return this.element;
  }

  appendChild(...cs: ViewItem[]) {
    this.element.append(...cs.map((c) => c.getElement()));
    return this;
  }

  render(t: Element) {
    t.append(this.element);
  }
}
