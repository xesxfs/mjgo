/**
 * 调试信息
 * @author chenkai
 * @date 2016/11/16
 */
class DebugInfo {
	/**是否调试模式*/
	public get isDebug():boolean{
		return (egret.getOption("debug") != null && egret.getOption("debug") != "");
	};

	/**是否访问本地php，用于php访问地址设置*/
	public get isLocalPhp():number{
		return parseInt(egret.getOption("local"));
	};

	/**测试账号*/
	public get account(){
		return "test" + egret.getOption("debug");
	}
	/**测试密码*/
	public password:string = "112233";
}