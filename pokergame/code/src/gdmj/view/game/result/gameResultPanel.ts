/**
 * 2017-3-8
 * author:xiongjian
 */

class gameResultPanel extends BasePanel {

    public constructor() {
        super();
        this.skinName = "gameResultSkin";
    }

    private resultList :eui.List;



    protected childrenCreated() {

    }

    protected onEnable() {

        this.setCenter();
        this.setData();
    }

    protected onRemove() {

    }

    private setData(){

        let ac = new eui.ArrayCollection();
        let arr = [];
        
        for(let i = 0; i < 5; i++){
            arr.push({name:"绝对醉人", gameId:"123456", gameFen:"+60", gameType:"捉鸟", zhongniao:"", gameresult:""});
        }

        ac.source = arr;
        this.resultList.dataProvider =ac
    }


}