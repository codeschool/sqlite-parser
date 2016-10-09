-- original: walcrash.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

SELECT sum(a)==max(b) FROM t1
;SELECT sum(a)==max(b) FROM t1
;PRAGMA main.journal_mode
;SELECT sum(a)==max(b) FROM t1
;SELECT sum(a)==max(b) FROM t1
;PRAGMA main.journal_mode
;SELECT * FROM t1 WHERE a = 1
;PRAGMA main.integrity_check
;PRAGMA main.journal_mode
;SELECT count(*)==33 OR count(*)==34 FROM t1 WHERE x != 1
;PRAGMA main.integrity_check
;PRAGMA main.journal_mode
;SELECT count(*)==34 OR count(*)==35 FROM t1 WHERE x != 1
;PRAGMA main.integrity_check
;PRAGMA main.journal_mode
;SELECT b FROM t1 WHERE a = 1
;PRAGMA main.integrity_check
;PRAGMA main.journal_mode;