// ==UserScript==
// @name hacer
// @namespace https://github.com/doomred
// @description Provide a better HTML architecture for add functions and CSS design. This script is by hacers for hacers.
// @version 0.0.5
// @license ISC
// @copyleft dye E. jarhoo
// @icon https://raw.github.com/doomred/hacer/master/hacer_icon.png
// @updateURL https://raw.github.com/doomred/hacer/master/hacer.meta.js
// @encoding utf-8
// @author dye E. jarhoo
// @homepageURL http://saltyremix.com
// @include http://h.acfun.tv/*
// @run-at document-end
// @grant none
// ==/UserScript==

/* Many thanks for the followings, without you the mates,
 * `hacer' would not make hacers this kinds of happy!!
 *   zjworks
 *
 */

var htmlHead, htmlBody, owCSS, hboxCSS, nightCSS, dayCSS;
dayCSS = '';
  /* need some explain on version of CSS */
nightCSS = 'body{background-color:black;background-image:url("http://avdot.net/cover.php");background-position: center;background-repeat: no-repeat;background-attachment: fixed;background-repeat: no-repeat;color:rgb(198,198,198) !important;transition:background .5s ease-in-out;}#right_content{// background:black !important;background-image: linear-gradient(rgba(0,0,0,0.8),rgba(0,0,0,0.5), rgba(0,0,0,0.9)) !important;background-attachment: fixed;transition:background .5s ease-in-out;}td{z-index: -50;background:rgba(50,50,60,0.7) !important;border: solid 0;border-radius: 1em;padding:9px !important;transition:background .1s ease-in-out;}td:hover, .originpost {background:rgb(50,50,60) !important;// padding: 6em !important;}td:active {background:rgb(50,50,100) !important;}a{transition:color .1s ease-in-out;}a:link{color:rgb(100,100,224) !important}a:visited{color:rgb(100,100,190) !important}a:hover{color:lightblue !important}#right_content img{z-index: 50;opacity:0.3;transition:all .3s ease-in-out;}#right_content img:hover{opacity:0.9;}#menu{background:rgb(12,12,30) !important;// font-size:14px !important;}.toolbar-bottom {color:#ffffff !important;background-image: url("data:image/png;base64,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");transition:background .1s ease-in-out;}#postform_tbl input, #emotion, textarea {background-color:black !important;color:rgb(150,150,150) !important;}font[color="#707070"]{color:rgb(100,100,100);}';
  /* need some explain on version of CSS */
hboxCSS = '#thebox {display: table-cell;vertical-align: middle;background-position: center;background-repeat: no-repeat;filter: Alpha(Opacity=100);visibility: hidden;z-index: 120;margin-left: auto;margin-right: auto;}#box-bg {position: fixed;display: table;z-index: 110;top: 0;left: 0;text-align: center;width: 100% !important;height: 100% !important;background-color: rgba(0, 0, 0, 0.8);visibility: hidden;transition: all 0.5s ease-in-out;}';
  /* overwrite bad CSS plus must have CSS, style goto dayCSS */
htmlHead = window.document.getElementsByTagName("head")[0];
htmlBody = window.document.getElementsByTagName("body")[0];
owCSS = window.document.createElement("style");
owCSS.type = 'text/css';
owCSS.innerHTML += '.threadfly {width: 45%; float: left; margin-left: 1%; margin-bottom: 2em;}';
owCSS.innerHTML += '.threadfly table font {display: none;}';
owCSS.innerHTML += '.rthreads {border-left-width: 15px; border-left-style: solid; padding: 0 0 0 2%; margin: 0 0 2em 2%;}';
owCSS.innerHTML += '.posttime {margin-left: 0.5em;} p, body {margin: 0;} ';
owCSS.innerHTML += '.nav-bottom {position: fixed; bottom: 1em; right: 0; z-index: 100; font-size: 12pt !important;}';
owCSS.innerHTML += '.originpost {padding-bottom:6em !important; }';
owCSS.innerHTML += '#postform_tblabandon p {line-height: 2em; padding-bottom: 2em;}';
owCSS.innerHTML += '#dangerarea * {padding: 0 1em; background: yellow;}';
owCSS.innerHTML += '#dangerswitcher, #cssswitcher {padding: 0 0.5em; }';
owCSS.innerHTML += '#writepad {padding: 1em; background: grey;}';
owCSS.innerHTML += '#hacerfeedback, #dangerarea, #dangerswitcher, #cssswitcher, #writepadswitcher  {text-decoration: underline; }';
owCSS.innerHTML += '#alertbox {opacity: 0.8; border-color: white; border-width: 5px; border-style: solid; font-size: 18pt; position: fixed; top: 80%; left: 0.5em; transition: all 0.66s ease-in-out; background: black; z-index: 200;}';
owCSS.innerHTML += '#menu {left: -125px; opacity: 0; transition: all 0.66s ease-in-out; padding: 0 0 0 1em; overflow: hidden; height: 100%}';
htmlHead.appendChild(owCSS);

  /* init foo bar variable */
