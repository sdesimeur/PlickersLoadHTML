# PlickersLoadHTML


1.  Installation.  
You have to install two plugins:  
  In Chrome.  
  `a.  `[Allow-Control-Allow-Origin: *](https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi)  
  `b.  `[Tampermonkey](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)  
  In FireFox (Not tested).  
  `a.  `[CORS Everywhere](https://addons.mozilla.org/fr/firefox/user/spenibus/)  
  `b.  `[Greasemonkey](https://addons.mozilla.org/fr/firefox/addon/greasemonkey/)  

Then install the [PlickersLoadHTML's script](https://github.com/sdesimeur/PlickersLoadHTML/raw/master/PlickersLoadHTML.user.js).  

2. Create resources.  
You can find a sample in the directory [TestDir](https://github.com/sdesimeur/PlickersLoadHTML/tree/master/TestDir)  
Description of the content of each file:
  `a.  `Question.html  
  this file have to contain the question with the purposed responses (A,B,C,D).  
  it can be formatted with html's tags.  
  `b.  `Sections.txt  
  this file have to contain the classe's names (which are case sensitive) to which the question must be proposed.  
  `c.  `TrueResponses.txt  
  this file have to contain the true responses (which are case sensitive) with any separator (space,return,semicolon,...).  
  Sample: A,B  
  Or B C D  

3.  Put the directories resources in an page hosting which supports the protocol HTTPS.  

4.  After launching page [Plickers](https://www.plickers.com)  
You must always stop and restart the plugin [Allow-Control-Allow-Origin: *](https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi)  

5.  To add a new question in [Plickers](https://www.plickers.com)  
You have to put the link of the https url directory between :::{  and }::: in the text editing area "Add question text here..." and nothing else.
Sample:  
:::{https://www.sdesimeur.com/College/Plickers/TestDir/}:::

