define("pano:widget/module/PanoModule/WebglRender/animation/AnimationManager.js", function() {
    var n, i = function() {
            function n(i, t) {
                for (var e, o = i.length - 1; o >= 0; o--) e = i[o], e instanceof Array ? n(e, t) : e === t && i.splice(o, 1)
            }
            var i = !1,
                t = [],
                e = !1;
            this.execute = function(n) {
                if (0 >= t.length) return void(i = !1);
                for (var e, o, s, a, r = 0, l = !1; r < t.length;) {
                    if (e = t[r]) {
                        if (e instanceof Array)
                            for (l = !0, s = e.length, o = 0; s > o; o++) a = e[o], a.execute(n), !0 !== a.getIsCompleted() && (l = !1);
                        else e.execute(n), l = e.getIsCompleted();
                        l && t.shift();
                        break
                    }
                    t.shift()
                }
                0 >= t.length && (i = !1)
            }, this.getIsAnimating = function() {
                return i
            }, this.setIsWaitingPreCondition = function(n) {
                e = n
            }, this.getIsWaitingPreCondition = function() {
                return e
            }, this.executeAnimation = function(n) {
                n && (i = !0, t.push(n))
            }, this.executeSynchronousAnimations = function(n) {
                n instanceof Array && 0 < n.length && (i = !0, t.push(n))
            }, this.executeSequenceAnimations = function(n) {
                n instanceof Array && 0 < n.length && (i = !0, t = t.concat(n))
            }, this.killAnimation = function(i) {
                n(t, i), i.kill()
            }, this.killAnimations = function(n) {
                for (var i, t = n.length - 1; t >= 0; t--)
                    if (i = n[t], i instanceof Array)
                        for (var e = i.length - 1; e >= 0; e--) this.killAnimation(i[t]);
                    else this.killAnimation(i)
            }, this.killAnimationsOf = function() {}, this.killAllAnimations = function() {
                this.killAnimations(t), i = !1, e = !1
            }
        },
        t = function() {
            return void 0 === n && (n = new i), n
        };
    return {
        getInstance: t()
    }
});;
define("pano:widget/module/PanoModule/WebglRender/animation/Animation.js", function() {
    var t = function() {
        this.tween = void 0, this.isWaiting = !1;
        var e = this;
        this.startCallback = function() {
            e.dispatchEvent({
                type: t.TWEEN_START
            })
        }, this.endCallback = function() {
            e.dispatchEvent({
                type: t.TWEEN_END
            })
        }
    };
    t.TWEEN_START = "tweenStart", t.TWEEN_END = "tweenEnd";
    var e = t.prototype;
    return e.execute = function(t) {
        this.tween && !0 !== this.tween.getIsCompleted() && this.tween.execute(t)
    }, e.getIsCompleted = function() {
        return this.tween ? this.tween.getIsCompleted() : !1
    }, e.getIsAnimating = function() {
        return this.tween ? this.tween.getIsAnimating() : !1
    }, e.getIsWaiting = function() {
        return this.isWaiting
    }, e.setIsWaiting = function(t) {
        this.isWaiting = t
    }, e.kill = function() {
        this.tween && this.tween.kill()
    }, e.dispose = function() {
        this.tween && this.tween.kill()
    }, Four.EventDispatcher.prototype.apply(t.prototype), t
});;
define("pano:widget/module/PanoModule/WebglRender/animation/tip/TipParameters.js", function() {
    var t = Four.Tool,
        i = Four.GLMatrix.mat4,
        e = function(t, i) {
            var e = Math.atan2(i.x - t.x, i.y - t.y);
            return e = 0 > e ? e + 2 * Math.PI : e
        },
        h = function(t, i) {
            return 180 * e(t, i) / Math.PI
        },
        n = function(t, i) {
            var e = Math.abs(t - i);
            return e > 180 ? 360 - e : e
        },
        a = function(t, i, e) {
            var h = i[0],
                n = i[1],
                a = i[2],
                o = 1,
                r = e[3] * h + e[7] * n + e[11] * a + e[15] * o;
            return t[0] = (e[0] * h + e[4] * n + e[8] * a + e[12] * o) / r, t[1] = (e[1] * h + e[5] * n + e[9] * a + e[13] * o) / r, t[2] = (e[2] * h + e[6] * n + e[10] * a + e[14] * o) / r, t
        },
        o = function(t, i, e, h) {
            if (t.x === i.x || e.x === h.x) return null;
            var n = (i.y - t.y) / (i.x - t.x),
                a = (h.y - e.y) / (h.x - e.x);
            if (n === a) return null;
            var o = (a * e.x - n * t.x + t.y - e.y) / (a - n),
                r = n * (o - t.x) + t.y;
            return {
                x: o,
                y: r
            }
        },
        r = function(t, i, e, h) {
            this.x = t, this.y = i, this.width = e, this.height = h
        },
        s = function(e, s, d, c, u, x) {
            var g = 50,
                v = 20,
                f = 1.5,
                y = 10,
                p = 2.2,
                l = 10,
                m = 50,
                H = 5,
                M = 10;
            this.from = {
                x: s.panoX,
                y: s.panoY
            }, this.to = {
                x: d[0],
                y: d[1]
            }, this.roadHeading = s.moveDir, this.moveHeading = c, this.initXAxis = s.pitch, this.initYAxis = s.heading, this.initZAxis = s.roll, this.cameraHeading = t.degreeNormalized(360 - t.radToDeg(e.rotateY)), this.cameraPitch = -t.radToDeg(e.rotateX), this.fovy = t.degToRad(e.fov), this.pMatrix = e.projectionMatrix, this.deviceHeight = s.deviceHeight, this.deviceHeight = 0 === this.deviceHeight ? p : this.deviceHeight, this.snapshotRatio = 1, this.roadWidth = s.getRoadWidth(), this.panoWidth = u, this.panoHeight = x, this.snapshot = void 0, this.prepareAnimation = function() {
                this.roadWidth = Math.min(this.roadWidth * f, y), void 0 === this.moveHeading && (this.moveHeading = R()), this.moveHeadingDelta = P(), this.moveDistance = W(), this.isMovingForward = X(), this.needMoreTiles = T(), this.snapshotRatio = !0 !== this.needMoreTiles ? 1 : 1.8, this.mvMatrix = F(), this.correctMatrix = A(), this.tipDistance = D(), this.roads = Y(this.roadWidth, this.deviceHeight, this.correctMatrix, this.pMatrix), this.vanishPoint = b(this.roads, this.snapshotRatio, this.panoWidth, this.panoHeight), this.outerRect = new r(this.panoWidth * (this.snapshotRatio - 1) * .5, this.panoHeight * (this.snapshotRatio - 1) * .5, this.panoWidth, this.panoHeight), yRatio = this.panoHeight / 507, this.innerRect = j(this.vanishPoint, this.roads, g * yRatio, v * yRatio, this.panoWidth, this.panoHeight, this.snapshotRatio), this.focusLength = .5 * this.panoHeight / Math.tan(.5 * this.fovy), this.vanishPointDeltaX = this.vanishPoint.x - this.outerRect.x - .5 * this.outerRect.width, this.vanishPointDeltaY = this.vanishPoint.y - this.outerRect.y - .5 * this.outerRect.height
            }, this.toString = function() {
                var t = "",
                    i = "";
                for (t in this) "function" != typeof this[t] && (i += t + " : " + this[t] + "; ");
                return i
            }, this.dispose = function() {
                this.roads = [], this.outerRect = null, this.innerRect = null, this.vanishPoint = null, this.correctMatrix = null
            };
            var w = this,
                R = function() {
                    if (!w.from || !w.to) return 0;
                    var t = h(w.from, w.to),
                        i = w.roadHeading,
                        e = 180 > i ? i + 180 : i - 180;
                    return n(t, i) < 90 ? i : e
                },
                P = function() {
                    return n(w.cameraHeading, w.moveHeading)
                },
                W = function() {
                    return Math.sqrt(Math.pow(w.from.x - w.to.x, 2) + Math.pow(w.from.y - w.to.y, 2))
                },
                D = function() {
                    var t = w.moveDistance,
                        i = w.isMovingForward ? l : H,
                        e = w.isMovingForward ? m : M;
                    return t = w.moveHeadingDelta > 30 ? i : Math.min(e, Math.max(i, t)), w.isMovingForward || (t = -t), t
                },
                T = function() {
                    return n(w.cameraHeading, w.moveHeading) > 45
                },
                X = function() {
                    return n(w.cameraHeading, w.moveHeading) <= 90
                },
                F = function() {
                    var e = i.create();
                    return i.rotateX(e, e, t.degToRad(-w.cameraPitch)), e
                },
                A = function() {
                    var e = i.create();
                    return i.rotateX(e, e, t.degToRad(w.initXAxis)), e
                },
                Y = function(t, i, e, h) {
                    for (var n = [], o = [
                            [-t / 2, -i, -10],
                            [-t / 2, -i, -20],
                            [t / 2, -i, -10],
                            [t / 2, -i, -20]
                        ], r = o.length, s = 0; r > s; s++) selected = o[s], a(selected, selected, h), n[s] = {
                        x: selected[0] * w.panoWidth * .5,
                        y: -selected[1] * w.panoHeight * .5
                    };
                    return n
                },
                b = function(t, i, e, h) {
                    var n = o(t[0], t[1], t[2], t[3]);
                    return null === n ? null : (n.x += e * i * .5, n.y += h * i * .5, n)
                },
                j = function(t, i, e, h, n, a, s) {
                    var d = {
                            x: t.x - n * s * .5,
                            y: t.y - a * s * .5
                        },
                        c = {
                            x: d.x,
                            y: d.y + h
                        },
                        u = {
                            x: d.x + 10,
                            y: d.y + h
                        },
                        x = o(i[0], i[1], c, u),
                        g = o(i[2], i[3], c, u),
                        v = {
                            x: x.x,
                            y: x.y - h - e
                        },
                        f = new r(v.x + n * s * .5, v.y + a * s * .5, g.x - x.x, e + h),
                        y = (t.x - f.x) / f.width,
                        p = .7,
                        l = .3;
                    y > p ? f.x = f.x + f.width * (y - p) : l > y && (f.x = f.x + f.width * (l - y));
                    var m, H, M, w, R = f.width / n,
                        P = .12;
                    if (R > P) {
                        var W = f.width / f.height;
                        M = n * P, w = M / W, m = f.x + (f.width - M) * (t.x - f.x) / f.width, H = f.y + (f.height - w) * (t.y - f.y) / f.height, f = new r(m, H, M, w)
                    }
                    var W = f.width / f.height,
                        D = 1.2,
                        T = .9;
                    return (W > D || T > W) && (W > D ? w = f.height * W / D : T > W && (w = f.height * W / T), H = f.y + f.height - w, f = new r(f.x, H, f.width, w)), f
                }
        };
    return s
});;
define("pano:widget/module/PanoModule/WebglRender/animation/tip/TipGeometry.js", function() {
    var t = Four.geometry.Geometry,
        e = Four.GLMatrix.mat4,
        r = Four.GLMatrix.vec4,
        i = Four.Tool,
        a = function(a, o) {
            function n(t) {
                var e = -.1,
                    r = 1.1;
                return Math.max(e, Math.min(r, t))
            }
            t.call(this);
            var s = 3,
                g = o.vanishPoint,
                h = o.innerRect,
                c = o.outerRect,
                u = o.focusLength,
                f = -o.moveHeading,
                v = o.isMovingForward;
            this.indicesArray = [], this.uvtArray = [], this.rotationMatrix = e.create(), v ? e.rotateY(this.rotationMatrix, this.rotationMatrix, i.degToRad(f)) : (f = i.degreeNormalized(180 + f), e.rotateY(this.rotationMatrix, this.rotationMatrix, i.degToRad(f)));
            var y = {
                    rearXSeg: 10,
                    rearYSeg: 10,
                    rearZSeg: 0,
                    leftXSeg: 0,
                    leftYSeg: 10,
                    leftZSeg: 30,
                    rightXSeg: 0,
                    rightYSeg: 10,
                    rightZSeg: 30,
                    topXSeg: 10,
                    topYSeg: 0,
                    topZSeg: 30,
                    bottomXSeg: 10,
                    bottomYSeg: 0,
                    bottomZSeg: 30
                },
                p = this,
                S = function() {
                    var t = c.y + c.height - h.y - h.height,
                        e = g.y - h.y,
                        r = g.x - h.x,
                        i = h.x + h.width - g.x,
                        a = c.y + c.height - g.y,
                        o = t * u / (a - t),
                        n = a + e * (u + o) / u,
                        s = r * (u + o) / u,
                        f = i * (u + o) / u,
                        v = -s,
                        y = f,
                        S = n - a,
                        l = -a,
                        x = o / 5,
                        m = {
                            x: v,
                            y: S,
                            z: -o
                        },
                        M = {
                            x: y,
                            y: l,
                            z: -o
                        };
                    d(m, M, 0);
                    var w = {
                            x: v,
                            y: S,
                            z: x
                        },
                        Y = {
                            x: v,
                            y: l,
                            z: -o
                        };
                    d(w, Y, 1);
                    var A = {
                            x: y,
                            y: S,
                            z: -o
                        },
                        b = {
                            x: y,
                            y: l,
                            z: x
                        };
                    d(A, b, 2), d(w, A, 3), d(Y, b, 4), p.verticesBufferData = new Float32Array(p.vertices), p.indicesBufferData = new Uint16Array(p.indicesArray)
                },
                d = function(t, e, r) {
                    var i, a, o, n, g, h = [],
                        c = [];
                    switch (r) {
                        case 0:
                            i = y.rearXSeg, a = y.rearYSeg, o = y.rearZSeg, g = i + 1, n = a + 1;
                            break;
                        case 1:
                            i = y.leftXSeg, a = y.leftYSeg, o = y.leftZSeg, g = a + 1, n = o + 1;
                            break;
                        case 2:
                            i = y.rightXSeg, a = y.rightYSeg, o = y.rightZSeg, g = a + 1, n = o + 1;
                            break;
                        case 3:
                            i = y.topXSeg, a = y.topYSeg, o = y.topZSeg, g = i + 1, n = o + 1;
                        case 4:
                            i = y.bottomXSeg, a = y.bottomYSeg, o = y.bottomZSeg, g = i + 1, n = o + 1
                    }
                    var u = p.vertices.length / s;
                    x(h, t, e, i, a, o), p.vertices = p.vertices.concat(h), m(c, g, n, u), p.indicesArray = p.indicesArray.concat(c)
                },
                l = function(t, e, r, i) {
                    if (0 >= i) return void t.push(e);
                    for (var a = (r - e) / i, o = 0; i >= o; o++) t[o] = e + a * o
                },
                x = function(t, e, r, i, a, o) {
                    var n = [],
                        s = [],
                        g = [];
                    l(n, e.x, r.x, i), l(s, e.y, r.y, a), l(g, e.z, r.z, o);
                    for (var h = 0; i >= h; h++)
                        for (var c = 0; a >= c; c++)
                            for (var u = 0; o >= u; u++) t.push(n[h], s[c], g[u])
                },
                m = function(t, e, r, i) {
                    colMax = e - 1, rowMax = r - 1;
                    for (var a, o, n, s, g = 0; colMax > g; g++)
                        for (var h = 0; rowMax > h; h++) a = i + r * g + h, o = a + 1, n = a + r, s = n + 1, t.push(a, n, s), t.push(a, s, o), p.triangles.push(new Four.geometry.Triangle([a, n, s]), new Four.geometry.Triangle([a, s, o]))
                };
            this.initUVT = function(t, e, i, a, o, g) {
                for (var h, c = e.width, u = e.height, f = this.vertices, v = 0, y = 0, p = 0, S = 0, d = 0, l = 0, x = 0, m = f.length / s; m > x; x++) h = r.fromValues(f[3 * x], f[3 * x + 1], f[3 * x + 2], 1), r.transformMat4(h, h, this.rotationMatrix), r.transformMat4(h, h, t.viewMatrix), r.transformMat4(h, h, t.projectionMatrix), h[0] = h[0] / h[3], h[1] = h[1] / h[3], h[2] = h[2] / h[3], h[3] = 1, v = h[0] * i * .5 + o, y = h[1] * a * .5 + g, p = v + .5 * c, S = y + .5 * u, d = p / c, l = S / u, this.uvtArray.push(n(d), n(l));
                this.uvtsBufferData = new Float32Array(this.uvtArray)
            }, S(), this.initUVT(a, o.snapshot, o.panoWidth, o.panoHeight, o.vanishPointDeltaX, o.vanishPointDeltaY)
        };
    return a.prototype = Object.create(t.prototype), a.prototype.constructor = a, a.prototype.dispose = function() {
        t.prototype.dispose.call(this), this.indicesArray = [], this.uvtArray = [], this.vertices = [], this.triangles = [], this.verticesBufferData = void 0, this.indicesBufferData = void 0, this.uvtsBufferData = void 0
    }, a
});;
define("pano:widget/module/PanoModule/WebglRender/animation/tip/TipModel.js", function(e) {
    var t = e("pano:widget/module/PanoModule/WebglRender/component/ThreeDDisplayObject.js"),
        o = e("pano:widget/module/PanoModule/WebglRender/animation/tip/TipGeometry.js"),
        i = e("pano:widget/module/PanoModule/WebglRender/core/ShaderSet.js"),
        r = e("pano:widget/module/PanoModule/WebglRender/config/ConfigurationOptions.js"),
        n = window.Four.Log,
        a = function(e, n) {
            t.call(this);
            var a = new o(e, n),
                s = new Four.material.Material;
            s.depthTest = !1, s.uniforms = {
                uSampler: {
                    type: "t",
                    value: n.snapshot
                },
                uOpacity: {
                    type: "1f",
                    value: 1
                }
            }, s.vertexShader = i.uvProjVertexShader, s.fragmentShader = i.textureProjFragmentShader, !0 === r.debug.shader && (s.uniforms.showDebugLine = {
                type: "1i",
                value: !0
            }, s.uniforms.vColor = {
                type: "4f",
                value: [0, 1, 0, .5]
            }, s.fragmentShader = i.textureProjFragmentShaderDebug), this.mesh = new Four.Mesh(a, s), this.mesh.rotation = a.rotationMatrix;
            var d = 1;
            Object.defineProperties(this, {
                opacity: {
                    get: function() {
                        return d
                    },
                    set: function(e) {
                        d !== e && (d = e, s.uniforms.uOpacity.value = d)
                    }
                },
                position: {
                    get: function() {
                        return this.mesh.position
                    },
                    set: function(e) {
                        this.mesh.position = e
                    }
                }
            })
        };
    return a.prototype = Object.create(t.prototype), a.prototype.constructor = a, a.prototype.getRotation = function() {
        return this.mesh.rotation
    }, a.prototype.dispose = function() {
        if (void 0 !== this.mesh) {
            var e = this.mesh.material;
            if (void 0 !== e) {
                n.log("[TipModel] FN:dispose:  deallocate material with id " + e.id);
                var t = e.uniforms.uSampler.value;
                void 0 !== t && (t.dispose(), delete e.uniforms.uSampler.value), e.dispose(), delete e.uniforms, delete this.mesh.material
            }
            var o = this.mesh.geometry;
            void 0 !== o && (o.dispose(), delete this.mesh.geometry), delete this.mesh
        }
    }, a
});;
define("pano:widget/module/PanoModule/WebglRender/animation/tween/TweenFunction.js", function() {
    var n = function() {};
    return n.linear = function(n, t, e, u) {
        return e * n / u + t
    }, n.easeInQuad = function(n, t, e, u) {
        return n /= u, e * n * n + t
    }, n.easeOutQuad = function(n, t, e, u) {
        return n /= u, -e * n * (n - 2) + t
    }, n.easeInOutQuad = function(n, t, e, u) {
        return n /= u / 2, 1 > n ? e / 2 * n * n + t : (n--, -e / 2 * (n * (n - 2) - 1) + t)
    }, n.easeInCubic = function(n, t, e, u) {
        return n /= u, e * n * n * n + t
    }, n.easeOutCubic = function(n, t, e, u) {
        return n /= u, n--, e * (n * n * n + 1) + t
    }, n.easeInOutCubic = function(n, t, e, u) {
        return n /= u / 2, 1 > n ? e / 2 * n * n * n + t : (n -= 2, e / 2 * (n * n * n + 2) + t)
    }, n.easeInQuart = function(n, t, e, u) {
        return n /= u, e * n * n * n * n + t
    }, n.easeOutQuart = function(n, t, e, u) {
        return n /= u, n--, -e * (n * n * n * n - 1) + t
    }, n.easeInOutQuart = function(n, t, e, u) {
        return n /= u / 2, 1 > n ? e / 2 * n * n * n * n + t : (n -= 2, -e / 2 * (n * n * n * n - 2) + t)
    }, n.easeInQuint = function(n, t, e, u) {
        return n /= u, e * n * n * n * n * n + t
    }, n.easeOutQuint = function(n, t, e, u) {
        return n /= u, n--, e * (n * n * n * n * n + 1) + t
    }, n.easeInOutQuint = function(n, t, e, u) {
        return n /= u / 2, 1 > n ? e / 2 * n * n * n * n * n + t : (n -= 2, e / 2 * (n * n * n * n * n + 2) + t)
    }, n.easeInSine = function(n, t, e, u) {
        return -e * Math.cos(n / u * (Math.PI / 2)) + e + t
    }, n.easeOutSine = function(n, t, e, u) {
        return e * Math.sin(n / u * (Math.PI / 2)) + t
    }, n.easeInOutSine = function(n, t, e, u) {
        return -e / 2 * (Math.cos(Math.PI * n / u) - 1) + t
    }, n.easeInExpo = function(n, t, e, u) {
        return e * Math.pow(2, 10 * (n / u - 1)) + t
    }, n.easeOutExpo = function(n, t, e, u) {
        return e * (-Math.pow(2, -10 * n / u) + 1) + t
    }, n.easeInOutExpo = function(n, t, e, u) {
        return n /= u / 2, 1 > n ? e / 2 * Math.pow(2, 10 * (n - 1)) + t : (n--, e / 2 * (-Math.pow(2, -10 * n) + 2) + t)
    }, n.easeInCirc = function(n, t, e, u) {
        return n /= u, -e * (Math.sqrt(1 - n * n) - 1) + t
    }, n.easeOutCirc = function(n, t, e, u) {
        return n /= u, n--, e * Math.sqrt(1 - n * n) + t
    }, n.easeInOutCirc = function(n, t, e, u) {
        return n /= u / 2, 1 > n ? -e / 2 * (Math.sqrt(1 - n * n) - 1) + t : (n -= 2, e / 2 * (Math.sqrt(1 - n * n) + 1) + t)
    }, n
});;
define("pano:widget/module/PanoModule/WebglRender/animation/tween/Tween.js", function(e) {
    var n = e("pano:widget/module/PanoModule/WebglRender/animation/tween/TweenFunction.js"),
        t = function(e, t, r, a, u, i) {
            function l(n, t) {
                if (n) {
                    var r;
                    for (var a in n) r = h(a), void 0 === r && (r = {
                        target: e,
                        propertyName: a
                    }), !0 === t ? r.startValue = o(n[a]) : (void 0 === r.startValue && (r.startValue = o(e[a])), r.endValue = n[a], r.valueChange = r.endValue instanceof Array ? s(r.endValue, r.startValue) : r.endValue - r.startValue), g.push(r)
                }
            }

            function o(e) {
                if (e && 0 < e.length) {
                    for (var n = [], t = 0, r = e.length; r > t; t++) n[t] = e[t];
                    return n
                }
                return e
            }

            function f(e, n) {
                var t = [],
                    r = e.length,
                    a = n.length;
                if (r === a)
                    for (var u = 0; r > u; u++) t[u] = e[u] + n[u];
                return t
            }

            function s(e, n) {
                var t = [],
                    r = e.length,
                    a = n.length;
                if (r === a)
                    for (var u = 0; r > u; u++) t[u] = e[u] - n[u];
                return t
            }

            function c(e, n) {
                for (var t = [], r = e.length, a = 0; r > a; a++) t[a] = e[a] * n;
                return t
            }

            function h(e) {
                for (var n, t = 0, r = g.length; r > t; t++)
                    if (n = g[t], n && n.propertyName === e) return n;
                return void 0
            }
            var g = [],
                e = e,
                t = t,
                v = u,
                d = i,
                a = a || n.linear,
                V = 0,
                m = !1,
                p = !1;
            l(r, !1), this.from = function(e) {
                return l(e, !0), this
            }, this.to = function(e) {
                return l(e, !1), this
            }, this.kill = function(n, t) {
                if (m = !0, p = !1, n)
                    for (var r, a = 0, u = g.length; u > a; a++) r = g[a], e[r.propertyName] = r.endValue instanceof Array ? f(r.startValue, r.valueChange) : r.startValue + r.valueChange;
                t && d.call(null, !0)
            }, this.execute = function(n) {
                if (!0 !== m) {
                    var r, u = 0;
                    0 === V && v && setTimeout(function() {
                        v.call(null)
                    }, 0), V += n, V >= t ? (V = t, m = !0, u = 1) : (p = !0, u = a(V, 0, 1, t));
                    for (var i = 0, l = g.length; l > i; i++) r = g[i], e[r.propertyName] = r.endValue instanceof Array ? f(r.startValue, c(r.valueChange, u)) : r.startValue + u * r.valueChange;
                    m && (d ? setTimeout(function() {
                        p = !1, d.call(null)
                    }, 0) : p = !1)
                }
            }, this.getIsCompleted = function() {
                return m
            }, this.getIsAnimating = function() {
                return p
            }, this.getTweenTime = function() {
                return V
            }
        };
    return t
});;
define("pano:widget/module/PanoModule/WebglRender/animation/TipAnimation.js", function(e) {
    var t = e("pano:widget/module/PanoModule/WebglRender/animation/Animation.js"),
        o = e("pano:widget/module/PanoModule/WebglRender/animation/tip/TipParameters.js"),
        i = e("pano:widget/module/PanoModule/WebglRender/animation/tip/TipModel.js"),
        n = e("pano:widget/module/PanoModule/WebglRender/animation/tween/Tween.js"),
        a = e("pano:widget/module/PanoModule/WebglRender/animation/tween/TweenFunction.js"),
        d = Four.GLMatrix.vec3,
        l = function(e, l, r, s, p, u) {
            t.call(this);
            var M = 30,
                g = 50,
                c = 60,
                h = 8,
                m = 12,
                w = 14,
                v = 700,
                b = e.clientWidth,
                f = e.clientHeight,
                R = new o(l, r, s, p, b, f);
            R.prepareAnimation(), R.snapshot = u.call(null, R.snapshotRatio), this.tipModel = new i(l, R);
            var j;
            j = 1400 >= b ? R.isMovingForward ? M : h : 1680 >= b ? R.isMovingForward ? g : m : R.isMovingForward ? c : w;
            var s = d.fromValues(0, 0, R.tipDistance * j);
            d.transformMat4(s, s, this.tipModel.getRotation()), s = [s[0], s[1], s[2]], this.tween = new n(this.tipModel, v, {
                position: s
            }, a.linear, this.startCallback, this.endCallback)
        };
    l.prototype = Object.create(t.prototype), l.prototype.constructor = l;
    var r = l.prototype;
    return r.getMesh = function() {
        return this.tipModel.getMesh()
    }, r.getFadeTarget = function() {
        return this.tipModel
    }, r.dispose = function() {
        t.prototype.dispose.call(this), void 0 !== this.tipModel && (this.tipModel.dispose(), delete this.tipModel)
    }, l
});;
define("pano:widget/module/PanoModule/WebglRender/animation/pointCloud/PointCloudParameters.js", function(t) {
    var e = t("pano:widget/module/PanoModule/WebglRender/util/Util.js"),
        i = window.Four,
        a = i.Tool,
        o = i.GLMatrix,
        r = o.mat4,
        s = i.Log,
        h = function(t, e) {
            var i = Math.abs(t - e);
            return i > 180 ? 360 - i : i
        },
        h = function(t, e) {
            var i = e - t;
            return i > 180 ? i -= 360 : -180 > i && (i += 360), i
        },
        d = function(t, i, o, d, n) {
            var g = 120,
                c = 1.8,
                l = 90,
                u = 200;
            this.camera = t, this.relativePositon = [o[0] - i.panoX, o[1] - i.panoY], this.isClickedPlane = d, this.distance = Math.sqrt(this.relativePositon[0] * this.relativePositon[0] + this.relativePositon[1] * this.relativePositon[1]), this.isClickedPlane && n && this.distance < g ? (this.targetHeading = n.heading, this.targetPitch = n.pitch) : (this.targetHeading = a.radToDeg(t.rotateY), this.targetPitch = -a.radToDeg(t.rotateX)), s.log("targetHeading/Pitch: " + this.targetHeading + ", " + this.targetPitch), this.animationDuration = 550 * (2 - Math.pow(.95, this.distance / 20)), s.log("animationDuration: " + this.animationDuration);
            var M = e.getHeadingInPlane([0, 0], this.relativePositon);
            this.isMovingBackward = h(this.sourceHeading, M) >= 90, this.sourcePositoin = [0, 0, 0], this.sourceCamera = t.clone(), this.sourceHeading = a.radToDeg(this.sourceCamera.rotateY), this.sourcePitch = -a.radToDeg(this.sourceCamera.rotateX), this.sourceSnapshot = void 0, this.sourcePointCloudData = i.pointCloudData, this.sourceAlpha = 1, this.sourceModelMoveFactor = 1, this.distance > u && (this.sourceModelMoveFactor = u / this.distance), this.sourceCorrectModelMatrix = r.create(), r.rotateY(this.sourceCorrectModelMatrix, this.sourceCorrectModelMatrix, a.degToRad(-i.heading)), r.rotateX(this.sourceCorrectModelMatrix, this.sourceCorrectModelMatrix, a.degToRad(i.pitch)), r.rotateZ(this.sourceCorrectModelMatrix, this.sourceCorrectModelMatrix, a.degToRad(-i.roll)), this.targetPosition = [this.relativePositon[0], 0, -this.relativePositon[1]], this.targetCamera = t.clone(), this.targetCamera.fov *= c, this.targetCameraFovRatio = c, this.targetHeading = this.sourceHeading + h(this.sourceHeading, this.targetHeading), this.targetPitch = this.sourcePitch + h(this.sourcePitch, this.targetPitch), this.targetCamera.rotateY = a.degToRad(this.targetHeading), this.targetCamera.rotateX = -a.degToRad(this.targetPitch), this.targetCamera.updateProjectionMatrix(), this.targetCamera.updateWorldMatrix(), this.targetSnapshot = void 0, this.targetPointCloudData = void 0, this.targetAlpha = 1, this.targetModelMoveFactor = 1, this.targetCorrectModelMatrix = void 0, s.log("targetPosition: " + this.targetPosition[0], this.targetPosition[1], this.targetPosition[2]), s.log("targetYaw/Pitch:" + this.targetCamera.rotateX, this.targetCamera.rotateY), this.updateViewport = function(t, e) {
                this.viewportWidth = t, this.viewportHeight = e
            }, this.updateTargetPanoramaData = function(t) {
                this.targetPointCloudData = t.pointCloudData, this.targetCorrectModelMatrix = r.create(), r.rotateY(this.targetCorrectModelMatrix, this.targetCorrectModelMatrix, a.degToRad(-t.heading)), r.rotateX(this.targetCorrectModelMatrix, this.targetCorrectModelMatrix, a.degToRad(t.pitch)), r.rotateZ(this.targetCorrectModelMatrix, this.targetCorrectModelMatrix, a.degToRad(-t.roll))
            }, this.updateTargetModelMoveFactor = function(t) {
                this.targetModelMoveFactor = t > l ? l / t : 1
            }
        };
    return d
});;
define("pano:widget/module/PanoModule/WebglRender/animation/pointCloud/PointCloudGeometry.js", function() {
    var e = window.Four,
        t = e.geometry.Geometry,
        r = e.geometry.Triangle,
        o = e.CursorPicker,
        i = e.GLMatrix,
        n = i.vec3,
        s = function(e, i, s, a, u) {
            t.call(this);
            var p, h, l, d, f, c, v, y, g, w = 200,
                m = 30,
                P = 30,
                x = s / m,
                B = a / P,
                T = [],
                A = [];
            for (p = 0; P >= p; p++)
                for (d = p * B, h = 0; m >= h; h++) l = h * x, f = o.viewportToWorld(e, [l, d], s, a, 100), n.normalize(f, f), c = o.viewportToTexture(e, [l, d], s, a, u), v = i.getPlaneBySpherePosition(c), y = void 0 !== v ? v.depth / n.dot(f, v.normal) : w, 0 === y ? y = w : 0 > y && (y = -y), g = [f[0] * y, f[1] * y, f[2] * y], this.vertices.push(g), A.push(g[0], g[1], g[2]), T.push(h / m, 1 - p / P);
            this.verticesBufferData = new Float32Array(A), this.uvtsBufferData = new Float32Array(T);
            var C, D, F, G, U = [];
            for (p = 0; P > p; p++)
                for (h = 0; m > h; h++) C = p * (m + 1) + h + 1, D = p * (m + 1) + h, F = (p + 1) * (m + 1) + h, G = (p + 1) * (m + 1) + h + 1, this.triangles.push(new r([D, F, G])), this.triangleVertexUvs.push([T[2 * D], T[2 * D + 1], T[2 * F], T[2 * F + 1], T[2 * G], T[2 * G + 1]]), U.push(D, F, G), this.triangles.push(new r([D, G, C])), this.triangleVertexUvs.push([T[2 * D], T[2 * D + 1], T[2 * G], T[2 * G + 1], T[2 * C], T[2 * C + 1]]), U.push(D, G, C);
            this.indicesBufferData = new Uint16Array(U)
        };
    return s.prototype = Object.create(t.prototype), s.prototype.constructor = s, s
});;
define("pano:widget/module/PanoModule/WebglRender/animation/pointCloud/PointCloudModel.js", function(e) {
    var t = e("pano:widget/module/PanoModule/WebglRender/component/ThreeDDisplayObject.js"),
        o = e("pano:widget/module/PanoModule/WebglRender/animation/pointCloud/PointCloudGeometry.js"),
        i = e("pano:widget/module/PanoModule/WebglRender/core/ShaderSet.js"),
        r = e("pano:widget/module/PanoModule/WebglRender/config/ConfigurationOptions.js"),
        a = window.Four,
        n = a.material.Material,
        s = (a.Texture, a.Mesh),
        d = a.GLMatrix.vec3,
        u = a.Log,
        l = function(e, a, u) {
            t.call(this);
            var l = !0 === u ? a.sourcePointCloudData : a.targetPointCloudData,
                p = !0 === u ? a.sourceModelMoveFactor : a.targetModelMoveFactor,
                h = !0 === u ? a.sourceSnapshot : a.targetSnapshot,
                m = !0 === u ? a.sourceCorrectModelMatrix : a.targetCorrectModelMatrix,
                c = a.viewportWidth,
                g = a.viewportHeight,
                v = new o(e, l, c, g, m),
                f = new n;
            f.depthTest = !1, f.uniforms = {
                uSampler: {
                    type: "t",
                    value: h
                },
                uOpacity: {
                    type: "1f",
                    value: 1
                }
            }, f.vertexShader = i.uvProjVertexShader, f.fragmentShader = i.textureProjFragmentShader, !0 === r.debug.shader && (f.uniforms.showDebugLine = {
                type: "1i",
                value: !0
            }, f.uniforms.vColor = {
                type: "4f",
                value: !0 === u ? [0, 0, 1, .5] : [1, 0, 0, .5]
            }, f.fragmentShader = i.textureProjFragmentShaderDebug), this.mesh = new s(v, f);
            var M = 1;
            Object.defineProperties(this, {
                opacity: {
                    get: function() {
                        return M
                    },
                    set: function(e) {
                        M !== e && (M = e, f.uniforms.uOpacity.value = M, f.needsUpdate = !0)
                    }
                },
                position: {
                    get: function() {
                        return this.mesh.position
                    },
                    set: function(e) {
                        this.mesh.position = d.scale(this.mesh.position, e, p), this.mesh.needsUpdate = !0
                    }
                }
            })
        };
    return l.prototype = Object.create(t.prototype), l.prototype.constructor = l, l.prototype.setVisible = function(e) {
        this.visible !== e && (this.visible = e, this.mesh.visible = e)
    }, l.prototype.dispose = function() {
        if (void 0 !== this.mesh) {
            var e = this.mesh.material;
            if (void 0 !== e) {
                u.log("[PointCloudModel] FN:dispose:  deallocate material with id " + e.id);
                var t = e.uniforms.uSampler.value;
                void 0 !== t && (t.dispose(), delete e.uniforms.uSampler.value), e.dispose(), delete e.uniforms, delete this.mesh.material
            }
            var o = this.mesh.geometry;
            void 0 !== o && (o.dispose(), delete this.mesh.geometry), delete this.mesh
        }
    }, l
});;
define("pano:widget/module/PanoModule/WebglRender/animation/pointCloud/PointCloudFrameRenderer.js", function(e) {
    var t = e("pano:widget/module/PanoModule/WebglRender/core/ShaderSet.js"),
        r = window.Four,
        i = r.geometry.PlaneGeometry,
        o = r.WebGLRenderTarget,
        a = r.material.Material,
        u = (r.Texture, r.Config),
        s = r.Mesh,
        n = r.Scene,
        l = r.camera.OrthographicCamera,
        h = r.GLMatrix.vec3,
        c = r.Log,
        d = function(e, r) {
            function d(e) {
                void 0 !== e && (c.log("[PointCloudFrameRenderer] FN:dispose:  deallocate material with id " + e.id), e.dispose(), delete e.uniforms)
            }
            var m = new i(e, r, 1, 1, u.ZeroAxisZ, {
                showBorder: !1,
                borderWidth: 1,
                borderColor: [1, 1, 1, .8]
            });
            this.curRT = new o(e, r), this.nextRT = new o(e, r), this.tempRTV = new o(e, r), this.gaussianHRT = new o(e, r);
            var v = t.uvProjVertexShader;
            this.materialK = new a, this.materialK.depthTest = !1, this.materialK.uniforms = {
                tDiffuse1: {
                    type: "t",
                    value: this.curRT
                },
                tDiffuse2: {
                    type: "t",
                    value: this.nextRT
                },
                blendFactor: {
                    type: "1f",
                    value: .5
                }
            }, this.materialK.vertexShader = v, this.materialK.fragmentShader = ["varying vec3 vTextureCoord;", "uniform sampler2D tDiffuse1;", "uniform sampler2D tDiffuse2;", "uniform float blendFactor;", "void main() {", "    vec4 color0 = texture2DProj(tDiffuse1, vTextureCoord);", "    vec4 color1 = texture2DProj(tDiffuse2, vTextureCoord);", "    const float epsilon = 0.05;", "    vec4 color;", "    if (color0.a < epsilon && color1.a < epsilon) {", "        color = vec4(0, 0, 0, 0);", "    } else if (color0.a < epsilon && color1.a >= epsilon) {", "        color = color1;", "    } else if (color0.a >= epsilon && color1.a < epsilon) {", "        color = color0;", "    } else {", "        color = (color0*blendFactor + color1*(1.0-blendFactor));", "    }", "    gl_FragColor = color;", "}"].join("\n"), this.materialG = new a, this.materialG.depthTest = !1, this.materialG.uniforms = {
                uReduceTex: {
                    type: "t",
                    value: null
                },
                uReduceDx: {
                    type: "1f",
                    value: 0
                },
                uReduceDy: {
                    type: "1f",
                    value: 0
                }
            }, this.materialG.vertexShader = v, this.materialG.fragmentShader = ["varying vec3 vTextureCoord;", "uniform sampler2D uReduceTex;", "uniform float uReduceDx;", "uniform float uReduceDy;", "void main (void) {", "    vec4 color0 = texture2DProj(uReduceTex, vTextureCoord + vec3(-uReduceDx,  -uReduceDy, 0.0));", "    vec4 color1 = texture2DProj(uReduceTex, vTextureCoord + vec3( uReduceDx,  -uReduceDy, 0.0));", "    vec4 color2 = texture2DProj(uReduceTex, vTextureCoord + vec3(-uReduceDx,   uReduceDy, 0.0));", "    vec4 color3 = texture2DProj(uReduceTex, vTextureCoord + vec3( uReduceDx,   uReduceDy, 0.0));", "    gl_FragColor=0.25*(color0 + color1 + color2 + color3);", "}"].join("\n"), this.materialJ = new a, this.materialJ.depthTest = !1, this.materialJ.uniforms = {
                uExpandTex0: {
                    type: "t",
                    value: null
                },
                uExpandTex1: {
                    type: "t",
                    value: null
                }
            }, this.materialJ.vertexShader = v, this.materialJ.fragmentShader = ["varying vec3 vTextureCoord;", "uniform sampler2D uExpandTex0;", "uniform sampler2D uExpandTex1;", "void main (void) {", "    vec4 up = texture2DProj(uExpandTex0, vTextureCoord);", "    if (up.a > 0.0) {", "        up /= up.a;", "    }", "    vec4 orig = texture2DProj(uExpandTex1, vTextureCoord);", "    if (orig.a > 0.0) {", "        orig.rgb /= orig.a;", "    }", "    gl_FragColor = vec4(up.rgb*(1.0-orig.a) + orig.rgb*orig.a, 1);", "}"].join("\n"), this.materialM = new a, this.materialM.depthTest = !1, this.materialM.uniforms = {
                tDiffuse: {
                    type: "t",
                    value: this.curRT
                }
            }, this.materialM.vertexShader = v, this.materialM.fragmentShader = ["varying vec3 vTextureCoord;", "uniform sampler2D tDiffuse;", "void main() {", "    gl_FragColor =  texture2DProj(tDiffuse, vTextureCoord);", "}"].join("\n"), this.materialGV1 = new a, this.materialGV1.depthTest = !1, this.materialGV1.uniforms = {
                tDiffuse: {
                    type: "t",
                    value: this.tempRTV
                },
                uHeight: {
                    type: "1f",
                    value: r
                }
            }, this.materialGV1.vertexShader = v, this.materialGV1.fragmentShader = ["varying vec3 vTextureCoord;", "uniform sampler2D tDiffuse;", "uniform float uHeight;", "void main (void) {", "    float yUnit = 1.0 / uHeight;", "    vec4 tc = texture2DProj(tDiffuse, vTextureCoord) * 0.2270270270;", "    tc += texture2DProj(tDiffuse, vTextureCoord + vec3(0.0, 1.3846153846 * yUnit, 0.0)) * 0.3162162162;", "    tc += texture2DProj(tDiffuse, vTextureCoord - vec3(0.0, 1.3846153846 * yUnit, 0.0)) * 0.3162162162;", "    tc += texture2DProj(tDiffuse, vTextureCoord + vec3(0.0, 3.2307692308 * yUnit, 0.0)) * 0.0702702703;", "    tc += texture2DProj(tDiffuse, vTextureCoord - vec3(0.0, 3.2307692308 * yUnit, 0.0)) * 0.0702702703;", "    gl_FragColor = tc;", "}"].join("\n"), this.materialGH1 = new a, this.materialGH1.depthTest = !1, this.materialGH1.uniforms = {
                tDiffuse: {
                    type: "t",
                    value: this.gaussianHRT
                },
                uWidth: {
                    type: "1f",
                    value: e
                }
            }, this.materialGH1.vertexShader = v, this.materialGH1.fragmentShader = ["varying vec3 vTextureCoord;", "uniform sampler2D tDiffuse;", "uniform float uWidth;", "void main (void) {", "    float xUnit = 1.0 / uWidth;", "    vec4 tc = texture2DProj(tDiffuse, vTextureCoord) * 0.2270270270;", "    tc += texture2DProj(tDiffuse, vTextureCoord + vec3(1.3846153846 * xUnit, 0.0, 0.0)) * 0.3162162162;", "    tc += texture2DProj(tDiffuse, vTextureCoord - vec3(1.3846153846 * xUnit, 0.0, 0.0)) * 0.3162162162;", "    tc += texture2DProj(tDiffuse, vTextureCoord + vec3(3.2307692308 * xUnit, 0.0, 0.0)) * 0.0702702703;", "    tc += texture2DProj(tDiffuse, vTextureCoord - vec3(3.2307692308 * xUnit, 0.0, 0.0)) * 0.0702702703;", "    gl_FragColor = tc;", "}"].join(""), this.materialGV5 = new a, this.materialGV5.depthTest = !1, this.materialGV5.uniforms = {
                uSampler: {
                    type: "t",
                    value: this.tempRTV
                },
                uHeight: {
                    type: "1f",
                    value: r
                }
            }, this.materialGV5.vertexShader = v, this.materialGV5.fragmentShader = ["varying vec3 vTextureCoord;", "uniform sampler2D uSampler;", "uniform float uHeight;", "void main (void) {", "    float yUnit = 1.0 / uHeight;", "    vec4 tc = texture2DProj(uSampler, vTextureCoord) * 0.100590;", "    tc += texture2DProj(uSampler, vTextureCoord + vec3(0.0, 1.476580 * yUnit, 0.0)) * 0.186265;", "    tc += texture2DProj(uSampler, vTextureCoord - vec3(0.0, 1.476580 * yUnit, 0.0)) * 0.186265;", "    tc += texture2DProj(uSampler, vTextureCoord + vec3(0.0, 3.445529 * yUnit, 0.0)) * 0.136940;", "    tc += texture2DProj(uSampler, vTextureCoord - vec3(0.0, 3.445529 * yUnit, 0.0)) * 0.136940;", "    tc += texture2DProj(uSampler, vTextureCoord + vec3(0.0, 5.414899 * yUnit, 0.0)) * 0.078710;", "    tc += texture2DProj(uSampler, vTextureCoord - vec3(0.0, 5.414899 * yUnit, 0.0)) * 0.078710;", "    tc += texture2DProj(uSampler, vTextureCoord + vec3(0.0, 7.384912 * yUnit, 0.0)) * 0.035367;", "    tc += texture2DProj(uSampler, vTextureCoord - vec3(0.0, 7.384912 * yUnit, 0.0)) * 0.035367;", "    tc += texture2DProj(uSampler, vTextureCoord + vec3(0.0, 9.355775 * yUnit, 0.0)) * 0.012422;", "    tc += texture2DProj(uSampler, vTextureCoord - vec3(0.0, 9.355775 * yUnit, 0.0)) * 0.012422;", "    gl_FragColor = tc;", "}"].join("\n"), this.materialGH5 = new a, this.materialGH5.depthTest = !1, this.materialGH5.uniforms = {
                uSampler: {
                    type: "t",
                    value: this.gaussianHRT
                },
                uWidth: {
                    type: "1f",
                    value: e
                }
            }, this.materialGH5.vertexShader = v, this.materialGH5.fragmentShader = ["varying vec3 vTextureCoord;", "uniform sampler2D uSampler;", "uniform float uWidth;", "void main (void) {", "    float xUnit = 1.0 / uWidth;", "    vec4 tc = texture2DProj(uSampler, vTextureCoord) * 0.100590;", "    tc += texture2DProj(uSampler, vTextureCoord + vec3(1.476580 * xUnit, 0.0, 0.0)) * 0.186265;", "    tc += texture2DProj(uSampler, vTextureCoord - vec3(1.476580 * xUnit, 0.0, 0.0)) * 0.186265;", "    tc += texture2DProj(uSampler, vTextureCoord + vec3(3.445529 * xUnit, 0.0, 0.0)) * 0.136940;", "    tc += texture2DProj(uSampler, vTextureCoord - vec3(3.445529 * xUnit, 0.0, 0.0)) * 0.136940;", "    tc += texture2DProj(uSampler, vTextureCoord + vec3(5.414899 * xUnit, 0.0, 0.0)) * 0.078710;", "    tc += texture2DProj(uSampler, vTextureCoord - vec3(5.414899 * xUnit, 0.0, 0.0)) * 0.078710;", "    tc += texture2DProj(uSampler, vTextureCoord + vec3(7.384912 * xUnit, 0.0, 0.0)) * 0.035367;", "    tc += texture2DProj(uSampler, vTextureCoord - vec3(7.384912 * xUnit, 0.0, 0.0)) * 0.035367;", "    tc += texture2DProj(uSampler, vTextureCoord + vec3(9.355775 * xUnit, 0.0, 0.0)) * 0.012422;", "    tc += texture2DProj(uSampler, vTextureCoord - vec3(9.355775 * xUnit, 0.0, 0.0)) * 0.012422;", "    gl_FragColor = tc;", "}"].join("\n"), this.mesh = new s(m, this.materialK), this.mesh.position = h.fromValues(0, 0, -1e3);
            var x = e / 2,
                f = r / 2;
            this.camera = new l(-x, x, f, -f, 0, 11e3);
            var p = new n;
            p.addChild(this.mesh);
            for (var T = [], D = e, g = r; D >= 3 && g >= 3;) D = Math.ceil((D + 1) / 2), g = Math.ceil((g + 1) / 2), T.push([D, g]);
            for (var C, S, j = T.length + 1, y = [], P = [], R = 0; j > R; R++) C = new o(e, r), y.push(C), S = new o(e, r), P.push(S);
            var G = 1;
            this.setSourceMesh = function(e) {
                this.sourceMesh = e, this.sourceScene = new n, this.sourceScene.addChild(e)
            }, this.setTargetMesh = function(e) {
                this.targetMesh = e, this.targetScene = new n, this.targetScene.addChild(e)
            }, this.getScene = function() {
                return p
            }, this.getCamera = function() {
                return this.camera
            }, this.render = function(e, t, r) {
                e.setClearColor(1, 1, 1, 0), void 0 !== this.targetScene ? (e.render(this.sourceScene, t, this.curRT, !1), e.render(this.targetScene, t, this.nextRT, !1), G = 1 - r) : (e.render(this.sourceScene, t, this.curRT, !1), G = 1), this.mesh.material = this.materialK, this.mesh.materialChanged = !0, this.materialK.uniforms.blendFactor.value = G, this.mesh.visible = !0, e.render(p, this.camera, this.tempRTV, !1), this.mesh.material = this.materialGV1, this.mesh.materialChanged = !0, e.render(p, this.camera, this.gaussianHRT, !1), this.mesh.material = this.materialGH1, this.mesh.materialChanged = !0, e.render(p, this.camera, void 0, !1)
            }, this.dispose = function() {
                if (this.sourceScene && this.sourceMesh && (this.sourceScene.removeChild(this.sourceMesh), delete this.sourceMesh, delete this.sourceScene), this.targetScene && this.targetMesh && (this.targetScene.removeChild(this.targetMesh), delete this.sourceMesh, delete this.sourceScene), void 0 !== this.mesh) {
                    p.removeChild(this.mesh);
                    var e = this.mesh.geometry;
                    void 0 !== e && (e.dispose(), delete this.mesh.geometry), delete this.mesh
                }
                d(this.materialK), d(this.materialG), d(this.materialJ), d(this.materialM), d(this.materialGV1), d(this.materialGH1), d(this.materialGV5), d(this.materialGH5), this.curRT.dispose(), this.nextRT.dispose(), this.tempRTV.dispose(), this.gaussianHRT.dispose();
                for (var t = y.length - 1; t >= 0; t--) y[t].dispose(), P[t].dispose()
            };
            var U = 1;
            Object.defineProperties(this, {
                opacity: {
                    get: function() {
                        return U
                    },
                    set: function(e) {
                        U !== e && (U = e, this.mesh.material.uniforms.uOpacity.value = U, this.mesh.material.needsUpdate = !0)
                    }
                },
                position: {
                    get: function() {
                        return this.mesh.position
                    },
                    set: function(e) {
                        this.mesh.position = h.scale(this.mesh.position, e, moveFactor), this.mesh.needsUpdate = !0
                    }
                }
            })
        };
    return d
});;
define("pano:widget/module/PanoModule/WebglRender/animation/PointCloudAnimation.js", function(e) {
    var t = e("pano:widget/module/PanoModule/WebglRender/animation/Animation.js"),
        o = e("pano:widget/module/PanoModule/WebglRender/animation/pointCloud/PointCloudParameters.js"),
        i = e("pano:widget/module/PanoModule/WebglRender/animation/pointCloud/PointCloudModel.js"),
        a = e("pano:widget/module/PanoModule/WebglRender/animation/pointCloud/PointCloudFrameRenderer.js"),
        n = e("pano:widget/module/PanoModule/WebglRender/animation/tween/Tween.js"),
        r = e("pano:widget/module/PanoModule/WebglRender/animation/tween/TweenFunction.js"),
        s = window.Four,
        d = (s.GLMatrix.vec3, function(e, s, d, u, l, h, m, p) {
            t.call(this);
            var c = s.clientWidth,
                g = s.clientHeight;
            this.pointCloudParam = new o(u, l, h, p, m), this.pointCloudParam.sourceSnapshot = d, this.pointCloudParam.updateViewport(c, g), this.sourceModel = new i(this.pointCloudParam.sourceCamera, this.pointCloudParam, !0);
            var h = this.pointCloudParam.targetPosition;
            h = [-h[0], -h[1], -h[2]], this.tween = new n(this.sourceModel, this.pointCloudParam.animationDuration, {
                position: h
            }, r.easeInOutCubic, this.startCallback, this.endCallback), this.cameraTween = new n(e, this.pointCloudParam.animationDuration, {
                heading: this.pointCloudParam.targetHeading,
                pitch: this.pointCloudParam.targetPitch
            }, r.easeInOutCubic), this.executedTime = 0, this.frameRenderer = new a(c, g), this.frameRenderer.setSourceMesh(this.sourceModel.getMesh())
        });
    d.prototype = Object.create(t.prototype), d.prototype.constructor = d;
    var u = d.prototype;
    return u.execute = function(e) {
        if (this.tween && !0 !== this.tween.getIsCompleted() && (this.tween.execute(e), this.executedTime += e, this.targetModel)) {
            var t = this.sourceModel.position,
                o = this.pointCloudParam.targetPosition,
                i = this.pointCloudParam.sourceModelMoveFactor,
                a = [o[0] + t[0] / i, t[1], o[2] + t[2] / i],
                n = Math.sqrt(a[0] * a[0] + a[2] * a[2]);
            this.pointCloudParam.updateTargetModelMoveFactor(n);
            var r = this.pointCloudParam.targetModelMoveFactor;
            this.targetModel.position = [a[0] * r, a[1], a[2] * r]
        }
        this.cameraTween && !0 !== this.cameraTween.getIsCompleted() && this.cameraTween.execute(e)
    }, u.updateTargetSnapshot = function(e, t) {
        if (void 0 !== t && !0 === t.hasGroupPointCloud()) {
            this.pointCloudParam.targetSnapshot = e, this.pointCloudParam.updateTargetPanoramaData(t);
            var o = this.sourceModel.position,
                a = this.pointCloudParam.targetPosition,
                n = this.pointCloudParam.sourceModelMoveFactor,
                r = [a[0] + o[0] / n, o[1], a[2] + o[2] / n],
                s = Math.sqrt(r[0] * r[0] + r[2] * r[2]);
            this.pointCloudParam.updateTargetModelMoveFactor(s), this.targetModel = new i(this.pointCloudParam.targetCamera, this.pointCloudParam, !1), this.targetModel.position = r, this.frameRenderer.setTargetMesh(this.targetModel.getMesh())
        }
    }, u.render = function(e, t) {
        var o = this.executedTime / this.pointCloudParam.animationDuration;
        this.frameRenderer.render(e, t, o)
    }, u.getFadeTarget = function() {
        return this.targetModel ? (this.sourceModel.setVisible(!1), this.targetModel) : this.sourceModel
    }, u.getFadeScene = function() {
        return this.frameRenderer.getScene()
    }, u.getFadeCamera = function() {
        return this.frameRenderer.getCamera()
    }, u.getTargetCamera = function() {
        return this.pointCloudParam.targetCamera
    }, u.getTargetFovRatio = function() {
        return this.pointCloudParam.targetCameraFovRatio
    }, u.getIsAnimating = function() {
        return this.tween ? this.tween.getIsAnimating() : !1
    }, u.kill = function() {
        this.tween && this.tween.kill(), this.cameraTween && this.cameraTween.kill()
    }, u.dispose = function() {
        t.prototype.dispose.call(this), void 0 !== this.frameRenderer && (this.frameRenderer.dispose(), delete this.frameRenderer), void 0 !== this.sourceModel && (this.sourceModel.dispose(), delete this.sourceModel), void 0 !== this.targetModel && (this.targetModel.dispose(), delete this.targetModel)
    }, d
});;
define("pano:widget/module/PanoModule/WebglRender/animation/CommonAnimation.js", function(e) {
    var n = e("pano:widget/module/PanoModule/WebglRender/animation/Animation.js"),
        o = e("pano:widget/module/PanoModule/WebglRender/animation/tween/Tween.js"),
        t = e("pano:widget/module/PanoModule/WebglRender/animation/tween/TweenFunction.js"),
        a = function(e, a, i, d, l) {
            n.call(this);
            var d = void 0 !== d ? d : 600,
                l = void 0 !== l ? l : t.linear;
            this.target = e;
            var r = {};
            r[a] = i, this.tween = new o(e, d, r, l, this.startCallback, this.endCallback)
        };
    return a.prototype = Object.create(n.prototype), a.prototype.constructor = a, a
});;
define("pano:widget/module/PanoModule/WebglRender/animation/fade/FadeModel.js", function(e) {
    var t = e("pano:widget/module/PanoModule/WebglRender/component/ThreeDDisplayObject.js"),
        o = e("pano:widget/module/PanoModule/WebglRender/core/ShaderSet.js"),
        r = window.Four,
        i = r.geometry.PlaneGeometry,
        a = r.material.Material,
        s = r.Mesh,
        n = (r.Texture, r.camera.OrthographicCamera),
        d = r.Config,
        h = r.GLMatrix.vec3,
        u = window.Four.Log,
        l = function(e, r, u) {
            t.call(this);
            var l = new i(e, r, 1, 1, d.ZeroAxisZ, {
                    showBorder: !1,
                    borderWidth: 1,
                    borderColor: [1, 1, 1, .8]
                }),
                m = new a;
            m.depthTest = !1, m.uniforms = {
                uSampler: {
                    type: "t",
                    value: u
                },
                uOpacity: {
                    type: "1f",
                    value: 1
                }
            }, m.vertexShader = o.uvVertexShader, m.fragmentShader = o.textureFragmentShader, this.mesh = new s(l, m), this.mesh.position = h.fromValues(0, 0, -1e3);
            var p = e / 2,
                c = r / 2;
            this.camera = new n(-p, p, c, -c, 0, 11e3);
            var f = 1;
            Object.defineProperties(this, {
                opacity: {
                    get: function() {
                        return f
                    },
                    set: function(e) {
                        f !== e && (f = e, m.uniforms.uOpacity.value = f)
                    }
                }
            })
        };
    return l.prototype = Object.create(t.prototype), l.prototype.constructor = l, l.prototype.resize = function(e, t) {
        this.viewportWidth = e, this.viewportHeight = t
    }, l.prototype.setSnapshot = function(e) {
        this.mesh.material.uniforms.uSampler.value = e
    }, l.prototype.getMesh = function() {
        return this.mesh
    }, l.prototype.dispose = function() {
        if (void 0 !== this.mesh) {
            var e = this.mesh.material;
            if (void 0 !== e) {
                u.log("[FadeModel] FN:dispose:  deallocate material with id " + e.id);
                var t = e.uniforms.uSampler.value;
                void 0 !== t && (t.dispose(), delete e.uniforms.uSampler.value), e.dispose(), delete e.uniforms, delete this.mesh.material
            }
            var o = this.mesh.geometry;
            void 0 !== o && (o.dispose(), delete this.mesh.geometry), delete this.mesh
        }
    }, l
});;
define("pano:widget/module/PanoModule/WebglRender/component/MarkerContainer.js", function(e) {
    var r = e("pano:widget/module/PanoModule/WebglRender/markerStrategy/MarkerOverlapStrategy.js"),
        t = e("pano:widget/module/PanoModule/WebglRender/config/ConfigurationOptions.js"),
        a = e("pano:widget/module/PanoModule/WebglRender/event/EventType.js"),
        o = e("pano:widget/module/PanoModule/WebglRender/widget/marker/Marker.js"),
        n = window.Four,
        s = n.EventDispatcher,
        d = n.CursorPicker,
        u = n.Log,
        l = function(e) {
            function n() {
                for (var e = b.length, r = 0; e > r; r++) p(b[r]);
                var t = c();
                0 < t.length && D.removeMarkers(t);
                for (var a, r = 0, i = P.length; i > r; r++) a = P[r], 0 > l(a.markerId) && h(P[r]);
                if (P = [], M.getPanoId()) {
                    var o = s(w);
                    M.updateMarkers(o)
                }
                D.updateMarkersPosition()
            }

            function s(e) {
                for (var r, t = [], a = e.length - 1; a >= 0; a--) r = e[a].getMarkerData().type, 4 !== r && 5 !== r && 6 !== r && 7 !== r && t.push(e[a]);
                return t
            }

            function l(e) {
                for (var r = w.length - 1; r >= 0; r--)
                    if (e === w[r].getMarkerData().markerId) return r;
                return -1
            }

            function p(e) {
                if (void 0 !== e) {
                    var r = e.markerId;
                    if (r) {
                        var a = t.marker,
                            i = [a.startend, a.route, a.poi, a.classified, a.custom, a.operational, a.tag, a.commercialize],
                            o = -1,
                            n = e.poiuid || "",
                            s = e.pid,
                            d = e.catalog || "",
                            u = d.substr(0, 2),
                            l = d.substr(0, 6),
                            p = e.name;
                        switch (u) {
                            case "FF":
                                o = 0;
                                break;
                            case "FD":
                                o = 4;
                                break;
                            case "FE":
                                o = 3;
                                break;
                            case "FC":
                                o = 5;
                                break;
                            case "FB":
                                o = 6;
                                break;
                            case "FA":
                                o = 7;
                                break;
                            default:
                                o = -1
                        }
                        if (0 > o)
                            if (n) o = 2;
                            else if ("010A05" === l) {
                            if (!s) return;
                            o = 1, p += "-公交站"
                        } else if ("010A03" === l) {
                            if (!s) return;
                            o = 1, p += "-地铁站"
                        }
                        if (!(0 > o) && i[o]) {
                            var c = !1;
                            s === E.panoId && (c = !0);
                            var h = E.panoX,
                                v = E.panoY,
                                k = e.x,
                                g = e.y;
                            m = Math.sqrt((h - k) * (h - k) + (v - g) * (v - g));
                            var m = Math.floor(m),
                                M = e.rank;
                            4 !== o && 5 !== o && 6 !== o && 7 != o && (M = f(e.rank, m));
                            var y = {
                                markerId: r,
                                uid: n,
                                panoId: s,
                                iid: e.panoIId,
                                catalog: d,
                                type: o,
                                title: p,
                                rank: M / 100,
                                heading: e.heading ? 360 - e.heading : 0,
                                pitch: e.pitch ? -e.pitch : 0,
                                mercatorX: e.x,
                                mercatorY: e.y,
                                panoX: e.px,
                                panoY: e.py,
                                isInBestPano: c,
                                isUserSelect: 2 === o || 0 === o,
                                isModified: 1 === o,
                                index: e.index,
                                autoHide: !0,
                                imageUrl: e.imageUrl,
                                imageWidth: e.width,
                                imageHeight: e.height,
                                eventKey: e.key,
                                distance: m,
                                isEditable: e.isEditable
                            };
                            P.push(y)
                        }
                    }
                }
            }

            function f(e, r) {
                var t = 10,
                    a = 500,
                    i = 0,
                    o = 300,
                    n = 0;
                return isNaN(e) && (e = 0), 0 > e ? e : (isNaN(r) && (r = 0), n = t > r ? 0 : r > a ? Math.max(e, o) : Math.max(e, i + Math.round((o - i) * (r - t) / (a - t))))
            }

            function c() {
                if (void 0 === P || 0 === P.length) return [];
                for (var e, r = [], t = [], a = 0, i = P.length; i > a; a++) e = P[a], 2 === e.type ? r.push(e) : 3 === e.type && t.push(e);
                var o = [],
                    n = [];
                for (i = w.length, a = 0; i > a; a++) e = w[a].getMarkerData(), 2 === e.type ? o.push(e) : 3 === e.type && n.push(e);
                for (var s, d = r.concat(o), u = t.concat(n), l = [], p = 0, f = d.length; f > p; p++) {
                    s = d[p].uid;
                    for (var c = 0, h = u.length; h > c; c++) e = u[c], s === e.uid && l.push(e.markerId)
                }
                var v;
                for (a = l.length - 1; a >= 0; a--)
                    for (v = l[a], p = P.length - 1; p >= 0; p--) v === P[p].markerId && (P.splice(p, 1), l.splice(a, 1));
                return l
            }

            function h(e) {
                var r = new o(e, g);
                g.appendChild(r.getMarkerUIDomNode()), w.push(r), r.addEventListener(a.MARKER_CLICKED, v), r.addEventListener(a.ENTRANCE_MARKER_CLICKED, v), r.addEventListener(a.TAG_MARKER_SUBMIT, v), r.addEventListener(a.TAG_MARKER_CLOSE, v), r.addEventListener(a.OVERLAY_MOUSECLICK, v), r.addEventListener(a.OVERLAY_MOUSEOVER, v), r.addEventListener(a.OVERLAY_MOUSEOUT, v), r.addEventListener(a.TAG_MARKER_FOCUS, v), r.addEventListener(a.TAG_MARKER_BLUR, v), r.addEventListener(a.TAG_MARKER_CANCEL, v);
                var i = t.markerVisible,
                    n = [i.startEnd, i.route, i.poi, i.classified, i.custom, i.operational, i.tag, i.commercialize];
                !1 === n[e.type] && r.hideMarker()
            }

            function v(e) {
                D.dispatchEvent(e)
            }

            function k() {
                for (var e = w.length - 1; e >= 0; e--) w[e].diffusedSpherePoint = void 0;
                M.updateMarkers([])
            }
            var g = document.createElement("div");
            g.style.cssText = ["z-index:99", "overflow:hidden", "width:100%", "height:100%", "position:absolute", "top:0", "left:0"].join(";"), g.addEventListener("contextmenu", function(e) {
                return e.cancelBubble = !0, e.returnValue = !1, !1
            }), e.appendChild(g);
            var m, M = new r,
                E = {},
                y = void 0,
                b = [],
                w = [],
                P = [],
                C = 200,
                D = this;
            this.addMarkers = function(e) {
                if (void 0 !== e) {
                    if (void 0 === E.panoId) return void(y = e);
                    e = e instanceof Array ? e : [e], b = b.concat(e), n()
                }
            }, this.updateMarkerVisible = function() {
                var e = t.markerVisible,
                    r = [e.startEnd, e.route, e.poi, e.classified, e.custom, e.operational, e.tag, e.commercialize],
                    a = w.length;
                for (i = 0; a > i; i++) marker = w[i], !0 !== r[marker.getMarkerData().type] ? marker.hideMarker() : marker.showMarker()
            }, this.setCursorStyle = function(e) {
                0 == e ? (g.style.cursor = "ActiveXObject" in window ? "url(//webmap0.bdimg.com/wolfman/static/pano/images/webgl/poi_icon_tag_b877e1d.cur), auto" : "url(//webmap0.bdimg.com/wolfman/static/pano/images/webgl/poi_icon_tag_b877e1d.cur) 13 36, auto", this.setMouseStyle(0)) : 1 == e ? (g.style.cursor = "default", this.setMouseStyle(1)) : (g.style.cursor = "default", this.setMouseStyle(2))
            }, this.setMouseStyle = function(e) {
                for (var r = w.length, t = 0; r > t; t++) w[t].setMouseStyle(e)
            }, this.removeMarkers = function(e) {
                if (void 0 !== e)
                    if (e instanceof Array)
                        for (var r, t = e.length, a = 0; t > a; a++) r = e[a], this.removeMarker(r), this.removeMarkerData(r);
                    else this.removeMarker(e), this.removeMarkerData(e)
            }, this.removeMarker = function(e) {
                if (void 0 !== e)
                    for (var r, t = w.length, a = t - 1; a >= 0; a--)
                        if (r = w[a], e === r.getMarkerData().markerId) return w.splice(a, 1), void g.removeChild(r.getMarkerUIDomNode())
            }, this.removeMarkerData = function(e) {
                if (void 0 !== e)
                    for (var r, t = b.length, a = t - 1; a >= 0; a--)
                        if (r = b[a], e === r.markerId) return void b.splice(a, 1)
            }, this.getMarkers = function() {
                return w
            }, this.getMarkerUidInBestPano = function() {
                for (var e, r = w.length - 1; r >= 0; r--)
                    if (e = w[r].getMarkerData(), !0 === e.isInBestPano) return e.uid;
                return ""
            }, this.getMarkerCenterPointByUid = function(e) {
                for (var r, t, a = w.length - 1; a >= 0; a--)
                    if (r = w[a], r.getMarkerData().uid === e) {
                        t = r;
                        break
                    }
                var i;
                if (void 0 === t) return i;
                var o = E.camera,
                    n = E.viewportWidth,
                    s = E.viewportHeight;
                return t.diffusedSpherePoint ? i = d.sphereToViewport(o, t.diffusedSpherePoint, n, s, !0) : (markerData = t.getMarkerData(), mercatorPos = [markerData.mercatorX - panoX, markerData.rank, markerData.mercatorY - panoY], i = d.worldToViewport(o, mercatorPos, n, s, !0)), i
            }, this.resize = function(e, r) {
                E.viewportWidth = e, E.viewportHeight = r, this.updateMarkersPosition()
            }, this.updateMarkersPosition = function() {
                var e, r = E.camera;
                if (r.updateProjectionMatrix(), r.updateWorldMatrix(), void 0 !== r)
                    for (var t, a, i, o = E.viewportWidth, n = E.viewportHeight, s = E.panoX, l = E.panoY, p = 0, f = w.length; f > p; p++) t = w[p], t.diffusedSpherePoint ? (a = t.getMarkerData(), u.log("[MarkerContainer] diffusedSpherePoint(" + a.markerId + "): " + t.diffusedSpherePoint[0] + ", " + t.diffusedSpherePoint[1]), e = d.sphereToViewport(r, t.diffusedSpherePoint, o, n, !1)) : (a = t.getMarkerData(), u.log("[MarkerContainer] Marker(" + a.markerId + "): " + a.mercatorX + ", " + a.rank + ", " + a.mercatorY), u.log("[MarkerContainer] Pano: " + s + ", " + l), i = [a.mercatorX - s, a.rank, -(a.mercatorY - l)], e = d.worldToViewport(r, i, o, n, !1)), e ? (u.log("[MarkerContainer] newPosition: " + e[0] + ", " + e[1]), t.setPosition(e)) : t.setPosition([o + 1e3, n + 1e3])
            }, this.setPanoramaData = function(e) {
                var r = "";
                for (var t in e) r += t + ": " + e[t] + "\n";
                u.log("[MarkerContainer]  " + r), E = e, M.setPanoramaData(e), y && 0 < y.length && (this.addMarkers(y), y = [])
            }, this.removeMarkerPanels = function() {
                for (var e = w.length - 1; e >= 0; e--) g.removeChild(w[e].getMarkerUIDomNode());
                w = []
            }, this.setVisible = function(e) {
                !0 === e ? (g.style.visibility = "visible", n()) : g.style.visibility = "hidden"
            }, this.forceUpdateMarkers = function() {
                k();
                var e = s(w);
                M.updateMarkers(e), D.updateMarkersPosition()
            }, this.delayUpdateMarkers = function() {
                m > 0 && clearTimeout(m);
                var e = this;
                m = setTimeout(function() {
                    k(), M.updateMarkers(w), e.updateMarkersPosition()
                }, C)
            }, this.setMouseEnabled = function(e) {
                for (var r = w.length, t = 0; r > t; t++) w[t].setMouseEnabled(e)
            }
        };
    return l.prototype = {}, l.prototype.constructor = l, s.prototype.apply(l.prototype), l
});;
define("pano:widget/module/PanoModule/WebglRender/component/DebugContainer.js", function(t) {
    var e = t("pano:widget/module/PanoModule/WebglRender/event/EventType.js"),
        n = window.Four,
        i = n.EventDispatcher,
        o = function(t) {
            function n(t) {
                "" !== t && l.dispatchEvent({
                    type: e.CHANGE_PANO_CLICKED,
                    data: {
                        panoId: t
                    }
                })
            }

            function i() {
                return p.value.trim()
            }

            function o() {
                v = !v, l.dispatchEvent({
                    type: e.ROTATE_PANO_CLICKED,
                    data: {
                        isRotated: v
                    }
                })
            }

            function d() {
                var t = i();
                n(t)
            }

            function r() {
                o()
            }
            var u = document.createElement("div");
            u.setAttribute("id", "debug-container"), u.setAttribute("width", "200px"), u.setAttribute("height", "50px"), u.style.cssText = ["z-index:100", "overflow:hidden", "position:absolute", "top:100px", "right:50px"].join(";");
            var a = '<div><input type="text" id="pano-id-input" style="height: 25px; width: 190px"></div><div><button id="search_btn">确定</button><button id="rotate_btn">旋转</button></div>';
            u.innerHTML = a, t.appendChild(u);
            var p = document.getElementById("pano-id-input"),
                c = document.getElementById("search_btn"),
                s = document.getElementById("rotate_btn"),
                l = this,
                v = !1;
            c.addEventListener("click", d), s.addEventListener("click", r), this.updateDebugPanoId = function(t) {
                p.value = t
            }, this.dispose = function() {
                c.removeEventListener("click", d), s.removeEventListener("click", r), t.removeChild(u)
            }, this.setVisible = function(t) {
                var e = document.getElementById("debug-container");
                e && (e.style.display = t ? "block" : "none")
            }
        };
    return o.prototype = {}, o.prototype.constructor = o, i.prototype.apply(o.prototype), o
});;
define("pano:widget/module/PanoModule/WebglRender/component/POILine.js", function() {
    var t = function(t) {
        var i = document.createElement("canvas");
        i.setAttribute("id", "poi-line-canvas"), i.setAttribute("width", "2000px"), i.setAttribute("height", "2000px"), i.style.cssText = ["z-index:100", "overflow:hidden", "position:absolute", "top:0", "left:0"].join(";"), t.appendChild(i);
        var e = document.getElementById("poi-line-canvas"),
            n = e.getContext("2d");
        this.drawPOILine = function() {
            if (e) {
                var t = this.from,
                    i = this.to;
                n.clearRect(0, 0, e.width, e.height), n.strokeStyle = this.lineColor, n.fillStyle = this.lineColor, n.globalAlpha = this.lineOpacity, n.beginPath(), n.moveTo(t[0], t[1]), n.lineWidth = 2, n.lineTo(i[0], i[1]), n.closePath(), n.stroke(), n.beginPath(), n.arc(i[0], i[1], 4, 0, 2 * Math.PI, !0), n.closePath(), n.fill()
            }
        }, this.clearPOILine = function() {
            n.clearRect(0, 0, e.width, e.height), i.style.display = "none"
        };
        var s = 0,
            o = 0;
        this.setPOILine = function(t, e) {
            this.from = t || [], this.to = e || [], this.lineColor = "#33AAFF", this.lineOpacity = 1, this.circleVisible = !1, s = e[0] - t[0], o = e[1] - t[1], i.style.display = "block"
        };
        var l = 0,
            h = 1;
        Object.defineProperties(this, {
            percent: {
                get: function() {
                    return l
                },
                set: function(t) {
                    l = t, l >= 1 && (this.circleVisible = !0), this.to[0] = this.from[0] + s * l, this.to[1] = this.from[1] + o * l, this.drawPOILine()
                }
            },
            opacity: {
                get: function() {
                    return h
                },
                set: function(t) {
                    h != t && (h = t, this.lineOpacity = t, this.drawPOILine())
                }
            }
        }), this.updateLine = function(t, i) {
            this.from = t || [], this.to = i || [], this.lineColor = "#33AAFF", this.lineOpacity = 1, this.circleVisible = !1, s = i[0] - t[0], o = i[1] - t[1], this.percent = 0, this.opacity = 1
        }, this.setVisible = function(t) {
            this.visible !== t && (this.visible = t, i && (i.style.display = !0 === this.visible ? "block" : "none"))
        }
    };
    return t.prototype = {}, t.prototype.constructor = t, t
});;
define("pano:widget/module/PanoModule/WebglRender/component/ThreeDDisplayObject.js", function() {
    var t = Four.GLMatrix.vec3,
        e = function() {
            this.position = t.create(), this.rotateX = 0, this.rotateY = 0, this.rotateZ = 0, this.visible = !0
        };
    return e.prototype = {
        constructor: e,
        getMesh: function() {
            return this.mesh
        },
        setVisible: function(t) {
            this.visible !== t && (this.visible = t)
        },
        getVisible: function() {
            return this.visible
        },
        setPosition: function(e, i, o) {
            this.position = t.fromValues(e, i, o)
        },
        rotateX: function(t) {
            this.rotateX = t
        },
        rotateY: function(t) {
            this.rotateY = t
        },
        rotateZ: function(t) {
            this.rotateZ = t
        }
    }, Four.EventDispatcher.prototype.apply(e.prototype), e
});;
define("pano:widget/module/PanoModule/WebglRender/component/PanoramaSphere.js", function(e) {
    function t(e) {
        for (var t, i = e.geometry, s = i.triangles, h = new Uint16Array(3 * s.length), a = 0, r = 0, l = s.length; l > r; r++) t = s[r], t.mesh = e, h[a] = t.index1, h[a + 1] = t.index2, h[a + 2] = t.index3, a += 3;
        i.indicesBufferData = h, i.groupsNeedUpdate = !0
    }

    function i(e, i, h, a, r, l, n, o) {
        for (var m, u, g, d, v, p, c = n / r, f = o / l, S = 2 * n, M = [], y = 0, b = {}, w = 0; f > w; w++) {
            u = w + a * f;
            for (var E = 0; c > E; E++) m = E + h * c, g = u * S + 2 * m, d = e[g], v = e[g + 1], p = d.mesh, b[p.id] = p, d.mesh = i, v.mesh = i, M[y] = d, M[y + 1] = v, y += 2
        }
        i.geometry.triangles = M, i.useTime = M.length, t(i), s(i, b)
    }

    function s(e, i) {
        var s;
        for (var a in i) s = i[a], s.level > e.level ? (s.geometry.triangles = [], s.useTime = 0) : (h(s), t(s))
    }

    function h(e) {
        for (var t, i = e.geometry, s = i.triangles, h = s.length - 1; h >= 0; h--) t = s[h], t.mesh.id !== e.id && (s.splice(h, 1), e.useTime--)
    }

    function a(e) {
        if (void 0 !== e) {
            var t = e.material;
            if (void 0 !== t) {
                S.log("[PanoramaSphere] FN:dispose:  deallocate material with id " + t.id);
                var i = t.uniforms.uSampler.value;
                void 0 !== i && (i.dispose(), delete t.uniforms.uSampler.value), t.dispose(), delete t.uniforms, t = void 0
            }
            var s = e.geometry;
            void 0 !== s && s.dispose(), delete e.material, delete e.geometry, e = void 0
        }
    }
    var r = e("pano:widget/module/PanoModule/WebglRender/component/ThreeDDisplayObject.js"),
        l = e("pano:widget/module/PanoModule/WebglRender/config/ConstantConfig.js"),
        n = e("pano:widget/module/PanoModule/WebglRender/config/ConfigurationOptions.js"),
        o = e("pano:widget/module/PanoModule/WebglRender/core/ShaderSet.js"),
        m = window.Four,
        u = m.GLMatrix.mat4,
        g = m.Mesh,
        d = m.TileMesh,
        v = m.material.Material,
        p = m.Texture,
        c = m.geometry.TileSphereGeometry,
        f = m.geometry.Geometry,
        S = m.Log,
        M = function(e) {
            r.call(this), this.curLevel = 1, this.tileColumns = 1, this.tileRows = 1, this.sphereWidthSegments = l.SPHERE_WIDTH_SEGMENTS, this.sphereHeightSegments = l.SPHERE_HEIGHT_SEGMENTS, this.isBillionPixels = !1, this.mask = void 0, this.geometry = new c(l.SPHERE_RADIUS, this.sphereWidthSegments, this.sphereHeightSegments), this.material = new v, this.material.depthTest = !1, this.material.uniforms = {
                uSampler: {
                    type: "t",
                    value: e
                },
                uCRZ: {
                    type: "3f",
                    value: [0, 0, 1]
                },
                uOpacity: {
                    type: "1f",
                    value: 1
                }
            }, this.material.vertexShader = o.tileVertexShader, this.material.fragmentShader = o.textureFragmentShader, !0 === n.debug.shader && (this.material.uniforms.uSamplerMask = {
                type: "t",
                value: e
            }, this.material.uniforms.showPointCloud = {
                type: "1i",
                value: !1
            }, this.material.uniforms.showDebugLine = {
                type: "1i",
                value: !1
            }, this.material.uniforms.vColor = {
                type: "4f",
                value: [1, 0, 0, 1]
            }, this.material.fragmentShader = o.pointCloudMaskFragmentShaderDebug), this.mesh = new d(this.geometry, this.material), this.curOpacity = 1
        };
    M.prototype = Object.create(r.prototype), M.prototype.constructor = M;
    var y = M.prototype;
    return y.getModelMatrix = function() {
        return this.mesh.updateWorldMatrix(), this.mesh.modelMatrix
    }, y.setMask = function(e) {
        if (this.mask = e, void 0 !== this.material.uniforms.uSamplerMask) {
            var t = new p(e);
            this.material.uniforms.uSamplerMask.value = t, this.material.uniforms.showPointCloud.value = !0
        }
    }, y.getMask = function(e, t, i) {
        if (!this.mask) return void 0;
        var s = this.mask.width,
            h = this.mask.height,
            a = 1,
            r = 1;
        i >= 2 ? (a = Math.pow(2, i - 1), r = Math.pow(2, i - 2)) : (a = 1, r = 1);
        var l = s / a,
            n = h / r,
            o = document.createElement("canvas");
        o.width = l, o.height = n;
        var m = o.getContext("2d");
        m.drawImage(this.mask, l * e, n * t, l, n, 0, 0, l, n);
        var u = new Image(l, n);
        return u.src = o.toDataURL("image/png"), u
    }, y.setThumbnail = function(e) {
        var i = new f;
        this.thumbnailMaterial = this.material.clone(), this.thumbnailMesh = new g(i, this.thumbnailMaterial), this.meshList = this.mesh.meshList = [this.thumbnailMesh];
        var s = new p(e),
            h = this.thumbnailMaterial.uniforms;
        h.uSampler.value = s, h.uCRZ.value = [0, 0, 1], h.uOpacity.value = this.curOpacity, i.triangles = this.geometry.triangles.slice(0), t(this.thumbnailMesh), this.thumbnailMesh.useTime = i.triangles.length, this.thumbnailMesh.level = 1
    }, y.hasThumbnailTexture = function() {
        return void 0 !== this.thumbnailMaterial && void 0 !== this.thumbnailMaterial.uniforms.uSampler.value
    }, y.setLevel = function(e) {
        if (this.curLevel !== e)
            if (this.curLevel = e, this.tileLayers) {
                var t = this.tileLayers[this.curLevel];
                this.tileColumns = t.blockX, this.tileRows = t.blockY
            } else e >= 2 ? (this.tileColumns = Math.pow(2, this.curLevel - 1), this.tileRows = Math.pow(2, this.curLevel - 2)) : (this.tileColumns = 1, this.tileRows = 1)
    }, y.setTileLayers = function(e, t) {
        this.maxLevel = e, this.tileLayers = t;
        var i, s, h = t[e],
            a = h.blockX,
            r = h.blockY;
        if (a > l.SPHERE_WIDTH_SEGMENTS || r > l.SPHERE_HEIGHT_SEGMENTS) i = a, s = r, this.isBillionPixels = !0;
        else {
            var i = l.SPHERE_WIDTH_SEGMENTS,
                s = l.SPHERE_HEIGHT_SEGMENTS;
            this.isBillionPixels = !1
        }(this.sphereWidthSegments !== i || this.sphereHeightSegments !== s) && (this.sphereWidthSegments = i, this.sphereHeightSegments = s, this.geometry = new c(l.SPHERE_RADIUS, this.sphereWidthSegments, this.sphereHeightSegments), this.mesh && (this.mesh.geometry = this.geometry))
    }, y.hideAllTiles = function() {
        for (var e = this.mesh.meshList, t = e.length - 1; t > 0; t--) e[t].visible = !1
    }, y.checkTileExistAndShow = function(e, t) {
        for (var s, h, a, r, l, n = this.tileColumns, o = this.tileRows, m = this.sphereWidthSegments / n, u = this.sphereHeightSegments / o, g = 2 * this.sphereWidthSegments, d = t * u * g, v = e * m * 2, p = 0; u > p; p++)
            for (var c = 0; m > c; c++)
                if (s = d + g * p + v + 2 * c, h = this.geometry.triangles[s], a = h.mesh, !0 !== a.visible && (a.visible = !0, a.level === this.curLevel && void 0 !== a.material.uniforms.uSampler.value)) return l = m * u * 2, r = a.geometry.triangles.length, r !== l && i(this.geometry.triangles, a, e, t, n, o, this.sphereWidthSegments, this.sphereHeightSegments), !0;
        return !1
    }, y.setTile = function(e, s, h, r, l) {
        for (var o = this.mesh.meshList, m = o.length - 1; m >= 0; m--) {
            var u = o[m].material.uniforms.uSampler.value;
            if (u && e === u.image.id) return
        }
        var d = new f,
            v = this.material.clone(),
            c = v.uniforms;
        c.uCRZ.value = [h, r, l], c.uSampler.value = new p(s), c.uOpacity.value = this.curOpacity, c.vColor && !0 === n.debug.shader && (c.vColor.value = [Math.random(), Math.random(), Math.random(), 1]), this.mask && void 0 !== this.material.uniforms.uSamplerMask && (c.uSamplerMask.value = new p(this.getMask(h, r, l)), c.showPointCloud.value = !0);
        var S = new g(d, v);
        if (S.level = l, S.visible = !0, i(this.geometry.triangles, S, h, r, this.tileColumns, this.tileRows, this.sphereWidthSegments, this.sphereHeightSegments), this.mesh.meshList.push(S), this.deallocateUselessMesh(), this.isBillionPixels) {
            this.maxTileNumForBillionPixels = 300;
            for (var M, y, o = this.mesh.meshList, b = (o.length, !1), w = 1; w < o.length && o.length >= this.maxTileNumForBillionPixels;)
                if (M = o[w], M.visible) w++;
                else {
                    y = M.geometry.triangles;
                    for (var m = y.length - 1; m >= 0; m--) y[m].mesh = this.thumbnailMesh;
                    M.geometry.triangles = [], M.useTime = 0, this.thumbnailMesh.geometry.triangles = this.thumbnailMesh.geometry.triangles.concat(y), this.thumbnailMesh.useTime = this.thumbnailMesh.geometry.triangles.length, b = !0, o.splice(w, 1), a(M)
                }
            b && t(this.thumbnailMesh)
        }
        0 >= this.thumbnailMesh.geometry.triangles.length && (this.thumbnailMesh.visible = !1)
    }, y.deallocateUselessMesh = function() {
        for (var e, t = this.mesh.meshList, i = t.length - 1; i >= 0; i--) e = t[i], (void 0 === e || 0 === e.useTime && e !== this.thumbnailMesh) && (t.splice(i, 1), a(e))
    }, y.setRotateX = function(e) {
        for (var t = this.mesh.meshList, i = t.length - 1; i >= 0; i--) t[i].rotateX(e);
        this.mesh.rotateX(e)
    }, y.setRotateY = function(e) {
        for (var t = this.mesh.meshList, i = t.length - 1; i >= 0; i--) t[i].rotateZ(e);
        this.mesh.rotateY(e)
    }, y.setRotateZ = function(e) {
        for (var t = this.mesh.meshList, i = t.length - 1; i >= 0; i--) t[i].rotateZ(e);
        this.mesh.rotateZ(e)
    }, y.setVisible = function(e) {
        this.visible !== e && (this.visible = e, this.mesh.visible = e)
    }, Object.defineProperties(y, {
        opacity: {
            get: function() {
                return this.curOpacity
            },
            set: function(e) {
                if (this.curOpacity !== e) {
                    this.curOpacity = e;
                    for (var t, i = this.mesh.meshList, s = i.length - 1; s >= 0; s--) t = i[s].material, t.uniforms.uOpacity.value = this.curOpacity
                }
            }
        }
    }), y.reset = function() {
        for (var e = this.mesh.meshList, t = e.length - 1; t >= 0; t--) a(e[t]);
        this.thumbnailMaterial = void 0, this.thumbnailMesh = void 0, this.mesh.meshList = [], this.mesh.rotation = u.create()
    }, y.dispose = function() {
        for (var e = this.mesh.meshList, t = e.length - 1; t >= 0; t--) a(e[t]);
        e = [], a(this.mesh), delete this.geometry, delete this.material, delete this.mesh
    }, M
});;
define("pano:widget/module/PanoModule/WebglRender/component/TopoArrowContainer.js", function(r) {
    var t = r("pano:widget/module/PanoModule/WebglRender/component/ThreeDDisplayObject.js"),
        e = r("pano:widget/module/PanoModule/WebglRender/widget/RoadArrow.js"),
        o = window.Four,
        s = o.Tool,
        i = function() {
            t.call(this), this.roadArrows = [], this.mesh = [], this.radius = 0, this.setTopoArrows = function(r) {
                for (var t, o = r.length - 1; o >= 0; o--) t = new e(r[o]), void 0 !== this.arrowTexture ? (t.setArrowTexture(this.arrowTexture), t.setVisible(this.visible)) : (t.setVisible(!1), this.visible = !1), this.roadArrows.push(t), this.mesh.push(t.getMesh())
            }, this.setPosition = function(r, t, e) {
                for (var o = this.roadArrows.length - 1; o >= 0; o--) this.roadArrows[o].setPosition(r, t, e, this.radius)
            }, this.setTexture = function(r) {
                if (void 0 === this.arrowTexture) {
                    this.arrowTexture = new o.Texture(r);
                    for (var t = this.roadArrows.length - 1; t >= 0; t--) this.roadArrows[t].setArrowTexture(this.arrowTexture)
                }
            }, this.setHoverTexture = function(r) {
                void 0 === this.arrowHoverTexture && (this.arrowHoverTexture = new o.Texture(r))
            }, this.getIntersectTopoPanoData = function(r) {
                for (var t, e, o = !1, s = this.roadArrows.length - 1; s >= 0; s--)
                    if (t = this.roadArrows[s], e = t.getMesh(), o = void 0 !== r ? e.isIntersectRay(r) : !1) return t.panoData
            }, this.getTopoPanoDataByDirection = function(r, t) {
                for (var e, o, i, n = 360, h = 0, a = this.roadArrows.length - 1; a >= 0; a--) e = this.roadArrows[a], o = s.degreeNormalized(e.getDegree() - r), o = o > 180 ? 360 - o : o, 1 === t && 90 > o && n > o ? (n = o, i = e) : -1 === t && o > 90 && o > h && (h = o, i = e);
                return i ? i.panoData : void 0
            }, this.isIntersectTopoArrow = function(r) {
                for (var t, e, o = !1, s = this.roadArrows.length - 1; s >= 0; s--)
                    if (t = this.roadArrows[s], e = t.getMesh(), o = void 0 !== r ? e.isIntersectRay(r) : !1) return !0;
                return !1
            }, this.updateIntersectTopoArrow = function(r) {
                for (var t, e, o = !1, s = this.roadArrows.length - 1; s >= 0; s--)
                    if (t = this.roadArrows[s], e = t.getMesh(), o = void 0 !== r ? e.isIntersectRay(r) : !1, t.isHover !== o) return t.setArrowTexture(o ? this.arrowHoverTexture : this.arrowTexture), t.isHover = o, !0;
                return !1
            }, this.setVisible = function(r) {
                if (this.visible !== r && this.topoImageLoaded) {
                    this.visible = r;
                    for (var t = this.roadArrows.length - 1; t >= 0; t--) this.roadArrows[t].setVisible(r)
                }
            }, this.getVisible = function() {
                return this.visible
            }, this.onTopoImageLoaded = function() {
                this.topoImageLoaded = !0, this.setVisible(!0)
            }, this.reset = function() {
                for (var r = this.roadArrows.length - 1; r >= 0; r--) this.roadArrows[r].disposeWithoutTexture();
                this.roadArrows = [], this.mesh = []
            }, this.dispose = function() {
                for (var r = this.roadArrows.length - 1; r >= 0; r--) this.roadArrows[r].dispose();
                this.roadArrows = [], this.mesh = []
            }
        };
    return i.prototype = Object.create(t.prototype), i.prototype.constructor = i, i
});;
define("pano:widget/module/PanoModule/WebglRender/component/WellLid.js", function(e) {
    var t = e("pano:widget/module/PanoModule/WebglRender/component/ThreeDDisplayObject.js"),
        o = e("pano:widget/module/PanoModule/WebglRender/core/ShaderSet.js"),
        i = e("pano:widget/module/PanoModule/WebglRender/config/ConfigurationOptions.js"),
        r = e("pano:widget/module/PanoModule/WebglRender/config/ConstantConfig.js"),
        s = Four.geometry.CircleGeometry,
        n = Four.geometry.RingGeometry,
        a = Four.material.Material,
        h = Four.Mesh,
        l = Four.GLMatrix.vec3,
        u = Four.GLMatrix.mat4,
        d = function() {
            function e(e) {
                var t = u.create(),
                    o = l.create();
                l.cross(o, e, [0, 1, 0]);
                var i = d * l.length([e[0], 0, e[2]]) / M / r.ROAD_MAX_LENGTH;
                return u.rotate(t, t, i, o), t
            }
            t.call(this);
            var d = 30 / 180 * Math.PI,
                m = new s(18, 32, 0, 2 * Math.PI, Four.Config.ZeroAxisY),
                g = new a;
            g.uniforms = {
                vColor: {
                    type: "4f",
                    value: [1, 1, 1, .4]
                }
            }, !0 === i.debug.shader && (g.uniforms.showDebugLine = {
                type: "1i",
                value: !1
            }), g.vertexShader = o.baseVertexShader, g.fragmentShader = o.baseFragmentShader;
            var f = new h(m, g),
                v = new n(18, 19.5, 32, 0, 2 * Math.PI, Four.Config.ZeroAxisY),
                p = new a;
            p.uniforms = {
                vColor: {
                    type: "4f",
                    value: [1, 1, 1, 1]
                }
            }, !0 === i.debug.shader && (p.uniforms.showDebugLine = {
                type: "1i",
                value: !1
            }), p.vertexShader = o.baseVertexShader, p.fragmentShader = o.baseFragmentShader;
            var c = new h(v, p);
            this.mesh = [f, c], this.visible = !1;
            for (var b = this.mesh.length - 1; b >= 0; b--) this.mesh[b].visible = !1;
            var M = Math.floor(r.SPHERE_RADIUS / r.ROAD_MAX_LENGTH);
            this.setPosition = function(t, o, i) {
                for (var r, s = this.mesh.length - 1; s >= 0; s--) r = [t, o, i], this.mesh[s].position = r, this.mesh[s].rotation = e(r)
            }, this.getPosition = function() {
                return this.mesh[0].position
            }, this.setVisible = function(e) {
                if (this.visible !== e) {
                    this.visible = e;
                    for (var t = this.mesh.length - 1; t >= 0; t--) this.mesh[t].visible = e
                }
            }, this.dispose = function() {
                if (void 0 !== this.mesh) {
                    for (var e, t, o, i = this.mesh.length - 1; i >= 0; i--) e = this.mesh[i], t = e.material, t && t.dispose(), o = e.geometry, o && o.dispose(), this.mesh.splice(i, 1);
                    delete this.mesh
                }
            }
        };
    return d.prototype = Object.create(t.prototype), d.prototype.constructor = d, d
});;
define("pano:widget/module/PanoModule/WebglRender/component/RoadSurfaceContainer.js", function(e) {
    var o = e("pano:widget/module/PanoModule/WebglRender/component/ThreeDDisplayObject.js"),
        t = (e("pano:widget/module/PanoModule/WebglRender/widget/RoadSurface.js"), function() {
            o.call(this), this.roadSurfaces = [], this.mesh = [], this.setRoadSurfaces = function(e) {
                for (var o = e.length - 1; o >= 0; o--);
            }
        });
    return t.prototype = Object.create(o.prototype), t.prototype.constructor = t, t
});;
define("pano:widget/module/PanoModule/WebglRender/component/PointCloud.js", function(e) {
    var o = e("pano:widget/module/PanoModule/WebglRender/component/ThreeDDisplayObject.js"),
        t = e("pano:widget/module/PanoModule/WebglRender/core/ShaderSet.js"),
        i = e("pano:widget/module/PanoModule/WebglRender/config/ConstantConfig.js"),
        s = e("pano:widget/module/PanoModule/WebglRender/config/ConfigurationOptions.js"),
        n = Four.GLMatrix.vec3,
        r = function() {
            o.call(this);
            var e = [0, 0, 0],
                r = new Four.geometry.PlaneGeometry(8, 5, 1, 1, Four.Config.ZeroAxisZ, {
                    showBorder: !0,
                    borderWidth: 1,
                    borderColor: [1, 1, 1, .8]
                }),
                a = new Four.material.Material;
            a.uniforms = {
                vColor: {
                    type: "4f",
                    value: [1, 1, 1, .4]
                }
            }, !0 === s.debug.shader && (a.uniforms.showDebugLine = {
                type: "1i",
                value: !1
            }), a.vertexShader = t.baseVertexShader, a.fragmentShader = t.baseFragmentShader, this.mesh = new Four.PlaneMesh(r, a), this.mesh.visible = this.visible = !1, this.update = function(o, t, s) {
                this.mesh.update(o, t, s);
                var r = this.mesh.position;
                e = [r[0], r[1], r[2]];
                var a = n.length(r);
                0 !== a && (i.PLANE_MIN_DISTANCE > a ? (n.scale(r, r, i.PLANE_MIN_DISTANCE / a), this.mesh.position = r) : i.PLANE_MAX_DISTANCE < a && (n.scale(r, r, i.PLANE_MAX_DISTANCE / a), this.mesh.position = r))
            }, this.setVisible = function(e) {
                this.visible !== e && (this.visible = e, this.mesh.visible = e)
            }, this.getNormal = function() {
                return this.mesh.normal
            }, this.getPosition = function() {
                return e
            }, this.getMercatorPosition = function() {
                return e
            }, this.dispose = function() {
                if (this.mesh) {
                    var e = this.mesh.material;
                    e && e.dispose();
                    var o = this.mesh.geometry;
                    o && o.dispose()
                }
                delete this.mesh
            }
        };
    return r.prototype = Object.create(o.prototype), r.prototype.constructor = r, r
});;
define("pano:widget/module/PanoModule/WebglRender/component/NavigationContainer.js", function(e) {
    var t = e("pano:widget/module/PanoModule/WebglRender/component/ThreeDDisplayObject.js"),
        i = e("pano:widget/module/PanoModule/WebglRender/widget/NavigationRoad.js"),
        s = e("pano:widget/module/PanoModule/WebglRender/widget/NavigationArrow.js"),
        o = function() {
            t.call(this), this.mesh = [];
            var e = new i;
            this.mesh.push(e.getMesh());
            var o = new s;
            this.mesh.push(o.getMesh()), this.setNavigationPoints = function(t) {
                e.setNavigationPoints(t), o.setNavigationPoints(e.getPointsData())
            }, this.setVisible = function(t) {
                this.visible = t, e.setVisible(t), o.setVisible(t)
            }, this.getVisible = function() {
                return this.visible
            }, this.reset = function() {
                e.reset(), o.reset()
            }, this.dispose = function() {
                e.dispose(), o.dispose()
            }, this.setVisible(!1)
        };
    return o.prototype = Object.create(t.prototype), o.prototype.constructor = o, o
});;
define("pano:widget/module/PanoModule/WebglRender/config/ConstantConfig.js", function() {
    var _ = function() {};
    return _.protocol = window.location.protocol, _.DEFAULT_URL = _.protocol + "//mapsv0.bdimg.com/", _.DEFAULT_TILE_URLS = [_.protocol + "//mapsv0.bdimg.com/", _.protocol + "//mapsv1.bdimg.com/", _.protocol + "//mapsv1.bdimg.com/"], _.TOPO_ARROW_TEXTURE = "//webmap0.bdimg.com/wolfman/static/pano/images/webgl/topo_arrow_06f0f2e.png", _.TOPO_HOVER_ARROW_TEXTURE = "//webmap1.bdimg.com/wolfman/static/pano/images/webgl/topo_hover_arrow_d9b5120.png", _.DEFAULT_FOV_Y = 75, _.FOV_ZOOM_STEP = 15, _.FOV_ZOOM_STEP_FOR_BILLIONS = 12, _.ZOOM_MAX_COMMON = 4, _.ZOOM_MIN = 1, _.LEVEL_ZOOM_DIFF = 3, _.TILE_LEVEL_FOUR = 4, _.TILE_LEVEL_FIVE = 5, _.TILE_LEVEL_SEVEN = 7, _.SPHERE_RADIUS = 3e3, _.SPHERE_WIDTH_SEGMENTS = 64, _.SPHERE_HEIGHT_SEGMENTS = 32, _.MAX_TILE_LOADING_TOGETHOR = 16, _.ROAD_WIDTH = 15, _.ROAD_MIN_LENGTH = 8, _.ROAD_MAX_LENGTH = 180, _.PLANE_MIN_DISTANCE = 10, _.PLANE_MAX_DISTANCE = 200, _.TYPE_STREET = "street", _.TYPE_INNER = "inter", _.INTER_VIEWPORT_MAX = 35, _.STREET_VIEWPORT_MAX = 20, _.PANO_VIEWPORT_MAX = 90, _.PANO_VIEWPORT_MIN = -90, _.PANO_VIEWPORT_BILLION_MAX = 87, _.PANO_VIEWPORT_BILLION_MIN = -87, _.INTERACTIVE_STATE_NORMAL = "normal", _.INTERACTIVE_STATE_CLICKABLE = "clickable", _.BILLIONS_FOVY_VALUE = [65, 45, 23, 10, 5, 2], _
});;
define("pano:widget/module/PanoModule/WebglRender/config/ConfigurationOptions.js", function() {
    var o = {
        marker: {
            startend: !0,
            route: !0,
            poi: !0,
            classified: !0,
            custom: !0,
            operational: !0,
            tag: !0,
            commercialize: !0
        },
        markerVisible: {
            startEnd: !0,
            route: !0,
            poi: !0,
            classified: !0,
            custom: !0,
            operational: !0,
            tag: !0,
            commercialize: !0
        },
        visible: {
            wellLid: !0,
            topo: !0,
            navigationArrow: !0,
            pointCloud: !0,
            marker: !0
        },
        pointCloudAnimation: !0,
        interactiveState: "normal",
        debug: {
            shader: !1,
            tip: !1,
            pointCloud: !1,
            zoom: !1,
            coordinateTransform: !1,
            renderNextFrame: !1
        }
    };
    return o
});;
define("pano:widget/module/PanoModule/WebglRender/core/DomOverlay.js", function(e) {
    var t = e("pano:widget/module/PanoModule/WebglRender/component/MarkerContainer.js"),
        n = e("pano:widget/module/PanoModule/WebglRender/component/DebugContainer.js"),
        i = e("pano:widget/module/PanoModule/WebglRender/component/POILine.js"),
        r = e("pano:widget/module/PanoModule/WebglRender/event/EventType.js"),
        o = e("pano:widget/module/PanoModule/WebglRender/config/ConfigurationOptions.js"),
        a = window.Four,
        s = a.EventDispatcher,
        d = function(e) {
            function a(e) {
                h.dispatchEvent(e)
            }

            function s(e) {
                switch (e.type) {
                    case r.TAG_MARKER_FOCUS:
                        v = !0;
                        break;
                    case r.TAG_MARKER_CANCEL:
                        v = !1;
                        break;
                    case r.TAG_MARKER_SUBMIT:
                    case r.TAG_MARKER_CLOSE:
                        v = !1, h.dispatchEvent(e)
                }
            }
            var d = document.createElement("div");
            d.style.cssText = ["z-index:99", "overflow:hidden", "width:100%", "height:100%", "position:absolute", "top:0", "left:0"].join(";"), e.appendChild(d);
            var l, u, p, c, M, h = this,
                C = -20,
                E = 20,
                g = 0,
                L = 20,
                v = !1;
            this.setPanoramaData = function(e) {
                this.getMarkerContainer().setPanoramaData(e)
            }, this.getWellLidDistanceLabel = function() {
                return void 0 === l && (l = document.createElement("span"), l.style.cssText = ["font: 13px Microsoft YaHei,SimHei,Apple LiSung Light", "color: #FFFFFF", "position:absolute"].join(";"), d.appendChild(l)), l
            }, this.updateWellLidDistanceLabel = function(e, t, n) {
                var i = this.getWellLidDistanceLabel();
                if (!0 !== t || void 0 === e || isNaN(e) || void 0 === n) i.style.display = "none";
                else {
                    i.style.display = "inline";
                    var r = parseInt(n[1], 10) + E,
                        o = parseInt(n[0], 10) + C;
                    i.style.top = r + "px", i.style.left = o + "px", i.innerHTML = "前进" + parseInt(e, 10) + "米"
                }
            }, this.getPointCloudNameLabel = function() {
                return void 0 === u && (u = document.createElement("div"), u.style.cssText = ["font: 13px Microsoft YaHei,SimHei,Apple LiSung Light", "color: #000000", "border: 1px solid #000000", "background: #FFFFCC", "padding: 2px 4px", "position:absolute"].join(";"), d.appendChild(u)), u
            }, this.updatePointCloudNameLabel = function(e, t, n) {
                var i = this.getPointCloudNameLabel();
                if (e && !0 === t && void 0 !== n) {
                    i.style.display = "inline";
                    var r = parseInt(n[1], 10) + L,
                        o = parseInt(n[0], 10) + g,
                        a = d.clientWidth,
                        s = i.clientWidth;
                    o + s + 10 > a && (o -= s), i.style.top = r + "px", i.style.left = o + "px", i.innerHTML = e
                } else i.style.display = "none"
            }, this.getMarkerContainer = function() {
                return void 0 === p && (p = new t(d), p.addEventListener(r.MARKER_CLICKED, a), p.addEventListener(r.ENTRANCE_MARKER_CLICKED, a), p.addEventListener(r.OVERLAY_MOUSECLICK, a), p.addEventListener(r.OVERLAY_MOUSEOVER, a), p.addEventListener(r.OVERLAY_MOUSEOUT, a), p.addEventListener(r.TAG_MARKER_FOCUS, s), p.addEventListener(r.TAG_MARKER_SUBMIT, s), p.addEventListener(r.TAG_MARKER_CLOSE, s), p.addEventListener(r.TAG_MARKER_CANCEL, s)), p
            }, this.addDebugContainer = function() {
                return void 0 === c && (c = new n(d), c.addEventListener(r.CHANGE_PANO_CLICKED, a), c.addEventListener(r.ROTATE_PANO_CLICKED, a)), c
            }, this.updateDebugPanoId = function(e) {
                c.updateDebugPanoId(e)
            }, this.removeDebugContainer = function() {
                void 0 !== c && (c.removeEventListener(r.CHANGE_PANO_CLICKED, a), c.removeEventListener(r.ROTATE_PANO_CLICKED, a), c.dispose(), c = void 0)
            }, this.getIsEditingTextInput = function() {
                return v
            }, this.setIsEditingTextInput = function(e) {
                v = e
            }, this.setCursorStyle = function(e) {
                this.getMarkerContainer().setCursorStyle(e)
            }, this.setMouseEnabled = function(e) {
                this.getMarkerContainer().setMouseEnabled(e)
            }, this.setMarkerVisible = function(e) {
                return !1 === o.visible.marker ? void this.getMarkerContainer().setVisible(!1) : void this.getMarkerContainer().setVisible(e)
            }, this.addMarkers = function(e) {
                this.getMarkerContainer().addMarkers(e)
            }, this.removeMarkers = function(e) {
                this.getMarkerContainer().removeMarkers(e)
            }, this.removeMarkerPanels = function() {
                this.getMarkerContainer().removeMarkerPanels()
            }, this.updateMarkersPosition = function() {
                this.getMarkerContainer().updateMarkersPosition()
            }, this.forceUpdateMarkers = function() {
                this.getMarkerContainer().forceUpdateMarkers()
            }, this.delayUpdateMarkers = function() {
                this.getMarkerContainer().delayUpdateMarkers()
            }, this.getMarkerUidInBestPano = function() {
                return this.getMarkerContainer().getMarkerUidInBestPano()
            }, this.getMarkerCenterPointByUid = function(e) {
                return this.getMarkerContainer().getMarkerCenterPointByUid(e)
            }, this.updateMarkerVisible = function() {
                this.getMarkerContainer().updateMarkerVisible()
            }, this.getPOILine = function() {
                return void 0 === M && (M = new i(d)), M
            }, this.setPOILine = function(e, t) {
                this.getPOILine().setPOILine(e, t)
            }, this.clearPOILine = function() {
                this.getPOILine().clearPOILine()
            }, this.resize = function(e, t) {
                this.getMarkerContainer().resize(e, t)
            }
        };
    return d.prototype = {}, d.prototype.constructor = d, s.prototype.apply(d.prototype), d
});;
define("pano:widget/module/PanoModule/WebglRender/core/ShaderSet.js", function() {
    var o = {};
    return o.baseVertexShader = ["void main(void){", "   gl_Position = mvpMatrix * vec4(position, 1.0);", "}"].join("\n"), o.baseFragmentShader = ["uniform vec4 vColor;", "void main(void){", "    gl_FragColor = vColor;", "}"].join("\n"), o.uvVertexShader = ["varying vec2 vTextureCoord;", "void main(void){", "   gl_Position = mvpMatrix * vec4(position, 1.0);", "   vTextureCoord = uv;", "}"].join("\n"), o.textureFragmentShader = ["uniform sampler2D uSampler;", "uniform float uOpacity;", "varying vec2 vTextureCoord;", "void main(void){", "    vec4 textureColor = texture2D(uSampler, vTextureCoord);", "    gl_FragColor = vec4(textureColor.rgb, textureColor.a * uOpacity);", "}"].join("\n"), o.uvProjVertexShader = ["varying vec3 vTextureCoord;", "void main(void){", "   gl_Position = mvpMatrix * vec4(position, 1.0);", "   vTextureCoord = vec3(uv, 1.0) * length(position);", "}"].join("\n"), o.textureProjFragmentShader = ["uniform sampler2D uSampler;", "uniform float uOpacity;", "varying vec3 vTextureCoord;", "void main(void){", "    vec4 textureColor = texture2DProj(uSampler, vTextureCoord);", "    gl_FragColor = vec4(textureColor.rgb, textureColor.a * uOpacity);", "}"].join("\n"), o.tileVertexShader = ["const float PI = 3.1415926;", "vec4 getPosition(vec3 pos) {", "    float radius = pos.z;", "    float phy = 2.0 * PI * pos.x;", "    float theta = PI * pos.y;", "    float sinTheta = sin(theta);", "    return vec4(radius * cos(phy) * sinTheta, radius * cos(theta), radius * sin(phy) * sinTheta, 1.0);", "}", "vec2 getUV(vec3 pos, vec3 crz) {", "    float zoom = crz.z;", "    float cols = pow(2.0, zoom - 1.0);", "    float rows = pow(2.0, max(zoom - 2.0, 0.0));", "    return vec2(pos.x * cols - crz.x, 1.0 - pos.y * rows + crz.y);", "}", "uniform vec3 uCRZ;", "varying vec2 vTextureCoord;", "void main(void){", "    gl_Position = mvpMatrix * getPosition(position);", "    vTextureCoord = getUV(position, uCRZ);", "}"].join("\n"), o.baseFragmentShaderDebug = ["uniform vec4 vColor;", "uniform bool showDebugLine;", "void main(void){", "   if (!showDebugLine) {", "       gl_FragColor = vColor;", "   } else {", "       gl_FragColor = vec4(vColor.rgb, vColor.a * 0.6);", "   }", "}"].join("\n"), o.textureFragmentShaderDebug = ["uniform sampler2D uSampler;", "uniform float uOpacity;", "varying vec2 vTextureCoord;", "uniform bool showDebugLine;", "uniform vec4 vColor;", "void main(void){", "   if (!showDebugLine) {", "       vec4 textureColor = texture2D(uSampler, vTextureCoord);", "       gl_FragColor = vec4(textureColor.rgb, textureColor.a * uOpacity);", "   } else {", "       gl_FragColor = vec4(vColor.rgb, vColor.a);", "   }", "}"].join("\n"), o.textureProjFragmentShaderDebug = ["uniform sampler2D uSampler;", "uniform float uOpacity;", "varying vec3 vTextureCoord;", "uniform bool showDebugLine;", "uniform vec4 vColor;", "void main(void){", "   if (!showDebugLine) {", "       vec4 textureColor = texture2DProj(uSampler, vTextureCoord);", "       gl_FragColor = vec4(textureColor.rgb, textureColor.a * uOpacity);", "   } else {", "       gl_FragColor = vec4(vColor.rgb, vColor.a);", "   }", "}"].join("\n"), o.pointCloudMaskFragmentShaderDebug = ["varying vec2 vTextureCoord;", "uniform bool showDebugLine;", "uniform bool showPointCloud;", "uniform vec4 vColor;", "uniform sampler2D uSampler;", "uniform sampler2D uSamplerMask;", "uniform float uOpacity;", "void main(void){", "   if (!showDebugLine) {", "       if (showPointCloud) {", "           vec4 textureColor = texture2D(uSampler, vTextureCoord);", "           vec4 maskTextureColor = texture2D(uSamplerMask, vTextureCoord);", "           gl_FragColor = textureColor * vec4(1.0 - maskTextureColor.a, 1.0 - maskTextureColor.a, 1.0 - maskTextureColor.a, uOpacity) + maskTextureColor * vec4(maskTextureColor.a, maskTextureColor.a, maskTextureColor.a, uOpacity);", "       } else {", "           gl_FragColor = texture2D(uSampler, vTextureCoord) * vec4(1.0, 1.0, 1.0, uOpacity);", "       }", "   } else {", "       gl_FragColor = vec4(vColor.rgb, uOpacity);", "   }", "}"].join("\n"), o
});;
define("pano:widget/module/PanoModule/WebglRender/core/Panorama.js", function(e) {
    var t = e("pano:widget/module/PanoModule/WebglRender/component/PanoramaSphere.js"),
        i = (e("pano:widget/module/PanoModule/WebglRender/event/EventType.js"), e("pano:widget/module/PanoModule/WebglRender/service/TextureManager.js"), e("pano:widget/module/PanoModule/WebglRender/component/TopoArrowContainer.js")),
        o = e("pano:widget/module/PanoModule/WebglRender/component/WellLid.js"),
        n = e("pano:widget/module/PanoModule/WebglRender/component/RoadSurfaceContainer.js"),
        s = e("pano:widget/module/PanoModule/WebglRender/component/PointCloud.js"),
        r = e("pano:widget/module/PanoModule/WebglRender/component/NavigationContainer.js"),
        a = e("pano:widget/module/PanoModule/WebglRender/config/ConfigurationOptions.js"),
        h = function(e) {
            this.panoId = e, this.meshes = [], this.panoramaSphere = new t, this.meshes.push(this.panoramaSphere.getMesh()), this.navigationContainer = new r, this.meshes = this.meshes.concat(this.navigationContainer.getMesh()), this.topoArrowContainer = new i, this.wellLid = new o, this.meshes = this.meshes.concat(this.wellLid.getMesh()), this.roadSurfaceContainer = new n, this.meshes = this.meshes.concat(this.roadSurfaceContainer.getMesh()), this.pointCloud = new s, this.meshes = this.meshes.concat(this.pointCloud.getMesh()), this.setPointCloudVisible(!1);
            var a = 1;
            Object.defineProperties(this, {
                opacity: {
                    get: function() {
                        return a
                    },
                    set: function(e) {
                        a !== e && (a = e, this.panoramaSphere.opacity = e)
                    }
                }
            })
        };
    return h.prototype = {
        constructor: h,
        setVisible: function(e) {
            this.panoramaSphere.setVisible(e), this.navigationContainer.setVisible(e), this.topoArrowContainer.setVisible(e), this.wellLid.setVisible(e), this.pointCloud.setVisible(e)
        },
        setSphereVisible: function(e) {
            this.panoramaSphere.setVisible(e)
        },
        setOverlayVisible: function(e) {
            this.navigationContainer.setVisible(e), this.topoArrowContainer.setVisible(e), this.wellLid.setVisible(e), this.pointCloud.setVisible(e)
        },
        getMeshes: function() {
            return this.meshes
        },
        getSphereMatrix: function() {
            return this.panoramaSphere.getModelMatrix()
        },
        setThumbnail: function(e) {
            this.panoramaSphere.setThumbnail(e)
        },
        hasThumbnailTexture: function() {
            return this.panoramaSphere.hasThumbnailTexture()
        },
        setMask: function(e) {
            this.panoramaSphere.setMask(e)
        },
        setTile: function(e, t, i, o, n) {
            this.panoramaSphere.setTile(e, t, i, o, n)
        },
        hideAllTiles: function() {
            this.panoramaSphere.hideAllTiles()
        },
        checkTileExistAndShow: function(e, t) {
            return this.panoramaSphere.checkTileExistAndShow(e, t)
        },
        setLevel: function(e) {
            this.panoramaSphere.setLevel(e)
        },
        setTileLayers: function(e, t) {
            this.panoramaSphere.setTileLayers(e, t)
        },
        setRotateX: function(e) {
            this.panoramaSphere.setRotateX(e)
        },
        setRotateY: function(e) {
            this.panoramaSphere.setRotateY(e)
        },
        setRotateZ: function(e) {
            this.panoramaSphere.setRotateZ(e)
        },
        setTopoArrows: function(e) {
            this.topoArrowContainer.setTopoArrows(e), this.meshes = this.meshes.concat(this.topoArrowContainer.getMesh())
        },
        setTopoTexture: function(e) {
            this.topoArrowContainer.setTexture(e)
        },
        setTopoHoverTexture: function(e) {
            this.topoArrowContainer.setHoverTexture(e)
        },
        setTopoPosition: function(e, t, i) {
            this.topoArrowContainer.setPosition(e, t, i)
        },
        setTopoVisible: function(e) {
            return !1 === a.visible.topo ? void this.topoArrowContainer.setVisible(!1) : void this.topoArrowContainer.setVisible(e)
        },
        getTopoVisible: function() {
            return this.topoArrowContainer.getVisible()
        },
        onTopoImageLoaded: function() {
            this.topoArrowContainer.onTopoImageLoaded()
        },
        isIntersectTopoArrow: function(e) {
            return this.topoArrowContainer.isIntersectTopoArrow(e)
        },
        updateIntersectTopoArrow: function(e) {
            return this.topoArrowContainer.updateIntersectTopoArrow(e)
        },
        getClickTopoPanoData: function(e) {
            return this.topoArrowContainer.getIntersectTopoPanoData(e)
        },
        getTopoPanoDataByDirection: function(e, t) {
            return this.topoArrowContainer.getTopoPanoDataByDirection(e, t)
        },
        showWellLid: function(e, t, i) {
            var o = !1;
            if (!0 !== this.wellLid.getVisible() && (this.wellLid.setVisible(!0), o = !0), o) this.wellLid.setPosition(e, t, i);
            else {
                var n = this.wellLid.getPosition();
                (n[0] !== e || n[1] !== t || n[2] !== i) && (this.wellLid.setPosition(e, t, i), o = !0)
            }
            return o
        },
        hideWellLid: function() {
            return !1 !== this.wellLid.getVisible() ? (this.wellLid.setVisible(!1), !0) : !1
        },
        getWellLidPosition: function() {
            return this.wellLid.getPosition()
        },
        getWellLidVisible: function() {
            return this.wellLid.getVisible()
        },
        setPointCloudVisible: function(e) {
            this.pointCloud.setVisible(e)
        },
        getPointCloudVisible: function() {
            return this.pointCloud.getVisible()
        },
        updatePointCloud: function(e, t, i) {
            this.pointCloud.update(e, t, i)
        },
        getPointCloudPosition: function() {
            return this.pointCloud.getPosition()
        },
        getPointCloudMercatorPosition: function() {
            return this.pointCloud.getMercatorPosition()
        },
        getPointCloudNormal: function() {
            return this.pointCloud.getNormal()
        },
        setNavigationPoints: function(e) {
            this.navigationContainer.setNavigationPoints(e)
        },
        setNavigationVisible: function(e) {
            this.navigationContainer.setVisible(e)
        },
        getNavigationVisible: function() {
            return this.navigationContainer.getVisible()
        },
        reset: function(e) {
            this.panoramaSphere.reset(), this.navigationContainer.reset(), this.meshes = [], this.meshes.push(this.panoramaSphere.getMesh()), this.meshes = this.meshes.concat(this.navigationContainer.getMesh()), this.meshes = this.meshes.concat(this.wellLid.getMesh()), this.meshes = this.meshes.concat(this.roadSurfaceContainer.getMesh()), this.meshes = this.meshes.concat(this.pointCloud.getMesh()), e.removeChild(this.topoArrowContainer.getMesh()), this.topoArrowContainer.reset()
        },
        dispose: function() {
            this.panoramaSphere && (this.panoramaSphere.dispose(), delete this.panoramaSphere), this.navigationContainer && (this.navigationContainer.dispose(), delete this.navigationContainer), this.topoArrowContainer && (this.topoArrowContainer.dispose(), delete this.topoArrowContainer), this.wellLid && (this.wellLid.dispose(), delete this.wellLid), this.pointCloud && (this.pointCloud.dispose(), delete this.pointCloud)
        }
    }, Four.EventDispatcher.prototype.apply(h.prototype), h
});;
define("pano:widget/module/PanoModule/WebglRender/delegate/state/State.js", function() {
    var t = function() {
        this.enter = function() {}, this.exit = function() {}, this.update = function() {}, this.getUpdateInfo = function() {}, this.resize = function() {}, this.dispose = function() {}
    };
    return t
});;
define("pano:widget/module/PanoModule/WebglRender/delegate/state/InertialAnimationState.js", function(t) {
    var e = t("pano:widget/module/PanoModule/WebglRender/delegate/state/State.js"),
        n = 10,
        a = .95,
        r = .95,
        i = .2,
        o = .3,
        u = function() {
            function t(t) {
                for (var e, n = 0, a = 0, r = t.length, i = 0; r > i; i++) e = t[i], n += e[0], a += e[1];
                return [n / r, a / r]
            }

            function u(t) {
                for (var e, n = 0, a = 0, r = t.length, i = 0; r > i; i++) e = t[i], n += Math.abs(e[0]), a += Math.abs(e[1]);
                return [n / r, a / r]
            }
            e.call(this);
            var l = 0,
                d = 0,
                f = 0,
                s = 0,
                c = !1;
            this.enter = function(e) {
                var a = e.deltaPos,
                    r = e.deltaEuler;
                if (0 !== a.length && 0 !== r.length) {
                    var i = u(a);
                    if (n * n < i[0] * i[0] + i[1] * i[1]) {
                        var o = t(r);
                        l = o[0], d = o[1], c = !0
                    }
                }
            }, this.exit = function() {
                l = 0, d = 0, f = 0, s = 0, c = !1
            }, this.update = function() {
                if (!0 === c) {
                    l *= a, d *= r;
                    var t = l > 0 ? l : -l,
                        e = d > 0 ? d : -d;
                    if (i > t && o > e) this.exit();
                    else {
                        var n = t >= i ? l : 0,
                            u = e >= o ? d : 0;
                        f += n, s += u
                    }
                }
            }, this.getUpdateInfo = function() {
                if (!0 !== c) return {};
                var t = {
                    deltaHeading: f,
                    deltaPitch: -s
                };
                return f = 0, s = 0, t
            }, this.getDoingAnimation = function() {
                return c
            }
        };
    return u.prototype = Object.create(e.prototype), u.prototype.constructor = u, u
});;
define("pano:widget/module/PanoModule/WebglRender/delegate/state/MouseDragState.js", function(t) {
    var e = t("pano:widget/module/PanoModule/WebglRender/delegate/state/State.js"),
        i = Four.GLMatrix.vec2,
        o = 30,
        r = function(t) {
            function r(t, e) {
                for (; t.length >= o;) t.shift();
                t.push(e)
            }
            e.call(this), this._camera = t, this._viewportWidth, this._viewportHeight;
            var a = -1,
                h = -1,
                n = [],
                s = [],
                u = 0,
                d = 0;
            this.enter = function(t, e) {
                a = t, h = e, n = [], s = []
            }, this.exit = function() {
                a = 0, h = 0, u = 0, d = 0
            }, this.getDragInfo = function() {
                return {
                    deltaPos: n,
                    deltaEuler: s
                }
            }, this.update = function(t, e) {
                if (void 0 === t || void 0 === e || a === t && h === e) return r(n, [0, 0]), void r(s, [0, 0]);
                var o = Four.CursorPicker.viewportToSphere(this._camera, i.fromValues(a, h), this._viewportWidth, this._viewportHeight),
                    p = Four.CursorPicker.viewportToSphere(this._camera, i.fromValues(t, e), this._viewportWidth, this._viewportHeight),
                    c = Four.Tool.radToDeg(p[0] - o[0]),
                    v = Four.Tool.radToDeg(p[1] - o[1]),
                    l = c > 0 ? c : -c,
                    g = v > 0 ? v : -v;
                l > 270 && (c = p[0] > o[0] ? c - 360 : c + 360);
                var f = t - a,
                    w = e - h,
                    _ = f > 0 ? f : -f,
                    m = w > 0 ? w : -w,
                    H = this._camera.fov / this._viewportHeight;
                m > 2 * _ && m - _ > 2 && l > g && (c = 0, v = H * w), (0 > w && v > 0 || w > 0 && 0 > v) && (v = -v), (0 > f && c > 0 || f > 0 && 0 > c) && (c = -c), 0 !== f && c / f > 3 * H && (c = H * f * 3), r(n, [f, w]), r(s, [c, v]), u += c, d += v, a = t, h = e
            }, this.getUpdateInfo = function() {
                var t = {
                    deltaHeading: u,
                    deltaPitch: -d
                };
                return u = 0, d = 0, t
            }, this.resize = function(t, e) {
                this._viewportWidth = t, this._viewportHeight = e
            }
        };
    return r.prototype = Object.create(e.prototype), r.prototype.constructor = r, r
});;
define("pano:widget/module/PanoModule/WebglRender/delegate/state/MouseMoveState.js", function(e) {
    var t = e("pano:widget/module/PanoModule/WebglRender/delegate/state/State.js"),
        o = function() {
            t.call(this), this.mouseX = void 0, this.mouseY = void 0, this.enter = function() {
                this.mouseX = void 0, this.mouseY = void 0
            }, this.exit = function() {
                this.mouseX = void 0, this.mouseY = void 0
            }, this.update = function(e, t) {
                this.mouseX = e, this.mouseY = t
            }, this.getUpdateInfo = function() {
                var e = {
                    mouseX: this.mouseX,
                    mouseY: this.mouseY
                };
                return this.mouseX = void 0, this.mouseY = void 0, e
            }
        };
    return o.prototype = Object.create(t.prototype), o.prototype.constructor = o, o
});;
define("pano:widget/module/PanoModule/WebglRender/delegate/state/MouseClickState.js", function(e) {
    var t = e("pano:widget/module/PanoModule/WebglRender/delegate/state/State.js"),
        o = function() {
            t.call(this), this.mouseX = void 0, this.mouseY = void 0, this.enter = function(e, t) {
                this.mouseX = e, this.mouseY = t
            }, this.exit = function() {
                this.mouseX = void 0, this.mouseY = void 0
            }, this.update = function(e, t) {
                this.mouseX = e, this.mouseY = t
            }, this.getUpdateInfo = function() {
                var e = {
                    isClick: !0,
                    mouseX: this.mouseX,
                    mouseY: this.mouseY
                };
                return e
            }
        };
    return o.prototype = Object.create(t.prototype), o.prototype.constructor = o, o
});;
define("pano:widget/module/PanoModule/WebglRender/delegate/MouseHandler.js", function(e) {
    var t, n, o, a = (e("pano:widget/module/PanoModule/WebglRender/delegate/state/State.js"), e("pano:widget/module/PanoModule/WebglRender/delegate/state/InertialAnimationState.js")),
        i = e("pano:widget/module/PanoModule/WebglRender/delegate/state/MouseDragState.js"),
        d = e("pano:widget/module/PanoModule/WebglRender/delegate/state/MouseMoveState.js"),
        r = e("pano:widget/module/PanoModule/WebglRender/delegate/state/MouseClickState.js"),
        s = e("pano:widget/module/PanoModule/WebglRender/event/EventType.js"),
        u = 5,
        l = navigator.userAgent.toLowerCase().match(/ipod|ipad|iphone|android/);
    l ? (t = {
        START: "touchstart",
        MOVING: "touchmove",
        END: "touchend",
        OUT: "touchcancel",
        WHEEL: "gesturechange",
        DOMMouseScroll: "DOMMouseScroll"
    }, n = function(e) {
        var t = e.touches.length > 0 ? e.touches[0] : e.changedTouches[0];
        return {
            x: t.pageX,
            y: t.pageY
        }
    }, o = function(e) {
        return e.scale > 1 ? 1 : -1
    }) : (t = {
        START: "mousedown",
        MOVING: "mousemove",
        END: "mouseup",
        OUT: "mouseout",
        WHEEL: "mousewheel"
    }, n = function(e) {
        return {
            x: e.pageX,
            y: e.pageY
        }
    }, o = function(e) {
        if (e.detail) return 0 === e.detail ? 0 : e.detail < 0 ? 1 : -1;
        var t = Math.abs(e.wheelDelta),
            n = 3 >= t || 120 === t && void 0 !== e.deltaY && 0 === Math.round(e.deltaY),
            o = event.wheelDeltaX && Math.abs(e.wheelDeltaX) > 3;
        return n || o ? 0 : e.wheelDelta > 0 ? 1 : -1
    });
    var p = function(e, l) {
        function p(e) {
            e.stopPropagation(), e.preventDefault()
        }

        function v(e) {
            2 !== e.button && (L = !0, w = 0, E.exit(), f.exit(), x.exit(), y = m, b = n(e), m.enter(b.x, b.y))
        }

        function c(e) {
            if (!1 !== L) {
                L = !1;
                var t = n(e);
                if (y.update(t.x, t.y), m.exit(), f.exit(), u > w) y = E, E.enter(t.x, t.y);
                else {
                    var o = m.getDragInfo();
                    y = x, x.enter(o), x.update(), MapLogReport.send({
                        da_src: "pcmapPanoPG.pano.slide"
                    })
                }
                w = 0
            }
        }

        function g(e) {
            return !0 === L ? void c(e) : (m.exit(), f.exit(), void x.exit())
        }

        function M(e) {
            e.stopPropagation();
            var t = n(e);
            !0 !== x.getDoingAnimation() && !0 !== L && y !== E && (E.exit(), m.exit(), x.exit(), y = f, f.enter(t.x, t.y)), !0 === L && (w += Math.abs(t.x - b.x) + Math.abs(t.y - b.y), b = t), y.update(t.x, t.y)
        }

        function h(e) {
            var t = o(e);
            0 !== t && O.dispatchEvent({
                type: s.ZOOM_CHANGED,
                data: t
            })
        }
        var E = new r,
            m = new i(l),
            f = new d,
            x = new a,
            L = !1,
            b = [0, 0],
            w = 0,
            y = f,
            D = !1,
            O = this;
        this.enable = function(n) {
            n !== D && (D = n, n ? (e.addEventListener("selectstart", p), e.addEventListener(t.START, v), e.addEventListener(t.MOVING, M), document.body.addEventListener(t.END, c), document.body.addEventListener(t.OUT, g), e.addEventListener("DOMMouseScroll", h), e.addEventListener(t.WHEEL, h)) : (e.removeEventListener("selectstart", p), e.removeEventListener(t.START, v), e.removeEventListener(t.MOVING, M), document.body.removeEventListener(t.END, c), document.body.removeEventListener(t.OUT, g), e.removeEventListener(t.WHEEL, h), e.removeEventListener("DOMMouseScroll", h)))
        };
        this.update = function() {
            if (void 0 !== y) {
                if (y === x && y.update(), y === m && y.update(), y === E) {
                    var e = y.getUpdateInfo();
                    return y.exit(), y = void 0, e
                }
                return y.getUpdateInfo()
            }
            return {}
        }, this.resize = function(e, t) {
            m.resize(e, t), f.resize(e, t), x.resize(e, t)
        }, this.dispose = function() {
            this.enable(!1), E.dispose(), m.dispose(), f.dispose(), x.dispose()
        }
    };
    return Four.EventDispatcher.prototype.apply(p.prototype), p
});;
define("pano:widget/module/PanoModule/WebglRender/event/EventType.js", function() {
    var a = function() {};
    return a.LOAD_PANORAMA_DATA_COMPLETED = "loadPanoramaDataCompleted", a.LOAD_PANORAMA_DATA_FAILED = "loadPanoramaDataFailed", a.PARSE_PANORAMA_DATA_FAILED = "parsePanoramaDataFailed", a.LOAD_INNER_PANORAMA_DATA_COMPLETED = "loadInnerPanoramaDataCompleted", a.LOAD_INNER_PANORAMA_DATA_FAILED = "loadInnerPanoramaDataFailed", a.PARSE_INNER_PANORAMA_DATA_FAILED = "parseInnerPanoramaDataFailed", a.LOAD_THUMBNAIL_COMPLETED = "loadThumbnailCompleted", a.LOAD_THUMBNAIL_FAILED = "loadThumbnailFailed", a.LOAD_TILE_COMPLETED = "loadTileCompleted", a.LOAD_TILE_QUEUE_COMPLETED = "loadTileQueueCompleted", a.LOAD_TOPO_TEXTURE_COMPLETED = "loadTopoTextureCompleted", a.LOAD_TOPO_TEXTURE_FAILED = "loadTopoTextureFailed", a.ID_CHANGED = "idChanged", a.POV_CHANGED = "povChanged", a.ZOOM_CHANGED = "zoomChanged", a.INTERFACE_READY = "interfaceReady", a.GO_TO_POI_COMPLETE = "gotoPOICompleted", a.DRAW_LINE_COMPLETED = "drawLineComplete", a.OUT_OF_NAVIGATION_RANGE = "outOfNavigationRange", a.MARKER_CLICKED = "markerClicked", a.ENTRANCE_MARKER_CLICKED = "entranceMarkerClicked", a.CLICKED_POSITION = "clickedPosition", a.TAG_MARKER_CLOSE = "tagMarkerCloseBtnClicked", a.TAG_MARKER_SUBMIT = "tagMarkerConfirmBtnClicked", a.OVERLAY_MOUSEOVER = "overlayMouseover", a.OVERLAY_MOUSEOUT = "overlayMouseout", a.OVERLAY_MOUSECLICK = "overlayMouseclick", a.TAG_MARKER_FOCUS = "tagMarkerFocus", a.TAG_MARKER_BLUR = "tagMarkerBlur", a.TAG_MARKER_CANCEL = "tagMarkerCancelBtnClicked", a.NO_PANORAMA_ERROR = "noPanoramaError", a.DESELECT_POI = "delselectPOI", a.SHOW_BILLION_PIXELS_DIALOG = "showBillionPixelsDialog", a.CHANGE_PANO_CLICKED = "changePano", a.ROTATE_PANO_CLICKED = "rotatePano", a
});;
define("pano:widget/module/PanoModule/WebglRender/lib/base64.js", function(e, r, t) {
    var n = {
        _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
        decodeArrayBuffer: function(e) {
            var r = e.length / 4 * 3,
                t = new ArrayBuffer(r);
            return this.decode(e, t), t
        },
        decode: function(e, r) {
            var t = this._keyStr.indexOf(e.charAt(e.length - 1)),
                n = this._keyStr.indexOf(e.charAt(e.length - 2)),
                i = e.length / 4 * 3;
            64 == t && i--, 64 == n && i--;
            var a, d, h, f, c, o, s, y, A = 0,
                l = 0;
            for (a = new Uint8Array(r ? r : i), e = e.replace(/[^A-Za-z0-9\+\/\=]/g, ""), A = 0; i > A; A += 3) c = this._keyStr.indexOf(e.charAt(l++)), o = this._keyStr.indexOf(e.charAt(l++)), s = this._keyStr.indexOf(e.charAt(l++)), y = this._keyStr.indexOf(e.charAt(l++)), d = c << 2 | o >> 4, h = (15 & o) << 4 | s >> 2, f = (3 & s) << 6 | y, a[A] = d, 64 != s && (a[A + 1] = h), 64 != y && (a[A + 2] = f);
            return a
        }
    };
    t.exports = n
});;
define("pano:widget/module/PanoModule/WebglRender/lib/DataStream.js", function() {
    var t = function(i, e, n) {
        this._byteOffset = e || 0, i instanceof ArrayBuffer ? this.buffer = i : "object" == typeof i ? (this.dataView = i, e && (this._byteOffset += e)) : this.buffer = new ArrayBuffer(i || 1), this.position = 0, this.endianness = null == n ? t.LITTLE_ENDIAN : n
    };
    return t.prototype = {}, void 0 === Uint8Array.prototype.BYTES_PER_ELEMENT && (Uint8Array.prototype.BYTES_PER_ELEMENT = Uint8Array.BYTES_PER_ELEMENT, Int8Array.prototype.BYTES_PER_ELEMENT = Int8Array.BYTES_PER_ELEMENT, Uint8ClampedArray.prototype.BYTES_PER_ELEMENT = Uint8ClampedArray.BYTES_PER_ELEMENT, Uint16Array.prototype.BYTES_PER_ELEMENT = Uint16Array.BYTES_PER_ELEMENT, Int16Array.prototype.BYTES_PER_ELEMENT = Int16Array.BYTES_PER_ELEMENT, Uint32Array.prototype.BYTES_PER_ELEMENT = Uint32Array.BYTES_PER_ELEMENT, Int32Array.prototype.BYTES_PER_ELEMENT = Int32Array.BYTES_PER_ELEMENT, Float64Array.prototype.BYTES_PER_ELEMENT = Float64Array.BYTES_PER_ELEMENT), t.prototype.save = function(t) {
        var i = new Blob(this.buffer),
            e = window.webkitURL || window.URL;
        if (!e || !e.createObjectURL) throw "DataStream.save: Can't create object URL.";
        var n = e.createObjectURL(i),
            r = document.createElement("a");
        r.setAttribute("href", n), r.setAttribute("download", t), r.click(), e.revokeObjectURL(n)
    }, t.BIG_ENDIAN = !1, t.LITTLE_ENDIAN = !0, t.prototype._dynamicSize = !0, Object.defineProperty(t.prototype, "dynamicSize", {
        get: function() {
            return this._dynamicSize
        },
        set: function(t) {
            t || this._trimAlloc(), this._dynamicSize = t
        }
    }), t.prototype._byteLength = 0, Object.defineProperty(t.prototype, "byteLength", {
        get: function() {
            return this._byteLength - this._byteOffset
        }
    }), Object.defineProperty(t.prototype, "buffer", {
        get: function() {
            return this._trimAlloc(), this._buffer
        },
        set: function(t) {
            this._buffer = t, this._dataView = new DataView(this._buffer, this._byteOffset), this._byteLength = this._buffer.byteLength
        }
    }), Object.defineProperty(t.prototype, "byteOffset", {
        get: function() {
            return this._byteOffset
        },
        set: function(t) {
            this._byteOffset = t, this._dataView = new DataView(this._buffer, this._byteOffset), this._byteLength = this._buffer.byteLength
        }
    }), Object.defineProperty(t.prototype, "dataView", {
        get: function() {
            return this._dataView
        },
        set: function(t) {
            this._byteOffset = t.byteOffset, this._buffer = t.buffer, this._dataView = new DataView(this._buffer, this._byteOffset), this._byteLength = this._byteOffset + t.byteLength
        }
    }), t.prototype._realloc = function(t) {
        if (this._dynamicSize) {
            var i = this._byteOffset + this.position + t,
                e = this._buffer.byteLength;
            if (e >= i) return void(i > this._byteLength && (this._byteLength = i));
            for (1 > e && (e = 1); i > e;) e *= 2;
            var n = new ArrayBuffer(e),
                r = new Uint8Array(this._buffer),
                s = new Uint8Array(n, 0, r.length);
            s.set(r), this.buffer = n, this._byteLength = i
        }
    }, t.prototype._trimAlloc = function() {
        if (this._byteLength != this._buffer.byteLength) {
            var t = new ArrayBuffer(this._byteLength),
                i = new Uint8Array(t),
                e = new Uint8Array(this._buffer, 0, i.length);
            i.set(e), this.buffer = t
        }
    }, t.prototype.seek = function(t) {
        var i = Math.max(0, Math.min(this.byteLength, t));
        this.position = isNaN(i) || !isFinite(i) ? 0 : i
    }, t.prototype.isEof = function() {
        return this.position >= this.byteLength
    }, t.prototype.mapInt32Array = function(i, e) {
        this._realloc(4 * i);
        var n = new Int32Array(this._buffer, this.byteOffset + this.position, i);
        return t.arrayToNative(n, null == e ? this.endianness : e), this.position += 4 * i, n
    }, t.prototype.mapInt16Array = function(i, e) {
        this._realloc(2 * i);
        var n = new Int16Array(this._buffer, this.byteOffset + this.position, i);
        return t.arrayToNative(n, null == e ? this.endianness : e), this.position += 2 * i, n
    }, t.prototype.mapInt8Array = function(t) {
        this._realloc(1 * t);
        var i = new Int8Array(this._buffer, this.byteOffset + this.position, t);
        return this.position += 1 * t, i
    }, t.prototype.mapUint32Array = function(i, e) {
        this._realloc(4 * i);
        var n = new Uint32Array(this._buffer, this.byteOffset + this.position, i);
        return t.arrayToNative(n, null == e ? this.endianness : e), this.position += 4 * i, n
    }, t.prototype.mapUint16Array = function(i, e) {
        this._realloc(2 * i);
        var n = new Uint16Array(this._buffer, this.byteOffset + this.position, i);
        return t.arrayToNative(n, null == e ? this.endianness : e), this.position += 2 * i, n
    }, t.prototype.mapUint8Array = function(t) {
        this._realloc(1 * t);
        var i = new Uint8Array(this._buffer, this.byteOffset + this.position, t);
        return this.position += 1 * t, i
    }, t.prototype.mapFloat64Array = function(i, e) {
        this._realloc(8 * i);
        var n = new Float64Array(this._buffer, this.byteOffset + this.position, i);
        return t.arrayToNative(n, null == e ? this.endianness : e), this.position += 8 * i, n
    }, t.prototype.mapFloat32Array = function(i, e) {
        this._realloc(4 * i);
        var n = new Float32Array(this._buffer, this.byteOffset + this.position, i);
        return t.arrayToNative(n, null == e ? this.endianness : e), this.position += 4 * i, n
    }, t.prototype.readInt32Array = function(i, e) {
        i = null == i ? this.byteLength - this.position / 4 : i;
        var n = new Int32Array(i);
        return t.memcpy(n.buffer, 0, this.buffer, this.byteOffset + this.position, i * n.BYTES_PER_ELEMENT), t.arrayToNative(n, null == e ? this.endianness : e), this.position += n.byteLength, n
    }, t.prototype.readInt16Array = function(i, e) {
        i = null == i ? this.byteLength - this.position / 2 : i;
        var n = new Int16Array(i);
        return t.memcpy(n.buffer, 0, this.buffer, this.byteOffset + this.position, i * n.BYTES_PER_ELEMENT), t.arrayToNative(n, null == e ? this.endianness : e), this.position += n.byteLength, n
    }, t.prototype.readInt8Array = function(i) {
        i = null == i ? this.byteLength - this.position : i;
        var e = new Int8Array(i);
        return t.memcpy(e.buffer, 0, this.buffer, this.byteOffset + this.position, i * e.BYTES_PER_ELEMENT), this.position += e.byteLength, e
    }, t.prototype.readUint32Array = function(i, e) {
        i = null == i ? this.byteLength - this.position / 4 : i;
        var n = new Uint32Array(i);
        return t.memcpy(n.buffer, 0, this.buffer, this.byteOffset + this.position, i * n.BYTES_PER_ELEMENT), t.arrayToNative(n, null == e ? this.endianness : e), this.position += n.byteLength, n
    }, t.prototype.readUint16Array = function(i, e) {
        i = null == i ? this.byteLength - this.position / 2 : i;
        var n = new Uint16Array(i);
        return t.memcpy(n.buffer, 0, this.buffer, this.byteOffset + this.position, i * n.BYTES_PER_ELEMENT), t.arrayToNative(n, null == e ? this.endianness : e), this.position += n.byteLength, n
    }, t.prototype.readUint8Array = function(i) {
        i = null == i ? this.byteLength - this.position : i;
        var e = new Uint8Array(i);
        return t.memcpy(e.buffer, 0, this.buffer, this.byteOffset + this.position, i * e.BYTES_PER_ELEMENT), this.position += e.byteLength, e
    }, t.prototype.readFloat64Array = function(i, e) {
        i = null == i ? this.byteLength - this.position / 8 : i;
        var n = new Float64Array(i);
        return t.memcpy(n.buffer, 0, this.buffer, this.byteOffset + this.position, i * n.BYTES_PER_ELEMENT), t.arrayToNative(n, null == e ? this.endianness : e), this.position += n.byteLength, n
    }, t.prototype.readFloat32Array = function(i, e) {
        i = null == i ? this.byteLength - this.position / 4 : i;
        var n = new Float32Array(i);
        return t.memcpy(n.buffer, 0, this.buffer, this.byteOffset + this.position, i * n.BYTES_PER_ELEMENT), t.arrayToNative(n, null == e ? this.endianness : e), this.position += n.byteLength, n
    }, t.prototype.writeInt32Array = function(i, e) {
        if (this._realloc(4 * i.length), i instanceof Int32Array && this.byteOffset + this.position % i.BYTES_PER_ELEMENT == 0) t.memcpy(this._buffer, this.byteOffset + this.position, i.buffer, 0, i.byteLength), this.mapInt32Array(i.length, e);
        else
            for (var n = 0; n < i.length; n++) this.writeInt32(i[n], e)
    }, t.prototype.writeInt16Array = function(i, e) {
        if (this._realloc(2 * i.length), i instanceof Int16Array && this.byteOffset + this.position % i.BYTES_PER_ELEMENT == 0) t.memcpy(this._buffer, this.byteOffset + this.position, i.buffer, 0, i.byteLength), this.mapInt16Array(i.length, e);
        else
            for (var n = 0; n < i.length; n++) this.writeInt16(i[n], e)
    }, t.prototype.writeInt8Array = function(i) {
        if (this._realloc(1 * i.length), i instanceof Int8Array && this.byteOffset + this.position % i.BYTES_PER_ELEMENT == 0) t.memcpy(this._buffer, this.byteOffset + this.position, i.buffer, 0, i.byteLength), this.mapInt8Array(i.length);
        else
            for (var e = 0; e < i.length; e++) this.writeInt8(i[e])
    }, t.prototype.writeUint32Array = function(i, e) {
        if (this._realloc(4 * i.length), i instanceof Uint32Array && this.byteOffset + this.position % i.BYTES_PER_ELEMENT == 0) t.memcpy(this._buffer, this.byteOffset + this.position, i.buffer, 0, i.byteLength), this.mapUint32Array(i.length, e);
        else
            for (var n = 0; n < i.length; n++) this.writeUint32(i[n], e)
    }, t.prototype.writeUint16Array = function(i, e) {
        if (this._realloc(2 * i.length), i instanceof Uint16Array && this.byteOffset + this.position % i.BYTES_PER_ELEMENT == 0) t.memcpy(this._buffer, this.byteOffset + this.position, i.buffer, 0, i.byteLength), this.mapUint16Array(i.length, e);
        else
            for (var n = 0; n < i.length; n++) this.writeUint16(i[n], e)
    }, t.prototype.writeUint8Array = function(i) {
        if (this._realloc(1 * i.length), i instanceof Uint8Array && this.byteOffset + this.position % i.BYTES_PER_ELEMENT == 0) t.memcpy(this._buffer, this.byteOffset + this.position, i.buffer, 0, i.byteLength), this.mapUint8Array(i.length);
        else
            for (var e = 0; e < i.length; e++) this.writeUint8(i[e])
    }, t.prototype.writeFloat64Array = function(i, e) {
        if (this._realloc(8 * i.length), i instanceof Float64Array && this.byteOffset + this.position % i.BYTES_PER_ELEMENT == 0) t.memcpy(this._buffer, this.byteOffset + this.position, i.buffer, 0, i.byteLength), this.mapFloat64Array(i.length, e);
        else
            for (var n = 0; n < i.length; n++) this.writeFloat64(i[n], e)
    }, t.prototype.writeFloat32Array = function(i, e) {
        if (this._realloc(4 * i.length), i instanceof Float32Array && this.byteOffset + this.position % i.BYTES_PER_ELEMENT == 0) t.memcpy(this._buffer, this.byteOffset + this.position, i.buffer, 0, i.byteLength), this.mapFloat32Array(i.length, e);
        else
            for (var n = 0; n < i.length; n++) this.writeFloat32(i[n], e)
    }, t.prototype.readInt32 = function(t) {
        var i = this._dataView.getInt32(this.position, null == t ? this.endianness : t);
        return this.position += 4, i
    }, t.prototype.readInt16 = function(t) {
        var i = this._dataView.getInt16(this.position, null == t ? this.endianness : t);
        return this.position += 2, i
    }, t.prototype.readInt8 = function() {
        var t = this._dataView.getInt8(this.position);
        return this.position += 1, t
    }, t.prototype.readUint32 = function(t) {
        var i = this._dataView.getUint32(this.position, null == t ? this.endianness : t);
        return this.position += 4, i
    }, t.prototype.readUint16 = function(t) {
        var i = this._dataView.getUint16(this.position, null == t ? this.endianness : t);
        return this.position += 2, i
    }, t.prototype.readUint8 = function() {
        var t = this._dataView.getUint8(this.position);
        return this.position += 1, t
    }, t.prototype.readFloat32 = function(t) {
        var i = this._dataView.getFloat32(this.position, null == t ? this.endianness : t);
        return this.position += 4, i
    }, t.prototype.readFloat64 = function(t) {
        var i = this._dataView.getFloat64(this.position, null == t ? this.endianness : t);
        return this.position += 8, i
    }, t.prototype.writeInt32 = function(t, i) {
        this._realloc(4), this._dataView.setInt32(this.position, t, null == i ? this.endianness : i), this.position += 4
    }, t.prototype.writeInt16 = function(t, i) {
        this._realloc(2), this._dataView.setInt16(this.position, t, null == i ? this.endianness : i), this.position += 2
    }, t.prototype.writeInt8 = function(t) {
        this._realloc(1), this._dataView.setInt8(this.position, t), this.position += 1
    }, t.prototype.writeUint32 = function(t, i) {
        this._realloc(4), this._dataView.setUint32(this.position, t, null == i ? this.endianness : i), this.position += 4
    }, t.prototype.writeUint16 = function(t, i) {
        this._realloc(2), this._dataView.setUint16(this.position, t, null == i ? this.endianness : i), this.position += 2
    }, t.prototype.writeUint8 = function(t) {
        this._realloc(1), this._dataView.setUint8(this.position, t), this.position += 1
    }, t.prototype.writeFloat32 = function(t, i) {
        this._realloc(4), this._dataView.setFloat32(this.position, t, null == i ? this.endianness : i), this.position += 4
    }, t.prototype.writeFloat64 = function(t, i) {
        this._realloc(8), this._dataView.setFloat64(this.position, t, null == i ? this.endianness : i), this.position += 8
    }, t.endianness = new Int8Array(new Int16Array([1]).buffer)[0] > 0, t.memcpy = function(t, i, e, n, r) {
        var s = new Uint8Array(t, i, r),
            a = new Uint8Array(e, n, r);
        s.set(a)
    }, t.arrayToNative = function(t, i) {
        return i == this.endianness ? t : this.flipArrayEndianness(t)
    }, t.nativeToEndian = function(t, i) {
        return this.endianness == i ? t : this.flipArrayEndianness(t)
    }, t.flipArrayEndianness = function(t) {
        for (var i = new Uint8Array(t.buffer, t.byteOffset, t.byteLength), e = 0; e < t.byteLength; e += t.BYTES_PER_ELEMENT)
            for (var n = e + t.BYTES_PER_ELEMENT - 1, r = e; n > r; n--, r++) {
                var s = i[r];
                i[r] = i[n], i[n] = s
            }
        return t
    }, t.createStringFromArray = function(t) {
        for (var i = "", e = 0; e < t.length; e++) i += String.fromCharCode(t[e]);
        return i
    }, t.prototype.failurePosition = 0, t.prototype.readStruct = function(t) {
        for (var i, e, n = {}, r = this.position, s = 0; s < t.length; s += 2) {
            if (i = t[s + 1], e = this.readType(i, n), null == e) return 0 == this.failurePosition && (this.failurePosition = this.position), this.position = r, null;
            n[t[s]] = e
        }
        return n
    }, t.prototype.readUCS2String = function(i, e) {
        return t.createStringFromArray(this.readUint16Array(i, e))
    }, t.prototype.writeUCS2String = function(t, i, e) {
        null == e && (e = t.length);
        for (var n = 0; n < t.length && e > n; n++) this.writeUint16(t.charCodeAt(n), i);
        for (; e > n; n++) this.writeUint16(0)
    }, t.prototype.readString = function(i, e) {
        return null == e || "ASCII" == e ? t.createStringFromArray(this.mapUint8Array(null == i ? this.byteLength - this.position : i)) : "undefined" == typeof TextDecoder ? (this.mapUint8Array(i), "") : new TextDecoder(e).decode(this.mapUint8Array(i))
    }, t.prototype.writeString = function(t, i, e) {
        if (null == i || "ASCII" == i || "undefined" == typeof TextEncoder)
            if (null != e) {
                var n = 0,
                    r = Math.min(t.length, e);
                for (n = 0; r > n; n++) this.writeUint8(t.charCodeAt(n));
                for (; e > n; n++) this.writeUint8(0)
            } else
                for (var n = 0; n < t.length; n++) this.writeUint8(t.charCodeAt(n));
        else this.writeUint8Array(new TextEncoder(i).encode(t.substring(0, e)))
    }, t.prototype.readCString = function(i) {
        var e = this.byteLength - this.position,
            n = new Uint8Array(this._buffer, this._byteOffset + this.position),
            r = e;
        null != i && (r = Math.min(i, e));
        for (var s = 0; r > s && 0 != n[s]; s++);
        var a = t.createStringFromArray(this.mapUint8Array(s));
        return null != i ? this.position += r - s : s != e && (this.position += 1), a
    }, t.prototype.writeCString = function(t, i) {
        if (null != i) {
            var e = 0,
                n = Math.min(t.length, i);
            for (e = 0; n > e; e++) this.writeUint8(t.charCodeAt(e));
            for (; i > e; e++) this.writeUint8(0)
        } else {
            for (var e = 0; e < t.length; e++) this.writeUint8(t.charCodeAt(e));
            this.writeUint8(0)
        }
    }, t.prototype.readType = function(i, e) {
        if ("function" == typeof i) return i(this, e);
        if (!("object" != typeof i || i instanceof Array)) return i.get(this, e);
        if (i instanceof Array && 3 != i.length) return this.readStruct(i, e);
        var n, r = null,
            s = null,
            a = "ASCII",
            o = this.position;
        if ("string" == typeof i && /:/.test(i)) {
            var h = i.split(":");
            i = h[0], n = h[1], s = parseInt(null != e[n] ? e[n] : h[1])
        }
        if ("string" == typeof i && /,/.test(i)) {
            var h = i.split(",");
            i = h[0], a = parseInt(h[1])
        }
        switch (i) {
            case "uint8":
                r = this.readUint8();
                break;
            case "int8":
                r = this.readInt8();
                break;
            case "uint16":
                r = this.readUint16(this.endianness);
                break;
            case "int16":
                r = this.readInt16(this.endianness);
                break;
            case "uint32":
                r = this.readUint32(this.endianness);
                break;
            case "int32":
                r = this.readInt32(this.endianness);
                break;
            case "float32":
                r = this.readFloat32(this.endianness);
                break;
            case "float64":
                r = this.readFloat64(this.endianness);
                break;
            case "uint16be":
                r = this.readUint16(t.BIG_ENDIAN);
                break;
            case "int16be":
                r = this.readInt16(t.BIG_ENDIAN);
                break;
            case "uint32be":
                r = this.readUint32(t.BIG_ENDIAN);
                break;
            case "int32be":
                r = this.readInt32(t.BIG_ENDIAN);
                break;
            case "float32be":
                r = this.readFloat32(t.BIG_ENDIAN);
                break;
            case "float64be":
                r = this.readFloat64(t.BIG_ENDIAN);
                break;
            case "uint16le":
                r = this.readUint16(t.LITTLE_ENDIAN);
                break;
            case "int16le":
                r = this.readInt16(t.LITTLE_ENDIAN);
                break;
            case "uint32le":
                r = this.readUint32(t.LITTLE_ENDIAN);
                break;
            case "int32le":
                r = this.readInt32(t.LITTLE_ENDIAN);
                break;
            case "float32le":
                r = this.readFloat32(t.LITTLE_ENDIAN);
                break;
            case "float64le":
                r = this.readFloat64(t.LITTLE_ENDIAN);
                break;
            case "cstring":
                r = this.readCString(s);
                break;
            case "string":
                r = this.readString(s, a);
                break;
            case "u16string":
                r = this.readUCS2String(s, this.endianness);
                break;
            case "u16stringle":
                r = this.readUCS2String(s, t.LITTLE_ENDIAN);
                break;
            case "u16stringbe":
                r = this.readUCS2String(s, t.BIG_ENDIAN);
                break;
            default:
                if (3 == i.length) {
                    var f = i[1],
                        n = i[2],
                        y = 0;
                    if (y = "function" == typeof n ? n(e, this, i) : parseInt("string" == typeof n && null != e[n] ? e[n] : n), "string" == typeof f) {
                        var p = f.replace(/(le|be)$/, ""),
                            l = null;
                        switch (/le$/.test(f) ? l = t.LITTLE_ENDIAN : /be$/.test(f) && (l = t.BIG_ENDIAN), "*" == n && (y = null), p) {
                            case "uint8":
                                r = this.readUint8Array(y);
                                break;
                            case "uint16":
                                r = this.readUint16Array(y, l);
                                break;
                            case "uint32":
                                r = this.readUint32Array(y, l);
                                break;
                            case "int8":
                                r = this.readInt8Array(y);
                                break;
                            case "int16":
                                r = this.readInt16Array(y, l);
                                break;
                            case "int32":
                                r = this.readInt32Array(y, l);
                                break;
                            case "float32":
                                r = this.readFloat32Array(y, l);
                                break;
                            case "float64":
                                r = this.readFloat64Array(y, l);
                                break;
                            case "cstring":
                            case "utf16string":
                            case "string":
                                if (null == y)
                                    for (r = []; !this.isEof();) {
                                        var u = this.readType(f, e);
                                        if (null == u) break;
                                        r.push(u)
                                    } else {
                                        r = new Array(y);
                                        for (var b = 0; y > b; b++) r[b] = this.readType(f, e)
                                    }
                        }
                    } else if ("*" == n)
                        for (r = [], this.buffer;;) {
                            var c = this.position;
                            try {
                                var E = this.readType(f, e);
                                if (null == E) {
                                    this.position = c;
                                    break
                                }
                                r.push(E)
                            } catch (_) {
                                this.position = c;
                                break
                            }
                        } else {
                            r = new Array(y);
                            for (var b = 0; y > b; b++) {
                                var u = this.readType(f, e);
                                if (null == u) return null;
                                r[b] = u
                            }
                        }
                    break
                }
        }
        return null != s && (this.position = o + s), r
    }, t.prototype.writeStruct = function(t, i) {
        for (var e = 0; e < t.length; e += 2) {
            var n = t[e + 1];
            this.writeType(n, i[t[e]], i)
        }
    }, t.prototype.writeType = function(i, e, n) {
        if ("function" == typeof i) return i(this, e);
        if ("object" == typeof i && !(i instanceof Array)) return i.set(this, e, n);
        var r = null,
            s = "ASCII",
            a = this.position;
        if ("string" == typeof i && /:/.test(i)) {
            var o = i.split(":");
            i = o[0], r = parseInt(o[1])
        }
        if ("string" == typeof i && /,/.test(i)) {
            var o = i.split(",");
            i = o[0], s = parseInt(o[1])
        }
        switch (i) {
            case "uint8":
                this.writeUint8(e);
                break;
            case "int8":
                this.writeInt8(e);
                break;
            case "uint16":
                this.writeUint16(e, this.endianness);
                break;
            case "int16":
                this.writeInt16(e, this.endianness);
                break;
            case "uint32":
                this.writeUint32(e, this.endianness);
                break;
            case "int32":
                this.writeInt32(e, this.endianness);
                break;
            case "float32":
                this.writeFloat32(e, this.endianness);
                break;
            case "float64":
                this.writeFloat64(e, this.endianness);
                break;
            case "uint16be":
                this.writeUint16(e, t.BIG_ENDIAN);
                break;
            case "int16be":
                this.writeInt16(e, t.BIG_ENDIAN);
                break;
            case "uint32be":
                this.writeUint32(e, t.BIG_ENDIAN);
                break;
            case "int32be":
                this.writeInt32(e, t.BIG_ENDIAN);
                break;
            case "float32be":
                this.writeFloat32(e, t.BIG_ENDIAN);
                break;
            case "float64be":
                this.writeFloat64(e, t.BIG_ENDIAN);
                break;
            case "uint16le":
                this.writeUint16(e, t.LITTLE_ENDIAN);
                break;
            case "int16le":
                this.writeInt16(e, t.LITTLE_ENDIAN);
                break;
            case "uint32le":
                this.writeUint32(e, t.LITTLE_ENDIAN);
                break;
            case "int32le":
                this.writeInt32(e, t.LITTLE_ENDIAN);
                break;
            case "float32le":
                this.writeFloat32(e, t.LITTLE_ENDIAN);
                break;
            case "float64le":
                this.writeFloat64(e, t.LITTLE_ENDIAN);
                break;
            case "cstring":
                this.writeCString(e, r);
                break;
            case "string":
                this.writeString(e, s, r);
                break;
            case "u16string":
                this.writeUCS2String(e, this.endianness, r);
                break;
            case "u16stringle":
                this.writeUCS2String(e, t.LITTLE_ENDIAN, r);
                break;
            case "u16stringbe":
                this.writeUCS2String(e, t.BIG_ENDIAN, r);
                break;
            default:
                if (3 == i.length) {
                    for (var h = i[1], f = 0; f < e.length; f++) this.writeType(h, e[f]);
                    break
                }
                this.writeStruct(i, e)
        }
        null != r && (this.position = a, this._realloc(r), this.position = a + r)
    }, t
});;
define("pano:widget/module/PanoModule/WebglRender/lib/utils/common.js", function(r, n) {
    "use strict";
    var t = "undefined" != typeof Uint8Array && "undefined" != typeof Uint16Array && "undefined" != typeof Int32Array;
    n.assign = function(r) {
        for (var n = Array.prototype.slice.call(arguments, 1); n.length;) {
            var t = n.shift();
            if (t) {
                if ("object" != typeof t) throw new TypeError(t + "must be non-object");
                for (var e in t) t.hasOwnProperty(e) && (r[e] = t[e])
            }
        }
        return r
    }, n.shrinkBuf = function(r, n) {
        return r.length === n ? r : r.subarray ? r.subarray(0, n) : (r.length = n, r)
    };
    var e = {
            arraySet: function(r, n, t, e, a) {
                if (n.subarray && r.subarray) return void r.set(n.subarray(t, t + e), a);
                for (var u = 0; e > u; u++) r[a + u] = n[t + u]
            },
            flattenChunks: function(r) {
                var n, t, e, a, u, f;
                for (e = 0, n = 0, t = r.length; t > n; n++) e += r[n].length;
                for (f = new Uint8Array(e), a = 0, n = 0, t = r.length; t > n; n++) u = r[n], f.set(u, a), a += u.length;
                return f
            }
        },
        a = {
            arraySet: function(r, n, t, e, a) {
                for (var u = 0; e > u; u++) r[a + u] = n[t + u]
            },
            flattenChunks: function(r) {
                return [].concat.apply([], r)
            }
        };
    n.setTyped = function(r) {
        r ? (n.Buf8 = Uint8Array, n.Buf16 = Uint16Array, n.Buf32 = Int32Array, n.assign(n, e)) : (n.Buf8 = Array, n.Buf16 = Array, n.Buf32 = Array, n.assign(n, a))
    }, n.setTyped(t)
});;
define("pano:widget/module/PanoModule/WebglRender/lib/zlib/adler32.js", function(e, n, o) {
    "use strict";

    function i(e, n, o, i) {
        for (var r = 65535 & e | 0, d = e >>> 16 & 65535 | 0, l = 0; 0 !== o;) {
            l = o > 2e3 ? 2e3 : o, o -= l;
            do r = r + n[i++] | 0, d = d + r | 0; while (--l);
            r %= 65521, d %= 65521
        }
        return r | d << 16 | 0
    }
    o.exports = i
});;
define("pano:widget/module/PanoModule/WebglRender/lib/zlib/crc32.js", function(r, e, n) {
    "use strict";

    function o() {
        for (var r, e = [], n = 0; 256 > n; n++) {
            r = n;
            for (var o = 0; 8 > o; o++) r = 1 & r ? 3988292384 ^ r >>> 1 : r >>> 1;
            e[n] = r
        }
        return e
    }

    function t(r, e, n, o) {
        var t = i,
            u = o + n;
        r = -1 ^ r;
        for (var a = o; u > a; a++) r = r >>> 8 ^ t[255 & (r ^ e[a])];
        return -1 ^ r
    }
    var i = o();
    n.exports = t
});;
define("pano:widget/module/PanoModule/WebglRender/lib/zlib/inffast.js", function(i, e, o) {
    "use strict";
    var a = 30,
        t = 12;
    o.exports = function(i, e) {
        var o, n, d, l, f, s, r, b, u, c, v, w, m, h, k, _, g, x, p, z, j, M, P, R, W;
        o = i.state, n = i.next_in, R = i.input, d = n + (i.avail_in - 5), l = i.next_out, W = i.output, f = l - (e - i.avail_out), s = l + (i.avail_out - 257), r = o.dmax, b = o.wsize, u = o.whave, c = o.wnext, v = o.window, w = o.hold, m = o.bits, h = o.lencode, k = o.distcode, _ = (1 << o.lenbits) - 1, g = (1 << o.distbits) - 1;
        i: do {
            15 > m && (w += R[n++] << m, m += 8, w += R[n++] << m, m += 8), x = h[w & _];
            e: for (;;) {
                if (p = x >>> 24, w >>>= p, m -= p, p = x >>> 16 & 255, 0 === p) W[l++] = 65535 & x;
                else {
                    if (!(16 & p)) {
                        if (0 === (64 & p)) {
                            x = h[(65535 & x) + (w & (1 << p) - 1)];
                            continue e
                        }
                        if (32 & p) {
                            o.mode = t;
                            break i
                        }
                        i.msg = "invalid literal/length code", o.mode = a;
                        break i
                    }
                    z = 65535 & x, p &= 15, p && (p > m && (w += R[n++] << m, m += 8), z += w & (1 << p) - 1, w >>>= p, m -= p), 15 > m && (w += R[n++] << m, m += 8, w += R[n++] << m, m += 8), x = k[w & g];
                    o: for (;;) {
                        if (p = x >>> 24, w >>>= p, m -= p, p = x >>> 16 & 255, !(16 & p)) {
                            if (0 === (64 & p)) {
                                x = k[(65535 & x) + (w & (1 << p) - 1)];
                                continue o
                            }
                            i.msg = "invalid distance code", o.mode = a;
                            break i
                        }
                        if (j = 65535 & x, p &= 15, p > m && (w += R[n++] << m, m += 8, p > m && (w += R[n++] << m, m += 8)), j += w & (1 << p) - 1, j > r) {
                            i.msg = "invalid distance too far back", o.mode = a;
                            break i
                        }
                        if (w >>>= p, m -= p, p = l - f, j > p) {
                            if (p = j - p, p > u && o.sane) {
                                i.msg = "invalid distance too far back", o.mode = a;
                                break i
                            }
                            if (M = 0, P = v, 0 === c) {
                                if (M += b - p, z > p) {
                                    z -= p;
                                    do W[l++] = v[M++]; while (--p);
                                    M = l - j, P = W
                                }
                            } else if (p > c) {
                                if (M += b + c - p, p -= c, z > p) {
                                    z -= p;
                                    do W[l++] = v[M++]; while (--p);
                                    if (M = 0, z > c) {
                                        p = c, z -= p;
                                        do W[l++] = v[M++]; while (--p);
                                        M = l - j, P = W
                                    }
                                }
                            } else if (M += c - p, z > p) {
                                z -= p;
                                do W[l++] = v[M++]; while (--p);
                                M = l - j, P = W
                            }
                            for (; z > 2;) W[l++] = P[M++], W[l++] = P[M++], W[l++] = P[M++], z -= 3;
                            z && (W[l++] = P[M++], z > 1 && (W[l++] = P[M++]))
                        } else {
                            M = l - j;
                            do W[l++] = W[M++], W[l++] = W[M++], W[l++] = W[M++], z -= 3; while (z > 2);
                            z && (W[l++] = W[M++], z > 1 && (W[l++] = W[M++]))
                        }
                        break
                    }
                }
                break
            }
        } while (d > n && s > l);
        z = m >> 3, n -= z, m -= z << 3, w &= (1 << m) - 1, i.next_in = n, i.next_out = l, i.avail_in = d > n ? 5 + (d - n) : 5 - (n - d), i.avail_out = s > l ? 257 + (s - l) : 257 - (l - s), o.hold = w, o.bits = m
    }
});;
define("pano:widget/module/PanoModule/WebglRender/lib/zlib/inftrees.js", function(r, e, f) {
    "use strict";
    var o = r("pano:widget/module/PanoModule/WebglRender/lib/utils/common.js"),
        i = 15,
        n = 852,
        t = 592,
        u = 0,
        l = 1,
        d = 2,
        s = [3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0],
        b = [16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 18, 18, 18, 18, 19, 19, 19, 19, 20, 20, 20, 20, 21, 21, 21, 21, 16, 72, 78],
        a = [1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577, 0, 0],
        w = [16, 16, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22, 23, 23, 24, 24, 25, 25, 26, 26, 27, 27, 28, 28, 29, 29, 64, 64];
    f.exports = function(r, e, f, c, g, m, p, v) {
        var j, B, M, P, R, W, h, k, x, z = v.bits,
            q = 0,
            y = 0,
            A = 0,
            C = 0,
            D = 0,
            E = 0,
            F = 0,
            G = 0,
            H = 0,
            I = 0,
            J = null,
            K = 0,
            L = new o.Buf16(i + 1),
            N = new o.Buf16(i + 1),
            O = null,
            Q = 0;
        for (q = 0; i >= q; q++) L[q] = 0;
        for (y = 0; c > y; y++) L[e[f + y]]++;
        for (D = z, C = i; C >= 1 && 0 === L[C]; C--);
        if (D > C && (D = C), 0 === C) return g[m++] = 20971520, g[m++] = 20971520, v.bits = 1, 0;
        for (A = 1; C > A && 0 === L[A]; A++);
        for (A > D && (D = A), G = 1, q = 1; i >= q; q++)
            if (G <<= 1, G -= L[q], 0 > G) return -1;
        if (G > 0 && (r === u || 1 !== C)) return -1;
        for (N[1] = 0, q = 1; i > q; q++) N[q + 1] = N[q] + L[q];
        for (y = 0; c > y; y++) 0 !== e[f + y] && (p[N[e[f + y]]++] = y);
        if (r === u ? (J = O = p, W = 19) : r === l ? (J = s, K -= 257, O = b, Q -= 257, W = 256) : (J = a, O = w, W = -1), I = 0, y = 0, q = A, R = m, E = D, F = 0, M = -1, H = 1 << D, P = H - 1, r === l && H > n || r === d && H > t) return 1;
        for (var S = 0;;) {
            S++, h = q - F, p[y] < W ? (k = 0, x = p[y]) : p[y] > W ? (k = O[Q + p[y]], x = J[K + p[y]]) : (k = 96, x = 0), j = 1 << q - F, B = 1 << E, A = B;
            do B -= j, g[R + (I >> F) + B] = h << 24 | k << 16 | x | 0; while (0 !== B);
            for (j = 1 << q - 1; I & j;) j >>= 1;
            if (0 !== j ? (I &= j - 1, I += j) : I = 0, y++, 0 === --L[q]) {
                if (q === C) break;
                q = e[f + p[y]]
            }
            if (q > D && (I & P) !== M) {
                for (0 === F && (F = D), R += A, E = q - F, G = 1 << E; C > E + F && (G -= L[E + F], !(0 >= G));) E++, G <<= 1;
                if (H += 1 << E, r === l && H > n || r === d && H > t) return 1;
                M = I & P, g[M] = D << 24 | E << 16 | R - m | 0
            }
        }
        return 0 !== I && (g[R + I] = q - F << 24 | 64 << 16 | 0), v.bits = D, 0
    }
});;
define("pano:widget/module/PanoModule/WebglRender/lib/zlib/inflate.js", function(e, a) {
    "use strict";

    function t(e) {
        return (e >>> 24 & 255) + (e >>> 8 & 65280) + ((65280 & e) << 8) + ((255 & e) << 24)
    }

    function i() {
        this.mode = 0, this.last = !1, this.wrap = 0, this.havedict = !1, this.flags = 0, this.dmax = 0, this.check = 0, this.total = 0, this.head = null, this.wbits = 0, this.wsize = 0, this.whave = 0, this.wnext = 0, this.window = null, this.hold = 0, this.bits = 0, this.length = 0, this.offset = 0, this.extra = 0, this.lencode = null, this.distcode = null, this.lenbits = 0, this.distbits = 0, this.ncode = 0, this.nlen = 0, this.ndist = 0, this.have = 0, this.next = null, this.lens = new w.Buf16(320), this.work = new w.Buf16(288), this.lendyn = null, this.distdyn = null, this.sane = 0, this.back = 0, this.was = 0
    }

    function n(e) {
        var a;
        return e && e.state ? (a = e.state, e.total_in = e.total_out = a.total = 0, e.msg = "", a.wrap && (e.adler = 1 & a.wrap), a.mode = E, a.last = 0, a.havedict = 0, a.dmax = 32768, a.head = null, a.hold = 0, a.bits = 0, a.lencode = a.lendyn = new w.Buf32(ba), a.distcode = a.distdyn = new w.Buf32(ka), a.sane = 1, a.back = -1, j) : P
    }

    function s(e) {
        var a;
        return e && e.state ? (a = e.state, a.wsize = 0, a.whave = 0, a.wnext = 0, n(e)) : P
    }

    function o(e, a) {
        var t, i;
        return e && e.state ? (i = e.state, 0 > a ? (t = 0, a = -a) : (t = (a >> 4) + 1, 48 > a && (a &= 15)), a && (8 > a || a > 15) ? P : (null !== i.window && i.wbits !== a && (i.window = null), i.wrap = t, i.wbits = a, s(e))) : P
    }

    function l(e, a) {
        var t, n;
        return e ? (n = new i, e.state = n, n.window = null, t = o(e, a), t !== j && (e.state = null), t) : P
    }

    function d(e) {
        return l(e, wa)
    }

    function r(e) {
        if (ua) {
            var a;
            for (k = new w.Buf32(512), m = new w.Buf32(32), a = 0; 144 > a;) e.lens[a++] = 8;
            for (; 256 > a;) e.lens[a++] = 9;
            for (; 280 > a;) e.lens[a++] = 7;
            for (; 288 > a;) e.lens[a++] = 8;
            for (x(p, e.lens, 0, 288, k, 0, e.work, {
                    bits: 9
                }), a = 0; 32 > a;) e.lens[a++] = 5;
            x(z, e.lens, 0, 32, m, 0, e.work, {
                bits: 5
            }), ua = !1
        }
        e.lencode = k, e.lenbits = 9, e.distcode = m, e.distbits = 5
    }

    function f(e, a, t, i) {
        var n, s = e.state;
        return null === s.window && (s.wsize = 1 << s.wbits, s.wnext = 0, s.whave = 0, s.window = new w.Buf8(s.wsize)), i >= s.wsize ? (w.arraySet(s.window, a, t - s.wsize, s.wsize, 0), s.wnext = 0, s.whave = s.wsize) : (n = s.wsize - s.wnext, n > i && (n = i), w.arraySet(s.window, a, t - i, n, s.wnext), i -= n, i ? (w.arraySet(s.window, a, t - i, i, 0), s.wnext = i, s.whave = s.wsize) : (s.wnext += n, s.wnext === s.wsize && (s.wnext = 0), s.whave < s.wsize && (s.whave += n))), 0
    }

    function c(e, a) {
        var i, n, s, o, l, d, c, h, b, k, m, ba, ka, ma, wa, ua, ga, va, xa, _a, pa, za, ya, Ra, Ba = 0,
            ja = new w.Buf8(4),
            Sa = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15];
        if (!e || !e.state || !e.output || !e.input && 0 !== e.avail_in) return P;
        i = e.state, i.mode === Q && (i.mode = T), l = e.next_out, s = e.output, c = e.avail_out, o = e.next_in, n = e.input, d = e.avail_in, h = i.hold, b = i.bits, k = d, m = c, za = j;
        e: for (;;) switch (i.mode) {
            case E:
                if (0 === i.wrap) {
                    i.mode = T;
                    break
                }
                for (; 16 > b;) {
                    if (0 === d) break e;
                    d--, h += n[o++] << b, b += 8
                }
                if (2 & i.wrap && 35615 === h) {
                    i.check = 0, ja[0] = 255 & h, ja[1] = h >>> 8 & 255, i.check = g(i.check, ja, 2, 0), h = 0, b = 0, i.mode = G;
                    break
                }
                if (i.flags = 0, i.head && (i.head.done = !1), !(1 & i.wrap) || (((255 & h) << 8) + (h >> 8)) % 31) {
                    e.msg = "incorrect header check", i.mode = fa;
                    break
                }
                if ((15 & h) !== A) {
                    e.msg = "unknown compression method", i.mode = fa;
                    break
                }
                if (h >>>= 4, b -= 4, pa = (15 & h) + 8, 0 === i.wbits) i.wbits = pa;
                else if (pa > i.wbits) {
                    e.msg = "invalid window size", i.mode = fa;
                    break
                }
                i.dmax = 1 << pa, e.adler = i.check = 1, i.mode = 512 & h ? L : Q, h = 0, b = 0;
                break;
            case G:
                for (; 16 > b;) {
                    if (0 === d) break e;
                    d--, h += n[o++] << b, b += 8
                }
                if (i.flags = h, (255 & i.flags) !== A) {
                    e.msg = "unknown compression method", i.mode = fa;
                    break
                }
                if (57344 & i.flags) {
                    e.msg = "unknown header flags set", i.mode = fa;
                    break
                }
                i.head && (i.head.text = h >> 8 & 1), 512 & i.flags && (ja[0] = 255 & h, ja[1] = h >>> 8 & 255, i.check = g(i.check, ja, 2, 0)), h = 0, b = 0, i.mode = H;
            case H:
                for (; 32 > b;) {
                    if (0 === d) break e;
                    d--, h += n[o++] << b, b += 8
                }
                i.head && (i.head.time = h), 512 & i.flags && (ja[0] = 255 & h, ja[1] = h >>> 8 & 255, ja[2] = h >>> 16 & 255, ja[3] = h >>> 24 & 255, i.check = g(i.check, ja, 4, 0)), h = 0, b = 0, i.mode = K;
            case K:
                for (; 16 > b;) {
                    if (0 === d) break e;
                    d--, h += n[o++] << b, b += 8
                }
                i.head && (i.head.xflags = 255 & h, i.head.os = h >> 8), 512 & i.flags && (ja[0] = 255 & h, ja[1] = h >>> 8 & 255, i.check = g(i.check, ja, 2, 0)), h = 0, b = 0, i.mode = N;
            case N:
                if (1024 & i.flags) {
                    for (; 16 > b;) {
                        if (0 === d) break e;
                        d--, h += n[o++] << b, b += 8
                    }
                    i.length = h, i.head && (i.head.extra_len = h), 512 & i.flags && (ja[0] = 255 & h, ja[1] = h >>> 8 & 255, i.check = g(i.check, ja, 2, 0)), h = 0, b = 0
                } else i.head && (i.head.extra = null);
                i.mode = q;
            case q:
                if (1024 & i.flags && (ba = i.length, ba > d && (ba = d), ba && (i.head && (pa = i.head.extra_len - i.length, i.head.extra || (i.head.extra = new Array(i.head.extra_len)), w.arraySet(i.head.extra, n, o, ba, pa)), 512 & i.flags && (i.check = g(i.check, n, ba, o)), d -= ba, o += ba, i.length -= ba), i.length)) break e;
                i.length = 0, i.mode = D;
            case D:
                if (2048 & i.flags) {
                    if (0 === d) break e;
                    ba = 0;
                    do pa = n[o + ba++], i.head && pa && i.length < 65536 && (i.head.name += String.fromCharCode(pa)); while (pa && d > ba);
                    if (512 & i.flags && (i.check = g(i.check, n, ba, o)), d -= ba, o += ba, pa) break e
                } else i.head && (i.head.name = null);
                i.length = 0, i.mode = F;
            case F:
                if (4096 & i.flags) {
                    if (0 === d) break e;
                    ba = 0;
                    do pa = n[o + ba++], i.head && pa && i.length < 65536 && (i.head.comment += String.fromCharCode(pa)); while (pa && d > ba);
                    if (512 & i.flags && (i.check = g(i.check, n, ba, o)), d -= ba, o += ba, pa) break e
                } else i.head && (i.head.comment = null);
                i.mode = J;
            case J:
                if (512 & i.flags) {
                    for (; 16 > b;) {
                        if (0 === d) break e;
                        d--, h += n[o++] << b, b += 8
                    }
                    if (h !== (65535 & i.check)) {
                        e.msg = "header crc mismatch", i.mode = fa;
                        break
                    }
                    h = 0, b = 0
                }
                i.head && (i.head.hcrc = i.flags >> 9 & 1, i.head.done = !0), e.adler = i.check = 0, i.mode = Q;
                break;
            case L:
                for (; 32 > b;) {
                    if (0 === d) break e;
                    d--, h += n[o++] << b, b += 8
                }
                e.adler = i.check = t(h), h = 0, b = 0, i.mode = O;
            case O:
                if (0 === i.havedict) return e.next_out = l, e.avail_out = c, e.next_in = o, e.avail_in = d, i.hold = h, i.bits = b, M;
                e.adler = i.check = 1, i.mode = Q;
            case Q:
                if (a === R || a === B) break e;
            case T:
                if (i.last) {
                    h >>>= 7 & b, b -= 7 & b, i.mode = la;
                    break
                }
                for (; 3 > b;) {
                    if (0 === d) break e;
                    d--, h += n[o++] << b, b += 8
                }
                switch (i.last = 1 & h, h >>>= 1, b -= 1, 3 & h) {
                    case 0:
                        i.mode = U;
                        break;
                    case 1:
                        if (r(i), i.mode = ea, a === B) {
                            h >>>= 2, b -= 2;
                            break e
                        }
                        break;
                    case 2:
                        i.mode = Y;
                        break;
                    case 3:
                        e.msg = "invalid block type", i.mode = fa
                }
                h >>>= 2, b -= 2;
                break;
            case U:
                for (h >>>= 7 & b, b -= 7 & b; 32 > b;) {
                    if (0 === d) break e;
                    d--, h += n[o++] << b, b += 8
                }
                if ((65535 & h) !== (h >>> 16 ^ 65535)) {
                    e.msg = "invalid stored block lengths", i.mode = fa;
                    break
                }
                if (i.length = 65535 & h, h = 0, b = 0, i.mode = V, a === B) break e;
            case V:
                i.mode = X;
            case X:
                if (ba = i.length) {
                    if (ba > d && (ba = d), ba > c && (ba = c), 0 === ba) break e;
                    w.arraySet(s, n, o, ba, l), d -= ba, o += ba, c -= ba, l += ba, i.length -= ba;
                    break
                }
                i.mode = Q;
                break;
            case Y:
                for (; 14 > b;) {
                    if (0 === d) break e;
                    d--, h += n[o++] << b, b += 8
                }
                if (i.nlen = (31 & h) + 257, h >>>= 5, b -= 5, i.ndist = (31 & h) + 1, h >>>= 5, b -= 5, i.ncode = (15 & h) + 4, h >>>= 4, b -= 4, i.nlen > 286 || i.ndist > 30) {
                    e.msg = "too many length or distance symbols", i.mode = fa;
                    break
                }
                i.have = 0, i.mode = Z;
            case Z:
                for (; i.have < i.ncode;) {
                    for (; 3 > b;) {
                        if (0 === d) break e;
                        d--, h += n[o++] << b, b += 8
                    }
                    i.lens[Sa[i.have++]] = 7 & h, h >>>= 3, b -= 3
                }
                for (; i.have < 19;) i.lens[Sa[i.have++]] = 0;
                if (i.lencode = i.lendyn, i.lenbits = 7, ya = {
                        bits: i.lenbits
                    }, za = x(_, i.lens, 0, 19, i.lencode, 0, i.work, ya), i.lenbits = ya.bits, za) {
                    e.msg = "invalid code lengths set", i.mode = fa;
                    break
                }
                i.have = 0, i.mode = $;
            case $:
                for (; i.have < i.nlen + i.ndist;) {
                    for (; Ba = i.lencode[h & (1 << i.lenbits) - 1], wa = Ba >>> 24, ua = Ba >>> 16 & 255, ga = 65535 & Ba, !(b >= wa);) {
                        if (0 === d) break e;
                        d--, h += n[o++] << b, b += 8
                    }
                    if (16 > ga) h >>>= wa, b -= wa, i.lens[i.have++] = ga;
                    else {
                        if (16 === ga) {
                            for (Ra = wa + 2; Ra > b;) {
                                if (0 === d) break e;
                                d--, h += n[o++] << b, b += 8
                            }
                            if (h >>>= wa, b -= wa, 0 === i.have) {
                                e.msg = "invalid bit length repeat", i.mode = fa;
                                break
                            }
                            pa = i.lens[i.have - 1], ba = 3 + (3 & h), h >>>= 2, b -= 2
                        } else if (17 === ga) {
                            for (Ra = wa + 3; Ra > b;) {
                                if (0 === d) break e;
                                d--, h += n[o++] << b, b += 8
                            }
                            h >>>= wa, b -= wa, pa = 0, ba = 3 + (7 & h), h >>>= 3, b -= 3
                        } else {
                            for (Ra = wa + 7; Ra > b;) {
                                if (0 === d) break e;
                                d--, h += n[o++] << b, b += 8
                            }
                            h >>>= wa, b -= wa, pa = 0, ba = 11 + (127 & h), h >>>= 7, b -= 7
                        }
                        if (i.have + ba > i.nlen + i.ndist) {
                            e.msg = "invalid bit length repeat", i.mode = fa;
                            break
                        }
                        for (; ba--;) i.lens[i.have++] = pa
                    }
                }
                if (i.mode === fa) break;
                if (0 === i.lens[256]) {
                    e.msg = "invalid code -- missing end-of-block", i.mode = fa;
                    break
                }
                if (i.lenbits = 9, ya = {
                        bits: i.lenbits
                    }, za = x(p, i.lens, 0, i.nlen, i.lencode, 0, i.work, ya), i.lenbits = ya.bits, za) {
                    e.msg = "invalid literal/lengths set", i.mode = fa;
                    break
                }
                if (i.distbits = 6, i.distcode = i.distdyn, ya = {
                        bits: i.distbits
                    }, za = x(z, i.lens, i.nlen, i.ndist, i.distcode, 0, i.work, ya), i.distbits = ya.bits, za) {
                    e.msg = "invalid distances set", i.mode = fa;
                    break
                }
                if (i.mode = ea, a === B) break e;
            case ea:
                i.mode = aa;
            case aa:
                if (d >= 6 && c >= 258) {
                    e.next_out = l, e.avail_out = c, e.next_in = o, e.avail_in = d, i.hold = h, i.bits = b, v(e, m), l = e.next_out, s = e.output, c = e.avail_out, o = e.next_in, n = e.input, d = e.avail_in, h = i.hold, b = i.bits, i.mode === Q && (i.back = -1);
                    break
                }
                for (i.back = 0; Ba = i.lencode[h & (1 << i.lenbits) - 1], wa = Ba >>> 24, ua = Ba >>> 16 & 255, ga = 65535 & Ba, !(b >= wa);) {
                    if (0 === d) break e;
                    d--, h += n[o++] << b, b += 8
                }
                if (ua && 0 === (240 & ua)) {
                    for (va = wa, xa = ua, _a = ga; Ba = i.lencode[_a + ((h & (1 << va + xa) - 1) >> va)], wa = Ba >>> 24, ua = Ba >>> 16 & 255, ga = 65535 & Ba, !(b >= va + wa);) {
                        if (0 === d) break e;
                        d--, h += n[o++] << b, b += 8
                    }
                    h >>>= va, b -= va, i.back += va
                }
                if (h >>>= wa, b -= wa, i.back += wa, i.length = ga, 0 === ua) {
                    i.mode = oa;
                    break
                }
                if (32 & ua) {
                    i.back = -1, i.mode = Q;
                    break
                }
                if (64 & ua) {
                    e.msg = "invalid literal/length code", i.mode = fa;
                    break
                }
                i.extra = 15 & ua, i.mode = ta;
            case ta:
                if (i.extra) {
                    for (Ra = i.extra; Ra > b;) {
                        if (0 === d) break e;
                        d--, h += n[o++] << b, b += 8
                    }
                    i.length += h & (1 << i.extra) - 1, h >>>= i.extra, b -= i.extra, i.back += i.extra
                }
                i.was = i.length, i.mode = ia;
            case ia:
                for (; Ba = i.distcode[h & (1 << i.distbits) - 1], wa = Ba >>> 24, ua = Ba >>> 16 & 255, ga = 65535 & Ba, !(b >= wa);) {
                    if (0 === d) break e;
                    d--, h += n[o++] << b, b += 8
                }
                if (0 === (240 & ua)) {
                    for (va = wa, xa = ua, _a = ga; Ba = i.distcode[_a + ((h & (1 << va + xa) - 1) >> va)], wa = Ba >>> 24, ua = Ba >>> 16 & 255, ga = 65535 & Ba, !(b >= va + wa);) {
                        if (0 === d) break e;
                        d--, h += n[o++] << b, b += 8
                    }
                    h >>>= va, b -= va, i.back += va
                }
                if (h >>>= wa, b -= wa, i.back += wa, 64 & ua) {
                    e.msg = "invalid distance code", i.mode = fa;
                    break
                }
                i.offset = ga, i.extra = 15 & ua, i.mode = na;
            case na:
                if (i.extra) {
                    for (Ra = i.extra; Ra > b;) {
                        if (0 === d) break e;
                        d--, h += n[o++] << b, b += 8
                    }
                    i.offset += h & (1 << i.extra) - 1, h >>>= i.extra, b -= i.extra, i.back += i.extra
                }
                if (i.offset > i.dmax) {
                    e.msg = "invalid distance too far back", i.mode = fa;
                    break
                }
                i.mode = sa;
            case sa:
                if (0 === c) break e;
                if (ba = m - c, i.offset > ba) {
                    if (ba = i.offset - ba, ba > i.whave && i.sane) {
                        e.msg = "invalid distance too far back", i.mode = fa;
                        break
                    }
                    ba > i.wnext ? (ba -= i.wnext, ka = i.wsize - ba) : ka = i.wnext - ba, ba > i.length && (ba = i.length), ma = i.window
                } else ma = s, ka = l - i.offset, ba = i.length;
                ba > c && (ba = c), c -= ba, i.length -= ba;
                do s[l++] = ma[ka++]; while (--ba);
                0 === i.length && (i.mode = aa);
                break;
            case oa:
                if (0 === c) break e;
                s[l++] = i.length, c--, i.mode = aa;
                break;
            case la:
                if (i.wrap) {
                    for (; 32 > b;) {
                        if (0 === d) break e;
                        d--, h |= n[o++] << b, b += 8
                    }
                    if (m -= c, e.total_out += m, i.total += m, m && (e.adler = i.check = i.flags ? g(i.check, s, m, l - m) : u(i.check, s, m, l - m)), m = c, (i.flags ? h : t(h)) !== i.check) {
                        e.msg = "incorrect data check", i.mode = fa;
                        break
                    }
                    h = 0, b = 0
                }
                i.mode = da;
            case da:
                if (i.wrap && i.flags) {
                    for (; 32 > b;) {
                        if (0 === d) break e;
                        d--, h += n[o++] << b, b += 8
                    }
                    if (h !== (4294967295 & i.total)) {
                        e.msg = "incorrect length check", i.mode = fa;
                        break
                    }
                    h = 0, b = 0
                }
                i.mode = ra;
            case ra:
                za = S;
                break e;
            case fa:
                za = W;
                break e;
            case ca:
                return C;
            case ha:
            default:
                return P
        }
        return e.next_out = l, e.avail_out = c, e.next_in = o, e.avail_in = d, i.hold = h, i.bits = b, (i.wsize || m !== e.avail_out && i.mode < fa && (i.mode < la || a !== y)) && f(e, e.output, e.next_out, m - e.avail_out) ? (i.mode = ca, C) : (k -= e.avail_in, m -= e.avail_out, e.total_in += k, e.total_out += m, i.total += m, i.wrap && m && (e.adler = i.check = i.flags ? g(i.check, s, m, e.next_out - m) : u(i.check, s, m, e.next_out - m)), e.data_type = i.bits + (i.last ? 64 : 0) + (i.mode === Q ? 128 : 0) + (i.mode === ea || i.mode === V ? 256 : 0), (0 === k && 0 === m || a === y) && za === j && (za = I), za)
    }

    function h(e) {
        if (!e || !e.state) return P;
        var a = e.state;
        return a.window && (a.window = null), e.state = null, j
    }

    function b(e, a) {
        var t;
        return e && e.state ? (t = e.state, 0 === (2 & t.wrap) ? P : (t.head = a, a.done = !1, j)) : P
    }
    var k, m, w = e("pano:widget/module/PanoModule/WebglRender/lib/utils/common.js"),
        u = e("pano:widget/module/PanoModule/WebglRender/lib/zlib/adler32.js"),
        g = e("pano:widget/module/PanoModule/WebglRender/lib/zlib/crc32.js"),
        v = e("pano:widget/module/PanoModule/WebglRender/lib/zlib/inffast.js"),
        x = e("pano:widget/module/PanoModule/WebglRender/lib/zlib/inftrees.js"),
        _ = 0,
        p = 1,
        z = 2,
        y = 4,
        R = 5,
        B = 6,
        j = 0,
        S = 1,
        M = 2,
        P = -2,
        W = -3,
        C = -4,
        I = -5,
        A = 8,
        E = 1,
        G = 2,
        H = 3,
        K = 4,
        N = 5,
        q = 6,
        D = 7,
        F = 8,
        J = 9,
        L = 10,
        O = 11,
        Q = 12,
        T = 13,
        U = 14,
        V = 15,
        X = 16,
        Y = 17,
        Z = 18,
        $ = 19,
        ea = 20,
        aa = 21,
        ta = 22,
        ia = 23,
        na = 24,
        sa = 25,
        oa = 26,
        la = 27,
        da = 28,
        ra = 29,
        fa = 30,
        ca = 31,
        ha = 32,
        ba = 852,
        ka = 592,
        ma = 15,
        wa = ma,
        ua = !0;
    a.inflateReset = s, a.inflateReset2 = o, a.inflateResetKeep = n, a.inflateInit = d, a.inflateInit2 = l, a.inflate = c, a.inflateEnd = h, a.inflateGetHeader = b, a.inflateInfo = "pako inflate (from Nodeca project)"
});;
define("pano:widget/module/PanoModule/WebglRender/lib/utils/strings.js", function(r, n) {
    "use strict";

    function e(r, n) {
        if (65537 > n && (r.subarray && u || !r.subarray && o)) return String.fromCharCode.apply(null, t.shrinkBuf(r, n));
        for (var e = "", f = 0; n > f; f++) e += String.fromCharCode(r[f]);
        return e
    }
    var t = r("pano:widget/module/PanoModule/WebglRender/lib/utils/common.js"),
        o = !0,
        u = !0;
    try {
        String.fromCharCode.apply(null, [0])
    } catch (f) {
        o = !1
    }
    try {
        String.fromCharCode.apply(null, new Uint8Array(1))
    } catch (f) {
        u = !1
    }
    for (var a = new t.Buf8(256), i = 0; 256 > i; i++) a[i] = i >= 252 ? 6 : i >= 248 ? 5 : i >= 240 ? 4 : i >= 224 ? 3 : i >= 192 ? 2 : 1;
    a[254] = a[254] = 1, n.string2buf = function(r) {
        var n, e, o, u, f, a = r.length,
            i = 0;
        for (u = 0; a > u; u++) e = r.charCodeAt(u), 55296 === (64512 & e) && a > u + 1 && (o = r.charCodeAt(u + 1), 56320 === (64512 & o) && (e = 65536 + (e - 55296 << 10) + (o - 56320), u++)), i += 128 > e ? 1 : 2048 > e ? 2 : 65536 > e ? 3 : 4;
        for (n = new t.Buf8(i), f = 0, u = 0; i > f; u++) e = r.charCodeAt(u), 55296 === (64512 & e) && a > u + 1 && (o = r.charCodeAt(u + 1), 56320 === (64512 & o) && (e = 65536 + (e - 55296 << 10) + (o - 56320), u++)), 128 > e ? n[f++] = e : 2048 > e ? (n[f++] = 192 | e >>> 6, n[f++] = 128 | 63 & e) : 65536 > e ? (n[f++] = 224 | e >>> 12, n[f++] = 128 | e >>> 6 & 63, n[f++] = 128 | 63 & e) : (n[f++] = 240 | e >>> 18, n[f++] = 128 | e >>> 12 & 63, n[f++] = 128 | e >>> 6 & 63, n[f++] = 128 | 63 & e);
        return n
    }, n.buf2binstring = function(r) {
        return e(r, r.length)
    }, n.binstring2buf = function(r) {
        for (var n = new t.Buf8(r.length), e = 0, o = n.length; o > e; e++) n[e] = r.charCodeAt(e);
        return n
    }, n.buf2string = function(r, n) {
        var t, o, u, f, i = n || r.length,
            l = new Array(2 * i);
        for (o = 0, t = 0; i > t;)
            if (u = r[t++], 128 > u) l[o++] = u;
            else if (f = a[u], f > 4) l[o++] = 65533, t += f - 1;
        else {
            for (u &= 2 === f ? 31 : 3 === f ? 15 : 7; f > 1 && i > t;) u = u << 6 | 63 & r[t++], f--;
            f > 1 ? l[o++] = 65533 : 65536 > u ? l[o++] = u : (u -= 65536, l[o++] = 55296 | u >> 10 & 1023, l[o++] = 56320 | 1023 & u)
        }
        return e(l, o)
    }, n.utf8border = function(r, n) {
        var e;
        for (n = n || r.length, n > r.length && (n = r.length), e = n - 1; e >= 0 && 128 === (192 & r[e]);) e--;
        return 0 > e ? n : 0 === e ? n : e + a[r[e]] > n ? e : n
    }
});;
define("pano:widget/module/PanoModule/WebglRender/lib/zlib/constants.js", function(_, E, Z) {
    Z.exports = {
        Z_NO_FLUSH: 0,
        Z_PARTIAL_FLUSH: 1,
        Z_SYNC_FLUSH: 2,
        Z_FULL_FLUSH: 3,
        Z_FINISH: 4,
        Z_BLOCK: 5,
        Z_TREES: 6,
        Z_OK: 0,
        Z_STREAM_END: 1,
        Z_NEED_DICT: 2,
        Z_ERRNO: -1,
        Z_STREAM_ERROR: -2,
        Z_DATA_ERROR: -3,
        Z_BUF_ERROR: -5,
        Z_NO_COMPRESSION: 0,
        Z_BEST_SPEED: 1,
        Z_BEST_COMPRESSION: 9,
        Z_DEFAULT_COMPRESSION: -1,
        Z_FILTERED: 1,
        Z_HUFFMAN_ONLY: 2,
        Z_RLE: 3,
        Z_FIXED: 4,
        Z_DEFAULT_STRATEGY: 0,
        Z_BINARY: 0,
        Z_TEXT: 1,
        Z_UNKNOWN: 2,
        Z_DEFLATED: 8
    }
});;
define("pano:widget/module/PanoModule/WebglRender/lib/zlib/messages.js", function(e, r, i) {
    "use strict";
    i.exports = {
        2: "need dictionary",
        1: "stream end",
        0: "",
        "-1": "file error",
        "-2": "stream error",
        "-3": "data error",
        "-4": "insufficient memory",
        "-5": "buffer error",
        "-6": "incompatible version"
    }
});;
define("pano:widget/module/PanoModule/WebglRender/lib/zlib/zstream.js", function(t, i, s) {
    "use strict";

    function n() {
        this.input = null, this.next_in = 0, this.avail_in = 0, this.total_in = 0, this.output = null, this.next_out = 0, this.avail_out = 0, this.total_out = 0, this.msg = "", this.state = null, this.data_type = 2, this.adler = 0
    }
    s.exports = n
});;
define("pano:widget/module/PanoModule/WebglRender/lib/zlib/gzheader.js", function(t, e, i) {
    "use strict";

    function s() {
        this.text = 0, this.time = 0, this.xflags = 0, this.os = 0, this.extra = null, this.extra_len = 0, this.name = "", this.comment = "", this.hcrc = 0, this.done = !1
    }
    i.exports = s
});;
define("pano:widget/module/PanoModule/WebglRender/lib/inflate.js", function(t, i) {
    "use strict";

    function n(t, i) {
        var n = new h(i);
        if (n.push(t, !0), n.err) throw n.msg;
        return n.result
    }

    function e(t, i) {
        return i = i || {}, i.raw = !0, n(t, i)
    }
    var o = t("pano:widget/module/PanoModule/WebglRender/lib/zlib/inflate.js"),
        s = t("pano:widget/module/PanoModule/WebglRender/lib/utils/common.js"),
        u = t("pano:widget/module/PanoModule/WebglRender/lib/utils/strings.js"),
        r = t("pano:widget/module/PanoModule/WebglRender/lib/zlib/constants.js"),
        a = t("pano:widget/module/PanoModule/WebglRender/lib/zlib/messages.js"),
        d = t("pano:widget/module/PanoModule/WebglRender/lib/zlib/zstream.js"),
        l = t("pano:widget/module/PanoModule/WebglRender/lib/zlib/gzheader.js"),
        w = Object.prototype.toString,
        h = function(t) {
            this.options = s.assign({
                chunkSize: 16384,
                windowBits: 0,
                to: ""
            }, t || {});
            var i = this.options;
            i.raw && i.windowBits >= 0 && i.windowBits < 16 && (i.windowBits = -i.windowBits, 0 === i.windowBits && (i.windowBits = -15)), !(i.windowBits >= 0 && i.windowBits < 16) || t && t.windowBits || (i.windowBits += 32), i.windowBits > 15 && i.windowBits < 48 && 0 === (15 & i.windowBits) && (i.windowBits |= 15), this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new d, this.strm.avail_out = 0;
            var n = o.inflateInit2(this.strm, i.windowBits);
            if (n !== r.Z_OK) throw new Error(a[n]);
            this.header = new l, o.inflateGetHeader(this.strm, this.header)
        };
    h.prototype.push = function(t, i) {
        var n, e, a, d, l, h = this.strm,
            _ = this.options.chunkSize;
        if (this.ended) return !1;
        e = i === ~~i ? i : i === !0 ? r.Z_FINISH : r.Z_NO_FLUSH, h.input = "string" == typeof t ? u.binstring2buf(t) : "[object ArrayBuffer]" === w.call(t) ? new Uint8Array(t) : t, h.next_in = 0, h.avail_in = h.input.length;
        do {
            if (0 === h.avail_out && (h.output = new s.Buf8(_), h.next_out = 0, h.avail_out = _), n = o.inflate(h, r.Z_NO_FLUSH), n !== r.Z_STREAM_END && n !== r.Z_OK) return this.onEnd(n), this.ended = !0, !1;
            h.next_out && (0 === h.avail_out || n === r.Z_STREAM_END || 0 === h.avail_in && e === r.Z_FINISH) && ("string" === this.options.to ? (a = u.utf8border(h.output, h.next_out), d = h.next_out - a, l = u.buf2string(h.output, a), h.next_out = d, h.avail_out = _ - d, d && s.arraySet(h.output, h.output, a, d, 0), this.onData(l)) : this.onData(s.shrinkBuf(h.output, h.next_out)))
        } while (h.avail_in > 0 && n !== r.Z_STREAM_END);
        return n === r.Z_STREAM_END && (e = r.Z_FINISH), e === r.Z_FINISH ? (n = o.inflateEnd(this.strm), this.onEnd(n), this.ended = !0, n === r.Z_OK) : !0
    }, h.prototype.onData = function(t) {
        this.chunks.push(t)
    }, h.prototype.onEnd = function(t) {
        t === r.Z_OK && (this.result = "string" === this.options.to ? this.chunks.join("") : s.flattenChunks(this.chunks)), this.chunks = [], this.err = t, this.msg = this.strm.msg
    }, i.Inflate = h, i.inflate = n, i.inflateRaw = e, i.ungzip = n
});;
define("pano:widget/module/PanoModule/WebglRender/lib/Four.js", function() {
    ! function() {
        var t = function() {
                var t = {};
                if (!e) var e = 1e-6;
                if (!r) var r = "undefined" != typeof Float32Array ? Float32Array : Array;
                if (!i) var i = Math.random;
                var n = {};
                n.setMatrixArrayType = function(t) {
                    r = t
                }, "undefined" != typeof t && (t.glMatrix = n);
                var o = Math.PI / 180;
                n.toRadian = function(t) {
                    return t * o
                };
                var a = {};
                a.create = function() {
                    var t = new r(2);
                    return t[0] = 0, t[1] = 0, t
                }, a.clone = function(t) {
                    var e = new r(2);
                    return e[0] = t[0], e[1] = t[1], e
                }, a.fromValues = function(t, e) {
                    var i = new r(2);
                    return i[0] = t, i[1] = e, i
                }, a.copy = function(t, e) {
                    return t[0] = e[0], t[1] = e[1], t
                }, a.set = function(t, e, r) {
                    return t[0] = e, t[1] = r, t
                }, a.add = function(t, e, r) {
                    return t[0] = e[0] + r[0], t[1] = e[1] + r[1], t
                }, a.subtract = function(t, e, r) {
                    return t[0] = e[0] - r[0], t[1] = e[1] - r[1], t
                }, a.sub = a.subtract, a.multiply = function(t, e, r) {
                    return t[0] = e[0] * r[0], t[1] = e[1] * r[1], t
                }, a.mul = a.multiply, a.divide = function(t, e, r) {
                    return t[0] = e[0] / r[0], t[1] = e[1] / r[1], t
                }, a.div = a.divide, a.min = function(t, e, r) {
                    return t[0] = Math.min(e[0], r[0]), t[1] = Math.min(e[1], r[1]), t
                }, a.max = function(t, e, r) {
                    return t[0] = Math.max(e[0], r[0]), t[1] = Math.max(e[1], r[1]), t
                }, a.scale = function(t, e, r) {
                    return t[0] = e[0] * r, t[1] = e[1] * r, t
                }, a.scaleAndAdd = function(t, e, r, i) {
                    return t[0] = e[0] + r[0] * i, t[1] = e[1] + r[1] * i, t
                }, a.distance = function(t, e) {
                    var r = e[0] - t[0],
                        i = e[1] - t[1];
                    return Math.sqrt(r * r + i * i)
                }, a.dist = a.distance, a.squaredDistance = function(t, e) {
                    var r = e[0] - t[0],
                        i = e[1] - t[1];
                    return r * r + i * i
                }, a.sqrDist = a.squaredDistance, a.length = function(t) {
                    var e = t[0],
                        r = t[1];
                    return Math.sqrt(e * e + r * r)
                }, a.len = a.length, a.squaredLength = function(t) {
                    var e = t[0],
                        r = t[1];
                    return e * e + r * r
                }, a.sqrLen = a.squaredLength, a.negate = function(t, e) {
                    return t[0] = -e[0], t[1] = -e[1], t
                }, a.inverse = function(t, e) {
                    return t[0] = 1 / e[0], t[1] = 1 / e[1], t
                }, a.normalize = function(t, e) {
                    var r = e[0],
                        i = e[1],
                        n = r * r + i * i;
                    return n > 0 && (n = 1 / Math.sqrt(n), t[0] = e[0] * n, t[1] = e[1] * n), t
                }, a.dot = function(t, e) {
                    return t[0] * e[0] + t[1] * e[1]
                }, a.cross = function(t, e, r) {
                    var i = e[0] * r[1] - e[1] * r[0];
                    return t[0] = t[1] = 0, t[2] = i, t
                }, a.lerp = function(t, e, r, i) {
                    var n = e[0],
                        o = e[1];
                    return t[0] = n + i * (r[0] - n), t[1] = o + i * (r[1] - o), t
                }, a.random = function(t, e) {
                    e = e || 1;
                    var r = 2 * i() * Math.PI;
                    return t[0] = Math.cos(r) * e, t[1] = Math.sin(r) * e, t
                }, a.transformMat2 = function(t, e, r) {
                    var i = e[0],
                        n = e[1];
                    return t[0] = r[0] * i + r[2] * n, t[1] = r[1] * i + r[3] * n, t
                }, a.transformMat2d = function(t, e, r) {
                    var i = e[0],
                        n = e[1];
                    return t[0] = r[0] * i + r[2] * n + r[4], t[1] = r[1] * i + r[3] * n + r[5], t
                }, a.transformMat3 = function(t, e, r) {
                    var i = e[0],
                        n = e[1];
                    return t[0] = r[0] * i + r[3] * n + r[6], t[1] = r[1] * i + r[4] * n + r[7], t
                }, a.transformMat4 = function(t, e, r) {
                    var i = e[0],
                        n = e[1];
                    return t[0] = r[0] * i + r[4] * n + r[12], t[1] = r[1] * i + r[5] * n + r[13], t
                }, a.forEach = function() {
                    var t = a.create();
                    return function(e, r, i, n, o, a) {
                        var s, u;
                        for (r || (r = 2), i || (i = 0), u = n ? Math.min(n * r + i, e.length) : e.length, s = i; u > s; s += r) t[0] = e[s], t[1] = e[s + 1], o(t, t, a), e[s] = t[0], e[s + 1] = t[1];
                        return e
                    }
                }(), a.str = function(t) {
                    return "vec2(" + t[0] + ", " + t[1] + ")"
                }, "undefined" != typeof t && (t.vec2 = a);
                var s = {};
                s.create = function() {
                    var t = new r(3);
                    return t[0] = 0, t[1] = 0, t[2] = 0, t
                }, s.clone = function(t) {
                    var e = new r(3);
                    return e[0] = t[0], e[1] = t[1], e[2] = t[2], e
                }, s.fromValues = function(t, e, i) {
                    var n = new r(3);
                    return n[0] = t, n[1] = e, n[2] = i, n
                }, s.copy = function(t, e) {
                    return t[0] = e[0], t[1] = e[1], t[2] = e[2], t
                }, s.set = function(t, e, r, i) {
                    return t[0] = e, t[1] = r, t[2] = i, t
                }, s.add = function(t, e, r) {
                    return t[0] = e[0] + r[0], t[1] = e[1] + r[1], t[2] = e[2] + r[2], t
                }, s.subtract = function(t, e, r) {
                    return t[0] = e[0] - r[0], t[1] = e[1] - r[1], t[2] = e[2] - r[2], t
                }, s.sub = s.subtract, s.multiply = function(t, e, r) {
                    return t[0] = e[0] * r[0], t[1] = e[1] * r[1], t[2] = e[2] * r[2], t
                }, s.mul = s.multiply, s.divide = function(t, e, r) {
                    return t[0] = e[0] / r[0], t[1] = e[1] / r[1], t[2] = e[2] / r[2], t
                }, s.div = s.divide, s.min = function(t, e, r) {
                    return t[0] = Math.min(e[0], r[0]), t[1] = Math.min(e[1], r[1]), t[2] = Math.min(e[2], r[2]), t
                }, s.max = function(t, e, r) {
                    return t[0] = Math.max(e[0], r[0]), t[1] = Math.max(e[1], r[1]), t[2] = Math.max(e[2], r[2]), t
                }, s.scale = function(t, e, r) {
                    return t[0] = e[0] * r, t[1] = e[1] * r, t[2] = e[2] * r, t
                }, s.scaleAndAdd = function(t, e, r, i) {
                    return t[0] = e[0] + r[0] * i, t[1] = e[1] + r[1] * i, t[2] = e[2] + r[2] * i, t
                }, s.distance = function(t, e) {
                    var r = e[0] - t[0],
                        i = e[1] - t[1],
                        n = e[2] - t[2];
                    return Math.sqrt(r * r + i * i + n * n)
                }, s.dist = s.distance, s.squaredDistance = function(t, e) {
                    var r = e[0] - t[0],
                        i = e[1] - t[1],
                        n = e[2] - t[2];
                    return r * r + i * i + n * n
                }, s.sqrDist = s.squaredDistance, s.length = function(t) {
                    var e = t[0],
                        r = t[1],
                        i = t[2];
                    return Math.sqrt(e * e + r * r + i * i)
                }, s.len = s.length, s.squaredLength = function(t) {
                    var e = t[0],
                        r = t[1],
                        i = t[2];
                    return e * e + r * r + i * i
                }, s.sqrLen = s.squaredLength, s.negate = function(t, e) {
                    return t[0] = -e[0], t[1] = -e[1], t[2] = -e[2], t
                }, s.inverse = function(t, e) {
                    return t[0] = 1 / e[0], t[1] = 1 / e[1], t[2] = 1 / e[2], t
                }, s.normalize = function(t, e) {
                    var r = e[0],
                        i = e[1],
                        n = e[2],
                        o = r * r + i * i + n * n;
                    return o > 0 && (o = 1 / Math.sqrt(o), t[0] = e[0] * o, t[1] = e[1] * o, t[2] = e[2] * o), t
                }, s.dot = function(t, e) {
                    return t[0] * e[0] + t[1] * e[1] + t[2] * e[2]
                }, s.cross = function(t, e, r) {
                    var i = e[0],
                        n = e[1],
                        o = e[2],
                        a = r[0],
                        s = r[1],
                        u = r[2];
                    return t[0] = n * u - o * s, t[1] = o * a - i * u, t[2] = i * s - n * a, t
                }, s.lerp = function(t, e, r, i) {
                    var n = e[0],
                        o = e[1],
                        a = e[2];
                    return t[0] = n + i * (r[0] - n), t[1] = o + i * (r[1] - o), t[2] = a + i * (r[2] - a), t
                }, s.random = function(t, e) {
                    e = e || 1;
                    var r = 2 * i() * Math.PI,
                        n = 2 * i() - 1,
                        o = Math.sqrt(1 - n * n) * e;
                    return t[0] = Math.cos(r) * o, t[1] = Math.sin(r) * o, t[2] = n * e, t
                }, s.transformMat4 = function(t, e, r) {
                    var i = e[0],
                        n = e[1],
                        o = e[2],
                        a = r[3] * i + r[7] * n + r[11] * o + r[15];
                    return a = a || 1, t[0] = (r[0] * i + r[4] * n + r[8] * o + r[12]) / a, t[1] = (r[1] * i + r[5] * n + r[9] * o + r[13]) / a, t[2] = (r[2] * i + r[6] * n + r[10] * o + r[14]) / a, t
                }, s.transformMat3 = function(t, e, r) {
                    var i = e[0],
                        n = e[1],
                        o = e[2];
                    return t[0] = i * r[0] + n * r[3] + o * r[6], t[1] = i * r[1] + n * r[4] + o * r[7], t[2] = i * r[2] + n * r[5] + o * r[8], t
                }, s.transformQuat = function(t, e, r) {
                    var i = e[0],
                        n = e[1],
                        o = e[2],
                        a = r[0],
                        s = r[1],
                        u = r[2],
                        c = r[3],
                        f = c * i + s * o - u * n,
                        h = c * n + u * i - a * o,
                        l = c * o + a * n - s * i,
                        d = -a * i - s * n - u * o;
                    return t[0] = f * c + d * -a + h * -u - l * -s, t[1] = h * c + d * -s + l * -a - f * -u, t[2] = l * c + d * -u + f * -s - h * -a, t
                }, s.rotateX = function(t, e, r, i) {
                    var n = [],
                        o = [];
                    return n[0] = e[0] - r[0], n[1] = e[1] - r[1], n[2] = e[2] - r[2], o[0] = n[0], o[1] = n[1] * Math.cos(i) - n[2] * Math.sin(i), o[2] = n[1] * Math.sin(i) + n[2] * Math.cos(i), t[0] = o[0] + r[0], t[1] = o[1] + r[1], t[2] = o[2] + r[2], t
                }, s.rotateY = function(t, e, r, i) {
                    var n = [],
                        o = [];
                    return n[0] = e[0] - r[0], n[1] = e[1] - r[1], n[2] = e[2] - r[2], o[0] = n[2] * Math.sin(i) + n[0] * Math.cos(i), o[1] = n[1], o[2] = n[2] * Math.cos(i) - n[0] * Math.sin(i), t[0] = o[0] + r[0], t[1] = o[1] + r[1], t[2] = o[2] + r[2], t
                }, s.rotateZ = function(t, e, r, i) {
                    var n = [],
                        o = [];
                    return n[0] = e[0] - r[0], n[1] = e[1] - r[1], n[2] = e[2] - r[2], o[0] = n[0] * Math.cos(i) - n[1] * Math.sin(i), o[1] = n[0] * Math.sin(i) + n[1] * Math.cos(i), o[2] = n[2], t[0] = o[0] + r[0], t[1] = o[1] + r[1], t[2] = o[2] + r[2], t
                }, s.forEach = function() {
                    var t = s.create();
                    return function(e, r, i, n, o, a) {
                        var s, u;
                        for (r || (r = 3), i || (i = 0), u = n ? Math.min(n * r + i, e.length) : e.length, s = i; u > s; s += r) t[0] = e[s], t[1] = e[s + 1], t[2] = e[s + 2], o(t, t, a), e[s] = t[0], e[s + 1] = t[1], e[s + 2] = t[2];
                        return e
                    }
                }(), s.str = function(t) {
                    return "vec3(" + t[0] + ", " + t[1] + ", " + t[2] + ")"
                }, "undefined" != typeof t && (t.vec3 = s);
                var u = {};
                u.create = function() {
                    var t = new r(4);
                    return t[0] = 0, t[1] = 0, t[2] = 0, t[3] = 0, t
                }, u.clone = function(t) {
                    var e = new r(4);
                    return e[0] = t[0], e[1] = t[1], e[2] = t[2], e[3] = t[3], e
                }, u.fromValues = function(t, e, i, n) {
                    var o = new r(4);
                    return o[0] = t, o[1] = e, o[2] = i, o[3] = n, o
                }, u.copy = function(t, e) {
                    return t[0] = e[0], t[1] = e[1], t[2] = e[2], t[3] = e[3], t
                }, u.set = function(t, e, r, i, n) {
                    return t[0] = e, t[1] = r, t[2] = i, t[3] = n, t
                }, u.add = function(t, e, r) {
                    return t[0] = e[0] + r[0], t[1] = e[1] + r[1], t[2] = e[2] + r[2], t[3] = e[3] + r[3], t
                }, u.subtract = function(t, e, r) {
                    return t[0] = e[0] - r[0], t[1] = e[1] - r[1], t[2] = e[2] - r[2], t[3] = e[3] - r[3], t
                }, u.sub = u.subtract, u.multiply = function(t, e, r) {
                    return t[0] = e[0] * r[0], t[1] = e[1] * r[1], t[2] = e[2] * r[2], t[3] = e[3] * r[3], t
                }, u.mul = u.multiply, u.divide = function(t, e, r) {
                    return t[0] = e[0] / r[0], t[1] = e[1] / r[1], t[2] = e[2] / r[2], t[3] = e[3] / r[3], t
                }, u.div = u.divide, u.min = function(t, e, r) {
                    return t[0] = Math.min(e[0], r[0]), t[1] = Math.min(e[1], r[1]), t[2] = Math.min(e[2], r[2]), t[3] = Math.min(e[3], r[3]), t
                }, u.max = function(t, e, r) {
                    return t[0] = Math.max(e[0], r[0]), t[1] = Math.max(e[1], r[1]), t[2] = Math.max(e[2], r[2]), t[3] = Math.max(e[3], r[3]), t
                }, u.scale = function(t, e, r) {
                    return t[0] = e[0] * r, t[1] = e[1] * r, t[2] = e[2] * r, t[3] = e[3] * r, t
                }, u.scaleAndAdd = function(t, e, r, i) {
                    return t[0] = e[0] + r[0] * i, t[1] = e[1] + r[1] * i, t[2] = e[2] + r[2] * i, t[3] = e[3] + r[3] * i, t
                }, u.distance = function(t, e) {
                    var r = e[0] - t[0],
                        i = e[1] - t[1],
                        n = e[2] - t[2],
                        o = e[3] - t[3];
                    return Math.sqrt(r * r + i * i + n * n + o * o)
                }, u.dist = u.distance, u.squaredDistance = function(t, e) {
                    var r = e[0] - t[0],
                        i = e[1] - t[1],
                        n = e[2] - t[2],
                        o = e[3] - t[3];
                    return r * r + i * i + n * n + o * o
                }, u.sqrDist = u.squaredDistance, u.length = function(t) {
                    var e = t[0],
                        r = t[1],
                        i = t[2],
                        n = t[3];
                    return Math.sqrt(e * e + r * r + i * i + n * n)
                }, u.len = u.length, u.squaredLength = function(t) {
                    var e = t[0],
                        r = t[1],
                        i = t[2],
                        n = t[3];
                    return e * e + r * r + i * i + n * n
                }, u.sqrLen = u.squaredLength, u.negate = function(t, e) {
                    return t[0] = -e[0], t[1] = -e[1], t[2] = -e[2], t[3] = -e[3], t
                }, u.inverse = function(t, e) {
                    return t[0] = 1 / e[0], t[1] = 1 / e[1], t[2] = 1 / e[2], t[3] = 1 / e[3], t
                }, u.normalize = function(t, e) {
                    var r = e[0],
                        i = e[1],
                        n = e[2],
                        o = e[3],
                        a = r * r + i * i + n * n + o * o;
                    return a > 0 && (a = 1 / Math.sqrt(a), t[0] = e[0] * a, t[1] = e[1] * a, t[2] = e[2] * a, t[3] = e[3] * a), t
                }, u.dot = function(t, e) {
                    return t[0] * e[0] + t[1] * e[1] + t[2] * e[2] + t[3] * e[3]
                }, u.lerp = function(t, e, r, i) {
                    var n = e[0],
                        o = e[1],
                        a = e[2],
                        s = e[3];
                    return t[0] = n + i * (r[0] - n), t[1] = o + i * (r[1] - o), t[2] = a + i * (r[2] - a), t[3] = s + i * (r[3] - s), t
                }, u.random = function(t, e) {
                    return e = e || 1, t[0] = i(), t[1] = i(), t[2] = i(), t[3] = i(), u.normalize(t, t), u.scale(t, t, e), t
                }, u.transformMat4 = function(t, e, r) {
                    var i = e[0],
                        n = e[1],
                        o = e[2],
                        a = e[3];
                    return t[0] = r[0] * i + r[4] * n + r[8] * o + r[12] * a, t[1] = r[1] * i + r[5] * n + r[9] * o + r[13] * a, t[2] = r[2] * i + r[6] * n + r[10] * o + r[14] * a, t[3] = r[3] * i + r[7] * n + r[11] * o + r[15] * a, t
                }, u.transformQuat = function(t, e, r) {
                    var i = e[0],
                        n = e[1],
                        o = e[2],
                        a = r[0],
                        s = r[1],
                        u = r[2],
                        c = r[3],
                        f = c * i + s * o - u * n,
                        h = c * n + u * i - a * o,
                        l = c * o + a * n - s * i,
                        d = -a * i - s * n - u * o;
                    return t[0] = f * c + d * -a + h * -u - l * -s, t[1] = h * c + d * -s + l * -a - f * -u, t[2] = l * c + d * -u + f * -s - h * -a, t
                }, u.forEach = function() {
                    var t = u.create();
                    return function(e, r, i, n, o, a) {
                        var s, u;
                        for (r || (r = 4), i || (i = 0), u = n ? Math.min(n * r + i, e.length) : e.length, s = i; u > s; s += r) t[0] = e[s], t[1] = e[s + 1], t[2] = e[s + 2], t[3] = e[s + 3], o(t, t, a), e[s] = t[0], e[s + 1] = t[1], e[s + 2] = t[2], e[s + 3] = t[3];
                        return e
                    }
                }(), u.str = function(t) {
                    return "vec4(" + t[0] + ", " + t[1] + ", " + t[2] + ", " + t[3] + ")"
                }, "undefined" != typeof t && (t.vec4 = u);
                var c = {};
                c.create = function() {
                    var t = new r(4);
                    return t[0] = 1, t[1] = 0, t[2] = 0, t[3] = 1, t
                }, c.clone = function(t) {
                    var e = new r(4);
                    return e[0] = t[0], e[1] = t[1], e[2] = t[2], e[3] = t[3], e
                }, c.copy = function(t, e) {
                    return t[0] = e[0], t[1] = e[1], t[2] = e[2], t[3] = e[3], t
                }, c.identity = function(t) {
                    return t[0] = 1, t[1] = 0, t[2] = 0, t[3] = 1, t
                }, c.transpose = function(t, e) {
                    if (t === e) {
                        var r = e[1];
                        t[1] = e[2], t[2] = r
                    } else t[0] = e[0], t[1] = e[2], t[2] = e[1], t[3] = e[3];
                    return t
                }, c.invert = function(t, e) {
                    var r = e[0],
                        i = e[1],
                        n = e[2],
                        o = e[3],
                        a = r * o - n * i;
                    return a ? (a = 1 / a, t[0] = o * a, t[1] = -i * a, t[2] = -n * a, t[3] = r * a, t) : null
                }, c.adjoint = function(t, e) {
                    var r = e[0];
                    return t[0] = e[3], t[1] = -e[1], t[2] = -e[2], t[3] = r, t
                }, c.determinant = function(t) {
                    return t[0] * t[3] - t[2] * t[1]
                }, c.multiply = function(t, e, r) {
                    var i = e[0],
                        n = e[1],
                        o = e[2],
                        a = e[3],
                        s = r[0],
                        u = r[1],
                        c = r[2],
                        f = r[3];
                    return t[0] = i * s + o * u, t[1] = n * s + a * u, t[2] = i * c + o * f, t[3] = n * c + a * f, t
                }, c.mul = c.multiply, c.rotate = function(t, e, r) {
                    var i = e[0],
                        n = e[1],
                        o = e[2],
                        a = e[3],
                        s = Math.sin(r),
                        u = Math.cos(r);
                    return t[0] = i * u + o * s, t[1] = n * u + a * s, t[2] = i * -s + o * u, t[3] = n * -s + a * u, t
                }, c.scale = function(t, e, r) {
                    var i = e[0],
                        n = e[1],
                        o = e[2],
                        a = e[3],
                        s = r[0],
                        u = r[1];
                    return t[0] = i * s, t[1] = n * s, t[2] = o * u, t[3] = a * u, t
                }, c.str = function(t) {
                    return "mat2(" + t[0] + ", " + t[1] + ", " + t[2] + ", " + t[3] + ")"
                }, c.frob = function(t) {
                    return Math.sqrt(Math.pow(t[0], 2) + Math.pow(t[1], 2) + Math.pow(t[2], 2) + Math.pow(t[3], 2))
                }, c.LDU = function(t, e, r, i) {
                    return t[2] = i[2] / i[0], r[0] = i[0], r[1] = i[1], r[3] = i[3] - t[2] * r[1], [t, e, r]
                }, "undefined" != typeof t && (t.mat2 = c);
                var f = {};
                f.create = function() {
                    var t = new r(6);
                    return t[0] = 1, t[1] = 0, t[2] = 0, t[3] = 1, t[4] = 0, t[5] = 0, t
                }, f.clone = function(t) {
                    var e = new r(6);
                    return e[0] = t[0], e[1] = t[1], e[2] = t[2], e[3] = t[3], e[4] = t[4], e[5] = t[5], e
                }, f.copy = function(t, e) {
                    return t[0] = e[0], t[1] = e[1], t[2] = e[2], t[3] = e[3], t[4] = e[4], t[5] = e[5], t
                }, f.identity = function(t) {
                    return t[0] = 1, t[1] = 0, t[2] = 0, t[3] = 1, t[4] = 0, t[5] = 0, t
                }, f.invert = function(t, e) {
                    var r = e[0],
                        i = e[1],
                        n = e[2],
                        o = e[3],
                        a = e[4],
                        s = e[5],
                        u = r * o - i * n;
                    return u ? (u = 1 / u, t[0] = o * u, t[1] = -i * u, t[2] = -n * u, t[3] = r * u, t[4] = (n * s - o * a) * u, t[5] = (i * a - r * s) * u, t) : null
                }, f.determinant = function(t) {
                    return t[0] * t[3] - t[1] * t[2]
                }, f.multiply = function(t, e, r) {
                    var i = e[0],
                        n = e[1],
                        o = e[2],
                        a = e[3],
                        s = e[4],
                        u = e[5],
                        c = r[0],
                        f = r[1],
                        h = r[2],
                        l = r[3],
                        d = r[4],
                        p = r[5];
                    return t[0] = i * c + o * f, t[1] = n * c + a * f, t[2] = i * h + o * l, t[3] = n * h + a * l, t[4] = i * d + o * p + s, t[5] = n * d + a * p + u, t
                }, f.mul = f.multiply, f.rotate = function(t, e, r) {
                    var i = e[0],
                        n = e[1],
                        o = e[2],
                        a = e[3],
                        s = e[4],
                        u = e[5],
                        c = Math.sin(r),
                        f = Math.cos(r);
                    return t[0] = i * f + o * c, t[1] = n * f + a * c, t[2] = i * -c + o * f, t[3] = n * -c + a * f, t[4] = s, t[5] = u, t
                }, f.scale = function(t, e, r) {
                    var i = e[0],
                        n = e[1],
                        o = e[2],
                        a = e[3],
                        s = e[4],
                        u = e[5],
                        c = r[0],
                        f = r[1];
                    return t[0] = i * c, t[1] = n * c, t[2] = o * f, t[3] = a * f, t[4] = s, t[5] = u, t
                }, f.translate = function(t, e, r) {
                    var i = e[0],
                        n = e[1],
                        o = e[2],
                        a = e[3],
                        s = e[4],
                        u = e[5],
                        c = r[0],
                        f = r[1];
                    return t[0] = i, t[1] = n, t[2] = o, t[3] = a, t[4] = i * c + o * f + s, t[5] = n * c + a * f + u, t
                }, f.str = function(t) {
                    return "mat2d(" + t[0] + ", " + t[1] + ", " + t[2] + ", " + t[3] + ", " + t[4] + ", " + t[5] + ")"
                }, f.frob = function(t) {
                    return Math.sqrt(Math.pow(t[0], 2) + Math.pow(t[1], 2) + Math.pow(t[2], 2) + Math.pow(t[3], 2) + Math.pow(t[4], 2) + Math.pow(t[5], 2) + 1)
                }, "undefined" != typeof t && (t.mat2d = f);
                var h = {};
                h.create = function() {
                    var t = new r(9);
                    return t[0] = 1, t[1] = 0, t[2] = 0, t[3] = 0, t[4] = 1, t[5] = 0, t[6] = 0, t[7] = 0, t[8] = 1, t
                }, h.fromMat4 = function(t, e) {
                    return t[0] = e[0], t[1] = e[1], t[2] = e[2], t[3] = e[4], t[4] = e[5], t[5] = e[6], t[6] = e[8], t[7] = e[9], t[8] = e[10], t
                }, h.clone = function(t) {
                    var e = new r(9);
                    return e[0] = t[0], e[1] = t[1], e[2] = t[2], e[3] = t[3], e[4] = t[4], e[5] = t[5], e[6] = t[6], e[7] = t[7], e[8] = t[8], e
                }, h.copy = function(t, e) {
                    return t[0] = e[0], t[1] = e[1], t[2] = e[2], t[3] = e[3], t[4] = e[4], t[5] = e[5], t[6] = e[6], t[7] = e[7], t[8] = e[8], t
                }, h.identity = function(t) {
                    return t[0] = 1, t[1] = 0, t[2] = 0, t[3] = 0, t[4] = 1, t[5] = 0, t[6] = 0, t[7] = 0, t[8] = 1, t
                }, h.transpose = function(t, e) {
                    if (t === e) {
                        var r = e[1],
                            i = e[2],
                            n = e[5];
                        t[1] = e[3], t[2] = e[6], t[3] = r, t[5] = e[7], t[6] = i, t[7] = n
                    } else t[0] = e[0], t[1] = e[3], t[2] = e[6], t[3] = e[1], t[4] = e[4], t[5] = e[7], t[6] = e[2], t[7] = e[5], t[8] = e[8];
                    return t
                }, h.invert = function(t, e) {
                    var r = e[0],
                        i = e[1],
                        n = e[2],
                        o = e[3],
                        a = e[4],
                        s = e[5],
                        u = e[6],
                        c = e[7],
                        f = e[8],
                        h = f * a - s * c,
                        l = -f * o + s * u,
                        d = c * o - a * u,
                        p = r * h + i * l + n * d;
                    return p ? (p = 1 / p, t[0] = h * p, t[1] = (-f * i + n * c) * p, t[2] = (s * i - n * a) * p, t[3] = l * p, t[4] = (f * r - n * u) * p, t[5] = (-s * r + n * o) * p, t[6] = d * p, t[7] = (-c * r + i * u) * p, t[8] = (a * r - i * o) * p, t) : null
                }, h.adjoint = function(t, e) {
                    var r = e[0],
                        i = e[1],
                        n = e[2],
                        o = e[3],
                        a = e[4],
                        s = e[5],
                        u = e[6],
                        c = e[7],
                        f = e[8];
                    return t[0] = a * f - s * c, t[1] = n * c - i * f, t[2] = i * s - n * a, t[3] = s * u - o * f, t[4] = r * f - n * u, t[5] = n * o - r * s, t[6] = o * c - a * u, t[7] = i * u - r * c, t[8] = r * a - i * o, t
                }, h.determinant = function(t) {
                    var e = t[0],
                        r = t[1],
                        i = t[2],
                        n = t[3],
                        o = t[4],
                        a = t[5],
                        s = t[6],
                        u = t[7],
                        c = t[8];
                    return e * (c * o - a * u) + r * (-c * n + a * s) + i * (u * n - o * s)
                }, h.multiply = function(t, e, r) {
                    var i = e[0],
                        n = e[1],
                        o = e[2],
                        a = e[3],
                        s = e[4],
                        u = e[5],
                        c = e[6],
                        f = e[7],
                        h = e[8],
                        l = r[0],
                        d = r[1],
                        p = r[2],
                        v = r[3],
                        m = r[4],
                        g = r[5],
                        M = r[6],
                        x = r[7],
                        b = r[8];
                    return t[0] = l * i + d * a + p * c, t[1] = l * n + d * s + p * f, t[2] = l * o + d * u + p * h, t[3] = v * i + m * a + g * c, t[4] = v * n + m * s + g * f, t[5] = v * o + m * u + g * h, t[6] = M * i + x * a + b * c, t[7] = M * n + x * s + b * f, t[8] = M * o + x * u + b * h, t
                }, h.mul = h.multiply, h.translate = function(t, e, r) {
                    var i = e[0],
                        n = e[1],
                        o = e[2],
                        a = e[3],
                        s = e[4],
                        u = e[5],
                        c = e[6],
                        f = e[7],
                        h = e[8],
                        l = r[0],
                        d = r[1];
                    return t[0] = i, t[1] = n, t[2] = o, t[3] = a, t[4] = s, t[5] = u, t[6] = l * i + d * a + c, t[7] = l * n + d * s + f, t[8] = l * o + d * u + h, t
                }, h.rotate = function(t, e, r) {
                    var i = e[0],
                        n = e[1],
                        o = e[2],
                        a = e[3],
                        s = e[4],
                        u = e[5],
                        c = e[6],
                        f = e[7],
                        h = e[8],
                        l = Math.sin(r),
                        d = Math.cos(r);
                    return t[0] = d * i + l * a, t[1] = d * n + l * s, t[2] = d * o + l * u, t[3] = d * a - l * i, t[4] = d * s - l * n, t[5] = d * u - l * o, t[6] = c, t[7] = f, t[8] = h, t
                }, h.scale = function(t, e, r) {
                    var i = r[0],
                        n = r[1];
                    return t[0] = i * e[0], t[1] = i * e[1], t[2] = i * e[2], t[3] = n * e[3], t[4] = n * e[4], t[5] = n * e[5], t[6] = e[6], t[7] = e[7], t[8] = e[8], t
                }, h.fromMat2d = function(t, e) {
                    return t[0] = e[0], t[1] = e[1], t[2] = 0, t[3] = e[2], t[4] = e[3], t[5] = 0, t[6] = e[4], t[7] = e[5], t[8] = 1, t
                }, h.fromQuat = function(t, e) {
                    var r = e[0],
                        i = e[1],
                        n = e[2],
                        o = e[3],
                        a = r + r,
                        s = i + i,
                        u = n + n,
                        c = r * a,
                        f = i * a,
                        h = i * s,
                        l = n * a,
                        d = n * s,
                        p = n * u,
                        v = o * a,
                        m = o * s,
                        g = o * u;
                    return t[0] = 1 - h - p, t[3] = f - g, t[6] = l + m, t[1] = f + g, t[4] = 1 - c - p, t[7] = d - v, t[2] = l - m, t[5] = d + v, t[8] = 1 - c - h, t
                }, h.normalFromMat4 = function(t, e) {
                    var r = e[0],
                        i = e[1],
                        n = e[2],
                        o = e[3],
                        a = e[4],
                        s = e[5],
                        u = e[6],
                        c = e[7],
                        f = e[8],
                        h = e[9],
                        l = e[10],
                        d = e[11],
                        p = e[12],
                        v = e[13],
                        m = e[14],
                        g = e[15],
                        M = r * s - i * a,
                        x = r * u - n * a,
                        b = r * c - o * a,
                        y = i * u - n * s,
                        w = i * c - o * s,
                        E = n * c - o * u,
                        T = f * v - h * p,
                        A = f * m - l * p,
                        R = f * g - d * p,
                        F = h * m - l * v,
                        B = h * g - d * v,
                        L = l * g - d * m,
                        D = M * L - x * B + b * F + y * R - w * A + E * T;
                    return D ? (D = 1 / D, t[0] = (s * L - u * B + c * F) * D, t[1] = (u * R - a * L - c * A) * D, t[2] = (a * B - s * R + c * T) * D, t[3] = (n * B - i * L - o * F) * D, t[4] = (r * L - n * R + o * A) * D, t[5] = (i * R - r * B - o * T) * D, t[6] = (v * E - m * w + g * y) * D, t[7] = (m * b - p * E - g * x) * D, t[8] = (p * w - v * b + g * M) * D, t) : null
                }, h.str = function(t) {
                    return "mat3(" + t[0] + ", " + t[1] + ", " + t[2] + ", " + t[3] + ", " + t[4] + ", " + t[5] + ", " + t[6] + ", " + t[7] + ", " + t[8] + ")"
                }, h.frob = function(t) {
                    return Math.sqrt(Math.pow(t[0], 2) + Math.pow(t[1], 2) + Math.pow(t[2], 2) + Math.pow(t[3], 2) + Math.pow(t[4], 2) + Math.pow(t[5], 2) + Math.pow(t[6], 2) + Math.pow(t[7], 2) + Math.pow(t[8], 2))
                }, "undefined" != typeof t && (t.mat3 = h);
                var l = {};
                l.create = function() {
                    var t = new r(16);
                    return t[0] = 1, t[1] = 0, t[2] = 0, t[3] = 0, t[4] = 0, t[5] = 1, t[6] = 0, t[7] = 0, t[8] = 0, t[9] = 0, t[10] = 1, t[11] = 0, t[12] = 0, t[13] = 0, t[14] = 0, t[15] = 1, t
                }, l.clone = function(t) {
                    var e = new r(16);
                    return e[0] = t[0], e[1] = t[1], e[2] = t[2], e[3] = t[3], e[4] = t[4], e[5] = t[5], e[6] = t[6], e[7] = t[7], e[8] = t[8], e[9] = t[9], e[10] = t[10], e[11] = t[11], e[12] = t[12], e[13] = t[13], e[14] = t[14], e[15] = t[15], e
                }, l.copy = function(t, e) {
                    return t[0] = e[0], t[1] = e[1], t[2] = e[2], t[3] = e[3], t[4] = e[4], t[5] = e[5], t[6] = e[6], t[7] = e[7], t[8] = e[8], t[9] = e[9], t[10] = e[10], t[11] = e[11], t[12] = e[12], t[13] = e[13], t[14] = e[14], t[15] = e[15], t
                }, l.identity = function(t) {
                    return t[0] = 1, t[1] = 0, t[2] = 0, t[3] = 0, t[4] = 0, t[5] = 1, t[6] = 0, t[7] = 0, t[8] = 0, t[9] = 0, t[10] = 1, t[11] = 0, t[12] = 0, t[13] = 0, t[14] = 0, t[15] = 1, t
                }, l.transpose = function(t, e) {
                    if (t === e) {
                        var r = e[1],
                            i = e[2],
                            n = e[3],
                            o = e[6],
                            a = e[7],
                            s = e[11];
                        t[1] = e[4], t[2] = e[8], t[3] = e[12], t[4] = r, t[6] = e[9], t[7] = e[13], t[8] = i, t[9] = o, t[11] = e[14], t[12] = n, t[13] = a, t[14] = s
                    } else t[0] = e[0], t[1] = e[4], t[2] = e[8], t[3] = e[12], t[4] = e[1], t[5] = e[5], t[6] = e[9], t[7] = e[13], t[8] = e[2], t[9] = e[6], t[10] = e[10], t[11] = e[14], t[12] = e[3], t[13] = e[7], t[14] = e[11], t[15] = e[15];
                    return t
                }, l.invert = function(t, e) {
                    var r = e[0],
                        i = e[1],
                        n = e[2],
                        o = e[3],
                        a = e[4],
                        s = e[5],
                        u = e[6],
                        c = e[7],
                        f = e[8],
                        h = e[9],
                        l = e[10],
                        d = e[11],
                        p = e[12],
                        v = e[13],
                        m = e[14],
                        g = e[15],
                        M = r * s - i * a,
                        x = r * u - n * a,
                        b = r * c - o * a,
                        y = i * u - n * s,
                        w = i * c - o * s,
                        E = n * c - o * u,
                        T = f * v - h * p,
                        A = f * m - l * p,
                        R = f * g - d * p,
                        F = h * m - l * v,
                        B = h * g - d * v,
                        L = l * g - d * m,
                        D = M * L - x * B + b * F + y * R - w * A + E * T;
                    return D ? (D = 1 / D, t[0] = (s * L - u * B + c * F) * D, t[1] = (n * B - i * L - o * F) * D, t[2] = (v * E - m * w + g * y) * D, t[3] = (l * w - h * E - d * y) * D, t[4] = (u * R - a * L - c * A) * D, t[5] = (r * L - n * R + o * A) * D, t[6] = (m * b - p * E - g * x) * D, t[7] = (f * E - l * b + d * x) * D, t[8] = (a * B - s * R + c * T) * D, t[9] = (i * R - r * B - o * T) * D, t[10] = (p * w - v * b + g * M) * D, t[11] = (h * b - f * w - d * M) * D, t[12] = (s * A - a * F - u * T) * D, t[13] = (r * F - i * A + n * T) * D, t[14] = (v * x - p * y - m * M) * D, t[15] = (f * y - h * x + l * M) * D, t) : null
                }, l.adjoint = function(t, e) {
                    var r = e[0],
                        i = e[1],
                        n = e[2],
                        o = e[3],
                        a = e[4],
                        s = e[5],
                        u = e[6],
                        c = e[7],
                        f = e[8],
                        h = e[9],
                        l = e[10],
                        d = e[11],
                        p = e[12],
                        v = e[13],
                        m = e[14],
                        g = e[15];
                    return t[0] = s * (l * g - d * m) - h * (u * g - c * m) + v * (u * d - c * l), t[1] = -(i * (l * g - d * m) - h * (n * g - o * m) + v * (n * d - o * l)), t[2] = i * (u * g - c * m) - s * (n * g - o * m) + v * (n * c - o * u), t[3] = -(i * (u * d - c * l) - s * (n * d - o * l) + h * (n * c - o * u)), t[4] = -(a * (l * g - d * m) - f * (u * g - c * m) + p * (u * d - c * l)), t[5] = r * (l * g - d * m) - f * (n * g - o * m) + p * (n * d - o * l), t[6] = -(r * (u * g - c * m) - a * (n * g - o * m) + p * (n * c - o * u)), t[7] = r * (u * d - c * l) - a * (n * d - o * l) + f * (n * c - o * u), t[8] = a * (h * g - d * v) - f * (s * g - c * v) + p * (s * d - c * h), t[9] = -(r * (h * g - d * v) - f * (i * g - o * v) + p * (i * d - o * h)), t[10] = r * (s * g - c * v) - a * (i * g - o * v) + p * (i * c - o * s), t[11] = -(r * (s * d - c * h) - a * (i * d - o * h) + f * (i * c - o * s)), t[12] = -(a * (h * m - l * v) - f * (s * m - u * v) + p * (s * l - u * h)), t[13] = r * (h * m - l * v) - f * (i * m - n * v) + p * (i * l - n * h), t[14] = -(r * (s * m - u * v) - a * (i * m - n * v) + p * (i * u - n * s)), t[15] = r * (s * l - u * h) - a * (i * l - n * h) + f * (i * u - n * s), t
                }, l.determinant = function(t) {
                    var e = t[0],
                        r = t[1],
                        i = t[2],
                        n = t[3],
                        o = t[4],
                        a = t[5],
                        s = t[6],
                        u = t[7],
                        c = t[8],
                        f = t[9],
                        h = t[10],
                        l = t[11],
                        d = t[12],
                        p = t[13],
                        v = t[14],
                        m = t[15],
                        g = e * a - r * o,
                        M = e * s - i * o,
                        x = e * u - n * o,
                        b = r * s - i * a,
                        y = r * u - n * a,
                        w = i * u - n * s,
                        E = c * p - f * d,
                        T = c * v - h * d,
                        A = c * m - l * d,
                        R = f * v - h * p,
                        F = f * m - l * p,
                        B = h * m - l * v;
                    return g * B - M * F + x * R + b * A - y * T + w * E
                }, l.multiply = function(t, e, r) {
                    var i = e[0],
                        n = e[1],
                        o = e[2],
                        a = e[3],
                        s = e[4],
                        u = e[5],
                        c = e[6],
                        f = e[7],
                        h = e[8],
                        l = e[9],
                        d = e[10],
                        p = e[11],
                        v = e[12],
                        m = e[13],
                        g = e[14],
                        M = e[15],
                        x = r[0],
                        b = r[1],
                        y = r[2],
                        w = r[3];
                    return t[0] = x * i + b * s + y * h + w * v, t[1] = x * n + b * u + y * l + w * m, t[2] = x * o + b * c + y * d + w * g, t[3] = x * a + b * f + y * p + w * M, x = r[4], b = r[5], y = r[6], w = r[7], t[4] = x * i + b * s + y * h + w * v, t[5] = x * n + b * u + y * l + w * m, t[6] = x * o + b * c + y * d + w * g, t[7] = x * a + b * f + y * p + w * M, x = r[8], b = r[9], y = r[10], w = r[11], t[8] = x * i + b * s + y * h + w * v, t[9] = x * n + b * u + y * l + w * m, t[10] = x * o + b * c + y * d + w * g, t[11] = x * a + b * f + y * p + w * M, x = r[12], b = r[13], y = r[14], w = r[15], t[12] = x * i + b * s + y * h + w * v, t[13] = x * n + b * u + y * l + w * m, t[14] = x * o + b * c + y * d + w * g, t[15] = x * a + b * f + y * p + w * M, t
                }, l.mul = l.multiply, l.translate = function(t, e, r) {
                    var i, n, o, a, s, u, c, f, h, l, d, p, v = r[0],
                        m = r[1],
                        g = r[2];
                    return e === t ? (t[12] = e[0] * v + e[4] * m + e[8] * g + e[12], t[13] = e[1] * v + e[5] * m + e[9] * g + e[13], t[14] = e[2] * v + e[6] * m + e[10] * g + e[14], t[15] = e[3] * v + e[7] * m + e[11] * g + e[15]) : (i = e[0], n = e[1], o = e[2], a = e[3], s = e[4], u = e[5], c = e[6], f = e[7], h = e[8], l = e[9], d = e[10], p = e[11], t[0] = i, t[1] = n, t[2] = o, t[3] = a, t[4] = s, t[5] = u, t[6] = c, t[7] = f, t[8] = h, t[9] = l, t[10] = d, t[11] = p, t[12] = i * v + s * m + h * g + e[12], t[13] = n * v + u * m + l * g + e[13], t[14] = o * v + c * m + d * g + e[14], t[15] = a * v + f * m + p * g + e[15]), t
                }, l.scale = function(t, e, r) {
                    var i = r[0],
                        n = r[1],
                        o = r[2];
                    return t[0] = e[0] * i, t[1] = e[1] * i, t[2] = e[2] * i, t[3] = e[3] * i, t[4] = e[4] * n, t[5] = e[5] * n, t[6] = e[6] * n, t[7] = e[7] * n, t[8] = e[8] * o, t[9] = e[9] * o, t[10] = e[10] * o, t[11] = e[11] * o, t[12] = e[12], t[13] = e[13], t[14] = e[14], t[15] = e[15], t
                }, l.rotate = function(t, r, i, n) {
                    var o, a, s, u, c, f, h, l, d, p, v, m, g, M, x, b, y, w, E, T, A, R, F, B, L = n[0],
                        D = n[1],
                        _ = n[2],
                        U = Math.sqrt(L * L + D * D + _ * _);
                    return Math.abs(U) < e ? null : (U = 1 / U, L *= U, D *= U, _ *= U, o = Math.sin(i), a = Math.cos(i), s = 1 - a, u = r[0], c = r[1], f = r[2], h = r[3], l = r[4], d = r[5], p = r[6], v = r[7], m = r[8], g = r[9], M = r[10], x = r[11], b = L * L * s + a, y = D * L * s + _ * o, w = _ * L * s - D * o, E = L * D * s - _ * o, T = D * D * s + a, A = _ * D * s + L * o, R = L * _ * s + D * o, F = D * _ * s - L * o, B = _ * _ * s + a, t[0] = u * b + l * y + m * w, t[1] = c * b + d * y + g * w, t[2] = f * b + p * y + M * w, t[3] = h * b + v * y + x * w, t[4] = u * E + l * T + m * A, t[5] = c * E + d * T + g * A, t[6] = f * E + p * T + M * A, t[7] = h * E + v * T + x * A, t[8] = u * R + l * F + m * B, t[9] = c * R + d * F + g * B, t[10] = f * R + p * F + M * B, t[11] = h * R + v * F + x * B, r !== t && (t[12] = r[12], t[13] = r[13], t[14] = r[14], t[15] = r[15]), t)
                }, l.rotateX = function(t, e, r) {
                    var i = Math.sin(r),
                        n = Math.cos(r),
                        o = e[4],
                        a = e[5],
                        s = e[6],
                        u = e[7],
                        c = e[8],
                        f = e[9],
                        h = e[10],
                        l = e[11];
                    return e !== t && (t[0] = e[0], t[1] = e[1], t[2] = e[2], t[3] = e[3], t[12] = e[12], t[13] = e[13], t[14] = e[14], t[15] = e[15]), t[4] = o * n + c * i, t[5] = a * n + f * i, t[6] = s * n + h * i, t[7] = u * n + l * i, t[8] = c * n - o * i, t[9] = f * n - a * i, t[10] = h * n - s * i, t[11] = l * n - u * i, t
                }, l.rotateY = function(t, e, r) {
                    var i = Math.sin(r),
                        n = Math.cos(r),
                        o = e[0],
                        a = e[1],
                        s = e[2],
                        u = e[3],
                        c = e[8],
                        f = e[9],
                        h = e[10],
                        l = e[11];
                    return e !== t && (t[4] = e[4], t[5] = e[5], t[6] = e[6], t[7] = e[7], t[12] = e[12], t[13] = e[13], t[14] = e[14], t[15] = e[15]), t[0] = o * n - c * i, t[1] = a * n - f * i, t[2] = s * n - h * i, t[3] = u * n - l * i, t[8] = o * i + c * n, t[9] = a * i + f * n, t[10] = s * i + h * n, t[11] = u * i + l * n, t
                }, l.rotateZ = function(t, e, r) {
                    var i = Math.sin(r),
                        n = Math.cos(r),
                        o = e[0],
                        a = e[1],
                        s = e[2],
                        u = e[3],
                        c = e[4],
                        f = e[5],
                        h = e[6],
                        l = e[7];
                    return e !== t && (t[8] = e[8], t[9] = e[9], t[10] = e[10], t[11] = e[11], t[12] = e[12], t[13] = e[13], t[14] = e[14], t[15] = e[15]), t[0] = o * n + c * i, t[1] = a * n + f * i, t[2] = s * n + h * i, t[3] = u * n + l * i, t[4] = c * n - o * i, t[5] = f * n - a * i, t[6] = h * n - s * i, t[7] = l * n - u * i, t
                }, l.fromRotationTranslation = function(t, e, r) {
                    var i = e[0],
                        n = e[1],
                        o = e[2],
                        a = e[3],
                        s = i + i,
                        u = n + n,
                        c = o + o,
                        f = i * s,
                        h = i * u,
                        l = i * c,
                        d = n * u,
                        p = n * c,
                        v = o * c,
                        m = a * s,
                        g = a * u,
                        M = a * c;
                    return t[0] = 1 - (d + v), t[1] = h + M, t[2] = l - g, t[3] = 0, t[4] = h - M, t[5] = 1 - (f + v), t[6] = p + m, t[7] = 0, t[8] = l + g, t[9] = p - m, t[10] = 1 - (f + d), t[11] = 0, t[12] = r[0], t[13] = r[1], t[14] = r[2], t[15] = 1, t
                }, l.fromQuat = function(t, e) {
                    var r = e[0],
                        i = e[1],
                        n = e[2],
                        o = e[3],
                        a = r + r,
                        s = i + i,
                        u = n + n,
                        c = r * a,
                        f = i * a,
                        h = i * s,
                        l = n * a,
                        d = n * s,
                        p = n * u,
                        v = o * a,
                        m = o * s,
                        g = o * u;
                    return t[0] = 1 - h - p, t[1] = f + g, t[2] = l - m, t[3] = 0, t[4] = f - g, t[5] = 1 - c - p, t[6] = d + v, t[7] = 0, t[8] = l + m, t[9] = d - v, t[10] = 1 - c - h, t[11] = 0, t[12] = 0, t[13] = 0, t[14] = 0, t[15] = 1, t
                }, l.frustum = function(t, e, r, i, n, o, a) {
                    var s = 1 / (r - e),
                        u = 1 / (n - i),
                        c = 1 / (o - a);
                    return t[0] = 2 * o * s, t[1] = 0, t[2] = 0, t[3] = 0, t[4] = 0, t[5] = 2 * o * u, t[6] = 0, t[7] = 0, t[8] = (r + e) * s, t[9] = (n + i) * u, t[10] = (a + o) * c, t[11] = -1, t[12] = 0, t[13] = 0, t[14] = a * o * 2 * c, t[15] = 0, t
                }, l.perspective = function(t, e, r, i, n) {
                    var o = 1 / Math.tan(e / 2),
                        a = 1 / (i - n);
                    return t[0] = o / r, t[1] = 0, t[2] = 0, t[3] = 0, t[4] = 0, t[5] = o, t[6] = 0, t[7] = 0, t[8] = 0, t[9] = 0, t[10] = (n + i) * a, t[11] = -1, t[12] = 0, t[13] = 0, t[14] = 2 * n * i * a, t[15] = 0, t
                }, l.ortho = function(t, e, r, i, n, o, a) {
                    var s = 1 / (e - r),
                        u = 1 / (i - n),
                        c = 1 / (o - a);
                    return t[0] = -2 * s, t[1] = 0, t[2] = 0, t[3] = 0, t[4] = 0, t[5] = -2 * u, t[6] = 0, t[7] = 0, t[8] = 0, t[9] = 0, t[10] = 2 * c, t[11] = 0, t[12] = (e + r) * s, t[13] = (n + i) * u, t[14] = (a + o) * c, t[15] = 1, t
                }, l.lookAt = function(t, r, i, n) {
                    var o, a, s, u, c, f, h, d, p, v, m = r[0],
                        g = r[1],
                        M = r[2],
                        x = n[0],
                        b = n[1],
                        y = n[2],
                        w = i[0],
                        E = i[1],
                        T = i[2];
                    return Math.abs(m - w) < e && Math.abs(g - E) < e && Math.abs(M - T) < e ? l.identity(t) : (h = m - w, d = g - E, p = M - T, v = 1 / Math.sqrt(h * h + d * d + p * p), h *= v, d *= v, p *= v, o = b * p - y * d, a = y * h - x * p, s = x * d - b * h, v = Math.sqrt(o * o + a * a + s * s), v ? (v = 1 / v, o *= v, a *= v, s *= v) : (o = 0, a = 0, s = 0), u = d * s - p * a, c = p * o - h * s, f = h * a - d * o, v = Math.sqrt(u * u + c * c + f * f), v ? (v = 1 / v, u *= v, c *= v, f *= v) : (u = 0, c = 0, f = 0), t[0] = o, t[1] = u, t[2] = h, t[3] = 0, t[4] = a, t[5] = c, t[6] = d, t[7] = 0, t[8] = s, t[9] = f, t[10] = p, t[11] = 0, t[12] = -(o * m + a * g + s * M), t[13] = -(u * m + c * g + f * M), t[14] = -(h * m + d * g + p * M), t[15] = 1, t)
                }, l.str = function(t) {
                    return "mat4(" + t[0] + ", " + t[1] + ", " + t[2] + ", " + t[3] + ", " + t[4] + ", " + t[5] + ", " + t[6] + ", " + t[7] + ", " + t[8] + ", " + t[9] + ", " + t[10] + ", " + t[11] + ", " + t[12] + ", " + t[13] + ", " + t[14] + ", " + t[15] + ")"
                }, l.frob = function(t) {
                    return Math.sqrt(Math.pow(t[0], 2) + Math.pow(t[1], 2) + Math.pow(t[2], 2) + Math.pow(t[3], 2) + Math.pow(t[4], 2) + Math.pow(t[5], 2) + Math.pow(t[6], 2) + Math.pow(t[7], 2) + Math.pow(t[8], 2) + Math.pow(t[9], 2) + Math.pow(t[10], 2) + Math.pow(t[11], 2) + Math.pow(t[12], 2) + Math.pow(t[13], 2) + Math.pow(t[14], 2) + Math.pow(t[15], 2))
                }, "undefined" != typeof t && (t.mat4 = l);
                var d = {};
                return d.create = function() {
                    var t = new r(4);
                    return t[0] = 0, t[1] = 0, t[2] = 0, t[3] = 1, t
                }, d.rotationTo = function() {
                    var t = s.create(),
                        e = s.fromValues(1, 0, 0),
                        r = s.fromValues(0, 1, 0);
                    return function(i, n, o) {
                        var a = s.dot(n, o);
                        return -.999999 > a ? (s.cross(t, e, n), s.length(t) < 1e-6 && s.cross(t, r, n), s.normalize(t, t), d.setAxisAngle(i, t, Math.PI), i) : a > .999999 ? (i[0] = 0, i[1] = 0, i[2] = 0, i[3] = 1, i) : (s.cross(t, n, o), i[0] = t[0], i[1] = t[1], i[2] = t[2], i[3] = 1 + a, d.normalize(i, i))
                    }
                }(), d.setAxes = function() {
                    var t = h.create();
                    return function(e, r, i, n) {
                        return t[0] = i[0], t[3] = i[1], t[6] = i[2], t[1] = n[0], t[4] = n[1], t[7] = n[2], t[2] = -r[0], t[5] = -r[1], t[8] = -r[2], d.normalize(e, d.fromMat3(e, t))
                    }
                }(), d.clone = u.clone, d.fromValues = u.fromValues, d.copy = u.copy, d.set = u.set, d.identity = function(t) {
                    return t[0] = 0, t[1] = 0, t[2] = 0, t[3] = 1, t
                }, d.setAxisAngle = function(t, e, r) {
                    r = .5 * r;
                    var i = Math.sin(r);
                    return t[0] = i * e[0], t[1] = i * e[1], t[2] = i * e[2], t[3] = Math.cos(r), t
                }, d.add = u.add, d.multiply = function(t, e, r) {
                    var i = e[0],
                        n = e[1],
                        o = e[2],
                        a = e[3],
                        s = r[0],
                        u = r[1],
                        c = r[2],
                        f = r[3];
                    return t[0] = i * f + a * s + n * c - o * u, t[1] = n * f + a * u + o * s - i * c, t[2] = o * f + a * c + i * u - n * s, t[3] = a * f - i * s - n * u - o * c, t
                }, d.mul = d.multiply, d.scale = u.scale, d.rotateX = function(t, e, r) {
                    r *= .5;
                    var i = e[0],
                        n = e[1],
                        o = e[2],
                        a = e[3],
                        s = Math.sin(r),
                        u = Math.cos(r);
                    return t[0] = i * u + a * s, t[1] = n * u + o * s, t[2] = o * u - n * s, t[3] = a * u - i * s, t
                }, d.rotateY = function(t, e, r) {
                    r *= .5;
                    var i = e[0],
                        n = e[1],
                        o = e[2],
                        a = e[3],
                        s = Math.sin(r),
                        u = Math.cos(r);
                    return t[0] = i * u - o * s, t[1] = n * u + a * s, t[2] = o * u + i * s, t[3] = a * u - n * s, t
                }, d.rotateZ = function(t, e, r) {
                    r *= .5;
                    var i = e[0],
                        n = e[1],
                        o = e[2],
                        a = e[3],
                        s = Math.sin(r),
                        u = Math.cos(r);
                    return t[0] = i * u + n * s, t[1] = n * u - i * s, t[2] = o * u + a * s, t[3] = a * u - o * s, t
                }, d.calculateW = function(t, e) {
                    var r = e[0],
                        i = e[1],
                        n = e[2];
                    return t[0] = r, t[1] = i, t[2] = n, t[3] = Math.sqrt(Math.abs(1 - r * r - i * i - n * n)), t
                }, d.dot = u.dot, d.lerp = u.lerp, d.slerp = function(t, e, r, i) {
                    var n, o, a, s, u, c = e[0],
                        f = e[1],
                        h = e[2],
                        l = e[3],
                        d = r[0],
                        p = r[1],
                        v = r[2],
                        m = r[3];
                    return o = c * d + f * p + h * v + l * m, 0 > o && (o = -o, d = -d, p = -p, v = -v, m = -m), 1 - o > 1e-6 ? (n = Math.acos(o), a = Math.sin(n), s = Math.sin((1 - i) * n) / a, u = Math.sin(i * n) / a) : (s = 1 - i, u = i), t[0] = s * c + u * d, t[1] = s * f + u * p, t[2] = s * h + u * v, t[3] = s * l + u * m, t
                }, d.invert = function(t, e) {
                    var r = e[0],
                        i = e[1],
                        n = e[2],
                        o = e[3],
                        a = r * r + i * i + n * n + o * o,
                        s = a ? 1 / a : 0;
                    return t[0] = -r * s, t[1] = -i * s, t[2] = -n * s, t[3] = o * s, t
                }, d.conjugate = function(t, e) {
                    return t[0] = -e[0], t[1] = -e[1], t[2] = -e[2], t[3] = e[3], t
                }, d.length = u.length, d.len = d.length, d.squaredLength = u.squaredLength, d.sqrLen = d.squaredLength, d.normalize = u.normalize, d.fromMat3 = function(t, e) {
                    var r, i = e[0] + e[4] + e[8];
                    if (i > 0) r = Math.sqrt(i + 1), t[3] = .5 * r, r = .5 / r, t[0] = (e[5] - e[7]) * r, t[1] = (e[6] - e[2]) * r, t[2] = (e[1] - e[3]) * r;
                    else {
                        var n = 0;
                        e[4] > e[0] && (n = 1), e[8] > e[3 * n + n] && (n = 2);
                        var o = (n + 1) % 3,
                            a = (n + 2) % 3;
                        r = Math.sqrt(e[3 * n + n] - e[3 * o + o] - e[3 * a + a] + 1), t[n] = .5 * r, r = .5 / r, t[3] = (e[3 * o + a] - e[3 * a + o]) * r, t[o] = (e[3 * o + n] + e[3 * n + o]) * r, t[a] = (e[3 * a + n] + e[3 * n + a]) * r
                    }
                    return t
                }, d.str = function(t) {
                    return "quat(" + t[0] + ", " + t[1] + ", " + t[2] + ", " + t[3] + ")"
                }, d.fromYawPitchRoll = function(t, e, r, i) {
                    var n = Math.cos(e / 2),
                        o = Math.sin(e / 2),
                        a = Math.sin(r / 2) * Math.cos(i / 2),
                        s = Math.cos(r / 2) * Math.sin(i / 2),
                        u = Math.cos(r / 2) * Math.cos(i / 2),
                        c = Math.sin(r / 2) * Math.sin(i / 2);
                    t[0] = n * a + o * s, t[1] = o * u - n * c, t[2] = n * s - o * a, t[3] = n * u + o * c
                }, "undefined" != typeof t && (t.quat = d), t
            }(),
            e = function() {
                var t = {};
                return t.CullFaceNone = 0, t.CullFaceBack = 1, t.CullFaceFront = 2, t.CullFaceFrontBack = 3, t.FrontSide = 0, t.BackSide = 1, t.DoubleSide = 2, t.RepeatWrapping = 1e3, t.ClampToEdgeWrapping = 1001, t.MirroredRepeatWrapping = 1002, t.NearestFilter = 1003, t.NearestMipMapNearestFilter = 1004, t.NearestMipMapLinearFilter = 1005, t.LinearFilter = 1006, t.LinearMipMapNearestFilter = 1007, t.LinearMipMapLinearFilter = 1008, t.ZeroAxisX = "x", t.ZeroAxisY = "y", t.ZeroAxisZ = "z", t.Object3DIdCount = 0, t.SceneIdCount = 0, t.CameraIdCount = 0, t.MeshIdCount = 0, t.MaterialIdCount = 0, t.GeometryIdCount = 0, t.TextureIdCount = 0, t.ProgramIdCount = 0, t.ShowDebugLine = !1, t
            }(),
            r = function() {
                return r = function() {}, r.prototype = {
                    constructor: r,
                    apply: function(t) {
                        t.addEventListener = r.prototype.addEventListener, t.hasEventListener = r.prototype.hasEventListener, t.removeEventListener = r.prototype.removeEventListener, t.dispatchEvent = r.prototype.dispatchEvent
                    },
                    addEventListener: function(t, e) {
                        void 0 === this._listeners && (this._listeners = {});
                        var r = this._listeners;
                        void 0 === r[t] && (r[t] = []), -1 === r[t].indexOf(e) && r[t].push(e)
                    },
                    hasEventListener: function(t, e) {
                        if (void 0 === this._listeners) return !1;
                        var r = this._listeners;
                        return void 0 !== r[t] && -1 !== r[t].indexOf(e) ? !0 : !1
                    },
                    removeEventListener: function(t, e) {
                        if (void 0 !== this._listeners) {
                            var r = this._listeners,
                                i = r[t];
                            if (void 0 !== i) {
                                var n = i.indexOf(e); - 1 !== n && i.splice(n, 1)
                            }
                        }
                    },
                    dispatchEvent: function(t) {
                        if (void 0 !== this._listeners) {
                            var e = this._listeners,
                                r = e[t.type];
                            if (void 0 !== r) {
                                t.target = this;
                                for (var i = [], n = r.length, o = 0; n > o; o++) i[o] = r[o];
                                for (var o = 0; n > o; o++) i[o].call(this, t)
                            }
                        }
                    }
                }, r
            }(),
            i = function() {
                var t = {},
                    e = !0,
                    r = !0,
                    i = !0,
                    n = function() {},
                    o = function() {
                        console.log.apply(console, arguments)
                    },
                    a = function() {
                        console.warn.apply(console, arguments)
                    },
                    s = function() {
                        console.error.apply(console, arguments)
                    };
                return Object.defineProperties(t, {
                    enableLog: {
                        get: function() {
                            return e
                        },
                        set: function(r) {
                            e = r, t.log = !0 === e ? o : n
                        }
                    },
                    enableWarnning: {
                        get: function() {
                            return r
                        },
                        set: function(e) {
                            r = e, t.warn = !0 === r ? a : n
                        }
                    },
                    enableError: {
                        get: function() {
                            return i
                        },
                        set: function(e) {
                            i = e, t.error = !0 === i ? s : n
                        }
                    }
                }), t.enableLog = !1, t.enableWarnning = !1, t.enableError = !1, t
            }(),
            n = function() {
                var n = t.vec3,
                    o = t.mat4,
                    a = function() {
                        var t = e.Object3DIdCount++;
                        this.parent = void 0, this.children = [];
                        var r = n.fromValues(0, 0, 0),
                            i = o.create(),
                            a = n.fromValues(1, 1, 1),
                            s = !0,
                            u = o.create(),
                            c = o.create(),
                            f = !1;
                        Object.defineProperties(this, {
                            id: {
                                get: function() {
                                    return t
                                }
                            },
                            rotation: {
                                get: function() {
                                    return i
                                },
                                set: function(t) {
                                    i = t, f = !0
                                }
                            },
                            position: {
                                get: function() {
                                    return r
                                },
                                set: function(t) {
                                    r = t, f = !0
                                }
                            },
                            scale: {
                                get: function() {
                                    return a
                                },
                                set: function(t) {
                                    a = t, f = !0
                                }
                            },
                            visible: {
                                get: function() {
                                    return s
                                },
                                set: function(t) {
                                    s = t
                                }
                            },
                            modelMatrix: {
                                get: function() {
                                    return u
                                },
                                set: function(t) {
                                    u = t
                                }
                            },
                            worldMatrix: {
                                get: function() {
                                    return c
                                },
                                set: function(t) {
                                    c = t
                                }
                            },
                            modelMatrixNeedUpdate: {
                                get: function() {
                                    return f
                                },
                                set: function(t) {
                                    f = t
                                }
                            }
                        }), this.worldMatrixNeedsUpdate = !1, this.needsUpdate = !1
                    };
                return a.prototype = {
                    constructor: a,
                    rotate: function(t, e) {
                        this.rotation = o.rotate(this.rotation, this.rotation, t, e)
                    },
                    rotateX: function(t) {
                        this.rotate(t, n.fromValues(1, 0, 0))
                    },
                    rotateY: function(t) {
                        this.rotate(t, n.fromValues(0, 1, 0))
                    },
                    rotateZ: function(t) {
                        this.rotate(t, n.fromValues(0, 0, 1))
                    },
                    translate: function(t) {
                        this.position = n.add(this.position, this.position, t)
                    },
                    updateMatrix: function() {
                        o.identity(this.modelMatrix), o.translate(this.modelMatrix, this.modelMatrix, this.position), o.multiply(this.modelMatrix, this.modelMatrix, this.rotation), o.scale(this.modelMatrix, this.modelMatrix, this.scale), this.modelMatrixNeedUpdate = !1, this.worldMatrixNeedsUpdate = !0
                    },
                    updateWorldMatrix: function(t) {
                        (!0 === this.modelMatrixNeedUpdate || !0 === t) && this.updateMatrix(), !0 === this.worldMatrixNeedsUpdate && (void 0 === this.parent ? o.copy(this.worldMatrix, this.modelMatrix) : o.multiply(this.worldMatrix, this.parent.worldMatrix, this.modelMatrix), this.worldMatrixNeedsUpdate = !1, t = !0);
                        for (var e = 0, r = this.children.length; r > e; e++) this.children[e].updateWorldMatrix(t)
                    },
                    addChild: function(t) {
                        if (arguments.length > 1) {
                            for (var e = 0, r = arguments.length; r > e; e++) this.addChild(arguments[e]);
                            return this
                        }
                        if (t === this) return i.error("Object3D ", t, "could not add itself."), this;
                        if (t instanceof Array) {
                            for (var e = 0, r = t.length; r > e; e++) this.addChild(t[e]);
                            return this
                        }
                        return t instanceof a ? (void 0 !== t.parent && t.parent.removeChild(t), t.parent = this, this.children.push(t), this) : (i.error("Object3D could not add ", t, ", as it is not an instanceof Object3D "), this)
                    },
                    addChildAt: function(t, e) {
                        if (t === this) return i.error("Object3D ", t, "could not add itself."), this;
                        if (t instanceof Array) {
                            for (var r = t.length - 1; r >= 0; r--) this.addChildAt(t[r], e);
                            return this
                        }
                        return t instanceof a ? (void 0 !== t.parent && t.parent.remove(t), t.parent = this, e > this.children.length ? this.children.push(t) : this.children.splice(e, 0, t), this) : (i.error("Object3D could not add ", t, ", as it is not an instanceof Object3D "), this)
                    },
                    removeChild: function(t) {
                        if (arguments.length > 1)
                            for (var e = 0, r = arguments.length; r > e; e++) this.removeChild(arguments[e]);
                        else if (t instanceof Array)
                            for (var e = t.length - 1; e >= 0; e--) this.removeChild(t[e]);
                        else {
                            var i = this.children.indexOf(t);
                            i >= 0 && (t.parent = void 0, t.dispatchEvent({
                                type: "removed"
                            }), this.children.splice(i, 1))
                        }
                    },
                    removeAllChildren: function() {
                        for (var t, e = this.children.length - 1; e >= 0; e--) t = this.children[e], t.parent = void 0, t.dispatchEvent({
                            type: "removed"
                        });
                        this.children = []
                    },
                    getObjectById: function(t) {
                        return this.getObjectByProperty("id", t)
                    },
                    traverse: function(t) {
                        t(this);
                        for (var e = 0, r = this.children.length; r > e; e++) this.children[e].traverse(t)
                    },
                    clone: function(t, e) {
                        if (void 0 === t && (t = new a), t.position = n.clone(this.position), t.rotation = o.clone(this.rotation), t.scale = n.clone(this.scale), t.modelMatrix = o.clone(this.modelMatrix), t.worldMatrix = o.clone(this.worldMatrix), t.visible = this.visible, e)
                            for (var r = 0, i = this.children.length; i > r; r++) t.addChild(this.children[r].clone());
                        return t
                    }
                }, r.prototype.apply(a.prototype), a
            }(),
            o = function() {
                var t = function() {
                    this.id = e.GeometryIdCount++, this.vertices = [], this.uvtsBufferData = new Float32Array, this.triangles = [], this.triangleVertexUvs = [], this.verticesBufferData = new Float32Array, this.indicesBufferData = new Uint16Array, this.groupsNeedUpdate = !1
                };
                return t.prototype = {
                    constructor: t,
                    clone: function(e) {
                        void 0 === e && (e = new t);
                        for (var r = this.vertices, i = 0, n = r.length; n > i; i++) e.vertices.push(Vec3.clone(r[i]));
                        var o = this.triangles;
                        for (n = o.length, i = 0; n > i; i++) e.triangles.push(o[i].clone());
                        return e.colors = this.colors, e.uvts = this.uvts, e.indices = this.indices, e
                    },
                    dispose: function() {
                        this.dispatchEvent({
                            type: "dispose"
                        })
                    }
                }, r.prototype.apply(t.prototype), t
            }(),
            a = function() {
                var e = (t.vec3, function(t, e, r, i) {
                    this.indices = t, this.index1 = t[0], this.index2 = t[1], this.index3 = t[2], this.columnNum = e, this.rowNum = r, this.materialIndex = void 0 !== i ? i : -1
                });
                return e.prototype = {
                    constructor: e,
                    clone: function(t) {
                        return void 0 === t && (t = new e(this.indices)), t.index1 = this.index1, t.index2 = this.index2, t.index3 = this.index3, t.columnNum = this.columnNum, t.rowNum = this.rowNum, t.materialIndex = this.materialIndex, t
                    }
                }, e
            }(),
            s = function() {
                var e = t.vec3,
                    r = t.vec2,
                    i = function(t, i, n, s, u, c, f) {
                        o.call(this), t = this._radius = t || 3e3, i = Math.floor(i) || 64, n = Math.floor(n) || 32, s = void 0 !== s ? s : 0, u = void 0 !== u ? u : 2 * Math.PI, c = void 0 !== c ? c : 0, f = void 0 !== f ? f : Math.PI;
                        var h, l, d, p = [],
                            v = [],
                            m = [],
                            g = [];
                        for (l = 0; n >= l; l++) {
                            var M = [],
                                x = [];
                            for (h = 0; i >= h; h++) {
                                var b = h / i,
                                    y = l / n;
                                d = e.create(), d[0] = t * Math.cos(s + b * u) * Math.sin(c + y * f), d[1] = t * Math.cos(c + y * f), d[2] = t * Math.sin(s + b * u) * Math.sin(c + y * f), this.vertices.push(d), p.push(d[0], d[1], d[2]), v.push(b, 1 - y), M.push(this.vertices.length - 1), x.push(r.fromValues(b, 1 - y))
                            }
                            m.push(M), g.push(x)
                        }
                        this.verticesBufferData = new Float32Array(p), this.uvtsBufferData = new Float32Array(v);
                        var w, E, T, A, R, F, B, L, D = [];
                        for (l = 0; n > l; l++)
                            for (h = 0; i > h; h++) w = m[l][h + 1], E = m[l][h], T = m[l + 1][h], A = m[l + 1][h + 1], R = r.clone(g[l][h + 1]), F = r.clone(g[l][h]), B = r.clone(g[l + 1][h]), L = r.clone(g[l + 1][h + 1]), Math.abs(this.vertices[w][1]) === t ? (R.x = (R.x + F.x) / 2, this.triangles.push(new a([w, T, A], h, l)), this.triangleVertexUvs.push([R[0], R[1], B[0], B[1], L[0], L[1]]), D.push(w, T, A)) : Math.abs(this.vertices[T][1]) === t ? (B.x = (B.x + L.x) / 2, this.triangles.push(new a([w, E, T], h, l)), this.triangleVertexUvs.push([R[0], R[1], F[0], F[1], B[0], B[1]]), D.push(w, E, T)) : (this.triangles.push(new a([E, T, A], h, l)), this.triangleVertexUvs.push([F[0], F[1], B[0], B[1], L[0], L[1]]), D.push(E, T, A), this.triangles.push(new a([E, A, w], h, l)), this.triangleVertexUvs.push([F[0], F[1], L[0], L[1], R[0], R[1]]), D.push(E, A, w));
                        this.indicesBufferData = new Uint16Array(D)
                    };
                return i.prototype = Object.create(o.prototype), i.prototype.constructor = i, i.prototype.getRadius = function() {
                    return this._radius
                }, i
            }(),
            u = function() {
                var e = (t.vec3, function(t, e, r) {
                    o.call(this), e = Math.floor(e) || 64, r = Math.floor(r) || 32, this.verticesBufferData = new Float32Array((e + 1) * (r + 1) * 3);
                    for (var i, n, s, u, c, f, h = e + 1, l = 0, d = 0; r >= d; d++) {
                        i = d / r;
                        for (var p = 0; e >= p; p++) n = p / e, this.verticesBufferData[l] = n, this.verticesBufferData[l + 1] = i, this.verticesBufferData[l + 2] = t, l += 3, d !== r && p !== e && (s = h * d + p + 1, u = h * d + p, c = h * (d + 1) + p, f = h * (d + 1) + p + 1, this.triangles.push(new a([u, c, f], p, d)), this.triangles.push(new a([u, f, s], p, d)))
                    }
                });
                return e.prototype = Object.create(o.prototype), e.prototype.constructor = e, e
            }(),
            c = function() {
                var r = t.vec3,
                    i = function(t, r) {
                        e.MeshIdCount++;
                        n.call(this), this.geometry = void 0 !== t ? t : new o;
                        var r = void 0 !== r ? r : null;
                        this.materialChanged = !1, Object.defineProperties(this, {
                            material: {
                                get: function() {
                                    return r
                                },
                                set: function(t) {
                                    r = t, this.materialChanged = !0
                                }
                            }
                        })
                    };
                return i.prototype = Object.create(n.prototype), i.prototype.constructure = i, i.prototype.isIntersectRay = function(t, e) {
                    if (e = !0 === e ? !0 : !1, this.geometry instanceof s || this.geometry instanceof u) return null !== t.intersectSphere(this.position[0], this.position[1], this.position[2], this.geometry.getRadius()) ? !0 : !1;
                    for (var i, n, o, a, c, f, h = 0, l = this.geometry.triangles.length; l > h; h++) {
                        i = this.geometry.triangles[h], n = i.index1, o = i.index2, a = i.index3;
                        var d = r.create(),
                            c = r.create(),
                            f = r.create();
                        if (r.copy(d, this.geometry.vertices[n]), r.copy(c, this.geometry.vertices[o]), r.copy(f, this.geometry.vertices[a]), r.transformMat4(d, d, this.worldMatrix), r.transformMat4(c, c, this.worldMatrix), r.transformMat4(f, f, this.worldMatrix), null !== t.intersectTriangle(d, c, f, e)) return !0
                    }
                    return !1
                }, i.prototype.clone = function(t, e) {
                    return void 0 === t && (t = new i(this.geometry, this.material)), n.prototype.clone.call(this, t, e), t
                }, i
            }(),
            f = function() {
                var e = t.vec3,
                    r = t.mat4,
                    i = function(t, r, i, n, o) {
                        c.call(this, t, r), this.normal = void 0 !== i ? i : e.fromValues(0, 1, 0), this.distance = void 0 !== n ? n : 600, this.centerDirection = void 0 !== o ? o : e.fromValues(0, 0, 1), this.update()
                    };
                return i.prototype = Object.create(c.prototype), i.prototype.constructure = i, i.prototype.update = function(t, i, n) {
                    void 0 !== t && (this.normal = t), void 0 !== i && (this.distance = i), void 0 !== n && (this.centerDirection = n), e.normalize(this.centerDirection, this.centerDirection), e.normalize(this.normal, this.normal);
                    var o = this.distance / e.dot(this.normal, this.centerDirection);
                    this.position = e.scale(this.position, this.centerDirection, o), r.identity(this.rotation);
                    var a = this.geometry.normal;
                    e.normalize(a, a);
                    var s = Math.acos(e.dot(a, this.normal));
                    if (0 !== s) {
                        var u = e.create();
                        e.cross(u, a, this.normal), this.rotation = r.rotate(this.rotation, this.rotation, s, u)
                    }
                }, i.prototype.clone = function(t, e) {
                    return void 0 === t ? t = new i(this.geometry, this.material, this.normal, this.distance, this.centerDirection) : (t.normal = this.normal, t.distance = this.distance, t.centerDirection = this.centerDirection), c.prototype.clone.call(this, t, e), t
                }, i
            }(),
            h = function() {
                var r = t.vec3,
                    i = function(t, r, i) {
                        e.MeshIdCount++;
                        n.call(this), this.geometry = void 0 !== t ? t : new o;
                        var r = r,
                            i = void 0 !== i ? i : [];
                        this.materialChanged = !1, Object.defineProperties(this, {
                            material: {
                                get: function() {
                                    return r
                                },
                                set: function(t) {
                                    r = t, this.materialChanged = !0
                                }
                            },
                            meshList: {
                                get: function() {
                                    return i
                                },
                                set: function(t) {
                                    i = t
                                }
                            }
                        })
                    };
                return i.prototype = Object.create(n.prototype), i.prototype.constructure = i, i.prototype.isIntersectRay = function(t, e) {
                    if (e = !0 === e ? !0 : !1, this.geometry instanceof s) return null !== t.intersectSphere(this.position[0], this.position[1], this.position[2], this.geometry.getRadius()) ? !0 : !1;
                    for (var i, n, o, a, u, c, f = 0, h = this.geometry.triangles.length; h > f; f++) {
                        i = this.geometry.triangles[f], n = i.index1, o = i.index2, a = i.index3;
                        var l = r.create(),
                            u = r.create(),
                            c = r.create();
                        if (r.copy(l, this.geometry.vertices[n]), r.copy(u, this.geometry.vertices[o]), r.copy(c, this.geometry.vertices[a]), r.transformMat4(l, l, this.worldMatrix), r.transformMat4(u, u, this.worldMatrix), r.transformMat4(c, c, this.worldMatrix), null !== t.intersectTriangle(l, u, c, e)) return !0
                    }
                    return !1
                }, i.prototype.clone = function(t, e) {
                    return void 0 === t && (t = new i(this.geometry, this.material)), n.prototype.clone.call(this, t, e), t
                }, i
            }(),
            l = function() {
                var e = t.vec3,
                    r = function(t, r) {
                        this.origin = void 0 !== t ? t : e.create(), this.direction = void 0 !== r ? r : e.create()
                    };
                return r.prototype = {
                    constructor: r,
                    set: function(t, e) {
                        return this.origin = t, this.direction = e, this
                    },
                    intersectTriangle: function(t, r, i, n, o) {
                        var a = e.create(),
                            s = e.create(),
                            u = e.create(),
                            c = e.create();
                        e.subtract(a, r, t), e.subtract(s, i, t), e.cross(u, a, s);
                        var f, h = e.dot(this.direction, u);
                        if (h > 0) {
                            if (n) return null;
                            f = 1
                        } else {
                            if (!(0 > h)) return null;
                            f = -1, h = -h
                        }
                        e.subtract(c, this.origin, t), e.cross(s, c, s);
                        var l = f * e.dot(this.direction, s);
                        if (0 > l) return null;
                        e.cross(a, a, c);
                        var d = f * e.dot(this.direction, a);
                        if (0 > d) return null;
                        if (l + d > h) return null;
                        var p = -f * e.dot(c, u);
                        return 0 > p ? null : this.at(p / h, o)
                    },
                    at: function(t, r) {
                        var i = void 0 !== r ? r : e.create();
                        return e.copy(i, this.direction), e.scale(i, i, t), e.add(i, i, this.origin), i
                    },
                    intersectSphere: function(t, r, i, n, o) {
                        var a = e.fromValues(t, r, i),
                            s = e.create();
                        e.subtract(s, a, this.origin);
                        var u = e.dot(s, this.direction),
                            c = e.dot(s, s) - u * u,
                            f = n * n;
                        if (c > f) return null;
                        var h = Math.sqrt(f - c),
                            l = u - h,
                            d = u + h;
                        return 0 > l && 0 > d ? null : 0 > l ? this.at(d, o) : this.at(l, o)
                    }
                }, r
            }(),
            d = function() {
                var t = function() {
                    e.SceneIdCount++;
                    n.call(this);
                    var t = !0;
                    Object.defineProperties(this, {
                        autoUpdateWorld: {
                            get: function() {
                                return t
                            },
                            set: function(e) {
                                t = e
                            }
                        }
                    })
                };
                return t.prototype = Object.create(n.prototype), t.prototype.constructor = t, t.prototype.updateWorldMatrix = function(t) {
                    if (!0 === this.autoUpdateWorld || !0 === t)
                        for (var e = 0, r = this.children.length; r > e; e++) this.children[e].updateWorldMatrix(t)
                }, t.prototype.clone = function(e) {
                    return void 0 === e && (e = new t), n.prototype.clone.call(this, e), e.autoUpdateWorld = this.autoUpdateWorld, e
                }, t
            }(),
            p = function() {
                var e = t.vec2,
                    r = t.vec3,
                    i = t.vec4,
                    n = t.mat4,
                    o = function() {};
                return o.worldToViewport = function(t, r, n, a, s) {
                    var u = i.fromValues(r[0], r[1], r[2], 1);
                    return i.transformMat4(u, u, t.viewMatrix), 0 < u[2] && !0 !== s ? null : (i.transformMat4(u, u, t.projectionMatrix), u[0] = u[0] / u[3], u[1] = u[1] / u[3], u[2] = u[2] / u[3], u[3] = 1, npVec2 = e.fromValues(u[0], u[1]), o.normalizeProjectionToViewport(npVec2, n, a))
                }, o.viewportToWorld = function(t, e, i, a, s) {
                    s = void 0 === s ? 100 : s;
                    var u = o.viewportToNormalizeProjection(e, i, a),
                        c = r.fromValues(u[0], u[1], -t.near),
                        f = n.create();
                    n.invert(f, t.projectionMatrix), r.transformMat4(c, c, f);
                    var h = n.create();
                    return n.invert(h, t.viewMatrix), r.transformMat4(c, c, h), r.normalize(c, c), r.scale(c, c, s), c
                }, o.worldToSphere = function(t) {
                    r.normalize(t, t);
                    var i = Math.atan2(t[0], t[2]),
                        n = Math.PI - i;
                    n = 0 > n ? 2 * Math.PI + n : n;
                    var o = Math.acos(t[1]) - .5 * Math.PI;
                    return e.fromValues(n, o)
                }, o.sphereToWorld = function(t, e) {
                    var i = t[0],
                        n = t[1],
                        o = Math.cos(n) * Math.sin(i) * e,
                        a = -Math.sin(n) * e,
                        s = -Math.cos(n) * Math.cos(i) * e;
                    return r.fromValues(o, a, s)
                }, o.viewportToSphere = function(t, e, r, i) {
                    var n = o.viewportToWorld(t, e, r, i, 100);
                    return o.worldToSphere(n)
                }, o.viewportToCorrectSphere = function(t, i, a, s, u) {
                    var c = o.viewportToWorld(t, i, a, s, 100),
                        f = n.create();
                    n.invert(f, u), r.transformMat4(c, c, f), r.normalize(c, c);
                    var h = Math.atan2(c[0], c[2]),
                        l = Math.PI - h;
                    l = 0 > l ? 2 * Math.PI + l : l;
                    var d = Math.acos(c[1]) - .5 * Math.PI;
                    return e.fromValues(l, d)
                }, o.viewportToTexture = function(t, i, a, s, u) {
                    var c = o.viewportToWorld(t, i, a, s, 100),
                        f = n.create();
                    n.invert(f, u), r.transformMat4(c, c, f), r.normalize(c, c);
                    var h = Math.atan2(c[2], c[0]);
                    h = 0 > h ? h + 2 * Math.PI : h;
                    var l = Math.acos(c[1]);
                    return e.fromValues(.5 * h / Math.PI, l / Math.PI)
                }, o.sphereToViewport = function(t, e, r, i, n) {
                    var a = o.sphereToWorld(e, 100);
                    return o.worldToViewport(t, a, r, i, n)
                }, o.viewportToNormalizeProjection = function(t, r, i) {
                    var n = .5 * r,
                        o = .5 * i,
                        a = (t[0] - n) / n,
                        s = (o - t[1]) / o;
                    return e.fromValues(a, s)
                }, o.normalizeProjectionToViewport = function(t, r, i) {
                    var n = .5 * r,
                        o = .5 * i,
                        a = (t[0] + 1) * n,
                        s = (-t[1] + 1) * o;
                    return e.fromValues(a, s)
                }, o
            }(),
            v = function() {
                var r = t.vec3,
                    i = (t.vec2, function() {});
                return i.clamp = function(t, e, r) {
                    return e > t ? e : t > r ? r : t
                }, i.degToRad = function(t) {
                    return t * Math.PI / 180
                }, i.radToDeg = function(t) {
                    return 180 * t / Math.PI
                }, i.degreeNormalized = function(t) {
                    return t - 360 * Math.floor(t / 360)
                }, i.radNormalized = function(t) {
                    return t - Math.floor(.5 * t / Math.PI) * Math.PI * 2
                }, i.isPowerOfTwo = function(t) {
                    return 0 === (t & t - 1) && 0 !== t
                }, i.get3DVertex = function(t, i) {
                    var n;
                    switch (i) {
                        case e.ZeroAxisX:
                            n = r.fromValues(0, t[0], t[1]);
                            break;
                        case e.ZeroAxisY:
                            n = r.fromValues(t[0], 0, t[1]);
                            break;
                        case e.ZeroAxisZ:
                            n = r.fromValues(t[0], t[1], 0);
                            break;
                        default:
                            n = r.fromValues(t[0], t[1], 0)
                    }
                    return n
                }, i
            }(),
            m = function() {
                var r = t.mat4,
                    i = t.vec3,
                    o = function(t, i) {
                        e.CameraIdCount++;
                        n.call(this);
                        var o = r.create(),
                            a = r.create(),
                            s = 0,
                            u = 0,
                            c = 0,
                            t = void 0 !== t ? t : .1,
                            i = void 0 !== i ? i : 3e3,
                            f = !1;
                        Object.defineProperties(this, {
                            rotateX: {
                                get: function() {
                                    return s
                                },
                                set: function(t) {
                                    s = t, this.modelMatrixNeedUpdate = !0
                                }
                            },
                            rotateY: {
                                get: function() {
                                    return u
                                },
                                set: function(t) {
                                    u = t, this.modelMatrixNeedUpdate = !0
                                }
                            },
                            rotateZ: {
                                get: function() {
                                    return c
                                },
                                set: function(t) {
                                    c = t, this.modelMatrixNeedUpdate = !0
                                }
                            },
                            near: {
                                get: function() {
                                    return t
                                },
                                set: function(e) {
                                    t = e, f = !0
                                }
                            },
                            far: {
                                get: function() {
                                    return i
                                },
                                set: function(t) {
                                    i = t, f = !0
                                }
                            },
                            projectionMatrix: {
                                get: function() {
                                    return o
                                },
                                set: function(t) {
                                    o = t
                                }
                            },
                            viewMatrix: {
                                get: function() {
                                    return a
                                },
                                set: function(t) {
                                    a = t
                                }
                            },
                            projectionMatrixNeedUpdate: {
                                get: function() {
                                    return f
                                },
                                set: function(t) {
                                    f = t
                                }
                            }
                        })
                    };
                o.prototype = Object.create(n.prototype), o.prototype.constructor = o;
                var a = o.prototype;
                return a.updateMatrix = function() {
                    r.identity(this.modelMatrix), r.translate(this.modelMatrix, this.modelMatrix, this.position), r.identity(this.rotation), r.rotate(this.rotation, this.rotation, this.rotateY, i.fromValues(0, 1, 0)), r.rotate(this.rotation, this.rotation, this.rotateX, i.fromValues(1, 0, 0)), r.rotate(this.rotation, this.rotation, this.rotateZ, i.fromValues(0, 0, 1)), r.multiply(this.modelMatrix, this.modelMatrix, this.rotation), r.scale(this.modelMatrix, this.modelMatrix, this.scale), this.modelMatrixNeedUpdate = !1, this.worldMatrixNeedsUpdate = !0
                }, a.updateWorldMatrix = function(t) {
                    n.prototype.updateWorldMatrix.call(this, t), r.invert(this.viewMatrix, this.worldMatrix)
                }, o.prototype.clone = function(t) {
                    return void 0 === t && (t = new o), n.prototype.clone.call(this, t), t.rotateX = this.rotateX, t.rotateY = this.rotateY, t.rotateZ = this.rotateZ, t.projectionMatrix = r.clone(this.projectionMatrix), t.viewMatrix = r.clone(this.viewMatrix), t
                }, o
            }(),
            g = function() {
                var i = (t.vec2, function(t, r, i, n, o) {
                    this.id = e.TextureIdCount++, this.image = t, this.wrapS = void 0 !== r ? wraps : e.ClampToEdgeWrapping, this.wrapT = void 0 !== i ? i : e.ClampToEdgeWrapping, this.magFilter = void 0 !== n ? n : e.LinearFilter, this.minFilter = void 0 !== o ? o : e.LinearFilter, this.flipY = !0, this.needsUpdate = !0, this.glTexture = null
                });
                return i.prototype = {
                    constructor: i,
                    dispose: function() {
                        this.dispatchEvent({
                            type: "dispose"
                        })
                    },
                    clone: function(t) {
                        return void 0 === t && (t = new i), t.image = this.image, t.wrapS = this.wrapS, t.wrapT = this.wrapT, t.magFilter = this.magFilter, t.minFilter = this.minFilter, t.flipY = this.flipY, t
                    }
                }, r.prototype.apply(i.prototype), i
            }(),
            M = function() {
                function i(t) {
                    var e, r = {};
                    for (var i in t) {
                        r[i] = {};
                        for (var n in t[i]) e = t[i][n], void 0 === e || e instanceof g || (r[i][n] = e instanceof Array ? e.slice(0) : e)
                    }
                    return r
                }
                var n = (t.vec3, function() {
                    this.id = e.MaterialIdCount++, this.uniforms = {}, this.attributes = {}, this.vertexShader = "void main() {gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4( position, 1.0 );}", this.fragmentShader = "void main() {gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );}", this.side = e.DoubleSide, this.transparent = !1, this.depthWrite = !0, this.depthTest = !0, this.visible = !0, this.needsUpdate = !0
                });
                return n.prototype = {
                    constructor: n,
                    clone: function(t) {
                        return void 0 === t && (t = new n), t.uniforms = i(this.uniforms), t.attributes = this.attributes, t.side = this.side, t.transparent = this.transparent, t.depthTest = this.depthTest, t.depthWrite = this.depthWrite, t.visible = this.visible, t.fragmentShader = this.fragmentShader, t.vertexShader = this.vertexShader, t
                    },
                    dispose: function() {
                        this.dispatchEvent({
                            type: "dispose"
                        })
                    }
                }, r.prototype.apply(n.prototype), n
            }(),
            x = function() {
                var t = function(t, e, r) {
                    var n = t.createShader(e);
                    return t.shaderSource(n, r), t.compileShader(n), !1 === t.getShaderParameter(n, t.COMPILE_STATUS) && i.error("[WebGLShader] Shader could not be compiled."), "" !== t.getShaderInfoLog(n) && (i.warn("[WebGLShader] INFO LOG: " + t.getShaderInfoLog(n)), i.warn("[WebGLShader] Shader is: " + r)), n
                };
                return t
            }(),
            b = function() {
                var t = function(t, e, r) {
                        for (var n, o = "[WebGLProgram] GL 获取uniform地址：\n", a = {}, s = 0, u = r.length; u > s; s++) n = r[s], a[n] = t.getUniformLocation(e, n), o += "                -   " + n + ": " + a[n] + " \n";
                        return i.log(o), a
                    },
                    r = function(t, e, r) {
                        for (var n, o = "[WebGLProgram] GL 获取Attribute地址：\n", a = {}, s = 0, u = r.length; u > s; s++) n = r[s], a[n] = t.getAttribLocation(e, n), o += "                -   " + n + ": " + a[n] + " \n";
                        return i.log(o), a
                    },
                    n = function(n, o, a, s) {
                        this.id = e.ProgramIdCount++;
                        var u, c, f = n,
                            h = a.attributes,
                            l = a.uniforms,
                            d = a.vertexShader,
                            p = a.fragmentShader,
                            v = f.createProgram();
                        u = ["precision " + s.precision + " float;", "uniform mat4 mvpMatrix;", "attribute vec3 position;", "attribute vec2 uv;", ""].join("\n"), c = ["precision " + s.precision + " float;", ""].join("\n");
                        var m = new x(f, f.VERTEX_SHADER, u + d),
                            g = new x(f, f.FRAGMENT_SHADER, c + p);
                        f.attachShader(v, m), f.attachShader(v, g), f.linkProgram(v), i.log("[WebGLProgram] create program - attach shader - link program");
                        var M = f.getProgramInfoLog(v);
                        !1 === f.getProgramParameter(v, f.LINK_STATUS) && i.error("[WebGLProgram] shader error: " + f.getError(), "Program Info Log: " + M), "" !== M && i.warn("[WebGLProgram] Program Info Log: " + M), f.deleteShader(m), f.deleteShader(g);
                        var b = ["mvpMatrix"];
                        for (var y in l) b.push(y);
                        this.uniforms = t(f, v, b), b = ["position", "uv"];
                        for (var w in h) b.push(w);
                        this.attributes = r(f, v, b), this.program = v, this.vertexShader = m, this.fragmentShader = g, this.code = o, this.usedTimes = 1
                    };
                return n
            }(),
            y = function() {
                var t = function(t) {
                    var e = new Uint8Array(16),
                        r = new Uint8Array(16),
                        i = void 0,
                        n = void 0,
                        o = void 0,
                        a = void 0,
                        s = void 0,
                        u = void 0;
                    this.initAttributes = function() {
                        for (var t = 0, r = e.length; r > t; t++) e[t] = 0
                    }, this.enableAttribute = function(i) {
                        e[i] = 1, 0 === r[i] && (t.enableVertexAttribArray(i), r[i] = 1)
                    }, this.disableAttribute = function(i) {
                        e[i] = 0, 1 === r[i] && (t.disableVertexAttribArray(i), r[i] = 0)
                    }, this.disableUnusedAttributes = function() {
                        for (var i = 0, n = r.length; n > i; i++) r[i] !== e[i] && (t.disableVertexAttribArray(i), r[i] = 0)
                    }, this.setDepthTest = function(e) {
                        i !== e && (e ? t.enable(t.DEPTH_TEST) : t.disable(t.DEPTH_TEST), i = e)
                    }, this.setDepthWrite = function(e) {
                        n !== e && (t.depthMask(e), n = e)
                    }, this.setColorWrite = function(e) {
                        o !== e && (t.colorMask(e, e, e, e), o = e)
                    }, this.setDoubleSided = function(e) {
                        a !== e && (e ? t.disable(t.CULL_FACE) : t.enable(t.CULL_FACE), a = e)
                    }, this.setFlipSided = function(e) {
                        s !== e && (t.frontFace(e ? t.CW : t.CCW), s = e)
                    }, this.setLineWidth = function(e) {
                        e !== u && (t.lineWidth(e), u = e)
                    }, this.setDefaultGLState = function(e, r, i, n) {
                        t.clearColor(0, 0, 0, 1), t.clearDepth(1), t.clearStencil(0), t.enable(t.DEPTH_TEST), t.depthFunc(t.LEQUAL), t.frontFace(t.CCW), t.disable(t.CULL_FACE), t.enable(t.BLEND), t.blendEquation(t.FUNC_ADD), t.blendFunc(t.SRC_ALPHA, t.ONE_MINUS_SRC_ALPHA), t.viewport(e, r, i, n)
                    }, this.reset = function() {
                        for (var t = 0; t < r.length; t++) r[t] = 0;
                        i = void 0, n = void 0, o = void 0, a = void 0, s = void 0
                    }
                };
                return t
            }(),
            w = function() {
                var t = function(t) {
                    var e = t.getParameter(t.MAX_TEXTURE_IMAGE_UNITS),
                        r = (t.getParameter(t.MAX_VERTEX_TEXTURE_IMAGE_UNITS), t.getParameter(t.MAX_TEXTURE_SIZE)),
                        n = t.getExtension("OES_element_index_uint") ? 4294967296 : 65535,
                        o = t.getShaderPrecisionFormat(t.VERTEX_SHADER, t.HIGH_FLOAT),
                        a = t.getShaderPrecisionFormat(t.VERTEX_SHADER, t.MEDIUM_FLOAT),
                        s = t.getShaderPrecisionFormat(t.FRAGMENT_SHADER, t.HIGH_FLOAT),
                        u = t.getShaderPrecisionFormat(t.FRAGMENT_SHADER, t.MEDIUM_FLOAT),
                        c = o.precision > 0 && s.precision > 0,
                        f = a.precision > 0 && u.precision > 0;
                    this.getMaxTextures = function() {
                        return e
                    }, this.getMaxTextureSize = function() {
                        return r
                    }, this.getMaxVerticesOneDraw = function() {
                        return n
                    }, this.getLegalPrecision = function(t) {
                        return "highp" !== t || c ? "mediump" !== t || f || (t = "lowp", i.warn("[WebGLCapability] mediump is not supported, using lowp by default.")) : f ? (t = "mediump", i.warn("[WebGLCapability] highp is not supported, using mediump by default.")) : (t = "lowp", i.warn("[WebGLCapability] highp and mediump is not supported, using lowp by default.")), t
                    }
                };
                return t
            }(),
            E = function() {
                var t = function(t, r, n) {
                    function o(t, e) {
                        if (t.width > e || t.height > e) {
                            var r = e / Math.max(t.width, t.height),
                                i = document.createElement("canvas");
                            i.width = Math.floor(t.width * r), i.height = Math.floor(t.height * r);
                            var n = i.getContext("2d");
                            return n.drawImage(t, 0, 0, t.width, t.height, 0, 0, i.width, i.height), i
                        }
                        return t
                    }

                    function a(t, r, n, o) {
                        o ? (t.texParameteri(r, t.TEXTURE_WRAP_S, s(t, n.wrapS)), t.texParameteri(r, t.TEXTURE_WRAP_T, s(t, n.wrapT)), t.texParameteri(r, t.TEXTURE_MAG_FILTER, s(t, n.magFilter)), t.texParameteri(r, t.TEXTURE_MIN_FILTER, s(t, n.minFilter))) : (t.texParameteri(r, t.TEXTURE_WRAP_S, t.CLAMP_TO_EDGE), t.texParameteri(r, t.TEXTURE_WRAP_T, t.CLAMP_TO_EDGE), (n.wrapS !== e.ClampToEdgeWrapping || n.wrapT !== e.ClampToEdgeWrapping) && i.warn("[TextureOperation] As the texture is not power of 2, the wrap model must be ClampToEdgeWrapping"), t.texParameteri(r, t.TEXTURE_MAG_FILTER, u(t, n.magFilter)), t.texParameteri(r, t.TEXTURE_MIN_FILTER, u(t, n.minFilter)), n.minFilter !== e.NearestFilter && n.minFilter !== e.LinearFilter && i.warn("[TextureOperation] As the texture is not power of two, the filter model should be NearestFilter or LinearFilter."))
                    }

                    function s(t, r) {
                        return e.RepeatWrapping === r ? t.REPEAT : e.ClampToEdgeWrapping === r ? t.CLAMP_TO_EDGE : e.MirroredRepeatWrapping === r ? t.MIRRORED_REPEAT : e.NearestFilter === r ? t.NEAREST : e.NearestMipMapNearestFilter === r ? t.NEAREST_MIPMAP_NEAREST : e.NearestMipMapLinearFilter === r ? t.NEAREST_MIPMAP_LINEAR : e.LinearFilter === r ? t.LINEAR : e.LinearMipMapNearestFilter === r ? t.LINEAR_MIPMAP_NEAREST : e.LinearMipMapLinearFilter === r ? t.LINEAR_MIPMAP_LINEAR : void 0
                    }

                    function u(t, r) {
                        return e.NearestFilter === r || e.NearestMipMapNearestFilter === r || e.NearestMipMapLinearFilter === r ? t.NEAREST : t.LINEAR
                    }
                    this.gl = t, this.maxTextureSize = n, this.maxTextures = r, this.usedTextureUnits = 0;
                    var c = t,
                        f = this;
                    this.getTextureUnit = function() {
                        var t = this.usedTextureUnits;
                        return this.usedTextureUnits >= this.maxTextures ? (this.usedTextureUnits = 0, i.warn("[TextureOperation] trying to use " + this.usedTextureUnits + " texture units while this GPU supports only " + this.maxTextures)) : this.usedTextureUnits += 1, t
                    }, this.resetUsedTextureUnits = function() {
                        this.usedTextureUnits = 0
                    }, this.setTexture = function(t, e) {
                        this.gl.activeTexture(this.gl.TEXTURE0 + e), i.log("[TextureOperation] Select active texture unit: " + (this.gl.TEXTURE0 + e)), t.needsUpdate ? this.uploadTexture(this.gl, t, this.maxTextureSize) : (this.gl.bindTexture(this.gl.TEXTURE_2D, t.glTexture), i.log("[TextureOperation] 绑定纹理"))
                    }, this.uploadTexture = function(t, e, r) {
                        void 0 === e.__webglInit && (e.__webglInit = !0, e.addEventListener("dispose", l), e.glTexture = t.createTexture(), i.log("[TextureOperation] 创建GL纹理容器"), this.dispatchEvent({
                            type: "createTexture"
                        })), t.bindTexture(t.TEXTURE_2D, e.glTexture), i.log("[TextureOperation] 绑定纹理"), t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL, e.flipY), e.image = o(e.image, r), i.log("[TextureOperation] 检查纹理图片的大小");
                        var n = v.isPowerOfTwo(e.image.width) && v.isPowerOfTwo(e.image.height);
                        i.log("[TextureOperation] 纹理大小是否是2的N次方，" + n), a(t, t.TEXTURE_2D, e, n), t.texImage2D(t.TEXTURE_2D, 0, t.RGBA, t.RGBA, t.UNSIGNED_BYTE, e.image), i.log("[TextureOperation] 将纹理的Image对象上传到GPU"), e.needsUpdate = !1
                    }, this.setTextureForRenderTarget = function(t, e) {
                        e.glTexture = c.createTexture(), t.bindTexture(t.TEXTURE_2D, e.glTexture), a(t, t.TEXTURE_2D, e, !0), t.texImage2D(t.TEXTURE_2D, 0, t.RGBA, e.glFrameBuffer.width, e.glFrameBuffer.height, 0, t.RGBA, t.UNSIGNED_BYTE, null)
                    };
                    var h = function(t) {
                            void 0 !== t.__webglInit && (i.warn("[TextureOperation] Deallocate Texture."), c.deleteTexture(t.glTexture), delete t.glTexture, delete t.__webglInit)
                        },
                        l = function(t) {
                            var e = t.target;
                            e.removeEventListener("dispose", l), h(e), f.dispatchEvent({
                                type: "disposeTexture"
                            })
                        };
                    this.dispose = function() {
                        this.dispatchEvent({
                            type: "dispose"
                        })
                    }
                };
                return r.prototype.apply(t.prototype), t
            }(),
            T = function() {
                var t = function() {};
                return t.loadUniformsGeneric = function(t, e, r) {
                    for (var n, o, a, s, u, c, f = 0, h = e.length; h > f; f++) switch (a = e[f], s = a[0].type, u = a[0].value, c = a[1], s) {
                        case "1i":
                            t.uniform1i(c, u);
                            break;
                        case "1f":
                            t.uniform1f(c, u);
                            break;
                        case "3f":
                            t.uniform3f(c, u[0], u[1], u[2]);
                            break;
                        case "4f":
                            t.uniform4f(c, u[0], u[1], u[2], u[3]);
                            break;
                        case "t":
                            if (n = u, !n || !n.image && !n.glTexture) continue;
                            o = r.getTextureUnit(), t.uniform1i(c, o), r.setTexture(n, o);
                            break;
                        case "tv":
                            void 0 === uniform._array && (uniform._array = []);
                            for (var f = 0, l = uniform.value.length; l > f; f++) uniform._array[f] = r.getTextureUnit();
                            t.uniform1iv(c, uniform._array);
                            for (var f = 0, l = uniform.value.length; l > f; f++) n = uniform.value[f], n && (n.image || n.glTexture) && (o = uniform._array[f], r.setTexture(n, o));
                            break;
                        default:
                            i.warn("[UniformOperation] Unknown uniform type: " + s)
                    }
                }, t
            }(),
            A = function() {
                var r = (t.vec3, t.mat4),
                    n = function(t) {
                        function n() {
                            try {
                                var t = {
                                    alpha: _,
                                    depth: U,
                                    stencil: P,
                                    antialias: I,
                                    premultipliedAlpha: S,
                                    preserveDrawingBuffer: C
                                };
                                if (N = B || F.getContext("webgl", t) || F.getContext("experimental-webgl", t) || F.getContext("moz-webgl", t) || F.getContext("webkit-3d", t), !N) throw null !== F.getContext ? "Error creating WebGL context with your provided attributes." : "Error creating WebGL context.";
                                F.addEventListener("webglcontextlost", function(t) {
                                    t.preventDefault(), $(), void 0 !== W && W.setDefaultGLState(k, Z, H, Q), renderedObjects = {}
                                }, !1)
                            } catch (e) {
                                i.error("[WebGLRenderer] Crate webgl error:" + e)
                            }
                        }

                        function o(t) {
                            if (!0 === t.visible && (u(t), t instanceof h))
                                for (var e, r = t.meshList, i = 0, n = r.length; n > i; i++) e = r[i], !0 === e.visible && u(r[i])
                        }

                        function a(t, e, r) {
                            var n = !1,
                                o = e.id + "_" + t.id;
                            if (o !== z && (z = o, n = !0), n) {
                                var a = t.attributes;
                                W.initAttributes(), 0 <= a.position && (!0 !== r ? (N.bindBuffer(N.ARRAY_BUFFER, e.glVerticesBuffer), W.enableAttribute(a.position), N.vertexAttribPointer(a.position, 3, N.FLOAT, N.FALSE, 0, 0)) : W.enableAttribute(a.position), i.log("[WebGLRenderer] 把刚刚绑定到ARRAY_BUFFER上的WebGLBuffer对象赋值给顶点属性")), 0 <= a.uv && void 0 !== e.glUvtsBuffer && (N.bindBuffer(N.ARRAY_BUFFER, e.glUvtsBuffer), W.enableAttribute(a.uv), N.vertexAttribPointer(a.uv, 2, N.FLOAT, N.FALSE, 0, 0), i.log("[WebGLRenderer] 把刚刚绑定到ARRAY_BUFFER上的WebGLBuffer对象赋值给UV属性"))
                            }
                            return W.disableUnusedAttributes(), n
                        }

                        function s(t, r, n, o) {
                            if (t.uniforms.showDebugLine && N.uniform1i(t.uniforms.showDebugLine, !1), N.bindBuffer(N.ELEMENT_ARRAY_BUFFER, r.glIndicesBuffer), i.log("[WebGLRenderer] 绑定索引数组"), void 0 !== O && void 0 !== O.glFrameBuffer) {
                                var a = N.checkFramebufferStatus(N.FRAMEBUFFER);
                                if (N.FRAMEBUFFER_COMPLETE !== a) return R(O), O = void 0, void i.error("Framebuffer object is incomplete: " + a.toString())
                            }
                            if (type = N.UNSIGNED_SHORT, i.log("[WebGLRenderer] 开始渲染 + " + r.indicesBufferData.length), N.drawElements(N.TRIANGLES, r.indicesBufferData.length, type, 0), !0 === r.showBorder && void 0 !== r.borderVerticesBufferData) {
                                o && (N.bindBuffer(N.ARRAY_BUFFER, r.glBorderVerticesBuffer), N.vertexAttribPointer(t.attributes.position, 3, N.FLOAT, N.FALSE, 0, 0), i.log("[WebGLRenderer] 把刚刚绑定到ARRAY_BUFFER上的WebGLBuffer对象赋值给顶点属性"));
                                var s = r.borderWidth,
                                    u = r.borderColor;
                                W.setLineWidth(s * L), N.uniform4f(t.uniforms.vColor, u[0], u[1], u[2], u[3]), i.log("[WebGLRenderer] 开始渲染边框"), N.drawArrays(N.LINE_LOOP, 0, r.borderVerticesBufferData.length / 3)
                            }!0 === e.ShowDebugLine && t.uniforms.showDebugLine && !0 === n.uniforms.showDebugLine.value && (N.uniform1i(t.uniforms.showDebugLine, !0), o && N.bindBuffer(N.ELEMENT_ARRAY_BUFFER, r.glIndicesBuffer), i.log("[WebGLRenderer] 开始渲染辅助线"), N.drawElements(N.LINE_LOOP, r.indicesBufferData.length, type, 0))
                        }

                        function u(t) {
                            !0 !== t.__webglInit && (t.__webglInit = !0, t.addEventListener("removed", oe)), c(t.geometry)
                        }

                        function c(t) {
                            void 0 !== t && (!0 !== t.__webglInit && (t.__webglInit = !0, t.addEventListener("dispose", ae), t.groupsNeedUpdate = !0), !0 === t.groupsNeedUpdate && (f(t, N.STATIC_DRAW), t.groupsNeedUpdate = !1))
                        }

                        function f(t, e) {
                            i.log("[WebGLRenderer] 开始绑定数据");
                            var r = t.verticesBufferData,
                                n = t.uvtsBufferData,
                                o = t.indicesBufferData,
                                a = t.borderVerticesBufferData;
                            0 < r.length && (t.glVerticesBuffer = N.createBuffer(), N.bindBuffer(N.ARRAY_BUFFER, t.glVerticesBuffer), N.bufferData(N.ARRAY_BUFFER, r, e), i.log("[WebGLRenderer] BindBuffer：绑定顶点WebGLBuffer对象，并往里push了长度为" + r.length + "的值")), 0 < n.length && (t.glUvtsBuffer = N.createBuffer(), N.bindBuffer(N.ARRAY_BUFFER, t.glUvtsBuffer), N.bufferData(N.ARRAY_BUFFER, n, e), i.log("[WebGLRenderer] BindBuffer：绑定UVT值WebGLBuffer对象，并往里push了长度为" + n.length + "的值")), 0 < o.length && (t.glIndicesBuffer = N.createBuffer(), N.bindBuffer(N.ELEMENT_ARRAY_BUFFER, t.glIndicesBuffer), N.bufferData(N.ELEMENT_ARRAY_BUFFER, o, e), i.log("[WebGLRenderer] BindBuffer：绑定索引WebGLBuffer对象，并往里push了长度为" + o.length + "的值")), !0 === t.showBorder && void 0 !== a && 0 < a.length && (t.glBorderVerticesBuffer = N.createBuffer(), N.bindBuffer(N.ARRAY_BUFFER, t.glBorderVerticesBuffer), N.bufferData(N.ARRAY_BUFFER, t.borderVerticesBufferData, e), i.log("[WebGLRenderer] BindBuffer：绑定边界索引WebGLBuffer对象，并往里push了长度为" + t.borderVerticesBufferData.length + "的值"))
                        }

                        function l(t) {
                            void 0 !== t && (!0 !== t.__webglInit && (t.__webglInit = !0, t.addEventListener("dispose", se), t.needsUpdate = !0), !0 === t.needsUpdate && (d(t), t.needsUpdate = !1))
                        }

                        function d(t) {
                            t.program && ne(t);
                            for (var e, r, i = [t.vertexShader, t.fragmentShader].join(""), n = 0, o = j.length; o > n; n++)
                                if (r = j[n], r.code === i) {
                                    e = r, e.usedTimes++;
                                    break
                                }
                            void 0 === e && (e = new b(N, i, t, {
                                precision: D
                            }), j.push(e)), t.program = e, t.uniformsList = [];
                            var a, s = e.uniforms,
                                u = t.uniforms,
                                c = 0;
                            for (var f in u) a = s[f], a && (t.uniformsList[c] = [u[f], a], c++)
                        }

                        function p(t, e, n) {
                            if (void 0 !== t.mvpMatrix) {
                                var o = r.clone(e.projectionMatrix);
                                r.multiply(o, o, e.viewMatrix), r.multiply(o, o, n.worldMatrix), N.uniformMatrix4fv(t.mvpMatrix, !1, o), i.log("[WebGLRenderer] WebGL Uniform矩阵赋值：模型视图投影矩阵赋值 ")
                            }
                            Y = e
                        }

                        function v(t) {
                            void 0 !== t && void 0 === t.glFrameBuffer && (t.addEventListener("dispose", A), t.glFrameBuffer = N.createFramebuffer(), N.bindFramebuffer(N.FRAMEBUFFER, t.glFrameBuffer), t.glFrameBuffer.width = t.width, t.glFrameBuffer.height = t.height, G.setTextureForRenderTarget(N, t), t.glDepthBuffer = N.createRenderbuffer(), N.bindRenderbuffer(N.RENDERBUFFER, t.glDepthBuffer), N.renderbufferStorage(N.RENDERBUFFER, N.DEPTH_COMPONENT16, t.width, t.height), N.framebufferTexture2D(N.FRAMEBUFFER, N.COLOR_ATTACHMENT0, N.TEXTURE_2D, t.glTexture, 0), N.framebufferRenderbuffer(N.FRAMEBUFFER, N.DEPTH_ATTACHMENT, N.RENDERBUFFER, t.glDepthBuffer), N.bindTexture(N.TEXTURE_2D, null), N.bindRenderbuffer(N.RENDERBUFFER, null), N.bindFramebuffer(N.FRAMEBUFFER, null))
                        }

                        function g(t) {
                            var e = t.target;
                            e.removeEventListener("dispose", g), e.removeEventListener("createTexture", M), e.removeEventListener("disposeTexture", x)
                        }

                        function M() {}

                        function x() {}

                        function A(t) {
                            var e = t.target;
                            e.removeEventListener("dispose", se), R(e)
                        }

                        function R(t) {
                            N.deleteRenderbuffer(t.glDepthBuffer), delete t.glDepthBuffer, N.deleteTexture(t.glTexture), delete t.glTexture, N.deleteFramebuffer(t.glFrameBuffer), delete t.glFrameBuffer
                        }
                        t = t || {};
                        var F = void 0 !== t.canvas ? t.canvas : document.createElement("canvas"),
                            B = void 0 !== t.context ? t.context : void 0,
                            L = void 0 !== t.pixelRatio ? t.pixelRatio : 1,
                            D = void 0 !== t.precision ? t.precision : "highp",
                            _ = void 0 !== t.alpha ? t.alpha : !1,
                            U = void 0 !== t.depth ? t.depth : !0,
                            P = void 0 !== t.stencil ? t.stencil : !0,
                            I = void 0 !== t.antialias ? t.antialias : !0,
                            S = void 0 !== t.premultipliedAlpha ? t.premultipliedAlpha : !0,
                            C = void 0 !== t.preserveDrawingBuffer ? t.preserveDrawingBuffer : !1;
                        this.domElement = F, this.autoClear = !0;
                        var N, W, V, G, O, j = [],
                            q = null,
                            X = null,
                            z = null,
                            Y = null,
                            k = 0,
                            Z = 0,
                            H = F.width,
                            Q = F.height,
                            K = !0;
                        n(), W = new y(N), W.setDefaultGLState(k, Z, H, Q), V = new w(N), D = V.getLegalPrecision(D), G = new E(N, V.getMaxTextures(), V.getMaxTextureSize()), G.addEventListener("dispose", g), G.addEventListener("createTexture", M), G.addEventListener("disposeTexture", x), this.context = N, self = this;
                        var J = void 0;
                        this.appendToParent = function(t) {
                            J = t, J.addChild(F)
                        }, this.removeFromParent = function() {
                            void 0 !== J && (J.removedChild(F), this.dispose())
                        }, this.setAutoDisposeProgram = function(t) {
                            K = t
                        }, this.setSize = function(t, e) {
                            F.style.width = t + "px", F.style.height = e + "px", F.width = t * L, F.height = e * L, this.setViewport(0, 0, t, e)
                        }, this.setViewport = function(t, e, r, i) {
                            k = t * L, Z = e * L, H = r * L, Q = i * L, N.viewport(k, Z, H, Q)
                        }, this.setClearColor = function(t, e, r, i) {
                            i = void 0 !== i ? i : 1, !0 === S && (t *= i, e *= i, r *= i), N.clearColor(t, e, r, i)
                        }, this.getContext = function() {
                            return N
                        }, this.forceContextLoss = function() {
                            try {
                                N.getExtension("WEBGL_lose_context").loseContext()
                            } catch (t) {}
                        }, this.getPixelRatio = function() {
                            return L
                        }, this.setPixelRatio = function(t) {
                            L = t
                        }, this.clearBuffer = function() {
                            N.clear(N.COLOR_BUFFER_BIT | N.DEPTH_BUFFER_BIT)
                        };
                        var $ = function() {
                            q = null, z = null, X = null, Y = null, W.reset()
                        };
                        this.render = function(t, e, r, n) {
                            return i.log("[WebGLRenderer] Render Start... ..."), e instanceof m ? (t.updateWorldMatrix(), e.updateWorldMatrix(), e.updateProjectionMatrix(), Y = null, void 0 !== r ? (v(r), O = r, N.bindFramebuffer(N.FRAMEBUFFER, O.glFrameBuffer), N.viewport(0, 0, O.width, O.height)) : (O = void 0, N.bindFramebuffer(N.FRAMEBUFFER, null), N.viewport(0, 0, H, Q)), void 0 !== n ? !0 === n && this.clearBuffer() : this.autoClear && this.clearBuffer(), te(t, e), void ee(t, e)) : void i.error("[WebGLRenderer]  Camera is not leagal.")
                        };
                        var te = function(t) {
                                if (!0 === t.visible)
                                    for (var e = t.children, r = 0, i = e.length; i > r; r++) o(e[r])
                            },
                            ee = function(t, e) {
                                for (var r = t.children, i = 0, n = r.length; n > i; i++) re(r[i], e)
                            },
                            re = function(t, r) {
                                var i = t.material,
                                    n = t.geometry;
                                if (!0 === t.visible && void 0 !== i && void 0 !== n && !0 === i.visible) {
                                    W.setDoubleSided(i.side === e.DoubleSide), W.setFlipSided(i.side === e.BackSide), W.setDepthTest(i.depthTest);
                                    var o;
                                    if (t instanceof h) {
                                        o = ie(r, i, t, !1), a(o, n);
                                        for (var o, u, c, f, d = t.meshList, p = 0, v = d.length; v > p; p++)
                                            if (u = d[p], !0 === u.visible) {
                                                c = u.geometry, f = u.material, G.resetUsedTextureUnits(), l(f), T.loadUniformsGeneric(N, f.uniformsList, G);
                                                var m = a(o, c, !0);
                                                s(o, c, f, m)
                                            }
                                    } else {
                                        o = ie(r, i, t);
                                        var m = a(o, n);
                                        s(o, n, i, m)
                                    }
                                }
                            },
                            ie = function(t, e, r, i) {
                                G.resetUsedTextureUnits(), l(r.material);
                                var n = e.program,
                                    o = n.uniforms,
                                    a = (e.uniforms, !1);
                                return n.id !== q && (N.useProgram(n.program), q = n.id, a = !0), e.id !== X && (X = e.id, a = !0), !1 !== i && T.loadUniformsGeneric(N, e.uniformsList, G), p(o, t, r), n
                            },
                            ne = function(t) {
                                var e = t.program.program;
                                if (void 0 !== e) {
                                    t.program = void 0, i.log("[WebGLRenderer] dispose material : " + t.id);
                                    var r, n;
                                    for (r = j.length - 1; r >= 0; r--)
                                        if (n = j[r], n.program === e) {
                                            n.usedTimes--, 0 === n.usedTimes && !1 !== K && (j.splice(r, 1), N.deleteProgram(e));
                                            break
                                        }
                                }
                            };
                        this.dispose = function() {};
                        var oe = function(t) {
                                var e = t.target;
                                e.traverse(function(t) {
                                    t.removeEventListener("removed", oe), ue(t)
                                })
                            },
                            ae = function(t) {
                                var e = t.target;
                                e.removeEventListener("dispose", ae), ce(e)
                            },
                            se = function(t) {
                                var e = t.target;
                                e.removeEventListener("dispose", se), ne(e)
                            },
                            ue = function(t) {
                                t.geometry && delete t.geometry.__webglInit, delete t.__webglInit, delete t.__webglAddedIntoRenderedObjects
                            },
                            ce = function(t) {
                                delete t.__webglInit, fe(t), z = null
                            },
                            fe = function(t) {
                                for (var e, r = ["glVerticesBuffer", "glUvtsBuffer", "glIndicesBuffer", "glBorderVerticesBuffer"], i = 0, n = r.length; n > i; i++) e = r[i], void 0 !== t[e] && 0 < t[e] && (N.deleteBuffer(t[e]), delete t[e])
                            }
                    };
                return n
            }(),
            R = function() {
                var i = (t.vec2, function(t, r, i, n, o, a) {
                    this.width = t, this.height = r, this.wrapS = void 0 !== i ? i : e.ClampToEdgeWrapping, this.wrapT = void 0 !== n ? n : e.ClampToEdgeWrapping, this.magFilter = void 0 !== o ? o : e.LinearFilter, this.minFilter = void 0 !== a ? a : e.LinearFilter, this.glFrameBuffer = void 0, this.glTexture = null
                });
                return i.prototype = {
                    constructor: i,
                    dispose: function() {
                        this.dispatchEvent({
                            type: "dispose"
                        })
                    },
                    clone: function(t) {
                        return void 0 === t && (t = new i), t.image = this.image, t.wrapS = this.wrapS, t.wrapT = this.wrapT, t.magFilter = this.magFilter, t.minFilter = this.minFilter, t.flipY = this.flipY, t
                    }
                }, r.prototype.apply(i.prototype), i
            }(),
            F = function() {
                var r = t.vec3,
                    i = t.vec2,
                    n = function(t, n, s, u, c, f) {
                        switch (o.call(this), this.zeroAxis = void 0 !== c ? c : e.ZeroAxisZ, this.zeroAxis) {
                            case e.ZeroAxisX:
                                this.normal = r.fromValues(-1, 0, 0);
                                break;
                            case e.ZeroAxisY:
                                this.normal = r.fromValues(0, -1, 0);
                                break;
                            case e.ZeroAxisZ:
                                this.normal = r.fromValues(0, 0, -1);
                                break;
                            default:
                                this.normal = r.fromValues(0, -1, 0)
                        }
                        var f = void 0 !== f ? f : {};
                        this.showBorder = !(!1 === f.showBorder), this.borderWidth = void 0 !== f.borderWidth ? f.borderWidth : 1, this.borderColor = void 0 !== f.borderColor ? f.borderColor : [0, 0, 0, 1];
                        var h = .5 * t,
                            l = .5 * n,
                            d = s || 1,
                            p = u || 1,
                            m = t / d,
                            g = n / p,
                            M = (d + 1) * (p + 1);
                        this.verticesBufferData = new Float32Array(3 * M), this.uvtsBufferData = new Float32Array(2 * M), this.indicesBufferData = new(M > 65535 ? Uint32Array : Uint16Array)(d * p * 6);
                        var x, b, y, w, E, T, A = function(t, e, r) {
                                t[r] = e[0], t[r + 1] = e[1], t[r + 2] = e[2]
                            },
                            R = 0,
                            F = 0;
                        for (x = 0; p >= x; x++)
                            for (w = x * g - l, b = 0; d >= b; b++) y = b * m - h, T = i.fromValues(y, w), E = v.get3DVertex(T, this.zeroAxis), this.vertices.push(E), A(this.verticesBufferData, E, R), this.uvtsBufferData[F] = b / d, this.uvtsBufferData[F + 1] = 1 - x / p, R += 3, F += 2;
                        var B, L, D, _, U = 0;
                        for (x = 0; p > x; x++)
                            for (b = 0; d > b; b++) B = b + (d + 1) * x, L = b + (d + 1) * (x + 1), D = b + 1 + (d + 1) * (x + 1), _ = b + 1 + (d + 1) * x, A(this.indicesBufferData, [B, L, D], U), this.triangles.push(new a([B, L, D])), A(this.indicesBufferData, [B, D, _], U + 3), this.triangles.push(new a([B, D, _])), U += 6;
                        this.borderIndicesBufferData = new Uint16Array(4), this.borderIndicesBufferData[0] = 0, this.borderIndicesBufferData[1] = d, this.borderIndicesBufferData[2] = (d + 1) * p, this.borderIndicesBufferData[3] = (d + 1) * (p + 1) - 1;
                        var P = 0;
                        for (this.borderVerticesBufferData = new Float32Array(6 * (d + p)), x = 0; M > x;) vartex = this.vertices[x], A(this.borderVerticesBufferData, vartex, P), P += 3, x += d + 1;
                        for (x = (d + 1) * p + 1; M > x; x++) vartex = this.vertices[x], A(this.borderVerticesBufferData, vartex, P), P += 3;
                        for (x = (d + 1) * p - 1; x > 0;) vartex = this.vertices[x], A(this.borderVerticesBufferData, vartex, P), P += 3, x -= d + 1;
                        for (x = d - 1; x > 0; x--) vartex = this.vertices[x], A(this.borderVerticesBufferData, vartex, P), P += 3
                    };
                return n.prototype = Object.create(o.prototype), n.prototype.constructor = n, n
            }(),
            B = function() {
                var r = t.vec3,
                    i = t.vec2,
                    n = function(t, n, s, u, c) {
                        o.call(this), t = t || 200, n = Math.floor(n) || 30, s = void 0 !== s ? s : 0, u = void 0 !== u ? u : 2 * Math.PI, this.zeroAxis = void 0 !== c ? c : e.ZeroAxisZ;
                        var f = n + 1;
                        this.verticesBufferData = new Float32Array(3 * f), this.uvtsBufferData = new Float32Array(2 * f), this.indicesBufferData = new(f > 65535 ? Uint32Array : Uint16Array)(3 * n);
                        var h = function(t, e, r) {
                                t[r] = e[0], t[r + 1] = e[1], t[r + 2] = e[2]
                            },
                            l = r.fromValues(0, 0, 0);
                        this.vertices.push(l), h(this.verticesBufferData, l, M), this.uvtsBufferData[0] = .5, this.uvtsBufferData[1] = .5;
                        for (var d, p, m, g = u / n, M = 3, x = 2, b = 0, y = 0; n > y; y++) m = s + g * y, p = i.fromValues(Math.sin(m) * t, Math.cos(m) * t), d = v.get3DVertex(p, this.zeroAxis), this.vertices.push(d), h(this.verticesBufferData, d, M), this.uvtsBufferData[x] = .5 * (t + p[0]) / t, this.uvtsBufferData[x + 1] = 1 - .5 * (t - p[1]) / t, n - 1 > y ? (h(this.indicesBufferData, [y + 1, 0, y + 2], b), this.triangles.push(new a([y + 1, 0, y + 2]))) : (h(this.indicesBufferData, [y + 1, 0, 1], b), this.triangles.push(new a([y + 1, 0, 1]))), M += 3, x += 2, b += 3
                    };
                return n.prototype = Object.create(o.prototype), n.prototype.constructor = n, n
            }(),
            L = function() {
                var r = (t.vec3, t.vec2),
                    i = function(t, i, n, s, u, c) {
                        o.call(this), t = t || 100, i = i || 200, n = Math.floor(n) || 30, s = void 0 !== s ? s : 0, u = void 0 !== u ? u : 2 * Math.PI, this.zeroAxis = void 0 !== c ? c : e.ZeroAxisZ;
                        var f = 2 * n;
                        this.verticesBufferData = new Float32Array(3 * f), this.uvtsBufferData = new Float32Array(2 * f), this.indicesBufferData = new(f > 65535 ? Uint32Array : Uint16Array)(6 * n);
                        for (var h, l, d, p, m, g, M, x, b, y = function(t, e, r) {
                                t[r] = e[0], t[r + 1] = e[1], t[r + 2] = e[2]
                            }, w = u / n, E = 0, T = 0, A = 0, R = 0; n > R; R++) m = s + w * R, p = r.fromValues(Math.sin(m) * i, Math.cos(m) * i), d = r.fromValues(Math.sin(m) * t, Math.cos(m) * t), l = v.get3DVertex(p, this.zeroAxis), h = v.get3DVertex(d, this.zeroAxis), this.vertices.push(l, h), y(this.verticesBufferData, l, E), E += 3, y(this.verticesBufferData, h, E), E += 3, this.uvtsBufferData[T] = .5 * (i + p[0]) / i, this.uvtsBufferData[T + 1] = 1 - .5 * (i - p[1]) / i, T += 2, this.uvtsBufferData[T] = .5 * (t + d[0]) / i, this.uvtsBufferData[T + 1] = 1 - .5 * (t - d[1]) / i, T += 2, g = 2 * R, M = 2 * R + 1, n - 1 > R ? (x = 2 * (R + 1) + 1, b = 2 * (R + 1)) : (x = 1, b = 0), y(this.indicesBufferData, [g, M, x], A), this.triangles.push(new a([g, M, x])), A += 3, y(this.indicesBufferData, [g, x, b], A), this.triangles.push(new a([g, x, b])), A += 3
                    };
                return i.prototype = Object.create(o.prototype), i.prototype.constructor = i, i
            }(),
            D = function() {
                var e = t.vec3,
                    r = t.mat4,
                    i = function(t, i, n) {
                        o.call(this);
                        var a = .5 * n;
                        this.vertices = [-a, -i, 0, -a, 0, 0, a, 0, 0, a, -i, 0], this.verticesBufferData = new Float32Array(this.vertices), this.indicesBufferData = new Uint16Array([0, 1, 2, 0, 2, 3]);
                        var s = [0, -1, 0];
                        targetDirection = [t[0], t[1], 0], e.normalize(targetDirection, targetDirection);
                        var u = Math.acos(e.dot(s, targetDirection)),
                            c = e.create();
                        e.cross(c, s, targetDirection);
                        var f = r.create();
                        f = r.rotate(f, f, u, c), Object.defineProperties(this, {
                            lineDirection: {
                                get: function() {
                                    return s
                                }
                            },
                            rotation: {
                                get: function() {
                                    return f
                                }
                            }
                        })
                    };
                return i.prototype = Object.create(o.prototype), i.prototype.constructor = i, i
            }(),
            _ = function() {
                var e = t.mat4,
                    r = function(t, e, r, i, n, o) {
                        m.call(this, n, o);
                        var t = t,
                            e = e,
                            r = r,
                            i = i;
                        Object.defineProperties(this, {
                            left: {
                                get: function() {
                                    return t
                                },
                                set: function(e) {
                                    t = e, this.projectionMatrixNeedUpdate = !0
                                }
                            },
                            right: {
                                get: function() {
                                    return e
                                },
                                set: function(t) {
                                    e = t, this.projectionMatrixNeedUpdate = !0
                                }
                            },
                            top: {
                                get: function() {
                                    return r
                                },
                                set: function(t) {
                                    r = t, this.projectionMatrixNeedUpdate = !0
                                }
                            },
                            bottom: {
                                get: function() {
                                    return i
                                },
                                set: function(t) {
                                    i = t, this.projectionMatrixNeedUpdate = !0
                                }
                            }
                        }), this.updateProjectionMatrix(!0)
                    };
                r.prototype = Object.create(m.prototype), r.prototype.constructor = r;
                var i = r.prototype;
                return i.updateProjectionMatrix = function(t) {
                    if (!0 === t || !0 === this.projectionMatrixNeedUpdate) {
                        var r = (this.right - this.left) / 2,
                            i = (this.top - this.bottom) / 2,
                            n = (this.right + this.left) / 2,
                            o = (this.top + this.bottom) / 2;
                        e.identity(this.projectionMatrix), e.ortho(this.projectionMatrix, n - r, n + r, o + i, o - i, this.near, this.far), this.projectionMatrixNeedUpdate = !1
                    }
                }, i.clone = function(t) {
                    void 0 === t && (t = new r), m.prototype.clone.call(this, t), t.left = this.left, t.right = this.right, t.top = this.top, t.bottom = this.bottom, t.near = this.near, t.far = this.far, m.updateProjectionMatrix(), m.updateWorldMatrix()
                }, r
            }(),
            U = function() {
                var e = t.mat4,
                    r = function(t, e, r, i) {
                        m.call(this, r, i);
                        var t = void 0 !== t ? t : 65,
                            e = void 0 !== e ? e : 1;
                        Object.defineProperties(this, {
                            fov: {
                                get: function() {
                                    return t
                                },
                                set: function(e) {
                                    t = e, this.projectionMatrixNeedUpdate = !0
                                }
                            },
                            aspect: {
                                get: function() {
                                    return e
                                },
                                set: function(t) {
                                    e = t, this.projectionMatrixNeedUpdate = !0
                                }
                            }
                        }), this.updateProjectionMatrix(!0)
                    };
                r.prototype = Object.create(m.prototype), r.prototype.constructor = r;
                var i = r.prototype;
                return i.updateProjectionMatrix = function(t) {
                    (!0 === t || !0 === this.projectionMatrixNeedUpdate) && (e.identity(this.projectionMatrix), e.perspective(this.projectionMatrix, this.fov * Math.PI / 180, this.aspect, this.near, this.far), this.projectionMatrixNeedUpdate = !1)
                }, i.clone = function(t) {
                    return void 0 === t && (t = new r), m.prototype.clone.call(this, t), t.fov = this.fov, t.aspect = this.aspect, t.near = this.near, t.far = this.far, t.updateProjectionMatrix(), t.updateWorldMatrix(), t
                }, r
            }(),
            P = function() {
                var t = function(t) {
                    this.materials = t instanceof Array ? t : t instanceof M ? [t] : []
                };
                return t.prototype.clone = function(e) {
                    void 0 === e && (e = new t);
                    for (var r = 0, i = this.materials.length; i > r; r++) e.materials.push(this.materials[r].clone());
                    return e
                }, t
            }();
        window.Four = function() {
            var x = {
                geometry: {},
                camera: {},
                material: {},
                renderer: {}
            };
            return x.GLMatrix = t, x.Config = e, x.EventDispatcher = r, x.Object3D = n, x.Mesh = c, x.PlaneMesh = f, x.TileMesh = h, x.Ray = l, x.Scene = d, x.CursorPicker = p, x.Log = i, x.Tool = v, x.WebGLRenderer = A, x.WebGLRenderTarget = R, x.geometry.Geometry = o, x.geometry.PlaneGeometry = F, x.geometry.SphereGeometry = s, x.geometry.TileSphereGeometry = u, x.geometry.CircleGeometry = B, x.geometry.RingGeometry = L, x.geometry.LineGeometry = D, x.geometry.Triangle = a, x.camera.Camera = m, x.camera.OrthographicCamera = _, x.camera.PerspectiveCamera = U, x.material.Material = M, x.material.TriangleMaterial = P, x.Texture = g, x.ready = function(t) {
                t(x)
            }, x
        }()
    }()
});;
define("pano:widget/module/PanoModule/WebglRender/lib/pako_inflate.min.js", function(e, t, i) {
    ! function(e) {
        if ("object" == typeof t && "undefined" != typeof i) i.exports = e();
        else if ("function" == typeof define && define.amd) define([], e);
        else {
            var n;
            n = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this, n.pako = e()
        }
    }(function() {
        return function t(i, n, a) {
            function r(s, f) {
                if (!n[s]) {
                    if (!i[s]) {
                        var l = "function" == typeof e && e;
                        if (!f && l) return l(s, !0);
                        if (o) return o(s, !0);
                        var d = new Error("Cannot find module '" + s + "'");
                        throw d.code = "MODULE_NOT_FOUND", d
                    }
                    var h = n[s] = {
                        exports: {}
                    };
                    i[s][0].call(h.exports, function(e) {
                        var t = i[s][1][e];
                        return r(t ? t : e)
                    }, h, h.exports, t, i, n, a)
                }
                return n[s].exports
            }
            for (var o = "function" == typeof e && e, s = 0; s < a.length; s++) r(a[s]);
            return r
        }({
            1: [function(e, t, i) {
                "use strict";
                var n = "undefined" != typeof Uint8Array && "undefined" != typeof Uint16Array && "undefined" != typeof Int32Array;
                i.assign = function(e) {
                    for (var t = Array.prototype.slice.call(arguments, 1); t.length;) {
                        var i = t.shift();
                        if (i) {
                            if ("object" != typeof i) throw new TypeError(i + "must be non-object");
                            for (var n in i) i.hasOwnProperty(n) && (e[n] = i[n])
                        }
                    }
                    return e
                }, i.shrinkBuf = function(e, t) {
                    return e.length === t ? e : e.subarray ? e.subarray(0, t) : (e.length = t, e)
                };
                var a = {
                        arraySet: function(e, t, i, n, a) {
                            if (t.subarray && e.subarray) return void e.set(t.subarray(i, i + n), a);
                            for (var r = 0; n > r; r++) e[a + r] = t[i + r]
                        },
                        flattenChunks: function(e) {
                            var t, i, n, a, r, o;
                            for (n = 0, t = 0, i = e.length; i > t; t++) n += e[t].length;
                            for (o = new Uint8Array(n), a = 0, t = 0, i = e.length; i > t; t++) r = e[t], o.set(r, a), a += r.length;
                            return o
                        }
                    },
                    r = {
                        arraySet: function(e, t, i, n, a) {
                            for (var r = 0; n > r; r++) e[a + r] = t[i + r]
                        },
                        flattenChunks: function(e) {
                            return [].concat.apply([], e)
                        }
                    };
                i.setTyped = function(e) {
                    e ? (i.Buf8 = Uint8Array, i.Buf16 = Uint16Array, i.Buf32 = Int32Array, i.assign(i, a)) : (i.Buf8 = Array, i.Buf16 = Array, i.Buf32 = Array, i.assign(i, r))
                }, i.setTyped(n)
            }, {}],
            2: [function(e, t, i) {
                "use strict";

                function n(e, t) {
                    if (65537 > t && (e.subarray && o || !e.subarray && r)) return String.fromCharCode.apply(null, a.shrinkBuf(e, t));
                    for (var i = "", n = 0; t > n; n++) i += String.fromCharCode(e[n]);
                    return i
                }
                var a = e("./common"),
                    r = !0,
                    o = !0;
                try {
                    String.fromCharCode.apply(null, [0])
                } catch (s) {
                    r = !1
                }
                try {
                    String.fromCharCode.apply(null, new Uint8Array(1))
                } catch (s) {
                    o = !1
                }
                for (var f = new a.Buf8(256), l = 0; 256 > l; l++) f[l] = l >= 252 ? 6 : l >= 248 ? 5 : l >= 240 ? 4 : l >= 224 ? 3 : l >= 192 ? 2 : 1;
                f[254] = f[254] = 1, i.string2buf = function(e) {
                    var t, i, n, r, o, s = e.length,
                        f = 0;
                    for (r = 0; s > r; r++) i = e.charCodeAt(r), 55296 === (64512 & i) && s > r + 1 && (n = e.charCodeAt(r + 1), 56320 === (64512 & n) && (i = 65536 + (i - 55296 << 10) + (n - 56320), r++)), f += 128 > i ? 1 : 2048 > i ? 2 : 65536 > i ? 3 : 4;
                    for (t = new a.Buf8(f), o = 0, r = 0; f > o; r++) i = e.charCodeAt(r), 55296 === (64512 & i) && s > r + 1 && (n = e.charCodeAt(r + 1), 56320 === (64512 & n) && (i = 65536 + (i - 55296 << 10) + (n - 56320), r++)), 128 > i ? t[o++] = i : 2048 > i ? (t[o++] = 192 | i >>> 6, t[o++] = 128 | 63 & i) : 65536 > i ? (t[o++] = 224 | i >>> 12, t[o++] = 128 | i >>> 6 & 63, t[o++] = 128 | 63 & i) : (t[o++] = 240 | i >>> 18, t[o++] = 128 | i >>> 12 & 63, t[o++] = 128 | i >>> 6 & 63, t[o++] = 128 | 63 & i);
                    return t
                }, i.buf2binstring = function(e) {
                    return n(e, e.length)
                }, i.binstring2buf = function(e) {
                    for (var t = new a.Buf8(e.length), i = 0, n = t.length; n > i; i++) t[i] = e.charCodeAt(i);
                    return t
                }, i.buf2string = function(e, t) {
                    var i, a, r, o, s = t || e.length,
                        l = new Array(2 * s);
                    for (a = 0, i = 0; s > i;)
                        if (r = e[i++], 128 > r) l[a++] = r;
                        else if (o = f[r], o > 4) l[a++] = 65533, i += o - 1;
                    else {
                        for (r &= 2 === o ? 31 : 3 === o ? 15 : 7; o > 1 && s > i;) r = r << 6 | 63 & e[i++], o--;
                        o > 1 ? l[a++] = 65533 : 65536 > r ? l[a++] = r : (r -= 65536, l[a++] = 55296 | r >> 10 & 1023, l[a++] = 56320 | 1023 & r)
                    }
                    return n(l, a)
                }, i.utf8border = function(e, t) {
                    var i;
                    for (t = t || e.length, t > e.length && (t = e.length), i = t - 1; i >= 0 && 128 === (192 & e[i]);) i--;
                    return 0 > i ? t : 0 === i ? t : i + f[e[i]] > t ? i : t
                }
            }, {
                "./common": 1
            }],
            3: [function(e, t) {
                "use strict";

                function i(e, t, i, n) {
                    for (var a = 65535 & e | 0, r = e >>> 16 & 65535 | 0, o = 0; 0 !== i;) {
                        o = i > 2e3 ? 2e3 : i, i -= o;
                        do a = a + t[n++] | 0, r = r + a | 0; while (--o);
                        a %= 65521, r %= 65521
                    }
                    return a | r << 16 | 0
                }
                t.exports = i
            }, {}],
            4: [function(e, t) {
                t.exports = {
                    Z_NO_FLUSH: 0,
                    Z_PARTIAL_FLUSH: 1,
                    Z_SYNC_FLUSH: 2,
                    Z_FULL_FLUSH: 3,
                    Z_FINISH: 4,
                    Z_BLOCK: 5,
                    Z_TREES: 6,
                    Z_OK: 0,
                    Z_STREAM_END: 1,
                    Z_NEED_DICT: 2,
                    Z_ERRNO: -1,
                    Z_STREAM_ERROR: -2,
                    Z_DATA_ERROR: -3,
                    Z_BUF_ERROR: -5,
                    Z_NO_COMPRESSION: 0,
                    Z_BEST_SPEED: 1,
                    Z_BEST_COMPRESSION: 9,
                    Z_DEFAULT_COMPRESSION: -1,
                    Z_FILTERED: 1,
                    Z_HUFFMAN_ONLY: 2,
                    Z_RLE: 3,
                    Z_FIXED: 4,
                    Z_DEFAULT_STRATEGY: 0,
                    Z_BINARY: 0,
                    Z_TEXT: 1,
                    Z_UNKNOWN: 2,
                    Z_DEFLATED: 8
                }
            }, {}],
            5: [function(e, t) {
                "use strict";

                function i() {
                    for (var e, t = [], i = 0; 256 > i; i++) {
                        e = i;
                        for (var n = 0; 8 > n; n++) e = 1 & e ? 3988292384 ^ e >>> 1 : e >>> 1;
                        t[i] = e
                    }
                    return t
                }

                function n(e, t, i, n) {
                    var r = a,
                        o = n + i;
                    e = -1 ^ e;
                    for (var s = n; o > s; s++) e = e >>> 8 ^ r[255 & (e ^ t[s])];
                    return -1 ^ e
                }
                var a = i();
                t.exports = n
            }, {}],
            6: [function(e, t) {
                "use strict";

                function i() {
                    this.text = 0, this.time = 0, this.xflags = 0, this.os = 0, this.extra = null, this.extra_len = 0, this.name = "", this.comment = "", this.hcrc = 0, this.done = !1
                }
                t.exports = i
            }, {}],
            7: [function(e, t) {
                "use strict";
                var i = 30,
                    n = 12;
                t.exports = function(e, t) {
                    var a, r, o, s, f, l, d, h, c, u, b, w, m, k, g, _, v, p, x, y, S, B, E, Z, A;
                    a = e.state, r = e.next_in, Z = e.input, o = r + (e.avail_in - 5), s = e.next_out, A = e.output, f = s - (t - e.avail_out), l = s + (e.avail_out - 257), d = a.dmax, h = a.wsize, c = a.whave, u = a.wnext, b = a.window, w = a.hold, m = a.bits, k = a.lencode, g = a.distcode, _ = (1 << a.lenbits) - 1, v = (1 << a.distbits) - 1;
                    e: do {
                        15 > m && (w += Z[r++] << m, m += 8, w += Z[r++] << m, m += 8), p = k[w & _];
                        t: for (;;) {
                            if (x = p >>> 24, w >>>= x, m -= x, x = p >>> 16 & 255, 0 === x) A[s++] = 65535 & p;
                            else {
                                if (!(16 & x)) {
                                    if (0 === (64 & x)) {
                                        p = k[(65535 & p) + (w & (1 << x) - 1)];
                                        continue t
                                    }
                                    if (32 & x) {
                                        a.mode = n;
                                        break e
                                    }
                                    e.msg = "invalid literal/length code", a.mode = i;
                                    break e
                                }
                                y = 65535 & p, x &= 15, x && (x > m && (w += Z[r++] << m, m += 8), y += w & (1 << x) - 1, w >>>= x, m -= x), 15 > m && (w += Z[r++] << m, m += 8, w += Z[r++] << m, m += 8), p = g[w & v];
                                i: for (;;) {
                                    if (x = p >>> 24, w >>>= x, m -= x, x = p >>> 16 & 255, !(16 & x)) {
                                        if (0 === (64 & x)) {
                                            p = g[(65535 & p) + (w & (1 << x) - 1)];
                                            continue i
                                        }
                                        e.msg = "invalid distance code", a.mode = i;
                                        break e
                                    }
                                    if (S = 65535 & p, x &= 15, x > m && (w += Z[r++] << m, m += 8, x > m && (w += Z[r++] << m, m += 8)), S += w & (1 << x) - 1, S > d) {
                                        e.msg = "invalid distance too far back", a.mode = i;
                                        break e
                                    }
                                    if (w >>>= x, m -= x, x = s - f, S > x) {
                                        if (x = S - x, x > c && a.sane) {
                                            e.msg = "invalid distance too far back", a.mode = i;
                                            break e
                                        }
                                        if (B = 0, E = b, 0 === u) {
                                            if (B += h - x, y > x) {
                                                y -= x;
                                                do A[s++] = b[B++]; while (--x);
                                                B = s - S, E = A
                                            }
                                        } else if (x > u) {
                                            if (B += h + u - x, x -= u, y > x) {
                                                y -= x;
                                                do A[s++] = b[B++]; while (--x);
                                                if (B = 0, y > u) {
                                                    x = u, y -= x;
                                                    do A[s++] = b[B++]; while (--x);
                                                    B = s - S, E = A
                                                }
                                            }
                                        } else if (B += u - x, y > x) {
                                            y -= x;
                                            do A[s++] = b[B++]; while (--x);
                                            B = s - S, E = A
                                        }
                                        for (; y > 2;) A[s++] = E[B++], A[s++] = E[B++], A[s++] = E[B++], y -= 3;
                                        y && (A[s++] = E[B++], y > 1 && (A[s++] = E[B++]))
                                    } else {
                                        B = s - S;
                                        do A[s++] = A[B++], A[s++] = A[B++], A[s++] = A[B++], y -= 3; while (y > 2);
                                        y && (A[s++] = A[B++], y > 1 && (A[s++] = A[B++]))
                                    }
                                    break
                                }
                            }
                            break
                        }
                    } while (o > r && l > s);
                    y = m >> 3, r -= y, m -= y << 3, w &= (1 << m) - 1, e.next_in = r, e.next_out = s, e.avail_in = o > r ? 5 + (o - r) : 5 - (r - o), e.avail_out = l > s ? 257 + (l - s) : 257 - (s - l), a.hold = w, a.bits = m
                }
            }, {}],
            8: [function(e, t, i) {
                "use strict";

                function n(e) {
                    return (e >>> 24 & 255) + (e >>> 8 & 65280) + ((65280 & e) << 8) + ((255 & e) << 24)
                }

                function a() {
                    this.mode = 0, this.last = !1, this.wrap = 0, this.havedict = !1, this.flags = 0, this.dmax = 0, this.check = 0, this.total = 0, this.head = null, this.wbits = 0, this.wsize = 0, this.whave = 0, this.wnext = 0, this.window = null, this.hold = 0, this.bits = 0, this.length = 0, this.offset = 0, this.extra = 0, this.lencode = null, this.distcode = null, this.lenbits = 0, this.distbits = 0, this.ncode = 0, this.nlen = 0, this.ndist = 0, this.have = 0, this.next = null, this.lens = new k.Buf16(320), this.work = new k.Buf16(288), this.lendyn = null, this.distdyn = null, this.sane = 0, this.back = 0, this.was = 0
                }

                function r(e) {
                    var t;
                    return e && e.state ? (t = e.state, e.total_in = e.total_out = t.total = 0, e.msg = "", t.wrap && (e.adler = 1 & t.wrap), t.mode = F, t.last = 0, t.havedict = 0, t.dmax = 32768, t.head = null, t.hold = 0, t.bits = 0, t.lencode = t.lendyn = new k.Buf32(bt), t.distcode = t.distdyn = new k.Buf32(wt), t.sane = 1, t.back = -1, A) : N
                }

                function o(e) {
                    var t;
                    return e && e.state ? (t = e.state, t.wsize = 0, t.whave = 0, t.wnext = 0, r(e)) : N
                }

                function s(e, t) {
                    var i, n;
                    return e && e.state ? (n = e.state, 0 > t ? (i = 0, t = -t) : (i = (t >> 4) + 1, 48 > t && (t &= 15)), t && (8 > t || t > 15) ? N : (null !== n.window && n.wbits !== t && (n.window = null), n.wrap = i, n.wbits = t, o(e))) : N
                }

                function f(e, t) {
                    var i, n;
                    return e ? (n = new a, e.state = n, n.window = null, i = s(e, t), i !== A && (e.state = null), i) : N
                }

                function l(e) {
                    return f(e, kt)
                }

                function d(e) {
                    if (gt) {
                        var t;
                        for (w = new k.Buf32(512), m = new k.Buf32(32), t = 0; 144 > t;) e.lens[t++] = 8;
                        for (; 256 > t;) e.lens[t++] = 9;
                        for (; 280 > t;) e.lens[t++] = 7;
                        for (; 288 > t;) e.lens[t++] = 8;
                        for (p(y, e.lens, 0, 288, w, 0, e.work, {
                                bits: 9
                            }), t = 0; 32 > t;) e.lens[t++] = 5;
                        p(S, e.lens, 0, 32, m, 0, e.work, {
                            bits: 5
                        }), gt = !1
                    }
                    e.lencode = w, e.lenbits = 9, e.distcode = m, e.distbits = 5
                }

                function h(e, t, i, n) {
                    var a, r = e.state;
                    return null === r.window && (r.wsize = 1 << r.wbits, r.wnext = 0, r.whave = 0, r.window = new k.Buf8(r.wsize)), n >= r.wsize ? (k.arraySet(r.window, t, i - r.wsize, r.wsize, 0), r.wnext = 0, r.whave = r.wsize) : (a = r.wsize - r.wnext, a > n && (a = n), k.arraySet(r.window, t, i - n, a, r.wnext), n -= a, n ? (k.arraySet(r.window, t, i - n, n, 0), r.wnext = n, r.whave = r.wsize) : (r.wnext += a, r.wnext === r.wsize && (r.wnext = 0), r.whave < r.wsize && (r.whave += a))), 0
                }

                function c(e, t) {
                    var i, a, r, o, s, f, l, c, u, b, w, m, bt, wt, mt, kt, gt, _t, vt, pt, xt, yt, St, Bt, Et = 0,
                        Zt = new k.Buf8(4),
                        At = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15];
                    if (!e || !e.state || !e.output || !e.input && 0 !== e.avail_in) return N;
                    i = e.state, i.mode === W && (i.mode = X), s = e.next_out, r = e.output, l = e.avail_out, o = e.next_in, a = e.input, f = e.avail_in, c = i.hold, u = i.bits, b = f, w = l, yt = A;
                    e: for (;;) switch (i.mode) {
                        case F:
                            if (0 === i.wrap) {
                                i.mode = X;
                                break
                            }
                            for (; 16 > u;) {
                                if (0 === f) break e;
                                f--, c += a[o++] << u, u += 8
                            }
                            if (2 & i.wrap && 35615 === c) {
                                i.check = 0, Zt[0] = 255 & c, Zt[1] = c >>> 8 & 255, i.check = _(i.check, Zt, 2, 0), c = 0, u = 0, i.mode = U;
                                break
                            }
                            if (i.flags = 0, i.head && (i.head.done = !1), !(1 & i.wrap) || (((255 & c) << 8) + (c >> 8)) % 31) {
                                e.msg = "incorrect header check", i.mode = ht;
                                break
                            }
                            if ((15 & c) !== T) {
                                e.msg = "unknown compression method", i.mode = ht;
                                break
                            }
                            if (c >>>= 4, u -= 4, xt = (15 & c) + 8, 0 === i.wbits) i.wbits = xt;
                            else if (xt > i.wbits) {
                                e.msg = "invalid window size", i.mode = ht;
                                break
                            }
                            i.dmax = 1 << xt, e.adler = i.check = 1, i.mode = 512 & c ? Y : W, c = 0, u = 0;
                            break;
                        case U:
                            for (; 16 > u;) {
                                if (0 === f) break e;
                                f--, c += a[o++] << u, u += 8
                            }
                            if (i.flags = c, (255 & i.flags) !== T) {
                                e.msg = "unknown compression method", i.mode = ht;
                                break
                            }
                            if (57344 & i.flags) {
                                e.msg = "unknown header flags set", i.mode = ht;
                                break
                            }
                            i.head && (i.head.text = c >> 8 & 1), 512 & i.flags && (Zt[0] = 255 & c, Zt[1] = c >>> 8 & 255, i.check = _(i.check, Zt, 2, 0)), c = 0, u = 0, i.mode = D;
                        case D:
                            for (; 32 > u;) {
                                if (0 === f) break e;
                                f--, c += a[o++] << u, u += 8
                            }
                            i.head && (i.head.time = c), 512 & i.flags && (Zt[0] = 255 & c, Zt[1] = c >>> 8 & 255, Zt[2] = c >>> 16 & 255, Zt[3] = c >>> 24 & 255, i.check = _(i.check, Zt, 4, 0)), c = 0, u = 0, i.mode = L;
                        case L:
                            for (; 16 > u;) {
                                if (0 === f) break e;
                                f--, c += a[o++] << u, u += 8
                            }
                            i.head && (i.head.xflags = 255 & c, i.head.os = c >> 8), 512 & i.flags && (Zt[0] = 255 & c, Zt[1] = c >>> 8 & 255, i.check = _(i.check, Zt, 2, 0)), c = 0, u = 0, i.mode = H;
                        case H:
                            if (1024 & i.flags) {
                                for (; 16 > u;) {
                                    if (0 === f) break e;
                                    f--, c += a[o++] << u, u += 8
                                }
                                i.length = c, i.head && (i.head.extra_len = c), 512 & i.flags && (Zt[0] = 255 & c, Zt[1] = c >>> 8 & 255, i.check = _(i.check, Zt, 2, 0)), c = 0, u = 0
                            } else i.head && (i.head.extra = null);
                            i.mode = j;
                        case j:
                            if (1024 & i.flags && (m = i.length, m > f && (m = f), m && (i.head && (xt = i.head.extra_len - i.length, i.head.extra || (i.head.extra = new Array(i.head.extra_len)), k.arraySet(i.head.extra, a, o, m, xt)), 512 & i.flags && (i.check = _(i.check, a, m, o)), f -= m, o += m, i.length -= m), i.length)) break e;
                            i.length = 0, i.mode = M;
                        case M:
                            if (2048 & i.flags) {
                                if (0 === f) break e;
                                m = 0;
                                do xt = a[o + m++], i.head && xt && i.length < 65536 && (i.head.name += String.fromCharCode(xt)); while (xt && f > m);
                                if (512 & i.flags && (i.check = _(i.check, a, m, o)), f -= m, o += m, xt) break e
                            } else i.head && (i.head.name = null);
                            i.length = 0, i.mode = K;
                        case K:
                            if (4096 & i.flags) {
                                if (0 === f) break e;
                                m = 0;
                                do xt = a[o + m++], i.head && xt && i.length < 65536 && (i.head.comment += String.fromCharCode(xt)); while (xt && f > m);
                                if (512 & i.flags && (i.check = _(i.check, a, m, o)), f -= m, o += m, xt) break e
                            } else i.head && (i.head.comment = null);
                            i.mode = P;
                        case P:
                            if (512 & i.flags) {
                                for (; 16 > u;) {
                                    if (0 === f) break e;
                                    f--, c += a[o++] << u, u += 8
                                }
                                if (c !== (65535 & i.check)) {
                                    e.msg = "header crc mismatch", i.mode = ht;
                                    break
                                }
                                c = 0, u = 0
                            }
                            i.head && (i.head.hcrc = i.flags >> 9 & 1, i.head.done = !0), e.adler = i.check = 0, i.mode = W;
                            break;
                        case Y:
                            for (; 32 > u;) {
                                if (0 === f) break e;
                                f--, c += a[o++] << u, u += 8
                            }
                            e.adler = i.check = n(c), c = 0, u = 0, i.mode = G;
                        case G:
                            if (0 === i.havedict) return e.next_out = s, e.avail_out = l, e.next_in = o, e.avail_in = f, i.hold = c, i.bits = u, R;
                            e.adler = i.check = 1, i.mode = W;
                        case W:
                            if (t === E || t === Z) break e;
                        case X:
                            if (i.last) {
                                c >>>= 7 & u, u -= 7 & u, i.mode = ft;
                                break
                            }
                            for (; 3 > u;) {
                                if (0 === f) break e;
                                f--, c += a[o++] << u, u += 8
                            }
                            switch (i.last = 1 & c, c >>>= 1, u -= 1, 3 & c) {
                                case 0:
                                    i.mode = q;
                                    break;
                                case 1:
                                    if (d(i), i.mode = tt, t === Z) {
                                        c >>>= 2, u -= 2;
                                        break e
                                    }
                                    break;
                                case 2:
                                    i.mode = V;
                                    break;
                                case 3:
                                    e.msg = "invalid block type", i.mode = ht
                            }
                            c >>>= 2, u -= 2;
                            break;
                        case q:
                            for (c >>>= 7 & u, u -= 7 & u; 32 > u;) {
                                if (0 === f) break e;
                                f--, c += a[o++] << u, u += 8
                            }
                            if ((65535 & c) !== (c >>> 16 ^ 65535)) {
                                e.msg = "invalid stored block lengths", i.mode = ht;
                                break
                            }
                            if (i.length = 65535 & c, c = 0, u = 0, i.mode = J, t === Z) break e;
                        case J:
                            i.mode = Q;
                        case Q:
                            if (m = i.length) {
                                if (m > f && (m = f), m > l && (m = l), 0 === m) break e;
                                k.arraySet(r, a, o, m, s), f -= m, o += m, l -= m, s += m, i.length -= m;
                                break
                            }
                            i.mode = W;
                            break;
                        case V:
                            for (; 14 > u;) {
                                if (0 === f) break e;
                                f--, c += a[o++] << u, u += 8
                            }
                            if (i.nlen = (31 & c) + 257, c >>>= 5, u -= 5, i.ndist = (31 & c) + 1, c >>>= 5, u -= 5, i.ncode = (15 & c) + 4, c >>>= 4, u -= 4, i.nlen > 286 || i.ndist > 30) {
                                e.msg = "too many length or distance symbols", i.mode = ht;
                                break
                            }
                            i.have = 0, i.mode = $;
                        case $:
                            for (; i.have < i.ncode;) {
                                for (; 3 > u;) {
                                    if (0 === f) break e;
                                    f--, c += a[o++] << u, u += 8
                                }
                                i.lens[At[i.have++]] = 7 & c, c >>>= 3, u -= 3
                            }
                            for (; i.have < 19;) i.lens[At[i.have++]] = 0;
                            if (i.lencode = i.lendyn, i.lenbits = 7, St = {
                                    bits: i.lenbits
                                }, yt = p(x, i.lens, 0, 19, i.lencode, 0, i.work, St), i.lenbits = St.bits, yt) {
                                e.msg = "invalid code lengths set", i.mode = ht;
                                break
                            }
                            i.have = 0, i.mode = et;
                        case et:
                            for (; i.have < i.nlen + i.ndist;) {
                                for (; Et = i.lencode[c & (1 << i.lenbits) - 1], mt = Et >>> 24, kt = Et >>> 16 & 255, gt = 65535 & Et, !(u >= mt);) {
                                    if (0 === f) break e;
                                    f--, c += a[o++] << u, u += 8
                                }
                                if (16 > gt) c >>>= mt, u -= mt, i.lens[i.have++] = gt;
                                else {
                                    if (16 === gt) {
                                        for (Bt = mt + 2; Bt > u;) {
                                            if (0 === f) break e;
                                            f--, c += a[o++] << u, u += 8
                                        }
                                        if (c >>>= mt, u -= mt, 0 === i.have) {
                                            e.msg = "invalid bit length repeat", i.mode = ht;
                                            break
                                        }
                                        xt = i.lens[i.have - 1], m = 3 + (3 & c), c >>>= 2, u -= 2
                                    } else if (17 === gt) {
                                        for (Bt = mt + 3; Bt > u;) {
                                            if (0 === f) break e;
                                            f--, c += a[o++] << u, u += 8
                                        }
                                        c >>>= mt, u -= mt, xt = 0, m = 3 + (7 & c), c >>>= 3, u -= 3
                                    } else {
                                        for (Bt = mt + 7; Bt > u;) {
                                            if (0 === f) break e;
                                            f--, c += a[o++] << u, u += 8
                                        }
                                        c >>>= mt, u -= mt, xt = 0, m = 11 + (127 & c), c >>>= 7, u -= 7
                                    }
                                    if (i.have + m > i.nlen + i.ndist) {
                                        e.msg = "invalid bit length repeat", i.mode = ht;
                                        break
                                    }
                                    for (; m--;) i.lens[i.have++] = xt
                                }
                            }
                            if (i.mode === ht) break;
                            if (0 === i.lens[256]) {
                                e.msg = "invalid code -- missing end-of-block", i.mode = ht;
                                break
                            }
                            if (i.lenbits = 9, St = {
                                    bits: i.lenbits
                                }, yt = p(y, i.lens, 0, i.nlen, i.lencode, 0, i.work, St), i.lenbits = St.bits, yt) {
                                e.msg = "invalid literal/lengths set", i.mode = ht;
                                break
                            }
                            if (i.distbits = 6, i.distcode = i.distdyn, St = {
                                    bits: i.distbits
                                }, yt = p(S, i.lens, i.nlen, i.ndist, i.distcode, 0, i.work, St), i.distbits = St.bits, yt) {
                                e.msg = "invalid distances set", i.mode = ht;
                                break
                            }
                            if (i.mode = tt, t === Z) break e;
                        case tt:
                            i.mode = it;
                        case it:
                            if (f >= 6 && l >= 258) {
                                e.next_out = s, e.avail_out = l, e.next_in = o, e.avail_in = f, i.hold = c, i.bits = u, v(e, w), s = e.next_out, r = e.output, l = e.avail_out, o = e.next_in, a = e.input, f = e.avail_in, c = i.hold, u = i.bits, i.mode === W && (i.back = -1);
                                break
                            }
                            for (i.back = 0; Et = i.lencode[c & (1 << i.lenbits) - 1], mt = Et >>> 24, kt = Et >>> 16 & 255, gt = 65535 & Et, !(u >= mt);) {
                                if (0 === f) break e;
                                f--, c += a[o++] << u, u += 8
                            }
                            if (kt && 0 === (240 & kt)) {
                                for (_t = mt, vt = kt, pt = gt; Et = i.lencode[pt + ((c & (1 << _t + vt) - 1) >> _t)], mt = Et >>> 24, kt = Et >>> 16 & 255, gt = 65535 & Et, !(u >= _t + mt);) {
                                    if (0 === f) break e;
                                    f--, c += a[o++] << u, u += 8
                                }
                                c >>>= _t, u -= _t, i.back += _t
                            }
                            if (c >>>= mt, u -= mt, i.back += mt, i.length = gt, 0 === kt) {
                                i.mode = st;
                                break
                            }
                            if (32 & kt) {
                                i.back = -1, i.mode = W;
                                break
                            }
                            if (64 & kt) {
                                e.msg = "invalid literal/length code", i.mode = ht;
                                break
                            }
                            i.extra = 15 & kt, i.mode = nt;
                        case nt:
                            if (i.extra) {
                                for (Bt = i.extra; Bt > u;) {
                                    if (0 === f) break e;
                                    f--, c += a[o++] << u, u += 8
                                }
                                i.length += c & (1 << i.extra) - 1, c >>>= i.extra, u -= i.extra, i.back += i.extra
                            }
                            i.was = i.length, i.mode = at;
                        case at:
                            for (; Et = i.distcode[c & (1 << i.distbits) - 1], mt = Et >>> 24, kt = Et >>> 16 & 255, gt = 65535 & Et, !(u >= mt);) {
                                if (0 === f) break e;
                                f--, c += a[o++] << u, u += 8
                            }
                            if (0 === (240 & kt)) {
                                for (_t = mt, vt = kt, pt = gt; Et = i.distcode[pt + ((c & (1 << _t + vt) - 1) >> _t)], mt = Et >>> 24, kt = Et >>> 16 & 255, gt = 65535 & Et, !(u >= _t + mt);) {
                                    if (0 === f) break e;
                                    f--, c += a[o++] << u, u += 8
                                }
                                c >>>= _t, u -= _t, i.back += _t
                            }
                            if (c >>>= mt, u -= mt, i.back += mt, 64 & kt) {
                                e.msg = "invalid distance code", i.mode = ht;
                                break
                            }
                            i.offset = gt, i.extra = 15 & kt, i.mode = rt;
                        case rt:
                            if (i.extra) {
                                for (Bt = i.extra; Bt > u;) {
                                    if (0 === f) break e;
                                    f--, c += a[o++] << u, u += 8
                                }
                                i.offset += c & (1 << i.extra) - 1, c >>>= i.extra, u -= i.extra, i.back += i.extra
                            }
                            if (i.offset > i.dmax) {
                                e.msg = "invalid distance too far back", i.mode = ht;
                                break
                            }
                            i.mode = ot;
                        case ot:
                            if (0 === l) break e;
                            if (m = w - l, i.offset > m) {
                                if (m = i.offset - m, m > i.whave && i.sane) {
                                    e.msg = "invalid distance too far back", i.mode = ht;
                                    break
                                }
                                m > i.wnext ? (m -= i.wnext, bt = i.wsize - m) : bt = i.wnext - m, m > i.length && (m = i.length), wt = i.window
                            } else wt = r, bt = s - i.offset, m = i.length;
                            m > l && (m = l), l -= m, i.length -= m;
                            do r[s++] = wt[bt++]; while (--m);
                            0 === i.length && (i.mode = it);
                            break;
                        case st:
                            if (0 === l) break e;
                            r[s++] = i.length, l--, i.mode = it;
                            break;
                        case ft:
                            if (i.wrap) {
                                for (; 32 > u;) {
                                    if (0 === f) break e;
                                    f--, c |= a[o++] << u, u += 8
                                }
                                if (w -= l, e.total_out += w, i.total += w, w && (e.adler = i.check = i.flags ? _(i.check, r, w, s - w) : g(i.check, r, w, s - w)), w = l, (i.flags ? c : n(c)) !== i.check) {
                                    e.msg = "incorrect data check", i.mode = ht;
                                    break
                                }
                                c = 0, u = 0
                            }
                            i.mode = lt;
                        case lt:
                            if (i.wrap && i.flags) {
                                for (; 32 > u;) {
                                    if (0 === f) break e;
                                    f--, c += a[o++] << u, u += 8
                                }
                                if (c !== (4294967295 & i.total)) {
                                    e.msg = "incorrect length check", i.mode = ht;
                                    break
                                }
                                c = 0, u = 0
                            }
                            i.mode = dt;
                        case dt:
                            yt = z;
                            break e;
                        case ht:
                            yt = C;
                            break e;
                        case ct:
                            return O;
                        case ut:
                        default:
                            return N
                    }
                    return e.next_out = s, e.avail_out = l, e.next_in = o, e.avail_in = f, i.hold = c, i.bits = u, (i.wsize || w !== e.avail_out && i.mode < ht && (i.mode < ft || t !== B)) && h(e, e.output, e.next_out, w - e.avail_out) ? (i.mode = ct, O) : (b -= e.avail_in, w -= e.avail_out, e.total_in += b, e.total_out += w, i.total += w, i.wrap && w && (e.adler = i.check = i.flags ? _(i.check, r, w, e.next_out - w) : g(i.check, r, w, e.next_out - w)), e.data_type = i.bits + (i.last ? 64 : 0) + (i.mode === W ? 128 : 0) + (i.mode === tt || i.mode === J ? 256 : 0), (0 === b && 0 === w || t === B) && yt === A && (yt = I), yt)
                }

                function u(e) {
                    if (!e || !e.state) return N;
                    var t = e.state;
                    return t.window && (t.window = null), e.state = null, A
                }

                function b(e, t) {
                    var i;
                    return e && e.state ? (i = e.state, 0 === (2 & i.wrap) ? N : (i.head = t, t.done = !1, A)) : N
                }
                var w, m, k = e("../utils/common"),
                    g = e("./adler32"),
                    _ = e("./crc32"),
                    v = e("./inffast"),
                    p = e("./inftrees"),
                    x = 0,
                    y = 1,
                    S = 2,
                    B = 4,
                    E = 5,
                    Z = 6,
                    A = 0,
                    z = 1,
                    R = 2,
                    N = -2,
                    C = -3,
                    O = -4,
                    I = -5,
                    T = 8,
                    F = 1,
                    U = 2,
                    D = 3,
                    L = 4,
                    H = 5,
                    j = 6,
                    M = 7,
                    K = 8,
                    P = 9,
                    Y = 10,
                    G = 11,
                    W = 12,
                    X = 13,
                    q = 14,
                    J = 15,
                    Q = 16,
                    V = 17,
                    $ = 18,
                    et = 19,
                    tt = 20,
                    it = 21,
                    nt = 22,
                    at = 23,
                    rt = 24,
                    ot = 25,
                    st = 26,
                    ft = 27,
                    lt = 28,
                    dt = 29,
                    ht = 30,
                    ct = 31,
                    ut = 32,
                    bt = 852,
                    wt = 592,
                    mt = 15,
                    kt = mt,
                    gt = !0;
                i.inflateReset = o, i.inflateReset2 = s, i.inflateResetKeep = r, i.inflateInit = l, i.inflateInit2 = f, i.inflate = c, i.inflateEnd = u, i.inflateGetHeader = b, i.inflateInfo = "pako inflate (from Nodeca project)"
            }, {
                "../utils/common": 1,
                "./adler32": 3,
                "./crc32": 5,
                "./inffast": 7,
                "./inftrees": 9
            }],
            9: [function(e, t) {
                "use strict";
                var i = e("../utils/common"),
                    n = 15,
                    a = 852,
                    r = 592,
                    o = 0,
                    s = 1,
                    f = 2,
                    l = [3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0],
                    d = [16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 18, 18, 18, 18, 19, 19, 19, 19, 20, 20, 20, 20, 21, 21, 21, 21, 16, 72, 78],
                    h = [1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577, 0, 0],
                    c = [16, 16, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22, 23, 23, 24, 24, 25, 25, 26, 26, 27, 27, 28, 28, 29, 29, 64, 64];
                t.exports = function(e, t, u, b, w, m, k, g) {
                    var _, v, p, x, y, S, B, E, Z, A = g.bits,
                        z = 0,
                        R = 0,
                        N = 0,
                        C = 0,
                        O = 0,
                        I = 0,
                        T = 0,
                        F = 0,
                        U = 0,
                        D = 0,
                        L = null,
                        H = 0,
                        j = new i.Buf16(n + 1),
                        M = new i.Buf16(n + 1),
                        K = null,
                        P = 0;
                    for (z = 0; n >= z; z++) j[z] = 0;
                    for (R = 0; b > R; R++) j[t[u + R]]++;
                    for (O = A, C = n; C >= 1 && 0 === j[C]; C--);
                    if (O > C && (O = C), 0 === C) return w[m++] = 20971520, w[m++] = 20971520, g.bits = 1, 0;
                    for (N = 1; C > N && 0 === j[N]; N++);
                    for (N > O && (O = N), F = 1, z = 1; n >= z; z++)
                        if (F <<= 1, F -= j[z], 0 > F) return -1;
                    if (F > 0 && (e === o || 1 !== C)) return -1;
                    for (M[1] = 0, z = 1; n > z; z++) M[z + 1] = M[z] + j[z];
                    for (R = 0; b > R; R++) 0 !== t[u + R] && (k[M[t[u + R]]++] = R);
                    if (e === o ? (L = K = k, S = 19) : e === s ? (L = l, H -= 257, K = d, P -= 257, S = 256) : (L = h, K = c, S = -1), D = 0, R = 0, z = N, y = m, I = O, T = 0, p = -1, U = 1 << O, x = U - 1, e === s && U > a || e === f && U > r) return 1;
                    for (var Y = 0;;) {
                        Y++, B = z - T, k[R] < S ? (E = 0, Z = k[R]) : k[R] > S ? (E = K[P + k[R]], Z = L[H + k[R]]) : (E = 96, Z = 0), _ = 1 << z - T, v = 1 << I, N = v;
                        do v -= _, w[y + (D >> T) + v] = B << 24 | E << 16 | Z | 0; while (0 !== v);
                        for (_ = 1 << z - 1; D & _;) _ >>= 1;
                        if (0 !== _ ? (D &= _ - 1, D += _) : D = 0, R++, 0 === --j[z]) {
                            if (z === C) break;
                            z = t[u + k[R]]
                        }
                        if (z > O && (D & x) !== p) {
                            for (0 === T && (T = O), y += N, I = z - T, F = 1 << I; C > I + T && (F -= j[I + T], !(0 >= F));) I++, F <<= 1;
                            if (U += 1 << I, e === s && U > a || e === f && U > r) return 1;
                            p = D & x, w[p] = O << 24 | I << 16 | y - m | 0
                        }
                    }
                    return 0 !== D && (w[y + D] = z - T << 24 | 64 << 16 | 0), g.bits = O, 0
                }
            }, {
                "../utils/common": 1
            }],
            10: [function(e, t) {
                "use strict";
                t.exports = {
                    2: "need dictionary",
                    1: "stream end",
                    0: "",
                    "-1": "file error",
                    "-2": "stream error",
                    "-3": "data error",
                    "-4": "insufficient memory",
                    "-5": "buffer error",
                    "-6": "incompatible version"
                }
            }, {}],
            11: [function(e, t) {
                "use strict";

                function i() {
                    this.input = null, this.next_in = 0, this.avail_in = 0, this.total_in = 0, this.output = null, this.next_out = 0, this.avail_out = 0, this.total_out = 0, this.msg = "", this.state = null, this.data_type = 2, this.adler = 0
                }
                t.exports = i
            }, {}],
            "/lib/inflate.js": [function(e, t, i) {
                "use strict";

                function n(e, t) {
                    var i = new u(t);
                    if (i.push(e, !0), i.err) throw i.msg;
                    return i.result
                }

                function a(e, t) {
                    return t = t || {}, t.raw = !0, n(e, t)
                }
                var r = e("./zlib/inflate.js"),
                    o = e("./utils/common"),
                    s = e("./utils/strings"),
                    f = e("./zlib/constants"),
                    l = e("./zlib/messages"),
                    d = e("./zlib/zstream"),
                    h = e("./zlib/gzheader"),
                    c = Object.prototype.toString,
                    u = function(e) {
                        this.options = o.assign({
                            chunkSize: 16384,
                            windowBits: 0,
                            to: ""
                        }, e || {});
                        var t = this.options;
                        t.raw && t.windowBits >= 0 && t.windowBits < 16 && (t.windowBits = -t.windowBits, 0 === t.windowBits && (t.windowBits = -15)), !(t.windowBits >= 0 && t.windowBits < 16) || e && e.windowBits || (t.windowBits += 32), t.windowBits > 15 && t.windowBits < 48 && 0 === (15 & t.windowBits) && (t.windowBits |= 15), this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new d, this.strm.avail_out = 0;
                        var i = r.inflateInit2(this.strm, t.windowBits);
                        if (i !== f.Z_OK) throw new Error(l[i]);
                        this.header = new h, r.inflateGetHeader(this.strm, this.header)
                    };
                u.prototype.push = function(e, t) {
                    var i, n, a, l, d, h = this.strm,
                        u = this.options.chunkSize;
                    if (this.ended) return !1;
                    n = t === ~~t ? t : t === !0 ? f.Z_FINISH : f.Z_NO_FLUSH, h.input = "string" == typeof e ? s.binstring2buf(e) : "[object ArrayBuffer]" === c.call(e) ? new Uint8Array(e) : e, h.next_in = 0, h.avail_in = h.input.length;
                    do {
                        if (0 === h.avail_out && (h.output = new o.Buf8(u), h.next_out = 0, h.avail_out = u), i = r.inflate(h, f.Z_NO_FLUSH), i !== f.Z_STREAM_END && i !== f.Z_OK) return this.onEnd(i), this.ended = !0, !1;
                        h.next_out && (0 === h.avail_out || i === f.Z_STREAM_END || 0 === h.avail_in && n === f.Z_FINISH) && ("string" === this.options.to ? (a = s.utf8border(h.output, h.next_out), l = h.next_out - a, d = s.buf2string(h.output, a), h.next_out = l, h.avail_out = u - l, l && o.arraySet(h.output, h.output, a, l, 0), this.onData(d)) : this.onData(o.shrinkBuf(h.output, h.next_out)))
                    } while (h.avail_in > 0 && i !== f.Z_STREAM_END);
                    return i === f.Z_STREAM_END && (n = f.Z_FINISH), n === f.Z_FINISH ? (i = r.inflateEnd(this.strm), this.onEnd(i), this.ended = !0, i === f.Z_OK) : !0
                }, u.prototype.onData = function(e) {
                    this.chunks.push(e)
                }, u.prototype.onEnd = function(e) {
                    e === f.Z_OK && (this.result = "string" === this.options.to ? this.chunks.join("") : o.flattenChunks(this.chunks)), this.chunks = [], this.err = e, this.msg = this.strm.msg
                }, i.Inflate = u, i.inflate = n, i.inflateRaw = a, i.ungzip = n
            }, {
                "./utils/common": 1,
                "./utils/strings": 2,
                "./zlib/constants": 4,
                "./zlib/gzheader": 6,
                "./zlib/inflate.js": 8,
                "./zlib/messages": 10,
                "./zlib/zstream": 11
            }]
        }, {}, [])("/lib/inflate.js")
    })
});;
define("pano:widget/module/PanoModule/WebglRender/lib/zlib/trees.js", function(e, t) {
    "use strict";

    function n(e) {
        for (var t = e.length; --t >= 0;) e[t] = 0
    }

    function _(e) {
        return 256 > e ? at[e] : at[256 + (e >>> 7)]
    }

    function r(e, t) {
        e.pending_buf[e.pending++] = 255 & t, e.pending_buf[e.pending++] = t >>> 8 & 255
    }

    function a(e, t, n) {
        e.bi_valid > Q - n ? (e.bi_buf |= t << e.bi_valid & 65535, r(e, e.bi_buf), e.bi_buf = t >> Q - e.bi_valid, e.bi_valid += n - Q) : (e.bi_buf |= t << e.bi_valid & 65535, e.bi_valid += n)
    }

    function i(e, t, n) {
        a(e, n[2 * t], n[2 * t + 1])
    }

    function l(e, t) {
        var n = 0;
        do n |= 1 & e, e >>>= 1, n <<= 1; while (--t > 0);
        return n >>> 1
    }

    function d(e) {
        16 === e.bi_valid ? (r(e, e.bi_buf), e.bi_buf = 0, e.bi_valid = 0) : e.bi_valid >= 8 && (e.pending_buf[e.pending++] = 255 & e.bi_buf, e.bi_buf >>= 8, e.bi_valid -= 8)
    }

    function o(e, t) {
        var n, _, r, a, i, l, d = t.dyn_tree,
            o = t.max_code,
            f = t.stat_desc.static_tree,
            b = t.stat_desc.has_stree,
            u = t.stat_desc.extra_bits,
            s = t.stat_desc.extra_base,
            c = t.stat_desc.max_length,
            p = 0;
        for (a = 0; O >= a; a++) e.bl_count[a] = 0;
        for (d[2 * e.heap[e.heap_max] + 1] = 0, n = e.heap_max + 1; N > n; n++) _ = e.heap[n], a = d[2 * d[2 * _ + 1] + 1] + 1, a > c && (a = c, p++), d[2 * _ + 1] = a, _ > o || (e.bl_count[a]++, i = 0, _ >= s && (i = u[_ - s]), l = d[2 * _], e.opt_len += l * (a + i), b && (e.static_len += l * (f[2 * _ + 1] + i)));
        if (0 !== p) {
            do {
                for (a = c - 1; 0 === e.bl_count[a];) a--;
                e.bl_count[a]--, e.bl_count[a + 1] += 2, e.bl_count[c]--, p -= 2
            } while (p > 0);
            for (a = c; 0 !== a; a--)
                for (_ = e.bl_count[a]; 0 !== _;) r = e.heap[--n], r > o || (d[2 * r + 1] !== a && (e.opt_len += (a - d[2 * r + 1]) * d[2 * r], d[2 * r + 1] = a), _--)
        }
    }

    function f(e, t, n) {
        var _, r, a = new Array(O + 1),
            i = 0;
        for (_ = 1; O >= _; _++) a[_] = i = i + n[_ - 1] << 1;
        for (r = 0; t >= r; r++) {
            var d = e[2 * r + 1];
            0 !== d && (e[2 * r] = l(a[d]++, d))
        }
    }

    function b() {
        var e, t, n, _, r, a = new Array(O + 1);
        for (n = 0, _ = 0; H - 1 > _; _++)
            for (lt[_] = n, e = 0; e < 1 << Z[_]; e++) it[n++] = _;
        for (it[n - 1] = _, r = 0, _ = 0; 16 > _; _++)
            for (dt[_] = r, e = 0; e < 1 << $[_]; e++) at[r++] = _;
        for (r >>= 7; K > _; _++)
            for (dt[_] = r << 7, e = 0; e < 1 << $[_] - 7; e++) at[256 + r++] = _;
        for (t = 0; O >= t; t++) a[t] = 0;
        for (e = 0; 143 >= e;) _t[2 * e + 1] = 8, e++, a[8]++;
        for (; 255 >= e;) _t[2 * e + 1] = 9, e++, a[9]++;
        for (; 279 >= e;) _t[2 * e + 1] = 7, e++, a[7]++;
        for (; 287 >= e;) _t[2 * e + 1] = 8, e++, a[8]++;
        for (f(_t, J + 1, a), e = 0; K > e; e++) rt[2 * e + 1] = 5, rt[2 * e] = l(e, 5);
        ot = new ut(_t, Z, I + 1, J, O), ft = new ut(rt, $, 0, K, O), bt = new ut(new Array(0), et, 0, L, T)
    }

    function u(e) {
        var t;
        for (t = 0; J > t; t++) e.dyn_ltree[2 * t] = 0;
        for (t = 0; K > t; t++) e.dyn_dtree[2 * t] = 0;
        for (t = 0; L > t; t++) e.bl_tree[2 * t] = 0;
        e.dyn_ltree[2 * U] = 1, e.opt_len = e.static_len = 0, e.last_lit = e.matches = 0
    }

    function s(e) {
        e.bi_valid > 8 ? r(e, e.bi_buf) : e.bi_valid > 0 && (e.pending_buf[e.pending++] = e.bi_buf), e.bi_buf = 0, e.bi_valid = 0
    }

    function c(e, t, n, _) {
        s(e), _ && (r(e, n), r(e, ~n)), R.arraySet(e.pending_buf, e.window, t, n, e.pending), e.pending += n
    }

    function p(e, t, n, _) {
        var r = 2 * t,
            a = 2 * n;
        return e[r] < e[a] || e[r] === e[a] && _[t] <= _[n]
    }

    function h(e, t, n) {
        for (var _ = e.heap[n], r = n << 1; r <= e.heap_len && (r < e.heap_len && p(t, e.heap[r + 1], e.heap[r], e.depth) && r++, !p(t, _, e.heap[r], e.depth));) e.heap[n] = e.heap[r], n = r, r <<= 1;
        e.heap[n] = _
    }

    function v(e, t, n) {
        var r, l, d, o, f = 0;
        if (0 !== e.last_lit)
            do r = e.pending_buf[e.d_buf + 2 * f] << 8 | e.pending_buf[e.d_buf + 2 * f + 1], l = e.pending_buf[e.l_buf + f], f++, 0 === r ? i(e, l, t) : (d = it[l], i(e, d + I + 1, t), o = Z[d], 0 !== o && (l -= lt[d], a(e, l, o)), r--, d = _(r), i(e, d, n), o = $[d], 0 !== o && (r -= dt[d], a(e, r, o))); while (f < e.last_lit);
        i(e, U, t)
    }

    function y(e, t) {
        var n, _, r, a = t.dyn_tree,
            i = t.stat_desc.static_tree,
            l = t.stat_desc.has_stree,
            d = t.stat_desc.elems,
            b = -1;
        for (e.heap_len = 0, e.heap_max = N, n = 0; d > n; n++) 0 !== a[2 * n] ? (e.heap[++e.heap_len] = b = n, e.depth[n] = 0) : a[2 * n + 1] = 0;
        for (; e.heap_len < 2;) r = e.heap[++e.heap_len] = 2 > b ? ++b : 0, a[2 * r] = 1, e.depth[r] = 0, e.opt_len--, l && (e.static_len -= i[2 * r + 1]);
        for (t.max_code = b, n = e.heap_len >> 1; n >= 1; n--) h(e, a, n);
        r = d;
        do n = e.heap[1], e.heap[1] = e.heap[e.heap_len--], h(e, a, 1), _ = e.heap[1], e.heap[--e.heap_max] = n, e.heap[--e.heap_max] = _, a[2 * r] = a[2 * n] + a[2 * _], e.depth[r] = (e.depth[n] >= e.depth[_] ? e.depth[n] : e.depth[_]) + 1, a[2 * n + 1] = a[2 * _ + 1] = r, e.heap[1] = r++, h(e, a, 1); while (e.heap_len >= 2);
        e.heap[--e.heap_max] = e.heap[1], o(e, t), f(a, b, e.bl_count)
    }

    function g(e, t, n) {
        var _, r, a = -1,
            i = t[1],
            l = 0,
            d = 7,
            o = 4;
        for (0 === i && (d = 138, o = 3), t[2 * (n + 1) + 1] = 65535, _ = 0; n >= _; _++) r = i, i = t[2 * (_ + 1) + 1], ++l < d && r === i || (o > l ? e.bl_tree[2 * r] += l : 0 !== r ? (r !== a && e.bl_tree[2 * r]++, e.bl_tree[2 * V]++) : 10 >= l ? e.bl_tree[2 * X]++ : e.bl_tree[2 * Y]++, l = 0, a = r, 0 === i ? (d = 138, o = 3) : r === i ? (d = 6, o = 3) : (d = 7, o = 4))
    }

    function m(e, t, n) {
        var _, r, l = -1,
            d = t[1],
            o = 0,
            f = 7,
            b = 4;
        for (0 === d && (f = 138, b = 3), _ = 0; n >= _; _++)
            if (r = d, d = t[2 * (_ + 1) + 1], !(++o < f && r === d)) {
                if (b > o) {
                    do i(e, r, e.bl_tree); while (0 !== --o)
                } else 0 !== r ? (r !== l && (i(e, r, e.bl_tree), o--), i(e, V, e.bl_tree), a(e, o - 3, 2)) : 10 >= o ? (i(e, X, e.bl_tree), a(e, o - 3, 3)) : (i(e, Y, e.bl_tree), a(e, o - 11, 7));
                o = 0, l = r, 0 === d ? (f = 138, b = 3) : r === d ? (f = 6, b = 3) : (f = 7, b = 4)
            }
    }

    function w(e) {
        var t;
        for (g(e, e.dyn_ltree, e.l_desc.max_code), g(e, e.dyn_dtree, e.d_desc.max_code), y(e, e.bl_desc), t = L - 1; t >= 3 && 0 === e.bl_tree[2 * tt[t] + 1]; t--);
        return e.opt_len += 3 * (t + 1) + 5 + 5 + 4, t
    }

    function x(e, t, n, _) {
        var r;
        for (a(e, t - 257, 5), a(e, n - 1, 5), a(e, _ - 4, 4), r = 0; _ > r; r++) a(e, e.bl_tree[2 * tt[r] + 1], 3);
        m(e, e.dyn_ltree, t - 1), m(e, e.dyn_dtree, n - 1)
    }

    function A(e) {
        var t, n = 4093624447;
        for (t = 0; 31 >= t; t++, n >>>= 1)
            if (1 & n && 0 !== e.dyn_ltree[2 * t]) return S;
        if (0 !== e.dyn_ltree[18] || 0 !== e.dyn_ltree[20] || 0 !== e.dyn_ltree[26]) return q;
        for (t = 32; I > t; t++)
            if (0 !== e.dyn_ltree[2 * t]) return q;
        return S
    }

    function j(e) {
        ct || (b(), ct = !0), e.l_desc = new st(e.dyn_ltree, ot), e.d_desc = new st(e.dyn_dtree, ft), e.bl_desc = new st(e.bl_tree, bt), e.bi_buf = 0, e.bi_valid = 0, u(e)
    }

    function k(e, t, n, _) {
        a(e, (C << 1) + (_ ? 1 : 0), 3), c(e, t, n, !0)
    }

    function z(e) {
        a(e, D << 1, 3), i(e, U, _t), d(e)
    }

    function M(e, t, n, _) {
        var r, i, l = 0;
        e.level > 0 ? (e.strm.data_type === B && (e.strm.data_type = A(e)), y(e, e.l_desc), y(e, e.d_desc), l = w(e), r = e.opt_len + 3 + 7 >>> 3, i = e.static_len + 3 + 7 >>> 3, r >= i && (r = i)) : r = i = n + 5, r >= n + 4 && -1 !== t ? k(e, t, n, _) : e.strategy === W || i === r ? (a(e, (D << 1) + (_ ? 1 : 0), 3), v(e, _t, rt)) : (a(e, (E << 1) + (_ ? 1 : 0), 3), x(e, e.l_desc.max_code + 1, e.d_desc.max_code + 1, l + 1), v(e, e.dyn_ltree, e.dyn_dtree)), u(e), _ && s(e)
    }

    function P(e, t, n) {
        return e.pending_buf[e.d_buf + 2 * e.last_lit] = t >>> 8 & 255, e.pending_buf[e.d_buf + 2 * e.last_lit + 1] = 255 & t, e.pending_buf[e.l_buf + e.last_lit] = 255 & n, e.last_lit++, 0 === t ? e.dyn_ltree[2 * n]++ : (e.matches++, t--, e.dyn_ltree[2 * (it[n] + I + 1)]++, e.dyn_dtree[2 * _(t)]++), e.last_lit === e.lit_bufsize - 1
    }
    var R = e("pano:widget/module/PanoModule/WebglRender/lib/utils/common.js"),
        W = 4,
        S = 0,
        q = 1,
        B = 2,
        C = 0,
        D = 1,
        E = 2,
        F = 3,
        G = 258,
        H = 29,
        I = 256,
        J = I + 1 + H,
        K = 30,
        L = 19,
        N = 2 * J + 1,
        O = 15,
        Q = 16,
        T = 7,
        U = 256,
        V = 16,
        X = 17,
        Y = 18,
        Z = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0],
        $ = [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13],
        et = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7],
        tt = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15],
        nt = 512,
        _t = new Array(2 * (J + 2));
    n(_t);
    var rt = new Array(2 * K);
    n(rt);
    var at = new Array(nt);
    n(at);
    var it = new Array(G - F + 1);
    n(it);
    var lt = new Array(H);
    n(lt);
    var dt = new Array(K);
    n(dt);
    var ot, ft, bt, ut = function(e, t, n, _, r) {
            this.static_tree = e, this.extra_bits = t, this.extra_base = n, this.elems = _, this.max_length = r, this.has_stree = e && e.length
        },
        st = function(e, t) {
            this.dyn_tree = e, this.max_code = 0, this.stat_desc = t
        },
        ct = !1;
    t._tr_init = j, t._tr_stored_block = k, t._tr_flush_block = M, t._tr_tally = P, t._tr_align = z
});;
define("pano:widget/module/PanoModule/WebglRender/lib/zlib/deflate.js", function(t, a) {
    "use strict";

    function e(t, a) {
        return t.msg = S[a], a
    }

    function s(t) {
        return (t << 1) - (t > 4 ? 9 : 0)
    }

    function i(t) {
        for (var a = t.length; --a >= 0;) t[a] = 0
    }

    function n(t) {
        var a = t.state,
            e = a.pending;
        e > t.avail_out && (e = t.avail_out), 0 !== e && (j.arraySet(t.output, a.pending_buf, a.pending_out, e, t.next_out), t.next_out += e, a.pending_out += e, t.total_out += e, t.avail_out -= e, a.pending -= e, 0 === a.pending && (a.pending_out = 0))
    }

    function r(t, a) {
        M._tr_flush_block(t, t.block_start >= 0 ? t.block_start : -1, t.strstart - t.block_start, a), t.block_start = t.strstart, n(t.strm)
    }

    function h(t, a) {
        t.pending_buf[t.pending++] = a
    }

    function l(t, a) {
        t.pending_buf[t.pending++] = a >>> 8 & 255, t.pending_buf[t.pending++] = 255 & a
    }

    function _(t, a, e, s) {
        var i = t.avail_in;
        return i > s && (i = s), 0 === i ? 0 : (t.avail_in -= i, j.arraySet(a, t.input, t.next_in, i, e), 1 === t.state.wrap ? t.adler = P(t.adler, a, i, e) : 2 === t.state.wrap && (t.adler = W(t.adler, a, i, e)), t.next_in += i, t.total_in += i, i)
    }

    function d(t, a) {
        var e, s, i = t.max_chain_length,
            n = t.strstart,
            r = t.prev_length,
            h = t.nice_match,
            l = t.strstart > t.w_size - la ? t.strstart - (t.w_size - la) : 0,
            _ = t.window,
            d = t.w_mask,
            o = t.prev,
            u = t.strstart + ha,
            g = _[n + r - 1],
            f = _[n + r];
        t.prev_length >= t.good_match && (i >>= 2), h > t.lookahead && (h = t.lookahead);
        do
            if (e = a, _[e + r] === f && _[e + r - 1] === g && _[e] === _[n] && _[++e] === _[n + 1]) {
                n += 2, e++;
                do; while (_[++n] === _[++e] && _[++n] === _[++e] && _[++n] === _[++e] && _[++n] === _[++e] && _[++n] === _[++e] && _[++n] === _[++e] && _[++n] === _[++e] && _[++n] === _[++e] && u > n);
                if (s = ha - (u - n), n = u - ha, s > r) {
                    if (t.match_start = a, r = s, s >= h) break;
                    g = _[n + r - 1], f = _[n + r]
                }
            }
        while ((a = o[a & d]) > l && 0 !== --i);
        return r <= t.lookahead ? r : t.lookahead
    }

    function o(t) {
        var a, e, s, i, n, r = t.w_size;
        do {
            if (i = t.window_size - t.lookahead - t.strstart, t.strstart >= r + (r - la)) {
                j.arraySet(t.window, t.window, r, r, 0), t.match_start -= r, t.strstart -= r, t.block_start -= r, e = t.hash_size, a = e;
                do s = t.head[--a], t.head[a] = s >= r ? s - r : 0; while (--e);
                e = r, a = e;
                do s = t.prev[--a], t.prev[a] = s >= r ? s - r : 0; while (--e);
                i += r
            }
            if (0 === t.strm.avail_in) break;
            if (e = _(t.strm, t.window, t.strstart + t.lookahead, i), t.lookahead += e, t.lookahead + t.insert >= ra)
                for (n = t.strstart - t.insert, t.ins_h = t.window[n], t.ins_h = (t.ins_h << t.hash_shift ^ t.window[n + 1]) & t.hash_mask; t.insert && (t.ins_h = (t.ins_h << t.hash_shift ^ t.window[n + ra - 1]) & t.hash_mask, t.prev[n & t.w_mask] = t.head[t.ins_h], t.head[t.ins_h] = n, n++, t.insert--, !(t.lookahead + t.insert < ra)););
        } while (t.lookahead < la && 0 !== t.strm.avail_in)
    }

    function u(t, a) {
        var e = 65535;
        for (e > t.pending_buf_size - 5 && (e = t.pending_buf_size - 5);;) {
            if (t.lookahead <= 1) {
                if (o(t), 0 === t.lookahead && a === I) return pa;
                if (0 === t.lookahead) break
            }
            t.strstart += t.lookahead, t.lookahead = 0;
            var s = t.block_start + e;
            if ((0 === t.strstart || t.strstart >= s) && (t.lookahead = t.strstart - s, t.strstart = s, r(t, !1), 0 === t.strm.avail_out)) return pa;
            if (t.strstart - t.block_start >= t.w_size - la && (r(t, !1), 0 === t.strm.avail_out)) return pa
        }
        return t.insert = 0, a === E ? (r(t, !0), 0 === t.strm.avail_out ? va : za) : t.strstart > t.block_start && (r(t, !1), 0 === t.strm.avail_out) ? pa : pa
    }

    function g(t, a) {
        for (var e, s;;) {
            if (t.lookahead < la) {
                if (o(t), t.lookahead < la && a === I) return pa;
                if (0 === t.lookahead) break
            }
            if (e = 0, t.lookahead >= ra && (t.ins_h = (t.ins_h << t.hash_shift ^ t.window[t.strstart + ra - 1]) & t.hash_mask, e = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h], t.head[t.ins_h] = t.strstart), 0 !== e && t.strstart - e <= t.w_size - la && (t.match_length = d(t, e)), t.match_length >= ra)
                if (s = M._tr_tally(t, t.strstart - t.match_start, t.match_length - ra), t.lookahead -= t.match_length, t.match_length <= t.max_lazy_match && t.lookahead >= ra) {
                    t.match_length--;
                    do t.strstart++, t.ins_h = (t.ins_h << t.hash_shift ^ t.window[t.strstart + ra - 1]) & t.hash_mask, e = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h], t.head[t.ins_h] = t.strstart; while (0 !== --t.match_length);
                    t.strstart++
                } else t.strstart += t.match_length, t.match_length = 0, t.ins_h = t.window[t.strstart], t.ins_h = (t.ins_h << t.hash_shift ^ t.window[t.strstart + 1]) & t.hash_mask;
            else s = M._tr_tally(t, 0, t.window[t.strstart]), t.lookahead--, t.strstart++;
            if (s && (r(t, !1), 0 === t.strm.avail_out)) return pa
        }
        return t.insert = t.strstart < ra - 1 ? t.strstart : ra - 1, a === E ? (r(t, !0), 0 === t.strm.avail_out ? va : za) : t.last_lit && (r(t, !1), 0 === t.strm.avail_out) ? pa : wa
    }

    function f(t, a) {
        for (var e, s, i;;) {
            if (t.lookahead < la) {
                if (o(t), t.lookahead < la && a === I) return pa;
                if (0 === t.lookahead) break
            }
            if (e = 0, t.lookahead >= ra && (t.ins_h = (t.ins_h << t.hash_shift ^ t.window[t.strstart + ra - 1]) & t.hash_mask, e = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h], t.head[t.ins_h] = t.strstart), t.prev_length = t.match_length, t.prev_match = t.match_start, t.match_length = ra - 1, 0 !== e && t.prev_length < t.max_lazy_match && t.strstart - e <= t.w_size - la && (t.match_length = d(t, e), t.match_length <= 5 && (t.strategy === J || t.match_length === ra && t.strstart - t.match_start > 4096) && (t.match_length = ra - 1)), t.prev_length >= ra && t.match_length <= t.prev_length) {
                i = t.strstart + t.lookahead - ra, s = M._tr_tally(t, t.strstart - 1 - t.prev_match, t.prev_length - ra), t.lookahead -= t.prev_length - 1, t.prev_length -= 2;
                do ++t.strstart <= i && (t.ins_h = (t.ins_h << t.hash_shift ^ t.window[t.strstart + ra - 1]) & t.hash_mask, e = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h], t.head[t.ins_h] = t.strstart); while (0 !== --t.prev_length);
                if (t.match_available = 0, t.match_length = ra - 1, t.strstart++, s && (r(t, !1), 0 === t.strm.avail_out)) return pa
            } else if (t.match_available) {
                if (s = M._tr_tally(t, 0, t.window[t.strstart - 1]), s && r(t, !1), t.strstart++, t.lookahead--, 0 === t.strm.avail_out) return pa
            } else t.match_available = 1, t.strstart++, t.lookahead--
        }
        return t.match_available && (s = M._tr_tally(t, 0, t.window[t.strstart - 1]), t.match_available = 0), t.insert = t.strstart < ra - 1 ? t.strstart : ra - 1, a === E ? (r(t, !0), 0 === t.strm.avail_out ? va : za) : t.last_lit && (r(t, !1), 0 === t.strm.avail_out) ? pa : wa
    }

    function c(t, a) {
        for (var e, s, i, n, h = t.window;;) {
            if (t.lookahead <= ha) {
                if (o(t), t.lookahead <= ha && a === I) return pa;
                if (0 === t.lookahead) break
            }
            if (t.match_length = 0, t.lookahead >= ra && t.strstart > 0 && (i = t.strstart - 1, s = h[i], s === h[++i] && s === h[++i] && s === h[++i])) {
                n = t.strstart + ha;
                do; while (s === h[++i] && s === h[++i] && s === h[++i] && s === h[++i] && s === h[++i] && s === h[++i] && s === h[++i] && s === h[++i] && n > i);
                t.match_length = ha - (n - i), t.match_length > t.lookahead && (t.match_length = t.lookahead)
            }
            if (t.match_length >= ra ? (e = M._tr_tally(t, 1, t.match_length - ra), t.lookahead -= t.match_length, t.strstart += t.match_length, t.match_length = 0) : (e = M._tr_tally(t, 0, t.window[t.strstart]), t.lookahead--, t.strstart++), e && (r(t, !1), 0 === t.strm.avail_out)) return pa
        }
        return t.insert = 0, a === E ? (r(t, !0), 0 === t.strm.avail_out ? va : za) : t.last_lit && (r(t, !1), 0 === t.strm.avail_out) ? pa : wa
    }

    function m(t, a) {
        for (var e;;) {
            if (0 === t.lookahead && (o(t), 0 === t.lookahead)) {
                if (a === I) return pa;
                break
            }
            if (t.match_length = 0, e = M._tr_tally(t, 0, t.window[t.strstart]), t.lookahead--, t.strstart++, e && (r(t, !1), 0 === t.strm.avail_out)) return pa
        }
        return t.insert = 0, a === E ? (r(t, !0), 0 === t.strm.avail_out ? va : za) : t.last_lit && (r(t, !1), 0 === t.strm.avail_out) ? pa : wa
    }

    function p(t) {
        t.window_size = 2 * t.w_size, i(t.head), t.max_lazy_match = R[t.level].max_lazy, t.good_match = R[t.level].good_length, t.nice_match = R[t.level].nice_length, t.max_chain_length = R[t.level].max_chain, t.strstart = 0, t.block_start = 0, t.lookahead = 0, t.insert = 0, t.match_length = t.prev_length = ra - 1, t.match_available = 0, t.ins_h = 0
    }

    function w() {
        this.strm = null, this.status = 0, this.pending_buf = null, this.pending_buf_size = 0, this.pending_out = 0, this.pending = 0, this.wrap = 0, this.gzhead = null, this.gzindex = 0, this.method = V, this.last_flush = -1, this.w_size = 0, this.w_bits = 0, this.w_mask = 0, this.window = null, this.window_size = 0, this.prev = null, this.head = null, this.ins_h = 0, this.hash_size = 0, this.hash_bits = 0, this.hash_mask = 0, this.hash_shift = 0, this.block_start = 0, this.match_length = 0, this.prev_match = 0, this.match_available = 0, this.strstart = 0, this.match_start = 0, this.lookahead = 0, this.prev_length = 0, this.max_chain_length = 0, this.max_lazy_match = 0, this.level = 0, this.strategy = 0, this.good_match = 0, this.nice_match = 0, this.dyn_ltree = new j.Buf16(2 * ia), this.dyn_dtree = new j.Buf16(2 * (2 * ea + 1)), this.bl_tree = new j.Buf16(2 * (2 * sa + 1)), i(this.dyn_ltree), i(this.dyn_dtree), i(this.bl_tree), this.l_desc = null, this.d_desc = null, this.bl_desc = null, this.bl_count = new j.Buf16(na + 1), this.heap = new j.Buf16(2 * aa + 1), i(this.heap), this.heap_len = 0, this.heap_max = 0, this.depth = new j.Buf16(2 * aa + 1), i(this.depth), this.l_buf = 0, this.lit_bufsize = 0, this.last_lit = 0, this.d_buf = 0, this.opt_len = 0, this.static_len = 0, this.matches = 0, this.insert = 0, this.bi_buf = 0, this.bi_valid = 0
    }

    function v(t) {
        var a;
        return t && t.state ? (t.total_in = t.total_out = 0, t.data_type = U, a = t.state, a.pending = 0, a.pending_out = 0, a.wrap < 0 && (a.wrap = -a.wrap), a.status = a.wrap ? da : ca, t.adler = 2 === a.wrap ? 0 : 1, a.last_flush = I, M._tr_init(a), K) : e(t, q)
    }

    function z(t) {
        var a = v(t);
        return a === K && p(t.state), a
    }

    function b(t, a) {
        return t && t.state ? 2 !== t.state.wrap ? q : (t.state.gzhead = a, K) : q
    }

    function k(t, a, s, i, n, r) {
        if (!t) return q;
        var h = 1;
        if (a === G && (a = 6), 0 > i ? (h = 0, i = -i) : i > 15 && (h = 2, i -= 16), 1 > n || n > X || s !== V || 8 > i || i > 15 || 0 > a || a > 9 || 0 > r || r > Q) return e(t, q);
        8 === i && (i = 9);
        var l = new w;
        return t.state = l, l.strm = t, l.wrap = h, l.gzhead = null, l.w_bits = i, l.w_size = 1 << l.w_bits, l.w_mask = l.w_size - 1, l.hash_bits = n + 7, l.hash_size = 1 << l.hash_bits, l.hash_mask = l.hash_size - 1, l.hash_shift = ~~((l.hash_bits + ra - 1) / ra), l.window = new j.Buf8(2 * l.w_size), l.head = new j.Buf16(l.hash_size), l.prev = new j.Buf16(l.w_size), l.lit_bufsize = 1 << n + 6, l.pending_buf_size = 4 * l.lit_bufsize, l.pending_buf = new j.Buf8(l.pending_buf_size), l.d_buf = l.lit_bufsize >> 1, l.l_buf = 3 * l.lit_bufsize, l.level = a, l.strategy = r, l.method = s, z(t)
    }

    function x(t, a) {
        return k(t, a, V, Y, Z, T)
    }

    function y(t, a) {
        var r, _, d, o;
        if (!t || !t.state || a > H || 0 > a) return t ? e(t, q) : q;
        if (_ = t.state, !t.output || !t.input && 0 !== t.avail_in || _.status === ma && a !== E) return e(t, 0 === t.avail_out ? F : q);
        if (_.strm = t, r = _.last_flush, _.last_flush = a, _.status === da)
            if (2 === _.wrap) t.adler = 0, h(_, 31), h(_, 139), h(_, 8), _.gzhead ? (h(_, (_.gzhead.text ? 1 : 0) + (_.gzhead.hcrc ? 2 : 0) + (_.gzhead.extra ? 4 : 0) + (_.gzhead.name ? 8 : 0) + (_.gzhead.comment ? 16 : 0)), h(_, 255 & _.gzhead.time), h(_, _.gzhead.time >> 8 & 255), h(_, _.gzhead.time >> 16 & 255), h(_, _.gzhead.time >> 24 & 255), h(_, 9 === _.level ? 2 : _.strategy >= L || _.level < 2 ? 4 : 0), h(_, 255 & _.gzhead.os), _.gzhead.extra && _.gzhead.extra.length && (h(_, 255 & _.gzhead.extra.length), h(_, _.gzhead.extra.length >> 8 & 255)), _.gzhead.hcrc && (t.adler = W(t.adler, _.pending_buf, _.pending, 0)), _.gzindex = 0, _.status = oa) : (h(_, 0), h(_, 0), h(_, 0), h(_, 0), h(_, 0), h(_, 9 === _.level ? 2 : _.strategy >= L || _.level < 2 ? 4 : 0), h(_, ba), _.status = ca);
            else {
                var u = V + (_.w_bits - 8 << 4) << 8,
                    g = -1;
                g = _.strategy >= L || _.level < 2 ? 0 : _.level < 6 ? 1 : 6 === _.level ? 2 : 3, u |= g << 6, 0 !== _.strstart && (u |= _a), u += 31 - u % 31, _.status = ca, l(_, u), 0 !== _.strstart && (l(_, t.adler >>> 16), l(_, 65535 & t.adler)), t.adler = 1
            }
        if (_.status === oa)
            if (_.gzhead.extra) {
                for (d = _.pending; _.gzindex < (65535 & _.gzhead.extra.length) && (_.pending !== _.pending_buf_size || (_.gzhead.hcrc && _.pending > d && (t.adler = W(t.adler, _.pending_buf, _.pending - d, d)), n(t), d = _.pending, _.pending !== _.pending_buf_size));) h(_, 255 & _.gzhead.extra[_.gzindex]), _.gzindex++;
                _.gzhead.hcrc && _.pending > d && (t.adler = W(t.adler, _.pending_buf, _.pending - d, d)), _.gzindex === _.gzhead.extra.length && (_.gzindex = 0, _.status = ua)
            } else _.status = ua;
        if (_.status === ua)
            if (_.gzhead.name) {
                d = _.pending;
                do {
                    if (_.pending === _.pending_buf_size && (_.gzhead.hcrc && _.pending > d && (t.adler = W(t.adler, _.pending_buf, _.pending - d, d)), n(t), d = _.pending, _.pending === _.pending_buf_size)) {
                        o = 1;
                        break
                    }
                    o = _.gzindex < _.gzhead.name.length ? 255 & _.gzhead.name.charCodeAt(_.gzindex++) : 0, h(_, o)
                } while (0 !== o);
                _.gzhead.hcrc && _.pending > d && (t.adler = W(t.adler, _.pending_buf, _.pending - d, d)), 0 === o && (_.gzindex = 0, _.status = ga)
            } else _.status = ga;
        if (_.status === ga)
            if (_.gzhead.comment) {
                d = _.pending;
                do {
                    if (_.pending === _.pending_buf_size && (_.gzhead.hcrc && _.pending > d && (t.adler = W(t.adler, _.pending_buf, _.pending - d, d)), n(t), d = _.pending, _.pending === _.pending_buf_size)) {
                        o = 1;
                        break
                    }
                    o = _.gzindex < _.gzhead.comment.length ? 255 & _.gzhead.comment.charCodeAt(_.gzindex++) : 0, h(_, o)
                } while (0 !== o);
                _.gzhead.hcrc && _.pending > d && (t.adler = W(t.adler, _.pending_buf, _.pending - d, d)), 0 === o && (_.status = fa)
            } else _.status = fa;
        if (_.status === fa && (_.gzhead.hcrc ? (_.pending + 2 > _.pending_buf_size && n(t), _.pending + 2 <= _.pending_buf_size && (h(_, 255 & t.adler), h(_, t.adler >> 8 & 255), t.adler = 0, _.status = ca)) : _.status = ca), 0 !== _.pending) {
            if (n(t), 0 === t.avail_out) return _.last_flush = -1, K
        } else if (0 === t.avail_in && s(a) <= s(r) && a !== E) return e(t, F);
        if (_.status === ma && 0 !== t.avail_in) return e(t, F);
        if (0 !== t.avail_in || 0 !== _.lookahead || a !== I && _.status !== ma) {
            var f = _.strategy === L ? m(_, a) : _.strategy === O ? c(_, a) : R[_.level].func(_, a);
            if ((f === va || f === za) && (_.status = ma), f === pa || f === va) return 0 === t.avail_out && (_.last_flush = -1), K;
            if (f === wa && (a === A ? M._tr_align(_) : a !== H && (M._tr_stored_block(_, 0, 0, !1), a === C && (i(_.head), 0 === _.lookahead && (_.strstart = 0, _.block_start = 0, _.insert = 0))), n(t), 0 === t.avail_out)) return _.last_flush = -1, K
        }
        return a !== E ? K : _.wrap <= 0 ? N : (2 === _.wrap ? (h(_, 255 & t.adler), h(_, t.adler >> 8 & 255), h(_, t.adler >> 16 & 255), h(_, t.adler >> 24 & 255), h(_, 255 & t.total_in), h(_, t.total_in >> 8 & 255), h(_, t.total_in >> 16 & 255), h(_, t.total_in >> 24 & 255)) : (l(_, t.adler >>> 16), l(_, 65535 & t.adler)), n(t), _.wrap > 0 && (_.wrap = -_.wrap), 0 !== _.pending ? K : N)
    }

    function B(t) {
        var a;
        return t && t.state ? (a = t.state.status, a !== da && a !== oa && a !== ua && a !== ga && a !== fa && a !== ca && a !== ma ? e(t, q) : (t.state = null, a === ca ? e(t, D) : K)) : q
    }
    var R, j = t("pano:widget/module/PanoModule/WebglRender/lib/utils/common.js"),
        M = t("pano:widget/module/PanoModule/WebglRender/lib/zlib/trees.js"),
        P = t("pano:widget/module/PanoModule/WebglRender/lib/zlib/adler32.js"),
        W = t("pano:widget/module/PanoModule/WebglRender/lib/zlib/crc32.js"),
        S = t("pano:widget/module/PanoModule/WebglRender/lib/zlib/messages.js"),
        I = 0,
        A = 1,
        C = 3,
        E = 4,
        H = 5,
        K = 0,
        N = 1,
        q = -2,
        D = -3,
        F = -5,
        G = -1,
        J = 1,
        L = 2,
        O = 3,
        Q = 4,
        T = 0,
        U = 2,
        V = 8,
        X = 9,
        Y = 15,
        Z = 8,
        $ = 29,
        ta = 256,
        aa = ta + 1 + $,
        ea = 30,
        sa = 19,
        ia = 2 * aa + 1,
        na = 15,
        ra = 3,
        ha = 258,
        la = ha + ra + 1,
        _a = 32,
        da = 42,
        oa = 69,
        ua = 73,
        ga = 91,
        fa = 103,
        ca = 113,
        ma = 666,
        pa = 1,
        wa = 2,
        va = 3,
        za = 4,
        ba = 3,
        ka = function(t, a, e, s, i) {
            this.good_length = t, this.max_lazy = a, this.nice_length = e, this.max_chain = s, this.func = i
        };
    R = [new ka(0, 0, 0, 0, u), new ka(4, 4, 8, 4, g), new ka(4, 5, 16, 8, g), new ka(4, 6, 32, 32, g), new ka(4, 4, 16, 16, f), new ka(8, 16, 32, 32, f), new ka(8, 16, 128, 128, f), new ka(8, 32, 128, 256, f), new ka(32, 128, 258, 1024, f), new ka(32, 258, 258, 4096, f)], a.deflateInit = x, a.deflateInit2 = k, a.deflateReset = z, a.deflateResetKeep = v, a.deflateSetHeader = b, a.deflate = y, a.deflateEnd = B, a.deflateInfo = "pako deflate (from Nodeca project)"
});;
define("pano:widget/module/PanoModule/WebglRender/markerStrategy/Sector.js", function() {
    var t = function(e, n, i, h, r) {
        function s(t) {
            return 180 * t / Math.PI
        }

        function a() {
            var t = r ? u : -Math.PI / 2,
                e = r ? g : Math.PI / 2;
            c[0] > 2 * Math.PI && (c[0] = c[0] - 2 * Math.PI), c[0] < 0 && (c[0] = c[0] + 2 * Math.PI), c[1] < t && (c[1] = t), c[1] + c[3] > e && (c[1] = e - c[3])
        }

        function o() {
            if (!1 === P.getIsComposite()) f = [P];
            else {
                var r = 2 * Math.PI - e,
                    s = new t(e, n, r, h),
                    a = new t(0, n, i - r, h);
                f = [s, a]
            }
        }
        var u = -60 * Math.PI / 180,
            g = 0 * Math.PI / 180,
            c = [e, n, i, h],
            r = !1 === r ? !1 : !0,
            f = [],
            P = this;
        this.getPhy = function() {
            return c[0]
        }, this.getTheta = function() {
            return c[1]
        }, this.getPhyRange = function() {
            return c[2]
        }, this.getThetaRange = function() {
            return c[3]
        }, this.getCenter = function() {
            var t = e + i / 2;
            return t > 2 * Math.PI && (t -= 2 * Math.PI), [t, n + h / 2]
        }, this.getRect = function() {
            return c
        }, this.getHasRange = function() {
            return r
        }, this.getVertices = function() {
            var t = [],
                r = e + i,
                s = n + h;
            return t.push([e, n]), t.push([r, n]), t.push([r, s]), t.push([e, s]), t
        }, this.getIsComposite = function() {
            var t = e + i;
            return t > 2 * Math.PI
        }, this.getCompositeSectors = function() {
            return f
        }, this.toString = function() {
            return "Sector: phy = " + s(this.getPhy()) + " , theta = " + s(this.getTheta()) + " , phyRange = " + s(this.getPhyRange()) + " , thetaRange = " + s(this.getThetaRange()) + " , isComposite = " + this.getIsComposite()
        }, this.dispose = function() {
            if (f)
                for (var t, e = f.length - 1; e >= 0; e--) t = f[e], f.splice(e, 1), t = void 0
        }, a(), o()
    };
    return t
});;
define("pano:widget/module/PanoModule/WebglRender/markerStrategy/GridVector.js", function() {
    var t = function(t, r) {
        function e(t, r) {
            return t * o + r
        }
        for (var n = t, o = r, i = [], f = t * r, l = 0; f > l; l++) i[l] = [];
        this.getCell = function(t, r) {
            return i[e(t, r)]
        }, this.getCells = function(t, r, e, n) {
            for (var o = [], i = t; r >= i; i++)
                for (var f = e; n >= f; f++) o = o.concat(this.getCell(i, f));
            return o
        }, this.addIntoCell = function(t, r, n) {
            i[e(t, r)].push(n)
        }, this.addIntoCells = function(t, r, e, n, o) {
            for (var i = t; r >= i; i++)
                for (var f = e; n >= f; f++) this.addIntoCell(i, f, o)
        }, this.removeFromCell = function(t, r, n) {
            var o = e(t, r),
                f = i[o];
            if (f)
                for (var l = 0, s = f.length; s > l; l++)
                    if (n === f[l]) return void f.splice(l, 1)
        }, this.removeFromCells = function(t, r, e, n, o) {
            for (var i = t; r >= i; i++)
                for (var f = e; n >= f; f++) this.removeFromCell(i, f, o)
        }, this.getLength = function() {
            for (var t = 0, r = 0, e = i.length; e > r; r++) t += i[r].length;
            return t
        }, this.toString = function() {
            for (var t = "", r = 0; n > r; r++) {
                t += "第" + r + "行";
                for (var e = 0; o > e; e++) t += "   [" + this.getCell(r, e).length + "]   ";
                t += "\n"
            }
            return t
        }, this.reset = function() {
            i = [];
            for (var t = 0; f > t; t++) i[t] = []
        }, this.dispose = function() {
            i = []
        }
    };
    return t
});;
define("pano:widget/module/PanoModule/WebglRender/markerStrategy/SectorGrid.js", function(e) {
    var t = e("pano:widget/module/PanoModule/WebglRender/markerStrategy/GridVector.js"),
        n = (e("pano:widget/module/PanoModule/WebglRender/markerStrategy/SectorManager.js"), function(e, n) {
            function r(e) {
                var t = g(e.getTheta()),
                    n = g(e.getTheta() + e.getThetaRange()),
                    r = o(e.getPhy()),
                    a = o(e.getPhy() + e.getPhyRange());
                return i.getCells(t, n, r, a)
            }

            function o(e) {
                var t = Math.floor(e * h / (2 * Math.PI));
                return t = t > h - 1 ? h - 1 : t
            }

            function g(t) {
                var r, o = t - e,
                    g = n - e;
                return r = 0 > o ? 0 : o >= g ? a - 1 : Math.floor(o * a / g)
            }
            var a = 10,
                h = 10,
                i = new t(a, h);
            this.addSector = function(e) {
                for (var t, n, r, a, h, s = e.getCompositeSectors(), u = 0, c = s.length; c > u; u++) h = s[u], t = g(h.getTheta()), n = g(h.getTheta() + h.getThetaRange()), r = o(h.getPhy()), a = o(h.getPhy() + h.getPhyRange()), i.addIntoCells(t, n, r, a, e)
            }, this.removeSector = function(e) {
                for (var t, n, r, a, h, s = e.getCompositeSectors(), u = 0, c = s.length; c > u; u++) h = s[u], t = g(h.getTheta()), n = g(h.getTheta() + h.getThetaRange()), r = o(h.getPhy()), a = o(h.getPhy() + h.getPhyRange()), i.removeFromCells(t, n, r, a, e)
            }, this.getIntersectantCellsSectors = function(e) {
                for (var t, n = [], o = e.getCompositeSectors(), g = 0, a = o.length; a > g; g++) t = o[g], n = n.concat(r(t));
                return n
            }, this.toString = function() {
                return i.toString()
            }, this.getLength = function() {
                return i.getLength()
            }, this.reset = function() {
                i && i.reset()
            }, this.dispose = function() {
                i && (i.dispose(), i = void 0)
            }
        });
    return n
});;
define("pano:widget/module/PanoModule/WebglRender/markerStrategy/SectorManager.js", function(e) {
    var t = e("pano:widget/module/PanoModule/WebglRender/markerStrategy/Sector.js"),
        a = e("pano:widget/module/PanoModule/WebglRender/markerStrategy/SectorGrid.js"),
        n = e("pano:widget/module/PanoModule/WebglRender/util/Util.js"),
        r = Four.CursorPicker,
        o = Four.camera.PerspectiveCamera,
        h = Four.Log,
        g = function() {
            function e(e) {
                X.push(e.getPhy());
                var t = e.getPhy() + e.getPhyRange();
                t = t > 2 * Math.PI ? t - 2 * Math.PI : t, X.push(t), L.push(e.getTheta()), L.push(e.getTheta() + e.getThetaRange()), X.sort(g), L.sort(g)
            }

            function g(e, t) {
                return t > e ? -1 : e > t ? 1 : 0
            }

            function i(e) {
                X.splice(n.indexOf(X, e.getPhy()), 1);
                var t = e.getPhy() + e.getPhyRange();
                t = t > 2 * Math.PI ? t - 2 * Math.PI : t, X.splice(n.indexOf(X, t), 1), L.splice(n.indexOf(L, e.getTheta()), 1), L.splice(n.indexOf(L, e.getTheta() + e.getThetaRange()), 1)
            }

            function s(e, t) {
                var a, n = O.findAvailableSectorsInRange(e, t);
                if (!n || n.length <= 0) return a;
                H = n;
                for (var r, o = Number.MAX_VALUE, h = n.length, g = 0; h > g; g++) r = O.getDistance(e, n[g]), o > r && (o = r, a = n[g]);
                return o > R && (a = null), a
            }

            function c(e, a) {
                var n, r = [];
                return n = new t(e[0], e[1], a.getPhyRange(), a.getThetaRange()), O.isSectorAviable(n) && r.push(n), n = new t(e[0] - a.getPhyRange(), e[1], a.getPhyRange(), a.getThetaRange()), O.isSectorAviable(n) && r.push(n), n = new t(e[0] - a.getPhyRange(), e[1] - a.getThetaRange(), a.getPhyRange(), a.getThetaRange()), O.isSectorAviable(n) && r.push(n), n = new t(e[0], e[1] - a.getThetaRange(), a.getPhyRange(), a.getThetaRange()), O.isSectorAviable(n) && r.push(n), r
            }

            function u(e) {
                for (var t, a = [], n = e.getCompositeSectors(), r = 0, o = n.length; o > r; r++) t = n[r], a = a.concat(P(t.getPhy(), t.getPhy() + t.getPhyRange(), X));
                return a
            }

            function l(e) {
                for (var t, a = [], n = e.getCompositeSectors(), r = 0, o = n.length; o > r; r++) t = n[r], a = a.concat(P(t.getTheta(), t.getTheta() + t.getThetaRange(), L));
                return a
            }

            function P(e, t, a) {
                var n = [],
                    r = a.length;
                if (t > 2 * Math.PI) {
                    for (var o = 0; r > o; o++) a[o] >= e && a[o] <= 2 * Math.PI && n.push(a[o]);
                    for (var o = 0; r > o; o++) a[o] >= 0 && a[o] <= t - 2 * Math.PI && n.push(a[o])
                } else
                    for (var o = 0; r > o; o++)
                        if (a[o] >= e) {
                            if (!(a[o] <= t)) return n;
                            n.push(a[o])
                        } return n
            }

            function f(e, t) {
                for (var a, n, r, o, h, g, i = e.getCompositeSectors(), s = t.getCompositeSectors(), c = 0, u = i.length; u > c; c++) {
                    a = i[c];
                    for (var l = 0, P = s.length; P > l; l++)
                        if (n = s[l], r = a.getCenter(), o = n.getCenter(), h = Math.min(Math.abs(r[0] - o[0]), 2 * Math.PI - Math.abs(r[0] - o[0])), g = Math.abs(r[1] - o[1]), h < .5 * (a.getPhyRange() + n.getPhyRange()) && g < .5 * (a.getThetaRange() + n.getThetaRange())) return !0
                }
                return !1
            }

            function p(e) {
                for (var t = e.length - 1; t >= 0; t--) e[t] && (e[t].dispose(), e[t] = null), e.splice(t, 1)
            }
            var d = -60 * Math.PI / 180,
                M = 0 * Math.PI / 180,
                v = -40 * Math.PI / 180,
                S = 0 * Math.PI / 180,
                R = Number.MAX_VALUE,
                I = 1 * Math.PI / 180,
                T = .2 * Math.PI / 180,
                y = 40 * Math.PI / 180,
                m = 20 * Math.PI / 180,
                w = -20,
                b = 0,
                W = 0,
                A = 0,
                k = 0,
                C = 0,
                U = new a(d, M),
                X = [],
                L = [],
                x = [],
                D = [],
                H = [],
                O = this;
            this.updateViewport = function(e, t, a) {
                b = e, W = t, A = a
            }, this.updatePanoramaPosition = function(e, t) {
                k = e, C = t
            }, this.addSector = function(t) {
                e(t), U.addSector(t), x.push(t)
            }, this.removeSector = function(e) {
                var t = n.indexOf(x, e);
                0 > t || (i(e), U.removeSector(e), x.splice(t, 1), e.dispose())
            }, this.findNearestAvailableSector = function(a) {
                if (this.isSectorAviable(a)) return a;
                e(a);
                var n = a.getTheta() - m / 2,
                    r = a.getThetaRange() + m;
                a.getTheta() + a.getThetaRange() > S ? n = a.getTheta() + a.getThetaRange() - r : n + r > S && (n = S - r), a.getTheta() < v ? n = a.getTheta() : v > n && (n = v);
                var o = new t(a.getPhy() - y / 2, n, a.getPhyRange() + y, r);
                h.log("[SectorManager] Range: " + o.toString());
                var g = s(a, o);
                return g ? (i(a), g) : g
            }, this.findAvailableSectorsInRange = function(e, t) {
                for (var a, n = t ? u(t) : X, r = t ? l(t) : L, o = n.length, h = r.length, g = [], i = 0; o > i; i++)
                    for (var s = 0; h > s; s++) a = [n[i], r[s]], D.push(a), g = g.concat(c(a, e));
                return g
            }, this.isSectorAviable = function(e) {
                for (var t, a = U.getIntersectantCellsSectors(e), n = 0, r = a.length; r > n; n++)
                    if (t = a[n], f(e, t)) return !1;
                return !0
            }, this.getDistance = function(e, t) {
                var a = e.getCenter(),
                    n = t.getCenter(),
                    r = a[0] > Math.PI ? -(a[0] - Math.PI) : Math.PI - a[0],
                    o = -a[1],
                    h = n[0] > Math.PI ? -(n[0] - Math.PI) : Math.PI - n[0],
                    g = -n[1],
                    i = Math.acos(Math.cos(o) * Math.cos(g) * Math.cos(h - r) + Math.sin(o) * Math.sin(g));
                return i
            }, this.getMarkerSector = function(e) {
                var a = W / 2,
                    n = A / 2,
                    o = e.getUIWidth(),
                    g = e.getUIHeight(),
                    i = (e.getUIHeight() - e.getUIPanelHeight()) / 2;
                h.log("[SectorManger] " + e.getUIHeight() + ",  " + e.getUIPanelHeight());
                var s = a - o / 2,
                    c = a + o / 2,
                    u = n - g / 2,
                    l = n + g / 2,
                    P = this.viewportToSphereWithRotationX([s, n], w),
                    f = this.viewportToSphereWithRotationX([c, n], w),
                    p = this.viewportToSphereWithRotationX([a, u], w),
                    d = this.viewportToSphereWithRotationX([a, l], w),
                    M = Math.abs(f[0] - P[0]),
                    v = Math.abs(d[1] - p[1]),
                    S = v * i / g;
                M > Math.PI && (M = 2 * Math.PI - M), M += I, v += T;
                var R;
                if (e.diffusedSpherePoint) R = e.diffusedSpherePoint;
                else if (e.originalSpherePoint) R = e.originalSpherePoint;
                else {
                    var y = [k, C],
                        m = [e.getMarkerData().mercatorX - y[0], e.getMarkerData().rank, -(e.getMarkerData().mercatorY - y[1])];
                    h.log("[SectorManager] panoX: " + k + "  panoY: " + C), h.log("[SectorManager] centerWorldPosition: " + m[0] + " ,  " + m[1] + ", " + m[2]), R = r.worldToSphere(m), h.log("[SectorManager] sectorCenter: " + R[0] + " , " + R[1] + " --- " + S), R[1] += S
                }
                var b = new t(R[0] - M / 2, R[1] - v / 2, M, v);
                return b.markerId = e.getMarkerData().markerId, b
            }, this.viewportToSphereWithRotationX = function(e, t) {
                var a = new o(b, W / A, .1, 1e4);
                return a.rotationX = t, a.updateWorldMatrix(), r.viewportToSphere(a, e, W, A)
            }, this.removeIconFromSector = function(e, a) {
                var n = a.getPhyRange() * e.getIconWidth() / e.getUIWidth();
                return new t(a.getPhy() + n, a.getTheta(), a.getPhyRange() - n, a.getThetaRange())
            }, this.addIconIntoSector = function(e, a) {
                var n = a.getPhyRange() * e.getIconWidth() / (e.getUIWidth() - e.getIconWidth());
                return new t(a.getPhy() - n, a.getTheta(), a.getPhyRange() + n, a.getThetaRange())
            }, this.getSectorByRectangle = function(e, a) {
                return new t(e[0], e[1], e[2], e[3], a)
            }, this.toString = function() {
                var e = "phyVals Len = " + X.length;
                return e += "; thetaVals Len = " + L.length, e += "; sectors Len = " + x.length, e += "; grid Len = " + U.length
            }, this.reset = function() {
                U.reset(), X = [], L = [], D = [];
                for (var e = x.length - 1; e >= 0; e--) x[e].dispose(), x[e] = null, x.splice(e, 1)
            }, this.dispose = function() {
                U.dispose(), X.splice(0, X.length), L.splice(0, L.length), D.splice(0, D.length), p(x), p(H)
            }
        };
    return g
});;
define("pano:widget/module/PanoModule/WebglRender/markerStrategy/MarkerOverlapStrategy.js", function(r) {
    var e = r("pano:widget/module/PanoModule/WebglRender/markerStrategy/SectorManager.js"),
        t = (r("pano:widget/module/PanoModule/WebglRender/config/ConstantConfig.js"), Four.GLMatrix),
        a = t.mat4,
        o = t.vec3,
        n = Four.Tool,
        i = Four.CursorPicker,
        u = Four.Log,
        g = function() {
            function r() {
                S && S.reset(), m = {}, I = [], P = [], M = {}
            }

            function t(r) {
                for (var e, t = r.length, a = 0; t > a; a++) e = S.getMarkerSector(r[a]), P.push(e), S.addSector(e)
            }

            function g() {
                var r, e, t = k.length;
                for (var a in m) {
                    for (r = -1, e = 0; t > e; e++)
                        if (k[e].getMarkerData().markerId === a) {
                            r = e;
                            break
                        }
                    0 > r && (S.removeSector(m[a]), delete m[a])
                }
            }

            function d() {
                var r, e, t = k.length,
                    a = 0;
                for (a = 0; t > a; a++) r = k[a], s(r) || r.diffusedSpherePoint && (e = S.getMarkerSector(r), S.addSector(e), m[r.getMarkerData().markerId] = e);
                for (a = 0; t > a; a++) r = k[a], s(r) || r.diffusedSpherePoint || (e = S.getMarkerSector(r), u.log("[MarkerOverlapStrategy] " + e.toString()), r.originalSpherePoint = e.getCenter(), f(e, r))
            }

            function s(r) {
                var e = r.getMarkerData().markerId;
                for (var t in m)
                    if (t === e) return !0;
                return !1
            }

            function f(r, e) {
                var t;
                if (t = S.findNearestAvailableSector(r)) u.log("[MarkerOverlapStrategy] 带着图标也能找的到 " + t.toString());
                else {
                    u.log("[MarkerOverlapStrategy] 开启去ICON查找 ");
                    var a = S.removeIconFromSector(e, r);
                    u.log("[MarkerOverlapStrategy] sector " + r.toString()), u.log("[MarkerOverlapStrategy] sectorWithoutIcon " + a.toString()), t = S.findNearestAvailableSector(a), t ? (t = S.addIconIntoSector(e, t), u.log("[MarkerOverlapStrategy] availableSector+icon " + t.toString())) : u.log("[MarkerOverlapStrategy] 去掉图标也没有找到")
                }
                t || (t = r), e.diffusedSpherePoint = t.getCenter(), S.addSector(t), m[e.getMarkerData().markerId] = t
            }

            function l() {
                if (void 0 !== M && 0 !== k.length) {
                    u.log("[MarkerOverlapStrategy] updateMarkerSequence " + k.length);
                    for (var r, e = M.panoId, t = k.length, a = 0; t > a; a++) r = k[a].getMarkerData(), r.inBestPano = r.panoId == e ? !0 : !1;
                    k.sort(c)
                }
            }

            function c(r, e) {
                var t = r.getMarkerData(),
                    a = e.getMarkerData(),
                    o = t.isUserSelect,
                    n = a.isUserSelect;
                if (o && !n) return -1;
                if (!o && n) return 1;
                if (t.isInBestPano && !a.isInBestPano) return -1;
                if (!t.isInBestPano && a.isInBestPano) return 1;
                var i = t.uid,
                    u = a.uid;
                return i.localeCompare(u)
            }

            function p() {
                for (var r, e, t = h(), a = t.length, o = 0; a > o; o++) e = t[o], r = S.getSectorByRectangle(e, !1), I.push(r), S.addSector(r)
            }

            function h() {
                for (var r, e, t, a, o, n, u, g, d, s = [], f = v(), l = 0, c = f.length; c > l; l++) {
                    r = f[l], e = Number.MAX_VALUE, t = Number.MIN_VALUE, a = Number.MAX_VALUE, o = Number.MIN_VALUE;
                    for (var p = 0, h = r.length; h > p; p++) n = i.worldToSphere(r[p]), u = n[0], g = n[1], e = Math.min(e, u), t = Math.max(t, u), a = Math.min(a, g), o = Math.max(o, g);
                    d = [e, a, t - e, o - a], s.push(d)
                }
                return s
            }

            function v() {
                var r, e, t = (M.currentRoad, M.deviceHeight),
                    i = 2 * M.roadWidth,
                    u = -M.moveDir,
                    g = [],
                    d = [],
                    s = -i / 2,
                    f = i / 2,
                    l = [-500, -30, -15, -8, -4, -2, -1, 0, 1, 2, 4, 8, 15, 30, 500],
                    c = l.length;
                for (r = 0; c > r; r++) e = l[r], g.push(s, -t, e), d.push(f, -t, e);
                var p = a.create();
                a.rotate(p, p, n.degToRad(u), [0, 1, 0]);
                var h, v, S, k, m, I, P, y, b, O, N, A, D, w, C, B, L, R = [];
                for (r = 0; r < g.length / 3 - 1; r++) v = g[3 * r], S = g[3 * r + 1], k = g[3 * r + 2], w = [v, S, k], o.transformMat4(w, w, p), m = g[3 * (r + 1)], I = g[3 * (r + 1) + 1], P = g[3 * (r + 1) + 2], C = [m, I, P], o.transformMat4(C, C, p), y = d[3 * r], b = d[3 * r + 1], O = d[3 * r + 2], B = [y, b, O], o.transformMat4(B, B, p), N = d[3 * (r + 1)], A = d[3 * (r + 1) + 1], D = d[3 * (r + 1) + 2], L = [N, A, D], o.transformMat4(L, L, p), h = [], h.push(w), h.push(C), h.push(L), h.push(B), h.push([(w[0] + B[0]) / 2, (w[1] + B[1]) / 2, (w[2] + B[2]) / 2]), h.push([(C[0] + L[0]) / 2, (C[1] + L[1]) / 2, (C[2] + L[2]) / 2]), R.push(h);
                return R
            }
            var M = {},
                S = new e,
                k = [],
                m = {},
                I = [],
                P = [];
            this.setPanoramaData = function(e) {
                e.panoId !== M.panoId && (r(), M = e), S.updateViewport(e.fovy, e.viewportWidth, e.viewportHeight), S.updatePanoramaPosition(e.panoX, e.panoY)
            }, this.getPanoId = function() {
                return M.panoId
            }, this.addNotOverlapMarker = function(r) {
                void 0 !== r && t(r instanceof Array ? r : [r])
            }, this.updateMarkers = function(r) {
                0 >= I.length && p(), k = r, l(), g(), d()
            }, this.dispose = function() {
                S && S.dispose()
            }
        };
    return g
});;
define("pano:widget/module/PanoModule/WebglRender/model/RegionVO.js", function() {
    function t() {
        this.type = 0, this.pid = "", this.panoX = 0, this.panoY = 0, this.info = "", this.id = "", this.desc = 0, this.image = 0, this.sound = 0, this.points = [], this.regionid = "", this.url = "", this.setpoivo = function(t) {
            this.poivo = {};
            var i = this.poivo;
            i.catalog = t.CATG, i.id = t.POI_ID, i.merX = t.X, i.merY = t.Y, i.name = t.NAME, i.pid = t.PANO_ID, i.dir = t.DIR, i.pitch = t.PITCH
        }, this.setPoints = function(t) {
            this.points = [];
            var i = 0,
                s = 0,
                h = [];
            switch (this.type) {
                case 18:
                case 30:
                    var o = Number.POSITIVE_INFINITY,
                        e = Number.NEGATIVE_INFINITY,
                        n = Number.POSITIVE_INFINITY,
                        a = Number.NEGATIVE_INFINITY;
                    for (i = 0, s = t.length - 1; s > i; i++) {
                        var r = t[i].X,
                            I = t[i].Y;
                        o = Math.min(o, r), e = Math.max(e, r), n = Math.min(n, I), a = Math.max(a, I)
                    }
                    var p = o + (e - o) / 2,
                        u = n + (a - n) / 2,
                        N = .015,
                        d = .01;
                    for (i = 0; 360 > i; i += 6) {
                        var m = 2 * Math.PI * i / 360;
                        this.points.push([p + N * Math.cos(m), u + d * Math.sin(m)])
                    }
                    break;
                default:
                    for (i = 1, s = t.length - 0; s > i; i++) {
                        var f = t[i - 1],
                            Y = t[i],
                            l = Y.X - f.X,
                            c = Y.Y - f.Y,
                            v = Math.sqrt(l * l + c * c),
                            M = Math.floor(v / .1);
                        h.push(f);
                        for (var g = 0; M > g; g++) h.push({
                            X: f.X + g * l / M,
                            Y: f.Y + g * c / M
                        })
                    }
                    for (h.push(t[t.length - 1]), i = 0, s = h.length; s > i; i++) this.points.push([h[i].X, h[i].Y])
            }
        }
    }
    return t
});;
define("pano:widget/module/PanoModule/WebglRender/model/PanoramaData.js", function(t) {
    var i = t("pano:widget/module/PanoModule/WebglRender/config/ConstantConfig.js"),
        o = function() {
            this.panoId = "", this.iid = "", this.panoType = "", this.panoX = 0, this.panoY = 0, this.panoZ = 0, this.rx = 0, this.ry = 0, this.rz = 0, this.lx = 0, this.ly = 0, this.moveDir = -30, this.heading = 0, this.pitch = 0, this.roll = 0, this.imgLayers = [], this.maxImgLevel = void 0, this.deviceHeight = 0, this.date = "20130822", this.time = "", this.provider = 1, this.admission = "GS(2013)6021", this.roadName = "", this.roads = [], this.vpoints = [], this.mode = "", this.dayNightPanos = [], this.username = " ", this.imgVmax = 0 / 0, this.imgVmin = 0 / 0, this.pointCloudData = void 0, this.regions = void 0, this.nearPoints = [], this.photos = [], this.topoArray = void 0, this.currentRoad = void 0, this.roadWidth = void 0;
            var t = this;
            this.getCurrentRoad = function() {
                if (this.currentRoad) return this.currentRoad;
                for (var i = t.roads, o = 0, r = i.length; r > o; o++)
                    if (i[o].isCurrentRoad) {
                        this.currentRoad = i[o];
                        break
                    }
                return this.currentRoad
            }, this.isRoadWidthValid = function() {
                return void 0 === this.roadWidth && this.getRoadWidth(), !isNaN(this.roadWidth) && this.roadWidth > 0
            }, this.getRoadWidth = function() {
                if (this.regions) return 5;
                if (void 0 === this.roadWidth && (this.currentRoad || (this.currentRoad = this.getCurrentRoad()), this.roadWidth = this.currentRoad ? this.currentRoad.roadWidth : 0), 0 >= this.roadWidth)
                    if (this.panoType === i.TYPE_INNER) {
                        var t = this.getTopos();
                        if (t && 0 < t.length) return 5
                    } else if (this.panoType === i.TYPE_STREET) return 10;
                return this.roadWidth
            }, this.getTopos = function() {
                if (this.topoArray) return this.topoArray;
                if (this.currentRoad || (this.currentRoad = this.getCurrentRoad()), !this.currentRoad) return [];
                if (this.topoArray = this.currentRoad.getTopoInRoad(this.panoId), this.vpoints.length < 1) return this.topoArray;
                for (var t, i = this.vpoints.length - 1; i >= 0; i--) t = this.vpoints[i], t.topoDir = t.dir, this.topoArray.push(t);
                return this.topoArray
            }, this.hasGroupPointCloud = function() {
                return this.pointCloudData && !0 === this.pointCloudData.hasGroupPointCloud
            }, this.clone = function() {
                var t = new o;
                for (var i in this) t[i] = this[i];
                return t
            }
        };
    return o
});;
define("pano:widget/module/PanoModule/WebglRender/model/RoadData.js", function() {
    function t() {
        function t(t, i) {
            return void 0 !== i && (i.topoDir = t, i.roadName = this.roadName), i
        }
        this.rid = "", this.roadName = "", this.roadWidth = 5, this.isCurrentRoad = 0, this.pointList = [], this.getTopoInRoad = function(i) {
            var o = [],
                n = this.pointList,
                r = n.length,
                e = this.getPointByPanoId(i);
            if (!e || 1 >= r) return o;
            var d = e.order;
            return 0 === d ? o.push(t(e.dir, n[1])) : d === r - 1 ? o.push(t(n[d - 1].dir + 180, n[d - 1])) : (o.push(t((n[d - 1].dir + 180) % 360, n[d - 1])), o.push(t(n[d].dir, n[d + 1]))), o
        }, this.getPointByPanoId = function(t) {
            for (var i, o = this.pointList, n = 0, r = o.length; r > n; n++)
                if (o[n].panoId === t) {
                    i = o[n];
                    break
                }
            return i
        }
    }
    return t
});;
define("pano:widget/module/PanoModule/WebglRender/model/PointCloudData.js", function() {
    var t = function() {
        this.imageWidth = 0, this.imageHeight = 0, this.planeIndices = void 0, this.names = [], this.planes = [], this.hasGroupPointCloud = !1, this.getPlaneBySpherePosition = function(t) {
            var i = Math.round(this.imageWidth * t[0]),
                a = Math.round(this.imageHeight * t[1]);
            return i > this.imageWidth ? i -= this.imageWidth : 0 > i && (i += this.imageWidth), a > this.imageHeight ? a -= this.imageHeight : 0 > a && (a += this.imageHeight), this.getPlaneByImagePosition(i, a)
        }, this.getPlaneByImagePosition = function(t, i) {
            var a, e = i * this.imageWidth + t,
                h = this.planeIndices[e];
            return h >= 0 && (a = this.planes[h]), a
        }, this.getPointCloudImage = function() {
            var t = [
                    [0, 255, 0],
                    [255, 0, 0],
                    [0, 0, 255],
                    [0, 0, 0]
                ],
                i = document.createElement("canvas");
            i.width = this.imageWidth, i.height = this.imageHeight;
            for (var a, e, h, g, n, s = i.getContext("2d"), d = s.createImageData(this.imageWidth, this.imageHeight), o = 125, m = 0; m < this.imageHeight; m++)
                for (var r = 0; r < this.imageWidth; r++) n = 4 * (m * this.imageWidth + r), a = this.getPlaneByImagePosition(r, m), a ? (e = a.normal, h = Math.atan2(e[0], -e[2]), h = 0 > h ? h + 2 * Math.PI : h, g = t[Math.floor(2 * h / Math.PI)], d.data[n] = g[0], d.data[n + 1] = g[1], d.data[n + 2] = g[2], d.data[n + 3] = o) : (d.data[n] = 0, d.data[n + 1] = 0, d.data[n + 2] = 0, d.data[n + 3] = 0);
            s.putImageData(d, 0, 0);
            var u = new Image(this.imageWidth, this.imageHeight);
            return u.src = i.toDataURL("image/png"), u
        }
    };
    return t
});;
define("pano:widget/module/PanoModule/WebglRender/service/Service.js", function(n) {
    var e = n("pano:widget/module/PanoModule/WebglRender/util/Deferred.js"),
        o = function() {
            var n = document.body,
                o = window.jsonp = {};
            return function(t) {
                var a = new e,
                    r = document.createElement("script"),
                    d = "p" + Math.floor(1e8 * Math.random());
                return o[d] = function(e) {
                    n.removeChild(r), delete o[d], d = null, e ? a.resolve(e) : a.reject()
                }, t += "&fn=jsonp." + d, n.appendChild(r), r.src = t, a
            }
        }(),
        t = function(n) {
            var e = [];
            for (var o in n) e.push(o + "=" + n[o]);
            return e.join("&")
        },
        a = {
            url: "",
            udtVersion: "",
            loadPanoramaData: function(n) {
                var e = a.url + "?" + t({
                    qt: "sdata",
                    sid: n,
                    pc: 1,
                    auth: encodeURIComponent(window.AUTH) || "",
                    seckey: encodeURIComponent(window.SECKEY) || "",
                    udt: a.udtVersion
                });
                return o(e)
            },
            loadInnerPanoramaData: function(n) {
                var e = a.url + "?" + t({
                    qt: "idata",
                    iid: n,
                    pc: 1,
                    auth: encodeURIComponent(window.AUTH) || "",
                    seckey: encodeURIComponent(window.SECKEY) || "",
                    udt: a.udtVersion
                });
                return o(e)
            },
            loadPanoramaDataByMercator: function(n, e, r) {
                var d = a.url + "?" + t({
                    qt: "qsdata",
                    x: n,
                    y: e,
                    time: r.time,
                    mode: r.mode,
                    px: 100 * r.panoX,
                    py: 100 * r.panoY,
                    pz: 100 * r.panoZ,
                    roadid: r.roads[0].rid,
                    type: r.panoType,
                    action: 0,
                    pc: 1,
                    auth: encodeURIComponent(window.AUTH) || "",
                    seckey: encodeURIComponent(window.SECKEY) || "",
                    udt: a.udtVersion
                });
                return o(d)
            },
            loadPanoramaDataByPlane: function(n, e, r, d) {
                var i = a.url + "?" + t({
                    qt: "plane",
                    panox: d.panoX,
                    panoy: d.panoY,
                    panorx: d.rx,
                    panory: d.ry,
                    planex: n[0],
                    planey: n[2],
                    planerx: e[0],
                    planery: e[2],
                    dx: -r[0],
                    dy: -r[1],
                    dz: r[2],
                    pc: 1,
                    udt: a.udtVersion
                });
                return o(i)
            },
            loadNavigationRouteData: function(n, e, r, d) {
                var i = a.url + "?" + t(n) + "&" + t({
                    qt: "routePoints",
                    mx: e,
                    my: r,
                    mz: 100 * d,
                    regiondis: 200,
                    limitdis: 100,
                    st: -1,
                    et: -1,
                    drag: -1,
                    t: Date.now(),
                    udt: a.udtVersion
                });
                return o(encodeURI(i))
            },
            matchStreetviewByLocation: function(n, e, a, r, d) {
                var i = new Date,
                    u = u + "?" + t({
                        qt: "qsdata",
                        x: n,
                        y: e,
                        l: r || 15,
                        roadid: a,
                        action: 0,
                        time: d || "day",
                        auth: encodeURIComponent(window.AUTH) || "",
                        seckey: encodeURIComponent(window.SECKEY) || "",
                        t: i.getTime()
                    });
                return o(u)
            }
        };
    return a
});;
define("pano:widget/module/PanoModule/WebglRender/service/TextureManager.js", function(t) {
    var e = (t("pano:widget/module/PanoModule/WebglRender/config/ConstantConfig.js"), t("pano:widget/module/PanoModule/WebglRender/event/EventType.js")),
        i = 128,
        o = 2,
        n = 16,
        a = function(t, e) {
            this.waitingList = [], this.loadingList = [], this.cachedIds = [], this.cachedImages = [], this.cdnList = void 0 !== t ? t instanceof Array ? t : [t] : [], this.udtVersion = e || ""
        };
    return a.prototype = {
        constructor: a,
        loadThumbnail: function(t) {
            Four.Log.log("[TextureManager] Start load thumbnail."), this.loadingList = [], this.cachedIds = [], this.cachedImages = [];
            var e = "&sid=" + t + "&pos=0_0&z=1",
                i = this.getRandomCDN(),
                o = encodeURIComponent(window.AUTH) || "",
                n = encodeURIComponent(window.SECKEY) || "";
            i += "?qt=pdata" + e + "&udt=" + this.udtVersion + "&from=PC&auth=" + o + "&seckey=" + n, this.loadThumbnailCount = 0, this.loadImage(i, t, 0, 0, 1, e)
        },
        loadTile: function(t, i, o, a) {
            for (var d = "&sid=" + t + "&pos=" + o + "_" + i + "&z=" + a, s = this.cachedIds.length - 1; s >= 0; s--)
                if (d === this.cachedIds[s]) return void this.dispatchEvent({
                    type: e.LOAD_TILE_COMPLETED,
                    data: {
                        panoId: t,
                        tileX: i,
                        tileY: o,
                        level: a,
                        image: this.cachedImages[s]
                    }
                });
            for (s = this.loadingList.length - 1; s >= 0; s--)
                if (d === this.loadingList[s]) return;
            var r;
            for (s = this.waitingList.length - 1; s >= 0; s--)
                if (r = this.waitingList[s], r && d === r.id) return;
            if (n > this.loadingList.length) {
                this.loadingList.push(d);
                var h = this.getRandomCDN(),
                    l = encodeURIComponent(window.AUTH) || "",
                    g = encodeURIComponent(window.SECKEY) || "";
                h += "?qt=pdata" + d + "&udt=" + this.udtVersion + "&from=PC&auth=" + l + "&seckey=" + g, this.loadImage(h, t, i, o, a, d)
            } else this.waitingList.push({
                id: d,
                panoId: t,
                tileX: i,
                tileY: o,
                level: a
            })
        },
        loadImage: function(t, a, d, s, r, h) {
            function l(t) {
                for (var i = g.loadingList.length, o = i - 1; o >= 0; o--)
                    if (t === g.loadingList[o]) {
                        g.loadingList.splice(o, 1);
                        break
                    }
                for (var a; n > g.loadingList.length && 0 < g.waitingList.length;) a = g.waitingList.shift(), g.loadTile(a.panoId, a.tileX, a.tileY, a.level);
                0 === g.loadingList.length && g.dispatchEvent({
                    type: e.LOAD_TILE_QUEUE_COMPLETED
                })
            }
            var g = this,
                c = 1 === r,
                u = new Image;
            u.onload = function() {
                Four.Log.log("[TextureManager] Load image completed with url " + t), g.dispatchEvent({
                    type: c ? e.LOAD_THUMBNAIL_COMPLETED : e.LOAD_TILE_COMPLETED,
                    data: {
                        id: h,
                        panoId: a,
                        tileX: d,
                        tileY: s,
                        level: r,
                        image: u
                    }
                }), c || (g.cachedIds.push(h), g.cachedImages.push(u), i < g.cachedIds.length && (g.cachedIds.shift(), g.cachedImages.shift()), l(h))
            }, u.onerror = function() {
                return Four.Log.log("[TextureManager] Load image error with url " + t), c ? void(o > g.loadThumbnailCount ? (g.loadThumbnailCount++, u.src = t + "&random=" + (new Date).getTime()) : g.dispatchEvent({
                    type: e.LOAD_THUMBNAIL_FAILED,
                    data: {
                        id: h,
                        panoId: a
                    }
                })) : void l(h)
            }, u.crossOrigin = "Anonymous", u.id = h, u.src = t
        },
        getRandomCDN: function() {
            var t = this.cdnList.length;
            return this.cdnList[Math.floor(Math.random() * t)]
        },
        loadTopoTexture: function(t) {
            this.loadTopoImageCount = 0;
            var i = this,
                n = new Image;
            n.onload = function() {
                i.dispatchEvent({
                    type: e.LOAD_TOPO_TEXTURE_COMPLETED,
                    data: {
                        url: t,
                        image: n
                    }
                })
            }, n.onerror = function() {
                o > i.loadTopoImageCount ? (i.loadTopoImageCount++, n.src = t + "&random=" + (new Date).getTime()) : i.dispatchEvent({
                    type: e.LOAD_TOPO_TEXTURE_FAILED,
                    data: {
                        url: t
                    }
                })
            }, n.crossOrigin = "anonymous", n.src = t
        },
        dispose: function() {
            Four.Log.log("[TextureManager] dispose."), this.waitingList = [], this.loadingList = [], this.cdnList = [], this.cachedIds = [], this.cachedImages = []
        }
    }, Four.EventDispatcher.prototype.apply(a.prototype), a
});;
define("pano:widget/module/PanoModule/WebglRender/util/ES6Promise.js", function(t, n, e) {
    (function() {
        "use strict";

        function n(t) {
            return "function" == typeof t || "object" == typeof t && null !== t
        }

        function r(t) {
            return "function" == typeof t
        }

        function o(t) {
            return "object" == typeof t && null !== t
        }

        function i(t) {
            $ = t
        }

        function u(t) {
            G = t
        }

        function s() {
            var t = process.nextTick,
                n = process.versions.node.match(/^(?:(\d+)\.)?(?:(\d+)\.)?(\*|\d+)$/);
            return Array.isArray(n) && "0" === n[1] && "10" === n[2] && (t = setImmediate),
                function() {
                    t(p)
                }
        }

        function c() {
            return function() {
                U(p)
            }
        }

        function a() {
            var t = 0,
                n = new Q(p),
                e = document.createTextNode("");
            return n.observe(e, {
                    characterData: !0
                }),
                function() {
                    e.data = t = ++t % 2
                }
        }

        function f() {
            var t = new MessageChannel;
            return t.port1.onmessage = p,
                function() {
                    t.port2.postMessage(0)
                }
        }

        function l() {
            return function() {
                setTimeout(p, 1)
            }
        }

        function p() {
            for (var t = 0; B > t; t += 2) {
                var n = Z[t],
                    e = Z[t + 1];
                n(e), Z[t] = void 0, Z[t + 1] = void 0
            }
            B = 0
        }

        function _() {
            try {
                var n = t,
                    e = n("vertx");
                return U = e.runOnLoop || e.runOnContext, c()
            } catch (r) {
                return l()
            }
        }

        function h() {}

        function d() {
            return new TypeError("You cannot resolve a promise with itself")
        }

        function v() {
            return new TypeError("A promises callback cannot return that same promise.")
        }

        function y(t) {
            try {
                return t.then
            } catch (n) {
                return rn.error = n, rn
            }
        }

        function m(t, n, e, r) {
            try {
                t.call(n, e, r)
            } catch (o) {
                return o
            }
        }

        function b(t, n, e) {
            G(function(t) {
                var r = !1,
                    o = m(e, n, function(e) {
                        r || (r = !0, n !== e ? A(t, e) : j(t, e))
                    }, function(n) {
                        r || (r = !0, S(t, n))
                    }, "Settle: " + (t._label || " unknown promise"));
                !r && o && (r = !0, S(t, o))
            }, t)
        }

        function g(t, n) {
            n._state === nn ? j(t, n._result) : n._state === en ? S(t, n._result) : P(n, void 0, function(n) {
                A(t, n)
            }, function(n) {
                S(t, n)
            })
        }

        function w(t, n) {
            if (n.constructor === t.constructor) g(t, n);
            else {
                var e = y(n);
                e === rn ? S(t, rn.error) : void 0 === e ? j(t, n) : r(e) ? b(t, n, e) : j(t, n)
            }
        }

        function A(t, e) {
            t === e ? S(t, d()) : n(e) ? w(t, e) : j(t, e)
        }

        function E(t) {
            t._onerror && t._onerror(t._result), T(t)
        }

        function j(t, n) {
            t._state === tn && (t._result = n, t._state = nn, 0 !== t._subscribers.length && G(T, t))
        }

        function S(t, n) {
            t._state === tn && (t._state = en, t._result = n, G(E, t))
        }

        function P(t, n, e, r) {
            var o = t._subscribers,
                i = o.length;
            t._onerror = null, o[i] = n, o[i + nn] = e, o[i + en] = r, 0 === i && t._state && G(T, t)
        }

        function T(t) {
            var n = t._subscribers,
                e = t._state;
            if (0 !== n.length) {
                for (var r, o, i = t._result, u = 0; u < n.length; u += 3) r = n[u], o = n[u + e], r ? C(e, r, o, i) : o(i);
                t._subscribers.length = 0
            }
        }

        function M() {
            this.error = null
        }

        function x(t, n) {
            try {
                return t(n)
            } catch (e) {
                return on.error = e, on
            }
        }

        function C(t, n, e, o) {
            var i, u, s, c, a = r(e);
            if (a) {
                if (i = x(e, o), i === on ? (c = !0, u = i.error, i = null) : s = !0, n === i) return void S(n, v())
            } else i = o, s = !0;
            n._state !== tn || (a && s ? A(n, i) : c ? S(n, u) : t === nn ? j(n, i) : t === en && S(n, i))
        }

        function O(t, n) {
            try {
                n(function(n) {
                    A(t, n)
                }, function(n) {
                    S(t, n)
                })
            } catch (e) {
                S(t, e)
            }
        }

        function k(t, n) {
            var e = this;
            e._instanceConstructor = t, e.promise = new t(h), e._validateInput(n) ? (e._input = n, e.length = n.length, e._remaining = n.length, e._init(), 0 === e.length ? j(e.promise, e._result) : (e.length = e.length || 0, e._enumerate(), 0 === e._remaining && j(e.promise, e._result))) : S(e.promise, e._validationError())
        }

        function I(t) {
            return new un(this, t).promise
        }

        function Y(t) {
            function n(t) {
                A(o, t)
            }

            function e(t) {
                S(o, t)
            }
            var r = this,
                o = new r(h);
            if (!z(t)) return S(o, new TypeError("You must pass an array to race.")), o;
            for (var i = t.length, u = 0; o._state === tn && i > u; u++) P(r.resolve(t[u]), void 0, n, e);
            return o
        }

        function F(t) {
            var n = this;
            if (t && "object" == typeof t && t.constructor === n) return t;
            var e = new n(h);
            return A(e, t), e
        }

        function W(t) {
            var n = this,
                e = new n(h);
            return S(e, t), e
        }

        function D() {
            throw new TypeError("You must pass a resolver function as the first argument to the promise constructor")
        }

        function K() {
            throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.")
        }

        function L(t) {
            this._id = ln++, this._state = void 0, this._result = void 0, this._subscribers = [], h !== t && (r(t) || D(), this instanceof L || K(), O(this, t))
        }

        function N() {
            var t;
            if ("undefined" != typeof global) t = global;
            else if ("undefined" != typeof self) t = self;
            else try {
                t = Function("return this")()
            } catch (n) {
                throw new Error("polyfill failed because global object is unavailable in this environment")
            }
            var e = t.Promise;
            (!e || "[object Promise]" !== Object.prototype.toString.call(e.resolve()) || e.cast) && (t.Promise = pn)
        }
        var R;
        R = Array.isArray ? Array.isArray : function(t) {
            return "[object Array]" === Object.prototype.toString.call(t)
        };
        var U, $, q, z = R,
            B = 0,
            G = ({}.toString, function(t, n) {
                Z[B] = t, Z[B + 1] = n, B += 2, 2 === B && ($ ? $(p) : q())
            }),
            H = "undefined" != typeof window ? window : void 0,
            J = H || {},
            Q = J.MutationObserver || J.WebKitMutationObserver,
            V = "undefined" != typeof process && "[object process]" === {}.toString.call(process),
            X = "undefined" != typeof Uint8ClampedArray && "undefined" != typeof importScripts && "undefined" != typeof MessageChannel,
            Z = new Array(1e3);
        q = V ? s() : Q ? a() : X ? f() : void 0 === H && "function" == typeof t ? _() : l();
        var tn = void 0,
            nn = 1,
            en = 2,
            rn = new M,
            on = new M;
        k.prototype._validateInput = function(t) {
            return z(t)
        }, k.prototype._validationError = function() {
            return new Error("Array Methods must be provided an Array")
        }, k.prototype._init = function() {
            this._result = new Array(this.length)
        };
        var un = k;
        k.prototype._enumerate = function() {
            for (var t = this, n = t.length, e = t.promise, r = t._input, o = 0; e._state === tn && n > o; o++) t._eachEntry(r[o], o)
        }, k.prototype._eachEntry = function(t, n) {
            var e = this,
                r = e._instanceConstructor;
            o(t) ? t.constructor === r && t._state !== tn ? (t._onerror = null, e._settledAt(t._state, n, t._result)) : e._willSettleAt(r.resolve(t), n) : (e._remaining--, e._result[n] = t)
        }, k.prototype._settledAt = function(t, n, e) {
            var r = this,
                o = r.promise;
            o._state === tn && (r._remaining--, t === en ? S(o, e) : r._result[n] = e), 0 === r._remaining && j(o, r._result)
        }, k.prototype._willSettleAt = function(t, n) {
            var e = this;
            P(t, void 0, function(t) {
                e._settledAt(nn, n, t)
            }, function(t) {
                e._settledAt(en, n, t)
            })
        };
        var sn = I,
            cn = Y,
            an = F,
            fn = W,
            ln = 0,
            pn = L;
        L.all = sn, L.race = cn, L.resolve = an, L.reject = fn, L._setScheduler = i, L._setAsap = u, L._asap = G, L.prototype = {
            constructor: L,
            then: function(t, n) {
                var e = this,
                    r = e._state;
                if (r === nn && !t || r === en && !n) return this;
                var o = new this.constructor(h),
                    i = e._result;
                if (r) {
                    var u = arguments[r - 1];
                    G(function() {
                        C(r, o, u, i)
                    })
                } else P(e, o, t, n);
                return o
            },
            "catch": function(t) {
                return this.then(null, t)
            }
        };
        var _n = N,
            hn = {
                Promise: pn,
                polyfill: _n
            };
        "function" == typeof define && define.amd ? define(function() {
            return hn
        }) : "undefined" != typeof e && e.exports ? e.exports = hn : "undefined" != typeof this && (this.ES6Promise = hn), _n()
    }).call(this)
});;
define("pano:widget/module/PanoModule/WebglRender/util/Deferred.js", function(e) {
    var n = (e("pano:widget/module/PanoModule/WebglRender/util/ES6Promise.js"), 1),
        t = 2,
        i = function() {
            var e = this,
                i = 0;
            this.resolve = function() {}, this.reject = function() {}, this.promise = new window.Promise(function(o, r) {
                e.resolve = function() {
                    0 === i && (i = n, o.apply(null, arguments))
                }, e.reject = function() {
                    0 === i && (i = t, r.apply(null, arguments))
                }, e.resolveWith = function(e, t) {
                    0 === i && (i = n, o.apply(e, t))
                }, e.rejectWith = function(e, n) {
                    0 === i && (i = t, r.apply(e, n))
                }
            }), this.then = function(e, n) {
                return this.promise.then(e, n)
            }, this.isResolved = function() {
                return i === n
            }, this.isRejected = function() {
                return i === t
            }
        };
    return i
});;
define("pano:widget/module/PanoModule/WebglRender/util/Util.js", function() {
    var n = function() {};
    return n.getMin = function(n) {
        for (var e, t = Number.MAX_VALUE, r = n.length - 1; r >= 0; r--) e = n[r], t > e && (t = e);
        return t
    }, n.getMax = function(n) {
        for (var e, t = -Number.MAX_VALUE, r = n.length - 1; r >= 0; r--) e = n[r], e > t && (t = e);
        return t
    }, n.getMinAndMax = function(n) {
        for (var e, t = Number.MAX_VALUE, r = -Number.MAX_VALUE, a = n.length - 1; a >= 0; a--) e = n[a], t > e && (t = e), e > r && (r = e);
        return {
            min: t,
            max: r
        }
    }, n.getHeadingInPlane = function(n, e) {
        var t = 180 * Math.atan2(e[0] - n[0], e[1] - n[1]) / Math.PI;
        return t = 0 > t ? t + 360 : t
    }, n.getDistanceInPlane = function(n, e) {
        var t = e[0] - n[0],
            r = e[1] - n[1];
        return Math.sqrt(t * t + r * r)
    }, n.getHeadingPitchChange = function() {
        return {}
    }, n.getFixedDecimal = function(n, e) {
        return void 0 === e || 0 >= e ? n : parseInt(n * Math.pow(10, e), 10) / Math.pow(10, e)
    }, n.indexOf = function(n, e) {
        var t = -1;
        if (n && n.length > 0)
            for (var r = 0, a = n.length; a > r; r++)
                if (e === n[r]) {
                    t = r;
                    break
                }
        return t
    }, n
});;
define("pano:widget/module/PanoModule/WebglRender/util/DataParser.js", function(e) {
    var o = e("pano:widget/module/PanoModule/WebglRender/model/RegionVO.js"),
        r = e("pano:widget/module/PanoModule/WebglRender/lib/base64.js"),
        a = e("pano:widget/module/PanoModule/WebglRender/lib/DataStream.js"),
        n = e("pano:widget/module/PanoModule/WebglRender/lib/inflate.js"),
        t = e("pano:widget/module/PanoModule/WebglRender/model/PanoramaData.js"),
        i = e("pano:widget/module/PanoModule/WebglRender/model/RoadData.js"),
        d = e("pano:widget/module/PanoModule/WebglRender/model/PointCloudData.js"),
        s = e("pano:widget/module/PanoModule/WebglRender/config/ConstantConfig.js"),
        l = {
            parseSData: function(e) {
                if (void 0 === e) throw "Get none from server";
                var r = e.result;
                if (void 0 !== r && 0 !== r.error) throw "Get error from server";
                var a = e.content;
                if (void 0 === a || 0 === a.length || void 0 === a[0]) throw "Get empty data from server";
                var n, i, d = 0,
                    l = a[0],
                    p = new t;
                if (p.panoId = l.ID, l.Inters instanceof Array) {
                    var v = l.Inters[0];
                    void 0 !== v && (p.iid = v.IID)
                }
                p.panoType = l.Type, p.panoX = l.X / 100, p.panoY = l.Y / 100, p.panoZ = l.Z / 100, p.rx = l.RX / 100, p.ry = l.RY / 100, p.rz = l.RZ / 100, p.lx = l.LX / 100, p.ly = l.LY / 100, p.moveDir = void 0 !== l.MoveDir ? l.MoveDir : -30, p.heading = void 0 !== l.Heading ? l.Heading : 270 - l.NorthDir, p.pitch = l.Pitch;
                var m = l.Roll;
                void 0 !== m && (p.roll = m > 90 || -90 > m ? 0 : m), p.deviceHeight = l.DeviceHeight, p.date = l.Date || p.date, p.time = l.Time, p.provider = void 0 !== l.Provider ? l.Provider : p.provider, p.admission = l.Admission || p.admission, p.roadName = l.Rname;
                var g = [];
                if (l.Roads) {
                    var u = l.Roads;
                    for (d = 0, n = u.length; n > d; d++) {
                        i = u[d];
                        var f = this.parseRoadData(i);
                        p.roads.push(f), g[i.ID] = i.Name
                    }
                }
                if (l.Links) {
                    var I = l.Links;
                    for (d = 0, n = I.length; n > d; d++) i = I[d], i.RoadName = g[i.RID], p.vpoints.push(this.parsePointData(i))
                }
                p.mode = l.Mode;
                var h = l.SwitchID;
                if (void 0 !== h && 0 < h.length && s.TYPE_STREET === p.panoType) {
                    var P;
                    for (d = 0, n = h.length; n > d; d++) P = h[d], p.dayNightPanos.push({
                        panoId: P.ID,
                        type: P.Time
                    })
                }
                if (p.username = void 0 !== l.Username ? l.Username : "", void 0 !== l.ImgVmax && (p.imgVmax = l.ImgVmax), void 0 !== l.ImgVmin && (p.imgVmin = l.ImgVmin), l.plane && l.plane.length > 0 && (p.pointCloudData = this.parsePointCloudData(l.plane)), l.Region && l.Region.REG_VEC) {
                    var D = l.Region.REG_VEC;
                    p.regions = [];
                    for (var d = 0, c = D.length; c > d; d++) {
                        var R = D[d];
                        if (R.SKETCH_VEC) {
                            var w = new o;
                            w.type = R.TYPE, w.panoId = R.PANO_ID, w.panoX = R.PANO_X || R.Pano_X || p.panoX || 0, w.panoY = R.PANO_Y || R.Pano_Y || p.panoY || 0, w.info = R.INFO, w.id = R.IMAGE_ID, w.desc = R.DESC, w.image = R.IMAGE, w.sound = R.SOUND, w.setPoints(R.SKETCH_VEC), w.regionid = R.REG_ID, w.url = R.URL, R.POI_INFO && w.setpoivo(R.POI_INFO), p.regions.push(w)
                        }
                    }
                }
                if (l.VPoint)
                    for (var y = l.VPoint, d = 0, c = y.length; c > d; d++) p.nearPoints.push(this.parsePointData(y[d]));
                if (p.photos = l.Photos, p.imgLayers = [], p.maxImgLevel = null, l.ImgLayer && l.ImgLayer.length > 0) {
                    for (var x = l.ImgLayer, Y = 0, d = 0, N = x.length; N > d; d++) {
                        var X = {};
                        X.blockX = x[d].BlockX, X.blockY = x[d].BlockY, X.imgLevel = x[d].ImgLevel + 1, p.imgLayers[X.imgLevel] = X, X.imgLevel > Y && (Y = X.imgLevel)
                    }
                    p.maxImgLevel = Y
                }
                return p
            },
            parsePointCloudData: function(e) {
                var o = r.decodeArrayBuffer(e),
                    t = n.inflate(o),
                    i = new a(t.buffer, 0, a.LITTLE_ENDIAN),
                    s = (i.readInt32(), i.readInt32()),
                    l = i.readInt32(),
                    p = i.readInt32(),
                    v = i.readUint16(),
                    m = i.readUint16(),
                    g = i.readUint16(),
                    u = i.readUint16(),
                    f = i.readUint16(),
                    I = !1,
                    h = g + u;
                i.position = s;
                var P, D, c, R, w, y, x = i.readInt16Array(v * m),
                    Y = 0,
                    N = [];
                for (i.position = l; h > Y;) y = Math.max(i.readFloat32(), 1), P = i.readFloat32(), D = -i.readFloat32(), c = -i.readFloat32(), R = i.readInt32(), w = i.readInt32(), N[Y] = {
                    normal: [P, D, c],
                    depth: y,
                    nameIndex: R,
                    planeIndex: Y,
                    type: w
                }, w && (I = !0), Y++;
                i.position = p;
                for (var X = 0, L = []; f > X;) {
                    var C = i.readInt32(),
                        E = i.readString(C, "UTF-8");
                    L.push(E), X++
                }
                for (var F = 0; h > F;) e = N[F], e.nameIndex >= 0 && (e.name = L[e.nameIndex]), F++;
                var G = new d;
                return G.imageWidth = v, G.imageHeight = m, G.planeIndices = x, G.planes = N, G.names = L, G.hasGroupPointCloud = I, G
            },
            parseRoadData: function(e) {
                var o = new i;
                if (o.rid = e.ID, o.roadName = e.Name, o.roadWidth = void 0 !== e.Width ? e.Width / 100 : 0, o.isCurrentRoad = e.IsCurrent || 0, e.Panos)
                    for (var r = e.Panos, a = 0, n = r.length; n > a; a++) o.pointList.push(this.parsePointData(r[a]));
                return o
            },
            parsePointData: function(e) {
                var o = {};
                return o.panoId = e.PID, o.panoType = e.Type, o.rid = e.RID, o.dir = e.DIR, o.roadName = e.RoadName, o.order = e.Order, o.panoX = e.X / 100, o.panoY = e.Y / 100, void 0 !== e.CPointX && !1 !== e.CPointY && (o.cPoint = {
                    x: e.CPointX / 100,
                    y: e.CPointY / 100
                }), o
            },
            parseIData: function(e, o, r) {
                if (0 !== e.result.error || void 0 === e.content || 0 === e.content.length) throw "request error";
                var a = e.content[0].interinfo,
                    n = {};
                n.iid = a.IID, n.uid = a.UID, n.name = a.Name, n.vpRank = a.VPrank, n.vpPoint = a.VPpoint, n.startPanoId = o, n.enterUid = r, n.entrances = a.Entrances, n.exitPanoId = a.BreakID, n.exitX = a.BreakX / 100, n.exitY = a.BreakY / 100, n.defaultFloorId = a.Defaultfloor, n.floors = [];
                var t = void 0 !== a.HasImg ? a.HasImg : 1;
                if (a.Floors) {
                    var i = a.Floors;
                    i.sort(function(e, o) {
                        return e.Floor > o.Floor
                    });
                    for (var d, s = 0, l = i.length; l > s; s++) d = this.parseFloorData(n.iid, n.uid, n.exitPid, n.exitX, n.exitY, t, i[s]), n.floors.push(d);
                    n.rawFloorData = i
                }
                return n
            },
            parseFloorData: function(e, o, r, a, n, t, i) {
                var d = {};
                d.id = i.Floor, d.iid = e, d.uid = o, d.name = i.Name, d.defaultPanoId = i.StartID, d.dir = 360 - i.NorthDir, d.exitPanoId = r || "", d.exitX = a || 0, d.exitY = n || 0, d.hasImage = t || 1, d.scale = i.Scale, d.imgWidth = i.ImgWidth, d.imgHeight = i.ImgHeight, d.tlPoint = {
                    x: i.LTpoint.X,
                    y: i.LTpoint.Y
                }, d.innerPanos = [];
                for (var s, l = i.Points, p = 0, v = l.length; v > p; p++) s = this.parseFloorInnerPanoData(l[p]), d.innerPanos.push(s);
                return d
            },
            parseFloorInnerPanoData: function(e) {
                var o = {};
                return o.panoId = e.PID, o.panoX = e.X / 100, o.panoY = e.Y / 100, o.panoZ = e.rank / 100, o.roadName = e.name, o
            },
            parseQSData: function(e) {
                if (void 0 === e) throw "Get none from server";
                var o = e.result;
                if (void 0 !== o && 0 !== o.error) throw "Get error from server";
                var r = e.content;
                if (void 0 === r) throw "Get empty data from server";
                return {
                    panoId: r.id,
                    panoX: r.x / 100,
                    panoY: r.y / 100
                }
            },
            parsePlaneData: function(e) {
                if (void 0 === e) throw "Get none from server";
                var o = e.result;
                if (void 0 !== o && 0 !== o.error) throw "Get error from server";
                var r = e.content;
                if (void 0 === r) throw "Get empty data from server";
                return {
                    panoId: r.pid,
                    panoX: r.x / 100,
                    panoY: r.y / 100
                }
            },
            parseNavigationRouteData: function(e) {
                if (void 0 === e) throw "Get none from server";
                var o = e.result;
                if (void 0 !== o && 0 !== o.error) {
                    if (-3 === o.error) return -3;
                    throw "Get error from server"
                }
                var r = e.content;
                if (void 0 === r) throw "Get empty data from server";
                for (var a, n = r.points || [], t = [], i = 0, d = n.length; d > i; i++) a = n[i], a && t.push([a.panox / 100, a.panoy / 100]);
                return t
            }
        };
    return l
});;
define("pano:widget/module/PanoModule/WebglRender/widget/marker/ui/MarkerUI.js", function(e) {
    function t(e, t, a, n) {
        t.addEventListener("click", function() {
            n.dispatchEvent({
                type: s.MARKER_CLICKED,
                data: a
            })
        }), e.style.overflow = "", t.className = "marker_common_background_normal", t.style.border = "none", e.appendChild(t);
        var i = a.catalog.slice(2);
        if ("01" !== i) {
            var o = document.createElement("div");
            self.icon = o, t.appendChild(o);
            var r = "";
            r = "marker_icon_FA" + i, o.className = r
        }
        var d = document.createElement("div");
        t.appendChild(d);
        var c = "marker_title_label";
        d.innerHTML = a.title, d.className = c;
        var l = document.createElement("div");
        l.addEventListener("click", function() {
            n.dispatchEvent({
                type: s.MARKER_CLICKED,
                data: a
            })
        }), e.appendChild(l);
        var m, u;
        "01" === i ? (m = function() {
            t.style.outline = "1px solid #33aaff", l.style.backgroundPosition = "-245px -36px"
        }, u = function() {
            t.style.outline = "none", l.style.backgroundPosition = "-245px -82px"
        }, l.className = "marker_commercialize_topu_mark", baidu(t).on("mouseover", m), baidu(l).on("mouseover", m), baidu(t).on("mouseout", u), baidu(l).on("mouseout", u)) : (m = function() {
            t.style.outline = "1px solid #33aaff", l.style.backgroundPosition = "-212px -82px"
        }, u = function() {
            t.style.outline = "none", l.style.backgroundPosition = "-184px -82px"
        }, l.className = "marker_commercialize_mark", baidu(t).on("mouseover", m), baidu(l).on("mouseover", m), baidu(t).on("mouseout", u), baidu(l).on("mouseout", u))
    }

    function a(e, t, a, n) {
        t.addEventListener("click", function() {
            n.dispatchEvent({
                type: s.MARKER_CLICKED,
                data: a
            })
        });
        var r = "marker_common_background_normal",
            d = "marker_common_background_hover";
        t.className = r, e.appendChild(t);
        var c = document.createElement("div");
        self.icon = c, t.appendChild(c);
        var l = "marker_icon_default",
            m = "";
        c.className = l;
        var u = document.createElement("div");
        t.appendChild(u);
        var p = "marker_title_label";
        if (u.innerHTML = a.title, u.className = p, 3 === a.type) m = "marker_icon_01" + a.catalog.slice(2), c.className = l + " " + m;
        else if (2 === a.type) m = "marker_icon_" + a.catalog.slice(0, 4), c.className = l + " " + m, i(e, a);
        else if (0 === a.type) {
            m = "marker_icon_" + a.catalog.slice(0, 2) + a.catalog.slice(4), c.className = l + " " + m;
            var v = document.createElement("div");
            e.appendChild(v);
            var h = "marker_bottom_" + a.catalog.slice(0, 2) + a.catalog.slice(4);
            v.className = h
        } else 1 === a.type && (m = "marker_icon_" + a.catalog, c.className = l + " " + m);
        a.isInBestPano || o(a, t), t.addEventListener("mouseover", function() {
            t.className = d
        }), t.addEventListener("mouseout", function() {
            t.className = r
        })
    }

    function n(e, t, a, n) {
        t.style.cssText = ["white-space: nowrap"].join(";"), e.appendChild(t);
        var r = document.createElement("div");
        self.icon = r, t.appendChild(r);
        var d = "marker_entrance_left_background_normal",
            c = "marker_entrance_left_background_hover";
        r.className = d, r.addEventListener("click", function() {
            !0 === n.getMouseEnabled() && (n.dispatchEvent({
                type: s.ENTRANCE_MARKER_CLICKED,
                data: a
            }), MapLogReport.send({
                da_src: "pcmapPanoPG.picInter.click",
                clickType: "ENTRANCE_MARKER_CLICKED"
            }))
        });
        var l = document.createElement("div"),
            m = "marker_entrance_right_background_normal",
            u = "marker_entrance_right_background_hover";
        l.className = m, t.appendChild(l), l.addEventListener("click", function() {
            !0 === n.getMouseEnabled() && (n.dispatchEvent({
                type: s.MARKER_CLICKED,
                data: a
            }), MapLogReport.send({
                da_src: "pcmapPanoPG.picInter.click",
                clickType: "MARKER_CLICKED"
            }))
        });
        var p = document.createElement("div");
        l.appendChild(p);
        var v = "marker_title_label";
        p.innerHTML = a.title, p.className = v, 2 === a.type && i(e, a), a.isInBestPano || o(a, l), r.addEventListener("mouseover", function() {
            !0 === n.getMouseEnabled() && (r.className = c)
        }), r.addEventListener("mouseout", function() {
            !0 === n.getMouseEnabled() && (r.className = d)
        }), l.addEventListener("mouseover", function() {
            !0 === n.getMouseEnabled() && (l.className = u)
        }), l.addEventListener("mouseout", function() {
            !0 === n.getMouseEnabled() && (l.className = m)
        })
    }

    function i(e, t) {
        var a = document.createElement("div");
        e.appendChild(a);
        var n = "marker_bottom_mark";
        a.className = n, markerLabel = document.createElement("div"), a.appendChild(markerLabel);
        var i = "marker_bottom_mark_label";
        markerLabel.className = i;
        var o = "";
        parseInt(t.index) >= 0 && (o = String.fromCharCode(parseInt(t.index) + 65)), markerLabel.innerHTML = o
    }

    function o(e, t) {
        var a = document.createElement("div");
        t.appendChild(a);
        var n = "marker_separator";
        a.className = n;
        var i = document.createElement("div");
        t.appendChild(i);
        var o = "marker_distance_label",
            r = e.distance,
            d = "";
        d = 1e3 > r ? r + "米" : (r / 1e3).toFixed(1) + "公里", i.innerHTML = d, i.className = o
    }

    function r(e, t, a) {
        var n = "marker_common_background_normal";
        t.className = n, e.appendChild(t);
        var i = document.createElement("div");
        t.appendChild(i);
        var o = "marker_title_label";
        i.innerHTML = a.title, i.className = o, t.addEventListener("click", function() {
            dispatcher.dispatchEvent({
                type: s.OVERLAY_MOUSECLICK,
                data: {
                    id: a.uid,
                    markerId: a.markerId,
                    viewBounds: void 0
                }
            })
        })
    }

    function d(e, t, a, n) {
        a.isEditable && c(e, t, a, n)
    }

    function c(e, t, a, n) {
        var i = "marker_tag_background_normal";
        t.className = i, e.appendChild(t);
        var o = document.createElement("div");
        e.appendChild(o);
        var r = "marker_tag_bottom_mark";
        o.className = r, o.addEventListener("click", function(e) {
            var t = a || {};
            t.screenX = e.clientX, t.screenY = e.clientY, n.dispatchEvent({
                type: s.OVERLAY_MOUSECLICK,
                data: t
            })
        }), t.addEventListener("click", function() {
            n.dispatchEvent({
                type: s.OVERLAY_MOUSECLICK,
                data: {
                    markerId: a.markerId,
                    x: a.mercatorX,
                    y: a.rank,
                    z: a.mercatorY
                }
            })
        })
    }
    var s = (e("pano:widget/base/service.js"), e("pano:widget/module/PanoModule/WebglRender/event/EventType.js")),
        l = window.Four,
        m = (l.EventDispatcher, l.Log, function(e) {
            var i = document.createElement("div");
            i.style.cssText = ["overflow:hidden", "position:absolute", "top:0", "left:0"].join(";");
            var o = this,
                c = document.createElement("div"),
                l = void 0,
                m = void 0,
                u = !0;
            i.addEventListener("mousedown", function(e) {
                !0 === u && e.stopPropagation()
            }), 1 === e.type ? e.distance <= 200 && e.distance >= 0 && a(i, c, e, o) : 2 === e.type ? e.distance <= 1e3 && e.distance >= 0 && (e.iid && (2 === e.type || e.isInBestPano) ? n(i, c, e, o) : a(i, c, e, o)) : 3 === e.type ? e.iid && e.isInBestPano ? n(i, c, e, o) : a(i, c, e, o) : 4 === e.type ? r(i, c, e) : 5 === e.type || (6 === e.type ? d(i, c, e, o) : 7 === e.type ? t(i, c, e, o) : a(i, c, e, o)), c.addEventListener("mouseover", function() {
                var t = {
                    id: e.uid,
                    x: e.mercatorX,
                    y: e.mercatorY
                };
                4 === e.type && (t.viewBounds = void 0), o.dispatchEvent({
                    type: s.OVERLAY_MOUSEOVER,
                    data: t
                })
            }), c.addEventListener("mouseout", function() {
                var t = {
                    id: e.uid,
                    markerId: e.markerId
                };
                4 === e.type && (t.viewBounds = void 0), o.dispatchEvent({
                    type: s.OVERLAY_MOUSEOUT,
                    data: t
                })
            }), this.hideMarker = function() {
                i.style.display = "none"
            }, this.showMarker = function() {
                i.style.display = "block"
            }, this.setPosition = function(t) {
                t && 2 === t.length ? (i.style.top = 6 == e.type ? "ActiveXObject" in window ? t[1] - this.getHeight() + 11 + "px" : t[1] - this.getHeight() + 7 + "px" : t[1] - .5 * this.getPanelHeight() + "px", i.style.left = "ActiveXObject" in window ? t[0] - .5 * this.getWidth() + 12 + "px" : t[0] - .5 * this.getWidth() + "px") : i.style.display = "none"
            }, this.getDomNode = function() {
                return i
            }, this.getWidth = function() {
                return m || (m = i.clientWidth), m
            }, this.getHeight = function() {
                return l || (l = i.clientHeight), l
            }, this.getIconWidth = function() {
                return this.icon ? this.icon.clientWidth : 0
            }, this.getPanelHeight = function() {
                return c.clientHeight
            }, this.setMouseEnabled = function(e) {
                u = e, this.setMouseStyle(0 == u ? 0 : 1)
            }, this.getMouseEnabled = function() {
                return u
            }, this.setMouseStyle = function(e) {
                if (0 == e) {
                    for (var t = 0; t < c.childNodes.length; t++) c.childNodes[t].style.cursor = "url(//webmap0.bdimg.com/wolfman/static/pano/images/webgl/poi_icon_tag_daba495.png) 13 37, auto";
                    for (var t = 0; t < i.childNodes.length; t++) i.childNodes[t].style.cursor = "url(//webmap0.bdimg.com/wolfman/static/pano/images/webgl/poi_icon_tag_daba495.png) 13 37, auto"
                } else if (1 == e) {
                    for (var t = 0; t < c.childNodes.length; t++) c.childNodes[t].style.cursor = "default";
                    for (var t = 0; t < i.childNodes.length; t++) i.childNodes[t].style.cursor = "default"
                } else if (2 == e) {
                    for (var t = 0; t < c.childNodes.length; t++) c.childNodes[t].style.cursor = "pointer";
                    for (var t = 0; t < i.childNodes.length; t++) i.childNodes[t].style.cursor = "default"
                }
            }
        });
    return m.prototype = {}, m.prototype.constructor = m, l.EventDispatcher.prototype.apply(m.prototype), m
});;
define("pano:widget/module/PanoModule/WebglRender/widget/marker/Marker.js", function(e) {
    var t = e("pano:widget/module/PanoModule/WebglRender/event/EventType.js"),
        n = e("pano:widget/module/PanoModule/WebglRender/widget/marker/ui/MarkerUI.js"),
        i = window.Four,
        r = i.EventDispatcher,
        o = function(e) {
            function i(e) {
                d.dispatchEvent(e)
            }
            var r = e,
                o = new n(r);
            o.addEventListener(t.MARKER_CLICKED, i), o.addEventListener(t.ENTRANCE_MARKER_CLICKED, i), o.addEventListener(t.TAG_MARKER_SUBMIT, i), o.addEventListener(t.TAG_MARKER_CLOSE, i), o.addEventListener(t.OVERLAY_MOUSECLICK, i), o.addEventListener(t.OVERLAY_MOUSEOVER, i), o.addEventListener(t.OVERLAY_MOUSEOUT, i), o.addEventListener(t.TAG_MARKER_FOCUS, i), o.addEventListener(t.TAG_MARKER_BLUR, i), o.addEventListener(t.TAG_MARKER_CANCEL, i);
            var d = this;
            this.diffusedSpherePoint = void 0, this.originalSpherePoint = void 0, this.getMarkerData = function() {
                return e
            }, this.getMarkerUI = function() {
                return o
            }, this.setPosition = function(e) {
                o.setPosition(e)
            }, this.getMarkerUIDomNode = function() {
                return o.getDomNode()
            }, this.getUIWidth = function() {
                return o.getWidth()
            }, this.getUIHeight = function() {
                return o.getHeight()
            }, this.getIconWidth = function() {
                return o.getIconWidth()
            }, this.getUIPanelHeight = function() {
                return o.getPanelHeight()
            }, this.getUICenter = function() {}, this.hideMarker = function() {
                o.hideMarker()
            }, this.showMarker = function() {
                o.showMarker()
            }, this.getTagMarkerIsEdit = function() {
                return o.getTagMarkerIsEdit()
            }, this.setMouseEnabled = function(e) {
                o.setMouseEnabled(e)
            }, this.setMouseStyle = function(e) {
                o.setMouseStyle(e)
            }
        };
    return o.prototype = {}, o.prototype.constructor = o, r.prototype.apply(o.prototype), o
});;
define("pano:widget/module/PanoModule/WebglRender/widget/TopoArrowGeometry.js", function() {
    var e = function(e, t) {
        Four.geometry.Geometry.call(this);
        var r = -128,
            o = 0,
            n = -336,
            a = .009;
        e = e || 0, e >= 4 && (o = -20), o *= a;
        var i, s = -8 * a,
            f = 1 * a,
            u = 512,
            g = 512,
            l = 256,
            h = 256,
            c = 128 / u,
            v = 7 / g,
            w = 8 / u,
            y = 52 / u,
            m = 205 / u,
            d = 252 / u,
            p = 138 / g,
            F = 47 / u,
            B = 213 / u,
            D = 238 / g,
            T = [c, 1 - v, w, 1 - p, d, 1 - p, y, 1 - p, m, 1 - p, F, 1 - D, B, 1 - D],
            R = [],
            A = .5 * T.length;
        for (i = 0; A > i; i++) R[i] = [T[2 * i] * u + r, o, (1 - T[2 * i + 1]) * g + n];
        var C = l / u;
        A = T.length;
        var x = [];
        for (i = 0; A > i;) x[i] = T[i] + C, x[i + 1] = T[i + 1], i += 2;
        A = R.length;
        var G, U = [];
        for (i = 0; A > i; i++) G = R[i], U[i] = [G[0], G[1] + s, G[2]];
        var b = .25 * l,
            j = .5 * h,
            I = b / u,
            M = j / g,
            N = .5 * (l - b),
            O = N + b,
            P = h - 30,
            W = P - j,
            Y = [
                [O + r, o + f, W + n],
                [N + r, o + f, W + n],
                [N + r, o + f, P + n],
                [O + r, o + f, P + n]
            ];
        fontRow = parseInt(e / 4), fontColumn = e - 4 * fontRow;
        var k = 1 - h / g,
            q = [I * (fontColumn + 1), k - M * fontRow, I * fontColumn, k - M * fontRow, I * fontColumn, k - M * (fontRow + 1), I * (fontColumn + 1), k - M * (fontRow + 1)];
        this.vertices = U.concat(R, Y);
        var z = x.concat(T, q);
        this.uvtsBufferData = new Float32Array(z), this.triangles.push(new Four.geometry.Triangle([0, 1, 2]), new Four.geometry.Triangle([4, 3, 6]), new Four.geometry.Triangle([3, 5, 6]), new Four.geometry.Triangle([7, 8, 9]), new Four.geometry.Triangle([11, 10, 13]), new Four.geometry.Triangle([10, 12, 13]), new Four.geometry.Triangle([14, 15, 17]), new Four.geometry.Triangle([15, 16, 17]));
        var E = this.vertices.length;
        this.verticesBufferData = new Float32Array(3 * E), this.indicesBufferData = new(E > 65535 ? Uint32Array : Uint16Array)(3 * this.triangles.length);
        var H, J = 0;
        for (i = 0; E > i; i++) H = this.vertices[i], H[0] *= a, H[2] *= a, this.verticesBufferData[J] = H[0], this.verticesBufferData[J + 1] = H[1], this.verticesBufferData[J + 2] = H[2], J += 3;
        A = this.triangles.length;
        var K, L = 0;
        for (i = 0; A > i; i++) K = this.triangles[i], this.indicesBufferData[L] = K.index1, this.indicesBufferData[L + 1] = K.index2, this.indicesBufferData[L + 2] = K.index3, L += 3;
        this.deltaY = t, this.scale = a, this.groupsNeedUpdate = !0
    };
    return e.prototype = Object.create(Four.geometry.Geometry.prototype), e.prototype.constructor = e, e
});;
define("pano:widget/module/PanoModule/WebglRender/widget/RoadArrow.js", function(e) {
    var t = e("pano:widget/module/PanoModule/WebglRender/component/ThreeDDisplayObject.js"),
        o = e("pano:widget/module/PanoModule/WebglRender/widget/TopoArrowGeometry.js"),
        i = e("pano:widget/module/PanoModule/WebglRender/core/ShaderSet.js"),
        r = e("pano:widget/module/PanoModule/WebglRender/config/ConfigurationOptions.js"),
        s = window.Four,
        a = s.GLMatrix.vec3,
        d = s.GLMatrix.mat4,
        n = function(e) {
            t.call(this);
            var n = s.Tool.degreeNormalized(e.topoDir);
            this.type = n > 22.5 && 67.5 >= n ? 4 : n > 67.5 && 112.5 >= n ? 1 : n > 112.5 && 157.5 >= n ? 5 : n > 157.5 && 202.5 >= n ? 2 : n > 202.5 && 247.5 >= n ? 6 : n > 247.5 && 292.5 >= n ? 3 : n > 292.5 && 337.5 >= n ? 7 : 0, this.panoData = e, this.isHover = !1;
            var l = new o(this.type, s.Tool.degToRad(n)),
                h = new s.material.Material;
            h.depthTest = !1, h.uniforms = {
                uSampler: {
                    type: "t",
                    value: void 0
                },
                uOpacity: {
                    type: "1f",
                    value: 1
                }
            }, !0 === r.debug.shader && (h.uniforms.showDebugLine = {
                type: "1i",
                value: !1
            }, h.uniforms.vColor = {
                type: "4f",
                value: [1, 0, 0, .8]
            }), h.vertexShader = i.uvVertexShader, h.fragmentShader = i.textureFragmentShader, this.mesh = new s.Mesh(l, h), this.mesh.rotateY(-l.deltaY), this.mesh.scale = [3, 3, 3];
            var u = d.create();
            this.setArrowTexture = function(e) {
                var t = this.mesh.material;
                t.uniforms.uSampler.value = e
            }, this.setPosition = function(e, t, o, i) {
                var r = [e + i * Math.sin(l.deltaY), t, o - i * Math.cos(l.deltaY)];
                d.identity(u);
                var s = a.create();
                a.cross(s, r, [0, 1, 0]), d.rotate(u, u, 10 / 180 * Math.PI, s), d.rotateY(u, u, -l.deltaY), this.mesh.rotation = u, this.mesh.position = r
            }, this.setRotateY = function() {}, this.getDegree = function() {
                return n
            }, this.setVisible = function(e) {
                this.mesh.visible !== e && (this.mesh.visible = e)
            }, this.disposeWithoutTexture = function() {
                var e = this.mesh.material;
                void 0 !== e && (s.Log.log("[RoadArrow] FN:dispose:  deallocate material with id " + e.id), e.dispose(), delete e.uniforms), delete this.mesh.material;
                var t = this.mesh.geometry;
                void 0 !== t && t.dispose(), delete this.mesh.geometry
            }, this.dispose = function() {
                var e = this.mesh.material;
                if (void 0 !== e) {
                    s.Log.log("[RoadArrow] FN:dispose:  deallocate material with id " + e.id);
                    var t = e.uniforms.uSampler.value;
                    void 0 !== t && (t.dispose(), delete e.uniforms.uSampler.value), e.dispose(), delete e.uniforms, e = void 0
                }
                var o = this.mesh.geometry;
                void 0 !== o && o.dispose()
            }
        };
    return n.prototype = Object.create(t.prototype), n.prototype.constructor = n, n
});;
define("pano:widget/module/PanoModule/WebglRender/widget/RoadSurface.js", function(o) {
    var e = o("pano:widget/module/PanoModule/WebglRender/component/ThreeDDisplayObject.js"),
        r = function() {
            e.call(this);
            var o = new Four.geometry.PlaneGeometry(300, 2e3, 1, 1, Four.Config.ZeroAxisY, {
                    showBorder: !0,
                    borderWidth: 1,
                    borderColor: [1, 0, 0, 1]
                }),
                r = new Four.material.Material;
            r.uniforms = {
                vColor: {
                    type: "4f",
                    value: [1, 0, 0, .7]
                },
                showDebugLine: {
                    type: "1i",
                    value: !1
                }
            }, r.vertexShader = ["void main(void){", "   gl_Position = mvpMatrix * vec4(position, 1.0);", "}"].join("\n"), r.fragmentShader = ["uniform vec4 vColor;", "uniform bool showDebugLine;", "void main(void){", "   if (!showDebugLine) {", "       gl_FragColor = vColor;", "   } else {", "       gl_FragColor = vColor;", "   }", "}"].join("\n"), this.mesh = new Four.PlaneMesh(o, r, [0, 1, 0], -500, [0, 1, 0])
        };
    return r.prototype = Object.create(e.prototype), r.prototype.constructor = r, r
});;
define("pano:widget/module/PanoModule/WebglRender/widget/NavigationRoad.js", function(e) {
    var i = e("pano:widget/module/PanoModule/WebglRender/component/ThreeDDisplayObject.js"),
        r = e("pano:widget/module/PanoModule/WebglRender/config/ConfigurationOptions.js"),
        n = e("pano:widget/module/PanoModule/WebglRender/core/ShaderSet.js"),
        a = window.Four,
        o = a.Mesh,
        s = a.GLMatrix.vec3,
        h = a.geometry.Geometry,
        l = (a.material.Material, function() {
            function e() {
                for (var e = S.length - 2; e > 0; e--) s.distance(S[e], S[e - 1]) < w && S.splice(e, 1)
            }

            function l() {
                for (var e, t, i, r = S.length - 1, n = [0, 0, 0], a = [0, 0, 0], o = [0, 0, 0], h = [0, 0, 0], l = [0, 0, 0], d = [0, 0, 0], c = 0; r > c; c++) e = S[c], t = S[c + 1], s.subtract(n, t, e), i = s.length(n), s.normalize(n, n), i > D ? (h = s.scale(h, n, P), s.add(h, h, e), l = s.scale(l, n, i - P), s.add(l, l, e)) : (h = e, l = t), s.scale(n, n, P), s.rotateY(a, n, d, .5 * Math.PI), s.rotateY(o, n, d, .5 * -Math.PI), j.push(u(a, h)), F.push(u(o, h)), j.push(u(a, l)), F.push(u(o, l))
            }

            function u(e, t) {
                var i = [0, 0, 0];
                return i[0] = e[0] + t[0], i[1] = e[1] + t[1], i[2] = e[2] + t[2], i
            }

            function d() {
                for (var e, t, i, r, n, a, o, h, l, u, d, v, p, m = j.length / 2 - 1, b = [0, 0, 0], w = [0, 0, 0], M = [0, 0, 0], D = 1; m >= D; D++) e = j[2 * (D - 1)], t = j[2 * (D - 1) + 1], s.subtract(b, t, e), i = j[2 * D], r = j[2 * D + 1], s.subtract(w, r, i), p = c(b, w), p > y ? (n = f(e, t, i, r), s.subtract(M, n, e), s.length(M) <= s.length(b) ? (j[2 * (D - 1) + 1] = n, j[2 * D] = n, a = [n]) : a = g(t, n, i), o = F[2 * (D - 1)], h = F[2 * (D - 1) + 1], l = F[2 * D], u = F[2 * D + 1], d = f(o, h, l, u), s.subtract(b, h, o), s.subtract(M, d, o), s.length(M) <= s.length(b) ? (F[2 * (D - 1) + 1] = d, F[2 * D] = d, v = [d]) : v = g(h, d, l)) : (h = F[2 * (D - 1) + 1], l = F[2 * D], a = [t, i], v = [h, l]), R.push(a), N.push(v)
            }

            function c(e, t) {
                var i = s.dot(e, t) / (s.length(e) * s.length(t));
                return Math.acos(i)
            }

            function f(e, t, i, r) {
                var n, a, o, s = e[0],
                    h = e[2],
                    l = t[0],
                    u = t[2],
                    d = i[0],
                    c = i[2],
                    f = r[0],
                    g = r[2];
                s === l ? n = s : h === u ? a = h : o = (u - h) / (l - s);
                var v;
                if (d === f ? n = d : c === g ? a = c : v = (g - c) / (f - d), void 0 !== n && void 0 !== a) return [n, e[1], a];
                if (void 0 !== o && void 0 !== v) n = (u - o * l - g + v * f) / (v - o), a = o * n - o * l + u;
                else {
                    void 0 !== n ? a = void 0 !== o ? o * n - o * l + u : v * n - v * f + g : n = void 0 !== o ? a / o - u / o + l : a / v - g / v + f
                }
                return [n, e[1], a]
            }

            function g(e, i, r) {
                for (var n, a = [], o = e[0], h = e[2], l = i[0], u = i[2], d = r[0], c = r[2], f = i[1], g = 0; M >= g; g++) t = g / M, n = v(t, o, l, d), tz = v(t, h, u, c), a.push(s.fromValues(n, f, tz));
                return a
            }

            function v(e, t, i, r) {
                return (1 - e) * (1 - e) * t + 2 * e * (1 - e) * i + e * e * r
            }

            function p() {
                var e = j.concat(F),
                    t = e.length,
                    i = b(R),
                    r = t,
                    n = b(N),
                    a = r + i.length;
                e = e.concat(i), e = e.concat(n);
                var o, s = e.length,
                    h = new Float32Array(3 * s),
                    l = 0;
                for (w = 0; s > w; w++) o = e[w], h[l] = o[0], h[l + 1] = o[1], h[l + 2] = o[2], l += 3;
                A.verticesBufferData = h;
                for (var u, d, c, f, g = j.length, v = [], p = g - 1, w = 0; p > w;) u = w + 1, d = w, c = g + w, f = g + w + 1, v.push(d, c, f), v.push(d, f, u), w += 2;
                var y = m(r, a);
                v = v.concat(y), A.indicesBufferData = new Uint16Array(v), A.groupsNeedUpdate = !0
            }

            function m(e, t) {
                var i, r, n, a, o, s, h, l, u, d, c = [],
                    f = R.length,
                    g = (N.length, e),
                    v = t;
                for (i = 0; f > i; i++) {
                    if (n = R[i], a = n.length, o = N[i], s = o.length, 1 === a)
                        for (r = 1; s > r; r++) c.push(g, v + r - 1, v + r);
                    else if (1 === s)
                        for (r = 1; a > r; r++) c.push(g + r - 1, v, g + r);
                    else
                        for (r = 1; a > r; r++) h = g + r, l = g + r - 1, u = v + r - 1, d = v + r, c.push(l, u, d), c.push(l, d, h);
                    g += a, v += s
                }
                return c
            }

            function b(e) {
                for (var t, i = [], r = e.length, n = 0; r > n; n++) t = e[n], i = i.concat(t);
                return i
            }
            i.call(this);
            var w = 2,
                y = 30 * Math.PI / 180,
                M = 5,
                D = .4,
                P = .5 * D,
                S = [],
                j = [],
                F = [],
                R = [],
                N = [],
                A = new h,
                B = new a.material.Material;
            B.depthTest = !1, B.uniforms = {
                vColor: {
                    type: "4f",
                    value: [.2, 133 / 255, 1, .3]
                }
            }, B.vertexShader = n.baseVertexShader, B.fragmentShader = n.baseFragmentShader, !0 === r.debug.shader && (B.uniforms.showDebugLine = {
                type: "1i",
                value: !1
            }, B.fragmentShader = n.baseFragmentShaderDebug), this.mesh = new o(A, B), this.mesh.visible = this.visible = !1, this.setNavigationPoints = function(t) {
                this.reset(), S = t.slice(0), e(), l(), d(), p(), this.mesh.visible = this.visible
            }, this.getPointsData = function() {
                return S.slice(0)
            }, this.setVisible = function(e) {
                this.visible !== e && (this.visible = e, this.mesh.visible = S && 0 < S.length ? e : !1)
            }, this.reset = function() {
                A.verticesBufferData = new Float32Array, A.indicesBufferData = new Uint16Array, S = [], j = [], F = [], R = [], N = []
            }, this.dispose = function() {
                var e = this.mesh.material;
                void 0 !== e && (a.Log.log("[NavigationRoad] FN:dispose:  deallocate material with id " + e.id), e.dispose(), delete e.uniforms, e = void 0), delete this.mesh.material;
                var t = this.mesh.geometry;
                void 0 !== t && t.dispose(), delete this.mesh.geometry
            }
        });
    return l.prototype = Object.create(i.prototype), l.prototype.constructor = l, l
});;
define("pano:widget/module/PanoModule/WebglRender/widget/NavigationArrow.js", function(e) {
    var t = e("pano:widget/module/PanoModule/WebglRender/component/ThreeDDisplayObject.js"),
        i = e("pano:widget/module/PanoModule/WebglRender/config/ConfigurationOptions.js"),
        a = e("pano:widget/module/PanoModule/WebglRender/core/ShaderSet.js"),
        r = window.Four,
        n = r.GLMatrix.vec3,
        o = r.Mesh,
        s = r.geometry.Geometry,
        h = (r.material.Material, function() {
            function e() {
                for (var e, t, i, a = c.length - 1, r = [0, 0, 0], o = a - 1; o >= 0; o--)
                    if (e = c[o], n.sub(r, c[o + 1], e), t = n.length(r), num = Math.round(t / u), num > 1)
                        for (var s = num - 1; s > 0; s--) i = [0, 0, 0], n.scale(i, r, u * s / t), n.add(i, i, e), c.splice(o + 1, 0, i)
            }

            function h() {
                for (var e, t, i = c.length - 1, a = [0, 0, 0], r = 0; i > r; r++) e = c[r], length = n.length(e), g > length && (n.sub(a, c[r + 1], e), t = Math.atan2(-a[2], a[0]) - .5 * Math.PI, v = v.concat(l(e, t)))
            }

            function l(e, t) {
                for (var i, a = [0, 0, -(2 * f + m)], r = [0, 0, -m], o = [m / Math.sqrt(3) + f / 2 * Math.sqrt(3), 0, -f / 2], s = [m / Math.sqrt(3), 0, 0], h = [-o[0], 0, o[2]], l = [-s[0], 0, 0], d = [a, r, o, s, h, l], u = d.length - 1; u >= 0; u--) i = d[u], n.rotateY(i, i, n.fromValues(0, 0, 0), t), n.add(i, i, e);
                return d
            }

            function d() {
                var e, t = v.length,
                    i = new Float32Array(3 * t),
                    a = 0;
                for (s = 0; t > s; s++) e = v[s], i[a] = e[0], i[a + 1] = e[1], i[a + 2] = e[2], a += 3;
                p.verticesBufferData = i;
                for (var r, n = [], o = v.length / 6, s = 0; o > s; s++) r = 6 * s, n = n.concat([4 + r, 5 + r, 1 + r, 4 + r, 1 + r, 0 + r, 0 + r, 1 + r, 3 + r, 0 + r, 3 + r, 2 + r]);
                p.indicesBufferData = new Uint16Array(n), p.groupsNeedUpdate = !0
            }
            t.call(this);
            var u = 3,
                g = 20,
                f = .05,
                m = .16,
                c = [],
                v = [],
                p = new s,
                b = new r.material.Material;
            b.depthTest = !1, b.uniforms = {
                vColor: {
                    type: "4f",
                    value: [1, 1, 1, .8]
                }
            }, b.vertexShader = a.baseVertexShader, b.fragmentShader = a.baseFragmentShader, !0 === i.debug.shader && (b.uniforms.showDebugLine = {
                type: "1i",
                value: !1
            }, b.fragmentShader = a.baseFragmentShaderDebug), this.mesh = new o(p, b), this.mesh.visible = this.visible = !1, this.setNavigationPoints = function(t) {
                this.reset(), c = t.slice(0), e(), h(), d(), this.mesh.visible = this.visible
            }, this.setVisible = function(e) {
                this.visible !== e && (this.visible = e, this.mesh.visible = c && 0 < c.length ? e : !1)
            }, this.reset = function() {
                p.verticesBufferData = new Float32Array, p.indicesBufferData = new Uint16Array, c = [], v = []
            }, this.dispose = function() {
                var e = this.mesh.material;
                void 0 !== e && (r.Log.log("[NavigationArrow] FN:dispose:  deallocate material with id " + e.id), e.dispose(), delete e.uniforms, e = void 0), delete this.mesh.material;
                var t = this.mesh.geometry;
                void 0 !== t && t.dispose(), delete this.mesh.geometry
            }
        });
    return h.prototype = Object.create(t.prototype), h.prototype.constructor = h, h
});;
define("pano:widget/module/PanoModule/WebglRender/widget/POILine.js", function(e) {
    var t = e("pano:widget/module/PanoModule/WebglRender/component/ThreeDDisplayObject.js"),
        i = e("pano:widget/module/PanoModule/WebglRender/core/ShaderSet.js"),
        o = e("pano:widget/module/PanoModule/WebglRender/config/ConfigurationOptions.js"),
        n = window.Four,
        r = n.GLMatrix.vec3,
        a = n.GLMatrix.mat4,
        s = n.geometry.CircleGeometry,
        l = n.geometry.LineGeometry,
        u = n.material.Material,
        c = n.Mesh,
        d = function(e, d, p, h, v) {
            function m(e, t) {
                var i = r.create(),
                    o = [e[0], e[1], 0],
                    n = [t[0], t[1], 0];
                return r.subtract(i, n, o), i
            }

            function g(e, t) {
                var i = Math.acos(r.dot(e, t)),
                    o = r.create();
                r.cross(o, e, t);
                var n = a.create();
                return n = a.rotate(n, n, i, o)
            }
            t.call(this);
            var f = new u;
            f.uniforms = {
                vColor: {
                    type: "4f",
                    value: [.2, 170 / 255, 1, 1]
                },
                uOpacity: {
                    type: "1f",
                    value: 1
                }
            }, !0 === o.debug.shader && (f.uniforms.showDebugLine = {
                type: "1i",
                value: !1
            }), f.vertexShader = i.baseVertexShader, f.fragmentShader = i.baseFragmentShader;
            var b = new s(4, 16, 0, 2 * Math.PI, n.Config.ZeroAxisZ),
                y = new c(b, f);
            y.position = [d[0] - .5 * h, d[1] - .5 * v, -10], y.visible = !1;
            var w = m(e, d),
                M = r.length(w),
                O = r.create();
            r.normalize(O, w);
            var L = new l(w, 1, p),
                P = new c(L, f);
            P.rotation = g(L.lineDirection, O), P.position = [e[0] - .5 * h, e[1] - .5 * v, -10];
            var j = 0;
            P.scale = [1, M * j, 1];
            var S = 1;
            f.uniforms.uOpacity.value = S, this.mesh = [P, y], Object.defineProperties(this, {
                percent: {
                    get: function() {
                        return j
                    },
                    set: function(e) {
                        j = e, j >= 1 && (y.visible = !0), P.scale = [1, M * j, 1]
                    }
                },
                opacity: {
                    get: function() {
                        return S
                    },
                    set: function(e) {
                        S !== e && (S = e, f.uniforms.uOpacity.value = S)
                    }
                }
            }), this.updateLine = function(e, t, i, o) {
                w = m(e, t), M = r.length(w), r.normalize(O, w), P.rotation = g(L.lineDirection, O), P.position = [e[0] - .5 * i, e[1] - .5 * o, -10], this.percent = 0, this.opacity = 1, y.position = [t[0] - .5 * i, t[1] - .5 * o, -10], y.visible = !1
            }, this.setVisible = function(e) {
                this.visible !== e && (this.visible = e, this.mesh.visible = e)
            }, this.dispose = function() {
                var e = this.mesh.material;
                void 0 !== e && (n.Log.log("[POILine] FN:dispose:  deallocate material with id " + e.id), e.dispose(), delete e.uniforms, e = void 0);
                var t = this.mesh.geometry;
                void 0 !== t && t.dispose()
            }
        };
    return d.prototype = Object.create(t.prototype), d.prototype.constructor = d, d
});;
define("pano:widget/module/PanoModule/WebglRender/StreetscapePanorama.js", function(e) {
    var a = e("pano:widget/module/PanoModule/WebglRender/core/DomOverlay.js"),
        t = e("pano:widget/module/PanoModule/WebglRender/core/Panorama.js"),
        n = e("pano:widget/module/PanoModule/WebglRender/event/EventType.js"),
        i = e("pano:widget/module/PanoModule/WebglRender/service/TextureManager.js"),
        o = e("pano:widget/module/PanoModule/WebglRender/config/ConstantConfig.js"),
        r = e("pano:widget/module/PanoModule/WebglRender/config/ConfigurationOptions.js"),
        d = e("pano:widget/module/PanoModule/WebglRender/delegate/MouseHandler.js"),
        s = e("pano:widget/module/PanoModule/WebglRender/util/Util.js"),
        c = e("pano:widget/module/PanoModule/WebglRender/service/Service.js"),
        u = e("pano:widget/module/PanoModule/WebglRender/util/DataParser.js"),
        l = e("pano:widget/module/PanoModule/WebglRender/animation/AnimationManager.js"),
        p = e("pano:widget/module/PanoModule/WebglRender/animation/Animation.js"),
        m = e("pano:widget/module/PanoModule/WebglRender/animation/TipAnimation.js"),
        v = e("pano:widget/module/PanoModule/WebglRender/animation/PointCloudAnimation.js"),
        P = e("pano:widget/module/PanoModule/WebglRender/animation/CommonAnimation.js"),
        g = e("pano:widget/module/PanoModule/WebglRender/animation/tween/TweenFunction.js"),
        E = e("pano:widget/module/PanoModule/WebglRender/animation/fade/FadeModel.js"),
        h = window.Four,
        A = h.WebGLRenderer,
        f = h.Scene,
        I = h.camera.PerspectiveCamera,
        L = h.camera.OrthographicCamera,
        T = h.GLMatrix.vec3,
        O = h.GLMatrix.vec2,
        M = h.Log,
        D = h.Tool,
        _ = h.CursorPicker,
        C = h.WebGLRenderTarget,
        R = h.Config,
        b = h.Ray,
        N = function(e, h) {
            function N(e) {
                e.preventDefault()
            }

            function w(e) {
                if (void 0 === ct.curPanoId || e.panoId !== ct.curPanoId) {
                    ct.panoType = e.panoType, ct.curIid = e.iid;
                    var a = e.panoId,
                        t = Y(e.heading),
                        n = k(e.pitch);
                    ct.curPanorama && (ct.curPanorama.setTopoVisible(!1), B(), K(), Ia(mt, Pt)), a ? na(a, t, n) : oa(ct.curIid)
                }
            }

            function y(e) {
                if (!dt) {
                    var a = e.data,
                        t = ct.curZoom + a;
                    ct.setZoom(t)
                }
            }

            function V(e, a) {
                if (void 0 !== e) {
                    var t, i, r, d = e - ct.curZoom,
                        s = Math.abs(d);
                    if (ct.isBillionPixels) {
                        if (o.ZOOM_MIN > e || ct.maxTileLevel - o.LEVEL_ZOOM_DIFF < e) return;
                        if (r = e + o.LEVEL_ZOOM_DIFF, i = 600 + 400 * (s - 1), r < ct.curTileLevel && (ct.curTileLevel = r, ct.curPanorama.setLevel(ct.curTileLevel), s > 1)) {
                            At = !0;
                            var c = Pt.clone();
                            c.fov = o.BILLIONS_FOVY_VALUE[e - 1], ca(c)
                        }
                        t = o.BILLIONS_FOVY_VALUE[e - 1] - o.BILLIONS_FOVY_VALUE[ct.curZoom - 1]
                    } else {
                        if (o.ZOOM_MIN > e || o.ZOOM_MAX_COMMON < e) return;
                        o.ZOOM_MAX_COMMON === e && "inter" === ct.panoType ? (ct.curTileLevel = o.TILE_LEVEL_FIVE, ct.curPanorama.setLevel(ct.curTileLevel)) : (ct.curTileLevel = o.TILE_LEVEL_FOUR, ct.curPanorama.setLevel(ct.curTileLevel)), r = ct.curTileLevel, t = o.FOV_ZOOM_STEP;
                        var u = ct.curZoom - e;
                        t *= u
                    }
                    if (ut.setMarkerVisible(!1), ct.curZoom = e, a) U(t), ct.curTileLevel != r && (ct.curTileLevel = r, ct.curPanorama.setLevel(ct.curTileLevel), ca()), ct.dispatchEvent({
                        type: n.ZOOM_CHANGED,
                        data: ct.curZoom
                    });
                    else {
                        var m = g.linear;
                        d > 1 && (m = g.easeInQuart), -1 > d && (m = g.easeOutQuart), ct.isInZoomChangeAnimation = !0;
                        var v = new P(ct, "fov", Pt.fov + t, i, m);
                        v.addEventListener(p.TWEEN_START, function() {
                            At = !1
                        }), v.addEventListener(p.TWEEN_END, function() {
                            v.dispose(), v = void 0, ct.isInZoomChangeAnimation = !1, ct.curTileLevel != r && (ct.curTileLevel = r, ct.curPanorama.setLevel(ct.curTileLevel), ca()), void 0 !== ut && (ut.forceUpdateMarkers(), ut.setMarkerVisible(!0)), ct.isBillionPixels && (ht = !1), ct.dispatchEvent({
                                type: n.ZOOM_CHANGED,
                                data: ct.curZoom
                            })
                        }), ct.isBillionPixels && s > 1 && ht ? setTimeout(function() {
                            l.getInstance.executeAnimation(v)
                        }, 1500) : l.getInstance.executeAnimation(v)
                    }
                }
            }

            function S(e, a, t) {
                if (0 !== e || 0 !== a) {
                    var i = D.degreeNormalized(F() + e);
                    Pt.rotateY = D.degToRad(i);
                    var o = X() + a;
                    o -= o > 0 ? 360 * Math.floor(o / 360) : 360 * Math.ceil(o / 360), o = ct.curCameraMaxPitch <= o ? ct.curCameraMaxPitch : o, o = ct.curCameraMinPitch >= o ? ct.curCameraMinPitch : o, Pt.rotateX = -D.degToRad(o), !1 !== t && (Z(e), ca(), dt || ut.updateMarkersPosition(), Za(!0, "[StreetscapePanorama] 渲染一帧：相机姿态调整"), ct.dispatchEvent({
                        type: n.POV_CHANGED,
                        data: ct.getPov()
                    }))
                }
            }

            function x(e, a) {
                var t;
                if (void 0 === a || isNaN(a) ? t = o.TYPE_INNER === e ? o.INTER_VIEWPORT_MAX : o.STREET_VIEWPORT_MAX : (a = -a, t = a < o.PANO_VIEWPORT_MAX ? a - .5 * Pt.fov : o.PANO_VIEWPORT_MAX), ct.isBillionPixels) {
                    var n = o.PANO_VIEWPORT_BILLION_MAX - .5 * Pt.fov;
                    t > n && (t = n)
                }
                return t
            }

            function W(e, a) {
                var t;
                if (void 0 === a || isNaN(a) ? t = o.PANO_VIEWPORT_MIN : (a = -a, t = a > o.PANO_VIEWPORT_MIN ? a + .5 * Pt.fov : o.PANO_VIEWPORT_MIN), ct.isBillionPixels) {
                    var n = o.PANO_VIEWPORT_BILLION_MIN + .5 * Pt.fov;
                    n > t && (t = n)
                }
                return t
            }

            function U(e, a) {
                Pt.fov += e, Pt.updateProjectionMatrix(), ct.curCameraMaxPitch = x(ct.panoType, ct.panoData.imgVmin), ct.curCameraMinPitch = W(ct.panoType, ct.panoData.imgVmax);
                var t = X();
                t > ct.curCameraMaxPitch ? S(0, ct.curCameraMaxPitch - t, !1) : t < ct.curCameraMinPitch && S(0, ct.curCameraMinPitch - t, !1), !1 !== a && (ct.isBillionPixels && ht || ca(), Za(!0, "[StreetscapePanorama] 渲染一帧：相机在Y轴上的视口调整"))
            }

            function F() {
                return D.radToDeg(Pt.rotateY)
            }

            function Y(e) {
                return 360 - e
            }

            function X() {
                return -D.radToDeg(Pt.rotateX)
            }

            function k(e) {
                return -e
            }

            function Z() {
                Pt.updateWorldMatrix();
                var e = (360 - F()) * Math.PI / 180,
                    a = 32 * Math.sin(e),
                    t = -9,
                    n = -32 * Math.cos(e);
                ct.curPanorama.setTopoPosition(a, t, n)
            }

            function H(e, a) {
                if (ct.panoData.getTopos) {
                    var t = ct.panoData.getTopos();
                    if (void 0 === t || 0 >= t.length) return B();
                    var n = T.fromValues(0, 0, 0);
                    T.normalize(n, e);
                    var i = [0, -ct.panoData.deviceHeight, 0],
                        r = T.length(i),
                        d = T.dot(i, n) / r;
                    if (0 > d) return B();
                    var s = r / d;
                    T.scale(n, n, s);
                    var c = [n[0], n[2]],
                        u = O.length(c);
                    if (u < o.ROAD_MIN_LENGTH || u > o.ROAD_MAX_LENGTH) return B();
                    for (var l, p, m, v, P = ct.panoData.panoX, g = ct.panoData.panoY, E = Number.MAX_VALUE, h = t.length - 1; h >= 0; h--) l = t[h], p = l.panoX - P - c[0], m = l.panoY - g + c[1], v = p * p + m * m, E > v && (E = v);
                    if (E > u * u) return B();
                    var A = ct.panoData.getRoadWidth();
                    A = o.ROAD_WIDTH > A ? o.ROAD_WIDTH : A;
                    for (var f, I, L = [0, 0], M = 0, _ = Math.floor(o.SPHERE_RADIUS / o.ROAD_MAX_LENGTH), h = t.length - 1; h >= 0; h--)
                        if (M = D.degToRad(t[h].topoDir), L = [Math.sin(M), -Math.cos(M)], d = O.dot(c, L) / u, d > 0 && (f = Math.acos(d), I = u * Math.sin(f), A > I)) return T.scale(n, n, _), G(n, u, a);
                    return B()
                }
            }

            function B() {
                var e = ct.curPanorama.hideWellLid();
                return ut.updateWellLidDistanceLabel(0, !1), e
            }

            function G(e, a, t) {
                if (!1 !== r.visible.wellLid) {
                    var n = ct.curPanorama.showWellLid(e[0], e[1], e[2]);
                    return ut.updateWellLidDistanceLabel(a, !0, t), n
                }
            }

            function K() {
                ct.curPanorama.setPointCloudVisible(!1), ut.updatePointCloudNameLabel("", !1)
            }

            function j(e, a, t) {
                !1 !== r.visible.pointCloud && (ct.curPanorama.setPointCloudVisible(!0), ct.curPanorama.updatePointCloud(e.normal, e.depth, a), ut.updatePointCloudNameLabel(e.name, !0, t))
            }

            function z(e) {
                mt.addChild(e.getMeshes())
            }

            function J(e, a) {
                var t = new i(e, a);
                return t.addEventListener(n.LOAD_THUMBNAIL_COMPLETED, q), t.addEventListener(n.LOAD_THUMBNAIL_FAILED, $), t.addEventListener(n.LOAD_TILE_COMPLETED, ea), t.addEventListener(n.LOAD_TILE_QUEUE_COMPLETED, aa), t.addEventListener(n.LOAD_TOPO_TEXTURE_COMPLETED, ta), t
            }

            function Q(e) {
                void 0 !== e && (e.removeEventListener(n.LOAD_THUMBNAIL_COMPLETED, q), e.removeEventListener(n.LOAD_THUMBNAIL_FAILED, $), e.removeEventListener(n.LOAD_TILE_COMPLETED, ea), e.removeEventListener(n.LOAD_TILE_QUEUE_COMPLETED, aa), e.removeEventListener(n.LOAD_TOPO_TEXTURE_COMPLETED, ta), e.dispose())
            }

            function q(e) {
                if (ct.curPanoId === e.data.panoId) {
                    if (ct.curPanorama.setThumbnail(e.data.image), !0 === r.debug.pointCloud) {
                        var a = ct.panoData.pointCloudData;
                        if (void 0 !== a) {
                            var t = a.getPointCloudImage();
                            ct.curPanorama.setMask(t)
                        }
                    }
                    var i = !1;
                    nt = !0, ct.isBillionPixels === !0 ? (ht ? (ct.curTileLevel = ct.maxTileLevel, ct.curZoom = ct.maxTileLevel - o.LEVEL_ZOOM_DIFF, Pt.fov = o.BILLIONS_FOVY_VALUE[ct.curZoom - 1], ct.dispatchEvent({
                        type: n.ZOOM_CHANGED,
                        data: ct.curZoom
                    }), ct.curPanorama.setLevel(ct.curTileLevel)) : V(ct.curZoom, !0), ft = !0) : (ct.curZoom >= o.TILE_LEVEL_FOUR && ft ? (It = o.DEFAULT_FOV_Y - o.ZOOM_MAX_COMMON * o.FOV_ZOOM_STEP, -o.BILLIONS_FOVY_VALUE[ct.curZoom - 1], ct.curTileLevel = o.TILE_LEVEL_FIVE, ct.curZoom = o.ZOOM_MAX_COMMON, Pt.fov = Pt.fov + It) : ft && (ct.curTileLevel = o.TILE_LEVEL_FOUR, It = o.DEFAULT_FOV_Y - (ct.curZoom - 1) * o.FOV_ZOOM_STEP - o.BILLIONS_FOVY_VALUE[ct.curZoom - 1], Pt.fov = Pt.fov + It), V(ct.curZoom, !0), ht = !0, ft = !1), ct.tipAnimation && !0 === ct.tipAnimation.getIsAnimating() ? ct.curPanorama.setVisible(!1) : ct.pointCloudAnimation ? (Ca(), ct.curPanorama.setVisible(!1), !0 === l.getInstance.getIsWaitingPreCondition() && l.getInstance.setIsWaitingPreCondition(!1)) : !0 === l.getInstance.getIsWaitingPreCondition() ? (l.getInstance.setIsWaitingPreCondition(!1), Ta()) : Ta(), i || ca(), Z(), Za(!0, "[StreetscapePanorama] 渲染一帧：加载缩略图成功"), ct.dispatchEvent(e)
                }
            }

            function $(e) {
                ct.dispatchEvent(e)
            }

            function ea(e) {
                var a = e.data;
                ct.curPanoId === a.panoId && ct.curTileLevel === a.level && (ct.curPanorama.setTile(a.id, a.image, a.tileX, a.tileY, a.level), At || Za(!0, "[StreetscapePanorama] 渲染一帧：一张瓦片加载成功"))
            }

            function aa(e) {
                ct.dispatchEvent(e)
            }

            function ta(e) {
                var a = e.data;
                o.TOPO_ARROW_TEXTURE === a.url ? ($a = a.image, ct.curPanorama.setTopoTexture($a), ct.curPanorama.onTopoImageLoaded(), Za(!0, "TOPO箭头纹理加载完毕")) : o.TOPO_HOVER_ARROW_TEXTURE === a.url && (et = a.image, ct.curPanorama.setTopoHoverTexture(et))
            }

            function na(e, a, i) {
                e !== ct.curPanoId && (ut.setMarkerVisible(!1), ut.removeMarkerPanels(), ct.dispatchEvent({
                    type: n.ID_CHANGED,
                    data: e
                }), nt = !1, ct.defaultHeading = a, ct.defaultPitch = i, ct.curPanoId = e, ct.curPanorama ? (ct.curPanorama.reset(mt), ct.curPanorama.panoId = ct.curPanoId) : ct.curPanorama = new t(ct.curPanoId), ia(ct.curPanoId), void 0 !== $a ? ct.curPanorama.setTopoTexture($a) : ct.textureManager.loadTopoTexture(o.TOPO_ARROW_TEXTURE), void 0 !== et ? ct.curPanorama.setTopoHoverTexture(et) : ct.textureManager.loadTopoTexture(o.TOPO_HOVER_ARROW_TEXTURE))
            }

            function ia(e) {
                c.loadPanoramaData(e).then(function(e) {
                    try {
                        var a = e,
                            t = u.parseSData(e)
                    } catch (i) {
                        return void ct.dispatchEvent({
                            type: n.PARSE_PANORAMA_DATA_FAILED
                        })
                    }
                    t.panoId === ct.curPanoId && (M.log("[StreetscapePanorama] Load panorama data successfully."), ct.panoJSONData = a, ct.panoData = t, ct.panoType = ct.panoData.panoType, ct.curIid = ct.panoData.iid, ct.curCameraMaxPitch = x(ct.panoType, t.imgVmin), ct.curCameraMinPitch = W(ct.panoType, t.imgVmax), ct.maxTileLevel = t.maxImgLevel, ct.curPanorama.setTileLayers(t.maxImgLevel, t.imgLayers), ct.isBillionPixels = ct.maxTileLevel >= o.TILE_LEVEL_SEVEN, dt || ct.curPanorama.setTopoArrows(ct.panoData.getTopos()), ct.textureManager.loadThumbnail(ct.curPanoId), ct.correctionHeading = ct.panoData.heading, ct.curPanorama.setRotateY(D.degToRad(-ct.correctionHeading)), ct.curPanorama.setRotateX(D.degToRad(ct.panoData.pitch)), ct.curPanorama.setRotateZ(D.degToRad(-ct.panoData.roll)), (void 0 === ct.defaultHeading || null === ct.defaultHeading || isNaN(ct.defaultHeading)) && (ct.defaultHeading = -ct.panoData.moveDir), (void 0 === ct.defaultPitch || null === ct.defaultPitch || isNaN(ct.defaultPitch)) && (ct.defaultPitch = 0), S(ct.defaultHeading - F(), ct.defaultPitch - X(), !1), ut.setPanoramaData({
                        panoId: ct.panoData.panoId,
                        currentRoad: ct.panoData.getCurrentRoad(),
                        roadWidth: o.ROAD_WIDTH,
                        deviceHeight: ct.panoData.deviceHeight,
                        moveDir: ct.panoData.moveDir,
                        panoX: ct.panoData.panoX,
                        panoY: ct.panoData.panoY,
                        viewportWidth: at,
                        viewportHeight: tt,
                        fovy: Pt.fov,
                        camera: Pt
                    }), void 0 !== Dt && xa(), o.TYPE_INNER !== ct.panoType || void 0 !== ct.innerData && ct.curIid === ct.innerData.iid ? (ct.dispatchEvent({
                        type: n.LOAD_PANORAMA_DATA_COMPLETED,
                        data: e
                    }), !0 !== st && ct.dispatchEvent({
                        type: n.DESELECT_POI,
                        data: e
                    }), st = !1) : oa(ct.curIid))
                }, function() {
                    ct.dispatchEvent({
                        type: n.LOAD_PANORAMA_DATA_FAILED
                    })
                })
            }

            function oa(e) {
                c.loadInnerPanoramaData(e).then(function(e) {
                    try {
                        var a = u.parseIData(e)
                    } catch (t) {
                        return void ct.dispatchEvent({
                            type: n.PARSE_INNER_PANORAMA_DATA_FAILED
                        })
                    }
                    if (a.iid === ct.curIid) {
                        if (M.log("[StreetscapePanorama] Load inner panorama data successfully."), ct.innerData = a, void 0 !== ct.panoData && ct.curPanoId !== ct.panoData.panoId);
                        else if (void 0 !== ct.panoData && ct.curPanoId === ct.panoData.panoId && ct.panoData.iid === ct.curIid) ct.dispatchEvent({
                            type: n.LOAD_PANORAMA_DATA_COMPLETED,
                            data: e
                        }), !0 !== st && ct.dispatchEvent({
                            type: n.DESELECT_POI,
                            data: e
                        }), st = !1;
                        else {
                            var i = sa(ct.innerData);
                            na(i.panoId)
                        }
                        ct.dispatchEvent({
                            type: n.LOAD_INNER_PANORAMA_DATA_COMPLETED,
                            data: e
                        })
                    }
                }, function() {
                    ct.dispatchEvent({
                        type: n.LOAD_INNER_PANORAMA_DATA_FAILED
                    })
                })
            }

            function ra(e, a) {
                e += ct.panoData.panoX, a = ct.panoData.panoY - a, c.loadPanoramaDataByMercator(e, a, ct.panoData).then(function(e) {
                    try {
                        var a = u.parseQSData(e),
                            t = a.panoId;
                        if (void 0 !== t && t !== ct.curPanoId) {
                            var n = [a.panoX, a.panoY];
                            Aa(t, n, void 0, void 0)
                        }
                    } catch (i) {}
                }, function() {})
            }

            function da() {
                var e = ct.curPanorama.getPointCloudMercatorPosition();
                e[2] = -e[2];
                var a = [ct.panoData.panoX + e[0], e[1], ct.panoData.panoY + e[2]],
                    t = [ct.panoData.rx + e[0], e[1], ct.panoData.ry + e[2]],
                    n = ct.curPanorama.getPointCloudNormal();
                c.loadPanoramaDataByPlane(a, t, n, ct.panoData).then(function(t) {
                    try {
                        var n = u.parsePlaneData(t),
                            i = n.panoId;
                        if (void 0 !== i) {
                            var o = [n.panoX, n.panoY],
                                r = [a[0], a[2]],
                                d = 360 - s.getHeadingInPlane(o, r),
                                c = s.getDistanceInPlane(o, r),
                                l = 180 * -Math.atan2(e[1], c) / Math.PI,
                                p = {
                                    heading: ya(d),
                                    pitch: l
                                };
                            if (i === ct.curPanoId) ot = p, Oa();
                            else {
                                var m = [n.panoX, n.panoY];
                                Aa(i, m, p, void 0)
                            }
                        }
                    } catch (v) {}
                }, function() {})
            }

            function sa(e) {
                for (var a, t = e.defaultFloorId, n = e.floors, i = n.length - 1; i >= 0 && (a = n[i], a.id !== t); i--);
                var o, r = a.innerPanos;
                for (i = r.length - 1; i >= 0 && (o = r[i], a.defaultPanoId !== o.panoId); i--);
                return o
            }

            function ca(e) {
                function a(e) {
                    return _.viewportToCorrectSphere(i, e, at, tt, ct.curPanorama.getSphereMatrix())
                }

                function t() {
                    o -= .5 * Math.PI, r -= .5 * Math.PI, o = D.radNormalized(o), r = D.radNormalized(r), l = Math.floor(v * o * .5 / Math.PI), p = Math.floor(v * r * .5 / Math.PI), p = p >= v ? v - 1 : p
                }

                function n() {
                    d += .5 * Math.PI, s += .5 * Math.PI, c = Math.floor(P * d / Math.PI), c = 0 > c ? 0 : c, u = Math.floor(P * s / Math.PI), u = u >= P ? P - 1 : u
                }
                if (!0 === ct.curPanorama.hasThumbnailTexture()) {
                    At || ct.curPanorama.hideAllTiles();
                    var i = e ? e : Pt;
                    i.updateWorldMatrix(), i.updateProjectionMatrix();
                    var o, r, d, s, c, u, l, p, m = ct.panoData.imgLayers[ct.curTileLevel],
                        v = m.blockX,
                        P = m.blockY,
                        g = O.fromValues(0, 0),
                        E = O.fromValues(at, 0),
                        h = O.fromValues(0, tt),
                        A = O.fromValues(at, tt),
                        f = O.fromValues(.5 * at, 0),
                        I = O.fromValues(.5 * at, tt),
                        L = O.fromValues(0, .5 * tt),
                        T = O.fromValues(at, .5 * tt),
                        M = a(g),
                        C = a(E),
                        R = a(h),
                        b = a(A),
                        N = a(f),
                        w = a(I),
                        y = a(L),
                        V = a(T),
                        S = X() + .5 * i.fov + ct.panoData.pitch,
                        x = X() - .5 * i.fov + ct.panoData.pitch,
                        W = !1;
                    if (S > 90) {
                        u = P - 1, l = 0, p = v - 1;
                        for (var U = l; p >= U; U++) ua(ct.curPanoId, U, u, ct.curTileLevel);
                        if (d = Math.min(M[1], N[1], C[1]), d += .5 * Math.PI, c = Math.floor(P * d / Math.PI), u > c) {
                            var F = Math.min(R[1], w[1], b[1]);
                            F += .5 * Math.PI;
                            var Y = Math.floor(P * F / Math.PI);
                            if (Y !== u)
                                for (U = l; p >= U; U++)
                                    for (var k = Y; u > k; k++) ua(ct.curPanoId, U, k, ct.curTileLevel);
                            Y > c && (o = la([M[0], y[0], R[0]]), r = pa([C[0], V[0], b[0]]), t(), u = Y - 1, W = !0)
                        }
                    } else if (-90 > x) {
                        c = 0, l = 0, p = v - 1, s = Math.max(R[1], w[1], b[1]), s += .5 * Math.PI, u = Math.floor(P * s / Math.PI);
                        for (var U = l; p >= U; U++) ua(ct.curPanoId, U, c, ct.curTileLevel);
                        if (u > c) {
                            var Z = Math.max(R[1], w[1], b[1]);
                            Z += .5 * Math.PI;
                            var H = Math.floor(P * Z / Math.PI);
                            if (H !== c)
                                for (U = l; p >= U; U++)
                                    for (var k = c + 1; H >= k; k++) ua(ct.curPanoId, U, k, ct.curTileLevel);
                            u > H && (o = la([C[0], V[0], b[0]]), r = pa([M[0], y[0], R[0]]), t(), c = H + 1, W = !0)
                        }
                    } else o = la([M[0], y[0], R[0]]), r = pa([C[0], V[0], b[0]]), d = Math.min(M[1], N[1], C[1]), s = Math.max(R[1], w[1], b[1]), n(), t(), W = !0;
                    if (!0 === W) {
                        var U, k;
                        if (p > l)
                            for (U = l; p >= U; U++)
                                for (k = c; u >= k; k++) ua(ct.curPanoId, U, k, ct.curTileLevel);
                        else {
                            for (U = l; v > U; U++)
                                for (k = c; u >= k; k++) ua(ct.curPanoId, U, k, ct.curTileLevel);
                            for (U = 0; p >= U; U++)
                                for (k = c; u >= k; k++) ua(ct.curPanoId, U, k, ct.curTileLevel)
                        }
                    }
                }
            }

            function ua(e, a, t, n) {
                var i = ct.curPanorama.checkTileExistAndShow(a, t);
                !0 !== i && ct.textureManager.loadTile(e, a, t, n)
            }

            function la(e) {
                var a = s.getMinAndMax(e),
                    t = a.min,
                    n = a.max;
                if (n - t > Math.PI)
                    for (Rt = e.length - 1; Rt >= 0; Rt--) iterator = e[Rt], e[Rt] = Math.PI > iterator ? iterator + 2 * Math.PI : iterator;
                return s.getMin(e)
            }

            function pa(e) {
                var a = s.getMinAndMax(e),
                    t = a.min,
                    n = a.max;
                if (n - t > Math.PI)
                    for (Rt = e.length - 1; Rt >= 0; Rt--) iterator = e[Rt], e[Rt] = Math.PI < iterator ? iterator - 2 * Math.PI : iterator;
                return s.getMax(e)
            }

            function ma(e) {
                var a, t = e.data;
                "FA" == t.catalog.slice(0, 2) ? ct.dispatchEvent({
                    type: n.OVERLAY_MOUSECLICK,
                    data: t
                }) : (a = {
                    id: t.uid,
                    panoId: t.panoId,
                    x: t.mercatorX,
                    y: t.mercatorY,
                    rank: 100 * t.rank,
                    panoX: t.panoX,
                    panoY: t.panoY,
                    heading: 360 - t.heading,
                    pitch: t.pitch,
                    isFromRecommend: !1
                }, ct.gotoPOI(a))
            }

            function va(e) {
                w({
                    iid: e.data.iid
                })
            }

            function Pa(e) {
                var a = e.data;
                if (void 0 !== a.x) {
                    var t = [a.x, a.y, a.z],
                        i = _.worldToViewport(Pt, t, at, tt, !0);
                    a.screenX = i[0], a.screenY = i[1]
                }
                ct.dispatchEvent({
                    type: n.OVERLAY_MOUSECLICK,
                    data: a
                })
            }

            function ga(e) {
                ct.dispatchEvent(e)
            }

            function Ea(e) {
                var a = e.data;
                void 0 !== a.panoId && w({
                    panoId: a.panoId
                })
            }

            function ha(e) {
                var a = e.data;
                dt = a.isRotated ? !0 : !1
            }

            function Aa(e, a, t, i, o) {
                return e ? (fa(), Za(!0, "[StreetscapePanorama] 渲染一帧：开启切换场景动画 TIP or PC"), o = void 0 === o ? !1 : o, void(r.pointCloudAnimation && ct.panoData.hasGroupPointCloud() && !0 !== o ? Ma(e, a, t) : La(e, a, t, i))) : void ct.dispatchEvent({
                    type: n.NO_PANORAMA_ERROR
                })
            }

            function fa() {
                ct.curPanorama.setNavigationVisible(!1), ct.curPanorama.setTopoVisible(!1), B(), K()
            }

            function Ia(e, a) {
                var t = new C(at, tt);
                pt.render(e, a, t), rt = new E(at, tt, t), vt.removeAllChildren(), vt.addChild(rt.getMesh())
            }

            function La(e, a, t, n) {
                ot = t, ct.tipAnimation = new m(qa, Pt, ct.panoData, a, n, _a), ct.tipAnimation.addEventListener(p.TWEEN_START, function() {
                    na(e, F(), X())
                }), ct.tipAnimation.addEventListener(p.TWEEN_END, function() {
                    Ia(vt, Pt), ct.tipAnimation.dispose(), delete ct.tipAnimation, !0 === nt ? (ct.curPanorama.setSphereVisible(!0), Ta()) : l.getInstance.setIsWaitingPreCondition(!0)
                }), vt.addChild(ct.tipAnimation.getMesh()), l.getInstance.executeAnimation(ct.tipAnimation)
            }

            function Ta() {
                if (-100 !== Ct) {
                    if (z(ct.curPanorama), !rt) {
                        if (ct.curPanorama.setSphereVisible(!0), ct.curPanorama.setTopoVisible(!0), ct.curPanorama.setNavigationVisible(!0), ut.setMarkerVisible(!0), void 0 != ct.screenPostion[0] && void 0 != ct.screenPostion[1]) {
                            var e = _.viewportToWorld(Pt, ct.screenPostion, at, tt, 1),
                                a = new b([0, 0, 0], e);
                            Xa(e, ct.screenPostion, a)
                        }
                        return void Za(!0, "不需要渐变时立即显示所有，需要渲染一帧")
                    }
                    ct.curPanorama.setOverlayVisible(!1), ct.curPanorama.setSphereVisible(!0), ct.curPanorama.opacity = 1, ct.fadeOutAnimation = new P(rt, "opacity", 0), ct.fadeOutAnimation.addEventListener(p.TWEEN_END, function() {
                        if (rt && (rt.dispose(), rt = void 0), vt.removeAllChildren(), ct.fadeOutAnimation.dispose(), delete ct.fadeOutAnimation, void 0 !== ot) Oa();
                        else if (Mt) ct.gotoPOI(Mt);
                        else if (void 0 != ct.screenPostion[0] && void 0 != ct.screenPostion[1]) {
                            var e = _.viewportToWorld(Pt, ct.screenPostion, at, tt, 1),
                                a = new b([0, 0, 0], e);
                            Xa(e, ct.screenPostion, a)
                        }
                        ct.curPanorama.setTopoVisible(!0), ct.curPanorama.setNavigationVisible(!0), ut.setMarkerVisible(!0), Za(!0, "渐变动画结束时，显示拓扑等覆盖物，需要渲染一帧"), ct.isBillionPixels && ht && ct.dispatchEvent({
                            type: n.SHOW_BILLION_PIXELS_DIALOG
                        })
                    }), l.getInstance.executeAnimation(ct.fadeOutAnimation)
                }
            }

            function Oa(e, a) {
                if (void 0 !== ot) {
                    var t, n, i = ot.heading,
                        o = ot.pitch,
                        r = [];
                    void 0 !== i && (t = new P(ct, "heading", i, e), t.addEventListener(p.TWEEN_END, function() {
                        ot && (ot.heading = void 0), n || (ot = void 0), t.dispose(), t = void 0, void 0 === n && (Ot ? Va(Ot) : Mt && ct.gotoPOI(Mt))
                    }), r.push(t)), void 0 !== o && (n = new P(ct, "pitch", o, a), n.addEventListener(p.TWEEN_END, function() {
                        ot && (ot.pitch = void 0), ot = void 0, n.dispose(), n = void 0, Ot ? Va(Ot) : Mt && ct.gotoPOI(Mt)
                    }), r.push(n)), 0 < r.length && l.getInstance.executeSynchronousAnimations(r)
                }
            }

            function Ma(e, a, t) {
                void 0 === t && (t = {
                    heading: F(),
                    pitch: X()
                }), ct.pointCloudAnimation = new v(ct, qa, Da(.5), Pt, ct.panoData, a, t, !0), ct.pointCloudAnimation.addEventListener(p.TWEEN_START, function() {}), ct.pointCloudAnimation.addEventListener(p.TWEEN_END, function() {
                    Ia(ct.pointCloudAnimation.getFadeScene(), ct.pointCloudAnimation.getFadeCamera()), ct.pointCloudAnimation.dispose(), delete ct.pointCloudAnimation, !0 === ct.curPanorama.hasThumbnailTexture() ? (ct.curPanorama.setSphereVisible(!0), Ta()) : l.getInstance.setIsWaitingPreCondition(!0), pt.setClearColor(0, 0, 0, 1)
                }), l.getInstance.setIsWaitingPreCondition(!0), setTimeout(function() {
                    ct.pointCloudAnimation && l.getInstance.getIsWaitingPreCondition() && l.getInstance.setIsWaitingPreCondition(!1)
                }, 1e3), l.getInstance.executeAnimation(ct.pointCloudAnimation), setTimeout(function() {
                    na(e, F(), X())
                }, 0)
            }

            function Da(e) {
                var e = void 0 !== e ? e : 1,
                    a = at * e,
                    t = tt * e,
                    n = new C(a, t);
                return pt.render(mt, Pt, n), n
            }

            function _a(e) {
                var e = void 0 !== e ? e : 1,
                    a = D.degToRad(Pt.fov),
                    t = 2 * Math.atan2(tt * e * .5, .5 * tt / Math.tan(a / 2)),
                    n = Pt.clone();
                n.fov = D.radToDeg(t);
                var i = new C(at * e, tt * e);
                return pt.render(mt, n, i), i
            }

            function Ca() {
                z(ct.curPanorama), ct.curPanorama.setOverlayVisible(!1);
                var e = new C(at, tt);
                pt.render(mt, ct.pointCloudAnimation.getTargetCamera(), e), ct.pointCloudAnimation.updateTargetSnapshot(e, ct.panoData), mt.removeChild(ct.curPanorama.getMeshes())
            }

            function Ra(e) {
                w({
                    panoId: e.panoId,
                    heading: e.heading,
                    pitch: e.pitch
                }), Va(e, !1)
            }

            function ba(e) {
                e.panoId === ct.curPanoId ? Na(e) : wa(e)
            }

            function Na(e) {
                var a = 360 - e.heading,
                    t = Math.abs(F() - a),
                    n = Math.abs(X() - e.pitch);
                t > 5 || n > 5 ? (ot = {
                    heading: t > 5 ? ya(a) : void 0,
                    pitch: n > 5 ? e.pitch : void 0
                }, Ot = e, Oa()) : Va(e)
            }

            function wa(e) {
                var a, t = ct.panoData,
                    n = [t.panoX, t.panoY],
                    i = [e.x, e.y],
                    o = ya(360 - s.getHeadingInPlane(n, i));
                a = new P(ct, "heading", o), a.addEventListener(p.TWEEN_END, function() {
                    a.dispose(), a = void 0, o = ya(360 - e.heading);
                    var t = {
                        heading: o,
                        pitch: e.pitch
                    };
                    Ot = e, Aa(e.panoId, [e.panoX, e.panoY], t, void 0, !0)
                }), l.getInstance.executeAnimation(a)
            }

            function ya(e) {
                var a = F(),
                    t = e - a;
                return t > 180 ? e -= 360 : -180 > t && (e += 360), e
            }

            function Va(e, a) {
                Ot = void 0, ct.dispatchEvent({
                    type: n.GO_TO_POI_COMPLETE,
                    data: e
                }), !1 !== a && (st = !1), Mt && ct.gotoPOI(Mt)
            }

            function Sa(e) {
                ct.poiLineAnimation = new P(ut.getPOILine(), "percent", 1, 100), ct.poiLineAnimation.addEventListener(p.TWEEN_END, function() {
                    l.getInstance.setIsWaitingPreCondition(!0), setTimeout(function() {
                        l.getInstance.setIsWaitingPreCondition(!1), ct.poiLineAnimation.dispose(), delete poiLineAnimation, ct.fadeOutAnimation = new P(ut.getPOILine(), "opacity", 0, 100), ct.fadeOutAnimation.addEventListener(p.TWEEN_END, function() {
                            ut.clearPOILine(), ct.fadeOutAnimation.dispose(), delete ct.fadeOutAnimation, ct.dispatchEvent({
                                type: n.DRAW_LINE_COMPLETED,
                                data: e
                            })
                        }), l.getInstance.executeAnimation(ct.fadeOutAnimation)
                    }, 1e3)
                }), l.getInstance.executeAnimation(ct.poiLineAnimation)
            }

            function xa() {
                void 0 !== Dt && ct.panoType !== o.TYPE_INNER && c.loadNavigationRouteData(Dt, ct.panoData.panoX, ct.panoData.panoY, ct.panoData.panoZ).then(function(e) {
                    try {
                        var a = u.parseNavigationRouteData(e)
                    } catch (t) {
                        return
                    }
                    if (-3 === a) return void ct.dispatchEvent({
                        type: n.OUT_OF_NAVIGATION_RANGE
                    });
                    if (!(0 >= a.length)) {
                        var i = ct.panoData.panoX,
                            o = ct.panoData.panoY,
                            r = -1.5;
                        _t = [];
                        for (var d, s = 0, c = a.length; c > s; s++) d = a[s], _t.push([d[0] - i, r, o - d[1]]);
                        ct.curPanorama.setNavigationPoints(_t), !0 === ct.curPanorama.getNavigationVisible() && Za(!0, "导航路线数据来的较晚时，需要渲染一帧")
                    }
                }, function() {})
            }

            function Wa(e) {
                if (!(l.getInstance.getIsAnimating() || l.getInstance.getIsWaitingPreCondition() || dt || o.INTERACTIVE_STATE_CLICKABLE == r.interactiveState || e.ctrlKey || e.altKey || e.shiftKey)) {
                    var a = 45;
                    ct.isBillionPixels && (a = o.BILLIONS_FOVY_VALUE[ct.curZoom - 1] / 1.5);
                    var t = e.keyCode;
                    switch (t) {
                        case 38:
                        case 87:
                            Ua(1);
                            break;
                        case 40:
                        case 83:
                            Ua(-1);
                            break;
                        case 37:
                        case 65:
                            ot = {
                                heading: F() + a,
                                pitch: void 0
                            }, Oa();
                            break;
                        case 39:
                        case 68:
                            ot = {
                                heading: F() - a,
                                pitch: void 0
                            }, Oa()
                    }
                }
            }

            function Ua(e) {
                var a = ct.curPanorama.getTopoPanoDataByDirection(360 - F(), e),
                    t = [a.panoX, a.panoY],
                    n = a.topoDir;
                Aa(a.panoId, t, void 0, n)
            }

            function Fa(e) {
                return l.getInstance.getIsWaitingPreCondition() ? void Za(!1, "[StreetscapePanorama] 取消渲染一帧：进入等待动画状态") : (l.getInstance.execute(e), void(ct.pointCloudAnimation && ct.pointCloudAnimation.getIsAnimating() ? (ct.pointCloudAnimation.render(pt, Pt), Za(!1, "[StreetscapePanorama] 取消渲染一帧：进入点云渲染帧")) : ct.tipAnimation && ct.tipAnimation.getIsAnimating() ? (pt.render(vt, Pt), Za(!1, "[StreetscapePanorama] 渲染一帧：TIP动画渲染自己的Scene")) : ct.fadeOutAnimation && ct.fadeOutAnimation.getIsAnimating() ? (pt.render(mt, Pt), Za(!1, "[StreetscapePanorama] 取消渲染一帧：因为半透明动画时渲染过了"), pt.render(vt, gt, void 0, !1)) : ct.poiLineAnimation && ct.poiLineAnimation.getIsAnimating() ? (pt.render(mt, Pt), Za(!1, "[StreetscapePanorama] 渲染一帧：POI画线动画渲染POI线即可"), pt.render(vt, gt, void 0, !1)) : (ct.headingAnimation && ct.headingAnimation.getIsAnimating() || ct.pitchAnimation && ct.pitchAnimation.getIsAnimating()) && Za(!0, "[StreetscapePanorama] 渲染一帧：TIP动画 或者淡入淡出动画")))
            }

            function Ya(e) {
                void 0 === e.deltaHeading || void 0 === e.deltaPitch || 0 === e.deltaHeading && 0 === e.deltaPitch || (S(e.deltaHeading, e.deltaPitch), ct.curPanorama.getWellLidVisible() && (B(), Za(!0, "[StreetscapePanorama] 渲染一帧：惯性动画隐藏井盖")), ct.curPanorama.getPointCloudVisible() && (K(), Za(!0, "[StreetscapePanorama] 渲染一帧：惯性动画隐藏探面")))
            }

            function Xa(e, a, t) {
                var n, i = ct.panoData.pointCloudData;
                if (void 0 !== i) {
                    var o = _.viewportToTexture(Pt, a, at, tt, ct.curPanorama.getSphereMatrix());
                    n = i.getPlaneBySpherePosition(o)
                }
                if (n && 0 === n.type) j(n, e, a), Za(!0, "[StreetscapePanorama] 渲染一帧：鼠标移动渲染探面"), B();
                else if (!0 === ct.curPanorama.getPointCloudVisible() && (K(), Za(!0, "[StreetscapePanorama] 渲染一帧：探面由显示切换为隐藏")), ct.curPanorama.updateIntersectTopoArrow(t) && Za(!0, "[StreetscapePanorama] 渲染一帧：鼠标移动至箭头上或者离开箭头"), ct.curPanorama.isIntersectTopoArrow(t)) ct.curPanorama.getWellLidVisible() && (B(), Za(!0, "[StreetscapePanorama] 渲染一帧：鼠标与箭头相交"));
                else {
                    var r = H(e, a);
                    !0 === r && Za(!0, "[StreetscapePanorama] 渲染一帧：更新井盖")
                }
            }

            function ka(e) {
                if (ct.curPanorama.isIntersectTopoArrow(e) && ct.curPanorama.getTopoVisible() && !it) {
                    var a = ct.curPanorama.getClickTopoPanoData(e),
                        t = [a.panoX, a.panoY],
                        n = a.topoDir;
                    Aa(a.panoId, t, void 0, n), MapLogReport.send({
                        da_src: "pcmapPanoPG.arrow.click"
                    })
                } else if (!0 === ct.curPanorama.getWellLidVisible()) {
                    var i = ct.curPanorama.getWellLidPosition(),
                        o = i[1];
                    if (0 !== o && !isNaN(o)) {
                        var r = -ct.panoData.deviceHeight / o,
                            d = i[0] * r,
                            s = i[2] * r;
                        isNaN(d) || isNaN(s) || ra(d, s)
                    }
                } else !0 === ct.curPanorama.getPointCloudVisible() && da()
            }

            function Za(e, a) {
                it = e, !0 === r.debug.renderNextFrame && M.log(a)
            }
            h = h || {}, this.url = h.domain || o.DEFAULT_URL, this.tileUrls = void 0 !== h.panoTileUrl ? h.panoTileUrl.split("|") : o.DEFAULT_TILE_URLS, this.udtVersion = h.udtVersion || "", this.maxTileLevel = o.TILE_LEVEL_FIVE, this.curTileLevel = o.TILE_LEVEL_FOUR, this.curZoom = o.ZOOM_MIN, this.isBillionPixels = !1, this.isInZoomChangeAnimation = !1, this.correctionHeading = 0, this.panoJSONData = void 0, this.curPanoId = void 0, this.panoData = {}, this.curIid = void 0, this.innerData = {}, this.curCameraMaxPitch = 90, this.curCameraMinPitch = -90, c.url = this.url, c.udtVersion = this.udtVersion, M.enableLog = !1, M.enableWarnning = !1, M.enableError = !1, R.ShowDebugLine = !1;
            var Ha = document.body.style.webkitUserSelect,
                Ba = document.body.style.mozUserSelect,
                Ga = document.body.style.msUserSelect,
                Ka = document.body.style.userSelect,
                ja = document.body.style.webkitUserDrag,
                za = document.body.style.mozUserDrag,
                Ja = document.body.style.msUserDrag,
                Qa = document.body.style.userDrag;
            document.body.style.webkitUserSelect = "none", document.body.style.mozUserSelect = "none", document.body.style.msUserSelect = "none", document.body.style.userSelect = "none", document.body.style.webkitUserDrag = "none", document.body.style.mozUserDrag = "none", document.body.style.msUserDrag = "none", document.body.style.userDrag = "none";
            var qa = document.createElement("div");
            qa.style.cssText = ["background-color:black", "overflow:hidden", "width:100%", "height:100%", "position:relative"].join(";"), "pano-preview-container" === e.getAttribute("id") && (qa.style.borderRadius = parseInt(e.style.width) / 2 + "px", qa.style.webkitMaskImage = "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAA5JREFUeNpiYGBgAAgwAAAEAAGbA+oJAAAAAElFTkSuQmCC)"), e.appendChild(qa), e.addEventListener("wheel", N), e.addEventListener("mousewheel", N), e.addEventListener("DOMMouseScroll", N);
            var $a, et, at = qa.clientWidth,
                tt = qa.clientHeight,
                nt = !1,
                it = !1;
            this.tipAnimation = void 0, this.pointCloudAnimation = void 0, this.fadeOutAnimation = void 0, this.poiLineAnimation = void 0;
            var ot, rt, dt = !1,
                st = !1,
                ct = this,
                ut = new a(qa);
            ut.addEventListener(n.MARKER_CLICKED, ma), ut.addEventListener(n.ENTRANCE_MARKER_CLICKED, va), ut.addEventListener(n.TAG_MARKER_SUBMIT, ga), ut.addEventListener(n.TAG_MARKER_CLOSE, ga), ut.addEventListener(n.OVERLAY_MOUSECLICK, Pa), ut.addEventListener(n.OVERLAY_MOUSEOVER, ga), ut.addEventListener(n.OVERLAY_MOUSEOUT, ga);
            var lt = window.devicePixelRatio >= 1 ? window.devicePixelRatio : 1,
                pt = new A({
                    premultipliedAlpha: !1,
                    preserveDrawingBuffer: !1,
                    antialias: lt > 1 ? !1 : !0,
                    pixelRatio: lt
                });
            pt.setAutoDisposeProgram(!1), pt.setSize(at, tt), qa.appendChild(pt.domElement);
            var mt = new f,
                vt = new f,
                Pt = new I(o.DEFAULT_FOV_Y, at / tt, .1, 67e3),
                gt = new L(.5 * -at, .5 * at, .5 * tt, .5 * -tt, 0, 11e3),
                Et = new d(qa, Pt);
            Et.addEventListener(n.ZOOM_CHANGED, y), Et.resize(at, tt), Et.enable(!0), this.textureManager = J(this.tileUrls, this.udtVersion), w(h), setTimeout(function() {
                ct.dispatchEvent({
                    type: n.INTERFACE_READY
                })
            }, 0), this.updateDebugPanoId = function(e) {
                ut.updateDebugPanoId(e)
            };
            var ht = !0,
                At = !1;
            Object.defineProperties(this, {
                heading: {
                    get: function() {
                        return F()
                    },
                    set: function(e) {
                        S(e - F(), 0)
                    }
                },
                pitch: {
                    get: function() {
                        return X()
                    },
                    set: function(e) {
                        S(0, e - X())
                    }
                },
                fov: {
                    get: function() {
                        return Pt.fov
                    },
                    set: function(e) {
                        U(e - Pt.fov)
                    }
                }
            });
            var ft = !1,
                It = 0;
            this.showDebugContainer = function() {
                ut.addDebugContainer(), ut.addEventListener(n.CHANGE_PANO_CLICKED, Ea), ut.addEventListener(n.ROTATE_PANO_CLICKED, ha)
            };
            var Lt = null,
                Tt = function() {
                    window.clearTimeout(Lt), Lt = window.setTimeout(function() {
                        0 !== qa.clientWidth && 0 !== qa.clientHeight && (at = qa.clientWidth, tt = qa.clientHeight, Et.resize(at, tt), Pt.aspect = at / tt, gt.left = .5 * -at, gt.right = .5 * at, gt.top = .5 * tt, gt.bottom = .5 * -tt, pt.setSize(at, tt), ut.resize(at, tt), Za(!0, "[StreetscapePanorama] Resize后渲染一帧"))
                    }, 200)
                };
            window.addEventListener("resize", Tt), this.setIsRotatePano = function(e) {
                dt = e
            }, this.getPanoramaJSONData = function() {
                return this.panoJSONData
            }, this.getPanoramaData = function() {
                return this.panoData
            }, this.getPov = function() {
                return {
                    heading: Y(F()),
                    pitch: k(X())
                }
            }, this.setPov = function(e, a) {
                S(e - F(), a - X())
            }, this.getPanoOptions = function() {
                if (void 0 === this.panoData) return {};
                var e = {};
                o.TYPE_STREET === this.panoData.panoType ? (e.x = this.panoData.panoX, e.y = this.panoData.panoY) : (e.x = this.innerData.exitX, e.y = this.innerData.exitY);
                var a = this.getPov();
                return {
                    panoType: this.panoData.panoType,
                    panoId: this.panoData.panoId,
                    panoHeading: s.getFixedDecimal(a.heading, 2),
                    panoPitch: s.getFixedDecimal(a.pitch, 2),
                    panoMCPoint: e,
                    panoZoom: ct.curZoom,
                    mode: "day",
                    maxImgLevel: this.panoData.maxImgLevel
                }
            }, this.getMercatorPosition = function() {
                return {
                    x: this.panoData.panoX,
                    y: this.panoData.panoY
                }
            }, this.getInnerData = function() {
                return this.innerData
            }, this.getZoom = function() {
                return ct.curZoom
            }, this.setZoom = function(e) {
                this.isInZoomChangeAnimation || V(e)
            }, this.isStreet = function() {
                return o.TYPE_STREET === this.panoData.panoType
            }, this.isInner = function() {
                return o.TYPE_INNER === this.panoData.panoType
            }, this.setPanoOptions = function(e) {
                l.getInstance.getIsAnimating() || l.getInstance.getIsWaitingPreCondition() || w(e)
            };
            var Ot, Mt;
            this.gotoPOI = function(e) {
                return e && e.panoId ? void(l.getInstance.getIsAnimating() || l.getInstance.getIsWaitingPreCondition() ? Mt = e : (st = !0, Mt = void 0, isNaN(e.panoX) || isNaN(e.panoY) || isNaN(e.heading) || isNaN(e.pitch) ? Ra(e) : ba(e))) : void ct.dispatchEvent({
                    type: n.NO_PANORAMA_ERROR
                })
            }, this.drawPOILine = function(e) {
                var a, t = [e.pointX - ct.panoData.panoX, e.pointRank / 100, ct.panoData.panoY - e.pointY];
                void 0 !== e.id && "" !== e.id && (a = ut.getMarkerCenterPointByUid(e.id)), t = void 0 !== a ? a : _.worldToViewport(Pt, t, at, tt, !0);
                var n = [e.startX, e.startY];
                ut.setPOILine(n, t), Sa(e)
            }, this.addMarkers = function(e) {
                ut.addMarkers(e)
            }, this.removeMarkers = function(e) {
                ut.removeMarkers(e)
            }, this.getMarkerUidInBestPano = function() {
                return ut.getMarkerUidInBestPano()
            };
            var Dt = void 0,
                _t = void 0;
            this.setRouteParam = function(e) {
                Dt = e, xa()
            }, this.setCursorStyle = function(e) {
                ut.setCursorStyle(e)
            }, this.setInteractiveState = function(e) {
                r.interactiveState = e
            }, this.toggleUI = function(e) {
                r.visible.topo = void 0 !== e.topo ? e.topo : !0, r.visible.wellLid = void 0 !== e.wellLid ? e.wellLid : !0, r.visible.pointCloud = void 0 !== e.pointCloud ? e.pointCloud : !0;
                var a = void 0 !== e.marker ? e.marker : !0;
                !1 === r.visible.wellLid && B(), !1 === r.visible.pointCloud && K(), this.curPanorama.setTopoVisible(r.visible.topo), r.markerVisible.startEnd = a, r.markerVisible.route = a, r.markerVisible.classified = a, r.markerVisible.custom = a, r.markerVisible.operational = a, ut.updateMarkerVisible(), ut.setMouseEnabled(a), Za(!0, "切换UI状态强制渲染一帧")
            }, this.startEnterAnimation = function() {
                var e = X();
                S(0, ct.curCameraMaxPitch - e, !1), ot = {
                    pitch: e
                }, Oa(void 0, 600)
            }, this.dispose = function() {
                window.cancelWebGLAnimFrame(Ct), document.removeEventListener("keydown", Wa), Et.removeEventListener(n.ZOOM_CHANGED, y), Et.enable(!1), Q(this.textureManager), ut.removeEventListener(n.MARKER_CLICKED, ma), ut.removeEventListener(n.ENTRANCE_MARKER_CLICKED, va), ut.removeEventListener(n.TAG_MARKER_SUBMIT, ga), ut.removeEventListener(n.TAG_MARKER_CLOSE, ga), ut.removeEventListener(n.OVERLAY_MOUSECLICK, Pa), ut.removeEventListener(n.OVERLAY_MOUSEOVER, ga), ut.removeEventListener(n.OVERLAY_MOUSEOUT, ga), ut.removeDebugContainer(), pt && pt.setAutoDisposeProgram(!0), this.curPanorama.dispose(), document.body.style.webkitUserSelect = Ha, document.body.style.mozUserSelect = Ba, document.body.style.msUserSelect = Ga, document.body.style.userSelect = Ka, document.body.style.webkitUserDrag = ja, document.body.style.mozUserDrag = za, document.body.style.msUserDrag = Ja, document.body.style.userDrag = Qa, l.getInstance.killAllAnimations(), pt.dispose(), pt.forceContextLoss()
            }, this.stopAnimationFrame = function() {
                window.cancelWebGLAnimFrame(Ct), l.getInstance.killAllAnimations(), Ct = -100
            }, this.startAnimationFrame = function() {
                yt()
            }, document.addEventListener("keydown", Wa);
            var Ct, Rt = 0,
                bt = 0,
                Nt = 0,
                wt = !1,
                yt = function() {
                    var e = Date.now();
                    if (l.getInstance.getIsAnimating() || l.getInstance.getIsWaitingPreCondition() || void 0 !== ct.tipAnimation || void 0 !== ct.pointCloudAnimation) Fa(e - bt), Nt = e, wt = !1, Et.enable(!1);
                    else {
                        Et.enable(!0);
                        var a = Et.update();
                        if (void 0 !== a)
                            if (ct.screenPostion = [a.mouseX, a.mouseY], void 0 !== ct.curPanorama && !0 === nt)
                                if (Ya(a), void 0 !== a.mouseX && void 0 !== a.mouseY) {
                                    var t = [a.mouseX, a.mouseY],
                                        i = _.viewportToWorld(Pt, t, at, tt, 1),
                                        d = new b([0, 0, 0], i);
                                    if (!0 !== a.isClick) ct.curPanorama.getTopoVisible() || (Za(!0, "[StreetscapePanorama] 渲染一帧执行：鼠标移动"), ct.curPanorama.setTopoVisible(!0)), ct.curPanorama.getNavigationVisible() || ct.curPanorama.setNavigationVisible(!0), Xa(i, t, d);
                                    else if (ka(d), o.INTERACTIVE_STATE_CLICKABLE === r.interactiveState) {
                                        var s = T.fromValues(0, 0, 0);
                                        T.scale(s, i, 10), ct.dispatchEvent({
                                            type: n.CLICKED_POSITION,
                                            data: {
                                                x: s[0] + ct.panoData.panoX,
                                                y: s[1],
                                                z: -s[2] + ct.panoData.panoY,
                                                screenX: t[0],
                                                screenY: t[1]
                                            }
                                        })
                                    }
                                    Nt = e, wt = !1
                                } else(void 0 === a.deltaHeading || void 0 === a.deltaPitch || 0 === a.deltaHeading && 0 === a.deltaPitch) && e - Nt >= 5e3 && !1 === wt && (wt = !0, fa(), Za(!0, "[StreetscapePanorama] 渲染一帧执行：自动隐藏覆盖物"));
                        else Nt = e
                    }
                    dt && (S(.1, 0, !0), Et.enable(!1)), !0 === it && (Za(!1, "[StreetscapePanorama] 渲染一帧执行：render"), pt.render(mt, Pt)), bt = e, Ct = window.requestWebGLAnimFrame(yt)
                };
            window.requestWebGLAnimFrame = function() {
                return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(e) {
                    var a = window.setTimeout(e, 1e3 / 60);
                    return a
                }
            }(), window.cancelWebGLAnimFrame = function() {
                return window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || window.oCancelAnimationFrame || window.msCancelAnimationFrame || function(e) {
                    window.clearTimeout(e)
                }
            }(), yt()
        };
    return h.EventDispatcher.prototype.apply(N.prototype), N
});