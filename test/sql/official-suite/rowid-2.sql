-- original: rowid.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

SELECT rowid, a FROM t6 WHERE rowid>-5.5 ORDER BY rowid DESC
;SELECT rowid, a FROM t6 WHERE rowid>-5.0 ORDER BY rowid DESC
;SELECT rowid, a FROM t6 WHERE -5.5<rowid
;SELECT rowid, a FROM t6 WHERE -5.5<rowid ORDER BY rowid DESC
;SELECT rowid, a FROM t6 WHERE rowid<=-5.5
;SELECT rowid, a FROM t6 WHERE rowid<=-5.5 ORDER BY rowid DESC
;SELECT rowid, a FROM t6 WHERE -5.5>=rowid
;SELECT rowid, a FROM t6 WHERE -5.5>=rowid ORDER BY rowid DESC
;SELECT rowid, a FROM t6 WHERE rowid<-5.5
;SELECT rowid, a FROM t6 WHERE rowid<-5.5 ORDER BY rowid DESC
;SELECT rowid, a FROM t6 WHERE -5.5>rowid
;SELECT rowid, a FROM t6 WHERE -5.5>rowid ORDER BY rowid DESC
;SELECT rowid, a FROM t5 WHERE rowid>'abc'
;SELECT rowid, a FROM t5 WHERE rowid>='abc'
;SELECT rowid, a FROM t5 WHERE rowid<'abc'
;SELECT rowid, a FROM t5 WHERE rowid<='abc'
;CREATE TABLE t7(x INTEGER PRIMARY KEY, y);
    CREATE TABLE t7temp(a INTEGER PRIMARY KEY);
    INSERT INTO t7 VALUES(9223372036854775807,'a');
    SELECT y FROM t7
;INSERT INTO t7 VALUES(NULL,'b');
    SELECT x, y FROM t7 ORDER BY x
;INSERT INTO t7 VALUES(2,'y')
;DELETE FROM t7temp; INSERT INTO t7temp VALUES(1)
;INSERT INTO t7 VALUES(NULL,'x');
      SELECT count(*) FROM t7 WHERE y=='x'
;DELETE FROM t7temp; INSERT INTO t7temp VALUES(1)
;INSERT INTO t13(rowid,x) VALUES(sub_n,sub_n*sub_n)
;CREATE TABLE t13(x);
  INSERT INTO t13(rowid,x) VALUES(1234,5);
  SELECT rowid, x, addrow(rowid+1000), '|' FROM t13 LIMIT 3;
  SELECT last_insert_rowid();