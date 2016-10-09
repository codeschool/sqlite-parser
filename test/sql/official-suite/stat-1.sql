-- original: stat.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

PRAGMA auto_vacuum = OFF;
  CREATE VIRTUAL TABLE temp.stat USING dbstat;
  SELECT * FROM stat
;PRAGMA journal_mode = WAL;
    PRAGMA journal_mode = delete;
    SELECT name, path, pageno, pagetype, ncell, payload, unused, mx_payload
      FROM stat
;CREATE TABLE t1(a, b);
    CREATE INDEX i1 ON t1(b);
    INSERT INTO t1(rowid, a, b) VALUES(2, 2, 3);
    INSERT INTO t1(rowid, a, b) VALUES(3, 4, 5)
;SELECT name, path, pageno, pagetype, ncell, payload, unused, mx_payload
      FROM stat WHERE name = 't1'
;SELECT name, path, pageno, pagetype, ncell, payload, unused, mx_payload
      FROM stat WHERE name = 'i1'
;SELECT name, path, pageno, pagetype, ncell, payload, unused, mx_payload
      FROM stat WHERE name = 'sqlite_master'
;DROP TABLE t1
;CREATE TABLE t3(a PRIMARY KEY, b);
  INSERT INTO t3(rowid, a, b) VALUES(2, a_string(111), a_string(222));
  INSERT INTO t3 SELECT a_string(110+rowid), a_string(221+rowid) FROM t3
   ORDER BY rowid;
  INSERT INTO t3 SELECT a_string(110+rowid), a_string(221+rowid) FROM t3
   ORDER BY rowid;
  INSERT INTO t3 SELECT a_string(110+rowid), a_string(221+rowid) FROM t3
   ORDER BY rowid;
  INSERT INTO t3 SELECT a_string(110+rowid), a_string(221+rowid) FROM t3
   ORDER BY rowid;
  INSERT INTO t3 SELECT a_string(110+rowid), a_string(221+rowid) FROM t3
   ORDER BY rowid;
  SELECT name, path, pageno, pagetype, ncell, payload, unused, mx_payload
    FROM stat WHERE name != 'sqlite_master'
;UPDATE t3 SET a=a||hex(randomblob(700));
  VACUUM;
  SELECT pageno FROM stat EXCEPT SELECT pageno-1 FROM stat
;DROP TABLE t3; VACUUM
;CREATE TABLE t4(x);
  CREATE INDEX i4 ON t4(x);
  INSERT INTO t4(rowid, x) VALUES(2, a_string(7777));
  SELECT name, path, pageno, pagetype, ncell, payload, unused, mx_payload
    FROM stat WHERE name != 'sqlite_master'
;CREATE TABLE t5(x);
  CREATE INDEX i5 ON t5(x);
  SELECT name, path, pageno, pagetype, ncell, payload, unused, mx_payload
    FROM stat WHERE name = 't5' OR name = 'i5'
;PRAGMA auto_vacuum = OFF;
  CREATE TABLE tx(y);
  ATTACH ':memory:' AS aux1;
  CREATE VIRTUAL TABLE temp.stat USING dbstat(aux1);
  CREATE TABLE aux1.t1(x);
  INSERT INTO t1 VALUES(zeroblob(1513));
  INSERT INTO t1 VALUES(zeroblob(1514));
  SELECT name, path, pageno, pagetype, ncell, payload, unused, mx_payload
    FROM stat WHERE name = 't1';