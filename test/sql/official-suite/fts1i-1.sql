-- original: fts1i.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

PRAGMA encoding = "UTF-16le";
  CREATE VIRTUAL TABLE t1 USING fts1(content)
;PRAGMA encoding
;INSERT INTO t1 (rowid, content) VALUES(1, 'one')
;SELECT content FROM t1 WHERE rowid = 1
;SELECT content FROM t1 WHERE rowid = 2
;SELECT content FROM t1 WHERE rowid = 3
;SELECT content FROM t1 WHERE rowid = 4
;SELECT content FROM t1 WHERE rowid = 5;