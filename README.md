
## index.js

## forEach



`forEach(collection, callback)`

**collection** &nbsp;`Array` <br>
source to iterate

**callback** &nbsp;`Function` <br>
function to execute on each iteration with the                               form of `function (item, index, collection)`


**Return**
`Array` <br>
the collection that was passed in
<hr>


### example:



convert each items's name into uppercase 
```js
result = forEach(data, function (item, index, collection) {
  item.name = item.name.toUpperCase();
});
```
<hr>


## filter



`filter(collection, callback)`

**collection** &nbsp;`Array` <br>
source to iterate

**callback** &nbsp;`Function` <br>
function to execute on each iteration with the                               form of `function (item, index, collection)`


**Return**
`Array` <br>
the collection that was passed in

filters out all matched items from an array where the the callback returns true for
<hr>


### example:



get all elements with `'MIT'` license 
```js
result = filter(data, function(item, index, collection) {
  return item.license === 'MIT';
});
```
<hr>


## map



`map(collection, callback)`

**collection** &nbsp;`Array` <br>
source to iterate

**callback** &nbsp;`Function` <br>
function to execute on each iteration with the                               form of `function (item, index, collection)`


**Return**
`Array` <br>
resulting collection

The map() method creates a new array with the results of calling a provided function on every element in this array.
<hr>


### example:



extract all author objects from collection 
```js
result = map(data, function(item, index, collection) {
  return item.author;
});
```
<hr>


### example:



mutiply each value by 10 
```js
result = map([1, 2, 3, 4], function(item) {
  return item * 10;
});
```
<hr>


## pluckProperties



`pluckProperties(object, properties)`

**object** &nbsp;`Object` <br>
object to retrive from

**properties** &nbsp;`Array` <br>
collection of keys to extract


**Return**
`Object` <br>
new object with matched keys

Retrieves the values of specified keys from all properties in object.

<hr>


### example:



extract name and description out of project object 
```js
var project = data[0];
result = pluckProperties(data[0], ['name', 'description']);
```
<hr>


### example:



get name and description of all elements in the collection 
```js
result = map(data, function(item) {
  return pluckProperties(item, ['name', 'description']);
});
```
<hr>


## pluck



`pluck(target, properties)`

**target** &nbsp;`Object` `Array` <br>
object or collection to retrive from

**properties** &nbsp;`Array` <br>
list of keys to retrive


**Return**
`Object` `Array` <br>


Retrieves the values of specified keys from each element in the collection.

in the case of being an object it will apply pluckProperties, if not it will
iterate over all elemnts in the collection

<hr>


### example:



pluck data of an object 
```js
result = pluck(data[0], ['name', 'author']);
```
<hr>


### example:



pluck data of a collection 
```js
result = pluck(data, ['name', 'author']);
```
<hr>


## reduce



`reduce(collection, callback, accumlator)`

**collection** &nbsp;`Array` <br>
source to iterate

**callback** &nbsp;`Function` <br>
function to execute on each iteration with the                               form of `function (accumulator, item, index, collection)`

**accumlator** &nbsp;`Object` <br>
may be of any type, if not set it will take the                               initial value of the first item
                              in the collection.


**Return**
`Object` <br>
final value of `accumulator`

Reduces a collection to a value which is the accumulated result of running each element in the collection through the callback.

<hr>


### example



create a new collection out of each item by 10 
```js
result = reduce([1,2,3,4], function (acc, item) {
  acc.push(item * 10);
  // remember to return our accumulator for the next iteration
  return acc;
 }, []);
```
<hr>


### example



create a new object with: 
-the list of all the project names
-set of dependencies with name and times found

```js
result = reduce(data, function (acc, item) {
  acc.names.push(item.name);
  if(item.keywords) {
    acc.keywordCount[item.name] = item.keywords.length;
  }
return acc;
}, {
  names: [],
  keywordCount: {},
});
```
expected output:

```js
{ names:
  [ 'GRUNT-MOCHA-CLI',
    'GRUNT-CONTRIB-WATCH',
    'GRUNT-CONTRIB-JSHINT',
    'ERRORJS',
    'LODASH' ],
  keywordCount:
  { 'GRUNT-MOCHA-CLI': 2,
    'GRUNT-CONTRIB-WATCH': 2,
    'GRUNT-CONTRIB-JSHINT': 1,
    LODASH: 7
  }
}
```
<hr>



