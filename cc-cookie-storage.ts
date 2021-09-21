import { CcCookieKey } from "./cc-cookie-key";

export abstract class CcCookieStorage {
  public static setCookie(key: CcCookieKey, data: any, days?: number): void {
    if (!days) {
      days = 365 * 20;
    }

    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);

    const expires = "; expires=" + date.toUTCString();

    document.cookie = key + "=" + data + expires + "; path=/" + "; SameSite=None; Secure";
  }

  public static getCookie(key: CcCookieKey): any {
    const nameLenPlus = key.length + 1;
    return (
      document.cookie
        .split(";")
        .map(c => c.trim())
        .filter(cookie => {
          return cookie.substring(0, nameLenPlus) === `${key}=`;
        })
        .map(cookie => {
          return decodeURIComponent(cookie.substring(nameLenPlus));
        })[0] || null
    );
  }

  public static eraseCookie(key: CcCookieKey): void {
    this.setCookie(key, "", -1);
  }
}