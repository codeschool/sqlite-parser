-- original: index.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

CREATE TABLE t7(a UNIQUE PRIMARY KEY);
      CREATE TABLE t8(a UNIQUE PRIMARY KEY ON CONFLICT ROLLBACK);
      INSERT INTO t7 VALUES(1);
      INSERT INTO t8 VALUES(1)
;CREATE INDEX "t6i2" ON t6(c);
    DROP INDEX "t6i2"
;DROP INDEX "t6i1";