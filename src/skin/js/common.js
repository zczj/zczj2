/*
* @Author: suzhihui
* @Date:   2016-09-05 13:06:00
* @Last Modified by:   Administrator
* @Last Modified time: 2016-09-29 17:29:35
*/

;(function(){
        $('.btn_tab a').each(function(i,el) {
            $(el).click(function() {
                // dialog.toconfirm(i)
                $(el).addClass('cur').siblings().removeClass('cur')
                $('.box_tab').eq(i).show().siblings('.box_tab').hide();
            })
        })
})('tab切换');

;(function() {
    var old_H = $('.footer_link_keys').innerHeight();
    if (old_H>=150) {
        $('.footer_link_keys').addClass('over');
        $('.footer_link_keys').css({
            'height':150+'px',
            'overflow':'hidden'
        });
    }
    $('.show_link_btn span').click(function () {
        var _self = $(this),
            cur_obj = $('.footer_link_keys');
        if (cur_obj.hasClass('over')) {
            cur_obj.animate({
                'height': old_H
            },300,function(){
                _self.html('收起');
                cur_obj.removeClass('over');
            })
        }else{
            cur_obj.animate({
                'height': 150+'px'
            },300,function(){
                _self.html('查看更多');
                cur_obj.addClass('over');
            })
        }
    })
})();

// ;(function () {
//     $('.zxkf').click(function () {
//         layer.open({
//           type: 2,
//           title: '众筹之家-在线客服',
//           shadeClose: true,
//           shade: 0.8,
//           area: ['998px', '701px'],
//           content: 'http://p.qiao.baidu.com//im/index?siteid=7347981&ucid=10455286' //iframe的url
//         });
//         return false;
//     })
// })('客户跳转');