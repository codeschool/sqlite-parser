-- original: regexp1.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

CREATE TABLE t1(x INTEGER PRIMARY KEY, y TEXT);
    INSERT INTO t1 VALUES(1, 'For since by man came death,');
    INSERT INTO t1 VALUES(2, 'by man came also the resurrection of the dead.');
    INSERT INTO t1 VALUES(3, 'For as in Adam all die,');
    INSERT INTO t1 VALUES(4, 'even so in Christ shall all be made alive.');

    SELECT x FROM t1 WHERE y REGEXP '^For ' ORDER BY x
;SELECT x FROM t1 WHERE y REGEXP 'by|in' ORDER BY x
;SELECT x FROM t1 WHERE y REGEXP 'by|Christ' ORDER BY x
;SELECT x FROM t1 WHERE y REGEXP 'shal+al+' ORDER BY x
;SELECT x FROM t1 WHERE y REGEXP 'shall x*y*z*all' ORDER BY x
;SELECT x FROM t1 WHERE y REGEXP 'shallx?y? ?z?all' ORDER BY x
;SELECT x FROM t1 WHERE y REGEXP '[Aa]dam' ORDER BY x
;SELECT x FROM t1 WHERE y REGEXP '[^Aa]dam' ORDER BY x
;SELECT x FROM t1 WHERE y REGEXP '[^b-zB-Z]dam' ORDER BY x
;SELECT x FROM t1 WHERE y REGEXP 'alive' ORDER BY x
;SELECT x FROM t1 WHERE y REGEXP '^alive' ORDER BY x
;SELECT x FROM t1 WHERE y REGEXP 'alive$' ORDER BY x
;SELECT x FROM t1 WHERE y REGEXP 'alive.$' ORDER BY x
;SELECT x FROM t1 WHERE y REGEXP 'alive.$' ORDER BY x
;SELECT x FROM t1 WHERE y REGEXP 'ma[nd]' ORDER BY x
;SELECT x FROM t1 WHERE y REGEXP 'bma[nd]' ORDER BY x
;SELECT x FROM t1 WHERE y REGEXP 'ma[nd]b' ORDER BY x
;SELECT x FROM t1 WHERE y REGEXP 'maw' ORDER BY x
;SELECT x FROM t1 WHERE y REGEXP 'maW' ORDER BY x
;SELECT x FROM t1 WHERE y REGEXP 'smaw' ORDER BY x
;SELECT x FROM t1 WHERE y REGEXP 'Smaw' ORDER BY x
;SELECT x FROM t1 WHERE y REGEXP 'aliveS$' ORDER BY x
;SELECT x FROM t1 WHERE y REGEXP
          'b(unto|us|son|given|his|name|called|' ||
          'wonderful|councelor|mighty|god|everlasting|father|' ||
          'prince|peace|alive)b'
;SELECT 'aaaabbbbcccc' REGEXP 'ab*c', 
         'aaaacccc' REGEXP 'ab*c'
;SELECT 'aaaabbbbcccc' REGEXP 'ab+c',
         'aaaacccc' REGEXP 'ab+c'
;SELECT 'aaaabbbbcccc' REGEXP 'ab?c',
         'aaaacccc' REGEXP 'ab?c'
;SELECT 'aaaabbbbcccc' REGEXP '^a(a|bb|c)+c$',
         'aaaabbbbcccc' REGEXP '^a(a|bbb|c)+c$',
         'aaaabbbbcccc' REGEXP '^a(a|bbbb|c)+c$'
;SELECT 'abc*def+ghi.jkl[mno]pqr' REGEXP 'c.d',
         'abc*def+ghi.jkl[mno]pqr' REGEXP 'c*d',
         'abc*def+ghi.jkl[mno]pqr' REGEXP 'f+g',
         'abc*def+ghi.jkl[mno]pqr' REGEXP 'i.j',
         'abc*def+ghi.jkl[mno]pqr' REGEXP 'l[mno]p'
;SELECT sub_v1 REGEXP '^abcndef$'
;SELECT sub_v1 REGEXP '^abcadef$'
;SELECT sub_v1 REGEXP '^abctdef$'
;SELECT sub_v1 REGEXP '^abcrdef$'
;SELECT sub_v1 REGEXP '^abcfdef$'
;SELECT sub_v1 REGEXP '^abcvdef$'
;SELECT 'abc$¢€xyz' REGEXP '^abcu0024u00a2u20acxyz$',
         'abc$¢€xyz' REGEXP '^abcu0024u00A2u20ACxyz$',
         'abc$¢€xyz' REGEXP '^abcx24xa2u20acxyz$'
;SELECT 'abc$¢€xyz' REGEXP '^abc[^u0025-X][^ -u007f][^u20ab]xyz$';