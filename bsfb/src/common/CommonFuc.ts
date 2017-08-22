/**
 *
 * @author 
 *
 */
class CommonFuc {
	public constructor() {
	}
	
	public static AESEncryptBase64(toEncrypt:string,key:string){
        return  CommonFuc._AESEncryptBase64(toEncrypt,key);
	}
	

    public static AESDecryptBase64(word,pwd) {
        return CommonFuc._AESDecryptBase64(word,pwd);
    }
    
    public static _base64ToArrayBuffer(base64) {
        var binary_string =  this.Base64Decode(base64);
        var len = binary_string.length;
        var bytes = new Uint8Array( len );
        for (var i = 0; i < len; i++)        {
            bytes[i] = binary_string.charCodeAt(i);
        }
        return bytes;
    }
    
    public static AESEncrypt(toEncrypt: string,key: string) {
        var base64:string = CommonFuc._AESEncrypt(toEncrypt,key);
        return CommonFuc._base64ToArrayBuffer(base64);
    }


    public static AESDecrypt(word,pwd) {

        var base64: string = this.Base64Encode(String.fromCharCode.apply(null,new Uint8Array(word.buffer)));
        return CommonFuc._AESDecrypt(base64,pwd);
    }
	
	public static Base64Encode(origin:string):string{
       return new Base64().encode(origin);
	}
	
    public static Base64Decode(origin: string): string {
        return new Base64().decode(origin);
    }

    public static removeElementAtIndex(n:number,arr:Array<any>):Array<any>{
       return arr.slice(0,n).concat(arr.slice(n+1,arr.length));
    }

    public static getDateTrick():number{
        var timestamp1 = Math.floor(new Date().getTime()/1000);
        return (62135625600 + timestamp1) *10000000 + Math.floor(Math.random() * 10000000);
    }

    public static getDateString(oriStr:string):string{
        var a = Number(oriStr);
        a = (Math.floor(a/10000000) - 62135625600)*1000 + Math.floor(Math.random() * 1000);
        var date= new Date(a);
        var month = CommonFuc.formatStr(date.getMonth()+1+"");
        var day = CommonFuc.formatStr(date.getDate());
        // var b = new Date(a).toLocaleTimeString();
        // var c = new Date(a).toLocaleDateString();
        // var d = new Date(a).toLocaleString();
        // var dateArr = c.split("-");
        // var month = CommonFuc.formatStr(dateArr[1]);
        // var day = CommonFuc.formatStr(dateArr[2]);
        var hours = CommonFuc.formatStr(date.getHours()+"");
        var minutes = CommonFuc.formatStr(date.getMinutes()+"");
        var seconds = CommonFuc.formatStr(date.getSeconds()+"");
        var d = month+"月"+day+"日 "+hours+":"+minutes+":"+seconds;
        return d;
    }

    public static formatStr(oriStr){
        return oriStr.length==2?oriStr:("0"+oriStr);
    }

    public static _AESEncryptBase64(plaintext,pwd){

	    	var key = CryptoJS.enc.Utf8.parse(pwd);
	    	var encryptedData = CryptoJS.AES.encrypt(plaintext, key, {
	    	mode: CryptoJS.mode.ECB,
	    	padding: CryptoJS.pad.Pkcs7
	    	});
	    	var encryptedBase64Str = encryptedData.toString();
    		return encryptedBase64Str;
    	}

    public static _AESDecryptBase64(encryptedStr,pwd){
    		var key = CryptoJS.enc.Utf8.parse(pwd);
    		var Base64Str = CryptoJS.enc.Base64.parse(encryptedStr).toString();
    		var encryptedHexStr = CryptoJS.enc.Hex.parse(Base64Str);
    		var encryptedBase64Str = CryptoJS.enc.Base64.stringify(encryptedHexStr);
	    	var decryptedData = CryptoJS.AES.decrypt(encryptedBase64Str, key, {
	    	mode: CryptoJS.mode.ECB,
	    	padding: CryptoJS.pad.Pkcs7
	    	});
	    	var decryptedStr = decryptedData.toString(CryptoJS.enc.Utf8);
    		return decryptedStr;
    	}
    	
