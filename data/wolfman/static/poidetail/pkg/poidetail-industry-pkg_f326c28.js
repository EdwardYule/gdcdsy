define("poidetail:widget/industry/caterIndustryMgr.js", function(t, e, i) {
    var a = {
        init: function(t, e) {
            t = this.process(t);
            var i = {};
            i.widgets = [{
                js: "poidetail:widget/ui/generalInfo/generalInfo.js",
                data: t.content
            }, {
                js: "poidetail:widget/ui/figure/figure.js"
            }, {
                js: "poidetail:widget/ui/groupon/groupon.js",
                data: {
                    groupon: t.content.ext.detail_info.groupon || []
                }
            }, {
                js: "poidetail:widget/ui/takeout/takeout.js",
                data: {
                    takeout: t.content.ext.detail_info.takeout || []
                }
            }, {
                js: "poidetail:widget/ui/comment/comment.js",
                data: t.comments
            }, {
                js: "poidetail:widget/ui/generalSummary/generalSummary.js",
                data: t.content
            }, {
                js: "poidetail:widget/ui/fatherson/fatherson.js",
                data: t
            }, {
                js: "poidetail:widget/ui/link/link.js",
                data: t
            }, {
                js: "poidetail:widget/ui/businessFeedback/businessFeedback.js",
                data: t.content
            }], t.industry = "cater", i.pageData = t, e(i)
        },
        process: function(t) {
            return t
        }
    };
    i.exports = a
});;
define("poidetail:widget/industry/hotelIndustryMgr.js", function(e, t, i) {
    var n = {
        init: function(e, t) {
            e = this.process(e);
            var i = {};
            i.widgets = [{
                js: "poidetail:widget/ui/generalInfo/generalInfo.js",
                data: T.extend(e.content, {
                    blockTel: !1
                })
            }, {
                js: "poidetail:widget/ui/figure/figure.js"
            }, {
                js: "poidetail:widget/ui/comment/comment.js",
                data: T.extend(e.comments, {
                    blockInvalidRate: !0
                })
            }, {
                js: "poidetail:widget/ui/fatherson/fatherson.js",
                data: e
            }, {
                js: "poidetail:widget/ui/link/link.js",
                data: e
            }, {
                js: "poidetail:widget/ui/businessFeedback/businessFeedback.js",
                data: e.content
            }], e.industry = "hotel", i.pageData = e, t(i)
        },
        process: function(e) {
            return e
        }
    };
    i.exports = n
});;
define("poidetail:widget/industry/houseIndustryMgr.js", function(e, i, t) {
    var s = {
        init: function(e, i) {
            e = this.process(e);
            var t = {};
            t.widgets = [{
                js: "poidetail:widget/ui/generalInfo/generalInfo.js",
                data: T.extend(e.content, {
                    blockTel: !1
                })
            }, {
                js: "poidetail:widget/ui/houseDetail/houseDetail.js"
            }, {
                js: "poidetail:widget/ui/figure/figure.js"
            }, {
                js: "poidetail:widget/ui/comment/comment.js",
                data: T.extend(e.comments, {
                    blockInvalidRate: !0
                })
            }, {
                js: "poidetail:widget/ui/fatherson/fatherson.js",
                data: e
            }, {
                js: "poidetail:widget/ui/link/link.js",
                data: e
            }, {
                js: "poidetail:widget/ui/businessFeedback/businessFeedback.js",
                data: e.content
            }], e.industry = "hotel", t.pageData = e, i(t)
        },
        process: function(e) {
            return e
        }
    };
    t.exports = s
});;
define("poidetail:widget/industry/lifeIndustryMgr.js", function(e, t, i) {
    var n = {
        init: function(e, t) {
            e = this.process(e);
            var i = {};
            if (i.widgets = [{
                    js: "poidetail:widget/ui/generalInfo/generalInfo.js",
                    data: e.content
                }, {
                    js: "poidetail:widget/ui/figure/figure.js"
                }, {
                    js: "poidetail:widget/ui/groupon/groupon.js",
                    data: {
                        groupon: e.content.ext.detail_info.groupon || []
                    }
                }, {
                    js: "poidetail:widget/ui/comment/comment.js",
                    data: e.comments
                }, {
                    js: "poidetail:widget/ui/generalSummary/generalSummary.js",
                    data: e.content
                }, {
                    js: "poidetail:widget/ui/fatherson/fatherson.js",
                    data: e
                }, {
                    js: "poidetail:widget/ui/link/link.js",
                    data: e
                }, {
                    js: "poidetail:widget/ui/businessFeedback/businessFeedback.js",
                    data: e.content
                }], e.content && e.content.ext && (e.originIndustry = e.content.ext.src_name), map.temp.ifSupportWebGL && e.content && e.content.uid) {
                var n = e.content.uid,
                    a = map.temp.scenic3dPoints;
                if (a)
                    for (var o = 0; o < a.length; o++)
                        if (a[o].uid === n) {
                            i.widgets.splice(5, 1);
                            break
                        }
            }
            if (e.content && e.content.uid && map.temp.ifSupportWebGL) {
                var n = e.content.uid,
                    a = map.temp.scenic3dPoints;
                if (a)
                    for (var o = 0; o < a.length; o++)
                        if (a[o].uid === n) {
                            e.content.scenic3dName = a[o].className;
                            var s = {
                                js: "poidetail:widget/ui/scenic3dBanner/scenic3dBanner.js",
                                data: e.content
                            };
                            i.widgets.splice(1, 0, s);
                            break
                        }
            }
            e.industry = "life", i.pageData = e, t(i)
        },
        process: function(e) {
            return e
        }
    };
    i.exports = n
});;
define("poidetail:widget/industry/movieIndustryMgr.js", function(e, i, t) {
    var o = {
        init: function(e, i) {
            e = this.process(e);
            var t = {};
            t.widgets = [{
                js: "poidetail:widget/ui/generalInfo/generalInfo.js",
                data: e.content
            }, {
                js: "poidetail:widget/ui/figure/figure.js"
            }, {
                js: "poidetail:widget/ui/movietickets/movietickets.js",
                data: {
                    movies: e.content.ext.other_info.base || [],
                    firstMovie: e.content.movieInfo || []
                }
            }, {
                js: "poidetail:widget/ui/groupon/groupon.js",
                data: {
                    groupon: e.content.ext.detail_info.groupon || []
                }
            }, {
                js: "poidetail:widget/ui/comment/comment.js",
                data: e.comments
            }, {
                js: "poidetail:widget/ui/generalSummary/generalSummary.js",
                data: e.content
            }, {
                js: "poidetail:widget/ui/fatherson/fatherson.js",
                data: e
            }, {
                js: "poidetail:widget/ui/link/link.js",
                data: e
            }, {
                js: "poidetail:widget/ui/businessFeedback/businessFeedback.js",
                data: e.content
            }], e.industry = "movie", t.pageData = e, i(t)
        },
        process: function(e) {
            return e
        }
    };
    t.exports = o
});;
define("poidetail:widget/industry/scopeIndustryMgr.js", function(e, t, i) {
    var n = {
        init: function(e, t) {
            e = this.process(e);
            var i = {};
            if (i.widgets = [{
                    js: "poidetail:widget/ui/generalInfo/generalInfo.js",
                    data: e.content
                }, {
                    js: "poidetail:widget/ui/figure/figure.js"
                }, {
                    js: "poidetail:widget/ui/generalSummary/generalSummary.js",
                    data: e.content
                }, {
                    js: "poidetail:widget/ui/scopetickets/scopetickets.js",
                    data: {
                        tickets: e.content.ext.rich_info.scope_ticket || []
                    }
                }, {
                    js: "poidetail:widget/ui/groupon/groupon.js",
                    data: {
                        groupon: e.content.ext.detail_info.groupon || []
                    }
                }, {
                    js: "poidetail:widget/ui/comment/comment.js",
                    data: e.comments
                }, {
                    js: "poidetail:widget/ui/fatherson/fatherson.js",
                    data: e
                }, {
                    js: "poidetail:widget/ui/link/link.js",
                    data: e
                }, {
                    js: "poidetail:widget/ui/businessFeedback/businessFeedback.js",
                    data: e.content
                }], map.temp.ifSupportWebGL && e.content && e.content.uid) {
                var n = e.content.uid,
                    o = map.temp.scenic3dPoints;
                if (o)
                    for (var s = 0; s < o.length; s++)
                        if (o[s].uid === n) {
                            i.widgets.splice(6, 1);
                            break
                        }
            }
            if (e.content && e.content.ext && e.content.ext.route && e.content.ext.route.length > 0) {
                var a = {
                    js: "poidetail:widget/ui/scopeRecommend/scopeRecommend.js",
                    data: e.content
                };
                i.widgets.splice(3, 0, a)
            }
            if (e.content && e.content.uid && map.temp.ifSupportWebGL) {
                var n = e.content.uid,
                    o = map.temp.scenic3dPoints;
                if (o)
                    for (var s = 0; s < o.length; s++)
                        if (o[s].uid === n) {
                            e.content.scenic3dName = o[s].className;
                            var d = {
                                js: "poidetail:widget/ui/scenic3dBanner/scenic3dBanner.js",
                                data: e.content
                            };
                            i.widgets.splice(1, 0, d);
                            break
                        }
            }
            e.industry = "scope", i.pageData = e, t(i)
        },
        process: function(e) {
            return e
        }
    };
    i.exports = n
});