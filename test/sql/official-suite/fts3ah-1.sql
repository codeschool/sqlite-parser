-- original: fts3ah.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

CREATE VIRTUAL TABLE t1 USING fts3(content);
  INSERT INTO t1 (rowid, content) VALUES(1, sub_doc1);
  INSERT INTO t1 (rowid, content) VALUES(2, sub_doc2);
  INSERT INTO t1 (rowid, content) VALUES(3, sub_doc3)
;SELECT rowid FROM t1 WHERE t1 MATCH 'something'
;SELECT rowid FROM t1 WHERE t1 MATCH sub_aterm
;SELECT rowid FROM t1 WHERE t1 MATCH sub_xterm
;SELECT rowid FROM t1 WHERE t1 MATCH 'sub_aterm -sub_xterm'
;SELECT rowid FROM t1 WHERE t1 MATCH '"sub_aterm sub_bterm"';