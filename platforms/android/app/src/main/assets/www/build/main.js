webpackJsonp([3],{

/***/ 102:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GenerateDatasetPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_device_motion__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__send_dataset_send_dataset__ = __webpack_require__(103);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * Generated class for the GenerateDatasetPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var GenerateDatasetPage = /** @class */ (function () {
    function GenerateDatasetPage(navCtrl, navParams, deviceMotion, alert) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.deviceMotion = deviceMotion;
        this.alert = alert;
        this.xs = [];
        this.ys = [];
        this.zs = [];
        this.timeStamps = [];
        this.showAccelerometerValues = false;
        this.frequency = 200;
        this.timeout = 5;
        this.showButtonSend = false;
    }
    GenerateDatasetPage.prototype.ionViewDidLoad = function () {
        //console.log('ionViewDidLoad GenerateDatasetPage');
    };
    GenerateDatasetPage.prototype.startAccelerometer = function () {
        var _this = this;
        try {
            this.showButtonSend = false;
            if (this.frequency == undefined) {
                this.frequency = 200;
            }
            var config = { frequency: Number(this.frequency) };
            this.subscription = this.deviceMotion.watchAcceleration(config)
                .subscribe(function (acceleration) {
                _this.showAccelerometerValues = true;
                _this.x = acceleration.x;
                _this.y = acceleration.y;
                _this.z = acceleration.z;
                _this.timeStamp = acceleration.timestamp;
                _this.xs.push(acceleration.x);
                _this.ys.push(acceleration.y);
                _this.zs.push(acceleration.z);
                _this.timeStamps.push(acceleration.timestamp);
            });
            setTimeout(function () {
                _this.stopAccelerometer();
            }, (this.timeout * 1000));
        }
        catch (err) {
            console.log(err);
        }
    };
    GenerateDatasetPage.prototype.stopAccelerometer = function () {
        if (this.xs.length == 0 || this.ys.length == 0 || this.zs.length == 0) {
            var alert_1 = this.alert.create({
                title: 'Experiment does not started!',
                subTitle: 'Please, run an experiment!',
                buttons: ['OK']
            });
            alert_1.present();
        }
        else {
            this.showButtonSend = true;
        }
        this.showAccelerometerValues = false;
        if (this.subscription != null) {
            this.subscription.unsubscribe();
        }
    };
    GenerateDatasetPage.prototype.sendData = function () {
        var data = [];
        for (var i = 0; i < this.xs.length; i++) {
            data.push({ timestamp: this.timeStamps[i], x: this.xs[i], y: this.ys[i], z: this.zs[i] });
        }
        if (!this.showButtonSend || this.xs.length == 0 || this.ys.length == 0 || this.zs.length == 0) {
            var alert_2 = this.alert.create({
                title: 'Error!',
                subTitle: 'Please, run an experiment!',
                buttons: ['OK']
            });
            alert_2.present();
        }
        else {
            //console.log('calling the page to send data...');
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__send_dataset_send_dataset__["a" /* SendDatasetPage */], { param: data });
        }
    };
    GenerateDatasetPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-generate-dataset',template:/*ion-inline-start:"/home/guto/bitbucket/accelerometer-mqtt-app/src/pages/generate-dataset/generate-dataset.html"*/'<!--\n  Generated template for the GenerateDatasetPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>Generate Dataset</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n\n  <ion-card>\n    <ion-card-header>\n      Configure the experiment\n    </ion-card-header>\n    <ion-card-content>\n      \n      <ion-list>\n      \n        <ion-item>\n          <ion-label floating>Frequency (in milliseconds)</ion-label>\n          <ion-input [(ngModel)]="frequency" type="number"></ion-input>\n        </ion-item>\n\n        <ion-item>\n          <ion-label floating>Experiment time (in seconds)</ion-label>\n          <ion-input [(ngModel)]="timeout" type="number"></ion-input>\n        </ion-item>\n        \n      </ion-list>\n\n    </ion-card-content>\n  </ion-card>\n  <div style="margin:-2px">\n    <button ion-button block (click)="startAccelerometer()" color="primary">Start experiment</button>\n    <button ion-button block (click)="stopAccelerometer()" color="dark">Stop experiment</button>\n\n    <ion-card *ngIf="showAccelerometerValues">\n        <ion-card-header>\n            Accelerometer data\n        </ion-card-header>\n        <ion-card-content>\n          \n          timestamp: {{timeStamp}} <br>\n          x value: {{x}} <br>\n          y value: {{y}} <br>\n          z value: {{z}} <br>\n          \n      </ion-card-content>\n    </ion-card>\n  \n    <div>\n      <h3 *ngIf="showButtonSend">Experiment Finished!</h3>\n      <button *ngIf="showButtonSend" ion-button block (click)="sendData()" color="secondary">Send dataset</button>\n    </div>\n\n  </div>\n\n\n</ion-content>\n\n'/*ion-inline-end:"/home/guto/bitbucket/accelerometer-mqtt-app/src/pages/generate-dataset/generate-dataset.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_device_motion__["a" /* DeviceMotion */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
    ], GenerateDatasetPage);
    return GenerateDatasetPage;
}());

