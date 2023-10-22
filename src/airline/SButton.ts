import {
  Cell,
  Operational,
  Stream,
  StreamSink,
  Transaction,
  Unit,
} from 'sodiumjs';
import { ViewItem } from '../util/ViewItem';
import { HTMLElementEvent } from '../util/HTMLElementEvent';

export class SButton implements ViewItem<HTMLButtonElement> {
  private element: HTMLButtonElement;
  public sClicked: Stream<Unit>;

  constructor(label: string, enabled: Cell<boolean>) {
    this.element = document.createElement('button');
    this.element.type = 'button';
    this.element.textContent = label;

    const sClickedSink = new StreamSink<Unit>();
    this.sClicked = sClickedSink;

    this.element.addEventListener('click', {
      handleEvent: (e: HTMLElementEvent<HTMLButtonElement>) => {
        sClickedSink.send(Unit.UNIT);
      },
    });
    Transaction.onStart(() => {
      this.setEnabled(enabled.sample());
    });
    Operational.updates(enabled).listen((enabled) => {
      this.setEnabled(enabled);
    });
  }

  setEnabled(enabled: boolean) {
    this.element.disabled = !enabled;
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
