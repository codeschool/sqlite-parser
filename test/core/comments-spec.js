describe('comments', function() {

  it('basic comments', function (done) {
    var resultTree = '{"statement":[{"explain":false,"type":"statement","variant":"select","from":[],"where":null,"group":null,"result":[{"type":"literal","variant":"decimal","value":"1","alias":null}],"distinct":false,"all":false,"order":null,"limit":null,"with":null},{"explain":false,"type":"statement","variant":"select","from":[{"type":"identifier","variant":"table","name":"rooms","alias":"hat","index":null}],"where":[{"type":"expression","format":"binary","variant":"operation","operation":">","left":{"type":"identifier","variant":"column","name":"seats"},"right":{"type":"literal","variant":"decimal","value":"75"}}],"group":null,"result":[{"type":"identifier","variant":"column","name":"movie_id","alias":null}],"distinct":false,"all":false,"order":null,"limit":null,"with":null},{"explain":false,"type":"statement","variant":"select","from":[{"type":"identifier","variant":"table","name":"hats","alias":null,"index":null}],"where":null,"group":null,"result":[{"type":"literal","variant":"decimal","value":"2","alias":null}],"distinct":false,"all":false,"order":null,"limit":null,"with":null}]}';
    tree.equals(resultTree, this, done);
  });

});
