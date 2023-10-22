import { ViewItem } from "~/util/ViewItem";

export type SelectOption<L extends string, V extends string> = {
  label: L;
  value: V;
};

export class Option implements ViewItem<HTMLOptionElement> {
  private element: HTMLOptionElement;

  constructor({ label, value }: SelectOption<string, string>) {
    this.element = document.createElement("option");
    this.element.textContent = label;
    this.element.value = value;
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
