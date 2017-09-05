/**
 *
 * @author 
 *
 */
class Examples_character extends egret.Sprite{
    private scene: jbP2.SimpleP2Scene;
    private tfInfo: egret.TextField;
    private characterBody;
    private walkSpeed = 2;
    private jumpSpeed = 6;
    private buttons;

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAdded2stage,this);

        this.addEventListener(egret.Event.ENTER_FRAME,this.loop,this);
    }

    private onAdded2stage(e: egret.Event): void {
        this.scene = new jbP2.SimpleP2Scene(this.stage,this);
        this.scene.world.sleepMode = p2.World.NO_SLEEPING;

        this.scene.world.islandSplit = true;//使用islandSplit
        
        
        
        //鼠标拾取工具实例
        var mouseJt = new P2MouseJointHelper(this.stage,this,this.scene.world);

        this.createObjs();

        this.createDebug();

        this.tfInfo = new egret.TextField();
        this.addChild(this.tfInfo);
        
        var thisInClosure = this;//在如下闭包中的 this
        document.onkeydown = function(evt) {
            thisInClosure.onkeydown(evt);
        }
        document.onkeyup = function(evt) {
            thisInClosure.onkeyup(evt);
        }
    }
    

    private onkeydown(evt): void {
        switch(evt.keyCode) {
            case 38: // up
            case 32: // space
                if(!this.buttons.space) {
                    if(this.checkIfCanJump()) {
                        this.characterBody.velocity[1] = this.jumpSpeed;
                    }
                    this.buttons.space = true;
                }
                break;
            case 39: // right
                this.buttons.right = true;
                break;
            case 37: // left
                this.buttons.left = true;
                break;
        }
    }

    private onkeyup(evt): void {
        switch(evt.keyCode) {
            case 38: // up
            case 32: // space
                this.buttons.space = false;
                break;
            case 39: // right
                this.buttons.right = false;
                break;
            case 37: // left
                this.buttons.left = false;
                break;
        }
    }
    
    private checkIfCanJump() {
        var yAxis = p2.vec2.fromValues(0,1);
        var result = false;
        for(var i = 0;i < this.scene.world.narrowphase.contactEquations.length;i++) {
            var c = this.scene.world.narrowphase.contactEquations[i];
            if(c.bodyA === this.characterBody || c.bodyB === this.characterBody) {
                var d = p2.vec2.dot(c.normalA,yAxis); // Normal dot Y-axis
                if(c.bodyA === this.characterBody) d *= -1;
                if(d > 0.5) result = true;
            }
        }
        return result;
    }
    
    

    private createObjs(): void {
        //code here
        var characterBody,planeBody,platforms = [],boxes = [];
        var characterShape,planeShape;

        var buttons = {
            space: false,
            left: false,
            right: false,
        }
        this.buttons = buttons;
        
        // Init materials
        var groundMaterial = new p2.Material(0),
            characterMaterial = new p2.Material(1),
            boxMaterial = new p2.Material(2);

        // Add a character body
        characterShape = new p2.Box({ width: 0.5,height: 1 });
        characterBody = new p2.Body({
            mass: 1,
            position: [0,3],
            fixedRotation: true,
        });
        characterBody.addShape(characterShape);
        this.scene.world.addBody(characterBody);
        characterShape.material = characterMaterial;
        characterBody.damping = 0.5;
        this.characterBody = characterBody;

        // Add a ground plane
        planeShape = new p2.Plane();
        planeBody = new p2.Body({
            position: [0,-1]
        });
        planeBody.addShape(planeShape);
        this.scene.world.addBody(planeBody);
        planeShape.material = groundMaterial;

        // Add platforms
        var platformPositions = [[2,0],[0,1],[-2,2]];
        for(var i = 0;i < platformPositions.length;i++) {
            var platformBody = new p2.Body({
                mass: 0, // Static
                position: platformPositions[i],
            });
            platformBody.type = p2.Body.KINEMATIC;
            var platformShape = new p2.Box({ width: 1,height: 0.3 });
            platformShape.material = groundMaterial;
            platformBody.addShape(platformShape);
            this.scene.world.addBody(platformBody);
            platforms.push(platformBody);
        }

        // Add movable boxes
        var boxPositions = [[2,1],[0,2],[-2,3]];
        for(var i = 0;i < boxPositions.length;i++) {
            var boxBody = new p2.Body({
                mass: 1,
                position: boxPositions[i],
            });
            var boxShape = new p2.Box({ width: 0.8,height: 0.8 });
            boxShape.material = boxMaterial;
            boxBody.addShape(boxShape);
            this.scene.world.addBody(boxBody);
            boxes.push(boxBody);
        }

        // Init contactmaterials
        var groundCharacterCM = new p2.ContactMaterial(groundMaterial,characterMaterial,<p2.ContactMaterialOptions>{
            friction: 0.0, // No friction between character and ground
        });
        var boxCharacterCM = new p2.ContactMaterial(boxMaterial,characterMaterial,<p2.ContactMaterialOptions>{
            friction: 0.0, // No friction between character and boxes
        });
        var boxGroundCM = new p2.ContactMaterial(boxMaterial,groundMaterial,<p2.ContactMaterialOptions>{
            friction: 0.6, // Between boxes and ground
        });
        this.scene.world.addContactMaterial(groundCharacterCM);
        this.scene.world.addContactMaterial(boxCharacterCM);
        this.scene.world.addContactMaterial(boxGroundCM);


        // Allow pass through platforms from below
        var passThroughBody;

        this.scene.world.on('beginContact',function(evt) {
            if(evt.bodyA !== characterBody && evt.bodyB !== characterBody) return;
            var otherBody = evt.bodyA === characterBody ? evt.bodyB : evt.bodyA;
            if(platforms.indexOf(otherBody) !== -1 && otherBody.position[1] > characterBody.position[1]) {
                passThroughBody = otherBody;
            }
        });

        // Disable any equations between the current passthrough body and the character
        this.scene.world.on('preSolve',function(evt) {
            for(var i = 0;i < evt.contactEquations.length;i++) {
                var eq = evt.contactEquations[i];
                if((eq.bodyA === characterBody && eq.bodyB === passThroughBody) || eq.bodyB === characterBody && eq.bodyA === passThroughBody) {
                    eq.enabled = false;
                }
            }
            for(var i = 0;i < evt.frictionEquations.length;i++) {
                var eq = evt.frictionEquations[i];
                if((eq.bodyA === characterBody && eq.bodyB === passThroughBody) || eq.bodyB === characterBody && eq.bodyA === passThroughBody) {
                    eq.enabled = false;
                }
            }
        });

        this.scene.world.on('endContact',function(evt) {
            if((evt.bodyA === characterBody && evt.bodyB === passThroughBody) || evt.bodyB === characterBody && evt.bodyA === passThroughBody) {
                passThroughBody = undefined;
            }
        });
        
        var wordInClosure = this.scene.world;//在如下闭包中需要的World
        this.scene.world.on('postStep',function() {
            for(var i = 0;i < platforms.length;i++) {
                platforms[i].velocity[0] = 2 * Math.sin(wordInClosure.time);
            }
        });
    }
    
    

    private loop(): void {
        this.debugDraw.drawDebug();

        var numIslands = this.scene.world.islandManager.islands.length;
        this.tfInfo.text = "number of islands:" + numIslands;
        
        // Apply button response
        if(this.buttons.right)
            this.characterBody.velocity[0] = this.walkSpeed;
        else if(this.buttons.left)
            this.characterBody.velocity[0] = -this.walkSpeed;
        else
            this.characterBody.velocity[0] = 0;
    }


    private debugDraw: p2DebugDraw;
    private debugSpr: egret.Sprite;
    private createDebug(): void {
        //创建调试试图
        this.debugDraw = new p2DebugDraw(this.scene.world);
        this.debugSpr = new egret.Sprite();
        this.addChild(this.debugSpr);
        this.debugDraw.setSprite(this.debugSpr);

        this.debugDraw.setLineWidth(0.02);
        this.debugSpr.x = this.stage.stageWidth / 2;
        this.debugSpr.y = this.stage.stageHeight / 2;

        var scale = 50;
        this.debugSpr.scaleX = scale;
        this.debugSpr.scaleY = -scale;
    }
}
