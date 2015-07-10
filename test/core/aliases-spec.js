describe('aliases', function() {

  it('basic aliases', function(done) {
    var resultTree = '{"statement":[{"explain":false,"type":"statement","variant":"select","from":[{"type":"identifier","variant":"table","name":"bananas","alias":"b","index":null}],"where":null,"group":null,"result":[{"type":"identifier","variant":"column","name":"apple","alias":"The Apple"},{"type":"identifier","variant":"column","name":"pear","alias":"the_pear"},{"type":"identifier","variant":"column","name":"orange","alias":"TheOrange"},{"type":"identifier","variant":"column","name":"pineapple","alias":"wherekeyword"}],"distinct":false,"all":false,"order":null,"limit":null,"with":null}]}';
    tree.equals(resultTree, this, done);
  });

  it('uncommon aliases', function(done) {
    var resultTree = '{"statement":[{"explain":false,"type":"statement","variant":"select","from":[{"type":"identifier","variant":"table","name":"hats","alias":"hat","index":null}],"where":null,"group":null,"result":[{"type":"identifier","variant":"star","name":"hat.*"},{"type":"function","name":"count","distinct":false,"args":[{"type":"identifier","variant":"star","name":"*"}],"alias":"pants"}],"distinct":false,"all":false,"order":null,"limit":null,"with":null}]}';
    tree.equals(resultTree, this, done);
  });

});
