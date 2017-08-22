/**
 *
 * @author 
 *
 */
class KFController {
    protected mPanel: any;
    protected EventsList: Array<MsgID> = null;
    protected ListenObjList: Array<any> = null;
    protected isDestory = false;
    private invokeList = {};
	public constructor() {
    	this.init();
        this.registerEvents();
    }

    protected init() {
        this.EventsList = new Array<string>();
        var name = egret.getQualifiedClassName(this);
        name = name.replace("Controller","");
        var className = egret.getDefinitionByName(name);

        this.mPanel = KFSceneManager.getInstance().getRunningScene().getPanel(className);

        this.mPanel.bindController(this);
    }

    private addObjEvent(){
        if(this.ListenObjList!=null){
            this.ListenObjList.forEach(element => {
                 for(let btn in element.items){
                        var funName =  btn+"Click";
                        var obj = this.mPanel[btn];
                        var coldDown = element.items[btn];
                        this.AddClickEvent(obj,element.event,this[funName],this,coldDown==""?0:coldDown);
                    }
            });
        }
    }

    private removeObjEvent(){
        if(this.ListenObjList!=null){
            this.ListenObjList.forEach(element => {
                if(element.event=="TOUCH_END"){
                    for(let btn in element.items){
                        var funName =  btn+"Click";
                        var obj = this.mPanel[btn];
                        var coldDown = element.items[btn];
                        this.RemoveClickEvent(obj,egret.TouchEvent.TOUCH_END,this[funName],this,coldDown==""?0:coldDown);
                    }
                }
                if(element.event=="CHANGE"){
                     for(let btn in element.items){
                        var funName =  btn+"Click";
                        var obj = this.mPanel[btn];
                        var coldDown = element.items[btn];
                        this.RemoveClickEvent(obj,egret.TouchEvent.CHANGE,this[funName],this,coldDown==""?0:coldDown);
                    }
                }
            });
        }
    }

	
    private registerEvents() {
        for(var i = 0;i < this.EventsList.length;i++) {
            var eventName = MsgID.getMsgEvent(this.EventsList[i]);
            var funName = "on" + eventName;
            NetEventMgr.getInstance().addEventListener(eventName,this[funName],this);
        }
    }

    private unRegisterEvents() {
        for(var i = 0;i < this.EventsList.length;i++) {
            var eventName = MsgID.getMsgEvent(this.EventsList[i]);
            var funName = "on" + eventName;
            NetEventMgr.getInstance().removeEventListener(eventName,this[funName],this);
        }
    } 
    
    public show(){
        this.mPanel.addToScene();
    }

    public hide(){
        this.mPanel.hide();
        
    }



    protected onShow(){
        // this.addObjEvent();
    }

     protected AddClickEvent(obj:any,event:string,fun:Function,thisObj:any,codeDown:number=0.5,needSound=true,useCapture?: boolean, priority?: number){
        
         CommonFuc.AddClickEvent(obj,event,fun,thisObj,codeDown,needSound,useCapture,priority);
    }

    protected butFade2(obj,percent){
        CommonFuc.imgFilterFloat(obj.getChildAt(0),[percent,percent,percent,1]);
    }

    protected RemoveClickEvent(obj:any,event:string,fun:Function,thisObj:any,codeDown:number=0.5,useCapture?: boolean, priority?: number){
        obj.removeEventListener(event,fun,thisObj,useCapture,priority);
    }
    
    public onPanelReady(){
        this.setOnClickListener();
        this.addObjEvent();
        this.onReady();
    }

    protected onReady(){
        
    }

    protected setOnClickListener() {

    }

    protected removeOnClickListener() {

    }
    
    protected destroy() {
        this.unRegisterEvents();
        this.removeOnClickListener();
        this.removeObjEvent;
        this.EventsList = null;
        this.isDestory = true;
    }

    protected invoke(delayTime:number,fun:Function,thisObj:any){
        this.cancelInvoke(fun,thisObj);//覆盖之前同名函数的invoke
        var timer: egret.Timer = new egret.Timer(delayTime*1000,1);
        timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE,()=>{
            if(!thisObj.isDestory){
                fun.call(thisObj);
                this.invokeList[fun.toString()] = null; 
            }
        },thisObj);
        this.invokeList[fun.toString()] = timer; 
        timer.start();
        
    }

    protected cancelInvoke(fun:Function,thisObj:any){
        if(this.invokeList[fun.toString()]!=null){
            var timer = this.invokeList[fun.toString()];
            timer.stop();
            this.invokeList[fun.toString()] = null; 
        }
    }

    protected cancelAllInvoke(){
        for(let key in this.invokeList){
            var timer = this.invokeList[key];
            if(timer!=null){    
                timer.stop();
            }
        }
         this.invokeList = {};
    }

    

    protected butFade(obj){
         var image: eui.Image = <eui.Image>obj.getChildAt(0);
         var colorMatrix = [
            0.55,0,0,0,0, 
            0,0.55,0,0,0,
            0,0,0.55,0,0,
            0,0,0,1,0
        ];

        var colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
        image.filters = [colorFlilter];
    }
    protected butBright(obj){
         var image: eui.Image = <eui.Image>obj.getChildAt(0);
         var colorMatrix = [
            1,0,0,0,0, 
            0,1,0,0,0,
            0,0,1,0,0,
            0,0,0,1,0
        ];

        var colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
        image.filters = [colorFlilter];
    }

    protected disableBut(obj:any){
        obj.enabled = false;
        // if(!obj.skin.hasState("disabled")){
        //     this.butFade(obj);
        // }
        this.butFade(obj);
    }

    protected enableBut(obj:any){
        obj.enabled = true;
       this.butBright(obj);
    }

    protected switchBtn(obj:any,b:boolean){
        obj.enabled = b;
        if(b)this.butBright(obj);
        else this.butFade(obj);
    }

    protected imgFade(img:eui.Image,percent:number){
         var colorMatrix = [
            percent,0,0,0,0, 
            0,percent,0,0,0,
            0,0,percent,0,0,
            0,0,0,1,0
        ];
         var colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
        img.filters = [colorFlilter];
    }



    protected playAnimation(target:egret.tween.TweenGroup,isLoop:boolean):void
    {
        if(isLoop)
        {
            for(var key in target.items)
            {
                target.items[key].props = {loop:true};
            }
        }
        target.play();
    }
    
}
