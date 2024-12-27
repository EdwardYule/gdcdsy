define("common:widget/ui/messageCenter/messageCenter.js", function(require, exports, module) {
    var $messageCenter = T("#message-center"),
        $panel = T("#message-panel"),
        $entrance = T(".message-center-entrance"),
        $utilBox = T("#message-util-box"),
        panelShowed = !1,
        hasOpertaionCnt = !1,
        firstEnter = "",
        UserMgr = require("common:widget/ui/userMgr/userMgr.js"),
        nowTime = "",
        clickCloseTime = "",
        intervalTime = "",
        openType = !1,
        currentPanelType = "",
        currentSlideBarIcon = 0,
        messageDataList, messageDataLen, slideShowTimeId = null,
        style = "#message-panel .message-close{width:24px;height:23px;top:0;right:0;position:absolute;background:url(/static/images/op-close.png) no-repeat right 0;cursor:pointer}#message-panel .message-close:hover{background-position:0 0}#op-activity{background:#fff;padding:12px;overflow:hidden;width:333px;position:relative}#op-activity .qrcode-container{float:left;line-height:20px;height:95px;width:75px;margin-right:8px;text-align:center}#op-activity .activity-banner{overflow:hidden}@media only screen and (-webkit-min-device-pixel-ratio:2),(-webkit-min-device-pixel-ratio:2),(min-resolution:2dppx),(min-resolution:192dpi){#message-panel .message-close{background-image:url(/static/images/retina/op-close.png);background-size:auto 23px}}@keyframes fadeOut{0%{opacity:1}10%{opacity:.9}20%{opacity:.8}30%{opacity:.7}40%{opacity:.6}50%{opacity:.5}60%{opacity:.4}70%{opacity:.3}80%{opacity:.2}90%{opacity:.1}100%{opacity:0}}@-webkit-keyframes fadeOut{0%{opacity:1}10%{opacity:.9}20%{opacity:.8}30%{opacity:.7}40%{opacity:.6}50%{opacity:.5}60%{opacity:.4}70%{opacity:.3}80%{opacity:.2}90%{opacity:.1}100%{opacity:0}}.anim_fade{position:absolute;animation-name:fadeOut;-webkit-animation-name:fadeOut;animation-timing-function:ease-in-out;-webkit-animation-timing-function:ease-in-out;animation-duration:1s;-webkit-animation-duration:1s;animation-delay:0s;-webkit-animation-delay:0s;animation-fill-mode:forwards;-webkit-animation-fill-mode:forwards}";
    require.loadCss({
        content: style,
        name: "messagepanel"
    });
    var style = ".scenic3d-panel{line-height:20px;height:346px;width:500px;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:default}.scenic3d-panel .header{height:145px;background-image:url(//webmap0.bdimg.com/wolfman/static/common/images/scenic3d/hint-pic-1x_48f04ab.png);background-repeat:no-repeat;background-size:500px auto;background-position:0 0;text-align:center;position:relative}.scenic3d-panel .header .title{padding-top:30px;font-size:24px}.scenic3d-panel .header .title span{letter-spacing:1px}.scenic3d-panel .header .title .beta{position:absolute;font-size:12px;top:27px;left:50%;margin-left:44px;height:16px;line-height:16px;width:42px;border:1px solid #e5e5e5;background-color:#fff;border-radius:2px;color:#666}.scenic3d-panel .header .info{padding-top:20px;font-size:16px}.scenic3d-panel .header .info .down{padding-top:4px}.scenic3d-panel .scenic3d-points{display:-webkit-box;display:-ms-flexbox;display:flex;display:-webkit-flex;-webkit-justify-content:space-around;-ms-flex-pack:distribute;justify-content:space-around;padding:0 30px}.scenic3d-panel .scenic3d-points .point{text-decoration:none;cursor:pointer}.scenic3d-panel .scenic3d-points .icon{background-image:url(//webmap0.bdimg.com/wolfman/static/common/images/scenic3d/hint-pic-1x_48f04ab.png);background-repeat:no-repeat;background-size:500px auto;height:115px;width:116px}.scenic3d-panel .scenic3d-points .huaguiyuan .icon{background-position:-53px -156px}.scenic3d-panel .scenic3d-points .qinghuiyuan .icon{background-position:-188px -149px}.scenic3d-panel .scenic3d-points .shijilian .icon{background-position:-327px -162px}.scenic3d-panel .scenic3d-points .name{text-decoration:none;text-align:center;margin:4px auto 0;color:#fff;font-size:14px;height:24px;line-height:24px;background-color:#2f87ff;width:72px;border-radius:2px}.scenic3d-panel .scenic3d-points .shijilian .name{width:110px}@media only screen and (-webkit-min-device-pixel-ratio:2),(-webkit-min-device-pixel-ratio:2),(min-resolution:2dppx),(min-resolution:192dpi){.scenic3d-panel .scenic3d-points .icon,.scenic3d-panel .header{background-image:url(//webmap1.bdimg.com/wolfman/static/common/images/scenic3d/hint-pic-2x_0055f84.png)}}";
    require.loadCss({
        content: style,
        name: "scenic3dpanel"
    });
    var styleOfPanel = "#message-panel .message-close{width:24px;height:23px;top:0;right:0;position:absolute;background:url(/static/images/op-close.png) no-repeat right 0;cursor:pointer}#message-panel .message-close:hover{background-position:0 0}#message-panel #activity-banner-panel{box-sizing:border-box;width:420px;height:420px;background-color:#fff;padding-top:39px;background:#fff 30px 145px url(//webmap1.bdimg.com/wolfman/static/common/images/activity-banner/background_47269be.png) no-repeat}#message-panel #activity-banner-panel .activity-title{font-size:20px;height:28px;line-height:28px;text-align:center;color:#000}#message-panel #activity-banner-panel .activity-description{margin-top:9px;font-size:16px;color:#888;line-height:16px;height:16px;text-align:center}#message-panel #activity-banner-panel .main-left{width:150px;float:left;margin-left:53px;margin-top:90px}#message-panel #activity-banner-panel .main-left p{font-size:12px;color:#000;height:18px;line-height:18px;text-align:center}#message-panel #activity-banner-panel .activity-qr-img{margin-bottom:9px;margin-left:7px;height:136px;width:136px}#message-panel #activity-banner-panel .activity-img{margin-top:10px;margin-left:16px;height:299px;width:167px}";
    require.loadCss({
        content: styleOfPanel,
        name: "activityPanel"
    });
    var styleOfMessageCenterPanel = '@charset "UTF-8";#message-center-panel{box-sizing:border-box;background-color:#fff}#message-center-panel .message-center-img{opacity:0;position:absolute;width:100%;height:100%}#message-center-panel #point{height:10px;position:absolute;left:50%;bottom:3%}#message-center-panel #point ul li{width:6px;height:6px;border:2px solid #fff;border-color:rgba(255,255,255,.3);border-radius:10px;list-style:none;background:rgba(0,0,0,.4);margin:0 5px;float:left;cursor:pointer}#message-center-panel #point ul li:hover{background:rgba(255,255,255,.4);border-color:rgba(0,0,0,.4)}#message-util-box{-ms-overflow-style:none;overflow:-moz-scrollbars-none;display:none;box-sizing:border-box;overflow-x:hidden;overflow-y:auto}#message-util-box .close-btn-indexpage{position:fixed;width:20px;height:20px;line-height:20px;font-size:28px;text-align:center;display:block;cursor:pointer;right:12px;top:70px;color:#ccc}#message-util-box .close-btn-indexpage:hover{color:#6DA1EA}#message-util-box::-webkit-scrollbar{width:0!important}';
    require.loadCss({
        content: styleOfMessageCenterPanel,
        name: "messageCenterPanel"
    });
    var DynamicBanner = require("common:widget/com/DynamicBanner/DynamicBanner.js"),
        messageCenter = {
            init: function() {
                var e = this;
                this.generateContent(function() {
                    e.checkNewMessage(), nowTime = (new Date).getTime(), clickCloseTime = parseInt(window.localStorage.getItem("clickCloseTime"), 0), nowTime && clickCloseTime && (intervalTime = e.calculateIntervalTime(nowTime, clickCloseTime)), firstEnter = window.localStorage.getItem("firstEnter") || !0, firstEnter = JSON.parse(firstEnter), (firstEnter || intervalTime && intervalTime > 24) && (window.trafficCtrl && window.trafficCtrl.opened || e.openPanel()), hasOpertaionCnt || ($panel.append('<div class="close-btn-indexpage" title="关闭">&times;</div>'), $utilBox.append('<div class="close-btn-indexpage" title="关闭">&times;</div>'))
                }), this.bindEvents(), T("#sbw_map") && 0 === parseInt(T("#sbw_map")[0].style.zIndex, 10) && listener.trigger("com.subway", "load")
            },
            bindEvents: function() {
                var e = this;
                $entrance.on("click", function() {
                    panelShowed ? e.closePanel() : (addStat("ui.messagecenter.clickshow", "show"), window.trafficCtrl && trafficCtrl.opened && trafficCtrl.close(), e.openPanel())
                }), $panel.on("click", ".login-btn.need-login", function() {
                    addStat("ui.messagecenter.login", "click"), UserMgr.login(void 0, void 0, "message-center")
                }), $panel.on("click", ".close-btn-indexpage", function() {
                    clickCloseTime = e.getClickTime(), window.localStorage.setItem("clickCloseTime", clickCloseTime), window.localStorage.setItem("firstEnter", !1), e.clearSetIntervalId(), addStat("ui.messagecenter.clickclose", "click"), e.closePanel()
                }), T("#tool-container").on("click", function() {
                    e.closePanel()
                }), $panel.on("click", ".message-close", function() {
                    e.closePanel()
                }), $panel.on("click", ".point", function() {
                    var e = $(this).data("uid");
                    addStat("gotoscenic3dpage.messagepanel", "click"), listener.trigger("toScenic3DPage", "click", {
                        uid: e,
                        from: "messagepanel"
                    })
                }), $panel.on("click", ".message-center-img", function() {
                    "util" === currentPanelType && ($("#message-center-panel").hide(), document.getElementById("message-util-box").style.display = "block")
                }), $panel.on("mouseover", ".message-center-img", function() {
                    e.clearSetIntervalId()
                }), $panel.on("mouseleave", ".message-center-img", function() {
                    e.doStartSlideShow()
                }), $panel.on("click", ".point-item", function() {
                    currentSlideBarIcon !== $(this).index() && (e.clearSetIntervalId(), e.doStartSlideShow(), e.imgDesaltOut(currentSlideBarIcon), currentSlideBarIcon = $(this).index(), e.imgDesaltIn(currentSlideBarIcon))
                }), document.addEventListener("visibilitychange", function() {
                    document.hidden === !0 ? e.clearSetIntervalId() : e.doStartSlideShow()
                }), listener.on("searchbox.search", function() {
                    e.closePanel()
                }), listener.on("ui.cardmgr", "add", function() {
                    e.closePanel()
                }), listener.on("usercenter.show", function() {
                    e.closePanel()
                }), listener.on("com.subway", "load", function() {
                    $messageCenter.hide(), e.closePanel()
                }), listener.on("com.subway", "unload", function() {
                    e.closePanel(), $messageCenter.show()
                }), listener.on("ipLocation.correct", function() {
                    e.closePanel()
                })
            },
            doStartSlideShow: function() {
                var e = this;
                return 1 >= messageDataLen ? void(currentPanelType = messageDataList[0].type) : void(slideShowTimeId = setInterval(function() {
                    e.imgDesaltOut(currentSlideBarIcon), currentSlideBarIcon = ++currentSlideBarIcon % messageDataLen, e.imgDesaltIn(currentSlideBarIcon)
                }, 5e3))
            },
            bannerShow: function(e) {
                !$(".message-center-img").eq(e).attr("send-type") && openType && ($(".message-center-img").eq(e).attr("send-type", "1"), addStat("ui.messagecenter.banner" + e + "show", "show"))
            },
            imgDesaltIn: function(e) {
                var t = this;
                $(".message-center-img").eq(e).animate({
                    opacity: 1
                }), t.bannerShow(e), t.pointItemOpen($(".point-item").eq(e)), currentPanelType = messageDataList[e].type
            },
            imgDesaltOut: function(e) {
                var t = this;
                $(".message-center-img").eq(e).animate({
                    opacity: 0
                }), t.bannerShow(e), t.pointItemClose($(".point-item").eq(e))
            },
            pointItemOpen: function(e) {
                $(e).css({
                    background: "hsla(0,0%,100%,.4)",
                    borderColor: "rgba(0,0,0,0.4)"
                })
            },
            pointItemClose: function(e) {
                $(e).css({
                    background: "rgba(0,0,0,.4)",
                    borderColor: "hsla(0,0%,100%,.3)"
                })
            },
            clearSetIntervalId: function() {
                slideShowTimeId && clearInterval(slideShowTimeId), slideShowTimeId = null
            },
            getOperationCnt: function() {
                return new Promise(function(e, t) {
                    var a = "https://zt.baidu.com/activity/api/config/get?key=a966a54fa149ba6f95aa4f2e7ab971ae";
                    T.jsonp(a, function(a) {
                        var i = a || {},
                            n = i.errno,
                            o = i.data;
                        n ? t() : (DynamicBanner.saveConfigInfo(o), e(o))
                    })
                })
            },
            getOperationData: function() {
                return new Promise(function(e, t) {
                    var a = "https://zt.baidu.com/activity/api/config/get?key=a170379a478f92a41dbde40e317ea653";
                    T.jsonp(a, function(a) {
                        var i = a || {},
                            n = i.errno,
                            o = i.data;
                        n ? t() : e(o)
                    })
                })
            },
            processOperationData: function(e) {
                var t = "//webmap1.bdimg.com/wolfman/static/common/images/qrcode-download/index-map-dowload-test_e676ccd.png",
                    a = "//webmap0.bdimg.com/wolfman/static/common/images/activity-banner/activity@2x_24b9112.png",
                    i = "世界很复杂，百度地图更懂你",
                    n = "精准导航、实时公交、发现周边更多功能等你体验",
                    o = "扫码下载百度地图APP",
                    s = "opera",
                    r = e || {},
                    l = {};
                if (e.constructor === Array && e.length > 0) {
                    var c = Number(window.localStorage.getItem("currentNum"));
                    c >= 0 && c < e.length - 1 ? window.localStorage.setItem("currentNum", c += 1) : window.localStorage.setItem("currentNum", 0), r = e[window.localStorage.getItem("currentNum")] || {}
                }
                return l.title = r.title || i, l.desc = r.desc || n, l.qrcode = r.qrcode || t, l.picUrl = r.picUrl || a, l.bottomTitle = r.bottomTitle || o, l.longImgUrl = r.longImgUrl || "", l.currentPanelType = r.type || s, l
            },
            generateContent: function(cb) {
                function getRandomInt(e, t) {
                    return Math.floor(Math.random() * (t - e + 1)) + e
                }
                var template = "";
                template = [function(_template_object) {
                    var _template_fun_array = [],
                        fn = function(__data__) {
                            var _template_varName = "";
                            for (var name in __data__) _template_varName += "var " + name + '=__data__["' + name + '"];';
                            eval(_template_varName), _template_fun_array.push('<div>    <div id="message-center-panel" style="width: ', "undefined" == typeof messageBoxWidth ? "" : baidu.template._encodeHTML(messageBoxWidth), "px; height: ", "undefined" == typeof messageBoxHeight ? "" : baidu.template._encodeHTML(messageBoxHeight), 'px;">        ');
                            for (var i = 0; messageDataLen > i; i++) _template_fun_array.push('            <img class="message-center-img" src="', "undefined" == typeof messageDataList[i].picUrl ? "" : baidu.template._encodeHTML(messageDataList[i].picUrl), '">        ');
                            if (_template_fun_array.push("        "), messageDataLen > 1) {
                                _template_fun_array.push('            <div id="point" style="width: ', "undefined" == typeof pointWidth ? "" : baidu.template._encodeHTML(pointWidth), "px; margin-left: ", "undefined" == typeof pointMargin ? "" : baidu.template._encodeHTML(pointMargin), 'px">                <ul>                    ');
                                for (var i = 0; messageDataLen > i; i++) _template_fun_array.push('                        <li class="point-item"></li>                    ');
                                _template_fun_array.push("                </ul>             </div>           ")
                            }
                            _template_fun_array.push('            </div>    <div id="message-util-box" style="min-height: ', "undefined" == typeof minMassageUtilBoxHight ? "" : baidu.template._encodeHTML(minMassageUtilBoxHight), "px; max-height: ", "undefined" == typeof maxMassageUtilBoxHight ? "" : baidu.template._encodeHTML(maxMassageUtilBoxHight), "px; width: ", "undefined" == typeof messageUtilBoxWidth ? "" : baidu.template._encodeHTML(messageUtilBoxWidth), "px; height: ", "undefined" == typeof massageUtilBoxHight ? "" : baidu.template._encodeHTML(massageUtilBoxHight), 'px;">        ');
                            for (var i = 0; messageDataLen > i; i++) _template_fun_array.push("            "), messageDataList[i].longImgUrl && _template_fun_array.push('                 <img src="', "undefined" == typeof messageDataList[i].longImgUrl ? "" : baidu.template._encodeHTML(messageDataList[i].longImgUrl), '"/>             '), _template_fun_array.push("        ");
                            _template_fun_array.push("    </div></div>"), _template_varName = null
                        }(_template_object);
                    return fn = null, _template_fun_array.join("")
                }][0];
                var defaultImage = "//webmap0.bdimg.com/wolfman/static/common/images/new/rightDownload_b292ead.png",
                    defaultImage2x = "//webmap0.bdimg.com/wolfman/static/common/images/new/rightDownload2_002367a.png",
                    defaultQrCodeImg = "//webmap1.bdimg.com/wolfman/static/common/images/activity-banner/qrcode_943a584.png",
                    defaultActivityImg = "//webmap0.bdimg.com/wolfman/static/common/images/activity-banner/activity_ace9c00.png",
                    defaultTitle = "世界很复杂，百度地图更懂你",
                    defatultActivityDescription = "精准导航、实时公交、发现周边更多功能等你体验",
                    defaultBottomTitle = "扫码下载百度地图APP",
                    defaultTpl = template({
                        title: defaultTitle,
                        acDescription: defatultActivityDescription,
                        qrcodeImage: defaultQrCodeImg,
                        activityImage: defaultActivityImg,
                        bottomTitle: defaultBottomTitle
                    }),
                    me = this,
                    operationCnt = this.getOperationCnt(),
                    messageBoxHeight = 210,
                    messageBoxWidth = 298,
                    massageUtilBoxHight = Math.ceil(window.innerHeight / 1.13),
                    messageUtilBoxWidth = massageUtilBoxHight / (694 / 420),
                    minMassageUtilBoxHight = 607,
                    maxMassageUtilBoxHight = 694;
                this.getOperationData().then(function(e) {
                    function t(e) {
                        for (n = 0; n < e.length; n++) e[n] && (a[n] = new Image, a[n].src = e[n])
                    }
                    for (var a = (me.processOperationData(e), []), i = [], n = 0; n < e.length; n++) i[n] = e[n].picUrl, e[n].longImgUrl && (i[e.length + 1] = e[n].longImgUrl);
                    if (t(i), e && e.constructor === Array) {
                        messageDataList = e, messageDataLen = e.length;
                        var o = 20 * e.length,
                            s = -(o / 2),
                            r = template({
                                messageDataList: messageDataList,
                                messageDataLen: messageDataLen,
                                messageBoxHeight: messageBoxHeight,
                                messageBoxWidth: messageBoxWidth,
                                massageUtilBoxHight: massageUtilBoxHight,
                                messageUtilBoxWidth: messageUtilBoxWidth,
                                minMassageUtilBoxHight: minMassageUtilBoxHight,
                                maxMassageUtilBoxHight: maxMassageUtilBoxHight,
                                pointWidth: o,
                                pointMargin: s
                            });
                        $panel.html(r), $(".message-center-img").eq(0).css("opacity", "1"), me.bannerShow(0), me.pointItemOpen($(".point-item").eq(0)), me.doStartSlideShow(), cb()
                    }
                }, function() {
                    $panel.html(defaultTpl), cb()
                })
            },
            checkNewMessage: function() {
                return hasOpertaionCnt ? void this.hasNoNewMessage() : void(this.isLogin ? this.hasNoNewMessage() : this.hasNewMessage())
            },
            hasNewMessage: function() {
                $messageCenter.addClass("has-message")
            },
            hasNoNewMessage: function() {
                $messageCenter.removeClass("has-message")
            },
            openPanel: function() {
                addStat("ui.messagecenter.show", "show"), addStat("ui.messagecenter.newqrcodeshow", "show"), this.renderItem && addStat("ui.messagecenter." + this.renderItem.message_type, "show"), $panel.addClass("message-panel-open"), openType = !0, panelShowed = !0, $("#message-center-panel").show(), document.getElementById("message-util-box").style.display = "none"
            },
            calculateIntervalTime: function(e, t) {
                if (e && t) {
                    var a = parseInt((e - t) / 1e3 / 60 / 60, 0);
                    return a
                }
            },
            getClickTime: function() {
                return clickCloseTime = (new Date).getTime()
            },
            closePanel: function() {
                addStat("ui.messagecenter.close", "click"), $panel.removeClass("message-panel-open"), openType = !1, panelShowed = !1
            }
        };
    module.exports = messageCenter
});