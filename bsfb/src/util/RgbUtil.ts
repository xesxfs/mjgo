class RgbUtil {

	public static getRed(color:number):number{
		return (color&0xFF0000)>>16
	}

	public static getGreen(color:number):number{
		return (color&0x00FF00)>>8;
	}

	public static getBlue(color:number):number{
		return (color&0x0000FF);
	}

	public static hexColor(r:number,g:number,b:number):number{
		if(this.invalidColor(r)&&this.invalidColor(g)&&this.invalidColor(b)){
			var hex=r<<16;
			hex +=g<<8;
			hex +=b;
			return hex
		}
		
		return 0;
	}

	public static invalidColor(rgb:number):boolean{
		return (rgb>=0&&rgb<=255);
	}

}