var laosu = {};
laosu.ui = {};



laosu.tools = {}

laosu.tools.changeEmpty = function(str) {
    return str == '';
}
laosu.tools.showEle = function(Ele) {
    Ele.toggle();
}
laosu.tools.checkLogin = function(ele, url) {
    if (laosu.tools.changeEmpty(ele)) {
        location = "/passport/login?url=" + url;
    }
}
/**
 * 计算滚动定位元素高度
 * @Author: 老苏
 * @param   {[type]} obj     右侧 side元素
 * @param   {Array} obj_fix 要定位的数组元素
 * @param   {int} cut_H   自定义高度
 * @return  {[type]}         无
 */
laosu.tools.posFix = function(obj, obj_fix, cut_H) {
    var cut_H = cut_H ? cut_H : 0,
        warp_H = parseInt(obj.innerHeight()) + cut_H,
        warp_w = obj.innerWidth();
        console.log(obj_fix);
    if (Object.prototype.toString.call(obj_fix) !== '[object Array]') {
        console.error('posFix obj_fix 参数为数组');
        return;
    }
    $(window).on('scroll', function() {
        var scrollTop = $(window).scrollTop();
        if (scrollTop > warp_H) {
            for (var i = 0; i < obj_fix.length; i++) {
                obj_fix[i].css({
                    'position': 'fixed',
                    'top': numPixH(obj_fix, i),
                    'width':warp_w
                })

            }
        } else {
            for (var i = 0; i < obj_fix.length; i++) {
                obj_fix[i].css({
                    'position': 'static'
                })
            }
        }
    })

    //计算多定位元素高度
    function numPixH(arr_obj, index) {
        var numH = 0;
        for (var i = 0; i < index; i++) {
            numH += (parseInt(arr_obj[i].innerHeight())+40);
        }
        return numH;
    }
}