export interface ApiResponse<T> {
  data: T;
}

export interface ApiErrorResponse {
  error: {
    message: string;
    code?: string;
    details?: string;
  };
}
