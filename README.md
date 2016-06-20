

##webApp
### 用组件开发的形式实现了h5 app
--

## 词法分析器 ##

### 词法分析器的实现目标###

 - 以四个简单的绘图程序语句为例： 
 - ORIGIN IS (ex , ex);
 - SCALE IS (ex , ex);
 - ROT ISex; FOR ex FROM ex TO ex STEP DRAW(ex , ex); 
 - 将原文件中的字符识别成记号流。

###实现过程中遇到的问题###
 - 用全局变量是用了localStorage,window.variable是否更好
 - 输出词法分析结果时，利用了表格，是否有控制每个string长度格式化   的方法?eg:format
 - 2.未完成词法分析器sin和cos函数指针的返回操作

###初次完成后需学习要点：###

 - 深入了解函数变量存储机制
 - 深入了解js中指针被什么所替代，如何引用库函数，解决sin和cos函数指针的返回操作的问题
 - 学会控制字符格式
 - 了解js中为何没有枚举，学会枚举的使用

###一段时间后已解决的上述问题###

 - 理解了变量是有函数体控制的机制，而且是Javascript在执行前会对整个脚本文件的声明部分做完整分析：
 [参见；http://blog.csdn.net/zyz511919766/article/details/7276089](http://blog.csdn.net/zyz511919766/article/details/7276089)
 - 函数的指针即是函数名本身，但在函数名在括号中引用时，函数名后面要加括号
 - js中的枚举是用类来表示

###目前还未解决的问题###

 - 学会控制字符格式


