// ==UserScript==
// @name hacer
// @namespace https://github.com/doomred
// @description Provide a better HTML architecture for add functions and CSS design. This script is by hacers for hacers.
// @version 0.0.7
// @license ISC
// @copyleft dye E. jarhoo
// @icon https://raw.github.com/doomred/hacer/master/hacer_icon.png
// @updateURL https://raw.github.com/doomred/hacer/master/hacer.meta.js
// @resource mburl https://raw.github.com/doomred/hacer/master/hacer.meta.js
// @require            https://raw.github.com/sizzlemctwizzle/GM_config/master/gm_config.js
// @encoding utf-8
// @author dye E. jarhoo
// @homepageURL http://saltyremix.com
// @include http://h.acfun.tv/*
// @exclude http://h.acfun.tv/homepage/ref*
// @run-at document-end
// @grant GM_openInTab
// @grant GM_getResourceText
// @grant GM_registerMenuCommand
// @grant GM_getValue
// @grant GM_setValue
// ==/UserScript==

/***********
 * Many thanks for the followings, without you the mates,
 * `hacer' would not make hacers this kinds of happy!!
 *   zjworks,
 *
\*********************************************************/




  /* init foo bar variable */
var i = 0, k = 0;

  /* init variable Handler */
var hacerVersion = '0.0.7';


var altCSS, hboxCSS, nightCSS, frameNightCSS, frameDayCSS;
  /* last modified: 0.0.6 */
frameNightCSS = ' html body tbody tr td font[color="#cc1105"],font[color="#117743"] {display: none;}html body tbody tr td font[color="#789922"] {color: red;}.posttime {display: none;}.report {display: none;}.threadpost {margin: 0;}img {width: 30%;height: 30%;}table {padding: 0;width: 18em;}body{margin: 0;background-color: black;color:rgb(198,198,198) !important;}td{z-index: -50;background:rgba(50,50,60,0.7) !important;padding:9px !important;transition:background .1s ease-in-out;}td:hover {background:rgb(50,50,60) !important;}td:active {background:rgb(50,50,100) !important;}a{transition:color .1s ease-in-out;}a:link{color:rgb(100,100,224) !important}a:visited{color:rgb(100,100,190) !important}a:hover{color:lightblue !important}img{z-index: 50;opacity:0.3;transition:all .3s ease-in-out;}img:hover{opacity:0.9;}';
  /* last modified: 0.0.6 */
frameDayCSS = ' html body tbody tr td font[color="#cc1105"],font[color="#117743"] {display: none;}html body tbody tr td font[color="#789922"] {color: red;}.posttime {display: none;}.report {display: none;}.threadpost {margin: 0;}img {width: 30%;height: 30%;}table {padding: 0;width: 18em;}';
  /* last modified: 0.0.6 */
nightCSS = 'body{background-color:black;background-image:url("http://avdot.net/cover.php");background-position: center;background-repeat: no-repeat;background-attachment: fixed;background-repeat: no-repeat;color:rgb(198,198,198) !important;transition:background .5s ease-in-out;}#right_content{// background:black !important;background-image: linear-gradient(rgba(0,0,0,0.8),rgba(0,0,0,0.5), rgba(0,0,0,0.9)) !important;background-attachment: fixed;transition:background .5s ease-in-out;}td{z-index: -50;background:rgba(50,50,60,0.7) !important;border: solid 0;border-radius: 1em;padding:9px !important;transition:background .1s ease-in-out;}td:hover, .originpost {background:rgb(50,50,60) !important;// padding: 6em !important;}td:active {background:rgb(50,50,100) !important;}a{transition:color .1s ease-in-out;}a:link{color:rgb(100,100,224) !important}a:visited{color:rgb(100,100,190) !important}a:hover{color:lightblue !important}#right_content img{z-index: 50;opacity:0.3;transition:all .3s ease-in-out;}#right_content img:hover{opacity:0.9;}#menu{background:rgb(12,12,30) !important;// font-size:14px !important;}.toolbar-bottom {color:#ffffff !important;background-image: url("data:image/png;base64,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");transition:background .1s ease-in-out;}#postform_tbl input, #emotion, textarea {background-color:black !important;color:rgb(150,150,150) !important;}font[color="#707070"]{color:rgb(100,100,100);}';
  /* need some explain on version of CSS */
