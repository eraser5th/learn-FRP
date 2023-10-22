import { Unit, Stream, StreamSink } from 'sodiumjs';
import { ViewItem } from '../util/ViewItem';

class Button implements ViewItem<HTMLButtonElement> {
  private button: HTMLButtonElement;
  private sClickedSink: StreamSink<Unit>;

  public sClicked: Stream<Unit>;

  constructor(name: string) {
    this.button = document.createElement('button');
    this.button.textContent = name;
    this.sClickedSink = new StreamSink<Unit>();
    this.sClicked = this.sClickedSink;

    this.button.addEventListener('click', (event: Event) => {
      this.sClickedSink.send(Unit.UNIT);
    });
  }

  getElement() {
    return this.button;
  }

  appendChild(...cs: ViewItem[]) {
    this.button.append(...cs.map((c) => c.getElement()));
    return this;
  }

  render(t: Element) {
    t.appendChild(this.button);
    return this;
  }
}

export default Button;
