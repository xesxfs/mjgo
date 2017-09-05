/**
 * ForceField测试
 * @author 
 *
 */
class Examples_forceField extends egret.Sprite{
    private scene: jbP2.SimpleP2Scene;

    private forceField: p2.Body;
    private wheel: p2.Body;
    private bottomGround: p2.Body;

    private wheelMtl: p2.Material;
    private groundMtl: p2.Material;
    private iceMtl: p2.Material;

    private wheelAnglarForceDefault: number = 15;

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAdded2stage,this);
    }

    private onAdded2stage(e: egret.Event): void {
        this.scene = new jbP2.SimpleP2Scene(this.stage,this);

        this.scene.world.defaultContactMaterial.friction = 10;

        //var mouseJt = new P2MouseJointHelper(this.stage,this.scene.dispCtn,this.scene.world,false);

        jbP2.KeyManager.init();


        this.setupScene3();

        this.addEventListener(egret.Event.ENTER_FRAME,this.onEff,this);
    }
    private onEff(e:egret.Event):void{
        this.updateKeyCtrl();
        
        if(this.forceOn){
            this.wheel.applyForce([20,0],[0,0]);
        }
    }
    
    private setupScene3(): void {
        this.wheelMtl = new p2.Material(1000);
        this.groundMtl = new p2.Material(1001);
        this.iceMtl = new p2.Material(1002);

        this.wheel = jbP2.P2Space.addOneBall(this.scene.world,this.scene.dispCtn,400,100,25,0,p2.Body.DYNAMIC);//box1
        this.wheel.shapes[0].material = this.wheelMtl;
        this.wheel.allowSleep = false;

        jbP2.P2Space.addOneBox(this.scene.world,this.scene.dispCtn,0,240,10,480,0,p2.Body.STATIC);//left wall
        jbP2.P2Space.addOneBox(this.scene.world,this.scene.dispCtn,800,240,10,480,0,p2.Body.STATIC);//right wall
                                        
        this.bottomGround = jbP2.P2Space.addOneBox(this.scene.world,this.scene.dispCtn,400,400,800,20,0,p2.Body.STATIC);//bottom wall
        this.bottomGround.shapes[0].material = this.groundMtl;
        
        
        this.forceField = jbP2.P2Space.addOneBox(this.scene.world,this.scene.dispCtn,300,300,200,50,0,p2.Body.KINEMATIC);//
        this.forceField.shapes[0].sensor = true;//注意如果为sensor，则刚体类型需为kinematic或者dynamic


        var cmtlToGround: p2.ContactMaterial = new p2.ContactMaterial(this.wheelMtl,this.groundMtl,<p2.ContactMaterialOptions>{ restitution: 0.0,friction: 10 });
        this.scene.world.addContactMaterial(cmtlToGround);

        var ice: p2.Body = jbP2.P2Space.addOneBox(this.scene.world,this.scene.dispCtn,400,375,150,20,-18,p2.Body.STATIC);//ice
        ice.shapes[0].material = this.iceMtl;

        var cmtlToIce: p2.ContactMaterial = new p2.ContactMaterial(this.wheelMtl,this.iceMtl,<p2.ContactMaterialOptions>{ restitution: 0.0,friction: 0.1 });
        this.scene.world.addContactMaterial(cmtlToIce);
        
        this.scene.world.on("beginContact",this.onBeginContact,this);//
        this.scene.world.on("endContact",this.onEndContact,this);//
    }
    
    private forceOn: Boolean = false;
    private onBeginContact(event): void {
        var bodyA: p2.Body = event.bodyA;
        var bodyB: p2.Body = event.bodyB;

        if(bodyA.id == this.forceField.id || bodyB.id == this.forceField.id) {
            console.log("on forceField sensor onBeginContact bodyA.id:" + bodyA.id + ",bodyB.id:" + bodyB.id);
            this.forceOn = true;
        }
    }
    private onEndContact(event): void {
        var bodyA: p2.Body = event.bodyA;
        var bodyB: p2.Body = event.bodyB;

        if(bodyA.id == this.forceField.id || bodyB.id == this.forceField.id) {
            console.log("on forceField sensor EndContact bodyA.id:" + bodyA.id + ",bodyB.id:" + bodyB.id);
            this.forceOn = false;
        }
    }

    private updateKeyCtrl(): void {
        if(jbP2.KeyManager.isDown(jbP2.KeyManager.LEFT)) {
            this.wheel.angularForce = this.wheelAnglarForceDefault;
        } else if(jbP2.KeyManager.isDown(jbP2.KeyManager.RIGHT)) {
            this.wheel.angularForce = -this.wheelAnglarForceDefault;
        }
        if( jbP2.KeyManager.isDown(jbP2.KeyManager.UP) && jbP2.P2Space.checkIfCanJump(this.scene.world,this.wheel)){
            this.wheel.applyForce([0,400],[0,0]);
        }
    }
}
