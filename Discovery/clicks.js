var clickList = new Array();
var numOfClicks = 0;
var cliekdType = '';
var word = '';
var typing = 0;
// var cut = 0;

chrome.storage.local.get('num', function(result){
	if(result.num != null) {
	    numOfClicks += result.num;
	}
});
chrome.storage.local.get('loc', function(result){
	if(result.loc != null) {
    	clickList = result.loc;
	}
});
chrome.storage.local.get('type', function(result){
  if(result.type != null) {
      typing = result.type;
  }
});

function clickOrigin(e){
    var target = e.target;
    var tag = [];
    tag.tagType = target.tagName.toLowerCase();
    return tag;
}

document.onclick = clickListener;
document.onkeypress = keyListener;

function keyListener(e) {
	var charType = e.key;
	if(clickList[clickList.length-1] == 'User Input') {
		word += String(e.key);
	}
}

function clickListener(e) {
  var clickedElement;
  // cut = 0;
  clickedType = clickOrigin(e).tagType;
  numOfClicks++;
  if(clickList[clickList.length-1] == 'User Input' && word != '') {
  	clickList.push('Typed: ' + word);
   	word = '';
  }
  if(typing == 1 && clickList.length > 0) {
    word = "Typed: " + document.getElementById(clickList[clickList.length-1]).value
    clickList[clickList.length-1] = word;
    typing = 0;
  }
  // if(clickedType == "div" || clickedType == "td" || clickedType == "span") {
  //   if(e.target.innerHTML!="Upload" && e.target.innerHTML!="File" && e.target.innerHTML!="Edit" && e.target.innerHTML!="Download" && e.target.innerHTML!="Share" && e.target.innerHTML!="Metadata" && e.target.innerHTML!="Refresh" && e.target.innerHTML!="Trash"){
  //     firstTable(e.target); 
  //   }    
  // }
  clickedElement = e.target.innerText;
  if(e.target.innerText.includes('The Discovery Environment integrates')) {
    clickedElement = "misclick";
  }
  if(clickedType == 'input') {
    clickedElement = e.target.value;
    if(e.target.type == 'text') {
      if(e.target.placeholder == "Enter a value") {
        clickList.push(e.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.previousSibling.innerText);
      }
      else {
        clickList.push(e.target.placeholder);
      }
      clickedElement = e.target.id;
      // cut = 1;
      typing = 1;
    }
  }
  if(clickedType == 'img') {
    clickedElement = e.target.alt;
  }
  if(clickedType == 'li') {
    clickedElement = e.target.id;
  }
  if(clickedType == 'textarea') {
    if(e.target.parentNode != null && e.target.parentNode.parentNode != null && e.target.parentNode.parentNode.parentNode != null) {
        word = e.target.parentNode.parentNode.parentNode.previousSibling.innerText;
    }
    clickList.push(word);
    clickedElement = e.target.id;
    typing = 1;
    // cut = 1;
  }
  // if(cut == 0 && clickedElement.length > 20) {
  //   clickedElement = clickedElement.substring(0,10);
  // }
  alert(clickedType + " / " + "hi");
	clickList.push(clickedElement);
  alert(clickList);
  //alert(clickedElement);
	//alert(numOfClicks + ': ' + clickList);
	chrome.storage.local.set({ 'num': numOfClicks }, function(){
	});
	chrome.storage.local.set({ 'loc': clickList }, function(){
	});
  chrome.storage.local.set({ 'type': typing }, function(){
  });
}

function typeOfElement(e) {

   	if(clickedType == 'b') {
   		clickedElement = 'Log Out';
   	}

    else {
    	//alert(String(e.target));
    	clickedElement = e.target;
    }

    return clickedElement;
}

  // function firstTable(e) {
  //   if(e.cellIndex == 1 || e.parentNode.cellIndex == 1 || e.parentNode.parentNode.cellIndex == 1) {
  //     alert("hi");
  //   }
  //   else if(e.cellIndex != null) {
  //     alert(e.innerText + " / " + e.parentNode.cells[1].innerText);
  //   }
  //   else if(e.parentNode.cellIndex != null) {
  //     alert(e.innerText + " / " + e.parentNode.parentNode.cells[1].innerText);
  //   }
  //   else if(e.parentNode.parentNode.cellIndex != null) {
  //     alert(e.innerText + " / " + e.parentNode.parentNode.parentNode.cells[1].innerText);
  //   }
  //   else {
  //     alert(e.innerText)
  //   }
  //}