// 从后台加载问卷题目
function getQuestionnaire() {

}

var question_data = [
    {"id": 1, "type":"radio", "content": "你数学好吗？", "options":["非常好", "很好", "一般", "菜鸡"]},
    {"id": 2, "type":"radio", "content": "你物理好吗？", "options":["非常好", "很好", "一般", "菜鸡"]},
    {"id": 3, "type":"radio", "content": "你化学好吗？", "options":["非常好", "很好", "一般", "菜鸡"]},
    {"id": 4, "type":"radio", "content": "你情商高吗？", "options":["非常好", "很好", "一般", "菜鸡"]},
];

var question_list = [];

// 根据题目数据写HTML
function generateForm() {

    for (var i in question_data) {
        question_list.push({
            content: createQuestionItem(question_data[i])
        });
    }

    question_list.push({
        content: (function () {
            var btn_submit = document.createElement("input");
            btn_submit.className = "btn-submit";
            btn_submit.setAttribute("type", "submit");
            btn_submit.setAttribute("value", "Submit");
            return btn_submit;
        }) ()
    });
}


// 生成问题项
function createQuestionItem(content) {
    var item = document.createElement("div");
    var title = document.createElement("div");
    var options = document.createElement("div");
    var title_text = document.createElement("p");
    // var option_ul = document.createElement("ul");

    item.setAttribute("id", content.id);

    item.className = "question_content";
    title.className = "question_title";
    options.className = "question_options";
    // option_ul.className = "option_list";

    title_text.innerHTML = content.content;
    title.appendChild(title_text);
    item.appendChild(title);

    for (var k in content.options) {
        // var li_c = document.createElement("li");
        var option_line = document.createElement("div");
        var ratio_input = document.createElement("input");
        var input_label = document.createElement("label");
        var br = document.createElement("br");

        option_line.className = "option_line";

        ratio_input.setAttribute("type", content.type);
        ratio_input.setAttribute("name", content.id);
        ratio_input.setAttribute("value", k);

        input_label.innerHTML = content.options[k];

        // li_c.appendChild(ratio_input);
        // option_ul.appendChild(li_c);
        option_line.appendChild(ratio_input);
        option_line.appendChild(input_label);
        options.appendChild(option_line);
        options.appendChild(br);
    }

    // options.appendChild(option_ul);
    item.appendChild(options);
    return item;
}