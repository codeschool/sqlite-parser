-- original: incrvacuum3.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

PRAGMA integrity_check
;PRAGMA cache_size = 5;
    PRAGMA page_size = 1024;
    PRAGMA auto_vacuum = 2
;PRAGMA journal_mode = sub_jrnl_mode;