/**
 * 在Examples_frictions基础上测试轮子共享物理材质
 * 并且测试动态修改ContactMaterial的摩擦力
 * @author 
 *
 */
class Examples_frictionsCar extends egret.Sprite {
    private scene: jbP2.SimpleP2Scene;
        
    private bottomGround: p2.Body;
    private iceCube: p2.Body;
        
    private wheelMtl: p2.Material;
    private groundMtl: p2.Material;
    private iceMtl: p2.Material;
    
    private cmtl_wheelGround: p2.ContactMaterial;
    private cmtl_wheelIce: p2.ContactMaterial;
            
    private chassis: p2.Body;
    private wheelf: p2.Body;
    private wheelb: p2.Body;
    
    private wheelAnglarForceDefault: number = 10;
    
    private inputFric: egret.TextField;
        
    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAdded2stage,this);
    }
                        	
    private onAdded2stage(e:egret.Event):void{
        this.scene = new jbP2.SimpleP2Scene(this.stage,this);
                                
        this.scene.world.defaultContactMaterial.friction = 10;
                
        var mouseJt: MouseJointHelper = new MouseJointHelper(this.stage,this.scene.dispCtn,this.scene.world,false);
                      
        jbP2.KeyManager.init();
        
        
        this.setupMtls();
        this.setupSceneObjs();
        this.setupVehicle();
        this.setupUI();
                
        egret.Ticker.getInstance().register(this.updateKeyCtrl, this);//
    }
    
    private setupUI():void{
        this.inputFric = jbP2.DispUtil.createTouchTf(10,100,100,20,"1");
        this.inputFric.type = egret.TextFieldType.INPUT;
        this.inputFric.border = true;
        this.addChild(this.inputFric);
        
        var btnChange: egret.TextField = jbP2.DispUtil.createTouchTf(10,150,100,20,"changeFric");
        btnChange.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onBtnChange_click,this);
        this.addChild(btnChange);
    }
    private onBtnChange_click(e:egret.TouchEvent):void{
        var fric: number = Number(this.inputFric.text);
        this.cmtl_wheelIce.friction = fric;
    }
    //初始化材质
    private setupMtls():void{
        this.wheelMtl = new p2.Material(1000); 
        this.groundMtl = new p2.Material(1001);
        this.iceMtl = new p2.Material(1002);
                
        this.cmtl_wheelGround = new p2.ContactMaterial(this.wheelMtl,this.groundMtl,<p2.ContactMaterialOptions>{restitution:0.0,friction:100});
        this.scene.world.addContactMaterial(this.cmtl_wheelGround);
        this.cmtl_wheelIce = new p2.ContactMaterial(this.wheelMtl,this.iceMtl,<p2.ContactMaterialOptions>{restitution:0.0,friction:0.1});
        this.scene.world.addContactMaterial(this.cmtl_wheelIce);
        
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
        wheelFrontBody.shapes[0].material = this.wheelMtl;
        wheelBackBody.shapes[0].material = this.wheelMtl;
                                        
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
                             
        this.chassis = chassisBody;
        this.wheelf = wheelFrontBody;
        this.wheelb = wheelBackBody;
        this.chassis.allowSleep = false;
        this.wheelf.allowSleep = false;
        this.wheelb.allowSleep = false; 
    }
    
    private setupSceneObjs():void{                                  
        jbP2.P2Space.addOneBox(this.scene.world,this.scene.dispCtn,0,240,50,480,0,p2.Body.STATIC);//left wall
        jbP2.P2Space.addOneBox(this.scene.world,this.scene.dispCtn,800,240,50,480,0,p2.Body.STATIC);//right wall
       
        this.bottomGround = jbP2.P2Space.addOneBox(this.scene.world,this.scene.dispCtn,400,400,800,20,0,p2.Body.STATIC);//bottom wall
        this.bottomGround.shapes[0].material = this.groundMtl;       
        
        this.iceCube = jbP2.P2Space.addOneBox(this.scene.world,this.scene.dispCtn,400,375,150,20,-18,p2.Body.STATIC);//ice
        this.iceCube.shapes[0].material = this.iceMtl;  
    }
        
    private updateKeyCtrl():void{
        if(jbP2.KeyManager.isDown(jbP2.KeyManager.LEFT)){
            this.wheelf.angularForce = this.wheelAnglarForceDefault;
            this.wheelb.angularForce = this.wheelAnglarForceDefault;
        }else if(jbP2.KeyManager.isDown(jbP2.KeyManager.RIGHT)){
            this.wheelf.angularForce = -this.wheelAnglarForceDefault;
            this.wheelb.angularForce = -this.wheelAnglarForceDefault;
        }
    }
}
