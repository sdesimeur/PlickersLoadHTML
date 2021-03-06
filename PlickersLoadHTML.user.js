//==UserScript==
// @name		 PlickersLoadHTML
// @namespace	http://sdesimeur.com/
// @version	  1.66
// @description  try to take over the world!
// @author	SDesimeur
// @include https://plickers.com/*
// @include https://*.plickers.com/*
// @include https://www.plickers.com/*
// @grant		none
// @run-at document-end
//==/UserScript==


var mathjaxloaded = false;

function changeItemByHTML (questionDiv,questionSec) {
	//var url4Download="https://www.sdesimeur.com/utils/download.php?url=";
	var regexURL=/:::\{\s*(.*)\s*\}:::/;
	var result=questionDiv.outerText.replace(/(\r|\n|\t)/g,"").match(regexURL);
	if (result!==null) {
		var tmpURL=result[1];
		if (! questionDiv.classList.contains('turnInHTML')) {
			questionDiv.classList.add('turnInHTML');
			questionDiv.style.display="none";
			var sp=document.createElement("span");
			sp.id="mySpan";
			regexURL=/^http/;
			if (tmpURL.match(regexURL)) {
				var oReq1=new XMLHttpRequest();
				//oReq.open("GET", url4Download + btoa(tmpURL+"/Question.html"), true);
				oReq1.open("GET", tmpURL+"/Question.html", true);
				oReq1.onreadystatechange=function() {
					if (this.readyState === XMLHttpRequest.DONE)
					if (this.status===200)
					if (!(/<\s*body[>\s]/g.test(this.responseText))) {
						sp.innerHTML=this.responseText;
						var srcs=sp.querySelectorAll('[src]');
						for (var k=0;k<srcs.length;k++) {
							var srctxt=srcs[k].attributes[0].nodeValue;
							if (! (/^\s*(http|data)/g.test(srctxt))) {
								srcs[k].src=tmpURL + "/" + srctxt;
							}
						}
						questionDiv.parentNode.insertBefore(sp,questionDiv);
					}
				};
				oReq1.send();
			} else {
				//sp.innerHTML=tmpURL.atob();
				sp.innerHTML=(tmpURL.match(/=$/)==null)?tmpURL:atob(tmpURL);
				questionDiv.parentNode.insertBefore(sp,questionDiv);
			}

		}

		if (questionSec!==null) {
			var currentQuestionEditorVM=angular.element(questionSec.querySelector('pl-question-editor').querySelector('[class*="question-editor"]')).scope().vm;
            var choices=currentQuestionEditorVM.question.choices;
			if (! questionDiv.classList.contains('trueResponsesChanged')) {
				questionDiv.classList.add('trueResponsesChanged');
				var oReq2=new XMLHttpRequest();
				//oReq.open("GET", url4Download + btoa(tmpURL+"/Question.html"), true);
				oReq2.open("GET", tmpURL+"/TrueResponses.txt", true);
				oReq2.onreadystatechange=function() {
					if (this.readyState === XMLHttpRequest.DONE)
					if (this.status===200)
					if (!(/<\s*body[>\s]/g.test(this.responseText))) {
						var resp=this.responseText;
						//if (resp.length<20) {
						var cl=choices.length;
						for (var k=0;k<cl;k++) {
							choices[k].correct=(new RegExp(String.fromCharCode("A".charCodeAt(0)+k))).test(resp);
						}
						currentQuestionEditorVM.updateQuestion();
						//}
					}
				};
				oReq2.send();
			}
			var currentPollVM=angular.element(questionSec.querySelector('[class*="poll-manager"]')).scope().vm;
            var sections=currentPollVM.sections;
            var queuedPollSections=angular.element(questionSec.querySelector('pl-poll-manager')).scope().vm.queuedPollSections;
			var oReq3=new XMLHttpRequest();
			//oReq.open("GET", url4Download + btoa(tmpURL+"/Question.html"), true);
			oReq3.open("GET", tmpURL+"/Sections.txt", true);
			oReq3.onreadystatechange=function() {
				if (this.readyState === XMLHttpRequest.DONE)
				if (this.status===200)
				if (!(/<\s*body[>\s]/g.test(this.responseText))) {
					var resp=this.responseText;
					//if (resp.length<20) {
					var sl=sections.length;
					for (var k=0;k<sl;k++)
						if (new RegExp(sections[k].name).test(resp))
							if ((queuedPollSections===null) || (!queuedPollSections.hasOwnProperty(sections[k].id)))
								currentPollVM.addPollForQuestionAndSection(sections[k]);
					//currentVM.updateQuestion();
					//}
				}
			};
			oReq3.send();
		}
	}
}


function PlickersLoadHTML () {
	var allQuestions=document.querySelectorAll('[class*="question-body"]');
	var aql=allQuestions.length;
	var questionDiv;
	if ( aql!==0 ) for (var i=0;i<aql;i++) {
		questionDiv = allQuestions[i];
		if (questionDiv!==null) {
			changeItemByHTML(questionDiv,null);
		}
	} else {
		allQuestions=document.querySelectorAll('pl-library-question');
		//var allQuestions=document.querySelectorAll('[ng-model="vm.question.body"]');
		//var item=allQuestions.querySelectorAll('textarea');
		aql=allQuestions.length;
		if (aql!==0) for (var j=0;j<aql;j++) {
			var questionItem=allQuestions[j];
			questionDiv=questionItem.querySelector('[class*="table-question"]');
			if (questionDiv!==null) {
				changeItemByHTML(questionDiv,questionItem);
			}
		}
	}
//	'[ng-repeat*="choice in vm.question.choices track by $index"]'
//	'[ng-click*="vm.updateQuestion()"]'
//	'[ng-click*="vm.addQuestion(true)"]'
//	'[ng-click*="vm.addQuestion()"]'

//	'[class*="question-body"]'
	MathJax.Hub.Typeset();
}

function OnLoadMathJax(){
	var startTime = new Date();
	console.log('TeXify-Plickers MATHJAX READY ' + startTime.toLocaleTimeString());
	
	MathJax.Hub.Config({
		showProcessingMessages : false,
		tex2jax: {
			inlineMath: [ ['[;',';]'] ],
			processEscapes: true
		}
	});
	
	mathjaxloaded = true;
}

   /* Application */
if (self==top) { /* run only in the top frame. we do our own frame parsing */
	var script = document.createElement('script');
	script.type = 'text/javascript';
	/* end 30/04/2017 : script.src = "https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-MML-AM_CHTML"; */
	script.src = "https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.1/MathJax.js?config=TeX-MML-AM_CHTML";
	script.onload = OnLoadMathJax;
	document.head.appendChild(script);
	setInterval(PlickersLoadHTML, 5000);
}
