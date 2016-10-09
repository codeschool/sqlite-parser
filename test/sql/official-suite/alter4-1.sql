-- original: alter4.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

CREATE TEMP TABLE abc(a, b, c);
    SELECT sql FROM sqlite_temp_master
;ALTER TABLE abc ADD d INTEGER
;SELECT sql FROM sqlite_temp_master
;ALTER TABLE abc ADD e
;SELECT sql FROM sqlite_temp_master
;CREATE TABLE temp.t1(a, b);
    ALTER TABLE t1 ADD c;
    SELECT sql FROM sqlite_temp_master WHERE tbl_name = 't1'
;ALTER TABLE t1 ADD d CHECK (a>d);
    SELECT sql FROM sqlite_temp_master WHERE tbl_name = 't1'
;CREATE TEMP TABLE t2(a, b, UNIQUE(a, b));
      ALTER TABLE t2 ADD c REFERENCES t1(c)  ;
      SELECT sql FROM sqlite_temp_master
       WHERE tbl_name = 't2' AND type = 'table'
;CREATE TEMPORARY TABLE t3(a, b, UNIQUE(a, b));
    ALTER TABLE t3 ADD COLUMN c VARCHAR(10, 20);
    SELECT sql FROM sqlite_temp_master
     WHERE tbl_name = 't3' AND type = 'table'
;DROP TABLE abc; 
    DROP TABLE t1; 
    DROP TABLE t3
;CREATE TABLE temp.t1(a, b)
;CREATE TEMPORARY VIEW v1 AS SELECT * FROM t1
;DROP TABLE t1
;CREATE TEMP TABLE t1(a, b);
    INSERT INTO t1 VALUES(1, 100);
    INSERT INTO t1 VALUES(2, 300);
    SELECT * FROM t1
;PRAGMA schema_version = 10
;ALTER TABLE t1 ADD c;
    SELECT * FROM t1
;PRAGMA schema_version
;CREATE TEMP TABLE t1(a, b);
    INSERT INTO t1 VALUES(1, 100);
    INSERT INTO t1 VALUES(2, 300);
    SELECT * FROM t1
;PRAGMA schema_version = 20
;ALTER TABLE t1 ADD c DEFAULT 'hello world';
    SELECT * FROM t1
;PRAGMA schema_version
;DROP TABLE t1
;CREATE TEMP TABLE t1(a, b);
      INSERT INTO t1 VALUES(1, 'one');
      INSERT INTO t1 VALUES(2, 'two');
      ATTACH 'test2.db' AS aux;
      CREATE TABLE aux.t1 AS SELECT * FROM t1;
      PRAGMA aux.schema_version = 30;
      SELECT sql FROM aux.sqlite_master
;ALTER TABLE aux.t1 ADD COLUMN c VARCHAR(128);
      SELECT sql FROM aux.sqlite_master
;SELECT * FROM aux.t1
;PRAGMA aux.schema_version
;ALTER TABLE aux.t1 ADD COLUMN d DEFAULT 1000;
      SELECT sql FROM aux.sqlite_master
;SELECT * FROM aux.t1
;PRAGMA aux.schema_version
;SELECT * FROM t1
;DROP TABLE aux.t1;
      DROP TABLE t1
;CREATE TEMP TABLE t1(a, b);
      CREATE TEMP TABLE log(trig, a, b);

      CREATE TRIGGER t1_a AFTER INSERT ON t1 BEGIN
        INSERT INTO log VALUES('a', new.a, new.b);
      END;
      CREATE TEMP TRIGGER t1_b AFTER INSERT ON t1 BEGIN
        INSERT INTO log VALUES('b', new.a, new.b);
      END;
  
      INSERT INTO t1 VALUES(1, 2);
      SELECT * FROM log
;ALTER TABLE t1 ADD COLUMN c DEFAULT 'c';
      INSERT INTO t1(a, b) VALUES(3, 4);
      SELECT * FROM log
;CREATE TEMP TABLE t4(c1)
;SELECT sql FROM sqlite_temp_master WHERE name = 't4'
;CREATE TABLE t5(
    a INTEGER DEFAULT -9223372036854775808,
    b INTEGER DEFAULT (-(-9223372036854775808))
  );
  INSERT INTO t5 DEFAULT VALUES
;SELECT typeof(a), a, typeof(b), b FROM t5
;ALTER TABLE t5 ADD COLUMN c INTEGER DEFAULT (-(-9223372036854775808));
  SELECT typeof(c), c FROM t5;