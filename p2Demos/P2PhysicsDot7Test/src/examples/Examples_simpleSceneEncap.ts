/**
 *测试封装好的SimpleP2Scene
 * @author 
 *
 */
class Examples_simpleSceneEncap extends egret.Sprite {
    private scene: jbP2.SimpleP2Scene;
    
	public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAdded2stage,this);
	}
	
	private onAdded2stage(e:egret.Event):void{
        this.scene = new jbP2.SimpleP2Scene(this.stage,this);
        //this.scene.createGround();
        
        
        jbP2.P2Space.addOneBox(this.scene.world,this.scene.dispCtn,0,240,10,480,0,p2.Body.STATIC);//left wall
        jbP2.P2Space.addOneBox(this.scene.world,this.scene.dispCtn,800,240,10,480,0,p2.Body.STATIC);//right wall
                
        jbP2.P2Space.addOneBox(this.scene.world,this.scene.dispCtn,400,400,800,20,10,p2.Body.STATIC);//middle static
                
        jbP2.P2Space.addOneBox(this.scene.world,this.scene.dispCtn,400,100,200,50,10,p2.Body.DYNAMIC);//box1
        jbP2.P2Space.addOneBall(this.scene.world,this.scene.dispCtn,400,50,40,0,p2.Body.DYNAMIC);//ball1
        jbP2.P2Space.addOneBall(this.scene.world,this.scene.dispCtn,100,100,30,0,p2.Body.DYNAMIC);//ball1
	}
}