//# sourceMappingURL=generate-dataset.js.map

/***/ }),

/***/ 103:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SendDatasetPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ng2_mqtt_mqttws31__ = __webpack_require__(157);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ng2_mqtt_mqttws31___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_ng2_mqtt_mqttws31__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * Generated class for the SendDatasetPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var SendDatasetPage = /** @class */ (function () {
    function SendDatasetPage(navCtrl, navParams, alert) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alert = alert;
        this.ip = "m15.cloudmqtt.com";
        this.port = 36894; // 1883;
        this.topic = "experiment";
        this.type = 'fall';
        this.userName = 'bvmodozi';
        this.password = '1jPErVdZYG0G';
        this.observation = "";
        this.SSL = true;
        this.data = navParams.get("param");
        //this.client = new Paho.MQTT.Client(this.ip, this.port, this.topic);
    }
    SendDatasetPage.prototype.ionViewDidLoad = function () {
        //console.log('ionViewDidLoad SendDatasetPage');
    };
    SendDatasetPage.prototype.sendData = function () {
        try {
            this.dataToSend = { type: this.type, observation: this.observation, data: this.data };
            this.client = new __WEBPACK_IMPORTED_MODULE_2_ng2_mqtt_mqttws31__["Paho"].MQTT.Client(this.ip, Number(this.port), this.topic);
            this.client.connect({
                useSSL: this.SSL,
                userName: this.userName,
                password: this.password,
                onSuccess: this.onConnected.bind(this)
            });
        }
        catch (err) {
            var alert_1 = this.alert.create({
                title: 'Error!',
                subTitle: err,
                buttons: ['OK']
            });
            alert_1.present();
        }
    };
    // callback
    SendDatasetPage.prototype.onConnected = function () {
        console.log("Mqtt connected");
        try {
            var packet = new __WEBPACK_IMPORTED_MODULE_2_ng2_mqtt_mqttws31__["Paho"].MQTT.Message(JSON.stringify(this.dataToSend));
            packet.destinationName = this.topic;
            this.client.send(packet);
            var alert_2 = this.alert.create({
                title: 'Done!',
                subTitle: "Message sent to broker",
                buttons: ['OK']
            });
            alert_2.present();
        }
        catch (err) {
            var alert_3 = this.alert.create({
                title: 'Error!',
                subTitle: err,
                buttons: ['OK']
            });
            alert_3.present();
        }
        /*this.client.subscribe("/mytopic/1/something");
        this.client.subscribe("/mytopic/1/something");
        this.client.subscribe("/mytopic/1/something");*/
    };
    SendDatasetPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-send-dataset',template:/*ion-inline-start:"/home/guto/bitbucket/accelerometer-mqtt-app/src/pages/send-dataset/send-dataset.html"*/'<!--\n  Generated template for the SendDatasetPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>sendDataset</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n  \n  <ion-card>\n\n    <ion-card-header>\n      Mqtt Configurations\n    </ion-card-header>\n  \n    <ion-card-content>\n      \n      <ion-list>\n      \n        <ion-item>\n          <ion-label floating>Broker IP</ion-label>\n          <ion-input [(ngModel)]="ip" type="text"></ion-input>\n        </ion-item>\n\n        <ion-item>\n          <ion-label floating>Broker Port</ion-label>\n          <ion-input [(ngModel)]="port" min="1" type="number"></ion-input>\n        </ion-item>\n\n        <ion-item>\n          <ion-label floating>Topic</ion-label>\n          <ion-input [(ngModel)]="topic" type="text"></ion-input>\n        </ion-item>\n        \n        <ion-item>\n          <ion-label floating>User name</ion-label>\n          <ion-input [(ngModel)]="userName" type="text"></ion-input>\n        </ion-item>\n\n        <ion-item>\n          <ion-label floating>Password</ion-label>\n          <ion-input [(ngModel)]="password" type="password"></ion-input>\n        </ion-item>\n\n        <ion-item>\n          <ion-label>Use SSL</ion-label>\n          <ion-checkbox [(ngModel)]="SSL" disabled="false"></ion-checkbox>\n        </ion-item>\n\n      </ion-list>\n\n      <div style="margin: -2px">\n        <ion-list radio-group [(ngModel)]="type">\n          <ion-list-header>\n            Type of data\n          </ion-list-header>\n        \n          <ion-item>\n            <ion-label>Fall</ion-label>\n            <ion-radio checked="true" value="fall"></ion-radio>\n          </ion-item>\n        \n          <ion-item>\n            <ion-label>Activity of daily living</ion-label>\n            <ion-radio value="adl"></ion-radio>\n          </ion-item>\n\n        </ion-list>\n      </div>\n      <div>\n        <ion-item>\n          <ion-label floating>Observation</ion-label>\n          <ion-input type="text" [(ngModel)]="observation"></ion-input>\n        </ion-item>\n      </div>\n\n    </ion-card-content>\n  \n  </ion-card>\n\n  <div>\n    <button ion-button block (click)="sendData()" color="primary">Send</button>\n  </div>\n\n</ion-content>\n'/*ion-inline-end:"/home/guto/bitbucket/accelerometer-mqtt-app/src/pages/send-dataset/send-dataset.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
    ], SendDatasetPage);
    return SendDatasetPage;
}());

