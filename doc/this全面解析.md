# 第二部分， this 和对象原型

## 第2章，this全面解析

调用位置

调用位置就是函数在代码中被调用的位置(而不是声明的位置)


绑定规则

2.2.1 默认绑定

独立函数调用(无法应用其他规则时的默认规则)


```
function foo() {
  console.log(this.a);
}
var a = 2;
foo(); //2
```

2.2.2 隐式绑定


```
function foo() {
  console.log(this.a)
}
var obj = {
  a:2,
  foo: foo
}
obj.foo(); //2
```
当函数引用有上下文对象时，隐式绑定规则会把函数调用中的 this 绑定到这个上下文对象

隐式丢失

一个最常见的this绑定问题就是被隐式绑定的函数会丢失绑定对象，也就是说它会应用默认绑定，从而把this绑定到全局对象或者undefined上，取决于是否是严格模式。



2.2.3 显示绑定

call，apply，bind

硬绑定

显式的强制绑定，因此我们称之为硬绑定

```
function foo() { 
    console.log( this.a );
}
var obj = { 
  a:2
};
var bar = function() { 
  foo.call( obj );
};
bar(); // 2
setTimeout( bar, 100 ); // 2

```