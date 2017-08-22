/**
 *
 * @author 
 *
 */

interface String {
    format(...replacements: string[]): string;
}

if(!String.prototype.format) {
    String.prototype.format = function() {
        var args = arguments;
        return this.replace(/{(\d+)}/g,function(match,number) {
            return typeof args[number] != 'undefined'
                ? args[number]
                : match
                ;
        });
    };
}

class ServiceWS {
    
    private static ThroughPsw: string = "ThroughhThroughh";
    
    private static Separator: string = "#";

    private static namespaceUrl: string = "http://tempuri.org/";
    
    private static Key: string = "";

    private timeoutTime = 6000;
    private IsTimeout = false;
    private isFInish = false;
    
    private static instance: ServiceWS;
    public static getInstance(): ServiceWS {
        // if(this.instance == null) {
        //     this.instance = new ServiceWS();
        // }
        // return this.instance;
        return new ServiceWS();
    }
    
	public constructor() {
        let version: number = Number(GlobalClass.GameInfoForConfig.UniqueSerialInfo[2]);
        if(version<140){
            ServiceWS.Key = "abcdefgh";
        }else{
            ServiceWS.Key = "$a%flYQuZAMISIWNcUpiU%uDJOF7WYLDYL6WjCV^Uu57PWAJe3rLZz#2BgOmzvb&1NAmRXBxI7q73@gQAitXRsUv0MBKOsUJ6Z4^";
        }
	}
	
	private getPublicUrl(){
	    return "http://" + GlobalClass.GameInfoForConfig.wsURL + "/ServiceBS.asmx";
	}
	
	
    public Through(methedName:string,signstr:string,throughKeys:string,throughValues:string,cb:Function,waitTime = 6000){
        let SoapKeys:Array<string> = ["Sign"];
        // let SoapValues: Array<string> = signstr.split("#");
        let SoapValues: Array<string> = [signstr];
        let infosKeys: Array<string> = throughKeys.split("#");
        let infosValues: Array<string> = throughValues.split("#");
        
        let bodyContent: string = this.makeSoapMSg(methedName,"MySoapHeader",this.makeInfoStr(SoapKeys,SoapValues),this.makeInfoStr(infosKeys, infosValues));
        //开始请求
        var request = new egret.HttpRequest();
        request.responseType = egret.HttpResponseType.TEXT;
        //设置为 POST 请求
        let url: string = this.getPublicUrl();
        console.log("testURL="+url);
        request.open(this.getPublicUrl(),egret.HttpMethod.POST);
        request.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
        request.setRequestHeader("SOAPAction",ServiceWS.namespaceUrl+methedName);
//        request.setRequestHeader("Content-Length",bodyContent.length+"");
        request.send(bodyContent);

        request.addEventListener(egret.IOErrorEvent.IO_ERROR,(event:egret.IOErrorEvent) => {
            this.isFInish = true;
            console.log("ServiceWS post error : "+event.data);
            if(!this.IsTimeout){
                cb("post error : ");
            }
        },this);
        
        request.addEventListener(egret.Event.COMPLETE,(event: egret.IOErrorEvent)=>{
            this.isFInish = true;
            var request = <egret.HttpRequest>event.currentTarget;
            console.log("post data : "+(<string>request.response));
            if(request.response==null||request.response==""){
                console.log("no result");
                return;
            }
            try{
                let te =  <string>request.response;
                te = decodeURIComponent(te);
                let simbol = methedName+"Result>";
                var startindex  =  te.indexOf(simbol);
                var endindex =  te.lastIndexOf(simbol);
                let substr = te.substring(startindex+simbol.length,endindex-2);
                // let response: egret.XML = egret.XML.parse(request.response);
                // console.log("ServiceWS node1="+response.name );
                // let body: egret.XML = <egret.XML><any>response.children[1];
                // console.log("ServiceWS node2="+body.name );
                // let resultTitle: egret.XML = <egret.XML><any>body.children[0];
                // console.log("ServiceWS node3="+resultTitle.name );
                // let resultBody: egret.XML = <egret.XML><any>resultTitle.children[0];
                // console.log("ServiceWS node4="+resultBody.name );
                // let result: egret.XMLText = <egret.XMLText><any>resultBody.children[0];
                // console.log("ServiceWS node5="+result );
                // console.log("ServiceWS result2=" );

                // console.log("ServiceWS result2=" + result);

                // console.log("ServiceWS result=" + result.text);
                // cb(result.text);
                if(!this.IsTimeout){
                    cb(substr);
                }
            }catch(err){
                // KFControllerMgr.showTips("神话级的错误就是："+err.description , 2);
            }
        },this);
        
        //添加超时功能
        this.timeoutTime = waitTime;
        let timeOut = new egret.Timer(this.timeoutTime,1);  
        timeOut.addEventListener(egret.TimerEvent.TIMER,()=>{
            if(!this.isFInish){
                console.log("ServiceWS TimerOUt " );
                cb("postTimeout");
                this.IsTimeout = true;
            }
        },this);  
        timeOut.start(); 
        
    }
    
    private makeSoapMSg(requestMethod:string,headName:string,headInfos:string,bodyInfos:string): string {
        let oristr: string = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n" +
            "<soap:Envelope xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\" xmlns:soap=\"http://schemas.xmlsoap.org/soap/envelope/\">\n" +
            "<soap:Header>\n" +
            "<{0} xmlns=\"{1}\">\n" +
            "{2}" +
            "</{3}>\n" +
            "</soap:Header>\n" +
            "<soap:Body>\n" +
            "<{4} xmlns=\"{5}\">\n" +
            "{6}\n" +
            "</{7}>\n" +
            "</soap:Body>\n" +
            "</soap:Envelope>\n";
        oristr =  oristr.format(headName,ServiceWS.namespaceUrl,headInfos,headName,requestMethod,ServiceWS.namespaceUrl,bodyInfos,requestMethod);
        return oristr;
    }
    
    private makeInfoStr(keys:Array<string>,values:Array<string>):string{
        if(keys.length==0){
            return "";
        }
        let reStr:string = "";
        for(var i = 0;i < keys.length; i ++) {
            let temp:string = "<{0}>{1}</{2}>\n";
            reStr += temp.format(keys[i],values[i],keys[i]);
        }
        return reStr;
    }
//    private onPostComplete(event: egret.Event): void {
//        var request = <egret.HttpRequest>event.currentTarget;
//        console.log("post data : ",request.response);
//    }
//
//    private onPostIOError(event: egret.IOErrorEvent): void {
//        console.log("post error : " + event);
//    }
	
	
}
