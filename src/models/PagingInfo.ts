export default interface PagingInfo {
  page: number;
  pageItemCount: number;
  totalItemsCount: number;
  pageCount: number;
  rowStart: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
}
