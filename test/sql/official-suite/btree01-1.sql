-- original: btree01.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

PRAGMA page_size=65536;
  CREATE TABLE t1(a INTEGER PRIMARY KEY, b BLOB);
  WITH RECURSIVE
     c(i) AS (VALUES(1) UNION ALL SELECT i+1 FROM c WHERE i<30)
  INSERT INTO t1(a,b) SELECT i, zeroblob(6500) FROM c;
  UPDATE t1 SET b=zeroblob(3000);
  UPDATE t1 SET b=zeroblob(64000) WHERE a=2;
  PRAGMA integrity_check
;DELETE FROM t1;
      WITH RECURSIVE
        c(i) AS (VALUES(1) UNION ALL SELECT i+1 FROM c WHERE i<30)
      INSERT INTO t1(a,b) SELECT i, zeroblob(6500) FROM c;
      UPDATE t1 SET b=zeroblob(3000);
      UPDATE t1 SET b=zeroblob(64000) WHERE a=sub_i;
      PRAGMA integrity_check
;DELETE FROM t1;
      WITH RECURSIVE
        c(i) AS (VALUES(1) UNION ALL SELECT i+1 FROM c WHERE i<30)
      INSERT INTO t1(a,b) SELECT i, zeroblob(6500) FROM c;
      UPDATE t1 SET b=zeroblob(2000);
      UPDATE t1 SET b=zeroblob(64000) WHERE a=sub_i;
      PRAGMA integrity_check
;DELETE FROM t1;
      WITH RECURSIVE
        c(i) AS (VALUES(1) UNION ALL SELECT i+1 FROM c WHERE i<30)
      INSERT INTO t1(a,b) SELECT i, zeroblob(6500) FROM c;
      UPDATE t1 SET b=zeroblob(6499) WHERE (a%3)==0;
      UPDATE t1 SET b=zeroblob(6499) WHERE (a%3)==1;
      UPDATE t1 SET b=zeroblob(6499) WHERE (a%3)==2;
      UPDATE t1 SET b=zeroblob(64000) WHERE a=sub_i;
      PRAGMA integrity_check
;DELETE FROM t1;
      WITH RECURSIVE
        c(i) AS (VALUES(1) UNION ALL SELECT i+1 FROM c WHERE i<30)
      INSERT INTO t1(a,b) SELECT i, zeroblob(6542) FROM c;
      UPDATE t1 SET b=zeroblob(2331);
      UPDATE t1 SET b=zeroblob(65496) WHERE a=sub_i;
      PRAGMA integrity_check
;DELETE FROM t1;
      WITH RECURSIVE
        c(i) AS (VALUES(1) UNION ALL SELECT i+1 FROM c WHERE i<30)
      INSERT INTO t1(a,b) SELECT i, zeroblob(6542) FROM c;
      UPDATE t1 SET b=zeroblob(2332);
      UPDATE t1 SET b=zeroblob(65496) WHERE a=sub_i;
      PRAGMA integrity_check
;DELETE FROM t1;
      WITH RECURSIVE
        c(i) AS (VALUES(1) UNION ALL SELECT i+1 FROM c WHERE i<30)
      INSERT INTO t1(a,b) SELECT i, zeroblob(6500) FROM c;
      UPDATE t1 SET b=zeroblob(1);
      UPDATE t1 SET b=zeroblob(65000) WHERE a=sub_i;
      PRAGMA integrity_check
;DELETE FROM t1;
      WITH RECURSIVE
        c(i) AS (VALUES(1) UNION ALL SELECT i+1 FROM c WHERE i<31)
      INSERT INTO t1(a,b) SELECT i, zeroblob(6500) FROM c;
      UPDATE t1 SET b=zeroblob(4000);
      UPDATE t1 SET b=zeroblob(65000) WHERE a=sub_i;
      PRAGMA integrity_check;