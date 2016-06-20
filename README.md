

##eventually
### 实现了一个简洁的引导页，背景是三张图片的轮循替换，并带有透明度渐变的效果。###
[参考源码：http://pixelarity.com/eventually](http://pixelarity.com/eventually)

 - 掌握了js用删除添加类名的方法实现css渐变,
 - 学会了查看源码时快速定位dom的方法
 

####实现中遇到的问题####

 - 当css采用transitian用帧控制时，js的setInterval并不能实现轮循，只能循环一次，不理解为什么
 - 想要实现背景的平移，但是一旦左移右部背景就空白，应该是背景只能渲染到border外边框，margin中不再有有背景造成的，但是加上margin-left:-20px时，出现了导航条

####需要学习并改进####

 - 连接中图标的颜色处理，要掌握滤镜的使用
 - 背景图片的延伸处理，要学会熟练控制背景的各种大小各种超maigin问题
 - 了解setInterval的时间调用机制
 - 多学习一些调试的奇技淫巧


##webApp
### 用组件开发的形式实现了h5 app

