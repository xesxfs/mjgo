/**
 *
 * @author 
 *
 */
class NetEventMgr extends egret.EventDispatcher {
    
    
    private static instance: NetEventMgr;
    public static getInstance(): NetEventMgr {
        if(this.instance == null) {
            this.instance = new NetEventMgr();
        }
        return this.instance;
    }
    
    public messageRecive(msg:MessageStruct){
        console.log("messageRecive id=" + msg.getMainID()+" data="+msg.getDataStr());
        var eventName = msg.getMainID() + "_event";
        this.dispatchEventWith(eventName,true,msg);
    }

    public clientMsg(msgid:number,data:string){
        console.log("clientmsg id=" +msgid+" data="+data);
        var eventName = msgid + "_event";
        this.dispatchEventWith(eventName,true,data);
    }
}
