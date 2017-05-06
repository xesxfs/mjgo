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
	public  testList=[
		"o2P0bwV8zuxfrVSsmy1ZJf7USFw0",
		"o2P0bwSorAjxiVlmvGzNmagjX3Z8",
		"o2P0bwSTs13BEOZCrzGiq2wKvr6I",
		"o2P0bwVIsXa8H2ZN-K8gvUo5ksiU",
		"o2P0bwTIsCK1M4Aqy6YuxGPuxPXQ"
		];

	/**测试账号*/
	public get account(){
		return this.testList[egret.getOption("debug")];
	}
	/**测试密码*/
	public password:string = "112233";
}