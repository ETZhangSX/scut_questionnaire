
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

function getWxConfig() {
    console.log("getting wx config");
    console.log(location.href.split('#')[0]);
    console.log(encodeURIComponent(location.href.split('#')[0]));
    $.get("../php/jssdk.php", {"url": location.href.split('#')[0]},
        function (data) {
            var result = data.split(' ');
            console.log(result);
            appid = result[0];
            console.log(appid);
            timestamp = result[1];
            noncestr = result[2];
            signature = result[3];
            console.log(result[4]);
            setupWxShare()
        });
}

function setupWxShare() {
    console.log("wx setup");
    // 微信分享操作
    wx.config({
        debug: false,
        appId: appid,       // AppId
        timestamp: timestamp,        // 时间戳
        nonceStr: noncestr,     // 随机字符串
        signature: signature,       // 签名
        jsApiList: ['checkJsApi', 'openLocation', 'getLocation', 'onMenuShareTimeline', 'onMenuShareAppMessage']
    });

    wx.ready(function () {
        console.log("wx ready.");

        const share = {
            title: '测测你最适合那个学院？ | 华工青年',
            desc: '我刚刚在华工青年测试了最适合自己的学院，你也来试试吧！',
            imgUrl: 'https://scut_questionnaire.100steps.net/resource/others/share_icon.jpg',
            link: 'https://scut_questionnaire.100steps.net/pages/index.html',
        };

        wx.error(function () {
            console.log("wx error");
        });

        wx.checkJsApi({
            jsApiList: [
                'getLocation', 'onMenuShareTimeline', 'onMenuShareAppMessage'
            ],
            success: function (res) {
                console.log("checkJsApi success" + JSON.stringify(res))
            },
            fail: function (res) {
                console.log("checkJsApi fail" + JSON.stringify(res))
            }
        });

        wx.updateAppMessageShareData({
            title: share['title'],
            desc: share['desc'],
            link: share['link'],
            imgUrl: share['imgUrl'],
            success: function (res) {
                console.log("wxshare setup success." + res)
                // hideMaskLayer();  // 分享成功，隐藏引导用户分享的浮层
            },
            fail: function (res) {
                console.log("wxshare setup fail." + res)
            },
            cancel: function (res) {
                console.log("wxshare setup cancel" + res)
            }
        });

        wx.updateTimelineShareData({
            title: share['title'],
            link: share['link'],
            imgUrl: share['imgUrl'],
            success: function (res) {
                console.log("wxshare setup success." + res)
                // hideMaskLayer();  // 分享成功，隐藏引导用户分享的浮层
            },
            fail: function (res) {
                console.log("wxshare setup fail." + res)
            },
            cancel: function (res) {
                console.log("wxshare setup cancel" + res)
            }
        })

    });
}