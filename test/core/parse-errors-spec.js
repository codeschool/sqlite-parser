describe('parse errors', function() {

  it('parse error 1', function(done) {
    tree.error({
      'message': 'Syntax error found near Column Identifier (WHERE Clause)'
    }, this, done);
  });

});
