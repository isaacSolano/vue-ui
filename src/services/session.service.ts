export class SessionService {
  public createSession(key: string, emailAddress: string) {
    sessionStorage.setItem(key, emailAddress);
  }

  public getSession(key: string) {
    return sessionStorage.getItem(key) || "not-found";
  }

  public closeSession(key: string) {
    sessionStorage.removeItem(key);
  }
}
