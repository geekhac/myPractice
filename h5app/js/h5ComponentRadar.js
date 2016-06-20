// 雷达图组件
var h5ComponentRadar=function (name,cfg) {
	var component=new h5ComponentBase(name,cfg);

	var w=cfg.width;
	var h=cfg.height;

	// 加入一个画布，网格线背景
	var cns=document.createElement('canvas');
	var ctx=cns.getContext('2d');
	cns.width=ctx.width=w;
	cns.height=ctx.height=h;
	component.append(cns);

	var r=w/2;
	var step=cfg.data.length;

	ctx.beginPath();
	ctx.arc(r,r,r,0,2*Math.PI);
	ctx.stroke();
	
	//  计算多边形顶点的坐标
	// 已知圆心（a,b）,半径r
	// rad=(2*Math.PI/360)*(360/step)*i;
	// x=a+Math.sin(rad)*r;
	// y=b+Math.cos(rad)*r;

	// 会指网格背景，分为10份
	var isBlue=false;
	for(var s=10;s>0;s--){
		ctx.beginPath();
		for(var i=0;i<step;i++){
			var rad=(2*Math.PI/360)*(360/step)*i;
			x=r+Math.sin(rad)*r*(s/10);
			y=r+Math.cos(rad)*r*(s/10);
			ctx.lineTo(x,y);
			
			
		}
		ctx.closePath();
		ctx.fillStyle=(isBlue=!isBlue)?'#99c0ff':'#f1f9ff';
		ctx.fill();
		ctx.stroke();
	}
	// 绘制伞骨
	for(var i=0;i<step;i++){
			var rad=(2*Math.PI/360)*(360/step)*i;
			x=r+Math.sin(rad)*r;
			y=r+Math.cos(rad)*r;
			ctx.moveTo(r,r);
			ctx.lineTo(x,y);
			//输出项目文字
			var text=$('<div class="text">');
			text.text(cfg.data[i][0]);
			text.css('transition','all 1s '+i*.5+'s');
			if(x>w/2){
				text.css('left',x/2+5);
			}else{
				text.css('right',(w-x)/2+5);
			}
			if(y>h/2){
				text.css('top',y/2+5);
			}else{
				text.css('bottom',(h-y)/2+5);
			}
			if(cfg.data[i][2]){
				text.css('color',cfg.data[i][2]);
			}
			text.css('opacity',0);
			
			component.append(text);
	}
	ctx.strokeStyle='#e0e0e0';
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
	ctxData.strokeStyle='#f00';
	var draw=function (per) {
		ctxData.clearRect(0,0,w,h);
		//出场文字加载
		if(per>=1){
			component.find('.text').css('opacity',1);
		}
		//退场文字消失
		if(per<=0){
			component.find('.text').css('opacity',0);
		}
		for(var i=0;i<step;i++){
			var rad=(2*Math.PI/360)*(360/step)*i;
			var rate=cfg.data[i][1]*per;
			x=r+Math.sin(rad)*r*rate;
			y=r+Math.cos(rad)*r*rate;
			ctxData.lineTo(x,y);
		}
		ctxData.closePath();
		ctxData.stroke();

		//输出数据的点
		ctxData.fillStyle='#ff7676';
		for(var i=0;i<step;i++){
			var rad=(2*Math.PI/360)*(360/step)*i;
			var rate=cfg.data[i][1]*per;
			x=r+Math.sin(rad)*r*rate;
			y=r+Math.cos(rad)*r*rate;

			ctxData.beginPath();
			ctxData.arc(x,y,5,0,2*Math.PI);
			ctxData.fill();
			ctxData.closePath();
		}
	}
	
	component.on('onLoad',function() {
		// 雷达图生成动画
		var set=0;
		for(var i=0;i<100;i++){
			setTimeout(function () {
				set+=.01;
				draw(set);
			},i*10+500)
		}
		
	})
	component.on('onLeave',function() {
		// 雷达图腿长动画
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