import { StorageKeys } from '../constants/StorageKeys';

export class CacheService {
  static save(key, value) {
    localStorage.setItem(
      key,
      JSON.stringify({
        value,
      })
    );
  }

  static saveWithExpireDate(key, value) {
    localStorage.setItem(
      key,
      JSON.stringify({
        value,
      })
    );
  }

  static get(key) {
    const itemString = localStorage.getItem(key);
    if (!itemString) return null;
    const item = JSON.parse(itemString);
    return item.value;
  }

  static remove(key) {
    localStorage.removeItem(key);
  }

  static removeAll() {
    localStorage.removeItem(StorageKeys.AuthToken);
    localStorage.removeItem(StorageKeys.LoggedUser);
    localStorage.removeItem(StorageKeys.IdAnalista);
  }
}
