// ==UserScript==
// @name         PlickersLoadHTML
// @namespace    http://sdesimeur.com/
// @version      1.26
// @description  try to take over the world!
// @author       SDesimeur
// @include https://plickers.com/*
// @include https://*.plickers.com/*
// @include https://www.plickers.com/*
// @grant        none
// @run-at document-end
// ==/UserScript==


function changeItemByHTML (questionDiv) {
    //var url4Download = "https://www.sdesimeur.com/utils/download.php?url=";
        if (! questionDiv.classList.contains('turnInHTML')) {
            var regexURL = /:::\{\s*(.*)\s*\}:::/;
            var result = regexURL.exec(questionDiv.outerText);
            if (result !== null) {
                var tmpURL = result[1];
                questionDiv.style.display = "none";
                var oReq1 = new XMLHttpRequest();
                //oReq.open("GET", url4Download + btoa(tmpURL+"/Question.html"), true);
                oReq1.open("GET", tmpURL+"/Question.html", true);
                oReq1.onreadystatechange = function() {
                        if (oReq1.readyState === XMLHttpRequest.DONE) {
                            questionDiv.classList.add('turnInHTML');
                            var sp = document.createElement("span");
                            sp.id="mySpan";
                            sp.innerHTML=oReq1.responseText;
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
                oReq1.send();
            }
        }
        if (! questionDiv.classList.contains('trueResponsesChanged')) {
                var oReq2 = new XMLHttpRequest();
                //oReq.open("GET", url4Download + btoa(tmpURL+"/Question.html"), true);
                oReq2.open("GET", tmpURL+"/TrueResponses.txt", true);
                oReq2.onreadystatechange = function() {
                        if (oReq2.readyState === XMLHttpRequest.DONE) {
                            questionDiv.classList.add('trueResponsesChanged');
                            var resp=oReq2.responseText;
                            var choices = angular.element(questionDiv).scope().vm.question.choices;
                            var cl = choices.length;
                            for (var k=0;k<cl;k++) {
                                choices[k].correct = (new RegExp(String.fromCharCode("A".charCodeAt(0)+k))).test(resp);
                            }
                        }
                };
                oReq2.send();
        }
}


function PlickersLoadHTML () {
    var questionDivS = document.querySelectorAll('[class*="question-body"]');
    if ( questionDivS.length !== 0 ) {
        var questionDiv = questionDivS[0];
        changeItemByHTML(questionDiv);
    } else {
	    var allQuestions = document.querySelectorAll('[ng-repeat*="question in vm.questionsInThePage"]');
	    //var allQuestions = document.querySelectorAll('[ng-model="vm.question.body"]');
	    //var item = allQuestions.querySelectorAll('textarea');
        var aql = allQuestions.length;
        if (aql !== 0) for (var i=0;i<aql;i++) {
            var item = allQuestions[i];
	        var questionItemS = item.querySelectorAll('[class*="question-container"]');
	        if ( questionItemS.length !== 0 ) {
	            questionDivS = questionItemS[0].querySelectorAll('[class*="table-question"');
                if (questionDivS.length !== 0) {
	                changeItemByHTML(questionDivS[0]);
                }
	        }
	    }
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
