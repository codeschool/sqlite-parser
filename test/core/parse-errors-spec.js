describe('parse errors', function() {

  it('parse error 1', function(done) {
    tree.error({
      'message': 'Expected Block Comment, Line Comment, New Line, Semicolon, Whitespace or end of input.'
    }, this, done);
  });

});
