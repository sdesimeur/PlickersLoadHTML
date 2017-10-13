// ==UserScript==
// @name         PlickersLoadHTML
// @namespace    http://sdesimeur.com/
// @version      1.13
// @description  try to take over the world!
// @author       SDesimeur
// @include https://plickers.com/*
// @include https://*.plickers.com/*
// @include https://www.plickers.com/*
// @grant        none
// @run-at document-end
// ==/UserScript==

function PlickersLoadHTML () {
    var url4Download = "https://www.sdesimeur.com/utils/download.php?url=";
    var allQuestions = document.querySelectorAll('[ng-repeat*="question in vm.questionsInThePage"]');
    //var allQuestions = document.querySelectorAll('[ng-model="vm.question.body"]');
    //var item = allQuestions.querySelectorAll('textarea');
    var regexURL = /:::\{\s*(.*)\s*\}:::/;
    for(var i=0;i<allQuestions.length;i++) {
        var item = allQuestions[i];
        var questionItem = item.querySelectorAll('[class*="question-container"]')[0];
        if (! questionItem.classList.contains('turnInHTML')) {
            var result = regexURL.exec(item.outerText);
            if (result !== null) {
                var tmpURL = result[1];
                var questionDiv = questionItem.querySelectorAll('[class*="table-question"')[0];
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
                                var srctxt = srcs[k].src;
                                if (! (/^\s*(http|data)/g.test(srctxt))) {
                                    srcs[k].src = tmpURL + "/" + srctxt;
                                }
                            }
                            console.log(sp.innerHTML);
                            questionDiv.parentNode.insertBefore(sp,questionDiv);
                        }
                };
                oReq.send();
            }
        }
    }

}

function PlickersNewQuestion () {
    //var questionDiv  = document.getElementsByClassName('question-field')[0].;
    //document.querySelectorAll('[ng-model="vm.question.body"]')

}

   /* Application */
if (self == top) { /* run only in the top frame. we do our own frame parsing */
    setInterval(PlickersLoadHTML, 3000);
}
