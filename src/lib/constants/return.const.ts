export enum ReturnType {
  NotModified = "NotModified",
  Success = "Success",
  Error = "Error",
}
export interface Resp<T> {
  ok: boolean;
  body: T;
  message: string;
  error?: Error | null;
  errMessage?: string;
  code?: number;
  respCode?: ReturnType;
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
    respCode: ReturnType.Error,
  };
}

export function Succeed<T>(val: T, message: string = "success"): Resp<T> {
  return {
    ok: true,
    body: val,
    message: message,
    error: null,
    respCode: ReturnType.Error,
  };
}

export function NotModified<T>(val: T, message: string = "success"): Resp<T> {
  return {
    ok: true,
    body: val,
    message: message,
    error: null,
    respCode: ReturnType.NotModified,
  };
}
