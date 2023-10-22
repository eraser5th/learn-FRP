import { Cell, CellSink } from 'sodiumjs';
import { ViewItem } from '../util/ViewItem';
import { HTMLElementEvent } from '../util/HTMLElementEvent';
import { Option, SelectOption } from './Option';

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
    this.element = document.createElement('select');
    const options = selectOptions.map((option) => new Option(option));
    this.appendChild(...options);

    this.value = SSelect.mkSelectedItem(this);
  }

  private static mkSelectedItem<L extends string, V extends string>(
    box: SSelect<L, V>
  ): Cell<V> {
    const selected = new CellSink(box.getElement().value as V);
    box.getElement().addEventListener('change', {
      handleEvent: (e: HTMLElementEvent<HTMLInputElement>) => {
        selected.send(e.target.value as V);
      },
    });
    return selected;
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
