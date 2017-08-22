class CallDicePanel extends KFPanel  {

	public Btn_Close:eui.Button;
    public Btn_Num0:eui.Button;
    public Btn_Num1:eui.Button;
    public Btn_Num2:eui.Button;
    public Btn_Num3:eui.Button;
    public Btn_Num4:eui.Button;
    public Btn_Receive0:eui.Button;
    public Btn_Receive7:eui.Button;
    public Btn_Add:eui.Button;

    public Image_D1:eui.Image;
    public Image_D2:eui.Image;
    public Image_D3:eui.Image;
    public Image_D4:eui.Image;
    public Image_D5:eui.Image;
    public Image_D6:eui.Image;

    public Group_Num:eui.Group;
    public Group_Dice:eui.Group;

    public Btn_Nums:Array<eui.Button>;
    public Image_Dices:Array<eui.Image>;

    public LabelTitle:eui.Label;

    protected init() {
        this.skinName = "Panel_CallDice";
        super.init();
    }

    protected onAddToStage() {
        super.onAddToStage();
        console.log("onAddToStage" + this.TAG);
        this.Btn_Nums = [this.Btn_Num0,this.Btn_Num1,this.Btn_Num2,this.Btn_Num3,this.Btn_Num4];
        this.Image_Dices = [this.Image_D1,this.Image_D2,this.Image_D3,this.Image_D4,this.Image_D5,this.Image_D6,];
    }

    protected onRemovefromStage() {
        console.log("onRemovefromStage");
    }
}