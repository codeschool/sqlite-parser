-- original: tkt3838.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

PRAGMA encoding=UTF16;
    CREATE TABLE t1(x);
    INSERT INTO t1 VALUES(1);
    ALTER TABLE t1 ADD COLUMN b INTEGER DEFAULT '999';
    ALTER TABLE t1 ADD COLUMN c REAL DEFAULT '9e99';
    ALTER TABLE t1 ADD COLUMN d TEXT DEFAULT 'xyzzy';
    UPDATE t1 SET x=x+1;
    SELECT * FROM t1
;CREATE TABLE log(y);
      CREATE TRIGGER r1 AFTER INSERT ON T1 BEGIN
        INSERT INTO log VALUES(new.x);
      END;
      INSERT INTO t1(x) VALUES(123);
      ALTER TABLE T1 RENAME TO XYZ2;
      INSERT INTO xyz2(x) VALUES(456);
      ALTER TABLE xyz2 RENAME TO pqr3;
      INSERT INTO pqr3(x) VALUES(789);
      SELECT * FROM log;