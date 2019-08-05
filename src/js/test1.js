(function () {
    function foo(num1,num2) {
        return num1+num2;
    }
    console.log(foo(2,3))
})();  //这里一定要加分号，否则在后面紧跟一个如下形式的函数封装时会报错(intermediate value)(...) is not a function