hboxCSS = '#thebox {display: table-cell;vertical-align: middle;background-position: center;background-repeat: no-repeat;filter: Alpha(Opacity=100);visibility: hidden;z-index: 120;margin-left: auto;margin-right: auto;}#box-bg {position: fixed;display: table;z-index: 110;top: 0;left: 0;text-align: center;width: 100% !important;height: 100% !important;background-color: rgba(0, 0, 0, 0.8);visibility: hidden;transition: all 0.5s ease-in-out;}';

  /* overwrite bad CSS plus must have CSS, custom style goto altCSS */
var htmlHead, htmlBody, owCSS;
htmlHead = window.document.getElementsByTagName("head")[0];
htmlBody = window.document.getElementsByTagName("body")[0];
owCSS = window.document.createElement("style");
owCSS.type = 'text/css';
owCSS.innerHTML += 'body {min-width: 50em; overflow-x: hidden;}';
owCSS.innerHTML += '.threadfly {width: 45%; float: left; margin-left: 1%; margin-bottom: 2em;}';
owCSS.innerHTML += '.threadfly table font {display: none;}';
owCSS.innerHTML += '.rthreads {border-left-width: 15px; border-left-style: solid; padding: 0 0 0 2%; margin: 0 0 2em 2%;}';
owCSS.innerHTML += '.posttime {margin-left: 0.5em;} p, body {margin: 0;} ';
owCSS.innerHTML += '.nav-bottom {position: fixed; bottom: 1em; right: 0; z-index: 100; font-size: 12pt !important;}';
owCSS.innerHTML += '.originpost {padding-bottom:6em !important; }';
owCSS.innerHTML += '#postform_tblabandon p {line-height: 2em; padding-bottom: 2em;}';
owCSS.innerHTML += '#dangerarea * {padding: 0 1em; background: yellow;}';
owCSS.innerHTML += '#dangerswitcher {padding: 0 0.5em; }';
owCSS.innerHTML += '#writepad {padding: 1em; background: grey;}';
owCSS.innerHTML += '#hacerfeedback, #dangerarea, #dangerswitcher, #cssswitcher, #writepadswitcher, #settingswitcher  {text-decoration: underline; }';
owCSS.innerHTML += '#alertbox {opacity: 0.9; border-color: white; border-width: 5px; border-style: solid; font-size: 18pt; position: fixed; top: 80%; left: 0.5em; transition: all 0.66s ease-in-out; background: black; z-index: 200;}';
owCSS.innerHTML += '#menu {left: -125px; opacity: 0; transition: all 0.66s ease-in-out; padding: 0 0 0 1em; overflow: hidden; height: 100%}';
htmlHead.appendChild(owCSS);

  /* init global alertNotice function */
var alertDiv;
alertDiv = document.createElement('div');
alertDiv.id = 'alertbox';
alertDiv.style.display = 'none';
htmlBody.appendChild(alertDiv);

function alertoff() {
  alertDiv.style.display = 'none';
}

function alertNotice(alertContent) {
  var alertDiv = document.getElementById('alertbox');
  alertDiv.innerHTML = alertContent;
  alertDiv.style.display = 'inline';
  window.setTimeout(alertoff, 1500);
}

function forceupdate() {
  GM_openInTab('https://raw.github.com/doomred/hacer/master/beauty.user.js');
  void(0);
}

