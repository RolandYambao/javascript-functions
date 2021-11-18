# Functions
A function in Javascript is a reusable piece of code which might return a result.

Functions may expect multiple arguments.
An argument of a function is a value that must be provided to obtain the
function's result.

Arguments are also known as parameters (often shortened to params).

Arguments are ***positional***, this means that they will always be assigned in
the order by which they are written in the function's signature.

A function's signature is the function's name, and the list of arguments that it
is expecting. For the below function, its signature is `foo(arg0, arg1, arg2)`

```js
function foo(arg0, arg1, arg2) {
/**
 * Inside of this function foo() three variables always exist, arg0, arg1, and
 * arg2. This is because they are arguments described in the function's
 * signature.
 */
	const printObj = {};
	if (arg0 !== undefined) {
		printObj.firstArgument = arg0;
	}
	if (arg1 !== undefined) {
		printObj.secondArgument = arg1;
	}
	if (arg2 !== undefined) {
		printObj.thirdArgument = arg2;
	}
	console.log(printObj);
}
```

## Invoking a function
To have the function's code run, we need to "call" or "invoke" the function.
These two terms are used to mean passing values or variables into the 
function, **in order**. The first value passed into our `foo` function will
be represented inside the function as `arg0`, the second value passed into
our `foo` function will be represented inside the function as `arg1`, and so
on.

______________________________________________________________________________

```js
foo(1, false, 'hello world');
```

This invokes (calls/runs) our function. The output in your console from this
invokation will be

### output:
```
{
	firstArgument: 1,
	secondArgument: false,
	thirdArgument: 'hello world'
}
```
______________________________________________________________________________

You may also pass variables into the function, they will similarly be
assigned to arg0, arg1, and arg2 in the order they are supplied to the
function.

```js
const someNumber = 1;
const someBoolean = false;
const someString = "hello world";
foo(someNumber, someBoolean, someString);
```

This will also print

### output:
```
{
	firstArgument: 1,
	secondArgument: false,
	thirdArgument: 'hello world'
}
```

______________________________________________________________________________

It is not recommended, however you may pass in variables that have the same
name as the arguments expected by the function. Keep in mind that the
positioning of these variables still matters to the function.

```js
const arg0 = 1;
const arg1 = false;
const arg2 = 'hello world';
foo(arg0, arg1, arg2);
foo(arg2, arg0, arg1); // !!!
```

Because we have invoked the function twice, it will print two different times.
In order, these outputs will be.

### output:
```
// foo(arg0, arg1, arg2)
{
	firstArgument: 1,
	secondArgument: false,
	thirdArgument: 'hello world'
}

// foo(arg2, arg0, arg1)
{
  firstArgument: 'hello world',
  secondArgument: 1,
  thirdArgument: false
}
```


## Functions with return values

Now that we know how functions are invoked, lets see another important use of
functions, return values.

A function allows us to return a value after a `return` statement in its body.
This allows us to chain functions together, assign function invokations to
variables, compose functions together to form more complex operations, and
more! Let's see that in action.

```js
function bar() {
	return 2021;
}

console.log(bar()); // logs 2021
```

This is a little bit of a boring function, always returning the number `2021`.
But pay attention to the fact that you can use the return value of `bar()`
immediately as an argument to another function, e.g. `console.log`. Now,
let's make a more interesting function that takes in some arguments and
changes them into a new data structure!

```js
function opposite(first, second, third, fourth) {
	const argumentList = [first, second, third, fourth];
	for (let i = 0; i < argumentList.length; i++) {
		switch (typeof argumentList[i]) {
			case 'number':
				argumentList[i] *= -1;
				break;
			case 'string':
				argumentList[i] = argumentList[i].split('').reverse().join('');
				break;
			case 'boolean':
				argumentList[i] = !argumentList[i];
				break;
			default:
				break;
		}
	}
	const returnValue = {
		first: argumentList[0],
		second: argumentList[1],
		third: argumentList[2],
		fourth: argumentList[3],
	}
	return returnValue;
}

const newObject = opposite('hello world', 25, false, bar());
console.log('input', 'hello world', 25, false, bar())
console.log('output', newObject);
```

