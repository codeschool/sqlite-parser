-- original: incrblob3.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

CREATE TABLE blobs(k INTEGER PRIMARY KEY, v BLOB);
  INSERT INTO blobs VALUES(1, zeroblob(100));
  INSERT INTO blobs VALUES(2, zeroblob(100))
;INSERT INTO blobs VALUES(3, 42);
  INSERT INTO blobs VALUES(4, 54.4);
  INSERT INTO blobs VALUES(5, NULL)
;UPDATE blobs SET v = '123456789012345678901234567890' WHERE k = 1
;CREATE VIRTUAL TABLE ft USING fts3;
      INSERT INTO ft VALUES('rules to open a column to which')
;CREATE VIEW v1 AS SELECT * FROM blobs
;CREATE TABLE t1(a, b);
    CREATE INDEX i1 ON t1(b);
    INSERT INTO t1 VALUES(zeroblob(100), zeroblob(100))
;CREATE TABLE p1(a PRIMARY KEY);
    CREATE TABLE c1(a, b REFERENCES p1);
    PRAGMA foreign_keys = 1;
    INSERT INTO p1 VALUES(zeroblob(100));
    INSERT INTO c1 VALUES(zeroblob(100), zeroblob(100))
;PRAGMA foreign_keys = 0
;CREATE TABLE t2(x);