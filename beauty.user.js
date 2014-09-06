// ==UserScript==
// @name hacer
// @namespace https://github.com/doomred
// @description Provide a better HTML architecture for add functions and CSS design. This script is by hacers for hacers.
// @version 0.0.7a
// @encoding utf-8
// @license ISC
// @copyright dye `Eric' jarhoo
// @author dye `Eric' jarhoo
// @homepageURL http://saltyremix.com
// @icon https://raw.github.com/doomred/hacer/master/hacer_icon.png
// @updateURL https://raw.github.com/doomred/hacer/devvel/hacer.meta.js
// @require https://raw.github.com/doomred/hacer/devvel/hacer.gm_config.js
// @resource mburl https://raw.github.com/doomred/hacer/devvel/hacer.meta.js
// @resource hboxCSS https://raw.github.com/doomred/hacer/devvel/hacer.meta.js
// @resource framenightcss https://raw.github.com/doomred/hacer/devvel/framenight.css
// @resource framedaycss https://raw.github.com/doomred/hacer/devvel/frameday.css
// @resource nightcss https://raw.github.com/doomred/hacer/devvel/night.css
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




  /* init variable Handler */
var hacerVersion = '0.0.7a';

  /* init foo bar variable */
var i = 0, k = 0;

var hboxCSS, nightCSS, frameNightCSS, frameDayCSS;
frameNightCSS = GM_getResourceText('framenightcss');
frameDayCSS = GM_getResourceText('framedaycss');
nightCSS = GM_getResourceText('nightcss');
hboxCSS = GM_getResourceText('hboxcss');

  /* overwrite bad CSS plus must have CSS, custom style goto altCSS */
var htmlHead, htmlBody, owCSS;
htmlHead = window.document.getElementsByTagName("head")[0];
htmlBody = window.document.getElementsByTagName("body")[0];
owCSS = window.document.createElement("style");
owCSS.type = 'text/css';
owCSS.id= 'overwritecss';
owCSS.innerHTML += 'body {min-width: 50em; overflow-x: hidden;}';
owCSS.innerHTML += '.nav-bottom {position: fixed; bottom: 1em; right: 0; z-index: 100; font-size: 12pt !important;}';
owCSS.innerHTML += '.originpost {padding-bottom:6em !important; }';
owCSS.innerHTML += '#hacerfeedback, #dangerarea, #dangerswitcher, #cssswitcher, #writepadswitcher, #settingswitcher  {text-decoration: underline; margin: 0 0.5em;}';
owCSS.innerHTML += '#hacerfeedback:hover, #dangerarea:hover, #dangerswitcher:hover, #cssswitcher:hover, #writepadswitcher:hover, #settingswitcher:hover  {color: #810400; cursor: pointer; text-decoration: underline; margin: 0 0.5em;}';
owCSS.innerHTML += '#alertbox {opacity: 0.9; border-color: white; border-width: 5px; border-style: solid; font-size: 18pt; position: fixed; top: 80%; left: 0.5em; transition: all 0.66s ease-in-out; background: black; z-index: 200;}';
owCSS.innerHTML += '#alertbox {opacity: 0.9; border-color: white; border-width: 5px; border-style: solid; font-size: 18pt; position: fixed; top: 80%; left: 0.5em; transition: all 0.66s ease-in-out; background: black; z-index: 200;}';
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

function alertNotice(alertContent, delay) {
  var alertDiv = document.getElementById('alertbox');
  alertDiv.innerHTML = alertContent;
  alertDiv.style.display = 'inline';
  window.setTimeout(alertoff, delay);
}

function forceupdate() {
  GM_openInTab('https://raw.github.com/doomred/hacer/master/beauty.user.js');
  void(0);
}

function checkupdate() {
  var updateMB = GM_getResourceText('mburl');
  if(updateMB.search(hacerVersion) === -1) {
    alertNotice('New version Found, please wait awhile to install.', 3000);
    GM_openInTab('https://raw.github.com/doomred/hacer/master/beauty.user.js');
  } else {
    alertNotice('`hacer\' is up-to-date', 1500);
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

  /* add CSS class toolbar-bottom */
var classToolbar = document.body.getElementsByTagName('div');
for(i = 0; i < classToolbar.length; i++){
  if(classToolbar[i].style.width === '100%') {
    classToolbar[i].classList.add('toolbar-bottom');
  }
}

  /* init GM_config container, BUG */
var classToolbar = document.getElementsByClassName('toolbar-bottom')[0];
var gmconfigDiv = document.createElement('div');
gmconfigDiv.id = 'gm-config';
classToolbar.appendChild(gmconfigDiv);

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
      'default': false
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
    'init': function() { dynamicparts(); },
    'open': function() { /*document.getElementById('GM_config').style = '';*/ },
    'save': function() { alertNotice('Reload to active!', 1000); },
    'close': function() { },
    'reset': function() { }
  },
  'css': '#GM_config {position: static !important; width: 99% !important; margin: 1.5em auto !important; border: 0 !important;;}'
  /*'frame': gmconfigDiv*/

});


  /* Initilize for switchers */
function nullHandler() {  /* useless for now */
  return false;
}

var currentStyle, currentAdmin, currentCSS;
currentStyle = 'day';
currentAdmin = 0;
currentCSS = document.createElement('style');
currentCSS.type = 'text/css';
currentCSS.id = 'altcss';
currentCSS.innerHTML = GM_config.get('altCSS'); /* initialize alternative CSS */
htmlHead.appendChild(currentCSS);

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


