var expect            = require('chai').expect
    tree              = require('./helpers');

describe('sql-query-parser', function() {
  it('basic select', function(done) {
    var resultTree = '{"statement":[{"type":"statement","variant":"select","from":{"type":"join","source":{"type":"identifier","variant":"table","name":"apples","alias":"a","index":null},"join":[{"type":"JOIN","source":{"type":"identifier","variant":"table","name":"bananas","alias":"B","index":null},"on":{"type":"expression","format":"binary","variant":"operation","operation":"=","left":{"type":"identifier","variant":"column","name":"a.bee"},"right":{"type":"identifier","variant":"column","name":"b.bee"},"modifier":null},"using":null}]},"where":[{"type":"expression","format":"binary","variant":"operation","operation":">","left":{"type":"identifier","variant":"column","name":"quantity"},"right":{"type":"literal","variant":"decimal","value":"1"},"modifier":null}],"group":{"expression":[{"type":"identifier","variant":"column","name":"type"}],"having":null},"result":[{"type":"identifier","variant":"column","name":"a.quantity","alias":null},{"type":"function","name":"SUM","distinct":false,"expression":[{"type":"identifier","variant":"column","name":"price"},{"type":"literal","variant":"decimal","value":"1.120"}],"alias":null},{"type":"identifier","variant":"column","name":"type","alias":null},{"type":"literal","variant":"string","value":"string\'s","alias":null}],"modifier":null,"order":null,"limit":null}]}';
    tree.equals(resultTree, this, done);
  });
});
