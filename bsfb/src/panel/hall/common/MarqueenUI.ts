
class MarqueenUI extends eui.Component{
	public constructor() {
		super();			
	}
	private maskRect:eui.Rect;
	private backImg:eui.Image;
    private vipFlagImg:eui.Image;
	private contentGroup:eui.Group;
	private isShow:boolean=true;

	private contentLab:eui.Label;

	private durationDelay:number=800;
	private isTween:boolean =false;
	private marqueenList:Array<Object>=[];
	private isRolling:boolean= false;
	private rollSpeed:number =0.01;

	private bgInitWidth:number;
	private maskInitWidth:number;
	private contentFlow:Array<egret.ITextElement>;
    private call:Function;
    private thisObj:any;
	private cdata=[];//颜色数值

    protected childrenCreated(){
		this.backImg.addEventListener("touchTap",this.onTouchTap,this);
		this.contentGroup.mask = this.maskRect;
		this.contentGroup.x = this.width;
		this.bgInitWidth = this.backImg.width;
		this.maskInitWidth = this.maskRect.width;
        // this.pushMarquees( [{"txt":"[FF0000]恭喜玩家[FFFF00]独行侠ly[-]在本轮获得最高点数[FFFF00]76000[-]点[-]","vip":0}]);

		// this.pushMarqueen("[0x564564]123456[0xff5555]那你呢[0xffffff]嵌套数据[-][-][0xf8ff81]呵呵[-]哦哦[-]",10);
        // this.pushMarquees([{txt:"[FEE900]欢迎VIP会员 [FFFFFF]羽翼猫君[-] 上线了[-]",vip:1},{txt:"[FEE900]欢迎VIP会员 [FFFFFF]羽翼0猫君[-] 上线了[-]",vip:0}])
        // this.pushMarqueen("[FEE900]欢迎VIP会员 [FFFFFF]羽翼猫君[-] 上线了[-]",10);
    }

	private onTouchTap(e:egret.Event){
		if(this.isTween)return;
		this.isTween = true
		if(this.isShow){
			egret.Tween.get(this.backImg).to({width:46},this.durationDelay).call(()=>{this.contentGroup.visible=false;this.isTween=false;},this);
			egret.Tween.get(this.maskRect).to({width:0},this.durationDelay)
            this.touchEnabled = false;
			this.isShow = false;	
		}else{
			egret.Tween.get(this.backImg).to({width:this.bgInitWidth},this.durationDelay).call(()=>{this.contentGroup.visible=true;this.isTween=false;},this);
			egret.Tween.get(this.maskRect).to({width:this.maskInitWidth},this.durationDelay);
            this.touchEnabled = true;
			this.isShow = true;	
		}
	}

    public show(){
        egret.Tween.get(this.backImg).to({width:this.bgInitWidth},this.durationDelay).call(()=>{this.contentGroup.visible=true;this.isTween=false;},this);
		egret.Tween.get(this.maskRect).to({width:this.maskInitWidth},this.durationDelay)
		this.isShow = true;	
    }

    public hide(){
        egret.Tween.get(this.backImg).to({width:46},this.durationDelay).call(()=>{this.contentGroup.visible=false;this.isTween=false;},this);
		egret.Tween.get(this.maskRect).to({width:0},this.durationDelay)
		this.isShow = false;	
    }

	private checkRoll(){
        //正在跑直接返回
        if(this.isRolling){
            return;
        }
	    //所有数据跑完
        if(!this.marqueenList.length){
            this.call&&this.thisObj&&(this.call.call(this.thisObj));
            return;
        }
		let rollObj:Object = this.marqueenList.shift();
		this.roll(rollObj);
	}

	private roll(roll:Object){
		this.isRolling = true;
		this.parseColor(roll["txt"]);
        this.setStyle();
        this.setVipSign(roll["vip"]);
		this.contentGroup.left = this.bgInitWidth;
		egret.Tween.get(this.contentGroup).to({left:-this.contentGroup.width},this.contentLab.width/this.rollSpeed).call(()=>{
			this.isRolling=false;
			this.contentGroup.left=this.width;
			this.checkRoll();
        });       
	}

    private setVipSign(flag:number){
        if(flag){
            this.vipFlagImg.visible =true;
            this.contentLab.x = this.vipFlagImg.width;
        }else{
            this.vipFlagImg.visible = false;
            this.contentLab.x =0;
        }

    }

    public setCallBack(call:Function,thisObj:any){
        this.call=call;
        this.thisObj=thisObj;
    }

    public pushMarquees(marquess:Array<Object>){
	    // if(!this.isShow)return;
         if(!this.isShow){
            this.show();
        }
        for(let i=0;i<marquess.length;i++){
            this.marqueenList.push(marquess[i]);
        }
        this.checkRoll();
    }

	public pushMarqueen(str:string,count:number=1){
		// if(!this.isShow)return;
        if(!this.isShow){
            this.show();
        }
		for(let i=0;i<count;i++){
			this.marqueenList.push(str)
		}
		this.checkRoll();	
	}

	public setStyle(){
		let contextFlow:Array<egret.ITextElement>=new Array<egret.ITextElement>();
		for(let i=0;i<this.cdata.length;i++){
			let textElement ={text:this.cdata[i].v,style:{"textColor":this.cdata[i].c}}
			contextFlow.push(textElement);
			}
		this.contentLab.textFlow = contextFlow;
	}



    private readKeys(str:string):string{   
            if(str[0] == "[") {
                for(let i = 1;i < str.length;i++) {
                    if(str[i] == "]") {
                        let keyValue = str.substring(1,i);
                        return keyValue;
                    }
                }
            }
            return null;
        }
        
     private readValues(str: string):string{
            if(str.length > 0) {
                for(let i = 0;i < str.length;i++) {
                    if(str[i] == '[') {
                        let value = str.substr(0,i);
                        return value;
                    };
                }
            }

            return null;
        }

    private parseColor(str:string){
                let keys = [];
				this.cdata=[];
                let ckey = this.readKeys(str);
				keys.push(ckey);
                this.parse(str,ckey,keys);				     
				console.log(this.cdata); 
        }
        
    private parse(str:string,ckey:string,keys:Array<string>){
            //0 结束 1数值 2 开始标签  3结束标签
            let flag = this.checkFlag(str);
            switch(flag) {
                case 0:
                    return;
                case 1:
                    let value = this.readValues(str);
                    str = str.substring(value.length,str.length);                  
//                    this.vdata[ckey].push(value);
                    let co=new Object();
                    co["c"] = "0x"+ckey;
                    co["v"] = value
                    this.cdata.push(co);
                    this.parse(str,ckey,keys);
                    break;
                case 2:
                    let key = this.readKeys(str);
                    keys.push(key);
                    str = str.substring(key.length+2,str.length);                   
//                  !this.vdata[key] && (this.vdata[key] = []);
                    this.parse(str,key,keys);
                    break;
                case 3:
                    str = str.substring(3,str.length);                  
                    keys.pop();
                    let ctkey = keys[keys.length-1];
                    this.parse(str,ctkey,keys);
                    break;
                default:
                    console.log("未知错误！！！")
                    return
            }    
            
        }


	//0 结束 1数值 2 开始标签  3结束标签
    private checkFlag(str:string):number{
            let flag =0;
            if(str.length>0){                
                if(str[0] == '['){
                    if(str[1] == '-'){
                        flag =3
                    }else{
                        flag =2                        
                    }
                    
                }else{
                    flag =1;
                }
                
            }            
            return flag;            
        }

}