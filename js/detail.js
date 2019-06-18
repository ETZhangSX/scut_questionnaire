var depart;
function setDepart(d) {
    depart = d;
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
        console.log(depart);

        const share = {
            title: '我最合适的学院竟然是' + depart + '？  | 华工青年',
            desc: '我刚刚在华工青年测试了最适合自己的学院，你也来试试吧！',
            imgUrl: 'https://scut_questionnaire.100steps.net/resource/others/share_icon.jpg',
            link: window.location["href"] + "&share=true",//'https://scut_questionnaire.100steps.net/pages/index.html',
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