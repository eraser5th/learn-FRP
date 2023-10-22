import { Cell } from 'sodiumjs';

type Predicate<L, R> = (l: L, r: R) => boolean;

export class Rule<L, R> {
  private f: Predicate<L, R>;

  constructor(f: Predicate<L, R>) {
    this.f = f;
  }

  public reify(dep: Cell<L>, ret: Cell<R>): Cell<boolean> {
    return dep.lift(ret, this.f);
  }

  public and(other: Rule<L, R>): Rule<L, R> {
    return new Rule((d: L, r: R) => this.f(d, r) && other.f(d, r));
  }

  public or(other: Rule<L, R>): Rule<L, R> {
    return new Rule((d: L, r: R) => this.f(d, r) || other.f(d, r));
  }
}
