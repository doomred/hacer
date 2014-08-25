var dayCSS;
var nightCSS = 'body{background-color:black;background-image:url("http://avdot.net/cover.php");background-position: center;background-repeat: no-repeat;background-attachment: fixed;background-repeat: no-repeat;color:rgb(198,198,198) !important;transition:background .5s ease-in-out;margin:-16px !important;}#right_content{// background:black !important;background-image: linear-gradient(rgba(0,0,0,0.8),rgba(0,0,0,0.5), rgba(0,0,0,0.9)) !important;background-attachment: fixed;transition:background .5s ease-in-out;}td{z-index: -50;background:rgba(50,50,60,0.7) !important;border: solid 0;border-radius: 1em;padding:9px !important;transition:background .1s ease-in-out;}td:hover, .originpost {background:rgb(50,50,60) !important;// padding: 6em !important;}td:active {background:rgb(50,50,100) !important;}a{transition:color .1s ease-in-out;}a:link{color:rgb(100,100,224) !important}a:visited{color:rgb(100,100,190) !important}a:hover{color:lightblue !important}#right_content img{z-index: 50;opacity:0.6;transition:all .3s ease-in-out;}#right_content img:hover{opacity:0.95;}#menu{background:rgb(12,12,30) !important;// font-size:14px !important;}.toolbar-bottom {color:#ffffff !important;background-image: url("data:image/png;base64,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");transition:background .1s ease-in-out;}#postform_tbl input, #emotion, textarea {background-color:black !important;color:rgb(150,150,150) !important;}font[color="#707070"]{color:rgb(100,100,100);}';

var htmlHead = document.getElementsByTagName("head");
var owCSS = document.createElement("style");
owCSS.type = 'text/css';
// owCSS.innerHTML += 'body div#menu:hover div {left: 0px; transition:all 0.2s ease-in-out; opacity: 1;}';
owCSS.innerHTML += '.threadfly {width: 45%; float: left; margin-left: 1%; margin-bottom: 2em;}';
owCSS.innerHTML += '.threadfly table font {display: none;}';
owCSS.innerHTML += '.rthreads {border-left-size: 15px; border-left-style: solid; padding: 0 0 0 2%; margin: 0 0 2em 2%;}';
owCSS.innerHTML += '.posttime {margin-left: 1em;} p, body {margin: 0;} ';
owCSS.innerHTML += '.nav-bottom {position: fixed; bottom: 0; right: 0; z-index: 100;}';
owCSS.innerHTML += '.originpost {padding-bottom:6em !important; }';
htmlHead[0].appendChild(owCSS);

function betterquote(targetObj) {
/* better Quote display */
var iframeQuote = targetObj.document.getElementsByTagName("font");
var tagIFrame = new Array();
var iframeParents = new Array();

for(var i = 0; i < iframeQuote.length; i++) {
  var colorQuote = iframeQuote[i].color;
  
  if(colorQuote.search('789922') !== -1) {
    var numPost = iframeQuote[i].innerHTML;
    var numPost = numPost.substr(numPost.search('No') + 3);
    var iframeSrc = 'http://h.acfun.tv/homepage/ref?tid=' + numPost ;
    /* replase tag <font> with tag <iframe> */
    tagIFrame[i] = document.createElement("iframe");
    tagIFrame[i].src = iframeSrc;
    tagIFrame[i].scrolling = 'no'
    iframeParents[i] = iframeQuote[i].parentNode;
    iframeParents[i].replaceChild(tagIFrame[i], iframeQuote[i]);   
    
  }
}
  // return 1;
}
/* first run without iframe */
betterquote(window);

/* hidden the left_menu by default */
var left_menu = document.getElementById("menu");

left_menu.style.left = '-125px';
left_menu.style.height = '98%'; // dirty hack
left_menu.style.opacity = 0;
left_menu.style.transition = 'all 0.66s ease-in-out';
left_menu.style.padding = '0 2em 0 2em';
left_menu.onmouseover = function() {
  left_menu.style.left = '0px';
  left_menu.style.opacity = 1;
}
left_menu.onmouseout = function() {
  left_menu.style.left = '-125px';
  left_menu.style.opacity = 0;
}


/* fix margin after auto hidden left_menu */
var right_content = document.getElementById("right_content");
// alert(right_content.style.margin);
right_content.style.margin = '0px';


/* enable the hidden admin Tools, horrible */
/*
var adminTool = document.getElementsByClassName("adminTool");
for(var key in adminTool) {
  if(adminTool.hasOwnProperty(key))  adminTool[key].style.display = 'inline';
}
 */


/* 
 * no hr displays, useless
var uselessHr = document.getElementById("right_content").getElementsByTagName("hr");
uselessHr[0].style.display = 'none';
 */


/* hide the ugly post form at top with dirty hack */
var badNotice = document.getElementById("postform_tbl").getElementsByTagName("tr");
// var badNotice = badNotice[0].document.getElementsByTagName("tr");
for(var i = 0; i < badNotice.length -1; i++) {
  badNotice[i].style.display = 'none';
}


