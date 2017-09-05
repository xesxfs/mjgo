/**
 * 车辆方向控制类
 * 触控和键盘来实现控制
 * @author 
 *
 */
class VehicleSteeringCtrl extends egret.Sprite{
    private btnHor: egret.Bitmap;
    private btnVer: egret.Bitmap;
    private btnJump: egret.Bitmap;
    
    private dirH_touch: number = 0;
    private dirV_touch: number = 0;
    private jump_touch: number = 0;
    
    private dirH_keyboard: number = 0;
    private dirV_keyboard: number = 0;
    private jump_keyboard: number = 0;
    
    public vehicle: any;//vehicle ref
    
    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddedStage,this);
     }
	
    private onAddedStage(e:egret.Event):void{
        this.setupUI();
         
        jbP2.KeyManager.init();
        egret.Ticker.getInstance().register(this.update, this);//
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
        
        this.btnJump = jbP2.DispUtil.createBitmapByName("rect");
        this.btnJump.x = this.btnHor.width * .5;
        this.btnJump.y = this.btnHor.y+this.btnHor.height+100;
        this.btnJump.touchEnabled = true;
        this.addChild(this.btnJump);
        this.btnJump.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onBtnJumpTouchBegin,this);
        this.btnJump.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.onBtnJumpTouchMove,this);
        this.btnJump.addEventListener(egret.TouchEvent.TOUCH_END,this.onBtnJumpTouchEnd,this);
        this.btnJump.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE,this.onBtnJumpTouchEnd,this);
    }
      
    private onBtnJumpTouchBegin(e:egret.TouchEvent):void{
        this.jump_touch = 1;
    }
    private onBtnJumpTouchMove(e:egret.TouchEvent):void{
        this.jump_touch = 1;
    }
    private onBtnJumpTouchEnd(e: egret.TouchEvent): void {
        this.jump_touch = 0; 
    }
   
    
                    
    private onBtnHorTouchBegin(e:egret.TouchEvent):void{
        this.updateDirHorizontalValue(e.stageX,e.stageY);
    }
    private onBtnHorTouchMove(e:egret.TouchEvent):void{
        this.updateDirHorizontalValue(e.stageX,e.stageY);
    }
    private onBtnHorTouchEnd(e: egret.TouchEvent): void {
        this.dirH_touch = 0; 
    }
    private updateDirHorizontalValue(stageX:number,stageY:number):void{
        var local = this.btnHor.globalToLocal(stageX,stageY);
        if(local.x > this.btnHor.width*0.5){
            this.dirH_touch = 1;
        }else{
            this.dirH_touch = -1;
        }
    }
                    
    private onBtnVerTouchBegin(e:egret.TouchEvent):void{
        this.updateDirVerzontalValue(e.stageX,e.stageY);
    }
    private onBtnVerTouchMove(e:egret.TouchEvent):void{
        this.updateDirVerzontalValue(e.stageY,e.stageY);
    }
    private onBtnVerTouchEnd(e:egret.TouchEvent):void{
        this.dirV_touch = 0;
    }
    private updateDirVerzontalValue(stageX:number,stageY:number):void{
        var local = this.btnVer.globalToLocal(stageX,stageY);
        if(local.y > this.btnVer.height*0.5){
            this.dirV_touch = -1;
        }else{
            this.dirV_touch = 1;
        }
    }
       
    private update():void{
        
        //keyboard ctrl-----------------------
        if(jbP2.KeyManager.isDown(jbP2.KeyManager.UP)){
            this.dirV_keyboard = 1;
        }else if(jbP2.KeyManager.isDown(jbP2.KeyManager.DOWN)){
            this.dirV_keyboard = -1;
        }else{
            this.dirV_keyboard = 0;
        }
                                               
        if(jbP2.KeyManager.isDown(jbP2.KeyManager.LEFT)){
            this.dirH_keyboard = -1;
        }else if(jbP2.KeyManager.isDown(jbP2.KeyManager.RIGHT)){   
            this.dirH_keyboard = 1;
        }else{
            this.dirH_keyboard = 0;
        }
        
        if(jbP2.KeyManager.isDown(jbP2.KeyManager.SPACE)){
            this.jump_keyboard = 1;
        }else{
            this.jump_keyboard = 0;
        }
        //keyboard ctrl-----------------------
        
        var finalDirV: number;
        if(this.dirV_touch != 0){
            finalDirV = this.dirV_touch;
        }
        if(this.dirV_keyboard != 0){
            finalDirV = this.dirV_keyboard;
        }
        var finalDirH: number;
        if(this.dirH_touch != 0){
            finalDirH = this.dirH_touch;
        }
        if(this.dirH_keyboard != 0){
            finalDirH = this.dirH_keyboard;
        }
        
        var finalJump: number;
        if(this.jump_touch != 0){
            finalJump = this.jump_touch;
        }
        if(this.jump_keyboard != 0){
            finalJump = this.jump_keyboard;
        }
        
        //更新车辆方向
        if(this.vehicle != null){
            this.vehicle.updateSteering(finalDirH,finalDirV);
            if(finalJump ==1 && this.vehicle.jump){//如果控制变量finalJump==1,且车辆有jump方法
                this.vehicle.jump();
            }
        }
        
    }
}
