import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

const DEFAULT_LANGUAGE = 'pl';

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
