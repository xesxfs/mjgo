var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-2015, Egret Technology Inc.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var p2DebugDraw = (function () {
    function p2DebugDraw(world) {
        this.COLOR_D_SLEEP = 0x999999;
        this.COLOR_D_WAKE = 0xe5b2b2;
        this.COLOR_K = 0x7f7fe5;
        this.COLOR_S = 0x7fe57f;
        this.lineWidth = 1;
        this.world = world;
    }
    p2DebugDraw.prototype.setSprite = function (sprite) {
        this.sprite = sprite;
    };
    p2DebugDraw.prototype.setLineWidth = function (value) {
        this.lineWidth = value;
    };
    p2DebugDraw.prototype.drawDebug = function () {
        this.sprite.graphics.clear();
        var l = this.world.bodies.length;
        for (var i = 0; i < l; i++) {
            var body = this.world.bodies[i];
            for (var j = 0; j < body.shapes.length; j++) {
                var shape = body.shapes[j];
                if (shape instanceof p2.Box) {
                    this.drawBox(shape, body);
                }
                else if (shape instanceof p2.Convex) {
                    this.drawConvex(shape, body);
                }
                else if (shape instanceof p2.Circle) {
                    this.drawCircle(shape, body);
                }
                else if (shape instanceof p2.Line) {
                    this.drawLine(shape, body);
                }
                else if (shape instanceof p2.Particle) {
                    this.drawParticle(shape, body);
                }
                else if (shape instanceof p2.Plane) {
                    this.drawPlane(shape, body);
                }
                else if (shape instanceof p2.Capsule) {
                    this.drawCapsule(shape, body);
                }
            }
        }
    };
    p2DebugDraw.prototype.drawRay = function (start, end, color) {
        // Draw line
        var g = this.sprite.graphics;
        g.lineStyle(this.lineWidth, color);
        g.moveTo(start[0], start[1]);
        g.lineTo(end[0], end[1]);
        g.endFill();
    };
    p2DebugDraw.prototype.drawBox = function (shape, b) {
        this.drawConvex(shape, b);
    };
    p2DebugDraw.prototype.drawCircle = function (shape, b) {
        var color = this.getColor(b);
        var g = this.sprite.graphics;
        g.lineStyle(this.lineWidth, color);
        g.beginFill(color, 0.5);
        g.drawCircle(b.position[0], b.position[1], shape.radius);
        var edge = new Array();
        b.toWorldFrame(edge, [shape.radius, 0]);
        g.moveTo(b.position[0], b.position[1]);
        g.lineTo(edge[0], edge[1]);
        g.endFill();
    };
    p2DebugDraw.prototype.drawCapsule = function (shape, b) {
        var color = this.getColor(b);
        var len = shape.length;
        var radius = shape.radius;
        var p1 = new Array(), p2 = new Array(), p3 = new Array(), p4 = new Array();
        var a1 = new Array(), a2 = new Array();
        b.toWorldFrame(p1, [-len / 2, -radius]);
        b.toWorldFrame(p2, [len / 2, -radius]);
        b.toWorldFrame(p3, [len / 2, radius]);
        b.toWorldFrame(p4, [-len / 2, radius]);
        b.toWorldFrame(a1, [len / 2, 0]);
        b.toWorldFrame(a2, [-len / 2, 0]);
        var g = this.sprite.graphics;
        g.lineStyle(this.lineWidth, color);
        g.beginFill(color, 0.5);
        g.drawCircle(a1[0], a1[1], radius);
        g.endFill();
        g.lineStyle(this.lineWidth, color);
        g.beginFill(color, 0.5);
        g.drawCircle(a2[0], a2[1], radius);
        g.endFill();
        g.lineStyle(this.lineWidth, color);
        g.beginFill(color, 0.5);
        g.moveTo(p1[0], p1[1]);
        g.lineTo(p2[0], p2[1]);
        g.lineTo(p3[0], p3[1]);
        g.lineTo(p4[0], p4[1]);
        g.endFill();
    };
    p2DebugDraw.prototype.drawLine = function (shape, b) {
        var color = this.getColor(b);
        var len = shape.length;
        var p1 = new Array(), p2 = new Array();
        b.toWorldFrame(p1, [-len / 2, 0]);
        b.toWorldFrame(p2, [len / 2, 0]);
        var g = this.sprite.graphics;
        g.lineStyle(this.lineWidth, color);
        g.moveTo(p1[0], p1[1]);
        g.lineTo(p2[0], p2[1]);
        g.endFill();
    };
    p2DebugDraw.prototype.drawParticle = function (shape, b) {
        var color = this.getColor(b);
        var g = this.sprite.graphics;
        g.lineStyle(this.lineWidth, color);
        g.beginFill(color, 0.5);
        g.drawCircle(b.position[0], b.position[1], 1);
        g.endFill();
        g.lineStyle(this.lineWidth, color);
        g.drawCircle(b.position[0], b.position[1], 5);
        g.endFill();
    };
    p2DebugDraw.prototype.drawConvex = function (shape, b) {
        var color = this.getColor(b);
        var l = shape.vertices.length;
        var g = this.sprite.graphics;
        g.lineStyle(this.lineWidth, color);
        g.beginFill(color, 0.5);
        var worldPoint = new Array();
        b.toWorldFrame(worldPoint, shape.vertices[0]);
        //g.moveTo(worldPoint[0], worldPoint[1]);
        g.moveTo(b.position[0], b.position[1]);
        g.lineTo(worldPoint[0], worldPoint[1]);
        for (var i = 1; i <= l; i++) {
            b.toWorldFrame(worldPoint, shape.vertices[i % l]);
            g.lineTo(worldPoint[0], worldPoint[1]);
        }
        g.endFill();
    };
    p2DebugDraw.prototype.drawPlane = function (shape, b) {
        var color = this.COLOR_D_SLEEP;
        var g = this.sprite.graphics;
        g.lineStyle(this.lineWidth, color);
        g.beginFill(color, 1);
        var start = new Array();
        var end = new Array();
        b.toWorldFrame(start, [-1000, 0]);
        g.moveTo(start[0], start[1]);
        b.toWorldFrame(end, [1000, 0]);
        g.lineTo(end[0], end[1]);
        b.toWorldFrame(end, [1000, -1000]);
        g.lineTo(end[0], end[1]);
        b.toWorldFrame(end, [-1000, -1000]);
        g.lineTo(end[0], end[1]);
        b.toWorldFrame(end, [-1000, -0]);
        g.lineTo(end[0], end[1]);
        g.endFill();
    };
    p2DebugDraw.prototype.getColor = function (b) {
        var color = this.COLOR_D_SLEEP;
        if (b.type == p2.Body.KINEMATIC) {
            color = this.COLOR_K;
        }
        else if (b.type == p2.Body.STATIC) {
            color = this.COLOR_S;
        }
        else if (b.sleepState == p2.Body.AWAKE) {
            color = this.COLOR_D_WAKE;
        }
        return color;
    };
    return p2DebugDraw;
}());
__reflect(p2DebugDraw.prototype, "p2DebugDraw");
//# sourceMappingURL=p2DebugDraw.js.map