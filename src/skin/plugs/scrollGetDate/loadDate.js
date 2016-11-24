;
(function() {
    if (!$('#imgConfig')) {return;}
    var pageList = [];
    var categoryList = [];
    //缓存dom数据
    var domCache = [];
    var curIndex = 0;

    $('.btn_tab a').each(function(i, el) {
        pageList.push($(el).data('page'));
        categoryList.push($(el).data('category'));
        domCache.push('');
    })
    domCache[0] = $('.zx_items').html();
    //console.log(pageList);
    //console.log(categoryList);
    //获取数据
    function getData(category, iPage, scroll) {
        if (!category) {
            category = categoryList[0]
        }
        var iBtn = true;
        if (!iBtn) {
            return;
        }
        iPage++;
        pageList[curIndex] = iPage;
        //console.log(pageList, categoryList);
        $('#loading_laosu').show();
        $.post("/news/NewsList", {
            category: category,
            page: iPage
        }, function(data) {
            if (data.ErrMsg != undefined) {
                console.log(data.ErrMsg);
                return;
            }
            if (scroll) {
                $('.zx_items').append(ChangeDom(data));
            } else {
                $('.zx_items').html(ChangeDom(data));
            }


            setTimeout(function(){
                $('#loading_laosu').hide();
                iBtn = false;
            },1000)

            //缓存数据
            domCache[curIndex] = $('.zx_items').html();


        });
    }
    $(".btn_tab a").each(function(i, el) {
        $(el).click(function() {
            curIndex = i;
            var _this = $(el);
            if (checkFistLoad(_this, i)) {
                //console.log('首次加载！');
                getData(_this.data('category'), _this.data('page'));
            } else {
                //console.log('非首次加载！');
                //取缓存数据
                $('.zx_items').html(domCache[curIndex]);
                return;
            }
        })
    })

    //检测是否是第一次加载
    function checkFistLoad(obj, index) {
        return obj.data('page') === pageList[index] && obj.data('page') === 0;
    }

    //滚动加载
    $(window).on('scroll', function() {
        var iH = $(window).scrollTop() + $(window).innerHeight();
        if ($('.zx_main').innerHeight() - 50 < iH) {
            getData(categoryList[curIndex], pageList[curIndex], true);
        }
    })

})();


