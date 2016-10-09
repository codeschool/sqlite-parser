-- original: sort.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

CREATE TABLE t1(
       n int,
       v varchar(10),
       log int,
       roman varchar(10),
       flt real
    );
    INSERT INTO t1 VALUES(1,'one',0,'I',3.141592653);
    INSERT INTO t1 VALUES(2,'two',1,'II',2.15);
    INSERT INTO t1 VALUES(3,'three',1,'III',4221.0);
    INSERT INTO t1 VALUES(4,'four',2,'IV',-0.0013442);
    INSERT INTO t1 VALUES(5,'five',2,'V',-11);
    INSERT INTO t1 VALUES(6,'six',2,'VI',0.123);
    INSERT INTO t1 VALUES(7,'seven',2,'VII',123.0);
    INSERT INTO t1 VALUES(8,'eight',3,'VIII',-1.6)
;SELECT count(*) FROM t1
;SELECT n FROM t1 ORDER BY n
;SELECT n FROM t1 ORDER BY n ASC
;SELECT ALL n FROM t1 ORDER BY n ASC
;SELECT n FROM t1 ORDER BY n DESC
;SELECT v FROM t1 ORDER BY v
;SELECT n FROM t1 ORDER BY v
;SELECT n FROM t1 ORDER BY v DESC
;SELECT flt FROM t1 ORDER BY flt
;SELECT flt FROM t1 ORDER BY flt DESC
;SELECT roman FROM t1 ORDER BY roman
;SELECT n FROM t1 ORDER BY log, flt
;SELECT n FROM t1 ORDER BY log asc, flt
;SELECT n FROM t1 ORDER BY log, flt ASC
;SELECT n FROM t1 ORDER BY log ASC, flt asc
;SELECT n FROM t1 ORDER BY log, flt DESC
;SELECT n FROM t1 ORDER BY log ASC, flt DESC
;SELECT n FROM t1 ORDER BY log DESC, flt
;SELECT n FROM t1 ORDER BY log DESC, flt DESC
;UPDATE t1 SET v='x' || -flt;
    UPDATE t1 SET v='x-2b' where v=='x-0.123';
    SELECT v FROM t1 ORDER BY v
;SELECT v FROM t1 ORDER BY substr(v,2,999)
;SELECT v FROM t1 ORDER BY substr(v,2,999)+0.0
;SELECT v FROM t1 ORDER BY substr(v,2,999) DESC
;SELECT v FROM t1 ORDER BY substr(v,2,999)+0.0 DESC
;CREATE TABLE t2(a,b);
    INSERT INTO t2 VALUES('AGLIENTU',1);
    INSERT INTO t2 VALUES('AGLIE`',2);
    INSERT INTO t2 VALUES('AGNA',3);
    SELECT a, b FROM t2 ORDER BY a
;SELECT a, b FROM t2 ORDER BY a DESC
;DELETE FROM t2;
    INSERT INTO t2 VALUES('aglientu',1);
    INSERT INTO t2 VALUES('aglie`',2);
    INSERT INTO t2 VALUES('agna',3);
    SELECT a, b FROM t2 ORDER BY a
;SELECT a, b FROM t2 ORDER BY a DESC
;INSERT INTO t1 VALUES(9,'x2.7',3,'IX',4.0e5);
    INSERT INTO t1 VALUES(10,'x5.0e10',3,'X',-4.0e5);
    INSERT INTO t1 VALUES(11,'x-4.0e9',3,'XI',4.1e4);
    INSERT INTO t1 VALUES(12,'x01234567890123456789',3,'XII',-4.2e3);
    SELECT n FROM t1 ORDER BY n
;SELECT n||'' FROM t1 ORDER BY 1
;SELECT n+0 FROM t1 ORDER BY 1
;SELECT n||'' FROM t1 ORDER BY 1 DESC
;SELECT n+0 FROM t1 ORDER BY 1 DESC
;SELECT v FROM t1 ORDER BY 1
;SELECT v FROM t1 ORDER BY 1 DESC
;SELECT substr(v,2,99) FROM t1 ORDER BY 1
;create table t3(a,b);
    insert into t3 values(5,NULL);
    insert into t3 values(6,NULL);
    insert into t3 values(3,NULL);
    insert into t3 values(4,'cd');
    insert into t3 values(1,'ab');
    insert into t3 values(2,NULL);
    select a from t3 order by b, a
;select a from t3 order by b, a desc
;select a from t3 order by b desc, a
;select a from t3 order by b desc, a desc
;create index i3 on t3(b,a);
    select a from t3 order by b, a
