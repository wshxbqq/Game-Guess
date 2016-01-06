/// <reference path="../../../cocos2d-js-v3.6.js" />
/// <reference path="../../GLOBAL_DATA.js" />
 

var GameOverPanelControl = {};

GameOverPanelControl.init = function (cfgLayer, parentLayer) {


    GLOBAL_DATA.GameCount++;
    GameOverPanelControl.cfgLayer = cfgLayer;

    GameOverPanelControl.parentLayer = parentLayer;

    GameOverPanelControl.panelBg = cfgLayer.node.getChildByName("Panel_Color_BG");

    GameOverPanelControl.startBtn = cfgLayer.node.getChildByName("Button_Start");

    GameOverPanelControl.rankBtn = cfgLayer.node.getChildByName("Button_Ranking");
 
    GameOverPanelControl.shareBtn = cfgLayer.node.getChildByName("Button_Share");
 

    GameOverPanelControl.score = cfgLayer.node.getChildByName("Text_Score");
    GameOverPanelControl.score.setString(GLOBAL_DATA.UserSocre);

    GameOverPanelControl.best = cfgLayer.node.getChildByName("Text_Best_Scroe");
    GameOverPanelControl.best.setString(GLOBAL_DATA.UserBest);


    var titleText = cfgLayer.node.getChildByName("Text_Title");
    titleText.setString(Util.getText("game_over"));

    var bestText = cfgLayer.node.getChildByName("Text_Best");
    bestText.setString(Util.getText("best"));

    if (cc.sys.isNative) {
        $.dcUserDefault("48", GLOBAL_DATA.UserSocre, 1);
        $.device.gameCenter_ReportScore(GLOBAL_DATA.UserSocre, "Score");


    } else {
        $.dcUserDefault("46", GLOBAL_DATA.UserSocre, 1);
    };

    GLOBAL_DATA.save();


};
GameOverPanelControl.runActions = function () {
 

}

GameOverPanelControl.bind = function () {

    GameOverPanelControl.startBtn.addTouchEventListener(function (sender, type) {
        if (type == ccui.Widget.TOUCH_ENDED) {
            Util.playEffic("res/Audio/buttonMusic.mp3");
            if (GLOBAL_DATA.GameCount<5) {
                GameOverPanelControl.cfgLayer.node.removeFromParent();
                var _cfgLayer = ccs.load(res["res@Layer_GameStart.json"]);
                GameOverPanelControl.parentLayer.addChild(_cfgLayer.node, 10);
                GameStartPanelControl.init(_cfgLayer, GameOverPanelControl.parentLayer);
                GameStartPanelControl.init1();
            } else {
                var a1 = cc.fadeOut(0.5);
                var cf = cc.callFunc(function () {
                    GameOverPanelControl.cfgLayer.node.removeFromParent();
                    GameOverPanelControl.parentLayer.restart();
                    GameOverPanelControl.parentLayer.scheduleUpdate();

                }, GameOverPanelControl.parentLayer);
                var seq = cc.sequence(a1, cf);
                GameOverPanelControl.cfgLayer.node.runAction(seq);
            }
        }
    })

    GameOverPanelControl.rankBtn.addTouchEventListener(function (sender, type) {
        if (type == ccui.Widget.TOUCH_ENDED) {
            Util.playEffic("res/Audio/buttonMusic.mp3");
            $.device.gameCenter_ShowLeaderboard();

             
        }
    })


    GameOverPanelControl.shareBtn.addTouchEventListener(function (sender, type) {
        if (type == ccui.Widget.TOUCH_ENDED) {
            Util.playEffic("res/Audio/buttonMusic.mp3");
            Util.goShare();


            
        }
    })
     
}