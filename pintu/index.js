
var imgArea = $('.imgArea');
var imgW = parseInt(imgArea.css('width'));
var imgH = parseInt(imgArea.css('height'));
var cellW = imgW / 3;
var cellH = imgH / 3;
var oriArr = [];
var flag = true;
var ranArr = [];

init();

function init(){
  imgSplit();
  gameState();
}
function imgSplit(){
    for(let i = 0;i<3;i++){
        for (let j = 0; j < 3; j++) {
            oriArr.push(i * 3 + j);
           cell =  $('<div class="imgCell"></div>');
           $(cell).css({
            'width':cellW+'px',
            'height':cellH+'px',
            'left':cellW * j,
            'top':cellH * i,
            'backgroundPosition':(-cellW) * j + 'px' +' '+ (-cellH) * i + 'px'
           })
            imgArea.append(cell);           
        }
    }
    imgCell = $('.imgCell');
}
function gameState(){
    $('.start').on('click',function(){
        if(flag){
            $(this).text('复原');
            flag = false;
            randomArr();
            cellOrder(ranArr);
            imgCell.on('mousedown',function(e){
                var index1 = $(this).index();
                var left = e.pageX - imgCell.eq(index1).offset().left;
                var top = e.pageY - imgCell.eq(index1).offset().top;
                $(document).on('mousemove',function(e2){
                    imgCell.eq(index1).css({
                        'z-index':'40',
                        'left':e2.pageX - left - imgArea.offset().left + "px",
                        'top': e2.pageY - top - imgArea.offset().top + "px",
                    });

                }).on('mouseup',function(e3){
                    var left = e3.pageX - imgArea.offset().left;
                    var top = e3.pageY - imgArea.offset().top;
                    var index2 = changeIndex(left,top,index1);
                    if(index1 == index2){
                        cellReturn(index1);
                    }else{
                        cellChange(index1,index2);
                    }
                    $(document).off('mousemove').off('mouseup');
                })

            })
        }else{
            $(this).text('开始');
            flag = true;
            cellOrder(oriArr);
            $(imgCell).off('mousemove').off('mouseup').off('mousedown');
        }
    })
}
function randomArr(){
    ranArr = [];
    var len = oriArr.length;
    var order;
    for (let i = 0; i < len; i++) {
        order = Math.floor(Math.random()*len);
        if(ranArr.length > 0){
            while($.inArray(order,ranArr) > -1){
                order = Math.floor(Math.random()*len);
            }
        }
        ranArr.push(order);
    }
    return;
}
function cellOrder(arr){
    var len = arr.length;
    for(var i = 0;i < len ;i++){
        imgCell.eq(i).animate({
            'left': arr[i] % 3 * cellW + 'px',
            'top': Math.floor( arr[i] / 3 ) * cellW + 'px',
        },400)
    }
}
function changeIndex(x,y,i){
    if(x < 0 || x > imgW || y < 0 || y > imgH){
        return i;
    }
    var row = Math.floor(y / cellW);
    var col = Math.floor(x / cellH);
    var l = row * 3 + col;
    var i = 0,len = ranArr.length;
    while((i < len) && (ranArr[i] !== l)){
        i++;
    }
    return i;
   
}
function cellReturn(index){
    var i = Math.floor(ranArr[index] / 3);
    var j = ranArr[index] % 3;
    imgCell.eq(index).animate({
        'left':cellW * j + 'px',
        'top':cellH * i + 'px',
    },400,function(){
        $(this).css('z-index','10')
    })

}
function cellChange(from,to){
    var fromI = Math.floor(ranArr[from] / 3);
    var fromJ = ranArr[from] % 3;
    var toI =Math.floor(ranArr[to] / 3);
    var toJ = ranArr[to] % 3;
    var temp = ranArr[from];
    imgCell.eq(from).animate({
        'left':cellW * toJ + 'px',
        'top':cellH * toI + 'px',
    },400,function(){
        $(this).css('z-index','10')
    });
    imgCell.eq(to).animate({
        'left':cellW * fromJ + 'px',
        'top':cellH * fromI + 'px',
    },400,function(){
        $(this).css('z-index','10');
        ranArr[from] = ranArr[to];
        ranArr[to] = temp;
        check();
    })

}
function check(){
    if(oriArr.toString() == ranArr.toString()){
        alert('真棒呢！');
        $('.start').text('开始');
        flag = true;
    }
}