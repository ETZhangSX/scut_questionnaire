var school_img_path = "../resource/result/department/";
var personality_img_path = "../resource/result/personality/";
var result_path = "../resource/result/result.txt";
var isLongScreen = true;                // 是否为长屏幕，以16:9为基准判断
var u = navigator.userAgent;

// wx需要的数据
var appid = "";
var timestamp = 0;
var noncestr = "";
var signature = "";
var url = "";

function getScreenRation() {
    var ratio = document.documentElement.clientHeight / document.documentElement.clientWidth;
    console.log(ratio);
    if (ratio < (16 / 9)) isLongScreen = false;
    console.log(isLongScreen);
}

// 获取传入参数
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null)
        return unescape(decodeURI(r[2]));
    return null;
}


// 加载文件
function load(name) {
    let xhr = new XMLHttpRequest(),
        okStatus = document.location.protocol === "file:" ? 0 : 200;
    xhr.open('GET', name, false);
    xhr.overrideMimeType("text/html;charset=utf-8");//默认为utf-8
    xhr.send(null);
    return xhr.status === okStatus ? xhr.responseText : null;
}


// 将读取文件解析为json格式获取题目逻辑的映射关系
function getResultRelation() {
    let fp = load(result_path);
    // console.log(result_judge);
    return JSON.parse(fp);
}


// 从问卷传参加载结果
function loadResultInfo(userName, schoolName, personalityName_1, personalityName_2) {
    var name = document.getElementById("user_name");
    console.log(name);
    name.innerHTML = userName;

    var school = document.createElement("img");
    var personality_1 = document.createElement("img");
    var personality_2 = document.createElement("img");

    school.src = school_img_path + schoolName + ".png";
    personality_1.src = personality_img_path + personalityName_1 + ".png";
    personality_2.src = personality_img_path + personalityName_2 + ".png";

    school.alt = "#";
    personality_1.alt = "#";
    personality_2.alt = "#";

    if (!isLongScreen) {
        if (u.indexOf("iPhone") > -1) {
            school.className = "school_short_iphone";
            // document.getElementById("user_name").style.top = "6vw";
            document.getElementById("user_name").id = "user_name_iphone";
            document.getElementById("bg_title").id = "bg_title_iphone";//.style.top = "-15vw";
            document.getElementById("bg_background").id = "bg_background_iphone";//.style.bottom = "-11.5vw";
            document.getElementById("school_btn").style.bottom = "103vw";
            personality_1.id = "personality_short_iphone_1";
            personality_2.id = "personality_short_iphone_2";
        }
        else {
            school.className = "school_short";
            document.getElementById("user_name").style.top = "7vw";
            document.getElementById("bg_title").style.top = "-15vw";
            document.getElementById("bg_background").style.bottom = "-6.5vw";
            document.getElementById("school_btn").style.bottom = "112vw";
            personality_1.id = "personality_short_1";
            personality_2.id = "personality_short_2";
        }

    } else {
        personality_1.id = "personality_1";
        personality_2.id = "personality_2";
    }

    school.id = "school";

    var result = document.getElementById("result_img");
    result.appendChild(school);
    result.appendChild(personality_1);
    result.appendChild(personality_2);
}

function getWxConfig() {
    console.log("getting wx config");
    console.log(location.href.split('#')[0]);
    console.log(encodeURIComponent(location.href.split('#')[0]));
    $.get("../php/jssdk.php", {"url": location.href.split('#')[0]},
        function(data){
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
            title: '来测测你最适合哪个学院',
            desc: '我刚刚在华工青年测试了适合自己的学院，你也来试试吧！',
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

        wx.onMenuShareAppMessage({
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

        wx.onMenuShareTimeline({
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

        // wx.onMenuShareAppMessage(share);  // 微信好友
        // wx.onMenuShareTimeline(share);  // 朋友圈
    });
}


