var timer;
var per = 0;
timer = setInterval(function(){
	$('.bar').css('width',per+'%');
	per +=1;
	if(per>100){
		$('.pageloading').addClass('complete')
		setTimeout(function (){
			$('.monsterText').html('<h2 style="color:#FFF;">We are <br> Monster</h2>')
		},3000)
		clearInterval(timer)
	}
},30)