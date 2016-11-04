(function(){
	// 提取data，将文章动态添加到页面中
	var data = articleData;
	var length = data.length;
	var _htmlS = [];
    for(var i=0;i<length;i++){
    	var _html = '<div class="article-item">'+
                        '<p class="article-title">'+
                            '<a href="#" data-index="'+i+'">'+data[i].title+'</a>'+
                       '</p>'+
                        '<div class="article-content">'+
                            '<div class="text-content">'+
                                '<span>'+data[i].content+'</span>'+
                            '</div>'+
                            '<div class="pic-content">'+
                                '<img src="'+data[i].src+'" alt="'+data[i].alt+'"/>'+
                            '</div>'+
                        '</div>'+
                        '<p class="article-time">'+data[i].time+'</p>'+
                    '</div>';
        _htmlS.push(_html);
    }
    var articleList = document.querySelector(".article-list");
    articleList.innerHTML = _htmlS.join("");
    // 控制页面中一些统计数据的显示
    var articleCount = document.querySelector(".article-count");
    var floderCount = document.querySelector(".floder-count");
    var flagCount = document.querySelector(".flag-count");
    articleCount.innerHTML = length;
    floderCount.innerHTML = length;
    flagCount.innerHTML = length;
    // 最新发表数据控制
    var newsArticle = document.querySelector(".news-article");
    var _lis = [];
    // 提取最后发表的8篇文章
    for(var k=0;k<8;k++){
    	var index = length-1-k;
    	if(index>=0){
    		var _li = '<li><a href="javascript:void(0)" data-index="'+k+'"><span>'+data[index].title+'</span></a></li>';
    		_lis.push(_li);
    	}
    }
    newsArticle.innerHTML = _lis.join("");
})();
