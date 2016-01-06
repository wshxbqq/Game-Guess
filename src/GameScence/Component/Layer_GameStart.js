/// <reference path="../../../cocos2d-js-v3.6.js" />
 

var GameStartPanelControl = {};

GameStartPanelControl.init = function (cfgLayer, parentLayer) {

 
    
    GameStartPanelControl.cfgLayer = cfgLayer;

    GameStartPanelControl.parentLayer = parentLayer;

    GameStartPanelControl.panelBg = cfgLayer.node.getChildByName("Panel_Color_BG");

    GameStartPanelControl.startBtn = cfgLayer.node.getChildByName("Button_Start");

    GameStartPanelControl.musicCkb = cfgLayer.node.getChildByName("CheckBox_Music");

    GameStartPanelControl.soundCkb = cfgLayer.node.getChildByName("CheckBox_Sound");

    GameOverPanelControl.touchToStartLabel = cfgLayer.node.getChildByName("Text_Touch_Continue");

    GameStartPanelControl.imgTitle = cfgLayer.node.getChildByName("Image_Title");
    if (cc.sys.language == "zh") {
        GameStartPanelControl.imgTitle.loadTexture("res/title_zh.png");
    }
    
    var musicText = cfgLayer.node.getChildByName("Text_Music");
    musicText.setString(Util.getText("music"));

    var soundText = cfgLayer.node.getChildByName("Text_Sound");
    soundText.setString(Util.getText("sound"));

  

    var guideText = cfgLayer.node.getChildByName("Text_Rule");
    guideText.setString(Util.getText("game_guide"));

    var touchToGoText = cfgLayer.node.getChildByName("Text_Touch_Continue");
    touchToGoText.setString(Util.getText("touch_to_continue"));

    GameStartPanelControl.musicCkb.addEventListener(function (sender, type) {
        switch (type) {
            case ccui.CheckBox.EVENT_SELECTED:
                GLOBAL_DATA.Music = !GLOBAL_DATA.Music;
                GameStartPanelControl.musicCkb.setSelected(!!GLOBAL_DATA.Music);
                GLOBAL_DATA.save();
                Util.playEffic("res/Audio/buttonMusic.mp3");
                break;
            case ccui.CheckBox.EVENT_UNSELECTED:
                GLOBAL_DATA.Music = !GLOBAL_DATA.Music;
                GameStartPanelControl.musicCkb.setSelected(!!GLOBAL_DATA.Music);
                GLOBAL_DATA.save();
                Util.playEffic("res/Audio/buttonMusic.mp3");
                break;

            default:
                break;
        }
        if (!GLOBAL_DATA.Music) {
            Util.StopMusic();
        } else {
            if (!cc.audioEngine.isMusicPlaying()) {
                Util.playMusic("res/Audio/bg.mp3", 1);
            }
        }
    }, cfgLayer);




    GameStartPanelControl.soundCkb.addEventListener(function (sender, type) {
        switch (type) {
            case ccui.CheckBox.EVENT_SELECTED:
                GLOBAL_DATA.Sound = !GLOBAL_DATA.Sound;
                GameStartPanelControl.soundCkb.setSelected(!!GLOBAL_DATA.Sound);
                GLOBAL_DATA.save();
                Util.playEffic("res/Audio/buttonMusic.mp3");
                break;
            case ccui.CheckBox.EVENT_UNSELECTED:
                GLOBAL_DATA.Sound = !GLOBAL_DATA.Sound;
                GameStartPanelControl.soundCkb.setSelected(!!GLOBAL_DATA.Sound);
                GLOBAL_DATA.save();
                Util.playEffic("res/Audio/buttonMusic.mp3");
                break;

            default:
                break;
        }
    }, cfgLayer);




    GameStartPanelControl.musicCkb.setSelected(!!GLOBAL_DATA.Music);
    GameStartPanelControl.soundCkb.setSelected(!!GLOBAL_DATA.Sound);




};
GameStartPanelControl.runActions = function () {
 

}

GameStartPanelControl.init1 = function () {
    GameStartPanelControl.cfgLayer.node.setPosition(cc.p(-640, 0));
    GameStartPanelControl.panelBg.addTouchEventListener(function (sender, type) {
        if (type == ccui.Widget.TOUCH_ENDED) {
            var a1 = cc.fadeOut(0.5);
            var cf = cc.callFunc(function () {
                GameStartPanelControl.cfgLayer.node.removeFromParent();
            }, GameStartPanelControl.parentLayer);
            var seq = cc.sequence(a1, cf);

            GameStartPanelControl.cfgLayer.node.runAction(seq);
            GameOverPanelControl.parentLayer.restart();
            GameStartPanelControl.parentLayer.scheduleUpdate();

        }

    });

};

GameStartPanelControl.bind = function () {

    GameStartPanelControl.startBtn.addTouchEventListener(function (sender, type) {
        if (type == ccui.Widget.TOUCH_ENDED) {
            Util.playEffic("res/Audio/buttonMusic.mp3");


            var m1 = cc.moveTo(0.3, -640, 0);
            var calB = cc.callFunc(function () {
                var _a1 = cc.scaleTo(0.2,1.1,1.1);
                var _a2 = cc.scaleTo(0.2, 1, 1);
                var _seq = cc.sequence(_a1, _a2);
                GameOverPanelControl.touchToStartLabel.runAction(_seq);



                GameStartPanelControl.panelBg.addTouchEventListener(function (sender, type) {
                    if (type == ccui.Widget.TOUCH_ENDED) {
                        var a1 = cc.fadeOut(0.5);
                        var cf = cc.callFunc(function () {
                            GameStartPanelControl.cfgLayer.node.removeFromParent();
                        }, GameStartPanelControl.parentLayer);
                        var seq = cc.sequence(a1, cf);

                        GameStartPanelControl.cfgLayer.node.runAction(seq);

                        GameStartPanelControl.parentLayer.scheduleUpdate();

                    }

                });



            });
            var seq1 = cc.sequence(m1,calB);
            GameStartPanelControl.cfgLayer.node.runAction(seq1);
 
        }
    })
     
}