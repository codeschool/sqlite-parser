-- original: tkt2854.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

CREATE TABLE abc(a, b, c)
;BEGIN;
    SELECT * FROM abc
;SELECT * FROM abc
;COMMIT
;BEGIN EXCLUSIVE
;COMMIT
;SELECT * FROM abc
;CREATE TABLE def(d, e, f)
;ATTACH 'test2.db' AS aux
;BEGIN IMMEDIATE
;SELECT * FROM abc;