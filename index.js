const functionExpression0 = function sum(a, b) { return a + b; }
const functionExpression1 = function (a, b) { return a + b; }
const functionExpression2 = (a, b) => { return a + b; }
const functionExpression3 = (a, b) => a + b;

console.log(functionExpression0(32, 64),
    functionExpression1(32, 64),
    functionExpression2(32, 64),
    functionExpression3(32, 64));