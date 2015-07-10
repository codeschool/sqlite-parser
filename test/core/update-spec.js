describe('update', function() {

  it('basic update', function(done) {
    var resultTree = '{"statement":[{"explain":false,"type":"statement","variant":"update","with":null,"into":{"type":"identifier","variant":"table","name":"bees","alias":null,"index":null},"where":[{"type":"expression","format":"binary","variant":"operation","operation":"not in","left":{"type":"identifier","variant":"column","name":"name"},"right":{"type":"statement","variant":"select","from":[{"type":"identifier","variant":"table","name":"bee_names","alias":null,"index":null}],"where":[{"type":"expression","format":"binary","variant":"operation","operation":"<","left":{"type":"identifier","variant":"column","name":"size"},"right":{"type":"literal","variant":"decimal","value":"3.14"}}],"group":null,"result":[{"type":"identifier","variant":"column","name":"name","alias":null}],"distinct":false,"all":false,"order":null,"limit":null}}],"set":[{"type":"assignment","target":{"type":"identifier","variant":"column","name":"name"},"value":{"type":"literal","variant":"string","value":"drone"}},{"type":"assignment","target":{"type":"identifier","variant":"column","name":"wings"},"value":{"type":"literal","variant":"decimal","value":"2"}}],"order":null,"limit":null}]}';
    tree.equals(resultTree, this, done);
  });

  it('update limit', function(done) {
    var resultTree = '{"statement":[{"explain":false,"type":"statement","variant":"update","with":null,"into":{"type":"identifier","variant":"table","name":"bees","alias":null,"index":null},"where":[{"type":"expression","format":"binary","variant":"operation","operation":"!=","left":{"type":"identifier","variant":"column","name":"name"},"right":{"type":"literal","variant":"string","value":"nicholas"}}],"set":[{"type":"assignment","target":{"type":"identifier","variant":"column","name":"name"},"value":{"type":"literal","variant":"string","value":"drone"}},{"type":"assignment","target":{"type":"identifier","variant":"column","name":"wings"},"value":{"type":"literal","variant":"decimal","value":"2"}}],"order":null,"limit":{"start":{"type":"literal","variant":"decimal","value":"2"},"offset":{"type":"literal","variant":"decimal","value":"10"}}}]}';
    tree.equals(resultTree, this, done);
  });

});
