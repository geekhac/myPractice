var h5ComponentRing=function (name,cfg) {
	if(cfg.data.length>1){
		cfg.data=[cfg.data[0]];
	}
	//依旧利用饼图的css样式
	cfg.type='pie';
	var component=new h5ComponentPie(name,cfg);

	component.addClass('h5_component_ring');

	var mask=$('<div class="mask">');
	component.append(mask);

	var text=component.find('.text');

	text.attr('style','');
	if(cfg.data[0],[2]){
		text.css('color',cfg.data[0][2]);
	}
	mask.append(text);
	return component;
}