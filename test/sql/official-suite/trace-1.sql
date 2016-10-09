-- original: trace.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

CREATE TABLE t1(a,b);
    INSERT INTO t1 VALUES(1,2);
    SELECT * FROM t1
;CREATE TABLE t1b(x TEXT PRIMARY KEY, y);
     INSERT INTO t1b VALUES('abc','def'),('ghi','jkl'),('mno','pqr')
;SELECT y FROM t1b WHERE x GLOB sub_xyzzy
;SELECT * FROM t1
;CREATE TABLE t2(a,b);
    INSERT INTO t2 VALUES(1,2);
    SELECT * FROM t2
;SELECT * FROM t1
;SELECT * FROM t1
;CREATE TRIGGER r1t1 AFTER UPDATE ON t1 BEGIN
        UPDATE t2 SET a=new.a WHERE rowid=new.rowid;
      END;
      CREATE TRIGGER r1t2 AFTER UPDATE ON t2 BEGIN
        SELECT 'hello';
      END
;UPDATE t1 SET a=a+1
;SELECT x'3031323334' AS x
;SELECT sub_t6int, sub_t6real, sub_t6str, sub_t6blob, sub_t6null
;SELECT sub_t6int, ?1, sub_t6int
;CREATE TABLE t6([sub_t6int],"?1"); INSERT INTO t6 VALUES(1,2)
;SELECT 'sub_t6int', [sub_t6int], sub_t6int, ?1, "?1", sub_t6int FROM t6
;PRAGMA encoding=UTF16be;
     CREATE TABLE t6([sub_t6str],"?1");
     INSERT INTO t6 VALUES(1,2)
;SELECT 'sub_t6str', [sub_t6str], sub_t6str, ?1, "?1", sub_t6str FROM t6
;PRAGMA encoding=UTF16le;
     CREATE TABLE t6([sub_t6str],"?1");
     INSERT INTO t6 VALUES(1,2)
;SELECT 'sub_t6str', [sub_t6str], sub_t6str, ?1, "?1", sub_t6str FROM t6;