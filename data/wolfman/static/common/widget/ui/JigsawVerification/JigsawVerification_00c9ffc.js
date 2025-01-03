define("common:widget/ui/JigsawVerification/JigsawVerification.js", function(require, exports, module) {
    function JigsawVerification() {
        this._visible = !1, this._state = "unverify", this._lock = !1, this._init()
    }
    require.loadCss({
        content: '@charset "UTF-8";#verify-bg{position:absolute;overflow:hidden;top:0;left:0;width:100%;height:100%;background-color:rgba(0,0,0,.7);z-index:100001;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;opacity:0;display:none;-webkit-transition:opacity .2s ease-out;transition:opacity .2s ease-out}#verify-window{color:#333;width:360px;height:370px;position:absolute;font-size:12px;background:#fff;text-align:center;left:50%;margin-left:-180px;top:53%;margin-top:-185px;-webkit-transition:top .2s ease-out;transition:top .2s ease-out}#verify-window p{line-height:12px}#verify-window h2{font-size:18px;line-height:18px;margin-top:26px;margin-bottom:12px;font-weight:400}#verify-window #verify-btn-close,#verify-window #verify-drag-container,#verify-window #verify-drag,#verify-window #verify-info span.icon{background:url(//webmap1.bdimg.com/wolfman/static/common/images/new/verification-ui_a0e3016.png) no-repeat}#verify-window #verify-btn-close{width:20px;height:21px;position:absolute;cursor:pointer;border:0;outline:0;top:7px;right:7px;background-position:3px 3px}#verify-window #verify-img-container{position:relative;width:340px;height:200px;margin:10px;background:#555}#verify-window #verify-img{width:340px;height:200px}#verify-window #verify-img-block{position:absolute;width:120px;height:120px;top:40px;left:0}#verify-window #verify-drag-container{height:34px;width:340px;margin-left:10px;position:relative}#verify-window #verify-drag{position:absolute;width:61px;height:32px;top:2px;left:30px;cursor:pointer}#verify-window #verify-info{text-align:left;margin-left:12px;margin-top:14px;line-height:12px}#verify-window #verify-info span.icon{background-position:-18px 0;display:inline-block;width:17px;height:18px;position:relative}#verify-window #verify-info span.text{position:relative;top:-3px}#verify-window #verify-info-text{margin-left:6px}#verify-window #verify-info.fail span.icon{background-position:0 -18px;top:1px}#verify-window #verify-info.ok span.icon{background-position:-18px -18px;top:1px}#verify-window #verify-btn-close,#verify-window #verify-drag-container,#verify-window #verify-drag,#verify-window #verify-info span.icon{background-size:440px 36px}#verify-window #verify-drag-container{background-position:-36px 0}#verify-window #verify-drag{background-position:-378px -2px}@media only screen and (-webkit-min-device-pixel-ratio:2),(-webkit-min-device-pixel-ratio:2),(min-resolution:2dppx),(min-resolution:192dpi){#verify-window #verify-btn-close,#verify-window #verify-drag-container,#verify-window #verify-drag,#verify-window #verify-info span.icon{background-image:url(//webmap1.bdimg.com/wolfman/static/common/images/retina/verification-ui-2x_a1631de.png)}}',
        name: "JigsawVerification"
    }), JigsawVerification.prototype._init = function() {
        var tpl = [function(_template_object) {
            var _template_fun_array = [],
                fn = function(__data__) {
                    var _template_varName = "";
                    for (var name in __data__) _template_varName += "var " + name + '=__data__["' + name + '"];';
                    eval(_template_varName), _template_fun_array.push('<div id="verify-bg">    <div id="verify-window" >        <input id="verify-btn-close" type="button" class="btn close">        <h2>人机验证</h2>        <p>由于你的操作过于频繁，请拖动滑块进行人机验证</p>        <div id="verify-img-container">        </div>        <div id="verify-drag-container" >            <span id="verify-drag" class="btn"></span>        </div>        <div id="verify-info">            <span class="icon"></span><span id="verify-info-text" class="text">', "undefined" == typeof verifyInfo ? "" : baidu.template._encodeHTML(verifyInfo), "</span>        </div>    </div></div>"), _template_varName = null
                }(_template_object);
            return fn = null, _template_fun_array.join("")
        }][0];
        baidu("body").append(tpl({
            verifyInfo: "待验证",
            verifyImageUrl: "/static/images/retina/verify-image.jpg",
            verifyImageBlockUrl: "/static/images/retina/verify-image-block.png"
        })), this._window = baidu("#verify-window");
        var me = this;
        baidu("#verify-btn-close").on("click", function(i) {
            me.close(), i.stopPropagation()
        });
        var msdown = !1,
            dragBtn = baidu("#verify-drag");
        this._dragInitX = 10, dragBtn.on("mousedown", function(i) {
            me._lock !== !0 && (msdown = !0, me._msdownX = i.clientX, me._jigsawImage = baidu("#verify-img-block"))
        }), baidu("#verify-bg").on("mousemove", function(i) {
            if (msdown !== !1) {
                var e = i.clientX - me._msdownX,
                    t = e + me._dragInitX;
                t > 220 ? t = 220 : 0 > t && (t = 0), dragBtn.css("left", t + 30 + "px"), me._jigsawImage.css("left", t + "px")
            }
        }), baidu("#verify-bg").on("mouseup", function() {
            me._lock || msdown && (msdown = !1, me._dragInitX = parseInt(dragBtn.css("left"), 10) - 30, me._lock = !0, me.sendData())
        })
    }, JigsawVerification.prototype.open = function(i, e, t, o, n) {
        this._originalUrl = i, this._verifyImgBase64Str = e, this._verifyImgBlockBase64Str = t, this._visible = !0, this._state = "unverify", this._onSuccess = o || null, this._onFailAndClose = n || null, this._updateImage(), this._updateInfo(), this._closeTimer && (clearTimeout(this._closeTimer), this._closeTimer = null), baidu("#verify-bg").show();
        var r = this;
        setTimeout(function() {
            baidu("#verify-bg").css("opacity", 1), r._window.css("top", "50%")
        }, 100)
    }, JigsawVerification.prototype.sendData = function() {
        var i = window.devicePixelRatio > 1 ? 2 : 1,
            e = this,
            t = this._dragInitX * i,
            o = "/?newmap=1&qt=auth&device_ratio=" + i + "&x=" + t + "&auth=" + encodeURIComponent(window.AUTH);
        baidu.sio.callByServer(o, function(i) {
            i && i.result && "fail" !== i.status ? "ok" === i.status && (e._state = "ok") : (e._state = "fail", e._verifyImgBase64Str = i.result.image, e._verifyImgBlockBase64Str = i.result.jigsawImage, e._updateImage()), i && i.result && (window.AUTH = i.result.auth), e._updateInfo()
        })
    }, JigsawVerification.prototype._reconstructUrl = function(i) {
        for (var e = i.split("&"), t = [], o = 0; o < e.length; o++) 0 !== e[o].indexOf("auth=") && 0 !== e[o].indexOf("ie=") && 0 !== e[o].indexOf("t=") && 0 !== e[o].indexOf("tn=") && t.push(e[o]);
        return t.join("&")
    }, JigsawVerification.prototype._updateImage = function() {
        var i = new Image;
        i.id = "verify-img-block", i.src = this._verifyImgBlockBase64Str;
        var e = new Image;
        e.id = "verify-img";
        var t = this;
        e.onload = function() {
            baidu("#verify-img-container").html(""), baidu("#verify-img-container").append(e).append(i), t.reset(), this.onload = null
        }, e.src = this._verifyImgBase64Str
    }, JigsawVerification.prototype.reset = function() {
        baidu("#verify-img-block").css("left", 0), baidu("#verify-drag").css("left", 30), this._dragInitX = 0, this._lock = !1
    }, JigsawVerification.prototype._updateInfo = function() {
        switch (this._state) {
            case "ok":
                baidu("#verify-info").removeClass("fail").addClass("ok"), baidu("#verify-info-text").text("验证成功，即将关闭");
                var i = this;
                this._countDownTimer = setTimeout(function() {
                    clearTimeout(i._countDownTimer), i._countDownTimer = null, i.close()
                }, 1e3);
                break;
            case "fail":
                baidu("#verify-info").removeClass("ok").addClass("fail"), baidu("#verify-info-text").text("验证失败，请重新拖动滑块");
                break;
            case "unverify":
                baidu("#verify-info").removeClass("ok").removeClass("fail"), baidu("#verify-info-text").text("待验证")
        }
    }, JigsawVerification.prototype.close = function() {
        this._window.css("top", "53%"), baidu("#verify-bg").css("opacity", 0), this._visible = !1, this._closeTimer && (clearTimeout(this._closeTimer), this._closeTimer = null);
        var i = this;
        if (this._closeTimer = setTimeout(function() {
                baidu("#verify-bg").hide(), i._closeTimer = null
            }, 200), this._countDownTimer && (clearTimeout(this._countDownTimer), this._countDownTimer = null), "ok" !== this._state) this._onFailAndClose && this._onFailAndClose();
        else if (this._originalUrl) {
            var e = this._reconstructUrl(this._originalUrl),
                t = e.indexOf("&qt="),
                o = e.substr(t + 4),
                n = require("common:widget/com/componentManager.js");
            n.go(o)
        } else this._onSuccess && this._onSuccess()
    }, module.exports = new JigsawVerification
});