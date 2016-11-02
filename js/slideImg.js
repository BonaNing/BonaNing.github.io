;
(function($) {
    var slideImg = function() {
        var self = this;
        this.index = 0;
        this.slide = $("#slide");
        this.slide_img = $(".slide-img");
        this.prev = $(".prev");
        this.next = $(".next");
        this.img_box = $(".img-box");
        this.img = $(".img-box img");
        this.slide_item = $(".slide-item");
        this.timer;

        this.setHtml();

        this.init();
        // 给每一个小圆点添加一个dataId属性
        this.itemList = $(".slide-item ul li");
        this.itemList.each(function(index, el) {
            $(this).attr("dataId", index);
        });


        this.prev.click(function(event) {
            self.switchImg(-1);
        });
        this.next.click(function(event) {
            self.switchImg(1);
        });
        $(".slide-item ul").delegate('li', 'click', function(event) {
            var target = event.target;
            // 获取当前目标的dataId值
            var item = $(this).attr("dataId");
            self.setItem(item);
            // 根据dataId值设置图片切换
            self.loadImgBySrc(imgSourceSrc[item]);
        });
        // 设置在哪些情况下自动切换关闭
        $(".slide-item ul").mouseover(function(){
            clearInterval(self.timer);
        }).mouseout(function(event) {
            self.autoPlay();
        });
        this.prev.mouseover(function(){
            clearInterval(self.timer);
        }).mouseout(function(event) {
            self.autoPlay();
        });
        this.next.mouseover(function(){
            clearInterval(self.timer);
        }).mouseout(function(event) {
            self.autoPlay();
        });
    };
    slideImg.prototype = {
        // 初次加载时初始化页面
        init: function() {
            var self = this;

            self.setItem(this.index);
            self.loadImgBySrc(imgSourceSrc[0]);
            self.autoPlay();
        },
        // 根据图片数量添加底部小圆点
        setHtml:function(){
            var length = imgSourceSrc.length;
            var _html = '<ul>';
            for(var i=0;i<length;i++){
                _html += '<li><span></span></li>';
            }
            _html += '</ul>';
            $(".slide-item").append(_html);
        },
        // 切换图片，根据flag的值决定向左或向右切换
        switchImg: function(flag) {
            if (flag > 0) {
                if (this.index == imgSourceSrc.length - 1) {
                    this.index = 0;
                } else {
                    this.index++;
                }
            } else {
                if (this.index == 0) {
                    this.index = imgSourceSrc.length - 1;
                } else {
                    this.index--;
                }
            }
            this.loadImgBySrc(imgSourceSrc[this.index]);
            this.setItem(this.index);
        },
        // 每次切换图片时加载图片
        loadImgBySrc: function(sourceSrc) {
            var self = this;

            $(".img-box img").css({
                width: "auto",
                height: "auto"
            }).hide();

            this.preperLoadImg(sourceSrc, function() {
                $(".img-box img").attr("src", sourceSrc);
                var imgWidth = $(".img-box img").width(),
                    imgHeight = $(".img-box img").height();
                self.resizeBox(imgWidth, imgHeight);
            });
        },
        // 每次加载图片时重新设置图片的尺寸
        resizeBox: function(imgWidht, imgHeight) {

            var winWidth = $('.content_two').width(),
                winHeight = $('.content_two').height();

            var scale = Math.min(winWidth / imgWidht, winHeight / imgHeight, 1);

            var actualWidth = imgWidht * scale,
                actualHeight = imgHeight * scale;


            this.slide.animate({
                width: actualWidth-10,
                height: actualHeight-10,
                top: (winHeight - actualHeight) / 2,
                left: (winWidth - actualWidth) / 2
            })
            this.img.animate({
                width: actualWidth-10,
                height: actualHeight-10
            }).fadeIn();
            this.setIemtStyle(actualWidth);

        },
        // 预加载图片
        preperLoadImg: function(sourceSrc, callback) {
            var img = new Image();
            if (!!window.ActiveXObject) {
                img.onreadystatechang = function() {
                    if (this.readystate == "complete") {
                        callback();
                    }
                };
            } else {
                img.onload = function() {
                    callback();
                }
            }
            img.src = sourceSrc;
        },
        // 设置底部标识小圆点样式
        setItem: function(index) {
            var item = parseInt(index) + 1;
            // 先将所有的小圆点设置为黑色
            $(".slide-item ul li span").css("background", "black");
            // 通过this.index的值确哪一张图片时当前放映的图片，将对应的小圆点高亮显示
            $(".slide-item ul li:nth-child(" + item + ") span").css("background", "orange");

        },
        setIemtStyle: function(slideWidth) {
            // 设置底部小圆点位置样式
            // console.log(slideWidth);
            // 获取底部小圆点数目，这里和图片数量相同
            var countImg = imgSourceSrc.length;
            var parentWidth = slideWidth * 0.4;

            $('.slide-item ul').css("width", parentWidth);
            var childeWidth = $('.slide-item ul li').width() * countImg;
            // 计算每一个小圆点距离左边的距离，为总宽度/(countImg+1)
            var winWidth = parentWidth - childeWidth;
            var distance = Math.floor(winWidth / (countImg - 1));
            // 设置每个小圆点的左边距
            $(".slide-item li").css({
                "margin-right": distance
            });
            $(".slide-item li:last-child").css({
                "margin-right": 0
            });

        },
        switchByItem: function() {
            var self = this;
            // 给小圆点的父级元素ul绑定click事件，当点击的是小圆点时，根据小圆点的dataId来确定切换到哪个图片上
            $(".slide-item").delegate('li', 'click', function(event) {
                var target = event.target;
                // 获取当前目标的dataId值
                var item = target.dataId;
                // 根据dataId值设置图片切换
                self.loadImgBySrc(imgSourceSrc[item]);
            });
        },
        autoPlay: function() {
            var self = this;
            this.timer = setInterval(function() {
                self.switchImg(1);
            }, 2000)
        }
    };
    window["slideImg"] = slideImg;

})(jQuery)
