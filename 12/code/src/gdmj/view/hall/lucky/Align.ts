/**
 *
 * @author chenwei
 *
 */
class Align extends eui.Component{
    public runPointImg: eui.Image;
    private bgImg: eui.Image;
    private areasCount: number;               //区域数量
    private ringCount: number;
    private perRingTime: number; 
    private areaIndex: number;                //中奖区域索引
    private prizeGroup:eui.Group;             //放置奖品文本和图片
    private areas:Array<string>;              //抽奖奖品名
    private areasSrc: Array<string>;          //抽奖奖品资源名
    private prizeCount:Array<number>;         //奖品数量
    private textFiles:Array<egret.TextField>; //抽奖文本
    private images:Array<eui.Image>;          //抽奖图片
    private closeBtn:eui.Button;              //关闭按钮  
    public startBtn:eui.Rect;                 //开始按钮
    
    public constructor() {
        super();
        this.skinName ="AlignSkin"
        this.textFiles=[];
        this.images=[];
	}

    /**
     * 初始化数据
     * @prizeList  奖品列表
     * @ringCount
     * @perRingTime
     */
    public initData(prizeList:Array<any>, ringCount: number,perRingTime: number){
        this.ringCount=ringCount;
        this.perRingTime = perRingTime;

        this.textFiles.forEach((txt) => { txt.parent && txt.parent.removeChild(txt) });
        this.images.forEach((img) => { img.parent && img.parent.removeChild(img) });
        this.textFiles.length = 0;
        this.images.length = 0;
        this.setAreaData(prizeList);
    }

    /**
     * 设置中奖奖品
     * @prizeIndex 奖品索引
     */
    public setAreaIndex(prizeIndex:number){
        this.areaIndex = prizeIndex; 
    }
    
    //设置区域
    private setAreaData(prizeList:Array<any>){
        //区域数量
        let len= this.areasCount= prizeList.length;
//        console.log(dataSrc);
        //每一个区域的角度大小
        let perAngle=360/len;
        
        //文字位置半径长度  背景的一半的
        let r = this.bgImg.width/2*0.45;    
        
        //图片位置半径长度  背景的一半的60%
        let r0 = this.bgImg.width / 2 * 0.58;  
        
        //圆的原点 为指针图片的坐标，此时指针图片的锚点为该大小的一半
        let x0=this.runPointImg.x;
        let y0 = this.runPointImg.y;
        
//        let offAngle=perAngle*(len-1);
//        console.log(offAngle)
        //指针从正上方开始,所以从270度开始,算出偏移下标
        let offIndex = 0
            
        for(let i = offIndex;i < len + offIndex;i++){
            
            let txt:egret.TextField=new egret.TextField();
            let img:eui.Image=new eui.Image();
            var name:string = prizeList[i-offIndex].reward[0].name;
            var imgSrc:string = prizeList[i-offIndex].reward[0].imgSrc;
            var count:number = prizeList[i-offIndex].reward[0].count;
                    
            //字体大小
            txt.size=16;
            //取得文本
            txt.text = name + "x" + count;
            img.source =imgSrc;

            //文本颜色
            txt.textColor = 0xffffff;         
            txt.bold=true;           

            
            //文本旋转角度  开始角度+区域角度大小的/2
            txt.rotation = (i*perAngle)+perAngle/2;
            img.rotation=  (i*perAngle)+perAngle/2;   
            //文本长度偏移角度 ,不同文长度的文本位置不一样，尽量居中           

            
            let lenAngle=perAngle/(txt.text.length+1);       
                
            //实际偏移角度
            let offAngle = (i * perAngle + 270) + perAngle/2 ;
            let offAngleImg =(i * perAngle + 270)+perAngle/2;

            //文字x,y坐标
            let x1 = x0 + r * Math.cos(offAngle * 3.14 / 180);    
            let y1 = y0 + r * Math.sin(offAngle* 3.14 / 180);        
            
            //图片x,y坐标
            let x2 = x0 + r0 * Math.cos(offAngleImg * 3.14 / 180);
            let y2 = y0 + r0 * Math.sin(offAngleImg * 3.14 / 180) ;        

    //        console.log("img :",img.source,",x:",x2,",y:",y2);
            
            txt.x=x1;
            txt.y=y1;
            
            img.x=x2;
            img.y=y2;
            
            this.textFiles.push(txt);        
            this.images.push(img);
            this.prizeGroup.addChild(img);
            this.prizeGroup.addChild(txt);
            txt.anchorOffsetX = txt.width / 2;
            txt.anchorOffsetY = txt.height / 2;

            img.anchorOffsetX = img.width / 2;
            img.anchorOffsetY = img.height / 2;
        }
    }


    /**
     * 
     * @param area 区域
     */
    public startRun(){               
        if(!this.areaIndex){
            Tips.info("真.没有中奖~~~")
            return;
        }
        let PP=360;        
        //加速度圈数
        let pAdd=~~(this.ringCount*0.7);        
        //每个区域的角度
        let  perAngle=~~(PP/this.areasCount)
        //偏移角度=最后一圈的角度+随机角度 30%~70%
        //let offAngle=~~(this.areaIndex*perAngle+perAngle*(0.3+Math.random()*(1-0.3)));
        let offAngle=~~(this.areaIndex*perAngle - perAngle/2);

        //加速度所需的时间
        let startDuring=pAdd*this.perRingTime;
        //减速度所需的时间  需要加上偏移角度需要的时间
        let stopDuring=~~((this.ringCount-pAdd)*this.perRingTime+(offAngle/360)*this.perRingTime);
         //加速旋转的角度数   
         let startRota=pAdd*PP;   
         //减速旋转的角度数
         let stopRota=(this.ringCount-pAdd)*PP+offAngle;
         //抽奖区间，不可点击
         this.touchChildren = false;
         this.touchEnabled = false;

        //指针旋转 先加速后减速
        egret.Tween.get(this.runPointImg,{onChange: this.onChange,onChangeObj: this })
        .to({ rotation: startRota },startDuring,egret.Ease.quadIn)   
        .to({ rotation: startRota + stopRota},stopDuring,egret.Ease.quadOut)
        .call(()=>{
            egret.Tween.removeTweens(this.runPointImg);
        });            
    }


    //重置
    public resetData(){
        this.runPointImg.rotation=0;  
        this.touchChildren = true;
        this.touchEnabled = true;
    }
    
    
    private onChange(){
        let perAngle=360/this.areasCount;
        let rota = Math.floor(this.runPointImg.rotation/perAngle);       
    }
}
