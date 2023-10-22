import { Cell, CellSink } from "sodiumjs";
import { ViewItem } from "../util/ViewItem";
import { HTMLElementEvent } from "../util/HTMLElementEvent";
import { Option, SelectOption } from "./Option";

export class SSelect<Label extends string, Value extends string>
  implements ViewItem<HTMLSelectElement>
{
  private element: HTMLSelectElement;

  public value: Cell<Value>;

  constructor(
    selectOptions: SelectOption<Label, Value>[],
    initialValue: Value
  ) {
    this.value = new Cell(initialValue);
    this.element = document.createElement("select");
    const options = selectOptions.map((option) => new Option(option));
    this.appendChild(...options);

    const selected = new CellSink(this.element.value as Value);
    this.element.addEventListener("change", {
      handleEvent: (e: HTMLElementEvent<HTMLInputElement>) => {
        selected.send(e.target.value as Value);
      },
    });
    this.value = selected;
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