var key = 0, i = 0, k = 0;


  /* init variable Handler */
var quoteSize = 4;


  /* init alertNotice */
var alertNotice, alertDiv;
alertNotice = '';
alertDiv = document.createElement('div');
alertDiv.id = 'alertbox';
alertDiv.style.display = 'none';
htmlBody.appendChild(alertDiv);

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


function switchadmin(keycode) {  /* enable hidden adminTools */
  var key, classAdminTool;
  classAdminTool = document.getElementsByClassName("adminTool");
  for(key in classAdminTool) {
    if(classAdminTool.hasOwnProperty(key)) {
      if(keycode) {
        classAdminTool[key].style.display = 'inline';
      } else {
        classAdminTool[key].style.display = 'none';
      }
    }
  }
}

  /* remove all hr */
var hr = document.getElementsByTagName("hr");
for (key in hr) {
  if(hr.hasOwnProperty(key)) {
    hr[key].style.display = 'none';
  }
}


  /* for 2up style, add reasonable class */
var divThreads, divThreadsName, divThreadsStyle, k;
divThreads = document.getElementById("right_content").getElementsByTagName("div");
k = 1;
for(i = 0; i < divThreads.length; i++) {
  divThreadsName = divThreads[i].className;
  divThreadsStyle = divThreads[i].style;
  if(divThreadsName.search('threads') !== -1) {
    divThreads[i].classList.add('threadfly');
  }
  
    /* for 2up sytle, del nonsense clear:both */
  if(divThreadsStyle.clear.search('both') !== -1) {
    if(k === 1) {
      divThreadsStyle.clear = 'none';
    }
    k *= -1;
  }
}

  /* dirty hack, check if in thread reply page */
var classThreadfly, blThreadMode;
classThreadfly = document.getElementsByClassName('threadfly');
if(classThreadfly.length === 1)  {
  blThreadMode = 1;
  owCSS.innerHTML += '.threadfly {width: 80%; margin: 2em 10%; } .threadpost {padding: 0 5em;}';
}

  /* for 2up sytle, add left border and related */
var k = -1;
for(i = 0; i < classThreadfly.length; i++, k *= -1) {
  if(k === 1) {
    classThreadfly[i].classList.add('rthreads');
  }
}

  /* add class originpost and originpost-pic*/
var bqOP, bqOPPic;
for(key in classThreadfly) {
  if(classThreadfly.hasOwnProperty(key)) {
    bqOP = classThreadfly[key].getElementsByTagName('blockquote')[0];
    bqOPPic = classThreadfly[key].getElementsByTagName('a')[0];
    bqOP.classList.add('originpost');
    bqOPPic.classList.add('originpost-pic');
  }
}

  /* use good time format */
var tmp, tmpWeekdayPost, tmpMonthPost, tmpDayPost, objDate;
var classPosttime = document.getElementsByClassName("posttime");
for(key in classPosttime) {
  if(classPosttime.hasOwnProperty(key)) {
    tmp = classPosttime[key].innerHTML;
    tmpWeekdayPost = tmp.substr(0, 3);
    tmpMonthPost = tmp.substr(4, 3);
    tmpDayPost = tmp.substr(8, 2);
    tmp = tmpWeekdayPost + ', ' + tmpDayPost + ' ' + tmpMonthPost + tmp.slice(10, -5);    
    objDate = new Date(tmp);
    classPosttime[key].innerHTML = '<span>' + objDate.toLocaleDateString() + ' ' + objDate.toLocaleTimeString("zh-CN", "Asia/Berjing") + '</span><br />';
  }
}

  /* replace the page navigation */
var key, tableNavigation;
tableNavigation = document.getElementsByTagName('table');
key = tableNavigation.length - 1;
if(tableNavigation[key].align === 'left') {
  tableNavigation[key].classList.add('nav-bottom');
  tableNavigation[key].align = '';
}

  /* add CSS class toolbar-bottom */
var classToolbar = document.body.getElementsByTagName('div');
for(i = 0; i < classToolbar.length; i++){
  if(classToolbar[i].style.width === '100%') {
    classToolbar[i].classList.add('toolbar-bottom');
  }
}


