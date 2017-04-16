/**
 * @author chenwei
 */

enum BagView{
    props,
    act,
    face,
    scene
}

class BagPanel extends BasePanel{
	public constructor() {
    	super();
        this.skinName ="BagPanelSkin";
	}
    private typeView:eui.ViewStack;
    private propsType:eui.RadioButton;
    private closeBtn:eui.Button;
    private viewIndex:BagView;
    
    private propsList:eui.List;
    private actList:eui.List;
    private faceList:eui.List;
    private sceneList:eui.List;
    
    
	protected onEnable(){
    	this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.hide,this);
    	this.propsType.group.addEventListener(eui.UIEvent.CHANGE,this.onChangeType,this);
    	this.setCenter();
        this.getProps();
        this.getFace();
        this.getAct();
        this.getScene();
	}
	
	private getProps(){	    
        var http = new HttpSender();
        var data = ProtocolHttp.send_z_bag;
        data.param.type=1;
        http.send(data,this.setProps,this);
	}	
	
    private getFace() {
        var http = new HttpSender();
        var data = ProtocolHttp.send_z_bag;
        data.param.type = 3;
        http.send(data,this.setFace,this);
    }	
    
    private getAct() {
        var http = new HttpSender();
        var data = ProtocolHttp.send_z_bag;
        data.param.type = 4;
        http.send(data,this.setAct,this);
    }	
    
    private getScene() {
        var http = new HttpSender();
        var data = ProtocolHttp.send_z_bag;
        data.param.type = 5;
        http.send(data,this.setScene,this);
    }	
	
    private setProps(data){       
        
        if(!data.ret) {   
            let ac = new eui.ArrayCollection();
            var rList = data;
            let arr = [];
            if(rList.data)
            for(let i = 0;i < rList.data.length;i++) {
                let rObj = rList.data[i];
                let dataObj = new Object();                                
                dataObj["uid"] = rObj["uid"] ;
                dataObj["type"] = "props";
                dataObj["propname"] = rObj["propname"];
                dataObj["count"] = rObj["count"];
                dataObj["propid"] = rObj["propid"]; 
                dataObj["desc"] = rObj["count"]+"个";
                dataObj["state"] = "unuse";
                dataObj["icon"] = ItemIcon.getIcon4Name(dataObj["propname"]);
                arr.push(dataObj); 
            }            
            ac.source = arr;
          
            this.propsList.dataProvider = ac;
            
        } else {
            Tips.info(data.desc);
        }

	}
	
    private setAct(data) {
        if(!data.ret) {
            let ac = new eui.ArrayCollection();
            var rList = data;
            let arr = [];
            for(let i = 0;i < rList.data.length;i++) {
                let rObj = rList.data[i];
                let dataObj = new Object();
                dataObj["uid"] = rObj["uid"];
                dataObj["type"]="act";
                dataObj["propname"] = rObj["propname"];
                dataObj["count"] = rObj["count"];
                dataObj["propid"] = rObj["propid"];
                if(parseInt(rObj["count"])<0){
                    dataObj["desc"] = "永久";
                }else{
                    dataObj["desc"] = rObj["count"] + "天";
                }
               
                dataObj["state"]="unuse";
                dataObj["icon"] = ItemIcon.getIcon4Name(dataObj["propname"]);
                arr.push(dataObj);
            }           
            ac.source = arr;
            this.actList.dataProvider = ac;
            this.actList.selectedIndex = 0;
        } else {
            Tips.info(data.desc);
        }
    }
    
    private setFace(data) {
        if(!data.ret) {
            let ac = new eui.ArrayCollection();
            var rList = data;
            let arr = [];
            for(let i = 0;i < rList.data.length;i++) {
                let rObj = rList.data[i];
                let dataObj = new Object();
                dataObj["uid"] = rObj["uid"];
                dataObj["type"] = "face";
                dataObj["propname"] = rObj["propname"];
                dataObj["count"] = rObj["count"];
                dataObj["propid"] = rObj["propid"];
                if(parseInt(rObj["count"]) < 0) {
                    dataObj["desc"] = "永久";
                } else {
                    dataObj["desc"] = rObj["count"] + "天";
                }
                dataObj["state"] = "unuse";
                dataObj["icon"] = ItemIcon.getIcon4Name(dataObj["propname"]);
                arr.push(dataObj);
            }
            arr[0]["state"] = "using";
            ac.source = arr;
            this.faceList.dataProvider = ac;
            this.faceList.selectedIndex = 0;
        } else {
            Tips.info(data.desc);
        }
    }
    
    private setScene(data) {
        if(!data.ret) {
            let ac = new eui.ArrayCollection();
            var rList = data;
            let arr = [];
            for(let i = 0;i < rList.data.length;i++) {
                let rObj = rList.data[i];
                let dataObj = new Object();
                dataObj["uid"] = rObj["uid"];
                dataObj["type"] = "scene";
                dataObj["propname"] = rObj["propname"];
                dataObj["count"] = rObj["count"];
                dataObj["propid"] = rObj["propid"];
                if(parseInt(rObj["count"]) < 0) {
                    dataObj["desc"] = "永久";
                } else {
                    dataObj["desc"] = rObj["count"] + "天";
                }
                dataObj["state"] = "unuse";
                dataObj["icon"] = ItemIcon.getIcon4Name(dataObj["propname"]);
                arr.push(dataObj);
            }
            arr[0]["state"]="using";
            ac.source = arr;
            this.sceneList.dataProvider = ac;
            this.sceneList.selectedIndex = 0;
        } else {
            Tips.info(data.desc);
        }
    }
	
	public setView(viewIndex:BagView){
	    this.viewIndex=viewIndex;
	}
	
    private onChangeType(evt: eui.UIEvent) {
        var radioGroup: eui.RadioButtonGroup = evt.target;
        this.typeView.selectedIndex = radioGroup.selectedValue;
    }
    
    protected onRemove(){
        this.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.hide,this);
        this.propsType.group.removeEventListener(eui.UIEvent.CHANGE,this.onChangeType,this);
    }
}
