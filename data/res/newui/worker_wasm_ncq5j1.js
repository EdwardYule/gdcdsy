function ba() {
    this.i = {}
}
var ha;
ha = "undefined" !== typeof window ? window : self;

function ra(b) {
    var a = sa;
    a.i[b] = a.w()
}

function ta(b, a) {
    var c = sa;
    return parseFloat((c.i[a] - c.i[b]).toFixed(2))
}
ba.prototype.w = ha.performance && ha.performance.now ? function() {
    return performance.now()
} : function() {
    return Date.now()
};
var Aa, Ba, Fa, Ga, Ha, Ia, z, Ja, Ka, La, Ua, Va, Wa, Xa, Ya, Za, $a, ab;
ArrayBuffer.prototype.slice || (ArrayBuffer.prototype.slice = function(b, a) {
    void 0 === b && (b = 0);
    void 0 === a && (a = this.byteLength);
    b = Math.floor(b);
    a = Math.floor(a);
    0 > b && (b += this.byteLength);
    0 > a && (a += this.byteLength);
    b = Math.min(Math.max(0, b), this.byteLength);
    a = Math.min(Math.max(0, a), this.byteLength);
    if (0 >= a - b) return new ArrayBuffer(0);
    var c = new ArrayBuffer(a - b),
        q = new Uint8Array(c);
    b = new Uint8Array(this, b, a - b);
    q.set(b);
    return c
});

function ib(b, a) {
    var c = b.length;
    a = a || 2;
    ab || (ab = z._get_feature_points_address() >> 2);
    Fa.set(b, ab);
    z._parse_points(c, a);
    return new Float32Array(Aa.slice(ab << 2, ab + c << 2))
}

function jb() {
    Wa || (Wa = z._get_line_vertex_start());
    return new Float32Array(Aa.slice(Wa, z._get_line_vertex_end()))
}

function kb() {
    Va || (Va = z._get_line_index_start());
    return new Uint16Array(Aa.slice(Va, z._get_line_index_end()))
}

function lb() {
    return z._get_line_vertex_count()
}

function mb(b, a, c, q, f, p, k, r, w, v, e) {
    var h = 0;
    q && (h = q.length, Ka || (Ka = z._get_line_altitudes_address() >> 1), Ha.set(q, Ka));
    r && r.length && (Ua || (Ua = z._get_line_turnings_address()), Ba.set(r, Ua));
    f = f || 0;
    v = v || 0;
    e = e || k.length / 2;
    Ja || (Ja = z._get_line_data_address() >> 1);
    Ha.set(b, Ja);
    La || (La = z._get_line_points_address() >> 2);
    Ga.set(k, La);
    z._append_line_data(b.length, a[0], a[1], a[2], a[3], c, h, f, p ? 1 : 0, k.length, w, v, e)
}

function nb() {
    z._reset_line()
}

function ob(b) {
    if (Aa) b && b();
    else {
        var a = pb();
        var c = new WebAssembly.Memory({
            initial: 70,
            maximum: 70
        });
        WebAssembly.instantiate(a, {
            env: {
                DYNAMICTOP_PTR: 0,
                tempDoublePtr: 0,
                ABORT: 0,
                STACKTOP: 0,
                STACK_MAX: 0,
                gb: 0,
                fb: 0,
                memory: c
            },
            global: {
                NaN: NaN,
                Infinity: Infinity
            }
        }).then(function(a) {
            Aa = c.buffer;
            Fa = new Float32Array(Aa);
            Ga = new Int32Array(Aa);
            Ba = new Int8Array(Aa);
            Ha = new Int16Array(Aa);
            Ia = new Uint16Array(Aa);
            z = a.instance.exports;
            b && b()
        })
    }
}

function qb(b, a, c, q, f) {
    var p = {
        fixedLabel: [],
        lineLabel: []
    };
    if (!b) return p;
    var k = [];
    if (a && a.length)
        for (var r = 0; r < a.length; r++) {
            var w = a[r],
                v = w[0] / 4;
            H[v + 1] === rb && k.push(T(H[v] + 1, w[0], w[0] + w[1]))
        }
    a = T(0, c[0], c[0] + c[1]) || [];
    q = q.height;
    p.fixedLabel = sb(b, k, q, f, void 0);
    k = [];
    for (c = 0; c < a.length; c++) {
        var e = b,
            h = a[c];
        r = f;
        w = q;
        v = k;
        var d = h[0] / 4,
            t = T(H[d] + 1, h[0], h[0] + h[1]),
            n = T(0, t[6][0], t[6][0] + t[6][1]);
        h = [];
        for (var g = 0; g < n.length; g++) h[g] = new Uint16Array(e, n[g][0], n[g][1] / 2);
        n = tb;
        var l = Math.pow(2, 18 - r.zoom),
            u = r.col *
            r.baseTileSize * l,
            m = r.row * r.baseTileSize * l,
            A = new Uint16Array(e, t[4][0], t[4][1] / 2),
            B = A.length,
            y = ub[d + 1],
            x = U.b(W, y, "pointText", r.useZoom, Y, !1, Z);
        d = ub[d + 2];
        var G = vb(e, t[0][0], t[0][1], "utf-8"),
            C = h.length || G.split("").length;
        if (0 !== C) {
            var F = new Int32Array(e, t[1][0], t[1][1] / 4),
                L = new Int16Array(e, t[5][0], t[5][1] / 2),
                P = [L[0]],
                N = Array.prototype.slice.call(F.slice(0, 2)),
                S = 2;
            for (g = 1; S < F.length; S += 2, g++) N[S] = N[S - 2] + F[S], N[S + 1] = N[S - 1] + F[S + 1], 1 === L.length ? P[g] = L[0] : 1 < L.length && (P[g] = P[g - 1] + L[g]);
            var fa = new Uint16Array(e,
                t[3][0], t[3][1] / 2);
            e = new Uint16Array(e, t[2][0], t[2][1] / 2);
            for (g = 0; g < B; g++)
                if (t = A[g], wb(t, r.useZoom)) {
                    if (r.processedLabelZooms && r.processedLabelZooms.length) {
                        F = r.processedLabelZooms;
                        var M = !1;
                        for (S = 0; S < F.length; S++)
                            if (wb(t, F[S])) {
                                M = !0;
                                break
                            }
                        if (M) continue
                    }
                    S = fa[g];
                    F = g * C * 2;
                    F = N.slice(F, F + 2 * C);
                    var I = M = 1E3,
                        O = -1E3,
                        Q = -1E3,
                        J = h.slice(0);
                    S && J.reverse();
                    for (var K, E, D, ia = [], R = 0; R < C; R++) {
                        var Ma = e[C * g + R],
                            ka = F[2 * R] / 100,
                            la = F[2 * R + 1] / 100,
                            xa = 0;
                        0 < L.length && (xa = P[g * C] / 100);
                        0 === R && (K = ka, E = la, D = {
                            lng: u + K,
                            lat: m + E
                        });
                        ka = (ka - K) /
                            l;
                        la = (la - E) / l;
                        var V = J[R],
                            ca = null,
                            da = null;
                        if (V && 0 < V.length) {
                            var ua = V[0];
                            ca = V[1];
                            var aa = V[2] / n;
                            V = V[3] / n;
                            da = [aa, V];
                            var ma = ua / 512,
                                ja = (w - ca - V * n) / w,
                                Na = ua = (ua + aa * n) / 512;
                            ca = (w - ca) / w;
                            ca = [ma, ja, ua, ja, Na, ca, ma, ja, Na, ca, ma, ca];
                            ma = ka - aa / 2;
                            ja = la + V / 2;
                            V = la - V / 2;
                            aa = ka + aa / 2;
                            ma < M && (M = ma);
                            aa > O && (O = aa);
                            V < I && (I = V);
                            ja > Q && (Q = ja)
                        }
                        ia.push({
                            offset: [ka, la],
                            z: xa,
                            size: da,
                            angle: Ma,
                            texcoord: ca
                        })
                    }
                    J = F[2 * (C - 1)] - F[0];
                    F = F[2 * (C - 1) + 1] - F[1];
                    1 === S && (J = -J, F = -F);
                    0 === J ? F = 0 < F ? 90 : 270 : (R = Math.atan(F / J) / Math.PI * 180, 0 > J && 0 < F ? R += 180 : 0 > J && 0 > F ? R += 180 :
                        0 < J && 0 > F && (R += 360), 360 === R && (R = 0), F = R);
                    v.push({
                        type: "line",
                        rank: d,
                        name: G,
                        wordCount: C,
                        pt: D,
                        mcInTile: {
                            x: K,
                            y: E
                        },
                        reverse: S,
                        styleId: y,
                        styleText: x,
                        bds: [M, I, O, Q],
                        wordsInfo: ia,
                        labelAngle: F,
                        tracer: t,
                        processedInZoom: r.useZoom,
                        key: "line_" + d + "_" + D.lng + "_" + D.lat
                    })
                }
        }
    }
    p.lineLabel = k;
    p.textureHeight = q;
    p.tileInfo = f;
    return p
}

