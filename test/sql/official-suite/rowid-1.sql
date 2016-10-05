-- original: rowid.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

CREATE TABLE t1(x int, y int);
    INSERT INTO t1 VALUES(1,2);
    INSERT INTO t1 VALUES(3,4);
    SELECT x FROM t1 ORDER BY y
;SELECT rowid FROM t1 ORDER BY x
;SELECT x FROM t1 WHERE rowid=sub_norow
;SELECT x, oid FROM t1 order by x
;SELECT x, RowID FROM t1 order by x
;SELECT x, _rowid_ FROM t1 order by x
;SELECT x FROM t1 ORDER BY x
;SELECT x FROM t1 ORDER BY x
;CREATE TABLE t2(rowid int, x int, y int);
    INSERT INTO t2 VALUES(0,2,3);
    INSERT INTO t2 VALUES(4,5,6);
    INSERT INTO t2 VALUES(7,8,9);
    SELECT * FROM t2 ORDER BY x
;SELECT * FROM t2 ORDER BY rowid
;SELECT rowid, x, y FROM t2 ORDER BY rowid
;SELECT _rowid_, rowid FROM t2 ORDER BY rowid
;SELECT _rowid_, rowid FROM t2 ORDER BY x DESC
;SELECT _rowid_, rowid FROM t2 ORDER BY rowid
;DELETE FROM t1;
    DELETE FROM t2
;INSERT INTO t2 SELECT _rowid_, x*y, y*y FROM t1
;SELECT t2.y FROM t1, t2 WHERE t1.x==4 AND t1.rowid==t2.rowid
;SELECT t2.y FROM t2, t1 WHERE t1.x==4 AND t1.rowid==t2.rowid
;SELECT t2.y FROM t2, t1 WHERE t1.x==4 AND t1.oid==t2.rowid
;SELECT t2.y FROM t2, t1 WHERE t1.x==4 AND t1._rowid_==t2.rowid
;SELECT t2.y FROM t2, t1 WHERE t1.x==4 AND t2.rowid==t1.rowid
;SELECT t2.y FROM t2, t1 WHERE t2.rowid==t1.oid AND t1.x==4
;SELECT t2.y FROM t1, t2 WHERE t1.x==4 AND t1._rowid_==t2.rowid
;SELECT t2.y FROM t1, t2 WHERE t1.x==4 AND t2.rowid==t1.rowid
;SELECT t2.y FROM t1, t2 WHERE t2.rowid==t1.oid AND t1.x==4
;CREATE INDEX idxt1 ON t1(x)
;SELECT t2.y FROM t1, t2 WHERE t1.x==4 AND t1.rowid==t2.rowid
;SELECT t2.y FROM t1, t2 WHERE t1.x==4 AND t1._rowid_==t2.rowid
;SELECT t2.y FROM t1, t2 WHERE t2.rowid==t1.oid AND 4==t1.x
;SELECT t2.y FROM t2, t1 WHERE t1.x==4 AND t1.rowid==t2.rowid
;SELECT t2.y FROM t2, t1 WHERE t1.x==4 AND t1._rowid_==t2.rowid
;SELECT t2.y FROM t2, t1 WHERE t2.rowid==t1.oid AND 4==t1.x
;CREATE INDEX idxt2 ON t2(y)
;SELECT t1.x FROM t2, t1 
    WHERE t2.y==256 AND t1.rowid==t2.rowid
;SELECT t1.x FROM t2, t1 
    WHERE t1.OID==t2.rowid AND t2.y==81
;SELECT t1.x FROM t1, t2
    WHERE t2.y==256 AND t1.rowid==t2.rowid
;DELETE FROM t1 WHERE _rowid_ IN (SELECT oid FROM t1 WHERE x>8)
;SELECT oid FROM t1 WHERE x>8
;SELECT max(x) FROM t1
;SELECT x FROM t1
;SELECT x FROM t1 WHERE rowid=sub_norow
;SELECT x FROM t1
;DELETE FROM t1;
    DROP TABLE t2;
    DROP INDEX idxt1;
    INSERT INTO t1 VALUES(1,2);
    SELECT rowid, * FROM t1
;INSERT INTO t1 VALUES(99,100);
    SELECT rowid,* FROM t1
;CREATE TABLE t2(a INTEGER PRIMARY KEY, b);
    INSERT INTO t2(b) VALUES(55);
    SELECT * FROM t2
;INSERT INTO t2(b) VALUES(66);
    SELECT * FROM t2
;INSERT INTO t2(a,b) VALUES(1000000,77);
    INSERT INTO t2(b) VALUES(88);
    SELECT * FROM t2
;INSERT INTO t2(a,b) VALUES(2147483647,99);
    INSERT INTO t2(b) VALUES(11);
    SELECT b FROM t2 ORDER BY b
