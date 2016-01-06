/// <reference path="../../../cocos2d-js-v3.6.js" />
/// <reference path="../../Util/underscore.js" />
/// <reference path="../../GLOBAL_DATA.js" />

var Hand = cc.Sprite.extend({
    ctor: function () {
        this._super();
        this.init();

        this.handValue = null;
     

        return true;

    },
    initWithVal: function (hVal) {
        this.handValue = hVal;
        this.initWithFile("res/hand_" + hVal + ".png");
 
        
    },

    changTo: function (val) {
        var _this = this;
        this.handValue = val;
        _this.setTexture("res/hand_" + val + ".png");

        var a1 = cc.scaleTo(0.1,0.8,0.8);
 
        var a2 = cc.scaleTo(0.1,1,1);
        var seq = cc.sequence(a1, a2);
        _this.runAction(seq);

        Util.playEffic("res/Audio/change.mp3");


    }
  
});