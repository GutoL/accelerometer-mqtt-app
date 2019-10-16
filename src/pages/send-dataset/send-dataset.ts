import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Paho } from 'ng2-mqtt/mqttws31';
/**
 * Generated class for the SendDatasetPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-send-dataset',
  templateUrl: 'send-dataset.html',
})
export class SendDatasetPage {

  data: any;
  ip:string = "m15.cloudmqtt.com";
  port:number = 36894; // 1883;
  topic: string = "experiment";
  type:string = 'fall';
  userName: string = 'bvmodozi';
  password: string = '1jPErVdZYG0G';
  observation: string = "";
  SSL: boolean = true;

  // data: any;
  // ip:string = "192.168.0.137";
  // port:number = 9002; // 1883;
  // topic: string = "experiment";
  // type:string = 'fall';
  // userName: string = '';
  // password: string = '';
  // SSL: boolean = true;

  dataToSend;
  client;



  constructor(public navCtrl: NavController, public navParams: NavParams,
     private alert:AlertController) {

    this.data = navParams.get("param");
    //this.client = new Paho.MQTT.Client(this.ip, this.port, this.topic);

  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad SendDatasetPage');
  }

  sendData(){

    try{

      this.dataToSend = {type:this.type, observation: this.observation, data: this.data};

      this.client = new Paho.MQTT.Client(this.ip, Number(this.port), this.topic);
      this.client.connect({
        useSSL: this.SSL,
        userName: this.userName,
        password: this.password,
        onSuccess: this.onConnected.bind(this)
      });
    }catch(err){
      const alert = this.alert.create({
        title: 'Error!',
        subTitle: err,
        buttons: ['OK']
      });
      alert.present();
    }
    
    
  }

  // callback
  onConnected() {
    console.log("Mqtt connected");

    try{
      
      let packet = new Paho.MQTT.Message(JSON.stringify(this.dataToSend));
      packet.destinationName = this.topic;
      this.client.send(packet);

      const alert = this.alert.create({
        title: 'Done!',
        subTitle: "Message sent to broker",
        buttons: ['OK']
      });
      alert.present();

    }catch(err){
      const alert = this.alert.create({
        title: 'Error!',
        subTitle: err,
        buttons: ['OK']
      });
      alert.present();
    }

    /*this.client.subscribe("/mytopic/1/something");
    this.client.subscribe("/mytopic/1/something");
    this.client.subscribe("/mytopic/1/something");*/
  }
  

}
