'use strict';

var data = require('./lib/data');
var result;

/**
 * @summary ## forEach
 * @param  {Array}    collection source to iterate
 * @param  {Function} callback   function to execute on each iteration with the
 *                               form of `function (item, index, collection)`
 * @return {Array}               the collection that was passed in
 */
function forEach(collection, callback) {
  for (var i = 0; i < collection.length; i++) {
    callback(collection[i], i, collection);
  }

  return collection;
}

/**
 * @summary ### example:
 * @description convert each items's name into uppercase
 *
 * ```js
 * result = forEach(data, function (item, index, collection) {
 *   item.name = item.name.toUpperCase();
 * });
 * ```
 */
result = forEach(data, function (item, index, collection) {
  item.name = item.name.toUpperCase();
});


/**
 * @summary ## filter
 * @description filters out all matched items from an array where the the
 * callback returns true for
 * @param  {Array}    collection source to iterate
 * @param  {Function} callback   function to execute on each iteration with the
 *                               form of `function (item, index, collection)`
 * @return {Array}               the collection that was passed in
 */
function filter(collection, callback) {
  var result = [];
  for (var i = 0; i < collection.length; i++) {
    var found = callback(collection[i], i, collection);
    if (found) {
      result.push(collection[i]);
    }
  }
  return result;
}

/**
 * @summary ### example:
 * @description get all elements with `'MIT'` license
 *
 * ```js
 * result = filter(data, function(item, index, collection) {
 *   return item.license === 'MIT';
 * });
 * ```
 */
result = filter(data, function(item, index, collection) {
  return item.license === 'MIT';
});


/**
 * @summary ## map
 * @description The map() method creates a new array with the results of calling
 * a provided function on every element in this array.
 * @param  {Array}    collection source to iterate
 * @param  {Function} callback   function to execute on each iteration with the
 *                               form of `function (item, index, collection)`
 * @return {Array}               resulting collection
 */
function map(collection, callback) {
  var result = [];
  for (var i = 0; i < collection.length; i++) {
    result.push(callback(collection[i]));

  }
  return result;
}


/**
 * @summary ### example:
 * @description extract all author objects from collection
 *
 * ```js
 * result = map(data, function(item, index, collection) {
 *   return item.author;
 * });
 * ```
 */
result = map(data, function(item, index, collection) {
  return item.author;
});

/**
 * @summary ### example:
 * @description mutiply each value by 10
 *
 * ```js
 * result = map([1, 2, 3, 4], function(item) {
 *   return item * 10;
 * });
 * ```
 */
result = map([1, 2, 3, 4], function(item) {
  return item * 10;
});

/**
 * @summary ## pluckProperties
 * @description Retrieves the values of specified keys from all
 * properties in object.
 *
 * @param  {Object} object     object to retrive from
 * @param  {Array}  properties collection of keys to extract
 * @return {Object}            new object with matched keys
 */
function pluckProperties(object, properties) {
  var result = {};

  for (var i = 0; i < properties.length; i++) {
    var key = properties[i];
    result[key] = object[key];
  }

  return result;
}

/**
 * @summary ### example:
 * @description extract name and description out of project object
 *
 * ```js
 * var project = data[0];
 * result = pluckProperties(data[0], ['name', 'description']);
 * ```
 */

//
var project = data[0];
result = pluckProperties(data[0], ['name', 'description']);

/**
 * @summary ### example:
 * @description get name and description of all elements in the collection
 *
 * ```js
 * result = map(data, function(item) {
 *   return pluckProperties(item, ['name', 'description']);
 * });
 * ```
 */
result = map(data, function(item) {
  return pluckProperties(item, ['name', 'description']);
});

/**
 * @summary ## pluck
 * @description Retrieves the values of specified keys from each element
 * in the collection.
 *
 * in the case of being an object it will apply pluckProperties, if not it will
 * iterate over all elemnts in the collection
 *
 * @param  {Object|Array} target     object or collection to retrive from
 * @param  {Array}        properties list of keys to retrive
 * @return {Object|Array}
 */
function pluck(target, properties) {
  //check if not array
  if(!(target instanceof Array)) {
    return pluckProperties.apply(null, arguments);
  }

  // is array, so iterate over collection
  return map(target, function(item) {
    return pluckProperties(item, properties);
  });
}

/**
 * @summary ### example:
 * @description pluck data of an object
 *
 * ```js
 * result = pluck(data[0], ['name', 'author']);
 * ```
 */
result = pluck(data[0], ['name', 'author']);

/**
 * @summary ### example:
 * @description pluck data of a collection
 *
 * ```js
 * result = pluck(data, ['name', 'author']);
 * ```
 */
result = pluck(data[0], ['name', 'author']);

/**
 * @summary ## reduce
 * @description Reduces a collection to a value which is the accumulated
 * result of running each element in the collection through the callback.
 *
 * @param  {Array}    collection source to iterate
 * @param  {Function} callback   function to execute on each iteration with the
 *                               form of `function (accumulator, item, index, collection)`
 * @param  {Object}   accumlator may be of any type, if not set it will take the
 *                               initial value of the first item
 *                               in the collection.
 * @return {Object}              final value of `accumulator`
 */
function reduce(collection, callback, accumlator) {
  if(typeof accumlator === 'undefined') {
    accumlator = collection[0];
  }

  for (var i = 0; i < collection.length; i++) {
    accumlator = callback(accumlator, collection[i], i, collection);
  }

  return accumlator;
}


/**
 * @summary ### example
 * @description create a new collection out of each item by 10
 *
 * ```js
 * result = reduce([1,2,3,4], function (acc, item) {
 *   acc.push(item * 10);
 *   // remember to return our accumulator for the next iteration
 *   return acc;
 *  }, []);
 * ```
 */
result = reduce([1,2,3,4], function (acc, item) {
  acc.push(item * 10);

  return acc;
}, []);

/**
 * @summary ### example
 * @description create a new object with:
 *
 * -the list of all the project names
 * -set of dependencies with name and times found
 *
 * ```js
 * result = reduce(data, function (acc, item) {
 *   acc.names.push(item.name);
 *   if(item.keywords) {
 *     acc.keywordCount[item.name] = item.keywords.length;
 *   }
 * return acc;
 * }, {
 *   names: [],
 *   keywordCount: {},
 * });
 * ```
 * expected output:
 *
 * ```js
 * { names:
 *   [ 'GRUNT-MOCHA-CLI',
 *     'GRUNT-CONTRIB-WATCH',
 *     'GRUNT-CONTRIB-JSHINT',
 *     'ERRORJS',
 *     'LODASH' ],
 *   keywordCount:
 *   { 'GRUNT-MOCHA-CLI': 2,
 *     'GRUNT-CONTRIB-WATCH': 2,
 *     'GRUNT-CONTRIB-JSHINT': 1,
 *     LODASH: 7
 *   }
 * }
 * ```
 */
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








console.log(result);
