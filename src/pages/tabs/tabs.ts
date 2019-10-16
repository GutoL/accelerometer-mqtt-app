import { Component } from '@angular/core';

// import { AboutPage } from '../about/about';
// import { ContactPage } from '../contact/contact';
// import { HomePage } from '../home/home';

import { GenerateDatasetPage } from '../generate-dataset/generate-dataset';
import { TestAppPage } from '../test-app/test-app';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = GenerateDatasetPage;
  tab2Root = TestAppPage;
  //tab3Root = ContactPage;

  constructor() {

  }
}
