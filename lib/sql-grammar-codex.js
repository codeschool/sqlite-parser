var _u = require('./html-parser-util');
/**
 * Defaults for global settings
 * @param {Object} opts User options
 */
function codex(opts) {
  var defs = {
    'settings': {
      'format': 'plain',
      'policy': 'merge'
    }
  };
  var shouldMerge;
  if (!_u.isPlain(opts)) { opts = {}; }
  shouldMerge = (_u.has(opts, 'settings') && _u.has(opts['settings'], 'policy') ?
                  opts['settings']['policy'] :
                  defs['settings']['policy'])  === 'merge';
  // Merge defaults with user options, replace user settings
  [ {
      'type': 'settings',
      'policy': 'replace'
    }
  ].forEach(function (m) {
    // Never merge settings
    var willMerge = ((shouldMerge && m.type !== 'settings') ?
                      shouldMerge :
                      m.policy === 'merge'),
      res = _u.has(opts, m.type) ?
        _u.mergeOptions(defs[m.type], opts[m.type], willMerge) :
        defs[m.type];
    defs[m.type] = m.type !== 'settings' ? _u.desugar(res, res, m.type) : res;
  });
  return defs;
}

module.exports = codex;
