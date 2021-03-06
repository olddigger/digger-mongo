/*

	(The MIT License)

	Copyright (C) 2005-2013 Kai Davenport

	Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

 */

var NestedSet = require('digger-nestedset');
var Load = require('./load');
var _ = require('lodash');
var utils = require('digger-utils');

function remove(collection, data, done){
  var removequery = {
    "$or":[{
      "_digger.treepath":new RegExp('^' + utils.escapeRegexp(data._digger.treepath) + '\\.', 'i')
    },{
      "_digger.diggerid":data._digger.diggerid
    }]
    
  }
  collection.remove(removequery, {safe:true}, done)
}

module.exports = function(supplier){

	var loader = Load(supplier);

	return function(collection, req, reply){

    var id = req.url.replace(/^\//, '');

    loader(collection, {
      id:id
    }, function(error, context){
      if(!context){
        reply('no context to remove');
      }
      else{
        remove(collection, context, function(error){
          reply(error, context);
        })  
      }
      
    })

	}
}