/* Use hbox to popup the Images
 * Rewrite from:  http://www.codeproject.com/Articles/32819/JavaScript-Image-Popup
 * Start Initializing
 */

var hboxLoadImage = 'url("data:image/gif;base64,R0lGODlhyAAyAKECAI0gF/z9+v8AAP8AACH/C05FVFNDQVBFMi4wAwEAAAAh/iRDcmVhdGVkIHdpdGggR0lNUCwKYnkgZG9vbXJlZEBnaXRodWIAIfkEBQoAAgAsAAAAAMgAMgAAAv6Mj6nL7Q+jnLTai7PevPsPhuJIluaJpurKtu4Lx/JM1/aN5/rO9/4PDAqHxKLxiEwql8ymUwkAyKIV6YLKwGa0z6yVEg2Lx+MG10BOK8LmL+bcTcAf6TrZu7az5fPAfuvGpDcYiEZYh8d35/Dnd1jY1vWImAfp5aZnKGHneDjRF+dYBVqJkCm6qWZKejC5iFQIZ2k4W8r4xRqpGOH6WtSI2goKfFv7l5vYeboaO0c81Mj1LFy724ZbfUm9TH0FOS0kjV0NbuuN6Zl3zuv8jdxzjA3RK3bNPGi+muq+/vS+3UubPmb2aD0iqC5fEHq+aH1qFy0QuHrK0jlMaA0aQ8+KCNk1K6OpoyKOnUR2w2iSSMRsKUepOvOM0sWZ9+glkcXy5Js7bGDilIIF6MGaAWE1QzkQkFArTCU6C2kQX0uIN/kZTMZhZUZvRDlNdZdzB0SSSDVobSlsK012oYKNJBd2njinxtA11Zmq7TBW5VwmxYsxXtO4bv2hu1ewQ0SFfNYG/QdV0mC67UAIZjyQVN+yTVRVmmtZC1VdxSAXdkJWYGTFj8Hekmv6dNsLhHltopMt9urZvHv7/g08uPDhxIsbP448ufLlzJs7fw49RgEAIfkEBQoAAwAsIgAOAIcAGgAAAv6cjwOQ7Q+jYjLRtmCucXN3fdNCliYpGieqYkqXxl/I0bP8sAhjtz0Ow/V4qyJPdpIcDz/gzDgqgl630K+pmZqiW2cMqxUtVUnqd0sbd6DckmX6zoJ3Zm8tXJnnmPUWvamm1Pemd+eXRZiiFmg1+CfmyFcIcwFmEyiY5uKTCQkYibiZmAeKJ0lHRmok9XmJ5jYadzf5MkdbGhorl0u2sfrouUr0q9spaolLNdlIi2lX6yl6aCo7vejovMtXbOxEQQTqvOTBeeoi1ZbRCFfl9X2UHU/o+6ophFrNdPUMr7xtns9Otj3r2H17NgsYwBrD6nGjhG/eQIS6GCVjt5Div09N5PZQvKapmbJKF4FgmQjtYzKUCseVvLeDWSuNFh9Sm1BOI76DqDrqbDmI5cZzPyP6PMRMJ0uhStQVlaSn462EKW3CfKryZyFLtqamglAAACH5BAUKAAMALK8AIgAMAAMAAAIJhIdpC6nc3FgFACH5BAUKAAMALMEAIgADAAMAAAIDhH8FADs=")';
var hboxDiv = document.createElement('div');
hboxDiv.id = 'thebox';
hboxDiv.style.backgroundImage = hboxLoadImage;
var hboxbgDiv = document.createElement('div');
hboxbgDiv.id = 'box-bg';
hboxbgDiv.appendChild(hboxDiv);
document.body.appendChild(hboxbgDiv);

  /* add hboxstuff style */
var hboxStyle = document.createElement('style');
hboxStyle.type = 'text/css';
hboxStyle.innerHTML = hboxCSS;
htmlHead.appendChild(hboxStyle);


function hboxCloseHandler(e) {
  var eventSender;
  if(!e && window.event)  {e = window.event;}
  eventSender = (window.event) ? e.srcElement : e.target;
  if(eventSender.id === 'thebox' || eventSender.id === 'box-bg') {
    hboxDiv.style.visibility = 'hidden';
    hboxbgDiv.style.visibility = 'hidden';
    hboxDiv.style.position = '';
    window.removeEventListener('DOMMouseScroll', disablescroll);
    window.onmousewheel = document.onmousewheel = null;
    hboxDiv.style.backgroundImage = hboxLoadImage;  /* revoke the loading gif */
  }
}

