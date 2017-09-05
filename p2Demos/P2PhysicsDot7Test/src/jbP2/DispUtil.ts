
module jbP2{

    export class DispUtil{
       
        /**
         * 创建一个位图
         * 返回的图形锚点位于图形中心
         */
        public static createBitmapByName(name:string):egret.Bitmap {
            var result:egret.Bitmap = new egret.Bitmap();
            var texture: egret.Texture = RES.getRes(name);
            result.texture = texture;
            result.anchorOffsetX = result.width * 0.5;
            result.anchorOffsetY = result.height * 0.5;
            return result;
        }
        
        /**
        * 创建一个圆形
        * 返回的图形锚点位于图形中心
        */
        public static createBall(r: number): egret.Shape {
            var shape = new egret.Shape();
            shape.graphics.lineStyle(1,0);
            shape.graphics.beginFill(0xfff000);
            shape.graphics.drawCircle(r, r, r);
            shape.graphics.moveTo(r,r);
            shape.graphics.lineTo(2*r,r);
            shape.graphics.endFill();
            //将显示对象的锚点移到中心位置
            shape.anchorOffsetX = shape.width / 2;
            shape.anchorOffsetY = shape.height / 2;
            return shape;
        }
        /**
        * 创建一个方形
        * 返回的图形锚点位于图形中心
        */
        public static createBox(width:number,height:number): egret.Shape {
            console.log("createBox "+width+","+height);
            var shape = new egret.Shape();
            shape.graphics.lineStyle(1,0);
            shape.graphics.beginFill(0xfff000);
            shape.graphics.drawRect(0,0,width,height);
            shape.graphics.endFill();
            //将显示对象的锚点移到中心位置
            shape.anchorOffsetX = shape.width / 2;
            shape.anchorOffsetY = shape.height / 2;
            return shape;
        }
        
        /**
         * 创建一个胶囊形
         * @param length
         * @param radius
         */
        public static createCapsule(length:number,radius:number):egret.Shape{
            console.log("createCapsule len:" + length + ",radius:" + radius);
            var shape = new egret.Shape();
            shape.graphics.lineStyle(1,0);
            shape.graphics.beginFill(0xfff000);
            shape.graphics.drawRect(0,0,length,radius*2);
            shape.graphics.endFill();
            
            shape.graphics.beginFill(0xfff000);
            shape.graphics.drawCircle(0,radius,radius);
            shape.graphics.endFill();
            
            shape.graphics.beginFill(0xfff000);
            shape.graphics.drawCircle(length,radius,radius);
            shape.graphics.endFill();
            
            //将显示对象的锚点移到中心位置
            shape.anchorOffsetX = (length) / 2;
            shape.anchorOffsetY = shape.height / 2;
            return shape;
        }
        
        /**
         * 创建一个可以点击的文本，当作按钮用
         */ 
        public static createTouchTf(px:number,py:number,pwid:number,phei:number,text:string):egret.TextField{
            var tf: egret.TextField = new egret.TextField();
            tf.width = pwid;
            tf.height = phei;
            tf.x = px;
            tf.y = py;
            tf.size = 16;
            tf.text = text;
            tf.touchEnabled = true;
            return tf;
        }
    }

}