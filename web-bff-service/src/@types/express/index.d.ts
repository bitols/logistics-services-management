declare namespace Express {
  export interface Request {
    credential: {
      id: string;
      email: string;
      senderId: string;
    };
  }
}
