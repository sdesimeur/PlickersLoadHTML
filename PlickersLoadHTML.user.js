// ==UserScript==
// @name         PlickersLoadHTML
// @namespace    http://sdesimeur.com/
// @version      1.2
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
    for(i=0;i<allQuestions.length;i++) {
        var item = allQuestions[i];
        questionItem = item.querySelectorAll('[class*="question-container"]')[0];
        if (! questionItem.classList.contains('turnInHTML')) {
            questionItem.classList.add('turnInHTML')
            result = regexURL.exec(tab[j]);
            if (result !== null) {
                tmpURL = result[1];
                questionDiv = questionItem.querySelectorAll('[class*="table-question"')[0];
                questionDiv.style.display = "none";
                    /*
                    var oReq = new XMLHttpRequest();
                    oReq.open("GET", url4Download + btoa(tmpURL+"/Question.html"), true);
                    oReq.onreadystatechange = function() {
                        if (oReq.readyState === XMLHttpRequest.DONE) {
                            tab[j]=oReq.response;
                            tabsOK++;
                            if (tabsOK==nbtabs) {
                                item.value=tab.join('');
                            }
                        }
                    };
                    oReq.send();
                    */
                var ifrm = document.createElement("iframe");
                ifrm.src = tmpURL+'/Question.html';
                ifrm.style.border = "0 none #000000";
                questionDiv.parentNode.insertBefore(ifrm,questionDiv);
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
