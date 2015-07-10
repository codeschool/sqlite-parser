describe('create virtual table', function() {

  it('basic create virtual table', function(done) {
    var resultTree = '{"statement":[{"explain":false,"type":"statement","variant":"create","format":"virtual","condition":[],"target":{"type":"identifier","variant":"table","name":"happy_table"},"result":{"type":"module","name":"happy_module","args":[{"type":"expression","format":"binary","variant":"operation","operation":"!=","left":{"type":"identifier","variant":"column","name":"some"},"right":{"type":"literal","variant":"string","value":"expression"}},{"type":"literal","variant":"string","value":"just a string"},{"type":"literal","variant":"decimal","value":"33.0"}]}}]}';
    tree.equals(resultTree, this, done);
  });

  it('create virtual table alt syntax', function(done) {
    var resultTree = '{"statement":[{"explain":false,"type":"statement","condition":[],"target":{"type":"identifier","variant":"table","name":"happy_table"},"result":{"type":"module","name":"happy_module","args":[{"type":"definition","variant":"column","name":"id","definition":[{"name":null,"type":"constraint","variant":"primary key","conflict":null,"direction":null,"modififer":null,"autoIncrement":false}],"datatype":{"type":"datatype","variant":"int","affinity":"integer","args":[]}},{"type":"definition","variant":"column","name":"name","definition":[],"datatype":{"type":"datatype","variant":"varchar","affinity":"text","args":[{"type":"literal","variant":"decimal","value":"50"}]}},{"type":"definition","variant":"column","name":"category","definition":[],"datatype":{"type":"datatype","variant":"varchar","affinity":"text","args":[{"type":"literal","variant":"decimal","value":"15"}]}},{"type":"definition","variant":"column","name":"cost","definition":[],"datatype":{"type":"datatype","variant":"int","affinity":"integer","args":[]}}]},"variant":"create","format":"virtual"}]}';
    tree.equals(resultTree, this, done);
  });

});
