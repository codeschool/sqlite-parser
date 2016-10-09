-- original: multiplex2.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

CREATE TABLE t1(a, b);
    INSERT INTO t1 VALUES(randomblob(10), randomblob(4000));          --    1
    INSERT INTO t1 SELECT randomblob(10), randomblob(4000) FROM t1;   --    2
    INSERT INTO t1 SELECT randomblob(10), randomblob(4000) FROM t1;   --    4
    INSERT INTO t1 SELECT randomblob(10), randomblob(4000) FROM t1;   --    8
    INSERT INTO t1 SELECT randomblob(10), randomblob(4000) FROM t1;   --   16
    INSERT INTO t1 SELECT randomblob(10), randomblob(4000) FROM t1;   --   32
    INSERT INTO t1 SELECT randomblob(10), randomblob(4000) FROM t1;   --   64
    INSERT INTO t1 SELECT randomblob(10), randomblob(4000) FROM t1;   --  128
    INSERT INTO t1 SELECT randomblob(10), randomblob(4000) FROM t1;   --  256
    INSERT INTO t1 SELECT randomblob(10), randomblob(4000) FROM t1;   --  512
    SELECT count(*) FROM t1
;SELECT count(*) FROM t1
;SELECT count(*) FROM t1
;DELETE FROM t1 ; VACUUM
;SELECT count(*) FROM t1
;INSERT INTO t1 VALUES(randomblob(10), randomblob(4000));          --    1
    INSERT INTO t1 SELECT randomblob(10), randomblob(4000) FROM t1;   --    2
    INSERT INTO t1 SELECT randomblob(10), randomblob(4000) FROM t1;   --    4
    INSERT INTO t1 SELECT randomblob(10), randomblob(4000) FROM t1;   --    8
    INSERT INTO t1 SELECT randomblob(10), randomblob(4000) FROM t1;   --   16
    INSERT INTO t1 SELECT randomblob(10), randomblob(4000) FROM t1;   --   32
    INSERT INTO t1 SELECT randomblob(10), randomblob(4000) FROM t1;   --   64
    INSERT INTO t1 SELECT randomblob(10), randomblob(4000) FROM t1;   --  128
    INSERT INTO t1 SELECT randomblob(10), randomblob(4000) FROM t1;   --  256
    INSERT INTO t1 SELECT randomblob(10), randomblob(4000) FROM t1;   --  512
    SELECT count(*) FROM t1
;SELECT count(*) FROM t1;