function Sld(){
    this.settings={
        auto:true,
        interval:5e3,
        point:true,
        resize:true,
        resetH:false
    };
}
Sld.prototype.init=function(oParent,opt){
    $.extend(this.settings,opt);
    this.oParent=$('.'+oParent);
    this.width=this.oParent.width();
    this.curIndex=0;
    this.$ul=this.oParent.find('.slider-content');
    this.$li=this.$ul.children('li');
    this.$li.eq(0).css({'left':0})
    this.length=this.$li.length;
    this.$ctrl_dot=this.oParent.find('.ctrl-dot')
    if(this.settings.point){
       for (var i=0;i<this.length;i++){
        $('<span></span>').appendTo(this.$ctrl_dot);
        };
    }

    this.$dot=this.oParent.find('.ctrl-dot').children();
    this.$dot.eq(0).addClass('active');
    this.$prev=this.oParent.find('.prev');
    this.$next=this.oParent.find('.next');
    this.$img=this.oParent.find('img');
    this.$tip=this.oParent.parent().find('.new-index-tips');

    this.$tip.html('1/'+this.length+'<span>'+this.$li.find('a:first').attr('title')+'</span>');
    this.autoTime=null;
    if (this.length>1) {
        this._bindEvent();
        if (this.settings.auto) {
            this._start();
        }
    };
    if (this.settings.resetH) {
        var aA=this.$li.eq(this.curIndex).find('a')
            var lenjb=Math.ceil(aA.size()/4)*aA.eq(0).height()+30;
             this.oParent.animate({height: lenjb}, 100);
        this.oParent.css({height:lenjb})
    };
}
Sld.prototype._bindEvent=function() {
    var This=this;
    if (This.settings.auto) {
        This.oParent.hover(function() {
            This._stop();
        }, function() {
            This._start();
        })
    }
    This.oParent.hover(function() {
        This.$prev.stop(true).fadeIn(100,function(){
            This.$prev.animate({opacity: 1},100);
        });
        This.$next.stop(true).fadeIn(100,function(){
            This.$next.animate({opacity: 1},100);
        });
    }, function() {
        This.$prev.stop(true).fadeOut();
        This.$next.stop(true).fadeOut();
    });
    This.$prev.on('click', function() {
        This.prev();
    })
    This.$next.on('click', function() {
        This.next();
    })
    This.$dot.on('click', function(ev) {
        ev.stopPropagation();
        var e = $(this);
        if (!e.hasClass('active')) {
            var n = $(this).index();
            This.setIndex(n);
        }
    })
    This.oParent.on("changeindex", function(t, obj) {
        This.$dot.eq(obj.prev).removeClass("active");
        This.$dot.eq(obj.next).addClass("active")
    })
}
Sld.prototype._start=function(){
    var This=this;
    This._stop();
    This.resizeFn();
    This.autoTime=setInterval(function(){
        This.setIndex(This.curIndex+1)
    },This.settings.interval)
}
Sld.prototype._stop=function(){
    var This=this;
    if(This.autoTime){
        clearInterval(This.autoTime);
        This.autoTime=null;
    }
}
Sld.prototype.setIndex=function(index,bool){
    var This=this;
    var i=This.curIndex,
        len=This.length,
        w=-This.width;
        index=(index%len+len)%len;
        This.$li.hide();
        This.$li.eq(i).show();
        This.$li.eq(index).show();
        if (bool) {
            This.$li.eq(i).css('left',This.width);
            This.$li.eq(index).css('left',0);
            This.$ul.css('left',w);
            w=0;
        };
        This.$ul.stop(true,!bool).animate({
            left: w
        }, function() {
            This.$li.eq(i).css('left',This.width);
            This.$li.eq(index).css('left',0);
            This.$ul.css('left',0);
            This.$tip.html(index+1+'/'+This.$li.length+'<span>'+This.$li.eq(index).find("img").attr("alt")+'</span>');
        });
        This.curIndex=index;
        This.oParent.trigger('changeindex',{
            prev:i,
            next:index
        });
        //鍔犺嚜鍔ㄧ畻楂樺害锛�
        if(This.settings.resetH){

            var aA=This.$li.eq(This.curIndex).find('a')
            var lenjb=Math.ceil(aA.size()/4)*aA.eq(0).height()+30;
             This.oParent.animate({height: lenjb}, 100);
            // This.oParent.css({height: lenjb})

        }
};
Sld.prototype.next=function() {
    var This=this;
    This.setIndex(This.curIndex + 1);
};
Sld.prototype.prev= function() {
    var This=this;
    This.setIndex(This.curIndex - 1, true)
};
Sld.prototype.resizeFn=function(){
     var This=this;
    if(!This.settings.resize){
        return;
    }
         This._stop();
        var veiwWidth=$(document).width();
        // var imgWidth=This.$img.eq(0).width();
        var imgWidth=1920;
        This.$li.width(veiwWidth);
            if(veiwWidth>1000){
                for(var i=0;i<This.$img.length;i++){
                    This.$img.eq(i).css({
                        'left':- Math.floor((imgWidth-veiwWidth)/2)
                    })
                }
            }


}