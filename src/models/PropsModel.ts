import ApiResponse from "./ApiResponse";

export default interface PropsModel<T> {
  succeeded: boolean;
  errorMessage: string;
  data: T;
}

export function setPropsModel<T>(response: ApiResponse<T>) {
  const props: PropsModel<T> = {
    succeeded: response.succeeded,
    errorMessage: response.message,
    data: response.data,
  };
  return props;
}
