describe('insert', function() {

  it('basic insert', function(done) {
    var resultTree = '{"statement":[{"explain":false,"type":"statement","variant":"insert","into":{"type":"identifier","variant":"expression","format":"table","name":"concessions","columns":[{"type":"identifier","variant":"column","name":"item"},{"type":"identifier","variant":"column","name":"size"},{"type":"identifier","variant":"column","name":"id"},{"type":"identifier","variant":"column","name":"price"}]},"action":"insert","or":null,"result":[{"type":"values","variant":"list","values":[{"type":"literal","variant":"string","value":"Nachos"},{"type":"literal","variant":"string","value":"Regular"},{"type":"literal","variant":"null","value":"null"},{"type":"literal","variant":"null","value":"null"}]},{"type":"values","variant":"list","values":[{"type":"literal","variant":"string","value":"Pizza"},{"type":"literal","variant":"null","value":"null"},{"type":"literal","variant":"decimal","value":"8"},{"type":"literal","variant":"decimal","value":"2.00"}]}],"with":null}]}';
    tree.equals(resultTree, this, done);
  });

  it('insert into select', function(done) {
    var resultTree = '{"statement":[{"explain":false,"type":"statement","variant":"insert","into":{"type":"identifier","variant":"expression","format":"table","name":"foods","columns":[{"type":"identifier","variant":"column","name":"item"},{"type":"identifier","variant":"column","name":"size"},{"type":"identifier","variant":"column","name":"id"},{"type":"identifier","variant":"column","name":"price"}]},"action":"insert","or":null,"result":{"type":"statement","variant":"select","from":[{"type":"identifier","variant":"table","name":"bananas","alias":null,"index":null}],"where":[{"type":"expression","format":"binary","variant":"operation","operation":"!=","left":{"type":"identifier","variant":"column","name":"color"},"right":{"type":"literal","variant":"string","value":"red"}}],"group":null,"result":[{"type":"literal","variant":"string","value":"banana","alias":null},{"type":"identifier","variant":"column","name":"size","alias":null},{"type":"literal","variant":"null","value":"null","alias":null},{"type":"identifier","variant":"column","name":"price","alias":null}],"distinct":false,"all":false,"order":null,"limit":null},"with":null}]}';
    tree.equals(resultTree, this, done);
  });

  it('insert into default', function(done) {
    var resultTree = '{"statement":[{"explain":false,"type":"statement","variant":"insert","into":{"type":"identifier","variant":"expression","format":"table","name":"apples","columns":[{"type":"identifier","variant":"column","name":"a"},{"type":"identifier","variant":"column","name":"b"},{"type":"identifier","variant":"column","name":"c"}]},"action":"insert","or":null,"result":{"type":"values","variant":"default","values":null},"with":null}]}';
    tree.equals(resultTree, this, done);
  });

});