//# sourceMappingURL=send-dataset.js.map

/***/ }),

/***/ 104:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TestAppPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_device_motion__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ng2_mqtt_mqttws31__ = __webpack_require__(157);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ng2_mqtt_mqttws31___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_ng2_mqtt_mqttws31__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Observable__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_observable_interval__ = __webpack_require__(255);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_observable_interval___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_observable_interval__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_observable_forkJoin__ = __webpack_require__(264);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_observable_forkJoin___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_add_observable_forkJoin__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







/**
 * Generated class for the TestAppPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var TestAppPage = /** @class */ (function () {
    function TestAppPage(navCtrl, navParams, deviceMotion, alert) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.deviceMotion = deviceMotion;
        this.alert = alert;
        this.xs = [];
        this.ys = [];
        this.zs = [];
        this.timeStamps = [];
        this.ip = "m15.cloudmqtt.com";
        this.port = 36894; // 1883;
        this.topic = "experiment";
        this.userName = 'bvmodozi';
        this.password = '1jPErVdZYG0G';
        this.SSL = true;
        this.haveTime = false;
        this.timeout = 10;
        this.windowTime = 5;
        this.frequency = 200;
        this.showAccelerometerValues = false;
    }
    TestAppPage.prototype.ionViewDidLoad = function () {
        //console.log('ionViewDidLoad TestAppPage');
    };
    TestAppPage.prototype.startMonitoring = function () {
        var _this = this;
        if (Number(this.timeout) == 0) {
            var alert_1 = this.alert.create({
                title: "Error!",
                subTitle: "Please, provide a experiment time higher than 0",
                buttons: ['OK']
            });
            alert_1.present();
            return false;
        }
        else if ((Number(this.windowTime) > Number(this.timeout)) && ((Number(this.timeout)) > 0)) {
            var alert_2 = this.alert.create({
                title: "Error!",
                subTitle: "Please provide an experiment time value greater than zero",
                buttons: ['OK']
            });
            alert_2.present();
            return false;
        }
        this.showAccelerometerValues = true;
        try {
            if (this.frequency == undefined) {
                this.frequency = 200;
            }
            var config = { frequency: Number(this.frequency) };
            this.subscription = this.deviceMotion.watchAcceleration(config)
                .subscribe(function (acceleration) {
                _this.x = acceleration.x;
                _this.y = acceleration.y;
                _this.z = acceleration.z;
                _this.timeStamp = acceleration.timestamp;
                _this.xs.push(_this.x);
                _this.ys.push(_this.y);
                _this.zs.push(_this.z);
                _this.timeStamps.push(_this.timeStamp);
            });
            this.sub = __WEBPACK_IMPORTED_MODULE_4_rxjs_Observable__["Observable"].interval(this.windowTime * 1000).subscribe(function (response) {
                _this.sendData();
            });
            // running the two observable in parallel
            __WEBPACK_IMPORTED_MODULE_4_rxjs_Observable__["Observable"].forkJoin([this.subscription, this.sub]);
            if (this.haveTime) {
                setTimeout(function () {
                    _this.stopMonitoring();
                }, (this.timeout * 1000));
            }
        }
        catch (err) {
            console.log(err);
        }
    };
    TestAppPage.prototype.stopMonitoring = function () {
        this.showAccelerometerValues = false;
        if (this.subscription != null && this.sub != null) {
            this.xs = [];
            this.ys = [];
            this.zs = [];
            this.timeStamps = [];
            this.sub.unsubscribe();
            this.subscription.unsubscribe();
            var alert_3 = this.alert.create({
                title: "Stop",
                subTitle: "Finishing the experiment!",
                buttons: ['OK']
            });
            alert_3.present();
        }
    };
    TestAppPage.prototype.sendData = function () {
        var timeStamps = this.timeStamps.slice(0);
        var xs = this.xs.slice(0);
        var ys = this.ys.slice(0);
        var zs = this.zs.slice(0);
        this.xs = [];
        this.ys = [];
        this.zs = [];
        this.timeStamps = [];
        if (xs.length > 0) {
            this.dataToSend = [];
            for (var i = 0; i < xs.length; i++) {
                this.dataToSend.push({ timestamp: timeStamps[i], x: xs[i], y: ys[i], z: zs[i] });
            }
        }
        var dataTemp = this.dataToSend.slice(0);
        this.dataToSend = { data: dataTemp };
        //this.dataToSend = {type:"", observation:"", data: dataTemp};
        //console.log(this.dataToSend);
        //this.dataToSend = "hello world";
        try {
            this.client = new __WEBPACK_IMPORTED_MODULE_3_ng2_mqtt_mqttws31__["Paho"].MQTT.Client(this.ip, Number(this.port), this.topic);
            this.client.connect({
                useSSL: this.SSL,
                userName: this.userName,
                password: this.password,
                onSuccess: this.onConnected.bind(this)
            });
            return true;
        }
        catch (err) {
            var alert_4 = this.alert.create({
                title: 'Error!',
                subTitle: err,
                buttons: ['OK']
            });
            alert_4.present();
            return false;
        }
    };
    // callback
    TestAppPage.prototype.onConnected = function () {
        console.log("Mqtt connected");
        try {
            var packet = new __WEBPACK_IMPORTED_MODULE_3_ng2_mqtt_mqttws31__["Paho"].MQTT.Message(JSON.stringify(this.dataToSend));
            packet.destinationName = this.topic;
            this.client.send(packet);
            this.client.disconnect();
            // const alert = this.alert.create({
            //   title: 'Done!',
            //   subTitle: "Message sent to broker",
            //   buttons: ['OK']
            // });
            // alert.present();
        }
        catch (err) {
            var alert_5 = this.alert.create({
                title: 'Error!',
                subTitle: err,
                buttons: ['OK']
            });
            alert_5.present();
        }
    };
    TestAppPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-test-app',template:/*ion-inline-start:"/home/guto/bitbucket/accelerometer-mqtt-app/src/pages/test-app/test-app.html"*/'<!--\n  Generated template for the TestAppPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>Monitoring Accelerometer data</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n\n  <ion-card>\n\n    <ion-card-header>\n      Mqtt Configurations\n    </ion-card-header>\n  \n    <ion-card-content>\n      \n      <ion-list>\n      \n        <ion-item>\n          <ion-label floating>Broker IP</ion-label>\n          <ion-input [(ngModel)]="ip" type="text"></ion-input>\n        </ion-item>\n\n        <ion-item>\n          <ion-label floating>Broker Port</ion-label>\n          <ion-input [(ngModel)]="port" min="1" type="number"></ion-input>\n        </ion-item>\n\n        <ion-item>\n          <ion-label floating>Topic</ion-label>\n          <ion-input [(ngModel)]="topic" type="text"></ion-input>\n        </ion-item>\n        \n        <ion-item>\n          <ion-label floating>User name</ion-label>\n          <ion-input [(ngModel)]="userName" type="text"></ion-input>\n        </ion-item>\n\n        <ion-item>\n          <ion-label floating>Password</ion-label>\n          <ion-input [(ngModel)]="password" type="password"></ion-input>\n        </ion-item>\n\n        <ion-item>\n          <ion-label>Use SSL</ion-label>\n          <ion-checkbox [(ngModel)]="SSL" disabled="false"></ion-checkbox>\n        </ion-item>\n\n      </ion-list>\n\n    </ion-card-content>\n  \n  </ion-card>\n\n  <ion-card>\n    <ion-card-header>\n      Configure the experiment\n    </ion-card-header>\n    <ion-card-content>\n      \n      <ion-list>\n      \n        <ion-item>\n          <ion-label floating>Frequency (in milliseconds)</ion-label>\n          <ion-input [(ngModel)]="frequency" type="number"></ion-input>\n        </ion-item>\n\n        <ion-item>\n            <ion-label floating>Window Time to send data (in seconds)</ion-label>\n            <ion-input [(ngModel)]="windowTime" type="number"></ion-input>\n          </ion-item>\n\n        <ion-item>\n          <ion-label>Fixed monitoring time?</ion-label>\n          <ion-checkbox color="dark" [(ngModel)]="haveTime" checked="haveTime"></ion-checkbox>\n        </ion-item>\n\n        <ion-item *ngIf="haveTime">\n          <ion-label floating>Experiment time (in seconds)</ion-label>\n          <ion-input [(ngModel)]="timeout" type="number"></ion-input>\n        </ion-item>\n        \n      </ion-list>\n\n    </ion-card-content>\n  </ion-card>\n\n  <div>\n    <button ion-button block (click)="startMonitoring()" color="primary">Start experiment</button>\n    <button ion-button block (click)="stopMonitoring()" color="dark">Stop experiment</button>\n  </div>\n\n  <ion-card *ngIf="showAccelerometerValues">\n    <ion-card-header>\n        Accelerometer data\n    </ion-card-header>\n    <ion-card-content>\n      \n      timestamp: {{timeStamp}} <br>\n      x value: {{x}} <br>\n      y value: {{y}} <br>\n      z value: {{z}} <br>\n      \n    </ion-card-content>\n  </ion-card>\n\n</ion-content>\n'/*ion-inline-end:"/home/guto/bitbucket/accelerometer-mqtt-app/src/pages/test-app/test-app.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_device_motion__["a" /* DeviceMotion */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
    ], TestAppPage);
    return TestAppPage;
}());

