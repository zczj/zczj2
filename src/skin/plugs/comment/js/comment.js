/*
* @Author: suzhihui
* @Date:   2016-08-24 15:00:45
* @Last Modified by:   suzhihui
* @Last Modified time: 2016-08-24 17:56:15
*/

;(function() {
    $('.comment_post_t textarea').focus(function() {
        $(this).animate({
            'height':4.8+'rem'
        },300)
    });
    // $('.comment_post_t textarea').blur(function() {
    //     $(this).animate({
    //         'height':1.6+'rem'
    //     },300)
    // });
})();
;(function() {
    $('.comment_replay').each(function(i, el) {
        $(el).click(function() {
            $('.comment_list_replay').eq(i).toggle();
        })
    });
})();