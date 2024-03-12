import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  public save (key: string, data: any) {
    if (!data) {
      localStorage.removeItem (key);
      return;
    }
    localStorage.setItem (key, JSON.stringify (data));
  }

  public get (key: string) {
    const data =  localStorage.getItem(key);
    return data;
  }
}
