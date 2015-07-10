describe('select', function() {

  it('basic select', function(done) {
    var resultTree = '{"statement":[{"explain":false,"type":"statement","variant":"select","with":null,"from":[{"type":"identifier","variant":"table","name":"bananas","alias":null,"index":null}],"where":[{"type":"expression","format":"binary","variant":"operation","operation":"=","left":{"type":"identifier","variant":"column","name":"color"},"right":{"type":"literal","variant":"string","value":"red"}}],"group":null,"result":[{"type":"identifier","variant":"star","name":"*"}],"distinct":false,"all":false,"order":null,"limit":null}]}';
    tree.equals(resultTree, this, done);
  });

  it('select alt syntax', function(done) {
    var resultTree = '{"statement":[{"explain":false,"type":"statement","variant":"select","with":null,"result":[{"type":"values","variant":"list","values":[{"type":"literal","variant":"decimal","value":"1"},{"type":"literal","variant":"decimal","value":"2"},{"type":"literal","variant":"decimal","value":"3"}]},{"type":"values","variant":"list","values":[{"type":"literal","variant":"decimal","value":"4"},{"type":"literal","variant":"decimal","value":"5"},{"type":"literal","variant":"decimal","value":"6"}]}],"from":null,"where":null,"group":null,"order":[{"direction":"desc","expression":{"type":"identifier","variant":"column","name":"ham"},"collate":null}],"limit":null}]}';
    tree.equals(resultTree, this, done);
  });

  it('select parts 1', function(done) {
    var resultTree = '{"statement":[{"explain":false,"type":"statement","variant":"select","from":[{"type":"identifier","variant":"table","name":"hats","alias":"h","index":null}],"where":[{"type":"expression","format":"binary","variant":"operation","operation":"==","left":{"type":"identifier","variant":"column","name":"h.color"},"right":{"type":"literal","variant":"string","value":"red"}}],"group":{"expression":[{"type":"identifier","variant":"column","name":"h.color"},{"type":"identifier","variant":"column","name":"h.material"}],"having":{"type":"expression","format":"binary","variant":"operation","operation":">=","left":{"type":"function","name":"count","distinct":false,"args":[{"type":"identifier","variant":"column","name":"h.quantity"}]},"right":{"type":"literal","variant":"decimal","value":"200"}}},"result":[{"type":"identifier","variant":"star","name":"*"}],"distinct":false,"all":false,"order":[{"direction":"desc","expression":{"type":"identifier","variant":"column","name":"h.color"},"collate":null}],"limit":{"start":{"type":"literal","variant":"decimal","value":"20"},"offset":{"type":"literal","variant":"decimal","value":"10"}},"with":null}]}';
    tree.equals(resultTree, this, done);
  });

  it('select subquery', function(done) {
    var resultTree = '{"statement":[{"explain":false,"type":"statement","variant":"select","from":{"type":"map","variant":"join","source":{"alias":"z","type":"statement","variant":"select","from":[{"type":"identifier","variant":"table","name":"bananas","alias":"b","index":null}],"where":null,"group":null,"result":[{"type":"identifier","variant":"column","name":"b.color","alias":null}],"distinct":false,"all":false,"order":null,"limit":null},"map":[{"type":"join","variant":"join","source":{"type":"identifier","variant":"table","name":"apples","alias":"a","index":null},"constraint":{"type":"constraint","variant":"join","format":"on","on":{"type":"expression","format":"binary","variant":"operation","operation":"=","left":{"type":"identifier","variant":"column","name":"a.color"},"right":{"type":"identifier","variant":"column","name":"b.color"}}}}]},"where":null,"group":null,"result":[{"type":"identifier","variant":"column","name":"a.color","alias":null}],"distinct":false,"all":false,"order":null,"limit":null,"with":null}]}';
    tree.equals(resultTree, this, done);
  });

  it('select union', function(done) {
    var resultTree = '{"statement":[{"explain":false,"type":"statement","variant":"compound","with":null,"statement":{"type":"statement","variant":"select","from":[{"type":"identifier","variant":"table","name":"a","alias":null,"index":null}],"where":null,"group":null,"result":[{"type":"identifier","variant":"star","name":"*"}],"distinct":false,"all":false},"compound":[{"type":"compound","variant":"union","statement":{"type":"statement","variant":"select","from":[{"type":"identifier","variant":"table","name":"b","alias":null,"index":null}],"where":null,"group":null,"result":[{"type":"identifier","variant":"star","name":"*"}],"distinct":false,"all":false}}],"order":null,"limit":null}]}';
    tree.equals(resultTree, this, done);
  });

  it('select qualified table 1', function(done) {
    var resultTree = '{"statement":[{"explain":false,"type":"statement","variant":"select","with":null,"from":[{"type":"identifier","variant":"table","name":"bees","alias":"b","index":"bees_index"}],"where":null,"group":null,"result":[{"type":"identifier","variant":"star","name":"*"}],"distinct":false,"all":false,"order":null,"limit":null}]}';
    tree.equals(resultTree, this, done);
  });

});