function checkupdate() {
  var updateMB = GM_getResourceText('mburl');
  if(updateMB.search(hacerVersion) === -1) {
    alertNotice('New version Found, please wait to install.');
    GM_openInTab('https://raw.github.com/doomred/hacer/master/beauty.user.js');
  } else {
    alertNotice('`hacer\' is up-to-date');
  }
  void(0);
}

GM_registerMenuCommand('hacer | check update', checkupdate, 'h');
GM_registerMenuCommand('hacer | force update', forceupdate, 'f');

function makegrabbable(targetDiv) {  /* make position=fixed div grabbable */

  targetDiv.addEventListener('mousedown', function(e) {
    if(!e && window.event)  {e = window.event;}
      var pleft, ptop, xcoor, ycoor;
      pleft = parseInt(targetDiv.style.left, 10);
      ptop = parseInt(targetDiv.style.top, 10);
      xcoor = e.clientX;
      ycoor = e.clientY;
    window.document.onmousemove = function (e) {
      targetDiv.style.left = pleft+e.clientX-xcoor+"px";
      targetDiv.style.top = ptop+e.clientY-ycoor+"px";
    };
    window.document.onmouseup = function () {
      document.onmousemove = null;
    };}, false);
}


if(1111) { //GM_config.get('menuHide')
function disablescroll(e) {
  e.preventDefault();
  e.returnValue = false;
}


function scrollmenu(e) {
  var delta, idMenu;
  idMenu = document.getElementById('menu');
  if(!e && window.event)  {e = window.event;}
  if(e.wheelDelta) {
    delta = e.wheelDelta / 30;
  } else {
    delta = -e.detail * 10;
  }
  idMenu.scrollTop -= delta;
}

  /* initialize the menu */
var menuBlock, idRightContent, idMenu;
idRightContent = window.document.getElementById('right_content');
idMenu = window.document.getElementById("menu");
idRightContent.style.margin = 0;  /* fix right_content */
idMenu.style.margin = idMenu.style.padding = idMenu.style.overflow = '';  /* overwrite dynamic style */
idMenu.style.left = '-125px';  /* overwrite dynamic style */
menuBlock = window.document.createElement('span');  /* dirty hack, depend on dynamic generate height */
menuBlock.innerHTML = '<br />';
idMenu.appendChild(menuBlock);
idMenu.onmouseover = function () {
  window.addEventListener('DOMMouseScroll', disablescroll, false);
  window.onmousewheel = window.document.onmousewheel = disablescroll;
  idMenu.addEventListener('DOMMouseScroll', scrollmenu, false);
  idMenu.style.left = '0px';
  idMenu.style.opacity = 1;
};
idMenu.onmouseout = function () {
  window.removeEventListener('DOMMouseScroll', disablescroll, false);
  window.onmousewheel = document.onmousewheel = null;
  idMenu.style.left = '-125px';
  idMenu.style.opacity = 0;
};
}


function switchadmin(keycode) {  /* enable hidden adminTools */
  var classAdminTool, i;
  classAdminTool = document.getElementsByClassName("adminTool");
  for(i = 0; i < classAdminTool.length; i++) {
    if(keycode) {
      classAdminTool[i].style.display = 'inline';
    } else {
      classAdminTool[i].style.display = 'none';
    }
  }
}


  /*  add class threadfly */
var divThreads, divThreadsName, divThreadsStyle, k;
divThreads = document.getElementById("right_content").getElementsByTagName("div");
k = 1;
for(i = 0; i < divThreads.length; i++) {
  divThreadsName = divThreads[i].className;
  divThreadsStyle = divThreads[i].style;
  if(divThreadsStyle.clear.search('both') !== -1) {  /* del nonsense clear:both */
    if(k === 1) {
      divThreadsStyle.clear = 'none';
    }
    k *= -1;
  }
  if(divThreadsName.search('threads') !== -1) {
    divThreads[i].classList.add('threadfly');
  }
}
var classThreadfly = document.getElementsByClassName('threadfly');

  /* add class originpost and originpost-pic*/