function sb(b, a, c, q, f, p) {
    for (var k = [], r = 0; r < a.length; r++) {
        var w = b,
            v = a[r],
            e = q,
            h = c,
            d = k,
            t = f,
            n = p;
        if (v && v.length) {
            t = t || Y;
            var g = e.useZoom;
            9 === g && (g = 8);
            for (var l = Math.pow(2, 18 - e.zoom), u = e.col * e.baseTileSize * l, m = e.row * e.baseTileSize * l, A = e.col, B, y = A, x = 1536 * Math.pow(2, e.zoom - 3) / (e.baseTileSize || 256), G = x / 2 - 1, C = -x / 2; y > G;) y -= x;
            for (; y < C;) y += x;
            B = y;
            var F = u;
            B > A ? F = u - 40075452 : B < A && (F = u + 40075452);
            for (var L = 0; L < v.length; L++) {
                var P = v[L],
                    N = P[0] / 4,
                    S = H[N],
                    fa = H[N + 1],
                    M = U.b(W, fa, "point", g, t, n, Z),
                    I = U.b(W, fa, "pointText", g, t, n,
                        Z),
                    O = T(S + 1, P[0], P[0] + P[1]);
                if (!(I && 0 !== I.length || M && 0 !== M.length))
                    if (5 === g) {
                        if (!O || !O.length) continue;
                        for (var Q = 0; Q < O.length; Q++) {
                            var J = O[Q],
                                K = J[0] / 4,
                                E = H[K],
                                D = T(E + 1, J[0], J[0] + J[1]),
                                ia;
                            J[1] && D[1][1] && (ia = vb(w, D[1][0], D[1][1], "utf-8"));
                            if ("\u5317\u4eac" === ia) {
                                M = U.b(W, fa, "point", 6, t, !1, Z);
                                I = U.b(W, fa, "pointText", 6, t, !1, Z);
                                break
                            }
                        }
                    } else continue;
                if (O) {
                    var R = null,
                        Ma = 1,
                        ka = 0,
                        la = 0;
                    M && M[0] && (M = M[0], R = M.icon, Ma = (M.zoom || 100) / 100);
                    for (Q = 0; Q < O.length; Q++)
                        if (J = O[Q], K = J[0] / 4, E = H[K], D = T(E + 1, J[0], J[0] + J[1]), J[1]) {
                            var xa =
                                H[K + 1];
                            if (wb(xa, e.useZoom)) {
                                if (e.processedLabelZooms && e.processedLabelZooms.length) {
                                    for (var V = e.processedLabelZooms, ca = !1, da = 0; da < V.length; da++)
                                        if (wb(xa, V[da])) {
                                            ca = !0;
                                            break
                                        }
                                    if (ca) continue
                                }
                                var ua = T(0, D[2][0], D[2][0] + D[2][1]),
                                    aa = [];
                                for (da = 0; da < ua.length; da++) aa[da] = new Uint16Array(w, ua[da][0], ua[da][1]);
                                var ma = void 0;
                                D[1][1] && (ma = vb(w, D[1][0], D[1][1], "utf-8"));
                                var ja = ma || "";
                                if (!(I && 0 < I.length && 0 === aa.length && "" === ja)) {
                                    var Na = H[K + 2],
                                        dc = H[K + 3],
                                        ec = H[K + 4],
                                        fc = Math.round(Na / 100),
                                        gc = Math.round(dc / 100),
                                        Bb = {
                                            lng: u + fc,
                                            lat: m + gc
                                        },
                                        Kc = {
                                            lng: F + fc,
                                            lat: m + gc
                                        },
                                        hc = void 0;
                                    D[0][1] && (hc = vb(w, D[0][0], D[0][1], void 0));
                                    var Cb = H[K + 5],
                                        ic = 0 < aa.length || "" !== ja && 0 < I.length,
                                        Db = xb(R),
                                        kc = !(4 !== Cb || !ic || !Db),
                                        Lc = !!ja.match(/[qypjg]/g),
                                        Mc = hc || "",
                                        Nc = Bb,
                                        Oc = Kc,
                                        Pc = ja,
                                        Qc = Lc,
                                        Rc = ec,
                                        Sc = fa,
                                        Tc = I,
                                        Uc = R,
                                        Vc = kc,
                                        Wc = Cb,
                                        Xc = v.R;
                                    a: {
                                        var va = void 0,
                                            bb = xa,
                                            lc = e.useZoom;yb[bb] || (va = bb.toString(2), 8 > va.length && (va = Array(8 - va.length + 1).join("0") + va), yb[bb] = va);va = yb[bb];
                                        for (var mc = zb[lc].start, Yc = zb[lc].end - mc + 1, cb = 0; cb < Yc; cb++)
                                            if ("1" === va[cb]) {
                                                var nc = cb +
                                                    mc;
                                                break a
                                            }
                                        nc = 99
                                    }
                                    var X = {
                                        type: "fixed",
                                        guid: Mc,
                                        pt: Nc,
                                        ptFix: Oc,
                                        name: Pc,
                                        containDescendings: Qc,
                                        rank: Rc,
                                        iconPos: null,
                                        textPos: null,
                                        styleId: Sc,
                                        styleText: Tc,
                                        icon: Uc,
                                        textOnIcon: Vc,
                                        direction: Wc,
                                        onDefaultFloor: Xc,
                                        startZoom: nc || 99,
                                        tilePosStr: Na + "," + dc,
                                        tracer: xa,
                                        processedInZoom: e.useZoom,
                                        key: "fixed_" + ec + "_" + Bb.lng + "_" + Bb.lat
                                    };
                                    if (null === R || kc) null !== R && (X.iconSize = Db);
                                    else {
                                        var Fb = xb(R);
                                        if (Fb) {
                                            var Gb = Fb[0] / 2 * Ma,
                                                Hb = Fb[1] / 2 * Ma,
                                                db = Math.round(-Gb / 2),
                                                eb = Math.round(-Hb / 2),
                                                Ib = db + Gb,
                                                Jb = eb + Hb;
                                            var oc = {
                                                vertex: [db, eb, Ib, eb,
                                                    Ib, Jb, db, eb, Ib, Jb, db, Jb
                                                ],
                                                texcoord: null,
                                                width: Gb,
                                                height: Hb,
                                                iconType: R
                                            }
                                        } else oc = null;
                                        X.iconPos = oc;
                                        X.iconPos && (ka = X.iconPos.width, la = X.iconPos.height)
                                    }
                                    if (aa.length) {
                                        var Zc = X,
                                            fb = Cb,
                                            Kb = aa,
                                            Lb = ka,
                                            pc = la,
                                            gb = h,
                                            Oa = tb;
                                        "number" !== typeof fb && (fb = 0);
                                        for (var Ca = Kb.length, qc = [], rc = [], Da = 0, Pa = 0, ea = 0; ea < Ca; ea++) Pa += Math.round(Kb[ea][3] / Oa);
                                        for (ea = 0; ea < Ca; ea++) {
                                            var hb = Kb[ea],
                                                sc = hb[0],
                                                tc = hb[1],
                                                Ea = Math.round(hb[2] / Oa),
                                                ya = Math.round(hb[3] / Oa);
                                            0 === Lb && (fb = 4);
                                            switch (fb) {
                                                case 3:
                                                    var na = Pa / 2 - ya + 2 * (Ca - 1) / 2;
                                                    var wa = Math.round(-Lb /
                                                        2 - Ea - 2);
                                                    var za = Math.round(na - Da - 2 * ea);
                                                    break;
                                                case 1:
                                                    na = Pa / 2 - ya + 2 * (Ca - 1) / 2;
                                                    wa = Math.round(Lb / 2 + 2);
                                                    za = Math.round(na - Da - 2 * ea);
                                                    break;
                                                case 2:
                                                    na = pc / 2 + Pa - ya + 2 * Ca;
                                                    wa = Math.round(-Ea / 2);
                                                    za = Math.round(na - Da - 2 * ea);
                                                    break;
                                                case 0:
                                                    na = -pc / 2 - 2 - ya;
                                                    wa = Math.round(-Ea / 2);
                                                    za = Math.round(na - Da - 2 * ea);
                                                    break;
                                                case 4:
                                                    na = -Pa / 2 - 2 * (Ca - 1) / 2, wa = Math.round(-Ea / 2), za = Math.round(na - Da - 2 * ea)
                                            }
                                            Da += ya;
                                            var uc = wa + Math.round(Ea),
                                                vc = za,
                                                wc = uc,
                                                Mb = vc + Math.round(ya),
                                                Nb = sc / 512,
                                                Ob = (gb - tc - ya * Oa) / gb,
                                                xc = (sc + Ea * Oa) / 512,
                                                $c = Ob,
                                                yc = xc,
                                                Pb = (gb - tc) / gb,
                                                ad = Nb,
                                                bd =
                                                Pb;
                                            qc.push(wa, za, uc, vc, wc, Mb, wa, za, wc, Mb, wa, Mb);
                                            rc.push(Nb, Ob, xc, $c, yc, Pb, Nb, Ob, yc, Pb, ad, bd)
                                        }
                                        Zc.textPos = {
                                            vertex: qc,
                                            texcoord: rc
                                        }
                                    }
                                    if (X.textPos || X.iconPos) {
                                        var Qa = 1E3,
                                            Ra = 1E3,
                                            Sa = -1E3,
                                            Ta = -1E3;
                                        if (X.iconPos)
                                            for (var Qb = X.iconPos.vertex, oa = 0, Rb = Qb.length; oa < Rb; oa += 2) {
                                                var pa = Qb[oa],
                                                    qa = Qb[oa + 1];
                                                pa < Qa && (Qa = pa);
                                                pa > Sa && (Sa = pa);
                                                qa < Ra && (Ra = qa);
                                                qa > Ta && (Ta = qa)
                                            }
                                        if (X.textPos) {
                                            var Sb = X.textPos.vertex;
                                            oa = 0;
                                            for (Rb = Sb.length; oa < Rb; oa += 2) pa = Sb[oa], qa = Sb[oa + 1], pa < Qa && (Qa = pa), pa > Sa && (Sa = pa), qa < Ra && (Ra = qa), qa > Ta && (Ta = qa)
                                        }
                                        X.bds = [Qa, Ra, Sa, Ta]
                                    }(Db || ic) && d.push(X)
                                }
                            }
                        }
                }
            }
        }
    }
    return k
}

