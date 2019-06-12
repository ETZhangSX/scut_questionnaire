var school_img_path = "../resource/result/department/8-";
var personality_img_path = "../resource/result/personality/8-";

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