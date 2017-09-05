// /**
//  * 在Examples_boneToRigidBody2基础上，转换全体骨骼到ragdoll
//  * @author 
//  *
//  */
// class Examples_armatureToRagdoll extends egret.Sprite{
//     private dbDispPos = new egret.Point(400,300);//角色骨骼动画的位置
//     private dbDispScale = 0.25;//骨骼动画的缩放
//     private drawCtn: egret.Sprite;//绘制图形的容器
//     private armature: dragonBones.Armature;
//     private factory: dragonBones.EgretFactory;
//     private rigidDispOffset: egret.Point = new egret.Point(-100,0);//用于测试的刚体皮肤在显示上的偏移
//     private btnSamePlace: egret.TextField;//点击决定是否覆盖armature头部
//     private btnGenRagdoll:egret.TextField;//点击生成ragDoll
//     private scene: jbP2.SimpleP2Scene;
//     private objsCtn: egret.Sprite;
//     private rigidP2Offset = new egret.Point(100,0);//创建物理刚体的位置偏移
//     private Group_ground: number = 1;//ground
//     private Group_body: number = 2;//charac body
//     private Group_other: number = 4;//other
//     private bodyCollisionMask: number = this.Group_ground | this.Group_other;//碰撞遮罩
//     private defaultCollisionMask: number = this.Group_ground | this.Group_other | this.Group_body;//碰撞遮罩
//     /**
//      * 骨骼信息数组 
//      * {
//      *   boneName:string, 骨头名称
//      *   txtName:string, 纹理名称
//      *   bm:egret.Bitmap, 纹理图片
//      *   w:number, 图片(刚体)宽度
//      *   h:number, 图片(刚体)高度
//      *   boneX:number, 骨头的位置
//      *   boneY:number, 骨头的位置
//      *   rigidBody:p2.Body, 刚体对象
//      *   rigidPos:egret.Point, 刚体的位置
//      *   rigidAngleRad:number, 刚体旋转角度 rad
//      *   rigidAngleDeg:number 刚体旋转角度 deg
//      * }
//      */ 
//     private rigidBodyInfoList: Array<any> = new Array<any>();
//     private rigidBodyInfoDic = {};//info dic
//     public boneName_head:string = 'head';
//     public boneName_body0: string = 'body0';
//     public boneName_body1: string = 'body1';
//     public boneName_l_arm0: string = 'l_arm0';
//     public boneName_l_arm1: string = 'l_arm1';
//     public boneName_l_hand: string = 'l_hand';
//     public boneName_r_arm0: string = 'r_arm0';
//     public boneName_r_arm1: string = 'r_arm1';
//     public boneName_r_hand: string = 'r_hand';
//     public boneName_l_leg0: string = 'l_leg0';
//     public boneName_l_leg1: string = 'l_leg1';
//     public boneName_l_foot: string = 'l_foot';
//     public boneName_r_leg0: string = 'r_leg0';
//     public boneName_r_leg1: string = 'r_leg1';
//     public boneName_r_foot: string = 'r_foot';
//     //是否替换刚体的显示皮肤，默认创建的是shape类型的显示对象作为刚体皮肤（方便查看位置，尺寸和方向）
//     private isReplaceRigidSkin:Boolean = true;
//     public constructor() {
//         super();
//         this.drawCtn = new egret.Sprite();
//         this.drawCtn.x = this.dbDispPos.x;
//         this.drawCtn.y = this.dbDispPos.y;
//         this.drawCtn.scaleX = this.drawCtn.scaleY = this.dbDispScale;
//         this.buildArmature();
//         this.setupRigidInfo();
//         this.addChild(this.drawCtn);
//         this.btnSamePlace = jbP2.DispUtil.createTouchTf(10,10,100,18,"原位显示");
//         this.btnSamePlace.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onBtnRecover_click,this);
//         this.addChild(this.btnSamePlace);
//         this.btnGenRagdoll = jbP2.DispUtil.createTouchTf(10,50,100,18,"生成ragdoll");
//         this.btnGenRagdoll.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onGenerateRagdoll,this);
//         this.addChild(this.btnGenRagdoll);
//         this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAdded2stage,this);
//     }
//     private onAdded2stage(e: egret.Event=null): void {
//         this.objsCtn = new egret.Sprite();
//         this.addChild(this.objsCtn);
//         this.scene = new jbP2.SimpleP2Scene(this.stage,this.objsCtn);
//         this.scene.world.sleepMode = p2.World.NO_SLEEPING;
//         //鼠标拾取工具实例
//         var mouseJt = new P2MouseJointHelper(this.stage,this.objsCtn,this.scene.world);
//         var tembody: p2.Body;
//         tembody = jbP2.P2Space.addOneBox(this.scene.world,this.scene.dispCtn,0,240,10,480,0,p2.Body.STATIC);//left wall
//         tembody.shapes[0].collisionGroup = this.Group_ground;//设置碰撞组&碰撞遮罩
//         tembody.shapes[0].collisionMask = this.defaultCollisionMask;
//         tembody = jbP2.P2Space.addOneBox(this.scene.world,this.scene.dispCtn,800,240,10,480,0,p2.Body.STATIC);//right wall  
//         tembody.shapes[0].collisionGroup = this.Group_ground;//设置碰撞组&碰撞遮罩
//         tembody.shapes[0].collisionMask = this.defaultCollisionMask;
//         tembody = jbP2.P2Space.addOneBox(this.scene.world,this.scene.dispCtn,400,450,800,20,0,p2.Body.STATIC);//middle static
//         tembody.shapes[0].collisionGroup = this.Group_ground;//设置碰撞组&碰撞遮罩
//         tembody.shapes[0].collisionMask = this.defaultCollisionMask;
//         tembody = jbP2.P2Space.addOneBox(this.scene.world,this.scene.dispCtn,400,100,50,50,10,p2.Body.DYNAMIC);//box1
//         tembody.shapes[0].collisionGroup = this.Group_other;//设置碰撞组&碰撞遮罩
//         tembody.shapes[0].collisionMask = this.defaultCollisionMask;
//     }
//     private onBtnRecover_click(e: egret.TouchEvent): void {
//         if(this.rigidDispOffset.x == 0) {
//             this.rigidDispOffset.x = -100;
//         } else {
//             this.rigidDispOffset.x = 0;
//         }
//     }
//     private buildArmature(): void {
//         var armatureRaname = "myBonesAni";//骨架名称，为了后边使用
//         var dragonbonesData = RES.getRes("boneAniDat_json");
//         console.log("skeleton.armature.name: " + dragonbonesData.armature[0].name);
//         dragonbonesData.armature[0].name = armatureRaname;//我们改变一下导入时候的骨架名称
//         console.log("skeleton.armature.name changed: " + dragonbonesData.armature[0].name);
//         var textureData = RES.getRes("boneTexture_json");
//         var texture = RES.getRes("boneTexture_png");
//         this.factory = new dragonBones.EgretFactory();
//         this.factory.addSkeletonData(dragonBones.DataParser.parseDragonBonesData(dragonbonesData));
//         this.factory.addTextureAtlas(new dragonBones.EgretTextureAtlas(texture,textureData));
//         this.armature = this.factory.buildArmature(armatureRaname);
//         var armatureDisplay = <egret.DisplayObject>this.armature.display;
//         this.addChild(armatureDisplay);
//         armatureDisplay.x = this.dbDispPos.x;
//         armatureDisplay.y = this.dbDispPos.y;
//         armatureDisplay.scaleX = armatureDisplay.scaleY = this.dbDispScale;
//         dragonBones.WorldClock.clock.add(this.armature);
//         this.armature.animation.timeScale = 0.5;
//         this.armature.animation.gotoAndPlay("run");
//         //this.armature.animation.gotoAndPlay("walk");
//         this.prevTime = egret.getTimer();
//         this.addEventListener(egret.Event.ENTER_FRAME,this.onEf,this);
//         //换成第三个头部皮肤方便观察-------------------------------------------
//         var _bone = this.armature.getBone("head");//获得头部对应的骨骼
//         _bone.slot.display = null;//
//         _bone.slot.display = _bone.slot.displayList[2];//更换插槽皮肤
//         //------------------------------------------------------------------
//     }
//     private setupRigidInfo(): void {
//         this.rigidBodyInfoList.push({ boneName: this.boneName_head,texName: "robot_head1" });
//         this.rigidBodyInfoList.push({ boneName: this.boneName_body0,texName: "robot_bodyUpper" });
//         this.rigidBodyInfoList.push({ boneName: this.boneName_body1,texName: "robot_bodyLower" });
//         this.rigidBodyInfoList.push({ boneName: this.boneName_l_arm0,texName: "robot_armUpper" });
//         this.rigidBodyInfoList.push({ boneName: this.boneName_l_arm1,texName: "robot_armLower" });
//         this.rigidBodyInfoList.push({ boneName: this.boneName_l_hand,texName: "robot_hand" });
//         this.rigidBodyInfoList.push({ boneName: this.boneName_r_arm0,texName: "robot_armUpper" });
//         this.rigidBodyInfoList.push({ boneName: this.boneName_r_arm1,texName: "robot_armLower" });
//         this.rigidBodyInfoList.push({ boneName: this.boneName_r_hand,texName: "robot_hand" });
//         this.rigidBodyInfoList.push({ boneName: this.boneName_l_leg0,texName: "robot_legUpper" });
//         this.rigidBodyInfoList.push({ boneName: this.boneName_l_leg1,texName: "robot_legLower" });
//         this.rigidBodyInfoList.push({ boneName: this.boneName_l_foot,texName: "robot_foot" });
//         this.rigidBodyInfoList.push({ boneName: this.boneName_r_leg0,texName: "robot_legUpper" });
//         this.rigidBodyInfoList.push({ boneName: this.boneName_r_leg1,texName: "robot_legLower" });
//         this.rigidBodyInfoList.push({ boneName: this.boneName_r_foot,texName: "robot_foot" });
//         //setup element content
//         for(var i = 0;i < this.rigidBodyInfoList.length;i++){
//             var temDat = this.rigidBodyInfoList[i];
//             temDat.rigidPos = new egret.Point();
//             temDat.rigidAngleRad = 0;
//             temDat.rigidAngleDeg = 0;
//             var bm:egret.Bitmap = this.factory.getTextureDisplay(temDat.texName);
//             bm.scaleX = bm.scaleY = this.dbDispScale;
//             bm.alpha = .6;
//             this.addChild(bm);
//             temDat.bm = bm;
//             temDat.w = bm.width;
//             temDat.h = bm.height;
//             this.rigidBodyInfoDic[temDat.boneName] = temDat;//放入字典中
//         }
//     }
//     private prevTime: number;
//     private onEf(e: egret.Event): void {
//         var currTime = egret.getTimer();
//         var delta = currTime - this.prevTime;
//         // dragonBones.WorldClock.clock.advanceTime();
//         this.drawCtn.graphics.clear();
//         this.drawCtn.graphics.lineStyle(2,0xff0000);
//         for(var i = 0;i < this.rigidBodyInfoList.length;i++){
//             this.updateRigid(this.rigidBodyInfoList[i]);    
//         }
//         this.prevTime = currTime;
//     }
//     /**
//      * 更新刚体信息和显示
//      */ 
//     private updateRigid(rigidInfo): void {
//         var bone = this.armature.getBone(rigidInfo.boneName);//获得对应的骨骼
//         // var boneData = this.armature.armatureData.getBoneData(rigidInfo.boneName);//骨骼数据,用于获得骨骼长度
//         // var slotData = this.armature.armatureData.getSlotData(rigidInfo.boneName);//获得默认的插槽数据，默认在设计时候插槽和骨骼名称一样
//         var dispData = slotData.displayDataList[slotData.displayIndex];//dispData
//         var boneGlobalTransform = bone.global;//骨骼的armature全局transform,读取位置和旋转
//         this.drawCtn.graphics.drawCircle(boneGlobalTransform.x,boneGlobalTransform.y,8);
//         this.drawCtn.graphics.moveTo(boneGlobalTransform.x,boneGlobalTransform.y);
//         var boneLen = boneData.length;//骨头的长度
//         this.drawCtn.graphics.lineTo(boneGlobalTransform.x + boneLen * Math.cos(boneGlobalTransform.rotation),boneGlobalTransform.y + boneLen * Math.sin(boneGlobalTransform.rotation));
//         this.drawCtn.graphics.endFill();
//         //更新骨骼的位置，用于在创建刚体之间约束时候用--------------------------------------------------------------------
//         rigidInfo.boneX = this.dbDispPos.x + boneGlobalTransform.x * this.dbDispScale + this.rigidDispOffset.x;
//         rigidInfo.boneY = this.dbDispPos.y + boneGlobalTransform.y * this.dbDispScale + this.rigidDispOffset.y;
//         //这里手动更新额外的头部皮肤，让这个bitmap与头部显示一致-----------------------------------------------
//         var bmOffset = new egret.Point(dispData.transform.x,dispData.transform.y);//位图在插槽内的偏移向量
//         var bmOffsetAngle = Math.atan2(bmOffset.y,bmOffset.x);//位图在插槽内的偏移角度rad
//         var bmOffsetAngleFinal = boneGlobalTransform.rotation + bmOffsetAngle;//位图在最终空间内的旋转角度 in rad (这个骨骼在armatrue的世界坐标+在插槽内偏移角度)
//         var offsetLen = bmOffset.length;
//         //armature位置+骨骼位置+位图在插槽内的偏移+测试显示的偏移 
//         //◆◆◆用于 刚体位置◆◆◆----------------------------------------------------------------
//         rigidInfo.rigidPos.x = this.dbDispPos.x + (boneGlobalTransform.x + offsetLen * Math.cos(bmOffsetAngleFinal)) * this.dbDispScale + this.rigidDispOffset.x;
//         rigidInfo.rigidPos.y = this.dbDispPos.y + (boneGlobalTransform.y + offsetLen * Math.sin(bmOffsetAngleFinal)) * this.dbDispScale + this.rigidDispOffset.y;
//         rigidInfo.bm.x = rigidInfo.rigidPos.x;
//         rigidInfo.bm.y = rigidInfo.rigidPos.y;
//         //◆◆◆用于 刚体角度◆◆◆-------------------------------------------------------------
//         rigidInfo.rigidAngleRad = boneGlobalTransform.rotation + dispData.transform.rotation;
//         rigidInfo.rigidAngleDeg = rigidInfo.rigidAngleRad * 180 / Math.PI;
//         rigidInfo.bm.rotation = rigidInfo.rigidAngleDeg;//骨骼旋转+位图在插槽内的旋转
//         //---------------------------------------------------------------------------------------------------
//     }
//     /**
//      * 生成ragDoll对象
//      * @param evt
//      */
//     private onGenerateRagdoll(evt=null):void{
//         for(var i = 0;i < this.rigidBodyInfoList.length;i++) {
//             var temInfo = this.rigidBodyInfoList[i];
//             this.updateRigid(temInfo);
//             var tembody = jbP2.P2Space.addOneBox(
//                 this.scene.world,this.scene.dispCtn,
//                 temInfo.rigidPos.x+this.rigidP2Offset.x,temInfo.rigidPos.y+this.rigidP2Offset.y,
//                 temInfo.w*this.dbDispScale,temInfo.h*this.dbDispScale,
//                 temInfo.rigidAngleDeg,p2.Body.DYNAMIC
//             );//box
//             //替换为真实皮肤------------------
//             if(this.isReplaceRigidSkin){
//                 this.scene.dispCtn.removeChild(tembody.displays[0]);
//                 var bm: egret.Bitmap = this.factory.getTextureDisplay(temInfo.texName);
//                 bm.scaleX = bm.scaleY = this.dbDispScale;
//                 bm.alpha = .6;
//                 this.addChild(bm);
//                 tembody.displays[0] = bm;   
//             }
//             //------------------------------
//             tembody.shapes[0].collisionGroup = this.Group_body;//设置碰撞组&碰撞遮罩
//             tembody.shapes[0].collisionMask = this.bodyCollisionMask;
//             temInfo.rigidBody = tembody;
//         }
//         //设置骨骼刚体之间的约束--------------------------------------------------------------
//         this.setupPvtJt(this.rigidBodyInfoDic[this.boneName_head],this.rigidBodyInfoDic[this.boneName_body0],this.rigidBodyInfoDic[this.boneName_head],true,-Math.PI / 8,Math.PI / 8);//head body0
//         this.setupPvtJt(this.rigidBodyInfoDic[this.boneName_body0],this.rigidBodyInfoDic[this.boneName_body1],this.rigidBodyInfoDic[this.boneName_body0],true,-Math.PI / 8,Math.PI / 8);//body0 body1
//         this.setupPvtJt(this.rigidBodyInfoDic[this.boneName_body1],this.rigidBodyInfoDic[this.boneName_l_leg0],this.rigidBodyInfoDic[this.boneName_l_leg0],true,-Math.PI / 2,Math.PI / 2);//body1 lleg0
//         this.setupPvtJt(this.rigidBodyInfoDic[this.boneName_l_leg0],this.rigidBodyInfoDic[this.boneName_l_leg1],this.rigidBodyInfoDic[this.boneName_l_leg1],true,-Math.PI / 8,Math.PI / 8);//lleg0 lleg1
//         this.setupPvtJt(this.rigidBodyInfoDic[this.boneName_l_leg1],this.rigidBodyInfoDic[this.boneName_l_foot],this.rigidBodyInfoDic[this.boneName_l_foot],true,-Math.PI / 8,Math.PI / 8);//lleg1 lfoot
//         this.setupPvtJt(this.rigidBodyInfoDic[this.boneName_body1],this.rigidBodyInfoDic[this.boneName_r_leg0],this.rigidBodyInfoDic[this.boneName_r_leg0],true,-Math.PI / 2,Math.PI / 2);//body1 rleg0
//         this.setupPvtJt(this.rigidBodyInfoDic[this.boneName_r_leg0],this.rigidBodyInfoDic[this.boneName_r_leg1],this.rigidBodyInfoDic[this.boneName_r_leg1],true,-Math.PI / 8,Math.PI / 8);//rleg0 rleg1
//         this.setupPvtJt(this.rigidBodyInfoDic[this.boneName_r_leg1],this.rigidBodyInfoDic[this.boneName_r_foot],this.rigidBodyInfoDic[this.boneName_r_foot],true,-Math.PI / 8,Math.PI / 8);//rleg1 rfoot
//         this.setupPvtJt(this.rigidBodyInfoDic[this.boneName_body0],this.rigidBodyInfoDic[this.boneName_l_arm0],this.rigidBodyInfoDic[this.boneName_l_arm0],false,-Math.PI / 8,Math.PI / 8);//body0 larm0
//         this.setupPvtJt(this.rigidBodyInfoDic[this.boneName_l_arm0],this.rigidBodyInfoDic[this.boneName_l_arm1],this.rigidBodyInfoDic[this.boneName_l_arm1],true,-Math.PI / 8,Math.PI / 8);//larm0 larm1
//         this.setupPvtJt(this.rigidBodyInfoDic[this.boneName_l_arm1],this.rigidBodyInfoDic[this.boneName_l_hand],this.rigidBodyInfoDic[this.boneName_l_hand],true,-Math.PI / 8,Math.PI / 8);//larm1 lhand
//         this.setupPvtJt(this.rigidBodyInfoDic[this.boneName_body0],this.rigidBodyInfoDic[this.boneName_r_arm0],this.rigidBodyInfoDic[this.boneName_r_arm0],false,-Math.PI / 8,Math.PI / 8);//body0 rarm0
//         this.setupPvtJt(this.rigidBodyInfoDic[this.boneName_r_arm0],this.rigidBodyInfoDic[this.boneName_r_arm1],this.rigidBodyInfoDic[this.boneName_r_arm1],true,-Math.PI / 8,Math.PI / 8);//rarm0 rarm1
//         this.setupPvtJt(this.rigidBodyInfoDic[this.boneName_r_arm1],this.rigidBodyInfoDic[this.boneName_r_hand],this.rigidBodyInfoDic[this.boneName_r_hand],true,-Math.PI / 8,Math.PI / 8);//rarm1 rhand
//     }
//     /**
//      * 给两个骨骼对象数据添加约束
//      * @param infoA 第一个刚体数据
//      * @param infoB 第二个刚体数据
//      * @param worldPtInfo 约束中worldPt对应的刚体数据
//      */ 
//     private setupPvtJt(infoA,infoB,worldPtInfo,isSetLimits:Boolean,lowerAngle:number,upperAngle:number):void{
//         //约束点放在两个刚体中间位置,转换到p2空间点坐标
//         var pivotP2X: number = jbP2.P2Space.convertEgretValueToP2(worldPtInfo.boneX+this.rigidP2Offset.x);
//         var pivotP2Y: number = jbP2.P2Space.convertEgretY_To_P2Y(worldPtInfo.boneY+this.rigidP2Offset.y);
//         //构造方法中type的值可以是Constraint.DISTANCE, Constraint.GEAR, Constraint.LOCK, Constraint.PRISMATIC or Constraint.REVOLUTE
//         var pvtJt = new p2.RevoluteConstraint(infoA.rigidBody,infoB.rigidBody,{ worldPivot: [pivotP2X,pivotP2Y] });
//         pvtJt.collideConnected = false;
//         if(isSetLimits){
//             pvtJt.setLimits(lowerAngle,upperAngle);//在此设定约束的夹角    
//         }
//         this.scene.world.addConstraint(pvtJt);
//     }
// }
//# sourceMappingURL=Examples_armatureToRagdoll.js.map