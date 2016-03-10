describe('parse errors', function() {

  it('parse error 1', function(done) {
    tree.error({
      'message': 'Expected Semicolon or end of input.'
    }, this, done);
  });

});
