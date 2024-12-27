festival()

function festival() {
    if (!isFrontEnv()) {
        return
    }
    var url = "/commentViewCount/ajax/holidayPendant";
    var res = '';
    $.ajax({
        type: "GET",
        url: url,
        data: {},
        async: false,
        success: function(data) {
            console.log(data);
            res = JSON.parse(data.holidayPendant)
        }
    });
    // 是否开启飘窗
    if (res && res.isOpen == true) {
        require(['/public/cjgj/restival.js'], function(c) {
            var nTime = new Date().getTime();
            var qxurl = location.href.replace(location.origin, '')
            res.nowTime = nTime
            if (res.location == 1 && qxurl != '/') {
                return
            }
            var canTime = (res.showTime && res.showTime.length == 2 && res.nowTime >= res.showTime[0] && res.nowTime <= res.showTime[1]) || !res.showTime || res.showTime.length == 0
            if (res.isOpen && canTime) {
                c.init(res)
            }
        })
    }
}