import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {DeviceMotion, DeviceMotionAccelerationData, DeviceMotionAccelerometerOptions} from '@ionic-native/device-motion';
import { AlertController } from 'ionic-angular';

import {SendDatasetPage} from '../send-dataset/send-dataset';

/**
 * Generated class for the GenerateDatasetPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-generate-dataset',
  templateUrl: 'generate-dataset.html',
})
export class GenerateDatasetPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
     private deviceMotion: DeviceMotion, private alert: AlertController) {
  }

  subscription: any;
  xs: number[] =[];
  ys: number[] =[];
  zs: number[] =[];
  timeStamps: number[] = [];
  showAccelerometerValues: boolean = false;
  frequency: number = 200;
  timeout: number = 5;

  showButtonSend:boolean = false;

  x:number;
  y:number;
  z:number;
  timeStamp: number;

  ip: string;

  ionViewDidLoad() {
    //console.log('ionViewDidLoad GenerateDatasetPage');
  }

  startAccelerometer(){
    try{
      this.showButtonSend = false;

      if(this.frequency == undefined){
        this.frequency = 200;
      }

      var config: DeviceMotionAccelerometerOptions = { frequency: Number(this.frequency) }

      this.subscription = this.deviceMotion.watchAcceleration(config)
        .subscribe((acceleration: DeviceMotionAccelerationData) => {
          
          this.showAccelerometerValues = true;

          this.x = acceleration.x;
          this.y = acceleration.y;
          this.z = acceleration.z;
          this.timeStamp = acceleration.timestamp;

          this.xs.push(acceleration.x);
          this.ys.push(acceleration.y);
          this.zs.push(acceleration.z);
          this.timeStamps.push(acceleration.timestamp);
          }
        );

        setTimeout(() => {
          this.stopAccelerometer();
        }, (this.timeout*1000));


    }catch(err){
      console.log(err);
    }
  }

  stopAccelerometer(){
    if(this.xs.length==0 || this.ys.length==0 || this.zs.length==0){
      const alert = this.alert.create({
        title: 'Experiment does not started!',
        subTitle: 'Please, run an experiment!',
        buttons: ['OK']
      });
      alert.present();
    } 
    else{ //*/
      this.showButtonSend = true;
    }
    
    this.showAccelerometerValues = false;
    if(this.subscription != null){
      this.subscription.unsubscribe();
    }    
  }

  sendData(){

    let data = [];

    for(let i=0; i < this.xs.length; i++){
      data.push({timestamp: this.timeStamps[i], x: this.xs[i], y: this.ys[i],z: this.zs[i]});
    }

    if(!this.showButtonSend || this.xs.length==0 || this.ys.length==0 || this.zs.length==0){
      const alert = this.alert.create({
        title: 'Error!',
        subTitle: 'Please, run an experiment!',
        buttons: ['OK']
      });
      alert.present();
    }
    else{ // */
      //console.log('calling the page to send data...');
      this.navCtrl.push(SendDatasetPage, {param: data});
      this.timeStamps = [];
      this.xs = [];
      this.ys = [];
      this.zs = [];
    }
  }

}
