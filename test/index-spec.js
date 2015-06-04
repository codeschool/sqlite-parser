var expect            = require('chai').expect
    tree              = require('./helpers');

describe('sql-query-parser', function() {
  it('basic select', function(done) {
    var resultTree = '{"statement":[{"type":"statement","variant":"select","from":[{"type":"identifier","variant":"table","name":"bees","alias":null,"index":null}],"where":[{"type":"expression","format":"binary","variant":"operation","operation":"!=","left":{"type":"literal","variant":"decimal","value":"1"},"right":{"type":"literal","variant":"decimal","value":"2"},"modifier":null}],"group":null,"result":[{"type":"identifier","variant":"star","value":"bees.*"},{"type":"expression","format":"unary","variant":"cast","expression":{"type":"literal","variant":"decimal","value":"430.120"},"modifier":{"type":"datatype","format":"VARCHAR","affinity":"TEXT","expression":[{"type":"literal","variant":"decimal","value":"20"}]},"alias":null}],"distinct":true,"all":false,"order":null,"limit":null}]} ';
    tree.equals(resultTree, this, done);
  });
});
