class ScoreItem extends eui.Component {
	private Label_groupAmount:eui.Label;
	private Sprite_jewel:eui.Image;
	private Label_groupScore:eui.Label;

	private amount;
	private score;
	private type;

	public constructor(groupAmount,groupScore,jewel) {
		super();
		this.skinName = "ScoreItemSkin";
		this.amount = groupAmount;
		this.score = groupScore;
		this.type = jewel;
	}

	protected childrenCreated(){
		this.Label_groupAmount.text = this.amount + "";
        this.Label_groupScore.text = this.score + "";
        var picName = "";
        switch (this.type)
        {
            case 1: //白玉
                picName = "1";
                break;
            case 2: //碧玉
                picName = "2";
                break;
            case 3: //墨玉
                picName = "3";
                break;
            case 4: //玛瑙
                picName = "4";
                break;
            case 5: //琥珀
                picName = "5";
                break;
            case 11: //祖母绿
                picName = "6";
                break;
            case 12: //猫眼石
                picName = "7";
                break;
            case 13: //紫水晶
                picName = "8";
                break;
            case 14: //翡翠
                picName = "9";
                break;
            case 15: //珍珠
                picName = "10";
                break;
            case 21: //红宝石
                picName = "11";
                break;
            case 22: //绿宝石
                picName = "12";
                break;
            case 23: //黄宝石
                picName = "13";
                break;
            case 24: //蓝宝石
                picName = "14";
                break;
            case 25: //钻石
                picName = "15";
                break;
        }
		this.Sprite_jewel.source = RES.getRes(picName);
	}

}