/* hr tags process */
var marginHr = document.getElementsByTagName("hr");
// alert(marginHr[0].style);
for (var key in marginHr) {
   if(marginHr.hasOwnProperty(key)) {
//     marginHr[key].style.margin = '0 0 50px 0';
     marginHr[key].style.display = 'none';
   }
}


/* for 2up style, add reasonable class */
var divThreads = document.getElementById("right_content").getElementsByTagName("div");
var hrThreads = document.getElementById("right_content").getElementsByTagName("hr");
var k = 1;

for(var i = 0; i < divThreads.length; i++) {
  var divName = divThreads[i].className;
  var divStyle = divThreads[i].style;
  
  if(divName.search('threads') !== -1) {
    
    divThreads[i].classList.add('threadfly');
//    divThreads[i].style.width = '49%';
//    divThreads[i].style.float = 'left';
//    alert(divThreads.className);
  }
//  alert(divStyle.clear);
  
  /* for 2up sytle, del nonsense clear:both */
  if(divStyle.clear.search('both') !== -1) {

//    alert(k);
//    if(1) {
    if(k == 1) {
      divStyle.clear = 'none';
//      hrThreads[i++].style.display = 'none';
    }
    k *= -1;
  }

}

/* dirty hack, check if in thread reply page */
if(document.getElementsByClassName('threadfly').length == 1)  {
  var threadModeOn = 1;
  owCSS.innerHTML += '.threadfly {width: 80%; margin: 2em 10%; } .threadpost {padding: 0 10em;}';
}



      
      
      
      

      


  /* for 2up sytle, add left border and related */
var divThreads = document.getElementsByClassName("threadfly"); /* reuse the var for the same blocks */
var k = -1;

for(var i = 0; i < divThreads.length; i++, k *= -1) {
//  var divStyle = divThreads[i].style;

  if(k == 1) {
    divThreads[i].classList.add('rthreads');
  }

}



/* add class originpost and originpost-pic*/
var divThread = document.getElementsByClassName('threadfly');
for(var key in divThread) {
  if(divThread.hasOwnProperty(key)) {
    var blockOP = divThread[key].getElementsByTagName('blockquote')[0];
    var blockOPPic = divThread[key].getElementsByTagName('a')[0];
//    blockOP.style.paddingBottom = '6em'; /* fix the bad layout */
    blockOP.classList.add('originpost');
    blockOPPic.classList.add('originpost-pic');
  }
}








/* use good time format */
var timefix = document.getElementsByClassName("posttime") 
for(var key in timefix) {
  if(timefix.hasOwnProperty(key)) {
    var timePost = timefix[key].innerHTML;
    var weekdayPost = timePost.substr(0, 3);
    var monthPost = timePost.substr(4, 3);
    var dayPost = timePost.substr(8, 2);
    
//    alert(weekdayPost);alert(monthPost);alert(dayPost);
    timePost = weekdayPost + ', ' + dayPost + ' ' + monthPost + timePost.slice(10, -5);    
//    alert(timePost.length);
//    timePost = timePost.substring(0, 35); /* dirty hack strip the finnal parenthetical */
//    alert(timePost);
    var dateObj = new Date(timePost);
//          alert(timefix[key].innerHTML);
    timefix[key].innerHTML = '<span>' + dateObj.toLocaleDateString() + ' ' + dateObj.toLocaleTimeString("zh-CN", "Asia/Berjing") + '</span><br />';
//    alert(dateObj.getDate());
    
  }
}
//      alert('stop');
/* order the page navigation */
var tableNavigation = document.getElementsByTagName('table');
var key = tableNavigation.length - 1;
//  alert(tableNavigation[tableNavigation.length - 1].align);
//  for(var i = 0; i < tableNavigation.length - 1; i++) {

  if(tableNavigation[key].align == 'left') {
//    alert('aaaaa');
    tableNavigation[key].classList.add('nav-bottom');
    tableNavigation[key].align = '';
  }
  
/* add CSS class toolbar-bottom */
var divToolbar = document.body.getElementsByTagName('div');
for(var i = 0; i < divToolbar.length - 1; i++){
  if(divToolbar[i].style.width == '100%') {
    divToolbar[i].classList.add('toolbar-bottom');
  }
}


/* open all links to _blank 
var aTag =document.getElementsByTagName('a');
for(var i = 0; i < aTag.length; i++) {
//    aTag.target = '_blank';
    alert(aTag[64].target);
}
 */

/* add links to the toolbar-bottom */
var divToolbar = document.getElementsByClassName('toolbar-bottom')[0];
divToolbar.innerHTML += '<a id="cssswitcher" href="javascript:cssSwitchHandler()">CSS off</a>'; /* initialize */
divToolbar.innerHTML += '<a id=dangerswitcher" href="javascript:dangerSwitchHandler()"<pre>/!\DANGER/!\</pre></a>;  /* danger area initialize */
var currentStyle = 'day';
var currentDangerious = 0;
var currentAdmin = 0;

