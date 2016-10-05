-- original: collate7.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

PRAGMA encoding='utf-16';
    CREATE TABLE abc16(a COLLATE CASELESS, b, c)
;SELECT * FROM abc16 WHERE a < 'abc';