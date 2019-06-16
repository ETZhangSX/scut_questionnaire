var departmant_img_path = "../resource/list/";
var isLongScreen = true;                // 是否为长屏幕，以16:9为基准判断

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
        department_item.className = "department_item";
        // pic.onclick = window.location.href = "detail.html";
        var pic = document.createElement("img");
        pic.setAttribute("onclick", "window.location.href = \"detail.html?school=" + getDepartmentName(i) + "\"");
        pic.src = departmant_img_path + i + ".png";
        pic.className = "department_img";

        department_item.appendChild(pic);
        department_left.appendChild(department_item)
    }

    var department_right = document.createElement("div");
    department_right.className = "department_right";
    for (var i = 16; i < 30; i++) {
        var department_item = document.createElement("div");
        department_item.className = "department_item";
        var pic = document.createElement("img");
        pic.setAttribute("onclick", "window.location.href = \"detail.html?school=" + getDepartmentName(i) + "\"");
        pic.src = departmant_img_path + i + ".png";
        pic.className = "department_img";
        department_item.appendChild(pic);
        department_right.appendChild(department_item)
    }
    if (!isLongScreen) {
        var translate = 5;
        var offset = 9.5;
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