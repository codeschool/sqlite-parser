-- original: corruptJ.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

PRAGMA page_size=1024;
  PRAGMA auto_vacuum=0;
  CREATE TABLE t1(a,b);
  WITH RECURSIVE c(i) AS (VALUES(1) UNION ALL SELECT i+1 FROM c WHERE i<10)
    INSERT INTO t1(a,b) SELECT i, zeroblob(700) FROM c
;PRAGMA page_size=1024;
    PRAGMA auto_vacuum=0;
    CREATE TABLE t1(a,b,PRIMARY KEY(a,b)) WITHOUT ROWID;
    WITH RECURSIVE c(i) AS (VALUES(1) UNION ALL SELECT i+1 FROM c WHERE i<100)
      INSERT INTO t1(a,b) SELECT i, zeroblob(200) FROM c;