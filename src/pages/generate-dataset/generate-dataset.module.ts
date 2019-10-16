import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GenerateDatasetPage } from './generate-dataset';

@NgModule({
  declarations: [
    GenerateDatasetPage,
  ],
  imports: [
    IonicPageModule.forChild(GenerateDatasetPage),
  ],
})
export class GenerateDatasetPageModule {}
