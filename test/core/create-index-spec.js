describe('create index', function() {

  it('basic create index', function(done) {
    var resultTree = '{"statement":[{"explain":false,"type":"statement","variant":"create","format":"index","target":{"type":"identifier","variant":"index","name":"bees.hive_state"},"where":[{"type":"expression","format":"binary","variant":"operation","operation":">","left":{"type":"identifier","variant":"column","name":"anger"},"right":{"type":"literal","variant":"decimal","value":"0"}}],"on":{"target":"hive","columns":[{"type":"identifier","variant":"column","format":"indexed","direction":"asc","name":"happiness","collate":null},{"type":"identifier","variant":"column","format":"indexed","direction":"desc","name":"anger","collate":null}]},"condition":[],"unique":false}]}';
    tree.equals(resultTree, this, done);
  });

});
