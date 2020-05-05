class UserModule {
  //from Fede's UserModule.ts
  emitter = new EventTarget();
  get token() {
    const token = localStorage.getItem("token");
    return token == null ? "" : token;
  }
  set token(token) {
    localStorage.setItem("token", token);
    if (this.logged) this.emitter.dispatchEvent(new Event("login"));
  }
  get username() {
    try {
      return JSON.parse(atob(this.token.split(".")[1])).username;
    } catch {
      return "";
    }
  }
  get userid() {
    try {
      return JSON.parse(atob(this.token.split(".")[1])).id;
    } catch {
      return "";
    }
  }
  get logged() {
    return localStorage.getItem("token") != null;
  }
  logout() {
    localStorage.removeItem("token");
    this.emitter.dispatchEvent(new Event("logout"));
  }
}
export default new UserModule();