;select a from t3 order by b, a desc
;select a from t3 order by b desc, a
;select a from t3 order by b desc, a desc
;CREATE TABLE t4(
      a INTEGER,
      b VARCHAR(30)
    );
    INSERT INTO t4 VALUES(1,1);
    INSERT INTO t4 VALUES(2,2);
    INSERT INTO t4 VALUES(11,11);
    INSERT INTO t4 VALUES(12,12);
    SELECT a FROM t4 ORDER BY 1
;SELECT b FROM t4 ORDER BY 1
;CREATE VIEW v4 AS SELECT * FROM t4;
    SELECT a FROM v4 ORDER BY 1
;SELECT b FROM v4 ORDER BY 1
;SELECT a FROM t4 UNION SELECT a FROM v4 ORDER BY 1
;SELECT b FROM t4 UNION SELECT a FROM v4 ORDER BY 1
;SELECT a FROM t4 UNION SELECT b FROM v4 ORDER BY 1
;SELECT b FROM t4 UNION SELECT b FROM v4 ORDER BY 1
;CREATE TABLE t5(a real, b text);
    INSERT INTO t5 VALUES(100,'A1');
    INSERT INTO t5 VALUES(100.0,'A2');
    SELECT * FROM t5 ORDER BY a, b
;CREATE TABLE t6(x, y);
    INSERT INTO t6 VALUES(1,1);
    INSERT INTO t6 VALUES(2,'1');
    INSERT INTO t6 VALUES(3,x'31');
    INSERT INTO t6 VALUES(4,NULL);
    SELECT x FROM t6 ORDER BY y
;SELECT x FROM t6 ORDER BY y DESC
;SELECT x FROM t6 WHERE y<1
;SELECT x FROM t6 WHERE y<'1'
;SELECT x FROM t6 WHERE y<x'31'
;SELECT x FROM t6 WHERE y>1
;SELECT x FROM t6 WHERE y>'1'
;CREATE TABLE t7(c INTEGER PRIMARY KEY);
    INSERT INTO t7 VALUES(1);
    INSERT INTO t7 VALUES(2);
    INSERT INTO t7 VALUES(3);
    INSERT INTO t7 VALUES(4)
;SELECT c FROM t7 WHERE c<=3 ORDER BY c DESC
;SELECT c FROM t7 WHERE c<3 ORDER BY c DESC
;create table t8(a unique, b, c);
    insert into t8 values(1,2,3);
    insert into t8 values(2,3,4);
    create table t9(x,y);
    insert into t9 values(2,4);
    insert into t9 values(2,3);
    select y from t8, t9 where a=1 order by a, y
;create table a (id integer primary key);
    create table b (id integer primary key, aId integer, text);
    insert into a values (1);
    insert into b values (2, 1, 'xxx');
    insert into b values (1, 1, 'zzz');
    insert into b values (3, 1, 'yyy');
    select a.id, b.id, b.text from a join b on (a.id = b.aId)
      order by a.id, b.text
;CREATE TABLE t10(a, b)
;INSERT INTO t10 VALUES( sub_i/10, sub_i%10 )
;SELECT a, b FROM t10 ORDER BY a
;SELECT a, b FROM t10 ORDER BY a, b
;PRAGMA cache_size = 5;
  SELECT a, b FROM t10 ORDER BY a
;SELECT a, b FROM t10 ORDER BY a, b
;PRAGMA cache_size = 5;
  CREATE TABLE t11(a, b);
  INSERT INTO t11 VALUES(randomblob(5000), NULL);
  INSERT INTO t11 SELECT randomblob(5000), NULL FROM t11; --2
  INSERT INTO t11 SELECT randomblob(5000), NULL FROM t11; --3
  INSERT INTO t11 SELECT randomblob(5000), NULL FROM t11; --4
  INSERT INTO t11 SELECT randomblob(5000), NULL FROM t11; --5
  INSERT INTO t11 SELECT randomblob(5000), NULL FROM t11; --6
  INSERT INTO t11 SELECT randomblob(5000), NULL FROM t11; --7
  INSERT INTO t11 SELECT randomblob(5000), NULL FROM t11; --8
  INSERT INTO t11 SELECT randomblob(5000), NULL FROM t11; --9
  UPDATE t11 SET b = cksum(a)
;SELECT * FROM t11 ORDER BY b
;PRAGMA temp_store = sub_tmpstore; PRAGMA threads = sub_nWorker
;PRAGMA cache_size = 20
;PRAGMA cache_size = 5
;SELECT * FROM sqlite_master ORDER BY sql;