//# sourceMappingURL=test-app.js.map

/***/ }),

/***/ 113:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 113;

/***/ }),

/***/ 155:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/generate-dataset/generate-dataset.module": [
		286,
		2
	],
	"../pages/send-dataset/send-dataset.module": [
		287,
		1
	],
	"../pages/test-app/test-app.module": [
		288,
		0
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 155;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 199:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TabsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__generate_dataset_generate_dataset__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__test_app_test_app__ = __webpack_require__(104);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

// import { AboutPage } from '../about/about';
// import { ContactPage } from '../contact/contact';
// import { HomePage } from '../home/home';


var TabsPage = /** @class */ (function () {
    //tab3Root = ContactPage;
    function TabsPage() {
        this.tab1Root = __WEBPACK_IMPORTED_MODULE_1__generate_dataset_generate_dataset__["a" /* GenerateDatasetPage */];
        this.tab2Root = __WEBPACK_IMPORTED_MODULE_2__test_app_test_app__["a" /* TestAppPage */];
    }
    TabsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/home/guto/bitbucket/accelerometer-mqtt-app/src/pages/tabs/tabs.html"*/'<ion-tabs>\n  <ion-tab [root]="tab2Root" tabTitle="Test app" tabIcon="pulse"></ion-tab>\n  <ion-tab [root]="tab1Root" tabTitle="Generate dataset" tabIcon="stats"></ion-tab>\n  <!--<ion-tab [root]="tab3Root" tabTitle="Contact" tabIcon="contacts"></ion-tab> -->\n</ion-tabs>\n'/*ion-inline-end:"/home/guto/bitbucket/accelerometer-mqtt-app/src/pages/tabs/tabs.html"*/
        }),
        __metadata("design:paramtypes", [])
    ], TabsPage);
    return TabsPage;
}());

