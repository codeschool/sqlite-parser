var tree              = require('./helpers');

describe('sqlite-parser', function() {

  // Aliases

  it('aliases', function(done) {
    var resultTree = '{"statement":[{"explain":false,"type":"statement","variant":"select","from":[{"type":"identifier","variant":"table","name":"bananas","alias":"b","index":null}],"where":null,"group":null,"result":[{"type":"identifier","variant":"column","name":"apple","alias":"The Apple"},{"type":"identifier","variant":"column","name":"pear","alias":"The_Pear"},{"type":"identifier","variant":"column","name":"orange","alias":"TheOrange"},{"type":"identifier","variant":"column","name":"pineapple","alias":"whereKeyword"}],"distinct":false,"all":false,"order":null,"limit":null}]}';
    tree.equals(resultTree, this, done);
  });

  // Expressions

  it('expression unary 1', function(done) {
    var resultTree = '{"statement":[{"explain":false,"type":"statement","variant":"select","from":[{"type":"identifier","variant":"table","name":"hats","alias":null,"index":null}],"where":null,"group":null,"result":[{"type":"expression","format":"unary","variant":"operation","expression":{"type":"identifier","variant":"column","name":"bees"},"operator":"not","alias":"b"}],"distinct":false,"all":false,"order":null,"limit":null}]}';
    tree.equals(resultTree, this, done);
  });

  it('expression table 1', function(done) {
    var resultTree = '{"statement":[{"explain":false,"type":"statement","variant":"select","from":{"type":"map","variant":"join","source":{"type":"identifier","variant":"table","name":"inventory","alias":null,"index":null},"map":[{"type":"join","variant":"inner join","source":{"type":"identifier","variant":"table","name":"ham","alias":null,"index":null},"on":{"type":"expression","format":"binary","variant":"operation","operation":"=","left":{"type":"identifier","variant":"column","name":"inventory.variety"},"right":{"type":"identifier","variant":"column","name":"ham.type"}},"using":null}]},"where":null,"group":null,"result":[{"type":"identifier","variant":"star","name":"*"}],"distinct":false,"all":false,"order":null,"limit":null,"with":{"type":"with","recursive":false,"expression":[{"type":"expression","format":"table","name":"ham","expression":{"type":"statement","variant":"select","from":[{"type":"identifier","variant":"table","name":"hams","alias":null,"index":null}],"where":null,"group":null,"result":[{"type":"identifier","variant":"column","name":"type","alias":null}],"distinct":false,"all":false,"order":null,"limit":null},"columns":null}]}}]}';
    tree.equals(resultTree, this, done);
  });

  it('expression like', function(done) {
    var resultTree = '{"statement":[{"explain":false,"type":"statement","variant":"select","from":[{"type":"identifier","variant":"table","name":"hats","alias":null,"index":null}],"where":[{"type":"expression","format":"binary","variant":"operation","operation":"like","left":{"type":"identifier","variant":"column","name":"bees"},"right":{"type":"literal","variant":"string","value":"%somebees%"}}],"group":null,"result":[{"type":"identifier","variant":"star","name":"*"}],"distinct":false,"all":false,"order":null,"limit":null}]}';
    tree.equals(resultTree, this, done);
  });

  it('binary case', function(done) {
    var resultTree = '{"statement":[{"explain":false,"type":"statement","variant":"select","from":[{"type":"identifier","variant":"table","name":"bees","alias":null,"index":null}],"where":null,"group":null,"result":[{"type":"expression","format":"binary","variant":"case","expression":null,"condition":[{"type":"condition","format":"when","when":{"type":"expression","format":"binary","variant":"operation","operation":"=","left":{"type":"identifier","variant":"column","name":"bee"},"right":{"type":"literal","variant":"string","value":"red"}},"then":{"type":"literal","variant":"string","value":"ANGRY"}},{"type":"condition","format":"when","when":{"type":"expression","format":"binary","variant":"operation","operation":"=","left":{"type":"identifier","variant":"column","name":"bee"},"right":{"type":"literal","variant":"string","value":"green"}},"then":{"type":"literal","variant":"string","value":"HAPPY"}},{"type":"condition","format":"else","else":{"type":"literal","variant":"string","value":"NEUTRAL"}}],"alias":"BeeState"}],"distinct":false,"all":false,"order":null,"limit":null}]}';
    tree.equals(resultTree, this, done);
  });

  it('binary cast', function(done) {
    var resultTree = '{"statement":[{"explain":false,"type":"statement","variant":"select","from":[{"type":"identifier","variant":"table","name":"bees","alias":null,"index":null}],"where":null,"group":null,"result":[{"type":"expression","format":"unary","variant":"cast","expression":{"type":"literal","variant":"decimal","value":"430.120"},"as":{"type":"datatype","variant":"varchar","affinity":"text","args":[{"type":"literal","variant":"decimal","value":"20"}]},"alias":null}],"distinct":false,"all":false,"order":null,"limit":null}]}';
    tree.equals(resultTree, this, done);
  });

  it('binary concatenation', function(done) {
    var resultTree = '{"statement":[{"explain":false,"type":"statement","variant":"select","from":[{"type":"identifier","variant":"table","name":"bananas","alias":null,"index":null}],"where":[{"type":"expression","format":"binary","variant":"operation","operation":"and","left":{"type":"expression","format":"binary","variant":"operation","operation":"!=","left":{"type":"literal","variant":"decimal","value":"1"},"right":{"type":"literal","variant":"decimal","value":"2"}},"right":{"type":"expression","format":"binary","variant":"operation","operation":"or","left":{"type":"expression","format":"binary","variant":"operation","operation":"!=","left":{"type":"identifier","variant":"column","name":"color"},"right":{"type":"literal","variant":"string","value":"blue"}},"right":{"type":"expression","format":"binary","variant":"operation","operation":"==","left":{"type":"identifier","variant":"column","name":"pees"},"right":{"type":"identifier","variant":"column","name":"crackers"}}}}],"group":null,"result":[{"type":"identifier","variant":"star","name":"*"}],"distinct":false,"all":false,"order":null,"limit":null}]}';
    tree.equals(resultTree, this, done);
  });

  it('expression grouping 1', function(done) {
    var resultTree = '{"statement":[{"explain":false,"type":"statement","variant":"create","format":"index","target":{"type":"identifier","variant":"index","name":"bees.hive_state"},"where":[{"type":"expression","format":"binary","variant":"operation","operation":"and","left":{"type":"expression","format":"binary","variant":"operation","operation":"!=","left":{"type":"identifier","variant":"column","name":"anger"},"right":{"type":"literal","variant":"null","value":"null"}},"right":{"type":"expression","format":"unary","variant":"operation","expression":{"type":"identifier","variant":"column","name":"happiness"},"operator":"not"}}],"on":{"target":"hive","columns":[{"type":"identifier","variant":"column","format":"indexed","direction":"asc","name":"happiness","collate":null},{"type":"identifier","variant":"column","format":"indexed","direction":"desc","name":"anger","collate":null}]},"condition":[],"unique":false}]}';
    tree.equals(resultTree, this, done);
  });

  it('expression grouping 2', function(done) {
    var resultTree = '{"statement":[{"explain":false,"type":"statement","variant":"create","format":"index","target":{"type":"identifier","variant":"index","name":"bees.hive_state"},"where":[{"type":"expression","format":"binary","variant":"operation","operation":"and","left":{"type":"expression","format":"unary","variant":"operation","expression":{"type":"identifier","variant":"column","name":"happiness"},"operation":"not null"},"right":{"type":"expression","format":"binary","variant":"operation","operation":">","left":{"type":"identifier","variant":"column","name":"anger"},"right":{"type":"literal","variant":"decimal","value":"0"}}}],"on":{"target":"hive","columns":[{"type":"identifier","variant":"column","format":"indexed","direction":"asc","name":"happiness","collate":null},{"type":"identifier","variant":"column","format":"indexed","direction":"desc","name":"anger","collate":null}]},"condition":[],"unique":false}]}';
    tree.equals(resultTree, this, done);
  });

  it('expression grouping 3', function(done) {
    var resultTree = '{"statement":[{"explain":false,"type":"statement","variant":"create","format":"index","target":{"type":"identifier","variant":"index","name":"bees.hive_state"},"where":[{"type":"expression","format":"binary","variant":"operation","operation":"and","left":{"type":"expression","format":"binary","variant":"operation","operation":"is not","left":{"type":"identifier","variant":"column","name":"happiness"},"right":{"type":"literal","variant":"null","value":"null"}},"right":{"type":"expression","format":"binary","variant":"operation","operation":">","left":{"type":"identifier","variant":"column","name":"anger"},"right":{"type":"literal","variant":"decimal","value":"0"}}}],"on":{"target":"hive","columns":[{"type":"identifier","variant":"column","format":"indexed","direction":"asc","name":"happiness","collate":null},{"type":"identifier","variant":"column","format":"indexed","direction":"desc","name":"anger","collate":null}]},"condition":[],"unique":false}]}';
    tree.equals(resultTree, this, done);
  });

  it('expression grouping 4', function(done) {
    var resultTree = '{"statement":[{"explain":false,"type":"statement","variant":"create","format":"index","target":{"type":"identifier","variant":"index","name":"bees.hive_state"},"where":[{"type":"expression","format":"binary","variant":"operation","operation":"and","left":{"type":"expression","format":"unary","variant":"operation","expression":{"type":"identifier","variant":"column","name":"happiness"},"operation":"is null"},"right":{"type":"expression","format":"binary","variant":"operation","operation":">","left":{"type":"identifier","variant":"column","name":"anger"},"right":{"type":"literal","variant":"decimal","value":"0"}}}],"on":{"target":"hive","columns":[{"type":"identifier","variant":"column","format":"indexed","direction":"asc","name":"happiness","collate":null},{"type":"identifier","variant":"column","format":"indexed","direction":"desc","name":"anger","collate":null}]},"condition":[],"unique":false}]}';
    tree.equals(resultTree, this, done);
  });

  it('expression grouping 5', function(done) {
    var resultTree = '{"statement":[{"explain":false,"type":"statement","variant":"create","format":"index","target":{"type":"identifier","variant":"index","name":"bees.hive_state"},"where":[{"type":"expression","format":"binary","variant":"operation","operation":"and","left":{"type":"expression","format":"binary","variant":"operation","operation":">","left":{"type":"identifier","variant":"column","name":"anger"},"right":{"type":"literal","variant":"decimal","value":"0"}},"right":{"type":"expression","format":"binary","variant":"operation","operation":"is not","left":{"type":"identifier","variant":"column","name":"happiness"},"right":{"type":"literal","variant":"null","value":"null"}}}],"on":{"target":"hive","columns":[{"type":"identifier","variant":"column","format":"indexed","direction":"asc","name":"happiness","collate":null},{"type":"identifier","variant":"column","format":"indexed","direction":"desc","name":"anger","collate":null}]},"condition":[],"unique":false}]}';
    tree.equals(resultTree, this, done);
  });

  it('expression grouping 6', function(done) {
    var resultTree = '{"statement":[{"explain":false,"type":"statement","variant":"create","format":"index","target":{"type":"identifier","variant":"index","name":"bees.hive_state"},"where":[{"type":"expression","format":"binary","variant":"operation","operation":"and","left":{"type":"expression","format":"unary","variant":"operation","expression":{"type":"identifier","variant":"column","name":"happiness"},"operator":"not"},"right":{"type":"expression","format":"binary","variant":"operation","operation":">","left":{"type":"identifier","variant":"column","name":"anger"},"right":{"type":"literal","variant":"decimal","value":"0"}}}],"on":{"target":"hive","columns":[{"type":"identifier","variant":"column","format":"indexed","direction":"asc","name":"happiness","collate":null},{"type":"identifier","variant":"column","format":"indexed","direction":"desc","name":"anger","collate":null}]},"condition":[],"unique":false}]}';
    tree.equals(resultTree, this, done);
  });

  it('expression grouping 7', function(done) {
    var resultTree = '{"statement":[{"explain":false,"type":"statement","variant":"create","format":"index","target":{"type":"identifier","variant":"index","name":"bees.hive_state"},"where":[{"type":"expression","format":"binary","variant":"operation","operation":"or","left":{"type":"expression","format":"unary","variant":"operation","expression":{"type":"identifier","variant":"column","name":"happiness"},"operator":"not"},"right":{"type":"expression","format":"binary","variant":"operation","operation":"and","left":{"type":"expression","format":"unary","variant":"operation","expression":{"type":"identifier","variant":"column","name":"ANGER"},"operator":"~"},"right":{"type":"expression","format":"binary","variant":"operation","operation":"is not","left":{"type":"identifier","variant":"column","name":"anger"},"right":{"type":"literal","variant":"decimal","value":"0"}}}}],"on":{"target":"hive","columns":[{"type":"identifier","variant":"column","format":"indexed","direction":"asc","name":"happiness","collate":null},{"type":"identifier","variant":"column","format":"indexed","direction":"desc","name":"anger","collate":null}]},"condition":[],"unique":false}]}';
    tree.equals(resultTree, this, done);
  });

  it('expression parenthesis 1', function(done) {
    var resultTree = '{"statement":[{"explain":false,"type":"statement","variant":"select","from":[{"type":"identifier","variant":"table","name":"hats","alias":null,"index":null}],"where":[{"type":"expression","format":"binary","variant":"operation","operation":"or","left":{"type":"identifier","variant":"column","name":"hat"},"right":{"type":"expression","format":"binary","variant":"operation","operation":"and","left":{"type":"identifier","variant":"column","name":"shirt"},"right":{"type":"expression","format":"binary","variant":"operation","operation":"and","left":{"type":"expression","format":"binary","variant":"operation","operation":"or","left":{"type":"identifier","variant":"column","name":"shoes"},"right":{"type":"identifier","variant":"column","name":"wig"}},"right":{"type":"identifier","variant":"column","name":"pants"}}}}],"group":null,"result":[{"type":"identifier","variant":"star","name":"*"}],"distinct":false,"all":false,"order":null,"limit":null}]}';
    tree.equals(resultTree, this, done);
  });

  it('expression parenthesis 2', function(done) {
    var resultTree = '{"statement":[{"explain":false,"type":"statement","variant":"select","from":[{"type":"identifier","variant":"table","name":"hats","alias":null,"index":null}],"where":[{"type":"expression","format":"binary","variant":"operation","operation":"and","left":{"type":"expression","format":"binary","variant":"operation","operation":"or","left":{"type":"expression","format":"binary","variant":"operation","operation":"!=","left":{"type":"literal","variant":"decimal","value":"1"},"right":{"type":"literal","variant":"decimal","value":"2"}},"right":{"type":"expression","format":"binary","variant":"operation","operation":"!=","left":{"type":"literal","variant":"decimal","value":"3"},"right":{"type":"literal","variant":"decimal","value":"4"}}},"right":{"type":"expression","format":"binary","variant":"operation","operation":"==","left":{"type":"literal","variant":"decimal","value":"3"},"right":{"type":"literal","variant":"decimal","value":"3"}}}],"group":null,"result":[{"type":"identifier","variant":"star","name":"*"}],"distinct":false,"all":false,"order":null,"limit":null}]}';
    tree.equals(resultTree, this, done);
  });

  // SELECT statement

  it('basic select', function(done) {
    var resultTree = '{"statement":[{"explain":false,"type":"statement","variant":"select","from":[{"type":"identifier","variant":"table","name":"bananas","alias":null,"index":null}],"where":[{"type":"expression","format":"binary","variant":"operation","operation":"=","left":{"type":"identifier","variant":"column","name":"color"},"right":{"type":"literal","variant":"string","value":"red"}}],"group":null,"result":[{"type":"identifier","variant":"star","name":"*"}],"distinct":false,"all":false,"order":null,"limit":null}]}';
    tree.equals(resultTree, this, done);
  });

  it('select alt syntax', function(done) {
    var resultTree = '{"statement":[{"explain":false,"type":"statement","variant":"select","result":[{"type":"values","variant":"list","values":[{"type":"literal","variant":"decimal","value":"1"},{"type":"literal","variant":"decimal","value":"2"},{"type":"literal","variant":"decimal","value":"3"}]},{"type":"values","variant":"list","values":[{"type":"literal","variant":"decimal","value":"4"},{"type":"literal","variant":"decimal","value":"5"},{"type":"literal","variant":"decimal","value":"6"}]}],"from":null,"where":null,"group":null,"order":[{"direction":"desc","expression":{"type":"identifier","variant":"column","name":"ham"},"collate":null}],"limit":null}]}';
    tree.equals(resultTree, this, done);
  });

  it('select parts 1', function(done) {
    var resultTree = '{"statement":[{"explain":false,"type":"statement","variant":"select","from":[{"type":"identifier","variant":"table","name":"hats","alias":"h","index":null}],"where":[{"type":"expression","format":"binary","variant":"operation","operation":"==","left":{"type":"identifier","variant":"column","name":"h.color"},"right":{"type":"literal","variant":"string","value":"red"}}],"group":{"expression":[{"type":"identifier","variant":"column","name":"h.color"},{"type":"identifier","variant":"column","name":"h.material"}],"having":{"type":"expression","format":"binary","variant":"operation","operation":">=","left":{"type":"function","name":"COUNT","distinct":false,"args":[{"type":"identifier","variant":"column","name":"h.quantity"}]},"right":{"type":"literal","variant":"decimal","value":"200"}}},"result":[{"type":"identifier","variant":"star","name":"*"}],"distinct":false,"all":false,"order":[{"direction":"desc","expression":{"type":"identifier","variant":"column","name":"h.color"},"collate":null}],"limit":{"start":{"type":"literal","variant":"decimal","value":"20"},"offset":{"type":"literal","variant":"decimal","value":"10"}}}]}';
    tree.equals(resultTree, this, done);
  });

  it('basic subquery', function(done) {
    var resultTree = '{"statement":[{"explain":false,"type":"statement","variant":"select","from":{"type":"map","variant":"join","source":{"alias":"z","type":"statement","variant":"select","from":[{"type":"identifier","variant":"table","name":"bananas","alias":"b","index":null}],"where":null,"group":null,"result":[{"type":"identifier","variant":"column","name":"b.color","alias":null}],"distinct":false,"all":false,"order":null,"limit":null},"map":[{"type":"join","variant":"join","source":{"type":"identifier","variant":"table","name":"apples","alias":"a","index":null},"on":{"type":"expression","format":"binary","variant":"operation","operation":"=","left":{"type":"identifier","variant":"column","name":"a.color"},"right":{"type":"identifier","variant":"column","name":"b.color"}},"using":null}]},"where":null,"group":null,"result":[{"type":"identifier","variant":"column","name":"a.color","alias":null}],"distinct":false,"all":false,"order":null,"limit":null}]}';
    tree.equals(resultTree, this, done);
  });

  it('basic union', function(done) {
    var resultTree = '{"statement":[{"explain":false,"type":"statement","variant":"compound","statement":{"type":"statement","variant":"select","from":[{"type":"identifier","variant":"table","name":"a","alias":null,"index":null}],"where":null,"group":null,"result":[{"type":"identifier","variant":"star","name":"*"}],"distinct":false,"all":false},"compound":[{"type":"compound","variant":"union","statement":{"type":"statement","variant":"select","from":[{"type":"identifier","variant":"table","name":"b","alias":null,"index":null}],"where":null,"group":null,"result":[{"type":"identifier","variant":"star","name":"*"}],"distinct":false,"all":false}}],"order":null,"limit":null}]}';
    tree.equals(resultTree, this, done);
  });

  it('select qualified table 1', function(done) {
    var resultTree = '{"statement":[{"explain":false,"type":"statement","variant":"select","from":[{"type":"identifier","variant":"table","name":"bees","alias":"b","index":"bees_index"}],"where":null,"group":null,"result":[{"type":"identifier","variant":"star","name":"*"}],"distinct":false,"all":false,"order":null,"limit":null}]}';
    tree.equals(resultTree, this, done);
  });

  // Functions

  it('basic function', function(done) {
    var resultTree = '{"statement":[{"explain":false,"type":"statement","variant":"select","from":[{"type":"identifier","variant":"table","name":"apples","alias":null,"index":null}],"where":null,"group":null,"result":[{"type":"function","name":"COUNT","distinct":false,"args":[{"type":"identifier","variant":"star","name":"*"}],"alias":null},{"type":"function","name":"MAX","distinct":false,"args":[{"type":"identifier","variant":"column","name":"price"}],"alias":null}],"distinct":false,"all":false,"order":null,"limit":null}]}';
    tree.equals(resultTree, this, done);
  });

  it('function mixed args', function(done) {
    var resultTree = '{"statement":[{"explain":false,"type":"statement","variant":"select","from":[],"where":null,"group":null,"result":[{"type":"function","name":"MYFUNC","distinct":false,"args":[{"type":"identifier","variant":"column","name":"col"},{"type":"literal","variant":"decimal","value":"1.2"},{"type":"literal","variant":"string","value":"str"}],"alias":"Super Func"}],"distinct":false,"all":false,"order":null,"limit":null}]}';
    tree.equals(resultTree, this, done);
  });

  // Join Types

  it('join types 1', function(done) {
    var resultTree = '{"statement":[{"explain":false,"type":"statement","variant":"select","from":{"type":"map","variant":"join","source":{"type":"identifier","variant":"table","name":"Movies","alias":"m","index":null},"map":[{"type":"join","variant":"inner join","source":{"alias":"r","type":"statement","variant":"select","from":[{"type":"identifier","variant":"table","name":"Rooms","alias":"r2","index":null}],"where":[{"type":"expression","format":"binary","variant":"operation","operation":">=","left":{"type":"identifier","variant":"column","name":"r2.seats"},"right":{"type":"literal","variant":"decimal","value":"50"}}],"group":null,"result":[{"type":"identifier","variant":"column","name":"r2.movie_id","alias":null}],"distinct":false,"all":false,"order":null,"limit":null},"on":{"type":"expression","format":"binary","variant":"operation","operation":"and","left":{"type":"expression","format":"binary","variant":"operation","operation":"=","left":{"type":"identifier","variant":"column","name":"m.id"},"right":{"type":"identifier","variant":"column","name":"r.movie_id"}},"right":{"type":"expression","format":"binary","variant":"operation","operation":"!=","left":{"type":"identifier","variant":"column","name":"m.title"},"right":{"type":"literal","variant":"string","value":"Batman"}}},"using":null}]},"where":null,"group":null,"result":[{"type":"identifier","variant":"column","name":"m.title","alias":null},{"type":"identifier","variant":"column","name":"r.id","alias":"Theatre Number"}],"distinct":false,"all":false,"order":null,"limit":null}]}';
    tree.equals(resultTree, this, done);
  });

  it('join types 2', function(done) {
    var resultTree = '{"statement":[{"explain":false,"type":"statement","variant":"select","from":{"type":"map","variant":"join","source":{"type":"identifier","variant":"table","name":"Movies","alias":"m","index":null},"map":[{"type":"join","variant":"left outer join","source":{"type":"identifier","variant":"table","name":"Rooms","alias":"r","index":null},"on":{"type":"expression","format":"binary","variant":"operation","operation":"=","left":{"type":"identifier","variant":"column","name":"m.id"},"right":{"type":"identifier","variant":"column","name":"r.movie_id"}},"using":null}]},"where":null,"group":null,"result":[{"type":"identifier","variant":"column","name":"m.title","alias":null},{"type":"identifier","variant":"column","name":"r.id","alias":"Theatre Number"}],"distinct":false,"all":false,"order":null,"limit":null}]}';
    tree.equals(resultTree, this, done);
  });

  // UPDATE Statement

  it('basic update', function(done) {
    var resultTree = '{"statement":[{"explain":false,"type":"statement","variant":"update","into":{"type":"identifier","variant":"table","name":"bees","alias":null,"index":null},"where":[{"type":"expression","format":"binary","variant":"operation","operation":"not in","left":{"type":"identifier","variant":"column","name":"name"},"right":{"type":"statement","variant":"select","from":[{"type":"identifier","variant":"table","name":"bee_names","alias":null,"index":null}],"where":[{"type":"expression","format":"binary","variant":"operation","operation":"<","left":{"type":"identifier","variant":"column","name":"size"},"right":{"type":"literal","variant":"decimal","value":"3.14"}}],"group":null,"result":[{"type":"identifier","variant":"column","name":"name","alias":null}],"distinct":false,"all":false,"order":null,"limit":null}}],"set":[{"type":"assignment","target":{"type":"identifier","variant":"column","name":"name"},"value":{"type":"literal","variant":"string","value":"drone"}},{"type":"assignment","target":{"type":"identifier","variant":"column","name":"wings"},"value":{"type":"literal","variant":"decimal","value":"2"}}],"order":null,"limit":null}]}';
    tree.equals(resultTree, this, done);
  });

  it('update limit', function(done) {
    var resultTree = '{"statement":[{"explain":false,"type":"statement","variant":"update","into":{"type":"identifier","variant":"table","name":"bees","alias":null,"index":null},"where":[{"type":"expression","format":"binary","variant":"operation","operation":"!=","left":{"type":"identifier","variant":"column","name":"name"},"right":{"type":"literal","variant":"string","value":"nicholas"}}],"set":[{"type":"assignment","target":{"type":"identifier","variant":"column","name":"name"},"value":{"type":"literal","variant":"string","value":"drone"}},{"type":"assignment","target":{"type":"identifier","variant":"column","name":"wings"},"value":{"type":"literal","variant":"decimal","value":"2"}}],"order":null,"limit":{"start":{"type":"literal","variant":"decimal","value":"2"},"offset":{"type":"literal","variant":"decimal","value":"10"}}}]}';
    tree.equals(resultTree, this, done);
  });

  // DELETE Statement

  it('basic delete', function(done) {
    var resultTree = '{"statement":[{"explain":false,"type":"statement","variant":"delete","from":{"type":"identifier","variant":"table","name":"bees","alias":null,"index":null},"where":[{"type":"expression","format":"binary","variant":"operation","operation":"or","left":{"type":"expression","format":"binary","variant":"operation","operation":"=","left":{"type":"identifier","variant":"column","name":"status"},"right":{"type":"literal","variant":"string","value":"stung"}},"right":{"type":"expression","format":"binary","variant":"operation","operation":"=","left":{"type":"identifier","variant":"column","name":"status"},"right":{"type":"literal","variant":"string","value":"eaten"}}}],"order":null,"limit":null}]}';
    tree.equals(resultTree, this, done);
  });

  it('delete limit', function(done) {
    var resultTree = '{"statement":[{"explain":false,"type":"statement","variant":"delete","from":{"type":"identifier","variant":"table","name":"bees","alias":null,"index":null},"where":[{"type":"expression","format":"binary","variant":"operation","operation":"or","left":{"type":"expression","format":"binary","variant":"operation","operation":"=","left":{"type":"identifier","variant":"column","name":"status"},"right":{"type":"literal","variant":"string","value":"stung"}},"right":{"type":"expression","format":"binary","variant":"operation","operation":"=","left":{"type":"identifier","variant":"column","name":"status"},"right":{"type":"literal","variant":"string","value":"eaten"}}}],"order":null,"limit":{"start":{"type":"literal","variant":"decimal","value":"10"},"offset":{"type":"literal","variant":"decimal","value":"5"}}}]}';
    tree.equals(resultTree, this, done);
  });

  // INSERT Statement

  it('basic insert', function(done) {
    var resultTree = '{"statement":[{"explain":false,"type":"statement","variant":"insert","into":{"target":{"type":"identifier","variant":"table","name":"concessions"},"columns":[{"type":"identifier","variant":"column","name":"item"},{"type":"identifier","variant":"column","name":"size"},{"type":"identifier","variant":"column","name":"id"},{"type":"identifier","variant":"column","name":"price"}]},"action":"insert","or":null,"result":[{"type":"values","variant":"list","values":[{"type":"literal","variant":"string","value":"Nachos"},{"type":"literal","variant":"string","value":"Regular"},{"type":"literal","variant":"null","value":"null"},{"type":"literal","variant":"null","value":"null"}]},{"type":"values","variant":"list","values":[{"type":"literal","variant":"string","value":"Pizza"},{"type":"literal","variant":"null","value":"null"},{"type":"literal","variant":"decimal","value":"8"},{"type":"literal","variant":"decimal","value":"2.00"}]}]}]}';
    tree.equals(resultTree, this, done);
  });

  it('insert into select', function(done) {
    var resultTree = '{"statement":[{"explain":false,"type":"statement","variant":"insert","into":{"target":{"type":"identifier","variant":"table","name":"foods"},"columns":[{"type":"identifier","variant":"column","name":"item"},{"type":"identifier","variant":"column","name":"size"},{"type":"identifier","variant":"column","name":"id"},{"type":"identifier","variant":"column","name":"price"}]},"action":"insert","or":null,"result":{"type":"statement","variant":"select","from":[{"type":"identifier","variant":"table","name":"bananas","alias":null,"index":null}],"where":[{"type":"expression","format":"binary","variant":"operation","operation":"!=","left":{"type":"identifier","variant":"column","name":"color"},"right":{"type":"literal","variant":"string","value":"red"}}],"group":null,"result":[{"type":"literal","variant":"string","value":"banana","alias":null},{"type":"identifier","variant":"column","name":"size","alias":null},{"type":"literal","variant":"null","value":"null","alias":null},{"type":"identifier","variant":"column","name":"price","alias":null}],"distinct":false,"all":false,"order":null,"limit":null}}]}';
    tree.equals(resultTree, this, done);
  });

  it('insert into default', function(done) {
    var resultTree = '{"statement":[{"explain":false,"type":"statement","variant":"insert","into":{"target":{"type":"identifier","variant":"table","name":"apples"},"columns":[{"type":"identifier","variant":"column","name":"a"},{"type":"identifier","variant":"column","name":"b"},{"type":"identifier","variant":"column","name":"c"}]},"action":"insert","or":null,"result":{"type":"values","variant":"default","values":null}}]}';
    tree.equals(resultTree, this, done);
  });

  // CREATE TABLE statement

  it('basic create table', function(done) {
    var resultTree = '{"statement":[{"explain":false,"type":"statement","variant":"create","format":"table","temporary":false,"target":{"type":"identifier","variant":"table","name":"advertisements"},"condition":[],"optimization":[],"definition":[{"type":"definition","variant":"column","name":"id","definition":[{"name":null,"type":"constraint","variant":"primary key","conflict":null,"direction":null,"modififer":null,"autoIncrement":false}],"datatype":{"type":"datatype","variant":"int","affinity":"integer","args":[]}},{"type":"definition","variant":"column","name":"name","definition":[],"datatype":{"type":"datatype","variant":"varchar","affinity":"text","args":[{"type":"literal","variant":"decimal","value":"50"}]}},{"type":"definition","variant":"column","name":"category","definition":[],"datatype":{"type":"datatype","variant":"varchar","affinity":"text","args":[{"type":"literal","variant":"decimal","value":"15"}]}},{"type":"definition","variant":"column","name":"cost","definition":[],"datatype":{"type":"datatype","variant":"int","affinity":"integer","args":[]}}]}]}';
    tree.equals(resultTree, this, done);
  });

  it('create table alt syntax', function(done) {
    var resultTree = '{"statement":[{"explain":false,"type":"statement","variant":"create","format":"table","temporary":false,"target":{"type":"identifier","variant":"table","name":"bees"},"condition":[],"optimization":null,"definition":[{"type":"statement","variant":"select","from":[{"type":"identifier","variant":"table","name":"old_bees","alias":null,"index":null}],"where":[{"type":"expression","format":"binary","variant":"operation","operation":"is not","left":{"type":"identifier","variant":"column","name":"name"},"right":{"type":"literal","variant":"null","value":"null"}}],"group":null,"result":[{"type":"identifier","variant":"column","name":"name","alias":null},{"type":"identifier","variant":"column","name":"color","alias":null},{"type":"identifier","variant":"column","name":"legs","alias":null},{"type":"identifier","variant":"column","name":"id","alias":null}],"distinct":false,"all":false,"order":null,"limit":null}]}]}';
    tree.equals(resultTree, this, done);
  });

  it('create foreign key 1', function(done) {
    var resultTree = '{"statement":[{"explain":false,"type":"statement","variant":"create","format":"table","temporary":false,"target":{"type":"identifier","variant":"table","name":"Bees"},"condition":[],"optimization":[],"definition":[{"type":"definition","variant":"column","name":"id","definition":[{"name":null,"type":"constraint","variant":"primary key","conflict":null,"direction":null,"modififer":null,"autoIncrement":false}],"datatype":{"type":"datatype","variant":"int","affinity":"integer","args":[]}},{"type":"definition","variant":"column","name":"color","definition":[],"datatype":{"type":"datatype","variant":"int","affinity":"integer","args":[]}},{"type":"definition","variant":"column","name":"hive_id","definition":[{"name":null,"type":"constraint","variant":"unique","conflict":null}],"datatype":{"type":"datatype","variant":"int","affinity":"integer","args":[]}},{"type":"definition","variant":"constraint","name":null,"definition":[{"type":"constraint","variant":"foreign key","target":{"type":"identifier","variant":"table","name":"Hives"},"columns":null,"action":null,"defer":null}],"columns":[{"type":"identifier","variant":"column","name":"hive_id"}]}]}]}';
    tree.equals(resultTree, this, done);
  });

  it('create foreign key 2', function(done) {
    var resultTree = '{"statement":[{"explain":false,"type":"statement","variant":"create","format":"table","temporary":false,"target":{"type":"identifier","variant":"table","name":"Bees"},"condition":[],"optimization":[],"definition":[{"type":"definition","variant":"column","name":"id","definition":[{"name":null,"type":"constraint","variant":"primary key","conflict":null,"direction":null,"modififer":null,"autoIncrement":false}],"datatype":{"type":"datatype","variant":"int","affinity":"integer","args":[]}},{"type":"definition","variant":"column","name":"color","definition":[],"datatype":{"type":"datatype","variant":"int","affinity":"integer","args":[]}},{"type":"definition","variant":"column","name":"hive_id","definition":[{"name":null,"type":"constraint","variant":"unique","conflict":null},{"name":null,"variant":"foreign key","type":"constraint","action":null,"defer":null,"target":{"type":"identifier","variant":"table","name":"Hives"},"columns":[{"type":"identifier","variant":"column","name":"id"}]}],"datatype":{"type":"datatype","variant":"int","affinity":"integer","args":[]}}]}]}';
    tree.equals(resultTree, this, done);
  });

  it('create check 1', function(done) {
    var resultTree = '{"statement":[{"explain":false,"type":"statement","variant":"create","format":"table","temporary":false,"target":{"type":"identifier","variant":"table","name":"Bees"},"condition":[],"optimization":[],"definition":[{"type":"definition","variant":"column","name":"id","definition":[{"name":null,"type":"constraint","variant":"primary key","conflict":null,"direction":null,"modififer":null,"autoIncrement":false}],"datatype":{"type":"datatype","variant":"int","affinity":"integer","args":[]}},{"type":"definition","variant":"column","name":"name","definition":[{"name":null,"type":"constraint","variant":"not null","conflict":null},{"name":null,"type":"constraint","variant":"unique","conflict":null}],"datatype":{"type":"datatype","variant":"varchar","affinity":"text","args":[{"type":"literal","variant":"decimal","value":"50"}]}},{"type":"definition","variant":"column","name":"wings","definition":[{"name":null,"type":"constraint","variant":"check","expression":{"type":"expression","format":"binary","variant":"operation","operation":">=","left":{"type":"identifier","variant":"column","name":"wings"},"right":{"type":"literal","variant":"decimal","value":"2"}}}],"datatype":{"type":"datatype","variant":"int","affinity":"integer","args":[]}},{"type":"definition","variant":"column","name":"legs","definition":[{"name":null,"type":"constraint","variant":"check","expression":{"type":"expression","format":"binary","variant":"operation","operation":"<","left":{"type":"identifier","variant":"column","name":"legs"},"right":{"type":"literal","variant":"decimal","value":"8"}}}],"datatype":{"type":"datatype","variant":"int","affinity":"integer","args":[]}}]}]}';
    tree.equals(resultTree, this, done);
  });

  it('create check 2', function(done) {
    var resultTree = '{"statement":[{"explain":false,"type":"statement","variant":"create","format":"table","temporary":false,"target":{"type":"identifier","variant":"table","name":"Bees"},"condition":[],"optimization":[],"definition":[{"type":"definition","variant":"column","name":"id","definition":[{"name":null,"type":"constraint","variant":"primary key","conflict":null,"direction":null,"modififer":null,"autoIncrement":false}],"datatype":{"type":"datatype","variant":"int","affinity":"integer","args":[]}},{"type":"definition","variant":"column","name":"name","definition":[{"name":null,"type":"constraint","variant":"not null","conflict":null},{"name":null,"type":"constraint","variant":"unique","conflict":null}],"datatype":{"type":"datatype","variant":"varchar","affinity":"text","args":[{"type":"literal","variant":"decimal","value":"50"}]}},{"type":"definition","variant":"column","name":"wings","definition":[],"datatype":{"type":"datatype","variant":"int","affinity":"integer","args":[]}},{"type":"definition","variant":"column","name":"legs","definition":[],"datatype":{"type":"datatype","variant":"int","affinity":"integer","args":[]}},{"type":"definition","variant":"constraint","name":null,"definition":[{"type":"constraint","variant":"check","expression":{"type":"expression","format":"binary","variant":"operation","operation":"<","left":{"type":"identifier","variant":"column","name":"legs"},"right":{"type":"literal","variant":"decimal","value":"8"}}}]},{"type":"definition","variant":"constraint","name":null,"definition":[{"type":"constraint","variant":"check","expression":{"type":"expression","format":"binary","variant":"operation","operation":">=","left":{"type":"identifier","variant":"column","name":"wings"},"right":{"type":"literal","variant":"decimal","value":"2"}}}]}]}]}';
    tree.equals(resultTree, this, done);
  });

  it('create primary key 1', function(done) {
    var resultTree = '{"statement":[{"explain":false,"type":"statement","variant":"create","format":"table","temporary":false,"target":{"type":"identifier","variant":"table","name":"Bees"},"condition":[],"optimization":[],"definition":[{"type":"definition","variant":"column","name":"id","definition":[],"datatype":{"type":"datatype","variant":"int","affinity":"integer","args":[]}},{"type":"definition","variant":"column","name":"color","definition":[],"datatype":{"type":"datatype","variant":"int","affinity":"integer","args":[]}},{"type":"definition","variant":"column","name":"hive_id","definition":[{"name":null,"type":"constraint","variant":"unique","conflict":null}],"datatype":{"type":"datatype","variant":"int","affinity":"integer","args":[]}},{"type":"definition","variant":"constraint","name":null,"definition":[{"type":"constraint","variant":"primary key","conflict":"fail"}],"columns":[{"type":"identifier","variant":"column","format":"indexed","direction":null,"name":"id","collate":null}]}]}]}';
    tree.equals(resultTree, this, done);
  });

  // CREATE INDEX statement

  it('basic create index', function(done) {
    var resultTree = '{"statement":[{"explain":false,"type":"statement","variant":"create","format":"index","target":{"type":"identifier","variant":"index","name":"bees.hive_state"},"where":[{"type":"expression","format":"binary","variant":"operation","operation":">","left":{"type":"identifier","variant":"column","name":"anger"},"right":{"type":"literal","variant":"decimal","value":"0"}}],"on":{"target":"hive","columns":[{"type":"identifier","variant":"column","format":"indexed","direction":"asc","name":"happiness","collate":null},{"type":"identifier","variant":"column","format":"indexed","direction":"desc","name":"anger","collate":null}]},"condition":[],"unique":false}]}';
    tree.equals(resultTree, this, done);
  });

  // CREATE TRIGGER statement

  it('basic create trigger', function(done) {
    var resultTree = '{"statement":[{"explain":false,"type":"statement","variant":"create","format":"trigger","when":{"type":"expression","format":"unary","variant":"operation","expression":{"type":"identifier","variant":"column","name":"cust_addr"},"operation":"not null"},"target":{"type":"identifier","variant":"trigger","name":"cust_addr_chng"},"on":"customer_address","condition":[],"event":{"type":"event","occurs":"instead of","event":"update","of":[{"type":"identifier","variant":"column","name":"cust_addr"}]},"temporary":false,"by":"row","action":[{"explain":false,"type":"statement","variant":"update","into":{"type":"identifier","variant":"table","name":"customer","alias":null,"index":null},"where":[{"type":"expression","format":"binary","variant":"operation","operation":"=","left":{"type":"identifier","variant":"column","name":"cust_id"},"right":{"type":"identifier","variant":"column","name":"NEW.cust_id"}}],"set":[{"type":"assignment","target":{"type":"identifier","variant":"column","name":"cust_addr"},"value":{"type":"identifier","variant":"column","name":"NEW.cust_addr"}}],"order":null,"limit":null}]}]}';
    tree.equals(resultTree, this, done);
  });

  // CREATE VIEW statement

  it('basic create view', function(done) {
    var resultTree = '{"statement":[{"explain":false,"type":"statement","variant":"create","format":"view","condition":[],"temporary":false,"target":{"type":"identifier","variant":"view","name":"happy.bananaView"},"result":{"type":"statement","variant":"select","from":[{"type":"identifier","variant":"table","name":"bananas","alias":null,"index":null}],"where":[{"type":"expression","format":"binary","variant":"operation","operation":"=","left":{"type":"identifier","variant":"column","name":"color"},"right":{"type":"literal","variant":"string","value":"red"}}],"group":null,"result":[{"type":"identifier","variant":"column","name":"type","alias":null},{"type":"identifier","variant":"column","name":"name","alias":null},{"type":"identifier","variant":"column","name":"origin","alias":null}],"distinct":false,"all":false,"order":null,"limit":null}}]}';
    tree.equals(resultTree, this, done);
  });

  // CREATE VIRTUAL TABLE statement

  it('basic create virtual table', function(done) {
    var resultTree = '{"statement":[{"explain":false,"type":"statement","variant":"create","format":"virtual","condition":[],"target":{"type":"identifier","variant":"table","name":"happy_table"},"result":{"type":"module","name":"happy_module","args":[{"type":"expression","format":"binary","variant":"operation","operation":"!=","left":{"type":"identifier","variant":"column","name":"some"},"right":{"type":"literal","variant":"string","value":"expression"}},{"type":"literal","variant":"string","value":"just a string"},{"type":"literal","variant":"decimal","value":"33.0"}]}}]}';
    tree.equals(resultTree, this, done);
  });

  it('create virtual table alt syntax', function(done) {
    var resultTree = '{"statement":[{"explain":false,"type":"statement","variant":"create","format":"virtual","condition":[],"target":{"type":"identifier","variant":"table","name":"happy_table"},"result":{"type":"module","name":"happy_module","args":[{"type":"definition","variant":"column","name":"id","definition":[{"name":null,"type":"constraint","variant":"primary key","conflict":null,"direction":null,"modififer":null,"autoIncrement":false}],"datatype":{"type":"datatype","variant":"int","affinity":"integer","args":[]}},{"type":"definition","variant":"column","name":"name","definition":[],"datatype":{"type":"datatype","variant":"varchar","affinity":"text","args":[{"type":"literal","variant":"decimal","value":"50"}]}},{"type":"definition","variant":"column","name":"category","definition":[],"datatype":{"type":"datatype","variant":"varchar","affinity":"text","args":[{"type":"literal","variant":"decimal","value":"15"}]}},{"type":"definition","variant":"column","name":"cost","definition":[],"datatype":{"type":"datatype","variant":"int","affinity":"integer","args":[]}}]}}]}';
    tree.equals(resultTree, this, done);
  });

  // DROP statement

  it('basic drop table', function(done) {
    var resultTree = '{"statement":[{"explain":false,"type":"statement","variant":"drop","format":"table","target":{"type":"identifier","variant":"table","name":"beeStuff"},"condition":[]}]}';
    tree.equals(resultTree, this, done);
  });

  it('basic drop trigger', function(done) {
    var resultTree = '{"statement":[{"explain":false,"type":"statement","variant":"drop","format":"trigger","target":{"type":"identifier","variant":"table","name":"happy.insertRecord"},"condition":[{"type":"condition","condition":"if exists"}]}]}';
    tree.equals(resultTree, this, done);
  });

  it('drop alt syntax', function(done) {
    var resultTree = '{"statement":[{"explain":false,"type":"statement","variant":"drop","format":"table","target":{"type":"identifier","variant":"table","name":"hive.beeStuff"},"condition":[{"type":"condition","condition":"if exists"}]}]}';
    tree.equals(resultTree, this, done);
  });

  // Transaction

  it('basic transaction', function(done) {
    var resultTree = '{"statement":[{"explain":false,"type":"statement","variant":"transaction","statement":[{"explain":false,"type":"statement","variant":"create","format":"table","temporary":false,"target":{"type":"identifier","variant":"table","name":"foods"},"condition":[],"optimization":[],"definition":[{"type":"definition","variant":"column","name":"id","definition":[{"name":null,"type":"constraint","variant":"primary key","conflict":null,"direction":null,"modififer":null,"autoIncrement":false}],"datatype":{"type":"datatype","variant":"int","affinity":"integer","args":[]}},{"type":"definition","variant":"column","name":"item","definition":[],"datatype":{"type":"datatype","variant":"varchar","affinity":"text","args":[{"type":"literal","variant":"decimal","value":"50"}]}},{"type":"definition","variant":"column","name":"size","definition":[],"datatype":{"type":"datatype","variant":"varchar","affinity":"text","args":[{"type":"literal","variant":"decimal","value":"15"}]}},{"type":"definition","variant":"column","name":"price","definition":[],"datatype":{"type":"datatype","variant":"int","affinity":"integer","args":[]}}]},{"explain":false,"type":"statement","variant":"insert","into":{"target":{"type":"identifier","variant":"table","name":"foods"},"columns":[{"type":"identifier","variant":"column","name":"item"},{"type":"identifier","variant":"column","name":"size"},{"type":"identifier","variant":"column","name":"id"},{"type":"identifier","variant":"column","name":"price"}]},"action":"insert","or":null,"result":{"type":"statement","variant":"select","from":[{"type":"identifier","variant":"table","name":"bananas","alias":null,"index":null}],"where":[{"type":"expression","format":"binary","variant":"operation","operation":"!=","left":{"type":"identifier","variant":"column","name":"color"},"right":{"type":"literal","variant":"string","value":"red"}}],"group":null,"result":[{"type":"literal","variant":"string","value":"banana","alias":null},{"type":"identifier","variant":"column","name":"size","alias":null},{"type":"literal","variant":"null","value":"null","alias":null},{"type":"identifier","variant":"column","name":"price","alias":null}],"distinct":false,"all":false,"order":null,"limit":null}}],"defer":"immediate"}]}';
    tree.equals(resultTree, this, done);
  });

  it('transaction rollback', function(done) {
    var resultTree = '{"statement":[{"explain":false,"type":"statement","variant":"rollback","savepoint":{"type":"identifier","variant":"savepoint","name":"super_save"}}]}';
    tree.equals(resultTree, this, done);
  });

  // Full-featured tests

  it('full featured 1', function(done) {
    var resultTree = '{"statement":[{"explain":false,"type":"statement","variant":"create","format":"table","temporary":false,"target":{"type":"identifier","variant":"table","name":"Actors"},"condition":[],"optimization":[],"definition":[{"type":"definition","variant":"column","name":"name","definition":[],"datatype":{"type":"datatype","variant":"varchar","affinity":"text","args":[{"type":"literal","variant":"decimal","value":"50"}]}},{"type":"definition","variant":"column","name":"country","definition":[],"datatype":{"type":"datatype","variant":"varchar","affinity":"text","args":[{"type":"literal","variant":"decimal","value":"50"}]}},{"type":"definition","variant":"column","name":"salary","definition":[],"datatype":{"type":"datatype","variant":"integer","affinity":"integer","args":[]}}]},{"explain":false,"type":"statement","variant":"insert","into":{"target":{"type":"identifier","variant":"table","name":"Actors"},"columns":[{"type":"identifier","variant":"column","name":"name"},{"type":"identifier","variant":"column","name":"country"},{"type":"identifier","variant":"column","name":"salary"}]},"action":"insert","or":null,"result":[{"type":"values","variant":"list","values":[{"type":"literal","variant":"string","value":"Vivien Leigh"},{"type":"literal","variant":"string","value":"IN"},{"type":"literal","variant":"decimal","value":"150000"}]},{"type":"values","variant":"list","values":[{"type":"literal","variant":"string","value":"Clark Gable"},{"type":"literal","variant":"string","value":"USA"},{"type":"literal","variant":"decimal","value":"120000"}]},{"type":"values","variant":"list","values":[{"type":"literal","variant":"string","value":"Olivia de Havilland"},{"type":"literal","variant":"string","value":"Japan"},{"type":"literal","variant":"decimal","value":"30000"}]},{"type":"values","variant":"list","values":[{"type":"literal","variant":"string","value":"Hattie McDaniel"},{"type":"literal","variant":"string","value":"USA"},{"type":"literal","variant":"decimal","value":"45000"}]}]},{"explain":false,"type":"statement","variant":"select","from":[{"type":"identifier","variant":"table","name":"Actors","alias":null,"index":null}],"where":null,"group":null,"result":[{"type":"function","name":"MIN","distinct":false,"args":[{"type":"identifier","variant":"column","name":"salary"}],"alias":"MinSalary"},{"type":"function","name":"MAX","distinct":false,"args":[{"type":"identifier","variant":"column","name":"salary"}],"alias":"MaxSalary"}],"distinct":false,"all":false,"order":null,"limit":null}]}';
    tree.equals(resultTree, this, done);
  });

  it('full featured 2', function(done) {
    var resultTree = '{"statement":[{"explain":false,"type":"statement","variant":"create","format":"table","temporary":false,"target":{"type":"identifier","variant":"table","name":"Actors"},"condition":[],"optimization":[],"definition":[{"type":"definition","variant":"column","name":"id","definition":[{"name":null,"type":"constraint","variant":"primary key","conflict":null,"direction":null,"modififer":null,"autoIncrement":false}],"datatype":{"type":"datatype","variant":"int","affinity":"integer","args":[]}},{"type":"definition","variant":"column","name":"name","definition":[{"name":null,"type":"constraint","variant":"not null","conflict":null},{"name":null,"type":"constraint","variant":"unique","conflict":null}],"datatype":{"type":"datatype","variant":"varchar","affinity":"text","args":[{"type":"literal","variant":"decimal","value":"50"}]}}]},{"explain":false,"type":"statement","variant":"insert","into":{"target":{"type":"identifier","variant":"table","name":"Actors"},"columns":[{"type":"identifier","variant":"column","name":"name"}]},"action":"insert","or":null,"result":[{"type":"values","variant":"list","values":[{"type":"literal","variant":"string","value":"Vivien Leigh"}]},{"type":"values","variant":"list","values":[{"type":"literal","variant":"string","value":"Clark Gable"}]},{"type":"values","variant":"list","values":[{"type":"literal","variant":"string","value":"Olivia de Havilland"}]}]},{"explain":false,"type":"statement","variant":"create","format":"table","temporary":false,"target":{"type":"identifier","variant":"table","name":"Movies"},"condition":[],"optimization":[],"definition":[{"type":"definition","variant":"column","name":"id","definition":[{"name":null,"type":"constraint","variant":"primary key","conflict":null,"direction":null,"modififer":null,"autoIncrement":false}],"datatype":{"type":"datatype","variant":"int","affinity":"integer","args":[]}},{"type":"definition","variant":"column","name":"title","definition":[{"name":null,"type":"constraint","variant":"not null","conflict":null},{"name":null,"type":"constraint","variant":"unique","conflict":null}],"datatype":{"type":"datatype","variant":"varchar","affinity":"text","args":[{"type":"literal","variant":"decimal","value":"50"}]}}]},{"explain":false,"type":"statement","variant":"insert","into":{"target":{"type":"identifier","variant":"table","name":"Movies"},"columns":[{"type":"identifier","variant":"column","name":"title"}]},"action":"insert","or":null,"result":[{"type":"values","variant":"list","values":[{"type":"literal","variant":"string","value":"Don Juan"}]},{"type":"values","variant":"list","values":[{"type":"literal","variant":"string","value":"The Lost World"}]},{"type":"values","variant":"list","values":[{"type":"literal","variant":"string","value":"Peter Pan"}]},{"type":"values","variant":"list","values":[{"type":"literal","variant":"string","value":"Robin Hood"}]},{"type":"values","variant":"list","values":[{"type":"literal","variant":"string","value":"Wolfman"}]}]},{"explain":false,"type":"statement","variant":"create","format":"table","temporary":false,"target":{"type":"identifier","variant":"table","name":"Actors_Movies"},"condition":[],"optimization":[],"definition":[{"type":"definition","variant":"column","name":"actor_id","definition":[{"name":null,"variant":"foreign key","type":"constraint","action":null,"defer":null,"target":{"type":"identifier","variant":"table","name":"actors"},"columns":null}],"datatype":{"type":"datatype","variant":"int","affinity":"integer","args":[]}},{"type":"definition","variant":"column","name":"movie_id","definition":[{"name":null,"variant":"foreign key","type":"constraint","action":null,"defer":null,"target":{"type":"identifier","variant":"table","name":"movies"},"columns":null}],"datatype":{"type":"datatype","variant":"int","affinity":"integer","args":[]}}]},{"explain":false,"type":"statement","variant":"insert","into":{"target":{"type":"identifier","variant":"table","name":"Actors_Movies"},"columns":[{"type":"identifier","variant":"column","name":"actor_id"},{"type":"identifier","variant":"column","name":"movie_id"}]},"action":"insert","or":null,"result":[{"type":"values","variant":"list","values":[{"type":"literal","variant":"decimal","value":"2"},{"type":"literal","variant":"decimal","value":"5"}]}]}]}';
    tree.equals(resultTree, this, done);
  });

  // Parse error``

  it('parse error 1', function(done) {
    tree.error({
      'message': 'There is a syntax error near FROM Clause [Table Identifier]'
    }, this, done);
  });

  // SQL comments

  it('comments', function (done) {
    var resultTree = '{"statement":[{"explain":false,"type":"statement","variant":"select","from":[],"where":null,"group":null,"result":[{"type":"literal","variant":"decimal","value":"1","alias":null}],"distinct":false,"all":false,"order":null,"limit":null},{"explain":false,"type":"statement","variant":"select","from":[{"type":"identifier","variant":"table","name":"Rooms","alias":"hat","index":null}],"where":[{"type":"expression","format":"binary","variant":"operation","operation":">","left":{"type":"identifier","variant":"column","name":"seats"},"right":{"type":"literal","variant":"decimal","value":"75"}}],"group":null,"result":[{"type":"identifier","variant":"column","name":"movie_id","alias":null}],"distinct":false,"all":false,"order":null,"limit":null},{"explain":false,"type":"statement","variant":"select","from":[{"type":"identifier","variant":"table","name":"hats","alias":null,"index":null}],"where":null,"group":null,"result":[{"type":"literal","variant":"decimal","value":"2","alias":null}],"distinct":false,"all":false,"order":null,"limit":null}]}';
    tree.equals(resultTree, this, done);
  });

});
