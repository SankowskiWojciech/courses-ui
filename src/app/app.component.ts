import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DEFAULT_LANGUAGE } from './constant/default-language.constant';

@Component({
  selector: 'courses-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'courses-ui';

  constructor(translate: TranslateService) {
    translate.setDefaultLang(DEFAULT_LANGUAGE);
    translate.use(DEFAULT_LANGUAGE);
  }
}
