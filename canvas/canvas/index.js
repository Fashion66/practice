var drawingLineObj = {
	cavs:$('.cavs'),
	context:$('.cavs').get(0).getContext('2d'),
	colorBoard:$('#colorBoard'),
	clearBoard:$('#clearBoard'),
	eraser:$('#eraser'),
	rescind:$('#rescind'),
	lineRuler:$('#lineRuler'),	
	bool:false,
	imgArr:[],
init:function(){
		this.context.lineCap = 'round';
		this.context.lineJoin = 'round';
		this.context.strokeStyle = '#000';
		this.draw();
		this.btnsAlifn();
	},

draw:function(){
		var cavs = this.cavs;
		var	self = this;
		var c_x = cavs.offset().left,
		    c_y = cavs.offset().top;

		cavs.mousedown(function(e){
			self.bool = true;
			var m_x = e.pageX-c_x,
			    m_y = e.pageY-c_y;
			    self.context.beginPath();
			    self.context.moveTo(m_x,m_y);
 			var imgData = self.context.getImageData(0,0,1000,800);
 			self.imgArr.push(imgData);
		cavs.mousemove(function(e){
			if(self.bool){
			self.context.lineTo(e.pageX-c_x,e.pageY-c_y);
			self.context.stroke();
		}

		})
		cavs.mouseup(function(e){
			self.bool = false;
			self.context.closePath();
			this.mousemove = null;
		})
		cavs.mouseleave(function(e){
			self.bool = false;
			self.context.closePath();
			this.mousemove = null;			
		})
		})
	},
btnsAlifn:function(){
	var self = this;
	var ul = $('.btn-list');
	 this.colorBoard.on('change',function(){
		self.context.strokeStyle = self.colorBoard.val();
	});
	this.lineRuler.on('input',function(){
		self.context.lineWidth = self.lineRuler.val();
	});
	ul.on('click','li',function(e){
		switch(e.target.id){
			case "clearBoard":
			self.context.clearRect(0,0,1000,600);
			break;
			case "eraser":
			self.context.strokeStyle = '#fff';
			break;
			case "rescind":
			if(self.imgArr.length>0){
				self.context.putImageData(self.imgArr.pop(),0,0)
			}
			break;
		}
	});
}
}

drawingLineObj.init();