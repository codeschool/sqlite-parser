-- original: tkt1567.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

CREATE TABLE t1(a TEXT PRIMARY KEY)
;BEGIN;
    UPDATE t1 SET a = a||'x' WHERE rowid%2==0
;COMMIT
;CREATE TABLE t2(a TEXT PRIMARY KEY, rowid INT) WITHOUT rowid
;BEGIN;
    UPDATE t2 SET a = a||'x' WHERE rowid%2==0
;COMMIT;