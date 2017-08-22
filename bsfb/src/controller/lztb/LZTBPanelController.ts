/**
 *
 * @author 
 *
 */
class LZTBPanelController extends KFController{ 
    private paticleCB;
    private holeAniCB;
	private particleHaveRead = false;
	private particleSystem:particle.GravityParticleSystem;

    private longzhu:p2.Body;

    private world:p2.World;


    private addForce = 7000;

   //debug模式，使用图形绘制
    private isDebug: boolean = false;

    private factor: number = 30;
    private fireballRadius = 20;

    private holeAni;

    private ballPath;

	protected init(){
    	super.init();       
        this.EventsList = [
            MsgID.BSFB.SEARCH_BEGIN,
            MsgID.BSFB.BEGIN_BSFB];
	}

    private on100_event(event: egret.Event): void {
        console.log("on100_event");
        var msg: MessageStruct = <MessageStruct>event.data;
        var datastr = msg.getDataStr();
        var strArray = datastr.split("%");
    }
	
    private on103_event(event: egret.Event): void {
        console.log("on103_event");
        var msg: MessageStruct = <MessageStruct>event.data;
        var datastr = msg.getDataStr();
        var strArray = datastr.split("%");
        GlobalClass.UserInfo.str_Search_currentTodayScore = strArray[3];            //本场游戏金额（不管本场之前赢了多少，本场金额就算这一次探宝的金额）
        GlobalClass.UserInfo.str_Search_currentTotalScore = strArray[4];            //总分
        for (var i = 0; i < 5; i++){
            if (GlobalClass.SearchClass.str_dragonOption[i] == strArray[3]){
                    this.ballPath = this.createPath(i);  //位置
                    this.worldAwake = true;                            
                    break;
            }
        }                      
    }
    private createPath(target:number):any{
        var arr = [];
        arr.push(target);
        for(let i=3;i>0;i--){
            if(target == 0){
            }else if(target-1 ==i){
                target --;
            }else{
                var a = Math.floor(Math.random() * (2));
                target = target - a;
            }
            arr.push(target);
        }
        return arr.reverse();
    }

    private holeCoverAni;
	//子元素创建完成
    protected onReady() {
        
      AnimationMgr.getInstance().loadDiamond(()=>{
              this.addDiamond();             
        },this);

        this.loadParticl();
        this.loadHoleAni();

        AnimationMgr.getInstance().loadbsfbAni(()=>{
                var posx = this.mPanel.holes.getChildAt(0).x;
                var posy = this.mPanel.holes.getChildAt(0).y+5;
                this.holeCoverAni = AnimationMgr.getInstance().getAnimation(aniType.holeCover,posx,posy);
                this.holeCoverAni.anchorOffsetX = this.holeCoverAni.width/2;
                this.holeCoverAni.anchorOffsetY = this.holeCoverAni.height/2;
                this.holeCoverAni.scaleX = 1.1;
                this.holeCoverAni.frameRate = 12;
                this.mPanel.holes.addChild(this.holeCoverAni);
                this.holeCoverAni.visible = false;
        },this);
    }

    private showCover(index){
        var posx = this.mPanel.holes.getChildAt(index).x;
        var posy = this.mPanel.holes.getChildAt(index).y+5;
        this.holeCoverAni.x = posx;
        this.holeCoverAni.y = posy;
        this.holeCoverAni.visible = true;
    }

    private playHoleAni(index:number){
        var posx = this.mPanel.holes.getChildAt(index).x+5;
        this.holeAni.display.x = posx;
        this.holeAni.display.visible = true;
        this.holeAni.animation.play();
    }

