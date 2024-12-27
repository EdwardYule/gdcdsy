window.BMap = window.BMap || {},
    function(aI, cX) {
        function dQ(t, e) {
            this._size = t, this._cache = [], this._totalGetTimes = 0, this._totalHitTimes = 0, this._options = {
                clearCallback: null,
                removeOldCallback: null
            }, e = e || {};
            for (var i in e) e.hasOwnProperty(i) && (this._options[i] = e[i])
        }

        function U() {}

        function bU(t, e) {
            if ("string" == typeof t && (t = document.getElementById(t)), cI.call(this), this.container = t, this.width = t.clientWidth, this.height = t.clientHeight, this.offsetX = 0, this.offsetY = 0, this._setStyle(t), t.unselectable = "on", t.innerHTML = "", x.ac(t, "bmap-container"), t.appendChild(this.render()), this._initDate = new Date, this.platform = t.children[0], this.maskLayer = this.platform.children[0], this._panes = {}, this.centerPoint = new e1(0, 0), this.zoomLevel = 0, this._heading = 0, this._tilt = 0, this._bounds = new cv, this.lastLevel = 0, this._lock = !1, this._enableTiltZoom = 7, this._enableHeadingZoom = 7, this.defaultZoomLevel = null, this.defaultCenter = null, this.zoomEventStatus = "idle", this.currentOperation = cx.idle, this._setConfig(e), this._initMapRenderType(), this._animationInfo = {}, this._animationInfoUnstopable = {}, this.suspendLoad = !1, this._customTileLabels = [], be[this.config.mapType] || (this.config.mapType = BMAP_NORMAL_MAP), this.isGlobeMapType(this.config.mapType) && !this.config.enableEarth && this.forceEnableEarth() === !1 && (this.config.mapType = BMAP_NORMAL_MAP), this.mapType = this.config.mapType, this.preMapType = null, "webgl" === this._renderType ? (this.getMapType() !== bW.EARTH && this.isGlobeMapType() || (this._workerMgr = new d9(this), this._featureMgr = new bY, this.jobScheduler = new dS(this), this.benchmark = new M, this._setupWebGLMap()), x.extend(this, bT.prototype), this.deviceInfo = {
                    hardwareInfo: {
                        renderer: "",
                        vendor: ""
                    }
                }, aA.ifSupportWebGL._renderer && (this.deviceInfo.hardwareInfo.renderer = aA.ifSupportWebGL._renderer, this.deviceInfo.hardwareInfo.vendor = aA.ifSupportWebGL._vendor)) : x.extend(this, U.prototype), this.config.enableEarth) {
                var i = this.maskLayer.style;
                i.opacity = 0, i.background = "#000", this.isGlobeMapType(this.config.mapType) && (i.opacity = 1), setTimeout(function() {
                    i.WebkitTransition = i.transition = "opacity .4s"
                }, 100)
            }
            this._isHybridShow = this.config.showStreetLayer, this.temp = {
                operating: !1,
                arrow: 0,
                lastDomMoveTime: 0,
                lastLoadTileTime: 0,
                lastMovingTime: 0,
                canKeyboard: !1,
                I: function(t) {
                    return x.I(t)
                },
                curSpots: [],
                curSpotsArray: [],
                curAreaSpot: null,
                spotsGuid: 1,
                registerIndex: -1,
                hoverOnSpot: null,
                isStdCtrlBusy: !1
            }, window.InstanceCore = this.temp.I, this.platform.style.cursor = this.config.defaultCursor, this._bind();
            for (var n = 0; n < aI._register.length; n++) aI._register[n](this);
            this.temp.registerIndex = n;
            var o = this;
            "webgl" === this._renderType ? cG.load("oppcgl", function() {
                o._asyncRegister()
            }) : cG.load("oppc", function() {
                o._asyncRegister()
            }), this.isGlobeMapType(this.config.mapType) && (aI.Earth ? o._syncAndChangeMapType(this.config.mapType) : cG.load("earth"))
        }

        function a4(t, e, i, n) {
            this.cx = 3 * t, this.bx = 3 * (i - t) - this.cx, this.ax = 1 - this.cx - this.bx, this.cy = 3 * e, this.by = 3 * (n - e) - this.cy, this.ay = 1 - this.cy - this.by, this.p1x = t, this.p1y = n, this.p2x = i, this.p2y = n
        }

        function l(t) {
            var e = {
                duration: 1e3,
                fps: 30,
                delay: 0,
                transition: bq.linear,
                dropLastAnimation: !1
            };
            if (t)
                for (var i in t) e[i] = t[i];
            if (t.beginTime && (this._beginTime = t.beginTime), this._callbacks = [], this._options = e, e.delay) {
                var n = this;
                setTimeout(function() {
                    n._doStart()
                }, e.delay)
            } else this._doStart()
        }

        function bZ(t) {
            return t.style
        }

        function b5(t) {
            if (x.Browser.ie > 0) t.unselectable = "on", t.selectstart = function() {
                return !1
            }, t.onmousedown = function(t) {
                return t.preventDefault(), !1
            };
            else {
                var e = bZ(t);
                e.MozUserSelect = "none", e.WebkitUserSelect = "none", t.addEventListener("mousedown", function(t) {
                    t.preventDefault()
                }, !1)
            }
        }

        function eP(t) {
            return t && t.parentNode && 11 !== t.parentNode.nodeType
        }

        function co(t, e) {
            return t.insertAdjacentHTML("beforeEnd", e), t.lastChild
        }

        function e8(t, e) {
            var i = document.createElement("div");
            i.innerHTML = e;
            var n = i.childNodes[0];
            return t.parentNode.insertBefore(n, t)
        }

        function g(t) {
            t = t || window.event, t.stopPropagation ? t.stopPropagation() : t.cancelBubble = !0
        }

        function a6(t) {
            return t = t || window.event, t.preventDefault ? t.preventDefault() : t.returnValue = !1, !1
        }

        function bX(t) {
            return g(t), a6(t)
        }

        function dP() {
            var t = document.documentElement,
                e = document.body;
            return t && (t.scrollTop || t.scrollLeft) ? [t.scrollTop, t.scrollLeft] : e ? [e.scrollTop, e.scrollLeft] : [0, 0]
        }

        function dD(t) {
            if (t) {
                t.onload = t.onerror = null;
                var e, i, n, o = t.attributes;
                if (o)
                    for (i = o.length, e = 0; i > e; e += 1) n = o[e].name, "function" == typeof t[n] && (t[n] = null);
                if (o = t.children)
                    for (i = o.length, e = 0; i > e; e += 1) dD(t.children[e])
            }
        }

        function aX(t, e, i) {
            var n = e.lng - i.lng,
                o = e.lat - i.lat;
            if (0 === n) return Math.abs(t.lng - e.lng);
            if (0 === o) return Math.abs(t.lat - e.lat);
            var a = o / n,
                r = e.lat - a * e.lng;
            return Math.abs(a * t.lng - t.lat + r) / Math.sqrt(a * a + 1)
        }

        function eG(t, e) {
            return t && e ? Math.round(Math.sqrt(Math.pow(t.x - e.x, 2) + Math.pow(t.y - e.y, 2))) : void 0
        }

        function a2(t, e) {
            return t && e ? Math.round(Math.sqrt(Math.pow(t.lng - e.lng, 2) + Math.pow(t.lat - e.lat, 2))) : 0
        }

        function bP(t, e) {
            var i = Math.round((t.x + e.x) / 2),
                n = Math.round((t.y + e.y) / 2);
            return new cN(i, n)
        }

        function eU(t, e) {
            var i = [];
            e = e || function(t) {
                return t
            };
            for (var n in t) i.push(n + "=" + e(t[n]));
            return i.join("&")
        }

        function H(t, e, i) {
            var n = document.createElement(t);
            i && (n = document.createElementNS(i, t)), e = e || {};
            for (var o in e) {
                var a = {
                    "for": "htmlFor",
                    "class": "cssClass"
                }[o] || o;
                if ("style" !== o)
                    if ("class" !== o)
                        if (n.setAttribute) n.setAttribute(a, e[o]);
                        else try {
                            n[a] = e[o]
                        } catch (n) {} else x.ac(n, e[o]);
                else n.style.cssText = e[o]
            }
            return n
        }

        function dZ(t) {
            return t.currentStyle ? t.currentStyle : t.ownerDocument && t.ownerDocument.defaultView ? t.ownerDocument.defaultView.getComputedStyle(t, null) : void 0
        }

        function a7(t) {
            return "function" == typeof t
        }

        function eL(t) {
            var e, i, n, o, a, r = "",
                s = "",
                l = "",
                h = 0,
                c = /[^A-Za-z0-9+/=]/g;
            if (!t || c.exec(t)) return t;
            t = t.replace(/[^A-Za-z0-9+/=]/g, "");
            do n = eX.indexOf(t.charAt(h++)), o = eX.indexOf(t.charAt(h++)), a = eX.indexOf(t.charAt(h++)), l = eX.indexOf(t.charAt(h++)), e = n << 2 | o >> 4, i = (15 & o) << 4 | a >> 2, s = (3 & a) << 6 | l, r += String.fromCharCode(e), 64 !== a && (r += String.fromCharCode(i)), 64 !== l && (r += String.fromCharCode(s)), e = i = s = "", n = o = a = l = ""; while (h < t.length);
            return r
        }

        function d5() {
            return aN() || cY()
        }

        function aN() {
            var t = navigator.userAgent;
            return t.indexOf("iPhone") > -1 || t.indexOf("iPad") > -1 ? !0 : !1
        }

        function cY() {
            var t = navigator.userAgent;
            return t.indexOf("Android") > -1 ? !0 : !1
        }

        function bI() {
            var t = navigator.userAgent;
            return t.indexOf("baiduboxapp") > -1
        }

        function cq(t) {
            return t * Math.PI / 180
        }

        function b0(t) {
            return t / Math.PI * 180
        }

        function cs(t, e) {
            var i = Math.pow(10, e);
            if ("number" == typeof t) return Math.round(t * i) / i;
            for (var n = 0; n < t.length; n++) t[n] = cs(t[n], e);
            return t
        }

        function dL(t, e, i) {
            return e > t ? t = e : t > i && (t = i), t
        }

        function d0(t, e) {
            for (; 0 > t;) t += e;
            return t % e
        }

        function cE(t, e) {
            return t >= 0 && e >= 0 || 0 > t && 0 > e
        }

        function ax(t) {
            if (t._gl) return t._gl;
            var e = {
                    alpha: !0,
                    antialias: !1,
                    failIfMajorPerformanceCaveat: !1,
                    preserveDrawingBuffer: !1,
                    stencil: !1
                },
                i = t.getContext("webgl", e) || t.getContext("experimental-webgl", e);
            return t._gl = i, i
        }

        function c3(t, e) {
            for (var i = 0; i < e.length; i++) x.on(t, e[i], g)
        }

        function fi(t, e, i) {
            e[i] = t.getUniformLocation(e, i)
        }

        function dk(t, e, i, n, o) {
            var a = "";
            switch (o) {
                case "mat4":
                    return void t.uniformMatrix4fv(e[i], !1, n);
                case "v3":
                    a = "uniform3fv";
                    break;
                case "f":
                    a = "uniform1f";
                    break;
                case "i":
                    a = "uniform1i"
            }
            if ("" === a) throw "error";
            t[a](e[i], n)
        }

        function D(t, e) {
            for (; 0 > t;) t += 360;
            t %= 360;
            var i = e.width,
                n = e.height,
                o = i,
                a = n;
            if (90 > t) var r = Math.sin(cq(t)) * i,
                s = Math.sin(cq(t)) * n,
                l = Math.cos(cq(t)) * i,
                h = Math.cos(cq(t)) * n,
                o = Math.ceil(l + s),
                a = Math.ceil(r + h);
            else if (180 > t) var t = t - 90,
                r = Math.sin(cq(t)) * i,
                s = Math.sin(cq(t)) * n,
                l = Math.cos(cq(t)) * i,
                h = Math.cos(cq(t)) * n,
                o = Math.ceil(r + h),
                a = Math.ceil(l + s);
            else if (270 > t) var t = t - 180,
                r = Math.sin(cq(t)) * i,
                s = Math.sin(cq(t)) * n,
                l = Math.cos(cq(t)) * i,
                h = Math.cos(cq(t)) * n,
                o = Math.ceil(l + s),
                a = Math.ceil(r + h);
            else var t = t - 270,
                r = Math.sin(cq(t)) * i,
                s = Math.sin(cq(t)) * n,
                l = Math.cos(cq(t)) * i,
                h = Math.cos(cq(t)) * n,
                o = Math.ceil(r + h),
                a = Math.ceil(l + s);
            var c = o - i,
                u = a - n;
            return [0 - c / 2, 0 - u / 2, i + c / 2, n + u / 2]
        }

        function ex(t) {
            return t.toDataURL() === ex._blankData ? !0 : !1
        }

        function eq(t, e, i) {
            var n = [i.lng - t.lng, i.lat - t.lat],
                o = [e.lng - t.lng, e.lat - t.lat];
            return n[0] * o[1] - n[1] * o[0]
        }

        function bm(t, e, i) {
            var n, o, a, r;
            return t.lng < e.lng ? (n = t.lng, a = e.lng) : (n = e.lng, a = t.lng), t.lat < e.lat ? (o = t.lat, r = e.lat) : (o = e.lat, r = t.lat), i.lng < n || i.lng > a || i.lat < o || i.lat > r ? !1 : !0
        }

        function es(t, e, i, n) {
            var o = eq(i, n, t),
                a = eq(i, n, e),
                r = eq(t, e, i),
                s = eq(t, e, n);
            return 0 > o * a && 0 > r * s ? !0 : 0 === o && bm(i, n, t) ? !0 : 0 === a && bm(i, n, e) ? !0 : 0 === r && bm(t, e, i) ? !0 : 0 === s && bm(t, e, n) ? !0 : !1
        }

        function e6(t, e) {
            var i = e.parentNode;
            i.lastChild === e ? i.appendChild(t) : i.insertBefore(t, e.nextSibling)
        }

        function fa(t, e) {
            if (0 === e) return t;
            var i = 0,
                n = 0;
            if (!t) throw "异常";
            if (0 === t.length) return [];
            for (var o = 1, a = t.length - 1; a > o; o++) {
                var r = aX(t[o], t[0], t[t.length - 1]);
                r > i && (n = o, i = r)
            }
            var s = [];
            if (i >= e) {
                for (var l = t.slice(0, n), h = t.slice(n, t.length), c = fa(l, e), u = fa(h, e), o = 0, a = c.length; a > o; o++) s.push(c[o]);
                for (var o = 0, a = u.length; a > o; o++) s.push(u[o])
            } else s.push(t[0]), s.push(t[t.length - 1]);
            return s
        }

        function cZ(t) {
            return Math.log2 ? Math.log2(t) : Math.log(t) / Math.LN2
        }

        function aK(t, e, i) {
            return Math.min(i, Math.max(e, t))
        }

        function bD(t, e) {
            if (!e) return t;
            var i = e[0],
                n = e[1],
                o = e[2],
                a = e[3],
                r = [],
                s = [];
            return r[0] = a * t[0] + o * t[2], r[1] = t[1], r[2] = -o * t[0] + a * t[2], s[0] = r[0], s[1] = n * r[1] - i * r[2], s[2] = i * r[1] + n * r[2], s
        }

        function aQ(t) {
            var e = (t - Date.UTC(2e3, 0, 1, 12)) / 864e5 / 36525,
                i = (d3.utcDay.floor(t) - t) / 864e5 * 360 - 180;
            return [i - I(e) * y, eu(e) * y]
        }

        function I(t) {
            var e = d7(t),
                i = cr(t),
                n = S(t),
                o = Math.tan(d4(t) / 2);
            return o *= o, o * Math.sin(2 * n) - 2 * e * Math.sin(i) + 4 * e * o * Math.sin(i) * Math.cos(2 * n) - .5 * o * o * Math.sin(4 * n) - 1.25 * e * e * Math.sin(2 * i)
        }

        function eu(t) {
            return Math.asin(Math.sin(d4(t)) * Math.sin(eJ(t)))
        }

        function eJ(t) {
            return aD(t) - (.00569 + .00478 * Math.sin((125.04 - 1934.136 * t) * ak)) * ak
        }

        function aD(t) {
            return S(t) + cu(t)
        }

        function cr(t) {
            return (357.52911 + t * (35999.05029 - 1537e-7 * t)) * ak
        }

        function S(t) {
            var e = (280.46646 + t * (36000.76983 + 3032e-7 * t)) % 360;
            return (0 > e ? e + 360 : e) / 180 * Math.PI
        }

        function cu(t) {
            var e = cr(t);
            return (Math.sin(e) * (1.914602 - t * (.004817 + 14e-6 * t)) + Math.sin(e + e) * (.019993 - 101e-6 * t) + 289e-6 * Math.sin(e + e + e)) * ak
        }

        function d4(t) {
            return dt(t) + .00256 * Math.cos((125.04 - 1934.136 * t) * ak) * ak
        }

        function dt(t) {
            return (23 + (26 + (21.448 - t * (46.815 + t * (59e-5 - .001813 * t))) / 60) / 60) * ak
        }

        function d7(t) {
            return .016708634 - t * (42037e-9 + 1.267e-7 * t)
        }

        function ay() {
            return window.devicePixelRatio || 1
        }

        function ae(t) {
            var e, i, n;
            return t >= 0 ? (n = 65536 * Math.floor(t / 65536), e = n, i = t - n) : (n = 65536 * Math.floor(-t / 65536), e = -n, i = t + n), [e, i]
        }

        function A(t) {
            return t.lng >= 0 && t.lat >= 0 ? new e1(t.lng - 1e7, t.lat - 6e6) : t.lng >= 0 && t.lat < 0 ? new e1(t.lng - 1e7, t.lat + 6e6) : t.lng < 0 && t.lat >= 0 ? new e1(t.lng + 1e7, t.lat - 6e6) : t.lng < 0 && t.lat < 0 ? new e1(t.lng + 1e7, t.lat + 6e6) : void 0
        }

        function aZ(t, e, i) {
            var n = "mouseWheel";
            return x.Platform.macintosh && (!isNaN(t) && (10 > t || 120 !== t) && e % 1 === 0 && 5 > e && (n = "padScroll"), x.Browser.firefox && e % 1 === 0 && 5 > e && 0 === i && (n = "padScroll")), x.Browser.safari && 12 === t && (n = "mouseWheel"), n
        }

        function b1(t, e) {
            for (var i = t[0], n = t[1], o = !1, a = 0, r = e.length - 2; a < e.length; a += 2) {
                var s = e[a],
                    l = e[a + 1],
                    h = e[r],
                    c = e[r + 1],
                    u = l > n != c > n && (h - s) * (n - l) / (c - l) + s > i;
                u && (o = !o), r = a
            }
            return o
        }

        function bA(t, e, i, n) {
            return n = n || .4, t > i ? t = Math.pow(t - i + 1, n) + i - 1 : e > t && (t = e - Math.pow(e - t + 1, n) + 1), t
        }

        function ei(t) {
            for (var e = "", i = 0; i < t.length; i++) {
                var n = t.charCodeAt(i) << 1,
                    o = n.toString(2),
                    a = o.length,
                    r = o;
                8 > a && (r = "00000000" + o, r = r.substr(o.length, 8)), e += r
            }
            for (var s = 5 - e.length % 5, l = [], i = 0; s > i; i++) l[i] = "0";
            e = l.join("") + e;
            for (var h = [], i = 0; i < e.length / 5; i++) {
                var n = e.substr(5 * i, 5),
                    c = parseInt(n, 2) + 50;
                h.push(String.fromCharCode(c))
            }
            return h.join("") + s.toString()
        }

        function ad(t, e) {
            var i = aI.TVC || window.TVC;
            return i && i[t] && i[t][e] && i[t][e].version && i[t][e].updateDate || (i = dm.tvc), {
                ver: i[t][e].version,
                udt: i[t][e].updateDate
            }
        }

        function dI() {
            var t = aI.MSV || window.MSV;
            return t && t.mapstyle && t.mapstyle.updateDate && t.mapstyle.version || (t = dm.msv), {
                ver: t.mapstyle.version,
                udt: t.mapstyle.updateDate
            }
        }

        function cS(t, e) {
            for (var i = t.slice(0), n = 0; n < i.length; n++) i[n] += e;
            return i
        }

        function aP(t) {
            aw || (t.fire(new aB("onloadtile")), aw = setTimeout(function() {
                aw = null
            }, 1e3))
        }

        function dj() {
            return bs("//map.baidu.com") || bs("//maps.baidu.com") || bs("//ditu.baidu.com") ? !0 : !1
        }

        function bs(t) {
            var e = window.location,
                i = document.createElement("a");
            return i.href = t, i.hostname === e.hostname && i.port === e.port && i.protocol === e.protocol
        }

        function cG() {}

        function M() {
            this._timeData = {}
        }

        function ej(t) {
            this._elemType = t, this._objCollection = {}
        }

        function bE() {}

        function b3(t, e) {
            this._name = t, this._baseZoom = 18, this._opts = {
                tileSize: 256
            }, x.extend(this._opts, e || {})
        }

        function cc(t) {
            return t = t.toLowerCase(), P.indexOf(t) >= 0 ? !0 : t.indexOf("mobile") >= 0 ? !0 : !1
        }

        function dK(t) {
            t = t.toLowerCase();
            for (var e = 0; e < bp.length; e++)
                if (t.indexOf(bp[e]) >= 0) return !0;
            return !1
        }

        function cA(t) {
            return t ? cc(t) ? !1 : dK(t) ? !0 : !1 : !1
        }

        function di(t, e) {
            this._size = t, this._curSize = 0, this._cache = {}, this._least = null, this._most = null, this._options = {
                clearCallback: null,
                removeOldCallback: null
            }, e = e || {};
            for (var i in e) this._options[i] = e[i];
            this._getDataTimes = 0, this._hitTimes = 0
        }

        function az() {
            this._map = null, this._container, this._type = "control", this.blockInfoWindow = !0, this._visible = !0
        }

        function cn(t) {
            az.call(this), t = t || {}, this._opts = {
                printable: !1
            }, x.extend(this._opts, t), this._copyrightCollection = [], this.defaultAnchor = BMAP_ANCHOR_BOTTOM_LEFT, this.defaultOffset = new cF(5, 2), this.setAnchor(t.anchor), this._canShow = !0, this.sateMapStyle = !1, this.blockInfoWindow = !1, this._asyncLoadCode()
        }

        function eS(t) {
            az.call(this), t = t || {}, this._opts = {
                printable: !1
            }, this._opts = x.extend(x.extend(this._opts, {
                unit: "metric"
            }), t), this.defaultAnchor = BMAP_ANCHOR_BOTTOM_LEFT, this.defaultOffset = new cF(81, 18), d5() && (this.defaultOffset = new cF(75, 10)), this.setAnchor(t.anchor), this._units = {
                metric: {
                    name: "metric",
                    conv: 1,
                    incon: 1e3,
                    u1: "米",
                    u2: "公里"
                },
                us: {
                    name: "us",
                    conv: 3.2808,
                    incon: 5280,
                    u1: "英尺",
                    u2: "英里"
                }
            }, this.sateMapStyle = !1, this._units[this._opts.unit] || (this._opts.unit = "metric"), this._scaleText = null, this._numberArray = {}, this._asyncLoadCode()
        }

        function ca(t) {
            az.call(this), t = t || {}, this._opts = {
                printable: !1
            }, x.extend(this._opts, t), this.controlHeight = [{
                width: 65,
                height: 227,
                zoomHeight: 227,
                zoomWidth: 37,
                sliderHeight: 180
            }, {
                width: 65,
                height: 47,
                zoomHeight: this._opts.forceNew === !0 ? 56 : 47,
                zoomWidth: 37,
                sliderHeight: 0
            }, {
                width: 37,
                height: 57,
                zoomHeight: 0,
                zoomWidth: 0,
                sliderHeight: 0
            }, {
                width: 26,
                height: 47,
                zoomHeight: 47,
                zoomWidth: 6,
                sliderHeight: 0
            }, {
                width: 56,
                height: 47,
                zoomHeight: 47,
                zoomWidth: 37,
                sliderHeight: 180
            }], this.defaultAnchor = BMAP_ANCHOR_TOP_LEFT, this.defaultOffset = new cF(10, 10), this.setAnchor(t.anchor), this.setType(t.type), this._maxTotalZoomLv = 19, this._minZoomLevel = -1, this._maxZoomLevel = -1, this._totalZoomLv = -1, this._sliderInterval = 10, this._sliderHeight = 180, this._minBarY = 1, this._maxBarY = -1, this._curBarY = -1, this._zoomDom = null, this._zoomBtnDom = null, this._sliderDom = null, this._sliderBaseDom = null, this._cZIndex = "1100", this._asyncLoadCode()
        }

        function aT(t) {
            az.call(this), t = t || {}, this._opts = {
                printable: !1
            }, this.defaultAnchor = BMAP_ANCHOR_TOP_RIGHT, this.defaultOffset = new cF(10, 10), this.setAnchor(t.anchor), this._opts = x.extend(x.extend(this._opts, {
                offset: this.defaultOffset,
                enableSwitch: !0
            }), t);
            var e = this;
            cG.load("control", function() {
                e._asyncDraw()
            })
        }

        function by(t) {
            az.call(this), t = t || {}, this._opts = {}, this._opts = x.extend(this._opts, t), this._zoomInDisabled = !1, this._zoomOutDisabled = !1, this._zoomInTapped = !1, this._zoomOutTapped = !1, this.defaultAnchor = e9.BOTTOM_RIGHT, this.defaultOffset = new cF(10, 50), this.setAnchor(t.anchor), this._asyncLoadCode()
        }

        function aR(t) {
            az.call(this), t = t || {}, this._opts = {
                autoZoom: !0,
                autoViewport: !0,
                onSuccess: null,
                onFail: null,
                showTips: !0,
                enableHighAccuracy: !0,
                timeout: 5e3
            }, this._opts = x.extend(this._opts, t), this.defaultAnchor = e9.BOTTOM_LEFT, this.defaultOffset = new cF(10, 50), this.watchPosition = this._opts.watchPosition || !1, this.useCompass = this._opts.useCompass || !1, this.locMarker = null, this.locLevel = 16, this.setAnchor(this._opts.anchor), this.onLocationStart = t.onLocationStart || null, this._asyncLoadCode()
        }

        function O(t) {
            az.call(this), t = t || {}, this._opts = {}, this._opts = x.extend(this._opts, t), this.defaultAnchor = e9.BOTTOM_LEFT, this.defaultOffset = new cF(10, 5), this.setAnchor(t.anchor)
        }

        function et(t, e) {
            this._map = t, this._indoorInfo = e, this._visible = !0, this._adjustVisible = !0, this._isMobile = d5(), this._sizeConfig = {
                FLOOR_BTN_HEIGHT: this._isMobile ? 35 : 26,
                SWITCH_ARROW_HEIGHT: this._isMobile ? 20 : 15
            }, this._init()
        }

        function de(t) {
            this._map = t, t._navigationCtrl = this, this._firstAnimation = !0, this._init()
        }

        function fb(t, e) {
            this._map = t, this._target = t;
            var i = t.temp.originMapType || t.mapType;
            t.isGlobeMapType(i) && t._earth && (this._target = t._earth), this._outContainer = e || t.getContainer(), this._imgRatio = ay() >= bU.HIGH_RES_MIN_RATIO ? 2 : 1, this._imgPath = dm.imgPath + "earth-navi-control-pc4" + (2 === this._imgRatio ? "-2x.png" : ".png"), this._enabled = !0;
            var n = this;
            this._setHeadingOptions = {
                callback: function() {
                    n._target.setLock(!1)
                }
            }, this._init()
        }

        function cT(t, e) {
            this._map = t, this._target = t;
            var i = t.temp.originMapType || t.mapType;
            t.isGlobeMapType(i) && t._earth && (this._target = t._earth), this._outContainer = e || t.getContainer(), this._imgRatio = ay() >= bU.HIGH_RES_MIN_RATIO ? 2 : 1, this._imgPath = dm.imgPath + "gl-navi-control-pc4" + (2 === this._imgRatio ? "-2x.png" : ".png"), this._enabled = !0;
            var n = this;
            this._setTiltOptions = {
                callback: function() {
                    n._target.setLock(!1)
                }
            }, this._init()
        }

        function bl(t) {
            cI.call(this), this._opts = {
                container: null,
                cursor: "default"
            }, this._opts = x.extend(this._opts, t), this._type = "contextmenu", this._map = null, this._container, this._left = 0, this._top = 0, this._items = [], this._rItems = [], this._dividers = [], this._enable = !0, this.curPixel = null, this.curPoint = null, this._isOpen = !1;
            var e = this;
            cG.load("menu", function() {
                e._draw()
            })
        }

        function dH(t, e, i) {
            if (t && e && "function" == typeof e) {
                cI.call(this), this._opts = {
                    width: 100,
                    id: ""
                }, i = i || {}, this._opts.width = 1 * i.width ? i.width : 100, this._opts.id = i.id ? i.id : "", this._text = t + "", this._callback = e, this._map = null, this._type = "menuitem", this._contextmenu = null, this._container = null, this._enabled = !0;
                var n = this;
                cG.load("menu", function() {
                    n._draw()
                })
            }
        }

        function cv(t, e) {
            this.setSouthWest(t), this.setNorthEast(e)
        }

        function e1(t, e) {
            isNaN(t) && (t = eL(t), t = isNaN(t) ? 0 : t), "string" == typeof t && (t = parseFloat(t)), isNaN(e) && (e = eL(e), e = isNaN(e) ? 0 : e), "string" == typeof e && (e = parseFloat(e)), this.lng = t, this.lat = e
        }

        function cP() {}

        function bR(t, e) {
            for (-90 > t ? t = -90 : t > 90 && (t = 90); - 180 > e;) e += 360;
            for (; e > 180;) e -= 360;
            this.lat = t || 0, this.lng = e || 0
        }

        function c1(t, e) {
            t && !e && (e = t), this._sw = this._ne = null, this._swLng = this._swLat = null, this._neLng = this._neLat = null, t && (this._sw = new bR(t.lat, t.lng), this._ne = new bR(e.lat, e.lng), this._swLng = t.lng, this._swLat = t.lat, this._neLng = e.lng, this._neLat = e.lat)
        }

        function aH() {
            this._type = "overlay"
        }

        function bJ() {
            x.BaseClass.call(this), aH.call(this), this._visible = !0, this._visibleInternal = !0, this.infoWindow = null, this._dblclickTime = 0
        }

        function dg(t) {
            this.map = t, this._overlays = {}, this._overlayArray = [], this._customOverlays = [], t._overlays = this._overlays, t._overlayArray = this._overlayArray, t._customOverlays = this._customOverlays, this._zoomingOrMoving = !1, this._init()
        }

        function s(t) {
            bJ.call(this), this._config = {
                strokeColor: "#000",
                strokeWeight: 2,
                strokeOpacity: 1,
                strokeStyle: "solid",
                dashArray: null,
                strokeLineCap: "round",
                strokeLineJoin: "round",
                enableMassClear: !0,
                getParseTolerance: null,
                getParseCacheIndex: null,
                enableParse: !0,
                enableEditing: !1,
                mouseOverTolerance: 15,
                geodesic: !1,
                clip: !0,
                texture: null,
                textureSize: null,
                textureZoomWithMap: !1,
                textureRepeat: !0
            }, this.setConfig(t), (this._config.strokeOpacity < 0 || this._config.strokeOpacity > 1) && (this._config.strokeOpacity = 1), (this._config.fillOpacity < 0 || this._config.fillOpacity > 1) && (this._config.fillOpacity = 1), "solid" !== this._config.strokeStyle && "dashed" !== this._config.strokeStyle && "dotted" !== this._config.strokeStyle && (this._config.strokeStyle = "solid"), this.domElement = null, this._bounds = new cv, this.points = [], this.greatCirclePoints = [], this._parseCache = [], this._holesCache = [], this._parseCacheGL = [], this._parseCacheGLRaw = [], this._areaCacheGL = [], this._strokeStyleInfoForGL = [
                []
            ], this._fillStyleInfoForGL = "", this.vertexMarkers = [], this._temp = {}
        }

        function eO(t, e, i) {
            if (t && e) {
                this.imageUrl = null, this.imageDom = null, "string" == typeof t ? this.imageUrl = t : (this.imageDom = t, this.imageDom.id || (this.imageDom.id = aI.getGUID("icon_dom_"))), this.size = e;
                var n = new cF(Math.floor(e.width / 2), Math.floor(e.height / 2)),
                    o = {
                        offset: n,
                        imageOffset: new cF(0, 0)
                    };
                i = i || {};
                for (var a in i) o[a] = i[a];
                i.anchor && (o.offset = i.anchor), this.anchor = this.offset = o.offset, this.imageOffset = o.imageOffset, this.infoWindowOffset = i.infoWindowOffset || this.offset, this.printImageUrl = i.printImageUrl || "", this.imageSize = i.imageSize || this.size, this.srcSetObject = {}, this.setImageSrcset(i.srcset || i.srcSet)
            }
        }

        function W(t, e) {
            x.BaseClass.call(this), this.content = t, this.map = null, this._config = {
                width: 0,
                height: 0,
                maxWidth: 600,
                offset: new cF(0, 0),
                title: "",
                maxContent: "",
                enableMaximize: !1,
                enableAutoPan: !0,
                enableCloseOnClick: !0,
                margin: [10, 10, 40, 10],
                collisions: [
                    [10, 10],
                    [10, 10],
                    [10, 10],
                    [10, 10]
                ],
                ifMaxScene: !1,
                onClosing: function() {
                    return !0
                }
            }, this.setConfig(e), 0 != this._config.width && (this._config.width < 220 && (this._config.width = 220), this._config.width > 730 && (this._config.width = 730)), 0 != this._config.height && (this._config.height < 60 && (this._config.height = 60), this._config.height > 650 && (this._config.height = 650)), 0 != this._config.maxWidth && (this._config.maxWidth < 220 && (this._config.maxWidth = 220), this._config.maxWidth > 730 && (this._config.maxWidth = 730)), this.isWinMax = !1, this.IMG_PATH = dm.imgPath, this.overlay = null;
            var i = this;
            cG.load("infowindow", function() {
                i._draw()
            })
        }

        function ai(t, e) {
            bJ.call(this), this.content = t, this.map = null, this.domElement = null, this._config = {
                width: 0,
                offset: new cF(0, 0),
                styles: {
                    backgroundColor: "#fff",
                    border: "1px solid #f00",
                    padding: "1px",
                    whiteSpace: "nowrap",
                    fontSize: "12px",
                    zIndex: "80",
                    MozUserSelect: "none"
                },
                point: null,
                enableMassClear: !0
            }, e = e || {}, this.setConfig(e), this._config.width < 0 && (this._config.width = 0), this.point = this._config.point;
            var i = this;
            cG.load("marker", function() {
                i._draw()
            })
        }

        function b8(t, e) {
            bJ.call(this), e = e || {}, t instanceof e1 ? (this.point = t, this.latLng = cP.convertMC2LL(t)) : (this.latLng = t, this.point = cP.convertLL2MC(t)), this._rotation = 0, this.map = null, this._animation = null, this.domElement = null, this.iconDom = null, this.infoWindowDom = null, this.siblingElement = null, this.textureCoord = null, this.textureCoordGLMap = null, this.collisionDetectionFailed = !1, this._config = {
                offset: new cF(0, 0),
                opacity: 1,
                icon: null,
                title: "",
                infoWindow: null,
                label: null,
                baseZIndex: 0,
                clickable: !0,
                zIndexFixed: !1,
                isTop: !1,
                enableMassClear: !0,
                enableDragging: !1,
                raiseOnDrag: !1,
                restrictDraggingArea: !1,
                startAnimation: "",
                enableCollisionDetection: !1,
                rank: 0,
                enableDraggingMap: !1
            }, this.setConfig(e), e.icon || (this._config.icon = new eO(dm.imgPath + "marker_red.png", new cF(23, 25), {
                offset: new cF(10, 25),
                infoWindowOffset: new cF(10, 0)
            })), this._isDragging = !1;
            var i = this;
            cG.load("marker", function() {
                i._draw()
            })
        }

        function a(t, e) {
            s.call(this, e), this.setPoints(t);
            var i = this;
            cG.load("poly", function() {
                i._draw()
            })
        }

        function dA(t, e) {
            s.call(this, e), this._normalizedBounds = new cv, this.setPoints(t);
            var i = this;
            cG.load("poly", function() {
                i._draw()
            })
        }

        function al(t, e) {
            s.call(this, e), e = e || {}, this._config.fillOpacity = "number" == typeof e.fillOpacity ? e.fillOpacity : .6, dL(this._config.fillOpacity, 0, 1), this._config.fillColor = "" === e.fillColor ? "" : e.fillColor ? e.fillColor : "#fff", this._parseFillCacheWebGL = [], this.setPoints(t, e);
            var i = this;
            cG.load("poly", function() {
                i._draw()
            })
        }

        function d8(t, e, i) {
            this.point = t, this.radius = Math.abs(e), al.call(this, [], i)
        }

        function fc(t, e) {
            x.BaseClass.call(this), this.content = t, this.map = null, this._config = {
                width: 0,
                height: 0,
                maxWidth: 600,
                offset: new cF(0, 0),
                title: "",
                maxContent: "",
                enableMaximize: !1,
                enableAutoPan: !0,
                enableCloseOnClick: !0,
                margin: [10, 10, 40, 10],
                collisions: [
                    [10, 10],
                    [10, 10],
                    [10, 10],
                    [10, 10]
                ],
                ifMaxScene: !1,
                onClosing: function() {
                    return !0
                }
            }, this.setConfig(e), this._config.width < 50 && (this._config.width = 50), this._config.width > 730 && (this._config.width = 730), 0 != this._config.height && (this._config.height < 50 && (this._config.height = 50), this._config.height > 650 && (this._config.height = 650)), 0 !== this._config.maxWidth && (this._config.maxWidth < 50 && (this._config.maxWidth = 50), this._config.maxWidth > 730 && (this._config.maxWidth = 730)), this.isWinMax = !1, this.IMG_PATH = dm.imgPath, this.overlay = null;
            var i = this;
            cG.load("simpleInfowindow", function() {
                i._draw()
            })
        }

        function cN(t, e) {
            t = isNaN(t) ? 0 : t, e = isNaN(e) ? 0 : e, this.x = t, this.y = e
        }

        function cF(t, e) {
            this.width = "number" != typeof t ? parseFloat(t) : t, this.height = "number" != typeof e ? parseFloat(e) : e
        }

        function a5(t, e, i, n, o) {
            this.mgr = t, this.position = i, this._cbks = [], this.name = t.getTileName(n, o, t.map.config.style), this.info = n, this._transparentPng = o.isTransparentPng();
            var a = H("img");
            b5(a), a.galleryImg = !1;
            var r = a.style;
            r.position = "absolute", r.width = t.tileSize + "px", r.height = t.tileSize + "px", r.left = i[0] + "px", r.top = i[1] + "px", this.img = a, this.src = e, L && 0 === i._offsetX && (r.opacity = 0, r.willChange = "opacity");
            var s = this;
            this.img.onload = function(t) {
                if (s.mgr) {
                    var e = s.mgr,
                        n = e.bufferTiles;
                    e.bufferNumber > 0 && (n[s.name] = s, n.push(s.name));
                    for (var a = n.length - e.bufferNumber, r = 0; a > 0 && r < n.length; r++) {
                        var h = n[r];
                        if (!e.mapTiles[h]) {
                            if (n[h]) {
                                n[h].mgr = null;
                                var c = n[h].img;
                                c.parentNode && (dD(c), c.parentNode.removeChild(c)), c = null, n[h].img = null, n[h] = null, delete n[h]
                            }
                            n.splice(r, 1), r--, a--
                        }
                    }
                    s.loaded = !0, e.imgNumber++, eP(s.img) || o.tilesDiv && o.tilesDiv.appendChild(s.img);
                    var t = new aB("onimagechange");
                    if (t.action = "show", t.tile = s.name, e.map.dispatchEvent(t), L && 0 === i._offsetX) {
                        new l({
                            fps: 10,
                            duration: 300,
                            render: function(t) {
                                s.img && s.img.style && (s.img.style.opacity = 1 * t)
                            },
                            finish: function() {
                                s.img && s.img.style && (delete s.img.style.opacity, s.img.style.willChange = "auto")
                            }
                        })
                    }
                    s._callCbks()
                }
            }, this.img.onerror = function() {
                if (s.error = !0, s._callCbks(), s.mgr) {
                    var t = (s.mgr, be[o.mapType]);
                    t.errorUrl && (s.img.src = t.errorUrl), eP(s.img) || o.tilesDiv && o.tilesDiv.appendChild(s.img)
                }
            }, a = null;
            var h = new aB("onimagebefore");
            h.tile = s.name, t.map.dispatchEvent(h)
        }

        function du(t) {
            this.tileLayers = [], this.map = t, this.bufferNumber = 300, this.mapTiles = [], this.bufferTiles = [], this.config = be[this.map.mapType], this.errorUrl = this.config.errorUrl, this.tileSize = this.config.tileSize, this.baseUnits = this.config.baseUnits, this.baseZoomLevel = this.config.zoomLevelBase, this.tileURLs = this.config.tileUrls, this.imgNumber = 0, this.numLoading = 0, this.temp = {}
        }

        function bG(t) {
            this.opts = t || {}, this.copyright = this.opts.copyright || {}, this.transparentPng = this.opts.transparentPng || !1, this.png8 = this.opts.png8 || !1, this.baseLayer = this.opts.baseLayer || !1, this.dataType = this.opts.dataType || 1, this.isFlat = this.opts.isFlat === !1 ? !1 : !0, this.showLabel = this.opts.showLabel === !1 ? !1 : !0;
            var e = this.opts.tileTypeName || "web";
            this.tileType = bE.getInstance(e), this.clipTile = this.opts.clipTile || !1, this._type = "tilelayer";
            var i = d5() ? 128 : 256;
            this.cacheSize = this.opts.cacheSize || i;
            var n = this;
            this.tileCache = new di(this.cacheSize, {
                clearCallback: function(t) {
                    t.label && (t.label.textImageBitmap && t.label.textImageBitmap.close(), t.label.indoorTextImageBitmap && t.label.indoorTextImageBitmap.close()), n._removeIndoorData(t)
                }
            }), this.scaler = ay() >= 1.5 ? 2 : 1, this.normalUdt = ad("ditu", "normal").udt, this.numLoading = 0, this.useThumbData = !1, this.baseLayer && (this.useThumbData = !0), this.customLayer = "boolean" == typeof this.opts.customLayer ? this.opts.customLayer : !0
        }

        function bS(t, e, i) {
            this.bounds = t, this.content = e, this.mapType = i
        }

        function R(t) {
            this._map = t, this._tileMgr = t.tileMgr, this._animationDiv = null, this._preAnimationDiv = null, this._animation = null, this._baseLayerDiv = null, this._transformStyleName = aA.ifSupportCSS3("transform", !0), this._transformOriginStyleName = aA.ifSupportCSS3("transformOrigin", !0), this._preZoomTimes = 1, this._preRenderTick = 1, this._enableCanvas2dMap = !("canvas" !== t.getRenderType()), this._isIE9 = !(9 !== x.Browser.ie);
            var e = this;
            t.addEventListener("maptypechange", function() {
                e.hide()
            }), t.addEventListener("load", function() {
                e.hide()
            })
        }

        function c(t) {
            this._initVars(t), this._initColorCanvas(), this._bindEvent(t)
        }

        function cH(t) {
            this._initVars(t)
        }

        function Q(t) {
            this._map = t, this._initCanvas(), this._initVars(), this._bindEvent(), this._tileType = bE.getInstance("na")
        }

        function ar(t) {
            this._canvas2dMapMgr = t;
            this.ratio = t._map.config.ratio;
            this._featureStyle = null, this._map = t._map; {
                var e = dI();
                "udt=" + e.udt + "&v=" + e.ver
            }
            this.sizeRatio = this.ratio > 1 ? 2 : 1, this._binaryCache = {}, this._iconCache = {}, this._initColorCanvas()
        }

        function eC(t) {
            this.initVars(t)
        }

        function bT() {}

        function dS(t) {
            this._jobQueue = [], this._idleOnlyJobQueue = [];
            var e = this;
            this.isIdle = !0, t.on("updateframe", function(t) {
                var i = 12 - t.frameTime;
                i = 1 > i ? 1 : i, e.isIdle = !1, e.idleWorkTimer && (clearInterval(e.idleWorkTimer), e.idleWorkTimer = null), e.runJobs(i)
            }), this._idleWorkerTicker = function(t) {
                return function() {
                    t.isIdle && (t.runJobs(), t.runIdleOnlyJobs())
                }
            }(this), t.on("mapglidle", function() {
                e.isIdle = !0, e.runJobs(), e.runIdleOnlyJobs(), e.idleWorkTimer = setInterval(e._idleWorkerTicker, dS.MAX_IDLE_TIME)
            })
        }

        function bY() {
            this.result = {
                bkData: [],
                eleData: [
                    [],
                    [],
                    [],
                    [],
                    [],
                    []
                ],
                tileLabels: []
            }
        }

        function r(t) {
            this._ratio = ay(), this._iconCache = {}, this._map = t, this._drawingCanvasPool = [], this._drawingCanvasHeight = 4096
        }

        function br(t, e, i) {
            var n = t.bds;
            if (!n) return !1;
            var o, a = t.tracer;
            if (a) {
                bH[a] || (o = a.toString(2), o.length < 8 && (o = new Array(8 - o.length + 1).join("0") + o), bH[a] = o), o = bH[a];
                var r = b3.mapZoomStartZoomMapping[e];
                return "1" === o[e - r]
            }
            var s = t.displayRange;
            return i >= s[0] && i <= s[1] ? !0 : !1
        }

        function b4(t, e) {
            this.map = t.map, this.layer = t, e = e || [], this.allLabels = [], this._spotData = [], this._strategyInfo = null, this.RANK1 = 1e6, this.RANK2 = 2e6, this.RANK3 = 3e6, this.RANK4 = 4e6, this.RANK5 = 5e6, this._ratio = ay(), this._useRound = !0, this._sharpenRender = !1, this._ratio > bU.HIGH_RES_MIN_RATIO && (this._useRound = !1, this._sharpenRender = !0), this._mapIsMoving = !1, this._onMapIdleCallback = e.onMapIdleCallback, this.map.temp.isPermitSpotOver = !0, this.currentSelectedLabel = null, this.map._labelProcessor = this, this.iconCache = {}, this.fixedLabelData = [], this.lineLabelData = [], this.highlightLabelData = [], this._iconLoadTimer = null, this._labelTextCanvas = null, "canvas" === this.map.config.textRenderType && (this._labelTextCanvas = this.map.tileMgr.getLabelTextCanvas()), this.bind()
        }

        function dV(t) {
            this._map = t, this.virtualTile = {
                custom: !0,
                label: {
                    fixedLabel: [],
                    indoorLabel: [],
                    lineLabel: [],
                    textureHeights: [],
                    status: "ready"
                },
                tileInfo: {
                    col: 0,
                    row: 0,
                    zoom: 0,
                    useZoom: 0,
                    loopOffsetX: 0
                },
                status: "ready"
            }, this.virtualTile.label.tileInfo = this.virtualTile.tileInfo, this.init()
        }

        function c7(t) {
            var e = null;
            try {
                cd.inMapHost ? (e = new Worker(t), e.onerror = function(i) {
                    i.preventDefault(), e = p(t)
                }) : e = p(t)
            } catch (i) {
                e = p(t)
            }
            return e
        }

        function p(t) {
            var e = null;
            try {
                var i;
                try {
                    i = new Blob(['importScripts("' + t + '");'], {
                        type: "application/javascript"
                    })
                } catch (n) {
                    var o = new(window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder);
                    o.append('importScripts("' + t + '");'), i = o.getBlob("application/javascript")
                }
                var a = window.URL || window.webkitURL,
                    r = a.createObjectURL(i);
                e = new Worker(r)
            } catch (s) {}
            return e
        }

        function d9(t) {
            this.init(t)
        }

        function cw(t) {
            this.tileLayers = [], this.map = t;
            var e = this.config = be[this.map.mapType];
            this.errorUrl = e.errorUrl, this.tileSize = e.tileSize, this.baseUnits = e.baseUnits, this.baseZoomLevel = e.zoomLevelBase, this.tileURLs = e.tileUrls, this.tilesInfoCache = {}, this.loadDelay = 10, this._labelTextCanvas = null
        }

        function am(t) {
            this._map = t, this._spotsId = null, this._init()
        }

        function ap(t) {
            this._indoorData = {}, this._map = t, this.currentUid = null, this.currentFloor = null, this._indoorControl = null, this.enterMethod = null, this.showMask = !1, this._isMobile = d5(), this._autoEnterZoom = 19, this._isMobile && (this._autoEnterZoom = 17), this._init(t), window._indoorMgr = this
        }

        function cm(t) {
            t.container.appendChild(this.render()), this.bind(t)
        }

        function d2(t) {
            cI.call(this), t && (this._opts = {}, this._map = t, this._maxLat = 84.6, this._minLat = -80.6, this._maxLatMC = cP.convertLL2MC(new bR(this._maxLat, 0)).lat, this._minLatMC = cP.convertLL2MC(new bR(this._minLat, 0)).lat)
        }

        function eB(t, e) {
            d2.call(this, t), e = e || {}, this._opts = x.extend(x.extend(this._opts || {}, {
                autoClear: !1,
                tips: "测距",
                followText: "单击确定起点，双击结束绘制",
                unit: "metric",
                showResult: !0,
                lineColor: "blue",
                lineStroke: 2,
                opacity: 1,
                lineStyle: "solid",
                cursor: dm.distCursor,
                styleCodes: {
                    lnCode: 0,
                    spCode: 0,
                    slCode: 0,
                    tlCode: 0
                },
                enableMassClear: !0
            }), e), this._opts.showResult === !1 && ("undefined" == typeof e.tips && (this._opts.tips = "绘制折线"), e.cursor || (this._opts.cursor = "crosshair")), this._opts.lineStroke <= 0 && (this._opts.lineStroke = 2), this._opts.opacity > 1 ? this._opts.opacity = 1 : this._opts.opacity < 0 && (this._opts.opacity = 0), "solid" !== this._opts.lineStyle && "dashed" !== this._opts.lineStyle && (this._opts.lineStyle = "solid"), this._checked = !1, this._drawing = null, this.followTitle = null, this._totalDis = {}, this._points = [], this._paths = [], this._dots = [], this._segDistance = [], this._overlays = [], this._units = {
                metric: {
                    name: "metric",
                    conv: 1,
                    incon: 1e3,
                    u1: "米",
                    u2: "公里"
                },
                us: {
                    name: "us",
                    conv: 3.2808,
                    incon: 5279.856,
                    u1: "英尺",
                    u2: "英里"
                }
            }, this._units[this._opts.unit] || (this._opts.unit = "metric"), this._dLineColor = "#ff6319", this._dLineStroke = 3, this._dOpacity = .8, this._dLineStyle = "solid", this._dCursor = dm.distCursor, this._opts.showResult && (this._opts.followText = "单击确定起点"), this._followTextM = "单击确定地点，双击结束", this._sectionMarkerTip = "单击可删除此点，拖拽可调整位置", this._movingTimerId = null, this.text = this._opts.showResult ? "测距" : "绘线", this._isOpen = !1;
            var i = this;
            cG.load("tools", function() {
                i._draw()
            })
        }

        function bv() {
            var t = 3,
                e = 256,
                i = Math.pow(2, 18 - t) * e,
                n = 2,
                o = (n + 1) * i,
                a = cP.convertLL2MC(new e1(180, 0)),
                r = a.lng,
                s = o - r,
                l = -3,
                h = l * i,
                c = cP.convertLL2MC(new e1(-180, 0)),
                u = c.lng,
                d = u - h;
            this._validPixels = r / Math.pow(2, 18 - t), this._mc180X = r, this._mcM180X = u, this._loopOffset = s + d, this._mcTSpan = r - u, this._spaceDistance = s, this._mSpaceDistance = d
        }
        var x = x || {
            version: "20150702",
            emptyFn: function() {}
        };
        if (function() {
                x._log = [];
                var t = 0,
                    e = {};
                x.BaseClass = function(t) {
                    e[this.hashCode = t || x.BaseClass.guid()] = this
                }, x.BaseClass.guid = function() {
                    return "mz_" + (t++).toString(36)
                }, x.BaseClass.create = function() {
                    var t = new x.BaseClass;
                    return t.decontrol(), t
                };
                x.instance = x.I = function(t) {
                    return e[t]
                };
                x.BaseClass.prototype.dispose = function() {
                    this.hashCode && delete e[this.hashCode];
                    for (var t in this) "function" != typeof this[t] && delete this[t]
                }, x.BaseClass.prototype.getHashCode = function() {
                    return this.hashCode || (e[this.hashCode = x.BaseClass.guid()] = this), this.hashCode
                }, x.BaseClass.prototype.decontrol = function() {
                    delete e[this.hashCode]
                }, x.BaseClass.prototype.toString = function() {
                    return "[object " + (this._className || "Object") + "]"
                }, x.BaseClass.prototype._wlog = function(t, e) {
                    var i = x._log;
                    i.length > 100 && (i.reverse().length = 50, i.reverse()), i[i.length] = "[" + t + "][" + (this._className || "Object") + " " + this.hashCode + "] " + e
                }
            }(), Function.prototype.inherits = function(t, e) {
                var i, n, o = this.prototype,
                    a = function() {};
                a.prototype = t.prototype, n = this.prototype = new a, "string" == typeof e && (n._className = e);
                for (i in o) n[i] = o[i];
                return this.prototype.constructor = o.constructor, o = a = null, n
            }, x.BaseEvent = function(t, e) {
                this.type = t, this.returnValue = !0, this.target = e || null, this.currentTarget = this.srcElement = null, this.cancelBubble = !1, this.domEvent = null
            }, x.BaseClass.prototype.on = x.BaseClass.prototype.addEventListener = function(t, e) {
                if ("function" != typeof e) return this._wlog("error", "addEventListener:" + e + " is not a function");
                this._listeners || (this._listeners = {});
                var i = this._listeners;
                0 !== t.indexOf("on") && (t = "on" + t), "object" != typeof i[t] && (i[t] = {});
                var n = e.hashCode || x.BaseClass.guid();
                e.hashCode = n, i[t][n] && this._wlog("warning", "repeat key:" + n), i[t][n] = e
            }, x.BaseClass.prototype.off = x.BaseClass.prototype.removeEventListener = function(t, e) {
                if ("function" == typeof e) e = e.hashCode;
                else if ("string" != typeof e) return;
                this._listeners || (this._listeners = {}), 0 != t.indexOf("on") && (t = "on" + t);
                var i = this._listeners;
                i[t] && i[t][e] && delete i[t][e]
            }, x.BaseClass.prototype.fire = x.BaseClass.prototype.dispatchEvent = function(t) {
                this._listeners || (this._listeners = {});
                var e, i = this._listeners,
                    n = t.type;
                if (t.target = t.srcElement = t.target || t.srcElement || this, t.currentTarget = this, "function" == typeof this[n] && this[n](t), "object" == typeof i[n])
                    for (e in i[n]) "function" == typeof i[n][e] && i[n][e].call(this, t);
                return t.returnValue
            }, x.BaseEvent.prototype.inherit = function(t) {
                var e = this;
                return this.domEvent = t = window.event || t, e.clientX = t.clientX || t.pageX, e.clientY = t.clientY || t.pageY, e.offsetX = t.offsetX || t.layerX, e.offsetY = t.offsetY || t.layerY, e.screenX = t.screenX, e.screenY = t.screenY, e.ctrlKey = t.ctrlKey || t.metaKey, e.shiftKey = t.shiftKey, e.altKey = t.altKey, e
            }, x.Browser = function() {
                var t = navigator.userAgent,
                    e = 0,
                    i = 0,
                    n = 0,
                    o = 0,
                    a = 0,
                    r = 0,
                    s = 0,
                    l = 0,
                    h = 0,
                    c = 0;
                "object" == typeof window.opera && /Opera(\s|\/)(\d+(\.\d+)?)/.test(t) ? n = parseFloat(RegExp.$2) : /OPR(\/(\d+)(\..?)?)/.test(t) ? n = parseInt(RegExp.$2, 10) : /Edge\/((\d+)\.\d+)/.test(t) ? e = parseInt(RegExp.$2, 10) : /MSIE (\d+(\.\d+)?)/.test(t) ? i = parseFloat(RegExp.$1) : t.indexOf("Trident") > -1 && /rv:(\d+(\.\d+)?)/.test(t) ? i = parseInt(RegExp.$1, 10) : /Firefox(\s|\/)(\d+(\.\d+)?)/.test(t) ? a = parseFloat(RegExp.$2) : "Netscape" === navigator.vendor && /Netscape(\s|\/)(\d+(\.\d+)?)/.test(t) ? s = parseFloat(RegExp.$2) : t.indexOf("Safari") > -1 && /Version\/(\d+(\.\d+)?)/.test(t) && (o = parseFloat(RegExp.$1)), t.indexOf("Trident") > -1 && /Trident\/(\d+(\.\d+)?)/.test(t) ? l = parseInt(RegExp.$1, 10) : !i && !e && t.indexOf("Gecko") > -1 && -1 === t.indexOf("KHTML") && /rv\:(\d+(\.\d+)?)/.test(t) ? h = parseFloat(RegExp.$1) : !e && /chrome\/(\d+(\.\d+)?)/i.test(t) ? r = parseFloat(RegExp.$1) : !e && /AppleWebKit\/(\d+(\.\d+)?)/.test(t) && (c = parseInt(RegExp.$1, 10));
                var u = {
                    edge: e,
                    ie: i,
                    firefox: a,
                    netscape: s,
                    opera: n,
                    safari: o,
                    chrome: r,
                    gecko: h,
                    trident: l,
                    webkit: c
                };
                return u
            }(), window.FeBrowser = x.Browser, x.Dom = {}, x.Dom.createDom = function(t, e) {
                x.isIE && e && e.name && (t = "<" + t + ' name="' + x.String.escapeHTML(e.name) + '">');
                var i = document.createElement(t);
                return e && x.Dom.setProperties(i, e), i
            }, x.Dom.getOffset = function(t) {
                var e = x.Dom.getOwnerDocument(t),
                    i = x.isGecko > 0 && e.getBoxObjectFor && "absolute" == x.Dom.getStyle(t, "position") && ("" === t.style.top || "" === t.style.left),
                    n = {
                        left: 0,
                        top: 0
                    },
                    o = x.isIE && !x.isStrict ? e.body : e.documentElement;
                if (t == o) return n;
                var a, r = null;
                if (t.getBoundingClientRect) a = t.getBoundingClientRect(), n.left = a.left + Math.max(e.documentElement.scrollLeft, e.body.scrollLeft), n.top = a.top + Math.max(e.documentElement.scrollTop, e.body.scrollTop), n.left -= e.documentElement.clientLeft, n.top -= e.documentElement.clientTop, x.isIE && !x.isStrict && (n.left -= 2, n.top -= 2);
                else if (e.getBoxObjectFor && !i) {
                    a = e.getBoxObjectFor(t);
                    var s = e.getBoxObjectFor(o);
                    n.left = a.screenX - s.screenX, n.top = a.screenY - s.screenY
                } else {
                    r = t;
                    do {
                        if (n.left += r.offsetLeft, n.top += r.offsetTop, x.isWebkit > 0 && "fixed" == x.Dom.getStyle(r, "position")) {
                            n.left += e.body.scrollLeft, n.top += e.body.scrollTop;
                            break
                        }
                        r = r.offsetParent
                    } while (r && r != t);
                    for ((x.isOpera > 0 || x.isWebkit > 0 && "absolute" == x.Dom.getStyle(t, "position")) && (n.top -= e.body.offsetTop), r = t.offsetParent; r && r != e.body;) n.left -= r.scrollLeft, x.isOpera && "TR" == r.tagName || (n.top -= r.scrollTop), r = r.offsetParent
                }
                return n
            }, x.Dom.getOwnerDocument = function(t) {
                return 9 == t.nodeType ? t : t.ownerDocument || t.document
            }, x.Dom.setProperties = function(t, e) {
                x.each(e, function(e, i) {
                    x.Dom._setProperty(t, i, e)
                })
            }, x.Dom._setProperty = function(t, e, i) {
                "style" == e ? t.style.cssText = i : "class" == e ? t.className = i : "for" == e ? t.htmlFor = i : e in x.Dom._DIRECT_ATTRIBUTE_MAP ? t.setAttribute(x.Dom._DIRECT_ATTRIBUTE_MAP[e], i) : t[e] = i
            }, x.Dom._DIRECT_ATTRIBUTE_MAP = {
                cellpadding: "cellPadding",
                cellspacing: "cellSpacing",
                colspan: "colSpan",
                rowspan: "rowSpan",
                valign: "vAlign",
                height: "height",
                width: "width",
                usemap: "useMap",
                frameborder: "frameBorder"
            }, x.G = function() {
                for (var t = [], e = arguments.length - 1; e > -1; e--) {
                    var i = arguments[e];
                    t[e] = null, "object" == typeof i && i && i.dom ? t[e] = i.dom : "object" == typeof i && i && i.tagName || i == window || i == document ? t[e] = i : "string" == typeof i && (i = document.getElementById(i)) && (t[e] = i)
                }
                return t.length < 2 ? t[0] : t
            }, x.ac = function(t, e) {
                (t = this.G(t)) && (e = this.trim(e), new RegExp("(^| )" + e.replace(/(\W)/g, "\\$1") + "( |$)").test(t.className) || (t.className = t.className.split(/\s+/).concat(e).join(" ")))
            }, x.addClassName = x.ac, x.each = function(t, e) {
                if ("function" != typeof e) return t;
                if (t)
                    if (void 0 === t.length)
                        for (var i in t) e.call(t[i], t[i], i);
                    else
                        for (var n = 0, o = t.length; o > n; n++) e.call(t[n], t[n], n);
                return t
            }, x.extend = function(t, e) {
                if (t && e && "object" == typeof e) {
                    for (var i in e) t[i] = e[i];
                    for (var n, o = ["constructor", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "toLocaleString", "toString", "valueOf"], a = 0; a < o.length; a++) n = o[a], Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n])
                }
                return t
            }, x.hide = function() {
                x.each(arguments, function(t) {
                    (t = x.G(t)) && (t.style.display = "none")
                })
            }, x.inherit = function(t, e, i) {
                var n = t.prototype,
                    o = function() {};
                o.prototype = e.prototype;
                var a = t.prototype = new o;
                "string" == typeof i && (a._className = i);
                for (var r in n) a[r] = n[r];
                return t.prototype.constructor = n.constructor, n = null, a
            }, x.isIE = 0, function() {
                navigator.userAgent.indexOf("MSIE") > 0 && !window.opera && (/MSIE (\d+(\.\d+)?)/.test(navigator.userAgent), x.isIE = parseFloat(RegExp.$1))
            }(), x.rc = function(t, e) {
                if (t = this.G(t)) {
                    e = this.trim(e);
                    var i = t.className.replace(new RegExp("(^| +)" + e.replace(/(\W)/g, "\\$1") + "( +|$)", "g"), "$2");
                    t.className != i && (t.className = i)
                }
            }, x.removeClassName = x.rc, x.show = function() {
                this.each(arguments, function(t) {
                    (t = x.G(t)) && (t.style.display = "")
                })
            }, x.trim = function(t) {
                return t.replace(/(^[\s\t\xa0\u3000]+)|([\u3000\xa0\s\t]+$)/g, "")
            }, "undefined" != typeof HTMLElement && HTMLElement.prototype.__lookupGetter__ && !HTMLElement.prototype.__lookupGetter__("children") && !window.opera) try {
            HTMLElement.prototype.__defineGetter__("children", function() {
                for (var t, e = [], i = 0, n = 0, o = this.childNodes.length; o > n; n++) t = this.childNodes[n], 1 == t.nodeType && (e[i++] = t, t.name && (e[t.name] || (e[t.name] = []), e[t.name][e[t.name].length] = t), t.id && (e[t.id] = t));
                return e
            })
        } catch (er) {}
        "undefined" == typeof HTMLElement || window.opera || !HTMLElement.prototype || HTMLElement.prototype.insertAdjacentHTML || (HTMLElement.prototype.insertAdjacentHTML = function(t, e) {
            var i = this.ownerDocument.createRange();
            switch (i.setStartBefore(this), i = i.createContextualFragment(e), t) {
                case "beforeBegin":
                    this.parentNode.insertBefore(i, this);
                    break;
                case "afterBegin":
                    this.insertBefore(i, this.firstChild);
                    break;
                case "beforeEnd":
                    this.appendChild(i);
                    break;
                case "afterEnd":
                    this.nextSibling ? this.parentNode.insertBefore(i, this.nextSibling) : this.parentNode.appendChild(i)
            }
        }), "undefined" == typeof HTMLElement || window.opera || (HTMLElement.prototype.contains = function(t) {
            if (t == this) return !0;
            for (; t = t.parentNode;)
                if (t == this) return !0;
            return !1
        }), x.Browser.ie || "undefined" == typeof Event || window.opera || (Event.prototype.__defineSetter__("returnValue", function(t) {
            return t || this.preventDefault(), t
        }), Event.prototype.__defineSetter__("cancelBubble", function(t) {
            return t && this.stopPropagation(), t
        })), x.each = function(t, e) {
            if (a7(e))
                for (var i = 0, n = t.length; n > i && e.call(t, t[i], i) !== !1; i++);
            return t
        }, x.Platform = {
            x11: 0,
            macintosh: 0,
            windows: 0,
            android: 0,
            iphone: 0,
            ipad: 0
        };
        for (var em in x.Platform) x.Platform.hasOwnProperty(em) && (x.Platform[em] = new RegExp(em, "i").test(window.navigator.userAgent) ? 1 : 0);
        "undefined" == typeof x.Dom && (x.Dom = {}), x.Dom.getComputedStyle = function(t, e) {
            var i, n = 9 == t.nodeType ? t : t.ownerDocument || t.document;
            if (n.defaultView && n.defaultView.getComputedStyle) {
                if (i = n.defaultView.getComputedStyle(t, null)) return i[e] || i.getPropertyValue(e)
            } else if (t.currentStyle) return t.currentStyle[e] || "";
            return ""
        };
        var aB = x.BaseEvent,
            cI = x.BaseClass;
        cI.prototype.toString = function() {
            return this._className || ""
        }, x.on = function(t, e, i) {
            return (t = x.G(t)) ? (e = e.replace(/^on/, ""), t.addEventListener ? t.addEventListener(e, i, !1) : t.attachEvent && t.attachEvent("on" + e, i), t) : t
        }, x.un = function(t, e, i) {
            return (t = x.G(t)) ? (e = e.replace(/^on/, ""), t.removeEventListener ? t.removeEventListener(e, i, !1) : t.detachEvent && t.detachEvent("on" + e, i), t) : t
        }, x.hc = function(t, e) {
            if (!t || !t.className || "string" != typeof t.className) return !1;
            var i = -1;
            try {
                i = t.className == e || t.className.search(new RegExp("(\\s|^)" + e + "(\\s|$)"))
            } catch (n) {
                return !1
            }
            return i > -1
        }, x.isEmptyObject = function(t) {
            if ("[object Object]" === Object.prototype.toString.call(t)) {
                for (var e in t) return !1;
                return !0
            }
            return !1
        }, String.prototype.replaceAll || (String.prototype.replaceAll = function(t, e) {
            return "[object regexp]" === Object.prototype.toString.call(t).toLowerCase() ? this.replace(t, e) : this.replace(new RegExp(t, "g"), e)
        });
        var df = {
                mapStyleNameIdPair: {
                    "default": 0,
                    "grayed-out": 1,
                    "dark-mode": 0
                },
                mapHost: "https://map.baidu.com",
                apiHost: "https://api.map.baidu.com",
                staticHost: "//webmap0.bdimg.com",
                imgPath: "//webmap0.bdimg.com/image/api/",
                tileDomain: ["https://maponline0.bdimg.com", "https://maponline1.bdimg.com", "https://maponline2.bdimg.com", "https://maponline3.bdimg.com"],
                rasterTilePath: "/tile/",
                vectorTilePath: "/pvd/",
                originTilePath: ["https://pcor.baidu.com"],
                getIconSetPath: function(t) {
                    var e = "map_icons2x" + this.getStyleSuffixByName(t) + "/";
                    return "https://maponline0.bdimg.com/sty/" + e
                },
                getStyleSuffixByName: function(t) {
                    return "string" != typeof t ? "" : this.mapStyleNameIdPair[t] ? "_" + (this.mapStyleNameIdPair[t] - 1) : ""
                },
                getImageFullUrl: function(t, e) {
                    var i = t.icons,
                        n = e.replace(".png", "");
                    return i && i[n] && i[n].url ? i[n].url : this.getIconSetPath(t) + e + "?udt=" + dI().udt
                },
                getMapStyleFiles: function(t) {
                    var e = !0;
                    "string" == typeof t && "default" !== t && (e = !1);
                    var i = this.getStyleSuffixByName(t),
                        n = dI(),
                        o = "udt=" + n.udt + "&v=" + n.ver,
                        a = "https://maponline0.bdimg.com/sty/";
                    return [a + "icons_2x" + i + ".js?" + o, a + "fs" + i + ".js?" + o, a + "indoor_fs.js?" + o]
                }
            },
            dm = df;
        aI.MapConfig = dm, aI = aI || {}, aI.version = "3.0", aI._register = [], aI.register = function(t) {
            this._register[this._register.length] = t
        }, aI.guid = 1, aI.getGUID = function(t) {
            return (t || "") + aI.guid++
        }, df.imgResources = {
            blankGIF: df.staticHost + "/res/litemapapi/v1d1/images/blank.gif?20170501",
            markerPng: df.staticHost + "/res/litemapapi/v1d1/images/marker.png?20170501",
            locPng: df.staticHost + "/res/litemapapi/v1d1/images/loc.png?20180918",
            locNewPng: df.staticHost + "/res/litemapapi/v1d1/images/loc_new.png?20190314",
            zoomPng: df.staticHost + "/res/litemapapi/v1d1/images/zoombtn.png?20180918",
            locNewDarkPng: df.staticHost + "/res/litemapapi/v1d2/images/loc_new-dark.png?20200927",
            zoomDarkPng: df.staticHost + "/res/litemapapi/v1d2/images/zoombtn-dark.png?20200927",
            mapLogoPng: df.staticHost + "/res/litemapapi/v1d1/images/logo-2x.png?20190226",
            mapLogoNewPng: df.staticHost + "/res/litemapapi/v1d1/images/logo-new-2x.png?20190226"
        };
        var av = "ruler.cur";
        x.Browser.ie || x.Browser.edge ? x.extend(df, {
            distCursor: "url(" + df.imgPath + av + "),crosshair",
            defaultCursor: "url(" + df.imgPath + "openhand.cur),default",
            draggingCursor: "url(" + df.imgPath + "closedhand.cur),move"
        }) : x.Browser.firefox ? x.extend(df, {
            distCursor: "url(" + df.imgPath + av + "),crosshair",
            defaultCursor: "-moz-grab",
            draggingCursor: "-moz-grabbing"
        }) : x.Browser.chrome || x.Browser.safari ? (x.extend(df, {
            distCursor: "url(" + df.imgPath + av + ") 2 6,crosshair",
            defaultCursor: "url(" + df.imgPath + "openhand.cur) 8 8,default",
            draggingCursor: "url(" + df.imgPath + "closedhand.cur) 8 8,move"
        }), x.Platform.macintosh && (df.defaultCursor = "-webkit-grab", df.draggingCursor = "-webkit-grabbing")) : x.extend(df, {
            distCursor: "url(" + df.imgPath + av + "),crosshair",
            defaultCursor: "url(" + df.imgPath + "openhand.cur),default",
            draggingCursor: "url(" + df.imgPath + "closedhand.cur),move"
        }), df.tvc = {
            ditu: {
                normal: {
                    version: "088",
                    updateDate: "202211081"
                },
                satellite: {
                    version: "009",
                    updateDate: "202211081"
                },
                normalTraffic: {
                    version: "081",
                    updateDate: "202211081"
                },
                satelliteTraffic: {
                    version: "083",
                    updateDate: "202211081"
                },
                mapJS: {
                    version: "104",
                    updateDate: "202211081"
                },
                satelliteStreet: {
                    version: "083",
                    updateDate: "202211081"
                },
                panoClick: {
                    version: "1033",
                    updateDate: "202211081"
                },
                panoUdt: {
                    version: "20180108",
                    updateDate: "202211081"
                },
                panoSwfAPI: {
                    version: "20150123",
                    updateDate: "202211081"
                },
                panoSwfPlace: {
                    version: "20141112",
                    updateDate: "202211081"
                },
                earthVector: {
                    version: "001",
                    updateDate: "202211081"
                }
            }
        }, df.msv = {
            mapstyle: {
                updateDate: "202211081",
                version: "001"
            }
        }, dQ.prototype.setData = function(t, e) {
            var i = this._cache,
                n = this._size;
            0 !== n && (i.length > n && this._removeOld(), i[t] || i.push(e), i[t] = e, e._key_ = t)
        }, dQ.prototype.getHitRate = function() {
            return Math.round(this._totalHitTimes / this._totalGetTimes * 1e3) / 1e3
        }, dQ.prototype.getData = function(t) {
            var e = this._cache[t];
            return e && this._totalHitTimes++, this._totalGetTimes++, e
        }, dQ.prototype.removeData = function(t) {
            this._options.clearCallback && this._options.clearCallback(this._cache[t]);
            for (var e = this._cache, i = e[t], n = 0, o = e.length; o > n; n++)
                if (e[n] === i) {
                    e.splice(n, 1);
                    break
                }
            delete e[t]
        }, dQ.prototype._removeOld = function() {
            for (var t = this._cache, e = Math.round(.6 * this._size), i = 0; e > i; i++) {
                var n = t[i]._key_;
                this._options.clearCallback && this._options.clearCallback(t[n]), delete t[n]
            }
            t.splice(0, e), this._options.removeOldCallback && this._options.removeOldCallback()
        }, dQ.prototype.clear = function() {
            for (var t = this._cache, e = 0, i = t.length; i > e; e++) {
                var n = t[e]._key_;
                this._options.clearCallback && this._options.clearCallback(t[n]), delete t[n]
            }
            this._cache = t = []
        }, dQ.prototype.forEach = function(t) {
            for (var e = this._cache, i = 0, n = e.length; n > i; i++) {
                var o = e[i]._key_;
                t(e[o])
            }
        }, dQ.prototype.getBatch = function(t) {
            for (var e = [], i = 0, n = t.length; n > i; i++) this.getData(t[i]) && (e[e.length] = this.getData(t[i]));
            return e
        }, dQ.prototype.clearExcept = function(t) {
            for (var e = this._cache, i = e.length, n = i - 1; n >= 0; n--) {
                var o = this._cache[n]._key_;
                t[o] || (e.splice(n, 1), this._options.clearCallback && this._options.clearCallback(e[o]), delete e[o])
            }
        }, dQ.prototype.getDataCount = function() {
            return this._cache.length
        }, x.extend(U.prototype, {
            centerAndZoom: function(t, e, i) {
                function n() {
                    o._earth = o.initGlobeMapTypeInstance(a), o._proxyEarthEvents(), o._changeEarthMapType(o.temp.originMapType), x.extend(o, aI.EarthView.prototype), !o._navigationCtrl && o.config.showControls && (o._navigationCtrl = new aI.NavigationControl3D(o)), delete o.temp.originMapType
                }
                var o = this;
                if (t || e) {
                    if (t = t || this.centerPoint, e = e || this.zoomLevel, e = this._getProperZoom(e).zoom, this.isGlobeMapType()) {
                        var a = this.mapType;
                        this._earth || (this.mapType = BMAP_NORMAL_MAP, this.temp.originMapType = a, cG.load("earth", function() {
                            a === bW.EARTH ? aI["FeatureStyle" + o.config.style] ? n() : o.loadMapStyleFiles(function() {
                                n()
                            }) : n()
                        }))
                    }
                    this.lastLevel = this.zoomLevel || e, this.zoomLevel = e;
                    var r = new aB("onload");
                    if (r.point = t, r.zoom = e, this.centerPoint = this.restrictCenter(new e1(t.lng, t.lat)), this.centerPoint.zoom && (this.zoomLevel = this.centerPoint.zoom), this.defaultZoomLevel = this.defaultZoomLevel || this.zoomLevel, this.defaultCenter = this.defaultCenter || this.centerPoint, !this.loaded && !this.isGlobeMapType(this.temp.originMapType)) {
                        var s = this.config.defaultMaxBounds,
                            l = new bS(s, "baidu", this.mapType),
                            h = new bG({
                                mapType: this.mapType,
                                copyright: l,
                                customLayer: !1,
                                baseLayer: !0,
                                tileTypeName: "web"
                            });
                        h._isInnerLayer = !0, this.addTileLayer(h), this.mapType === BMAP_SATELLITE_MAP && this._isHybridShow === !0 && this._addHybirdMap()
                    }
                    this.dispatchEvent(r), this.loaded = !0, i = i || {}, i.callback && i.callback()
                }
            },
            _setPlatformPosition: function(t, e, i) {
                if (i = i || {}, 0 !== t || 0 !== e || i.point) {
                    isNaN(i.initMapOffsetX) && (i.initMapOffsetX = this.offsetX), isNaN(i.initMapOffsetY) && (i.initMapOffsetY = this.offsetY);
                    var n = t + i.initMapOffsetX,
                        o = e + i.initMapOffsetY;
                    if (i.point) {
                        var a = this.restrictCenter(i.point);
                        a.equals(this.centerPoint) || (this.centerPoint = a.clone(), this.fire(new aB("oncenter_changed")))
                    } else {
                        var r = this.offsetX - n,
                            s = this.offsetY - o,
                            l = this.getZoomUnits(),
                            h = this.centerPoint.lng,
                            c = this.centerPoint.lat,
                            u = new e1(h, c);
                        this.centerPoint = this.restrictCenter(new e1(u.lng + r * l, u.lat - s * l), l), this.fire(new aB("oncenter_changed")), this.zoomLevel < 10 && (n = this.offsetX - (this.centerPoint.lng - u.lng) / l, o = this.offsetY + (this.centerPoint.lat - u.lat) / l)
                    }
                    this.offsetX = n, this.offsetY = o;
                    var d = this.platform.style;
                    d.left = n + "px", d.top = o + "px", this.maskLayer.style.left = -n + "px", this.maskLayer.style.top = -o + "px", i.dispatchEvent !== !1 && this.dispatchEvent(new aB("onmoving"))
                }
            },
            zoomTo: function(t, e, i) {
                if (i = i || {}, i.zoomCenter = e, i.noAnimation !== !0) return void this.deepZoomTo(t, i);
                if ("number" == typeof t) {
                    var n = be[this.mapType];
                    if (n) {
                        var o = t;
                        if (t = this._getProperZoom(t).zoom, t === this.zoomLevel) {
                            var a = new aB("onzoomexceeded");
                            return a.targetZoom = o, this.dispatchEvent(a), void(i.callback && i.callback())
                        }
                        if (this.lastLevel = this.zoomLevel, this.config.fixCenterWhenPinch && (e = this.centerPoint.clone()), e) this.temp._cPoint = e, this.temp._cPixel = this.pointToPixel(e);
                        else if (this.getInfoWindow()) {
                            var r = this.getInfoWindow().getPoint();
                            this.temp._cPixel = this.pointToPixel(r), this.temp._cPoint = r
                        }
                        if (this.config.zoomCenter && (e = this.config.zoomCenter, this.temp._cPoint = e, this.temp._cPixel = this.pointToPixel(e)), e || this.temp.infoWin && this.temp.infoWin.isOpen()) {
                            var s = this.temp._cPoint,
                                l = this.temp._cPixel,
                                h = this.getZoomUnits(t),
                                c = new e1(s.lng + h * (this.width / 2 - l.x), s.lat - h * (this.height / 2 - l.y));
                            this.centerPoint = this.restrictCenter(c, h, t), this.centerPoint.zoom && (t = this.centerPoint.zoom)
                        }
                        i.fireEvent !== !1 && this.dispatchEvent(new aB("onzoomstart")), t !== this.zoomLevel && (this.zoomLevel = t, this.dispatchEvent(new aB("onzooming")), this.dispatchEvent(new aB("onzoomstartcode"))), i.fireEvent !== !1 && this.dispatchEvent(new aB("onzoomend")), i.callback && i.callback()
                    }
                }
            },
            deepZoomMedia: function(t) {
                var e = this;
                e.temp.isStdCtrlBusy || (e.temp.isStdCtrlBusy = !0, e.deepZoomTo(e.zoomLevel + t), setTimeout(function() {
                    e.temp.isStdCtrlBusy = !1
                }, 400))
            },
            deepZoomTo: function(t, e) {
                e = e || {};
                var i = t - this.zoomLevel,
                    n = this._getProperZoom(t);
                if (n.exceeded) {
                    var o = new aB("onzoomexceeded");
                    return o.targetZoom = t, void this.dispatchEvent(o)
                }
                var a;
                if (e.zoomCenter) a = this.pointToPixel(e.zoomCenter);
                else if (this.getInfoWindow()) a = this.pointToPixel(this.getInfoWindow().getPoint(), {
                    zoom: this.lastLevel
                });
                else var a = new cN(this.width / 2, this.height / 2);
                this.lastLevel = this.zoomLevel;
                var r = this.deepZoom || new aV(this),
                    s = i > 0 ? 1 : -1;
                r.zoomMap(a, i, s, null, e)
            },
            flyTo: function(t, e) {
                if (e === this.zoomLevel) return void this.panTo(t);
                var i = this._getProperZoom(e);
                if (i.exceeded) {
                    var n = new aB("onzoomexceeded");
                    return n.targetZoom = e, void this.dispatchEvent(n)
                }
                var o = e - this.zoomLevel,
                    a = new cN(this.width / 2, this.height / 2),
                    r = this.pointToPixel(t),
                    s = new cF(r.x - a.x, r.y - a.y);
                if (this.lastLevel = this.zoomLevel, Math.abs(o) >= 4 || Math.abs(s.width) > this.width || Math.abs(s.height) > this.height) return void this.centerAndZoom(t, e);
                var l = this.deepZoom || new aV(this),
                    h = o > 0 ? 1 : -1;
                l.zoomMap(r, o, h, s)
            },
            panTo: function(t, e) {
                if (e = e || {}, !t || t.equals(this.centerPoint)) return void(e.callback && e.callback());
                var i = this.pointToPixel(t),
                    n = Math.round(this.width / 2),
                    o = Math.round(this.height / 2);
                Math.abs(n - i.x) > this.width || Math.abs(o - i.y) > this.height || e.noAnimation === !0 ? (this._panTo(n - i.x, o - i.y, t), e.callback && e.callback()) : this._panBy(n - i.x, o - i.y, e)
            },
            _panTo: function(t, e, i) {
                var n = this.temp;
                n.operating !== !0 && (n.dragAni && (n.dragAni.stop(), n.dragAni = null, this.dispatchEvent(new aB("onmoveend"))), this.dispatchEvent(new aB("onmovestart")), this._setPlatformPosition(t, e, {
                    point: i
                }), this.dispatchEvent(new aB("onmoveend")))
            },
            panBy: function(t, e, i) {
                i = i || {}, t = Math.round(t) || 0, e = Math.round(e) || 0, Math.abs(t) <= this.width && Math.abs(e) <= this.height && i.noAnimation !== !0 ? this._panBy(t, e, i) : (this._panTo(t, e), i.callback && i.callback())
            },
            _panBy: function(t, e, i) {
                if (this.temp.operating !== !0) {
                    i = i || {}, this.dispatchEvent(new aB("onmovestart"));
                    var n = this,
                        o = n.temp;
                    o.pl = n.offsetX, o.pt = n.offsetY, o.tlPan && o.tlPan.cancel(), o.dragAni && (o.dragAni.stop(), o.dragAni = null, this.dispatchEvent(new aB("onmoveend"))), o.tlPan = new l({
                        fps: i.fps || n.config.fps,
                        duration: i.duration || n.config.actionDuration,
                        transition: i.transition || bq.easeInOutQuad,
                        render: function(i) {
                            this.terminative = n.temp.operating, n.temp.operating || n._setPlatformPosition(Math.ceil(t * i), Math.ceil(e * i), {
                                initMapOffsetX: o.pl,
                                initMapOffsetY: o.pt
                            })
                        },
                        finish: function() {
                            n.dispatchEvent(new aB("onmoveend")), n.temp.tlPan = !1, n.temp.stopArrow === !0 && (n.temp.stopArrow = !1, 0 !== n.temp.arrow && n._arrow()), i.callback && i.callback()
                        }
                    })
                }
            },
            getCenter: function() {
                return this.centerPoint
            },
            getZoom: function() {
                return this.zoomLevel
            },
            setTilt: function() {},
            getTilt: function() {
                return this._tilt
            },
            setHeading: function() {},
            getHeading: function() {
                return this._heading
            },
            restrictCenter: function(t, e, i) {
                this.isRestrict = !1, e = e || this.getZoomUnits(), i = i || this.zoomLevel;
                var n = this.pixelToPoint(new cN(this.width, 0), {
                        center: t,
                        zoom: i
                    }),
                    o = this.pixelToPoint(new cN(0, this.height), {
                        center: t,
                        zoom: i
                    }),
                    a = t.lng,
                    r = t.lat;
                if (null !== this.config.restrictBounds && !this.config.restrictBounds.isEmpty()) {
                    var s = this.config.restrictBounds,
                        l = s.getSouthWest(),
                        h = s.getNorthEast();
                    return t.lng = this.calcNewLngByBounds(a, o, n, l.lng, h.lng, e), t.lat = this.calcNewLatByBounds(r, o, n, l.lat, h.lat, e), t
                }
                if (this.zoomLevel < 5 && n.lat > bU.MAX_LAT && o.lat < bU.MIN_LAT) {
                    this.isRestrict = !0;
                    var c, u = bU.MAX_LAT - t.lat,
                        d = t.lat - bU.MIN_LAT;
                    c = d > u ? u / (this.height / 2) : d / (this.height / 2);
                    var f = 18 - cZ(c);
                    return this.zoomLevel = Math.ceil(f), t.zoom = Math.ceil(f), t
                }
                return t.lat = this.calcNewLatByBounds(r, o, n, bU.MIN_LAT, bU.MAX_LAT, e), t
            },
            calcNewLatByBounds: function(t, e, i, n, o, a) {
                var r = t;
                return i.lat > o ? (this.isRestrict = !0, r = o - this.height / 2 * a) : e.lat < n && (this.isRestrict = !0, r = n + this.height / 2 * a), r
            },
            calcNewLngByBounds: function(t, e, i, n, o, a) {
                var r = t;
                return i.lng > o ? (this.isRestrict = !0, r = o - this.width / 2 * a) : e.lng < n && (this.isRestrict = !0, r = n + this.width / 2 * a), r
            }
        });
        var bW = {
            NORMAL: "B_NORMAL_MAP",
            EARTH: "B_EARTH_MAP",
            SATELLITE: "B_STREET_MAP",
            MARS: "B_MARS_MAP",
            MOON: "B_MOON_MAP"
        };
        aI.MapTypeId = bW, bU.MAX_TILT = 87, bU.MAX_DRAG_TILT = 73, bU.MAX_DRAG_TILT_L2 = 50, bU.MIN_TILT = 0, bU.MAX_LAT = 19431424, bU.MIN_LAT = -16023552, bU.WORLD_SIZE_MC_HALF = 20037726.372307256, bU.WORLD_SIZE_MC = 2 * bU.WORLD_SIZE_MC_HALF, bU.RIGHT_EDGE_POINT = new e1(bU.WORLD_SIZE_MC_HALF, 0), bU.LEFT_EDGE_POINT = new e1(-bU.WORLD_SIZE_MC_HALF, 0), bU.HIGH_RES_MIN_RATIO = 1.2, bU.inherits(cI, "Map"), x.extend(bU.prototype, {
            render: function() {
                var t = H("div", {
                        id: "platform"
                    }),
                    e = t.style;
                e.overflow = "visible", e.position = "absolute", e.zIndex = 5, e.top = e.left = "0px";
                var i = H("div", {
                        id: "mask",
                        "class": "BMap_mask"
                    }),
                    n = i.style;
                return n.position = "absolute", n.top = n.left = "0px", n.zIndex = "9", n.overflow = "hidden", n.WebkitUserSelect = "none", n.width = this.width + "px", n.height = this.height + "px", t.appendChild(i), t
            },
            _initMapRenderType: function() {
                var t = this.config.forceRenderType;
                return "dom" === t ? void(this._renderType = "dom") : "canvas" === t ? aA.isModernBrowser && !aA.ifCanvas2dInBlackList() ? void(this._renderType = "canvas") : void(this._renderType = "dom") : "webgl" === t && aA.ifSupportWebGL() ? void(this._renderType = "webgl") : aA.ifSupportWebGL() && aA.ifEnableWebGLMap() ? void(this._renderType = "webgl") : aA.isModernBrowser && aA.ifEnableCanvas2dMap() ? void(this._renderType = "canvas") : void(this._renderType = "dom")
            },
            _setConfig: function(t) {
                t = t || {}, this.config = {
                    bottomOffset: 0,
                    clickInterval: 200,
                    enableDragging: !0,
                    enableKeyboard: !1,
                    enableDblclickZoom: !0,
                    enableContinuousZoom: !0,
                    enableWheelZoom: !0,
                    enablePinchZoom: !0,
                    enableRotateGestures: !0,
                    enableTiltGestures: !0,
                    fixCenterWhenPinch: !1,
                    enableAutoResize: !0,
                    zoomCenter: null,
                    fps: 60,
                    zoomerDuration: 240,
                    actionDuration: 450,
                    defaultCursor: dm.defaultCursor,
                    draggingCursor: dm.draggingCursor,
                    coordType: BMAP_COORD_MERCATOR,
                    mapType: BMAP_NORMAL_MAP,
                    drawer: BMAP_SYS_DRAWER,
                    enableInertialDragging: !0,
                    drawMargin: 500,
                    drawMarginGL: 500,
                    enableFulltimeSpotClick: !1,
                    enableResizeOnCenter: !1,
                    isModernBrowser: aA.isModernBrowser,
                    forceRenderType: "",
                    textRenderType: null,
                    ratio: ay() >= bU.HIGH_RES_MIN_RATIO ? 2 : 1,
                    enableEarth: aA.ifEnableEarth(),
                    defaultMaxBounds: new cv(new e1(-21364736, -10616832), new e1(23855104, 15859712)),
                    showControls: !1,
                    showRealSunlight: !0,
                    showMilkyway: !0,
                    earthBackground: null,
                    showStreetLayer: !0,
                    minZoom: null,
                    maxZoom: null,
                    style: "default",
                    enableIconClick: !1,
                    autoSafeArea: !1,
                    ak: null,
                    restrictCenter: !0,
                    restrictBounds: null,
                    smaa: !0,
                    enableCapture: !1,
                    overlayTextureAtlasSize: null
                };
                for (var e in t) t.hasOwnProperty(e) && (this.config[e] = t[e], "fixCenterWhenResize" === e && (this.config.enableResizeOnCenter = t[e]));
                if (this._setTextRenderType(), this._displayOptions = {
                        poi: !0,
                        poiText: !0,
                        poiIcon: !0,
                        overlay: !0,
                        layer: !0,
                        building: !0,
                        indoor: !0,
                        street: !0,
                        skyColors: ["rgb(226, 237, 248)", "rgb(186, 211, 252)"],
                        isFlat: !1
                    }, t.displayOptions)
                    for (var i in t.displayOptions) t.displayOptions.hasOwnProperty(i) && (this._displayOptions[i] = t.displayOptions[i]);
                this.config.restrictCenter === !1 && (this._enableTiltZoom = 0, this._enableHeadingZoom = 0)
            },
            getMinZoom: function() {
                var t;
                if (t = be[this.mapType][this._renderType] ? be[this.mapType][this._renderType].minZoom : be[this.mapType].minZoom, null !== this.config.minZoom && this.config.minZoom >= t && (t = this.config.minZoom), this.isGlobeMapType()) return t;
                for (var e = this.getSize(), i = this.worldSize(t); i < e.width;) t++, i = this.worldSize(t);
                return t
            },
            getMaxZoom: function() {
                var t;
                return t = be[this.mapType][this._renderType] ? be[this.mapType][this._renderType].maxZoom : be[this.mapType].maxZoom, null !== this.config.maxZoom && this.config.maxZoom <= t && (t = this.config.maxZoom), t
            },
            _drawFrame: function() {
                this._webglMapScene._painter.draw()
            },
            _setupWebGLMap: function() {
                var t = this;
                cG.load("mapgl", function() {
                    t._asyncRegister()
                })
            },
            _setStyle: function(t) {
                var e = t.style;
                e.overflow = "hidden", "absolute" !== dZ(t).position && (e.position = "relative"), e.backgroundImage = "url(" + dm.imgPath + "bg.png)", e.textAlign = "left", e.touchAction = e.MSTouchAction = "none"
            },
            _bind: function() {
                var t = this;
                t._watchSize = "webgl" !== t._renderType ? function() {
                    var e = t.getContainerSize();
                    if (t.width !== e.width || t.height !== e.height) {
                        var i = (e.width - t.width) / 2,
                            n = (e.height - t.height) / 2,
                            o = t.getZoomUnits(),
                            a = t.centerPoint;
                        a && !t.config.enableResizeOnCenter && (t.centerPoint = new e1(a.lng + i * o, a.lat - n * o)), t.maskLayer.style.width = (t.width = e.width) + "px", t.maskLayer.style.height = (t.height = e.height) + "px";
                        var r = new aB("onresize");
                        r.size = e, t.dispatchEvent(r), t.fire(new aB("onsize_changed"));
                        var s = parseInt(t.platform.style.left, 10) || 0,
                            l = parseInt(t.platform.style.top, 10) || 0;
                        "undefined" === t.currentOperation || t.currentOperation === cx.idle || t.offsetX === s && t.offsetY === l || t._setPlatformPosition(s, l)
                    }
                } : function() {
                    var e = t.getContainerSize();
                    if (t.width !== e.width || t.height !== e.height) {
                        var i = t.getSize();
                        t.maskLayer.style.width = (t.width = e.width) + "px", t.maskLayer.style.height = (t.height = e.height) + "px", ay() !== t.config.ratio && (t.config.ratio = ay());
                        var n = new aB("onresize");
                        n.size = e, t.dispatchEvent(n);
                        var o = new aB("onsize_changed");
                        o.size = e, o.oldSize = i, t.fire(o)
                    }
                }, t.config.enableAutoResize && (t.temp.autoResizeTimer = setInterval(t._watchSize, 16)), this.on("size_changed", function() {
                    var e = t.getMinZoom();
                    t.zoomLevel < e && t.setZoom(e, {
                        noAnimation: !0
                    })
                }), this.on("zoom_changed", function() {
                    this.dispatchEvent(new aB("onzooming"))
                })
            },
            addControl: function(t) {
                t && a7(t._i) && (t._i(this), this.dispatchEvent(new aB("onaddcontrol", t)))
            },
            removeControl: function(t) {
                t && a7(t.remove) && (t.remove(), this.dispatchEvent(new aB("onremovecontrol", t)))
            },
            addContextMenu: function(t) {
                t && (t.initialize(this), this.dispatchEvent(new aB("onaddcontextmenu", t)))
            },
            removeContextMenu: function(t) {
                t && (this.dispatchEvent(new aB("onremovecontextmenu", t)), t.remove())
            },
            addOverlay: function(t) {
                if (t && a7(t._i)) {
                    var e = new aB("onbeforeaddoverlay", t);
                    e.overlay = t, this.dispatchEvent(e), t._i(this), e = new aB("onaddoverlay", t), e.overlay = t, this.dispatchEvent(e)
                }
            },
            removeOverlay: function(t) {
                if (t && a7(t.remove)) {
                    var e = new aB("onremoveoverlay", t);
                    e.overlay = t, t.remove(), this.dispatchEvent(e)
                }
            },
            clearOverlays: function() {
                this.dispatchEvent(new aB("onclearoverlays"))
            },
            addTileLayer: function(t) {
                if (t) {
                    for (var e = 0, i = this.tileMgr.tileLayers.length; i > e; e++) {
                        var n = this.tileMgr.tileLayers[e];
                        if (n === t || n.getMapType() === t.getMapType()) return
                    }
                    t.initialize(this), this.dispatchEvent(new aB("onaddtilelayer", t))
                }
            },
            removeTileLayer: function(t) {
                t && (t.remove(), this.dispatchEvent(new aB("onremovetilelayer", t)))
            },
            getTileLayer: function(t) {
                return this.tileMgr ? this.tileMgr.getTileLayer(t) : null
            },
            setMapType: function(t) {
                var e = this;
                if (this.mapType !== t && !this._mapTypeChanging && !(this.isGlobeMapType(t) && !this.config.enableEarth || this._earth && this._earth.getLock()))
                    if (this._mapTypeChanging = !0, this.preMapType = this.mapType, this._boundsInPreMapType = this.getBounds(), this.preMapType === BMAP_SATELLITE_MAP && (this._preStreetLayerShow = this._isHybridShow), this.isGlobeMapType(t)) {
                        if (!aI.Earth) return void cG.load("earth", function() {
                            e._syncAndChangeMapType(t)
                        });
                        e._syncAndChangeMapType(t)
                    } else this.isGlobeMapType(this.preMapType) ? this._setMapTypeStatus(t, function(i, n) {
                        var o = e._earth.getEarthCanvas();
                        e._changeFlatMapType(t, this.preMapType), e._mapTypeChangAni && e._mapTypeChangAni.stop(), e._mapTypeChangAni = dz.start({
                            el: o,
                            style: "opacity",
                            startValue: 1,
                            endValue: 0,
                            duration: 200,
                            callback: function() {
                                e._mapTypeChangAni = null, e._mapTypeChanging = !1
                            }
                        }), i = cP.convertLL2MC(i), "webgl" === e._renderType ? (x.extend(e, bT.prototype), e.setCenter(i, {
                            noAnimation: !0
                        }), e.setZoom(n, {
                            noAnimation: !0
                        })) : (x.extend(e, U.prototype), e.centerAndZoom(i, n))
                    }) : (this._changeFlatMapType(t), this._mapTypeChanging = !1)
            },
            _changeFlatMapType: function(t) {
                if (t && be[t]) {
                    var e = this.preMapType;
                    this.mapType = t;
                    var i = this.getTileLayer(e);
                    if (i && this.removeTileLayer(i), !this.isGlobeMapType(e) || "webgl" !== this._renderType || this.baseLayerAdded !== !0) {
                        var n = new cv(new e1(-21364736, -10616832), new e1(23855104, 15859712)),
                            o = new bS(n, "baidu", t),
                            a = "webgl" === this._renderType ? 2 : 1,
                            r = new bG({
                                mapType: t,
                                copyright: o,
                                dataType: a,
                                customLayer: !1,
                                baseLayer: !0,
                                tileTypeName: "na"
                            });
                        r._isInnerLayer = !0, this.addTileLayer(r), "webgl" !== this._renderType || this.baseLayerAdded || (this.baseLayerAdded = !0)
                    }
                    e === BMAP_SATELLITE_MAP ? (this._preStreetLayerShow = this._isHybridShow, this._removeHybirdMap()) : t === BMAP_SATELLITE_MAP && (this._preStreetLayerShow === !0 || "undefined" == typeof this._preStreetLayerShow) && this._addHybirdMap();
                    for (var s = this.tileMgr.tileLayers, l = 0, h = s.length; h > l; l++) {
                        var c = s[l],
                            u = c.tilesDiv;
                        u && (c._isInnerLayer || "hidden" !== u.style.visibility || (u.style.visibility = ""))
                    }
                    var d = new aB("onmaptypechange");
                    d.zoomLevel = this.zoomLevel, d.mapType = t, d.exMapType = e, this.dispatchEvent(d)
                }
            },
            showStreetLayer: function(t) {
                t ? this._addHybirdMap() : this._removeHybirdMap()
            },
            hideStreetLayer: function(t) {
                this._hideStreetLayerOptions = t, this._removeHybirdMap(t)
            },
            _addHybirdMap: function() {
                if (this._isHybridShow = !0, this.isGlobeMapType()) return void(this._earth && this._earth.showStreetLayer());
                if (this._hybridTileLayer) {
                    this.addTileLayer(this._hybridTileLayer);
                    var t = new aB("onstreetlayer_show");
                    return void this.dispatchEvent(t)
                }
                var e = new cv(new e1(-21364736, -10616832), new e1(23855104, 15859712)),
                    i = new bS(e, "", BMAP_HYBRID_MAP),
                    n = new bG({
                        copyright: i,
                        transparentPng: !0,
                        tileTypeName: "web"
                    });
                n._isInnerLayer = !0;
                var o = this.isCanvasMap();
                n.getTilesUrl = function(t, e) {
                    var i = be.B_STREET_MAP,
                        n = ad("ditu", "satelliteStreet"),
                        a = n.ver,
                        r = n.udt,
                        s = i.tileUrls[Math.abs(t.x + t.y) % i.tileUrls.length] + "?qt=vtile&x=" + (t.x + "").replace(/-/gi, "M") + "&y=" + (t.y + "").replace(/-/gi, "M") + "&z=" + e + "&styles=sl&v=" + a + "&udt=" + r + "$scaler=" + ay() + "&showtext=" + (o ? 0 : 1);
                    return s
                }, this._isHybridShow = !0, this.addTileLayer(n), this._hybridTileLayer = n;
                var t = new aB("onstreetlayer_show");
                this.dispatchEvent(t)
            },
            _removeHybirdMap: function(t) {
                if (this._isHybridShow = !1, this.isGlobeMapType()) return void(this._earth && this._earth.hideStreetLayer(t));
                if (this._hybridTileLayer) {
                    this.removeTileLayer(this._hybridTileLayer);
                    var e = new aB("onstreetlayer_hide");
                    this.dispatchEvent(e)
                }
            },
            isStreetLayerShow: function() {
                return this._isHybridShow
            },
            getTileId: function(t, e) {
                var i = be[this.mapType];
                if ("object" != typeof i) return null;
                var n = i.baseUnits * Math.pow(2, i.zoomLevelBase - e),
                    o = parseInt(t.lng / n, 10),
                    a = parseInt(t.lat / n, 10);
                return {
                    row: o,
                    column: a,
                    level: e
                }
            },
            reset: function() {
                this.centerAndZoom(this.defaultCenter, this.defaultZoomLevel, !0)
            },
            setOptions: function(t) {
                t = t || {};
                for (var e in t)
                    if (t.hasOwnProperty(e)) {
                        var i = !0;
                        "object" != typeof t[e] && (i = t[e] !== this.config[e]), this.config[e] = t[e], "fixCenterWhenResize" === e && (this.config.enableResizeOnCenter = t[e]);
                        var n = this.config.style;
                        if ("option" === e && "string" == typeof n && "default" !== n && "grayed-out" !== n && "dark-mode" !== n && (this.config.style = "default"), !i) continue;
                        switch (e) {
                            case "style":
                                this.fire(new aB("onstyle_willchange"));
                                var o = this;
                                this.loadMapStyleFiles(function() {
                                    o.fire(new aB("onstyle_changed"))
                                });
                                break;
                            case "enableAutoResize":
                                t[e] === !0 ? this.enableAutoResize() : this.disableAutoResize();
                                break;
                            case "displayOptions":
                                this.setDisplayOptions(t[e])
                        }
                    }
            },
            enableDragging: function() {
                this.config.enableDragging = !0
            },
            disableDragging: function() {
                this.config.enableDragging = !1
            },
            enableInertialDragging: function() {
                this.config.enableInertialDragging = !0
            },
            disableInertialDragging: function() {
                this.config.enableInertialDragging = !1
            },
            enableScrollWheelZoom: function() {
                this.config.enableWheelZoom = !0
            },
            disableScrollWheelZoom: function() {
                this.config.enableWheelZoom = !1
            },
            enableContinuousZoom: function() {
                this.config.enableContinuousZoom = !0
            },
            disableContinuousZoom: function() {
                this.config.enableContinuousZoom = !1
            },
            enableResizeOnCenter: function() {
                this.config.enableResizeOnCenter = !0
            },
            disableResizeOnCenter: function() {
                this.config.enableResizeOnCenter = !1
            },
            enableDoubleClickZoom: function() {
                this.config.enableDblclickZoom = !0
            },
            disableDoubleClickZoom: function() {
                this.config.enableDblclickZoom = !1
            },
            enableKeyboard: function() {
                this.config.enableKeyboard = !0
            },
            disableKeyboard: function() {
                this.config.enableKeyboard = !1
            },
            getSize: function() {
                return new cF(this.width, this.height)
            },
            enablePinchToZoom: function() {
                this.config.enablePinchZoom = !0
            },
            disablePinchToZoom: function() {
                this.config.enablePinchZoom = !1
            },
            enableAutoResize: function() {
                this.config.enableAutoResize = !0, this._watchSize(), this.temp.autoResizeTimer || (this.temp.autoResizeTimer = setInterval(this._watchSize, 16))
            },
            disableAutoResize: function() {
                this.config.enableAutoResize = !1, this.temp.autoResizeTimer && (clearInterval(this.temp.autoResizeTimer), this.temp.autoResizeTimer = null)
            },
            checkResize: function() {
                this._watchSize()
            },
            resize: function() {
                this._watchSize()
            },
            getContainerSize: function() {
                return new cF(this.container.clientWidth, this.container.clientHeight)
            },
            _getProperZoom: function(t) {
                t || (t = this.zoomLevel);
                var e = this.getMinZoom(),
                    i = this.getMaxZoom(),
                    n = !1;
                return e > t && (n = !0, t = e), t > i && (n = !0, t = i), "webgl" !== this._renderType && (t = Math.round(t)), {
                    zoom: t,
                    exceeded: n
                }
            },
            getContainer: function() {
                return this.container
            },
            getZoomUnits: function(t) {
                if (this.isGlobeMapType()) return Math.pow(2, 18 - this._earth.getImageZoom());
                var e = be[this.mapType];
                if ("object" != typeof e) return null;
                var i = t || this.zoomLevel;
                return Math.pow(2, e.zoomLevelBase - i)
            },
            pointToPixel: function(t, e) {
                if (t) {
                    if (e = e || {}, this.isGlobeMapType()) {
                        var i;
                        t._llPt || (i = cP.convertMC2LL(t), t._llPt = i), i = t._llPt;
                        var n = null,
                            o = null;
                        if ("number" == typeof e.zoom) {
                            var a = this._earth,
                                r = a._getEarthZoomByImgZoom(e.zoom);
                            3 >= r && (n = a._generateTmpPMatrix(r)), o = a._generateTmpMVMatrix(a.getCenter(), r)
                        }
                        var s = this._earth.fromLatLngToPixel(i, {
                            useRound: !1,
                            isCalcOnBack: !0,
                            matrixInfo: {
                                modelViewMatrix: o,
                                projectionMatrix: n
                            }
                        });
                        return s
                    }
                    if (this._heading % 360 === 0 && 0 === this._tilt || !this._webglMapCamera) {
                        var l = this.getZoomUnits(e.zoom),
                            h = e.center || this.centerPoint,
                            c = this.width / 2,
                            u = this.height / 2,
                            d = (t.lng - h.lng) / l + c,
                            f = (h.lat - t.lat) / l + u;
                        return e.useRound !== !1 && (d = Math.round(d), f = Math.round(f)), new cN(d, f)
                    }
                    var p = this._webglMapCamera.fromMCToScreenPixel(t.lng, t.lat, e);
                    return e.useRound === !1 ? p : (p.x = Math.round(p.x), p.y = Math.round(p.y), p)
                }
            },
            pixelToPoint: function(t, e) {
                if (t) {
                    if (e = e || {}, this.isGlobeMapType()) {
                        if ("number" == typeof e.zoom) {
                            var i = this._earth,
                                n = null,
                                o = null,
                                a = i._getEarthZoomByImgZoom(e.zoom);
                            3 >= a && (n = i._generateTmpPMatrix(a)), o = i._generateTmpMVMatrix(i.getCenter(), a)
                        }
                        var r = this._earth.fromPixelToLatLng(t, {
                            matrixInfo: {
                                modelViewMatrix: o,
                                projectionMatrix: n
                            }
                        });
                        return null === r ? null : cP.convertLL2MC(r)
                    }
                    if ((this._heading % 360 !== 0 || this._tilt > 0) && this._webglMapCamera) return this._webglMapCamera.fromScreenPixelToMC(t.x, t.y, e);
                    var s = e.center || this.centerPoint,
                        l = this.getZoomUnits(e.zoom),
                        h = s.lng + l * (t.x - this.width / 2),
                        c = s.lat - l * (t.y - this.height / 2);
                    return new e1(h, c)
                }
            },
            pointToOverlayPixel: function(t, e) {
                e = e || {};
                var i = this.pointToPixel(t, {
                    zoom: e.zoom,
                    center: e.center,
                    forLabel: !0,
                    frustumTest: !0,
                    useRound: e.useRound
                });
                if (i) {
                    if (e.fixPosition && !this.isGlobeMapType()) {
                        var n = this.getSize(),
                            o = this.worldSize(e.zoom);
                        if (i.x > n.width)
                            for (; i.x > n.width;) i.x -= o;
                        else if (i.x < 0)
                            for (; i.x < 0;) i.x += o
                    }
                    return "webgl" === this._renderType ? i : (i.x -= this.offsetX, i.y -= this.offsetY, i)
                }
            },
            overlayPixelToPoint: function(t, e) {
                if (t) {
                    var i = t.clone();
                    return "webgl" !== this._renderType && (i.x += this.offsetX, i.y += this.offsetY), this.pixelToPoint(i, e)
                }
            },
            lnglatToMercator: function(t, e) {
                var i = new e1(t, e),
                    n = cP.convertLL2MC(i);
                return [n.lng, n.lat]
            },
            mercatorToLnglat: function(t, e) {
                if (isNaN(t) || isNaN(e)) return [];
                t = parseFloat(t), e = parseFloat(e);
                var i = new e1(t, e),
                    n = cP.convertMC2LL(i);
                return [n.lng, n.lat]
            },
            getBounds: function() {
                var t = arguments[0];
                if (this.isGlobeMapType() && this._earth) {
                    var e = this._earth.getCustomBounds();
                    if (!e) return this.config.defaultMaxBounds;
                    var i = e.getSouthWest(),
                        n = e.getNorthEast();
                    i.lng > n.lng && (n.lng = 180);
                    var o = cP.convertLL2MC(i),
                        a = cP.convertLL2MC(n),
                        r = this.config.defaultMaxBounds,
                        s = Math.max(o.lng, r.sw.lng),
                        l = Math.max(o.lat, r.sw.lat),
                        h = Math.min(a.lng, r.ne.lng),
                        c = Math.min(a.lat, r.ne.lat),
                        u = new cv(new e1(s, l), new e1(h, c));
                    return u.pointBottomLeft = new e1(s, l), u.pointBottomRight = new e1(h, l), u.pointTopLeft = new e1(s, c), u.pointTopRight = new e1(h, c), u.setMinMax(), u.makeNormalizedPoint(this._earth.getHeading()), u
                }
                t = t || {};
                var d = t.margins || [0, 0, 0, 0],
                    f = this.pixelToPoint({
                        x: d[3],
                        y: this.height - d[2]
                    }, t),
                    p = this.pixelToPoint({
                        x: this.width - d[1],
                        y: d[0]
                    }, t),
                    m = "number" == typeof t.heading ? t.heading : this._heading % 360,
                    g = "number" == typeof t.tilt ? t.tilt : this._tilt,
                    _ = this._webglMapCamera;
                if (0 === m && 0 === g || !_) return this._bounds.setSouthWest(f), this._bounds.setNorthEast(p), this._bounds.pointBottomLeft = f, this._bounds.pointBottomRight = new e1(p.lng, f.lat), this._bounds.pointTopRight = p, this._bounds.pointTopLeft = new e1(f.lng, p.lat), this._bounds.setMinMax(), this._bounds.makeNormalizedPoint(m), this._bounds;
                var v = this.pixelToPoint({
                        x: d[3],
                        y: d[0]
                    }, t),
                    y = _.getPosition(),
                    b = Math.sqrt(Math.pow(v.lng - y[0], 2) + Math.pow(v.lat - y[1], 2)),
                    w = this.getZoomUnits(),
                    x = b / w,
                    T = _._frustumSideLen,
                    M = _._fovy;
                if (x > T || M / 2 > 90 - g) {
                    var L = [v.lng - y[0], v.lat - y[1]];
                    M / 2 > 90 - g && (L[0] = -L[0], L[1] = -L[1]);
                    var C = T * w,
                        I = [L[0] / b * C + y[0], L[1] / b * C + y[1]],
                        S = [p.lng - y[0], p.lat - y[1]];
                    M / 2 > 90 - g && (S[0] = -S[0], S[1] = -S[1]);
                    var D = [S[0] / b * C + y[0], S[1] / b * C + y[1]];
                    v.lng = I[0], v.lat = I[1], p.lng = D[0], p.lat = D[1]
                }
                for (var P = this.pixelToPoint({
                        x: this.width - d[1],
                        y: this.height - d[2]
                    }, t), z = [f, p, v, P], A = z[0].lng, k = z[0].lat, B = z[0].lng, E = z[0].lat, O = 1; 4 > O; O++) z[O].lng < A && (A = z[O].lng), z[O].lng > B && (B = z[O].lng), z[O].lat < k && (k = z[O].lat), z[O].lat > E && (E = z[O].lat);
                return this._bounds.setSouthWest(new e1(A, k)), this._bounds.setNorthEast(new e1(B, E)), this._bounds.pointTopLeft = v, this._bounds.pointTopRight = p, this._bounds.pointBottomRight = P, this._bounds.pointBottomLeft = f, this._bounds.makeNormalizedPoint(m), this._bounds.setMinMax(), this._bounds
            },
            isLoaded: function() {
                return !!this.loaded
            },
            _getBestLevel: function(t, e) {
                var i = 0;
                "webgl" !== this._renderType || d5() || (i = 100);
                var n = e.margins || [10, 10, 10, 10],
                    o = e.zoomFactor || 0,
                    a = n[1] + n[3],
                    r = n[0] + n[2],
                    s = this.getMinZoom(),
                    l = this.getMaxZoom(),
                    h = t.toSpan(),
                    c = h.width / (this.width - a - i),
                    u = h.height / (this.height - r - i),
                    d = 18 - cZ(Math.max(c, u));
                return s > d && (d = s), d > l && (d = l), d += o, "webgl" !== this._renderType && (d = Math.floor(d)), d
            },
            getViewport: function(t, e) {
                if (this.isGlobeMapType()) {
                    t = t || [];
                    for (var i = [], n = 0; n < t.length; n++) t[n] && i.push(cP.convertMC2LL(t[n]));
                    var o = this._earth.getViewport(i, e),
                        a = o.center,
                        r = o.zoom,
                        s = cP.convertLL2MC(a);
                    return {
                        center: s,
                        zoom: r
                    }
                }
                var l = {
                    center: this.getCenter(),
                    zoom: this.getZoom()
                };
                if (!t || 0 === t.length) return l;
                e = e || {};
                var h;
                if (t instanceof cv) h = t;
                else {
                    h = new cv;
                    for (var n = t.length - 1; n >= 0; n--) h.extend(t[n]);
                    if (h.isEmpty()) return l
                }
                var c = h.getCenter();
                if (e.center) {
                    c = e.center.clone();
                    var u = h.getSouthWest(),
                        d = h.getNorthEast(),
                        f = c.lng - u.lng,
                        p = d.lng - c.lng,
                        m = d.lat - c.lat,
                        g = c.lat - u.lat,
                        _ = new e1(0, 0);
                    _.lng = f > p ? c.lng + f : c.lng - p, _.lat = g > m ? c.lat + g : c.lat - m, h.extend(_)
                }
                var v = this._getBestLevel(h, e);
                if (e.margins) {
                    var y = e.margins,
                        b = (y[1] - y[3]) / 2,
                        w = (y[0] - y[2]) / 2,
                        x = this.getZoomUnits(v);
                    c.lng = c.lng + x * b, c.lat = c.lat + x * w
                }
                return {
                    center: c,
                    zoom: v
                }
            },
            setViewport: function(t, e) {
                if (this.isGlobeMapType()) {
                    var i;
                    if (t && t.center) {
                        var n = cP.convertMC2LL(t.center),
                            o = this._earth._getEarthZoomByImgZoom(t.zoom, n);
                        i = {
                            center: n,
                            zoom: o
                        }
                    } else {
                        i = [];
                        for (var a = 0; a < t.length; a++) {
                            var r = cP.convertMC2LL(t[a]);
                            i[a] = new bR(r.lat, r.lng)
                        }
                    }
                    return void this._earth.setViewport(i, e)
                }
                var s;
                return s = t && t.center ? t : this.getViewport(t, e), e = e || {}, "webgl" === this._renderType ? void this.centerAndZoom(s.center, s.zoom, e) : void(s.zoom === this.zoomLevel && e.enableAnimation !== !1 ? this.panTo(s.center, {
                    duration: 200,
                    callback: e.callback
                }) : this.centerAndZoom(s.center, s.zoom, e))
            },
            addSpots: function(t, e) {
                if (t && 0 !== t.length) {
                    e = e || {};
                    var i = e.zIndex || 0,
                        n = "undefined" == typeof e.enableMultiResponse ? !0 : !!e.enableMultiResponse;
                    this.spotsPool = this.spotsPool || {};
                    var o = "sp" + this.temp.spotsGuid++;
                    this.spotsPool[o] = {
                        spots: t.slice(0),
                        zIndex: i,
                        enableMultiResponse: n
                    };
                    var a = this;
                    return cG.load("hotspot", function() {
                        a._asyncRegister()
                    }), o
                }
            },
            getSpots: function(t) {
                return this.spotsPool[t] && this.spotsPool[t].spots || []
            },
            removeSpots: function(t) {
                t && this.spotsPool[t] && delete this.spotsPool[t]
            },
            clearSpots: function() {
                delete this.spotsPool
            },
            getIconByClickPosition: function(t) {
                if (!this.config.enableIconClick || !this._spotsMgr) return null;
                var e = this._spotsMgr.getSpotsByScreenPosition(t);
                if (e[0] && e[0].userdata) {
                    var i = e[0].userdata;
                    return {
                        name: i.name,
                        uid: i.uid,
                        position: i.iconPoint || e[0].pt
                    }
                }
                return null
            },
            setBounds: function(t) {
                be[this.mapType].bounds = t.clone()
            },
            getCoordType: function() {
                return this.config.coordType
            },
            getPanes: function() {
                return this._panes
            },
            getInfoWindow: function() {
                return this.temp.infoWin && this.temp.infoWin.isOpen() ? this.temp.infoWin : null
            },
            getDistance: function(t, e) {
                if (t && e) {
                    if (this.isGlobeMapType()) {
                        var i = cP.convertMC2LL(t),
                            n = cP.convertMC2LL(e);
                        return this._earth.getDistance(i, n)
                    }
                    var o = cP.getDistanceByMC(t, e);
                    return o
                }
            },
            getOverlays: function() {
                var t = [],
                    e = this._overlays,
                    i = this._customOverlays;
                if (e)
                    for (var n in e) e[n] instanceof bJ && t.push(e[n]);
                if (i)
                    for (var n = 0, o = i.length; o > n; n++) t.push(i[n]);
                return t
            },
            getMapType: function() {
                return this.mapType
            },
            _asyncRegister: function() {
                for (var t = this.temp.registerIndex; t < aI._register.length; t++) aI._register[t](this);
                this.temp.registerIndex = t
            },
            setDefaultCursor: function(t) {
                this.config.defaultCursor = t, this.platform && (this.platform.style.cursor = this.config.defaultCursor)
            },
            getDefaultCursor: function() {
                return this.config.defaultCursor
            },
            setDraggingCursor: function(t) {
                this.config.draggingCursor = t
            },
            getDraggingCursor: function() {
                return this.config.draggingCursor
            },
            _syncAndChangeMapType: function(t) {
                var e = this;
                "webgl" === e._renderType && e.getTilt() > bU.MAX_DRAG_TILT_L2 ? e.setTilt(bU.MAX_DRAG_TILT_L2, {
                    callback: function() {
                        e._changeEarthMapType(t)
                    }
                }) : e._changeEarthMapType(t)
            },
            _changeEarthMapType: function(t) {
                var e = this,
                    i = e.tileMgr.tileLayers;
                this._mapTypeChangAni && this._mapTypeChangAni.stop();
                var n;
                if (this._earth && (n = this._earth.getEarthCanvas()), this._earth || (this.maskLayer.style.opacity = 1, this.maskLayer.style.zIndex = 999, this.maskLayer.style.background = "#000"), this._mapTypeChangAni = new l({
                        duration: 400,
                        render: function(t) {
                            e._earth && (n.style.opacity = t)
                        },
                        finish: function() {
                            function n() {
                                var i = e.getZoom() - 2,
                                    n = e.getCenter(),
                                    o = cP.convertMC2LL(n);
                                e._earth = e.initGlobeMapTypeInstance(t, {
                                    center: o,
                                    zoom: i
                                }), e._proxyEarthEvents();
                                var a = e.mapType;
                                e.mapType = t;
                                var r = new aB("onmaptypechange");
                                r.zoomLevel = this.zoomLevel, r.mapType = t, r.exMapType = a, e.dispatchEvent(r), e._setMapTypeStatus(t), x.extend(e, aI.EarthView.prototype), !e._navigationCtrl && e.config.showControls && (e._navigationCtrl = new de(e))
                            }
                            for (var o = i.length - 1, a = o; a >= 0; a--) {
                                var r = i[a].tilesDiv;
                                r && (r.style.visibility = "hidden"), i[a]._isInnerLayer && "webgl" !== e._renderType && e.removeTileLayer(i[a])
                            }
                            e._mapTypeChangAni = null, e._mapTypeChanging = !1, e._earth || (t === bW.EARTH ? aI["FeatureStyle" + e.config.style] ? n() : e.loadMapStyleFiles(function() {
                                n()
                            }) : n()), 1 === parseInt(e.maskLayer.style.opacity, 10) && setTimeout(function() {
                                e.maskLayer.style.zIndex = 9, e.maskLayer.style.opacity = 0
                            }, 1e3)
                        }
                    }), this._earth) {
                    var o = this.mapType;
                    this.mapType = t;
                    var a = new aB("onmaptypechange");
                    a.zoomLevel = this.zoomLevel, a.mapType = t, a.exMapType = o, this.dispatchEvent(a), e._setMapTypeStatus(t), x.extend(e, BMap.EarthView.prototype)
                }
            },
            initGlobeMapTypeInstance: function(t, e) {
                var i = this.config,
                    n = {
                        showRealSunlight: i.showRealSunlight,
                        showMilkyway: i.showMilkyway,
                        earthBackground: i.earthBackground,
                        mapType: t
                    };
                if (x.extend(n, e || {}), t === bW.EARTH) {
                    var o = new aI.Earth(this, n),
                        a = new aB("onearth_ready");
                    return a.earth = o, this.dispatchEvent(a), o
                }
                var r = new aI.Planet(this, n),
                    a = new aB("onplanet_ready");
                return a.planet = r, this.dispatchEvent(a), r
            },
            getMapStyleId: function() {
                return "string" == typeof this.config.style ? this.config.style : "string" == typeof this.config.style.featureStyleUrl ? "default" : this.config.mapStyleId || "custom"
            },
            useCustomStyle: function() {
                return "string" == typeof this.config.style || "string" == typeof this.config.style.featureStyleUrl ? !1 : !0
            },
            _setMapTypeStatus: function(t) {
                var e = arguments[1];
                if (this.isGlobeMapType(t)) {
                    var i = this._earth.getEarthCanvas();
                    i && (i.style.display = "");
                    var n = {
                        noAnimation: !0
                    };
                    this._earth.setCenter(cP.convertMC2LL(this.centerPoint), n), this._earth.setImageZoom(this.zoomLevel, n), this._earth.setTilt(this.getTilt(), n), this._earth.setHeading(this.getHeading(), n)
                } else if (this.isGlobeMapType(this.preMapType) && this._earth) {
                    var o = this._earth,
                        a = o.getMapZoom(),
                        r = o._imageRawZoom || a,
                        s = r - a,
                        l = o.getCenter();
                    if ("webgl" === this._renderType) return this._tilt = o.getTilt(), this.zoomLevel > 7 ? (this._heading = o.getHeading(), void(e && e(l, a))) : void(0 !== o.getHeading() ? (o.setTilt(this.getTilt()), o.setHeading(this.getHeading(), {
                        callback: function() {
                            e && e(l, a)
                        }
                    })) : e && e(l, a));
                    if (.1 > s && 0 === o.getTilt() && 0 === o.getHeading()) return void(e && e(l, a));
                    o.setTilt(0), o.setHeading(0), o.setZoom(o.getZoom() - s, {
                        callback: function() {
                            e && e(l, a)
                        }
                    })
                }
            },
            _proxyEarthEvents: function() {
                function t(t) {
                    e.fire(t)
                }
                var e = this,
                    i = this._earth;
                i.on("centerandzoom", function() {
                    e.dispatchEvent(new aB("onmoveend")), e.dispatchEvent(new aB("onzoomend"))
                });
                for (var n = ["zoomstart", "zoomend", "tilesloaded", "sunlighttime_change", "sunlighttime_clear", "centerandzoom", "animation_start", "animation_stop", "movestart", "moveend", "moving", "dragstart", "dragend", "dragging"], o = 0; o < n.length; o++) i.on(n[o], t)
            },
            forceEnableEarth: function() {
                return this.config.forceEnableEarth = !0, this.config.enableEarth = aA.ifEnableEarth(!0), this.dispatchEvent(new aB("forceenableearth")), this.config.enableEarth
            },
            setLock: function(t) {
                this.isGlobeMapType() && this._earth.setLock(t), this._lock = t
            },
            getLock: function() {
                return this.isGlobeMapType() ? this._earth.getLock() : this._lock
            },
            getEarth: function() {
                return this._earth
            },
            isSupportEarth: function() {
                return this.config.enableEarth
            },
            isCanvasMap: function() {
                return !("canvas" !== this._renderType || this.isGlobeMapType())
            },
            getCanvasMapCoordByUid: function(t) {
                if ("webgl" === this._renderType) {
                    for (var e = this.tileMgr.tileLayers, i = 0; i < e.length; i++)
                        if (e[i].labelProcessor) return e[i].labelProcessor.getLabelByUid(t, "");
                    return null
                }
                var n = this.canvas2dMapMgr._labelClick,
                    o = n.findLabelByUid(t);
                return o ? new e1(o.iconPos.geoX, o.iconPos.geoY) : null
            },
            loadBizData: function(t) {
                var e = new aB("onloadbizdata");
                e.data = t, this.dispatchEvent(e)
            },
            unloadBizData: function() {
                var t = new aB("onunloadbizdata");
                this.dispatchEvent(t)
            },
            zoomIn: function(t) {
                this.setZoom(this.zoomLevel + 1, {
                    zoomCenter: t
                })
            },
            zoomOut: function(t) {
                this.setZoom(this.zoomLevel - 1, {
                    zoomCenter: t
                })
            },
            setCenter: function(t, e) {
                this.panTo(t, e)
            },
            getRenderType: function() {
                return this._renderType
            },
            getSolarInfo: function(t) {
                t = t || this._initDate;
                var e = aQ(t),
                    i = cP.convertLL2MC(new e1(e[0], e[1])),
                    n = i.latLng,
                    o = aI.Projection.convertMC2LL(this.centerPoint),
                    a = t.getUTCHours(),
                    r = a + 24 * o.lng / 360,
                    s = r - 12,
                    l = 60 * s * .25,
                    h = Math.asin(Math.sin(cq(o.lat)) * Math.sin(cq(n.lat)) + Math.cos(cq(o.lat)) * Math.cos(cq(n.lat)) * Math.cos(cq(l))),
                    c = Math.asin(Math.sin(cq(l)) * Math.cos(cq(n.lat)) / Math.cos(h)),
                    u = "north";
                return o.lat < n.lat && (u = "south"), {
                    zenith: i,
                    solarAltitude: h,
                    solarAzimuth: c,
                    centerPosition: u,
                    position: i
                }
            },
            setDisplayOptions: function(t) {
                if (t) {
                    for (var e in this._displayOptions) this._displayOptions.hasOwnProperty(e) && "boolean" == typeof t[e] && (this._displayOptions[e] = t[e]);
                    var i = this.getMapType();
                    i === bW.NORMAL ? this.fire(new aB("ondisplayoptions_changed")) : i === bW.EARTH && this._earth && this._earth.fire(new aB("ondisplayoptions_changed"))
                }
            },
            getHorizonPosY: function(t) {
                if (!t || !this._webglMapCamera) return null;
                var e = this._webglMapCamera.fromMCToScreenPixel(t.lng, t.lat, {
                    heading: 0
                });
                return e.y
            },
            getIndoorInfo: function() {
                return this._indoorMgr ? this._indoorMgr.getData() : void 0
            },
            showIndoor: function(t, e) {
                var i = new aB("onindoor_status_changed");
                i.uid = t, i.floor = e, this.fire(i)
            },
            addAreaSpot: function(t, e) {
                if (t && 0 !== t.length) {
                    e = e || {}, this.areaSpots = this.areaSpots || {};
                    var i = e.id || "sp" + this.temp.spotsGuid++;
                    return this.areaSpots[i] = {
                        spot: t,
                        userData: e.userData
                    }, i
                }
            },
            getAreaSpot: function(t) {
                return this.areaSpots && this.areaSpots[t] ? this.areaSpots[t] : null
            },
            removeAreaSpot: function(t) {
                t && this.areaSpots[t] && delete this.areaSpots[t]
            },
            clearAreaSpots: function() {
                this.areaSpots = {}
            },
            resetSpotStatus: function() {
                this.fire(new aB("onspot_status_reset"))
            },
            hightlightSpotByUid: function(t, e) {
                var i = new aB("onspot_highlight");
                i.uid = t, i.tilePosStr = e, this.fire(i)
            },
            setZoom: function(t, e) {
                e = e || {}, this.zoomTo(t, e.zoomCenter || null, e)
            },
            getCurrentMaxTilt: function() {
                var t = this.zoomLevel;
                return this.isGlobeMapType() ? bU.MAX_DRAG_TILT_L2 : this.config.restrictCenter === !1 ? bU.MAX_DRAG_TILT : t >= 19 ? bU.MAX_DRAG_TILT : 18 >= t ? t < this._enableTiltZoom ? t >= this._enableTiltZoom - 2 ? (1 - (this._enableTiltZoom - t) / 2) * bU.MAX_DRAG_TILT_L2 : 0 : bU.MAX_DRAG_TILT_L2 : (bU.MAX_DRAG_TILT - bU.MAX_DRAG_TILT_L2) * (t - 18) + bU.MAX_DRAG_TILT_L2
            },
            worldSize: function(t) {
                var e = t || this.zoomLevel;
                return bU.WORLD_SIZE_MC / Math.pow(2, 18 - e)
            },
            setTrafficOn: function() {
                this.addTileLayer(bk)
            },
            setTrafficOff: function() {
                this.removeTileLayer(bk)
            },
            showOverlayContainer: function() {
                this.setDisplayOptions({
                    overlay: !0
                })
            },
            hideOverlayContainer: function() {
                this.setDisplayOptions({
                    overlay: !1
                })
            },
            addLabelsToMapTile: function(t) {
                for (var e = 0; e < t.length; e++) {
                    if ("undefined" == typeof t[e].type && (t[e].type = "fixed"), "number" != typeof t[e].rank && (t[e].rank = 5e4), t[e].pt = t[e].position, t[e].custom = !0, t[e].processedInZoom = 0, t[e].styleId = aI.getGUID("label_style_"), t[e].style ? this._tidyLabelStyles(t[e].style) : t[e].style = {}, t[e].styles) {
                        var i = this;
                        t[e].styles.forEach(function(t) {
                            i._tidyLabelStyles(t)
                        })
                    }
                    this._customTileLabels.push(t[e])
                }
                this.dispatchEvent(new aB("onadd_tile_labels"))
            },
            _tidyLabelStyles: function(t) {
                "number" != typeof t.fontSize && (t.fontSize = 12), t.fontSize *= 2, "string" != typeof t.color && (t.color = "#000")
            },
            removeLabelsFromMapTile: function(t) {
                for (var e = 0; e < t.length; e++)
                    for (var i = 0; i < this._customTileLabels.length; i++) this._customTileLabels[i].uid === t[e] && this._customTileLabels.splice(i, 1);
                this.dispatchEvent(new aB("onremove_tile_labels"))
            },
            clearLabels: function() {
                this._customTileLabels.length = 0, this.dispatchEvent(new aB("onclear_labels"))
            },
            loadMapStyleFiles: function(t) {
                var e = this.config.style,
                    i = this;
                if (this._setTextRenderType(), "string" == typeof e || "string" == typeof e.featureStyleUrl) {
                    if (aI["FeatureStyle" + e]) return i.fire(new aB("onstyle_loaded")), void t();
                    var n = "string" == typeof e ? e : "default",
                        o = dm.getMapStyleFiles(n);
                    "string" == typeof e.featureStyleUrl && (o[1] = e.featureStyleUrl);
                    var a = this.getMapStyleId();
                    eW.load(o, function() {
                        aI["FeatureStyle" + a] = window.FeatureStyle, aI["iconSetInfo" + a] = window.iconSetInfo_high, aI.indoorStyle = window.indoorStyle, i.fire(new aB("onstyle_loaded")), t()
                    })
                } else {
                    if (null === this.config.ak) throw "没有指定ak参数";
                    var r = this.config.ak,
                        a = aI.getGUID("custom");
                    this.config.mapStyleId = a;
                    var s = {},
                        i = this;
                    x.extend(s, e), window.styleCbk = function(e) {
                        var n = Math.floor(i.getZoom());
                        f.onStyleDataBack(e, n, a, s, r), aI.customStyleLoaded = !0, i.fire(new aB("onstyle_loaded")), t()
                    }, aI.customStyleInfo = {
                        zoomRegion: {},
                        zoomStyleBody: [],
                        zoomFrontStyle: {}
                    };
                    var l = Math.floor(this.getZoom()),
                        h = f.getStyleUrl(e, r, "styleCbk", l);
                    if (aI.iconSetInfoCustom) eW.load(h);
                    else {
                        var c = dm.getMapStyleFiles("default");
                        c.splice(1, 1), eW.load(c, function() {
                            aI.iconSetInfoCustom = window.iconSetInfo_high, aI.indoorStyle = window.indoorStyle, eW.load(h)
                        })
                    }
                }
            },
            isGlobeMapType: function(t) {
                return t = t || this.mapType, t === bW.EARTH || t === bW.MARS || t === bW.MOON ? !0 : !1
            },
            _setTextRenderType: function() {
                this.config.textRenderType = d5() ? "canvas" : this.useCustomStyle() ? "canvas" : "image"
            },
            capture: function(t) {
                if (this._webglMapScene && this._webglMapScene._painter) {
                    t = t || {};
                    var e = this._webglMapScene._painter._canvas,
                        i = t.quality || .8,
                        n = e.toDataURL("image/jpeg", i);
                    t.callback && t.callback(n)
                }
            },
            destroy: function() {
                this._destroyed = !0, this.fire(new aB("ondestroy"))
            }
        }), window.BMAP_NORMAL_MAP = "B_NORMAL_MAP", window.BMAP_SATELLITE_MAP = "B_SATELLITE_MAP", window.BMAP_HYBRID_MAP = "B_STREET_MAP", window.BMAP_EARTH_MAP = "B_EARTH_MAP", window.BMAP_COORD_MERCATOR = 1, window.BMAP_SYS_DRAWER = 0, window.BMAP_SVG_DRAWER = 1, window.BMAP_VML_DRAWER = 2, window.BMAP_CANVAS_DRAWER = 3;
        var f = {
            getStyleUrl: function(t, e, i, n) {
                this.styleJson = t;
                var o = dm.apiHost + "/custom/v2/mapstyle?ak=" + e + "&callback=" + i + "&";
                return o += "is_all=true&is_new=1&", o += "styles=" + encodeURIComponent(this.styleJson2styleStringV2(t, n))
            },
            styleJson2styleStringV2: function(t, e) {
                var i = {
                        featureType: "t",
                        elementType: "e",
                        visibility: "v",
                        color: "c",
                        lightness: "l",
                        saturation: "s",
                        weight: "w",
                        level: "z",
                        hue: "h",
                        fontsize: "f"
                    },
                    n = {
                        all: "all",
                        geometry: "g",
                        "geometry.fill": "g.f",
                        "geometry.stroke": "g.s",
                        labels: "l",
                        "labels.text.fill": "l.t.f",
                        "labels.text.stroke": "l.t.s",
                        "labels.text": "l.t",
                        "labels.icon": "l.i"
                    },
                    o = [],
                    a = !1,
                    r = !1,
                    s = !1,
                    l = !1,
                    h = !1;
                aI.customStyleInfo.zoomFrontStyle[e] = {};
                for (var c = 0; t[c]; c++) {
                    var u = t[c];
                    if (!this.isOnlyZoomStyler(u) && (aI.customStyleInfo.zoomRegion = this.getZoomRegion(u, aI.customStyleInfo.zoomRegion), this.isSelectZoom(u, e))) {
                        "land" !== u.featureType && "all" !== u.featureType && "background" !== u.featureType || "string" != typeof u.elementType || "geometry" !== u.elementType && "geometry.fill" !== u.elementType && "all" !== u.elementType || !u.stylers || (u.stylers.color && (aI.customStyleInfo.zoomFrontStyle[e].bmapLandColor = u.stylers.color, aI.customStyleInfo.zoomFrontStyle[e].landColor = !0, aI.bmapLandColor = u.stylers.color, a = !0), u.stylers.visibility && "off" === u.stylers.visibility && (aI.customStyleInfo.zoomFrontStyle[e].bmapLandColor = "#00000000", aI.customStyleInfo.zoomFrontStyle[e].landColor = !0, aI.bmapLandColor = "#00000000", a = !0)), "railway" === u.featureType && "string" == typeof u.elementType && u.stylers && (u.stylers.color && ("geometry" === u.elementType && (aI.bmapRailwayFillColor = u.stylers.color, r = !0, aI.bmapRailwayStrokeColor = u.stylers.color, s = !0, aI.customStyleInfo.zoomFrontStyle[e].bmapRailwayFillColor = u.stylers.color, aI.customStyleInfo.zoomFrontStyle[e].bmapRailwayStrokeColor = u.stylers.color, aI.customStyleInfo.zoomFrontStyle[e].railwayFillColor = !0, aI.customStyleInfo.zoomFrontStyle[e].railwayStrokeColor = !0), "geometry.fill" === u.elementType && (aI.bmapRailwayFillColor = u.stylers.color, r = !0, aI.customStyleInfo.zoomFrontStyle[e].bmapRailwayFillColor = u.stylers.color, aI.customStyleInfo.zoomFrontStyle[e].railwayFillColor = !0), "geometry.stroke" === u.elementType && (aI.bmapRailwayStrokeColor = u.stylers.color, s = !0, aI.customStyleInfo.zoomFrontStyle[e].bmapRailwayStrokeColor = u.stylers.color, aI.customStyleInfo.zoomFrontStyle[e].railwayStrokeColor = !0)), u.stylers.visibility && (aI.bmapRailwayVisibility = u.stylers.visibility, l = !0, aI.customStyleInfo.zoomFrontStyle[e].bmapRailwayVisibility = u.stylers.visibility, aI.customStyleInfo.zoomFrontStyle[e].railwayVisibility = !0)), "roadarrow" === u.featureType && "labels.icon" === u.elementType && u.stylers && (aI.bmapRoadarrowVisibility = u.stylers.visibility, aI.customStyleInfo.zoomFrontStyle[e].bmapRoadarrowVisibility = u.stylers.visibility, aI.customStyleInfo.zoomFrontStyle[e].roadarrowVisibility = !0, h = !0);
                        var d = {};
                        x.extend(d, u);
                        var f = d.stylers;
                        delete d.stylers, x.extend(d, f);
                        var p = [];
                        for (var m in i)
                            if (d[m]) {
                                if (this.isEditorZoomKeys(m)) continue;
                                if ("elementType" === m) p.push(i[m] + ":" + n[d[m]]);
                                else {
                                    switch (d[m]) {
                                        case "poilabel":
                                            d[m] = "poi";
                                            break;
                                        case "districtlabel":
                                            d[m] = "label"
                                    }
                                    p.push(i[m] + ":" + d[m])
                                }
                            }
                        p.length > 2 && o.push(p.join("|"))
                    }
                }
                return !aI.customStyleInfo.zoomFrontStyle[e].landColor && aI.customStyleInfo.zoomFrontStyle[e].bmapLandColor && delete aI.customStyleInfo.zoomFrontStyle[e].bmapLandColor, !aI.customStyleInfo.zoomFrontStyle[e].railwayFillColor && aI.customStyleInfo.zoomFrontStyle[e].bmapRailwayFillColor && delete aI.customStyleInfo.zoomFrontStyle[e].bmapRailwayFillColor, !aI.customStyleInfo.zoomFrontStyle[e].railwayStrokeColor && aI.customStyleInfo.zoomFrontStyle[e].bmapRailwayStrokeColor && delete aI.customStyleInfo.zoomFrontStyle[e].bmapRailwayStrokeColor, !aI.customStyleInfo.zoomFrontStyle[e].railwayVisibility && aI.customStyleInfo.zoomFrontStyle[e].bmapRailwayVisibility && delete aI.customStyleInfo.zoomFrontStyle[e].bmapRailwayVisibility, !aI.customStyleInfo.zoomFrontStyle[e].roadarrowVisibility && aI.customStyleInfo.zoomFrontStyle[e].bmapRoadarrowVisibility && delete aI.customStyleInfo.zoomFrontStyle[e].bmapRoadarrowVisibility, o.join(",")
            },
            isOnlyZoomStyler: function(t) {
                var e = {};
                return x.extend(e, t.stylers), delete e.curZoomRegionId, delete e.curZoomRegion, delete e.level, x.isEmptyObject(e) ? !0 : !1
            },
            isSelectZoom: function(t, e) {
                var i = t.stylers.level;
                return void 0 === i ? !0 : i === e + "" ? !0 : !1
            },
            isEditorZoomKeys: function(t) {
                var e = {
                    curZoomRegionId: !0,
                    curZoomRegion: !0
                };
                return e[t] ? !0 : !1
            },
            getZoomRegion: function(t, e) {
                var i = t.stylers.level,
                    n = {};
                return x.extend(n, e), void 0 === i ? n : (n[parseInt(i, 10)] = !0, n)
            },
            onStyleDataBack: function(t, e, i, n, o) {
                if (0 === t.status) {
                    3 === t.data.style.length ? (aI.customStyleInfo.baseFs || (aI.customStyleInfo.baseFs = t.data.style), aI.StyleBody = t.data.style[2]) : aI.StyleBody = t.data.style;
                    var a = aI.customStyleInfo.baseFs;
                    if (x.isEmptyObject(aI.customStyleInfo.zoomRegion)) aI["FeatureStyle" + i] = a, this.updateFrontFeatureStyle(e);
                    else {
                        this.updateZoomFeatureStyle(aI.StyleBody, e), this.updateFrontFeatureStyle(e);
                        var r = this.calcuOtherZoomRegion(aI.customStyleInfo.zoomRegion, e);
                        for (var s in r) {
                            var l = {};
                            x.extend(l, n), this.getOtherZoomStyles(s, o, l)
                        }
                    }
                }
            },
            updateZoomFeatureStyle: function(t, e) {
                if (aI.customStyleInfo.zoomStyleBody[e] = t, !aI.customStyleInfo.zoomRegion[e])
                    for (var i = 3, n = 21, o = i; n >= o; o++) aI.customStyleInfo.zoomRegion[o] || (aI.customStyleInfo.zoomStyleBody[o] = t)
            },
            getOtherZoomStyles: function(t, e, i) {
                var n = this,
                    o = t,
                    a = (1e5 * Math.random()).toFixed(0);
                window["_cbk" + a] = function(t) {
                    t = 3 === t.data.style.length ? t.data.style[2] : t.data.style, n.updateZoomFeatureStyle(t, o), n.updateFrontFeatureStyle(o), delete window["_cbk" + a]
                };
                var r = dm.apiHost + "/custom/v2/mapstyle?ak=" + e + "&callback=_cbk" + a + "&";
                r += "is_all=true&is_new=1&", i.styleJson ? r += "styles=" + encodeURIComponent(this.styleJson2styleStringV2(i.styleJson, o)) : i.styleId && (r += "styles=" + encodeURIComponent(this.styleJson2styleStringV2(n.styleJson, o))), eW.load(r)
            },
            updateFrontFeatureStyle: function(t) {
                if (!aI.customStyleInfo.zoomRegion[t])
                    for (var e = 3, i = 21, n = e; i >= n; n++) aI.customStyleInfo.zoomRegion[n] || (aI.customStyleInfo.zoomFrontStyle[n] || (aI.customStyleInfo.zoomFrontStyle[n] = {}), aI.customStyleInfo.zoomFrontStyle[n].bmapLandColor = aI.customStyleInfo.zoomFrontStyle[t].bmapLandColor, aI.customStyleInfo.zoomFrontStyle[n].bmapRailwayFillColor = aI.customStyleInfo.zoomFrontStyle[t].bmapRailwayFillColor, aI.customStyleInfo.zoomFrontStyle[n].bmapRailwayStrokeColor = aI.customStyleInfo.zoomFrontStyle[t].bmapRailwayStrokeColor)
            },
            calcuOtherZoomRegion: function(t, e) {
                var i = {};
                if (x.extend(i, t), i[e]) {
                    for (var n = 3, o = 21, a = n; o >= a; a++)
                        if (!i[a]) {
                            i[a] = !0;
                            break
                        }
                    delete i[e]
                }
                return i
            }
        };
        a4.prototype.sampleCurveX = function(t) {
            return ((this.ax * t + this.bx) * t + this.cx) * t
        }, a4.prototype.sampleCurveY = function(t) {
            return ((this.ay * t + this.by) * t + this.cy) * t
        }, a4.prototype.sampleCurveDerivativeX = function(t) {
            return (3 * this.ax * t + 2 * this.bx) * t + this.cx
        }, a4.prototype.solveCurveX = function(t, e) {
            "undefined" == typeof e && (e = 1e-6);
            var i, n, o, a, r;
            for (o = t, r = 0; 8 > r; r++) {
                if (a = this.sampleCurveX(o) - t, Math.abs(a) < e) return o;
                var s = this.sampleCurveDerivativeX(o);
                if (Math.abs(s) < 1e-6) break;
                o -= a / s
            }
            if (i = 0, n = 1, o = t, i > o) return i;
            if (o > n) return n;
            for (; n > i;) {
                if (a = this.sampleCurveX(o), Math.abs(a - t) < e) return o;
                t > a ? i = o : n = o, o = .5 * (n - i) + i
            }
            return o
        }, a4.prototype.solve = function(t, e) {
            return this.sampleCurveY(this.solveCurveX(t, e))
        };
        var bq = {};
        l.INFINITE = "INFINITE", l.prototype._doStart = function() {
            if (window.requestAnimationFrame) {
                var t = this;
                t._timer = window.requestAnimationFrame(function(e) {
                    t._loop(e)
                })
            } else this._beginTime = (new Date).getTime(), this._endTime = this._options.duration === l.INFINITE ? null : this._beginTime + this._options.duration, this._loop()
        }, l.prototype._loop = function(t) {
            var e = this;
            if (t = t || (new Date).getTime(), this._beginTime || (this._beginTime = t), this._endTime || "number" != typeof this._options.duration || (this._endTime = this._beginTime + this._options.duration), null !== e._endTime && t >= e._endTime) {
                e._options.dropLastAnimation === !1 && e._options.render(e._options.transition(1), 1, t), "function" == typeof e._options.finish && e._options.finish(t);
                for (var i = 0, n = e._callbacks.length; n > i; i++) e._callbacks[i]()
            } else {
                var o;
                "number" == typeof e._options.duration ? (o = (t - e._beginTime) / e._options.duration, e.schedule = e._options.transition(o)) : (o = t - e._beginTime, e.schedule = 0), e._options.render(e.schedule, o, t), e.terminative || (e._timer = window.requestAnimationFrame ? requestAnimationFrame(function(t) {
                    e._loop(t)
                }) : setTimeout(function() {
                    e._loop()
                }, 1e3 / e._options.fps))
            }
        }, l.prototype.stop = function(t, e) {
            this.terminative = !0, this._timer && (window.cancelAnimationFrame ? cancelAnimationFrame(this._timer) : clearTimeout(this._timer), this._timer = null, "function" == typeof this._options.onStop && this._options.onStop(e)), t && (this._endTime = this._beginTime, this._loop())
        }, l.prototype.cancel = function() {
            this.stop()
        }, l.prototype.append = function(t) {
            return this._callbacks.push(t), this
        }, bq = {
            _p1: 1,
            _p2: 1.525,
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
            easeInBiquad: function(t) {
                return Math.pow(t, 4)
            },
            easeInBack: function(t) {
                return t * t * ((bq._p1 + 1) * t - bq._p1)
            },
            easeOutQuad: function(t) {
                return -(t * (t - 2))
            },
            easeOutCubic: function(t) {
                return Math.pow(t - 1, 3) + 1
            },
            easeOutBiquad: function(t) {
                return 1 - Math.pow(t - 1, 4)
            },
            easeOutBack: function(t) {
                return (t -= 1) * t * ((bq._p1 + 1) * t + bq._p1) + 1
            },
            easeInOutQuad: function(t) {
                return .5 > t ? t * t * 2 : -2 * (t - 2) * t - 1
            },
            easeInOutCubic: function(t) {
                return .5 > t ? 4 * Math.pow(t, 3) : 4 * Math.pow(t - 1, 3) + 1
            },
            easeInOutBiquad: function(t) {
                return .5 > t ? 8 * Math.pow(t, 4) : 1 - 8 * Math.pow(t - 1, 4)
            },
            easeInOutSine: function(t) {
                return (1 - Math.cos(Math.PI * t)) / 2
            }
        }, bq.ease = function() {
            var t = new a4(.4, 0, .6, 1);
            return function(e) {
                return t.solve(e)
            }
        }(), bq["ease-in"] = bq.easeInQuad, bq["ease-out"] = bq.easeOutQuad;
        var dz = {
                start: function(t) {
                    var e = t.el,
                        i = t.style,
                        n = t.startValue,
                        o = t.endValue,
                        a = t.duration || 1400,
                        r = t.transition || bq.linear,
                        s = t.callback,
                        h = o - n,
                        c = t.unit || "";
                    return new l({
                        fps: 60,
                        duration: a,
                        transition: r,
                        render: function(t) {
                            e.style[i] = n + h * t + c
                        },
                        finish: function() {
                            s && s()
                        }
                    })
                }
            },
            cV = void 0,
            bO = {
                is64Bit: function() {
                    return /Windows/.test(navigator.userAgent) ? /Win64; x64/.test(navigator.userAgent) ? !0 : /WOW64/.test(navigator.userAgent) ? !0 : !1 : !0
                },
                isIOS112: function() {
                    return /11_2/.test(navigator.userAgent)
                },
                canUseWebAssembly: function(t) {
                    if (void 0 !== cV) return void(t && t(cV));
                    if (window.WebAssembly && this.is64Bit())
                        if (aN())
                            if (this.isIOS112()) cV = !1, t && t(cV);
                            else {
                                var e = new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 1, 133, 128, 128, 128, 0, 1, 96, 0, 1, 127, 3, 130, 128, 128, 128, 0, 1, 0, 4, 132, 128, 128, 128, 0, 1, 112, 0, 0, 5, 131, 128, 128, 128, 0, 1, 0, 1, 6, 129, 128, 128, 128, 0, 0, 7, 145, 128, 128, 128, 0, 2, 6, 109, 101, 109, 111, 114, 121, 2, 0, 4, 109, 97, 105, 110, 0, 0, 10, 138, 128, 128, 128, 0, 1, 132, 128, 128, 128, 0, 0, 65, 42, 11]);
                                WebAssembly.instantiate(e).then(function() {
                                    cV = !0, t && t(cV)
                                }, function() {
                                    cV = !1, t && t(cV)
                                })
                            }
                    else cV = !0, t && t(cV);
                    else cV = !1, t && t(cV)
                }
            },
            cd = {};
        aI.Utils = cd;
        var eX = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
        ! function(t) {
            t.Utils || (t.Utils = {});
            var e = t.Utils;
            e.format = function() {
                function t(t, e, i) {
                    var n = i[+e];
                    return "function" == typeof n ? n(e) : n
                }

                function e(t, e, i) {
                    var n = e,
                        o = [],
                        a = e.split(":");
                    2 === a.length && (n = a[0], o.push(a[1]));
                    var r = typeof i[n];
                    return "function" === r ? i[n].apply(void 0, o) : "undefined" === r ? t : String(i[n])
                }
                return function(i, n) {
                    var o = n.splice ? t : e,
                        a = i.splice ? i.join("") : i;
                    return a.replace(/{([a-zA-Z0-9_$:.]+)}/g, function(t, e) {
                        return o(t, e, n)
                    })
                }
            }(), e.ErrorMonitor = function() {}, bO.canUseWebAssembly(function(t) {
                e.canUseWebAssembly = t
            })
        }(aI);
        var ak = Math.PI / 180,
            y = 180 / Math.PI,
            dJ = null;
        dJ = window.performance && window.performance.now ? function() {
            return performance.now()
        } : Date.now ? function() {
            return Date.now()
        } : function() {
            return (new Date).getTime()
        };
        var aw = null;
        cd.inMapHost = dj(), "boolean" == typeof window._inMapHost && (cd.inMapHost = window._inMapHost), x.extend(cG, {
            Request: {
                INITIAL: -1,
                WAITING: 0,
                LOADED: 1,
                COMPLETED: 2
            },
            Dependency: {
                poly: ["marker"],
                infowindow: ["marker"],
                simpleInfowindow: ["marker"],
                hotspot: ["poly"],
                tools: ["marker", "poly"],
                mapgl: ["glcommon", "poly"],
                earth: ["glcommon"]
            },
            MD5Mapping: {
                control: "omnup1",
                marker: "mm5huu",
                poly: "n3cnzg",
                infowindow: "mj2p43",
                simpleInfowindow: "20zmhg",
                hotspot: "2xjjx2",
                menu: "xcd0u3",
                tools: "3zyduv",
                oppc: "ffkhfl",
                oppcgl: "djqihw",
                mapgl: "c2hldj",
                markeranimation: "vbpjvy",
                earth: "rckjed",
                glcommon: "emfo4p"
            },
            Config: {
                baseUrl: (cd.inMapHost ? "" : dm.mapHost) + "/?qt=getjsmods&v=1.1&sample=newui",
                jsModPath: (cd.inMapHost ? "" : dm.mapHost) + "/res/newui/",
                timeout: 5e3
            },
            delayFlag: !1,
            Module: {
                modules: {},
                modulesNeedToLoad: []
            },
            _getMd5ModsStr: function(t) {
                for (var e = [], i = 0, n = t.length; n > i; i++) {
                    var o = t[i],
                        a = this.MD5Mapping[o],
                        r = "$" + o + "$";
                    a !== r && e.push(o + "_" + a)
                }
                return e.join(",")
            },
            load: function(t, e, i) {
                var n = this.getModuleInfo(t);
                if (n.status === this.Request.COMPLETED) i === !0 && e();
                else {
                    if (n.status === this.Request.INITIAL) {
                        this.combine(t), this.addToLoadQueue(t);
                        var o = this;
                        o.delayFlag === !1 && (o.delayFlag = !0, setTimeout(function() {
                            var t = o.Config.baseUrl + "&mod=" + o._getMd5ModsStr(o.Module.modulesNeedToLoad);
                            eW.load(t), o.Module.modulesNeedToLoad.length = 0, o.delayFlag = !1
                        }, 1)), n.status = this.Request.WAITING
                    }
                    e && n.callbacks.push(e)
                }
            },
            combine: function(t) {
                if (t && this.Dependency[t])
                    for (var e = this.Dependency[t], i = 0; i < e.length; i++) this.combine(e[i]), this.Module.modules[e[i]] || this.addToLoadQueue(e[i])
            },
            addToLoadQueue: function(t) {
                var e = this.getModuleInfo(t);
                e.status === this.Request.INITIAL && (e.status = this.Request.WAITING, this.Module.modulesNeedToLoad.push(t))
            },
            run: function(fj, fk) {
                var fo = this.getModuleInfo(fj),
                    fr = this.Dependency[fj];
                if (fr)
                    for (var fm = 0; fm < fr.length; fm++) {
                        var fn = this.getModuleInfo(fr[fm]);
                        if (fn.status !== this.Request.COMPLETED) return void fn.modsNeedToRun.push({
                            name: fj,
                            code: fk
                        })
                    }
                try {
                    eval(fk)
                } catch (fp) {
                    return
                }
                fo.status = this.Request.COMPLETED;
                for (var fm = 0, fl = fo.callbacks.length; fl > fm; fm++) fo.callbacks[fm]();
                for (fo.callbacks.length = 0, fm = 0; fm < fo.modsNeedToRun.length; fm++) {
                    var fq = fo.modsNeedToRun[fm];
                    this.run(fq.name, fq.code)
                }
                fo.modsNeedToRun.length = 0
            },
            getModuleInfo: function(t) {
                var e;
                return this.Module.modules[t] || (this.Module.modules[t] = {
                    status: this.Request.INITIAL,
                    callbacks: [],
                    modsNeedToRun: []
                }), e = this.Module.modules[t]
            }
        }), window._jsload = function(t, e) {
            var i = cG.getModuleInfo(t);
            if (i.status = cG.Request.LOADED, "" !== e) cG.run(t, e);
            else {
                var n = document.createElement("script"),
                    o = cG.MD5Mapping[t];
                n.src = cG.Config.jsModPath + t + "_" + o + ".js", document.getElementsByTagName("head")[0].appendChild(n)
            }
        };
        var ds;
        ds = "undefined" != typeof window ? window : self, M.prototype.mark = function(t) {
            this._timeData[t] = this._getTime()
        }, M.prototype.getMark = function(t) {
            return this._timeData[t]
        }, M.prototype.getTime = function(t, e) {
            return parseFloat((this._timeData[e] - this._timeData[t]).toFixed(2))
        }, M.prototype.print = function() {}, M.prototype.clear = function() {
            this._timeData = {}
        }, M.prototype._getTime = ds.performance && ds.performance.now ? function() {
            return performance.now()
        } : function() {
            return Date.now()
        }, ! function(t, e) {
            e(t.d3 = t.d3 || {})
        }(window, function(t) {
            function e(t, i, n, r) {
                function s(e) {
                    return t(e = new Date(+e)), e
                }
                return s.floor = s, s.ceil = function(e) {
                    return t(e = new Date(e - 1)), i(e, 1), t(e), e
                }, s.round = function(t) {
                    var e = s(t),
                        i = s.ceil(t);
                    return i - t > t - e ? e : i
                }, s.offset = function(t, e) {
                    return i(t = new Date(+t), null == e ? 1 : Math.floor(e)), t
                }, s.range = function(e, n, o) {
                    var a = [];
                    if (e = s.ceil(e), o = null == o ? 1 : Math.floor(o), !(n > e && o > 0)) return a;
                    do a.push(new Date(+e)); while (i(e, o), t(e), n > e);
                    return a
                }, s.filter = function(n) {
                    return e(function(e) {
                        for (; t(e), !n(e);) e.setTime(e - 1)
                    }, function(t, e) {
                        for (; --e >= 0;)
                            for (; i(t, 1), !n(t););
                    })
                }, n && (s.count = function(e, i) {
                    return o.setTime(+e), a.setTime(+i), t(o), t(a), Math.floor(n(o, a))
                }, s.every = function(t) {
                    return t = Math.floor(t), isFinite(t) && t > 0 ? t > 1 ? s.filter(r ? function(e) {
                        return r(e) % t === 0
                    } : function(e) {
                        return s.count(0, e) % t === 0
                    }) : s : null
                }), s
            }

            function i(t) {
                return e(function(e) {
                    e.setDate(e.getDate() - (e.getDay() + 7 - t) % 7), e.setHours(0, 0, 0, 0)
                }, function(t, e) {
                    t.setDate(t.getDate() + 7 * e)
                }, function(t, e) {
                    return (e - t - (e.getTimezoneOffset() - t.getTimezoneOffset()) * h) / d
                })
            }

            function n(t) {
                return e(function(e) {
                    e.setUTCDate(e.getUTCDate() - (e.getUTCDay() + 7 - t) % 7), e.setUTCHours(0, 0, 0, 0)
                }, function(t, e) {
                    t.setUTCDate(t.getUTCDate() + 7 * e)
                }, function(t, e) {
                    return (e - t) / d
                })
            }
            var o = new Date,
                a = new Date,
                r = e(function() {}, function(t, e) {
                    t.setTime(+t + e)
                }, function(t, e) {
                    return e - t
                });
            r.every = function(t) {
                return t = Math.floor(t), isFinite(t) && t > 0 ? t > 1 ? e(function(e) {
                    e.setTime(Math.floor(e / t) * t)
                }, function(e, i) {
                    e.setTime(+e + i * t)
                }, function(e, i) {
                    return (i - e) / t
                }) : r : null
            };
            var s = r.range,
                l = 1e3,
                h = 6e4,
                c = 36e5,
                u = 864e5,
                d = 6048e5,
                f = e(function(t) {
                    t.setTime(Math.floor(t / l) * l)
                }, function(t, e) {
                    t.setTime(+t + e * l)
                }, function(t, e) {
                    return (e - t) / l
                }, function(t) {
                    return t.getUTCSeconds()
                }),
                p = f.range,
                m = e(function(t) {
                    t.setTime(Math.floor(t / h) * h)
                }, function(t, e) {
                    t.setTime(+t + e * h)
                }, function(t, e) {
                    return (e - t) / h
                }, function(t) {
                    return t.getMinutes()
                }),
                g = m.range,
                _ = e(function(t) {
                    var e = t.getTimezoneOffset() * h % c;
                    0 > e && (e += c), t.setTime(Math.floor((+t - e) / c) * c + e)
                }, function(t, e) {
                    t.setTime(+t + e * c)
                }, function(t, e) {
                    return (e - t) / c
                }, function(t) {
                    return t.getHours()
                }),
                v = _.range,
                y = e(function(t) {
                    t.setHours(0, 0, 0, 0)
                }, function(t, e) {
                    t.setDate(t.getDate() + e)
                }, function(t, e) {
                    return (e - t - (e.getTimezoneOffset() - t.getTimezoneOffset()) * h) / u
                }, function(t) {
                    return t.getDate() - 1
                }),
                b = y.range,
                w = i(0),
                x = i(1),
                T = i(2),
                M = i(3),
                L = i(4),
                C = i(5),
                I = i(6),
                S = w.range,
                D = x.range,
                P = T.range,
                z = M.range,
                A = L.range,
                k = C.range,
                B = I.range,
                E = e(function(t) {
                    t.setDate(1), t.setHours(0, 0, 0, 0)
                }, function(t, e) {
                    t.setMonth(t.getMonth() + e)
                }, function(t, e) {
                    return e.getMonth() - t.getMonth() + 12 * (e.getFullYear() - t.getFullYear())
                }, function(t) {
                    return t.getMonth()
                }),
                O = E.range,
                R = e(function(t) {
                    t.setMonth(0, 1), t.setHours(0, 0, 0, 0)
                }, function(t, e) {
                    t.setFullYear(t.getFullYear() + e)
                }, function(t, e) {
                    return e.getFullYear() - t.getFullYear()
                }, function(t) {
                    return t.getFullYear()
                });
            R.every = function(t) {
                return isFinite(t = Math.floor(t)) && t > 0 ? e(function(e) {
                    e.setFullYear(Math.floor(e.getFullYear() / t) * t), e.setMonth(0, 1), e.setHours(0, 0, 0, 0)
                }, function(e, i) {
                    e.setFullYear(e.getFullYear() + i * t)
                }) : null
            };
            var Z = R.range,
                N = e(function(t) {
                    t.setUTCSeconds(0, 0)
                }, function(t, e) {
                    t.setTime(+t + e * h)
                }, function(t, e) {
                    return (e - t) / h
                }, function(t) {
                    return t.getUTCMinutes()
                }),
                F = N.range,
                U = e(function(t) {
                    t.setUTCMinutes(0, 0, 0)
                }, function(t, e) {
                    t.setTime(+t + e * c)
                }, function(t, e) {
                    return (e - t) / c
                }, function(t) {
                    return t.getUTCHours()
                }),
                H = U.range,
                W = e(function(t) {
                    t.setUTCHours(0, 0, 0, 0)
                }, function(t, e) {
                    t.setUTCDate(t.getUTCDate() + e)
                }, function(t, e) {
                    return (e - t) / u
                }, function(t) {
                    return t.getUTCDate() - 1
                }),
                X = W.range,
                G = n(0),
                Y = n(1),
                V = n(2),
                q = n(3),
                j = n(4),
                K = n(5),
                J = n(6),
                Q = G.range,
                $ = Y.range,
                te = V.range,
                ee = q.range,
                ie = j.range,
                ne = K.range,
                oe = J.range,
                ae = e(function(t) {
                    t.setUTCDate(1), t.setUTCHours(0, 0, 0, 0)
                }, function(t, e) {
                    t.setUTCMonth(t.getUTCMonth() + e)
                }, function(t, e) {
                    return e.getUTCMonth() - t.getUTCMonth() + 12 * (e.getUTCFullYear() - t.getUTCFullYear())
                }, function(t) {
                    return t.getUTCMonth()
                }),
                re = ae.range,
                se = e(function(t) {
                    t.setUTCMonth(0, 1), t.setUTCHours(0, 0, 0, 0)
                }, function(t, e) {
                    t.setUTCFullYear(t.getUTCFullYear() + e)
                }, function(t, e) {
                    return e.getUTCFullYear() - t.getUTCFullYear()
                }, function(t) {
                    return t.getUTCFullYear()
                });
            se.every = function(t) {
                return isFinite(t = Math.floor(t)) && t > 0 ? e(function(e) {
                    e.setUTCFullYear(Math.floor(e.getUTCFullYear() / t) * t), e.setUTCMonth(0, 1), e.setUTCHours(0, 0, 0, 0)
                }, function(e, i) {
                    e.setUTCFullYear(e.getUTCFullYear() + i * t)
                }) : null
            };
            var le = se.range;
            t.timeInterval = e, t.timeMillisecond = r, t.timeMilliseconds = s, t.utcMillisecond = r, t.utcMilliseconds = s, t.timeSecond = f, t.timeSeconds = p, t.utcSecond = f, t.utcSeconds = p, t.timeMinute = m, t.timeMinutes = g, t.timeHour = _, t.timeHours = v, t.timeDay = y, t.timeDays = b, t.timeWeek = w, t.timeWeeks = S, t.timeSunday = w, t.timeSundays = S, t.timeMonday = x, t.timeMondays = D, t.timeTuesday = T, t.timeTuesdays = P, t.timeWednesday = M, t.timeWednesdays = z, t.timeThursday = L, t.timeThursdays = A, t.timeFriday = C, t.timeFridays = k, t.timeSaturday = I, t.timeSaturdays = B, t.timeMonth = E, t.timeMonths = O, t.timeYear = R, t.timeYears = Z, t.utcMinute = N, t.utcMinutes = F, t.utcHour = U, t.utcHours = H, t.utcDay = W, t.utcDays = X, t.utcWeek = G, t.utcWeeks = Q, t.utcSunday = G, t.utcSundays = Q, t.utcMonday = Y, t.utcMondays = $, t.utcTuesday = V, t.utcTuesdays = te, t.utcWednesday = q, t.utcWednesdays = ee, t.utcThursday = j, t.utcThursdays = ie, t.utcFriday = K, t.utcFridays = ne, t.utcSaturday = J, t.utcSaturdays = oe, t.utcMonth = ae, t.utcMonths = re, t.utcYear = se, t.utcYears = le, Object.defineProperty(t, "__esModule", {
                value: !0
            })
        }), ej.prototype.get = function() {
            var t = null;
            for (var e in this._objCollection)
                if (this._objCollection[e] && this._objCollection[e]._free === !0) return this._objCollection[e]._free = !1, this._objCollection[e];
            return t = H(this._elemType), e = aI.getGUID("obj_pool_"), this._objCollection[e] = t, t
        }, ej.prototype.free = function(t) {
            t && (t._free = !0, "img" === t.tagName.toLowerCase() && (t.src = "", t.crossOrigin = null, t.onload = t.onerror = null))
        }, ej.prototype.clear = function() {
            for (var t in this._objCollection) this._objCollection[t] && "img" === this._objCollection[t].tagName.toLowerCase && (this._objCollection[t].onload = this._objCollection[t].onerror = null);
            this._objCollection = {}
        };
        var eW = function(t) {
            function e(e, i, n) {
                var o = H("script", {
                    src: e,
                    type: "text/javascript",
                    charset: "utf-8"
                });
                o.addEventListener ? (o.addEventListener("load", function(t) {
                    var e = t.target;
                    e.parentNode.removeChild(e), i && i()
                }, !1), o.addEventListener("error", function() {
                    n && n(null)
                }, !1)) : o.attachEvent && o.attachEvent("onreadystatechange", function() {
                    var t = window.event.srcElement;
                    !t || "loaded" !== t.readyState && "complete" !== t.readyState || t.parentNode.removeChild(t), i && i()
                }), t.getElementsByTagName("head")[0].appendChild(o)
            }
            return {
                load: function(t, i, n) {
                    if ("string" == typeof t) e(t, i, n);
                    else if (t.length > 0)
                        for (var o = t.length, a = 0; o > a; a++) e(t[a], function() {
                            o--, 0 === o && i && i()
                        })
                }
            }
        }(window.document);
        bE.instances = {}, bE.getInstance = function(t, e) {
            if (bE.instances[t]) return bE.instances[t];
            var i = new b3(t, e);
            return bE.instances[t] = i, i
        }, b3.mapZoomBaseIndex = [8, 8, 8, 8, 7, 7, 6, 6, 5, 5, 4, 3, 3, 3, 2, 2, 1, 1, 0, 0, 0, 0], b3.baseScaleZoom = [19, 17, 15, 12, 10, 9, 7, 5, 3], b3.baseScaleZoomMercatorSize = [512, 2048, 4096, 32768, 65536, 262144, 1048576, 4194304, 8388608], b3.mapZoomBaseZoomMapping = [3, 3, 3, 3, 5, 5, 7, 7, 9, 9, 10, 12, 12, 12, 15, 15, 17, 17, 19, 19, 19, 19], b3.mapZoomStartZoomMapping = [3, 3, 3, 3, 4, 4, 6, 6, 8, 8, 10, 11, 11, 11, 14, 14, 16, 16, 18, 18, 18, 18], b3.baseScaleTileSize = [1024, 1024, 512, 512, 256, 512, 512, 512, 256], b3.mapZoomTileSize = [256, 256, 256, 256, 256, 512, 256, 512, 256, 512, 256, 256, 512, 1024, 256, 512, 512, 1024, 512, 1024, 2048, 4096], b3.baseZoomInfo = {
            3: [3],
            5: [4, 5],
            7: [6, 7],
            9: [8, 9],
            10: [10],
            12: [11, 12, 13],
            15: [14, 15],
            17: [16, 17],
            19: [18, 19, 20, 21]
        }, b3.prototype = {
            getName: function() {
                return this._name
            },
            getTileSize: function(t) {
                return t = Math.floor(t), 3 > t && (t = 3), "na" === this._name ? b3.mapZoomTileSize[t] : this._opts.tileSize
            },
            getBaseTileSize: function(t) {
                if (t = Math.floor(t), "na" === this._name) {
                    var e = b3.mapZoomBaseZoomMapping[t];
                    return b3.mapZoomTileSize[e]
                }
                return this._opts.tileSize
            },
            getDataZoom: function(t) {
                return t = Math.floor(t), "na" === this._name ? b3.mapZoomBaseZoomMapping[t] : t
            },
            getZoomUnits: function(t) {
                return Math.pow(2, this._baseZoom - t)
            },
            getMercatorSize: function(t, e) {
                if ("na" === this._name) {
                    t = Math.floor(t);
                    var i = b3.mapZoomBaseIndex[t];
                    return b3.baseScaleZoomMercatorSize[i]
                }
                return this._opts.tileSize * this.getZoomUnits(e)
            },
            getBaseZoom: function() {
                return this._baseZoom
            },
            getParentTile: function(t, e, i, n, o) {
                if ("na" === this._name) {
                    var a = b3.baseZoomInfo[i];
                    if (n--, a.indexOf(n) > -1) return {
                        col: t,
                        row: e,
                        zoom: i,
                        useZoom: n
                    };
                    var r = b3.mapZoomBaseIndex[i],
                        s = b3.baseScaleZoom[r + 1];
                    if (!s) return null;
                    var l = this.getFactorByZooms(s, i),
                        h = b3.baseZoomInfo[s];
                    return {
                        col: Math.floor(t / l),
                        row: Math.floor(e / l),
                        zoom: s,
                        useZoom: h[h.length - 1]
                    }
                }
                return o > i - 1 ? null : {
                    col: Math.floor(t / 2),
                    row: Math.floor(e / 2),
                    zoom: i - 1,
                    useZoom: i - 1
                }
            },
            getChildTiles: function(t, e, i, n, o, a) {
                if ("na" === this._name) {
                    var r = b3.baseZoomInfo[i];
                    if (n += a, r.indexOf(n) > -1) return [{
                        col: t,
                        row: e,
                        zoom: i,
                        useZoom: n
                    }];
                    for (var s = 0, l = i; a > s;) {
                        var h = b3.mapZoomBaseIndex[l],
                            c = b3.baseScaleZoom[h - 1];
                        if (!c) return null;
                        var u = b3.baseZoomInfo[c];
                        if (u[a - 1]) {
                            for (var d = [], f = this.getFactorByZooms(i, c), p = t * f, m = e * f, g = 0; f > g; g++)
                                for (var _ = p + g, v = 0; f > v; v++) {
                                    var y = m + v;
                                    d.push({
                                        col: _,
                                        row: y,
                                        zoom: c,
                                        useZoom: u[a - 1]
                                    })
                                }
                            return d
                        }
                        s += u.length, a === u.length && (l = c)
                    }
                    return null
                }
                var d = [];
                if (i + a > o) return null;
                for (var f = Math.pow(2, a), p = t * f, m = e * f, c = i + a, d = [], g = 0; 2 > g; g++)
                    for (var _ = p + g, v = 0; 2 > v; v++) {
                        var y = m + v;
                        d.push({
                            col: _,
                            row: y,
                            zoom: c,
                            useZoom: c
                        })
                    }
                return d
            },
            getFactorByZooms: function(t, e) {
                var i = b3.mapZoomBaseIndex[t],
                    n = b3.mapZoomBaseIndex[e],
                    o = b3.baseScaleZoomMercatorSize[i],
                    a = b3.baseScaleZoomMercatorSize[n];
                return o / a
            }
        };
        var aA = {},
            P = ["swiftshader", "microsoft basic render driver"],
            bp = ["intel", "nvidia", "amd", "apple", "geforce"];
        aA.ifEnableEarth = function(t) {
            var e = aA.ifEnableEarth;
            return t || "boolean" != typeof e._enable ? aA.ifSupportWebGL() ? (e._enable = !0, !0) : (e._enable = !1, !1) : e._enable
        }, aA.ifEnableWebGLMap = function(t) {
            var e = aA.ifEnableWebGLMap;
            return t || "boolean" != typeof e._enable ? aA.ifSupportWebGL() ? cd.inMapHost ? (e._enable = !0, !0) : window.Blob || window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder ? (e._enable = !0, !0) : (e._enable = !1, !1) : (e._enable = !1, !1) : e._enable
        }, aA.params = {}, aA.ifSupportWebGL = function() {
            var t = aA.ifSupportWebGL;
            if ("boolean" == typeof t._supportWebGL) return t._supportWebGL;
            if (!window.WebGLRenderingContext) return t._supportWebGL = !1, !1;
            var e = document.createElement("canvas");
            e.width = 300, e.height = 150;
            var i = null,
                n = {
                    alpha: !1,
                    antialias: !1,
                    failIfMajorPerformanceCaveat: !0,
                    preserveDrawingBuffer: !1,
                    stencil: !1
                };
            try {
                i = e.getContext("webgl", n) || e.getContext("experimental-webgl", n)
            } catch (o) {
                t._supportWebGL = !1
            }
            if (null === i) t._supportWebGL = !1;
            else {
                t._supportWebGL = !0;
                var a = i.getExtension("WEBGL_debug_renderer_info"),
                    r = "";
                if (a) {
                    r = i.getParameter(a.UNMASKED_RENDERER_WEBGL), cA(r) === !0 && (t._supportWebGL = !0);
                    var s = i.getParameter(a.UNMASKED_VENDOR_WEBGL);
                    t._renderer = r, t._vendor = s
                }!a && x.Browser.firefox && (t._supportWebGL = !0), !a && x.Platform.macintosh && (t._supportWebGL = !0), (i.drawingBufferWidth !== e.width || i.drawingBufferHeight !== e.height) && (t._supportWebGL = !1), i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS) < 4 && (t._supportWebGL = !1);
                var l = i.getParameter(i.MAX_TEXTURE_SIZE);
                aA.params.maxTextureSize = l, 4096 > l && (t._supportWebGL = !1);
                var h = i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS);
                8 > h && (t._supportWebGL = !1), (!i.getShaderPrecisionFormat || i.getShaderPrecisionFormat(i.FRAGMENT_SHADER, i.HIGH_FLOAT).precision < 23) && (t._supportWebGL = !1)
            }
            return t._supportWebGL
        }, aA.ifSupportCanvas2d = function() {
            var t = aA.ifSupportCanvas2d;
            if ("boolean" == typeof t.supportCanvas2d) return t.supportCanvas2d;
            var e = document.createElement("canvas"),
                i = null;
            try {
                i = e.getContext("2d")
            } catch (n) {
                t.supportCanvas2d = !1
            }
            return t.supportCanvas2d = null === i ? !1 : !0, t.supportCanvas2d
        }, aA.ifCanvas2dInBlackList = function() {
            return !0
        }, aA.ifEnableCanvas2dMap = function() {
            return !1
        }, aA.ifSupportCSS3 = function(t, e) {
            var i = document.createElement("div"),
                n = "Webkit Moz O ms".split(" "),
                o = n.length,
                a = "",
                r = i.style;
            t in r && (a = t), t = t.replace(/^[a-z]/, function(t) {
                return t.toUpperCase()
            });
            for (; o--;) {
                var s = n[o] + t;
                if (s in r) {
                    a = s;
                    break
                }
            }
            return e ? a : a.length > 0 ? !0 : !1
        }, aA.isModernBrowser = aA.ifSupportCanvas2d() && aA.ifSupportCSS3("transform"), di.prototype.setData = function(t, e) {
            var i = this._cache,
                n = this._size;
            if (0 !== n) {
                var o = this._curSize;
                o === n && this._removeOld();
                var a;
                if (i[t]) {
                    if (a = i[t], a.data = e, this._most === a) return;
                    a.older && (a.older.newer = a.newer), a.newer && (a.newer.older = a.older), this._least === a && (this._least = a.newer)
                } else a = {
                    key: t,
                    data: e,
                    older: null,
                    newwer: null
                }, i[t] = a, null === this._least && (this._least = a), null === this._most && (this._most = a), this._curSize++;
                this._most && this._most !== a && (this._most.newer = a, a.older = this._most, this._most = a, a.newer = null)
            }
        }, di.prototype.getData = function(t) {
            var e = this._cache[t];
            if (this._getDataTimes++, e) {
                this._hitTimes++;
                var i = e.data;
                return this._most === e ? i : (e.older && (e.older.newer = e.newer), e.newer && (e.newer.older = e.older), this._least === e && (this._least = e.newer), this._most.newer = e, e.older = this._most, e.newer = null, this._most = e, i)
            }
            return null
        }, di.prototype.getAllData = function() {
            return this._cache
        }, di.prototype.getHitRate = function() {
            return this._hitTimes / this._getDataTimes
        }, di.prototype.removeData = function(t) {
            var e = this._cache,
                i = e[t];
            i && (this._options.clearCallback && this._options.clearCallback(i.data, i.key), i.older && (i.older.newer = i.newer), i.newer && (i.newer.older = i.older), this._least === i && (this._least = i.newer), this._most === i && (this._most = i.older), delete e[t], this._curSize--)
        }, di.prototype._removeOld = function() {
            for (var t = this._cache, e = Math.round(.6 * this._size), i = 0; this._least && e > i;) {
                var n = this._least;
                this._least = n.newer, n.newer && (n.newer.older = null), this._options.clearCallback && this._options.clearCallback(n.data, n.key), delete t[n.key], i++
            }
            this._curSize -= i, this._options.removeOldCallback && this._options.removeOldCallback()
        }, di.prototype.clear = function() {
            var t = (this._cache, this._least);
            if (this._options.clearCallback)
                for (; t;) this._options.clearCallback(t.data, t.key), t = t.newer;
            this._least = this._most = null, this._cache = {}, this._curSize = 0
        }, di.prototype.forEach = function(t) {
            for (var e = this._least; e;) t(e.data), e = e.newer
        }, di.prototype.clearExcept = function(t) {
            for (var e = this._cache, i = this._least; i;) t[i.key] || (this._options.clearCallback && this._options.clearCallback(i.data, i.key), i.older && (i.older.newer = i.newer), i.newer && (i.newer.older = i.older), this._least === i && (this._least = i.newer), this._most === i && (this._most = i.older), delete e[i.key], this._curSize--), i = i.newer
        }, az.inherits(cI, "Control"), x.extend(az.prototype, {
            initialize: function(t) {
                return this._map = t, this._container ? (this._opts && this._opts.container ? this._opts.container.appendChild(this._container) : t.container.appendChild(this._container), this._container) : void 0
            },
            _i: function(t) {
                !this._container && this.initialize && a7(this.initialize) && (this._container = this.initialize(t)), this._opts = this._opts || {
                    printable: !1
                }, this._setStyle(), this._setPosition(), this._container && (this._container._jsobj = this)
            },
            _setStyle: function() {
                var t = this._container;
                if (t) {
                    var e = t.style;
                    e.position = "absolute", e.zIndex = this._cZIndex || "10", e.MozUserSelect = "none", this._opts.printable || x.ac(t, "BMap_noprint"), x.on(t, "contextmenu", bX)
                }
            },
            remove: function() {
                this._map = null, this._container && (this._container.parentNode && this._container.parentNode.removeChild(this._container), this._container._jsobj = null, this._container = null)
            },
            _render: function(t) {
                if (this._opts && this._opts.container) this._container = co(this._opts.container, '<div unselectable="on"></div>');
                else {
                    var e = '<div unselectable="on"></div>';
                    t && t.config.autoSafeArea && aN() ? (this._safeAreaContainer = co(this._map.container, e), this._safeAreaContainer.style.position = "absolute", this._safeAreaContainer.style.bottom = "env(safe-area-inset-bottom)", this._container = co(this._safeAreaContainer, e)) : this._container = co(this._map.container, e)
                }
                return this._visible === !1 && (this._container.style.display = "none"), this._container
            },
            _setPosition: function() {
                this.setAnchor(this._opts.anchor)
            },
            setAnchor: function(t) {
                (this.anchorFixed || "number" != typeof t || isNaN(t) || BMAP_ANCHOR_TOP_LEFT > t || t > BMAP_ANCHOR_BOTTOM_RIGHT) && (t = this.defaultAnchor), this._opts.offset = this._opts.offset || this.defaultOffset;
                var e = this._opts.anchor;
                if (this._opts.anchor = t, this._container) {
                    var i = this._container,
                        n = this._opts.offset.width,
                        o = this._opts.offset.height;
                    switch (i.style.left = i.style.top = i.style.right = i.style.bottom = "auto", t) {
                        case BMAP_ANCHOR_TOP_LEFT:
                            i.style.top = o + "px", i.style.left = n + "px";
                            break;
                        case BMAP_ANCHOR_TOP_RIGHT:
                            i.style.top = o + "px", i.style.right = n + "px";
                            break;
                        case BMAP_ANCHOR_BOTTOM_LEFT:
                            i.style.bottom = o + "px", i.style.left = n + "px";
                            break;
                        case BMAP_ANCHOR_BOTTOM_RIGHT:
                            i.style.bottom = o + "px", i.style.right = n + "px"
                    }
                    var a = ["TL", "TR", "BL", "BR"];
                    x.rc(this._container, "anchor" + a[e]), x.ac(this._container, "anchor" + a[t])
                }
            },
            getAnchor: function() {
                return this._opts.anchor
            },
            setOffset: function(t) {
                t && (this._opts = this._opts || {}, this._opts.offset = new cF(t.width, t.height), this._container && this.setAnchor(this._opts.anchor))
            },
            getOffset: function() {
                return this._opts.offset
            },
            getDom: function() {
                return this._container
            },
            show: function() {
                this._visible !== !0 && (this._visible = !0, this._container && (this._container.style.display = ""), this.dispatchEvent(new aB("onshow")))
            },
            hide: function() {
                this._visible !== !1 && (this._visible = !1, this._container && (this._container.style.display = "none"), this.dispatchEvent(new aB("onhide")))
            },
            isPrintable: function() {
                return !!this._opts.printable
            },
            isVisible: function() {
                return this._container || this._map ? !!this._visible : !1
            },
            _asyncLoadCode: function() {
                var t = this;
                cG.load("control", function() {
                    t._asyncDraw && t._asyncDraw()
                })
            }
        });
        var e9 = {
            TOP_LEFT: 0,
            TOP_RIGHT: 1,
            BOTTOM_LEFT: 2,
            BOTTOM_RIGHT: 3
        };
        aI.ControlAnchor = e9, window.BMAP_ANCHOR_TOP_LEFT = 0, window.BMAP_ANCHOR_TOP_RIGHT = 1, window.BMAP_ANCHOR_BOTTOM_LEFT = 2, window.BMAP_ANCHOR_BOTTOM_RIGHT = 3, cn.inherits(az, "CopyrightControl"), x.extend(cn.prototype, {
            initialize: function(t) {
                return this._map = t, this._container
            },
            addCopyright: function(t) {
                var e = {
                    minZoom: 0,
                    bounds: null,
                    content: "",
                    mapType: ""
                };
                for (var i in t) e[i] = t[i];
                if (this._map) {
                    var n = e.minZoom;
                    (-1 === n || n < this._map.getMinZoom() || n > this._map.getMaxZoom()) && (e.minZoom = this._map.getMinZoom()), "" === e.mapType || be[e.mapType] || (e.mapType = BMAP_NORMAL_MAP)
                }
                var o = this.getCopyright(t.id);
                if (o)
                    for (var a in e) o[a] = e[a];
                else this._copyrightCollection.push(e)
            },
            getCopyright: function(t) {
                for (var e = 0, i = this._copyrightCollection.length; i > e; e++)
                    if (this._copyrightCollection[e].id === t) return this._copyrightCollection[e]
            },
            addSateMapStyle: function() {
                this.sateMapStyle = !0, this._container && x.ac(this._container, "BMap_cpyCtrl_w")
            },
            removeSateMapStyle: function() {
                this.sateMapStyle = !1, this._container && x.rc(this._container, "BMap_cpyCtrl_w")
            }
        }), window.BMAP_UNIT_METRIC = "metric", window.BMAP_UNIT_IMPERIAL = "us", eS.inherits(az, "ScaleControl"), x.extend(eS.prototype, {
            initialize: function(t) {
                return this._map = t, this._container
            },
            setUnit: function(t) {
                this._opts.unit = this._units[t] && this._units[t].name || this._opts.unit
            },
            getUnit: function() {
                return this._opts.unit
            },
            addSateMapStyle: function() {
                this.sateMapStyle = !0;
                var t = this._container;
                t && x.ac(t.children[0], "dark")
            },
            removeSateMapStyle: function() {
                this.sateMapStyle = !1;
                var t = this._container;
                t && x.rc(t.children[0], "dark")
            }
        }), window.BMAP_NAVIGATION_CONTROL_LARGE = 0, window.BMAP_NAVIGATION_CONTROL_SMALL = 1, window.BMAP_NAVIGATION_CONTROL_PAN = 2, window.BMAP_NAVIGATION_CONTROL_ZOOM = 3, window.BMAP_NAVIGATION_CONTROL_ANIM = 4, ca.inherits(az, "NavigationControl"), x.extend(ca.prototype, {
            initialize: function(t) {
                return this._map = t, this._container
            },
            setType: function(t) {
                this._opts.type = "number" == typeof t && t >= BMAP_NAVIGATION_CONTROL_LARGE && BMAP_NAVIGATION_CONTROL_ANIM >= t ? t : BMAP_NAVIGATION_CONTROL_LARGE
            },
            getType: function() {
                return this._opts.type
            }
        }), aT.inherits(az, "MapTypeControl"), x.extend(aT.prototype, {
            initialize: function(t) {
                return this._map = t, this._container
            },
            showStreetLayer: function(t) {
                this._map.showStreetLayer(t)
            }
        }), by.inherits(az, "ZoomControl"), x.extend(by.prototype, {
            initialize: function(t) {
                return this._map = t, this._container
            }
        }), aR.inherits(az, "LocationControl"), x.extend(aR.prototype, {
            initialize: function(t) {
                return this._map = t, this._container
            },
            startLocation: function() {
                this._startLocationCalled = !0
            },
            stopLocationTrace: function() {},
            setOptions: function(t) {
                t = t || {}, x.extend(this._opts, t)
            },
            showLocationAt: function(t) {
                this._userSetLocation = t
            }
        }), O.inherits(az, "LogoControl"), x.extend(O.prototype, {
            initialize: function(t) {
                this._map = t;
                var e = this._container = document.createElement("div");
                return e.innerHTML = '<img src="' + dm.imgResources.mapLogoNewPng + '" width="56" height="19" />', t.getContainer().appendChild(e), e
            }
        }), et.prototype._init = function() {
            this._render(), this._bindDom(), this._bind(), this._adjustDisplayHeight();
            var t = new aB("onindoor_bar_show");
            t.uid = this._indoorInfo.uid, this._map.dispatchEvent(t)
        }, et.prototype._render = function() {
            if (this._indoorInfo) {
                var t = this._isMobile,
                    e = this._div = H("div");
                x.ac(e, "floor-select-container"), t && x.ac(e, "mobile"), t && x.ac(e, "all-border-radius");
                var i = this._btnTop = H("button");
                x.ac(i, "floor-switch-top"), x.ac(i, "top-border-radius");
                var n = H("div");
                x.ac(n, "floor-switch-top-icon"), i.appendChild(n);
                var o = this._btnBottom = H("button"),
                    a = H("div");
                x.ac(a, "floor-switch-bottom-icon"), o.appendChild(a), x.ac(o, "floor-switch-bottom"), x.ac(o, "bottom-border-radius");
                var r = this._floorsContainer = H("div");
                x.ac(r, "floors-container"), r.appendChild(this._createFloorsDom()), this._div.appendChild(i), this._div.appendChild(r), this._div.appendChild(o);
                var s = 0;
                if ("" === this._btnTop.style.display && (s = 2 * this._sizeConfig.SWITCH_ARROW_HEIGHT), this._div.style.height = parseInt(this._floorsContainer.style.height, 10) + s + "px", this._map.getContainer().appendChild(this._div), !t) {
                    var l = this;
                    setTimeout(function() {
                        l._div.style.right = "20px"
                    }, 20)
                }
            }
        }, et.prototype._createFloorsDom = function() {
            if (this._indoorInfo) {
                for (var t = this._ol = H("ol"), e = this._indoorInfo.currentFloor, i = this._indoorInfo.floors.length - 1; i >= 0; i--) {
                    var n = this._indoorInfo.floors[i].floorName,
                        o = H("li"),
                        a = H("button");
                    x.ac(a, "btn-select-floor"), i === e && x.ac(a, "selected"), a.setAttribute("data-floor", i), a.innerHTML = n, o.appendChild(a), t.appendChild(o)
                }
                return t
            }
        }, et.prototype._updateUI = function() {
            return this._ol ? (this._ol = null, this._ol = this._createFloorsDom(), this._floorsContainer.innerHTML = "", this._floorsContainer.appendChild(this._ol), void this._adjustDisplayHeight()) : (this._render(), this._bind(), void this._adjustDisplayHeight())
        }, et.prototype._bindDom = function() {
            var t = this;
            x.on(this._floorsContainer, "click", function(e) {
                var i = e.target || e.srcElement;
                if ("button" === i.tagName.toLowerCase()) {
                    t._map.showIndoor(t._indoorInfo.uid, parseInt(i.getAttribute("data-floor"), 10));
                    var n = new aB("onindoor_bar_click");
                    n.uid = t._indoorInfo.uid, t._map.dispatchEvent(n)
                }
            }), x.on(this._floorsContainer, "mouseover", function(t) {
                var e = t.target;
                "button" === e.tagName.toLowerCase() && x.ac(e, "hover")
            }), x.on(this._floorsContainer, "mouseout", function(t) {
                var e = t.target;
                "button" === e.tagName.toLowerCase() && x.rc(e, "hover")
            }), x.on(this._floorsContainer, "touchstart", function(t) {
                var e = t.target;
                "button" === e.tagName.toLowerCase() && x.ac(e, "onmousedown")
            }), x.on(this._floorsContainer, "touchend", function(t) {
                var e = t.target;
                "button" === e.tagName.toLowerCase() && x.rc(e, "onmousedown")
            }), x.on(this._btnTop, "mouseover", function() {
                this._disable || x.ac(this, "hover")
            }), x.on(this._btnTop, "mouseout", function() {
                x.rc(this, "hover")
            }), x.on(this._btnBottom, "mouseover", function() {
                this._disable || x.ac(this, "hover")
            }), x.on(this._btnBottom, "mouseout", function() {
                x.rc(this, "hover")
            }), x.on(this._btnTop, "touchstart", function() {
                this.className.indexOf("disable") > -1 || x.ac(this, "onmousedown")
            }), x.on(this._btnTop, "touchend", function() {
                x.rc(this, "onmousedown")
            }), x.on(this._btnBottom, "touchstart", function() {
                this.className.indexOf("disable") > -1 || x.ac(this, "onmousedown")
            }), x.on(this._btnBottom, "touchend", function() {
                x.rc(this, "onmousedown")
            }), x.on(this._btnTop, "click", function() {
                t._setBarSliderTop(parseInt(t._ol.style.top, 10) + 26)
            }), x.on(this._btnBottom, "click", function() {
                t._setBarSliderTop(parseInt(t._ol.style.top, 10) - 26)
            }), x.on(this._div, "mousemove", g), x.on(this._div, "wheel", bX), x.on(this._div, "mousewheel", bX), this._map.addEventListener("resize", function() {
                t._adjustDisplayHeight()
            })
        }, et.prototype._adjustDisplayHeight = function() {
            if (this._indoorInfo) {
                var t = this._map.getSize().height,
                    e = this._sizeConfig.FLOOR_BTN_HEIGHT,
                    i = t - 291 - 100;
                this._isMobile && (i = t - 12 - 108 - this._map.config.bottomOffset);
                var n = this._indoorInfo.floors.length,
                    o = n * e,
                    a = n,
                    r = 0,
                    s = this._floorsContainer.children[0];
                for (o > i ? (this._showArrow = !0, x.rc(s.children[0].children[0], "top-border-radius"), x.rc(s.children[n - 1].children[0], "bottom-border-radius")) : (this._showArrow = !1, x.ac(s.children[0].children[0], "top-border-radius"), x.ac(s.children[n - 1].children[0], "bottom-border-radius")); o > i && 0 !== a;) a--, r = 2 * this._sizeConfig.SWITCH_ARROW_HEIGHT, o = a * e + r;
                this._currentDisplayHeight = o, this._setAdjustVisbile(3 > a ? !1 : !0), this._floorsContainer.style.height = a * e + "px";
                var l = this._indoorInfo.currentFloor;
                this._div.style.height = parseInt(this._floorsContainer.style.height, 10) + r + "px";
                var h = -(n - (l + Math.round(a / 2))) * e;
                this._setBarSliderTop(h), n > a ? (x.show(this._btnTop), x.show(this._btnBottom)) : (x.hide(this._btnTop), x.hide(this._btnBottom), this._setBarSliderTop(0)), this._isMobile && (this._div.style.bottom = 108 + this._map.config.bottomOffset + "px")
            }
        }, et.prototype._setBarSliderTop = function(t) {
            var e = 26,
                i = this._indoorInfo.floors.length,
                n = i * e;
            this._currentDisplayHeight && (n = this._showArrow ? this._currentDisplayHeight - 30 : this._currentDisplayHeight), n - t >= i * e ? (t = n - i * e, x.ac(this._btnBottom, "disable"), x.rc(this._btnBottom, "hover"), this._btnBottom._disable = !0) : (x.rc(this._btnBottom, "disable"), this._btnBottom._disable = !1), t >= 0 ? (t = 0, x.ac(this._btnTop, "disable"), x.rc(this._btnTop, "hover"), this._btnTop._disable = !0) : (x.rc(this._btnTop, "disable"), this._btnTop._disable = !1), this._ol.style.top = t + "px"
        }, et.prototype._setAdjustVisbile = function(t) {
            this._adjustVisible !== t && (this._adjustVisible = t, this._div.style.right = t && this._visible ? "20px" : "-30px")
        }, et.prototype._bind = function() {
            var t = this._map,
                e = this;
            t.on("indoor_status_changed", function(t) {
                if (e._visible !== !1) {
                    var i = e._ol,
                        n = t.uid;
                    if (n)
                        for (var o = t.floor, a = 0; a < i.children.length; a++) {
                            var r = i.children[a].children[0];
                            parseInt(r.getAttribute("data-floor"), 10) === o ? x.ac(r, "selected") : x.rc(r, "selected")
                        }
                }
            }), t.on("zoomend", function() {
                e._setAdjustVisbile(this.getZoom() < 17 ? !1 : !0)
            })
        }, et.prototype.setInfo = function(t) {
            this._indoorInfo && this._indoorInfo.uid === t.uid || (this._indoorInfo = t, this._updateUI())
        }, et.prototype.show = function() {
            if (this._visible !== !0) {
                this._visible = !0, this._isMobile ? this._div.style.display = "" : this._div.style.right = "20px";
                var t = new aB("onindoor_bar_show");
                t.uid = this._indoorInfo.uid, this._map.dispatchEvent(t)
            }
        }, et.prototype.hide = function() {
            this._visible !== !1 && (this._visible = !1, this._isMobile ? this._div.style.display = "none" : this._div.style.right = "-30px")
        }, x.extend(de.prototype, {
            _init: function() {
                this._createDom(), this._bindDom(), this._bind(), d5() || (this._headingControl = new fb(this._map, this._div)), this._tiltControl = new cT(this._map, this._div), this._render();
                var t = this;
                this._map.isGlobeMapType() || "webgl" === this._map._renderType ? (t._div.style.opacity = "1", t._div.style.visibility = "visible") : (t._div.style.opacity = "0", t._div.style.visibility = "hidden")
            },
            _createDom: function() {
                var t = this._div = H("div"),
                    e = t.style;
                e.position = "absolute", e.zIndex = 5, e.width = "52px", e.height = "82px", e.right = "-3px", e.bottom = "79px", e.opacity = "0", e.visibility = "hidden", e.WebkitTransition = e.transition = "opacity .3s ease-out,visibility .3s ease-out"
            },
            _render: function() {
                var t = document.getElementById("map-operate");
                t ? t.appendChild(this._div) : this._map.getContainer().appendChild(this._div)
            },
            _bindDom: function() {
                this._div.addEventListener("mousemove", g)
            },
            _bind: function() {
                if ("webgl" !== this._map._renderType) {
                    var t = this;
                    this._map.on("maptypechange", function() {
                        this.isGlobeMapType() ? t._firstAnimation ? (t._firstAnimation = !1, setTimeout(function() {
                            t._div.style.opacity = "1", t._div.style.visibility = "visible"
                        }, 300)) : (t._div.style.opacity = "1", t._div.style.visibility = "visible") : (t._div.style.opacity = "0", t._div.style.visibility = "hidden")
                    })
                }
            }
        }), x.extend(fb.prototype, {
            _init: function() {
                this._createDom(), this._render(), this._bindDom(), this._bind(), this._updateUI(), this._checkEnable()
            },
            _checkEnable: function() {
                this._target.getZoom() >= this._target._enableHeadingZoom ? this.enable() : this.disable()
            },
            _createDom: function() {
                var t = this._div = H("div"),
                    e = t.style;
                e.position = "absolute", e.zIndex = 5, e.top = "0", e.left = "0", e.width = "52px", e.height = "54px", e.background = "url(" + this._imgPath + ") no-repeat", e.backgroundSize = "266px auto", this._rotateCCW = this._createButton(), this._rotateCCW.title = "逆时针转动", e = this._rotateCCW.style, e.left = "2px", e.top = "5px", e.zIndex = "1", e.width = "15px", e.height = "42px", e.backgroundPosition = "-75px -5px", this._rotateCW = this._createButton(), this._rotateCW.title = "顺时针转动", e = this._rotateCW.style, e.right = "2px", e.top = "5px", e.zIndex = "1", e.width = "15px", e.height = "42px", e.backgroundPosition = "-75px -5px", e.WebkitTransform = e.transform = "scaleX(-1)", this._compass = this._createButton(), this._compass.title = "恢复正北方向", e = this._compass.style, e.left = "19px", e.top = "4px", e.width = "14px", e.height = "44px", e.backgroundPosition = "-56px -4px", e.WebkitTransform = e.transform = "rotate(0deg)", this._div.appendChild(this._rotateCCW), this._div.appendChild(this._compass), this._div.appendChild(this._rotateCW), this._domRendered = !0
            },
            _createButton: function() {
                var t = H("button"),
                    e = t.style;
                return e.position = "absolute", e.outline = "none", e.border = "none", e.background = "url(" + this._imgPath + ") no-repeat", e.backgroundSize = "266px auto", e.cursor = "pointer", t
            },
            _render: function() {
                this._outContainer.appendChild(this._div)
            },
            enable: function() {
                this._enabled = !0, this._domRendered && (this._rotateCCW.style.cursor = "pointer", this._rotateCCW.style.opacity = 1, this._rotateCW.style.cursor = "pointer", this._rotateCW.style.opacity = 1, this._compass.style.cursor = "pointer", this._compass.style.opacity = 1)
            },
            disable: function() {
                this._enabled = !1, this._domRendered && (this._rotateCCW.style.cursor = "", this._rotateCCW.style.opacity = .4, this._rotateCW.style.cursor = "", this._rotateCW.style.opacity = .4, this._compass.style.cursor = "", this._compass.style.opacity = .4)
            },
            _bindDom: function() {
                c3(this._div, ["mousedown", "click", "dblclick"]);
                var t = this._map,
                    e = this;
                this._rotateCW.addEventListener("click", function() {
                    e._isOperating || e._enabled === !1 || e._target.getLock() || (360 === e._target.getHeading() && e._target.setHeading(0), e._target.setLock(!0), e._target.setHeading(e._target.getHeading() + 90, e._setHeadingOptions), t.fire(new aB("onrotatecwclick")))
                }, !1), this._rotateCCW.addEventListener("click", function() {
                    e._isOperating || e._enabled === !1 || e._target.getLock() || (-360 === e._target.getHeading() && e._target.setHeading(0), e._target.setLock(!0), e._target.setHeading(e._target.getHeading() - 90, e._setHeadingOptions), t.fire(new aB("onrotateccwclick")))
                }, !1), this._rotateCW.addEventListener("mouseover", function() {
                    e._enabled !== !1 && (this.style.backgroundPosition = "-89px -5px")
                }, !1), this._rotateCW.addEventListener("mouseout", function() {
                    e._enabled !== !1 && (this.style.backgroundPosition = "-75px -5px")
                }, !1), this._rotateCCW.addEventListener("mouseover", function() {
                    e._enabled !== !1 && (this.style.backgroundPosition = "-89px -5px")
                }, !1), this._rotateCCW.addEventListener("mouseout", function() {
                    e._enabled !== !1 && (this.style.backgroundPosition = "-75px -5px")
                }, !1), this._compass.addEventListener("click", function() {
                    if (!e._isOperating && e._enabled !== !1 && !e._target.getLock()) {
                        e._target.setLock(!0);
                        var i = !1;
                        0 !== e._target.getTilt() && (i = !0, e._target.setTilt(0, e._setHeadingOptions)), e._target.getHeading() % 360 !== 0 && (i = !0, e._target.resetHeading(e._setHeadingOptions)), i || e._target.setLock(!1), t.fire(new aB("oncompassclick"))
                    }
                }, !1)
            },
            _bind: function() {
                var t = this;
                this._bindTarget(this._target), "webgl" === this._map._renderType && this._map.addEventListener("maptypechange", function() {
                    t._target = this.isGlobeMapType() ? t._map._earth : t._map, t._bindTarget(t._target), t._checkEnable()
                })
            },
            _bindTarget: function(t) {
                if (!(t === this._map && this._mapBinded || t === this._map._earth && this._earthBinded)) {
                    var e = this;
                    t.addEventListener("heading_changed", function() {
                        e._updateUI()
                    }), t.addEventListener("animation_start", function() {
                        e._isOperating = !0
                    }), t.addEventListener("animation_end", function() {
                        e._isOperating = !1
                    }), t.on("load", function() {
                        e._checkEnable()
                    }), t.on("zoom_changed", function() {
                        e._checkEnable()
                    }), t === this._map ? this._mapBinded = !0 : this._earthBinded = !0
                }
            },
            _updateUI: function() {
                var t = this._target.getHeading(),
                    e = this._compass.style;
                e.WebkitTransform = e.transform = "rotate(" + t + "deg)"
            },
            hide: function() {
                this._div.style.display = "none"
            },
            show: function() {
                this._div.style.display = "block"
            }
        }), x.extend(cT.prototype, {
            _init: function() {
                this._createDom(), this._render(), this._bindDom(), this._bind(), this._checkEnable()
            },
            _checkEnable: function() {
                this._target.getZoom() >= this._target._enableTiltZoom ? this.enable() : this.disable()
            },
            _createDom: function() {
                var t = this._div = H("button");
                t.title = "倾斜";
                var e = t.style;
                e.position = "absolute", e.zIndex = 5, e.outline = "none", e.border = "none", e.cursor = "pointer", e.width = "26px", e.height = "26px", e.top = "56px", e.right = "13px", e.background = "url(" + this._imgPath + ") no-repeat #fff", e.backgroundSize = "266px auto", e.backgroundPosition = "-110px 1px", e.boxShadow = "1px 2px 1px rgba(0, 0, 0, 0.15)"
            },
            enable: function() {
                this._enabled = !0, this._div && (this._div.style.cursor = "pointer"), this._updateUI()
            },
            disable: function() {
                this._enabled = !1, this._div && (this._div.style.cursor = ""), this._updateUI()
            },
            _render: function() {
                this._outContainer.appendChild(this._div)
            },
            _bindDom: function() {
                var t = this;
                this._div.addEventListener("mousedown", function(e) {
                    if (t._enabled && !t._target.getLock()) {
                        var i, n = t._target.getTilt();
                        i = n === t._map.getCurrentMaxTilt() ? "out" : 0 === n ? "in" : t._preTrend ? t._preTrend : "in", t._curTrend = i, t._clickTimer = setTimeout(function() {
                            t._map.fire(new aB("ontiltmsdown")), t._tiltAni = new l({
                                duration: 9999999,
                                render: function() {
                                    n = t._target.getTilt(), "in" === i && n < t._map.getCurrentMaxTilt() ? t._target.setTilt(n + 1, {
                                        noAnimation: !0
                                    }) : "out" === i && n > 0 && t._target.setTilt(n - 1, {
                                        noAnimation: !0
                                    })
                                },
                                finish: function() {
                                    t._tiltAni = null
                                }
                            }), t._clickTimer = null
                        }, 200), e.stopPropagation()
                    }
                }, !1), this._div.addEventListener("mouseup", function() {
                    t._enabled && (t._tiltAni && t._tiltAni.stop(), t._preTrend = t._curTrend)
                }, !1), this._div.addEventListener("click", function(e) {
                    if (t._enabled && t._clickTimer && !t._target.getLock()) {
                        clearTimeout(t._clickTimer), t._map.fire(new aB("ontiltclick"));
                        var i = t._target.getTilt();
                        t._target.setLock(!0), e.stopPropagation();
                        var n = t._map.getCurrentMaxTilt();
                        "in" === t._curTrend ? t._target.setTilt(n, t._setTiltOptions) : "out" === t._curTrend ? t._target.setTilt(0, t._setTiltOptions) : n > i ? t._target.setTilt(n, t._setTiltOptions) : t._target.setTilt(0, t._setTiltOptions)
                    }
                }, !1), this._div.addEventListener("mouseover", function() {
                    t._enabled && (t._mouseOver = !0, t._updateUI())
                }, !1), this._div.addEventListener("mouseout", function() {
                    t._enabled && (t._mouseOver = !1, t._updateUI())
                }, !1), c3(this._div, ["mousedown", "click", "dblclick"])
            },
            _bind: function() {
                {
                    var t = this;
                    this._map
                }
                this._bindTarget(this._target), "webgl" === this._map._renderType && this._map.addEventListener("maptypechange", function() {
                    t._target = this.isGlobeMapType() ? t._map._earth : t._map, t._bindTarget(t._target), t._checkEnable()
                })
            },
            _bindTarget: function(t) {
                if (!(t === this._map && this._mapBinded || t === this._map._earth && this._earthBinded)) {
                    var e = this;
                    t.on("load", function() {
                        e._checkEnable()
                    }), t.on("zoom_changed", function() {
                        e._checkEnable()
                    }), t.on("tilt_changed", function() {
                        e._updateUI()
                    }), t === this._map ? this._mapBinded = !0 : this._earthBinded = !0
                }
            },
            _updateUI: function() {
                var t = this._target.getTilt(),
                    e = 0,
                    i = 0,
                    n = 0;
                0 >= t && (e = 78), this._mouseOver && (n = 52), this._enabled === !1 && (i = 104, n = 0, e = 0);
                var o = "-" + (110 + e + i + n) + "px 1px";
                this._div && (this._div.style.backgroundPosition = o), this._enabled ? t > 0 ? this._div && (this._div.title = "恢复") : this._div && (this._div.title = "倾斜") : this._div && (this._div.title = "请放大地图后操作")
            },
            hide: function() {
                this._div.style.display = "none"
            },
            show: function() {
                this._div.style.display = "block"
            }
        }), bl.inherits(cI, "ContextMenu"), x.extend(bl.prototype, {
            initialize: function(t) {
                this._map = t
            },
            remove: function() {
                this._map = null
            },
            addItem: function(t, e) {
                if (t && "menuitem" == t._type && "" != t._text && !(t._width <= 0)) {
                    for (var i = 0, n = this._items.length; n > i; i++)
                        if (this._items[i] === t) return;
                    (void 0 === e || e > this._items.length - 1) && (e = -1), t._insertIndex = e, -1 === e ? (this._items.push(t), this._rItems.push(t)) : (this._items.splice(e, 0, t), this._rItems.splice(e, 0, t))
                }
            },
            removeItem: function(t) {
                if (t && "menuitem" == t._type) {
                    for (var e = 0, i = this._items.length; i > e; e++) this._items[e] === t && (this._items[e].remove(), this._items.splice(e, 1), delete t._insertIndex, i--);
                    for (var e = 0, i = this._rItems.length; i > e; e++) this._rItems[e] === t && (this._rItems[e].remove(), this._rItems.splice(e, 1), delete t._insertIndex, i--)
                }
            },
            addSeparator: function(t) {
                (void 0 === t || t > this._items.length - 1) && (t = -1);
                var e = {
                    _type: "divider",
                    _dIndex: this._dividers.length,
                    _insertIndex: t
                };
                this._dividers.push({
                    dom: null
                }), -1 === t ? this._items.push(e) : this._items.splice(t, 0, e)
            },
            removeSeparator: function(t) {
                if (this._dividers[t]) {
                    for (var e = 0, i = this._items.length; i > e; e++) this._items[e] && "divider" == this._items[e]._type && this._items[e]._dIndex == t && (this._items.splice(e, 1), i--), this._items[e] && "divider" == this._items[e]._type && this._items[e]._dIndex > t && this._items[e]._dIndex--;
                    this._dividers.splice(t, 1)
                }
            },
            getDom: function() {
                return this._container
            },
            show: function() {
                1 != this._isOpen && (this._isOpen = !0)
            },
            hide: function() {
                0 != this._isOpen && (this._isOpen = !1)
            },
            setCursor: function(t) {
                t && (this._opts.cursor = t)
            },
            getItem: function(t) {
                return this._rItems[t]
            },
            enable: function() {
                this._enable = !0
            },
            disable: function() {
                this._enable = !1
            },
            showAt: function() {}
        }), dH.inherits(cI, "MenuItem"), x.extend(dH.prototype, {
            initialize: function(t, e) {
                this._map = t, this._contextmenu = e
            },
            remove: function() {
                this._contextmenu = null, this._map = null
            },
            setText: function(t) {
                t && (this._text = t + "")
            },
            getDom: function() {
                return this._container
            },
            enable: function() {
                this._enabled = !0
            },
            disable: function() {
                this._enabled = !1
            }
        }), x.extend(cv.prototype, {
            isEmpty: function() {
                return null === this.sw && null === this.ne
            },
            equals: function(t) {
                return !t || t.isEmpty() || this.isEmpty() ? !1 : this.sw.equals(t.sw) && this.ne.equals(t.ne)
            },
            containsBounds: function(t) {
                return !t || t.isEmpty() || this.isEmpty() ? !1 : t.sw.lng > this.sw.lng && t.ne.lng < this.ne.lng && t.sw.lat > this.sw.lat && t.ne.lat < this.ne.lat
            },
            getCenter: function() {
                return this.isEmpty() ? null : new e1((this.sw.lng + this.ne.lng) / 2, (this.sw.lat + this.ne.lat) / 2)
            },
            intersects: function(t) {
                if (!t || t.isEmpty() || this.isEmpty()) return null;
                if (Math.max(t.sw.lng, t.ne.lng) < Math.min(this.sw.lng, this.ne.lng) || Math.min(t.sw.lng, t.ne.lng) > Math.max(this.sw.lng, this.ne.lng) || Math.max(t.sw.lat, t.ne.lat) < Math.min(this.sw.lat, this.ne.lat) || Math.min(t.sw.lat, t.ne.lat) > Math.max(this.sw.lat, this.ne.lat)) return null;
                var e = Math.max(this.sw.lng, t.sw.lng),
                    i = Math.min(this.ne.lng, t.ne.lng),
                    n = Math.max(this.sw.lat, t.sw.lat),
                    o = Math.min(this.ne.lat, t.ne.lat);
                return new cv(new e1(e, n), new e1(i, o))
            },
            setMinMax: function() {
                this.minX = this.sw ? this.sw.lng : null, this.minY = this.sw ? this.sw.lat : null, this.maxX = this.ne ? this.ne.lng : null, this.maxY = this.ne ? this.ne.lat : null
            },
            containsPoint: function(t) {
                return t ? t.lng >= this.sw.lng && t.lng <= this.ne.lng && t.lat >= this.sw.lat && t.lat <= this.ne.lat : void 0
            },
            extend: function(t) {
                if (t) {
                    var e = t.lng,
                        i = t.lat;
                    this.sw || (this.sw = t.clone()), this.ne || (this.ne = t.clone()), this.sw.lng > e && (this.sw.lng = e), this.ne.lng < e && (this.ne.lng = e), this.sw.lat > i && (this.sw.lat = i), this.ne.lat < i && (this.ne.lat = i)
                }
            },
            getMin: function() {
                return this.sw
            },
            getMax: function() {
                return this.ne
            },
            getSouthWest: function() {
                return this.sw
            },
            getNorthEast: function() {
                return this.ne
            },
            setSouthWest: function(t) {
                this.sw = t ? t.clone() : null
            },
            setNorthEast: function(t) {
                this.ne = t ? t.clone() : null
            },
            clone: function() {
                return new cv(this.sw, this.ne)
            },
            toSpan: function() {
                return this.isEmpty() ? new cF(0, 0) : new cF(Math.abs(this.ne.lng - this.sw.lng), Math.abs(this.ne.lat - this.sw.lat))
            },
            div: function(t) {
                return !t || t.isEmpty() || this.isEmpty() ? 0 : (this.ne.lng - this.sw.lng) * (this.ne.lat - this.sw.lat) / ((t.ne.lng - t.sw.lng) * (t.ne.lat - t.sw.lat))
            },
            makeNormalizedPoint: function(t) {
                for (this.normalizedTopLeft = this.pointTopLeft.clone(), this.normalizedTopRight = this.pointTopRight.clone(), this.normalizedBottomRight = this.pointBottomRight.clone(), this.normalizedBottomLeft = this.pointBottomLeft.clone(); 0 > t;) t += 360;
                t %= 360, t >= 0 && 90 > t || t >= 270 && 360 > t ? (this.normalizedTopRight.lng < this.normalizedTopLeft.lng && (this.normalizedTopRight.lng += bU.WORLD_SIZE_MC), this.normalizedBottomRight.lng < this.normalizedBottomLeft.lng && (this.normalizedBottomRight.lng += bU.WORLD_SIZE_MC)) : (this.normalizedTopLeft.lng < this.normalizedTopRight.lng && (this.normalizedTopLeft.lng += bU.WORLD_SIZE_MC), this.normalizedBottomLeft.lng < this.normalizedBottomRight.lng && (this.normalizedBottomLeft.lng += bU.WORLD_SIZE_MC))
            },
            toString: function() {
                return "Bounds"
            }
        }), e1.prototype.equals = function(t) {
            if (!t) return !1;
            var e = Math.abs(this.lat - t.lat),
                i = Math.abs(this.lng - t.lng),
                n = 1e-8;
            return n > e && n > i ? !0 : !1
        }, e1.prototype.clone = function() {
            return new e1(this.lng, this.lat)
        }, e1.prototype.add = function(t) {
            return new e1(this.lng + t.lng, this.lat + t.lat)
        }, e1.prototype.sub = function(t) {
            return new e1(this.lng - t.lng, this.lat - t.lat)
        }, e1.prototype.mult = function(t) {
            return new e1(this.lng * t, this.lat * t)
        }, e1.prototype.div = function(t) {
            return new e1(this.lng / t, this.lat / t)
        }, e1.prototype.mag = function() {
            return Math.sqrt(this.lng * this.lng + this.lat * this.lat)
        }, e1.prototype.toString = function() {
            return "Point"
        }, x.extend(cP, {
            EARTHRADIUS: 6370996.81,
            MCBAND: [12890594.86, 8362377.87, 5591021, 3481989.83, 1678043.12, 0],
            LLBAND: [86, 60, 45, 30, 15, 0],
            MC2LL: [
                [1.410526172116255e-8, 898305509648872e-20, -1.9939833816331, 200.9824383106796, -187.2403703815547, 91.6087516669843, -23.38765649603339, 2.57121317296198, -.03801003308653, 17337981.2],
                [-7.435856389565537e-9, 8983055097726239e-21, -.78625201886289, 96.32687599759846, -1.85204757529826, -59.36935905485877, 47.40033549296737, -16.50741931063887, 2.28786674699375, 10260144.86],
                [-3.030883460898826e-8, 898305509983578e-20, .30071316287616, 59.74293618442277, 7.357984074871, -25.38371002664745, 13.45380521110908, -3.29883767235584, .32710905363475, 6856817.37],
                [-1.981981304930552e-8, 8983055099779535e-21, .03278182852591, 40.31678527705744, .65659298677277, -4.44255534477492, .85341911805263, .12923347998204, -.04625736007561, 4482777.06],
                [3.09191371068437e-9, 8983055096812155e-21, 6995724062e-14, 23.10934304144901, -.00023663490511, -.6321817810242, -.00663494467273, .03430082397953, -.00466043876332, 2555164.4],
                [2.890871144776878e-9, 8983055095805407e-21, -3.068298e-8, 7.47137025468032, -353937994e-14, -.02145144861037, -1234426596e-14, .00010322952773, -323890364e-14, 826088.5]
            ],
            LL2MC: [
                [-.0015702102444, 111320.7020616939, 0x60e374c3105a3, -0x24bb4115e2e164, 0x5cc55543bb0ae8, -0x7ce070193f3784, 0x5e7ca61ddf8150, -0x261a578d8b24d0, 0x665d60f3742ca, 82.5],
                [.0008277824516172526, 111320.7020463578, 647795574.6671607, -4082003173.641316, 10774905663.51142, -15171875531.51559, 12053065338.62167, -5124939663.577472, 913311935.9512032, 67.5],
                [.00337398766765, 111320.7020202162, 4481351.045890365, -23393751.19931662, 79682215.47186455, -115964993.2797253, 97236711.15602145, -43661946.33752821, 8477230.501135234, 52.5],
                [.00220636496208, 111320.7020209128, 51751.86112841131, 3796837.749470245, 992013.7397791013, -1221952.21711287, 1340652.697009075, -620943.6990984312, 144416.9293806241, 37.5],
                [-.0003441963504368392, 111320.7020576856, 278.2353980772752, 2485758.690035394, 6070.750963243378, 54821.18345352118, 9540.606633304236, -2710.55326746645, 1405.483844121726, 22.5],
                [-.0003218135878613132, 111320.7020701615, .00369383431289, 823725.6402795718, .46104986909093, 2351.343141331292, 1.58060784298199, 8.77738589078284, .37238884252424, 7.45]
            ],
            getDistanceByMC: function(t, e) {
                if (!t || !e) return 0;
                var i, n, o, a;
                return (t = this.convertMC2LL(t)) ? (i = cq(t.lng), n = cq(t.lat), (e = this.convertMC2LL(e)) ? (o = cq(e.lng), a = cq(e.lat), this.getDistance(i, o, n, a)) : 0) : 0
            },
            getDistanceByLL: function(t, e) {
                if (!t || !e) return 0;
                t.lng = this.getLoop(t.lng, -180, 180), t.lat = this.getRange(t.lat, -80, 84), e.lng = this.getLoop(e.lng, -180, 180), e.lat = this.getRange(e.lat, -80, 84);
                var i, n, o, a;
                return i = cq(t.lng), o = cq(t.lat), n = cq(e.lng), a = cq(e.lat), this.getDistance(i, n, o, a)
            },
            convertMC2LL: function(t) {
                if (null === t) return t;
                if (!t) return new e1(0, 0);
                var e, i;
                e = new e1(Math.abs(t.lng), Math.abs(t.lat));
                for (var n = 0; n < this.MCBAND.length; n++)
                    if (e.lat >= this.MCBAND[n]) {
                        i = this.MC2LL[n];
                        break
                    }
                var o = this.convertor(t, i);
                return new bR(o.lat, o.lng)
            },
            convertLL2MC: function(t) {
                if (!t) return new e1(0, 0);
                var e = t.lat,
                    i = t.lng;
                i = this.getLoop(t.lng, -180, 180), e = dL(e, -85, 85);
                for (var n, o = 0; o < this.LLBAND.length; o++)
                    if (e >= this.LLBAND[o]) {
                        n = this.LL2MC[o];
                        break
                    }
                if (!n)
                    for (o = 0; o < this.LLBAND.length; o++)
                        if (e <= -this.LLBAND[o]) {
                            n = this.LL2MC[o];
                            break
                        }
                var a = new e1(i, e),
                    r = this.convertor(a, n),
                    s = new e1(r.lng, r.lat);
                return s.latLng = t.clone(), s
            },
            convertor: function(t, e) {
                if (t && e) {
                    var i = e[0] + e[1] * Math.abs(t.lng),
                        n = Math.abs(t.lat) / e[9],
                        o = e[2] + e[3] * n + e[4] * n * n + e[5] * n * n * n + e[6] * n * n * n * n + e[7] * n * n * n * n * n + e[8] * n * n * n * n * n * n;
                    return i *= t.lng < 0 ? -1 : 1, o *= t.lat < 0 ? -1 : 1, new e1(i, o)
                }
            },
            getDistance: function(t, e, i, n) {
                return this.EARTHRADIUS * Math.acos(Math.sin(i) * Math.sin(n) + Math.cos(i) * Math.cos(n) * Math.cos(e - t))
            },
            getRange: function(t, e, i) {
                return null != e && (t = Math.max(t, e)), null != i && (t = Math.min(t, i)), t
            },
            getLoop: function(t, e, i) {
                for (; t > i;) t -= i - e;
                for (; e > t;) t += i - e;
                return t
            }
        }), x.extend(bR.prototype, {
            equals: function(t) {
                return this.lat === t.lat && this.lng === t.lng
            },
            clone: function() {
                return new bR(this.lat, this.lng)
            },
            getLngSpan: function(t) {
                var e = this.lng,
                    i = Math.abs(t - e);
                return i > 180 && (i = 360 - i), i
            },
            sub: function(t) {
                return new bR(this.lat - t.lat, this.lng - t.lng)
            },
            toString: function() {
                return this.lat + ", " + this.lng
            }
        }), x.extend(c1.prototype, {
            isEmpty: function() {
                return !this._sw || !this._ne
            },
            equals: function(t) {
                return this.isEmpty() ? !1 : this.getSouthWest().equals(t.getSouthWest()) && this.getNorthEast().equals(t.getNorthEast())
            },
            getSouthWest: function() {
                return this._sw
            },
            getNorthEast: function() {
                return this._ne
            },
            containsBounds: function(t) {
                return this.isEmpty() || t.isEmpty() ? !1 : t._swLng > this._swLng && t._neLng < this._neLng && t._swLat > this._swLat && t._neLat < this._neLat
            },
            getCenter: function() {
                return this.isEmpty() ? null : new bR((this._swLat + this._neLat) / 2, (this._swLng + this._neLng) / 2)
            },
            intersects: function(t) {
                if (Math.max(t._swLng, t._neLng) < Math.min(this._swLng, this._neLng) || Math.min(t._swLng, t._neLng) > Math.max(this._swLng, this._neLng) || Math.max(t._swLat, t._neLat) < Math.min(this._swLat, this._neLat) || Math.min(t._swLat, t._neLat) > Math.max(this._swLat, this._neLat)) return !1;
                var e = Math.max(this._swLng, t._swLng),
                    i = Math.min(this._neLng, t._neLng),
                    n = Math.max(this._swLat, t._swLat),
                    o = Math.min(this._neLat, t._neLat);
                return this._sw = new bR(n, e), this._ne = new bR(o, i), this._swLng = e, this._swLat = n, this._neLng = i, this._neLat = o, !0
            },
            containsPoint: function(t) {
                return this.isEmpty() ? !1 : t.lng >= this._swLng && t.lng <= this._neLng && t.lat >= this._swLat && t.lat <= this._neLat
            },
            extend: function(t) {
                var e = t.lng,
                    i = t.lat;
                this._sw || (this._sw = new bR(0, 0)), this._ne || (this._ne = new bR(0, 0)), (!this._swLng || this._swLng > e) && (this._sw.lng = this._swLng = e), (!this._neLng || this._neLng < e) && (this._ne.lng = this._neLng = e), (!this._swLat || this._swLat > i) && (this._sw.lat = this._swLat = i), (!this._neLat || this._neLat < i) && (this._ne.lat = this._neLat = i)
            },
            toSpan: function() {
                return this.isEmpty() ? new bR(0, 0) : new bR(Math.abs(this._neLat - this._swLat), Math.abs(this._neLng - this._swLng))
            },
            union: function(t) {
                if (t.isEmpty()) return !1;
                var e = t.getSouthWest(),
                    i = t.getNorthEast();
                return this._swLat > e.lat && (this._swLat = e.lat), this._swLng > e.lng && (this._swLng = e.lng), this._neLat < i.lat && (this._neLat = i.lat), this._neLng < i.lng && (this._neLng = i.lng), this._sw = new bR(this._swLat, this._swLng), this._ne = new bR(this._neLat, this._neLng), !0
            },
            toString: function() {
                return this._swLat + ", " + this._swLng + ", " + this._neLat + ", " + this._neLng
            }
        });
        var cx = {
                idle: 0,
                freeze: 1,
                zooming: 2,
                dragging: 3,
                moving: 4,
                readyToDrag: 5,
                readyToPinch: 6,
                pinching: 7,
                stdMapCtrlDrag: 8,
                KEY_LEFT: 37,
                KEY_UP: 38,
                KEY_RIGHT: 39,
                KEY_DOWN: 40,
                arrowOpCodes: {
                    37: 1,
                    38: 2,
                    39: 4,
                    40: 8
                }
            },
            cM = {
                _map: null,
                _html: "<div class='BMap_opMask' unselectable='on'></div>",
                _maskElement: null,
                _cursor: "default",
                inUse: !1,
                show: function(t) {
                    this._map || (this._map = t), this.inUse = !0, this._maskElement || this._createMask(t), this._maskElement.style.display = "block"
                },
                _createMask: function(t) {
                    if (this._map || (this._map = t), this._map) {
                        var e = this._maskElement = co(this._map.container, this._html);
                        x.on(e, "mouseup", function(t) {
                            2 == t.button && bX(t)
                        }), x.on(e, "contextmenu", bX), e.style.display = "none"
                    }
                },
                getDrawPoint: function(t, e, i) {
                    t = window.event || t;
                    var n = t.offsetX || t.layerX || 0,
                        o = parseInt(t.offsetY) || parseInt(t.layerY) || 0,
                        a = t.target || t.srcElement;
                    if (a != cM.getDom(this._map) && 1 == e)
                        for (; a && a != this._map.container;) 0 == a.clientWidth && 0 == a.clientHeight && a.offsetParent && "td" == a.offsetParent.nodeName.toLowerCase() || (n += a.offsetLeft, o += a.offsetTop), a = a.offsetParent;
                    return a != cM.getDom(this._map) && a != this._map.container || "undefined" == typeof n || "undefined" == typeof o || isNaN(n) || isNaN(o) ? void 0 : (i && (n += i.x, o += i.y), this._map.pixelToPoint(new cN(n, o)))
                },
                hide: function() {
                    this._map && (this.inUse = !1, this._maskElement && (this._maskElement.style.display = "none"))
                },
                getDom: function(t) {
                    return this._maskElement || this._createMask(t), this._maskElement
                },
                setCursor: function(t) {
                    this._cursor = t || "default", this._maskElement && (this._maskElement.style.cursor = this._cursor)
                }
            };
        aH.inherits(x.BaseClass, "Overlay"), aH.getZIndex = function(t, e) {
            return (t = 1 * t) ? (e && (t = cP.convertMC2LL(new e1(0, t)).lat), -1e5 * t << 1) : 0
        }, x.extend(aH.prototype, {
            _i: function(t) {
                this._map = t, !this.domElement && a7(this.initialize) && (this.domElement = this.initialize(t), this.domElement && (this.domElement.style.WebkitUserSelect = "none")), this.draw()
            },
            initialize: function() {
                throw "initialize方法未实现"
            },
            draw: function() {
                throw "draw方法未实现"
            },
            remove: function() {
                this._map = null, this.domElement && this.domElement.parentNode && this.domElement.parentNode.removeChild(this.domElement), this.domElement = null, this.dispatchEvent(new aB("onremove"))
            },
            hide: function() {
                this._visible = !1, x.hide(this.domElement)
            },
            show: function() {
                this._visible = !0, x.show(this.domElement)
            },
            getMap: function() {
                return this._map
            },
            dispose: function() {
                x.BaseClass.prototype.decontrol.call(this)
            }
        }), bJ.inherits(aH, "OverlayInternal"), x.extend(bJ.prototype, {
            initialize: function(t) {
                return this.map = t, x.BaseClass.call(this, this.hashCode), null
            },
            draw: function() {},
            remove: function() {
                this.map = null, this.decontrol(), aH.prototype.remove.call(this)
            },
            hide: function() {
                this._visible = !1
            },
            show: function() {
                this._visible = !0
            },
            getDom: function() {
                return this.domElement
            },
            getContainer: function() {
                return this.domElement
            },
            setClassName: function() {},
            setConfig: function(t) {
                if (t)
                    for (var e in t) t.hasOwnProperty(e) && (this._config[e] = t[e])
            },
            getPoint: function(t, e) {
                if (!t) return this.point;
                var i = e ? e.width : 0,
                    n = e ? e.height : 0;
                if (this.map) {
                    var o = this.map.pointToPixel(this.point);
                    return this._config && this._config.offset ? (o.x = o.x + this._config.offset.width + i, o.y = o.y + this._config.offset.height + n) : (o.x = o.x + i, o.y = o.y + n), this.map.pixelToPoint(o)
                }
            },
            setZIndex: function(t) {
                this.zIndex = t
            },
            isVisible: function() {
                return this.domElement ? !!this._visible : !1
            },
            enableMassClear: function() {
                this._config.enableMassClear = !0
            },
            disableMassClear: function() {
                this._config.enableMassClear = !1
            },
            showInternal: function() {
                this._visibleInternal = !0
            },
            hideInternal: function(t) {
                this._visibleInternal = !1, this._hideInternalReason = t
            }
        }), dg.prototype._init = function() {
            "webgl" !== this.map._renderType ? this._createOverlayContainers() : this._createWebGLOverlayContainers(), this._bind()
        }, dg.prototype._createOverlayContainers = function() {
            var t = this.map;
            t.temp.overlayDiv = t.overlayDiv = this._createOverlayDiv(t.platform, 200), t.temp.overlayDivEx = t.overlayDivEx = this._createOverlayDiv(t.platform, 50), t._panes.floatPane = this._createOverlayDiv(t.temp.overlayDiv, 800), t._panes.markerMouseTarget = this._createOverlayDiv(t.temp.overlayDiv, 700), t._panes.floatShadow = this._createOverlayDiv(t.temp.overlayDiv, 600), t._panes.labelPane = this._createOverlayDiv(t.temp.overlayDiv, 500), t._panes.markerPane = this._createOverlayDiv(t.temp.overlayDiv, 400), t._panes.mapPane = t.isCanvasMap() ? this._createOverlayDiv(t.temp.overlayDivEx, 50) : this._createOverlayDiv(t.temp.overlayDiv, 200)
        }, dg.prototype._createWebGLOverlayContainers = function() {
            var t = this.map;
            t.temp.overlayDiv = t.overlayDiv = this._createOverlayDiv(t.platform, 200), t._panes.floatPane = this._createOverlayDiv(t.temp.overlayDiv, 800), t._panes.markerMouseTarget = this._createOverlayDiv(t.temp.overlayDiv, 700), t._panes.floatShadow = this._createOverlayDiv(t.temp.overlayDiv, 600), t._panes.labelPane = this._createOverlayDiv(t.temp.overlayDiv, 500), t._panes.markerPane = this._createOverlayDiv(t.temp.overlayDiv, 400)
        }, dg.prototype._createOverlayDiv = function(t, e) {
            var i = H("div"),
                n = i.style;
            return n.position = "absolute", n.top = n.left = n.width = n.height = "0", n.zIndex = e, t.appendChild(i), i
        }, dg.prototype._bind = function() {
            function t(t) {
                o.draw(t)
            }

            function e() {
                (this.isGlobeMapType() || "webgl" === this._renderType) && o._zoomingOrMoving === !1 && (this._panes.markerMouseTarget.style.display = "none", o._zoomingOrMoving = !0)
            }

            function i(t) {
                if ((this.isGlobeMapType() || "webgl" === this._renderType) && o._zoomingOrMoving === !0) {
                    this._panes.markerMouseTarget.style.display = "", o._zoomingOrMoving = !1;
                    for (var e = 0; e < o._overlayArray.length; e++) {
                        var i = o._overlayArray[e];
                        i instanceof b8 == !0 && i.draw(t)
                    }
                }
            }
            var n = this.map,
                o = this;
            "webgl" !== n._renderType ? (n.addEventListener("load", t), n.addEventListener("moveend", t), n.addEventListener("resize", t), n.addEventListener("zoomend", t), n.addEventListener("zooming_inner", t)) : n.on("update", t), n.addEventListener("zoomend", function() {
                this.isGlobeMapType() && (this._earth.getZoom() < this._earth.zoomForNight + 1 ? (this.temp.overlayDiv.style.display = "none", this.temp.overlayDivEx && (this.temp.overlayDivEx.style.display = "none")) : "none" === this.temp.overlayDiv.style.display && (this.temp.overlayDiv.style.display = "", this.temp.overlayDivEx && (this.temp.overlayDivEx.style.display = ""), this.temp.infoWin && this.temp.infoWin.isOpen() && this.temp.infoWin.redraw()))
            }), n.addEventListener("oncenterandzoom", function(t) {
                o.draw(t), this.isGlobeMapType() && (this._earth.getZoom() < this._earth.zoomForNight + 1 ? (this.temp.overlayDiv.style.display = "none", this.temp.overlayDivEx && (this.temp.overlayDivEx.style.display = "none")) : "none" === this.temp.overlayDiv.style.display && (this.temp.overlayDiv.style.display = "", this.temp.overlayDivEx && (this.temp.overlayDivEx.style.display = ""), this.temp.infoWin && this.temp.infoWin.isOpen() && this.temp.infoWin.redraw()))
            }), n.addEventListener("maptypechange", function(t) {
                this.isGlobeMapType() ? (this._panes.mapPane && (this._panes.mapPane.style.display = "none"), this._earth.getZoom() < this._earth.zoomForNight + 1 ? (this.temp.overlayDiv.style.display = "none", this.temp.overlayDivEx && (this.temp.overlayDivEx.style.display = "none")) : "none" === this.temp.overlayDiv.style.display && (this.temp.overlayDiv.style.display = "", this.temp.overlayDivEx && (this.temp.overlayDivEx.style.display = ""), this.temp.infoWin && this.temp.infoWin.isOpen() && this.temp.infoWin.redraw()), this._panes.markerPane && (this._panes.markerPane.style.display = "none")) : (this._panes.mapPane && (this._panes.mapPane.style.display = ""), this._panes.markerPane && (this._panes.markerPane.style.display = ""), "none" === this.temp.overlayDiv.style.display && (this.temp.overlayDiv.style.display = "", this.temp.overlayDivEx && (this.temp.overlayDivEx.style.display = ""), this.temp.infoWin && this.temp.infoWin.isOpen() && this.temp.infoWin.redraw())), o.draw(t)
            }), n.on("earthstatuschange", function(t) {
                o.draw(t)
            }), n.addEventListener("addoverlay", function(t) {
                var e = t.target;
                if (e instanceof bJ) o._overlays[e.hashCode] || (o._overlays[e.hashCode] = e, o._overlayArray.push(e));
                else {
                    for (var i = !1, n = 0, a = o._customOverlays.length; a > n; n++)
                        if (o._customOverlays[n] === e) {
                            i = !0;
                            break
                        }
                    i || o._customOverlays.push(e)
                }
            }), n.addEventListener("removeoverlay", function(t) {
                var e = t.target;
                if (e instanceof bJ) {
                    delete o._overlays[e.hashCode];
                    for (var i = 0; i < o._overlayArray.length; i++)
                        if (o._overlayArray[i] === e) {
                            o._overlayArray.splice(i, 1);
                            break
                        }
                } else
                    for (var i = 0, n = o._customOverlays.length; n > i; i++)
                        if (o._customOverlays[i] === e) {
                            o._customOverlays.splice(i, 1);
                            break
                        }
            }), n.addEventListener("clearoverlays", function() {
                this.closeInfoWindow(), this.closeSimpleInfoWindow();
                for (var t in o._overlays) o._overlays[t]._config.enableMassClear && this.removeOverlay(o._overlays[t]);
                for (var e = o._customOverlays.length - 1; e > 0; e--) o._customOverlays[e].enableMassClear !== !1 && (this.removeOverlay(o._customOverlays[e]), o._customOverlays.splice(e, 1))
            }), n.addEventListener("infowindowopen", function() {
                var t = this.infoWindow;
                t && (x.hide(t.popDom), x.hide(t.shadowDom))
            }), n.addEventListener("movestart", e), n.addEventListener("moveend", i), n.addEventListener("zoomstart", e), n.addEventListener("zoomend", i), n.addEventListener("animation_start", e), n.addEventListener("animation_end", i), n.addEventListener("displayoptions_changed", function() {
                this.temp.overlayDiv.style.display = this._displayOptions.overlay === !1 ? "none" : ""
            })
        }, dg.prototype.draw = function(t) {
            if (t = t || {}, this.map.isGlobeMapType())
                for (var e = 0; e < this._overlayArray.length; e++) {
                    var i = this._overlayArray[e];
                    i instanceof s != !0 && (this._zoomingOrMoving && i instanceof b8 == !0 || i.draw(t))
                } else
                    for (var e = 0, n = this._overlayArray.length; n > e; e++) {
                        var i = this._overlayArray[e];
                        this._zoomingOrMoving && i instanceof b8 == !0 || i.draw(t)
                    }
            if (x.each(this._customOverlays, function(e) {
                    e.draw(t)
                }), this.map.temp.infoWin && this.map.temp.infoWin.setPosition(t.center, t.zoom), !this.map.isGlobeMapType() && "webgl" !== this.map._renderType && aI.DrawerSelector) {
                var o = aI.DrawerSelector.getDrawer(this.map);
                o.setPalette()
            }
        }, aI.register(function(t) {
            t._overlayMgr = new dg(t)
        }), s.JOININDEX = {
            miter: 0,
            round: 1,
            bevel: 2
        }, s.CAPINDEX = {
            round: 0,
            butt: 1,
            square: 2
        }, s.inherits(bJ, "Graph"), s.getGraphPoints = function(t) {
            var e = [];
            if (!t || 0 === t.length) return e;
            if ("string" == typeof t) {
                var i = t.split(";");
                x.each(i, function(t) {
                    var i = t.split(",");
                    e.push(new e1(i[0], i[1]))
                })
            }
            return t.constructor === Array && t.length > 0 && (e = t), e
        }, s.parseTolerance = {
            0: [.09, .005, 1e-4, 1e-5],
            1: [9e3, 500, 20, 1]
        }, x.extend(s.prototype, {
            initialize: function(t) {
                return this.map = t, null
            },
            draw: function() {},
            setPoints: function(t) {
                this._clearCache(), this.points = s.getGraphPoints(t).slice(0), this._calcBounds()
            },
            setPath: function(t) {
                this.setPoints(t)
            },
            _calcBounds: function() {
                if (this.points) {
                    var t = this;
                    t._bounds = new cv, this.hasMultipleParts ? x.each(this.points, function(e) {
                        x.each(e, function(e) {
                            t._bounds.extend(e)
                        })
                    }) : x.each(this.points, function(e) {
                        t._bounds.extend(e)
                    })
                }
            },
            getPoints: function() {
                return this.points
            },
            getPath: function() {
                return this.points
            },
            setPointAt: function(t, e) {
                e && this.points[t] && (this._clearCache(), this.points[t] = new e1(e.lng, e.lat), this._calcBounds())
            },
            setOptions: function(t) {
                t = t || {};
                for (var e in t) t.hasOwnProperty(e) && (this._config[e] = t[e])
            },
            setStrokeColor: function(t) {
                this._config.strokeColor = t
            },
            getStrokeColor: function() {
                return this._config.strokeColor
            },
            setStrokeLineCap: function(t) {
                this._config.strokeLineCap = t
            },
            getStrokeLineCap: function() {
                return this._config.strokeLineCap
            },
            setStrokeLineJoin: function(t) {
                this._config.strokeLineJoin = t
            },
            getStrokeLineJoin: function() {
                return this._config.strokeLineJoin
            },
            setStrokeWeight: function(t) {
                t > 0 && (this._config.strokeWeight = t)
            },
            getStrokeWeight: function() {
                return this._config.strokeWeight
            },
            setStrokeOpacity: function(t) {
                !t || t > 1 || 0 > t || (this._config.strokeOpacity = t)
            },
            getStrokeOpacity: function() {
                return this._config.strokeOpacity
            },
            setFillOpacity: function(t) {
                t > 1 || 0 > t || (this._config.fillOpacity = t)
            },
            getFillOpacity: function() {
                return this._config.fillOpacity
            },
            setStrokeStyle: function(t) {
                ("solid" === t || "dashed" === t || "dotted" === t) && (this._config.strokeStyle = t)
            },
            getStrokeStyle: function() {
                return this._config.strokeStyle
            },
            setFillColor: function(t) {
                this._config.fillColor = t || ""
            },
            getFillColor: function() {
                return this._config.fillColor
            },
            getBounds: function() {
                return this._bounds.setMinMax(), this._bounds
            },
            remove: function() {
                this.map && this.map.removeEventListener("onmousemove", this._graphMouseEvent), bJ.prototype.remove.call(this), this._clearCache();
                var t = new aB("onlineupdate");
                t.action = "remove", t.overlay = this, this.fire(t)
            },
            enableEditing: function() {
                this._config.enableEditing = !0
            },
            disableEditing: function() {
                this._config.enableEditing = !1
            },
            getLength: function() {
                if ("number" == typeof this._length) return this._length;
                if ("number" == typeof this._config.totalLength) return this._length = this._config.totalLength, this._length;
                var t = 0;
                if (this.points.length <= 1) return this._length = 0, t;
                for (var e = 0; e < this.points.length - 1; e++) t += a2(this.points[e], this.points[e + 1]);
                return this._length = t, t
            },
            getParsedPoints: function() {
                var t = this._simplification(this.points);
                return this.hasMultipleParts ? t : [t]
            },
            _simplification: function(t) {
                var e, i = this.map,
                    n = this.getParseCacheIndex(i.getZoom());
                if (this._parseCache[n]) e = this._parseCache[n];
                else {
                    var o = t;
                    this.greatCirclePoints.length > 0 && (o = this.greatCirclePoints);
                    var a = this.getParseTolerance(i.getZoom(), i.config.coordType);
                    if (this.hasMultipleParts)
                        for (var r = [], s = 0; s < o.length; s++) {
                            var l = fa(o[s], a);
                            r.push(l)
                        } else var r = fa(o, a);
                    e = this._parseCache[n] = r
                }
                return e
            },
            _clearCache: function() {
                this._length = null, this._parseCache.length = 0, this._parseCacheGL.length = 0, this._parseCacheGLRaw.length = 0, this._areaCacheGL.length = 0
            },
            canRenderDataBeMerged: function() {
                var t = this._config;
                return t.texture || this.useGradientColor() ? !1 : !0
            },
            useGradientColor: function() {
                return 0 === this._config.strokeColor.indexOf("gradient")
            }
        }), x.Browser.ie && document.namespaces && !document.namespaces.olv && document.namespaces.add("olv", "urn:schemas-microsoft-com:vml"), eO.prototype.setImageUrl = function(t) {
            t && (this.imageUrl = t, this._renderData = null)
        }, eO.prototype.getCurrentImageUrl = function() {
            return window.devicePixelRatio > 1 && this.srcSetObject["2x"] ? this.srcSetObject["2x"] : this.imageUrl
        }, eO.prototype.setPrintImageUrl = function(t) {
            t && (this.printImageUrl = t)
        }, eO.prototype.setSize = function(t) {
            t && (this.size = new cF(t.width, t.height), this._renderData = null)
        }, eO.prototype.setOffset = function(t) {
            t && (this.anchor = this.offset = new cF(t.width, t.height), this._renderData = null)
        }, eO.prototype.setAnchor = function(t) {
            this.setOffset(t)
        }, eO.prototype.setImageOffset = function(t) {
            t && (this.imageOffset = new cF(t.width, t.height), this._renderData = null)
        }, eO.prototype.setInfoWindowOffset = function(t) {
            t && (this.infoWindowOffset = new cF(t.width, t.height))
        }, eO.prototype.setImageSize = function(t) {
            t && (this.imageSize = new cF(t.width, t.height))
        }, eO.prototype.setImageSrcset = function(t) {
            var e = "";
            if (t) {
                for (var i in t) t.hasOwnProperty(i) && (this.srcSetObject[i] = t[i], e = t[i] + " " + i + ",");
                this.srcSet = e
            }
        }, eO.prototype.toString = function() {
            return "Icon"
        }, eO.prototype.generateRenderData = function() {
            var t = this.offset,
                e = this.size,
                i = (this.imageOffset, []);
            return i.push(-t.width, t.height - e.height, 0), i.push(e.width - t.width, t.height - e.height, 0), i.push(e.width - t.width, t.height, 0), i.push(-t.width, t.height - e.height, 0), i.push(e.width - t.width, t.height, 0), i.push(-t.width, t.height, 0), {
                vertex: i
            }
        }, eO.prototype.getRenderData = function() {
            return this._renderData || (this._renderData = this.generateRenderData()), this._renderData
        }, W.inherits(x.BaseClass, "InfoWindow"), x.extend(W.prototype, {
            setWidth: function(t) {
                t = 1 * t, !t && 0 != t || isNaN(t) || 0 > t || (0 != t && (220 > t && (t = 220), t > 730 && (t = 730)), this._config.width = t)
            },
            setHeight: function(t) {
                t = 1 * t, !t && 0 != t || isNaN(t) || 0 > t || (0 != t && (60 > t && (t = 60), t > 650 && (t = 650)), this._config.height = t)
            },
            setMaxWidth: function(t) {
                t = 1 * t, !t && 0 != t || isNaN(t) || 0 > t || (0 != t && (220 > t && (t = 220), t > 730 && (t = 730)), this._config.maxWidth = t)
            },
            setTitle: function(t) {
                this._config.title = t || ""
            },
            setContent: function(t) {
                this.content = t || ""
            },
            setMaxContent: function(t) {
                this._config.maxContent = t || ""
            },
            redraw: function() {},
            enableAutoPan: function() {
                this._config.enableAutoPan = !0
            },
            disableAutoPan: function() {
                this._config.enableAutoPan = !1
            },
            enableCloseOnClick: function() {
                this._config.enableCloseOnClick = !0
            },
            disableCloseOnClick: function() {
                this._config.enableCloseOnClick = !1
            },
            enableMaximize: function() {
                this._config.enableMaximize = !0
            },
            disableMaximize: function() {
                this._config.enableMaximize = !1
            },
            show: function() {
                this._visible = !0
            },
            hide: function() {
                this._visible = !1
            },
            close: function() {
                this.hide()
            },
            dispose: function() {
                x.BaseClass.prototype.decontrol.call(this)
            },
            maximize: function() {
                this.isWinMax = !0
            },
            restore: function() {
                this.isWinMax = !1
            },
            setConfig: function(t) {
                if (t)
                    for (var e in t) typeof this._config[e] == typeof t[e] && (this._config[e] = t[e])
            },
            isVisible: function() {
                return this.isOpen()
            },
            isOpen: function() {
                return !1
            },
            getPoint: function() {
                return this.overlay && this.overlay.getPoint ? this.overlay.getPoint() : void 0
            },
            getOffset: function() {
                return this._config.offset
            },
            dispose: function() {
                x.BaseClass.prototype.decontrol.call(this)
            },
            toString: function() {
                return "InfoWindow"
            }
        }), bU.prototype.openInfoWindow = function(t, e) {
            if (t && "InfoWindow" == t.toString() && e && "Point" == e.toString()) {
                var i = this.temp;
                if (i.marker) i.marker.setPoint(e);
                else {
                    var n = new eO(dm.imgPath + "blank.gif", {
                        width: 1,
                        height: 1
                    });
                    i.marker = new b8(e, {
                        icon: n,
                        width: 1,
                        height: 1,
                        offset: new cF(0, 0),
                        infoWindowOffset: new cF(0, 0),
                        clickable: !1
                    }), i.marker._fromMap = 1
                }
                this.addOverlay(i.marker), i.marker.show(), i.marker.openInfoWindow(t)
            }
        }, bU.prototype.closeInfoWindow = function() {
            var t = this.temp.infoWin || this.temp._infoWin;
            t && t.overlay && t.overlay.closeInfoWindow()
        }, bJ.prototype.openInfoWindow = function(t) {
            this.map && (this.map.closeInfoWindow(), t._visible = !0, this.map.temp._infoWin = t, t.overlay = this, x.BaseClass.call(t, t.hashCode))
        }, bJ.prototype.closeInfoWindow = function() {
            this.map && this.map.temp._infoWin && (this.map.temp._infoWin._visible = !1, this.map.temp._infoWin.decontrol(), this.map.temp._infoWin = null)
        }, ai.inherits(bJ, "Label"), x.extend(ai.prototype, {
            setPoint: function(t) {
                t && "Point" === t.toString() && !this.getMarker() && (this.point = this._config.point = new e1(t.lng, t.lat))
            },
            setContent: function(t) {
                this.content = t
            },
            setOpacity: function(t) {
                t >= 0 && 1 >= t && (this._config.opacity = t)
            },
            setOffset: function(t) {
                t && "Size" === t.toString() && (this._config.offset = new cF(t.width, t.height))
            },
            getOffset: function() {
                return this._config.offset
            },
            setStyle: function(t) {
                t = t || {}, this._config.styles = x.extend(this._config.styles, t)
            },
            setStyles: function(t) {
                this.setStyle(t)
            },
            setTitle: function(t) {
                this._config.title = t || ""
            },
            getTitle: function() {
                return this._config.title
            },
            setMarker: function(t) {
                this._marker && this._marker !== t && (this._marker._config.label = null), this._marker = t, this.point = this._config.point = t ? t.getPoint() : null
            },
            getMarker: function() {
                return this._marker || null
            }
        }), window.BMAP_ANIMATION_DROP = 1, window.BMAP_ANIMATION_BOUNCE = 2, b8.TOP_ZINDEX = aH.getZIndex(-90) + 1e6, b8.DRAG_ZINDEX = b8.TOP_ZINDEX + 1e6, b8._injectMethond = function(t) {
            x.extend(b8.prototype, t)
        }, b8.inherits(bJ, "Marker"), x.extend(b8.prototype, {
            setIcon: function(t) {
                t && (this._config.icon = t, this.textureCoord = this.textureCoordGLMap = null)
            },
            getIcon: function() {
                return this._config.icon
            },
            setLabel: function(t) {
                t && (this._config.label = t, t._config.enableMassClear = this._config.enableMassClear, t.setPoint(this.point))
            },
            getLabel: function() {
                return this._config.label
            },
            enableDragging: function() {
                this._config.enableDragging = !0
            },
            disableDragging: function() {
                this._config.enableDragging = !1
            },
            setPoint: function(t) {
                t && (this.point = this._config.point = new e1(t.lng, t.lat), this.latLng = cP.convertMC2LL(t))
            },
            setPosition: function(t) {
                this.setPoint(t)
            },
            getPosition: function() {
                return this.getPoint()
            },
            setTop: function(t, e) {
                this._config.isTop = !!t, t && (this._addi = e || 0)
            },
            setTitle: function(t) {
                this._config.title = t || ""
            },
            getTitle: function() {
                return this._config.title
            },
            setOffset: function(t) {
                t && (this._config.offset = t)
            },
            getOffset: function() {
                return this._config.offset
            },
            setAnimation: function(t) {
                this._animation = t
            },
            setRank: function(t) {
                this._config.rank = t
            },
            getRank: function() {
                return this._config.rank
            },
            setRotation: function(t) {
                for (; 0 > t;) t += 360;
                this._rotation = t % 360
            },
            getRotation: function() {
                return this._rotation
            }
        }), a.inherits(s, "Polyline"), dA.inherits(a, "PolylineMultipart"), x.extend(dA.prototype, {
            setPoints: function(t) {
                t && (this._clearCache(), this.points = this._unifyArgs(t), this._calcBounds())
            },
            _unifyArgs: function(t) {
                var e = [],
                    i = [];
                return t.constructor === Array ? t[0].constructor === e1 ? i.push(t) : i = t : "string" == typeof t && i.push(t), x.each(i, function(t) {
                    e.push(s.getGraphPoints(t))
                }), e
            },
            setPointAt: function(t, e, i) {
                i = i || 0, e && this.points[i] && this.points[i][t] && (this._clearCache(), this.points[i][t] = new e1(e.lng, e.lat), this._calcBounds())
            },
            getBounds: function(t) {
                return t ? (this._normalizedBounds.setMinMax(), this._normalizedBounds) : (this._bounds.setMinMax(), this._bounds)
            },
            _calcBounds: function() {
                if (this.points) {
                    var t = this;
                    t._bounds.setNorthEast(null), t._bounds.setSouthWest(null), t.greatCirclePoints && t.greatCirclePoints.length > 0 ? x.each(t.greatCirclePoints, function(e) {
                        t._bounds.extend(e)
                    }) : x.each(t.points, function(e) {
                        x.each(e, function(e) {
                            t._bounds.extend(e)
                        })
                    }), t._normalizedBounds.setSouthWest(t._bounds.getSouthWest()), t._normalizedBounds.setNorthEast(t._bounds.getNorthEast()), (t._normalizedBounds.sw.lng < -bU.WORLD_SIZE_MC_HALF || t._normalizedBounds.ne.lng > bU.WORLD_SIZE_MC_HALF) && (t._normalizedBounds.sw.lng = -bU.WORLD_SIZE_MC_HALF, t._normalizedBounds.ne.lng = bU.WORLD_SIZE_MC_HALF)
                }
            }
        }), al.inherits(s, "Polygon"), x.extend(al.prototype, {
            setPoints: function(t) {
                var e = [];
                if ("string" == typeof t || t[0] instanceof e1 || this instanceof d8 || 0 === t.length) {
                    var i = this._processSinglePointArray(t);
                    this._userPoints = i.userPoints, e = i.innerPoints, this.hasMultipleParts = !1
                } else {
                    this._userPoints = [];
                    for (var n = 0; n < t.length; n++) {
                        var o = this._processSinglePointArray(t[n]);
                        this._userPoints.push(o.userPoints), e.push(o.innerPoints)
                    }
                    this.hasMultipleParts = !0
                }
                s.prototype.setPoints.call(this, e)
            },
            setPath: function(t) {
                this.setPoints(t)
            },
            _processSinglePointArray: function(t) {
                var e = s.getGraphPoints(t).slice(0);
                return innerPoints = e.slice(0), innerPoints.length > 1 && !innerPoints[0].equals(innerPoints[innerPoints.length - 1]) && innerPoints.push(new e1(innerPoints[0].lng, innerPoints[0].lat)), {
                    userPoints: e,
                    innerPoints: innerPoints
                }
            },
            setPointAt: function(t, e) {
                this._userPoints[t] && (this._userPoints[t] = new e1(e.lng, e.lat), this.points[t] = new e1(e.lng, e.lat), 0 !== t || this.points[0].equals(this.points[this.points.length - 1]) || (this.points[this.points.length - 1] = new e1(e.lng, e.lat)), this._calcBounds())
            },
            getPoints: function() {
                var t = this._userPoints;
                return 0 === t.length && (t = this.points), t
            },
            getPath: function() {
                return this.getPoints()
            }
        }), d8.parseTolerance = {
            0: [.01, 1e-4, 1e-5, 4e-6],
            1: [1e3, 10, 1, .4]
        }, d8.inherits(al, "Circle"), x.extend(d8.prototype, {
            initialize: function(t) {
                return this.map = t, this.points = this._getPerimeterPoints(this.point, this.radius), this._calcBounds(), null
            },
            getPoint: function() {
                return this.point
            },
            setPoint: function(t) {
                t && (this.point = t)
            },
            setCenter: function(t) {
                var e = arguments[1];
                this.setPoint(t, e)
            },
            setRadius: function(t) {
                this.radius = Math.abs(t)
            },
            getCenter: function() {
                return this.point
            },
            getRadius: function() {
                return this.radius
            },
            _getPerimeterPoints: function(t, e) {
                if (!t || !e || !this.map) return [];
                var i = (this.map, t.lng),
                    n = t.lat,
                    o = cP.convertMC2LL(t);
                i = o.lng, n = o.lat;
                for (var a = [], r = e / cP.EARTHRADIUS, s = Math.PI / 180 * n, l = Math.PI / 180 * i, h = 0; 360 > h; h += 9) {
                    var c = Math.PI / 180 * h,
                        u = Math.asin(Math.sin(s) * Math.cos(r) + Math.cos(s) * Math.sin(r) * Math.cos(c)),
                        d = Math.atan2(Math.sin(c) * Math.sin(r) * Math.cos(s), Math.cos(r) - Math.sin(s) * Math.sin(u)),
                        f = (l - d + Math.PI) % (2 * Math.PI) - Math.PI,
                        p = new bR(u * (180 / Math.PI), f * (180 / Math.PI));
                    a.push(cP.convertLL2MC(p))
                }
                var m = a[0];
                return a.push(new e1(m.lng, m.lat)), this._radiusMercator = m ? Math.sqrt(Math.pow(m.lng - this.point.lng, 2) + Math.pow(m.lat - this.point.lat, 2)) : this.radius, a
            }
        });
        var aS = {};
        fc.inherits(x.BaseClass, "SimpleInfoWindow"), x.extend(fc.prototype, {
            setWidth: function(t) {
                t = 1 * t, !t && 0 != t || isNaN(t) || 0 > t || (0 != t && (50 > t && (t = 50), t > 730 && (t = 730)), this._config.width = t)
            },
            setHeight: function(t) {
                t = 1 * t, t -= 10, !t && 0 != t || isNaN(t) || 0 > t || (0 != t && (50 > t && (t = 50), t > 650 && (t = 650)), this._config.height = t)
            },
            setMaxWidth: function(t) {
                t = 1 * t, !t && 0 != t || isNaN(t) || 0 > t || (0 != t && (50 > t && (t = 50), t > 730 && (t = 730)), this._config.maxWidth = t)
            },
            setTitle: function(t) {
                this._config.title = t || ""
            },
            setContent: function(t) {
                this.content = t || ""
            },
            setMaxContent: function(t) {
                this._config.maxContent = t || ""
            },
            redraw: function() {},
            enableAutoPan: function() {
                this._config.enableAutoPan = !0
            },
            disableAutoPan: function() {
                this._config.enableAutoPan = !1
            },
            enableCloseOnClick: function() {
                this._config.enableCloseOnClick = !0
            },
            disableCloseOnClick: function() {
                this._config.enableCloseOnClick = !1
            },
            enableMaximize: function() {
                this._config.enableMaximize = !0
            },
            disableMaximize: function() {
                this._config.enableMaximize = !1
            },
            show: function() {
                this._visible = !0
            },
            hide: function() {
                this._visible = !1
            },
            close: function() {
                this.hide()
            },
            dispose: function() {
                x.BaseClass.prototype.decontrol.call(this)
            },
            maximize: function() {
                this.isWinMax = !0
            },
            restore: function() {
                this.isWinMax = !1
            },
            setConfig: function(t) {
                if (t)
                    for (var e in t) typeof this._config[e] == typeof t[e] && (this._config[e] = t[e])
            },
            isVisible: function() {
                return this.isOpen()
            },
            isOpen: function() {
                return !1
            },
            getPoint: function() {
                return this.overlay && this.overlay.getPoint ? this.overlay.getPoint() : void 0
            },
            getOffset: function() {
                return this._config.offset
            },
            dispose: function() {
                x.BaseClass.prototype.decontrol.call(this)
            },
            toString: function() {
                return "SimpleInfoWindow"
            }
        }), bU.prototype.openSimpleInfoWindow = function(t, e) {
            if (t && "SimpleInfoWindow" == t.toString() && e && "Point" == e.toString()) {
                var i = this.temp;
                if (i.marker) i.marker.setPoint(e);
                else {
                    var n = new eO(dm.imgPath + "blank.gif", {
                        width: 1,
                        height: 1
                    });
                    i.marker = new b8(e, {
                        icon: n,
                        width: 1,
                        height: 1,
                        offset: new cF(0, 0),
                        infoWindowOffset: new cF(0, 0),
                        clickable: !1
                    }), i.marker._fromMap = 1
                }
                this.addOverlay(i.marker), i.marker.show(), i.marker.openSimpleInfoWindow(t)
            }
        }, bU.prototype.closeSimpleInfoWindow = function() {
            var t = this.temp.infoWin || this.temp._infoWin;
            t && t.overlay && t.overlay.closeSimpleInfoWindow()
        }, bJ.prototype.openSimpleInfoWindow = function(t) {
            this.map && (this.map.closeSimpleInfoWindow(), t._visible = !0, this.map.temp._infoWin = t, t.overlay = this, x.BaseClass.call(t, t.hashCode))
        }, bJ.prototype.closeSimpleInfoWindow = function() {
            this.map && this.map.temp._infoWin && (this.map.temp._infoWin._visible = !1, this.map.temp._infoWin.decontrol(), this.map.temp._infoWin = null)
        }, cN.prototype.equals = function(t) {
            return t ? t.x === this.x && t.y === this.y : !1
        }, cN.prototype.clone = function() {
            return new cN(this.x, this.y)
        }, cN.prototype.toString = function() {
            return "Pixel"
        }, cF.prototype.equals = function(t) {
            return !(!t || this.width !== t.width || this.height !== t.height)
        }, cF.prototype.toString = function() {
            return "Size"
        };
        var aY = {
                B_NORMAL_MAP: {
                    tileUrls: cS(dm.tileDomain, dm.rasterTilePath),
                    vectorTileUrls: cS(dm.tileDomain, dm.vectorTilePath),
                    tileSize: 256,
                    baseUnits: 256,
                    zoomLevelMin: 3,
                    zoomLevelMax: 19,
                    minDataZoom: 3,
                    maxDataZoom: 19,
                    minZoom: 3,
                    maxZoom: 19,
                    webgl: {
                        minZoom: 3,
                        maxZoom: 21
                    },
                    zoomLevelBase: 18,
                    errorUrl: dm.imgPath + "bg.png",
                    bounds: new cv(new e1(-21364736, -11708041.66), new e1(23855104, 12474104.17)),
                    imgExtend: "png"
                },
                B_SATELLITE_MAP: {
                    tileUrls: ["https://maponline0.bdimg.com/starpic/?qt=satepc&", "https://maponline1.bdimg.com/starpic/?qt=satepc&", "https://maponline2.bdimg.com/starpic/?qt=satepc&", "https://maponline3.bdimg.com/starpic/?qt=satepc&"],
                    tileSize: 256,
                    baseUnits: 256,
                    zoomLevelMin: 3,
                    zoomLevelMax: 19,
                    minDataZoom: 3,
                    maxDataZoom: 19,
                    minZoom: 3,
                    maxZoom: 19,
                    zoomLevelBase: 18,
                    errorUrl: dm.imgPath + "bg.png",
                    bounds: new cv(new e1(-21364736, -10616832), new e1(23855104, 15859712)),
                    imgExtend: "png"
                },
                B_STREET_MAP: {
                    tileUrls: cS(dm.tileDomain, dm.rasterTilePath),
                    tileSize: 256,
                    baseUnits: 256,
                    zoomLevelMin: 3,
                    zoomLevelMax: 19,
                    minDataZoom: 3,
                    maxDataZoom: 19,
                    minZoom: 3,
                    maxZoom: 19,
                    zoomLevelBase: 18,
                    errorUrl: dm.imgPath + "bg.png",
                    bounds: new cv(new e1(-21364736, -10616832), new e1(23855104, 15859712)),
                    imgExtend: "png"
                },
                BMAP_CUSTOM_LAYER: {
                    tileUrls: [""],
                    tileSize: 256,
                    baseUnits: 256,
                    zoomLevelMin: 1,
                    zoomLevelMax: 19,
                    minDataZoom: 3,
                    maxDataZoom: 19,
                    minZoom: 3,
                    maxZoom: 19,
                    zoomLevelBase: 18,
                    errorUrl: dm.imgPath + "blank.gif",
                    bounds: new cv(new e1(-21364736, -10616832), new e1(23855104, 15859712)),
                    imgExtend: "png"
                },
                B_EARTH_MAP: {
                    tileUrls: [""],
                    tileSize: 256,
                    baseUnits: 256,
                    zoomLevelMin: 3,
                    zoomLevelMax: 19,
                    minDataZoom: 3,
                    maxDataZoom: 19,
                    minZoom: 3,
                    maxZoom: 19,
                    webgl: {
                        minZoom: 3,
                        maxZoom: 21
                    },
                    zoomLevelBase: 18,
                    errorUrl: dm.imgPath + "blank.gif",
                    bounds: new cv(new e1(-21364736, -10616832), new e1(23855104, 15859712)),
                    imgExtend: "png"
                },
                B_MARS_MAP: {
                    tileUrls: ["//webmap0.bdimg.com/image/api/tiles/mars/", "//webmap1.bdimg.com/image/api/tiles/mars/"],
                    tileSize: 512,
                    baseUnits: 256,
                    zoomLevelMin: 2,
                    zoomLevelMax: 6,
                    minDataZoom: 3,
                    maxDataZoom: 5,
                    minZoom: 2,
                    maxZoom: 6,
                    webgl: {
                        minZoom: 2,
                        maxZoom: 6
                    },
                    zoomLevelBase: 18,
                    backgroundColor: [192, 86, 62],
                    errorUrl: dm.imgPath + "blank.gif",
                    bounds: new cv(new e1(-21364736, -10616832), new e1(23855104, 15859712)),
                    imgExtend: "png"
                },
                B_MOON_MAP: {
                    tileUrls: ["//webmap0.bdimg.com/image/api/tiles/moon/", "//webmap1.bdimg.com/image/api/tiles/moon/"],
                    tileSize: 512,
                    baseUnits: 256,
                    zoomLevelMin: 2,
                    zoomLevelMax: 6,
                    minDataZoom: 3,
                    maxDataZoom: 5,
                    minZoom: 2,
                    maxZoom: 6,
                    webgl: {
                        minZoom: 2,
                        maxZoom: 6
                    },
                    zoomLevelBase: 18,
                    backgroundColor: [86, 86, 86],
                    errorUrl: dm.imgPath + "blank.gif",
                    bounds: new cv(new e1(-21364736, -10616832), new e1(23855104, 15859712)),
                    imgExtend: "png"
                }
            },
            be = aY;
        a5.prototype._addLoadCbk = function(t) {
            this._cbks.push(t)
        }, a5.prototype._load = function() {
            this.img.src = FeBrowser.ie <= 6 && FeBrowser.ie > 0 && this._transparentPng ? dm.imgPath + "blank.gif" : this.src
        }, a5.prototype._callCbks = function() {
            for (var t = this, e = 0; e < t._cbks.length; e++) t._cbks[e]();
            t._cbks.length = 0
        };
        var L = !x.Browser.ie || x.Browser.ie > 8;
        aI.register(function(t) {
            if ("webgl" !== t._renderType) {
                var e = t.tileMgr = new du(t);
                t.addEventListener("mousewheel", function(t) {
                    e.mouseWheel(t)
                }), t.addEventListener("dblclick", function(t) {
                    e.dblClick(t)
                }), t.addEventListener("rightdblclick", function(t) {
                    e.dblClick(t)
                }), t.addEventListener("minuspress", function(t) {
                    e.keypress(t)
                }), t.addEventListener("pluspress", function(t) {
                    e.keypress(t)
                }), t.addEventListener("load", function() {
                    this.isGlobeMapType() || e.loadTiles()
                }), t.addEventListener("zoomstartcode", function(t) {
                    this.isGlobeMapType() || e._zoom(t)
                }), t.addEventListener("moving", function() {
                    this.isGlobeMapType() || e.moveGridTiles()
                }), t.addEventListener("resize", function(t) {
                    this.isGlobeMapType() || e.resizeMap(t)
                }), t.addEventListener("addtilelayer", function(t) {
                    e.addTileLayer(t)
                }), t.addEventListener("removetilelayer", function(t) {
                    e.removeTileLayer(t)
                })
            }
        }), x.extend(du.prototype, {
            addTileLayer: function(t) {
                var e = this,
                    i = t.target;
                e.tileLayers.push(i), e.map.loaded && e.moveGridTiles()
            },
            removeTileLayer: function(t) {
                var e = this,
                    i = t.target,
                    n = i.mapType,
                    o = e.mapTiles,
                    a = e.bufferTiles;
                for (var r in a) {
                    var s = r.split("-")[1];
                    s == n && delete a[r]
                }
                for (var r in o) {
                    var s = r.split("-")[1];
                    s == n && delete o[r]
                }
                e.zoomsDiv && e.zoomsDiv.parentNode && (e.zoomsDiv.parentNode.removeChild(e.zoomsDiv), e.zoomsDiv.innerHTML = "");
                var l = e.map;
                if (l.deepZoom) {
                    var h = l.deepZoom.preDeepZoomDiv;
                    h && h.parentNode && h.parentNode.removeChild(h)
                }
                for (var c = 0, u = e.tileLayers.length; u > c; c++) i == e.tileLayers[c] && e.tileLayers.splice(c, 1);
                e.moveGridTiles()
            },
            hideDeepZoomDiv: function() {
                var t = this,
                    e = t.map;
                if (e.deepZoom) {
                    var i = e.deepZoom.preDeepZoomDiv;
                    i && "none" != i.style.display && (i.style.display = "none")
                }
            },
            getTileLayer: function(t) {
                for (var e = this, i = 0, n = e.tileLayers.length; n > i; i++)
                    if (tilelayer = e.tileLayers[i], tilelayer.mapType == t) return tilelayer;
                return null
            },
            _zoom: function() {
                var t = this;
                t.zoomsDiv && "none" != t.zoomsDiv.style.display && (t.zoomsDiv.style.display = "none"), t.hideDeepZoomDiv(), t.moveGridTiles()
            },
            resizeMap: function() {
                this.loaded = !1, this.moveGridTiles()
            },
            _checkTilesLoaded: function() {
                this.numLoading--;
                var t = this;
                0 == this.numLoading && (this._checkLoadedTimer && (clearTimeout(this._checkLoadedTimer), this._checkLoadedTimer = null), this._checkLoadedTimer = setTimeout(function() {
                    0 == t.numLoading && t.map.dispatchEvent(new aB("ontilesloaded")), t._checkLoadedTimer = null
                }, 80))
            },
            getTileName: function(t, e, i) {
                var n = e.mapType,
                    o = "TILE-" + n + "-" + i + "-" + t[0] + "-" + t[1] + "-" + t[2];
                return o
            },
            hideTile: function(t, e) {
                var i = t.img;
                eP(i) && (t.loaded && this.imgNumber--, i.parentNode && (dD(i), i.parentNode.removeChild(i)));
                var n = new aB("onimagechange");
                n.tile = this.getTileName(t.info, e, this.map.config.style), n.action = "hide", delete this.mapTiles[t.name], t.loaded || (dD(i), t._callCbks(), i = null, t.img = null, t.mgr = null), this.map.dispatchEvent(n)
            },
            loadTiles: function() {
                var t = this;
                if (x.Browser.ie) try {
                    document.execCommand("BackgroundImageCache", !1, !0)
                } catch (e) {}
                this.zoomsDiv && "none" != this.zoomsDiv.style.display && (this.zoomsDiv.style.display = "none"), t.hideDeepZoomDiv(), t.moveGridTiles()
            },
            getCell: function(t, e) {
                var i = this.baseUnits * Math.pow(2, this.baseZoomLevel - e),
                    n = parseInt(t.lng / i),
                    o = parseInt(t.lat / i);
                return [n, o, i * (n + .5), i * (o + .5)]
            },
            moveGridTiles: function() {
                var t = this.map,
                    e = t.getMapType(),
                    i = this.tileLayers.length,
                    n = t.centerPoint;
                e !== BMAP_SATELLITE_MAP && (n = cC.calcLoopCenterPoint(n));
                for (var o = t.width, a = t.getZoomUnits(), r = a * o, s = n.lng - r / 2, l = n.lng + r / 2, h = cC.isAddWidth(s, l), c = 0; i > c; c++) {
                    var u = this.tileLayers[c];
                    (u.baseLayer || 1 == i) && (this.tilesDiv = u.tilesDiv);
                    for (var d = be[u.mapType], f = t.zoomLevel, p = t.getZoomUnits(t.zoomLevel), m = d.baseUnits * Math.pow(2, d.zoomLevelBase - f), g = Math.floor(n.lng / m), _ = Math.floor(n.lat / m), v = d.tileSize, y = [g, _, (n.lng - g * m) / m * v, (n.lat - _ * m) / m * v], b = h ? t.width / 2 * 1.5 : t.width / 2, w = y[0] - Math.ceil((b - y[2]) / v), x = y[1] - Math.ceil((t.height / 2 - y[3]) / v), T = y[0] + Math.ceil((b + y[2]) / v), M = y[1] + Math.ceil((t.height / 2 + y[3]) / v), L = [], C = w; T > C; C++)
                        for (var I = x; M > I; I++) {
                            L.push([C, I]);
                            var S = "id_" + C + "_" + I + "_" + f;
                            L[S] = !0
                        }
                    u.mapType !== BMAP_SATELLITE_MAP && (L = cC.calcLoopTiles(L, f)), L.sort(function(t) {
                        return function(e, i) {
                            return .4 * Math.abs(e[0] - t[0]) + .6 * Math.abs(e[1] - t[1]) - (.4 * Math.abs(i[0] - t[0]) + .6 * Math.abs(i[1] - t[1]))
                        }
                    }([y[0], y[1]]));
                    var D = this.mapTiles,
                        P = -n.lng / p,
                        z = n.lat / p,
                        A = [P, z];
                    for (var k in D) {
                        var B = D[k],
                            E = B.info;
                        if (E) {
                            var S = "id_" + E[0] + "_" + E[1] + "_" + E[2];
                            L[S] || this.hideTile(B, u)
                        }
                    }
                    var O = -t.offsetX + t.width / 2,
                        R = -t.offsetY + t.height / 2;
                    u.tilesDiv.style.left = Math.round(P + O) - A[0] + "px", u.tilesDiv.style.top = Math.round(z + R) - A[1] + "px", this.numLoading += L.length;
                    for (var C = 0, Z = L.length; Z > C; C++) this.showTile([L[C][0], L[C][1], t.zoomLevel], A, u, C, t.config.style)
                }
            },
            showTile: function(t, e, i) {
                this.centerPos = e;
                var n = be[i.mapType],
                    o = this.map.config.style,
                    a = this.getTileName(t, i, o),
                    r = t[0] * n.tileSize + e[0],
                    s = (-1 - t[1]) * n.tileSize + e[1],
                    l = [r, s],
                    h = null;
                if (i.mapType !== BMAP_SATELLITE_MAP) {
                    h = cC.calcLoopParam(t[0], t[2]);
                    var c = h.offsetX;
                    l[0] += c, l._offsetX = c
                }
                var u = this,
                    d = this.mapTiles[a];
                if (d) return d.img.style.left = l[0] + "px", d.img.style.top = l[1] + "px", void(d.loaded ? this._checkTilesLoaded() : d._addLoadCbk(function() {
                    u._checkTilesLoaded()
                }));
                if (d = this.bufferTiles[a]) {
                    this.imgNumber++, i.tilesDiv.insertBefore(d.img, i.tilesDiv.lastChild), this.mapTiles[a] = d, d.img.style.left = l[0] + "px", d.img.style.top = l[1] + "px", d.loaded ? this._checkTilesLoaded() : d._addLoadCbk(function() {
                        u._checkTilesLoaded()
                    });
                    var f = new aB("onimagechange");
                    f.action = "cache", f.tile = this.getTileName(t, i, o), this.map.dispatchEvent(f)
                } else {
                    var p = new cN(t[0], t[1]);
                    h && (p.x = h.col);
                    var m = i.getTilesUrl(p, t[2]);
                    d = new a5(this, m, l, t, i), d._addLoadCbk(function() {
                        u._checkTilesLoaded()
                    }), d._load(), this.mapTiles[a] = d, aP(this.map)
                }
            },
            mouseWheel: function(t) {
                var e = this.map;
                if (e.config.enableWheelZoom) {
                    var i = e.zoomLevel + (t.trend === !0 ? 1 : -1),
                        n = e._getProperZoom(i);
                    if (n.exceeded) {
                        var o = new aB("onzoomexceeded");
                        return o.targetZoom = i, void e.dispatchEvent(o)
                    }
                    e.dispatchEvent(new aB("onzoomstart")), e.lastLevel = e.zoomLevel, e.zoomLevel = n.zoom;
                    var a = t.pixel,
                        r = e.pixelToPoint(a, {
                            zoom: e.lastLevel
                        }),
                        s = e.getZoomUnits(e.zoomLevel);
                    e.centerPoint = new e1(r.lng + s * (e.width / 2 - a.x), r.lat - s * (e.height / 2 - a.y)), this.zoom(a)
                }
            },
            dblClick: function(t) {
                var e = this.map;
                e.config.enableDblclickZoom && (e.isGlobeMapType() || e.currentOperation !== cx.dragging && ("onrightdblclick" == t.type ? e.zoomOut(t.point) : e.zoomIn(t.point)))
            },
            keypress: function(t) {
                var e = this.map;
                e.isGlobeMapType() || ("onpluspress" == t.type ? e.zoomIn() : e.zoomOut())
            }
        }), bG.inherits(cI, "TileLayer"), x.extend(bG.prototype, {
            isTransparentPng: function() {
                return this.transparentPng
            },
            getTilesUrl: function(t, e) {
                var i = be[this.mapType];
                if ("object" != typeof i) return null;
                var n = t.x,
                    o = t.y;
                if (this.mapType !== BMAP_SATELLITE_MAP) var o = cC.calcLoopParam(o, e).col;
                var a = "";
                if (this.opts.tileUrlTemplate) a = this.opts.tileUrlTemplate, a = a.replace(/\{X\}/, o), a = a.replace(/\{Y\}/, n), a = a.replace(/\{Z\}/, e);
                else {
                    if (this.mapType === BMAP_NORMAL_MAP) {
                        var r = this.isCanvasMap ? 0 : 1,
                            s = i.tileUrls[Math.abs(o + n) % i.tileUrls.length];
                        window.offLineIPAddress && (s = window.offLineIPAddress + "tile5/");
                        var l = this.map.getMapStyleId();
                        a = s + "?qt=vtile&x=" + n + "&y=" + o + "&z=" + e + (dm.mapStyleNameIdPair[l] ? "&styleId=" + dm.mapStyleNameIdPair[l] : "") + "&styles=pl&udt=" + this.normalUdt + "&scaler=" + this.scaler + "&showtext=" + r, a = a.replace(/-(\d+)/gi, "M$1")
                    }
                    if (this.mapType === BMAP_SATELLITE_MAP) {
                        var h = ad("ditu", "satellite"),
                            c = h.ver,
                            u = h.udt;
                        a = i.tileUrls[Math.abs(o + n) % i.tileUrls.length] + "u=x=" + n + ";y=" + o + ";z=" + e + ";v=" + c + ";type=sate&fm=46&udt=" + u, a = a.replace(/-(\d+)/gi, "M$1")
                    }
                }
                return a
            },
            initialize: function(t) {
                if (this.map = t, "webgl" === t._renderType) {
                    var e = null;
                    this.customLayer !== !1 && (e = this.getTilesUrl), x.extend(this, dU), this.labelProcessor = new b4(this), this.callbackDataQueue = [], e && (this.getTilesUrl = e);
                    var i = this;
                    t.on("indoor_data_refresh", function(t) {
                        i.baseLayer && i._refreshIndoorData(t.uid, t.floor)
                    }), t.on("custom_labels_ready", function(t) {
                        i.baseLayer && (i.clearAllCollisionsCache(), i._doWorkAfterLabelImageLoad(t.virtualTile, t.labelCanvas, null, t.imgKey))
                    }), t.on("glmoduleloaded", function() {
                        i.baseLayer && i.updateAllIconsTextureCoords()
                    })
                }
                t.temp.layerZIndex || (t.temp.layerZIndex = 0), this.zIndex = this.zIndex || 0, this.baseLayer && (this.zIndex = 0), t.temp.layid || (t.temp.layid = 0), this.opts.mapType ? this.mapType = this.opts.mapType : (this.mapType = "BMAP_CUSTOM_LAYER_" + t.temp.layid, t.temp.layid++);
                var n = be[this.mapType];
                if (n || (be[this.mapType] = {
                        tileUrls: [],
                        tileSize: 256,
                        baseUnits: 256,
                        zoomLevelMin: 1,
                        zoomLevelMax: 19,
                        minZoom: 3,
                        maxZoom: 19,
                        minDataZoom: 3,
                        maxDataZoom: 19,
                        zoomLevelBase: 18,
                        errorUrl: dm.imgPath + "/blank.gif",
                        bounds: new cv(new e1(-21364736, -10616832), new e1(23855104, 15859712)),
                        imgExtend: "png"
                    }), "webgl" !== t._renderType) {
                    var o = co(t.platform, '<div style="position:absolute;z-index:' + this.zIndex + '"></div>');
                    o.style.display = "", o.style.left = Math.ceil(-t.offsetX + t.width / 2) + "px", o.style.top = Math.ceil(-t.offsetY + t.height / 2) + "px", this.tilesDiv = o
                }
                this.isCanvasMap = t.isCanvasMap(), this.lastZoom = t.getZoom()
            },
            remove: function() {
                this.tilesDiv && this.tilesDiv.parentNode && (this.tilesDiv.innerHTML = "", this.tilesDiv.parentNode.removeChild(this.tilesDiv)), delete this.tilesDiv
            },
            getCopyright: function() {
                return this.copyright
            },
            getMapType: function() {
                return this.mapType
            },
            setZIndex: function(t) {
                this.zIndex = t, this.tilesDiv && (this.tilesDiv.style.zIndex = t)
            }
        }), bS.inherits(cI, "Copyright");
        var ek = {
            get: function(t) {
                return ek.singleton || (ek.singleton = new R(t)), ek.singleton
            }
        };
        x.extend(R.prototype, {
            prepareLayer: function() {
                var t = this._map,
                    e = this._tileMgr;
                this._canvas2dMapMgr = t.canvas2dMapMgr;
                var i = this._baseLayerDiv = e.tilesDiv;
                if (!this._animationDiv) {
                    var n = this._preAnimationDiv;
                    n && (n.parentNode && n.parentNode.removeChild(n), this._preAnimationDiv = null), this._preAnimationDiv = this._animationDiv = i.cloneNode(!0), t.platform.insertBefore(this._animationDiv, t.platform.firstChild)
                }
                this.show()
            },
            prepareAniParam: function() {
                var t = this._animationDiv;
                if (t) {
                    var e, i = t.children.length;
                    this._zoomAniInfo = [];
                    for (var n = i - 1; n > -1; n--) {
                        var o = {};
                        e = t.children[n].style, o.top = parseInt(e.top, 10), o.left = parseInt(e.left, 10), this._zoomAniInfo[n] = o
                    }
                }
            },
            prepareLabelLayer: function() {
                var t = this._map;
                if (this._enableCanvas2dMap && t.canvas2dMapMgr) {
                    this.touchZoomLabelCanvas && this.touchZoomLabelCanvas.parentNode.removeChild(this.touchZoomLabelCanvas);
                    var e = t.canvas2dMapMgr._labelCanvas;
                    this.touchZoomLabelCanvas = e.cloneNode(!1);
                    var i = this.touchZoomLabelCanvas.getContext("2d");
                    i.drawImage(e, 0, 0), t.platform.insertBefore(this.touchZoomLabelCanvas, t.platform.firstChild);
                    var n = parseInt(e.style.left, 10),
                        o = parseInt(e.style.top, 10);
                    this.touchZoomLabelCanvas.style.zIndex = 9, this.touchZoomLabelCanvas.style[this._transformOriginStyleName] = this._fixPosition.x - (t.offsetX + n) + "px " + (this._fixPosition.y - (t.offsetY + o)) + "px", e.style.visibility = "hidden"
                }
            },
            show: function() {
                this._animationDiv && (this._animationDiv.style.visibility = "")
            },
            showLabel: function() {
                var t = this._map;
                if (this._enableCanvas2dMap && t.canvas2dMapMgr) {
                    var e = t.canvas2dMapMgr._labelCanvas;
                    e && (e.style.visibility = ""), this.touchZoomLabelCanvas && (this.touchZoomLabelCanvas.style.zIndex = -2, this.touchZoomLabelCanvas.style.visibility = "hidden")
                }
            },
            hide: function() {
                this._animationDiv && (this._animationDiv.style.visibility = "hidden"), this._preAnimationDiv && (this._preAnimationDiv.style.visibility = "hidden")
            },
            hideNonAnimationLayers: function() {
                var t = this._map;
                "dom" === t.getRenderType() && (t.overlayDiv && (t.overlayDiv.style.visibility = "hidden"), t.overlayDivEx && (t.overlayDivEx.style.visibility = "hidden"));
                for (var e, i = t.tileMgr.tileLayers, n = 0, o = i.length; o > n; n++) e = i[n], e.tilesDiv.style.visibility = "hidden"
            },
            showNonAnimationLayers: function() {
                var t = this._map;
                "dom" === t.getRenderType() && (t.overlayDiv && (t.overlayDiv.style.visibility = ""), t.overlayDivEx && (t.overlayDivEx.style.visibility = ""));
                for (var e, i = t.tileMgr.tileLayers, n = 0, o = i.length; o > n; n++) e = i[n], e.tilesDiv.style.visibility = ""
            },
            setFixPosition: function(t) {
                this._fixPosition = t
            },
            setZoom: function(t, e) {
                var i = this._fixPosition,
                    n = this._map,
                    o = this._baseLayerDiv,
                    a = {
                        x: i.x - parseInt(o.style.left, 10) - n.offsetX,
                        y: i.y - parseInt(o.style.top, 10) - n.offsetY
                    },
                    r = this._animationDiv;
                if (r) {
                    for (var s, l, h, c = r.children.length, u = this._transformStyleName, d = (this._transformOriginStyleName, this), f = c - 1; f > -1; f--) {
                        var p = this._zoomAniInfo[f];
                        s = r.children[f].style;
                        var m = p.left - a.x,
                            g = p.top - a.y;
                        p.dx = m * t - m, p.dy = g * t - g, p.preDx = m - m, p.preDy = g - g, l = p.preDx + (p.dx - p.preDx), h = p.preDy + (p.dy - p.preDy) + e, s.left = p.left + l + "px", s.top = p.top + h + "px", s.width = s.height = 256 * t + "px"
                    }
                    if (this._enableCanvas2dMap) {
                        var _ = d._isIE9 ? "translate(0px, " + e + "px) scale(" + t + ")" : "translate3d(0px, " + e + "px, 0) scale(" + t + ")";
                        this.touchZoomLabelCanvas.style[u] = _
                    }
                }
            },
            setZoomFinish: function() {
                this._animationDiv = null
            },
            startAnimation: function(t) {
                this.prepareLayer(), this.hideNonAnimationLayers();
                var e = this._map;
                this.touchZoomLabelCanvas && (this.touchZoomLabelCanvas.style.display = "none"), t = t || {};
                var i = t.zoomCount || 0,
                    n = t.fixPosition,
                    o = (t.fixMCPosition, t.pixOffset);
                this._zoomCount = i;
                for (var a = e.getZoom(), r = a + i, s = e.config.enableContinuousZoom, h = .5, c = 5, u = Math.pow(2, i), d = this._baseLayerDiv, f = {
                        x: n.x - parseInt(d.style.left, 10) - e.offsetX,
                        y: n.y - parseInt(d.style.top, 10) - e.offsetY
                    }, p = this._animationDiv, m = p.children.length, g = this._preZoomTimes, _ = [], v = (this._transformStyleName, this._transformOriginStyleName, m - 1); v > -1; v--) {
                    var y = {},
                        b = p.children[v].style;
                    y.top = parseInt(b.top, 10), y.left = parseInt(b.left, 10);
                    var w = y.left - f.x,
                        x = y.top - f.y;
                    y.dx = w * u - w, y.dy = x * u - x, y.preDx = w * g - w, y.preDy = x * g - x, _[v] = y
                }
                var T, M, L, C = this;
                return this._zoomAni = new l({
                    fps: 60,
                    duration: s ? 500 : 1,
                    transition: function(t) {
                        return t = t * c / (2 * h), c * t - h * t * t
                    },
                    render: function(s) {
                        s = 4 * s * h / (c * c), T = g + s * (u - g);
                        var l = a + cZ(T),
                            d = null,
                            f = 0,
                            m = 0;
                        if (t.onAnimationBeforeLooping) {
                            var v = t.onAnimationBeforeLooping(s, l);
                            d = v.loopingCenter, f = v.yDiff, m = v.totalYDiff
                        }
                        for (var y = _.length - 1; y > -1; y--) {
                            var b = _[y];
                            if (p.children[y]) {
                                var w = p.children[y].style;
                                M = b.preDx + (b.dx - b.preDx) * s - o.width * s, L = b.preDy + (b.dy - b.preDy) * s - o.height * s + f, w.left = b.left + M + "px", w.top = b.top + L + "px", w.height = w.width = 256 * T + "px"
                            }
                        }
                        var x = o.width * s,
                            I = o.height * s;
                        e.isRestrict ? C._enableCanvas2dMap && C._canvas2dMapMgr.clearLabel() : C._enableCanvas2dMap && C._canvas2dMapMgr.drawLabel(T, n, a, r, i, s, x, I, m, f), C._preZoomTimes = T, C._preRenderTick = s, t.onAnimationLooping && t.onAnimationLooping(s, l, d)
                    },
                    finish: function() {
                        C._preZoomTimes = 1, C._zoomAni = null, C._animationDiv = null, t.onAnimationFinish && t.onAnimationFinish(), C.showNonAnimationLayers()
                    }
                }), this._zoomAni
            },
            stopAnimation: function() {
                this._zoomAni && (this._zoomAni.stop(), this._zoomAni = null)
            }
        }), x.extend(c.prototype, {
            _initVars: function(t) {
                this._map = t._map, this._canvas2dMapMgr = t, this._labelCtx = t._labelCtx, this.ratio = this._map.config.ratio, this.sizeRatio = this.ratio > 1 ? 2 : 1, this.RANK1 = 1e6, this.RANK2 = 2e6, this.RANK3 = 3e6, this.RANK4 = 4e6, this.RANK5 = 5e6
            },
            _initColorCanvas: function() {
                var t = 256,
                    e = H("canvas"),
                    i = e.style;
                i.width = t + "px", i.height = t + "px", e.width = t, e.height = t, this._colorCvsSize = t, this._colorCvs = e, this._colorCtx = e.getContext("2d")
            },
            getLabelImageData: function(t) {
                var e = t.textImg,
                    i = t.textPos,
                    n = this.ratio,
                    o = this.sizeRatio / n,
                    a = this._colorCtx,
                    r = this._colorCvsSize;
                a.clearRect(0, 0, r, r);
                for (var s = 0, l = 0, h = 0, c = 0; c < i.length; c++) i[c].width > s && (s = i[c].width, l = c, h = i[c].drawX);
                s /= o;
                for (var u = 0, c = 0, d = i.length; d > c; c++) {
                    var f, p = i[c];
                    f = c === l ? 0 : p.drawX - h, a.drawImage(e, p.srcX, p.srcY, p.width, p.height, f, u, p.width / o, p.height / o), p.width / o > s && (s = p.width / o), u += p.height / o + 2 * n
                }
                var m = a.getImageData(0, 0, s, u),
                    g = a.getImageData(0, 0, s, u);
                return [m, g]
            },
            _bindEvent: function(t) {
                var e = this,
                    i = t._map;
                i.addEventListener("onspotmouseover", function(t) {
                    if (this.isCanvasMap() && this.temp.isPermitSpotOver && t.spots.length > 0) {
                        var i = t.spots[0].userdata.uid,
                            n = t.spots[0].userdata.name,
                            o = e.findLabelByUid(i, n);
                        o && e._toHighLightColor(o)
                    }
                }), i.addEventListener("onspotmouseout", function(t) {
                    if (this.isCanvasMap() && this.temp.isPermitSpotOver && t.spots.length > 0) {
                        var i = t.spots[0].userdata.uid,
                            n = t.spots[0].userdata.name,
                            o = e.findLabelByUid(i, n);
                        o && e._toDefaultColor(o)
                    }
                }), i.addEventListener("onspotclick", function(t) {
                    if (this.isCanvasMap() && this.temp.isPermitSpotOver)
                        if (t.spots && t.spots.length > 0) {
                            var i = t.spots[0].userdata.uid,
                                n = t.spots[0].userdata.name,
                                o = e.findLabelByUid(i, n);
                            o && e._changeBaseMapState(o)
                        } else e._recoverNormalState()
                }), i.on("spot_status_reset", function() {
                    e._recoverNormalState()
                }), i.on("spot_highlight", function(t) {
                    var i = e.findLabelByUid(t.uid);
                    i && e._changeBaseMapState(i)
                })
            },
            _getTextBound: function(t) {
                if (!t.textPos) return null;
                for (var e = this.ratio, i = this.sizeRatio / e, n = t.textPos, o = t.baseDrawX, a = t.baseDrawY, r = o * e + (n[0].drawX - o) / i, s = a * e + (n[0].drawY - a) / i, l = r + n[0].width / i, h = s + n[0].height / i, c = 0, u = n.length; u > c; c++) {
                    var d = n[c],
                        f = o * e + (d.drawX - o) / i;
                    r > f && (r = f);
                    var p = a * e + (d.drawY - a) / i;
                    s > p && (s = p), f + d.width > l && (l = f + d.width), p + d.height > h && (h = p + d.height)
                }
                return [r, s, l, h]
            },
            _toHighLightColor: function(t) {
                if (!t._tempRank || t._tempRank != this.RANK5) {
                    var e = this._getTextBound(t);
                    if (e) {
                        var i = Math.round(e[0]),
                            n = Math.round(e[1]),
                            o = this.getLabelImageData(t),
                            a = o[0],
                            r = o[1],
                            s = this._canvas2dMapMgr.getFilterImageData(a, this.RANK5);
                        t._oldImgData = r, this._labelCtx.putImageData(s, i, n)
                    }
                }
            },
            _toDefaultColor: function(t) {
                if ((!t._tempRank || t._tempRank != this.RANK5) && t._oldImgData) {
                    var e = (this.sizeRatio, this._getTextBound(t));
                    if (!e) return;
                    this._labelCtx.putImageData(t._oldImgData, Math.round(e[0]), Math.round(e[1])), t._oldImgData = null
                }
            },
            _changeBaseMapState: function(t) {
                var e = this._canvas2dMapMgr,
                    i = t.guid,
                    n = t.guidExt,
                    o = {
                        guid: i,
                        name: t.name,
                        guidExt: n
                    };
                e._labelStrategy.setStrategyInfo(o), e._loadData()
            },
            _recoverNormalState: function() {
                var t = this._canvas2dMapMgr;
                t._labelStrategy.setStrategyInfo(null), t._loadData()
            },
            findLabelByUid: function(t, e) {
                for (var i = this._canvas2dMapMgr, n = i._computedLabel, o = 0, a = n.length; a > o; o++) {
                    var r = n[o];
                    if (i.isClickableLabel(r)) {
                        if (t && r.guid === t) return r;
                        if (e && r.name === e) return r
                    }
                }
                return null
            }
        }), x.extend(cH.prototype, {
            _initVars: function(t) {
                this._map = t._map, this._canvas2dMapMgr = t, this.ratio = this._map.config.ratio, this._strategyInfo = null, this.RANK1 = 1e6, this.RANK2 = 2e6, this.RANK3 = 3e6, this.RANK4 = 4e6, this.RANK5 = 5e6
            },
            setStrategyInfo: function(t) {
                this._strategyInfo = t
            },
            preComputeLabel: function(t, e, i, n, o, a) {
                var r = [],
                    s = t._centerX,
                    l = t._centerY,
                    h = n * o,
                    c = this.ratio,
                    u = this._map.getZoom(),
                    d = 0;
                5 === u && (d = 4), 8 === u && (d = -6), t.sort(function(t, e) {
                    return t.x * t.y < e.x * e.y ? -1 : 1
                });
                for (var f = 0, p = t.length; p > f; f++)
                    for (var m = t[f], g = m.x, _ = m.y, v = m.z, y = cC.calcLoopParam(g, v).offsetX, b = g * h, w = (_ + 1) * h, x = (b - s) / n + e / 2 + y, T = (l - w) / n + i / 2, M = 0, L = m.length; L > M; M++) {
                        var C = m[M],
                            I = void 0,
                            S = void 0,
                            D = void 0,
                            P = void 0,
                            z = C.baseDrawX = x + C.baseX,
                            A = C.baseDrawY = T + C.baseY;
                        if ("fixed" == C.type) {
                            var k = C.iconPos,
                                B = C.textPos,
                                E = C.textImg;
                            if (k && (k.drawX = x + k.destX, k.drawY = T + k.destY, I = k.drawX, S = k.drawY, D = k.drawX + k.width, P = k.drawY + k.height), B && E)
                                for (var O = 0; O < B.length; O++) {
                                    var R = B[O];
                                    R.drawX = x + R.destX, R.drawY = T + R.destY, I ? (R.drawX < I && (I = R.drawX), R.drawY < S && (S = R.drawY), R.drawX + R.width > D && (D = R.drawX + R.width), R.drawY + R.height > P && (P = R.drawY + R.height)) : (I = R.drawX, S = R.drawY, D = R.drawX + R.width, P = R.drawY + R.height)
                                }
                        } else C.tileX = x, C.tileY = T, I = x + C.minXOriginal, S = T + C.minYOriginal, D = x + C.maxXOriginal, P = T + C.maxYOriginal;
                        if (void 0 != I) {
                            var Z = z + (I - z) / c,
                                N = A + (S - A) / c,
                                F = z + (D - z) / c,
                                U = A + (P - A) / c;
                            C.minX = Z, C.minY = N, C.maxX = F, C.maxY = U;
                            var H = (Z + F) / 2,
                                W = (N + U) / 2,
                                X = s + (H - e / 2) * n,
                                G = l + (i / 2 - W) * n;
                            C.geoX = X, C.geoY = G, r.push(C)
                        }
                    }
                if (a) {
                    for (var f = 0, p = a.length; p > f; f++) {
                        var Y = a[f],
                            V = Y[0],
                            q = Y[1],
                            k = V.iconPos,
                            j = k.geoX,
                            K = k.geoY,
                            z = (j - s) / n + e / 2,
                            A = (l - K) / n + i / 2,
                            I = z + k.destX,
                            S = A + k.destY,
                            D = I + k.width,
                            P = S + k.height;
                        V.textPos = V.textPos || V._textPos;
                        var B = V.textPos,
                            J = B[0],
                            Q = z + J.destX,
                            $ = A + J.destY;
                        if (S > $ && (S = $), Q + J.width > D && (D = Q + J.width), $ + J.height > P && (P = $ + J.height), 2 === B.length) {
                            var te = B[1],
                                ee = z + te.destX,
                                ie = A + te.destY;
                            S > ie && (S = ie), ee + te.width > D && (D = ee + te.width), ie + te.height > P && (P = ie + te.height)
                        }
                        V._tempBounds = [I, S, D, P];
                        var k = q.iconPos,
                            j = k.geoX,
                            K = k.geoY,
                            z = (j - s) / n + e / 2,
                            A = (l - K) / n + i / 2,
                            I = z + k.destX,
                            S = A + k.destY,
                            D = I + k.width,
                            P = S + k.height;
                        q.textPos = q.textPos || q._textPos;
                        var B = q.textPos,
                            J = B[0],
                            Q = z + J.destX,
                            $ = A + J.destY;
                        if (I > Q && (I = Q), S > $ && (S = $), $ + J.height > P && (P = $ + J.height), 2 === B.length) {
                            var te = B[1],
                                ee = z + te.destX,
                                ie = A + te.destY;
                            I > ee && (I = ee), S > ie && (S = ie), ie + te.height > P && (P = ie + te.height)
                        }
                        q._tempBounds = [I, S, D, P]
                    }
                    for (var f = 0, p = a.length; p > f; f++) {
                        var Y = a[f],
                            V = Y[0],
                            q = Y[1];
                        0 === f && q.textPos && (q._textPos = q.textPos, delete q.textPos);
                        var ne = V;
                        !V.textPos && q.textPos && (ne = q);
                        var oe = ne._tempBounds;
                        for (M = f + 1; p > M; M++) {
                            var ae = a[M],
                                re = ae[0],
                                se = ae[1],
                                le = 0,
                                he = re._tempBounds;
                            oe[2] < he[0] || oe[0] > he[2] || oe[3] < he[1] || oe[1] > he[3] || (le++, re.textPos && (re._textPos = re.textPos, delete re.textPos));
                            var he = se._tempBounds;
                            oe[2] < he[0] || oe[0] > he[2] || oe[3] < he[1] || oe[1] > he[3] || (le++, se.textPos && (se._textPos = se.textPos, delete se.textPos)), le >= 2 && ne.textPos && (ne._textPos = ne.textPos, delete ne.textPos)
                        }
                    }
                    for (var f = 0, p = a.length; p > f; f++) {
                        var Y = a[f],
                            V = Y[0],
                            q = Y[1],
                            ce = V;
                        !V.textPos && q.textPos && (ce = q);
                        var k = ce.iconPos,
                            j = k.geoX,
                            K = k.geoY,
                            z = ce.baseDrawX = (j - s) / n + e / 2,
                            A = ce.baseDrawY = (l - K) / n + i / 2;
                        k.drawX = z + k.destX, k.drawY = A + k.destY;
                        var I = k.drawX,
                            S = k.drawY,
                            D = k.drawX + k.width,
                            P = k.drawY + k.height,
                            B = ce.textPos;
                        if (B) {
                            var J = B[0];
                            if (J.drawX = z + J.destX, J.drawY = A + J.destY, J.drawX < I && (I = J.drawX), J.drawY < S && (S = J.drawY), J.drawX + J.width > D && (D = J.drawX + J.width), J.drawY + J.height > P && (P = J.drawY + J.height), 2 === B.length) {
                                var te = B[1];
                                te.drawX = z + te.destX, te.drawY = A + te.destY, te.drawX < I && (I = te.drawX), te.drawY < S && (S = te.drawY), te.drawX + te.width > D && (D = te.drawX + te.width), te.drawY + te.height > P && (P = te.drawY + te.height)
                            }
                        }
                        var Z = z + (I - z) / c,
                            N = A + (S - A) / c,
                            F = z + (D - z) / c,
                            U = A + (P - A) / c;
                        ce.minX = Z, ce.minY = N, ce.maxX = F, ce.maxY = U;
                        var ue = (Z + F) / 2,
                            de = (N + U) / 2,
                            fe = s + (ue - e / 2) * n,
                            pe = l + (i / 2 - de) * n;
                        ce.geoX = fe, ce.geoY = pe, r.push(ce)
                    }
                }
                var me = this._strategyInfo;
                if (me)
                    for (var ge = me.guid, _e = me.name, ve = me.guidExt, f = 0, p = r.length; p > f; f++) {
                        var ye = r[f];
                        delete ye._tempRank, this._canvas2dMapMgr.isClickableLabel(ye) && (1 !== ve || ye.guidExt) && (ge && ge === ye.guid || _e && _e === ye.name) && (ye._tempRank = this.RANK5)
                    } else
                        for (var f = 0, p = r.length; p > f; f++) {
                            var ye = r[f];
                            "line" != ye.type && ye.iconPos && delete ye._tempRank
                        }
                r.sort(function(t, e) {
                    var i = t._tempRank ? t._tempRank : t.rank,
                        n = e._tempRank ? e._tempRank : e.rank;
                    return i === n ? t.baseX - e.baseX : n - i
                });
                for (var f = 0, p = r.length; p > f; f++) {
                    var ne = r[f];
                    for (ne.isDel = !1, ne.isFadeout = !1, ne._schedule = 0, ne._isIgnore = !1, ne.arrIntersectIndex = [], M = f + 1; p > M; M++) {
                        var be = r[M];
                        ne.maxX - d < be.minX || ne.minX > be.maxX - d || ne.maxY - d < be.minY || ne.minY > be.maxY - d || ne.arrIntersectIndex.push(M)
                    }
                }
                for (var f = 0, p = r.length; p > f; f++) {
                    var ye = r[f];
                    if (0 == ye.isDel)
                        for (var we = ye.arrIntersectIndex, M = 0, L = we.length; L > M; M++) {
                            var xe = r[we[M]];
                            xe.isDel = !0, 1 === xe.guidExt && (xe.isDel = !1)
                        }
                }
                return r
            }
        }), aI.register(function(t) {
            if ("canvas" === t.getRenderType()) {
                var e = t.config.style;
                aI["FeatureStyle" + e] ? t.canvas2dMapMgr = new Q(t) : t.loadMapStyleFiles(function() {
                    t.canvas2dMapMgr = new Q(t), t.canvas2dMapMgr._loadData()
                })
            }
        }), x.extend(Q.prototype, {
            _initCanvas: function() {
                var t = this._map,
                    e = t.getSize(),
                    i = e.width,
                    n = e.height,
                    o = t.platform,
                    a = H("canvas"),
                    r = a.style,
                    s = this.ratio = t.config.ratio;
                this._width = i, this._height = n, r.cssText = "position: absolute;left:0;top:0;width:" + i + "px;height:" + n + "px;z-index:100;", a.width = i * s, a.height = n * s, this._labelCanvas = a, this._labelCtx = a.getContext("2d"), o.appendChild(a)
            },
            _initVars: function() {
                var t = ad("ditu", "normal");
                this._udt = t.udt, this._version = t.ver, this._labelDataUrls = be.B_NORMAL_MAP.vectorTileUrls, this._style = aI["FeatureStyle" + this._map.config.style], this._labelCount = 0, this._vectorDrawLib = new ar(this), this._cache = {
                    maxNum: 500,
                    delNum: 50,
                    arrCache: []
                }, this._computedLabel = null, this._spotData = null, this._labelStrategy = new cH(this), this._labelClick = new c(this), this._biz = new eC(this), this._map.temp.isPermitSpotOver = !0, this.labelStyleParam = "pl", this._map.getMapType() === BMAP_SATELLITE_MAP && (this.labelStyleParam = "sl"), this.statRequestCount = 0, this.statResponseCount = 0
            },
            _resizeHandler: function() {
                var t = this,
                    e = t._map,
                    i = e.getSize(),
                    n = i.width,
                    o = i.height,
                    a = this.ratio,
                    r = this._labelCanvas,
                    s = r.style;
                s.width = n + "px", s.height = o + "px", r.width = n * a, r.height = o * a, t._width = n, t._height = o;
                var l = !0;
                t._loadData(l)
            },
            _bindEvent: function() {
                var t = this,
                    e = t._map;
                e.addEventListener("load", function() {
                    t.clearLabel(), t._loadData()
                }), e.addEventListener("zoomend", function(e) {
                    e.notClearLabel || t.clearLabel(), t._loadData()
                }), e.addEventListener("moveend", function() {
                    t._loadData()
                }), e.addEventListener("resize", function(e) {
                    t._resizeHandler(e)
                }), e.addEventListener("maptypechange", function(e) {
                    e.isGlobeMapType() ? t.hideLabelCanvas() : (t.showLabelCanvas(), e.mapType === BMAP_NORMAL_MAP ? t.labelStyleParam = "pl" : e.mapType === BMAP_SATELLITE_MAP && (t.labelStyleParam = "sl"), t._loadData())
                }), e.addEventListener("streetlayer_show", function() {
                    this.isCanvasMap() && t.showLabelCanvas()
                }), e.addEventListener("streetlayer_hide", function() {
                    this.isCanvasMap() && t.hideLabelCanvas()
                }), e.addEventListener("loadbizdata", function(e) {
                    var i = e.data;
                    t._biz.proecessBizData(i, function() {
                        t.updateLabel()
                    })
                }), e.addEventListener("unloadbizdata", function() {
                    t._biz.clearBizData(), t.updateLabel()
                }), t.isDrawText = !1, setTimeout(function() {
                    t.isDrawText || e.dispatchEvent(new aB("onmapwhitescreen"))
                }, 1e4)
            },
            getStyle: function() {
                return this._style
            },
            _getZoomUnits: function(t) {
                return Math.pow(2, 18 - t)
            },
            _createCacheForm: function(t, e, i, n) {
                var o = this,
                    a = o._cache,
                    r = a.arrCache,
                    s = this._getLabelId(t, e, i, n),
                    l = {
                        id: s,
                        updateLabelCounter: 0
                    };
                return r.push(l), r[s] = l, l
            },
            _getLabelId: function(t, e, i, n) {
                return "_" + t + "_" + e + "_" + i + "_" + n + "_" + this.labelStyleParam
            },
            _getCache: function(t, e, i, n) {
                return this._cache.arrCache[this._getLabelId(t, e, i, n)]
            },
            _setCacheValue: function(t, e, i, n, o) {
                var a = this,
                    r = a._cache,
                    s = r.arrCache,
                    l = r.maxNum,
                    h = r.delNum,
                    c = this._getLabelId(t, e, i, n),
                    u = s[c];
                if (o && (u.lb = o), s.length > l) {
                    for (var d = s.splice(0, h), f = 0, p = d.length; p > f; f++) {
                        var m = d[f],
                            g = m.id;
                        s[g].lb && (s[g].lb = null), s[g] = null, delete s[g]
                    }
                    d = null
                }
            },
            _loadData: function(t) {
                var e = this._map;
                if (e.isCanvasMap()) {
                    var i = e.getCenter(),
                        n = cC.calcLoopCenterPoint(i),
                        o = this._tileType,
                        a = this._width / 2,
                        r = this._height,
                        s = e.getZoom(),
                        l = o.getDataZoom(s),
                        h = e.getZoomUnits(s),
                        c = h * a,
                        u = n.lng - c,
                        d = n.lng + c,
                        f = cC.isAddWidth(u, d);
                    a = f ? 1.5 * a : a;
                    var p = o.getTileSize(s),
                        m = o.getMercatorSize(s, l),
                        g = Math.floor(n.lng / m),
                        _ = Math.floor(n.lat / m),
                        v = [g, _, (n.lng - g * m) / m * p, (n.lat - _ * m) / m * p],
                        y = v[0] - Math.ceil((a - v[2]) / p),
                        b = v[1] - Math.ceil((r / 2 - v[3]) / p),
                        w = v[0] + Math.ceil((a + v[2]) / p),
                        x = v[1] + Math.ceil((r / 2 + v[3]) / p);
                    e.temp.isPermitSpotOver = !1;
                    for (var T = [], M = y; w > M; M++)
                        for (var L = b; x > L; L++) {
                            T.push([M, L, l]);
                            var C = "id_" + M + "_" + L + "_" + s;
                            T[C] = !0
                        }
                    T._zoom = l, T = cC.calcLoopTiles(T, s), T.sort(function(t) {
                        return function(e, i) {
                            return .4 * Math.abs(e[0] - t[0]) + .6 * Math.abs(e[1] - t[1]) - (.4 * Math.abs(i[0] - t[0]) + .6 * Math.abs(i[1] - t[1]))
                        }
                    }([v[0], v[1]]));
                    var I = this._cache.arrCache;
                    this._curViewLabels = [];
                    var S = "viewKey_" + Math.floor(i.lng) + "_" + Math.floor(i.lat) + "_" + s;
                    this.statRequestCount = 0, this.statResponseCount = 0, this._labelCount += T.length;
                    for (var D = s, M = 0, P = T.length; P > M; M++) {
                        var g = T[M][0],
                            _ = T[M][1],
                            z = T[M][2],
                            A = this._getLabelId(g, _, z, D),
                            k = I[A];
                        k || (k = this._createCacheForm(g, _, z, D)), "undefined" == typeof k.lb ? (k.lb = null, this._loadLabelData(g, _, z, D, p, S), this.statRequestCount++) : k.lb ? (this._curViewLabels.push(k.lb), this._labelCount--) : (t && this._loadLabelData(g, _, z, D, p, S), k.updateLabelCounter++)
                    }
                    0 === this._labelCount && this.updateLabel();
                    var B = this;
                    B.errorTimer && clearTimeout(B.errorTimer), B.errorTimer = setTimeout(function() {
                        0 !== B._labelCount && (B._labelCount = 0, B.updateLabel());
                        var t = new aB("onloaddatatimeout"),
                            e = 0,
                            i = 0,
                            n = 0,
                            o = 0;
                        B.statRequestCount === B.statResponseCount ? e = 1 : i = 1, 1 === i && (o = B.statRequestCount - B.statResponseCount, n = B.statResponseCount), t.noTimeoutCount = e, t.timeoutCount = i, t.timeoutNoLoaded = o, t.timeoutLoaded = n, B._map.dispatchEvent(t)
                    }, 500)
                }
            },
            clearLabel: function() {
                var t = this._width,
                    e = this._height,
                    i = this.ratio;
                this._labelCtx.clearRect(0, 0, t * i, e * i)
            },
            updateLabel: function() {
                var t = this._map,
                    e = t.getCenter(),
                    i = this._width,
                    n = this._height,
                    o = t.getZoom(),
                    a = this._tileType.getTileSize(o),
                    r = this._getZoomUnits(o),
                    s = this._labelCtx;
                this._labelCanvas.style.left = -t.offsetX + "px", this._labelCanvas.style.top = -t.offsetY + "px";
                var l = this._curViewLabels;
                l._centerX = e.lng, l._centerY = e.lat;
                var h = this._biz.bizLabels;
                this._computedLabel = this._labelStrategy.preComputeLabel(l, i, n, r, a, h), this._computedLabel._zoom = o, this.clearLabel(), this._vectorDrawLib.drawIconAndText(s, this._computedLabel, o), this._addSpotData(), t.temp.isPermitSpotOver = !0, l.length > 0 && (this.isDrawText = !0)
            },
            _loadLabelData: function(t, e, i, n, o, a) {
                var r = t.toString(),
                    s = e.toString(),
                    l = "cbk_" + r.replace("-", "_") + "_" + s.replace("-", "__") + "_" + Math.floor(i),
                    h = cX + "." + l,
                    c = this._labelDataUrls,
                    u = Math.abs(t + e) % c.length,
                    d = c[u];
                window.offLineIPAddress && (d = window.offLineIPAddress + "pvd/");
                var f = this.labelStyleParam,
                    p = "?qt=vtile",
                    m = "";
                "default" !== this._map.config.style && (m = "&styleId=" + dm.mapStyleNameIdPair[this._map.config.style]);
                var g = "x={x}&y={y}&z={z}&udt={udt}&v={v}&styles={styles}" + m + "&textonly=1&textimg=1&scaler={scaler}&fn=" + encodeURIComponent(h),
                    _ = cC.calcLoopParam(t, i).col,
                    v = this.ratio > 1 ? 2 : 1,
                    y = g.replace(/{x}/, _).replace(/{y}/, e).replace(/{z}/, Math.floor(i)).replace(/{styles}/, f).replace(/{udt}/, this._udt).replace(/{v}/, this._version).replace(/{scaler}/, v),
                    b = d + p + "&param=" + window.encodeURIComponent(ei(y)),
                    w = this,
                    x = w._map;
                aI[l] = function(r) {
                    w._vectorDrawLib.parseLabelData(r, t, e, i, n, o, function(o) {
                        var r = x.getCenter(),
                            s = x.getZoom(),
                            h = "viewKey_" + Math.floor(r.lng) + "_" + Math.floor(r.lat) + "_" + s;
                        w._labelCount--;
                        var c = w._getCache(t, e, i, n).updateLabelCounter;
                        w._labelCount -= c;
                        var u = w._curViewLabels;
                        if ((h === a || w._labelCount < 0 && s === i) && u.push(o), h === a && w.statResponseCount++, w._labelCount <= 0) {
                            var d = (new Date).getTime();
                            w.updateLabel();
                            var f = (new Date).getTime(),
                                p = new aB("oncanvasmaploaded");
                            p.drawTime = f - d, w.statResponseCount === w.statRequestCount && (p.isAllLoadedDrawing = !0), x.dispatchEvent(p)
                        }
                        w._setCacheValue(t, e, i, n, o), delete aI[l]
                    })
                }, eW.load(b)
            },
            drawLabel: function(t, e, i, n, o, a, r, s, l, h) {
                var c = this;
                if (c._computedLabel) {
                    if (c._computedLabel._zoom !== i) return void c.clearLabel();
                    c._map.temp.isPermitSpotOver = !1, c.clearLabel(), c._vectorDrawLib.zoomingIconAndText(this._labelCtx, c._computedLabel, t, e, n, o, a, r, s, l, h)
                }
            },
            _addSpotData: function() {
                this._spotData = [];
                for (var t = this._map.getZoom(), e = 0, i = this._computedLabel.length; i > e; e++) {
                    var n = this._computedLabel[e];
                    if (this.isClickableLabel(n) && !(1 === n.guidExt && n.startScale > t)) {
                        var o = [];
                        o[0] = (n.minX - n.maxX) / 2, o[1] = (n.minY - n.maxY) / 2, o[2] = (n.maxX - n.minX) / 2, o[3] = (n.maxY - n.minY) / 2;
                        var a = null;
                        n.iconPos && (a = new e1(n.iconPos.geoX, n.iconPos.geoY));
                        var r = n.name ? n.name.replace("\\\\", "<br>") : "";
                        n.iconPos && n.iconPos.iconType.indexOf("ditie") > -1 && this._map.getZoom() > 14 && (r = "");
                        var s = {
                            n: r,
                            pt: new e1(n.geoX, n.geoY),
                            userdata: {
                                iconPoint: a,
                                uid: n.guid,
                                name: r,
                                type: n.iconPos ? n.iconPos.iconType : "",
                                iconImg: n.iconImg,
                                mapPoi: !0,
                                adver_log: n.adver_log || ""
                            },
                            bd: o,
                            tag: "MAP_SPOT_INFO"
                        };
                        this._spotData.push(s)
                    }
                }
                var l = new aB("onspotsdataready");
                l.spots = this._spotData, this._map._spotDataOnCanvas = this._spotData, this._map.dispatchEvent(l)
            },
            isClickableLabel: function(t) {
                return t.isDel || !t.guid && !t.name ? !1 : !0
            },
            getFilterImageData: function(t, e) {
                for (var i = t.data, n = this._labelStrategy, e = parseInt(e), o = 0, a = i.length; a > o; o += 4) {
                    var r = i[o],
                        s = i[o + 1],
                        l = i[o + 2],
                        h = i[o + 3];
                    if (0 !== h) {
                        var c = Math.round((r + s + l) / 3),
                            u = c - 90;
                        u = 0 > u ? 0 : u, e === n.RANK5 && (i[o] = 51 + 1.3 * u, i[o + 1] = 133 + .8 * u, i[o + 2] = 255)
                    }
                }
                return t
            },
            showLabelCanvas: function() {
                this._labelCanvas.style.visibility = ""
            },
            hideLabelCanvas: function() {
                this._labelCanvas.style.visibility = "hidden"
            }
        });
        var bg = 5,
            cz = 4,
            eZ = 3,
            dv = 2,
            fd = 1,
            cB = 0,
            ff = 3,
            eR = 5,
            B = {
                3: {
                    start: 3,
                    base: 3
                },
                4: {
                    start: 4,
                    base: 5
                },
                5: {
                    start: 4,
                    base: 5
                },
                6: {
                    start: 6,
                    base: 7
                },
                7: {
                    start: 6,
                    base: 7
                },
                8: {
                    start: 8,
                    base: 9
                },
                9: {
                    start: 8,
                    base: 9
                },
                10: {
                    start: 10,
                    base: 10
                },
                11: {
                    start: 11,
                    base: 12
                },
                12: {
                    start: 11,
                    base: 12
                },
                13: {
                    start: 11,
                    base: 12
                },
                14: {
                    start: 14,
                    base: 15
                },
                15: {
                    start: 14,
                    base: 15
                },
                16: {
                    start: 16,
                    base: 17
                },
                17: {
                    start: 16,
                    base: 17
                },
                18: {
                    start: 18,
                    base: 19
                },
                19: {
                    start: 18,
                    base: 19
                },
                20: {
                    start: 18,
                    base: 19
                },
                21: {
                    start: 18,
                    base: 19
                }
            };
        x.extend(ar.prototype, {
            _initColorCanvas: function() {
                var t = 256,
                    e = H("canvas"),
                    i = e.style;
                i.width = t + "px", i.height = t + "px", e.width = t, e.height = t, this._colorCvs = e, this._colorCtx = e.getContext("2d")
            },
            parseLabelData: function(t, e, i, n, o, a, r) {
                if (this._featureStyle || (this._featureStyle = this._canvas2dMapMgr.getStyle()), !t || !t[0]) return void r([]);
                var s = this._map.getZoomUnits();
                this.loadTextPng(t, a, e, i, n, o, s, r)
            },
            loadTextPng: function(t, e, i, n, o, a, r, s) {
                var l = this,
                    h = t[5],
                    c = this._map,
                    u = (c.getZoom(), c.getSize()),
                    d = (u.width, u.height, c.getCenter()),
                    f = (d.lng, d.lat, i * e * r),
                    p = (n + 1) * e * r;
                if (h) {
                    var m = new Image;
                    m.onload = function() {
                        l.calcIconAndTextInfo(t, m, e, i, n, o, a, r, f, p, s), delete this.onload
                    }, m.src = h
                } else setTimeout(function() {
                    l.calcIconAndTextInfo(t, null, e, i, n, o, a, r, f, p, s)
                }, 1)
            },
            calcIconAndTextInfo: function(t, e, i, n, o, a, r, s, l, h, c) {
                var u = this,
                    d = (u._featureStyle, []);
                d.x = n, d.y = o, d.z = a;
                var f = (u._canvas2dMapMgr, []);
                if (t[0])
                    for (var p = 0; p < t[0].length; p++) t[0][p][0] === ff && f.push(t[0][p]);
                for (var m = t[2] || [], p = 0; p < f.length; p++) this._getFixedLabelInfo(f[p], e, r, s, i, l, h, d);
                var g = Math.pow(2, r - a);
                for (p = 0; p < m.length; p++) this._getLineLabelInfo(m[p], e, a, r, s, i, l, h, g, d);
                c(d)
            },
            _getFixedLabelInfo: function(t, e, i, n, o, a, r, s) {
                var l = t[1];
                if (l) {
                    var h = this._map.getZoom(),
                        c = this._map.config.style,
                        u = this._featureStyle,
                        d = i;
                    9 === d && (d = 8);
                    for (var f = 0; f < l.length; f++) {
                        var p = l[f],
                            m = p[0],
                            g = cO.getStyleFromCache(c, m, "point", d, u),
                            _ = cO.getStyleFromCache(c, m, "pointText", d, u);
                        if (!(_ && 0 !== _.length || g && 0 !== g.length)) {
                            if (5 !== d) continue;
                            var v = p[1];
                            if (!v) continue;
                            for (var y = 0; y < v.length; y++) {
                                var b = v[y][4];
                                if (b && "北京" === b[7]) {
                                    g = cO.getStyleFromCache(c, m, "point", 6, u), _ = cO.getStyleFromCache(c, m, "pointText", 6, u);
                                    break
                                }
                            }
                        }
                        var v = p[1];
                        if (v) {
                            var w = null,
                                x = 1,
                                T = 0,
                                M = 0;
                            g && g[0] ? (g = g[0], w = g.icon, x = g.zoom ? g.zoom / 100 : 1) : g = null;
                            for (var y = 0; y < v.length; y++) {
                                var b = v[y][4];
                                if (b) {
                                    var L = b[2];
                                    if (this._isVisible(L, h)) {
                                        var C = b[12];
                                        if (!(_ && _.length > 0) || C) {
                                            var I = Math.round(b[0] / 100),
                                                S = Math.round(b[1] / 100),
                                                D = {
                                                    lng: a + I,
                                                    lat: r - (o * n - S)
                                                },
                                                P = I / n,
                                                z = o - S / n,
                                                A = b[7] || "",
                                                k = b[5],
                                                B = {
                                                    type: "fixed",
                                                    name: A,
                                                    textImg: e,
                                                    rank: b[4],
                                                    baseX: P,
                                                    baseY: z,
                                                    iconPos: null,
                                                    textPos: null,
                                                    guid: b[3] || "",
                                                    tracer: L,
                                                    direction: k,
                                                    startScale: 3
                                                };
                                            (k !== cz && C || !C) && null !== w && (B.iconPos = this._getIconPosition(w, x, P, z, D), B.iconPos && (T = B.iconPos.width, M = B.iconPos.height)), 0 === T && (B.direction = cz), C && (B.textPos = this._getTextDrawData(b, P, z, T, M)), (B.textPos || B.iconPos) && s.push(B)
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            _isVisible: function(t, e) {
                var i;
                this._binaryCache[t] || (i = t.toString(2), i.length < 8 && (i = new Array(8 - i.length + 1).join("0") + i), this._binaryCache[t] = i), i = this._binaryCache[t];
                var n = B[e].start;
                return "1" === i[e - n]
            },
            _getIconPosition: function(t, e, i, n, o) {
                var a = this._map.config.style,
                    r = aI["iconSetInfo" + a][t];
                if (r || t.charCodeAt(0) >= 48 && t.charCodeAt(0) <= 57 && (r = aI["iconSetInfo" + a]["_" + t]), !r) return null;
                var s = r[0],
                    l = r[1];
                return s *= e, l *= e, {
                    srcX: 0,
                    srcY: 0,
                    destX: i - s / 2,
                    destY: n - l / 2,
                    width: s,
                    height: l,
                    geoX: o.lng,
                    geoY: o.lat,
                    mcPt: o,
                    iconType: t
                }
            },
            _getTextDrawData: function(t, e, i, n, o) {
                var a = t[5];
                "number" != typeof a && (a = 0);
                var r = this.ratio,
                    s = r / 2;
                n *= s, o *= s;
                for (var l = t[12], h = l.length, c = 0, u = 0, d = [], f = 0, p = 0, m = 0; h > m; m++) p += Math.round(l[m][3]);
                for (var m = 0; h > m; m++) {
                    var g = l[m],
                        _ = g[0],
                        v = g[1],
                        y = g[2],
                        b = g[3],
                        w = 2 * r,
                        x = 0;
                    switch (0 !== n && (x = 2 * r), 0 === n && (a = cz), a) {
                        case eZ:
                            var T = i - p / 2 - w * (h - 1) / 2;
                            c = e - y - n / 2 - x, u = T + f + w * m;
                            break;
                        case fd:
                            var T = i - p / 2 - w * (h - 1) / 2;
                            c = e + n / 2 + x, u = T + f + w * m;
                            break;
                        case dv:
                            var T = i - o / 2 - p - w * (h - 1) - w;
                            c = e - y / 2, u = T + f + w * m;
                            break;
                        case cB:
                            var T = i + o / 2 + w / 2;
                            c = e - y / 2, u = T + f + w * m;
                            break;
                        case cz:
                            var T = i - b / 2 - w * (h - 1) / 2;
                            c = e - y / 2, u = T + f + w * m
                    }
                    f += b, y > 0 && b > 0 && d.push({
                        srcX: _,
                        srcY: v,
                        destX: c,
                        destY: u,
                        width: y,
                        height: b
                    })
                }
                return d.length > 0 ? d : null
            },
            _getLineLabelInfo: function(t, e, i, n, o, a, r, s, l, h) {
                if (10 === t.length) {
                    for (var c = (this.ratio, this.ratio), u = t[7].length, d = t[1], f = t[3], p = t[8], m = t[4], g = 2, _ = m.slice(0, g), v = g; v < m.length; v += g) _[v] = _[v - g] + m[v], _[v + 1] = _[v - (g - 1)] + m[v + 1];
                    for (var v = g; v < m.length; v += g) v % (f * g) !== 0 && v % (f * g) !== 1 && (_[v] = _[v - g] + m[v] / l, _[v + 1] = _[v - (g - 1)] + m[v + 1] / l);
                    for (var y = 0; u > y; y++) {
                        var b = t[7][y];
                        if (this._isVisible(b, n)) {
                            var w = t[6][y],
                                x = y * f * g;
                            m = _.slice(x, x + f * g);
                            var T = [],
                                M = void 0,
                                L = void 0,
                                C = void 0,
                                I = void 0,
                                p = t[9].slice(0);
                            w && p.reverse();
                            for (var S, D, P = 0; f > P; P++) {
                                var z, A, k = t[5][f * y + P],
                                    B = m[P * g] / 100,
                                    E = m[P * g + 1] / 100,
                                    O = p[P],
                                    R = O[0],
                                    Z = O[1],
                                    N = O[2],
                                    F = O[3];
                                0 === P ? (S = z = B / o, D = a - E / o, A = E / o) : (z = B / o, A = E / o);
                                var U = S + (z - S) * c - N / 2,
                                    H = D + (a - A - D) * c - F / 2;
                                void 0 === M ? (M = S - N / 2, L = D - F / 2, C = M + N, I = L + F) : (M > U && (M = U), L > H && (L = H), U + N > C && (C = U + N), H + F > I && (I = H + F)), T.push({
                                    angle: k,
                                    srcX: R,
                                    srcY: Z,
                                    destX: U,
                                    destY: H,
                                    width: N,
                                    height: F
                                })
                            }
                            var W = {
                                type: "line",
                                textImg: e,
                                rank: d,
                                baseX: S,
                                baseY: D,
                                arrWordPos: T,
                                minXOriginal: M,
                                minYOriginal: L,
                                maxXOriginal: C,
                                maxYOriginal: I,
                                text: ""
                            };
                            h.push(W)
                        }
                    }
                }
            },
            alterColor: function(t, e, i) {
                var n = this._colorCtx,
                    o = this._canvas2dMapMgr;
                n.clearRect(0, 0, t.width, t.height), n.drawImage(e, t.srcX, t.srcY, t.width, t.height, 0, 0, t.width, t.height);
                var a = n.getImageData(0, 0, t.width, t.height),
                    r = o.getFilterImageData(a, i);
                n.putImageData(r, 0, 0)
            },
            drawIconAndText: function(t, e, i) {
                for (var n = this.ratio, o = this.sizeRatio / n, a = 2 / n, r = this, s = 0, l = e.length; l > s; s++) {
                    var h = e[s];
                    if (0 == h.isDel) {
                        var c = h.baseDrawX,
                            u = h.baseDrawY;
                        if ("fixed" == h.type) {
                            var d = h.iconPos,
                                f = h.textPos,
                                p = h.textImg,
                                m = h.startScale;
                            if (d && i >= m) {
                                var g = this._iconCache[d.iconType];
                                if (g) g.img ? t.drawImage(g.img, 0, 0, g.img.width, g.img.height, Math.round(c * n + (d.drawX - c) / a), Math.round(u * n + (d.drawY - u) / a), d.width / a, d.height / a) : g.drawLabels.push(h);
                                else if (!g) {
                                    this._iconCache[d.iconType] = {
                                        img: null,
                                        drawLabels: [h]
                                    };
                                    var _ = new Image;
                                    _._iconName = d.iconType, _.onload = function() {
                                        var e = r._iconCache[this._iconName];
                                        e.img = this, this.onload = null;
                                        for (var i = 0; i < e.drawLabels.length; i++) {
                                            var o = e.drawLabels[i],
                                                s = o.baseDrawX,
                                                l = o.baseDrawY,
                                                h = o.iconPos;
                                            t.drawImage(this, 0, 0, this.width, this.height, Math.round(s * n + (h.drawX - s) / a), Math.round(l * n + (h.drawY - l) / a), h.width / a, h.height / a)
                                        }
                                        e.drawPos = []
                                    }, _.src = dm.getImageFullUrl(r._map.config.style, d.iconType + ".png")
                                }
                            }
                            if (f && p && i >= m)
                                for (var v = 0; v < f.length; v++) {
                                    var y = f[v];
                                    h._tempRank ? (this.alterColor(y, p, h._tempRank), t.drawImage(this._colorCvs, 0, 0, y.width, y.height, Math.round(c * n + (y.drawX - c) / o), Math.round(u * n + (y.drawY - u) / o), y.width / o, y.height / o)) : t.drawImage(p, y.srcX, y.srcY, y.width, y.height, Math.round(c * n + (y.drawX - c) / o), Math.round(u * n + (y.drawY - u) / o), y.width / o, y.height / o)
                                }
                        } else
                            for (var b = h.arrWordPos, p = h.textImg, w = h.tileX, x = h.tileY, T = 0, M = b.length; M > T; T++) {
                                var L = b[T],
                                    C = Math.round(w + L.destX),
                                    I = Math.round(x + L.destY),
                                    S = L.angle;
                                if (C = c * n + C - c, I = u * n + I - u, S > 10 && 350 > S) {
                                    t.save();
                                    var D = Math.round(C + L.width / 2),
                                        P = Math.round(I + L.height / 2);
                                    t.translate(D, P), t.rotate(-S / 180 * Math.PI), t.drawImage(p, L.srcX, L.srcY, L.width, L.height, -Math.round(L.width / 2), -Math.round(L.height / 2), L.width / o, L.height / o), t.restore()
                                } else t.drawImage(p, L.srcX, L.srcY, L.width, L.height, C, I, L.width / o, L.height / o)
                            }
                    }
                }
            },
            isCollide: function(t, e, i, n, o, a, r) {
                for (var s = 0, l = a.length; l > s; s++) {
                    var h = a[s],
                        c = 1 / Math.pow(2, r + 1),
                        u = c * h[3] / 2,
                        d = c * h[4] / 2,
                        f = h[0];
                    if (f != t && !(e + n < h[1] - u || e > h[1] + h[3] + u || i + o < h[2] - d || i > h[2] + h[4] + d)) return !0
                }
                return !1
            },
            zoomingIconAndText: function(t, e, i, n, o, a, r, s, l, h, c) {
                var u = this.ratio,
                    d = this.sizeRatio / u,
                    f = 2 / u,
                    p = n.x,
                    m = n.y,
                    g = 2 * u;
                0 !== c && (m += h);
                var _ = void 0,
                    v = void 0,
                    y = void 0,
                    b = void 0,
                    w = void 0,
                    x = a > 0 ? !0 : !1;
                if (!x) {
                    _ = [];
                    var T = 1 - r
                }
                for (var M = 0, L = e.length; L > M; M++) {
                    var C = e[M];
                    if (0 == C.isDel) {
                        var I = C.baseDrawX,
                            S = C.baseDrawY;
                        if (t.save(), t.translate(-s * u, -l * u), C.isFadeout) {
                            if (x || !(C._schedule <= r) || C._isIgnore) {
                                C._isIgnore = !0;
                                continue
                            }
                            t.globalAlpha = T, C._schedule = r
                        }
                        if ("fixed" == C.type) {
                            var D, P = C.iconPos,
                                z = C.textPos,
                                A = C.textImg,
                                k = C.startScale,
                                B = 0;
                            if (P && (B = g), P && !C.iconImg && this._iconCache[P.iconType] && (D = this._iconCache[P.iconType].img), P && o >= k && D && (b = P.width, w = P.height, v = (p + (I - p) * i) * u - b / 2 / f, y = (m + (S - m) * i) * u - w / 2 / f + c, !x && this.isCollide(M, v, y, b, w, _, a) && (C.isFadeout = !0), t.drawImage(D, P.srcX, P.srcY, D.width, D.height, Math.round(v), Math.round(y), b / f, w / f), !x && _.push([M, v, y, b, w])), z && A && o >= k) {
                                var E, O, R = 0,
                                    Z = 0;
                                P && (R = P.width, Z = P.height);
                                for (var N = z.length, F = 0, U = 0, H = 0; N > H; H++) {
                                    var W = z[H];
                                    U += W.height, F < W.width && (F = W.width)
                                }
                                U += (H - 1) * g, !x && this.isCollide(M, v, y, F, U, _, a) && (C.isFadeout = !0);
                                for (var X = 0, H = 0; N > H; H++) {
                                    var W = z[H];
                                    switch (C.direction) {
                                        case eZ:
                                            E = -(R / 2 / f + W.width + B), O = -U / 2 + X + g * H;
                                            break;
                                        case fd:
                                            E = R / 2 / f + B, O = -U / 2 + X + g * H;
                                            break;
                                        case dv:
                                            E = -W.width / 2, O = -Z / 2 / f - U + X - g * (H + 1);
                                            break;
                                        case cB:
                                            E = -W.width / 2, O = Z / 2 / f + X + g * (H + 1);
                                            break;
                                        case cz:
                                            E = -W.width / 2, O = -U / 2 + X + g * H
                                    }
                                    X += W.height, v = (p + (I - p) * i) * u + E / d, y = (m + (S - m) * i) * u + O / d, b = W.width, w = W.height, C._tempRank ? (this.alterColor(W, A, C._tempRank), t.drawImage(this._colorCvs, 0, 0, b, w, Math.round(v), Math.round(y), b / d, w / d)) : t.drawImage(A, W.srcX, W.srcY, b, w, Math.round(v), Math.round(y), b / d, w / d), !x && _.push([M, v, y, b, w])
                                }
                            }
                        } else
                            for (var G = C.arrWordPos, A = C.textImg, Y = C.tileX, V = C.tileY, q = G[0], j = Math.round(Y + q.destX), K = Math.round(V + q.destY), J = 0, Q = G.length; Q > J; J++) {
                                var $ = G[J],
                                    te = Math.round(Y + $.destX),
                                    ee = Math.round(V + $.destY),
                                    ie = $.angle,
                                    ne = Math.round((p + (I - p) * i) * u - q.width / 2 + te - j),
                                    oe = Math.round((m + (S - m) * i) * u - q.height / 2 + ee - K);
                                if (v = ne, y = oe, b = $.width, w = $.height, !x && this.isCollide(M, v, y, b, w, _, a) && (C.isFadeout = !0), ie > 10 && 350 > ie) {
                                    var ae = ne + $.width / 2,
                                        re = oe + $.height / 2,
                                        se = ie / 180 * Math.PI,
                                        le = Math.cos(se),
                                        he = Math.sin(se),
                                        ce = le,
                                        ue = le,
                                        de = he,
                                        fe = -he,
                                        pe = ae - ae * le - re * he,
                                        me = re + ae * he - re * le;
                                    t.save(), t.transform(ce, fe, de, ue, pe, me), t.drawImage(A, $.srcX, $.srcY, b, w, v, y, b / d, w / d), t.restore()
                                } else t.drawImage(A, $.srcX, $.srcY, b, w, v, y, b / d, w / d);
                                !x && _.push([M, v, y, b, w])
                            }
                        t.restore()
                    }
                }
            }
        }), x.extend(eC.prototype, {
            initVars: function(t) {
                this._map = t._map, this._canvas2dMapMgr = t, this.base64Prefix = "data:image/png;base64,", this.bizData = null, this.objTextsPng = null, this.arrIconsPng = null, this.bizLabels = null
            },
            proecessBizData: function(t, e) {
                var i = this;
                this.bizData = t, this.objTextsPng = null, this.arrIconsPng = null;
                var n = t.textsPng,
                    o = t.iconsPng;
                if (n && o) {
                    var a = new Image;
                    a.onload = function() {
                        i.objTextsPng = this, i.calcIconAndTextInfo(e), this.onload = null
                    }, a.src = this.base64Prefix + n;
                    for (var r = o.length, s = [], l = 0; r > l; l++) {
                        var h = o[l],
                            c = new Image;
                        ! function(t) {
                            c.onload = function() {
                                r--, s[t] = this, 0 === r && (i.arrIconsPng = s, i.calcIconAndTextInfo(e)), this.onload = null
                            }
                        }(l), c.src = this.base64Prefix + h
                    }
                }
            },
            calcIconAndTextInfo: function(t) {
                if (this.objTextsPng && this.arrIconsPng) {
                    for (var e = this.bizData, i = e.pois, n = [], o = 0, a = i.length; a > o; o++) {
                        var r = i[o],
                            s = this.arrIconsPng[r.iconPng],
                            l = s.height / 2,
                            h = {
                                type: "fixed",
                                name: "",
                                textImg: this.objTextsPng,
                                iconImg: s,
                                rank: r.rank,
                                iconPos: {
                                    srcX: 0,
                                    srcY: 0,
                                    destX: -s.width / 2,
                                    destY: -l / 2,
                                    width: s.width,
                                    height: l,
                                    geoX: r.x,
                                    geoY: r.y,
                                    iconType: "vectorCustom"
                                },
                                textPos: this.calcTextPos(r.pos, s),
                                startScale: r.from < 12 ? 12 : r.from,
                                guid: r.guid,
                                guidExt: 1,
                                adver_log: r.adver_log || ""
                            },
                            c = {
                                type: "fixed",
                                textDirLeft: "left",
                                name: "",
                                textImg: this.objTextsPng,
                                iconImg: s,
                                rank: r.rank,
                                iconPos: {
                                    srcX: 0,
                                    srcY: 0,
                                    destX: -s.width / 2,
                                    destY: -l / 2,
                                    width: s.width,
                                    height: l,
                                    geoX: r.x,
                                    geoY: r.y,
                                    iconType: "vectorCustom"
                                },
                                textPos: this.calcTextPosLeft(r.pos, s),
                                startScale: r.from < 12 ? 12 : r.from,
                                guid: r.guid,
                                guidExt: 1,
                                adver_log: r.adver_log || ""
                            },
                            u = [h, c];
                        n.push(u)
                    }
                    this.bizLabels = n, t && t()
                }
            },
            calcTextPos: function(t, e) {
                var i = [],
                    n = t.length / 4,
                    o = e.width / 2;
                if (1 === n) {
                    var a = {
                        srcX: t[0],
                        srcY: t[1],
                        destX: o,
                        destY: -t[3] / 2,
                        width: t[2],
                        height: t[3]
                    };
                    i.push(a)
                } else {
                    var a = {
                            srcX: t[0],
                            srcY: t[1],
                            destX: o,
                            destY: -t[3],
                            width: t[2],
                            height: t[3]
                        },
                        r = {
                            srcX: t[4],
                            srcY: t[5],
                            destX: o,
                            destY: 0,
                            width: t[6],
                            height: t[7]
                        };
                    i.push(a), i.push(r)
                }
                return i
            },
            calcTextPosLeft: function(t, e) {
                var i = [],
                    n = t.length / 4,
                    o = e.width / 2;
                if (1 === n) {
                    var a = {
                        srcX: t[0],
                        srcY: t[1],
                        destX: -o - t[2],
                        destY: -t[3] / 2,
                        width: t[2],
                        height: t[3]
                    };
                    i.push(a)
                } else {
                    var a = {
                            srcX: t[0],
                            srcY: t[1],
                            destX: -o - t[2],
                            destY: -t[3],
                            width: t[2],
                            height: t[3]
                        },
                        r = {
                            srcX: t[4],
                            srcY: t[5],
                            destX: -o - t[2],
                            destY: 0,
                            width: t[6],
                            height: t[7]
                        };
                    i.push(a), i.push(r)
                }
                return i
            },
            clearBizData: function() {
                this.bizData = null, this.bizLabels = null
            }
        }), x.extend(bT.prototype, {
            centerAndZoom: function(t, e, i) {
                function n() {
                    a._earth = a.initGlobeMapTypeInstance(r), a._proxyEarthEvents(), a._changeEarthMapType(a.temp.originMapType), x.extend(a, aI.EarthView.prototype), delete a.temp.originMapType
                }
                if (i = i || {}, this.loaded || (this.firstTileLoad = !1), e = this._getProperZoom(e).zoom, i.noAnimation !== !0 && this.loaded) {
                    var o = this._ifUseAnimation(t, e);
                    if (o) return void this.flyTo(t, e, i)
                }
                var a = this;
                if (t || e) {
                    if (this._stopAllAnimations(), t && !t.equals(this.centerPoint) && this.fire(new aB("oncenter_changed")), e && e !== this.zoomLevel && this.fire(new aB("onzoom_changed")), t = t || this.centerPoint, e = e || this.zoomLevel, e = this._getProperZoom(e).zoom, this.isGlobeMapType()) {
                        var r = this.mapType;
                        this._earth || (this.mapType = BMAP_NORMAL_MAP, this.temp.originMapType = r, cG.load("earth", function() {
                            r === bW.EARTH ? aI["FeatureStyle" + a.config.style] ? n() : a.loadMapStyleFiles(function() {
                                n()
                            }) : n()
                        }))
                    }
                    this.lastLevel = this.zoomLevel || e, this.zoomLevel = e;
                    var s = new aB("onload");
                    if (s.point = t, s.zoom = e, this.centerPoint = new e1(t.lng, t.lat), this.defaultZoomLevel = this.defaultZoomLevel || this.zoomLevel, this.defaultCenter = this.defaultCenter || this.centerPoint, this.isGlobeMapType() || (this.centerPoint = this.restrictCenter(this.centerPoint)), !this.loaded && !this.isGlobeMapType(this.temp.originMapType)) {
                        var l = this.config.defaultMaxBounds,
                            h = new bS(l, "baidu", this.mapType),
                            c = new bG({
                                mapType: this.mapType,
                                copyright: h,
                                dataType: eo,
                                customLayer: !1,
                                baseLayer: !0,
                                tileTypeName: "na"
                            });
                        c._isInnerLayer = !0, this.addTileLayer(c), this.mapType === BMAP_SATELLITE_MAP && this._isHybridShow === !0 && this._addHybirdMap(), this.baseLayerAdded = !0, this.on("zoom_changed", function() {
                            0 !== this._heading && this.getZoom() < 7 && this.config.restrictCenter === !0 && a.resetHeading()
                        })
                    }
                    this.loaded = !0, this.dispatchEvent(s), i.callback && i.callback()
                }
            },
            _ifUseAnimation: function(t, e) {
                var i = this.getSize(),
                    n = {
                        zoom: this.zoomLevel
                    },
                    o = {
                        zoom: e
                    },
                    a = this.pointToPixel(this.centerPoint),
                    r = this.pointToPixel(t, n),
                    s = this.pointToPixel(this.centerPoint, o),
                    l = this.pointToPixel(t, o),
                    h = Math.abs(a.x - r.x),
                    c = Math.abs(a.y - r.y),
                    u = Math.abs(s.x - l.x),
                    d = Math.abs(s.y - l.y);
                return (h > i.width || c > i.height) && (u > i.width || d > i.height) ? !1 : !0
            },
            _setPlatformPosition: function(t, e, i) {
                if (i = i || {}, 0 !== t || 0 !== e || i.point) {
                    isNaN(i.initMapOffsetX) && (i.initMapOffsetX = this.offsetX), isNaN(i.initMapOffsetY) && (i.initMapOffsetY = this.offsetY);
                    var n = cq(this._heading);
                    this._tilt > 0 && (e /= Math.cos(cq(this._tilt)));
                    var o = t * Math.cos(n) + e * Math.sin(n),
                        a = -t * Math.sin(n) + e * Math.cos(n);
                    if (o += i.initMapOffsetX, a += i.initMapOffsetY, i.point) {
                        var r = this.restrictCenter(i.point);
                        r.equals(this.centerPoint) || (this.centerPoint = r.clone(), this.fire(new aB("oncenter_changed")))
                    } else {
                        var s = this.offsetX - o,
                            l = this.offsetY - a,
                            h = this.centerPoint.lng,
                            c = this.centerPoint.lat,
                            u = new e1(h, c),
                            d = this.getZoomUnits();
                        this.centerPoint = this.restrictCenter(new e1(u.lng + s * d, u.lat - l * d), d), this.fire(new aB("oncenter_changed"))
                    }
                    this.offsetX = o, this.offsetY = a, this.dispatchEvent(new aB("onmoving"))
                }
            },
            restrictCenter: function(t, e) {
                if (this.config.restrictCenter === !1) return t;
                e = e || this.getZoomUnits();
                var i = this.pixelToPoint(new cN(this.width, 0), {
                        center: t
                    }),
                    n = this.pixelToPoint(new cN(0, this.height), {
                        center: t
                    }),
                    o = t.lng,
                    a = t.lat;
                if (null !== this.config.restrictBounds && !this.config.restrictBounds.isEmpty()) {
                    var r = this.config.restrictBounds,
                        s = r.getSouthWest(),
                        l = r.getNorthEast(),
                        h = this.calcNewZoomByRestriction(o, a, n, i, s.lng, l.lng, s.lat, l.lat);
                    return h > this.zoomLevel ? (this.zoomLevel = h, t) : (t.lng = this.calcNewLngByBounds(o, n, i, s.lng, l.lng, e), t.lat = this.calcNewLatByBounds(a, n, i, s.lat, l.lat, e), t)
                }
                if (this.zoomLevel < 5) {
                    var h = this.calcNewZoomByRestriction(o, a, i, n, null, null, bU.MIN_LAT, bU.MAX_LAT);
                    if (h !== this.zoomLevel) return this.zoomLevel = h, t
                }
                return t.lat = this.calcNewLatByBounds(a, n, i, bU.MIN_LAT, bU.MAX_LAT, e), t
            },
            calcNewZoomByRestriction: function(t, e, i, n, o, a, r, s) {
                var l = 0,
                    h = 0;
                if ("number" == typeof r && "number" == typeof s && n.lat > s && i.lat < r) {
                    var c, u = s - e,
                        d = e - r;
                    c = d > u ? u / (this.height / 2) : d / (this.height / 2), l = 18 - cZ(c)
                }
                if ("number" == typeof o && "number" == typeof a && n.lng > a && i.lng < o) {
                    var c, f = a - t,
                        p = t - o;
                    c = p > f ? f / (this.width / 2) : p / (this.width / 2), h = 18 - cZ(c)
                }
                return Math.max(l, h) || this.zoomLevel
            },
            calcNewLatByBounds: function(t, e, i, n, o, a) {
                var r = t;
                return i.lat > o ? r = o - this.height / 2 * a : e.lat < n && (r = n + this.height / 2 * a), r
            },
            calcNewLngByBounds: function(t, e, i, n, o, a) {
                var r = t;
                return i.lng > o ? r = o - this.width / 2 * a : e.lng < n && (r = n + this.width / 2 * a), r
            },
            zoomTo: function(t, e, i) {
                var n = be[this.mapType];
                if (n) {
                    var o = this._getProperZoom(t);
                    if (t = o.zoom, this.zoomLevel !== t) {
                        this.lastLevel = this.zoomLevel, i = i || {}, "idle" === this.zoomEventStatus && (this.fire(new aB("onzoomstart")), this.zoomEventStatus = "zooming"), !e && this.getInfoWindow() && this.temp.infoWin && this.temp.infoWin.isOpen() && (e = this.getInfoWindow().getPoint()), this.config.fixCenterWhenPinch && (e = this.centerPoint.clone());
                        var a = null;
                        i.fixPixel ? a = i.fixPixel : e && (a = this.pointToPixel(e, {
                            useRound: !1
                        }));
                        var r = this.pixelToPoint(a),
                            s = this.centerPoint.clone();
                        if (this.fixPoint = e, this.fixPixel = a, this.fixCenter = s, this.mousePosMCPoint = r, i.noAnimation) {
                            t = o.zoom, this.zoomLevel = t;
                            var l = this.getCurrentMaxTilt();
                            if (this._tilt > l && (this._tilt = l), e) {
                                if (this._heading % 360 !== 0 || this._tilt > 0) {
                                    var h = this._webglMapCamera.fromScreenPixelToMC(a.x, a.y, {
                                        center: s,
                                        zoom: this.zoomLevel
                                    });
                                    if (h) {
                                        var c = h.sub(r),
                                            u = s.sub(c);
                                        this.centerPoint = this.restrictCenter(u)
                                    }
                                } else {
                                    var d = this.getZoomUnits(),
                                        u = new e1(e.lng - d * (a.x - this.width / 2), e.lat + d * (a.y - this.height / 2));
                                    this.centerPoint = this.restrictCenter(u, d)
                                }
                                this.fire(new aB("oncenter_changed"))
                            }
                            return this.fire(new aB("onzoom_changed")), void this._checkFireZoomend()
                        }
                        this._animationInfo.zoom = {
                            current: this.zoomLevel,
                            diff: t - this.zoomLevel,
                            target: t
                        };
                        var f = this;
                        i.callback = function() {
                            f._checkFireZoomend()
                        };
                        var p = this._tilt;
                        return (this.fixPoint || p > bU.MAX_DRAG_TILT_L2) && (i.renderCallback = function() {
                            var t = f.getCurrentMaxTilt();
                            f._tilt > t && (f._tilt = t);
                            f.fixPixel;
                            if (f.fixPixel && f.fixPoint) {
                                var e = f.fixPixel,
                                    i = f.fixPoint,
                                    n = f.fixCenter,
                                    o = f.mousePosMCPoint;
                                if (f._heading % 360 !== 0 || f._tilt > 0) {
                                    var a = f._webglMapCamera.fromScreenPixelToMC(e.x, e.y, {
                                        center: n,
                                        zoom: f.zoomLevel,
                                        tilt: f._tilt
                                    });
                                    if (a) {
                                        var r = a.sub(o),
                                            s = n.sub(r);
                                        f.centerPoint = f.restrictCenter(s)
                                    }
                                } else {
                                    var l = e,
                                        h = f.getZoomUnits(),
                                        s = new e1(i.lng - h * (l.x - f.width / 2), i.lat + h * (l.y - f.height / 2));
                                    f.centerPoint = f.restrictCenter(s, h)
                                }
                                f.fire(new aB("oncenter_changed"))
                            }
                        }), i.fromMouseWheel === !0 ? void this._startInfiniteZoomAnimation(i) : void this._startAnimation(i)
                    }
                }
            },
            _checkFireZoomend: function() {
                var t = this;
                t.fireZoomendTimer && clearTimeout(t.fireZoomendTimer), t.fireZoomendTimer = setTimeout(function() {
                    "zooming" === t.zoomEventStatus && (t.fire(new aB("onzoomend")), t.zoomEventStatus = "idle"), t.fireZoomendTimer = null
                }, 150)
            },
            deepZoomMedia: function(t) {
                var e = this;
                e.temp.isStdCtrlBusy || (e.temp.isStdCtrlBusy = !0, e.deepZoomTo(e.zoomLevel + t), setTimeout(function() {
                    e.temp.isStdCtrlBusy = !1
                }, 400))
            },
            deepZoomTo: function(t) {
                this.zoomTo(t)
            },
            flyTo: function(t, e, i) {
                function n(t) {
                    var e = (T * T - x * x + (t ? -1 : 1) * L * L * M * M) / (2 * (t ? T : x) * L * M);
                    return Math.log(Math.sqrt(e * e + 1) - e)
                }

                function o(t) {
                    return (Math.exp(t) - Math.exp(-t)) / 2
                }

                function a(t) {
                    return (Math.exp(t) + Math.exp(-t)) / 2
                }

                function r(t) {
                    return o(t) / a(t)
                }
                if (i = i || {}, !this.centerPoint.equals(t) || this.zoomLevel !== e || "number" == typeof i.heading || "number" == typeof i.tilt) {
                    var s = this.getHeading() % 360,
                        l = this.getTilt(),
                        h = 0,
                        c = 0,
                        u = this.getBounds().containsPoint(t);
                    "number" == typeof i.heading ? h = i.heading : u && (h = s), "number" == typeof i.tilt ? c = i.tilt : u && (c = l), this._heading = s;
                    var d = h - s,
                        f = c - l,
                        p = this,
                        m = this.zoomLevel,
                        g = 1.42,
                        _ = this.zoomScale(e - m),
                        v = this.getZoomUnits(),
                        y = this.centerPoint.div(v),
                        b = t.div(v),
                        w = (this.worldSize(), g),
                        x = Math.max(this.width, this.height),
                        T = x / _,
                        M = b.sub(y).mag(),
                        L = w * w,
                        C = n(0),
                        I = function(t) {
                            return a(C) / a(C + w * t)
                        },
                        S = function(t) {
                            return x * ((a(C) * r(C + w * t) - o(C)) / L) / M
                        },
                        D = (n(1) - C) / w;
                    if (Math.abs(M) < 1e-6 || 1 / 0 === D || isNaN(D)) {
                        if (Math.abs(x - T) < 1e-6) return i.noZoomAnimation !== !0 && (this._animationInfo.zoom = {
                            current: this.zoomLevel,
                            diff: e - this.zoomLevel
                        }), this._animationInfo.center = {
                            current: this.centerPoint,
                            diff: t.sub(this.centerPoint)
                        }, this._animationInfo.heading = {
                            current: s,
                            diff: h - s
                        }, this._animationInfo.tilt = {
                            current: l,
                            diff: c - l
                        }, this.setLock(!0), void this._startAnimation({
                            callback: function(t) {
                                p.setLock(!1), i.callback && i.callback(t)
                            },
                            duration: i.duration
                        });
                        var P = x > T ? -1 : 1;
                        D = Math.abs(Math.log(T / x)) / w, S = function() {
                            return 0
                        }, I = function(t) {
                            return Math.exp(P * w * t)
                        }
                    }
                    var z = 1.7;
                    .3 > D ? z = .8 : D > 5 && (z = (D - 5) / 2 + z);
                    var A = i.duration || 1e3 * D / z;
                    if (isNaN(A)) {
                        var k = {};
                        for (var B in i) k[B] = i[B], k.noAnimation = !0;
                        return void this.centerAndZoom(t, e, k)
                    }
                    this.fire(new aB("onmovestart")), this.fire(new aB("onzoomstart")), this.setLock(!0), this._startAnimation({
                        duration: A,
                        renderCallback: function(t) {
                            var e = t * D,
                                n = S(e);
                            if (i.noZoomAnimation !== !0) {
                                var o = m + p.scaleZoom(1 / I(e));
                                o < p.getMinZoom() && (o = p.getMinZoom()), o > p.getMaxZoom() && (o = p.getMaxZoom()), o !== p.zoomLevel && (p.zoomLevel = o, p.fire(new aB("onzoom_changed")))
                            }
                            if (p.centerPoint = y.add(b.sub(y).mult(n)).mult(v), p.fire(new aB("oncenter_changed")), "number" == typeof h) {
                                var a = t / .7;
                                a > 1 && (a = 1), p.setHeading(s + d * t, {
                                    noAnimation: !0
                                })
                            }
                            "number" == typeof c && p.setTilt(l + f * t, {
                                noAnimation: !0
                            })
                        },
                        callback: function(t, n) {
                            return p.setLock(!1), n && n.stop === !0 ? (p.fire(new aB("onmoveend")), i.noZoomAnimation !== !0 && p.fire(new aB("onzoomend")), void(i.callback && i.callback(t))) : (e !== p.zoomLevel && i.noZoomAnimation !== !0 && (p.zoomLevel = e, p.fire(new aB("onzoom_changed"))), p.fire(new aB("onmoveend")), i.noZoomAnimation !== !0 && p.fire(new aB("onzoomend")), void(i.callback && i.callback(t)))
                        }
                    })
                }
            },
            zoomScale: function(t) {
                return Math.pow(2, t)
            },
            scaleZoom: function(t) {
                return Math.log(t) / Math.LN2
            },
            panTo: function(t, e) {
                if (e = e || {}, !t || t.equals(this.centerPoint)) return void(e.callback && e.callback());
                var i = this.pointToPixel(t),
                    n = Math.round(this.width / 2),
                    o = Math.round(this.height / 2),
                    a = this._ifUseAnimation(t, this.zoomLevel);
                return e.noAnimation === !0 || a === !1 ? (this._stopAllAnimations(), this._panTo(n - i.x, o - i.y, t), void(e.callback && e.callback())) : void this.flyTo(t, this.zoomLevel, e)
            },
            _panTo: function(t, e, i) {
                var n = this.temp;
                n.operating !== !0 && (n.dragAni && (n.dragAni.stop(!1, {
                    readyToMove: !0
                }), n.dragAni = null), this.dispatchEvent(new aB("onmovestart")), this._setPlatformPosition(t, e, {
                    point: i
                }), this.dispatchEvent(new aB("onmoveend")))
            },
            panBy: function(t, e, i) {
                t = Math.round(t) || 0, e = Math.round(e) || 0, i = i || {}, Math.abs(t) <= this.width && Math.abs(e) <= this.height && i.noAnimation !== !0 ? this._panBy(t, e, i) : (this._panTo(t, e, i.point), i.callback && i.callback())
            },
            _panBy: function(t, e, i) {
                if (this.temp.operating !== !0) {
                    i = i || {}, this.dispatchEvent(new aB("onmovestart"));
                    var n = this,
                        o = n.temp;
                    o.pl = n.offsetX, o.pt = n.offsetY, o.tlPan && o.tlPan.cancel(), o.dragAni && (o.dragAni.stop(!1, {
                        readyToMove: !0
                    }), o.dragAni = null), o.tlPan = new l({
                        fps: i.fps || n.config.fps,
                        duration: i.duration || n.config.actionDuration,
                        transition: i.transition || bq.easeInOutQuad,
                        render: function(i) {
                            this.terminative = n.temp.operating, n.temp.operating || n._setPlatformPosition(t * i, e * i, {
                                initMapOffsetX: o.pl,
                                initMapOffsetY: o.pt
                            })
                        },
                        finish: function() {
                            n.dispatchEvent(new aB("onmoveend")), n.temp.tlPan = !1, n.temp.stopArrow === !0 && (n.temp.stopArrow = !1, 0 !== n.temp.arrow && n._arrow())
                        }
                    })
                }
            },
            _startAnimation: function(t) {
                var e = this._animationInfo,
                    i = this;
                t = t || {}, i._ani && i._ani.stop(!!t.goToEnd, {
                    stopCurrentAnimation: t.stopCurrentAnimation
                }), i._infiniteAni && (i._infiniteAni.stop(), i._infiniteAni = null);
                var n = t.duration || 500,
                    o = t.transition || bq.ease,
                    a = new aB("onanimation_start");
                this.fire(a), t.unstopable && (e = this._animationInfoUnstopable);
                var r = new l({
                    duration: n,
                    transition: o,
                    render: function(n, o) {
                        for (var a in e)
                            if (e.hasOwnProperty(a)) {
                                var r = e[a].current,
                                    s = e[a].diff;
                                i._setValueTick(a, r, s, n)
                            }
                        t.renderCallback && t.renderCallback(n, o)
                    },
                    finish: function(e) {
                        i.fire(new aB("onanimation_end")), t.unstopable ? (i._animationInfoUnstopable = {}, i._unstopableAni = null) : (i._ani = null, i._animationInfo = {}), t.mapNeedCbk && t.mapNeedCbk(), t.callback && t.callback(e)
                    },
                    onStop: function(e) {
                        e = e || {}, i.fire(new aB("onanimation_end")), e.stopCurrentAnimation && (i._animationInfo = {}), i._ani = null, t.mapNeedCbk && t.mapNeedCbk(), t.callback && t.callback(null, {
                            stop: !0
                        })
                    }
                });
                t.unstopable ? i._unstopableAni = r : i._ani = r
            },
            _stopAllAnimations: function(t) {
                t = t || {}, this._ani && (this._ani.stop(!!t.goToEnd, {
                    stopCurrentAnimation: t.stopCurrentAnimation
                }), this._ani = null), this._infiniteAni && (this._infiniteAni.stop(), this._infiniteAni = null)
            },
            _startInfiniteZoomAnimation: function(t) {
                var e = this;
                e._ani && e._ani.stop(!!t.goToEnd, {
                    stopCurrentAnimation: t.stopCurrentAnimation
                }), e._infiniteAni || (this.fire(new aB("onanimation_start")), e._infiniteAni = new l({
                    duration: 1e4,
                    transition: bq.linear,
                    render: function() {
                        var i = e._animationInfo.zoom;
                        return Math.abs(i.current - i.target) < .001 ? (e._setValue("zoom", i.target), void e._infiniteAni.stop()) : (i.current += .35 * (i.target - i.current), e._setValue("zoom", i.current), void(t.renderCallback && t.renderCallback()))
                    },
                    finish: function() {
                        e._infiniteAni = null, e._animationInfo = {}, e.fire(new aB("onanimation_end")), t.callback && t.callback()
                    },
                    onStop: function() {
                        e._infiniteAni = null, e._animationInfo = {}, e.fire(new aB("onanimation_end")), t.callback && t.callback()
                    }
                }))
            },
            _setValue: function(t, e) {
                if ("zoom" === t) {
                    this._preZoomLevel = this.zoomLevel;
                    var i = this._getProperZoom(e);
                    return e = i.zoom, void(e !== this.zoomLevel && (this.zoomLevel = e, 5 > e && this.restrictCenter(this.centerPoint), this.fire(new aB("on" + t + "_changed"))))
                }
                "center" === t && (this.centerPoint = e), this["_" + t] = e, this.fire(new aB("on" + t + "_changed"))
            },
            _setValueTick: function(t, e, i, n) {
                if ("center" === t) {
                    var o = new e1(e.lng + i.lng * n, e.lat + i.lat * n);
                    return void this._setValue(t, o)
                }
                return "zoom" === t ? void this._setValue(t, Math.pow(e, 1 - n) * Math.pow(e + i, n)) : void this._setValue(t, e + i * n)
            },
            setHeading: function(t, e) {
                if (e = e || {}, t === this._heading) return void(e.callback && e.callback());
                var i = d0(this._heading, 360),
                    n = d0(t, 360);
                return n === i ? (this._heading = t, void(e.callback && e.callback())) : e.noAnimation ? (this._setValue("heading", t), void(e.callback && e.callback())) : (e.unstopable ? this._animationInfoUnstopable.heading = {
                    current: this._heading,
                    diff: t - this._heading
                } : this._animationInfo.heading = {
                    current: this._heading,
                    diff: t - this._heading
                }, void this._startAnimation(e))
            },
            resetHeading: function(t) {
                for (var e = this._heading; 0 > e;) e += 360;
                e %= 360, e > 180 && (e -= 360), this._heading = e, t = t || {}, t.unstopable = !0, this.setHeading(0, t)
            },
            getHeading: function() {
                return this._heading
            },
            setTilt: function(t, e) {
                return e = e || {}, t === this._tilt ? void(e.callback && e.callback()) : (t > bU.MAX_TILT && (t = bU.MAX_TILT), e && e.noAnimation ? (this._setValue("tilt", t), void(e.callback && e.callback())) : (this._animationInfo.tilt = {
                    current: this._tilt,
                    diff: t - this._tilt
                }, void this._startAnimation(e)))
            },
            getTilt: function() {
                return this._tilt
            },
            getCenter: function() {
                return this.centerPoint
            },
            getZoom: function() {
                return this.zoomLevel
            },
            getCameraPosition: function(t) {
                t = t || {};
                var e = t.center || this.centerPoint,
                    i = t.zoom || this.zoomLevel,
                    n = "number" == typeof t.heading ? t.heading : this._heading,
                    o = "number" == typeof t.tilt ? t.tilt : this._tilt,
                    a = this._webglMapCamera.generateMVMatrix(e, i, n, o),
                    r = mat4.create(Float32Array);
                return mat4.invert(r, a), this._webglMapCamera.getPosition(r)
            }
        }), dS.MAX_IDLE_TIME = 50, dS.MAX_FRAME_TIME = 6, dS.prototype.runJobs = function(t) {
            if (0 !== this._jobQueue.length) {
                var e = dJ(),
                    i = 0;
                for (t = t || dS.MAX_FRAME_TIME; this._jobQueue.length && t > i;) {
                    var n = this._jobQueue.shift();
                    "invalid" !== n.state && n.call(), i = dJ() - e
                }
            }
        }, dS.prototype.runIdleOnlyJobs = function() {
            if (0 !== this._idleOnlyJobQueue.length)
                for (var t = dJ(), e = 0; this._idleOnlyJobQueue.length && e < dS.MAX_IDLE_TIME;) {
                    var i = this._idleOnlyJobQueue.shift();
                    "invalid" !== i.state && i.call(), e = dJ() - t
                }
        }, dS.prototype.checkIdleRunning = function() {
            this.isIdle && !this.idleWorkTimer && (this.runJobs(), this.runIdleOnlyJobs(), this.idleWorkTimer = setInterval(this._idleWorkerTicker, 50))
        }, dS.prototype.addJob = function(t) {
            this._jobQueue.push(t), this.checkIdleRunning()
        }, dS.prototype.clearJobs = function() {
            this._jobQueue.length = 0, this._idleOnlyJobQueue.length = 0
        }, dS.prototype.addIdleOnlyJob = function(t) {
            this._idleOnlyJobQueue.push(t), this.checkIdleRunning()
        };
        var bi = {};
        ! function(t) {
            if (!e) var e = 1e-6;
            if (!i) var i = "undefined" != typeof Float32Array ? Float32Array : Array;
            if (!n) var n = Math.random;
            var o = {},
                a = Math.PI / 180;
            o.toRadian = function(t) {
                return t * a
            };
            var r = {};
            r.create = function(t) {
                t = t || i;
                var e = new t(2);
                return e[0] = 0, e[1] = 0, e
            }, r.clone = function(t, e) {
                e = e || i;
                var n = new e(2);
                return n[0] = t[0], n[1] = t[1], n
            }, r.fromValues = function(t, e, n) {
                n = n || i;
                var o = new n(2);
                return o[0] = t, o[1] = e, o
            }, r.copy = function(t, e) {
                return t[0] = e[0], t[1] = e[1], t
            }, r.set = function(t, e, i) {
                return t[0] = e, t[1] = i, t
            }, r.add = function(t, e, i) {
                return t[0] = e[0] + i[0], t[1] = e[1] + i[1], t
            }, r.subtract = function(t, e, i) {
                return t[0] = e[0] - i[0], t[1] = e[1] - i[1], t
            }, r.sub = r.subtract, r.multiply = function(t, e, i) {
                return t[0] = e[0] * i[0], t[1] = e[1] * i[1], t
            }, r.mul = r.multiply, r.divide = function(t, e, i) {
                return t[0] = e[0] / i[0], t[1] = e[1] / i[1], t
            }, r.div = r.divide, r.min = function(t, e, i) {
                return t[0] = Math.min(e[0], i[0]), t[1] = Math.min(e[1], i[1]), t
            }, r.max = function(t, e, i) {
                return t[0] = Math.max(e[0], i[0]), t[1] = Math.max(e[1], i[1]), t
            }, r.scale = function(t, e, i) {
                return t[0] = e[0] * i, t[1] = e[1] * i, t
            }, r.scaleAndAdd = function(t, e, i, n) {
                return t[0] = e[0] + i[0] * n, t[1] = e[1] + i[1] * n, t
            }, r.distance = function(t, e) {
                var i = e[0] - t[0],
                    n = e[1] - t[1];
                return Math.sqrt(i * i + n * n)
            }, r.dist = r.distance, r.squaredDistance = function(t, e) {
                var i = e[0] - t[0],
                    n = e[1] - t[1];
                return i * i + n * n
            }, r.sqrDist = r.squaredDistance, r.length = function(t) {
                var e = t[0],
                    i = t[1];
                return Math.sqrt(e * e + i * i)
            }, r.len = r.length, r.squaredLength = function(t) {
                var e = t[0],
                    i = t[1];
                return e * e + i * i
            }, r.sqrLen = r.squaredLength, r.negate = function(t, e) {
                return t[0] = -e[0], t[1] = -e[1], t
            }, r.normalize = function(t, e) {
                var i = e[0],
                    n = e[1],
                    o = i * i + n * n;
                return o > 0 && (o = 1 / Math.sqrt(o), t[0] = e[0] * o, t[1] = e[1] * o), t
            }, r.dot = function(t, e) {
                return t[0] * e[0] + t[1] * e[1]
            }, r.cross = function(t, e, i) {
                var n = e[0] * i[1] - e[1] * i[0];
                return t[0] = t[1] = 0, t[2] = n, t
            }, r.lerp = function(t, e, i, n) {
                var o = e[0],
                    a = e[1];
                return t[0] = o + n * (i[0] - o), t[1] = a + n * (i[1] - a), t
            }, r.random = function(t, e) {
                e = e || 1;
                var i = 2 * n() * Math.PI;
                return t[0] = Math.cos(i) * e, t[1] = Math.sin(i) * e, t
            }, r.transformMat2 = function(t, e, i) {
                var n = e[0],
                    o = e[1];
                return t[0] = i[0] * n + i[2] * o, t[1] = i[1] * n + i[3] * o, t
            }, r.transformMat2d = function(t, e, i) {
                var n = e[0],
                    o = e[1];
                return t[0] = i[0] * n + i[2] * o + i[4], t[1] = i[1] * n + i[3] * o + i[5], t
            }, r.transformMat3 = function(t, e, i) {
                var n = e[0],
                    o = e[1];
                return t[0] = i[0] * n + i[3] * o + i[6], t[1] = i[1] * n + i[4] * o + i[7], t
            }, r.transformMat4 = function(t, e, i) {
                var n = e[0],
                    o = e[1];
                return t[0] = i[0] * n + i[4] * o + i[12], t[1] = i[1] * n + i[5] * o + i[13], t
            }, r.rotate = function(t, e, i, n) {
                var o = e[0] - i[0],
                    a = e[1] - i[1],
                    r = Math.sin(n),
                    s = Math.cos(n);
                return t[0] = o * s - a * r + i[0], t[1] = o * r + a * s + i[1], t
            }, r.forEach = function() {
                var t = r.create();
                return function(e, i, n, o, a, r) {
                    var s, l;
                    for (i || (i = 2), n || (n = 0), l = o ? Math.min(o * i + n, e.length) : e.length, s = n; l > s; s += i) t[0] = e[s], t[1] = e[s + 1], a(t, t, r), e[s] = t[0], e[s + 1] = t[1];
                    return e
                }
            }(), r.str = function(t) {
                return "vec2(" + t[0] + ", " + t[1] + ")"
            }, t.vec2 = r;
            var s = {};
            s.create = function(t) {
                t = t || i;
                var e = new t(3);
                return e[0] = 0, e[1] = 0, e[2] = 0, e
            }, s.clone = function(t, e) {
                e = e || i;
                var n = new e(3);
                return n[0] = t[0], n[1] = t[1], n[2] = t[2], n
            }, s.fromValues = function(t, e, n, o) {
                o = o || i;
                var a = new o(3);
                return a[0] = t, a[1] = e, a[2] = n, a
            }, s.copy = function(t, e) {
                return t[0] = e[0], t[1] = e[1], t[2] = e[2], t
            }, s.set = function(t, e, i, n) {
                return t[0] = e, t[1] = i, t[2] = n, t
            }, s.add = function(t, e, i) {
                return t[0] = e[0] + i[0], t[1] = e[1] + i[1], t[2] = e[2] + i[2], t
            }, s.subtract = function(t, e, i) {
                return t[0] = e[0] - i[0], t[1] = e[1] - i[1], t[2] = e[2] - i[2], t
            }, s.sub = s.subtract, s.multiply = function(t, e, i) {
                return t[0] = e[0] * i[0], t[1] = e[1] * i[1], t[2] = e[2] * i[2], t
            }, s.mul = s.multiply, s.divide = function(t, e, i) {
                return t[0] = e[0] / i[0], t[1] = e[1] / i[1], t[2] = e[2] / i[2], t
            }, s.div = s.divide, s.min = function(t, e, i) {
                return t[0] = Math.min(e[0], i[0]), t[1] = Math.min(e[1], i[1]), t[2] = Math.min(e[2], i[2]), t
            }, s.max = function(t, e, i) {
                return t[0] = Math.max(e[0], i[0]), t[1] = Math.max(e[1], i[1]), t[2] = Math.max(e[2], i[2]), t
            }, s.scale = function(t, e, i) {
                return t[0] = e[0] * i, t[1] = e[1] * i, t[2] = e[2] * i, t
            }, s.scaleAndAdd = function(t, e, i, n) {
                return t[0] = e[0] + i[0] * n, t[1] = e[1] + i[1] * n, t[2] = e[2] + i[2] * n, t
            }, s.distance = function(t, e) {
                var i = e[0] - t[0],
                    n = e[1] - t[1],
                    o = e[2] - t[2];
                return Math.sqrt(i * i + n * n + o * o)
            }, s.dist = s.distance, s.squaredDistance = function(t, e) {
                var i = e[0] - t[0],
                    n = e[1] - t[1],
                    o = e[2] - t[2];
                return i * i + n * n + o * o
            }, s.sqrDist = s.squaredDistance, s.length = function(t) {
                var e = t[0],
                    i = t[1],
                    n = t[2];
                return Math.sqrt(e * e + i * i + n * n)
            }, s.len = s.length, s.squaredLength = function(t) {
                var e = t[0],
                    i = t[1],
                    n = t[2];
                return e * e + i * i + n * n
            }, s.sqrLen = s.squaredLength, s.negate = function(t, e) {
                return t[0] = -e[0], t[1] = -e[1], t[2] = -e[2], t
            }, s.normalize = function(t, e) {
                var i = e[0],
                    n = e[1],
                    o = e[2],
                    a = i * i + n * n + o * o;
                return a > 0 && (a = 1 / Math.sqrt(a), t[0] = e[0] * a, t[1] = e[1] * a, t[2] = e[2] * a), t
            }, s.dot = function(t, e) {
                return t[0] * e[0] + t[1] * e[1] + t[2] * e[2]
            }, s.cross = function(t, e, i) {
                var n = e[0],
                    o = e[1],
                    a = e[2],
                    r = i[0],
                    s = i[1],
                    l = i[2];
                return t[0] = o * l - a * s, t[1] = a * r - n * l, t[2] = n * s - o * r, t
            }, s.lerp = function(t, e, i, n) {
                var o = e[0],
                    a = e[1],
                    r = e[2];
                return t[0] = o + n * (i[0] - o), t[1] = a + n * (i[1] - a), t[2] = r + n * (i[2] - r), t
            }, s.random = function(t, e) {
                e = e || 1;
                var i = 2 * n() * Math.PI,
                    o = 2 * n() - 1,
                    a = Math.sqrt(1 - o * o) * e;
                return t[0] = Math.cos(i) * a, t[1] = Math.sin(i) * a, t[2] = o * e, t
            }, s.transformMat4 = function(t, e, i) {
                var n = e[0],
                    o = e[1],
                    a = e[2];
                return t[0] = i[0] * n + i[4] * o + i[8] * a + i[12], t[1] = i[1] * n + i[5] * o + i[9] * a + i[13], t[2] = i[2] * n + i[6] * o + i[10] * a + i[14], t
            }, s.transformMat3 = function(t, e, i) {
                var n = e[0],
                    o = e[1],
                    a = e[2];
                return t[0] = n * i[0] + o * i[3] + a * i[6], t[1] = n * i[1] + o * i[4] + a * i[7], t[2] = n * i[2] + o * i[5] + a * i[8], t
            }, s.transformQuat = function(t, e, i) {
                var n = e[0],
                    o = e[1],
                    a = e[2],
                    r = i[0],
                    s = i[1],
                    l = i[2],
                    h = i[3],
                    c = h * n + s * a - l * o,
                    u = h * o + l * n - r * a,
                    d = h * a + r * o - s * n,
                    f = -r * n - s * o - l * a;
                return t[0] = c * h + f * -r + u * -l - d * -s, t[1] = u * h + f * -s + d * -r - c * -l, t[2] = d * h + f * -l + c * -s - u * -r, t
            }, s.rotateX = function(t, e, i, n) {
                var o = [],
                    a = [];
                return o[0] = e[0] - i[0], o[1] = e[1] - i[1], o[2] = e[2] - i[2], a[0] = o[0], a[1] = o[1] * Math.cos(n) - o[2] * Math.sin(n), a[2] = o[1] * Math.sin(n) + o[2] * Math.cos(n), t[0] = a[0] + i[0], t[1] = a[1] + i[1], t[2] = a[2] + i[2], t
            }, s.rotateY = function(t, e, i, n) {
                var o = [],
                    a = [];
                return o[0] = e[0] - i[0], o[1] = e[1] - i[1], o[2] = e[2] - i[2], a[0] = o[2] * Math.sin(n) + o[0] * Math.cos(n), a[1] = o[1], a[2] = o[2] * Math.cos(n) - o[0] * Math.sin(n), t[0] = a[0] + i[0], t[1] = a[1] + i[1], t[2] = a[2] + i[2], t
            }, s.rotateZ = function(t, e, i, n) {
                var o = [],
                    a = [];
                return o[0] = e[0] - i[0], o[1] = e[1] - i[1], o[2] = e[2] - i[2], a[0] = o[0] * Math.cos(n) - o[1] * Math.sin(n), a[1] = o[0] * Math.sin(n) + o[1] * Math.cos(n), a[2] = o[2], t[0] = a[0] + i[0], t[1] = a[1] + i[1], t[2] = a[2] + i[2], t
            }, s.forEach = function() {
                var t = s.create();
                return function(e, i, n, o, a, r) {
                    var s, l;
                    for (i || (i = 3), n || (n = 0), l = o ? Math.min(o * i + n, e.length) : e.length, s = n; l > s; s += i) t[0] = e[s], t[1] = e[s + 1], t[2] = e[s + 2], a(t, t, r), e[s] = t[0], e[s + 1] = t[1], e[s + 2] = t[2];
                    return e
                }
            }(), s.str = function(t) {
                return "vec3(" + t[0] + ", " + t[1] + ", " + t[2] + ")"
            }, t.vec3 = s;
            var l = {};
            l.create = function(t) {
                t = t || i;
                var e = new t(4);
                return e[0] = 0, e[1] = 0, e[2] = 0, e[3] = 0, e
            }, l.clone = function(t, e) {
                e = e || i;
                var n = new e(4);
                return n[0] = t[0], n[1] = t[1], n[2] = t[2], n[3] = t[3], n
            }, l.fromValues = function(t, e, n, o, a) {
                a = a || i;
                var r = new a(4);
                return r[0] = t, r[1] = e, r[2] = n, r[3] = o, r
            }, l.copy = function(t, e) {
                return t[0] = e[0], t[1] = e[1], t[2] = e[2], t[3] = e[3], t
            }, l.set = function(t, e, i, n, o) {
                return t[0] = e, t[1] = i, t[2] = n, t[3] = o, t
            }, l.add = function(t, e, i) {
                return t[0] = e[0] + i[0], t[1] = e[1] + i[1], t[2] = e[2] + i[2], t[3] = e[3] + i[3], t
            }, l.subtract = function(t, e, i) {
                return t[0] = e[0] - i[0], t[1] = e[1] - i[1], t[2] = e[2] - i[2], t[3] = e[3] - i[3], t
            }, l.sub = l.subtract, l.multiply = function(t, e, i) {
                return t[0] = e[0] * i[0], t[1] = e[1] * i[1], t[2] = e[2] * i[2], t[3] = e[3] * i[3], t
            }, l.mul = l.multiply, l.divide = function(t, e, i) {
                return t[0] = e[0] / i[0], t[1] = e[1] / i[1], t[2] = e[2] / i[2], t[3] = e[3] / i[3], t
            }, l.div = l.divide, l.min = function(t, e, i) {
                return t[0] = Math.min(e[0], i[0]), t[1] = Math.min(e[1], i[1]), t[2] = Math.min(e[2], i[2]), t[3] = Math.min(e[3], i[3]), t
            }, l.max = function(t, e, i) {
                return t[0] = Math.max(e[0], i[0]), t[1] = Math.max(e[1], i[1]), t[2] = Math.max(e[2], i[2]), t[3] = Math.max(e[3], i[3]), t
            }, l.scale = function(t, e, i) {
                return t[0] = e[0] * i, t[1] = e[1] * i, t[2] = e[2] * i, t[3] = e[3] * i, t
            }, l.scaleAndAdd = function(t, e, i, n) {
                return t[0] = e[0] + i[0] * n, t[1] = e[1] + i[1] * n, t[2] = e[2] + i[2] * n, t[3] = e[3] + i[3] * n, t
            }, l.distance = function(t, e) {
                var i = e[0] - t[0],
                    n = e[1] - t[1],
                    o = e[2] - t[2],
                    a = e[3] - t[3];
                return Math.sqrt(i * i + n * n + o * o + a * a)
            }, l.dist = l.distance, l.squaredDistance = function(t, e) {
                var i = e[0] - t[0],
                    n = e[1] - t[1],
                    o = e[2] - t[2],
                    a = e[3] - t[3];
                return i * i + n * n + o * o + a * a
            }, l.sqrDist = l.squaredDistance, l.length = function(t) {
                var e = t[0],
                    i = t[1],
                    n = t[2],
                    o = t[3];
                return Math.sqrt(e * e + i * i + n * n + o * o)
            }, l.len = l.length, l.squaredLength = function(t) {
                var e = t[0],
                    i = t[1],
                    n = t[2],
                    o = t[3];
                return e * e + i * i + n * n + o * o
            }, l.sqrLen = l.squaredLength, l.negate = function(t, e) {
                return t[0] = -e[0], t[1] = -e[1], t[2] = -e[2], t[3] = -e[3], t
            }, l.normalize = function(t, e) {
                var i = e[0],
                    n = e[1],
                    o = e[2],
                    a = e[3],
                    r = i * i + n * n + o * o + a * a;
                return r > 0 && (r = 1 / Math.sqrt(r), t[0] = e[0] * r, t[1] = e[1] * r, t[2] = e[2] * r, t[3] = e[3] * r), t
            }, l.dot = function(t, e) {
                return t[0] * e[0] + t[1] * e[1] + t[2] * e[2] + t[3] * e[3]
            }, l.lerp = function(t, e, i, n) {
                var o = e[0],
                    a = e[1],
                    r = e[2],
                    s = e[3];
                return t[0] = o + n * (i[0] - o), t[1] = a + n * (i[1] - a), t[2] = r + n * (i[2] - r), t[3] = s + n * (i[3] - s), t
            }, l.random = function(t, e) {
                return e = e || 1, t[0] = n(), t[1] = n(), t[2] = n(), t[3] = n(), l.normalize(t, t), l.scale(t, t, e), t
            }, l.transformMat4 = function(t, e, i) {
                var n = e[0],
                    o = e[1],
                    a = e[2],
                    r = e[3];
                return t[0] = i[0] * n + i[4] * o + i[8] * a + i[12] * r, t[1] = i[1] * n + i[5] * o + i[9] * a + i[13] * r, t[2] = i[2] * n + i[6] * o + i[10] * a + i[14] * r, t[3] = i[3] * n + i[7] * o + i[11] * a + i[15] * r, t
            }, l.transformQuat = function(t, e, i) {
                var n = e[0],
                    o = e[1],
                    a = e[2],
                    r = i[0],
                    s = i[1],
                    l = i[2],
                    h = i[3],
                    c = h * n + s * a - l * o,
                    u = h * o + l * n - r * a,
                    d = h * a + r * o - s * n,
                    f = -r * n - s * o - l * a;
                return t[0] = c * h + f * -r + u * -l - d * -s, t[1] = u * h + f * -s + d * -r - c * -l, t[2] = d * h + f * -l + c * -s - u * -r, t
            }, l.forEach = function() {
                var t = l.create();
                return function(e, i, n, o, a, r) {
                    var s, l;
                    for (i || (i = 4), n || (n = 0), l = o ? Math.min(o * i + n, e.length) : e.length, s = n; l > s; s += i) t[0] = e[s], t[1] = e[s + 1], t[2] = e[s + 2], t[3] = e[s + 3], a(t, t, r), e[s] = t[0], e[s + 1] = t[1], e[s + 2] = t[2], e[s + 3] = t[3];
                    return e
                }
            }(), l.str = function(t) {
                return "vec4(" + t[0] + ", " + t[1] + ", " + t[2] + ", " + t[3] + ")"
            }, t.vec4 = l;
            var h = {};
            h.create = function(t) {
                t = t || i;
                var e = new t(4);
                return e[0] = 1, e[1] = 0, e[2] = 0, e[3] = 1, e
            }, h.clone = function(t, e) {
                e = e || i;
                var n = new e(4);
                return n[0] = t[0], n[1] = t[1], n[2] = t[2], n[3] = t[3], n
            }, h.copy = function(t, e) {
                return t[0] = e[0], t[1] = e[1], t[2] = e[2], t[3] = e[3], t
            }, h.identity = function(t) {
                return t[0] = 1, t[1] = 0, t[2] = 0, t[3] = 1, t
            }, h.transpose = function(t, e) {
                if (t === e) {
                    var i = e[1];
                    t[1] = e[2], t[2] = i
                } else t[0] = e[0], t[1] = e[2], t[2] = e[1], t[3] = e[3];
                return t
            }, h.invert = function(t, e) {
                var i = e[0],
                    n = e[1],
                    o = e[2],
                    a = e[3],
                    r = i * a - o * n;
                return r ? (r = 1 / r, t[0] = a * r, t[1] = -n * r, t[2] = -o * r, t[3] = i * r, t) : null
            }, h.adjoint = function(t, e) {
                var i = e[0];
                return t[0] = e[3], t[1] = -e[1], t[2] = -e[2], t[3] = i, t
            }, h.determinant = function(t) {
                return t[0] * t[3] - t[2] * t[1]
            }, h.multiply = function(t, e, i) {
                var n = e[0],
                    o = e[1],
                    a = e[2],
                    r = e[3],
                    s = i[0],
                    l = i[1],
                    h = i[2],
                    c = i[3];
                return t[0] = n * s + a * l, t[1] = o * s + r * l, t[2] = n * h + a * c, t[3] = o * h + r * c, t
            }, h.mul = h.multiply, h.rotate = function(t, e, i) {
                var n = e[0],
                    o = e[1],
                    a = e[2],
                    r = e[3],
                    s = Math.sin(i),
                    l = Math.cos(i);
                return t[0] = n * l + a * s, t[1] = o * l + r * s, t[2] = n * -s + a * l, t[3] = o * -s + r * l, t
            }, h.scale = function(t, e, i) {
                var n = e[0],
                    o = e[1],
                    a = e[2],
                    r = e[3],
                    s = i[0],
                    l = i[1];
                return t[0] = n * s, t[1] = o * s, t[2] = a * l, t[3] = r * l, t
            }, h.str = function(t) {
                return "mat2(" + t[0] + ", " + t[1] + ", " + t[2] + ", " + t[3] + ")"
            }, h.frob = function(t) {
                return Math.sqrt(Math.pow(t[0], 2) + Math.pow(t[1], 2) + Math.pow(t[2], 2) + Math.pow(t[3], 2))
            }, h.LDU = function(t, e, i, n) {
                return t[2] = n[2] / n[0], i[0] = n[0], i[1] = n[1], i[3] = n[3] - t[2] * i[1], [t, e, i]
            }, t.mat2 = h;
            var c = {};
            c.create = function(t) {
                t = t || i;
                var e = new t(16);
                return e[0] = 1, e[1] = 0, e[2] = 0, e[3] = 0, e[4] = 0, e[5] = 1, e[6] = 0, e[7] = 0, e[8] = 0, e[9] = 0, e[10] = 1, e[11] = 0, e[12] = 0, e[13] = 0, e[14] = 0, e[15] = 1, e
            }, c.clone = function(t) {
                var e = new i(16);
                return e[0] = t[0], e[1] = t[1], e[2] = t[2], e[3] = t[3], e[4] = t[4], e[5] = t[5], e[6] = t[6], e[7] = t[7], e[8] = t[8], e[9] = t[9], e[10] = t[10], e[11] = t[11], e[12] = t[12], e[13] = t[13], e[14] = t[14], e[15] = t[15], e
            }, c.copy = function(t, e) {
                return t[0] = e[0], t[1] = e[1], t[2] = e[2], t[3] = e[3], t[4] = e[4], t[5] = e[5], t[6] = e[6], t[7] = e[7], t[8] = e[8], t[9] = e[9], t[10] = e[10], t[11] = e[11], t[12] = e[12], t[13] = e[13], t[14] = e[14], t[15] = e[15], t
            }, c.identity = function(t) {
                return t[0] = 1, t[1] = 0, t[2] = 0, t[3] = 0, t[4] = 0, t[5] = 1, t[6] = 0, t[7] = 0, t[8] = 0, t[9] = 0, t[10] = 1, t[11] = 0, t[12] = 0, t[13] = 0, t[14] = 0, t[15] = 1, t
            }, c.transpose = function(t, e) {
                if (t === e) {
                    var i = e[1],
                        n = e[2],
                        o = e[3],
                        a = e[6],
                        r = e[7],
                        s = e[11];
                    t[1] = e[4], t[2] = e[8], t[3] = e[12], t[4] = i, t[6] = e[9], t[7] = e[13], t[8] = n, t[9] = a, t[11] = e[14], t[12] = o, t[13] = r, t[14] = s
                } else t[0] = e[0], t[1] = e[4], t[2] = e[8], t[3] = e[12], t[4] = e[1], t[5] = e[5], t[6] = e[9], t[7] = e[13], t[8] = e[2], t[9] = e[6], t[10] = e[10], t[11] = e[14], t[12] = e[3], t[13] = e[7], t[14] = e[11], t[15] = e[15];
                return t
            }, c.invert = function(t, e) {
                var i = e[0],
                    n = e[1],
                    o = e[2],
                    a = e[3],
                    r = e[4],
                    s = e[5],
                    l = e[6],
                    h = e[7],
                    c = e[8],
                    u = e[9],
                    d = e[10],
                    f = e[11],
                    p = e[12],
                    m = e[13],
                    g = e[14],
                    _ = e[15],
                    v = i * s - n * r,
                    y = i * l - o * r,
                    b = i * h - a * r,
                    w = n * l - o * s,
                    x = n * h - a * s,
                    T = o * h - a * l,
                    M = c * m - u * p,
                    L = c * g - d * p,
                    C = c * _ - f * p,
                    I = u * g - d * m,
                    S = u * _ - f * m,
                    D = d * _ - f * g,
                    P = v * D - y * S + b * I + w * C - x * L + T * M;
                return P ? (P = 1 / P, t[0] = (s * D - l * S + h * I) * P, t[1] = (o * S - n * D - a * I) * P, t[2] = (m * T - g * x + _ * w) * P, t[3] = (d * x - u * T - f * w) * P, t[4] = (l * C - r * D - h * L) * P, t[5] = (i * D - o * C + a * L) * P, t[6] = (g * b - p * T - _ * y) * P, t[7] = (c * T - d * b + f * y) * P, t[8] = (r * S - s * C + h * M) * P, t[9] = (n * C - i * S - a * M) * P, t[10] = (p * x - m * b + _ * v) * P, t[11] = (u * b - c * x - f * v) * P, t[12] = (s * L - r * I - l * M) * P, t[13] = (i * I - n * L + o * M) * P, t[14] = (m * y - p * w - g * v) * P, t[15] = (c * w - u * y + d * v) * P, t) : null
            }, c.adjoint = function(t, e) {
                var i = e[0],
                    n = e[1],
                    o = e[2],
                    a = e[3],
                    r = e[4],
                    s = e[5],
                    l = e[6],
                    h = e[7],
                    c = e[8],
                    u = e[9],
                    d = e[10],
                    f = e[11],
                    p = e[12],
                    m = e[13],
                    g = e[14],
                    _ = e[15];
                return t[0] = s * (d * _ - f * g) - u * (l * _ - h * g) + m * (l * f - h * d), t[1] = -(n * (d * _ - f * g) - u * (o * _ - a * g) + m * (o * f - a * d)), t[2] = n * (l * _ - h * g) - s * (o * _ - a * g) + m * (o * h - a * l), t[3] = -(n * (l * f - h * d) - s * (o * f - a * d) + u * (o * h - a * l)), t[4] = -(r * (d * _ - f * g) - c * (l * _ - h * g) + p * (l * f - h * d)), t[5] = i * (d * _ - f * g) - c * (o * _ - a * g) + p * (o * f - a * d), t[6] = -(i * (l * _ - h * g) - r * (o * _ - a * g) + p * (o * h - a * l)), t[7] = i * (l * f - h * d) - r * (o * f - a * d) + c * (o * h - a * l), t[8] = r * (u * _ - f * m) - c * (s * _ - h * m) + p * (s * f - h * u), t[9] = -(i * (u * _ - f * m) - c * (n * _ - a * m) + p * (n * f - a * u)), t[10] = i * (s * _ - h * m) - r * (n * _ - a * m) + p * (n * h - a * s), t[11] = -(i * (s * f - h * u) - r * (n * f - a * u) + c * (n * h - a * s)), t[12] = -(r * (u * g - d * m) - c * (s * g - l * m) + p * (s * d - l * u)), t[13] = i * (u * g - d * m) - c * (n * g - o * m) + p * (n * d - o * u), t[14] = -(i * (s * g - l * m) - r * (n * g - o * m) + p * (n * l - o * s)), t[15] = i * (s * d - l * u) - r * (n * d - o * u) + c * (n * l - o * s), t
            }, c.determinant = function(t) {
                var e = t[0],
                    i = t[1],
                    n = t[2],
                    o = t[3],
                    a = t[4],
                    r = t[5],
                    s = t[6],
                    l = t[7],
                    h = t[8],
                    c = t[9],
                    u = t[10],
                    d = t[11],
                    f = t[12],
                    p = t[13],
                    m = t[14],
                    g = t[15],
                    _ = e * r - i * a,
                    v = e * s - n * a,
                    y = e * l - o * a,
                    b = i * s - n * r,
                    w = i * l - o * r,
                    x = n * l - o * s,
                    T = h * p - c * f,
                    M = h * m - u * f,
                    L = h * g - d * f,
                    C = c * m - u * p,
                    I = c * g - d * p,
                    S = u * g - d * m;
                return _ * S - v * I + y * C + b * L - w * M + x * T
            }, c.multiply = function(t, e, i) {
                var n = e[0],
                    o = e[1],
                    a = e[2],
                    r = e[3],
                    s = e[4],
                    l = e[5],
                    h = e[6],
                    c = e[7],
                    u = e[8],
                    d = e[9],
                    f = e[10],
                    p = e[11],
                    m = e[12],
                    g = e[13],
                    _ = e[14],
                    v = e[15],
                    y = i[0],
                    b = i[1],
                    w = i[2],
                    x = i[3];
                return t[0] = y * n + b * s + w * u + x * m, t[1] = y * o + b * l + w * d + x * g, t[2] = y * a + b * h + w * f + x * _, t[3] = y * r + b * c + w * p + x * v, y = i[4], b = i[5], w = i[6], x = i[7], t[4] = y * n + b * s + w * u + x * m, t[5] = y * o + b * l + w * d + x * g, t[6] = y * a + b * h + w * f + x * _, t[7] = y * r + b * c + w * p + x * v, y = i[8], b = i[9], w = i[10], x = i[11], t[8] = y * n + b * s + w * u + x * m, t[9] = y * o + b * l + w * d + x * g, t[10] = y * a + b * h + w * f + x * _, t[11] = y * r + b * c + w * p + x * v, y = i[12], b = i[13], w = i[14], x = i[15], t[12] = y * n + b * s + w * u + x * m, t[13] = y * o + b * l + w * d + x * g, t[14] = y * a + b * h + w * f + x * _, t[15] = y * r + b * c + w * p + x * v, t
            }, c.mul = c.multiply, c.translate = function(t, e, i) {
                var n, o, a, r, s, l, h, c, u, d, f, p, m = i[0],
                    g = i[1],
                    _ = i[2];
                return e === t ? (t[12] = e[0] * m + e[4] * g + e[8] * _ + e[12], t[13] = e[1] * m + e[5] * g + e[9] * _ + e[13], t[14] = e[2] * m + e[6] * g + e[10] * _ + e[14], t[15] = e[3] * m + e[7] * g + e[11] * _ + e[15]) : (n = e[0], o = e[1], a = e[2], r = e[3], s = e[4], l = e[5], h = e[6], c = e[7], u = e[8], d = e[9], f = e[10], p = e[11], t[0] = n, t[1] = o, t[2] = a, t[3] = r, t[4] = s, t[5] = l, t[6] = h, t[7] = c, t[8] = u, t[9] = d, t[10] = f, t[11] = p, t[12] = n * m + s * g + u * _ + e[12], t[13] = o * m + l * g + d * _ + e[13], t[14] = a * m + h * g + f * _ + e[14], t[15] = r * m + c * g + p * _ + e[15]), t
            }, c.scale = function(t, e, i) {
                var n = i[0],
                    o = i[1],
                    a = i[2];
                return t[0] = e[0] * n, t[1] = e[1] * n, t[2] = e[2] * n, t[3] = e[3] * n, t[4] = e[4] * o, t[5] = e[5] * o, t[6] = e[6] * o, t[7] = e[7] * o, t[8] = e[8] * a, t[9] = e[9] * a, t[10] = e[10] * a, t[11] = e[11] * a, t[12] = e[12], t[13] = e[13], t[14] = e[14], t[15] = e[15], t
            }, c.rotate = function(t, i, n, o) {
                var a, r, s, l, h, c, u, d, f, p, m, g, _, v, y, b, w, x, T, M, L, C, I, S, D = o[0],
                    P = o[1],
                    z = o[2],
                    A = Math.sqrt(D * D + P * P + z * z);
                return Math.abs(A) < e ? null : (A = 1 / A, D *= A, P *= A, z *= A, a = Math.sin(n), r = Math.cos(n), s = 1 - r, l = i[0], h = i[1], c = i[2], u = i[3], d = i[4], f = i[5], p = i[6], m = i[7], g = i[8], _ = i[9], v = i[10], y = i[11], b = D * D * s + r, w = P * D * s + z * a, x = z * D * s - P * a, T = D * P * s - z * a, M = P * P * s + r, L = z * P * s + D * a, C = D * z * s + P * a, I = P * z * s - D * a, S = z * z * s + r, t[0] = l * b + d * w + g * x, t[1] = h * b + f * w + _ * x, t[2] = c * b + p * w + v * x, t[3] = u * b + m * w + y * x, t[4] = l * T + d * M + g * L, t[5] = h * T + f * M + _ * L, t[6] = c * T + p * M + v * L, t[7] = u * T + m * M + y * L, t[8] = l * C + d * I + g * S, t[9] = h * C + f * I + _ * S, t[10] = c * C + p * I + v * S, t[11] = u * C + m * I + y * S, i !== t && (t[12] = i[12], t[13] = i[13], t[14] = i[14], t[15] = i[15]), t)
            }, c.rotateX = function(t, e, i) {
                var n = Math.sin(i),
                    o = Math.cos(i),
                    a = e[4],
                    r = e[5],
                    s = e[6],
                    l = e[7],
                    h = e[8],
                    c = e[9],
                    u = e[10],
                    d = e[11];
                return e !== t && (t[0] = e[0], t[1] = e[1], t[2] = e[2], t[3] = e[3], t[12] = e[12], t[13] = e[13], t[14] = e[14], t[15] = e[15]), t[4] = a * o + h * n, t[5] = r * o + c * n, t[6] = s * o + u * n, t[7] = l * o + d * n, t[8] = h * o - a * n, t[9] = c * o - r * n, t[10] = u * o - s * n, t[11] = d * o - l * n, t
            }, c.rotateY = function(t, e, i) {
                var n = Math.sin(i),
                    o = Math.cos(i),
                    a = e[0],
                    r = e[1],
                    s = e[2],
                    l = e[3],
                    h = e[8],
                    c = e[9],
                    u = e[10],
                    d = e[11];
                return e !== t && (t[4] = e[4], t[5] = e[5], t[6] = e[6], t[7] = e[7], t[12] = e[12], t[13] = e[13], t[14] = e[14], t[15] = e[15]), t[0] = a * o - h * n, t[1] = r * o - c * n, t[2] = s * o - u * n, t[3] = l * o - d * n, t[8] = a * n + h * o, t[9] = r * n + c * o, t[10] = s * n + u * o, t[11] = l * n + d * o, t
            }, c.rotateZ = function(t, e, i) {
                var n = Math.sin(i),
                    o = Math.cos(i),
                    a = e[0],
                    r = e[1],
                    s = e[2],
                    l = e[3],
                    h = e[4],
                    c = e[5],
                    u = e[6],
                    d = e[7];
                return e !== t && (t[8] = e[8], t[9] = e[9], t[10] = e[10], t[11] = e[11], t[12] = e[12], t[13] = e[13], t[14] = e[14], t[15] = e[15]), t[0] = a * o + h * n, t[1] = r * o + c * n, t[2] = s * o + u * n, t[3] = l * o + d * n, t[4] = h * o - a * n, t[5] = c * o - r * n, t[6] = u * o - s * n, t[7] = d * o - l * n, t
            }, c.fromRotationTranslation = function(t, e, i) {
                var n = e[0],
                    o = e[1],
                    a = e[2],
                    r = e[3],
                    s = n + n,
                    l = o + o,
                    h = a + a,
                    c = n * s,
                    u = n * l,
                    d = n * h,
                    f = o * l,
                    p = o * h,
                    m = a * h,
                    g = r * s,
                    _ = r * l,
                    v = r * h;
                return t[0] = 1 - (f + m), t[1] = u + v, t[2] = d - _, t[3] = 0, t[4] = u - v, t[5] = 1 - (c + m), t[6] = p + g, t[7] = 0, t[8] = d + _, t[9] = p - g, t[10] = 1 - (c + f), t[11] = 0, t[12] = i[0], t[13] = i[1], t[14] = i[2], t[15] = 1, t
            }, c.fromQuat = function(t, e) {
                var i = e[0],
                    n = e[1],
                    o = e[2],
                    a = e[3],
                    r = i + i,
                    s = n + n,
                    l = o + o,
                    h = i * r,
                    c = n * r,
                    u = n * s,
                    d = o * r,
                    f = o * s,
                    p = o * l,
                    m = a * r,
                    g = a * s,
                    _ = a * l;
                return t[0] = 1 - u - p, t[1] = c + _, t[2] = d - g, t[3] = 0, t[4] = c - _, t[5] = 1 - h - p, t[6] = f + m, t[7] = 0, t[8] = d + g, t[9] = f - m, t[10] = 1 - h - u, t[11] = 0, t[12] = 0, t[13] = 0, t[14] = 0, t[15] = 1, t
            }, c.frustum = function(t, e, i, n, o, a, r) {
                var s = 1 / (i - e),
                    l = 1 / (o - n),
                    h = 1 / (a - r);
                return t[0] = 2 * a * s, t[1] = 0, t[2] = 0, t[3] = 0, t[4] = 0, t[5] = 2 * a * l, t[6] = 0, t[7] = 0, t[8] = (i + e) * s, t[9] = (o + n) * l, t[10] = (r + a) * h, t[11] = -1, t[12] = 0, t[13] = 0, t[14] = r * a * 2 * h, t[15] = 0, t
            }, c.perspective = function(t, e, i, n, o) {
                var a = 1 / Math.tan(e / 2),
                    r = 1 / (n - o);
                return t[0] = a / i, t[1] = 0, t[2] = 0, t[3] = 0, t[4] = 0, t[5] = a, t[6] = 0, t[7] = 0, t[8] = 0, t[9] = 0, t[10] = (o + n) * r, t[11] = -1, t[12] = 0, t[13] = 0, t[14] = 2 * o * n * r, t[15] = 0, t
            }, c.ortho = function(t, e, i, n, o, a, r) {
                var s = 1 / (e - i),
                    l = 1 / (n - o),
                    h = 1 / (a - r);
                return t[0] = -2 * s, t[1] = 0, t[2] = 0, t[3] = 0, t[4] = 0, t[5] = -2 * l, t[6] = 0, t[7] = 0, t[8] = 0, t[9] = 0, t[10] = 2 * h, t[11] = 0, t[12] = (e + i) * s, t[13] = (o + n) * l, t[14] = (r + a) * h, t[15] = 1, t
            }, c.lookAt = function(t, i, n, o) {
                var a, r, s, l, h, u, d, f, p, m, g = i[0],
                    _ = i[1],
                    v = i[2],
                    y = o[0],
                    b = o[1],
                    w = o[2],
                    x = n[0],
                    T = n[1],
                    M = n[2];
                return Math.abs(g - x) < e && Math.abs(_ - T) < e && Math.abs(v - M) < e ? c.identity(t) : (d = g - x, f = _ - T, p = v - M, m = 1 / Math.sqrt(d * d + f * f + p * p), d *= m, f *= m, p *= m, a = b * p - w * f, r = w * d - y * p, s = y * f - b * d, m = Math.sqrt(a * a + r * r + s * s), m ? (m = 1 / m, a *= m, r *= m, s *= m) : (a = 0, r = 0, s = 0), l = f * s - p * r, h = p * a - d * s, u = d * r - f * a, m = Math.sqrt(l * l + h * h + u * u), m ? (m = 1 / m, l *= m, h *= m, u *= m) : (l = 0, h = 0, u = 0), t[0] = a, t[1] = l, t[2] = d, t[3] = 0, t[4] = r, t[5] = h, t[6] = f, t[7] = 0, t[8] = s, t[9] = u, t[10] = p, t[11] = 0, t[12] = -(a * g + r * _ + s * v), t[13] = -(l * g + h * _ + u * v), t[14] = -(d * g + f * _ + p * v), t[15] = 1, t)
            }, c.str = function(t) {
                return "mat4(" + t[0] + ", " + t[1] + ", " + t[2] + ", " + t[3] + ", " + t[4] + ", " + t[5] + ", " + t[6] + ", " + t[7] + ", " + t[8] + ", " + t[9] + ", " + t[10] + ", " + t[11] + ", " + t[12] + ", " + t[13] + ", " + t[14] + ", " + t[15] + ")"
            }, c.frob = function(t) {
                return Math.sqrt(Math.pow(t[0], 2) + Math.pow(t[1], 2) + Math.pow(t[2], 2) + Math.pow(t[3], 2) + Math.pow(t[4], 2) + Math.pow(t[5], 2) + Math.pow(t[6], 2) + Math.pow(t[6], 2) + Math.pow(t[7], 2) + Math.pow(t[8], 2) + Math.pow(t[9], 2) + Math.pow(t[10], 2) + Math.pow(t[11], 2) + Math.pow(t[12], 2) + Math.pow(t[13], 2) + Math.pow(t[14], 2) + Math.pow(t[15], 2))
            }, t.mat4 = c
        }(window), x.extend(bY.prototype, {
            createLayer: function(t, e) {
                var i = this.result.bkData;
                e = e || {}, i[t] || (i[t] = [
                    [],
                    [],
                    []
                ]), i[t].dataType = e.dataType || 2, i[t].png8 = e.png8 || !1, i[t].clipTile = e.clipTile || !1
            },
            removeLayer: function(t) {
                var e = this.result.bkData;
                e[t] = null
            },
            getResult: function() {
                return this.result
            },
            setData: function(t, e, i) {
                var n = this.result.bkData,
                    o = n[e] ? n[e][i] : null;
                if (o) {
                    for (var a = 0; a < o.length; a++)
                        if (o[a].key && o[a].key === t.key) return void(o[a] = t);
                    o.push(t)
                }
            },
            setLabelData: function(t) {
                this.result.tileLabels = t
            },
            getLabelData: function() {
                return this.result.tileLabels
            },
            setOverlayData: function(t, e) {
                this.result.eleData[e] && (this.result.eleData[e] = t)
            },
            clearLabelOverlayData: function() {
                this.result.eleData[2] = [], this.result.eleData[3] = [], this.result.eleData[4] = []
            },
            clearData: function(t) {
                var e = this.result.bkData;
                if ("number" == typeof t) return void(e[t] && (e[t][0] = [], e[t][1] = [], e[t][2] = []));
                for (var i = 0; i < e.length; i++) e[i] && (e[i][0] = [], e[i][1] = [], e[i][2] = [])
            },
            sortThumbData: function(t) {
                var e = this.result.bkData,
                    i = e[t];
                i && i[0] && i[0].length > 0 && i[0].sort(function(t, e) {
                    return t.tileInfo.useZoom - e.tileInfo.useZoom
                })
            }
        });
        var dx = function() {
                function t(t) {
                    return d[0] = t, f[0]
                }

                function e(i) {
                    if (0 === i.indexOf("gradient")) return e([0, 0, 0, 0]);
                    var n = i[3] << 24 | i[2] << 16 | i[1] << 8 | i[0],
                        o = t(4278190079 & n);
                    return o
                }

                function i(t, e) {
                    var i;
                    return i = e % 2 === 0 ? [-t[1], t[0]] : [t[1], -t[0]]
                }

                function n(t, e, n) {
                    var o, a = i(t, e);
                    return n === m ? a : (o = 4 === e || 5 === e ? [a[0] - t[0], a[1] - t[1]] : [a[0] + t[0], a[1] + t[1]], n === p && vec2.normalize(o, o), o)
                }

                function o(t, e) {
                    return Math.sqrt(Math.pow(t[0] - e[0], 2) + Math.pow(t[1] - e[1], 2))
                }

                function a(t, e, i, n) {
                    var o = vec2.dot(t, e);
                    if (i === _ || i === g) {
                        if ((0 === n || 1 === n) && o > 0) return !0;
                        if ((2 === n || 3 === n) && 0 > o) return !0
                    }
                    return (0 === n || 1 === n) && 0 > o ? !0 : (2 === n || 3 === n) && o > 0 ? !0 : !1
                }

                function r(t, e, n) {
                    var o, a = i(t, e),
                        r = t,
                        s = n,
                        l = [];
                    vec2.normalize(l, [r[0] + s[0], r[1] + s[1]]);
                    var h = vec2.dot(a, [-l[1], l[0]]);
                    Math.abs(h) < .1 && (h = 1);
                    var c = 1 / h;
                    o = [-l[1] * c, l[0] * c];
                    var u = vec2.dot(t, o);
                    return 0 > u && vec2.negate(o, o), {
                        cos2: u,
                        offset: o
                    }
                }

                function s(t, e, n, o) {
                    var r, s, l, h = i(t, e);
                    if (0 === e || 1 === e ? (r = n, s = t) : (r = t, s = n), !r || !s) return h;
                    var c = [r[0] + s[0], r[1] + s[1]];
                    0 === c[0] && 0 === c[1] ? vec2.normalize(c, s) : vec2.normalize(c, c);
                    var u = a(c, h, o, e);
                    if (u) return h;
                    var d = vec2.dot(h, [-c[1], c[0]]);
                    Math.abs(d) < .1 && (d = 1);
                    var f = 1 / d;
                    return l = [-c[1] * f, c[0] * f]
                }

                function l(t, e, i, n, o, a, r, s, l, u) {
                    var d, f = 0,
                        p = !1;
                    d = a.length / v - 1, h(e[0], t[0], i[0], o, n, 4, s, l, void 0, a, u), d++, f++, h(e[0], t[0], i[0], o, n, 5, s, l, void 0, a, u), d++, f++;
                    for (var m = 0; m < t.length; m++) h(e[m], t[m], i[m], o, n, 0, s, l, t[m - 1], a, u), c(r, ++d, ++f, p), h(e[m], t[m], i[m], o, n, 1, s, l, t[m - 1], a, u), c(r, ++d, ++f, p), h(e[m + 1], t[m], i[m + 1], o, n, 2, s, l, t[m + 1], a, u), c(r, ++d, ++f, p), h(e[m + 1], t[m], i[m + 1], o, n, 3, s, l, t[m + 1], a, u), c(r, ++d, ++f, p), n === g && m !== t.length - 1 && (h(e[m + 1], t[m], i[m + 1], o, n, 8, s, l, t[m + 1], a, u), c(r, ++d, ++f, p), p = p ? !1 : !0);
                    h(e[e.length - 1], t[t.length - 1], i[e.length - 1], o, n, 6, s, l, void 0, a, u), c(r, ++d, ++f, p), h(e[e.length - 1], t[t.length - 1], i[e.length - 1], o, n, 7, s, l, void 0, a, u), c(r, ++d, ++f, p)
                }

                function h(t, e, i, o, a, l, h, c, u, d, f) {
                    var p, m = l % 2 === 0 ? 1 : -1;
                    if (4 === l || 5 === l || 6 === l || 7 === l) p = n(e, l, o);
                    else if (0 === l || 1 === l || 2 === l || 3 === l) p = s(e, l, u, a);
                    else if (8 === l) {
                        var g = r(e, l, u);
                        p = g.offset, vec2.normalize(p, p);
                        var _ = g.cos2;
                        0 > _ && (m = -m)
                    }
                    d[d.length] = 10 * t[0], d[d.length] = 10 * t[1], d[d.length] = p[0] * c * 10, d[d.length] = p[1] * c * 10, d[d.length] = h, d[d.length] = m, d[d.length] = 0, d[d.length] = f || 0, d[d.length] = i
                }

                function c(t, e, i, n) {
                    i % 2 === 0 ? n ? (t[t.length] = e - 2, t[t.length] = e - 1, t[t.length] = e) : (t[t.length] = e - 1, t[t.length] = e - 2, t[t.length] = e) : n ? (t[t.length] = e - 1, t[t.length] = e - 2, t[t.length] = e) : (t[t.length] = e - 2, t[t.length] = e - 1, t[t.length] = e)
                }
                var u = new Int8Array(4),
                    d = new Int32Array(u.buffer, 0, 1),
                    f = new Float32Array(u.buffer, 0, 1),
                    p = 0,
                    m = 1,
                    g = 1,
                    _ = 2,
                    v = 9;
                return {
                    getVertexCount: function(t, e) {
                        return e === g ? 5 * t - 2 : 4 * t
                    },
                    buildData: function(t, i, n, a, r, s, h, c) {
                        for (var u = [], d = 0, f = [0], p = 0; p < t.length; p++)
                            if (p > 0 && (d += o(t[p], t[p - 1]), f.push(10 * d)), p !== t.length - 1) {
                                var m = [t[p + 1][0] - t[p][0], t[p + 1][1] - t[p][1]],
                                    g = [];
                                0 === m[0] && 0 === m[1] ? g = [0, 0] : vec2.normalize(g, m), u[u.length] = [g[0], g[1]]
                            }
                        return l(u, t, f, i, n, a, r, e(s), h, c)
                    },
                    toTileSolidLineVertices: function(t, e) {
                        for (var i = new Float32Array(t.length / v * 5), n = new Int16Array(i.buffer), o = 0, a = 0, r = 0; r < t.length; r += v) n[o] = ~~t[r], n[o + 1] = ~~t[r + 1], n[o + 2] = ~~t[r + 2], n[o + 3] = ~~t[r + 3], i[a + 2] = t[r + 4], n[o + 6] = t[r + 5], n[o + 7] = e ? e : 0, n[o + 8] = t[r + 7], n[o + 9] = 0, o += 10, a += 5;
                        return i
                    }
                }
            }(),
            c2 = 1,
            eo = 2,
            dU = {
                drawIndex: 0,
                devicePixelRatio: ay(),
                zoomState: 1,
                curViewTilesInfo: null,
                iconSetImg: null,
                LAST_CALC_ZOOM: -1,
                LAST_LOAD_VECTOR_ZOOM_CHANGE: !1,
                lastCollisionTestTime: 0,
                remove: function() {
                    this.tileCache.clear()
                },
                initDrawData: function() {
                    this.drawIndex = this.zIndex, this.map._featureMgr.createLayer(this.drawIndex, {
                        dataType: this.dataType,
                        png8: this.png8,
                        clipTile: this.clipTile
                    })
                },
                destroyDrawData: function() {
                    this.map._featureMgr.removeLayer(this.drawIndex)
                },
                setZIndex: function(t) {
                    this.zIndex = t
                },
                getTileKey: function(t, e) {
                    e = e || {};
                    var i = "number" == typeof e.useZoom ? e.useZoom : t.useZoom,
                        n = t.style || this.mapStyleId || "default";
                    return this.mapType + "_" + n + "_" + t.col + "_" + t.row + "_" + t.zoom + "_" + i
                },
                getTileRenderDataKey: function(t) {
                    var e = t.col,
                        i = t.zoom,
                        n = t.baseTileSize;
                    return e = cC.calcLoopParam(e, i, n).col, this.mapType + "_" + e + "_" + t.row + "_" + i + "_" + t.useZoom
                },
                getTileUnits: function(t) {
                    var e = this.map,
                        i = be[e.getMapType()],
                        n = i.baseUnits * Math.pow(2, i.zoomLevelBase - t);
                    return n
                },
                getTilesUrl: function(t, e, i) {
                    var n = t.x,
                        o = t.y,
                        a = ad("ditu", "normal"),
                        r = a.ver,
                        s = a.udt;
                    n = cC.calcLoopParam(n, e, i).col;
                    var l = be.B_NORMAL_MAP.vectorTileUrls,
                        h = Math.abs(n + o) % l.length,
                        c = l[h];
                    window.offLineIPAddress && (l = [window.offLineIPAddress + "pvd/"], c = l[0]);
                    var u = "x=" + n + "&y=" + o + "&z=" + Math.floor(e),
                        d = this.devicePixelRatio > 1 ? "&scaler=2" : "",
                        f = "&textimg=1";
                    "canvas" === this.map.config.textRenderType && (f = "&textimg=0");
                    var p = this.map.getMapStyleId();
                    dm.mapStyleNameIdPair[p] && (u += "&styleId=" + dm.mapStyleNameIdPair[p]), u += "&styles=pl" + f + d + "&v=" + r + "&udt=" + s + "&json=0";
                    var m = c + "?qt=vtile&param=" + window.encodeURIComponent(ei(u));
                    return m
                },
                getRasterTilesUrl: function(t, e, i) {
                    var n = be[this.map.mapType],
                        o = this.map.getMapStyleId(),
                        a = n.tileUrls[Math.abs(e + t) % n.tileUrls.length] + "?qt=tile&x=" + t + "&y=" + e + "&z=" + i + !dm.mapStyleNameIdPair[o] ? "" : "&styleId=" + dm.mapStyleNameIdPair[o] + "&styles=pl&udt=" + this.normalUdt + "&scaler=" + this.scaler + "&p=1";
                    return a = a.replace(/-(\d+)/gi, "M$1")
                },
                getZoomState: function() {
                    var t = this.map,
                        e = t.getZoom(),
                        i = e - this.lastZoom;
                    return i > 0 ? this.zoomState = 1 : 0 > i && (this.zoomState = -1), this.lastZoom = e, this.zoomState
                },
                releaseOutViewTileData: function(t) {
                    for (var e = this.map._workerMgr.releasePendingData(t), i = 0, n = e.length; n > i; i++) {
                        var o = this.getTileKey(e[i]);
                        this.tileCache.removeData(o)
                    }
                },
                loadLayerData: function(t, e, i) {
                    this.hasZoomChange = i, this.curViewTilesInfo = t, this.mapStyleId = this.map.getMapStyleId(), this.releaseOutViewTileData(t);
                    var n = this.getZoomState();
                    this.dataType === eo ? e ? this.getVectorLayerDataFromCache(t, n) : this.loadVectorLayerData(t) : this.loadRasterLayerData(t, e)
                },
                getVectorLayerDataFromCache: function(t, e) {
                    if (this.map.temp.isPermitSpotOver = !1, this.tileLabels = [], this.baseLayer === !0) {
                        var i = this.map._customLabelMgr.virtualTile;
                        i && i.label && this.tileLabels.push(i.label)
                    }
                    this.thumbCache = {};
                    for (var n = -1, o = 0, a = t.length; a > o; o++) {
                        var r = t[o],
                            s = r.col,
                            l = r.row,
                            h = r.zoom,
                            c = this._getTileTexImgKey(r),
                            u = r.useZoom;
                        n = h;
                        var d = this.getTileKey(r),
                            f = this.tileCache.getData(d);
                        if (f && "ready" === f.status) {
                            if (this.map._featureMgr.setData(f, this.drawIndex, 2), f.label)
                                if ("ready" === f.label.status) {
                                    if (f.label.tileInfo = f.tileInfo, this.tileLabels.push(f.label), f.label.textureSources && f.label.textureSources[u] && this.map._webglMapScene) {
                                        var p = this.map._webglMapScene._painter;
                                        p._labelTextureAtlasOffset[c] || p._addToAsyncJob(f.label.textureSources[u])
                                    }
                                } else "processing" !== f.label.status && this.processLabelData(f)
                        } else {
                            var m = {
                                tileInfo: r,
                                dataType: eo,
                                key: d
                            };
                            this.map._featureMgr.setData(m, this.drawIndex, 2), this.useThumbData && this.setThumbData(s, l, h, u, e)
                        }
                    }
                    this.tileLabels.labelZoom = n, this.updateLabels(e);
                    var g = this.map.getZoom(),
                        _ = Math.floor(g),
                        v = g - _,
                        y = Math.floor(this.LAST_CALC_ZOOM),
                        b = this.LAST_CALC_ZOOM - y,
                        w = !1;
                    this.hasZoomChange ? (Math.abs(g - this.LAST_CALC_ZOOM) >= .5 ? w = !0 : .5 > v && b >= .5 ? w = !0 : v >= .5 && .5 > b && (w = !0), w && this.cacheDataCollideLabels(0), this.LAST_CALC_ZOOM = g) : this.tileLabels.length > 0 && this.cacheDataCollideLabels(30)
                },
                loadVectorLayerData: function(t) {
                    function e(t, n) {
                        var o = i.tileCache.getData(n);
                        if (o) {
                            if (!t || t.error) {
                                var a = new aB("ontileloaderror");
                                return t = t || {}, a.error = t.error || "", a.message = t.message || "", i.map.fire(a), o.status = "init", o.reloadTimer = setTimeout(function() {
                                    o.retry < 3 ? (o.retry++, o.status = "loading", i.loadVectorTileData(t.tileInfo, e)) : i.tileCache.removeData(n)
                                }, 4e3), i.map._featureMgr.clearData(i.drawIndex), i._checkTilesLoaded(), void i.getVectorLayerDataFromCache(i.curViewTilesInfo, i.getZoomState())
                            }
                            o.reloadTimer && (clearTimeout(o.reloadTimer), o.reloadTimer = null), i.callbackDataQueue.push([t, n]), i.processDataTimer || (i.processDataTimer = setTimeout(function() {
                                for (; i.callbackDataQueue.length > 0;) {
                                    var t = i.callbackDataQueue.shift();
                                    i.vectorTileDataCbk(t[0], t[1]), i._checkTilesLoaded()
                                }
                                i.map._featureMgr.clearData(i.drawIndex), i.getVectorLayerDataFromCache(i.curViewTilesInfo, i.getZoomState()), i.processDataTimer = null
                            }, 200))
                        }
                    }
                    this.map.temp.isPermitSpotOver = !1;
                    for (var i = this, n = 0, o = t.length; o > n; n++) {
                        var a = t[n],
                            r = this.getTileKey(a),
                            s = this.tileCache.getData(r);
                        if (s || (s = {
                                status: "init",
                                tileInfo: a,
                                dataType: eo,
                                key: r,
                                retry: 0
                            }), "ready" !== s.status && "loading" !== s.status) {
                            this.numLoading++, s.status = "loading", this.tileCache.setData(r, s);
                            var l = this.getProcessedLabelZoom(a);
                            l && (a.processedLabelZooms = l), this.loadVectorTileData(a, e)
                        }
                    }
                },
                setThumbData: function(t, e, i, n, o) {
                    1 === o ? this._findParentZoomTile(t, e, i, n, 8) === !1 && this._findChildZoomTile(t, e, i, n, 3) : -1 === o && this._findChildZoomTile(t, e, i, n, 3) === !1 && this._findParentZoomTile(t, e, i, n, 8), this.map._featureMgr.sortThumbData(this.drawIndex)
                },
                _findParentZoomTile: function(t, e, i, n, o) {
                    for (var a = be[this.getMapType()], r = a.minDataZoom, s = t, l = e, h = i, c = n, u = 1; o >= u; u++) {
                        var d = this.tileType.getParentTile(s, l, h, c, r);
                        if (null !== d) {
                            var f = this.getTileKey(d),
                                p = this.tileCache.getData(f);
                            if (p && "ready" === p.status) {
                                if (this.thumbCache[f]) continue;
                                return this.map._featureMgr.setData(p, this.drawIndex, 0), this.thumbCache[f] = !0, !0
                            }
                            s = d.col, l = d.row, h = d.zoom, c = d.useZoom
                        }
                    }
                    return !1
                },
                _findChildZoomTile: function(t, e, i, n, o) {
                    for (var a = be[this.getMapType()], r = a.maxDataZoom, s = t, l = e, h = i, c = n, u = !0, d = 1; o >= d; d++) {
                        var f = !1,
                            p = this.tileType.getChildTiles(s, l, h, c, r, d);
                        if (p) {
                            for (var m = 0; m < p.length; m++) {
                                var g = this.getTileKey(p[m]),
                                    _ = this.tileCache.getData(g);
                                _ && "ready" === _.status ? (this.thumbCache[g] || (this.map._featureMgr.setData(_, this.drawIndex, 1), this.thumbCache[g] = !0), f = !0) : u = !1
                            }
                            if (f) break
                        }
                    }
                    return u
                },
                loadVectorTileData: function(t, e) {
                    var i = t.col,
                        n = t.row,
                        o = t.zoom,
                        a = t.baseTileSize,
                        r = this.getTilesUrl(new cN(i, n), o, a);
                    if (r) {
                        var s = this.getTileKey(t);
                        if (aP(this.map), !this.processData) return void this.map._workerMgr.loadTileData(r, t, s, e);
                        var e = "cbk" + s.replace(/-/g, "_"),
                            l = this;
                        aI[e] = function(i) {
                            var n = function(e) {
                                return function() {
                                    e.tileInfo = t;
                                    var i = l.processData(e);
                                    if (i.road) {
                                        for (var n = {
                                                tileInfo: t,
                                                renderData: {
                                                    base: []
                                                },
                                                status: "ready",
                                                key: s,
                                                mapType: l.mapType
                                            }, o = [], a = [], r = 0; r < i.road.length; r++) {
                                            for (var h = i.road[r], c = 0; c < h.length; c++) {
                                                var u = h[c],
                                                    d = [];
                                                o.length / 7 + u[0].length / 2 > 65536 && (n.renderData.base.push({
                                                    type: "line",
                                                    data: [dx.toTileSolidLineVertices(o, 4e3), new Uint16Array(a)]
                                                }), o = [], a = []);
                                                for (var f = 0; f < u[0].length; f += 2) d[d.length] = [u[0][f], u[0][f + 1]];
                                                var p = u[3];
                                                dx.buildData(d, u[1], u[2], o, a, p, u[4], r + 20, !1)
                                            }
                                            n.renderData.base.push({
                                                type: "line",
                                                data: [dx.toTileSolidLineVertices(o, 4e3), new Uint16Array(a)]
                                            })
                                        }
                                        l.tileCache.setData(s, n), l.map._featureMgr.clearData(l.drawIndex), l.getVectorLayerDataFromCache(l.curViewTilesInfo, l.getZoomState()), l.map.dispatchEvent(new aB("onrefresh"))
                                    }
                                }
                            }(i);
                            l.map.jobScheduler.addJob(n), delete aI[e]
                        }, r += "&fn=" + encodeURIComponent(cX + "." + e), eW.load(r)
                    }
                },
                vectorTileDataCbk: function(t, e) {
                    var i = new aB("ontileloaded");
                    i.perfStat = t.perfStat || [];
                    var n = this.map;
                    n.fire(i);
                    var o = t.tileInfo,
                        a = o.col,
                        r = o.row,
                        s = o.zoom,
                        l = o.baseTileSize,
                        h = this.tileCache.getData(e);
                    if (h) {
                        this.showLabel || (t.label = null), h.renderData = t, h.tileInfo = o;
                        var c = cC.calcLoopParam(a, s, l),
                            u = c.geoOffsetX;
                        h.tileInfo.loopOffsetX = u, h.status = "ready", h.mapType = this.mapType, this.tileCache.setData(e, h), h.label = t.label, t.label = null, t.indoorData && n._indoorMgr && n._indoorMgr.setData(t.indoorData);
                        var d = "id_" + a + "_" + r + "_" + s;
                        if (!this.curViewTilesInfo[d]) return void n.fire(new aB("ontilenotinview"));
                        this.processLabelData(h), n._displayOptions.indoor === !0 && t.indoorData && n._indoorMgr && n._indoorMgr.currentUid && this._refreshIndoorData(n._indoorMgr.currentUid, n._indoorMgr.currentFloor);
                        var f = new aB("onrefresh");
                        f.source = "webgllayer", this.map.dispatchEvent(f)
                    }
                },
                clearAllCollisionsCache: function() {
                    var t = this.tileCache.getAllData();
                    for (var e in t) {
                        var i = t[e].data;
                        i && this.labelProcessor.clearCollisionCache(i.label)
                    }
                },
                _refreshIndoorData: function(t, e) {
                    for (var i = this.map._indoorMgr.getIndoorData(t), n = i.tileKeys, o = Math.floor(this.map.getZoom()), a = 0; a < n.length; a++) {
                        var r = n[a],
                            s = this.tileCache.getData(r);
                        if (s) {
                            var l = s.renderData;
                            l.indoorBase = [], l.indoorBaseContour = [], l.indoorBorder3D = [], l.indoorArea3D = [], s.label.indoorLabel = [], this.labelProcessor.clearCollisionCache(s.label);
                            for (var h in l.indoorData)
                                if ("tileInfo" !== h) {
                                    var c = l.indoorData[h],
                                        u = c.defaultFloor;
                                    if (h === t && (u = e, c.currentFloor = e), c.floors[u]) {
                                        if (c.floors[u].base)
                                            for (var d = 0; d < c.floors[u].base.length; d++) l.indoorBase.push(c.floors[u].base[d]);
                                        if (c.floors[u].contour)
                                            for (var d = 0; d < c.floors[u].contour.length; d++) l.indoorBaseContour.push(c.floors[u].contour[d]);
                                        c.floors[u].indoorBorder3D && l.indoorBorder3D.push(c.floors[u].indoorBorder3D), c.floors[u].area3D && l.indoorArea3D.push(c.floors[u].area3D), c.floors[u].pois && (s.label.indoorLabel = s.label.indoorLabel.concat(c.floors[u].pois))
                                    }
                                }
                            this.updateAllIconsTextureCoords(s);
                            var f = this;
                            this.labelProcessor.loadIconImages(s, function(t) {
                                f.updateAllIconsTextureCoords(t)
                            });
                            var p = r.split("_"),
                                m = parseInt(p[p.length - 1], 10);
                            m === o && f.map._featureMgr.setData(s, this.drawIndex, 2)
                        }
                    }
                    this.dataBackCollideLabels(), this.map.dispatchEvent(new aB("onrefresh"))
                },
                _removeIndoorData: function(t) {
                    if (t.indoorData)
                        for (var e in t.indoorData) "tileInfo" !== e && this.map._indoorMgr.removeData(e, t.key)
                },
                getProcessedLabelZoom: function(t) {
                    var e = b3.baseZoomInfo[t.zoom];
                    if (!e) return !1;
                    for (var i = [], n = 0; n < e.length; n++) {
                        var o = this.getTileKey(t, {
                                useZoom: e[n]
                            }),
                            a = this.tileCache.getData(o);
                        a && "ready" === a.status && a.label && "ready" === a.label.status && i.push(e[n])
                    }
                    return i.length ? i : !1
                },
                getSameZoomDataFromCache: function(t) {
                    for (var e = b3.baseZoomInfo[t.zoom], i = 0; i < e.length; i++) {
                        var n = this.getTileKey(t, {
                            useZoom: e[i]
                        });
                        if (t.useZoom !== e[i]) {
                            var o = this.tileCache.getData(n);
                            if (o && "ready" === o.status && o.label && "ready" === o.label.status) return o
                        }
                    }
                    return !1
                },
                hasSameLabelData: function(t, e) {
                    for (var i = 0; i < e.length; i++)
                        if (e[i].key === t) return !0;
                    return !1
                },
                getDataByFloorName: function(t, e) {
                    for (var i = 0; i < t.length; i++)
                        if (t[i].floorName === e) return t[i];
                    return null
                },
                mergeIndoorLabelData: function(t, e) {
                    for (var i in t)
                        if ("tileInfo" !== i && e[i])
                            for (var n = t[i].floors, o = e[i].floors, a = 0; a < n.length; a++) {
                                var r = n[a],
                                    s = r.floorName,
                                    l = this.getDataByFloorName(o, s);
                                l && (l.pois ? (l.pois = l.pois.concat(r.pois), r.pois = l.pois) : l.pois = r.pois)
                            }
                },
                mergeSameZoomLabelData: function(t) {
                    var e = t.label;
                    if (e) {
                        var i = t.tileInfo,
                            n = this.getSameZoomDataFromCache(i);
                        if (n) {
                            var o = n.label;
                            if (o) {
                                for (var a = 0; a < e.fixedLabel.length; a++) this.hasSameLabelData(e.fixedLabel[a].key, o.fixedLabel) || (o.hasNewData = !0, o.fixedLabel.push(e.fixedLabel[a]));
                                for (var a = 0; a < e.lineLabel.length; a++) this.hasSameLabelData(e.lineLabel[a].key, o.lineLabel) || (o.hasNewData = !0, o.lineLabel.push(e.lineLabel[a]));
                                for (var a = 0; a < e.indoorLabel.length; a++) this.hasSameLabelData(e.indoorLabel[a].key, o.indoorLabel) || (o.hasNewData = !0, o.indoorLabel.push(e.indoorLabel[a]));
                                t.label = o, n.renderData.indoorData && t.renderData.indoorData && this.mergeIndoorLabelData(t.renderData.indoorData, n.renderData.indoorData)
                            }
                        }
                    }
                },
                processLabelData: function(t) {
                    if (t.label && "processing" !== t.label.status) {
                        t.label.status = "processing", this.map._displayOptions.indoor === !1 && t.label && (t.label.indoorLabel && (t.label.indoorLabel.length = 0), t.label.indoorTextureSources && (t.label.indoorTextureSources.length = 0));
                        var e = this;
                        if (e.updateAllIconsTextureCoords(t), this.labelProcessor.loadIconImages(t, function(t) {
                                e.updateAllIconsTextureCoords(t)
                            }), "canvas" !== this.map.config.textRenderType) {
                            var i = t.label.textImageBitmap || t.label.textImgStr,
                                n = t.label.indoorTextImageBitmap || t.label.indoorTextImgStr;
                            this.labelProcessor.loadImgByStr(i, n, function(i, n) {
                                var o = t.label.textureHeight,
                                    a = t.label.indoorTextureHeight;
                                t.label.textureHeight = void 0, t.label.indoorTextureHeight = void 0;
                                var r = t.tileInfo;
                                e.mergeSameZoomLabelData(t);
                                var s = t.label;
                                s.textImgStr = "", s.indoorTextImgStr && (s.indoorTextImgStr = ""), s.textureHeights || (s.textureHeights = []), s.textureHeights[r.useZoom] = o, s.indoorTextureHeights || (s.indoorTextureHeights = []), s.indoorTextureHeights[r.useZoom] = a;
                                var l = e._getTileTexImgKey(r);
                                e._doWorkAfterLabelImageLoad(t, i, n, l)
                            })
                        } else {
                            this.labelProcessor.drawLabelsOnCanvas(t, function(i, n) {
                                var o = t.tileInfo;
                                e.mergeSameZoomLabelData(t), i && (t.label.textureHeights || (t.label.textureHeights = []), t.label.textureHeights[o.useZoom] = i.height), n && (t.label.indoorTextureHeights || (t.label.indoorTextureHeights = []), t.label.indoorTextureHeights[o.useZoom] = n.height);
                                var a = e._getTileTexImgKey(o);
                                e._doWorkAfterLabelImageLoad(t, i, n, a)
                            })
                        }
                    }
                },
                _getTileTexImgKey: function(t) {
                    var e = t.style || this.mapStyleId || "default",
                        i = e + "_" + t.col + "_" + t.row + "_" + t.zoom;
                    return "canvas" === this.map.config.textRenderType && (i += "_" + t.useZoom), i
                },
                _doWorkAfterLabelImageLoad: function(t, e, i, n) {
                    var o = this,
                        a = t.label;
                    if (a.tileInfo = t.tileInfo, a.status = "ready", e || i) {
                        var r = a.tileInfo;
                        if (e && (e.id = n, a.textureSources || (a.textureSources = []), a.textureSources[r.useZoom] = e), i && (i.id = n + "_indoor", a.indoorTextureSources || (a.indoorTextureSources = []), a.indoorTextureSources[r.useZoom] = i), o.map._webglMapScene) {
                            var s = o.map._webglMapScene._painter;
                            e && s._addToAsyncJob(a.textureSources[r.useZoom])
                        }
                    }
                    t.custom !== !0 && o.tileLabels.push(a), o.collisionTimer || (o.collisionTimer = setTimeout(function() {
                        o.dataBackCollideLabels(), o.collisionTimer = null
                    }, 300))
                },
                _updateIconTextureCoords: function(t, e) {
                    if (t)
                        for (var i = this.map, n = 0; n < t.length; n++) {
                            var o = t[n];
                            if (o.iconPos && i._webglMapScene) {
                                var a = i._webglMapScene._painter,
                                    r = e + "_" + o.iconPos.iconType;
                                o.iconPos.texcoord = a._iconTextureAtlasCoords[r] || null
                            }
                        }
                },
                updateAllIconsTextureCoords: function(t) {
                    if (t) {
                        if (t.label) {
                            var e = t.tileInfo.style;
                            this._updateIconTextureCoords(t.label.fixedLabel, e), this._updateIconTextureCoords(t.label.indoorLabel, e)
                        }
                    } else {
                        var i = this.tileCache.getAllData();
                        for (var n in i) {
                            var o = i[n].data;
                            if ("ready" === o.status && o.label) {
                                var e = o.tileInfo.style;
                                this._updateIconTextureCoords(o.label.fixedLabel, e), this._updateIconTextureCoords(o.label.indoorLabel, e)
                            }
                        }
                    }
                    this.updateLabels(), this.map.dispatchEvent(new aB("onrefresh"))
                },
                cacheDataCollideLabels: function(t) {
                    function e() {
                        i.cacheLabelTimer = null;
                        var t, e = i.map.getTilt(),
                            o = i.map.getHeading() % 360;
                        if (0 === i.tileLabels.length || 1 === i.tileLabels.length && 0 === i.tileLabels[0].tileInfo.zoom) t = n.getLabelData(), t.length > 0 && (t = i.labelProcessor.collisionTest(t, -1));
                        else {
                            if (e || o) return this._collisionTimer && (e && Date.now() - i.lastCollisionTestTime > 500 ? i.lastCollisionTestTime = Date.now() : clearTimeout(this._collisionTimer)), void(this._collisionTimer = setTimeout(function() {
                                t = i.labelProcessor.collisionTest(i.tileLabels), t && n.setLabelData(t), i.updateLabels(), i.map.dispatchEvent(new aB("onrefresh")), i._collisionTimer = null
                            }, 60));
                            t = i.labelProcessor.getCachedLabels(i.tileLabels)
                        }
                        t && n.setLabelData(t), i.updateLabels(), i.map.dispatchEvent(new aB("onrefresh"))
                    }
                    var i = this,
                        n = this.map._featureMgr;
                    if (t) {
                        if (i.cacheLabelTimer) return;
                        i.cacheLabelTimer = setTimeout(function() {
                            e()
                        }, t)
                    } else clearTimeout(i.cacheLabelTimer), e()
                },
                dataBackCollideLabels: function() {
                    var t = this;
                    if (!t.tileLabels || 0 !== t.tileLabels.length) {
                        var e;
                        t.labelProcessor.calcLabelsCollision(t.tileLabels), e = t.labelProcessor.getCachedLabels(t.tileLabels), e && t.map._featureMgr.setLabelData(e), t.updateLabels(), t.map.dispatchEvent(new aB("onrefresh")), d5() && this.labelProcessor._refreshSpotData()
                    }
                },
                updateLabels: function() {
                    var t = this.map,
                        e = t._featureMgr,
                        i = e.getLabelData();
                    if (i.length > 0) {
                        var n = t.getZoom();
                        if (i.labelZoom - n < 3) {
                            this.labelProcessor.updateLabels(i);
                            var o = this.labelProcessor.fixDataFormat(i);
                            e.setOverlayData(o[0], 2), e.setOverlayData(o[1], 3), e.setOverlayData(o[2], 4)
                        } else e.clearLabelOverlayData();
                        t.temp.isPermitSpotOver = !1, this.labelProcessor.curSpotAdded = !1
                    }
                },
                loadRasterLayerData: function(t, e) {
                    if (e)
                        for (var i = 0, n = t.length; n > i; i++) {
                            var o = t[i],
                                a = this.getTileKey(o),
                                r = this.tileCache.getData(a);
                            r && "ready" === r.status && this.map._featureMgr.setData(r, this.drawIndex, 2)
                        } else
                            for (var i = 0, n = t.length; n > i; i++) {
                                var o = t[i],
                                    a = this.getTileKey(o),
                                    r = this.tileCache.getData(a);
                                if (!r) {
                                    this.tileCache.setData(a, {});
                                    var s = this;
                                    this.loadRasterTileData(o, function(t, e) {
                                        s.rasterTileDataCbk(t, e)
                                    })
                                }
                            }
                },
                loadRasterTileData: function(t, e) {
                    var i = t.col,
                        n = t.row,
                        o = t.zoom,
                        a = this.getTilesUrl(new cN(i, n), o);
                    if (a) {
                        var r = this.getTileKey(t),
                            s = this.loadTileImage(a, r, e);
                        s.tileInfo = t
                    }
                },
                loadTileImage: function(t, e, i) {
                    var n = new Image;
                    return n.crossOrigin = "anonymous", n.onload = function() {
                        i && i(this, e)
                    }, n.onerror = function() {
                        i && i(null, e)
                    }, n.src = t, n
                },
                rasterTileDataCbk: function(t, e) {
                    if (!t) return void this.tileCache.removeData(e);
                    var i = t.tileInfo,
                        n = i.col,
                        o = i.row,
                        a = i.zoom,
                        r = this.tileCache.getData(e);
                    if (r) {
                        var s = cC.calcLoopParam(n, a),
                            l = s.geoOffsetX;
                        t.tileInfo.loopOffsetX = l, r.textureSource = t, r.dataType = c2, r.tileInfo = i, r.renderData = {
                            vertexAll: [0, 0, 0, 0, 0, 256, 0, 0, 1, 0, 256, 256, 0, 1, 1, 0, 0, 0, 0, 0, 256, 256, 0, 1, 1, 0, 256, 0, 0, 1]
                        }, r.status = "ready", this.tileCache.setData(e, r);
                        var h = "id_" + n + "_" + o + "_" + a,
                            c = !1;
                        if (this.curViewTilesInfo[h] && (r.dataType = c2, r.png8 = this.png8 || !1, this.map._featureMgr.setData(r, this.drawIndex, 2), c = !0), c) {
                            var u = new aB("onrefresh");
                            u.source = "webgllayer", this.map.dispatchEvent(u)
                        }
                    }
                },
                _checkTilesLoaded: function() {
                    this.numLoading--, this.map.firstTileLoad === !1 && (this.map.dispatchEvent(new aB("onfirsttilesloaded")), this.map.firstTileLoad = !0);
                    var t = this;
                    0 === this.numLoading && (this._checkLoadedTimer && (clearTimeout(this._checkLoadedTimer), this._checkLoadedTimer = null), this._checkLoadedTimer = setTimeout(function() {
                        0 === t.numLoading && t.map.dispatchEvent(new aB("ontilesloaded")), t._checkLoadedTimer = null
                    }, 60))
                },
                isClickableLabel: function(t) {
                    return t.isDel ? !1 : t.zoom > 9 && !t.guid ? !1 : t.zoom <= 9 && !t.name && !t.guid ? !1 : !0
                }
            },
            bg = 5,
            cz = 4,
            eZ = 3,
            dv = 2,
            fd = 1,
            cB = 0;
        x.extend(r.prototype, {
            _loadIcons: function(t, e) {
                var i = 0,
                    n = this,
                    o = this._map.config.style;
                for (var a in t) {
                    i++;
                    var r = new Image;
                    r.id = a, r.crossOrigin = "anonymous", r.onload = function() {
                        n._iconCache[this.id].loaded = !0, i--, 0 === i && e(), this.onload = null
                    }, r.onerror = function() {
                        n._iconCache[this.id] = null, i--, 0 === i && e(), this.onerror = null
                    };
                    var s = dm.getImageFullUrl(o, a + ".png");
                    r.src = s, this._iconCache[a] = {
                        loaded: !1,
                        image: r
                    }
                }
            },
            _getEmptyDrawingCanvas: function() {
                for (var t = 0; t < this._drawingCanvasPool.length; t++)
                    if (this._drawingCanvasPool[t]._free === !0) return this._drawingCanvasPool[t]._free = !1, this._drawingCanvasPool[t];
                var e = this._createNewDrawingCanvas();
                return this._drawingCanvasPool.push(e), e._free = !1, e
            },
            _createNewDrawingCanvas: function() {
                var t = H("canvas");
                t.width = 512, t.height = this._drawingCanvasHeight, t._free = !0, t._id = aI.getGUID();
                var e = t.getContext("2d");
                return e.textBaseline = "bottom", e.lineJoin = "round", t
            },
            drawLabelsOnCanvas: function(t, e) {
                var i = t.label.fixedLabel.slice(0),
                    n = t.label.lineLabel.slice(0),
                    o = t.label.indoorLabel.slice(0);
                if (0 === i.length && 0 === n.length && 0 === o.length) return void e();
                var a = function(t, e) {
                    return t.styleId - e.styleId
                };
                i.sort(a), n.sort(a), o.sort(a);
                var r = {},
                    s = this._getEmptyDrawingCanvas(),
                    l = s.getContext("2d");
                l.clearRect(0, 0, s.width, s.height);
                var h = 0,
                    c = null,
                    u = 0;
                if (i.length > 0) {
                    for (; u < i.length && !i[u].styleText[0];) u++;
                    i[u] && i[u].styleText[0] && (c = i[u].styleText[0].fontSize + 2 * i[u].styleText[0].haloSize)
                }
                if (null === c && o.length > 0) {
                    for (u = 0; u < o.length && !o[u].styleText[0];) u++;
                    o[u] && o[u].styleText[0] && (c = o[u].styleText[0].fontSize + 2 * o[u].styleText[0].haloSize)
                }
                if (null === c && n.length > 0) {
                    for (u = 0; u < n.length && !n[u].styleText[0];) u++;
                    n[u] && n[u].styleText[0] && (c = n[u].styleText[0].fontSize + 2 * n[u].styleText[0].haloSize)
                }
                if (null === c || isNaN(c)) return void e();
                for (var d = 0, f = c, p = {}, m = 0, g = [], _ = 0; _ < i.length; _++) {
                    var v = i[_],
                        y = v.name,
                        b = v.styleText;
                    if (y && 0 !== b.length) {
                        var w = v.icon;
                        if (!v.textOnIcon || this._iconCache[w] && this._iconCache[w].loaded !== !1) {
                            var x = this._drawEachText(l, v, h, d, f, c, r);
                            x && (d = x.curX, f = x.curY, c = x.curLineHeight, h = x.styleId)
                        } else g.push(v), m++, p[w] || (p[w] = !0)
                    }
                }
                var x = this._drawEachTypeOfLabels(l, o, h, d, f, c, r);
                h = x.curStyleId, d = x.curX, f = x.curY, c = x.curLineHeight;
                var x = this._drawEachTypeOfLabels(l, n, h, d, f, c, r);
                if (h = x.curStyleId, d = x.curX, f = x.curY, c = x.curLineHeight, m > 0) {
                    var T = this;
                    return void this._loadIcons(p, function() {
                        x = T._drawEachTypeOfLabels(l, g, h, d, f, c, r), h = x.curStyleId, d = x.curX, f = x.curY, c = x.curLineHeight;
                        var a = T._generateEachLabelCanvas(s, f, i, n, o, t);
                        e(a[0], a[1])
                    })
                }
                var M = this._generateEachLabelCanvas(s, f, i, n, o, t);
                e(M[0], M[1])
            },
            drawCustomLabelsOnCanvas: function(t, e) {
                if (0 === t.length) return void e();
                var i, n = 0;
                i = t[0].styles && t[0].styles[0] ? t[0].styles[0] : t[0].style;
                var o = i.fontSize + 2 * (i.haloSize || 0) || 0,
                    a = o,
                    r = this._getEmptyDrawingCanvas(),
                    s = r.getContext("2d");
                s.clearRect(0, 0, r.width, r.height);
                for (var l = {}, h = -1, c = 0; c < t.length; c++)
                    if (t[c].name) {
                        var u = this._drawEachText(s, t[c], h, n, o, a, l);
                        u && (n = u.curX, o = u.curY, a = u.curLineHeight, h = u.styleId)
                    }
                for (var d = o, f = this._copyToNewCanvas(r, d), c = 0; c < t.length; c++) t[c].name || !t[c].style.iconSize ? t[c].textSize && (this._updateFixedLabelCoords(t[c], d), this._addFixedLabelBounds(t[c])) : this._addFixedLabelBounds(t[c]);
                e(f)
            },
            _drawEachTypeOfLabels: function(t, e, i, n, o, a, r) {
                for (var s = 0; s < e.length; s++) {
                    var l = e[s],
                        h = l.name,
                        c = l.styleText;
                    if (h && 0 !== c.length) {
                        var u = this._drawEachText(t, l, i, n, o, a, r);
                        if (u && (n = u.curX, o = u.curY, a = u.curLineHeight, i = u.styleId, u.curY > this._drawingCanvasHeight)) return {
                            curX: n,
                            curY: o,
                            curLineHeight: a,
                            curStyleId: i
                        }
                    }
                }
                return {
                    curX: n,
                    curY: o,
                    curLineHeight: a,
                    curStyleId: i
                }
            },
            _drawIndoorTextLabelOnCanvas: function(t) {
                var e = this._getEmptyDrawingCanvas(),
                    i = e.getContext("2d");
                i.clearRect(0, 0, e.width, e.height);
                var n, o = 0,
                    a = null,
                    r = 0,
                    s = {},
                    l = [];
                for (var h in t)
                    if ("tileInfo" !== h)
                        for (var c = t[h], u = c.defaultFloor, d = c.floors, f = 0; f < d.length; f++)
                            if (f !== u) {
                                var p = d[f];
                                if (p.pois)
                                    for (var m = p.pois, g = 0; g < m.length; g++) null === a && m[g].styleText[0] && (a = m[g].styleText[0].fontSize + 2 * m[g].styleText[0].haloSize, n = a), l.push(m[g])
                            }
                if (null === a) return null;
                l.sort(function(t, e) {
                    return e.rank - t.rank || t.styleId - e.styleId
                });
                var _ = this._drawEachTypeOfLabels(i, l, o, r, n, a, s);
                o = _.curStyleId, r = _.curX, n = _.curY, a = _.curLineHeight;
                var v = this._copyToNewCanvas(e, n);
                return v
            },
            _updateIndoorLabelsCoords: function(t, e) {
                for (var i in t)
                    if ("tileInfo" !== i)
                        for (var n = t[i], o = n.defaultFloor, a = n.floors, r = 0; r < a.length; r++)
                            if (r !== o) {
                                var s = a[r];
                                if (s.pois)
                                    for (var l = s.pois, h = 0; h < l.length; h++) {
                                        var c = l[h];
                                        !c.name || c.textSize && 0 !== c.textSize.length ? (this._updateFixedLabelCoords(c, e), this._addFixedLabelBounds(c)) : (l.splice(h, 1), h--)
                                    }
                            }
            },
            _generateEachLabelCanvas: function(t, e, i, n, o, a) {
                e = Math.min(e, this._drawingCanvasHeight);
                var r = this._copyToNewCanvas(t, e),
                    s = null;
                a.renderData.indoorData && (s = this._drawIndoorTextLabelOnCanvas(a.renderData.indoorData), s && this._updateIndoorLabelsCoords(a.renderData.indoorData, s.height));
                for (var l = 0; l < i.length; l++) i[l].textSize && (this._updateFixedLabelCoords(i[l], e), this._addFixedLabelBounds(i[l]));
                for (var l = 0; l < o.length; l++) o[l].textSize && (this._updateFixedLabelCoords(o[l], e), this._addFixedLabelBounds(o[l]));
                for (var l = 0; l < n.length; l++) this._updateLineLabelCoords(n[l], e);
                return [r, s]
            },
            _copyToNewCanvas: function(t, e) {
                if (0 === e) return null;
                var i = H("canvas");
                i.width = t.width, i.height = e;
                var n = i.getContext("2d");
                return n.drawImage(t, 0, 0, 512, e, 0, 0, 512, e), i._id = t._id, t._free = !0, i
            },
            _drawEachText: function(t, e, i, n, o, a, r) {
                var s = e.name,
                    l = e.styleText ? e.styleText[0] : e.style,
                    h = !1;
                if (e.styles && e.styles[0] && (l = e.styles[0], h = !0), !l) return null;
                var c = l.fontSize,
                    u = l.haloSize || 0;
                if (!c) return null;
                var d = e.styleId || 0;
                u > 2 && (u = 2);
                var f = [],
                    p = [],
                    m = 0;
                r && !r[d] && (r[d] = {});
                var g = c + 2 * u,
                    _ = g;
                if (e.containDescendings && (_ += 4), 0 === u && (_ += 2), e.textOnIcon && (_ = Math.max(_, e.iconSize[1])), d !== i || _ > a) {
                    if (i = d, _ > a) {
                        var v = _ - a;
                        a += v, o += v
                    }
                    this._updateDrawStyle(t, l)
                }
                if ("line" === e.type) {
                    for (var y = s.split(""), b = 0; b < y.length; b++) {
                        var w, x, T = y[b];
                        if (r[d][T]) {
                            var M = r[d][T];
                            w = M.displaySize, x = M.curWordPosition
                        } else {
                            var L = Math.ceil(t.measureText(T).width);
                            if (n + L > 512 && (n = 0, o += _, a = _), o > this._drawingCanvasHeight) return {
                                curX: n,
                                curY: o,
                                curLineHeight: a,
                                styleId: d
                            };
                            var C = n;
                            u > 0 && (L += u, C -= Math.round(u / 2), t.strokeText(T, n, o)), t.fillText(T, n, o);
                            var I = [L, _];
                            w = [Math.round(I[0] / 2), Math.round(I[1] / 2)], x = [C, o - _], r[d][T] = {
                                displaySize: w,
                                curWordPosition: x,
                                totalHeight: m
                            }, n += L + 2
                        }
                        f.push(w), p.push(x)
                    }
                    m = Math.round(f[0][1])
                } else if (r[d][s]) {
                    var M = r[d][s];
                    f = M.textSize, p = M.labelImagePosition, m = M.totalHeight
                } else {
                    var S = s.split("\\");
                    if (S.length > 1 && e.textOnIcon) {
                        for (var D = 0, P = 0, z = [], A = 8, b = 0; b < S.length; b++) {
                            var s = S[b],
                                k = Math.ceil(t.measureText(s).width);
                            k > D && (D = k), z.push(Math.round(k / 2)), P += _
                        }
                        var B = D + 2 * A,
                            E = P + 2 * A;
                        n + B > 512 && (n = 0, o += a), o += P - _ + 2 * A;
                        var O = n,
                            R = o - E,
                            Z = Math.round(B / 2),
                            N = this._iconCache[e.icon].image;
                        this.drawStretchedIcon(t, N, [O, R], A, D, P);
                        for (var b = 0; b < S.length; b++) {
                            var s = S[b],
                                F = O + (Z - z[b]),
                                U = R + 4 + (b + 1) * _;
                            t.fillText(s, F, U)
                        }
                        f.push([Math.round(B / 2), Math.round(E / 2)]), p.push([O, R]), n += B, a = E, m = Math.round(E / 2)
                    } else
                        for (var b = 0; b < S.length; b++) {
                            if (h && b > 0) {
                                var H = e.styles[b] || e.styles[e.styles.length - 1];
                                this._updateDrawStyle(t, H)
                            }
                            var s = S[b],
                                k = Math.ceil(t.measureText(s).width),
                                B = k,
                                W = 0;
                            if (e.textOnIcon && (W = 10, B += 2 * W, 519 === e.styleId && (B = e.iconSize[0], W = Math.round((B - k) / 2))), n + B > 512 && (n = 0, o += _, a = _), o > this._drawingCanvasHeight) return {
                                curX: n,
                                curY: o,
                                curLineHeight: a,
                                styleId: d
                            };
                            var O = n,
                                R = o - _,
                                X = n,
                                G = o;
                            if (e.containDescendings && (G -= 4), e.textOnIcon) {
                                var N = this._iconCache[e.icon].image,
                                    Y = e.iconSize;
                                519 === e.styleId ? t.drawImage(N, 0, 0, Y[0], Y[1], O, R, Y[0], Y[1]) : this.draw3StretchedIcon(t, N, [O, R], W, k, Y[1]), X += W, e.iconSize[1] > g && (G -= (e.iconSize[1] - g) / 2 - 1), B += 1
                            }
                            u > 0 && (B += u, O -= Math.round(u / 2), t.strokeText(s, X, G)), t.fillText(s, X, G);
                            var V = [B, _],
                                w = [Math.round(V[0] / 2), Math.round(V[1] / 2)];
                            f.push(w), p.push([O, R]), m += Math.round(w[1]), n += B
                        }
                    r[d][s] = {
                        textSize: f,
                        labelImagePosition: p,
                        totalHeight: m
                    }
                }
                return e.textSize = f, e.labelImagePosition = p, e.totalHeight = m, {
                    curX: n,
                    curY: o,
                    curLineHeight: a,
                    styleId: d
                }
            },
            _updateDrawStyle: function(t, e) {
                var i = e.fontSize,
                    n = e.haloSize || 0;
                if (t.font = i + "px sans-serif", n > 0) {
                    var o = e.haloRgba ? "rgba(" + e.haloRgba.join(",") + ")" : e.strokeColor;
                    t.lineWidth = 2 * n, t.strokeStyle = o
                }
                var a = e.fontRgba ? "rgba(" + e.fontRgba.join(",") + ")" : e.color;
                t.fillStyle = a
            },
            drawStretchedIcon: function(t, e, i, n, o, a) {
                var r = i[0],
                    s = i[1];
                t.drawImage(e, 0, 0, n, n, r, s, n, n), t.drawImage(e, n, 0, 1, n, r + n, s, o, n), t.drawImage(e, e.width - n, 0, n, n, r + o + n, s, n, n), t.drawImage(e, 0, n, n, 1, r, s + n, n, a), t.drawImage(e, n, n, 1, 1, r + n, s + n, o, a), t.drawImage(e, e.width - n, n, n, 1, r + o + n, s + n, n, a), t.drawImage(e, 0, e.height - n, n, n, r, s + a + n, n, n), t.drawImage(e, n, e.height - n, 1, n, r + n, s + a + n, o, n), t.drawImage(e, e.width - n, e.height - n, n, n, r + o + n, s + a + n, n, n)
            },
            draw3StretchedIcon: function(t, e, i, n, o) {
                var a = i[0],
                    r = i[1];
                t.drawImage(e, 0, 0, n, e.height, a, r, n, e.height), t.drawImage(e, n, 0, 1, e.height, a + n, r, o, e.height), t.drawImage(e, e.width - n, 0, n, e.height, a + n + o, r, n, e.height)
            },
            _updateFixedLabelCoords: function(t, e) {
                if (0 !== e) {
                    var i = [],
                        n = [],
                        o = 0,
                        a = t.totalHeight,
                        r = t.textSize.length,
                        s = t.direction;
                    "number" != typeof s && (s = 0);
                    for (var l = 0; r > l; l++) {
                        var h = t.labelImagePosition[l],
                            c = t.textSize[l],
                            u = h[0],
                            d = h[1],
                            f = c[0],
                            p = c[1],
                            m = 0,
                            g = 0;
                        "number" == typeof t.textMargin && (g = t.textMargin);
                        var _, v, y = 0,
                            b = 0;
                        switch (t.iconPos ? (y = t.iconPos.width, b = t.iconPos.height) : t.custom || (s = cz), s) {
                            case eZ:
                                var w = a / 2 - p + m * (r - 1) / 2;
                                _ = Math.round(-y / 2 - f - g), v = Math.round(w - o - m * l);
                                break;
                            case fd:
                                var w = a / 2 - p + m * (r - 1) / 2;
                                _ = Math.round(y / 2 + g), v = Math.round(w - o - m * l);
                                break;
                            case dv:
                                var w = b / 2 + a - p + m * r + g;
                                _ = Math.round(-f / 2), v = Math.round(w - o - m * l);
                                break;
                            case cB:
                                var w = -b / 2 - m - p - g;
                                _ = Math.round(-f / 2), v = Math.round(w - o - m * l);
                                break;
                            case cz:
                                var w = -a / 2 - m * (r - 1) / 2;
                                _ = Math.round(-f / 2), v = Math.round(w - o - m * l)
                        }
                        o += p;
                        var x = _ + f,
                            T = v,
                            M = x,
                            L = T + p,
                            C = _,
                            I = L;
                        i.push(_, v, x, T, M, L, _, v, M, L, C, I);
                        var S = u / 512,
                            D = (e - d - 2 * p) / e,
                            P = (u + 2 * f) / 512,
                            z = D,
                            A = P,
                            k = (e - d) / e,
                            B = S,
                            E = k;
                        n.push(S, D, P, z, A, k, S, D, A, k, B, E)
                    }
                    t.textPos || (t.textPos = {}), t.textPos.vertex = i, t.textPos.texcoord = n
                }
            },
            _addFixedLabelBounds: function(t) {
                var e = 1e3,
                    i = 1e3,
                    n = -1e3,
                    o = -1e3;
                if (t.iconPos)
                    for (var a = t.iconPos.vertex, r = 0, s = a.length; s > r; r += 2) {
                        var l = a[r],
                            h = a[r + 1];
                        e > l && (e = l), l > n && (n = l), i > h && (i = h), h > o && (o = h)
                    }
                if (t.custom && t.style.iconSize && !t.name) {
                    var c = t.style.iconSize,
                        u = t.direction;
                    switch (u) {
                        case cz:
                            e = -Math.round(c[0] / 2), i = -Math.round(c[1] / 2), n = Math.round(c[0] / 2), o = Math.round(c[1] / 2);
                            break;
                        case dv:
                            e = -Math.round(c[0] / 2), i = 0, n = Math.round(c[0] / 2), o = c[1]
                    }
                }
                if (t.textPos)
                    for (var d = t.textPos.vertex, r = 0, s = d.length; s > r; r += 2) {
                        var l = d[r],
                            h = d[r + 1];
                        e > l && (e = l), l > n && (n = l), i > h && (i = h), h > o && (o = h)
                    }
                t.bds = [e, i, n, o]
            },
            _updateLineLabelCoords: function(t, e) {
                if (0 !== e) {
                    var i = t.wordsInfo,
                        n = t.wordCount;
                    if (t.labelImagePosition) {
                        var o = t.labelImagePosition.slice(0);
                        t.reverse && o.reverse();
                        for (var a = 1e3, r = 1e3, s = -1e3, l = -1e3, h = 0; n > h; h++) {
                            var c = o[h],
                                u = c[0],
                                d = c[1],
                                f = t.textSize[h],
                                p = f[0],
                                m = f[1],
                                g = u / 512,
                                _ = (e - d - 2 * m) / e,
                                v = (u + 2 * p) / 512,
                                y = _,
                                b = v,
                                w = (e - d) / e,
                                x = g,
                                T = w;
                            i[h].size = [p, m], i[h].texcoord = [g, _, v, y, b, w, g, _, b, w, x, T];
                            var M = i[h].offset[0],
                                L = i[h].offset[1],
                                C = M - p / 2,
                                I = L + m / 2,
                                S = L - m / 2,
                                D = M + p / 2;
                            a > C && (a = C), D > s && (s = D), r > S && (r = S), I > l && (l = I)
                        }
                        t.bds = [a, r, s, l]
                    }
                }
            }
        });
        var bH = {
            0: "00000000",
            16: "00010000",
            32: "00100000",
            48: "00110000",
            64: "01000000",
            96: "01100000"
        };
        x.extend(b4.prototype, {
            bind: function() {
                function t() {
                    i._refreshSpotData()
                }
                var e = this.map,
                    i = this;
                e.addEventListener("mapstatusbusy_inner", function() {
                    i._mapIsMoving = !0, i._ratio > bU.HIGH_RES_MIN_RATIO ? i._sharpenRender = !1 : i._useRound = !1
                }), e.addEventListener("mapstatusidle_inner", function() {
                    i._ratio > bU.HIGH_RES_MIN_RATIO ? i._sharpenRender = !0 : i._useRound = !0, i._mapIsMoving = !1
                }), e.addEventListener("onspotmouseover", function(t) {
                    if (this.temp.isPermitSpotOver && t.spots.length > 0) {
                        var e = t.spots[0].userdata.uid,
                            n = t.spots[0].userdata.tilePosStr,
                            o = i.getLabelByUid(e, n);
                        o && o.formatedData && i._toHighlightColor(o.formatedData)
                    }
                }), e.addEventListener("onspotmouseout", function(t) {
                    if (this.temp.isPermitSpotOver && t.spots.length > 0) {
                        var e = t.spots[0].userdata.uid,
                            n = t.spots[0].userdata.tilePosStr,
                            o = i.getLabelByUid(e, n);
                        o && o.formatedData && i._toDefaultColor(o.formatedData)
                    }
                }), e.addEventListener("spotclick", function(t) {
                    if (t.spots && t.spots.length > 0) {
                        if (t.spots[0].userdata.zoom < 10) return;
                        var e = t.spots[0].userdata.uid,
                            n = t.spots[0].userdata.tilePosStr;
                        !i.currentSelectedLabel || i.currentSelectedLabel.uid === e && i.currentSelectedLabel.tilePosStr === n || i._recoverNormalState();
                        var o = i.getLabelByUid(e, n);
                        o && i._changeBaseMapState(o)
                    } else i._recoverNormalState()
                }), e.on("spot_status_reset", function() {
                    i._recoverNormalState()
                }), e.on("spot_highlight", function(t) {
                    var e = i.getLabelByUid(t.uid, t.tilePosStr);
                    e && e.formatedData && i._toHighlightColor(e.formatedData)
                }), e.addEventListener("mousemove", function() {
                    i.curSpotAdded || this.currentOperation === cx.idle && i._mapIsMoving !== !0 && (i._refreshSpotData(), this.temp.isPermitSpotOver = !0, i.curSpotAdded = !0)
                }), d5() && e.addEventListener("mapstatusidle_inner", t), e.on("style_loaded", function() {
                    "canvas" !== i.map.config.textRenderType || i._labelTextCanvas || (i._labelTextCanvas = i.map.tileMgr.getLabelTextCanvas())
                })
            },
            getLabelByUid: function(t, e) {
                for (var i = this.map._featureMgr.getResult().tileLabels, n = 0; n < i.length; n++) {
                    for (var o = i[n].fixedLabel, a = 0; a < o.length; a++)
                        if (i[n].fixedLabel[a].guid === t && i[n].fixedLabel[a].tilePosStr === e) return i[n].fixedLabel[a];
                    for (var r = i[n].indoorLabel, a = 0; a < r.length; a++)
                        if (i[n].indoorLabel[a].guid === t && i[n].indoorLabel[a].tilePosStr === e) return i[n].indoorLabel[a]
                }
                return null
            },
            getTileByLabelUid: function(t) {
                for (var e = this.map._featureMgr.getResult().tileLabels, i = 0; i < e.length; i++) {
                    for (var n = e[i].fixedLabel, o = 0; o < n.length; o++)
                        if (e[i].fixedLabel[o].guid === t) return e[i];
                    for (var a = e[i].indoorLabel, o = 0; o < a.length; o++)
                        if (e[i].indoorLabel[o].guid === t) return e[i]
                }
                return null
            },
            _toHighlightColor: function(t) {
                if (!t.tempRank || t.tempRank !== this.RANK5) {
                    for (var e = this.map._featureMgr.getResult().eleData[4] || [], i = !1, n = 0; n < e.length; n++)
                        if (e[n] === t || e[n].guid === t.guid && e[n].tilePosStr === t.tilePosStr && e[n].zoom === t.zoom) {
                            i = !0;
                            break
                        }
                    i || (e.push(t), this.map._featureMgr.setOverlayData(e, 4), this.map.dispatchEvent(new aB("onrefresh")))
                }
            },
            _toDefaultColor: function(t) {
                if (!t.tempRank || t.tempRank !== this.RANK5) {
                    for (var e = this.map._featureMgr.getResult().eleData[4] || [], i = 0; i < e.length; i++)
                        if (t === e[i] || t.guid === e[i].guid && t.tilePosStr === e[i].tilePosStr && t.zoom === e[i].zoom) {
                            e.splice(i, 1);
                            break
                        }
                    this.map._featureMgr.setOverlayData(e, 4), this.map.dispatchEvent(new aB("onrefresh"))
                }
            },
            _changeBaseMapState: function(t) {
                var e = t.guid,
                    i = t.formatedData.guidExt,
                    n = {
                        guid: e,
                        tilePosStr: t.tilePosStr,
                        guidExt: i
                    };
                this._strategyInfo = n, this.currentSelectedLabel = t;
                var o = this.map._featureMgr,
                    a = o.getLabelData();
                a = this.collisionTest(a), this.updateLabels(a);
                var r = this.fixDataFormat(a);
                o.setOverlayData(r[0], 2), o.setOverlayData(r[1], 3), o.setOverlayData(r[2], 4);
                var s = this.getTileByLabelUid(e);
                this.currentSelectedLabel.tileInfo = s.tileInfo;
                var l = (s.tileInfo.zoom, this.layer.tileCache.getAllData());
                for (var h in l) {
                    var c = l[h].data;
                    c.label && this.clearCollisionCache(c.label)
                }
                this.map.dispatchEvent(new aB("onrefresh"))
            },
            _recoverNormalState: function() {
                this._strategyInfo = null;
                var t = !1,
                    e = this.map._featureMgr.getLabelData();
                if (this.currentSelectedLabel) {
                    var i = this.currentSelectedLabel.guid;
                    this.clearCollisionCache(this.getTileByLabelUid(i));
                    var n = this.layer.tileCache.getAllData();
                    for (var o in n) {
                        var a = n[o].data;
                        a.label && this.clearCollisionCache(a.label)
                    }
                    this.currentSelectedLabel.tempRank = null, this.currentSelectedLabel = null, t = !0
                }
                e = this.collisionTest(e), this.updateLabels(e);
                var r = this.fixDataFormat(e),
                    s = this.map._featureMgr;
                s.setOverlayData(r[0], 2), s.setOverlayData(r[1], 3), s.setOverlayData([], 4), this.map.dispatchEvent(new aB("onrefresh")), t && (this.curSpotAdded = !1, this._refreshSpotData())
            },
            loadIconImages: function(t, e) {
                for (var i = t.label, n = t.tileInfo.style, o = i.fixedLabel, a = i.indoorLabel, r = o.length + a.length, s = this, l = 0, h = 200, c = [], u = !1, d = 0; r > d; d++) {
                    var f;
                    if (f = d < o.length ? o[d] : a[d - o.length], f.iconPos) {
                        var p = f.iconPos.iconType,
                            m = n + "_" + p;
                        l++, this.iconCache[m] ? u = !0 : c.push({
                            iconName: p,
                            iconId: m
                        })
                    }
                }
                u && e();
                for (var d = 0; d < c.length; d++) {
                    var p = c[d].iconName,
                        m = c[d].iconId,
                        g = new Image;
                    g.id = m, g.crossOrigin = "anonymous", g.onload = function() {
                        s.iconCache[this.id].loaded = !0, s._addToIconTexture(this), null === s._iconLoadTimer && (s._iconLoadTimer = setTimeout(function() {
                            e(), s._iconLoadTimer = null
                        }, h)), this.onload = null
                    }, g.onerror = function() {
                        s._iconLoadTimer || (s._iconLoadTimer = setTimeout(function() {
                            e(), s._iconLoadTimer = null
                        }, h)), s.iconCache[this.id] = null, this.onerror = null
                    };
                    var _ = dm.getImageFullUrl(this.map.config.style, p + ".png");
                    g.src = _, this.iconCache[m] = {
                        loaded: !1,
                        image: g
                    }
                }
                return l
            },
            _addToIconTexture: function(t) {
                if (this.map._webglMapScene) {
                    var e = this.map._webglMapScene._painter,
                        i = e._iconTextureAtlas.addTexture(t);
                    e._iconTextureAtlasOffset[t.id] = i;
                    var n = 0 * t.width / 1024 + i.width,
                        o = 0 * t.height / 1024 + i.height,
                        a = t.width / 1024 + i.width,
                        r = o,
                        s = a,
                        l = t.height / 1024 + i.height,
                        h = n,
                        c = l;
                    e._iconTextureAtlasCoords[t.id] = [n, o, a, r, s, l, n, o, s, l, h, c]
                }
            },
            loadImgByStr: function(t, e, i) {
                if (!t && !e) return void(i && i(null, null));
                if ("object" == typeof t && "object" == typeof e) return void i(t, e);
                var n = 0,
                    o = null,
                    a = null;
                t && (n++, o = new Image, o.onload = function() {
                    n--, 0 === n && i && i(this, a), this.onload = null
                }, o.src = t), e && (n++, a = new Image, a.onload = function() {
                    n--, 0 === n && i && i(o, this), this.onload = null
                }, a.src = e)
            },
            collisionTest: function(t, e, i) {
                if (!t) return [];
                var n = this.map,
                    o = n.getHeading();
                o = this.calcLoopHeading(o);
                var a = n.height,
                    r = this.allLabels;
                r.length = 0, t.sort(function(t, e) {
                    var i = t.tileInfo,
                        n = e.tileInfo;
                    return i.col * i.row < n.col * n.row ? -1 : 1
                });
                var s, l = (t.labelZoom, n.getTilt()),
                    h = n.getZoom();
                s = i ? i : this.getZoomStep();
                for (var c = 0, u = t.length; u > c; c++) {
                    var d = t[c],
                        f = d.tileInfo,
                        p = f.zoom,
                        m = f.loopOffsetX / Math.pow(2, 18 - p);
                    if (o || l || !d.unnecessaryCollisionTest || !d.unnecessaryCollisionTest[i]) {
                        for (var g = d.fixedLabel || [], _ = 0, v = g.length; v > _; _++) {
                            var y = g[_];
                            y.zoom = p, -1 === e && y.isDel || (br(y, f.useZoom, h) ? (this.calcCollisionBounds(y, s, m, a), r.push(y)) : y.isDel = !0)
                        }
                        for (var b = d.indoorLabel || [], _ = 0, v = b.length; v > _; _++) {
                            var y = b[_];
                            y.zoom = p, -1 === e && y.isDel || (br(y, f.useZoom) ? (this.calcCollisionBounds(y, s, m, a), r.push(y)) : y.isDel = !0)
                        }
                        for (var w = d.lineLabel || [], _ = 0, v = w.length; v > _; _++) {
                            var y = w[_];
                            if (-1 !== e || !y.isDel)
                                if (br(y, f.useZoom)) {
                                    var x = y.pt,
                                        T = n.pointToPixel(x, {
                                            zoom: s,
                                            useRound: !0
                                        }),
                                        M = T.x + m,
                                        L = a - T.y,
                                        C = y.bds,
                                        I = C[0],
                                        S = C[1],
                                        D = C[2],
                                        P = C[3],
                                        z = I,
                                        A = S,
                                        k = D,
                                        B = P;
                                    o >= 0 && 45 > o || o >= 315 && 360 > o ? (z = I, A = S, k = D, B = P) : o >= 45 && 135 > o ? (z = S, A = -D, k = P, B = -I) : o >= 135 && 225 > o ? (z = -D, A = -P, k = -I, B = -S) : o >= 225 && 315 > o && (z = -P, A = I, k = -S, B = D), y._tempBds = [M + z, L + A, M + k, L + B], r.push(y)
                                } else y.isDel = !0
                        }
                    }
                }
                var E = this._strategyInfo;
                if (E) {
                    for (var O = E.guid, R = E.guidExt, Z = !1, c = 0, u = r.length; u > c; c++) {
                        var N = r[c];
                        delete N.tempRank, this.layer.isClickableLabel(N) && (1 !== R || N.guidExt) && O === N.guid && E.tilePosStr === N.tilePosStr && (N.tempRank = this.RANK5, Z = !0)
                    }
                    if (!Z && this.currentSelectedLabel) {
                        this.currentSelectedLabel.tempRank = this.RANK5;
                        var f = this.currentSelectedLabel.tileInfo,
                            p = f.zoom,
                            m = f.loopOffsetX / Math.pow(2, 18 - p);
                        this.calcCollisionBounds(this.currentSelectedLabel, s, m, a), r.push(this.currentSelectedLabel)
                    }
                } else
                    for (var c = 0, u = r.length; u > c; c++) {
                        var N = r[c];
                        "line" !== N.type && N.iconPos && delete N.tempRank
                    }
                r.sort(function(t, e) {
                    var i = t.tempRank ? t.tempRank : t.rank,
                        n = e.tempRank ? e.tempRank : e.rank;
                    return n - i || t.startZoom - e.startZoom || e.pt.lng - t.pt.lng || e.pt.lat - t.pt.lat
                });
                var F = 0;
                l > 0 && (F = 6);
                var h = n.getZoom();
                h >= 8 && 9 > h && (F = 8.5 > h ? 6 : 3);
                var U = 2;
                6 > h && h >= 5 && (U = -1);
                for (var c = 0, u = r.length; u > c; c++) {
                    var H = r[c],
                        W = H._tempBds;
                    for (H.isDel = !1, H._intersectIdx = [], _ = c + 1; u > _; _++) {
                        var X = r[_],
                            G = X._tempBds;
                        W[2] + F + U < G[0] - F || W[0] - F > G[2] + F + U || W[3] + F + U < G[1] - F || W[1] - F > G[3] + F + U || H._intersectIdx.push(_)
                    }
                }
                for (var c = 0, u = r.length; u > c; c++) {
                    var N = r[c];
                    if (N.isDel === !1)
                        for (var Y = N._intersectIdx, _ = 0, v = Y.length; v > _; _++) r[Y[_]].isDel = !0
                }
                return t
            },
            calcCollisionBounds: function(t, e, i, n) {
                var o = t.ptFix || t.pt,
                    a = this.map,
                    r = a.pointToPixel(o, {
                        zoom: e,
                        useRound: !1
                    }),
                    s = r.x + i,
                    l = n - r.y,
                    h = t.bds;
                t._tempBds = [s + h[0], l + h[1], s + h[2], l + h[3]]
            },
            getZoomStep: function() {
                var t = this.map.getZoom(),
                    e = Math.floor(t),
                    i = t - e >= .5 ? e + .5 : e;
                return i
            },
            clearCollisionCache: function(t) {
                t && (t.cacheState = null, t.unnecessaryCollisionTest = null)
            },
            getCachedLabels: function(t) {
                t = t || [];
                for (var e = this.getZoomStep(), i = !1, n = 0; n < t.length; n++) {
                    var o = t[n];
                    if (!o.cacheState || !o.cacheState[e]) {
                        i = !0;
                        break
                    }
                    if (o.hasNewData) {
                        i = !0;
                        break
                    }
                }
                return i && this.calcLabelsCollision(t), t
            },
            calcLabelsCollision: function(t) {
                var e, i, n = this.getZoomStep(),
                    o = {};
                t = this.collisionTest(t, void 0, n);
                for (var a = 0; a < t.length; a++) {
                    e = t[a], i = e.tileInfo;
                    var r = i.col + "," + i.row;
                    o[r] = 1
                }
                for (var s = {}, a = 0; a < t.length; a++) {
                    e = t[a], e.cacheState || (e.cacheState = {}), i = e.tileInfo;
                    var l = i.col,
                        h = i.row;
                    if (r = l + "," + h, "stable" !== e.cacheState[n] || (s[r] = 1, e.hasNewData)) {
                        for (var c = 0; c < e.fixedLabel.length; c++) {
                            var u = e.fixedLabel[c];
                            u.cachedIsDel || (u.cachedIsDel = {}), u.cachedIsDel[n] = u.isDel
                        }
                        for (var c = 0; c < e.indoorLabel.length; c++) {
                            var u = e.indoorLabel[c];
                            u.cachedIsDel || (u.cachedIsDel = {}), u.cachedIsDel[n] = u.isDel
                        }
                        for (var c = 0; c < e.lineLabel.length; c++) {
                            var u = e.lineLabel[c];
                            u.cachedIsDel || (u.cachedIsDel = {}), u.cachedIsDel[n] = u.isDel
                        }
                        o[l - 1 + "," + (h - 1)] && o[l - 1 + "," + h] && o[l - 1 + "," + (h + 1)] && o[l + "," + (h - 1)] && o[l + "," + (h + 1)] && o[l + 1 + "," + (h - 1)] && o[l + 1 + "," + h] && o[l + 1 + "," + (h + 1)] ? (e.cacheState[n] = "stable", s[r] = 1) : e.cacheState[n] || (e.cacheState[n] = "unstable")
                    }
                }
                for (var a = 0; a < t.length; a++) {
                    var e = t[a];
                    i = e.tileInfo;
                    var r = i.col + "," + i.row,
                        l = +i.col,
                        h = +i.row;
                    s[l - 1 + "," + (h - 1)] && s[l - 1 + "," + h] && s[l - 1 + "," + (h + 1)] && s[l + "," + (h - 1)] && s[l + "," + (h + 1)] && s[l + 1 + "," + (h - 1)] && s[l + 1 + "," + h] && s[l + 1 + "," + (h + 1)] && (e.unnecessaryCollisionTest || (e.unnecessaryCollisionTest = {}), e.unnecessaryCollisionTest[n] = 1)
                }
                t.hasNewData = !1
            },
            updateLabels: function(t) {
                var e = this.map,
                    i = e.getZoom(),
                    n = e.getHeading();
                n = this.calcLoopHeading(n);
                for (var o = e.getTilt(), a = this.getZoomStep(), r = 0, s = t.length; s > r; r++) {
                    var l = t[r],
                        h = l.tileInfo,
                        c = h.loopOffsetX || 0;
                    this.updateFixedLabel(l.fixedLabel, o, n, l, a, i, c), this.updateFixedLabel(l.indoorLabel, o, n, l, a, i, 0), this.updateLineLabel(l.lineLabel, o, n, l, a)
                }
            },
            updateFixedLabel: function(t, e, i, n, o, a, r) {
                1 === t.length;
                for (var s = 0, l = t.length; l > s; s++) {
                    var h = t[s];
                    if (h.cachedIsDel && (!e && !i && n.cacheState && n.cacheState[o] && (h.isDel = h.cachedIsDel[o], "undefined" == typeof h.isDel && (h.isDel = h.cachedIsDel[o] = !0)), h.startScale > a && (h.isDel = !0), !h.isDel)) {
                        var c = h.pt,
                            u = h.iconPos;
                        if (u && u.texcoord && !u.rtVertex) {
                            u.rtVertex = [];
                            var d = u.vertex,
                                f = ae(c.lng),
                                p = ae(c.lat);
                            u.rtVertex = [f[0], p[0], f[1], p[1], 0, d[0], d[1], 0, 0, u.texcoord[0], u.texcoord[1], f[0], p[0], f[1], p[1], 0, d[2], d[3], 0, 0, u.texcoord[2], u.texcoord[3], f[0], p[0], f[1], p[1], 0, d[4], d[5], 0, 0, u.texcoord[4], u.texcoord[5], f[0], p[0], f[1], p[1], 0, d[6], d[7], 0, 0, u.texcoord[6], u.texcoord[7], f[0], p[0], f[1], p[1], 0, d[8], d[9], 0, 0, u.texcoord[8], u.texcoord[9], f[0], p[0], f[1], p[1], 0, d[10], d[11], 0, 0, u.texcoord[10], u.texcoord[11]]
                        }
                        var m = h.textPos;
                        if (m && !m.rtVertex) {
                            m.rtVertex = [];
                            for (var d = m.vertex, g = m.rtVertex, f = ae(c.lng), p = ae(c.lat), _ = ae(r), v = 0, y = d.length; y > v; v += 12) g.push(f[0], p[0], f[1], p[1], 0, d[v], d[v + 1], _[0], _[1], m.texcoord[0], m.texcoord[1]), g.push(f[0], p[0], f[1], p[1], 0, d[v + 2], d[v + 3], _[0], _[1], m.texcoord[2], m.texcoord[3]), g.push(f[0], p[0], f[1], p[1], 0, d[v + 4], d[v + 5], _[0], _[1], m.texcoord[4], m.texcoord[5]), g.push(f[0], p[0], f[1], p[1], 0, d[v + 6], d[v + 7], _[0], _[1], m.texcoord[6], m.texcoord[7]), g.push(f[0], p[0], f[1], p[1], 0, d[v + 8], d[v + 9], _[0], _[1], m.texcoord[8], m.texcoord[9]), g.push(f[0], p[0], f[1], p[1], 0, d[v + 10], d[v + 11], _[0], _[1], m.texcoord[10], m.texcoord[11])
                        }
                    }
                }
            },
            updateLineLabel: function(t, e, i, n, o) {
                t = t || [];
                for (var a = this.map, r = a.getZoomUnits(), s = 0, l = t.length; l > s; s++) {
                    var h = t[s];
                    if (h.cachedIsDel && (!e && !i && n.cacheState && n.cacheState[o] && (h.isDel = h.cachedIsDel[o], "undefined" == typeof h.isDel && (h.isDel = h.cachedIsDel[o] = !0)), !h.isDel && h.styleText && 0 !== h.styleText.length)) {
                        var c = h.mcInTile,
                            u = c.x,
                            d = c.y,
                            f = h.wordsInfo,
                            p = h.labelAngle,
                            m = !1,
                            g = 0;
                        if (0 !== i) {
                            {
                                var _ = f[0].angle,
                                    v = this.calcLoopHeading(_ - i);
                                this.calcLoopHeading(p - i)
                            }
                            v > 45 && 315 > v && (v > 45 && 135 >= v ? g = 270 : v > 135 && 225 >= v ? g = 180 : v > 225 && 315 > v && (g = 90), p > 225 && 315 >= p && 180 >= g ? m = !0 : (p >= 0 && 45 >= p || p >= 315 && 360 > p) && g >= 180 && (m = !0))
                        }
                        for (var y = 0, b = f.length; b > y; y++) {
                            var w = f[y],
                                x = w.calcInfo,
                                T = w.offset[0],
                                M = w.offset[1];
                            if (w.size) {
                                var L = w.size[0],
                                    C = w.size[1],
                                    I = w.angle;
                                if (x || (x = {}), i !== x.mapHeading || r !== x.zoomUnits) {
                                    if (x.mapHeading = i, x.zoomUnits = r, m) {
                                        var S = f[b - 1 - y];
                                        T = S.offset[0], M = S.offset[1], I = S.angle
                                    }
                                    var D = u + T * r,
                                        P = d + M * r;
                                    x.rotationCenter = {
                                        lng: D,
                                        lat: P
                                    }, x.calcHeading = g, x.angle = I, x.offsetX = T, x.offsetY = M, w.calcInfo = x
                                }
                                w.rtVertex || (w.rtVertex = []), w.rtVertex.length = 0;
                                var z = x.calcHeading + x.angle,
                                    A = x.rotationCenter;
                                T = x.offsetX, M = x.offsetY;
                                var k = Math.round(T - L / 2),
                                    B = Math.round(T + L / 2),
                                    E = Math.round(M + C / 2),
                                    O = Math.round(M - C / 2);
                                w.rtVertex.push(u, d, w.z, k, O, A.lng, A.lat, z, w.texcoord[0], w.texcoord[1], u, d, w.z, B, O, A.lng, A.lat, z, w.texcoord[2], w.texcoord[3], u, d, w.z, B, E, A.lng, A.lat, z, w.texcoord[4], w.texcoord[5], u, d, w.z, k, O, A.lng, A.lat, z, w.texcoord[6], w.texcoord[7], u, d, w.z, B, E, A.lng, A.lat, z, w.texcoord[8], w.texcoord[9], u, d, w.z, k, E, A.lng, A.lat, z, w.texcoord[10], w.texcoord[11])
                            }
                        }
                    }
                }
            },
            calcLoopHeading: function(t) {
                for (; t >= 360;) t -= 360;
                for (; 0 > t;) t += 360;
                return t
            },
            fixDataFormat: function(t) {
                var e, i = this.fixedLabelData,
                    n = this.lineLabelData,
                    o = this.highlightLabelData,
                    a = 0,
                    r = 0,
                    s = 0;
                if (this.currentSelectedLabel) {
                    var l = this.getLabelByUid(this.currentSelectedLabel.guid, this.currentSelectedLabel.tilePosStr);
                    (!l || l.isDel) && (i[a] = this.currentSelectedLabel.formatedData, a++, o[s] = this.currentSelectedLabel.formatedData, s++)
                }
                for (var h = 0; h < t.length; h++) {
                    var c = t[h],
                        u = c.fixedLabel,
                        d = c.indoorLabel,
                        f = c.lineLabel;
                    e = this.fixFixedLabelDataFormat(u, c, i, a, o, s), a = e[0], s = e[1], e = this.fixFixedLabelDataFormat(d, c, i, a, o, s, !0), a = e[0], s = e[1], n[r] = {
                        tileInfo: c.tileInfo,
                        lineLabels: []
                    };
                    for (var p = 0; p < f.length; p++)
                        if (!f[p].isDel) {
                            var m = f[p].wordsInfo;
                            if (m)
                                for (var g = 0; g < m.length; g++)
                                    if (m[g].rtVertex) {
                                        var _ = m[g].formatedData;
                                        _ || (_ = {
                                            textureSource: c.textureSources[f[p].processedInZoom],
                                            textureHeight: c.textureHeights[f[p].processedInZoom],
                                            renderData: {
                                                vertex: m[g].rtVertex,
                                                textureCoord: m[g].texcoord
                                            }
                                        }, m[g].formatedData = _), n[r].lineLabels.push(_)
                                    }
                        }
                    r++
                }
                return i.length = a, n.length = r, o.length = s, [n, i, o]
            },
            fixFixedLabelDataFormat: function(t, e, i, n, o, a, r) {
                for (var s = 0; s < t.length; s++)
                    if (!t[s].isDel) {
                        var l = t[s].textPos,
                            h = t[s].iconPos,
                            c = null;
                        l && l.rtVertex && (t[s].formatedData ? (c = t[s].formatedData, c.tempRank = t[s].tempRank) : (c = {
                            guid: t[s].guid,
                            guidExt: t[s].guidExt,
                            tilePosStr: t[s].tilePosStr,
                            zoom: t[s].zoom,
                            tempRank: t[s].tempRank,
                            textureSource: e.textureSources[t[s].processedInZoom],
                            textureHeight: e.textureHeights[t[s].processedInZoom],
                            renderData: {
                                vertex: l.rtVertex,
                                textureCoord: l.texcoord
                            }
                        }, r && t[s].onDefaultFloor === !1 && (c.textureSource = e.indoorTextureSources[t[s].processedInZoom], c.textureHeight = e.indoorTextureHeights[t[s].processedInZoom]), t[s].formatedData = c), this.currentSelectedLabel && c.guid === this.currentSelectedLabel.guid && c.tilePosStr === this.currentSelectedLabel.tilePosStr && (o[a] = c, a++)), h && h.rtVertex && (c ? c.iconRenderData || (c.iconRenderData = {
                            vertex: h.rtVertex,
                            textureCoord: h.texcoord
                        }) : (c = {
                            guid: t[s].guid,
                            guidExt: t[s].guidExt,
                            zoom: t[s].zoom,
                            tempRank: t[s].tempRank,
                            iconRenderData: {
                                vertex: h.rtVertex,
                                textureCoord: h.texcoord
                            }
                        }, t[s].formatedData = c)), i[n] = c, n++
                    }
                return [n, a]
            },
            _refreshSpotData: function() {
                this._spotData.length = 0;
                var t = this.map,
                    e = Math.floor(t.getZoom()),
                    i = this.map._featureMgr.getLabelData();
                if (i)
                    for (var n = 0, o = i.length; o > n; n++) this._addFixedSpotData(i[n].fixedLabel, e), this._addFixedSpotData(i[n].indoorLabel, e);
                var a = this.currentSelectedLabel;
                if (a && !this.getTileByLabelUid(a.guid, a.tilePosStr)) {
                    var r = this._getSpotDataFromLabel(this.currentSelectedLabel);
                    r && this._spotData.push(r)
                }
                var s = new aB("onspotsdataready");
                s.spots = this._spotData, t._spotDataOnCanvas = this._spotData, t.dispatchEvent(s)
            },
            _addFixedSpotData: function(t, e) {
                for (var i = 0; i < t.length; i++) {
                    var n = t[i];
                    if (this.layer.isClickableLabel(n) && !(1 === n.guidExt && n.startScale > e)) {
                        var o = t[i].spot || this._getSpotDataFromLabel(t[i]);
                        o && this._spotData.push(o)
                    }
                }
            },
            _getSpotDataFromLabel: function(t) {
                var e = this.map;
                if (!t.bds) return null;
                var i = t.bds.slice(0),
                    n = null;
                t.iconPos && (n = new e1(t.pt.lng, t.pt.lat));
                var o = t.name ? t.name.replace("\\\\", "<br>") : "";
                t.iconPos && t.iconPos.iconType.indexOf("ditie") > -1 && e.getZoom() > 14 && (o = "");
                var a = {
                    n: o,
                    pt: new e1(t.pt.lng, t.pt.lat),
                    userdata: {
                        iconPoint: n,
                        uid: t.guid,
                        name: o,
                        mapPoi: !0,
                        type: t.iconPos ? t.iconPos.iconType : "",
                        rank: t.rank,
                        zoom: t.zoom,
                        tilePosStr: t.tilePosStr
                    },
                    bd: i,
                    tag: "MAP_SPOT_INFO"
                };
                return t.spot = a, a
            },
            drawLabelsOnCanvas: function(t, e) {
                this._labelTextCanvas.drawLabelsOnCanvas(t, e)
            }
        }), dV.prototype.init = function() {
            function t() {
                i.updateLabels()
            }
            var e = this._map,
                i = this;
            e.addEventListener("add_tile_labels", t), e.addEventListener("onremove_tile_labels", t), e.addEventListener("onclear_labels", t)
        }, dV.prototype.updateLabels = function() {
            var t = this._map.tileMgr.getLabelTextCanvas(),
                e = this._map,
                i = this;
            t.drawCustomLabelsOnCanvas(e._customTileLabels, function(t) {
                var n = i.virtualTile;
                t && (n.label.textureHeights[0] = [t.height]), n.label.fixedLabel = e._customTileLabels;
                var o = new aB("oncustom_labels_ready");
                o.virtualTile = n, o.labelCanvas = t, o.imgKey = aI.getGUID("custom_labels_"), e.dispatchEvent(o)
            })
        }, aI.register(function(t) {
            t._customLabelMgr = new dV(t)
        });
        var aC = {
            init: function(t) {
                var e = this;
                this.map = t, this.arrPendingData = [];
                var i = navigator.hardwareConcurrency || 4;
                d5() && i > 2 && (i = 2), this.arrWorker = [], this.ratio = ay(), this.wordSpaceRatio = this.ratio, this.textSizeRatio = this.ratio > 1 ? 2 : 1, bO.canUseWebAssembly(function(n) {
                    var o;
                    o = n ? (BMap.Utils.inMapHost ? "" : BMap.MapConfig.mapHost) + "/res/newui/worker_wasm_ncq5j1.js" : (BMap.Utils.inMapHost ? "" : BMap.MapConfig.mapHost) + "/res/newui/worker_asm_izzr1h.js";
                    for (var a = 0; i > a; a++) {
                        var r = c7(o);
                        r.onmessage = function(i) {
                            if (i.data ? this._cbk && this._cbk(i.data, this._parsingTileKey) : this._cbk && this._cbk(null, this._parsingTileKey), this._isBusy = !1, this._cbk = null, this._parsingTileInfo = null, this._parsingTileKey = null, e.arrPendingData.length > 0) {
                                var n = e.arrPendingData.shift(),
                                    o = n.cbk;
                                e.loadTileData(n.url, n.tileInfo, n.tileKey, o)
                            }
                            var a = new aB("onrefresh");
                            a.source = "workermgr", t.fire(a)
                        }, e.arrWorker.push(r)
                    }
                    if (e.arrPendingData.length > 0)
                        for (var a = 0; a < Math.min(e.arrPendingData.length, i); a++) {
                            var s = e.arrPendingData.shift();
                            e.loadTileData(s.url, s.tileInfo, s.tileKey, s.cbk)
                        }
                }), t.on("style_willchange", function() {
                    for (var t = 0, i = e.arrWorker.length; i > t; t++) e.arrWorker[t].isSendFS = !1;
                    this.useCustomStyle() && (d9.stringifiedCustomStyleInfo = null)
                }), t.on("destroy", function() {
                    for (var t = 0; t < e.arrWorker.length; t++) e.arrWorker[t] && e.arrWorker[t].terminate();
                    e.arrWorker.length = 0
                })
            },
            getIdleWorker: function() {
                for (var t = 0, e = this.arrWorker.length; e > t; t++) {
                    var i = this.arrWorker[t];
                    if (!i._isBusy) return i._isBusy = !0, i
                }
                return null
            },
            releasePendingData: function(t) {
                for (var e = [], i = this.arrPendingData, n = i.length - 1; n >= 0; n--) {
                    var o = i[n],
                        a = o.tileInfo;
                    if (t.tileTypeName === a.tileTypeName) {
                        var r = "id_" + a.col + "_" + a.row + "_" + a.zoom;
                        t[r] || (i.splice(n, 1), e.push(a))
                    }
                }
                return e
            },
            loadTileData: function(t, e, i, n) {
                var o = this.getIdleWorker();
                if (o) {
                    o._cbk = n, o._parsingTileInfo = e, o._parsingTileKey = i;
                    var a = {
                            action: "loadTileData",
                            url: t,
                            tileInfo: e,
                            tileKey: i
                        },
                        r = this.map.getMapStyleId(),
                        s = !(0 !== r.indexOf("custom")),
                        l = r;
                    s && (l = "Custom"), o.isSendFS || (!d9["stringifiedFeatureStyle" + r] && aI["FeatureStyle" + r] && (d9["stringifiedFeatureStyle" + r] = JSON.stringify(aI["FeatureStyle" + r])), d9["stringifiedIconSetInfo" + l] || (d9["stringifiedIconSetInfo" + l] = JSON.stringify(aI["iconSetInfo" + l])), d9.stringifiedIndoorStyle || (d9.stringifiedIndoorStyle = JSON.stringify(aI.indoorStyle)), s && aI.customStyleInfo && (d9.stringifiedCustomStyleInfo || (d9.stringifiedCustomStyleInfo = JSON.stringify(aI.customStyleInfo))), d9["stringifiedFeatureStyle" + r] && (a.featureStyle = d9["stringifiedFeatureStyle" + r]), a.iconSetInfo = d9["stringifiedIconSetInfo" + l], a.indoorStyle = d9.stringifiedIndoorStyle, s && d9.stringifiedCustomStyleInfo && (a.customMapStyle = d9.stringifiedCustomStyleInfo), a.iconInfo = {
                        wordSpaceRatio: this.wordSpaceRatio,
                        textSizeRatio: this.textSizeRatio
                    }, a.mapStyleId = r, a.mapConfig = {
                        enableIndoor: this.map.config.enableIndoor
                    }, a.additionalStyleInfo = {
                        defaultBackgroundColor: this.map.config.style && this.map.config.style.defaultBackgroundColor || null,
                        icons: this.map.config.style && this.map.config.style.icons || null
                    }, o.isSendFS = !0), o.postMessage(a)
                } else {
                    var h = {
                        url: t,
                        tileInfo: e,
                        tileKey: i,
                        cbk: n
                    };
                    this.arrPendingData.push(h)
                }
            }
        };
        x.extend(d9.prototype, aC), aI.register(function(t) {
            if ("webgl" === t._renderType) {
                var e = t.tileMgr = new cw(t);
                t.addEventListener("addtilelayer", function(t) {
                    e.addWebGLLayer(t.target)
                }), t.addEventListener("removetilelayer", function(t) {
                    e.removeWebGLLayer(t.target)
                }), t.on("update", function(t) {
                    (aI["FeatureStyle" + this.getMapStyleId()] || aI.customStyleLoaded) && e.loadLayersData({
                        zoomChanged: t.changedStatus.onzoom_changed ? !0 : !1
                    })
                }), t.on("style_changed", function() {
                    e.loadLayersData()
                })
            }
        }), x.extend(cw.prototype, {
            addWebGLLayer: function(t) {
                if (this.tileLayers.push(t), t.initDrawData(), this.tileLayers.length > 1)
                    for (var e = 1; e < this.tileLayers.length; e++)
                        if (this.tileLayers[e].isFlat) {
                            this.map.setDisplayOptions({
                                isFlat: !0
                            });
                            break
                        }
                var i = this.map.getMapStyleId();
                if (aI["FeatureStyle" + i]) this.loadLayersData();
                else {
                    var n = this;
                    this.map.loadMapStyleFiles(function() {
                        n.loadLayersData()
                    })
                }
            },
            removeWebGLLayer: function(t) {
                for (var e = !1, i = 0, n = this.tileLayers.length; n > i; i++)
                    if (t === this.tileLayers[i]) {
                        e = !0, this.tileLayers.splice(i, 1);
                        break
                    }
                if (e !== !1) {
                    if (t.destroyDrawData(), aI["FeatureStyle" + this.map.getMapStyleId()] && this.loadLayersData(), 1 === this.tileLayers.length) this.map.setDisplayOptions({
                        isFlat: !1
                    });
                    else {
                        for (var o = !1, i = 1; i < this.tileLayers.length; i++)
                            if (this.tileLayers[i].isFlat) {
                                o = !0;
                                break
                            }
                        this.map.setDisplayOptions({
                            isFlat: o
                        })
                    }
                    var a = new aB("onrefresh");
                    a.source = "removewebgllayer", this.map.fire(a)
                }
            },
            getLabelTextCanvas: function() {
                return this._labelTextCanvas || (this._labelTextCanvas = new r(this.map)), this._labelTextCanvas
            },
            loadLayersData: function(t) {
                if (!this.map.suspendLoad) {
                    var e = this;
                    t = t || {};
                    var i = !!t.zoomChanged,
                        n = i === !0 || this.map.getTilt() > 50;
                    n ? this._loadLayersFromCache(i) : this.syncLoadTimer || (this.syncLoadTimer = setTimeout(function() {
                        e._loadLayersFromCache(i), e.syncLoadTimer = null
                    }, 40)), this.timer && window.clearTimeout(this.timer), this.timer = window.setTimeout(function() {
                        var t = e.tileLayers.length;
                        e.tilesInfoCache = {};
                        for (var n = 0; t > n; n++) {
                            var o = e.tileLayers[n],
                                a = o.tileType,
                                r = null;
                            e.tilesInfoCache[a.getName()] ? r = e.tilesInfoCache[a.getName()] : (r = e.calcTilesInfo(a), e.tilesInfoCache[a.getName()] = r), o.loadLayerData(r, !1, i)
                        }
                        e.timer = null
                    }, this.loadDelay), this.loadDelay = d5() && i ? 200 : 80
                }
            },
            _loadLayersFromCache: function(t) {
                this.map._featureMgr.clearData();
                var e = this.tileLayers;
                e.sort(function(t, e) {
                    return t.zIndex - e.zIndex > 0
                });
                var i = e.length;
                this.tilesInfoCache = {};
                for (var n = 0; i > n; n++) {
                    var o = e[n],
                        a = o.tileType,
                        r = null;
                    this.tilesInfoCache[a.getName()] ? r = this.tilesInfoCache[a.getName()] : (r = this.calcTilesInfo(a), this.tilesInfoCache[a.getName()] = r), o.loadLayerData(r, !0, t)
                }
            },
            calcTilesInfo: function(t) {
                var e = this.map,
                    i = e.getMapType(),
                    n = be[i],
                    o = e.getZoom(),
                    a = Math.floor(o),
                    r = t.getDataZoom(o),
                    s = t.getName();
                r = dL(r, n.minDataZoom, n.maxDataZoom);
                var l = a;
                "web" === t._name ? l = r : 3 > l && (l = 3);
                var h, c, u, d, f = t.getTileSize(o),
                    p = t.getBaseTileSize(o),
                    m = t.getMercatorSize(o, r),
                    g = e.getCenter();
                i !== BMAP_SATELLITE_MAP && (g = cC.calcLoopCenterPoint(g));
                var _ = Math.floor(g.lng / m),
                    v = Math.floor(g.lat / m),
                    y = e.getBounds(),
                    b = 0,
                    w = 0;
                if (y = cC.calcLoopMapBounds(y, e.getCenter()), y.ne.lng > cC._mc180X) {
                    var x = cC.getSpaceDistanceInPixel(r);
                    b = Math.ceil(x / p)
                }
                if (y.sw.lng < cC._mcM180X) {
                    var x = cC.getSpaceDistanceInPixel(r);
                    w = Math.ceil(x / p)
                }(y.ne.lat > 19505879.362428114 || y.sw.lat < -15949096.637571886) && (y = y.clone(), y.ne.lat = 19505879.362428114, y.sw.lat = -15949096.637571886);
                var T = [Math.floor(y.sw.lng / m) - w, Math.floor(y.sw.lat / m)],
                    M = [Math.floor(y.ne.lng / m) + b, Math.floor(y.ne.lat / m)];
                h = T[0], c = M[0] + 1, u = T[1], d = M[1] + 1;
                for (var L = [], C = h; c > C; C++)
                    if (cC.isTileBlank(C, r, p) !== !0)
                        for (var I = u; d > I; I++) {
                            var S = {
                                col: C,
                                row: I,
                                zoom: r,
                                useZoom: l,
                                tileTypeName: s,
                                loopOffsetX: 0,
                                tileSize: f,
                                baseTileSize: p,
                                mercatorSize: m
                            };
                            L.push(S);
                            var D = "id_" + C + "_" + I + "_" + r;
                            L[D] = !0
                        }
                if (i !== BMAP_SATELLITE_MAP && (L = cC.calcLoopTiles(L, r, p, m)), 3 === r)
                    for (var P = 0, z = L.length; z > P; P++) {
                        var C = L[P].col,
                            I = L[P].row,
                            A = cC.calcLoopParam(C, r),
                            k = A.T,
                            B = C >= 0 ? C - k : C + k,
                            E = "id_" + B + "_" + I + "_" + r;
                        if (!L[E]) {
                            var S = {
                                col: B,
                                row: I,
                                zoom: r,
                                useZoom: l,
                                loopOffsetX: 0,
                                tileSize: f,
                                baseTileSize: p,
                                mercatorSize: m
                            };
                            L.push(S), L[E] = !0
                        }
                    }
                if (this.map._tilt > 0)
                    for (var P = 0; P < L.length; P++) {
                        var O = L[P],
                            R = O.col,
                            Z = O.row,
                            N = [];
                        N.minX = R * m, N.maxX = (R + 1) * m, N.minY = Z * m, N.maxY = (Z + 1) * m;
                        var F = new e1(0, 0);
                        F.lng = (N.minX + N.maxX) / 2, F.lat = (N.minY + N.maxY) / 2;
                        var U = e.pointToPixel(F);
                        U.x > 0 && U.x < this.map.width && U.y > 0 && U.y < this.map.height || N.minX < g.lng && N.maxX > g.lng && N.minY < g.lat && N.maxY > g.lat || this.ifTileInMapBounds(N, y, R, Z) || (L.splice(P, 1), P--)
                    }
                return L.sort(function(t) {
                    return function(e, i) {
                        return .4 * Math.abs(e.col - t[0]) + .6 * Math.abs(e.row - t[1]) - (.4 * Math.abs(i.col - t[0]) + .6 * Math.abs(i.row - t[1]))
                    }
                }([_, v])), L.zoom = r, L.tileTypeName = s, L
            },
            getCurrentViewTilesInfo: function(t) {
                var e = this.tilesInfoCache[t.getName()];
                return e ? e : this.calcTilesInfo(t)
            },
            ifTileInMapBounds: function(t, e) {
                for (var i = e.normalizedBottomLeft, n = e.normalizedTopRight, o = e.normalizedTopLeft, a = e.normalizedBottomRight, r = !1, s = new e1(t.minX, t.minY), l = new e1(t.maxX, t.maxY), h = new e1(l.lng, s.lat), c = new e1(s.lng, l.lat), u = [c, l, h, s], d = 0, f = u.length; f > d; d++) {
                    var p = d + 1;
                    p === f && (p = 0);
                    var m = d,
                        g = es(u[p], u[m], o, i);
                    if (g) {
                        r = !0;
                        break
                    }
                    if (g = es(u[p], u[m], a, n)) {
                        r = !0;
                        break
                    }
                    if (g = es(u[p], u[m], n, o)) {
                        r = !0;
                        break
                    }
                    if (g = es(u[p], u[m], i, a)) {
                        r = !0;
                        break
                    }
                }
                return r
            },
            getTileLayer: function(t) {
                for (var e = 0, i = this.tileLayers.length; i > e; e++) {
                    var n = this.tileLayers[e];
                    if (n.mapType === t) return n
                }
                return null
            }
        }), am.prototype._init = function() {
            var t = this._map;
            t.addEventListener("onspotsdataready", function(e) {
                var i = e.spots;
                this._spotsId && t.removeSpots(this._spotsId), this._spotsId = t.addSpots(i)
            })
        }, aI.register(function(t) {
            t.config.enableIconClick && (t._mapIcon = new am(t))
        }), ap.prototype._init = function(t) {
            var e = this;
            t.on("indoor_status_changed", function(i) {
                var n = i.uid,
                    o = i.floor;
                if (null === n) n = e.currentUid, e._indoorData[n] && (o = e._indoorData[n].defaultFloor), e._indoorControl && e._indoorControl.hide(), e.currentUid = null, e.currentFloor = null, e.enterMethod = null;
                else if (e._indoorData[n]) {
                    var a = e._indoorData[n];
                    o = "number" == typeof o ? o : a.defaultFloor, e._indoorControl ? (e._indoorControl.setInfo(a), e._indoorControl.show()) : t.config.showControls && t._displayOptions.indoor && (e._indoorControl = new et(t, a)), e.currentUid = n, e.currentFloor = o
                }
                if (!e._indoorData || !e._indoorData[n] || e._indoorData[n].currentFloor === o) return void this.fire(new aB("onrefresh"));
                var r = new aB("onindoor_data_refresh");
                r.uid = n, r.floor = o, r.tileKey = e._indoorData[n].tileKey, e._indoorData[n].currentFloor = o, e.currentFloor = o, this.fire(r)
            }), t.on("spotclick", function(i) {
                var n = null;
                return i.curAreaSpot && this.areaSpots[i.curAreaSpot] && (n = this.areaSpots[i.curAreaSpot].userData.uid), n === e.currentUid ? void(i.curAreaSpot && (e.enterMethod = "byClick")) : void(null === n ? e.currentUid && "byClick" === e.enterMethod && (t.showIndoor(null), e.enterMethod = null) : (e.enterMethod = "byClick", e.currentUid && t.showIndoor(e.currentUid, e._indoorData[e.currentUid].defaultFloor), t.showIndoor(n, e._indoorData[n].defaultFloor)))
            }), t.on("moveend", function() {
                this.getZoom() >= e._autoEnterZoom && e._checkIndoorByMove()
            }), t.on("zoomend", function() {
                this.getZoom() >= e._autoEnterZoom ? e._checkIndoorByMove() : "byClick" !== e.enterMethod && null !== e.currentUid && this.showIndoor(null)
            })
        }, ap.prototype._checkIndoorByMove = function() {
            var t = this._map,
                e = t.getSize(),
                i = {
                    x: e.width / 2,
                    y: e.height / 2
                },
                n = (Math.max(e.width, e.height), []);
            for (var o in this._indoorData) {
                var a = this._indoorData[o].center,
                    r = t.pointToPixel(new aI.Point(a[0], a[1])),
                    s = eG(i, r);
                n.push({
                    uid: o,
                    distance: s
                })
            }
            if (0 !== n.length) {
                n.sort(function(t, e) {
                    return t.distance - e.distance
                });
                for (var l = n[0], h = t.getCenter(), c = !1, u = 0; u < this._indoorData[l.uid].contour.length; u++)
                    if (b1([h.lng, h.lat], this._indoorData[l.uid].contour[u])) {
                        c = !0;
                        break
                    }
                if (c === !1 && "e96b44200baa3b4082288acc" === l.uid) {
                    var d = this._indoorData[l.uid].boundsMin,
                        f = this._indoorData[l.uid].boundsMax;
                    h.lng > d[0] && h.lat > d[1] && h.lng < f[0] && h.lat < f[1] && (c = !0)
                }
                c ? "byClick" !== this.enterMethod && (null !== this.currentUid && this.currentUid !== l.uid && this._map.showIndoor(this.currentUid, this._indoorData[this.currentUid].defaultFloor), this.currentUid !== l.uid && this._map.showIndoor(l.uid, this._indoorData[l.uid].defaultFloor), this.enterMethod = "byMove") : "byClick" !== this.enterMethod && this._map.showIndoor(null)
            }
        }, ap.prototype.setData = function(t) {
            if (null !== t) {
                for (var e in t)
                    if ("tileInfo" !== e) {
                        var i = t[e].tileKey;
                        if (this._indoorData[e]) this._indoorData[e][i] || (this._indoorData[e].tileKeys.push(i), this._indoorData[e][i] = !0);
                        else {
                            this._indoorData[e] = t[e], this._indoorData[e].tileKeys = [t[e].tileKey], this._indoorData[e][i] = !0;
                            for (var n = 0; n < this._indoorData[e].contour.length; n++) this._map.addAreaSpot(this._indoorData[e].contour[n], {
                                id: e + n,
                                userData: {
                                    uid: e
                                }
                            })
                        }
                    }
                this._map.getZoom() >= this._autoEnterZoom && this._checkIndoorByMove()
            }
        }, ap.prototype.removeData = function(t, e) {
            if (this._indoorData[t]) {
                for (var i = this._indoorData[t], n = 0; n < i.tileKeys.length; n++)
                    if (i.tileKeys[n] === e) {
                        i.tileKeys.splice(n, 1);
                        break
                    }
                delete i[e], 0 === i.tileKeys.length && delete this._indoorData[t]
            }
        }, ap.prototype.getIndoorData = function(t) {
            return this._indoorData[t] || null
        }, ap.prototype.getData = function() {
            return this._indoorData
        }, aI.register(function(t) {
            t._indoorMgr = new ap(t)
        });
        var cO = function() {
            function t(t) {
                if ("[object Object]" === Object.prototype.toString.call(t)) {
                    for (var e in t) return !1;
                    return !0
                }
                return !1
            }

            function e(t, e, h, c, u) {
                c = c || FS;
                var d;
                d = c ? i(t, e, h, c) : n(t, e, h, u);
                var f = d.drawId,
                    p = d.style,
                    m = d.styleUpdate,
                    g = [];
                if (!f) return g;
                for (var _ = 0; _ < f.length; _++) {
                    var v = m[f[_]] || p[f[_]];
                    if (v) {
                        switch (e) {
                            case "polygon":
                                v = s(v, t);
                                break;
                            case "line":
                                v = r(v, t);
                                break;
                            case "pointText":
                                v = o(v, t);
                                break;
                            case "point":
                                v = a(v, t);
                                break;
                            case "polygon3d":
                                v = l(v, t)
                        }
                        v && (g[g.length] = v)
                    }
                }
                return g
            }

            function i(t, e, i, n) {
                var o = n[2];
                switch (e) {
                    case "point":
                        o = o[0];
                        break;
                    case "pointText":
                        o = o[1];
                        break;
                    case "line":
                        o = o[3];
                        break;
                    case "polygon":
                        o = o[4];
                        break;
                    case "polygon3d":
                        o = o[5]
                }
                var a = i - 1;
                "line" === e && 12 === i && (a = i);
                var r = n[1][a][0],
                    s = r[t];
                return !s && 21 > i && ("point" === e || "pointText" === e) && (r = n[1][i][0], s = r[t]), {
                    drawId: s,
                    style: o,
                    styleUpdate: []
                }
            }

            function n(e, i, n, o) {
                if (!o) return {
                    drawId: null,
                    style: [],
                    styleUpdate: []
                };
                var a, r = o.baseFs;
                a = t(o.zoomRegion) ? o.StyleBody || [] : o.zoomStyleBody[n] || [];
                var s = r[2];
                switch (i) {
                    case "point":
                        s = s[0], a = a[0] || {};
                        break;
                    case "pointText":
                        s = s[1], a = a[1] || {};
                        break;
                    case "line":
                        s = s[3], a = a[3] || {};
                        break;
                    case "polygon":
                        s = s[4], a = a[4] || {};
                        break;
                    case "polygon3d":
                        s = s[5], a = a[5] || {}
                }
                var l = r[1][n - 1][0],
                    h = l[e];
                return {
                    drawId: h,
                    style: s,
                    styleUpdate: a
                }
            }

            function o(t, e) {
                return t && 0 !== t.length ? {
                    sid: e,
                    fontRgba: h(t[0]),
                    haloRgba: h(t[1]),
                    backRgba: h(t[2]),
                    fontSize: t[3],
                    haloSize: t[4],
                    fontWeight: t[5],
                    fontStyle: t[6],
                    density: t[7]
                } : null
            }

            function a(t, e) {
                return {
                    sid: e,
                    rank: t[0],
                    ucflag: t[1],
                    icon: t[2],
                    iconType: t[3],
                    nineGG: t[4],
                    density: t[5],
                    zoom: t[6]
                }
            }

            function r(t, e) {
                return {
                    sid: e,
                    borderRgba: h(t[0]),
                    fillRgba: h(t[1]),
                    borderWidth: t[2],
                    fillWidth: t[3],
                    borderCap: t[4],
                    fillCap: t[5],
                    haveBorderLine: t[6],
                    haveBorderTexture: t[7],
                    haveFillTexture: t[8],
                    isUseBorderRgba: t[9],
                    isUseFillRgba: t[10],
                    borderTexture: t[11],
                    fillTexture: t[12],
                    borderTextureType: t[13],
                    fillTextureType: t[14],
                    isRealWidth: t[15],
                    haveArrow: t[16],
                    needRound: t[17],
                    realBorderWidth: t[18]
                }
            }

            function s(t, e) {
                return {
                    sid: e,
                    fillRgba: h(t[0]),
                    borderRgba: h(t[1]),
                    borderWidth: t[2],
                    borderTexture: t[3],
                    borderTextureType: t[4],
                    waterStyle: t[5],
                    haloStyle: t[6],
                    textureStyle: t[7],
                    thickRgba: h(t[8])
                }
            }

            function l(t, e) {
                return {
                    sid: e,
                    filter: t[0],
                    ratio: t[1],
                    haveBorder: t[2],
                    borderWidth: t[3],
                    borderRgba: h(t[4]),
                    fillTop: h(t[5]),
                    fillSide: h(t[6]),
                    polyTexture: t[7]
                }
            }

            function h(t) {
                var e = t;
                if (d[e]) return d[e];
                t >>>= 0;
                var i = 255 & t,
                    n = t >> 8 & 255,
                    o = t >> 16 & 255,
                    a = t >> 24 & 255;
                return d[e] = [i, n, o, a], d[e]
            }
            var c = {},
                u = {},
                d = {};
            return {
                getStyleFromCache: function(t, i, n, o, a, r, s) {
                    t = t || "default";
                    var l = t + "-" + i + "-" + n + "-" + o;
                    return r && (l += "-indoor"), a ? (u[l] || (u[l] = e(i, n, o, a)), u[l]) : (c[l] || (c[l] = e(i, n, o, a, s)), c[l])
                }
            }
        }();
        aI.register(function(t) {
            new cm(t)
        }), cm.prototype.render = function() {
            var t = document.createElement("div");
            t.className = "click-ripple-container";
            var e = document.createElement("div");
            return e.className = "click-ripple", t.appendChild(e), this._div = t, this._ripple = e, t
        }, cm.prototype.bind = function(t) {
            var e = this;
            t.addEventListener("spotclick", function(t) {
                t.spots && 0 !== t.spots.length && (e._div.style.left = t.pixel.x + "px", e._div.style.top = t.pixel.y + "px", x.ac(e._ripple, "ripple-playing"))
            }), x.on(e._ripple, "transitionend", function() {
                x.rc(e._ripple, "ripple-playing")
            })
        }, d2.inherits(cI, "ToolbarItem"), x.extend(d2.prototype, {
            open: function() {
                return 1 == this._isOpen ? !0 : this._map._toolInUse ? !1 : (this._map._toolInUse = !0, this._isOpen = !0, !0)
            },
            close: function() {
                this._isOpen && (this._map._toolInUse = !1, this._isOpen = !1)
            },
            _checkStr: function(t) {
                return t ? t.replace(/</g, "&lt;").replace(/>/g, "&gt;") : ""
            }
        }), eB.inherits(d2, "PolylineTItem"), x.extend(eB.prototype, {
            setLineColor: function(t) {
                this._opts.lineColor = t
            },
            setLineStroke: function(t) {
                Math.round(t) > 0 && (this._opts.lineStroke = Math.round(t))
            },
            setOpacity: function(t) {
                t >= 0 && 1 >= t && (this._opts.opacity = t)
            },
            setLineStyle: function(t) {
                ("solid" === t || "dashed" === t) && (this._opts.lineStyle = t)
            },
            clear: function() {
                for (var t = 0, e = this._overlays.length; e > t; t++) this._overlays[t] && this._map.removeOverlay(this._overlays[t]);
                this._overlays.length = 0;
                for (var t = 0, e = this._dots.length; e > t; t++) this._dots[t] && this._dots[t].parentNode && this._dots[t].parentNode.removeChild(this._dots[t]);
                this._dots.length = 0
            },
            setCursor: function(t) {
                this._opts.showResult !== !0 && (this._opts.cursor = t)
            },
            getCursor: function() {
                if (this._opts.showResult === !0) return this._dCursor;
                var t = this._opts.cursor.match(/^url\((.+)\)(,.*)?/);
                return null !== t ? t[1] : this._opts.cursor
            },
            showResult: function(t) {
                this._opts.showResult = !!t
            }
        }), bv.prototype = {
            calcLoopParam: function(t, e, i) {
                i = i || 256;
                for (var n = 0, o = 3, a = 6, r = a * Math.pow(2, e - o) * 256 / i, s = r / 2 - 1, l = -r / 2; t > s;) t -= r, n -= this._loopOffset;
                for (; l > t;) t += r, n += this._loopOffset;
                var h = n;
                return n = Math.round(n / Math.pow(2, 18 - e)), {
                    offsetX: n,
                    geoOffsetX: h,
                    col: t,
                    T: r,
                    maxCol: s,
                    minCol: l
                }
            },
            calcLoopCenterPoint: function(t) {
                for (var e = t.lng; e > this._mc180X;) e -= this._mcTSpan;
                for (; e < this._mcM180X;) e += this._mcTSpan;
                return t.lng = e, t
            },
            calcLoopMapBounds: function(t, e) {
                for (var i = e || t.getCenter(), n = t.sw.lng, o = t.ne.lng; i.lng > this._mc180X;) i.lng -= this._mcTSpan, n -= this._mcTSpan, o -= this._mcTSpan;
                for (; i.lng < this._mcM180X;) i.lng += this._mcTSpan, n += this._mcTSpan, o += this._mcTSpan;
                return t.sw.lng = n, t.ne.lng = o, t.pointBottomLeft && (t.pointBottomLeft = this.calcLoopCenterPoint(t.pointBottomLeft), t.pointTopLeft = this.calcLoopCenterPoint(t.pointTopLeft), t.pointTopRight = this.calcLoopCenterPoint(t.pointTopRight), t.pointBottomRight = this.calcLoopCenterPoint(t.pointBottomRight)), t
            },
            calcLoopTiles: function(t, e, i, n) {
                i = i || 256;
                for (var o = n || Math.pow(2, 18 - e) * i, a = Math.floor(this._mc180X / o), r = Math.floor(this._mcM180X / o), s = Math.floor(this._loopOffset / o), l = [], h = 0; h < t.length; h++) {
                    var c = t[h],
                        u = c[0],
                        d = c[1];
                    if (u >= a) {
                        var f = u + s;
                        if (this.isTileBlank(f, e, i) === !0) continue;
                        var p = "id_" + f + "_" + d + "_" + e;
                        t[p] || (t[p] = !0, l.push([f, d, e, 0]))
                    } else if (r >= u) {
                        var f = u - s;
                        if (this.isTileBlank(f, e, i) === !0) continue;
                        var p = "id_" + f + "_" + d + "_" + e;
                        t[p] || (t[p] = !0, l.push([f, d, e, 0]))
                    }
                }
                for (var h = 0, m = l.length; m > h; h++) t.push(l[h]);
                for (var h = t.length - 1; h >= 0; h--) {
                    var u = t[h][0];
                    this.isTileBlank(u, e, i) && t.splice(h, 1)
                }
                return t
            },
            isTileBlank: function(t, e, i) {
                for (var n = Math.pow(2, e - 3), o = Math.round(this._validPixels * n), a = 6 * n * 256 / i; t > a / 2 - 1;) t -= a;
                for (; - (a / 2) > t;) t += a;
                return t > 0 && t * i > o ? !0 : 0 > t && Math.abs((t + 1) * i) > o ? !0 : !1
            },
            isAddWidth: function(t, e) {
                return t < this._mcM180X || e > this._mc180X
            },
            getSpaceDistanceInPixel: function(t) {
                var e = Math.round((this._spaceDistance + this._mSpaceDistance) / Math.pow(2, 18 - t));
                return e
            }
        };
        var cC = new bv,
            bk = function() {
                var t = ad("ditu", "normalTraffic"),
                    e = t.udt,
                    i = "https://traffic.map.baidu.com/traffic/",
                    n = [
                        [2, "79,210,125,1", 3, 2, 0, [], 0, 0],
                        [2, "79,210,125,1", 3, 2, 0, [], 0, 0],
                        [2, "79,210,125,1", 4, 2, 0, [], 0, 0],
                        [2, "79,210,125,1", 5, 2, 0, [], 0, 0],
                        [2, "79,210,125,1", 6, 2, 0, [], 0, 0],
                        [2, "255,208,69,1", 3, 2, 0, [], 0, 0],
                        [2, "255,208,69,1", 3, 2, 0, [], 0, 0],
                        [2, "255,208,69,1", 4, 2, 0, [], 0, 0],
                        [2, "255,208,69,1", 5, 2, 0, [], 0, 0],
                        [2, "255,208,69,1", 6, 2, 0, [], 0, 0],
                        [2, "232,14,14,1", 3, 2, 0, [], 0, 0],
                        [2, "232,14,14,1", 3, 2, 0, [], 0, 0],
                        [2, "232,14,14,1", 4, 2, 0, [], 0, 0],
                        [2, "232,14,14,1", 5, 2, 0, [], 0, 0],
                        [2, "232,14,14,1", 6, 2, 0, [], 0, 0],
                        [2, "181,0,0,1", 3, 2, 0, [], 0, 0],
                        [2, "181,0,0,1", 3, 2, 0, [], 0, 0],
                        [2, "181,0,0,1", 4, 2, 0, [], 0, 0],
                        [2, "181,0,0,1", 5, 2, 0, [], 0, 0],
                        [2, "181,0,0,1", 6, 2, 0, [], 0, 0],
                        [2, "255,255,255,1", 4, 0, 0, [], 0, 0],
                        [2, "255,255,255,1", 5.5, 0, 0, [], 0, 0],
                        [2, "255,255,255,1", 7, 0, 0, [], 0, 0],
                        [2, "255,255,255,1", 8.5, 0, 0, [], 0, 0],
                        [2, "255,255,255,1", 10, 0, 0, [], 0, 0]
                    ],
                    o = new bG({
                        transparentPng: !0,
                        dataType: 2,
                        cacheSize: 256,
                        clipTile: !0
                    });
                return o.zIndex = 2, o.getTilesUrl = function(t, n) {
                    if (!t || 7 > n) return null;
                    var o = t.x,
                        a = t.y,
                        r = i + "TrafficTileService?level=" + n + "&x=" + o + "&y=" + a + "&time=" + +new Date;
                    return "webgl" === this.map.getRenderType() && (r = i + "?qt=vtraffic&z=" + n + "&x=" + o + "&y=" + a + "&udt=" + e), r
                }, o.processData = function(t) {
                    var e = t.content,
                        i = 10;
                    "number" == typeof t.precision && (i = 10 * t.precision);
                    var o = {
                        road: [
                            [],
                            []
                        ]
                    };
                    if (!e) return o;
                    var a = e.tf;
                    if (!a) return o;
                    for (var r = 0; r < a.length; r++) {
                        for (var s = a[r][1], l = [], h = 0, c = 0, u = n[a[r][3]], d = 0, f = s.length; f / 2 > d; d++) h += s[2 * d] / i, c += s[2 * d + 1] / i, l.push(h, 256 - c);
                        var p = u[1].split(",");
                        p[3] = 255 * p[3];
                        var m = u[2] / 2;
                        o.road[0].push([l, 1, 2, [255, 255, 255, 255], m + 2]), o.road[1].push([l, 1, 2, p, m])
                    }
                    return o
                }, o
            }();
        aI.Map = bU, aI.MapType = be, aI.Point = e1, aI.LatLng = bR, aI.Pixel = cN, aI.Size = cF, aI.Bounds = cv, aI.TileLayer = bG, aI.Copyright = bS, aI.Projection = aI.Project = cP, aI.RenderTypeUtils = aA, aI.Overlay = aH, aI.Label = ai, aI.Marker = b8, aI.Icon = eO, aI.Polyline = a, aI.PolylineMultipart = dA, aI.Polygon = al, aI.InfoWindow = W, aI.SimpleInfoWindow = fc, aI.Circle = d8, aI.Control = az, aI.NavigationControl = ca, aI.NavigationControl3D = de, aI.CopyrightControl = cn, aI.ScaleControl = eS, aI.MapTypeControl = aT, aI.ZoomControl = by, aI.LocationControl = aR, aI.LogoControl = O, aI.DistanceTool = eB, aI.ContextMenu = bl, aI.MenuItem = dH, aI.OperationMask = cM, aI.Animation = l, aI.Transitions = bq, aI.Event = aB, aI.trafficLayer = bk
    }(BMap, "BMap");;
! function(t, e) {
    "use strict";
    t.returnExports = e()
}(this, function() {
    var t, e = Array,
        r = e.prototype,
        n = Object,
        o = n.prototype,
        i = Function.prototype,
        a = String,
        u = a.prototype,
        l = Number,
        c = l.prototype,
        f = r.slice,
        s = r.splice,
        p = r.push,
        h = r.unshift,
        g = r.concat,
        y = i.call,
        d = Math.max,
        v = Math.min,
        m = o.toString,
        w = "function" == typeof Symbol && "symbol" == typeof Symbol.toStringTag,
        b = Function.prototype.toString,
        T = function(t) {
            try {
                return b.call(t), !0
            } catch (e) {
                return !1
            }
        },
        x = "[object Function]",
        O = "[object GeneratorFunction]";
    t = function(t) {
        if ("function" != typeof t) return !1;
        if (w) return T(t);
        var e = m.call(t);
        return e === x || e === O
    };
    var S, j = RegExp.prototype.exec,
        E = function(t) {
            try {
                return j.call(t), !0
            } catch (e) {
                return !1
            }
        },
        I = "[object RegExp]";
    S = function(t) {
        return "object" != typeof t ? !1 : w ? E(t) : m.call(t) === I
    };
    var D, k = String.prototype.valueOf,
        M = function(t) {
            try {
                return k.call(t), !0
            } catch (e) {
                return !1
            }
        },
        N = "[object String]";
    D = function(t) {
        return "string" == typeof t ? !0 : "object" != typeof t ? !1 : w ? M(t) : m.call(t) === N
    };
    var F = function(t) {
            var e, r = n.defineProperty && function() {
                try {
                    var t = {};
                    n.defineProperty(t, "x", {
                        enumerable: !1,
                        value: t
                    });
                    for (var e in t) return !1;
                    return t.x === t
                } catch (r) {
                    return !1
                }
            }();
            return e = r ? function(t, e, r, o) {
                    !o && e in t || n.defineProperty(t, e, {
                        configurable: !0,
                        enumerable: !1,
                        writable: !0,
                        value: r
                    })
                } : function(t, e, r, n) {
                    !n && e in t || (t[e] = r)
                },
                function(r, n, o) {
                    for (var i in n) t.call(n, i) && e(r, i, n[i], o)
                }
        }(o.hasOwnProperty),
        R = function(t) {
            var e = typeof t;
            return null === t || "object" !== e && "function" !== e
        },
        $ = {
            ToInteger: function(t) {
                var e = +t;
                return e !== e ? e = 0 : 0 !== e && e !== 1 / 0 && e !== -(1 / 0) && (e = (e > 0 || -1) * Math.floor(Math.abs(e))), e
            },
            ToPrimitive: function(e) {
                var r, n, o;
                if (R(e)) return e;
                if (n = e.valueOf, t(n) && (r = n.call(e), R(r))) return r;
                if (o = e.toString, t(o) && (r = o.call(e), R(r))) return r;
                throw new TypeError
            },
            ToObject: function(t) {
                if (null == t) throw new TypeError("can't convert " + t + " to object");
                return n(t)
            },
            ToUint32: function(t) {
                return t >>> 0
            }
        },
        A = function() {};
    F(i, {
        bind: function(e) {
            var r = this;
            if (!t(r)) throw new TypeError("Function.prototype.bind called on incompatible " + r);
            for (var o, i = f.call(arguments, 1), a = function() {
                    if (this instanceof o) {
                        var t = r.apply(this, g.call(i, f.call(arguments)));
                        return n(t) === t ? t : this
                    }
                    return r.apply(e, g.call(i, f.call(arguments)))
                }, u = d(0, r.length - i.length), l = [], c = 0; u > c; c++) p.call(l, "$" + c);
            return o = Function("binder", "return function (" + l.join(",") + "){ return binder.apply(this, arguments); }")(a), r.prototype && (A.prototype = r.prototype, o.prototype = new A, A.prototype = null), o
        }
    });
    var U = y.bind(o.hasOwnProperty),
        C = y.bind(o.toString),
        P = y.bind(u.slice),
        Z = y.bind(u.split),
        J = e.isArray || function(t) {
            return "[object Array]" === C(t)
        },
        z = 1 !== [].unshift(0);
    F(r, {
        unshift: function() {
            return h.apply(this, arguments), this.length
        }
    }, z), F(e, {
        isArray: J
    });
    var B = n("a"),
        G = "a" !== B[0] || !(0 in B),
        H = function(t) {
            var e = !0,
                r = !0;
            return t && (t.call("foo", function(t, r, n) {
                "object" != typeof n && (e = !1)
            }), t.call([1], function() {
                "use strict";
                r = "string" == typeof this
            }, "x")), !!t && e && r
        };
    F(r, {
        forEach: function(e) {
            var r, n = $.ToObject(this),
                o = G && D(this) ? Z(this, "") : n,
                i = -1,
                a = o.length >>> 0;
            if (arguments.length > 1 && (r = arguments[1]), !t(e)) throw new TypeError("Array.prototype.forEach callback must be a function");
            for (; ++i < a;) i in o && ("undefined" != typeof r ? e.call(r, o[i], i, n) : e(o[i], i, n))
        }
    }, !H(r.forEach)), F(r, {
        map: function(r) {
            var n, o = $.ToObject(this),
                i = G && D(this) ? Z(this, "") : o,
                a = i.length >>> 0,
                u = e(a);
            if (arguments.length > 1 && (n = arguments[1]), !t(r)) throw new TypeError("Array.prototype.map callback must be a function");
            for (var l = 0; a > l; l++) l in i && (u[l] = "undefined" != typeof n ? r.call(n, i[l], l, o) : r(i[l], l, o));
            return u
        }
    }, !H(r.map)), F(r, {
        filter: function(e) {
            var r, n, o = $.ToObject(this),
                i = G && D(this) ? Z(this, "") : o,
                a = i.length >>> 0,
                u = [];
            if (arguments.length > 1 && (n = arguments[1]), !t(e)) throw new TypeError("Array.prototype.filter callback must be a function");
            for (var l = 0; a > l; l++) l in i && (r = i[l], ("undefined" == typeof n ? e(r, l, o) : e.call(n, r, l, o)) && p.call(u, r));
            return u
        }
    }, !H(r.filter)), F(r, {
        every: function(e) {
            var r, n = $.ToObject(this),
                o = G && D(this) ? Z(this, "") : n,
                i = o.length >>> 0;
            if (arguments.length > 1 && (r = arguments[1]), !t(e)) throw new TypeError("Array.prototype.every callback must be a function");
            for (var a = 0; i > a; a++)
                if (a in o && !("undefined" == typeof r ? e(o[a], a, n) : e.call(r, o[a], a, n))) return !1;
            return !0
        }
    }, !H(r.every)), F(r, {
        some: function(e) {
            var r, n = $.ToObject(this),
                o = G && D(this) ? Z(this, "") : n,
                i = o.length >>> 0;
            if (arguments.length > 1 && (r = arguments[1]), !t(e)) throw new TypeError("Array.prototype.some callback must be a function");
            for (var a = 0; i > a; a++)
                if (a in o && ("undefined" == typeof r ? e(o[a], a, n) : e.call(r, o[a], a, n))) return !0;
            return !1
        }
    }, !H(r.some));
    var L = !1;
    r.reduce && (L = "object" == typeof r.reduce.call("es5", function(t, e, r, n) {
        return n
    })), F(r, {
        reduce: function(e) {
            var r = $.ToObject(this),
                n = G && D(this) ? Z(this, "") : r,
                o = n.length >>> 0;
            if (!t(e)) throw new TypeError("Array.prototype.reduce callback must be a function");
            if (0 === o && 1 === arguments.length) throw new TypeError("reduce of empty array with no initial value");
            var i, a = 0;
            if (arguments.length >= 2) i = arguments[1];
            else
                for (;;) {
                    if (a in n) {
                        i = n[a++];
                        break
                    }
                    if (++a >= o) throw new TypeError("reduce of empty array with no initial value")
                }
            for (; o > a; a++) a in n && (i = e(i, n[a], a, r));
            return i
        }
    }, !L);
    var X = !1;
    r.reduceRight && (X = "object" == typeof r.reduceRight.call("es5", function(t, e, r, n) {
        return n
    })), F(r, {
        reduceRight: function(e) {
            var r = $.ToObject(this),
                n = G && D(this) ? Z(this, "") : r,
                o = n.length >>> 0;
            if (!t(e)) throw new TypeError("Array.prototype.reduceRight callback must be a function");
            if (0 === o && 1 === arguments.length) throw new TypeError("reduceRight of empty array with no initial value");
            var i, a = o - 1;
            if (arguments.length >= 2) i = arguments[1];
            else
                for (;;) {
                    if (a in n) {
                        i = n[a--];
                        break
                    }
                    if (--a < 0) throw new TypeError("reduceRight of empty array with no initial value")
                }
            if (0 > a) return i;
            do a in n && (i = e(i, n[a], a, r)); while (a--);
            return i
        }
    }, !X);
    var Y = r.indexOf && -1 !== [0, 1].indexOf(1, 2);
    F(r, {
        indexOf: function(t) {
            var e = G && D(this) ? Z(this, "") : $.ToObject(this),
                r = e.length >>> 0;
            if (0 === r) return -1;
            var n = 0;
            for (arguments.length > 1 && (n = $.ToInteger(arguments[1])), n = n >= 0 ? n : d(0, r + n); r > n; n++)
                if (n in e && e[n] === t) return n;
            return -1
        }
    }, Y);
    var q = r.lastIndexOf && -1 !== [0, 1].lastIndexOf(0, -3);
    F(r, {
        lastIndexOf: function(t) {
            var e = G && D(this) ? Z(this, "") : $.ToObject(this),
                r = e.length >>> 0;
            if (0 === r) return -1;
            var n = r - 1;
            for (arguments.length > 1 && (n = v(n, $.ToInteger(arguments[1]))), n = n >= 0 ? n : r - Math.abs(n); n >= 0; n--)
                if (n in e && t === e[n]) return n;
            return -1
        }
    }, q);
    var K = function() {
        var t = [1, 2],
            e = t.splice();
        return 2 === t.length && J(e) && 0 === e.length
    }();
    F(r, {
        splice: function() {
            return 0 === arguments.length ? [] : s.apply(this, arguments)
        }
    }, !K);
    var Q = function() {
        var t = {};
        return r.splice.call(t, 0, 0, 1), 1 === t.length
    }();
    F(r, {
        splice: function(t, e) {
            if (0 === arguments.length) return [];
            var r = arguments;
            return this.length = d($.ToInteger(this.length), 0), arguments.length > 0 && "number" != typeof e && (r = f.call(arguments), r.length < 2 ? p.call(r, this.length - t) : r[1] = $.ToInteger(e)), s.apply(this, r)
        }
    }, !Q);
    var V = function() {
            var t = new e(1e5);
            return t[8] = "x", t.splice(1, 1), 7 === t.indexOf("x")
        }(),
        W = function() {
            var t = 256,
                e = [];
            return e[t] = "a", e.splice(t + 1, 0, "b"), "a" === e[t]
        }();
    F(r, {
        splice: function(t, e) {
            for (var r, n = $.ToObject(this), o = [], i = $.ToUint32(n.length), u = $.ToInteger(t), l = 0 > u ? d(i + u, 0) : v(u, i), c = v(d($.ToInteger(e), 0), i - l), s = 0; c > s;) r = a(l + s), U(n, r) && (o[s] = n[r]), s += 1;
            var p, h = f.call(arguments, 2),
                g = h.length;
            if (c > g) {
                for (s = l; i - c > s;) r = a(s + c), p = a(s + g), U(n, r) ? n[p] = n[r] : delete n[p], s += 1;
                for (s = i; s > i - c + g;) delete n[s - 1], s -= 1
            } else if (g > c)
                for (s = i - c; s > l;) r = a(s + c - 1), p = a(s + g - 1), U(n, r) ? n[p] = n[r] : delete n[p], s -= 1;
            s = l;
            for (var y = 0; y < h.length; ++y) n[s] = h[y], s += 1;
            return n.length = i - c + g, o
        }
    }, !V || !W);
    var _ = !{
            toString: null
        }.propertyIsEnumerable("toString"),
        te = function() {}.propertyIsEnumerable("prototype"),
        ee = !U("x", "0"),
        re = function(t) {
            var e = t.constructor;
            return e && e.prototype === t
        },
        ne = {
            $window: !0,
            $console: !0,
            $parent: !0,
            $self: !0,
            $frames: !0,
            $frameElement: !0,
            $webkitIndexedDB: !0,
            $webkitStorageInfo: !0
        },
        oe = function() {
            if ("undefined" == typeof window) return !1;
            for (var t in window) try {
                !ne["$" + t] && U(window, t) && null !== window[t] && "object" == typeof window[t] && re(window[t])
            } catch (e) {
                return !0
            }
            return !1
        }(),
        ie = function(t) {
            if ("undefined" == typeof window || !oe) return re(t);
            try {
                return re(t)
            } catch (e) {
                return !1
            }
        },
        ae = ["toString", "toLocaleString", "valueOf", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "constructor"],
        ue = ae.length,
        le = function(t) {
            return "[object Arguments]" === C(t)
        },
        ce = function(e) {
            return null !== e && "object" == typeof e && "number" == typeof e.length && e.length >= 0 && !J(e) && t(e.callee)
        },
        fe = le(arguments) ? le : ce;
    F(n, {
        keys: function(e) {
            var r = t(e),
                n = fe(e),
                o = null !== e && "object" == typeof e,
                i = o && D(e);
            if (!o && !r && !n) throw new TypeError("Object.keys called on a non-object");
            var u = [],
                l = te && r;
            if (i && ee || n)
                for (var c = 0; c < e.length; ++c) p.call(u, a(c));
            if (!n)
                for (var f in e) l && "prototype" === f || !U(e, f) || p.call(u, a(f));
            if (_)
                for (var s = ie(e), h = 0; ue > h; h++) {
                    var g = ae[h];
                    s && "constructor" === g || !U(e, g) || p.call(u, g)
                }
            return u
        }
    });
    var se = n.keys && function() {
            return 2 === n.keys(arguments).length
        }(1, 2),
        pe = n.keys && function() {
            var t = n.keys(arguments);
            return 1 !== arguments.length || 1 !== t.length || 1 !== t[0]
        }(1),
        he = n.keys;
    F(n, {
        keys: function(t) {
            return he(fe(t) ? f.call(t) : t)
        }
    }, !se || pe);
    var ge = -621987552e5,
        ye = "-000001",
        de = Date.prototype.toISOString && -1 === new Date(ge).toISOString().indexOf(ye),
        ve = Date.prototype.toISOString && "1969-12-31T23:59:59.999Z" !== new Date(-1).toISOString();
    F(Date.prototype, {
        toISOString: function() {
            var t, e, r, n, o;
            if (!isFinite(this)) throw new RangeError("Date.prototype.toISOString called on non-finite value.");
            for (n = this.getUTCFullYear(), o = this.getUTCMonth(), n += Math.floor(o / 12), o = (o % 12 + 12) % 12, t = [o + 1, this.getUTCDate(), this.getUTCHours(), this.getUTCMinutes(), this.getUTCSeconds()], n = (0 > n ? "-" : n > 9999 ? "+" : "") + P("00000" + Math.abs(n), n >= 0 && 9999 >= n ? -4 : -6), e = t.length; e--;) r = t[e], 10 > r && (t[e] = "0" + r);
            return n + "-" + f.call(t, 0, 2).join("-") + "T" + f.call(t, 2).join(":") + "." + P("000" + this.getUTCMilliseconds(), -3) + "Z"
        }
    }, de || ve);
    var me = function() {
        try {
            return Date.prototype.toJSON && null === new Date(0 / 0).toJSON() && -1 !== new Date(ge).toJSON().indexOf(ye) && Date.prototype.toJSON.call({
                toISOString: function() {
                    return !0
                }
            })
        } catch (t) {
            return !1
        }
    }();
    me || (Date.prototype.toJSON = function() {
        var e = n(this),
            r = $.ToPrimitive(e);
        if ("number" == typeof r && !isFinite(r)) return null;
        var o = e.toISOString;
        if (!t(o)) throw new TypeError("toISOString property is not callable");
        return o.call(e)
    });
    var we = 1e15 === Date.parse("+033658-09-27T01:46:40.000Z"),
        be = !isNaN(Date.parse("2012-04-04T24:00:00.500Z")) || !isNaN(Date.parse("2012-11-31T23:59:59.000Z")) || !isNaN(Date.parse("2012-12-31T23:59:60.000Z")),
        Te = isNaN(Date.parse("2000-01-01T00:00:00.000Z"));
    (Te || be || !we) && (Date = function(t) {
        var e = function(r, n, o, i, u, l, c) {
                var f, s = arguments.length;
                return f = this instanceof t ? 1 === s && a(r) === r ? new t(e.parse(r)) : s >= 7 ? new t(r, n, o, i, u, l, c) : s >= 6 ? new t(r, n, o, i, u, l) : s >= 5 ? new t(r, n, o, i, u) : s >= 4 ? new t(r, n, o, i) : s >= 3 ? new t(r, n, o) : s >= 2 ? new t(r, n) : s >= 1 ? new t(r) : new t : t.apply(this, arguments), R(f) || F(f, {
                    constructor: e
                }, !0), f
            },
            r = new RegExp("^(\\d{4}|[+-]\\d{6})(?:-(\\d{2})(?:-(\\d{2})(?:T(\\d{2}):(\\d{2})(?::(\\d{2})(?:(\\.\\d{1,}))?)?(Z|(?:([-+])(\\d{2}):(\\d{2})))?)?)?)?$"),
            n = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334, 365],
            o = function(t, e) {
                var r = e > 1 ? 1 : 0;
                return n[e] + Math.floor((t - 1969 + r) / 4) - Math.floor((t - 1901 + r) / 100) + Math.floor((t - 1601 + r) / 400) + 365 * (t - 1970)
            },
            i = function(e) {
                return l(new t(1970, 0, 1, 0, 0, 0, e))
            };
        for (var u in t) U(t, u) && (e[u] = t[u]);
        F(e, {
            now: t.now,
            UTC: t.UTC
        }, !0), e.prototype = t.prototype, F(e.prototype, {
            constructor: e
        }, !0);
        var c = function(e) {
            var n = r.exec(e);
            if (n) {
                var a, u = l(n[1]),
                    c = l(n[2] || 1) - 1,
                    f = l(n[3] || 1) - 1,
                    s = l(n[4] || 0),
                    p = l(n[5] || 0),
                    h = l(n[6] || 0),
                    g = Math.floor(1e3 * l(n[7] || 0)),
                    y = Boolean(n[4] && !n[8]),
                    d = "-" === n[9] ? 1 : -1,
                    v = l(n[10] || 0),
                    m = l(n[11] || 0);
                return (p > 0 || h > 0 || g > 0 ? 24 : 25) > s && 60 > p && 60 > h && 1e3 > g && c > -1 && 12 > c && 24 > v && 60 > m && f > -1 && f < o(u, c + 1) - o(u, c) && (a = 60 * (24 * (o(u, c) + f) + s + v * d), a = 1e3 * (60 * (a + p + m * d) + h) + g, y && (a = i(a)), a >= -864e13 && 864e13 >= a) ? a : 0 / 0
            }
            return t.parse.apply(this, arguments)
        };
        return F(e, {
            parse: c
        }), e
    }(Date)), Date.now || (Date.now = function() {
        return (new Date).getTime()
    });
    var xe = c.toFixed && ("0.000" !== 8e-5.toFixed(3) || "1" !== .9.toFixed(0) || "1.25" !== 1.255.toFixed(2) || "1000000000000000128" !== 0xde0b6b3a7640080.toFixed(0)),
        Oe = {
            base: 1e7,
            size: 6,
            data: [0, 0, 0, 0, 0, 0],
            multiply: function(t, e) {
                for (var r = -1, n = e; ++r < Oe.size;) n += t * Oe.data[r], Oe.data[r] = n % Oe.base, n = Math.floor(n / Oe.base)
            },
            divide: function(t) {
                for (var e = Oe.size, r = 0; --e >= 0;) r += Oe.data[e], Oe.data[e] = Math.floor(r / t), r = r % t * Oe.base
            },
            numToString: function() {
                for (var t = Oe.size, e = ""; --t >= 0;)
                    if ("" !== e || 0 === t || 0 !== Oe.data[t]) {
                        var r = a(Oe.data[t]);
                        "" === e ? e = r : e += P("0000000", 0, 7 - r.length) + r
                    }
                return e
            },
            pow: function $e(t, e, r) {
                return 0 === e ? r : e % 2 === 1 ? $e(t, e - 1, r * t) : $e(t * t, e / 2, r)
            },
            log: function(t) {
                for (var e = 0, r = t; r >= 4096;) e += 12, r /= 4096;
                for (; r >= 2;) e += 1, r /= 2;
                return e
            }
        };
    F(c, {
        toFixed: function(t) {
            var e, r, n, o, i, u, c, f;
            if (e = l(t), e = e !== e ? 0 : Math.floor(e), 0 > e || e > 20) throw new RangeError("Number.toFixed called with invalid number of decimals");
            if (r = l(this), r !== r) return "NaN";
            if (-1e21 >= r || r >= 1e21) return a(r);
            if (n = "", 0 > r && (n = "-", r = -r), o = "0", r > 1e-21)
                if (i = Oe.log(r * Oe.pow(2, 69, 1)) - 69, u = 0 > i ? r * Oe.pow(2, -i, 1) : r / Oe.pow(2, i, 1), u *= 4503599627370496, i = 52 - i, i > 0) {
                    for (Oe.multiply(0, u), c = e; c >= 7;) Oe.multiply(1e7, 0), c -= 7;
                    for (Oe.multiply(Oe.pow(10, c, 1), 0), c = i - 1; c >= 23;) Oe.divide(1 << 23), c -= 23;
                    Oe.divide(1 << c), Oe.multiply(1, 1), Oe.divide(2), o = Oe.numToString()
                } else Oe.multiply(0, u), Oe.multiply(1 << -i, 0), o = Oe.numToString() + P("0.00000000000000000000", 2, 2 + e);
            return e > 0 ? (f = o.length, o = e >= f ? n + P("0.0000000000000000000", 0, e - f + 2) + o : n + P(o, 0, f - e) + "." + P(o, f - e)) : o = n + o, o
        }
    }, xe), 2 !== "ab".split(/(?:ab)*/).length || 4 !== ".".split(/(.?)(.?)/).length || "t" === "tesst".split(/(s)*/)[1] || 4 !== "test".split(/(?:)/, -1).length || "".split(/.?/).length || ".".split(/()()/).length > 1 ? ! function() {
        var t = "undefined" == typeof /()??/.exec("")[1];
        u.split = function(e, r) {
            var n = this;
            if ("undefined" == typeof e && 0 === r) return [];
            if (!S(e)) return Z(this, e, r);
            var o, i, a, u, l = [],
                c = (e.ignoreCase ? "i" : "") + (e.multiline ? "m" : "") + (e.unicode ? "u" : "") + (e.sticky ? "y" : ""),
                s = 0,
                h = new RegExp(e.source, c + "g");
            n += "", t || (o = new RegExp("^" + h.source + "$(?!\\s)", c));
            var g = "undefined" == typeof r ? -1 >>> 0 : $.ToUint32(r);
            for (i = h.exec(n); i && (a = i.index + i[0].length, !(a > s && (p.call(l, P(n, s, i.index)), !t && i.length > 1 && i[0].replace(o, function() {
                    for (var t = 1; t < arguments.length - 2; t++) "undefined" == typeof arguments[t] && (i[t] = void 0)
                }), i.length > 1 && i.index < n.length && p.apply(l, f.call(i, 1)), u = i[0].length, s = a, l.length >= g)));) h.lastIndex === i.index && h.lastIndex++, i = h.exec(n);
            return s === n.length ? (u || !h.test("")) && p.call(l, "") : p.call(l, P(n, s)), l.length > g ? P(l, 0, g) : l
        }
    }() : "0".split(void 0, 0).length && (u.split = function(t, e) {
        return "undefined" == typeof t && 0 === e ? [] : Z(this, t, e)
    });
    var Se = u.replace,
        je = function() {
            var t = [];
            return "x".replace(/x(.)?/g, function(e, r) {
                p.call(t, r)
            }), 1 === t.length && "undefined" == typeof t[0]
        }();
    je || (u.replace = function(e, r) {
        var n = t(r),
            o = S(e) && /\)[*?]/.test(e.source);
        if (n && o) {
            var i = function(t) {
                var n = arguments.length,
                    o = e.lastIndex;
                e.lastIndex = 0;
                var i = e.exec(t) || [];
                return e.lastIndex = o, p.call(i, arguments[n - 2], arguments[n - 1]), r.apply(this, i)
            };
            return Se.call(this, e, i)
        }
        return Se.call(this, e, r)
    });
    var Ee = u.substr,
        Ie = "".substr && "b" !== "0b".substr(-1);
    F(u, {
        substr: function(t, e) {
            var r = t;
            return 0 > t && (r = d(this.length + t, 0)), Ee.call(this, r, e)
        }
    }, Ie);
    var De = "	\n\f\r   ᠎             　\u2028\u2029﻿",
        ke = "​",
        Me = "[" + De + "]",
        Ne = new RegExp("^" + Me + Me + "*"),
        Fe = new RegExp(Me + Me + "*$"),
        Re = u.trim && (De.trim() || !ke.trim());
    F(u, {
        trim: function() {
            if ("undefined" == typeof this || null === this) throw new TypeError("can't convert " + this + " to object");
            return a(this).replace(Ne, "").replace(Fe, "")
        }
    }, Re), (8 !== parseInt(De + "08") || 22 !== parseInt(De + "0x16")) && (parseInt = function(t) {
        var e = /^0[xX]/;
        return function(r, n) {
            var o = a(r).trim(),
                i = l(n) || (e.test(o) ? 16 : 10);
            return t(o, i)
        }
    }(parseInt))
});;
(function() {
    "use strict";

    function t(t) {
        return "function" == typeof t || "object" == typeof t && null !== t
    }

    function n(t) {
        return "function" == typeof t
    }

    function e(t) {
        return "object" == typeof t && null !== t
    }

    function r(t) {
        U = t
    }

    function o(t) {
        G = t
    }

    function i() {
        return function() {
            process.nextTick(f)
        }
    }

    function u() {
        return function() {
            N(f)
        }
    }

    function s() {
        var t = 0,
            n = new Q(f),
            e = document.createTextNode("");
        return n.observe(e, {
                characterData: !0
            }),
            function() {
                e.data = t = ++t % 2
            }
    }

    function c() {
        var t = new MessageChannel;
        return t.port1.onmessage = f,
            function() {
                t.port2.postMessage(0)
            }
    }

    function a() {
        return function() {
            setTimeout(f, 1)
        }
    }

    function f() {
        for (var t = 0; B > t; t += 2) {
            var n = X[t],
                e = X[t + 1];
            n(e), X[t] = void 0, X[t + 1] = void 0
        }
        B = 0
    }

    function l() {
        try {
            var t = require,
                n = t("vertx");
            return N = n.runOnLoop || n.runOnContext, u()
        } catch (e) {
            return a()
        }
    }

    function p() {}

    function _() {
        return new TypeError("You cannot resolve a promise with itself")
    }

    function h() {
        return new TypeError("A promises callback cannot return that same promise.")
    }

    function v(t) {
        try {
            return t.then
        } catch (n) {
            return nn.error = n, nn
        }
    }

    function d(t, n, e, r) {
        try {
            t.call(n, e, r)
        } catch (o) {
            return o
        }
    }

    function y(t, n, e) {
        G(function(t) {
            var r = !1,
                o = d(e, n, function(e) {
                    r || (r = !0, n !== e ? g(t, e) : A(t, e))
                }, function(n) {
                    r || (r = !0, E(t, n))
                }, "Settle: " + (t._label || " unknown promise"));
            !r && o && (r = !0, E(t, o))
        }, t)
    }

    function m(t, n) {
        n._state === $ ? A(t, n._result) : n._state === tn ? E(t, n._result) : j(n, void 0, function(n) {
            g(t, n)
        }, function(n) {
            E(t, n)
        })
    }

    function b(t, e) {
        if (e.constructor === t.constructor) m(t, e);
        else {
            var r = v(e);
            r === nn ? E(t, nn.error) : void 0 === r ? A(t, e) : n(r) ? y(t, e, r) : A(t, e)
        }
    }

    function g(n, e) {
        n === e ? E(n, _()) : t(e) ? b(n, e) : A(n, e)
    }

    function w(t) {
        t._onerror && t._onerror(t._result), S(t)
    }

    function A(t, n) {
        t._state === Z && (t._result = n, t._state = $, 0 !== t._subscribers.length && G(S, t))
    }

    function E(t, n) {
        t._state === Z && (t._state = tn, t._result = n, G(w, t))
    }

    function j(t, n, e, r) {
        var o = t._subscribers,
            i = o.length;
        t._onerror = null, o[i] = n, o[i + $] = e, o[i + tn] = r, 0 === i && t._state && G(S, t)
    }

    function S(t) {
        var n = t._subscribers,
            e = t._state;
        if (0 !== n.length) {
            for (var r, o, i = t._result, u = 0; u < n.length; u += 3) r = n[u], o = n[u + e], r ? x(e, r, o, i) : o(i);
            t._subscribers.length = 0
        }
    }

    function T() {
        this.error = null
    }

    function P(t, n) {
        try {
            return t(n)
        } catch (e) {
            return en.error = e, en
        }
    }

    function x(t, e, r, o) {
        var i, u, s, c, a = n(r);
        if (a) {
            if (i = P(r, o), i === en ? (c = !0, u = i.error, i = null) : s = !0, e === i) return void E(e, h())
        } else i = o, s = !0;
        e._state !== Z || (a && s ? g(e, i) : c ? E(e, u) : t === $ ? A(e, i) : t === tn && E(e, i))
    }

    function C(t, n) {
        try {
            n(function(n) {
                g(t, n)
            }, function(n) {
                E(t, n)
            })
        } catch (e) {
            E(t, e)
        }
    }

    function M(t, n) {
        var e = this;
        e._instanceConstructor = t, e.promise = new t(p), e._validateInput(n) ? (e._input = n, e.length = n.length, e._remaining = n.length, e._init(), 0 === e.length ? A(e.promise, e._result) : (e.length = e.length || 0, e._enumerate(), 0 === e._remaining && A(e.promise, e._result))) : E(e.promise, e._validationError())
    }

    function O(t) {
        return new rn(this, t).promise
    }

    function k(t) {
        function n(t) {
            g(o, t)
        }

        function e(t) {
            E(o, t)
        }
        var r = this,
            o = new r(p);
        if (!z(t)) return E(o, new TypeError("You must pass an array to race.")), o;
        for (var i = t.length, u = 0; o._state === Z && i > u; u++) j(r.resolve(t[u]), void 0, n, e);
        return o
    }

    function Y(t) {
        var n = this;
        if (t && "object" == typeof t && t.constructor === n) return t;
        var e = new n(p);
        return g(e, t), e
    }

    function q(t) {
        var n = this,
            e = new n(p);
        return E(e, t), e
    }

    function F() {
        throw new TypeError("You must pass a resolver function as the first argument to the promise constructor")
    }

    function I() {
        throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.")
    }

    function D(t) {
        this._id = an++, this._state = void 0, this._result = void 0, this._subscribers = [], p !== t && (n(t) || F(), this instanceof D || I(), C(this, t))
    }

    function K() {
        var t;
        if ("undefined" != typeof global) t = global;
        else if ("undefined" != typeof self) t = self;
        else try {
            t = Function("return this")()
        } catch (n) {
            throw new Error("polyfill failed because global object is unavailable in this environment")
        }
        var e = t.Promise;
        (!e || "[object Promise]" !== Object.prototype.toString.call(e.resolve()) || e.cast) && (t.Promise = fn)
    }
    var L;
    L = Array.isArray ? Array.isArray : function(t) {
        return "[object Array]" === Object.prototype.toString.call(t)
    };
    var N, U, W, z = L,
        B = 0,
        G = ({}.toString, function(t, n) {
            X[B] = t, X[B + 1] = n, B += 2, 2 === B && (U ? U(f) : W())
        }),
        H = "undefined" != typeof window ? window : void 0,
        J = H || {},
        Q = J.MutationObserver || J.WebKitMutationObserver,
        R = "undefined" != typeof process && "[object process]" === {}.toString.call(process),
        V = "undefined" != typeof Uint8ClampedArray && "undefined" != typeof importScripts && "undefined" != typeof MessageChannel,
        X = new Array(1e3);
    W = R ? i() : Q ? s() : V ? c() : void 0 === H && "function" == typeof require ? l() : a();
    var Z = void 0,
        $ = 1,
        tn = 2,
        nn = new T,
        en = new T;
    M.prototype._validateInput = function(t) {
        return z(t)
    }, M.prototype._validationError = function() {
        return new Error("Array Methods must be provided an Array")
    }, M.prototype._init = function() {
        this._result = new Array(this.length)
    };
    var rn = M;
    M.prototype._enumerate = function() {
        for (var t = this, n = t.length, e = t.promise, r = t._input, o = 0; e._state === Z && n > o; o++) t._eachEntry(r[o], o)
    }, M.prototype._eachEntry = function(t, n) {
        var r = this,
            o = r._instanceConstructor;
        e(t) ? t.constructor === o && t._state !== Z ? (t._onerror = null, r._settledAt(t._state, n, t._result)) : r._willSettleAt(o.resolve(t), n) : (r._remaining--, r._result[n] = t)
    }, M.prototype._settledAt = function(t, n, e) {
        var r = this,
            o = r.promise;
        o._state === Z && (r._remaining--, t === tn ? E(o, e) : r._result[n] = e), 0 === r._remaining && A(o, r._result)
    }, M.prototype._willSettleAt = function(t, n) {
        var e = this;
        j(t, void 0, function(t) {
            e._settledAt($, n, t)
        }, function(t) {
            e._settledAt(tn, n, t)
        })
    };
    var on = O,
        un = k,
        sn = Y,
        cn = q,
        an = 0,
        fn = D;
    D.all = on, D.race = un, D.resolve = sn, D.reject = cn, D._setScheduler = r, D._setAsap = o, D._asap = G, D.prototype = {
        constructor: D,
        then: function(t, n) {
            var e = this,
                r = e._state;
            if (r === $ && !t || r === tn && !n) return this;
            var o = new this.constructor(p),
                i = e._result;
            if (r) {
                var u = arguments[r - 1];
                G(function() {
                    x(r, o, u, i)
                })
            } else j(e, o, t, n);
            return o
        },
        "catch": function(t) {
            return this.then(null, t)
        }
    };
    var ln = K,
        pn = {
            Promise: fn,
            polyfill: ln
        };
    "function" == typeof define && define.amd ? define(function() {
        return pn
    }) : "undefined" != typeof module && module.exports ? module.exports = pn : "undefined" != typeof this && (this.ES6Promise = pn), ln()
}).call(this);;
(function() {
    function n(n) {
        function t(t, r, e, u, i, o) {
            for (; i >= 0 && o > i; i += n) {
                var a = u ? u[i] : i;
                e = r(e, t[a], a, t)
            }
            return e
        }
        return function(r, e, u, i) {
            e = b(e, i, 4);
            var o = !k(r) && m.keys(r),
                a = (o || r).length,
                c = n > 0 ? 0 : a - 1;
            return arguments.length < 3 && (u = r[o ? o[c] : c], c += n), t(r, e, u, o, c, a)
        }
    }

    function t(n) {
        return function(t, r, e) {
            r = x(r, e);
            for (var u = O(t), i = n > 0 ? 0 : u - 1; i >= 0 && u > i; i += n)
                if (r(t[i], i, t)) return i;
            return -1
        }
    }

    function r(n, t, r) {
        return function(e, u, i) {
            var o = 0,
                a = O(e);
            if ("number" == typeof i) n > 0 ? o = i >= 0 ? i : Math.max(i + a, o) : a = i >= 0 ? Math.min(i + 1, a) : i + a + 1;
            else if (r && i && a) return i = r(e, u), e[i] === u ? i : -1;
            if (u !== u) return i = t(l.call(e, o, a), m.isNaN), i >= 0 ? i + o : -1;
            for (i = n > 0 ? o : a - 1; i >= 0 && a > i; i += n)
                if (e[i] === u) return i;
            return -1
        }
    }

    function e(n, t) {
        var r = I.length,
            e = n.constructor,
            u = m.isFunction(e) && e.prototype || a,
            i = "constructor";
        for (m.has(n, i) && !m.contains(t, i) && t.push(i); r--;) i = I[r], i in n && n[i] !== u[i] && !m.contains(t, i) && t.push(i)
    }
    var u = this,
        i = u._,
        o = Array.prototype,
        a = Object.prototype,
        c = Function.prototype,
        f = o.push,
        l = o.slice,
        s = a.toString,
        p = a.hasOwnProperty,
        h = Array.isArray,
        v = Object.keys,
        g = c.bind,
        y = Object.create,
        d = function() {},
        m = function(n) {
            return n instanceof m ? n : this instanceof m ? void(this._wrapped = n) : new m(n)
        };
    "undefined" != typeof exports ? ("undefined" != typeof module && module.exports && (exports = module.exports = m), exports._ = m) : u._ = m, m.VERSION = "1.8.3";
    var b = function(n, t, r) {
            if (void 0 === t) return n;
            switch (null == r ? 3 : r) {
                case 1:
                    return function(r) {
                        return n.call(t, r)
                    };
                case 2:
                    return function(r, e) {
                        return n.call(t, r, e)
                    };
                case 3:
                    return function(r, e, u) {
                        return n.call(t, r, e, u)
                    };
                case 4:
                    return function(r, e, u, i) {
                        return n.call(t, r, e, u, i)
                    }
            }
            return function() {
                return n.apply(t, arguments)
            }
        },
        x = function(n, t, r) {
            return null == n ? m.identity : m.isFunction(n) ? b(n, t, r) : m.isObject(n) ? m.matcher(n) : m.property(n)
        };
    m.iteratee = function(n, t) {
        return x(n, t, 1 / 0)
    };
    var _ = function(n, t) {
            return function(r) {
                var e = arguments.length;
                if (2 > e || null == r) return r;
                for (var u = 1; e > u; u++)
                    for (var i = arguments[u], o = n(i), a = o.length, c = 0; a > c; c++) {
                        var f = o[c];
                        t && void 0 !== r[f] || (r[f] = i[f])
                    }
                return r
            }
        },
        j = function(n) {
            if (!m.isObject(n)) return {};
            if (y) return y(n);
            d.prototype = n;
            var t = new d;
            return d.prototype = null, t
        },
        w = function(n) {
            return function(t) {
                return null == t ? void 0 : t[n]
            }
        },
        A = Math.pow(2, 53) - 1,
        O = w("length"),
        k = function(n) {
            var t = O(n);
            return "number" == typeof t && t >= 0 && A >= t
        };
    m.each = m.forEach = function(n, t, r) {
        t = b(t, r);
        var e, u;
        if (k(n))
            for (e = 0, u = n.length; u > e; e++) t(n[e], e, n);
        else {
            var i = m.keys(n);
            for (e = 0, u = i.length; u > e; e++) t(n[i[e]], i[e], n)
        }
        return n
    }, m.map = m.collect = function(n, t, r) {
        t = x(t, r);
        for (var e = !k(n) && m.keys(n), u = (e || n).length, i = Array(u), o = 0; u > o; o++) {
            var a = e ? e[o] : o;
            i[o] = t(n[a], a, n)
        }
        return i
    }, m.reduce = m.foldl = m.inject = n(1), m.reduceRight = m.foldr = n(-1), m.find = m.detect = function(n, t, r) {
        var e;
        return e = k(n) ? m.findIndex(n, t, r) : m.findKey(n, t, r), void 0 !== e && -1 !== e ? n[e] : void 0
    }, m.filter = m.select = function(n, t, r) {
        var e = [];
        return t = x(t, r), m.each(n, function(n, r, u) {
            t(n, r, u) && e.push(n)
        }), e
    }, m.reject = function(n, t, r) {
        return m.filter(n, m.negate(x(t)), r)
    }, m.every = m.all = function(n, t, r) {
        t = x(t, r);
        for (var e = !k(n) && m.keys(n), u = (e || n).length, i = 0; u > i; i++) {
            var o = e ? e[i] : i;
            if (!t(n[o], o, n)) return !1
        }
        return !0
    }, m.some = m.any = function(n, t, r) {
        t = x(t, r);
        for (var e = !k(n) && m.keys(n), u = (e || n).length, i = 0; u > i; i++) {
            var o = e ? e[i] : i;
            if (t(n[o], o, n)) return !0
        }
        return !1
    }, m.contains = m.includes = m.include = function(n, t, r, e) {
        return k(n) || (n = m.values(n)), ("number" != typeof r || e) && (r = 0), m.indexOf(n, t, r) >= 0
    }, m.invoke = function(n, t) {
        var r = l.call(arguments, 2),
            e = m.isFunction(t);
        return m.map(n, function(n) {
            var u = e ? t : n[t];
            return null == u ? u : u.apply(n, r)
        })
    }, m.pluck = function(n, t) {
        return m.map(n, m.property(t))
    }, m.where = function(n, t) {
        return m.filter(n, m.matcher(t))
    }, m.findWhere = function(n, t) {
        return m.find(n, m.matcher(t))
    }, m.max = function(n, t, r) {
        var e, u, i = -1 / 0,
            o = -1 / 0;
        if (null == t && null != n) {
            n = k(n) ? n : m.values(n);
            for (var a = 0, c = n.length; c > a; a++) e = n[a], e > i && (i = e)
        } else t = x(t, r), m.each(n, function(n, r, e) {
            u = t(n, r, e), (u > o || u === -1 / 0 && i === -1 / 0) && (i = n, o = u)
        });
        return i
    }, m.min = function(n, t, r) {
        var e, u, i = 1 / 0,
            o = 1 / 0;
        if (null == t && null != n) {
            n = k(n) ? n : m.values(n);
            for (var a = 0, c = n.length; c > a; a++) e = n[a], i > e && (i = e)
        } else t = x(t, r), m.each(n, function(n, r, e) {
            u = t(n, r, e), (o > u || 1 / 0 === u && 1 / 0 === i) && (i = n, o = u)
        });
        return i
    }, m.shuffle = function(n) {
        for (var t, r = k(n) ? n : m.values(n), e = r.length, u = Array(e), i = 0; e > i; i++) t = m.random(0, i), t !== i && (u[i] = u[t]), u[t] = r[i];
        return u
    }, m.sample = function(n, t, r) {
        return null == t || r ? (k(n) || (n = m.values(n)), n[m.random(n.length - 1)]) : m.shuffle(n).slice(0, Math.max(0, t))
    }, m.sortBy = function(n, t, r) {
        return t = x(t, r), m.pluck(m.map(n, function(n, r, e) {
            return {
                value: n,
                index: r,
                criteria: t(n, r, e)
            }
        }).sort(function(n, t) {
            var r = n.criteria,
                e = t.criteria;
            if (r !== e) {
                if (r > e || void 0 === r) return 1;
                if (e > r || void 0 === e) return -1
            }
            return n.index - t.index
        }), "value")
    };
    var F = function(n) {
        return function(t, r, e) {
            var u = {};
            return r = x(r, e), m.each(t, function(e, i) {
                var o = r(e, i, t);
                n(u, e, o)
            }), u
        }
    };
    m.groupBy = F(function(n, t, r) {
        m.has(n, r) ? n[r].push(t) : n[r] = [t]
    }), m.indexBy = F(function(n, t, r) {
        n[r] = t
    }), m.countBy = F(function(n, t, r) {
        m.has(n, r) ? n[r]++ : n[r] = 1
    }), m.toArray = function(n) {
        return n ? m.isArray(n) ? l.call(n) : k(n) ? m.map(n, m.identity) : m.values(n) : []
    }, m.size = function(n) {
        return null == n ? 0 : k(n) ? n.length : m.keys(n).length
    }, m.partition = function(n, t, r) {
        t = x(t, r);
        var e = [],
            u = [];
        return m.each(n, function(n, r, i) {
            (t(n, r, i) ? e : u).push(n)
        }), [e, u]
    }, m.first = m.head = m.take = function(n, t, r) {
        return null == n ? void 0 : null == t || r ? n[0] : m.initial(n, n.length - t)
    }, m.initial = function(n, t, r) {
        return l.call(n, 0, Math.max(0, n.length - (null == t || r ? 1 : t)))
    }, m.last = function(n, t, r) {
        return null == n ? void 0 : null == t || r ? n[n.length - 1] : m.rest(n, Math.max(0, n.length - t))
    }, m.rest = m.tail = m.drop = function(n, t, r) {
        return l.call(n, null == t || r ? 1 : t)
    }, m.compact = function(n) {
        return m.filter(n, m.identity)
    };
    var S = function(n, t, r, e) {
        for (var u = [], i = 0, o = e || 0, a = O(n); a > o; o++) {
            var c = n[o];
            if (k(c) && (m.isArray(c) || m.isArguments(c))) {
                t || (c = S(c, t, r));
                var f = 0,
                    l = c.length;
                for (u.length += l; l > f;) u[i++] = c[f++]
            } else r || (u[i++] = c)
        }
        return u
    };
    m.flatten = function(n, t) {
        return S(n, t, !1)
    }, m.without = function(n) {
        return m.difference(n, l.call(arguments, 1))
    }, m.uniq = m.unique = function(n, t, r, e) {
        m.isBoolean(t) || (e = r, r = t, t = !1), null != r && (r = x(r, e));
        for (var u = [], i = [], o = 0, a = O(n); a > o; o++) {
            var c = n[o],
                f = r ? r(c, o, n) : c;
            t ? (o && i === f || u.push(c), i = f) : r ? m.contains(i, f) || (i.push(f), u.push(c)) : m.contains(u, c) || u.push(c)
        }
        return u
    }, m.union = function() {
        return m.uniq(S(arguments, !0, !0))
    }, m.intersection = function(n) {
        for (var t = [], r = arguments.length, e = 0, u = O(n); u > e; e++) {
            var i = n[e];
            if (!m.contains(t, i)) {
                for (var o = 1; r > o && m.contains(arguments[o], i); o++);
                o === r && t.push(i)
            }
        }
        return t
    }, m.difference = function(n) {
        var t = S(arguments, !0, !0, 1);
        return m.filter(n, function(n) {
            return !m.contains(t, n)
        })
    }, m.zip = function() {
        return m.unzip(arguments)
    }, m.unzip = function(n) {
        for (var t = n && m.max(n, O).length || 0, r = Array(t), e = 0; t > e; e++) r[e] = m.pluck(n, e);
        return r
    }, m.object = function(n, t) {
        for (var r = {}, e = 0, u = O(n); u > e; e++) t ? r[n[e]] = t[e] : r[n[e][0]] = n[e][1];
        return r
    }, m.findIndex = t(1), m.findLastIndex = t(-1), m.sortedIndex = function(n, t, r, e) {
        r = x(r, e, 1);
        for (var u = r(t), i = 0, o = O(n); o > i;) {
            var a = Math.floor((i + o) / 2);
            r(n[a]) < u ? i = a + 1 : o = a
        }
        return i
    }, m.indexOf = r(1, m.findIndex, m.sortedIndex), m.lastIndexOf = r(-1, m.findLastIndex), m.range = function(n, t, r) {
        null == t && (t = n || 0, n = 0), r = r || 1;
        for (var e = Math.max(Math.ceil((t - n) / r), 0), u = Array(e), i = 0; e > i; i++, n += r) u[i] = n;
        return u
    };
    var E = function(n, t, r, e, u) {
        if (!(e instanceof t)) return n.apply(r, u);
        var i = j(n.prototype),
            o = n.apply(i, u);
        return m.isObject(o) ? o : i
    };
    m.bind = function(n, t) {
        if (g && n.bind === g) return g.apply(n, l.call(arguments, 1));
        if (!m.isFunction(n)) throw new TypeError("Bind must be called on a function");
        var r = l.call(arguments, 2),
            e = function() {
                return E(n, e, t, this, r.concat(l.call(arguments)))
            };
        return e
    }, m.partial = function(n) {
        var t = l.call(arguments, 1),
            r = function() {
                for (var e = 0, u = t.length, i = Array(u), o = 0; u > o; o++) i[o] = t[o] === m ? arguments[e++] : t[o];
                for (; e < arguments.length;) i.push(arguments[e++]);
                return E(n, r, this, this, i)
            };
        return r
    }, m.bindAll = function(n) {
        var t, r, e = arguments.length;
        if (1 >= e) throw new Error("bindAll must be passed function names");
        for (t = 1; e > t; t++) r = arguments[t], n[r] = m.bind(n[r], n);
        return n
    }, m.memoize = function(n, t) {
        var r = function(e) {
            var u = r.cache,
                i = "" + (t ? t.apply(this, arguments) : e);
            return m.has(u, i) || (u[i] = n.apply(this, arguments)), u[i]
        };
        return r.cache = {}, r
    }, m.delay = function(n, t) {
        var r = l.call(arguments, 2);
        return setTimeout(function() {
            return n.apply(null, r)
        }, t)
    }, m.defer = m.partial(m.delay, m, 1), m.throttle = function(n, t, r) {
        var e, u, i, o = null,
            a = 0;
        r || (r = {});
        var c = function() {
            a = r.leading === !1 ? 0 : m.now(), o = null, i = n.apply(e, u), o || (e = u = null)
        };
        return function() {
            var f = m.now();
            a || r.leading !== !1 || (a = f);
            var l = t - (f - a);
            return e = this, u = arguments, 0 >= l || l > t ? (o && (clearTimeout(o), o = null), a = f, i = n.apply(e, u), o || (e = u = null)) : o || r.trailing === !1 || (o = setTimeout(c, l)), i
        }
    }, m.debounce = function(n, t, r) {
        var e, u, i, o, a, c = function() {
            var f = m.now() - o;
            t > f && f >= 0 ? e = setTimeout(c, t - f) : (e = null, r || (a = n.apply(i, u), e || (i = u = null)))
        };
        return function() {
            i = this, u = arguments, o = m.now();
            var f = r && !e;
            return e || (e = setTimeout(c, t)), f && (a = n.apply(i, u), i = u = null), a
        }
    }, m.wrap = function(n, t) {
        return m.partial(t, n)
    }, m.negate = function(n) {
        return function() {
            return !n.apply(this, arguments)
        }
    }, m.compose = function() {
        var n = arguments,
            t = n.length - 1;
        return function() {
            for (var r = t, e = n[t].apply(this, arguments); r--;) e = n[r].call(this, e);
            return e
        }
    }, m.after = function(n, t) {
        return function() {
            return --n < 1 ? t.apply(this, arguments) : void 0
        }
    }, m.before = function(n, t) {
        var r;
        return function() {
            return --n > 0 && (r = t.apply(this, arguments)), 1 >= n && (t = null), r
        }
    }, m.once = m.partial(m.before, 2);
    var M = !{
            toString: null
        }.propertyIsEnumerable("toString"),
        I = ["valueOf", "isPrototypeOf", "toString", "propertyIsEnumerable", "hasOwnProperty", "toLocaleString"];
    m.keys = function(n) {
        if (!m.isObject(n)) return [];
        if (v) return v(n);
        var t = [];
        for (var r in n) m.has(n, r) && t.push(r);
        return M && e(n, t), t
    }, m.allKeys = function(n) {
        if (!m.isObject(n)) return [];
        var t = [];
        for (var r in n) t.push(r);
        return M && e(n, t), t
    }, m.values = function(n) {
        for (var t = m.keys(n), r = t.length, e = Array(r), u = 0; r > u; u++) e[u] = n[t[u]];
        return e
    }, m.mapObject = function(n, t, r) {
        t = x(t, r);
        for (var e, u = m.keys(n), i = u.length, o = {}, a = 0; i > a; a++) e = u[a], o[e] = t(n[e], e, n);
        return o
    }, m.pairs = function(n) {
        for (var t = m.keys(n), r = t.length, e = Array(r), u = 0; r > u; u++) e[u] = [t[u], n[t[u]]];
        return e
    }, m.invert = function(n) {
        for (var t = {}, r = m.keys(n), e = 0, u = r.length; u > e; e++) t[n[r[e]]] = r[e];
        return t
    }, m.functions = m.methods = function(n) {
        var t = [];
        for (var r in n) m.isFunction(n[r]) && t.push(r);
        return t.sort()
    }, m.extend = _(m.allKeys), m.extendOwn = m.assign = _(m.keys), m.findKey = function(n, t, r) {
        t = x(t, r);
        for (var e, u = m.keys(n), i = 0, o = u.length; o > i; i++)
            if (e = u[i], t(n[e], e, n)) return e
    }, m.pick = function(n, t, r) {
        var e, u, i = {},
            o = n;
        if (null == o) return i;
        m.isFunction(t) ? (u = m.allKeys(o), e = b(t, r)) : (u = S(arguments, !1, !1, 1), e = function(n, t, r) {
            return t in r
        }, o = Object(o));
        for (var a = 0, c = u.length; c > a; a++) {
            var f = u[a],
                l = o[f];
            e(l, f, o) && (i[f] = l)
        }
        return i
    }, m.omit = function(n, t, r) {
        if (m.isFunction(t)) t = m.negate(t);
        else {
            var e = m.map(S(arguments, !1, !1, 1), String);
            t = function(n, t) {
                return !m.contains(e, t)
            }
        }
        return m.pick(n, t, r)
    }, m.defaults = _(m.allKeys, !0), m.create = function(n, t) {
        var r = j(n);
        return t && m.extendOwn(r, t), r
    }, m.clone = function(n) {
        return m.isObject(n) ? m.isArray(n) ? n.slice() : m.extend({}, n) : n
    }, m.tap = function(n, t) {
        return t(n), n
    }, m.isMatch = function(n, t) {
        var r = m.keys(t),
            e = r.length;
        if (null == n) return !e;
        for (var u = Object(n), i = 0; e > i; i++) {
            var o = r[i];
            if (t[o] !== u[o] || !(o in u)) return !1
        }
        return !0
    };
    var N = function(n, t, r, e) {
        if (n === t) return 0 !== n || 1 / n === 1 / t;
        if (null == n || null == t) return n === t;
        n instanceof m && (n = n._wrapped), t instanceof m && (t = t._wrapped);
        var u = s.call(n);
        if (u !== s.call(t)) return !1;
        switch (u) {
            case "[object RegExp]":
            case "[object String]":
                return "" + n == "" + t;
            case "[object Number]":
                return +n !== +n ? +t !== +t : 0 === +n ? 1 / +n === 1 / t : +n === +t;
            case "[object Date]":
            case "[object Boolean]":
                return +n === +t
        }
        var i = "[object Array]" === u;
        if (!i) {
            if ("object" != typeof n || "object" != typeof t) return !1;
            var o = n.constructor,
                a = t.constructor;
            if (o !== a && !(m.isFunction(o) && o instanceof o && m.isFunction(a) && a instanceof a) && "constructor" in n && "constructor" in t) return !1
        }
        r = r || [], e = e || [];
        for (var c = r.length; c--;)
            if (r[c] === n) return e[c] === t;
        if (r.push(n), e.push(t), i) {
            if (c = n.length, c !== t.length) return !1;
            for (; c--;)
                if (!N(n[c], t[c], r, e)) return !1
        } else {
            var f, l = m.keys(n);
            if (c = l.length, m.keys(t).length !== c) return !1;
            for (; c--;)
                if (f = l[c], !m.has(t, f) || !N(n[f], t[f], r, e)) return !1
        }
        return r.pop(), e.pop(), !0
    };
    m.isEqual = function(n, t) {
        return N(n, t)
    }, m.isEmpty = function(n) {
        return null == n ? !0 : k(n) && (m.isArray(n) || m.isString(n) || m.isArguments(n)) ? 0 === n.length : 0 === m.keys(n).length
    }, m.isElement = function(n) {
        return !(!n || 1 !== n.nodeType)
    }, m.isArray = h || function(n) {
        return "[object Array]" === s.call(n)
    }, m.isObject = function(n) {
        var t = typeof n;
        return "function" === t || "object" === t && !!n
    }, m.each(["Arguments", "Function", "String", "Number", "Date", "RegExp", "Error"], function(n) {
        m["is" + n] = function(t) {
            return s.call(t) === "[object " + n + "]"
        }
    }), m.isArguments(arguments) || (m.isArguments = function(n) {
        return m.has(n, "callee")
    }), "function" != typeof /./ && "object" != typeof Int8Array && (m.isFunction = function(n) {
        return "function" == typeof n || !1
    }), m.isFinite = function(n) {
        return isFinite(n) && !isNaN(parseFloat(n))
    }, m.isNaN = function(n) {
        return m.isNumber(n) && n !== +n
    }, m.isBoolean = function(n) {
        return n === !0 || n === !1 || "[object Boolean]" === s.call(n)
    }, m.isNull = function(n) {
        return null === n
    }, m.isUndefined = function(n) {
        return void 0 === n
    }, m.has = function(n, t) {
        return null != n && p.call(n, t)
    }, m.noConflict = function() {
        return u._ = i, this
    }, m.identity = function(n) {
        return n
    }, m.constant = function(n) {
        return function() {
            return n
        }
    }, m.noop = function() {}, m.property = w, m.propertyOf = function(n) {
        return null == n ? function() {} : function(t) {
            return n[t]
        }
    }, m.matcher = m.matches = function(n) {
        return n = m.extendOwn({}, n),
            function(t) {
                return m.isMatch(t, n)
            }
    }, m.times = function(n, t, r) {
        var e = Array(Math.max(0, n));
        t = b(t, r, 1);
        for (var u = 0; n > u; u++) e[u] = t(u);
        return e
    }, m.random = function(n, t) {
        return null == t && (t = n, n = 0), n + Math.floor(Math.random() * (t - n + 1))
    }, m.now = Date.now || function() {
        return (new Date).getTime()
    };
    var B = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#x27;",
            "`": "&#x60;"
        },
        T = m.invert(B),
        R = function(n) {
            var t = function(t) {
                    return n[t]
                },
                r = "(?:" + m.keys(n).join("|") + ")",
                e = RegExp(r),
                u = RegExp(r, "g");
            return function(n) {
                return n = null == n ? "" : "" + n, e.test(n) ? n.replace(u, t) : n
            }
        };
    m.escape = R(B), m.unescape = R(T), m.result = function(n, t, r) {
        var e = null == n ? void 0 : n[t];
        return void 0 === e && (e = r), m.isFunction(e) ? e.call(n) : e
    };
    var q = 0;
    m.uniqueId = function(n) {
        var t = ++q + "";
        return n ? n + t : t
    }, m.templateSettings = {
        evaluate: /<%([\s\S]+?)%>/g,
        interpolate: /<%=([\s\S]+?)%>/g,
        escape: /<%-([\s\S]+?)%>/g
    };
    var K = /(.)^/,
        z = {
            "'": "'",
            "\\": "\\",
            "\r": "r",
            "\n": "n",
            "\u2028": "u2028",
            "\u2029": "u2029"
        },
        D = /\\|'|\r|\n|\u2028|\u2029/g,
        L = function(n) {
            return "\\" + z[n]
        };
    m.template = function(n, t, r) {
        !t && r && (t = r), t = m.defaults({}, t, m.templateSettings);
        var e = RegExp([(t.escape || K).source, (t.interpolate || K).source, (t.evaluate || K).source].join("|") + "|$", "g"),
            u = 0,
            i = "__p+='";
        n.replace(e, function(t, r, e, o, a) {
            return i += n.slice(u, a).replace(D, L), u = a + t.length, r ? i += "'+\n((__t=(" + r + "))==null?'':_.escape(__t))+\n'" : e ? i += "'+\n((__t=(" + e + "))==null?'':__t)+\n'" : o && (i += "';\n" + o + "\n__p+='"), t
        }), i += "';\n", t.variable || (i = "with(obj||{}){\n" + i + "}\n"), i = "var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n" + i + "return __p;\n";
        try {
            var o = new Function(t.variable || "obj", "_", i)
        } catch (a) {
            throw a.source = i, a
        }
        var c = function(n) {
                return o.call(this, n, m)
            },
            f = t.variable || "obj";
        return c.source = "function(" + f + "){\n" + i + "}", c
    }, m.chain = function(n) {
        var t = m(n);
        return t._chain = !0, t
    };
    var P = function(n, t) {
        return n._chain ? m(t).chain() : t
    };
    m.mixin = function(n) {
        m.each(m.functions(n), function(t) {
            var r = m[t] = n[t];
            m.prototype[t] = function() {
                var n = [this._wrapped];
                return f.apply(n, arguments), P(this, r.apply(m, n))
            }
        })
    }, m.mixin(m), m.each(["pop", "push", "reverse", "shift", "sort", "splice", "unshift"], function(n) {
        var t = o[n];
        m.prototype[n] = function() {
            var r = this._wrapped;
            return t.apply(r, arguments), "shift" !== n && "splice" !== n || 0 !== r.length || delete r[0], P(this, r)
        }
    }), m.each(["concat", "join", "slice"], function(n) {
        var t = o[n];
        m.prototype[n] = function() {
            return P(this, t.apply(this._wrapped, arguments))
        }
    }), m.prototype.value = function() {
        return this._wrapped
    }, m.prototype.valueOf = m.prototype.toJSON = m.prototype.value, m.prototype.toString = function() {
        return "" + this._wrapped
    }, "function" == typeof define && define.amd && define("underscore", [], function() {
        return m
    })
}).call(this);;
! function(e) {
    var n = 50,
        t = 25,
        a = {},
        l = [].slice,
        r = {},
        o = {},
        c = function(e, l, c, f) {
            function i() {
                var e = +new Date;
                do {
                    var a = s.shift();
                    try {
                        c && c.call(f, a.type, a.data)
                    } catch (l) {}
                } while (s.length && +new Date - e < n);
                s.length > 0 && setTimeout(arguments.callee, t)
            }
            "string" != typeof l && (f = c, c = l, l = "overall");
            var u = r[e];
            u || (u = r[e] = {}), u[l] = u[l] || [], u[l].push({
                func: c,
                context: f || a
            });
            var h = o[e],
                s = [];
            if (h) {
                if ("overall" === l)
                    for (var g in h) s = s.concat(h[g]);
                else h[l] && h[l].length && (s = h[l]);
                s.length && i()
            }
        },
        f = function(e, n, t, l) {
            var r = function() {
                return a.off(e, n, r), t.apply(l || a, arguments)
            };
            c(e, n, r, l)
        },
        i = function(e, a, c) {
            if (r[e] && r[e][a] && r[e][a].length || r[e] && r[e].overall) {
                var f = r[e].overall,
                    i = r[e][a] || [];
                f && (i = f.concat(i));
                for (var u = [], h = i.length; h--;) u.push({
                    handler: i[h],
                    args: l.call(arguments, 1)
                });
                ! function() {
                    var e = +new Date;
                    do {
                        var a = u.shift(),
                            l = a.handler;
                        l && l.func && l.func.apply(l.context, a.args)
                    } while (u.length && +new Date - e < n);
                    u.length > 0 && setTimeout(arguments.callee, t)
                }()
            } else {
                var s = o[e] || (o[e] = {}),
                    i = s[a] || (s[a] = []);
                c && i.push({
                    type: a,
                    data: c
                })
            }
        },
        u = function(e, n, t, l) {
            if (l = l || a, r[e] && r[e][n] && r[e][n].length)
                for (var o, c = r[e][n], f = c.length; f--;) o = c[f], o.func === t && o.context === l && c.splice(f, 1)
        };
    a.on = c, a.once = f, a.trigger = i, a.off = u, e.listener = e.listener || a
}(window);;
! function(e) {
    if (e) {
        var t = document.location.search.match(/testDate\=([^\;]*)/);
        if (t && t[1]) {
            var a = t[1].split("-");
            e = new Date(parseInt(a[0], 10), parseInt(a[1] - 1, 10), parseInt(a[2], 10)), e /= 1e3
        }
        var n = {
                spring: {
                    startTime: {
                        year: 2016,
                        month: 2,
                        date: 6
                    },
                    endTime: {
                        year: 2016,
                        month: 2,
                        date: 14
                    }
                }
            },
            r = "";
        for (var i in n) {
            var m = n[i],
                s = new Date(m.startTime.year, m.startTime.month - 1, m.startTime.date, 0, 0, 0),
                d = new Date(m.endTime.year, m.endTime.month - 1, m.endTime.date, 23, 59, 59);
            if (s.getTime() <= 1e3 * e && d.getTime() >= 1e3 * e) {
                r = i;
                break
            }
        }
        var o = document.getElementById("left-panel");
        o.className = o && r ? "theme-festival-" + i : ""
    }
}(window.SYSTIME);;
! function(window) {
    function geoToPoint(e) {
        var t = e.split("|");
        if ("1" === t[0]) {
            var o = t[1].split(","),
                a = new BMap.Point(parseFloat(o[0]), parseFloat(o[1]));
            return a
        }
        var n = new BMap.Point(12957320, 4825100);
        return n
    }

    function getParam(e) {
        if (e.indexOf("?") > -1) var t = e.slice(e.indexOf("?") + 1);
        else {
            if (!(e.indexOf("#") > -1)) return;
            var t = e.slice(e.indexOf("#") + 1)
        }
        if ("" != t) {
            for (var o = {}, a = t.split("&"), n = 0; n < a.length; n++) {
                var i = a[n].split("=");
                if (i[1]) {
                    var r = i[1].indexOf("#");
                    i[1] = r > -1 ? i[1].slice(0, r) : i[1], o[i[0]] = i[1]
                }
            }
            return o
        }
    }

    function parseLocUrl(e) {
        var t = e.substring(1).split(",");
        if (t.length < 2) return null;
        var o = {
            x: parseFloat(t[0]),
            y: parseFloat(t[1]),
            z: null,
            t: null,
            h: null
        };
        if (isNaN(o.x) || isNaN(o.y)) return null;
        for (var a = 2; a < t.length; a++) {
            var n = t[a];
            if (n.indexOf("z") === n.length - 1) {
                var i = parseFloat(n);
                isNaN(i) || (o.z = i)
            }
            if (n.indexOf("h") === n.length - 1) {
                var r = parseFloat(n);
                isNaN(r) || (o.h = r)
            }
            if (n.indexOf("t") === n.length - 1) {
                var l = parseFloat(n);
                isNaN(l) || (o.t = l)
            }
        }
        return o
    }

    function parseMapStateUrl(e) {
        var t = getParam("?" + e),
            o = {};
        return t && (!t.maptype || "B_EARTH_MAP" !== t.maptype && "B_SATELLITE_MAP" !== t.maptype || (o.mapType = t.maptype), t.maplayer && (o.mapLayer = decodeURIComponent(t.maplayer)), t.ccode && (o.ccode = decodeURIComponent(t.ccode)), t.cname && (o.cname = decodeURIComponent(t.cname)), t.index && (o.index = parseInt(decodeURIComponent(t.index), 10)), t.title && (o.title = decodeURIComponent(t.title)), t.content && (o.content = decodeURIComponent(t.content)), t.latlng && (o.latlng = decodeURIComponent(t.latlng)), t.autoOpen && (o.autoOpen = decodeURIComponent(t.autoOpen))), o
    }

    function getAppStateFromPath() {
        for (var e = location.pathname, t = e.match(/\/[^/]*/g), o = -1, a = {
                mapState: {}
            }, n = 0; n < t.length; n++) {
            var i = t[n].substring(1);
            0 === i.indexOf("@") ? (a.loc = parseLocUrl(i), o = n) : a.mapState = parseMapStateUrl(decodeURIComponent(i))
        }
        return a
    }

    function enableByRule() {
        var e = navigator.userAgent,
            t = 0,
            o = 0,
            a = 0,
            n = 0;
        if (/macintosh/gi.test(e)) return !0;
        if (/windows nt (\d+\.\d)/gi.test(e) && (o = parseFloat(RegExp.$1), o >= 6.1)) {
            if (/chrome\/(\d+\.\d)/i.test(e) && (t = parseFloat(RegExp.$1), t >= 31)) return !0;
            if (/MSIE (\d+(\.\d+)?)/.test(e) && (a = parseFloat(RegExp.$1), a >= 10)) return !0;
            if (/Firefox\/(\d+\.\d)/i.test(e) && (n = parseFloat(RegExp.$1), n > 40)) return !0;
            if (/rv:11.0/gi.test(e)) return !0;
            if (/edge/gi.test(e)) return !0
        }
        return !1
    }

    function sendOpClickStat(e) {
        var t = "map";
        "B_EARTH_MAP" === map.getMapType() && (t = "earth");
        var o = map.getRenderType();
        addStat(t + "." + o + "." + e.type, "click", {
            da_e_name: "pcmapearth"
        }), e.opMethod && addStat(t + "." + o + "." + e.type + "." + e.opMethod, "click", {
            da_e_name: "pcmapearth"
        })
    }

    function onEachTileLoad(e) {
        var t = e.perfStat;
        if (4 === t.length) {
            var o;
            o = window.__newversion__ ? {
                z_webglmap_tile_net_binary: t[0],
                z_webglmap_tile_eval_binary: t[1],
                z_webglmap_tile_parse_binary: t[2],
                z_webglmap_tile_size_binary: t[3]
            } : {
                z_webglmap_tile_net: t[0],
                z_webglmap_tile_eval: t[1],
                z_webglmap_tile_parse: t[2],
                z_webglmap_tile_size: t[3]
            }, alog("cus.fire", "time", o)
        }
    }

    function excursionLoc(e, t) {
        var o = e,
            a = t,
            n = {
                Point: o,
                Level: a
            };
        return e && t && (n.Point.lat += 3e3, n.Point.lng += 3e3, n.Level = 13, IPLOC.ipLoc.content.radius = 1500), n
    }

    function setCookie(e, t, o) {
        var a = new Date;
        a.setTime(a.getTime() + 24 * o * 60 * 60 * 1e3), document.cookie = e + "=" + escape(t) + ";expires=" + a.toGMTString()
    }

    function getCookie(e) {
        var t = new RegExp("(^| )" + e + "=([^;]*)(;|$)"),
            o = document.cookie.match(t);
        return o ? unescape(o[2]) : null
    }

    function initBodyAfertGetSeckeyNew(e) {
        function t() {
            window.SECKEY = o(), handled || (handled = !0, e.init())
        }

        function o() {
            var e = StorageUtil.getItem("SECKEY_ABVK") || "-1",
                t = StorageUtil.getItem("BMAP_SECKEY") || "-1",
                o = e + "," + t;
            return o
        }
        var a = 1e3;
        setTimeout(function() {
            t()
        }, a);
        var n = 2059;
        if (ParisFactory && ParisFactory.create) var i = ParisFactory.create({
            sid: n,
            clientCacheTTL: 1e3,
            timeout: 5e3,
            abcliteUrl: "https://dlswbr.baidu.com/heicha/mw/abclite-" + n + "-s.js",
            acsUrl: "https://dlswbr.baidu.com/heicha/mm/" + n + "/acs-" + n + ".js",
            disasterConfig: {
                acsUrl: "https://miaowu.baidu.com/sdk/heicha/mm/" + n + "/acs-" + n + ".js",
                abcliteUrl: "https://miaowu.baidu.com/sdk/heicha/mw/abclite-" + n + "-s.js",
                secondReportUrl: "https://miaowu.baidu.com/slim/abdr"
            }
        });
        i && i.getAbcliteInstance ? i.getAbcliteInstance(function(t, a) {
            return window.___abvk && StorageUtil.setItem("SECKEY_ABVK", window.___abvk), t || !a ? void initBodyAfertGetSeckey(e) : void a.getAutoResponse(function(t, a) {
                if (t) return void initBodyAfertGetSeckey(e);
                if (a) {
                    var n = null;
                    try {
                        n = JSON.parse(a)
                    } catch (i) {
                        n = {}
                    }
                    n && n.data && StorageUtil.setItem("BMAP_SECKEY", n.data)
                }
                window.SECKEY = o(), handled || (handled = !0, e.init())
            })
        }) : initBodyAfertGetSeckey(e)
    }

    function initBodyAfertGetSeckey(e) {
        function t(t) {
            var o = StorageUtil.getItem("BMAP_SECKEY") || "-1",
                a = t + "," + o;
            window.SECKEY = a, e.init()
        }

        function o(e) {
            handled || (e || (e = StorageUtil.getItem("SECKEY_ABVK") || "-1"), handled = !0, t(e))
        }
        var a = 1e3;
        setTimeout(function() {
            o()
        }, a);
        var n = "2059";
        window["__abbaidu_" + n + "_cb"] = function(e) {
            var t = JSON.parse(e);
            StorageUtil.setItem("BMAP_SECKEY", t.data);
            var o = t.data || "-1",
                a = StorageUtil.getItem("SECKEY_ABVK") || "-1",
                n = a + "," + o;
            window.SECKEY = n
        };
        var i = +new Date,
            r = "https://dlswbr.baidu.com/heicha/mw/abclite-" + n + "-s.js?_t=" + i,
            l = document.createElement("script");
        l.async = !1, l.onload = function() {
            window.___abvk && StorageUtil.setItem("SECKEY_ABVK", window.___abvk), o(window.___abvk)
        }, l.onerror = function() {
            o()
        }, l.src = r, document.body.appendChild(l)
    }

    function addMapCtrls(e) {
        window.stdMapCtrl = new BMap.NavigationControl({
            from: "MAP_INDEX",
            offset: new BMap.Size(1, 0),
            type: BMAP_NAVIGATION_CONTROL_SMALL,
            anchor: BMAP_ANCHOR_BOTTOM_RIGHT,
            forceNew: !0,
            container: document.getElementById("map-operate")
        }), window.stdMapCtrl._cZIndex = "10", e.addControl(window.stdMapCtrl);
        var t = document.getElementById("map-operate");
        (e.mapType === BMAP_EARTH_MAP || "webgl" === e._renderType) && t && (t.className = "show-3d"), "webgl" !== e._renderType && e.addEventListener("onmaptypechange", function(e) {
            var o = e.mapType;
            o === BMAP_EARTH_MAP ? t && (t.className = "show-3d") : t && (t.className = "")
        }), window.scaleCtrl = new BMap.ScaleControl({
            offset: new BMap.Size(110, 6),
            printable: !0,
            anchor: BMAP_ANCHOR_BOTTOM_RIGHT
        }), window.map.addControl(window.scaleCtrl)
    }
    var PanoLoading = require("pano:widget/module/PanoLoading/PanoLoading.js"),
        userAuth = require("common:widget/com/UserAuth/userAuth.js"),
        ParisFactory = window.ParisFactory,
        probablyloc = "",
        pathType = "/" === window.location.href.replace(/^(https?:\/\/[^/]+)?/, "");
    window.pathType = pathType, window.isPrint = !1, window.BMAP_TYPE_HYBIRD = "B_SATELLITE_STREET", BMap.PolylineTItem = BMap.DistanceTool, PanoLoading.createMask(getParam(location.href), location.href);
    var mapType = BMAP_NORMAL_MAP,
        param = getParam(location.href),
        appState = getAppStateFromPath();
    window._appStateFromUrl = appState, appState.mapState.mapType ? mapType = appState.mapState.mapType : param && (param.tn || param.mt) && (mapType = param.tn || param.mt);
    var href = location.href,
        forceRenderType = "";
    enableByRule() || (forceRenderType = "dom"), /force=raster/i.test(href) && (forceRenderType = "dom"), /force=vector/i.test(href) && (forceRenderType = "canvas"), /force=webgl/i.test(href) && (forceRenderType = "webgl");
    var userRenderMode = null;
    window.localStorage && window.localStorage.getItem && (userRenderMode = window.localStorage.getItem("user-render-mode")), forceRenderType = userRenderMode || forceRenderType, BMap.RenderTypeUtils.ifEnableEarth() && "B_SATELLITE_MAP" === mapType && (mapType = "B_EARTH_MAP");
    var map = window.map = new BMap.Map("MapHolder", {
            mapType: mapType,
            forceRenderType: forceRenderType,
            showControls: !0,
            enableKeyboard: !0,
            enableWheelZoom: !0,
            enableContinuousZoom: !0
        }),
        COUNTRY_LEVEL = 4,
        point = new BMap.Point(12957320, 4825100),
        level = COUNTRY_LEVEL,
        code = 1,
        cityType = [4, 11, 12, 15],
        tilt = 0,
        heading = 0;
    if (null != window._OLR && (eval("var json =" + window._OLR.index), window._OLR.hot_city = json.hot_city, point = geoToPoint(json.content.geo), level = cityType[json.content.city_type], code = json.content.code), IPLOC && IPLOC.ipLoc && "success" === IPLOC.ipLoc.status && IPLOC.ipLoc.content.radius <= 2e3) var iplocSuccess = !0;
    var iplocOpts = {};
    if (iplocSuccess === !0 && IPLOC.rgc && IPLOC.rgc.result) {
        iplocOpts.cityCode = IPLOC.rgc.result.cityCode, iplocOpts.cityName = IPLOC.rgc.result.addressComponent.city;
        var key = "MCITY";
        if (new RegExp('^[^\\x00-\\x20\\x7f\\(\\)<>@,;:\\\\\\"\\[\\]\\?=\\{\\}\\/\\u0080-\\uffff]+$').test(key) === !0) {
            var reg = new RegExp("(^| )" + key + "=([^;]*)(;|$)"),
                regValue = reg.exec(document.cookie);
            if (regValue) var myCity = regValue[2] || null;
            "string" == typeof myCity && (myCity = decodeURIComponent(myCity))
        }
        parseFloat(myCity) > 0 && 1 !== code ? (iplocOpts.cityCode === code && (iplocOpts.status = "show", iplocOpts.needCurReq = !1), iplocOpts.cityCode !== code && (iplocOpts.status = "showChageCity", iplocOpts.needCurReq = !1)) : (iplocOpts.status = "show", iplocOpts.needCurReq = !0)
    }
    if (appState.loc) {
        var loc = appState.loc;
        point = new BMap.Point(loc.x, loc.y), level = loc.z || 12, tilt = loc.t || 0, heading = loc.h || 0, map.isFromShare = !0, iplocOpts.needCurReq = !1
    } else {
        if ("show" === iplocOpts.status && IPLOC && IPLOC.ipLoc && IPLOC.ipLoc.content && IPLOC.ipLoc.content.point) {
            var ipLocPt = IPLOC.ipLoc.content.point;
            "number" == typeof ipLocPt.x && "number" == typeof ipLocPt.y && (point = new BMap.Point(ipLocPt.x, ipLocPt.y), level = 15, iplocOpts.preventZoomMap = !0)
        }
        if (param && param.c) {
            var p = param.c.split(",");
            if (2 === p.length) {
                var lng = parseFloat(p[0]),
                    lat = parseFloat(p[1]);
                "number" == typeof lng && "number" == typeof lat && (point = new BMap.Point(lng, lat), map.isFromShare = !0, iplocOpts.needCurReq = !1)
            }
            param.l && "number" == typeof parseInt(param.l, 10) && (level = parseInt(param.l, 10))
        }
    }
    window.corePerfMonitor && map.addEventListener("tilesloaded", window.corePerfMonitor.onTilesLoaded), map.addEventListener("earthload", function(e) {
        for (var t = e.earth, o = ["rotatecwclick", "rotateccwclick", "compassclick", "zoominclick", "zoomoutclick", "tiltmsdown", "ontiltclick"], a = 0; a < o.length; a++) t.on(o[a], sendOpClickStat);
        t.on("fpsdata_ready", function(e) {
            var t = {};
            t.z_fps = e.fps, t.z_fps_higher = e.fpsH, alog("cus.fire", "time", t)
        }), t.on("earthtilesloaded", function(e) {
            var o = {};
            o.z_earth_init_time = e.initTime, o.z_earth_tilesload_time = e.loadTime, alog("cus.fire", "time", o), t.off("earthtilesloaded", arguments.callee)
        }), t.on("layertilesload", function(e) {
            var o = {};
            o.z_earth_layerload_time = e.layersLoadTime, alog("cus.fire", "time", o), t.off("layertilesload", arguments.callee)
        }), t.on("earthlabelloaded", function(e) {
            var o = {};
            o.z_earth_labelload_time = e.loadTime, alog("cus.fire", "time", o), t.off("earthlabelloaded", arguments.callee)
        }), t.on("webglcontextlost", function() {
            alog("cus.fire", "count", "z_webgl_context_lost")
        }), t.on("webglcontextrestored", function() {
            alog("cus.fire", "count", "z_webgl_context_restored")
        }), t.on("onsatelayerloaderror", function() {
            alog("cus.fire", "count", "z_satelayer_load_error")
        }), t.on("onstreetlayerloaderror", function() {
            alog("cus.fire", "count", "z_streetlayer_load_error")
        })
    }), map.addEventListener("dragend", userAuth.sendUserOp), map.addEventListener("zoomend", userAuth.sendUserOp), map.on("loadtile", function() {
        userAuth.sendImage(1)
    }), setInterval(function() {
        userAuth.sendImage(2)
    }, 3e5);
    var fstStartTime = (new Date).getTime();
    if (map.isCanvasMap()) map.on("canvasmaploaded", function() {
        var e = (new Date).getTime(),
            t = {
                z_canvasmaptime: e - fstStartTime
            };
        alog("cus.fire", "time", t), map.removeEventListener("canvasmaploaded", arguments.callee)
    }), map.on("tilesloaded", function() {
        var e = (new Date).getTime(),
            t = {
                z_bkgrdtime: e - fstStartTime
            };
        alog("cus.fire", "time", t), map.removeEventListener("tilesloaded", arguments.callee)
    }), map.on("loaddatatimeout", function(e) {
        var t = {};
        if (t.z_timeoutVSnotimeout = 1 === e.noTimeoutCount ? "notimeout" : "timeout", alog("cus.fire", "dis", t), 1 === e.timeoutCount) {
            var o = {
                z_timeoutloaded: e.timeoutLoaded,
                z_timeoutnoloaded: e.timeoutNoLoaded
            };
            alog("cus.fire", "time", o)
        }
    }), map.on("canvasmaploaded", function(e) {
        e.isAllLoadedDrawing && alog("cus.fire", "time", {
            z_totaldrawtime: e.drawTime
        })
    }), map.on("mapwhitescreen", function() {
        alog("cus.fire", "count", "z_mapwhitescreen")
    }), alog("cus.fire", "count", "z_vectormapcount");
    else if ("webgl" === map.getRenderType()) {
        map.on("firsttilesloaded", function() {
            var e = (new Date).getTime();
            this._firstLoadTime = e - fstStartTime
        }), BMap.Utils.canUseWebAssembly ? alog("cus.fire", "count", "z_webgl_wasm") : alog("cus.fire", "count", "z_webgl_asm"), map.on("tileloaded", onEachTileLoad), setTimeout(function() {
            map.off("tileloaded", onEachTileLoad)
        }, 5e3), map.on("tilesloaded", function() {
            var e, t = (new Date).getTime();
            e = window.__newversion__ ? {
                z_webglmapfirsttime_binary: this._firstLoadTime,
                z_webglmaptime_binary: t - fstStartTime
            } : {
                z_webglmapfirsttime: this._firstLoadTime,
                z_webglmaptime: t - fstStartTime
            }, alog("cus.fire", "time", e), map.removeEventListener("tilesloaded", arguments.callee)
        }), map.on("fpsdata_ready", function(e) {
            var t = {};
            window.__newversion__ ? (t.z_webglmap_fps_binary = e.fps, t.z_webglmap_fps_higher_binary = e.fpsH) : (t.z_webglmap_fps = e.fps, t.z_webglmap_fps_higher = e.fpsH), alog("cus.fire", "time", t)
        }), map.on("tileloaderror", function(e) {
            var t = e.error || "unknown";
            alog("cus.fire", "count", "z_" + t + (window.__newversion__ ? "_binary" : ""))
        });
        for (var eventNames = ["rotatecwclick", "rotateccwclick", "compassclick", "zoominclick", "zoomoutclick", "tiltmsdown", "ontiltclick"], i = 0; i < eventNames.length; i++) map.on(eventNames[i], sendOpClickStat);
        map.addEventListener("indoor_bar_show", function() {
            addStat && addStat("indoor_show", "show")
        }), map.addEventListener("indoor_bar_click", function() {
            addStat("indoor_bar_click", "show")
        })
    } else map.on("tilesloaded", function() {
        var e = (new Date).getTime(),
            t = {
                z_tilemaptime: e - fstStartTime
            };
        alog("cus.fire", "time", t), map.removeEventListener("tilesloaded", arguments.callee)
    }), alog("cus.fire", "count", "z_rastermapcount");
    tilt && map.setTilt(tilt, {
        noAnimation: !0
    }), heading && map.setHeading(heading, {
        noAnimation: !0
    });
    var userselection = window.localStorage.getItem("userSelection");
    iplocSuccess === !0 && userselection && "sureLoc" === userselection ? map.centerAndZoom(point, level) : iplocSuccess === !0 && userselection && "notLoc" === userselection ? (probablyloc = excursionLoc(point, level), map.centerAndZoom(probablyloc.Point, probablyloc.Level)) : iplocSuccess !== !0 || userselection ? map.centerAndZoom(point, level) : (probablyloc = excursionLoc(point, level), map.centerAndZoom(probablyloc.Point, probablyloc.Level)), addMapCtrls(map), map.on("getmodules_fail", function() {
        alog("cus.fire", "count", "z_getmodulesfail")
    }), map.on("mod_timeout", function(e) {
        e && 10 === e.timeout ? alog("cus.fire", "count", "z_modtimeout_10") : e && 5 === e.timeout && alog("cus.fire", "count", "z_modtimeout")
    });
    var StorageUtil = {
            setItem: function(e, t) {
                return localStorage ? localStorage.setItem(e, t) : navigator.cookieEnabled ? setCookie(e, t, 30) : sessionStorage ? sessionStorage.setItem(e, t) : void 0
            },
            getItem: function(e) {
                return localStorage ? localStorage.getItem(e) : navigator.cookieEnabled ? getCookie(e) : sessionStorage ? sessionStorage.getItem(e) : void 0
            }
        },
        handled = !1;
    require.async(["common:widget/ui/tangram/tangram.js", "common:widget/ui/stat/statCode.js", "common:widget/ui/init/init.js", "common:widget/ui/stat/CodeStat.js", "common:widget/com/IpLocation/IpLocation.js"], function(e, t, o, a, n) {
        var i = decodeURI(document.URL).match(/testIp\=([^\&]*)/);
        i && i[1] && (iplocOpts.ip = i[1]), n.init(map, window.IPLOC, iplocOpts), initBodyAfertGetSeckeyNew(o)
    })
}(window);;
var flowControl = {
    _config: {
        "transit-grayed-out": {
            percent: 1,
            forceParam: "transit_map"
        }
    },
    _cache: {},
    hitTest: function(t) {
        if ("boolean" == typeof this._cache[t]) return this._cache[t];
        var r = this._config[t];
        if (!r) return !1;
        var e = r.percent,
            a = r.forceParam;
        if (1 === e) return this._cache[t] = !0, !0;
        if (a && window.localStorage) try {
            var c = window.localStorage.getItem(a);
            if (c) return this._cache[t] = !0, !0
        } catch (i) {}
        var h = 1 / e,
            o = Math.round(h / 2);
        try {
            for (var n = document.cookie.split(";"), f = 0; f < n.length; f++)
                if (n[f].indexOf("BAIDUID=") > -1) {
                    var s = n[f].split("=")[1];
                    if (!s) return this._cache[t] = !1, !1;
                    var u = s.charCodeAt(0),
                        _ = s.charCodeAt(1);
                    if ((u + _) % h === o) return this._cache[t] = !0, !0
                }
        } catch (i) {
            return this._cache[t] = !1, !1
        }
        return this._cache[t] = !1, !1
    }
};;
! function(t) {
    function e(t) {
        this.opts = t || {}
    }
    var n = {};
    e.prototype.render = function() {
        try {
            throw new Error("Widget must implement function render")
        } catch (t) {
            "undefined" != typeof alog && alog("exception.fire", "catch", {
                msg: t.message || t.description,
                path: "common:static/js/util/widget.js",
                ln: 16
            })
        }
    }, e.prototype.renderComplete = function() {
        try {} catch (t) {
            "undefined" != typeof alog && alog("exception.fire", "catch", {
                msg: t.message || t.description,
                path: "common:static/js/util/widget.js",
                ln: 19
            })
        }
    }, e.prototype.setPageData = function(t) {
        t = t || {}, this._data_ = t
    }, n.extend = function(t) {
        var n = function(t) {
            t = t || {}, e.call(this, t)
        };
        return T.inherits(n, e, "Child"), T.extend(n.prototype, t), n
    }, t.Widget = n
}(window);