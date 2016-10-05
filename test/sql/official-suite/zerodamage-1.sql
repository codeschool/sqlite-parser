-- original: zerodamage.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

PRAGMA page_size=1024;
    PRAGMA journal_mode=DELETE;
    PRAGMA cache_size=5;
    CREATE VIRTUAL TABLE nums USING wholenumber;
    CREATE TABLE t1(x, y);
    INSERT INTO t1 SELECT value, randomblob(100) FROM nums
                    WHERE value BETWEEN 1 AND 400
;UPDATE t1 SET y=randomblob(50) WHERE x=123
;UPDATE t1 SET y=randomblob(50) WHERE x=124
;PRAGMA journal_mode=WAL
;UPDATE t1 SET y=randomblob(50) WHERE x=124
;UPDATE t1 SET y=randomblob(50) WHERE x=124;