    private loadHoleAni(){
			this.holeAniCB = (event:RES.ResourceEvent)=>{
                if (event.groupName == "holeAni") {
                    RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.holeAniCB, this);
                    this.holeAniCB = null;
                    var dragonFactory = new dragonBones.EgretFactory();
                    dragonFactory.addSkeletonData(dragonBones.DataParser.parseDragonBonesData(RES.getRes("flash_light_ske_json")));
                    dragonFactory.addTextureAtlas(new dragonBones.EgretTextureAtlas(RES.getRes("flash_light_tex_png"), RES.getRes("flash_light_tex_json")));
                    this.holeAni = dragonFactory.buildArmature("Armature");
                    this.holeAni.animation.gotoAndStop("flash_light",-1);
                    dragonBones.WorldClock.clock.add(this.holeAni);
                    var clip = this.holeAni.display;
                     var posx = this.mPanel.holes.getChildAt(0).x+5;
                    clip.x = posx; 
                    clip.y = 480;
                    this.mPanel.holes.addChild(clip);
                    this.holeAni.display.visible = false;
                    this.holeAni.animation.play("newAnimation");

                    this.holeAni.addEventListener( dragonBones.AnimationEvent.LOOP_COMPLETE, ()=>{
                            this.holeAni.animation.stop();
                            this.holeAni.display.visible = false;
                    },this);
		        }
			};
			RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE,this.holeAniCB , this);
            egret.Ticker.getInstance().register(  
      		    this.skeletonTickeFun,this
			);
			RES.loadGroup("holeAni");
    }



    private skeletonTickeFun(frameTime:number){
		dragonBones.WorldClock.clock.advanceTime(0.02);
	}

    


    private loadParticl(){
		if(!this.particleHaveRead){
			this.paticleCB = (event:RES.ResourceEvent)=>{
			if (event.groupName == "fireball") {
				RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.paticleCB, this);
				this.paticleCB = null;
				this.particleSystem = new particle.GravityParticleSystem(RES.getRes("fireball_png"), RES.getRes("fireball_json"));
				this.particleHaveRead = true;


                //将例子系统添加到舞台
                var scale = 0.75;
                this.mPanel.fireball.addChild(this.particleSystem);
                this.particleSystem.start();
                this.particleSystem.x = -300*scale;
                this.particleSystem.y = -300*scale;
                this.particleSystem.scaleX = scale;
                this.particleSystem.scaleY = scale;
                this.particleSystem.anchorOffsetX = this.particleSystem.width/2;
                this.particleSystem.anchorOffsetY = this.particleSystem.height/2;
                this.particleSystem.blendMode = egret.BlendMode.ADD;
			}
			};
			RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE,this.paticleCB , this);

			RES.loadGroup("fireball");
		}
	}

    protected destroy(){
        egret.stopTick(this.p2World,this);
        AnimationMgr.getInstance().unloadDiamond();
        AnimationMgr.getInstance().unloadBSFBAni();
        this.world = null;
        this.holeAni = null;

        SoundMgr.Instance.stopBGM();
        SoundMgr.Instance.playNewBgm();
        super.destroy();
    }

    protected onShow(){//在界面上显示出来
        // GlobalClass.SearchClass.str_dragonOption = [666,6666,66666,66,674668794];
        GlobalClass.SearchClass.str_dragonOption.sort(function(a,b){ return Math.random()>.5 ? -1 : 1;});
       for(let i=0;i<5;i++){
          this.mPanel.awardNum.getChildAt(i).text = GlobalClass.SearchClass.str_dragonOption[i];
          if(GlobalClass.SearchClass.str_dragonOption[i]>999999){
              this.mPanel.awardNum.getChildAt(i).scaleX = 0.2;
              this.mPanel.awardNum.getChildAt(i).scaleY = 0.2;
          }else{
              this.mPanel.awardNum.getChildAt(i).scaleX = 0.3;
              this.mPanel.awardNum.getChildAt(i).scaleY = 0.3;
          }
       }
       this.mPanel.Label_TodayScore.text = GlobalClass.UserInfo.str_Search_lastTodayScore;
        this.mPanel.Label_TotalScore.text = GlobalClass.UserInfo.str_Search_lastTotalScore;
        this.mPanel.Label_SlotScore.text = GlobalClass.UserInfo.str_Search_lastSlotScore;

        SoundMgr.Instance.stopBGM();
        SoundMgr.Instance.playLztbBgm();
    }


    private showAward(){
        for(let i=0;i<5;i++){
            this.mPanel.awardNum.getChildAt(i).visible = true;
       }
    }

    private addDiamond(){
        var scale = 0.25;
        this.mPanel.bodyGroup.addChild(AnimationMgr.getInstance().getDiamond(DiamondType.jewel3_Diamond,this.mPanel.club00.x,this.mPanel.club00.y,scale,0.5,0));
        this.mPanel.bodyGroup.addChild(AnimationMgr.getInstance().getDiamond(DiamondType.jewel2_Amethyst,this.mPanel.club10.x,this.mPanel.club10.y,scale,0.5,0));
        this.mPanel.bodyGroup.addChild(AnimationMgr.getInstance().getDiamond(DiamondType.jewel2_Amethyst,this.mPanel.club11.x,this.mPanel.club11.y,scale,0.5,0));
        this.mPanel.bodyGroup.addChild(AnimationMgr.getInstance().getDiamond(DiamondType.jewel3_Topaz,this.mPanel.club20.x,this.mPanel.club20.y,scale,0.5,0));
        this.mPanel.bodyGroup.addChild(AnimationMgr.getInstance().getDiamond(DiamondType.jewel3_Topaz,this.mPanel.club21.x,this.mPanel.club21.y,scale,0.5,0));
        this.mPanel.bodyGroup.addChild(AnimationMgr.getInstance().getDiamond(DiamondType.jewel3_Topaz,this.mPanel.club22.x,this.mPanel.club22.y,scale,0.5,0));
        this.mPanel.bodyGroup.addChild(AnimationMgr.getInstance().getDiamond(DiamondType.jewel2_emerald,this.mPanel.club30.x,this.mPanel.club30.y,scale,0.5,0));
        this.mPanel.bodyGroup.addChild(AnimationMgr.getInstance().getDiamond(DiamondType.jewel2_emerald,this.mPanel.club31.x,this.mPanel.club31.y,scale,0.5,0));
        this.mPanel.bodyGroup.addChild(AnimationMgr.getInstance().getDiamond(DiamondType.jewel2_emerald,this.mPanel.club32.x,this.mPanel.club32.y,scale,0.5,0));
        this.mPanel.bodyGroup.addChild(AnimationMgr.getInstance().getDiamond(DiamondType.jewel2_emerald,this.mPanel.club33.x,this.mPanel.club33.y,scale,0.5,0));
        this.createGameScene();
    }   

    private createBall(r: number): egret.Shape {
        var shape = new egret.Shape();
        shape.graphics.beginFill(0xfff000);
        shape.graphics.drawCircle(r, r, r);
        shape.graphics.endFill();
        return shape;
    }

    private createBox(width:number,height:number): egret.Shape {
            var shape = new egret.Shape();
            shape.graphics.lineStyle(1,0);
            shape.graphics.beginFill(0xfff000);
            shape.graphics.drawRect(0,0,width,height);
            shape.graphics.endFill();
            //将显示对象的锚点移到中心位置
            shape.anchorOffsetX = shape.width / 2;
            shape.anchorOffsetY = shape.height / 2;       
        return shape;
    }
    
    protected setOnClickListener() {
        this.AddClickEvent(this.mPanel.Btn_Start,egret.TouchEvent.TOUCH_END, this.Btn_StartClick, this);
    }

    protected removeOnClickListener() {
        this.RemoveClickEvent(this.mPanel.Btn_Start,egret.TouchEvent.TOUCH_END,this.Btn_StartClick,this);
    }
    
    private Btn_StartClick(){
        this.mPanel.Btn_Start.visible = false;
        WebSocketMgr.getInstance().SendOneceMsg((MsgID.BSFB.SEARCH_BEGIN),"");

        // this.ballPath = this.createPath(1);  //位置
        // this.worldAwake = true;                    
    }
    private createFireBall(){
        let diamond = this.mPanel.DiamondGroup.getChildAt(0);
        let pox = diamond.x;
        let poy = diamond.y;
        this.longzhu = this.createBallBody(pox,poy-70,this.fireballRadius,p2.Body.DYNAMIC);
        var display;
        if(this.isDebug){
            display = this.createBallDraw(this.fireballRadius);
        }else{
            display = this.createBitmapBall();
        }
        this.longzhu.displays = [display];
        this.longzhu.id = 1001;
        this.mPanel.bodyGroup.addChild(display);
        //绑定刚体和显示皮肤
        var mtlBox: p2.Material = new p2.Material(1001);//box 材质
        this.longzhu.shapes[0].material = mtlBox;
    }

    private createBitmapBall(): egret.Bitmap {
        var result: egret.Bitmap = new egret.Bitmap();
        var texture: egret.Texture = RES.getRes("longzhu");
        result.texture = texture;
        result.width = this.fireballRadius*2;
        result.height = this.fireballRadius*2;
        result.anchorOffsetX = result.width/2;
        result.anchorOffsetY = result.height/2;
        return result;
    }

    /**
     * 创建游戏场景
     */
    private createGameScene(): void {

        //创建world
        // var world: p2.World = new p2.World();
        this.world = new p2.World();
        this.world.sleepMode = p2.World.BODY_SLEEPING;
        this.world.on("beginContact",this.onBeginContact,this);
        //创建plane
        var planeShape: p2.Plane = new p2.Plane();
        var planeBody: p2.Body = new p2.Body();
        planeBody.addShape(planeShape);
        planeBody.displays = [];
        this.world.addBody(planeBody);

        egret.Ticker.getInstance().register(this.p2World, this);

        this.createFireBall();
        
        var mtlBox: p2.Material = new p2.Material(1001);//box 材质 
        var mi=1001;
        for(let i=0;i<10;i++){
            var surface = 0.4;           
            let diamond = this.mPanel.DiamondGroup.getChildAt(i);
            let pox = diamond.x;
            let poy = diamond.y;
            var platform:p2.Body = this.createBoxBody(pox,poy+9,30,5,p2.Body.STATIC);
            var a = diamond.name;
            platform.id = Number(diamond.name);
                                                               
            // //绑定刚体和显示皮肤
            var mtlPlatform: p2.Material = new p2.Material(++mi);//平台材质1
            platform.shapes[0].material = mtlPlatform;
            if((i+1)%2==0){
                surface = -surface;
            }
            //  console.log(surface);
            //设定mtlBox和mtlPlatform1接触材质，其中参数surfaceVelocity = -.5
            var contactMaterial = new p2.ContactMaterial(mtlBox,mtlPlatform,<p2.ContactMaterialOptions>{surfaceVelocity:surface,friction:0.9});
            this.world.addContactMaterial(contactMaterial);
        }

        for(let i=0;i<5;i++){
            var surface = 0.4;           
            let hole = this.mPanel.holes.getChildAt(i);
            let pox = hole.x;
            let poy = hole.y;
            var platform:p2.Body = this.createBoxBody(pox,poy,50,5,p2.Body.STATIC,true);
            platform.id = 50+i;
                                 
            // //绑定刚体和显示皮肤
            var mtlPlatform: p2.Material = new p2.Material(++mi);//平台材质1
            platform.shapes[0].material = mtlPlatform;
            if((i+1)%2==0){
                surface = -surface;
            }
            //  console.log(surface);
            //设定mtlBox和mtlPlatform1接触材质，其中参数surfaceVelocity = -.5
            var contactMaterial = new p2.ContactMaterial(mtlBox,mtlPlatform,<p2.ContactMaterialOptions>{surfaceVelocity:surface,friction:0.9});
            this.world.addContactMaterial(contactMaterial);
        }
    }

    private worldAwake = false;
    private p2World(dt):boolean{
        if(this.world==null){
            return false;
        }
        if (dt < 10) {
             return;
        }
        if (dt > 1000) {
            return;
        }
        if(!this.worldAwake){

            this.longzhu.sleep();
        }else{
            this.longzhu.wakeUp();
        }
        this.world.step(dt / 1000);
            var stageHeight: number = egret.MainContext.instance.stage.stageHeight;
            var l =  this.world.bodies.length;
            for (var i: number = 0; i < l; i++) {
                var boxBody: p2.Body =  this.world.bodies[i];
                if(boxBody.displays==null){
                    continue;
                }
                var box: egret.DisplayObject = boxBody.displays[0];
                if (box) {
                    box.x = boxBody.position[0] * this.factor;
                    box.y = stageHeight - boxBody.position[1] * this.factor;
                    box.rotation = 360 - (boxBody.angle + boxBody.shapes[0].angle) * 180 / Math.PI;
                    this.mPanel.fireball.x =  box.x;
                    this.mPanel.fireball.y = box.y;
                }
            }    
    }

    private createBallDraw(radiu:number):egret.Shape{
        var shape = new egret.Shape();
        shape.graphics.beginFill(0xfff000);
        shape.graphics.drawCircle(0,0,radiu);
        shape.graphics.endFill();
        return shape;
    }

    private createBoxDraw(width:number,height:number): egret.Shape {
            var shape = new egret.Shape();
            shape.graphics.lineStyle(1,0);
            shape.graphics.beginFill(0xfff000);
            shape.graphics.drawRect(0,0,width,height);
            shape.graphics.endFill();
            //将显示对象的锚点移到中心位置
            shape.anchorOffsetX = shape.width / 2;
            shape.anchorOffsetY = shape.height / 2;       
        return shape;
    }


    private createBallBody(px:number,py:number,r: number,type:number):p2.Body {
        //在物理世界中的位置
        var p2x: number = this.convertEgretValueToP2(px);//显示位置变换到物理世界位置
        var p2y: number = this.convertEgretY_To_P2Y(py);//显示位置变换到物理世界位置
        // console.log(py);
        // console.log(this.convertEgretY_To_P2Y(0));
        var p2Radiu: number = this.convertEgretValueToP2(r);
        
        var bodyShape: p2.Shape = new p2.Circle({ radius: p2Radiu }) //new p2.Rectangle(p2Wid, p2Hei);
        var body: p2.Body = new p2.Body({ mass: 100, position: [p2x, p2y] });
        body.type = type;
        body.addShape(bodyShape);//给刚体添加p2.Shape
        this.world.addBody(body);                                   

        return body;
    }

    private createBoxBody(px:number,py:number,pw:number,ph:number,type:number,isSensor:boolean=false):p2.Body{

                    //在物理世界中的位置
            var p2x: number = this.convertEgretValueToP2(px);//显示位置变换到物理世界位置
            var p2y: number = this.convertEgretY_To_P2Y(py);//显示位置变换到物理世界位置
            // console.log(py);
            // console.log(this.convertEgretY_To_P2Y(0));
            var p2Wid: number = this.convertEgretValueToP2(pw);
            var p2Hei: number = this.convertEgretValueToP2(ph);
            
                                    
            var display: egret.DisplayObject;             
                            
            var bodyShape: p2.Shape = new p2.Box({ width: p2Wid,height: p2Hei }); //
            bodyShape.sensor = isSensor;
            var body: p2.Body = new p2.Body({ mass: 1, position: [p2x, p2y] });
            body.type = type;
            body.addShape(bodyShape);//给刚体添加p2.Shape
            this.world.addBody(body);                                                                    
            
                                                               
            // //绑定刚体和显示皮肤
            // display = this.createBox(pw,ph);
            // body.displays = [display];
            // this.mPanel.addChild(display);//把皮肤添加到显示世界
            
            return body;
    }

    private lastId = -1;
    private onBeginContact(event){
        var bodyA: p2.Body = event.bodyA;
        var bodyB: p2.Body = event.bodyB;

        if(bodyA.id == 1001 || bodyB.id == 1001){

            var hittedBody: p2.Body;//与playerBodyId碰撞的刚体
            if(bodyA.id == 1001) {
                hittedBody = bodyB;
            } else if(bodyB.id == 1001) {
                hittedBody = bodyA;
            }
            console.log("hittedBody.id:" + hittedBody.id);
            if(hittedBody.shapes[0].sensor == true) {//碰到了传感器，这里不需要计算爆炸位置，只作为传感器就好 
                //碰撞到了传感器，不是普通dynamic刚体
                console.log("碰撞到了传感器，不是普通dynamic刚体,id:"+hittedBody.id);
                this.playHoleAni(hittedBody.id-50);
                this.invoke(0.5,()=>{
                    this.world.removeBody(this.longzhu);
                    this.showCover(hittedBody.id-50);
                    this.particleSystem.stop();
                    this.particleSystem.visible = false;
                },this);
                
                this.showResult();
            }else{
                 console.log("afsf id:"+hittedBody.id);
                 if(this.lastId != hittedBody.id){
                     var index = Math.floor(hittedBody.id/10);
                     var b = hittedBody.id%10;
                     if(this.ballPath[index]>b){
                         this.ballMoveLeft(false);
                     }else{
                         this.ballMoveLeft(true);
                     }
                }
            }
            this.lastId = hittedBody.id;
        }
    }

    private showResult(){
        this.mPanel.Label_TotalScore.text = GlobalClass.UserInfo.str_Search_currentTotalScore;
        this.mPanel.Label_TodayScore.text = GlobalClass.UserInfo.str_Search_currentTodayScore;
        GlobalClass.UserInfo.str_Search_lastTodayScore = GlobalClass.UserInfo.str_Search_currentTodayScore;
        GlobalClass.UserInfo.str_Search_lastTotalScore = GlobalClass.UserInfo.str_Search_currentTotalScore;
        this.invoke(2,()=>{
            KFControllerMgr.getCtl(PanelName.GameScorePanel).setType(2).show();
        },this);
    }
    private ballMoveLeft(moveleft:boolean){
        this.longzhu.velocity[0] = 0;
        this.longzhu.angularVelocity = 0;
        if(moveleft){
            this.longzhu.applyForce([-this.addForce,0],[0.5,1]);
        }else{
            this.longzhu.applyForce([this.addForce,0],[0.5,1]);
        }
    }


    public  convertEgretValueToP2(value:number):number {
            return value / this.factor;
        }

        /**
         * 把egretY值转换到p2Y值，仅适合y转换
         */  
    public  convertEgretY_To_P2Y(egretY:number):number{
            return (egret.MainContext.instance.stage.stageHeight - egretY ) / this.factor;
        }
    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     */
    private createBitmapByName(name: string): egret.Bitmap {
        var result: egret.Bitmap = new egret.Bitmap();
        var texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }
}