import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SendDatasetPage } from './send-dataset';

@NgModule({
  declarations: [
    SendDatasetPage,
  ],
  imports: [
    IonicPageModule.forChild(SendDatasetPage),
  ],
})
export class SendDatasetPageModule {}
