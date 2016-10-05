-- original: mmap3.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

PRAGMA mmap_size=100000;
    CREATE TABLE t1(x, y);
    CREATE VIRTUAL TABLE nums USING wholenumber;
    INSERT INTO t1 SELECT value, randomblob(value) FROM nums
                    WHERE value BETWEEN 1 and 1000;
    SELECT sum(x), sum(length(y)) from t1;
    PRAGMA mmap_size
;PRAGMA mmap_size=50000;
    CREATE TABLE t2(a,b);
    SELECT name FROM sqlite_master WHERE type='table' ORDER BY 1;
    PRAGMA quick_check;
    PRAGMA mmap_size
;PRAGMA mmap_size=250000;
    DROP TABLE t2;
    SELECT name FROM sqlite_master WHERE type='table' ORDER BY 1;
    PRAGMA quick_check;
    PRAGMA mmap_size
;SELECT x FROM t1 WHERE +x BETWEEN 10 AND 15
;PRAGMA mmap_size=150000
;PRAGMA quick_check;
    PRAGMA mmap_size
;SELECT x FROM t1 WHERE +x BETWEEN 10 AND 15
;PRAGMA mmap_size=0
;PRAGMA quick_check;
    PRAGMA mmap_size
;SELECT x FROM t1 WHERE +x BETWEEN 10 AND 15
;PRAGMA quick_check;
    PRAGMA mmap_size
;PRAGMA mmap_size(0);
    CREATE TABLE t3(a,b,c);
    SELECT name FROM sqlite_master WHERE type='table' ORDER BY 1;
    PRAGMA quick_check;
    PRAGMA mmap_size
;SELECT x FROM t1 WHERE +x BETWEEN 10 AND 15
;PRAGMA mmap_size=75000
;PRAGMA quick_check;
    PRAGMA mmap_size;