    public static _AESEncrypt(plaintext,pwd){
    	var key = CryptoJS.enc.Utf8.parse(pwd);
    	var encryptedData = CryptoJS.AES.encrypt(plaintext, key, {
    	mode: CryptoJS.mode.ECB,
    	padding: CryptoJS.pad.Pkcs7
    	});
    	var encryptedStr = encryptedData.toString();
    	return encryptedStr;
    	}
    	
    public static _AESDecrypt(encryptedStr,pwd){
	  	var key = CryptoJS.enc.Utf8.parse(pwd);
    	var decryptedData = CryptoJS.AES.decrypt(encryptedStr, key, {
    	mode: CryptoJS.mode.ECB,
    	padding: CryptoJS.pad.Pkcs7
    	});
    	var decryptedStr = decryptedData.toString(CryptoJS.enc.Utf8);
    	return decryptedStr;
    	}
    	
    public static encryptByDES(message, key) {
    	var keyHex = CryptoJS.enc.Utf8.parse(key);
    	var encrypted = CryptoJS.DES.encrypt(message, keyHex, {
    	mode: CryptoJS.mode.ECB,
    	padding: CryptoJS.pad.Pkcs7
    	});
    	//return  encrypted.ciphertext.toString();
    	return encrypted.toString();
    	}
    	
    public static decryptByDES(ciphertext, key) {
    	var keyHex = CryptoJS.enc.Utf8.parse(key);
    	// direct decrypt ciphertext
    	var decrypted = CryptoJS.DES.decrypt({
    	ciphertext: CryptoJS.enc.Base64.parse(ciphertext)
    	}, keyHex, {
    	mode: CryptoJS.mode.ECB,
    	padding: CryptoJS.pad.Pkcs7
    	});
    	return decrypted.toString(CryptoJS.enc.Utf8);
    	}


    public static stringDivide(ori:string):string{
        var f = ori.replace(/\d{1,3}(?=(\d{3})+$)/g, '$&,');
        return f;
    }

    public static getUTF8StrLen(str:string):number{
        var l = str.length;
        var blen = 0;
        for(var i=0; i<l; i++) {
            if ((str.charCodeAt(i) & 0xff00) != 0) {
                blen ++;
            }
            blen ++;
        }
        return blen;
    }

    //判断是否带有中文
    public static  isChn(str):boolean{  
        var reg=/^[\u4E00-\u9FA5]+$/;  
        if(!reg.test(str)){  
            return false;  
        }  
            return true;  
    }

    //判断是否为纯数字
    public static isAllint(str):boolean{
        var reg=/[\D\s]/;
        if(reg.exec(str)){
        //  alert('还有非数字');
            return false;
        }
        else{
            // alert('您输入的是纯数字');
            return true;
        } 
    }

    //判断是否包含子字符串
    public static strContains(str, substr) {
        return str.indexOf(substr) >= 0;
    }

     public static getDate(oristr:string):string{
        var arr = oristr.replace(".","");
        var del = 13 - arr.length;
        for(let i = 0;i<del;i++){
            arr+="0";
        }
        var date = new Date(Number(arr));
        var arr1 = date.toLocaleDateString().split("/");
        var month = arr1[1].length==2?arr1[1]:"0"+arr1[1];
        var day = arr1[2].length==2?arr1[2]:"0"+arr1[2];
        var hours = date.getHours()>=10?date.getHours():"0"+date.getHours();
        var minutes = date.getMinutes()>=10?date.getMinutes():"0"+date.getMinutes();
        var re = arr1[0]+"-"+month+"-"+day+" "+hours+":"+minutes;
        return re;
    }

    public static checkePhone(phone):boolean{
        var regex = /^(((13[0-9]{1})|(14[0-9]{1})|(17[0]{1})|(15[0-3]{1})|(15[5-9]{1})|(18[0-9]{1}))+\d{8})$/; 
         if (regex.test(phone)) { 
                return true;
            } else { 
            return false;
            }
    }

    //将16进制颜色值转为float
    public static hexColorToFloat(colorHex):any{
        var a = colorHex& 0xff;
        var b = (colorHex>>8)& 0xff;
        var g = (colorHex>>16)& 0xff;
        var r = (colorHex>>24)& 0xff;
        return [r/255,g/255,b/255,a/255];
    }

