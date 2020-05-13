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

如果你传入了一个原始值(字符串类型、布尔类型或者数字类型)来当作 this 的绑定对象，这个原始值会被转换成它的对象形式(也就是new String(..)、new Boolean(..)或者 new Number(..))。这通常被称为“装箱”。

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

2.2.4 new绑定

使用new来调用函数，或者说发生构造函数调用时，会自动执行下面的操作：

1.创建（或者说是构造）一个全新的对象；
2.这个新对象会被执行[[Prototype]]连接。
3.这个新对象会绑定到函数调用的this。
4.如果函数没有返回其他对象，那么new表达式中的函数调用会自动返回这个新对象。


2.3 优先级

硬绑定 > new绑定 > 隐式绑定 > 默认绑定


2.4 绑定例外

2.4.1 被忽略的this

如果你把 null 或者 undefined 作为 this 的绑定对象传入 call、apply 或者 bind，这些值在调用时会被忽略，实际应用的是默认绑定规则:

```
function foo() { 
  console.log( this.a );
}
var a = 2;
foo.call( null ); // 2
```

一种非常常见的做法是使用 apply(..) 来“展开”一个数组，并当作参数传入一个函数。类似地，bind(..) 可以对参数进行柯里化(预先设置一些参数)，这种方法有时非常有用:

```
function foo(a,b) {
  console.log( "a:" + a + ", b:" + b );
}
// 把数组“展开”成参数
foo.apply( null, [2, 3] ); // a:2, b:3
// 使用 bind(..) 进行柯里化
var bar = foo.bind( null, 2 );
 bar( 3 ); // a:2, b:3  
```

2.4.2 间接引用

你有可能(有意或者无意地)创建一个函数的“间接引用”，在这 种情况下，调用这个函数会应用默认绑定规则。间接引用最容易在赋值时发生:

```
function foo() { 
  console.log( this.a );
}

var a = 2;
var o = { a: 3, foo: foo }; var p = { a: 4 };
o.foo(); // 3
(p.foo = o.foo)(); // 2

```

对于默认绑定来说，决定 this 绑定对象的并不是调用位置是否处于严格模式，而是 函数体是否处于严格模式。如果函数体处于严格模式，this 会被绑定到 undefined，否则 this 会被绑定到全局对象。

2.4.3 软绑定

如果可以给默认绑定指定一个全局对象和 undefined 以外的值，那就可以实现和硬绑定相 同的效果，同时保留隐式绑定或者显式绑定修改 this 的能力。

可以通过一种被称为软绑定的方法来实现我们想要的效果:

```
if (!Function.prototype.softBind) { 
  Function.prototype.softBind = function(obj) {
    var fn = this;
    // 捕获所有 curried 参数
    var curried = [].slice.call( arguments, 1 );
    var bound = function() {
        return fn.apply((!this || this === (window || global)) ?obj : this, curried.concat.apply( curried, arguments )
    );
  };
  bound.prototype = Object.create( fn.prototype );
  return bound;
  };
}
```

2.5 this词法

箭头函数不使用 this 的四种标准规则，而是根据外层(函数或者全局)作用域来决定 this。


1. 由new调用?绑定到新创建的对象。
2. 由call或者apply(或者bind)调用?绑定到指定的对象。
3. 由上下文对象调用?绑定到那个上下文对象。
4. 默认:在严格模式下绑定到undefined，否则绑定到全局对象。
