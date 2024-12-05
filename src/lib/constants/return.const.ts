export interface Resp<T> {
  ok: boolean;
  body: T;
  message: string;
  error?: Error | null;
  errMessage?: string;
  code?: number;
}

export function FAIL(
  errMessage: string,
  code = 400,
  e: Error | null = null,
): Resp<any> {
  // logTrace('Error Response', errMessage, ColorEnums.BgMagenta, 3);

  return {
    ok: false,
    body: null,
    error: e,
    message: errMessage,
    errMessage,
    code,
  };
}

export function Succeed<T>(val: T, message: string = "success"): Resp<T> {
  return {
    ok: true,
    body: val,
    message: message,
    error: null,
  };
}
