/**
 *
 * @author 
 *
 */
class WebSocketMgr {
    
    private ipAdd:string = "";
    
    private port:number = 80;
    
    private Connected:boolean = false;
    private isclosed:boolean = false;
    private socket: egret.WebSocket;
    private timeOut:egret.Timer;
    private timeoutFun;
    private timeoutTime = 7000;
    private isTimeout = false;
    
    private static instance: WebSocketMgr;
    public static getInstance(): WebSocketMgr {
        if(this.instance == null) {
            this.instance = new WebSocketMgr();
        }
        return this.instance;
    }
    
    private getServicePassWord():string{
        let version: number = Number(GlobalClass.GameInfoForConfig.UniqueSerialInfo[2]);
        if(version < 140) {
            return "f7@39b!caf%2=e40";
        } else {
            return "f7@39b!caf%2=e40";
//            return "g@6!yb2c%f42=u=0";
        }
    }
    
	public constructor() {
        // try{
        //     let request = new egret.HttpRequest();
        //     request.responseType = egret.HttpResponseType.TEXT;
        //     //设置为 POST 请求
        //     request.open("http://httpbin.org/get",egret.HttpMethod.GET);
        //     // request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        //     request.addEventListener(egret.Event.COMPLETE,(event:egret.Event)=>{
        //             let request = <egret.HttpRequest>event.currentTarget;
        //             console.log("IPdata : ",request.response);
        //             if(request.response){
        //                 this._IPaddress = JSON.parse(request.response)["origin"];
        //             }
        //         },this);
        //     request.send();
        // }catch(e){}
    }
	

    private _IPaddress = "";
    public get IPaddress(){
        return this._IPaddress;
    }

    public closeSocket(){
        this.socket.close();
    }
	
    public createSocket(_ip:string,_port:number,CBFun?:Function){
        // _ip = "120.24.36.18";
        // _port = 19999;
        this.ipAdd = _ip;
        this.port = _port;
        console.log("address=" + _ip);
        //创建 WebSocket 对象
        this.socket = new egret.WebSocket();
        //设置数据格式为二进制，默认为字符串
        this.socket.type = egret.WebSocket.TYPE_BINARY;
        //添加收到数据侦听，收到数据会调用此方法
        this.socket.addEventListener(egret.ProgressEvent.SOCKET_DATA,this.onReceiveMessage,this);
        //添加链接打开侦听，连接成功会调用此方法
        this.socket.addEventListener(egret.Event.CONNECT,this.onSocketOpen,this);
        //添加链接关闭侦听，手动关闭或者服务器关闭连接会调用此方法
        this.socket.addEventListener(egret.Event.CLOSE,this.onSocketClose,this);
        //添加异常侦听，出现异常会调用此方法
        this.socket.addEventListener(egret.IOErrorEvent.IO_ERROR,this.onSocketError,this);
        //连接服务器
        this.socket.connect(_ip,_port);

        this.isTimeout = false;
        this.timeOut = new egret.Timer(this.timeoutTime,1);  
        this.timeOut.addEventListener(egret.TimerEvent.TIMER,this.timeOutHandler,this);  
        this.timeOut.start(); 
        this.timeoutFun = null;
        this.timeoutFun = CBFun;
        
	}

    private timeOutHandler(){
        if(!this.isConnected){
            this.isTimeout = true;
            this.socket.close();
            KFControllerMgr.showTips(LocalizationMgr.getText("连接超时,是否重连?"),0,2,()=>{
                if(this.timeoutFun!=null){
                    this.timeoutFun();
                }
            },"提示",()=>{
                DeviceUtils.CloseGame();
            });
        }

        
        // this.timeoutFun();
    }

    private PackageMyMessage(mainID: number,msg: string,AssistantID: number): egret.ByteArray {
        var msgBytes = CommonFuc.AESEncrypt(msg,this.getServicePassWord());
        var body: egret.ByteArray = new egret.ByteArray();
        body.endian = egret.Endian.LITTLE_ENDIAN;
        body.writeInt(mainID);
        body.writeInt(25355);
        for(var i = 0 ;i<msgBytes.length;i++){
            body.writeByte(msgBytes[i]);
        }
        var byte: egret.ByteArray = new egret.ByteArray();
        byte.endian = egret.Endian.LITTLE_ENDIAN;
        var len = 4 + body.length;
        byte.writeInt(len);
        byte.writeBytes(body,0,len);
        return byte;
    }
    
    private UnzipMyMessage(byte: egret.ByteArray):MessageStruct{
        byte.endian = egret.Endian.LITTLE_ENDIAN;
        var len: number = byte.readInt();
        var mainID: number = byte.readInt();
        var AssistantID: number = byte.readInt();
        
        var data: egret.ByteArray = new egret.ByteArray();
        byte.readBytes(data,0,len-12);
        var data2 = CommonFuc.AESDecrypt(data,this.getServicePassWord());
        console.log("data : " + data2);
        
        var Unzipmsg = new MessageStruct();
        Unzipmsg.setMainID(mainID);
        Unzipmsg.setAssistantID(AssistantID);
        Unzipmsg.setDataStr(data2);
        return Unzipmsg;
    }
    
    private onSocketOpen(): void {
        if(!this.isTimeout){
             this.Connected = true;
            this.isclosed = false;
            console.log("onSocketOpen");
            this.timeOut.stop();
            this.timeoutFun = null;
        }
       
    }

    private onSocketClose(): void {
        this.isclosed = true;
        this.Connected = false;
        console.log("onSocketClose");
        GlobalClass.LoginClass.isFirstHeart = true;
        KFSceneManager.getInstance().replaceScene(SceneName.Awake);
        GameStartLogic.getInstance().StartConnect();
    }

    private onSocketError(): void {
        console.log("onSocketError");
        this.socket.close();
    }

    private onReceiveMessage(e: egret.Event): void {
        if(!this.isTimeout){
            console.log("onReceiveMessage");
            //创建 ByteArray 对象
            var byte: egret.ByteArray = new egret.ByteArray();
            //读取数据
            this.socket.readBytes(byte);
            var msg = this.UnzipMyMessage(byte);
            
            NetEventMgr.getInstance().messageRecive(msg);
        }
    }
    
    public isClose():boolean{
        return this.isclosed;
    }

    public isConnected():boolean{
        return this.Connected;
    }
    
    public SendOneceMsg(mainID: number,msg: string,AssistantID:number = 0){
        console.log("sendmsg id="+mainID);
        var byte: egret.ByteArray = this.PackageMyMessage(mainID,msg,AssistantID);
        byte.endian = egret.Endian.LITTLE_ENDIAN;
        byte.position = 0;
        //发送数据
        this.socket.writeBytes(byte,0,byte.length);
    }
	
}
