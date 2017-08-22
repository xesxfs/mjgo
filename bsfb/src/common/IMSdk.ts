// TypeScript file
module  IM{
  var sendCall:Function= window["postMessage"]
//IM账号
var RevAccount={
    data:{
        phone:"",        //手机号码
        passwrod:"",    //密码
        deviceId:"",    //设备ID
        game_id:""      //游戏ID
    }
}
//关闭游戏
var SendCloseGame={
    event:"closeGame",
    data:{}
}
//分享类型
var   ShareType ={
    IM:"PJStare",    //IM 朋际
    QQ:"QQStare",   //QQ
    WX:"WXStare",   //微信
    WXLine:"FSStare"//微信朋友圈
}
//分享数据
var sendShare={
    data:{    
    stare:{
        type:"",
        gameID:"",
        titile:"",
        content:""
    }
  }
}

//支付类型
var PayType={
    IM:"IMPay",
    WX:"WXPay",
    Ali:"Alipay"
}

//支付数据
var sendPay={
    data:{    
        pay:{
            type:"",
            gameID:"",
            but_money:"",
            money:"",
            id:""
        }
    }
}
//开始录音
var sendStartRecord={
    event:"startRecord",
    data:{}
}
//停止录音
var sendStopRcord={
    event:"startRecord",
    data:{}
}

//获取IM账号   data:{'phone':'15818543240','passwrod':'eyanlong','deviceId':'123456','game_id':'10001'}
    export function getAccount(){
       if(window&& window['auth']){
            var data = window['auth'];
            alert(data);
            var accountObj= RevAccount;
            accountObj=JSON.parse(data)
        return accountObj;
       }
       alert("window.auth is null");
        return null;
    }

   export function closeGame(){   
      sendCall(JSON.stringify(SendCloseGame));
   } 

   export function share(){    
      sendCall(JSON.stringify(sendShare));
   }

   export function pay(){     
      sendCall(JSON.stringify(sendPay));

   }

   export function startRecord(){
    
      sendCall(JSON.stringify(sendStartRecord));

   }

   export function stopRecord(){     
      sendCall(JSON.stringify(sendStopRcord));
   }


} 