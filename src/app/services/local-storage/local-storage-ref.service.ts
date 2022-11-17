import { Injectable } from '@angular/core';


const getLocalStorage = (): Storage => {
  return localStorage;
}

@Injectable({ providedIn: "root" })
export class LocalStorageRefService {
  get localStorage(): Storage {
    return getLocalStorage();
  }
}