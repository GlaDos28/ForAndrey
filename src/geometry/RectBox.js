/**
 * ==========================
 * @description Rectangular boundbox definition.
 * ==========================
 *
 * @author  Evgeny Savelyev
 * @since   18.12.17
 * @version 1.0.0
 * @licence See the LICENCE file in the project root.
 */

"use strict";

const Point = require("./Point");

/**
 * @class
 * @classdesc Rectangular boundbox structure with floating-valued position and width and height attributes
 *
 * @property {Point}  pos    position attribute
 * @property {double} width  width attribute
 * @property {double} height height attribute
 */
class RectBox {
    constructor(x, y, width, height) {
        this.pos    = new Point(x, y);
        this.width  = width;
        this.height = height;
    }

    getPos() {
        return this.pos;
    }

    getX() {
        return this.pos.getX();
    }

    getY() {
        return this.pos.getY();
    }

    getWidth() {
        return this.width;
    }

    getHeight() {
        return this.height;
    }

    getX2() {
        return this.pos.getX() + this.width;
    }

    getY2() {
        return this.pos.getY() + this.height;
    }
}

exports = module.exports = RectBox;