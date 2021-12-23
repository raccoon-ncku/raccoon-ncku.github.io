var defaultThemeColors = Survey
    .StylesManager
    .ThemeColors["bootstrap"];

defaultThemeColors["$main-color"] = "#000";

Survey
    .StylesManager
    .applyTheme("bootstrap");

var surveyJSON = {
    "title": "Raccoon Pre-workshop Evaluation Survey",
    "description": "Please finish this survey either in English or Chinese at your preference.",
    "logo": "/assets/img/favicon.ico",
    "logoWidth": 60,
    "logoHeight": 60,
    "pages": [
        {
            "elements": [
                {
                    "type": "radiogroup",
                    "name": "event",
                    "title": "Which event you're attending",
                    "defaultValue": "2021-Fall",
                    "choices": [
                     {
                      "value": "2021-Fall",
                      "text": "Workshop 2021/Nov/27-28"
                     },
                    ]
                   },
                {
                    "type": "text",
                    "name": "name",
                    "title": "Legal name",
                    "isRequired": true
                },
                {
                    "type": "text",
                    "name": "preferred_name",
                    "title": "Preferred name"
                },
                {
                    "type": "text",
                    "name": "edu",
                    "title": "Previous degrees/majors/universities"
                }
            ]
        },
        {
            "name": "page2",
            "elements": [
                {
                    "type": "comment",
                    "name": "lv_rh",
                    "title": "Level of proficiency in Rhino",
                    "isRequired": true
                },
                {
                    "type": "comment",
                    "name":"lv_gh",
                    "title": "Level of proficiency in Grasshopper",
                    "isRequired": true
                }
            ]
        },
        {
            "name": "page1",
            "elements": [
                {
                    "type": "comment",
                    "name": "lv_py",
                    "title": "Level of proficiency in Python",
                    "isRequired": true
                },
                {
                    "type": "comment",
                    "name": "lv_prog",
                    "title": "Any other programming experiences",
                    "description": "e.g., Java, C# etc."
                }
            ]
        },
        {
            "name": "page3",
            "elements": [
                {
                    "type": "comment",
                    "name": "lv_robot",
                    "title": "Experience in robotic fabrication"
                },
                {
                    "type": "comment",
                    "name": "lv_making",
                    "title": "Any other making/crafting/digital fabrication experience",
                    "description": "e.g., woodworking, metalworking, CNC milling etc."
                }
            ]
        },
        {
            "name": "page4",
            "elements": [
                {
                    "type": "comment",
                    "name": "lv_research",
                    "title": "Research Experience/Publications (if any)"
                },
                {
                    "type": "comment",
                    "name": "lv_other",
                    "title": "Other specialties",
                    "description": "e.g., Professional Experience, Physical Computing, Algorithmic Methods, Optimization Techniques etc."
                }
            ]
        },
        {
            "name": "page5",
            "elements": [
                {
                    "type": "radiogroup",
                    "name": "has_laptop",
                    "title": "Do you have a laptop",
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
                    "title": "Preferred OS",
                    "hasComment": true,
                    "choices": [
                        {
                            "value": "Debian/Ubuntu",
                            "text": "Debian/Ubuntu"
                            },
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
    ]
};

function sendDataToServer(survey, options) {
	//Display information about sending data
	options.showDataSaving();
	$.ajax({
		url: 'https://script.google.com/macros/s/AKfycbzvYSUNtMYD52ghcS8PvVVdd6kybcgdr8zYDcXVKXvyPqO3jTE_cB_6C8yOQs5iNcUIdQ/exec',
		type: 'post',
		//data: JSON.stringify(survey.data),
        data: JSON.stringify(survey.data),
		//We need tell web app that we use plain text.
		headers: {
			"Content-Type": "text/plain"
		},
		processData: false,
		complete: function(res, status) {
			if (status == 'success') {
				//Show that data was send successfully
				options.showDataSavingSuccess();
			}else {
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


$("#surveyElement").Survey({ model: survey});
