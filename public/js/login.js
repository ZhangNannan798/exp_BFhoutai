//单选框 "记住我" "我同意"
var right2 = document.getElementsByClassName('right2')[0];
var right3 = document.getElementsByClassName('right3')[0];
var regsiter = document.getElementsByClassName('regsiter')[0];
var rem1 = document.getElementById('rem1');
var rem2 = document.getElementById('rem2');
var rem3 = document.getElementById('rem3');
// console.log(right2,right3,regsiter,rem1,rem2,rem3)
var tag = true;
var tag1 = true;
var tag2 = true;

rem1.onclick = function () {
    if (tag) {
        rem1.className = 'unrem';
        tag = false;
    } else {
        rem1.className = 'rem';
        tag = true;
    }
}
rem2.onclick = function () {

    if (tag1) {
        rem2.className = 'unrem';
        tag1 = false;
    } else {
        rem2.className = 'rem';
        tag1 = true;
    }
}
rem3.onclick = function () {
    if (tag2) {
        rem3.className = 'unrem11';
        tag2 = false;
    } else {
        rem3.className = 'rem11';
        tag2 = true;
    }
}

/*    账号密码登录页right2    跳转立即注册regsiter，跳转手机验证码登录right3
      立即注册页     跳转账号密码登录
      手机验证码登录页    跳转账号密码登录,跳转立即注册*/
var right = document.getElementsByClassName('right')[0];
var liji1 = document.getElementById('liji1');
var shouji1 = document.getElementById('shouji1');
var liji2 = document.getElementById('liji2');
var zhanghao = document.getElementById('zhanghao');
var liji3 = document.getElementById('liji3');
liji1.onclick = function () {
    right.style.display = 'none';
    regsiter.style.display = 'block';
    return false;
}
liji2.onclick = function () {
    right.style.display = 'none';
    regsiter.style.display = 'block';
    return false;
}
shouji1.onclick = function () {
    regsiter.style.display = 'none';
    right2.style.display = 'none';
    right3.style.display = 'block';
    return false;
}
zhanghao.onclick = function () {
    regsiter.style.display = 'none';
    right3.style.display = 'none';
    right2.style.display = 'block';
    return false;
}
liji3.onclick = function () {
    regsiter.style.display = 'none';
    right3.style.display = 'none';
    right.style.display = 'block';
    right2.style.display = 'block';
    return false;
}

//注册页的验证码
var shuaxin = document.getElementsByClassName('shuaxin')[0];
var yanzhengma = document.getElementsByClassName('yanzhengma')[0];
var ospan = yanzhengma.getElementsByTagName('span');
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
shuaxin.onclick = function () {
    letter();
    size();
}


//账号登录页面输入值的检查
var shuru1 = document.getElementsByClassName('shuru1')[0];
var info1 = shuru1.getElementsByClassName('info1')[0];
var deng1 = document.getElementById('deng1');
var user1 = shuru1.getElementsByClassName('user')[0];
var psw1 = shuru1.getElementsByClassName('psw')[0];
// console.log(shuru1,info1,deng1,user,psw)

