
//轮播
(function () {
    var bigImg = document.getElementById('bigImg');
    var smallImg = document.getElementById('smallImg');
    var imgIndex = 0;
    var timer = null;
    my.ajax('get', 'data/url.txt', function (data) {
        var dataArr = eval(data);
        // var bigStr = '';
        // var smallStr = '';
        // for (var i = 0; i < dataArr.length; i++) {
        //     bigStr += '<li><a href="' + dataArr[i].url + '" target="_blank"><img src="' + dataArr[i].bigImg + '" /></a></li>';
        //     smallStr += '<li><a href="' + dataArr[i].url + '" target="_blank"><img src="' + dataArr[i].smallImg + '" /><span></span></a></li>';
        // }
        // bigImg.innerHTML = bigStr;
        // smallImg.innerHTML = smallStr;
        var bigLi = bigImg.getElementsByTagName('li');
        var smallLi = smallImg.getElementsByTagName('li');
        bigLi[0].style.opacity = 1;
        smallLi[0].className = 'on';
        timer = setInterval(autoPlay, 3000);
        function autoPlay() {
            imgIndex++;
            if (imgIndex == bigLi.length) {
                imgIndex = 0;
            }
            for (var i = 0; i < smallLi.length; i++) {
                smallLi[i].className = '';
                my.bufferMove(bigLi[i], { 'opacity': 0 });
            }
            smallLi[imgIndex].className = 'on';
            my.bufferMove(bigLi[imgIndex], { 'opacity': 100 });

        }
        // 划过小图
        for (var i = 0; i < smallLi.length; i++) {
            smallLi[i].index = i;
            smallLi[i].onmouseover = function () {
                clearInterval(timer);
                for (var i = 0; i < smallLi.length; i++) {
                    smallLi[i].className = '';
                    my.bufferMove(bigLi[i], { 'opacity': 0 });
                }
                this.className = 'on';
                my.bufferMove(bigLi[this.index], { 'opacity': 100 });
                imgIndex = this.index;
            }
            smallLi[i].onmouseout = function () {
                timer = setInterval(autoPlay, 3000);
            }
        }
        // 上一张 下一张
        var oPrev = document.getElementById('prev');
        var oNext = document.getElementById('nnext');
        oPrev.onclick = function () {
            clearInterval(timer);
            imgIndex -= 2;
            if (imgIndex < -1) {
                imgIndex = smallLi.length - 2;
            }
            autoPlay();
            timer = setInterval(autoPlay, 3000);
        }
        oNext.onclick = function () {
            clearInterval(timer);
            autoPlay();
            timer = setInterval(autoPlay, 3000);
        }
    });
})();

(function () {
    //特权
    var last = document.getElementsByClassName('last')[0];
    var next = document.getElementsByClassName('next')[0];
    var tq_list = document.getElementsByClassName('tq_list')[0];
    next.onclick = function () {
        my.move1(tq_list, 'left', -1075)
    }
    last.onclick = function () {
        my.move1(tq_list, 'left', 0)
    }
})();

// (function () {
//     //推荐部分
//     var tj_list = document.getElementById('tj_list');
//     var ry_list = document.getElementById('ry_list');
//     mainData(tj_list, 'data/films.json', 5, 0);
//     mainData(ry_list, 'data/films.json', 10, 5);
//     function mainData(obj, data, num, begin) {
//         my.ajax('get', 'data/films.json', function (da) {
//             var dataA = JSON.parse(da).films;
//             var tjM = '';
//             var divclass = '';
//             for (var i = begin; i < num; i++) {
//                 tjM += '<li><a href="' + dataA[i].http + '" target="_blank"><img src="' + dataA[i].url + '" alt="">'
//                 type = dataA[i].type;
//                 switch (type) {
//                     case 1:
//                         divclass = '';
//                         break;
//                     case 2:
//                         divclass = 'free';
//                         break;
//                     case 3:
//                         divclass = 'count';
//                         break;
//                 }
//                 tjM += '<div class="' + divclass + '"></div>'
//                 tjM += '<span class="span1"></span><span>' + dataA[i].txt + '</span><p>' + dataA[i].title + '</p></a><p>' + dataA[i].message + '</p>'
//                 grade = dataA[i].grade.toString().split('.');
//                 tjM += '<div><span>' + grade[0] + '</span>.' + (grade[1] ? grade[1] : 0) + '</div></li>'
//             }
//             obj.innerHTML = tjM;
//         })
//     }
    
// })();

//回到顶部
(function(){
    window.onscroll= function(){
        var top = document.getElementById('top');
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    if(scrollTop>100){
        top.style.display = 'block';
    }
    else{
        top.style.display = 'none';
    }
    top.onclick = function(){
        document.documentElement.scrollTop = 0;
    } 
    }
   
})();


