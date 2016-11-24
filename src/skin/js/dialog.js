/*
* @Author: suzhihui
* @Date:   2016-08-15 13:46:13
* @Last Modified by:   Administrator
* @Last Modified time: 2016-09-19 16:51:03
*/

var dialog = {
    // 错误弹出层
    error: function(message) {
        layer.open({
            content:message,
            icon:2,
            title : '错误提示',
        });
    },

    //成功弹出层
    success : function(message,url) {
        layer.open({
            content : message,
            icon : 1,
            yes : function(){
                location.href=url;
            },
        });
    },

    // 确认弹出层

    confirm : function(message, url) {
        layer.open({
            content : message,
            icon:3,
            btn : ['是','否'],
            yes : function(){
                location.href=url;
            },
        });
    },

    //无需跳转到指定页面的确认弹出层
    toconfirm : function(message) {
        layer.open({
            content : message,
            icon:3,
            btn : ['确定'],
        });
    },

    popFn:function (html) {
        //自定页
        layer.open({
          type: 1,
          skin: 'layui-layer-demo', //样式类名
          closeBtn: 0, //不显示关闭按钮
          shift: 2,
          shadeClose: true, //开启遮罩关闭
          content: html
        });
    },

    //成功不跳转页面
    isOk:function (msg) {
        layer.open({
            content:msg,
            icon:1,
            title : '温馨提示',
        });
    }
}

