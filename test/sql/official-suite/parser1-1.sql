-- original: parser1.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

CREATE TABLE t1(
    a TEXT PRIMARY KEY,
    b TEXT,
    FOREIGN KEY(b) REFERENCES t1(a)
  );
  INSERT INTO t1 VALUES('abc',NULL),('xyz','abc');
  PRAGMA writable_schema=on;
  UPDATE sqlite_master SET sql='CREATE TABLE t1(
    a TEXT PRIMARY KEY,
    b TEXT,
    FOREIGN KEY(b COLLATE nocase) REFERENCES t1(a)
  )' WHERE name='t1';
  SELECT name FROM sqlite_master WHERE sql LIKE '%collate%'
;SELECT * FROM t1 ORDER BY 1
;UPDATE sqlite_master SET sql='CREATE TABLE t1(
    a TEXT PRIMARY KEY,
    b TEXT,
    FOREIGN KEY(b ASC) REFERENCES t1(a)
  )' WHERE name='t1';
  SELECT name FROM sqlite_master WHERE sql LIKE '%ASC%'
;SELECT * FROM t1 ORDER BY 1;