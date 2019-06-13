// 从后台加载问卷题目
function getQuestionnaire() {

}

// 资源路径
var q_path = "../resource/question/Q";
var S;
var index = 1;
var isEnd = true;
/*
** 用于存储问题信息
** id: 每个问题有唯一id
** type: 问题类型，一般为radio，即单选
** bg_num: 背景图片数量，现只有问题一有
** options: 存储选项信息，每个选项按钮的坐标和宽高
**/
var question_data = [
    {
        "id": 1,
        "type":"radio",
        "bg_num" : 3,
        "options": [
            {
                "x": "140.5vw",
                "y": "9%",
                "height": "6vw",
                "width": "82%"
            },
            {
                "x": "149.75vw",
                "y": "9%",
                "height": "6vw",
                "width": "82%"
            },
            {
                "x": "159.25vw",
                "y": "9%",
                "height": "6vw",
                "width": "82%"
            }
        ]
    },
    {
        "id": 2,
        "type":"radio",
        "bg_num" : 0,
        "options": [
            {
                "x": "35vw",
                "y": "10%",
                "height": "37vw",
                "width": "80%"
            },
            {
                "x": "78vw",
                "y": "10%",
                "height": "37vw",
                "width": "80%"
            },
            {
                "x": "121vw",
                "y": "10%",
                "height": "37vw",
                "width": "80%"
            }
        ]
    },
    {
        "id": 3,
        "type":"radio",
        "bg_num" : 0,
        "options": [
            {
                "x": "54vw",
                "y": "16.5%",
                "height": "28vw",
                "width": "33%"
            },
            {
                "x": "68vw",
                "y": "55%",
                "height": "49vw",
                "width": "33%"
            },
            {
                "x": "120vw",
                "y": "16.5%",
                "height": "31vw",
                "width": "36.5%"
            }
        ]
    },
    {
        "id": 4,
        "type":"radio",
        "bg_num" : 0,
        "options": [
            {
                "x": "49vw",
                "y": "10%",
                "height": "32vw",
                "width": "79%"
            },
            {
                "x": "85vw",
                "y": "10%",
                "height": "32vw",
                "width": "79%"
            },
            {
                "x": "122vw",
                "y": "10%",
                "height": "32vw",
                "width": "79%"
            }
        ]
    },
    {
        "id": 5,
        "type":"radio",
        "bg_num" : 0,
        "options": [
            {
                "x": "40vw",
                "y": "10%",
                "height": "58vw",
                "width": "38%"
            },
            {
                "x": "40vw",
                "y": "52%",
                "height": "58vw",
                "width": "38%"
            },
            {
                "x": "102.5vw",
                "y": "10%",
                "height": "57.5vw",
                "width": "38%"
            },
            {
                "x": "102.5vw",
                "y": "52%",
                "height": "57.5vw",
                "width": "38%"
            }
        ]
    }
];

// 滑动列表，即存储滑动效果主题内容，任何push进去的内容会显示在滑动窗口
var question_list = [];
var list = [];
// 根据题目数据写HTML，将document push到list中
function generateForm() {

    for (var i in question_data) {
        question_list.push({
            content: createQuestionItem(question_data[i])
        });
    };

    question_list.push({
        content: (function () {
            var submit_page = document.createElement("div");
            submit_page.className = "question_item";
            var scut_logo = document.createElement("img");
            scut_logo.src = "../resource/others/bg_scut.png";
            scut_logo.alt = "#";
            submit_page.appendChild(scut_logo);

            for (var i = 1; i <= 3; i++) {
                var image = document.createElement("img");
                image.src = q_path + "6_" + i + ".png";
                image.alt = "#";
                submit_page.appendChild(image);
            }

            var text_name = document.createElement("input");
            var btn_submit = document.createElement("input");

            text_name.id = "name-text";
            text_name.placeholder = "您的名字";
            text_name.setAttribute("type", "text");
            text_name.required = true;
            text_name.setAttribute("oninvalid", "setCustomValidity('请输入您的姓名')");

            btn_submit.id = "btn-submit";
            btn_submit.setAttribute("type", "submit");
            btn_submit.setAttribute("value", "Submit");
            btn_submit.setAttribute("onsubmit", "submitForm()");

            submit_page.appendChild(text_name);
            submit_page.appendChild(btn_submit);
            return submit_page;
        }) ()
    });
}

// 创建指定位置的input标签
function generate_input(x, y, h, w, input_type, input_name, input_value) {

    //创建单选标签和label
    var radio = document.createElement("input");
    var choice = document.createElement("label");

    radio.className = "input_option";
    choice.className = "input_label";


    radio.setAttribute("type", input_type);
    radio.setAttribute("name", input_name);
    radio.setAttribute("value", input_value);
    radio.setAttribute("onchange", "radioChange(this)");

    //绑定radio和label
    var bind_id = input_name + "_" + input_value;
    radio.id = bind_id;
    choice.setAttribute("for", bind_id);

    //设置label的位置
    choice.style.top = x;
    choice.style.left = y;
    choice.style.height = h;
    choice.style.width = w;

    return [radio, choice];
}

