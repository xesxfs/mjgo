
declare module CryptoJS{

	var  enc :{
		 Utf8:{
			 parse(p:any):any
		}

		Base64:{
			parse(p:any):any
			stringify(p:any):any
		}

		Hex:{
			parse(p:any):any
		}
	}

  var AES:{
	  encrypt(plaintext:any,key:any,mode:any):any
	  decrypt(plaintext:any,key:any,mode:any):any	  
	}

	var DES:{
	  encrypt(plaintext:any,key:any,mode:any):any
	  decrypt(plaintext:any,key:any,mode:any):any	  
	}

 var pad:{
	 Pkcs7:any
 }

 var mode:{
	 ECB:any
 }

}

