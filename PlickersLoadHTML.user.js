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
    var regexURL = /\s*\{.*\}\s*/;
    for(i=0;i<allQuestions.length;i++) {
        var item = allQuestions[i];
        var tab=item.outerText.split(":::");
        //var tab=item.value.split(":::");
        if (tab.length > 1) {
            var tabsOK = 0;
            var nbtabs = tab.length;
            for(j=0;j<tab.length;j++) {
                if (regexURL.test(tab[j])) {
                    tmpURL = tab[j].replace(/^\s*\{\s*/,'').replace(/\s*\}\s*$/,'');
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
                    tab[j]='<iframe src="' + tmpURL +'/Question.html" width="100%" height="100%" frameborder="0"></iframe>';
                } else { tabsOK ++; }
            }
            item.outerText=tab.join('');
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
