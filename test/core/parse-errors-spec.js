import * as tree from '../helpers';

describe('parse errors', function() {

  it('parse error 1', function(done) {
    tree.error({
      'message': 'Syntax error found near Identifier (WHERE Clause)'
    }, this, done);
  });

});
