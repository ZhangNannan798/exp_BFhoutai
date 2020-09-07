//  播放屏幕
(function () {
    var dragDiv = document.getElementById('block');
    var scroll = document.getElementById('scroll');
    var content = document.getElementById('obox1');
    var oBox = document.getElementById('obox');
    var hidden = content.offsetHeight - oBox.offsetHeight;
    var scrollH = scroll.offsetHeight - dragDiv.offsetHeight;
    var scale = hidden / scrollH;
    // console.log(dragDiv,scroll,content,obox,hidden,scrollH,scale)
    drag(dragDiv, content, scale);
    oBox.onmouseover = function () {
        // console.log('111');
        //oBox.addEventListener('DOMMouseScroll',mouseWheel);
        oBox.onmousewheel = mouseWheel;
        function mouseWheel(ev) {
            var ev = window.event || ev;
            // 判断滚轮滚动方向
            if (ev.wheelDelta == -120 || ev.detail == 3) {  // 滚轮往下滚动
                if (parseInt(content.style.top) <= -hidden) {
                    content.style.top = -hidden + 'px';
                    dragDiv.style.top = scrollH + 'px';
                } else {
                    content.style.top = content.offsetTop - 5 + 'px';
                    dragDiv.style.top = dragDiv.offsetTop + (5 / scale) + 'px';
                }
            }
            else {
                if (parseInt(content.style.top) >= 0) {
                    content.style.top = 0 + 'px';
                    dragDiv.style.top = 0 + 'px';
                } else {
                    content.style.top = content.offsetTop + 5 + 'px';
                    dragDiv.style.top = dragDiv.offsetTop - (5 / scale) + 'px';
                }
            }
            ev.preventDefault ? ev.preventDefault() : ev.returnValue = false;
        }
    }
})();
//自执行函数记得要结束加分号

    // 猜你喜欢
    (function () {
        var likecontent = document.getElementById('likecontent');
        zhangnan.ajax('get', '../data/like.json', function (data) {
            //获取数据
            // console.log(data);
            showList(likecontent, data, 8);
        });
        function showList(obj, data, num) {
            var arr = JSON.parse(data);
            var str = '';
            var spanName = '';
            for (var i = 0; i < num; i++) {
                str += '<li><a href="' + arr[i].http + '"><img src="' + arr[i].src + '" />'
                str += '</a><div class="jieshao"><a href="' + arr[i].http + '" class="listTit">' + arr[i].title + '</a><p>' + arr[i].message + '</p>';
                // grade = arr[i].grade.toString().split('.');
                // console.log(arr[i].grade);
                str += '<span>' + arr[i].grade + '</span></div></li>';
            }
            obj.innerHTML = str;
        }
    })();
