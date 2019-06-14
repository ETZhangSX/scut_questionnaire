var departmant_img_path = "../resource/list/";

function generate_table() {

    var departments = document.getElementsByClassName("departments")[0];

    var department_list1 = document.createElement("div");
    department_list1.className = "department_left";

    for (var i = 1; i < 16; i++) {
        var department_item = document.createElement("div");
        department_item.className = "department_item";
        // pic.onclick = window.location.href = "detail.html";
        var pic = document.createElement("img");
        pic.setAttribute("onclick", "window.location.href = \"detail.html?school=LAW\"")
        pic.src = departmant_img_path + i + ".png";
        pic.className = "department_img";

        department_item.appendChild(pic);
        department_list1.appendChild(department_item)
    }

    var department_list2 = document.createElement("div");
    department_list2.className = "department_right";
    for (var i = 16; i < 30; i++) {
        var department_item = document.createElement("div");
        department_item.className = "department_item";
        var pic = document.createElement("img");
        pic.src = departmant_img_path + i + ".png";
        pic.className = "department_img";
        department_item.appendChild(pic);
        department_list2.appendChild(department_item)
    }
    departments.appendChild(department_list1);
    departments.appendChild(department_list2);

    // return departments
}