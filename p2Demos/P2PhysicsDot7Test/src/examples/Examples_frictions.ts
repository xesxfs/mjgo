/**
 * 测试不同接触材质的摩擦力和弹力
 * @author 
 *
 */
class Examples_frictions extends egret.Sprite{
    private scene: jbP2.SimpleP2Scene;
    
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
                    	
    private onAdded2stage(e:egret.Event):void{
        this.scene = new jbP2.SimpleP2Scene(this.stage,this);
                        
        this.scene.world.defaultContactMaterial.friction = 10;
        
        var mouseJt = new P2MouseJointHelper(this.stage,this.scene.dispCtn,this.scene.world,false);
              
        jbP2.KeyManager.init();
        
                                                                                              
        this.setupScene3();
        
        egret.Ticker.getInstance().register(this.updateKeyCtrl, this);//
    }
    
    //works
    private setupScene0():void{
        this.wheel = jbP2.P2Space.addOneBall(this.scene.world,this.scene.dispCtn,400,100,25,0,p2.Body.DYNAMIC);//box1
        this.wheel.shapes[0].material = new p2.Material(1000); 
        this.wheel.allowSleep = false;
                
        jbP2.P2Space.addOneBox(this.scene.world,this.scene.dispCtn,0,240,10,480,0,p2.Body.STATIC);//left wall
        jbP2.P2Space.addOneBox(this.scene.world,this.scene.dispCtn,800,240,10,480,0,p2.Body.STATIC);//right wall
                
        this.bottomGround = jbP2.P2Space.addOneBox(this.scene.world,this.scene.dispCtn,400,400,800,20,0,p2.Body.STATIC);//bottom wall
        this.bottomGround.shapes[0].material = new p2.Material(1001);
                                           
        var mtl1: p2.Material = this.bottomGround.shapes[0].material;
        var mtl2: p2.Material = this.wheel.shapes[0].material;
                
        var cmtl: p2.ContactMaterial = new p2.ContactMaterial(mtl1,mtl2,<p2.ContactMaterialOptions>{restitution:0.0,friction:10});
        this.scene.world.addContactMaterial(cmtl);
    }
    
    //based on setupScene,建立公用材质
    private setupScene1():void{
        var wheelMtl:p2.Material = new p2.Material(1000); 
        var groundMtl:p2.Material = new p2.Material(1001);
        
        this.wheel = jbP2.P2Space.addOneBall(this.scene.world,this.scene.dispCtn,400,100,25,0,p2.Body.DYNAMIC);//box1
        this.wheel.shapes[0].material = wheelMtl;
        this.wheel.allowSleep = false;
                        
        jbP2.P2Space.addOneBox(this.scene.world,this.scene.dispCtn,0,240,10,480,0,p2.Body.STATIC);//left wall
        jbP2.P2Space.addOneBox(this.scene.world,this.scene.dispCtn,800,240,10,480,0,p2.Body.STATIC);//right wall
                        
        this.bottomGround = jbP2.P2Space.addOneBox(this.scene.world,this.scene.dispCtn,400,400,800,20,0,p2.Body.STATIC);//bottom wall
        this.bottomGround.shapes[0].material = groundMtl;
                                               
        var cmtl: p2.ContactMaterial = new p2.ContactMaterial(wheelMtl,groundMtl,<p2.ContactMaterialOptions>{restitution:0.0,friction:10});
        this.scene.world.addContactMaterial(cmtl);
    }
    
    //based on setupScene1，将材质变成类成员
    private setupScene2():void{
        this.wheelMtl = new p2.Material(1000); 
        this.groundMtl = new p2.Material(1001);
                
        this.wheel = jbP2.P2Space.addOneBall(this.scene.world,this.scene.dispCtn,400,100,25,0,p2.Body.DYNAMIC);//box1
        this.wheel.shapes[0].material = this.wheelMtl;
        this.wheel.allowSleep = false;
                                
        jbP2.P2Space.addOneBox(this.scene.world,this.scene.dispCtn,0,240,10,480,0,p2.Body.STATIC);//left wall
        jbP2.P2Space.addOneBox(this.scene.world,this.scene.dispCtn,800,240,10,480,0,p2.Body.STATIC);//right wall
                                
        this.bottomGround = jbP2.P2Space.addOneBox(this.scene.world,this.scene.dispCtn,400,400,800,20,0,p2.Body.STATIC);//bottom wall
        this.bottomGround.shapes[0].material = this.groundMtl;
                                                       
        var cmtl: p2.ContactMaterial = new p2.ContactMaterial(this.wheelMtl,this.groundMtl,<p2.ContactMaterialOptions>{restitution:0.0,friction:10});
        this.scene.world.addContactMaterial(cmtl);
    }
    //based on setupScene2,增加不同材质
    private setupScene3():void{
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
        
                      
        var cmtlToGround: p2.ContactMaterial = new p2.ContactMaterial(this.wheelMtl,this.groundMtl,<p2.ContactMaterialOptions>{restitution:0.0,friction:10});
        this.scene.world.addContactMaterial(cmtlToGround);
      
        var ice:p2.Body = jbP2.P2Space.addOneBox(this.scene.world,this.scene.dispCtn,400,375,150,20,-18,p2.Body.STATIC);//ice
        ice.shapes[0].material = this.iceMtl;  
                                                       
        var cmtlToIce: p2.ContactMaterial = new p2.ContactMaterial(this.wheelMtl,this.iceMtl,<p2.ContactMaterialOptions>{restitution:0.0,friction:0.1});
        this.scene.world.addContactMaterial(cmtlToIce);
    }
    
    private updateKeyCtrl():void{
        if(jbP2.KeyManager.isDown(jbP2.KeyManager.LEFT)){
            this.wheel.angularForce = this.wheelAnglarForceDefault;
            
        }else if(jbP2.KeyManager.isDown(jbP2.KeyManager.RIGHT)){
            this.wheel.angularForce = -this.wheelAnglarForceDefault;
        }
    }
}
