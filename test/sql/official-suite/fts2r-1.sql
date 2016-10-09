-- original: fts2r.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

DROP TABLE IF EXISTS t1;
  CREATE VIRTUAL TABLE t1 USING fts2(c);
  INSERT INTO t1 (rowid, c) VALUES (1, 'This is a test');
  INSERT INTO t1 (rowid, c) VALUES (2, 'That was a test');
  INSERT INTO t1 (rowid, c) VALUES (3, 'This is a test')
;SELECT rowid FROM t1 ORDER BY rowid
;SELECT rowid FROM t1 WHERE c LIKE '%test' ORDER BY rowid
;SELECT rowid FROM t1 WHERE c LIKE 'That%' ORDER BY rowid
;DROP TABLE IF EXISTS t1;
  DROP TABLE IF EXISTS t2;
  CREATE VIRTUAL TABLE t1 USING fts2(c);
  CREATE TABLE t2(id INTEGER PRIMARY KEY AUTOINCREMENT, weight INTEGER UNIQUE);
  INSERT INTO t2 VALUES (null, 10);
  INSERT INTO t1 (rowid, c) VALUES (last_insert_rowid(), 'This is a test');
  INSERT INTO t2 VALUES (null, 5);
  INSERT INTO t1 (rowid, c) VALUES (last_insert_rowid(), 'That was a test');
  INSERT INTO t2 VALUES (null, 20);
  INSERT INTO t1 (rowid, c) VALUES (last_insert_rowid(), 'This is a test')
;SELECT rowid FROM t1 WHERE rowid in (1, 2, 10)
;SELECT t1.rowid, weight FROM t1, t2 WHERE t2.id = t1.rowid ORDER BY weight
;SELECT t1.rowid, weight FROM t1, t2
           WHERE t2.weight>5 AND t2.id = t1.rowid ORDER BY weight
;DROP TABLE IF EXISTS t1;
  DROP TABLE IF EXISTS t2;
  CREATE VIRTUAL TABLE t1 USING fts2(c);
  CREATE TABLE t2(id INTEGER PRIMARY KEY AUTOINCREMENT, weight INTEGER UNIQUE);
  INSERT INTO t2 VALUES (null, 10);
  INSERT INTO t1 (rowid, c) VALUES (last_insert_rowid(), 'This is a test');
  INSERT INTO t2 VALUES (null, 5);
  INSERT INTO t1 (rowid, c) VALUES (last_insert_rowid(), 'That was a test');
  INSERT INTO t2 VALUES (null, 20);
  INSERT INTO t1 (rowid, c) VALUES (last_insert_rowid(), 'This is a test')
;SELECT rowid FROM t1 WHERE t1 MATCH 'this' ORDER BY rowid
;SELECT t1.rowid, weight FROM t1, t2
     WHERE t1 MATCH 'this' AND t1.rowid = t2.id ORDER BY weight;