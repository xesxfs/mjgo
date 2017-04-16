/**
 * @author xiongjian
 * 2017-1-6
 */
class RankItem1 extends eui.ItemRenderer{
    public constructor(){
        super();
        this.skinName = "RankItemSkin1";
    }

private rankIcon : eui.Image;
private myrank :eui.Label;
private deskName :eui.Label;
private deskNumber:eui.Label;
private point:eui.Label;
private rankBg :eui.Image;

 protected  dataChanged():void{
        // 将数据对应到组件上
        //  console.log("item"+this.data.rankIcon)

        // this.rankIcon.source =this.data.rankIcon;
        // this.myrank.text = this.data.sort;
        // this.deskName.text = this.data.deskName;
        // this.deskNumber.text = this.data.deskCode;
        // this.point.text = this.data.point;
        // this.rankBg.source = this.data.rankBg;
    }
    
}