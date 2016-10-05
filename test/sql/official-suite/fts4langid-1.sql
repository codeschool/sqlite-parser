-- original: fts4langid.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

CREATE VIRTUAL TABLE t1 USING fts4(a, b, languageid=lang_id)
;SELECT sql FROM sqlite_master WHERE name = 't1_content'
;SELECT docid FROM t1
;SELECT lang_id FROM t1
;INSERT INTO t1(a, b) VALUES('aaa', 'bbb')
;SELECT lang_id FROM t1
;INSERT INTO t1(a, b, lang_id) VALUES('aaa', 'bbb', 4)
;SELECT lang_id FROM t1
;INSERT INTO t1(a, b, lang_id) VALUES('aaa', 'bbb', 'xyz')
;SELECT lang_id FROM t1
;CREATE VIRTUAL TABLE t2 USING fts4;
  INSERT INTO t2 VALUES('abc')
;SELECT rowid FROM t2 WHERE content MATCH 'abc'
;DROP TABLE t1;
  CREATE VIRTUAL TABLE t1 USING fts4(languageid=lang_id);
  INSERT INTO t1(content)          VALUES('a b c');
  INSERT INTO t1(content, lang_id) VALUES('a b c', 1)
;SELECT rowid FROM t1 WHERE t1 MATCH 'b'
;SELECT rowid FROM t1 WHERE t1 MATCH 'b' AND lang_id = 0
;SELECT rowid FROM t1 WHERE t1 MATCH 'b' AND lang_id = 1
;DROP TABLE t1;
  CREATE VIRTUAL TABLE t1 USING fts4(languageid=lang_id);
  INSERT INTO t1(content, lang_id) VALUES('A', 13);
  INSERT INTO t1(content, lang_id) VALUES('B', 13);
  INSERT INTO t1(content, lang_id) VALUES('C', 13);
  INSERT INTO t1(content, lang_id) VALUES('D', 13);
  INSERT INTO t1(content, lang_id) VALUES('E', 13);
  INSERT INTO t1(content, lang_id) VALUES('F', 13);
  INSERT INTO t1(content, lang_id) VALUES('G', 13);
  INSERT INTO t1(content, lang_id) VALUES('H', 13);
  INSERT INTO t1(content, lang_id) VALUES('I', 13);
  INSERT INTO t1(content, lang_id) VALUES('J', 13);
  INSERT INTO t1(content, lang_id) VALUES('K', 13);
  INSERT INTO t1(content, lang_id) VALUES('L', 13);
  INSERT INTO t1(content, lang_id) VALUES('M', 13);
  INSERT INTO t1(content, lang_id) VALUES('N', 13);
  INSERT INTO t1(content, lang_id) VALUES('O', 13);
  INSERT INTO t1(content, lang_id) VALUES('P', 13);
  INSERT INTO t1(content, lang_id) VALUES('Q', 13);
  INSERT INTO t1(content, lang_id) VALUES('R', 13);
  INSERT INTO t1(content, lang_id) VALUES('S', 13);
  SELECT rowid FROM t1 WHERE t1 MATCH 'A'
;CREATE VIRTUAL TABLE t2 USING fts4(x, y, languageid=l)
;INSERT INTO t2(docid, x, y, l) VALUES(sub_i, sub_x, sub_y, sub_iLangid)
;CREATE TABLE data(x, y, l);
    INSERT INTO data(rowid, x, y, l) SELECT docid, x, y, l FROM t2
;SELECT rowid, x, y FROM data WHERE l = sub_langid ORDER BY rowid ASC
;INSERT INTO t2(t2) VALUES('optimize');
  SELECT count(*) FROM t2_segdir
;INSERT INTO t2(t2) VALUES('rebuild')
;CREATE TABLE t3_data(l, x, y);
    INSERT INTO t3_data(rowid, l, x, y) SELECT docid, l, x, y FROM t2;
    DROP TABLE t2
;CREATE VIRTUAL TABLE t2 USING fts4(content=t3_data, languageid=l);
  INSERT INTO t2(t2) VALUES('rebuild')
;DROP TABLE t2;
  CREATE VIRTUAL TABLE t2 USING fts4(x, y, languageid=l, content=nosuchtable)
;INSERT INTO t2(docid, x, y, l) SELECT rowid, x, y, l FROM t3_data
;DROP TABLE t3_data
;CREATE VIRTUAL TABLE t4 USING fts4(
        tokenize=testtokenizer, 
        languageid=lid
    )
;INSERT INTO t4(docid, content, lid) VALUES(sub_i, 'The Quick Brown Fox', sub_i)
;SELECT fts3_tokenizer('testtokenizer', sub_ptr)
;SELECT docid FROM t4 WHERE t4 MATCH 'quick'
;SELECT docid FROM t4 WHERE t4 MATCH 'quick' AND lid=1
;SELECT docid FROM t4 WHERE t4 MATCH 'Quick' AND lid=1
;CREATE VIRTUAL TABLE t5 USING fts4(languageid=lid)
;INSERT INTO t5(docid, content, lid) VALUES(
          sub_lid, 'My language is ' || sub_lid, sub_lid
      )
;SELECT level FROM t5_segdir
;SELECT docid FROM t5 WHERE t5 MATCH 'language'
;CREATE VIRTUAL TABLE t6 USING fts4(languageid=lid);
  INSERT INTO t6 VALUES('I belong to language 0!')
;INSERT INTO t6(content, lid) VALUES(
        'I (row '||sub_i||') belong to langauge N!', sub_lid
      )
;SELECT docid FROM t6 WHERE t6 MATCH 'belong'
;SELECT docid FROM t6 WHERE t6 MATCH 'belong' AND lid=sub_lid
;INSERT INTO t6(t6) VALUES('optimize')
;SELECT docid FROM t6 WHERE t6 MATCH 'belong'
;SELECT docid FROM t6 WHERE t6 MATCH 'belong' AND lid=sub_lid;