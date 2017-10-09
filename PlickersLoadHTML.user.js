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

}

function PlickersNewQuestion () {
    var questionDiv  = document.getElementsByClassName('question-field');

}

   /* Application */
if (self == top) { /* run only in the top frame. we do our own frame parsing */
    setInterval(PlickersLoadHTML, 3000);
}
