-- original: fts3sort.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

CREATE VIRTUAL TABLE t1 USING fts4(sub_param)
;INSERT INTO t1 VALUES(sub_doc)
;SELECT count(*) FROM t1
;DROP TABLE IF EXISTS t1
;SELECT docid FROM t2 WHERE t2 MATCH 'aa'
;SELECT docid FROM t2 WHERE t2 MATCH 'aa' ORDER BY content
;CREATE VIRTUAL TABLE t4 USING fts4(x);
  INSERT INTO t4(docid, x) VALUES(-113382409004785664, 'aa');
  INSERT INTO t4(docid, x) VALUES(1, 'ab');
  SELECT rowid FROM t4 WHERE x MATCH 'a*';