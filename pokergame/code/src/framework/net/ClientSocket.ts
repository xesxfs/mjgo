/**
 * Socket管理类
 * @author chenwei
 * @date 2017/4/24
 * 
 * 1 连接socket
 * 2 注册回调
 * 3 断线重连
 */ 
class ClientSocket {
    public name:string = "";                 //socket名字，用于判断push和game

    private socket:egret.WebSocket;          //socket
    private callBackList = {};               //回调列表
    private objList = {};                    //执行对象列表

    private reconnecting:boolean = false;    //是否断线重连中，重连中时不派发连接错误事件
    private reconInvalTime:number = 3000;    //断线重连时间间隔
    private curReconnectCount:number = 0;    //当前断线重连次数
    private reconnenctLimit:number = 5;      //断线重连限制次数
    private bAllowReconnnect:boolean = false;//是否允许断线重连

    public protoBuffer:string = "";          //断线时，协议缓存
    public dataBuffer = null;                //断线时，数据缓存

    private url:string = "";                 //IP地址


  


    /**
     * 注册通讯回调
     * @param proto 协议
     * @param callBack 回调函数
     * @param thisObject 回调函数绑定对象
     */ 
    public register(proto: string,callBack: Function,thisObject) {
        this.callBackList[proto] = callBack;
        this.objList[proto] = thisObject;  
    }
    
    /**
     * 取消注册
     * @param proto 协议
     */ 
    public unRegister(proto:string){
        delete this.callBackList[proto];
        delete this.objList[proto];
    }

    /**
     * 开始连接socket
     * @url IP地址
     * @bAllowReconnnect 是否允许断线重连
     * @serverType  服务器类型
     */
    public startConnect(url: string, bAllowReconnnect:boolean = false): void {
        console.log("开始连接" + this.name  + ":" + url);
        this.url = url;
 
        this.bAllowReconnnect = bAllowReconnnect;
        this.createSocket();
        this.socket.connectByUrl(url);        
    }

    //创建socket; egret引擎bug，不重新创建socket就不派发事件。
    private createSocket(){
        if(this.socket){
            this.socket.removeEventListener(egret.Event.CONNECT, this.onConnect, this);         
            this.socket.removeEventListener(egret.Event.CLOSE,this.onClose,this);
            this.socket.removeEventListener(egret.IOErrorEvent.IO_ERROR,this.onError,this);
            this.socket.removeEventListener(egret.ProgressEvent.SOCKET_DATA,this.onRecieve,this);
            this.socket.connected && this.socket.close();
        }

        this.socket = new egret.WebSocket();
        this.socket.type = egret.WebSocket.TYPE_STRING;
        this.socket.addEventListener(egret.Event.CONNECT, this.onConnect, this);         
        this.socket.addEventListener(egret.Event.CLOSE,this.onClose,this);
        this.socket.addEventListener(egret.IOErrorEvent.IO_ERROR,this.onError,this);
        this.socket.addEventListener(egret.ProgressEvent.SOCKET_DATA,this.onRecieve,this);
    }
    
    //连接成功
    private onConnect(e:egret.Event):void {
        egret.log(this.name+ " connect success");
        this.resetReconnenct();
        App.EventManager.sendEvent(EventConst.SocketConnect, this); 
    }
    
    //连接关闭
    private onClose(e:egret.Event):void {
        egret.log(this.name + " close");
        
        //如果无重连动作，派发关闭事件,并重置重连
        if(this.bAllowReconnnect == false || (this.bAllowReconnnect && (this.curReconnectCount > this.reconnenctLimit))){
            this.resetReconnenct();
            App.EventManager.sendEvent(EventConst.SocketClose, this);
        }
    }

    //连接错误
    private onError(e:egret.IOErrorEvent):void {
        egret.log(this.name + " error");

        //如果无重连动作，则派发错误事件
        if(this.tryReconnect() == false){
            App.EventManager.sendEvent(EventConst.SocketIOError,this); 
        } 
    }

    /**
     * 尝试断线重连
     * @return 是否进行重连
     */
    private tryReconnect(){
        //不允许断线重连
        if(this.bAllowReconnnect == false){
            return false;
        }
        //断线重连
        this.curReconnectCount++;
        if(this.curReconnectCount <= this.reconnenctLimit){
            //如果第一次重连，则派发事件
            if(this.curReconnectCount == 1){
                App.EventManager.sendEvent(EventConst.StartReconnect,this);
            }
            //开始断线重连
            egret.setTimeout(this.startConnect,this,this.reconInvalTime,this.url,true);
            return true;
        }
        return false;
    }
    
    //主动关闭Socket，不派发事件
    public close():void{
        if(this.socket){
            this.socket.removeEventListener(egret.Event.CONNECT, this.onConnect, this);         
            this.socket.removeEventListener(egret.Event.CLOSE,this.onClose,this);
            this.socket.removeEventListener(egret.IOErrorEvent.IO_ERROR,this.onError,this);
            this.socket.removeEventListener(egret.ProgressEvent.SOCKET_DATA,this.onRecieve,this);
            this.socket.connected && this.socket.close();
        }
        this.resetReconnenct();
        this.dataBuffer = null;
        this.protoBuffer = null;
    }

    //重置重连
    private resetReconnenct(){
        this.reconnecting = false;
        this.curReconnectCount = 0;
    }
    
    /**是否已连接*/
    public isConnected(){
        if(this.socket && this.socket.connected){
            return true;
        }
        return false;
    }

    /**
     * 发送数据
     * @param data 待发送json数据
     * @param d1 协议号1
     * @param d2 协议号2
     */ 
    public send(data:any = {}){

        if(this.socket && this.socket.connected) {

            var sendJson = JSON.stringify(data)
            console.log("send:"+sendJson)
            this.socket.writeUTF(sendJson);
            this.socket.flush();
   
          
        } else {
            egret.log("socket is not connected");
            this.dataBuffer = data;//临时保存数据,在发送数据时断线，再重新发            
            App.EventManager.sendEvent(EventConst.SocketNotConnect,this);
            
        }
    }
    
    //接收数据
    private onRecieve(e: egret.ProgressEvent): void {
        var revData=this.socket.readUTF();
        console.log("rev:"+revData);     
        this.process(revData);   
    }

    /**
     * 解析数据
     * @param b 待解析数据
     */
    public process(b: string): void {
        var str =b;

        var data:Object;
        if("" != str) {
            data = JSON.parse(str);
        }
        if(!data.hasOwnProperty("cmd")){
            console.log("未知指令")
            return
        }
        var proto: string = "cmd"+data["cmd"];
        var callBack: Function = this.callBackList[proto];
        var thisObject = this.objList[proto];        
        if(callBack && thisObject) {
            callBack.call(thisObject,data);
        } else {
            console.log("不存在对应消息:",proto);
        }
    }
    
}

