var department_img_path = "../resource/list/";
var isLongScreen = true;                // 是否为长屏幕，以16:9为基准判断
var u = navigator.userAgent;

function getScreenRation() {
    var ratio = document.documentElement.clientHeight / document.documentElement.clientWidth;
    console.log(ratio);
    if (ratio < (16 / 9)) isLongScreen = false;
    console.log(isLongScreen);
}

function generate_table() {

    var departments = document.getElementsByClassName("departments")[0];

    var department_left = document.createElement("div");
    department_left.className = "department_left";

    for (var i = 1; i < 16; i++) {
        var department_item = document.createElement("div");

        if (!isLongScreen && u.indexOf("iPhone") > -1) {
            department_item.className = "department_item_iphone";
        }
        else
            department_item.className = "department_item";
        // pic.onclick = window.location.href = "detail.html";
        var pic = document.createElement("img");
        pic.setAttribute("onclick", "window.location.href = \"detail.html?school=" + getDepartmentName(i) + "\"");
        pic.src = department_img_path + i + ".png";
        pic.className = "department_img";

        department_item.appendChild(pic);
        department_left.appendChild(department_item)
    }

    var department_right = document.createElement("div");
    department_right.className = "department_right";
    for (var i = 16; i < 30; i++) {
        var department_item = document.createElement("div");

        if (!isLongScreen && u.indexOf("iPhone") > -1) {
            department_item.className = "department_item_iphone";
        }
        else
            department_item.className = "department_item";

        var pic = document.createElement("img");
        pic.setAttribute("onclick", "window.location.href = \"detail.html?school=" + getDepartmentName(i) + "\"");
        pic.src = department_img_path + i + ".png";
        pic.className = "department_img";

        department_item.appendChild(pic);
        department_right.appendChild(department_item)
    }
    if (!isLongScreen) {
        var translate = 5;
        var offset = 9.5;
        if (u.indexOf("iPhone") > -1)
            translate = 3;
        department_left.style.bottom = translate + "vw";
        department_right.style.bottom = translate + offset + "vw";
    }
    departments.appendChild(department_left);
    departments.appendChild(department_right);

}

function getDepartmentName(i){
    switch (i) {
        case 1: return "MSE";
        case 2: return "EP";
        case 3: return "EIE";
        case 4: return "LAW";
        case 5: return "BADMIN";
        case 6: return "PADMIN";
        case 7: return "INTERE";
        case 8: return "CCE";
        case 9: return "ENVIR";
        case 10: return "MAE";
        case 11: return "CS";
        case 12: return "ARCH";
        case 13: return "ECO";
        case 14: return "MARXISM";
        case 15: return "LIE";
        case 16: return "SOFTE";
        case 17: return "DESIGN";
        case 18: return "BIO";
        case 19: return "BBE";
        case 20: return "FOOD";
        case 21: return "MATH";
        case 22: return "PHYE";
        case 23: return "CIVIL";
        case 24: return "FL";
        case 25: return "PHY";
        case 26: return "JC";
        case 27: return "MEDIC";
        case 28: return "ART";
        case 29: return "AUTOSE";
    }
}

function getDepartment(i) {
    switch (i) {
        case "MSE": return "材料学院";
        case "EP": return "电力学院";
        case "EIE": return "电信学院";
        case "LAW": return "法学院";
        case "BADMIN": return "工管学院";
        case "PADMIN": return "公管学院";
        case "INTERE": return "国际学院";
        case "CCE": return "化工学院";
        case "ENVIR": return "环境学院";
        case "MAE": return "机汽学院";
        case "CS": return "计算机学院";
        case "ARCH": return "建筑学院";
        case "ECO": return "经贸学院";
        case "MARXISM": return "马克思学院";
        case "LIE": return "轻工学院";
        case "SOFTE": return "软件学院";
        case "DESIGN": return "设计学院";
        case "BIO": return "生物学院";
        case "BBE": return "生物医学院";
        case "FOOD": return "食品学院";
        case "MATH": return "数学学院";
        case "PHYE": return "体育学院";
        case "CIVIL": return "土交学院";
        case "FL": return "外国语学院";
        case "PHY": return "物理学院";
        case "JC": return "新传学院";
        case "MEDIC": return "医学院";
        case "ART": return "艺术学院";
        case "AUTOSE": return "自动化学院";
    }
}

function getPersonality(i) {
    switch (i) {
        case 1: return "观察型";
        case 2: return "浪漫型";
        case 3: return "实干型";
        case 4: return "挑战型";
        case 5: return "调停型";
        case 6: return "完美型";
        case 7: return "享乐型";
        case 8: return "忠诚型";
        case 9: return "助人型";
    }
}