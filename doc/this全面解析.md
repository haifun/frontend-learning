# 第二部分， this 和对象原型

## 第2章，this全面解析

调用位置

调用位置就是函数在代码中被调用的位置(而不是声明的位置)


绑定规则

2.2.1 默认绑定

独立函数调用

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

