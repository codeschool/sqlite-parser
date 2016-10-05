-- original: savepoint7.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

CREATE TABLE t1(a,b,c);
    CREATE TABLE t2(x,y,z);
    INSERT INTO t1 VALUES(1,2,3);
    INSERT INTO t1 VALUES(4,5,6);
    INSERT INTO t1 VALUES(7,8,9);
    SAVEPOINT x1
;SELECT * FROM t1
;SAVEPOINT x2;
      CREATE TABLE IF NOT EXISTS t3(xyz);
      INSERT INTO t2 VALUES(sub_a,sub_b,sub_c);
      RELEASE x2
;SELECT * FROM t2; RELEASE x1
;DELETE FROM t2
;SELECT * FROM t1
;SAVEPOINT x2;
      INSERT INTO t2 VALUES(sub_a,sub_b,sub_c);
      RELEASE x2
;SELECT * FROM t2
;DELETE FROM t2; BEGIN
;SELECT * FROM t1
;SAVEPOINT x2;
      INSERT INTO t2 VALUES(sub_a,sub_b,sub_c);
      RELEASE x2
;SELECT * FROM t2; ROLLBACK
;DELETE FROM t2; SAVEPOINT x1; CREATE TABLE t4(abc)
;RELEASE x1
;SELECT * FROM t2
;DELETE FROM t2
;SELECT * FROM t2;