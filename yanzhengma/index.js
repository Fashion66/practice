// 随机生成字符串
// 填充
// 输入验证码 提交
// 判断
// unicode 65~90 97~122

var arr = [0,1,2,3,4,5,6,7,8,9]
for(var i=65 ; i<122 ;i++){
	if(i>90 && i<97){
		continue;
	}
	arr.push(String.fromCharCode(i))
}
var value= '';
function createCanvas(){
	
	var canvasStr = '';
	value = '';
	for(var i = 0;i<6;i++){
		var a = arr[Math.floor(Math.random() * arr.length)];
		canvasStr += a +' ';
		value += a;
	}
	var myCanvas = document.getElementById('myCanvas');
	var ctx = myCanvas.getContext('2d');
	var oImg = new Image();
	oImg.src = './bg.webp';
	oImg.onload = function(){
		var pattern = ctx.createPattern(oImg,'repeat');
		ctx.fillStyle = pattern;
		ctx.fillRect(0,0,myCanvas.width,myCanvas.height);
		ctx.textAlign ='center';
		ctx.fillStyle = 'black';
		ctx.font = "46px Roboto Slab";
		ctx.setTransform(1,-0.12,0.3,1,0,12);
		ctx.fillText(canvasStr,myCanvas.width/2,60);
	}
}
createCanvas();
$('.submit').on('click',function(){
	showResult();
});
$('.refresh').on('click',function(){
	createCanvas();
})
function showResult(){
	var inputValue = $('.inputBox input').val();
	if(inputValue == value){
		$('.inputBox span').css({
			background:'url("./false.jpg")',
			display:'inline-block'
		});
		$('.error').css('display','none')
		createCanvas();

}else{
	$('.inputBox span').css({
	background:'url("./true.jpg")',
	display:'inline-block'});
	$('.error').css('display','block').html('验证码错误，请重新输入');
	createCanvas();
	}}