var bqOP, bqOPPic;
for(i = 0; i < classThreadfly.length; i++) {
  bqOP = classThreadfly[i].getElementsByTagName('blockquote')[0];
  bqOPPic = classThreadfly[i].getElementsByTagName('a')[0];
  bqOP.classList.add('originpost');
  bqOPPic.classList.add('originpost-pic');
}

if(1111) {  //GM_config.get('twoupOn')
  /* dirty hack, check if in thread reply page */
if(classThreadfly.length === 1)  {
  owCSS.innerHTML += '.threadfly {width: 80%; margin: 2em 10%; } .threadpost {padding: 0 5em;}';
}

  /* remove all hr */
var hrBar = window.document.getElementsByTagName("hr");
for (i = 0; i < hrBar.length; i++) {
  hrBar[i].style.display = 'none';
}

  /* add left border and related */
k = -1;
for(i = 0; i < classThreadfly.length; i++, k *= -1) {
  if(k === 1) {
    classThreadfly[i].classList.add('rthreads');
  }
}
}

if(1111) {  //GM_config.get('twOn')
  /* use good time format */
var tmp, tmpWeekdayPost, tmpMonthPost, tmpDayPost, objDate;
var classPosttime = document.getElementsByClassName("posttime");
for(i = 0; i < classPosttime.length; i++) {
    tmp = classPosttime[i].innerHTML;
    tmpWeekdayPost = tmp.substr(0, 3);
    tmpMonthPost = tmp.substr(4, 3);
    tmpDayPost = tmp.substr(8, 2);
    tmp = tmpWeekdayPost + ', ' + tmpDayPost + ' ' + tmpMonthPost + tmp.slice(10, -5);    
    objDate = new Date(tmp);
    classPosttime[i].innerHTML = '<span>' + objDate.toLocaleDateString() + ' ' + objDate.toLocaleTimeString("zh-CN", "Asia/Berjing") + '</span><br />';
}
}


if(1111) {  //GM_config.get('navFix')
  /* replace the page navigation */
var key, tableNavigation;
tableNavigation = document.getElementsByTagName('table');
key = tableNavigation.length - 1;  /* dirty hack, may failed later */
if(tableNavigation[key].align === 'left') {
  tableNavigation[key].classList.add('nav-bottom');
  tableNavigation[key].align = '';
}
}

  /* add CSS class toolbar-bottom */
var classToolbar = document.body.getElementsByTagName('div');
for(i = 0; i < classToolbar.length; i++){
  if(classToolbar[i].style.width === '100%') {
    classToolbar[i].classList.add('toolbar-bottom');
  }
}



  /* Initilize for switchers */
function nullHandler() {  /* useless for now */
  return false;
}

var currentStyle, currentDangerious, currentAdmin, currentCSS;
currentStyle = 'day';
currentDangerious = 0;
currentAdmin = 0;
currentCSS = document.createElement('style');
currentCSS.type = 'text/css';
currentCSS.innerHTML = altCSS; /* initialize */
htmlHead.appendChild(currentCSS);

  /* add links to the toolbar-bottom */
var classToolbar = document.getElementsByClassName('toolbar-bottom')[0];
classToolbar.innerHTML += '<div id="gm-config"></div>';
classToolbar.innerHTML += '<span id="cssswitcher" >CSS off</span>'; /* initialize */
classToolbar.innerHTML += '<span id="writepadswitcher" >writepad</span>'; /* initialize writepad*/
classToolbar.innerHTML += '<span id="dangerswitcher" <pre>\/!\\DANGER\/!\\</pre></span>';  /* danger area initialize */
classToolbar.innerHTML += '<span id="settingswitcher" >SETTING</span>';
var idGMConfig = document.getElementById('gm-config');

