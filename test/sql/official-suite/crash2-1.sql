-- original: crash2.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

PRAGMA integrity_check
;SELECT count(*), md5sum(a), md5sum(b), md5sum(c) FROM abc
;INSERT INTO abc SELECT * FROM abc;
    INSERT INTO abc SELECT * FROM abc;
    INSERT INTO abc SELECT * FROM abc;
    INSERT INTO abc SELECT * FROM abc;
    INSERT INTO abc SELECT * FROM abc;