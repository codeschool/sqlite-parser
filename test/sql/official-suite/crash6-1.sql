-- original: crash6.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

PRAGMA auto_vacuum=OFF;
    PRAGMA page_size=2048;
    BEGIN;
    CREATE TABLE abc AS SELECT 1 AS a, 2 AS b, 3 AS c;
    COMMIT
;SELECT count(*), md5sum(a), md5sum(b), md5sum(c) FROM abc
;pragma page_size = sub_pagesize
;pragma page_size
;CREATE TABLE abc(a, b, c)
;INSERT INTO abc SELECT * FROM abc;
      INSERT INTO abc SELECT * FROM abc;
      INSERT INTO abc SELECT * FROM abc;
      INSERT INTO abc SELECT * FROM abc;
      INSERT INTO abc SELECT * FROM abc;