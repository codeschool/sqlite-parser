var tree              = require('./helpers'),
    chai              = require('chai'),
    chaiAsPromised    = require('chai-as-promised'),
    expect;

chai.use(chaiAsPromised);
expect = chai.expect;

describe('sql-query-parser', function() {

  // Aliases

  it('aliases', function(done) {
    var resultTree = '{"statement":[{"modifier":null,"type":"statement","variant":"select","from":[{"type":"identifier","variant":"table","name":"bananas","alias":"b","index":null}],"where":null,"group":null,"result":[{"type":"identifier","variant":"column","name":"apple","alias":"The Apple"},{"type":"identifier","variant":"column","name":"pear","alias":"The_Pear"},{"type":"identifier","variant":"column","name":"orange","alias":"TheOrange"},{"type":"identifier","variant":"column","name":"pineapple","alias":"whereKeyword"}],"distinct":false,"all":false,"order":null,"limit":null}]}';
    tree.equals(resultTree, this, done);
  });

  // Expressions

  it('binary case', function(done) {
    var resultTree = '{"statement":[{"modifier":null,"type":"statement","variant":"select","from":[{"type":"identifier","variant":"table","name":"bees","alias":null,"index":null}],"where":null,"group":null,"result":[{"type":"expression","format":"binary","variant":"case","case":null,"expression":[{"type":"condition","format":"when","condition":{"type":"expression","format":"binary","variant":"operation","operation":"=","left":{"type":"identifier","variant":"column","name":"bee"},"right":{"type":"literal","variant":"string","value":"red"},"modifier":null},"expression":{"type":"literal","variant":"string","value":"ANGRY"},"modifier":null},{"type":"condition","format":"when","condition":{"type":"expression","format":"binary","variant":"operation","operation":"=","left":{"type":"identifier","variant":"column","name":"bee"},"right":{"type":"literal","variant":"string","value":"green"},"modifier":null},"expression":{"type":"literal","variant":"string","value":"HAPPY"},"modifier":null},{"type":"condition","format":"else","expression":{"type":"literal","variant":"string","value":"NEUTRAL"},"modifier":null}],"modifier":null,"alias":"BeeState"}],"distinct":false,"all":false,"order":null,"limit":null}]}';
    tree.equals(resultTree, this, done);
  });

  it('binary cast', function(done) {
    var resultTree = '{"statement":[{"modifier":null,"type":"statement","variant":"select","from":[{"type":"identifier","variant":"table","name":"bees","alias":null,"index":null}],"where":null,"group":null,"result":[{"type":"expression","format":"unary","variant":"cast","expression":{"type":"literal","variant":"decimal","value":"430.120"},"modifier":{"type":"datatype","format":"varchar","affinity":"text","args":[{"type":"literal","variant":"decimal","value":"20"}]},"alias":null}],"distinct":false,"all":false,"order":null,"limit":null}]}';
    tree.equals(resultTree, this, done);
  });

  // SELECT statement

  it('basic select', function(done) {
    var resultTree = '{"statement":[{"modifier":null,"type":"statement","variant":"select","from":[{"type":"identifier","variant":"table","name":"bananas","alias":null,"index":null}],"where":[{"type":"expression","format":"binary","variant":"operation","operation":"=","left":{"type":"identifier","variant":"column","name":"color"},"right":{"type":"literal","variant":"string","value":"red"},"modifier":null}],"group":null,"result":[{"type":"identifier","variant":"star","name":"*"}],"distinct":false,"all":false,"order":null,"limit":null}]}';
    tree.equals(resultTree, this, done);
  });

  it('select alt syntax', function(done) {
    var resultTree = '{"statement":[{"modifier":null,"type":"statement","variant":"select","result":[{"type":"statement","variant":"values","values":[{"type":"literal","variant":"decimal","value":"1"},{"type":"literal","variant":"decimal","value":"2"},{"type":"literal","variant":"decimal","value":"3"}]},{"type":"statement","variant":"values","values":[{"type":"literal","variant":"decimal","value":"4"},{"type":"literal","variant":"decimal","value":"5"},{"type":"literal","variant":"decimal","value":"6"}]}],"from":null,"where":null,"group":null,"order":[{"direction":"DESC","expression":{"type":"identifier","variant":"column","name":"ham"},"collate":null}],"limit":null}]}';
    tree.equals(resultTree, this, done);
  });

  // UPDATE Statement

  it('basic update', function(done) {
    var resultTree = '{"statement":[{"modifier":null,"type":"statement","variant":"update","into":{"type":"identifier","variant":"table","name":"bees","alias":null,"index":null},"where":[{"type":"expression","format":"binary","variant":"operation","operation":"not in","left":{"type":"identifier","variant":"column","name":"name"},"right":{"type":"statement","variant":"select","from":[{"type":"identifier","variant":"table","name":"bee_names","alias":null,"index":null}],"where":[{"type":"expression","format":"binary","variant":"operation","operation":"<","left":{"type":"identifier","variant":"column","name":"size"},"right":{"type":"literal","variant":"decimal","value":"3.14"},"modifier":null}],"group":null,"result":[{"type":"identifier","variant":"column","name":"name","alias":null}],"distinct":false,"all":false,"order":null,"limit":null},"modifier":null}],"set":[{"type":"assignment","target":{"type":"identifier","variant":"column","name":"name"},"value":{"type":"literal","variant":"string","value":"drone"}},{"type":"assignment","target":{"type":"identifier","variant":"column","name":"wings"},"value":{"type":"literal","variant":"decimal","value":"2"}}],"order":null,"limit":null}]}';
    tree.equals(resultTree, this, done);
  });

  it('update limit', function(done) {
    var resultTree = '{"statement":[{"modifier":null,"type":"statement","variant":"update","into":{"type":"identifier","variant":"table","name":"bees","alias":null,"index":null},"where":[{"type":"expression","format":"binary","variant":"operation","operation":"!=","left":{"type":"identifier","variant":"column","name":"name"},"right":{"type":"literal","variant":"string","value":"nicholas"},"modifier":null}],"set":[{"type":"assignment","target":{"type":"identifier","variant":"column","name":"name"},"value":{"type":"literal","variant":"string","value":"drone"}},{"type":"assignment","target":{"type":"identifier","variant":"column","name":"wings"},"value":{"type":"literal","variant":"decimal","value":"2"}}],"order":null,"limit":{"start":{"type":"literal","variant":"decimal","value":"2"},"offset":{"type":"literal","variant":"decimal","value":"10"}}}]}';
    tree.equals(resultTree, this, done);
  });

  // DELETE Statement

  it('basic delete', function(done) {
    var resultTree = '{"statement":[{"type":"statement","variant":"delete","from":{"type":"identifier","variant":"table","name":"bees","alias":null,"index":null},"where":[{"type":"expression","format":"binary","variant":"operation","operation":"or","left":{"type":"expression","format":"binary","variant":"operation","operation":"=","left":{"type":"identifier","variant":"column","name":"status"},"right":{"type":"literal","variant":"string","value":"stung"},"modifier":null},"right":{"type":"expression","format":"binary","variant":"operation","operation":"=","left":{"type":"identifier","variant":"column","name":"status"},"right":{"type":"literal","variant":"string","value":"eaten"},"modifier":null},"modifier":null}],"modifier":null,"order":null,"limit":null}]}';
    tree.equals(resultTree, this, done);
  });

  it('delete limit', function(done) {
    var resultTree = '{"statement":[{"type":"statement","variant":"delete","from":{"type":"identifier","variant":"table","name":"bees","alias":null,"index":null},"where":[{"type":"expression","format":"binary","variant":"operation","operation":"or","left":{"type":"expression","format":"binary","variant":"operation","operation":"=","left":{"type":"identifier","variant":"column","name":"status"},"right":{"type":"literal","variant":"string","value":"stung"},"modifier":null},"right":{"type":"expression","format":"binary","variant":"operation","operation":"=","left":{"type":"identifier","variant":"column","name":"status"},"right":{"type":"literal","variant":"string","value":"eaten"},"modifier":null},"modifier":null}],"modifier":null,"order":null,"limit":{"start":{"type":"literal","variant":"decimal","value":"10"},"offset":{"type":"literal","variant":"decimal","value":"5"}}}]}';
    tree.equals(resultTree, this, done);
  });

  // INSERT Statement

  it('basic insert', function(done) {
    var resultTree = '{"statement":[{"type":"statement","variant":"insert","into":{"target":{"type":"identifier","variant":"table","name":"concessions"},"columns":[{"type":"identifier","variant":"column","name":"item"},{"type":"identifier","variant":"column","name":"size"},{"type":"identifier","variant":"column","name":"id"},{"type":"identifier","variant":"column","name":"price"}]},"action":"insert","modifier":null,"or":null,"result":[{"type":"statement","variant":"values","values":[{"type":"literal","variant":"string","value":"Nachos"},{"type":"literal","variant":"string","value":"Regular"},{"type":"literal","variant":"null","value":"null"},{"type":"literal","variant":"null","value":"null"}]},{"type":"statement","variant":"values","values":[{"type":"literal","variant":"string","value":"Pizza"},{"type":"literal","variant":"null","value":"null"},{"type":"literal","variant":"decimal","value":"8"},{"type":"literal","variant":"decimal","value":"2.00"}]}]}]}';
    tree.equals(resultTree, this, done);
  });

  it('insert into select', function(done) {
    var resultTree = '{"statement":[{"type":"statement","variant":"insert","into":{"target":{"type":"identifier","variant":"table","name":"foods"},"columns":[{"type":"identifier","variant":"column","name":"item"},{"type":"identifier","variant":"column","name":"size"},{"type":"identifier","variant":"column","name":"id"},{"type":"identifier","variant":"column","name":"price"}]},"action":"insert","modifier":null,"or":null,"result":{"type":"statement","variant":"select","from":[{"type":"identifier","variant":"table","name":"bananas","alias":null,"index":null}],"where":[{"type":"expression","format":"binary","variant":"operation","operation":"!=","left":{"type":"identifier","variant":"column","name":"color"},"right":{"type":"literal","variant":"string","value":"red"},"modifier":null}],"group":null,"result":[{"type":"literal","variant":"string","value":"banana","alias":null},{"type":"identifier","variant":"column","name":"size","alias":null},{"type":"literal","variant":"null","value":"null","alias":null},{"type":"identifier","variant":"column","name":"price","alias":null}],"distinct":false,"all":false,"order":null,"limit":null}}]}';
    tree.equals(resultTree, this, done);
  });

  // CREATE statement

  it('basic create', function(done) {
    var resultTree = '{"statement":[{"type":"statement","variant":"create","modifier":null,"format":"table","temporary":false,"target":{"type":"identifier","variant":"table","name":"advertisements"},"condition":null,"modifier":null,"definition":[{"type":"definition","variant":"column","name":"id","definition":[{"name":null,"type":"constraint","variant":"primary key","conflict":null,"direction":null,"modififer":null,"autoIncrement":false}],"datatype":{"type":"datatype","format":"int","affinity":"integer","args":[]}},{"type":"definition","variant":"column","name":"name","definition":[],"datatype":{"type":"datatype","format":"varchar","affinity":"text","args":[{"type":"literal","variant":"decimal","value":"50"}]}},{"type":"definition","variant":"column","name":"category","definition":[],"datatype":{"type":"datatype","format":"varchar","affinity":"text","args":[{"type":"literal","variant":"decimal","value":"15"}]}},{"type":"definition","variant":"column","name":"cost","definition":[],"datatype":{"type":"datatype","format":"int","affinity":"integer","args":[]}}]}]}';
    tree.equals(resultTree, this, done);
  });

  it('binary concatenation', function(done) {
    var resultTree = '{"statement":[{"type":"statement","variant":"select","from":[{"type":"identifier","variant":"table","name":"bananas","alias":null,"index":null}],"where":[{"type":"expression","format":"binary","variant":"operation","operation":"and","left":{"type":"expression","format":"binary","variant":"operation","operation":"!=","left":{"type":"literal","variant":"decimal","value":"1"},"right":{"type":"literal","variant":"decimal","value":"2"},"modifier":null},"right":{"type":"expression","format":"binary","variant":"operation","operation":"or","left":{"type":"expression","format":"binary","variant":"operation","operation":"!=","left":{"type":"identifier","variant":"column","name":"color"},"right":{"type":"literal","variant":"string","value":"blue"},"modifier":null},"right":{"type":"expression","format":"binary","variant":"operation","operation":"==","left":{"type":"identifier","variant":"column","name":"pees"},"right":{"type":"identifier","variant":"column","name":"crackers"},"modifier":null},"modifier":null},"modifier":null}],"group":null,"result":[{"type":"identifier","variant":"star","name":"*"}],"distinct":false,"all":false,"order":null,"modifier":null,"limit":null}]}';
    tree.equals(resultTree, this, done);
  });

  // DROP statement

  it('basic drop', function(done) {
    var resultTree = '{"statement":[{"type":"statement","variant":"drop","modifier":null,"format":"table","target":{"type":"identifier","variant":"table","name":"beeStuff"},"condition":null}]}';
    tree.equals(resultTree, this, done);
  });

  it('drop alt syntax', function(done) {
    var resultTree = '{"statement":[{"type":"statement","variant":"drop","modifier":null,"format":"table","target":{"type":"identifier","variant":"table","name":"hive.beeStuff"},"condition":"if exists"}]}';
    tree.equals(resultTree, this, done);
  });

  // Transaction

  it('basic transaction', function(done) {
    var resultTree = '{"statement":[{"modifier":"immediate","type":"statement","variant":"transaction","statement":[{"modifier":null,"type":"statement","variant":"create","format":"table","temporary":false,"target":{"type":"identifier","variant":"table","name":"foods"},"condition":null,"definition":[{"type":"definition","variant":"column","name":"id","definition":[{"name":null,"type":"constraint","variant":"primary key","conflict":null,"direction":null,"modififer":null,"autoIncrement":false}],"datatype":{"type":"datatype","format":"int","affinity":"integer","args":[]}},{"type":"definition","variant":"column","name":"item","definition":[],"datatype":{"type":"datatype","format":"varchar","affinity":"text","args":[{"type":"literal","variant":"decimal","value":"50"}]}},{"type":"definition","variant":"column","name":"size","definition":[],"datatype":{"type":"datatype","format":"varchar","affinity":"text","args":[{"type":"literal","variant":"decimal","value":"15"}]}},{"type":"definition","variant":"column","name":"price","definition":[],"datatype":{"type":"datatype","format":"int","affinity":"integer","args":[]}}]},{"modifier":null,"type":"statement","variant":"insert","into":{"target":{"type":"identifier","variant":"table","name":"foods"},"columns":[{"type":"identifier","variant":"column","name":"item"},{"type":"identifier","variant":"column","name":"size"},{"type":"identifier","variant":"column","name":"id"},{"type":"identifier","variant":"column","name":"price"}]},"action":"insert","or":null,"result":{"type":"statement","variant":"select","from":[{"type":"identifier","variant":"table","name":"bananas","alias":null,"index":null}],"where":[{"type":"expression","format":"binary","variant":"operation","operation":"!=","left":{"type":"identifier","variant":"column","name":"color"},"right":{"type":"literal","variant":"string","value":"red"},"modifier":null}],"group":null,"result":[{"type":"literal","variant":"string","value":"banana","alias":null},{"type":"identifier","variant":"column","name":"size","alias":null},{"type":"literal","variant":"null","value":"null","alias":null},{"type":"identifier","variant":"column","name":"price","alias":null}],"distinct":false,"all":false,"order":null,"limit":null}}]}]}';
    tree.equals(resultTree, this, done);
  });

  // Full-featured tests

  it('full featured 1', function(done) {
    var resultTree = '{"statement":[{"type":"statement","variant":"create","format":"table","temporary":false,"target":{"type":"identifier","variant":"table","name":"Actors"},"condition":null,"modifier":null,"definition":[{"type":"definition","variant":"column","name":"name","definition":[],"datatype":{"type":"datatype","format":"varchar","affinity":"text","args":[{"type":"literal","variant":"decimal","value":"50"}]}},{"type":"definition","variant":"column","name":"country","definition":[],"datatype":{"type":"datatype","format":"varchar","affinity":"text","args":[{"type":"literal","variant":"decimal","value":"50"}]}},{"type":"definition","variant":"column","name":"salary","definition":[],"datatype":{"type":"datatype","format":"integer","affinity":"integer","args":[]}}]},{"type":"statement","variant":"insert","into":{"target":{"type":"identifier","variant":"table","name":"Actors"},"columns":[{"type":"identifier","variant":"column","name":"name"},{"type":"identifier","variant":"column","name":"country"},{"type":"identifier","variant":"column","name":"salary"}]},"action":"insert","modifier":null,"or":null,"result":[{"type":"statement","variant":"values","values":[{"type":"literal","variant":"string","value":"Vivien Leigh"},{"type":"literal","variant":"string","value":"IN"},{"type":"literal","variant":"decimal","value":"150000"}]},{"type":"statement","variant":"values","values":[{"type":"literal","variant":"string","value":"Clark Gable"},{"type":"literal","variant":"string","value":"USA"},{"type":"literal","variant":"decimal","value":"120000"}]},{"type":"statement","variant":"values","values":[{"type":"literal","variant":"string","value":"Olivia de Havilland"},{"type":"literal","variant":"string","value":"Japan"},{"type":"literal","variant":"decimal","value":"30000"}]},{"type":"statement","variant":"values","values":[{"type":"literal","variant":"string","value":"Hattie McDaniel"},{"type":"literal","variant":"string","value":"USA"},{"type":"literal","variant":"decimal","value":"45000"}]}]},{"type":"statement","variant":"select","from":[{"type":"identifier","variant":"table","name":"Actors","alias":null,"index":null}],"where":null,"group":null,"result":[{"type":"function","name":"MIN","distinct":false,"args":[{"type":"identifier","variant":"column","name":"salary"}],"alias":"MinSalary"},{"type":"function","name":"MAX","distinct":false,"args":[{"type":"identifier","variant":"column","name":"salary"}],"alias":"MaxSalary"}],"distinct":false,"all":false,"modifier":null,"order":null,"limit":null}]}';
    tree.equals(resultTree, this, done);
  });

  it('full featured 2', function(done) {
    var resultTree = '{"statement":[{"type":"statement","variant":"create","format":"table","temporary":false,"target":{"type":"identifier","variant":"table","name":"Actors"},"condition":null,"modifier":null,"definition":[{"type":"definition","variant":"column","name":"id","definition":[{"name":null,"type":"constraint","variant":"primary key","conflict":null,"direction":null,"modififer":null,"autoIncrement":false}],"datatype":{"type":"datatype","format":"int","affinity":"integer","args":[]}},{"type":"definition","variant":"column","name":"name","definition":[{"name":null,"type":"constraint","variant":"not null","conflict":null},{"name":null,"type":"constraint","variant":"unique","conflict":null}],"datatype":{"type":"datatype","format":"varchar","affinity":"text","args":[{"type":"literal","variant":"decimal","value":"50"}]}}]},{"type":"statement","variant":"insert","into":{"target":{"type":"identifier","variant":"table","name":"Actors"},"columns":[{"type":"identifier","variant":"column","name":"name"}]},"action":"insert","modifier":null,"or":null,"result":[{"type":"statement","variant":"values","values":[{"type":"literal","variant":"string","value":"Vivien Leigh"}]},{"type":"statement","variant":"values","values":[{"type":"literal","variant":"string","value":"Clark Gable"}]},{"type":"statement","variant":"values","values":[{"type":"literal","variant":"string","value":"Olivia de Havilland"}]}]},{"type":"statement","variant":"create","format":"table","temporary":false,"target":{"type":"identifier","variant":"table","name":"Movies"},"condition":null,"modifier":null,"definition":[{"type":"definition","variant":"column","name":"id","definition":[{"name":null,"type":"constraint","variant":"primary key","conflict":null,"direction":null,"modififer":null,"autoIncrement":false}],"datatype":{"type":"datatype","format":"int","affinity":"integer","args":[]}},{"type":"definition","variant":"column","name":"title","definition":[{"name":null,"type":"constraint","variant":"not null","conflict":null},{"name":null,"type":"constraint","variant":"unique","conflict":null}],"datatype":{"type":"datatype","format":"varchar","affinity":"text","args":[{"type":"literal","variant":"decimal","value":"50"}]}}]},{"type":"statement","variant":"insert","into":{"target":{"type":"identifier","variant":"table","name":"Movies"},"columns":[{"type":"identifier","variant":"column","name":"title"}]},"action":"insert","modifier":null,"or":null,"result":[{"type":"statement","variant":"values","values":[{"type":"literal","variant":"string","value":"Don Juan"}]},{"type":"statement","variant":"values","values":[{"type":"literal","variant":"string","value":"The Lost World"}]},{"type":"statement","variant":"values","values":[{"type":"literal","variant":"string","value":"Peter Pan"}]},{"type":"statement","variant":"values","values":[{"type":"literal","variant":"string","value":"Robin Hood"}]},{"type":"statement","variant":"values","values":[{"type":"literal","variant":"string","value":"Wolfman"}]}]},{"type":"statement","variant":"create","format":"table","temporary":false,"target":{"type":"identifier","variant":"table","name":"Actors_Movies"},"condition":null,"modifier":null,"definition":[{"type":"definition","variant":"column","name":"actor_id","definition":[{"name":null,"variant":"foreign key","type":"constraint","action":null,"deferrable":null,"target":{"type":"identifier","variant":"table","name":"actors"},"columns":null}],"datatype":{"type":"datatype","format":"int","affinity":"integer","args":[]}},{"type":"definition","variant":"column","name":"movie_id","definition":[{"name":null,"variant":"foreign key","type":"constraint","action":null,"deferrable":null,"target":{"type":"identifier","variant":"table","name":"movies"},"columns":null}],"datatype":{"type":"datatype","format":"int","affinity":"integer","args":[]}}]},{"type":"statement","variant":"insert","into":{"target":{"type":"identifier","variant":"table","name":"Actors_Movies"},"columns":[{"type":"identifier","variant":"column","name":"actor_id"},{"type":"identifier","variant":"column","name":"movie_id"}]},"action":"insert","modifier":null,"or":null,"result":[{"type":"statement","variant":"values","values":[{"type":"literal","variant":"decimal","value":"2"},{"type":"literal","variant":"decimal","value":"5"}]}]}]}';
    tree.equals(resultTree, this, done);
  });

});