user1.onblur = function () {
    var telc1 = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
    if (!telc1.test(user1.value)) {
        info1.innerHTML = "手机号格式不正确";
    } else {
        info1.innerHTML = "正确";
    }

}
psw1.onblur = function () {
    var passc1 = /\w{6,32}$/;
    if (!passc1.test(psw1.value)) {
        info1.innerHTML = "请输入6-32位英文、数字和符号的组合密码";
    } else {
        info1.innerHTML = "正确";
    }
}
deng1.onclick = function () {
    // console.log(user.value)
    if (user1.value == '') {
        info1.innerHTML = "请输入手机号/邮箱/用户名";
    } else {
        if (psw1.value == '') {
            info1.innerHTML = "请输入密码";
        } else {
            info1.innerHTML = "输入正确";
        }
    }

}
//手机号登录页面输入值的检查
var shuru2 = document.getElementsByClassName('shuru2')[0];
var info2 = shuru2.getElementsByClassName('info2')[0];
var deng2 = document.getElementById('deng2');
var user2 = shuru2.getElementsByClassName('user')[0];
var yzm2 = shuru2.getElementsByClassName('yzm')[0];
// console.log(shuru2,info2,deng2,user,yzm)
user2.onblur = function () {
    var telc2 = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
    if (!telc2.test(user2.value)) {
        info2.innerHTML = "手机号格式不正确";
    } else {
        info2.innerHTML = "正确";
    }

}
yzm2.onblur = function () {
    var passc2 = /[0-9A-Za-z]{4}/;
    if (!passc2.test(yzm2.value)) {
        info2.innerHTML = "请输入正确验证码";
    } else {
        info2.innerHTML = "正确";
    }
}
deng2.onclick = function () {
    // console.log(user.value)
    if (user2.value == '') {
        info2.innerHTML = "请输入手机号";
    } else {
        if (yzm2.value == '') {
            info2.innerHTML = "请输入验证码";
        } else {
            info2.innerHTML = "输入正确";
        }
    }

}
//注册页面输入值的检查
var regsiter2 = document.getElementsByClassName('regsiter2')[0];
var info3 = regsiter2.getElementsByClassName('info3')[0];
var shuru3 = document.getElementsByClassName('shuru3')[0];
var user3 = shuru3.getElementsByClassName('user')[0];
var psw3 = shuru3.getElementsByClassName('psw')[0];
var yzm3 = shuru3.getElementsByClassName('yzm')[0];
var yzm4 = shuru3.getElementsByClassName('yzm')[1];
var passLev = shuru3.getElementsByClassName('passLev')[0];
var zhuceanniu = document.getElementById('zhuceanniu');
console.log(regsiter2, info3, shuru3, user3, psw3, yzm3, passLev, zhuceanniu)
user3.onblur = function () {
    var telc = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
    if (!telc.test(user3.value)) {
        info3.innerHTML = "手机号格式不正确";
    } else {
        info3.innerHTML = "输入正确";
    }

}
    psw3.onkeyup = function () {
        if (checkPwd(psw3.value) == 1) {
            passLev.style.backgroundPositionX = '-70px';
        } else if (checkPwd(psw3.value) == 0) {
            passLev.style.backgroundPositionX = '-40px';
            // return false;
        } else if (checkPwd(psw3.value) == 2) {
            passLev.style.backgroundPositionX = '-100px';
        } else if (checkPwd(psw3.value) == 3 || checkPwd(psw3.value) == 4) {
            passLev.style.backgroundPositionX = '-130px';
        }
    }
    function checkPwd(msg) { //判断含有数字字母特殊符号
        var lvl = 0;
        if (/[0-9]/.test(msg)) {
            lvl++;
        }
        if (/[a-z]/.test(msg)) {
            lvl++;
        }
        if (/[A-Z]/.test(msg)) {
            lvl++;
        }
        if (/[^0-9a-zA-Z]/.test(msg)) {
            lvl++;
        }
        if (!/.{6,32}/.test(msg)) {
            lvl = 0;
        }
        return lvl;
    }
yzm3.onblur = function () {
    var yy = /[A-Z0-9a-z]{4}/;
    if (!yy.test(yzm3.value)) {
        info3.innerHTML = "请输入正确验证码";
    } else {
        info3.innerHTML = "输入正确";
    }
}
yzm4.onblur = function () {
    var yyy = /[0-9]{5}/;
    if (!yyy.test(yzm4.value)) {
        info3.innerHTML = "请输入正确验证码";
    } else {
        info3.innerHTML = "输入正确";
    }
}
zhuceanniu.onclick = function () {
    if (user3.value == '') {
        info3.innerHTML = "请输入手机号";
    } else {
        if (psw3.value == '') {
            info3.innerHTML = "请输入密码";
        }
    }
    if (yzm3.value == '') {
        info2.innerHTML = "请输入验证码";
    } else {
        info2.innerHTML = '输入正确'
    }
    return false;
}