function xb(b) {
    if (!b || "disekong" === b) return null;
    var a = Ab[b];
    a || 48 <= b.charCodeAt(0) && 57 >= b.charCodeAt(0) && (a = Ab["_" + b]);
    return a
}
var Eb;
Eb = function(b, a, c, q) {
    var f, p;
    a = T(0, a[0], a[0] + a[1]);
    if (!a.length) return {};
    for (var k = {}, r = [], w = [], v = [], e = [], h = 0; h < a.length; h++) {
        var d = T(0, a[h][0], a[h][0] + a[h][1]),
            t = d[0];
        t = T(0, t[0], t[0] + t[1]);
        d = d[1];
        var n = T(H[d[0] >> 2] + 1, d[0], d[0] + d[1]);
        a: {
            var g = b;
            if ((f = T(0, n[2][0], n[2][0] + n[2][1])) && f[0]) {
                for (var l = 0; l < f.length; l++) {
                    var u = f[l],
                        m = u[0] >> 2;
                    m = H[m];
                    u = T(m + 1, u[0], u[0] + u[1]);
                    if (!u[0][1]) {
                        g = [];
                        f = [0, 0];
                        var A = p = void 0;
                        break a
                    }
                }
                p = [];
                var B = [0, 0],
                    y = [2.003772637E7, 1.102819087E7];
                d = [-2.003772637E7, -1.060158079E7];
                A = 0;
                l = c.mercatorSize;
                var x = c.col * l,
                    G = c.row * l;
                for (l = 0; l < f.length; l++) {
                    u = f[l];
                    m = u[0] >> 2;
                    m = H[m];
                    u = T(m + 1, u[0], u[0] + u[1]);
                    u = new Int32Array(g, u[0][0], u[0][1] >> 2);
                    m = [x + u[0] / 100, G + u[1] / 100];
                    B[0] += m[0];
                    B[1] += m[1];
                    m[0] < y[0] && (y[0] = m[0]);
                    m[1] < y[1] && (y[1] = m[1]);
                    m[0] > d[0] && (d[0] = m[0]);
                    m[1] > d[1] && (d[1] = m[1]);
                    for (var C = 2; C < u.length; C += 2) m[C] = m[C - 2] + u[C] / 100, m[C + 1] = m[C - 1] + u[C + 1] / 100, B[0] += m[C], B[1] += m[C + 1], m[C] < y[0] && (y[0] = m[C]), m[C + 1] < y[1] && (y[1] = m[C + 1]), m[C] > d[0] && (d[0] = m[C]), m[C + 1] > d[1] && (d[1] = m[C + 1]);
                    A += u.length;
                    p.push(m)
                }
                B[0] /= A / 2;
                B[1] /= A / 2;
                g = p;
                f = B;
                p = y;
                A = d
            } else g = [],
            f = [0, 0],
            A = p = void 0
        }
        y = T(0, n[3][0], n[3][0] + n[3][1]);
        d = [];
        for (B = 0; B < y.length; B++) d[B] = String.fromCharCode.apply(String, new Uint8Array(b, y[B][0], y[B][1]));
        x = String.fromCharCode.apply(String, new Uint8Array(b, n[1][0], n[1][1]));
        y = void 0;
        n = String.fromCharCode.apply(String, new Uint8Array(b, n[0][0], n[0][1]));
        for (B = 0; B < d.length; B++)
            if (d[B] === x) {
                y = B;
                break
            }
        g = {
            defaultFloor: y,
            currentFloor: y,
            uid: n,
            floors: [],
            contour: g,
            boundsMin: p,
            boundsMax: A,
            center: f,
            floorLength: d.length
        };
        for (B = 0; B < d.length; B++) {
            p = d[B];
            a: {
                f = b;A = t;x = p;
                for (l = 0; l < A.length; l++)
                    if (G = T(H[A[l][0] >> 2] + 1, A[l][0], A[l][0] + A[l][1]), String.fromCharCode.apply(String, new Uint8Array(f, G[0][0], G[0][1])) === x) {
                        x = G[1];
                        break a
                    }
                x = null
            }
            f = b;
            G = n;
            u = p;
            p = c;
            var F = q;
            A = B === y ? !0 : !1;
            if (x)
                if (x = T(0, x[0], x[0] + x[1]), x.length) {
                    l = {
                        base: [],
                        contour: []
                    };
                    for (var L = 0; L < x.length; L++) {
                        m = x[L];
                        C = m[0] >> 2;
                        var P = H[C + 1];
                        7 === P && (F = Tb(f, m, p, l.contour, F, 1, {
                            u: !0,
                            M: !0
                        }))
                    }
                    for (L = 0; L < l.contour.length; L++) l.contour[L].uid = G;
                    for (L = 0; L < x.length; L++) m = x[L], C = m[0] >>
                        2, P = H[C + 1], 7 === P && (F = Tb(f, m, p, l.base, F, 2, {
                            u: !0
                        }));
                    for (L = 0; L < l.base.length; L++) l.base[L].uid = G;
                    (m = Ub(f, x, p, !0, !0)) && 0 !== m.vertex.length && (l.area3D = m, l.area3D.uid = G, l.area3D.border && (l.indoorBorder3D = l.area3D.border, l.indoorBorder3D.uid = G, delete l.area3D.border));
                    l.floorName = u;
                    G = [];
                    for (u = 0; u < x.length; u++) m = x[u], C = m[0] >> 2, P = H[C + 1], P === rb && (m = T(H[C] + 1, m[0], m[0] + m[1]), m.R = A, G.push(m));
                    l.pois = sb(f, G, A ? H[2] : H[3], p, Vb, !0);
                    f = l
                } else f = {
                    floorName: u
                };
            else f = {
                floorName: u
            };
            g.floors[B] = f
        }
        k[n] = g;
        if (g.floors[y]) {
            if (g.floors[y].base)
                for (B =
                    0; B < g.floors[y].base.length; B++) r.push(g.floors[y].base[B]);
            if (g.floors[y].contour)
                for (B = 0; B < g.floors[y].contour.length; B++) w.push(g.floors[y].contour[B]);
            g.floors[y].indoorBorder3D && v.push(g.floors[y].indoorBorder3D);
            g.floors[y].area3D && e.push(g.floors[y].area3D)
        }
        k.tileInfo = c
    }
    0 === r.length && (r = null);
    0 === w.length && (w = null);
    0 === v.length && (v = null);
    0 === e.length && (e = null);
    return {
        indoorDataResult: k,
        indoorBase: r,
        indoorBaseContour: w,
        indoorArea3D: e,
        indoorBorder3D: v
    }
};
var U = function() {
    function b(b, c, q, f, v) {
        if (f = f || Y) {
            v = f[2];
            switch (c) {
                case "point":
                    v = v[0];
                    break;
                case "pointText":
                    v = v[1];
                    break;
                case "line":
                    v = v[3];
                    break;
                case "polygon":
                    v = v[4];
                    break;
                case "polygon3d":
                    v = v[5]
            }
            var e = q - 1;
            "line" === c && 12 === q && (e = q);
            e = f[1][e][0];
            e = e[b];
            !e && 21 > q && ("point" === c || "pointText" === c) && (e = f[1][q][0], e = e[b]);
            q = {
                j: e,
                style: v,
                o: []
            }
        } else if (v) {
            f = v.baseFs;
            b: {
                var p = v.zoomRegion;
                if ("[object Object]" === Object.prototype.toString.call(p)) {
                    for (e in p) {
                        e = !1;
                        break b
                    }
                    e = !0
                } else e = !1
            }
            v = e ? v.StyleBody || [] :
                v.zoomStyleBody[q] || [];
            e = f[2];
            switch (c) {
                case "point":
                    e = e[0];
                    v = v[0] || {};
                    break;
                case "pointText":
                    e = e[1];
                    v = v[1] || {};
                    break;
                case "line":
                    e = e[3];
                    v = v[3] || {};
                    break;
                case "polygon":
                    e = e[4];
                    v = v[4] || {};
                    break;
                case "polygon3d":
                    e = e[5], v = v[5] || {}
            }
            q = {
                j: f[1][q - 1][0][b],
                style: e,
                o: v
            }
        } else q = {
            j: null,
            style: [],
            o: []
        };
        v = q;
        q = v.j;
        f = v.style;
        v = v.o;
        e = [];
        if (!q) return e;
        for (p = 0; p < q.length; p++) {
            var d = v[q[p]] || f[q[p]];
            if (d) {
                switch (c) {
                    case "polygon":
                        d = {
                            v: b,
                            c: a(d[0]),
                            f: a(d[1]),
                            borderWidth: d[2],
                            B: d[3],
                            C: d[4],
                            ma: d[5],
                            X: d[6],
                            ja: d[7],
                            ka: a(d[8])
                        };
                        break;
                    case "line":
                        d = {
                            v: b,
                            f: a(d[0]),
                            c: a(d[1]),
                            borderWidth: d[2],
                            m: d[3],
                            V: d[4],
                            G: d[5],
                            $: d[6],
                            aa: d[7],
                            ba: d[8],
                            da: d[9],
                            ea: d[10],
                            B: d[11],
                            h: d[12],
                            C: d[13],
                            W: d[14],
                            ca: d[15],
                            Y: d[16],
                            fa: d[17],
                            ia: d[18]
                        };
                        break;
                    case "pointText":
                        d = d && 0 !== d.length ? {
                            sid: b,
                            fontRgba: a(d[0]),
                            haloRgba: a(d[1]),
                            backRgba: a(d[2]),
                            fontSize: d[3],
                            haloSize: d[4],
                            fontWeight: d[5],
                            fontStyle: d[6],
                            density: d[7]
                        } : null;
                        break;
                    case "point":
                        d = {
                            sid: b,
                            rank: d[0],
                            la: d[1],
                            icon: d[2],
                            iconType: d[3],
                            ga: d[4],
                            density: d[5],
                            zoom: d[6]
                        };
                        break;
                    case "polygon3d":
                        d = {
                            v: b,
                            filter: d[0],
                            ratio: d[1],
                            Z: d[2],
                            borderWidth: d[3],
                            f: a(d[4]),
                            H: a(d[5]),
                            l: a(d[6]),
                            ha: d[7]
                        }
                }
                d && (e[e.length] = d)
            }
        }
        return e
    }

    function a(a) {
        var b = a;
        if (f[b]) return f[b];
        a >>>= 0;
        f[b] = [a & 255, a >> 8 & 255, a >> 16 & 255, a >> 24 & 255];
        return f[b]
    }
    var c = {},
        q = {},
        f = {};
    return {
        b: function(a, f, r, w, v, e, h) {
            a = (a || "default") + "-" + f + "-" + r + "-" + w;
            e && (a += "-indoor");
            if (v) return q[a] || (q[a] = b(f, r, w, v)), q[a];
            c[a] || (c[a] = b(f, r, w, v, h));
            return c[a]
        }
    }
}();

