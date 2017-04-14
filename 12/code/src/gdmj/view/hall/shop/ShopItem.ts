/**
 * 商城物品项
 * @author chenwei
 *2016/07/15
 */
class ShopItem extends eui.ItemRenderer{
    
   public constructor(){
       super();
       this.touchChildren = false;
   }
    //......弃用........移动到BuyPanel
    private showBuy(){      
        
        //充值
        if(this.data.pay) {        
            
            var http = new HttpSender();
            let data = ProtocolHttp.send_z_Pay;
            data.param.goodsid = this.data.id;            
             //微信支付
            data.param.pay_type = 1;        

            http.send(data,this.wxPay,this);
        }else{
          //使用货币购买  
         let msgBox = App.MsgBoxManager.getBoxA();    
            
         if(this.data["price"] > App.DataCenter.UserInfo.httpUserInfo.coin){
          
             msgBox.ok = () => {
//                 App.mainModule.hallScene.shopPanel.selectShopView(ShopView.pay);

             }
             msgBox.showMsg("钻石数量不够了,是否前往购买");     
             
             return
         }
            
            
         msgBox.ok = () => {    
             //钻石购买
            // this.sendBuy();
         }         
         msgBox.showMsg("是否确认购买: " + this.data["name"]);     
            
        }
    }
    
    
    private wxPay(data) {
        if(!data.ret) {
             data=JSON.parse(data.data);    
             if(App.DeviceUtils.IsNative) {
                 egret.ExternalInterface.call("wxPay",JSON.stringify(data))
             }else{
                 window["onBridgeReady"](data.success_response);   
             }
                      
        } else {
            Tips.info(data.desc);
        }

    }


    

    
}
