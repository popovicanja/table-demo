export class LoaderState {

  public loading = false;
  private _counter;

  constructor() {
    this._counter = 0;
  }

  showLoader(): LoaderState {
    const newState = new LoaderState();
    newState.loading = true;
    newState._counter = this._counter + 1;
    return newState;
  }

  hideLoader(): LoaderState {
    const newState = new LoaderState();
    if (this._counter > 1) {
      newState.loading = true;
    }
    newState._counter = this._counter === 0 ? this._counter : this._counter - 1;
    return newState;
  }

}
