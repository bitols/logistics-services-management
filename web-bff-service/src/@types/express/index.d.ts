declare namespace Express {
  export interface Request {
    credential: {
      email: string;
      senderId: string;
    };
  }
}
