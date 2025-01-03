! function(e) {
    "use strict";

    function n(n, t, i) {
        "addEventListener" in e ? n.addEventListener(t, i, !1) : "attachEvent" in e && n.attachEvent("on" + t, i)
    }

    function t(n, t, i) {
        "removeEventListener" in e ? n.removeEventListener(t, i, !1) : "detachEvent" in e && n.detachEvent("on" + t, i)
    }

    function i() {
        var n, t = ["moz", "webkit", "o", "ms"];
        for (n = 0; n < t.length && !A; n += 1) A = e[t[n] + "RequestAnimationFrame"];
        A || c("setup", "RequestAnimationFrame not supported")
    }

    function o(n) {
        var t = "Host page: " + n;
        return e.top !== e.self && (t = e.parentIFrame && e.parentIFrame.getId ? e.parentIFrame.getId() + ": " + n : "Nested host page: " + n), t
    }

    function r(e) {
        return W + "[" + o(e) + "]"
    }

    function a(e) {
        return B[e] ? B[e].log : N
    }

    function c(e, n) {
        s("log", e, n, a(e))
    }

    function u(e, n) {
        s("info", e, n, a(e))
    }

    function f(e, n) {
        s("warn", e, n, !0)
    }

    function s(n, t, i, o) {
        !0 === o && "object" == typeof e.console && console[n](r(t), i)
    }

    function l(i) {
        function o() {
            function e() {
                y(Y), h(G)
            }
            a("Height"), a("Width"), v(e, Y, "init")
        }

        function r() {
            var e = X.substr(H).split(":");
            return {
                iframe: B[e[0]].iframe,
                id: e[0],
                height: e[1],
                width: e[2],
                type: e[3]
            }
        }

        function a(e) {
            var n = Number(B[G]["max" + e]),
                t = Number(B[G]["min" + e]),
                i = e.toLowerCase(),
                o = Number(Y[i]);
            c(G, "Checking " + i + " is in range " + t + "-" + n), t > o && (o = t, c(G, "Set " + i + " to min value")), o > n && (o = n, c(G, "Set " + i + " to max value")), Y[i] = "" + o
        }

        function s() {
            function e() {
                function e() {
                    var e = 0,
                        i = !1;
                    for (c(G, "Checking connection is from allowed list of origins: " + t); e < t.length; e++)
                        if (t[e] === n) {
                            i = !0;
                            break
                        }
                    return i
                }

                function i() {
                    var e = B[G].remoteHost;
                    return c(G, "Checking connection is from: " + e), n === e
                }
                return t.constructor === Array ? e() : i()
            }
            var n = i.origin,
                t = B[G].checkOrigin;
            if (t && "" + n != "null" && !e()) throw new Error("Unexpected message received from: " + n + " for " + Y.iframe.id + ". Message was: " + i.data + ". This error can be disabled by setting the checkOrigin: false option or by providing of array of trusted domains.");
            return !0
        }

        function l() {
            return W === ("" + X).substr(0, H) && X.substr(H).split(":")[0] in B
        }

        function I() {
            var e = Y.type in {
                "true": 1,
                "false": 1,
                undefined: 1
            };
            return e && c(G, "Ignoring init message from meta parent page"), e
        }

        function F(e) {
            return X.substr(X.indexOf(":") + S + e)
        }

        function M(e) {
            c(G, "MessageCallback passed: {iframe: " + Y.iframe.id + ", message: " + e + "}"), q("messageCallback", {
                iframe: Y.iframe,
                message: JSON.parse(e)
            }), c(G, "--")
        }

        function z() {
            var n = document.body.getBoundingClientRect(),
                t = Y.iframe.getBoundingClientRect();
            return JSON.stringify({
                clientHeight: Math.max(document.documentElement.clientHeight, e.innerHeight || 0),
                clientWidth: Math.max(document.documentElement.clientWidth, e.innerWidth || 0),
                offsetTop: parseInt(t.top - n.top, 10),
                offsetLeft: parseInt(t.left - n.left, 10),
                scrollTop: e.pageYOffset,
                scrollLeft: e.pageXOffset
            })
        }

        function E(e, n) {
            function t() {
                w("Send Page Info", "pageInfo:" + z(), e, n)
            }
            x(t, 32)
        }

        function C() {
            function i(n, t) {
                function i() {
                    B[a] ? E(B[a].iframe, a) : o()
                }["scroll", "resize"].forEach(function(o) {
                    c(a, n + o + " listener for sendPageInfo"), t(e, o, i)
                })
            }

            function o() {
                i("Remove ", t)
            }

            function r() {
                i("Add ", n)
            }
            var a = G;
            r(), B[a].stopPageInfo = o
        }

        function O() {
            B[G] && B[G].stopPageInfo && (B[G].stopPageInfo(), delete B[G].stopPageInfo)
        }

        function R() {
            var e = !0;
            return null === Y.iframe && (f(G, "IFrame (" + Y.id + ") not found"), e = !1), e
        }

        function N(e) {
            var n = e.getBoundingClientRect();
            return g(G), {
                x: Math.floor(Number(n.left) + Number(L.x)),
                y: Math.floor(Number(n.top) + Number(L.y))
            }
        }

        function T(n) {
            function t() {
                L = a, P(), c(G, "--")
            }

            function i() {
                return {
                    x: Number(Y.width) + r.x,
                    y: Number(Y.height) + r.y
                }
            }

            function o() {
                e.parentIFrame ? e.parentIFrame["scrollTo" + (n ? "Offset" : "")](a.x, a.y) : f(G, "Unable to scroll to requested position, window.parentIFrame not found")
            }
            var r = n ? N(Y.iframe) : {
                    x: 0,
                    y: 0
                },
                a = i();
            c(G, "Reposition requested from iFrame (offset x:" + r.x + " y:" + r.y + ")"), e.top !== e.self ? o() : t()
        }

        function P() {
            !1 !== q("scrollCallback", L) ? h(G) : p()
        }

        function A(n) {
            function t() {
                var e = N(a);
                c(G, "Moving to in page link (#" + o + ") at x: " + e.x + " y: " + e.y), L = {
                    x: e.x,
                    y: e.y
                }, P(), c(G, "--")
            }

            function i() {
                e.parentIFrame ? e.parentIFrame.moveToAnchor(o) : c(G, "In page link #" + o + " not found and window.parentIFrame not found")
            }
            var o = n.split("#")[1] || "",
                r = decodeURIComponent(o),
                a = document.getElementById(r) || document.getElementsByName(r)[0];
            a ? t() : e.top !== e.self ? i() : c(G, "In page link #" + o + " not found")
        }

        function q(e, n) {
            return d(G, e, n)
        }

        function V() {
            switch (B[G].firstRun && J(), Y.type) {
                case "close":
                    m(Y.iframe);
                    break;
                case "message":
                    M(F(6));
                    break;
                case "scrollTo":
                    T(!1);
                    break;
                case "scrollToOffset":
                    T(!0);
                    break;
                case "pageInfo":
                    E(B[G].iframe, G), C();
                    break;
                case "pageInfoStop":
                    O();
                    break;
                case "inPageLink":
                    A(F(9));
                    break;
                case "reset":
                    b(Y);
                    break;
                case "init":
                    o(), q("initCallback", Y.iframe), q("resizedCallback", Y);
                    break;
                default:
                    o(), q("resizedCallback", Y)
            }
        }

        function U(e) {
            var n = !0;
            return B[e] || (n = !1, f(Y.type + " No settings for " + e + ". Message was: " + X)), n
        }

        function D() {
            for (var e in B) w("iFrame requested init", k(e), document.getElementById(e), e)
        }

        function J() {
            B[G].firstRun = !1
        }
        var X = i.data,
            Y = {},
            G = null;
        "[iFrameResizerChild]Ready" === X ? D() : l() ? (Y = r(), G = j = Y.id, !I() && U(G) && (c(G, "Received: " + X), R() && s() && V())) : u(G, "Ignored: " + X)
    }

    function d(e, n, t) {
        var i = null,
            o = null;
        if (B[e]) {
            if (i = B[e][n], "function" != typeof i) throw new TypeError(n + " on iFrame[" + e + "] is not a function");
            o = i(t)
        }
        return o
    }

    function m(e) {
        var n = e.id;
        c(n, "Removing iFrame: " + n), e.parentNode.removeChild(e), d(n, "closedCallback", n), c(n, "--"), delete B[n]
    }

    function g(n) {
        null === L && (L = {
            x: void 0 !== e.pageXOffset ? e.pageXOffset : document.documentElement.scrollLeft,
            y: void 0 !== e.pageYOffset ? e.pageYOffset : document.documentElement.scrollTop
        }, c(n, "Get page position: " + L.x + "," + L.y))
    }

    function h(n) {
        null !== L && (e.scrollTo(L.x, L.y), c(n, "Set page position: " + L.x + "," + L.y), p())
    }

    function p() {
        L = null
    }

    function b(e) {
        function n() {
            y(e), w("reset", "reset", e.iframe, e.id)
        }
        c(e.id, "Size reset requested by " + ("init" === e.type ? "host page" : "iFrame")), g(e.id), v(n, e, "reset")
    }

    function y(e) {
        function n(n) {
            e.iframe.style[n] = e[n] + "px", c(e.id, "IFrame (" + o + ") " + n + " set to " + e[n] + "px")
        }

        function t(n) {
            T || "0" !== e[n] || (T = !0, c(o, "Hidden iFrame detected, creating visibility listener"), F())
        }

        function i(e) {
            n(e), t(e)
        }
        var o = e.iframe.id;
        B[o] && (B[o].sizeHeight && i("height"), B[o].sizeWidth && i("width"))
    }

    function v(e, n, t) {
        t !== n.type && A ? (c(n.id, "Requesting animation frame"), A(e)) : e()
    }

    function w(e, n, t, i) {
        function o() {
            var o = B[i].targetOrigin;
            c(i, "[" + e + "] Sending msg to iframe[" + i + "] (" + n + ") targetOrigin: " + o), t.contentWindow.postMessage(W + n, o)
        }

        function r() {
            u(i, "[" + e + "] IFrame(" + i + ") not found"), B[i] && delete B[i]
        }

        function a() {
            t && "contentWindow" in t && null !== t.contentWindow ? o() : r()
        }
        i = i || t.id, B[i] && a()
    }

    function k(e) {
        return e + ":" + B[e].bodyMarginV1 + ":" + B[e].sizeWidth + ":" + B[e].log + ":" + B[e].interval + ":" + B[e].enablePublicMethods + ":" + B[e].autoResize + ":" + B[e].bodyMargin + ":" + B[e].heightCalculationMethod + ":" + B[e].bodyBackground + ":" + B[e].bodyPadding + ":" + B[e].tolerance + ":" + B[e].inPageLinks + ":" + B[e].resizeFrom + ":" + B[e].widthCalculationMethod
    }

    function I(e, t) {
        function i() {
            function n(n) {
                1 / 0 !== B[I][n] && 0 !== B[I][n] && (e.style[n] = B[I][n] + "px", c(I, "Set " + n + " = " + B[I][n] + "px"))
            }

            function t(e) {
                if (B[I]["min" + e] > B[I]["max" + e]) throw new Error("Value for min" + e + " can not be greater than max" + e)
            }
            t("Height"), t("Width"), n("maxHeight"), n("minHeight"), n("maxWidth"), n("minWidth")
        }

        function o() {
            var e = t && t.id || U.id + R++;
            return null !== document.getElementById(e) && (e += R++), e
        }

        function r(n) {
            return j = n, "" === n && (e.id = n = o(), N = (t || {}).log, j = n, c(n, "Added missing iframe ID: " + n + " (" + e.src + ")")), n
        }

        function a() {
            c(I, "IFrame scrolling " + (B[I].scrolling ? "enabled" : "disabled") + " for " + I), e.style.overflow = !1 === B[I].scrolling ? "hidden" : "auto", e.scrolling = !1 === B[I].scrolling ? "no" : "yes"
        }

        function u() {
            ("number" == typeof B[I].bodyMargin || "0" === B[I].bodyMargin) && (B[I].bodyMarginV1 = B[I].bodyMargin, B[I].bodyMargin = "" + B[I].bodyMargin + "px")
        }

        function s() {
            var n = B[I].firstRun,
                t = B[I].heightCalculationMethod in q;
            !n && t && b({
                iframe: e,
                height: 0,
                width: 0,
                type: "init"
            })
        }

        function l() {
            Function.prototype.bind && (B[I].iframe.iFrameResizer = {
                close: m.bind(null, B[I].iframe),
                resize: w.bind(null, "Window resize", "resize", B[I].iframe),
                moveToAnchor: function(e) {
                    w("Move to anchor", "inPageLink:" + e, B[I].iframe, I)
                },
                sendMessage: function(e) {
                    e = JSON.stringify(e), w("Send Message", "message:" + e, B[I].iframe, I)
                }
            })
        }

        function d(t) {
            function i() {
                w("iFrame.onload", t, e), s()
            }
            n(e, "load", i), w("init", t, e)
        }

        function g(e) {
            if ("object" != typeof e) throw new TypeError("Options is not an object")
        }

        function h(e) {
            for (var n in U) U.hasOwnProperty(n) && (B[I][n] = e.hasOwnProperty(n) ? e[n] : U[n])
        }

        function p(e) {
            return "" === e || "file://" === e ? "*" : e
        }

        function y(n) {
            n = n || {}, B[I] = {
                firstRun: !0,
                iframe: e,
                remoteHost: e.src.split("/").slice(0, 3).join("/")
            }, g(n), h(n), B[I].targetOrigin = !0 === B[I].checkOrigin ? p(B[I].remoteHost) : "*"
        }

        function v() {
            return I in B && "iFrameResizer" in e
        }
        var I = r(e.id);
        v() ? f(I, "Ignored iFrame, already setup.") : (y(t), a(), i(), u(), d(k(I)), l())
    }

    function x(e, n) {
        null === V && (V = setTimeout(function() {
            V = null, e()
        }, n))
    }

    function F() {
        function n() {
            function e(e) {
                function n(n) {
                    return "0px" === B[e].iframe.style[n]
                }

                function t(e) {
                    return null !== e.offsetParent
                }
                t(B[e].iframe) && (n("height") || n("width")) && w("Visibility change", "resize", B[e].iframe, e)
            }
            for (var n in B) e(n)
        }

        function t(e) {
            c("window", "Mutation observed: " + e[0].target + " " + e[0].type), x(n, 16)
        }

        function i() {
            var e = document.querySelector("body"),
                n = {
                    attributes: !0,
                    attributeOldValue: !1,
                    characterData: !0,
                    characterDataOldValue: !1,
                    childList: !0,
                    subtree: !0
                },
                i = new o(t);
            i.observe(e, n)
        }
        var o = e.MutationObserver || e.WebKitMutationObserver;
        o && i()
    }

    function M(e) {
        function n() {
            E("Window " + e, "resize")
        }
        c("window", "Trigger event: " + e), x(n, 16)
    }

    function z() {
        function e() {
            E("Tab Visable", "resize")
        }
        "hidden" !== document.visibilityState && (c("document", "Trigger event: Visiblity change"), x(e, 16))
    }

    function E(e, n) {
        function t(e) {
            return "parent" === B[e].resizeFrom && B[e].autoResize && !B[e].firstRun
        }
        for (var i in B) t(i) && w(e, n, document.getElementById(i), i)
    }

    function C() {
        n(e, "message", l), n(e, "resize", function() {
            M("resize")
        }), n(document, "visibilitychange", z), n(document, "-webkit-visibilitychange", z), n(e, "focusin", function() {
            M("focus")
        }), n(e, "focus", function() {
            M("focus")
        })
    }

    function O() {
        function e(e, t) {
            function i() {
                if (!t.tagName) throw new TypeError("Object is not a valid DOM element");
                if ("IFRAME" !== t.tagName.toUpperCase()) throw new TypeError("Expected <IFRAME> tag, found <" + t.tagName + ">")
            }
            t && (i(), I(t, e), n.push(t))
        }
        var n;
        return i(), C(),
            function(t, i) {
                switch (n = [], typeof i) {
                    case "undefined":
                    case "string":
                        Array.prototype.forEach.call(document.querySelectorAll(i || "iframe"), e.bind(void 0, t));
                        break;
                    case "object":
                        e(t, i);
                        break;
                    default:
                        throw new TypeError("Unexpected data type (" + typeof i + ")")
                }
                return n
            }
    }
    var R = 0,
        N = !1,
        T = !1,
        P = "message",
        S = P.length,
        W = "[iFrameSizer]",
        H = W.length,
        L = null,
        A = e.requestAnimationFrame,
        q = {
            max: 1,
            scroll: 1,
            bodyScroll: 1,
            documentElementScroll: 1
        },
        B = {},
        V = null,
        j = "Host Page",
        U = {
            autoResize: !0,
            bodyBackground: null,
            bodyMargin: null,
            bodyMarginV1: 8,
            bodyPadding: null,
            checkOrigin: !0,
            inPageLinks: !1,
            enablePublicMethods: !0,
            heightCalculationMethod: "bodyOffset",
            id: "iFrameResizer",
            interval: 32,
            log: !1,
            maxHeight: 1 / 0,
            maxWidth: 1 / 0,
            minHeight: 0,
            minWidth: 0,
            resizeFrom: "parent",
            scrolling: !1,
            sizeHeight: !0,
            sizeWidth: !1,
            tolerance: 0,
            widthCalculationMethod: "scroll",
            closedCallback: function() {},
            initCallback: function() {},
            messageCallback: function() {
                f("MessageCallback function not defined")
            },
            resizedCallback: function() {},
            scrollCallback: function() {
                return !0
            }
        };
    e.iFrameResize = e.iFrameResize || O()
}(window || {});