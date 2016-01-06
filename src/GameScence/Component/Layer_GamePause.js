/// <reference path="../../../cocos2d-js-v3.6.js" />
 

var GamePausePanelControl = {};

GamePausePanelControl.init = function (cfgLayer, parentLayer) {

    Util.playEffic("res/Audio/buttonMusic.mp3");
    
    GamePausePanelControl.cfgLayer = cfgLayer;

    GamePausePanelControl.parentLayer = parentLayer;

    GamePausePanelControl.panelBg = cfgLayer.node.getChildByName("Panel_Color_BG");

    GamePausePanelControl.startBtn = cfgLayer.node.getChildByName("Button_Start");

    GamePausePanelControl.musicCkb = cfgLayer.node.getChildByName("CheckBox_Music");

    GamePausePanelControl.soundCkb = cfgLayer.node.getChildByName("CheckBox_Sound");

    var musicText = cfgLayer.node.getChildByName("Text_Music");
    musicText.setString(Util.getText("music"));

    var soundText = cfgLayer.node.getChildByName("Text_Sound");
    soundText.setString(Util.getText("sound"));

    var logoText = cfgLayer.node.getChildByName("Text_Logo");
    logoText.setString(Util.getText("pause"));


    GamePausePanelControl.musicCkb.addEventListener(function (sender, type) {
        switch (type) {
            case ccui.CheckBox.EVENT_SELECTED:
                GLOBAL_DATA.Music = !GLOBAL_DATA.Music;
                GamePausePanelControl.musicCkb.setSelected(!!GLOBAL_DATA.Music);
                GLOBAL_DATA.save();
                Util.playEffic("res/Audio/buttonMusic.mp3");
                break;
            case ccui.CheckBox.EVENT_UNSELECTED:
                GLOBAL_DATA.Music = !GLOBAL_DATA.Music;
                GamePausePanelControl.musicCkb.setSelected(!!GLOBAL_DATA.Music);
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

    GamePausePanelControl.soundCkb.addEventListener(function (sender, type) {
        switch (type) {
            case ccui.CheckBox.EVENT_SELECTED:
                GLOBAL_DATA.Sound = !GLOBAL_DATA.Sound;
                GamePausePanelControl.soundCkb.setSelected(!!GLOBAL_DATA.Sound);
                GLOBAL_DATA.save();
                Util.playEffic("res/Audio/buttonMusic.mp3");
                break;
            case ccui.CheckBox.EVENT_UNSELECTED:
                GLOBAL_DATA.Sound = !GLOBAL_DATA.Sound;
                GamePausePanelControl.soundCkb.setSelected(!!GLOBAL_DATA.Sound);
                GLOBAL_DATA.save();
                Util.playEffic("res/Audio/buttonMusic.mp3");
                break;

            default:
                break;
        }
    }, cfgLayer);




    GamePausePanelControl.musicCkb.setSelected(!!GLOBAL_DATA.Music);
    GamePausePanelControl.soundCkb.setSelected(!!GLOBAL_DATA.Sound);




};
GamePausePanelControl.runActions = function () {
 

}

GamePausePanelControl.bind = function () {

    GamePausePanelControl.startBtn.addTouchEventListener(function (sender, type) {
        if (type == ccui.Widget.TOUCH_ENDED) {

            GamePausePanelControl.parentLayer.un
            Util.playEffic("res/Audio/buttonMusic.mp3");
            var a1 = cc.fadeOut(0.5);
            var cf = cc.callFunc(function () {
                GamePausePanelControl.cfgLayer.node.removeFromParent();
                GamePausePanelControl.parentLayer.scheduleUpdate();
            }, GamePausePanelControl.parentLayer);
            var seq = cc.sequence(a1, cf);

            GamePausePanelControl.cfgLayer.node.runAction(seq);
            
            
        }


    })
     
}