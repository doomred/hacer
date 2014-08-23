/* hidden the left_menu by default */
var left_menu = document.getElementById("menu");

left_menu.style.left = '-105px';
left_menu.style.height = '98%'; // dirty hack
left_menu.style.opacity = 0;
left_menu.style.transition = 'all 0.66s ease-in-out';
left_menu.style.padding = '0 2em 0 2em';
left_menu.onmouseover = function() {
  left_menu.style.left = '0px';
  left_menu.style.opacity = 1;
}
left_menu.onmouseout = function() {
  left_menu.style.left = '-105px';
  left_menu.style.opacity = 0;
}


var htmlHead = document.getElementsByTagName("head");
var owCSS = document.createElement("style");
owCSS.type = 'text/css';
// owCSS.innerHTML += 'body div#menu:hover div {left: 0px; transition:all 0.2s ease-in-out; opacity: 1;}';
// owCSS.innerHTML += 'body:hover {background-color: red;}';
owCSS.innerHTML += '.threadfly {width: 45%; float: left; margin-left: 1em;}';
owCSS.innerHTML += '.threadfly table font {display: none;}';
owCSS.innerHTML += '.posttime {margin-left: 1em;}';
htmlHead[0].appendChild(owCSS);


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

/* Hide the useless hr bar with dirty hack */
var uselessHr = document.getElementById("right_content").getElementsByTagName("hr");
uselessHr[0].style.display = 'none';

/* hide the ugly post form at top with dirty hack */
var badNotice = document.getElementById("postform_tbl").getElementsByTagName("tr");
// var badNotice = badNotice[0].document.getElementsByTagName("tr");
for(var i = 0; i < badNotice.length -1; i++) {
  badNotice[i].style.display = 'none';
}

/* more poewrful hr tag */
var marginHr = document.getElementsByTagName("hr");
// alert(marginHr[0].style);
for (var key in marginHr) {
   if(marginHr.hasOwnProperty(key)) {
     marginHr[key].style.margin = '0 0 50px 0';
//     marginHr[key].style.display = 'none';
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
    if(k == 1) {
      divStyle.clear = 'none';
//      hrThreads[i++].style.display = 'none';
    }
    k *= -1;
  }

}

/* use good time format */
var timefix = document.getElementsByClassName("posttime") 
// alert(timefix[0].innerHTML);
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
    
    timefix[key].innerHTML = dateObj.toLocaleDateString() + ' ' + dateObj.toLocaleTimeString("zh-CN", "Asia/Berjing") + '<br />';
//    alert(dateObj.getDate());
    
  }
}

/* better Quote display */
var iframeQuote = document.getElementsByTagName("font");

for(var i = 0; i < iframeQuote.length; i++) {
  var colorQuote = iframeQuote[i].color;
  
  if(colorQuote.search('789922') !== -1) {
    divThreads[i].classList.add('threadfly');
    alert(iframeQuote[i].innerHTML);
    var numPost = iframeQuote[i].innerHTML;
    var numPost = numPost.substr(5);
    alert(numPost);
//    iframeQuote.style.font-size 
    iframeQuote.innerHTML = '<iframe src="http://h.acfun.tv/t/' + numPost + '"></iframe>';
  }
}  

