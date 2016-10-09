-- original: fts2o.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

CREATE VIRTUAL TABLE t1 USING fts2(a, b, c);
  INSERT INTO t1(a, b, c) VALUES('one three four', 'one four', 'one four two')
;SELECT rowid, snippet(t1) FROM t1 WHERE c MATCH 'four'
;SELECT rowid, snippet(t1) FROM t1 WHERE b MATCH 'four'
;SELECT rowid, snippet(t1) FROM t1 WHERE a MATCH 'four'
;SELECT tbl_name FROM sqlite_master WHERE type = 'table'
;ALTER TABLE t1 RENAME to fts_t1
;SELECT rowid, snippet(fts_t1) FROM fts_t1 WHERE a MATCH 'four'
;SELECT tbl_name FROM sqlite_master WHERE type = 'table'
;SELECT rowid, snippet(fts_t1) FROM fts_t1 WHERE a MATCH 'four'
;SELECT tbl_name FROM sqlite_master WHERE type = 'table'
;BEGIN;
    INSERT INTO fts_t1(a, b, c) VALUES('one two three', 'one four', 'one two')
;SELECT rowid, snippet(fts_t1) FROM fts_t1 WHERE a MATCH 'four'
;SELECT tbl_name FROM sqlite_master WHERE type = 'table'
;SELECT a FROM fts_t1
;SELECT a, b, c FROM fts_t1 WHERE c MATCH 'four'
;CREATE VIRTUAL TABLE t1 USING fts2(a, b, c);
    INSERT INTO t1(a, b, c) VALUES('one three four', 'one four', 'one two');
    SELECT a, b, c FROM t1 WHERE c MATCH 'two'
;SELECT a, b, c FROM t1 WHERE c MATCH 'two';
    CREATE TABLE t3(a, b, c);
    SELECT a, b, c FROM t1 WHERE  c  MATCH 'two'
;ATTACH 'test2.db' AS aux;
    CREATE VIRTUAL TABLE aux.t1 USING fts2(a, b, c);
    INSERT INTO aux.t1(a, b, c) VALUES(
      'neung song sahm', 'neung see', 'neung see song'
    )
;SELECT a, b, c FROM aux.t1 WHERE a MATCH 'song'
;SELECT a, b, c FROM t1 WHERE c MATCH 'two'
;ALTER TABLE aux.t1 RENAME TO t2
;SELECT a, b, c FROM t2 WHERE a MATCH 'song'
;SELECT a, b, c FROM t1 WHERE c MATCH 'two';