GM_config.init(
{
  'id': 'GM_config',
  'title': 'hacer setting',
  'fields':
  {
    'quoteSize':
    {
      'label': 'Quotes recursive time: ',
      'type': 'int',
      'min': 1,
      'max': 999,
      'default': '4'
    },
    'twoupOn':
    {
      'label': 'Use 2-up style: ',
      'type': 'checkbox',
      'default': true
    },
    'menuHide':
    {
      'label': 'If menu auto hide: ',
      'type': 'checkbox',
      'default': true
    },
    'hboxOn':
    {
      'label': 'If enable hbox: ',
      'type': 'checkbox',
      'default': true
    },
    'wpOn':
    {
      'label': 'If enable writepad: ',
      'type': 'checkbox',
      'default': true
    },
    'adminOn':
    {
      'label': 'If enable adminTool: ',
      'type': 'checkbox',
      'default': true
    },
    'altCSS':
    {
      'label': 'The alternative CSS',
      'type': 'textarea',
      'default': '',
      'save': false
    },
    'twOn':
    {
      'label': 'If enable Chinese time format: ',
      'type': 'checkbox',
      'default': true
    },
    'navFix':
    {
      'label': 'If fix page-navigation position',
      'type': 'checkbox',
      'default': true
    },
    'bqOn':
    {
      'label': 'If enable betterquote',
      'type': 'checkbox',
      'default': true
    }
  },
  'events':
  {
    'init': function() { alert('onInit()'); },
    'open': function() { document.getElementById('GM_config').style = ''; },
    'save': function() { alert('onSave()'); },
    'close': function() { alert('onClose()'); },
    'reset': function() { alert('onReset()'); }
  },
  'css': '#GM_config {position: static !important; width: 99% !important; margin: 1.5em auto !important; border: 0 !important;;}',
  'frame': idGMConfig

});

if(1111) {  //GM_config.get('wpOn')
  /* add writepad */
var padDisplay, idPostformMain, padDiv;
padDisplay = 0;
idPostformMain = document.getElementById('postform_main').innerHTML;
padDiv = document.createElement('div');
padDiv.id = 'writepad';

  /* replace origin element */
var idToAbandon, padListAbandon = ['postform_tbl', '_csrf', 'emotion', 'content', 'postform_main'];  
for(i = 0; i < padListAbandon.length; i++) {
  idToAbandon = document.getElementById(padListAbandon[i]);
  idToAbandon.id += 'abandon';  /* abadon original id, move into pad smoothly */
}

  /* rebuild the postform_main */
var padForm = document.createElement('form');  
padForm.id = 'postform_main';
padForm.enctype = 'multipart/form-data';
padForm.method = 'post';
padForm.action = '/综合版1/create';
padForm.innerHTML = idPostformMain;


  /* hide origin form at top */
var trBad = document.getElementById("postform_tblabandon").getElementsByTagName("tr");
for(i = 0; i < trBad.length - 1; i++) { /* save the notice board */
  trBad[i].style.display = 'none';
}

  /* style the writepad */
padDiv.style.position = 'fixed';
padDiv.style.top = '50px';
padDiv.style.left = '50px';
padDiv.id = 'writepad';
padDiv.style.display = 'none';
padDiv.appendChild(padForm);
document.body.appendChild(padDiv);
makegrabbable(padDiv);  /* make the pad grabbable */

function padSwitchHandler() {
  if(padDisplay) {
    padDisplay = 0;
    padDiv.style.display = 'none';
  } else {
    padDisplay = 1;
    padDiv.style.display = 'inline';
  }
}
}


  /* add danger area */
var spanDanger = document.createElement('span');
spanDanger.id = 'dangerarea';
spanDanger.style.display = 'none';
spanDanger.innerHTML += '<span id="adminswitcher" >Admin off</span>';
spanDanger.innerHTML += '<span id="csschanger" >Change_CSS</span>';
classToolbar.appendChild(spanDanger);

function dangerSwitchHandler() {
  if(currentDangerious) {
    spanDanger.style.display = 'none';
    currentDangerious = 0;
  } else {
    spanDanger.style.display = 'inline';
    currentDangerious = 1;
  }
}

