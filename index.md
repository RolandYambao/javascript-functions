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


# Functions with return values

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

```
input hello world 25 false 2021
output { first: 'dlrow olleh', second: -25, third: true, fourth: -2021 }
```

______________________________________________________________________________

# Functions with side-effects

A function is not just able to return new values, a function can also affect
the data *outside* of the function as well. This is what is known as a
side-effect. Let's take a look at two functions below, one is a pure
function, and the other produces a side-effect.