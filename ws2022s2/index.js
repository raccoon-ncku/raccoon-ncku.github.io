var defaultThemeColors = Survey
    .StylesManager
    .ThemeColors["modern"];

defaultThemeColors["$main-color"] = "#000";

Survey
    .StylesManager
    .applyTheme("modern");


var surveyJSON = {
    "title": "Raccoon Event Registration | 數位智造工坊活動報名",
    "description": "If you encounter any technical difficulties, please contact us.",
    "logo": "/favicon.ico",
    "logoWidth": 60,
    "logoHeight": 60,
    "pages": [
        {
            "elements": [
                {
                    "type": "radiogroup",
                    "name": "event",
                    "title": "Which event you're attending | 想報名的活動",
                    "defaultValue": "WS-2022-Summer-2",
                    "choices": [
                        {
                            "value": "WS-2022-Summer-2",
                            "text": "Robots and Computer-vision, Summer 2022 | 工業機器人整合電腦視覺工作營"
                        },
                    ]
                },
                {
                    "type": "text",
                    "name": "name",
                    "title": "Legal name | 姓名",
                    "isRequired": true
                },
                {
                    "type": "text",
                    "name": "id",
                    "title": "School ID | 學號",
                    "isRequired": true
                },
                {
                    "type": "text",
                    "name": "org",
                    "title": "Class/Organization | 系級/單位",
                    "isRequired": true
                },
                {
                    "type": "text",
                    "name": "email",
                    "title": "email",
                    "isRequired": true
                },
                {
                    "type": "text",
                    "name": "mobile",
                    "title": "Mobile | 手機號碼",
                    "isRequired": true
                }
            ]
        },
        {
            "name": "page1",
            "elements": [
                {
                    "type": "rating",
                    "name": "lv_rh",
                    "title": "Level of proficiency in Rhino(CAD) | Rhino (CAD) 熟悉程度",
                    "rateMin": 0,
                    "rateMax": 5,
                    "minRateDescription": "No experience",
                    "maxRateDescription": "Proficient",
                    "isRequired": true
                },
                {
                    "type": "rating",
                    "name": "lv_gh",
                    "title": "Level of proficiency in Grasshopper(Rhino plugin) | Grasshopper (Rhino外掛) 熟悉程度",
                    "rateMin": 0,
                    "rateMax": 5,
                    "minRateDescription": "No experience",
                    "maxRateDescription": "Proficient",
                    "isRequired": true
                },
                {
                    "type": "rating",
                    "name": "lv_py",
                    "title": "Level of proficiency in Python(programming language) | Python (程式語言) 熟悉程度",
                    "rateMin": 0,
                    "rateMax": 5,
                    "minRateDescription": "No experience",
                    "maxRateDescription": "Proficient",
                    "isRequired": true
                },
                {
                    "type": "comment",
                    "name": "lv_prog",
                    "title": "Any other programming experiences | 其他程式語言經驗",
                    "description": "e.g., Java, C# etc."
                },
                {
                    "type": "comment",
                    "name": "lv_robot",
                    "title": "Experience in robotic fabrication | 機器人製造相關經驗",
                },
                {
                    "type": "comment",
                    "name": "lv_making",
                    "title": "Any other making/crafting/digital fabrication experience | 其他手工藝/製造技術相關經驗",
                    "description": "e.g., woodworking, metalworking, CNC milling etc."
                }

            ]
        },
        {
            "name": "page2",
            "elements": [
                {
                    "type": "radiogroup",
                    "name": "has_laptop",
                    "title": "Do you have a laptop | 是否有筆電",
                    "isRequired": true,
                    "choices": [
                        {
                            "value": true,
                            "text": "Yes"
                        },
                        {
                            "value": false,
                            "text": "No"
                        }
                    ]
                },
                {
                    "type": "checkbox",
                    "name": "preferred_os",
                    "title": "Preferred OS | 習慣的作業系統",
                    "choices": [
                        {
                            "value": "macOS",
                            "text": "macOS"
                        },
                        {
                            "value": "Win",
                            "text": "Windows"
                        }
                    ]
                }
            ]
        }
    ],
    "completedHtml": "<h5>Thank you for your registration. <br>Please wait a few seconds before closing this window.</h5><h5>謝謝填表！<br> 請稍候幾秒再關閉視窗！</h5>",
};

function sendDataToServer(survey, options) {
    //Display information about sending data
    options.showDataSaving();
    $.ajax({
        url: 'https://script.google.com/macros/s/AKfycbxQBNEeTNwAftIPlQC4zheApUqcBJ-VbVN4VucRQl7PBjLhxRPswNNxckNYlxSYOo5m/exec',
        type: 'post',
        //data: JSON.stringify(survey.data),
        data: JSON.stringify(survey.data),
        //We need tell web app that we use plain text.
        headers: {
            "Content-Type": "text/plain"
        },
        processData: false,
        complete: function (res, status) {
            if (status == 'success') {
                //Show that data was send successfully
                options.showDataSavingSuccess();
            } else {
                //Display retry button in case of error
                options.showDataSavingError();
            }
        },
    });
}


window.survey = new Survey.Model(surveyJSON);

survey
    .onComplete
    .add(sendDataToServer);

survey
    .onUpdateQuestionCssClasses
    .add(function (survey, options) {
        var classes = options.cssClasses

        classes.mainRoot += " sv_qstn";
        classes.root = "sq-root";
        classes.title += " sq-title"
        classes.description += " sq-description"
        classes.item += " sq-item";
        classes.label += " sq-label";

        if (options.question.isRequired) {
            classes.title += " sq-title-required";
            classes.root += " sq-root-required";
        }

        if (options.question.getType() === "checkbox") {
            classes.root += " sq-root-cb";
        }
    });


$("#surveyElement").Survey({ model: survey });
