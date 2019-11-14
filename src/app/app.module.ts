import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';


import { GenerateDatasetPage } from '../pages/generate-dataset/generate-dataset';
import { TestAppPage } from '../pages/test-app/test-app';
import { SendDatasetPage } from '../pages/send-dataset/send-dataset';

import { Geolocation } from '@ionic-native/geolocation/ngx';
// import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';


import {DeviceMotion} from '@ionic-native/device-motion';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    GenerateDatasetPage,  
    TestAppPage, 
    SendDatasetPage, 
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    GenerateDatasetPage,  
    TestAppPage, 
    SendDatasetPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    DeviceMotion,
    Geolocation,
    // AndroidPermissions,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
