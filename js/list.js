var departmant_img_path = "../resource/list/";

function generate_table() {
    // var item = document.createElement("div");
    // item.className = "department_item";
    // // 创建表格
    // var table = document.createElement("table");
    // table.className = "department_table";
    // for (var i in [1,14]) {
    //     var row = document.createElement("tr");
    //     var cell1 = document.createElement("td");
    //     var pic1 = document.createElement("img");
    //     pic1.src = departmant_img_path + (i * 2 + 1) + ".png";
    //     pic1.alt = "#";
    //     cell1.append(pic1);
    //     var cell2 = document.createElement("td");
    //     var pic2 = document.createElement("img");
    //     pic1.src = departmant_img_path + (i * 2 + 2) + ".png";
    //     pic1.alt = "#";
    //     cell2.append(pic2);
    //     row.append(cell1);
    //     row.append(cell2);
    //     table.append(row)
    // }
    // item.append(table);
    // return item

    var departments = document.getElementsByClassName("departments")[0];

    var department_list1 = document.createElement("div");
    department_list1.className = "department_list";
    for (var i = 1; i < 16; i++) {
        var department_item = document.createElement("div");
        department_item.className = "department_item";
        // pic.onclick = window.location.href = "detail.html";
        var pic = document.createElement("img");
        pic.src = departmant_img_path + i + ".png";
        pic.className = "department_img";

        department_item.appendChild(pic);
        department_list1.appendChild(department_item)
    }
    var department_list2 = document.createElement("div");
    department_list2.className = "department_list";
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