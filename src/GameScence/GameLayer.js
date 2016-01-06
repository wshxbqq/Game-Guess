/// <reference path="../../cocos2d-js-v3.6.js" />
/// <reference path="../CfgPanel/CfgPanel.js" />
/// <reference path="../Util/JQ.js" />
/// <reference path="Component/Cell.js" />
/// <reference path="../Util/util.js" />
/// <reference path="Component/Ball.js" />
/// <reference path="../Util/underscore.js" />
/// <reference path="Component/Layer_GameStart.js" />
/// <reference path="Component/Hand.js" />
/// <reference path="Component/Enemy.js" />
 

var GameLayer = cc.Layer.extend({

    playerHands:[],
    enemyHands: [[], [], []],
    
    _handPositionY:300,

    ctor: function () {
        this._super();
        this.init();
        return true;
    },
    init: function () {
        var _this = this;
        GLOBAL_LAYER = this;
        GLOBAL_DATA.load();
        cc.audioEngine.setMusicVolume(0.4);
        Util.playMusic("res/Audio/bg.mp3", true);
        GLOBAL_DATA.__playing = 1;

        var gamescene = ccs.load(res["res@GameScene.json"]);
        this.addChild(gamescene.node);
        this.gamescene = gamescene;
        var pBG = gamescene.node.getChildByName("Panel_BG");
        this.pBG = pBG;

        pBG.addTouchEventListener(function (sender, type) {
            if (type == ccui.Widget.TOUCH_ENDED) {
                _this.onTouchesEnd(sender, type);
            }
        })

        this.userScore = gamescene.node.getChildByName("Text_User_Score");
 
        //Util.setUserScore();
        
        var buttonCFG = gamescene.node.getChildByName("Button_CFG");
        buttonCFG.addTouchEventListener(function (sender, type) {
            if (type == ccui.Widget.TOUCH_ENDED) {
                if (GLOBAL_DATA.__playing == 0) {
                    return;
                }
                _this.unscheduleUpdate();
                var pauseLayer = ccs.load(res["res@Layer_GamePause.json"]);
                _this.addChild(pauseLayer.node, 10);

                GamePausePanelControl.init(pauseLayer, _this);
                GamePausePanelControl.bind();
            }
        }, this);

        var cfgLayer = ccs.load(res["res@Layer_GameStart.json"]);
        cfgLayer.node.setPosition(cc.p(0,0));
        _this.addChild(cfgLayer.node, 10);

        GameStartPanelControl.init(cfgLayer, _this);
        GameStartPanelControl.bind();

        this.initHands();
        
       
    },
    
    update: function (dt) {
        var _this = this;
        var allFrames = cc.director.getTotalFrames();
        if (allFrames % GLOBAL_DATA.AddEnemyInterval===0) {
            _this.addEnemy();
        }
        _this.enemyGoDown();
        _this.check();
    },
    onTouchesEnd: function (sender, type) {
        if (GLOBAL_DATA.__playing===0) {
            return;
        }

        var p = sender.getTouchEndPosition();
        var railIdx = Util.getRailIdx(p);
        var currentHand = this.playerHands[railIdx];
        currentHand.handValue++;
        currentHand.changTo(currentHand.handValue%3);
        return false
    },
    



    initHands: function () {
        var _this = this;
      
        var h0 = new Hand();
        h0.setPosition(cc.p(120, _this._handPositionY));
        h0.initWithVal(0);
        this.addChild(h0);
        this.playerHands.push(h0);

        var h1 = new Hand();
        h1.setPosition(cc.p(320, _this._handPositionY));
        h1.initWithVal(1);
        this.addChild(h1);
        this.playerHands.push(h1);

        var h2 = new Hand();
        h2.setPosition(cc.p(520, _this._handPositionY));
        h2.initWithVal(2);
        this.addChild(h2);
        this.playerHands.push(h2);
    },

    addEnemy: function () {
        var _this = this;
        var t3 = 213.33333333333334;
        var hVal = _.random(0, 2);
        var eVal = 0;
        var hCount = 1;
        var enemysArray = [0, 0, 0];

        (function () {


        

        
        if (GLOBAL_DATA.UserSocre < 1) {
            var idx = _.random(0, 2);
            var enemy = new Enemy();
            enemy.retain();
            enemy.initWithVal(_.random(0, 2),0);
            enemysArray[idx] = enemy;
            return;
        }

        if (GLOBAL_DATA.UserSocre < 10) {
           
          
                var idx = _.random(0, 2);
                var idx1 = _.random(0, 2);
                while (idx1==idx) {
                    idx1 = _.random(0, 2);
                }
                var enemy = new Enemy();
                enemy.retain();
                enemy.initWithVal(_.random(0, 2), _.random(0, 2));
                var enemy1 = new Enemy();
                enemy1.retain();
                enemy1.initWithVal(_.random(0, 2), _.random(0, 2));

                enemysArray[idx] = enemy;
                enemysArray[idx1] = enemy1;
                return;
        
        }
        if (GLOBAL_DATA.UserSocre < 30) {
            if ($.percent(70)) {
                var idx = _.random(0, 2);
                var idx1 = _.random(0, 2);
                while (idx1 == idx) {
                    idx1 = _.random(0, 2);
                }
                var enemy = new Enemy();
                enemy.retain();
                enemy.initWithVal(_.random(0, 2), _.random(0, 2));
                var enemy1 = new Enemy();
                enemy1.retain();
                enemy1.initWithVal(_.random(0, 2), _.random(0, 2));

                enemysArray[idx] = enemy;
                enemysArray[idx1] = enemy1;
                return;
            }

            if ($.percent(30)) {
                 
                var enemy = new Enemy();
                enemy.retain();
                enemy.initWithVal(_.random(0, 2), _.random(0, 2));
                var enemy1 = new Enemy();
                enemy1.retain();
                enemy1.initWithVal(_.random(0, 2), _.random(0, 2));
                var enemy2 = new Enemy();
                enemy2.retain();
                enemy2.initWithVal(_.random(0, 2), _.random(0, 2));

                enemysArray[0] = enemy;
                enemysArray[1] = enemy1;
                enemysArray[2] = enemy2;
                return;
            }

         


        }
        if (GLOBAL_DATA.UserSocre < 50000) {
            if ($.percent(40)) {
                var idx = _.random(0, 2);
                var idx1 = _.random(0, 2);
                while (idx1 == idx) {
                    idx1 = _.random(0, 2);
                }
                var enemy = new Enemy();
                enemy.retain();
                enemy.initWithVal(_.random(0, 2), _.random(0, 2));
                var enemy1 = new Enemy();
                enemy1.retain();
                enemy1.initWithVal(_.random(0, 2), _.random(0, 2));

                enemysArray[idx] = enemy;
                enemysArray[idx1] = enemy1;
                return;
            }

            if ($.percent(60)) {

                var enemy = new Enemy();
                enemy1.retain();
                enemy.initWithVal(_.random(0, 2), _.random(0, 2));
                var enemy1 = new Enemy();
                enemy1.retain();
                enemy1.initWithVal(_.random(0, 2), _.random(0, 2));
                var enemy2 = new Enemy();
                enemy2.retain();
                enemy2.initWithVal(_.random(0, 2), _.random(0, 2));

                enemysArray[0] = enemy;
                enemysArray[1] = enemy1;
                enemysArray[2] = enemy2;
                return;
            }
 


        }




        })()

        for (var i = 0; i < enemysArray.length; i++) {
            var emy = enemysArray[i];
            if (emy) {
                switch (i) {
                    case 0: x = 120; break;
                    case 1: x = 320; break;
                    case 2: x = 520; break;
                }
                emy.setPosition(cc.p(x, 1300+_.random(-100,100)));
                _this.addChild(emy);
                _this.enemyHands[i].push(emy);
            }

        }
 
    },
    enemyGoDown: function () {
        var _this=this;
        for (var i = 0; i < _this.enemyHands.length; i++) {
            for (var j = 0; j < _this.enemyHands[i].length; j++) {
                var enemy = _this.enemyHands[i][j];
                var y = enemy.getPositionY();
                y -= GLOBAL_DATA.Speed;
                enemy.setPositionY(y);
            }
        }
    },

    check: function () {
        var _this = this;
        for (var i = 0; i < _this.enemyHands.length; i++) {
            for (var j = 0; j < _this.enemyHands[i].length; j++) {
                var enemy = _this.enemyHands[i][j];
                var y = enemy.getPositionY();
                if (y < _this._handPositionY+100) {
                    
                    var playerHand = _this.playerHands[i];
                    var result = false;
                  
                    switch (enemy.colorValue) {
                        case 0:
                            var ck=Util.checkResult(playerHand.handValue, enemy.handValue);
                            if (ck) {
                                GLOBAL_DATA.UserSocre++;
                                enemy.removeFromParent();
                                _this.enemyHands[i].splice(j, 1);
                                _this.setUserScoreText();
                                Util.playEffic("res/Audio/get_0.mp3");
                                var _emitter = new cc.ParticleSystem("res/hand_expload.plist");
                                _emitter.setPosition(enemy.getPosition());
                                _emitter.retain();

                                _emitter.texture = cc.textureCache.addImage("res/particle.png");
                                _emitter.shapeType = cc.ParticleSystem.STAR_SHAPE;

                                _emitter.setAutoRemoveOnFinish(true);
                                _this.addChild(_emitter);

                            } else {
                                GLOBAL_DATA.__playing = 0;
                                _this.unscheduleUpdate();
                                _this.blinkAndTurnGameOver(enemy);
                                Util.playEffic("res/Audio/wrong.mp3");

                            }

                            ; break;

                        case 1:
 
                            if (playerHand.handValue == enemy.handValue) {
                                GLOBAL_DATA.UserSocre++;
                                enemy.removeFromParent();
                                _this.enemyHands[i].splice(j, 1);
                                _this.setUserScoreText();
                                Util.playEffic("res/Audio/get_1.mp3");
                                var _emitter = new cc.ParticleSystem("res/hand_expload.plist");
                                _emitter.setPosition(enemy.getPosition());
                                _emitter.retain();

                                _emitter.texture = cc.textureCache.addImage("res/particle.png");
                                _emitter.shapeType = cc.ParticleSystem.STAR_SHAPE;

                                _emitter.setAutoRemoveOnFinish(true);
                                _this.addChild(_emitter);
                            } else {
                                GLOBAL_DATA.__playing = 0;
                                _this.unscheduleUpdate();
                                _this.blinkAndTurnGameOver(enemy);
                                Util.playEffic("res/Audio/wrong.mp3");
                            }

                            ; break;

                        case 2:
                            
                            var ck = !Util.checkResult(playerHand.handValue, enemy.handValue);
                            if (ck && playerHand.handValue != enemy.handValue) {
                                GLOBAL_DATA.UserSocre++;
                                enemy.removeFromParent();
                                _this.enemyHands[i].splice(j, 1);
                                _this.setUserScoreText();
                                Util.playEffic("res/Audio/get_2.mp3");
                                var _emitter = new cc.ParticleSystem("res/hand_expload.plist");
                                _emitter.setPosition(enemy.getPosition());
                                _emitter.retain();

                                _emitter.texture = cc.textureCache.addImage("res/particle.png");
                                _emitter.shapeType = cc.ParticleSystem.STAR_SHAPE;

                                _emitter.setAutoRemoveOnFinish(true);
                                _this.addChild(_emitter);
                            } else {
                                GLOBAL_DATA.__playing = 0;
                                _this.unscheduleUpdate();
                                _this.blinkAndTurnGameOver(enemy);
                                Util.playEffic("res/Audio/wrong.mp3");
                            }

                            ; break;
                    }
                }
            }
        }

    },
    blinkAndTurnGameOver: function (enemy) {
        var _this = this;
        var blink = cc.blink(2, 4);
        var cal = cc.callFunc(function () {
            var cfgLayer = ccs.load(res["res@Layer_GameOver.json"]);
            _this.addChild(cfgLayer.node, 10);

            GameOverPanelControl.init(cfgLayer, _this);
            GameOverPanelControl.bind();
        });
        var sec = cc.sequence(blink, cal);
        enemy.runAction(sec);
        cc.audioEngine.setMusicVolume(0.2);
        



    },

    restart: function () {
        var _this = this;
        GLOBAL_DATA.UserSocre = 0;

        for (var i = 0; i < _this.enemyHands.length; i++) {
            for (var j = 0; j < _this.enemyHands[i].length; j++) {
                var enemy = _this.enemyHands[i][j];
                enemy.removeFromParent();
            }
        }
        GLOBAL_DATA.__playing = 1;
        _this.enemyHands = [[], [], []];
        _this.setUserScoreText();
        cc.audioEngine.setMusicVolume(0.4);
    },

    setUserScoreText: function () {
        var txt = this.gamescene.node.getChildByName("Text_User_Score"); 
        txt.setString(GLOBAL_DATA.UserSocre);
        if (GLOBAL_DATA.UserSocre > GLOBAL_DATA.UserBest) {
            GLOBAL_DATA.UserBest = GLOBAL_DATA.UserSocre;
        }
        GLOBAL_DATA.save();
    },

  

    onEnter: function () {
        this._super();
    },
    onExit: function () {
        this._super();
    }
});