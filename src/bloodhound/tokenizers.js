/*
 * typeahead.js
 * https://github.com/twitter/typeahead.js
 * Copyright 2013-2014 Twitter, Inc. and other contributors; Licensed MIT
 */

var tokenizers = (function() {
  'use strict';

  return {
    nonword: nonword,
    whitespace: whitespace,
    partial_match: partial_match,
    obj: {
      nonword: getObjTokenizer(nonword),
      whitespace: getObjTokenizer(whitespace),
      partial_match: getObjTokenizer(partial_match)
    }
  };

  function whitespace(str) {
    str = _.toStr(str);
    return str ? str.split(/\s+/) : [];
  }

  function nonword(str) {
    str = _.toStr(str);
    return str ? str.split(/\W+/) : [];
  }

  function partial_match(str) {
    str = _.toStr(str);
    var str_list = str ? str.split(/\s+/) : [];
    var result = [];
    for (var i = 0; i < str_list.length; i++) {
      var _str = str_list[i];
      for (var j = 0; j < _str.length; j++) {
        result.push(_str.slice(j));
      }
    }
    return result;
  }

  function getObjTokenizer(tokenizer) {
    return function setKey(keys) {
      keys = _.isArray(keys) ? keys : [].slice.call(arguments, 0);

      return function tokenize(o) {
        var tokens = [];

        _.each(keys, function(k) {
          tokens = tokens.concat(tokenizer(_.toStr(o[k])));
        });

        return tokens;
      };
    };
  }
})();
