import Cookies from 'js-cookie';

export function setCookie(name: string, value: string, days = 7) {
  Cookies.set(name, value, { expires: days, path: '/' });
}

export function getCookie(name: string): string | undefined {
  return Cookies.get(name);
}

export function removeCookie(name: string) {
  Cookies.remove(name, { path: '/' });
} 