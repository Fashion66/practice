var point = [];
let r = 250;
var p =180;
let radians = (Math.PI/180)*Math.round(360/p);
for (let i = 0; i<p; i++) {
	let x = r*Math.sin(radians*i);
	let y = r*Math.cos(radians*i);
	point.push([x,y]);
}
for (let a = 0; a<p; a++) {
	let b = a+1;
	$('.item'+b).css('top','calc('+point[a][0]+'px + 50%)');
	var tl=2*a;
	$('.item'+b).css('transform','rotateZ('+tl+'deg)');
}


// 音频可视化
// 
function test(){
	var text = "[00:08.00]起风了（Live）-林俊杰[00:14.96]词：米果[00:22.44]曲：高橋優[00:22.44][00:31.52]这一路上走走停停[00:34.95]顺着少年漂流的痕迹[00:38.05]迈出车站的前一刻[00:41.34]竟有些犹豫[00:44.66]不禁笑这近乡情怯[00:47.84]仍无可避免[00:50.30]而长野的天[00:51.88]依旧那么暖[00:53.35]风吹起了从前[00:55.88]从前初识这世间[00:58.96]百般流连[01:00.80]看着天边似在眼前[01:03.93]也甘愿赴汤蹈火去走它一遍[01:08.99]如今走过这世间[01:12.01]百般流连[01:13.78]翻过岁月不同侧脸[01:16.94]措不及防闯入你的笑颜[01:26.01]我曾难自拔于世界之大[01:30.02]也沉溺于其中梦话[01:33.33]不得真假不做挣扎不惧笑话[01:38.92]我曾将青春翻涌成她[01:42.66]也曾指尖弹出盛夏[01:45.78]心之所动且就随缘去吧[01:51.94]逆着光行走任风吹雨打[02:02.49]短短的路走走停停[02:05.67]也有了几分的距离[02:08.87]不知抚摸的是故事还是段心情[02:15.40]也许期待的不过是与时间为敌[02:21.18]再次见到你[02:22.76]微凉晨光里[02:24.31]笑得很甜蜜[02:52.77]从前初识这世间[02:55.80]百般流连[02:57.48]看着天边似在眼前[03:00.67]也甘愿赴汤蹈火去走它一遍[03:05.72]如今走过这世间[03:08.75]百般流连[03:10.53]翻过岁月不同侧脸[03:13.69]措不及防闯入你的笑颜[03:22.80]我曾难自拔于世界之大[03:26.79]也沉溺于其中梦话[03:30.06]不得真假不做挣扎不惧笑话[03:35.67]我曾将青春翻涌成她[03:39.41]也曾指尖弹出盛夏[03:42.62]心之所动且就随缘去吧[03:48.66]晚风吹起你鬓间的白发[03:52.78]抚平回忆留下的疤[03:55.98]你眼中明暗交杂一笑生花[04:01.69]暮色遮住你蹒跚的步伐[04:05.75]走进床头藏起的画[04:08.96]画中的你低着头说话[04:14.68]我仍感叹于世界之大[04:18.31]也沉醉于儿时情话[04:21.44]不剩真假不做挣扎无谓笑话[04:27.57]我终将青春还给了她[04:31.19]连同指尖弹出的盛夏[04:34.87]心之所动就随风去了[04:40.85]以爱之名你还愿意吗"
	var  texts = text.split('[');
	var j = {};
	for(var te in texts){
    if(texts[te] != ""){
    var time = texts[te].split(']');
    time[0]=(Number(time[0].split(":")[0]*60)+Math.round(time[0].split(":")[1]));
    j[time[0]]=time[1];
    }}
JSON.stringify(j);
	$('.start').animate({'opacity':0},200,);
	var audio = document.getElementById("audio");
	var AC = new AudioContext();
	var src = AC.createMediaElementSource(audio);
	var analyser = AC.createAnalyser();
	src.connect(analyser);
	analyser.connect(AC.destination);
	analyser.fftSize = 512;
	var buffterLength = analyser.frequencyBinCount;
	var data = new Uint8Array(buffterLength);
	audio.loop = true;
	audio.play();
function renderFrame(){
		analyser.getByteFrequencyData(data);
		var t = Math.floor(audio.currentTime);
    	if(j[t] == undefined){}else{
    		$('.lrc').text(j[t]);
    	}
		for (let a = 0; a<p; a++) {
		var s = data[a];
		let b = a+1;
		$('.item'+b).css('width',2*s+'px');
		var w =point[a][1]-s;
		$('.item'+b).css('left','calc('+w+'px + 50%)');}

		window.requestAnimationFrame(renderFrame);
	}
	renderFrame();
}

	