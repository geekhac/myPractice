var h5ComponentBaseRelativeTo=function(name,cfg) {
	var cfg=cfg||{};

	var id=('h5_c_'+Math.random()).replace('.','_');
	// 将当前的组建类型加到dom中进行标记
	var cla='h5_component_'+cfg.type;

	var component=$('<div class="h5_component '+cla+' h5_component_name_'+name+'" id="'+id+'">');

	cfg.text&& component.text(cfg.text);
	cfg.width&&component.width(cfg.width/2);
	cfg.height&&component.height(cfg.height/2);
	cfg.css&&component.css(cfg.css);
	cfg.bg&&component.css('backgroundImage','url('+cfg.bg+')');

	if(cfg.center===true){
		component.css({
			marginLeft:(cfg.width/4*-1)+'px',
			left:'50%'
		})
	}
	if(cfg.relativeTo){
		var parent=$('body').find('.h5_component_'+cfg.relativeTo);
		var position={
			top:$(parent)[0].offsetTop,
			left:$(parent)[0].offsetLeft
		}
		component.css('transform','translate('+position.left+'px,'+position.top+'px)');
	}

	component.on('onLoad',function() {
		component.addClass(cla+'_load').removeClass(cla+'_leave');
		cfg.animateIn&&component.animate(cfg.animateIn);
	});
	component.on('onLeave',function () {
		component.addClass(cla+'_leave').removeClass(cla+'_load');
		cfg.animateOut&&component.animate(cfg.animateOut);
	});

	return component;
}