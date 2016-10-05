-- original: imposter1.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

CREATE TABLE t1(a INTEGER PRIMARY KEY, b, c, d NOT NULL);
    CREATE INDEX t1b ON t1(b);
    CREATE UNIQUE INDEX t1c ON t1(c);
    WITH RECURSIVE c(i) AS (VALUES(1) UNION ALL SELECT i+1 FROM c WHERE i<30)
      INSERT INTO t1(a,b,c,d) SELECT i,1000+i,2000+i,3000+i FROM c
;CREATE TABLE xt1(a,b,c,d)
;CREATE TABLE xt1c(c,rowid,PRIMARY KEY(c,rowid))WITHOUT ROWID
;CREATE TEMP TABLE chnglog(desc TEXT);
    CREATE TEMP TRIGGER xt1_del AFTER DELETE ON xt1 BEGIN
      INSERT INTO chnglog VALUES(
           printf('DELETE t1: rowid=%d, a=%s, b=%s, c=%s, d=%s',
                  old.rowid, quote(old.a), quote(old.b), quote(old.c),
                  quote(old.d)));
    END;
    CREATE TEMP TRIGGER xt1_ins AFTER INSERT ON xt1 BEGIN
      INSERT INTO chnglog VALUES(
           printf('INSERT t1:  rowid=%d, a=%s, b=%s, c=%s, d=%s',
                  new.rowid, quote(new.a), quote(new.b), quote(new.c),
                  quote(new.d)));
    END
;SELECT rowid FROM xt1 WHERE a IS NOT NULL
;SELECT a,b,c,d FROM t1 EXCEPT SELECT rowid,b,c,d FROM xt1;
  SELECT rowid,b,c,d FROM xt1 EXCEPT SELECT a,b,c,d FROM t1
;DELETE FROM xt1 WHERE rowid=5;
  INSERT INTO xt1(rowid,a,b,c,d) VALUES(99,'hello',1099,2022,NULL);
  SELECT * FROM chnglog ORDER BY rowid
;PRAGMA integrity_check
;PRAGMA integrity_check
;PRAGMA integrity_check
;DELETE FROM t1;
  WITH RECURSIVE c(i) AS (VALUES(1) UNION ALL SELECT i+1 FROM c WHERE i<10)
   INSERT INTO t1(a,b,c,d) SELECT i,i,i,i FROM c;
  UPDATE xt1c SET c=NULL WHERE rowid=5;
  PRAGMA integrity_check
;DELETE FROM t1;
  WITH RECURSIVE c(i) AS (VALUES(1) UNION ALL SELECT i+1 FROM c WHERE i<10)
   INSERT INTO t1(a,b,c,d) SELECT i,i,i,i FROM c;
  UPDATE xt1c SET c=99 WHERE rowid IN (5,7,9);
  SELECT c FROM t1 ORDER BY c
;UPDATE xt1 SET c=99 WHERE rowid IN (5,7,9);
  PRAGMA integrity_check
;DELETE FROM t1 WHERE rowid IN (5,7,9);
    PRAGMA integrity_check;