    public static imgFilterHex(img,colorHex){
        var arr = CommonFuc.hexColorToFloat(colorHex);
         var colorMatrix = [
            arr[0],0,0,0,0, 
            0,arr[1],0,0,0,
            0,0,arr[2],0,0,
            0,0,0,arr[3],0
        ];
         var colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
        img.filters = [colorFlilter];
    }

    public static imgFilterFloat(img,percent){
         var colorMatrix = [
            percent[0],0,0,0,0, 
            0,percent[1],0,0,0,
            0,0,percent[2],0,0,
            0,0,0,percent[3],0
        ];
         var colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
        img.filters = [colorFlilter];
    }

    private static getFirstColor(str:string):string{
        if(str[0]=="["&&str[7]=="]"){
            var substr = "0x"+str.substr(1,6);
            var a = Number(substr);
            if(Number(substr)){
                return substr;
            }
        }
        return "null";
    }

    private static checkIsColorBlockEnd(str:string):boolean{
        if(str[0]=="["&&str[1]=="-"&&str[2]=="]"){
            return true;
        }
        return false;
    }

    //找到第一个颜色值开始标记
    public static getFirstColorBlockStart(str:string):number{
        for(var i = 0;i<str.length;i++){
            if(str[i]=="["&&i<=str.length-8){
                if(CommonFuc.getFirstColor(str.substr(i,8))!="null"){
                    return i;
                }
            }
        }
        return -1;
    }
    //找到最后一个颜色值结束标记
    public static getFirstColorBlockEnd(str:string):number{
         for(var i = 0;i<str.length;i++){
            if(str[i]=="["&&i<=str.length-3){
                if(CommonFuc.checkIsColorBlockEnd(str.substr(i,3))){
                    return i;
                }
            }
        }
        return -1;
    }   
    //找到最后一个颜色值结束标记
    public static getLastColorBlockEnd(str:string):number{
        for(var i = str.length-1;i>=0;i--){
            if(str[i]=="]"&&i>=2){
                if(CommonFuc.checkIsColorBlockEnd(str.substr(i-2,3))){
                    return i;
                }
            }
        }
        return -1;
    }   

    public static parseColorText(str,defaultColoar="0xffffff"):Array<egret.ITextElement>{
        var cdata = [];
        var colorArr = [];
        colorArr.push(defaultColoar);
        CommonFuc.parseString(str,cdata,colorArr);
        let contextFlow:Array<egret.ITextElement>=new Array<egret.ITextElement>();
		for(let i=0;i<cdata.length;i++){
			let textElement ={text:cdata[i].v,style:{"textColor":cdata[i].c}}
			contextFlow.push(textElement);
			}
        return contextFlow;
    }
    public static parseString(str,datalist,colorArr){
        if(str.length>0){
            var subStr;
            var startIndex = CommonFuc.getFirstColorBlockStart(str);
            var endIndex = CommonFuc.getFirstColorBlockEnd(str);
            if(startIndex==-1&&endIndex==-1){
                let ckey = colorArr.pop();
                let co=new Object();
                co["c"] = ckey;
                co["v"] = str;
                datalist.push(co);
                return;
            }
            if(startIndex!=-1&&startIndex<endIndex){//先发现开始标志
                if(startIndex>0){
                    let value = str.substr(0,startIndex);
                    let ckey = colorArr[colorArr.length-1];
                    let co=new Object();
                    co["c"] = ckey;
                    co["v"] = value
                    datalist.push(co);
                }
                
                var newColor = CommonFuc.getFirstColor(str.substr(startIndex,8));
                if(newColor!="null"){
                    colorArr.push(newColor);
                }
                subStr = str.substr(startIndex+8,str.length-startIndex-8);
            }else{
                if(endIndex>0){
                    let value = str.substr(0,endIndex);
                    let ckey = colorArr.pop();
                    let co=new Object();
                    co["c"] = ckey;
                    co["v"] = value;
                    datalist.push(co);
                }
                 subStr = str.substr(endIndex+3,str.length-endIndex-3);
            } 
            if(subStr!=""){
                CommonFuc.parseString(subStr,datalist,colorArr);
            }
        }
    }

