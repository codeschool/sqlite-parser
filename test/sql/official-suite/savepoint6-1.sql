-- original: savepoint6.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

SELECT x, y FROM t1
;PRAGMA integrity_check
;PRAGMA incremental_vacuum
;SELECT count(*) FROM t1;