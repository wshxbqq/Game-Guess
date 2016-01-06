var GLOBAL_DATA = {};
var GLOBAL_LAYER = null;


GLOBAL_DATA.Music = true;
GLOBAL_DATA.Sound = true;

GLOBAL_DATA.UserSocre = 0;
GLOBAL_DATA.UserBest = 0;

GLOBAL_DATA.Speed = 5;
GLOBAL_DATA.AddEnemyInterval = 140;

GLOBAL_DATA.Guide;
GLOBAL_DATA.GameCount = 0;

GLOBAL_DATA.save = function () {
    cc.sys.localStorage.setItem("UserBest", GLOBAL_DATA.UserBest + "");
 
    cc.sys.localStorage.setItem("Music", GLOBAL_DATA.Music+"");

    cc.sys.localStorage.setItem("Sound", GLOBAL_DATA.Sound + "");

    cc.sys.localStorage.setItem("Guide", GLOBAL_DATA.Guide + "");

    cc.sys.localStorage.setItem("GameCount", GLOBAL_DATA.GameCount + "");
}

GLOBAL_DATA.load = function () {
    var userBest = cc.sys.localStorage.getItem("UserBest");
    GLOBAL_DATA.UserBest = userBest ? parseInt(userBest) : 0;
    GLOBAL_DATA.UserBest = parseInt(GLOBAL_DATA.UserBest);

    var gameCount = cc.sys.localStorage.getItem("GameCount");
    GLOBAL_DATA.GameCount = gameCount ? parseInt(gameCount) : 0;
    GLOBAL_DATA.GameCount = parseInt(GLOBAL_DATA.GameCount);
 
    
    GLOBAL_DATA.Music = cc.sys.localStorage.getItem("Music") == "false" ? false : true;
    GLOBAL_DATA.Sound = cc.sys.localStorage.getItem("Sound") == "false" ? false : true;

    GLOBAL_DATA.Guide = cc.sys.localStorage.getItem("Guide") == "false" ? false : true;
}