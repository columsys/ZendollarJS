# ZendollarJS
A JavaScript Library

## 兼容性
 - Chrome
 - Firefox
 - Edge
 - Safari

暂时不支持IE浏览器，此bug有待改善

## 使用方法

```js
<script src="Zendollarjs.js"></script>
<script>
$(function(){
    //some codes...
});
</script>
```

## 示例

```js
$('#box').$(0).$('div')[0].$({
    click:function(){
        $(this).hide();
    }
});
```

## API


  特点：
  
  
1. 多达几十种核心方法

2. 多达几十种对Element，Array，String，Date等原生对象的扩展方法

3. 内置mobi.css框架

4. 对部分ES5及ES6的新语法做了兼容处理

5. 支持链式调用

6. 安装简单，仅仅只须一个JavaScript文件便能实现所有功能


  以下是全部Zendollar核心方法:

- $on
- $off
- $load
- $ready
- $lag
- $loadImage
- $per
- $each
- $map
- $unique
- $make
- $call
- $debounce
- $poll
- $once
- $find
- $matches
- $query
- $filter
- $until
- $index
- $inArray
- $isParent
- $isInViewport
- $isHit
- $isWindow
- $isArray
- $isFunction
- $isNumber
- $isString
- $isBoolean
- $isObject
- $isNull
- $isUndefined
- $is
- $print
- $proxy
- $eval
- $now
- $time
- $resetCSS
- $addCSS
- $setCSS
- $clientWidth
- $clientHeight
- $scrollLeft
- $scrollTop
- $scrollWidth
- $scrollHeight
- $screenWidth
- $screenHeight
- $screenLeft
- $screenTop
- $outerWidth
- $outerHeight
- $offset
- $position
- $view
- $scrollTo
- $event
- $lock
- $unlock
- $data
- $ajax
- $setCookie
- $getCookie
- $clearCookie
- $checkCookie
- $JSON
- $getUrlParam
- $getUrl
- $listener

每个核心方法都有一下三种调用方式：

```js
//以迭代遍历方法$per()为例：
$per($('div'),function(){...});
$.per($('div'),function(){...});
Zendollar.per($('div'),function(){...});
```

以下是部分核心方法的示例：

### $()
  
  - ID选择器
  - 类选择器
  - 标签选择器
  - 属性选择器
  - 样式选择器
  - 伪类选择器
  - XML选择器
  - Name选择器
  - 索引选择器
  - DOM ready
  - 选择一个对象
  - json格式设置样式、属性、绑定事件等

```js
$('#box');
$('.wrap');
$('div');
$('[name=john]');
$('{width: 100px;}');
$(':header');
$('<p>Zendollar</p>');
$('@john');
$(0).$(1).$(2);
$(function(){...});
$(Obj);
$(Obj).$({
    width:'50px',
    innerHTML:'Zendollar',
    go:function($click,$mouseout){
        $(this).css('background','green');
    }
});
```

### $query()

  调用querySelectorAll来获取元素:
    
```js
$query('.wrap #box ul>li')[0];
```

### $each()

  遍历数组或对象:

```js
$each($('div'),function(){...});
```

### $scrollTo()

  快速垂直滚动到参数设置的位置（带滚动动画）:

```js
$scrollTo(500);
$scrollTo('top');
$scrollTo('bottom');
```

### $call()

  事件委托:

```js
$call($('#box'),'span','click',function(){...});
```

### $unique()

  数组去重并排序:

```js
$unique([1,2,3,1,2,3]);
```

### $ajax()

  类似于jQuery的ajax方法:

```js
$ajax({
    type: "GET",
    url: "test.json",
    dataType: "json",
    success: function(){
        //some codes...
    }
});
```

### $event()

  经过封装的event对象，不必再传入参数就能获取：

```js
$(document).on('keyup',function(){
    if($event().code === 32){
        //some codes...
    }
});
```

### $addCSS()

  可直接在javascript中添加或修改内部样式：

