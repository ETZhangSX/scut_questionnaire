
/******************分割线******************/

var u = navigator.userAgent;
var isLongScreen = true;                // 是否为长屏幕，以16:9为基准判断

function getScreenRation() {
    var ratio = document.documentElement.clientHeight / document.documentElement.clientWidth;
    console.log(ratio);
    if (ratio < (16 / 9)) isLongScreen = false;
    console.log(isLongScreen);
}

// 选择选项隐藏主页并限制指定页面
function choose_num(num) {
    var obj = document.getElementById("img_btn");
    hide(obj, 0.02);
    var img_btn = document.getElementById("index_title");

    //可使用remove直接移除标签，但是没有动画效果，暂时没有采用
    // img_btn.removeChild(obj);

    var next_page = document.createElement("div");
    next_page.setAttribute("id", "next_page");
    next_page.style.opacity = "0";

    var text = document.createElement("img");
    text.src = "../resource/others/index_text" + num + ".png";
    if (!isLongScreen) {
        text.style.top = "-9vw";
    }
    text.alt = "#";

    var btn_image = document.createElement("img");
    btn_image.src = "../resource/others/index_btn4.png";
    btn_image.style.zIndex = "2";
    btn_image.alt = "#";

    var next_btn = document.createElement("button");
    next_btn.setAttribute("id", "next_btn");
    next_btn.setAttribute("onclick", "window.location.href='questionnaire.html'");

    next_page.appendChild(text);
    next_page.appendChild(btn_image);
    next_page.appendChild(next_btn);

    img_btn.appendChild(next_page);
    show(next_page, 0.02);
}

// 渐变隐藏标签，即设置透明度线性下降为0
function hide(el, offset){
    var opacity = el.style.opacity || 1;

    setTimeout(function() {
        el.style.opacity = String(parseFloat(opacity) - offset);
        parseFloat(el.style.opacity) > 0 && hide(el, offset);
    }, 15);
}

// 渐变展示标签，即设置透明度线性增加为1
function show(el, offset){
    var opacity = el.style.opacity || 0;
    setTimeout(function() {
        el.style.opacity = String(parseFloat(opacity) + offset);
        parseFloat(el.style.opacity) < 1 && show(el, offset);
    }, 10);
}