export class PaginationMeta {
  itemsPerPage: number;
  totalItems: number;
  currentPage: number;
  totalPages: number;

  constructor(
    itemsPerPage: number,
    totalItems: number,
    currentPage: number,
    totalPages: number,
  ) {
    this.itemsPerPage = itemsPerPage;
    this.totalItems = totalItems;
    this.currentPage = currentPage;
    this.totalPages = totalPages;
  }
}

export class Pagination<T> {
  meta: PaginationMeta;
  data: T;

  constructor(pagationMega: PaginationMeta, data: T) {
    this.meta = pagationMega;
    this.data = data;
  }
}
