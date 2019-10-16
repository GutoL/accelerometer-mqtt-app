import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { DeviceMotionAccelerometerOptions, DeviceMotion, DeviceMotionAccelerationData } from '@ionic-native/device-motion';
import { Paho } from 'ng2-mqtt/mqttws31';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import 'rxjs/add/observable/forkJoin';

/**
 * Generated class for the TestAppPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-test-app',
  templateUrl: 'test-app.html',
})
export class TestAppPage {

  windowTime: number;
  frequency: number;
  haveTime: boolean;
  timeout: number;
  subscription: any;

  x: number;
  y: number;
  z: number;
  timeStamp: number;
  xs: number[] =[];
  ys: number[] =[];
  zs: number[] =[];
  timeStamps: number[] = [];
  showAccelerometerValues: boolean;

  dataToSend: any;
  ip:string = "m15.cloudmqtt.com";
  port:number = 36894; // 1883;
  topic: string = "experiment";
  userName: string = 'bvmodozi';
  password: string = '1jPErVdZYG0G';
  SSL: boolean = true;

  // dataToSend: any;
  // ip:string = "192.168.0.137";
  // port:number = 9002; // 1883;
  // topic: string = "experiment";
  // userName: string = '';
  // password: string = '';
  // SSL: boolean = false;

  client;

  sub: Subscription;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    private deviceMotion: DeviceMotion, private alert: AlertController) {
    
    this.haveTime = false;
    this.timeout = 10;
    this.windowTime = 5;
    this.frequency = 200;
    this.showAccelerometerValues = false;
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad TestAppPage');
  }

  startMonitoring():boolean{
    

    if(Number(this.timeout)==0){
      const alert = this.alert.create({
        title: "Error!",
        subTitle: "Please, provide a experiment time higher than 0",
        buttons: ['OK']
      });
      alert.present();
      return false;
    }
    else if((Number(this.windowTime) > Number(this.timeout)) && ((Number(this.timeout)) > 0)){
      const alert = this.alert.create({
        title: "Error!",
        subTitle: "Please provide an experiment time value greater than zero",
        buttons: ['OK']
      });
      alert.present();
      return false;
    }

    this.showAccelerometerValues = true;

    try{

      if(this.frequency == undefined){
        this.frequency = 200;
      }

      let config: DeviceMotionAccelerometerOptions = { frequency: Number(this.frequency) }

      this.subscription = this.deviceMotion.watchAcceleration(config)
        .subscribe((acceleration: DeviceMotionAccelerationData) => {
            this.x = acceleration.x;
            this.y = acceleration.y;
            this.z = acceleration.z;
            this.timeStamp = acceleration.timestamp;
            
            this.xs.push(this.x);
            this.ys.push(this.y);
            this.zs.push(this.z);
            this.timeStamps.push(this.timeStamp);                       
          }
        );

      this.sub = Observable.interval(this.windowTime*1000).subscribe((response) => {
        this.sendData();        
      });

      // running the two observable in parallel
      Observable.forkJoin([this.subscription,this.sub]);

      if(this.haveTime){
        setTimeout(() => {
          this.stopMonitoring();
        }, (this.timeout*1000));
      }

    }catch(err){
      console.log(err);
    }

  }



  stopMonitoring(){

    this.showAccelerometerValues = false;
    
    if(this.subscription != null && this.sub != null){
      
      this.xs = [];
      this.ys = [];
      this.zs = [];
      this.timeStamps = [];

      this.sub.unsubscribe();
      this.subscription.unsubscribe();

      const alert = this.alert.create({
        title: "Stop",
        subTitle: "Finishing the experiment!",
        buttons: ['OK']
      });
      alert.present();

    } 
    
  }

  sendData(): boolean{
    
    let timeStamps = this.timeStamps.slice(0);
    let xs = this.xs.slice(0);
    let ys = this.ys.slice(0);
    let zs = this.zs.slice(0);

    this.xs = [];
    this.ys = [];
    this.zs = [];
    this.timeStamps = [];

    if(xs.length > 0){
      this.dataToSend = [];
      
      for(let i=0; i < xs.length; i++){
        this.dataToSend.push({timestamp: timeStamps[i], x: xs[i], y: ys[i],z: zs[i]});
      }
      
    }
    let dataTemp = this.dataToSend.slice(0);

    this.dataToSend = {data: dataTemp};
    //this.dataToSend = {type:"", observation:"", data: dataTemp};
    //console.log(this.dataToSend);
    //this.dataToSend = "hello world";

    try{
      
      this.client = new Paho.MQTT.Client(this.ip, Number(this.port), this.topic);
      this.client.connect({
        useSSL: this.SSL,
        userName: this.userName,
        password: this.password,
        onSuccess: this.onConnected.bind(this)
      });

      
      return true;

    }catch(err){
      const alert = this.alert.create({
        title: 'Error!',
        subTitle: err,
        buttons: ['OK']
      });
      alert.present();
      return false;
    }

  }


  // callback
  onConnected(){
    console.log("Mqtt connected");

    try{
      
      let packet = new Paho.MQTT.Message(JSON.stringify(this.dataToSend));
      packet.destinationName = this.topic;
      this.client.send(packet);
      this.client.disconnect();

      // const alert = this.alert.create({
      //   title: 'Done!',
      //   subTitle: "Message sent to broker",
      //   buttons: ['OK']
      // });
      // alert.present();

    }catch(err){
      const alert = this.alert.create({
        title: 'Error!',
        subTitle: err,
        buttons: ['OK']
      });
      alert.present();
    }

  }

}
