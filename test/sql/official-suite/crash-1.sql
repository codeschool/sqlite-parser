-- original: crash.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

SELECT count(*), md5sum(a), md5sum(b), md5sum(c) FROM abc
;SELECT count(*), md5sum(a), md5sum(b), md5sum(c) FROM abc2
;CREATE TABLE abc(a, b, c);
    INSERT INTO abc VALUES(1, 2, 3);
    INSERT INTO abc VALUES(4, 5, 6)
;BEGIN
;COMMIT
;SELECT sum(a), sum(b), sum(c) from abc
;INSERT INTO abc SELECT * FROM abc;
    INSERT INTO abc SELECT * FROM abc;
    INSERT INTO abc SELECT * FROM abc;
    INSERT INTO abc SELECT * FROM abc;
    INSERT INTO abc SELECT * FROM abc
;ATTACH 'test2.db' AS aux;
      PRAGMA aux.default_cache_size = 10;
      CREATE TABLE aux.abc2 AS SELECT 2*a as a, 2*b as b, 2*c as c FROM abc
;CREATE TABLE abc(a, b, c);                          -- Root page 3
    INSERT INTO abc VALUES(randstr(1500,1500), 0, 0);   -- Overflow page 4
    INSERT INTO abc SELECT * FROM abc;
    INSERT INTO abc SELECT * FROM abc;
    INSERT INTO abc SELECT * FROM abc
;pragma auto_vacuum;