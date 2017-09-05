/**
* 通过RevoluteConstaint的motor和motorSpeed来控制轮子转动
* 需要动态控制motor开启和关闭，以阻止motor默认阻力让轮子刹闸
* @author 
*
*/
class Examples_carWithMotor extends egret.Sprite {
    private scene: jbP2.SimpleP2Scene;
    private wheelPvtJtFront: p2.RevoluteConstraint;
    private wheelPvtJtBack: p2.RevoluteConstraint;
    
    private chassis: p2.Body;
    private wheelf: p2.Body;
    private wheelb: p2.Body;
        
    private btnHor: egret.Bitmap;
    private btnVer: egret.Bitmap;
    
    private chassisAnglarForceDefault: number = 50;//车体转动默认角力
    private wheelAnglarSpeedDefault: number = 10;//轮子默认转速
             
    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAdded2stage,this);
    }
            	
    private onAdded2stage(e:egret.Event):void{
        this.scene = new jbP2.SimpleP2Scene(this.stage,this);
        
        //给予默认摩擦力较大值，防止轮子滑动
        this.scene.world.defaultContactMaterial.friction = 30;
                                       
        jbP2.P2Space.addOneBox(this.scene.world,this.scene.dispCtn,0,240,10,480,0,p2.Body.STATIC);//left wall
        jbP2.P2Space.addOneBox(this.scene.world,this.scene.dispCtn,800,240,10,480,0,p2.Body.STATIC);//right wall
                                        
        jbP2.P2Space.addOneBox(this.scene.world,this.scene.dispCtn,400,400,800,20,0,p2.Body.STATIC);//middle static
                                        
        jbP2.P2Space.addOneBox(this.scene.world,this.scene.dispCtn,400,100,100,15,10,p2.Body.DYNAMIC);//box1
                
        this.setupVehicle();
        this.setupUI();
                
        egret.Ticker.getInstance().register(this.updateChassisAnglarForce, this);// 
    }
    private setupVehicle():void{
        var chassisX = 200;//chassis init x
        var chassisY = 200;//...y
        var chassisW = 80;//...width
        var chassisH = 40;//...height
        var wheelR = 20;//wheel radius
        var wheelFPos: egret.Point = new egret.Point(Math.floor(chassisX + chassisW * .5),Math.floor(chassisY + chassisH * .5));//front wheel position
        var wheelBPos: egret.Point = new egret.Point(Math.floor(chassisX - chassisW * .5),Math.floor(chassisY + chassisH * .5));//back wheel position
                                
        var chassisBody:p2.Body = jbP2.P2Space.addOneBox(this.scene.world,this.scene.dispCtn,chassisX,chassisY,chassisW,chassisH,0,p2.Body.DYNAMIC);//chassis body
        var wheelFrontBody:p2.Body = jbP2.P2Space.addOneBall(this.scene.world,this.scene.dispCtn,wheelFPos.x,wheelFPos.y,wheelR,0,p2.Body.DYNAMIC);//wheel body
        var wheelBackBody:p2.Body = jbP2.P2Space.addOneBall(this.scene.world,this.scene.dispCtn,wheelBPos.x,wheelBPos.y,wheelR,0,p2.Body.DYNAMIC);//wheel body
        chassisBody.mass = 1;        
                        
        var pvtJtF: p2.RevoluteConstraint;//constraint for wheel and body. front
        var pvtJtB: p2.RevoluteConstraint;//... back
        var p2PvtPointX: number; //物理世界的轮子位置x
        var p2PvtPointY: number; //物理世界的轮子位置y
                        
        //setup constraint for wheelFront
        p2PvtPointX= jbP2.P2Space.convertEgretValueToP2(wheelFPos.x);
        p2PvtPointY= jbP2.P2Space.convertEgretY_To_P2Y(wheelFPos.y);
        pvtJtF = new p2.RevoluteConstraint(wheelFrontBody,chassisBody, {worldPivot: [p2PvtPointX, p2PvtPointY]});
        pvtJtF.collideConnected = false;
        this.scene.world.addConstraint(pvtJtF);
                
                        
        //setup constraint for wheelBack
        p2PvtPointX= jbP2.P2Space.convertEgretValueToP2(wheelBPos.x);
        p2PvtPointY= jbP2.P2Space.convertEgretY_To_P2Y(wheelBPos.y);
        pvtJtB = new p2.RevoluteConstraint(wheelBackBody,chassisBody, {worldPivot: [p2PvtPointX, p2PvtPointY]});
        pvtJtB.collideConnected = false;
        this.scene.world.addConstraint(pvtJtB);
                
                        
        //setup motor
        pvtJtF.enableMotor();
        pvtJtB.enableMotor();
        pvtJtF.setMotorSpeed(0);
        pvtJtB.setMotorSpeed(0);
                       
        this.chassis = chassisBody;
        this.wheelf = wheelFrontBody;
        this.wheelb = wheelBackBody;
        this.chassis.allowSleep = false;
        this.wheelf.allowSleep = false;
        this.wheelb.allowSleep = false;
                        
        this.wheelPvtJtFront = pvtJtF;
        this.wheelPvtJtBack = pvtJtB;
    }
        
    private setupUI():void{
        this.btnHor = jbP2.DispUtil.createBitmapByName("rect");
        this.btnHor.x = this.btnHor.width * .5;
        this.btnHor.y = this.btnHor.height * .5+100;
        this.btnHor.touchEnabled = true;
        this.addChild(this.btnHor);
        this.btnHor.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onBtnHorTouchBegin,this);
        this.btnHor.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.onBtnHorTouchMove,this);
        this.btnHor.addEventListener(egret.TouchEvent.TOUCH_END,this.onBtnHorTouchEnd,this);
        this.btnHor.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE,this.onBtnHorTouchEnd,this);
                     
        this.btnVer = jbP2.DispUtil.createBitmapByName("rect");
        this.btnVer.x = this.stage.stageWidth - this.btnHor.width * .5;
        this.btnVer.y = this.btnVer.height * .5+100;
        this.btnVer.touchEnabled = true;
        this.addChild(this.btnVer);
        this.btnVer.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onBtnVerTouchBegin,this);
        this.btnVer.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.onBtnVerTouchMove,this);
        this.btnVer.addEventListener(egret.TouchEvent.TOUCH_END,this.onBtnVerTouchEnd,this);
        this.btnVer.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE,this.onBtnVerTouchEnd,this);
                
    }
        
    private dirHorizontal: number = 0;
    private dirVertical: number = 0;
        
    private onBtnHorTouchBegin(e:egret.TouchEvent):void{
        this.updateDirHorizontalValue(e.stageX,e.stageY);
    }
    private onBtnHorTouchMove(e:egret.TouchEvent):void{
        this.updateDirHorizontalValue(e.stageX,e.stageY);
    }
    private onBtnHorTouchEnd(e: egret.TouchEvent): void {
        this.dirHorizontal = 0;
                
        this.wheelPvtJtBack.setMotorSpeed(0);
        this.wheelPvtJtFront.setMotorSpeed(0);
    }
    private updateDirHorizontalValue(stageX:number,stageY:number):void{
        var local = this.btnHor.globalToLocal(stageX,stageY);
        if(local.x > this.btnHor.width*0.5){
            this.dirHorizontal = 1;
        }else{
            this.dirHorizontal = -1;
        }
    }
        
    private onBtnVerTouchBegin(e:egret.TouchEvent):void{
        this.updateDirVerzontalValue(e.stageX,e.stageY);
    }
    private onBtnVerTouchMove(e:egret.TouchEvent):void{
        this.updateDirVerzontalValue(e.stageY,e.stageY);
    }
    private onBtnVerTouchEnd(e:egret.TouchEvent):void{
        this.dirVertical = 0;
    }
    private updateDirVerzontalValue(stageX:number,stageY:number):void{
        var local = this.btnVer.globalToLocal(stageX,stageY);
        if(local.y > this.btnVer.height*0.5){
            this.dirVertical = 1;
        }else{
            this.dirVertical = -1;
        }
    }
        
        
    private updateChassisAnglarForce():void{
        if(this.chassis == null){
            return;
        }
                
        var chassisAnglarForce: number = this.chassisAnglarForceDefault;
        if(this.dirVertical == -1){
            this.chassis.angularForce = chassisAnglarForce;
        }else if(this.dirVertical == 1){
            this.chassis.angularForce = -chassisAnglarForce;
        }
                
        //这里要动态控制motor开启和关闭，如果不关闭，则motor默认阻力会让轮子刹闸不转动
        var wheelAnglarSpeed: number = this.wheelAnglarSpeedDefault;
        if(this.dirHorizontal == 1){
            this.wheelPvtJtFront.enableMotor();
            this.wheelPvtJtBack.enableMotor();
            this.wheelPvtJtFront.setMotorSpeed(-wheelAnglarSpeed);
            this.wheelPvtJtBack.setMotorSpeed(-wheelAnglarSpeed);
        }else if(this.dirHorizontal == -1){
            this.wheelPvtJtFront.enableMotor();
            this.wheelPvtJtBack.enableMotor();
            this.wheelPvtJtFront.setMotorSpeed(wheelAnglarSpeed);
            this.wheelPvtJtBack.setMotorSpeed(wheelAnglarSpeed);
        }else{
            this.wheelPvtJtFront.disableMotor();
            this.wheelPvtJtBack.disableMotor();
        }
    }
}
        