// 用于生成单个问题项
function createQuestionItem(content) {
    var item = document.createElement("div");
    item.className = "question_item";

    // 题目
    var question_title = document.createElement("img");
    question_title.src = q_path + content["id"] + ".png";
    question_title.alt = "#";
    item.appendChild(question_title);

    // 题目背景，仅第一题有
    if (content["bg_num"] > 0) {
        for (var i = 0; i < content["bg_num"]; i++) {
            var bg = document.createElement("img");
            bg.src = q_path + content["id"] + "_bg" + (i + 1) + ".png";
            bg.alt = "#";
            item.appendChild(bg);
        }
    }

    // 选项
    for (var k in content["options"]) {
        var btn = content["options"][k];
        var btn_img = document.createElement("img");
        var id = content["id"].toString() + "_a" + (parseInt(k) + 1);
        btn_img.className = "q" + content["id"] + "_img";
        btn_img.src = q_path + id + ".png";
        btn_img.alt = "#";
        btn_img.id = id;

        item.appendChild(btn_img);

        //选项单选按钮
        var option = generate_input(btn["x"], btn["y"], btn["height"], btn["width"], "radio", content["id"], parseInt(k) + 1);
        item.appendChild(option[0]);
        item.appendChild(option[1]);
    }

    return item;
}

// 隐藏滑动提示图标
function hideNext() {
    console.log("hideNext()");
    var slide_next = document.getElementById("slide_next");
    hide(slide_next, 0.05);
}

// 显示滑动提示图标
function showNext() {
    console.log("showNext()");
    var slide_next = document.getElementById("slide_next");
    show(slide_next, 0.05);
}


// 渐变隐藏标签，即设置透明度线性下降为0
function hide(el, offset){
    var opacity = el.style.opacity || 1;

    setTimeout(function() {
        el.style.opacity = String(parseFloat(opacity) - offset);
        parseFloat(el.style.opacity) > 0 && hide(el, offset);
    }, 10);
}

// 渐变展示标签，即设置透明度线性增加为1
function show(el, offset){
    var opacity = el.style.opacity || 0;
    setTimeout(function() {
        el.style.opacity = String(parseFloat(opacity) + offset);
        parseFloat(el.style.opacity) < 1 && show(el, offset);
    }, 10);
}

/*
TODO: 添加单选按钮的选择点击逻辑，包括但不限于：
    -check给相应学院加减分;
    -[已完成]check改变相应选项图片的为点击样式, 即实现图片的切换, 可通过id操作
    （每个选项的img标签都有id，格式为 [题目编号]_a[选项编号], 例如: 1_a3);
    -uncheck需要回退上述所有操作;
    -[已完成]在进行选择后, 需要显示滑动进入下一题图标[id: slide_next];
    -[已完成]进行选择后才可滑动到下一题, 暂时想到的可行方案是重写generateForm()函数
     不一次性push，而是每题第一次check再动态push下一页;
     或者无需重写，使用新list，每次check从一个list push到iSlider的容器list
 */


function radioChange(obj) {
    var q_name = obj.name;
    var img_id = q_name + "_a" + obj.value;

    console.log(img_id);

    var images = document.getElementsByClassName("q" + q_name + "_img");

    //遍历选项标签更改图标
    for (var k in images) {
        if (images[k].id == img_id) {
            images[k].src = q_path + img_id + "0.png";
        }
        else {
            images[k].src = q_path + q_name + "_a" + (parseInt(k) + 1) + ".png";
        }
    }

    // 判断是否在最后一页，动态添加题目数据
    if (isEnd && index < question_list.length) {
        S.pushData(question_list[index]);
        index++;
        isEnd = false;
        showNext();
    }
    // S.unhold();
}

/*
TODO: 实现表单提交函数逻辑，包括：
    - 校验表单数据格式，是否为空（由于采用了必须答题才能滑动，只需校验名字是否合法）
    - 若问卷结果逻辑在前端实现，则应在该函数中实现结果逻辑
    - 将结果传递到结果页
 */
function submitForm() {
}

// 上个版本函数，重写版见前文
// 生成问题项
// function createQuestionItem(content) {
//     var item = document.createElement("div");
//     var title = document.createElement("div");
//     var options = document.createElement("div");
//     var title_text = document.createElement("p");
//     // var option_ul = document.createElement("ul");
//
//     item.setAttribute("id", content.id);
//
//     item.className = "question_content";
//     title.className = "question_title";
//     options.className = "question_options";
//     // option_ul.className = "option_list";
//
//     title_text.innerHTML = content.content;
//     title.appendChild(title_text);
//     item.appendChild(title);
//
//     for (var k in content.options) {
//         // var li_c = document.createElement("li");
//         var option_line = document.createElement("div");
//         var ratio_input = document.createElement("input");
//         var input_label = document.createElement("label");
//         var br = document.createElement("br");
//
//         option_line.className = "option_line";
//
//         ratio_input.setAttribute("type", content.type);
//         ratio_input.setAttribute("name", content.id);
//         ratio_input.setAttribute("value", k);
//
//         input_label.innerHTML = content.options[k];
//
//         // li_c.appendChild(ratio_input);
//         // option_ul.appendChild(li_c);
//         option_line.appendChild(ratio_input);
//         option_line.appendChild(input_label);
//         options.appendChild(option_line);
//         options.appendChild(br);
//     }
//
//     // options.appendChild(option_ul);
//     item.appendChild(options);
//     return item;
// }