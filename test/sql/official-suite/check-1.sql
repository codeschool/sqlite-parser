-- original: check.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

CREATE TABLE t1(
      x INTEGER CHECK( x<5 ),
      y REAL CHECK( y>x )
    )
;INSERT INTO t1 VALUES(3,4);
    SELECT * FROM t1
;SELECT * FROM t1
;SELECT * FROM t1
;SELECT * FROM t1
;SELECT * FROM t1
;DELETE FROM t1 WHERE x IS NULL OR x!=3;
    UPDATE t1 SET x=2 WHERE x==3;
    SELECT * FROM t1
;SELECT * FROM t1
;SELECT * FROM t1
;SELECT * FROM t1
;CREATE TABLE t2(
      x INTEGER CONSTRAINT one CHECK( typeof(coalesce(x,0))=="integer" ),
      y REAL CONSTRAINT two CHECK( typeof(coalesce(y,0.1))=='real' ),
      z TEXT CONSTRAINT three CHECK( typeof(coalesce(z,''))=='text' )
    )
;INSERT INTO t2 VALUES(1,2.2,'three');
    SELECT * FROM t2
;INSERT INTO t2 VALUES(NULL, NULL, NULL);
    SELECT * FROM t2
;CREATE TABLE t2b(
      x INTEGER CHECK( typeof(coalesce(x,0))=='integer' ) CONSTRAINT one,
      y TEXT PRIMARY KEY constraint two,
      z INTEGER,
      UNIQUE(x,z) constraint three
    )
;CREATE TABLE t2c(
      x INTEGER CONSTRAINT x_one CONSTRAINT x_two
          CHECK( typeof(coalesce(x,0))=='integer' )
          CONSTRAINT x_two CONSTRAINT x_three,
      y INTEGER, z INTEGER,
      CONSTRAINT u_one UNIQUE(x,y,z) CONSTRAINT u_two
    )
;DROP TABLE IF EXISTS t2b;
    DROP TABLE IF EXISTS t2c
;SELECT name FROM sqlite_master ORDER BY name
;SELECT name FROM sqlite_master ORDER BY name
;SELECT name FROM sqlite_master ORDER BY name
;INSERT INTO t3 VALUES(1,2,3);
    SELECT * FROM t3
;CREATE TABLE t4(x, y,
      CHECK (
           x+y==11
        OR x*y==12
        OR x/y BETWEEN 5 AND 8
        OR -x==y+10
      )
    )
;INSERT INTO t4 VALUES(1,10);
    SELECT * FROM t4
;UPDATE t4 SET x=4, y=3;
    SELECT * FROM t4
;UPDATE t4 SET x=12, y=2;
    SELECT * FROM t4
;UPDATE t4 SET x=12, y=-22;
    SELECT * FROM t4
;SELECT * FROM t4
;PRAGMA ignore_check_constraints=ON;
    UPDATE t4 SET x=0, y=1;
    SELECT * FROM t4
;SELECT * FROM t1
;UPDATE OR IGNORE t1 SET x=5;
    SELECT * FROM t1
;INSERT OR IGNORE INTO t1 VALUES(5,4.0);
    SELECT * FROM t1
;INSERT OR IGNORE INTO t1 VALUES(2,20.0);
    SELECT * FROM t1
;SELECT * FROM t1
;SELECT * FROM t1
;SELECT * FROM t1
;SELECT * FROM t1
;SELECT * FROM t1
;CREATE TABLE t6(a CHECK (myfunc(a)))
;INSERT INTO t6 VALUES(9)
;SELECT * FROM t6
;INSERT INTO t6 VALUES(8)
;CREATE TABLE t810(a, CHECK( main.t810.a>0 ));
  CREATE TABLE t811(b, CHECK( xyzzy.t811.b BETWEEN 5 AND 10 ));