function nullHandler() {  /* useless for now */
  return false;
}

function scrollimage(e) {
  var delta, idThebox, topThebox;
  if(!e && window.event)  {e = window.event;}
  if(e.wheelDelta) {
    delta = e.wheelDelta / 30;
  } else {
    delta = -e.detail * 10;
  }
  idThebox = document.getElementById('thebox');
  topThebox = parseInt(idThebox.style.top.slice(0, -2), 10);
  topThebox += delta;
  idThebox.style.top = topThebox + 'px';
}
  
function alertoff() {
  alertDiv.style.display = 'none';
}

function alertNotion(alertNotice) {
  var alertDiv = document.getElementById('alertbox');
  alertDiv.innerHTML = alertNotice;
  alertDiv.style.display = 'inline';
  window.setTimeout(alertoff, 1500);
}

function imageOnloadHandler() {
    /* image resize on oversized */
  var idThebox, idImageinbox, idBoxBg, heightPic, heightWindow, widthWindow, widthPic;
  idImageinbox = document.getElementById('imageinbox');
  heightPic = idImageinbox.clientHeight;
  widthPic = idImageinbox.clientWidth;
  heightWindow = window.innerHeight || document.documentElement.offsetHeight;
  widthWindow = window.innerWidth || document.documentElement.offsetWidth;
  if(heightPic > heightWindow && (widthPic / heightPic) < 0.8) {  /* over 8:10, make scrollable */
    idImageinbox.width = widthWindow -40;
    idThebox = document.getElementById('thebox');
    idBoxBg= document.getElementById('box-bg');
    idThebox.style.left = '20px';
    idThebox.style.top = 0;
    idThebox.style.position = 'fixed';
    idBoxBg.addEventListener('DOMMouseScroll', scrollimage, false);
      /* disable window scroll event */
    window.addEventListener('DOMMouseScroll', disablescroll, false);
    window.onmousewheel = document.onmousewheel = disablescroll;
    alertNotion('Use Mouse Wheel to ajust');
  } else if(heightPic > heightWindow) {
    alertNotion('The image is shrinked, right click to view the full resolution');
    idImageinbox.height = heightWindow - 40;
  } else if(widthPic > widthWindow) {
      alertNotion('The image is shrinked, right click to view the full resolution');
      idImageinbox.width = widthWindow - 40;
  }
  hboxDiv.style.backgroundImage = '';  /* remove the loading gif */
}

function hboxLauncher(e) {
  var eventSender, imageSource, hboxDiv, hboxbgDiv, hboxImg;
  if(!e && window.event)  {e = window.event;}
  eventSender = (window.event) ? e.srcElement : e.target;
  eventSender = eventSender.parentNode; /* cant click empty anchor */
  imageSource = eventSender.rel;
  hboxDiv = document.getElementById('thebox');
  hboxbgDiv = document.getElementById('box-bg');
  hboxbgDiv.addEventListener('click', hboxCloseHandler, false);
  hboxDiv.style.visibility='visible';
  hboxbgDiv.style.visibility = 'visible';
  hboxImg = document.createElement("img");
  hboxImg.id = 'imageinbox';
  hboxImg.src = imageSource;
  hboxImg.onload = imageOnloadHandler;
  hboxDiv.innerHTML='';
  hboxDiv.appendChild(hboxImg);
}

  /* anchor @thread image parse */
var imgThread, anchorThread;
for(k = 0; k < classThreadfly.length; k++) {  
  anchorThread = classThreadfly[k].getElementsByTagName('a');
  for(i = 0; i < anchorThread.length; i++) {
    imgThread = anchorThread[i].getElementsByTagName('img');
    if(imgThread.length) {
        /* fix the origin anchor */
      anchorThread[i].rel = anchorThread[i].href;
      anchorThread[i].addEventListener('click', hboxLauncher, false);
      anchorThread[i].target = '';
      anchorThread[i].href = 'javascript:void(0);';  /* dirty hack, use span instead */
    }
  }
}

function imageparse(targetObj) {  /* make anchor useless and parse image */
  var imgThread, anchorThread;
  anchorThread = targetObj.document.getElementsByTagName('a');
  for(i = 0; i < anchorThread.length; i++) {
    imgThread = anchorThread[i].getElementsByTagName('img');
    if(imgThread.length) {
        /* fix the origin anchor */
      anchorThread[i].rel = anchorThread[i].href;
      anchorThread[i].addEventListener('click', hboxLauncher, false);
      anchorThread[i].target = '';
      anchorThread[i].href = 'javascript:void(0);';  /* dirty hack, use span instead */
    }
  }
}


  /* Initilize for switchers */
