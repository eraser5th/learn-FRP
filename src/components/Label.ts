import { ViewItem } from "~/util/ViewItem";

export class Label implements ViewItem<HTMLSpanElement> {
  private element: HTMLSpanElement;

  constructor(label: string) {
    this.element = document.createElement("span");
    this.element.textContent = label;
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
