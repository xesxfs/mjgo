/**
 *
 * @author 
 *
 */
class MessageStruct {
    private MainID:number = 0 ;
    
    private AssistantID:number = 0 ;
    
    private Data: egret.ByteArray ;
    
    private DataStr :string;
    
	public constructor() {
        this.Data = new egret.ByteArray();
	}
	
	public setMainID(id:number){
    	this.MainID = id;
	}
	
    public setAssistantID(id: number) {
        this.AssistantID = id;
    }
    
    public setData(mData: egret.ByteArray) {
        this.Data = mData; 
    }
    
    public setDataStr(str: string) {
        this.DataStr = str;
    }
    
    public getMainID() :number{
       return this.MainID ;
    }

    public getAssistantID(): number {
        return this.AssistantID ;
    }

    public getData(): egret.ByteArray {
        return this.Data;
    }
    
    public getDataStr(): string{
        return this.DataStr;
    }
}
