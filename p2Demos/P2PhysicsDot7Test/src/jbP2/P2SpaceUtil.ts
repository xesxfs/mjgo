/**
 * p2物理引擎工具类
 */ 
module jbP2 {
    export class P2Space {
        private static  factor:number;
        private static  worldRect:egret.Rectangle;
        
        
        private static yAxis = p2.vec2.fromValues(0,1);//p2 y轴
        
        public static checkIfCanJump( world:p2.World, body:p2.Body ):boolean{
            var result = false;
            for(var i=0; i<world.narrowphase.contactEquations.length; i++){
                var c = world.narrowphase.contactEquations[i];
                if(c.bodyA === body || c.bodyB === body){
                    var d = p2.vec2.dot(c.normalA, this.yAxis); // Normal dot Y-axis
                    if(c.bodyA === body) d *= -1;
                    if(d > 0.5) result = true;
                }
            }
            return result;
        }

        /**
         * 更新刚体的皮肤显示
         */ 
        public static updateBodySkin(body: p2.Body): void {
            if(body.displays == null || body.displays.length==0){
                return;
            }
            for(var i = 0;i < body.displays.length;i++){
                var skinDisp: egret.DisplayObject = body.displays[i];
                if(skinDisp) {
                    //使用shape数据来更新皮肤-------------------------------------------------------------------------------------------
                    var skinWorldPos = [0,0];//shapeSkin在p2World中的坐标
                    body.toWorldFrame(skinWorldPos,body.shapes[i].position);//从Body局部转世界
                    skinDisp.x = this.convertP2ValueToEgret(skinWorldPos[0]);//转化为egret坐标，赋给skin
                    skinDisp.y = this.convertP2Y_To_EgretY(skinWorldPos[1]);//转化为egret坐标，赋给skin
                    skinDisp.rotation = 360 - (body.angle + body.shapes[i].angle) * 180 / Math.PI;//
                        
                      //使用body数据来更新皮肤-------------------------------------------------------------------------------------------
//                    skinDisp.x = this.convertP2ValueToEgret(body.position[0]);//把物理世界的位置转换到显示世界的位置，赋值
//                    skinDisp.y = this.convertP2Y_To_EgretY(body.position[1]);//把物理世界的位置转换到显示世界的位置，赋值
//                    skinDisp.rotation = this.convertP2BodyAngleToEgret(body);//把物理世界刚体角度转换为显示世界角度，赋值
                }
            }
            
        }
        

        /**
         * 物理世界的长度标量到显示世界的转换
         * 适合如 x,width,height的转换，y值不适合
         */ 
        public static convertP2ValueToEgret(value:number):number {
            return value * this.factor;
        }

        /**
         * 显示世界物理世界的长度标量到物理世界的转换
         * 适合如 x,width,height的转换，y值不适合
         */ 
        public static convertEgretValueToP2(value:number):number {
            return value / this.factor;
        }

        /**
         * 把egretY值转换到p2Y值，仅适合y转换
         */ 
        public static convertEgretY_To_P2Y(egretY:number):number{
            return ( this.worldRect.height - egretY ) / this.factor;
        }
        
        
        /**
         * 把p2y值转换到egretY值，仅适合y转换
         */ 
        public static convertP2Y_To_EgretY(p2Y:number):number{
            return this.worldRect.height - p2Y * this.factor;
        }
        
        
        /**
         * 把给定egret坐标转换为p2坐标
         */ 
        public static convertEgretPosToP2(xEgret:number, yEgret:number):Array<number> {
            return [xEgret / this.factor, ( this.worldRect.height - yEgret ) / this.factor];
        }

        /**
         * 获得p2Body的egret显示坐标
         */ 
        public static convertBodyPosToEgret(body:p2.Body):Array<number> {
            var xP2:number = body.position[0];
            var yP2:number = body.position[1];

            return [xP2 * this.factor, this.worldRect.height - yP2 * this.factor];
        }
        /**
         * 获得p2Body的egret显示旋转角度
         */ 
        public static convertP2BodyAngleToEgret(body:p2.Body):number{
            var result: number;
            result = 360 - body.angle * 180 / Math.PI;
            return result;
        }
        
        /**
         * 把egret deg角度转换为p2 rad角度
         */ 
        public static convertEgretAngleToP2(angle:number):number{
            var result: number;
            result = (360-angle)*Math.PI/180;
            return result;
        }
             
        
        /**
         * 初始化
         */ 
        public static initSpace(factor:number, rectWorld:egret.Rectangle):void {
            this.factor = factor;
            this.worldRect = rectWorld;
        }
        
