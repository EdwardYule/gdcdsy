! function(n) {
    "use strict";

    function r(n, r) {
        var t = (65535 & n) + (65535 & r);
        return (n >> 16) + (r >> 16) + (t >> 16) << 16 | 65535 & t
    }

    function t(n, t, e, o, u, c) {
        return r((f = r(r(t, n), r(o, c))) << (i = u) | f >>> 32 - i, e);
        var f, i
    }

    function e(n, r, e, o, u, c, f) {
        return t(r & e | ~r & o, n, r, u, c, f)
    }

    function o(n, r, e, o, u, c, f) {
        return t(r & o | e & ~o, n, r, u, c, f)
    }

    function u(n, r, e, o, u, c, f) {
        return t(r ^ e ^ o, n, r, u, c, f)
    }

    function c(n, r, e, o, u, c, f) {
        return t(e ^ (r | ~o), n, r, u, c, f)
    }

    function f(n, t) {
        var f, i, a, h;
        n[t >> 5] |= 128 << t % 32, n[14 + (t + 64 >>> 9 << 4)] = t;
        for (var v = 1732584193, g = -271733879, l = -1732584194, d = 271733878, C = 0; C < n.length; C += 16) v = e(f = v, i = g, a = l, h = d, n[C], 7, -680876936), d = e(d, v, g, l, n[C + 1], 12, -389564586), l = e(l, d, v, g, n[C + 2], 17, 606105819), g = e(g, l, d, v, n[C + 3], 22, -1044525330), v = e(v, g, l, d, n[C + 4], 7, -176418897), d = e(d, v, g, l, n[C + 5], 12, 1200080426), l = e(l, d, v, g, n[C + 6], 17, -1473231341), g = e(g, l, d, v, n[C + 7], 22, -45705983), v = e(v, g, l, d, n[C + 8], 7, 1770035416), d = e(d, v, g, l, n[C + 9], 12, -1958414417), l = e(l, d, v, g, n[C + 10], 17, -42063), g = e(g, l, d, v, n[C + 11], 22, -1990404162), v = e(v, g, l, d, n[C + 12], 7, 1804603682), d = e(d, v, g, l, n[C + 13], 12, -40341101), l = e(l, d, v, g, n[C + 14], 17, -1502002290), v = o(v, g = e(g, l, d, v, n[C + 15], 22, 1236535329), l, d, n[C + 1], 5, -165796510), d = o(d, v, g, l, n[C + 6], 9, -1069501632), l = o(l, d, v, g, n[C + 11], 14, 643717713), g = o(g, l, d, v, n[C], 20, -373897302), v = o(v, g, l, d, n[C + 5], 5, -701558691), d = o(d, v, g, l, n[C + 10], 9, 38016083), l = o(l, d, v, g, n[C + 15], 14, -660478335), g = o(g, l, d, v, n[C + 4], 20, -405537848), v = o(v, g, l, d, n[C + 9], 5, 568446438), d = o(d, v, g, l, n[C + 14], 9, -1019803690), l = o(l, d, v, g, n[C + 3], 14, -187363961), g = o(g, l, d, v, n[C + 8], 20, 1163531501), v = o(v, g, l, d, n[C + 13], 5, -1444681467), d = o(d, v, g, l, n[C + 2], 9, -51403784), l = o(l, d, v, g, n[C + 7], 14, 1735328473), v = u(v, g = o(g, l, d, v, n[C + 12], 20, -1926607734), l, d, n[C + 5], 4, -378558), d = u(d, v, g, l, n[C + 8], 11, -2022574463), l = u(l, d, v, g, n[C + 11], 16, 1839030562), g = u(g, l, d, v, n[C + 14], 23, -35309556), v = u(v, g, l, d, n[C + 1], 4, -1530992060), d = u(d, v, g, l, n[C + 4], 11, 1272893353), l = u(l, d, v, g, n[C + 7], 16, -155497632), g = u(g, l, d, v, n[C + 10], 23, -1094730640), v = u(v, g, l, d, n[C + 13], 4, 681279174), d = u(d, v, g, l, n[C], 11, -358537222), l = u(l, d, v, g, n[C + 3], 16, -722521979), g = u(g, l, d, v, n[C + 6], 23, 76029189), v = u(v, g, l, d, n[C + 9], 4, -640364487), d = u(d, v, g, l, n[C + 12], 11, -421815835), l = u(l, d, v, g, n[C + 15], 16, 530742520), v = c(v, g = u(g, l, d, v, n[C + 2], 23, -995338651), l, d, n[C], 6, -198630844), d = c(d, v, g, l, n[C + 7], 10, 1126891415), l = c(l, d, v, g, n[C + 14], 15, -1416354905), g = c(g, l, d, v, n[C + 5], 21, -57434055), v = c(v, g, l, d, n[C + 12], 6, 1700485571), d = c(d, v, g, l, n[C + 3], 10, -1894986606), l = c(l, d, v, g, n[C + 10], 15, -1051523), g = c(g, l, d, v, n[C + 1], 21, -2054922799), v = c(v, g, l, d, n[C + 8], 6, 1873313359), d = c(d, v, g, l, n[C + 15], 10, -30611744), l = c(l, d, v, g, n[C + 6], 15, -1560198380), g = c(g, l, d, v, n[C + 13], 21, 1309151649), v = c(v, g, l, d, n[C + 4], 6, -145523070), d = c(d, v, g, l, n[C + 11], 10, -1120210379), l = c(l, d, v, g, n[C + 2], 15, 718787259), g = c(g, l, d, v, n[C + 9], 21, -343485551), v = r(v, f), g = r(g, i), l = r(l, a), d = r(d, h);
        return [v, g, l, d]
    }

    function i(n) {
        for (var r = "", t = 32 * n.length, e = 0; t > e; e += 8) r += String.fromCharCode(n[e >> 5] >>> e % 32 & 255);
        return r
    }

    function a(n) {
        var r = [];
        for (r[(n.length >> 2) - 1] = void 0, e = 0; e < r.length; e += 1) r[e] = 0;
        for (var t = 8 * n.length, e = 0; t > e; e += 8) r[e >> 5] |= (255 & n.charCodeAt(e / 8)) << e % 32;
        return r
    }

    function h(n) {
        for (var r, t = "0123456789abcdef", e = "", o = 0; o < n.length; o += 1) r = n.charCodeAt(o), e += t.charAt(r >>> 4 & 15) + t.charAt(15 & r);
        return e
    }

    function v(n) {
        return unescape(encodeURIComponent(n))
    }

    function g(n) {
        return i(f(a(r = v(n)), 8 * r.length));
        var r
    }

    function l(n, r) {
        return function(n, r) {
            var t, e, o = a(n),
                u = [],
                c = [];
            for (u[15] = c[15] = void 0, 16 < o.length && (o = f(o, 8 * n.length)), t = 0; 16 > t; t += 1) u[t] = 909522486 ^ o[t], c[t] = 1549556828 ^ o[t];
            return e = f(u.concat(a(r)), 512 + 8 * r.length), i(f(c.concat(e), 640))
        }(v(n), v(r))
    }

    function d(n, r, t) {
        return r ? t ? l(r, n) : h(l(r, n)) : t ? g(n) : h(g(n))
    }
    n.md5 = d
}(this);