//# sourceMappingURL=tabs.js.map

/***/ }),

/***/ 200:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(201);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(223);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 223:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_component__ = __webpack_require__(282);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_about_about__ = __webpack_require__(283);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_contact_contact__ = __webpack_require__(284);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_home_home__ = __webpack_require__(285);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_tabs_tabs__ = __webpack_require__(199);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_generate_dataset_generate_dataset__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_test_app_test_app__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_send_dataset_send_dataset__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_native_device_motion__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ionic_native_status_bar__ = __webpack_require__(197);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__ionic_native_splash_screen__ = __webpack_require__(198);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};














var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_4__pages_about_about__["a" /* AboutPage */],
                __WEBPACK_IMPORTED_MODULE_5__pages_contact_contact__["a" /* ContactPage */],
                __WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_generate_dataset_generate_dataset__["a" /* GenerateDatasetPage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_test_app_test_app__["a" /* TestAppPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_send_dataset_send_dataset__["a" /* SendDatasetPage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_tabs_tabs__["a" /* TabsPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */], {}, {
                    links: [
                        { loadChildren: '../pages/generate-dataset/generate-dataset.module#GenerateDatasetPageModule', name: 'GenerateDatasetPage', segment: 'generate-dataset', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/send-dataset/send-dataset.module#SendDatasetPageModule', name: 'SendDatasetPage', segment: 'send-dataset', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/test-app/test-app.module#TestAppPageModule', name: 'TestAppPage', segment: 'test-app', priority: 'low', defaultHistory: [] }
                    ]
                })
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_4__pages_about_about__["a" /* AboutPage */],
                __WEBPACK_IMPORTED_MODULE_5__pages_contact_contact__["a" /* ContactPage */],
                __WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_generate_dataset_generate_dataset__["a" /* GenerateDatasetPage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_test_app_test_app__["a" /* TestAppPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_send_dataset_send_dataset__["a" /* SendDatasetPage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_tabs_tabs__["a" /* TabsPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_12__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_13__ionic_native_splash_screen__["a" /* SplashScreen */],
                __WEBPACK_IMPORTED_MODULE_11__ionic_native_device_motion__["a" /* DeviceMotion */],
                { provide: __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicErrorHandler */] }
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 282:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(197);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(198);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_tabs_tabs__ = __webpack_require__(199);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, splashScreen) {
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_tabs_tabs__["a" /* TabsPage */];
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/home/guto/bitbucket/accelerometer-mqtt-app/src/app/app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n'/*ion-inline-end:"/home/guto/bitbucket/accelerometer-mqtt-app/src/app/app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 283:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AboutPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AboutPage = /** @class */ (function () {
    function AboutPage(navCtrl) {
        this.navCtrl = navCtrl;
    }
    AboutPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-about',template:/*ion-inline-start:"/home/guto/bitbucket/accelerometer-mqtt-app/src/pages/about/about.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>\n      About\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n\n</ion-content>\n'/*ion-inline-end:"/home/guto/bitbucket/accelerometer-mqtt-app/src/pages/about/about.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */]])
    ], AboutPage);
    return AboutPage;
}());

