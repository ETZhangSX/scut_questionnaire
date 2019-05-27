
// 从后台加载问卷题目
function getQuestionnaire() {

}

var question_data = [
    {"id": 1, "type":"radio", "content": "你数学好吗？", "options":["非常好", "很好", "一般", "菜鸡"]},
    {"id": 2, "type":"radio", "content": "你物理好吗？", "options":["非常好", "很好", "一般", "菜鸡"]},
    {"id": 3, "type":"radio", "content": "你化学好吗？", "options":["非常好", "很好", "一般", "菜鸡"]},
    {"id": 4, "type":"radio", "content": "你情商高吗？", "options":["非常好", "很好", "一般", "菜鸡"]},
]

// 根据题目数据写HTML
function generateForm() {
    for (var i in question_data) {
        document.write(question_data[i].content.concat("<br>"))
        for (var k in question_data[i].options) {

            document.write("<input type=\"".concat(question_data[i].type, "\" name=\"", question_data[i].id, "\" value=\"", k, "\">", question_data[i].options[k]))
            document.write("<br>")
        }
    }
    document.write("<input type=\"submit\" name=\"name\" value=\"Submit\">")
    // document.write("<input type=\"text\" name=\"name\" value=\"Mickey\">")
    // document.write("<input type=\"submit\" name=\"name\" value=\"Mickey\">")
}