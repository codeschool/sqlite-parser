-- original: pageropt.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

PRAGMA auto_vacuum = OFF;
    PRAGMA page_size = 1024
;CREATE TABLE t2(y);