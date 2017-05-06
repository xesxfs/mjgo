/**
 * http请求类
 * @author chenwei
 *
 */
class HttpSender extends SingleClass{
	
	/**
	 * 发送http请求
	 * @param dataToSend 发送的Json数据
	 * @param cb 回调函数
	 * @param obj thisObject
	 */ 
    public send(paramObj:Object, cb:Function, obj:any):void{
      
        let dataToSend=JSON.stringify(paramObj);
        var url = App.DataCenter.ServerInfo.WEB_URL;
        console.log("send url:"+url);
        var request: egret.HttpRequest = new egret.HttpRequest();
        request.open(url,egret.HttpMethod.GET);
        request.once(egret.Event.COMPLETE,function(e) {
            var request = <egret.HttpRequest>e.currentTarget;
            console.log("requet.response:"+request.response);
            var re = JSON.parse(request.response);
           
            cb.call(obj, re);
        },this);
        
        request.once(egret.IOErrorEvent.IO_ERROR,function(e){
            console.log("error : event=" + e);
        },this);
        request.send();
	}
	
	

}
