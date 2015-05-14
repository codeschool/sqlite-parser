/* Helper Functions */
{
      // Parser utilities
  var _u = require('./sql-parser-util'),
      esc = _u.escape,
      // Codex of tag and attribute names
      codex = require('./sql-grammar-codex')(options);

  // Set error encoding
  _u.setFormat(codex);
}

/* Start Grammar */
start
  = any*

/* Generic rules*/

any "Anything"
  = .

char "Character"
  = [^<>]

e "Enforced Whitespace"
  = _+

s "Optional Whitespace"
  = _*

_ "Whitespace"
  = [ \f\n\r\t\v]
