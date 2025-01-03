define("pano:widget/module/PanoLoading/PanoLoading.js", function(e, n, i) {
    function o(e, n) {
        if (e = t(n, e), e && e.panoid && e.panotype) {
            var i = "//webmap1.bdimg.com/wolfman/static/pano/images/pano_whole/pano_loading_24c94ab.gif",
                o = document.body.clientWidth,
                a = document.body.clientHeight,
                d = document.createElement("div");
            d.id = "pano_loading_mask";
            var p = {
                position: "absolute",
                left: "0px",
                top: "0px",
                zIndex: 99999999,
                width: o + "px",
                height: a + "px",
                background: "#fff"
            };
            for (var l in p) d.style[l] = p[l];
            d.innerHTML = '<img src="' + i + '" width="84px" height="55px" style="position:absolute; top:50%; left:50%; margin-left:-42px; margin-top:-55px;" />', document.body.appendChild(d)
        }
    }

    function t(e, n) {
        if (e.indexOf("#") > -1) {
            var i = e.slice(e.indexOf("#") + 1);
            if ("" != i)
                for (var o = i.split("&"), t = 0; t < o.length; t++) {
                    var a = o[t].split("=");
                    if (a[1]) {
                        var d = a[1].indexOf("#");
                        a[1] = d > -1 ? a[1].slice(0, d) : a[1], n[a[0]] = a[1]
                    }
                }
        }
        return n
    }

    function a() {
        var e = document.getElementById("pano_loading_mask");
        e && document.body.removeChild(e)
    }
    i.exports = {
        createMask: o,
        removeMask: a
    }
});;
define("pano:widget/PanoUtil/PanoUtil.js", function(o, e, t) {
    var i = (window.Pano = window.Pano || {}, {
        panoType: "",
        isOpen: !1,
        closePano: function(o, e) {
            window.streetViewTool && window.streetViewTool.isOpen && !e && window.streetViewTool.resetStatus(), o && "tool" == o && window.streetViewTool && window.streetViewTool.setStatus()
        },
        hide: function() {
            this.closePano()
        },
        clearStatus: function() {
            window.streetViewTool && window.streetViewTool.resetStatus()
        },
        isPanoStatus: function() {
            return window.streetViewTool && window.streetViewTool.isOpen || this.isOpen ? !0 : !1
        },
        revert: function() {}
    });
    t.exports = i
});;
define("pano:widget/base/CatalogMap.js", function() {
    var a = ["其他", "正门", "房型", "设施", "正门", "餐饮设施", "其他设施", "正门", "设施", "观影厅", "其他设施"],
        n = [0, 1, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 4, 5, 5, 5, 6, 6, 7, 8, 8, 8, 9];
    return {
        getCatalogInfo: function(e) {
            var t = n[1 * e] || 0;
            return {
                id: t,
                label: a[t]
            }
        }
    }
});;
define("pano:widget/base/util.js", function(e, n, t) {
    var o = e("common:widget/ui/config/config.js"),
        r = e("common:widget/ui/mapUtil/mapUtil.js"),
        a = o.modelConfig,
        i = function() {},
        u = /<[^>]*>|<\/[^>]*>/gm,
        c = {
            trim: function() {
                return String.prototype.trim ? function(e) {
                    return e.trim()
                } : function(e) {
                    return e.replace(/(^\s*)|(\s*$)/g, "")
                }
            }(),
            converToArray: function(e) {
                var n = c.each(e, function(e) {
                    return e
                }, !0);
                return n
            },
            getUniqueId: function() {
                var e = 1;
                return function(n, t) {
                    n ? "number" == typeof n ? (t = n, n = "_$unique_id_") : "undefined" == typeof t && (t = 1) : (t = 1, n = "_$unique_id_");
                    var o = c.each(new Array(t || 1), function(t, o) {
                        return n + (e + o)
                    }, !0);
                    return e += t || 1, 1 === o.length ? o[0] : o
                }
            }(),
            log: function() {
                return console ? function() {
                    console.log.apply(console, arguments)
                } : i
            }(),
            merge: function() {
                for (var e = c.converToArray(arguments), n = {}, t = 0, o = e.length; o > t; t++) {
                    var r = e[t] || {};
                    for (var a in r) r.hasOwnProperty(a) && (n[a] = r[a])
                }
                return n
            },
            getRandom: function() {
                var e = 0;
                return function() {
                    return "_$rid" + e++
                }
            }(),
            each: function(e, n, t) {
                var o, r, a = [],
                    i = e.length;
                if (t) {
                    for (r = 0; i > r && (o = n.call(e, e[r], r, a), void 0 !== o && a.push(o), o !== !0); r++);
                    return a
                }
                for (r = 0; i > r && n.call(e, e[r], r) !== !0; r++);
                return void 0
            },
            some: function(e, n) {
                for (var t = 0, o = e.length; o > t; t++)
                    if (n(e[t], t) === !0) return !0;
                return !1
            },
            isIE: function() {
                return !1
            },
            setOpacity: function(e, n) {
                e.style.opacity = n
            },
            showDetail: function(e, n, t, o, r, a, i, u) {
                window.place.showDetail(e, n, t, o, r, a, i, u)
            },
            getSearchResultFromUrl: function(e) {
                var n = new T.Deferred;
                return T.ajax(e, {
                    dataType: "json",
                    success: function(t) {
                        return t && t.result ? void n.resolve(t, e) : void n.resolve(null)
                    },
                    error: function() {
                        n.resolve(null)
                    }
                }), n
            },
            getImage3DUrl: function(e, n, t, r, a, i, u) {
                e = e || o.urlConfig.PANO_3DIMAGE_URL;
                var c = encodeURIComponent(window.AUTH) || "",
                    s = encodeURIComponent(window.SECKEY) || "",
                    l = "PC",
                    d = "{baseURL}/?qt=pr3d&fovy={fovy}&quality=80&panoid={panoId}&heading={panoHeading}&pitch={panoPitch}&width={width}&height={height}&from={from}&auth={auth}&seckey={seckey}",
                    p = {
                        baseURL: e,
                        panoId: n,
                        panoHeading: t || 0,
                        panoPitch: r || 0,
                        width: a,
                        height: i,
                        fovy: u || 35,
                        from: l,
                        auth: c,
                        seckey: s
                    };
                return d.replace(/\{(.*?)\}/g, function(e, n) {
                    return p[n]
                })
            },
            getBusLineInfoFromPCMap: function(e, n) {
                function t(e, n, t) {
                    var r = 0,
                        a = null,
                        i = 1 / 0,
                        u = "";
                    return c.each(e, function(e) {
                        a = o(e.geo), r = Math.pow(a.x - n, 2) + Math.pow(a.y - t, 2), i > r && (i = r, u = e.uid)
                    }), u
                }

                function o(e) {
                    var n = e.split("|")[2].split(";")[0],
                        t = n.split(",");
                    return {
                        x: t[0],
                        y: t[1]
                    }
                }
                var r = window.componentManager.get("PoiSearch"),
                    a = "",
                    i = "",
                    u = window.componentManager.get("BusLines");
                return u && u.json && u.json.content && u.json.content[0] && (a = t(currentComponent.json.content[0].stations, e, n), i = u.json.content[0].uid), r && r.searchController && r.searchController.modules && r.searchController.modules.length > 0 && c.some(r.searchController.modules, function(o) {
                    return o.selectLine === !0 && 1 == o.active ? (a = t(o.curStops, e, n), i = o.data.uid, !0) : void 0
                }), i && a ? {
                    buslineUid: i,
                    closestBusStationUid: a
                } : null
            },
            getSearchResultFromPCMap: function(e) {
                var n = window.componentManager.get("PoiSearch") || window.componentManager.get("SearchInView");
                if (!n) return null;
                var t = n.modelQuery,
                    o = location.pathname,
                    r = map.getBounds(),
                    i = "&l=" + map.getZoom(),
                    u = "";
                if (document.location.href.indexOf("format=1") > -1 && (u = "&format=1"), t.indexOf("&l=") > -1 && (i = ""), t = t.replace(/%3C/gi, encodeURIComponent(" ")).replace(/%3E/gi, encodeURIComponent(" ")) + "&tn=" + map.mapType, t.indexOf("&nn=") < 0 && (t += "&nn=0"), t.indexOf("b=(") > -1) t = o + a.DATA_URL + t + u + "&ie=utf-8" + i + "&t=" + (new Date).getTime();
                else {
                    var c = Math.min(r.minX, r.maxX),
                        s = Math.max(r.minX, r.maxX),
                        l = Math.min(r.minY, r.maxY),
                        d = Math.max(r.minY, r.maxY);
                    t = o + a.DATA_URL + t + u + "&ie=utf-8" + i + "&b=(" + c + "," + l + ";" + s + "," + d + ")&t=" + (new Date).getTime()
                }
                var p = null;
                if (e) {
                    var f = null;
                    for (var m in e) f = m + "=" + e[m], t.indexOf(m + "=") > -1 ? (p = new RegExp(m + "=[^&]+", "g"), t = t.replace(p, f)) : t += "&" + f
                }
                var h = new T.Deferred;
                return T.ajax(t, {
                    dataType: "json",
                    success: function(e) {
                        return e && e.result ? (!e.content || 2 != e.content[0].poiType && 4 != e.content[0].poiType || (e.busLineUid = e.content[0].uid), void h.resolve(e, t)) : void h.resolve(null)
                    },
                    error: function() {
                        h.resolve(null)
                    }
                }), h
            },
            getCurrentCityByArea: function(e, n, t, o, r) {
                var a = (new Date).getTime(),
                    i = e + "," + n + ";" + t + "," + o;
                baidu.ajax("/?newmap=1&qt=ncent&ie=utf-8&b=" + i + "&l=16&t=" + a, {
                    dataType: "json",
                    success: function(e) {
                        if (e && e.content && e.current_city) {
                            return void r(e)
                        }
                    },
                    error: function() {}
                })
            },
            hasRouteVideo: function() {
                function e() {
                    T.jsonp(t, function(e) {
                        if (e)
                            for (var t = 0, o = e.length; o > t; t++)
                                if (r == e[t].cityCode) return void n.resolve(!0);
                        n.resolve(!1)
                    })
                }
                var n = new T.Deferred,
                    t = "/?newmap=1&qt=panoRouteVideo",
                    o = window.currentComponent,
                    r = a.cityCode;
                return o && "NavTrans" == o.name ? o.tpList.length > 0 ? n.resolve(!1) : o.sCity.code == o.eCity.code ? e() : this.getUpCity(o.sCity.cname, o.eCity.cname).then(function(t, o) {
                    t.upCityCode == o.upCityCode ? e() : n.resolve(!1)
                }) : n.resolve(!1), n
            },
            getUpCity: function() {
                function e(e) {
                    var n = encodeURIComponent(window.AUTH) || "",
                        t = encodeURIComponent(window.SECKEY) || "",
                        o = new T.Deferred,
                        r = "newmap=1&refer=pano&auth=" + n + "&seckey=" + t + "&wd=" + encodeURI(e);
                    return baidu.ajax("/?qt=s", {
                        method: "get",
                        dataType: "json",
                        data: r,
                        success: function(e) {
                            try {
                                e.result.auth && (window.AUTH = e.result.auth)
                            } catch (n) {
                                console.log(n)
                            }
                            var t = e && e.current_city ? e.current_city : null;
                            o.resolve(t)
                        }
                    }), o
                }
                for (var n = new T.Deferred, t = Array.prototype.slice, o = [], r = t.call(arguments), a = [], i = 0, u = r.length; u > i; i++) a.push(e(r[i]));
                var c = T.when.apply(null, a);
                return c.then(function() {
                    for (var e = t.call(arguments), r = 0, a = e.length; a > r; r++) {
                        var i = e[r];
                        o.push(i ? {
                            upCityCode: i.up_cityid ? i.up_cityid : i.code
                        } : {
                            upCityCode: null
                        })
                    }
                    n.resolve.apply(null, o)
                }), n
            },
            getRouteVideoParamFromPCMap: function(e) {
                var n = new T.Deferred;
                if ("NavTrans" == currentComponent.name) {
                    for (var t = o.urlConfig.PANO_ROUTE_VIDEO_URL, r = o.urlConfig.PANO_VIDEO_SERVER_URL, a = o.urlConfig.PANO_3DIMAGE_URL, i = null, u = 0, s = e.length; s > u; u++)
                        if (e[u].src) {
                            i = e[u];
                            break
                        }
                    var l = i ? i.src.replace("?qt=pr3d", "?qt=share").replace("&width=196&height=100", "") : "",
                        d = currentComponent.getPanoNavParams(),
                        p = {
                            currentCity: d.currentCity,
                            sc: d.sc,
                            ec: d.ec,
                            strategy: d.strategy,
                            drag: -1,
                            day: d.day,
                            bound: d.bound,
                            t: (new Date).getTime(),
                            time_index: d.time_index,
                            extinfo: d.extinfo,
                            start: encodeURI(d.start),
                            end: encodeURI(d.end),
                            level: d.level,
                            et: -1,
                            st: -1,
                            udt: "201400616",
                            qt: "routeVideo",
                            id: 0
                        };
                    c.each(window.currentComponent.navListViews || [], function(e, n) {
                        return e.isActive === !0 ? (p.id = n, !0) : void 0
                    });
                    var f = window.componentManager.getLastSearchTime("nav"),
                        m = document.cookie.match(/BAIDUID=([^;]*)/);
                    m = m[1] ? m[1].replace(/[\W]/g, "_") : "", p.key = m + "_" + f;
                    var h = new T.Deferred;
                    if (p.sc != p.ec) {
                        var v = currentComponent;
                        this.getUpCity(v.sCity.cname, v.eCity.cname).then(function(e, n) {
                            p.sc = e.upCityCode, p.ec = n.upCityCode, h.resolve()
                        })
                    } else h.resolve();
                    var g = encodeURIComponent(window.AUTH) || "",
                        w = encodeURIComponent(window.SECKEY) || "";
                    return h.then(function() {
                        var e = {
                            imageUrl: l,
                            videoParam: t + "/?" + T.url.jsonToQuery(p),
                            playerUrl: "/wolfman/static/pano/swf/pano_whole/StreetscapePlayer_4d43cc9.swf",
                            offsetLeft: 314,
                            errorImageUrl: "//webmap0.bdimg.com/wolfman/static/pano/images/pano_whole/img_error_be87014.png",
                            videoServerUrl: r + "/?qt=video",
                            imageServerUrl: a + "?newmap=1&qt=pr3d&from=PC&auth=" + g + "&seckey=" + w
                        };
                        n.resolve(e)
                    }), n
                }
            },
            copy: function(e, n) {
                var t = typeof e;
                if (t = t.toLowerCase(), T.isArray(e)) return c.each(e, function(e) {
                    return c.copy(e, n)
                }, !0);
                if (T.isObject(e)) {
                    var o, r = {};
                    for (var a in e) o = n ? a.toLowerCase() : a, r[o] = c.copy(e[a], n);
                    return r
                }
                return e
            },
            bind: function(e, n) {
                return function() {
                    e.apply(n, arguments)
                }
            },
            clearTag: function(e) {
                return e ? e.replace(u, "") : ""
            },
            parse2Geo: function(e) {
                return r.parse2Geo(e)
            },
            getPointFromGeoStr: function(e) {
                var n = e.split("|");
                if ("1" !== n[0]) return null;
                var t = n[2].split(";")[0];
                return t = t.split(","), new BMap.Point(t[0], t[1])
            },
            getAngleFromP2P: function(e, n) {
                var t = e,
                    o = 180 * Math.atan(Math.abs((n.x - t.x) / (n.y - t.y))) / Math.PI;
                return n.x >= t.x && n.y <= t.y && (o = 180 - o), n.x <= t.x && n.y <= t.y && (o = 180 + o), n.x <= t.x && n.y >= t.y && (o = 360 - o), o
            },
            getDomSize: function(e) {
                var n = e.parentNode,
                    t = e.nextSibling,
                    o = document.createElement("div");
                o.style.cssText = "position:absolute;top:-9999px;left:-9999px", n.removeChild(e), o.appendChild(e), document.body.appendChild(o);
                var r = e.offsetWidth,
                    a = e.offsetHeight;
                return o.removeChild(e), n.insertBefore(e, t), document.body.removeChild(o), {
                    width: r,
                    height: a
                }
            },
            parseUrlParam: function(e) {
                if (e.indexOf("?") > -1) var n = e.slice(e.indexOf("?") + 1);
                else {
                    if (!(e.indexOf("#") > -1)) return;
                    var n = e.slice(e.indexOf("#") + 1)
                }
                if ("" != n) {
                    for (var t = {}, o = n.split("&"), r = 0; r < o.length; r++) {
                        var a = o[r].split("=");
                        if (a[1]) {
                            var i = a[1].indexOf("#");
                            a[1] = i > -1 ? a[1].slice(0, i) : a[1], t[a[0]] = a[1]
                        }
                    }
                    return t
                }
            },
            monitorReport: function(e, n, t, o, r, a) {
                function i(e, n) {
                    var t = "",
                        o = "";
                    return e ? n > 2e3 ? (t = "slow", o = 3e3 > n ? "req_slow2" : 6e3 > n ? "req_slow3" : "req_slow6") : (t = "succ", o = "succ") : (t = "fail", o = "con_fail"), {
                        subtype: t,
                        subvalue: o
                    }
                }

                function u(e) {
                    var n = [];
                    for (var t in e) n.push(t + "=" + e[t]);
                    n = n.join("&");
                    var o = location.protocol + "//log.map.baidu.com/tn.gif?" + n,
                        r = new Image;
                    r.src = o
                }
                var c = i(n, t);
                "succ" == c.subtype && (r = .01 * r), Math.random() < r && u({
                    product: "Pano",
                    module: "Pano_" + e,
                    subtype: c.subtype,
                    subvalue: c.subvalue,
                    value: t,
                    detail: encodeURIComponent(o),
                    logid: a,
                    represent: r > 1 ? 1 : r,
                    time: Math.floor(.001 * (new Date).getTime())
                })
            },
            startClock: function(e, n) {
                var t = this;
                window._pano_timer || (window._pano_timer = {});
                var o = window._pano_timer;
                window.onbeforeunload = function() {
                    t.stopClock(e)
                }, o[e] || (o[e] = {
                    name: e,
                    state: 1,
                    start: (new Date).getTime(),
                    fn: n
                })
            },
            stopClock: function(e) {
                var n = window._pano_timer;
                if (n && n[e]) {
                    var t = n[e],
                        o = t.fn;
                    o && o.call(t, Math.round(((new Date).getTime() - t.start) / 1e3)), delete n[e]
                }
            },
            revertStreetView: function(e) {
                var n = "",
                    t = "";
                return e.pid ? (t = e.pid, n = e.iid || "") : "inter" === e.panotype ? n = e.panoid : t = e.panoid, "alamap" === e.from && addStat(STAT_CODE.STAT_PANORAMA, {
                    item: e.panotype,
                    catalog: "alamap",
                    func: "alamap",
                    query: e.pword
                }), {
                    panoId: t,
                    panoIId: n,
                    panoType: e.panotype,
                    panoHeading: e.heading,
                    panoPitch: e.pitch,
                    panoZoom: e.l,
                    panoShareParam: e.psp,
                    from: "share"
                }
            },
            getUgcUploadUrl: function() {
                return "//pai.baidu.com/?qt=viewapp"
            },
            isSupportVideo: function() {
                var e = navigator.appVersion;
                if (-1 !== e.indexOf("MSIE 9.0") || baidu.ie < 11) return !1;
                try {
                    var n = document.createElement("video");
                    return n && n.canPlayType ? !0 : !1
                } catch (t) {
                    return !1
                }
            }
        };
    ! function(e) {
        var n = document.body.filters;
        n && (e.isIE = function() {
            return !0
        }, e.setOpacity = function(e, n) {
            e.style.filter = "alpha(opacity=" + parseInt(100 * n) + ")"
        })
    }(c),
    function() {
        var e = history.replaceState,
            n = navigator.userAgent.toLowerCase(),
            t = n.indexOf("lbbrowser") > -1;
        c.isSupportChangeStatus = !e || t ? function() {
            return !1
        } : function() {
            return !0
        }
    }(c),
    function(e) {
        var n = null,
            t = null,
            o = 0,
            r = [],
            a = !1;
        e.isHashChangeListing = function() {
            return null !== n
        }, e.setHash = function(e) {
            var n = e.match(/pid=([\w\d]*)/),
                t = location.hash.match(/pid=([\w\d]*)/);
            a = !0, location.hash = e, n && t && n[1] === t[1] || r.push(e)
        }, e.clearHash = function() {
            location.hash = "", a = !1, r = []
        }, e.onHashChange = function(e) {
            if (n) e && n.push(e);
            else {
                var o = n = [];
                e && o.push(e), t = function() {
                    if (a === !0) return void(a = !1);
                    if (r.length >= 1) {
                        r.pop();
                        var e = r[r.length - 1] || "";
                        location.hash !== e && (a = !0, location.hash = e);
                        for (var n = 0; n < o.length; n++) o[n].call(null, e)
                    }
                }, "addEventListener" in document.body ? window.addEventListener("hashchange", t) : window.attachEvent("onhashchange", t)
            }
        }, e.offHashChange = function() {
            n = null, "removeEventListener" in document.body ? window.removeEventListener("hashchange", t) : window.detachEvent("onhashchange", t), t = null, o && clearTimeout(o)
        }
    }(c), c.createTask = function() {
        var e = function(e) {
            this._opts = c.merge({
                timeout: 5e3
            }, e), this._queue = []
        };
        return e.prototype = {
                add: function(e, n) {
                    return this._queue.push({
                        fn: e,
                        timeout: void 0 === n ? this._opts.timeout : n
                    }), this
                },
                start: function() {
                    for (var e, n, t = this._queue, o = 0, r = t.length; r > o; o++)
                        if (n = t[o], 0 === o) {
                            var a = n.fn.call(null);
                            a && "function" == typeof a.state && "resolved" !== a.state(), e = baidu.when(a)
                        } else e = e.then(function(e) {
                            return function() {
                                var n = e.fn.call(null);
                                return n && "function" == typeof n.state && "resolved" !== n.state(), n
                            }
                        }(n, o));
                    return e
                }
            }, e.prototype.constructor = e,
            function(n) {
                return new e(n)
            }
    }(), t.exports = c
});;
define("pano:widget/base/service.js", function(e, n, t) {
    function o(e, n, t, o) {
        if (n) {
            var a = arguments.length;
            3 == a && (o = t, t = null);
            var r = new T.Deferred;
            n.t = (new Date).getTime();
            var i = [];
            for (var c in n) void 0 !== n[c] && i.push(c + "=" + n[c]);
            i = i.join("&");
            var u = e + i,
                l = function(e) {
                    t && t(e), r.resolve(e)
                };
            return baidu.jsonp(u, l, {
                cbtype: o ? o : "fn"
            }), r
        }
    }
    var a = e("common:widget/ui/config/config.js"),
        r = e("pano:widget/base/util.js"),
        i = e("pano:widget/base/CatalogMap.js"),
        c = a.mapVersion,
        u = a.urlConfig,
        l = function() {
            var e = null,
                n = function(e) {
                    var n = e.getFullYear(),
                        t = e.getMonth() + 1,
                        o = e.getDate();
                    return t = 10 > t ? "0" + t : t, o = 10 > o ? "0" + o : o, [n, t, o].join("-")
                };
            return function() {
                if (!e) {
                    e = {};
                    var t = new Date,
                        o = new Date;
                    o.setDate(t.getDate() + 2);
                    var a = new Date;
                    a.setDate(t.getDate() + 3), e.start = n(o), e.end = n(a)
                }
                return e
            }
        }(),
        s = {
            poiDetail: {}
        },
        p = c.UDT_VERSION || "20140317",
        d = u.PANO_URL + "?udt=" + p + "&",
        f = u.PANO_URL + "?qt=guide&",
        v = "/?",
        g = u.PANO_PHPUI_URL + "/?",
        y = "/detail?",
        h = u.PANO_URL + "?qt=search&",
        m = {
            getPanoInfoByUid: function(e, n) {
                var t = o(d, {
                    qt: "poi",
                    uid: e,
                    auth: encodeURIComponent(window.AUTH) || "",
                    seckey: encodeURIComponent(window.SECKEY) || ""
                });
                return n ? t.then(function(e) {
                    n(e)
                }) : t
            },
            getPanoPoiInfoByUid: function(e, n) {
                var t = new T.Deferred;
                return o(v, {
                    qt: "inf",
                    uid: e
                }, "callback").then(function(e) {
                    n && n(e), t.resolve(e)
                }), t
            },
            getHotelInfoByUid: function(e, n) {
                var t = l(),
                    a = o(y, {
                        qt: "ota",
                        st: t.start,
                        et: t.end,
                        uid: e
                    }, "callback");
                return n ? a.then(function(e) {
                    n(e)
                }) : a
            },
            getMovieInfoByUid: function(e, n) {
                var t = o(y, {
                    qt: "timetable",
                    uid: e,
                    from: "pc",
                    sfrom: "map",
                    sflag: "bubble"
                }, "callback");
                return n ? t.then(function(e) {
                    n(e)
                }) : t
            },
            getIndoorPoiInfoByUid: function(e) {
                if (s.poiDetail[e]) {
                    var n = s.poiDetail[e];
                    return (new T.Deferred).resolve().then(function() {
                        return n
                    })
                }
                return (new T.Deferred).resolve().then(function() {
                    return s.businessList ? s.businessList : o(v, {
                        qt: "panoCMS",
                        file: "inter_commercial"
                    }, null, "callback").then(function(e) {
                        return s.businessList = e, s.businessList
                    })
                }).then(function(n) {
                    var t = function() {
                            var n = new T.Deferred;
                            return n = o(g, {
                                qt: "baike",
                                uid: e,
                                pcevaname: "pc4.1",
                                auth: encodeURIComponent(window.AUTH) || "",
                                seckey: encodeURIComponent(window.SECKEY) || "",
                                t: (new Date).getTime()
                            })
                        },
                        a = 0,
                        r = new T.Deferred,
                        i = function() {
                            o(g, {
                                qt: "poidetail",
                                uid: e,
                                pcevaname: "pc4.1",
                                auth: encodeURIComponent(window.AUTH) || "",
                                seckey: encodeURIComponent(window.SECKEY) || "",
                                t: (new Date).getTime()
                            }).then(function(t) {
                                a++, 0 === t.result.error_type || 200 === t.result.error_type ? (t.content.businessData = n[e], r.resolve(t)) : 2 > a ? i() : r.resolve(t)
                            });
                            return r
                        },
                        c = baidu.when(i(), t()).then(function(t, o) {
                            var a = {};
                            return 0 === o.result.error_type ? (a = o, a.content.businessData = n[e], a.isBaike = !0) : 0 === t.result.error_type ? (a = t, a.content.businessData = n[e], a.isBaike = !1) : a.content = {
                                businessData: n[e]
                            }, s.poiDetail[e] = a, a
                        });
                    return c
                })
            },
            getGuideData: function(e, n) {
                function t(e) {
                    var n = [],
                        t = [],
                        o = [],
                        a = null,
                        r = !1,
                        c = 0,
                        u = e.length;
                    for (c = 0, u = e.length; u > c; c++)
                        if (e[c].Catalog) {
                            r = !0, a = {
                                exit: [],
                                other: []
                            };
                            break
                        }
                    for (var c = 0, u = e.length; u > c; c++) {
                        var l = e[c];
                        if (7 != l.Type) {
                            var s = {
                                photoUrl: null,
                                name: l.Info,
                                type: l.Type,
                                catalog: l.Catalog,
                                data: {
                                    prvFovy: l.PrvFovy || 35,
                                    prvHeading: l.PrvDir || l.Dir,
                                    prvPitch: l.PrvPitch || 0 == l.prvPitch ? l.PrvPitch : l.pitch,
                                    tourId: l.TourID,
                                    floor: l.Floor,
                                    panoId: l.PID,
                                    panoHeading: l.Dir,
                                    panoPitch: l.Pitch,
                                    type: l.Type,
                                    panoX: l.PanoX,
                                    panoY: l.PanoY,
                                    x: l.X,
                                    y: l.Y,
                                    uid: l.UID,
                                    rank: l.Height
                                }
                            };
                            if (r)
                                if (3 === s.type) a.exit.push(s);
                                else {
                                    var p = i.getCatalogInfo(s.catalog);
                                    a[p.id] || (a[p.id] = []), a[p.id].push(s)
                                }
                            0 === l.Type ? t.push(s) : 8 === l.Type ? o.push(s) : n.push(s)
                        }
                    }
                    return {
                        panoAllumData: n,
                        topicData: o,
                        panoTimelineData: t,
                        catalogData: a
                    }
                }
                var o = f + "sid=" + e;
                baidu.jsonp(o, function(e) {
                    var o = {
                            content: [],
                            topicData: [],
                            panoTimelineData: [],
                            catalogData: null
                        },
                        a = !0;
                    e && 0 == e.result.error && e.content && (o = t(e.content), a = !1), n({
                        content: o.panoAllumData,
                        topicData: o.topicData,
                        panoTimelineData: o.panoTimelineData,
                        catalogData: o.catalogData,
                        error: a
                    })
                }, {
                    cbtype: "fn"
                })
            },
            checkBounds: function(e, n, t) {
                if ("function" == typeof n) {
                    t = t || window;
                    var o = d + baidu.url.jsonToQuery({
                        qt: "qmdata",
                        bx: e.minX,
                        by: e.minY,
                        tx: e.maxX,
                        ty: e.maxY,
                        t: (new Date).getTime()
                    });
                    baidu.jsonp(o, function(e) {
                        if (e && 0 == e.result.error && e.content) {
                            var o = e.content.ptcnt || 0;
                            n.call(t, {
                                content: {
                                    ptcnt: o
                                },
                                error: 0
                            })
                        } else n.call(t, {
                            error: 1
                        })
                    }, {
                        cbtype: "fn"
                    })
                }
            },
            getStreetBriefByLocation: function(e, n) {
                if (e.point && "function" == typeof n) {
                    var t = e.point || {},
                        o = e.level || 15,
                        a = e.mode || "day",
                        r = d + baidu.url.jsonToQuery({
                            qt: "qsdata",
                            x: t.lng || t.x,
                            y: t.lat || t.y,
                            l: o,
                            action: 0,
                            mode: a,
                            auth: encodeURIComponent(window.AUTH) || "",
                            seckey: encodeURIComponent(window.SECKEY) || "",
                            t: (new Date).getTime()
                        });
                    baidu.jsonp(r, function(e) {
                        if (e && e.result && 0 == e.result.error && e.content) {
                            var t = e.content,
                                o = t.id,
                                a = parseFloat(t.x / 100),
                                r = parseFloat(t.y / 100),
                                i = new BMap.Point(a, r),
                                c = d + baidu.url.jsonToQuery({
                                    qt: "pdata",
                                    sid: o,
                                    pos: "0_0",
                                    z: "0",
                                    auth: encodeURIComponent(window.AUTH) || "",
                                    seckey: encodeURIComponent(window.SECKEY) || "",
                                    from: "PC"
                                });
                            n({
                                type: "brief",
                                content: {
                                    id: o,
                                    point: i,
                                    rname: t.RoadName || "",
                                    panoImg: c
                                },
                                error: 0
                            })
                        } else n({
                            error: 1
                        })
                    }, {
                        cbtype: "fn"
                    })
                }
            },
            getNavSearch: function(e) {
                return o(v, e, null, "callback")
            },
            getNavSteps: function(e) {
                return o(g + "qt=routeSteps&", e, null, "callback").then(function(e) {
                    var n = e.content.traffic_steps,
                        t = r.each(e.content.steps, function(e, t) {
                            var o = {
                                    rx: e.RX / 100,
                                    ry: e.RY / 100,
                                    x: e.X / 100,
                                    y: e.Y / 100,
                                    dir: e.dir,
                                    pid: e.pid
                                },
                                a = n[t];
                            a || (a = {
                                end: [1],
                                status: 1
                            }), o.instructions = r.clearTag(e.instructions);
                            var i = 0,
                                c = r.each(a.end, function(e, n) {
                                    var t = Math.ceil(100 * e);
                                    return i + t > 100 && (t = 100 - i), i += t, {
                                        value: t,
                                        status: a.status[n]
                                    }
                                }, !0);
                            return 100 > i && (c[c.length - 1].value += 100 - i), o.traffic = c, o
                        }, !0);
                    return t[0].pid || (t = t.slice(1)), e.content.steps = t, delete e.content.traffic_steps, e
                })
            },
            getClassifySearchData: function(e, n, t, a) {
                function i(e, n) {
                    if (!e || 0 === e.content.length) return null;
                    var t = e.content;
                    return r.each(t, function(e) {
                        return {
                            poiuid: e.UID,
                            pid: e.PID,
                            panoIId: e.IID,
                            poiType: "poi",
                            catalog: n,
                            name: e.name,
                            rank: e.Height,
                            heading: e.Dir,
                            pitch: e.Pitch,
                            x: e.X,
                            y: e.Y,
                            px: e.PanoX,
                            py: e.PanoY,
                            index: -1
                        }
                    }, !0)
                }
                var c = {
                        0: "",
                        1: "FE02",
                        2: "FE01",
                        3: "FE06",
                        4: "FE0A",
                        5: "FEFE"
                    },
                    u = o(h, {
                        x: e,
                        y: n,
                        radius: 200,
                        tag: t
                    }, "fn");
                return a ? u.then(function(e) {
                    e = i(e, c[t]), a(e)
                }) : u
            },
            getComponentResultByQuery: function(e) {
                var n = "/?qt=" + e,
                    t = new T.Deferred;
                return T.ajax(n, {
                    dataType: "json",
                    success: function(e) {
                        return e && e.result ? void t.resolve(e, n) : void t.resolve(null)
                    },
                    error: function() {
                        t.resolve(null)
                    }
                }), t
            },
            getPanoPoints: function(e, n) {
                var t = e.join("|");
                n = n || "bus";
                var o = "udt=" + p + "&qt=batchdata&from=" + n + "&key=" + t,
                    a = new T.Deferred;
                return baidu.ajax("/?qt=panobatch", {
                    method: "post",
                    dataType: "json",
                    data: o,
                    success: function(e) {
                        a.resolve(e)
                    }
                }), a
            },
            getBuslineByUid: function(e, n) {
                var t = o(v, {
                        qt: "bsl",
                        bsltp: "1",
                        newmap: "1",
                        uid: e,
                        c: n,
                        t: (new Date).getTime()
                    }, null, "callback"),
                    a = this;
                return t.then(function(e) {
                    var n = e.content[0].stations,
                        t = e.content[0].name,
                        o = [],
                        i = "",
                        c = null,
                        u = "";
                    0 == e.result.linetype || 6 == e.result.linetype ? u = "010A05" : 1 == e.result.linetype && (u = "010A03");
                    for (var l = 0, s = n.length; s > l; l++) i = n[l].geo, i = i.split("|")[2].split(";")[0], o.push(i), c = i.split(","), n[l].point = {
                        x: c[0],
                        y: c[1]
                    };
                    return a.getPanoPoints(o, "busline").then(function(e) {
                        return r.each(o, function(t, o) {
                            e.content[o] && (n[o].pano = e.content[o])
                        }), {
                            buslineName: t,
                            stations: n,
                            catalog: u
                        }
                    })
                })
            },
            getPanoCityPageData: function(e) {
                return o(v, {
                    qt: "panoReco",
                    code: e,
                    t: (new Date).getTime()
                }, null, "callback")
            },
            getSdataByPid: function() {
                var e = {};
                return function(n) {
                    var t = new T.Deferred;
                    return e[n] ? t.resolve(e[n]) : o(d, {
                        qt: "sdata",
                        pc: 1,
                        sid: n,
                        auth: encodeURIComponent(window.AUTH) || "",
                        seckey: encodeURIComponent(window.SECKEY) || ""
                    }, null, "fn").then(function(o) {
                        o && o.result || t.resolve(null);
                        var a = o.content[0] || o.content,
                            i = r.copy(a, !0);
                        e[n] = i, t.resolve(i)
                    }), t
                }
            }(),
            getIndoorData: function() {
                var e = {};
                return function(n) {
                    var t = new T.Deferred;
                    return e[n] ? t.resolve(e[n]) : o(d, {
                        qt: "idata",
                        iid: n,
                        auth: encodeURIComponent(window.AUTH) || "",
                        seckey: encodeURIComponent(window.SECKEY) || ""
                    }, null, "fn").then(function(o) {
                        if (!o || !o.result) return null;
                        var a = (o.content[0] || o.content).interinfo,
                            i = r.copy(a, !0);
                        e[n] = i, t.resolve(i)
                    }), t
                }
            }(),
            getActiveData: function() {
                return o(v, {
                    qt: "panoCMS",
                    file: "mobileopsupport"
                }, null, "callback").then(function(e) {
                    var n = e.activity || [];
                    return r.each(n, function(e) {
                        e.center && (e.center = T.json.parse(e.center)), e.range && (e.range = T.json.parse(e.range)), e.pids && (e.pids = T.json.parse(e.pids))
                    }), n
                })
            },
            getCopyRightData: function() {
                return o(v, {
                    qt: "panoCMS",
                    file: "pano_copyright"
                }, null, "callback")
            },
            getCursorPic: function() {
                return o(v, {
                    qt: "panoCMS",
                    file: "streetviewtoolsview"
                }, null, "callback")
            },
            getIndoorIcon: function(e) {
                return o(d, {
                    qt: "ck",
                    tid: e
                }, null, "fn")
            },
            mandelaFilter: function(e, n) {
                var t = window.location.protocol + "//mbc.baidu.com/express/mandela/mandelaMask?wd=" + e,
                    o = null;
                baidu.jsonp(t, function(e) {
                    0 === e.code ? o = e.result || "" : console.log(e.error_msg || "mandela接口异常"), "function" == typeof n && n(o)
                }, {
                    cbtype: "cb"
                })
            },
            getActiveLogo: function(e, n, t) {
                var o = window.location.protocol + "//mbc.baidu.com/express/maplogos/checkIid?iid=" + e,
                    a = null;
                baidu.jsonp(o, function(e) {
                    if (0 === e.code) {
                        var o = e.result || {};
                        o && o.isHit ? (a = o.icon, "function" == typeof n && n(a)) : "function" == typeof t && t(a)
                    } else console.log(e.error_msg || "checkIid接口异常")("function" == typeof t) && t(a)
                }, {
                    cbtype: "cb"
                })
            }
        };
    t.exports = m
});;
define("pano:widget/base/ConstantConfig.js", function(n, i, o) {
    var a = {
        PANO_PAI_URL: "//pai.baidu.com/"
    };
    o.exports = {
        urlConfig: a
    }
});;
define("pano:widget/PanoInterface/PanoInterface.js", function(n, e, t) {
    var o, a, r = n("pano:widget/Transition/Transition.js"),
        i = !1,
        c = function() {
            var n, e = document.createElement("canvas"),
                t = !0;
            try {
                n = e.getContext("experimental-webgl") || e.getContext("webgl") || e.getContext("moz-webgl") || e.getContext("webkit-3d")
            } catch (o) {}
            return n || (t = !1), e = null, n = null, t
        },
        d = function() {
            var n = !1;
            try {
                n = !!document.createElement("canvas").getContext
            } catch (e) {
                console.log("浏览器不支持canvas")
            }
            return n
        },
        u = !1;
    c() ? (u = !0, addStat(STAT_CODE.STAT_PANORAMA, {
        item: "pano_render_webgl"
    })) : addStat(STAT_CODE.STAT_PANORAMA, {
        item: "pano_render_flash"
    }), t.exports = {
        showPanoPreview: function() {
            if (u) {
                var e = arguments,
                    t = e[0],
                    r = function() {
                        var e = new T.Deferred;
                        return o ? e.resolve() : n.async(["pano:widget/base/service.js", "pano:widget/Root.js"], function(n, t) {
                            o = t, a = n, e.resolve()
                        }), e
                    },
                    i = {};
                r().then(function() {
                    return t.panoId ? a.getSdataByPid(t.panoId) : i
                }).then(function(n) {
                    return n !== i && n && n.x && n.y ? {
                        x: n.x / 100,
                        y: n.y / 100,
                        dir: n.heading
                    } : i
                }).then(function(n) {
                    n !== i && (t.x = n.x, t.y = n.y, t.dir = n.dir), t.panoId && "contextMenu" === t.from && o.showPanoPreview.apply(o, e)
                })
            }
        },
        closePanoPreview: function() {
            o && o.closePanoPreview.apply(o, arguments)
        },
        showPano: function() {
            if (!(o && o.isRunning() > 0)) {
                if (!c() && !d()) return void alert("您的电脑浏览器版本过低，请升级或更换浏览器！");
                var e = {},
                    t = arguments,
                    u = t[0];
                i !== !0 && (i = !0, r.checkSupport(u.from), function() {
                    var e = new T.Deferred;
                    return o ? e.resolve() : n.async(["pano:widget/base/service.js", "pano:widget/Root.js"], function(n, t) {
                        o = t, a = n, e.resolve()
                    }), e
                }().then(function() {
                    return u.research === !0 ? a.getPanoInfoByUid(u.searchParam.uid) : u.panoIId ? a.getIndoorData(u.panoIId) : u.panoId ? a.getSdataByPid(u.panoId) : e
                }).then(function(n) {
                    return n !== e && n ? n.content ? (n = n.content[0].poiinfo, {
                        x: n.X,
                        y: n.Y,
                        dir: n.Dir
                    }) : n.x && n.y ? {
                        x: n.x / 100,
                        y: n.y / 100,
                        dir: n.heading
                    } : n.iid ? {
                        x: n.ipoint.x / 100,
                        y: n.ipoint.y / 100,
                        dir: 0
                    } : e : e
                }).then(function(n) {
                    var a = n.x,
                        c = n.y,
                        d = n.dir;
                    if (i = !1, n === e || !a || !c) return void o.showPano.apply(o, t);
                    var u = new BMap.Point(a, c),
                        s = d || 0;
                    r.enter(null, null, u, s, function() {
                        o.showPano.apply(o, t)
                    })
                }))
            }
        },
        closePano: function() {
            o && o.closePano.apply(o, arguments)
        }
    }
});;
define("pano:widget/Transition/Util.js", function() {
    var t = navigator.userAgent.toLowerCase(),
        e = {
            mapPosToScreenPos: function(t, e) {
                var r = (document.body.clientWidth, document.body.clientHeight, T("#MapHolder").offset()),
                    n = {
                        x: t + r.left,
                        y: e + r.top
                    };
                return n
            },
            screenPosToMapPos: function(t, e) {
                var r = (document.body.clientWidth, document.body.clientHeight, T("#MapHolder").offset()),
                    n = {
                        x: t - r.left,
                        y: e - r.top
                    };
                return n
            },
            easeIn: function(t) {
                return Math.pow(t, 2)
            },
            easeOut: function(t) {
                return Math.pow(t, .5)
            },
            easeFrom: function(t) {
                return Math.pow(t, 4)
            },
            easeTo: function(t) {
                return Math.pow(t, .25)
            },
            returnTrue: function() {
                return !0
            },
            returnFalse: function() {
                return !1
            },
            isSupportCanvas: function() {
                var t = !1;
                try {
                    var e = document.createElement("canvas"),
                        r = e.getContext("2d");
                    t = r && r.drawImage ? !0 : !1
                } catch (n) {
                    t = !1
                }
                return this.isSupportCanvas = t ? this.returnTrue : this.returnFalse, t
            },
            isSupportTransform3d: function() {
                var t = !1;
                try {
                    var e = document,
                        r = e.body,
                        n = e.createElement("div");
                    n.className = "test_css3d";
                    var o = e.createElement("style");
                    o.innerHTML = "@media (transform-3d),(transform-3d),(-webkit-transform-3d),(-ms-transform),(-moz-transform){.test_css3d{position:absolute;height:3px;width:3px}}", r.appendChild(o), r.appendChild(n), t = 3 === n.clientHeight ? !0 : !1;
                    var i = function() {
                        var t = document.createElement("div"),
                            e = "Khtml Ms O Moz".split(" "),
                            r = e.length;
                        return function(n) {
                            if (n in t.style) return !0;
                            for (n = n.replace(/^[a-z]/, function(t) {
                                    return t.toUpperCase()
                                }); r--;)
                                if (e[r] + n in t.style && window.addEventListener) return !0;
                            return !1
                        }
                    }();
                    i("transform") && (t = !0), r.removeChild(o), r.removeChild(n)
                } catch (s) {
                    t = !1
                }
                return this.isSupportTransform3d = t ? this.returnTrue : this.returnFalse, t
            },
            isSougouBrowser: function() {
                var e = t.indexOf("se 2.x") > -1 ? !0 : !1;
                return this.isSougouBrowser = e ? this.returnTrue : this.returnFalse, e
            },
            isSafariBrowser: function() {
                var e = t.indexOf("macintosh") > -1 ? !0 : !1,
                    r = t.indexOf("chrome") > -1 ? !0 : !1,
                    n = e && !r;
                return this.isMacSafariBrowser = n ? this.returnTrue : this.returnFalse, n
            },
            getMapRenderType: function() {
                window.map;
                return ""
            }
        };
    return e
});;
define("pano:widget/Transition/Transition.js", function(n) {
    var t = n("pano:widget/Transition/Util.js"),
        e = null,
        i = null,
        o = !0,
        a = !1,
        r = !1,
        l = !1,
        s = window.map,
        p = 1200,
        c = {
            checkSupport: function(n) {
                o = t.isSupportCanvas() && t.isSupportTransform3d() && "share" !== n && "webgl" !== t.getMapRenderType() ? !0 : !1
            },
            enter: function(i, u, d, f, g) {
                if (!l)
                    if (l = !0, o) {
                        if (this.onPlayStart = g, "webgl" === s._renderType) {
                            s.suspendLoad = !0, s.setDisplayOptions({
                                poi: !1,
                                overlay: !1,
                                layer: !1
                            }), s.temp.mapOriginView = {
                                center: s.getCenter(),
                                zoom: s.getZoom(),
                                tilt: s.getTilt(),
                                heading: s.getHeading()
                            };
                            var y = f > 180 ? f - 360 : f,
                                w = s.getCenter().clone();
                            return w.lat += s.getZoomUnits() * s.height / 2, s.temp.testCenter = w, s.setLock(!0), void s.flyTo(d, 21, {
                                heading: -y,
                                tilt: 87,
                                duration: p,
                                callback: function() {
                                    c.onPlayStart(), c.onPlayEnd()
                                }
                            })
                        }
                        n.async(["pano:widget/Transition/MapLayer/EnterLayer.js"], function(n) {
                            var l = void 0;
                            if (d) {
                                d instanceof BMap.Point || !d.lat || !d.lng || (d = new BMap.Point(d.lng, d.lat));
                                var s = window.map.pointToPixel(d);
                                l = t.mapPosToScreenPos(s.x, s.y)
                            }
                            e = new n(i, d, u, l, f, function(n) {
                                n === !0 && (o = !1), c.onPlayStart()
                            }, function() {
                                r = !0, a && c.close(), c.onPlayEnd()
                            })
                        })
                    } else g(), l = !1
            },
            exit: function(e, a, r, l, u, d) {
                if (!o) return void u();
                if ("webgl" === s._renderType) {
                    u(), c.close();
                    var f = s.temp.mapOriginView.heading,
                        g = s.temp.mapOriginView.tilt,
                        y = s.temp.mapOriginView.zoom;
                    return s.temp.testCenter = null, void s.flyTo(r, y, {
                        heading: f,
                        tilt: g,
                        duration: p,
                        callback: function() {
                            s.setLock(!1), s.suspendLoad = !1, s.setDisplayOptions({
                                poi: !0,
                                overlay: !0,
                                layer: !0
                            }), "function" == typeof d && d()
                        }
                    })
                }
                n.async(["pano:widget/Transition/MapLayer/ExitLayer.js"], function(n) {
                    var o = window.map,
                        s = t.mapPosToScreenPos(o.width / 2, o.height / 2);
                    i = new n(e, r, a, s, l, function() {
                        c.close()
                    }), u()
                })
            },
            onShow: function(n) {
                o ? this.onPlayEnd = n : n()
            },
            close: function() {
                o && (e && (e.fadeOut(), e = null, r = !1), i && (i.fadeOut(), i = null), l = !1)
            },
            enableAutoutoClose: function() {
                a = !0, r === !0 && this.close()
            },
            onPlayStart: function() {},
            onPlayEnd: function() {}
        };
    return c
});;
define("pano:widget/PanoEntranceUtil/PanoEntranceUtil.js", function(e, t, a) {
    var n = e("common:widget/ui/util/util.js"),
        i = e("common:widget/ui/config/config.js"),
        o = e("common:widget/ui/indexUtil/IndexUtil.js"),
        r = e("pano:widget/PanoInterface/PanoInterface.js"),
        d = (e("pano:widget/base/service.js"), i.urlConfig),
        s = i.mapVersion,
        u = window.Pano = window.Pano || {},
        p = {
            insertPanoInfoInSearch: function(e, t, a) {
                if (!o.isSupportStreetView()) return a(null), void this.dispatchEvent("onSearchPanoDataReady", {
                    data: null
                });
                for (var n = [], r = 0, u = e.length; u > r; r++) n.push(e[r].uid || e[r].mercatorLnglat);
                var p = this,
                    h = "udt=" + s.UDT_VERSION + "&qt=batchdata&from=" + t + "&key=" + n.join("|");
                baidu.ajax("/?qt=panobatch", {
                    method: "post",
                    dataType: "json",
                    data: h,
                    success: function(t) {
                        for (var n = t || {}, i = n.content || [], o = [], r = null, u = null, h = !0, l = 0, c = i.length; c > l; l++) {
                            r = i[l] || {}, u = e[l], r.PID && h && (h = !1);
                            var m = "";
                            if (m = u.name ? u.name : r.name, u.mercatorLnglat) {
                                var f = u.mercatorLnglat.split(",");
                                r.Dir || (r.Dir = 90 - 180 * Math.atan2(f[1] - r.PanoY, f[0] - r.PanoX) / Math.PI), r.Dir < 0 && (r.Dir += 360)
                            } else f = [0, 0];
                            var g = 0;
                            g = u.direction && 0 != l && l != c - 1 ? u.direction : r.Dir;
                            var v = encodeURIComponent(window.AUTH) || "",
                                b = encodeURIComponent(window.SECKEY) || "",
                                w = d.PANO_URL;
                            if (r.UID) {
                                var I = "{baseURL}/pr/?qt=poiprv&uid={uid}&width={width}&height={height}&quality=80&fovx={fovx}&udt={udt}&from={from}&auth={auth}&seckey={seckey}",
                                    k = {
                                        baseURL: d.PANO_URL,
                                        uid: r.UID,
                                        width: 100,
                                        height: 75,
                                        fovx: 80,
                                        udt: s.UDT_VERSION,
                                        from: "PC",
                                        auth: v,
                                        seckey: b
                                    };
                                panoThumbnail = I.replace(/\{(.*?)\}/g, function(e, t) {
                                    return k[t]
                                })
                            } else {
                                var I = "{baseURL}/pr/?qt=prv&panoid={panoId}&width={width}&height={height}&quality=80&fovx={fovx}&heading={heading}&udt={udt}&from={from}&auth={auth}&seckey={seckey}",
                                    k = {
                                        baseURL: d.PANO_URL,
                                        panoId: r.PID,
                                        width: 100,
                                        height: 75,
                                        fovx: 80,
                                        heading: g,
                                        udt: s.UDT_VERSION,
                                        from: "PC",
                                        auth: v,
                                        seckey: b
                                    };
                                panoThumbnail = I.replace(/\{(.*?)\}/g, function(e, t) {
                                    return k[t]
                                })
                            }
                            var P = {
                                panoId: r.PID || "",
                                uid: r.UID || "",
                                panoMarker: {
                                    addr: r.name || "",
                                    poiuid: r.UID || "",
                                    pid: r.PID || "",
                                    catalog: u.poiType || "",
                                    name: m,
                                    rank: r.Rank || 0,
                                    heading: g,
                                    pitch: r.Pitch || 0,
                                    x: r.X || f[0],
                                    y: r.Y || f[1],
                                    px: r.PanoX || f[0],
                                    py: r.PanoY || f[1],
                                    index: u.index || -1
                                },
                                panoThumbnailUrl: w
                            };
                            o.push(P)
                        }
                        h && (o = null), a(o), p.dispatchEvent("onSearchPanoDataReady", {
                            data: o
                        })
                    },
                    error: function() {}
                }), addStat(STAT_CODE.STAT_STREETVIEW, {
                    cityCode: i.modelConfig.cityCode,
                    catalog: t,
                    item: "panobatch"
                })
            },
            showStreetViewPreview: function(e, t, a, i) {
                var o = this,
                    r = T(".list_street_view_preview"),
                    d = t.getAttribute("data-thumbnail"),
                    s = {
                        buslineUid: t.getAttribute("data-buslineUid"),
                        panoId: t.getAttribute("data-pid"),
                        uid: t.getAttribute("data-uid"),
                        panoMarker: {
                            addr: t.getAttribute("data-paddr"),
                            px: t.getAttribute("data-px"),
                            py: t.getAttribute("data-py"),
                            name: t.getAttribute("data-pname"),
                            heading: t.getAttribute("data-pheading")
                        },
                        hasRouteVideo: i
                    },
                    u = t.getAttribute("data-pfrom");
                e ? this.timeoutId = setTimeout(function() {
                    var t = n.getClientSize().height - e.top < 150;
                    r.length ? (r.css({
                        left: e.left - 1,
                        top: e.top
                    }), r.find("img").attr("src", d), r.off("click"), r.on("click", function() {
                        o.enterPanorama(s, a, "search", u)
                    }), r.show()) : (r = T('<div style="left:' + (e.left - 1) + "px;top:" + e.top + 'px" class="list_street_view_preview"><img src="' + d + '" onerror="Pano.PanoEntranceUtil.thumbnailNotFound(this, 100, 75);" width="100" height="75" /><div class="list_street_view_preview_icon_box"><div class="list_street_view_preview_icon"></div></div></div>'), T("body").append(r), r.on("mouseleave", function() {
                        r.hide()
                    }), r.on("click", function() {
                        o.enterPanorama(s, a, "search", u)
                    })), t ? (r.addClass("bottom"), r.css({
                        top: e.top - 53
                    })) : r.removeClass("bottom")
                }, 200) : o.enterPanorama(s, a, "routeVideo_button", u)
            },
            thumbnailNotFound: function(e) {
                e.src = "//webmap1.bdimg.com/wolfman/static/pano/images/panorama/2d_default_aspect_ratio_3_a58ec98.png"
            },
            walkThroughPanoEntrances: function(e, t, a, n, i) {
                var o, r = this;
                if (t && 0 != t.length) {
                    T(".closeWalkInfo").css({
                        "margin-top": 0
                    });
                    for (var d = 0; d < e.length; d++) o = t[d], this.setPanoPreviewDomAttribute(e[d], o, a);
                    e.off("mouseleave"), e.off("mouseenter"), e.on("mouseenter", function() {
                        var e = T(this),
                            a = e.offset().left + 22;
                        r.showStreetViewPreview({
                            left: a,
                            top: e.offset().top - 6
                        }, this, n || t, i)
                    }), e.on("mouseleave", function() {
                        clearTimeout(r.timeoutId)
                    })
                } else
                    for (var d = 0; d < e.length; d++) e[d].style.display = "none"
            },
            setPanoPreviewDomAttribute: function(e, t, a) {
                t.panoId ? (e.style.visibility = "visible", e.setAttribute("data-thumbnail", t.panoThumbnailUrl), e.setAttribute("data-pid", t.panoId), e.setAttribute("data-pname", t.panoMarker.name), e.setAttribute("data-px", t.panoMarker.px), e.setAttribute("data-py", t.panoMarker.py), e.setAttribute("data-paddr", t.panoMarker.addr), e.setAttribute("data-pheading", t.panoMarker.heading), e.setAttribute("data-pfrom", a)) : e.style.visibility = "hidden"
            },
            addPanoEntranceInInfoWindow: function(e, t, a) {
                var n = this;
                n.insertPanoInfoInSearch([{
                    mercatorLnglat: t.lng + "," + t.lat
                }], "", function(t) {
                    if (t && t.length > 0) {
                        var i = n.addPanoThumbnailsInInfoWnd([e], [t[0]], t, "contextMenu", !0);
                        a(i)
                    } else a([e])
                })
            },
            addPanoThumbnailsInInfoWnd: function(e, t, a, n) {
                var i, o, r = null,
                    d = this;
                switch (n) {
                    case "contextMenu":
                    case "busline":
                        thumbnailProperty = {
                            size: {
                                width: 323,
                                height: 101
                            },
                            position: "top",
                            fovx: 250,
                            margin: "10px 10px 0 10px"
                        };
                        break;
                    case "bus":
                    case "buswalk":
                    case "nav":
                    case "walk":
                    case "bike":
                        thumbnailProperty = {
                            size: {
                                width: 240,
                                height: 75
                            },
                            position: "middle",
                            elemIndexArr: [0, -1],
                            fovx: 250,
                            margin: "6px 0"
                        };
                        break;
                    case "routeaddr":
                        thumbnailProperty = {
                            size: {
                                width: 258,
                                height: 81
                            },
                            position: "middle",
                            elemIndexArr: [1],
                            fovx: 250,
                            margin: "0 10px 5px 10px"
                        }
                }
                for (i = 0, o = e.length; o > i; i++) r = e[i], t[i] && (r.content = this._getPanoThumbnailHtmlInInfoWnd(r.content, t[i], thumbnailProperty), r.addEventListener("open", function(e) {
                    return function() {
                        baidu(".panoInfoBox").on("click", function() {
                            d.enterPanorama(t[e], a, "infownd", n)
                        })
                    }
                }(i)));
                return e
            },
            _getPanoThumbnailHtmlInInfoWnd: function(e, t, a) {
                function n(e, t, a) {
                    var n = document.createElement("div"),
                        i = n.cloneNode();
                    n.innerHTML = t, n = n.childNodes[0], i.innerHTML = e;
                    for (var o = null, o = i, r = 0, d = a.length, s = 0; d > r; r++) s = a[r], 0 > s && (s = o.childNodes.length + s), r != d - 1 ? o = o.childNodes[s] : o.insertBefore(n, o.childNodes[s]);
                    return i.innerHTML
                }
                if (!t || !t.panoId || !t.panoMarker) return e;
                var i = [],
                    o = "",
                    r = a.size.height,
                    u = a.size.width,
                    p = a.fovx,
                    h = a.position;
                i.push("<div class='panoInfoBox' style='height:" + r + "px;width:" + u + "px; margin:" + a.margin + ";' title='" + t.panoMarker.name + "外景' title='查看全景' >");
                var l = encodeURIComponent(window.AUTH) || "",
                    c = encodeURIComponent(window.SECKEY) || "",
                    m = "";
                if (t.panoMarker.poiuid) {
                    var f = "{baseURL}/pr/?qt=poiprv&uid={uid}&width={width}&height={height}&quality=80&fovx={fovx}&udt={udt}&from={from}&auth={auth}&seckey={seckey}",
                        g = {
                            baseURL: d.PANO_URL,
                            uid: t.panoMarker.poiuid,
                            width: u,
                            height: r,
                            fovx: p,
                            udt: s.UDT_VERSION,
                            from: "PC",
                            auth: l,
                            seckey: c
                        };
                    m = f.replace(/\{(.*?)\}/g, function(e, t) {
                        return g[t]
                    })
                } else {
                    var f = "{baseURL}/pr/?qt=prv&panoid={panoId}&width={width}&height={height}&quality=80&fovx={fovx}&heading={heading}&udt={udt}&from={from}&auth={auth}&seckey={seckey}",
                        g = {
                            baseURL: d.PANO_URL,
                            panoId: t.panoId,
                            width: u,
                            height: r,
                            fovx: p,
                            heading: t.panoMarker.heading,
                            udt: s.UDT_VERSION,
                            from: "PC",
                            auth: l,
                            seckey: c
                        };
                    m = f.replace(/\{(.*?)\}/g, function(e, t) {
                        return g[t]
                    })
                }
                switch (i.push("<img class='pano_thumnail_img' width='" + u + "' height='" + r + "' border='0' alt='" + t.name + "外景' src='" + m + "' onerror='Pano.PanoEntranceUtil.thumbnailNotFound(this, " + u + ", " + r + ");' />"), i.push("<div class='panoInfoBoxTitleBg' style='width:" + u + "px;'></div><a href='javascript:void(0)' class='panoInfoBoxTitleContent' >进入全景&gt;&gt;</a>"), i.push("</div>"), o = i.join(""), h) {
                    case "top":
                        e = o + e;
                        break;
                    case "bottom":
                        e += o;
                        break;
                    case "middle":
                        e = n(e, o, a.elemIndexArr)
                }
                return e
            },
            enterPanorama: function(e, t, a, n) {
                addStat(STAT_CODE.STAT_STREETVIEW, {
                    from: a,
                    catalog: n
                });
                var i = {
                    point: new BMap.Point(e.panoMarker.px, e.panoMarker.py),
                    buslineUid: e.buslineUid,
                    uid: e.uid,
                    panoId: e.panoId,
                    panoType: "street",
                    panoHeading: e.panoMarker.heading,
                    from: n,
                    addr: e.panoMarker.addr,
                    name: e.panoMarker.name,
                    markers: [],
                    panoMarkers: [],
                    hasRouteVideo: e.hasRouteVideo
                };
                "routeaddr" === n && (i.research = !0, i.searchParam = {
                    uid: e.uid
                });
                for (var o = 0, d = t.length; d > o; o++) i.markers.push(t[o].panoMarker);
                d > 2 && i.markers[0].pid == i.markers[1].pid && (i.markers.splice(1, 1), d--), d > 2 && i.markers[d - 1].pid == i.markers[d - 2].pid && i.markers.splice(d - 2, 1);
                for (var s = {}, o = 0, d = i.markers.length; d > o; o++) i.markers[o].pid === i.panoId && s[i.panoId] !== !0 && (s[i.panoId] = !0, i.panoMarkers.push(i.markers[o]), !i.panoMarkers[0].poiuid && i.uid && (i.panoMarkers[0].poiuid = i.uid));
                "routeVideo_button" == a && (i.playRouteVideo = !0), r.showPano(i)
            }
        };
    p = baidu.lang.createSingle(p), u.PanoEntranceUtil = p, a.exports = p
});;
define("pano:widget/module/PanoPreviewModule/PanoPreviewModule.js", function(e, n, o) {
    var a = e("pano:widget/base/ModuleClass.js"),
        t = e("pano:widget/module/PanoModule/WebglRender/Render.js"),
        i = T.browser.ie && T.browser.ie <= 7 ? "keypress" : "keydown",
        r = a.extend("PanoPreviewModule", {
            constructor: function() {},
            initialize: function(e, n, o) {
                this._container = e, this._events = {}, this._panoPreviewContainer = {}, this._panoConfigUrl = n, this._mapContext = o
            },
            getSupportEvents: function() {
                return ["close_pano_preview", "pano_preview_click"]
            },
            showPanoPreview: function(e) {
                var n = {};
                n.left = e.left, n.top = e.top, this._addPanoPreviewContainer(n), this._panoData = e, window.panoFlashWraper ? (window.panoFlashWraper.addPanoLoadingMask("panoPreviewMask"), window.panoFlashWraper.setPanoOptions(e), window.panoFlashWraper.startAnimationFrame(), window.panoFlashWraper.setIsRotatePano(!0)) : window.panoFlashWraper = new t(e, this._panoPreviewContainer, this._panoConfigUrl), this._bindPanoFlashEvents()
            },
            closePanoPreview: function() {
                window.panoFlashWraper && (window.panoFlashWraper.setIsRotatePano(!1), window.panoFlashWraper.stopAnimationFrame(), this.dispose())
            },
            _bindPanoFlashEvents: function() {
                window.panoFlashWraper.addEventListener("interface_ready", function() {
                    window.panoFlashWraper.setIsRotatePano(!0)
                })
            },
            _addPanoPreviewContainer: function(e) {
                var n = this,
                    o = 300,
                    a = 300,
                    t = e.top - .5 * a,
                    r = e.left - .5 * o,
                    s = document.getElementById("pano-preview-container");
                T.g("pano-preview-container") ? (s.style.top = t + "px", s.style.left = r + "px", s.style.display = "block") : (n._panoPreviewContainer = document.createElement("div"), n._panoPreviewContainer.setAttribute("id", "pano-preview-container"), n._panoPreviewContainer.style.cssText = ["z-index:1000000", "position:absolute", "top:" + t + "px", "left:" + r + "px", "width:" + o + "px", "height:" + a + "px", "border-radius: 50%", "border:2px solid #c6c9ce", "overflow:hidden"].join(";"), n._container.appendChild(this._panoPreviewContainer)), n._events.panoPreviewClickHandler = function() {
                    n._panoData.from = null, n.dispatchEvent("pano_preview_click", {
                        data: n._panoData
                    })
                }, n._events.escEventHandler = function(e) {
                    (e.type !== i || 27 === e.keyCode) && n.closePanoPreview()
                }, n._events.rightClickHandler = function(e) {
                    if (window.Event) {
                        if (2 === e.which || 3 === e.which) return n._panoData && (n._panoData.from = null), n.closePanoPreview(), !1
                    } else if (2 === e.button || 3 === e.button) return n._panoData && (n._panoData.from = null), n.closePanoPreview(), e.cancelBubble = !0, e.returnValue = !1, !1
                }, T.on(T.g("pano-preview-container"), "click", n._events.panoPreviewClickHandler), T.on(T.g("pano-preview-container"), "mousedown", n._events.rightClickHandler), T.on(document, i, n._events.escEventHandler)
            },
            dispose: function() {
                var e = this;
                T.un(T.g("pano-preview-container"), "click", e._events.panoPreviewClickHandler), T.un(document, i, e._events.escEventHandler), document.getElementById("pano-preview-container").style.display = "none"
            }
        });
    o.exports = r
});