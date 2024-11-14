interface Msg {
  Status: number;
  Message: string;
}

export function HandleAxiosErr(e: any): Msg {
  if (e.response) {
    console.error("--| Response Error:", e.message, e.response.data.message);
    let msg: string = "";
    if (typeof e.response.data.message === "string") {
      msg = e.response.data.message;
    } else if (
      Array.isArray(e.response.data.message) &&
      e.response.data.message.length > 0
    ) {
      msg = e.response.data.message[0];
    } else {
      msg = JSON.stringify(e.response.data.message);
    }
    return { Status: e.response?.status, Message: msg };
  } else if (e.request) {
    console.error("--| Request Error:", e.message);
    return { Status: 503, Message: e.message };
  } else {
    return { Status: 400, Message: "Request Format Error" };
  }
}
