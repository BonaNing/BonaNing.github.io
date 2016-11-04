(function(){
    var datas = articleData;
    function showArticle(dataIndex){
        var data = datas[dataIndex];
        var parentEle = document.querySelector(".content");

        parentEle.innerHTML = "";
        // 获取页面中的所有标题链接，给它们添加onClick事件，同时将链接的dataIndex属性值传过来，利用dataIndex判断
        // 需要渲染的数据
        var temp = "<div id='articleContainer'>"+
            "<span id='close' onclick='window.location.reload();'><img src='./images/close.png' /></span>"+
            "<p id='container_title'>"+data.title+"</p>"+
            "<p id='container_src'>"+
                "<img src='"+data.src+"' alt='"+data.alt+"' />"+
            "</p>"+
            "<p id='container_content'>"+data.content+"</p>"+
            "<p id='container_time'>"+data.time+"</p>"
        "</div>";
        var articleEle = document.createElement("div");
        articleEle.className = "articleContent";
        articleEle.innerHTML = temp;
        parentEle.appendChild(articleEle);
        articleEle.style.opacity = 1;
    }
    // 点击链接时，显示文章具体内容，隐藏原有文章列表
    function hiddenArticleList(dataIndex){
        var articleList = document.querySelector(".article-list");
        if(articleList){
            articleList.style.opacity = 0;
            articleList.style.display = 'none';

        }
        showArticle(dataIndex);
    }


    // 给最新发表的部分添加点击事件
    // 存放页面中所有文章的标题链接
    var links = [];
    var newsLinks = [];
    var newsArticle = document.querySelectorAll(".news-article li");
    var articleTitles = document.querySelectorAll(".article-title");


    for(var i=0,len=articleTitles.length;i<len;i++){
        links[i] = articleTitles[i].querySelector('a');

    }

    for(var ni=0;ni<newsArticle.length;ni++){
        newsLinks[ni] = newsArticle[ni].querySelector("a");

    }



    // 给每一个链接循环绑定事件

    for(var j = 0;j<links.length;j++){
        links[j].addEventListener("click",function(event){
            var event = event||window.event;
            var dataIndex = event.target.getAttribute('data-index');
            hiddenArticleList(dataIndex);
        });
    }
    for(var nj = 0;nj<newsLinks.length;nj++){
        newsLinks[nj].addEventListener("click",function(event){
            var newsEvent = event||window.event;
            var newsIndex = newsEvent.target.getAttribute('data-index');
            console.log(newsIndex);
            var actualIndex = datas.length-newsIndex-1;
            hiddenArticleList(actualIndex);
       });
    }
})();
