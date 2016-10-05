-- original: fts3an.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

CREATE VIRTUAL TABLE t1 USING fts3(c);

  INSERT INTO t1(rowid, c) VALUES(1, sub_text);
  INSERT INTO t1(rowid, c) VALUES(2, 'Another lovely row')
;SELECT rowid FROM t1 WHERE t1 MATCH 'lorem'
;SELECT rowid FROM t1 WHERE t1 MATCH 'lore*'
;SELECT rowid FROM t1 WHERE t1 MATCH 'lorem*'
;SELECT rowid FROM t1 WHERE t1 MATCH 'lore'
;SELECT rowid FROM t1 WHERE t1 MATCH 'lo*'
;SELECT rowid FROM t1 WHERE t1 MATCH 'l*'
;SELECT rowid FROM t1 WHERE t1 MATCH 'lov*'
;SELECT rowid FROM t1 WHERE t1 MATCH 'lo *'
;SELECT rowid FROM t1 WHERE t1 MATCH '*'
;SELECT rowid FROM t1 WHERE t1 MATCH '"lovely r*"'
;SELECT rowid FROM t1 WHERE t1 MATCH '"lovely r"'
;SELECT rowid FROM t1 WHERE t1 MATCH '"a* l*"'
;SELECT rowid FROM t1 WHERE t1 MATCH '"a* l* row"'
;CREATE VIRTUAL TABLE t2 USING fts3(c);

  INSERT INTO t2(rowid, c) VALUES(1, sub_text);
  INSERT INTO t2(rowid, c) VALUES(2, 'Another lovely row');
  UPDATE t2 SET c = sub_ntext WHERE rowid = 1
;SELECT rowid FROM t2 WHERE t2 MATCH 'lorem'
;SELECT rowid FROM t2 WHERE t2 MATCH 'lore*'
;SELECT rowid FROM t2 WHERE t2 MATCH 'lo*'
;SELECT rowid FROM t2 WHERE t2 MATCH 'l*'
;SELECT rowid FROM t2 WHERE t2 MATCH 'lov*'
;BEGIN;
  CREATE VIRTUAL TABLE t3 USING fts3(c);

  INSERT INTO t3(rowid, c) VALUES(1, sub_text);
  INSERT INTO t3(rowid, c) VALUES(2, 'Another lovely row')
;INSERT INTO t3(rowid, c) VALUES(3+sub_i, sub_bigtext)
;COMMIT
;SELECT offsets(t3) as o FROM t3 WHERE t3 MATCH 'l*'
;CREATE VIRTUAL TABLE ft USING fts3(x)
;INSERT INTO ft VALUES(NULL)
;INSERT INTO ft SELECT * FROM ft
;INSERT INTO ft SELECT * FROM ft
;INSERT INTO ft SELECT * FROM ft
;INSERT INTO ft SELECT * FROM ft
;INSERT INTO ft SELECT * FROM ft
;INSERT INTO ft SELECT * FROM ft
;INSERT INTO ft SELECT * FROM ft
;INSERT INTO ft SELECT * FROM ft
;INSERT INTO ft SELECT * FROM ft
;INSERT INTO ft SELECT * FROM ft
;INSERT INTO ft SELECT * FROM ft
;INSERT INTO ft SELECT * FROM ft
;INSERT INTO ft SELECT * FROM ft
;INSERT INTO ft SELECT * FROM ft
;INSERT INTO ft SELECT * FROM ft
;INSERT INTO ft SELECT * FROM ft
;INSERT INTO ft SELECT * FROM ft
;UPDATE ft SET x = 'abc' || rowid
;SELECT count(*) FROM ft WHERE x MATCH 'abc*';