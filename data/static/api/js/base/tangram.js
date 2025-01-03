window._bd_share_main.F.module("base/tangram", function(e, t) {
    var n, r = n = function() {
        var e, t = e = t || function(e, n) {
            return t.dom ? t.dom(e, n) : null
        };
        t.version = "2.0.2.5", t.guid = "$BAIDU$", t.key = "tangram_guid";
        var n = window[t.guid] = window[t.guid] || {};
        return (n.versions || (n.versions = [])).push(t.version), t.check = t.check || function() {}, t.lang = t.lang || {}, t.forEach = function(e, t, n) {
            var r, i, s;
            if (typeof t == "function" && e) {
                i = typeof e.length == "number" ? e.length : e.byteLength;
                if (typeof i == "number") {
                    if (Object.prototype.toString.call(e) === "[object Function]") return e;
                    for (r = 0; r < i; r++) s = e[r], s === undefined && (s = e.charAt && e.charAt(r)), t.call(n || null, s, r, e)
                } else if (typeof e == "number")
                    for (r = 0; r < e; r++) t.call(n || null, r, r, r);
                else if (typeof e == "object")
                    for (r in e) e.hasOwnProperty(r) && t.call(n || null, e[r], r, e)
            }
            return e
        }, t.type = function() {
            var e = {},
                n = [, "HTMLElement", "Attribute", "Text", , , , , "Comment", "Document", , "DocumentFragment"],
                r = "Array Boolean Date Error Function Number RegExp String",
                i = {
                    object: 1,
                    "function": "1"
                },
                s = e.toString;
            return t.forEach(r.split(" "), function(n) {
                    e["[object " + n + "]"] = n.toLowerCase(), t["is" + n] = function(e) {
                        return t.type(e) == n.toLowerCase()
                    }
                }),
                function(t) {
                    var r = typeof t;
                    return i[r] ? t == null ? "null" : t._type_ || e[s.call(t)] || n[t.nodeType] || (t == t.window ? "Window" : "") || "object" : r
                }
        }(), t.isDate = function(e) {
            return t.type(e) == "date" && e.toString() != "Invalid Date" && !isNaN(e)
        }, t.isElement = function(e) {
            return t.type(e) == "HTMLElement"
        }, t.isEnumerable = function(e) {
            return e != null && (typeof e == "object" || ~Object.prototype.toString.call(e).indexOf("NodeList")) && (typeof e.length == "number" || typeof e.byteLength == "number" || typeof e[0] != "undefined")
        }, t.isNumber = function(e) {
            return t.type(e) == "number" && isFinite(e)
        }, t.isPlainObject = function(e) {
            var n, r = Object.prototype.hasOwnProperty;
            if (t.type(e) != "object") return !1;
            if (e.constructor && !r.call(e, "constructor") && !r.call(e.constructor.prototype, "isPrototypeOf")) return !1;
            for (n in e);
            return n === undefined || r.call(e, n)
        }, t.isObject = function(e) {
            return typeof e == "function" || typeof e == "object" && e != null
        }, t.extend = function(e, n) {
            var r, i, s, o, u, a = 1,
                f = arguments.length,
                l = e || {},
                c, h;
            t.isBoolean(e) && (a = 2) && (l = n || {}), !t.isObject(l) && (l = {});
            for (; a < f; a++) {
                i = arguments[a];
                if (t.isObject(i))
                    for (s in i) {
                        o = l[s], u = i[s];
                        if (o === u) continue;
                        t.isBoolean(e) && e && u && (t.isPlainObject(u) || (c = t.isArray(u))) ? (c ? (c = !1, h = o && t.isArray(o) ? o : []) : h = o && t.isPlainObject(o) ? o : {}, l[s] = t.extend(e, h, u)) : u !== undefined && (l[s] = u)
                    }
            }
            return l
        }, t.createChain = function(e, n, r) {
            var i = e == "dom" ? "$DOM" : "$" + e.charAt(0).toUpperCase() + e.substr(1),
                s = Array.prototype.slice,
                o = t[e];
            return o ? o : (o = t[e] = n || function(n) {
                return t.extend(n, t[e].fn)
            }, o.extend = function(n) {
                var r;
                for (r in n)(function(n) {
                    n != "splice" && (o[n] = function() {
                        var r = arguments[0];
                        e == "dom" && t.type(r) == "string" && (r = "#" + r);
                        var i = o(r),
                            u = i[n].apply(i, s.call(arguments, 1));
                        return t.type(u) == "$DOM" ? u.get(0) : u
                    })
                })(r);
                return t.extend(t[e].fn, n)
            }, t[e][i] = t[e][i] || r || function() {}, o.fn = t[e][i].prototype, o)
        }, t.overwrite = function(e, t, n) {
            for (var r = t.length - 1; r > -1; r--) e.prototype[t[r]] = n(t[r]);
            return e
        }, t.object = t.object || {}, t.object.isPlain = t.isPlainObject, t.createChain("string", function(e) {
            var n = t.type(e),
                r = new String(~"string|number".indexOf(n) ? e : n),
                i = String.prototype;
            return t.forEach(t.string.$String.prototype, function(e, t) {
                i[t] || (r[t] = e)
            }), r
        }), t.string.extend({
            trim: function() {
                var e = new RegExp("(^[\\s\\t\\xa0\\u3000]+)|([\\u3000\\xa0\\s\\t]+$)", "g");
                return function() {
                    return this.replace(e, "")
                }
            }()
        }), t.createChain("array", function(e) {
            var n = t.array.$Array.prototype,
                r = Array.prototype,
                i;
            t.type(e) != "array" && (e = []);
            for (i in n) e[i] = n[i];
            return e
        }), t.overwrite(t.array.$Array, "concat slice".split(" "), function(e) {
            return function() {
                return t.array(Array.prototype[e].apply(this, arguments))
            }
        }), t.array.extend({
            indexOf: function(e, n) {
                t.check(".+(,number)?", "baidu.array.indexOf");
                var r = this.length;
                (n |= 0) < 0 && (n = Math.max(0, r + n));
                for (; n < r; n++)
                    if (n in this && this[n] === e) return n;
                return -1
            }
        }), t.createChain("Callbacks", function(e) {
            var n = e;
            return t.type(e) === "string" && (n = {}, t.forEach(e.split(/\s/), function(e) {
                n[e] = !0
            })), new t.Callbacks.$Callbacks(n)
        }, function(e) {
            var n = t.extend({}, e || {}),
                r = [],
                i = [],
                s = 0,
                o, u, a, f, l = function(e, t) {
                    var u, l;
                    if (!i || !r) return;
                    o = n.memory && e, a = !0, i.push(e);
                    if (f) return;
                    f = !0;
                    while (u = i.shift())
                        for (s = t || 0; l = r[s]; s++)
                            if (l.apply(u[0], u[1]) === !1 && n.stopOnFalse) {
                                o = !1;
                                break
                            }
                    f = !1, n.once && (r = [])
                },
                c = {
                    add: function() {
                        if (!r) return this;
                        var e = r && r.length;
                        return function i(e) {
                            var s = e.length,
                                o, u;
                            for (var a = 0, u; a < s; a++) {
                                if (!(u = e[a])) continue;
                                o = t.type(u), o === "function" ? (!n.unique || !c.has(u)) && r.push(u) : u && u.length && o !== "string" && i(u)
                            }
                        }(arguments), !f && o && l(o, e), this
                    },
                    remove: function() {
                        if (!r) return this;
                        var e;
                        return t.forEach(arguments, function(n) {
                            while ((e = t.array(r).indexOf(n)) > -1) r.splice(e, 1), f && e < s && s--
                        }), this
                    },
                    has: function(e) {
                        return t.array(r).indexOf(e) > -1
                    },
                    empty: function() {
                        return r = [], this
                    },
                    disable: function() {
                        return r = i = o = undefined, this
                    },
                    disabled: function() {
                        return !r
                    },
                    lock: function() {
                        return u = !0, !o && c.disable(), this
                    },
                    fired: function() {
                        return a
                    },
                    fireWith: function(e, t) {
                        return a && n.once || u ? this : (t = t || [], t = [e, t.slice ? t.slice() : t], l(t), this)
                    },
                    fire: function() {
                        return c.fireWith(this, arguments), this
                    }
                };
            return c
        }), t.createChain("Deferred", function(e) {
            return new t.Deferred.$Deferred(e)
        }, function(e) {
            var n = this,
                r = "pending",
                i = [
                    ["resolve", "done", t.Callbacks("once memory"), "resolved"],
                    ["reject", "fail", t.Callbacks("once memory"), "rejected"],
                    ["notify", "progress", t.Callbacks("memory")]
                ],
                s = {
                    state: function() {
                        return r
                    },
                    always: function() {
                        return n.done(arguments).fail(arguments), this
                    },
                    then: function() {
                        var e = arguments;
                        return t.Deferred(function(r) {
                            t.forEach(i, function(i, s) {
                                var o = i[0],
                                    u = e[s];
                                n[i[1]](t.type(u) === "function" ? function() {
                                    var e = u.apply(this, arguments);
                                    e && t.type(e.promise) === "function" ? e.promise().done(r.resolve).fail(r.reject).progress(r.notify) : r[o + "With"](this === n ? r : this, [e])
                                } : r[o])
                            })
                        }).promise()
                    },
                    promise: function(e) {
                        return e != null ? t.extend(e, s) : s
                    }
                };
            s.pipe = s.then, t.forEach(i, function(e, t) {
                var o = e[2],
                    u = e[3];
                s[e[1]] = o.add, u && o.add(function() {
                    r = u
                }, i[t ^ 1][2].disable, i[2][2].lock), n[e[0]] = o.fire, n[e[0] + "With"] = o.fireWith
            }), s.promise(n), e && e.call(n, n)
        }), t.when = t.when || function(e) {
            function f(e, t, n) {
                return function(r) {
                    t[e] = this, n[e] = arguments.length > 1 ? arguments : r, n === o ? s.notifyWith(t, n) : --i || s.resolveWith(t, n)
                }
            }
            var n = arguments,
                r = arguments.length,
                i = r !== 1 || e && t.type(e.promise) === "function" ? r : 0,
                s = i === 1 ? e : t.Deferred(),
                o, u, a;
            if (r > 1) {
                o = new Array(r), u = new Array(r), a = new Array(r);
                for (var l = 0; l < r; l++) n[l] && t.type(n[l].promise) === "function" ? n[l].promise().done(f(l, a, n)).fail(s.reject).progress(f(l, u, o)) : --i
            }
            return !i && s.resolveWith(a, n), s.promise()
        }, t.global = t.global || function() {
            var e = t._global_ = window[t.guid],
                n = e._ = e._ || {};
            return function(e, t, r) {
                return typeof t != "undefined" ? (r || (t = typeof n[e] == "undefined" ? t : n[e]), n[e] = t) : e && typeof n[e] == "undefined" && (n[e] = {}), n[e]
            }
        }(), t.browser = t.browser || function() {
            var e = navigator.userAgent,
                n = {
                    isStrict: document.compatMode == "CSS1Compat",
                    isGecko: /gecko/i.test(e) && !/like gecko/i.test(e),
                    isWebkit: /webkit/i.test(e)
                };
            try {
                /(\d+\.\d+)/.test(external.max_version) && (n.maxthon = +RegExp.$1)
            } catch (r) {}
            switch (!0) {
                case /msie (\d+\.\d+)/i.test(e):
                    n.ie = document.documentMode || +RegExp.$1;
                    break;
                case /chrome\/(\d+\.\d+)/i.test(e):
                    n.chrome = +RegExp.$1;
                    break;
                case /(\d+\.\d)?(?:\.\d)?\s+safari\/?(\d+\.\d+)?/i.test(e) && !/chrome/i.test(e):
                    n.safari = +(RegExp.$1 || RegExp.$2);
                    break;
                case /firefox\/(\d+\.\d+)/i.test(e):
                    n.firefox = +RegExp.$1;
                    break;
                case /opera(?:\/| )(\d+(?:\.\d+)?)(.+?(version\/(\d+(?:\.\d+)?)))?/i.test(e):
                    n.opera = +(RegExp.$4 || RegExp.$1)
            }
            return t.extend(t, n), n
        }(), t.id = function() {
            var e = t.global("_maps_id"),
                n = t.key;
            return window[t.guid]._counter = window[t.guid]._counter || 1,
                function(r, i) {
                    var s, o = t.isString(r),
                        u = t.isObject(r),
                        a = u ? r[n] : o ? r : "";
                    if (t.isString(i)) switch (i) {
                        case "get":
                            return u ? a : e[a];
                        case "remove":
                        case "delete":
                            if (s = e[a]) t.isElement(s) && t.browser.ie < 8 ? s.removeAttribute(n) : delete s[n], delete e[a];
                            return a;
                        default:
                            return o ? ((s = e[a]) && delete e[a], s && (e[s[n] = i] = s)) : u && (a && delete e[a], e[r[n] = i] = r), i
                    }
                    return u ? (!a && (e[r[n] = a = t.id()] = r), a) : o ? e[r] : "TANGRAM_" + t._global_._counter++
                }
        }(), t._util_ = t._util_ || {}, t._util_.support = t._util_.support || function() {
            var e = document.createElement("div"),
                t, n, r, i, s;
            return e.setAttribute("className", "t"), e.innerHTML = ' <link/><table></table><a href="/a">a</a><input type="checkbox"/>', n = e.getElementsByTagName("A")[0], n.style.cssText = "top:1px;float:left;opacity:.5", i = document.createElement("select"), s = i.appendChild(document.createElement("option")), r = e.getElementsByTagName("input")[0], r.checked = !0, t = {
                dom: {
                    div: e,
                    a: n,
                    select: i,
                    opt: s,
                    input: r
                }
            }, t
        }(), t.createChain("event", function() {
            var e = {};
            return function(n, r) {
                switch (t.type(n)) {
                    case "object":
                        return e.originalEvent === n ? e : e = new t.event.$Event(n);
                    case "$Event":
                        return n
                }
            }
        }(), function(e) {
            var n, r, i, s = this;
            this._type_ = "$Event";
            if (typeof e == "object" && e.type) {
                s.originalEvent = n = e;
                for (var o in n) typeof n[o] != "function" && (s[o] = n[o]);
                n.extraData && t.extend(s, n.extraData), s.target = s.srcElement = n.srcElement || (r = n.target) && (r.nodeType == 3 ? r.parentNode : r), s.relatedTarget = n.relatedTarget || (r = n.fromElement) && (r === s.target ? n.toElement : r), s.keyCode = s.which = n.keyCode || n.which, !s.which && n.button !== undefined && (s.which = n.button & 1 ? 1 : n.button & 2 ? 3 : n.button & 4 ? 2 : 0);
                var u = document.documentElement,
                    a = document.body;
                s.pageX = n.pageX || n.clientX + (u && u.scrollLeft || a && a.scrollLeft || 0) - (u && u.clientLeft || a && a.clientLeft || 0), s.pageY = n.pageY || n.clientY + (u && u.scrollTop || a && a.scrollTop || 0) - (u && u.clientTop || a && a.clientTop || 0), s.data
            }
            this.timeStamp = (new Date).getTime()
        }).extend({
            stopPropagation: function() {
                var e = this.originalEvent;
                e && (e.stopPropagation ? e.stopPropagation() : e.cancelBubble = !0)
            },
            preventDefault: function() {
                var e = this.originalEvent;
                e && (e.preventDefault ? e.preventDefault() : e.returnValue = !1)
            }
        }), t.merge = function(e, t) {
            var n = e.length,
                r = 0;
            if (typeof t.length == "number")
                for (var i = t.length; r < i; r++) e[n++] = t[r];
            else
                while (t[r] !== undefined) e[n++] = t[r++];
            return e.length = n, e
        }, t.array.extend({
            unique: function(e) {
                var t = this.length,
                    n = this.slice(0),
                    r, i;
                "function" != typeof e && (e = function(e, t) {
                    return e === t
                });
                while (--t > 0) {
                    i = n[t], r = t;
                    while (r--)
                        if (e(i, n[r])) {
                            n.splice(t, 1);
                            break
                        }
                }
                t = this.length = n.length;
                for (r = 0; r < t; r++) this[r] = n[r];
                return this
            }
        }), t.query = t.query || function() {
            function f(n, o) {
                var u, a, f, l, c, h, p, d, v = [];
                return e.test(n) ? (f = RegExp.$2, c = RegExp.$1 || "*", t.forEach(o.getElementsByTagName(c), function(e) {
                    e.id == f && v.push(e)
                })) : r.test(n) || n == "*" ? t.merge(v, o.getElementsByTagName(n)) : i.test(n) ? (p = [], c = RegExp.$1, h = RegExp.$2, u = " " + h + " ", o.getElementsByClassName ? p = o.getElementsByClassName(h) : t.forEach(o.getElementsByTagName("*"), function(e) {
                    e.className && ~(" " + e.className + " ").indexOf(u) && p.push(e)
                }), c && (c = c.toUpperCase()) ? t.forEach(p, function(e) {
                    e.tagName.toUpperCase() === c && v.push(e)
                }) : t.merge(v, p)) : s.test(n) && (d = n.substr(1).split("."), t.forEach(o.getElementsByTagName("*"), function(e) {
                    e.className && (u = " " + e.className + " ", a = !0, t.forEach(d, function(e) {
                        ~u.indexOf(" " + e + " ") || (a = !1)
                    }), a && v.push(e))
                })), v
            }

            function l(e, r) {
                var i, s = e,
                    o = "__tangram__",
                    u = [];
                return !r && n.test(s) && (i = document.getElementById(s.substr(1))) ? [i] : (r = r || document, r.querySelectorAll ? (r.nodeType == 1 && !r.id ? (r.id = o, i = r.querySelectorAll("#" + o + " " + s), r.id = "") : i = r.querySelectorAll(s), i) : ~s.indexOf(" ") ? (t.forEach(f(s.substr(0, s.indexOf(" ")), r), function(e) {
                    t.merge(u, l(s.substr(s.indexOf(" ") + 1), e))
                }), u) : f(s, r))
            }
            var e = /^(\w*)#([\w\-\$]+)$/,
                n = /^#([\w\-\$]+)$/,
                r = /^\w+$/,
                i = /^(\w*)\.([\w\-\$]+)$/,
                s = /^(\.[\w\-\$]+)+$/,
                o = /\s*,\s*/,
                u = /\s+/g,
                a = Array.prototype.slice;
            return function(e, n, r) {
                if (!e || typeof e != "string") return r || [];
                var i = [];
                return e = e.replace(u, " "), r && t.merge(i, r) && (r.length = 0), t.forEach(e.indexOf(",") > 0 ? e.split(o) : [e], function(e) {
                    t.merge(i, l(e, n))
                }), t.merge(r || [], t.array(i).unique())
            }
        }(), t.createChain("dom", function(e, n) {
            var r, i = new t.dom.$DOM(n);
            if (!e) return i;
            if (e._type_ == "$DOM") return e;
            if (e.nodeType || e == e.window) return i[0] = e, i.length = 1, i;
            if (e.length && i.toString.call(e) != "[object String]") return t.merge(i, e);
            if (typeof e == "string")
                if (e.charAt(0) == "<" && e.charAt(e.length - 1) == ">" && e.length > 2) {
                    var s = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
                        o = n && n._type_ === "$DOM" ? n[0] : n,
                        u = s.exec(e);
                    o = o && o.nodeType ? o.ownerDocument || o : document, u = u ? [o.createElement(u[1])] : t.dom.createElements ? t.dom.createElements(e) : [], t.merge(i, u)
                } else t.query(e, n, i);
            else if (typeof e == "function") return i.ready ? i.ready(e) : i;
            return i
        }, function(e) {
            this.length = 0, this._type_ = "$DOM", this.context = e || document
        }).extend({
            size: function() {
                return this.length
            },
            splice: function() {},
            get: function(e) {
                return typeof e == "number" ? e < 0 ? this[this.length + e] : this[e] : Array.prototype.slice.call(this, 0)
            },
            toArray: function() {
                return this.get()
            }
        }), t.dom.extend({
            each: function(e) {
                t.check("function", "baidu.dom.each");
                var n, r, i = this.length;
                for (n = 0; n < i; n++) {
                    r = e.call(this[n], n, this[n], this);
                    if (r === !1 || r == "break") break
                }
                return this
            }
        }), t._util_.eventBase = t._util_.eventBase || {}, void
        function(e, t) {
            if (e.listener) return;
            t = e.listener = {}, window.addEventListener ? t.add = function(e, t, n) {
                e.addEventListener(t, n, !1)
            } : window.attachEvent && (t.add = function(e, t, n) {
                e.attachEvent("on" + t, n)
            })
        }(t._util_.eventBase), void
        function(e, n) {
            if (e.queue) return;
            var r = t.id,
                i = e.queue = {},
                s = i.attaCache = t.global("eventQueueCache"),
                o = e.listener;
            i.get = function(e, t, n, i) {
                var o = r(e),
                    u;
                return s[o] || (s[o] = {}), u = s[o], t ? (!u[t] && n && this.setupCall(e, t, n, u[t] = [], i), u[t] || []) : u
            }, i.add = function(e, t, n, r, i) {
                this.get(e, t, n, i).push(r)
            }, i.remove = function(e, t, n) {
                var r, i;
                if (t) {
                    var r = this.get(e, t);
                    if (n)
                        for (var s = r.length - 1; s >= 0; s--) r[s].orig == n && r.splice(s, 1);
                    else r.length = 0
                } else {
                    var i = this.get(e);
                    for (var s in i) i[s].length = 0
                }
            }, i.handlerList = function(e, n) {
                var r = [];
                for (var i = 0, s; s = n[i]; i++) {
                    if (s.delegate && t.dom(s.delegate, e).size() < 1) continue;
                    r.push(s)
                }
                return r
            }, i.call = function(e, n, r, s) {
                if (r) {
                    if (!r.length) return;
                    var o = [].slice.call(arguments, 1),
                        u = [];
                    o.unshift(s = t.event(s || n)), s.type = n, s.currentTarget || (s.currentTarget = e), s.target || (s.target = e), r = i.handlerList(e, r);
                    for (var a = 0, f, l = r.length; a < l; a++)
                        if (f = r[a]) f.pkg.apply(e, o), f.one && u.unshift(a);
                    if (u.length)
                        for (var a = 0, l = u.length; a < l; a++) this.remove(e, n, r[a].fn)
                } else r = this.get(e, n), this.call(e, n, r, s)
            }, i.setupCall = function() {
                var e = function(e, t, n, r) {
                    o.add(e, n, function(n) {
                        i.call(e, t, r, n)
                    })
                };
                return function(n, r, i, s, o) {
                    if (!o) e(n, r, i, s);
                    else {
                        n = t.dom(o, n);
                        for (var u = 0, a = n.length; u < a; u++) e(n[u], r, i, s)
                    }
                }
            }()
        }(t._util_.eventBase, t.event), void
        function(e, n) {
            if (e.core) return;
            var r = e.queue,
                i = e.core = {},
                s = n.special = {},
                o = [].push,
                u = function(e, t) {
                    for (var n = 0, r = t.length; n < r; n++)
                        if (t.get(n).contains(e)) return t[n]
                };
            i.build = function(e, n, r, i, a) {
                var f;
                return i && (f = t.dom(i, e)), n in s && s[n].pack && (r = s[n].pack(r)),
                    function(n) {
                        var s = t.dom(n.target),
                            l = [n],
                            c;
                        a && !n.data && (n.data = a), n.triggerData && o.apply(l, n.triggerData);
                        if (!f) return n.result = r.apply(e, l);
                        for (var h = 0; h < 2; h++) {
                            if (c = u(n.target, f)) return n.result = r.apply(c, l);
                            f = t.dom(i, e)
                        }
                    }
            }, i.add = function(e, t, n, i, o, u) {
                var a = this.build(e, t, n, i, o),
                    f, l;
                l = t, t in s && (f = s[t].attachElements, l = s[t].bindType || t), r.add(e, t, l, {
                    type: t,
                    pkg: a,
                    orig: n,
                    one: u,
                    delegate: i
                }, f)
            }, i.remove = function(e, t, n, i) {
                r.remove(e, t, n, i)
            }
        }(t._util_.eventBase, t.event), t.dom.extend({
            on: function(e, n, r, i, s) {
                var o = t._util_.eventBase.core;
                return typeof n == "object" && n ? (i = r, r = n, n = null) : typeof r == "function" ? (i = r, r = null) : typeof n == "function" && (i = n, n = r = null), typeof e == "string" ? (e = e.split(/[ ,]+/), this.each(function() {
                    t.forEach(e, function(e) {
                        o.add(this, e, i, n, r, s)
                    }, this)
                })) : typeof e == "object" && (i && (i = null), t.forEach(e, function(e, t) {
                    this.on(t, n, r, e, s)
                }, this)), this
            }
        }), t.dom.g = function(e) {
            return e ? "string" == typeof e || e instanceof String ? document.getElementById(e) : !e.nodeName || e.nodeType != 1 && e.nodeType != 9 ? null : e : null
        }, t.event.on = t.on = function(e, n, r) {
            return typeof e == "string" && (e = t.dom.g(e)), t.dom(e).on(n.replace(/^\s*on/, ""), r), e
        }, void
        function() {
            function w(e) {
                var n, r;
                if (!e || t.type(e) !== "string") return null;
                try {
                    window.DOMParser ? (r = new DOMParser, n = r.parseFromString(e, "text/xml")) : (n = new ActiveXObject("Microsoft.XMLDOM"), n.async = "false", n.loadXML(e))
                } catch (i) {
                    n = undefined
                }
                if (!n || !n.documentElement || n.getElementsByTagName("parsererror").length) throw new Error("Invalid XML: " + e);
                return n
            }

            function E(e) {
                if (!e || t.type(e) !== "string") return null;
                e = t.string(e).trim();
                if (window.JSON && window.JSON.parse) return window.JSON.parse(e);
                if (l.test(e.replace(h, "@").replace(p, "]").replace(c, ""))) return (new Function("return " + e))();
                throw new Error("Invalid JSON: " + e)
            }

            function S(e) {
                e && /\S/.test(e) && (window.execScript || function(e) {
                    window.eval.call(window, e)
                })(e)
            }

            function x(e) {
                return function(n, r) {
                    t.type(n) !== "string" && (r = n, n = "*");
                    var i = n.toLowerCase().split(/\s+/),
                        s, o;
                    if (t.type(r) === "function")
                        for (var u = 0, a; a = i[u]; u++) s = /^\+/.test(a), s && (a = a.substr(1) || "*"), o = e[a] = e[a] || [], o[s ? "unshift" : "push"](r)
                }
            }

            function T(e, t, n) {
                var r, i, s, o, u = e.contents,
                    a = e.dataTypes,
                    f = e.responseFields;
                for (i in f) i in n && (t[f[i]] = n[i]);
                while (a[0] === "*") a.shift(), r === undefined && (r = e.mimeType || t.getResponseHeader("content-type"));
                if (r)
                    for (i in u)
                        if (u[i] && u[i].test(r)) {
                            a.unshift(i);
                            break
                        }
                if (a[0] in n) s = a[0];
                else {
                    for (i in n) {
                        if (!a[0] || e.converters[i + " " + a[0]]) {
                            s = i;
                            break
                        }
                        o || (o = i)
                    }
                    s = s || o
                }
                if (s) return s !== a[0] && a.unshift(s), n[s]
            }

            function N(e, t) {
                var n = e.dataTypes.slice(),
                    r = n[0],
                    i = {},
                    s, o;
                e.dataFilter && (t = e.dataFilter(t, e.dataType));
                if (n[1])
                    for (var u in e.converters) i[u.toLowerCase()] = e.converters[u];
                for (var u = 0, a; a = n[++u];)
                    if (a !== "*") {
                        if (r !== "*" && r !== a) {
                            s = i[r + " " + a] || i["* " + a];
                            if (!s)
                                for (var f in i) {
                                    o = f.split(" ");
                                    if (o[1] === a) {
                                        s = i[r + " " + o[0]] || i["* " + o[0]];
                                        if (s) {
                                            s === !0 ? s = i[f] : i[f] !== !0 && (a = o[0], n.splice(u--, 0, a));
                                            break
                                        }
                                    }
                                }
                            if (s !== !0)
                                if (s && e["throws"]) t = s(t);
                                else try {
                                    t = s(t)
                                } catch (l) {
                                    return {
                                        state: "parsererror",
                                        error: s ? l : "No conversion from " + r + " to " + a
                                    }
                                }
                        }
                        r = a
                    }
                return {
                    state: "success",
                    data: t
                }
            }

            function C(e, t, n, r, i, s) {
                i = i || t.dataTypes[0], s = s || {}, s[i] = !0;
                var o, u = e[i],
                    a = u ? u.length : 0,
                    f = e === v;
                for (var l = 0; l < a && (f || !o); l++) o = u[l](t, n, r), typeof o == "string" && (!f || s[o] ? o = undefined : (t.dataTypes.unshift(o), o = C(e, t, n, r, o, s)));
                return (f || !o) && !s["*"] && (o = C(e, t, n, r, "*", s)), o
            }

            function k(e, n) {
                var r = t.ajax.settings.flatOptions || {},
                    i;
                for (var s in n) n[s] !== undefined && ((r[s] ? e : i || (i = {}))[s] = n[s]);
                i && t.extend(!0, e, i)
            }

            function L(e, n, r) {
                r = t.type(r) === "function" ? r() : typeof r == "undefined" || r == null ? "" : r, e.push(encodeURIComponent(n) + "=" + encodeURIComponent(r))
            }

            function A(e, n, r, i) {
                if (t.type(r) === "array") t.forEach(r, function(t, r) {
                    i || o.test(n) ? L(e, n, t) : A(e, n + "[" + (typeof t == "object" ? r : "") + "]", t, i)
                });
                else if (!i && t.type(r) === "object")
                    for (var s in r) A(e, n + "[" + s + "]", r[s], i);
                else L(e, n, r)
            }

            function B() {
                try {
                    return new window.XMLHttpRequest
                } catch (e) {}
            }

            function j() {
                try {
                    return new window.ActiveXObject("Microsoft.XMLHTTP")
                } catch (e) {}
            }
            var e = document.URL,
                n = /^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/,
                r = /^\/\//,
                i = /^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,
                s = /#.*$/,
                o = /\[\]$/,
                u = /^(?:GET|HEAD)$/,
                a = /([?&])_=[^&]*/,
                f = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg,
                l = /^[\],:{}\s]*$/,
                c = /(?:^|:|,)(?:\s*\[)+/g,
                h = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,
                p = /"[^"\\\r\n]*"|true|false|null|-?(?:\d\d*\.|)\d+(?:[eE][\-+]?\d+|)/g,
                d = ["*/"] + ["*"],
                v = {},
                m = {},
                g = {},
                y = {},
                b = i.exec(e.toLowerCase()) || [];
            t.createChain("ajax", function(e, n) {
                function H(e, t, n, r) {
                    var i = t,
                        s, u, a, f, c;
                    if (x === 2) return;
                    x = 2, P && clearTimeout(P), _ = undefined, O = r || "", D.readyState = e > 0 ? 4 : 0, n && (f = T(o, D, n));
                    if (e >= 200 && e < 300 || e === 304) o.ifModified && (c = D.getResponseHeader("Last-Modified"), c && (g[h] = c), c = D.getResponseHeader("Etag"), c && (y[h] = c)), e === 304 ? (i = "notmodified", s = !0) : (s = N(o, f), i = s.state, u = s.data, a = s.error, s = !a);
                    else {
                        a = i;
                        if (!i || e) i = "error", e < 0 && (e = 0)
                    }
                    D.status = e, D.statusText = "" + (t || i), s ? w.resolveWith(l, [u, i, D]) : w.rejectWith(l, [D, i, a]), D.statusCode(S), S = undefined, E.fireWith(l, [D, i])
                }
                t.object.isPlain(e) && (n = e, e = undefined), n = n || {};
                var o = t.ajax.setup({}, n),
                    l = o.context || o,
                    c, h, p, w = t.Deferred(),
                    E = t.Callbacks("once memory"),
                    S = o.statusCode || {},
                    x = 0,
                    k = {},
                    L = {},
                    A = "canceled",
                    O, M, _, D = t.extend(new t.ajax.$Ajax(e, o), {
                        readyState: 0,
                        setRequestHeader: function(e, t) {
                            if (!x) {
                                var n = e.toLowerCase();
                                e = k[n] = k[n] || e, L[e] = t
                            }
                        },
                        getAllResponseHeaders: function() {
                            return x === 2 ? O : null
                        },
                        getResponseHeader: function(e) {
                            var t;
                            if (x === 2) {
                                if (!M) {
                                    M = {};
                                    while (t = f.exec(O)) M[t[1].toLowerCase()] = t[2]
                                }
                                t = M[e.toLowerCase()]
                            }
                            return t === undefined ? null : t
                        },
                        overrideMimeType: function(e) {
                            return !x && (o.mimeType = e), this
                        },
                        abort: function(e) {
                            return e = e || A, _ && _.abort(e), H(0, e), this
                        }
                    }),
                    P;
                w.promise(D), D.success = D.done, D.error = D.fail, D.complete = E.add, D.statusCode = function(e) {
                    if (e)
                        if (x < 2)
                            for (var t in e) S[t] = [S[t], e[t]];
                        else D.always(e[D.status]);
                    return this
                }, o.url = ((e || o.url) + "").replace(s, "").replace(r, b[1] + "//"), o.dataTypes = t.string(o.dataType || "*").trim().toLowerCase().split(/\s+/), o.crossDomain == null && (p = i.exec(o.url.toLowerCase()), o.crossDomain = !(!p || p[1] == b[1] && p[2] == b[2] && (p[3] || (p[1] === "http:" ? 80 : 443)) == (b[3] || (b[1] === "http:" ? 80 : 443)))), o.data && o.processData && t.type(o.data) !== "string" && (o.data = t.ajax.param(o.data, o.traditional)), C(v, o, n, D);
                if (x === 2) return "";
                c = o.global, o.type = o.type.toUpperCase(), o.hasContent = !u.test(o.type);
                if (!o.hasContent) {
                    o.data && (o.url += (~o.url.indexOf("?") ? "&" : "?") + o.data, delete o.data), h = o.url;
                    if (o.cache === !1) {
                        var B = (new Date).getTime(),
                            j = o.url.replace(a, "$1_=" + B);
                        o.url = j + (j === o.url ? (~o.url.indexOf("?") ? "&" : "?") + "_=" + B : "")
                    }
                }(o.data && o.hasContent && o.contentType !== !1 || n.contentType) && D.setRequestHeader("Content-Type", o.contentType), o.ifModified && (h = h || o.url, g[h] && D.setRequestHeader("If-Modified-Since", g[h]), y[h] && D.setRequestHeader("If-None-Match", y[h])), D.setRequestHeader("Accept", o.dataTypes[0] && o.accepts[o.dataTypes[0]] ? o.accepts[o.dataTypes[0]] + (o.dataTypes[0] !== "*" ? ", " + d + "; q=0.01" : "") : o.accepts["*"]);
                for (var F in o.headers) D.setRequestHeader(F, o.headers[F]);
                if (!o.beforeSend || o.beforeSend.call(l, D, o) !== !1 && x !== 2) {
                    A = "abort";
                    for (var F in {
                            success: 1,
                            error: 1,
                            complete: 1
                        }) D[F](o[F]);
                    _ = C(m, o, n, D);
                    if (!_) H(-1, "No Transport");
                    else {
                        D.readyState = 1, o.async && o.timeout > 0 && (P = setTimeout(function() {
                            D.abort("timeout")
                        }, o.timeout));
                        try {
                            x = 1, _.send(L, H)
                        } catch (I) {
                            if (!(x < 2)) throw I;
                            H(-1, I)
                        }
                    }
                    return D
                }
                return D.abort()
            }, function(e, t) {
                this.url = e, this.options = t
            }), t.ajax.settings = {
                url: e,
                isLocal: n.test(b[1]),
                global: !0,
                type: "GET",
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                processData: !0,
                async: !0,
                accepts: {
                    xml: "application/xml, text/xml",
                    html: "text/html",
                    text: "text/plain",
                    json: "application/json, text/javascript",
                    "*": d
                },
                contents: {
                    xml: /xml/,
                    html: /html/,
                    json: /json/
                },
                responseFields: {
                    xml: "responseXML",
                    text: "responseText"
                },
                converters: {
                    "* text": window.String,
                    "text html": !0,
                    "text json": E,
                    "text xml": w
                },
                flatOptions: {
                    context: !0,
                    url: !0
                }
            }, t.ajax.setup = function(e, n) {
                return n ? k(e, t.ajax.settings) : (n = e, e = t.ajax.settings), k(e, n), e
            }, t.ajax.param = function(e, n) {
                var r = [];
                if (t.type(e) === "array") t.forEach(e, function(e) {
                    L(r, e.name, e.value)
                });
                else
                    for (var i in e) A(r, i, e[i], n);
                return r.join("&").replace(/%20/g, "+")
            }, t.ajax.prefilter = x(v), t.ajax.transport = x(m);
            var O = [],
                M = /(=)\?(?=&|$)|\?\?/,
                _ = (new Date).getTime();
            t.ajax.setup({
                jsonp: "callback",
                jsonpCallback: function() {
                    var e = O.pop() || t.key + "_" + _++;
                    return this[e] = !0, e
                }
            }), t.ajax.prefilter("json jsonp", function(e, n, r) {
                var i, s, o, u = e.data,
                    a = e.url,
                    f = e.jsonp !== !1,
                    l = f && M.test(a),
                    c = f && !l && t.type(u) === "string" && !(e.contentType || "").indexOf("application/x-www-form-urlencoded") && M.test(u);
                if (e.dataTypes[0] === "jsonp" || l || c) return i = e.jsonpCallback = t.type(e.jsonpCallback) === "function" ? e.jsonpCallback() : e.jsonpCallback, s = window[i], l ? e.url = a.replace(M, "$1" + i) : c ? e.data = u.replace(M, "$1" + i) : f && (e.url += (/\?/.test(a) ? "&" : "?") + e.jsonp + "=" + i), e.converters["script json"] = function() {
                    return o[0]
                }, e.dataTypes[0] = "json", window[i] = function() {
                    o = arguments
                }, r.always(function() {
                    window[i] = s, e[i] && (e.jsonpCallback = n.jsonpCallback, O.push(i)), o && t.type(s) === "function" && s(o[0]), o = s = undefined
                }), "script"
            }), t.ajax.setup({
                accepts: {
                    script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
                },
                contents: {
                    script: /javascript|ecmascript/
                },
                converters: {
                    "text script": function(e) {
                        return S(e), e
                    }
                }
            }), t.ajax.prefilter("script", function(e) {
                e.cache === undefined && (e.cache = !1), e.crossDomain && (e.type = "GET", e.global = !1)
            }), t.ajax.transport("script", function(e) {
                if (e.crossDomain) {
                    var t, n = document.head || document.getElementsByTagName("head")[0] || document.documentElement;
                    return {
                        send: function(r, i) {
                            t = document.createElement("script"), t.async = "async", e.scriptCharset && (t.charset = e.scriptCharset), t.src = e.url, t.onload = t.onreadystatechange = function(e, r) {
                                if (r || !t.readyState || /loaded|complete/.test(t.readyState)) t.onload = t.onreadystatechange = null, n && t.parentNode && n.removeChild(t), t = undefined, !r && i(200, "success")
                            }, n.insertBefore(t, n.firstChild)
                        },
                        abort: function() {
                            t && t.onload(0, 1)
                        }
                    }
                }
            });
            var D, P = 0,
                H = window.ActiveXObject ? function() {
                    for (var e in D) D[e](0, 1)
                } : !1;
            t.ajax.settings.xhr = window.ActiveXObject ? function() {
                return !this.isLocal && B() || j()
            } : B, void
            function(e) {
                t.extend(t._util_.support, {
                    ajax: !!e,
                    cors: !!e && "withCredentials" in e
                })
            }(t.ajax.settings.xhr()), t._util_.support.ajax && t.ajax.transport(function(e) {
                if (!e.crossDomain || t._util_.support.cors) {
                    var n;
                    return {
                        send: function(r, i) {
                            var s, o = e.xhr();
                            e.username ? o.open(e.type, e.url, e.async, e.username, e.password) : o.open(e.type, e.url, e.async);
                            if (e.xhrFields)
                                for (var u in e.xhrFields) o[u] = e.xhrFields[u];
                            e.mimeType && o.overrideMimeType && o.overrideMimeType(e.mimeType), !e.crossDomain && !r["X-Requested-With"] && (r["X-Requested-With"] = "XMLHttpRequest");
                            try {
                                for (var u in r) o.setRequestHeader(u, r[u])
                            } catch (a) {}
                            o.send(e.hasContent && e.data || null), n = function(t, r) {
                                var u, a, f, l, c;
                                try {
                                    if (n && (r || o.readyState === 4)) {
                                        n = undefined, s && (o.onreadystatechange = function() {}, H && delete D[s]);
                                        if (r) o.readyState !== 4 && o.abort();
                                        else {
                                            u = o.status, f = o.getAllResponseHeaders(), l = {}, c = o.responseXML, c && c.documentElement && (l.xml = c);
                                            try {
                                                l.text = o.responseText
                                            } catch (h) {}
                                            try {
                                                a = o.statusText
                                            } catch (h) {
                                                a = ""
                                            }!u && e.isLocal && !e.crossDomain ? u = l.text ? 200 : 404 : u === 1223 && (u = 204)
                                        }
                                    }
                                } catch (p) {
                                    !r && i(-1, p)
                                }
                                l && i(u, a, l, f)
                            }, e.async ? o.readyState === 4 ? setTimeout(n, 0) : (s = ++P, H && (D || (D = {}, t.dom(window).on("unload", H)), D[s] = n), o.onreadystatechange = n) : n()
                        },
                        abort: function() {
                            n && n(0, 1)
                        }
                    }
                }
            })
        }(), t.array.extend({
                contains: function(e) {
                    return !!~this.indexOf(e)
                }
            }), t.each = function(e, t, n) {
                var r, i, s, o;
                if (typeof t == "function" && e) {
                    i = typeof e.length == "number" ? e.length : e.byteLength;
                    if (typeof i == "number") {
                        if (Object.prototype.toString.call(e) === "[object Function]") return e;
                        for (r = 0; r < i; r++) {
                            s = e[r], s === undefined && (s = e.charAt && e.charAt(r)), o = t.call(n || s, r, s, e);
                            if (o === !1 || o == "break") break
                        }
                    } else if (typeof e == "number")
                        for (r = 0; r < e; r++) {
                            o = t.call(n || r, r, r, r);
                            if (o === !1 || o == "break") break
                        } else if (typeof e == "object")
                            for (r in e)
                                if (e.hasOwnProperty(r)) {
                                    o = t.call(n || e[r], r, e[r], e);
                                    if (o === !1 || o == "break") break
                                }
                }
                return e
            }, t.array.extend({
                each: function(e, n) {
                    return t.each(this, e, n)
                },
                forEach: function(e, n) {
                    return t.forEach(this, e, n)
                }
            }), t.array.extend({
                empty: function() {
                    return this.length = 0, this
                }
            }), t.array.extend({
                filter: function(e, n) {
                    var r = t.array([]),
                        i, s, o, u = 0;
                    if (t.type(e) === "function")
                        for (i = 0, s = this.length; i < s; i++) o = this[i], e.call(n || this, o, i, this) === !0 && (r[u++] = o);
                    return r
                }
            }), t.array.extend({
                find: function(e) {
                    var n, r, i = this.length;
                    if (t.type(e) == "function")
                        for (n = 0; n < i; n++) {
                            r = this[n];
                            if (e.call(this, r, n, this) === !0) return r
                        }
                    return null
                }
            }), t.array.extend({
                hash: function(e) {
                    var t = {},
                        n = e && e.length,
                        r, i;
                    for (r = 0, i = this.length; r < i; r++) t[this[r]] = n && n > r ? e[r] : !0;
                    return t
                }
            }), t.array.extend({
                lastIndexOf: function(e, n) {
                    t.check(".+(,number)?", "baidu.array.lastIndexOf");
                    var r = this.length;
                    (!(n |= 0) || n >= r) && (n = r - 1), n < 0 && (n += r);
                    for (; n >= 0; n--)
                        if (n in this && this[n] === e) return n;
                    return -1
                }
            }), t.array.extend({
                map: function(e, n) {
                    t.check("function(,.+)?", "baidu.array.map");
                    var r = this.length,
                        i = t.array([]);
                    for (var s = 0; s < r; s++) i[s] = e.call(n || this, this[s], s, this);
                    return i
                }
            }), t.array.extend({
                remove: function(e) {
                    var t = this.length;
                    while (t--) this[t] === e && this.splice(t, 1);
                    return this
                }
            }), t.array.extend({
                removeAt: function(e) {
                    return t.check("number", "baidu.array.removeAt"), this.splice(e, 1)[0]
                }
            }), t.base = t.base || {
                blank: function() {}
            }, t.base.Class = function() {
                var e = (t._global_ = window[t.guid])._instances;
                return e || (e = t._global_._instances = {}),
                    function() {
                        this.guid = t.id(), this._decontrol_ || (e[this.guid] = this)
                    }
            }(), t.extend(t.base.Class.prototype, {
                toString: t.base.Class.prototype.toString = function() {
                    return "[object " + (this._type_ || "Object") + "]"
                },
                dispose: function() {
                    delete t._global_._instances[this.guid];
                    if (this._listeners_)
                        for (var e in this._listeners_) this._listeners_[e].length = 0, delete this._listeners_[e];
                    for (var n in this) t.isFunction(this[n]) ? this[n] = t.base.blank : delete this[n];
                    this.disposed = !0
                },
                fire: function(e, n) {
                    t.isString(e) && (e = new t.base.Event(e));
                    var r, i, s, o, u = this._listeners_,
                        a = e.type,
                        f = [e].concat(Array.prototype.slice.call(arguments, 1));
                    !u && (u = this._listeners_ = {}), t.extend(e, n || {}), e.target = e.target || this, e.currentTarget = this, a.indexOf("on") && (a = "on" + a), t.isFunction(this[a]) && this[a].apply(this, f), (r = this._options) && t.isFunction(r[a]) && r[a].apply(this, f);
                    if (t.isArray(s = u[a]))
                        for (r = s.length - 1; r > -1; r--) o = s[r], o && o.handler.apply(this, f), o && o.once && s.splice(r, 1);
                    return e.returnValue
                },
                on: function(e, n, r) {
                    if (!t.isFunction(n)) return this;
                    var i, s = this._listeners_;
                    return !s && (s = this._listeners_ = {}), e.indexOf("on") && (e = "on" + e), !t.isArray(i = s[e]) && (i = s[e] = []), s[e].unshift({
                        handler: n,
                        once: !!r
                    }), this
                },
                once: function(e, t) {
                    return this.on(e, t, !0)
                },
                one: function(e, t) {
                    return this.on(e, t, !0)
                },
                off: function(e, t) {
                    var n, r, i = this._listeners_;
                    if (!i) return this;
                    if (typeof e == "undefined") {
                        for (n in i) delete i[n];
                        return this
                    }
                    e.indexOf("on") && (e = "on" + e);
                    if (typeof t == "undefined") delete i[e];
                    else if (r = i[e])
                        for (n = r.length - 1; n >= 0; n--) r[n].handler === t && r.splice(n, 1);
                    return this
                }
            }), t.base.Class.prototype.addEventListener = t.base.Class.prototype.on, t.base.Class.prototype.removeEventListener = t.base.Class.prototype.un = t.base.Class.prototype.off, t.base.Class.prototype.dispatchEvent = t.base.Class.prototype.fire, window.baiduInstance = function(e) {
                return window[t.guid]._instances[e]
            }, t.base.Event = function(e, t) {
                this.type = e, this.returnValue = !0, this.target = t || null, this.currentTarget = null, this.preventDefault = function() {
                    this.returnValue = !1
                }
            }, t.base.inherits = function(e, t, n) {
                var r, i, s = e.prototype,
                    o = new Function;
                o.prototype = t.prototype, i = e.prototype = new o;
                for (r in s) i[r] = s[r];
                return e.prototype.constructor = e, e.superClass = t.prototype, typeof n == "string" && (i._type_ = n), e.extend = function(t) {
                    for (var n in t) i[n] = t[n];
                    return e
                }, e
            }, t.base.register = function(e, t, n) {
                (e._reg_ || (e._reg_ = [])).push(t);
                for (var r in n) e.prototype[r] = n[r]
            }, t.cookie = t.cookie || {}, t.cookie._isValidKey = function(e) {
                return (new RegExp('^[^\\x00-\\x20\\x7f\\(\\)<>@,;:\\\\\\"\\[\\]\\?=\\{\\}\\/\\u0080-\\uffff]+$')).test(e)
            }, t.cookie.getRaw = function(e) {
                if (t.cookie._isValidKey(e)) {
                    var n = new RegExp("(^| )" + e + "=([^;]*)(;|$)"),
                        r = n.exec(document.cookie);
                    if (r) return r[2] || null
                }
                return null
            }, t.cookie.get = function(e) {
                var n = t.cookie.getRaw(e);
                return "string" == typeof n ? (n = decodeURIComponent(n), n) : null
            }, t.cookie.setRaw = function(e, n, r) {
                if (!t.cookie._isValidKey(e)) return;
                r = r || {};
                var i = r.expires;
                "number" == typeof r.expires && (i = new Date, i.setTime(i.getTime() + r.expires)), document.cookie = e + "=" + n + (r.path ? "; path=" + r.path : "") + (i ? "; expires=" + i.toGMTString() : "") + (r.domain ? "; domain=" + r.domain : "") + (r.secure ? "; secure" : "")
            }, t.cookie.remove = function(e, n) {
                n = n || {}, n.expires = new Date(0), t.cookie.setRaw(e, "", n)
            }, t.cookie.set = function(e, n, r) {
                t.cookie.setRaw(e, encodeURIComponent(n), r)
            }, t.createClass = function(e, n, r) {
                e = t.isFunction(e) ? e : function() {}, r = typeof n == "object" ? n : r || {};
                var i = function() {
                    var t = this;
                    r.decontrolled && (t._decontrol_ = !0), i.superClass.apply(t, arguments);
                    for (var n in i.options) t[n] = i.options[n];
                    e.apply(t, arguments);
                    for (var n = 0, s = i._reg_; s && n < s.length; n++) s[n].apply(t, arguments)
                };
                return t.extend(i, {
                    superClass: r.superClass || t.base.Class,
                    inherits: function(n) {
                        if (typeof n != "function") return i;
                        var r = function() {};
                        r.prototype = (i.superClass = n).prototype;
                        var s = i.prototype = new r;
                        return t.extend(i.prototype, e.prototype), s.constructor = e, i
                    },
                    register: function(e, n) {
                        return (i._reg_ || (i._reg_ = [])).push(e), n && t.extend(i.prototype, n), i
                    },
                    extend: function(e) {
                        return t.extend(i.prototype, e), i
                    }
                }), n = t.isString(n) ? n : r.className || r.type, t.isString(n) && (e.prototype._type_ = n), t.isFunction(i.superClass) && i.inherits(i.superClass), i
            }, t.createSingle = function(e, n) {
                var r = new t.base.Class;
                return t.isString(n) && (r._type_ = n), t.extend(r, e)
            }, t.date = t.date || {}, t.createChain("number", function(e) {
                var n = parseFloat(e),
                    r = isNaN(n) ? n : e,
                    i = typeof r == "number" ? Number : String,
                    s = i.prototype;
                return r = new i(r), t.forEach(t.number.$Number.prototype, function(e, t) {
                    s[t] || (r[t] = e)
                }), r
            }), t.number.extend({
                pad: function(e) {
                    var t = this,
                        n = "",
                        r = t < 0,
                        i = String(Math.abs(t));
                    return i.length < e && (n = (new Array(e - i.length + 1)).join("0")), (r ? "-" : "") + n + i
                }
            }), t.date.format = function(e, n) {
                function r(e, t) {
                    n = n.replace(e, t)
                }
                if ("string" != typeof n) return e.toString();
                var i = t.number.pad,
                    s = e.getFullYear(),
                    o = e.getMonth() + 1,
                    u = e.getDate(),
                    a = e.getHours(),
                    f = e.getMinutes(),
                    l = e.getSeconds();
                return r(/yyyy/g, i(s, 4)), r(/yy/g, i(parseInt(s.toString().slice(2), 10), 2)), r(/MM/g, i(o, 2)), r(/M/g, o), r(/dd/g, i(u, 2)), r(/d/g, u), r(/HH/g, i(a, 2)), r(/H/g, a), r(/hh/g, i(a % 12, 2)), r(/h/g, a % 12), r(/mm/g, i(f, 2)), r(/m/g, f), r(/ss/g, i(l, 2)), r(/s/g, l), n
            }, t.date.parse = function(e) {
                var t = new RegExp("^\\d+(\\-|\\/)\\d+(\\-|\\/)\\d+$");
                if ("string" == typeof e) {
                    if (t.test(e) || isNaN(Date.parse(e))) {
                        var n = e.split(/ |T/),
                            r = n.length > 1 ? n[1].split(/[^\d]/) : [0, 0, 0],
                            i = n[0].split(/[^\d]/);
                        return new Date(i[0] - 0, i[1] - 1, i[2] - 0, r[0] - 0, r[1] - 0, r[2] - 0)
                    }
                    return new Date(e)
                }
                return new Date
            }, t.dom.extend({
                pushStack: function(e) {
                    var n = t.dom();
                    return t.merge(n, e), n.prevObject = this, n.context = this.context, n
                }
            }), t.dom.createElements = function() {
                function i(e, t) {
                    var n = e.getElementsByTagName("SCRIPT"),
                        r, i, s;
                    for (r = n.length - 1; r >= 0; r--) s = n[r], i = t.createElement("SCRIPT"), s.id && (i.id = s.id), s.src && (i.src = s.src), s.type && (i.type = s.type), i[s.text ? "text" : "textContent"] = s.text || s.textContent, s.parentNode.replaceChild(i, s)
                }
                var e = /<(\w+)/i,
                    n = /<|&#?\w+;/,
                    r = {
                        area: [1, "<map>", "</map>"],
                        col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
                        legend: [1, "<fieldset>", "</fieldset>"],
                        option: [1, "<select multiple='multiple'>", "</select>"],
                        td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
                        thead: [1, "<table>", "</table>"],
                        tr: [2, "<table><tbody>", "</tbody></table>"],
                        _default: [0, "", ""]
                    };
                return r.optgroup = r.option, r.tbody = r.tfoot = r.colgroup = r.caption = r.thead, r.th = r.td,
                    function(s, o) {
                        t.isNumber(s) && (s = s.toString()), o = o || document;
                        var u, a, f, l = s,
                            c = l.length,
                            h = o.createElement("div"),
                            p = o.createDocumentFragment(),
                            d = [];
                        if (t.isString(l))
                            if (!n.test(l)) d.push(o.createTextNode(l));
                            else {
                                u = r[l.match(e)[1].toLowerCase()] || r._default, h.innerHTML = "<i>mz</i>" + u[1] + l + u[2], h.removeChild(h.firstChild), i(h, o), a = u[0], f = h;
                                while (a--) f = f.firstChild;
                                t.merge(d, f.childNodes), t.forEach(d, function(e) {
                                    p.appendChild(e)
                                }), h = f = null
                            }
                        return h = null, d
                    }
            }(), t.dom.extend({
                add: function(e, n) {
                    var r = t.array(this.get());
                    switch (t.type(e)) {
                        case "HTMLElement":
                            r.push(e);
                            break;
                        case "$DOM":
                        case "array":
                            t.merge(r, e);
                            break;
                        case "string":
                            t.merge(r, t.dom(e, n));
                            break;
                        default:
                            typeof e == "object" && e.length && t.merge(r, e)
                    }
                    return this.pushStack(r.unique())
                }
            }), t.dom.extend({
                addClass: function(e) {
                    if (!arguments.length) return this;
                    var n = typeof e,
                        r = " ";
                    if (n == "string") {
                        e = t.string.trim(e);
                        var i = e.split(" ");
                        t.forEach(this, function(e, t) {
                            var n = e.className;
                            for (var s = 0; s < i.length; s++) ~(r + n + r).indexOf(r + i[s] + r) || (n += " " + i[s]);
                            e.className = n.replace(/^\s+/g, "")
                        })
                    } else n == "function" && t.forEach(this, function(n, r) {
                        t.dom(n).addClass(e.call(n, r, n.className))
                    });
                    return this
                }
            }), t.dom.extend({
                getDocument: function() {
                    if (this.size() <= 0) return undefined;
                    var e = this[0];
                    return e.nodeType == 9 ? e : e.ownerDocument || e.document
                }
            }), t._util_.cleanData = function(e) {
                var n;
                for (var r = 0, i; i = e[r]; r++) {
                    n = t.id(i, "get");
                    if (!n) continue;
                    t._util_.eventBase.queue.remove(i), t.id(i, "remove")
                }
            }, t.dom.extend({
                empty: function() {
                    for (var e = 0, n; n = this[e]; e++) {
                        n.nodeType === 1 && t._util_.cleanData(n.getElementsByTagName("*"));
                        while (n.firstChild) n.removeChild(n.firstChild)
                    }
                    return this
                }
            }), t.dom.extend({
                append: function() {
                    return t.check("^(?:string|function|HTMLElement|\\$DOM)(?:,(?:string|array|HTMLElement|\\$DOM))*$", "baidu.dom.append"), t._util_.smartInsert(this, arguments, function(e) {
                        this.nodeType === 1 && this.appendChild(e)
                    }), this
                }
            }), t.dom.extend({
                html: function(e) {
                    var n = t.dom,
                        r = t._util_,
                        i = this,
                        s = !1,
                        o = !!r.support.dom.div.getElementsByTagName("link").length,
                        u = r.support.dom.div.firstChild.nodeType === 3,
                        a;
                    if (!this.size()) switch (typeof e) {
                        case "undefined":
                            return undefined;
                        default:
                            return i
                    }
                    var f = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
                        l = /<(?:script|style|link)/i,
                        c = new RegExp("<(?:" + f + ")[\\s/>]", "i"),
                        h = /^\s+/,
                        p = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
                        d = /<([\w:]+)/,
                        v = {
                            option: [1, "<select multiple='multiple'>", "</select>"],
                            legend: [1, "<fieldset>", "</fieldset>"],
                            thead: [1, "<table>", "</table>"],
                            tr: [2, "<table><tbody>", "</tbody></table>"],
                            td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
                            col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
                            area: [1, "<map>", "</map>"],
                            _default: [0, "", ""]
                        };
                    return v.optgroup = v.option, v.tbody = v.tfoot = v.colgroup = v.caption = v.thead, v.th = v.td, o || (v._default = [1, "X<div>", "</div>"]), t.forEach(i, function(t, r) {
                        if (a) return;
                        var f = n(t);
                        switch (typeof e) {
                            case "undefined":
                                a = t.nodeType === 1 ? t.innerHTML : undefined;
                                return;
                            case "number":
                                e = String(e);
                            case "string":
                                s = !0;
                                if (!l.test(e) && (o || !c.test(e)) && (u || !h.test(e)) && !v[(d.exec(e) || ["", ""])[1].toLowerCase()]) {
                                    e = e.replace(p, "<$1></$2>");
                                    try {
                                        t.nodeType === 1 && (f.empty(), t.innerHTML = e), t = 0
                                    } catch (m) {}
                                }
                                t && i.empty().append(e);
                                break;
                            case "function":
                                s = !0, f.html(e.call(t, r, f.html()))
                        }
                    }), s ? i : a
                }
            }), t._util_.smartInsert = function(e, n, r) {
                if (n.length <= 0 || e.size() <= 0) return;
                if (t.type(n[0]) === "function") {
                    var i = n[0],
                        s;
                    return t.forEach(e, function(e, o) {
                        s = t.dom(e), n[0] = i.call(e, o, s.html()), t._util_.smartInsert(s, n, r)
                    })
                }
                var o = e.getDocument() || document,
                    u = o.createDocumentFragment(),
                    a = e.length - 1,
                    f;
                for (var l = 0, c; c = n[l]; l++) c.nodeType ? u.appendChild(c) : t.forEach(~"string|number".indexOf(t.type(c)) ? t.dom.createElements(c, o) : c, function(e) {
                    u.appendChild(e)
                });
                if (!(f = u.firstChild)) return;
                t.forEach(e, function(e, t) {
                    r.call(e.nodeName.toLowerCase() === "table" && f.nodeName.toLowerCase() === "tr" ? e.tBodies[0] || e.appendChild(e.ownerDocument.createElement("tbody")) : e, t < a ? u.cloneNode(!0) : u)
                })
            }, t.dom.extend({
                after: function() {
                    return t.check("^(?:string|function|HTMLElement|\\$DOM)(?:,(?:string|array|HTMLElement|\\$DOM))*$", "baidu.dom.after"), t._util_.smartInsert(this, arguments, function(e) {
                        this.parentNode && this.parentNode.insertBefore(e, this.nextSibling)
                    }), this
                }
            }), t.makeArray = function(e, n) {
                var r = n || [];
                return e ? (e.length == null || ~"string|function|regexp".indexOf(t.type(e)) ? [].push.call(r, e) : t.merge(r, e), r) : r
            }, t.dom.extend({
                map: function(e) {
                    t.check("function", "baidu.dom.map");
                    var n = [],
                        r = 0;
                    return t.forEach(this, function(t, s) {
                        n[r++] = e.call(t, s, t, t)
                    }), this.pushStack(n)
                }
            }), t._util_.isXML = function(e) {
                var t = (e ? e.ownerDocument || e : 0).documentElement;
                return t ? t.nodeName !== "HTML" : !1
            }, t.dom.extend({
                clone: function() {
                    function u(e) {
                        return e.getElementsByTagName ? e.getElementsByTagName("*") : e.querySelectorAll ? e.querySelectorAll("*") : []
                    }

                    function a(e, n) {
                        n.clearAttributes && n.clearAttributes(), n.mergeAttributes && n.mergeAttributes(e);
                        switch (n.nodeName.toLowerCase()) {
                            case "object":
                                n.outerHTML = e.outerHTML;
                                break;
                            case "textarea":
                            case "input":
                                ~"checked|radio".indexOf(e.type) && (e.checked && (n.defaultChecked = n.checked = e.checked), n.value !== e.value && (n.value = e.value)), n.defaultValue = e.defaultValue;
                                break;
                            case "option":
                                n.selected = e.defaultSelected;
                                break;
                            case "script":
                                n.text !== e.text && (n.text = e.text)
                        }
                        n[t.key] && n.removeAttribute(t.key)
                    }

                    function f(e, i) {
                        if (i.nodeType !== 1 || !t.id(e, "get")) return;
                        var s = r.get(e);
                        for (var o in s)
                            for (var u = 0, a; a = s[o][u]; u++) n.add(i, o, a.orig, null, null, a.one)
                    }

                    function l(e, n, r) {
                        var i = e.cloneNode(!0),
                            l, c, h;
                        if ((!o || !s) && (e.nodeType === 1 || e.nodeType === 11) && !t._util_.isXML(e)) {
                            a(e, i), l = u(e), c = u(i), h = l.length;
                            for (var p = 0; p < h; p++) c[p] && a(l[p], c[p])
                        }
                        if (n) {
                            f(e, i);
                            if (r) {
                                l = u(e), c = u(i), h = l.length;
                                for (var p = 0; p < h; p++) f(l[p], c[p])
                            }
                        }
                        return i
                    }
                    var e = t._util_,
                        n = e.eventBase.core,
                        r = e.eventBase.queue,
                        i = e.support.dom.div,
                        s = e.support.dom.input.cloneNode(!0).checked,
                        o = !0;
                    return !i.addEventListener && i.attachEvent && i.fireEvent && (i.attachEvent("onclick", function() {
                            o = !1
                        }), i.cloneNode(!0).fireEvent("onclick")),
                        function(e, t) {
                            return e = !!e, t = !!t, this.map(function() {
                                return l(this, e, t)
                            })
                        }
                }()
            }), t._util_.contains = document.compareDocumentPosition ? function(e, t) {
                return !!(e.compareDocumentPosition(t) & 16)
            } : function(e, t) {
                if (e === t) return !1;
                if (e.contains && t.contains) return e.contains(t);
                while (t = t.parentNode)
                    if (t === e) return !0;
                return !1
            }, t.dom.extend({
                contains: function(e) {
                    var n = this[0];
                    return e = t.dom(e)[0], !n || !e ? !1 : t._util_.contains(n, e)
                }
            }), t._util_.smartInsertTo = function(e, n, r, i) {
                var s = t.dom(n),
                    o = s[0],
                    u;
                if (i && o && (!o.parentNode || o.parentNode.nodeType === 11)) i = i === "before", u = t.merge(i ? e : s, i ? s : e), e !== u && (e.length = 0, t.merge(e, u));
                else
                    for (var a = 0, f; f = s[a]; a++) t._util_.smartInsert(t.dom(f), a > 0 ? e.clone(!0, !0) : e, r)
            }, t.dom.extend({
                appendTo: function(e) {
                    var n = [],
                        r = n.push;
                    return t.check("^(?:string|HTMLElement|\\$DOM)$", "baidu.dom.appendTo"), t._util_.smartInsertTo(this, e, function(e) {
                        r.apply(n, t.makeArray(e.childNodes)), this.appendChild(e)
                    }), this.pushStack(n)
                }
            }), t._util_.access = function(e, n, r, i, s) {
                if (e.size() <= 0) return e;
                switch (t.type(n)) {
                    case "string":
                        if (r === undefined) return i.call(e, e[0], n);
                        e.each(function(o, u) {
                            i.call(e, u, n, t.type(r) === "function" ? r.call(u, o, i.call(e, u, n)) : r, s)
                        });
                        break;
                    case "object":
                        for (var o in n) t._util_.access(e, o, n[o], i, r)
                }
                return e
            }, t._util_.nodeName = function(e, t) {
                return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase()
            }, t._util_.propFixer = {
                tabindex: "tabIndex",
                readonly: "readOnly",
                "for": "htmlFor",
                "class": "className",
                classname: "className",
                maxlength: "maxLength",
                cellspacing: "cellSpacing",
                cellpadding: "cellPadding",
                rowspan: "rowSpan",
                colspan: "colSpan",
                usemap: "useMap",
                frameborder: "frameBorder",
                contenteditable: "contentEditable",
                rboolean: /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i
            }, !document.createElement("form").enctype && (t._util_.propFixer.enctype = "encoding"), t._util_.prop = function() {
                var e = /^(?:button|input|object|select|textarea)$/i,
                    n = /^a(?:rea|)$/i,
                    r = document.createElement("select"),
                    i = r.appendChild(document.createElement("option")),
                    s = {
                        tabIndex: {
                            get: function(t) {
                                var r = t.getAttributeNode("tabindex");
                                return r && r.specified ? parseInt(r.value, 10) : e.test(t.nodeName) || n.test(t.nodeName) && t.href ? 0 : undefined
                            }
                        }
                    };
                return !i.selected && (s.selected = {
                        get: function(e) {
                            var t = e.parentNode;
                            return t && (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex), null
                        }
                    }), r = i = null,
                    function(e, n, r) {
                        var i = e.nodeType,
                            o, u;
                        if (!e || ~"238".indexOf(i)) return;
                        if (i !== 1 || !t._util_.isXML(e)) n = t._util_.propFixer[n] || n, o = s[n] || {};
                        return r !== undefined ? o.set && (u = o.set(e, n, r)) !== undefined ? u : e[n] = r : o.get && (u = o.get(e, n)) !== null ? u : e[n]
                    }
            }(), t._util_.support.getSetAttribute = t._util_.support.dom.div.className !== "t", t._util_.nodeHook = function() {
                if (t._util_.support.getSetAttribute) return;
                var e = {};
                return e.name = e.id = e.coords = !0, {
                    get: function(t, n) {
                        var r = t.getAttributeNode(n);
                        return r && (e[n] ? r.value !== "" : r.specified) ? r.value : undefined
                    },
                    set: function(e, t, n) {
                        var r = e.getAttributeNode(t);
                        return r || (r = document.createAttribute(t), e.setAttributeNode(r)), r.value = n + ""
                    }
                }
            }(), t._util_.removeAttr = function() {
                var e = t._util_.propFixer,
                    n = /\s+/,
                    r = t._util_.support.getSetAttribute;
                return function(i, s) {
                    if (!s || i.nodeType !== 1) return;
                    var o = s.split(n),
                        u, a;
                    for (var f = 0, l; l = o[f]; f++) u = e[l] || l, a = e.rboolean.test(l), !a && t._util_.attr(i, l, ""), i.removeAttribute(r ? l : u), a && u in i && (i[u] = !1)
                }
            }(), t._util_.attr = function() {
                var e = t._util_,
                    n = /^(?:button|input)$/i,
                    r = e.support.dom,
                    i = r.input.value === "t",
                    s = r.a.getAttribute("href") === "/a",
                    o = /top/.test(r.a.getAttribute("style")),
                    u = e.nodeHook,
                    a = {
                        className: "class"
                    },
                    f = {
                        get: function(t, n) {
                            var r = e.prop(t, n),
                                i;
                            return r === !0 || typeof r != "boolean" && (i = t.getAttributeNode(n)) && i.nodeValue !== !1 ? n.toLowerCase() : undefined
                        },
                        set: function(t, n, r) {
                            if (r === !1) e.removeAttr(t, n);
                            else {
                                var i = e.propFixer[n] || n;
                                i in t && (t[i] = !0), t.setAttribute(n, n.toLowerCase())
                            }
                            return n
                        }
                    },
                    l = {
                        type: {
                            set: function(t, r, s) {
                                if (n.test(t.nodeName) && t.parentNode) return s;
                                if (!i && s === "radio" && e.nodeName(t, "input")) {
                                    var o = t.value;
                                    return t.setAttribute("type", s), o && (t.value = o), s
                                }
                            }
                        },
                        value: {
                            get: function(t, n) {
                                return u && e.nodeName(t, "button") ? u.get(t, n) : n in t ? t.value : null
                            },
                            set: function(t, n, r) {
                                if (u && e.nodeName(t, "button")) return u.set(t, n, r);
                                t.value = r
                            }
                        }
                    };
                return e.support.getSetAttribute || (t.forEach(["width", "height"], function(e) {
                        l[e] = {
                            set: function(e, t, n) {
                                if (n === "") return e.setAttribute(t, "auto"), n
                            }
                        }
                    }), l.contenteditable = {
                        get: u.get,
                        set: function(e, t, n) {
                            n === "" && (n = !1), u.set(e, t, n)
                        }
                    }), s || t.forEach(["href", "src", "width", "height"], function(e) {
                        l[e] = {
                            get: function(e, t) {
                                var n = e.getAttribute(t, 2);
                                return n === null ? undefined : n
                            }
                        }
                    }), o || (l.style = {
                        get: function(e) {
                            return e.style.cssText.toLowerCase() || undefined
                        },
                        set: function(e, t, n) {
                            return e.style.cssText = n + ""
                        }
                    }),
                    function(n, r, i, s) {
                        var o = n.nodeType,
                            c = o !== 1 || !e.isXML(n),
                            h, p;
                        if (!n || ~"238".indexOf(o)) return;
                        if (s && t.dom.fn[r]) return t.dom(n)[r](i);
                        c && (r = a[r] || r.toLowerCase(), h = l[r] || (e.propFixer.rboolean.test(r) ? f : u));
                        if (i !== undefined) {
                            if (i === null) {
                                e.removeAttr(n, r);
                                return
                            }
                            return c && h && h.set && (p = h.set(n, r, i)) !== undefined ? p : (n.setAttribute(r, i + ""), i)
                        }
                        return c && h && h.get && (p = h.get(n, r)) !== null ? p : (p = n.getAttribute(r), p === null ? undefined : p)
                    }
            }(), t.dom.extend({
                attr: function(e, n) {
                    return t._util_.access(this, e, n, function(e, n, r, i) {
                        return t._util_.attr(e, n, r, i)
                    })
                }
            }), t.dom.extend({
                before: function() {
                    return t.check("^(?:string|function|HTMLElement|\\$DOM)(?:,(?:string|array|HTMLElement|\\$DOM))*$", "baidu.dom.before"), t._util_.smartInsert(this, arguments, function(e) {
                        this.parentNode && this.parentNode.insertBefore(e, this)
                    }), this
                }
            }), t.dom.extend({
                bind: function(e, t, n) {
                    return this.on(e, undefined, t, n)
                }
            }), t.dom.match = function() {
                function r(e) {
                    var t = [],
                        n;
                    while (e = e.parentNode) e.nodeType && t.push(e);
                    for (var n = t.length - 1; n > -1; n--)
                        if (t[n].nodeType == 1 || t[n].nodeType == 9) return t[n];
                    return null
                }
                var e = /^[\w\#\-\$\.\*]+$/,
                    n = document.createElement("DIV");
                return n.id = "__tangram__",
                    function(e, n, i) {
                        var s, o = t.array();
                        switch (t.type(n)) {
                            case "$DOM":
                                for (var u = e.length - 1; u > -1; u--)
                                    for (var a = n.length - 1; a > -1; a--) e[u] === n[a] && o.push(e[u]);
                                break;
                            case "function":
                                t.forEach(e, function(e, t) {
                                    n.call(e, t) && o.push(e)
                                });
                                break;
                            case "HTMLElement":
                                t.forEach(e, function(e) {
                                    e == n && o.push(e)
                                });
                                break;
                            case "string":
                                var f = t.query(n, i || document);
                                t.forEach(e, function(e) {
                                    if (s = r(e)) {
                                        var i = s.nodeType == 1 ? t.query(n, s) : f;
                                        for (var u = 0, a = i.length; u < a; u++)
                                            if (i[u] === e) {
                                                o.push(e);
                                                break
                                            }
                                    }
                                }), o = o.unique();
                                break;
                            default:
                                o = t.array(e).unique()
                        }
                        return o
                    }
            }(), t.dom.extend({
                children: function(e) {
                    var n = [];
                    return this.each(function() {
                        t.forEach(this.children || this.childNodes, function(e) {
                            e.nodeType == 1 && n.push(e)
                        })
                    }), this.pushStack(t.dom.match(n, e))
                }
            }), t.dom.extend({
                closest: function(e, n) {
                    var r = t.array();
                    return t.forEach(this, function(i) {
                        var s = [i];
                        while (i = i.parentNode) i.nodeType && s.push(i);
                        s = t.dom.match(s, e, n), s.length && r.push(s[0])
                    }), this.pushStack(r.unique())
                }
            }), t.dom.extend({
                contents: function() {
                    var e = [],
                        n;
                    for (var r = 0, i; i = this[r]; r++) n = i.nodeName, e.push.apply(e, t.makeArray(n && n.toLowerCase() === "iframe" ? i.contentDocument || i.contentWindow.document : i.childNodes));
                    return this.pushStack(e)
                }
            }), t.dom.extend({
                getComputedStyle: function(e) {
                    if (!this[0].ownerDocument) return;
                    var t = this[0].ownerDocument.defaultView,
                        n = t && t.getComputedStyle && t.getComputedStyle(this[0], null),
                        r = n ? n.getPropertyValue(e) || n[e] : "";
                    return r || this[0].style[e]
                }
            }), t.dom.extend({
                getCurrentStyle: function() {
                    var e = document.documentElement.currentStyle ? function(e) {
                        return this[0].currentStyle ? this[0].currentStyle[e] : this[0].style[e]
                    } : function(e) {
                        return this.getComputedStyle(e)
                    };
                    return function(t) {
                        return e.call(this, t)
                    }
                }()
            }), t._util_.getWidthOrHeight = function() {
                function i(e, t) {
                    var n = {};
                    for (var r in t) n[r] = e.style[r], e.style[r] = t[r];
                    return n
                }
                var e = {},
                    n = {
                        position: "absolute",
                        visibility: "hidden",
                        display: "block"
                    },
                    r = /^(none|table(?!-c[ea]).+)/;
                return t.forEach(["Width", "Height"], function(s) {
                        var o = {
                            Width: ["Right", "Left"],
                            Height: ["Top", "Bottom"]
                        }[s];
                        e["get" + s] = function(e, u) {
                            var a = t.dom(e),
                                f = e.offsetWidth === 0 && r.test(a.getCurrentStyle("display")) && i(e, n),
                                l = e["offset" + s] || parseInt(a.getCurrentStyle(s.toLowerCase())) || 0,
                                c = "padding|border";
                            return u && t.forEach(u.split("|"), function(e) {
                                ~c.indexOf(e) ? c = c.replace(new RegExp("\\|?" + e + "\\|?"), "") : (l += parseFloat(a.getCurrentStyle(e + o[0])) || 0, l += parseFloat(a.getCurrentStyle(e + o[1])) || 0)
                            }), c && t.forEach(c.split("|"), function(e) {
                                l -= parseFloat(a.getCurrentStyle(e + o[0] + (e === "border" ? "Width" : ""))) || 0, l -= parseFloat(a.getCurrentStyle(e + o[1] + (e === "border" ? "Width" : ""))) || 0
                            }), f && i(e, f), l
                        }
                    }),
                    function(t, n, r) {
                        return e[n === "width" ? "getWidth" : "getHeight"](t, r)
                    }
            }(), t._util_.setPositiveNumber = function() {
                var e = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
                    t = new RegExp("^(" + e + ")(.*)$", "i");
                return function(e, n, r) {
                    var i = t.exec(n);
                    return i ? Math.max(0, i[1] - (r || 0)) + (i[2] || "px") : n
                }
            }(), t._util_.style = t.extend({
                set: function(e, t, n) {
                    e.style[t] = n
                }
            }, document.documentElement.currentStyle ? {
                get: function(e, n) {
                    var r = t.dom(e).getCurrentStyle(n),
                        i;
                    return /^-?(?:\d*\.)?\d+(?!px)[^\d\s]+$/i.test(r) && (i = e.style.left, e.style.left = n === "fontSize" ? "1em" : r, r = e.style.pixelLeft + "px", e.style.left = i), r
                }
            } : {
                get: function(e, n) {
                    return t.dom(e).getCurrentStyle(n)
                }
            }), t._util_.cssHooks = function() {
                function o(e, r, i) {
                    t.type(i) === "string" && (i = t._util_.setPositiveNumber(e, i)), n.set(e, r, i)
                }
                var e = /alpha\s*\(\s*opacity\s*=\s*([^)]*)/i,
                    n = t._util_.style,
                    r = t._util_.support.dom.a,
                    i = {
                        fontWeight: {
                            normal: 400,
                            bold: 700,
                            bolder: 700,
                            lighter: 100
                        }
                    },
                    s = {
                        opacity: {},
                        width: {},
                        height: {},
                        fontWeight: {
                            get: function(e, t) {
                                var r = n.get(e, t);
                                return i.fontWeight[r] || r
                            }
                        }
                    };
                return t.extend(s.opacity, /^0.5/.test(r.style.opacity) ? {
                    get: function(e, n) {
                        var r = t.dom(e).getCurrentStyle(n);
                        return r === "" ? "1" : r
                    }
                } : {
                    get: function(t) {
                        return e.test((t.currentStyle || t.style).filter || "") ? parseFloat(RegExp.$1) / 100 + "" : "1"
                    },
                    set: function(t, n, r) {
                        var i = (t.currentStyle || t.style).filter || "",
                            s = r * 100;
                        t.style.zoom = 1, t.style.filter = e.test(i) ? i.replace(e, "Alpha(opacity=" + s) : i + " progid:dximagetransform.microsoft.Alpha(opacity=" + s + ")"
                    }
                }), t.forEach(["width", "height"], function(e) {
                    s[e] = {
                        get: function(n) {
                            return t._util_.getWidthOrHeight(n, e) + "px"
                        },
                        set: o
                    }
                }), t.each({
                    padding: "",
                    border: "Width"
                }, function(e, t) {
                    s[e + t] = {
                        set: o
                    };
                    var n = ["Top", "Right", "Bottom", "Left"],
                        r = 0;
                    for (; r < 4; r++) s[e + n[r] + t] = {
                        set: o
                    }
                }), s
            }(), t._util_.cssNumber = {
                columnCount: !0,
                fillOpacity: !0,
                fontWeight: !0,
                lineHeight: !0,
                opacity: !0,
                orphans: !0,
                widows: !0,
                zIndex: !0,
                zoom: !0
            }, t.string.extend({
                toCamelCase: function() {
                    var e = this.valueOf();
                    return e.indexOf("-") < 0 && e.indexOf("_") < 0 ? e : e.replace(/[-_][^-_]/g, function(e) {
                        return e.charAt(1).toUpperCase()
                    })
                }
            }), t.dom.styleFixer = function() {
                var e = t._util_.style,
                    n = t._util_.cssHooks,
                    r = t._util_.cssNumber,
                    i = {
                        "float": t._util_.support.dom.a.style.cssFloat ? "cssFloat" : "styleFloat"
                    };
                return function(s, o, u) {
                    var a = t.string.toCamelCase(o),
                        f = u === undefined ? "get" : "set",
                        l, c;
                    return a = i[a] || a, l = t.type(u) === "number" && !r[a] ? u + "px" : u, c = n.hasOwnProperty(a) && n[a][f] || e[f], c(s, a, l)
                }
            }(), t.dom.extend({
                css: function(e, n) {
                    return t.check("^(?:(?:string(?:,(?:number|string|function))?)|object)$", "baidu.dom.css"), t._util_.access(this, e, n, function(e, n, r) {
                        var i = t.dom.styleFixer;
                        return i ? i(e, n, r) : r === undefined ? this.getCurrentStyle(n) : e.style[n] = r
                    })
                }
            }), t.dom.extend({
                data: function() {
                    var e = t.key,
                        n = t.global("_maps_HTMLElementData");
                    return function(r, i) {
                        t.forEach(this, function(n) {
                            !n[e] && (n[e] = t.id())
                        });
                        if (t.isString(r)) {
                            if (typeof i == "undefined") {
                                var s, o;
                                o = this[0] && (s = n[this[0][e]]) && s[r];
                                if (typeof o != "undefined") return o;
                                var u = this[0].getAttribute("data-" + r);
                                return ~String(u).indexOf("{") ? Function("return " + u)() : u
                            }
                            t.forEach(this, function(t) {
                                var s = n[t[e]] = n[t[e]] || {};
                                s[r] = i
                            })
                        } else t.type(r) == "object" && t.forEach(this, function(i) {
                            var s = n[i[e]] = n[i[e]] || {};
                            t.forEach(r, function(e, t) {
                                s[t] = r[t]
                            })
                        });
                        return this
                    }
                }()
            }), t.lang.Class = t.base.Class, t.lang.Event = t.base.Event, t.dom.extend({
                delegate: function(e, t, n, r) {
                    return typeof n == "function" && (r = n, n = null), this.on(t, e, n, r)
                }
            }), t.dom.extend({
                filter: function(e) {
                    return this.pushStack(t.dom.match(this, e))
                }
            }), t.dom.extend({
                remove: function(e, n) {
                    arguments.length > 0 && t.check("^string(?:,boolean)?$", "baidu.dom.remove");
                    var r = e ? this.filter(e) : this;
                    for (var i = 0, s; s = r[i]; i++) !n && s.nodeType === 1 && (t._util_.cleanData(s.getElementsByTagName("*")), t._util_.cleanData([s])), s.parentNode && s.parentNode.removeChild(s);
                    return this
                }
            }), t.dom.extend({
                detach: function(e) {
                    return e && t.check("^string$", "baidu.dom.detach"), this.remove(e, !0)
                }
            }), t.object.extend = t.extend, t.dom.getStyle = function(e, n) {
                return t.dom(t.dom.g(e)).css(n)
            }, t.page = t.page || {}, t.page.getScrollTop = function() {
                var e = document;
                return window.pageYOffset || e.documentElement.scrollTop || e.body.scrollTop
            }, t.page.getScrollLeft = function() {
                var e = document;
                return window.pageXOffset || e.documentElement.scrollLeft || e.body.scrollLeft
            },
            function() {
                t.page.getMousePosition = function() {
                    return {
                        x: t.page.getScrollLeft() + e.x,
                        y: t.page.getScrollTop() + e.y
                    }
                };
                var e = {
                    x: 0,
                    y: 0
                };
                t.event.on(document, "onmousemove", function(t) {
                    t = window.event || t, e.x = t.clientX, e.y = t.clientY
                })
            }(), t.dom.extend({
                off: function(e, n, r) {
                    var i = t._util_.eventBase.core,
                        s = this;
                    return e ? typeof e == "string" ? (typeof n == "function" && (r = n, n = null), e = e.split(/[ ,]/), t.forEach(this, function(s) {
                        t.forEach(e, function(e) {
                            i.remove(s, e, r, n)
                        })
                    })) : typeof e == "object" && t.forEach(e, function(e, t) {
                        s.off(t, n, e)
                    }) : t.forEach(this, function(e) {
                        i.remove(e)
                    }), this
                }
            }), t.event.un = t.un = function(e, n, r) {
                return typeof e == "string" && (e = t.dom.g(e)), t.dom(e).off(n.replace(/^\s*on/, ""), r), e
            }, t.event.preventDefault = function(e) {
                return (new t.event(e)).preventDefault()
            },
            function() {
                function h() {
                    e = !1, clearInterval(o), r.capture && n.releaseCapture ? n.releaseCapture() : r.capture && window.releaseEvents && window.releaseEvents(Event.MOUSEMOVE | Event.MOUSEUP), document.body.style.MozUserSelect = c;
                    var i = t.dom(document);
                    i.off("selectstart", d), r.autoStop && i.off("mouseup", h), t.isFunction(r.ondragend) && r.ondragend(n, r, {
                        left: f,
                        top: l
                    })
                }

                function p(c) {
                    if (!e) {
                        clearInterval(o);
                        return
                    }
                    var h = r.range || [],
                        p = t.page.getMousePosition(),
                        d = u + p.x - i,
                        v = a + p.y - s;
                    t.isObject(h) && h.length == 4 && (d = Math.max(h[3], d), d = Math.min(h[1] - n.offsetWidth, d), v = Math.max(h[0], v), v = Math.min(h[2] - n.offsetHeight, v)), n.style.left = d + "px", n.style.top = v + "px", f = d, l = v, t.isFunction(r.ondrag) && r.ondrag(n, r, {
                        left: f,
                        top: l
                    })
                }

                function d(e) {
                    return t.event.preventDefault(e, !1)
                }
                var e = !1,
                    n, r, i, s, o, u, a, f, l, c;
                t.dom.drag = function(v, m) {
                    if (!(n = t.dom.g(v))) return !1;
                    r = t.object.extend({
                        autoStop: !0,
                        capture: !0,
                        interval: 16
                    }, m), f = u = parseInt(t.dom.getStyle(n, "left")) || 0, l = a = parseInt(t.dom.getStyle(n, "top")) || 0, e = !0, setTimeout(function() {
                        var e = t.page.getMousePosition();
                        i = r.mouseEvent ? t.page.getScrollLeft() + r.mouseEvent.clientX : e.x, s = r.mouseEvent ? t.page.getScrollTop() + r.mouseEvent.clientY : e.y, clearInterval(o), o = setInterval(p, r.interval)
                    }, 1);
                    var g = t.dom(document);
                    return r.autoStop && g.on("mouseup", h), g.on("selectstart", d), r.capture && n.setCapture ? n.setCapture() : r.capture && window.captureEvents && window.captureEvents(Event.MOUSEMOVE | Event.MOUSEUP), c = document.body.style.MozUserSelect, document.body.style.MozUserSelect = "none", t.isFunction(r.ondragstart) && r.ondragstart(n, r), {
                        stop: h,
                        dispose: h,
                        update: function(e) {
                            t.object.extend(r, e)
                        }
                    }
                }
            }(), t.lang.isFunction = t.isFunction, t.dom.extend({
                end: function() {
                    return this.prevObject || t.dom()
                }
            }), t.dom.extend({
                eq: function(e) {
                    t.check("number", "baidu.dom.eq");
                    var n = this.get(e);
                    return this.pushStack(typeof n == "undefined" ? [] : [n])
                }
            }), t.dom.extend({
                find: function(e) {
                    var n = [],
                        r, i = "__tangram__find__",
                        s = [];
                    switch (t.type(e)) {
                        case "string":
                            this.each(function() {
                                t.merge(s, t.query(e, this))
                            });
                            break;
                        case "HTMLElement":
                            r = e.tagName + "#" + (e.id ? e.id : e.id = i), this.each(function() {
                                t.query(r, this).length > 0 && n.push(e)
                            }), e.id == i && (e.id = ""), n.length > 0 && t.merge(s, n);
                            break;
                        case "$DOM":
                            n = e.get(), this.each(function() {
                                t.forEach(t.query("*", this), function(e) {
                                    for (var t = 0, r = n.length; t < r; t++) e === n[t] && (s[s.length++] = n[t])
                                })
                            })
                    }
                    return this.pushStack(s)
                }
            }), t.dom.extend({
                first: function() {
                    return this.eq(0)
                }
            }), t.dom.getAttr = function(e, n) {
                return t.dom(t.dom.g(e)).attr(n)
            }, t.dom.extend({
                getWindow: function() {
                    var e = this.getDocument();
                    return this.size() <= 0 ? undefined : e.parentWindow || e.defaultView
                }
            }), t.dom.extend({
                offsetParent: function() {
                    return this.map(function() {
                        var e = this.offsetParent || document.body,
                            n = /^(?:body|html)$/i;
                        while (e && t.dom(e).getCurrentStyle("position") === "static" && !n.test(e.nodeName)) e = e.offsetParent;
                        return e
                    })
                }
            }), t.dom.extend({
                position: function() {
                    if (this.size() <= 0) return 0;
                    var e = /^(?:body|html)$/i,
                        t = this.offset(),
                        n = this.offsetParent(),
                        r = e.test(n[0].nodeName) ? {
                            left: 0,
                            top: 0
                        } : n.offset();
                    return t.left -= parseFloat(this.getCurrentStyle("marginLeft")) || 0, t.top -= parseFloat(this.getCurrentStyle("marginTop")) || 0, r.left += parseFloat(n.getCurrentStyle("borderLeftWidth")) || 0, r.top += parseFloat(n.getCurrentStyle("borderTopWidth")) || 0, {
                        left: t.left - r.left,
                        top: t.top - r.top
                    }
                }
            }), t.dom.extend({
                offset: function() {
                    function e(e, n, r) {
                        var i = i = t.dom(e),
                            s = i.getCurrentStyle("position");
                        s === "static" && (e.style.position = "relative");
                        var o = i.offset(),
                            u = i.getCurrentStyle("left"),
                            a = i.getCurrentStyle("top"),
                            f = ~"absolute|fixed".indexOf(s) && ~("" + u + a).indexOf("auto"),
                            l = f && i.position();
                        u = l && l.left || parseFloat(u) || 0, a = l && l.top || parseFloat(a) || 0, t.type("options") === "function" && (n = n.call(e, r, o)), n.left != undefined && (e.style.left = n.left - o.left + u + "px"), n.top != undefined && (e.style.top = n.top - o.top + a + "px")
                    }
                    return function(n) {
                        if (n) {
                            t.check("^(?:object|function)$", "baidu.dom.offset");
                            for (var r = 0, i; i = this[r]; r++) e(i, n, r);
                            return this
                        }
                        var s = this[0],
                            o = this.getDocument(),
                            u = {
                                left: 0,
                                top: 0
                            },
                            a, f;
                        if (!o) return;
                        return f = o.documentElement, t._util_.contains(f, s) ? (typeof s.getBoundingClientRect != "undefined" && (u = s.getBoundingClientRect()), a = this.getWindow(), {
                            left: u.left + (a.pageXOffset || f.scrollLeft) - (f.clientLeft || 0),
                            top: u.top + (a.pageYOffset || f.scrollTop) - (f.clientTop || 0)
                        }) : u
                    }
                }()
            }), t.dom.extend({
                has: function(e) {
                    var n = [],
                        r = t.dom(document.body);
                    return t.forEach(this, function(t) {
                        r[0] = t, r.find(e).length && n.push(t)
                    }), t.dom(n)
                }
            }), t.dom.extend({
                hasClass: function(e) {
                    if (arguments.length <= 0 || typeof e == "function") return this;
                    if (this.size() <= 0) return !1;
                    e = e.replace(/^\s+/g, "").replace(/\s+$/g, "").replace(/\s+/g, " ");
                    var n = e.split(" "),
                        r;
                    return t.forEach(this, function(e) {
                        var t = e.className;
                        for (var i = 0; i < n.length; i++)
                            if (!~(" " + t + " ").indexOf(" " + n[i] + " ")) {
                                r = !1;
                                return
                            }
                        if (r !== !1) {
                            r = !0;
                            return
                        }
                    }), r
                }
            }), t._util_.getWindowOrDocumentWidthOrHeight = t._util_.getWindowOrDocumentWidthOrHeight || function() {
                var e = {
                    window: {},
                    document: {}
                };
                return t.forEach(["Width", "Height"], function(n) {
                        var r = "client" + n,
                            i = "offset" + n,
                            s = "scroll" + n;
                        e.window["get" + n] = function(e) {
                            var n = e.document,
                                i = n.documentElement[r];
                            return t.browser.isStrict && i || n.body && n.body[r] || i
                        }, e.document["get" + n] = function(e) {
                            var t = e.documentElement;
                            return t[r] >= t[s] ? t[r] : Math.max(e.body[s], t[s], e.body[i], t[i])
                        }
                    }),
                    function(t, n, r) {
                        return e[n][r === "width" ? "getWidth" : "getHeight"](t)
                    }
            }(), t.dom.extend({
                height: function(e) {
                    return t._util_.access(this, "height", e, function(e, n, r) {
                        var i = r !== undefined,
                            s = i && parseFloat(r),
                            o = e != null && e == e.window ? "window" : e.nodeType === 9 ? "document" : !1;
                        if (i && s < 0 || isNaN(s)) return;
                        return i && /^(?:\d*\.)?\d+$/.test(r += "") && (r += "px"), o ? t._util_.getWindowOrDocumentWidthOrHeight(e, o, n) : i ? e.style.height = r : t._util_.getWidthOrHeight(e, n)
                    })
                }
            }), t._util_.isHidden = function(e) {
                return t.dom(e).getCurrentStyle("display") === "none" || !t._util_.contains(e.ownerDocument, e)
            }, t.dom.extend({
                hide: function() {
                    var e = [],
                        n, r, i;
                    return this.each(function(s, o) {
                        if (!o.style) return;
                        n = t(o), e[s] = n.data("olddisplay"), i = o.style.display, e[s] || (r = t._util_.isHidden(o), (i && i !== "none" || !r) && n.data("olddisplay", r ? i : n.getCurrentStyle("display"))), o.style.display = "none"
                    })
                }
            }), t.dom.extend({
                innerHeight: function() {
                    if (this.size() <= 0) return 0;
                    var e = this[0],
                        n = e != null && e === e.window ? "window" : e.nodeType === 9 ? "document" : !1;
                    return n ? t._util_.getWindowOrDocumentWidthOrHeight(e, n, "height") : t._util_.getWidthOrHeight(e, "height", "padding")
                }
            }), t.dom.extend({
                innerWidth: function() {
                    if (this.size() <= 0) return 0;
                    var e = this[0],
                        n = e != null && e === e.window ? "window" : e.nodeType === 9 ? "document" : !1;
                    return n ? t._util_.getWindowOrDocumentWidthOrHeight(e, n, "width") : t._util_.getWidthOrHeight(e, "width", "padding")
                }
            }), t.dom.extend({
                insertAfter: function(e) {
                    var n = [],
                        r = n.push;
                    return t.check("^(?:string|HTMLElement|\\$DOM)$", "baidu.dom.insertAfter"), t._util_.smartInsertTo(this, e, function(e) {
                        r.apply(n, t.makeArray(e.childNodes)), this.parentNode.insertBefore(e, this.nextSibling)
                    }, "after"), this.pushStack(n)
                }
            }), t.dom.extend({
                insertBefore: function(e) {
                    var n = [],
                        r = n.push;
                    return t.check("^(?:string|HTMLElement|\\$DOM)$", "baidu.dom.insertBefore"), t._util_.smartInsertTo(this, e, function(e) {
                        r.apply(n, t.makeArray(e.childNodes)), this.parentNode.insertBefore(e, this)
                    }, "before"), this.pushStack(n)
                }
            }), t.dom.extend({
                insertHTML: function(e, n) {
                    var r, i, s = this[0];
                    return s.insertAdjacentHTML && !t.browser.opera ? s.insertAdjacentHTML(e, n) : (r = s.ownerDocument.createRange(), e = e.toUpperCase(), e == "AFTERBEGIN" || e == "BEFOREEND" ? (r.selectNodeContents(s), r.collapse(e == "AFTERBEGIN")) : (i = e == "BEFOREBEGIN", r[i ? "setStartBefore" : "setEndAfter"](s), r.collapse(i)), r.insertNode(r.createContextualFragment(n))), s
                }
            }), t.dom.extend({
                is: function(e) {
                    return t.dom.match(this, e).length > 0
                }
            }), t.dom.extend({
                last: function() {
                    return this.eq(-1)
                }
            }), t.dom.extend({
                next: function(e) {
                    var n = [];
                    return t.forEach(this, function(e) {
                        while ((e = e.nextSibling) && e && e.nodeType != 1);
                        e && (n[n.length++] = e)
                    }), this.pushStack(e ? t.dom.match(n, e) : n)
                }
            }), t.dom.extend({
                nextAll: function(e) {
                    var n = [];
                    return t.forEach(this, function(e) {
                        while (e = e.nextSibling) e && e.nodeType == 1 && n.push(e)
                    }), this.pushStack(t.dom.match(n, e))
                }
            }), t.dom.extend({
                nextUntil: function(e, n) {
                    var r = t.array();
                    return t.forEach(this, function(n) {
                        var i = t.array();
                        while (n = n.nextSibling) n && n.nodeType == 1 && i.push(n);
                        if (e && i.length) {
                            var s = t.dom.match(i, e);
                            s.length && (i = i.slice(0, i.indexOf(s[0])))
                        }
                        t.merge(r, i)
                    }), this.pushStack(t.dom.match(r, n))
                }
            }), t.dom.extend({
                not: function(e) {
                    var n, r, i, s = this.get(),
                        o = t.isArray(e) ? e : t.dom.match(this, e);
                    for (n = s.length - 1; n > -1; n--)
                        for (r = 0, i = o.length; r < i; r++) o[r] === s[n] && s.splice(n, 1);
                    return this.pushStack(s)
                }
            }), t.dom.extend({
                one: function(e, t, n, r) {
                    return this.on(e, t, n, r, 1)
                }
            }), t.dom.extend({
                outerHeight: function(e) {
                    if (this.size() <= 0) return 0;
                    var n = this[0],
                        r = n != null && n === n.window ? "window" : n.nodeType === 9 ? "document" : !1;
                    return r ? t._util_.getWindowOrDocumentWidthOrHeight(n, r, "height") : t._util_.getWidthOrHeight(n, "height", "padding|border" + (e ? "|margin" : ""))
                }
            }), t.dom.extend({
                outerWidth: function(e) {
                    if (this.size() <= 0) return 0;
                    var n = this[0],
                        r = n != null && n === n.window ? "window" : n.nodeType === 9 ? "document" : !1;
                    return r ? t._util_.getWindowOrDocumentWidthOrHeight(n, r, "width") : t._util_.getWidthOrHeight(n, "width", "padding|border" + (e ? "|margin" : ""))
                }
            }), t.dom.extend({
                parent: function(e) {
                    var n = [];
                    return t.forEach(this, function(e) {
                        (e = e.parentNode) && e.nodeType == 1 && n.push(e)
                    }), this.pushStack(t.dom.match(n, e))
                }
            }), t.dom.extend({
                parents: function(e) {
                    var n = [];
                    return t.forEach(this, function(e) {
                        var r = [];
                        while ((e = e.parentNode) && e.nodeType == 1) r.push(e);
                        t.merge(n, r)
                    }), this.pushStack(t.dom.match(n, e))
                }
            }), t.dom.extend({
                parentsUntil: function(e, n) {
                    t.check("(string|HTMLElement)(,.+)?", "baidu.dom.parentsUntil");
                    var r = [];
                    return t.forEach(this, function(n) {
                        var i = t.array();
                        while ((n = n.parentNode) && n.nodeType == 1) i.push(n);
                        if (e && i.length) {
                            var s = t.dom.match(i, e);
                            s.length && (i = i.slice(0, i.indexOf(s[0])))
                        }
                        t.merge(r, i)
                    }), this.pushStack(t.dom.match(r, n))
                }
            }), t.dom.extend({
                prepend: function() {
                    return t.check("^(?:string|function|HTMLElement|\\$DOM)(?:,(?:string|array|HTMLElement|\\$DOM))*$", "baidu.dom.prepend"), t._util_.smartInsert(this, arguments, function(e) {
                        this.nodeType === 1 && this.insertBefore(e, this.firstChild)
                    }), this
                }
            }), t.dom.extend({
                prependTo: function(e) {
                    var n = [],
                        r = n.push;
                    return t.check("^(?:string|HTMLElement|\\$DOM)$", "baidu.dom.prependTo"), t._util_.smartInsertTo(this, e, function(e) {
                        r.apply(n, t.makeArray(e.childNodes)), this.insertBefore(e, this.firstChild)
                    }), this.pushStack(n)
                }
            }), t.dom.extend({
                prev: function(e) {
                    var n = [];
                    return t.forEach(this, function(e) {
                        while (e = e.previousSibling)
                            if (e.nodeType == 1) {
                                n.push(e);
                                break
                            }
                    }), this.pushStack(t.dom.match(n, e))
                }
            }), t.dom.extend({
                prevAll: function(e) {
                    var n = t.array();
                    return t.forEach(this, function(e) {
                        var r = [];
                        while (e = e.previousSibling) e.nodeType == 1 && r.push(e);
                        t.merge(n, r.reverse())
                    }), this.pushStack(typeof e == "string" ? t.dom.match(n, e) : n.unique())
                }
            }), t.dom.extend({
                prevUntil: function(e, n) {
                    t.check("(string|HTMLElement)(,.+)?", "baidu.dom.prevUntil");
                    var r = [];
                    return t.forEach(this, function(n) {
                        var i = t.array();
                        while (n = n.previousSibling) n && n.nodeType == 1 && i.push(n);
                        if (e && i.length) {
                            var s = t.dom.match(i, e);
                            s.length && (i = i.slice(0, i.indexOf(s[0])))
                        }
                        t.merge(r, i)
                    }), this.pushStack(t.dom.match(r, n))
                }
            }), t.dom.extend({
                prop: function(e, n) {
                    return t._util_.access(this, e, n, function(e, n, r) {
                        return t._util_.prop(e, n, r)
                    })
                }
            }), t.string.extend({
                escapeReg: function() {
                    return this.replace(new RegExp("([.*+?^=!:${}()|[\\]/\\\\])", "g"), "\\$1")
                }
            }), void
        function(e, n) {
            function W(e, t, n, r) {
                var i, u, a, f, l = o++,
                    c = 0,
                    h = t.length;
                typeof n == "string" && !d.test(n) && (n = n.toLowerCase(), f = n);
                for (; c < h; c++) {
                    i = t[c];
                    if (i) {
                        u = !1, i = i[e];
                        while (i) {
                            if (i[s] === l) {
                                u = t[i.sizset];
                                break
                            }
                            a = i.nodeType === 1, a && !r && (i[s] = l, i.sizset = c);
                            if (f) {
                                if (i.nodeName.toLowerCase() === n) {
                                    u = i;
                                    break
                                }
                            } else if (a)
                                if (typeof n != "string") {
                                    if (i === n) {
                                        u = !0;
                                        break
                                    }
                                } else if (F(n, [i]).length > 0) {
                                u = i;
                                break
                            }
                            i = i[e]
                        }
                        t[c] = u
                    }
                }
            }
            t.query = function(e, n, r) {
                return t.merge(r || [], t.sizzle(e, n))
            };
            var r = e.document,
                i = r.documentElement,
                s = "sizcache" + (Math.random() + "").replace(".", ""),
                o = 0,
                u = Object.prototype.toString,
                a = "undefined",
                f = !1,
                l = !0,
                c = /^#([\w\-]+$)|^(\w+$)|^\.([\w\-]+$)/,
                h = /((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,
                p = /\\/g,
                d = /\W/,
                v = /^\w/,
                m = /\D/,
                g = /(-?)(\d*)(?:n([+\-]?\d*))?/,
                y = /^\+|\s*/g,
                b = /h\d/i,
                w = /input|select|textarea|button/i,
                E = /[\t\n\f\r]/g,
                S = "(?:[-\\w]|[^\\x00-\\xa0]|\\\\.)",
                x = {
                    ID: new RegExp("#(" + S + "+)"),
                    CLASS: new RegExp("\\.(" + S + "+)"),
                    NAME: new RegExp("\\[name=['\"]*(" + S + "+)['\"]*\\]"),
                    TAG: new RegExp("^(" + S.replace("[-", "[-\\*") + "+)"),
                    ATTR: new RegExp("\\[\\s*(" + S + "+)\\s*(?:(\\S?=)\\s*(?:(['\"])(.*?)\\3|(#?" + S + "*)|)|)\\s*\\]"),
                    PSEUDO: new RegExp(":(" + S + "+)(?:\\((['\"]?)((?:\\([^\\)]+\\)|[^\\(\\)]*)+)\\2\\))?"),
                    CHILD: /:(only|nth|last|first)-child(?:\(\s*(even|odd|(?:[+\-]?\d+|(?:[+\-]?\d*)?n\s*(?:[+\-]\s*\d+)?))\s*\))?/,
                    POS: /:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/
                },
                T = x.POS,
                N = function() {
                    var e, t = function(e, t) {
                            return "\\" + (t - 0 + 1)
                        },
                        n = {};
                    for (e in x) x[e] = new RegExp(x[e].source + /(?![^\[]*\])(?![^\(]*\))/.source), n[e] = new RegExp(/(^(?:.|\r|\n)*?)/.source + x[e].source.replace(/\\(\d+)/g, t));
                    return x.globalPOS = T, n
                }(),
                C = function(e) {
                    var t = !1,
                        n = r.createElement("div");
                    try {
                        t = e(n)
                    } catch (i) {}
                    return n = null, t
                },
                k = C(function(e) {
                    var t = !0,
                        n = "script" + (new Date).getTime();
                    return e.innerHTML = "<a name ='" + n + "'/>", i.insertBefore(e, i.firstChild), r.getElementById(n) && (t = !1), i.removeChild(e), t
                }),
                L = C(function(e) {
                    return e.appendChild(r.createComment("")), e.getElementsByTagName("*").length === 0
                }),
                A = C(function(e) {
                    return e.innerHTML = "<a href='#'></a>", e.firstChild && typeof e.firstChild.getAttribute !== a && e.firstChild.getAttribute("href") === "#"
                }),
                O = C(function(e) {
                    return e.innerHTML = "<div class='test e'></div><div class='test'></div>", !e.getElementsByClassName || e.getElementsByClassName("e").length === 0 ? !1 : (e.lastChild.className = "e", e.getElementsByClassName("e").length !== 1)
                });
            [0, 0].sort(function() {
                return l = !1, 0
            });
            var M = function(e, i, s) {
                    s = s || [], i = i || r;
                    var o, u, a, f = i.nodeType;
                    if (f !== 1 && f !== 9) return [];
                    if (!e || typeof e != "string") return s;
                    e = t.string(e).trim();
                    if (!e) return s;
                    a = D(i);
                    if (!a)
                        if (o = c.exec(e))
                            if (o[1]) {
                                if (f === 9) {
                                    u = i.getElementById(o[1]);
                                    if (!u || !u.parentNode) return P([], s);
                                    if (u.id === o[1]) return P([u], s)
                                } else if (i.ownerDocument && (u = i.ownerDocument.getElementById(o[1])) && B(i, u) && u.id === o[1]) return P([u], s)
                            } else {
                                if (o[2]) return e === "body" && i.body ? P([i.body], s) : P(i.getElementsByTagName(e), s);
                                if (O && o[3] && i.getElementsByClassName) return P(i.getElementsByClassName(o[3]), s)
                            }
                    return _(e, i, s, n, a)
                },
                _ = function(e, t, n, r, i) {
                    var s, o, a, f, l, c, p, d, v = t,
                        m = !0,
                        g = [],
                        y = e;
                    do {
                        h.exec(""), s = h.exec(y);
                        if (s) {
                            y = s[3], g.push(s[1]);
                            if (s[2]) {
                                f = s[3];
                                break
                            }
                        }
                    } while (s);
                    if (g.length > 1 && T.exec(e))
                        if (g.length === 2 && R.relative[g[0]]) o = X(g[0] + g[1], t, r, i);
                        else {
                            o = R.relative[g[0]] ? [t] : M(g.shift(), t);
                            while (g.length) e = g.shift(), R.relative[e] && (e += g.shift()), o = X(e, o, r, i)
                        }
                    else {
                        !r && g.length > 1 && t.nodeType === 9 && !i && x.ID.test(g[0]) && !x.ID.test(g[g.length - 1]) && (l = j(g.shift(), t, i), t = l.expr ? F(l.expr, l.set)[0] : l.set[0]);
                        if (t) {
                            l = r ? {
                                expr: g.pop(),
                                set: P(r)
                            } : j(g.pop(), g.length >= 1 && (g[0] === "~" || g[0] === "+") && t.parentNode || t, i), o = l.expr ? F(l.expr, l.set) : l.set, g.length > 0 ? a = P(o) : m = !1;
                            while (g.length) c = g.pop(), p = c, R.relative[c] ? p = g.pop() : c = "", p == null && (p = t), R.relative[c](a, p, i)
                        } else a = g = []
                    }
                    a || (a = o), a || I(c || e);
                    if (u.call(a) === "[object Array]")
                        if (!m) n.push.apply(n, a);
                        else if (t && t.nodeType === 1)
                        for (d = 0; a[d] != null; d++) a[d] && (a[d] === !0 || a[d].nodeType === 1 && B(t, a[d])) && n.push(o[d]);
                    else
                        for (d = 0; a[d] != null; d++) a[d] && a[d].nodeType === 1 && n.push(o[d]);
                    else P(a, n);
                    return f && (_(f, v, n, r, i), H(n)), n
                },
                D = t._util_.isXML,
                P = t.makeArray,
                H = function(e) {
                    if (U) {
                        f = l, e.sort(U);
                        if (f)
                            for (var t = 1; t < e.length; t++) e[t] === e[t - 1] && e.splice(t--, 1)
                    }
                    return e
                },
                B = t._util_.contains,
                j = function(e, t, n) {
                    var r, i, s, o, u, f;
                    if (!e) return [];
                    for (i = 0, s = R.order.length; i < s; i++) {
                        u = R.order[i];
                        if (o = N[u].exec(e)) {
                            f = o[1], o.splice(1, 1);
                            if (f.substr(f.length - 1) !== "\\") {
                                o[1] = (o[1] || "").replace(p, ""), r = R.find[u](o, t, n);
                                if (r != null) {
                                    e = e.replace(x[u], "");
                                    break
                                }
                            }
                        }
                    }
                    return r || (r = typeof t.getElementsByTagName !== a ? t.getElementsByTagName("*") : []), {
                        set: r,
                        expr: e
                    }
                },
                F = function(e, t, r, i) {
                    var s, o, u, a, f, l, c, h, p, d = e,
                        v = [],
                        m = t,
                        g = t && t[0] && D(t[0]);
                    while (e && t.length) {
                        for (u in R.filter)
                            if ((s = N[u].exec(e)) != null && s[2]) {
                                l = R.filter[u], c = s[1], o = !1, s.splice(1, 1);
                                if (c.substr(c.length - 1) === "\\") continue;
                                m === v && (v = []);
                                if (R.preFilter[u]) {
                                    s = R.preFilter[u](s, m, r, v, i, g);
                                    if (!s) o = a = !0;
                                    else if (s === !0) continue
                                }
                                if (s)
                                    for (h = 0;
                                        (f = m[h]) != null; h++) f && (a = l(f, s, h, m), p = i ^ a, r && a != null ? p ? o = !0 : m[h] = !1 : p && (v.push(f), o = !0));
                                if (a !== n) {
                                    r || (m = v), e = e.replace(x[u], "");
                                    if (!o) return [];
                                    break
                                }
                            }
                        if (e === d) {
                            if (o != null) break;
                            I(e)
                        }
                        d = e
                    }
                    return m
                },
                I = function(e) {
                    throw new Error(e)
                },
                q = function(e) {
                    var t, n, r = e.nodeType,
                        i = "";
                    if (r) {
                        if (r === 1 || r === 9 || r === 11) {
                            if (typeof e.textContent == "string") return e.textContent;
                            for (e = e.firstChild; e; e = e.nextSibling) i += q(e)
                        } else if (r === 3 || r === 4) return e.nodeValue
                    } else
                        for (t = 0; n = e[t]; t++) n.nodeType !== 8 && (i += q(n));
                    return i
                },
                R = {
                    match: x,
                    leftMatch: N,
                    order: ["ID", "NAME", "TAG"],
                    attrMap: {
                        "class": "className",
                        "for": "htmlFor"
                    },
                    attrHandle: {
                        href: A ? function(e) {
                            return e.getAttribute("href")
                        } : function(e) {
                            return e.getAttribute("href", 2)
                        },
                        type: function(e) {
                            return e.getAttribute("type")
                        }
                    },
                    relative: {
                        "+": function(e, t) {
                            var n = typeof t == "string",
                                r = n && !d.test(t),
                                i = n && !r;
                            r && (t = t.toLowerCase());
                            for (var s = 0, o = e.length, u; s < o; s++)
                                if (u = e[s]) {
                                    while ((u = u.previousSibling) && u.nodeType !== 1);
                                    e[s] = i || u && u.nodeName.toLowerCase() === t ? u || !1 : u === t
                                }
                            i && F(t, e, !0)
                        },
                        ">": function(e, t) {
                            var n, r = typeof t == "string",
                                i = 0,
                                s = e.length;
                            if (r && !d.test(t)) {
                                t = t.toLowerCase();
                                for (; i < s; i++) {
                                    n = e[i];
                                    if (n) {
                                        var o = n.parentNode;
                                        e[i] = o.nodeName.toLowerCase() === t ? o : !1
                                    }
                                }
                            } else {
                                for (; i < s; i++) n = e[i], n && (e[i] = r ? n.parentNode : n.parentNode === t);
                                r && F(t, e, !0)
                            }
                        },
                        "": function(e, t, n) {
                            W("parentNode", e, t, n)
                        },
                        "~": function(e, t, n) {
                            W("previousSibling", e, t, n)
                        }
                    },
                    find: {
                        ID: k ? function(e, t, n) {
                            if (typeof t.getElementById !== a && !n) {
                                var r = t.getElementById(e[1]);
                                return r && r.parentNode ? [r] : []
                            }
                        } : function(e, t, r) {
                            if (typeof t.getElementById !== a && !r) {
                                var i = t.getElementById(e[1]);
                                return i ? i.id === e[1] || typeof i.getAttributeNode !== a && i.getAttributeNode("id").nodeValue === e[1] ? [i] : n : []
                            }
                        },
                        NAME: function(e, t) {
                            if (typeof t.getElementsByName !== a) {
                                var n = [],
                                    r = t.getElementsByName(e[1]),
                                    i = 0,
                                    s = r.length;
                                for (; i < s; i++) r[i].getAttribute("name") === e[1] && n.push(r[i]);
                                return n.length === 0 ? null : n
                            }
                        },
                        TAG: L ? function(e, t) {
                            if (typeof t.getElementsByTagName !== a) return t.getElementsByTagName(e[1])
                        } : function(e, t) {
                            var n = t.getElementsByTagName(e[1]);
                            if (e[1] === "*") {
                                var r = [],
                                    i = 0;
                                for (; n[i]; i++) n[i].nodeType === 1 && r.push(n[i]);
                                n = r
                            }
                            return n
                        }
                    },
                    preFilter: {
                        CLASS: function(e, t, n, r, i, s) {
                            e = " " + e[1].replace(p, "") + " ";
                            if (s) return e;
                            for (var o = 0, u;
                                (u = t[o]) != null; o++) u && (i ^ (u.className && ~(" " + u.className + " ").replace(E, " ").indexOf(e)) ? n || r.push(u) : n && (t[o] = !1));
                            return !1
                        },
                        ID: function(e) {
                            return e[1].replace(p, "")
                        },
                        TAG: function(e, t) {
                            return e[1].replace(p, "").toLowerCase()
                        },
                        CHILD: function(e) {
                            if (e[1] === "nth") {
                                e[2] || I(e[0]), e[2] = e[2].replace(y, "");
                                var t = g.exec(e[2] === "even" && "2n" || e[2] === "odd" && "2n+1" || !m.test(e[2]) && "0n+" + e[2] || e[2]);
                                e[2] = t[1] + (t[2] || 1) - 0, e[3] = t[3] - 0
                            } else e[2] && I(e[0]);
                            return e[0] = o++, e
                        },
                        ATTR: function(e, t, n, r, i, s) {
                            var o = e[1] = e[1].replace(p, "");
                            return !s && R.attrMap[o] && (e[1] = R.attrMap[o]), e[4] = (e[4] || e[5] || "").replace(p, ""), e[2] === "~=" && (e[4] = " " + e[4] + " "), e
                        },
                        PSEUDO: function(e, t, n, i, s, o) {
                            if (e[1] === "not") {
                                if (!((h.exec(e[3]) || "").length > 1 || v.test(e[3]))) {
                                    var u = F(e[3], t, n, !s);
                                    return n || i.push.apply(i, u), !1
                                }
                                e[3] = _(e[3], r, [], t, o)
                            } else if (x.POS.test(e[0]) || x.CHILD.test(e[0])) return !0;
                            return e
                        },
                        POS: function(e) {
                            return e.unshift(!0), e
                        }
                    },
                    filters: {
                        enabled: function(e) {
                            return e.disabled === !1
                        },
                        disabled: function(e) {
                            return e.disabled === !0
                        },
                        checked: function(e) {
                            var t = e.nodeName.toLowerCase();
                            return t === "input" && !!e.checked || t === "option" && !!e.selected
                        },
                        selected: function(e) {
                            return e.parentNode && e.parentNode.selectedIndex, e.selected === !0
                        },
                        parent: function(e) {
                            return !!e.firstChild
                        },
                        empty: function(e) {
                            return !e.firstChild
                        },
                        has: function(e, t, n) {
                            return !!M(n[3], e).length
                        },
                        header: function(e) {
                            return b.test(e.nodeName)
                        },
                        text: function(e) {
                            var t = e.getAttribute("type"),
                                n = e.type;
                            return e.nodeName.toLowerCase() === "input" && "text" === n && (t === null || t.toLowerCase() === n)
                        },
                        radio: function(e) {
                            return e.nodeName.toLowerCase() === "input" && "radio" === e.type
                        },
                        checkbox: function(e) {
                            return e.nodeName.toLowerCase() === "input" && "checkbox" === e.type
                        },
                        file: function(e) {
                            return e.nodeName.toLowerCase() === "input" && "file" === e.type
                        },
                        password: function(e) {
                            return e.nodeName.toLowerCase() === "input" && "password" === e.type
                        },
                        submit: function(e) {
                            var t = e.nodeName.toLowerCase();
                            return (t === "input" || t === "button") && "submit" === e.type
                        },
                        image: function(e) {
                            return e.nodeName.toLowerCase() === "input" && "image" === e.type
                        },
                        reset: function(e) {
                            var t = e.nodeName.toLowerCase();
                            return (t === "input" || t === "button") && "reset" === e.type
                        },
                        button: function(e) {
                            var t = e.nodeName.toLowerCase();
                            return t === "input" && "button" === e.type || t === "button"
                        },
                        input: function(e) {
                            return w.test(e.nodeName)
                        },
                        focus: function(e) {
                            var t = e.ownerDocument;
                            return e === t.activeElement && (!t.hasFocus || t.hasFocus()) && (!!e.type || !!e.href)
                        },
                        active: function(e) {
                            return e === e.ownerDocument.activeElement
                        },
                        contains: function(e, t, n) {
                            return (e.textContent || e.innerText || q(e)).indexOf(n[3]) >= 0
                        }
                    },
                    setFilters: {
                        first: function(e, t) {
                            return t === 0
                        },
                        last: function(e, t, n, r) {
                            return t === r.length - 1
                        },
                        even: function(e, t) {
                            return t % 2 === 0
                        },
                        odd: function(e, t) {
                            return t % 2 === 1
                        },
                        lt: function(e, t, n) {
                            return t < n[3] - 0
                        },
                        gt: function(e, t, n) {
                            return t > n[3] - 0
                        },
                        nth: function(e, t, n) {
                            return n[3] - 0 === t
                        },
                        eq: function(e, t, n) {
                            return n[3] - 0 === t
                        }
                    },
                    filter: {
                        PSEUDO: function(e, t, n, r) {
                            var i = t[1],
                                s = R.filters[i];
                            if (s) return s(e, n, t, r);
                            if (i === "not") {
                                var o = t[3],
                                    u = 0,
                                    a = o.length;
                                for (; u < a; u++)
                                    if (o[u] === e) return !1;
                                return !0
                            }
                            I(i)
                        },
                        CHILD: function(e, t) {
                            var n, r, i, o, u, a, f, l = t[1],
                                c = e;
                            switch (l) {
                                case "only":
                                case "first":
                                    while (c = c.previousSibling)
                                        if (c.nodeType === 1) return !1;
                                    if (l === "first") return !0;
                                    c = e;
                                case "last":
                                    while (c = c.nextSibling)
                                        if (c.nodeType === 1) return !1;
                                    return !0;
                                case "nth":
                                    n = t[2], r = t[3];
                                    if (n === 1 && r === 0) return !0;
                                    i = t[0], o = e.parentNode;
                                    if (o && (o[s] !== i || !e.nodeIndex)) {
                                        a = 0;
                                        for (c = o.firstChild; c; c = c.nextSibling) c.nodeType === 1 && (c.nodeIndex = ++a);
                                        o[s] = i
                                    }
                                    return f = e.nodeIndex - r, n === 0 ? f === 0 : f % n === 0 && f / n >= 0
                            }
                        },
                        ID: k ? function(e, t) {
                            return e.nodeType === 1 && e.getAttribute("id") === t
                        } : function(e, t) {
                            var n = typeof e.getAttributeNode !== a && e.getAttributeNode("id");
                            return e.nodeType === 1 && n && n.nodeValue === t
                        },
                        TAG: function(e, t) {
                            return t === "*" && e.nodeType === 1 || !!e.nodeName && e.nodeName.toLowerCase() === t
                        },
                        CLASS: function(e, t) {
                            return (" " + (e.className || e.getAttribute("class")) + " ").indexOf(t) > -1
                        },
                        ATTR: function(e, t) {
                            var n = t[1],
                                r = R.attrHandle[n] ? R.attrHandle[n](e) : e[n] != null ? e[n] : e.getAttribute(n),
                                i = r + "",
                                s = t[2],
                                o = t[4];
                            return r == null ? s === "!=" : s === "=" ? i === o : s === "*=" ? i.indexOf(o) >= 0 : s === "~=" ? (" " + i + " ").indexOf(o) >= 0 : o ? s === "!=" ? i !== o : s === "^=" ? i.indexOf(o) === 0 : s === "$=" ? i.substr(i.length - o.length) === o : s === "|=" ? i === o || i.substr(0, o.length + 1) === o + "-" : !1 : i && r !== !1
                        },
                        POS: function(e, t, n, r) {
                            var i = t[2],
                                s = R.setFilters[i];
                            if (s) return s(e, n, t, r)
                        }
                    }
                };
            O && (R.order.splice(1, 0, "CLASS"), R.find.CLASS = function(e, t, n) {
                if (typeof t.getElementsByClassName !== a && !n) return t.getElementsByClassName(e[1])
            });
            var U, z;
            i.compareDocumentPosition ? U = function(e, t) {
                return e === t ? (f = !0, 0) : !e.compareDocumentPosition || !t.compareDocumentPosition ? e.compareDocumentPosition ? -1 : 1 : e.compareDocumentPosition(t) & 4 ? -1 : 1
            } : (U = function(e, t) {
                if (e === t) return f = !0, 0;
                if (e.sourceIndex && t.sourceIndex) return e.sourceIndex - t.sourceIndex;
                var n, r, i = [],
                    s = [],
                    o = e.parentNode,
                    u = t.parentNode,
                    a = o;
                if (o === u) return z(e, t);
                if (!o) return -1;
                if (!u) return 1;
                while (a) i.unshift(a), a = a.parentNode;
                a = u;
                while (a) s.unshift(a), a = a.parentNode;
                n = i.length, r = s.length;
                for (var l = 0; l < n && l < r; l++)
                    if (i[l] !== s[l]) return z(i[l], s[l]);
                return l === n ? z(e, s[l], -1) : z(i[l], t, 1)
            }, z = function(e, t, n) {
                if (e === t) return n;
                var r = e.nextSibling;
                while (r) {
                    if (r === t) return -1;
                    r = r.nextSibling
                }
                return 1
            }), r.querySelectorAll && function() {
                var e = _,
                    t = "__sizzle__",
                    n = /^\s*[+~]/,
                    r = /'/g,
                    i = [];
                C(function(e) {
                    e.innerHTML = "<select><option selected></option></select>", e.querySelectorAll("[selected]").length || i.push("\\[[\\x20\\t\\n\\r\\f]*(?:checked|disabled|ismap|multiple|readonly|selected|value)"), e.querySelectorAll(":checked").length || i.push(":checked")
                }), C(function(e) {
                    e.innerHTML = "<p class=''></p>", e.querySelectorAll("[class^='']").length && i.push("[*^$]=[\\x20\\t\\n\\r\\f]*(?:\"\"|'')"), e.innerHTML = "<input type='hidden'>", e.querySelectorAll(":enabled").length || i.push(":enabled", ":disabled")
                }), i = i.length && new RegExp(i.join("|")), _ = function(s, o, u, a, f) {
                    if (!a && !f && (!i || !i.test(s)))
                        if (o.nodeType === 9) try {
                            return P(o.querySelectorAll(s), u)
                        } catch (l) {} else if (o.nodeType === 1 && o.nodeName.toLowerCase() !== "object") {
                            var c = o,
                                h = o.getAttribute("id"),
                                p = h || t,
                                d = o.parentNode,
                                v = n.test(s);
                            h ? p = p.replace(r, "\\$&") : o.setAttribute("id", p), v && d && (o = d);
                            try {
                                if (!v || d) return P(o.querySelectorAll("[id='" + p + "'] " + s), u)
                            } catch (l) {} finally {
                                h || c.removeAttribute("id")
                            }
                        }
                    return e(s, o, u, a, f)
                }
            }();
            var X = function(e, t, n, r) {
                var i, s = [],
                    o = "",
                    u = t.nodeType ? [t] : t,
                    a = 0,
                    f = u.length;
                while (i = x.PSEUDO.exec(e)) o += i[0], e = e.replace(x.PSEUDO, "");
                R.relative[e] && (e += "*");
                for (; a < f; a++) _(e, u[a], s, n, r);
                return F(o, s)
            };
            e.Sizzle = t.sizzle = M, t.query.matches = function(e, t) {
                return _(e, r, [], t, D(r))
            }
        }(window), t.dom.extend({
            ready: function() {
                var e = this,
                    n, r = window.document;
                t._util_.isDomReady = !1, t._util_._readyWait = 1, t.dom.holdReady = function(e) {
                    e ? t._util_.readyWait++ : i(!0)
                };
                var i = function(e) {
                        if (e === !0 ? --t._util_.readyWait : t._util_.isDomReady) return;
                        if (!r.body) return setTimeout(i, 1);
                        t._util_.isReady = !0;
                        if (e !== !0 && --t._util_.readyWait > 0) return;
                        n.resolveWith(r), t.dom.trigger && t.dom(r).trigger("ready").off("ready")
                    },
                    s = function() {
                        r.addEventListener ? (r.removeEventListener("DOMContentLoaded", s, !1), i()) : r.readyState === "complete" && (r.detachEvent("onreadystatechange", s), i())
                    },
                    o = function(e) {
                        if (!n) {
                            n = t.Deferred();
                            if (r.readyState === "complete") setTimeout(i, 1);
                            else if (r.addEventListener) r.addEventListener("DOMContentLoaded", s, !1), window.addEventListener("load", i, !1);
                            else {
                                r.attachEvent("onreadystatechange", s), window.attachEvent("onload", i);
                                var o = !1;
                                try {
                                    o = window.frameElement == null && r.documentElement
                                } catch (u) {}
                                o && o.doScroll && function a() {
                                    if (!t._util_.isDomReady) {
                                        try {
                                            o.doScroll("left")
                                        } catch (e) {
                                            return setTimeout(a, 50)
                                        }
                                        i()
                                    }
                                }()
                            }
                        }
                        return n.promise(e)
                    };
                return function(t) {
                    return o().done(t), e
                }
            }()
        }), t.dom.extend({
            removeAttr: function(e) {
                return this.each(function(n, r) {
                    t._util_.removeAttr(r, e)
                }), this
            }
        }), t.dom.extend({
            removeClass: function(e) {
                var n = typeof e,
                    r = " ";
                arguments.length || t.forEach(this, function(e) {
                    e.className = ""
                });
                if (n == "string") {
                    e = t.string.trim(e);
                    var i = e.split(" ");
                    t.forEach(this, function(e) {
                        var n = e.className;
                        for (var s = 0; s < i.length; s++)
                            while (~(r + n + r).indexOf(r + i[s] + r)) n = (r + n + r).replace(r + i[s] + r, r);
                        e.className = t.string.trim(n)
                    })
                } else n == "function" && t.forEach(this, function(n, r, i) {
                    t.dom(n).removeClass(e.call(n, r, n.className))
                });
                return this
            }
        }), t.dom.extend({
            removeData: function() {
                var e = t.key,
                    n = t.global("_maps_HTMLElementData");
                return function(r) {
                    return t.forEach(this, function(n) {
                        !n[e] && (n[e] = t.id())
                    }), t.forEach(this, function(i) {
                        var s = n[i[e]];
                        typeof r == "string" ? s && delete s[r] : t.type(r) == "array" && t.forEach(r, function(e) {
                            s && delete s[e]
                        })
                    }), this
                }
            }()
        }), t.dom.extend({
            removeProp: function(e) {
                return e = t._util_.propFixer[e] || e, this.each(function(t, n) {
                    try {
                        n[e] = undefined, delete n[e]
                    } catch (r) {}
                }), this
            }
        }), t._util_.smartScroll = function(e) {
            function s(e) {
                return e && e.nodeType === 9
            }

            function o(e) {
                return t.type(e) == "Window" ? e : s(e) ? e.defaultView || e.parentWindow : !1
            }
            var n = {
                    scrollLeft: "pageXOffset",
                    scrollTop: "pageYOffset"
                }[e],
                r = e === "scrollLeft",
                i = {};
            return {
                get: function(r) {
                    var i = o(r);
                    return i ? n in i ? i[n] : t.browser.isStrict && i.document.documentElement[e] || i.document.body[e] : r[e]
                },
                set: function(t, n) {
                    if (!t) return;
                    var i = o(t);
                    i ? i.scrollTo(r ? n : this.get(t), r ? this.get(t) : n) : t[e] = n
                }
            }
        }, t.dom.extend({
            scrollLeft: function() {
                var e = t._util_.smartScroll("scrollLeft");
                return function(n) {
                    return n && t.check("^(?:number|string)$", "baidu.dom.scrollLeft"), this.size() <= 0 ? n === undefined ? 0 : this : n === undefined ? e.get(this[0]) : e.set(this[0], n) || this
                }
            }()
        }), t.dom.extend({
            scrollTop: function() {
                var e = t._util_.smartScroll("scrollTop");
                return function(n) {
                    return n && t.check("^(?:number|string)$", "baidu.dom.scrollTop"), this.size() <= 0 ? n === undefined ? 0 : this : n === undefined ? e.get(this[0]) : e.set(this[0], n) || this
                }
            }()
        }), t.dom.setPixel = function(e, n, r) {
            typeof r != "undefined" && (t.dom.g(e).style[n] = r + (isNaN(r) ? "" : "px"))
        }, t._util_.getDefaultDisplayValue = function() {
            var e = {};
            return function(n) {
                if (e[n]) return e[n];
                var r = document.createElement(n),
                    i, s, o;
                document.body.appendChild(r), i = t.dom(r).getCurrentStyle("display"), document.body.removeChild(r);
                if (i === "" || i === "none") s = document.body.appendChild(document.createElement("iframe")), s.frameBorder = s.width = s.height = 0, o = (s.contentWindow || s.contentDocument).document, o.writeln("<!DOCTYPE html><html><body>"), o.close(), r = o.appendChild(o.createElement(n)), i = t.dom(r).getCurrentStyle("display"), document.body.removeChild(s), s = null;
                return r = null, e[n] = i
            }
        }(), t.dom.extend({
            show: function() {
                var e = [],
                    n, r;
                return this.each(function(i, s) {
                    if (!s.style) return;
                    r = t.dom(s), n = s.style.display, e[i] = r.data("olddisplay"), !e[i] && n === "none" && (s.style.display = ""), s.style.display === "" && t._util_.isHidden(s) && r.data("olddisplay", e[i] = t._util_.getDefaultDisplayValue(s.nodeName))
                }), this.each(function(t, n) {
                    if (!n.style) return;
                    if (n.style.display === "none" || n.style.display === "") n.style.display = e[t] || ""
                })
            }
        }), t.dom.extend({
            siblings: function(e) {
                var n = [];
                return t.forEach(this, function(e) {
                    var r = [],
                        i = [],
                        s = e;
                    while (s = s.previousSibling) s.nodeType == 1 && r.push(s);
                    while (e = e.nextSibling) e.nodeType == 1 && i.push(e);
                    t.merge(n, r.reverse().concat(i))
                }), this.pushStack(t.dom.match(n, e))
            }
        }), t.dom.extend({
            slice: function() {
                var e = Array.prototype.slice;
                return function(n, r) {
                    return t.check("number(,number)?", "baidu.dom.slice"), this.pushStack(e.apply(this, arguments))
                }
            }()
        }), t.dom.extend({
            text: function(e) {
                var n = t.dom,
                    r = this,
                    i = !1,
                    s;
                if (this.size() <= 0) switch (typeof e) {
                    case "undefined":
                        return undefined;
                    default:
                        return r
                }
                var o = function(e) {
                    var t, n = "",
                        r = 0,
                        i = e.nodeType;
                    if (i)
                        if (i === 1 || i === 9 || i === 11) {
                            if (typeof e.textContent == "string") return e.textContent;
                            for (e = e.firstChild; e; e = e.nextSibling) n += o(e)
                        } else if (i === 3 || i === 4) return e.nodeValue;
                    return n
                };
                return t.forEach(r, function(t, r) {
                    var u = n(t);
                    if (s) return;
                    switch (typeof e) {
                        case "undefined":
                            return s = o(t), s;
                        case "number":
                            e = String(e);
                        case "string":
                            i = !0, u.empty().append((t && t.ownerDocument || document).createTextNode(e));
                            break;
                        case "function":
                            i = !0, u.text(e.call(t, r, u.text()))
                    }
                }), i ? r : s
            }
        }), t.dom.extend({
            toggle: function() {
                for (var e = 0, t = this.size(); e < t; e++) {
                    var n = this.eq(e);
                    n.css("display") != "none" ? n.hide() : n.show()
                }
            }
        }), t.dom.extend({
            toggleClass: function(e, n) {
                var r = typeof e,
                    n = typeof n == "undefined" ? n : Boolean(n);
                arguments.length <= 0 && t.forEach(this, function(e) {
                    e.className = ""
                });
                switch (typeof e) {
                    case "string":
                        e = e.replace(/^\s+/g, "").replace(/\s+$/g, "").replace(/\s+/g, " ");
                        var i = e.split(" ");
                        t.forEach(this, function(e) {
                            var t = e.className;
                            for (var r = 0; r < i.length; r++) ~(" " + t + " ").indexOf(" " + i[r] + " ") && typeof n == "undefined" ? t = (" " + t + " ").replace(" " + i[r] + " ", " ") : !~(" " + t + " ").indexOf(" " + i[r] + " ") && typeof n == "undefined" ? t += " " + i[r] : !~(" " + t + " ").indexOf(" " + i[r] + " ") && n === !0 ? t += " " + i[r] : ~(" " + t + " ").indexOf(" " + i[r] + " ") && n === !1 && (t = t.replace(i[r], ""));
                            e.className = t.replace(/^\s+/g, "").replace(/\s+$/g, "")
                        });
                        break;
                    case "function":
                        t.forEach(this, function(r, i) {
                            t.dom(r).toggleClass(e.call(r, i, r.className), n)
                        })
                }
                return this
            }
        }), void
        function(e) {
            if (e.mousewheel) return;
            var n = /firefox/i.test(navigator.userAgent),
                r = /msie/i.test(navigator.userAgent);
            t.each({
                mouseenter: "mouseover",
                mouseleave: "mouseout"
            }, function(n, r) {
                e[n] = {
                    bindType: r,
                    pack: function(e) {
                        var r = t.dom.contains;
                        return function(t) {
                            var i = t.relatedTarget;
                            t.type = n;
                            if (!i || i !== this && !r(this, i)) return e.apply(this, arguments)
                        }
                    }
                }
            }), r || t.each({
                focusin: "focus",
                focusout: "blur"
            }, function(t, n) {
                e[t] = {
                    bindType: n,
                    attachElements: "textarea,select,input,button,a"
                }
            }), e.mousewheel = {
                bindType: n ? "DOMMouseScroll" : "mousewheel",
                pack: function(e) {
                    return function(t) {
                        var r = t.originalEvent;
                        return t.type = "mousewheel", t.wheelDelta = t.wheelDelta || (n ? r.detail * -40 : r.wheelDelta) || 0, e.apply(this, arguments)
                    }
                }
            }
        }(t.event.special), void
        function(e) {
            var n = e.queue;
            t.dom.extend({
                triggerHandler: function(e, r, i) {
                    return i && !i.triggerData && (i.triggerData = r), t.forEach(this, function(t) {
                        n.call(t, e, undefined, i)
                    }), this
                }
            })
        }(t._util_.eventBase), void
        function(e, n) {
            var r = n.special,
                i = e.queue,
                s = t.dom,
                o = !window.addEventListener,
                u = /firefox/i.test(navigator.userAgent),
                a = {
                    submit: 3,
                    focus: o ? 3 : 2,
                    blur: o ? 3 : u ? 1 : 2
                },
                f = function(e, t) {
                    var n;
                    document.createEvent ? (n = document.createEvent("HTMLEvents"), n.initEvent(e, !0, !0)) : document.createEventObject && (n = document.createEventObject(), n.type = e);
                    var r = {};
                    if (t)
                        for (var i in t) try {
                            n[i] = t[i]
                        } catch (s) {
                            n.extraData || (n.extraData = r), r[i] = t[i]
                        }
                    return n
                },
                l = function(e, t, n) {
                    if (e.dispatchEvent) return e.dispatchEvent(n);
                    if (e.fireEvent) return e.fireEvent("on" + t, n)
                },
                c = function(e, t, n, r, o) {
                    var u, c;
                    if (u = f(t, r)) {
                        n && (u.triggerData = n);
                        if (o) i.call(e, t, null, u);
                        else {
                            var h = e.window === window ? 3 : a[t];
                            try {
                                if (h & 1 || !(t in a)) c = l(e, t, u)
                            } catch (p) {
                                s(e).triggerHandler(t, n, u)
                            }
                            if (c !== !1 && h & 2) try {
                                e[t] && e[t]()
                            } catch (p) {}
                        }
                    }
                };
            t.dom.extend({
                trigger: function(e, t, n) {
                    var i;
                    return e in r && (i = r[e]), this.each(function() {
                        c(this, e, t, n, i)
                    }), this
                }
            })
        }(t._util_.eventBase, t.event), t.dom.extend({
            unbind: function(e, t) {
                return this.off(e, t)
            }
        }), t.dom.extend({
            undelegate: function(e, t, n) {
                return this.off(t, e, n)
            }
        }), t.dom.extend({
            unique: function(e) {
                return t.dom(t.array(this.toArray()).unique(e))
            }
        }), t._util_.inArray = function(e, t, n) {
            if (!t) return -1;
            var r = Array.prototype.indexOf,
                i;
            if (r) return r.call(t, e, n);
            i = t.length, n = n ? n < 0 ? Math.max(0, i + n) : n : 0;
            for (; n < i; n++)
                if (n in t && t[n] === e) return n;
            return -1
        }, t.dom.extend({
            val: function() {
                t._util_.support.dom.select.disabled = !0;
                var e = t._util_,
                    n = e.support.dom.input.value === "on",
                    r = !e.support.dom.opt.disabled,
                    i = ["radio", "checkbox"],
                    s = {
                        option: {
                            get: function(e) {
                                var t = e.attributes.value;
                                return !t || t.specified ? e.value : e.text
                            }
                        },
                        select: {
                            get: function(n) {
                                var i = n.options,
                                    s = n.selectedIndex,
                                    o = n.type === "select-one" || s < 0,
                                    u = o ? null : [],
                                    a = o ? s + 1 : i.length,
                                    f = s < 0 ? a : o ? s : 0,
                                    l, c;
                                for (; f < a; f++) {
                                    l = i[f];
                                    if ((l.selected || f === s) && (r ? !l.disabled : l.getAttribute("disabled") === null) && (!l.parentNode.disabled || !e.nodeName(l.parentNode, "optgroup"))) {
                                        c = t.dom(l).val();
                                        if (o) return c;
                                        u.push(c)
                                    }
                                }
                                return u
                            },
                            set: function(n, r, i) {
                                var s = t.makeArray(i);
                                return t.dom(n).find("option").each(function(n, r) {
                                    r.selected = e.inArray(t.dom(this).val(), s) >= 0
                                }), !s.length && (n.selectedIndex = -1), s
                            }
                        }
                    };
                return !e.support.getSetAttribute && (s.button = e.nodeHook), n || t.forEach(i, function(e) {
                        s[e] = {
                            get: function(e) {
                                return e.getAttribute("value") === null ? "on" : e.value
                            }
                        }
                    }), t.forEach(i, function(n) {
                        s[n] = s[n] || {}, s[n].set = function(n, r, i) {
                            if (t.type(i) === "array") return n.checked = e.inArray(t.dom(n).val(), i) >= 0
                        }
                    }),
                    function(e) {
                        var n, r;
                        if (e === undefined) {
                            if (!(n = this[0])) return;
                            return r = s[n.type] || s[n.nodeName.toLowerCase()] || {}, r.get && r.get(n, "value") || n.value
                        }
                        return this.each(function(n, i) {
                            if (i.nodeType !== 1) return;
                            var o = t.dom(i),
                                u = t.type(e) === "function" ? e.call(i, n, o.val()) : e;
                            u == null ? u = "" : t.type(u) === "number" ? u += "" : t.type(u) === "array" && (u = t.array(u).map(function(e) {
                                return e == null ? "" : e + ""
                            })), r = s[i.type] || s[i.nodeName.toLowerCase()] || {};
                            if (!r.set || r.set(i, "value", u) === undefined) i.value = u
                        }), this
                    }
            }()
        }), t.dom.extend({
            width: function(e) {
                return t._util_.access(this, "width", e, function(e, n, r) {
                    var i = r !== undefined,
                        s = i && parseFloat(r),
                        o = e != null && e == e.window ? "window" : e.nodeType === 9 ? "document" : !1;
                    if (i && s < 0 || isNaN(s)) return;
                    return i && /^(?:\d*\.)?\d+$/.test(r += "") && (r += "px"), o ? t._util_.getWindowOrDocumentWidthOrHeight(e, o, n) : i ? e.style.width = r : t._util_.getWidthOrHeight(e, n)
                })
            }
        }), t.dom.extend({
            end: function() {
                return this.prevObject || t.dom(null)
            }
        }), void
        function() {
            var e = "blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave mousewheel change select submit keydown keypress keyup error contextmenu".split(" "),
                n = {},
                r = function(e) {
                    n[e] = function(t, n) {
                        return n == null && (n = t, t = null), arguments.length > 0 ? this.on(e, null, t, n) : this.trigger(e)
                    }
                };
            for (var i = 0, s = e.length; i < s; i++) r(e[i]);
            t.dom.extend(n)
        }(), t.createChain("fn", function(e) {
                return new t.fn.$Fn(~"function|string".indexOf(t.type(e)) ? e : function() {})
            }, function(e) {
                this.fn = e
            }), t.fn.extend({
                bind: function(e) {
                    var n = this.fn,
                        r = arguments.length > 1 ? Array.prototype.slice.call(arguments, 1) : null;
                    return function() {
                        var i = t.type(n) === "string" ? e[n] : n,
                            s = r ? r.concat(Array.prototype.slice.call(arguments, 0)) : arguments;
                        return i.apply(e || i, s)
                    }
                }
            }), t.fn.blank = function() {}, t.fx = t.fx || {}, t.lang.inherits = t.base.inherits, t.fx.Timeline = function(e) {
                t.lang.Class.call(this), this.interval = 16, this.duration = 500, this.dynamic = !0, t.object.extend(this, e)
            }, t.lang.inherits(t.fx.Timeline, t.lang.Class, "baidu.fx.Timeline").extend({
                launch: function() {
                    var e = this;
                    return e.dispatchEvent("onbeforestart"), typeof e.initialize == "function" && e.initialize(), e["btime"] = (new Date).getTime(), e["etime"] = e["btime"] + (e.dynamic ? e.duration : 0), e["pulsed"](), e
                },
                "pulsed": function() {
                    var e = this,
                        t = (new Date).getTime();
                    e.percent = (t - e["btime"]) / e.duration, e.dispatchEvent("onbeforeupdate");
                    if (t >= e["etime"]) {
                        typeof e.render == "function" && e.render(e.transition(e.percent = 1)), typeof e.finish == "function" && e.finish(), e.dispatchEvent("onafterfinish"), e.dispose();
                        return
                    }
                    typeof e.render == "function" && e.render(e.transition(e.percent)), e.dispatchEvent("onafterupdate"), e["timer"] = setTimeout(function() {
                        e["pulsed"]()
                    }, e.interval)
                },
                transition: function(e) {
                    return e
                },
                cancel: function() {
                    this["timer"] && clearTimeout(this["timer"]), this["etime"] = this["btime"], typeof this.restore == "function" && this.restore(), this.dispatchEvent("oncancel"), this.dispose()
                },
                end: function() {
                    this["timer"] && clearTimeout(this["timer"]), this["etime"] = this["btime"], this["pulsed"]()
                }
            }), t.fx.create = function(e, n, r) {
                var i = new t.fx.Timeline(n);
                i.element = e, i.__type = r || i.__type, i["original"] = {};
                var s = "baidu_current_effect";
                return i.addEventListener("onbeforestart", function() {
                    var e = this,
                        t;
                    e.attribName = "att_" + e.__type.replace(/\W/g, "_"), t = e.element.getAttribute(s), e.element.setAttribute(s, (t || "") + "|" + e.guid + "|", 0), e.overlapping || ((t = e.element.getAttribute(e.attribName)) && baiduInstance(t).cancel(), e.element.setAttribute(e.attribName, e.guid, 0))
                }), i["clean"] = function(e) {
                    var t = this,
                        n;
                    if (e = t.element) e.removeAttribute(t.attribName), n = e.getAttribute(s), n = n.replace("|" + t.guid + "|", ""), n ? e.setAttribute(s, n, 0) : e.removeAttribute(s)
                }, i.addEventListener("oncancel", function() {
                    this["clean"](), this["restore"]()
                }), i.addEventListener("onafterfinish", function() {
                    this["clean"](), this.restoreAfterFinish && this["restore"]()
                }), i.protect = function(e) {
                    this["original"][e] = this.element.style[e]
                }, i["restore"] = function() {
                    var e = this["original"],
                        t = this.element.style,
                        n;
                    for (var r in e) {
                        n = e[r];
                        if (typeof n == "undefined") continue;
                        t[r] = n, !n && t.removeAttribute ? t.removeAttribute(r) : !n && t.removeProperty && t.removeProperty(r)
                    }
                }, i
            }, t.fx.current = function(e) {
                if (!(e = t.dom.g(e))) return null;
                var n, r, i = /\|([^\|]+)\|/g;
                do
                    if (r = e.getAttribute("baidu_current_effect")) break; while ((e = e.parentNode) && e.nodeType == 1);
                if (!r) return null;
                if (n = r.match(i)) {
                    i = /\|([^\|]+)\|/;
                    for (var s = 0; s < n.length; s++) i.test(n[s]), n[s] = t._global_._instances[RegExp.$1]
                }
                return n
            }, t.string.extend({
                formatColor: function() {
                    var e = /^\#[\da-f]{6}$/i,
                        t = /^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/i,
                        n = {
                            black: "#000000",
                            silver: "#c0c0c0",
                            gray: "#808080",
                            white: "#ffffff",
                            maroon: "#800000",
                            red: "#ff0000",
                            purple: "#800080",
                            fuchsia: "#ff00ff",
                            green: "#008000",
                            lime: "#00ff00",
                            olive: "#808000",
                            yellow: "#ffff0",
                            navy: "#000080",
                            blue: "#0000ff",
                            teal: "#008080",
                            aqua: "#00ffff"
                        };
                    return function() {
                        var r = this.valueOf();
                        if (e.test(r)) return r;
                        if (t.test(r)) {
                            for (var i, s = 1, r = "#"; s < 4; s++) i = parseInt(RegExp["$" + s]).toString(16), r += ("00" + i).substr(i.length);
                            return r
                        }
                        if (/^\#[\da-f]{3}$/.test(r)) {
                            var o = r.charAt(1),
                                u = r.charAt(2),
                                a = r.charAt(3);
                            return "#" + o + o + u + u + a + a
                        }
                        return n[r] ? n[r] : ""
                    }
                }()
            }), t.fx.move = function(e, n) {
                if (!(e = t.dom.g(e)) || t.dom.getStyle(e, "position") == "static") return null;
                n = t.object.extend({
                    x: 0,
                    y: 0
                }, n || {});
                if (n.x == 0 && n.y == 0) return null;
                var r = t.fx.create(e, t.object.extend({
                    initialize: function() {
                        this.protect("top"), this.protect("left"), this.originX = parseInt(t.dom.getStyle(e, "left")) || 0, this.originY = parseInt(t.dom.getStyle(e, "top")) || 0
                    },
                    transition: function(e) {
                        return 1 - Math.pow(1 - e, 2)
                    },
                    render: function(t) {
                        e.style.top = this.y * t + this.originY + "px", e.style.left = this.x * t + this.originX + "px"
                    }
                }, n), "baidu.fx.move");
                return r.launch()
            }, t.fx.moveTo = function(e, n, r) {
                if (!(e = t.dom.g(e)) || t.dom.getStyle(e, "position") == "static" || typeof n != "object") return null;
                var i = [n[0] || n.x || 0, n[1] || n.y || 0],
                    s = parseInt(t.dom.getStyle(e, "left")) || 0,
                    o = parseInt(t.dom.getStyle(e, "top")) || 0,
                    u = t.fx.move(e, t.object.extend({
                        x: i[0] - s,
                        y: i[1] - o
                    }, r || {}));
                return u
            }, t.fx.scrollBy = function(e, n, r) {
                if (!(e = t.dom.g(e)) || typeof n != "object") return null;
                var i = {},
                    s = {};
                i.x = n[0] || n.x || 0, i.y = n[1] || n.y || 0;
                var o = t.fx.create(e, t.object.extend({
                    initialize: function() {
                        var t = s.sTop = e.scrollTop,
                            n = s.sLeft = e.scrollLeft;
                        s.sx = Math.min(e.scrollWidth - e.clientWidth - n, i.x), s.sy = Math.min(e.scrollHeight - e.clientHeight - t, i.y)
                    },
                    transition: function(e) {
                        return 1 - Math.pow(1 - e, 2)
                    },
                    render: function(t) {
                        e.scrollTop = s.sy * t + s.sTop, e.scrollLeft = s.sx * t + s.sLeft
                    },
                    restore: function() {
                        e.scrollTop = s.sTop, e.scrollLeft = s.sLeft
                    }
                }, r), "baidu.fx.scroll");
                return o.launch()
            }, t.fx.scrollTo = function(e, n, r) {
                if (!(e = t.dom.g(e)) || typeof n != "object") return null;
                var i = {};
                return i.x = (n[0] || n.x || 0) - e.scrollLeft, i.y = (n[1] || n.y || 0) - e.scrollTop, t.fx.scrollBy(e, i, r)
            }, t._util_.smartAjax = t._util_.smartAjax || function(e) {
                return function(n, r, i, s) {
                    t.type(r) === "function" && (s = s || i, i = r, r = undefined), t.ajax({
                        type: e,
                        url: n,
                        data: r,
                        success: i,
                        dataType: s
                    })
                }
            }, t.get = t.get || t._util_.smartAjax("get"), t.global.get = function(e) {
                return t.global(e)
            }, t.global.set = function(e, n, r) {
                return t.global(e, n, !r)
            }, t.global.getZIndex = function(e, n) {
                var r = t.global.get("zIndex");
                return e && (r[e] = r[e] + (n || 1)), r[e]
            }, t.global.set("zIndex", {
                popup: 5e4,
                dialog: 1e3
            }, !0), t.i18n = t.i18n || {}, t.i18n.cultures = t.i18n.cultures || {}, t.i18n.cultures["zh-CN"] = t.object.extend(t.i18n.cultures["zh-CN"] || {}, function() {
                var e = "%u4E00,%u4E8C,%u4E09,%u56DB,%u4E94,%u516D,%u4E03,%u516B,%u4E5D,%u5341".split(",");
                return {
                    calendar: {
                        dateFormat: "yyyy-MM-dd",
                        titleNames: "#{yyyy}" + unescape("%u5E74") + "&nbsp;#{MM}" + unescape("%u6708"),
                        monthNamesShort: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
                        monthNames: function() {
                            var t = e.length,
                                n = [];
                            for (var r = 0; r < 12; r++) n.push(unescape(e[r] || e[t - 1] + e[r - t]));
                            return n
                        }(),
                        dayNames: function() {
                            var t = {
                                mon: 0,
                                tue: 1,
                                wed: 2,
                                thu: 3,
                                fri: 4,
                                sat: 5,
                                sun: "%u65E5"
                            };
                            for (var n in t) t[n] = unescape(e[t[n]] || t[n]);
                            return t
                        }()
                    },
                    timeZone: 8,
                    whitespace: new RegExp("(^[\\s\\t\\xa0\\u3000]+)|([\\u3000\\xa0\\s\\t]+$)", "g"),
                    number: {
                        group: ",",
                        groupLength: 3,
                        decimal: ".",
                        positive: "",
                        negative: "-",
                        _format: function(e, n) {
                            return t.i18n.number._format(e, {
                                group: this.group,
                                groupLength: this.groupLength,
                                decimal: this.decimal,
                                symbol: n ? this.negative : this.positive
                            })
                        }
                    },
                    currency: {
                        symbol: unescape("%uFFE5")
                    },
                    language: function() {
                        var e = {
                            ok: "%u786E%u5B9A",
                            cancel: "%u53D6%u6D88",
                            signin: "%u6CE8%u518C",
                            signup: "%u767B%u5F55"
                        };
                        for (var t in e) e[t] = unescape(e[t]);
                        return e
                    }()
                }
            }()), t.i18n.currentLocale = "zh-CN", t.i18n.date = t.i18n.date || {
                getDaysInMonth: function(e, n) {
                    var r = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
                    return n == 1 && t.i18n.date.isLeapYear(e) ? 29 : r[n]
                },
                isLeapYear: function(e) {
                    return !(e % 400) || !(e % 4) && !!(e % 100)
                },
                toLocaleDate: function(e, n, r) {
                    return this._basicDate(e, n, r || t.i18n.currentLocale)
                },
                _basicDate: function(e, n, r) {
                    var i = t.i18n.cultures[r || t.i18n.currentLocale].timeZone,
                        s = i * 60,
                        o, u, a = e.getTime();
                    return n ? (o = t.i18n.cultures[n].timeZone, u = o * 60) : (u = -1 * e.getTimezoneOffset(), o = u / 60), new Date(o != i ? a + (s - u) * 6e4 : a)
                },
                format: function(e, n) {
                    var r = t.i18n.cultures[n || t.i18n.currentLocale];
                    return t.date.format(t.i18n.date.toLocaleDate(e, "", n), r.calendar.dateFormat)
                }
            }, t.isDate = function(e) {
                return t.type(e) == "date" && e.toString() != "Invalid Date" && !isNaN(e)
            }, t.isDocument = function(e) {
                return t.type(e) == "Document"
            }, t.isElement = function(e) {
                return t.type(e) == "HTMLElement"
            }, t.isNumber = function(e) {
                return t.type(e) == "number" && isFinite(e)
            }, t.isObject = function(e) {
                return typeof e == "function" || typeof e == "object" && e != null
            }, t.isPlainObject = function(e) {
                var n, r = Object.prototype.hasOwnProperty;
                if (t.type(e) != "object") return !1;
                if (e.constructor && !r.call(e, "constructor") && !r.call(e.constructor.prototype, "isPrototypeOf")) return !1;
                for (n in e) break;
                return e.item && typeof e.length == "number" ? !1 : n === undefined || r.call(e, n)
            }, t.isWindow = function(e) {
                return t.type(e) == "Window"
            }, t.json = t.json || {}, t.json.parse = function(e) {
                return (new Function("return (" + e + ")"))()
            }, t.json.stringify = function() {
                function n(t) {
                    return /["\\\x00-\x1f]/.test(t) && (t = t.replace(/["\\\x00-\x1f]/g, function(t) {
                        var n = e[t];
                        return n ? n : (n = t.charCodeAt(), "\\u00" + Math.floor(n / 16).toString(16) + (n % 16).toString(16))
                    })), '"' + t + '"'
                }

                function r(e) {
                    var n = ["["],
                        r = e.length,
                        i, s, o;
                    for (s = 0; s < r; s++) {
                        o = e[s];
                        switch (typeof o) {
                            case "undefined":
                            case "function":
                            case "unknown":
                                break;
                            default:
                                i && n.push(","), n.push(t.json.stringify(o)), i = 1
                        }
                    }
                    return n.push("]"), n.join("")
                }

                function i(e) {
                    return e < 10 ? "0" + e : e
                }

                function s(e) {
                    return '"' + e.getFullYear() + "-" + i(e.getMonth() + 1) + "-" + i(e.getDate()) + "T" + i(e.getHours()) + ":" + i(e.getMinutes()) + ":" + i(e.getSeconds()) + '"'
                }
                var e = {
                    "\b": "\\b",
                    "	": "\\t",
                    "\n": "\\n",
                    "\f": "\\f",
                    "\r": "\\r",
                    '"': '\\"',
                    "\\": "\\\\"
                };
                return function(e) {
                    switch (typeof e) {
                        case "undefined":
                            return "undefined";
                        case "number":
                            return isFinite(e) ? String(e) : "null";
                        case "string":
                            return n(e);
                        case "boolean":
                            return String(e);
                        default:
                            if (e === null) return "null";
                            if (t.type(e) === "array") return r(e);
                            if (t.type(e) === "date") return s(e);
                            var i = ["{"],
                                o = t.json.stringify,
                                u, a;
                            for (var f in e)
                                if (Object.prototype.hasOwnProperty.call(e, f)) {
                                    a = e[f];
                                    switch (typeof a) {
                                        case "undefined":
                                        case "unknown":
                                        case "function":
                                            break;
                                        default:
                                            u && i.push(","), u = 1, i.push(o(f) + ":" + o(a))
                                    }
                                }
                            return i.push("}"), i.join("")
                    }
                }
            }(), t.lang.createClass = t.createClass, t.lang.guid = function() {
                return t.id()
            }, t.lang.isArray = t.isArray, t.lang.isDate = t.isDate, t.lang.isElement = t.isElement, t.lang.isObject = t.isObject, t.lang.isString = t.isString, t.lang.register = t.base.register, t.lang.toArray = function(e) {
                if (e === null || e === undefined) return [];
                if (t.lang.isArray(e)) return e;
                if (typeof e.length != "number" || typeof e == "string" || t.lang.isFunction(e)) return [e];
                if (e.item) {
                    var n = e.length,
                        r = new Array(n);
                    while (n--) r[n] = e[n];
                    return r
                }
                return [].slice.call(e)
            }, t.number.extend({
                comma: function(e) {
                    var t = this;
                    if (!e || e < 1) e = 3;
                    return t = String(t).split("."), t[0] = t[0].replace(new RegExp("(\\d)(?=(\\d{" + e + "})+$)", "ig"), "$1,"), t.join(".")
                }
            }), t.number.randomInt = function(e, t) {
                return Math.floor(Math.random() * (t - e + 1) + e)
            }, t.object.clone = function(e) {
                var n = e,
                    r, i;
                if (!e || e instanceof Number || e instanceof String || e instanceof Boolean) return n;
                if (t.lang.isArray(e)) {
                    n = [];
                    var s = 0;
                    for (r = 0, i = e.length; r < i; r++) n[s++] = t.object.clone(e[r])
                } else if (t.object.isPlain(e)) {
                    n = {};
                    for (r in e) e.hasOwnProperty(r) && (n[r] = t.object.clone(e[r]))
                }
                return n
            }, t.object.each = function(e, t) {
                var n, r, i;
                if ("function" == typeof t)
                    for (r in e)
                        if (e.hasOwnProperty(r)) {
                            i = e[r], n = t.call(e, i, r);
                            if (n === !1) break
                        }
                return e
            }, t.object.isEmpty = function(e) {
                var t = !0;
                if ("[object Array]" === Object.prototype.toString.call(e)) t = !e.length;
                else {
                    e = new Object(e);
                    for (var n in e) return !1
                }
                return t
            }, t.object.keys = function(e) {
                var t = [],
                    n = 0,
                    r;
                for (r in e) e.hasOwnProperty(r) && (t[n++] = r);
                return t
            }, t.object.map = function(e, t) {
                var n = {};
                for (var r in e) e.hasOwnProperty(r) && (n[r] = t(e[r], r));
                return n
            }, t.object.merge = function() {
                function e(e) {
                    return t.lang.isObject(e) && !t.lang.isFunction(e)
                }

                function n(n, r, i, s, o) {
                    if (r.hasOwnProperty(i))
                        if (o && e(n[i])) t.object.merge(n[i], r[i], {
                            overwrite: s,
                            recursive: o
                        });
                        else if (s || !(i in n)) n[i] = r[i]
                }
                return function(e, t, r) {
                    var i = 0,
                        s = r || {},
                        o = s.overwrite,
                        u = s.whiteList,
                        a = s.recursive,
                        f;
                    if (u && u.length) {
                        f = u.length;
                        for (; i < f; ++i) n(e, t, u[i], o, a)
                    } else
                        for (i in t) n(e, t, i, o, a);
                    return e
                }
            }(), t.object.values = function(e) {
                var t = [],
                    n = 0,
                    r;
                for (r in e) e.hasOwnProperty(r) && (t[n++] = e[r]);
                return t
            }, t.page.getHeight = function() {
                var e = document,
                    t = e.body,
                    n = e.documentElement,
                    r = e.compatMode == "BackCompat" ? t : e.documentElement;
                return Math.max(n.scrollHeight, t.scrollHeight, r.clientHeight)
            }, t.page.getViewHeight = function() {
                var e = document,
                    n = t.browser.ie || 1,
                    r = e.compatMode === "BackCompat" && n < 9 ? e.body : e.documentElement;
                return r.clientHeight
            }, t.page.getViewWidth = function() {
                var e = document,
                    t = e.compatMode == "BackCompat" ? e.body : e.documentElement;
                return t.clientWidth
            }, t.page.getWidth = function() {
                var e = document,
                    t = e.body,
                    n = e.documentElement,
                    r = e.compatMode == "BackCompat" ? t : e.documentElement;
                return Math.max(n.scrollWidth, t.scrollWidth, r.clientWidth)
            }, t.platform = t.platform || function() {
                var e = navigator.userAgent,
                    n = function() {};
                return t.forEach("Android iPad iPhone Linux Macintosh Windows X11".split(" "), function(r) {
                    var i = r.charAt(0).toUpperCase() + r.toLowerCase().substr(1);
                    t["is" + i] = n["is" + i] = !!~e.indexOf(r)
                }), n
            }(), t.plugin = function(e, n, r, i) {
                var s = t.isPlainObject(n),
                    o;
                return s || (i = r, r = n), t.type(r) != "function" && (r = undefined), t.type(i) != "function" && (i = undefined), o = t.createChain(e, r, i), s && o.extend(n), o
            }, t.post = t.post || t._util_.smartAjax("post"), t.setBack = function(e, t) {
                return e._back_ = t, e.getBack = function() {
                    return this._back_
                }, e
            }, t.createChain("sio", function(e) {
                switch (typeof e) {
                    case "string":
                        return new t.sio.$Sio(e)
                }
            }, function(e) {
                this.url = e
            }), t.sio._createScriptTag = function(e, t, n) {
                e.setAttribute("type", "text/javascript"), n && e.setAttribute("charset", n), e.setAttribute("src", t), document.getElementsByTagName("head")[0].appendChild(e)
            }, t.sio._removeScriptTag = function(e) {
                if (e.clearAttributes) e.clearAttributes();
                else
                    for (var t in e) e.hasOwnProperty(t) && delete e[t];
                e && e.parentNode && e.parentNode.removeChild(e), e = null
            }, t.sio.extend({
                callByBrowser: function(e, n) {
                    var r = this.url,
                        i = document.createElement("SCRIPT"),
                        s = 0,
                        o = n || {},
                        u = o.charset,
                        a = e || function() {},
                        f = o.timeOut || 0,
                        l;
                    i.onload = i.onreadystatechange = function() {
                        if (s) return;
                        var e = i.readyState;
                        if ("undefined" == typeof e || e == "loaded" || e == "complete") {
                            s = 1;
                            try {
                                a(), clearTimeout(l)
                            } finally {
                                i.onload = i.onreadystatechange = null, t.sio._removeScriptTag(i)
                            }
                        }
                    }, f && (l = setTimeout(function() {
                        i.onload = i.onreadystatechange = null, t.sio._removeScriptTag(i), o.onfailure && o.onfailure()
                    }, f)), t.sio._createScriptTag(i, r, u)
                }
            }), t.sio.extend({
                callByServer: function(e, n) {
                    function v(n) {
                        return function() {
                            try {
                                n ? a.onfailure && a.onfailure() : (e.apply(window, arguments), clearTimeout(h)), window[o] = null, delete window[o]
                            } catch (r) {} finally {
                                t.sio._removeScriptTag(i)
                            }
                        }
                    }
                    var r = this.url,
                        i = document.createElement("SCRIPT"),
                        s = "bd__cbs__",
                        o, u, a = n || {},
                        f = a.charset,
                        l = a.queryField || "callback",
                        c = a.timeOut || 0,
                        h, p = new RegExp("(\\?|&)" + l + "=([^&]*)"),
                        d;
                    if (t.lang.isFunction(e)) o = s + Math.floor(Math.random() * 2147483648).toString(36), window[o] = v(0);
                    else if (t.lang.isString(e)) o = e;
                    else if (d = p.exec(r)) o = d[2];
                    c && (h = setTimeout(v(1), c)), r = r.replace(p, "$1" + l + "=" + o), r.search(p) < 0 && (r += (r.indexOf("?") < 0 ? "?" : "&") + l + "=" + o), t.sio._createScriptTag(i, r, f)
                }
            }), t.sio.extend({
                log: function() {
                    var e = this.url,
                        t = new Image,
                        n = "tangram_sio_log_" + Math.floor(Math.random() * 2147483648).toString(36);
                    window[n] = t, t.onload = t.onerror = t.onabort = function() {
                        t.onload = t.onerror = t.onabort = null, window[n] = null, t = null
                    }, t.src = e
                }
            }), t.string.extend({
                decodeHTML: function() {
                    var e = this.replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");
                    return e.replace(/&#([\d]+);/g, function(e, t) {
                        return String.fromCharCode(parseInt(t, 10))
                    })
                }
            }), t.string.extend({
                encodeHTML: function() {
                    return this.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;")
                }
            }), t.string.extend({
                format: function(e) {
                    var t = this.valueOf(),
                        n = Array.prototype.slice.call(arguments, 0),
                        r = Object.prototype.toString;
                    return n.length ? (n = n.length == 1 ? e !== null && /\[object Array\]|\[object Object\]/.test(r.call(e)) ? e : n : n, t.replace(/#\{(.+?)\}/g, function(e, t) {
                        var i = n[t];
                        return "[object Function]" == r.call(i) && (i = i(t)), "undefined" == typeof i ? "" : i
                    })) : t
                }
            }), t.string.extend({
                getByteLength: function() {
                    return this.replace(/[^\x00-\xff]/g, "ci").length
                }
            }), t.string.extend({
                stripTags: function() {
                    return (this || "").replace(/<[^>]+>/g, "")
                }
            }), t.string.extend({
                subByte: function(e, n) {
                    t.check("number(,string)?$", "baidu.string.subByte");
                    if (e < 0 || this.getByteLength() <= e) return this.valueOf();
                    var r = this.substr(0, e).replace(/([^\x00-\xff])/g, "$1 ").substr(0, e).replace(/[^\x00-\xff]$/, "").replace(/([^\x00-\xff]) /g, "$1");
                    return r + (n || "")
                }
            }), t.string.extend({
                toHalfWidth: function() {
                    return this.replace(/[\uFF01-\uFF5E]/g, function(e) {
                        return String.fromCharCode(e.charCodeAt(0) - 65248)
                    }).replace(/\u3000/g, " ")
                }
            }), t.string.extend({
                wbr: function() {
                    return this.replace(/(?:<[^>]+>)|(?:&#?[0-9a-z]{2,6};)|(.{1})/gi, "$&<wbr>").replace(/><wbr>/g, ">")
                }
            }), t.swf = t.swf || {}, t.swf.version = function() {
                var e = navigator;
                if (e.plugins && e.mimeTypes.length) {
                    var t = e.plugins["Shockwave Flash"];
                    if (t && t.description) return t.description.replace(/([a-zA-Z]|\s)+/, "").replace(/(\s)+r/, ".") + ".0"
                } else if (window.ActiveXObject && !window.opera)
                    for (var n = 12; n >= 2; n--) try {
                        var r = new ActiveXObject("ShockwaveFlash.ShockwaveFlash." + n);
                        if (r) {
                            var i = r.GetVariable("$version");
                            return i.replace(/WIN/g, "").replace(/,/g, ".")
                        }
                    } catch (s) {}
            }(), t.swf.createHTML = function(e) {
                e = e || {};
                var n = t.swf.version,
                    r = e.ver || "6.0.0",
                    i, s, o, u, a, f, l = {},
                    c = t.string.encodeHTML;
                for (u in e) l[u] = e[u];
                e = l;
                if (!n) return "";
                n = n.split("."), r = r.split(".");
                for (o = 0; o < 3; o++) {
                    i = parseInt(n[o], 10), s = parseInt(r[o], 10);
                    if (s < i) break;
                    if (s > i) return ""
                }
                var h = e.vars,
                    p = ["classid", "codebase", "id", "width", "height", "align"];
                e.align = e.align || "middle", e.classid = "clsid:d27cdb6e-ae6d-11cf-96b8-444553540000", e.codebase = "http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0", e.movie = e.url || "", delete e.vars, delete e.url;
                if ("string" == typeof h) e.flashvars = h;
                else {
                    var d = [];
                    for (u in h) f = h[u], d.push(u + "=" + encodeURIComponent(f));
                    e.flashvars = d.join("&")
                }
                var v = ["<object "];
                for (o = 0, a = p.length; o < a; o++) f = p[o], v.push(" ", f, '="', c(e[f]), '"');
                v.push(">");
                var m = {
                    wmode: 1,
                    scale: 1,
                    quality: 1,
                    play: 1,
                    loop: 1,
                    menu: 1,
                    salign: 1,
                    bgcolor: 1,
                    base: 1,
                    allowscriptaccess: 1,
                    allownetworking: 1,
                    allowfullscreen: 1,
                    seamlesstabbing: 1,
                    devicefont: 1,
                    swliveconnect: 1,
                    flashvars: 1,
                    movie: 1
                };
                for (u in e) f = e[u], u = u.toLowerCase(), m[u] && (f || f === !1 || f === 0) && v.push('<param name="' + u + '" value="' + c(f) + '" />');
                e.src = e.movie, e.name = e.id, delete e.id, delete e.movie, delete e.classid, delete e.codebase, e.type = "application/x-shockwave-flash", e.pluginspage = "http://www.macromedia.com/go/getflashplayer", v.push("<embed");
                var g;
                for (u in e) {
                    f = e[u];
                    if (f || f === !1 || f === 0) {
                        if ((new RegExp("^salign$", "i")).test(u)) {
                            g = f;
                            continue
                        }
                        v.push(" ", u, '="', c(f), '"')
                    }
                }
                return g && v.push(' salign="', c(g), '"'), v.push("></embed></object>"), v.join("")
            }, t.swf.create = function(e, n) {
                e = e || {};
                var r = t.swf.createHTML(e) || e.errorMessage || "";
                n && "string" == typeof n && (n = document.getElementById(n)), t.dom.insertHTML(n || document.body, "beforeEnd", r)
            }, t.swf.getMovie = function(e) {
                var n = document[e],
                    r;
                return t.browser.ie == 9 ? n && n.length ? (r = t.array.remove(t.lang.toArray(n), function(e) {
                    return e.tagName.toLowerCase() != "embed"
                })).length == 1 ? r[0] : r : n : n || window[e]
            }, t.swf.Proxy = function(e, n, r) {
                var i = this,
                    s = this._flash = t.swf.getMovie(e),
                    o;
                if (!n) return this;
                o = setInterval(function() {
                    try {
                        s[n] && (i._initialized = !0, clearInterval(o), r && r())
                    } catch (e) {}
                }, 100)
            }, t.swf.Proxy.prototype.getFlash = function() {
                return this._flash
            }, t.swf.Proxy.prototype.isReady = function() {
                return !!this._initialized
            }, t.swf.Proxy.prototype.call = function(e, t) {
                try {
                    var n = this.getFlash(),
                        r = Array.prototype.slice.call(arguments);
                    r.shift(), n[e] && n[e].apply(n, r)
                } catch (i) {}
            },
            function(e) {
                var n = document.createElement("div");
                e.inlineBlockNeedsLayout = !1, e.shrinkWrapBlocks = !1, t(document).ready(function() {
                    var t = document.body,
                        r = document.createElement("div");
                    r.style.cssText = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px", t.appendChild(r).appendChild(n), typeof n.style.zoom != "undefined" && (n.style.cssText = "padding:0;margin:0;border:0;display:block;box-sizing:content-box;-moz-box-sizing:content-box;-webkit-box-sizing:content-box;width:1px;padding:1px;display:inline;zoom:1", e.inlineBlockNeedsLayout = n.offsetWidth === 3, n.style.display = "block", n.innerHTML = "<div></div>", n.firstChild.style.width = "5px", e.shrinkWrapBlocks = n.offsetWidth !== 3), t.removeChild(r), r = n = t = null
                })
            }(t._util_.support), t
    }();
    t.T = r
});