//# sourceMappingURL=about.js.map

/***/ }),

/***/ 284:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ContactPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ContactPage = /** @class */ (function () {
    function ContactPage(navCtrl) {
        this.navCtrl = navCtrl;
    }
    ContactPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-contact',template:/*ion-inline-start:"/home/guto/bitbucket/accelerometer-mqtt-app/src/pages/contact/contact.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>\n      Contact\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <ion-list>\n    <ion-list-header>Follow us on Twitter</ion-list-header>\n    <ion-item>\n      <ion-icon name="ionic" item-start></ion-icon>\n      @ionicframework\n    </ion-item>\n  </ion-list>\n</ion-content>\n'/*ion-inline-end:"/home/guto/bitbucket/accelerometer-mqtt-app/src/pages/contact/contact.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */]])
    ], ContactPage);
    return ContactPage;
}());

//# sourceMappingURL=contact.js.map

/***/ }),

/***/ 285:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var HomePage = /** @class */ (function () {
    function HomePage(navCtrl) {
        this.navCtrl = navCtrl;
    }
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"/home/guto/bitbucket/accelerometer-mqtt-app/src/pages/home/home.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>Home</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <h2>Welcome to Ionic!</h2>\n  <p>\n    This starter project comes with simple tabs-based layout for apps\n    that are going to primarily use a Tabbed UI.\n  </p>\n  <p>\n    Take a look at the <code>src/pages/</code> directory to add or change tabs,\n    update any existing page or create new pages.\n  </p>\n</ion-content>\n'/*ion-inline-end:"/home/guto/bitbucket/accelerometer-mqtt-app/src/pages/home/home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ })

},[200]);
//# sourceMappingURL=main.js.map