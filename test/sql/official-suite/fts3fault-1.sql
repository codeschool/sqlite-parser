-- original: fts3fault.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

CREATE VIRTUAL TABLE t1 USING fts3;
  INSERT INTO t1 VALUES('test renaming the table');
  INSERT INTO t1 VALUES(' after it has been written')
;BEGIN;
      INSERT INTO t1 VALUES('registers the FTS3 module');
      INSERT INTO t1 VALUES('various support functions')
;ALTER TABLE t1 RENAME TO t2
;CREATE VIRTUAL TABLE t3 USING fts4
;INSERT INTO t3(t3) VALUES('nodesize=50')
;BEGIN
;INSERT INTO t3 VALUES('aaa' || sub_i)
;COMMIT
;SELECT * FROM t3 WHERE t3 MATCH 'x'
;SELECT count(rowid) FROM t3 WHERE t3 MATCH 'aa*'
;CREATE VIRTUAL TABLE t4 USING fts4; 
    INSERT INTO t4 VALUES('The British Government called on');
    INSERT INTO t4 VALUES('as pesetas then became much')
;SELECT content FROM t4
;SELECT optimize(t4) FROM t4 LIMIT 1
;CREATE VIRTUAL TABLE t5 USING fts4; 
    INSERT INTO t5 VALUES('The British Government called on');
    INSERT INTO t5 VALUES('as pesetas then became much')
;BEGIN;
      INSERT INTO t5 VALUES('influential in shaping his future outlook');
      INSERT INTO t5 VALUES('might be acceptable to the British electorate')
;SELECT rowid FROM t5 WHERE t5 MATCH 'british'
;CREATE VIRTUAL TABLE t6 USING fts4
;SELECT rowid FROM t6
;DROP TABLE t6
;CREATE VIRTUAL TABLE t1 USING fts4(a, b, matchinfo=fts3)
;CREATE VIRTUAL TABLE t1 USING fts4(a, b, matchinfo=fs3)
;CREATE VIRTUAL TABLE t1 USING fts4(a, b, matchnfo=fts3)
;CREATE VIRTUAL TABLE t8 USING fts4
;INSERT INTO t8 VALUES('a b c')
;INSERT INTO t8 VALUES('b b b')
;INSERT INTO t8 VALUES('d d d')
;INSERT INTO t8 VALUES('e e e')
;INSERT INTO t8(t8) VALUES('optimize')
;SELECT mit(matchinfo(t8, 'x')) FROM t8 WHERE t8 MATCH 'a b c'
;SELECT mit(matchinfo(t8, 's')) FROM t8 WHERE t8 MATCH 'a b c'
;SELECT mit(matchinfo(t8, 'a')) FROM t8 WHERE t8 MATCH 'a b c'
;SELECT mit(matchinfo(t8, 'l')) FROM t8 WHERE t8 MATCH 'a b c'
;CREATE VIRTUAL TABLE t9 USING fts4(tokenize=porter);
    INSERT INTO t9 VALUES(
      'this record is used toooooooooooooooooooooooooooooooooooooo try to'
    );
    SELECT offsets(t9) FROM t9 WHERE t9 MATCH 'to*'
;SELECT offsets(t9) FROM t9 WHERE t9 MATCH 'to*';