function Wb(b, a) {
    if (b.fill) b.fill(a);
    else
        for (var c = 0; c < b.length; c++) b[c] = a
}
Uint8Array.prototype.slice || (Object.defineProperty(Uint8Array.prototype, "slice", {
        value: Array.prototype.slice
    }), Object.defineProperty(Uint16Array.prototype, "slice", {
        value: Array.prototype.slice
    }), Object.defineProperty(Uint32Array.prototype, "slice", {
        value: Array.prototype.slice
    }), Object.defineProperty(Int8Array.prototype, "slice", {
        value: Array.prototype.slice
    }), Object.defineProperty(Int16Array.prototype, "slice", {
        value: Array.prototype.slice
    }), Object.defineProperty(Int32Array.prototype, "slice", {
        value: Array.prototype.slice
    }),
    Object.defineProperty(Float32Array.prototype, "slice", {
        value: Array.prototype.slice
    }));
var ub, H, Xb;

function vb(b, a, c, q) {
    b = new Uint8Array(b, a, c);
    if (self.TextDecoder) return Xb || (Xb = new TextDecoder("utf-8")), Xb.decode(b).replace(/\\\\/g, "\\");
    if ("utf-8" === q)
        for (q = "", a = 0; a < b.length; a++) c = b[a], 128 > c ? q += String.fromCharCode(c) : 191 < c && 224 > c ? (q += String.fromCharCode((c & 31) << 6 | b[a + 1] & 63), a += 1) : 223 < c && 240 > c ? (q += String.fromCharCode((c & 15) << 12 | (b[a + 1] & 63) << 6 | b[a + 2] & 63), a += 2) : (c = ((c & 7) << 18 | (b[a + 1] & 63) << 12 | (b[a + 2] & 63) << 6 | b[a + 3] & 63) - 65536, q += String.fromCharCode(c >> 10 | 55296, c & 1023 | 56320), a += 3);
    else {
        if (4096 >= c) return String.fromCharCode.apply(String,
            b);
        q = "";
        var f = Math.ceil(c / 4096);
        for (a = 0; a < f; a++) q += String.fromCharCode.apply(String, b.slice(4096 * a, a === f - 1 ? c : 4096 * (a + 1)))
    }
    return q.replace(/\\\\/g, "\\")
}

function T(b, a, c) {
    var q = a >> 2,
        f = H[q + b];
    a = 4 * (f + b + 1) + a;
    var p = [];
    if (a > c) return p;
    for (c = 0; c < f; c++) {
        var k = H[q + b + 1 + c],
            r = a + k;
        p[c] = [a, k];
        0 !== r % 4 ? a = r + 4 - r % 4 : a = r
    }
    return p
}
var rb = 3,
    Yb = 1E-5,
    Zb = 1,
    Y = null,
    Vb = null,
    Ab = null,
    W = "",
    Z = null,
    $b = null,
    sa = new ba,
    ac = 20,
    bc = 65536,
    cc = [240, 243, 250, 255],
    jc = 1,
    zc = null,
    Ac = null,
    zb = {
        3: {
            start: 3,
            end: 3,
            a: 3
        },
        4: {
            start: 4,
            end: 5,
            a: 5
        },
        5: {
            start: 4,
            end: 5,
            a: 5
        },
        6: {
            start: 6,
            end: 7,
            a: 7
        },
        7: {
            start: 6,
            end: 7,
            a: 7
        },
        8: {
            start: 8,
            end: 9,
            a: 9
        },
        9: {
            start: 8,
            end: 9,
            a: 9
        },
        10: {
            start: 10,
            end: 10,
            a: 10
        },
        11: {
            start: 11,
            end: 13,
            a: 12
        },
        12: {
            start: 11,
            end: 13,
            a: 12
        },
        13: {
            start: 11,
            end: 13,
            a: 12
        },
        14: {
            start: 14,
            end: 15,
            a: 15
        },
        15: {
            start: 14,
            end: 15,
            a: 15
        },
        16: {
            start: 16,
            end: 17,
            a: 17
        },
        17: {
            start: 16,
            end: 17,
            a: 17
        },
        18: {
            start: 18,
            end: 21,
            a: 19
        },
        19: {
            start: 18,
            end: 21,
            a: 19
        },
        20: {
            start: 18,
            end: 21,
            a: 19
        },
        21: {
            start: 18,
            end: 21,
            a: 19
        }
    },
    tb, Bc, Cc = !1,
    Dc = [],
    Ec = !1;

function pb() {
    for (var b = atob("AGFzbQEAAAABNAdgAX8Bf2AAAX9gAX8AYAJ/fwBgAABgDX9/f39/fH9/f39/f38AYAt/f3x/f39/f39/fwACngEKA2Vudg5EWU5BTUlDVE9QX1BUUgN/AANlbnYNdGVtcERvdWJsZVB0cgN/AANlbnYFQUJPUlQDfwADZW52CFNUQUNLVE9QA38AA2VudglTVEFDS19NQVgDfwADZW52AmdiA38AA2VudgJmYgN/AAZnbG9iYWwDTmFOA3wABmdsb2JhbAhJbmZpbml0eQN8AANlbnYGbWVtb3J5AgFGRgMeHQABAgMDAQEBAQEBAQEBBAEBBAEBAQEBAQMFAwYEBnMUfwEjAAt/ASMBC38BIwILfwEjAwt/ASMEC38BIwULfwEjBgt/AUEAC38BQQALfwFBAAt/AUEAC3wBIwcLfAEjCAt/AUEAC38BQQALfwFBAAt/AUEAC3wBRAAAAAAAAAAAC38BQQALfAFEAAAAAAAAAAALB/AEHAtfcmVzZXRfbGluZQAOFl9nZXRfYmxvY2tfaW5kZXhfc3RhcnQAEghzZXRUaHJldwAEGl9nZXRfbGluZV90dXJuaW5nc19hZGRyZXNzAAgjX2dldF9ibG9ja190cmlhbmdsZV9pbmRpY2VzX2FkZHJlc3MAEBZfZ2V0X2xpbmVfdmVydGV4X2NvdW50AA0Kc3RhY2tBbGxvYwAAF19nZXRfYmxvY2tfdmVydGV4X2NvdW50ABYXX2dldF9ibG9ja192ZXJ0ZXhfc3RhcnQAFBRfZ2V0X2xpbmVfdmVydGV4X2VuZAAMG19nZXRfZmVhdHVyZV9wb2ludHNfYWRkcmVzcwAXDHN0YWNrUmVzdG9yZQACFF9nZXRfYmxvY2tfaW5kZXhfZW5kABMbX2dldF9saW5lX2FsdGl0dWRlc19hZGRyZXNzAAYVX2dldF9ibG9ja192ZXJ0ZXhfZW5kABUJc3RhY2tTYXZlAAELcnVuUG9zdFNldHMAHBZfZ2V0X2xpbmVfdmVydGV4X3N0YXJ0AAsNX3BhcnNlX3BvaW50cwAYGF9nZXRfbGluZV9wb2ludHNfYWRkcmVzcwAHE2VzdGFibGlzaFN0YWNrU3BhY2UAAxNfZ2V0X2xpbmVfaW5kZXhfZW5kAAoRX2FwcGVuZF9saW5lX2RhdGEAGRVfZ2V0X2xpbmVfaW5k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"), a =
            b.length, c = new Uint8Array(a), q = 0; q < a; q++) c[q] = b.charCodeAt(q);
    return c.buffer
}

function Fc() {
    Ec || (Ec = !0, ob(function() {
        Cc = !0;
        if (Dc.length)
            for (var b = 0; b < Dc.length; b++) {
                var a = Dc[b];
                Gc(a.data, a.s, a.T)
            }
        Dc = []
    }))
}
self.onmessage = function(b) {
    b = b.data;
    var a = b.action;
    if (self[a]) self[a](b)
};
var yb = {
    0: "00000000",
    16: "00010000",
    32: "00100000",
    48: "00110000",
    64: "01000000",
    96: "01100000"
};

function wb(b, a) {
    if (!yb[b]) {
        var c = b.toString(2);
        8 > c.length && (c = Array(8 - c.length + 1).join("0") + c);
        yb[b] = c
    }
    c = yb[b];
    return "1" === c[a - zb[a].start]
}