describe('sql-tree', function() {

  var resultTree, Tree;

  before(function() {
    resultTree  = '{"statement":[{"modifier":null,"type":"statement","variant":"select","from":[{"type":"identifier","variant":"table","name":"bananas","alias":null,"index":null}],"where":[{"type":"expression","format":"binary","variant":"operation","operation":"=","left":{"type":"identifier","variant":"column","name":"color"},"right":{"type":"literal","variant":"string","value":"red"},"modifier":null}],"group":null,"result":[{"type":"identifier","variant":"star","name":"*"}],"distinct":false,"all":false,"order":null,"limit":null}]}',
    Tree        = require('../lib/sql-tree');
  });

  it('creates a tree navigator', function() {
    expect(Tree(resultTree)).to.eventually.be.instanceof(Array);
  });

  it('navigates a tree using statement()', function() {
    var ast = Tree(resultTree)
    .then(Tree.statement('select'));

    expect(ast).to.eventually.include.keys('where');
  });

  it('navigates a tree using clause()', function() {
    var ast = Tree(resultTree)
    .then(Tree.statement('select'))
    .then(Tree.clause('where'));

    expect(ast).to.eventually.have.length.of.at.least(1);
  });

  it('navigates a tree using has()', function() {
    var ast = Tree(resultTree)
    .then(Tree.statement('select'))
    .then(Tree.clause('where'))
    .then(Tree.has({
      'type': 'expression',
      'format': 'binary'
    }));

    expect(ast).to.eventually.be.true;
  });

  it('navigates a tree using eachOf()', function() {
    var ast = Tree(resultTree)
    .then(Tree.statement('select'))
    .then(Tree.clause('where'))
    .then(Tree.any({
      'type': 'expression',
      'format': 'binary'
    }))
    .then(Tree.eachOf(['identifier', 'literal']));

    expect(ast).to.eventually.be.true;
  });

});
