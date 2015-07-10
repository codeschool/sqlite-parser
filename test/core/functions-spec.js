describe('functions', function() {

  it('basic function', function(done) {
    var resultTree = '{"statement":[{"explain":false,"type":"statement","variant":"select","from":[{"type":"identifier","variant":"table","name":"apples","alias":null,"index":null}],"where":null,"group":null,"result":[{"type":"function","name":"count","distinct":false,"args":[{"type":"identifier","variant":"star","name":"*"}],"alias":null},{"type":"function","name":"max","distinct":false,"args":[{"type":"identifier","variant":"column","name":"price"}],"alias":null}],"distinct":false,"all":false,"order":null,"limit":null,"with":null}]}';
    tree.equals(resultTree, this, done);
  });

  it('function mixed args', function(done) {
    var resultTree = '{"statement":[{"explain":false,"type":"statement","variant":"select","from":[],"where":null,"group":null,"result":[{"type":"function","name":"myfunc","distinct":false,"args":[{"type":"identifier","variant":"column","name":"col"},{"type":"literal","variant":"decimal","value":"1.2"},{"type":"literal","variant":"string","value":"str"}],"alias":"Super Func"}],"distinct":false,"all":false,"order":null,"limit":null,"with":null}]}';
    tree.equals(resultTree, this, done);
  });

});