function Gc(b, a, c) {
    ra("finishLoadTile");
    try {
        ra("begin(ParseData)"), Hc(b, a, c, function(a) {
            ra("finishParseData");
            a.base = a.a;
            a.base3d = a.A;
            a.virtual = a.U;
            a.building3d = a.D;
            a.building3dMesh = a.F;
            a.indoorData = a.N;
            a.indoorBase = a.J;
            a.indoorBaseContour = a.K;
            a.indoorBorder3D = a.L;
            a.indoorArea3D = a.I;
            a.label = a.label;
            a.tileInfo = a.s;
            for (var b = [], c = 0; c < a.base.length; c++) {
                var k = a.base[c];
                b.push(k.data[0].buffer);
                b.push(k.data[1].buffer)
            }
            if (a.base3d)
                for (c = 0; c < a.base3d.length; c++) k = a.base3d[c], "block" === k.type ? (b.push(k.data.vertex.buffer),
                    b.push(k.data.index.buffer)) : (b.push(k.data[0].buffer), b.push(k.data[1].buffer));
            if (a.virtual)
                for (c = 0; c < a.virtual.length; c++) k = a.virtual[c], b.push(k.data[0].buffer), b.push(k.data[1].buffer);
            a.building3d && (b.push(a.building3d.vertex.buffer), b.push(a.building3d.index.buffer));
            if (a.indoorBase)
                for (c = 0; c < a.indoorBase.length; c++) k = a.indoorBase[c], b.push(k.data[0].buffer), b.push(k.data[1].buffer);
            if (a.indoorBaseContour)
                for (c = 0; c < a.indoorBaseContour.length; c++) k = a.indoorBaseContour[c], b.push(k.data[0].buffer),
                    b.push(k.data[1].buffer);
            if (a.indoorBorder3D && a.indoorBorder3D && 0 < a.indoorBorder3D.length)
                for (c = 0; c < a.indoorBorder3D.length; c++) b.push(a.indoorBorder3D[c].data[0].buffer), b.push(a.indoorBorder3D[c].data[1].buffer);
            if (a.indoorArea3D && 0 < a.indoorArea3D.length)
                for (c = 0; c < a.indoorArea3D.length; c++) b.push(a.indoorArea3D[c].vertex.buffer), b.push(a.indoorArea3D[c].index.buffer);
            a.label && (a.label.textImageBitmap && b.push(a.label.textImageBitmap), a.label.indoorTextImageBitmap && b.push(a.label.indoorTextImageBitmap));
            a.perfStat = [ta("beginLoadTile", "finishLoadTile"), ta("finishLoadTile", "beginParseData"), ta("beginParseData", "finishParseData"), Bc];
            a.endTime = Date.now();
            postMessage(a, b)
        })
    } catch (q) {
        postMessage({
            tileInfo: a,
            tileKey: c,
            error: "parse_error",
            message: q.message
        })
    }
}
self.loadTileData = function(b) {
    var a = b.url,
        c = {};
    c.baseTileSize = b.tileInfo.baseTileSize;
    c.col = b.tileInfo.col;
    c.loopOffsetX = b.tileInfo.loopOffsetX;
    c.mercatorSize = b.tileInfo.mercatorSize;
    c.row = b.tileInfo.row;
    c.tileSize = b.tileInfo.tileSize;
    c.tileTypeName = b.tileInfo.tileTypeName;
    c.useZoom = b.tileInfo.useZoom;
    c.zoom = b.tileInfo.zoom;
    c.processedLabelZooms = b.tileInfo.processedLabelZooms;
    var q = b.tileKey;
    b.featureStyle && (Y = JSON.parse(b.featureStyle), Z = null);
    b.indoorStyle && (Vb = JSON.parse(b.indoorStyle));
    b.iconSetInfo &&
        (Ab = JSON.parse(b.iconSetInfo));
    b.iconInfo && (tb = b.iconInfo.textSizeRatio);
    b.mapStyleId && (W = b.mapStyleId);
    b.customMapStyle && (Z = JSON.parse(b.customMapStyle), Y = null);
    b.additionalStyleInfo && ($b = b.additionalStyleInfo, b.additionalStyleInfo.defaultBackgroundColor && (cc = b.additionalStyleInfo.defaultBackgroundColor));
    c.style = W;
    zc = Ac = null;
    Bc = 0;
    var f = new XMLHttpRequest;
    f.open("GET", a, !0);
    f.responseType = "arraybuffer";
    f.timeout = 1E4;
    f.ontimeout = function() {
        postMessage({
            tileInfo: c,
            tileKey: q,
            error: "net_timeout",
            message: "net status: timeout"
        })
    };
    f.onreadystatechange = function() {
        4 === this.readyState && (200 === this.status && (Bc = Math.round(f.response.byteLength / 1024), Cc ? Gc(f.response, c, q) : Dc[Dc.length] = {
            data: f.response,
            s: c,
            T: q
        }), 400 <= this.status && postMessage({
            tileInfo: c,
            tileKey: q,
            error: "net_error",
            message: "net status: " + this.status
        }))
    };
    f.send();
    Fc();
    ra("beginLoadTile")
};

function Hc(b, a, c, q) {
    var f = [],
        p = [],
        k = [],
        r = 0,
        w = a.useZoom,
        v = null,
        e = null;
    H = new Uint32Array(b);
    ub = new Int32Array(b);
    jc = H[0];
    var h = T(H[1] + 2, 0, b.byteLength),
        d = T(0, h[0][0], h[0][0] + h[0][1]),
        t = !1;
    v = a.style || "default";
    for (var n = 0; n < d.length; n++) {
        var g = d[n],
            l = g[0] >> 2,
            u = H[l + 1];
        if (7 === u) {
            t = !0;
            break
        }
    }!1 === t && (r = Tb(null, null, a, f, r, 0));
    for (n = 0; n < d.length; n++)
        if (g = d[n], l = g[0] >> 2, u = H[l + 1], t = H[l + 2], 7 === u) r = Tb(b, g, a, f, r, 0);
        else if (4 === u) 13E3 === t || 83500 === t ? Ic(b, g, w, k, 0, !1, v) : r = Ic(b, g, w, f, r, !1, v);
    else if (15 === u) {
        var m =
            r;
        r = Tb(b, g, a, p, r, 1, {
            O: !0
        })
    } else 16 === u ? r = Ic(b, g, w, p, r, !0, v) : 18 === u ? r = Jc(b, g, w, p, r) : 19 === u ? r = cd(b, g, w, f, r) : 20 === u && (r = dd(b, g, w, p, r));
    (n = ed(d, a)) && p.push({
        type: "block",
        data: n,
        has3D: !0,
        has2D: !1
    });
    v = Ub(b, d, a);
    n = fd(b, d, a);
    0 < n && (e = {
        vertex: new Float32Array(7 * n),
        index: new Uint16Array(n / 3)
    }, fd(b, d, a, e.vertex, e.index));
    n = {
        S: vb(b, h[3][0], h[3][1], void 0) || "",
        height: H[2] || 0
    };
    var A = qb(b, d, h[2], n, a) || {};
    A.textImgStr = n.S || null;
    h[4][1] && H[3] ? (A.indoorTextImgStr = vb(b, h[4][0], h[4][1], void 0) || null, A.indoorTextureHeight =
        H[3]) : A.indoorTextImgStr = null;
    b = Eb(b, h[1], a, m ? m : r);
    A.indoorLabel = [];
    if (b.indoorDataResult)
        for (var B in b.indoorDataResult)
            if ("tileInfo" !== B)
                for (r = b.indoorDataResult[B], h = r.defaultFloor, b.indoorDataResult[B].tileKey = c, n = 0; n < r.floors.length; n++) h === n && r.floors[n].pois && (A.indoorLabel = A.indoorLabel.concat(r.floors[n].pois));
    H = ub = null;
    f.length && (f = gd(f));
    var y = {
        a: f,
        A: p.length ? p : null,
        U: k.length ? k : null,
        D: v,
        F: e,
        N: b.indoorDataResult,
        J: b.indoorBase,
        K: b.indoorBaseContour,
        L: b.indoorBorder3D,
        I: b.indoorArea3D,
        label: A,
        s: a
    };
    if ((A.textImgStr || A.indoorTextImgStr) && self.fetch && self.createImageBitmap && self.Promise) {
        var x = function() {
                q(y)
            },
            G = 0;
        A.textImgStr && (G++, fetch(A.textImgStr).then(function(a) {
            a.blob().then(function(a) {
                createImageBitmap(a, {
                    imageOrientation: "flipY"
                }).then(function(a) {
                    A.textImageBitmap = a;
                    A.textImgStr = null;
                    G--;
                    0 === G && q(y)
                }, x)
            }, x)
        }, x));
        A.indoorTextImgStr && (G++, fetch(A.indoorTextImgStr).then(function(a) {
            a.blob().then(function(a) {
                createImageBitmap(a, {
                    imageOrientation: "flipY"
                }).then(function(a) {
                    A.indoorTextImageBitmap =
                        a;
                    A.indoorTextImgStr = null;
                    G--;
                    0 === G && q(y)
                }, x)
            }, x)
        }, x))
    } else q(y)
}

function gd(b) {
    for (var a = void 0, c = 0, q = 0, f = !1, p = 0; p < b.length; p++) "fill" !== b[p].type ? a = void 0 : b[p].type === a ? (b[c] = hd(b[c], b[p], q), b[p].P = !0, q += b[p].g, f = !0) : (c = p, a = b[p].type, q = b[p].g);
    return f ? b.filter(function(a) {
        return !a.P
    }) : b
}

function hd(b, a, c) {
    var q = b.data[1],
        f = a.data[1];
    b.data[0] = id(b.data[0], a.data[0]);
    b.data[1] = id(q, f, c);
    b.has3D = b.has3D || a.has3D;
    b.has2D = b.has2D || a.has2D;
    return b
}

