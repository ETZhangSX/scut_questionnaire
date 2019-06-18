var depart;

function setDepart(d) {
    depart = d;
}

function onShareImg() {
    document.getElementById("share_bg").style.display = "block";
    document.getElementById("share_guide").style.display = "block";
}

function onShareClose(obj) {
    console.log("onShareClose");
    obj.style.display = "none";
    document.getElementById("share_bg").style.display = "none";
}

function getWxConfig() {
    console.log("getting wx config");
    console.log(location.href.split('#')[0]);
    var path = location.href.split('#')[0].replace("https://", "");
    console.log(path);
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
        debug: true,
        appId: appid,       // AppId
        timestamp: timestamp,        // 时间戳
        nonceStr: noncestr,     // 随机字符串
        signature: signature,       // 签名
        jsApiList: ['checkJsApi', 'onMenuShareTimeline', 'onMenuShareAppMessage']
    });

    wx.ready(function () {
        console.log("wx ready.");
        console.log(depart);

        const share = {
            title: '我最合适的学院竟然是？？？',
            desc: '我刚刚在华工青年测试了最适合自己的学院，你也来试试吧！',
            imgUrl: 'https://scut_questionnaire.100steps.net/resource/others/share_icon.jpg',
            link: 'https://scut_questionnaire.100steps.net/pages/index.html',
            // title: '我最合适的学院竟然是' + depart + '？  | 华工青年',
            // desc: '我刚刚在华工青年测试了最适合自己的学院，你也来试试吧！',
            // imgUrl: 'scut_questionnaire.100steps.net/resource/others/share_icon.jpg',
            // link: window.location["href"].replace("https://", ""),
        };

        wx.error(function () {
            console.log("wx error");
        });

        wx.checkJsApi({
            jsApiList: [
                'onMenuShareTimeline', 'onMenuShareAppMessage'
            ],
            success: function (res) {
                console.log("checkJsApi success");
                console.log(res);
            },
            fail: function (res) {
                console.log("checkJsApi fail");
                console.log(res)
            }
        });

        wx.onMenuShareAppMessage({
            title: share['title'],
            desc: share['desc'],
            link: share['link'],
            imgUrl: share['imgUrl'],
            success: function (res) {
                console.log("detail: wxshare setup success.");
                console.log(res);
                onShareClose(document.getElementById('share_guide'));
            },
            fail: function (res) {
                console.log("detail: wxshare setup fail.");
                console.log(res);
            },
            cancel: function (res) {
                console.log("detail: wxshare setup cancel");
                console.log(res);
            }
        });

        wx.onMenuShareTimeline({
            title: share['title'],
            link: share['link'],
            imgUrl: share['imgUrl'],
            success: function (res) {
                console.log("detail: wxshare setup success.");
                console.log(res);
                onShareClose(document.getElementById('share_guide'));
            },
            fail: function (res) {
                console.log("detail: wxshare setup fail.");
                console.log(res);
            },
            cancel: function (res) {
                console.log("detail: wxshare setup cancel");
                console.log(res);
            }
        })

    });
}