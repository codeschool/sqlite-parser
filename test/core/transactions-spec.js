describe('transactions', function() {

  it('basic transaction', function(done) {
    var resultTree = '{"statement":[{"explain":false,"type":"statement","variant":"transaction","statement":[{"explain":false,"type":"statement","name":{"type":"identifier","variant":"table","name":"foods"},"condition":[],"optimization":[],"definition":[{"type":"definition","variant":"column","name":"id","definition":[{"name":null,"type":"constraint","variant":"primary key","conflict":null,"direction":null,"modififer":null,"autoIncrement":false}],"datatype":{"type":"datatype","variant":"int","affinity":"integer","args":[]}},{"type":"definition","variant":"column","name":"item","definition":[],"datatype":{"type":"datatype","variant":"varchar","affinity":"text","args":[{"type":"literal","variant":"decimal","value":"50"}]}},{"type":"definition","variant":"column","name":"size","definition":[],"datatype":{"type":"datatype","variant":"varchar","affinity":"text","args":[{"type":"literal","variant":"decimal","value":"15"}]}},{"type":"definition","variant":"column","name":"price","definition":[],"datatype":{"type":"datatype","variant":"int","affinity":"integer","args":[]}}],"temporary":false,"variant":"create","format":"table"},{"explain":false,"type":"statement","variant":"insert","into":{"type":"identifier","variant":"expression","format":"table","name":"foods","columns":[{"type":"identifier","variant":"column","name":"item"},{"type":"identifier","variant":"column","name":"size"},{"type":"identifier","variant":"column","name":"id"},{"type":"identifier","variant":"column","name":"price"}]},"action":"insert","or":null,"result":{"type":"statement","variant":"select","from":[{"type":"identifier","variant":"table","name":"bananas","alias":null,"index":null}],"where":[{"type":"expression","format":"binary","variant":"operation","operation":"!=","left":{"type":"identifier","variant":"column","name":"color"},"right":{"type":"literal","variant":"string","value":"red"}}],"group":null,"result":[{"type":"literal","variant":"string","value":"banana","alias":null},{"type":"identifier","variant":"column","name":"size","alias":null},{"type":"literal","variant":"null","value":"null","alias":null},{"type":"identifier","variant":"column","name":"price","alias":null}],"distinct":false,"all":false,"order":null,"limit":null},"with":null}],"defer":"immediate"}]}';
    tree.equals(resultTree, this, done);
  });

  it('transaction rollback', function(done) {
    var resultTree = '{"statement":[{"explain":false,"type":"statement","variant":"rollback","to":{"type":"identifier","variant":"savepoint","name":"super_save"}}]}';
    tree.equals(resultTree, this, done);
  });

  it('transaction misc', function(done) {
    var resultTree = '{"statement":[{"explain":false,"type":"statement","variant":"release","target":{"type":"identifier","variant":"savepoint","name":"happy_place"}},{"explain":false,"type":"statement","variant":"release","target":{"type":"identifier","variant":"savepoint","name":"sad_place"}},{"explain":false,"type":"statement","variant":"savepoint","target":{"type":"identifier","variant":"savepoint","name":"bee_time"}}]}';
    tree.equals(resultTree, this, done);
  });

});
