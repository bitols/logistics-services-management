declare namespace Express {
  export interface Request {
    session: {
      email: string;
      senderId: string;
    };
  }
}
