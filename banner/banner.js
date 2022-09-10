function createDomBanner(areaDom,options){
	var imgArea = document.createElement('div');
	var numberArea = document.createElement('div');
	var curIndex = 2;
	var changeDuration = 5000;
	var timer;
	initImgs();
	initNumbers();
	setStatus();
	autoChange();
function initImgs(){
	imgArea.style.width = "100%";
	imgArea.style.height = "100%";
	imgArea.style.display = "flex";
	imgArea.style.overflow = "hidden";
	for (var i = 0; i < options.length; i++) {
		 var obj = options[i];
		 var img = document.createElement('img');
		 img.style.width = "100%";
		 img.style.height = "100%";
		 img.src = obj.imgUrl;
		 imgArea.appendChild(img);
	}
	areaDom.appendChild(imgArea);
}
function initNumbers(){
	numberArea.style.textAlign = "center";
	numberArea.style.marginTop = "-200%";
	for (var i = 0; i < options.length; i++) {
		var sp = document.createElement('span');
		sp.style.width = "25px";
		sp.style.height = "25px";
		sp.style.background = '#000';
		sp.style.display = "inline-block";
		sp.style.margin = '0 70px';
		sp.style.borderRadius = '50%';
		sp.style.cursor = "pointer";
		(function(index){
		sp.addEventListener("click",function(){
			curIndex = index;
			setStatus();
		});})(i)

		numberArea.appendChild(sp);
	}
	areaDom.appendChild(numberArea);
}
function setStatus(){
	for (var i = 0; i < numberArea.children.length; i++) {
		if( i == curIndex){
		numberArea.children[i].style.background = "#000"
	}else{
		numberArea.children[i].style.background = "#fff"
	}
	}
	var start = parseInt(imgArea.children[0].style.marginLeft)
	var end = curIndex * -100 ;
	var dis = end -start;
	var duration = 500;
	var speed = dis/duration;
	if(timer){
		clearInterval(timer)
	}
	timer = setInterval(function(){
		start += speed*20;
		imgArea.children[0].style.marginLeft =start +"%";
		if(Math.abs(end-start)<1){
		imgArea.children[0].style.marginLeft =end +"%";	
		clearInterval(timer)
		}
	},20)

	var targetMarginLeft = curIndex * -100;
	imgArea.children[0].style.marginLeft = targetMarginLeft+"%";



}
function autoChange(){
	setInterval(function(){
		if(curIndex === options.length-1){
			curIndex=0;
		}else {
			curIndex++;
		}		
		setStatus();
	},changeDuration)
}










}