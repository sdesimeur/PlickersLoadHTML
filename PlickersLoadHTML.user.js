// ==UserScript==
// @name         PlickersLoadHTML
// @namespace    http://sdesimeur.com/
// @version      1
// @description  try to take over the world!
// @author       SDesimeur
// @include https://plickers.com/*
// @include https://*.plickers.com/*
// @include https://www.plickers.com/*
// @grant        none
// @run-at document-end
// ==/UserScript==

function PlickersLoadHTML () {
    //var allQuestions = document.querySelectorAll('[ng-repeat*="question in vm.questionsInThePage"]');
    var allQuestions = document.querySelectorAll('[ng-model="vm.question.body"]').;
    //var textArea = allQuestions.querySelectorAll('textarea');
    var regexURL = /\s*\{.*\}\s*/;
    for(i=0;i<allQuestions.length;i++) {
        var textArea = allQuestions[i].querySelector('textarea');
        var tab=textArea.value.split(":::");
        if (tab.length > 1) {
            var tabsOK = 0;
            var nbtabs = tab.length;
            for(j=0;j<tab.length;j++) {
                if (regexURL.test(tab[j])) {
                    tmpURL = tab[j].replace("^\s*\{\s*",'').replace("\s*\}\s*$",'');
                    var oReq = new XMLHttpRequest();
                    oReq.open("GET", tmpURL+"Question.html", true);
                    oReq.responseType = "text\/plain";
                    oReq.onload = function(oEvent) {
                        tab[j]=oReq.response;
                        tabsOK++;
                        if (tabsOK==nbtabs) {
                            textArea.value=tab.join('');
                        }
                    };
                    oReq.send();
                } else { tabsOK ++; }
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
