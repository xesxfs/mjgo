/**
 * 测试封装的车辆DirtBike
 * @author 
 *
 */
class Examples_dirtBikeEncapsulated extends egret.Sprite{
    private scene: jbP2.SimpleP2Scene;
    private mouseJt: MouseJointHelper;
    
    private bike: DirtBike;
    private steering: VehicleSteeringCtrl;
    
	public constructor() {
        super();
        
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAdded2Stage,this);
	}
	
	private onAdded2Stage(e:egret.Event):void{
        this.scene = new jbP2.SimpleP2Scene(this.stage,this);
        this.scene.world.defaultContactMaterial.friction = 40;
        
        this.mouseJt = new MouseJointHelper(this.stage,this,this.scene.world);
        
        var tembody: p2.Body;
        tembody = jbP2.P2Space.addOneBox(this.scene.world,this.scene.dispCtn,0,240,10,480,0,p2.Body.STATIC);//left wall                              
        tembody = jbP2.P2Space.addOneBox(this.scene.world,this.scene.dispCtn,800,240,10,480,0,p2.Body.STATIC);//right wall                              
        tembody = jbP2.P2Space.addOneBox(this.scene.world,this.scene.dispCtn,400,400,800,20,0,p2.Body.STATIC);//middle static
         
        
        this.bike = new DirtBike();
        this.bike.chassisX = 200;
        this.bike.chassisY = 100;
        this.bike.chassisW = 100;
        this.bike.chassisH = 20;
        this.bike.wheelR = 25;
        this.bike.frontSuspensionOffset = new egret.Point(this.bike.chassisW * .5,this.bike.chassisH * .5);
        this.bike.frontWheelOffset = new egret.Point(this.bike.chassisW * .75,75);
        this.bike.backConnCubePos = new egret.Point(this.bike.chassisX - this.bike.chassisW*.5,this.bike.chassisY + this.bike.chassisH*.5);//c
        this.bike.backConnCubeSize = new egret.Point(60,10);
        this.bike.backConnPvtPos = new egret.Point(this.bike.backConnCubePos.x + this.bike.backConnCubeSize.x * .5,this.bike.backConnCubePos.y);//c
                                
        this.bike.createVehicle(this.scene);
       
        
        this.steering = new VehicleSteeringCtrl();
        this.steering.vehicle = this.bike;
        this.addChild(this.steering);
	}
}
