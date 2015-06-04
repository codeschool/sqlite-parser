var expect            = require('chai').expect
    tree              = require('./helpers');

describe('sql-query-parser', function() {

  // SELECT statement

  it('basic select', function(done) {
    var resultTree = '{"statement":[{"type":"statement","variant":"select","from":[{"type":"identifier","variant":"table","name":"bananas","alias":null,"index":null}],"where":[{"type":"expression","format":"binary","variant":"operation","operation":"=","left":{"type":"identifier","variant":"column","name":"color"},"right":{"type":"literal","variant":"string","value":"red"},"modifier":null}],"group":null,"result":[{"type":"identifier","variant":"star","value":"*"}],"distinct":false,"all":false,"order":null,"limit":null}]}';
    tree.equals(resultTree, this, done);
  });

  // Aliases

  it('aliases', function(done) {
    var resultTree = '{"statement":[{"type":"statement","variant":"select","from":[{"type":"identifier","variant":"table","name":"bananas","alias":"b","index":null}],"where":null,"group":null,"result":[{"type":"identifier","variant":"column","name":"apple","alias":"The Apple"},{"type":"identifier","variant":"column","name":"pear","alias":"The_Pear"},{"type":"identifier","variant":"column","name":"orange","alias":"TheOrange"},{"type":"identifier","variant":"column","name":"pineapple","alias":"whereKeyword"}],"distinct":false,"all":false,"order":null,"limit":null}]}';
    tree.equals(resultTree, this, done);
  });

  // Expressions

  it('binary case', function(done) {
    var resultTree = '{"statement":[{"type":"statement","variant":"select","from":[{"type":"identifier","variant":"table","name":"bees","alias":null,"index":null}],"where":null,"group":null,"result":[{"type":"expression","format":"binary","variant":"case","case":null,"expression":[{"type":"condition","format":"when","condition":{"type":"expression","format":"binary","variant":"operation","operation":"=","left":{"type":"identifier","variant":"column","name":"bee"},"right":{"type":"literal","variant":"string","value":"red"},"modifier":null},"expression":{"type":"literal","variant":"string","value":"ANGRY"},"modifier":null},{"type":"condition","format":"when","condition":{"type":"expression","format":"binary","variant":"operation","operation":"=","left":{"type":"identifier","variant":"column","name":"bee"},"right":{"type":"literal","variant":"string","value":"green"},"modifier":null},"expression":{"type":"literal","variant":"string","value":"HAPPY"},"modifier":null},{"type":"condition","format":"else","expression":{"type":"literal","variant":"string","value":"NEUTRAL"},"modifier":null}],"modifier":null,"alias":"BeeState"}],"distinct":false,"all":false,"order":null,"limit":null}]}';
    tree.equals(resultTree, this, done);
  });

  it('binary cast', function(done) {
    var resultTree = '{"statement":[{"type":"statement","variant":"select","from":[{"type":"identifier","variant":"table","name":"bees","alias":null,"index":null}],"where":null,"group":null,"result":[{"type":"expression","format":"unary","variant":"cast","expression":{"type":"literal","variant":"decimal","value":"430.120"},"modifier":{"type":"datatype","format":"VARCHAR","affinity":"TEXT","expression":[{"type":"literal","variant":"decimal","value":"20"}]},"alias":null}],"distinct":false,"all":false,"order":null,"limit":null}]}';
    tree.equals(resultTree, this, done);
  });

  // INSERT Statement

  it('basic insert', function(done) {
    var resultTree = '{"statement":[{"type":"statement","variant":"insert","into":{"target":{"type":"identifier","variant":"table","name":"concessions"},"columns":[{"type":"identifier","variant":"column","name":"item"},{"type":"identifier","variant":"column","name":"size"},{"type":"identifier","variant":"column","name":"id"},{"type":"identifier","variant":"column","name":"price"}]},"action":"INSERT","or":null,"result":[{"type":"statement","variant":"values","values":[{"type":"literal","variant":"string","value":"Nachos"},{"type":"literal","variant":"string","value":"Regular"},{"type":"literal","variant":"null","value":"null"},{"type":"literal","variant":"null","value":"null"}]},{"type":"statement","variant":"values","values":[{"type":"literal","variant":"string","value":"Pizza"},{"type":"literal","variant":"null","value":"null"},{"type":"literal","variant":"decimal","value":"8"},{"type":"literal","variant":"decimal","value":"2.00"}]}]}]}';
    tree.equals(resultTree, this, done);
  });

  it('insert into select', function(done) {
    var resultTree = '{"statement":[{"type":"statement","variant":"insert","into":{"target":{"type":"identifier","variant":"table","name":"foods"},"columns":[{"type":"identifier","variant":"column","name":"item"},{"type":"identifier","variant":"column","name":"size"},{"type":"identifier","variant":"column","name":"id"},{"type":"identifier","variant":"column","name":"price"}]},"action":"INSERT","or":null,"result":{"type":"statement","variant":"select","from":[{"type":"identifier","variant":"table","name":"bananas","alias":null,"index":null}],"where":[{"type":"expression","format":"binary","variant":"operation","operation":"!=","left":{"type":"identifier","variant":"column","name":"color"},"right":{"type":"literal","variant":"string","value":"red"},"modifier":null}],"group":null,"result":[{"type":"literal","variant":"string","value":"banana","alias":null},{"type":"identifier","variant":"column","name":"size","alias":null},{"type":"literal","variant":"null","value":"null","alias":null},{"type":"identifier","variant":"column","name":"price","alias":null}],"distinct":false,"all":false,"order":null,"limit":null}}]}';
    tree.equals(resultTree, this, done);
  });

  // CREATE statement

  // it('basic create', function(done) {
  //   var resultTree = '{}';
  //   tree.equals(resultTree, this, done);
  // });


  // it('binary concatenation', function(done) {
  //   var resultTree = '{}';
  //   tree.equals(resultTree, this, done);
  // });
});
