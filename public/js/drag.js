function drag(obj,content,scale){
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
            //console.log(offsetT);
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