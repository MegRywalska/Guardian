import { Component, OnInit } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";

interface Locale {
  localeCode: string;
  label: string;
}

@Component({
  selector: 'app-header-navigator',
  templateUrl: './header-navigator.component.html',
  styleUrls: ['./header-navigator.component.css']
})
export class HeaderNavigatorComponent implements OnInit {
  constructor(private translate: TranslateService) {
    translate.setDefaultLang('en');
  }

  locales: Locale[] = [
    { localeCode: 'en', label: 'English' },
    { localeCode: 'pl', label: 'Polski'},
  ];

  currentDate: number = Date.now();

  ngOnInit(): void {
  }

  useLanguage(language: string): void {
    this.translate.use(language);
  }


}
