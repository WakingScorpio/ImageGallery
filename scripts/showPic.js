//共享onload事件
function addLoadEvent(func){
	var oldonload = window.onload;
	//将现有window.onload事件处理函数的值存入变量
	if(typeof window.onload != 'function'){
		window.onload = func;
		//如果这个事件处理函数上还没有绑定任何函数，则为新函数func添加给它
	}else{
		window.onload = function(){
			oldonload();
			func();
			//如果在这个事件处理函数上已经绑定了一些函数，则把新函数追加到指令末尾
		}
	}
}

//编写insertAfter函数
function insertAfter(newElement,targetElement){
	var parent = targetElement.parentNode;
	if(parent.lastChild == targetElement){
		parent.appendChild(newElement);
	}else{
		parent.insertBefore(newElement,targetElement.nextSibling);
	}
}

function preparePlaceholder(){
	var placeholder = document.createElement("img");
	placeholder.setAttribute("id","placeholder");
	placeholder.setAttribute("src","./images/boy.png");
	placeholder.setAttribute("alt","my image gallery");
	var description = document.createElement("p");
	description.setAttribute("id","description");
	var desctext = document.createTextNode("Choose an image:");
	description.appendChild(desctext);
	var gallery = document.getElementById("imagegallery");
	gallery.parentNode.insertBefore(placeholder,gallery);
	gallery.parentNode.insertBefore(description,gallery);
	// insertAfter(placeholder,gallery);
	// insertAfter(description,placeholder);
}

function prepareGallery(){
	var gallery = document.querySelector("#imagegallery");
	var links = gallery.getElementsByTagName("a");
	for (var i = 0; i < links.length; i++) {
		links[i].onclick = function(){
			return showPic(this)?false:truei;
			//根据图片切换是否成功来决定是否允许默认行为
		}
	}
}
function showPic(whichpic){
	if(!document.getElementById("placeholder")) return false;
	//测试检查元素是否存在
	var placeholder = document.querySelector("#placeholder");
	var source = whichpic.getAttribute("href");
	if(placeholder.nodeName != "IMG") return false;
	//检查占位图片是否存在 注意nodeName属性总是返回一个大写字母的值
	placeholder.setAttribute("src",source);
	if(document.getElementById("description")){
		var text = whichpic.getAttribute("title")?whichpic.getAttribute("title"):"";
		var description = document.querySelector("#description");
		//对title是否存在进行检查
		if(description.firstChild.nodeType == 3){
			//1元素节点 2属性节点 3文本节点
			description.firstChild.nodeValue = text;
		}
	}
	return true;
}

addLoadEvent(preparePlaceholder);
addLoadEvent(prepareGallery);