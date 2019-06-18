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

            wx.config({
                debug: false,
                appId: appid,       // AppId
                timestamp: timestamp,        // 时间戳
                nonceStr: noncestr,     // 随机字符串
                signature: signature,       // 签名
                jsApiList: ['checkJsApi', 'onMenuShareTimeline', 'onMenuShareAppMessage']
            });

            setupWxShare()
        });
}

function setupWxShare() {
    console.log("wx setup callback");

    wx.ready(function () {
        console.log("wx ready.");
        console.log(depart);

        const share = {
            title: '我最合适的学院竟然是' + depart + '？',
            desc: '我刚刚在华工青年测试了最适合自己的学院，你也来试试吧！',
            imgUrl: 'https://scut_questionnaire.100steps.net/resource/others/share_icon.png',
            link: window.location["href"]
        };

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
            img_url: share['imgUrl'],
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
            img_url: share['imgUrl'],
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

    wx.error(function (res) {
        console.log("wx error");
        console.log(res);
    });
}