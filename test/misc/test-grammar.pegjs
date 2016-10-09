/*
 * sqlite-parser test utilities
 * grammar for extracting SQL queries from official SQLite
 * test suite corpus {@link http://www.sqlite.org/src/tree?ci=trunk&name=test}
 */

start
  = t:( test_loop* ) {
    return t
    .filter(function (i) { return i != null; })
    .reduce(function (prev, i) {
      const query = i
      // Fix $::temp -> TEMP
      .replace(/\$\:{2}temp/g, 'TEMP')
      .replace(/\\(.)/g, '$1')
      // This on should eventually be removed when the parser can support tcl
      // variables in any valid position in a statement.
      // Remove TCL variables
      .replace(/\\?\$(?:\{)?\:*([a-z0-9\_]+)(?:\})?/gi, 'sub_$1')
      .trim()
      .replace(/;$/g, '');
      if (query === '' || query.length < 3) {
        return prev;
      }
      return prev.concat(query);
    }, []);
  }

test_loop
  = "#" [^\n]* { return null; }
  / "set sql" [^\n]* { return null; }
  / sym_xopen s "catch" ( !sym_xclose . )+ sym_xclose { return null; }
  / "do_" (!"test" test_name_char)* "test" w "$" [a-z0-9]+ w sym_xopen (!sym_xclose .)+ sym_xclose { return null; }
  / "test_expr" w test_name b:( test_body ) {
    return 'SELECT ' + b;
  }
  / test_types
  / !test_types . { return null; }

test_types
  = s:( test_type_start ) w n:( test_name )? b:( test_body ) {
    return b;
  }
test_type_start
  = "do_execsql_test"
  / "do_eqp_test"
  / "execsql"
  / "eqp"
  /*/ "db complete"*/
  / ( w / "-" ) ( "eval" / "sql1" / "sql2" / "sql3" / "sqlprep" )

test_name
  = test_name_char+ w
test_name_char
  = [a-z0-9\.\-\_]i

test_body
  = sym_xopen (!x_terminators .)* sym_bopen s b:( body_scan ) s sym_bclose (!x_terminators .)* sym_xclose {
    return b;
  }
  / sym_bopen s b:( body_scan ) s sym_bclose {
    return b;
  }
  / '"' b:( quoted_scan ) '"' {
    return b;
  }

x_terminators
  = ( sym_bopen / test_type_start / "proc" )

body_scan
  = s:( body_scan_pat )+ {
    return s.join('');
  }
body_scan_pat
  = !body_scan_forbidden c:( body_scan_char ) {
    return c;
  }
body_scan_char
  = "--"
  / scan_replacements
  / .
// Note: order=desc, tbl(from, to) and prefix= as expressions are just crazy and would require
//       too many parser changes for such unnecessary edge cases.
body_scan_forbidden
  = sym_bclose
  / "{db db}"
  / "$" ( "tcl" / "sql" / "query" )
  / "list"
  / sym_bopen
  / "order" s "="
  / ( "prefix" / "content" ) s "=" s [\)\,]
  / "unicode61"
  / "BOGUS"i
  / [a-z0-9]i+ s "(" s ("to"i / "from"i ) s ( "," / ")" )
  / "e_log"

quoted_scan
  = s:( quoted_scan_pat )+ {
    return s.join('');
  }
quoted_scan_pat
  = !quoted_scan_forbidden c:( quoted_scan_char ) { return c; }
quoted_scan_forbidden
  = "$" ( "::"? quoted_var_forbidden )
  / ".$" // this is a weird one: 0.$i
  / "$" [a-z0-9]i "(" [^\)]* ")"
  / "set sql"
  / [\\] "x" [0-9A-F]+
  / "order" s "="
  / sym_xopen s ("expr" / "join") (!sym_xclose .)+ sym_xclose
  / "string repeat"
  / "EXPLAIN"i s "$q"
quoted_var_forbidden
  = ( "pre" / "delete_" )? "sql"
  / "subselect"
  / "enc"
  / "query"
  / "from"
  / "where"
  / "trig"
  / "vars"
  / "expr"
  / "columns"
quoted_scan_char
  = scan_replacements
  / '\\' e:( '"' / "$" ) { return e; }
  / '\\'* scan_next_line  { return ' '; }
  / [^\"\n]
scan_next_line
  = s [\n] s

scan_replacements
  = "$rowidclause" {
    return "WITHOUT ROWID";
  }
  / "$prep" {
    return '';
  }
  / "%PGSZ%" {
    return '4096';
  }
  / f:( sym_add )+ b:$( ![0-9] . ) {
    return (f.indexOf('-') !== -1 ? '-' : '+') + b;
  }
  / ( "~" s )+ ( "-" s )* {
    return "~";
  }

sym_add
  = a:( "+" / "-" ) s { return a; }
sym_xopen
  = "["
sym_xclose
  = "]"
sym_bopen
  = "{"
sym_bclose
  = "}"

w
  = [ \t\n\r\\]+
s
  = [ \t\n\r\\]*
