-- original: fts1porter.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

CREATE VIRTUAL TABLE t1 USING fts1(word, tokenize Porter)
;DELETE FROM t1_term;
      DELETE FROM t1_content;
      INSERT INTO t1(word) VALUES(sub_pfrom);
      SELECT term FROM t1_term;