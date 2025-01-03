define("common:widget/ui/Then/then.js", function(n, t, e) {
    ! function(n, t) {
        "use strict";
        "object" == typeof e && "object" == typeof e.exports ? e.exports = t() : "function" == typeof define && define.amd ? define([], t) : n.Thenjs = t()
    }("object" == typeof window ? window : this, function() {
        "use strict";

        function n(n, t) {
            if (t = t || 0, t >= n.length) return [];
            for (var e = n.length, r = Array(e - t); e-- > t;) r[e - t] = n[e];
            return r
        }

        function t(t, e) {
            try {
                e.apply(null, n(arguments, 2))
            } catch (r) {
                t(r)
            }
        }

        function e() {
            var n = arguments;
            T(function() {
                t.apply(null, n)
            })
        }

        function r(n) {
            return null == n ? n : "function" == typeof n.toThunk ? n.toThunk() : "function" == typeof n.then ? function(t) {
                n.then(function(n) {
                    t(null, n)
                }, t)
            } : n
        }

        function u(n, t) {
            var i, o = this;
            return n instanceof u ? n : o instanceof u ? (o._success = o._each = o._eachSeries = o._parallel = o._series = null, o._finally = o._error = o._fail = o._result = o._nextThen = o._chain = null, arguments.length ? (i = c(o, t), n = r(n), void(null == n ? i() : "function" == typeof n ? e(i, n, i) : i(null, n))) : o) : new u(n, t)
        }

        function i(e) {
            var r = this,
                u = arguments;
            r._result !== !1 && (!r._result && r._chain && r.debug.apply(r, ["\nChain " + r._chain + ": "].concat(n(u))), r._result = !1, t(function(n) {
                l(r, n, e)
            }, o, r, u, e))
        }

        function o(t, e, r) {
            if (t._finally) return t._finally.apply(null, e);
            if (null != r) throw r;
            var u = t._success || t._each || t._eachSeries || t._parallel || t._series;
            return u ? u.apply(null, n(e, 1)) : void(t._result = e)
        }

        function l(n, t, e) {
            var r = n,
                i = n._error || n._fail;
            for (n._nextThen && null == e && (i = null, r = n._nextThen); !i && r;) i = r._fail, r = r._nextThen;
            return i ? i(t) : u.onerror ? u.onerror(t) : void(r._result = [t])
        }

        function c(n, t) {
            function e() {
                return i.apply(n, arguments)
            }
            return e._isCont = !0, t && (j.debug = "function" == typeof t ? t : v, n._chain = 1), e
        }

        function f(n, t, e) {
            var r = new u,
                o = c(r, e);
            return n(o, t), t ? (t._nextThen = r, t._chain && (r._chain = t._chain + 1), t._result && T(function() {
                i.apply(t, t._result)
            }), r) : r
        }

        function a(t, e) {
            return e._isCont ? e : function() {
                var r = n(arguments);
                r.unshift(t), e.apply(null, r)
            }
        }

        function s(n, t, e, r) {
            function u(u, i) {
                return e.finished ? void 0 : null != u ? (e.finished = !0, n(u)) : (t[r] = i, --e.i < 0 && n(null, t))
            }
            return u._isCont = !0, u
        }

        function h(n, t, e) {
            var r, u = [],
                i = {};
            if (!w(t)) return n(g(t, "each"));
            if (i.i = r = t.length - 1, 0 > r) return n(null, u);
            for (var o = 0; r >= o; o++) e(s(n, u, i, o), t[o], o, t)
        }

        function _(n, t) {
            var e, r = [],
                u = {};
            if (!w(t)) return n(g(t, "parallel"));
            if (u.i = e = t.length - 1, 0 > e) return n(null, r);
            for (var i = 0; e >= i; i++) t[i](s(n, r, u, i), i, t)
        }

        function p(n, r, u) {
            function i(s, h) {
                return null != s ? n(s) : (f[c] = h, ++c > o ? n(null, f) : (l = --a > 0 ? t : (a = d, e), void l(n, u, i, r[c], c, r)))
            }
            var o, l, c = 0,
                f = [],
                a = d;
            return i._isCont = !0, w(r) ? (o = r.length - 1, 0 > o ? n(null, f) : void u(i, r[0], 0, r)) : n(g(r, "eachSeries"))
        }

        function y(n, r) {
            function u(a, s) {
                return null != a ? n(a) : (c[l] = s, ++l > i ? n(null, c) : (o = --f > 0 ? t : (f = d, e), void o(n, r[l], u, l, r)))
            }
            var i, o, l = 0,
                c = [],
                f = d;
            return u._isCont = !0, w(r) ? (i = r.length - 1, 0 > i ? n(null, c) : void r[0](u, 0, r)) : n(g(r, "series"))
        }

        function v() {
            console.log.apply(console, arguments)
        }

        function g(n, t) {
            return new Error("The argument " + (n && n.toString()) + ' in "' + t + '" is not Array!')
        }
        var d = 100,
            m = Object.prototype.toString,
            T = "function" == typeof setImmediate ? setImmediate : function(n) {
                setTimeout(n, 0)
            },
            w = Array.isArray || function(n) {
                return "[object Array]" === m.call(n)
            };
        u.defer = e, u.each = function(n, t, r) {
            return f(function(r) {
                e(r, h, r, n, t)
            }, null, r)
        }, u.eachSeries = function(n, t, r) {
            return f(function(r) {
                e(r, p, r, n, t)
            }, null, r)
        }, u.parallel = function(n, t) {
            return f(function(t) {
                e(t, _, t, n)
            }, null, t)
        }, u.series = function(n, t) {
            return f(function(t) {
                e(t, y, t, n)
            }, null, t)
        }, u.nextTick = function(t) {
            var e = n(arguments, 1);
            T(function() {
                t.apply(null, e)
            })
        }, u.onerror = function(n) {
            throw console.error("Thenjs caught error: ", n), n
        };
        var j = u.prototype;
        return j.fin = j.all = j["finally"] = function(n) {
            return f(function(t, e) {
                e._finally = a(t, n)
            }, this)
        }, j.then = function(n, t) {
            return f(function(e, r) {
                r._success = a(e, n), r._error = t && a(e, t)
            }, this)
        }, j.fail = j["catch"] = function(t) {
            return f(function(e, r) {
                r._fail = a(e, t), r._success = function() {
                    e.apply(null, [null].concat(n(arguments)))
                }
            }, this)
        }, j.each = function(n, t) {
            return f(function(e, r) {
                r._each = function(r, u) {
                    h(e, n || r, t || u)
                }
            }, this)
        }, j.eachSeries = function(n, t) {
            return f(function(e, r) {
                r._eachSeries = function(r, u) {
                    p(e, n || r, t || u)
                }
            }, this)
        }, j.parallel = function(n) {
            return f(function(t, e) {
                e._parallel = function(e) {
                    _(t, n || e)
                }
            }, this)
        }, j.series = function(n) {
            return f(function(t, e) {
                e._series = function(e) {
                    y(t, n || e)
                }
            }, this)
        }, j.toThunk = function() {
            var n = this;
            return function(t) {
                n._result ? (t.apply(null, n._result), n._result = !1) : n._result !== !1 && (n._finally = t)
            }
        }, u.NAME = "Thenjs", u.VERSION = "1.4.5", u
    })
});;
define("common:widget/com/Subway/base/coords.js", function(t, o, n) {
    function i(t, o) {
        this.x = t, this.y = o
    }
    i.prototype.toString = function() {
        return [this.x, this.y].join(",")
    }, i.prototype.floor = function() {
        return new i(this.x >> 0, this.y >> 0)
    }, n.exports = i
});;
define("common:widget/com/Subway/base/line.js", function(i, s, t) {
    function h(i, s, t, h, l, n, o, b, e, c) {
        this.lid = i, this.lb = s, this.slb = t, this.uid = h, this.n = l, this.loop = n, this.lbx = o, this.lby = b, this.lbr = e, this.lc = c, this.stations = []
    }
    t.exports = h
});;
define("common:widget/com/Subway/base/station.js", function(i, s, t) {
    function h(i, s, t, h, o, n, c, r, x, d, e, y, u, b, l, a, f, m, p, w, _) {
        this.sid = i, this.lb = s, this.uid = t, this.px = h, this.py = o, this.x = n, this.y = c, this.rx = r, this.ry = x, this.st = d, this.ex = e, this.iu = y, this.rc = u, this.slb = b, this.ln = l, this.color = a, this.icon = f, this.dx = m, this.dy = p, this.trs_x = w, this.trs_y = _
    }
    t.exports = h
});;
define("common:widget/com/Subway/base/SubwayAnimation.js", function(t, i, e) {
    function n(t) {
        var i = {
            duration: 1e3,
            fps: 30,
            delay: 0,
            transition: o.linear,
            onStop: function() {}
        };
        if (this._anis = [], t)
            for (var e in t) i[e] = t[e];
        if (this._opts = i, T.isNumber(i.delay)) {
            var s = this;
            setTimeout(function() {
                s.start()
            }, i.delay)
        } else i.delay != n.INFINITE && this.start()
    }
    n.INFINITE = "INFINITE", n.prototype.start = function() {
        if (window.requestAnimationFrame) {
            var t = this;
            t._timer = window.requestAnimationFrame(function(i) {
                t._loop(i)
            })
        } else this._beginTime = (new Date).getTime(), this._endTime = this._beginTime + this._opts.duration, this._loop()
    }, n.prototype._loop = function() {
        var t = this,
            i = (new Date).getTime();
        return this._beginTime || (this._beginTime = i, this._endTime = this._beginTime + this._opts.duration), i >= t._endTime ? (T.isFunction(t._opts.render) && t._opts.render(t._opts.transition(1)), void(T.isFunction(t._opts.finish) && t._opts.finish())) : (t.schedule = t._opts.transition((i - t._beginTime) / t._opts.duration), T.isFunction(t._opts.render) && t._opts.render(t.schedule), void(t.terminative || (t._timer = window.requestAnimationFrame ? requestAnimationFrame(function(i) {
            t._loop(i)
        }) : setTimeout(function() {
            t._loop()
        }, 1e3 / t._opts.fps))))
    }, n.prototype.stop = function(t) {
        this.terminative = !0;
        for (var i = 0; i < this._anis.length; i++) this._anis[i].stop(), this._anis[i] = null;
        this._anis.length = 0, this._timer && (window.cancelAnimationFrame ? cancelAnimationFrame(this._timer) : clearTimeout(this._timer), this._timer = null), this._opts.onStop(this.schedule), t && (this._endTime = this._beginTime, this._loop())
    };
    var o = {
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
    o["ease-in"] = o.easeInQuad, o["ease-out"] = o.easeOutQuad, e.exports = n
});;
define("common:widget/com/Subway/popupwindow/popupwindow.js", function(require, exports, module) {
    function PopupWindow(t, e) {
        this.offset = {
            left: -2,
            top: -15
        }, this.popupType = e ? e.popupType || POPUP_NORMAL_TYPE : POPUP_NORMAL_TYPE, (this.popupType === POPUP_PLAN_TRANS_TYPE || this.popupType === POPUP_PLAN_END_TYPE) && (this.screenBounds = e.screenBounds), this.zIndex = e ? e.zIndex || 10 : 10, this.lineDir = e ? e.lineDir || 0 : 0, this.svgRender = t
    }
    var POPUP_NORMAL_TYPE = 0,
        POPUP_MINI_TYPE = 1,
        POPUP_PLAN_TRANS_TYPE = 2,
        POPUP_PLAN_END_TYPE = 3,
        Coords = require("common:widget/com/Subway/base/coords.js");
    T.extend(PopupWindow.prototype, {
        setData: function(data) {
            if (this.data = data, this.popupType === POPUP_MINI_TYPE) var template = [function(_template_object) {
                var _template_fun_array = [],
                    fn = function(__data__) {
                        var _template_varName = "";
                        for (var name in __data__) _template_varName += "var " + name + '=__data__["' + name + '"];';
                        eval(_template_varName), _template_fun_array.push('<div id="mini_sw_pw">    <div class="sw-pw-title">        <div class="sw-pw-tc" style="background-color:', "undefined" == typeof data.color ? "" : data.color, '">', "undefined" == typeof data.lb ? "" : data.lb, "</div>    </div></div>"), _template_varName = null
                    }(_template_object);
                return fn = null, _template_fun_array.join("")
            }][0];
            else if (this.popupType === POPUP_PLAN_TRANS_TYPE) var template = [function(_template_object) {
                var _template_fun_array = [],
                    fn = function(__data__) {
                        var _template_varName = "";
                        for (var name in __data__) _template_varName += "var " + name + '=__data__["' + name + '"];';
                        eval(_template_varName), _template_fun_array.push('<div id="sw_pw_plan">    <ul class="sw-pw-title">        <li class="sw-pw-tc">            ', "undefined" == typeof data.station.lb ? "" : data.station.lb, '            <a class="station-link" target="_blank" href="', "undefined" == typeof data.station.link ? "" : data.station.link, '">详情&gt;&gt;</a>        </li>    </ul>    <div class="sw-pw-content">        '), data.transferName && _template_fun_array.push('            <div class="sw-pw-transfer">                <span class="transfer-icon"></span>换乘                <span style="color:', "undefined" == typeof data.transferNameColor ? "" : data.transferNameColor, ';margin:0 2px">                    ', "undefined" == typeof data.transferName ? "" : data.transferName, '</span>距离                <span class="transfer-distance">                    ', "undefined" == typeof data.transferDistance ? "" : data.transferDistance, "</span>米            </div>        "), _template_fun_array.push("            ");
                        for (var i = 0; i < data.lines.length; i++) {
                            _template_fun_array.push('                <div class="sw-pw-line">                    <div class="sw-pw-line-title" style="border-color:', "undefined" == typeof data.lines[i].color ? "" : data.lines[i].color, '">                        <span class="line_title_content" style="background-color:', "undefined" == typeof data.lines[i].color ? "" : data.lines[i].color, '">                            ', "undefined" == typeof data.lines[i].name ? "" : data.lines[i].name, "</span>                    </div>                    ");
                            for (var j = 0; j < data.lines[i].dirs.length; j++) _template_fun_array.push("                        "), data.lines[i].dirs[j].startTime && data.lines[i].dirs[j].endTime && _template_fun_array.push('                            <ul class="sw-pw-line-list">                                <li class="sw-pw-line-dir">                                    <span class="sw-pw-line-dir-name">                                        ', "undefined" == typeof data.lines[i].dirs[j].name ? "" : data.lines[i].dirs[j].name, '</span>                                    <span class="sw-pw-text-gray">方向</span></li>                                <li class="sw-pw-line-time">                                    <span class="sw-pw-text-gray-bkg">始</span>                                    <span class="sw-pw-text-inline-block">                                        ', "undefined" == typeof(data.lines[i].dirs[j].startTime || "00:00") ? "" : data.lines[i].dirs[j].startTime || "00:00", '</span>                                    <span class="sw-pw-text-gray-bkg">末</span>                                    <span class="sw-pw-text-inline-block">                                        ', "undefined" == typeof(data.lines[i].dirs[j].endTime || "00:00") ? "" : data.lines[i].dirs[j].endTime || "00:00", "</span>                                </li>                            </ul>                        "), _template_fun_array.push("                    ");
                            _template_fun_array.push("                </div>            ")
                        }
                        _template_fun_array.push("    </div></div>"), _template_varName = null
                    }(_template_object);
                return fn = null, _template_fun_array.join("")
            }][0];
            else if (this.popupType === POPUP_PLAN_END_TYPE) var template = [function(_template_object) {
                var _template_fun_array = [],
                    fn = function(__data__) {
                        var _template_varName = "";
                        for (var name in __data__) _template_varName += "var " + name + '=__data__["' + name + '"];';
                        eval(_template_varName), _template_fun_array.push('<div id="sw_pw_plan_end">    <ul class="sw-pw-title">        <li class="sw-pw-tc">            ', "undefined" == typeof data.station.lb ? "" : data.station.lb, '            <a class="station-link" target="_blank" href="', "undefined" == typeof data.station.link ? "" : data.station.link, '">详情&gt;&gt;</a>        </li>    </ul>    <div class="sw-pw-content">        <div class="sw-pw-item">            <div class="sw-pw-field">票价</div>            <div class="sw-pw-value"><span style="margin: 0 2px">', "undefined" == typeof data.totalPrice ? "" : data.totalPrice, '</span>元</div>        </div>        <div class="sw-pw-item">            <div class="sw-pw-field">预计时间</div>            <div class="sw-pw-value"><span style="margin: 0 2px">', "undefined" == typeof data.totalTime ? "" : data.totalTime, '</span>分钟</div>        </div>        <div class="sw-pw-item sw-pw-item-close">            <input id="btnSubwayPlanCancel" type="button" value="取 消" />        </div>    </div></div>'), _template_varName = null
                    }(_template_object);
                return fn = null, _template_fun_array.join("")
            }][0];
            else var template = [function(_template_object) {
                var _template_fun_array = [],
                    fn = function(__data__) {
                        var _template_varName = "";
                        for (var name in __data__) _template_varName += "var " + name + '=__data__["' + name + '"];';
                        eval(_template_varName), _template_fun_array.push('<div id="sw_pw">    <ul class="sw-pw-title">        <li class="sw-pw-tc">            ', "undefined" == typeof data.station.lb ? "" : data.station.lb, '            <a class="station-link" target="_blank" href="', "undefined" == typeof data.station.link ? "" : data.station.link, '">详情&gt;&gt;</a>        </li>    </ul>    <div class="sw-pw-content">        ');
                        for (var i = 0; i < data.lines.length; i++) {
                            _template_fun_array.push('            <div class="sw-pw-line">                <div class="sw-pw-line-title" style="border-color:', "undefined" == typeof data.lines[i].color ? "" : data.lines[i].color, '">                    <span class="line_title_content" style="background-color:', "undefined" == typeof data.lines[i].color ? "" : data.lines[i].color, '">                        ', "undefined" == typeof data.lines[i].name ? "" : data.lines[i].name, "</span>                </div>                ");
                            for (var j = 0; j < data.lines[i].dirs.length; j++) _template_fun_array.push("                    "), data.lines[i].dirs[j].startTime && data.lines[i].dirs[j].endTime && _template_fun_array.push('                        <ul class="sw-pw-line-list">                            <li class="sw-pw-line-dir">                                <span class="sw-pw-line-dir-name">                                    ', "undefined" == typeof data.lines[i].dirs[j].name ? "" : data.lines[i].dirs[j].name, '</span>                                <span class="sw-pw-text-gray">方向</span></li>                            <li class="sw-pw-line-time">                                <span class="sw-pw-text-gray-bkg">始</span>                                <span class="sw-pw-text-inline-block">                                    ', "undefined" == typeof(data.lines[i].dirs[j].startTime || "00:00") ? "" : data.lines[i].dirs[j].startTime || "00:00", '</span>                                <span class="sw-pw-text-gray-bkg">末</span>                                <span class="sw-pw-text-inline-block">                                    ', "undefined" == typeof(data.lines[i].dirs[j].endTime || "00:00") ? "" : data.lines[i].dirs[j].endTime || "00:00", "</span>                            </li>                        </ul>                    "), _template_fun_array.push("                ");
                            _template_fun_array.push("            </div>        ")
                        }
                        _template_fun_array.push("    </div></div>"), _template_varName = null
                    }(_template_object);
                return fn = null, _template_fun_array.join("")
            }][0];
            this.$el && this.destroy(), this.$el = T(template({
                data: data
            })), T("#sw_renderer").append(this.$el), this.$el.css("z-index", this.zIndex);
            var pos = this.svgRender.getPixelFromPoint(this.getPoint());
            this.show(pos.x, pos.y), this.bindEvt()
        },
        bindEvt: function() {
            var t = this;
            if (!t.bindEvtOnce && (t.bindEvtOnce = !0, listener.on("subway.popupwindow", "positionChange", function() {
                    if ("block" === t.$el.css("display")) {
                        var e = t.getPoint(),
                            a = t.svgRender.getPixelFromPoint(e);
                        t.setPosition(a.x, a.y)
                    }
                }), this.$el)) {
                var t = this;
                this.$el.on("mouseover", function() {
                    $(this).css("z-index", 9999)
                }), this.$el.on("mouseout", function() {
                    $(this).css("z-index", t.zIndex)
                })
            }
        },
        destroy: function() {
            this.$el.remove()
        },
        show: function(t, e, a) {
            var s = this.$el,
                i = this.offsetX = parseFloat(s.width()),
                n = this.offsetY = parseFloat(s.height());
            if (this.popupType === POPUP_PLAN_TRANS_TYPE || this.popupType === POPUP_PLAN_END_TYPE) {
                this.offsetX = 0, this.offsetY = 0, this.offset = {
                    left: 0,
                    top: 0
                };
                var l = this.lineDir,
                    o = 15;
                if (0 === l) {
                    var p = t - i / 2,
                        d = e - n,
                        r = t + i / 2,
                        f = e,
                        _ = [p, d, r, f],
                        u = t - i / 2,
                        c = e,
                        m = t + i / 2,
                        h = e + n,
                        v = [u, c, m, h];
                    this.noCollideTest(this.screenBounds, _, o) ? (this.offset.left = -i / 2, this.offset.top = -n - o) : this.noCollideTest(this.screenBounds, v, o) ? (this.offset.left = -i / 2, this.offset.top = o) : (this.offset.left = -i / 2, this.offset.top = o)
                } else if (1 === l) {
                    var p = t - i,
                        d = e - n / 2,
                        r = t,
                        f = e + n / 2,
                        _ = [p, d, r, f],
                        u = t,
                        c = e - n / 2,
                        m = t + i,
                        h = e + n / 2,
                        v = [u, c, m, h];
                    this.noCollideTest(this.screenBounds, _, o) ? (this.offset.left = -i - o, this.offset.top = -n / 2) : this.noCollideTest(this.screenBounds, v, o) ? (this.offset.left = o, this.offset.top = -n / 2) : (this.offset.left = o, this.offset.top = -n / 2)
                } else if (2 === l) {
                    var p = t - i,
                        d = e - n,
                        r = t,
                        f = e,
                        _ = [p, d, r, f],
                        u = t,
                        c = e,
                        m = t + i,
                        h = e + n,
                        v = [u, c, m, h];
                    this.noCollideTest(this.screenBounds, _, o) ? (this.offset.left = -i - o, this.offset.top = -n - o) : this.noCollideTest(this.screenBounds, v, o) ? (this.offset.left = o, this.offset.top = o) : (this.offset.left = o, this.offset.top = o)
                } else if (3 === l) {
                    var p = t - i,
                        d = e,
                        r = t,
                        f = e + n,
                        _ = [p, d, r, f],
                        u = t,
                        c = e - n,
                        m = t + i,
                        h = e,
                        v = [u, c, m, h];
                    this.noCollideTest(this.screenBounds, _, o) ? (this.offset.left = -i - o, this.offset.top = o) : this.noCollideTest(this.screenBounds, v, o) ? (this.offset.left = o, this.offset.top = -n - o) : (this.offset.left = o, this.offset.top = -n - o)
                }
            }
            s.css({
                left: t - this.offsetX / 2 + this.offset.left,
                top: e - this.offsetY + this.offset.top
            }).show(), a && a()
        },
        noCollideTest: function(t, e, a) {
            return e[0] + a > t[2] || e[2] < t[0] + a || e[1] + a > t[3] || e[3] < t[1] + a ? !0 : !1
        },
        hide: function() {
            this.$el.hide()
        },
        move: function(t, e) {
            var a = this.$el,
                s = parseFloat(a.css("left")),
                i = parseFloat(a.css("top"));
            a.css({
                left: s + t,
                top: i + e
            })
        },
        setPosition: function(t, e) {
            var a = this.$el;
            a.css({
                left: t - this.offsetX / 2 + this.offset.left,
                top: e - this.offsetY + this.offset.top
            })
        },
        getPosition: function() {
            var t = this.$el;
            return {
                left: parseFloat(t.css("left")),
                top: parseFloat(t.css("top"))
            }
        },
        getPoint: function() {
            var t = this.data;
            return this.popupType === POPUP_MINI_TYPE ? new Coords(t.x, t.y) : new Coords(t.station.x, t.station.y)
        }
    }), module.exports = PopupWindow
});;
define("common:widget/com/Subway/renderer/SVG.js", function(t, e, n) {
    var i = this.SVG = function(t) {
        return i.supported ? new i.Doc(t) : void 0
    };
    i.ns = "http://www.w3.org/2000/svg", i.xlink = "http://www.w3.org/1999/xlink", i.did = 1e3, i.eid = function(t) {
        return "svgjs" + t.charAt(0).toUpperCase() + t.slice(1) + i.did++
    }, i.create = function(t) {
        var e = document.createElementNS(this.ns, t);
        return e.setAttribute("id", this.eid(t)), e
    }, i.extend = function() {
        var t, e, n, i;
        for (t = [].slice.call(arguments), e = t.pop(), i = t.length - 1; i >= 0; i--)
            if (t[i])
                for (n in e) t[i].prototype[n] = e[n]
    }, i.get = function(t) {
        var e = document.getElementById(t);
        return e ? e.instance : void 0
    }, i.supported = function() {
        return !!document.createElementNS && !!document.createElementNS(i.ns, "svg").createSVGRect
    }(), i.regex = {
        test: function(t, e) {
            return this[e].test(t)
        },
        unit: /^(-?[\d\.]+)([a-z%]{0,2})$/,
        rgb: /rgb\((\d+),(\d+),(\d+)\)/,
        isRgb: /^rgb\(/,
        isCss: /[^:]+:[^;]+;?/,
        isStyle: /^font|text|leading|cursor/,
        isBlank: /^(\s+)?$/,
        isNumber: /^-?[\d\.]+$/
    }, i.defaults = {
        matrix: "1,0,0,1,0,0",
        attrs: {
            "fill-opacity": 1,
            "stroke-opacity": 1,
            "stroke-width": 0,
            fill: "#000",
            stroke: "#000",
            opacity: 1,
            x: 0,
            y: 0,
            cx: 0,
            cy: 0,
            width: 0,
            height: 0,
            r: 0,
            rx: 0,
            ry: 0,
            offset: 0
        },
        trans: function() {
            return {
                x: 0,
                y: 0,
                scaleX: 1,
                scaleY: 1,
                matrix: this.matrix,
                a: 1,
                b: 0,
                c: 0,
                d: 1,
                e: 0,
                f: 0
            }
        }
    }, i.Color = function(t) {
        var e;
        this.r = 0, this.g = 0, this.b = 0, "string" == typeof t && i.regex.isRgb.test(t) && (e = i.regex.rgb.exec(t.replace(/\s/g, "")), this.r = parseInt(e[1]), this.g = parseInt(e[2]), this.b = parseInt(e[3]))
    }, i.extend(i.Color, {
        toString: function() {
            return this.toHex()
        },
        toHex: function() {
            return "#" + this._compToHex(this.r) + this._compToHex(this.g) + this._compToHex(this.b)
        },
        _compToHex: function(t) {
            var e = t.toString(16);
            return 1 == e.length ? "0" + e : e
        }
    }), i.Color.test = function(t) {
        return t += "", i.regex.isRgb.test(t)
    }, i.Color.isRgb = function(t) {
        return t && "number" == typeof t.r
    }, i.ViewBox = function(t) {
        var e, n, i, s, r = t.bbox(),
            o = (t.attr("viewBox") || "").match(/-?[\d\.]+/g);
        this.x = r.x, this.y = r.y, this.width = t.node.clientWidth || t.node.getBoundingClientRect().width, this.height = t.node.clientHeight || t.node.getBoundingClientRect().height, o && (e = parseFloat(o[0]), n = parseFloat(o[1]), i = parseFloat(o[2]), s = parseFloat(o[3]), this.zoom = this.width / this.height > i / s ? this.height / s : this.width / i, this.x = e, this.y = n, this.width = i, this.height = s), this.zoom = this.zoom || 1
    }, i.extend(i.ViewBox, {
        toString: function() {
            return this.x + " " + this.y + " " + this.width + " " + this.height
        }
    }), i.BBox = function(t) {
        var e;
        try {
            e = t.node.getBBox()
        } catch (n) {
            e = {
                x: t.node.clientLeft,
                y: t.node.clientTop,
                width: t.node.clientWidth,
                height: t.node.clientHeight
            }
        }
        this.x = e.x + t.trans.x, this.y = e.y + t.trans.y, this.width = e.width * t.trans.scaleX, this.height = e.height * t.trans.scaleY, this.cx = this.x + this.width / 2, this.cy = this.y + this.height / 2
    }, i.Element = function(t) {
        this._stroke = i.defaults.attrs.stroke, this.styles = {}, this.trans = i.defaults.trans(), (this.node = t) && (this.type = t.nodeName, this.node.instance = this)
    }, i.extend(i.Element, {
        x: function(t) {
            return t && (t /= this.trans.scaleX), this.attr("x", t)
        },
        y: function(t) {
            return t && (t /= this.trans.scaleY), this.attr("y", t)
        },
        cx: function(t) {
            return null == t ? this.bbox().cx : this.x(t - this.bbox().width / 2)
        },
        cy: function(t) {
            return null == t ? this.bbox().cy : this.y(t - this.bbox().height / 2)
        },
        move: function(t, e) {
            return this.x(t).y(e)
        },
        center: function(t, e) {
            return this.cx(t).cy(e)
        },
        size: function(t, e) {
            return this.attr({
                width: t,
                height: e
            })
        },
        remove: function() {
            return this.parent && this.parent.removeElement(this), this
        },
        doc: function(t) {
            return this._parent(t || i.Doc)
        },
        attr: function(t, e, n) {
            if (null == t) {
                for (t = {}, e = this.node.attributes, n = e.length - 1; n >= 0; n--) t[e[n].nodeName] = i.regex.test(e[n].nodeValue, "isNumber") ? parseFloat(e[n].nodeValue) : e[n].nodeValue;
                return t
            }
            if ("object" == typeof t)
                for (e in t) this.attr(e, t[e]);
            else if (null === e) this.node.removeAttribute(t);
            else {
                if (null == e) return this._isStyle(t) ? "text" == t ? this.content : "leading" == t && this.leading ? this.leading() : this.style(t) : (e = this.node.getAttribute(t), null == e ? i.defaults.attrs[t] : i.regex.test(e, "isNumber") ? parseFloat(e) : e);
                if ("style" == t) return this.style(e);
                if ("x" == t && Array.isArray(this.lines))
                    for (n = this.lines.length - 1; n >= 0; n--) this.lines[n].attr(t, e);
                "stroke-width" == t ? this.attr("stroke", parseFloat(e) > 0 ? this._stroke : null) : "stroke" == t && (this._stroke = e), (i.Color.test(e) || i.Color.isRgb(e)) && (e = new i.Color(e).toHex()), null != n ? this.node.setAttributeNS(n, t, e.toString()) : this.node.setAttribute(t, e.toString()), this._isStyle(t) && ("text" == t ? this.text(e) : "leading" == t && this.leading ? this.leading(e) : this.style(t, e), this.rebuild && this.rebuild(t, e))
            }
            return this
        },
        transform: function(t, e) {
            if (0 == arguments.length) return this.trans;
            if ("string" == typeof t) {
                if (arguments.length < 2) return this.trans[t];
                var n = {};
                return n[t] = e, this.transform(n)
            }
            var n = [];
            t = this._parseMatrix(t);
            for (e in t) null != t[e] && (this.trans[e] = t[e]);
            return this.trans.matrix = this.trans.a + "," + this.trans.b + "," + this.trans.c + "," + this.trans.d + "," + this.trans.e + "," + this.trans.f, t = this.trans, t.matrix != i.defaults.matrix && n.push("matrix(" + t.matrix + ")"), (1 != t.scaleX || 1 != t.scaleY) && n.push("scale(" + t.scaleX + "," + t.scaleY + ")"), (0 != t.x || 0 != t.y) && n.push("translate(" + t.x / t.scaleX + "," + t.y / t.scaleY + ")"), this._offset && 0 != this._offset.x && 0 != this._offset.y && n.push("translate(" + -this._offset.x + "," + -this._offset.y + ")"), 0 == n.length ? this.node.removeAttribute("transform") : this.node.setAttribute("transform", n.join(" ")), this
        },
        style: function(t, e) {
            if (0 == arguments.length) return this.attr("style") || "";
            if (arguments.length < 2)
                if ("object" == typeof t)
                    for (e in t) this.style(e, t[e]);
                else {
                    if (!i.regex.isCss.test(t)) return this.styles[t];
                    t = t.split(";");
                    for (var n = 0; n < t.length; n++) e = t[n].split(":"), 2 == e.length && this.style(e[0].replace(/\s+/g, ""), e[1].replace(/^\s+/, "").replace(/\s+$/, ""))
                }
            else null === e || i.regex.test(e, "isBlank") ? delete this.styles[t] : this.styles[t] = e;
            t = "";
            for (e in this.styles) t += e + ":" + this.styles[e] + ";";
            return "" == t ? this.node.removeAttribute("style") : this.node.setAttribute("style", t), this
        },
        data: function(t, e, n) {
            if (arguments.length < 2) try {
                return JSON.parse(this.attr("data-" + t))
            } catch (i) {
                return this.attr("data-" + t)
            } else this.attr("data-" + t, null === e ? null : n === !0 || "string" == typeof e || "number" == typeof e ? e : JSON.stringify(e));
            return this
        },
        bbox: function() {
            return new i.BBox(this)
        },
        show: function() {
            return this.style("display", "")
        },
        hide: function() {
            return this.style("display", "none")
        },
        visible: function() {
            return "none" != this.style("display")
        },
        toString: function() {
            return this.attr("id")
        },
        _parent: function(t) {
            for (var e = this; null != e && !(e instanceof t);) e = e.parent;
            return e
        },
        _isStyle: function(t) {
            return "string" == typeof t ? i.regex.test(t, "isStyle") : !1
        },
        _parseMatrix: function(t) {
            if (t.matrix) {
                var e = t.matrix.replace(/\s/g, "").split(",");
                6 == e.length && (t.a = parseFloat(e[0]), t.b = parseFloat(e[1]), t.c = parseFloat(e[2]), t.d = parseFloat(e[3]), t.e = parseFloat(e[4]), t.f = parseFloat(e[5]))
            }
            return t
        }
    }), i.Container = function(t) {
        this.constructor.call(this, t)
    }, i.Container.prototype = new i.Element, i.extend(i.Container, {
        children: function() {
            return this._children || (this._children = [])
        },
        add: function(t, e) {
            if (!this.has(t)) {
                if (e = null == e ? this.children().length : e, t.parent) {
                    var n = t.parent.children().indexOf(t);
                    t.parent.children().splice(n, 1)
                }
                this.children().splice(e, 0, t), this.node.insertBefore(t.node, this.node.childNodes[e] || null), t.parent = this
            }
            return this
        },
        put: function(t, e) {
            return this.add(t, e), t
        },
        has: function(t) {
            return this.children().indexOf(t) >= 0
        },
        each: function(t) {
            var e, n = this.children();
            for (e = 0, length = n.length; length > e; e++) n[e] instanceof i.Shape && t.apply(n[e], [e, n]);
            return this
        },
        removeElement: function(t) {
            var e = this.children().indexOf(t);
            return this.children().splice(e, 1), this.node.removeChild(t.node), t.parent = null, this
        },
        group: function() {
            return this.put(new i.G)
        },
        rect: function(t, e) {
            return this.put((new i.Rect).size(t, e))
        },
        circle: function(t) {
            return this.ellipse(t, t)
        },
        ellipse: function(t, e) {
            return this.put((new i.Ellipse).size(t, e).move(0, 0))
        },
        line: function(t, e, n, s) {
            return this.put((new i.Line).plot(t, e, n, s))
        },
        polyline: function(t, e) {
            return this.put(new i.Polyline(e)).plot(t)
        },
        path: function(t, e) {
            return this.put(new i.Path(e)).plot(t)
        },
        image: function(t, e, n) {
            return e = null != e ? e : 100, this.put((new i.Image).load(t).size(e, null != n ? n : e))
        },
        text: function(t) {
            return this.put((new i.Text).text(t))
        },
        viewbox: function(t) {
            return 0 == arguments.length ? new i.ViewBox(this) : (t = 1 == arguments.length ? [t.x, t.y, t.width, t.height] : [].slice.call(arguments), this.attr("viewBox", t.join(" ")))
        },
        clear: function() {
            for (var t = this.children().length - 1; t >= 0; t--) this.removeElement(this.children()[t]);
            return this
        }
    }), ["click", "dblclick", "mousedown", "mouseup", "mouseover", "mouseout", "mousemove", "mouseenter", "mouseleave", "touchstart", "touchend", "touchmove", "touchcancel"].forEach(function(t) {
        i.Element.prototype[t] = function(e) {
            var n = this;
            return this.node["on" + t] = "function" == typeof e ? function() {
                return e.apply(n, arguments)
            } : null, this
        }
    }), i.on = function(t, e, n) {
        t.addEventListener ? t.addEventListener(e, n, !1) : t.attachEvent("on" + e, n)
    }, i.off = function(t, e, n) {
        t.removeEventListener ? t.removeEventListener(e, n, !1) : t.detachEvent("on" + e, n)
    }, i.extend(i.Element, {
        on: function(t, e) {
            return i.on(this.node, t, e), this
        },
        off: function(t, e) {
            return i.off(this.node, t, e), this
        }
    }), i.G = function() {
        this.constructor.call(this, i.create("g"))
    }, i.G.prototype = new i.Container, i.extend(i.G, {
        x: function(t) {
            return null == t ? this.trans.x : this.transform("x", t)
        },
        y: function(t) {
            return null == t ? this.trans.y : this.transform("y", t)
        }
    }), i.Doc = function(t) {
        this.parent = "string" == typeof t ? document.getElementById(t) : t, this.constructor.call(this, "svg" == this.parent.nodeName ? this.parent : i.create("svg")), this.attr({
            xmlns: i.ns,
            version: "1.1",
            width: "100%",
            height: "100%"
        }).attr("xlink", i.xlink, i.ns), "svg" != this.parent.nodeName && this.stage()
    }, i.Doc.prototype = new i.Container, i.extend(i.Doc, {
        stage: function() {
            var t, e = this,
                n = document.createElement("div");
            return n.style.cssText = "position:relative;height:100%;", e.parent.appendChild(n), n.appendChild(e.node), t = function() {
                "complete" === document.readyState ? (e.style("position:absolute;"), setTimeout(function() {
                    e.style("position:relative;"), e.parent.removeChild(e.node.parentNode), e.node.parentNode.removeChild(e.node), e.parent.appendChild(e.node), e.fixSubPixelOffset(), i.on(window, "resize", function() {
                        e.fixSubPixelOffset()
                    })
                }, 5)) : setTimeout(t, 10)
            }, t(), this
        },
        fixSubPixelOffset: function() {
            var t = this.node.getScreenCTM();
            this.style("left", -t.e % 1 + "px").style("top", -t.f % 1 + "px")
        }
    }), i.Shape = function(t) {
        this.constructor.call(this, t)
    }, i.Shape.prototype = new i.Element, i.Rect = function() {
        this.constructor.call(this, i.create("rect"))
    }, i.Rect.prototype = new i.Shape, i.Ellipse = function() {
        this.constructor.call(this, i.create("ellipse"))
    }, i.Ellipse.prototype = new i.Shape, i.extend(i.Ellipse, {
        x: function(t) {
            return null == t ? this.cx() - this.attr("rx") : this.cx(t + this.attr("rx"))
        },
        y: function(t) {
            return null == t ? this.cy() - this.attr("ry") : this.cy(t + this.attr("ry"))
        },
        cx: function(t) {
            return null == t ? this.attr("cx") : this.attr("cx", t / this.trans.scaleX)
        },
        cy: function(t) {
            return null == t ? this.attr("cy") : this.attr("cy", t / this.trans.scaleY)
        },
        size: function(t, e) {
            return this.attr({
                rx: t / 2,
                ry: e / 2
            })
        }
    }), i.Line = function() {
        this.constructor.call(this, i.create("line"))
    }, i.Line.prototype = new i.Shape, i.extend(i.Line, {
        x: function(t) {
            var e = this.bbox();
            return null == t ? e.x : this.attr({
                x1: this.attr("x1") - e.x + t,
                x2: this.attr("x2") - e.x + t
            })
        },
        y: function(t) {
            var e = this.bbox();
            return null == t ? e.y : this.attr({
                y1: this.attr("y1") - e.y + t,
                y2: this.attr("y2") - e.y + t
            })
        },
        cx: function(t) {
            var e = this.bbox().width / 2;
            return null == t ? this.x() + e : this.x(t - e)
        },
        cy: function(t) {
            var e = this.bbox().height / 2;
            return null == t ? this.y() + e : this.y(t - e)
        },
        size: function(t, e) {
            var n = this.bbox();
            return this.attr(this.attr("x1") < this.attr("x2") ? "x2" : "x1", n.x + t).attr(this.attr("y1") < this.attr("y2") ? "y2" : "y1", n.y + e)
        },
        plot: function(t, e, n, i) {
            return this.attr({
                x1: t,
                y1: e,
                x2: n,
                y2: i
            })
        }
    }), i.Polyline = function() {
        this.constructor.call(this, i.create("polyline"))
    }, i.Polyline.prototype = new i.Shape, i.Path = function(t) {
        this.constructor.call(this, i.create("path")), this.unbiased = !!t
    }, i.Path.prototype = new i.Shape, i.extend(i.Path, {
        _plot: function(t) {
            return this.attr("d", t || "M0,0")
        }
    }), i.extend(i.Polyline, i.Path, {
        x: function(t) {
            return null == t ? this.bbox().x : this.transform("x", t)
        },
        y: function(t) {
            return null == t ? this.bbox().y : this.transform("y", t)
        },
        size: function(t, e) {
            var n = t / this._offset.width;
            return this.transform({
                scaleX: n,
                scaleY: null != e ? e / this._offset.height : n
            })
        },
        plot: function(t) {
            var e = this.trans.scaleX,
                n = this.trans.scaleY;
            return this._plot(t), this._offset = this.transform({
                scaleX: 1,
                scaleY: 1
            }).bbox(), this.unbiased ? this._offset.x = this._offset.y = 0 : (this._offset.x -= this.trans.x, this._offset.y -= this.trans.y), this.transform({
                scaleX: e,
                scaleY: n
            })
        }
    }), i.Image = function() {
        this.constructor.call(this, i.create("image"))
    }, i.Image.prototype = new i.Shape, i.extend(i.Image, {
        load: function(t) {
            return t ? this.attr("href", this.src = t, i.xlink) : this
        }
    });
    var s = "size family weight stretch variant style".split(" ");
    i.Text = function() {
        this.constructor.call(this, i.create("text")), this.styles = {
            "font-size": 16,
            "font-family": "Helvetica, Arial, sans-serif",
            "text-anchor": "start"
        }, this._leading = 1.2, this._base = .276666666
    }, i.Text.prototype = new i.Shape, i.extend(i.Text, {
        x: function(t, e) {
            return null == t ? e ? this.attr("x") : this.bbox().x : (e || (e = this.style("text-anchor"), t = "start" == e ? t : "end" == e ? t + this.bbox().width : t + this.bbox().width / 2), this.attr("x", t))
        },
        cx: function(t) {
            return null == t ? this.bbox().cx : this.x(t - this.bbox().width / 2)
        },
        cy: function(t, e) {
            return null == t ? this.bbox().cy : this.y(e ? t : t - this.bbox().height / 2)
        },
        move: function(t, e, n) {
            return this.x(t, n).y(e)
        },
        center: function(t, e, n) {
            return this.cx(t, n).cy(e, n)
        },
        text: function(t) {
            if (null == t) return this.content;
            this.clear(), this.content = i.regex.isBlank.test(t) ? "text" : t;
            var e, n, s = t.split("\n");
            for (e = 0, n = s.length; n > e; e++) this.tspan(s[e]);
            return this.attr("textLength", 1).attr("textLength", null)
        },
        tspan: function(t) {
            var e = (new i.TSpan).text(t);
            return this.node.appendChild(e.node), this.lines.push(e), e.attr("style", this.style())
        },
        size: function(t) {
            return this.attr("font-size", t)
        },
        leading: function(t) {
            return null == t ? this._leading : (this._leading = t, this.rebuild("leading", t))
        },
        rebuild: function() {
            var t, e, n = this.styles["font-size"];
            for (t = 0, e = this.lines.length; e > t; t++) this.lines[t].attr({
                dy: n * this._leading - (0 == t ? n * this._base : 0),
                x: this.attr("x") || 0,
                style: this.style()
            });
            return this
        },
        clear: function() {
            for (; this.node.hasChildNodes();) this.node.removeChild(this.node.lastChild);
            return this.lines = [], this
        }
    }), i.TSpan = function() {
        this.constructor.call(this, i.create("tspan"))
    }, i.TSpan.prototype = new i.Shape, i.extend(i.TSpan, {
        text: function(t) {
            return this.node.appendChild(document.createTextNode(t)), this
        }
    }), i.Nested = function() {
        this.constructor.call(this, i.create("svg")), this.style("overflow", "visible")
    }, i.Nested.prototype = new i.Container, i._stroke = ["color", "width", "opacity", "linecap", "linejoin", "miterlimit", "dasharray", "dashoffset"], i._fill = ["color", "opacity", "rule"];
    var r = function(t, e) {
        return "color" == e ? t : t + "-" + e
    };
    ["fill", "stroke"].forEach(function(t) {
        var e = {};
        e[t] = function(e) {
            if ("string" == typeof e || i.Color.isRgb(e)) this.attr(t, e);
            else
                for (index = i["_" + t].length - 1; index >= 0; index--) null != e[i["_" + t][index]] && this.attr(r(t, i["_" + t][index]), e[i["_" + t][index]]);
            return this
        }, i.extend(i.Shape, e)
    }), i.extend(i.Element, {
        scale: function(t, e) {
            return this.transform({
                scaleX: t,
                scaleY: null == e ? t : e
            })
        },
        matrix: function(t) {
            return this.transform({
                matrix: t
            })
        },
        opacity: function(t) {
            return this.attr("opacity", t)
        }
    }), i.Text && i.extend(i.Text, {
        font: function(t) {
            for (var e in t) "anchor" == e ? this.attr("text-anchor", t[e]) : s.indexOf(e) > -1 ? this.attr("font-" + e, t[e]) : this.attr(e, t[e]);
            return this
        }
    }), n.exports = i
});;
define('common:widget/com/Subway/renderer/SubwayModel.js', function(require, exports, module) {
    /**
     * 地铁图线路规划模型，根据给定的参数，分析出高亮线路, by wjp, 2017/08/01
     */

    var LINE_TYPE_FIRST = 0; // 起始段，仅有1段
    var LINE_TYPE_MID = 1; // 中间段，中间段可能有多段
    var LINE_TYPE_LAST = 2; // 最后段，仅有1段
    // 在这里添加有问题的线路名称
    var errLine = [{
            city: '重庆',
            lineName: '轨道交通环线',
            newLineName: '轨道交通环线外环(二郎-二郎)'
        },
        {
            city: '成都',
            lineName: '地铁7号线',
            newLineName: '地铁7号线内环'
        },
        {
            city: '北京',
            lineName: '地铁17号线',
            newLineName: '地铁17号线北段(未来科学城北-工人体育场)'
        },
    ];

    function SubwayModel(subwayData) {
        this.subwayData = subwayData;
    }

    $.extend(SubwayModel.prototype, {
        /**
         * 切换城市时候，更新下最新的subwayData
         * @return {[type]} [description]
         */
        updateSubwayData: function(subwayData) {
            this.subwayData = subwayData;
        },

        /**
         * 分析传入数据，给出规划线路
         * @return {[type]} [description]
         */
        parse: function(lines) {
            var planResult = [];
            for (var i = 0, len = lines.length; i < len; i++) {
                var line = lines[i];
                var lineInfo = this.parseLine(line);
                if (lineInfo) {
                    if (i === 0) { // 第1段
                        lineInfo.type = LINE_TYPE_FIRST;
                    }

                    if (i === len - 1) { // 最后1段
                        lineInfo.type = LINE_TYPE_LAST;
                    }

                    if (i > 0 && i < len - 1) { // 中间段
                        lineInfo.type = LINE_TYPE_MID;
                    }
                    planResult.push(lineInfo);
                }
            }

            // 计算规划线路的外包矩形
            var minX = 1000000;
            var minY = 1000000;
            var maxX = -1000000;
            var maxY = -1000000;
            for (var i = 0, len = planResult.length; i < len; i++) {
                var pLine = planResult[i];
                var stations = pLine.stations;
                for (var j = 0, l = stations.length; j < l; j++) {
                    var station = stations[j];
                    var x = station.x;
                    var y = station.y;

                    if (x < minX) {
                        minX = x;
                    }
                    if (y < minY) {
                        minY = y;
                    }

                    if (x > maxX) {
                        maxX = x;
                    }
                    if (y > maxY) {
                        maxY = y;
                    }
                }
            }
            planResult.bounds = [minX, minY, maxX, maxY];

            return planResult;
        },

        /**
         * 解析每一段线，获取需要的线路信息
         * @return {[type]} [description]
         */
        parseLine: function(line) {
            var temp;
            var sid = line.sid;
            temp = sid.split('|');
            var startName = temp[2];

            var eid = line.eid;
            temp = eid.split('|');
            var endName = temp[2];

            var nid = line.nid;
            temp = nid.split('|');
            var nextName = temp[2]; // 起点下一站的名称

            var lid = line.lid;
            var arrTemp = lid.split('|');
            var LineName = arrTemp[1];
            // 处理带扩号的路线如：
            // 上海：地铁10号线(新江湾城-航中路)，重庆：轨道交通3号线(碧津-举人坝)
            var reverseLineName = '';
            if (/(\(.+-.+\))$/.test(LineName)) {
                var strMatch = RegExp.$1;
                var prefix = LineName.replace(strMatch, '');
                if (strMatch) {
                    strMatch = strMatch.replace('(', '').replace(')', '');
                    if (strMatch.indexOf('-') > 0) {
                        reverseLineName = prefix + '(' + strMatch.split('-')
                            .reverse().join('-') + ')';
                    }
                }
            }
            // 处理环线的方法 环线会分内外环需要对name进行处理（subway_data也需要变更）
            // 环线不显示线路修复(长名线路也可以用该方法修复)
            for (let i = 0; i < errLine.length; i++) {
                const obj = errLine[i];
                if (obj.city === this.subwayData.shortName && LineName.indexOf(obj.lineName) > -1) {
                    LineName = obj.newLineName;
                }
            }
            var distance = line.distance;
            // 根据线路名称找到对应的线路站点
            var subwayData = this.subwayData;
            var lineHash = subwayData.lineHash;
            var objLine = lineHash[LineName] || lineHash[reverseLineName];
            // console.log(lineHash, LineName, reverseLineName);
            if (!objLine && console) {
                console.error('请检查: ' + LineName + ', 或: ' +
                    reverseLineName + ' 与xml数据中的是否一致！');
            }

            if (objLine) { // 根据起终点与起点下一站方向，找出该线路经过的所有站点
                var stations = objLine.stations;
                var startIndex = -1;
                var nextIndex = -1;
                var endIndex = -1;
                for (var i = 0, len = stations.length; i < len; i++) {
                    var station = stations[i];
                    if (station.sid === startName && startIndex === -1) {
                        startIndex = i;
                    }
                    if (station.sid === nextName && nextIndex === -1) {
                        nextIndex = i;
                    }
                    if (station.sid === endName && endIndex === -1) {
                        endIndex = i;
                    }
                }

                var findStations = [];
                if (!objLine.loop) { // 普通线路
                    // 根据起点索引及下一站名称，及终点名称，寻找经过的站点
                    if (nextIndex > startIndex) { // 自起站向后找
                        while (startIndex < stations.length) {
                            var theStation = stations[startIndex];
                            findStations.push(theStation);
                            if (theStation.sid === endName) {
                                break;
                            }
                            startIndex++;
                        }
                    } else { // 自起站向前找
                        while (startIndex >= 0) {
                            var theStation = stations[startIndex];
                            findStations.push(theStation);
                            if (theStation.sid === endName) {
                                break;
                            }
                            startIndex--;
                        }
                    }
                } else { // 环线
                    var count = 0; // 防止出现死循环，找2圈没有就退出
                    if (nextIndex > startIndex && startIndex !== 0 && startIndex !== stations.length - 1) { // 自起站向后找
                        while (true) {
                            if (startIndex >= stations.length) {
                                startIndex = startIndex - stations.length;
                            }
                            var theStation = stations[startIndex];
                            findStations.push(theStation);
                            if (theStation.sid === endName) {
                                break;
                            }
                            startIndex++;

                            count++;
                            if (count > stations.length * 2) {
                                break;
                            }
                        }
                    } else if (nextIndex < startIndex && startIndex !== 0 && startIndex !== stations.length - 1) {
                        while (true) {
                            if (startIndex < 0) {
                                startIndex = startIndex + stations.length;
                            }
                            var theStation = stations[startIndex];
                            findStations.push(theStation);
                            if (theStation.sid === endName) {
                                break;
                            }
                            startIndex--;

                            count++;
                            if (count > stations.length * 2) {
                                break;
                            }
                        }
                    } else if (startIndex === 0 && nextIndex > startIndex && nextIndex < stations.length / 2) {
                        while (true) {
                            if (startIndex >= stations.length) {
                                startIndex = startIndex - stations.length;
                            }
                            var theStation = stations[startIndex];
                            findStations.push(theStation);
                            if (theStation.sid === endName) {
                                break;
                            }
                            startIndex++;

                            count++;
                            if (count > stations.length * 2) {
                                break;
                            }
                        }

                    } else if (startIndex === 0 && nextIndex > startIndex && nextIndex > stations.length / 2) {
                        while (true) {
                            if (startIndex < 0) {
                                startIndex = startIndex + stations.length;
                            }
                            var theStation = stations[startIndex];
                            findStations.push(theStation);
                            if (theStation.sid === endName) {
                                break;
                            }
                            startIndex--;

                            count++;
                            if (count > stations.length * 2) {
                                break;
                            }
                        }
                    } else if (startIndex === stations.length - 1 &&
                        nextIndex < startIndex && endIndex < stations.length / 2) {
                        while (true) {
                            if (startIndex >= stations.length) {
                                startIndex = startIndex - stations.length;
                            }
                            var theStation = stations[startIndex];
                            findStations.push(theStation);
                            if (theStation.sid === endName) {
                                break;
                            }
                            startIndex++;

                            count++;
                            if (count > stations.length * 2) {
                                break;
                            }
                        }
                    } else if (startIndex === stations.length - 1 &&
                        nextIndex < startIndex && endIndex > stations.length / 2) {
                        while (true) {
                            if (startIndex < 0) {
                                startIndex = startIndex + stations.length;
                            }
                            var theStation = stations[startIndex];
                            findStations.push(theStation);
                            if (theStation.sid === endName) {
                                break;
                            }
                            startIndex--;

                            count++;
                            if (count > stations.length * 2) {
                                break;
                            }
                        }
                    }
                }
            }
            return {
                stations: findStations,
                lineLabel: objLine.lb, // 线路text
                lc: objLine.lc || '' // lineColor
            }
        }
    });

    module.exports = SubwayModel;
});;
define("common:widget/com/Subway/renderer/SVGRenderer.js", function(t, i, e) {
    function n() {
        this.resTransfer = "//webmap1.bdimg.com/wolfman/static/common/images/subways/resTransfer_89f461e.png", this.resAirport = "//webmap0.bdimg.com/wolfman/static/common/images/subways/resAirport_37efa62.png", this.resStart = "//webmap1.bdimg.com/wolfman/static/common/images/subways/resStart_8d1eae7.png", this.resEnd = "//webmap0.bdimg.com/wolfman/static/common/images/subways/resEnd_7d5806f.png"
    }
    var a = t("common:widget/com/Subway/renderer/SVG.js"),
        o = t("common:widget/com/Subway/base/coords.js"),
        s = t("common:widget/com/Subway/popupwindow/popupwindow.js"),
        r = t("common:widget/com/Subway/base/SubwayAnimation.js"),
        h = t("common:widget/com/Subway/renderer/SubwayModel.js"),
        l = 1,
        c = 2,
        u = 3,
        d = 0,
        m = 1,
        g = 2;
    n.supported = a.supported, $.extend(n.prototype, {
        initialize: function(t, i) {
            try {
                this.initVars(), this.$el = t, this.subwayData = i, this.cityCode = i.ccode || 1, this.deviceWidth = t.get(0).offsetWidth, this.deviceHeight = t.get(0).offsetHeight, this.mapWidth = i.width, this.mapHeight = i.height, this.rectWidth = Math.max(this.mapWidth, this.deviceWidth), this.rectHeight = Math.max(this.mapHeight, this.deviceHeight), this._plotStations = this.proxy(this._plotStations, this), this.createSvgCanvas(), this.bindMouseEvt(), this.bindElementsEvt(), this.bindResizeEvt(), this.plot(), this.createLineMenu(), this.createZoomControl()
            } catch (e) {
                "undefined" != typeof alog && alog("exception.fire", "catch", {
                    msg: e.message || e.description,
                    path: "common:widget/com/Subway/renderer/SVGRenderer.js",
                    ln: 73
                })
            }
        },
        initVars: function() {
            this.svg = null, this.svgRenderContainer = null, this.scaleRatio = 1.25, this.maxScaleRatio = 2, this.minScaleRatio = .2;
            var t = navigator.userAgent;
            /QQBrowser|MetaSr|BIDUBrowser/gi.test(t) && (this.minScaleRatio = .75), this.scaleRate = 1.25, this.zoomInRate = this.scaleRate, this.zoomOutRate = 1 / this.scaleRate, this.orig_x = null, this.orig_y = null, this.highLightLineLid = null, this.highLightLines = [], this.highLightStations = [], this.hoverPopupWindow = null, this.miniHoverPopupWindow = null, this.searchStation = null, this.searchStationText = null, this.searchStationPopupWindow = null, this.delaySelectLineHandler = null, this.subwayPlanStart = null, this.subwayPlanEnd = null, this.subwayPlanPopupWindows = [], this.isDrag = !1, this.useAnimation = !0
        },
        proxy: function(t, i) {
            var e = 2 in arguments && slice.call(arguments, 2),
                n = function() {
                    return t.apply(i, e ? e.concat(slice.call(arguments)) : arguments)
                };
            return n
        },
        createSvgCanvas: function() {
            this.$el.find("#sw_renderer").remove(), this.svgRenderContainer = $('<div id="sw_renderer" style="position: relative; width: 100%; height: 100%;user-select:none;-moz-user-select: none" />');
            var t = $('<svg id="sw_svg" stlye="position: absolute;" />').get(0);
            this.svgRenderContainer.append(t), this.$el.append(this.svgRenderContainer), this.svg = a(t).size(this.rectWidth, this.rectHeight), this.context = this.svg.group()
        },
        bindElementsEvt: function() {
            var t = this,
                i = this.svg;
            i.on("mousemove", function(i) {
                var e = i.target,
                    n = parseInt(e.getAttribute("eletype"), 10);
                if (t.setCursor("default"), t.hideHoverPopupWindows(), 0 === n) t.stationMouseOver(e), t.setCursor("pointer");
                else if (1 === n) {
                    var a = {
                            x: i.clientX || 0,
                            y: i.clientY || 0
                        },
                        o = t.getPointFromPixel(a);
                    t.lineMouseOver(e, o), t.setCursor("pointer")
                }
            }), t.elClickOnce || (t.elClickOnce = !0, t.$el.on("click", function(i) {
                if (!t.isDrag) {
                    t.hideHoverPopupWindows(), t.clearHighLightLines(), t.clearHighLightStations(), this.highLightLineLid = null;
                    var e = i.target,
                        n = -1;
                    e && e.getAttribute("eletype") && (n = parseInt(e.getAttribute("eletype"), 10)), 0 === n ? t.setSubwayPlanStation(e) : (t.clearSearchPlan(), listener.trigger("com.subway", "clearsearch")), t.subwayPlanStart && t.subwayPlanEnd || t.hideMaskLayer()
                }
            }))
        },
        setSubwayPlanStation: function(t) {
            var i = t.getAttribute("uid"),
                e = t.getAttribute("name"),
                n = t.getAttribute("sx"),
                a = t.getAttribute("sy"),
                o = t.getAttribute("mcX"),
                s = t.getAttribute("mcY"),
                r = this.context;
            if (this.subwayPlanStart) {
                if (!this.subwayPlanEnd) {
                    var h = r.image(this.resEnd, 35, 56).move(n - 18, a - 56);
                    this.subwayPlanEnd = {
                        uid: i,
                        name: e,
                        mcX: o,
                        mcY: s,
                        ele: h,
                        sx: n,
                        sy: a
                    }, listener.trigger("com.subway", "svgstation", {
                        type: "end",
                        data: e
                    })
                }
            } else {
                var l = r.image(this.resStart, 35, 56).move(n - 18, a - 56);
                this.subwayPlanStart = {
                    uid: i,
                    name: e,
                    mcX: o,
                    mcY: s,
                    ele: l,
                    sx: n,
                    sy: a
                }, listener.trigger("com.subway", "svgstation", {
                    type: "start",
                    data: e
                })
            }
            this.subwayPlanStart && this.subwayPlanEnd && this.searchPlan(this.subwayPlanStart, this.subwayPlanEnd)
        },
        clearSearchPlan: function() {
            this.clearHighLightLines(), this.clearHighLightStations(), this.clearSubwayPlanStation(), this.clearSubwayPlanPopupWindow(), this.clearSearchStationPopupWindow(), this.hideMaskLayer()
        },
        searchPlan: function(t, i) {
            this.showMaskLayer(), this.reHighLightStartAndEnd(), listener.trigger("com.subway", "linesearch", {
                start: t,
                end: i
            })
        },
        searchPlanCbkData: function(t, i) {
            if (!i.center && !this.subwayPlanStart && !this.subwayPlanEnd) return void listener.trigger("com.subway", "clearsearch");
            this.showMaskLayer();
            var e = this;
            e.subwayModel ? e.subwayModel.updateSubwayData(e.subwayData) : e.subwayModel = new h(e.subwayData);
            var n = e.subwayModel.parse(t),
                a = n.bounds;
            n.screenBounds = e.calcPlanScreenBounds(a), e.highLightPlan(n, t, i)
        },
        calcLineDir: function(t) {
            var i = t.stations,
                e = i.length,
                n = i[0].x,
                a = i[0].y,
                o = i[e - 1].x,
                s = i[e - 1].y,
                r = 0,
                h = 10;
            return r = Math.abs(s - a) < h ? 0 : Math.abs(o - n) < h ? 1 : 0 > (s - a) / (o - n) ? 2 : (s - a) / (o - n) > 0 ? 3 : 0
        },
        calcPlanScreenBounds: function(t) {
            var i = t[0],
                e = t[1],
                n = t[2],
                a = t[3],
                o = {
                    x: i,
                    y: e
                },
                s = {
                    x: n,
                    y: a
                },
                r = this.getPixelFromPoint(o),
                h = this.getPixelFromPoint(s);
            return [r.x, r.y, h.x, h.y]
        },
        highLightPlan: function(t, i, e) {
            this.clearHighLightStations(), this.clearHighLightLines(), this.clearSubwayPlanPopupWindow(), this.clearSearchStationPopupWindow();
            for (var n = 0, a = t.length; a > n; n++) {
                var o = t[n],
                    s = !0;
                this.plotHighLightLine(o, s), this.plotHighLightStations(o, s)
            }
            e.center ? (this.clearSubwayPlanStation(), this.addHighLightStartAndEnd(t)) : this.reHighLightStartAndEnd(), this.showSubwayPlanPopupWindow(t, i), e.center && this.centerSearchPlan(this.highLightLines)
        },
        centerSearchPlan: function(t) {
            if (t && t.length > 0) {
                var i = 1e6,
                    e = 1e6,
                    n = -1e6,
                    a = -1e6;
                t.forEach(function(t) {
                    var o = t.bounds;
                    o[0] < i && (i = o[0]), o[2] > n && (n = o[2]), o[1] < e && (e = o[1]), o[3] > a && (a = o[3])
                });
                var o = (i + n) / 2,
                    s = (e + a) / 2;
                this.moveToByAnimation(o, s)
            }
        },
        moveToByAnimation: function(t, i) {
            var e = this;
            e.centerAni && e.centerAni.stop();
            var n = e.deviceWidth,
                a = e.deviceHeight,
                o = e.getPointFromPixel({
                    x: n / 2,
                    y: a / 2
                }),
                s = t - o.x,
                h = i - o.y;
            e.centerAni = new r({
                duration: 200,
                fps: 60,
                render: function(t) {
                    try {
                        var i = o.x + s * t,
                            n = o.y + h * t;
                        e.center(i, n), listener.trigger("subway.popupwindow", "positionChange")
                    } catch (a) {
                        "undefined" != typeof alog && alog("exception.fire", "catch", {
                            msg: a.message || a.description,
                            path: "common:widget/com/Subway/renderer/SVGRenderer.js",
                            ln: 463
                        })
                    }
                },
                finish: function() {
                    e.centerAni = null
                },
                onStop: function() {
                    e.centerAni = null
                }
            })
        },
        showSubwayPlanPopupWindow: function(t, i) {
            for (var e = 10, n = t.screenBounds, a = 0, o = t.length; o > a; a++) {
                var s = t[a],
                    r = s.type;
                if (r === d) this.showFirstPopupWindow(s, n, e);
                else if (r === m) s.transferDistance = i[a - 1].distance, s.transferName = s.lineLabel, s.transferNameColor = s.lc, this.showMidPopupWindow(s, n, e);
                else if (r === g) {
                    s.totalTime = i[a].time, s.totalPrice = i[a].price;
                    var h = 1 === o ? 0 : a - 1;
                    s.transferDistance = i[h].distance, s.transferName = s.lineLabel, s.transferNameColor = s.lc, this.showLastPopupWindow(s, n, e)
                }
                e += 2
            }
        },
        delNoRelateLine: function(t, i) {
            for (var e = i.lineLabel, n = t.lines, a = n.length - 1; a >= 0; a--) - 1 === e.indexOf(n[a].name) && n.splice(a, 1)
        },
        showFirstPopupWindow: function(t, i, e) {
            var n = this,
                a = t.stations[0],
                o = a.uid,
                r = n.calcLineDir(t);
            n.loadStationDetail(o).then(function(a) {
                var o = n.parseStationData(a);
                if (o) {
                    n.delNoRelateLine(o, t);
                    var h = new s(n, {
                        popupType: c,
                        screenBounds: i,
                        zIndex: e,
                        lineDir: r
                    });
                    h.setData(o), n.subwayPlanPopupWindows.push(h)
                }
            })
        },
        showMidPopupWindow: function(t, i, e) {
            var n = this,
                a = t.stations[0],
                o = a.uid,
                r = n.calcLineDir(t),
                h = t.transferDistance,
                l = t.transferName,
                u = t.transferNameColor;
            n.loadStationDetail(o).then(function(a) {
                var o = n.parseStationData(a);
                if (o) {
                    n.delNoRelateLine(o, t);
                    var d = new s(n, {
                        popupType: c,
                        screenBounds: i,
                        zIndex: e,
                        lineDir: r
                    });
                    o.transferDistance = h, o.transferName = l, o.transferNameColor = u, d.setData(o), n.subwayPlanPopupWindows.push(d)
                }
            })
        },
        showLastPopupWindow: function(t, i, e) {
            var n = this,
                a = t.stations,
                o = a[0],
                r = o.uid,
                h = n.calcLineDir(t),
                l = t.totalTime,
                d = t.totalPrice,
                m = t.transferDistance,
                g = t.transferName,
                p = t.transferNameColor,
                v = e;
            n.loadStationDetail(r).then(function(e) {
                var a = n.parseStationData(e);
                if (a) {
                    n.delNoRelateLine(a, t);
                    var o = new s(n, {
                        popupType: c,
                        screenBounds: i,
                        zIndex: v,
                        lineDir: h
                    });
                    a.transferDistance = m, a.transferName = g, a.transferNameColor = p, o.setData(a), n.subwayPlanPopupWindows.push(o)
                }
            });
            var f = a.length - 1,
                y = a[f],
                w = y.uid,
                b = v + 1;
            n.loadStationDetail(w).then(function(e) {
                var a = n.parseStationData(e);
                if (a) {
                    n.delNoRelateLine(a, t);
                    var o = new s(n, {
                        popupType: u,
                        screenBounds: i,
                        zIndex: b,
                        lineDir: h
                    });
                    a.totalTime = l, a.totalPrice = d, o.setData(a), n.subwayPlanPopupWindows.push(o), T("#btnSubwayPlanCancel").on("click", function r() {
                        n.clearSearchPlan(), listener.trigger("com.subway", "clearsearch"), r = null
                    })
                }
            })
        },
        clearSubwayPlanPopupWindow: function() {
            if (this.subwayPlanPopupWindows) {
                for (var t = this.subwayPlanPopupWindows, i = t.length - 1; i >= 0; i--) t[i] && t[i].destroy();
                t.length = 0
            }
        },
        clearSearchStationPopupWindow: function() {
            this.searchStationPopupWindow && this.searchStationPopupWindow.destroy(), this.searchStation && this.searchStation.remove(), this.searchStationText && this.searchStationText.remove(), this.searchStationPopupWindow = null, this.searchStation = null, this.searchStationText = null
        },
        reHighLightStartAndEnd: function() {
            var t = this.context;
            this.subwayPlanStart && (this.subwayPlanStart.ele.remove(), this.subwayPlanStart.ele = t.image(this.resStart, 35, 56).move(this.subwayPlanStart.sx - 18, this.subwayPlanStart.sy - 56)), this.subwayPlanEnd && (this.subwayPlanEnd.ele.remove(), this.subwayPlanEnd.ele = t.image(this.resEnd, 35, 56).move(this.subwayPlanEnd.sx - 18, this.subwayPlanEnd.sy - 56))
        },
        addHighLightStartAndEnd: function(t) {
            if (t && t.length > 0) {
                var i = this.context,
                    e = t[0].stations,
                    n = t[t.length - 1].stations;
                if (e && n) {
                    var a = e[0],
                        o = n[n.length - 1],
                        s = i.image(this.resStart, 35, 56).move(a.x - 18, a.y - 56);
                    this.subwayPlanStart = {
                        uid: a.uid,
                        name: a.sid,
                        mcX: a.px,
                        mcY: a.py,
                        ele: s,
                        sx: a.x,
                        sy: a.y
                    };
                    var r = i.image(this.resEnd, 35, 56).move(o.x - 18, o.y - 56);
                    this.subwayPlanEnd = {
                        uid: o.uid,
                        name: o.sid,
                        mcX: o.px,
                        mcY: o.py,
                        ele: r,
                        sx: o.x,
                        sy: o.y
                    }
                }
            }
        },
        clearSubwayPlanStation: function() {
            this.subwayPlanStart && this.subwayPlanStart.ele.remove(), this.subwayPlanEnd && this.subwayPlanEnd.ele.remove(), this.subwayPlanStart = null, this.subwayPlanEnd = null
        },
        hideHoverPopupWindows: function() {
            var t = this;
            t.miniHoverPopupWindow && t.miniHoverPopupWindow.hide(), t.hoverPopupWindow && t.hoverPopupWindow.hide()
        },
        bindResizeEvt: function() {
            var t = this;
            t.bindResizeEvtOnce || (t.bindResizeEvtOnce = !0, window.onresize = function() {
                t.resizeHandler && clearTimeout(t.resizeHandler), t.resizeHandler = setTimeout(function() {
                    t.resize(), t.resizeHandler = null
                }, 200)
            })
        },
        searchStationInfo: function(t) {
            var i = this;
            i.loadStationDetail(t).then(function(t) {
                i.clearSearchPlan(), i.showMaskLayer();
                var e = i.parseStationData(t);
                if (e) {
                    i.searchStationPopupWindow || (i.searchStationPopupWindow = new s(i)), i.searchStationPopupWindow.setData(e);
                    var n = i.subwayData;
                    if (n.stationHash[e.station.sid]) {
                        var a = n.stationHash[e.station.sid],
                            o = !0,
                            r = i._plotStation(i.context, a, o);
                        i.searchStation = r.subwayStation, i.searchStationText = r.subwayStationText
                    }
                    var h = e.station.x,
                        l = e.station.y;
                    h && l && i.moveToByAnimation(h, l)
                }
            })
        },
        stationMouseOver: function(t) {
            var i = this;
            return t._parseData ? void(i.hoverPopupWindow && i.hoverPopupWindow.setData(t._parseData)) : (i.delayHandler && clearTimeout(i.delayHandler), void(i.delayHandler = setTimeout(function() {
                var e = t.getAttribute("uid");
                e && i.loadStationDetail(e).then(function(e) {
                    var n = i.parseStationData(e);
                    n && (t._parseData = n, i.hoverPopupWindow || (i.hoverPopupWindow = new s(i)), i.hoverPopupWindow.setData(n))
                }), i.delayHandler = null
            }, 200)))
        },
        lineMouseOver: function(t, i) {
            var e = this,
                n = t.getAttribute("lb") || "",
                a = t.getAttribute("stroke") || "";
            e.miniHoverPopupWindow || (e.miniHoverPopupWindow = new s(e, {
                popupType: l
            })), n && e.miniHoverPopupWindow.setData({
                lb: n,
                color: a,
                x: i.x,
                y: i.y
            })
        },
        parseStationData: function(t) {
            if (t && t.content && t.content.ext && t.content.ext.line_info && t.content.blinfo) {
                for (var i = t.content.ext.line_info, e = {}, n = 0, a = i.length; a > n; n++) {
                    var o = i[n].uid;
                    e[o] = i[n]
                }
                for (var s = [], r = t.content.blinfo, h = {}, n = 0, a = r.length; a > n; n++) {
                    var l = r[n],
                        o = l.uid;
                    if (!h[o]) {
                        h[o] = 1;
                        var c = e[o];
                        c && (l.color = c.clr, l.terminals = c.terminals, l.startTime = c.first_time, l.endTime = c.last_time, l.abb = c.abb), s.push(l)
                    }
                }
                for (var u = [], n = 0, a = s.length; a > n; n++) {
                    var d = s[n],
                        m = d.name,
                        g = m.split("-").reverse().join("-"),
                        p = !1;
                    if (/\(.*\)/gi.test(m) && (p = !0, m = d.addr, g = d.addr), !d.merged)
                        for (var v = n + 1; a > v; v++) {
                            var f = s[v],
                                y = p ? f.addr : f.name;
                            if (y === g) {
                                d.merged = !0, f.merged = !0;
                                var w = {
                                    name: d.abb,
                                    color: "#" + d.color.slice(2),
                                    dirs: [{
                                        name: d.terminals,
                                        startTime: d.startTime,
                                        endTime: d.endTime
                                    }, {
                                        name: f.terminals,
                                        startTime: f.startTime,
                                        endTime: f.endTime
                                    }]
                                };
                                u.push(w);
                                break
                            }
                        }
                }
                for (var n = 0, a = s.length; a > n; n++) {
                    var d = s[n];
                    if (!d.merged) {
                        d.merged = !0;
                        var w = {
                            name: d.abb,
                            color: "#" + d.color.slice(2),
                            dirs: [{
                                name: d.terminals,
                                startTime: d.startTime,
                                endTime: d.endTime
                            }]
                        };
                        u.push(w)
                    }
                }
                var b = t.content.name,
                    S = this.subwayData,
                    P = S.stationHash[b] || {},
                    x = {
                        lb: t.content.name,
                        uid: P.uid,
                        sid: P.sid,
                        x: P.x || 0,
                        y: P.y || 0,
                        link: "//map.baidu.com/?newmap=1&s=" + encodeURIComponent("inf&it=3&newmap=1&uid=" + P.uid)
                    },
                    L = this.parseGeo(t.content.geo).points;
                return {
                    station: x,
                    points: L,
                    lines: u
                }
            }
            return null
        },
        parseGeo: function(t) {
            if ("string" == typeof t) {
                var i = t.split("|"),
                    e = parseInt(i[0]),
                    n = i[1],
                    a = i[2],
                    o = a.split(";"),
                    s = [];
                switch (e) {
                    case 1:
                        s.push(o[0]);
                        break;
                    case 2:
                    case 3:
                        for (var r = 0; r < o.length - 1; r++) {
                            var h = o[r];
                            if (h.length > 100) h = h.replace(/(-?[1-9]\d*\.\d*|-?0\.\d*[1-9]\d*|-?0?\.0+|0|-?[1-9]\d*),(-?[1-9]\d*\.\d*|-?0\.\d*[1-9]\d*|-?0?\.0+|0|-?[1-9]\d*)(,)/g, "$1,$2;"), s.push(h);
                            else {
                                for (var l = [], c = h.split(","), u = 0; u < c.length; u += 2) {
                                    var d = c[u],
                                        m = c[u + 1];
                                    l.push(d + "," + m)
                                }
                                s.push(l.join(";"))
                            }
                        }
                }
                return s.length <= 1 && (s = s.toString()), {
                    type: e,
                    bound: n,
                    points: s
                }
            }
        },
        loadStationDetail: function(t) {
            var i = this,
                e = new Promise(function(e, n) {
                    var a = i.cityCode,
                        o = "/?qt=inf&newmap=1&it=3&ie=utf-8&f=[1,12,13]&c=" + a + "&m=sbw&ccode=" + a + "&uid=" + t;
                    T.jsonp(o, function(t) {
                        t ? e(t) : n()
                    })
                });
            return e
        },
        animation: function(t, i) {
            this.useAnimation || t(), window.requestAnimationFrame ? window.requestAnimationFrame(t) : (i = i || 20, window.setTimeout(t, i))
        },
        clear: function() {
            var t = this.context;
            t.clear(), this.maskLayer = null, this.clearSearchPlan()
        },
        plot: function() {
            this.clear(), this._plotSVG(), this._fitSVG()
        },
        _plotSVG: function(t, i, e) {
            var n = this.context,
                a = this.subwayData;
            this.orig_x = void 0 == t ? 0 : t, this.orig_y = void 0 == i ? 0 : i, e = e || this.scaleRatio, this._plotMap(n, a)
        },
        _plotMap: function(t, i) {
            var e = i.lines;
            t.rect(this.rectWidth, this.rectHeight).attr({
                fill: "none"
            });
            for (var n = 0; n < e.length; n++) {
                var a = e[n];
                this._plotLine(t, a)
            }
            this._plotStationsIndex = 0, this.animation(this._plotStations, 20)
        },
        _plotLine: function(t, i, e) {
            try {
                for (var n = ["M"], a = 1e6, o = 1e6, s = -1e6, r = -1e6, h = 0; h < i.stations.length; h++) {
                    var l = i.stations[h],
                        c = l.x,
                        u = l.y,
                        d = l.rc;
                    if (d) {
                        var m = i.stations[h - 1],
                            g = i.stations[h + 1],
                            p = m.x,
                            v = g.x,
                            f = m.y,
                            y = g.y,
                            w = 2 * c - (p + v) / 2,
                            b = 2 * u - (f + y) / 2;
                        h > 0 && n.push("Q"), n.push([w, b, v, y].join(","))
                    } else h > 0 && n.push("L"), n.push(c.toFixed(2) + "," + u.toFixed(2));
                    a > c && (a = c), c > s && (s = c), o > u && (o = u), u > r && (r = u)
                }
                i.loop && n.push("Z");
                var S = t.path(n.join(""), !0).attr({
                    fill: "none",
                    stroke: i.lc,
                    "stroke-width": e ? 12 : 8
                });
                if (!e) {
                    var P = t.text(i.lb).font({
                        size: 16,
                        weight: "bold"
                    }).fill({
                        color: i.lc
                    }).move(i.lbx, i.lby - 16);
                    S.attr({
                        eletype: 1,
                        lb: i.lb
                    })
                }
                var x = (a + s) / 2,
                    L = (o + r) / 2,
                    _ = {
                        x: x,
                        y: L
                    };
                return {
                    polyline: S,
                    polylineText: P,
                    boundCenter: _,
                    bounds: [a, o, s, r]
                }
            } catch (H) {
                "undefined" != typeof alog && alog("exception.fire", "catch", {
                    msg: H.message || H.description,
                    path: "common:widget/com/Subway/renderer/SVGRenderer.js",
                    ln: 1230
                })
            }
        },
        _plotStations: function() {
            var t = this.context,
                i = this.subwayData,
                e = this._plotStationsIndex,
                n = i.lines;
            if (!(e >= n.length)) {
                for (var a = n[e], o = 0; o < a.stations.length; o++) {
                    var s = a.stations[o];
                    this._plotStation(t, s)
                }
                this._plotStationsIndex++, this.animation(this._plotStations, 20)
            }
        },
        _plotStation: function(t, i, e) {
            var n, a;
            if (i.lb && i.slb || e) {
                if (i.icon) {
                    var o = i.icon.split(",");
                    n = t.image(this.resAirport, 32, 32).move(i.x + this._toInt(o[1]), i.y + this._toInt(o[2]))
                }
                n = i.ex ? t.image(this.resTransfer, 20, 20).move(i.x + i.trs_x, i.y + i.trs_y) : t.circle(13).fill({
                    color: "white"
                }).stroke({
                    color: i.lc,
                    width: 2.5
                }).move(i.x - 6.5, i.y - 6.5), n.attr({
                    eletype: 0,
                    uid: i.uid,
                    name: i.sid,
                    sx: i.x,
                    sy: i.y,
                    mcX: i.px,
                    mcY: i.py
                }), a = t.text(i.lb).font({
                    size: 16,
                    weight: "normal"
                }).fill({
                    color: "#000"
                }).move(i.x + i.rx, i.y + i.ry - 16)
            }
            return {
                subwayStation: n,
                subwayStationText: a
            }
        },
        zoomWithMousePosition: function(t, i, e) {
            t = t || this.deviceWidth / 2, i = i || this.deviceHeight / 2;
            var n = {
                    deltaX: t - this.deviceWidth / 2,
                    deltaY: i - this.deviceHeight / 2
                },
                a = this.getPointFromPixel(new o(t, i));
            void 0 != e ? this.zoom(a.x, a.y, e, n) : this.zoom(a.x, a.y, this.scaleRatio * this.zoomInRate, n)
        },
        zoomIn: function(t, i) {
            t = t || this.deviceWidth / 2, i = i || this.deviceHeight / 2;
            var e = this.getPointFromPixel(new o(t, i));
            this.zoom(e.x, e.y, this.scaleRatio * this.zoomInRate)
        },
        zoomOut: function(t, i) {
            t = t || this.deviceWidth / 2, i = i || this.deviceHeight / 2;
            var e = this.getPointFromPixel(new o(t, i));
            this.zoom(e.x, e.y, this.scaleRatio * this.zoomOutRate)
        },
        zoom: function(t, i, e, n) {
            var a = this.context;
            e = Math.max(Math.min(e, this.maxScaleRatio), this.minScaleRatio), a.scale(e, e), this.scaleRatio = e, this.center(t, i, n)
        },
        center: function(t, i, e) {
            var n = this.context;
            e ? n.move(this._toPixel(-t) + this.deviceWidth / 2 + e.deltaX, this._toPixel(-i) + this.deviceHeight / 2 + e.deltaY) : n.move(this._toPixel(-t) + this.deviceWidth / 2, this._toPixel(-i) + this.deviceHeight / 2), this.orig_x = n.x(), this.orig_y = n.y()
        },
        getOriginPoint: function() {
            return new o(this._toUnit(this.orig_x - this.deviceWidth / 2), this._toUnit(this.orig_y - this.deviceHeight / 2))
        },
        move: function(t, i) {
            this.context, this.orig_x + t, this.orig_y + i;
            this._setCSSTransform(t, i, 1)
        },
        moveTo: function(t, i) {
            var e = this.context;
            t = this._toPixel(t) + this.deviceWidth / 2, i = this._toPixel(i) + this.deviceHeight / 2, e.move(t, i), this.orig_x = t, this.orig_y = i, this._clearCSSTransform()
        },
        isOutOfBounds: function(t, i, e, n) {
            var a = t + this.getPointUnitFromPixelValue(e),
                o = i + this.getPointUnitFromPixelValue(n);
            return a > 0 || a < -this.mapWidth || o > 0 || o < -this.mapHeight ? {
                delta_x: this.getPixelValueFromPointUnit((a > 0 ? 0 : a < -this.mapWidth ? -this.mapWidth : a) - t),
                delta_y: this.getPixelValueFromPointUnit((o > 0 ? 0 : o < -this.mapHeight ? -this.mapHeight : o) - i)
            } : !1
        },
        resize: function() {
            var t = this.getPointFromPixel(new o(this.deviceWidth / 2, this.deviceHeight / 2)),
                i = this.scaleRatio;
            this.deviceWidth = this.$el.get(0).offsetWidth, this.deviceHeight = this.$el.get(0).offsetHeight, this.preSubwayPlanStart = null, this.preSubwayPlanEnd = null, this.subwayPlanStart && this.subwayPlanEnd && (this.preSubwayPlanStart = this.subwayPlanStart, this.preSubwayPlanEnd = this.subwayPlanEnd), this.preHighLightLineLid = null, this.highLightLineLid && (this.preHighLightLineLid = this.highLightLineLid), this.clear(), this.useAnimation = !1, this._plotSVG(), this.zoom(t.x, t.y, i), this.preSubwayPlanStart && this.preSubwayPlanEnd ? this.searchPlan(this.preSubwayPlanStart, this.preSubwayPlanEnd) : this.preHighLightLineLid && this.highLightSelectLine(this.preHighLightLineLid)
        },
        _fitSVG: function() {
            var t, i, e = this.deviceWidth > this.deviceHeight;
            e ? (t = this.mapHeight, i = this.deviceHeight) : (t = this.mapWidth, i = this.deviceWidth);
            for (var n, a, o = this.scaleRatio; t > i && (n = o * this.zoomOutRate, a = t * this.zoomOutRate, !(n < this.minScaleRatio));) o = n, t = a;
            this.context.scale(o, o).center(this.deviceWidth / 2, this.deviceHeight / 2), this.orig_x = this.context.x(), this.orig_y = this.context.y(), this.scaleRatio = o
        },
        _setCSSTransform: function(t, i, e) {
            (void 0 == t || void 0 == i) && (t = this.orig_x || 0, i = this.orig_y || 0), void 0 == e && (e = 1);
            var n = this._getTransformMatrix(t, i, e);
            this.svgRenderContainer.css({
                transform: n,
                "-webkit-transform": n
            })
        },
        _clearCSSTransform: function() {
            this._setCSSTransform(0, 0, 1)
        },
        _getTransformMatrix: function(t, i, e) {
            var n = [e, 0, 0, e, t, i];
            return "matrix(" + n.join(",") + ")"
        },
        getPointUnitFromPixelValue: function(t) {
            return this._toUnit(t)
        },
        getPixelValueFromPointUnit: function(t) {
            return this._toPixel(t)
        },
        getPointFromPixel: function(t) {
            var i = this.context,
                e = t.x,
                n = t.y,
                a = this._toInt(this._toUnit(e - i.x())),
                s = this._toInt(this._toUnit(n - i.y()));
            return new o(a, s)
        },
        getPixelFromPoint: function(t) {
            var i = this.context,
                e = t.x,
                n = t.y,
                a = this._toPixel(e) + i.x(),
                s = this._toPixel(n) + i.y();
            return new o(a, s)
        },
        isMaxScale: function() {
            return this.scaleRatio * this.zoomInRate > this.maxScaleRatio
        },
        isMinScale: function() {
            return this.scaleRatio * this.zoomOutRate < this.minScaleRatio
        },
        _toInt: function(t) {
            return t >> 0
        },
        _toUnit: function(t) {
            return t / this.scaleRatio
        },
        _toPixel: function(t) {
            return t * this.scaleRatio
        },
        showMaskLayer: function() {
            if (!this.maskLayer) {
                var t = 100,
                    i = this.context,
                    e = this.rectWidth + t,
                    n = this.rectHeight + t;
                this.maskLayer = i.rect(e, n).fill({
                    color: "white",
                    opacity: .9
                }), this.maskLayer.attr({
                    x: -t / 2,
                    y: -t / 2
                })
            }
            this.maskLayer.show()
        },
        hideMaskLayer: function() {
            this.maskLayer && this.maskLayer.hide()
        },
        plotHighLightLine: function(t, i) {
            try {
                i || this.clearHighLightLines();
                var e = this._plotLine(this.context, t, i);
                return this.highLightLines.push(e), e
            } catch (n) {
                "undefined" != typeof alog && alog("exception.fire", "catch", {
                    msg: n.message || n.description,
                    path: "common:widget/com/Subway/renderer/SVGRenderer.js",
                    ln: 1716
                })
            }
        },
        clearHighLightLines: function() {
            if (this.highLightLines && this.highLightLines.length > 0) {
                for (var t = 0, i = this.highLightLines.length; i > t; t++) {
                    var e = this.highLightLines[t];
                    e.polyline && e.polyline.remove(), e.polylineText && e.polylineText.remove()
                }
                this.highLightLines.length = 0
            }
            this.highLightLineLid = null
        },
        plotHighLightStations: function(t, i) {
            try {
                i || this.clearHighLightStations();
                for (var e = this.context, n = 0, a = t.stations.length; a > n; n++) {
                    var o = t.stations[n];
                    if (o.lb) {
                        if (o.icon) {
                            var s = o.icon.split(","),
                                r = e.image(this.resAirport, 32, 32).move(o.x + this._toInt(s[1]), o.y + this._toInt(s[2]));
                            this.highLightStations.push(r)
                        }
                        var h;
                        if (h = o.ex ? e.image(this.resTransfer, 20, 20).move(o.x + o.trs_x, o.y + o.trs_y) : e.circle(13).fill({
                                color: "white"
                            }).stroke({
                                color: o.lc,
                                width: 2.5
                            }).move(o.x - 6.5, o.y - 6.5), this.highLightStations.push(h), !i) {
                            h.attr({
                                eletype: 0,
                                uid: o.uid,
                                name: o.sid,
                                sx: o.x,
                                sy: o.y,
                                mcX: o.px,
                                mcY: o.py
                            });
                            var l = e.text(o.lb).font({
                                size: 16,
                                weight: "normal"
                            }).fill({
                                color: "#000"
                            }).move(o.x + o.rx, o.y + o.ry - 16);
                            this.highLightStations.push(l)
                        }
                    }
                }
            } catch (c) {
                "undefined" != typeof alog && alog("exception.fire", "catch", {
                    msg: c.message || c.description,
                    path: "common:widget/com/Subway/renderer/SVGRenderer.js",
                    ln: 1794
                })
            }
        },
        clearHighLightStations: function() {
            if (this.highLightStations && this.highLightStations.length > 0) {
                for (var t = this.highLightStations.length - 1; t >= 0; t--) this.highLightStations[t].remove();
                this.highLightStations = []
            }
        },
        setCursor: function(t) {
            this.$el.css({
                cursor: t
            })
        },
        bindMouseEvt: function() {
            var t = this;
            if (!t._bindMouseEvtOnce) {
                t._bindMouseEvtOnce = !0;
                var i = null,
                    e = null,
                    n = void 0,
                    a = void 0,
                    o = !1;
                T(document).on("mousedown", function(s) {
                    origin = t.getOriginPoint(), i = origin.x, e = origin.y, n = s.clientX, a = s.clientY, o = !0, t.isDrag = !1
                });
                var s = void 0,
                    r = void 0;
                T(document).on("mousemove", function(i) {
                    s = i.clientX, r = i.clientY, o && t.move(s - n, r - a)
                });
                var h = void 0,
                    l = void 0;
                T(document).on("mouseup", function(s) {
                    if (o = !1, null == i || null == e) return void t._clearCSSTransform();
                    h = s.clientX, l = s.clientY, deltaX = h - n, deltaY = l - a;
                    var r = i + t.getPointUnitFromPixelValue(deltaX),
                        c = e + t.getPointUnitFromPixelValue(deltaY);
                    t.moveTo(r, c), (Math.abs(deltaX) > 0 || Math.abs(deltaY) > 0) && (t.isDrag = !0), listener.trigger("subway.popupwindow", "positionChange"), i = null, e = null
                }), this.$el.on("mousewheel", function(i) {
                    var e = i.wheelDelta,
                        n = !1;
                    e > 0 && (n = !0), t.zoomWithAnimation(i.clientX, i.clientY, n)
                })
            }
        },
        zoomWithAnimation: function(t, i, e) {
            var n = this;
            t = t || n.deviceWidth / 2, i = i || n.deviceHeight / 2;
            var a = n.scaleRatio,
                o = n.scaleRate,
                s = a * (o - 1),
                h = n.minScaleRatio,
                l = n.maxScaleRatio;
            e || (s = -s), n.zoomAni || (n.zoomAni = new r({
                duration: 200,
                fps: 60,
                render: function(e) {
                    try {
                        var o = a + s * e;
                        o > h && l > o && (n.zoomWithMousePosition(t, i, o), listener.trigger("subway.popupwindow", "positionChange"))
                    } catch (r) {
                        "undefined" != typeof alog && alog("exception.fire", "catch", {
                            msg: r.message || r.description,
                            path: "common:widget/com/Subway/renderer/SVGRenderer.js",
                            ln: 1939
                        })
                    }
                },
                finish: function() {
                    n.zoomAni = null
                },
                onStop: function() {
                    n.zoomAni = null
                }
            }))
        },
        createLineMenu: function() {
            var t = this,
                i = document.createElement("div");
            i.className = "subway-menu";
            for (var e = this.subwayData, n = e.lines, a = [], o = 0, s = n.length; s > o; o++) {
                var r = n[o],
                    h = r.lb,
                    l = r.lid,
                    c = r.lc,
                    u = '<div class="subway-item" lid="' + l + '"><span class="subway-icon" style="background-color:' + c + '"></span><span class="subway-txt">' + h + "</span></div>";
                if (a.push(u), a.length >= 5) {
                    var d = document.createElement("div");
                    d.className = "subway-col", d.innerHTML = a.join(""), i.appendChild(d), a.length = 0
                }
            }
            if (a.length > 0) {
                var d = document.createElement("div");
                d.className = "subway-col", d.innerHTML = a.join(""), i.appendChild(d), a.length = 0
            }
            this.$el.append(i);
            var m = !1;
            T(".subway-menu").on("mouseenter", function() {
                m = !0
            }), T(".subway-menu").on("mouseleave", function() {
                m = !1
            }), T(".subway-menu").on("click", function(t) {
                t.stopPropagation()
            }), T(".subway-item").on("mouseover", function(i) {
                if (i.target && ("subway-item" === i.target.className || "subway-item" === i.target.parentNode.className)) {
                    var e = "";
                    e = "subway-item" === i.target.parentNode.className ? i.target.parentNode.getAttribute("lid") : i.target.getAttribute("lid"), e && (t.delaySelectLineHandler && clearTimeout(t.delaySelectLineHandler), t.delaySelectLineHandler = setTimeout(function() {
                        m && t.highLightSelectLine(e), t.delaySelectLineHandler = null
                    }, 200))
                }
            })
        },
        highLightSelectLine: function(t) {
            var i = this;
            i.moveAni && i.moveAni.stop(), i.hideHoverPopupWindows(), i.clearSearchPlan(), i.showMaskLayer();
            var e = i.findLineByLid(t),
                n = i.plotHighLightLine(e);
            i.plotHighLightStations(e), i.highLightLineLid = t;
            var a = i.deviceWidth,
                o = i.deviceHeight,
                s = i.getPointFromPixel({
                    x: a / 2,
                    y: o / 2
                }),
                h = n.boundCenter,
                l = h.x - s.x,
                c = h.y - s.y;
            i.moveAni = new r({
                duration: 200,
                fps: 60,
                render: function(t) {
                    try {
                        var e = s.x + l * t,
                            n = s.y + c * t;
                        i.center(e, n)
                    } catch (a) {
                        "undefined" != typeof alog && alog("exception.fire", "catch", {
                            msg: a.message || a.description,
                            path: "common:widget/com/Subway/renderer/SVGRenderer.js",
                            ln: 2065
                        })
                    }
                },
                finish: function() {
                    i.moveAni = null
                },
                onStop: function() {
                    i.moveAni = null
                }
            })
        },
        findLineByLid: function(t) {
            for (var i = this.subwayData, e = i.lines, n = 0, a = e.length; a > n; n++)
                if (e[n].lid === t) return e[n];
            return null
        },
        createZoomControl: function() {
            var t = this,
                i = document.createElement("div");
            i.className = "subway-zoomcontainer";
            var e = document.createElement("div");
            e.className = "subway-zoomin", e.innerHTML = '<div class="subway-zoomin-icon"></div>';
            var n = document.createElement("div");
            n.className = "subway-zoomout", n.innerHTML = '<div class="subway-zoomout-icon"></div>', i.appendChild(e), i.appendChild(n), this.$el.append(i), this.$el.find(".subway-zoomin").on("mouseover", function() {
                t.$el.find(".subway-zoomin-icon").css({
                    "background-position": "-20px 0"
                })
            }).on("mouseout", function() {
                t.$el.find(".subway-zoomin-icon").css({
                    "background-position": "0 0"
                })
            }).on("click", function(i) {
                i.stopPropagation(), t.zoomWithAnimation(null, null, !0)
            }), this.$el.find(".subway-zoomout").on("mouseover", function() {
                t.$el.find(".subway-zoomout-icon").css({
                    "background-position": "-30px 0"
                })
            }).on("mouseout", function() {
                t.$el.find(".subway-zoomout-icon").css({
                    "background-position": "-10px 0"
                })
            }).on("click", function(i) {
                i.stopPropagation(), t.zoomWithAnimation(null, null, !1)
            })
        }
    }), e.exports = n
});;
define("common:widget/com/Subway/subwayCfg.js", function(e, i, s) {
    var t = e("common:widget/ui/toast/toast.js");
    if (window.SUBWAYCITYLIST = {
            backup: "1",
            result: {
                type: "921",
                error: "0",
                subwayVersion: (new Date).getTime()
            },
            subways_city: {
                cities: [{
                    cn_name: "北京市",
                    cename: "beijing",
                    code: 131,
                    cpre: "bj"
                }]
            }
        }, window.SUBWAYCITYLIST && "1" === window.SUBWAYCITYLIST.backup) {
        var c = "/?qt=subwayscity&t=" + (new Date).getTime();
        baidu.ajax(c, {
            dataType: "json",
            method: "GET",
            async: !1,
            success: function(e) {
                e && e.result && e.subways_city.cities ? window.SUBWAYCITYLIST = e : t.show("暂时无法获取地铁信息！")
            },
            error: function() {
                t.show("暂时无法获取地铁信息！")
            }
        })
    }
    for (var n = window.SUBWAYCITYLIST.subways_city.cities, a = [], o = 0, r = n.length; r > o; o++) a[o] = {
        cname: n[o].cn_name,
        cename: n[o].cename,
        ccode: n[o].code,
        cpre: n[o].cename,
        cxfDis: n[o].cxfDis
    };
    var w = {
        subConfig: a,
        MapConfig: {
            baseUrl: "/",
            bsiUrl: "/?qt=bsi",
            infUrl: "/?qt=inf",
            btUrl: "/?qt=bt",
            sbwUrl: "/?qt=subways",
            bslUrl: "/?qt=bsl",
            ielem2Unfold: [],
            telem2Unfold: [],
            curCIndex: 0,
            cityCode: 131,
            cityName: "北京"
        },
        curConfig: {
            curSLines: [],
            curReqUrl: "",
            subwayData: []
        }
    };
    s.exports = w
});;
define("common:widget/com/Subway/SubwayUtil.js", function(e, n, a) {
    var i = e("common:widget/com/Subway/subwayCfg.js"),
        t = i.curConfig,
        d = i.MapConfig,
        f = i.subConfig,
        r = e("common:widget/ui/areaCfg/areaCfg.js"),
        x = {
            getStationInfo: function(e, n) {
                n = n || "";
                var a = {},
                    i = d.cityCode,
                    f = t.subwayData;
                if (!f || !f[i]) return a;
                var r, x, s, l, m = t.subwayData[i],
                    O = [];
                for (r = 0, s = m.length; s > r; r++)
                    for (O = m[r].stops, x = 0, l = O.length; l > x; x++)
                        if (O[x].name == e && 1 == O[x].is_practical) return a = O[x];
                return a
            },
            getCityIndex: function(e) {
                for (var n = 0, a = f.length; a > n; n++)
                    if (e == f[n].ccode) return n;
                return 0
            },
            getResForSvg: function() {
                var e, n, a = [],
                    i = 0,
                    r = t.curSLines,
                    x = 0;
                for (i = 0, l = r.length; l > i; i++) a[i] = {}, e = r[i].lname, n = f[d.curCIndex].cname, a[i].lid = n + "|" + e.replace(/\(.+-.+\)$/, ""), n.indexOf("上海") > -1 ? e.indexOf("10") > -1 ? a[i].lid = n + "|" + e : e.indexOf("11") > -1 && (a[i].lid = n + "|" + e) : n.indexOf("香港") > -1 ? e.indexOf("东铁") > -1 ? a[i].lid = n + "|" + e : e.indexOf("将军") > -1 && (a[i].lid = n + "|" + e) : n.indexOf("杭州") > -1 ? e.indexOf("1号线") > -1 && (a[i].lid = n + "|" + e) : n.indexOf("北京") > -1 ? e.indexOf("14号线") > -1 && (a[i].lid = n + "|" + e) : n.indexOf("台北") > -1 ? e.indexOf("中和新芦线") > -1 && (a[i].lid = n + "|" + e) : n.indexOf("深圳") > -1 ? (e.indexOf("罗宝") > -1 || e.indexOf("蛇口") > -1 || e.indexOf("龙岗") > -1 || e.indexOf("龙华") > -1 || e.indexOf("环中") > -1) && (e = e.replace(/\)\(.*-.*\)/i, ")"), a[i].lid = n + "|" + e) : n.indexOf("重庆") > -1 && e.indexOf("轨道交通3号线") > -1 && (e = e.replace(/\)\(.*-.*\)/i, ")"), a[i].lid = n + "|" + e), a[i].sid = a[i].lid + "|" + r[i].sname, a[i].eid = a[i].lid + "|" + r[i].ename, l - 1 > i ? a[i].time = r[i].wtime : (x = t.price, a[i].time = r[i].ttime, a[i].price = !isNaN(x) && x > 0 ? x : "_"), a[i].distance = r[i].distance, a[i].nid = a[i].lid + "|" + r[i].nname;
                return a
            },
            getSchemeIndex: function(e) {
                var n, a, i, t, d, f = -1;
                for (n = 0, i = e.length; i > n; n++)
                    if (e[n].stops && e[n].stops[0]) {
                        for (d = e[n].stops[0], f = n, a = 1, t = d.length - 1; t > a; a++)
                            if (d[a] && d[a].getOff.name != d[a].getOn.name) {
                                f = -1;
                                break
                            }
                        if (-1 != f) break
                    }
                return f
            },
            getLineNum: function(e) {
                var n, a = e.replace("地铁", "").replace(/\(.+\)$/, "");
                return a.match(/\d+/) && a.match(/\d+/).length > 0 && (n = a.match(/\d+/)), n = this.getLid(a)
            },
            getLid: function(e) {
                var n = "",
                    a = e.replace("地铁", "").replace(/\(.+\)$/, "");
                a.match(/\d+/) && a.match(/\d+/).length > 0 && (n = a.match(/\d+/)[0]);
                var i = parseInt(d.cityCode);
                switch (i) {
                    case parseInt(r["北京"]):
                        a.indexOf("八通") > -1 ? n = "8t" : a.indexOf("亦庄") > -1 ? n = "yz" : a.indexOf("昌平") > -1 ? n = "cp" : a.indexOf("房山") > -1 ? n = "fs" : a.indexOf("机场") > -1 ? n = "air" : a.indexOf("西郊") > -1 && (n = "xj");
                        break;
                    case parseInt(r["上海"]):
                        a.indexOf("磁悬浮") > -1 && (n = "cxf");
                        break;
                    case parseInt(r["广州"]):
                        a.indexOf("支线") > -1 || a.indexOf("北延段") > -1 ? n = "3zx" : a.indexOf("广佛") > -1 ? n = "gf" : a.indexOf("apm") > -1 && (n = "apm");
                        break;
                    case parseInt(r["深圳"]):
                        a.indexOf("罗宝") > -1 ? n = "lb" : a.indexOf("蛇口") > -1 ? n = "sk" : a.indexOf("龙岗") > -1 ? n = "lg" : a.indexOf("龙华") > -1 ? n = "lh" : a.indexOf("环中") > -1 && (n = "hz");
                        break;
                    case parseInt(r["香港特别行政区"]):
                        a.indexOf("荃湾") > -1 ? n = "qw" : a.indexOf("港岛") > -1 ? n = "gd" : a.indexOf("将军澳") > -1 ? n = "jja" : a.indexOf("迪士尼") > -1 ? n = "dsn" : a.indexOf("机场") > -1 ? n = "jc" : a.indexOf("东铁") > -1 ? n = "dt" : a.indexOf("西铁") > -1 ? n = "xt" : a.indexOf("马鞍山") > -1 ? n = "mas" : a.indexOf("观塘") > -1 ? n = "gt" : a.indexOf("东涌") > -1 && (n = "dy");
                        break;
                    case parseInt(r["南京"]):
                        a.indexOf("机场线") > -1 || a.match(/s1/i) && a.match(/s1/i).length > 0 ? n = "jch" : a.match(/s8/i) && a.match(/s8/i).length > 0 && (n = "s8");
                        break;
                    case parseInt(r["大连"]):
                        a.indexOf("九里线") > -1 ? n = "kg" : a.indexOf("保税区线") > -1 ? n = "bsq" : a.indexOf("九里支线") > -1 && (n = "9zx");
                        break;
                    case parseInt(r["佛山"]):
                        a.indexOf("广佛") > -1 && (n = "gf");
                        break;
                    case parseInt(r["重庆"]):
                        a.indexOf("国博") > -1 && (n = "gb");
                        break;
                    case parseInt(r["台北"]):
                        a.indexOf("淡水信义线") > -1 ? n = "danshui" : a.indexOf("中和新芦线") > -1 ? n = "zhonghe" : a.indexOf("板南线") > -1 ? n = "bannan" : a.indexOf("松山新店线") > -1 ? n = "songshan" : a.indexOf("文湖线") > -1 ? n = "wenhu" : a.indexOf("猫空缆车") > -1 ? n = "maokong" : a.indexOf("小碧潭线") > -1 ? n = "xiaobitan" : a.indexOf("新北投线") > -1 && (n = "xinbeitou");
                        break;
                    case parseInt(r["高雄"]):
                        a.indexOf("红线") > -1 ? n = "hx" : a.indexOf("橘线") > -1 && (n = "jx")
                }
                return n
            },
            calPrice: function(e, n) {
                n = n || {};
                var a = 0,
                    i = parseInt(d.cityCode),
                    x = t.curSLines;
                switch (i) {
                    case parseInt(r["北京"]):
                        a = parseInt(n.price / 100);
                        break;
                    case parseInt(r["上海"]):
                        for (var s = !1, l = 0, m = x.length; m > l; l++) x[l].lname.indexOf("磁悬浮") > -1 && (s = !0, e -= f[d.curCIndex].cxfDis);
                        e > 0 && 6e3 >= e ? a = 3 : e > 6e3 && (a = 3 + Math.ceil((e - 6e3) / 1e4)), a > 9 && (a = 9), s && (a += 50);
                        break;
                    case parseInt(r["广州"]):
                        e > 0 && 4e3 >= e ? a = 2 : e > 4e3 && 12e3 >= e ? a = 2 + Math.ceil((e - 4e3) / 4e3) : e > 12e3 && 24e3 >= e ? a = 4 + Math.ceil((e - 12e3) / 6e3) : e > 24e3 && (a = 6 + Math.ceil((e - 24e3) / 8e3));
                        break;
                    case parseInt(r["深圳"]):
                        e > 0 && 4e3 >= e ? a = 2 : e > 4e3 && 12e3 >= e ? a = 2 + Math.ceil((e - 4e3) / 4e3) : e > 12e3 && 24e3 >= e ? a = 4 + Math.ceil((e - 12e3) / 6e3) : e > 24e3 && (a = 6 + Math.ceil((e - 24e3) / 8e3));
                        break;
                    case parseInt(r["南京"]):
                        a = "_";
                        break;
                    default:
                        a = "_"
                }
                return a
            },
            handleBranchLines: function(e) {
                var n = d.curCIndex,
                    a = f[n],
                    i = a.cname,
                    t = e.lname,
                    r = i + "|" + t.replace(/\(.+\)$/, "") + "|";
                return i.indexOf("上海") > -1 ? t.indexOf("10号线") > -1 ? ("地铁10号线(航中路-新江湾城)" == t ? e.lname = "地铁10号线(新江湾城-航中路)" : "地铁10号线(虹桥火车站-新江湾城)" == e.lname && (e.lname = "地铁10号线(新江湾城-虹桥火车站)"), r = i + "|" + e.lname + "|") : t.indexOf("11号线") > -1 && ("地铁11号线(迪士尼-嘉定北)" === t ? e.lname = "地铁11号线(嘉定北-迪士尼)" : "地铁11号线(三林-花桥)" == t && (e.lname = "地铁11号线(花桥-三林)"), r = i + "|" + e.lname + "|") : i.indexOf("香港") > -1 ? t.indexOf("东铁线") > -1 ? ("东铁线(罗湖-红磡)" == t ? e.lname = "东铁线(红磡-罗湖)" : "东铁线(落马洲-红磡)" == t && (e.lname = "东铁线(红磡-落马洲)"), r = i + "|" + e.lname + "|") : t.indexOf("将军澳线") > -1 && ("将军澳线(宝琳-北角)" == t ? e.lname = "将军澳线(北角-宝琳)" : "将军澳线(康城-北角)" == t && (e.lname = "将军澳线(北角-康城)"), r = i + "|" + e.lname + "|") : i.indexOf("杭州") > -1 ? t.indexOf("1号线") > -1 && (t.indexOf("湘湖-临平") > -1 ? e.lname = "地铁1号线(临平-湘湖)" : t.indexOf("湘湖-下沙江滨") > -1 && (e.lname = "地铁1号线(下沙江滨-湘湖)"), r = i + "|" + e.lname + "|") : i.indexOf("北京") > -1 ? t.indexOf("14号线") > -1 && (t.indexOf("善各庄-北京南站") > -1 ? e.lname = "地铁14号线东段(北京南站-善各庄)" : t.indexOf("西局-张郭庄") > -1 && (e.lname = "地铁14号线西段(张郭庄-西局)"), r = i + "|" + e.lname + "|") : i.indexOf("台北") > -1 && e.lname.indexOf("中和新芦线") > -1 && (e.lname.indexOf("南势角-芦洲") > -1 ? e.lname = "中和新芦线(芦洲-南势角)" : e.lname.indexOf("南势角-回龙") > -1 && (e.lname = "中和新芦线(回龙-南势角)"), r = i + "|" + e.lname + "|"), r
            },
            setBranches: function(e) {
                var n = d.cityName,
                    a = e.name,
                    i = e.name.replace("地铁", "").replace(/\(.+\)$/, "");
                return n.indexOf("上海") > -1 ? a.indexOf("航中路") > -1 ? i = "10号线(航中路-新江湾城)" : a.indexOf("虹桥火车站") > -1 ? i = "10号线(新江湾城-虹桥火车站）" : a.indexOf("嘉定北") > -1 ? i = "11号线(嘉定北-康新公路)" : a.indexOf("花桥") > -1 && (i = "11号线(花桥-三林)") : n.indexOf("香港") > -1 ? a.indexOf("东铁") > -1 && a.indexOf("罗湖") > -1 ? i = "东铁线(红磡-罗湖)" : a.indexOf("落马洲") > -1 ? i = "东铁线(红磡-落马洲)" : a.indexOf("康城") > -1 ? i = "将军澳线(北角-康城)" : a.indexOf("宝琳") > -1 && (i = "将军澳线(北角-宝琳)") : n.indexOf("杭州") > -1 ? a.indexOf("临平") > -1 ? i = "1号线(临平-湘湖)" : a.indexOf("文泽路") > -1 && (i = "1号线(文泽路-湘湖)") : n.indexOf("北京") > -1 ? a.indexOf("14号线") > -1 && (a.indexOf("善各庄") > -1 ? i = "14号线(北京南站-善各庄)" : a.indexOf("张郭庄") > -1 && (i = "14号线(张郭庄-西局)")) : n.indexOf("台北") > -1 && a.indexOf("中和新芦线") > -1 && (a.indexOf("芦洲-南势角") > -1 ? i = "中和新芦线(芦洲-南势角)" : a.indexOf("南势角-回龙") > -1 && (i = "中和新芦线(回龙-南势角)")), i
            },
            setBranchStations: function(e, n) {
                var a = d.cityName;
                return a.indexOf("上海") > -1 ? "新江湾城-航中路" == e.name || "航中路-新江湾城" == e.name ? n += "(新江湾城-航中路)" : "新江湾城-虹桥火车站" == e.name || "虹桥火车站-新江湾城" == e.name ? n += "(新江湾城-虹桥火车站)" : "康新公路-嘉定北" === e.name || "嘉定北-康新公路" === e.name ? n += "(嘉定北-康新公路)" : "三林-花桥" == e.name || "花桥-三林" == e.name ? n += "(花桥-三林)" : ("体育西路-机场南" == e.name || "机场南-体育西路" == e.name) && (n = "地铁3号线北延段") : a.indexOf("香港") > -1 ? "罗湖-红磡" == e.name || "红磡-罗湖" == e.name ? n += "(红磡-罗湖)" : "落马洲-红磡" == e.name || "红磡-落马洲" == e.name ? n += "(红磡-落马洲)" : "宝琳-北角" == e.name || "北角-宝琳" == e.name ? n += "(北角-宝琳)" : ("康城-北角" == e.name || "北角-康城" == e.name) && (n += "(北角-康城)") : a.indexOf("杭州") > -1 ? "湘湖-临平" == e.name || "临平-湘湖" == e.name ? n += "(临平-湘湖)" : ("湘湖-文泽路" == e.name || "文泽路-湘湖" == e.name) && (n += "(文泽路-湘湖)") : a.indexOf("北京") > -1 ? "善各庄-北京南站" === e.name || "北京南站-善各庄" === e.name ? n += "(北京南站-善各庄)" : ("西局-张郭庄" === e.name || "张郭庄-西局" === e.name) && (n += "(张郭庄-西局)") : a.indexOf("台北") > -1 && ("芦洲-南势角" == e.name || "南势角-芦洲" == e.name ? n += "(芦洲-南势角)" : ("回龙-南势角" == e.name || "南势角-回龙" == e.name) && (n += "(回龙-南势角)")), n
            },
            parseData: function(e) {
                if (!e || 0 !== e.result.error) return null;
                var n = {
                        left: Number.POSITIVE_INFINITY,
                        right: Number.NEGATIVE_INFINITY,
                        top: Number.POSITIVE_INFINITY,
                        bottom: Number.NEGATIVE_INFINITY
                    },
                    a = {},
                    i = e.subways.sw_xmlattr,
                    t = e.subways.l,
                    d = 1.1,
                    f = 1.3,
                    r = {};
                r.fullName = i.cid, r.shortName = i.c, r.lines_number = i.n, r.lines = [];
                for (var x = 0, s = t.length; s > x; x++) {
                    var l = r.lines[x] = {};
                    $.extend(l, t[x].l_xmlattr), l.stations = [], l.lbx = l.lbx * f, l.lby = l.lby * f + 15 * f, l.lc = "#" + l.lc.slice(2);
                    for (var m = 0, O = t[x].p.length; O > m; m++) {
                        var c = l.stations[m] = {};
                        $.extend(c, t[x].p[m].p_xmlattr), c.lid = t[x].l_xmlattr.lid, c.x = c.x * f, c.y = c.y * f, c.rx = c.rx * f + 2 * f, c.ry = c.ry * f + 12 * f, c.dx = parseFloat(c.dx || 0) * f, c.dy = parseFloat(c.dy || 0) * f, c.trs_x = 0, c.trs_y = 0, c.trs_x -= 8 * f, c.trs_y -= 8 * f;
                        var o = c.sid,
                            h = c.slb;
                        c.x < n.left && (n.left = c.x), c.x > n.right && (n.right = c.x), c.y < n.top && (n.top = c.y), c.y > n.bottom && (n.bottom = c.y), h === !0 && (a[o] === !0 ? r.lines[x].stations[m].slb = !1 : a[o] = !0)
                    }
                }
                var u = r.lines,
                    p = n.left * d >> 0,
                    b = n.top * d >> 0;
                r.stationHash = {}, r.lineHash = {};
                for (var g = 0, I = u.length; I > g; g++) {
                    var y = u[g];
                    for (y.lbx -= p, y.lby -= b, y.lid && !r.lineHash[y.lid] && (r.lineHash[y.lid] = y), x = 0, s = y.stations.length; s > x; x++) {
                        var v = y.stations[x];
                        v.x -= p, v.y -= b, v.lc = y.lc, v.sid && !r.stationHash[v.sid] && (r.stationHash[v.sid] = v)
                    }
                }
                return r.bounds = n, r.width = Math.abs(n.left - n.right) * d >> 0, r.height = Math.abs(n.bottom - n.top) * d >> 0, r.imageDataEncoded = this.imageDataEncoded, r
            }
        };
    a.exports = x
});;
define("common:widget/com/Subway/Subway.js", function(require, exports, module) {
    function Subway(i) {
        this.opts = i || {}, this.cInfo = this.opts.cInfo || {
            ccode: modelConfig.cityCode,
            cname: modelConfig.cityName
        }, this.lineQuery = this.opts.lineQuery || "", T.lang.Class.call(this, this.opts), this.bindListeners()
    }
    var AID = require("common:widget/ui/areaCfg/areaCfg.js"),
        SVG = require("common:widget/com/Subway/renderer/SVG.js"),
        SVGRenderer = require("common:widget/com/Subway/renderer/SVGRenderer.js"),
        config = require("common:widget/ui/config/config.js"),
        cardMgr = require("common:widget/ui/card/cardMgr.js"),
        sbwUtil = require("common:widget/com/Subway/SubwayUtil.js"),
        MetroCfg = require("common:widget/com/Subway/subwayCfg.js"),
        operateMediator = require("common:widget/ui/operateMediator/operateMediator.js"),
        toast = require("common:widget/ui/toast/toast.js"),
        searchbox = require("common:widget/ui/searchBox/searchBox.js"),
        eventProxy = window.listener,
        modelConfig = config.modelConfig,
        curConfig = MetroCfg.curConfig,
        MapConfig = MetroCfg.MapConfig,
        subConfig = MetroCfg.subConfig;
    require.loadCss({
        content: '@charset "UTF-8";.pc #subway_search_box,.pc #subway_search_box input,.pc #sbw_main{font-family:Arial,Helvetica,"Microsoft YaHei",sans-serif}#route_header .station-tab .border-line{border:0}#sbw_main .transfer-tab{width:162px}#sbw_main .station-tab{width:159px}#station_search_box{display:none}#sub_search_box .end input{border:0}#station_search_box .route-input-box{height:81px}#station_search_box .route-input-box{width:auto}#station_search_box .route-input{margin-left:48px}#station_input{border-bottom:0}#trans-sty{margin:10px 0;height:35px;text-align:center}#trans-sty .sty-tag{display:inline-block;box-sizing:border-box;width:50%;height:35px;line-height:35px;border-left:1px solid #e4e6e7;border-top:1px solid #e4e6e7;border-bottom:1px solid #e4e6e7;text-align:center;cursor:pointer}#trans-sty .less-exchange{border-right:1px solid #e4e6e7}#trans-sty .selected{background:#f0f2f5;cursor:default}#sbw_top{height:66px;background:url(//webmap1.bdimg.com/wolfman/static/common/images/subways/ditieimgs_b19dbdf.gif) repeat-x 0 0;position:relative;-moz-user-select:none}#selCity_subway{display:block;position:absolute;z-index:100;left:465px;top:20px;height:34px;line-height:34px;box-shadow:1px 2px 1px rgba(0,0,0,.15);background:#fff;color:#333;text-align:center;cursor:pointer;padding:0 10px}#selCity_subway .arrow-flag{display:inline-block;width:11px;height:9px;cursor:pointer}#selCity_subway .down{background:url(//webmap0.bdimg.com/wolfman/static/common/images/subways/arrow-flag-down_0a8dd90.png)}#selCity_subway .up{background:url(//webmap0.bdimg.com/wolfman/static/common/images/subways/arrow-flag-up_9967c48.png)}#sbw_main{position:relative;width:100%;overflow:hidden}#sbw_map{height:100%;width:100%;overflow:hidden;position:absolute;left:0;top:0;background:#fff}#sbw_map .long-title{width:110px}.tipsInfo{padding:10px;line-height:20px}#sbw_panel{width:100%;border-right:1px solid #ccc;position:absolute;left:0}#sel_sta{background:#e9e9e9;border-bottom:1px solid #c7c7c7;height:98px;border-top:1px solid #e9e9e9}#sbw_panel .title{font-weight:700;font-size:14px}#sel_sta table{margin:7px 0 0 21px;width:228px}#end_sta,#start_sta{padding:2px 4px;width:130px;height:17px;line-height:17px;border:1px solid #a3a3a3}#sel_sta td{height:29px}#trans_sub{width:109px;height:29px;background:url(//webmap1.bdimg.com/wolfman/static/common/images/subways/ditieimgs_b19dbdf.gif) no-repeat 0 -94px;border:0;cursor:pointer}#trans_stra{height:26px;background:url(//webmap1.bdimg.com/wolfman/static/common/images/subways/sbw_stra_bg_5ee4b2e.gif) repeat-x 0 0;margin-top:1px;padding-top:3px;white-space:nowrap}#trans_stra strong{margin-left:20px}#trans_stra span{margin-left:40px}#trans_description{margin:0}#trans_description table{width:100%}#routes_detail{zoom:1}#routes_detail td{padding-left:5px;line-height:20px}#routes_detail{margin:8px 0;border:0}th.stop_name{background:#f8f8f8;text-align:left;padding:3px 5px;line-height:15px;font-size:14px}th.ldot{width:17px}#btn_uf{background:url(//webmap1.bdimg.com/wolfman/static/common/images/subways/sbw_btn_unf_0ba965d.gif) no-repeat;width:70px;height:21px;border:0;cursor:pointer}#btn_uf.fold{background-position:0 -21px}.dis_time{color:#989898;font-size:12px}#routes_detail table{border-spacing:0;border-collapse:collapse}#routes_detail td.lvl,#routes_detail th.ldot{padding:0;overflow:hidden}#routes_detail th.dtime_col,#routes_detail td.dtime_col{font-size:12px;font-weight:400;text-align:right;color:#989898;padding-right:10px;width:50px}.seg_ttime{color:#000}#trans_description{overflow:hidden}#trans_description table.d_stop_time{display:none;color:#989898;margin:0;padding:0;width:200px}#trans_description table.d_stop_time td{height:17px;padding:0;line-height:22px;font-size:12px}table.d_stop_time td.dstop{width:145px}#trans_description table.d_stop_time td.dtime{text-align:right;padding-right:5px}#routes_detail{position:relative;overflow-x:hidden;overflow-y:hidden}#routes_detail th.dtime_col span{font-size:12px;display:none}#routes_detail th.dtime_col{background:#f8f8f8}#rinfo{border-top:1px solid #d7d7d7;overflow:hidden;margin:10px 0;padding:5px 0}.ie6 #rinfo,.ie7 #rinfo,.ie8 #rinfo{padding-left:3px;width:230px}#rinfo span{font-weight:700;color:#fe6215}.ie6 #rinfo span,.ie7 #rinfo span,.ie8 #rinfo span{font-size:11px}#rinfo span.vl{color:#b5b5b5;font-weight:400;padding:0 3px}label.selected{font-weight:700}.sbw-tips{padding:15px 0 10px;line-height:1.4em;color:gray}.pc .sbw-sug td{font-family:Arial,Helvetica,"Microsoft YaHei",sans-serif}.sbw-sug{border:1px solid #a3a3a3;position:absolute;-moz-user-select:none}.sbw-sug td{height:18px;line-height:18px;padding:1px 2px 1px 4px}.sbw-sug .sbw-mo{background-color:#f7f7f7}.sbw-sug .sbw-mo span{color:#fff}.sbw-sug .sbw-ml{background-color:#fff;color:#000}.sbw-sug .sugtip{background-color:#fff;color:#666;width:110px;position:absolute;padding:1px 4px;border:1px solid #a3a3a3}.sbw-sug .sugtip2{background-color:#fff;color:#666;width:216px;position:absolute;padding:1px 4px;border:1px solid #a3a3a3}#sel_type{margin-left:-5px}#sel_type label{display:inline-block;width:85px}#sel_sta{padding:10px 18px;color:#4c4c4c}#routeSC,#siteSC{margin-top:8px}.sel_btn{margin-top:10px;text-align:center}#routeSC span{margin:0 5px}.inputBox{height:20px;padding:5px 0;_padding:0}#oneSite{padding:2px 4px;width:292px;height:17px;line-height:17px;border:1px solid #a3a3a3}#siteLine{height:26px;margin-top:1px;padding-top:3px;white-space:nowrap;line-height:26px;padding-left:15px}.bold{font-weight:700}.siteTabl{width:100%}.siteTabl td{height:20px;line-height:20px;padding:2px 0}.siteTabl .trBg td{background-color:#f8f8f8;height:20px;line-height:20px}.siteTabl .td_1{width:120px;padding-left:15px}.siteTabl .td_2{text-align:center;padding-left:3px;padding-right:3px}.siteTabl .td_3{width:60px;text-align:center;padding-left:3px;padding-right:3px}.c9e9e9e{color:#9e9e9e}#routesS,#siteS{vertical-align:-2px;_vertical-align:0}#curCity{border-bottom:1px solid #CCC;margin-bottom:10px;margin:auto 5px;line-height:40px}.city_cont{margin:15px 10px 10px;padding:0;overflow:hidden}.city_cont a{text-decoration:none;float:left;display:block;white-space:nowrap;margin-right:8px;line-height:22px}.city_cont a:hover{color:#3d6dcc;text-decoration:underline}div.dot_c{width:17px;height:23px;position:relative;overflow:hidden}div.ldot{background:url(//webmap1.bdimg.com/wolfman/static/common/images/subways/ldot_74e556d.gif) no-repeat;width:15px;height:14px;position:absolute;top:3px;left:0;z-index:2}div.lvl{width:20px;position:absolute;z-index:1;height:100%;left:0}div.fst{top:7px}div.lst{bottom:7px}div.lvl,td.lvl{background:url(//webmap0.bdimg.com/wolfman/static/common/images/subways/lvls_ae3733a.gif) repeat-y}.card{}.card div.ln{background-position:2px -239px}.card .beijing .rn_1{color:#c00}.card .beijing .rn_2{color:#06c}.card .beijing .rn_4{color:#00b2a5}.card .beijing .rn_5{color:#906}.card .beijing .rn_6{color:#EA9914}.card .beijing .rn_7{color:#e7600e}.card .beijing .rn_8{color:#063}.card .beijing .rn_9{color:#AECC16}.card .beijing .rn_10{color:#09f}.card .beijing .rn_13{color:#fc3}.card .beijing .rn_8t{color:#c00}.card .beijing .rn_air{color:#b699bd}.card .beijing .rn_yz{color:#ff3806}.card .beijing .rn_fs{color:#d73544}.card .beijing .rn_cp{color:#c40085}.card .beijing .rn_dx{color:#00b2a5}.card .beijing .rn_15{color:#5c2a69}.card .beijing .rn_14{color:#d39188}.card .beijing div.l1{background-position:0 0}.card .beijing div.l2{background-position:0 -30px}.card .beijing div.l4{background-position:0 -270px}.card .beijing div.l5{background-position:0 -60px}.card .beijing div.l6{background-position:0 -429px}.card .beijing div.l7{background-position:-42px -672px}.card .beijing div.l8{background-position:0 -90px}.card .beijing div.l9{background-position:0 -301px}.card .beijing div.l10{background-position:0 -120px}.card .beijing div.l13{background-position:0 -150px}.card .beijing div.l8t{background-position:0 -180px}.card .beijing div.lair{background-position:0 -210px}.card .beijing div.lyz{background-position:-40px -240px}.card .beijing div.lfs{background-position:-40px -210px}.card .beijing div.lcp{background-position:-40px -300px}.card .beijing div.ldx{background-position:0 -270px}.card .beijing div.l15{background-position:-41px -429px}.card .beijing div.l14{background-position:-21px -744px}.card .beijing div.lvl1,.card .beijing td.lvl1{background-position:0 0}.card .beijing div.lvl2,.card .beijing td.lvl2{background-position:-15px 0}.card .beijing div.lvl5,.card .beijing td.lvl5{background-position:-30px 0}.card .beijing div.lvl6,.card .beijing td.lvl6{background-position:-671px 0}.card .beijing div.lvl7,.card .beijing td.lvl7{background-position:-1227px 0}.card .beijing div.lvl8,.card .beijing td.lvl8{background-position:-45px 0}.card .beijing div.lvl9,.card .beijing td.lvl9{background-position:-591px 0}.card .beijing div.lvl10,.card .beijing td.lvl10{background-position:-60px 0}.card .beijing div.lvl13,.card .beijing td.lvl13{background-position:-75px 0}.card .beijing div.lvl8t,.card .beijing td.lvl8t{background-position:-90px 0}.card .beijing div.lvlair,.card .beijing td.lvlair{background-position:-105px 0}.card .beijing div.lvl4,.card .beijing td.lvl4{background-position:-120px 0}.card .beijing div.lvlyz,.card .beijing td.lvlyz{background-position:-521px 0}.card .beijing div.lvlfs,.card .beijing td.lvlfs{background-position:-507px 0}.card .beijing div.lvlcp,.card .beijing td.lvlcp{background-position:-548px 0}.card .beijing div.lvldx,.card .beijing td.lvldx{background-position:-120px 0}.card .beijing div.lvl15,.card .beijing td.lvl15{background-position:-1257px 0}.card .beijing div.lvl14,.card .beijing td.lvl14{background-position:-1059px 0}.card .shanghai .rn_1{color:#c00}.card .shanghai .rn_2{color:#090}.card .shanghai .rn_3{color:#f9e103}.card .shanghai .rn_4{color:#606}.card .shanghai .rn_5{color:#c0c}.card .shanghai .rn_6{color:#ff3265}.card .shanghai .rn_7{color:#FF7F00}.card .shanghai .rn_8{color:#06c}.card .shanghai .rn_9{color:#95d3db}.card .shanghai .rn_10{color:#c9a7d5}.card .shanghai .rn_11{color:maroon}.card .shanghai .rn_13{color:#e290b6}.card .shanghai .rn_cxf{color:#b5b5b5}.card .shanghai .rn_12{color:#017b60}.card .shanghai .rn_16{color:#71dad6}.card .shanghai div.l1{background-position:-20px 0}.card .shanghai div.l2{background-position:-20px -30px}.card .shanghai div.l3{background-position:-20px -60px}.card .shanghai div.l4{background-position:-20px -90px}.card .shanghai div.l5{background-position:-20px -120px}.card .shanghai div.l6{background-position:-20px -150px}.card .shanghai div.l8{background-position:-20px -180px}.card .shanghai div.l9{background-position:-20px -210px}.card .shanghai div.lcxf{background-position:-20px -240px}.card .shanghai div.l7{background-position:-20px -270px}.card .shanghai div.l11{background-position:-20px -300px}.card .shanghai div.l13{background-position:-20px -330px}.card .shanghai div.l10{background-position:-20px -360px}.card .shanghai div.l12{background-position:0 -90px}.card .shanghai div.l16{background-position:0 -270px}.card .shanghai div.lvl1,.card .shanghai td.lvl1{background-position:-200px 0}.card .shanghai div.lvl2,.card .shanghai td.lvl2{background-position:-215px 0}.card .shanghai div.lvl3,.card .shanghai td.lvl3{background-position:-230px 0}.card .shanghai div.lvl4,.card .shanghai td.lvl4{background-position:-245px 0}.card .shanghai div.lvl5,.card .shanghai td.lvl5{background-position:-260px 0}.card .shanghai div.lvl6,.card .shanghai td.lvl6{background-position:-275px 0}.card .shanghai div.lvl8,.card .shanghai td.lvl8{background-position:-290px 0}.card .shanghai div.lvl9,.card .shanghai td.lvl9{background-position:-305px 0}.card .shanghai div.lvlcxf,.card .shanghai td.lvlcxf{background-position:-320px 0}.card .shanghai div.lvl7,.card .shanghai td.lvl7{background-position:-335px 0}.card .shanghai div.lvl11,.card .shanghai td.lvl11{background-position:-350px 0}.card .shanghai div.lvl13,.card .shanghai td.lvl13{background-position:-365px 0}.card .shanghai div.lvl10,.card .shanghai td.lvl10{background-position:-380px 0}.card .shanghai div.lvl12,.card .shanghai td.lvl12{background-position:-45px 0}.card .shanghai div.lvl16,.card .shanghai td.lvl16{background-position:-120px 0}.card .guangzhou .rn_1{color:#f9e103}.card .guangzhou .rn_2{color:#06c}.card .guangzhou .rn_3{color:#ea6632}.card .guangzhou .rn_4{color:#090}.card .guangzhou .rn_5{color:red}.card .guangzhou .rn_8{color:#0095B3}.card .guangzhou .rn_gf{color:#b4cc3d}.card .guangzhou .rn_apm{color:#00a1cb}.card .guangzhou .rn_3zx{color:#ea6632}.card .guangzhou .rn_6{color:#8c0753}.card .guangzhou div.l1{background-position:-40px 0}.card .guangzhou div.l2{background-position:-40px -30px}.card .guangzhou div.l3{background-position:-40px -60px}.card .guangzhou div.l4{background-position:-40px -90px}.card .guangzhou div.l5{background-position:-40px -120px}.card .guangzhou div.l8{background-position:-40px -150px}.card .guangzhou div.lgf{background-position:-40px -180px}.card .guangzhou div.lapm{background-position:-39px -360px}.card .guangzhou div.l3zx{background-position:-40px -60px}.card .guangzhou div.l6{background-position:0 -60px}.card .guangzhou div.lvl1,.card .guangzhou td.lvl1{background-position:-400px 0}.card .guangzhou div.lvl2,.card .guangzhou td.lvl2{background-position:-415px 0}.card .guangzhou div.lvl3,.card .guangzhou td.lvl3{background-position:-430px 0}.card .guangzhou div.lvl4,.card .guangzhou td.lvl4{background-position:-445px 0}.card .guangzhou div.lvl5,.card .guangzhou td.lvl5{background-position:-461px 0}.card .guangzhou div.lvl8,.card .guangzhou td.lvl8{background-position:-477px 0}.card .guangzhou div.lvlgf,.card .guangzhou td.lvlgf{background-position:-492px 0}.card .guangzhou div.lvl3zx,.card .guangzhou td.lvl3zx{background-position:-430px 0}.card .guangzhou div.lvlapm,.card .guangzhou td.lvlapm{background-position:-575px 0}.card .guangzhou div.lvl6,.card .guangzhou td.lvl6{background-position:-30px 0}.card .shenzhen .rn_lb{color:#2dc428}.card .shenzhen .rn_sk{color:#fb3}.card .shenzhen .rn_lg{color:#3d6dcc}.card .shenzhen .rn_lh{color:#d63542}.card .shenzhen .rn_hz{color:#6C056C}.card .shenzhen div.llb{background-position:-40px -90px}.card .shenzhen div.lsk{background-position:0 -150px}.card .shenzhen div.llg{background-position:0 -120px}.card .shenzhen div.llh{background-position:-20px 0}.card .shenzhen div.lhz{background-position:-20px -90px}.card .shenzhen div.lvllg,.card .shenzhen td.lvllg{background-position:-60px 0}.card .shenzhen div.lvllb,.card .shenzhen td.lvllb{background-position:-445px 0}.card .shenzhen div.lvlsk,.card .shenzhen td.lvlsk{background-position:-75px 0}.card .shenzhen div.lvllh,.card .shenzhen td.lvllh{background-position:-200px 0}.card .shenzhen div.lvlhz,.card .shenzhen td.lvlhz{background-position:-245px 0}.card .hongkong .rn_qw{color:#da3f35}.card .hongkong .rn_gd{color:#528fcc}.card .hongkong .rn_jja{color:#9174b4}.card .hongkong .rn_dsn{color:#cf89bb}.card .hongkong .rn_jc{color:#0bc}.card .hongkong .rn_dt{color:#78bdee}.card .hongkong .rn_xt{color:#992e87}.card .hongkong .rn_mas{color:#9e562b}.card .hongkong .rn_gt{color:#2b9b2f}.card .hongkong .rn_dy{color:#ea9914}.card .hongkong div.lgt{background-position:-40px -90px}.card .hongkong div.ldy{background-position:0 -150px}.card .hongkong div.ldt{background-position:0 -120px}.card .hongkong div.lgd{background-position:-40px -30px}.card .hongkong div.lxt{background-position:-20px -90px}.card .hongkong div.ldsn{background-position:0 -210px}.card .hongkong div.ljc{background-position:0 -330px}.card .hongkong div.lmas{background-position:0 -361px}.card .hongkong div.ljja{background-position:0 -397px}.card .hongkong div.ldy{background-position:0 -429px}.card .hongkong div.lvldt,.card .hongkong td.lvldt{background-position:-60px 0}.card .hongkong div.lvlgt,.card .hongkong td.lvlgt{background-position:-445px 0}.card .hongkong div.lvlqw,.card .hongkong td.lvlqw{background-position:-200px 0}.card .hongkong div.lvlxt,.card .hongkong td.lvlxt{background-position:-245px 0}.card .hongkong div.lvldy,.card .hongkong td.lvldy{background-position:-671px 0}.card .hongkong div.lvlgd,.card .hongkong td.lvlgd{background-position:-415px 0}.card .hongkong div.lvldsn,.card .hongkong td.lvldsn{background-position:-105px 0}.card .hongkong div.lvljc,.card .hongkong td.lvljc{background-position:-607px 0}.card .hongkong div.lvlmas,.card .hongkong td.lvlmas{background-position:-626px 0}.card .hongkong div.lvljja,.card .hongkong td.lvljja{background-position:-650px 0}.card .nanjing .rn_1{color:#5cb8e5}.card .nanjing .rn_2{color:#d63542}.card .nanjing .rn_3{color:#4c9a46}.card .nanjing .rn_1ny{color:#5cb8e5}.card .nanjing .rn_10{color:#ac8756}.card .nanjing .rn_jch{color:#268484}.card .nanjing .rn_s8{color:#e75e00}.card .nanjing div.l1{background-position:0 -456px}.card .nanjing div.l2{background-position:-21px -456px}.card .nanjing div.l3{background-position:-43px -806px}.card .nanjing div.l1ny{background-position:0 -456px}.card .nanjing div.l10{background-position:-41px -576px}.card .nanjing div.ljch{background-position:-41px -623px}.card .nanjing div.ls8{background-position:-20px -270px}.card .nanjing div.lvl1,.card .nanjing td.lvl1{background-position:-686px 0}.card .nanjing div.lvl2,.card .nanjing td.lvl2{background-position:-701px 0}.card .nanjing div.lvl3,.card .nanjing td.lvl3{background-position:-215px 0}.card .nanjing div.lvl1ny,.card .nanjing td.lvl1ny{background-position:-686px 0}.card .nanjing div.lvl10,.card .nanjing td.lvl10{background-position:-1187px 0}.card .nanjing div.lvljch,.card .nanjing td.lvljch{background-position:-1201px 0}.card .nanjing div.lvls8,.card .nanjing td.lvls8{background-position:-335px 0}.card .qingdao .rn_3{color:#006cbd}.card .qingdao div.l3{background-position:0 -120px}.card .qingdao div.lvl3,.card .qingdao td.lvl3{background-position:-60px 0}.card .nanchang .rn_1{color:#ef0e41}.card .nanchang div.l1{background-position:0 0}.card .nanchang div.lvl1,.card .nanchang td.lvl1{background-position:0 0}.card .chengdu .rn_1{color:#06C}.card .chengdu .rn_2{color:#ec6a00}.card .chengdu .rn_4{color:#2fcc1f}.card .chengdu div.l1{background-position:0 -480px}.card .chengdu div.l2{background-position:-21px -480px}.card .chengdu div.l4{background-position:-43px -695px}.card .chengdu div.lvl1,.card .chengdu td.lvl1{background-position:-730px 0}.card .chengdu div.lvl2,.card .chengdu td.lvl2{background-position:-716px 0}.card .chengdu div.lvl4,.card .chengdu td.lvl4{background-position:-939px 0}.card .chongqing .rn_1{color:#d63542}.card .chongqing .rn_2{color:#2cc427}.card .chongqing .rn_3{color:#497acc}.card .chongqing .rn_6{color:#f06484}.card .chongqing .rn_gb{color:#D66e93}.card .chongqing div.l1{background-position:0 -504px}.card .chongqing div.l2{background-position:-21px -505px}.card .chongqing div.l3{background-position:0 -528px}.card .chongqing div.l6{background-position:-21px -528px}.card .chongqing div.lgb{background-position:0 -768px}.card .chongqing div.lvl1,.card .chongqing td.lvl1{background-position:-745px 0}.card .chongqing div.lvl2,.card .chongqing td.lvl2{background-position:-759px 0}.card .chongqing div.lvl3,.card .chongqing td.lvl3{background-position:-774px 0}.card .chongqing div.lvl6,.card .chongqing td.lvl6{background-position:-789px 0}.card .chongqing div.lvlgb,.card .chongqing td.lvlgb{background-position:-1073px 0}.card .tianjin .rn_1{color:#d63441}.card .tianjin .rn_2{color:#e9cb00}.card .tianjin .rn_3{color:#057caa}.card .tianjin .rn_9{color:#07208a}.card .tianjin div.l1{background-position:0 -552px}.card .tianjin div.l2{background-position:-21px -552px}.card .tianjin div.l3{background-position:0 -575px}.card .tianjin div.l9{background-position:-21px -576px}.card .tianjin div.lvl1,.card .tianjin td.lvl1{background-position:-804px 0}.card .tianjin div.lvl2,.card .tianjin td.lvl2{background-position:-819px 0}.card .tianjin div.lvl3,.card .tianjin td.lvl3{background-position:-834px 0}.card .tianjin div.lvl9,.card .tianjin td.lvl9{background-position:-1133px 0}.card .shenyang .rn_1{color:#e34949}.card .shenyang .rn_2{color:#fb3}.card .shenyang div.l1{background-position:0 -600px}.card .shenyang div.l2{background-position:-21px -600px}.card .shenyang div.lvl1,.card .shenyang td.lvl1{background-position:-864px 0}.card .shenyang div.lvl2,.card .shenyang td.lvl2{background-position:-879px 0}.card .hangzhou .rn_1{color:#e10505}.card .hangzhou .rn_2{color:#ff8000}.card .hangzhou .rn_1zx{color:#D63542}.card .hangzhou div.l1{background-position:0 -624px}.card .hangzhou div.l1zx{background-position:0 -624px}.card .hangzhou div.l2{background-position:-40px -648px}.card .hangzhou div.l4{background-position:-43px -695px}.card .hangzhou div.lvl1,.card .hangzhou td.lvl1{background-position:-894px 0}.card .hangzhou div.lvl1zx,.card .hangzhou td.lvl1zx{background-position:-894px 0}.card .hangzhou div.lvl2,.card .hangzhou td.lvl2{background-position:-1213px 0}.card .hangzhou div.lvl4,.card .hangzhou td.lvl4{background-position:-1271px 0}.card .wuhan .rn_1{color:#06c}.card .wuhan .rn_2{color:#ed9cc7}.card .wuhan .rn_4{color:#9aca00}.card .wuhan .rn_3{color:#cc911f}.card .wuhan div.l1{background-position:-21px -624px}.card .wuhan div.l2{background-position:0 -648px}.card .wuhan div.l4{background-position:0 -301px}.card .wuhan div.l3{background-position:0 -828px}.card .wuhan div.lvl1,.card .wuhan td.lvl1{background-position:-909px 0}.card .wuhan div.lvl2,.card .wuhan td.lvl2{background-position:-924px 0}.card .wuhan div.lvl4,.card .wuhan td.lvl4{background-position:-591px 0}.card .wuhan div.lvl3,.card .wuhan td.lvl3{background-position:-1187px 0}.card .suzhou .rn_1{color:#6bb347}.card .suzhou .rn_2{color:#e30000}.card .suzhou div.l1{background-position:-21px -648px}.card .suzhou div.l2{background-position:0 -456px}.card .suzhou div.lvl1,.card .suzhou td.lvl1{background-position:-939px 0}.card .suzhou div.lvl2,.card .suzhou td.lvl2{background-position:-686px 0}.card .dalian .rn_3{color:#ed3229}.card .dalian .rn_kg{color:#ed3229}.card .dalian .rn_bsq{color:#ed3229}.card .dalian .rn_9zx{color:#ed3229}.card .dalian .rn_2{color:#0549ae}.card .dalian .rn_202{color:#205d94}.card .dalian .rn_1{color:#69CB40}.card .dalian div.l3{background-position:0 -552px}.card .dalian div.lkg{background-position:-0 -552px}.card .dalian div.lbsq{background-position:0 -552px}.card .dalian div.l9zx{background-position:0 -552px}.card .dalian div.l2{background-position:-20px -179px}.card .dalian div.l202{background-position:0 -119px}.card .dalian div.l1{background-position:-43 -694px}.card .dalian div.lvl1,.card .dalian td.lvl1{background-position:0 -939px}.card .dalian div.lvl3,.card .dalian td.lvl3{background-position:-200px 0}.card .dalian div.lvlkg,.card .dalian td.lvlkg{background-position:-200px 0}.card .dalian div.lvlbsq,.card .dalian td.lvlbsq{background-position:-200px 0}.card .dalian div.lvl9zx,.card .dalian td.lvl9zx{background-position:-200px 0}.card .dalian div.lvl2,.card .dalian td.lvl2{background-position:-1416px 0}.card .dalian div.lvl202,.card .dalian td.lvl202{background-position:-1397px 0}.card .changchun .rn_3{color:#d63441}.card .changchun .rn_4{color:#6bb347}.card .changchun div.l3{background-position:0 -696px}.card .changchun div.l4{background-position:-21px -696px}.card .changchun div.lvl3,.card .changchun td.lvl3{background-position:-984px 0}.card .changchun div.lvl4,.card .changchun td.lvl4{background-position:-999px 0}.card .xian .rn_1{color:#0070f5}.card .xian .rn_2{color:#cc5252}.card .xian div.l1{background-position:0 -672px}.card .xian div.l2{background-position:0 -720px}.card .xian div.lvl1,.card .xian td.lvl1{background-position:-1099px 0}.card .xian div.lvl2,.card .xian td.lvl2{background-position:-1014px 0}.card .changsha .rn_2{color:#3099c8}.card .changsha div.l2{background-position:-21px -429px}.card .changsha div.lvl2,.card .changsha td.lvl2{background-position:-1145px 0}.card .kunming .rn_1{color:#db372b}.card .kunming .rn_6{color:#648798}.card .kunming .rn_2{color:#2c6fb5}.card .kunming div.l1{background-position:-21px -768px}.card .kunming div.l2{background-position:-20px -397px}.card .kunming div.l6{background-position:-39px -397px}.card .kunming div.lvl1,.card .kunming td.lvl1{background-position:-1087px 0}.card .kunming div.lvl6,.card .kunming td.lvl6{background-position:-1122px 0}.card .kunming div.lvl2,.card .kunming td.lvl2{background-position:-1133px 0}.card .foshan .rn_gf{color:#b4cc3d}.card .foshan div.lgf{background-position:0 -744px}.card .foshan div.lvlgf,.card .foshan td.lvlgf{background-position:-1044px 0}.card .harbin .rn_1{color:#e60012}.card .harbin div.l1{background-position:-40px -480px}.card .harbin div.lvl1,.card .harbin td.lvl1{background-position:-1111px 0}.card .zhengzhou .rn_1{color:#da1835}.card .zhengzhou div.l1{background-position:-40px -480px}.card .zhengzhou div.lvl1,.card .zhengzhou td.lvl1{background-position:-1111px 0}.card .ningbo .rn_1{color:#0280ff}.card .ningbo .rn_2{color:#fd111b}.card .ningbo div.l1{background-position:-41px -504px}.card .ningbo div.l2{background-position:0 0}.card .ningbo div.lvl1,.card .ningbo td.lvl1{background-position:-1159px 0}.card .ningbo div.lvl2,.card .ningbo td.lvl2{background-position:-90px 0}.card .wuxi .rn_1{color:#ed1922}.card .wuxi .rn_2{color:#0c0}.card .wuxi div.l1{background-position:-40px -528px}.card .wuxi div.l2{background-position:-43px -695px}.card .wuxi div.lvl1,.card .wuxi td.lvl1{background-position:-1172px 0}.card .wuxi div.lvl2,.card .wuxi td.lvl2{background-position:-1243px 0}.card .taibei .rn_danshui{color:#E3002D}.card .taibei .rn_zhonghe{color:#fbb61b}.card .taibei .rn_bannan{color:#0070bc}.card .taibei .rn_songshan{color:#03865a}.card .taibei .rn_wenhu{color:#c38c32}.card .taibei .rn_maokong{color:#7abc26}.card .taibei .rn_xiaobitan{color:#dae11f}.card .taibei .rn_xinbeitou{color:#f3a5a9}.card .taibei div.ldanshui{background-position:0 -806px}.card .taibei div.lzhonghe{background-position:-44px -786px}.card .taibei div.lbannan{background-position:-22px -786px}.card .taibei div.lsongshan{background-position:0 -786px}.card .taibei div.lwenhu{background-position:-44px -768px}.card .taibei div.lmaokong{background-position:-43px -720px}.card .taibei div.lxiaobitan{background-position:-44px -743px}.card .taibei div.lxinbeitou{background-position:-22px -806px}.card .taibei div.lvldanshui,.card .taibei td.lvldanshui{background-position:-1283px 0}.card .taibei div.lvlzhonghe,.card .taibei td.lvlzhonghe{background-position:-1297px 0}.card .taibei div.lvlbannan,.card .taibei td.lvlbannan{background-position:-1311px 0}.card .taibei div.lvlsongshan,.card .taibei td.lvlsongshan{background-position:-1325px 0}.card .taibei div.lvlwenhu,.card .taibei td.lvlwenhu{background-position:-1339px 0}.card .taibei div.lvlmaokong,.card .taibei td.lvlmaokong{background-position:-1352px 0}.card .taibei div.lvlxiaobitan,.card .taibei td.lvlxiaobitan{background-position:-1366px 0}.card .taibei div.lvlxinbeitou,.card .taibei td.lvlxinbeitou{background-position:-1380px 0}.card .gaoxiong .rn_hx{color:#DE005C}.card .gaoxiong .rn_jx{color:#ec9900}.card .gaoxiong div.lhx{background-position:-40px -480px}.card .gaoxiong div.ljx{background-position:0 -429px}.card .gaoxiong div.lvlhx,.card .gaoxiong td.lvlhx{background-position:-1111px 0}.card .gaoxiong div.lvljx,.card .gaoxiong td.lvljx{background-position:-671px 0}.lineBg,.sugg_l{width:12px;height:11px;background-repeat:no-repeat;overflow:hidden;margin-right:2px}.lineBg{margin-right:4px;vertical-align:-1px}.sugg_l{float:right;padding:1px 0}.lineBg_131,.sugg_l_131{background-image:url(//webmap1.bdimg.com/wolfman/static/common/images/subways/bj_sqr_lines_b3243d6.gif)}.lineBg_131_1,.sugg_131_l1{background-position:0 0}.lineBg_131_2,.sugg_131_l2{background-position:0 -30px}.lineBg_131_4,.sugg_131_l4{background-position:0 -240px}.lineBg_131_5,.sugg_131_l5{background-position:0 -60px}.lineBg_131_6,.sugg_131_l6{background-position:0 -470px}.lineBg_131_7,.sugg_131_l7{background-position:0 -517px}.lineBg_131_8,.sugg_131_l8{background-position:0 -90px}.lineBg_131_9,.sugg_131_l9{background-position:0 -428px}.lineBg_131_10,.sugg_131_l10{background-position:0 -120px}.lineBg_131_13,.sugg_131_l13{background-position:0 -150px}.lineBg_131_8t,.sugg_131_l80{background-position:0 -180px}.lineBg_131_air,.sugg_131_l121{background-position:0 -210px}.lineBg_131_yz,.sugg_131_l91{background-position:0 -361px}.lineBg_131_cp,.sugg_131_l103{background-position:0 -300px}.lineBg_131_dx,.sugg_131_l96{background-position:0 -240px}.lineBg_131_fs,.sugg_131_l102{background-position:0 -390px}.lineBg_131_15,.sugg_131_l15{background-position:0 -270px}.lineBg_131_14,.sugg_131_l14{background-position:0 -496px}.lineBg_131_16,.sugg_131_l16{background-position:0 -538px}.lineBg_131_xj,.sugg_131_l135{background-position:0 -559px}.lineBg_257,.sugg_l_257{background-image:url(//webmap1.bdimg.com/wolfman/static/common/images/subways/gz_sqr_lines_0f5746b.gif)}.sugg_257_l1{background-position:0 0}.lineBg_257_2,.sugg_257_l2{background-position:0 -30px}.lineBg_257_3,.sugg_257_l3{background-position:0 -60px}.lineBg_257_4,.sugg_257_l4{background-position:0 -90px}.sugg_257_l83{background-position:0 -120px;width:23px}.lineBg_257_3zx,.sugg_257_l85{background-position:0 -120px;width:23px}.lineBg_257_5,.sugg_257_l5{background-position:0 -150px}.lineBg_257_8,.sugg_257_l8{background-position:0 -180px}.lineBg_257_gf,.sugg_257_l86{background-position:0 -213px;width:23px}.lineBg_257_apm,.sugg_257_l87{background-position:0 -240px;width:24px}.lineBg_257_6,.sugg_257_l6{background-position:0 -264px}.lineBg_289,.sugg_l_289{background-image:url(//webmap0.bdimg.com/wolfman/static/common/images/subways/sh_sqr_lines_5df1c17.gif)}.lineBg_289_1,.sugg_289_l1{background-position:0 0}.lineBg_289_2,.sugg_289_l2{background-position:0 -30px}.lineBg_289_3,.sugg_289_l3{background-position:0 -60px}.lineBg_289_4,.sugg_289_l4{background-position:0 -90px}.lineBg_289_5,.sugg_289_l5{background-position:0 -120px}.lineBg_289_6,.sugg_289_l6{background-position:0 -150px}.lineBg_289_8,.sugg_289_l8{background-position:0 -180px}.lineBg_289_9,.sugg_289_l9{background-position:0 -210px}.lineBg_289_cxf,.sugg_289_l82{background-position:0 -240px}.lineBg_289_7,.sugg_289_l7{background-position:0 -270px}.lineBg_289_11,.sugg_289_l11{background-position:0 -300px}.sugg_289_l84{background-position:0 -330px;width:23px}.lineBg_289_13,.sugg_289_l13{background-position:0 -360px}.lineBg_289_10,.sugg_289_l10{background-position:0 -390px}.lineBg_289_12,.sugg_289_l12{background-position:0 -416px}.lineBg_289_16,.sugg_289_l16{background-position:0 -440px}.lineBg_2912,.sugg_l_2912{background-image:url(//webmap0.bdimg.com/wolfman/static/common/images/subways/hk_sqr_lines_7c11619.gif)}.lineBg_2912_xt,.sugg_2912_l114{background-position:0 0}.lineBg_2912_mas,.sugg_2912_l117{background-position:0 -197px}.lineBg_2912_dt,.sugg_2912_l90{background-position:0 -298px}.lineBg_2912_gt,.sugg_2912_l115{background-position:0 -31px}.lineBg_2912_qw,.sugg_2912_l112{background-position:0 -63px}.lineBg_2912_jc,.sugg_2912_l105{background-position:0 -262px}.lineBg_2912_dsn,.sugg_2912_l101{background-position:0 -229px}.lineBg_2912_gd,.sugg_2912_l108{background-position:0 -94px}.lineBg_2912_jja,.sugg_2912_l97{background-position:0 -162px}.lineBg_2912_dy,.sugg_2912_l89{background-position:0 -130px}.lineBg_340,.sugg_l_340{background-image:url(//webmap1.bdimg.com/wolfman/static/common/images/subways/sz_sqr_lines_7bef61e.gif)}.lineBg_340_lb,.sugg_340_l111{background-position:0 0}.lineBg_340_sk,.sugg_340_l113{background-position:0 -34px}.lineBg_340_lg,.sugg_340_l119{background-position:0 -71px}.lineBg_340_lh,.sugg_340_l118{background-position:0 -108px}.lineBg_340_hz,.sugg_340_l109{background-position:0 -147px}.lineBg_315,.sugg_l_315{background-image:url(//webmap1.bdimg.com/wolfman/static/common/images/subways/nj_sqr_lines_5389880.gif)}.lineBg_315_1,.sugg_315_l1{background-position:0 0}.lineBg_315_2,.sugg_315_l2{background-position:0 -30px}.lineBg_315_10,.sugg_315_l10{background-position:0 -82px}.lineBg_315_jch,.lineBg_315_s1,.sugg_315_l122{background-position:0 -104px}.lineBg_315_s8,.sugg_315_l8,.sugg_315_l123{background-position:0 -126px}.lineBg_315_3,.sugg_315_l3{background-position:-2px -149px}.lineBg_75,.sugg_l_75{background-image:url(//webmap0.bdimg.com/wolfman/static/common/images/subways/chd_sqr_lines_44f2421.gif)}.lineBg_75_1,.sugg_75_l1{background-position:0 0}.lineBg_75_2,.sugg_75_l2{background-position:0 -30px}.lineBg_75_4,.sugg_75_l4{background-position:0 -44px}.lineBg_236,.sugg_l_236{background-image:url(//webmap1.bdimg.com/wolfman/static/common/images/subways/qd_sqr_lines_3d2b53a.gif);background-size:50px 50px;width:11px;height:11px}.lineBg_236_3,.sugg_236_l3{background-position:0 0}.lineBg_163,.sugg_l_163{background-image:url(//webmap0.bdimg.com/wolfman/static/common/images/subways/nc_sqr_lines_8f22db8.gif);width:11px;height:11px}.lineBg_163_1,.sugg_163_l1{background-position:0 0}.lineBg_132,.sugg_l_132{width:12px;height:11px;background-image:url(//webmap0.bdimg.com/wolfman/static/common/images/subways/chq_sqr_lines_d81baf2.gif);background-repeat:no-repeat;overflow:hidden;margin-right:2px}.lineBg_132{margin-right:4px;vertical-align:-1px}.sugg_l_132{float:right;padding:1px 0}.lineBg_132_1,.sugg_132_l1{background-position:0 0}.lineBg_132_2,.sugg_132_l2{background-position:0 -30px}.lineBg_132_3,.sugg_132_l3{background-position:0 -60px}.lineBg_132_6,.sugg_132_l6{background-position:0 -90px}.lineBg_132_120,.sugg_132_l120{background-position:0 -112px}.lineBg_332,.sugg_l_332{background-image:url(//webmap1.bdimg.com/wolfman/static/common/images/subways/tj_sqr_lines_e976a19.gif)}.lineBg_332_1,.sugg_332_l1{background-position:0 0}.lineBg_332_2,.sugg_332_l2{background-position:0 -30px}.sugg_332_l94{background-position:0 -30px}.sugg_332_l95{background-position:0 -30px}.lineBg_332_3,.sugg_332_l3{background-position:0 -59px}.lineBg_332_9,.sugg_332_l107{background-position:0 -90px}.lineBg_58,.sugg_l_58{background-image:url(//webmap1.bdimg.com/wolfman/static/common/images/subways/shy_sqr_lines_88ea8f9.gif)}.lineBg_58_1,.sugg_58_l1{background-position:0 0}.lineBg_58_2,.sugg_58_l2{background-position:0 -30px}.lineBg_179,.sugg_l_179{background-image:url(//webmap0.bdimg.com/wolfman/static/common/images/subways/hzh_sqr_lines_2de38bd.gif)}.lineBg_179_1,.sugg_179_l1{background-position:0 0}.lineBg_179_1zx,.sugg_179_l106{background-position:0 0}.lineBg_179_2,.sugg_179_l2{background-position:0 -37px}.lineBg_179_4,.sugg_179_l4{background-position:0 -57px}.lineBg_218,.sugg_l_218{background-image:url(//webmap0.bdimg.com/wolfman/static/common/images/subways/wh_sqr_lines_3b3e092.gif)}.lineBg_218_1,.sugg_218_l1{background-position:0 0}.lineBg_218_2,.sugg_218_l2{background-position:0 -30px}.lineBg_218_4,.sugg_218_l4{background-position:0 -48px}.lineBg_218_3,.sugg_218_l3{background-position:0 -73px}.lineBg_224,.sugg_l_224{background-image:url(//webmap1.bdimg.com/wolfman/static/common/images/subways/suz_sqr_lines_31cd12f.gif)}.lineBg_224_1,.sugg_224_l1{background-position:0 0}.lineBg_224_2,.sugg_224_l2{background-position:0 -19px}.lineBg_167,.sugg_l_167{background-image:url(//webmap1.bdimg.com/wolfman/static/common/images/subways/dl_sqr_lines_a5042cd.gif)}.lineBg_167_3,.sugg_167_l3{background-position:0 0}.lineBg_167_kg,.sugg_167_l124{background-position:0 -30px}.lineBg_167_bsq,.sugg_167_l127{background-position:0 -60px}.lineBg_167_9zx,.sugg_167_l125{background-position:0 -90px}.lineBg_167_2,.sugg_167_l2{background-position:0 -111px}.lineBg_167_202,.sugg_167_l128{background-position:0 -133px}.lineBg_315_167_1,.sugg_167_l1{background-position:0 -159px}.lineBg_53,.sugg_l_53{background-image:url(//webmap1.bdimg.com/wolfman/static/common/images/subways/chc_sqr_lines_e5e4a17.gif)}.lineBg_53_3,.sugg_53_l3{background-position:0 0}.lineBg_53_4,.sugg_53_l4{background-position:0 -30px}.lineBg_233,.sugg_l_233{background-image:url(//webmap0.bdimg.com/wolfman/static/common/images/subways/xian_sqr_lines_1eb79cf.gif)}.lineBg_233_1,.sugg_233_l1{background-position:0 -24px}.lineBg_233_2,.sugg_233_l2{background-position:0 0}.lineBg_158,.sugg_l_158{background-image:url(//webmap0.bdimg.com/wolfman/static/common/images/subways/cs_sqr_lines_9b858aa.png)}.sugg_158_l2{background-position:0 0}.lineBg_104,.sugg_l_104{background-image:url(//webmap1.bdimg.com/wolfman/static/common/images/subways/km_sqr_lines_82c961a.gif)}.lineBg_104_1,.sugg_104_l1{background-position:0 -16px}.sugg_104_l2{background-position:0 -32px}.lineBg_104_6,.sugg_104_l6{background-position:0 0}.lineBg_138,.sugg_l_138{background-image:url(//webmap0.bdimg.com/wolfman/static/common/images/subways/fsh_sqr_lines_6779bfb.gif)}.lineBg_138_gf,.sugg_138_l86{background-position:0 0}.lineBg_48,.sugg_l_48{background-image:url(//webmap0.bdimg.com/wolfman/static/common/images/subways/hrb_sqr_lines_d158215.gif)}.lineBg_48_2,.sugg_48_l2{background-position:0 0}.lineBg_268,.sugg_l_268{background-image:url(//webmap1.bdimg.com/wolfman/static/common/images/subways/zhzh_sqr_lines_313a06a.gif)}.lineBg_268_1,.sugg_268_l1{background-position:0 0}.lineBg_180,.sugg_l_180{background-image:url(//webmap0.bdimg.com/wolfman/static/common/images/subways/nbo_sqr_lines_0d1fc92.gif)}.lineBg_180_1,.sugg_180_l1{background-position:0 0}.lineBg_180_2,.sugg_180_l2{background-position:0 -28px}.lineBg_317,.sugg_l_317{background-image:url(//webmap1.bdimg.com/wolfman/static/common/images/subways/wuxi_sqr_lines_4016398.gif)}.lineBg_317_1,.sugg_317_l1{background-position:0 0}.lineBg_317_2,.sugg_317_l2{background-position:0 -21px}#sw_pw{display:none;z-index:10;position:absolute;left:0;top:0;width:210px;text-align:center;line-height:24px;-webkit-box-sizing:border-box;background-color:rgba(0,0,0,.8);border:.3em solid transparent;border-style:none solid solid;border-radius:3px;-webkit-border-radius:3px;-webkit-box-shadow:2px 2px 7px rgba(0,0,0,.3);font-size:12px}#sw_pw:after{content:"";position:absolute;width:0;height:0;left:50%;bottom:-10px;margin:0 0 0 -6px;border-left:5px solid transparent;border-top:8px solid rgba(0,0,0,.8);border-right:5px solid transparent}#sw_pw .sw-pw-title{position:relative;width:100%;color:#fff;margin:0;padding:0}#sw_pw ul li{list-style-type:none;height:100%}#sw_pw .sw-pw-tc{width:100%}#sw_pw .sw-pw-tl,#sw_pw .sw-pw-tr{position:absolute;top:0;width:41px;color:#747474}#sw_pw .sw-pw-tl{left:0;border-right:1px solid rgba(255,255,255,.2);background:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAAlCAYAAAAuqZsAAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJ bWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdp bj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6 eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEz NDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJo dHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlw dGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAv IiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RS ZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpD cmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBNYWNpbnRvc2giIHhtcE1NOkluc3RhbmNl SUQ9InhtcC5paWQ6QjA3NjMyREJDNzQ2MTFFMTlBQUM5QzlCRDZGODZCQkYiIHhtcE1NOkRvY3Vt ZW50SUQ9InhtcC5kaWQ6QjA3NjMyRENDNzQ2MTFFMTlBQUM5QzlCRDZGODZCQkYiPiA8eG1wTU06 RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpCMDc2MzJEOUM3NDYxMUUxOUFB QzlDOUJENkY4NkJCRiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpCMDc2MzJEQUM3NDYxMUUx OUFBQzlDOUJENkY4NkJCRiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1w bWV0YT4gPD94cGFja2V0IGVuZD0iciI/PllB9T8AAAKuSURBVHjaxFjRcdpAEAX+mVEqiFxB5AoQ HZAKElcArsBWBSgVQCoAVwCuwEoFlivwGQpI7jKrzGXn7ep0EsPO7BjLp/O73bdv9xifTqdRpCXW c+sz65n1lNy3mvzZemX9aN34C6bTKdx8HAHMgVlaX0QeaGv9J4EcBJgD9EA/hzAH7N4Cq/oAW1tf KX+vKEXP7PlMSLFvhQX32BWY49GBOIRO7FKy57wBlnoUQHu5yJX+g4mymdvgFWzkAM3JtwGgmiJw a2/pvQoEYBQCLKNI8RfuaeNjT245gAUdqgHdmkqUPiOctLdJVYkithkAVO/K5cC+M30KAZVSxboo /ybnn1eIR5r5qUyI7P4GX6nqJHskbQsxQ7wqu6aSn2qrgHLrXjqAat5ZC0WlRuzVE0J3uhtBCjRt a3qjX92JIMiOIqYtYgumzpo+7RRtu/E0zvknokMF5GgdQv4Ze/5DWL8CFVe2aNuedGsLCi1vS+WL F4WKNkL2Dnh414FnO1b1R5vKuRaxjKUF2YKBqjuCGtF6nyL5+XxOJWCcL2/CpjzdRYRuGpDShQQs ARUj9U/OnRh7Yr9/CW1JXU4fYxXoHIMCu+iB+gBLIt/LgShDYCYktGCDfCBgvyRgVQgZwTy/jIzy EnQNMZV1QCT4bJ+3XFCkS81/WijdkiYAdSak04BWtabWEmIbsNZYgU00YE+gjyErQeo31GpShVMH Yc+/dwsEzh97/D6ojT2ZMlM1XwN8WP9Ma7NAbZvbtBoEjE+jBT2TusCu5SIbI7z/wLWN1rdKi0o6 cqwTuAmYyTm5NQW/82atWvlnBbo7apxD98qDJxl7mkC76JQ2Qm0CI1xKF95Gb4oLXHJDwJlxjy/u LgruGtNFM8lqnNtfK2JqN3CVeW1gzWj9jThd0xd59R8BBgAAiefGO1Bt1gAAAABJRU5ErkJggg==") no-repeat 50% 50%;-webkit-background-size:19px 19px}#sw_pw .sw-pw-tr{right:0;border-left:1px solid rgba(255,255,255,.2);background:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACUAAAAmCAYAAABDClKtAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJ bWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdp bj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6 eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEz NDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJo dHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlw dGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAv IiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RS ZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpD cmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBNYWNpbnRvc2giIHhtcE1NOkluc3RhbmNl SUQ9InhtcC5paWQ6QjA3NjMyREZDNzQ2MTFFMTlBQUM5QzlCRDZGODZCQkYiIHhtcE1NOkRvY3Vt ZW50SUQ9InhtcC5kaWQ6QjA3NjMyRTBDNzQ2MTFFMTlBQUM5QzlCRDZGODZCQkYiPiA8eG1wTU06 RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpCMDc2MzJEREM3NDYxMUUxOUFB QzlDOUJENkY4NkJCRiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpCMDc2MzJERUM3NDYxMUUx OUFBQzlDOUJENkY4NkJCRiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1w bWV0YT4gPD94cGFja2V0IGVuZD0iciI/PqheQ+MAAAEtSURBVHja7JftDYIwEIbB8JeEUXACZQPd oGygE+gGxAnQEZzAOgEdwREIDKBXUgjBIqW5Npj0kvcHpG0erveFX1WVZ8l2oBhEhRoLw/BroW8J KgeR3vMVlI5BrSwAHQZAnngmYxtMe4oIL41ZAp6iNqF4/BQTa0oBxmxAcaAHKFJY+wKtAaw0CRUJ oHjGHiY8VpqCKmYCdRkJUKmJ7Ms1gZqkqOs6w/bUGXRCOGePCcXjaItwDsW8PoZ0zhM70IeeyiZi jH/Isf+CF9MAOdCppDj+LJ6yim6j9802B6VqQa818BFjY6AHakHp9Crj15ctCaiFIi7Q/wCKLRHq vjSoVNKWunH4rTBDv5Cv7NKeKfvvU2nINzHAuexzUA7KQTkoB6UxDicKvc+qfQQYABaiUBxugCsr AAAAAElFTkSuQmCC") no-repeat 50% 50%;-webkit-background-size:19px 19px}#sw_pw .sw-pw-content{background-color:#fff;border:1px solid rgba(0,0,0,.8)}#sw_pw .sw-pw-notification{color:#fff;line-height:33px;margin-top:2px}#sw_pw .sw-pw-line{background-color:#fff;padding:2px;margin-top:0}#sw_pw .sw-pw-line-title{height:22px;line-height:22px;text-align:left;border-bottom:2px green solid;overflow:hidden}#sw_pw .sw-pw-line-title span{color:#fff;background-color:green;padding:0 4px;line-height:24px;display:inline-block}#sw_pw .sw-pw-line-list{height:20px;line-height:20px;margin:4px 0;overflow:hidden;color:#000;position:relative}#sw_pw .sw-pw-line-list .sw-pw-line-dir{position:absolute;left:0;width:90px;text-align:left}#sw_pw .sw-pw-line-list .sw-pw-line-dir span{float:left}#sw_pw .sw-pw-line-list .sw-pw-line-dir-name{max-width:100px;text-overflow:ellipsis;white-space:nowrap;overflow:hidden}#sw_pw .sw-pw-line-list .sw-pw-line-time{position:absolute;right:0;text-align:right}#sw_pw .sw-pw-line-list .sw-pw-text-gray{color:gray}#sw_pw .sw-pw-line-list .sw-pw-text-gray-bkg{background-color:#ccc;margin-left:4px}#sw_pw .sw-pw-line-list .sw-pw-text-inline-block{display:inline-block;margin-left:2px;text-align:left}#mini_sw_pw{display:none;z-index:10;position:absolute;left:0;top:0;width:100px;text-align:center;line-height:24px;-webkit-box-sizing:border-box;background-color:#fff;border-radius:3px;border:solid 1px #ccc;-webkit-border-radius:3px;-webkit-box-shadow:2px 2px 7px rgba(0,0,0,.3);font-size:12px}#mini_sw_pw:after{content:\'\';position:absolute;z-index:-10;width:8px;height:8px;left:49%;bottom:-5px;border-bottom:solid 1px #ccc;border-right:solid 1px #ccc;background:#fff;transform:rotate(45deg);-ms-transform:rotate(45deg);-moz-transform:rotate(45deg);-webkit-transform:rotate(45deg);-o-transform:rotate(45deg)}#mini_sw_pw .sw-pw-title{padding:3px;color:#fff}#sw_pw_plan{display:none;z-index:10;position:absolute;left:0;top:0;width:210px;text-align:center;line-height:24px;-webkit-box-sizing:border-box;background-color:rgba(0,0,0,.8);border:.3em solid transparent;border-style:none solid solid;border-radius:3px;-webkit-border-radius:3px;-webkit-box-shadow:2px 2px 7px rgba(0,0,0,.3);font-size:12px}#sw_pw_plan .sw-pw-title{position:relative;width:100%;color:#fff;margin:0;padding:0}#sw_pw_plan ul li{list-style-type:none;height:100%}#sw_pw_plan .sw-pw-tc{width:100%}#sw_pw_plan .sw-pw-tl,#sw_pw_plan .sw-pw-tr{position:absolute;top:0;width:41px;color:#747474}#sw_pw_plan .sw-pw-tl{left:0;border-right:1px solid rgba(255,255,255,.2);background:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAAlCAYAAAAuqZsAAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJ bWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdp bj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6 eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEz NDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJo dHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlw dGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAv IiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RS ZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpD cmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBNYWNpbnRvc2giIHhtcE1NOkluc3RhbmNl SUQ9InhtcC5paWQ6QjA3NjMyREJDNzQ2MTFFMTlBQUM5QzlCRDZGODZCQkYiIHhtcE1NOkRvY3Vt ZW50SUQ9InhtcC5kaWQ6QjA3NjMyRENDNzQ2MTFFMTlBQUM5QzlCRDZGODZCQkYiPiA8eG1wTU06 RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpCMDc2MzJEOUM3NDYxMUUxOUFB QzlDOUJENkY4NkJCRiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpCMDc2MzJEQUM3NDYxMUUx OUFBQzlDOUJENkY4NkJCRiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1w bWV0YT4gPD94cGFja2V0IGVuZD0iciI/PllB9T8AAAKuSURBVHjaxFjRcdpAEAX+mVEqiFxB5AoQ HZAKElcArsBWBSgVQCoAVwCuwEoFlivwGQpI7jKrzGXn7ep0EsPO7BjLp/O73bdv9xifTqdRpCXW c+sz65n1lNy3mvzZemX9aN34C6bTKdx8HAHMgVlaX0QeaGv9J4EcBJgD9EA/hzAH7N4Cq/oAW1tf KX+vKEXP7PlMSLFvhQX32BWY49GBOIRO7FKy57wBlnoUQHu5yJX+g4mymdvgFWzkAM3JtwGgmiJw a2/pvQoEYBQCLKNI8RfuaeNjT245gAUdqgHdmkqUPiOctLdJVYkithkAVO/K5cC+M30KAZVSxboo /ybnn1eIR5r5qUyI7P4GX6nqJHskbQsxQ7wqu6aSn2qrgHLrXjqAat5ZC0WlRuzVE0J3uhtBCjRt a3qjX92JIMiOIqYtYgumzpo+7RRtu/E0zvknokMF5GgdQv4Ze/5DWL8CFVe2aNuedGsLCi1vS+WL F4WKNkL2Dnh414FnO1b1R5vKuRaxjKUF2YKBqjuCGtF6nyL5+XxOJWCcL2/CpjzdRYRuGpDShQQs ARUj9U/OnRh7Yr9/CW1JXU4fYxXoHIMCu+iB+gBLIt/LgShDYCYktGCDfCBgvyRgVQgZwTy/jIzy EnQNMZV1QCT4bJ+3XFCkS81/WijdkiYAdSak04BWtabWEmIbsNZYgU00YE+gjyErQeo31GpShVMH Yc+/dwsEzh97/D6ojT2ZMlM1XwN8WP9Ma7NAbZvbtBoEjE+jBT2TusCu5SIbI7z/wLWN1rdKi0o6 cqwTuAmYyTm5NQW/82atWvlnBbo7apxD98qDJxl7mkC76JQ2Qm0CI1xKF95Gb4oLXHJDwJlxjy/u LgruGtNFM8lqnNtfK2JqN3CVeW1gzWj9jThd0xd59R8BBgAAiefGO1Bt1gAAAABJRU5ErkJggg==") no-repeat 50% 50%;-webkit-background-size:19px 19px}#sw_pw_plan .sw-pw-tr{right:0;border-left:1px solid rgba(255,255,255,.2);background:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACUAAAAmCAYAAABDClKtAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJ bWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdp bj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6 eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEz NDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJo dHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlw dGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAv IiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RS ZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpD cmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBNYWNpbnRvc2giIHhtcE1NOkluc3RhbmNl SUQ9InhtcC5paWQ6QjA3NjMyREZDNzQ2MTFFMTlBQUM5QzlCRDZGODZCQkYiIHhtcE1NOkRvY3Vt ZW50SUQ9InhtcC5kaWQ6QjA3NjMyRTBDNzQ2MTFFMTlBQUM5QzlCRDZGODZCQkYiPiA8eG1wTU06 RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpCMDc2MzJEREM3NDYxMUUxOUFB QzlDOUJENkY4NkJCRiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpCMDc2MzJERUM3NDYxMUUx OUFBQzlDOUJENkY4NkJCRiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1w bWV0YT4gPD94cGFja2V0IGVuZD0iciI/PqheQ+MAAAEtSURBVHja7JftDYIwEIbB8JeEUXACZQPd oGygE+gGxAnQEZzAOgEdwREIDKBXUgjBIqW5Npj0kvcHpG0erveFX1WVZ8l2oBhEhRoLw/BroW8J KgeR3vMVlI5BrSwAHQZAnngmYxtMe4oIL41ZAp6iNqF4/BQTa0oBxmxAcaAHKFJY+wKtAaw0CRUJ oHjGHiY8VpqCKmYCdRkJUKmJ7Ms1gZqkqOs6w/bUGXRCOGePCcXjaItwDsW8PoZ0zhM70IeeyiZi jH/Isf+CF9MAOdCppDj+LJ6yim6j9802B6VqQa818BFjY6AHakHp9Crj15ctCaiFIi7Q/wCKLRHq vjSoVNKWunH4rTBDv5Cv7NKeKfvvU2nINzHAuexzUA7KQTkoB6UxDicKvc+qfQQYABaiUBxugCsr AAAAAElFTkSuQmCC") no-repeat 50% 50%;-webkit-background-size:19px 19px}#sw_pw_plan .sw-pw-content{background-color:#fff;border:1px solid rgba(0,0,0,.8)}#sw_pw_plan .sw-pw-transfer{text-indent:5px;text-align:left}#sw_pw_plan .sw-pw-transfer .transfer-icon{position:relative;left:-2px;top:4px;display:inline-block;width:20px;height:20px;background:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAACldJREFUeNq8mmtMVdkVx7eIKOIDn4gvUFuQghjFR6dlfOA79ZFaR/2iNWZMJu2HdtKZpk07TZ0mpp1p06RN+8U2WtExgpgZUzS1GmtQ6wsRH/gCBRF8IiqoKApdvz1n32zO3HPOBbErWV65nLP3/q+19n+ttTddHj16pGpqatQbki6i3ZzPFtHmzhy8paVFjRo1SvXs2VNFA2LXrl2dtegU0TTRyaKpogmi0c7vW0UbRatES0WLRa+I1nV0whcvXqi1a9eqpKSk0CSvI2+JviM6TXSsaFw73q0UPSe6W7RQ9FZHFxEI5OXLl9qFSFRUlIqO1q8QLt8T/aHotx1vfEVaW1vbuqzLVx5LdnSRKPGdL/oX0XLebW5uVt26dQv3XvuAAGLBggUqISFBD9jU1KQKCwvfrq+v39C1a9dsP9BITEyMBm+Ehb169SoESsawfz9M9Meia+S5P2dnZ/8hPT390d69e9WNGzf0/B0GwqKGDRumVUgh7tixYx/V1dW9L4PG2M8AgAUNHDhQDRkyRD8/YMAA1atXrzZAiOmHDx+q27dva4K5c+eOevLkiQbkeBqJl58/KikpWSKx/wP5/5FOCS0sUVlZOWbr1q25Yqm3sLIJGxYWFxenxo0bpzIyMtTw4cNVjx49fMcbMWKEfh65f/++unLlijp//ryqra3VXgIQ4J8/f54pc/5b5v+V6O9fCwggzp07l1FcXFwglk8xIAgRJpw6dapWPNER4T108uTJ6uLFi+rIkSPq1q1bOiQBJZ+x8tineEn0lx0GIoNlFBUV/VPcm4T7EbGUtvzcuXNVcnJyp+QDDJaZmalSUlLU0aNHtRKuVrj9gi0n+tOOABkjWiCTJJlQwhNZWVlq3rx5gSHUEWHMnJwcbSghFfalvck/dPLQx+0Bwiq3OwlOg8BC06dP1xO9acEzffv2VTt37lT37t2zwawXrRDd5n4nymOs9U52Du2JadOm/V9AGIHyV6xYofr166eNaAkb/+uRAPmW6AfmB/YE4RQEwp38OkMggmXLlumQs/LTENHfudfuBoIP/2i+xxPEK3siqObZsWOH2rdvX+DihAH1Zo4UODkJYiGRWu98V3Sp3x7hgSnGwrDG/PnzVffu3X09wcYUmlaG2fCexThtpLq6Wh0/flxVVVWpOXPmRETdEyZM0PmmrKxMmRQg8jPRL0xFbXuEVfzItvLEiRPVyJEjfScBwJkzZ3QpzSSHDh1SJ0+e9Hy+oaFBP3fp0iW1adMmdeLEiTZljZdgHOawns0SnRcutNgb3zRlBxmbZOcn7J/Dhw+HyhA2JYxDlg8nhColCc8D5tmzZ9qb27dvV3fv3vWda9CgQXpcxrDkPVOw2kDeMT+zoLFjx+p6yU8oLaibCCMDfuHChap3795hnwfE06dPQ8AJRQARNps3b1ZSy/l6Z9KkSSo2NtbeK2/LGMk2EHqI2SE3yURk2qCC8uzZs6FFYSne8QMPENRdlgOGyppKd9u2bbqY9KJkQt3ySp/S0tIcG8goJ5Nrb+DGoUOH+gKRUl4nK6yKhViMV0gZefz4sR4/XH9hvHP16lW1ceNGvdfYp25JTU1VtsGFPHIIcQMkzalltKUTExN9mcodJlAj4LGYnzx48MD391gaMLQCFju1EdIBazOsKu3AN8SDIY7Msh8O8obxnIlVwAPEi3IjAYIxCE0qYRbr1RXGx8drpQVwGrMkmXe48UiqO6MGid0wITRRQUIRaC/cdIvmZ6pp+hW/1pYsD6lYpNBPDJQY5dDXQJPcKNDg6yDBvbjfeIUwCwqbxsbGEG1jLLxoFsTiSXiRZHyMZj8nGz4hymGsHgYIiwvqjzXNiVUAzDu4mNaVBXrVYICAIHhn5syZas2aNTrJmYKQMWArCCGSct9FFPFRTkYPPqYIYxXyBSHBImCw8vLyNvRs6irjhfT0dLVu3ToNBECEEhvb9PxkfWK/vWGtv5J/mti7xr0sIJKSgcFgKWNxPskrfFZUVKgtW7aogoKCEOcPHjxYLV68WPXv379NeALO7BXe9coh7jB1EUUTNEM8NBggWC5ciIRtIceMUadOnQq1qzdv3lS5ubn6+Ma0qgDwsKKW0aNHtwllTlmCBOq3RYxzz4xebYeEzS5BQLAwFjVGuHbtWggYSqcXRBo8ZzzrXmS4isJVHTSPHz/+jgFSaj8ciXuJ5wsXLoRAGI+ak0EmZB8EMSCFIxncjOHqBsPOCyGYlkHmqZF3qk0GO2Mfa8JAWCgcnxM+hNP169d1GLDwcGFjgMBufsJ5liEMU3f5CWQAGMKWNcr414TF6s0KoJv7hgapaL1ilY0GUAZkMK/kxSQwW9DCIAYzBu8EVdzUYoYcWIt0kMfZhwZIregpsynhfF4IJ9xHQKGzZ8/Wz7oZxAYStD/oQegYTWmDEbki8Ot/AG68h+Nlf/zLrn5bnbYxNKBkS894xcrkgtWrV+uSggnCUTYnIH5Cd0hFgEcc6+rxvOTy5cs6X1k1XbmQTbG7sfrChJdTVep2NOgcFzCzZs3S77jLbq8wwVu0x6h9ljxlyhTPwpNwArhL8uX7RjcQLlk+szc9bWxQTmGzc3AHIDI1zzMpC/IKLej9wIED2guEJwYgn/j1M4CGaKycQ474u9dx0J+cY0m9EBjFlBiRHNusWrVKH93wLupFvZThS5cu1WRAaPHJPYxX0oR4aLRcv+e08boXkAoHTGgv4BW7hvI9EZfFZ2dna+9gXb/zYUhj+fLluvdZtGhRqAIIR+O0wHjR2uREzydBJ42/FS2za6/du3cHnnK4uzgWF3TQDUPBgBx0eMn+/fv1XnXR+K/Vl5eqvkCou95lfxkrk0nz8/NVXV37LmAjufvzaxkIJ+5MXM/sFP1bpIfY/xX9uT0ZtMcJBxvuTQtkwfHrwYMH3ZehZc49Y0ukQJRzU7TBZFEGpDECTElJyRsDwV7Iy8vTnnBVDmxsbpJr2n1jxU2RJLUYCakPAMLA0Ct7hsw/Y8YMz03aXiH5QrFFRUWapVx7woC41KGrNwaXZujD06dPN0i3t55TPsMcVL4Ujlxscu0QdBTkV/1y0sh5MWFrjlMNYxFO8p0viEAgDMTClyxZ8rF4oko6wE8kNwx2Lip1IuOYk3KGLM+5L5/kCUB7xT/kQdGJV6mdIBHTAtiH6FLZ5sl370v/URtEHNGRMA9WWrly5T8yMzOPFhYWbmhqalrGdyiNEYsj17AwAAKE8r1Pnz6hOMcoJD8KUoBQipuDCzdzSca/LcXgb6Qw/Ss5BO8HHRgGXk8zEPnAsdhVmZjD7hWiPzHXc7Y1WRwWhuXCHe0YA3jQbr1orszxqQC9uWfPHh1uQa1AIBDTZNmVrdNI7ZD/8idF3xH9vugM9eVdeOhPM6wsHIlcFM0DBNUFQCsrK/W8Ef8tCg+HOyyO4ASD/3zu6NdEJ3If4xy/ciju1SExGcnosuh/RPkTDfj8aSQnJu4rP+P1aOI4LS3tddmz3NE852fuLKCxRNFY5+yMFT1w6qQaJ4xem7JNYfo/AQYAqpk3qBLp2UoAAAAASUVORK5CYII=");background-size:20px 20px}#sw_pw_plan .sw-pw-transfer .transfer-distance{color:#ff4e00;margin:0 2px}#sw_pw_plan .sw-pw-notification{color:#fff;line-height:33px;margin-top:2px}#sw_pw_plan .sw-pw-line{background-color:#fff;padding:2px;margin-top:0}#sw_pw_plan .sw-pw-line-title{height:22px;line-height:22px;text-align:left;border-bottom:2px green solid;overflow:hidden}#sw_pw_plan .sw-pw-line-title span{color:#fff;background-color:green;padding:0 4px;line-height:24px;display:inline-block}#sw_pw_plan .sw-pw-line-list{height:20px;line-height:20px;margin:4px 0;overflow:hidden;color:#000;position:relative}#sw_pw_plan .sw-pw-line-list .sw-pw-line-dir{position:absolute;left:0;width:90px;text-align:left}#sw_pw_plan .sw-pw-line-list .sw-pw-line-dir span{float:left}#sw_pw_plan .sw-pw-line-list .sw-pw-line-dir-name{max-width:100px;text-overflow:ellipsis;white-space:nowrap;overflow:hidden}#sw_pw_plan .sw-pw-line-list .sw-pw-line-time{position:absolute;right:0;text-align:right}#sw_pw_plan .sw-pw-line-list .sw-pw-text-gray{color:gray}#sw_pw_plan .sw-pw-line-list .sw-pw-text-gray-bkg{background-color:#ccc;margin-left:4px}#sw_pw_plan .sw-pw-line-list .sw-pw-text-inline-block{display:inline-block;margin-left:2px;text-align:left}#sw_pw_plan_end{display:none;z-index:10;position:absolute;left:0;top:0;width:150px;text-align:center;line-height:24px;-webkit-box-sizing:border-box;background-color:rgba(0,0,0,.8);border:.3em solid transparent;border-style:none solid solid;border-radius:3px;-webkit-border-radius:3px;-webkit-box-shadow:2px 2px 7px rgba(0,0,0,.3);font-size:12px}#sw_pw_plan_end .sw-pw-title{position:relative;width:100%;color:#fff;margin:0;padding:0}#sw_pw_plan_end ul li{list-style-type:none;height:100%}#sw_pw_plan_end .sw-pw-tc{width:100%}#sw_pw_plan_end .sw-pw-content{background-color:#fff;border:1px solid rgba(0,0,0,.8)}#sw_pw_plan_end .sw-pw-item{position:relative;height:20px;line-height:20px;margin:4px}#sw_pw_plan_end .sw-pw-item-close{margin:0 0 6px;border-radius:2px}#sw_pw_plan_end .sw-pw-field{width:75px;border-right:solid 1px #ccc;text-align:left}#sw_pw_plan_end .sw-pw-value{position:absolute;right:0;top:0}#sw_pw_plan_end .sw-pw-value span{color:#ff4e00}.subway-menu{position:absolute;z-index:100;right:10px;top:10px;background:#fff;border:solid 1px #ccc;opacity:.9;padding:5px;border-radius:3px;-webkit-border-radius:3px}.subway-col{display:table-cell;vertical-align:top}.subway-item{font-size:14px;cursor:pointer;padding:2px}.subway-item:hover{background-color:#ccc}.subway-icon{position:relative;bottom:2px;display:inline-block;width:8px;height:8px}.subway-txt{padding-left:5px}#btnSubwayPlanCancel{padding:1px 6px;cursor:pointer}.station-link{position:absolute;right:3px;color:#fff}.subway-zoomcontainer{position:absolute;cursor:pointer;right:9px;bottom:83px;box-shadow:1px 2px 1px rgba(0,0,0,.15);overflow:hidden;border:solid 1px #ccc;background:#fff}.subway-zoomin{width:26px;height:26px;border-bottom:solid 1px #ccc}.subway-zoomin-icon{position:relative;left:8px;top:8px;width:10px;height:10px;background:url(//webmap1.bdimg.com/wolfman/static/common/images/api/mapZoom2x.png) 0 0;background-size:40px 10px}.subway-zoomout{width:26px;height:26px}.subway-zoomout-icon{position:relative;left:8px;top:8px;width:10px;height:10px;background:url(//webmap1.bdimg.com/wolfman/static/common/images/api/mapZoom2x.png) -10px 0;background-size:40px 10px}',
        name: "Subway"
    }), T.lang.inherits(Subway, T.lang.Class, "Subway"), T.extend(Subway.prototype, {
        render: function() {
            try {
                var cInfo = this.cInfo,
                    cityCode = cInfo.ccode || modelConfig.cityCode,
                    cityName = cInfo.cname || modelConfig.cityName,
                    cityInfo = {
                        cname: "北京市"
                    };
                for (var item in subConfig)
                    if (subConfig[item].ccode == cityCode) {
                        cityInfo.cname = cityName, 2912 === cityCode && (cityInfo.isLongTitle = "long-title");
                        break
                    }
                var template = [function(_template_object) {
                    var _template_fun_array = [],
                        fn = function(__data__) {
                            var _template_varName = "";
                            for (var name in __data__) _template_varName += "var " + name + '=__data__["' + name + '"];';
                            eval(_template_varName), _template_fun_array.push('<div id="selCity_subway" class="', "undefined" == typeof isLongTitle ? "" : isLongTitle, "\">    <span id='toolCurCity' class='cur_city'>", "undefined" == typeof cname ? "" : cname, '</span>    <span class="arrow-flag down"></span></div>'), _template_varName = null
                        }(_template_object);
                    return fn = null, _template_fun_array.join("")
                }][0];
                T("#sbw_map").html(template(cityInfo))
            } catch (e) {
                "undefined" != typeof alog && alog("exception.fire", "catch", {
                    msg: e.message || e.description,
                    path: "common:widget/com/Subway/Subway.js",
                    ln: 70
                })
            }
        },
        initialize: function() {
            try {
                this.stationInput = T("#sub_station_input"), this.sbwMap = T("#sbw_map"), this.svgRenderer || (this.svgRenderer = new SVGRenderer), this.bindSumit(), this.sbwMap.css("zIndex", 0), this.switchCity()
            } catch (i) {
                "undefined" != typeof alog && alog("exception.fire", "catch", {
                    msg: i.message || i.description,
                    path: "common:widget/com/Subway/Subway.js",
                    ln: 88
                })
            }
        },
        disposeOpBanner: function() {
            var i = T('<div class="sub-op-banner"></div>').appendTo("#sbw_main"),
                n = [{
                    bannerWrap: i,
                    opid: "op6"
                }];
            operateMediator.initOpBanner(n)
        },
        load: function(i) {
            i = i || this.opts, this.cInfo = i.cInfo || {}, this.lineQuery = i.lineQuery || "", this.render(), this.initialize(), addStat("subway.map.pvuv", "show", {})
        },
        unload: function() {
            this.sbwMap.empty(), this.sbwMap.css("zIndex", -1), this.endSug && this.endSug.disposeSug(), this.stationSug && this.stationSug.disposeSug(), this.startSug = null, this.endSug = null, this.stationSug = null, this.selCityPop = null, baidu("#btn_uf").off("click", this.setDetail), this.setDetail = null
        },
        unbind: function() {
            this.unBindListeners()
        },
        unBindListeners: function() {
            eventProxy.off("com.subway", "linesearch"), eventProxy.off("com.subway", "change"), eventProxy.off("com.subway", "clearsearch"), eventProxy.off("com.subway", "clearstation"), eventProxy.off("com.subway", "citychange")
        },
        bindListeners: function() {
            var i = this;
            eventProxy.on("com.subway", "linesearch", function(n, o) {
                o && o.start && o.end && i.qRequest(o.start, o.end, 0)
            }), eventProxy.on("com.subway", "change", function() {
                i.unload()
            }), eventProxy.on("com.subway", "clearsearch", function() {
                i.clearSearch()
            }), eventProxy.on("com.subway", "clearstation", function() {
                i.clearSite()
            })
        },
        bindSumit: function() {
            var i = this;
            T("#selCity_subway").on("click", function(n) {
                n.stopPropagation(), i.selectCity(i, {
                    fs: !0
                })
            }), T("#selCity_subway").on("mouseover", function(n) {
                n.stopPropagation(), i.svgRenderer && i.svgRenderer.hideHoverPopupWindows()
            }), T("#searchbox").on("mouseover", function(n) {
                n.stopPropagation(), i.svgRenderer && i.svgRenderer.hideHoverPopupWindows()
            }), T("#searchbox").on("mousedown", function(i) {
                i.stopPropagation()
            }).on("mousedwon", function(i) {
                i.stopPropagation()
            })
        },
        clearSearch: function() {
            searchbox.setState("metro", {
                start: "",
                end: "",
                index: "metroline"
            }, {
                reset: !0
            }), curConfig.curSLines = []
        },
        clearSite: function() {
            this.stationInput.val("")
        },
        qRequest: function(i, n, o, a) {
            {
                var d = this;
                curConfig.curSLines
            }
            if ("undefined" == typeof a ? (sy = 0, noAnimation = !1) : (sy = a, noAnimation = !0), bCenter = 1 === o ? !0 : !1, i instanceof Object && i.uid) sn = "0$$" + i.uid + "$$" + i.mcX + "," + i.mcY + "$$" + encodeURIComponent(i.name) + "$$";
            else {
                var r = d.curSubwayData.stationHash,
                    g = r[i] || {};
                sn = "0$$" + (g.uid || "") + "$$" + g.px + "," + g.py + "$$" + encodeURIComponent(i) + "$$"
            }
            if (n instanceof Object && n.uid) en = "0$$" + n.uid + "$$" + n.mcX + "," + n.mcY + "$$" + encodeURIComponent(n.name) + "$$";
            else {
                var r = d.curSubwayData.stationHash,
                    t = r[n] || {};
                en = "0$$" + (t.uid || "") + "$$" + t.px + "," + t.py + "$$" + encodeURIComponent(n) + "$$"
            }
            var l = MapConfig.cityCode;
            curConfig.curReqUrl = MapConfig.btUrl + "&newmap=1&ie=utf-8&f=[1,12,13,14]&c=" + l + "&sn=" + sn + "&en=" + en + "&m=sbw&ccode=" + l + "&from=dtzt&sy=" + sy + "&t=" + (new Date).getTime(), curConfig.curReqUrl && this.reqTransData(curConfig.curReqUrl, bCenter, noAnimation)
        },
        reqTransData: function(i, n, o) {
            listener.trigger("loading", "start");
            var a = this,
                d = function(i) {
                    return !i || !i.content || i.content.length < 1 || !i.result || 14 !== i.result.type || 0 !== i.result.error ? (a.setNoResult(), void listener.trigger("loading", "end")) : void require.async("common:widget/ui/SubwayCard/SubwayCard.js", function(d) {
                        var r = new d({
                            json: i,
                            svgRenderer: a.svgRenderer,
                            bCenter: n
                        });
                        cardMgr.add(r, {
                            staticExpand: o
                        }), listener.trigger("loading", "end")
                    })
                };
            baidu.ajax(i, {
                dataType: "json",
                method: "GET",
                success: function(i) {
                    d(i)
                },
                error: function() {}
            }), addStat("com.subway.query", "click"), listener.trigger("com.subway", "linequery", {
                req: i
            })
        },
        site_q: function(i) {
            var n = this;
            if (!n.curSubwayData) return void toast.show("此站点不存在！");
            var o = MapConfig.cityCode,
                a = n.curSubwayData.stationHash[i] || {};
            if (!a.uid) return void toast.show("此站点不存在！");
            var d = MapConfig.infUrl + "&newmap=1&it=3&uid=" + a.uid + "&ie=utf-8&f=[1,12,13]&c=" + o + "&m=sbw&ccode=" + o + "&t=" + (new Date).getTime();
            baidu.ajax(d, {
                dataType: "json",
                method: "GET",
                success: function(i) {
                    i && i.content && null != i.content.ext ? (n.siteResult(i), n.svgRenderer.searchStationInfo(a.uid)) : toast.show("此站点不存在！")
                },
                error: function() {
                    toast.show("此站点不存在！")
                }
            }), addStat("com.subway.query", "click")
        },
        siteResult: function(i) {
            i.content.name;
            require.async("common:widget/ui/SubwayStationCard/SubwayStationCard.js", function(n) {
                var o = new n({
                    json: i
                });
                cardMgr.add(o)
            })
        },
        setNoResult: function() {
            var i = searchbox.getState().subData;
            toast.show("没有找到“" + i.start + "”和“" + i.end + "”之间的路线")
        },
        selectCity: function() {
            var i = "北京市",
                n = this;
            MapConfig.curCIndex && (i = subConfig[MapConfig.curCIndex].cname), baidu.g("toolCurCity").innerHTML = i;
            var o = {
                x: 465,
                y: 54
            };
            this.selCityPop ? this.selCityPop.show() : require.async("common:widget/com/Subway/SelectCity.js", function(a) {
                n.selCityPop = new a({
                    title: "城市列表",
                    content: "",
                    height: 190,
                    width: 350,
                    x: o.x,
                    y: o.y,
                    clickClose: !0,
                    close: function() {
                        n.selCityPop && (n.selCityPop = null)
                    },
                    curName: i
                }), n.selCityPop.show(), T("#toolCurCity .arrow-flag").removeClass("down").addClass("up")
            })
        },
        switchCity: function() {
            MapConfig.curCIndex = sbwUtil.getCityIndex(this.cInfo.ccode);
            var i = this,
                n = parseInt(MapConfig.curCIndex);
            if (!(0 > n || n > subConfig.length)) {
                var o = subConfig[n].cname || "北京市",
                    a = subConfig[n].ccode || 131;
                MapConfig.curCIndex = n, MapConfig.cityName = o, MapConfig.cityCode = a, this.clearSearch(), this.clearSite();
                var i = this;
                if (curConfig.subwayData[a]) {
                    var d = curConfig.subwayData[a];
                    i.renderSubway(d), i.curSubwayData = d
                } else this.loadSubwayData(a).then(function(n) {
                    var o = sbwUtil.parseData(n);
                    o.ccode = a, o && (curConfig.subwayData[a] = o, i.renderSubway(o), i.curSubwayData = o)
                })
            }
        },
        renderSubway: function(i) {
            try {
                var n = this.svgRenderer;
                n.initialize(this.sbwMap, i)
            } catch (o) {
                "undefined" != typeof alog && alog("exception.fire", "catch", {
                    msg: o.message || o.description,
                    path: "common:widget/com/Subway/Subway.js",
                    ln: 458
                })
            }
        },
        loadSubwayData: function(i) {
            var n = new Promise(function(n, o) {
                var a = MapConfig.sbwUrl + "&c=" + i + "&format=json&t=" + (new Date).getTime();
                T.jsonp(a, function(i) {
                    i ? n(i) : o()
                })
            });
            return n
        }
    }), module.exports = Subway
});