/**
 * 凸多边形测试，convex是凸多边形，如果 vertices是凹多边形会出错
 * 注意vertices在p2坐标系中要满足逆时针顺序，不然报错
 * @author 
 *
 */
class Examples_convex extends egret.Sprite{
    private sceneCtn: egret.Sprite;
    
    private scene: jbP2.SimpleP2Scene;
    private mouseJt: P2MouseJointHelper;
    private debugDraw: p2DebugDraw;

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAdded2stage,this);
        this.addEventListener(egret.Event.ENTER_FRAME,this.loop,this);
    }

    private onAdded2stage(e: egret.Event): void {
        this.sceneCtn = new egret.Sprite();
        this.addChild(this.sceneCtn);
        
        this.scene = new jbP2.SimpleP2Scene(this.stage,this);
        //鼠标拾取工具实例
        this.mouseJt = new P2MouseJointHelper(this.stage,this,this.scene.world);

        var tembody: p2.Body;

        tembody = jbP2.P2Space.addOneBox(this.scene.world,this.scene.dispCtn,0,240,10,480,0,p2.Body.STATIC);//left wall
        tembody = jbP2.P2Space.addOneBox(this.scene.world,this.scene.dispCtn,800,240,10,480,0,p2.Body.STATIC);//right wall
        tembody = jbP2.P2Space.addOneBox(this.scene.world,this.scene.dispCtn,400,400,800,20,0,p2.Body.STATIC);//middle static
        
        tembody = jbP2.P2Space.addOneBox(this.scene.world,this.scene.dispCtn,400,100,200,50,10,p2.Body.DYNAMIC);//box1
        tembody = jbP2.P2Space.addOneBall(this.scene.world,this.scene.dispCtn,250,50,40,0,p2.Body.DYNAMIC);//ball1
        
        this.createUpTriangle();
        this.createPolygon();
        
        this.createDebug();
    }
    
    //注意这里是按照p2坐标系y轴向上，x轴向右来顺时针创建vertices
    private createUpTriangle():void{
        // Add a triangle convex----------------------------------------------------------------------
        var vertices = [];//顶点列表
        var vertex: number[];// Note: vertices are added counter-clockwise
        
        //这三个点会形成一个方向朝上的尖角三角形
        vertex = [0,50];
        vertex[0] = jbP2.P2Space.convertEgretValueToP2(vertex[0]);
        vertex[1] = jbP2.P2Space.convertEgretValueToP2(vertex[1]);//注意这里转换Y使用convertEgretValueToP2,因为vertex是环绕convex物体的点，不是场景中的点
        vertices.push(vertex);

        vertex = [-40,-40];
        vertex[0] = jbP2.P2Space.convertEgretValueToP2(vertex[0]);
        vertex[1] = jbP2.P2Space.convertEgretValueToP2(vertex[1]);//注意这里转换Y使用convertEgretValueToP2,因为vertex是环绕convex物体的点，不是场景中的点
        vertices.push(vertex);

        vertex = [40,-40];
        vertex[0] = jbP2.P2Space.convertEgretValueToP2(vertex[0]);
        vertex[1] = jbP2.P2Space.convertEgretValueToP2(vertex[1]);//注意这里转换Y使用convertEgretValueToP2,因为vertex是环绕convex物体的点，不是场景中的点
        vertices.push(vertex);

        var convexPos: number[] = [400,250];
        convexPos[0] = jbP2.P2Space.convertEgretValueToP2(convexPos[0]);
        convexPos[1] = jbP2.P2Space.convertEgretY_To_P2Y(convexPos[1]);

        var convexShape = new p2.Convex({ vertices: vertices });
        var convexBody = new p2.Body({
            mass: 1,
            position: convexPos
        });
        convexBody.addShape(convexShape);
        this.scene.world.addBody(convexBody);
        //---------------------------------------------------------------------------------
    }
    
    //注意这里是按照p2坐标系y轴向上，x轴向右来顺时针创建vertices
    private createPolygon(): void {
        // Add a convex----------------------------------------------------------------------
        var vertices = [];//顶点列表
        var vertex: number[];// Note: vertices are added counter-clockwise
        
        //这三个点会形成一个方向朝上的尖角三角形
        vertex = [0,50];
        vertex[0] = jbP2.P2Space.convertEgretValueToP2(vertex[0]);
        vertex[1] = jbP2.P2Space.convertEgretValueToP2(vertex[1]);//注意这里转换Y使用convertEgretValueToP2,因为vertex是环绕convex物体的点，不是场景中的点
        vertices.push(vertex);

        vertex = [-40,0];
        vertex[0] = jbP2.P2Space.convertEgretValueToP2(vertex[0]);
        vertex[1] = jbP2.P2Space.convertEgretValueToP2(vertex[1]);//注意这里转换Y使用convertEgretValueToP2,因为vertex是环绕convex物体的点，不是场景中的点
        vertices.push(vertex);
        
        vertex = [-40,-40];
        vertex[0] = jbP2.P2Space.convertEgretValueToP2(vertex[0]);
        vertex[1] = jbP2.P2Space.convertEgretValueToP2(vertex[1]);//注意这里转换Y使用convertEgretValueToP2,因为vertex是环绕convex物体的点，不是场景中的点
        vertices.push(vertex);
        
        vertex = [0,-60];
        vertex[0] = jbP2.P2Space.convertEgretValueToP2(vertex[0]);
        vertex[1] = jbP2.P2Space.convertEgretValueToP2(vertex[1]);//注意这里转换Y使用convertEgretValueToP2,因为vertex是环绕convex物体的点，不是场景中的点
        vertices.push(vertex);

        vertex = [90,-40];
        vertex[0] = jbP2.P2Space.convertEgretValueToP2(vertex[0]);
        vertex[1] = jbP2.P2Space.convertEgretValueToP2(vertex[1]);//注意这里转换Y使用convertEgretValueToP2,因为vertex是环绕convex物体的点，不是场景中的点
        vertices.push(vertex);
        
        
        vertex = [90,-10];
        vertex[0] = jbP2.P2Space.convertEgretValueToP2(vertex[0]);
        vertex[1] = jbP2.P2Space.convertEgretValueToP2(vertex[1]);//注意这里转换Y使用convertEgretValueToP2,因为vertex是环绕convex物体的点，不是场景中的点
        vertices.push(vertex);
        
        vertex = [80,10];
        vertex[0] = jbP2.P2Space.convertEgretValueToP2(vertex[0]);
        vertex[1] = jbP2.P2Space.convertEgretValueToP2(vertex[1]);//注意这里转换Y使用convertEgretValueToP2,因为vertex是环绕convex物体的点，不是场景中的点
        vertices.push(vertex);

        var convexPos: number[] = [200,250];
        convexPos[0] = jbP2.P2Space.convertEgretValueToP2(convexPos[0]);
        convexPos[1] = jbP2.P2Space.convertEgretY_To_P2Y(convexPos[1]);

        var convexShape = new p2.Convex({ vertices: vertices });
        var convexBody = new p2.Body({
            mass: 1,
            position: convexPos
        });
        convexBody.type = p2.Body.STATIC;
        convexBody.addShape(convexShape);
        this.scene.world.addBody(convexBody);
        //---------------------------------------------------------------------------------
    }
    
    
    private loop(): void {
        this.debugDraw.drawDebug();
    }
    
    private debugSpr: egret.Sprite;
    private createDebug(): void {
        //创建调试试图
        this.debugDraw = new p2DebugDraw(this.scene.world);
        this.debugSpr = new egret.Sprite();
        this.addChild(this.debugSpr);
        this.debugDraw.setSprite(this.debugSpr);

        this.debugDraw.setLineWidth(0.02);
        //this.debugSpr.x = this.stage.stageWidth / 2;
        this.debugSpr.y = this.stage.stageHeight;

        var scale = 50;
        this.debugSpr.scaleX = scale;
        this.debugSpr.scaleY = -scale;
    }
}