After checking its output we can see that it has returned the opposite of the
four arguments passed in.

### output:
```
input hello world 25 false 2021
output { first: 'dlrow olleh', second: -25, third: true, fourth: -2021 }
```

______________________________________________________________________________

## Functions with side-effects

A function is not just able to return new values, a function can also affect
the data *outside* of the function as well. This is what is known as a
side-effect. Let's take a look at two functions below, one is a pure
function, and the other produces a side-effect.

```js
function sideEffectFunction(array) {
	for (let i = 0; i < array.length; i++) {
		array[i] *= -1;
	}
	return array;
}
let beforeArray = [2, 4, 8, 16, 32, 64, 128];
let afterArray = sideEffectFunction(beforeArray);
console.log('beforeArray', beforeArray)
console.log('afterArray', afterArray);
```

### output:
```
beforeArray [
    -2,  -4,  -8,
   -16, -32, -64,
  -128
]
afterArray [
    -2,  -4,  -8,
   -16, -32, -64,
  -128
]
```

```js
function pureFunction(array) {
	const copy = array.slice();
	for (let i = 0; i < copy.length; i++) {
		copy[i] *= -1;
	}
	return copy;
}
let beforeArray = [2, 4, 8, 16, 32, 64, 128];
let afterArray = pureFunction(beforeArray);
console.log('beforeArray', beforeArray)
console.log('afterArray', afterArray);
```

### output:
```
beforeArray [
   2,  4,   8, 16,
  32, 64, 128
]
afterArray [
    -2,  -4,  -8,
   -16, -32, -64,
  -128
]
```

Note that a pure function will not cause any side-effects, it will only return
new values from its inputs. This particular pure function expects an array, and
instead of modifying its values directly, it creates a shallow copy (using the Array.
prototype.slice method read more on [MDN here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice))

______________________________________________________________________________

## Function Expressions

Function Expressions are functions that are declared at runtime and ***will only
be recognized below their declaration***. Additionally, they can be stored in 
variables to be reused at a later time. There are multiple ways to declare a
function expression, so let's take a look at the most popular ways. The
following four functions expressions all accomplish the same task, but in
slightly different configurations.

```js
const functionExpression0 = function sum(a, b) { return a + b; }
const functionExpression1 = function (a, b) { return a + b; }
const functionExpression2 = (a, b) => { return a + b; }
const functionExpression3 = (a, b) => a + b;

console.log(functionExpression0(32, 64),
	        functionExpression1(32, 64),
			functionExpression2(32, 64),
        	functionExpression3(32, 64));
```

### output:
```
96 96 96 96
```

The first method may seem familiar to you already, it is declared almost
identically to the function declarations that we have already used throughout
this lesson. So let's take a look at the following three.

functionExpression 1 to 3 are all known as **anonymous functions**, this means
that alone, they do not have a name to refer to them. This is essentially
irrelevant, as we are then assigning these anonymous functions to variables that
we can then invoke.

Let's take a look at the new syntax for functionExpressions 2 and 3. These are
made utilizing a feature that was made standard on June 17, 2015 known as **arrow
functions**.

Arrow functions are similar to, but different than functions declared with the
`function` keyword. For now, let's ignore those differences, but to satisfy your
curiosity you may read more on [MDN here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions).

Arrow functions are useful for many applications as a shorthand, especially in
callbacks. If your function only evaluates and returns a singular expression,
you may remove the curly braces from its definition and fit that expression on
the same line as in `functionExpression3`. Let's take a look at some routes in
express that can be represented in a few different ways.

```js
app.get('/', function (req, res) {
	res.send('hello world');
})

app.get('/', (req, res) => {
	res.send('hello world');
})

const rootHandler = (req, res) => {
	res.send('hello world');
}
app.get('/', rootHandler);

function handleRequest(req, res) {
	res.send('hello world');
}
app.get('/', handleRequest);
```

All of the previous methods of declaring a route will work, you may choose any
method that you like, just remember to keep things consistent to keep them
readable and maintainable.