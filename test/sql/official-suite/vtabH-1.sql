-- original: vtabH.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

CREATE TABLE t6(a, b TEXT);
  CREATE INDEX i6 ON t6(b, a);
  CREATE VIRTUAL TABLE e6 USING echo(t6)
;CREATE VIRTUAL TABLE vars USING tclvar;
  SELECT * FROM vars WHERE name = 'xyz'
;SELECT name FROM fsdir WHERE dir = '.' AND name = 'test.db';
    SELECT name FROM fsdir WHERE dir = '.' AND name = '.'
;SELECT path FROM fstree WHERE path GLOB sub_pwd ORDER BY 1
;SELECT path, size FROM fstree WHERE path GLOB sub_pwd || '/subdir/*' ORDER BY 1
;SELECT path, size FROM fstree WHERE path LIKE sub_pwd || '/subdir/%' ORDER BY 1
;SELECT sum(size) FROM fstree WHERE path LIKE sub_pwd || '/subdir/%'
;SELECT size FROM fstree WHERE path = sub_pwd || '/subdir/x1.txt';