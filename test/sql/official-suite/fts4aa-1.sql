-- original: fts4aa.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

CREATE VIRTUAL TABLE t1 USING fts4(words, tokenize porter)
;SELECT docid FROM t1 WHERE words MATCH sub_q ORDER BY docid
;SELECT docid FROM t1 EXCEPT SELECT docid FROM t1_docsize
;SELECT docid FROM t1_docsize EXCEPT SELECT docid FROM t1
;SELECT docid, mit(matchinfo(t1, 'pcxnal')) FROM t1 WHERE t1 MATCH 'melchizedek'
;SELECT docid, mit(matchinfo(t1, 'pcxnal')) FROM t1
     WHERE t1 MATCH 'spake hebrew'
     ORDER BY docid
;SELECT docid, mit(matchinfo(t1, 'pcxnal')) FROM t1
     WHERE t1 MATCH 'laban overtook jacob'
     ORDER BY docid
;DELETE FROM t1 WHERE docid!=1050026;
    SELECT hex(size) FROM t1_docsize;
    SELECT hex(value) FROM t1_stat
;SELECT docid FROM t1 EXCEPT SELECT docid FROM t1_docsize
;SELECT docid FROM t1_docsize EXCEPT SELECT docid FROM t1
;SELECT docid, mit(matchinfo(t1, 'pcxnal')) FROM t1
       WHERE t1 MATCH 'joseph died in egypt'
       ORDER BY docid
;DROP TABLE t1;
    CREATE VIRTUAL TABLE t1 USING fts3(words, tokenize porter)
;SELECT docid FROM t1 WHERE words MATCH sub_q ORDER BY docid
;PRAGMA page_size=65536;
    CREATE VIRTUAL TABLE t1 USING fts4(words, tokenize porter)
;SELECT docid FROM t1 WHERE words MATCH sub_q ORDER BY docid
;DROP TABLE t1;
    CREATE VIRTUAL TABLE t1 USING fts4(words, tokenize porter)
;SELECT docid FROM t1 WHERE words MATCH sub_q ORDER BY docid;