function feedreportback() {
  var strWindowFeatures = 'left=50, top=50 location, resizable, scrollbars, status';
  if(window.confirm('YES for github, NO for acfun')) {
    
    window.open('https://github.com/doomred/hacer/issues', 'FEED_ME_BUGS', strWindowFeatures);
  } else {
    window.open('http://acfun.tv', 'Report & Suggestion', strWindowFeatures);
  }
}

  /* add feedback element */
var fbAnchor = document.createElement('span');
fbAnchor.id = 'hacerfeedback';
fbAnchor.addEventListener('click',feedreportback, false);
fbAnchor.style.textAlign = 'right';
fbAnchor.innerHTML = 'feedback';
classToolbar.appendChild(fbAnchor);


function cssChangeHandler() {
  altCSS = window.prompt("Replace the alternate CSS");
  if(currentStyle === 'night') {
    document.getElementById('cssswitcher').innerHTML = "CSS off";
    currentCSS.innerHTML = altCSS;
    currentStyle = 'day';
  } else {
    currentCSS.innerHTML = altCSS;
  }
}


function parseframescss(targetCSS) {
var tmpWindow, i, k;
for(k = 0; k < window.top.frames.length; k++) {
  (function recursive(tmpWindow) {
    tmpWindow.document.getElementsByTagName('style')[0].innerHTML = targetCSS;
    for(i = 0; i < tmpWindow.frames.length; i++) {
        tmpWindow.frames[i].document.getElementsByTagName('style')[0].innerHTML = targetCSS;
      if(tmpWindow.frames[i].frames.length) {
        tmpWindow = tmpWindow.frames[i];
        recursive(tmpWindow);
      }
    }
    return false;
  })(window.frames[k]);
}
}
        
function cssSwitchHandler() {
  if(currentStyle === 'day') {
    currentCSS.innerHTML = nightCSS;
    parseframescss(frameNightCSS);
    document.getElementById('cssswitcher').innerHTML = "CSS on";
    currentStyle = 'night';
  } else {
    currentCSS.innerHTML = altCSS;
    parseframescss(frameDayCSS);
    document.getElementById('cssswitcher').innerHTML = "CSS off";
    currentStyle = 'day';
  }
}

function adminSwitchHandler() {
  if(currentAdmin) {
    currentAdmin = 0;
    switchadmin(currentAdmin);
    document.getElementById('adminswitcher').innerHTML = "Admin off";
  } else {
    currentAdmin = 1;
    switchadmin(currentAdmin);
    document.getElementById('adminswitcher').innerHTML = "Admin on";
  }
}
document.getElementById('cssswitcher').addEventListener('click', cssSwitchHandler, false);
document.getElementById('writepadswitcher').addEventListener('click', padSwitchHandler, false);
document.getElementById('dangerswitcher').addEventListener('click', dangerSwitchHandler, false);
document.getElementById('adminswitcher').addEventListener('click', adminSwitchHandler, false);
document.getElementById('csschanger').addEventListener('click', cssChangeHandler, false);
document.getElementById('settingswitcher').addEventListener('click', function () {GM_config.open();}, false);


