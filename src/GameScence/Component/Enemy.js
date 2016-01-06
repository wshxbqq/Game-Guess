/// <reference path="../../../cocos2d-js-v3.6.js" />
/// <reference path="../../Util/underscore.js" />
/// <reference path="../../GLOBAL_DATA.js" />

var Enemy = cc.Sprite.extend({
    ctor: function () {
        this._super();
        this.init();

        this.handValue = null;
        this.colorValue = null;

        return true;

    },
    initWithVal: function (hVal,eVal) {
        this.initWithFile("res/hand_" + hVal + ".png");
        this.handValue = hVal;
        this.colorValue = eVal;
        switch (eVal) {
            case 0:; break;
            case 1: this.setColor(cc.color(255, 255, 0)); break;
            case 2: this.setColor(cc.color(255, 0, 0)); break;
        }
        
    }
  
});