function ChangeDom(data) {
    var datastr = "",
        imgConfig = $('#imgConfig').val(),
        imgA = imgConfig + 'counseling/',
        imgStyle1 = "@1e_1c_0o_0l_136h_220w_90q.src", //一般模式图的尺寸
        imgStyle2 = "@1e_1c_0o_0l_165h_242w_90q.src", //图文模式图的尺寸
        imgStyle3 = "@1e_1c_0o_0l_300h_400w_90q.src"; //单图模式图的尺寸
    for (var i = 0; i < data.NewsList.length; i++) {
        var news = data.NewsList[i];
        var oImg = $('<img />');
        if (news.DisplayMode == 1 || news.DisplayMode == 0) { //一般模式

            datastr += "<div class=\"zx_news_item\"><div class=\"zx_itme_con cf\"><div class=\"l\"><a href=\"/news/" + news.DateStr + "/content_" + news.NewsID + ".html\">" + "<span class=\"tag\">" + news.CategoryName + "</span>"
            var ImgPath1 = "";
            if (news.newimages != null && news.newimages.length > 0) {
                var arr = news.newimages.split('|');
                ImgPath1 = arr[0];
            }
            datastr += "<img src=\"" + imgA + ImgPath1 + imgStyle1 + "\" alt=\"\"/></a>" + "</div><div class=\"r\"><a href=\"/news/" + news.DateStr + "/content_" + news.NewsID + ".html\" target=\"_blank\" class=\"title\">" + news.newtitle + "</a>" + " <div class=\"txt\">" + news.newsynopsis + "</div><div class=\"item_bar cf\"><div class=\"l cf\"><span class=\"f_blue\">"
            var newman = "";
            if (news.newman == null || news.newman.length == 0) { //如果没有作者，就显示来源
                newman = news.newfrom;
            } else {
                newman = news.newman;
            }
            datastr += newman + "</span><span>" + news.DateForm + "</span></div>" + "<div class=\"r\"><span class=\"no_cirl\"><i class=\"zczj icon-zan\"></i>(" + news.newpoint + ")</span><span><i class=\"zczj icon-msg\"></i></span></div></div></div></div></div>";
        } else if (news.DisplayMode == 2) { //图文模式
            datastr += "<dl class=\"lightBox_item\"><a href=\"/news/" + news.DateStr + "/content_" + news.NewsID + ".html\"class=\"title ellipsis\"target=\"_blank\">" + news.newtitle + "</a>" + "<div class=\"text\">" + news.newsynopsis + "</div><ul class=\"light_img cf\">"
            var ImgPath1 = "",
                ImgPath2 = "",
                ImgPath3 = "";
            if (news.newimages != null && news.newimages.length > 0) {
                var arr = news.newimages.split('|');
                if (arr.length > 0) {
                    ImgPath1 = arr[0];
                }
                if (arr.length > 1) {
                    ImgPath2 = arr[1];
                }
                if (arr.length > 2) {
                    ImgPath3 = arr[2];
                }
            }

            datastr += "<li class=\"ml0\"><span class=\"tag\">" + news.CategoryName + "</span><a href=\"/news/" + news.DateStr + "/content_" + news.NewsID + ".html\" class=\"\" target=\"_blank\"><img src=\"" + imgA + ImgPath1 + imgStyle2 + "\" alt=\"\" /></a></li>" + "<li><span class=\"tag\">" + news.CategoryName + "</span><a href=\"/news/" + news.DateStr + "/content_" + news.NewsID + ".html\" class=\"\" target=\"_blank\"><img src=\"" + imgA + ImgPath2 + imgStyle2 + "\" alt=\"\" /></a></li>" + "<li><span class=\"tag\">" + news.CategoryName + "</span><a href=\"/news/" + news.DateStr + "/content_" + news.NewsID + ".html\" class=\"\" target=\"_blank\"><img src=\"" + imgA + ImgPath3 + imgStyle2 + "\" alt=\"\" /></a></li>" + "</ul><div class=\"item_bar cf\"><div class=\"l cf\"><span class=\"f_blue\">"
            var newman = "";
            if (news.newman == null || news.newman.length == 0) { //如果没有作者，就显示来源
                newman = news.newfrom;
            } else {
                newman = news.newman;
            }
            datastr += newman + "</span><span>" + news.DateForm + "</span></div>" + "<div class=\"r\"><span class=\"no_cirl\"><i class=\"zczj icon-zan\"></i>(" + news.newpoint + ")</span><span><i class=\"zczj icon-msg\"></i></span></div></div></dl>";

        } else if (news.DisplayMode == 3) { //单图模式
            var ImgPath1 = "",
                ImgPath2 = "";
            if (news.newimages != null && news.newimages.length > 0) {
                var arr = news.newimages.split('|');
                if (arr.length > 0) {
                    ImgPath1 = arr[0];
                }
                if (arr.length > 1) {
                    ImgPath2 = arr[1];
                }
            }


            datastr += "<ul class=\"zx_news_minBrand cf\"><li class=\"ml0\">" + "<a href=\"/news/" + news.DateStr + "/content_" + news.NewsID + ".html\" target=\"_blank\">" + "<img src=\"" + imgA + ImgPath1 + imgStyle3 + "\" alt=\"\"/><span class=\"text\">" + news.newtitle + "</span><spanclass=\"mask_layer\"></span></a></li>" + "<li><a href=\"/news/" + news.DateStr + "/content_" + news.NewsID + ".html\" target=\"_blank\"><img src=\"" + imgA + ImgPath2 + imgStyle3 + "\" alt=\"\" /><span class=\"text\">" + news.newtitle + "</span><span class=\"mask_layer\"></span></a></li></ul>";
        }
    }
    return datastr;
}