// 热门推荐
(function () {
    var hotlist = document.getElementById('hotlist');
    zhangnan.ajax('get', '../data/hot.json', function (data) {
        //获取数据
        // console.log(data);
        showList(hotlist, data, 9);
    });
    function showList(obj, data, num) {
        var arr = JSON.parse(data);
        var str = '';
        var spanName = '';
        for (var i = 0; i < num; i++) {
            str += '<li><a href="' + arr[i].http + '"><img src="' + arr[i].url + '" />'
            str += '</a><a href="' + arr[i].http + '"  class="wenzi">' + arr[i].title + '</a>';
        }
        obj.innerHTML = str;
    }
})();
// 电影榜
(function () {
    var movielist = document.getElementById('movielist');
    zhangnan.ajax('get', '../data/ranking.json', function (data) {
        //获取数据
        // console.log(data);
        showList(movielist, data, 9);

    });
    function showList(obj, data, num) {
        var arr = JSON.parse(data);
        var str = '';
        var spanName = '';
        for (var i = 0; i < num; i++) {
            str += '<dl class="listmenu"><dt display="block" class="clearfix"><div>' + (i + 1) + '</div><p>' + arr[i].title + '</p><span>'
            str += arr[i].grade + '</span></dt> <dd  style="display:none"><img src="' + arr[i].src + '">';
            str += '<div><div>' + (+1) + '</div><p>' + arr[i].title + '</p></div> </dd></dl>';
        }
        obj.innerHTML = str;
        var listmenu = document.getElementsByClassName('listmenu');
        var dt = document.getElementsByTagName('dt');
        var dd = document.getElementsByTagName('dd');
        // console.log(listmenu.length);
        for (var i = 0; i < listmenu.length; i++) {
            listmenu[i].index = i;
            listmenu[i].onmouseover = function () {
                for (var j = 0; j < listmenu.length; j++) {
                    dt[j].style.display = 'block';
                    dd[j].style.display = 'none';
                }
                dt[this.index].style.display = 'none';
                dd[this.index].style.display = 'block';
            }
        }

    }
})();
// 评论
(function () {
    // 评论上
    var top = document.getElementsByClassName('top')[0];
    var top1 = top.getElementsByClassName('top1')[0];
    var span = top1.getElementsByTagName('span')[0];
    var textarea = document.getElementsByTagName('textarea')[0];
    var top2 = top.getElementsByClassName('top2')[0];
    var em = top2.getElementsByTagName('em')[0];
    var yzm = document.getElementById('yzm');
    var ospan = yzm.getElementsByTagName('span');
    var input = top.getElementsByTagName('input');

    // console.log(input, span, em);
    textarea.onkeydown = function () {
        if (textarea.value.length <= 140) {
            span.innerHTML = 140 - textarea.value.length
        } else {
            textarea.value = text.value.substring(0, 139);
        }
    }
    textarea.onclick = function () {
        textarea.innerHTML = '';
        top2.style.display = 'block';
        //输入字数

        input[0].onclick = function () {
            input[0].value = '';
        }
        //验证码
        var arr = ['a', 'b', 'c', '7', '8', '9', 'o', 'p', 'S', 'T', 'U', 'V', 'W', 'X',
            'q', 'r', 's', 't', 'f', 'g', 'h', 'i', 'j', 'y', 'u', 'v', 'w', 'x', 'd',
            '5', '6', 'e', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N'
            , 'O', 'P', 'Q', 'R', 'Y', 'Z', '0', '1', 'k', 'l', 'm', 'n', '2', '3', '4'];
        //字母随机
        function letter() {
            for (var i = 0; i < ospan.length; i++) {
                var index = parseInt(Math.random() * arr.length);
                ospan[i].innerHTML = arr[index];
                ospan[i].style.color = color();
            }
        }
        //颜色随机
        function color() {
            var r = parseInt(Math.random() * 256);
            var g = parseInt(Math.random() * 256);
            var b = parseInt(Math.random() * 256);
            var rgb = 'rgb(' + r + ',' + g + ',' + b + ')';
            return rgb;
        }
        //字号随机
        function size() {
            for (var j = 0; j < ospan.length; j++) {
                var size = parseInt(Math.random() * 20 + 12);
                ospan[j].style.fontSize = size + 'px';
            }
        }
        // console.log('11');
        em.onclick = function () {
            letter();
            size();
        }

    }
    // 评论下
    var oDiv = document.getElementById('discuss');
    var oUl = oDiv.getElementsByTagName('ul')[0];
    var oTab = oDiv.getElementsByTagName('h4');
    var oSpan = oDiv.getElementsByTagName('span')[0];
    var oInput = oDiv.getElementsByTagName('input');
    // var jubao = oDiv.getElementsByClassName('jubao');
    console.log(oDiv, oUl, oTab, oSpan, oInput)
    var pageSize = 5; // 每页多少条
    var mydata = []; // 存储请求到的数据
    var discuss = ['praise', 'time']; // 排序字段
    for (var i = 0; i < oTab.length; i++) {  // 按什么排序显示
        oTab[i].index = i;
        oTab[i].onclick = function () {
            for (var j = 0; j < oTab.length; j++) {
                oTab[j].className = '';
            }
            this.className = 'on';
            showDiscuss(mydata, discuss[this.index], pageSize);
        }
    }
    // 跳转到指定页数
    oInput[1].onclick = function () {
        var val = parseInt(oInput[0].value); // 获取输入框输入的数字
        if (val <= 1 || val > oSpan.innerHTML || !val) { // 用户输入的值不是数字或数字值小于1或大于总页数
            val = 1;
            oInput[0].value = 1;
            oInput[2].disabled = true;
            oInput[3].disabled = false;
        }
        // 判断上一页和下一页是否禁用
        if (val > 1 && val < oSpan.innerHTML) { // 用户输入的值在1到最大页数之间
            oInput[2].disabled = false;
            oInput[3].disabled = false;
        }
        if (val == oSpan.innerHTML) { // 当用户输入的数字等于最大页数
            oInput[2].disabled = false;
            oInput[3].disabled = true;
        }
        count(val);
    }
    // 上一页
    oInput[2].onclick = function () {
        var val = parseInt(oInput[0].value) - 1; // 页数减 1
        // 上一页是否被禁用
        if (val > 1) {
            oInput[2].disabled = false;
        } else {
            oInput[2].disabled = true;
        }
        // 下一页是否被禁用
        if (val == oSpan.innerHTML) {
            oInput[3].disabled = true;
        } else {
            oInput[3].disabled = false;
        }
        oInput[0].value = val;
        count(val);
    }
    // 下一页
    oInput[3].onclick = function () {
        var val = parseInt(oInput[0].value) + 1;
        if (val > 1) {
            oInput[2].disabled = false;
        }
        if (val == oSpan.innerHTML) {
            oInput[3].disabled = true;
        }
        oInput[0].value = val;
        count(val);
    }
    // 计算要渲染哪些数据
    function count(val) {
        var sData = mydata.filter(function (value, index) {
            return index >= ((val - 1) * pageSize) && index < val * pageSize;  // 选取数据：判断起始下标
        });
        var strHtml = innerHtml(sData, sData.length);
        oUl.innerHTML = strHtml;
    }
    // 请求数据
    zhangnan.ajax('get', '../data/discuss.json', function (data) {
        showDiscuss(data, 'praise', pageSize);
    });
    // 初始化渲染数据
    function showDiscuss(data, discuss, pageSize) {
        var newData = eval(data);
        mydata = newData;
        newData.sort(function (a, b) {
            return b[discuss] - a[discuss];
        });
        var strHtml = innerHtml(newData, pageSize);
        var num = Math.ceil(newData.length / pageSize);
        oSpan.innerHTML = num;
        oUl.innerHTML = strHtml;
        oInput[0].value = 1;
        oInput[2].disabled = true;
        oInput[3].disabled = false;
    }
    // innerHTML
    function innerHtml(newData, pageSize) {
        var strHtml = '';
        for (var i = 0; i < pageSize; i++) {
            var myDate = new Date(newData[i].time);
            var year = myDate.getFullYear();
            var month = myDate.getMonth() + 1;
            var day = myDate.getDate();
            var hour = myDate.getHours();
            var min = myDate.getMinutes();
            var sec = myDate.getSeconds();
            var times = year + '-' + month + '-' + day + ' ' + hour + ':' + min + ':' + sec;
            strHtml += '<li class="clearfix"><div class="ping1"><img src="' + newData[i].url + '"><div class="right"> <p>' + newData[i].userName + '</p><em>' + times + '</em></div></div>'
            strHtml += '<p>' + newData[i].message + '</p>' + '<div class="ping3"><p style="display:none" class="jubao">举报</p><a href="#">9</a><p><i style="display:none">热度：' + newData[i].praise + '</i></p></div></li>'
            // for(var j = 0 ;j<li.length ;j++){
            //     jubao.onmouseover = function(){
            //         this.style.display = 'block';
            //     }
            // }


        }
        return strHtml;
    }
    // var li = document.getElementsByTagName('li');
    // var jubao = document.getElementsByClassName('jubao');
    // console.log(jubao);
})()