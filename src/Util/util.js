/// <reference path="../../cocos2d-js-v3.6.js" />
/// <reference path="../GameScence/Component/Cell.js" />
/// <reference path="../GLOBAL_DATA.js" />
/// <reference path="../GameScence/Component/Ball.js" />
 
 
/// <reference path="JQ.js" />
/// <reference path="underscore.js" />
/// <reference path="util.js" />

var Util = {};

Util.playMusic = function (src,isLoop) {
    if (GLOBAL_DATA.Music) {
        cc.audioEngine.playMusic(src, isLoop);
    }
}
Util.StopMusic = function () {
    cc.audioEngine.stopMusic();

}

Util.playEffic = function (src) {
    if (GLOBAL_DATA.Sound) {
        cc.audioEngine.playEffect(src);
    }

}

Util.getText = function (key) {
    var lang = cc.sys.language;
    var result;
    var objL = LANG[key];
    if (!objL) {
        result = "no_text_for:" + key
    } else {
        if (objL[lang]!==undefined) {
            result = objL[lang];
        } else {
            result = objL["en"];
        }
    }

    return result;

}
 
Util.goShare = function () {
    
    if (cc.sys.isNative) {
        if (cc.sys.language.toLowerCase() == "zh") {
            $.device.openShare("剪刀石头布,简单的秘密", "res/logo_200.png", "https://itunes.apple.com/us/app/rock-paper-scissors-battle/id1014895272?l=zh&ls=1&mt=8");
        } else {
            $.device.openShare("Rock Paper Scissors!", "res/logo_200.png", "https://itunes.apple.com/us/app/rock-paper-scissors-battle/id1014895272?l=us&ls=1&mt=8");
        }

    } else {
        var share_wx = document.querySelector(".share_wx");
        
        setTimeout(function () {
            share_wx.style.display = "block";
             

        }, 100);

    }


}

Util.getRailIdx = function (p) {
    var t3 = 213.33333333333334;
    if (p.x < t3) {
        return 0;
    }
    if (p.x > t3 && p.x < t3 * 2) {
        return 1;
    }

    if (p.x > t3*2) {
        return 2;
    }
}

Util.checkResult = function (playerHandVal,enemyHandVal) {
    var result = false;
    if (playerHandVal > enemyHandVal) {
        result = true;
    }

    if (playerHandVal == 2 && enemyHandVal==0) {
        result = false;
    }

    if (playerHandVal == 0 && enemyHandVal == 2) {
        result = true;
    }
    return result;


};