-- original: without_rowid2.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

CREATE TABLE t1(
      a INT PRIMARY KEY,
      b INT
           REFERENCES t1 ON DELETE CASCADE
           REFERENCES t2,
      c TEXT,
      FOREIGN KEY (b,c) REFERENCES t2(x,y) ON UPDATE CASCADE
    ) WITHOUT rowid
;CREATE TABLE t2(
      x INT PRIMARY KEY,
      y TEXT
    ) WITHOUT rowid
;CREATE TABLE t3(
      a INT REFERENCES t2,
      b INT REFERENCES t1,
      FOREIGN KEY (a,b) REFERENCES t2(x,y)
    )
;CREATE TABLE t4(a int primary key) WITHOUT rowid;
    CREATE TABLE t5(x references t4);
    CREATE TABLE t6(x references t4);
    CREATE TABLE t7(x references t4);
    CREATE TABLE t8(x references t4);
    CREATE TABLE t9(x references t4);
    CREATE TABLE t10(x references t4);
    DROP TABLE t7;
    DROP TABLE t9;
    DROP TABLE t5;
    DROP TABLE t8;
    DROP TABLE t6;
    DROP TABLE t10;