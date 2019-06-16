var school_img_path = "../resource/result/department/";
var personality_img_path = "../resource/result/personality/";
var result_path = "../resource/result/result.txt";

// wx需要的数据
let appid;
let timestamp;
let noncestr;
let signature;

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

function getResultRelation() {
    let fp = load(result_path);
    var result_judge = JSON.parse(fp);
    console.log(result_judge);
    return result_judge;
}

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

    school.id = "school";
    personality_1.id = "personality_1";
    personality_2.id = "personality_2";

    var result = document.getElementById("result_img");
    result.appendChild(school);
    result.appendChild(personality_1);
    result.appendChild(personality_2);
}

function getWxConfig() {
    $.get("../php/jssdk.php",function(data,status){
        // alert("数据: " + data.toString() + "\n状态: " + status);
        // console.log(data);
        appid = data[0];
        timestamp = data[1];
        noncestr = data[2];
        signature = data[3];
        setupWxShare();
    });
}

function setupWxShare() {
    // 微信分享操作
    wx.config({
        debug: false,
        appId: appid,       // AppId
        timestamp: timestamp,        // 时间戳
        nonceStr: noncestr,     // 随机字符串
        signature: signature,       // 签名
        jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone', 'showOptionMenu', 'hideAllNonBaseMenuItem', 'showAllNonBaseMenuItem']
    });

    wx.ready(function () {
        const share = {
            title: '测测你最适合哪个学院',
            desc: '我刚刚在华工青年测试了适合自己的学院，你也来试试吧！',
            imgUrl: '../resource/others/share_icon.jpg',
            link: 'https://scut_questionnaire.100steps.net/pages/index.html',
            success: function () {
                // hideMaskLayer();  // 分享成功，隐藏引导用户分享的浮层
            },
            cancel: function () {
                //
            }
        };
        wx.onMenuShareAppMessage(share);  // 微信好友
        wx.onMenuShareTimeline(share);  // 朋友圈
        wx.onMenuShareQQ(share);  // QQ
        wx.onMenuShareQZone(share);  // QQ空间
        wx.onMenuShareWeibo(share);  // 腾讯微博
    });
}
