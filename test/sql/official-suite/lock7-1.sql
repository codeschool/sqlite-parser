-- original: lock7.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

CREATE TABLE t1(a, b)
;BEGIN
;BEGIN
;PRAGMA lock_status
;PRAGMA lock_status
;PRAGMA lock_status
;PRAGMA lock_status
;COMMIT;