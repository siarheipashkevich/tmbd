export default class Storage {
  static set(key: string, value: unknown) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  static get<T>(key: string, defaultValue: T): T {
    const storedValue = localStorage.getItem(key);

    if (storedValue === null) {
      return defaultValue;
    }

    try {
      return JSON.parse(storedValue) as T;
    } catch {
      return storedValue as T;
    }
  }

  static remove(key: string) {
    localStorage.removeItem(key);
  }
}
