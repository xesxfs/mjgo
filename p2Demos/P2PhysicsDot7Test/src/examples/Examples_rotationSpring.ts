/**
 *
 * @author 
 *
 */
class Examples_rotationSpring extends egret.Sprite {
    private scene: jbP2.SimpleP2Scene;
    private mouseJt: MouseJointHelper;
    
    private rotSpring: p2.RotationalSpring;
               
    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAdded2stage,this);
    }
            	
    private onAdded2stage(e:egret.Event):void{
        this.scene = new jbP2.SimpleP2Scene(this.stage,this);
        //鼠标拾取工具实例
        //this.mouseJt = new MouseJointHelper(this.stage,this,this.scene.world,false);
                        
        var tembody: p2.Body;
                        
        tembody = jbP2.P2Space.addOneBox(this.scene.world,this.scene.dispCtn,0,240,10,480,0,p2.Body.STATIC);//left wall
        tembody.id = 0;
        tembody = jbP2.P2Space.addOneBox(this.scene.world,this.scene.dispCtn,800,240,10,480,0,p2.Body.STATIC);//right wall
        tembody.id = 1;
                                        
        tembody = jbP2.P2Space.addOneBox(this.scene.world,this.scene.dispCtn,400,400,800,20,0,p2.Body.STATIC);//middle static
        tembody.id = 2;
                                        
        var box1:p2.Body = jbP2.P2Space.addOneBox(this.scene.world,this.scene.dispCtn,100,100,100,50,0,p2.Body.STATIC);//box1
        var box2:p2.Body = jbP2.P2Space.addOneBox(this.scene.world,this.scene.dispCtn,200,100,100,50,0,p2.Body.DYNAMIC);//box2
        box1.allowSleep = box2.allowSleep = false;
                
        var pvtJtF: p2.RevoluteConstraint;//constraint
        var p2PvtPointX: number; //物理世界的位置x
        var p2PvtPointY: number; //物理世界的位置y
                                                
        //setup revolute constraint
        p2PvtPointX= jbP2.P2Space.convertEgretValueToP2(150);//两个刚体中间点
        p2PvtPointY= jbP2.P2Space.convertEgretY_To_P2Y(100);//两个刚体中间点
        pvtJtF = new p2.RevoluteConstraint(box1,box2, {worldPivot: [p2PvtPointX, p2PvtPointY]});
        pvtJtF.collideConnected = false;
        pvtJtF.setLimits(-Math.PI/4,Math.PI/4);
        this.scene.world.addConstraint(pvtJtF);
        
        
        //setup rotation constraint
        var rotationalSpring:p2.RotationalSpring = new p2.RotationalSpring(box1, box2, {stiffness : 100, damping: 1000 });
        rotationalSpring.restAngle = -Math.PI / 8;//约束两个body之间的夹角，如果不指定，则默认等于约束建立时的夹角
        this.scene.world.addSpring(rotationalSpring);
        this.rotSpring = rotationalSpring;
        
        var btnChange: egret.TextField = jbP2.DispUtil.createTouchTf(10,200,120,20,"change");
        btnChange.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onBtnChangeClick,this);
        this.addChild(btnChange);
    }
    
    private onBtnChangeClick(e:egret.TouchEvent):void{
        if(this.rotSpring.restAngle > 0){
            this.rotSpring.restAngle = -Math.PI / 8;
        }else{
            this.rotSpring.restAngle = Math.PI / 8;
        }
    }
}