function dynamicparts() {
/* init dynamic toolbar links */
classToolbar.innerHTML += '<span id="cssswitcher" >CSS off</span>'; /* initialize */
if(GM_config.get('wpOn')) {
  classToolbar.innerHTML += '<span id="writepadswitcher" >writepad</span>';
}
classToolbar.innerHTML += '<span id="settingswitcher" >SETTING</span>';
classToolbar.appendChild(fbAnchor);
document.getElementById('cssswitcher').addEventListener('click', cssSwitchHandler, false);
document.getElementById('settingswitcher').addEventListener('click', function () {GM_config.open();}, false);


if(GM_config.get('menuHide')) {
  owCSS.innerHTML += '#menu {left: -125px; opacity: 0; transition: all 0.66s ease-in-out; padding: 0 0 0 1em; overflow: hidden; height: 100%}';
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


if(GM_config.get('adminOn')) {  /* enable hidden adminTools */
  var classAdminTool, i;
  classAdminTool = document.getElementsByClassName("adminTool");
  for(i = 0; i < classAdminTool.length; i++) {
    classAdminTool[i].style.display = 'inline';
  }
}


  /*  add class threadfly */
var divThreads, divThreadsName, divThreadsStyle, k;
divThreads = document.getElementById("right_content").getElementsByTagName("div");
k = 1;
for(i = 0; i < divThreads.length; i++) {
  divThreadsName = divThreads[i].className;
  divThreadsStyle = divThreads[i].style;
  if(GM_config.get('twoupOn')) {
  if(divThreadsStyle.clear.search('both') !== -1) {  /* del nonsense clear:both */
    if(k === 1) {
      divThreadsStyle.clear = 'none';
    }
    k *= -1;
  }
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

if(GM_config.get('twoupOn')) {
  owCSS.innerHTML += '.threadfly {width: 45%; float: left; margin-left: 1%; margin-bottom: 2em;}';
owCSS.innerHTML += '.threadfly table font {display: none;}';
owCSS.innerHTML += '.rthreads {border-left-width: 15px; border-left-style: solid; padding: 0 0 0 2%; margin: 0 0 2em 2%;}';

  /* dirty hack, check if in thread reply page */
if(classThreadfly.length === 1)  {
  owCSS.innerHTML += '.threadfly {width: 80%; margin: 2em 10%; } .threadpost {padding: 0 5em;}';
}

  /* remove all hr */
  owCSS.innerHTML += 'hr {display:none;}';

  /* add left border and related */
k = -1;
for(i = 0; i < classThreadfly.length; i++, k *= -1) {
  if(k === 1) {
    classThreadfly[i].classList.add('rthreads');
  }
}
}

if(GM_config.get('twOn')) {

  owCSS.innerHTML += '.posttime {margin-left: 0.5em;} p, body {margin: 0;} ';
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


if(GM_config.get('navFix')) {
  /* replace the page navigation */
var key, tableNavigation;
tableNavigation = document.getElementsByTagName('table');
key = tableNavigation.length - 1;  /* dirty hack, may failed later */
if(tableNavigation[key].align === 'left') {
  tableNavigation[key].classList.add('nav-bottom');
  tableNavigation[key].align = '';
}
}



if(GM_config.get('hboxOn')) {
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
hboxStyle.id = 'hboxcss';
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

function scrollimage(e) {
  var delta, idThebox, topThebox;
  if(!e && window.event)  {e = window.event;}
  if(e.wheelDelta) {
    delta = e.wheelDelta / 10;
  } else {
    delta = -e.detail * 30;
  }
  idThebox = document.getElementById('thebox');
  topThebox = parseInt(idThebox.style.top.slice(0, -2), 10);
  topThebox += delta;
  idThebox.style.top = topThebox + 'px';
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
    idImageinbox.width = widthWindow -80;  /* 80 is MAGIC */
    idThebox = document.getElementById('thebox');
    idBoxBg= document.getElementById('box-bg');
    idThebox.style.left = '40px';
    idThebox.style.top = 0;
    idThebox.style.position = 'fixed';
    idBoxBg.addEventListener('DOMMouseScroll', scrollimage, false);
    window.addEventListener('DOMMouseScroll', disablescroll, false);  /* disable window scroll event */
    window.onmousewheel = document.onmousewheel = disablescroll;
    alertNotice('Use Mouse Wheel to ajust!', 1500);
  } else if(heightPic > heightWindow) {
    idImageinbox.height = heightWindow - 50;  /* 50 is MAGIC */
    alertNotice('The image is ' + parseInt(idImageinbox.height / heightPic * 100) + '% shrinked', 3000);
  } else if(widthPic > widthWindow) {
      idImageinbox.width = widthWindow - 50;
      alertNotice('The image is ' + parseInt(idImageinbox.width / widthPic * 100) + '% shrinked', 3000);
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
}


if(GM_config.get('wpOn')) {
  owCSS.innerHTML += '#postform_tblabandon p {line-height: 1.5em; padding-bottom: 2em;}';
owCSS.innerHTML += '#writepad {padding: 1em; background: grey;}';
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
if(GM_config.get('wpOn')) {
  document.getElementById('writepadswitcher').addEventListener('click', padSwitchHandler, false);
}

}


if(GM_config.get('bqOn')) {
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
    iframeCSS.id = 'framecss';
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
  if(GM_config.get('hboxOn')) {imageparse(windowCaller);}
    /* get mainFrameId */
  tmp = windowCaller;
  while(tmp.name === '' || tmp.name.search('iframe') === -1)  {tmp = tmp.parent;}
  mainFrameKey = tmp.name.substr(7);
  recurKey = mainFrameList[mainFrameKey];
  mainFrameList.splice(mainFrameKey, 1, recurKey + 1);
  if(mainFrameList[mainFrameKey] < GM_config.get('quoteSize')) {
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
}
