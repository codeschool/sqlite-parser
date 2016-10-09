-- original: fts3ao.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

CREATE VIRTUAL TABLE t1 USING fts3(a, b, c);
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
;CREATE VIRTUAL TABLE t1 USING fts3(a, b, c);
    INSERT INTO t1(a, b, c) VALUES('one three four', 'one four', 'one two');
    SELECT a, b, c FROM t1 WHERE c MATCH 'two'
;SELECT a, b, c FROM t1 WHERE c MATCH 'two';
    CREATE TABLE t3(a, b, c);
    SELECT a, b, c FROM t1 WHERE  c  MATCH 'two'
;ATTACH 'test2.db' AS aux;
    CREATE VIRTUAL TABLE aux.t1 USING fts3(a, b, c);
    INSERT INTO aux.t1(a, b, c) VALUES(
      'neung song sahm', 'neung see', 'neung see song'
    )
;SELECT a, b, c FROM aux.t1 WHERE a MATCH 'song'
;SELECT a, b, c FROM t1 WHERE c MATCH 'two'
;ALTER TABLE aux.t1 RENAME TO t2
;SELECT a, b, c FROM t2 WHERE a MATCH 'song'
;SELECT a, b, c FROM t1 WHERE c MATCH 'two'
;CREATE VIRTUAL TABLE t4 USING fts3;
    INSERT INTO t4 VALUES('the quick brown fox')
;BEGIN;
      INSERT INTO t4 VALUES('jumped over the')
;ALTER TABLE t4 RENAME TO t5
;INSERT INTO t5 VALUES('lazy dog')
;SELECT * FROM t5
;BEGIN;
      INSERT INTO t5 VALUES('Down came a jumbuck to drink at that billabong');
      ALTER TABLE t5 RENAME TO t6;
      INSERT INTO t6 VALUES('Down came the troopers, one, two, three');
    ROLLBACK;
    SELECT * FROM t5
;SELECT snippet(t5, '[', ']') FROM t5 WHERE t5 MATCH 'the'
;CREATE VIRTUAL TABLE t7 USING FTS4;
  INSERT INTO t7 VALUES('coined by a German clinician');
  SELECT count(*) FROM sqlite_master WHERE name LIKE 't7%';
  SELECT count(*) FROM sqlite_master WHERE name LIKE 't8%'
;ALTER TABLE t7 RENAME TO t8;
  SELECT count(*) FROM sqlite_master WHERE name LIKE 't7%';
  SELECT count(*) FROM sqlite_master WHERE name LIKE 't8%'
;DROP TABLE t1;