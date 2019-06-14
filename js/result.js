var school_img_path = "../resource/result/department/";
var personality_img_path = "../resource/result/personality/";
var result_path = "../resource/result/result.txt";

function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null)
        return unescape(decodeURI(r[2]));
    return null;
}

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