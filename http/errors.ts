interface ExceptionPayload {
  message: string;
}

class HTTPException extends Error {
  constructor(public payload: ExceptionPayload) {
    super(payload.message);
  }
}

class NotFound extends HTTPException {}

export { HTTPException, NotFound };
