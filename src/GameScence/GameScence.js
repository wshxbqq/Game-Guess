/// <reference path="../GLOBAL_DATA.js" />
var GameScence = cc.Scene.extend({
    ctor: function () {
        this._super();
        this.init();
        return true;
    },
    init: function () {
        var __id;
        var uuid = cc.sys.localStorage.getItem("uuid");
        if (cc.sys.isNative) {
            __id = "47";
            $.device.gameCenter_AuthenticateLocalUser();
        } else {
            __id = "45";
        }
        if (!uuid) {
            uuid = $.createUUID();
            cc.sys.localStorage.setItem("uuid", uuid);
            $.dcUserDefault(__id, 1, 1);
        }
         GLOBAL_DATA.load();


    },
    onEnter: function () {
        this._super();
        var layer = new GameLayer();
        this.addChild(layer);
    }
});


