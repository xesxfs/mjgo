/**
 *
 * @author chenwei
 *
 */
class PageView extends BaseUI{
	public constructor() {
    	super()
	}
    private selectPage:eui.Image;
    private lastIndex:eui.Image;
    private pageGroup:eui.Group;
    private selectGroup:eui.Group;    
    private pageContentGroup:eui.Group;   
    private selectFlagGroup:eui.Group;
    private viewGroup:eui.Group;
    private pageScorller:eui.Scroller;
    private offsetX:number
    private pageCount:number
    private curIdx:number=0;    
    private isMove:boolean;
    private movePer:number=20;
    private otherGamePool:ObjectPool;
    private otherGame:Array<OtherGame> =[];
    private curOtherGame:OtherGame;
    private isFirst:boolean =true;
    
    
    /**组件创建完毕*/
    protected childrenCreated() {
//      eui.Scroller.scrollThreshold=10;
        this.pageScorller.throwSpeed=0;
        this.offsetX=30;
        this.pageCount=0;
        this.movePer =50;        
        this.isMove=false;
        this.otherGamePool=ObjectPool.getPool("OtherGame",5);
        this.pageScorller.addEventListener(eui.UIEvent.CHANGE_END,this.pageMove,this);         
        this.pageScorller.addEventListener(eui.UIEvent.CHANGE_START,this.startPageMove,this);        
        }

    /**添加到场景中*/
    protected onEnable() {  

    }
    
    private pageMove(){
        if(!this.isMove) {
            return
        }
        var scorllH = this.pageScorller.viewport.scrollH;
        console.log(this.pageScorller.viewport.contentWidth);
        
        //滑动到下一个页面
        if(this.curIdx * App.StageUtils.stageWidth+this.movePer  < scorllH) {
            this.isMove = true
            this.curIdx++
            this.movePage(this.curIdx);

            //上一个页面
        } else if(this.curIdx * App.StageUtils.stageWidth-this.movePer > scorllH) {
            this.isMove = true
            this.curIdx--
            this.movePage(this.curIdx);
            //当前页面
        } else {
            this.isMove = true
            egret.Tween.get(this.pageScorller.viewport).to({ scrollH: (this.curIdx) * App.StageUtils.stageWidth },30).call(() => { this.isMove = false },this)
        }
    }
    
    private movePage(curIdx){
        egret.Tween.get(this.pageScorller.viewport).to({ scrollH: (curIdx) * App.StageUtils.stageWidth },200).call(() => { this.isMove = false },this)
        this.selPageFlag(curIdx)
        this.selectOtherGame(curIdx);
    }
    
    private startPageMove(){
        this.curIdx = ~~(this.pageScorller.viewport.scrollH / App.StageUtils.stageWidth);   
        this.isMove = true        
        console.log("当前页面:",this.curIdx);
    }
    //设置页面数量
    public setPageCount(count:number){
       if(count>1){
           this.pageCount = count;                   
           for(let c = 1;c < count;c++)this.addPage();
           }
    }
    //增加页签
    private addPage(){
      
        if(++this.pageCount<=1){
           this.hideScorller();
        }else{ 
            var p = new eui.Image(RES.getRes("hall_pageView_png"))
            this.pageGroup.addChild(p);
            p.x = this.lastIndex.x + this.offsetX;
            this.lastIndex = p;
            this.showScorller();
        }
   
    }
    //选择标志
    private selPageFlag(pidx:number){        
        if(pidx<=this.pageCount){
            this.selectPage.x=pidx*this.offsetX +2
        }
    }
    //增加内容页
    public addPageContent(ctc:BaseUI){
        this.resetData();
        let deskList = App.DataCenter.roomInfo.deskList; 
        for(let i =0 ;i<deskList.length ; i++){
            if(ctc&&deskList[i].deskNo == App.DataCenter.roomInfo.getCurDesk().deskNo){
                ctc.x = App.StageUtils.stageWidth * i;
                this.viewGroup.addChild(ctc);     
                this.pageScorller.viewport.scrollH = ctc.x;              
                ctc.percentWidth = 100;
                ctc.percentHeight = 100;
                this.selPageFlag(i);
            }else{                
                let otg:OtherGame = this.otherGamePool.getObject();
                otg.deskNo=deskList[i].deskNo
                otg.x = App.StageUtils.stageWidth * i;
                this.viewGroup.addChild(otg);
                this.otherGame.push(otg)       
                otg.percentWidth =100;
                otg.percentHeight =100;
            }
            this.addPage();
        }
        
        if(!ctc){
            this.curOtherGame = this.otherGame[0];
            this.curOtherGame.select();
        }
        let hall = App.SceneManager.getScene(SceneConst.HallScene) as HallScene;
        hall.updateCurDeskInfo();
    }
    
    public resetData(){
        this.selPageFlag(0);
        this.otherGame.forEach((ogame)=>{
            this.otherGamePool.returnObject(ogame)
            ogame.parent&&ogame.parent.removeChild(ogame);
            })
                
        let pagelen=this.pageGroup.numChildren;  
        this.lastIndex = this.pageGroup.getChildAt(0) as eui.Image;
        //这里要反序删除,避免层次排序
        for(let i = pagelen-1;i>0;i--){        
            var reChil = this.pageGroup.getChildAt(i)
            reChil&&reChil.parent&&reChil.parent.removeChild(reChil);    
        }    

        this.curOtherGame&&this.curOtherGame.unSelect();
        this.pageCount = 0;
        this.viewGroup.removeChildren();
    }   
    
    //增加一个    
    public addOneContent(){
        if(this.pageCount<App.DataCenter.roomInfo.deskList.length){            
            let otg = this.otherGamePool.getObject();
            otg.x = App.StageUtils.stageWidth * this.pageCount-1;
            this.viewGroup.addChild(otg);
            this.otherGame.push(otg);
            this.addPage();            
        }
    }
    
    private selectOtherGame(idx:number){
        console.log("选择的索引："+idx);
        let game=this.viewGroup.getChildAt(idx)
        let roomInfo:RoomInfo = App.DataCenter.roomInfo
        if(game&&game instanceof OtherGame){
            this.curOtherGame && this.curOtherGame.unSelect();
            game.select();
            this.curOtherGame = game;      
   
        }else{
            this.curOtherGame&&this.curOtherGame.unSelect();
        }
        roomInfo.setCurDeskById(idx+1);
        let hall =App.SceneManager.getScene(SceneConst.HallScene) as HallScene;
        hall.updateCurDeskInfo();
    }
    //选择游戏主界面
    public selectMainGame(){
        let numlen=this.viewGroup.numChildren;
        for(let i=0;i<numlen;i++){
            let game = this.viewGroup.getChildAt(i)
            if(game instanceof GameScene){
                if(this.curIdx == i){
                    return false;
                }
                this.curIdx =i;
                this.movePage(this.curIdx);
                return true;                    
            }
        }
        return false;
        
    }
    
    public hideScorller(){
        this.pageScorller.scrollPolicyH =eui.ScrollPolicy.OFF;        
        this.selectFlagGroup.visible = false;
    }
    
    public showScorller(){
        if(this.pageCount==1){
            return;
        }
        this.pageScorller.scrollPolicyH = eui.ScrollPolicy.ON;
        this.selectFlagGroup.visible = true;
    }


    /**从场景中移除*/
    protected onRemove() {
    }
}
