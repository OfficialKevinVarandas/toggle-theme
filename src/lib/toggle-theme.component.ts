import { CommonModule } from "@angular/common";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { ToggleThemeServivce } from "./toggle-theme.service";

@Component({
  standalone: true,
  selector: "lib-toggle-theme",
  templateUrl: "./toggle-theme.html",
  styleUrls: ["../../styles/styles.scss"],
  imports: [CommonModule],
})
export class ToggleThemeComponent implements OnInit, OnDestroy {
  isDark: boolean = false;
  private subscription!: Subscription;

  constructor(private toggleService: ToggleThemeServivce) {}

  ngOnInit(): void {
    const theme = this.getPreferedTheme() || this.isDarkThemePrefered();
    this.toggleService.setDarkTheme(theme);

    this.subscription = this.toggleService.isDark.subscribe(
      (dark) => (this.isDark = dark)
    );

    document.documentElement.classList.toggle("dark");
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private isDarkThemePrefered(): boolean {
    const hasDarkPreference = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    return hasDarkPreference;
  }

  private getPreferedTheme() {
    return localStorage.getItem("user-theme") === "dark";
  }

  toggleTheme(): void {
    this.toggleService.setDarkTheme(!this.isDark);
  }
}
