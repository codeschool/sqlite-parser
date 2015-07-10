describe('uncommon', function() {

  // SQLite-specific and internal

  it('basic sqlite internal', function (done) {
    var resultTree = '{"statement":[{"explain":false,"type":"statement","variant":"detach","target":{"type":"identifier","variant":"database","name":"hat_db"}},{"explain":false,"type":"statement","variant":"detach","target":{"type":"identifier","variant":"database","name":"pants_db"}},{"explain":false,"type":"statement","variant":"reindex","target":"happy_collation"},{"explain":false,"type":"statement","variant":"reindex","target":null},{"explain":false,"type":"statement","variant":"reindex","target":"hat_db.pants_table"},{"explain":false,"type":"statement","variant":"analyze","target":"happy_table"},{"explain":false,"type":"statement","variant":"analyze","target":null},{"explain":false,"type":"statement","variant":"analyze","target":"hat_db.pants_table"},{"explain":false,"type":"statement","variant":"vacuum"}]}';
    tree.equals(resultTree, this, done);
  });

  it('sqlite pragma', function (done) {
    var resultTree = '{"statement":[{"explain":false,"type":"statement","variant":"pragma","target":{"type":"identifier","variant":"pragma","name":"hat.pants"},"args":[{"type":"literal","variant":"string","value":"some string"}]},{"explain":false,"type":"statement","variant":"pragma","target":{"type":"identifier","variant":"pragma","name":"pants.pants"},"args":[{"type":"literal","variant":"decimal","value":"+200.00"}]},{"explain":false,"type":"statement","variant":"pragma","target":{"type":"identifier","variant":"pragma","name":"nap.times"},"args":[]},{"explain":false,"type":"statement","variant":"pragma","target":{"type":"identifier","variant":"pragma","name":"suit"},"args":[{"type":"literal","variant":"boolean","normalized":"0","value":"no"}]}]}';
    tree.equals(resultTree, this, done);
  });

});