var currentStyle, currentDangerious, currentAdmin, currentCSS;
currentStyle = 'day';
currentDangerious = 0;
currentAdmin = 0;
currentCSS = document.createElement('style');
currentCSS.type = 'text/css';
currentCSS.innerHTML = dayCSS; /* initialize */
htmlHead.appendChild(currentCSS);

  /* add links to the toolbar-bottom */
var classToolbar = document.getElementsByClassName('toolbar-bottom')[0];
classToolbar.innerHTML += '<span id="cssswitcher" >CSS off</span>'; /* initialize */
classToolbar.innerHTML += '<span id="writepadswitcher" >writepad</span>'; /* initialize writepad*/
classToolbar.innerHTML += '<span id="dangerswitcher" <pre>\/!\\DANGER\/!\\</pre></span>';  /* danger area initialize */

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
  nightCSS = window.prompt("Replace the alter CSS");
    currentStyle = 'day';
  if(currentStyle === 'day') {
    currentCSS.innerHTML = nightCSS;
    document.getElementById('cssswitcher').innerHTML = "CSS on";
    currentStyle = 'night';
  } else {
    currentCSS.innerHTML = dayCSS;
    currentCSS.innerHTML = nightCSS;
  }
}

function cssSwitchHandler() {
  if(currentStyle === 'day') {
    currentCSS.innerHTML = nightCSS;
    document.getElementById('cssswitcher').innerHTML = "CSS on";
    currentStyle = 'night';
  } else {
    currentCSS.innerHTML = dayCSS;
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

/* remove useless refView divbox 
document.getElementById('refView').style.display = 'none';
 */

function callResize(objWindow) {
  var frameWinList, frameList, heightNew, widthNew;
  frameWinList = objWindow.frames;
  frameList = objWindow.document.getElementsByTagName('iframe');
  for(i = 0; i < frameWinList.length; i++) {
    heightNew = frameWinList[i].document.getElementsByTagName('table')[0].clientHeight + 10;  /* 10 is MAGIC */
    widthNew = frameWinList[i].document.getElementsByTagName('table')[0].clientWidth + 10;  /* 10 is MAGIC */
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
    iframeCSS.innerHTML += 'table {padding: 0; width: 22em;}';
/* add condition on css switch */
    headFrame.appendChild(iframeCSS);
    tdFirst = targetObj.document.getElementsByTagName('td')[0];
    tdFirst.innerHTML = '';  /* remove the '...' */
    anchorInFrame = targetObj.document.getElementsByTagName('a');
    for(i = 0; i < anchorInFrame.length; i++) {  /* fix in_frame link */
      anchorInFrame[i].target = '_top';
    }
  } else {
    targetObj.document.body.innerHTML = 'QUOTE_ERROR';  /* EDGE handler */
    window.alert('HOLLLY SHIT!! It looks like you have met some boobs not able to handle the quote usage, please either hate them or blame monkeys@h.acfun.tv for not setting just a timeoutID for 40x pages\' nonsense setTimeout() event.');
    if(window.confirm('YES: Automatic open current into new tab, i.e: to save yourselves. NO&Cancel: Waiting for the doomsday.')) {
      window.open(window.location.href, '_blank');
    }
  }
}


function frameOnloadHandler(e) {
  var eventSender, windowCaller, tmp, mainFrameKey, recurKey, tmpWindow;  /* gl: mainFrameList, quoteSize */
  if(!e && window.event)  {e = window.event;}
  eventSender = (window.event) ? e.srcElement : e.target;
  windowCaller = eventSender.contentWindow || eventSender;
  imageparse(windowCaller);
    /* get mainFrameId */
  tmp = windowCaller;
  while(tmp.name === '' || tmp.name.search('iframe') === -1)  {tmp = tmp.parent;}
  mainFrameKey = tmp.name.substr(7);
//alert(mainFrameKey);

  recurKey = mainFrameList[mainFrameKey];
//alert(recurKey);

  mainFrameList.splice(mainFrameKey, 1, recurKey + 1);
//alert(mainFrameList[mainFrameKey]);
//alert(quoteSize);

  if(mainFrameList[mainFrameKey] < quoteSize) {
    if(!betterquote(windowCaller)) {
      styletheframe(windowCaller);
      tmpWindow = windowCaller.parent;
      while(window.top !== tmpWindow) {
        styletheframe(tmpWindow);
        callResize(tmpWindow);
        tmpWindow = tmpWindow.parent;
      }
      callResize(window);
//      setTimeout(function() {callResize(window);}, 500);
    }
  } else {
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