        /**
         * 在物理世界创建一个矩形刚体，显示cube矢量图形
         */ 
        public static addOneBox(p2World:p2.World,ctn:egret.DisplayObjectContainer,px:number,py:number,pw:number,ph:number,pAngle:number,type:number): p2.Body {   
                                    
            //在物理世界中的位置
            var p2x: number = jbP2.P2Space.convertEgretValueToP2(px);//显示位置变换到物理世界位置
            var p2y: number = jbP2.P2Space.convertEgretY_To_P2Y(py);//显示位置变换到物理世界位置
            var p2Wid: number = jbP2.P2Space.convertEgretValueToP2(pw);
            var p2Hei: number = jbP2.P2Space.convertEgretValueToP2(ph);
            var p2Angle: number = jbP2.P2Space.convertEgretAngleToP2(pAngle);
                                    
            var display: egret.DisplayObject;             
                            
            var bodyShape: p2.Shape = new p2.Box({ width: p2Wid,height: p2Hei }); //new p2.Rectangle(p2Wid, p2Hei);
            var body: p2.Body = new p2.Body({ mass: 1, position: [p2x, p2y],angle:p2Angle });
            body.type = type;
            body.addShape(bodyShape);//给刚体添加p2.Shape
            p2World.addBody(body);
                                                                    
            display = jbP2.DispUtil.createBox(pw,ph);
                                                               
            //绑定刚体和显示皮肤
            body.displays = [display];
            ctn.addChild(display);//把皮肤添加到显示世界
            
            return body;
        }
        
        /**
         * 在物理世界创建一个capsule刚体，显示capsule矢量图形
         * @param p2World
         * @param ctn
         * @param px
         * @param py
         * @param pw
         * @param ph
         * @param pAngle
         * @param type
         */
        public static addOneCapsule(p2World: p2.World,ctn: egret.DisplayObjectContainer,px: number,py: number,pLen: number,pRadius: number,pAngle: number,type: number): p2.Body {   
                                    
            //在物理世界中的位置
            var p2x: number = jbP2.P2Space.convertEgretValueToP2(px);//显示位置变换到物理世界位置
            var p2y: number = jbP2.P2Space.convertEgretY_To_P2Y(py);//显示位置变换到物理世界位置
            var p2Len: number = jbP2.P2Space.convertEgretValueToP2(pLen);
            var p2Radius: number = jbP2.P2Space.convertEgretValueToP2(pRadius);
            var p2Angle: number = jbP2.P2Space.convertEgretAngleToP2(pAngle);

            var display: egret.DisplayObject;

            var bodyShape: p2.Shape = new p2.Capsule({ length: p2Len,radius: p2Radius });//new p2.Box({ width: p2Wid,height: p2Hei }); 
            var body: p2.Body = new p2.Body({ mass: 1,position: [p2x,p2y],angle: p2Angle });
            body.type = type;
            body.addShape(bodyShape);//给刚体添加p2.Shape
            p2World.addBody(body);

            display = jbP2.DispUtil.createCapsule(pLen,pRadius);
                                                               
            //绑定刚体和显示皮肤
            body.displays = [display];
            ctn.addChild(display);//把皮肤添加到显示世界
            
            return body;
        }
         
        /**
        * 在物理世界创建一个圆形刚体，显示circle矢量图形
        */ 
        public static addOneBall(p2World:p2.World,ctn:egret.DisplayObjectContainer,px:number,py:number,pr:number,pAngle:number,type:number): p2.Body {   
                                            
            //在物理世界中的位置
            var p2x: number = jbP2.P2Space.convertEgretValueToP2(px);//显示位置变换到物理世界位置
            var p2y: number = jbP2.P2Space.convertEgretY_To_P2Y(py);//显示位置变换到物理世界位置
            var p2R: number = jbP2.P2Space.convertEgretValueToP2(pr);
                    
            var p2Angle: number = jbP2.P2Space.convertEgretAngleToP2(pAngle);
                                            
            var display: egret.DisplayObject;             
                                    
            var bodyShape: p2.Shape = new p2.Circle({ radius: p2R });//new p2.Circle(p2R)
            var body: p2.Body = new p2.Body({ mass: 1, position: [p2x, p2y],angle:p2Angle });
            body.type = type;
            body.addShape(bodyShape);//给刚体添加p2.Shape
            p2World.addBody(body);                                                                            
            display = jbP2.DispUtil.createBall(pr);                                                                       
            //绑定刚体和显示皮肤
            body.displays = [display];
            ctn.addChild(display);//把皮肤添加到显示世界            
            return body;
        }
        
        /**
         * 更新p2World的刚体皮肤显示
         */ 
        public static updateWorldBodiesSkin(p2World:p2.World):void{
            var stageHeight: number = egret.MainContext.instance.stage.stageHeight;//显示世界 stageHeight
            var len = p2World.bodies.length;
                                            
            for (var i: number = 0; i < len; i++) {//遍历所有的刚体
                var temBody: p2.Body = p2World.bodies[i];
                jbP2.P2Space.updateBodySkin(temBody);
                
                if(temBody.displays == null || temBody.displays.length==0){
                    continue;
                }
                for(var j = 0;j < temBody.displays.length;j++) {
                    var dispSkin: egret.DisplayObject = temBody.displays[j];
                    if(temBody.sleepState == p2.Body.SLEEPING) {//设置是否睡眠状态显示
                        dispSkin.alpha = 0.5;
                    } else {
                        dispSkin.alpha = 1;
                    }
                }//end for
      
            }//end for
        }

    }

}