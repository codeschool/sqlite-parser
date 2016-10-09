-- original: fkey6.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

PRAGMA defer_foreign_keys
;PRAGMA foreign_keys=ON;
  CREATE TABLE t1(x INTEGER PRIMARY KEY);
  CREATE TABLE t2(y INTEGER PRIMARY KEY,
          z INTEGER REFERENCES t1(x) DEFERRABLE INITIALLY DEFERRED);
  CREATE INDEX t2z ON t2(z);
  CREATE TABLE t3(u INTEGER PRIMARY KEY, v INTEGER REFERENCES t1(x));
  CREATE INDEX t3v ON t3(v);
  INSERT INTO t1 VALUES(1),(2),(3),(4),(5);
  INSERT INTO t2 VALUES(1,1),(2,2);
  INSERT INTO t3 VALUES(3,3),(4,4)
;BEGIN;
    DELETE FROM t1 WHERE x=1
;ROLLBACK
;PRAGMA defer_foreign_keys=ON;
    BEGIN;
    DELETE FROM t1 WHERE x=3
;PRAGMA defer_foreign_keys;
  ROLLBACK;
  PRAGMA defer_foreign_keys;
  BEGIN;
  PRAGMA defer_foreign_keys=ON;
  PRAGMA defer_foreign_keys;
  COMMIT;
  PRAGMA defer_foreign_keys;
  BEGIN
;ROLLBACK
;BEGIN;
    DELETE FROM t1 WHERE x=1
;DELETE FROM t2 WHERE y=1
;COMMIT
;CREATE TABLE p1(a PRIMARY KEY);
  INSERT INTO p1 VALUES('one'), ('two');
  CREATE TABLE c1(x REFERENCES p1);
  INSERT INTO c1 VALUES('two'), ('one')
;BEGIN;
    PRAGMA defer_foreign_keys = 1;
    DELETE FROM p1;
  ROLLBACK;
  PRAGMA defer_foreign_keys
;BEGIN;
    PRAGMA defer_foreign_keys = 1;
    DROP TABLE p1;
    PRAGMA vdbe_trace = 0;
  ROLLBACK;
  PRAGMA defer_foreign_keys
;BEGIN;
    PRAGMA defer_foreign_keys = 1;
    DELETE FROM p1;
    DROP TABLE c1;
  COMMIT;
  PRAGMA defer_foreign_keys
;DROP TABLE p1;
  CREATE TABLE p1(a PRIMARY KEY);
  INSERT INTO p1 VALUES('one'), ('two');
  CREATE TABLE c1(x REFERENCES p1);
  INSERT INTO c1 VALUES('two'), ('one')
;BEGIN;
    PRAGMA defer_foreign_keys = 1;
    INSERT INTO c1 VALUES('three');
    DROP TABLE c1;
  COMMIT;
  PRAGMA defer_foreign_keys;