function id(b, a, c) {
    if (b.constructor === ArrayBuffer) {
        var q = new Uint8Array(b.byteLength + a.byteLength);
        q.set(new Uint8Array(b), 0);
        q.set(new Uint8Array(a), b.byteLength);
        return q.buffer
    }
    q = new b.constructor(b.length + a.length);
    q.set(b, 0);
    if (c)
        for (var f = 0; f < a.length; f++) a[f] += c;
    q.set(a, b.length);
    return q
}

function Tb(b, a, c, q, f, p, k) {
    var r = [];
    b && (r = a ? a[0] >> 2 : 0, r = H[r], r = T(r + 1, a[0], a[0] + a[1]));
    a = 0;
    var w = c.baseTileSize,
        v = c.useZoom,
        e = [],
        h = [];
    k = k || {};
    var d = k.u || !1,
        t = k.O || !1;
    k = k.M || !1;
    if (!t && 0 === f) {
        h = cc;
        if (Z && Z.zoomFrontStyle && Z.zoomFrontStyle[c.zoom] && Z.zoomFrontStyle[c.zoom].bmapLandColor) {
            h = Z.zoomFrontStyle[c.zoom].bmapLandColor.replace("#", "");
            3 === h.length ? h += "f" : 6 === h.length && (h += "ff");
            e = [];
            c = h.length;
            for (var n = 8 === c ? 2 : 1, g = 0; g < c; g += n) 2 === n ? e.push(parseInt(h.slice(g, g + 2), 16)) : e.push(parseInt(h.slice(g,
                g + 1) + h.slice(g, g + 1), 16));
            h = e
        }
        e = [0, 0, 0, h[0], h[1], h[2], h[3], 0, w, 0, 0, h[0], h[1], h[2], h[3], 0, w, w, 0, h[0], h[1], h[2], h[3], 0, 0, w, 0, h[0], h[1], h[2], h[3], 0];
        h = [0, 1, 2, 0, 2, 3]
    }
    1 === p ? (f++, a = f, f += 5) : 2 === p && (a = f + 3 * r.length + 1);
    c = [];
    n = [];
    for (var l = g = !1, u = 0; u < r.length; u++) {
        var m = r[u],
            A = m[0] >> 2,
            B = H[A];
        if ((A = U.b(W, H[A + 1], "polygon", v, d ? Vb : Y, d, Z)) && A.length) {
            A = A[0];
            var y = A.c[0],
                x = A.c[1],
                G = A.c[2],
                C = A.c[3],
                F = A.f[0],
                L = A.f[1],
                P = A.f[2],
                N = A.f[3],
                S = A.borderWidth / 4,
                fa = 2.5 * S;
            m = T(B + 1, m[0], m[0] + m[1]);
            f += 3;
            for (B = 0; B < m.length; B++) {
                var M =
                    m[B],
                    I = M[0] >> 2,
                    O = H[I];
                if (wb(H[I + 1], v)) {
                    var Q = T(O + 1, M[0], M[0] + M[1]);
                    M = new Int32Array(b, Q[0][0], Q[0][1] >> 2);
                    if (M.length && !(4E3 < M.length)) {
                        var J = new Uint16Array(b, Q[2][0], Q[2][1] >> 1);
                        !0 !== k && J && e.length / 8 + M.length / 2 > bc && (e = jd(e), q.push({
                            type: "fill",
                            data: [e, new Uint16Array(h)],
                            g: e.byteLength / ac,
                            has3D: g,
                            has2D: l
                        }), e = [], h = [], l = g = !1);
                        O = null;
                        var K = !1;
                        if (t) {
                            var E = 1 < jc ? new Int16Array(b, Q[1][0], Q[1][1] >> 1) : new Uint16Array(b, Q[1][0], Q[1][1] >> 1);
                            if (1 === E.length && E[0]) O = Array(M.length >> 1), 0 > E[0] && (K = !0), Wb(O, E[0]),
                                g = !0;
                            else if (1 < E.length) {
                                O = [];
                                for (var D = 0; D < E.length; D++) 0 > E[D] && (K = !0), O[D] = E[D] || Zb;
                                g = !0
                            } else l = !0
                        }
                        D = e.length / 8;
                        E = ib(M);
                        I = H[I + 2];
                        k && 1 === I && (S = fa);
                        if (!0 !== k && J) {
                            I = h;
                            for (var ia = 0; ia < J.length; ia++) I[I.length] = J[ia] + D;
                            D = 0;
                            for (J = E.length / 2; D < J; D++) I = O ? O[D] : 0, e.push(E[2 * D], E[2 * D + 1], I, y, x, G, C, f)
                        }
                        if (O && !K)
                            for (c.length / 8 + E.length / 2 * 2 > bc && (c = jd(c), n = new Uint16Array(n), q.push({
                                    type: "fill",
                                    data: [c, n],
                                    g: c.byteLength / ac,
                                    has3D: g,
                                    has2D: l
                                }), n = [], c = []), K = c.length / 8, D = 0; D < E.length; D += 2) {
                                I = O[D / 2];
                                J = I - 280;
                                0 > J && (J = 0);
                                c.push(E[D], E[D + 1], I, F, L, P, N, f, E[D], E[D + 1], J, F, L, P, N, f);
                                I = E[D];
                                J = E[D + 1];
                                ia = D === E.length - 2 ? E[1] : E[D + 3];
                                var R = !1;
                                if (I === (D === E.length - 2 ? E[0] : E[D + 2])) {
                                    if (Math.abs(I) < Yb || Math.abs(I - w) < Yb) R = !0
                                } else J === ia && (Math.abs(J) < Yb || Math.abs(J - w) < Yb) && (R = !0);
                                R || (D === E.length - 2 ? n.push(K + D, K + D + 1, K, K, K + D + 1, K + 1) : n.push(K + D, K + D + 1, K + D + 2, K + D + 2, K + D + 1, K + D + 3))
                            }
                        if (p && A.borderWidth && E.length) {
                            if (E[0] - E[E.length - 2] > Yb || E[1] - E[E.length - 1] > Yb) E[E.length] = E[0], E[E.length] = E[1], O && (O[O.length] = O[0]);
                            if (Q[3])
                                for (Q = T(0, Q[3][0], Q[3][0] +
                                        Q[3][1]), E = 0; E < Q.length; E++) K = Q[E], I = T(0, K[0], K[0] + K[1]), K = new Int16Array(b, I[0][0], I[0][1] >> 1), lb() + K.length / 2 > bc && (q.push({
                                    type: "line",
                                    data: [jb(), kb()],
                                    has3D: g,
                                    has2D: l
                                }), nb()), D = new Uint16Array(b, I[1][0], I[1][1] >> 1), I = new Int8Array(b, I[2][0], I[2][1]), mb(K, [F, L, P, N], S, O, a, !1, M, I, 0, D[0], D[1])
                        }
                    }
                }
            }
        }
    }
    c.length && (c = jd(c), n = new Uint16Array(n), q.push({
        type: "fill",
        data: [c, n],
        g: c.byteLength / ac,
        has3D: g,
        has2D: l
    }));
    e.length && (e = jd(e), q.push({
        type: "fill",
        data: [e, new Uint16Array(h)],
        g: e.byteLength / ac,
        has3D: g,
        has2D: l
    }));
    p && (q.push({
        type: "line",
        data: [jb(), kb()],
        has3D: g,
        has2D: l
    }), nb());
    return Math.max(f, a)
}

