// 雷达图组件
var h5ComponentPie=function (name,cfg) {
	var component=new h5ComponentBase(name,cfg);

	var w=cfg.width;
	var h=cfg.height;
	var r=w/2;

	// 加入一个画布
	var cns=document.createElement('canvas');
	var ctx=cns.getContext('2d');
	cns.width=ctx.width=w;
	cns.height=ctx.height=h;
	$(cns).css('zIndex',1);
	component.append(cns);

	//绘制一个底图层
	ctx.beginPath();
	ctx.fillStyle='#eee';
	ctx.strokeStyle='#eee';
	ctx.lineWidth=1;
	ctx.arc(r,r,r,0,2*Math.PI);
	ctx.fill();
	ctx.stroke();
	
	//绘制一个数据层
	var cnsData=document.createElement('canvas');
	var ctxData=cnsData.getContext('2d');
	cnsData.width=ctxData.width=w;
	cnsData.height=ctxData.height=h;
	$(cnsData).css('zIndex',2);
	component.append(cnsData);

	var colors=['red','green','blue','darkred','orange'];//备用颜色
	var sAngel=1.5*Math.PI;//设置开始角度在12点位置
	var eAngel=0;
	var aAngel=Math.PI*2;//100%的圆结束角度

	
	var step=cfg.data.length;
	for(var i=0;i<step;i++){

		var item=cfg.data[i]
		var color=item[2]||(item[2]=colors.pop());

		eAngel=sAngel+aAngel*item[1];
		ctx.beginPath();
		ctx.fillStyle=color;
		ctx.strokeStyle=color;
		ctx.lineWidth=.1;
		ctx.moveTo(r,r);
		ctx.arc(r,r,r,sAngel,eAngel);
		ctx.fill();
		ctx.stroke();

		sAngel=eAngel;

		//加入所有的项目文本及百分比
		var text=$('<div class="text">');
		text.text(cfg.data[i][0]);
		component.append(text);
		var per=$('<div class="per">');
		per.text(cfg.data[i][1]*100+'%');
		text.append(per);

		var x=r+Math.sin(Math.PI*0.5-sAngel)*r;
		var y=r+Math.cos(Math.PI*0.5-sAngel)*r;

		if(x>w/2){
			text.css('left',x/2)
		}else{
			text.css('right',(w-x)/2);
		}
		if(y>h/2){
			text.css('top',y/2);
		}else{
			text.css('bottom',(h-y)/2);
		}
		if(cfg.data[i][2]){
			text.css('color',cfg.data[i][2]);
		}
		text.css('opacity',0);
	}

	// 绘制一个蒙板层
	var cnsMas=document.createElement('canvas');
	var ctxMas=cnsMas.getContext('2d');
	cnsMas.width=ctxMas.width=w;
	cnsMas.height=ctxMas.height=h;
	$(cnsMas).css('zIndex',3);
	component.append(cnsMas);

	//绘制一个蒙板层
	
	ctxMas.fillStyle='#eee';
	ctxMas.strokeStyle='#eee';
	ctxMas.lineWidth=1;
	

	//生长动画
	var draw=function (per) {
		ctxMas.clearRect(0,0,w,h);
		ctxMas.beginPath();
		ctxMas.moveTo(r,r);
		if(per<=0){
			ctxMas.arc(r,r,r,0,Math.PI*2);
			component.find('.text').css('opacity',0);
		}else{
			ctxMas.arc(r,r,r,sAngel,sAngel+2*Math.PI*per,true);
		}
		
		ctxMas.fill();
		ctxMas.stroke();
		if(per>=1){
			component.find('.text').css('opacity',1);
			 ctxMas.clearRect(0,0,w,h);
		}
	}

	draw(0)
	component.on('onLoad',function() {
		// 饼图生成动画
		var set=0;
		for(var i=0;i<100;i++){
			setTimeout(function () {
				set+=.01;
				draw(set);
			},i*10+500)
		}
		
	})
	component.on('onLeave',function() {
		// 饼图退出动画
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