if(1111) {  //GM_config.get('bqOn')
/* remove refView divbox */
var idRefView = window.top.document.getElementById('refView');
if(idRefView) {
  window.document.body.removeChild(idRefView);
}

function callResize(objWindow) {
  var frameWinList, frameList, heightNew, widthNew, i;
  frameWinList = objWindow.frames;
  frameList = objWindow.document.getElementsByTagName('iframe');
  for(i = 0; i < frameWinList.length; i++) {
    heightNew = frameWinList[i].document.getElementsByTagName('table')[0].clientHeight + 5;  /* 5 is MAGIC */
    widthNew = frameWinList[i].document.getElementsByTagName('table')[0].clientWidth + 5;  /* 5 is MAGIC */
    frameList[i].style.height = heightNew + "px";
    frameList[i].style.width = widthNew + "px";  
    frameList[i].scrolling = 'no';
  }
}

function pausecomp(millis) { /* busy sleep, debug usage _only_ */
  var date, curDate;
  date = new Date();
  curDate = null;
  do { curDate = new Date(); }
  while(curDate-date < millis);
}

function betterquote(targetObj) {  /* betterQuote display */
  var numFrames, quoteFrame, quoteFrameParent, fontBar, tmpColor, tmp, quoteFrameSrc, tpBar;
  numFrames = 0;
  quoteFrame = [];
  quoteFrameParent = [];
  tpBar = targetObj.document.getElementsByClassName("threadpost");
    for(k = 0; k < tpBar.length; k++) {
      fontBar = tpBar[k].getElementsByTagName("font");
      for(i = 0; i < fontBar.length; i++) {
        tmpColor = fontBar[i].color;
        if(tmpColor.search('789922') !== -1) {  /* replace font with iframe tag */
          tmp = fontBar[i].innerHTML;
          tmp = tmp.substr(tmp.search('No') + 3);
          if(!isNaN(parseInt(tmp, 10))) {  /* abandon on nonsense */
            numFrames += 1;
            quoteFrameSrc = 'http://h.acfun.tv/homepage/ref?tid=' + tmp ;
            quoteFrame[i] = document.createElement("iframe");
            quoteFrame[i].src = quoteFrameSrc;
            quoteFrame[i].onload = frameOnloadHandler; /* use onload Handler, instead of checkonload */
            quoteFrameParent[i] = fontBar[i].parentNode;
            quoteFrameParent[i].replaceChild(quoteFrame[i], fontBar[i]);   
            i--;  /* dirty hack, onSuccess, fontBar.length will minus one */
          } else {
            fontBar[i].color = 'blue';  /* recolor nonsense quotes */
          }
        }
      }
    }
  if(numFrames) {return 1;}
  return false;
}

function styletheframe(targetObj) {  /* insert css into iframe */
  var headFrame, iframeCSS, tdFirst, anchorInFrame;
  if(!targetObj.document.getElementsByClassName('fivehundred').length) {  /* handle 40x page */
    headFrame = targetObj.document.getElementsByTagName('head')[0];
    iframeCSS = document.createElement('style');
    iframeCSS.type = 'text/css';
    iframeCSS.innerHTML += 'html body tbody tr td font[color="#cc1105"],font[color="#117743"] {display: none;}';
    iframeCSS.innerHTML += 'html body tbody tr td font[color="#789922"] {color: red;}';
    iframeCSS.innerHTML += '.posttime {display: none;}';
    iframeCSS.innerHTML += '.report {display: none;}';
    iframeCSS.innerHTML += '.threadpost {margin: 0 0 0 0;}';
    iframeCSS.innerHTML += 'img {width: 30%; height: 30%}';
    iframeCSS.innerHTML += 'table {padding: 0; width: 18em;}';
      /* add condition on css switch */
    headFrame.appendChild(iframeCSS);
    tdFirst = targetObj.document.getElementsByTagName('td')[0];
    tdFirst.parentElement.removeChild(tdFirst);
    anchorInFrame = targetObj.document.getElementsByTagName('a');
    for(i = 0; i < anchorInFrame.length; i++) {  /* fix in_frame link */
      anchorInFrame[i].target = '_top';
    }
  } else {
    targetObj.document.body.innerHTML = 'QUOTE_ERROR';  /* EDGE handler */
    window.alert('HOLLLY SHIT!! It looks like you have met some boobs not able to handle the quote usage, please either hate them or blame monkeys@h.acfun.tv for not setting just a timeoutID for 40x pages\' nonsense setTimeout() event.');
    if(window.confirm('YES: Automatic open current into new tab, i.e: to save yourselves. NO&Cancel: Waiting for the doomsday.')) {
      GM_openInTab(window.location.href);
    }
  }
}

function frameOnloadHandler(e) {
  var eventSender, windowCaller, tmp, mainFrameKey, recurKey, tmpWindow, fontBar, tmpBuffer;  /* gl: mainFrameList, quoteSize */
  if(!e && window.event)  {e = window.event;}
  eventSender = (window.event) ? e.srcElement : e.target;
  windowCaller = eventSender.contentWindow || eventSender;
  if(1111) {imageparse(windowCaller);}
    /* get mainFrameId */
  tmp = windowCaller;
  while(tmp.name === '' || tmp.name.search('iframe') === -1)  {tmp = tmp.parent;}
  mainFrameKey = tmp.name.substr(7);
  recurKey = mainFrameList[mainFrameKey];
  mainFrameList.splice(mainFrameKey, 1, recurKey + 1);
  if(mainFrameList[mainFrameKey] < quoteSize) {
    if(!betterquote(windowCaller)) {
      styletheframe(windowCaller);
      tmpWindow = windowCaller.parent;
      while(window.top !== tmpWindow) {
        styletheframe(tmpWindow);
        callResize(tmpWindow);
        tmpWindow = tmpWindow.parent;
      }
      setTimeout(function() {callResize(window);}, 2500);  /* dirty hack, MAGIC reduce error */
    }
  } else {
    fontBar = windowCaller.document.getElementsByTagName('font');
    for(i = 0; i < fontBar.length; i++) {
      if(fontBar[i].color === '#789922') {
        fontBar[i].title = 'Reached quoteSize limit.';
        tmpBuffer = fontBar[i].innerHTML;
        tmpBuffer = tmpBuffer.substr(tmpBuffer.search('No') + 3);
        fontBar[i].onclick = function () {GM_openInTab('http://h.acfun.tv/homepage/ref?tid=' + tmpBuffer);};
      }
    }
    styletheframe(windowCaller);
    tmpWindow = windowCaller.parent;
    while(window.top !== tmpWindow) {
      styletheframe(tmpWindow);
      callResize(tmpWindow);
      tmpWindow = tmpWindow.parent;
    }
    callResize(window);
  }
}

  /* betterquote @window */
var mainFrameKey, mainFramList, quoteFrame, quoteFrameParent, fontBar, tmpColor, tmp, quoteFrameSrc, i, tpBar, k;
mainFrameKey = 0;
mainFrameList = [];
quoteFrame = [];
quoteFrameParent = [];
tpBar = window.document.getElementsByClassName("threadpost");
for(k = 0; k < tpBar.length; k++) {
  fontBar = tpBar[k].getElementsByTagName("font");
  for(i = 0; i < fontBar.length && i >= 0; i++) {  /* left when parsed all */
    tmpColor = fontBar[i].color;
    if(tmpColor.search('789922') !== -1) {  /* replace font with iframe tag */
      tmp = fontBar[i].innerHTML;
      tmp = tmp.substr(tmp.search('No') + 3);
      if(!isNaN(parseInt(tmp, 10))) {  /* abandon on nonsense */
        mainFrameList.push(0);
        quoteFrameSrc = 'http://h.acfun.tv/homepage/ref?tid=' + tmp ;
        quoteFrame[i] = document.createElement("iframe");
        quoteFrame[i].src = quoteFrameSrc;
        quoteFrame[i].name = 'iframe_' + mainFrameKey;
        quoteFrame[i].onload = frameOnloadHandler; /* use onload Handler, instead of checkonload */
        quoteFrameParent[i] = fontBar[i].parentNode;
        quoteFrameParent[i].replaceChild(quoteFrame[i], fontBar[i]);   
        mainFrameKey += 1;
        i--;  /* dirty hack, onSuccess, fontBar.length will minus one */
      } else {
        fontBar[i].color = 'blue';  /* recolor the nonsense */
      }
    }
  }  
}
}
