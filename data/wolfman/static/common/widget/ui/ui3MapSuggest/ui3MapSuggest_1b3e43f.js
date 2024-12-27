define("common:widget/ui/ui3MapSuggest/ui3MapSuggest.js", function(require, exports, module) {
    var initialize = function(opts) {
            function escapeXSS(t) {
                return (t || "").replace(/</g, "&lt;").replace(/>/g, "&gt;")
            }
            try {
                var config = require("common:widget/ui/config/config.js"),
                    modelConfig = config.modelConfig,
                    mapConfig = config.mapConfig,
                    util = require("common:widget/ui/util/util.js"),
                    ui3SetMyPlace = require("common:widget/route/setMyPlace/ui3SetMyPlace.js"),
                    hisMgr = require("common:widget/ui/searchHistory/hisMgr.js"),
                    toast = require("common:widget/ui/toast/toast.js"),
                    userMgr = require("common:widget/ui/userMgr/userMgr.js"),
                    ipLocation = require("common:widget/com/IpLocation/IpLocation.js"),
                    userAuth = require("common:widget/com/UserAuth/userAuth.js"),
                    DynamicBanner = require("common:widget/com/DynamicBanner/DynamicBanner.js"),
                    RouteNavDownloadBannerCard = require("common:widget/ui/ui3MapSuggest/downloadBanner.js"),
                    defaults = {
                        input: null,
                        url: "/su",
                        cityId: modelConfig.cityCode,
                        type: 0,
                        from: null,
                        adjustTop: 0,
                        adjustLeft: 0,
                        adjustWidth: 0,
                        "z-index": 1e3,
                        top: 0,
                        left: 0,
                        width: 0,
                        isAutoWidth: !1,
                        onSelect: null,
                        onClose: null,
                        onShowWrap: null,
                        onlyPrecise: !1,
                        showMyPlace: !1,
                        hasHistory: !0
                    };
                opts = T.extend(defaults, opts);
                var input = opts.input;
                if (!input) return;
                "$DOM" !== T.type(input) && (input = opts.input = T(opts.input));
                var wrap, that, wrapType, HOVER_CLASS = "ui3-suggest-item-hover",
                    body = T(document.body),
                    isOwnSuggestWrap = !0,
                    keyMap = {
                        16: 1,
                        17: 1,
                        18: 1,
                        27: 1,
                        91: 1,
                        92: 1,
                        38: 1,
                        40: 1,
                        13: 1
                    },
                    bannerConfigTable = {
                        bus: {
                            subTitle: "查看公交到站时间",
                            imgUrl: "//webmap0.bdimg.com/wolfman/static/common/images/qrcode-download/bus-map-dowload-test_773fc46.png"
                        },
                        drive: {
                            subTitle: "语音交互更方便",
                            imgUrl: "//webmap0.bdimg.com/wolfman/static/common/images/qrcode-download/car-map-dowload-test_7270b12.png"
                        },
                        walk: {
                            subTitle: "体验AR导航",
                            imgUrl: "//webmap0.bdimg.com/wolfman/static/common/images/qrcode-download/walk-map-dowload-test_749dffd.png"
                        },
                        bike: {
                            subTitle: "世界很复杂，百度地图更懂你",
                            imgUrl: "//webmap0.bdimg.com/wolfman/static/common/images/qrcode-download/ride-map-dowload-test_92ce50f.png"
                        }
                    },
                    ui3MapSuggest = that = {
                        work: function() {
                            that.isInSuggestList = !1, this.bindInputEvents()
                        },
                        bindInputEvents: function() {
                            input.bind("keyup", this.processKeyUp).bind("keydown", this.processKeyDown).bind("focus", this.processFocus).bind("click", this.processClick).bind("blur", this.processBlur).bind("copy", this.processCopy).bind("paste", this.processPaste.bind(this))
                        },
                        processFocus: function() {
                            this.onBlur = !1
                        },
                        processBlur: function() {
                            that.isInSuggestList || (this.onBlur = !0, setTimeout(function() {
                                that.hide()
                            }, 150))
                        },
                        processClick: function() {
                            !opts.hasHistory || "" !== T.trim(input.val()) || that.onEnter || that.onBlur || setTimeout(function() {
                                that.processData(), "search" == opts.from ? addStat("search.history.sug", "show") : "route" == opts.from ? addStat("route.history.sug", "show") : "infowindow" === opts.from && addStat("infowindow.history.sug", "show"), addStat("total.history.sug", "show")
                            }, 200)
                        },
                        processKeyDown: function(t) {
                            function e(t) {
                                var e = t ? !1 : {
                                    extra: r.attr("data-extra")
                                };
                                input.data("sugData", e)
                            }
                            that.onCopy = !1, that.onEnter = !1, that.onBlur = !1;
                            var a = t.keyCode;
                            if (13 !== a && input.data("sugData", !1), !(a in keyMap && wrap)) return 13 != a || wrap || (that.onEnter = !0), void(9 == a && (that.onBlur = !0));
                            27 === a && that.hide();
                            var i;
                            wrap && (i = wrap.find("." + HOVER_CLASS));
                            var o;
                            i && !i.length ? o = 0 : i && (o = i.prevAll("li").length + 1);
                            var s, n = that.userKey;
                            wrap && (s = wrap.find("li"));
                            var r, l;
                            if (38 === a && (0 === o ? (r = s.eq(-1).addClass(HOVER_CLASS), input.val(r.attr("data-key"))) : (i.removeClass(HOVER_CLASS), 1 === o ? (input.val(n), l = !0) : (r = s.eq(o - 2).addClass(HOVER_CLASS), input.val(r.attr("data-key")))), e(l)), 40 === a) {
                                var d = 0;
                                void 0 !== that.list ? d = that.list.length : void 0 !== that.hisList && null !== that.hisList && (d = that.hisList.length), 0 === o ? (r = s.eq(0).addClass(HOVER_CLASS), input.val(r.attr("data-key"))) : (i.removeClass(HOVER_CLASS), o === s.length ? (input.val(n), l = !0) : (r = s.eq(o).addClass(HOVER_CLASS), input.val(r.attr("data-key")))), e(l)
                            }
                            if (13 == a) {
                                if (that.hide(), 0 === o) return void(that.onEnter = !0);
                                var p = i.attr("data-target");
                                if (p) ui3SetMyPlace.select(p, input);
                                else {
                                    var c = i.attr("data-key"),
                                        u = i.attr("data-location"),
                                        g = i.attr("data-extra") || "";
                                    if (input.val(c), "clear" === g) return hisMgr.clearSearchData(), void toast.show("删除成功");
                                    opts.onSelect && opts.onSelect.call(this, c, u, g)
                                }
                            }
                            t.preventDefault()
                        },
                        processInput: function() {},
                        processPaste: function(t) {
                            var e = this;
                            setTimeout(function() {
                                e.processKeyUp(t)
                            }, 0)
                        },
                        processCopy: function() {
                            that.onCopy = !0
                        },
                        processKeyUp: function(t) {
                            if (!that.onCopy) {
                                var e = t.keyCode;
                                if (!(e in keyMap)) {
                                    var a = input.val();
                                    if ("" === a && that.wrap) {
                                        if (that.hide(), !opts.hasHistory) return;
                                        that.processData(), addStat("search.history.sug", "show")
                                    }
                                    that.userKey = a, that.sendRequest({
                                        url: opts.url,
                                        cityId: opts.cityId,
                                        query: a,
                                        type: opts.type
                                    })
                                }
                            }
                        },
                        sendRequest: function(t) {
                            if ("" !== t.query) {
                                t = T.extend({
                                    url: "",
                                    query: "",
                                    cityId: "",
                                    type: ""
                                }, t);
                                var e = util.formatBounds({
                                    margins: [0, 0, 0, mapConfig.leftMargin]
                                });
                                0 == that.readyState ? clearTimeout(that.timeout) : 1 == that.readyState && that.xhr.abort();
                                var a = {
                                        wd: t.query,
                                        cid: t.cityId || opts.cityId,
                                        type: t.type,
                                        newmap: 1,
                                        b: e,
                                        t: +new Date,
                                        pc_ver: 2,
                                        qt: "sug"
                                    },
                                    i = {
                                        pcevaname: "pc4.1",
                                        newfrom: "zhuzhan_webmap"
                                    };
                                window.AUTH && (i.auth = encodeURIComponent(window.AUTH)), window.SECKEY && (i.seckey = encodeURIComponent(window.SECKEY)), that.readyState = 0, that.timeout = setTimeout(function() {
                                    that.readyState = 1, that.xhr = T.ajax(t.url, {
                                        dataType: "json",
                                        data: a,
                                        headers: i,
                                        success: function(e, a) {
                                            var i = a.getResponseHeader("Auth");
                                            i && (window.AUTH = i), that.readyState = 2, that.data = e, e && that.processData(t.query, "search")
                                        }
                                    });
                                    var o = "&wd=" + t.query + "&cid=" + t.cityId || opts.cityId + "&type=" + t.type + "&b=" + e;
                                    userAuth.sendSugg(o)
                                }, 200)
                            }
                        },
                        processData: function(t) {
                            var e = this;
                            if (t) {
                                if ("" === T.trim(input.val()) || that.onEnter || that.onBlur) return;
                                var a = this.data,
                                    i = a.s;
                                if (!i || !i.length) return void this.hide();
                                var o = hisMgr.getSearchData();
                                o.done(function(a) {
                                    e.generateHTML({
                                        query: t,
                                        sug: i,
                                        history: a
                                    })
                                })
                            } else {
                                var o = hisMgr.getSearchData();
                                o.done(function(t) {
                                    t.length || opts.showMyPlace ? e.generateHTML({
                                        history: t
                                    }) : (e.wrap && e.wrap.hide(), "search" === opts.from && e.generateHTML({
                                        history: t
                                    }))
                                })
                            }
                        },
                        getSubTitle: function() {
                            if (opts && "route" === opts.from) {
                                var t = $("#route-searchbox-content");
                                if (!t) return bannerConfigTable.bike.subTitle;
                                for (key in bannerConfigTable)
                                    if (t.hasClass(key)) return bannerConfigTable[key].subTitle;
                                return bannerConfigTable.bike.subTitle
                            }
                            return bannerConfigTable.bike.subTitle
                        },
                        getQrCodeUrl: function() {
                            var t = $("#route-searchbox-content"),
                                e = "//webmap1.bdimg.com/wolfman/static/common/images/qrcode-download/index-map-dowload-test_e676ccd.png";
                            if (opts && "route" === opts.from) {
                                if (!t) return e;
                                for (key in bannerConfigTable)
                                    if (t.hasClass(key)) return bannerConfigTable[key].imgUrl;
                                return e
                            }
                            return "//webmap0.bdimg.com/wolfman/static/common/images/qrcode-download/indexsearch-map-dowload-test_70e0ee3.png"
                        },
                        generateHTML: function(param) {
                            function deployList() {
                                var history = param.history,
                                    hisList = [],
                                    length = 0,
                                    historyTpl, listTpl;
                                if (param.query) {
                                    history.length && opts.hasHistory && T.each(history, function(t, e) {
                                        e.wd.indexOf(param.query) >= 0 && hisList.length < 3 && hisList.push(e)
                                    }), historyTpl = that.processList(hisList, 2), 0 !== hisList.length && addStat("search.sug.history.show", "show"), length = length + hisList.length + param.sug.length - 10;
                                    for (var i = 0; length > i; i++) param.sug.pop();
                                    listTpl = that.processList(param.sug, 0), that.list = param.sug, wrapType = "sug", wrap.find("ul").empty().append(historyTpl + listTpl)
                                } else {
                                    var listTpl = "",
                                        template = [function(_template_object) {
                                            var _template_fun_array = [],
                                                fn = function(__data__) {
                                                    var _template_varName = "";
                                                    for (var name in __data__) _template_varName += "var " + name + '=__data__["' + name + '"];';
                                                    eval(_template_varName), _template_fun_array.push('<div class="city-special-container">    <div class="city-special-list">        <div class="city-special-item" data-type="channel" data-key="美食" data-stat-code="sug.channel.cater">    <div class="city-list-item cater" >找美食</div>        </div>        <div class="city-special-item" data-type="channel" data-key="酒店" data-stat-code="sug.channel.hotel">    <div class="city-list-item hotel" >订酒店</div>        </div>        <div class="city-special-item" data-type="channel" data-key="公交站" data-stat-code="sug.channel.busstop">            <div class="city-list-item busstop" >公交站</div>        </div>    </div>    <div class="city-normal-list">        <div class="city-normal-item" data-type="channel" data-key="景点" data-stat-code="sug.channel.scenery">景点</div>        <div class="city-normal-item" data-type="channel" data-key="电影院" data-stat-code="sug.channel.movie">电影院</div>        <div class="city-normal-item city-normal-last" data-type="channel" data-key="银行" data-stat-code="sug.channel.bank">银行</div>    </div>    <div class="clear-history">        <span class="clear-login"><a class="clear-login-link">立即登录</a>可同步云端历史记录</span>    </div></div>'), _template_varName = null
                                                }(_template_object);
                                            return fn = null, _template_fun_array.join("")
                                        }][0];
                                    "search" === opts.from && (modelConfig && 2 === modelConfig.cityType || 3 === modelConfig.cityType) && (listTpl += template()), wrapType = "history", opts.showMyPlace && ("success" === ipLocation.status && (listTpl += that.processIpLocationList(), length += 1), listTpl += that.processMyPlaceList(), length += 2, addStat("indexleftmenu.setMyPlace.show", "click", {})), history.length && (listTpl += that.processList(history, 2, "only-history")), that.hisList = history, wrap.find("ul").empty().append(listTpl), userMgr.defferd.fail(function() {
                                        wrap.find(".clear-login").show()
                                    })
                                }
                            }
                            var history = param.history;
                            if (this.wrap) {
                                var subTitle = this.getSubTitle(),
                                    subTitleEl = $("#ui3-suggest-wrap .leadDownloadCard .download-banner .sub-title");
                                subTitleEl && subTitleEl.text(subTitle);
                                var imgEl = $("#ui3-suggest-wrap .leadDownloadCard .download-banner .download-img"),
                                    qrcodeUrl = this.getQrCodeUrl();
                                imgEl && imgEl.attr("src", qrcodeUrl), "infowindow" === opts.from && this.setPosAndSize(), deployList()
                            } else {
                                if (window.ui3MapSuggestWrap) wrap = this.wrap = window.ui3MapSuggestWrap.hide().remove();
                                else {
                                    var wrapTpl = ['<div class="ui3-suggest-wrap" id="ui3-suggest-wrap">', '<div id="ui3-suggest-scroll">', "    <ul>", "    </ul>", "</div>", "</div>"];
                                    window.ui3MapSuggestWrap = wrap = this.wrap = T(wrapTpl.join(""));
                                    var downloadEl = document.querySelector("#ui3-suggest-wrap .leadDownloadCard");
                                    if (!downloadEl) {
                                        var leadDownloadCard = '<div class="leadDownloadCard"></div>',
                                            template = [function(_template_object) {
                                                var _template_fun_array = [],
                                                    fn = function(__data__) {
                                                        var _template_varName = "";
                                                        for (var name in __data__) _template_varName += "var " + name + '=__data__["' + name + '"];';
                                                        eval(_template_varName), _template_fun_array.push('<div class="download-banner">    <img src="', "undefined" == typeof qrcodeUrl ? "" : baidu.template._encodeHTML(qrcodeUrl), '" alt="二维码" width="60" height="60" class="download-img"/>    <div class="qrcode-box"></div>    <div>        <p class="title">扫码下载百度地图</p>        <p class="sub-title">', "undefined" == typeof subTitle ? "" : baidu.template._encodeHTML(subTitle), '</p>    </div>    <div class="close-btn-download-banner">×</div></div>'), _template_varName = null
                                                    }(_template_object);
                                                return fn = null, _template_fun_array.join("")
                                            }][0],
                                            subTitle = this.getSubTitle(),
                                            qrcodeUrl = this.getQrCodeUrl(),
                                            banner = template({
                                                qrcodeUrl: qrcodeUrl,
                                                subTitle: subTitle
                                            }),
                                            wrapEl = T(leadDownloadCard);
                                        wrapEl.append(banner), wrap.append(wrapEl), window.ui3MapSuggestWrap = this.wrap = wrap
                                    }
                                }
                                this.setPosAndSize(), deployList(), wrap.appendTo(document.body), DynamicBanner.showStaticQrCode({
                                    bannerContainer: "#ui3-suggest-wrap .leadDownloadCard"
                                })
                            }
                            var name = RouteNavDownloadBannerCard.prototype.getConfigName();
                            DynamicBanner.renderDynamicTitle({
                                name: name,
                                bannerContainer: ".leadDownloadCard"
                            });
                            var leadCard = this.wrap.find(".leadDownloadCard");
                            leadCard.css(param.sug ? {
                                display: "none"
                            } : {
                                display: "block"
                            }), this.bindSuggestEvents(), wrap.suggestInputTarget !== input && (isOwnSuggestWrap = !1, this.setPosAndSize()), listener.trigger("ui.suggest", "show"), param.history.length > 0 && T(".city-special-container .clear-history").css("display", "none"), wrap.show(), wrap.find("li").width(wrap.width());
                            var scrollWrap = T("#ui3-suggest-scroll");
                            scrollWrap.width(wrap.width());
                            var height = document.documentElement.clientHeight - wrap.offset().top - 70,
                                contentHeight = wrap.find("ul").height();
                            height = Math.min(height, contentHeight), scrollWrap.height(height), 10 > height && wrap.hide(), addStat("searchbox.sug.show", "show"), wrap.suggestInputTarget = input, opts.onShowWrap && opts.onShowWrap.call(this, wrap, input)
                        },
                        bindGEvents: function() {},
                        processList: function(t, e, a) {
                            var i = [];
                            if (T.each(t, function(t, a) {
                                    var o;
                                    0 == e ? (a = a.split("$"), (!opts.onlyPrecise || a[5]) && (o = void 0 === a[6] || "" === a[6] || void 0 === a[7] || "" === a[7] ? that.processItem("sug", a[3], a[0] + a[1] + a[2], a[5]) : that.processItem("sug", a[3], a[0] + a[1] + a[2], a[5], "", "", a[6] + a[7] + a[2]), i.push(o))) : 2 === e ? (o = that.processItem("history", a.wd, a.wd2, "", "history", a.platform ? a.platform : "3"), i.push(o)) : 3 === e && (a = a.split("-"), o = that.processItem("history", a[0], a[1]), i.push(o))
                                }), 2 === e && "only-history" === a) {
                                var o = "删除历史";
                                ("route" === opts.from || "infowindow" === opts.from) && (o = "删除历史");
                                var s = ['<li class="clear-history" data-extra="clear">', '<span class="clear-login"><a class="clear-login-link">立即登录</a>可查看更多历史记录</span>', '<a class="clear-link">', o, "</a>", "</li>"];
                                i.push(s.join(""))
                            }
                            return i.join("")
                        },
                        processMyPlaceList: function() {
                            return ui3SetMyPlace.init(opts.onSelect)
                        },
                        processIpLocationList: function() {
                            var t = ipLocation.myPlace,
                                e = "ipLocation",
                                a = ['<li class="ui3-iploc-my-place-item ', e, '" data-type="iploc"', '" data-key="我的位置"', '">', '<div class="clearfix ui3-iploc-my-place-inner">', "<b><em>&nbsp;</em><span>我的位置</span>", '</b><a href="#" title="', t.note, '" onclick="return false">', t.note, "</a>", "</div>", "</li>"];
                            return a.join("")
                        },
                        processItem: function(t, e, a, i, o, s, n) {
                            o = o ? o : "default";
                            var r = ['<li class="ui3-suggest-item" data-from="', s, '" data-type="', t, '" data-key="', T.encodeHTML(e), '" data-location="', a, '" data-extra="', i, '">', "    <a>", '        <i class = "', o, '">', escapeXSS(e), "</i>", "        <em>", escapeXSS(n ? n : a), "</em>", "    </a>", "</li>"];
                            return r.join("")
                        },
                        setPosAndSize: function() {
                            var t = this.wrap,
                                e = input.offset(),
                                a = {
                                    width: input.outerWidth(),
                                    height: input.outerHeight()
                                },
                                i = opts.isAutoWidth ? 0 : opts.width || a.width + opts.adjustWidth;
                            if (t.css({
                                    top: opts.top || e.top + a.height + opts.adjustTop,
                                    left: opts.left || e.left + opts.adjustLeft,
                                    zIndex: opts["z-index"] || 1e3
                                }), opts.isAutoWidth) t.css({
                                "min-width": i
                            });
                            else {
                                var i = opts.width || a.width + opts.adjustWidth;
                                t.css({
                                    width: i
                                })
                            }
                        },
                        bindSuggestEvents: function() {
                            this.wrap.find(".city-special-item,.city-normal-item").bind("click", function() {
                                that.hide();
                                var t = $(this),
                                    e = t.attr("data-key"),
                                    a = t.attr("data-stat-code");
                                if (addStat(a, "click"), "专享车险" === e) return void window.open("https://carowner.baidu.com/insPage/pcIns.html?fr=pcmap", "_blank");
                                var i = wrap.suggestInputTarget;
                                i.val(e), opts.onSelect && opts.onSelect.call(this, e)
                            }).bind("mousedown", function() {
                                that.isInSuggestList = !0
                            }).bind("mouseup", function() {
                                that.isInSuggestList = !1, that.hide()
                            }), this.wrap.find(".clear-login-link").bind("click", function() {
                                addStat("multi.history.login", "click", {
                                    da_trd: opts.from
                                }), userMgr.login(void 0, void 0, "sug-his")
                            }), this.wrap.find(".clear-link").bind("click", function() {
                                that.hide(), hisMgr.clearSearchData(), toast.show("删除成功"), addStat("searchbox.history.clear", "click", {})
                            }), this.wrap.find("li").bind("click", function(t) {
                                var e = (T(t.target), T(this));
                                if (!e.hasClass("clear-history")) {
                                    var a = e.attr("data-type"),
                                        i = e.attr("data-key"),
                                        o = e.attr("data-location"),
                                        s = e.attr("data-extra") || "",
                                        n = e.attr("data-from") || "web";
                                    if (this.getAttribute("data-target")) return void that.hide();
                                    var r = wrap.suggestInputTarget;
                                    r.val(i), opts.onSelect && opts.onSelect.call(this, i, o, s), "sug" === a ? o ? addStat("searchbox.sug.GRequest", "click") : addStat("searchbox.sug.GrRequest", "click") : "history" === a && (opts.from && "route" == opts.from ? addStat("route.sug.history.click", "click", {
                                        da_trd: n
                                    }) : "sug" == wrapType ? addStat("searchbox.sug.history.click", "click", {
                                        da_trd: n
                                    }) : opts.from && "search" == opts.from ? addStat("searchbox.history.click", "click", {
                                        da_trd: n
                                    }) : opts.from && "infowindow" == opts.from && addStat("infowindow.history.click", "click", {
                                        da_trd: n
                                    }), addStat("history.click", "click")), that.hide()
                                }
                            }).bind("mouseenter", function() {}).bind("mouseleave", function() {}).bind("mousedown", function() {
                                that.isInSuggestList = !0
                            }).bind("mouseup", function() {
                                that.isInSuggestList = !1, that.hide()
                            }), this.wrap.find(".leadDownloadCard").on("mousedown", ".close-btn-download-banner", function(t) {
                                $(".leadDownloadCard").hide(), t.preventDefault()
                            }), opts.showMyPlace && ui3SetMyPlace.bindWrapEvents(this.wrap)
                        },
                        hide: function() {
                            window.ui3MapSuggestWrap && (wrap = window.ui3MapSuggestWrap, wrap.hide(), 0 === that.readyState ? clearTimeout(that.timeout) : 1 === that.readyState && that.xhr.abort(), listener.trigger("ui.suggest", "hide"))
                        }
                    };
                return ui3MapSuggest.work(), {
                    hide: ui3MapSuggest.hide,
                    wrap: wrap
                }
            } catch (e) {
                "undefined" != typeof alog && alog("exception.fire", "catch", {
                    msg: e.message || e.description,
                    path: "common:widget/ui/ui3MapSuggest/ui3MapSuggest.js",
                    ln: 929
                })
            }
        },
        style = '.pc .ui3-suggest-wrap{font-family:Arial,Helvetica,"Microsoft YaHei",sans-serif}#ui3-suggest-scroll{background-color:#fff;width:100%;overflow-y:auto;overflow-x:hidden;box-shadow:1px 2px 1px rgba(0,0,0,.15)}.ui3-suggest-wrap{position:absolute;border-top:1px solid #E4E6E7;display:none;border-radius:0 0 2px 2px}.ui3-suggest-wrap .ui3-suggest-item a{display:block;height:35px;line-height:35px;padding-right:10px;text-decoration:none;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.ui3-suggest-wrap .ui3-suggest-item i{padding-left:39px;font-style:normal;color:#666;position:relative;z-index:1;padding-top:1px}.ui3-suggest-wrap .ui3-suggest-item i.history{background:url(//webmap1.bdimg.com/wolfman/static/common/images/ui3/tools/suggestion-icon_a0251d1.png) no-repeat 12px 2px}.ui3-suggest-wrap .ui3-suggest-item i.default{background:url(//webmap1.bdimg.com/wolfman/static/common/images/ui3/tools/suggestion-icon_a0251d1.png) no-repeat 12px -12px}.ui3-suggest-wrap .ui3-suggest-item i.home{background:url(//webmap1.bdimg.com/wolfman/static/common/images/ui3/tools/suggestion-icon_a0251d1.png) no-repeat 12px -40px}.ui3-suggest-wrap .ui3-suggest-item i.company{background:url(//webmap1.bdimg.com/wolfman/static/common/images/ui3/tools/suggestion-icon_a0251d1.png) no-repeat 12px -26px}.ui3-suggest-wrap .leadDownloadCard{width:100%;height:80px;background:#fff;box-shadow:1px 2px 1px rgba(0,0,0,.15);border-top:1px solid #f2f5f8}.ui3-suggest-wrap .ui3-suggest-item em{margin-left:10px;margin-right:20px;font-style:normal;color:#999}.ui3-suggest-wrap .clear-history{border-top:1px solid #F2F5F8;overflow:hidden}.ui3-suggest-wrap .clear-history .clear-link{height:35px;line-height:35px;text-decoration:none;color:#B2B2B2;float:right;padding:0 10px}.ui3-suggest-wrap .clear-history .clear-link:hover{background-color:#EBEBEB}.ui3-suggest-wrap .clear-history .clear-login-link:hover{text-decoration:underline}.ui3-suggest-wrap .clear-history .clear-login{height:35px;line-height:35px;float:left;color:#333;display:none}.ui3-suggest-wrap .clear-history .clear-login-link{text-decoration:none;color:#3385ff;padding:0 5px 0 30px;background:url(//webmap0.bdimg.com/wolfman/static/common/images/unloginSug_e5196cc.gif) no-repeat 10px 5px;float:left;height:35px}.ui3-suggest-item-hover a,.ui3-suggest-item:hover a{background-color:#EBEBEB}.ui3-suggest-item-hover em,.ui3-suggest-item:hover em{color:#888}.ui3-suggest-wrap strong{color:#999;float:right;margin-right:15px;display:none;position:relative;z-index:2}.ui3-suggest-item-hover strong{display:block}.ui3-suggest-item-hover strong:hover{color:#666}.city-special-container{width:100%;border-bottom:1px solid #e0e0e0;text-align:center;padding:15px 10px 0;box-sizing:border-box;font-size:12px;color:#666}.pc .city-special-container{font-family:Arial,Helvetica,"Microsoft YaHei",sans-serif}.city-special-list{overflow:hidden;height:24px;padding-bottom:10px;border-bottom:1px solid #eee}.city-special-list .city-special-item{text-align:center;display:inline-block;position:relative;width:32%;box-sizing:border-box;overflow:hidden;cursor:pointer}.city-special-list .city-list-item{height:24px;background:url(//webmap1.bdimg.com/wolfman/static/common/images/new/searchbox_5c0d97d.png) no-repeat;display:inline-block;padding-left:32px;line-height:24px}.city-special-list .cater{background-position:0 -190px}.city-special-list .hotel{background-position:0 -214px}.city-special-list .busstop{background-position:0 -238px}.city-normal-list{text-align:center;margin:17px auto}.city-normal-item{cursor:pointer;text-align:center;border-right:1px dashed #eee;height:14px;line-height:14px;width:105px;display:inline-block}.city-normal-item.city-normal-last{border-right:0}@media only screen and (-webkit-min-device-pixel-ratio:2),(-webkit-min-device-pixel-ratio:2),(min-resolution:2dppx),(min-resolution:192dpi){.city-special-list .cater{background:url(//webmap1.bdimg.com/wolfman/static/common/images/retina/sug-list_f4b326d.png) no-repeat;background-size:auto 72px;background-position:0 -48px}.city-special-list .hotel{background:url(//webmap1.bdimg.com/wolfman/static/common/images/retina/sug-list_f4b326d.png) no-repeat;background-size:auto 72px;background-position:0 -24px}.city-special-list .busstop{background:url(//webmap1.bdimg.com/wolfman/static/common/images/retina/sug-list_f4b326d.png) no-repeat;background-size:auto 72px;background-position:0 0}}';
    require.loadCss({
        content: style,
        name: "ui3MapSuggest"
    });
    var styleBanner = ".leadDownloadCard .download-banner .download-img{float:left;margin:10px 19px 10px 16px}.leadDownloadCard .download-banner .title{padding-top:16px;margin-bottom:4px;line-height:28px;height:28px;font-size:20px;color:#000}.leadDownloadCard .download-banner .sub-title{line-height:16px;height:16px;font-size:16px;color:#666}.leadDownloadCard .download-banner{position:relative}.leadDownloadCard .download-banner .close-btn-download-banner,.trafficLeadDownloadCard .download-banner .close-btn-download-banner{position:absolute;width:20px;height:20px;line-height:20px;font-size:28px;text-align:center;display:block;cursor:pointer;right:6px;top:8px;color:#ccc}.leadDownloadCard .download-banner .close-btn-download-banner:hover,.trafficLeadDownloadCard .download-banner .close-btn-download-banner:hover{color:#6da1ea}.bus-trans-banner .leadDownloadCard,.nav-trans-banner .leadDownloadCard,.walk-trans-banner .leadDownloadCard,.bike-trans-banner .leadDownloadCard{border-top:1px solid #e4e6e7}.leadDownloadCard .qrcode-box{float:left;margin:10px 19px 10px 16px;width:60px;height:60px}";
    require.loadCss({
        content: styleBanner,
        name: "downloadBanner"
    }), module.exports = {
        initialize: initialize
    }
});