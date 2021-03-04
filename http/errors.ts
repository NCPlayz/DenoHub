class HTTPException extends Error {
  constructor(public payload: any) {
    super(payload.message);
  }
}

class NotFound extends HTTPException {}

export { HTTPException, NotFound };