```js
$addCSS(
    'div{background:red}',
    'p{color:green}',
    '.wrap{float:left}'
);
```

### $is()

  判断传递的参数类型：

```js
$is('Zendollar');  //return String
$is([1,2,3]);  //return Array
$is(0);  //return Number
$is($('div')[0]);  //return HTMLDivElement
```

### $on()

  绑定事件：

```js
$on($('#box'),'click',function(){...});
```

### $off()

  解除事件绑定：

```js
$off($('#box'),'click',function(){...});
```


以下是部分Element扩展方法的示例：

### .css()

  修改某个元素的一个css样式或以json格式修改多个样式:

```js
$('div')[0].css('background','green');
$('div')[0].css({
    width:'100px',
    height:'200px'
});
```

### .$click()

  通过以$符号加event事件类型的格式给某个元素绑定事件（可以用.off()方法来解除事件绑定）:

```js
$('div')[0].$click(function(){...});
$('div')[0].$mouseover(function(){...});
$('div')[0].$dblclick(function(){...});
```

### .on()

  给元素绑定事件的方法（对应的解绑方法是.off()）:

```js
$('#box').on('click mouseout',function(){...});
```

### .go()

  同样是给元素绑定事件的方法（对应的解绑方法是.stop()）:

```js
$('#box').go('mousedown mousemove',function(){...});
```

### .$width()

  返回元素的宽度或设置宽度（同样的还有.$height()，所有带$符号的方法都支持document和window对象）：

```js
$('#box').$width($(window).$width());
```

### .hover()

  给元素分别绑定鼠标移入和移除的事件所执行的回调函数：

```js
$('#box').hover(function(){...},function(){...});
```

### .follow()

  给元素绑定两个事件，事件一被触发并执行回调函数一之后才会触发事件二：

```js
$('#box').follow('click',function(){...},'mouseover',function(){...});
```

### .siblings()

  遍历某个元素的所有同辈兄弟元素节点：

```js
$each($('#box').siblings(),funxtion(){...});
```

### .html()

  获取元素的innerHTML或者设置其innerHTML：

```js
$('#box').html($(3).$(0).html());
```

### .addClass()

  给某个元素添加className：

```js
$('#box').addClass('wrap');
```

### .watch()

  监听某表单类型元素的value值的变化（可用.unwatch()方法来解除监听）：

```js
$(':text')[0].watch(function(){...});
```

### .empty()

  清空元素的所有文本内容和子节点：

```js
$('div')[1].empty();
```

### .trigger()

  触发某个元素所绑定过的事件：

```js
$('#box').trigger('click');
```

### .toggle()

  给元素绑定进行第奇数次click点击和第偶数次click点击时所执行的回调函数：

```js
$('#box').toggle(function(){...},function(){...});
```

### .slideDown()

 给元素添加向下滑动的动画（可设定速度值，对应的是.slideUp()方法）：

```js
$per($('.wrap'),function(){
    $(this).slideDown();
});
```

### .fadeIn()

  给元素添加逐渐淡入的动画（可设定速度值，对应的是.fadeOut()方法）：

```js
$per($('.wrap'),function(){
    $(this).fadeIn();
});
```

### .drag()

  使元素能按住进行拖拽：

```js
$('{width: 100px}')[0].drag();
```

### .animate()

  通过设定css样式值和速率等来给元素添加自定义动画：

```js
$('#box').animate({
    width:200,
    height:300
},'linear','fast',function(){
    $(this).hide();
});
```

### .offset()

  返回某元素各边与页面各边的距离，有left，top，right和bottom四个属性：

```js
var Left = $('#box').offset().left,
    Top = $('#box').offset().top;
```

### .index()

  返回一个元素在其父节点中相对其他同辈兄弟元素节点的索引值：
  
```js
var i = $('#box').index();
```
### And More ......

此外还有更多方法等，使得操作dom和编写JavaScript变得更加简便。

## 许可

  MIT
