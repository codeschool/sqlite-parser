describe('drop', function() {

  it('basic drop table', function(done) {
    var resultTree = '{"statement":[{"explain":false,"type":"statement","target":{"type":"identifier","variant":"table","name":"beestuff"},"variant":"drop","format":"table","condition":[]}]}';
    tree.equals(resultTree, this, done);
  });

  it('drop table alt syntax', function(done) {
    var resultTree = '{"statement":[{"explain":false,"type":"statement","target":{"type":"identifier","variant":"table","name":"hive.beestuff"},"variant":"drop","format":"table","condition":[{"type":"condition","condition":"if exists"}]}]}';
    tree.equals(resultTree, this, done);
  });

  it('basic drop trigger', function(done) {
    var resultTree = '{"statement":[{"explain":false,"type":"statement","variant":"drop","format":"trigger","target":{"type":"identifier","variant":"trigger","name":"happy.insertRecord"},"condition":[{"type":"condition","condition":"if exists"}]}]}';
    tree.equals(resultTree, this, done);
  });

});
