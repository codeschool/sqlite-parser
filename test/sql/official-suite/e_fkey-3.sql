-- original: e_fkey.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

CREATE TABLE p(a UNIQUE);
    CREATE TABLE c(b REFERENCES p(a) ON DELETE SET NULL);
    INSERT INTO p VALUES('x');
    INSERT INTO c VALUES('x');
    BEGIN;
      DROP TABLE p;
      SELECT * FROM c;
    ROLLBACK
;PRAGMA foreign_keys = OFF;
    DROP TABLE p;
    SELECT * FROM c
;PRAGMA foreign_keys = ON
;INSERT INTO p VALUES(1, 2, 3)
;INSERT INTO c VALUES('w', 2, 3)
;INSERT INTO c VALUES('x', 'x', NULL)
;INSERT INTO c VALUES('y', NULL, 'x')
;INSERT INTO c VALUES('z', NULL, NULL)
;CREATE TABLE p(a, b, PRIMARY KEY(a, b));
    CREATE TABLE cd(c, d, 
      FOREIGN KEY(c, d) REFERENCES p DEFERRABLE INITIALLY DEFERRED);
    CREATE TABLE ci(c, d, 
      FOREIGN KEY(c, d) REFERENCES p DEFERRABLE INITIALLY IMMEDIATE);
    BEGIN
;DELETE FROM cd;
    COMMIT
;BEGIN;
    CREATE TABLE t0(a PRIMARY KEY, b);
    INSERT INTO t0 VALUES('x0', NULL)
;BEGIN;
    CREATE TABLE t0(a PRIMARY KEY);
    INSERT INTO t0 VALUES('xxx')
;PRAGMA recursive_triggers = sub_recursive_triggers_setting
;CREATE TABLE t1(a PRIMARY KEY, b REFERENCES t1 ON DELETE CASCADE);
      INSERT INTO t1 VALUES(1, NULL);
      INSERT INTO t1 VALUES(2, 1);
      INSERT INTO t1 VALUES(3, 2);
      INSERT INTO t1 VALUES(4, 3);
      INSERT INTO t1 VALUES(5, 4);
      SELECT count(*) FROM t1
;SELECT count(*) FROM t1 WHERE a = 1
;DELETE FROM t1 WHERE a = 1;
      SELECT count(*) FROM t1;