/* add css switcher */
var currentCSS = document.createElement('style');
currentCSS.type = 'text/css';
// currentCSS.id = 'current';
currentCSS.innerHTML = dayCSS; /* initialize */
htmlHead[0].appendChild(currentCSS);

/* add danger switcher */
var currentDanger = document.createElement('span');
currentDanger.id = 'danger';
currentDanger.style.padding = '0 1em';
currentDanger.style.display = 'none';
currentDanger.innerHTML += '<a href="javascript:adminSwitchHandler()">ADMIN</a>';
currentDanger.innerHTML += '<a href="javascript:cssChangeHandler()">Change_CSS</a>';
htmlHead[0].appendChild(currentDanger);


/* danger switch handler */
function cssSwitchHandler() {
  if(currentDangerious) {
    currentDanger.style.display = 'none';
    
    currentDangerious = 0;
  } else {
    currentDanger.style.display = 'inline';
    
    currentDangerious = 1;
  }

/* css switch handler */
function cssSwitchHandler() {
  if(currentStyle == 'day') {
    currentCSS.innerHTML = nightCSS;
    document.getElementById('cssswitcher').innerHTML = "CSS on";
    
    currentStyle = 'night';
  } else {
    currentCSS.innerHTML = dayCSS;
    document.getElementById('cssswitcher').innerHTML = "CSS off";
    
    currentStyle = 'day';
  }

function cssChangeHandler() {
  nightCSS = prompt("Replace the nightCSS");
    currentStyle = 'day';
  if(currentStyle == 'day') {
    currentCSS.innerHTML = nightCSS;
    document.getElementById('cssswitcher').innerHTML = "CSS on";
    
    currentStyle = 'night';
  } else {
    currentCSS.innerHTML = dayCSS;
    currentCSS.innerHTML = nightCSS;
  }

function adminSwitchHandler() {
  if(currentAdmin) {
    /* adminTools display none */
    document.getElementById('danger').innerHTML = "Admin off";

    currentStyle = 0;
  } else {
    /* adminTools display inline */
    document.getElementById('danger').innerHTML = "Admin on";
    
    currentAdmin = 1;
  }
 
}


/* resize current frame */
function resizeframe(id, h, w) {
  var objResize = document.getElementById('resizeme');
  objResize.style.height = h + "px";
  objResize.style.width = w + "px";  
  objResize.id = '';
}

function callResize(objWindow, objTag) {
  var heightNew = objWindow.document.getElementsByTagName('body')[0].clientHeight + 10; /* the num is MAGIC */
  var widthNew = objWindow.document.getElementsByTagName('body')[0].clientWidth;
  objTag.id = 'resizeme';
  alert('chekc id: resizeme')
  resizeframe(i, heightNew, widthNew);
  }


function styletheframes(targetObj) {
var frameList = targetObj.frames;
frameList[frameList.length - 1].onload = window.setTimeout(diveintoframes, 10000); /* the delay num is MAGIC */

  
function diveintoframes() {  /* dirty hack, may cause problem */
var frameTag = document.getElementsByTagName('iframe');
//  alert(frameTag.length);
  
for(var i = 0; i < frameList.length; ++i){ /* It's MAGIC, IDK why it's (.length) not (.length -1) */
  var contentTd = frameList[i].document.getElementsByTagName('td');
  //  alert(frameList.length);
  contentTd[0].innerHTML = '';
    /* insert css into iframe */
  var iframeHead = frameList[i].document.getElementsByTagName('head');
  var iframeCSS = document.createElement('style');
  iframeCSS.type = 'text/css';
  iframeCSS.innerHTML += 'html body tbody tr td font[color="#cc1105"],font[color="#117743"] {display: none;}';
  iframeCSS.innerHTML += 'html body tbody tr td font[color="#789922"] {color: red;}';
  iframeCSS.innerHTML += '.posttime {display: none;}';
  iframeCSS.innerHTML += '.report {display: none;}';
  iframeCSS.innerHTML += '.threadpost {margin: 0 0 0 0;}';
  iframeCSS.innerHTML += 'img {width: 30%; height: 30%}';
  iframeCSS.innerHTML += 'table {padding: 0; width: 22em;}';
  iframeHead[0].appendChild(iframeCSS);
  
  betterquote(frameList[i]);
    
  if(frameList[i].frames.length)  {
    styletheframes(frameList[i]);
    alert(frameList[i].document.body.innerHTML);
    callResize(frameList[i], frameTag[i]);
  } else {
    callResize(frameList[i], frameTag[i]);
    
    
    
    
    
    
    
  }
 // callResize(frameList[i], frameTag[i]);
  
  


}
  
}
}
styletheframes(window);








/*
Exception: prompt aborted by user
@426
*/
