export class Page {

  constructor(public pageIndex = 1, public pageSize = 10) { }

  next(): Page {
    return new Page(this.pageIndex + 1, this.pageSize);
  }

  first(): Page {
    return new Page(1, this.pageSize);
  }

  getOffset() {
    return (this.pageIndex - 1) * this.pageSize;
  }

}
