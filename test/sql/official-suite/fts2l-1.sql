-- original: fts2l.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

CREATE VIRTUAL TABLE t4 USING fts2(content)
;INSERT INTO t4 (content) VALUES ('sub_phrase1')
;INSERT INTO t4 (content) VALUES ('sub_phrase2')
;SELECT rowid, length(snippet(t4)) FROM t4 WHERE t4 MATCH 'target';