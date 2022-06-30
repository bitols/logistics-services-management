export interface ISessionsRepository {
  create(id: string, email: string, senderId: string): Promise<string>;
  validation(
    token: string,
  ): Promise<{ id: string; email: string; senderId: string }>;
}
