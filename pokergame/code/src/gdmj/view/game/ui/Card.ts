/**
 * 牌
 * @author chenwei 
 * @date 2016/6/29
 */
class Card extends eui.Component{
    public static NAME:string = "Card";
    public cardValue:number;     //牌值 例如四张1万中的1张，0x011 
  
    public cardImg:egret.Bitmap; //牌值图片
    public userPos:UserPosition; //方向
    public bUp:boolean = false;  //双击出牌，第一次点击会弹起，第二次点击才出牌
    public upDist:number = 20;   //弹起的距离
    public initPosY:number = 0;  //初始y位置，用于牌的多种动画后，恢复原位时，防止位置错乱
    private selectFlag:egret.Sprite;
	public constructor() {
    	super();    	
        this.cardImg = new eui.Image();          
    	this.addChild(this.cardImg);
    	this.touchChildren = false;
    	this.touchEnabled = false;
	}
	
	/**
	 * 设置手牌皮肤
	 * @param cardValue 牌值
	 * @dir 牌方向
	 */ 
    public setHandSkin(cardValue: number){
        this.cardValue = cardValue;           
         this.cardImg.bitmapData = RES.getRes(cardValue + "_png");
         this.createFlag();        
	}
	
	/**
	 * 设置出牌皮肤
	 * @param cardValue 牌值
	 * @dir 牌方向
	 */
    public setOutSkin(){
        this.cardImg.width =60;
        this.cardImg.height =86;
	}
	
    private createFlag(){
        if(!this.selectFlag){
            this.selectFlag =new egret.Sprite();
            this.selectFlag.graphics.beginFill(0x000000,0.1)
            this.selectFlag.graphics.drawRoundRect(0,0,this.width,this.height,30);
            this.selectFlag.graphics.endFill();
            // this.selectFlag.alpha =0.5;
            this.selectFlag.visible =false;
            this.addChild(this.selectFlag);
        }        
    }

    public select(){
        this.selectFlag.visible =true;

    }
    public unSelect(){
        this.selectFlag.visible =false;
    }

    /**弹起*/
    public toUp(){
        if(this.bUp == false){
            this.y = this.initPosY - this.upDist;
            this.bUp = true;
        }
    }

    /**放下*/
    public toDown(){

        if(this.bUp == true){
            this.y = this.initPosY;
            this.bUp = false;
        }
    }

    public toChangeStatus(){
        this.unSelect();
        if(this.bUp){
            this.toDown()
        }else{
            this.toUp();

        }
    }
	
	//回收到对象池
	public recycle(){
        this.bUp = false;
        this.userPos = 0;
        this.cardValue = 0;
    	this.touchEnabled = false;
        this.touchChildren = false;      
        this.cardImg.bitmapData = null;
        this.x = 0;
        this.y = 0; 
        this.cardImg.x = 0;
        this.cardImg.y = 0;
        this.scaleX = 1;
        this.scaleY = 1;
        this.cardImg.scaleX = 1;
    	this.parent && this.parent.removeChild(this);
    	ObjectPool.getPool(Card.NAME).returnObject(this);
	}
}
