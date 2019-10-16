import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TestAppPage } from './test-app';

@NgModule({
  declarations: [
    TestAppPage,
  ],
  imports: [
    IonicPageModule.forChild(TestAppPage),
  ],
})
export class TestAppPageModule {}
