var zhangnan = (function(){
    // ajax请求
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
    // 获取非行间样式
    var getStyle = function (obj,attr){
        return obj.currentStyle?obj.currentStyle[attr]:getComputedStyle(obj)[attr];
    }
    // 运动
    var move = function (obj,json){
        clearInterval(obj.timer);
        obj.timer = setInterval(function(){
            var tig = true; // 假设全部达到目标值
            for(var key in json){
                if(key == 'opacity'){
                    var offset = parseFloat(getStyle(obj,key))*100;
                }else{
                    var offset = parseInt(getStyle(obj,key));
                }
                var step = json[key]>offset?Math.ceil((json[key] - offset)/10):Math.floor((json[key] - offset)/10);
                var speed = offset + step;
                if(speed != json[key]){
                    tig=false;
                }
                if(key == 'opacity'){
                    obj.style[key] = speed/100;
                }else{
                    obj.style[key] = speed + 'px';
                }
            } 
            if(tig==true){
                clearInterval(obj.timer);
            }
            
        },50);
    }
    // key:value
    return {
        ajax:ajax,
        getStyle:getStyle,
        move:move
    }
})();