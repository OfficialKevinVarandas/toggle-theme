import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ToggleThemeServivce {
  private _darkTheme = new BehaviorSubject<boolean>(false);
  isDark = this._darkTheme.asObservable();

  constructor() {}

  setDarkTheme(isDarkTheme: boolean): void {
    this._darkTheme.next(isDarkTheme);
  }
}
