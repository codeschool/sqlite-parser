describe('delete', function() {

  it('basic delete', function(done) {
    var resultTree = '{"statement":[{"explain":false,"type":"statement","variant":"delete","with":null,"from":{"type":"identifier","variant":"table","name":"bees","alias":null,"index":null},"where":[{"type":"expression","format":"binary","variant":"operation","operation":"or","left":{"type":"expression","format":"binary","variant":"operation","operation":"=","left":{"type":"identifier","variant":"column","name":"status"},"right":{"type":"literal","variant":"string","value":"stung"}},"right":{"type":"expression","format":"binary","variant":"operation","operation":"=","left":{"type":"identifier","variant":"column","name":"status"},"right":{"type":"literal","variant":"string","value":"eaten"}}}],"order":null,"limit":null}]}';
    tree.equals(resultTree, this, done);
  });

  it('delete limit', function(done) {
    var resultTree = '{"statement":[{"explain":false,"type":"statement","variant":"delete","with":null,"from":{"type":"identifier","variant":"table","name":"bees","alias":null,"index":null},"where":[{"type":"expression","format":"binary","variant":"operation","operation":"or","left":{"type":"expression","format":"binary","variant":"operation","operation":"=","left":{"type":"identifier","variant":"column","name":"status"},"right":{"type":"literal","variant":"string","value":"stung"}},"right":{"type":"expression","format":"binary","variant":"operation","operation":"=","left":{"type":"identifier","variant":"column","name":"status"},"right":{"type":"literal","variant":"string","value":"eaten"}}}],"order":null,"limit":{"start":{"type":"literal","variant":"decimal","value":"10"},"offset":{"type":"literal","variant":"decimal","value":"5"}}}]}';
    tree.equals(resultTree, this, done);
  });

});