     private static readValues(str: string):string{
            if(str.length > 0) {
                for(let i = 0;i < str.length;i++) {
                    if(str[i] == '[') {
                        let value = str.substr(0,i);
                        return value;
                    };
                }
            }

            return null;
        }
    //将16进制颜色值混合 只包含RGB
    public static hexColorMix(SrcColor,desColor,srcRatio = 0.5,desRatio=0.5):any{
        var b = SrcColor& 0xff;
        var g = (SrcColor>>8)& 0xff;
        var r = (SrcColor>>16)& 0xff;
        var b2 = desColor& 0xff;
        var g2 = (desColor>>8)& 0xff;
        var r2 = (desColor>>16)& 0xff;

        var b3 = r*srcRatio+r2*desRatio;
        var g3 = g*srcRatio+g2*desRatio;
        var r3 = b*srcRatio+b2*desRatio;
        
        var a = r3<<16;
        var b = g3<<8;
    
        // return [r*srcRatio+r2*desRatio,g*srcRatio+g2*desRatio,b*srcRatio+b2*desRatio];
        return a+b+b3;
    }

    public static AddClickEvent(obj:any,event:string,fun:Function,thisObj:any,codeDown:number=0.5,needSound=true,useCapture?: boolean, priority?: number){
        

         if(obj instanceof eui.Button){//按钮特效
                if(event==egret.TouchEvent.TOUCH_END||event==egret.TouchEvent.TOUCH_TAP){
                    obj.addEventListener(egret.TouchEvent.TOUCH_BEGIN,(event:egret.Event)=>{
                        if(needSound){
                        SoundMgr.Instance.playEffect(SoundMgr.buttonEffect);
                        }
                        CommonFuc.butFade(obj,0.7);
                    },thisObj,useCapture,priority);

                    obj.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE,(event:egret.Event)=>{
                        CommonFuc.butBright(obj);
                    },thisObj,useCapture,priority);
                }else if(event==egret.TouchEvent.CHANGE){
                     obj.addEventListener(egret.TouchEvent.TOUCH_BEGIN,(event:egret.Event)=>{
                        if(needSound){
                        SoundMgr.Instance.playEffect(SoundMgr.chooseEffect);
                        }
                    },thisObj,useCapture,priority);
                }
                obj.addEventListener(mouse.MouseEvent.MOUSE_OVER, (e: egret.TouchEvent)=>{
                    if(e.target==obj){
                        CommonFuc.butFade(obj,0.8);
                    }
                }, thisObj);
                obj.addEventListener(mouse.MouseEvent.MOUSE_OUT, ()=>{
                    if(obj.currentState=="up"){
                        CommonFuc.butBright(obj);
                    }
                }, thisObj);
         }
        

        obj.addEventListener(event,(event:egret.Event)=>{
            if(obj instanceof eui.Button){
                CommonFuc.butBright(obj);
            }
            fun.call(thisObj,event);
            if(codeDown!=0){
                obj.touchEnabled =false;
                var mTimer = new egret.Timer(codeDown*1000,1);
                mTimer.addEventListener(egret.TimerEvent.TIMER_COMPLETE,function(){
                     obj.touchEnabled =true;
                },thisObj);
                mTimer.start();
            }
        },thisObj,useCapture,priority);
    }

    private static butFade(obj,percent){
        CommonFuc.imgFilterFloat(obj.getChildAt(0),[percent,percent,percent,1]);
    }

    public static butBright(obj){
         var image: eui.Image = <eui.Image>obj.getChildAt(0);
         var colorMatrix = [
            1,0,0,0,0, 
            0,1,0,0,0,
            0,0,1,0,0,
            0,0,0,1,0
        ];

        var colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
        image.filters = [colorFlilter];
    }

    //截取字符串，包括中文
    public static subString(str, len, hasDot)  
    {  
        if(str==null) return "";
        var newLength = 0;  
        var newStr = "";  
        var chineseRegex = /[^\x00-\xff]/g;  
        var singleChar = "";  
        var strLength = str.replace(chineseRegex,"**").length;  
        for(var i = 0;i < strLength;i++)  
        {  
            singleChar = str.charAt(i).toString();  
            if(singleChar.match(chineseRegex) != null)  
            {  
                newLength += 2;  
            }      
            else  
            {  
                newLength++;  
            }  
            if(newLength > len)  
            {  
                break;  
            }  
            newStr += singleChar;  
        }  

        if(hasDot && strLength > len)  
        {  
            newStr += "...";  
        }  
        return newStr;  
    }
}
