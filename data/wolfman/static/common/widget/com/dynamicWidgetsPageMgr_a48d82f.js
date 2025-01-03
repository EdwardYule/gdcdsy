define("common:widget/com/dynamicWidgetsPageMgr.js", function(e, t, n) {
    function i(e) {
        T.lang.Class.call(this), this.opts = e || {}, this._listener = {}, this.resources = [], this.widgetIndex = 0, this.widgetContainerIndex = 0
    }
    T.inherits(i, T.lang.Class, "DynamicWidgetsPageMgr"), T.extend(i.prototype, {
        setOpts: function(e) {
            e = e || {}, this.opts = T.extend(this.opts, e)
        },
        createContainer: function(e, t) {
            t = t || "", this.container = T("<div></div>"), this.container.addClass(t)
        },
        analysisResource: function(e, t, n) {
            t = t || this.container, n = n || this;
            for (var i in e) {
                var r = e[i],
                    a = r.wrapClass || "";
                if (r.children) {
                    var s = n.getWidgetContainerIndex(),
                        o = T('<div class="dynamic-widget-container-' + s + '"></div>');
                    arguments.callee(r.children, o, n)
                } else {
                    var s = n.getWidgetIndex(),
                        o = T('<div class="dynamic-widget-' + s + '"></div>'),
                        d = {};
                    d.js = r.js, d.data = r.data, d.index = s, n.resources.push(d)
                }
                o.addClass(a), t.append(o)
            }
        },
        getWidgetIndex: function() {
            return this.widgetIndex++
        },
        getWidgetContainerIndex: function() {
            return this.widgetContainerIndex++
        },
        buildPage: function(t) {
            var n = this,
                i = this.opts.widgets,
                r = [],
                a = [],
                s = ["render"],
                o = n.opts.pageData || {},
                d = n.opts.containerClass || "";
            n.createContainer(i, d), n.analysisResource(i);
            for (var c = 0, g = n.resources.length; g > c; c++) {
                var p = n.resources[c];
                r.push(p.js), a.push(p.data || {})
            }
            try {
                e.async(r, function() {
                    n.trigger("resourceReady");
                    for (var e = 0, i = arguments.length; i > e; e++) {
                        var r = arguments[e],
                            d = new r;
                        if (!n.implementCheck(d, s)) {
                            var c = "Widget must implement functions [" + s.join(",") + "]";
                            throw new Error(c)
                        }
                        var g = T.object.clone(o),
                            p = T.extend(g, a[e]);
                        if (d.setPageData(p), "figure" !== d.name)
                            if ("comment" !== d.name) {
                                var l = d.render(p),
                                    u = n.container.find(".dynamic-widget-" + e);
                                u.append(T(l)), d.renderComplete && d.renderComplete(u, t)
                            } else var h = T.object.clone(d),
                                m = p,
                                f = e;
                        else var v = T.object.clone(d),
                            w = p,
                            C = e
                    }
                    if (n.trigger("renderComplete"), !o || "unify" !== o.industry) {
                        var y = (o.content.ext.src_name, o.content.uid),
                            x = "https://ugcapi.baidu.com/richindex/2/",
                            I = x + "photo?from=map_pc&pageCount=10&pcevaname=pc4.1&uid=" + y + "&t=" + (new Date).getTime();
                        window.AUTH && (I += "&auth=" + encodeURIComponent(window.AUTH)), window.SECKEY && (I += "&seckey=" + encodeURIComponent(window.SECKEY)), T.jsonp(I, function(e) {
                            if (v && e && e.data) {
                                var i = T.extend(w, e.data);
                                v.setPageData(i);
                                var r = v.render(i),
                                    a = n.container.find(".dynamic-widget-" + C);
                                a.append(T(r)), v.renderComplete && v.renderComplete(a, t)
                            }
                        }), T.jsonp(x + "comment?pageIndex=1&pageCount=10&pic_videos=0&tab=1&from=map_pc&uid=" + y + "&t=" + (new Date).getTime(), function(e) {
                            if (h && e && e.data) {
                                var i = T.extend(m, e.data);
                                h.setPageData(i);
                                var r = h.render(i),
                                    a = n.container.find(".dynamic-widget-" + f);
                                a.append(T(r)), h.renderComplete && h.renderComplete(a, t)
                            }
                        })
                    }
                })
            } catch (l) {
                throw new Error(l)
            }
        },
        getPageDom: function() {
            return this.container
        },
        implementCheck: function(e, t) {
            for (var n = t.length - 1; n >= 0; n--)
                if (!e[t[n]]) return !1;
            return !0
        },
        addEventListener: function(e, t) {
            this._listener[e] = this._listener[e] || [], this._listener[e].push(t)
        },
        trigger: function() {
            var e = Array.prototype.slice.call(arguments),
                t = e.shift();
            if (this._listener[t])
                for (var n = this._listener[t].length - 1; n >= 0; n--) try {
                    this._listener[t][n].apply(this, e)
                } catch (i) {
                    throw new Error(i)
                }
        }
    }), n.exports = i
});