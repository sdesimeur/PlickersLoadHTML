// ==UserScript==
// @name         PlickersLoadHTML
// @namespace    http://sdesimeur.com/
// @version      1.15
// @description  try to take over the world!
// @author       SDesimeur
// @include https://plickers.com/*
// @include https://*.plickers.com/*
// @include https://www.plickers.com/*
// @grant        none
// @run-at document-end
// ==/UserScript==


function changeItemByHTML (questionItem) {
    var regexURL = /:::\{\s*(.*)\s*\}:::/;
        if (! questionItem.classList.contains('turnInHTML')) {
            var result = regexURL.exec(questionItem.outerText);
            if (result !== null) {
                var tmpURL = result[1];
                var questionDivS = questionItem.querySelectorAll('[class*="table-question"');
                var questionDiv = questionDivS[0];
                questionDiv.style.display = "none";
                var oReq = new XMLHttpRequest();
                //oReq.open("GET", url4Download + btoa(tmpURL+"/Question.html"), true);
                oReq.open("GET", tmpURL+"/Question.html", true);
                oReq.onreadystatechange = function() {
                        if (oReq.readyState === XMLHttpRequest.DONE) {
                            questionItem.classList.add('turnInHTML');
                            var sp = document.createElement("span");
                            sp.id="mySpan";
                            sp.innerHTML=oReq.responseText;
                            var srcs = sp.querySelectorAll('[src]');
                            for (var k=0;k<srcs.length;k++) {
                                var srctxt = srcs[k].attributes[0].nodeValue;
                                if (! (/^\s*(http|data)/g.test(srctxt))) {
                                    srcs[k].src = tmpURL + "/" + srctxt;
                                }
                            }
                            questionDiv.parentNode.insertBefore(sp,questionDiv);
                        }
                };
                oReq.send();
            }
        }
}


function PlickersLoadHTML () {
    //var url4Download = "https://www.sdesimeur.com/utils/download.php?url=";
    var allQuestions = document.querySelectorAll('[ng-repeat*="question in vm.questionsInThePage"]');
    //var allQuestions = document.querySelectorAll('[ng-model="vm.question.body"]');
    //var item = allQuestions.querySelectorAll('textarea');
    for(var i=0;i<allQuestions.length;i++) {
        var item = allQuestions[i];
        var questionItemS = item.querySelectorAll('[class*="question-container"]');
        var questionItem = questionItemS[0];
        changeItemByHTML(questionItem);
    }
//                '[ng-repeat*="choice in vm.question.choices track by $index"]'
//                '[ng-click*="vm.updateQuestion()"]'
//                '[ng-click*="vm.addQuestion(true)"]'
//                '[ng-click*="vm.addQuestion()"]'

//                '[class*="question-body"]'

}

function PlickersNewQuestion () {
    //var questionDiv  = document.getElementsByClassName('question-field')[0].;
    //document.querySelectorAll('[ng-model="vm.question.body"]')

}

   /* Application */
if (self == top) { /* run only in the top frame. we do our own frame parsing */
    setInterval(PlickersLoadHTML, 3000);
}
