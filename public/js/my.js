
var my = (function () {
    //封装函数function getStyle(obj,attr)  获取非行间样式
    var getStyle = function (obj, attr) {
        if (window.getComputedStyle) {
            return getComputedStyle(obj)[attr];
        } else {
            return obj.currentStyle[attr];
        }
    }


    var move1 = function (obj, attr, target, callback) {
        clearInterval(obj.timer); //再次点击清除定时

        obj.timer = setInterval(function () {
            var dir = parseInt(getStyle(obj, attr)) < target ? 50 : -50;
            var speed = parseInt(getStyle(obj, attr)) + dir; //getStyle(box,'margin-left')调用前面封装的函数function getStyle(obj,attr)   利用parseInt将0px 转为0数值
            if ((speed >= target && dir > 0) || (speed <= target && dir < 0)) {
                clearInterval(obj.timer); //防止点击的时候乱序 速度加快
                speed = target;   //speed内部命名的变量
            }
            obj.style[attr] = speed + 'px';  //设置点击过后的元素的属性值
            // if (speed <= target && dir<0) {
            //     clearInterval(timer); //防止点击的时候乱序 速度加快
            //     speed = target;
            // }
            //当到达目标值之后执行回调函数，
            //if判断 是不是在实参里面给callback赋值
            if (speed == target) {
                callback && callback();
            }
        }, 20)
    }

    //封装运动函数
    var move = function (obj, attr, step, stopValue, callback) {
        clearInterval(obj.timer);
        step = stopValue > parseInt(getStyle(obj, attr)) ? step : -step;
        obj.timer = setInterval(function () {
            var speed = parseInt(getStyle(obj, attr)) + step;
            if (speed >= stopValue && step > 0 || speed <= stopValue && step < 0) {
                speed = stopValue;
                clearInterval(obj.timer);
            }
            obj.style[attr] = speed + 'px';
            if (step == stopValue) {
                callback && callback();
            }
        }, 30);
    }

    //事件绑定函数封装
    var on = function (obj, type, fun) {
        if (obj.addEventListener) {
            obj.addEventListener(type, fun)
        } else {
            obj.attachEvent('on' + type, fun)
        }

    }

    //事件取消函数封装
    var out = function (obj, type, fun) {
        if (obj.removeEventListener) {
            obj.removeEventListener(type, fun)
        } else {
            obj.detachEvent('on' + type, fun)
        }

    }


    //多属性缓冲运动框架封装
    var bufferMove = function (obj, json, fun) {
        clearInterval(obj.timer);
        obj.timer = setInterval(function () {
            var tag = true;  //判断是否每一个值都达到了
            //遍历对象
            for (var attr in json) {
                if (attr == 'opacity') {
                    var cur = parseFloat(getStyle(obj, attr)) * 100;
                } else {
                    var cur = parseInt(getStyle(obj, attr));
                }

                var speed = (json[attr] - cur) / 10;
                speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
                if (cur != json[attr]) {
                    tag = false;
                }
                if (attr == 'opacity') {
                    obj.style.opacity = (speed + cur) / 100;
                } else {
                    obj.style[attr] = (speed + cur) + 'px';
                }
            }
            if (tag) {
                clearInterval(obj.timer);
                fun && fun();   //判断是否赋值回调函数
            }
        }, 120)
    }


    //ajax函数封装
    var ajax = function (type, url, success, error) {
        var ajax = new XMLHttpRequest();
        if (type.toLowerCase() == 'post') {
            if (url.indexOf('?') == -1) {
                ajax.open(type, url, true);
                ajax.setRequestHeader('Content-type', 'application/x-www-formurlencoded');
                ajax.send();
            } else {
                url = url.split('?');
                ajax.open(type, url[0], true);
                ajax.setRequestHeader('Content-type', 'application/x-www-formurlencoded');
                ajax.send(url[1]);
            }
        } else {
            ajax.open(type, url, true);
            ajax.send();
        }
        ajax.onreadystatechange = function () {
            if (ajax.readyState == 4) {
                if (ajax.status == 200) {
                    // 请求成功以后
                    success && success(ajax.responseText);
                } else {
                    // 错误信息
                    error && error(ajax.status);
                }
            }
        }

    }
   
    //拖拽
   var drag =  function(obj,content,scale){
        obj.onmousedown = function(ev){
            var ev = window.event || ev;
            // 鼠标按下的坐标点
            var x = ev.clientX - obj.offsetLeft;
            var y = ev.clientY - obj.offsetTop;
            // console.log(x,y);
            document.onmousemove = function(ev){
                var ev = window.event || ev;
                var disX = ev.clientX -x;
                var disY = ev.clientY -y;
                // console.log(disX,disY);
                var clientX = obj.parentNode.clientWidth;
                var clientY = obj.parentNode.clientHeight;
                var offsetW = obj.offsetWidth;
                var offsetH = obj.offsetHeight;
                var offsetT = obj.offsetTop;
                content.style.top = -offsetT*scale + 'px';
                if(disX<=0){
                    disX = 0;
                }
                if(disY<=0){
                    disY = 0;
                }
                if(disX>=clientX-offsetW){
                    disX = clientX - offsetW;
                }
                if(disY>=clientY-offsetH){
                    disY = clientY-offsetH;
                }
                obj.style.left = disX + 'px';
                obj.style.top = disY + 'px';
                if(obj.setCapture){
                    obj.setCapture();
                }
                return false;
            }
            
            document.onmouseup = function(){
                if(obj.setCapture){
                    obj.releaseCapture();
                }
                document.onmousemove = '';
            }
            
            
        }
    }
    
    return {
        getStyle: getStyle,
        move1: move1,
        move: move,
        ajax: ajax,
        bufferMove: bufferMove,
        on: on,
        out: out,
        drag:drag
    }
})();




