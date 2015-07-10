describe('create view', function() {

  it('basic create view', function(done) {
    var resultTree = '{"statement":[{"explain":false,"type":"statement","condition":[],"target":{"type":"identifier","variant":"view","name":"happy.bananaview"},"result":{"type":"statement","variant":"select","from":[{"type":"identifier","variant":"table","name":"bananas","alias":null,"index":null}],"where":[{"type":"expression","format":"binary","variant":"operation","operation":"=","left":{"type":"identifier","variant":"column","name":"color"},"right":{"type":"literal","variant":"string","value":"red"}}],"group":null,"result":[{"type":"identifier","variant":"column","name":"type","alias":null},{"type":"identifier","variant":"column","name":"name","alias":null},{"type":"identifier","variant":"column","name":"origin","alias":null}],"distinct":false,"all":false,"order":null,"limit":null},"temporary":false,"variant":"create","format":"view"}]}';
    tree.equals(resultTree, this, done);
  });

});
