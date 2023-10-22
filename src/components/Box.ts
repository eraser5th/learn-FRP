import { ViewItem } from "~/util/ViewItem";

export class Box implements ViewItem<HTMLDivElement> {
  private element: HTMLDivElement;

  constructor() {
    this.element = document.createElement("div");
  }

  getElement() {
    return this.element;
  }

  appendChild(...c: ViewItem[]) {
    this.element.append(...c.map((c) => c.getElement()));
    return this;
  }

  render(t: Element) {
    t.append(this.element);
  }
}
