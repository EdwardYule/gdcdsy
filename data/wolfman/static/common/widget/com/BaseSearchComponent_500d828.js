define("common:widget/com/BaseSearchComponent.js", function(e, t, i) {
    function o(e) {
        e = e || {}, n.call(this, e), this.cinfo = e.cinfo || {}, this.MAX_RESULT_COUNT = 760, this.itemsPerPage = 10, this.curSelA = null, this.cmdNo = 45, this.sCityCode = 0, this.sCityName = "", this.reIndex = [], this.beforeInt(), this.setPanoStatus(e), this.setPlaceData(), this.setSateState()
    }

    function s(e) {
        return 11 != e.type && 1 == e.op_gel
    }
    var n = e("common:widget/com/MapComponent.js"),
        a = e("common:widget/ui/config/config.js"),
        r = e("common:widget/ui/util/util.js"),
        c = e("common:widget/search/SearchUrlParam.js"),
        l = e("common:widget/search/filters/SearchFilter/FilterConfig.js"),
        u = e("common:widget/ui/genericRequest/GenericRequest.js");
    window.GRControll || (window.GRControll = new u({}));
    var h = (a.mapConfig, a.modelConfig),
        d = (l.movieReg, l.hasFilterReg);
    T.inherits(o, n, "BaseSearch"), T.extend(o.prototype, {
        beforeInt: function() {
            {
                var e = this.json,
                    t = e.result;
                e.content
            }
            this.curKw = t.return_query || t.wd, this.what = t.what || t.wd, this.sugKw = t.wd2 || "", this.isGRequest = s(t), window.GRControll.isGRequest = this.isGRequest, this.cmdNo = t.cmd_no, this.business_scope_type = t.business_scope_type, e.current_city ? (this.sCityCode = e.current_city.code, this.sCityName = e.current_city.name, this.ctype = e.current_city.type) : (this.sCityCode = h.cityCode, this.sCityName = h.cityName);
            var i = r.getParam("?qt=" + window.currentComponent.modelQuery);
            i && i.gr_radius && (window.GRControll.GRCircleRadius = i.gr_radius)
        },
        render: function() {
            try {} catch (e) {
                "undefined" != typeof alog && alog("exception.fire", "catch", {
                    msg: e.message || e.description,
                    path: "common:widget/com/BaseSearchComponent.js",
                    ln: 100
                })
            }
        },
        initialize: function() {
            try {} catch (e) {
                "undefined" != typeof alog && alog("exception.fire", "catch", {
                    msg: e.message || e.description,
                    path: "common:widget/com/BaseSearchComponent.js",
                    ln: 105
                })
            }
        },
        unload: function() {
            window.clearClarify && clearClarify(), window.GRControll.clearCache(), this.clearGrStatus(), this.clearPlace(), n.prototype.unload.apply(this)
        },
        setPanoStatus: function(e) {
            {
                var t = (e.from || "", this.cinfo.genRequestKey, this.cinfo || {});
                t.isClickNextPage, t.isFilter || !1
            }
            window.PanoMap && window.PanoMap.isOpen && !window.GRControll.isGRequest && PanoMap.hide()
        },
        setPlaceData: function() {
            var e = this.json;
            e.place_info && (place.result = d.test(e.place_info.d_data_type), place.categoryType = e.place_info.d_data_type, c.setPlaceParams(e)), place.place_dateType = null, place.urlParams = ""
        },
        setGrRequest: function(e) {
            var t = this.json;
            if (38 === t.result.type && map.getZoom() > 10 && (this.isGRequest = !0), this.isGRequest) {
                if (window.GRControll.setGRequestFlg(500), window.GRControll.setGRData(this.json, {
                        cinfo: this.cinfo,
                        pageReq: e,
                        guid: this.guid
                    }), this.cinfo && this.cinfo._index && this.cinfo._index.indexOf("uid,") >= 0) {
                    var i = this.cinfo._index.split("uid,")[1];
                    window.GRControll.sendInfoRequest(i)
                }
            } else 38 == t.result.type && (window.GRControll.clearCache(), window.GRControll.clearGRMap())
        },
        setSateState: function() {
            var t = e("common:widget/ui/sateCityList/SateCityList.js");
            1 === this.json.result.pattern_sign && t.isSateMapSupportCity(this.sCityCode) && (map.setMapType(BMAP_SATELLITE_MAP), map.showStreetLayer(!0))
        },
        clearGrStatus: function() {
            if (11 != this.json.result.type && window.GRControll.clearCache(), this.json && this.json.result) {
                var e = this.json.result.type;
                36 != e && 38 != e && 39 != e && (GRControll.clearGRMap(), GRControll.clearListener(), GRControll.clearCache())
            }
            this.json = null
        },
        clearPlace: function() {
            place.result = !1, place.place_dateType = null, c.clearParams()
        }
    }), i.exports = o
});