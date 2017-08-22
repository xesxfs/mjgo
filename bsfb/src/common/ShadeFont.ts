class ShadeFont extends SingleClass {
	public constructor() {
		super();
	}
	public static get Instance() :ShadeFont{
		return this.getInstance();
	}
	//是否开启渐变字
	public  openShade:boolean=true; 

   //渐变颜色配置,key必须和对象的name属性对应
	public  ShadeConfig ={
		YellowColor:{start:0xFFEEDC,end:0xFFCD00},
		OrangeColor:{start:0xFFDDAA,end:0xFFB100},
		WhiteYellowColor:{start:0xFFFDD5,end:0xFFD056},
		YellowWhiteColor:{start:0xFFFF00,end:0xFFFF96},
		brownColor:{start:0xF69935,end:0xCC6C06},
		LevelColor:{start:0xD7CB4B,end:0xE6AD18},
		titleColor:{start:0xFFE04C,end:0xF4963A},
		buttonColor:{start:0xFFFFFF,end:0xFFE3C1},
		buttonGrayColor:{start:0xFFFFFF,end:0xF0AA0A},
		buttonYellowWhiteColor:{start:0xFFFFFF,end:0xD9C441},
		greenYellowColor:{start:0x16C300,end:0xFFF467},
		WhitepinkColor:{start:0xF4F4E9,end:0xFFA641},
		pinkOrangeColor:{start:0xFFC883,end:0xEA8818},
		yellowOrangeColor:{start:0xFFF69D,end:0xFF9B50},
		redPinkColor:{start:0xFA8484,end:0xFF002F},
		pinkwhiteColor:{start:0xFFFFFF,end:0xFFE3A8},
	}

	public setShadeFont(econtain:egret.DisplayObjectContainer){
		if(!this.openShade)return;
		var conunt= econtain.numChildren;
		for(let i=0;i<conunt;i++){
		  var child=econtain.getChildAt(i)
		  if(child instanceof egret.DisplayObjectContainer){
			  this.setShadeFont(child)			  
		  }else if(child instanceof eui.Label){
			  child.fontFamily = "unity";
			  if(!this.ShadeConfig[child.name])continue;
			  this.setShade(child,child.name);
		  }
		}
	}

	public setBrokeFont(econtain:egret.DisplayObjectContainer){
		var conunt= econtain.numChildren;
		for(let i=0;i<conunt;i++){
		  var child=econtain.getChildAt(i)
		  if(child instanceof egret.DisplayObjectContainer){
			  this.setBrokeFont(child);	  
		  }else if(child instanceof eui.Label){
			  child.fontFamily = "SimHei";
			  child.stroke = 0;
			//   child.cacheAsBitmap = true;
		  }
		}
	}

	public setShade(eboj,colorKey:string,stroke=false){	
		if(!this.openShade)return;
		var shadeColor = this.ShadeConfig[colorKey];
		// CommonFuc.CommonFuc.hexColorMix([0xFFFFFF],[0xFC9D36])
		let sc=shadeColor.start;
		let ec=shadeColor.end;
		// let sc = CommonFuc.hexColorMix(shadeColor.start,eboj.textColor,0.9,0.1);
		// let ec = CommonFuc.hexColorMix(shadeColor.end,eboj.textColor,0.9,0.1);

		//由于 beginGradientFill 在原生中调用出错，先用testCreateShade,等待官方修复Bug
		// var shadeMask = this.createShade(eboj.width,eboj.height,sc,ec);
		var shadeMask = this.testCreateShade(eboj.width,eboj.height,sc,ec);
		
		shadeMask.mask = eboj;
		eboj.parent.addChild(shadeMask);
		shadeMask.x = eboj.x;
		shadeMask.y = eboj.y;
		shadeMask.touchEnabled = false;
		if(eboj.stroke!=0||stroke){
			shadeMask.filters = [new egret.GlowFilter(0x2B2323,1,2,2)];
		}
		eboj.stroke = 0;
		// shadeMask.cacheAsBitmap = true;

		//监听原来label的visible，然后随着之前labelvisible的变化而变化
		eui.Binding.bindHandler(eboj, ["visible"], (value)=>{
			shadeMask.visible = value;
		}, eboj);
	}

	public createShade(width:number,height:number,sc:number,ec:number):egret.Shape{
		var shape = new egret.Shape();
		var colors=[sc, ec];//设置颜色数组  
        var alphas=[1, 1];//透明度数组  
        var ratios=[0x00,0xff];//偏移量，数组  
		var matrix:egret.Matrix=new egret.Matrix();  
        matrix.createGradientBox(width,height,1.56);  
		
		shape.graphics.lineStyle();  
    	shape.graphics.beginGradientFill(egret.GradientType.LINEAR,colors,alphas,ratios,matrix);
		  
        shape.graphics.drawRect(0,0,width,height);
        shape.graphics.endFill();
		
		return shape; 
	}



	public testCreateShade(width:number,height:number,sc:number,ec:number):egret.Shape{
		var shape = new egret.Shape();
		// console.log(" s:",sc," e:",ec,)
		var sr= RgbUtil.getRed(sc);
		var sg= RgbUtil.getGreen(sc);
		var sb= RgbUtil.getBlue(sc);
		// console.log(" r:",sr," g:",sg," b:",sb)

		var er= RgbUtil.getRed(ec);
		var eg= RgbUtil.getGreen(ec);
		var eb= RgbUtil.getBlue(ec);

		// console.log(" r:",er," g:",eg," b:",eb)

		var r = (er-sr)/height;
		var g = (eg-sg)/height;
		var b = (eb -sb)/height;
		// console.log(" r:",r," g:",g," b:",b)

		var graphics = shape.graphics;

		for (let i=0;i<height;i++){		
			var r3 = sr+i*r;
			var g3 = sg+i*g;
			var b3 = sb+i*b;
			// console.log(" r:",r3," g:",g3," b:",b3)
			var hexColor=RgbUtil.hexColor(r3,g3,b3);
			// console.log("hex: ",hexColor);
			graphics.lineStyle(1,hexColor);
			graphics.moveTo(0,i);
			graphics.lineTo(width,i);
			graphics.endFill();
		}

		return shape;
	}

}
