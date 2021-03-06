/**
 * ==========================
 * @description graphical model with 2D animation
 * ==========================
 *
 * @author Evgeny Savelyev
 * @since   18.12.17
 * @version 1.0.0
 * @licence See the LICENCE file in the project root.
 */

"use strict";

const global = require("../../global");

const LARGE_NUM = 1000000000;

/**
 * @class
 * @classdesc graphical object that represents an animated model. Consists of animated model descriptor and current model state attributes
 *
 * @property {AnimatedModelDescriptor} descriptor     an object that defines a model (its sprites)
 * @property {Sprite}                  curSprite      current active sprite that displays via draw calls
 * @property {double}                  spriteTimeLeft current time left before switching an active sprite
 */
class AnimatedModel {
    constructor(descriptor) {
        if (typeof descriptor === "undefined" || !descriptor) {
            throw new Error(`Corrupt animated model descriptor: "${typeof descriptor}"`);
        }

        this.descriptor     = descriptor;
        this.curSprite      = this.descriptor.getStateFirstSprite(this.descriptor.getDefaultStateName());
        this.spriteLeftTime = 0;

        this.__initSpriteTime__();
    }

    getDescriptor() {
        return this.descriptor;
    }

    getCurStateName() {
        return this.curSprite.getStateName();
    }

    switchToState(stateName) {
        this.curSprite = this.descriptor.getStateFirstSprite(stateName);
        this.__initSpriteTime__();
    }

    draw(pixiSprite, point, delta) {
        this.__tic__(delta);

        const tex = this.curSprite.getTexture();

        pixiSprite.setTexture(tex.getPixiTexture());
        pixiSprite.x = point.getX();
        pixiSprite.y = point.getY();
        pixiSprite.scale.x = tex.getScaleX();
        pixiSprite.scale.y = tex.getScaleY();
        pixiSprite.anchor.set(global.ANCHOR_CENTER);
    }

    /* Private methods */

    __goNextSprite__() {
        this.curSprite = this.curSprite.getNext();
        this.__initSpriteTime__();
    }

    __initSpriteTime__() {
        while (this.curSprite.getTime() === 0) {
            this.curSprite = this.curSprite.getNext();
        }

        this.spriteLeftTime = this.curSprite.getTime();

        if (this.spriteLeftTime === -1) {
            this.spriteLeftTime = LARGE_NUM;
        }
    }

    __tic__(delta) {
        let ticsLeft = delta;
        this.spriteLeftTime -= ticsLeft;

        while (this.spriteLeftTime <= 0) {
            ticsLeft = -this.spriteLeftTime;
            this.__goNextSprite__();
            this.spriteLeftTime -= ticsLeft;
        }
    }
}

exports = module.exports = AnimatedModel;