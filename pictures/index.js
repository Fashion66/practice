var wrapUl = $(".wrapUl");
var wrapW = parseInt(wrapUl.css('width'));
var wrapH = parseInt(wrapUl.css('height'));
var liW = wrapW / 3;
var liH = wrapH / 3;
createDom();
function createDom(){
	for (var i = 0; i <3; i++) {
		// i代表行，j代表列
		for (var j = 0; j < 3; j++) {
			$('<li><div class="box"><img src=""></div></li>').css({
				'width':liW+'px',
				'height':liH+'px',
				'left':j * liW+'px',
				'top':i * liH+'px',
				'transform':'scale(0.9) rotate('+(Math.random() * 40 - 20 )+'deg)'+
				'translateX(' + (30 * j - 60)+'px)' + 
				'translateY(' + (30 * i - 60)+'px)' + 
				'translateZ('+Math.random()*-500+'px)' 

			})
			.find('img').attr('src','./img/pic'+(i*3+j)+'.webp')
			.end()
			.appendTo(wrapUl);

		}
	}
	bindEvent();
}
function bindEvent(){
	var change = true;
	wrapUl.find('li').on('click',function() {
		if (change) {
		var bgImg = $(this).find('img').attr('src');
		var bgLeft = 0;
		var bgTop = 0;
		$('li').each(function(index){
			var $this = $(this);
			$this.delay(10*index).animate({'opcity':0},200,function(){
				$this.css({
						'transform':' rotate(0deg)'+
						'translateX(0)' + 
						'translateY(0)' + 
						'translateZ(0)'
				});
				$this.find('.box').css({
					'transform':'scale(1)'
				})
				$this.find('img').attr('src',bgImg).css({
					'position':'absolute',
					'width':wrapW+'px',
					'height':wrapH+'px',
					'left':-bgLeft,
					'top':-bgTop
				});
				bgLeft +=liW;
				if(bgLeft >= wrapW){
					bgTop += liH;
					bgLeft = 0;
				}
				$this.animate({'opcity':1},200);
			})
		})
		change = false;
	}else {
		change = true;
		$('li').each(function(index){
			var i = index % 3;
			var j = Math.floor(index / 3);
			var $this = $(this);
			$this.animate({'opacity':1},200,function(){
				$(this).find('img').css({
					'position':'absolute',
					'width':'100%',
					'height':'100%',
					'left':0,
					'top':0
				});
				$this.find('img').attr('src','./img/pic'+index+'.webp');
				$(this).css({
						'transform':'scale(0.9) rotate('+(Math.random() * 40 - 20 )+'deg)'+
				'translateX(' + (30 * j - 60)+'px)' + 
				'translateY(' + (30 * i - 60)+'px)' + 
				'translateZ('+Math.random()*-500+'px)' 
				});
					$this.find('.box').css({
					'transform':'scale(0.9)'
				})
			})

		})
	}
	})
	
}