define("common:widget/ui/card/cardMgr.js", function(e, r, t) {
    var n, i = [],
        a = {},
        o = {},
        c = 1,
        d = [$("#cards-level0"), $("#cards-level1"), $("#cards-level2")],
        l = [],
        s = [],
        u = 100,
        f = 20,
        h = 10,
        p = 60,
        g = 2,
        m = $("#left-panel"),
        v = e("common:widget/ui/poiListMgr/poiListMgr.js"),
        E = {
            initialize: function() {
                try {
                    var e = document.documentElement.clientHeight - f - p;
                    $(".poidetail-container").length && v.isShow() && (e = document.documentElement.clientHeight - f), $.browser.ie && $.browser.ie <= 9 ? m.css({
                        "max-height": e + "px"
                    }) : m.height(e), this.bindEvents()
                } catch (r) {
                    "undefined" != typeof alog && alog("exception.fire", "catch", {
                        msg: r.message || r.description,
                        path: "common:widget/ui/card/cardMgr.js",
                        ln: 48
                    })
                }
            },
            bindEvents: function() {
                var e = this;
                map.addEventListener("mousedown", function() {
                    s.forEach(function(e) {
                        e.foldCard()
                    })
                }), map.addEventListener("mousewheel", function() {
                    s.forEach(function(e) {
                        e.foldCard()
                    })
                }), map.addEventListener("deepzoommousewheel", function() {
                    s.forEach(function(e) {
                        e.foldCard()
                    })
                }), T(window).on("resize", function() {
                    var r = document.documentElement.clientHeight - f - p;
                    $(".poidetail-container").length && v.isShow() && (r = document.documentElement.clientHeight - f), m.height(r), e.reCalculateCurrentCardHeight(), listener.trigger("leftpanel", "resize", {
                        panelHeight: r
                    })
                }), listener.on("searchbox.height.change", function() {
                    e.reCalculateCurrentCardHeight()
                }), listener.on("ui.card.fold", function() {
                    e.reCalculateCurrentCardHeight()
                })
            },
            add: function(e, r) {
                var t = this;
                if (e.cardId = c++, r = T.extend({
                        clear: !0
                    }, r), 0 !== e.cardLevel && e.config.monopolize && !r.notClear)
                    if (2 !== e.cardLevel || r.isReturn) this.clear({
                        reserveReturnCard: r.reserveReturnCard
                    });
                    else {
                        var n = s.filter(function(e) {
                            return 0 !== e.cardLevel && "return" !== e.cardStatus
                        });
                        n.forEach(function(e) {
                            2 === e.cardLevel ? (t.remove(e), r.staticExpand = !0) : e.foldCard(!0)
                        })
                    }
                e.$cardEl = $('<li id="card-' + e.cardId + '" class="card" data-fold="' + e.foldTitle + '"></li>');
                var o = e.render();
                if (!o || "function" != typeof o.then) {
                    var l = o;
                    o = Promise.resolve(l)
                }
                return i.push(e), a[e.cardId] = e, o.then(function(n) {
                    try {
                        if (!t.get(e.cardId)) return;
                        if ("string" == typeof n ? e.$el = T(n) : n && n._type_ && "$DOM" === n._type_ && (e.$el = n), e.$el) {
                            if (t.showCards(), e.$cardEl.append(e.$el), r.staticExpand || e.$cardEl.addClass("animated-card"), r.isFold && e.foldCard(!!t.getCards("poidetail").length), "padding" in e.config && e.$cardEl.css("padding", e.config.padding + "px"), "overflow" in e.config && e.$cardEl.css("overflow", e.config.overflow), "style" in e.config)
                                for (var i in e.config.style) e.$cardEl.css(i, e.config.style[i]);
                            e.$cardEl.css("z-index", u - s.length), r.top ? d[e.cardLevel].prepend(e.$cardEl) : d[e.cardLevel].append(e.$cardEl), t.reCalculateCurrentCardHeight(), s.push(e)
                        }
                        e.$el && (listener.trigger("ui.cardmgr", "add", {
                            card: e
                        }), e.onRender(), e.initialize())
                    } catch (a) {
                        "undefined" != typeof alog && alog("exception.fire", "catch", {
                            msg: a.message || a.description,
                            path: "common:widget/ui/card/cardMgr.js",
                            ln: 181
                        })
                    }
                }, function() {}), o
            },
            clear: function(e) {
                if (e = e || {}, e.reserveReturnCard) this.removeCards(1), this.removeCards(2);
                else {
                    e.reserveHistory || (l = []), n = null, i.forEach(function(e) {
                        e.unload()
                    }), a = {}, i = [], o = {};
                    for (var r = 0; r < d.length; r++) d[r].empty();
                    s = []
                }
                listener.trigger("ui.cardmgr", "clear")
            },
            removeById: function(e) {
                var r = a[e];
                r && this.remove(r)
            },
            remove: function(e) {
                if (e) {
                    delete a[e.cardId];
                    var r = i.indexOf(e);
                    i.splice(r, 1);
                    for (var t in o) o[t] && (r = o[t].indexOf(e), r > -1 && o[t].splice(r, 1));
                    e.$cardEl && e.$cardEl.remove(), e.unload(), r = s.indexOf(e), s.splice(r, 1), listener.trigger("ui.cardmgr", "remove", {
                        card: e
                    })
                }
            },
            removeCards: function(e) {
                var r = this;
                if ("number" == typeof e) {
                    var t = e,
                        n = T.object.clone(s);
                    n.forEach(function(e) {
                        e.cardLevel === t && r.remove(e)
                    })
                } else {
                    var i = e,
                        a = T.object.clone(o[i]);
                    a && a.length && (a.forEach(function(e) {
                        r.remove(e)
                    }), o[i] = void 0), listener.trigger("ui.cardmgr", "removegroup", {
                        group: i
                    })
                }
            },
            addCardToGroup: function(e, r) {
                var t = this.get(e);
                t && (o[r] || (o[r] = []), -1 === o[r].indexOf(t) && o[r].push(t))
            },
            removeCardFromGroup: function(e, r) {
                var t = this.get(e);
                if (t && o[r] && o[r].indexOf(t) > -1) {
                    var n = o[r].indexOf(t);
                    o[r].splice(n, 1)
                }
            },
            get: function(e) {
                return a[e]
            },
            getCards: function(e) {
                return "undefined" == typeof e ? this.getAll() : "number" == typeof e ? i.filter(function(r) {
                    return r.cardLevel === e
                }) : o[e] || []
            },
            getAll: function() {
                return i
            },
            getShowing: function() {
                return s
            },
            hasCard: function(e) {
                return -1 !== i.indexOf(e)
            },
            calculateHeight: function(e) {
                var r = T(".card").toArray();
                if (r.length && r[r.length - 1] === e.$cardEl[0]) {
                    var t = $("#searchbox").outerHeight(),
                        n = r.reduce(function(r, t) {
                            return t !== e.$cardEl[0] ? r + T(t).outerHeight() + h : r
                        }, 0);
                    return $(".poidetail-container").length && v.isShow() ? document.documentElement.clientHeight - t - n - f - h - g : document.documentElement.clientHeight - t - n - p - f - h - g
                }
                return !1
            },
            reCalculateCurrentCardHeight: function() {
                var e = T(".card");
                if (e.length) {
                    var r = e.eq(e.length - 1),
                        t = r.attr("id").split("-")[1],
                        n = this.get(t),
                        i = this.calculateHeight(n);
                    if (i) {
                        var a = n.$cardEl.css("overflow-y");
                        $(".poi-wrapper-box .poi-wrapper") && i > 111 ? (n.$cardEl.css("overflow-y", "hidden"), $(".poi-wrapper-box .poi-wrapper").css("max-height", i - 111)) : n.$cardEl.css("overflow-y", a), $("#cbtContainer #cbtMiddleWrapper") && $("#cbtContainer #cbtMiddleWrapper").length && i > 176 && ($("#cbtContainer #cbtMiddleWrapper").css("max-height", i - 176), $("#cbtContainer #cbtMiddleWrapper").css("overflow-y", "auto")), $(".poi-wrapper-box .poi-wrapper") && i > 111 && n.$cardEl.outerHeight() >= i && $(".poi-wrapper-box .poi-wrapper").css("height", i - 111), n.$cardEl.css("max-height", i), n.$cardEl.outerHeight() > i && (i -= n.$cardEl.outerHeight() - i, n.$cardEl.css("max-height", i))
                    }
                    n.onResize(i), panelHeight = $(".poidetail-container").length && v.isShow() ? document.documentElement.clientHeight - f : document.documentElement.clientHeight - f - p, m.height(panelHeight)
                }
            },
            moveCardToReturnZone: function(e) {
                if (e && e.recordUrl) {
                    n && (l.push({
                        url: n.recordUrl,
                        title: n.returnTitle
                    }), this.remove(n)), n = e, n.$cardEl.removeClass("animated-card");
                    var r = n.$cardEl.next();
                    d[0].append(n.$cardEl), r.hasClass("poiLeadDownloadCard") && (d[0].append(r), r.css("display", "none"))
                }
            },
            moveReturnCardToNormalZone: function(e) {
                n = null, e.$cardEl.removeClass("animated-card"), d[e.cardLevel].append(e.$cardEl), this.addReturnCard()
            },
            addReturnCard: function() {
                var r = this;
                if (l.length) {
                    var t = l.pop();
                    e.async("common:widget/ui/card/ReturnCard.js", function(e) {
                        var i = new e(t);
                        r.add(i, {
                            staticExpand: !0
                        }), n = i
                    })
                }
            },
            popHistory: function() {
                n && n.unfoldCard()
            },
            hideCards: function() {
                d.forEach(function(e) {
                    e.hide()
                })
            },
            showCards: function() {
                d.forEach(function(e) {
                    e.show()
                })
            }
        };
    t.exports = E
});;
define("common:widget/ui/card/Card.js", function(t, i, s) {
    function r(t) {
        T.lang.Class.call(this), this.opts = t || {}, this.config = {}, "monopolize" in this.opts && (this.config.monopolize = t.monopolize), "padding" in this.opts && (this.config.padding = t.padding), "overflow" in this.opts && (this.config.overflow = t.overflow), "style" in this.opts && (this.config.style = t.style), this.cardLevel = 1, this.foldTitle = "展开", this.returnTitle = "返回", this.cardStatus = "unfold";
        var i = !0;
        "record" in t && void 0 !== t.record && (i = t.record), "url" in t && (this.recordUrl = t.url)
    }
    var a = t("common:widget/ui/card/cardMgr.js"),
        d = t("common:widget/ui/util/util.js"),
        o = t("common:widget/ui/poiListMgr/poiListMgr.js");
    T.inherits(r, T.lang.Class, "Card"), T.extend(r.prototype, {
        render: function() {
            try {
                return !0
            } catch (t) {
                "undefined" != typeof alog && alog("exception.fire", "catch", {
                    msg: t.message || t.description,
                    path: "common:widget/ui/card/Card.js",
                    ln: 68
                })
            }
        },
        initialize: function() {
            try {} catch (t) {
                "undefined" != typeof alog && alog("exception.fire", "catch", {
                    msg: t.message || t.description,
                    path: "common:widget/ui/card/Card.js",
                    ln: 72
                })
            }
        },
        unload: function() {},
        foldCard: function(t) {
            t && "return" !== this.cardStatus ? (this.$cardEl.attr("data-fold", this.returnTitle).removeClass("status-return status-fold").addClass("status-return"), a.moveCardToReturnZone(this), this.cardStatus = "return", this.tempCardLevel = this.cardLevel, this.cardLevel = 0) : this.isCardFold || this.canNotFold || (this.$cardEl.attr("data-fold", this.foldTitle).removeClass("status-return status-fold").addClass("status-fold"), this.cardStatus = "fold"), (!t && !this.canNotFold && !this.isCardFold || t && !this.canNotReturn) && (this.$cardEl.addClass("fold")[0].scrollTop = 0, this.isCardFold = !0, this.onFold && this.onFold(t))
        },
        unfoldCard: function() {
            var t = this;
            if (this.isCardFold) {
                this.$cardEl.removeClass("fold status-return status-fold"), this.isCardFold = !1, a.removeCards(2), "return" === this.cardStatus && (this.cardLevel = this.tempCardLevel, a.moveReturnCardToNormalZone(this));
                var i = a.calculateHeight(this);
                i && (this.$cardEl.css("max-height", i), this.onResize(), this.$cardEl.outerHeight() > i && this.$cardEl.css("max-height", i - (this.$cardEl.outerHeight() - i))), this.onUnfold && this.onUnfold("return" === this.cardStatus), this.cardStatus = "unfold", listener.trigger("ui.card.returncard", "updatejssdkdata", {
                    card: t
                })
            }
        },
        onResize: function() {},
        onRender: function() {
            try {
                var t = this;
                this.$cardEl.on("mouseenter", function() {
                    t.isCardFold && t.$cardEl.hasClass("status-fold") && t.unfoldCard()
                }), this.$cardEl.on("click", function() {
                    t.isCardFold && t.$cardEl.hasClass("status-return") && (addStat("ui.card.return", "click"), o.clear(), history.back())
                }), d.vendorEvent(this.$cardEl[0], "transitionend", function(i) {
                    i && i.propertyName ? "max-height" === i.propertyName && (t.$cardEl.hasClass("fold") ? listener.trigger("ui.card.fold", "fold", {
                        card: t
                    }) : listener.trigger("ui.card.fold", "unfold", {
                        card: t
                    })) : t.$cardEl.hasClass("fold") ? listener.trigger("ui.card.fold", "fold", {
                        card: t
                    }) : listener.trigger("ui.card.fold", "unfold", {
                        card: t
                    })
                })
            } catch (i) {
                "undefined" != typeof alog && alog("exception.fire", "catch", {
                    msg: i.message || i.description,
                    path: "common:widget/ui/card/Card.js",
                    ln: 166
                })
            }
        }
    }), s.exports = r
});;
define("common:widget/com/MapComponent.js", function(e, t, o) {
    function i(e) {
        e = e || {}, e.monopolize = !0, window.currentComponent = this, e.cinfo = e.cinfo || {}, this.modelQuery = e.url, this.noPushState = e.noPushState, this.replaceState = e.replaceState, this.isMainRequest = "no" === e.isMainRequest ? !1 : !0, this.startCity = {
            name: c.cityName,
            code: c.cityCode
        }, (null == e.cinfo.city || null == e.cinfo.city.name) && (e.cinfo.startCity = {
            name: this.startCity.name,
            code: this.startCity.code
        }), n.call(this, e), this.json = this.opts.json, this.cinfo = this.opts.cinfo || {}, this.name = this.opts.name, this.isMainRequest && (map.clearOverlays(), map.showIndoor(null)), this.isMainRequest && this.json && this.json.result && !m.active && (11 == this.json.result.type || 1 == this.json.result.type || 36 == this.json.result.type || 2 == this.json.result.type) ? (c.enableMapMove = !1, window.mapMoveTimer && clearTimeout(window.mapMoveTimer), window.mapMoveTimer = setTimeout(function() {
            c.enableMapMove = !0
        }, 4e3)) : this.isMainRequest && (window.mapMoveTimer && clearTimeout(window.mapMoveTimer), c.enableMapMove = !0)
    }
    var n = e("common:widget/ui/card/Card.js"),
        s = e("common:widget/ui/searchData/searchData.js"),
        a = e("common:widget/ui/config/config.js"),
        c = a.modelConfig,
        m = e("common:widget/ui/Weather/Weather.js");
    T.inherits(i, n, "MapComponent"), T.extend(i.prototype, {
        statusChange: function(e, t) {
            this.modelQuery = e, s.fetch(e, t)
        },
        render: function() {
            try {
                return !0
            } catch (e) {
                "undefined" != typeof alog && alog("exception.fire", "catch", {
                    msg: e.message || e.description,
                    path: "common:widget/com/MapComponent.js",
                    ln: 106
                })
            }
        },
        initialize: function() {
            try {} catch (e) {
                "undefined" != typeof alog && alog("exception.fire", "catch", {
                    msg: e.message || e.description,
                    path: "common:widget/com/MapComponent.js",
                    ln: 111
                })
            }
        },
        unload: function() {
            this.destroy && this.destroy(), n.prototype.unload.apply(this, arguments), window.currentComponent = null
        }
    }), o.exports = i
});;
define("common:widget/com/UserAuth/userAuth.js", function(e, n, t) {
    function o(e, n) {
        var t = document.createElement("script");
        t.src = e + "&auth=" + encodeURIComponent(window.AUTH), window.SECKEY && (t.src = t.src + "&seckey=" + encodeURIComponent(window.SECKEY)), t.type = "text/javascript", t.charset = "utf-8", t.addEventListener("load", function(e) {
            var t = e.target;
            t.parentNode.removeChild(t), n && n()
        }, !1), document.getElementsByTagName("head")[0].appendChild(t)
    }
    t.exports = {
        sendUserOp: function(e) {
            o("/?newmap=1&qt=userOp&useraction=" + e.type.replace("end", "").replace("on", ""))
        },
        sendSugg: function(e) {
            o("/?newmap=1&qt=userOp&useraction=sugg" + e)
        },
        sendImage: function(e) {
            o("/?newmap=1&qt=image&type=" + e)
        }
    }
});;
define("common:widget/com/componentManager.js", function(require, exports, module) {
    var searchData = require("common:widget/ui/searchData/searchData.js"),
        util = require("common:widget/ui/util/util.js"),
        constant = require("common:widget/ui/constant/Constant.js"),
        hisMgr = require("common:widget/ui/searchHistory/hisMgr.js"),
        toast = require("common:widget/ui/toast/toast.js"),
        cardMgr = require("common:widget/ui/card/cardMgr.js"),
        config = require("common:widget/ui/config/config.js"),
        mapUtil = require("common:widget/ui/mapUtil/mapUtil.js"),
        AID = require("common:widget/ui/areaCfg/areaCfg.js"),
        modelConfig = config.modelConfig,
        weather = require("common:widget/ui/Weather/Weather.js"),
        jigsawVerify = require("common:widget/ui/JigsawVerification/JigsawVerification.js"),
        poiListMgr = require("common:widget/ui/poiListMgr/poiListMgr.js"),
        moduleCode = {
            1: "City",
            2: "City",
            5: "BusStops",
            6: "PoiSearch",
            7: "DistrictClarify",
            11: "PoiSearch",
            13: "RouteAddr",
            14: "BusTrans",
            15: "LinesQuery",
            18: "BusLines",
            19: "RouteAddr",
            20: "NavTrans",
            21: "PoiSearch",
            22: "BusTrans",
            23: "RouteAddr",
            24: "RouteAddr",
            26: "SpecialPoi",
            28: "District",
            29: "RouteAddr",
            31: "NavWalk",
            32: "NavBike",
            36: "PoiSearch",
            37: "Clarify",
            38: "PoiSearch",
            39: "PoiSearch",
            40: "Clarify",
            41: "PoiAddr",
            48: "CBusTrans",
            49: "RouteAddr",
            50: "RouteAddr"
        },
        historySearchModel = {
            1: "s",
            2: "s",
            5: "s",
            6: "s",
            7: "s",
            11: "s",
            21: "bd",
            26: "s",
            28: "s",
            29: "s",
            36: "s",
            37: "s",
            38: "nb",
            39: "bd",
            40: "bd",
            41: "s"
        },
        historyLineModel = {
            13: "bt",
            14: "bt",
            20: "nav",
            22: "bt",
            31: "walk",
            32: "cycle",
            48: "bt"
        },
        showLoadingQt = ["s", "bd", "con", "nb", "bt", "nav", "walk", "cycle", "nse", "bse"],
        routeModel = ["RouteAddr", "BusTrans", "NavTrans", "NavWalk", "NavBike", "CBusTrans"],
        searchModel = ["City", "CountryIndex", "ProvinceIndex", "AreaIndex", "CityIndex", "Clarify", "PoiSearch"],
        printModel = ["CountryIndex", "ProvinceIndex", "AreaIndex", "CityIndex", "PoiSearch", "BusTrans", "NavTrans", "CBusTrans"],
        components = {},
        compMonitorFlag = !1,
        deviceRatio = window.devicePixelRatio > 1 ? 2 : 1,
        componentManager = {
            start_event: 0,
            compMonitorFlag: !1,
            go: function(param, opts, callback) {
                if (listener.trigger("componentManager.go"), window.streetViewTool) try {
                    window.streetViewTool.stEntranceDomClickHandler(!1)
                } catch (e) {}
                var url = "";
                "string" == typeof param ? url = param : T.isObject(param) && (url = baidu.url.jsonToQuery(param, null)), url.match("^(s&|con&|bd&|nb&).*") && (-1 === url.indexOf("pn=") && (url += "&pn=0"), -1 === url.indexOf("auth=") && window.AUTH && (url += "&auth=" + encodeURIComponent(window.AUTH)), -1 === url.indexOf("seckey=") && window.SECKEY && (url += "&seckey=" + encodeURIComponent(window.SECKEY)), -1 === url.indexOf("device_ratio=") && (url += "&device_ratio=" + deviceRatio));
                var qtMatch = url.match("(.+?)&");
                qtMatch && showLoadingQt.indexOf(qtMatch[1]) > -1 && listener.trigger("loading", "start"), "function" == typeof opts && (callback = opts, opts = {}), opts = opts || {};
                var me = this;
                me.start_event = (new Date).getTime();
                var corePerfMonitor = window.corePerfMonitor;
                return me.isCoreFunc(url) ? corePerfMonitor && !corePerfMonitor.firstRender && (corePerfMonitor.searchStartTime = (new Date).getTime(), alog("cus.fire", "count", "z_start_search")) : corePerfMonitor && (corePerfMonitor.searchStartTime = null), searchData.fetch(url, function(json, options) {
                    var result = json.result,
                        type = result.type;
                    if (99 === type) {
                        var originalUrl = result.url;
                        return jigsawVerify.open(originalUrl, result.image, result.jigsawImage), void listener.trigger("loading", "end")
                    }
                    var start = result.start,
                        end = result.end,
                        unKnowLine = "未知路段";
                    if (me.start_send = (new Date).getTime(), opts.json = json, opts.url = url, poiListMgr.clear(), void 0 === json.content && (31 === type || 32 === type)) {
                        cardMgr.clear({
                            reserveReturnCard: opts.reserveReturnCard
                        });
                        var plan = 31 === type ? "步行" : "骑行";
                        return toast.show("该" + plan + "方案无结果"), void listener.trigger("loading", "end")
                    }
                    if (1 & json.result.result_show) return map.setMapType(BMAP_SATELLITE_MAP), map.showStreetLayer(!0), void listener.trigger("loading", "end");
                    var componentName = moduleCode[type];
                    if ("DistrictClarify" === componentName && "china_main" !== json.result.uii_type && (componentName = "Clarify"), "clickCity" === opts.action && (componentName = "City"), "City" === componentName) {
                        var cname = "";
                        if ("clickCity" === opts.action && json.content && json.content.ext && json.content.ext.detail_info && json.content.ext.detail_info.name) {
                            var content = json.content,
                                currentCity = json.current_city;
                            cname = content.ext.detail_info.name, content.cname = cname, content.code = content.city_id, content.sup = currentCity.sup, content.sup_bus = currentCity.sup_bus, content.sup_business_area = currentCity.sup_business_area, content.sup_subway = currentCity.sup_subway, content.city_type = currentCity.type, content.if_current = 1
                        } else json.content && json.content.cname && (cname = json.content.cname);
                        if (cname) {
                            if (toast.show("已切换至<strong>" + cname + "</strong>"), result) {
                                var hisData = {};
                                hisData.qt = "s", hisData.wd = result.wd || cname, hisMgr.setSearchData([hisData])
                            }
                            me.setCity(json.content, json.result, json.weather, opts)
                        }
                        return listener.trigger("loading", "end"), void("function" == typeof opts.onload && opts.onload())
                    }
                    if (componentName) {
                        if (compMonitorFlag = !0, !T.isString(componentName) && componentName.defaultComponent) {
                            var selector = componentName;
                            if (componentName = selector.defaultComponent, selector.special) {
                                var flag = !0;
                                try {
                                    eval(selector.special.condition) || (flag = !1)
                                } catch (e) {
                                    flag = !1
                                }
                                flag && (componentName = selector.special.component)
                            }
                        }
                        baidu.array.contains(routeModel, componentName) ? (opts.fromGo = !0, opts.searchDataType = options.type, me.load(componentName, opts, callback)) : me.loadPlaceAsync(function() {
                            opts.fromGo = !0, opts.searchDataType = options.type, me.load(componentName, opts, callback)
                        }, {
                            compName: componentName
                        })
                    }
                    if (historySearchModel[type]) {
                        if (!result.wd) return;
                        if (!opts.cinfo || !opts.cinfo.genRequestKey) {
                            var hisData = {};
                            hisData.qt = historySearchModel[type], hisData.wd = result.wd, result.where && (hisData.wd2 = result.where), hisMgr.setSearchData([hisData])
                        }
                    } else if (historyLineModel[type]) {
                        var ccode = json.current_city ? json.current_city.code : modelConfig.cityCode;
                        if (hisData = {
                                qt: historyLineModel[type],
                                c: ccode + "",
                                plankind: result.sy + ""
                            }, start && void 0 !== start.wd && "" !== start.wd) {
                            if (start.wd === unKnowLine || end.wd === unKnowLine) return;
                            if (hisData.sn = {
                                    keyword: start.wd || unKnowLine,
                                    type: "1"
                                }, start.pt && (hisData.sn.xy = start.pt), start.uid && (hisData.sn.uid = start.uid), end.length >= 1)
                                for (var i = 0; i < end.length; i++) {
                                    var endPt = {
                                        keyword: end[i].wd || unKnowLine,
                                        type: "1"
                                    };
                                    end[i].pt && (endPt.xy = end[i].pt), end[i].uid && (endPt.uid = end[i].uid), i === end.length - 1 ? hisData.en = endPt : (hisData.wp || (hisData.wp = []), hisData.wp.push(endPt))
                                } else void 0 !== end.wd && "" !== end.wd && (hisData.en = {
                                    keyword: end.wd || unKnowLine,
                                    type: "1"
                                }, end.pt && (hisData.en.xy = end.pt), end.uid && (hisData.en.uid = end.uid))
                        } else if (void 0 !== result.s_query && void 0 !== result.e_query) {
                            if (result.s_query === unKnowLine || result.e_query === unKnowLine) return;
                            hisData.sn = {
                                keyword: result.s_query,
                                type: "2"
                            }, hisData.en = {
                                keyword: result.e_query.length ? result.e_query[0] : result.e_query,
                                type: "2"
                            }
                        }
                        hisData.sn && hisData.en && hisMgr.setRouteData([hisData])
                    }
                }, function() {
                    me.start_send = (new Date).getTime(), me.load("Error")
                }, opts.MapRevertOpts)
            },
            isCoreFunc: function(e) {
                if (!e) return !1;
                0 !== e.indexOf("qt=") && (e = "qt=" + e);
                var t = e.split("&");
                if ("string" != typeof t[0]) return !1;
                var n = t[0].split("=")[1],
                    o = {
                        s: 1,
                        bd: 1,
                        nav: 1,
                        bt: 1,
                        walk: 1
                    };
                return o[n] ? !0 : !1
            },
            load: function(e, t, n) {
                var o = this;
                t = t || {}, t.name = e;
                var r = {};
                require.async("common:widget/com/" + e + "/" + e + ".js", function(i) {
                    o.transfer_time = (new Date).getTime(), window.currentComponent && "PoiSearch" === window.currentComponent._className && (o.preModuleName = window.currentComponent._className), t.isFromContextMenu || cardMgr.clear({
                        reserveReturnCard: t.reserveReturnCard
                    });
                    var a = new i(t);
                    if (components[e] = a, o.setBeforeRender(a, t), cardMgr.add(a, {
                            notClear: !!t.isFromContextMenu,
                            staticExpand: t.staticExpand,
                            isFold: t.isFold,
                            reserveReturnCard: !!t.reserveReturnCard,
                            record: t.record
                        }), t.fromUrl && performance && performance.now) {
                        var s = {};
                        s["z_" + e.toLowerCase() + "_urlload"] = performance.now(), alog("cus.fire", "time", s), addStat("page.fromurl." + e.toLowerCase())
                    }
                    if (listener.trigger("loading", "end"), o.sendMonitorData(e, t), "function" == typeof t.onload && t.onload(a), a.$el && (t.json && o.setInitStatus(a, t), n && n(a, t.json), o.trigger(), o.start_send)) {
                        var c = "z_" + e.toLowerCase() + "_load_time",
                            u = o.transfer_time - o.start_send;
                        u > 0 && (r[c] = u, alog("cus.fire", "time", r))
                    }
                })
            },
            isRouteModel: function(e) {
                return baidu.array.contains(routeModel, e)
            },
            isSearchModel: function(e) {
                return baidu.array.contains(searchModel, e)
            },
            trigger: function() {
                listener.trigger("com.subway", "zindexchange"), baidu(window).trigger("resize", {
                    from: "load"
                })
            },
            sendMonitorData: function(e, t) {
                if (!window.isPrint && window.corePerfMonitor) {
                    t = t || {};
                    var n, o = window.corePerfMonitor;
                    if (o.firstRender ? n = (new Date).getTime() - o.pageStartTime : o.searchStartTime && (n = (new Date).getTime() - o.searchStartTime), t.fromGo && "fail" !== t.searchDataType && !o.firstRender && o.searchStartTime && 2e3 >= n && "Error" !== e && alog("cus.fire", "count", "z_finish_render"), !o.components[e]) return void(o.firstRender = !1);
                    var r = ["z_total_request"];
                    if ("number" == typeof n && n > 2e3 && r.push("z_timeout_request"), alog("cus.fire", "count", r), o.componentName = e, o.firstRender) {
                        o.firstRender = !1;
                        var i = "z_" + e.toLowerCase() + "_first";
                        o.data[i] = n
                    } else {
                        var a = {};
                        a["z_" + e.toLowerCase() + "_search"] = n, alog("cus.fire", "time", a)
                    }
                }
            },
            get: function(e) {
                return components[e]
            },
            remove: function(e) {
                components[e] && (components[e] = null)
            },
            setBeforeRender: function(e, t) {
                try {
                    var n = t.json || {},
                        o = require("common:widget/ui/Weather/Weather.js"),
                        r = require("common:widget/com/Subway/SbwMgr.js");
                    if (util.loadSearchInfo(function(e) {
                            e.rangeSearchCenterMarker && (e.rangeSearchCenterMarker.remove(), e.rangeSearchCenterMarker = null)
                        }), e.isMainRequest && n.current_city) {
                        var i = n.current_city;
                        o.active = modelConfig.cityName !== i.name && !n.weather, require.async(["common:widget/ui/indexUtil/IndexUtil.js"], function(e) {
                            e.setCurCity(n.current_city, {
                                from: "com"
                            })
                        }), modelConfig.upCityid = i.up_cityid ? i.up_cityid : i.code, window.clearClarify = null
                    }
                    r.sbwInst && r.sbwInst.unload(t)
                } catch (a) {
                    "undefined" != typeof alog && alog("exception.fire", "catch", {
                        msg: a.message || a.description,
                        path: "common:widget/com/componentManager.js",
                        ln: 732
                    })
                }
            },
            setInitStatus: function(e, t) {
                var n = t.json || {};
                n.hot_city && window._OLR && (window._OLR.hot_city = n.hot_city), 1 & n.result.result_show && 1 == n.result.pattern_sign || window.GRControll && window.GRControll.clearAfterGetAtBase(n)
            },
            loadPrintCom: function() {},
            loadPlaceAsync: function(e) {
                require.async(["common:widget/ui/place/place.js", "common:widget/ui/place/placeEnter.js", "common:widget/ui/place/caterPopInner.js"], function(t, n, o) {
                    t.placeEntrance = n, t.caterPopInner = o, window.place = t, e && e()
                })
            },
            getLastSearchTime: function(e) {
                return e ? searchData.lastSearchTime[e] : searchData.lastSearchTime
            },
            setCity: function(e, t, n, o) {
                cardMgr.clear(), map.clearOverlays(), map.showIndoor(null), require.async(["common:widget/ui/searchBox/searchBox.js", "common:widget/ui/indexUtil/IndexUtil.js", "common:widget/ui/urlManager/urlManager.js"], function(t, n, r) {
                    t.setState("sole", {
                        query: e.cname,
                        isComplete: !0
                    }), e.cname && 1 === e.if_current ? (modelConfig.cityName = e.cname, 1 === e.if_current && e.code ? n.setCurCity({
                        name: e.cname,
                        code: e.code,
                        type: e.city_type,
                        sup: e.sup,
                        sup_bus: e.sup_bus,
                        sup_business_area: e.sup_business_area,
                        sup_lukuang: e.sup_lukuang,
                        sup_subway: e.sup_subway
                    }, {
                        from: "if_current=1"
                    }) : n.setCurCity({
                        name: modelConfig.cityName,
                        code: modelConfig.cityCode,
                        type: modelConfig.sup
                    })) : 0 === e.if_current && e.pccode && e.pcname && n.setCurCity({
                        name: e.pcname,
                        code: e.pccode,
                        type: e.city_type,
                        sup: e.sup,
                        sup_bus: e.sup_bus,
                        sup_business_area: e.sup_business_area,
                        sup_lukuang: e.sup_lukuang,
                        sup_subway: e.sup_subway
                    }, {
                        from: "if_current == 0"
                    }), o.noPushState || r.setFeature("search", e.cname, o.url), r.setTitle(e.cname)
                });
                var r = util.parseGeo(e.geo),
                    i = e.city_type,
                    a = e.code,
                    s = modelConfig.indexModelCode[i];
                if (!e.uid || "ProvinceIndex" !== s && "AreaIndex" !== s && 9e3 !== a) {
                    var c = r.bound.split(";"),
                        u = [],
                        d = c[0].split(","),
                        l = c[1].split(",");
                    u.push(new BMap.Point(d[0], d[1])), u.push(new BMap.Point(l[0], l[1]));
                    var m;
                    s && (m = modelConfig.level[s.toLowerCase()]), e.level && (m = parseInt(e.level, 10));
                    var p = util.geoToPoint(e.geo);
                    modelConfig.enableMapMove = !1, window.mapMoveTimer && clearTimeout(window.mapMoveTimer), window.mapMoveTimer = setTimeout(function() {
                        modelConfig.enableMapMove = !0
                    }, 4e3), map.centerAndZoom(p, m), weather.add(n)
                } else {
                    var w = 0,
                        f = null;
                    if (9e3 === a ? f = e.ext && e.ext.detail_info && e.ext.detail_info.guoke_geo && e.ext.detail_info.guoke_geo.geo : t && t.profile_region && (f = t.profile_region), f) {
                        r = util.parseGeo(f), e.city_type === constant.CITY_TYPE_PROV || 9e3 === a ? w = constant.AREA_TYPE_PROV : e.city_type === constant.CITY_TYPE_DIST && (w = constant.AREA_TYPE_DIST);
                        var g = r.points;
                        "ProvinceIndex" === s ? (mapUtil.addAdministrationArea(e.code === AID["福建"] || e.code === AID["浙江"] ? mapUtil.addArea(g, w) : mapUtil.addArea(g, w, 500)), addStat("citylist.poi.clistinstatepage")) : (mapUtil.addAdministrationArea(mapUtil.addArea(g, w)), addStat("citylist.poi.clistinprovincepage"));
                        var c = r.bound.split(";"),
                            u = [],
                            d = c[0].split(","),
                            l = c[1].split(",");
                        u.push(new BMap.Point(d[0], d[1])), u.push(new BMap.Point(l[0], l[1])), modelConfig.enableMapMove = !1, window.mapMoveTimer && clearTimeout(window.mapMoveTimer), window.mapMoveTimer = setTimeout(function() {
                            modelConfig.enableMapMove = !0
                        }, 4e3), mapUtil.setViewport(u), weather.add(n)
                    } else {
                        var c = r.bound.split(";"),
                            u = [],
                            d = c[0].split(","),
                            l = c[1].split(",");
                        u.push(new BMap.Point(d[0], d[1])), u.push(new BMap.Point(l[0], l[1]));
                        var m;
                        s && (m = modelConfig.level[s.toLowerCase()]), e.level && (m = parseInt(e.level, 10));
                        var p = util.geoToPoint(e.geo);
                        modelConfig.enableMapMove = !1, window.mapMoveTimer && clearTimeout(window.mapMoveTimer), window.mapMoveTimer = setTimeout(function() {
                            modelConfig.enableMapMove = !0
                        }, 4e3), map.centerAndZoom(p, m), weather.add(n)
                    }
                }
            }
        };
    window.componentManager = componentManager, module.exports = componentManager
});;
define("common:widget/com/IpLocation/IpLocation.js", function(require, exports, module) {
    function IpLocationControl(t) {
        this._map = t.map || map, this.defaultCursor = this._map.config.defaultCursor, this.draggingCursor = this._map.config.draggingCursor, this.defaultRight = 10, this.defaultOffset = new BMap.Size(this.defaultRight, 50), this.defaultAnchor = BMAP_ANCHOR_BOTTOM_RIGHT
    }
    var constant = require("common:widget/ui/constant/Constant.js"),
        weather = require("common:widget/ui/Weather/Weather.js"),
        mapUtil = require("common:widget/ui/mapUtil/mapUtil.js"),
        toast = require("common:widget/ui/toast/toast.js"),
        cardMgr = require("common:widget/ui/card/cardMgr.js"),
        config = require("common:widget/ui/config/config.js"),
        util = require("common:widget/ui/util/util.js"),
        toast = require("common:widget/ui/toast/toast.js"),
        modelConfig = config.modelConfig,
        userSelection = "";
    require.loadCss({
        content: ".ipLocCont{-webkit-transition:right .3s ease-out;transition:right .3s ease-out}.ipLocCont .titleComm{pointer-events:none;white-space:nowrap;z-index:1001;padding:4px 8px;font-size:11px;line-height:18px;background:#494949;color:#fff;border-radius:2px;box-shadow:1px 1px 2px rgba(0,0,0,.1);position:absolute;right:26px}.ipLocCont .title{margin-right:8px}.ipLocCont .title:before{content:'';position:absolute;right:-8px;top:50%;margin-top:-8px;width:0;height:0;border-bottom:8px solid transparent;border-top:8px solid transparent;border-left:8px solid #494949}.ipLocCont .titleFailed{margin-right:2px}.ipLocCont .icon{width:26px;height:26px;overflow:hidden;background-color:#fff;text-align:center;cursor:pointer;line-height:26px;float:left;box-shadow:1px 2px 1px rgba(0,0,0,.15)}.ipLocCont .icon span{width:14px;height:14px;vertical-align:middle;display:inline-block;background:url(//webmap0.bdimg.com/wolfman/static/common/images/ipLocation/ipLocation_72a86af.png);background-size:76px,auto}@media only screen and (-webkit-min-device-pixel-ratio:2),(-webkit-min-device-pixel-ratio:2),(min-resolution:2dppx),(min-resolution:192dpi){.ipLocCont .icon span{background:url(//webmap1.bdimg.com/wolfman/static/common/images/ipLocation/ipLocation2x_bc15447.png);background-size:76px,auto}}.ipLocCont .icon .normal{background-position:-28px 0}.ipLocCont .icon .success{background-position:-14px 0}.ipLocCont .icon .loading{background:url(//webmap0.bdimg.com/wolfman/static/common/images/new/loading_4a096ed.gif);background-size:14px 14px}@media only screen and (-webkit-min-device-pixel-ratio:2),(-webkit-min-device-pixel-ratio:2),(min-resolution:2dppx),(min-resolution:192dpi){.ipLocCont .icon .loading{background:url(//webmap0.bdimg.com/wolfman/static/common/images/new/loading_4a096ed.gif);background-size:14px 14px}}.ipLoc-title-error{height:83px;border:1px solid #c4c7cc;font-size:13px;background-color:#FFF;padding-left:14px;padding-right:14px;line-height:30px;border:1px solid rgba(51,51,51,.2);box-shadow:2px 2px 2px 0 rgba(0,0,0,.2);border-top:0;border-left:0}.ipLoc-title-error .orignal-addr{position:relative;top:7px}.ipLoc-title-error #ipLocClose{position:relative;top:-6px;right:-5px}.ipLoc-title-error .addr-info{font-size:12px;color:#999}.ipLoc-title-error .jiucuo-inf{float:right;font-size:12px;color:#2e77e5;cursor:pointer;position:relative;bottom:9px}.ipLoc-title-error .normal{color:#656565}.ipLocTitle{height:30px;border:1px solid #c4c7cc;font-size:13px;background-color:#FFF;padding-left:14px;padding-right:7px;line-height:30px;cursor:pointer;border:1px solid rgba(51,51,51,.2);box-shadow:2px 2px 2px 0 rgba(0,0,0,.2);border-top:0;border-left:0}.ipLocTitle .normal,.ipLocTitle arrow{color:#656565}.ipLocTitle .address{color:#36C}.ipLocCloseCont{cursor:pointer}.ipLocClose{width:11px;height:10px;display:inline-block;margin-left:14px;background:url(//webmap0.bdimg.com/wolfman/static/common/images/ipLocation/ipLocation_72a86af.png);background-size:76px,auto;background-position:-60px 0}@media only screen and (-webkit-min-device-pixel-ratio:2),(-webkit-min-device-pixel-ratio:2),(min-resolution:2dppx),(min-resolution:192dpi){.ipLocClose{background:url(//webmap1.bdimg.com/wolfman/static/common/images/ipLocation/ipLocation2x_bc15447.png);background-size:76px,auto;background-position:-60px 0}}.ipLocClose:hover{opacity:.6}.ipLocFooter{margin:auto;margin-top:-1px;width:18px;height:10px;background:url(//webmap0.bdimg.com/wolfman/static/common/images/ipLocation/ipLocation_72a86af.png);background-size:76px,auto;background-position:-43px 0}@media only screen and (-webkit-min-device-pixel-ratio:2),(-webkit-min-device-pixel-ratio:2),(min-resolution:2dppx),(min-resolution:192dpi){.ipLocFooter{background:url(//webmap1.bdimg.com/wolfman/static/common/images/ipLocation/ipLocation2x_bc15447.png);background-size:76px,auto;background-position:-43px 0}}.noLoc{padding-right:14px}.input-iploc{color:#3385ff}.ui3-iploc-my-place-item{line-height:32px}.ui3-iploc-my-place-item:hover,.ui3-iploc-my-place-item.ui3-suggest-item-hover{cursor:pointer;background-color:#EBEBEB}.ui3-iploc-my-place-item b{padding-left:12px;float:left;line-height:32px}.ui3-iploc-my-place-item.other b{padding-left:17px}.ui3-iploc-my-place-item em{display:inline-block;width:15px;line-height:14px;height:14px;background:url(//webmap1.bdimg.com/wolfman/static/common/images/ui3/tools/tools_2b91efa.png) no-repeat -30px -291px}.ui3-iploc-my-place-item span{color:#666;margin-left:13px;width:53px}.ui3-iploc-my-place-item a{vertical-align:middle;color:#999;margin-left:14px;text-decoration:none}.ui3-iploc-my-place-item i{float:right;font-style:normal;margin-right:5px}.ui3-iploc-my-place-action a{margin-left:5px}.ui3-iploc-my-place-inner i a:hover{color:#36c}.ui3-iploc-my-place-item .has-data{display:block;margin-left:105px;margin-right:70px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.ui3-iploc-my-place-item.other .has-data{margin-left:44px}.ui3-iploc-my-place-item .has-data:hover{}.correct-inf-warper{height:189px;width:234px;border:1px solid #c4c7cc;font-size:13px;background-color:#FFF;padding-left:14px;padding-right:7px;line-height:30px;border:1px solid rgba(51,51,51,.2);box-shadow:2px 2px 2px 0 rgba(0,0,0,.2);border-top:0;border-left:0}.correct-inf-warper .correct-inf{padding-top:9px}.correct-inf-warper .correct-inf .warning{width:18px;height:18px;display:inline-block;background:url(//webmap0.bdimg.com/wolfman/static/common/images/ipLocation/iploc-correct-0_a4176f0.png);background:-webkit-image-set(url(//webmap0.bdimg.com/wolfman/static/common/images/ipLocation/iploc-correct-0_a4176f0.png) 1x,url(//webmap0.bdimg.com/wolfman/static/common/images/ipLocation/iploc-correct-2x-0_de44cac.png) 2x);background:-moz-image-set(url(//webmap0.bdimg.com/wolfman/static/common/images/ipLocation/iploc-correct-0_a4176f0.png) 1x,url(//webmap0.bdimg.com/wolfman/static/common/images/ipLocation/iploc-correct-2x-0_de44cac.png) 2x);background:-o-image-set(url(//webmap0.bdimg.com/wolfman/static/common/images/ipLocation/iploc-correct-0_a4176f0.png) 1x,url(//webmap0.bdimg.com/wolfman/static/common/images/ipLocation/iploc-correct-2x-0_de44cac.png) 2x);background:-ms-image-set(url(//webmap0.bdimg.com/wolfman/static/common/images/ipLocation/iploc-correct-0_a4176f0.png) 1x,url(//webmap0.bdimg.com/wolfman/static/common/images/ipLocation/iploc-correct-2x-0_de44cac.png) 2x);background-size:18px auto;position:relative;top:5px;background-position:0 -28px}.correct-inf-warper .correct-inf .inf{color:#333}.correct-inf-warper .right-addr{position:relative}.correct-inf-warper .right-addr input{padding:4px;width:175px;padding-right:20px;background-size:15px auto;padding-left:24px}.correct-inf-warper .right-addr input::-webkit-input-placeholder{font-size:13px}.correct-inf-warper .right-addr input::-moz-placeholder{font-size:13px}.correct-inf-warper .right-addr input::-ms-input-placeholder{font-size:13px}.correct-inf-warper .right-addr input::-moz-placeholder{font-size:13px}.correct-inf-warper .right-addr::before{content:'';display:block;position:absolute;width:15px;height:15px;background:url(//webmap1.bdimg.com/wolfman/static/common/images/ipLocation/rightLocSearch_4fa9263.png) no-repeat;top:7px;left:5px}.correct-inf-warper .orignal-addr span{color:#8c8c8c;display:block}.correct-inf-warper .orignal-addr .addr{position:relative;top:-7px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:#333;font-size:14px}.correct-inf-warper .orignal-addr .faddr{position:relative;top:-16px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:12px;color:#b2b2b2}.correct-inf-warper .bt-groups{width:141px;margin:0 auto;position:relative;top:-16px}.correct-inf-warper .bt-groups button{width:64px;height:24px;border:0;cursor:pointer;border-radius:2px}.correct-inf-warper .bt-groups button.confrim{background:#3385ff;color:#FFF;margin-right:6px}.correct-inf-warper .bt-groups button.cancel{background:#FFF;color:#3385ff;border:1px #dfdfdf solid}.iploc-pCorrect-marker.animation{-webkit-animation:pCorrectMarker-raise .5s;animation:pCorrectMarker-raise .5s}@keyframes pCorrectMarker-raise{from{-webkit-transform:translateY(0);transform:translateY(0)}50%{-webkit-transform:translateY(-6px);transform:translateY(-6px)}80%{-webkit-transform:translateY(3px);transform:translateY(3px)}90%{-webkit-transform:translateY(-2px);transform:translateY(-2px)}to{-webkit-transform:translateY(0);transform:translateY(0)}}@-webkit-keyframes pCorrectMarker-raise{from{-webkit-transform:translateY(0);transform:translateY(0)}50%{-webkit-transform:translateY(-6px);transform:translateY(-6px)}80%{-webkit-transform:translateY(3px);transform:translateY(3px)}90%{-webkit-transform:translateY(-2px);transform:translateY(-2px)}to{-webkit-transform:translateY(0);transform:translateY(0)}}",
        name: "ipLocationStyle"
    }), IpLocationControl.prototype = new BMap.Control, T.extend(IpLocationControl.prototype, {
        initialize: function() {
            try {
                var contTpl = [function(_template_object) {
                        var _template_fun_array = [],
                            fn = function(__data__) {
                                var _template_varName = "";
                                for (var name in __data__) _template_varName += "var " + name + '=__data__["' + name + '"];';
                                eval(_template_varName), _template_fun_array.push('<div id=\'iploc\' class=\'ipLocCont\' >    <div class="hide titleComm title">定位您的位置</div>    <div class="hide titleComm loading-button">定位中</div>    <div class="hide titleComm titleFailed">定位失败</div>    <div class="icon">        <span class="normal">        </span>    </div></div>'), _template_varName = null
                            }(_template_object);
                        return fn = null, _template_fun_array.join("")
                    }][0],
                    $ele = T(contTpl()),
                    container = this._container = $ele.appendTo(document.getElementById("map-operate"));
                return this.$ele = $ele, this.$icon = $ele.find(".icon span"), this.$title = $ele.find(".title"), this.$titleFailed = $ele.find(".titleFailed"), this.$rightC = $ele.find(".rightC"), container[0]
            } catch (e) {
                "undefined" != typeof alog && alog("exception.fire", "catch", {
                    msg: e.message || e.description,
                    path: "common:widget/com/IpLocation/IpLocation.js",
                    ln: 63
                })
            }
        }
    });
    var IpLocation = {
        init: function(map, json, opts) {
            if (json = json || {}, baidu.object.isEmpty(json) && addStat("ip.json.empty"), "initilized" !== this.status) {
                var titleTpl = [function(_template_object) {
                        var _template_fun_array = [],
                            fn = function(__data__) {
                                var _template_varName = "";
                                for (var name in __data__) _template_varName += "var " + name + '=__data__["' + name + '"];';
                                eval(_template_varName), _template_fun_array.push('<div class="iploc-inf">        '), addrs ? _template_fun_array.push('    <div class="ipLocTitle">        <span class="normal">我在</span><strong> ', "undefined" == typeof addrs ? "" : addrs, ' </strong><span class="normal">附近</span><span id="ipLocClose" class="ipLocCloseCont"><span class="arrow"> ></span></span>    </div>     <div class="ipLocFooter" >       </div>    ') : _template_fun_array.push('    <div class="ipLocTitle noLoc">        <span class="normal">暂时无法获取您的位置</span>    </div>    </div>    '), _template_fun_array.push("</div>"), _template_varName = null
                            }(_template_object);
                        return fn = null, _template_fun_array.join("")
                    }][0],
                    errorTpl = [function(_template_object) {
                        var _template_fun_array = [],
                            fn = function(__data__) {
                                var _template_varName = "";
                                for (var name in __data__) _template_varName += "var " + name + '=__data__["' + name + '"];';
                                eval(_template_varName), _template_fun_array.push('<div class="iploc-inf">        '), addrs ? _template_fun_array.push('    <div class="ipLoc-title-error">        <div class="orignal-addr">            <span class="normal">我在</span><strong> ', "undefined" == typeof addrs ? "" : addrs, ' </strong><span class="normal">附近</span><span id="ipLocClose" class="ipLocCloseCont"> <span class="ipLocClose"></span></span>        </div>                   <div class="jiucuo">            <div class="addr-info">', "undefined" == typeof formatted_address ? "" : formatted_address, '</div>            <div class="jiucuo-inf">定位不准? 我来纠错~</div>        </div>    </div>     <div class="ipLocFooter" >       </div>    ') : _template_fun_array.push('    <div class="ipLocTitle noLoc">        <span class="normal">暂时无法获取您的位置</span>    </div>    </div>    '), _template_fun_array.push("</div>"), _template_varName = null
                            }(_template_object);
                        return fn = null, _template_fun_array.join("")
                    }][0],
                    correctLocTpl = [function(_template_object) {
                        var _template_fun_array = [],
                            fn = function(__data__) {
                                var _template_varName = "";
                                for (var name in __data__) _template_varName += "var " + name + '=__data__["' + name + '"];';
                                eval(_template_varName), _template_fun_array.push('<div class="correct-inf-warper">        <div class="correct-inf">        <em class="warning"></em>        <span class="inf">拖动蓝色标注可调整你的位置，或</span>    </div>    <div class="right-addr">        <input class="right-addr-input" type=\'text\' placeholder=\'请输入正确位置的关键词\'>     </div>      '), addrs ? _template_fun_array.push('    <div class="orignal-addr">        <span class="normal">您的位置：</span>        <span class=\'addr\'> ', "undefined" == typeof addrs ? "" : addrs, ' </span>        <span class="faddr">', "undefined" == typeof formatted_address ? "" : formatted_address, '</span>    </div>    <div class="bt-groups">            <button class="confrim">提交</button>            <button class="cancel">取消</button>    </div>     <div class="ipLocFooter" >    </div>    ') : _template_fun_array.push('    <div class="ipLocTitle noLoc">        <span class="normal">暂时无法获取您的位置</span>    </div>    </div>    '), _template_fun_array.push("</div>"), _template_varName = null
                            }(_template_object);
                        return fn = null, _template_fun_array.join("")
                    }][0];
                this.titleTpl = titleTpl, this.errorTpl = errorTpl, this.correctLocTpl = correctLocTpl;
                var control = new IpLocationControl({
                    map: map,
                    ipLocate: this.ipLocate
                });
                map.addControl(control), this._map = map, this.control = control, this.bindEvents(), this.status = "initilized", this.updateStauts(json, opts), this.initLoadControl(opts), this.addEventAndListener(), this.$iplocCont = baidu("#iploc")
            }
        },
        _calContentSize: function(t) {
            var e = T("._cal-content-size-test-wrapper");
            0 === e.size() && (e = T('<div class="_cal-content-size-test-wrapper"></div>'), e.css({
                position: "absolute",
                left: -999999
            }), T("body").append(e)), e.html(t);
            var o = {
                width: e.width(),
                height: e.height()
            };
            return e.empty(), o
        },
        getAppStateFromPath: function() {
            for (var t = location.pathname, e = t.match(/\/[^/]*/g), o = 0, i = {
                    mapState: {}
                }, a = 0; a < e.length; a++) {
                var r = e[a].substring(1);
                0 === r.indexOf("@") ? (i.loc = this.parseLocUrl(r), o = a) : i.mapState = this.parseMapStateUrl(decodeURIComponent(r))
            }
            return i
        },
        parseLocUrl: function(t) {
            var e = t.substring(1).split(",");
            if (e.length < 2) return null;
            var o = {
                x: parseFloat(e[0]),
                y: parseFloat(e[1]),
                z: null,
                t: null,
                h: null
            };
            if (isNaN(o.x) || isNaN(o.y)) return null;
            for (var i = 2; i < e.length; i++) {
                var a = e[i];
                if (a.indexOf("z") === a.length - 1) {
                    var r = parseFloat(a);
                    isNaN(r) || (o.z = r)
                }
                if (a.indexOf("h") === a.length - 1) {
                    var n = parseFloat(a);
                    isNaN(n) || (o.h = n)
                }
                if (a.indexOf("t") === a.length - 1) {
                    var s = parseFloat(a);
                    isNaN(s) || (o.t = s)
                }
            }
            return o
        },
        parseMapStateUrl: function(t) {
            var e = util.getParam("?" + t),
                o = {};
            return e && (!e.maptype || "B_EARTH_MAP" !== e.maptype && "B_SATELLITE_MAP" !== e.maptype || (o.mapType = e.maptype), e.maplayer && (o.mapLayer = decodeURIComponent(e.maplayer)), e.ccode && (o.ccode = decodeURIComponent(e.ccode)), e.cname && (o.cname = decodeURIComponent(e.cname)), e.index && (o.index = parseInt(decodeURIComponent(e.index), 10)), e.title && (o.title = decodeURIComponent(e.title)), e.content && (o.content = decodeURIComponent(e.content)), e.latlng && (o.latlng = decodeURIComponent(e.latlng)), e.autoOpen && (o.autoOpen = decodeURIComponent(e.autoOpen))), o
        },
        setOpts: function(t) {
            var e = {},
                o = util.getParam(location.href),
                i = this.getAppStateFromPath();
            if (t.rgc && t.rgc.result) {
                e.cityCode = t.rgc.result.cityCode, e.cityName = t.rgc.result.addressComponent.city;
                var a = "MCITY";
                if (new RegExp('^[^\\x00-\\x20\\x7f\\(\\)<>@,;:\\\\\\"\\[\\]\\?=\\{\\}\\/\\u0080-\\uffff]+$').test(a) === !0) {
                    var r = new RegExp("(^| )" + a + "=([^;]*)(;|$)"),
                        n = r.exec(document.cookie);
                    if (n) var s = n[2] || null;
                    "string" == typeof s && (s = decodeURIComponent(s))
                }
                parseFloat(s) > 0 && 1 !== code ? (e.cityCode === code && (e.status = "show", e.needCurReq = !1), e.cityCode !== code && (e.status = "showChageCity", e.needCurReq = !1)) : (e.status = "show", e.needCurReq = !0)
            }
            return i.loc ? (map.isFromShare = !0, e.needCurReq = !1) : ("show" === e.status && (e.preventZoomMap = !0), o && o.c && (map.isFromShare = !0, e.needCurReq = !1)), e
        },
        setData: function(t, e) {
            var o = this;
            o.updateStauts(t), o.genericReqeust = !1;
            var i = new BMap.Point(o.x, o.y);
            o.showIpLocPoint(i, !1), "show" === !e && o.updateCityInfo(o.cityName);
            var a = 17;
            a = o.radius <= 500 ? 17 : 15;
            var r = window.pathType;
            "show" === e ? r ? o._map.flyTo(i, 15) : this.showIpLocPoint(i) : o._map.flyTo(i, a)
        },
        browserPosition: function(t, e) {
            function o(t) {
                r.pFlashLocateIcon("failed"), "click" === t && r.pShowLocatedFailed(), addStat("h5Location.iplocat.failed", t)
            }

            function i(i) {
                var a = i.coords.latitude,
                    n = i.coords.longitude;
                if (a && n) {
                    var s = "//api.map.baidu.com/geocoder/v2/",
                        c = "WteoyGTuBmflUIzSPqmCPAiz",
                        p = "wgs84ll",
                        l = a + "," + n,
                        d = "&pois=1&output=json&from=webmap&latest_admin=1&ret_coordtype=bd09mc",
                        m = s + "?ak=" + c + "&coordtype=" + p + "&location=" + l + d;
                    baidu.jsonp(m, function(i) {
                        var a = i.result.location || {};
                        if (0 === i.status && a.lat && a.lng) {
                            var n = {
                                ipLoc: {
                                    code: 0,
                                    content: {
                                        confidence: 1,
                                        ip_type: 2,
                                        location: {
                                            lat: a.lat,
                                            lng: a.lng
                                        },
                                        locid: "",
                                        point: {
                                            x: a.lng,
                                            y: a.lat
                                        },
                                        radius: 0
                                    },
                                    message: "request hpiploc server[iploc] success",
                                    result: {
                                        error: 161,
                                        loc_time: "0"
                                    },
                                    status: "success",
                                    time: 24
                                },
                                rgc: i
                            };
                            "show" === t && (r.initopts = r.setOpts(n, e), r.updateStauts(i, r.initopts), r.initLoadControl(r.initopts)), r.setData(n, t, e), r.pFlashLocateIcon("success"), addStat("h5Location.iplocat.success", t)
                        } else o(t)
                    })
                } else o(t)
            }

            function a() {
                o(t)
            }
            var r = this;
            navigator.geolocation ? navigator.geolocation.getCurrentPosition(i, a) : o(t)
        },
        updateStauts: function(t, e) {
            if (this.oldJson = t, this.status = status || "failed", this.ip = t && t.ipLoc && t.ipLoc.cip, e && e.ip && (this.ip = e.ip), t && t.ipLoc && "success" === t.ipLoc.status && t.ipLoc.content.radius <= 1e3) try {
                this.status = "success";
                var o = t.ipLoc.content;
                this.x = o.point.x, this.y = o.point.y, this.radius = o.radius, this.ip = t.ipLoc.cip || null, this.locid = t.ipLoc.content.locid, this.time = t.ipLoc.time;
                var i = t.rgc.result;
                this.cityCode = i.cityCode, this.cityName = i.addressComponent.city || "", i.poiRegions && i.poiRegions[0] && i.poiRegions[0].name ? (this.addrs = i.poiRegions[0].name, this.formatted_address = i.formatted_address) : i.pois && i.pois[0] && i.pois[0].name ? (this.addrs = i.pois[0].name, this.formatted_address = i.formatted_address) : (this.addrs = i.formatted_address || this.cityName + "未知路段", this.formatted_address = i.formatted_address), this.myPlace = {
                    cityid: this.cityCode,
                    name: "我的位置",
                    note: this.addrs,
                    point: this.x + "," + this.y,
                    target: "ipLocation",
                    status: !0
                }, this.pFlashLocateIcon("success"), this.control.$icon.removeClass("success"), addStat("ip.located.success")
            } catch (a) {
                this.status = "failed", this.pFlashLocateIcon("failed"), this.browserPosition("show", e)
            } else {
                this.pFlashLocateIcon("failed"), this.control.$icon.removeClass("success").addClass("normal");
                var r = t.ipLoc;
                r && (-1 === r.code ? addStat("ip.server.access.error") : -2 === r.code ? (addStat("ip.location.data.error"), r.content && r.content.confidence < .8 && addStat("ip.location.confidence.error")) : r.content && r.content.radius > 1e3 && addStat("ip.location.radius.error")), addStat("ip.located.failed"), r && "success" !== r.status && this.browserPosition("show", e)
            }
        },
        initLoadControl: function(t) {
            var e = this;
            if (this.genericReqeust = !0, t && "show" === t.status) {
                this.pFlashLocateIcon("success"), this.control.$icon.addClass("success").removeClass("normal"), t.needCurReq === !0 && (t.from = "iploc", this.updateCityInfo(t.cityName, t));
                try {
                    var o = window.localStorage.getItem("CorrectLoc_" + this.ip),
                        i = o && JSON.parse(o),
                        a = i && i.time,
                        r = +new Date;
                    if (a > 0 && void 0 !== a && 6048e5 > r - a) {
                        var n = i.lng,
                            s = i.lat,
                            c = new BMap.Point(n, s);
                        e.addrs = i.addr, e.formatted_address = i.faddr, e.showIpLocPoint(c), addStat("ip.located.fromlocal", "frist_screen")
                    } else {
                        var p = new BMap.Point(this.x, this.y);
                        this.showIpLocPoint(p)
                    }
                } catch (l) {}
            }
            if (t && "showChageCity" === t.status && void 0 !== this.cityName) {
                this.control.$icon.addClass("success").removeClass("normal");
                var d = [];
                d.push('<span class="info-tip-text">系统定位您现在在<strong>'), d.push(this.cityName), d.push("</strong>，是否切换?--"), d.push('<a class="iploc-switch-city" id="iplocSwitchCity"  href="javascript: void(0);">切换</a>'), d.push("</span>"), toast.show(d.join(""), null, 1e4);
                var e = this;
                T("#iplocSwitchCity").bind("click", function() {
                    if ("success" === e.status) {
                        e.genericReqeust = !1;
                        var t = new BMap.Point(e.x, e.y);
                        e.showIpLocPoint(t, !1); {
                            e.radius
                        }
                        e._map.flyTo(t, 12), e.updateCityInfo(e.cityName)
                    }
                    e.pFlashLocateIcon("success")
                })
            }
        },
        isGenericRequest: function() {
            return this.genericReqeust === !1 && this.cityCode !== modelConfig.cityCode ? (this.genericReqeust = !0, !1) : !0
        },
        updateCityInfo: function(t, e) {
            if (this.cityCode !== modelConfig.cityCode) {
                e && e.preventZoomMap || this._map.zoomTo(12);
                var o = T.cookie.get("MCITY");
                parseInt(o, 10) !== this.cityCode && void 0 !== this.cityCode && void 0 !== this.cityName && (toast.show("已切换至<strong>" + this.cityName + '</strong>，您可将其<a class="cur_city" >设置为默认城市</a>', "warning"), addStat("iplocation.toast.setDefCity", "show")), require.async("common:widget/ui/setDefCity/SetDefCity.js", function(e) {
                    baidu("a.cur_city").on("click", function(o) {
                        e.setDefCityByTip(t, this, 1), o.preventDefault(), addStat("iplocation.toast.setDefCity", "click")
                    })
                }), mapUtil.getCurCity(t, function(t) {
                    var e = t.content;
                    require.async(["common:widget/ui/indexUtil/IndexUtil.js"], function(t) {
                        var o = {
                            name: e.cname,
                            code: e.code,
                            type: e.city_type,
                            sup: e.sup
                        };
                        o.sup_bus = e.sup_bus, o.sup_business_area = e.sup_business_area, o.sup_lukuang = e.sup_lukuang, o.sup_subway = e.sup_subway, t.setCurCity(o)
                    }), weather.add(t.weather), cardMgr.removeCards("result")
                })
            }
        },
        addEventAndListener: function() {
            var t = this,
                e = function() {
                    t.pLabel && t.pLabel.hide()
                };
            listener.on("componentManager.go", e), listener.on("poiinfowin.rightmenu.select", e), listener.on("poiDeatailMagr.create", e), this._map.addEventListener("click", function() {
                t.pLabel && t.pLabel.force !== !0 ? t.pLabel.hide() : t.pLabel && (t.pLabel.force = !1)
            })
        },
        showIpLocPoint: function(t, e) {
            var o = this;
            if (userSelection = window.localStorage.getItem("userSelection"), !(t && t.lng && t.lat)) return this.ipLocPoint = null, !1;
            this.ipLoc !== t && (this.ipLocPoint = t);
            var e = e || [];
            if (e.newAddr && (this.addrs = e.newAddr), e.newFaddr && (this.formatted_address = e.newFaddr), this.correctLocLabel && this.correctLocLabel.hide(), this.pErrorLabel && this.pErrorLabel.hide(), this.pCorrectLocMarker && this.pCorrectLocMarker.hide(), this.pMarker ? (this.pMarker.show(), this.pMarker.setPoint(this.ipLocPoint)) : (this.pCreateMarker(), userSelection && "sureLoc" === userSelection && this._map.addOverlay(this.pMarker), this.pMarker.addEventListener("click", function(t) {
                    t.cancelBubble = !0, o.pLabel && (o.pLabel.force = !0, o.pLabel.show(), o.pErrorLabel && o.pErrorLabel.hide(), o._map.addOverlay(o.pLabel)), o._map.temp && o._map.temp.infoWin && o._map.temp.infoWin.close()
                })), this.pCircle ? (this.pCircle.show(), this.pCircle.setCenter(this.ipLocPoint)) : (this.pCreateCircle(), this._map.addOverlay(this.pCircle)), this.pLabel) {
                if (e.newAddr) {
                    var i = this.titleTpl({
                        addrs: this.addrs
                    });
                    this.pLabel.setContent(i)
                }
                this.pLabel.show()
            } else this.pCreateLabel(), this.pLabel.hide(), this._map.temp && this._map.temp.infoWin && this._map.temp.infoWin.close(), this._map.addOverlay(this.pLabel), this.pLabel.addEventListener("click", function(t) {
                if (t.cancelBubble = !0, "" !== o.addrs && void 0 !== o.addrs && o.pLabel) {
                    if (o.pLabel.force = !0, o.pLabel.hide(), o.pErrorLabel) {
                        var e = o.errorTpl({
                                addrs: o.addrs,
                                formatted_address: o.formatted_address
                            }),
                            i = o._calContentSize(e),
                            a = i.width / 2 - 1;
                        o.pErrorLabel.setContent(e), o.pErrorLabel.setOffset(new BMap.Size(-1 * a, constant.A_IP_LABEL_OFFSET_HEIGHT - 55)), o.pErrorLabel.setPoint(o.ipLocPoint), o.pErrorLabel.show()
                    } else o.pCreateErrorCheckLabel(), o.pErrorLabel.setPoint(o.ipLocPoint), o._map.addOverlay(o.pErrorLabel);
                    T(".ipLoc-title-error #ipLocClose").bind("click", function(t) {
                        t.stopPropagation(), o.pErrorLabel.hide(), addStat("ip.correct-inf-close", "click")
                    }), T(".jiucuo .jiucuo-inf").bind("click", function(t) {
                        if (t.stopPropagation(), o.pMarker && o.pMarker.hide(), o.pCircle && o.pCircle.hide(), o.pCreateCorrectLocMarker(), o.pCorrectLocMarker.setOffset(new BMap.Size(2, -4)), o._map.addOverlay(o.pCorrectLocMarker), o.pCorrectLocMarker.addEventListener("dragstart", function() {
                                var t = T(".iploc-pCorrect-marker");
                                t.removeClass("animation")
                            }), o.pCorrectLocMarker.addEventListener("ondragging", function() {
                                T(".correct-inf").hide(), T(".right-addr").hide(), T(".bt-groups").hide(), T(".correct-inf-warper").css("height", "80px"), T(".orignal-addr").css("height", "81px"), o.correctLocLabel.setOffset(new BMap.Size(-127, -98))
                            }), o.pCorrectLocMarker.addEventListener("dragend", function(t) {
                                var e = T(".iploc-pCorrect-marker");
                                e.addClass("animation");
                                var i = t.point,
                                    a = i.lng + "," + i.lat;
                                if (o.rightPoint = a, o.correctType = "drag", i) {
                                    var r = i.lng,
                                        n = i.lat,
                                        s = {
                                            ak: "WteoyGTuBmflUIzSPqmCPAiz",
                                            coordtype: "bd09mc",
                                            location: r + "," + n,
                                            pois: 1,
                                            output: "json",
                                            from: "webmap",
                                            latest_admin: 1
                                        },
                                        c = "//api.map.baidu.com/geocoder/v2/?",
                                        p = [];
                                    for (var l in s) p.push(l + "=" + s[l]);
                                    c += p.join("&"), baidu.jsonp(c, function(t) {
                                        var e = t.result.sematic_description.split(",")[0].replace(/内$/, ""),
                                            i = t.result.formatted_address;
                                        T(".addr").text(e ? e : i), T(".faddr").text(e && i ? i : ""), o.addr = e, o.faddr = i, "" !== o.addr && "" !== o.faddr ? (T(".correct-inf-warper").css("height", "189px"), o.correctLocLabel.setOffset(new BMap.Size(-127, -206))) : (T(".correct-inf-warper").css("height", "159px"), o.correctLocLabel.setOffset(new BMap.Size(-127, -174))), T(".orignal-addr").css("height", "auto"), T(".correct-inf").show(), T(".right-addr").show(), T(".bt-groups").show()
                                    })
                                }
                            }), o.correctLocLabel) {
                            o.pErrorLabel && o.pErrorLabel.hide(), o.correctLocLabel.setPoint(o.ipLocPoint);
                            var e = o.correctLocTpl({
                                addrs: o.addrs,
                                formatted_address: o.formatted_address
                            });
                            o.correctLocLabel.setContent(e), o.pCorrectLocMarker.setLabel(o.correctLocLabel), o.correctLocLabel.show()
                        } else o.pCreateCorrectLocLabel(), o.correctLocLabel.setPoint(o.ipLocPoint), o.correctLocLabel.setOffset(new BMap.Size(-127, -206)), o._map.addOverlay(o.correctLocLabel), o._map.flyTo(o.ipLocPoint, 15);
                        listener.trigger("ipLocation.correct"), T(".right-addr-input").bind("click", function() {
                            T(this).focus()
                        }), T(".bt-groups .confrim").bind("click", function() {
                            if ("drag" !== o.correctType || void 0 === o.correctType) {
                                var t = T(".right-addr-input").val();
                                if (("" === t || void 0 === t) && void 0 === o.rightPoint) return void toast.show("请输入正确地点,或拖图后提交");
                                if ("input" !== o.correctType) return void toast.show("请从输入提示中选取正确地点后确认")
                            }
                            if (T(".right-addr-input").text(""), o.correctType = "", o.rightPoint && "" !== o.addr && "" !== o.faddr) {
                                var e = o.rightPoint.split(","),
                                    i = e[0],
                                    a = e[1],
                                    r = new BMap.Point(i, a),
                                    n = {
                                        locid: o.locid,
                                        cip: o.ip,
                                        oldx: o.ipLocPoint.lng,
                                        oldy: o.ipLocPoint.lat,
                                        newx: i,
                                        newy: a,
                                        time: o.time
                                    };
                                addStat("iplocation.correct.confrim", "click", n);
                                var s = {
                                    isCorrect: !0,
                                    newAddr: o.addr,
                                    newFaddr: o.faddr
                                };
                                o.pCorrectLocMarker && o.pCorrectLocMarker.hide(), o.correctLocLabel && o.correctLocLabel.hide(), o.pErrorLabel && o.correctLocLabel.hide(), o.myPlace = {
                                    cityid: o.cityCode,
                                    name: "我的位置",
                                    note: o.addrs,
                                    point: i + "," + a,
                                    target: "ipLocation",
                                    status: !0
                                }, o.showIpLocPoint(r, s), toast.show("提交成功，感谢反馈！");
                                var c = {
                                    lng: e[0],
                                    lat: e[1],
                                    time: +new Date,
                                    ip: o.ip,
                                    addr: o.addr,
                                    faddr: o.faddr
                                };
                                window.localStorage.setItem("CorrectLoc_" + o.ip, JSON.stringify(c))
                            } else o.showIpLocPoint(o.ipLocPoint), toast.show("抱歉，该地点不能成为定位点")
                        }), T(".right-addr-input").bind("mousedown,mouseup,keydown,keyup", function(t) {
                            t.stopPropagation()
                        }), T(".bt-groups .cancel").bind("click", function() {
                            o.correctLocLabel && o.correctLocLabel.hide(), o.pCorrectLocMarker && o.pCorrectLocMarker.hide(), o.showIpLocPoint(o.ipLocPoint)
                        }), require.async("common:widget/ui/ui3MapSuggest/ui3MapSuggest.js", function(t) {
                            t.initialize({
                                input: T(".right-addr-input"),
                                isAutoWidth: !0,
                                adjustTop: 0,
                                showMyPlace: !1,
                                from: "ipAddrCorrect",
                                hasHistory: !1,
                                onlyPrecise: !0,
                                onSelect: function(t, e, i) {
                                    o.addr = t, o.faddr = e, o.correctType = "input", T(".addr").text(t), T(".faddr").text(e);
                                    var a = "/?ugc_type=3&ugc_ver=1&qt=detailConInfo&uid=" + i + "&t=" + new Date;
                                    a += "&auth=" + encodeURIComponent(window.AUTH), window.SECKEY && (a += "&seckey=" + encodeURIComponent(window.SECKEY)), baidu.ajax(a, {
                                        dataType: "json",
                                        success: function(t) {
                                            var e = util.parseGeo(t.content.geo),
                                                i = e.points;
                                            o.rightPoint = i
                                        },
                                        error: function() {}
                                    })
                                }
                            })
                        }), addStat("ip.correct-inf", "click")
                    })
                }
            });
            setTimeout(function() {
                var t = util.getParam(location.href);
                t && t.latlng && t.autoOpen || o._map.temp && o._map.temp.infoWin && o._map.temp.infoWin.close(), o.pLabel.setPoint(o.ipLocPoint);
                var e = o.titleTpl({
                    addrs: o.addrs,
                    formatted_address: o.formatted_address
                });
                o.pLabel.setContent(e);
                var i = o._calContentSize(e),
                    a = i.width / 2 - 1;
                o.pLabel.setOffset(new BMap.Size(-a, constant.A_IP_LABEL_OFFSET_HEIGHT)), userSelection = window.localStorage.getItem("userSelection"), userSelection && "sureLoc" === userSelection && o.pLabel.show()
            }, 500)
        },
        pCreateMarker: function() {
            var t = new BMap.Icon(constant.A_IP_MARKER_IMG, constant.A_IP_MARKER_BLUE_SIZE, {
                    offset: constant.A_IP_MARKER_BLUE_OFFSET,
                    imageOffset: new BMap.Size(0, 1),
                    infoWindowOffset: constant.A_J_MARKER_INFOWND_OFFSET,
                    imageSize: constant.A_IP_MARKER_IMG_SIZE,
                    srcSet: constant.A_IP_MARKER_IMG_SRCSET
                }),
                e = new BMap.Marker(this.ipLocPoint, {
                    icon: t,
                    enableMassClear: !1,
                    zIndexFixed: !0,
                    baseZIndex: 2e6
                });
            this.pMarker = e
        },
        pCreateCorrectLocMarker: function() {
            var t = new BMap.Icon(constant.A_IP_CORRECR_LOC_MARKER_IMG, new BMap.Size(18, 25), {
                    offset: new BMap.Size(9, 4),
                    imageOffset: new BMap.Size(0, 19),
                    infoWindowOffset: new BMap.Size(9, 13),
                    imageSize: new BMap.Size(18, 45),
                    isTop: !0
                }),
                e = new BMap.Marker(this.ipLocPoint, {
                    icon: t,
                    enableMassClear: !1,
                    startAnimation: "iploc-pCorrect-marker"
                });
            e.setTop(!0, 9999999999), e.enableDragging(), this.pCorrectLocMarker = e
        },
        pCreateCircle: function() {
            var t = new BMap.Circle(this.ipLocPoint, this.radius || 100);
            t.setStrokeColor("#3285ff"), t.setFillColor("#3386ff"), t.setFillOpacity(.1), t.setStrokeWeight(1), t.disableMassClear(), this.pCircle = t
        },
        pCreateLabel: function() {
            var t = new BMap.Label(this.ipLocPoint, {
                    enableMassClear: !1
                }),
                e = this.titleTpl({
                    addrs: this.addrs
                });
            return t.setContent(e), t.setOffset(new BMap.Size(-200, constant.A_IP_LABEL_OFFSET_HEIGHT)), t.setStyles({
                backgroundColor: "none",
                border: "none"
            }), this.pLabel = t, this
        },
        pCreateErrorCheckLabel: function() {
            this.pLabel && this.pLabel.hide();
            var t = new BMap.Label(this.ipLocPoint, {
                    enableMassClear: !1
                }),
                e = this.errorTpl({
                    addrs: this.addrs,
                    formatted_address: this.formatted_address
                }),
                o = this._calContentSize(e),
                i = o.width / 2 - 1;
            return t.setContent(e), t.setOffset(new BMap.Size(-1 * i, constant.A_IP_LABEL_OFFSET_HEIGHT - 53)), t.setStyles({
                backgroundColor: "none",
                border: "none"
            }), this.pErrorLabel = t, this
        },
        pCreateCorrectLocLabel: function() {
            this.pErrorLabel && this.pErrorLabel.hide();
            var t = new BMap.Label(this.ipLocPoint, {
                    enableMassClear: !1
                }),
                e = this.correctLocTpl({
                    addrs: this.addrs,
                    formatted_address: this.formatted_address
                }),
                o = this._calContentSize(e),
                i = o.width / 2 - 7;
            return t.setContent(e), t.setOffset(new BMap.Size(-1 * i, constant.A_IP_LABEL_OFFSET_HEIGHT - 158)), t.setStyles({
                backgroundColor: "none",
                border: "none",
                zIndex: "999999999"
            }), this.pCorrectLocMarker.setLabel(t), this.correctLocLabel = t, this
        },
        closePanel: function() {
            this.correctLocLabel && this.correctLocLabel.hide(), this.pErrorLabel && this.pErrorLabel.hide(), this.pLabel && this.pLabel.hide(), this.pCorrectLocMarker && this.pCorrectLocMarker.hide(), this.pMarker && this.pMarker.show()
        },
        creatLoccard: function() {
            var t = document.createElement("div"),
                e = '<div id="userLocmask"><div id="allowLocationCard" class="allow-location-con"><p class="allow-tip">是否允许百度地图访问您的位置</p><div class="locbtn-con"><div class="cancel-btn cancelLoc-btn locbtn">取消</div><div class="sure-btn sureLoc-btn locbtn">确定</div><div></div></div>';
            return t.innerHTML = e, t
        },
        showAcessLoccard: function() {
            var t = this,
                e = t.creatLoccard();
            document.body.appendChild(e), t.bindUserlocEvent()
        },
        bindUserlocEvent: function() {
            var t = this,
                e = !1,
                o = !1,
                i = $(".cancelLoc-btn"),
                a = $(".sureLoc-btn");
            i && $(i).on("click", function() {
                e = !0, t.hideAcessLoccard(), window.localStorage.setItem("userSelection", "notLoc")
            }), a && $(a).on("click", function() {
                o = !0, t.hideAcessLoccard(), t.ipLocate(), window.localStorage.setItem("userSelection", "sureLoc")
            })
        },
        hideAcessLoccard: function() {
            var t = $("#allowLocationCard"),
                e = $("#userLocmask");
            t && (t.remove(), e.remove())
        },
        bindEvents: function() {
            var t = this;
            this.control.$ele.bind({
                click: function() {
                    userSelection = window.localStorage.getItem("userSelection"), t.pFlashLocateIcon(), userSelection && "notLoc" !== userSelection ? userSelection && "sureLoc" === userSelection && t.ipLocate() : t.showAcessLoccard(), addStat("iplocation.iplocat.button", "click")
                },
                mouseover: function() {
                    t.failedShowTimer || t.control.$title.removeClass("hide")
                },
                mouseout: function() {
                    t.control.$title.addClass("hide")
                }
            }), listener.on("searchbox.search", function() {
                t.closePanel()
            }), listener.on("ui.cardmgr", "add", function() {
                t.closePanel()
            }), listener.on("com.subway", "load", function() {
                t.closePanel()
            }), listener.on("uitool", function() {
                t.closePanel()
            })
        },
        pFlashLocateIcon: function(t) {
            return "success" === t ? (this.flashIconTimer && (clearTimeout(this.flashIconTimer), this.flashIconTimer = null, this.flashCounts = 0), void this.control.$icon.removeClass().addClass("success")) : "failed" === t ? (this.flashIconTimer && (clearTimeout(this.flashIconTimer), this.flashIconTimer = null), void this.control.$icon.removeClass().addClass("normal")) : void("loading" === t && (this.flashIconTimer && (clearTimeout(this.flashIconTimer), this.flashIconTimer = null), this.control.$icon.removeClass().addClass("loading")))
        },
        pShowLocatedFailed: function() {
            this._map.removeOverlay(this.pMarker), this._map.removeOverlay(this.pCircle), this._map.removeOverlay(this.pLabel);
            var t = this;
            this.control.$titleFailed.removeClass("hide"), t.failedShowTimer = setTimeout(function() {
                t.control.$titleFailed.addClass("hide"), t.failedShowTimer = null
            }, 3e3)
        },
        ipLocate: function() {
            var t = this;
            t.correctLocLabel && t.correctLocLabel.hide(), t.pCorrectLocMarker && t.pCorrectLocMarker.hide(), t.pErrorLabel && t.pErrorLabel.hide();
            var e = window.localStorage.getItem("CorrectLoc_" + this.ip),
                o = e && JSON.parse(e),
                i = o && o.time,
                a = +new Date;
            if (i > 0 && void 0 !== i && 6048e5 > a - i && "" !== t.addrs) {
                var o = JSON.parse(e),
                    r = o.lng,
                    n = o.lat,
                    s = new BMap.Point(r, n);
                t.addrs = o.addr, t.formatted_address = o.faddr, t.showIpLocPoint(s), t._map.getZoom() > 15 && t._map.flyTo(s, 15), addStat("ip.located.fromlocal", "ipLocated")
            } else {
                t.pFlashLocateIcon("loading");
                var c = "/?qt=ipLocation";
                this.ip && (c += "&ip=" + this.ip), c += "&t=" + (new Date).getTime(), this.control.$title.addClass("hide"), T.ajax(c, {
                    dataType: "json",
                    method: "get",
                    success: function(e) {
                        e && "located" === e.status && 0 === e.code && (e = t.oldJson), e && e.ipLoc && "success" === e.ipLoc.status && e.ipLoc.content.radius <= 1e3 ? (t.setData(e), t.pFlashLocateIcon("success"), addStat("iplocation.iplocat.success", "click")) : t.browserPosition("click")
                    },
                    error: function() {
                        addStat("iplocation.iplocat.failed", "click"), t.browserPosition("click")
                    }
                })
            }
        }
    };
    module.exports = IpLocation
});;
define("common:widget/view/View.js", function(e, i, n) {
    function t() {
        T.lang.Class.call(this)
    }
    T.inherits(t, T.lang.Class, "View"), T.extend(t.prototype, {
        render: function() {
            try {
                return !0
            } catch (e) {
                "undefined" != typeof alog && alog("exception.fire", "catch", {
                    msg: e.message || e.description,
                    path: "common:widget/view/View.js",
                    ln: 11
                })
            }
        },
        initialize: function() {
            try {} catch (e) {
                "undefined" != typeof alog && alog("exception.fire", "catch", {
                    msg: e.message || e.description,
                    path: "common:widget/view/View.js",
                    ln: 15
                })
            }
        },
        unload: function() {}
    }), n.exports = t
});;
define("common:widget/ui/areaCfg/areaCfg.js", function(n, a, e) {
    var i = "中国|1,安徽|23,福建|16,甘肃|6,广东|7,广西|17,贵州|24,海南|21,河北|25,黑龙江|2,河南|30,湖北|15,湖南|26,江苏|18,江西|31,吉林省|9,辽宁|19,内蒙古|22,宁夏|20,青海|11,山东|8,山西|10,陕西|27,四川|32,新疆|12,西藏|13,云南|28,浙江|29,北京|131,天津|332,石家庄|150,唐山|265,秦皇岛|148,邯郸|151,邢台|266,保定|307,张家口|264,承德|207,沧州|149,廊坊|191,衡水|208,太原|176,大同|355,阳泉|357,长治|356,晋城|290,朔州|237,晋中|238,运城|328,忻州|367,临汾|368,吕梁|327,呼和浩特|321,包头|229,乌海|123,赤峰|297,通辽|64,鄂尔多斯|283,呼伦贝尔|61,巴彦淖尔|169,乌兰察布|168,兴安盟|62,锡林郭勒盟|63,阿拉善盟|230,沈阳|58,大连|167,鞍山|320,抚顺|184,本溪|227,丹东|282,锦州|166,营口|281,阜新|59,辽阳|351,盘锦|228,铁岭|60,朝阳|280,葫芦岛|319,长春|53,吉林市|55,四平|56,辽源|183,通化|165,白山|57,松原|52,白城|51,延边朝鲜族自治州|54,哈尔滨|48,齐齐哈尔|41,鸡西|46,鹤岗|43,双鸭山|45,大庆|50,伊春|40,佳木斯|42,七台河|47,牡丹江|49,黑河|39,绥化|44,大兴安岭地区|38,上海|289,南京|315,无锡|317,徐州|316,常州|348,苏州|224,南通|161,连云港|347,淮安|162,盐城|223,扬州|346,镇江|160,泰州|276,宿迁|277,杭州|179,宁波|180,温州|178,嘉兴|334,湖州|294,绍兴|293,金华|333,衢州|243,舟山|245,台州|244,丽水|292,合肥|127,芜湖|129,蚌埠|126,淮南|250,马鞍山|358,淮北|253,铜陵|337,安庆|130,黄山|252,滁州|189,阜阳|128,宿州|370,巢湖|251,六安|298,亳州|188,池州|299,宣城|190,福州|300,厦门|194,莆田|195,三明|254,泉州|134,漳州|255,南平|133,龙岩|193,宁德|192,南昌|163,景德镇|225,萍乡|350,九江|349,新余|164,鹰潭|279,赣州|365,吉安|318,宜春|278,抚州|226,上饶|364,济南|288,青岛|236,淄博|354,枣庄|172,东营|174,烟台|326,潍坊|287,济宁|286,泰安|325,威海|175,日照|173,莱芜|124,临沂|234,德州|372,聊城|366,滨州|235,菏泽|353,郑州|268,开封|210,洛阳|153,平顶山|213,安阳|267,鹤壁|215,新乡|152,焦作|211,濮阳|209,许昌|155,漯河|344,三门峡|212,南阳|309,商丘|154,信阳|214,周口|308,驻马店|269,武汉|218,黄石|311,十堰|216,宜昌|270,襄阳|156,鄂州|122,荆门|217,孝感|310,荆州|157,黄冈|271,咸宁|362,随州|371,恩施土家族苗族自治州|373,仙桃|1713,潜江|1293,天门|2654,神农架林区|2734,长沙|158,株洲|222,湘潭|313,衡阳|159,邵阳|273,岳阳|220,常德|219,张家界|312,益阳|272,郴州|275,永州|314,怀化|363,娄底|221,湘西土家族苗族自治州|274,广州|257,韶关|137,深圳|340,珠海|140,汕头|303,佛山|138,江门|302,湛江|198,茂名|139,肇庆|338,惠州|301,梅州|141,汕尾|339,河源|200,阳江|199,清远|197,东莞|119,中山|187,潮州|201,揭阳|259,云浮|258,南宁|261,柳州|305,桂林|142,梧州|304,北海|295,防城港|204,钦州|145,贵港|341,玉林|361,百色|203,贺州|260,河池|143,来宾|202,崇左|144,海口|125,三亚|121,五指山|1644,琼海|2358,儋州|1215,文昌|2758,万宁|1216,东方|2634,定安|1214,屯昌|1641,澄迈|2757,临高|2033,白沙黎族自治|2359,昌江黎族自治|1642,乐东黎族自治|2032,陵水黎族自治|1643,保亭黎族苗族自治|1217,琼中黎族苗族自治|2031,重庆|132,成都|75,自贡|78,攀枝花|81,泸州|331,德阳|74,绵阳|240,广元|329,遂宁|330,内江|248,乐山|79,南充|291,眉山|77,宜宾|186,广安|241,达州|369,雅安|76,巴中|239,资阳|242,阿坝藏族羌族自治州|185,甘孜藏族自治州|73,凉山彝族自治州|80,贵阳|146,六盘水|147,遵义|262,安顺|263,铜仁市|205,黔西南布依族苗族自治州|343,毕节市|206,黔东南苗族侗族自治州|342,黔南布依族苗族自治州|306,昆明|104,曲靖|249,玉溪|106,保山|112,昭通|336,丽江|114,临沧|110,楚雄彝族自治州|105,红河哈尼族彝族自治州|107,文山壮族苗族自治州|177,普洱|108,西双版纳傣族自治州|109,大理白族自治州|111,德宏傣族景颇族自治州|116,怒江傈僳族自治州|113,迪庆藏族自治州|115,拉萨|100,昌都市|99,山南地区|97,日喀则市|102,那曲地区|101,阿里地区|103,林芝市|98,西安|233,铜川|232,宝鸡|171,咸阳|323,渭南|170,延安|284,汉中|352,榆林|231,安康|324,商洛|285,兰州|36,嘉峪关|33,金昌|34,白银|35,天水|196,武威|118,张掖|117,平凉|359,酒泉|37,庆阳|135,定西|136,陇南|256,临夏回族自治州|182,甘南藏族自治州|247,西宁|66,海东市|69,海北藏族自治州|67,黄南藏族自治州|70,海南藏族自治州|68,果洛藏族自治州|72,玉树藏族自治州|71,海西蒙古族藏族自治州|65,银川|360,石嘴山|335,吴忠|322,固原|246,中卫|181,乌鲁木齐|92,克拉玛依|95,吐鲁番地区|89,哈密地区|91,昌吉回族自治州|93,博尔塔拉蒙古自治州|88,巴音郭楞蒙古自治州|86,阿克苏地区|85,克孜勒苏柯尔克孜自治州|84,喀什地区|83,和田地区|82,伊犁哈萨克自治州|90,塔城地区|94,阿勒泰地区|96,石河子|770,阿拉尔|731,图木舒克|792,五家渠|789,香港特别行政区|2912,澳门特别行政区|2911,凤凰县|1724,台北|9002,高雄|9019,台中|9017,台南|9016,新北|9010,基隆|9011,新竹|9006,嘉义|9013".split(","),
        r = [];
    ! function() {
        for (var n = 0; n < i.length; n++) {
            var a = i[n].split("|");
            r[a[0]] = a[1]
        }
    }(), null != r["中国"] && (r["全国"] = r["中国"]), e.exports = r
});;
define("common:widget/ui/stat/CodeStat.js", function(t, r, e) {
    function n() {
        var t = {},
            r = document.referrer && document.referrer.match(/^(?:(\w+):\/\/)?(?:(\w+):?(\w+)?@)?([^:\/\?#]+)(?::(\d+))?(\/[^\?#]+)?(?:\?([^#]+))?(?:#(\w+))?/);
        if (r) var e = r[4];
        else var e = "";
        var n, o = T.url.queryToJson(location.search);
        if ("www.hao123.com" == e ? n = "hao123" : "www.baidu.com" == e ? "alamap" == o.from ? (n = "阿拉丁", t.alatpl = o.tpl) : (n = "pstab", t.pstabDetail = -1 == document.referrer.indexOf("word") ? "搜索前" : "搜索后") : "" == e ? n = "自有用户" : (n = "其他来源", t.otherReferer = e), o.third_party && (t.third_party = o.third_party), o.s) {
            var a = o.s.substring(0, o.s.indexOf("%"));
            a && (t.qt = a);
            var i = T.url.queryToJson(decodeURIComponent(o.s));
            i && i.wd && (t.wd = i.wd)
        }
        t.refer = n
    }
    var o = function() {
        function r(t) {
            var r, e = window.poiResponse,
                n = e && e.result,
                t = t || {};
            if (e && n) {
                r = {
                    from: "map",
                    query: n.return_query || n.wd || "",
                    qid: n.qid || "",
                    page_num: isNaN(Number(n.page_num)) ? "" : "" + n.page_num
                };
                for (var o in r) r.hasOwnProperty(o) && r[o] && (t[o] = r[o])
            }
            return t
        }

        function e(t, r, e) {
            function o() {
                var r = "//map.baidu.com/newmap_test/static/common/images/transparent.gif?newmap=1" + t;
                i.src = r, i.onload = n
            }
            t && (d = !0, e ? o() : setTimeout(function() {
                o()
            }, r || 50))
        }

        function n() {
            var t = c.shift();
            return t ? void e(t) : void(d = !1)
        }

        function o() {
            d = !1, n()
        }

        function a(t, r) {
            var e = "";
            for (var n in t) "undefined" != typeof t[n] && (e = r ? e + "&" + n + "=" + encodeURIComponent(t[n]) : e + "&" + n + "=" + t[n]);
            return e
        }
        var i = new Image,
            d = !1,
            c = [],
            u = {
                READY: "ready",
                SHOW: "show",
                CLICK: "click",
                HIDE: "hide"
            },
            s = t("common:widget/ui/config/config.js"),
            f = s.modelConfig;
        return i.onload = o, i.onerror = o, window.statParamInterceptor = r, {
            addStat: function(t, n, o, i) {
                if (t) {
                    var s, o = o || {};
                    if (o.da_par = window._SOURCE, o.da_e_name || (o.da_e_name = "pcmap4.1"), "number" == typeof t) o = n || {}, (o.uid || o.tag || o.useraction) && (o = r(o)), o.code = t, o.t = (1e8 * Math.random()).toFixed(0), o.c = f.cityCode, s = a(o, !0);
                    else {
                        if (n = n || "click", !t || "string" != typeof n || !u[n.toUpperCase()]) return;
                        o.da_src = t, o.da_act = n, o.resid = 61, o.t = (new Date).getTime(), s = a(o)
                    }
                    d ? c.push(s) : e(s, 0, i)
                }
            },
            classStat: function() {}
        }
    }();
    window.addStat = o.addStat, window.ccStat = o.classStat,
        function() {
            window.ReportError = function() {};
            window.ErrorMonitor = function() {}, window.onerror = function() {}
        }(), e.exports = {
            addStat: o.addStat,
            ccStat: o.classStat,
            pvstat: n
        }
});;
define("common:widget/ui/util/util.js", function(e, t, n) {
    var r = {
            taxi: [131, 289, 257, 340, 75, 332, 179, 218, 224, 315, 132, 268, 233, 288, 236, 158],
            smp: [1, 2, 11, 21, 26, 28, 36, 38, 39, 41],
            smpSug: ["PoiSearch", "BusSearchSta", "BusSearchEnd", "DriveSearchSta", "DriveSearchEnd", "iw_ssn", "iw_esn"]
        },
        i = {
            cssPrefixes: ["Webkit", "ms"],
            vendorPropName: function(e, t) {
                if (t in e) return t;
                for (var n = t[0].toUpperCase() + t.slice(1), r = this.cssPrefixes.length; r--;)
                    if (t = this.cssPrefixes[r] + n, t in e) return t;
                return !1
            },
            vendorEvent: function(e, t, n) {
                var r = {
                    animationend: {
                        style: "animation",
                        events: ["animationend", "webkitAnimationEnd"]
                    },
                    animationstart: {
                        style: "animation",
                        events: ["animationstart", "webkitAnimationStart"]
                    },
                    transitionstart: {
                        style: "transition",
                        events: ["transitionstart", "webkitTransitionStart"]
                    },
                    transitionend: {
                        style: "transition",
                        events: ["transitionend", "webkitTransitionEnd"]
                    }
                };
                if (e) {
                    var i = e.style;
                    if (this.vendorPropName(i, r[t].style))
                        for (var a = r[t].events, o = 0; o < a.length; o++) e.addEventListener(a[o], function(e) {
                            n && n(e)
                        });
                    else n && n()
                } else n && n()
            },
            urlencode: function(e, t) {
                var n = Math.round(1e4 * Math.random()),
                    r = document.createElement("form");
                r.method = "get", r.style.display = "none", r.acceptCharset = t, (document.all || T.browser.ie) && (window.oldCharset = document.charset, document.charset = t);
                var i = document.createElement("input");
                i.type = "hidden", i.name = "str", i.value = e, r.appendChild(i);
                var a = document.createElement("input");
                if (a.type = "hidden", a.name = "random", a.value = n, r.appendChild(a), r.target = "_urlEncode_iframe_" + n, document.body.appendChild(r), !window["_urlEncode_iframe_" + n]) {
                    var o;
                    if (document.all || T.browser.ie) try {
                        o = document.createElement('<iframe name="_urlEncode_iframe_' + n + '"></iframe>')
                    } catch (s) {
                        o = document.createElement("iframe"), o.setAttribute("name", "_urlEncode_iframe_" + n)
                    } else o = document.createElement("iframe"), o.setAttribute("name", "_urlEncode_iframe_" + n);
                    o.style.display = "none", o.width = "0", o.height = "0", o.scrolling = "no", o.allowtransparency = "true", o.frameborder = "0", o.src = "about:blank", document.body.appendChild(o)
                }
                return new Promise(function(e, t) {
                    window["_urlEncode_iframe_callback" + n] = function(t) {
                        e(t), (document.all || T.browser.ie) && (document.charset = window.oldCharset), r.parentNode.removeChild(r), o.parentNode.removeChild(o)
                    }, r.action = "/wolfman/static/common/getencodestr_a8a7084.html", r.submit(), setTimeout(function() {
                        t()
                    }, 2e3)
                })
            },
            capitalize: function(e) {
                return e.charAt(0).toUpperCase() + e.slice(1)
            },
            getClassName: function(e) {
                var t = /function (.{1,})\(/,
                    n = t.exec(e.constructor.toString());
                return n && n.length > 1 ? n[1] : ""
            },
            beforeEndHTML: function(e, t) {
                var n = document.createElement("div");
                n.innerHTML = t;
                for (var r = n.childNodes.length, i = 0; r > i; i++) e.appendChild(n.childNodes[0]);
                return n = null, e.lastChild
            },
            evalScript: function(e) {
                var t = document.getElementsByTagName("head")[0] || document.documentElement,
                    n = document.createElement("script");
                n.type = "text/javascript";
                try {
                    n.appendChild(document.createTextNode(e))
                } catch (r) {
                    n.text = e
                }
                t.insertBefore(n, t.firstChild), t.removeChild(n)
            },
            formatBounds: function(e) {
                e = e || {}, e.heading = 0, e.tilt = 0;
                var t = map.getBounds(e);
                return t ? "(" + t.minX + "," + t.minY + ";" + t.maxX + "," + t.maxY + ")" : ""
            },
            formatBlinfo: function(e) {
                for (var t, n = [], r = 0, i = {}, a = e.length; a > r; r++)
                    if (t = e[r].addr, i[t]) {
                        var o = n[i[t] - 1];
                        o.uid = o.uid + "_" + e[r].uid, o.index = o.index + "_" + r, n.push(e[r])
                    } else {
                        var s = T.extend({}, e[r]);
                        n.push(s), n[r].index = r, i[t] = r + 1
                    }
                return n
            },
            geoToPoint: function(e) {
                var t = e.split("|");
                if (1 == t[0]) {
                    var n = t[1].split(","),
                        r = new BMap.Point(parseFloat(n[0]), parseFloat(n[1]));
                    return r
                }
            },
            getParam: function(e) {
                if (e.indexOf("?") > -1) var t = e.slice(e.indexOf("?") + 1);
                else {
                    if (!(e.indexOf("#") > -1)) return;
                    var t = e.slice(e.indexOf("#") + 1)
                }
                if ("" != t) {
                    for (var n = {}, r = t.split("&"), i = 0; i < r.length; i++) {
                        var a = r[i].split("=");
                        if (a[1]) {
                            var o = a[1].indexOf("#");
                            a[1] = o > -1 ? a[1].slice(0, o) : a[1], n[a[0]] = a[1]
                        }
                    }
                    return n
                }
            },
            extendHashParam: function(e, t) {
                if (e.indexOf("#") > -1) {
                    var n = e.slice(e.indexOf("#") + 1);
                    if ("" != n)
                        for (var r = n.split(/[&\?]/), i = 0; i < r.length; i++) {
                            var a = r[i].split("=");
                            if (a[1]) {
                                var o = a[1].indexOf("#");
                                a[1] = o > -1 ? a[1].slice(0, o) : a[1], t[a[0]] = a[1]
                            }
                        }
                }
                return t
            },
            getOverlayPoint: function(e) {
                return e.getPoint ? e.getPoint() : e.getPosition()
            },
            getPointByStr: function(e) {
                if ("string" == typeof e) {
                    var t = e.split(",");
                    if (!(t.length < 2)) return new BMap.Point(t[0], t[1])
                }
            },
            getBPoints: function(e) {
                if (e && 0 != e.length) {
                    for (var t = [], n = 0; n < e.length; n++)
                        if (e[n])
                            for (var r = e[n].split(";"), i = 0; i < r.length; i++) {
                                var a = this.getPointByStr(r[i]);
                                t.push(a)
                            }
                    return t
                }
            },
            getPointsBounds: function(e) {
                for (var t = new BMap.Bounds, n = 0, r = e.length; r > n; n++) t.extend(e[n]);
                return t
            },
            getPoiPoint: function(e) {
                var t = [],
                    n = null;
                if (!e) return null;
                if ("Point" == e.toString()) n = e;
                else {
                    if ("string" == typeof e) {
                        if (t = T.trim(e).split(","), t.length < 2) return;
                        t[0] = parseFloat(T.trim(t[0])), t[1] = parseFloat(T.trim(t[1]))
                    } else if (t = e.slice(0), t.length < 2) return;
                    n = new BMap.Point(t[0], t[1])
                }
                return n
            },
            parseGeo: function(e) {
                if ("string" == typeof e) {
                    var t = e.split("|"),
                        n = parseInt(t[0]),
                        r = t[1],
                        i = t[2],
                        a = i.split(";");
                    if (4 === n) {
                        for (var o = [], s = 0; s < a.length - 1; s++) {
                            var u = s + 1 + "-";
                            0 === a[s].indexOf(u) && o.push(a[s].substr(u.length, a[s].length - 2))
                        }
                        a = o, a.push("")
                    }
                    var l = [];
                    switch (n) {
                        case 1:
                            l.push(a[0]);
                            break;
                        case 2:
                        case 3:
                        case 4:
                            for (var s = 0; s < a.length - 1; s++) {
                                var c = a[s];
                                if (c.length > 100) c = c.replace(/(-?[1-9]\d*\.\d*|-?0\.\d*[1-9]\d*|-?0?\.0+|0|-?[1-9]\d*),(-?[1-9]\d*\.\d*|-?0\.\d*[1-9]\d*|-?0?\.0+|0|-?[1-9]\d*)(,)/g, "$1,$2;"), l.push(c);
                                else {
                                    for (var d = [], f = c.split(","), h = 0; h < f.length; h += 2) {
                                        var m = f[h],
                                            p = f[h + 1];
                                        d.push(m + "," + p)
                                    }
                                    l.push(d.join(";"))
                                }
                            }
                    }
                    return l.length <= 1 && (l = l.toString()), {
                        type: n,
                        bound: r,
                        points: l
                    }
                }
            },
            isInteger: function(e) {
                return /^\+?[1-9][0-9]*$/.test(e)
            },
            filtQuery: function(e) {
                return e = e || "", e.replace(/[\uac00-\ud7a3]/g, "").replace(/\u2022|\u2027|\u30FB/g, String.fromCharCode(183)).replace(/^\s*|\s*$/g, "")
            },
            fixed: function(e, t) {
                for (var e = e.toString(); e.length < t;) e = "0" + e;
                return e
            },
            isInBounds: function(e, t) {
                return t = t || map.getBounds(), t.containsPoint(e)
            },
            getClientSize: function() {
                var e = document;
                return {
                    width: e.body.clientWidth,
                    height: e.body.clientHeight
                }
            },
            jsonToQuery: function(e, t, n) {
                var r = [];
                t = t || function(e) {
                    return e
                };
                for (var i in e) {
                    var a = e[i];
                    if ("" !== a && null != a && "undefined" != typeof a) {
                        var o = t(a);
                        if (n)
                            for (var s = 0; s < n.length; s++) {
                                var u = n[s];
                                o = o.replace(new RegExp(t(u), "g"), u)
                            }
                        r.push(i + "=" + o)
                    }
                }
                return r.join("&")
            },
            isActiveCity: function(e, t) {
                return T.array.some(r[e], function(e) {
                    return e == t
                })
            },
            stopBubble: function(e) {
                var e = window.event || e;
                e.stopPropagation ? e.stopPropagation() : e.cancelBubble = !0
            },
            preventDefault: function(e) {
                var e = window.event || e;
                return e.preventDefault ? e.preventDefault() : e.returnValue = !1, !1
            },
            purgeEvents: function(e) {
                if (e) {
                    var t = e.attributes,
                        n = "";
                    if (t)
                        for (var r = 0, i = t.length; i > r; r++) n = t[r].name, "function" == typeof e[n] && (e[n] = null);
                    var a = e.childnodes;
                    if (a)
                        for (var r = 0, i = a.length; i > r; r++) arguments.callee(e.childnodes[r])
                }
            },
            loadSearchInfo: function(t) {
                e.async("common:widget/ui/searchInfoWindow/searchInfoWindow.js", function(e) {
                    t && t(e)
                })
            },
            loadSearchSimpleInfo: function(t) {
                e.async("common:widget/ui/searchInfoWindow/searchSimpleInfoWindow.js", function(e) {
                    t && t(e)
                })
            },
            getMapSize: function() {
                var e = this.getClientSize().width,
                    t = this.getClientSize().height;
                return {
                    width: e,
                    height: t
                }
            },
            isSupportCssProp: function() {
                var e = document.createElement("div"),
                    t = "Khtml O Moz webkit".split(" "),
                    n = t.length;
                return function(r) {
                    if (r in e.style) return !0;
                    if ("-ms-" + r in e.style) return !0;
                    for (r = r.replace(/^[a-z]/, function(e) {
                            return e.toUpperCase()
                        }); n--;)
                        if (t[n] + r in e.style) return !0;
                    return !1
                }
            }(),
            placeHolder: function(e, t) {
                var n = e.attr("placeholder"),
                    t = t || T;
                (8 == t.browser.ie || 9 == t.browser.ie && n) && (e.val(n), e.focus(function() {
                    t(this).val() === n && t(this).val("")
                }).blur(function() {
                    var e = t(this);
                    "" === e.val() && e.val(n)
                }))
            },
            pointInPolygon: function(e, t) {
                for (var n = e[0], r = e[1], i = !1, a = 0, o = t.length - 2; a < t.length; a += 2) {
                    var s = t[a],
                        u = t[a + 1],
                        l = t[o],
                        c = t[o + 1],
                        d = u > r != c > r && (l - s) * (r - u) / (c - u) + s > n;
                    d && (i = !i), o = a
                }
                return i
            }
        };
    n.exports = i
});;
define("common:widget/ui/config/config.js", function(t, a, i) {
    var e = t("common:widget/ui/areaCfg/areaCfg.js"),
        n = 398,
        o = {
            leftMargin: 0,
            viewportLeftMargin: n,
            infowinMargin: [60, 10, 70, 10 + n],
            "3d_city": {},
            poiSearch: {
                enableRoute: !0,
                showCircle: !0
            },
            busTrans: {
                enableDragging: !0
            },
            navTrans: {
                enableDragging: !0
            },
            navWalk: {
                enableDragging: !0
            },
            navBike: {
                enableDragging: !1
            },
            host: function(t, a) {
                if (!t) return "";
                var i = p.cdnHost;
                if (!T.isArray(i) || !i.length) return t;
                var e = t.split("."),
                    n = 1 === e.length ? e[0] : e[e.length - 2],
                    o = n.charCodeAt(n.length - 1);
                return i = i[o % i.length], /^http[s]?:\/\//.test(t) ? t.replace(/^http[s]?:\/\/[^\/]*/, i) : i + (0 == t.indexOf("/") ? "" : "/") + t
            },
            smFlwCon: ""
        },
        m = {
            DATA_URL: "?newmap=1&reqflag=pcmap&biz=1&from=webmap&da_par=" + window._SOURCE + "&pcevaname=pc4.1&qt=",
            STAT_VERSION: "pcmap4",
            cityName: "全国",
            cityCode: e["全国"],
            upCityid: e["全国"],
            highLevel: 19,
            cityType: 0,
            supBus: 0,
            sup: 0,
            level: {
                country: 5,
                province: 11,
                city: 12,
                area: 13,
                cityindex: 12,
                countryindex: 5,
                provinceindex: 11,
                areaindex: 13
            },
            defalutCityCode: null,
            enableMapMove: !0,
            panoCityName: "",
            panoCityCode: "",
            timg: "/wolfman/static/common/images/transparent.gif",
            indexModelCode: {
                0: "CountryIndex",
                1: "ProvinceIndex",
                2: "CityIndex",
                3: "AreaIndex"
            }
        },
        c = TVC.ditu,
        r = PANOVC.ditu,
        s = {};
    s = TVC.ditu && TVC.ditu.normal ? {
        normal: c.normal.version,
        satellite: c.satellite.version,
        normalTraffic: c.normalTraffic.version,
        satelliteTraffic: c.satelliteTraffic.version,
        mapJS: c.mapJS.version,
        mapJSUdt: c.mapJS.updateDate,
        INDOOR_CLICK_VER: r.panoClick.version,
        UDT_VERSION: r.panoUdt.version
    } : {
        normal: "000",
        satellite: "000",
        normalTraffic: "000",
        satelliteTraffic: "000",
        mapJS: "000",
        mapJSUdt: "000000",
        INDOOR_CLICK_VER: "000",
        UDT_VERSION: "000"
    };
    var p = {
            PANO_URL: "//mapsv0.bdimg.com/",
            MAP_PHPUI_URL: "//map.baidu.com/?",
            DETAIL_MAP_URL: "//map.baidu.com/detail?",
            PANO_TILE_URL: ["//mapsv0.bdimg.com", "//mapsv1.bdimg.com"],
            PANO_ROAD_LAYER: "//mapsv0.bdimg.com",
            PANO_3DIMAGE_URL: "//mapsv0.bdimg.com",
            PANO_PHPUI_URL: "https://sv0.map.baidu.com",
            PANO_ROUTE_VIDEO_URL: "//mapsv0.bdimg.com",
            PANO_AERIAL_VIDEO_SERVER_URL: "//mapsv0.bdimg.com/video/",
            PANO_INDOOR_ICON_URL: "//mapsv0.bdimg.com",
            PANO_VIDEO_SERVER_URL: "http://atv.map.baidu.com",
            PANO_HOME_URL: "https://quanjing.baidu.com",
            MapComplaintCenterURL: "http://tousu.baidu.com/map/",
            MAP_CENTER_URL: "//" + window.location.host,
            cdnHost: ["//webmap0.bdimg.com", "//webmap1.bdimg.com"],
            DETAIL_PAGE_URL: "//" + window.location.host
        },
        d = {
            1: {
                sy: 5
            },
            3: {
                sy: 0
            },
            4: {
                sy: 2
            },
            5: {
                sy: 3
            }
        },
        l = {
            0: {
                ck: 3,
                txt: "(推荐路线)"
            },
            5: {
                ck: 1,
                txt: "(时间短)"
            },
            2: {
                ck: 4,
                txt: "(少换乘)"
            },
            3: {
                ck: 5,
                txt: "(少步行)"
            },
            4: {
                ck: 6,
                txt: "(不坐地铁)"
            },
            t: "公交：",
            favDict: d
        },
        g = {
            0: {
                ck: 0,
                sy: 0,
                txt: "(推荐路线)"
            },
            1: {
                ck: 1,
                sy: 1,
                txt: "(最短路程)"
            },
            2: {
                ck: 2,
                sy: 2,
                txt: "(不走高速)"
            },
            3: {
                ck: 3,
                sy: 3,
                txt: "(躲避拥堵)"
            },
            t: "自驾："
        },
        _ = {
            0: g,
            5: g,
            1: l,
            6: l,
            7: l,
            2: {
                t: "步行："
            },
            3: {
                t: "骑行："
            },
            9: {
                0: {
                    ck: 3,
                    txt: "(推荐路线)"
                },
                1: {
                    ck: 7,
                    txt: "(出发较早)"
                },
                2: {
                    ck: 8,
                    txt: "(到达较早)"
                },
                3: {
                    sy: 0
                },
                7: {
                    sy: 1
                },
                8: {
                    sy: 2
                },
                t: "公交："
            }
        };
    m.pk_dict = _, i.exports = {
        modelConfig: m,
        mapVersion: s,
        mapConfig: o,
        urlConfig: p
    }
});;
define("common:widget/ui/BizFare/BizFare.js", function(e, n, t) {
    var a = {
        sendFareInfo: function(e) {
            var n = encodeURIComponent(JSON.stringify(e)),
                t = "http://cts.baidu.com/cts/map/web?data=" + n,
                a = new Image;
            a.src = t
        }
    };
    t.exports = a
});;
define("common:widget/ui/constant/Constant.js", function(_, E, R) {
    var A = {
        GEO_TYPE_AREA: 0,
        GEO_TYPE_LINE: 1,
        GEO_TYPE_POINT: 2,
        CITY_TYPE_NATION: 0,
        CITY_TYPE_PROV: 1,
        CITY_TYPE_CITY: 2,
        CITY_TYPE_DIST: 3,
        AREA_TYPE_NORM: 0,
        AREA_TYPE_PROV: 1,
        AREA_TYPE_DIST: 2,
        AREA_TYPE_POI: 3,
        DEST_START: 0,
        DEST_END: 1,
        DEST_MIDDLE: 2,
        DEST_SEC: 3,
        POI_TYPE_NORMAL: 0,
        POI_TYPE_BUSSTOP: 1,
        POI_TYPE_BUSLINE: 2,
        POI_TYPE_SUBSTOP: 3,
        POI_TYPE_SUBLINE: 4,
        ROUTE_TYPE_DEFAULT: 0,
        ROUTE_TYPE_BUS: 1,
        ROUTE_TYPE_WALK: 2,
        ROUTE_TYPE_DRIVE: 3,
        ROUTE_TYPE_TEMP_BUS: 4,
        ROUTE_TYPE_TEMP_WALK: 5,
        ROUTE_TYPE_RAIL_DASHED: 6,
        ROUTE_TYPE_BADWAY: 7,
        ROUTE_TYPE_SMOOTH: 8,
        ROUTE_TYPE_SLOW: 9,
        ROUTE_TYPE_HEAVY: 10,
        ROUTE_TYPE_DRIVE_GREY: 11,
        ROUTE_TYPE_DRIVE_RED: 12,
        ROUTE_TYPE_DRIVE_BACK: 13,
        ROUTE_TYPE_DRIVE_GREY_BACK: 14,
        SYNC_ACTION_ADD: 0,
        SYNC_ACTION_UPDATE: 1,
        SYNC_ACTION_DELETE: 2,
        SYNC_DATA_TYPE_POI: 0,
        SYNC_DATA_TYPE_ROUTE: 1,
        OVERLAY_STYLE: {
            MKR_A: 1,
            MKR_B: 2,
            MKR_C: 3,
            MKR_D: 4,
            MKR_E: 5,
            MKR_F: 6,
            MKR_H: 7,
            MKR_I: 8,
            MKR_J: 9,
            MKR_K: 10,
            MKR: 11,
            MKR_RCTR: 12,
            DIS_DOT: 13,
            BUS_STOP: 14,
            BUS_TRANS: 15,
            SUB_TRANS: 16,
            DS_MKR: 17,
            DE_MKR: 18,
            DRV_M_MKR: 19,
            DRV_E_MKR: 20,
            MKR_NULL: 21,
            GEN_MKR: 22,
            VIW_LBL: 30,
            DIS_LBL: 31,
            DIS_T_LBL: 32,
            DS_LBL: 33,
            DE_LBL: 34,
            DIR_MKR: 40,
            ROUTE: 60,
            BUS_ROUTE: 61,
            WALK_ROUTE: 62,
            DRV_ROUTE: 63,
            DIS_LINE: 64,
            AREA: 65,
            H_LINE: 66,
            HO_LINE: 67,
            HW_LINE: 68,
            ADDR_MKR_NUM: [70, 71, 72, 73, 74, 75, 76, 77, 78, 79],
            ADDR_MKR_ACC: 110,
            ADDR_MKR_EST: 111,
            RAIL_DASHED_ROUTE: 120
        },
        A_J_MARKER_IMG: "//webmap1.bdimg.com/wolfman/static/common/images/markers_new_862d77e.png",
        A_J_MARKER_IMG_SIZE: new BMap.Size(300, 300),
        A_J_MARKER_IMG_NEW: "//webmap0.bdimg.com/wolfman/static/common/images/markers_new2_7621a9c.png",
        A_J_MARKER_IMG_NEW_HEIGHT: 300,
        A_J_MARKER_IMG_NEW_WIDTH: 300,
        A_J_MARKER_IMG_NEW_SIZE: new BMap.Size(300, 300),
        A_J_MARKER_IMG_NEW2X: "//webmap1.bdimg.com/wolfman/static/common/images/markers_new2x_2960fb4.png",
        A_J_MARKER_IMG_NEW2X_SRCSET: {
            "2x": "//webmap1.bdimg.com/wolfman/static/common/images/markers_new2x_2960fb4.png"
        },
        A_J_MARKER_IMG_NEW2X_HEIGHT: 600,
        A_J_MARKER_IMG_NEW2X_WIDTH: 600,
        A_J_MARKER_RED_SIZE: new BMap.Size(21, 33),
        A_J_MARKER_RED_OFFSET: new BMap.Size(10, 33),
        A_J_MARKER_BLUE_SIZE: new BMap.Size(21, 33),
        A_J_MARKER_BLUE_OFFSET: new BMap.Size(10, 33),
        A_J_MARKER_CENTERBLUE_SIZE: new BMap.Size(25, 40),
        A_J_MARKER_CENTERBLUE_OFFSET: new BMap.Size(12, 40),
        A_J_MARKER_OFFSET: new BMap.Size(10, 33),
        A_J_MARKER_INFOWND_OFFSET: new BMap.Size(13, 1),
        A_J_MARKER_CLICK_SIZE: new BMap.Size(25, 40),
        A_J_MARKER_CLICK_OFFSET: new BMap.Size(12, 40),
        A_J_MARKER_BLUE_ICON_Y: 66,
        A_J_MARKER_ORANGE_ICON_Y: 33,
        A_J_MARKER_CLICK_ICON_Y: 99,
        A_J_MARKER_BLUE_ICON_WID: 21,
        A_J_MARKER_RED_ICON_WID: 21,
        A_J_MARKER_CLICK_ICON_WID: 25,
        A_J_ADDR_OFFSET: new BMap.Size(8, 20),
        DEST_MARKER_SIZE: new BMap.Size(25, 40),
        DEST_MARKER_OFFSET: new BMap.Size(12, 40),
        DEST_MARKER_INFOWND_OFFSET: new BMap.Size(14, 0),
        MARKER_11_11_SIZE: new BMap.Size(11, 11),
        MARKER_11_11_OFFSET: new BMap.Size(5, 5),
        MARKER_11_11_INFOWND_OFFSET: new BMap.Size(5, 0),
        MARKER_10_10_SIZE: new BMap.Size(10, 10),
        CHILD_MARKER_IMG: "//webmap0.bdimg.com/wolfman/static/common/images/markers_child_a1e6a9d.png",
        CHILD_MARKER_IMG2X_SRCSET: {
            "2x": "//webmap0.bdimg.com/wolfman/static/common/images/markers_child2x_ea374a0.png"
        },
        CHILD_MARKER_IMG2X_SIZE: new BMap.Size(210, 66),
        CHILD_MARKER_WID: 21,
        CHILD_MARKER_OFFSET: new BMap.Size(10, 32),
        CHILD_MARKER_ORANGE_Y: 0,
        CHILD_MARKER_GREEN_Y: 32,
        CHILD_MARKER_ORANGE_SIZE: new BMap.Size(21, 32),
        CHILD_MARKER_GREEN_SIZE: new BMap.Size(21, 32),
        CHILD_MARKER_INFOWND_OFFSET: new BMap.Size(13, 1),
        PCHILD_MARKER_IMG: "//webmap0.bdimg.com/wolfman/static/common/images/marker_pchild_c0b540b.png",
        PCHILD_MARKER_IMG_SIZE: new BMap.Size(180, 168),
        PCHILD_MARKER_IMG2X_SRCSET: {
            "2x": "//webmap0.bdimg.com/wolfman/static/common/images/markers_child2x_ea374a0.png"
        },
        PCHILD_MARKER_IMG2X_SIZE: new BMap.Size(210, 66),
        PCHILD_MARKER_OFFSET: new BMap.Size(0, 0),
        PCHILD_MARKER_HOVER: 90,
        PCHILD_MARKER_HEIGHT: 28,
        PCHILD_MARKER_WIDTH_1: 28,
        PCHILD_MARKER_WIDTH_2: 40,
        PCHILD_MARKER_WIDTH_3: 52,
        PCHILD_MARKER_WIDTH_4: 65,
        PCHILD_MARKER_WIDTH_5: 77,
        PCHILD_MARKER_WIDTH_6: 89,
        TRANS_TYPE_BUS: 0,
        TRANS_TYPE_SUB: 1,
        TRANS_TYPE_RAIL: 2,
        TRANS_TYPE_AIR: 3,
        TRANS_TYPE_DRIVING: 4,
        TRANS_TYPE_WALKING: 5,
        A_IP_MARKER_IMG: "//webmap0.bdimg.com/wolfman/static/common/images/ipLocation/ipLocation_72a86af.png",
        A_IP_CORRECR_LOC_MARKER_IMG: "//webmap0.bdimg.com/wolfman/static/common/images/ipLocation/correctLoc_d887da9.png",
        A_IP_MARKER_IMG_SRCSET: {
            "2x": "//webmap1.bdimg.com/wolfman/static/common/images/ipLocation/ipLocation2x_bc15447.png"
        },
        A_IP_MARKER_IMG_SIZE: new BMap.Size(76, 14),
        A_IP_MARKER_BLUE_SIZE: new BMap.Size(12, 12),
        A_IP_MARKER_BLUE_OFFSET: new BMap.Size(6, 6),
        A_IP_LABEL_OFFSET_HEIGHT: -47,
        A_IP_MAP_ZOOM: 17
    };
    R.exports = A
});;
define("common:widget/ui/searchHistory/hisMgr.js", function(t, e, a) {
    var n = t("common:widget/ui/Storage/Storage.js"),
        s = t("common:widget/ui/config/config.js"),
        o = s.modelConfig,
        i = -1,
        r = 1,
        c = 0,
        l = 15,
        h = 8,
        d = 6,
        u = "/" + o.DATA_URL + "usync",
        g = "_search_save_new",
        v = "_line_save_new",
        f = {};
    f[g] = "poihistory", f[v] = "routehistory";
    var y = {};
    y[g] = 0, y[v] = 0;
    var D = 1e4,
        m = {
            state: i,
            init: function() {
                this.state = r, this.processOldData()
            },
            offline: function() {
                this.state = c, this.processOldData()
            },
            processOldData: function() {
                var t = n.get({
                    key: "_search_save"
                });
                if (t) {
                    var e = [];
                    t = t.split(encodeURIComponent(","));
                    for (var a = 0; a < t.length; a++) {
                        var s = t[a];
                        s = s.split("_");
                        var o = {
                            qt: "s",
                            wd: s[0]
                        };
                        s[1] && (o.wd2 = s[1]), o.ctime = Math.round((new Date).getTime() / 1e3) - 7776e3 + "", e.push(o)
                    }
                    n.remove({
                        key: "_search_save"
                    }), this.setSearchData(e)
                } else {
                    var i = this.getUnsyncLocalData(g);
                    this.clearUnsyncLocalData(g), i.length ? this.setSearchData(i) : this.getSearchData(!0)
                }
                var r = n.get({
                    key: "_line_save"
                });
                if (r) {
                    var c = [];
                    r = r.split(encodeURIComponent(","));
                    for (var a = 0; a < r.length; a++) {
                        var s = r[a];
                        s = s.split(" - ");
                        var o = {
                            qt: "bt"
                        };
                        o.ctime = Math.round((new Date).getTime() / 1e3) - 7776e3 + "";
                        for (var l = 0; l < s.length; l++) {
                            var h = s[l];
                            h = h.split("$$");
                            var d = {
                                type: 1,
                                keyword: h[0]
                            };
                            h[1] && (d.xy = h[1]), 0 === l ? o.sn = d : l === s.length - 1 ? o.en = d : (o.qt = "nav", o.wp || (o.wp = []), o.wp.push(d))
                        }
                        c.push(o)
                    }
                    n.remove({
                        key: "_line_save"
                    }), this.setRouteData(c)
                } else {
                    var i = this.getUnsyncLocalData(v);
                    this.clearUnsyncLocalData(v), i.length ? this.setRouteData(i) : this.getRouteData(!0)
                }
            },
            setData: function(t, e) {
                if (this.state === r) {
                    for (var a = this.getLocalData(t), s = 0; s < e.length; s++) e[s].ctime || (e[s].ctime = e[s].ctime || Math.round((new Date).getTime() / 1e3) + "", e[s].platform = e[s].platform || "3");
                    for (var o = [], i = 0; i < e.length; i++) {
                        var c = {
                            action: "add",
                            detail: e[i]
                        };
                        c.ctime = e[i].ctime + "", o.push(c)
                    }
                    var h = {
                            datas: T.json.stringify(o)
                        },
                        d = T.cookie.get("validate");
                    h = T.extend(h, {
                        validate: d
                    }), T.ajax(u + "&mode=hsync&subkey=" + f[t] + "&t=" + (new Date).getTime(), {
                        dataType: "json",
                        method: "post",
                        data: h,
                        success: function(e) {
                            if (addStat("multi.history.sync", "click", {}), e && e.tsync) {
                                var a = e.tsync.download;
                                a || (a = []);
                                for (var s = [], o = 0; o < a.length; o++) {
                                    var i = T.json.parse(a[o].detail);
                                    s.push(i)
                                }
                                n.set({
                                    key: t,
                                    value: T.json.stringify(s)
                                }), y[t] = (new Date).getTime()
                            }
                        }
                    })
                } else {
                    for (var a = this.getUnsyncLocalData(t), s = 0; s < e.length; s++) e[s].ctime || (e[s].ctime = e[s].ctime || Math.round((new Date).getTime() / 1e3) + "", e[s].platform = e[s].platform || "3");
                    if (1 === e.length)
                        for (var g = 0; g < a.length; g++)
                            if (this.compareData(e[0], a[g], t)) {
                                a.splice(g, 1);
                                break
                            }
                    a = e.concat(a), a = a.slice(0, l), n.set({
                        key: t + "_unsync",
                        value: T.json.stringify(a)
                    })
                }
            },
            compareData: function(t, e, a) {
                return a === g ? t.wd === e.wd && t.wd2 === e.wd2 ? !0 : !1 : t.sn.keyword === e.sn.keyword && t.en.keyword === e.en.keyword ? !0 : !1
            },
            getWpNames: function(t) {
                for (var e = "", a = 0; a < t.length; a++) e += t[a].keyword;
                return e
            },
            getData: function(t, e) {
                var a = this,
                    s = T.Deferred();
                if (this.state === r && (new Date).getTime() - y[t] > D) addStat("multi.history.download", "click", {
                    da_trd: "online"
                }), T.ajax(u + "&mode=hdownload&subkey=" + f[t] + "&t=" + (new Date).getTime(), {
                    dataType: "json",
                    method: "get",
                    success: function(e) {
                        if (e && e.tsync) {
                            var o = e.tsync.download;
                            o || (o = []);
                            for (var i = [], r = 0; r < o.length; r++) {
                                var c = T.json.parse(o[r].detail);
                                i.push(c)
                            }
                            s.resolve(i.slice(0, h)), n.set({
                                key: t,
                                value: T.json.stringify(i)
                            }), y[t] = (new Date).getTime()
                        } else {
                            var l = a.getLocalData(t);
                            s.resolve(l)
                        }
                    }
                });
                else {
                    if (this.state !== i || e || this.processOldData(), this.state !== r) {
                        var o = this.getUnsyncLocalData(t);
                        o = o.slice(0, d), addStat("multi.history.download", "click", {
                            da_trd: "unlogin"
                        })
                    } else {
                        var o = this.getLocalData(t);
                        o = o.slice(0, h), addStat("multi.history.download", "click", {
                            da_trd: "local"
                        })
                    }
                    s.resolve(o)
                }
                return s
            },
            clearData: function(t) {
                if (this.state === r) {
                    var e = T.cookie.get("validate"),
                        a = {
                            validate: e
                        };
                    T.ajax(u + "&mode=hclear&subkey=" + f[t] + "&t=" + (new Date).getTime(), {
                        dataType: "json",
                        method: "post",
                        data: a,
                        success: function() {}
                    })
                }
                this.clearLocalData(t)
            },
            getSearchData: function(t) {
                return this.getData(g, t)
            },
            setSearchData: function(t) {
                return this.setData(g, t)
            },
            getRouteData: function(t) {
                return this.getData(v, t)
            },
            setRouteData: function(t) {
                return this.setData(v, t)
            },
            clearSearchData: function() {
                this.clearData(g)
            },
            clearRouteData: function() {
                this.clearData(v)
            },
            getLocalData: function(t) {
                var e = n.get({
                    key: t
                });
                return e ? T.json.parse(e) : []
            },
            getUnsyncLocalData: function(t) {
                var e = n.get({
                    key: t + "_unsync"
                });
                return e ? T.json.parse(e) : []
            },
            clearUnsyncLocalData: function(t) {
                n.remove({
                    key: t + "_unsync"
                })
            },
            clearLocalData: function(t) {
                n.remove({
                    key: t
                }), n.remove({
                    key: t + "_unsync"
                })
            },
            clearAllLocalData: function() {
                this.clearLocalData(g), this.clearLocalData(v)
            }
        };
    a.exports = m
});;
define("common:widget/ui/indexUtil/IndexUtil.js", function(t, e, i) {
    {
        var o = t("common:widget/ui/config/config.js"),
            n = t("common:widget/com/componentManager.js"),
            c = (t("common:widget/ui/areaCfg/areaCfg.js"), t("common:widget/ui/sateCityList/SateCityList.js"), t("common:widget/ui/stat/CodeStat.js"), t("common:widget/ui/ui3Tools/ui3Tools.js")),
            s = o.modelConfig;
        o.mapConfig
    }
    i.exports = {
        cnameSearch: function(t, e, i) {
            var o = {
                MapRevertOpts: {
                    noAddBounds: !0
                }
            };
            i = i || 0, e = e || s.cityCode, n.go("con&contp=0&wd=" + encodeURIComponent(t) + "&pn=0&c=" + e + "&src=" + i, o)
        },
        selectCity: function(e, i) {
            if (window.temp.cityPop) return void window.temp.cityPop.close();
            var o = {
                title: "城市列表",
                content: "",
                height: 402,
                width: 395,
                open: function() {
                    this.styleSwitch && e.addClass("ui3-city-change-click")
                },
                close: function() {
                    this.styleSwitch && e.removeClass("ui3-city-change-click"), window.temp.cityPop = null
                }
            };
            for (var n in i) o[n] = i[n];
            t.async(["common:widget/ui/Popup/Popup.js", "common:widget/ui/Storage/Storage.js", "common:widget/com/SelectCity/SelectCity.js"], function(t, n, c) {
                var s = window.temp.cityPop = new t(o);
                s.addConnectDom(e[0]), s.render(), s.hide(), o && "undefined" != typeof o.right ? s.getDom().style.right = o.right + "px" : s.getDom().style.left = o && "undefined" != typeof o.left ? o.left + "px" : "396px", s.getDom().style.top = o && "undefined" != typeof o.top ? o.top + "px" : o && "undefined" != typeof o.bottom ? o.bottom + "px" : "136px", i.baiduStorage = n, i.exitLargeMapMode = !1;
                var a = new c({
                    dom: s.content,
                    cinfo: i,
                    pop: s
                });
                a.show()
            }), window.place && place.resetArea && place.resetArea(), addStat("indexcityex.cityexchange.cityexchangeentrance")
        },
        setCurCity: function(t, e) {
            e = e || {}, t = t || {}; {
                var i = t.name || "",
                    o = t.code || "";
                t.type || ""
            }
            window.isPrint || o && (s.cityCode != o && (this.isSupportStreetView(o) && addStat(STAT_CODE.STAT_PANORAMA, {
                catalog: "pano-city-visit",
                from: o
            }), addStat(STAT_CODE.STAT_PANORAMA, {
                catalog: "city-visit",
                from: o
            })), this.setDataCopyRight(o), i && o && (this.setModelConfig(t, e), listener.trigger("com.city", "change", t), window.currentCity = t, c.streetViewTool._isInited || (c.streetViewTool._isInited = !0, c.streetViewTool.init())))
        },
        setModelConfig: function(t) {
            s.cityCode = t.code, s.cityName = t.name, s.cityType = t.type || "", s.sup = t.sup, s.sup_bus = t.sup_bus, s.sup_subway = t.sup_subway
        },
        setDataCopyRight: function(e) {
            t.async("common:widget/ui/dataCopyRight/dataCopyRight.js", function(t) {
                t.setCopyRight(e)
            })
        },
        setSupBus: function(t) {
            s.supBus = t, window.isPrint
        },
        isSupportStreetView: function(t) {
            var e = window.G_POC || [];
            t = t || s.cityCode;
            for (var i = 0; i < e.length; i++)
                if (t == e[i]) return !0;
            return !1
        },
        isSupportStreetView2: function() {
            var t = window.G_POC || [],
                e = s.cityCode;
            if (e >= 9e3 && 9378 >= e) return !1;
            for (var i = 0; i < t.length; i++)
                if (e == t[i] || -9999 == t[i]) return !0;
            return !1
        },
        getBusExpTime: function() {
            var t = new Date,
                e = T.date.format(t, "yyyy-MM-dd"),
                i = t.getHours(),
                o = t.getMinutes(),
                n = o >= 10 ? o : "0" + o,
                c = i + ":" + n,
                s = "";
            return s = e + " " + c
        },
        initControls: function() {
            var e = t("common:widget/ui/ui3Tools/ui3Tools.js");
            e.init()
        }
    }
});;
define("common:widget/ui/mapUtil/mapUtil.js", function(e, t, o) {
    function a(e) {
        for (var t = n(e.charAt(0)), o = e.substr(1), a = 0, s = o.length, d = [], p = [], _ = []; s > a;)
            if (o.charAt(a) == f[0]) {
                if (13 > s - a) return 0;
                if (_ = i(o.substr(a, 13), d), 0 > _) return 0;
                a += 13
            } else if (";" == o.charAt(a)) p.push(d.slice(0)), d.length = 0, ++a;
        else {
            if (8 > s - a) return 0;
            if (_ = r(o.substr(a, 8), d), 0 > _) return 0;
            a += 8
        }
        for (var l = 0, c = p.length; c > l; l++)
            for (var E = 0, u = p[l].length; u > E; E++) p[l][E] /= 100;
        return {
            geoType: t,
            geo: p
        }
    }

    function n(e) {
        var t = -1;
        return e == f[1] ? t = p.GEO_TYPE_POINT : e == f[2] ? t = p.GEO_TYPE_LINE : e == f[3] && (t = p.GEO_TYPE_AREA), t
    }

    function i(e, t) {
        for (var o = 0, a = 0, n = 0, i = 0; 6 > i; i++) {
            if (n = s(e.substr(1 + i, 1)), 0 > n) return -1 - i;
            if (o += n << 6 * i, n = s(e.substr(7 + i, 1)), 0 > n) return -7 - i;
            a += n << 6 * i
        }
        return t.push(o), t.push(a), 0
    }

    function r(e, t) {
        var o = t.length;
        if (2 > o) return -1;
        for (var a = 0, n = 0, i = 0, r = 0; 4 > r; r++) {
            if (i = s(e.substr(r, 1)), 0 > i) return -1 - r;
            if (a += i << 6 * r, i = s(e.substr(4 + r, 1)), 0 > i) return -5 - r;
            n += i << 6 * r
        }
        return a > c && (a = c - a), n > c && (n = c - n), t.push(t[o - 2] + a), t.push(t[o - 1] + n), 0
    }

    function s(e) {
        var t = e.charCodeAt(0);
        return e >= "A" && "Z" >= e ? t - "A".charCodeAt(0) : e >= "a" && "z" >= e ? 26 + t - "a".charCodeAt(0) : e >= "0" && "9" >= e ? 52 + t - "0".charCodeAt(0) : "+" == e ? 62 : "/" == e ? 63 : -1
    }
    var d = e("common:widget/ui/util/util.js"),
        p = e("common:widget/ui/constant/Constant.js"),
        _ = e("common:widget/ui/config/config.js"),
        l = _.mapConfig;
    BMap.Overlay.getZIndex = function(e, t, o) {
        return (e = 1 * e) ? (t && t == BMAP_COORD_MERCATOR && (e = BMap.Project.convertMC2LL(new BMap.Point(0, e)).lat), (-1e5 * e << 5) + (o || 0)) : 0
    };
    var f = ["=", ".", "-", "*"],
        c = 1 << 23,
        E = {
            decode_geo_diff: a
        },
        u = [],
        g = !1;
    o.exports = {
        addArrow: function(e, t) {
            for (var o = 0; o < e.length; o++) {
                var a = e[o].split(",");
                e[o] = new BMap.Point(a[0], a[1])
            }
            for (var n = -1e3, i = [], r = t.getBounds(), o = 1; o < e.length - 1; o++)
                if (!(e[o].lng < r.minX || e[o].lng > r.maxX || e[o].lat < r.minY || e[o].lat > r.maxY)) {
                    var s = t.pointToPixel(e[o]),
                        d = t.pointToPixel(e[o + 1]),
                        p = (s.x - d.x) * (s.x - d.x) + (s.y - d.y) * (s.y - d.y);
                    if (!(400 > p)) {
                        var _ = Math.atan2(e[o].lat - e[o + 1].lat, e[o + 1].lng - e[o].lng),
                            l = Math.floor(8 * _ / Math.PI + 16.5) % 16 * 16;
                        if (l != n) {
                            var f = new BMap.Icon("//webmap0.bdimg.com/wolfman/static/common/images/dest_markers_bae177c.png", new BMap.Size(16, 16), {
                                    imageSize: new BMap.Size(300, 138),
                                    imageOffset: new BMap.Size(l, 120),
                                    infoWindowOffset: new BMap.Size(9, 0)
                                }),
                                c = new BMap.Marker(e[o], {
                                    icon: f
                                });
                            t.addOverlay(c), i.push(c), n = l
                        }
                    }
                }
            return i
        },
        addSearchPoi: function(e, t, o, a) {
            var n = d.getPoiPoint(e),
                i = o.split("-")[1] || o;
            if (i = i.substring(0, 6), a = a || {}, a.type = a.type || "normal", a.garnd = a.grand || !1, a.isgrandtype = a.isgrandtype, !(!n || "undefined" == typeof t || 0 > t || t > 11 && "child" !== a.type || t > 39 && "child" === a.type)) {
                var r, s, _ = p.A_J_MARKER_IMG_NEW;
                if ("child" == a.type) {
                    _ = p.CHILD_MARKER_IMG;
                    var l = new BMap.Icon(_, p.CHILD_MARKER_ORANGE_SIZE, {
                        imageOffset: new BMap.Size(p.CHILD_MARKER_WID * t, p.CHILD_MARKER_ORANGE_Y),
                        anchor: p.CHILD_MARKER_OFFSET,
                        infoWindowOffset: p.CHILD_MARKER_INFOWND_OFFSET,
                        imageSize: p.CHILD_MARKER_IMG2X_SIZE,
                        srcSet: p.CHILD_MARKER_IMG2X_SRCSET
                    });
                    r = t + 1
                } else if ("pchild" == a.type) {
                    var f = i.replace(/[\u0100-\uffff]/g, "##").length / 2,
                        s = Math.ceil(f);
                    _ = p.PCHILD_MARKER_IMG;
                    var l = new BMap.Icon(_, new BMap.Size(p["PCHILD_MARKER_WIDTH_" + s], 28), {
                        imageSize: p.PCHILD_MARKER_IMG_SIZE,
                        imageOffset: new BMap.Size(0, p.PCHILD_MARKER_HEIGHT * (6 - s)),
                        anchor: new BMap.Size(p["PCHILD_MARKER_WIDTH_" + s] / 2, p.PCHILD_MARKER_HEIGHT),
                        infoWindowOffset: new BMap.Size(p["PCHILD_MARKER_WIDTH_" + s] / 2, 1)
                    });
                    r = t + 1
                } else {
                    var c = 0;
                    ("RouteAddrMarker" == a.type || "groupon" == a.type) && (c = p.A_J_MARKER_ORANGE_ICON_Y);
                    var E = new BMap.Size(p.A_J_MARKER_RED_ICON_WID * t, c);
                    if (_ === p.A_J_MARKER_IMG_NEW) var l = new BMap.Icon(_, p.A_J_MARKER_RED_SIZE, {
                        offset: p.A_J_MARKER_RED_OFFSET,
                        imageOffset: E,
                        infoWindowOffset: p.A_J_MARKER_INFOWND_OFFSET,
                        imageSize: p.A_J_MARKER_IMG_NEW_SIZE,
                        srcSet: p.A_J_MARKER_IMG_NEW2X_SRCSET
                    });
                    else var l = new BMap.Icon(_, p.A_J_MARKER_RED_SIZE, {
                        imageSize: p.A_J_MARKER_IMG_SIZE,
                        anchor: p.A_J_MARKER_RED_OFFSET,
                        imageOffset: E,
                        infoWindowOffset: p.A_J_MARKER_INFOWND_OFFSET
                    });
                    r = t + 1
                }
                var u = 100;
                "child" === a.type && (u = 1e3);
                var g = new BMap.Marker(n, {
                    icon: l,
                    zIndexFixed: !0,
                    baseZIndex: 25e5 - u * (t + 1),
                    startAnimation: "marker-raise marker-" + t
                });
                if (g.customProperty = {
                        type: a.type
                    }, a.uid && "undefined" != typeof a.ext_type && 1 & a.ext_type) {
                    var R = "<span class='inr-tip' id='inr_tip_" + t + "' data-uid=\"" + a.uid + '" data-wd="' + o + '" >室内地图</span>',
                        m = this.createNormalTip(R, {
                            point: n,
                            offset: new BMap.Size(11, 20)
                        });
                    m.setStyle({
                        background: "url(//webmap0.bdimg.com/wolfman/static/common/images/inr_bg_3fefafb.gif) 0 -29px no-repeat",
                        height: "20px",
                        border: "0"
                    }), m.setTitle("查看室内地图"), m._indoor = !0, g.setLabel(m)
                }
                map.addOverlay(g), "pchild" == a.type ? (g.isgrand = 1, g.textlen = s) : (g.isgrand = 0, g.textlen = 2), g._stCode = r, o && g.setTitle(o), g.isgchild = a.garnd, g.isgrandtype = a.isgrandtype || 0;
                var M = this;
                return baidu("#tipBtn_" + t).on("mouseover", function() {
                    var e = baidu(this).data("index");
                    M.showInrTip(e)
                }), g
            }
        },
        addSearchInViewTitle: function(e, t, o) {
            var a = this.createSearchInViewTitle(e, t);
            return a._stCode = p.OVERLAY_STYLE.VIW_LBL, o && "Marker" == o.toString() ? (o.setLabel(a), a) : (map.addOverlay(a), a)
        },
        addDetailPoi: function(e, t) {
            var o = d.getPoiPoint(e);
            if (o) {
                var a = new BMap.Icon(p.A_J_MARKER_IMG, p.A_J_MARKER_RED_SIZE, {
                        anchor: p.A_J_MARKER_OFFSET,
                        imageSize: p.A_J_MARKER_IMG_SIZE,
                        imageOffset: new BMap.Size(0, 116),
                        infoWindowOffset: p.A_J_MARKER_INFOWND_OFFSET
                    }),
                    n = new BMap.Marker(o, {
                        icon: a
                    });
                return map.addOverlay(n), n._stCode = p.OVERLAY_STYLE.MKR, t && n.setTitle(t), n
            }
        },
        addRoute: function(e, t, o, a, n) {
            var i, r, s, d, _, l;
            1 !== t || "yes" !== map.showTerminal && "yes2" !== map.showTerminal || (i = e.split(";"), l = i.length - 1, r = new BMap.Point(parseFloat(i[0].split(",")[0]), parseFloat(i[0].split(",")[1])), s = new BMap.Point(parseFloat(i[l].split(",")[0]), parseFloat(i[l].split(",")[1])), _ = this.addDestPoi(r, 0), d = this.addDestPoi(s, 1), map.showTerminal = "no");
            var f = [{
                stroke: 6,
                color: "#5298ff",
                opacity: 1,
                stCode: p.OVERLAY_STYLE.ROUTE
            }, {
                stroke: 6,
                color: "#5298ff",
                opacity: 1,
                stCode: p.OVERLAY_STYLE.BUS_ROUTE
            }, {
                stroke: 6,
                color: "#4ddc26",
                opacity: 1,
                stCode: p.OVERLAY_STYLE.WALK_ROUTE
            }, {
                stroke: 6,
                color: "#5298ff",
                opacity: 1,
                stCode: p.OVERLAY_STYLE.DRV_ROUTE
            }, {
                stroke: 6,
                color: "#5298ff",
                opacity: 1,
                stCode: p.OVERLAY_STYLE.BUS_ROUTE
            }, {
                stroke: 6,
                color: "#4ddc26",
                opacity: 1,
                stCode: p.OVERLAY_STYLE.WALK_ROUTE
            }, {
                stroke: 6,
                color: "#688DE1",
                opacity: 1,
                strokeStyle: "dashed",
                stCode: p.OVERLAY_STYLE.RAIL_DASHED_ROUTE
            }, {
                stroke: 6,
                color: "#4ddc26",
                opacity: 1,
                stCode: p.OVERLAY_STYLE.WALK_ROUTE
            }, {
                stroke: 6,
                color: "#00bd00",
                opacity: 1,
                stCode: p.OVERLAY_STYLE.DRV_ROUTE,
                strokeLineCap: "square"
            }, {
                stroke: 6,
                color: "#ffac00",
                opacity: 1,
                stCode: p.OVERLAY_STYLE.DRV_ROUTE,
                strokeLineCap: "square"
            }, {
                stroke: 6,
                color: "#f41c0d",
                opacity: 1,
                stCode: p.OVERLAY_STYLE.DRV_ROUTE,
                strokeLineCap: "square"
            }, {
                stroke: 6,
                color: "#b8b8b8",
                opacity: 1,
                stCode: p.OVERLAY_STYLE.DRV_ROUTE
            }, {
                stroke: 6,
                color: "#ff4c88",
                opacity: 1,
                stCode: p.OVERLAY_STYLE.DRV_ROUTE
            }, {
                stroke: 9,
                color: "#3e5d33",
                opacity: 1,
                stCode: p.OVERLAY_STYLE.DRV_ROUTE
            }, {
                stroke: 7,
                color: "#979797",
                opacity: 1,
                stCode: p.OVERLAY_STYLE.DRV_ROUTE
            }];
            if ("undefined" == typeof t && (t = 0), f[t]) {
                var c = f[t];
                c || (c = f[0]);
                var E = c.color;
                "webgl" === map.getRenderType() && (E = n || E);
                var u = {
                    strokeWeight: c.stroke,
                    strokeColor: E,
                    strokeOpacity: c.opacity,
                    strokeStyle: c.strokeStyle,
                    strokeLineCap: c.strokeLineCap || "round"
                };
                if ("string" == typeof e || "Point" == e[0].toString()) var g = new BMap.Polyline(e, u);
                else if ("[object Array]" == Object.prototype.toString.call(e)) var g = new BMap.PolylineMultipart(e, u);
                var R = a || map;
                if (t !== p.ROUTE_TYPE_SMOOTH && t !== p.ROUTE_TYPE_HEAVY && t !== p.ROUTE_TYPE_SLOW && t !== p.ROUTE_TYPE_DRIVE_RED) {
                    var m = u;
                    m.strokeWeight += 2, m.strokeColor = "#707070", m.strokeOpacity = .8;
                    var M = new BMap.Polyline(e, m);
                    g._p = M, R.addOverlay(M)
                }
                return R.addOverlay(g), g._stCode = f[t].stCode, g._routeType = t, g._sMarker = _, g._eMarker = d, g
            }
        },
        createSearchInViewTitle: function(e, t) {
            var o = d.getPoiPoint(e);
            if (o) {
                var a = new BMap.Size(14, -21),
                    n = t;
                t.replace(/[\u0100-\uffff]/g, "##").length > 20 && (t = t.substring(0, 10) + "...");
                var i = new BMap.Label(t, {
                    point: o,
                    offset: a
                });
                return i.setTitle(n), i.setStyle({
                    lineHeight: "15px",
                    padding: "1px 3px",
                    borderColor: "#a7a7a7",
                    color: "#666",
                    cursor: "pointer"
                }), i
            }
        },
        createNormalTip: function(e, t) {
            var o = {
                display: !0,
                style: {
                    background: "url(//webmap0.bdimg.com/wolfman/static/common/images/tip_5ffa1fb.gif) 0 0 no-repeat",
                    color: "#000",
                    height: "30px",
                    border: "0",
                    padding: "0 0 0 4px"
                }
            };
            t && "object" == typeof t && (t = T.extend(o, t));
            var a = new BMap.Label(e, {
                point: t.point,
                offset: t.offset
            });
            return a
        },
        cutPoints: function(e, t) {
            if (t ? .25 > t ? t = 0 : t > .25 && 1 > t ? t = 1 : t > 32 && (t = 32) : t = 0, e && "string" == typeof e) {
                var o = e;
                if (t > 0) {
                    var a = new RegExp("(((-?\\d+)(\\.\\d+)?),((-?\\d+)(\\.\\d+)?);)(((-?\\d+)(\\.\\d+)?),((-?\\d+)(\\.\\d+)?);){" + t + "}", "ig");
                    o = e.replace(a, "$1")
                }
                return o
            }
        },
        selectRoute: function(e) {
            if (e && "Polyline" == e.toString()) {
                var t = ["#ff0103", "#ff0103", "#ff0103", "#ff0103", "", "", "#ff0103"];
                t[e._routeType] && (e.setStrokeColor(t[e._routeType]), e._stCode = e._stCode == p.OVERLAY_STYLE.BUS_ROUTE ? p.OVERLAY_STYLE.HO_LINE : e._stCode == p.OVERLAY_STYLE.WALK_ROUTE ? p.OVERLAY_STYLE.HW_LINE : p.OVERLAY_STYLE.H_LINE)
            }
        },
        unSelectRoute: function(e) {
            if (e && "Polyline" == e.toString()) {
                var t = ["#3a6bdb", "#3a6bdb", "#30a208", "#3a6bdb", "", "", "#688DE1"],
                    o = [p.OVERLAY_STYLE.ROUTE, p.OVERLAY_STYLE.BUS_ROUTE, p.OVERLAY_STYLE.WALK_ROUTE, p.OVERLAY_STYLE.DRV_ROUTE, , , p.OVERLAY_STYLE.RAIL_DASHED_ROUTE];
                t[e._routeType] && (e.setStrokeColor(t[e._routeType]), e._stCode = o[e._routeType])
            }
        },
        removeRoute: function(e) {
            e._p && "Polyline" == e._p.toString() && e._p.remove(), e.remove(), e = null
        },
        addArea: function(e, t, o) {
            if (e) {
                var a = [{
                        strokeWeight: 0,
                        fillColor: "#0064fc",
                        fillOpacity: .1,
                        stCode: p.OVERLAY_STYLE.AREA
                    }, {
                        strokeWeight: 0,
                        fillColor: "#0064fc",
                        fillOpacity: .1,
                        stCode: p.OVERLAY_STYLE.AREA
                    }, {
                        strokeWeight: 0,
                        fillColor: "#0064fc",
                        fillOpacity: .1,
                        stCode: p.OVERLAY_STYLE.AREA
                    }, {
                        strokeWeight: 0,
                        fillColor: "#4673cc",
                        fillOpacity: 0,
                        stCode: p.OVERLAY_STYLE.AREA
                    }],
                    n = [{
                        strokeColor: "#0064fc",
                        strokeWeight: 2,
                        strokeStyle: "dashed",
                        strokeLineCap: "butt",
                        stCode: p.OVERLAY_STYLE.AREA
                    }, {
                        strokeColor: "#0064fc",
                        strokeWeight: 2,
                        strokeStyle: "dashed",
                        strokeLineCap: "butt",
                        stCode: p.OVERLAY_STYLE.AREA
                    }, {
                        strokeColor: "#0064fc",
                        strokeWeight: 2,
                        strokeStyle: "dashed",
                        strokeLineCap: "butt",
                        stCode: p.OVERLAY_STYLE.AREA
                    }, {
                        strokeColor: "#6791e5",
                        strokeWeight: 2,
                        strokeStyle: "dashed",
                        strokeLineCap: "butt",
                        stCode: p.OVERLAY_STYLE.AREA
                    }];
                if (t = t || 0, a[t]) {
                    var i, r = [],
                        s = a[t],
                        d = n[t];
                    if (d.dashArray = [4, 2], o && o.holes && (s.holes = o.holes), i = new BMap.Polygon(e, s), map.addOverlay(i), "string" == typeof e) {
                        var _ = new BMap.Polyline(e, d);
                        map.addOverlay(_), r.push(_)
                    } else
                        for (var l = 0; l < e.length; l++) {
                            var _ = new BMap.Polyline(e[l], d);
                            map.addOverlay(_), r.push(_)
                        }
                    return i._stCode = a[t].stCode, i
                }
            }
        },
        addAdministrationArea: function(e) {
            u.push(e), g === !1 && (map.on("clearoverlays", function() {
                u.length = 0
            }), g = !0, map.on("zoomend", function() {
                for (var e = map.getBounds(), t = new BMap.Bounds, o = 0; o < u.length; o++) {
                    var a = u[o].getBounds();
                    t.extend(new BMap.Point(a.minX, a.minY)), t.extend(new BMap.Point(a.maxX, a.maxY))
                }
                if (t.div(e) > 5)
                    for (var o = 0; o < u.length; o++) u[o].hide();
                else
                    for (var o = 0; o < u.length; o++) u[o].show()
            }))
        },
        clearAdministrationArea: function() {
            for (var e = 0; e < u.length; e++) map.removeOverlay(u[e]);
            u.length = 0
        },
        removeArea: function(e) {
            "Polygon" == e.toString() && (e.remove(), e = null)
        },
        addTransPoi: function(e, t, o, a) {
            var n = d.getPoiPoint(e);
            if (n) {
                var i = p.OVERLAY_STYLE.BUS_TRANS,
                    r = 55;
                switch (t) {
                    case p.TRANS_TYPE_BUS:
                        r = 55;
                        break;
                    case p.TRANS_TYPE_SUB:
                        i = p.OVERLAY_STYLE.SUB_TRANS, r = 76;
                        break;
                    case p.TRANS_TYPE_RAIL:
                        r = 118;
                        break;
                    case p.TRANS_TYPE_AIR:
                        r = 139;
                        break;
                    case p.TRANS_TYPE_DRIVING:
                        r = 97;
                        break;
                    case p.TRANS_TYPE_WALKING:
                        r = 160
                }
                var s = new BMap.Icon("//webmap0.bdimg.com/wolfman/static/common/images/new/transit-exchange-1x_3c96375.png", new BMap.Size(21, 21), {
                        imageOffset: new BMap.Size(0, r),
                        imageSize: new BMap.Size(22, 181),
                        infoWindowOffset: new BMap.Size(10, 0),
                        srcset: {
                            "2x": "//webmap0.bdimg.com/wolfman/static/common/images/new/transit-exchange-2x_46d5be3.png"
                        }
                    }),
                    _ = new BMap.Marker(n, {
                        icon: s
                    }),
                    l = a || map;
                return _._stCode = i, o && _.setTitle(o), l.addOverlay(_), _
            }
        },
        addBusStopPoi: function(e, t) {
            var o = d.getPoiPoint(e);
            if (o) {
                var a = new BMap.Icon("//webmap1.bdimg.com/wolfman/static/common/images/new/bus-stop-1x_ddd4723.png", p.MARKER_10_10_SIZE, {
                        offset: p.MARKER_11_11_OFFSET,
                        imageSize: new BMap.Size(10, 10),
                        infoWindowOffset: p.MARKER_11_11_INFOWND_OFFSET,
                        srcset: {
                            "2x": "//webmap1.bdimg.com/wolfman/static/common/images/new/bus-stop-2x_6a8fdd9.png"
                        }
                    }),
                    n = new BMap.Marker(o, {
                        icon: a,
                        baseZIndex: 15e5
                    });
                return map.addOverlay(n), n._stCode = p.OVERLAY_STYLE.BUS_STOP, t && n.setTitle(t), n
            }
        },
        addDestPoi: function(e, t, o) {
            o = o || {};
            var a = o.userMap || map,
                n = d.getPoiPoint(e);
            if (n) {
                if (t == p.DEST_MIDDLE) {
                    var i = new BMap.Icon("//webmap1.bdimg.com/wolfman/static/common/images/drv_m_7f5ea94.png", p.MARKER_11_11_SIZE, {
                            imageSize: new BMap.Size(11, 22),
                            offset: p.MARKER_11_11_OFFSET,
                            infoWindowOffset: p.MARKER_11_11_INFOWND_OFFSET
                        }),
                        r = new BMap.Marker(n, {
                            icon: i,
                            baseZIndex: -1e7
                        });
                    return a.addOverlay(r), r.enableDragging(!0), r._stCode = p.OVERLAY_STYLE.DRV_M_MKR, r
                }
                if (!o.showText) {
                    var i = new BMap.Icon("//webmap0.bdimg.com/wolfman/static/common/images/markers_new2_7621a9c.png", p.DEST_MARKER_SIZE, {
                            offset: p.DEST_MARKER_OFFSET,
                            imageOffset: new BMap.Size(200 + 25 * t, 139),
                            infoWindowOffset: p.DEST_MARKER_INFOWND_OFFSET,
                            imageSize: new BMap.Size(p.A_J_MARKER_IMG_NEW_WIDTH, p.A_J_MARKER_IMG_NEW_HEIGHT),
                            srcSet: p.A_J_MARKER_IMG_NEW2X_SRCSET
                        }),
                        r = new BMap.Marker(n, {
                            icon: i,
                            baseZIndex: 35e5,
                            startAnimation: o.startAnimation
                        });
                    return o.text && r.setTitle(o.text), r._stCode = p.OVERLAY_STYLE.DS_MKR + t, a.addOverlay(r), r
                }
                var s = o.text;
                s.length > 10 && (s = s.substring(0, 10) + "...");
                var _ = new BMap.Label(o.text, {
                    point: n
                });
                return _.setStyles({
                    cursor: "pointer"
                }), _.setOffset(new BMap.Size(-12, -28)), _._stCode = p.OVERLAY_STYLE.DS_LBL + t, _.addEventListener("domready", function() {
                    var e = _.getDom();
                    e.style.border = "none", e.style.background = "transparent", e.style.overflow = "visible", e.style.zIndex = 25e5 + 2 * map.pointToPixel(n).y, e.style.cursor = "url(" + map.config.defaultCursor + "), default", T.browser.ie || (T.on(e, "mousedown", function() {
                        e.style.cursor = "url(" + map.config.draggingCursor + "), default"
                    }), T.on(e, "mouseup", function() {
                        e.style.cursor = "url(" + map.config.defaultCursor + "), default"
                    })), _.zIndex = e.style.zIndex;
                    var o = "";
                    o = 6 == T.browser.ie ? '<div class="dest_icon_left_ie6 dest' + t + '"><div></div></div><div class="dest_icon_right_ie6"><div></div><span class="dest_text_ie6">' + s + "</span></div>" : '<div class="dest_icon dest' + t + '"><div class="dest_icon_right"><span class="dest_text">' + s + "</span></div></div>", e.innerHTML = o
                }), a.addOverlay(_), _
            }
        },
        createDrvMidLabel: function(e, t) {
            var o = new BMap.Label(e, {
                point: t,
                offset: new BMap.Size(15, -5)
            });
            return o.setStyles({
                border: "1px solid #999",
                color: "#666",
                padding: "2px",
                background: "#fff"
            }), o
        },
        addDrvDirIcon: function(e, t, o) {
            o = o || map;
            var a = d.getPoiPoint(e);
            if (a) {
                (0 > t || t > 12) && (t = 0);
                var n = 18 * t,
                    i = new BMap.Icon("//webmap0.bdimg.com/wolfman/static/common/images/dest_markers_bae177c.png", new BMap.Size(18, 18), {
                        imageSize: new BMap.Size(300, 138),
                        imageOffset: new BMap.Size(n, 100),
                        infoWindowOffset: new BMap.Size(9, 0)
                    }),
                    r = new BMap.Marker(a, {
                        icon: i
                    });
                return o.addOverlay(r), r._stCode = p.OVERLAY_STYLE.DIR_MKR + t, r
            }
        },
        addPanoTips: function() {},
        addDrRoute: function(e, t, o, a, n) {
            var i = this,
                r = a || map;
            window.dropRoutes || (window.dropRoutes = []);
            var s = [];
            t.onRemoveTips();
            var _ = t.routePoints;
            t.mapZoomLevel = r.getZoom();
            var l = null;
            if (t.driveBounds.length > 0) {
                var f = d.getBPoints(t.driveBounds);
                (0 == t.drag && !e || o) && (l = this.setViewport(f, 40)), t.drag = 0
            }
            for (var c = (Math.pow(2, r.getMaxZoom() - r.getZoom()), 0); c < _.length; c++) {
                for (var E = _[c], u = [], g = 0; g < E.length; g++)
                    for (var R = E[g].p, m = this.cutPoints(R, 0), M = m.split(";"), T = 0; T < M.length; T++) {
                        var v = M[T].split(","),
                            A = new BMap.Point(v[0], v[1]);
                        u.push(A)
                    }
                if (!t.draging && 0 == t.sended) {
                    var i = t;
                    if (0 == e) {
                        var S = this.addRoute(u, n || p.ROUTE_TYPE_DRIVE, void 0, r);
                        s.push(S), S.index = c, S.addEventListener("mouseover", function(e) {
                            i.onRouteOver(e)
                        }), S.addEventListener("mousemove", function(e) {
                            i.onRouteMove(e)
                        }), S.addEventListener("mouseout", function(e) {
                            i.onRouteOut(e)
                        }), window.dropRoutes.push(S)
                    } else {
                        var w = window.dropRoutes[c];
                        w && w.setPoints(u)
                    }
                }
            }
            return s.view = l, s
        },
        createTip: function(e, t, o, a) {
            if (e || "string" == typeof e) {
                var n = {
                        display: !0,
                        offset: new BMap.Size(3, -34),
                        style: {
                            background: "transparent",
                            color: "#000",
                            height: "30px",
                            border: "0",
                            padding: "0 0 0 4px"
                        }
                    },
                    i = a || map;
                if (n.point = i.getCenter(), o && "object" == typeof o) {
                    var r = n.style;
                    o.style && (r = T.extend(r, o.style)), o = T.extend(n, o), o.style = r
                }
                e = "<span class=" + t + ">" + e + "<img src=//webmap0.bdimg.com/wolfman/static/common/images/tip-tail_ce4b006.png></img></span>";
                var s = new BMap.Label(e, {
                        point: o.point,
                        offset: o.offset
                    }),
                    d = new BMap.Marker(o.point, {
                        icon: new BMap.Icon("/wolfman/static/common/images/transparent.gif", new BMap.Size(1, 1))
                    });
                return s.setStyle(o.style), d.setLabel(s), 0 == o.display && s.hide(), i.addOverlay(d), s.addEventListener("mouseover", function() {
                    d.setTop(!0, 35e5 - BMap.Overlay.getZIndex(o.point.lat, BMAP_COORD_MERCATOR))
                }), s.addEventListener("mouseout", function() {
                    d.setTop(!1)
                }), d
            }
        },
        mergeBound: function(e, t) {
            e = e.split(";"), t = t.split(";");
            var o = Math.min(e[0].split(",")[0], t[0].split(",")[0]),
                a = Math.max(e[1].split(",")[0], t[1].split(",")[0]),
                n = Math.min(e[0].split(",")[1], t[0].split(",")[1]),
                i = Math.max(e[1].split(",")[1], t[1].split(",")[1]);
            return o + "," + n + ";" + a + "," + i
        },
        getBitLevel: function(e) {
            for (var t = BMap.MapType[map.mapType], o = map.getMaxZoom(), a = 1, n = o; n >= a; n--) {
                var i = Math.pow(2, o - n) * t.baseUnits / t.tileSize;
                if ((e.getMaxX() - e.getMinX()) / i < map.width - 60 && (e.getMaxY() - e.getMinY()) / i < map.height - 60) break
            }
            return n
        },
        setViewport: function(e, t, o) {
            if (0 != e.length) {
                var a = null;
                a = t ? {
                    margins: [t, t, t, t + l.viewportLeftMargin]
                } : {
                    margins: [0, 0, 0, l.viewportLeftMargin]
                };
                var n = map.getViewport(e, a);
                return n.zoom > 19 && (n.zoom = 19), map.setViewport(n, {
                    callback: o
                }), n
            }
        },
        _getPicType: function() {
            var e = map.getMapType(),
                t = [];
            return e == BMAP_SATELLITE_MAP ? (t.push(7), map._isHybridShow && t.push(1)) : t.push(0), window.GRControll && window.GRControll.getDataForSnap() && t.push(6), t.join(",")
        },
        parse2Geo: function(e, t) {
            t ? .25 > t ? t = 0 : t > .25 && 1 > t ? t = 1 : t > 32 && (t = 32) : t = 0;
            var o = e.split("|");
            if (1 == o.length) {
                var a = E.decode_geo_diff(o[0]);
                return {
                    type: a.type,
                    bound: "",
                    points: a.geo.join(",")
                }
            }
            if (o.length > 1) {
                for (var n = e.split(";.="), i = [], r = [], s = 0, d = n.length, p = 0; d > p; p++) {
                    var _ = n[p];
                    d > 1 && (0 == p && (_ += ";"), p > 0 && d - 1 > p && (_ = ".=" + _ + ";"), p == d - 1 && (_ = ".=" + _));
                    var l = _.split("|"),
                        f = E.decode_geo_diff(l[0]),
                        c = E.decode_geo_diff(l[1]);
                    i.push(f.geo.join(",")), i.push(c.geo.join(","));
                    var a = E.decode_geo_diff(l[2]);
                    s = a.type;
                    var u = a.geo.join(",");
                    if (u = u.replace(/(-?[1-9]\d*\.\d*|-?0\.\d*[1-9]\d*|-?0?\.0+|0|-?[1-9]\d*),(-?[1-9]\d*\.\d*|-?0\.\d*[1-9]\d*|-?0?\.0+|0|-?[1-9]\d*)(,)/g, "$1,$2;"), t > 0) {
                        var g = new RegExp("(((-?\\d+)(\\.\\d+)?),((-?\\d+)(\\.\\d+)?);)(((-?\\d+)(\\.\\d+)?),((-?\\d+)(\\.\\d+)?);){" + t + "}", "ig");
                        u = u.replace(g, "$1")
                    }
                    r.push(u)
                }
                return 1 >= d && (r = r.join(";")), {
                    type: s,
                    bound: i.join(";"),
                    points: r
                }
            }
        },
        array2String: function(e) {
            for (var t = [], o = 0; o < e.length; o += 2) t.push(e[o] + "," + e[o + 1]);
            return t.join(";")
        },
        parseArray2Geo: function(e) {
            var t = e.slice(0, 4),
                o = e[4],
                a = e.slice(5);
            return {
                type: o,
                bound: this.array2String(t),
                points: this.array2String(a)
            }
        },
        getGEORevertAddress: function(e, t) {
            function o(e) {
                return e = BMap.Project.convertLL2MC(new BMap.Point(e.lng, e.lat)), {
                    x: "" + e.lng,
                    y: "" + e.lat
                }
            }
            var a = "//api.map.baidu.com/reverse_geocoding/v3/?location=" + e.lng + "," + e.lat + "&radius=100&page_size=10&coordtype=bd09mc&output=json&extensions_poi=1&ak=8z3RxyDq3sseF20zMZcBxkzhfTdAeSq7&res=webmap";
            baidu.jsonp(a, function(a) {
                if ("function" == typeof t && a && a.result) {
                    var n = a.result,
                        i = {};
                    i.point = o(n.location), i.address = n.formatted_address, i.address_detail = n.addressComponent, i.address_detail.city_code = n.cityCode, i.business = n.business, i.poi_desc = n.sematic_description, i.poi_region = n.poiRegions || [], i.surround_poi = n.pois || [];
                    for (var r = 0; r < i.surround_poi.length; r++) i.surround_poi[r].point = o(e);
                    a.content = i, n.x = e.lng, n.y = e.lat, t(a)
                }
            })
        },
        showInrTip: function(e) {
            T.g("inrTipNew_" + e).style.display = "block", T.g("tipBtn_" + e).style.display = "none", setTimeout(function() {
                T.g("inrTipNew_" + e) && (T.g("inrTipNew_" + e).style.display = "none"), T.g("tipBtn_" + e) && (T.g("tipBtn_" + e).style.display = "block")
            }, 3e3)
        },
        getCurCity: function(e, t) {
            var o = "/?qt=cur&wd=" + encodeURIComponent(e) + "&t=" + (new Date).getTime();
            o += "&dtype=1", baidu.ajax(o, {
                dataType: "json",
                success: function(o) {
                    o && o.content && ("1|0.00,0.00;0.00,0.00|0.00,0.00;" === o.content.geo && (e.indexOf("香港") > -1 ? o.content.geo = "1|12711279.5,2530455;12711279.5,2530455|12711279.5,2530455;" : e.indexOf("澳门") > -1 && (o.content.geo = "1|12640642.62,2518447;12640642.62,2518447|12640642.62,2518447;")), t && t(o))
                },
                error: function() {}
            })
        }
    }
});;
define("common:widget/ui/Animation/Animation.js", function(t, i, n) {
    function e() {}
    e.INFINITE = "INFINITE", e.prototype.build = function(t) {
        var i = this,
            n = {
                duration: 1e3,
                fps: 30,
                delay: 0,
                transition: s.linear,
                finish: function() {},
                onStop: function() {}
            };
        if (this._anis = [], t)
            for (var o in t) n[o] = t[o];
        return "number" == typeof n.delay ? setTimeout(function() {
            i.start()
        }, n.delay) : n.delay != e.INFINITE && this.start(), this._opts = n, this
    }, e.prototype.start = function() {
        this._beginTime = (new Date).getTime(), this._endTime = this._beginTime + this._opts.duration, this._launch()
    }, e.prototype.add = function(t) {
        this._anis.push(t)
    }, e.prototype._launch = function() {
        var t = this,
            i = (new Date).getTime();
        if (i >= t._endTime) {
            if (t._opts.render(t._opts.transition(1)), t._opts.finish(), t._anis.length > 0) {
                var n = t._anis[0];
                n._anis = [].concat(t._anis.slice(1)), n.start()
            }
        } else t.schedule = t._opts.transition((i - t._beginTime) / t._opts.duration), t._opts.render(t.schedule), t.terminative || (t._timer = setTimeout(function() {
            t._launch()
        }, 1e3 / t._opts.fps))
    }, e.prototype.stop = function(t) {
        this.terminative = !0;
        for (var i = 0; i < this._anis.length; i++) this._anis[i].stop(), this._anis[i] = null;
        this._anis.length = 0, this._timer && (clearTimeout(this._timer), this._timer = null), this._opts.onStop(this.schedule), t && (this._endTime = this._beginTime, this._launch())
    }, e.prototype.cancel = function() {
        this._timer && clearTimeout(this._timer), this._endTime = this._beginTime, this.schedule = 0
    }, e.prototype.setFinishCallback = function(t) {
        this._anis.length > 0 ? this._anis[this._anis.length - 1]._opts.finish = t : this._opts.finish = t
    };
    var s = {
        linear: function(t) {
            return t
        },
        reverse: function(t) {
            return 1 - t
        },
        easeInQuad: function(t) {
            return t * t
        },
        easeInCubic: function(t) {
            return Math.pow(t, 3)
        },
        easeOutQuad: function(t) {
            return -(t * (t - 2))
        },
        easeOutCubic: function(t) {
            return Math.pow(t - 1, 3) + 1
        },
        easeInOutQuad: function(t) {
            return .5 > t ? t * t * 2 : -2 * (t - 2) * t - 1
        },
        easeInOutCubic: function(t) {
            return .5 > t ? 4 * Math.pow(t, 3) : 4 * Math.pow(t - 1, 3) + 1
        },
        easeInOutSine: function(t) {
            return (1 - Math.cos(Math.PI * t)) / 2
        }
    };
    s["ease-in"] = s.easeInQuad, s["ease-out"] = s.easeOutQuad, n.exports = {
        Animation: e,
        Transitions: s
    }
});;
define("common:widget/ui/searchData/searchData.js", function(require, exports, module) {
    function setUrl(e, t, o) {
        var n = "",
            r = t || (new Date).getTime(),
            a = Math.floor(map.getZoom());
        a = a > 19 ? 19 : a;
        var i = "&l=" + a,
            d = "/";
        if ((-1 != e.indexOf("nav&") || -1 != e.indexOf("nse&")) && (e += "&extinfo=63"), document.location.href.indexOf("format=1") > -1 && (n = "&format=1"), e.indexOf("&l=") > -1 && (i = ""), e = e.replace(/%3C/gi, encodeURIComponent(" ")).replace(/%3E/gi, encodeURIComponent(" ")) + "&tn=" + map.mapType, e.indexOf("&nn=") < 0 && (e += "&nn=0"), 0 === e.indexOf("bsl")) {
            var l = e.match(/uid=(.*?)((?=&)|$)/)[1],
                c = md5("qt=bsl&uid=" + l);
            e += "&gsign=" + c
        }
        if (e.indexOf("&auth=") < 0 && (e += "&auth=" + encodeURIComponent(window.AUTH)), -1 === e.indexOf("seckey=") && window.SECKEY && (e += "&seckey=" + encodeURIComponent(window.SECKEY)), window.IPLOC && window.IPLOC.ipLoc && window.IPLOC.ipLoc.content && window.IPLOC.ipLoc.content.point && (e += "&u_loc=" + window.IPLOC.ipLoc.content.point.x + "," + window.IPLOC.ipLoc.content.point.y), e.indexOf("b=(") > -1 || o && o.noAddBounds) {
            if (e = d + modelConfig.DATA_URL + e + n + mapDebug.getParam(e) + "&ie=utf-8" + i + "&t=" + r, e.indexOf("&debug") > -1 && e.indexOf("debug=1") > -1) {
                var s = getdebugQuery(e);
                s && (e = replaceParamVal(e, "wd", s))
            }
        } else {
            var u = map.getBounds({
                    margins: [0, 0, 0, mapConfig.leftMargin],
                    heading: 0,
                    tilt: 0
                }),
                m = Math.min(u.minX, u.maxX),
                f = Math.max(u.minX, u.maxX),
                p = Math.min(u.minY, u.maxY),
                g = Math.max(u.minY, u.maxY);
            e = d + modelConfig.DATA_URL + e + n + mapDebug.getParam(e) + "&ie=utf-8" + i + "&b=(" + m + "," + p + ";" + f + "," + g + ")&t=" + r
        }
        return e
    }

    function getdebugQuery(e) {
        var t = /^[0-9]+\$/,
            o = decodeURIComponent(e.split("&")[8]);
        if (o && o.indexOf("wd=") > -1 && o.slice(3).match(t)) var n = encodeURIComponent(o.split("$")[1]);
        return n
    }

    function replaceParamVal(url, arg, val) {
        var pattern = arg + "=([^&]*)",
            replaceText = arg + "=" + val;
        return url = url.match(pattern) ? url.replace(eval("/(" + arg + "=)([^&]*)/gi"), replaceText) : url.match("[?]") ? url + "&" + replaceText : url + "?" + replaceText
    }
    var config = require("common:widget/ui/config/config.js"),
        modelConfig = config.modelConfig,
        mapConfig = config.mapConfig,
        vcode = require("common:widget/ui/vcode/Vcode.js"),
        searchData = {
            lastSearchTime: {},
            fetch: function(e, t, o, n) {
                var r = e.substring(0, e.indexOf("&")),
                    a = e,
                    i = (new Date).getTime();
                return this.lastSearchTime[r] = i, e = setUrl(e, i, n), ErrorMonitor("qt_" + r, "BASE", ""), T.ajax(e, {
                    dataType: "json",
                    success: function(n, i) {
                        var d = i.getResponseHeader("need_vcode_check"),
                            l = i.getResponseHeader("codestr"),
                            c = {};
                        if (d) return c.lastRequest = a, c.setUrl = e, c.codestr = l, void vcode.openPop(c);
                        var s = i.getResponseHeader("HTTP_X_BD_LOGID");
                        if (!n || !n.result) return ErrorMonitor("qt_" + r, "res_null", s + "$$no res$$" + e, void 0, {
                            xhr: i,
                            url: e,
                            type: "fail"
                        }), void(o && o());
                        var u;
                        1 === n.result.current_null && !n.place_info || i.slow ? (1 !== n.result.current_null || n.place_info || "bse" === r || (ErrorMonitor("qt_" + r, "res_null", s + "$$no content$$" + e, void 0, {
                            xhr: i,
                            url: e,
                            type: "fail"
                        }), u = "fail"), i.slow && (ErrorMonitor("qt_" + r, "req_slow" + i.slow, s, void 0, {
                            xhr: i,
                            url: e,
                            type: "slow"
                        }), u = "slow")) : (ErrorMonitor("qt_" + r, "succ", "", void 0, {
                            xhr: i,
                            url: e,
                            type: "succ"
                        }), u = "succ"), n.damoce && n.damoce.result && addStat("searchdata.ad.data", "show", {
                            d_stat: n.damoce.result.logs
                        }), n.result && n.result.auth && (window.AUTH = n.result.auth), t && t(n, {
                            type: u
                        })
                    },
                    error: function(t) {
                        0 !== t.status && (ErrorMonitor("qt_" + r, "req_fail", t.status, void 0, {
                            xhr: t,
                            url: e,
                            type: "fail"
                        }), o && o())
                    }
                })
            },
            setUrl: setUrl
        };
    module.exports = searchData
});;
define("common:widget/route/setMyPlace/SetMyPlaceStorer.js", function(t, e, r) {
    var i = (t("common:widget/ui/util/util.js"), t("common:widget/ui/config/config.js")),
        a = (i.mapConfig, {
            baiduStorage: null,
            arr: [],
            userId: encodeURIComponent(baidu.cookie.get("BAIDUID")) || "",
            init: function(e) {
                var r = this,
                    i = t("common:widget/ui/Storage/Storage.js");
                r.baiduStorage = i, e && e()
            },
            setAll: function(t) {
                this.baiduStorage.set({
                    key: "_smp_save",
                    value: baidu.json.stringify(t)
                }), this.arr = t
            },
            set: function(t) {
                var e = this.arr;
                if (e && 0 != e.length) {
                    var r = this.getIndexByTarget(t.target);
                    void 0 != r ? e[r] = t : e.push(t)
                } else e = [t];
                this.setAll(e)
            },
            getAll: function() {
                try {
                    var t = baidu.json.parse(this.baiduStorage.get({
                        key: "_smp_save"
                    }))
                } catch (e) {
                    return
                }
                return this.arr = t || [], t
            },
            getItemByTarget: function(t) {
                if (t) {
                    var e = this.getIndexByTarget(t);
                    return this.arr[e]
                }
            },
            getIndexByTarget: function(t) {
                if (t)
                    for (var e = 0, r = this.arr.length; r > e; e++)
                        if (t == this.arr[e].target) return e
            },
            rmvItemByTarget: function(t) {
                t && this.rmvItemByIndex(this.getIndexByTarget(t))
            },
            rmvItemByIndex: function(t) {
                void 0 !== t && (T.array.removeAt(this.arr, t), this.setAll(this.arr))
            },
            clear: function() {
                this.baiduStorage.remove({
                    key: "_smp_save"
                })
            }
        });
    r.exports = a
});;
define("common:widget/route/setMyPlace/ui3SetMyPlace.js", function(e, t, a) {
    var i, n = e("common:widget/route/setMyPlace/ui3SetMyPlacePop.js"),
        c = (e("common:widget/ui/toast/toast.js"), n.storer),
        l = {},
        o = i = {
            init: function(e) {
                return this.onSelect = e || function() {}, this.initSaved(), this.drawList()
            },
            drawList: function() {
                function e(e) {
                    var t = e ? "home" : "company",
                        a = ['<li class="ui3-set-my-place-item ', t, '" data-target="', t, '">', '    <div class="clearfix ui3-set-my-place-inner">', "        <b><em>&nbsp;</em><span>", e ? "我的家" : "公司/学校", "</span", '       ></b><i><a href="#" class="no-data" onclick="return false">设置</a></i>', "    </div>", "</li>"];
                    return a.join("")
                }

                function t(e, t) {
                    var a = e ? "home" : "company",
                        i = ['<li class="ui3-set-my-place-item ', a, '" data-target="', a, '">', '    <div class="clearfix ui3-set-my-place-inner">', '       <i class="ui3-set-my-place-action">', '       <a href="#" onclick="return false" data-action="edit">修改</a', '       ><a href="#" onclick="return false" data-action="delete">清空</a>', "       </i>", "        <b><em>&nbsp;</em><span>", e ? "我的家" : "公司/学校", '</span></b><a href="#" class="has-data" onclick="return false" title="', t.note, '">', t.note, "</a>", "    </div>", "</li>"];
                    return i.join("")
                }
                var a = l.home,
                    i = l.company,
                    n = [];
                return n.push(a ? t(!0, a) : e(!0)), n.push(i ? t(!1, i) : e(!1)), n.join("")
            },
            initSaved: function() {
                var e = c.getAll();
                l = {}, T.each(e, function(e, t) {
                    var a = t.target;
                    "home" === a ? l.home = t : "company" === a && (l.company = t)
                })
            },
            select: function(e, t) {
                var a = l[e];
                a ? (t && t.val(a.name), this.onSelect(a), addStat("indexleftmenu.setMyPlace.useBtn", "click"), "company" == e ? addStat("indexleftmenu.setMyPlace.useCompanyBtn", "click") : "home" == e && addStat("indexleftmenu.setMyPlace.useHomeBtn", "click")) : ("home" == e ? addStat("indexleftmenu.setMyPlace.setHomeBtn", "click") : "company" == e && addStat("indexleftmenu.setMyPlace.setCompanyBtn", "click"), i.open({
                    target: e,
                    action: "add"
                }))
            },
            bindWrapEvents: function(e) {
                e.find("a.no-data").bind("click", function() {
                    var e = T(this).parents("li"),
                        t = e.attr("data-target");
                    i.open({
                        target: t,
                        action: "add"
                    }), "home" == t ? addStat("indexleftmenu.setMyPlace.setHomeBtn", "click") : "company" == t && addStat("indexleftmenu.setMyPlace.setCompanyBtn", "click"), addStat("indexleftmenu.setMyPlace.setBtn", "click")
                }), e.find("a[data-action]").bind("click", function() {
                    var e = T(this),
                        t = e.parents("li"),
                        a = e.attr("data-action"),
                        c = t.attr("data-target"),
                        o = l[c];
                    o.target = c;
                    var s = "home" === o.target ? "我的家" : "公司 / 学校";
                    if ("edit" === a) addStat("indexleftmenu.setMyPlace.editBtn", "click"), addStat("indexleftmenu.setMyPlace." + c + "editBtn", "click"), i.open(o);
                    else {
                        var m = window.confirm("是否要清空常用地点“" + s + "”?");
                        addStat("indexleftmenu.setMyPlace.deleteBtn", "click"), addStat("indexleftmenu.setMyPlace." + c + "deleteBtn", "click"), m && n.bundle().remove(c)
                    }
                }), e.find("li").bind("click", function(t) {
                    if (!T(t.target).is("[data-action],.no-data")) {
                        var a = T(this),
                            n = a.attr("data-target"),
                            c = l[n];
                        if (!c || 0 === c.length) return void a.find(".no-data").trigger("click");
                        e.suggestInputTarget && e.suggestInputTarget.val(c.name), i.onSelect(c), addStat("indexleftmenu.setMyPlace.useBtn", "click"), "company" == c.target ? addStat("indexleftmenu.setMyPlace.useCompanyBtn", "click") : "home" == c.target && addStat("indexleftmenu.setMyPlace.useHomeBtn", "click")
                    }
                })
            },
            open: function(e) {
                i.pop = n.initialize(e)
            }
        },
        s = ".ui3-set-my-place-item{line-height:32px}.ui3-set-my-place-item:hover,.ui3-set-my-place-item.ui3-suggest-item-hover{cursor:pointer;background-color:#EBEBEB}.ui3-set-my-place-item.home em{display:inline-block;width:15px;height:13px;padding-top:2px;background:url(//webmap1.bdimg.com/wolfman/static/common/images/ui3/tools/suggestion-icon_a0251d1.png) no-repeat 0 -40px}.ui3-set-my-place-item.company em{display:inline-block;padding-top:2px;width:15px;height:14px;background:url(//webmap1.bdimg.com/wolfman/static/common/images/ui3/tools/suggestion-icon_a0251d1.png) no-repeat 0 -26px}.ui3-set-my-place-item b{padding-left:12px;float:left;line-height:32px}.ui3-set-my-place-item.other b{padding-left:17px}.ui3-set-my-place-item em{display:inline-block;width:15px;line-height:14px;height:14px;background:url(//webmap1.bdimg.com/wolfman/static/common/images/ui3/tools/tools_2b91efa.png) no-repeat -30px -291px}.ui3-set-my-place-item span{color:#666;margin-left:13px;width:53px}.ui3-set-my-place-item a{vertical-align:middle;color:#999;margin-left:14px;text-decoration:none}.ui3-set-my-place-item i{float:right;font-style:normal;margin-right:5px}.ui3-set-my-place-action a{margin-left:5px}.ui3-set-my-place-inner i a:hover{color:#36c}.ui3-set-my-place-item .has-data{display:block;margin-left:105px;margin-right:70px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.ui3-set-my-place-item.other .has-data{margin-left:44px}.ui3-set-my-place-item .has-data:hover{}";
    e.loadCss({
        content: s,
        name: "ui3SetMyPlace"
    }), a.exports = o
});;
define("common:widget/ui/userMgr/userMgr.js", function(e, o, i) {
    function t() {
        v ? v.show() : s.getLink(function(e) {
            baidu.sio(l + "passApi/js/uni_wrapper.js?cdnversion=" + (new Date).getTime()).callByBrowser(function() {
                baidu.g("passport-login-pop") || (v = passport.pop.init({
                    loginVersion: "v5",
                    composeTemplate: 1,
                    hideLogo: 0,
                    guideMapImg: "https://map-mobile-resource.cdn.bcebos.com/icon/service/pc-station/default/map-guide.png",
                    qrcodeCfg: {
                        appName: "百度地图APP",
                        disableJump: !1,
                        downLoadQrcode: "https://map-mobile-resource.cdn.bcebos.com/icon/service/pc-station/default/pc-login-popup-qrcode.png",
                        appIcon: "https://map-mobile-resource.cdn.bcebos.com/icon/service/pc-station/default/logo%402x.png",
                        appHref: "https://map.baidu.com/mapclient-pages/downloadPC/"
                    },
                    apiOpt: {
                        staticPage: g,
                        product: "ma",
                        charset: "utf-8",
                        u: e || location.href,
                        memberPass: !0,
                        safeFlag: 0,
                        sms: 5
                    },
                    cache: !1,
                    authsite: b,
                    authsiteCfg: {
                        act: "implicit",
                        u: e || location.href
                    },
                    tangram: !0,
                    onSubmitStart: function() {
                        "sms" === this.currentLoginType ? addStat("pc4LoginPop.loginPop.smsSubmit1", "click") : addStat("pc4LoginPop.loginPop.accountSubmit1", "click")
                    },
                    onRender: function() {
                        try {
                            var e = baidu.phoenix;
                            window.baidu = window.T, window.baidu.phoenix = e;
                            var o = $("#passport-login-pop-dialog"),
                                i = document.querySelector("#passport-login-pop-dialog p.tang-pass-qrcode-title span");
                            i && (i.innerText = "百度地图APP"), o.delegate(".pass-sms-link-back", "click", function() {
                                window.addStat("login.sms.back", "click", {})
                            }).delegate(".pass-sms-btn", "click", function() {
                                window.addStat("login.id.back", "click", {})
                            }).delegate(".pass-checkbox-memberPass", "change", function() {
                                $(this).prop("checked") || window.addStat("login.id.cancelChecked", "click", {})
                            }).delegate(".pass-item-timer", "click", function() {
                                addStat("pc4LoginPop.loginPop.smsSend", "click")
                            })
                        } catch (t) {
                            "undefined" != typeof alog && alog("exception.fire", "catch", {
                                msg: t.message || t.description,
                                path: "common:widget/ui/userMgr/userMgr.js",
                                ln: 198
                            })
                        }
                    },
                    onShow: function() {
                        switch (n) {
                            case "pc4loginpop":
                                addStat("pc4LoginPop.loginPop.show1", "show")
                        }
                        addStat("smsLogin.loginPop.show", "show")
                    },
                    onLoginSuccess: function(e) {
                        switch ("pc4loginpop" === n && ("sms" === this.currentLoginType ? addStat("pc4LoginPop.loginPop.smsSuccess1", "click", {
                            da_trd: /\bfrom=alamap\b/.test(location.href) ? "alamap" : "else"
                        }) : addStat("pc4LoginPop.loginPop.accountSuccess1", "click", {
                            da_trd: /\bfrom=alamap\b/.test(location.href) ? "alamap" : "else"
                        })), e.currentTarget && "sms" === e.currentTarget.currentLoginType ? window.addStat("login.sms.login", "click", {}) : window.addStat("login.id.login", "click", {}), listener.trigger("loginSuccess"), /usercenter-/.test(n) && addStat(n + ".login.success", "click", {}), n) {
                            case "userCenter":
                                addStat("userCenter.login.success", "click", {});
                                break;
                            case "fav":
                                addStat("newfav.loginSuccess.pvuv", "click", {});
                                break;
                            case "movie":
                                addStat("ctMovie.login.success", "click", {});
                                break;
                            case "account":
                                addStat("ctAccount.login.success", "click", {});
                                break;
                            case "maptypefav":
                                addStat("maptypefav.login.success", "click", {});
                                break;
                            case "rightTopBanner":
                                addStat("rightTopBanner.loginSuccess.pvuv", "click", {});
                                break;
                            case "poilistHoneypot":
                                addStat("poilistHoneypot.loginSuccess.pvuv", "click", {});
                                break;
                            case "poilistNormal":
                                addStat("poilistNormal.loginSuccess.pvuv", "click", {});
                                break;
                            case "message":
                                addStat("sendMessage.login.success", "click");
                                break;
                            case "pc4loginpop":
                                addStat("pc4LoginPop.new.loginSuccess", "click", {
                                    da_trd: /\bfrom=alamap\b/.test(location.href) ? "alamap" : "else"
                                });
                                break;
                            case "message-center":
                                addStat("messagecenter.login.success", "click");
                                break;
                            case "topTextHref":
                                addStat("topText.login.success", "click", {});
                                break;
                            case "route-his":
                                addStat("routeHis.login.success", "click", {});
                                break;
                            case "sug-his":
                                addStat("sugHis.login.success", "click", {});
                            case "trafficCard.bus":
                                addStat("trafficCard.bus.login.success", "click", {});
                                break;
                            case "trafficCard.drive":
                                addStat("trafficCard.drive.login.success", "click", {});
                                break;
                            case "comingIn":
                                addStat("comingIn.login.success", "click", {})
                        }
                    }
                }), v.show())
            })
        })
    }

    function a(e, o) {
        var i = k++;
        e.innerHTML = '<ul class="login-tab">                 <li class="tab-item tab-item-left tab-selected">                     <a href="#" onclick="return false;" hidefocus="true">普通登录</a>                 </li>                 <li class="tab-item tab-item-right">                     <a href="#" onclick="return false;" hidefocus="true">手机登录</a>                 </li>            </ul>            <div id="ss_pass_login_form' + i + '" class="tang-pass-loginPanel"></div>            <div id="otherLogin' + i + '" class="pass-phoenix-list" style="margin-left:55px;"></div>            <div class="nopass">没有百度帐号？<a href="https://passport.baidu.com/v2/?reg&regType=1&tpl=ma" target="_blank">立即注册</a></div>', baidu.sio(l + "phoenix/account/jsapi?a=" + (new Date).getTime()).callByBrowser(function() {
            var e = baidu.phoenix;
            window.baidu = window.T, window.baidu.phoenix = e, baidu.phoenix.require(b, {
                target: "otherLogin" + i,
                tpl: "map",
                act: "implicit",
                html: {
                    tsina: "新浪微博",
                    renren: "人人网",
                    qzone: "qq号",
                    tqq: "腾讯微博"
                },
                u: o || location.href
            })
        }), baidu.sio(l + "passApi/js/wrapper.js?cdnversion=" + (new Date).getTime()).callByBrowser(function() {
            function e(e, o) {
                o.children("li").each(function(i) {
                    baidu(this).click(function(t) {
                        t.preventDefault(), o.children("li").removeClass("tab-selected"), baidu(this).addClass("tab-selected"), e.switchTo(["normal", "phone"][i])
                    })
                })
            }
            passport.use("login", {
                tangram: !1
            }, function(t) {
                var a = new t.passport.login({
                    product: "map",
                    staticPage: g,
                    u: o || location.href,
                    charset: "",
                    memberPass: !0,
                    safeFlag: 0
                });
                a.on("loginSuccess", function() {
                    top.location.reload()
                }), baidu("#ss_pass_login_form" + i).html(""), a.render("ss_pass_login_form" + i), e(a, baidu("#ss_pass_login_form" + i).prevAll("ul.login-tab"))
            })
        })
    }
    var n, s = e("common:widget/ui/mapShare/MapShare.js"),
        c = e("common:widget/ui/searchHistory/hisMgr.js"),
        r = ".tang-pass-qrcode.tang-pass-login::before{display:none}";
    e.loadCss({
        content: r,
        name: "userMgr"
    });
    var l = "https://passport.baidu.com/",
        d = "/?qt=ssn",
        u = "&tpl=ma",
        p = "http://";
    "https:" === location.protocol && (p = "https://");
    var g = p + location.host + "/v3Jump.html",
        f = "1",
        m = "0",
        h = ['<ul class="order-list" data-stat-code="order">', '<li><a target="_blank" class="order-list-movie" href="https://dianying.baidu.com/user/orderlist?channel=map&client=pc">电影订单</a></li>', "</ul>"].join("");
    if (6 == T.browser.ie || 7 == T.browser.ie) var b = ["tsina", "renren", "tqq"];
    else var b = ["qzone", "tsina", "renren", "tqq"];
    var v, k = 0,
        w = {
            loginStatus: !1,
            defferd: T.Deferred(),
            init: function(e, o) {
                var i = this;
                return this.update({
                    onsuccess: function(o) {
                        e && e(o), i.defferd.resolve(o)
                    },
                    onoffline: function(e) {
                        o && o(e), i.defferd.reject(e)
                    }
                }), this.generateOrder(), i.defferd.promise()
            },
            generateOrder: function() {
                var e;
                baidu.dom("#user_info").delegate(".book-order", "mouseenter", function() {
                    var o = baidu(this).find(".order-list");
                    e && clearTimeout(e), 0 == o.length && (o = baidu(this).append(baidu(h))), o.show()
                }).delegate(".book-order", "mouseleave", function() {
                    var o = baidu(this).find(".order-list");
                    o.length > 0 && (e = setTimeout(function() {
                        o.hide()
                    }, 50))
                }).delegate(".order-list-hotel", "click", function() {
                    var e = w.userState && w.userState.isOnline || "0";
                    window.addStat(1, {
                        da_src: "inf.order_hotel",
                        from: "map",
                        user: e
                    })
                })
            },
            getState: function(e) {
                var o, i = T.ajax(d + "&t=" + +new Date, {
                    cache: !1,
                    dataType: "json",
                    success: function(i) {
                        i && ("https:" === location.protocol && i.avatar && (i.avatar = i.avatar.replace("http:", "https:")), e(i)), clearTimeout(o)
                    },
                    error: function() {
                        e({
                            isOnline: "0"
                        }), clearTimeout(o)
                    }
                });
                o = setTimeout(function() {
                    i.abort()
                }, 8e3)
            },
            login: function(e, o, i) {
                e ? a(e, o) : (n = i, t())
            },
            logout: function() {
                c.clearAllLocalData(), T.cookie.remove("favmarker"), s.getLink(function(e) {
                    window.location.href = l + "?logout" + u + "&u=" + encodeURIComponent(e)
                })
            },
            showloginSug: function() {
                var e = this,
                    o = [],
                    i = "<div id='unlogin' class='unlogin-search-tip'><img class='unlogin-search-text' src='/wolfman/static/common/images/transparent.gif' /><i title='关闭' class='close'></i></div>";
                o.push(i), T("#unlogin img").on("click", function(o) {
                    e.login(void 0, void 0, "rightTopBanner"), o.stopPropagation(), o.preventDefault(), o.returnValue = !1, addStat("rightTopBanner.login.pvuv", "click", {})
                }), T("#unlogin i").on("click", function(o) {
                    e.removeLoginSug(), o.stopPropagation(), o.preventDefault(), addStat("rightTopBannerClose.login.pvuv", "click", {})
                }), addStat("rightTopBanner.login.pvuv", "show", {})
            },
            removeLoginSug: function() {
                T.dom.remove(T.g("unlogin")), T.cookie.set("UNLOGIN", "2", {
                    expires: 36e5
                })
            },
            hide: function() {
                T("#unlogin").css("display", "none")
            },
            show: function() {
                T("#unlogin").css("display", "block")
            },
            update: function(e) {
                e = e || {}; {
                    var o = this;
                    T.g("login"), T.g("logout_user_info"), T.g("login_user_info")
                }
                this.getState(function(i) {
                    switch (o.userState = i, i.isOnline) {
                        case f:
                            baidu("#popUserInfoId a.logout").one("click", function(e) {
                                o.logout(), e.preventDefault()
                            }), e && e.onsuccess && e.onsuccess(i), o.loginStatus = !0;
                            break;
                        case m:
                            o.showloginSug();
                            var t = +(T.cookie.get("showLoginPopup") || 0);
                            1 > t && (t = 1, T.cookie.set("showLoginPopup", t, {
                                expires: 6048e5
                            })), baidu("#login").on("click", function(e) {
                                e = window.event || e, baidu.event.preventDefault(e), o.login(void 0, void 0, "topTextHref"), e.returnValue = !1
                            }), o.loginStatus = !1, e && e.onoffline && e.onoffline(i)
                    }
                })
            }
        };
    i.exports = w
});;
define("common:widget/ui/userCenter/userCenterMgr.js", function(require, exports, module) {
    var userMgr = require("common:widget/ui/userMgr/userMgr.js"),
        container = $("#user-center.ui3-user-center-wrap"),
        favMgr = require("common:widget/ui/fav/favMgr.js"),
        pop = require("common:widget/route/setMyPlace/ui3SetMyPlacePop.js"),
        sendToMobile = require("common:widget/ui/sendToMobile/sendToMobile.js"),
        template = [function(_template_object) {
            var _template_fun_array = [],
                fn = function(__data__) {
                    var _template_varName = "";
                    for (var name in __data__) _template_varName += "var " + name + '=__data__["' + name + '"];';
                    eval(_template_varName), _template_fun_array.push('<div class="info-box clearfix"><div class="arrow"></div><div class="detail-info-box"><div class="up-zone">'), isLogin ? _template_fun_array.push('<div class="login-wrapper" class="clearfix">                <div class="left avatar" style="background-image:url(', "undefined" == typeof avatar ? "" : avatar, ')">                </div>                <div class="right user-info">                                    <div class="username text-overflow">', "undefined" == typeof userName ? "" : baidu.template._encodeHTML(userName), '</div>                    <div class="associate-tip">                    您暂未关联手机，在APP登录后可自动关联                    </div>                </div></div>') : _template_fun_array.push('<div class="not-login-wrapper"><div class="guide-figure"></div><div class="guide-caption">登录建立您的地图档案</div><a class="guide-login need-login">登录</a></div>'), _template_fun_array.push('</div><div class="mylocation-box bottom-split"></div><div class="bottom-split"><ul class="list"><li><a href="javascript:;" class="my-fav need-login" data-name="fav"><i class="icon fav"></i><span class="color-strong">我的收藏</span></a></li><!-- <li><a data-name="mycenter" href="http://map.baidu.com/ugc/user/index" target="_blank" class="need-login"><i class="icon center"></i><span class="color-strong">我的主页</span></a></li> --><li><a data-name="accoutsetting" href="https://passport.baidu.com/center" target="_blank" class="need-login"><i class="icon setting"></i><span class="color-strong">账号设置</span></a></li></ul></div>'), isLogin && _template_fun_array.push('<div class="exit"><a data-name="quit" href="javascript:;" class="logout color-weak">退出账号</a></div>'), _template_fun_array.push("</div></div>"), _template_varName = null
                }(_template_object);
            return fn = null, _template_fun_array.join("")
        }][0],
        locationTpl = [function(_template_object) {
            var _template_fun_array = [],
                fn = function(__data__) {
                    var _template_varName = "";
                    for (var name in __data__) _template_varName += "var " + name + '=__data__["' + name + '"];';
                    eval(_template_varName), _template_fun_array.push('<ul class="list"><li><i class="icon home"></i><div class="mylocation-box" data-target="home"><span class="caption">我的家</span>'), loc.home ? (_template_fun_array.push('<span class="addr color-weak text-overflow">', "undefined" == typeof loc.home.note ? "" : baidu.template._encodeHTML(loc.home.note), '</span><span class="setting">'), userInfo.isLogin || _template_fun_array.push('<a href="javascript:;" data-action="sync" class="sync need-login"></a>'), _template_fun_array.push('<a href="javascript:;" data-action="edit" class="edit"></a><a href="javascript:;" data-action="clear" class="clear"></a></span>')) : (_template_fun_array.push('<span class="addr color-weak text-overflow"></span><span class="setting">'), userInfo.isLogin || _template_fun_array.push('<a href="javascript:;" data-action="sync" class="sync need-login"></a>'), _template_fun_array.push('<a href="javascript:;" data-action="set" class="set"></a></span>')), _template_fun_array.push('</div></li><li><i class="icon company"></i><div class="mylocation-box" data-target="company"><span class="caption">公司/学校</span>'), loc.company ? (_template_fun_array.push('<span class="addr color-weak text-overflow">', "undefined" == typeof loc.company.note ? "" : baidu.template._encodeHTML(loc.company.note), '</span><span class="setting">'), userInfo.isLogin || _template_fun_array.push('<a href="javascript:;" data-action="sync" class="sync need-login"></a>'), _template_fun_array.push('<a href="javascript:;" data-action="edit" class="edit"></a><a href="javascript:;" data-action="clear" class="clear"></a></span>')) : (_template_fun_array.push('<span class="addr color-weak text-overflow"></span><span class="setting">'), userInfo.isLogin || _template_fun_array.push('<a href="javascript:;" data-action="sync" class="sync need-login"></a>'), _template_fun_array.push('<a href="javascript:;" data-action="set" class="set"></a></span>')), _template_fun_array.push("</div></li></ul>"), _template_varName = null
                }(_template_object);
            return fn = null, _template_fun_array.join("")
        }][0],
        toast = require("common:widget/ui/toast/toast.js"),
        Prompt = require("common:widget/ui/prompt/prompt.js"),
        parabola = require("common:widget/ui/userCenter/parabola.js"),
        userCenterMgr = {
            _state_: {
                infoBoxExpand: !1,
                userInfo: {
                    isLogin: !1,
                    avatar: "//webmap1.bdimg.com/wolfman/static/common/images/new/avatar-default_b67b11e.png"
                }
            },
            _myPlaceDic: {
                sync: "同步",
                edit: "修改",
                clear: "删除",
                set: "设置"
            },
            init: function() {
                this.render(), this.bind(), this.initFavAnimation()
            },
            resizeAvatar: function(a, e) {
                a && e && container.find("img[data-size=cover]").each(function() {
                    var t = $(this).attr("width"),
                        n = parseInt(e * t / a, 10),
                        i = parseInt((n - t) / 2, 10);
                    i = -1 * i, $(this).css("top", i)
                })
            },
            show: function() {
                var a = this.renderLocs();
                container.find(".mylocation-box").html(a), this._state_.infoBoxExpand = !0, container.find(".info-box").show(), listener.trigger("usercenter.show"), addStat("usercenter.info.show", "show")
            },
            hide: function() {
                this._state_.infoBoxExpand = !1, container.find(".info-box").hide(), listener.trigger("usercenter.hide")
            },
            toggleDisplay: function() {
                this._state_.infoBoxExpand ? this.hide() : this.show()
            },
            getValidLocation: function(a) {
                var e = {};
                a = a || [];
                var t = ["company", "home"];
                return e.company = null, e.home = null, a.forEach(function(a) {
                    -1 !== t.indexOf(a.target) && (e[a.target] = a)
                }), e
            },
            favAnimationHandler: function(a, e) {
                T(".fav-animation-container").remove();
                var t = T("<div></div>");
                t.addClass("fav-animation-container"), t.append('<div class="folder-back-wapper"><div class="folder-back"></div></div>'), t.append('<div class="star"></div>'), t.append('<div class="folder-front"></div>'), t.appendTo($("body"));
                var n = t.find(".star"),
                    i = (n[0].style, 1.2),
                    s = 1200,
                    o = T("#user-center");
                o.find(".avatar-abstract").css("opacity", 0);
                var r = o.offset();
                r.left += o.width() / 2 - 11, r.top += o.height() / 2 - 11;
                var c = (r.left - e.pos.left) * (r.left - e.pos.left) + (r.top - e.pos.top) * (r.top - e.pos.top);
                s = parseInt(Math.sqrt(c) * i, 10), s = Math.max(s, 500), s = Math.min(s, 1e3);
                var l = {
                    ele: n,
                    startPos: e.pos,
                    endPos: r,
                    duration: s,
                    callback: function() {
                        setTimeout(function() {
                            t.remove(), o.find(".avatar-abstract").css("opacity", 1)
                        }, 300)
                    }
                };
                parabola.init(l)
            },
            initFavAnimation: function() {
                listener.on("searchInfoWindow.fav", "click", this.favAnimationHandler), listener.on("searchModule.fav", "click", this.favAnimationHandler)
            },
            render: function() {
                try {
                    var a = this;
                    userMgr.defferd.then(function(e) {
                        a._state_.userInfo.isLogin = !0, a._state_.userInfo.userName = e.displayname, a._state_.userInfo.avatar = e.avatar || a._state_.userInfo.avatar;
                        var t = template(a._state_.userInfo);
                        T(t).appendTo(container);
                        var n = a.renderLocs();
                        container.find(".mylocation-box").html(n), sendToMobile.getMobile({
                            type: 1
                        }).then(function(a) {
                            if (a) {
                                var e = a.name;
                                "未识别手机" === e && (e = "手机"), container.find(".associate-tip").text("我的" + (e || "手机") + "当前已关联,可发送地点或路线到手机"), container.find(".detail-info-box .avatar").addClass("associate-phone"), container.find(".avatar-abstract").addClass("associate-phone"), addStat("usercenter.associatephone.show", "show")
                            }
                        }), container.find(".avatar-abstract").css("background-image", "url(" + a._state_.userInfo.avatar + ")"), container.css("visibility", "visible")
                    }, function() {
                        var e = template(a._state_.userInfo);
                        T(e).appendTo(container);
                        var t = a.renderLocs();
                        container.find(".mylocation-box").html(t), container.find(".avatar-abstract").css("background-image", "url(" + a._state_.userInfo.avatar + ")"), container.css("visibility", "visible")
                    })
                } catch (e) {
                    "undefined" != typeof alog && alog("exception.fire", "catch", {
                        msg: e.message || e.description,
                        path: "common:widget/ui/userCenter/userCenterMgr.js",
                        ln: 219
                    })
                }
            },
            renderLocs: function() {
                try {
                    var a = pop.storer.getAll(),
                        e = this.getValidLocation(a);
                    e.company && addStat("usercenter.hascompany.show", "show"), e.home && addStat("usercenter.hashome.show", "show");
                    var t = {
                        loc: e,
                        userInfo: this._state_.userInfo
                    };
                    return locationTpl(t)
                } catch (n) {
                    "undefined" != typeof alog && alog("exception.fire", "catch", {
                        msg: n.message || n.description,
                        path: "common:widget/ui/userCenter/userCenterMgr.js",
                        ln: 235
                    })
                }
            },
            bind: function() {
                var a = this;
                $("body").on("click", function() {
                    a.hide()
                }), container.on("click", function(a) {
                    a.stopPropagation()
                }), container.find(".avatar-abstract").bind("click", function() {
                    addStat("usercenter.avatar.click", "click"), a.toggleDisplay()
                }), container.on("click", "a[data-name]", function() {
                    var a = this.getAttribute("data-name");
                    addStat("usercenter.link." + a, "click")
                }), container.on("click", ".need-login, a.login", function(e) {
                    if (!a._state_.userInfo.isLogin) {
                        e.preventDefault();
                        var t = baidu(e.target).data("name") || "userCenter";
                        userMgr.login(void 0, void 0, t)
                    }
                    a.hide()
                }), container.on("click", ".mylocation-box a[data-action]", function() {
                    var e = T(this).attr("data-action"),
                        t = T(this).parents("div.mylocation-box");
                    if (t = t.attr("data-target"), a.hide(), "set" === e || "edit" === e) {
                        addStat("usercenter.address." + e, "click");
                        var n = {
                            target: t,
                            action: e,
                            from: "usercenter"
                        };
                        pop.initialize(n)
                    } else "clear" === e ? (addStat("usercenter.address.clear", "click"), window.confirm("是否要清空该地址 ?") && pop.bundle().remove(t)) : "sync" === e && (addStat("usercenter.address.sync", "click"), listener.on("loginSuccess", function() {
                        toast.show("同步成功")
                    }))
                }), container.on("mouseenter", ".mylocation-box a[data-action]", function() {
                    var e = T(this).attr("data-action"),
                        t = {
                            content: a._myPlaceDic[e],
                            offset: {
                                xOffset: -13,
                                yOffset: 15
                            },
                            isResident: !1,
                            appearTime: "mouseenter",
                            arrowDirection: "top"
                        };
                    Prompt.setMaster(T(this), t)
                }), container.on("click", ".logout", function() {
                    addStat("usercenter.loginout.loginoutbtn", "click"), userMgr.logout()
                }), container.on("click", ".my-fav", function() {
                    a._state_.userInfo.isLogin && favMgr.openPanel(), a.hide()
                }), listener.on("com.subway", "load", function() {
                    container.hide()
                }), listener.on("com.subway", "unload", function() {
                    container.show()
                })
            }
        };
    module.exports = userCenterMgr
});;
define("common:widget/ui/signMgr/signMgr.js", function(e, n, a) {
    function o() {
        var n = arguments;
        window.MapSignInst ? o.fun(n) : e.async(["common:widget/com/MapSign/MapSign.js", "common:widget/ui/searchInfoWindow/searchInfoWindow.js"], function(e, a) {
            new e({
                cinfo: {
                    arg: n,
                    searchInfoWindow: a
                }
            })
        }), listener.trigger("uitool"), map.on("maptypechange", function(e) {
            e.mapType === BMAP_EARTH_MAP && o.exituserSign()
        })
    }
    var t = (e("common:widget/com/componentManager.js"), e("common:widget/ui/mapShare/MapShare.js")),
        r = function(e) {
            {
                var n = T.g("shareInupt");
                T.g("cpShareCon")
            }
            e && e.url && (i = !0, n.value = e.url, n.focus(), n.select(), window._iwUrlCbk && window._iwUrlCbk(e.url))
        };
    o._USERSHARE = 1, o._USERFAV = 1, o.fun = function(e) {
        1 == e.length && MapSignInst[e[0]](), e.length > 1 && MapSignInst[e[0]](e[1])
    }, o.userTagPanl = null, o.exituserSign = function() {
        o.userTagPanl && o.userTagPanl.isVisible() && MapSignInst.exituserSign()
    }, o.mapSign = {
        pointInfo: {
            list: {}
        },
        polylineInfo: {
            list: {}
        },
        remarkInfo: {
            list: {}
        }
    }, o.temp = {
        event: {}
    }, o.deCodeShare = function(e) {
        var e = e || "";
        return e.replace(/&amp;/g, "&").replace(/&lt;br\/&gt;/g, "<br/>")
    }, o.cpShare = function() {
        var e = T.g("shareInupt").value,
            n = document.createElement("input");
        return n.value = e, document.body.appendChild(n), n.select(), document.execCommand("copy"), n.className = "oInput", n.style.display = "none", o.cpShare.timer && clearTimeout(o.cpShare.timer), window.clipboardData && (window.clipboardData.clearData(), window.clipboardData.setData("Text", e)), T.g("usSharMes") && (T.g("usSharMes").style.display = "block"), o.cpShare.timer = setTimeout(function() {
            T.g("usSharMes") && (T.g("usSharMes").style.display = "none")
        }, 1e3), e
    }, o.cpShareFF = function() {
        var e = (T.g("shareInupt").value, baidu.swf.createHTML({
            id: "signLinkBtnFlh",
            url: "/wolfman/static/common/swf/fClipboard.swf",
            width: "44",
            height: "24",
            wmode: "transparent",
            ver: "9.0.0"
        }));
        o.cpShareFF.checkFlash = function() {
            var e = baidu.swf.getMovie("signLinkBtnFlh");
            e && e.flashInit && e.flashInit() && (clearInterval(o.cpShareFF.timer), e.setHandCursor(!0), e.setContentFuncName("_sign.cpShareFF.getPasteData"), e.setMEFuncName("_sign.cpShareFF.mouseEventHandler"))
        }, o.cpShareFF.getPasteData = function() {
            var e = o.cpShare();
            return e
        }, o.cpShareFF.mouseEventHandler = function(e) {
            var n = T.g("cpShareCon");
            "mouse_over" == e ? n.className = "on" : "mouse_down" == e ? n.className = "down" : "mouse_up" == e ? n.className = "on" : "mouse_out" == e && (n.className = "")
        }, T.g("cpShareCon").innerHTML = e, o.cpShareFF.timer = setInterval(o.cpShareFF.checkFlash, 500)
    }, o.goShare = function(n) {
        T.g("iw_tool_box") ? T.g("iw_tool_box").style.top = "-2000px" : null;
        var a = T.g("iw_share_con");
        e.async("common:widget/ui/SharePanel/SharePanel.js", function(e) {
            new e({
                dom: a,
                cinfo: {
                    from: "iwshare",
                    data: n
                }
            });
            a.style.display = "", o._goShare(n)
        })
    }, o._goShare = function(e) {
        T.g("shareInupt").style.display = "block", T.g("cpShareCon").style.display = "inline";
        var e = e && e.uid ? e : null,
            n = (T.g("shareInupt"), T.g("cpShareCon")),
            a = T.g("cancelShareBtn"),
            u = "http://map.baidu.com/?";
        if (T.browser.chrome && (T.g("iwBoxShareInput").style.padding = "0 93px 0 2px"), T.g("shareInupt").onfocus = function() {
                this.select()
            }, n || a) {
            var c = function(e) {
                    0 == e.button && (this.className = "down")
                },
                p = function() {
                    this.className = "on"
                },
                l = function() {
                    this.className = ""
                };
            n.onclick = function() {
                o.cpShare()
            }, T.on(n, "mouseover", p), T.on(n, "mousedown", c), T.on(n, "mouseup", p), T.on(n, "mouseout", l), T.on(a, "mouseover", p), T.on(a, "mousedown", c), T.on(a, "mouseup", p), T.on(a, "mouseout", l), o.temp.event.shareCopy = [{
                obj: n,
                type: "mouseover",
                fun: p
            }, {
                obj: n,
                type: "mousedown",
                fun: c
            }, {
                obj: n,
                type: "mouseup",
                fun: p
            }, {
                obj: n,
                type: "mouseout",
                fun: l
            }]
        }
        var h = function() {
            var e = t.SHARE_PROC_URL + "?url=" + encodeURIComponent(u) + "&web=true";
            i = !1, T.jsonp(e, r), clearTimeout(s), s = setTimeout(function() {
                0 == i && r({
                    url: u
                })
            }, 3e3)
        };
        if (e) u += "shareurl=1&poiShareUid=" + e.uid + "&cityCode=" + e.cityCode + "&tn=" + map.mapType, map._isHybridShow && (u += "&hb=" + BMAP_TYPE_HYBIRD), h();
        else {
            var m = MapSignInst.temp.iw.index,
                g = o.mapSign.pointInfo.list[m];
            MapSignInst.getSignLink(baidu.json.stringify(g), function(e) {
                if (1 != e.result) return T.g("shareInupt").style.display = "none", n.style.display = "none", T.g("cpShareCon_").style.display = "block", void(T.g("cpShareCon_").innerHTML = "有不符合相关法规政策的词，请修改");
                var a = e.content.shareId;
                u += "poiShareId=" + a, u += "&tn=" + map.mapType, map._isHybridShow && (u += "&hb=" + BMAP_TYPE_HYBIRD), h()
            }, "single")
        }
    }, o.reShare = function() {
        if (T.g("iw_share_con").style.display = "none", o.temp.event.shareCopy && o.temp.event.shareCopy.length > 0)
            for (var e = o.temp.event.shareCopy, n = 0; n < e.length; n++) {
                var a = e[n];
                T.un(a.obj, a.type, a.fun)
            }
    };
    var i = !0,
        s = null;
    o.parseShare = function(e) {
        var n = "/userflag/share.php?act=read_share&shareId=" + e + "&t=" + (new Date).getTime();
        baidu.ajax(n, {
            dataType: "json",
            success: function(e) {
                if (e = e || {}, 1 == e.result) {
                    var n = e.content;
                    o("parseAllShare", n)
                } else o(), alert("数据已经删除")
            },
            error: function() {}
        })
    }, window._sign = o, a.exports = o
});;
define("common:widget/ui/toast/toast.js", function(t, o, e) {
    var s, a = T("#toast-wrapper"),
        i = T("#toast"),
        n = i.find(".info-tip-text");
    a.on("mouseenter", function(t) {
        clearTimeout(s), t.stopPropagation()
    }), a.on("mouseleave", function(t) {
        a.removeClass("active"), t.stopPropagation()
    });
    var c = {
        show: function(t, o, e) {
            clearTimeout(s), o || (o = "success"), a.addClass("active"), n.html(t), i.removeClass().addClass(o), s = setTimeout(function() {
                a.removeClass("active")
            }, e || 3e3)
        }
    };
    e.exports = c
});;
define("common:widget/ui/fav/favMgr.js", function(require, exports, module) {
    function judge_CN(e, t) {
        for (var i = charPYStr, a = 0; a < (e.length > t.length ? e.length : t.length); a++)
            if (e.charAt(a) != t.charAt(a)) return i.indexOf(e.charAt(a)) > i.indexOf(t.charAt(a)) ? 1 : -1;
        return 0
    }

    function sortByTime(e, t) {
        return t.getData().mtime - e.getData().mtime
    }

    function sortByChinese(opts) {
        return opts = opts || {}, sortMod ? function(e, t) {
            var i = e.name,
                a = t.name;
            return i.localeCompare(a)
        } : function(obj_a, obj_b) {
            var flag, a = obj_a.name[0],
                b = obj_b.name[0];
            return /^(\+|-)?\d+($|\.\d+$)/.test(a) && /^(\+|-)?\d+($|\.\d+$)/.test(b) ? (a = eval(a), b = eval(b), flag = a > b ? 1 : b > a ? -1 : 0) : (a = a.toString(), b = b.toString(), flag = a.charCodeAt(0) >= 19968 && b.charCodeAt(0) >= 19968 ? judge_CN(a, b) : a > b ? 1 : b > a ? -1 : 0), flag
        }
    }

    function copyModels(e) {
        for (var t = [], i = 0; i < e.length; i++) t.push(e[i]);
        return t
    }

    function hasGeo(e) {
        return e.detail && e.detail.data && e.detail.data.extdata && (e.detail.data.extdata.geoptx || e.detail.data.extdata.geopty)
    }

    function getDataType(e) {
        var t = {
                10: "poi",
                11: "poi",
                20: "line",
                21: "line",
                22: "line",
                23: "line",
                30: "tag"
            },
            i = String(e.sid).match(/(\d+)_/);
        return i ? t[i[1]] : void 0
    }
    var config = require("common:widget/ui/config/config.js"),
        modelConfig = config.modelConfig,
        cardMgr = require("common:widget/ui/card/cardMgr.js"),
        userMgr = require("common:widget/ui/userMgr/userMgr.js"),
        PoiModel = require("common:widget/ui/fav/PoiModel.js"),
        LineModel = require("common:widget/ui/fav/LineModel.js"),
        mapUtil = require("common:widget/ui/mapUtil/mapUtil.js"),
        toast = require("common:widget/ui/toast/toast.js"),
        charPYStr = require("common:widget/ui/fav/FavSortPY.js"),
        LOGIN_PENDING = -1,
        LOGIN_ONLINE = 1,
        LOGIN_OFFLINE = 0,
        SORT_TYPE_TIME = "1",
        SORT_TYPE_LETTER = "2",
        showMarkers = !0;
    "hide" === T.cookie.get("favmarker") && (showMarkers = !1);
    var LIMIT = 100,
        deferred = T.Deferred(),
        poiDeferred = T.Deferred(),
        poiModels = [],
        rawData = [],
        filteredPoiModels = [],
        editModels = [],
        __bySid = {},
        __byUid = {},
        __byTagId = {},
        loginState = LOGIN_PENDING,
        curPage = 0,
        curSort = SORT_TYPE_TIME,
        PAGE_COUNT = 10,
        filters = [
            [],
            [],
            [],
            []
        ],
        FILTER_TYPE_TAG = 1,
        FILTER_TYPE_TYPE = 3,
        FILTER_TYPE_REG = 2,
        lastVer = "0",
        lineModels = [],
        curLinePage = 0,
        REQUEST_URL = "/" + modelConfig.DATA_URL + "fav",
        sortMod = "百度".localeCompare("地图") > 1 ? 0 : 1,
        favMgr = {
            init: function() {
                loginState = LOGIN_ONLINE;
                var e = Math.round(1e5 * Math.random());
                T.cookie.set("validate", e, {
                    path: "/"
                });
                var t = this,
                    i = (new Date).getTime();
                return T.when(this.getFavData(), this.getFilterData()).then(function(e, a) {
                    t.genModels(e), t.genFilters(a), deferred.resolve(poiModels, filters);
                    var e = {};
                    e.z_fav_dataload = (new Date).getTime() - i, window.alog("cus.fire", "time", e)
                }, function() {
                    deferred.resolve([], [])
                }), this.bindListeners(), deferred
            },
            offline: function() {
                loginState = LOGIN_OFFLINE, deferred.reject()
            },
            bindListeners: function() {
                listener.on("fav.poi.model", "rename", function() {
                    toast.show("重命名成功")
                }), listener.on("fav.poi.model", "remove", function() {
                    toast.show("删除成功")
                }), listener.on("fav.poi.model", "add", function() {
                    toast.show(showMarkers ? "添加成功" : "添加成功。打开右下收藏图层，可在地图上查看")
                }), listener.on("fav.poi.model", "changetag", function() {
                    toast.show("标签操作成功")
                }), listener.on("fav.line.model", "remove", function() {
                    toast.show("删除成功")
                }), listener.on("fav.line.model", "add", function() {
                    toast.show("添加成功")
                }), listener.on("fav.poi.model", "exceeded", function() {
                    toast.show("已达到1000个收藏点上限", "warning")
                }), listener.on("fav.poi.model", "invalid", function() {
                    toast.show("该地点已失效", "warning")
                })
            },
            getFilterData: function() {
                var e = T.Deferred();
                return this.getData("&mode=get&type=tag", function(t) {
                    e.resolve(t && t.favindexs ? t.favindexs.favindex : [])
                }, function() {
                    e.resolve([])
                }), e
            },
            updateFilterData: function() {
                var e = this;
                this.getData("&mode=get&type=tag", function(t) {
                    t && t.favindexs && (e.genFilters(t.favindexs.favindex), listener.trigger("fav.poi.tag", "change", e.getFilters()))
                })
            },
            getFavData: function() {
                var e = this;
                return this.getData("&mode=get&type=favdata&limit=" + LIMIT, function(t) {
                    return t && t.result && 8 === t.result.error ? void e.getFavData() : void(t && t.sync ? (t.sync.lastver && (lastVer = t.sync.lastver), t.sync.newdata && (rawData = rawData.concat(t.sync.newdata)), "0" === t.sync.newnum ? poiDeferred.resolve(rawData) : t.sync.newnum ? e.getFavData() : poiDeferred.resolve(rawData)) : poiDeferred.resolve(rawData))
                }, function(e) {
                    poiDeferred.reject(e)
                }), poiDeferred
            },
            updateFavData: function() {
                var e = this;
                this.getData("&mode=get&type=favdata&limit=" + LIMIT, function(t) {
                    t && t.sync && (t.sync.lastver && (lastVer = t.sync.lastver), t.sync.newnum && "0" !== t.sync.newnum && e.updateFavData(), e.sync(t.sync))
                })
            },
            genModels: function(e) {
                if (e)
                    for (var t = e.length - 1; t >= 0; t--)
                        if ("del" !== e[t].action && 100 == e[t].status) {
                            var i = getDataType(e[t]);
                            if ("poi" === i && hasGeo(e[t])) {
                                var a = new PoiModel(e[t], showMarkers);
                                poiModels.push(a), __bySid[a.sid] = a, __byUid[a.uid] = a, a.tag && (__byTagId[a.tag.indexid] = a)
                            } else if ("line" === i) {
                                var a = new LineModel(e[t]);
                                lineModels.push(a), __bySid[a.sid] = a
                            }
                        }
            },
            genFilters: function(e) {
                filters = [
                    [],
                    [],
                    [],
                    []
                ];
                for (var t = 0; t < e.length; t++) filters[e[t].type].push(e[t])
            },
            getTags: function() {
                return filters[FILTER_TYPE_TAG]
            },
            getFilters: function() {
                return filters
            },
            sort: function(e, t, i) {
                e || (e = curSort), e === SORT_TYPE_LETTER ? (curSort = SORT_TYPE_LETTER, filteredPoiModels.sort(sortByChinese())) : (curSort = SORT_TYPE_TIME, filteredPoiModels.sort(sortByTime)), this.setPage(t || 0, i)
            },
            filter: function(e, t) {
                var i = this;
                e ? this.getData("&mode=get&type=filter&tids=" + e, function(e) {
                    if (filteredPoiModels = [], e.favdatas)
                        for (var a = e.favdatas.favdata, n = 0; n < a.length; n++) {
                            var o = __bySid[a[n].fid];
                            o && filteredPoiModels.push(o)
                        }
                    i.sort(curSort, t, !0)
                }) : (filteredPoiModels = copyModels(poiModels), i.sort(curSort, t))
            },
            setPage: function(e, t) {
                (!T.isNumber(e) || 0 > e) && (e = 0), curPage = e;
                var i = this.slicePoiModels();
                return i.length || 0 === curPage ? void this.card.setPoiPage(i, curPage, Math.ceil(filteredPoiModels.length / PAGE_COUNT), t) : void this.setPage(curPage - 1, t)
            },
            setLinePage: function(e) {
                (!T.isNumber(e) || 0 > e) && (e = 0), curLinePage = e;
                var t = this.sliceLineModels();
                return t.length || 0 === curLinePage ? void this.card.setLinePage(t, curLinePage, Math.ceil(lineModels.length / PAGE_COUNT)) : void this.setLinePage(curLinePage - 1)
            },
            slicePoiModels: function() {
                return filteredPoiModels.slice(curPage * PAGE_COUNT, curPage * PAGE_COUNT + PAGE_COUNT)
            },
            sliceLineModels: function() {
                return lineModels.slice(curLinePage * PAGE_COUNT, curLinePage * PAGE_COUNT + PAGE_COUNT)
            },
            openPanel: function(e) {
                var t = this;
                this.loadingCardShowed = !1, "pending" === deferred.state() && (this.showPendingPanel(), this.loadingCardShowed = !0), deferred.then(function() {
                    t.showPanel(e)
                }, function() {
                    t.showPanel(e), loginState === LOGIN_OFFLINE && userMgr.login(void 0, void 0, "fav")
                })
            },
            getModel: function(e) {
                return __bySid[e]
            },
            getModelByUid: function(e) {
                return __byUid[e]
            },
            getModelByTagId: function(e) {
                return __byTagId[e]
            },
            getSidByData: function(e) {
                for (var t = 0; t < poiModels.length; t++) {
                    var i = poiModels[t];
                    if (i.name === e.name && (i.addr === e.addr || i.addr === "地址:" + e.addr) && i.pointStr === e.pointStr) return i.sid
                }
                return !1
            },
            showPendingPanel: function() {
                require.async("common:widget/ui/card/LoadingCard.js", function(e) {
                    cardMgr.add(new e)
                })
            },
            showPanel: function(e) {
                var t = this;
                addStat("ui.fav.show", "show", {}), listener.trigger("fav.panel", "open"), require.async("common:widget/com/FavPanel/FavPanel.js", function(i) {
                    filteredPoiModels = copyModels(poiModels), e = e || {}, e = T.extend(e, {
                        isLogin: loginState === LOGIN_ONLINE,
                        poiModels: t.slicePoiModels(),
                        lineModels: t.sliceLineModels(),
                        filters: filters,
                        poiTotal: Math.ceil(filteredPoiModels.length / PAGE_COUNT),
                        lineTotal: Math.ceil(lineModels.length / PAGE_COUNT)
                    }), t.card = new i(e), cardMgr.add(t.card, {
                        staticExpand: t.loadingCardShowed
                    })
                })
            },
            getData: function(e, t, i) {
                T.ajax(REQUEST_URL + e + "&lastver=" + lastVer + "&t=" + (new Date).getTime(), {
                    dataType: "json",
                    method: "get",
                    success: function(e) {
                        t && t(e)
                    },
                    error: function(e) {
                        i && i(e)
                    }
                })
            },
            postData: function(e, t, i) {
                var a = T.cookie.get("validate");
                t = T.extend(t, {
                    validate: a
                }), T.ajax(REQUEST_URL + e + "&lastver=" + lastVer, {
                    data: t,
                    dataType: "json",
                    method: "post",
                    success: function(e) {
                        e && e.sync && (lastVer = e.sync.lastver), e ? e.sync ? i && i(e.sync) : e.favindexs && i && i(e.favindexs.favindex) : i && i()
                    },
                    error: function() {}
                })
            },
            checkState: function(e) {
                return loginState === LOGIN_ONLINE ? (e && e(), !0) : (userMgr.login(void 0, void 0, "fav"), !1)
            },
            addFav: function(e, t) {
                if (this.checkState()) {
                    addStat("newfav.poi.add", "click", {});
                    var i = "&mode=add&type=favdata",
                        a = this;
                    if (1 === e) {
                        var n = {
                            type: "10",
                            sourceid: t.uid,
                            plateform: 3,
                            fromapp: "百度地图",
                            extdata: {
                                name: t.name,
                                geoptx: t.x,
                                geopty: t.y
                            }
                        };
                        this.postData(i, {
                            data: T.json.stringify(n)
                        }, function(e) {
                            a.sync(e)
                        })
                    } else if (2 === e) {
                        var n = {
                            type: "11",
                            sourceid: "",
                            plateform: 3,
                            fromapp: "百度地图",
                            extdata: {
                                name: t.name,
                                content: t.content,
                                geoptx: t.x,
                                geopty: t.y
                            }
                        };
                        this.postData(i, {
                            data: T.json.stringify(n)
                        }, function(e) {
                            a.sync(e)
                        })
                    }
                }
            },
            rename: function(e, t) {
                addStat("newfav.rename.add", "click", {});
                var i = this;
                t = t || "", t = t.substring(0, 20);
                var a = this.getModel(e);
                if (a) {
                    var n = "&mode=modify&type=remark",
                        o = {
                            name: t,
                            geoptx: a.get("extdata").geoptx,
                            geopty: a.get("extdata").geopty
                        };
                    "11" === a.type && (o.content = a.addr), this.postData(n, {
                        data: T.json.stringify([{
                            cid: a.cid,
                            sid: a.sid,
                            action: "modify",
                            detail: T.json.stringify({
                                data: T.json.stringify({
                                    type: a.type,
                                    sourceid: a.uid,
                                    fid: a.sid,
                                    extdata: o
                                })
                            })
                        }])
                    }, function(e) {
                        i.sync(e)
                    }, 200)
                }
            },
            removeFavs: function(e) {
                for (var t = this, i = [], a = 0; a < e.length; a++) {
                    var n = this.getModel(e[a]);
                    n && i.push({
                        cid: n.cid,
                        sid: n.sid,
                        action: "del"
                    })
                }
                var o = "&mode=delete&type=favdata";
                this.postData(o, {
                    data: T.json.stringify(i)
                }, function(e) {
                    t.sync(e)
                })
            },
            removeFav: function(e, t) {
                addStat("newfav.poi.remove", "click", {});
                var i, a = this;
                if (i = "uid" === t ? this.getModelByUid(e) : this.getModel(e)) {
                    var n = "&mode=delete&type=favdata";
                    this.postData(n, {
                        data: T.json.stringify([{
                            cid: i.cid,
                            sid: i.sid,
                            action: "del"
                        }])
                    }, function(e) {
                        a.sync(e)
                    })
                }
            },
            sync: function(e) {
                var t, i = {
                        poi: {
                            add: [],
                            del: [],
                            modify: []
                        },
                        line: {
                            add: [],
                            del: []
                        },
                        tag: []
                    },
                    a = [];
                if (e && e.newdata)
                    for (var n = e.newdata.length - 1; n >= 0; n--) {
                        var o = e.newdata[n],
                            d = getDataType(o);
                        100 == o.status ? "poi" === d ? (t = this.syncPoi(o), t && i[d][t.type].push(t)) : "tag" === d ? (t = this.syncTag(o), t && i[d].push(t)) : "line" === d && (t = this.syncLine(o), t && i[d][t.type].push(t)) : a.push(o.status)
                    } - 1 != T.array.indexOf(a, 106) && listener.trigger("fav.poi.model", "exceeded", 106), i.poi.add.length && (listener.trigger("fav.poi.model", "add", i.poi.add), this.updateFilterData()), i.poi.del.length && (listener.trigger("fav.poi.model", "remove", i.poi.del), this.updateFilterData()), i.line.add.length && listener.trigger("fav.line.model", "add", i.line.add), i.line.del.length && listener.trigger("fav.line.model", "remove", i.line.del), i.tag.length && listener.trigger("fav.poi.model", "changetag", i.tag)
            },
            syncPoi: function(e) {
                if ("del" === e.action) {
                    var t = this.getModel(e.sid);
                    if (t) return this.removePoiFromLocal(t), t.remove(), {
                        type: "del",
                        id: t.sid,
                        uid: t.uid
                    }
                } else if ("modify" === e.action) {
                    var t = this.getModel(e.sid);
                    if (t) return t.rename(e.detail.data.extdata.name), {
                        type: "modify",
                        id: t.sid,
                        uid: t.uid
                    }
                } else if ("add" === e.action && (__bySid[e.sid] && this.removePoiFromLocal(__bySid[e.sid]), hasGeo(e))) {
                    var t = new PoiModel(e, showMarkers);
                    if (t) return poiModels.unshift(t), __bySid[t.sid] = t, __byUid[t.uid] = t, t.tag && (__byTagId[t.tag.indexid] = t), {
                        type: "add",
                        id: t.sid,
                        uid: t.uid
                    }
                }
            },
            syncLine: function(e) {
                if ("del" === e.action) {
                    var t = this.getModel(e.sid);
                    if (t) return this.removeLineFromLocal(t), t.remove(), {
                        type: "del",
                        id: t.sid
                    }
                } else if ("add" === e.action) {
                    var t = new LineModel(e);
                    if (t) return lineModels.unshift(t), __bySid[t.sid] = t, {
                        type: "add",
                        id: t.sid
                    }
                }
            },
            syncTag: function(e) {
                if ("del" === e.action) {
                    var t = this.getModelByTagId(e.sid);
                    if (t) return t && t.removeTag(e.sid), __byTagId[e.sid] = void 0, {
                        type: "del",
                        id: t.sid
                    }
                } else if ("add" === e.action) {
                    var t = this.getModel(e.detail.data.fid);
                    if (t) return t.addTag(e.detail.data), __byTagId[t.tag.indexid] = t, {
                        type: "add",
                        id: t.sid
                    }
                }
            },
            removePoiFromLocal: function(e) {
                __bySid[e.sid] = void 0, __byUid[e.uid] = void 0, e.tag && (__byTagId[e.tag.indexid] = void 0);
                var t = T.array.indexOf(poiModels, e);
                poiModels.splice(t, 1), t = T.array.indexOf(filteredPoiModels, e), filteredPoiModels.splice(t, 1)
            },
            removeLineFromLocal: function(e) {
                __bySid[e.sid] = void 0;
                var t = T.array.indexOf(lineModels, e);
                lineModels.splice(t, 1)
            },
            changeModelsTag: function(e, t) {
                var i = [],
                    a = "&mode=modify&type=tag_poi",
                    n = this;
                if (t)
                    for (var o = 0; o < e.length; o++) {
                        var d = this.getModel(e[o]);
                        if (d) {
                            if (d.tag) {
                                if (d.tag.name === t) continue;
                                i.push({
                                    action: "del",
                                    sid: d.tag.indexid
                                })
                            }
                            i.push({
                                action: "add",
                                cid: "",
                                detail: T.json.stringify({
                                    data: T.json.stringify({
                                        type: "30",
                                        name: t,
                                        fid: d.sid
                                    })
                                })
                            })
                        }
                    }
                i.length && this.postData(a, {
                    data: T.json.stringify(i)
                }, function(e) {
                    n.sync(e)
                })
            },
            changeModelTag: function(e, t) {
                var i = this.getModel(e),
                    a = "&mode=modify&type=tag_poi",
                    n = [],
                    o = this;
                if (i && (i.tag || t)) {
                    if (i.tag) {
                        if (i.tag.name === t) return;
                        n.push({
                            action: "del",
                            sid: i.tag.indexid,
                            cid: ""
                        })
                    }
                    t && n.push({
                        action: "add",
                        cid: "",
                        detail: T.json.stringify({
                            data: T.json.stringify({
                                type: "30",
                                name: t,
                                fid: i.sid
                            })
                        })
                    })
                }
                n.length && this.postData(a, {
                    data: T.json.stringify(n)
                }, function(e) {
                    o.sync(e)
                })
            },
            addTag: function(e) {
                addStat("newfav.tag.add", "click", {});
                var t = this;
                e = e || "", e = e.substring(0, 6);
                var i = "&mode=add&type=tag";
                this.postData(i, {
                    tags: e
                }, function(e) {
                    t.genFilters(e), listener.trigger("fav.poi.tag", "change", t.getFilters())
                })
            },
            removeTag: function(e) {
                addStat("newfav.tag.remove", "click", {});
                var t = this,
                    i = "&mode=delete&type=tag";
                this.postData(i, {
                    tid: e
                }, function(e) {
                    t.genFilters(e), listener.trigger("fav.poi.tag", "change", t.getFilters()), t.updateFavData()
                })
            },
            addEditModel: function(e) {
                editModels.push(e), listener.trigger("fav.poi.model", "select", {
                    id: e.sid
                }), e.highlightMarker();
                for (var t = [], i = 0; i < editModels.length; i++) t.push(editModels[i].marker.point);
                mapUtil.setViewport(t)
            },
            removeEditModel: function(e) {
                var t = T.array.indexOf(editModels, e);
                t > -1 && editModels.splice(t, 1), e.unhighlightMarker(), listener.trigger("fav.poi.model", "unselect", {
                    id: e.sid
                });
                for (var i = [], a = 0; a < editModels.length; a++) i.push(editModels[a].marker.point);
                mapUtil.setViewport(i)
            },
            clearEditModels: function() {
                for (var e = 0; e < editModels.length; e++) listener.trigger("fav.poi.model", "unselect", {
                    id: editModels[e].sid
                }), editModels[e].unhighlightMarker();
                editModels = []
            },
            getEditModels: function() {
                return editModels
            },
            inEditModels: function(e) {
                return -1 !== T.array.indexOf(editModels, e)
            },
            openTagInfoWnd: function() {
                for (var e = [], t = 0; t < editModels.length; t++) e.push(editModels[t].sid);
                require.async("common:widget/ui/fav/FavTagInfoWindow.js", function(t) {
                    var i = new t(editModels[0].marker, {
                        ids: e
                    }, function() {});
                    i.show(), i.iw.addEventListener("close", function() {
                        listener.trigger("fav.poi", "canceledit")
                    })
                })
            },
            openRemoveInfoWnd: function() {
                for (var e = [], t = 0; t < editModels.length; t++) e.push(editModels[t].sid);
                require.async("common:widget/ui/fav/FavRemoveInfoWindow.js", function(t) {
                    var i = new t(editModels[0].marker, {
                        ids: e
                    }, function() {});
                    i.show(), i.iw.addEventListener("close", function() {
                        listener.trigger("fav.poi", "canceledit")
                    })
                })
            },
            openTagManager: function() {
                var e = this;
                require.async("common:widget/ui/fav/TagManagerPopup.js", function(t) {
                    t.render(), t.setTags(e.getTags())
                })
            },
            showPoiMarkers: function() {
                showMarkers = !0, poiModels.forEach(function(e) {
                    e.showMarker()
                }), T.cookie.remove("favmarker")
            },
            hidePoiMarkers: function() {
                showMarkers = !1, poiModels.forEach(function(e) {
                    e.hideMarker()
                }), T.cookie.set("favmarker", "hide", {
                    expires: new Date((new Date).getTime() + 2592e6)
                })
            },
            getLineModels: function() {
                return lineModels
            },
            addLineFav: function(e, t) {
                if (this.checkState()) {
                    addStat("newfav.line.add", "click", {});
                    var i;
                    0 === e.pathtype ? i = "20" : 1 === e.pathtype ? i = "21" : 2 === e.pathtype ? i = "22" : 3 === e.pathtype && (i = "23");
                    var a = "&mode=add&type=favdata",
                        n = this,
                        o = {
                            type: i,
                            plateform: 3,
                            fromapp: "百度地图",
                            extdata: e
                        };
                    this.postData(a, {
                        data: T.json.stringify(o)
                    }, function(e) {
                        t && t(e), n.sync(e)
                    })
                }
            },
            removeLineFav: function(e, t) {
                addStat("newfav.line.remove", "click", {});
                var i = this,
                    a = this.getModel(e);
                if (a) {
                    var n = "&mode=delete&type=favdata";
                    this.postData(n, {
                        data: T.json.stringify([{
                            cid: a.cid,
                            sid: a.sid,
                            action: "del"
                        }])
                    }, function(e) {
                        t && t(e), i.sync(e)
                    })
                }
            }
        };
    module.exports = favMgr
});;
define("common:widget/ui/fav/PoiModel.js", function(e, t, i) {
    function n(e, t) {
        this.isMarkerShow = t, this.data = e, this.sid = e.sid, this.uid = this.getData().sourceid, this.type = this.getData().type, this.tags = {}, this.setProperties(e), this.marker = this.draw()
    }
    var a = (e("common:widget/ui/constant/Constant.js"), e("common:widget/ui/util/util.js")),
        o = (e("common:widget/ui/constant/Constant.js"), {
            1: "",
            2: "来自iPad",
            3: "",
            4: "来自手机",
            5: "来自手机"
        });
    T.extend(n.prototype, {
        getData: function() {
            return this.data && this.data.detail && this.data.detail.data ? this.data.detail.data : {}
        },
        get: function(e) {
            return this.getData()[e] ? this.getData()[e] : {}
        },
        setProperties: function() {
            var e = this.getData(),
                t = this.get("extdata"),
                i = this.get("sourcedata");
            this.name = t.name, this.pointStr = t.geoptx + "," + t.geopty, "10" === this.type ? this.setSourceData(i) : (this.addr = t.content || i.address, this.image = void 0);
            var n = new Date;
            if (n.setTime(1e3 * e.mtime), this.date = T.date.format(n, "yyyy-MM-dd"), e.tags)
                for (var a = 0; a < e.tags.length; a++) "1" === e.tags[a].type && (this.tags[e.tags[a].indexid] = e.tags[a], this.tag = e.tags[a]);
            this.from = o[e.plateform] || ""
        },
        setSourceData: function(e) {
            this.addr = e.addr, this.image = e.ext && e.ext.detail_info ? e.ext.detail_info.image : void 0
        },
        getConfig: function() {
            return {
                commonMarker: {
                    image: "//webmap0.bdimg.com/wolfman/static/common/images/fav-icon-map_8991418.png",
                    size: new BMap.Size(13, 12),
                    offset: new BMap.Size(7, 7),
                    imageOffset: new BMap.Size(0, 0),
                    infoWindowOffset: new BMap.Size(7, 0),
                    imageSize: new BMap.Size(13, 12),
                    srcSet: {
                        "2x": "//webmap1.bdimg.com/wolfman/static/common/images/fav-icon-map2x_8fb3e32.png"
                    }
                },
                highlightMarker: {
                    image: "//webmap1.bdimg.com/wolfman/static/common/images/fav/marker_c381d88.png",
                    size: new BMap.Size(21, 30),
                    offset: new BMap.Size(9, 27),
                    imageOffset: new BMap.Size(0, 0),
                    infoWindowOffset: new BMap.Size(10, 1),
                    srcSet: {
                        "2x": "//webmap0.bdimg.com/wolfman/static/common/images/fav/markers2x_1faace0.png"
                    }
                }
            }
        },
        draw: function() {
            var e = this,
                t = this.get("extdata"),
                i = new BMap.Point(t.geoptx, t.geopty),
                n = new BMap.Marker(i, {
                    enableMassClear: !1,
                    title: e.name
                }),
                a = this.getIcon(this.getConfig().commonMarker);
            return n.setIcon(a), n.addEventListener("click", function() {
                addStat("newfav.poi.marker", "click"), e.openInfoWnd()
            }), n.addEventListener("mouseover", function() {
                n.setTop(!0, 27e7)
            }), n.addEventListener("mouseout", function() {
                n.setTop(!1)
            }), map.addOverlay(n), e.isMarkerShow || n.hide(), n
        },
        hideMarker: function() {
            this.isMarkerShow = !1, this.highLighted || this.marker.hide()
        },
        showMarker: function() {
            this.isMarkerShow = !0, this.marker.show()
        },
        getIcon: function(e) {
            return new BMap.Icon(e.image, e.size, {
                anchor: e.offset,
                imageOffset: e.imageOffset,
                infoWindowOffset: e.infoWindowOffset,
                imageSize: e.imageSize,
                srcSet: e.srcSet
            })
        },
        openInfoWnd: function() {
            var t = this,
                i = this.marker.getPoint(),
                n = {
                    fav: 1,
                    title: T.encodeHTML(t.name),
                    content: t.addr || ""
                };
            if ("10" === t.type) {
                var o = e("poidetail:widget/libs/poiDetailMgr/poiDetailMgr.js");
                o.create({
                    uid: this.uid,
                    from: "fav"
                }).catch(function() {}), t.showInfoWindow()
            } else {
                listener.trigger("fav.poi.model", "select", {
                    id: t.sid
                }), n.sid = t.sid, n.userSign = 1;
                var s = t.addr || "";
                s = s.split("<br/>");
                for (var r = 0; r < s.length; r++) s[r] = T.encodeHTML(s[r]);
                n.content = s.join("<br/>"), a.loadSearchInfo(function(e) {
                    var a = e.createSearchInfoWnd(n, {
                        x: i.lng,
                        y: i.lat,
                        cityCode: t.get("sourcedata").address_detail && t.get("sourcedata").address_detail.city_code
                    });
                    t.highlightMarker(), a.addEventListener("close", function() {
                        t.unhighlightMarker(), listener.trigger("fav.poi.model", "unselect", {
                            id: t.sid
                        })
                    }), e.openSearchInfoWndPOI(a, t.marker)
                })
            }
        },
        showInfoWindow: function() {
            var e = this;
            a.loadSearchSimpleInfo(function(t) {
                var i = t.createCommonInfoWindow({
                    name: T.encodeHTML(e.name) || ""
                }, {
                    x: e.marker.point.lng,
                    y: e.marker.point.lat,
                    cityCode: e.get("sourcedata").city_id,
                    uid: e.uid
                });
                e.highlightMarker(), i.addEventListener("close", function() {
                    e.unhighlightMarker(), listener.trigger("fav.poi.model", "unselect", {
                        id: e.sid
                    })
                }), t.openSearchInfoWndPOI(i, e.marker)
            })
        },
        openRenameInfoWnd: function() {
            var t = this;
            e.async("common:widget/ui/fav/FavRenameInfoWindow.js", function(e) {
                var i = new e(t.marker, t.sid, function() {
                    t.openInfoWnd()
                });
                setTimeout(function() {
                    t.highlightMarker()
                }, 10), map.setCenter(t.marker.point), listener.trigger("fav.poi.model", "select", {
                    id: t.sid
                }), i.show(), i.iw.addEventListener("close", function() {
                    t.unhighlightMarker(), listener.trigger("fav.poi.model", "unselect", {
                        id: t.sid
                    })
                })
            })
        },
        openRemoveInfoWnd: function() {
            var t = this;
            e.async("common:widget/ui/fav/FavRemoveInfoWindow.js", function(e) {
                var i = new e(t.marker, {
                    id: t.sid
                }, function() {
                    t.openInfoWnd()
                });
                setTimeout(function() {
                    t.highlightMarker()
                }, 10), map.setCenter(t.marker.point), listener.trigger("fav.poi.model", "select", {
                    id: t.sid
                }), i.show(), i.iw.addEventListener("close", function() {
                    t.unhighlightMarker(), listener.trigger("fav.poi.model", "unselect", {
                        id: t.sid
                    })
                })
            })
        },
        openTagInfoWnd: function() {
            var t = this;
            e.async("common:widget/ui/fav/FavTagInfoWindow.js", function(e) {
                var i = new e(t.marker, {
                    id: t.sid,
                    tag: t.tag
                }, function() {
                    t.openInfoWnd()
                });
                setTimeout(function() {
                    t.highlightMarker()
                }, 10), map.setCenter(t.marker.point), listener.trigger("fav.poi.model", "select", {
                    id: t.sid
                }), i.show(), i.iw.addEventListener("close", function() {
                    listener.trigger("fav.poi.model", "unselect", {
                        uid: t.sid
                    }), t.unhighlightMarker()
                })
            })
        },
        rename: function(e) {
            this.name = e, this.marker.setTitle(e), listener.trigger("fav.poi.model", "rename", {
                id: this.sid,
                name: e,
                uid: this.uid
            })
        },
        removeTag: function(e) {
            this.tags[e] = void 0, delete this.tags[e], this.tag = void 0;
            for (var t in this.tags) this.tag = this.tags[t]
        },
        addTag: function(e) {
            this.tags[e.indexid] = e, this.tag = e
        },
        remove: function() {
            this.highLighted ? this.removed = !0 : map.removeOverlay(this.marker)
        },
        unhighlightMarker: function() {
            this.highLighted = !1, this.removed ? map.removeOverlay(this.marker) : this.marker.setIcon(this.getIcon(this.getConfig().commonMarker)), this.isMarkerShow || this.hideMarker()
        },
        highlightMarker: function() {
            this.highLighted = !0, this.marker.setIcon(this.getIcon(this.getConfig().highlightMarker), "marker-raise")
        },
        fetch: function(e, t) {
            if (this.uid) {
                var i = "/?qt=inf&uid=" + this.uid + "&ie=utf-8&t=" + (new Date).getTime();
                T.ajax(i, {
                    dataType: "json",
                    success: function(i) {
                        return i && i.content ? void(e && e(i)) : void(t && t())
                    },
                    error: function(e) {
                        console.log("sendUidRequest qt=inf", e)
                    }
                })
            }
        },
        fill: function() {
            var e = this;
            this.fetch(function(t) {
                e.getData().sourcedata = t.content, e.setSourceData(e.get("sourcedata")), listener.trigger("fav.poi.model", "fetch", {
                    id: e.sid
                })
            })
        }
    }), i.exports = n
});;
define("common:widget/ui/fav/LineModel.js", function(e, t, a) {
    function i(e) {
        this.data = e, this.sid = e.sid, this.setData(e)
    }
    var n = e("common:widget/com/componentManager.js"),
        s = e("common:widget/ui/util/util.js"),
        o = e("common:widget/ui/config/config.js"),
        d = o.modelConfig,
        c = e("common:widget/com/IpLocation/IpLocation.js"),
        p = {
            0: "car",
            1: "bus",
            2: "walk",
            3: "bike",
            5: "car",
            6: "bus",
            7: "bus",
            9: "bus"
        },
        r = {
            0: "train",
            1: "plane"
        };
    T.extend(i.prototype, {
        getData: function() {
            return this.data && this.data.detail && this.data.detail.data ? this.data.detail.data : {}
        },
        get: function(e) {
            return this.getData()[e] ? this.getData()[e] : {}
        },
        setData: function() {
            var e = this.getData(),
                t = this.get("extdata");
            this.name = t.pathname;
            var a = new Date;
            a.setTime(1e3 * e.mtime), this.date = T.date.format(a, "yyyy-MM-dd"), this.type = p[t.pathtype], this.subtype = "bus" === this.type ? r[t.transkind] ? r[t.transkind] : "bus" : this.type
        },
        remove: function() {},
        openLine: function() {
            var e = this.data.detail.data.extdata,
                t = 2,
                a = 2,
                i = e.curcityid,
                o = e.pagenumber || 0,
                p = e.wp,
                r = {},
                y = "",
                f = "",
                u = "",
                v = "",
                m = "",
                g = "",
                l = "",
                $ = "",
                h = "",
                x = e.sfavnode,
                k = e.efavnode,
                b = x.cityid,
                w = k.cityid,
                D = x.uid,
                _ = k.uid,
                I = encodeURIComponent(x.name),
                j = encodeURIComponent(k.name),
                T = e.trafType || 0;
            if ("success" === c.status) {
                if (e.sfavnode && "我的位置" === e.sfavnode.name) {
                    var C = c.myPlace.point.split(",");
                    e.sfavnode.geoptx = C[0], e.sfavnode.geopty = C[1], e.sfavnode.cityid = c.myPlace.cityid, e.sfavnode.uid = ""
                }
                if (e.efavnode && "我的位置" === e.efavnode.name) {
                    var C = c.myPlace.point.split(",");
                    e.efavnode.geoptx = C[0], e.efavnode.geopty = C[1], e.efavnode.cityid = c.myPlace.cityid, e.efavnode.uid = ""
                }
            }
            switch (e.pathtype) {
                case 0:
                case 5:
                    var L = d.pk_dict[e.pathtype];
                    g = "nav", m = L[e.plankind].sy;
                    break;
                case 1:
                case 6:
                case 7:
                    if (g = "bt", isNaN(parseInt(e.transkind, 10))) {
                        var L = d.pk_dict[e.pathtype].favDict;
                        m = L[e.plankind] ? L[e.plankind].sy || 0 : 0, 4 == m && (m = 0, h = "[0,2,4,7,5,8,9,10,11]", T = 1), r = {
                            _index: (e.busidx || 0) + ",1,1",
                            trafType: T
                        }
                    } else $ = d.pk_dict[9][e.plankind].sy || 0, l = e.transkind, r = {
                        _index: (e.busidx || 0) + ",1,1"
                    };
                    break;
                case 2:
                    g = "walk";
                    break;
                case 3:
                    g = "cycle"
            }
            if (x.geoptx && (t = 1, u = x.geoptx + "," + x.geopty), x.uid && 0 == x.type && (t = 0), k.geoptx && (a = 1, v = k.geoptx + "," + k.geopty), k.uid && 0 == k.type && (a = 0), p && p.length > 2) {
                for (var M = 1; M < p.length - 1; M++) y += "1$$$$" + p[M].p + "$$$$+to:", f += "0 +to:";
                a = 1
            }
            w = f ? f + w : w;
            var P = {
                c: i,
                sn: t + "$$" + D + "$$" + u + "$$" + I + "$$$$$$",
                en: y + a + "$$" + _ + "$$" + v + "$$" + j + "$$$$$$",
                sy: m,
                f: h,
                pn: o,
                csy: $,
                cty: l
            };
            b && (P.sc = b, P.ec = w), ("bt" == g || "bse" == g) && (P.exptype = e.exptype || "dep", P.exptime = e.exptime || "", P.version = 5), ("nav" == g || "nse" == g) && (P.version = 4, P.mrs = 1, P.route_traffic = 1, e.routeIndex && (r._index = e.routeIndex)), ("cycle" === g || "walk" === g) && (P.version = 6, P.spath_type = 1, "cycle" === g ? P.vehicle = 0 : P.run = 0), p && p.length > 2 && (P.drag = 1);
            var R = g + "&" + s.jsonToQuery(P);
            listener.trigger("favlines.search"), n.go(R, {
                cinfo: r,
                reserveReturnCard: !0
            })
        }
    }), a.exports = i
});;
define("common:widget/ui/renderModeSwitch/renderModeSwitch.js", function(require, exports, module) {
    require.loadCss({
        content: "#renderModeSwitch{position:absolute;bottom:10px;left:-29px;height:24px;width:24px;-webkit-transition-property:width,background-color;transition-property:width,background-color;-webkit-transition-duration:.4s;transition-duration:.4s}#renderModeSwitch .render-mode-tips-button{height:24px;width:24px;cursor:pointer;position:absolute;background:url(//webmap1.bdimg.com/wolfman/static/common/images/new/render-mode-switch_4774438.png) no-repeat 0 0;background-size:39px 24px}#renderModeSwitch .black-tips{position:absolute;white-space:nowrap;color:#fff;bottom:33px;right:0;border-radius:2px;height:13px;padding:7px;padding-right:27px;background-color:rgba(0,0,0,.8);-webkit-transition-property:right,opacity;transition-property:right,opacity;-webkit-transition-duration:.4s;transition-duration:.4s;line-height:15px}#renderModeSwitch .black-tips .close-button{background:url(//webmap1.bdimg.com/wolfman/static/common/images/new/render-mode-switch_4774438.png) no-repeat 0 0;background-size:39px 24px;background-position:-24px 0;width:15px;height:15px;cursor:pointer;position:absolute;right:6px;top:6px}#renderModeSwitch .black-tips a{color:#5fa7fe;text-decoration:none}#renderModeSwitch .black-tips:after{content:'';position:absolute;top:27px;right:8px;margin-left:-6px;width:0;height:0;border-left:5px solid transparent;border-right:5px solid transparent;border-top:5px solid rgba(0,0,0,.8)}@media only screen and (-webkit-min-device-pixel-ratio:2),(-webkit-min-device-pixel-ratio:2),(min-resolution:2dppx),(min-resolution:192dpi){#renderModeSwitch .render-mode-tips-button{background-image:url(//webmap0.bdimg.com/wolfman/static/common/images/new/render-mode-switch2x_14801ba.png)}#renderModeSwitch .black-tips .close-button{background-image:url(//webmap0.bdimg.com/wolfman/static/common/images/new/render-mode-switch2x_14801ba.png)}}",
        name: "renderModeSwitch"
    });
    var storage = window.localStorage,
        renderModeSwitch = {
            init: function(e) {
                this._map = e;
                var i = this,
                    t = !1;
                storage && storage.getItem("user-render-mode") && (t = !0, alog("cus.fire", "count", "z_showtips_byuser"), this.renderAndBind()), t || "webgl" !== e.getRenderType() || (this._waitForFirstTimer = setTimeout(function() {
                    alog("cus.fire", "count", "z_showtips_firsttile"), i.renderAndBind("firsttile")
                }, 3e3), e.on("fpsdata_ready", function(t) {
                    var o = t.fps;
                    50 > o && (alog("cus.fire", "count", "z_showtips_lowfps"), i.renderAndBind("lowfps"), e.off("fpsdata_ready", arguments.callee))
                }), e.on("firsttilesloaded", function() {
                    clearTimeout(i._waitForFirstTimer)
                }))
            },
            renderAndBind: function() {
                try {
                    if (this._rendered) return;
                    this.render();
                    var e = this;
                    this.hideTimer = setTimeout(function() {
                        e.hideTips()
                    }, 5e3), this.bind(), this._rendered = !0, this._tipsVisible = !0
                } catch (i) {
                    "undefined" != typeof alog && alog("exception.fire", "catch", {
                        msg: i.message || i.description,
                        path: "common:widget/ui/renderModeSwitch/renderModeSwitch.js",
                        ln: 62
                    })
                }
            },
            render: function() {
                try {
                    var tpl = [function(_template_object) {
                            var _template_fun_array = [],
                                fn = function(__data__) {
                                    var _template_varName = "";
                                    for (var name in __data__) _template_varName += "var " + name + '=__data__["' + name + '"];';
                                    eval(_template_varName), _template_fun_array.push('<div id="renderModeSwitch">    <div id="render-mode-tips" class="black-tips">        <div class="">            ', "undefined" == typeof displayInfo ? "" : baidu.template._encodeHTML(displayInfo), '<span><a id="render-mode-switch-button">', "undefined" == typeof switchInfo ? "" : baidu.template._encodeHTML(switchInfo), '</a></span>        </div>        <div class="close-button"></div>    </div>    <div class="render-mode-tips-button" title="切换地图模式">    </div></div>'), _template_varName = null
                                }(_template_object);
                            return fn = null, _template_fun_array.join("")
                        }][0],
                        displayInfo, switchInfo;
                    "webgl" === this._map.getRenderType() ? (displayInfo = "您正在使用完整版地图，如感觉慢可", switchInfo = "切换至简化版") : (displayInfo = "您正在使用简化版地图，", switchInfo = "点击可升级至完整版"), baidu("#mapType-wrapper").append(tpl({
                        displayInfo: displayInfo,
                        switchInfo: switchInfo
                    }))
                } catch (e) {
                    "undefined" != typeof alog && alog("exception.fire", "catch", {
                        msg: e.message || e.description,
                        path: "common:widget/ui/renderModeSwitch/renderModeSwitch.js",
                        ln: 79
                    })
                }
            },
            bind: function() {
                var e = this;
                baidu(".render-mode-tips-button").on("click", function(i) {
                    try {
                        e._tipsVisible ? e.hideTips() : (e._userClicked = !0, e.showTips()), i.stopPropagation()
                    } catch (i) {
                        "undefined" != typeof alog && alog("exception.fire", "catch", {
                            msg: i.message || i.description,
                            path: "common:widget/ui/renderModeSwitch/renderModeSwitch.js",
                            ln: 91
                        })
                    }
                }), baidu("#renderModeSwitch .close-button").on("click", function(i) {
                    try {
                        e.hideTimer && clearTimeout(e.hideTimer), e._userClicked = !0, e.hideTips(), i.stopPropagation()
                    } catch (i) {
                        "undefined" != typeof alog && alog("exception.fire", "catch", {
                            msg: i.message || i.description,
                            path: "common:widget/ui/renderModeSwitch/renderModeSwitch.js",
                            ln: 97
                        })
                    }
                }), baidu("#render-mode-tips").on("mouseover", function() {
                    try {
                        e.hideTimer && (clearTimeout(e.hideTimer), e.hideTimer = null)
                    } catch (i) {
                        "undefined" != typeof alog && alog("exception.fire", "catch", {
                            msg: i.message || i.description,
                            path: "common:widget/ui/renderModeSwitch/renderModeSwitch.js",
                            ln: 103
                        })
                    }
                }), baidu("#render-mode-tips").on("mouseout", function() {
                    try {
                        e._userClicked !== !0 && (e.hideTimer = setTimeout(function() {
                            e.hideTips(), e.hideTimer = null
                        }, 5e3))
                    } catch (i) {
                        "undefined" != typeof alog && alog("exception.fire", "catch", {
                            msg: i.message || i.description,
                            path: "common:widget/ui/renderModeSwitch/renderModeSwitch.js",
                            ln: 111
                        })
                    }
                }), baidu("#render-mode-switch-button").on("click", function(i) {
                    try {
                        var t = e._map.getRenderType();
                        if ("webgl" !== t) try {
                            storage.setItem("user-render-mode", "webgl"), alog("cus.fire", "count", "z_showtips_towebgl")
                        } catch (i) {} else try {
                            storage.setItem("user-render-mode", "canvas"), alog("cus.fire", "count", "z_showtips_tocanvas")
                        } catch (i) {}
                        setTimeout(function() {
                            var e = require("common:widget/ui/mapShare/MapShare.js"),
                                i = e.getLink(null, !0);
                            window.location.href = i
                        }, 150), i.stopPropagation()
                    } catch (i) {
                        "undefined" != typeof alog && alog("exception.fire", "catch", {
                            msg: i.message || i.description,
                            path: "common:widget/ui/renderModeSwitch/renderModeSwitch.js",
                            ln: 136
                        })
                    }
                }), listener.on("com.subway", "load", function() {
                    baidu("#renderModeSwitch").hide()
                }), listener.on("com.subway", "unload", function() {
                    baidu("#renderModeSwitch").show()
                })
            },
            showTips: function() {
                baidu("#render-mode-tips").show(), this._tipsVisible = !0
            },
            hideTips: function() {
                baidu("#render-mode-tips").hide(), this._tipsVisible = !1
            }
        };
    module.exports = renderModeSwitch
});;
define("common:widget/ui/mapShare/MapShare.js", function(t, o, n) {
    function i(t) {
        for (var o in t) return 0;
        return 1
    }

    function e(t, o, n) {
        var i = "",
            e = o;
        n.width && (i = ' style="width:' + n.width + 'px"');
        var a = '<div id="mapCommonTip" class="map_cTip"' + i + '><div class="tip">' + t + "</div><button ></button></div>";
        T.g("mapCommonTip") ? T.g("mapCommonTip").style.display = "" : l.beforeEndHTML(e.getContainer(), a), T.g("mapCommonTip").style.left = parseInt(e.width) / 2 - n.width / 2 + "px", setTimeout(function() {
            p()
        }, 2e3), baidu("#mapCommonTip button").on("click", function() {
            p()
        })
    }

    function p() {
        T.g("mapCommonTip") && (T.g("mapCommonTip").style.display = "none")
    }
    var a, r, l = t("common:widget/ui/util/util.js"),
        s = t("common:widget/ui/config/config.js"),
        m = s.modelConfig,
        f = {
            SHARE_PROC_URL: "//j.map.baidu.com/",
            listIndex: null,
            mapSpotInf: null,
            mapInfo: {},
            getLink: function(t, o, n) {
                this.cbk = t || function() {}, this.getMap(), this.getList(), this.getSpotInfo(), this.getPopList(), this.getComponent(), this.getScrMode(), this.getPoiShare(), n = n || {};
                var p = this,
                    l = [];
                for (var s in p.mapInfo) null != p.mapInfo[s] && "" != p.mapInfo[s] && l.push(s + "=" + p.mapInfo[s]);
                var m = "https:" === location.protocol ? "https" : "http";
                if (p.oUrl = m + "://map.baidu.com/?newmap=1&shareurl=1&" + l.join("&"), o && !n.sms) return p.oUrl;
                var u = function() {
                        var t = f.SHARE_PROC_URL + "?url=" + encodeURIComponent(p.oUrl) + "&web=true";
                        a = !1, T.jsonp(t, function(t) {
                            a = !0, "https:" === location.protocol && t && t.url && (t.url = t.url.replace("http://", "https://")), p.cbk(t && t.url || p.oUrl)
                        }), clearTimeout(r), r = setTimeout(function() {
                            0 == a && p.cbk(p.oUrl)
                        }, 3e3)
                    },
                    c = baidu.json.parse(baidu.json.stringify(_sign.mapSign));
                if (i(c.pointInfo.list) && i(c.polylineInfo.list) && i(c.remarkInfo.list)) {
                    if (o) return t && t(p.oUrl), p.oUrl;
                    u()
                } else {
                    for (var d in c.pointInfo.list) 0 == c.pointInfo.list[d].save && delete c.pointInfo.list[d];
                    for (var d in c.remarkInfo.list) 0 == c.remarkInfo.list[d].type && delete c.remarkInfo.list[d];
                    if (i(c.pointInfo.list) && i(c.polylineInfo.list) && i(c.remarkInfo.list)) {
                        if (o) return t && t(p.oUrl), p.oUrl;
                        u()
                    } else MapSignInst.getSignLink(baidu.json.stringify(c), function(n) {
                        if (1 != n.result) return e("有不符合相关法规政策的词，请修改", map, {
                            width: 235
                        }), o ? (t && t(p.oUrl), p.oUrl) : void u();
                        var i = n.content.shareId;
                        return p.oUrl += "&mapShareId=" + i, o ? (t && t(p.oUrl), p.oUrl) : void u()
                    }, "all")
                }
            },
            getScrMode: function() {
                this.mapInfo.sc = 0
            },
            getMap: function() {
                this.mapInfo.l = map.getZoom(), this.mapInfo.tn = map.mapType, this.mapInfo.hb = map._isHybridShow ? BMAP_TYPE_HYBIRD : null;
                var t = map.getCenter();
                this.mapInfo.c = t.lng.toFixed(0) + "," + t.lat.toFixed(0), this.mapInfo.cc = map.currentCity
            },
            getComponent: function() {
                var t = window.currentComponent,
                    o = "";
                t && t.modelQuery ? o = t.modelQuery.replace(/&b=\((-?\d+)(\.\d+),(-?\d+)(\.\d+);(-?\d+)(\.\d+),(-?\d+)(\.\d+)\)/gi, "") : t && "CityIndex" == t._className && (o = "cur&wd=" + m.cityName + "&c=" + m.cityCode), this.mapInfo.s = encodeURIComponent(decodeURIComponent(o))
            },
            getList: function() {
                this.mapInfo.i = null != this.listIndex ? this.listIndex.toString().replace("|", encodeURIComponent("|")) : null
            },
            getPopList: function() {
                this.mapInfo.pi = null != this.popIndex ? this.popIndex : null
            },
            getPoiShare: function() {
                var t = location.href,
                    o = l.getParam(t);
                o && o.poiShareUid && (this.mapInfo.poiShareUid = o.poiShareUid)
            },
            setPoiShowAll: function(t) {
                this.mapInfo.poiall = t ? 1 : null
            },
            setSmSCode: function(t) {
                this.mapInfo.sms = t ? t : null
            },
            getSpotInfo: function() {
                this.mapInfo.msi = null != this.mapSpotInf ? this.mapSpotInf : null
            },
            setParam: function(t, o) {
                t && "[object String]" === Object.prototype.toString.call(t) && (o ? this.mapInfo[t] = o : delete this.mapInfo[t])
            }
        };
    n.exports = f
});;
define("common:widget/ui/toolShare/ToolShare.js", function(t, o, e) {
    var n = t("common:widget/ui/util/util.js"),
        i = (t("common:widget/com/componentManager.js"), {
            SHARE_PROC_URL: "//j.map.baidu.com/",
            long_url: "",
            keyList: {
                tsina: {
                    title: "分享到新浪微博",
                    code: 1307,
                    cbkcode: 1317
                },
                qzone: {
                    title: "分享到QQ空间",
                    code: 1306,
                    cbkcode: 1316
                }
            },
            addCbkStat: function() {},
            _procCbk: function(t) {
                this._rec = !0, "https:" === location.protocol && t && t.url && 0 !== t.url.indexOf("https") && (t.url = t.url.replace("http", "https")), this._getLinkCbk(t && t.url || this.oldUrl)
            },
            getLink: function(t, o) {
                this._getLinkCbk = o; {
                    var e = this,
                        i = "https:" === location.protocol ? "https" : "http",
                        r = this.oldUrl = i + "://map.baidu.com/?shareurl=1&" + n.jsonToQuery(t);
                    this.SHARE_PROC_URL + "?url=" + encodeURIComponent(r) + "&web=true&callback=toolShare._procCbk"
                }
                e._rec = !1, baidu.jsonp(this.SHARE_PROC_URL + "?url=" + encodeURIComponent(r) + "&web=true", function(t) {
                    e._procCbk(t)
                }), clearTimeout(e._timer), this._timer = setTimeout(function() {
                    0 == e._rec && e._getLinkCbk(r)
                }, 3e3)
            },
            open: function(o) {
                if (window.temp.linkPop) return void window.temp.linkPop.close();
                if (window.temp.detailInfoPop) return void window.temp.detailInfoPop.close();
                o = o || {
                    from: "mapshare"
                }, o.shareText = this.shareText;
                var e = {
                    title: "您可将当前地图上的内容分享给好友",
                    addDom: T(document.bogy)[0],
                    content: "",
                    height: 94,
                    width: T.browser.ie >= 8 ? 329 : 330,
                    clickClose: !1,
                    close: function() {
                        window.temp.linkPop = null, window.temp.detailInfoPop = null, listener.trigger("index.controls", "close", {
                            target: "share"
                        })
                    }
                };
                t.async("common:widget/ui/Popup/Popup.js", function(n) {
                    if ("detail_info" === o.from) var i = window.temp.detailInfoPop = new n(e);
                    else var i = window.temp.linkPop = new n(e);
                    i.render(), i.hide(), i.getDom().style.top = o.keepTraffic ? "123px" : "detail_info" === o.from ? o.top + "px" : "58px", (window.toolbarwidth || "detail_info" != o.from) && (i.getDom().style.width = window.toolbarwidth - 2 + "px"), "detail_info" === o.from ? (i.getDom().style.left = o.left + "px", i.getDom().style.width = o.width + "px") : i.getDom().style.right = "69px", t.async("common:widget/ui/SharePanel/SharePanel.js", function(t) {
                        new t({
                            dom: i.content,
                            cinfo: o
                        });
                        i.show()
                    })
                })
            },
            _open: function(t, o) {
                t = t || window.event, n.stopBubble(t), this.open("", o)
            },
            fixName: function(t) {
                return t ? "【" + t + "】" : ""
            },
            tween: function(t, o, e, n) {
                return e * ((t = t / n - 1) * t * t + 1) + o
            },
            getMInfo: function() {
                return {}
            },
            setShareText: function(t) {
                t = t || {};
                var o = "";
                for (var e in t) o = o + " " + t[e];
                this.shareText = o
            }
        });
    e.exports = i
});;
define("common:widget/ui/mapRevert/MapRevert.js", function(require, exports, module) {
    function getBound() {
        var e = map.getBounds(),
            r = function(e) {
                return 1e3 * parseInt(e / 1e3)
            };
        return r(e.minX) + "," + r(e.minY) + ";" + r(e.maxX) + "," + r(e.maxY)
    }
    var util = require("common:widget/ui/util/util.js"),
        comMgr = require("common:widget/com/componentManager.js"),
        config = require("common:widget/ui/config/config.js"),
        traffic = require("common:widget/ui/Traffic/Traffic.js"),
        signMgr = require("common:widget/ui/signMgr/signMgr.js"),
        PanoInterface = require("pano:widget/PanoInterface/PanoInterface.js"),
        modelConfig = config.modelConfig,
        indexUtil = require("common:widget/ui/indexUtil/IndexUtil.js"),
        constant = require("common:widget/ui/constant/Constant.js"),
        searchBox = require("common:widget/ui/searchBox/searchBox.js"),
        AID = require("common:widget/ui/areaCfg/areaCfg.js"),
        toast = require("common:widget/ui/toast/toast.js"),
        weather = require("common:widget/ui/Weather/Weather.js"),
        urlConfig = config.urlConfig,
        mapRevert = {
            isRevert: !1,
            revert: function() {
                var e = location.href,
                    r = util.getParam(e);
                if (r = util.extendHashParam(e, r), !r) return !1;
                if (null != r.q) {
                    var t = 0;
                    for (var a in r) t++;
                    1 == t && searchBox.setState("sole", {
                        query: decodeURIComponent(r.q)
                    })
                } else try {
                    var o = r.s || "";
                    if (o = util.getParam(decodeURIComponent("?qt=" + o)), "cur" !== o.qt && o.wd && searchBox.setState("sole", {
                            query: decodeURIComponent(o.wd)
                        }), "inf" === o.qt && o.uid) return this.revertPoiShareUid({
                        poiShareUid: o.uid
                    }), !0
                } catch (n) {}
                return r.subwayShareId && this.revertSubwayShare(r), r.mapShareId && signMgr.parseShare(r.mapShareId), r.poiShareUid ? (this.revertPoiShareUid(r), !0) : r.s ? (this.setModel(r), !0) : r.poiShareId ? (this.revertPoiShare(r), !0) : !1
            },
            setModel: function(param) {
                var me = this,
                    opts = {
                        fromUrl: !0,
                        cinfo: {
                            cityInit: 1
                        },
                        onload: function() {
                            if (param.c) {
                                var e = param.c.split(","),
                                    r = {};
                                if (2 == e.length) {
                                    {
                                        parseFloat(e[0]), parseFloat(e[1])
                                    }
                                    r = new BMap.Point(parseFloat(e[0]), parseFloat(e[1]));
                                    var t = map.getZoom();
                                    param.l && (t = param.l), map.centerAndZoom(r, parseInt(t, 10))
                                }
                            }
                            param.panoid && param.panotype && me.revertStreetView(param)
                        }
                    };
                if (null != param.l && "number" == typeof parseInt(param.l, 10) && (opts.cinfo._maplevel = parseInt(param.l)), null != param.c) {
                    var p = param.c.split(",");
                    if (2 == p.length) {
                        var lng = parseFloat(p[0]),
                            lat = parseFloat(p[1]),
                            point = new BMap.Point(p[0], p[1]);
                        opts.cinfo._centerPoint = point
                    }
                }
                var index = param.i;
                null != index && (opts.cinfo._index = index, opts.cinfo.index = index);
                var showAll = param.poiall;
                showAll && (opts.cinfo.poiall = 1);
                var smsCode = param.sms;
                smsCode && (opts.cinfo.sms = smsCode), 1 === param.tfc && traffic.setBtn(!0, !0);
                var poPindex = param.pi;
                null != poPindex && (opts.cinfo._popIndex = parseInt(poPindex)), null != param.ttype && (opts.cinfo.trafType = param.ttype);
                var popPoint = param.b;
                if (null != popPoint) {
                    var p = popPoint.split(",");
                    if (2 == p.length) {
                        var lng = parseFloat(p[0]),
                            lat = parseFloat(p[1]),
                            point = new BMap.Point(p[0], p[1]);
                        opts.cinfo._popPoint = point
                    }
                }
                param.s = param.s.replace(/%u[0-9a-zA-Z]{4}/gi, function(e) {
                    return encodeURIComponent(unescape(e))
                }), param.s.indexOf("con") > -1 && (opts.MapRevertOpts = {
                    noAddBounds: !0
                });
                var qs = [];
                try {
                    qs = decodeURIComponent(param.s).split("&")
                } catch (e) {
                    return void comMgr.load("Error")
                }
                for (var query = "", i = 0, l = qs.length; l > i; i++) {
                    var tempQ = qs[i].split("=");
                    if (0 != tempQ.length)
                        if (1 != tempQ.length) {
                            var q = tempQ.slice(1).join("");
                            ("ec" == tempQ[0] || "en" == tempQ[0]) && (q = q.replace(/\+/g, " ")), query += "&" + tempQ[0] + "=" + encodeURIComponent(decodeURIComponent(q))
                        } else query += tempQ[0]
                }
                if (query = 0 == query.indexOf("&") ? query.substring(1) : query, !query.match(/.*&c=\d{1,3}.*/)) {
                    var cc = modelConfig.cityCode;
                    if (_OLR && _OLR.index) try {
                        eval("var ccd =" + _OLR.index), cc = ccd.content.code
                    } catch (e) {
                        cc = modelConfig.cityCode
                    }
                    null == query.match(/tpl:/) && (query += "&c=" + cc)
                }!query.match(/.*&wd=/) && param.wd && (query += "&wd=" + param.wd);
                var queryType = T.trim(qs[0]);
                switch (("alamap" === param.from || "pstab" === param.from) && (query += "&provider=pc-aladin"), queryType) {
                    case "bt":
                        query = query.replace(/wd1=(.*)&/, "sn=2$$$$$$$$$$$$$1$$$$$$&"), query = query.replace(/wd2=(.*)&/, "en=2$$$$$$$$$$$$$1$$$$$$&"), query && query.indexOf("&exptype=") < 0 && (query += "&exptype=dep&exptime=&version=5");
                    case "nav":
                        query = query.replace(/wd1=(.*)&/, "sn=2$$$$$$$$$$$$$1$$$$$$&"), query = query.replace(/wd2=(.*)&/, "en=2$$$$$$$$$$$$$1$$$$$$&"), /version=/.test(query) || (query += "&version=4"), /route_traffic=/.test(query) || (query += "&route_traffic=1"), /mrs=/.test(query) || (query += /en=(.*to%3A)+(.*?)&/.test(query) ? "$mrs=0" : "&mrs=1");
                        break;
                    case "nse":
                        /version=/.test(query) || (query += "&version=4"), /route_traffic=/.test(query) || (query += "&route_traffic=1"), /mrs=/.test(query) || (query += "&mrs=1");
                        break;
                    case "s":
                        break;
                    case "cycle":
                        /version=2.0/.test(query) ? (query = query.replace("version=2.0", "version=6"), query += "&vehicle=0", query += "&spath_type=1") : /version=/.test(query) || (query += "&version=6", query += "&vehicle=0", query += "&spath_type=1");
                        break;
                    case "walk":
                        /version=2.0/.test(query) ? (query = query.replace("version=2.0", "version=6"), query += "&run=0", query += "&spath_type=1") : /version=/.test(query) || (query += "&version=6", query += "&run=0", query += "&spath_type=1")
                }
                query.match(/tpl:City/) ? opts.onload && opts.onload() : comMgr.go(query, opts)
            },
            revertStreetView: function(e) {
                var r = "",
                    t = "";
                if (e.pid ? (t = e.pid, r = e.iid || "") : "inter" === e.panotype ? r = e.panoid : t = e.panoid, e.cpinfo) {
                    var a = T.json.parse(decodeURIComponent(e.cpinfo));
                    if ($.isArray(a))
                        for (var o = 0, n = a.length; n > o; o++) a[o].name = this.xssFilter(a[o].name);
                    var i = a[0].z;
                    a[0].z = a[0].y, a[0].y = i;
                    var p = encodeURIComponent(T.json.stringify(a))
                }
                PanoInterface.showPano({
                    panoId: t,
                    panoIId: r,
                    panoType: e.panotype,
                    panoHeading: e.heading,
                    panoPitch: e.pitch,
                    panoZoom: e.l,
                    panoShareParam: e.psp,
                    cpinfo: p || e.cpinfo,
                    from: "share"
                })
            },
            xssFilter: function(e) {
                return e.replace(/[\"&'\/<>]/g, function(e) {
                    return {
                        '"': "&quot;",
                        "&": "&amp;",
                        "'": "&#39;",
                        "/": "&#47;",
                        "<": "&lt;",
                        ">": "&gt;"
                    }[e]
                })
            },
            revertPoiShare: function(e) {
                comMgr.start_event = (new Date).getTime(), comMgr.load("PoiShare", {
                    poiShareId: e.poiShareId
                }, function() {
                    var r = e.tn || e.mt;
                    map.mapType !== r && map.setMapType(map.isSupportEarth() && "B_SATELLITE_MAP" === map.mapType ? "B_EARTH_MAP" : r)
                })
            },
            revertSubwayShare: function(e) {
                var r = e.subwayShareId;
                if (r) {
                    var t = r.split(",");
                    if (2 === t.length) {
                        var a = t[0],
                            o = t[1];
                        require.async("common:widget/com/Subway/SbwMgr.js", function(e) {
                            var r = {
                                cname: a,
                                ccode: o
                            };
                            e.init(!1, r)
                        })
                    }
                }
            },
            revertPoiShareUid: function(e) {
                var r = require("poidetail:widget/libs/poiDetailMgr/poiDetailMgr.js");
                e.poiShareUid && r.create({
                    uid: e.poiShareUid
                }, {
                    withMarker: !0
                }).then(function() {}, function() {})
            },
            init: function() {
                if (!this.revert()) {
                    var e;
                    window._OLR && (e = baidu.json.parse(window._OLR.index) || {});
                    var r = util.getParam(location.href);
                    if (r = util.extendHashParam(location.href, r), r && r.panoid && r.panotype && mapRevert.revertStreetView(r), r && r.subway && "index.html" === r.subway && mapRevert.gotoSubway(), map.isFromShare) {
                        var t = map.getZoom();
                        if (4 >= t) return window.temp.map_level = t, void indexUtil.setCurCity({
                            name: "全国",
                            code: "1",
                            type: 0
                        }, {
                            from: "init"
                        });
                        var a = urlConfig.MAP_CENTER_URL + "?newmap=1&qt=cen&b=" + getBound() + "&l=" + t;
                        a += "&dtype=1", baidu.jsonp(a, function(e) {
                            e.weather && weather.add(e.weather), e && e.current_city && indexUtil.setCurCity(e.current_city, {
                                from: "init"
                            })
                        })
                    } else {
                        var o = this.getCityInfo();
                        indexUtil.setCurCity(o, {
                            from: "init"
                        })
                    }
                    searchBox.focus()
                }
            },
            getCityInfo: function() {
                var e;
                if (window._OLR && (e = baidu.json.parse(window._OLR.index) || {}, window._OLR.hot_city = e.hot_city, e.content && e.content.code)) {
                    modelConfig.defalutCityCode = e.content.code;
                    var r = e.content;
                    return {
                        name: r.cname,
                        code: r.code,
                        type: r.city_type,
                        sup: r.sup,
                        sup_bus: r.sup_bus,
                        sup_business_area: r.sup_business_area,
                        sup_lukuang: r.sup_lukuang,
                        sup_subway: r.sup_subway
                    }
                }
            },
            loadProvice: function(e) {
                var r = e.content.city_type,
                    t = "CityIndex";
                switch (r) {
                    case constant.CITY_TYPE_NATION:
                        t = "CountryIndex";
                        break;
                    case constant.CITY_TYPE_PROV:
                        t = "ProvinceIndex";
                        break;
                    default:
                        t = "AreaIndex"
                }
                comMgr.load(t, {
                    json: e,
                    cinfo: {
                        from: "init"
                    },
                    record: !1
                })
            },
            gotoSubway: function() {
                require.async("common:widget/com/Subway/SbwMgr.js", function(e) {
                    e.init()
                })
            }
        };
    module.exports = mapRevert
});;
define("common:widget/ui/sms/sms.js", function(o, n, e) {
    function t(n, e, t, i, s, u, p, a) {
        return a = a || {}, "object" == typeof t && (p = t, t = void 0), r.spop ? (r.spop.render(), c(n, e, t, i, s, u, p, a)) : o.async("common:widget/ui/Popup/Popup.js", function(o) {
            r.spop = new o(l), r.spop.addConnectDom(n), r.spop.render(), c(n, e, t, i, s, u, p, a)
        }), !1
    }

    function c(n, e, t, c, i, s, l, u) {
        u = u || {}, a(function(c) {
            o.async("common:widget/com/SMS/SMS.js", function(o) {
                new o({
                    dom: r.spop.content,
                    cinfo: {
                        infoWin: r.spop,
                        url: c.url,
                        tplUrl: c.tplUrl,
                        oldUrl: c.oldUrl,
                        curUrl: c.curUrl,
                        target: n,
                        uid: e || "",
                        type: t || 0,
                        uidType: s,
                        info: l
                    },
                    config: u
                })
            })
        }, e, t, c)
    }
    var i = o("common:widget/ui/constant/Constant.js"),
        s = (o("common:widget/ui/util/util.js"), o("common:widget/ui/mapShare/MapShare.js")),
        r = {
            config: {
                DETAIL_URL: location.protocol + "//map.baidu.com/?newmap=1&",
                NEWSEND_URL: "/ag/sms/sendnew/",
                READY_URL: location.protocol + "//map.baidu.com/ag/sms/readynew?url=",
                BMW_INFO: location.protocol + "//" + location.host + "/?qt=inf&ie=utf-8",
                BMW_DATA_URL: location.protocol + "//" + location.host + "/car/send"
            },
            spop: null
        },
        l = {
            isTitle: !1,
            content: "",
            extClass: "loginStyle",
            closeButton: '<button class="mo-close" title="关闭">&times;</button>',
            width: 508,
            height: 349,
            clickClose: !1,
            close: function() {
                T("#mapmask").remove(), s.setSmSCode(0);
                try {
                    var o = window.currentComponent;
                    o && o.cinfo.sms && (o.cinfo.sms = null)
                } catch (n) {}
            },
            free: function() {
                delete r.spop
            }
        },
        u = {
            POI: "s=inf%26uid%3D_UID_%26c%3D_CITY_%26newmap%3D1%26it%3D1",
            LINE: "s=bsl%26bsltp%3D0%26uid%3D_UID_%26c%3D_CITY_%26newmap%3D1"
        },
        p = function(o) {
            switch (parseInt(o, 10)) {
                case i.POI_TYPE_NORMAL:
                    return u.POI;
                case i.POI_TYPE_BUSSTOP:
                    return u.POI;
                case i.POI_TYPE_BUSLINE:
                    return u.LINE;
                case i.POI_TYPE_SUBSTOP:
                    return u.POI;
                case i.POI_TYPE_SUBLINE:
                    return u.LINE
            }
        },
        a = function(o, n, e, t) {
            s.getLink(function(c) {
                var i = encodeURIComponent(c),
                    l = {
                        url: c,
                        oldUrl: i
                    };
                n && "undefined" != typeof e ? (s.setSmSCode(n), l.curUrl = "&current_url=" + i) : l.curUrl = "", n && "undefined" != typeof e ? l.tplUrl = encodeURIComponent(r.config.DETAIL_URL + p(e).replace("_UID_", n).replace("_CITY_", t)) : (s.setSmSCode(n), l.tplUrl = i), o && o(l)
            }, !0, {
                sms: !0,
                uid: n
            })
        };
    r.ready = t, e.exports = r
});;
define("common:widget/ui/Traffic/Traffic.js", function(i, t, n) {
    var f = i("pano:widget/PanoUtil/PanoUtil.js");
    n.exports = {
        setHighLevel: function() {
            window.isPrint || "B_NORMAL_MAP" == map.mapType && this.setBtn(this.need2ShowTraffic())
        },
        setBtnStatus: function() {
            var i = this.need2ShowTraffic();
            this.setBtn(i)
        },
        setBtn: function(i, t) {
            var n = window,
                f = this,
                a = T("#traffic_control");
            i ? t && (f.loadTrafficCtrl(), a.addClass("active active-mark")) : (n.trafficCtrl && n.trafficCtrl.hide(), a.hide())
        },
        need2ShowTraffic: function() {
            if (window.PanoMap && window.PanoMap.isOpen || f && f.isOpen) return !1; {
                var i = map.getZoom();
                map.mapType
            }
            return !!i
        },
        exit: function(i) {
            i = i || "", this.isOpen = !1, window.trafficCtrl && window.trafficCtrl.close({
                type: i
            })
        },
        loadTrafficCtrl: function() {
            if (!window.isPrint) {
                var t = this;
                i.async(["common:widget/com/TrafficControl/TrafficControl.js"], function(i) {
                    window.trafficCtrl = window.trafficCtrl || new i, trafficCtrl.show(), trafficCtrl.open(), t.isOpen = !0
                })
            }
        }
    }
});;
define("common:widget/ui/Special/Special.js", function(a, n, e) {
    var t = a("common:widget/ui/areaCfg/areaCfg.js"),
        i = a("common:widget/ui/config/config.js"),
        c = a("common:widget/com/componentManager.js"),
        o = i.modelConfig,
        m = i.mapConfig,
        s = {
            sectionDiscount: Math.floor((new Date - Date.parse("01/01/2012")) / 864e5) + ",+",
            data: {
                preferential: {
                    title: "优惠券",
                    maxTitle: "优惠券",
                    wd: "餐饮",
                    des: "提供北京市的餐饮类优惠券分布图",
                    "北京": "beijing"
                },
                tuan: {
                    title: "团购",
                    maxTitle: "团购",
                    des: "提供北京市的美食、娱乐、生活服务、酒店旅游团购分布图",
                    url: "http://www.nuomi.com?cid=map_pc_icon",
                    sup: 0
                },
                subway: {
                    title: "地铁",
                    maxTitle: "地铁专题",
                    spTitle: "#cityName#地铁路线图",
                    des: "共有北京，上海，广州，深圳，香港、南京、成都、重庆、天津、沈阳、杭州、武汉、苏州、大连、长春、西安、昆明、佛山、哈尔滨、郑州、宁波、无锡等二十多个城市的地铁路线图",
                    url: "http://" + window.location.host + "/subways/index.html?c=",
                    "北京": "beijing",
                    "上海": "shanghai",
                    "广州": "guangzhou",
                    "深圳": "shenzhen",
                    "香港特别行政区": "hongkong",
                    "南京": "nanjing",
                    "成都": "chengdu",
                    "重庆": "chongqing",
                    "天津": "tianjin",
                    "沈阳": "shenyang",
                    "杭州": "hangzhou",
                    "武汉": "wuhan",
                    "苏州": "suzhou",
                    "大连": "dalian",
                    "长春": "changchun",
                    "西安": "xian",
                    "昆明": "kunming",
                    "佛山": "foshan",
                    "哈尔滨": "harbin",
                    "郑州": "zhengzhou",
                    "杭州": "hangzhou",
                    "长沙": "changsha",
                    "宁波": "ningbo",
                    "无锡": "wuxi"
                }
            },
            cityDataList: [{
                name: "repast",
                cnName: "餐饮"
            }, {
                name: "beauty",
                cnName: "丽人"
            }, {
                name: "caterorder",
                cnName: "餐厅订座"
            }, {
                name: "viewpoint",
                cnName: "景点"
            }, {
                name: "shopping",
                cnName: "购物"
            }, {
                name: "atm",
                cnName: "ATM"
            }, {
                name: "internet",
                cnName: "网吧"
            }, {
                name: "coffee",
                cnName: "咖啡厅"
            }, {
                name: "carpark",
                cnName: "停车场"
            }, {
                name: "market",
                cnName: "超市"
            }, {
                name: "ktv",
                cnName: "KTV"
            }, {
                name: "bank",
                cnName: "银行"
            }, {
                name: "fillingstation",
                cnName: "加油站"
            }, {
                name: "hotelbar",
                cnName: "酒吧"
            }, {
                name: "school",
                cnName: "学校"
            }, {
                name: "hospital",
                cnName: "医院"
            }, {
                name: "bath",
                cnName: "洗浴"
            }],
            getHtml: function(a) {
                a = a || {};
                var n = a.cityName || o.cityName,
                    e = a.showDescript,
                    i = a.liEvent || "",
                    c = a.from,
                    m = "",
                    l = "",
                    u = a.dataName;
                if (1 & a.sup) {
                    {
                        encodeURIComponent(n)
                    }
                    s.data.tuan.des = "提供" + n + "的美食、娱乐、生活服务、酒店旅游团购分布图", s.data.tuan.url = "http://www.nuomi.com?cid=map_pc_icon", s.data.tuan.sup = 1
                } else s.data.tuan.sup = 0;
                n = n.replace(/市$/, "");
                var d = s.data[u],
                    r = "",
                    p = "",
                    g = d.title,
                    h = d.maxTitle,
                    w = "INDEX",
                    f = "",
                    b = d.wd,
                    y = Number(/^优惠券$/.test(g));
                if ("box" == c && (g = d.maxTitle, w = "BOX"), d.url && n) {
                    "weather" != u && d[n] && (f = d[n]);
                    var N = d.url + f,
                        _ = "",
                        x = "";
                    if ("subway" == u) {
                        var C = t[n] || 131;
                        N = N + "&ccode=" + C, x = "addStat('citylistbtn', null, {'da_trd':'地铁'});", _ = ""
                    } else "tuan" == u && (x = "addStat('citylistbtn', null, {'da_trd':'团购频道'});", _ = "");
                    p = 'onclick = "' + _ + "window.open('" + N + "')\""
                } else p = "onclick = \"Special.searchWord('" + (b ? b : h) + "',{type:'" + u + "',codeStr:'" + w + "'" + (y ? ",discount:" + y : "") + '});return false;"';
                return e && (l = "<p>" + d.des + "</p>"), ("weather" == u || "lunch" == u || d[n] || "tuan" == u && s.data.tuan.sup) && (m += "preferential" == u || "tuan" == u && s.data.tuan.sup ? "tuan" == u && s.data.tuan.sup ? "<li " + i + p + ' class="city-tuan"><a ><img src="' + o.timg + '" width="48" height="49" /></a><a >团购频道</a></li>' : "<li " + i + p + ' class="li_' + u + '"><a >(' + a.dataCount + ")</a></li>" : "<li" + i + ' class="li_' + u + '"><a ' + r + p + '><img src="/wolfman/static/common/images/transparent.gif" class="' + u + '" /><b>' + g + "</b>" + l + "</a></li>"), m = m.replace(/#cityName#/g, n), {
                    html: m
                }
            },
            getSubwayHtml: function(a) {
                a = a || {};
                var n = a.cityName.replace(/市$/, ""),
                    e = a.cityCode || 131,
                    t = s.data.subway,
                    i = t[n],
                    c = "http://" + window.location.host + "/subways/index.html?c=" + i + "&ccode=" + e,
                    o = "",
                    m = 'onclick = "' + o + "window.open('" + c + "')\"",
                    l = '<li class="li_subway" data-name="地铁"><a ' + m + '><img src="/wolfman/static/common/images/transparent.gif" class="subway" /><b>地铁</b></a></li>';
                return l
            },
            searchWord: function(a, n) {
                n = n || {};
                var e = (n.type, n.codeStr, n.discount);
                if (!(a.length < 1)) {
                    var t = o.cityCode || 1,
                        i = "",
                        s = 0,
                        l = map.getBounds({
                            margins: [0, 0, 0, m.leftMargin]
                        });
                    c.go("s&wd=" + encodeURIComponent(a) + "&c=" + t + "&src=0&wd2=" + encodeURIComponent(i) + "&sug=" + s + "&l=" + Math.floor(map.getZoom()) + "&b=(" + l.minX + "," + l.minY + ";" + l.maxX + "," + l.maxY + ")" + (e ? "&pl_discount2_section=" + encodeURIComponent(this.sectionDiscount) + "&pl_data_type=cater&pl_sub_type=" + encodeURIComponent(a) : ""))
                }
            }
        };
    e.exports = window.Special = s
});;
define("common:widget/ui/Weather/Weather.js", function(t, e, i) {
    var a = t("common:widget/ui/config/config.js"),
        c = a.modelConfig,
        n = {
            active: !1,
            add: function(t) {
                var e = baidu(".weather-item"),
                    i = e.find("img").get(0),
                    a = (e.find("span.wtext").get(0), null);
                try {
                    if (a = "string" == typeof t ? baidu.json.parse(t) : t, !a || 1 == c.cityType || 0 == c.cityType) return void e.hide();
                    var n = a.temp0 || a.temp1 || "",
                        o = a.weather0 || a.weather1 || "",
                        s = a.pic01 || a.pic11 || "/wolfman/static/common/images/transparent.gif";
                    n && o ? (e.attr("title", o), e.show(), s && s.indexOf("http://s1.bdstatic.com") > -1 && (s = s.replace("http://s1.bdstatic.com", "https://ss1.bdstatic.com/5eN1bjq8AAUYm2zgoY3K")), i.src = s) : e.hide()
                } catch (r) {}
            }
        };
    i.exports = n
});;
define("common:widget/ui/AQIMgr/AQIMgr.js", function(e, n, t) {
    var o = e("common:widget/ui/constant/Constant.js"),
        i = {
            1: {
                name: "优",
                bgColor: "#6ec129"
            },
            2: {
                name: "良",
                bgColor: "#e0cf22"
            },
            3: {
                name: "轻度污染",
                bgColor: "#fd5b30"
            },
            4: {
                name: "中度污染",
                bgColor: "#e10724"
            },
            5: {
                name: "重度污染",
                bgColor: "#8f0c50"
            },
            6: {
                name: "严重污染",
                bgColor: "#410468"
            }
        },
        r = baidu("#weather_menu span.aqi-text").get(0),
        c = {
            isOpen: !1,
            active: !1,
            aqiModel: null,
            init: function() {},
            setTool: function(e) {
                if (r) {
                    var n;
                    e.current_city && e.current_city.city_type == o.CITY_TYPE_CITY ? (n = i[e.current_city.level], r.innerHTML = n.name) : r.innerHTML = ""
                }
            },
            set: function(e) {
                e && this.setTool(e)
            }
        };
    t.exports = c
});;
define("common:widget/ui/sateCityList/SateCityList.js", function(i, t, e) {
    var n = i("common:widget/ui/config/config.js"),
        o = i("common:widget/ui/areaCfg/areaCfg.js"),
        a = n.modelConfig,
        c = [],
        s = {},
        r = {},
        f = {
            cities: ["北京", "上海", "广州", "深圳", "兰州", "南京", "苏州", "沈阳", "太原", "杭州", "武汉", "石家庄", "郑州", "天津", "合肥", "西安", "重庆", "长沙", "济南", "成都", "巢湖", "阜阳", "贵阳", "惠州", "湖州", "焦作", "吉林市", "金华", "晋中", "柳州", "南充", "南通", "芜湖", "邢台", "漳州", "南宁", "汕头", "唐山", "大连", "西宁", "嘉兴", "泉州", "温州", "洛阳", "南昌", "舟山", "安阳", "涿州", "银川", "信阳", "濮阳", "新乡", "临汾", "泰州", "衡阳", "盐城", "滁州", "九江", "常德", "聊城", "珠海", "黑河", "蚌埠", "桂林", "七台河", "鸡西", "宜春", "萍乡", "吉安", "佳木斯", "加格达奇", "本溪", "牡丹江", "荆门", "孝感", "咸宁", "中山", "三明", "宁德", "福州", "酒泉", "金昌", "陇南", "庆阳", "张掖", "马鞍山", "黄山", "六安", "荆州", "襄阳", "十堰", "齐齐哈尔", "广元", "西昌", "保山", "香格里拉县", "克拉玛依", "伊宁", "丽江", "蒙自县", "楚雄", "娄底", "绍兴", "开封", "北海", "衢州", "通辽", "扬州", "镇江", "葫芦岛", "辽阳", "自贡", "阳江", "喀什", "库尔勒", "博乐", "阿勒泰", "哈密", "延安", "巴彦淖尔", "鄂尔多斯", "赤峰", "盘锦", "营口", "鄂州", "泸州", "攀枝花", "遵义", "天水", "安顺", "百色", "奉化", "伊春", "溧阳", "铜川", "昭通", "安康", "张家界", "曲靖", "汕尾", "梧州", "长治", "扬中", "梅州", "莱芜", "河源", "揭阳", "大同", "诸暨", "上虞", "东阳", "林芝", "景洪", "济宁", "朔州", "长葛", "松原", "玉溪", "新沂", "哈尔滨", "包头", "青岛", "即墨", "张家口", "启东", "临沂", "景德镇", "佛山", "乐山", "香港特别行政区", "龙岩", "平安县", "商洛", "德令哈", "六盘水", "锦州", "汉中", "宣城", "郴州", "南平", "眉山", "双鸭山", "平凉", "周口", "吕梁", "丽水", "广安", "怀化", "潮州", "保定", "莆田", "嘉峪关", "朝阳", "烟台", "黄冈", "临安", "宿迁", "安庆", "巴中", "滨州", "亳州", "昌吉", "长春", "承德", "池州", "慈溪", "从化", "大理", "大庆", "大冶", "德州", "定西", "东莞", "东营", "抚顺", "阜新", "噶尔县城", "固原", "贵港", "海门", "合作", "菏泽", "鹤岗", "黄骅", "黄石", "江门", "江阴", "靖江", "凯里", "昆明", "拉萨", "廊坊", "连云港", "临沧", "临海", "内江", "宁波", "彭州", "平顶山", "普洱", "秦皇岛", "清远", "三河", "三亚", "商丘", "韶关", "邵阳", "中卫", "石嘴山", "四平", "遂宁", "台州", "太仓", "通化", "铜陵", "威海", "渭南", "乌海", "乌鲁木齐", "吴忠", "武威", "厦门", "徐州", "宣化", "阳泉", "宜宾", "永州", "余姚", "玉林", "湛江", "淄博", "上饶", "宜兴", "临夏回族自治州", "宿州", "德阳", "淮南", "随州", "新余", "榆林", "瑞安", "淮安", "运城", "茂名", "增城", "雅安", "盖州", "泰兴", "沙河", "鹤壁", "南阳", "泰安", "常州", "无锡", "呼和浩特", "沧州", "呼伦贝尔", "抚州", "锡林浩特", "绥化", "丹东", "东台", "辽源", "白银", "三门峡", "海晏县", "资阳", "许昌", "塔城", "衡水", "恩施", "株洲", "晋城", "丹阳", "金坛", "潍坊", "日照", "延吉", "莱西", "招远", "岳阳", "忻州", "钦州", "云浮", "句容", "大丰", "赣州", "枣庄", "宜昌", "绵阳", "白城", "宝鸡", "乌兰察布", "阿拉善左旗", "吐鲁番", "吐鲁番地区", "邯郸", "肇庆", "海口", "澳门特别行政区", "鞍山", "阿坝藏族羌族自治州", "阿坝", "湘潭", "咸阳", "汉中", "东营", "仪征"],
            special: {
                "涿州": 2234,
                "西昌": 684,
                "香格里拉县": 1080,
                "伊宁": 767,
                "蒙自县": 894,
                "楚雄": 105,
                "喀什": 793,
                "库尔勒": 736,
                "博乐": 772,
                "阿勒泰": 783,
                "哈密": 985,
                "奉化": 2833,
                "溧阳": 1747,
                "扬中": 2820,
                "诸暨": 2708,
                "上虞": 1467,
                "东阳": 1472,
                "林芝": 813,
                "景洪": 901,
                "长葛": 1262,
                "新沂": 2421,
                "即墨": 2181,
                "启东": 1508,
                "平安县": 578,
                "德令哈": 992,
                "临安": 1878,
                "昌吉": 93,
                "慈溪": 1879,
                "从化": 1585,
                "大理": 919,
                "大冶": 1291,
                "噶尔县城": 311,
                "海门": 2580,
                "合作": 386,
                "黄骅": 2262,
                "江阴": 2819,
                "靖江": 1333,
                "凯里": 2025,
                "临海": 1460,
                "彭州": 617,
                "三河": 2721,
                "太仓": 1934,
                "宣化": 2361,
                "余姚": 2215,
                "宜兴": 1336,
                "瑞安": 1882,
                "增城": 2319,
                "盖州": 1369,
                "泰兴": 2894,
                "沙河": 1667,
                "锡林浩特": 550,
                "绥化": 44,
                "东台": 1739,
                "海晏县": 571,
                "丹阳": 1337,
                "金坛": 2118,
                "延吉": 495,
                "莱西": 1836,
                "招远": 2692,
                "句容": 1322,
                "大丰": 2108,
                "乌兰察布": 168,
                "阿拉善左旗": 2883,
                "吐鲁番": 744,
                "仪征": 2424,
                "阿坝": 1070
            }
        },
        g = function() {
            c = f.cities, s = f.special;
            for (var i = 0, t = c.length; t > i; i++) {
                var e = c[i];
                o[e] ? r[o[e]] = e : s[e] && (r[s[e]] = e)
            }
        };
    e.exports = {
        isSateMapSupportCity: function(i) {
            return 0 == c.length && g(), a.cityType < 2 ? !0 : (i = parseInt(i, 10), i && r[i] ? !0 : !1)
        }
    }
});;
define("common:widget/ui/CMSUtil/cmsControl.js", function(require, exports, module) {
    var config = require("common:widget/ui/config/config.js"),
        MapConfig = config.mapConfig,
        CmsControl = {
            getPc2MoStr: function(type) {
                var json = _OLR ? baidu.json.parse(_OLR.index) || {} : {},
                    compileStr = "",
                    imgMap = {
                        bus: "banner_bus",
                        nav: "banner_driving",
                        poi: "banner_poi"
                    },
                    cnMap = {
                        bus: "公交",
                        nav: "驾车",
                        poi: "POI"
                    },
                    imgStr = imgMap[type] ? imgMap[type] : "",
                    imgUrl = "",
                    template = "",
                    cn = cnMap[type] ? cnMap[type] : "";
                return json.mo && json.mo.data && ("city" == type ? json.mo.data.banner_home && (imgUrl = MapConfig.host(json.mo.data.banner_home), template = [function(_template_object) {
                    var _template_fun_array = [],
                        fn = function(__data__) {
                            var _template_varName = "";
                            for (var name in __data__) _template_varName += "var " + name + '=__data__["' + name + '"];';
                            eval(_template_varName), _template_fun_array.push('<div class="addrBottomImg" ><a onclick="PcToMobile.open(\'IMG\', \'城市推广图片\');return false;" ><img src="', "undefined" == typeof img_url ? "" : img_url, '" width="304" height="100" /></a>    <a onclick="PcToMobile.open(\'BTN\', \'城市推广安卓按钮\', {qudao: \'1009177q\'});" class="pc2MoAndriod" href="https://newclient.map.baidu.com/client/mapappdownload?app=map&qudao=1009177q" target="andriodApk" title="点击将安装包下载到电脑，通过数据线安装到手机"></a>    <a onclick="PcToMobile.open(\'BTN\', \'城市推广ios按钮\');" class="pc2MoIphone" href="http://itunes.apple.com/cn/app/id452186370?ls=1&mt=8" title="点击前往苹果官方商店下载" target="_blank"></a></div>'), _template_varName = null
                        }(_template_object);
                    return fn = null, _template_fun_array.join("")
                }][0], compileStr = template({
                    img_url: imgUrl
                })) : imgStr && json.mo.data[imgStr] && (imgUrl = MapConfig.host(json.mo.data[imgStr]), template = [function(_template_object) {
                    var _template_fun_array = [],
                        fn = function(__data__) {
                            var _template_varName = "";
                            for (var name in __data__) _template_varName += "var " + name + '=__data__["' + name + '"];';
                            eval(_template_varName), _template_fun_array.push('<a onclick="addStat(&#39;downloadapp.infowin.searchresultpromote&#39;);PcToMobile.open(&#39;IMG&#39;, &#39;', "undefined" == typeof log ? "" : log, '推广图片&#39;);" href="javascript:void(0);">    <img src="', "undefined" == typeof img_url ? "" : img_url, '" width="304" height="100"/></a><a class="pc2MoAndriodSearch" onclick="addStat(&#39;downloadappsucess.infowin.android&#39;);PcToMobile.open(&#39;BTN&#39;, &#39;', "undefined" == typeof log ? "" : log, '安卓按钮&#39;, {qudao: &#39;1009177q&#39;});" href="https://newclient.map.baidu.com/client/mapappdownload?app=map&qudao=1009177q"  target="andriodApk" title="点击将安装包下载到电脑，通过数据线安装到手机"></a><a class="pc2MoIphoneSearch" onclick="addStat(&#39;downloadappsucess.infowin.ios&#39;);PcToMobile.open(&#39;BTN&#39;, &#39;', "undefined" == typeof log ? "" : log, 'ios按钮&#39;);" href="http://itunes.apple.com/cn/app/id452186370?ls=1&mt=8" title="点击前往苹果官方商店下载" target="_blank"></a>'), _template_varName = null
                        }(_template_object);
                    return fn = null, _template_fun_array.join("")
                }][0], compileStr = template({
                    img_url: imgUrl,
                    log: cn
                }))), compileStr
            }
        };
    module.exports = CmsControl
});;
define("common:widget/ui/throughpoint/tpUtil.js", function(e, t, n) {
    function i() {
        T.lang.Class.call(this), this.markers = []
    }
    var o = e("common:widget/ui/util/util.js"),
        r = e("common:widget/ui/constant/Constant.js");
    T.lang.inherits(i, T.lang.Class, "TpUtil"), T.object.extend(i.prototype, {
        getIconByIndex: function(e) {
            return new BMap.Icon("//webmap0.bdimg.com/wolfman/static/common/images/markers_new2_7621a9c.png", new BMap.Size(31, 42), {
                imageOffset: new BMap.Size(269, 42 * e),
                offset: new BMap.Size(15, 42),
                imageSize: new BMap.Size(r.A_J_MARKER_IMG_NEW_WIDTH, r.A_J_MARKER_IMG_NEW_HEIGHT),
                srcSet: r.A_J_MARKER_IMG_NEW2X_SRCSET
            })
        },
        addTpMarker: function(e, t, n, i, r) {
            var a = this,
                m = this.getIconByIndex(t),
                s = (baidu.encodeHTML(e.n), o.getPoiPoint(e.p)),
                c = new BMap.Marker(s, {
                    icon: m,
                    startAnimation: r
                });
            return c.__index = t, n.addOverlay(c), c.enableDragging(), c.setTop(!0, 3e8), i && (c.addEventListener("mouseover", function(e) {
                o.stopBubble(e), a.getRemoveIconInMap(this, t), c.rm && a.clearRmTimeout(c.rm)
            }), c.addEventListener("mouseout", function() {
                c.rm && a.hideRemoveIconInMap(c.rm)
            }), c.addEventListener("dragend", function() {
                c.rm && a.hideRemoveIconInMap(c.rm)
            })), this.markers.push(c), c
        },
        getRemoveIconInMap: function(e) {
            var t = this;
            return e.rm = new BMap.Label("<div style='position:relative;'><div id='tppoint_remove_icon' class='tppoint_remove_icon' title='删除途经点'></div></div>", {
                offset: {
                    width: 30,
                    height: -45
                }
            }), e.setLabel(e.rm), e.rm.setStyle({
                zIndex: 25
            }), e.rm.addEventListener("mouseover", function() {
                t.clearRmTimeout(e.rm)
            }), e.rm.addEventListener("mouseout", function() {
                t.hideRemoveIconInMap(e.rm)
            }), e.rm.addEventListener("click", function() {
                t.removeTp(e.__index + 1)
            }), e.rm
        },
        hideRemoveIconInMap: function(e) {
            this.clearRmTimeout(e), e.hideTimeout = setTimeout(function() {
                map.removeOverlay(e)
            }, 500)
        },
        clearRmTimeout: function(e) {
            e && e.hideTimeout && (clearTimeout(e.hideTimeout), e.hideTimeout = null)
        },
        getTPointQueryParam: function(e) {
            var t = 2,
                n = "",
                i = "",
                o = "",
                r = "0",
                a = "",
                m = "",
                s = "1";
            return e.pt && (t = 1, i = e.pt, e.uid && (t = 2, n = e.uid)), e.wd && (o = encodeURIComponent(e.wd)), e._wd2 && (r = "1", a = encodeURIComponent(e._wd2)), t + "$$" + n + "$$" + i + "$$" + o + "$$" + r + "$$" + a + "$$" + m + "$$" + s + "$$ to:"
        },
        removeTp: function(e) {
            var t = this.markers.splice(e - 1, 1);
            t.length && (map.removeOverlay(t[0]), this.refreshMarkers()), this.dispatchEvent("tpremove", {
                index: e - 1,
                isTpSure: !!t.length
            }), addStat("navscheme.navscheme.removetp", "click", {})
        },
        refreshMarkers: function() {
            for (var e = 0; e < this.markers.length; e++) this.markers[e].__index = e, this.markers[e].setIcon(this.getIconByIndex(e))
        },
        clearMarkers: function() {
            this.markers = []
        }
    }), n.exports = new i
});;
define("common:widget/com/Subway/SbwMgr.js", function(e, n, o) {
    var t = e("common:widget/ui/config/config.js"),
        a = t.modelConfig,
        s = e("common:widget/ui/searchBox/searchBox.js"),
        c = e("common:widget/com/Subway/subwayCfg.js"),
        i = "",
        u = {
            fromSole: !1,
            loaded: !1,
            inited: !1,
            init: function(n, o, t) {
                if (o && o.cname && o.ccode)
                    for (var s = o.cname, m = 0, r = c.subConfig.length; r > m; m++)
                        if (c.subConfig[m].cename === s) {
                            o.cname = c.subConfig[m].cname;
                            break
                        }
                this.fromSole = n;
                var d = o || {
                    ccode: a.cityCode,
                    cname: a.cityName
                };
                u.load({
                    cInfo: d,
                    lineQuery: i
                }), e.async(["common:widget/ui/urlManager/urlManager.js"], function(e) {
                    t || e.setFeature("subway", d.cname, void 0, {
                        cname: d.cname,
                        ccode: d.ccode
                    }), e.setTitle(d.cname + "地铁图")
                }), u.inited || (listener.on("com.subway", "zindexchange", function() {
                    u.loaded = !1, T.g("sbw_map").style.zIndex = -1
                }), listener.on("com.subway", "linequery", function(e, n) {
                    i = n.req
                }), listener.on("com.subway", "citychange", function(n, o) {
                    u.sbwInst && u.loaded && (u.sbwInst.unload(), u.sbwInst.load({
                        cInfo: o.cInfo
                    })), e.async(["common:widget/ui/urlManager/urlManager.js"], function(e) {
                        e.setFeature("subway", o.cInfo.cname, void 0, o.cInfo), e.setTitle(o.cInfo.cname + "地铁图")
                    })
                }), u.inited = !0), T("#map-operate").hide()
            },
            load: function(n) {
                n = n || {}, listener.trigger("com.subway", "load"), s.setState("metro").then(function() {
                    u.sbwInst ? (u.loaded = !0, u.sbwInst.load(n), s.setState("metro", {
                        sbwInst: u.sbwInst
                    })) : e.async("common:widget/com/Subway/Subway.js", function(e) {
                        u.loaded = !0, u.sbwInst = new e(n), u.sbwInst.load(), s.setState("metro", {
                            sbwInst: u.sbwInst
                        }), listener.trigger("com.subway", "load")
                    })
                })
            },
            unload: function(n) {
                listener.trigger("com.subway", "unload"), u.sbwInst && (u.loaded = !1, u.sbwInst.unload(), s.setState(this.fromSole ? "sole" : "route")), T("#map-operate").show(), e.async(["common:widget/ui/urlManager/urlManager.js"], function(e) {
                    n || (e.setFeature(), e.setTitle())
                })
            }
        };
    o.exports = u
});;
define("common:widget/search/filters/SearchFilter/FilterConfig.js", function(e, a, n) {
    var o = {
            cater: {
                name: "cater",
                cn_name: "餐馆"
            },
            hotel: {
                name: "hotel",
                cn_name: "酒店"
            },
            hospital: {
                name: "hospital",
                cn_name: "医院"
            },
            scope: {
                name: "scope",
                cn_name: "景点",
                sTag: {}
            },
            beauty: {
                name: "beauty",
                cn_name: "丽人"
            },
            life: {
                name: "life",
                cn_name: "休闲娱乐"
            },
            shopping: {
                name: "shopping",
                cn_name: "超市"
            },
            bank: {
                name: "bank",
                cn_name: "银行"
            }
        },
        t = {
            "data_type,0": "默认排序",
            "total_score,0": "按好评排序",
            "overall_rating,0": "按评分排序",
            "hot_value,0": "按人气排序",
            "price,1": "价格低到高",
            "price,0": "价格高到低",
            "level,1": "等级低到高",
            "level,0": "等级高到低",
            "comment_num,0": "评论数多到少"
        },
        c = {
            premium: "pl_discount2_section",
            groupon: "pl_groupon_section",
            book: "pl_cater_book_pc_section"
        },
        i = /^(hotel|cater|scope|hospital|life|education|enterprise|shopping|beauty|bank)$/,
        p = /^(cater|life|beauty)$/,
        l = /^(cater|hospital|life|beauty)$/,
        r = /^(cater|scope)$/,
        s = /^(hotel|cater|scope|beauty|shopping|life)$/,
        m = /电影院|影院|剧场|影城|剧院/g;
    n.exports = {
        placeData: o,
        filterMap: c,
        sortNameMap: t,
        hasFilterReg: i,
        hasPremiumReg: p,
        hasGrouponReg: l,
        hasBookReg: r,
        hasSortReg: s,
        movieReg: m
    }
});;
define("common:widget/search/SearchUtil.js", function(e, t, o) {
    var n = e("common:widget/ui/sateCityList/SateCityList.js"),
        c = e("common:widget/ui/config/config.js"),
        r = (c.mapConfig, c.modelConfig, {
            placeRe: /^(hotel|cater|hospital|house|life|education|enterprise|scope|shopping|beauty)$/,
            isCater: function(e) {
                return e.ext && /cater/.test(e.ext.src_name)
            },
            isHouse: function(e) {
                return e.ext && /house/.test(e.ext.src_name)
            },
            isHotel: function(e) {
                return e.ext && /hotel/.test(e.ext.src_name)
            },
            isScenery: function(e) {
                return e.ext && /scope/.test(e.ext.src_name)
            },
            isMovie: function(e) {
                return e.ext && "090300" == e.new_catalog_id
            },
            getTicketSection: function(e) {
                var t = "0-+" == e.d_ticket_book_flag_section ? "0,+" : e.d_ticket_book_flag_section;
                return t
            },
            getMovieSection: function(e) {
                var t = "0-+" == e.d_ticket_book_flag_section ? "0,+" : e.d_ticket_book_flag_section;
                return t
            },
            getBizCount: function(e) {
                for (var t = 0, o = 0, n = e.length; n > o; o++) 1 === e[o].biz_type && t++;
                return t
            },
            changeMap: function(e) {
                var t = map.mapType;
                t != BMAP_NORMAL_MAP && map.mapType === BMAP_SATELLITE_MAP && (n.isSateMapSupportCity(e) || map.setMapType(BMAP_NORMAL_MAP))
            },
            returnLType: function(e) {
                var t = [
                        [0, 2, 3, 4, 5, 6, 7, 9, 10, 11],
                        [1, 12, 13, 14],
                        [8]
                    ],
                    o = t.length;
                for (i = 0; o > i; i++) {
                    var n = t[i];
                    for (j = 0; j < n.length; j++) {
                        var c = n[j];
                        if (c == e) return i
                    }
                }
            },
            sendSateSuggestQuery: function(e, t) {
                map.setMapType(BMAP_NORMAL_MAP), comMgr.go("con&contp=0&wd=" + encodeURIComponent(e) + "&pn=0&c=" + t + "&check_sate=0")
            },
            setTop: function(e, t, o, n) {
                return e && e.setTop ? (n = n || {}, t && !e._isTop ? (e._isTop = !0, void(o ? e.setTop(!0, 1000100) : n.isSon ? e.setTop(!0, 1000101) : e.setTop(!0))) : void(t || (e._isTop = null, e.setTop(!1)))) : void 0
            }
        });
    o.exports = r
});;
define("common:widget/search/SearchUrlParam.js", function(e, t, o) {
    var a = e("common:widget/search/SearchUtil.js"),
        r = e("common:widget/search/filters/SearchFilter/FilterConfig.js"),
        s = r.placeData,
        _ = r.movieReg,
        c = {},
        n = "pl_",
        i = {
            cater: {},
            hotel: {},
            movie: {},
            scope: {},
            bank: {},
            life: {},
            shopping: {},
            hospital: {},
            beauty: {},
            urlParam: {},
            getParam: function(e) {
                var t;
                return t = 0 === e.indexOf(n) ? c[e] || "" : c[n + e] || ""
            },
            setParam: function(e, t) {
                0 === e.indexOf(n) ? c[e] = t : c[n + e] = t
            },
            setParams: function(e) {
                for (var t in e) e.hasOwnProperty(t) && null !== e[t] && this.setParam(t, e[t])
            },
            removeParam: function(e) {
                0 === e.indexOf(n) ? (c[e] = null, delete c[e]) : (c[n + e] = null, delete c[n + e])
            },
            getParams: function() {
                return c
            },
            clearParams: function() {
                for (var e in c) c.hasOwnProperty(e) && this.removeParam(e)
            },
            getUrlParamString: function(e) {
                var e = e || c,
                    t = [];
                for (var o in e) e.hasOwnProperty(o) && t.push("&" + o + "=" + encodeURIComponent(e[o]));
                return t.join("")
            },
            setPlaceParams: function(e) {
                var t = e.place_info,
                    o = e.place_param,
                    r = (e.result.wd || "", t.d_data_type),
                    _ = t.d_sub_type || "",
                    c = "",
                    n = "",
                    i = t.d_price_section.replace("-", ","),
                    p = t.d_discount2_section.replace("-", ","),
                    l = t.d_groupon_section.replace("-", ","),
                    d = t.d_cater_book_pc_section.replace("-", ","),
                    u = t.d_hotel_book_pc_section.replace("-", ","),
                    m = a.getTicketSection(t);
                return s[r] ? ("hotel" == r ? c = "default" : /^(cater|life|beauty)$/.test(r) && (c = "data_type"), t.d_sort_type && (c = t.d_sort_type), o && o[0].sort_rule ? n = e.place_param[0].sort_rule : t.d_sort_rule && (n = t.d_sort_rule), this.setParams({
                    data_type: r,
                    sub_type: _,
                    price_section: i,
                    sort_type: c,
                    sort_rule: n,
                    discount2_section: p,
                    groupon_section: l,
                    cater_book_pc_section: d,
                    hotel_book_pc_section: u,
                    ticket_book_flag_section: m,
                    movie_book_section: a.getMovieSection(t),
                    business_type: t.d_business_type,
                    business_id: t.d_business_id
                }), void this.setBusinessParams(e, r, _)) : ""
            },
            setBusinessParams: function(e, t, o) {
                var r = e.place_info,
                    s = (e.place_param, e.result.wd || ""),
                    n = r.d_cater_book_pc_section.replace("-", ","),
                    p = r.d_hotel_book_pc_section.replace("-", ","),
                    l = a.getTicketSection(r);
                switch (i[t] = T.extend({
                    wd: s,
                    pl_data_type: t,
                    pl_sub_type: o
                }, c), t) {
                    case "cater":
                        i[t] = T.extend({
                            pl_cater_book_pc_section: n
                        }, c);
                        break;
                    case "hotel":
                        i[t] = T.extend({
                            pl_hotel_book_pc_section: p
                        }, c);
                        break;
                    case "scope":
                        i[t] = T.extend({
                            pl_ticket_book_flag_section: l,
                            pl_free_section: "0,+"
                        }, c);
                        break;
                    case "life":
                        r.d_sub_type && r.d_sub_type.match(_) && (i[t] = T.extend({
                            pl_movie_book_section: a.getMovieSection(r)
                        }, c))
                }
            }
        };
    o.exports = i
});;
define("common:widget/ui/ui3Tools/ui3Tools.js", function(require, exports, module) {
    function allControlsBundle(i) {
        this._map = i.map || map
    }
    var signMgr = require("common:widget/ui/signMgr/signMgr.js"),
        constant = require("common:widget/ui/constant/Constant.js"),
        config = require("common:widget/ui/config/config.js"),
        weather = require("common:widget/ui/Weather/Weather.js"),
        mapTypeTab = require("common:widget/ui/mapTypeTab/mapTypeTab.js"),
        renderModeSwitch = require("common:widget/ui/renderModeSwitch/renderModeSwitch.js"),
        modelConfig = config.modelConfig,
        allCitys = [{
            id: 23,
            name: "安徽",
            visiable: 1,
            letter: "A"
        }, {
            id: 127,
            name: "合肥",
            visiable: 1,
            letter: ""
        }, {
            id: 131,
            name: "北京",
            visiable: 1,
            letter: "B"
        }, {
            id: 132,
            name: "重庆",
            visiable: 1,
            letter: "C"
        }, {
            id: 16,
            name: "福建",
            visiable: 1,
            letter: "F"
        }, {
            id: 300,
            name: "福州",
            visiable: 1,
            letter: ""
        }, {
            id: 194,
            name: "厦门",
            visiable: 1,
            letter: ""
        }, {
            id: 134,
            name: "泉州",
            visiable: 1,
            letter: ""
        }, {
            id: 6,
            name: "甘肃",
            visiable: 1,
            letter: "G"
        }, {
            id: 36,
            name: "兰州",
            visiable: 1,
            letter: ""
        }, {
            id: 7,
            name: "广东",
            visiable: 1,
            letter: "G"
        }, {
            id: 257,
            name: "广州",
            visiable: 1,
            letter: ""
        }, {
            id: 340,
            name: "深圳",
            visiable: 1,
            letter: ""
        }, {
            id: 303,
            name: "汕头",
            visiable: 1,
            letter: ""
        }, {
            id: 138,
            name: "佛山",
            visiable: 1,
            letter: ""
        }, {
            id: 137,
            name: "韶关",
            visiable: 1,
            letter: ""
        }, {
            id: 198,
            name: "湛江",
            visiable: 1,
            letter: ""
        }, {
            id: 338,
            name: "肇庆",
            visiable: 1,
            letter: ""
        }, {
            id: 302,
            name: "江门",
            visiable: 1,
            letter: ""
        }, {
            id: 139,
            name: "茂名",
            visiable: 1,
            letter: ""
        }, {
            id: 301,
            name: "惠州",
            visiable: 1,
            letter: ""
        }, {
            id: 141,
            name: "梅州",
            visiable: 1,
            letter: ""
        }, {
            id: 200,
            name: "河源",
            visiable: 1,
            letter: ""
        }, {
            id: 199,
            name: "阳江",
            visiable: 1,
            letter: ""
        }, {
            id: 197,
            name: "清远",
            visiable: 1,
            letter: ""
        }, {
            id: 119,
            name: "东莞",
            visiable: 1,
            letter: ""
        }, {
            id: 187,
            name: "中山",
            visiable: 1,
            letter: ""
        }, {
            id: 201,
            name: "潮州",
            visiable: 1,
            letter: ""
        }, {
            id: 259,
            name: "揭阳",
            visiable: 1,
            letter: ""
        }, {
            id: 258,
            name: "云浮",
            visiable: 1,
            letter: ""
        }, {
            id: 17,
            name: "广西壮族自治区",
            visiable: 1,
            letter: "G"
        }, {
            id: 261,
            name: "南宁",
            visiable: 1,
            letter: ""
        }, {
            id: 305,
            name: "柳州",
            visiable: 1,
            letter: ""
        }, {
            id: 142,
            name: "桂林",
            visiable: 1,
            letter: ""
        }, {
            id: 341,
            name: "贵港",
            visiable: 1,
            letter: ""
        }, {
            id: 361,
            name: "玉林",
            visiable: 1,
            letter: ""
        }, {
            id: 24,
            name: "贵州",
            visiable: 1,
            letter: "G"
        }, {
            id: 146,
            name: "贵阳",
            visiable: 1,
            letter: ""
        }, {
            id: 262,
            name: "遵义",
            visiable: 1,
            letter: ""
        }, {
            id: 2,
            name: "黑龙江",
            visiable: 1,
            letter: "H"
        }, {
            id: 48,
            name: "哈尔滨",
            visiable: 1,
            letter: ""
        }, {
            id: 15,
            name: "湖北",
            visiable: 1,
            letter: "H"
        }, {
            id: 218,
            name: "武汉",
            visiable: 1,
            letter: ""
        }, {
            id: 21,
            name: "海南",
            visiable: 1,
            letter: "H"
        }, {
            id: 125,
            name: "海口",
            visiable: 1,
            letter: ""
        }, {
            id: 121,
            name: "三亚",
            visiable: 1,
            letter: ""
        }, {
            id: 25,
            name: "河北",
            visiable: 1,
            letter: "H"
        }, {
            id: 150,
            name: "石家庄",
            visiable: 1,
            letter: ""
        }, {
            id: 265,
            name: "唐山",
            visiable: 1,
            letter: ""
        }, {
            id: 148,
            name: "秦皇岛",
            visiable: 1,
            letter: ""
        }, {
            id: 151,
            name: "邯郸",
            visiable: 1,
            letter: ""
        }, {
            id: 266,
            name: "邢台",
            visiable: 1,
            letter: ""
        }, {
            id: 307,
            name: "保定",
            visiable: 1,
            letter: ""
        }, {
            id: 149,
            name: "沧州",
            visiable: 1,
            letter: ""
        }, {
            id: 191,
            name: "廊坊",
            visiable: 1,
            letter: ""
        }, {
            id: 208,
            name: "衡水",
            visiable: 1,
            letter: ""
        }, {
            id: 26,
            name: "湖南",
            visiable: 1,
            letter: "H"
        }, {
            id: 158,
            name: "长沙",
            visiable: 1,
            letter: ""
        }, {
            id: 30,
            name: "河南",
            visiable: 1,
            letter: "H"
        }, {
            id: 268,
            name: "郑州",
            visiable: 1,
            letter: ""
        }, {
            id: 153,
            name: "洛阳",
            visiable: 1,
            letter: ""
        }, {
            id: 267,
            name: "安阳",
            visiable: 1,
            letter: ""
        }, {
            id: 152,
            name: "新乡",
            visiable: 1,
            letter: ""
        }, {
            id: 154,
            name: "商丘",
            visiable: 1,
            letter: ""
        }, {
            id: 308,
            name: "周口",
            visiable: 1,
            letter: ""
        }, {
            id: 309,
            name: "南阳",
            visiable: 1,
            letter: ""
        }, {
            id: 9,
            name: "吉林",
            visiable: 1,
            letter: "J"
        }, {
            id: 53,
            name: "长春",
            visiable: 1,
            letter: ""
        }, {
            id: 54,
            name: "延边朝鲜族自治州",
            visiable: 1,
            letter: ""
        }, {
            id: 18,
            name: "江苏",
            visiable: 1,
            letter: "J"
        }, {
            id: 315,
            name: "南京",
            visiable: 1,
            letter: ""
        }, {
            id: 317,
            name: "无锡",
            visiable: 1,
            letter: ""
        }, {
            id: 316,
            name: "徐州",
            visiable: 1,
            letter: ""
        }, {
            id: 348,
            name: "常州",
            visiable: 1,
            letter: ""
        }, {
            id: 224,
            name: "苏州",
            visiable: 1,
            letter: ""
        }, {
            id: 161,
            name: "南通",
            visiable: 1,
            letter: ""
        }, {
            id: 346,
            name: "扬州",
            visiable: 1,
            letter: ""
        }, {
            id: 31,
            name: "江西",
            visiable: 1,
            letter: "J"
        }, {
            id: 163,
            name: "南昌",
            visiable: 1,
            letter: ""
        }, {
            id: 365,
            name: "赣州",
            visiable: 1,
            letter: ""
        }, {
            id: 19,
            name: "辽宁",
            visiable: 1,
            letter: "L"
        }, {
            id: 58,
            name: "沈阳",
            visiable: 1,
            letter: ""
        }, {
            id: 167,
            name: "大连",
            visiable: 1,
            letter: ""
        }, {
            id: 20,
            name: "宁夏回族自治区",
            visiable: 1,
            letter: "N"
        }, {
            id: 360,
            name: "银川",
            visiable: 1,
            letter: ""
        }, {
            id: 22,
            name: "内蒙古自治区",
            visiable: 1,
            letter: "N"
        }, {
            id: 321,
            name: "呼和浩特",
            visiable: 1,
            letter: ""
        }, {
            id: 11,
            name: "青海",
            visiable: 1,
            letter: "Q"
        }, {
            id: 66,
            name: "西宁",
            visiable: 1,
            letter: ""
        }, {
            id: 289,
            name: "上海",
            visiable: 1,
            letter: "S"
        }, {
            id: 8,
            name: "山东",
            visiable: 1,
            letter: "S"
        }, {
            id: 288,
            name: "济南",
            visiable: 1,
            letter: ""
        }, {
            id: 236,
            name: "青岛",
            visiable: 1,
            letter: ""
        }, {
            id: 326,
            name: "烟台",
            visiable: 1,
            letter: ""
        }, {
            id: 287,
            name: "潍坊",
            visiable: 1,
            letter: ""
        }, {
            id: 286,
            name: "济宁",
            visiable: 1,
            letter: ""
        }, {
            id: 234,
            name: "临沂",
            visiable: 1,
            letter: ""
        }, {
            id: 353,
            name: "菏泽",
            visiable: 1,
            letter: ""
        }, {
            id: 10,
            name: "山西",
            visiable: 1,
            letter: "S"
        }, {
            id: 176,
            name: "太原",
            visiable: 1,
            letter: ""
        }, {
            id: 355,
            name: "大同",
            visiable: 1,
            letter: ""
        }, {
            id: 27,
            name: "陕西",
            visiable: 1,
            letter: "S"
        }, {
            id: 233,
            name: "西安",
            visiable: 1,
            letter: ""
        }, {
            id: 32,
            name: "四川",
            visiable: 1,
            letter: "S"
        }, {
            id: 75,
            name: "成都",
            visiable: 1,
            letter: ""
        }, {
            id: 79,
            name: "乐山",
            visiable: 1,
            letter: ""
        }, {
            id: 186,
            name: "宜宾",
            visiable: 1,
            letter: ""
        }, {
            id: 332,
            name: "天津",
            visiable: 1,
            letter: "T"
        }, {
            id: 12,
            name: "新疆维吾尔自治区",
            visiable: 1,
            letter: "X"
        }, {
            id: 92,
            name: "乌鲁木齐",
            visiable: 1,
            letter: ""
        }, {
            id: 13,
            name: "西藏自治区",
            visiable: 1,
            letter: "X"
        }, {
            id: 100,
            name: "拉萨",
            visiable: 1,
            letter: ""
        }, {
            id: 28,
            name: "云南",
            visiable: 1,
            letter: "Y"
        }, {
            id: 104,
            name: "昆明",
            visiable: 1,
            letter: ""
        }, {
            id: 249,
            name: "曲靖",
            visiable: 1,
            letter: ""
        }, {
            id: 106,
            name: "玉溪",
            visiable: 1,
            letter: ""
        }, {
            id: 112,
            name: "保山",
            visiable: 1,
            letter: ""
        }, {
            id: 111,
            name: "大理",
            visiable: 1,
            letter: ""
        }, {
            id: 105,
            name: "楚雄彝族自治州",
            visiable: 1,
            letter: ""
        }, {
            id: 29,
            name: "浙江",
            visiable: 1,
            letter: "Z"
        }, {
            id: 179,
            name: "杭州",
            visiable: 1,
            letter: ""
        }, {
            id: 180,
            name: "宁波",
            visiable: 1,
            letter: ""
        }, {
            id: 178,
            name: "温州",
            visiable: 1,
            letter: ""
        }, {
            id: 293,
            name: "绍兴",
            visiable: 1,
            letter: ""
        }, {
            id: 334,
            name: "嘉兴",
            visiable: 1,
            letter: ""
        }, {
            id: 333,
            name: "金华",
            visiable: 1,
            letter: ""
        }, {
            id: 244,
            name: "台州",
            visiable: 1,
            letter: ""
        }, {
            id: 111,
            name: "大理白族自治州",
            visiable: 1,
            letter: ""
        }],
        style = '@charset "UTF-8";.ui3-control-shadow{}.ui3-tool-collection-wrap{border:1px solid #c4c7cc;background-color:#fff}.ui3-tool-collection{display:inline-block;width:47px;height:24px;line-height:24px}.ui3-tool-collection em{width:11px;height:11px;background-image:url(//webmap1.bdimg.com/wolfman/static/common/images/ui3/tools/tools_2b91efa.png);background-position:0 -316px;margin-left:5px;margin-right:4px}.ui3-tool-collection:hover em{background-position:-11px -316px}.ui3-tool-collection-wrap a{color:#666}.ui3-tool-collection-wrap ul{display:none;height:0;overflow:hidden;position:absolute;top:-1px;left:-58px;border:1px solid #c4c7cc;width:50px;background-color:#fff}.ui3-tool-collection-wrap li a{display:block;height:24px;line-height:24px;border-bottom:1px solid #e9eaec;text-decoration:none}.ui3-tool-collection-wrap em{background-image:url(//webmap1.bdimg.com/wolfman/static/common/images/ui3/tools/tools_2b91efa.png);display:inline-block;vertical-align:middle}.ui3-tool-collection-wrap a span{vertical-align:middle}.ui3-tool-collection-wrap a:hover span{color:#0C88E8}.ui3-tool-collection-wrap .ui3-1 em{width:7px;height:11px;margin-left:8px;margin-right:6px;background-position:-10px -177px}.ui3-tool-collection-wrap .ui3-1:hover em{background-position:-59px -177px}.ui3-tool-collection-wrap .ui3-2 em{width:12px;height:12px;margin-left:6px;margin-right:3px;background-position:-31px -177px}.ui3-tool-collection-wrap .ui3-2:hover em{background-position:-80px -177px}.ui3-tool-collection-wrap .ui3-3 em{width:7px;height:12px;margin-left:8px;margin-right:6px;background-position:0 -304px}.ui3-tool-collection-wrap .ui3-3:hover em{background-position:-7px -304px}.ui3-tool-collection-wrap .ui3-4 em{width:12px;height:12px;margin-left:5px;margin-right:4px;background-position:-31px -200px}.ui3-tool-collection-wrap .ui3-4:hover em{background-position:-80px -200px}.ui3-tool-collection-wrap .ui3-5{border-bottom:0}.ui3-tool-collection-wrap .ui3-5 em{width:12px;height:12px;margin-left:5px;margin-right:5px;background-position:-7px -200px}.ui3-tool-collection-wrap .ui3-5:hover em{background-position:-56px -200px}.ui3-control-color:hover{color:#0c88e8}.ui3-control-color{color:#666;text-decoration:none}.ui3-control-color em,.ui3-control-color span{display:inline-block;vertical-align:middle;letter-spacing:-1px}.ui3-full-screen{width:47px;height:24px;border:1px solid #c4c7cc;background-color:#fff;line-height:24px;display:inline-block}.ui3-full-screen em{height:11px;width:11px;margin-left:6px;margin-right:4px;background-image:url(//webmap1.bdimg.com/wolfman/static/common/images/ui3/tools/tools_2b91efa.png);background-position:-6px -8px}.ui3-full-screen:hover em{background-position:-17px -8px}.exit-fullscreen{width:47px;height:26px;background-position:-73px -265px}.ui3-traffic-st-wrap{border:1px solid #c4c7cc;background-color:#fff}.ui3-traffic-st{width:47px;height:24px;line-height:24px;display:inline-block}.ui3-traffic-st:hover em{background-position:-14px -150px}.ui3-traffic-st em{height:14px;width:7px;margin-left:7px;margin-right:7px;background-image:url(//webmap1.bdimg.com/wolfman/static/common/images/ui3/tools/tools_2b91efa.png);background-position:-7px -150px}.trafficStTool-click em{background-position:-14px -150px}.ui3-street-view{display:inline-block;width:45px;padding:1px;text-decoration:none;border:1px solid #9B9EA4;background-color:#fff}.ui3-street-view-top{height:26px;background-image:url(//webmap1.bdimg.com/wolfman/static/common/images/ui3/tools/tools_2b91efa.png);background-position:0 -327px}.ui3-street-view-bottom{color:#666;text-align:center;height:16px;line-height:16px;_line-height:18px}.ui3-street-view:hover{zoom:1}.ui3-street-view:hover .ui3-street-view-bottom{background-color:#0c88e8;color:#fff}.streetViewTool-click .ui3-street-view-bottom{background-color:#0c88e8;color:#fff}.clearfixs:after{display:block;clear:both;content:” “;visibility:hidden;height:0}.ui3-control-wrap{box-sizing:border-box;position:relative}.ui3-control-wrap .trafficLeadDownloadCard{position:absolute;z-index:50000;right:-39px;top:110px;width:295px;background:#fff;height:80px}.ui3-control-wrap #ui3_city_change{display:inline-block;float:left;border-radius:2px;box-shadow:1px 2px 1px rgba(0,0,0,.15)}.ui3-control-wrap .ui3-city-change-inner{float:left;display:inline-block;padding-right:12px;height:34px;line-height:34px;background-color:#fff;color:#666;font-size:12px;text-decoration:none;vertical-align:middle;position:relative}.ui3-control-wrap .ui3-city-change-inner em{width:7px;height:7px;margin-left:5px;float:left;margin-top:13px;background-image:url(//webmap1.bdimg.com/wolfman/static/common/images/ui3/tools/newtools_cc97086.png);background-repeat:no-repeat;background-position:-13px -17px}.ui3-control-wrap .ui3-city-change-inner span{font-size:12px;float:left}.ui3-control-wrap .ui3-city-change-inner:hover{color:#0C88E8}.ui3-control-wrap .ui3-city-change-inner:hover em{border-top-color:#0C88E8}.ui3-control-wrap .ui3-city-change-click .ui3-city-change-inner em,.ui3-control-wrap .ui3-city-change-click-close .ui3-city-change-inner em{background-position:-12px -177px}.ui3-control-wrap .ui3-blue,.ui3-control-wrap .ui3-blue span{color:#0C88E8}.ui3-control-wrap #ui3_city_change .adjustpadding{float:left;width:5px;height:34px;border-radius:2px 0 0 2px;padding-left:7px;background:#fff}.ui3-control-wrap #weather img{width:16px;height:16px;padding-top:8px;margin-right:6px}.ui3-control-wrap #weather{display:inline-block;line-height:17px;height:34px;background-color:#fff;text-decoration:none;vertical-align:middle;float:left}.ui3-control-wrap .left,.ui3-control-wrap .right{height:34px;background:#fff;border-radius:0 2px 2px 0;box-shadow:1px 2px 1px rgba(0,0,0,.15)}.ui3-control-wrap .left b,.ui3-control-wrap .right b{float:left;height:21px;display:inline-block;border-right:1px solid #eee;top:7px;position:relative}.ui3-control-wrap .left span,.ui3-control-wrap .right span{float:left;height:34px;width:29px;background-image:url(//webmap1.bdimg.com/wolfman/static/common/images/ui3/tools/newtools_cc97086.png);background-repeat:no-repeat}.ui3-control-wrap .left span.active,.ui3-control-wrap .right span.active{background-color:#fff}.ui3-control-wrap i{float:left;font-size:12px;font-style:normal;height:34px;line-height:34px;display:inline-block}.ui3-control-wrap i.active{color:#579AFC}.ui3-control-wrap .trafficopt:hover .traffic{background-position:1px -49px}.ui3-control-wrap .trafficopt:hover i{color:#579AFC}.ui3-control-wrap .trafficopt{padding-right:12px;line-height:34px;float:left;display:inline-block;cursor:pointer}.ui3-control-wrap .trafficopt.disabled{cursor:default;color:#bbb}.ui3-control-wrap .trafficopt.disabled .traffic{background-position:-77px -209px}.ui3-control-wrap .trafficopt.disabled:hover .traffic{background-position:-77px -209px}.ui3-control-wrap .trafficopt.disabled:hover i{color:#bbb}.ui3-control-wrap .traffic{background-position:1px -114px}.ui3-control-wrap .traffic.active{background-position:1px -49px}.ui3-control-wrap .subwayopt:hover .subway{background:url(//webmap0.bdimg.com/wolfman/static/common/images/subway_e55d48b.png) no-repeat!important}.ui3-control-wrap .subwayopt:hover i{color:#579AFC}.ui3-control-wrap .subwayopt{padding-right:12px;line-height:34px;float:left;cursor:pointer;display:inline-block}.ui3-control-wrap .subway{-webkit-transform:scale(0.5);-ms-transform:scale(0.5);transform:scale(0.5);background:url(//webmap1.bdimg.com/wolfman/static/common/images/subway2_61a280e.png) no-repeat!important}.ui3-control-wrap .boxopt:hover .boxutils{background-position:-34px -48px}.ui3-control-wrap .boxopt:hover .boxtext{color:#579AFC}.ui3-control-wrap .boxopt{padding-right:12px;line-height:34px;float:left;cursor:pointer;display:inline-block}.ui3-control-wrap .boxopt em{width:7px;height:7px;float:left;margin-top:13px;margin-left:5px;background-image:url(//webmap1.bdimg.com/wolfman/static/common/images/ui3/tools/newtools_cc97086.png);background-repeat:no-repeat;background-position:-13px -17px}.ui3-control-wrap .boxopt em.active{background-position:-12px -177px}.ui3-control-wrap .boxutils{padding-right:7px;background-position:-34px -116px}.ui3-control-wrap .boxutils.active{background-position:-34px -48px}.ui3-control-wrap .map-measure:hover .measure{background-position:-80px -49px}.ui3-control-wrap .map-measure:hover i{color:#579AFC}.ui3-control-wrap .map-mark:hover .mark{background-position:-40px -168px}.ui3-control-wrap .map-mark:hover i{color:#579AFC}.ui3-control-wrap .map-share:hover .share{background-position:-163px -51px}.ui3-control-wrap .map-share:hover i{color:#579AFC}.ui3-control-wrap .detail-box{position:absolute;width:86px;background:#fff;box-shadow:1px 2px 1px rgba(0,0,0,.15);top:34px;right:0;float:left;display:none;z-index:80000}.ui3-control-wrap .boxinfo{list-style-type:none}.ui3-control-wrap .boxinfo li{box-sizing:border-box;width:100%;cursor:pointer;height:34px;line-height:34px;padding-left:7px}.ui3-control-wrap .boxinfo li i{margin-left:2px}.ui3-control-wrap .boxinfo li .measure{background-position:-80px -117px}.ui3-control-wrap .boxinfo li .measure.active{background-position:-80px -49px}.ui3-control-wrap .boxinfo li .mark{background-position:-80px -168px}.ui3-control-wrap .boxinfo li .mark.active{background-position:-40px -168px}.ui3-control-wrap .boxinfo li .share{background-position:-163px -117px}.ui3-control-wrap .boxinfo li .share.active{background-position:-163px -51px}.ui3-control-wrap .boxinfo li.disabled{color:#bbb;cursor:default}.ui3-control-wrap .boxinfo li.disabled .measure{background-position:-42px -209px}.ui3-control-wrap .boxinfo li.disabled .mark{background-position:-1px -209px}.ui3-control-wrap .boxinfo li.disabled:hover .measurea{background-position:-42px -209px}.ui3-control-wrap .boxinfo li.disabled:hover i{color:#bbb}.ui3-control-wrap .last{border:0!important}.ui3-springfestival-data-wrap{position:absolute;left:-204px;z-index:1}.ui3-springfestival-data-link{width:195px;height:48px;cursor:pointer;background-size:contain;background:url(//webmap1.bdimg.com/wolfman/static/common/images/springFestivalBigdata2023X1_8406f8e.png) no-repeat}@media only screen and (-webkit-min-device-pixel-ratio:2),(-webkit-min-device-pixel-ratio:2),(min-resolution:2dppx),(min-resolution:192dpi){.ui3-springfestival-data-link{background:url(//webmap1.bdimg.com/wolfman/static/common/images/springFestivalBigdata2023X2_9abd1b5.png) no-repeat;background-size:contain}}.ui3-springfestival-data-link .ui3-springfestival-data-link-options{display:none;position:absolute;top:21px;left:34px;width:140px;height:91px;background-image:linear-gradient(270deg,#901EB8 0,#D3244B 100%);border:2px solid #ffc0a4;box-shadow:0 4px 8px 0 rgba(0,0,0,.2);border-radius:6px;z-index:-1}.ui3-springfestival-data-link .ui3-springfestival-data-link-options .ui3-springfestival-data-link-option{position:absolute;width:140px;height:32px}.ui3-springfestival-data-link .ui3-springfestival-data-link-options .option1{top:22px}.ui3-springfestival-data-link .ui3-springfestival-data-link-options .option1:hover{background:rgba(255,255,255,.3)}.ui3-springfestival-data-link .ui3-springfestival-data-link-options .option1:hover .text{opacity:1}.ui3-springfestival-data-link .ui3-springfestival-data-link-options .option1:hover .point{background:url(//webmap1.bdimg.com/wolfman/static/common/images/MigrateHover_c18e7eb.png) no-repeat}.ui3-springfestival-data-link .ui3-springfestival-data-link-options .option2{top:55px}.ui3-springfestival-data-link .ui3-springfestival-data-link-options .option2:hover{background:rgba(255,255,255,.3)}.ui3-springfestival-data-link .ui3-springfestival-data-link-options .option2:hover .text{opacity:1}.ui3-springfestival-data-link .ui3-springfestival-data-link-options .option2:hover .car{background:url(//webmap0.bdimg.com/wolfman/static/common/images/TravelHover_988f772.png) no-repeat}.ui3-springfestival-data-link .ui3-springfestival-data-link-options .icon{display:inline-block;width:20px;height:20px;position:absolute;top:6px;left:18px}.ui3-springfestival-data-link .ui3-springfestival-data-link-options .point{background:url(//webmap0.bdimg.com/wolfman/static/common/images/MigrateNormal_c94fbdc.png) no-repeat}.ui3-springfestival-data-link .ui3-springfestival-data-link-options .car{background:url(//webmap0.bdimg.com/wolfman/static/common/images/TravelNormal_140546b.png) no-repeat}.ui3-springfestival-data-link .ui3-springfestival-data-link-options .text{position:absolute;top:6px;left:46px;opacity:.7;font-family:PingFangSC-Semibold;font-size:14px;color:#FFF;letter-spacing:0;text-align:center;font-weight:600}.ui3-springfestival-data-link:hover .ui3-springfestival-data-link-options{display:block}';
    require.loadCss({
        content: style,
        name: "ui3Tools"
    });
    var toolsBundle = {
            doMeasure: function() {
                signMgr.exituserSign();
                var i = this;
                if (!i.distanceControl) {
                    BMap.PolylineTItem = BMap.DistanceTool;
                    var e = new BMap.PolylineTItem(map, {
                        enableMassClear: !1,
                        styleCodes: {
                            lnCode: constant.OVERLAY_STYLE.DIS_LINE,
                            spCode: constant.OVERLAY_STYLE.DIS_DOT,
                            slCode: constant.OVERLAY_STYLE.DIS_LBL,
                            tlCode: constant.OVERLAY_STYLE.DIS_T_LBL
                        }
                    });
                    i.distanceControl = e
                }
                this.doMeasure._initialized || (i.distanceControl && i.distanceControl.addEventListener("drawend", function() {
                    window.listener.trigger("index.controls", "close", {
                        target: "measure"
                    })
                }), this.doMeasure._initialized = !0), i.distanceControl && (i.distanceControl._isOpen ? this.closeMeasure() : i.distanceControl.open()), listener.trigger("uitool")
            },
            closeMeasure: function() {
                var i = this;
                i.distanceControl && i.distanceControl.close()
            },
            selectCity: function(i, e) {
                if (window.temp.cityPop) return void window.temp.cityPop.close();
                var t = {
                    title: "城市列表",
                    content: "",
                    width: 317,
                    height: 402,
                    right: 69,
                    top: 57,
                    open: function() {
                        i.addClass("ui3-city-change-click")
                    },
                    close: function() {
                        i.removeClass("ui3-city-change-click"), window.temp.cityPop = null
                    }
                };
                for (var o in e) t[o] = e[o];
                require.async(["common:widget/ui/Popup/Popup.js", "common:widget/ui/Storage/Storage.js", "common:widget/com/SelectCity/SelectCity.js"], function(o, a, n) {
                    var l = window.temp.cityPop = new o(t);
                    l.addConnectDom(i[0]), l.render(), l.hide(), l.getDom().style.width = t && "undefined" != typeof t.width ? window.toolbarwidth - 2 + "px" : "317px", t && "undefined" != typeof t.right ? l.getDom().style.right = t.right + "px" : l.getDom().style.left = t && "undefined" != typeof t.left ? t.left + "px" : "396px", l.getDom().style.top = t && "undefied" != typeof t.top ? t.top + "px" : t && "undefined" != typeof t.bottom ? t.bottom + "px" : "136px", e.baiduStorage = a, e.exitLargeMapMode = !1;
                    var r = new n({
                        dom: l.content,
                        cinfo: e,
                        pop: l
                    });
                    r.show()
                }), window.place && window.place.resetArea && window.place.resetArea()
            },
            migrateClick: function() {
                var i = $(".ui3-springfestival-data-link .migrate-click");
                i.on("click", function(i) {
                    i.stopPropagation(), window.addStat("indexspringfestival2023.tools.migratelink", "click"), window.open("https://qianxi.baidu.com/?from=ditupc")
                })
            },
            travelClick: function() {
                var i = $(".ui3-springfestival-data-link .travel-click");
                i.on("click", function(i) {
                    i.stopPropagation(), window.addStat("indexspringfestival2023.tools.travellink", "click"), window.open("https://jiaotong.baidu.com/congestion/country/city?page=2023chunyun")
                })
            }
        },
        toolsMediator = window.toolsMediator = {
            allbtnStatus: {
                selectCity: 0,
                traffic: 0,
                measure: 0,
                mark: 0,
                share: 0,
                box: 0
            },
            setBtnStatus: function(i) {
                this.allbtnStatus[i] = 1
            },
            revertBtnStatus: function(i) {
                this.allbtnStatus[i] = 0
            },
            closeOtherDialog: function(i) {
                switch (i) {
                    case "selectCity":
                        window.temp.cityPop && window.temp.cityPop.close();
                        break;
                    case "traffic":
                        require.async("common:widget/ui/Traffic/Traffic.js", function(i) {
                            var e = i.need2ShowTraffic();
                            e && (window.trafficCtrl && window.trafficCtrl.opened && window.trafficCtrl.close(), i.exit())
                        });
                        break;
                    case "measure":
                        toolsBundle.closeMeasure();
                        break;
                    case "mark":
                        signMgr.userTagPanl && (toolsBundle.closeMeasure(), signMgr.exituserSign(), map.closeInfoWindow());
                        break;
                    case "share":
                        var e = window.temp.linkPop;
                        e && e.visible && e.close();
                        break;
                    case "box":
                        window.toolsclick && (T(".detail-box").hide(), T(".boxopt").find("em").removeClass("active"), window.toolsclick = !1)
                }
            },
            removeOtherBtnsActive: function(i) {
                var e = {},
                    t = this.allbtnStatus,
                    o = T(".ui3-control-wrap");
                for (var a in t) a !== i && 1 === t[a] && (e[a] = 1);
                1 === e.selectCity && window.temp.cityPop && window.temp.cityPop.close();
                for (var n in e) {
                    this.closeOtherDialog(n);
                    var l = o.find(".map-" + n),
                        r = o.find("." + n + "opt");
                    r.removeClass("mark-active active"), r.find("span").removeClass("active"), r.find("i").removeClass("active"), l.removeClass("mark-active active"), l.find("span").removeClass("active"), l.find("i").removeClass("active"), this.revertBtnStatus(n)
                }
            },
            removeCurrentActive: function(i) {
                var e = T(".ui3-control-wrap"),
                    t = e.find(".map-" + i),
                    o = e.find("." + i + "opt");
                o.removeClass("mark-active active"), o.find("span").removeClass("active"), o.find("i").removeClass("active"), t.removeClass("mark-active active"), t.find("span").removeClass("active"), t.find("i").removeClass("active")
            },
            getOthers: function(i) {
                var e = {
                        trafficStTool: 1,
                        streetViewTool: 1
                    },
                    t = [];
                return delete e[i], T.each(e, function(i) {
                    window[i] && window[i].btn && t.push(window[i].btn[0])
                }), T(t)
            },
            removeActive: function(i) {
                var e = i.attr("data-model"),
                    t = e + "-click";
                i.removeClass("ui3-blue").removeClass(t)
            },
            addActive: function(i) {
                var e = i.attr("data-model"),
                    t = e + "-click";
                i.addClass("ui3-blue").addClass(t)
            },
            checkStatus: function(i) {
                var e = i.attr("data-model"),
                    t = e + "-click";
                return i.hasClass("ui3-blue") ? (i.removeClass("ui3-blue").removeClass(t), window[e].hideDialog(), !1) : (i.addClass("ui3-blue " + t), this.checkOthers(e), !0)
            },
            checkOthers: function(i) {
                var e;
                e = "string" == typeof i ? i : "undefined" == typeof i ? "others" : i.attr("data-model");
                var t = this.getOthers(e),
                    o = t.filter(".ui3-blue");
                if (o.length) {
                    var a = o.attr("data-model");
                    o.removeClass("ui3-blue").removeClass(a + "-click"), window[a].hideDialog()
                }
            }
        },
        streetViewTool = {
            init: function() {
                var i = window;
                this.isSupportStreetView2() ? i.streetViewTool || require.async("pano:widget/StreetViewTool/StreetViewTool.js", function(e) {
                    i.streetViewTool = new e({
                        map: map
                    }), map.addControl(i.streetViewTool), i.streetViewTool.addEventListener("hide", function() {}), i.streetViewTool.addEventListener("show", function() {}), map.getMapType() === BMAP_EARTH_MAP && i.streetViewTool.hide(), mapTypeTab.init({
                        map: map,
                        streetViewTool: i.streetViewTool
                    }), T(i.streetViewTool.getDom()).click(function() {
                        addStat("pano.view", "click")
                    })
                }) : i.streetViewTool && i.streetViewTool.hide()
            },
            isSupportStreetView2: function() {
                var i = window.G_POC || [],
                    e = modelConfig.cityCode;
                if (e >= 9e3 && 9378 >= e) return !1;
                for (var t = 0; t < i.length; t++)
                    if (e == i[t] || -9999 == i[t]) return !0;
                return !1
            }
        };
    T.extend(allControlsBundle.prototype, {
        show: function() {
            this.toolcontainer.show()
        },
        hide: function() {
            this.toolcontainer.hide()
        },
        initialize: function() {
            try {
                var tpl = [function(_template_object) {
                    var _template_fun_array = [],
                        fn = function(__data__) {
                            var _template_varName = "";
                            for (var name in __data__) _template_varName += "var " + name + '=__data__["' + name + '"];';
                            eval(_template_varName), _template_fun_array.push('<div class="ui3-control-wrap clearfixs" id="ui3_control_wrap">    <!--    <div class="cityData ui3-springfestival-data-wrap" id="ui3_springfestival_data">        <div class="ui3-springfestival-data-link">            <div class="ui3-springfestival-data-link-options">                <div class="ui3-springfestival-data-link-option option1 migrate-click">                    <span class="icon point"></span>                    <span class="text">人口迁徙</span>                </div>                <div class="ui3-springfestival-data-link-option option2 travel-click">                    <span class="icon car"></span>                    <span class="text">交通出行</span>                </div>            </div>        </div>    </div>    -->    <div class="citychangeopt ui3-city-change-wrap" id="ui3_city_change">        <span class=\'adjustpadding\'></span>        <span class="weather-item" id="weather">              <img alt="天气图标" src="', "/wolfman/static/common/images/transparent.gif", '"/>        </span>        <a href="#" map-on-click="selectCity" onclick="return false" class="ui3-city-change-inner ui3-control-shadow">            <span></span><em></em>        </a>    </div>    <div class="left float-l">        <b class=\'tool-gap\'></b>        <div class="trafficopt" map-on-click="traffic">            <span id="traffic_control" class="last traffic"></span><i>路况</i>        </div>        <b></b>        <div class="subwayopt" map-on-click="subway">            <span id="subway_control" class="last subway"></span><i>地铁</i>        </div>          <b></b>        <div class="boxopt" map-on-click="box">            <span id="util_control" class="boxutils boxicon"></span>            <i class=\'boxtext\'>工具箱</i><em></em>        </div>        <div class="detail-box">            <ul id=\'boxul\' class=\'boxinfo\'>                <li class="map-measure" map-on-click="measure"><span class="last measure">                    </span><i>测距</i>                </li>                <li class="map-mark" map-on-click="mark"><span class="last mark">                    </span><i>标记</i>                </li>                <li class="map-share" map-on-click="share"><span class="last share">                    </span><i>分享</i>                </li>            </ul>        </div>    </div></div>'), _template_varName = null
                        }(_template_object);
                    return fn = null, _template_fun_array.join("")
                }][0];
                this.toolcontainer = T("#tool-container");
                var container = this.container = T(tpl()).appendTo(this.toolcontainer);
                return T.on(document, "keyup", function(i) {
                    27 == i.keyCode && toolsBundle.closeMeasure()
                }), this.process(), container[0]
            } catch (e) {
                "undefined" != typeof alog && alog("exception.fire", "catch", {
                    msg: e.message || e.description,
                    path: "common:widget/ui/ui3Tools/ui3Tools.js",
                    ln: 1277
                })
            }
        },
        bindCityChangeEvent: function() {
            var i = T("#ui3_city_change"),
                e = T(".ui3-city-change-inner"),
                t = e.attr("map-on-click");
            e.on("click", function() {
                toolsMediator.setBtnStatus(t), toolsMediator.removeOtherBtnsActive(t), toolsBundle.selectCity(i, {
                    styleSwitch: !0
                }), window.addStat("indexcityex.cityexchange.cityexchangeentrance", "click", {})
            });
            var o = baidu.json.parse(window._OLR.index || {});
            if (map.isFromShare) weather.add();
            else if (o) {
                var a = o.weather;
                weather.add(a)
            }
            window.listener.on("com.city", "change", function(e, t) {
                window.cityName = "中国" === t.name ? "全国" : t.name, i.find(".ui3-city-change-inner>span").text(cityName), window.toolbarwidth = T("#ui3_control_wrap").width() + T(".message-center-entrance").width() + 6
            })
        },
        disableTraffic: function() {
            var i = this.container.find(".trafficopt");
            i.addClass("disabled")
        },
        enableTraffic: function() {
            var i = this.container.find(".trafficopt");
            i.removeClass("disabled")
        },
        disableMeasure: function() {
            var i = this.container.find(".map-measure");
            i.addClass("disabled")
        },
        enableMeasure: function() {
            var i = this.container.find(".map-measure");
            i.removeClass("disabled")
        },
        disableMark: function() {
            var i = this.container.find(".map-mark");
            i.addClass("disabled")
        },
        enableMark: function() {
            var i = this.container.find(".map-mark");
            i.removeClass("disabled")
        },
        bindTrafficEvent: function(i) {
            {
                var e = this,
                    t = i.find(".trafficopt");
                t.find("span"), t.find("i")
            }
            t.on("click", function() {
                var i = T(this);
                if (!i.hasClass("disabled")) {
                    var t = i.attr("map-on-click"),
                        o = e[i.attr("map-on-click")];
                    toolsMediator.setBtnStatus(t), toolsMediator.removeOtherBtnsActive(t), i.addClass("mark-active"), "function" == typeof o && o.call(e, i)
                }
            }), t.on("mouseout", function() {
                t.filter(".mark-active").find("span").addClass("active"), t.filter(".mark-active").find("i").addClass("active")
            })
        },
        gotoSubway: function(i) {
            require.async("common:widget/com/Subway/SbwMgr.js", function(e) {
                e.init(i)
            })
        },
        bindSubwayEvent: function(i) {
            var e = this,
                t = i.find(".subwayopt");
            t.on("click", function() {
                e.gotoSubway()
            })
        },
        bindToolBoxEvent: function(i) {
            var e = i.find(".boxopt"),
                t = e.find("em"),
                o = e.attr("map-on-click"),
                a = this;
            e.on("mouseout", function() {
                e.filter(".mark-active").find("span").addClass("active"), e.filter(".mark-active").find("i").addClass("active")
            }), e.on("click", function() {
                var e = i.find(".detail-box");
                toolsMediator.setBtnStatus(o), toolsMediator.removeOtherBtnsActive(o), T(this).addClass("mark-active"), window.toolsclick ? (e.hide(), window.toolsclick = !1, t.removeClass("active"), T(this).removeClass("mark-active"), T(this).find("span").removeClass("active"), T(this).find("em").removeClass("active"), T(this).find("i").removeClass("active")) : (e.show(), window.toolsclick = !0, t.addClass("active"))
            });
            var n = i.find(".detail-box");
            n.delegate("li", "mouseout", function() {
                T(this).filter(".mark-active").find("span").addClass("active"), T(this).filter(".mark-active").find("i").addClass("active")
            }).delegate("li", "click", function() {
                var i = T(this),
                    e = i.attr("map-on-click");
                toolsMediator.setBtnStatus(e), toolsMediator.removeOtherBtnsActive(e);
                var t = n.find("li");
                T.each(t, function(i, e) {
                    var t = T(e);
                    t.hasClass("mark-active") && t.removeClass("mark-active")
                }), i.addClass("mark-active");
                var o = a[i.attr("map-on-click")];
                "function" == typeof o && o.call(a, i)
            })
        },
        bindIndexEvent: function() {
            T("#indexPage").on("click", function() {
                window.addStat("indexheader.nav.index", "click", {})
            })
        },
        hideboxutils: function(i) {
            if (toolsclick) {
                var e = i.find(".boxopt");
                i.find(".detail-box").hide(), toolsclick = !1, e.removeClass("mark-active"), e.find("span").removeClass("active"), e.find("em").removeClass("active"), e.find("i").removeClass("active")
            }
        },
        handleMouseEvent: function(i) {
            var e = this;
            T.on(document.body, "mousedown", function(t) {
                for (var o = t.srcElement || t.target; o;) {
                    for (var a = T("#tool-container"), n = 0; n < a.length; n++)
                        if (o === a[n]) return;
                    if (o === document.body) return void e.hideboxutils(i);
                    o = o.parentNode
                }
            })
        },
        process: function() {
            window.toolsclick = !1;
            var i = this.container;
            this.bindCityChangeEvent(i), this.bindTrafficEvent(i), this.bindSubwayEvent(i), this.bindToolBoxEvent(i), this.bindIndexEvent(i), this.handleMouseEvent(i), window.listener.on("index.controls", "close", function(i, e) {
                var t = e.target;
                t && toolsMediator.removeCurrentActive(t)
            })
        },
        traffic: function() {
            require.async("common:widget/ui/Traffic/Traffic.js", function(i) {
                var e = i.need2ShowTraffic();
                e ? window.trafficCtrl ? trafficCtrl.opened ? trafficCtrl.close() : trafficCtrl.open() : i.loadTrafficCtrl() : i.exit()
            })
        },
        share: function() {
            var i = this;
            require.async("common:widget/ui/toolShare/ToolShare.js", function(e) {
                var t = window.temp.linkPop,
                    o = window.temp.detailInfoPop;
                o && o.close(), t && t.visible ? t.close() : e.open({
                    keepTraffic: i.keepTraffic
                })
            })
        },
        measure: function(i) {
            i.hasClass("disabled") || (toolsBundle.doMeasure(), addStat("indextool.toolbar.ruler", "click", {}))
        },
        mark: function(i) {
            i.hasClass("disabled") || (window.sgr = signMgr("mapSign"), addStat("indextool.toolbar.mark", "click", {}))
        },
        print: function() {}
    }), module.exports = T.extend(toolsBundle, {
        init: function() {
            if (!window.isPrint) {
                var i = this;
                if (window.allControlsBundleTool = new allControlsBundle({
                        map: map
                    }), window.allControlsBundleTool.initialize(), map.getMapType() === BMAP_EARTH_MAP ? this.disableEarth() : this.enableEarth(), map.addEventListener("onmaptypechange", function(e) {
                        var t = e.mapType;
                        t === BMAP_EARTH_MAP ? i.disableEarth() : i.enableEarth()
                    }), listener.on("com.subway", "load", function() {
                        allControlsBundleTool.hide()
                    }), toolsBundle.migrateClick(), toolsBundle.travelClick(), listener.on("com.subway", "unload", function() {
                        allControlsBundleTool.show(), window.toolbarwidth = T("#ui3_control_wrap").width() + T(".message-center-entrance").width() + 6
                    }), window.localStorage) {
                    var e = window.localStorage;
                    try {
                        e.setItem("loc-test", "a"), "a" === e.getItem("loc-test") && (renderModeSwitch.init(map), e.removeItem("loc-test"))
                    } catch (t) {
                        console && console.log(t)
                    }
                }
            }
        },
        disableEarth: function() {
            window.allControlsBundleTool.disableTraffic()
        },
        enableEarth: function() {
            window.allControlsBundleTool.enableTraffic()
        },
        streetViewTool: streetViewTool
    })
});;
define("common:widget/ui/queryBuilder/queryBuilder.js", function(e, n, o) {
    function t(e) {
        var n = m.filtQuery(e.wd.trim());
        if ("" === n) return {
            code: 1,
            query: ""
        };
        var o = e.da_src,
            t = l.cityCode || 1,
            i = map.getBounds({
                margins: [0, 0, 0, $.leftMargin],
                heading: 0,
                tilt: 0
            }),
            r = Math.min(i.minX, i.maxX),
            d = Math.max(i.minX, i.maxX),
            a = Math.min(i.minY, i.maxY),
            c = Math.max(i.minY, i.maxY),
            u = e.wd2 || "",
            s = u ? 1 : 0,
            p = window.devicePixelRatio && window.devicePixelRatio > 1 ? 2 : 1,
            w = "B_NORMAL_MAP" === map.getMapType() ? "pl" : "sl",
            f = "s&da_src=" + o + "&wd=" + encodeURIComponent(n) + "&c=" + t + "&src=0&wd2=" + encodeURIComponent(u) + "&pn=0&sug=" + s + "&l=" + Math.floor(map.getZoom()) + "&b=(" + r + "," + a + ";" + d + "," + c + ')&from=webmap&biz_forward={"scaler":' + p + ',"styles":"' + w + '"}';
        return f += "&sug_forward=" + (e.extra || ""), {
            code: 0,
            query: f
        }
    }

    function i(e) {
        var n = e.start,
            o = e.end,
            t = m.filtQuery(n.wd),
            i = m.filtQuery(o.wd);
        if ("" === t) return {
            code: 1
        };
        if ("" === i) return {
            code: 2
        };
        var a = {
                drive: "nav",
                bus: "bt",
                walk: "walk",
                bike: "cycle"
            },
            c = "&da_src=pcmappg." + (e.da_src || "unknown"),
            u = l.cityCode || 1,
            p = 2,
            $ = 2,
            w = u,
            f = u,
            g = a[e.index] || e.index,
            y = "",
            R = "",
            C = "",
            x = "",
            h = "",
            v = {},
            b = n._wd2 || "",
            _ = o._wd2 || "",
            M = b ? 1 : 0,
            U = _ ? 1 : 0;
        if (t === i && b === _ && n.pt === o.pt) return {
            code: 3
        };
        var I = n.pt || n.uid,
            G = o.pt || o.uid,
            q = {};
        if (I && G || !I && !G) {
            I && G && (p = n.uid && "bt" !== g && "walk" !== g && "cycle" !== g ? 0 : 1, $ = o.uid && "bt" !== g && "walk" !== g && "cycle" !== g ? 0 : 1, y = n.pt || "", R = o.pt || "", C = n.uid || "", x = o.uid || "", u = n.ccode || u, w = n.ccode || u, f = o.ccode || u);
            var X = encodeURIComponent(t),
                Y = encodeURIComponent(b),
                P = encodeURIComponent(i),
                k = encodeURIComponent(_);
            q = {
                c: u,
                sn: p + "$$" + C + "$$" + y + "$$" + X + "$$" + M + "$$" + Y + "$$",
                en: $ + "$$" + x + "$$" + R + "$$" + P + "$$" + U + "$$" + k + "$$",
                sc: w,
                ec: f,
                pn: 0,
                rn: 5
            }
        } else if (I || G)
            if ("bt" === g && (g = "bt" === g ? "bse" : "nse"), "bse" === g || "nse" === g) {
                var B, T, j, Q, S, Z, A = "";
                I ? (T = n.uid || "", B = n.pt, B && (Z = 1), T && (Z = 0), j = t, Q = i, S = "sn", u = n.ccode || u, A = _) : G && (T = o.uid || "", B = o.pt, B && (Z = 1), T && (Z = 0), j = i, Q = t, S = "en", u = G.ccode || u, A = b), q = {
                    c: u,
                    t: Z,
                    singleType: Z,
                    poiType: "0",
                    isSingle: "true",
                    ptx: B.split(",")[0],
                    pty: B.split(",")[1],
                    wd: encodeURIComponent(Q),
                    name: encodeURIComponent(j),
                    wd2: encodeURIComponent(A)
                }, q[S] = Z + "$$" + T + "$$" + B + "$$" + encodeURIComponent(j) + "$$$$$$", v.cinfo = {
                    q: h,
                    c: u,
                    t: 0,
                    isSingle: !0,
                    kwn: {
                        name: j,
                        pt: m.getPoiPoint(B),
                        poiType: 0
                    }
                }
            } else {
                var p = 2,
                    $ = 2,
                    y = "",
                    R = "",
                    w = u,
                    f = u,
                    L = "",
                    O = "";
                I ? (L = n.uid || "", y = n.pt || "", y && (p = 1), w = n.ccode || u) : G && (O = o.uid || "", R = o.pt || "", R && ($ = 1), f = o.ccode || u);
                var X = encodeURIComponent(t),
                    Y = encodeURIComponent(b),
                    P = encodeURIComponent(i),
                    k = encodeURIComponent(_);
                q = {
                    c: u,
                    sn: p + "$$" + L + "$$" + y + "$$" + X + "$$" + M + "$$" + Y + "$$",
                    en: $ + "$$" + O + "$$" + R + "$$" + P + "$$" + U + "$$" + k + "$$",
                    sc: w,
                    ec: f,
                    pn: 0,
                    rn: 5
                }
            }
        if ("bt" === g || "bse" === g) q.exptype = "dep", q.exptime = s.getBusExpTime(), q.version = 5, "bse" === g && (q.sn ? q.t = 1 : q.en && (q.t = 0));
        else if ("nav" === g || "nse" === g) {
            var z = r(e.tpList) || "";
            q.mrs = z ? "0" : "1", q.en = z + q.en, q.ec = d(e.tpList) + q.ec, q.version = 4, q.route_traffic = 1, q.sy = "0"
        } else "walk" === g ? (q.version = "6", q.run = 0, q.spath_type = 1) : "cycle" === g && (q.version = "6", q.vehicle = 0, q.spath_type = 1);
        return q.da_src = c, h = g + "&" + m.jsonToQuery(q), {
            code: 0,
            query: h,
            goext: v
        }
    }

    function r(e) {
        for (var n, o = [], t = 0; n = e[t]; t++) n.wd && o.push(p.getTPointQueryParam(n));
        return o.join("")
    }

    function d(e) {
        for (var n = [], o = l.cityCode || 1, t = 0; t < e.length; t++) e[t].wd && n.push(o + "+to:");
        return n.join("")
    }

    function a(e) {
        var n = m.filtQuery(e.wd.trim());
        if ("" === n) return {
            code: 1,
            query: ""
        };
        var o = e.da_src,
            t = l.cityCode || 1,
            i = map.getBounds({
                margins: [0, 0, 0, $.leftMargin],
                heading: 0,
                tilt: 0
            }),
            r = Math.min(i.minX, i.maxX),
            d = Math.max(i.minX, i.maxX),
            a = Math.min(i.minY, i.maxY),
            c = Math.max(i.minY, i.maxY),
            u = (e.wd2 || "", "s&da_src=" + o + "&wd=" + encodeURIComponent(n) + "&c=" + t + "&l=" + Math.floor(map.getZoom()) + "&b=(" + r + "," + a + ";" + d + "," + c + ")&from=webmap");
        return u += "&sug_forward=" + (e.extra || ""), {
            code: 0,
            query: u
        }
    }

    function c(e, n, o, t, i, r) {
        if (e) {
            var d = 1e3,
                a = {
                    r: d,
                    c: o,
                    wd: encodeURIComponent(e)
                };
            a.nb_x = t, a.nb_y = i;
            var c = "";
            a.query && (a.query = encodeURIComponent(a.query));
            for (var m in a) "undefined" != typeof a[m] && (c = c + "&" + m + "=" + a[m]);
            var u = "nb" + c + "&uid=" + n,
                l = 16;
            window.GRControll && (window.GRControll.GRCircleRadius = a.r, window.GRControll.isGRCircleShow = !0, window.GRControll.setGRequestFlg(1500), window.GRControll.GRCircleRadius > 1500 && (l = 15), window.GRControll.GRCircleRadius > 2500 && (l = 14));
            var s;
            if (a.nb_x && a.nb_y && !r && map.centerAndZoom(new BMap.Point(a.nb_x, a.nb_y), l), u.indexOf("b=") < 0) {
                s = map.getBounds({
                    margins: [0, 0, 0, $.leftMargin],
                    heading: 0,
                    tilt: 0
                });
                var p = Math.min(s.minX, s.maxX),
                    w = Math.max(s.minX, s.maxX),
                    f = Math.min(s.minY, s.maxY),
                    g = Math.max(s.minY, s.maxY);
                u += "&b=(" + p + "," + f + ";" + w + "," + g + ")"
            }
            return u.indexOf("l=") < 0 && (s = map.getBounds({
                heading: 0,
                tilt: 0
            }), u += "&l=" + Math.floor(map.getZoom())), window.GRControll && (window.GRControll.GRCircleRadius && (u += "&gr_radius=" + window.GRControll.GRCircleRadius), window.GRControll.openedMarker = null), {
                query: u,
                code: 0
            }
        }
        return {
            code: 1
        }
    }
    var m = e("common:widget/ui/util/util.js"),
        u = e("common:widget/ui/config/config.js"),
        l = u.modelConfig,
        s = e("common:widget/ui/indexUtil/IndexUtil.js"),
        p = e("common:widget/ui/throughpoint/tpUtil.js"),
        $ = u.mapConfig;
    o.exports = {
        soleSearch: t,
        routeSearch: i,
        buslineSearch: a,
        getTPQueryParam: r,
        getTPCityCode: d,
        nearbySearch: c
    }
});;
define("common:widget/ui/searchBox/SearchboxInterface.js", function(i, n, t) {
    function o(i) {
        this.searchBox = i, this.$el && (this.$loadingButton = this.$el.find(".loading-button")), this.isShowing = !1, this.isLoading = !1, this.isComplete = !1
    }
    T.extend(o.prototype, {
        loading: function() {
            this.isLoading = !0, this.$loadingButton && this.$loadingButton.addClass("loading")
        },
        endLoading: function() {
            this.isLoading = !1, this.$loadingButton && this.$loadingButton.removeClass("loading")
        },
        hide: function() {
            this.$el && this.$el.hide(), this.isShowing = !1
        },
        show: function() {
            this.$el && this.$el.show(), this.isShowing = !0
        },
        focus: function() {},
        blur: function() {},
        unload: function() {},
        reset: function() {},
        getQuery: function() {}
    }), t.exports = o
});;
define("common:widget/ui/searchBox/SoleSearchbox.js", function(t, e, i) {
    function o(t, e) {
        this.$el = this.$el || e, this.$input = this.$el.find("input[type=text]"), this.$rightButton = this.$el.find(".right-button"), this.$clearButton = this.$el.find(".input-clear"), this.data = {}, this.bindEvents();
        var i = T.cookie.get("routeiconclicked");
        if (!i && !$("#tooltip-route").length) {
            var o = $('<div class="tooltip" id="tooltip-route">路线</div>'),
                s = this.$rightButton.offset(),
                r = this.$rightButton.outerHeight(),
                a = this.$rightButton.outerWidth();
            T("body").append(o);
            var u = o.outerWidth();
            o.css({
                left: Math.round(s.left + a / 2 - u / 2) + "px",
                top: s.top + r - 1 + "px"
            })
        }
        n.apply(this, arguments)
    }
    var n = t("common:widget/ui/searchBox/SearchboxInterface.js"),
        s = t("common:widget/ui/queryBuilder/queryBuilder.js"),
        r = t("common:widget/ui/card/cardMgr.js"),
        a = t("common:widget/com/componentManager.js"),
        u = t("common:widget/ui/poiListMgr/poiListMgr.js"),
        c = t("common:widget/ui/util/util.js"),
        d = t("common:widget/ui/mapUtil/mapUtil.js"),
        l = t("common:widget/ui/constant/Constant.js");
    T.lang.inherits(o, n, "SoleSearchcontent"), T.extend(o.prototype, {
        bindEvents: function() {
            var e = this;
            listener.on("ui.cardmgr", "removegroup", function(t, i) {
                "result" === i.group && e.isShowing && e.reset()
            }), listener.on("ui.suggest", "show", function() {
                e.isSugShowing = !0
            }), listener.on("ui.suggest", "hide", function() {
                e.isSugShowing = !1
            }), listener.on("ipLocation.correct", function() {
                e.reset()
            }), t.async("common:widget/ui/ui3MapSuggest/ui3MapSuggest.js", function(t) {
                e.suggest = t.initialize({
                    input: e.$input,
                    adjustLeft: 0,
                    adjustTop: 0,
                    width: 368,
                    from: "search",
                    onSelect: function(t, i, o) {
                        e.search({
                            wd: t,
                            wd2: i,
                            extra: o,
                            from: "user"
                        })
                    }
                })
            }), t.async("common:widget/ui/tooltip/tooltip.js", function(t) {
                t.initialize(e.$rightButton)
            }), this.$rightButton.on("mouseenter", function(t) {
                t.stopPropagation()
            }), this.$el.on("click", ".route-button", function() {
                e.searchBox.setState("route", {
                    end: {
                        wd: e.$input.val()
                    }
                }), addStat("searchbox.sole.routebtn", "click"), $("#tooltip-route").remove(), T.cookie.set("routeiconclicked", "1", {
                    expires: new Date((new Date).getTime() + 31536e6)
                })
            }), this.$el.on("click", ".cancel-button", function() {
                listener.trigger("app", "reset"), r.clear(), e.resetInput(), e.reset()
            }), this.$el.on("click", ".input-clear", function() {
                e.resetInput()
            }), this.$input.on("keypress", function(t) {
                13 === t.keyCode && e.focusOrSearch()
            }), this.$input.on("keyup", function() {
                e.checkInputState()
            }).on("paste", function() {
                setTimeout(function() {
                    e.checkInputState()
                }, 100)
            })
        },
        focusOrSearch: function() {
            if (this.$input.val())
                if (window.mapDebugObjWxp) {
                    var t = this.analQuery(this.$input.val());
                    t ? this.debugSearchPoint(t) : this.search({
                        from: "user"
                    })
                } else this.search({
                    from: "user"
                });
            else this.focus()
        },
        focus: function() {
            this.$input.focus()
        },
        blur: function() {
            this.$input.blur()
        },
        unload: function(t) {
            this.reset(t), $("#tooltip-route").hide()
        },
        loading: function() {
            this.isLoading = !0, this.$loadingButton && this.$loadingButton.addClass("loading"), this.$clearButton.hide(), $("#tooltip-route").hide()
        },
        show: function() {
            this.$el && this.$el.show(), this.isShowing = !0, $("#tooltip-route").show()
        },
        resetInput: function() {
            this.$input.val(""), this.setClearButtonState(), this.$input.focus(), this.$input.keydown(), u.clear()
        },
        reset: function(t) {
            t || (r.removeCards("sole"), r.removeCards("poidetail"), this.isComplete && (map.clearOverlays(), map.showIndoor(null), map.resetSpotStatus(), this.processScenic3dMarker()), this.isComplete = !1, this.queryCardId = void 0, this.$el.removeClass("is-complete"), this.turnToRouteButton(), this.setClearButtonState(), u.clear())
        },
        checkInputState: function() {
            this.setClearButtonState(), this.$input.val() || this.reset()
        },
        setClearButtonState: function() {
            this.isComplete ? this.$clearButton.hide() : this.$input.val().trim() ? this.$clearButton.show() : this.$clearButton.hide()
        },
        turnToCancelButton: function() {
            this.$rightButton.removeClass("route-button").addClass("cancel-button").attr("data-title", "清空"), this.$clearButton.hide(), $("#tooltip-route").hide()
        },
        turnToRouteButton: function() {
            this.$rightButton.addClass("route-button").removeClass("cancel-button").attr("data-title", "路线"), $("#tooltip-route").show()
        },
        setData: function(t) {
            if (t.query)
                if (this.isComplete)
                    if ("cardId" in t) {
                        var e = r.get(t.cardId),
                            i = r.get(this.queryCardId);
                        (!i || e && i && e.cardLevel <= i.cardLevel) && (this.$input.val(t.query), this.queryCardId = t.cardId)
                    } else this.$input.val(t.query);
            else this.$input.val(t.query), this.queryCardId = t.cardId;
            ("cardId" in t || t.isComplete) && (this.isComplete = !0, this.$el.addClass("is-complete"), this.turnToCancelButton(), this.suggest && this.suggest.hide(), "cardId" in t && (r.addCardToGroup(t.cardId, "sole"), r.addCardToGroup(t.cardId, "result")))
        },
        getData: function() {
            var t = {
                wd: this.$input.val(),
                isComplete: this.isComplete,
                cards: this.cards
            };
            return t
        },
        buildQueryData: function(t) {
            var e = {
                wd: this.$input.val()
            };
            return e.da_src = "searchBox.button", T.extend(e, t)
        },
        getQuery: function(t) {
            var e = s.soleSearch(t);
            return e.code && this.focus(), e.query
        },
        preSearchFilter: function(e) {
            return "地铁" === e.wd || "地铁图" === e.wd || "地铁专题图" === e.wd || "地铁线路图" === e.wd || "地铁路线图" === e.wd ? (addStat("solesearchbox.metro", "click"), t.async("common:widget/com/Subway/SbwMgr.js", function(t) {
                t.init(!0)
            }), !0) : void 0
        },
        search: function(t) {
            if (t = this.buildQueryData(t), !this.preSearchFilter(t)) {
                var e = this.getQuery(t);
                t = t || {}, e && (t && "user" === t.from && addStat("solesearchbox.search", "click", {
                    wd: t.wd
                }), listener.trigger("solesearchbox.search"), a.go(e, {
                    cinfo: {
                        from: "searchBox"
                    }
                }))
            }
        },
        processScenic3dMarker: function() {
            if (map.temp.ifSupportWebGL) {
                var t = map.getZoom(),
                    e = map.temp.scenic3dMarkers;
                if (e)
                    for (var i = 0; i < e.length; i++) e[i].isHideZoomend === !0 && (e[i].isHideZoomend = !1, t >= 14 && map.addOverlay(e[i]))
            }
        },
        debugSearchPoint: function(t) {
            var e = this;
            d.getGEORevertAddress(t, function(t) {
                var i = t.result.x + "," + t.result.y;
                e.addMarker(i);
                var o = map.pointToPixel({
                    lng: t.result.x,
                    lat: t.result.y
                });
                window.contextMenu.showAt(o.x, o.y)
            })
        },
        analQuery: function(t) {
            var e = {},
                i = /^\d+[\d\.]?\d+(,\d+[\d\.]?\d+)*$/;
            if (t && t.match(i)) {
                var o = t.match(i)[0];
                return o && o.indexOf(",") > -1 && o.split(",")[0].match(/^\d+[\d\.]*\d+$/) && o.split(",")[1].match(/^\d+[\d\.]*\d+$/) ? (e.lng = o.split(",")[0], e.lat = o.split(",")[1], e) : !1
            }
            return !1
        },
        addMarker: function(t) {
            var e = c.getPoiPoint(t);
            if (e) {
                var i = new BMap.Icon(l.A_J_MARKER_IMG_NEW, l.A_J_MARKER_CENTERBLUE_SIZE, {
                        offset: l.A_J_MARKER_CENTERBLUE_OFFSET,
                        imageOffset: new BMap.Size(0, 193),
                        infoWindowOffset: l.A_J_MARKER_INFOWND_OFFSET,
                        imageSize: new BMap.Size(l.A_J_MARKER_IMG_NEW_WIDTH, l.A_J_MARKER_IMG_NEW_HEIGHT),
                        srcSet: l.A_J_MARKER_IMG_NEW2X_SRCSET
                    }),
                    o = 15,
                    n = new BMap.Marker(e, {
                        icon: i
                    });
                return map.addOverlay(n), map.centerAndZoom(e, o), n
            }
        }
    }), i.exports = o
});;
define("common:widget/ui/searchBox/RouteSearchbox.js", function(require, exports, module) {
    function RouteSearchbox(parent) {
        var template = [function(_template_object) {
            var _template_fun_array = [],
                fn = function(__data__) {
                    var _template_varName = "";
                    for (var name in __data__) _template_varName += "var " + name + '=__data__["' + name + '"];';
                    eval(_template_varName), _template_fun_array.push('<div id="route-searchbox-content" class="searchbox-content route-searchbox-content bus">    <div class="route-header">        <div class="searchbox-content-common route-tabs">    <div class="tab-item bus-tab" data-index="bus">        <i></i><span>公交</span>    </div>    <div class="tab-item drive-tab" data-index="drive">        <i></i><span>驾车</span>    </div>            <div class="tab-item walk-tab" data-index="walk">                <i></i><span>步行</span>            </div>    <div class="tab-item bike-tab" data-index="bike">        <i></i><span>骑行</span>    </div>            <div class="arrow-wrap"></div>        </div>        <div class="searchbox-content-button right-button cancel-button loading-button" data-title="关闭路线">        </div>    </div>    <div class="routebox">        <div class="searchbox-content-common routebox-content">            <div class="routebox-revert" title="切换起终点">                <div class="routebox-revert-icon">                </div>            </div>            <div class="routebox-inputs">                <div class="routebox-input route-start">                    <div class="route-input-icon">                    </div>                    <input autocomplete="off" maxlength="256" placeholder="输入起点或在图区上选点" class="route-start-input" type="text" value=""/>                    <div class="input-clear" title="清空">                    </div>                    <div class="route-input-add-icon">                    </div>                </div>                <div class="routebox-input route-end">                    <div class="route-input-icon">                    </div>                    <input autocomplete="off" maxlength="256" placeholder="输入终点" class="route-end-input" type="text" value=""/>                    <div class="input-clear" title="清空">                    </div>                </div>            </div>        </div>                    </div></div>'), _template_varName = null
                }(_template_object);
            return fn = null, _template_fun_array.join("")
        }][0];
        this.$el = T(template()), this.$tabs = this.$el.find(".route-tabs"), this.index = "bus", this.$startInput = this.$el.find(".route-start-input"), this.$endInput = this.$el.find(".route-end-input"), this.start = {}, this.end = {}, this.$tpInputs = [], this.tpList = [], this.inputFocusKey = "", this.bindEvents(), this.bindDOMEvents(), this.switchTab(this.index), T.cookie.get("routetype") && this.switchTab(T.cookie.get("routetype")), SearchboxInterface.apply(this, arguments)
    }
    var SearchboxInterface = require("common:widget/ui/searchBox/SearchboxInterface.js"),
        queryBuilder = require("common:widget/ui/queryBuilder/queryBuilder.js"),
        comMgr = require("common:widget/com/componentManager.js"),
        tpUtil = require("common:widget/ui/throughpoint/tpUtil.js"),
        mapUtil = require("common:widget/ui/mapUtil/mapUtil.js"),
        cardMgr = require("common:widget/ui/card/cardMgr.js"),
        toast = require("common:widget/ui/toast/toast.js"),
        ipLocation = require("common:widget/com/IpLocation/IpLocation.js"),
        constants = require("common:widget/ui/constant/Constant.js"),
        util = require("common:widget/ui/util/util.js");
    T.lang.inherits(RouteSearchbox, SearchboxInterface, "RouteSearchbox"), T.extend(RouteSearchbox.prototype, {
        bindEvents: function() {
            function t(t, n) {
                function i(t) {
                    var n = t.target.getPoint();
                    util.loadSearchInfo(function(i) {
                        var a = i.createSearchInfoWnd({
                            title: "start" === s ? e.startPointName : e.endPointName
                        }, {
                            x: n.lng,
                            y: n.lat,
                            isMenu: !0
                        });
                        i.openSearchInfoWnd(a, t.target, {
                            pano: !0,
                            panoPoint: n
                        }), a.addEventListener("open", function() {
                            i.switchInfoWndTab(0, "iw_ssn")
                        })
                    })
                }

                function a(t, n) {
                    var a = t.target,
                        s = 0 === n ? "start" : "end";
                    if (a) {
                        var o = a.point;
                        o && mapUtil.getGEORevertAddress(o, function(a) {
                            var o = a.content,
                                r = o.address;
                            0 === n ? (e.startPointName = r, window.startPoi.name = r) : (e.endPointName = r, window.endPoi.name = r);
                            var d = o.point && o.point.x + "," + o.point.y || "",
                                u = {
                                    wd: r,
                                    note: r,
                                    pt: d
                                },
                                p = {};
                            p[s] = u, e.setData(p), e.isOpenStartPoiInfoWindow && i(t), e.isOpenEndPoiInfoWindow && i(t)
                        })
                    }
                }
                if (!e.$startInput.val() || !e.$endInput.val()) {
                    var s = e.inputFocusKey,
                        o = {
                            wd: n.name,
                            note: n.name,
                            pt: n.pt
                        };
                    n.uid && (o.uid = n.uid);
                    var r = n.flag,
                        d = {};
                    if (d[s] = o, e.setData(d), "start" === s) {
                        if (e.startPointName = n.name, window.startPoi) {
                            var u = n.pt.split(",");
                            window.startPoi.setPoint(new BMap.Point(u[0], u[1]))
                        } else window.startPoi = mapUtil.addDestPoi(n.pt, constants.DEST_START, {
                            startAnimation: "marker-raise"
                        }), window.startPoi.enableDragging(), window.startPoi.addEventListener("click", i), window.startPoi.addEventListener("ondragstart", function() {
                            this.infoWindow && this.infoWindow.isOpen() ? (this.closeInfoWindow(), e.isOpenStartPoiInfoWindow = !0) : e.isOpenStartPoiInfoWindow = !1
                        }), window.startPoi.addEventListener("ondragend", function(t) {
                            a(t, 0)
                        });
                        window.startPoi.name = n.name, e.$startInput.val(n.name), "basemap" === r && addStat("routesearch.startpoint.basemap", "click"), "" === e.$endInput.val() ? (e.$endInput.focus(), baidu.dom.setAttr(e.$endInput, "placeholder", "输入终点或在图区上选点")) : (e.search({
                            from: "user"
                        }), "basemap" === r && addStat("routesearch.search.basemap"))
                    } else if ("end" === s) {
                        if (e.endPointName = n.name, window.endPoi) {
                            var u = n.pt.split(",");
                            window.endPoi.setPoint(new BMap.Point(u[0], u[1]))
                        } else window.endPoi = mapUtil.addDestPoi(n.pt, constants.DEST_END, {
                            startAnimation: "marker-raise"
                        }), window.endPoi.enableDragging(), window.endPoi.addEventListener("click", i), window.endPoi.addEventListener("ondragstart", function() {
                            this.infoWindow && this.infoWindow.isOpen() ? (this.closeInfoWindow(), e.isOpenEndPoiInfoWindow = !0) : e.isOpenEndPoiInfoWindow = !1
                        }), window.endPoi.addEventListener("ondragend", function(t) {
                            a(t, 1)
                        });
                        window.endPoi.name = n.name, e.$endInput.val(n.name), "basemap" === r && addStat("routesearch.endpoint.basemap", "click"), "" === e.$startInput.val() ? e.$startInput.focus() : "" !== T(".route-through-input").val() && (e.search({
                            from: "user"
                        }), "basemap" === r && addStat("routesearch.search.basemap"))
                    }
                }
            }
            var e = this;
            listener.on("ui.suggest", "show", function() {
                cardMgr.removeCards("route-index")
            }), listener.on("ipLocation.correct", function() {
                cardMgr.clear(), e.searchBox.setState("sole"), e.$startInput.keydown(), e.$endInput.keydown()
            }), listener.on("map.route.poimarker", "click", t), listener.on("map.route.base", "click", t), require.async("common:widget/ui/ui3MapSuggest/ui3MapSuggest.js", function(t) {
                t.initialize({
                    input: e.$startInput,
                    showMyPlace: !0,
                    isAutoWidth: !1,
                    left: 20,
                    width: 368,
                    from: "route",
                    onSelect: function(t, n) {
                        var i = {};
                        T.isObject(t) ? (i.note = t.name, i.pt = t.point, e.$startInput.val(t.name)) : (i.note = t, i._wd2 = n), e.start[e.index] = i, e.start.latest = i, e.checkInputState(e.$startInput), e.focusNextInputOrSearch()
                    },
                    onShowWrap: function(t) {
                        var e = $("#route-searchbox-content").height(),
                            n = 20;
                        t && t.css("top", e + n)
                    }
                }), t.initialize({
                    input: e.$endInput,
                    showMyPlace: !0,
                    isAutoWidth: !1,
                    left: 20,
                    width: 368,
                    from: "route",
                    onSelect: function(t, n) {
                        var i = {};
                        T.isObject(t) ? (i.note = t.name, i.pt = t.point, e.$endInput.val(t.name)) : (i.note = t, i._wd2 = n), e.end[e.index] = i, e.end.latest = i, e.checkInputState(e.$endInput), e.focusNextInputOrSearch()
                    }
                })
            }), tpUtil.addEventListener("tpremove", function(t) {
                e.removeTPInput(parseInt(t.index, 10))
            }), T.browser.ie || (e.$startInput.bind("input", function() {
                "" === $(this).val() && (e.inputFocusKey = "start", "" === e.$endInput.val() && e.$endInput.attr("placeholder", "输入终点"))
            }), e.$endInput.bind("input", function() {
                "" === $(this).val() && (e.inputFocusKey = "end", "" === e.$startInput.val() && (e.$startInput.attr("placeholder", "输入起点或在图区上选点"), e.$endInput.attr("placeholder", "输入终点"), e.$startInput.focus()))
            })), listener.on("ui.cardmgr", "removegroup", function(t, n) {
                "result" === n.group && e.isShowing && !cardMgr.getCards("route").length && (e.clearState(), e.showCards())
            })
        },
        bindDOMEvents: function() {
            var t = this;
            require.async("common:widget/ui/tooltip/tooltip.js", function(e) {
                e.initialize(t.$el.find(".cancel-button"))
            }), this.$el.on("click", ".route-input-add-icon", function() {
                t.addThroughInput()
            }), this.$el.on("click", ".route-input-remove-icon", function() {
                var e = this.getAttribute("data-index");
                t.removeThroughPoint(e), t.focusUpdateInDrive(e)
            }), this.$el.on("click", ".cancel-button", function() {
                listener.trigger("app", "reset"), cardMgr.clear(), t.searchBox.setState("sole"), t.$startInput.keydown(), t.$endInput.keydown()
            }), this.$el.on("click", ".tab-item", function() {
                var e = this.getAttribute("data-index");
                t.switchTab(e), addStat("navgation.nav." + e, "click", {})
            }), this.$el.on("click", ".routebox-revert", function() {
                t.revert()
            }), this.$el.on("keypress", "input[type=text]", function(e) {
                13 === e.keyCode && t.focusNextInputOrSearch()
            }), this.$el.on("keyup", "input[type=text]", function(e) {
                t.checkInputState(T(e.target))
            }).on("paste", function(e) {
                setTimeout(function() {
                    t.checkInputState(T(e.target))
                }, 100)
            }), this.$el.on("click", ".input-clear", function() {
                var e = T(this),
                    n = e.parents(".routebox-input"),
                    i = n.find("input[type=text]");
                "我的位置" === i.val() && addStat("clear.myplace"), i.val("").focus().keydown(), i.hasClass("route-start-input") ? "" === t.$endInput.val() && baidu.dom.setAttr(t.$endInput, "placeholder", "输入终点") : i.hasClass("route-end-input") && "" === t.$startInput.val() && (baidu.dom.setAttr(t.$startInput, "placeholder", "输入起点或在图区上选点"), baidu.dom.setAttr(t.$endInput, "placeholder", "输入终点"), t.$startInput.focus()), e.hide(), map.clearOverlays(), window.startPoi = null, window.endPoi = null
            }), this.$startInput.focus(function() {
                t.setInputFocusKey("start")
            }).change(function() {
                "我的位置" === t.$startInput.val() && "success" === ipLocation.status && t.$startInput.addClass("input-iploc"), "我的位置" !== t.$startInput.val() && "success" === ipLocation.status && t.$startInput.removeClass("input-iploc")
            }), this.$endInput.focus(function() {
                t.setInputFocusKey("end")
            }).change(function() {
                "我的位置" === t.$endInput.val() && "success" === ipLocation.status && t.$endInput.addClass("input-iploc"), "我的位置" !== t.$endInput.val() && "success" === ipLocation.status && t.$endInput.removeClass("input-iploc")
            })
        },
        clearState: function() {
            window.startPoi && map.removeOverlay(window.startPoi), window.startPoi = null, window.endPoi && map.removeOverlay(window.endPoi), window.endPoi = null, cardMgr.removeCards("route"), this.isComplete = !1, this.$startInput.val(""), this.$endInput.val(""), this.$tpInputs.forEach(function(t) {
                t.remove()
            }), this.$el.find(".route-input-add-icon").removeClass("hide"), this.$tpInputs = [], this.tpList = [], this.start = {}, this.end = {}, this.fromDetail = !1
        },
        reset: function() {
            this.clearState(), T.cookie.get("routetype") && this.switchTab(T.cookie.get("routetype"))
        },
        unload: function() {
            this.reset()
        },
        switchTab: function(t, e) {
            this.index !== t && (this.$el.removeClass(this.index), this.$el.addClass(t), this.index = t, listener.trigger("searchbox.height.change"), listener.trigger("searchbox.routeTypeChange", "click", {
                type: t
            }), !e && this.isComplete && this.search({
                from: "user",
                staticExpand: !0,
                reserveReturnCard: !0
            }), this.holdInputFocus())
        },
        revert: function() {
            var t = this.$startInput.val();
            "我的位置" === t && (this.$startInput.removeClass("input-iploc"), this.$endInput.addClass("input-iploc")), "我的位置" === this.$endInput.val() && (this.$startInput.addClass("input-iploc"), this.$endInput.removeClass("input-iploc")), this.$startInput.val(this.$endInput.val()), this.$endInput.val(t), "start" === this.inputFocusKey ? this.$endInput.focus() : "end" === this.inputFocusKey && this.$startInput.focus(), t = this.start, this.start = this.end, this.end = t, this.isComplete && this.search({
                staticExpand: !0,
                from: "user"
            })
        },
        show: function(t, e) {
            this.$el.show(), this.checkAllInputs(), this.fromDetail = e.fromDetail, t || this.isComplete || this.isShowing || e.fromDetail || this.showCards(), this.isShowing = !0, "success" !== ipLocation.status || this.$startInput.val() ? this.isComplete === !1 ? this.$startInput.focus() : this.setInputFocusKey("") : (this.$startInput.val("我的位置").addClass("input-iploc"), addStat("myplace.show"), this.$endInput.focus(), baidu.dom.setAttr(this.$endInput, "placeholder", "输入终点或在图区上选点"))
        },
        hide: function() {
            this.$el.hide(), this.isShowing = !1
        },
        addCards: function(t, e, n) {
            this.isShowing && (this.navCard && cardMgr.hasCard(this.navCard) || (this.navCard = new t, cardMgr.add(this.navCard), cardMgr.addCardToGroup(this.navCard.cardId, "route"), cardMgr.addCardToGroup(this.navCard.cardId, "route-index")), this.historyCard && cardMgr.hasCard(this.historyCard) || (this.needCreateHistory = !0, this.historyCard = new e, this.RouteNavDownloadBannerCard && cardMgr.hasCard(this.RouteNavDownloadBannerCard) || (this.RouteNavDownloadBannerCard = new n, this.needCreateHistory && (listener.on("ui.cardmgr", "add", this.addRouteNavDownloadBannerCard, this), listener.on("history.card.render.failed", function() {
                try {
                    this.RouteNavDownloadBannerCard && cardMgr.hasCard(this.RouteNavDownloadBannerCard) || (cardMgr.add(this.RouteNavDownloadBannerCard), cardMgr.addCardToGroup(this.RouteNavDownloadBannerCard.cardId, "route"), cardMgr.addCardToGroup(this.RouteNavDownloadBannerCard.cardId, "route-index"))
                } catch (t) {
                    "undefined" != typeof alog && alog("exception.fire", "catch", {
                        msg: t.message || t.description,
                        path: "common:widget/ui/searchBox/RouteSearchbox.js",
                        ln: 566
                    })
                }
            }, this))), cardMgr.add(this.historyCard), cardMgr.addCardToGroup(this.historyCard.cardId, "route"), cardMgr.addCardToGroup(this.historyCard.cardId, "route-index")))
        },
        addRouteNavDownloadBannerCard: function(t, e) {
            var e = e.card || {};
            this.needCreateHistory && e.cardLevel === this.historyCard.cardLevel && e.cardId === this.historyCard.cardId && (cardMgr.add(this.RouteNavDownloadBannerCard), cardMgr.addCardToGroup(this.RouteNavDownloadBannerCard.cardId, "route"), cardMgr.addCardToGroup(this.RouteNavDownloadBannerCard.cardId, "route-index"), this.needCreateHistory = !1, listener.off("ui.cardmgr", "add", this.addRouteNavDownloadBannerCard, this))
        },
        showCards: function() {
            var t = this;
            require.async(["common:widget/route/HistoryCard/HistoryCard.js", "common:widget/route/NavCard/NavCard.js", "common:widget/route/TrafficCard/TrafficCard.js", "common:widget/ui/ui3MapSuggest/downloadBanner.js"], function(e, n, i, a) {
                var s = new i,
                    o = cardMgr.add(s, {
                        top: !0
                    });
                o.then(function() {
                    t.addCards(n, e, a)
                }, function() {
                    t.addCards(n, e, a)
                }), cardMgr.addCardToGroup(s.cardId, "route"), cardMgr.addCardToGroup(s.cardId, "route-index")
            })
        },
        setData: function(t) {
            var e = this,
                n = t.start;
            if (t.type && this.switchTab(t.type, !0), n) {
                var i = n.wd || "";
                "我的位置" !== i && this.$startInput.removeClass("input-iploc"), this.$startInput.val(i), n.note = i, this.start.latest && i !== this.start.latest.note && (this.start = {}), this.start[this.index] = n, this.start.latest = n, this.$endInput.val() || this.focus(2)
            }
            var a = baidu.isArray(t.end) && t.end.length > 0 ? t.end[t.end.length - 1] : t.end;
            if (a) {
                var s = a.wd || "";
                "我的位置" !== s && this.$endInput.removeClass("input-iploc"), this.$endInput.val(s), a.note = s, this.end.latest && s !== this.end.latest.note && (this.end = {}), this.end[this.index] = a, this.end.latest = a, this.$startInput.val() || this.focus(1)
            }
            t.tpList && (this.clearThroughInput(), t.tpList.forEach(function(t) {
                e.addThroughInput(t)
            })), t.tp && (-1 === t.tp.index ? e.fillEmptyOrAddNewTpInput(t.tp.location) : e.changeTpInput(t.tp)), "cardId" in t && (e.isComplete = !0, cardMgr.addCardToGroup(t.cardId, "route"), cardMgr.addCardToGroup(t.cardId, "result")), t.doSearch && e.search(), this.checkAllInputs()
        },
        focusNextInputOrSearch: function() {
            this.$startInput.val() ? this.$endInput.val() ? this.search({
                from: "user"
            }) : (this.focus(2), this.$endInput.click()) : (this.focus(1), this.$startInput.click())
        },
        focus: function(t) {
            2 === t ? (this.$endInput.focus(), baidu.dom.setAttr(this.$endInput, "placeholder", "输入终点或在图区上选点")) : this.$startInput.focus()
        },
        getInputFocusKey: function() {
            return this.inputFocusKey
        },
        setInputFocusKey: function(t) {
            this.inputFocusKey = t
        },
        holdInputFocus: function() {
            switch (this.inputFocusKey) {
                case "start":
                    this.$startInput.focus();
                    break;
                case "end":
                    this.$endInput.focus()
            }
        },
        focusUpdateInDrive: function(t) {
            "" === this.$startInput.val() ? this.$startInput.focus() : "" === this.$endInput.val() ? this.$endInput.focus() : (t = parseInt(t, 10), t = 0 == t ? t + 1 : t, this.$tpInputs && this.$tpInputs.length > 0 && this.$tpInputs[t - 1].children("input").focus())
        },
        checkInputState: function(t) {
            var e = t.parents(".routebox-input"),
                n = e.find(".input-clear");
            t.val().trim() ? n.show() : n.hide()
        },
        checkAllInputs: function() {
            var t = this;
            this.checkInputState(this.$startInput), this.checkInputState(this.$endInput), this.$tpInputs.forEach(function(e) {
                t.checkInputState(e.find("input"))
            })
        },
        blur: function() {
            this.$startInput.blur(), this.$endInput.blur(), this.$tpInputs.forEach(function(t) {
                t.find("input").blur()
            })
        },
        isEmptyTp: function(t) {
            return void 0 === t.wd && void 0 === t.uid && void 0 === t.pt
        },
        changeTpInput: function(t) {
            this.$tpInputs[t.index] && (this.tpList[t.index] = t.location, this.$tpInputs[t.index].find("input").val(t.location.wd))
        },
        fillEmptyOrAddNewTpInput: function(t) {
            for (var e, n = !1, i = this, a = 0; a < this.$tpInputs.length; a++)
                if (!this.$tpInputs[a].find("input").val()) {
                    this.tpList[a] = t, this.$tpInputs[a].find("input").val(t.wd), n = !0, t.pt && (e = tpUtil.addTpMarker({
                        n: t.wd,
                        p: t.pt
                    }, a, map, !0, "marker-raise"));
                    break
                }
            n || (this.addThroughInput(t), t.pt && (e = tpUtil.addTpMarker({
                n: t.wd,
                p: t.pt
            }, this.tpList.length - 1, map, !0, "marker-raise"))), e && e.addEventListener("dragend", function(n) {
                mapUtil.getGEORevertAddress(n.point, function(n) {
                    if (n.content) {
                        var a = n.content;
                        t.wd = a.address, a.point && (t.pt = a.point.x + "," + a.point.y), e.setTitle(t.name), i.setData({
                            tp: {
                                index: e.__index,
                                location: t
                            }
                        })
                    }
                })
            })
        },
        addThroughInput: function(tp) {
            if (!(this.tpList.length >= 5) || tp) {
                var me = this,
                    template = [function(_template_object) {
                        var _template_fun_array = [],
                            fn = function(__data__) {
                                var _template_varName = "";
                                for (var name in __data__) _template_varName += "var " + name + '=__data__["' + name + '"];';
                                eval(_template_varName), _template_fun_array.push('<div class="routebox-input route-through">    <div class="route-input-icon">    </div>    <input autocomplete="off" maxlength="256" placeholder="输入途经点" class="route-through-input" type="text" value=""/>    <div class="input-clear" title="清空">    </div>    <div class="route-input-remove-icon" data-index="', "undefined" == typeof index ? "" : baidu.template._encodeHTML(index), '"></div></div>'), _template_varName = null
                            }(_template_object);
                        return fn = null, _template_fun_array.join("")
                    }][0];
                addStat("navscheme.navscheme.addtp", "click", {});
                var $throughBox = T(template({
                    index: this.tpList.length
                }));
                tp && (tp = this.transformTPFormat(tp));
                var $throughInput = $throughBox.find("input");
                return tp ? ($throughInput.val(tp.wd), tp.note = tp.wd) : tp = {}, this.tpList.push(tp), this.$el.find(".route-end").before($throughBox), listener.trigger("searchbox.height.change"), this.$el.find(".route-through").length >= 5 && this.$el.find(".route-input-add-icon").addClass("hide"), require.async("common:widget/ui/ui3MapSuggest/ui3MapSuggest.js", function(t) {
                    t.initialize({
                        input: $throughInput,
                        showMyPlace: !0,
                        isAutoWidth: !1,
                        left: 20,
                        width: 368,
                        from: "route",
                        onSelect: function(t, e) {
                            delete tp.wd, delete tp.pt, delete tp.note, delete tp._wd2, T.isObject(t) ? (tp.wd = t.name, tp.pt = t.point, $throughInput.val(t.name)) : (tp.note = t, tp._wd2 = e), me.checkInputState($throughInput), me.focusNextInputOrSearch()
                        },
                        onClose: function() {},
                        onShowWrap: function(t) {
                            var e = $("#route-searchbox-content").height(),
                                n = 20;
                            t && t.css("top", e + n)
                        }
                    })
                }), this.$tpInputs.push($throughBox), $throughInput.focus(), $throughInput
            }
        },
        transformTPFormat: function(t) {
            var e = t;
            return t.name && (e.wd = t.name), t.uid && (e.uid = t.uid), t.point && (e.pt = t.point), delete e.name, delete e.point, e
        },
        removeThroughPoint: function(t) {
            this.$el.find(".route-input-add-icon").removeClass("hide"), t = parseInt(t, 10), tpUtil.removeTp(t + 1)
        },
        clearThroughInput: function() {
            this.tpList = [], this.$tpInputs = [], this.$el.find(".route-through").remove()
        },
        removeTPInput: function(t) {
            this.tpList.splice(t, 1), this.$tpInputs[t].remove(), this.$tpInputs.splice(t, 1), this.$el.find(".route-input-remove-icon").each(function(t, e) {
                e.setAttribute("data-index", t)
            }), listener.trigger("searchbox.height.change")
        },
        processDirtyData: function(t, e) {
            var n = !1;
            return t.note && t.note !== e && (t = {}, n = !0), "我的位置" === e && "success" === ipLocation.status && (t = {
                note: "我的位置",
                pt: ipLocation.myPlace.point || "",
                uid: ""
            }), t.wd = e, {
                isDirty: n,
                point: t
            }
        },
        getData: function() {
            var t = {};
            t.da_src = "searchBox.button";
            var e = this.start[this.index] || this.start.latest || {},
                n = this.end[this.index] || this.end.latest || {},
                i = this.$startInput.val(),
                a = this.$endInput.val();
            this.start.latest && e && e.wd === this.start.latest.wd && (e.pt = this.start.latest.pt, e.uid = this.start.latest.uid), this.end.latest && n && n.wd === this.end.latest.wd && (n.pt = this.end.latest.pt, n.uid = this.end.latest.uid);
            var s = this.processDirtyData(e, i),
                o = this.processDirtyData(n, a);
            s.isDirty && (this.start = {}), this.start.latest = s.point, this.start[this.index] = s.point, o.isDirty && (this.end = {}), this.end.latest = o.point, this.end[this.index] = o.point;
            for (var r = [], d = 0; d < this.tpList.length; d++) this.tpList[d] = this.processDirtyData(this.tpList[d], this.$tpInputs[d].find("input").val()).point, this.tpList[d].wd && r.push(this.tpList[d]);
            var u = {
                start: s.point,
                end: o.point,
                index: this.index,
                tpList: this.tpList,
                sureTpList: r,
                isComplete: this.isComplete
            };
            return u = T.extend(t, u)
        },
        getQuery: function() {
            var t = this.getData();
            if ("success" !== ipLocation.status) {
                if ("我的位置" === this.$startInput.val()) return this.$endInput.focus(), baidu.dom.setAttr(this.$endInput, "placeholder", "输入终点或在图区上选点"), toast.show("暂时无法获取您的位置"), !1;
                if ("我的位置" === this.$endInput.val()) return this.$startInput.focus(), baidu.dom.setAttr(this.$startInput, "placeholder", "输入起点或在图区上选点"), toast.show("暂时无法获取您的位置"), !1;
                if (t.tpList && t.tpList.length > 0) {
                    var e = 0;
                    do
                        if ("我的位置" === t.tpList[e].wd) return this.$tpInputs[e].children("input").focus(), toast.show("暂时无法获取您的位置"), !1; while (++e < t.tpList.length)
                }
            }
            var n = queryBuilder.routeSearch(t);
            return n.code ? (2 === n.code || 1 === n.code ? this.focus(n.code) : 3 === n.code && toast.show("起终点不能完全相同"), !1) : n
        },
        search: function(t) {
            var e = this.getQuery();
            if (t = t || {}, e) {
                T.cookie.set("routetype", this.index, {
                    expires: new Date((new Date).getTime() + 6048e5)
                }), t && "user" === t.from && addStat("routesearchbox.search", "click");
                var n = e.query,
                    i = e.goext;
                i.staticExpand = t.staticExpand, i.cinfo || (i.cinfo = {}), i.cinfo.from = "searchBox", i.reserveReturnCard = !!this.fromDetail || t.reserveReturnCard, comMgr.go(n, i)
            }
        }
    }), module.exports = RouteSearchbox
});;
define("common:widget/ui/searchBox/searchBox.js", function(e, n, t) {
    var o, a, i = e("common:widget/ui/searchBox/SoleSearchbox.js"),
        c = e("common:widget/ui/util/util.js"),
        r = (e("common:widget/com/IpLocation/IpLocation.js"), T("#searchbox")),
        s = T(".input-clear"),
        u = T("#searchbox-container"),
        d = {},
        l = "sole",
        f = {
            initialize: function() {
                try {
                    var e = new Image;
                    e.src = "//webmap0.bdimg.com/wolfman/static/common/images/new/loading_4a096ed.gif", d[l] = new i(this, r.find("#sole-searchbox-content")), this.bindEvents()
                } catch (n) {
                    "undefined" != typeof alog && alog("exception.fire", "catch", {
                        msg: n.message || n.description,
                        path: "common:widget/ui/searchBox/searchBox.js",
                        ln: 33
                    })
                }
            },
            bindEvents: function() {
                var n = this;
                listener.on("loading", function(e) {
                    "start" === e ? n.loading() : n.endLoading()
                }), T("#search-button").click(function() {
                    if (a = n.getState().subData.wd, window.mapDebugObjWxp) {
                        var e = d[l].analQuery(a);
                        e ? d[l].debugSearchPoint(e) : n.search({
                            from: "user"
                        })
                    } else n.search({
                        from: "user"
                    })
                }), e.async("common:widget/ui/tooltip/tooltip.js", function(e) {
                    e.initialize(T("#search-button"))
                }), map.addEventListener("mousedown", function() {
                    n.blur()
                }), n.clearMarker()
            },
            clearMarker: function() {
                s.on("click", function() {
                    map.clearOverlays()
                })
            },
            setState: function(n, t, o) {
                var a = this;
                return o = o || {}, new Promise(function(i) {
                    if (d[n]) a.unloadAndInstantiate(n, t, o), i();
                    else if ("route" === n) {
                        var r = e("common:widget/ui/searchBox/RouteSearchbox.js");
                        a.unloadAndInstantiate(n, t, o, r), i()
                    } else e.async("common:widget/ui/searchBox/" + c.capitalize(n) + "Searchbox.js", function(e) {
                        a.unloadAndInstantiate(n, t, o, e), i()
                    })
                })
            },
            getState: function() {
                return {
                    state: l,
                    subData: d[l].getData()
                }
            },
            hasEmptyInput: function() {
                return "" === u.find(".route-start-input").val() || "" === u.find(".route-end-input").val()
            },
            unloadAndInstantiate: function(e, n, t, a) {
                if (o = l, l = e, o && o !== l && (d[o].hide(), d[o].unload(t.keepResult)), t.reset && d[l].reset(), t.resetInput && d[l].resetInput(), a) {
                    var i = new a(this);
                    d[l] = i, u.append(i.$el)
                }
                d[l].show(n && "cardId" in n, t), o !== l && listener.trigger("searchbox.height.change"), n && d[l].setData(n)
            },
            loading: function() {
                d[l].loading()
            },
            endLoading: function() {
                d[l].endLoading()
            },
            focus: function() {
                d[l].focus()
            },
            blur: function() {
                d[l].blur()
            },
            search: function(e) {
                listener.trigger("searchbox.search"), d[l].search(e)
            }
        };
    t.exports = f
});;
define("common:widget/ui/FilterStatus/FilterStatus.js", function(t, e, i) {
    var a = {
        active: !1,
        businessName: "",
        districtName: "",
        tag: "",
        PriceTag: ""
    };
    i.exports = a
});;
define("common:widget/view/BusSubLine/LineView.js", function(require, exports, module) {
    function LineView(data) {
        View.call(this), this.busStopTmpl = [function(_template_object) {
            var _template_fun_array = [],
                fn = function(__data__) {
                    var _template_varName = "";
                    for (var name in __data__) _template_varName += "var " + name + '=__data__["' + name + '"];';
                    eval(_template_varName), _template_fun_array.push("<div>    "), expandable && _template_fun_array.push('    <div class="fold-wrap">        <a class="fold" href="javascript:void(0)" map-on-click="hideBusLine">            <span >                途经站点            </span>        </a>    </div>    '), _template_fun_array.push('    <ol class="station-list ', "undefined" == typeof type ? "" : baidu.template._encodeHTML(type), '-list">        ');
                    for (var i = 0; i < stations.length; i++) {
                        if (_template_fun_array.push('              <li class="', "undefined" == typeof(i === stations.length - 1 ? "last-child" : "") ? "" : baidu.template._encodeHTML(i === stations.length - 1 ? "last-child" : ""), '">                  <a href="javascript:void(0)" data-busStopIndex="', "undefined" == typeof i ? "" : baidu.template._encodeHTML(i), '" class="street-view-point"></a>                  <div class="name-wrap">                      <a class="station-name" href="javascript:void(0)" data-busStopIndex="', "undefined" == typeof i ? "" : baidu.template._encodeHTML(i), '" map-on-click="selectBusStop">                          '), "sub" === type && stations[i].transfer ? _template_fun_array.push('                          <span class="station-transfer"></span>                          ') : _template_fun_array.push('                          <span class="station-seq">', "undefined" == typeof(i + 1) ? "" : baidu.template._encodeHTML(i + 1), "</span>                          "), _template_fun_array.push("                          ", "undefined" == typeof("nbus" === type ? ". " : "") ? "" : baidu.template._encodeHTML("nbus" === type ? ". " : ""), "", "undefined" == typeof stations[i].name ? "" : baidu.template._encodeHTML(stations[i].name), "                      </a>                      "), stations[i].subways) {
                            _template_fun_array.push("                      ");
                            var subways = stations[i].subways;
                            _template_fun_array.push("                      ");
                            for (var j = 0; j < subways.length; j++) _template_fun_array.push('                          <span class="subway-label" style="background:', "undefined" == typeof subways[j].background_color ? "" : baidu.template._encodeHTML(subways[j].background_color), '">', "undefined" == typeof subways[j].name ? "" : subways[j].name, "</span>                      ");
                            _template_fun_array.push("                      ")
                        }
                        _template_fun_array.push("                  </div>              </li>        ")
                    }
                    _template_fun_array.push("    </ol></div>"), _template_varName = null
                }(_template_object);
            return fn = null, _template_fun_array.join("")
        }][0], this.data = data
    }
    var View = require("common:widget/view/View.js");
    T.inherits(LineView, View, "LineView"), T.object.extend(LineView.prototype, {
        render: function() {
            try {
                return this.$el = this.busStopTmpl(this.data), this.$el
            } catch (e) {
                "undefined" != typeof alog && alog("exception.fire", "catch", {
                    msg: e.message || e.description,
                    path: "common:widget/view/BusSubLine/LineView.js",
                    ln: 19
                })
            }
        },
        initialize: function() {
            try {} catch (e) {
                "undefined" != typeof alog && alog("exception.fire", "catch", {
                    msg: e.message || e.description,
                    path: "common:widget/view/BusSubLine/LineView.js",
                    ln: 21
                })
            }
        }
    }), module.exports = LineView
});;
define("common:widget/ui/urlQueryProcessor/UrlQueryProcessor.js", function(n, e, o) {
    function t(n, e) {
        if (0 === n.err_no) {
            var o = n.data && n.data.dict_responses,
                r = o && o[0].values,
                c = r && r[0].hit_flag;
            if ("HIT" !== c) {
                var d = e.latlng.split(",")[1],
                    l = e.latlng.split(",")[0],
                    s = BMap.Project.convertLL2MC(new BMap.Point(d, l)),
                    u = new BMap.Marker(s);
                map.addOverlay(u), map.centerAndZoom(s, 17), f.setInfoWindow({
                    latlng: e.latlng,
                    autoOpen: e.autoOpen,
                    title: t.tit,
                    content: t.content
                }), e.autoOpen && "true" == e.autoOpen && i(u, s), u.addEventListener("click", function() {
                    a.iw && a.iw.isOpen() || i(u, s)
                })
            }
        }
    }

    function i(e, o) {
        n.async("common:widget/ui/searchInfoWindow/searchInfoWindow.js", function(n) {
            a.iw = n.createSearchInfoWnd({
                title: T.encodeHTML(t.tit),
                mingpian: T.encodeHTML(t.content)
            }, {
                cityCode: s.cityCode,
                x: o.lng,
                y: o.lat
            }), n.openSearchInfoWndPOI(a.iw, e)
        })
    }

    function a(n) {
        n = n || c.getParam(location.href);
        var e = n && n.title || "",
            o = n && n.content || "";
        n && n.latlng && (e || "" == e) && (o || "" == o) && (t.tit = c.filtQuery(decodeURIComponent(e)), t.content = c.filtQuery(decodeURIComponent(o)), r({
            confilterWords: [t.tit + " " + t.content]
        }, n))
    }

    function r(n, e) {
        for (var o = n.confilterWords, i = (n.callback, "/?qt=mandela"), a = [], r = 0; r < o.length; r++) a.push(encodeURIComponent(o[r]));
        baidu.jsonp(i + "&query=" + a.join("&"), function(n) {
            t(n, e)
        }, {
            cbtype: "cb"
        })
    }
    var c = n("common:widget/ui/util/util.js"),
        d = n("common:widget/com/componentManager.js"),
        l = n("common:widget/ui/config/config.js"),
        s = l.modelConfig,
        f = (l.mapConfig, n("common:widget/ui/urlManager/urlManager.js")),
        u = {
            processUrlQuery: function() {
                var n = window.location.search ? window.location.search.substr(1) : "";
                if (n) {
                    for (var e = n.split("&"), o = {}, t = 0, i = e.length; i > t; t++) {
                        var a = e[t].split("=");
                        try {
                            o[a[0]] = decodeURIComponent(a[1])
                        } catch (r) {
                            continue
                        }
                    }
                    var l = o.saddr || o.daddr,
                        f = c.filtQuery(o.saddr) || c.filtQuery(o.daddr);
                    if (l)
                        if (f) {
                            var u = o.ccode || s.cityCode;
                            if (c.filtQuery(o.saddr) && c.filtQuery(o.daddr)) {
                                var p = "t" == o.dirflag ? "bs" : "nav",
                                    m = encodeURIComponent("2$$$$$$" + o.saddr + "$$0$$$$"),
                                    g = encodeURIComponent("2$$$$$$" + o.daddr + "$$0$$$$");
                                d.go("bs" == p ? "bt&c=" + u + "&sn=" + m + "&en=" + g : "nav&c=" + u + "&sc=" + u + "&ec=" + u + "&sn=" + m + "&en=" + g + "&version=4&mrs=1&route_traffic=1")
                            } else d.go("s&wd=" + encodeURIComponent(f) + "&c=" + u, {
                                onload: function() {}
                            })
                        } else {
                            "d" == o.dirflag ? 3 : 2
                        }
                }
            },
            handleUrlExt: a
        };
    o.exports = u
});;
define("common:widget/ui/urlManager/urlManager.js", function(t, e, a) {
    var n = t("common:widget/ui/util/util.js"),
        o = t("common:widget/com/componentManager.js"),
        r = t("common:widget/ui/searchBox/searchBox.js"),
        i = (t("common:widget/ui/card/cardMgr.js"), t("common:widget/ui/fav/favMgr.js")),
        l = t("common:widget/com/Subway/SbwMgr.js"),
        u = "B_NORMAL_MAP",
        c = !1,
        s = !1,
        p = !1,
        d = !1,
        m = !1,
        f = !1,
        h = !1,
        y = [",", "$", ":", ";"],
        g = [",", "$", ":", ";", "+"],
        S = "百度地图",
        w = {
            auth: 1,
            t: 1,
            u_loc: 1,
            ie: 1
        },
        D = {
            s: 1,
            nb: 1,
            bd: 1,
            con: 1,
            cur: 1,
            bl: 1,
            cycle: 1,
            walk: 1,
            nav: 1,
            nse: 1,
            bt: 1,
            bse: 1,
            inf: 1
        },
        v = {
            init: function() {
                var t = window._appStateFromUrl;
                this.parseUrl(t), t.loc ? addStat("page.fromurl.loc", "show") : (t.loc = this.getCurrentLoc(), addStat("page.notfromurl", "show")), t.mapState && t.mapState.mapType && addStat("page.fromurl.maptype", "show"), this.urlData = {
                    loc: T.object.clone(t.loc),
                    mapState: {}
                }, this.reproduce(t, !0), this.changeUrl(!0), this.bindEvents()
            },
            bindEvents: function() {
                var t = this;
                map.addEventListener("zoomend", function() {
                    d || t.setZoom(map.getZoom()), d = !1
                }), map.addEventListener("moveend", function() {
                    p || t.setCenter(map.getCenter()), p = !1
                }), map.addEventListener("load", function() {
                    t.setCenter(map.getCenter()), t.setZoom(map.getZoom())
                }), map.addEventListener("tilt_changed", _.debounce(function() {
                    m || t.setTilt(map.getTilt()), m = !1
                }, 100)), map.addEventListener("heading_changed", _.debounce(function() {
                    f || t.setHeading(map.getHeading()), f = !1
                }, 100)), map.addEventListener("onmaptypechange", function(e) {
                    if (!c) {
                        var a = e.mapType;
                        t.setMapType(a)
                    }
                    c = !1
                }), listener.on("layer.traffic", "forecast", function() {
                    s || t.setMapLayer("trafficforecast"), s = !1
                }), listener.on("layer.traffic", "default", function() {
                    s || t.setMapLayer("trafficrealtime"), s = !1
                }), listener.on("index.controls", "close", function(e, a) {
                    a && "traffic" === a.target && (s || t.setMapLayer(), s = !1)
                }), listener.on("app", "reset", function() {
                    t.reset()
                }), window.onpopstate = function(e) {
                    var a = e.state;
                    a && t.reproduce(a)
                }
            },
            reset: function() {
                this.setFeature(), this.setTitle()
            },
            resetMapState: function() {
                var t = T.object.clone(this.urlData.mapState);
                return delete t.ccode, delete t.cname, delete t.index, delete t.autoOpen, delete t.latlng, delete t.title, delete t.content, t
            },
            parseUrl: function(t) {
                for (var e = location.pathname, a = e.match(/\/[^/]*/g), o = 0; o < a.length; o++) {
                    var r = a[o].substring(1);
                    if (0 === r.indexOf("@")) break;
                    0 === o ? t.feature = decodeURIComponent(r) : (t.wd || (t.wd = []), t.wd.push(decodeURIComponent(r)))
                }
                var i = n.getParam(location.search);
                if (i && i.querytype) {
                    var l = location.search.substring(1);
                    t.query = l
                }
            },
            filterAndModifyQuery: function(t) {
                for (var e in t) w[e] ? delete t[e] : t[e] = decodeURIComponent(t[e]);
                t.da_src = "shareurl"
            },
            setTitle: function(t) {
                if (t) {
                    if ("string" == typeof t) document.title = t + " - " + S;
                    else if (t.length) {
                        for (var e = t[0], a = 1; a < t.length; a++) e += a === t.length - 1 ? "至" : "途经", e += t[a];
                        document.title = e + " - " + S
                    }
                } else document.title = S
            },
            setFeature: function(t, e, a, o, r) {
                if (!t) return this.urlData.feature = void 0, this.urlData.wd = void 0, this.urlData.query = void 0, this.urlData.mapState = this.resetMapState(), void this.changeUrl(r);
                if ("string" == typeof e ? (e = decodeURIComponent(e), e = [e]) : e = $.isArray(e) ? T.object.clone(e) : void 0, o) {
                    var i;
                    i = o, i.ccode ? (o = {}, o.ccode = i.ccode, o.cname = i.cname) : void 0 !== i.index && (o = T.object.clone(this.urlData.mapState), o.index = parseInt(i.index, 10))
                }
                if (a) {
                    var l;
                    0 === a.indexOf("?") ? (l = n.getParam(a), l.qt && (l.querytype = l.qt)) : l = n.getParam("?querytype=" + a), delete l.qt, l.auth && delete l.auth, l.seckey && delete l.seckey, l.newfrom && delete l.newfrom, this.filterAndModifyQuery(l), a = n.jsonToQuery(l, encodeURIComponent, "nav" === l.querytype ? g : y)
                }
                this.urlData && (t !== this.urlData.feature || a !== this.urlData.query || !this.isWdSame(e, this.urlData.wd) || this.findMapStateDiff(o, this.urlData.mapState)) && (this.urlData.feature = t, this.urlData.query = a, this.urlData.wd = e, o && (this.urlData.mapState = o), this.urlData.mapState.title && (delete this.urlData.mapState.title, delete this.urlData.mapState.content, delete this.urlData.mapState.latlng, delete this.urlData.mapState.autoOpen), this.changeUrl(r))
            },
            setCenter: function(t) {
                this.urlData.loc.x = t.lng, this.urlData.loc.y = t.lat, this.changeUrl(!0)
            },
            setZoom: function(t) {
                this.urlData.loc.z = parseFloat(t.toFixed(2)), this.changeUrl(!0)
            },
            setTilt: function(t) {
                this.urlData.loc.t = parseFloat(t.toFixed(2)), this.changeUrl(!0)
            },
            setHeading: function(t) {
                this.urlData.loc.h = parseFloat(t.toFixed(2)), this.changeUrl(!0)
            },
            setMapType: function(t) {
                t === u ? delete this.urlData.mapState.mapType : this.urlData.mapState.mapType = t, this.changeUrl()
            },
            setMapLayer: function(t) {
                t ? this.urlData.mapState.mapLayer = t : this.urlData.mapState && delete this.urlData.mapState.mapLayer, this.changeUrl()
            },
            setInfoWindow: function(t) {
                var e = this.urlData.mapState;
                e.latlng = t.latlng, e.title = t.title, e.content = t.content, e.autoOpen = t.autoOpen, this.changeUrl()
            },
            reproduce: function(e, a) {
                var h = this.diff(e);
                if (h.feature === !1 && (r.setState("sole", null, {
                        reset: !0,
                        resetInput: !0
                    }), l.sbwInst && l.unload(!0)), (e.feature || h.query) && window.GRControll && GRControll.clearListener(), h.loc && (h.loc.x && (p = !0, map.panTo(new BMap.Point(h.loc.x, h.loc.y), {
                        noAnimation: !0
                    })), h.loc.z && (d = !0, map.zoomTo(h.loc.z, null, {
                        noAnimation: !0
                    })), (h.loc.t === !1 || h.loc.t) && (m = !0, map.setTilt(h.loc.t || 0, {
                        noAnimation: !0
                    })), (h.loc.h === !1 || h.loc.h) && (f = !0, map.setHeading(h.loc.h || 0, {
                        noAnimation: !0
                    }))), h.mapState && (h.mapState.mapType === !1 && (c = !0, p = !0, d = !0, map.setMapType(u)), h.mapState.mapType && (c = !0, map.setMapType(h.mapState.mapType)), h.mapState.mapLayer === !1 && (s = !0, window.trafficCtrl && window.trafficCtrl.close()), h.mapState.mapLayer && (s = !0, window.trafficCtrl ? (window.trafficCtrl.open(), "trafficforecast" === h.mapState.mapLayer ? window.trafficCtrl.switchInfo("forecast") : "trafficrealtime" === h.mapState.mapLayer && window.trafficCtrl.switchInfo("default")) : T(".trafficopt").click(), a && addStat("page.fromurl.maplayer", "show")), h.mapState.title && (t.async(["common:widget/ui/urlQueryProcessor/UrlQueryProcessor.js"], function(t) {
                        t.handleUrlExt(h.mapState)
                    }), a && addStat("page.fromurl.shareinfowindow", "show"))), "fav" === h.feature) i.openPanel({
                    noPushState: !0
                }), r.setState("sole", null, {
                    reset: !0,
                    resetInput: !0
                }), a && addStat("page.fromurl.fav", "show");
                else if ("poi" === e.feature && h.query) {
                    var y = n.getParam("?" + h.query);
                    if (y && y.uid) {
                        var g = ["74a087c722bff31b3be4a6d5", "15c9bd81a5d3a15e4107c183"];
                        if (-1 !== g.indexOf(y.uid)) return void window.location.replace("https://map.baidu.com");
                        t.async(["common:widget/ui/clickcity/ClickCity.js"], function(t) {
                            t.sendUidRequest(y.uid, {
                                noPushState: !0,
                                isReturn: !0
                            })
                        })
                    } else y && y.poiShareId && (o.start_event = (new Date).getTime(), o.load("PoiShare", {
                        poiShareId: y.poiShareId,
                        noPushState: !0
                    }, function() {}));
                    a && addStat("page.fromurl.poi", "show")
                } else if ("subway" === e.feature && h.mapState) l.init(!1, h.mapState, !0), a && addStat("page.fromurl.subway", "show");
                else if (e.feature && h.query) {
                    var S = h.query,
                        w = n.getParam("?" + S),
                        v = decodeURIComponent(w.querytype);
                    if (D[v]) {
                        delete w.querytype, "bl" === v && (v = "s");
                        var U = this.buildQueryString(v, w);
                        if (h.mapState && h.mapState.index) var C = {
                            index: parseInt(h.mapState.index, 10),
                            _index: parseInt(h.mapState.index, 10)
                        };
                        o.go(U, {
                            fromUrl: a ? !0 : !1,
                            noPushState: !0,
                            cinfo: C
                        }), a && addStat("page.fromurl." + e.feature, "show")
                    } else delete e.feature, delete e.query, delete e.wd
                }
                this.urlData = e
            },
            diff: function(t) {
                var e = {},
                    a = this.findLocDiff(t.loc, this.urlData.loc);
                a && (e.loc = a);
                var n = this.findMapStateDiff(t.mapState, this.urlData.mapState);
                return n && (e.mapState = n), this.isWdSame(t.wd, this.urlData.wd) || (e.wd = T.object.clone(t.wd) || !1), t.feature !== this.urlData.feature && (e.feature = t.feature || !1), t.query !== this.urlData.query && (e.query = t.query || !1), e
            },
            findLocDiff: function(t, e) {
                var a = {},
                    n = !1;
                return (t.x !== e.x || t.y !== e.y) && (n = !0, a.x = t.x, a.y = t.y), t.z !== e.z && (n = !0, a.z = t.z), t.t !== e.t && (n = !0, a.t = t.t || !1), t.h !== e.h && (n = !0, a.h = t.h || !1), n ? a : !1
            },
            findMapStateDiff: function(t, e) {
                if ((void 0 === t || null === t) && t === e) return !1;
                t = t || {};
                var a = {},
                    n = !1;
                return t.mapType !== e.mapType && (n = !0, a.mapType = t.mapType || !1), t.mapLayer !== e.mapLayer && (n = !0, a.mapLayer = t.mapLayer || !1), t.cname !== e.cname && (n = !0, a.cname = t.cname || !1), t.ccode !== e.ccode && (n = !0, a.ccode = t.ccode || !1), t.index !== e.index && (n = !0, a.index = t.index || !1), t.title !== e.title && (n = !0, a.title = t.title || !1, a.content = t.content || !1, a.latlng = t.latlng || !1, a.autoOpen = t.autoOpen || !1), n ? a : !1
            },
            isWdSame: function(t, e) {
                return t && e ? t.toString() === e.toString() : t || e ? !1 : !0
            },
            changeUrl: function(t) {
                var e = this.buildUrl(),
                    a = this.makeScreenshot();
                t ? history.replaceState(a, null, e) : h ? history.pushState(a, null, e) : history.replaceState(a, null, e), h = !0
            },
            getCurrentLoc: function() {
                var t = map.getCenter();
                return {
                    x: t.lng,
                    y: t.lat,
                    z: map.getZoom(),
                    h: map.getHeading() ? map.getHeading() : null,
                    t: map.getTilt() ? map.getTilt() : null
                }
            },
            makeScreenshot: function() {
                var t = {};
                return this.urlData.loc && (t.loc = T.object.clone(this.urlData.loc)), this.urlData.mapState && (t.mapState = T.object.clone(this.urlData.mapState)), this.urlData.wd && (t.wd = T.object.clone(this.urlData.wd)), this.urlData.feature && (t.feature = this.urlData.feature), this.urlData.query && (t.query = this.urlData.query), t
            },
            buildQueryString: function(t, e) {
                for (var a in e) e[a] = decodeURIComponent(e[a]);
                return encodeURIComponent(t) + "&" + n.jsonToQuery(e, encodeURIComponent, "nav" === t ? g : y)
            },
            buildUrl: function() {
                var t = "";
                if (this.urlData.feature && (t += "/" + encodeURIComponent(this.urlData.feature)), this.urlData.wd) {
                    var e = _.map(this.urlData.wd, function(t) {
                        return encodeURIComponent(t)
                    }).join("/");
                    t += "/" + e
                }
                if (this.urlData.loc) {
                    var a = this.buildLocUrl(this.urlData.loc);
                    t += "/@" + a
                }
                var n = this.buildMapStateUrl(this.urlData.mapState);
                return n && (t += "/" + encodeURIComponent(n)), this.urlData.query && (t += "?" + this.urlData.query), t
            },
            buildLocUrl: function(t) {
                var e = encodeURIComponent(t.x) + "," + encodeURIComponent(t.y);
                return t.z && (e += "," + encodeURIComponent(t.z + "z")), t.t && (e += "," + encodeURIComponent(t.t + "t")), t.h && (e += "," + encodeURIComponent(t.h + "h")), e
            },
            buildMapStateUrl: function(t) {
                var e = [];
                return ("B_EARTH_MAP" === t.mapType || "B_SATELLITE_MAP" === t.mapType) && e.push("maptype=" + t.mapType), t.mapLayer && e.push("maplayer=" + encodeURIComponent(t.mapLayer)), t.ccode && e.push("ccode=" + encodeURIComponent(t.ccode)), t.cname && e.push("cname=" + encodeURIComponent(t.cname)), t.index && e.push("index=" + encodeURIComponent(t.index)), t.latlng && e.push("latlng=" + encodeURIComponent(t.latlng)), t.title && e.push("title=" + encodeURIComponent(t.title)), t.content && e.push("content=" + encodeURIComponent(t.content)), t.autoOpen && e.push("autoOpen=" + encodeURIComponent(t.autoOpen)), e.join("&")
            }
        };
    a.exports = v
});