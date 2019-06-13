// 用于生成特定位置下的input标签，仅用于实验
function generate_input(x, y, h, w, input_type, input_name, input_value) {
    // var container = document.createElement("div");
    var choice = document.createElement("input");

    // container.className = "option_container";
    choice.className = "input_option";

    // container.style.position = "absolute";

    choice.setAttribute("type", input_type);
    choice.setAttribute("name", input_name);
    choice.setAttribute("value", input_value);


    choice.style.display = "block";
    choice.style.position = "absolute";
    choice.style.background = "black";
    choice.style.zIndex = "3";
    choice.style.top = x;
    choice.style.left = y;
    choice.style.height = h;
    choice.style.width = w;
    // container.setAttribute("style", "float: left;");
    // container.style.top = x;
    // container.style.left = y;
    // container.style.height = h;
    // container.style.width = w;

    // container.appendChild(choice);
    // return container;
    return choice;
}
// 同上
function generate_question() {
    var container = document.createElement("div");
    // container.setAttribute("position", "relative");
    container.style.height = "100%";
    container.style.position = "relative";
    container.style.background = "url(../images/1.png) no-repeat";
    container.appendChild(generate_input("10%", "10%", "100px", "20px", "radio", "1", 1));
    container.appendChild(generate_input("20%", "20%", "100px", "20px", "radio", "1", 2));
    container.appendChild(generate_input("30%", "30%", "100px", "20px", "radio", "1", 3));
    return container;
}

function generate_form() {
    var form = document.getElementById("question_form");
    form.appendChild(generate_question());
}
//以上内容对主页没有任何实际意义hhhhhh
/******************分割线**********8*******/

// 选择选项隐藏主页并限制指定页面
function choose_num(num) {
    var obj = document.getElementById("img_btn");
    hide(obj, 0.02);
    var img_btn = document.getElementById("index_title");

    //可使用remove直接移除标签，但是没有动画效果，暂时没有采用
    // img_btn.removeChild(obj);

    var next_page = document.createElement("div");
    next_page.setAttribute("id", "next_page");
    next_page.style.opacity = "0";

    var text = document.createElement("img");
    text.src = "../resource/others/index_text" + num + ".png";
    text.alt = "#";

    var btn_image = document.createElement("img");
    btn_image.src = "../resource/others/index_btn4.png";
    btn_image.style.zIndex = "2";
    btn_image.alt = "#";

    var next_btn = document.createElement("button");
    next_btn.setAttribute("id", "next_btn");
    next_btn.setAttribute("onclick", "window.location.href='questionnaire.html'");

    next_page.appendChild(text);
    next_page.appendChild(btn_image);
    next_page.appendChild(next_btn);

    img_btn.appendChild(next_page);
    show(next_page, 0.02);
}

// 渐变隐藏标签，即设置透明度线性下降为0
function hide(el, offset){
    var opacity = el.style.opacity || 1;

    setTimeout(function() {
        el.style.opacity = String(parseFloat(opacity) - offset);
        parseFloat(el.style.opacity) > 0 && hide(el, offset);
    }, 15);
}

// 渐变展示标签，即设置透明度线性增加为1
function show(el, offset){
    var opacity = el.style.opacity || 0;
    setTimeout(function() {
        el.style.opacity = String(parseFloat(opacity) + offset);
        parseFloat(el.style.opacity) < 1 && show(el, offset);
    }, 10);
}