class DiceGameController {

	private static _instance = null;

	public static GetInstance() : DiceGameController{
        if (DiceGameController._instance == null){
            DiceGameController._instance = new DiceGameController();
        }
        return DiceGameController._instance;
    }

	private constructor() {
	}


	private reasonTypeDesc =             
			{
                "1000" : "用户账号存在异常，需要重新登陆!",
                "1001" : "房间不存在",
                "1002" : "用户ID错误，用户不存在",
                "1003" : "设置的准备状态数值不合法",
                "1004" : "设置的自动状态数值不合法",
                "1005" : "有玩家已准备,不允许修改",
                "1006" : "对局尚未开始，不允许叫色/开色",
                "1007" : "对局已开始，不允许修改装备状态",
                "1008" : "叫色点数不合法",
                "1009" : "请前往连环夺宝放弃点数,\r\n清除游戏进度后再来进入!",
                "1011" : "托管状态，不允许操作！",
                "2001" : "房主当前点数不够",
                "2002" : "房主修改的新点数不合法",
                "3001" : "挑战者不存在",
                "3002" : "挑战者当前点数不够",
                "3011" : "参数错误",
                "3012" : "房间名必须包含中文或字母",
                "3013" : "房间名不能包含敏感词或非法字符",
                "3014" : "名字太长",
                "3015" : "有同名房间名",
                "3017" : "房间密码错误",
                "1010" : "该房间已满人",
                "1013" : "链接失败",
                "4001" : "不是房主",
                "4002" : "游戏已经开始",
                "4011" : "该玩家拒绝被邀请",
                "4012" : "身份证格式不正确",
                "4022" : "进入失败",                
			};

        public GetDescription(reasonType)
		{
            let reasonString = this.reasonTypeDesc[reasonType] ? this.reasonTypeDesc[reasonType] : "未知错误...";
			return LocalizationMgr.getText(reasonString);
		}

        public GotoLoginScene(){
            KFSceneManager.getInstance().replaceScene(SceneName.Login);
        }

}