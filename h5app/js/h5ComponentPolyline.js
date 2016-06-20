// 折线图组件
var h5ComponentPolyline=function(name,cfg) {
	var component=new h5ComponentBase(name,cfg);

	var w=cfg.width;
	var h=cfg.height;

	// 加入一个画布，网格线背景
	var cns=document.createElement('canvas');
	var ctx=cns.getContext('2d');
	cns.width=ctx.width=w;
	cns.height=ctx.height=h;
	component.append(cns);

	// 水平网格线 100份＝＝＝>10份
	var step=10;
	ctx.beginPath();
	ctx.lineWidth=1;
	ctx.strokeStyle="#AAA";


	window.ctx=ctx;
	for(var i=0;i<step+1;i++){
		var y=(h/step)*i;
		ctx.moveTo(0, y);
		ctx.lineTo(w,y);
	}

	 // 垂直网格线，根据项目的个数去分
	 step=cfg.data.length+1;
	 var grad_width=w/step;
	 for(var i=0;i<=step;i++){
	 	var x=(grad_width)*i;
	 	ctx.moveTo(x, 0);
	 	ctx.lineTo(x,h);
	 	if(i<step-1){
	 		var text=$('<div class="text">');
	 		text.text(cfg.data[i][0]);
	 		text.css('left',x/2+grad_width/4).css('width',grad_width/2);
	 		component.append(text);
	 	}
	 }

	ctx.stroke();

	// 加入一个画布，数据层
	var cnsData=document.createElement('canvas');
	var ctxData=cnsData.getContext('2d');
	cnsData.width=ctxData.width=w;
	cnsData.height=ctxData.height=h;
	component.append(cnsData);

	

	/**
	 * @param  {float} per 百分比
	 */
	var draw=function (per) {
		ctxData.clearRect(0,0,w,h);
		// 绘制折线数据
		ctxData.beginPath();
		ctxData.lineWidth=3;
		ctxData.strokeStyle="#ff8878";
		// 画点
		var x=0;
		var y=0;
		for(var i=1;i<step;i++){
			var item=cfg.data[i-1];
			x=(w/step)*i;
			y=h*(1-item[1]*per);
			ctxData.moveTo(x,y);
			ctxData.arc(x,y,5,0,2*Math.PI);
		}
		//画线
		ctxData.moveTo((w/step+1),h*(1-cfg.data[0][1]*per));
		for(var i=2;i<step;i++){
			var item=cfg.data[i-1];
			x=(w/step)*i;
			y=h*(1-item[1]*per);
			ctxData.lineTo(x,y);
		}
		ctxData.stroke();
		//绘制阴影
		ctxData.fillStyle='rgba(255,118,118,0)';
		ctxData.lineWidth=1;
		ctxData.lineTo(x,h);
		ctxData.lineTo((w/step+1),h);
		ctxData.fillStyle='rgba(255,118,118,0.37)';
		ctxData.fill();
		//写数据
		for(var i=1;i<step;i++){
			var item=cfg.data[i-1];
			x=(w/step)*i;
			y=h*(1-item[1]*per);
			ctxData.fillStyle=item[2]?item[2]:'#595959';
			ctxData.fillText(item[1]*100+'%',x-10,y-10);
		}
		
		ctxData.stroke();

	}
	
	component.on('onLoad',function() {
		var set=0;
		for(var i=0;i<100;i++){
			setTimeout(function () {
				set+=.01;
				draw(set);
			},i*10+500)
		}
		
	})
	component.on('onLeave',function() {
		var set=1;
		for(var i=0;i<100;i++){
			setTimeout(function () {
				set-=.01;
				draw(set);
			},i*10)
		}
		
	})
	return component;
}