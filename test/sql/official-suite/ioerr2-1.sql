-- original: ioerr2.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

PRAGMA cache_size = 10;
    PRAGMA default_cache_size = 10;
    CREATE TABLE t1(a, b, PRIMARY KEY(a, b));
    INSERT INTO t1 VALUES(randstr(400,400),randstr(400,400));
    INSERT INTO t1 SELECT randstr(400,400), randstr(400,400) FROM t1; -- 2
    INSERT INTO t1 SELECT randstr(400,400), randstr(400,400) FROM t1; -- 4
    INSERT INTO t1 SELECT randstr(400,400), randstr(400,400) FROM t1; -- 8
    INSERT INTO t1 SELECT randstr(400,400), randstr(400,400) FROM t1; -- 16
    INSERT INTO t1 SELECT randstr(400,400), randstr(400,400) FROM t1; -- 32
;SELECT md5sum(a, b) FROM t1
;SELECT md5sum(a, b) FROM t1
;CREATE TABLE t2 AS SELECT * FROM t1;
    PRAGMA temp_store = memory
;PRAGMA cache_size = 10;
  PRAGMA auto_vacuum = 1;
  CREATE TABLE ab(a, b);
  CREATE TABLE de(d, e);
  INSERT INTO ab VALUES(1, randstr(200,200));
  INSERT INTO ab SELECT a+1, randstr(200,200) FROM ab;
  INSERT INTO ab SELECT a+2, randstr(200,200) FROM ab;
  INSERT INTO ab SELECT a+4, randstr(200,200) FROM ab;
  INSERT INTO ab SELECT a+8, randstr(200,200) FROM ab;
  INSERT INTO ab SELECT a+16, randstr(200,200) FROM ab;
  INSERT INTO ab SELECT a+32, randstr(200,200) FROM ab;
  INSERT INTO ab SELECT a+64, randstr(200,200) FROM ab;
  INSERT INTO de SELECT * FROM ab;