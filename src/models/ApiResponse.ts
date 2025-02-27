export default interface ApiResponse<T> {
  succeeded: boolean;
  statusCode: number;
  message: string;
  errors: string[];
  data: T;
}
