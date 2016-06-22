var h5_loading=function (images,firstPage) {
	var id=this.id;
	if(this._images===undefined){//第一次进入
		this._images=(images||[]).length;// 需要加在的图片数
		this._loaded=0;//刚开始时加载了0个资源

		window[id]=this;
		for(s in images){
			var item=images[s];
			var img=new Image;
			img.src=item;
			img.onload=function () {
				window[id].loader();
			};
		}
		$('#rate').text('0%');
		return this;
	}else{
		this._loaded++;
		$('#rate').text((this._loaded/this._images*100)>>0+'%');
		if(this._loaded<this._images){
			return this;
		}
	}

	$('.h5_page_face').find('.h5_component').trigger('onLoad')
	this.el.fullpage({
			
			onLeave:function(index,nextIndex,direction) {
				$(this).find('.h5_component').trigger('onLeave');
					
			},
			afterLoad:function(anchorLink,index) {
				$(this).find('.h5_component').trigger('onLoad');
				
			}
		}); 
	this.el.show();
	if(firstPage){
		$.fn.fullpage.moveTo(firstPage);
	}
}