function Ic(b, a, c, q, f, p, k) {
    a = T(H[a[0] >> 2] + 1, a[0], a[0] + a[1]);
    for (var r = !1, w = !1, v = 0; 2 > v; v++) {
        0 === v && f++;
        for (var e = 0; e < a.length; e++) {
            var h = a[e],
                d = h[0] >> 2,
                t = H[d];
            if ((d = U.b(W, H[d + 1], "line", c, Y, !1, Z)) && d.length && (0 !== v || d[0].borderWidth) && (h = T(t + 1, h[0], h[0] + h[1]), 0 !== v || !d[0].h))
                if (1 === v && d[0].h) {
                    var n = d[0].h;
                    t = n;
                    var g = Ab[t];
                    if (g) {
                        g = [g[0], g[1]];
                        lb() && (q[q.length] = {
                            type: "line",
                            data: [jb(), kb()],
                            has3D: r,
                            has2D: w
                        }, nb(), w = r = !1);
                        /guojietianqiaojieti/.test(n) ? f += 20 : f++;
                        var l = d[0].m / 4;
                        $b && $b.icons && $b.icons[t] &&
                            "number" === typeof $b.icons[t].fillWidth && (l = $b.icons[t].fillWidth / 4);
                        "grayed-out" === k && ("MapRes/weidingguojie_guowai" === t && (l = 1), "MapRes/shengjie" === t && (l = .75));
                        var u = p ? !0 : !1,
                            m = !1;
                        /\b(32|16|8|4)$/.test(t) && (l *= 5, g[1] *= 2, m = u = !0, n = n.replace(/\b4$/, "8"));
                        var A = !1,
                            B = !1;
                        for (t = 0; t < h.length; t++) {
                            var y = h[t],
                                x = y[0] >> 2,
                                G = H[x];
                            x = H[x + 1];
                            if (wb(x, c) && (x = T(G + 1, y[0], y[0] + y[1]), y = null, G = new Int32Array(b, x[0][0], x[0][1] >> 2), G.length && !(8E3 < G.length))) {
                                if (m && 4 === G.length) {
                                    var C = G,
                                        F = C[2],
                                        L = C[3],
                                        P = Math.sqrt(F * F + L * L);
                                    P = 800 * ~~(P / 800) / P;
                                    C[2] = ~~(F * P);
                                    C[3] = ~~(L * P)
                                }
                                if (p) {
                                    var N = 1 < jc ? new Int16Array(b, x[1][0], x[1][1] >> 1) : new Uint16Array(b, x[1][0], x[1][1] >> 1);
                                    if (1 === N.length && N[0]) y = Array(G.length >> 1), Wb(y, N[0]), A = !0;
                                    else if (1 < N.length) {
                                        y = [];
                                        for (A = 0; A < N.length; A++) y[A] = N[A] || Zb;
                                        A = !0
                                    } else B = !0
                                }
                                C = new Int16Array(b, x[2][0], x[2][1] >> 1);
                                F = new Int8Array(b, x[3][0], x[3][1]);
                                mb(C, d[0].c, l, y, f, !0, G, F, 1)
                            }
                        }
                        lb() && (q[q.length] = {
                                type: "line",
                                textureSize: g,
                                texture: n + ".png",
                                lineWidth: d[0].m / 2,
                                data: [jb(), kb()],
                                has3D: A,
                                has2D: B,
                                zoomWithMap: u
                            },
                            nb())
                    }
                } else if (0 === v ? (n = d[0].f, g = d[0].borderWidth) : (n = d[0].c, g = d[0].m), g /= 4, !(0 === g || 0 === n[3] || 100 < g))
                for (1 === v && f++, t = 0; t < h.length; t++)
                    if (y = h[t], x = y[0] >> 2, G = H[x], x = H[x + 1], wb(x, c) && (x = T(G + 1, y[0], y[0] + y[1]), G = new Int32Array(b, x[0][0], x[0][1] >> 2), G.length && !(8E3 < G.length))) {
                        C = new Int16Array(b, x[2][0], x[2][1] >> 1);
                        F = new Int8Array(b, x[3][0], x[3][1]);
                        lb() + C.length / 2 > bc && (q[q.length] = {
                            type: "line",
                            data: [jb(), kb()],
                            has3D: r,
                            has2D: w
                        }, w = r = !1, nb());
                        y = null;
                        if (p)
                            if (1 < jc ? N = new Int16Array(b, x[1][0], x[1][1] >> 1) : N =
                                new Uint16Array(b, x[1][0], x[1][1] >> 1), 1 === N.length && N[0]) y = Array(G.length >> 1), Wb(y, N[0]), r = !0;
                            else if (1 < N.length) {
                            y = [];
                            for (r = 0; r < N.length; r++) y[r] = N[r] || Zb;
                            r = !0
                        } else w = !0;
                        mb(C, n, g, y, f, 1 === d[0].G, G, F, 0)
                    }
        }
    }
    lb() && (q[q.length] = {
        type: "line",
        data: [jb(), kb()],
        has3D: r,
        has2D: w
    }, nb());
    return f
}

function dd(b, a, c, q, f) {
    var p = T(H[a[0] >> 2] + 1, a[0], a[0] + a[1]),
        k = [];
    a = [];
    for (var r = !1, w = !1, v = 0; v < p.length; v++) {
        var e = p[v];
        e = T(H[e[0] >> 2] + 1, e[0], e[0] + e[1])[0];
        var h = e[0] >> 2,
            d = H[h];
        if (wb(H[h + 1], c)) {
            var t = T(d + 1, e[0], e[0] + e[1]);
            e = new Int32Array(b, t[0][0], t[0][1] >> 2);
            e = ib(e);
            d = 1 < jc ? new Int16Array(b, t[3][0], t[3][1] >> 1) : new Uint16Array(b, t[3][0], t[3][1] >> 1);
            h = void 0;
            if (1 === d.length && d[0]) h = Array(e.length >> 1), Wb(h, d[0]), r = !0;
            else if (1 < d.length) {
                h = [];
                for (var n = 0; n < d.length; n++) h[n] = d[n] || 1;
                r = !0
            } else w = !0;
            d = new Uint32Array(b,
                t[2][0], t[2][1] >> 2);
            n = k.length / 8;
            f += 8;
            var g = U.b(W, d[0], "polygon", c, Y, !1, Z),
                l = U.b(W, d[1], "polygon", c, Y, !1, Z);
            if (g && l && g[0] && l[0] && g[0].c && l[0].c) {
                var u = new Int32Array(b, t[1][0], t[1][1] >> 2);
                d = [u[0] / 100, u[1] / 100];
                g = g[0].c;
                u = [u[2] / 100, u[3] / 100];
                l = l[0].c;
                var m = [u[0] - d[0], u[1] - d[1]],
                    A = Math.sqrt(Math.pow(m[0], 2) + Math.pow(m[1], 2)),
                    B = a;
                t = new Uint16Array(b, t[4][0], t[4][1] >> 1);
                for (var y = 0; y < t.length; y++) B[B.length] = t[y] + n;
                n = 0;
                for (t = e.length / 2; n < t; n++) {
                    B = [e[2 * n], e[2 * n + 1]];
                    if (0 === m[0]) {
                        y = d[0];
                        var x = B[1]
                    } else x = -((d[0] - B[0]) * m[0] + (d[1] - B[1]) * m[1]) / (m[0] * m[0] + m[1] * m[1]), y = x * m[0] + d[0], x = x * m[1] + d[1];
                    x = Math.sqrt(Math.pow(y - u[0], 2) + Math.pow(x - u[1], 2)) / A;
                    if (d[0] < u[0] && y < d[0] || d[0] > u[0] && y > d[0]) x = 1;
                    else if (d[0] < u[0] && y > u[0] || d[0] > u[0] && y < u[0]) x = 0;
                    k.push(B[0], B[1], h ? h[n] : 0, x * g[0] + (1 - x) * l[0], x * g[1] + (1 - x) * l[1], x * g[2] + (1 - x) * l[2], x * g[3] + (1 - x) * l[3], f)
                }
            }
        }
    }
    k.length && (b = jd(k), q.push({
        type: "fill",
        data: [b, new Uint16Array(a)],
        g: b.byteLength / ac,
        has3D: r,
        has2D: w
    }));
    return f
}

function Jc(b, a, c, q, f) {
    var p = T(H[a[0] >> 2] + 1, a[0], a[0] + a[1]);
    if (!p.length) return f;
    a = [];
    var k = [];
    f++;
    var r = ib(new Int32Array(b, p[0][0], p[0][1] >> 2)),
        w = new Int32Array(b, p[1][0], p[1][1] >> 2);
    b = new Int16Array(b, p[2][0], p[2][1] >> 1);
    var v = p = !1;
    1 === b.length && 0 === b[0] ? v = !0 : p = !0;
    b = ib(b, 1);
    if (1 === b.length) {
        var e = b[0];
        b = Array(r.length >> 1);
        Wb(b, e)
    }
    for (e = 0; e < w.length; e++)
        if (wb(w[e], c)) {
            var h = [r[4 * e], r[4 * e + 1], b[2 * e]],
                d = [r[4 * e + 2], r[4 * e + 3], b[2 * e + 1]],
                t = [(h[0] + d[0]) / 2, (h[1] + d[1]) / 2, (h[2] + d[2]) / 2],
                n = t[0] - h[0],
                g = t[1] -
                h[1],
                l = [d[0] - h[0], d[1] - h[1]],
                u = l[0] * l[0] + l[1] * l[1];
            0 < u && (u = 1 / Math.sqrt(u), l[0] *= u, l[1] *= u);
            u = a.length / 10;
            a[a.length] = t[0];
            a[a.length] = t[1];
            a[a.length] = h[2];
            a[a.length] = -n;
            a[a.length] = -g;
            a[a.length] = -l[1];
            a[a.length] = l[0];
            a[a.length] = .125;
            a[a.length] = .3125;
            a[a.length] = f;
            a[a.length] = t[0];
            a[a.length] = t[1];
            a[a.length] = h[2];
            a[a.length] = -n;
            a[a.length] = -g;
            a[a.length] = l[1];
            a[a.length] = -l[0];
            a[a.length] = .125;
            a[a.length] = .6875;
            a[a.length] = f;
            a[a.length] = t[0];
            a[a.length] = t[1];
            a[a.length] = d[2];
            a[a.length] = n;
            a[a.length] =
                g;
            a[a.length] = -l[1];
            a[a.length] = l[0];
            a[a.length] = 1;
            a[a.length] = .3125;
            a[a.length] = f;
            a[a.length] = t[0];
            a[a.length] = t[1];
            a[a.length] = d[2];
            a[a.length] = n;
            a[a.length] = g;
            a[a.length] = l[1];
            a[a.length] = -l[0];
            a[a.length] = 1;
            a[a.length] = .6875;
            a[a.length] = f;
            k[k.length] = u;
            k[k.length] = u + 1;
            k[k.length] = u + 2;
            k[k.length] = u + 2;
            k[k.length] = u + 1;
            k[k.length] = u + 3
        }
    k.length && q.push({
        type: "arrow",
        data: [new Float32Array(a), new Uint16Array(k)],
        has3D: p,
        has2D: v
    });
    return f
}

function cd(b, a, c, q, f) {
    if (Z) return f;
    a = T(H[a[0] >> 2] + 1, a[0], a[0] + a[1]);
    f++;
    for (var p = 0; p < a.length; p++) {
        var k = a[p],
            r = k[0] >> 2,
            w = H[r];
        if ((r = U.b(W, H[r + 1], "line", c, Y, !1, Z)) && r.length) {
            var v = r[0].h + ".png";
            k = T(w + 1, k[0], k[0] + k[1]);
            for (w = 0; w < k.length; w++) {
                var e = k[w],
                    h = e[0] >> 2,
                    d = H[h];
                wb(H[h + 1], c) && (h = H[h + 2] / 20, e = T(d + 1, e[0], e[0] + e[1]), mb(new Int16Array(b, e[2][0], e[2][1] >> 1), r[0].c, h, null, f, !0, new Int32Array(b, e[0][0], e[0][1] >> 2), new Int8Array(b, e[3][0], e[3][1]), 2))
            }
            q[q.length] = {
                type: "line",
                texture: v,
                isSingle: !0,
                data: [jb(), kb()]
            };
            nb()
        }
    }
    return f
}