;SELECT b FROM t2 WHERE a NOT IN(1,2,1000000,1000001,2147483647)
;INSERT INTO t2(b) VALUES(22);
      INSERT INTO t2(b) VALUES(33);
      INSERT INTO t2(b) VALUES(44);
      INSERT INTO t2(b) VALUES(55);
      SELECT b FROM t2 WHERE a NOT IN(1,2,1000000,1000001,2147483647) 
          ORDER BY b
;DELETE FROM t2 WHERE a!=2;
    INSERT INTO t2(b) VALUES(111);
    SELECT * FROM t2
;CREATE TABLE t3(a integer primary key);
    CREATE TABLE t4(x);
    INSERT INTO t4 VALUES(1);
    CREATE TRIGGER r3 AFTER INSERT on t3 FOR EACH ROW BEGIN
      INSERT INTO t4 VALUES(NEW.a+10);
    END;
    SELECT * FROM t3
;SELECT rowid, * FROM t4
;INSERT INTO t3 VALUES(123);
    SELECT last_insert_rowid()
;SELECT * FROM t3
;SELECT rowid, * FROM t4
;INSERT INTO t3 VALUES(NULL);
    SELECT last_insert_rowid()
;SELECT * FROM t3
;SELECT rowid, * FROM t4
;CREATE TABLE t3(a integer primary key);
    INSERT INTO t3 VALUES(123);
    INSERT INTO t3 VALUES(124)
;SELECT * FROM t3 WHERE a<123.5
;SELECT * FROM t3 WHERE a<124.5
;SELECT * FROM t3 WHERE a>123.5
;SELECT * FROM t3 WHERE a>122.5
;SELECT * FROM t3 WHERE a==123.5
;SELECT * FROM t3 WHERE a==123.000
;SELECT * FROM t3 WHERE a>100.5 AND a<200.5
;SELECT * FROM t3 WHERE a>'xyz'
;SELECT * FROM t3 WHERE a<'xyz'
;SELECT * FROM t3 WHERE a>=122.9 AND a<=123.1
;CREATE TABLE t5(a);
    INSERT INTO t5 VALUES(1);
    INSERT INTO t5 VALUES(2);
    INSERT INTO t5 SELECT a+2 FROM t5;
    INSERT INTO t5 SELECT a+4 FROM t5;
    SELECT rowid, * FROM t5
;SELECT rowid, a FROM t5 WHERE rowid>=5.5
;SELECT rowid, a FROM t5 WHERE rowid>=5.0
;SELECT rowid, a FROM t5 WHERE rowid>5.5
;SELECT rowid, a FROM t5 WHERE rowid>5.0
;SELECT rowid, a FROM t5 WHERE 5.5<=rowid
;SELECT rowid, a FROM t5 WHERE 5.5<rowid
;SELECT rowid, a FROM t5 WHERE rowid<=5.5
;SELECT rowid, a FROM t5 WHERE rowid<5.5
;SELECT rowid, a FROM t5 WHERE 5.5>=rowid
;SELECT rowid, a FROM t5 WHERE 5.5>rowid
;SELECT rowid, a FROM t5 WHERE rowid>=5.5 ORDER BY rowid DESC
;SELECT rowid, a FROM t5 WHERE rowid>=5.0 ORDER BY rowid DESC
;SELECT rowid, a FROM t5 WHERE rowid>5.5 ORDER BY rowid DESC
;SELECT rowid, a FROM t5 WHERE rowid>5.0 ORDER BY rowid DESC
;SELECT rowid, a FROM t5 WHERE 5.5<=rowid ORDER BY rowid DESC
;SELECT rowid, a FROM t5 WHERE 5.5<rowid ORDER BY rowid DESC
;SELECT rowid, a FROM t5 WHERE rowid<=5.5 ORDER BY rowid DESC
;SELECT rowid, a FROM t5 WHERE rowid<5.5 ORDER BY rowid DESC
;SELECT rowid, a FROM t5 WHERE 5.5>=rowid ORDER BY rowid DESC
;SELECT rowid, a FROM t5 WHERE 5.5>rowid ORDER BY rowid DESC
;CREATE TABLE t6(a);
    INSERT INTO t6(rowid,a) SELECT -a,a FROM t5;
    SELECT rowid, * FROM t6
;SELECT rowid, a FROM t6 WHERE rowid>=-5.5
;SELECT rowid, a FROM t6 WHERE rowid>=-5.0
;SELECT rowid, a FROM t6 WHERE rowid>=-5.5 ORDER BY rowid DESC
;SELECT rowid, a FROM t6 WHERE rowid>=-5.0 ORDER BY rowid DESC
;SELECT rowid, a FROM t6 WHERE -5.5<=rowid
;SELECT rowid, a FROM t6 WHERE -5.5<=rowid ORDER BY rowid DESC
;SELECT rowid, a FROM t6 WHERE rowid>-5.5
;SELECT rowid, a FROM t6 WHERE rowid>-5.0;