function Ub(b, a, c, q, f) {
    c = c.useZoom;
    if (!a || !a.length) return null;
    for (var p = 0; p < a.length; p++) {
        var k = a[p],
            r = k[0] >> 2,
            w = H[r];
        if (8 === H[r + 1])
            for (k = T(w + 1, k[0], k[0] + k[1]), r = 0; r < k.length; r++) {
                var v = k[r];
                w = v[0] >> 2;
                var e = H[w];
                if ((w = U.b(W, H[w + 1], "polygon3d", c, f ? Vb : Y, !1, Z)) && w[0]) {
                    w = w[0];
                    var h = w.H,
                        d = w.l;
                    if (Z) {
                        d = void 0;
                        var t = h[0] / 255,
                            n = h[1] / 255,
                            g = h[2] / 255,
                            l = Math.max(t, n, g),
                            u = l - Math.min(t, n, g);
                        for (0 === u ? d = 0 : l === t ? d = (n - g) / u % 6 * 60 : l === n ? d = 60 * ((g - t) / u + 2) : l === g && (d = 60 * ((t - n) / u + 4)); 0 > d;) d += 360;
                        var m = [d, 0 === l ? 0 : u / l, l];
                        m[2] += .05;
                        0 > m[2] && (m[2] = 0);
                        n = t = d = void 0;
                        g = m[2] * m[1];
                        l = g * (1 - Math.abs(m[0] / 60 % 2 - 1));
                        u = m[2] - g;
                        m = m[0];
                        0 <= m && 60 > m ? (n = g, t = l, d = 0) : 60 <= m && 120 > m ? (n = l, t = g, d = 0) : 120 <= m && 180 > m ? (n = 0, t = g, d = l) : 180 <= m && 240 > m ? (n = 0, t = l, d = g) : 240 <= m && 300 > m ? (n = l, t = 0, d = g) : 300 <= m && 360 > m && (n = g, t = 0, d = l);
                        d = [Math.round(255 * (n + u)), Math.round(255 * (t + u)), Math.round(255 * (d + u)), 255];
                        zc || (zc = h, Ac = d)
                    }
                    v = T(e + 1, v[0], v[0] + v[1]);
                    e = 0;
                    if (q && w.borderWidth) {
                        var A = w.f[0],
                            B = w.f[1],
                            y = w.f[2],
                            x = w.f[3];
                        e = w.borderWidth / 4
                    }
                    for (t = 0; t < v.length; t++)
                        if (n = v[t], g = n[0] >>
                            2, l = H[g], wb(H[g + 1], c) && (g = H[g + 2], !(g < w.filter))) {
                            l = T(l + 1, n[0], n[0] + n[1]);
                            n = new Int32Array(b, l[0][0], l[0][1] >> 2);
                            m = new Uint16Array(b, l[1][0], l[1][1] >> 1);
                            u = n;
                            var G = g,
                                C = h[0],
                                F = h[1],
                                L = h[2],
                                P = h[3],
                                N = d[0],
                                S = d[1],
                                fa = d[2],
                                M = d[3],
                                I = u;
                            Xa || (Xa = z._get_block_points_address() >> 2);
                            Ga.set(I, Xa);
                            I = m;
                            Ya || (Ya = z._get_block_triangle_indices_address() >> 1);
                            Ia.set(I, Ya);
                            z._append_block_data(u.length, m.length, G, C, F, L, P, N, S, fa, M);
                            if (q && w.borderWidth && n.length && (u = Array(n.length >> 1), Wb(u, 100 * g), l[2]))
                                for (g = T(0, l[2][0], l[2][0] +
                                        l[2][1]), l = 0; l < g.length; l++) m = g[l], C = T(0, m[0], m[0] + m[1]), m = new Int16Array(b, C[0][0], C[0][1] >> 1), G = new Uint16Array(b, C[1][0], C[1][1] >> 1), C = new Int8Array(b, C[2][0], C[2][1]), mb(m, [A, B, y, x], e, u, 2, !0, n, C, 0, G[0], G[1])
                        }
                }
            }
    }
    if (q) {
        var O = {
            type: "line",
            data: [jb(), kb()]
        };
        nb()
    }
    return 0 < z._get_block_vertex_count() ? ($a || ($a = z._get_block_vertex_start()), b = new Float32Array(Aa.slice($a, z._get_block_vertex_end())), Za || (Za = z._get_block_index_start()), a = new Uint16Array(Aa.slice(Za, z._get_block_index_end())), b = {
        vertex: b,
        index: a
    }, z._reset_block(), q && (b.border = O), b) : null
}

function jd(b) {
    var a = new ArrayBuffer(b.length / 8 * 20),
        c = new Float32Array(a);
    a = new Uint8Array(a);
    for (var q = 0, f = 12, p = 4, k = 0; k < b.length; k += 8) c[q] = b[k], c[q + 1] = b[k + 1], c[q + 2] = b[k + 2] / 100, a[f] = b[k + 3], a[f + 1] = b[k + 4], a[f + 2] = b[k + 5], a[f + 3] = b[k + 6], c[p] = b[k + 7], q += 5, f += 20, p += 5;
    return c
}

function fd(b, a, c, q, f) {
    if (!a || !a.length) return 0;
    c = c.useZoom;
    for (var p = 0, k = 0, r = 0, w = 0, v = 0; v < a.length; v++) {
        var e = a[v],
            h = e[0] >> 2;
        if (25 === H[h + 1]) {
            e = T(H[h] + 1, e[0], e[0] + e[1])[0];
            var d = e[0] >> 2;
            h = H[d];
            if ((d = U.b(W, H[d + 1], "polygon3d", c, Y, !1, Z)) && d[0]) {
                d = d[0];
                var t = d.l;
                zc && (t = zc);
                e = T(h + 1, e[0], e[0] + e[1])[0];
                h = T(H[e[0] >> 2] + 1, e[0], e[0] + e[1]);
                e = new Int32Array(b, h[1][0], h[1][1] >> 2);
                p += e.length;
                if (q) {
                    d = new Int32Array(b, h[2][0], h[2][1] >> 2);
                    h = e;
                    for (var n = q, g = w, l = new DataView(n.buffer), u, m = 0; m < h.length; m += 3) u = m / 3 * 7 +
                        g, n[u] = h[m] / 100, n[u + 1] = h[m + 1] / 100, n[u + 2] = h[m + 2] / 100, n[u + 3] = d[m], n[u + 4] = d[m + 1], n[u + 5] = d[m + 2], l.setUint8(4 * u + 24, t[0]), l.setUint8(4 * u + 25, t[1]), l.setUint8(4 * u + 26, t[2]), l.setUint8(4 * u + 27, t[3]);
                    h = [];
                    for (d = 0; d < e.length / 3; d++) h.push(d + k);
                    f.set(h, r);
                    w += e.length / 3 * 7;
                    r += h.length;
                    k += e.length / 3
                }
            }
        }
    }
    return p
}

function ed(b, a) {
    var c = [],
        q = [];
    a = a.useZoom;
    for (var f = 0; f < b.length; f++) {
        var p = b[f],
            k = p[0] >> 2;
        if (24 === H[k + 1]) {
            k = T(H[k] + 1, p[0], p[0] + p[1])[0];
            p = k[0] >> 2;
            var r = H[p];
            if ((p = U.b(W, H[p + 1], "polygon3d", a, Y, !1, Z)) && p[0])
                for (p = p[0], p = p.l, Ac && (p = Ac), k = T(r + 1, k[0], k[0] + k[1]), r = 0; r < k.length; r++) {
                    var w = k[r][0] / 4,
                        v = c,
                        e = q,
                        h = c.length / 10,
                        d = H[w + 1] / 100,
                        t = H[w + 2] / 100,
                        n = H[w + 3] / 100,
                        g = H[w + 4] / 100,
                        l = p[0],
                        u = p[1],
                        m = p[2];
                    for (w = 0; 360 >= w; w += 36) {
                        var A = Math.cos(w * Math.PI / 180) * t + n,
                            B = Math.sin(w * Math.PI / 180) * t + g,
                            y = A + n,
                            x = B + g;
                        v.push(A, B, 0,
                            y, x, 0, l, u, m, 255);
                        v.push(A, B, d, y, x, 0, l, u, m, 255)
                    }
                    for (w = 0; 10 > w; w++) v = 2 * w + h, e.push(v, v + 2, v + 3), e.push(v, v + 3, v + 1)
                }
        }
    }
    if (0 < c.length) {
        b = c.length / 10;
        a = new Float32Array(7 * b);
        f = new DataView(a.buffer);
        for (k = 0; k < b; k++) p = 7 * k, a[p] = c[10 * k], a[p + 1] = c[10 * k + 1], a[p + 2] = c[10 * k + 2], a[p + 3] = c[10 * k + 3], a[p + 4] = c[10 * k + 4], a[p + 5] = c[10 * k + 5], f.setUint8(4 * p + 24, c[10 * k + 6]), f.setUint8(4 * p + 25, c[10 * k + 7]), f.setUint8(4 * p + 26, c[10 * k + 8]), f.setUint8(4 * p + 27, c[10 * k + 9]);
        c = {
            vertex: a,
            index: new Uint16Array(q)
        }
    } else c = null;
    return c
};