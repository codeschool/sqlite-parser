-- original: fts3query.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

CREATE VIRTUAL TABLE t1 USING fts3(x);
    BEGIN;
      INSERT INTO t1 VALUES('The source code for SQLite is in the public')
;COMMIT
;CREATE VIRTUAL TABLE zoink USING fts3;
    INSERT INTO zoink VALUES('The apple falls far from the tree')
;SELECT docid FROM zoink WHERE zoink MATCH '(apple oranges) AND apple'
;SELECT docid FROM zoink WHERE zoink MATCH 'apple AND (oranges apple)'
;CREATE VIRTUAL TABLE foobar using FTS3(description, tokenize porter);
    INSERT INTO foobar (description) values ('
      Filed under: Emerging Technologies, EV/Plug-in, Hybrid, Chevrolet, GM, 
      ZENN 2011 Chevy Volt -Click above for high-res image gallery There are 
      16 days left in the month of December. Besides being time for most 
      Americans to kick their Christmas shopping sessions into high gear and
      start planning their resolutions for 2010, it also means that there''s
      precious little time for EEStor to "deliver functional technology" to
      Zenn Motors as promised. Still, the promises held out by the secretive
      company are too great for us to forget about entirely. We''d love for
      EEStor''s claims to be independently verified and proven accurate, as
      would just about anyone else looking to break free of petroleum in fav
    ')
;SELECT docid FROM foobar WHERE description MATCH '"high sp d"'
;SELECT mit(matchinfo(foobar)) FROM foobar WHERE foobar MATCH 'the'
;DROP TABLE IF EXISTS t1;
    CREATE TABLE t1(number INTEGER PRIMARY KEY, date);
    CREATE INDEX i1 ON t1(date);
    CREATE VIRTUAL TABLE ft USING fts3(title);
    CREATE TABLE bt(title)
;SELECT t1.number FROM t1, ft WHERE t1.number=ft.rowid ORDER BY t1.date
;SELECT t1.number FROM ft, t1 WHERE t1.number=ft.rowid ORDER BY t1.date
;SELECT t1.number FROM t1, bt WHERE t1.number=bt.rowid ORDER BY t1.date
;SELECT t1.number FROM bt, t1 WHERE t1.number=bt.rowid ORDER BY t1.date
;CREATE VIRTUAL TABLE t2 USING FTS4;
  INSERT INTO t2 VALUES('it was the first time in history')
;UPDATE t2_content SET c0content = X'1234'
;DROP TABLE t2
;CREATE VIRTUAL TABLE t3 USING FTS4(a, b);
  INSERT INTO t3 VALUES('no gestures', 'another intriguing discovery by observing the hand gestures (called beats) people make while speaking. Research has shown that such gestures do more than add visual emphasis to our words (many people gesture while they''re on the telephone, for example); it seems they actually help our brains find words')
;CREATE VIRTUAL TABLE ft4 USING fts4(x);
  CREATE TABLE t4(x)
;INSERT INTO ft4(rowid, x) VALUES(sub_iRowid, 'x y z');
          INSERT INTO  t4(rowid, x) VALUES(sub_iRowid, 'x y z')
;SELECT rowid FROM t4 WHERE rowid BETWEEN sub_iFirst AND sub_iLast
;SELECT rowid FROM t4 WHERE rowid BETWEEN sub_iFirst AND sub_iLast 
     ORDER BY +rowid DESC
;SELECT rowid FROM t4
;SELECT rowid FROM t4 WHERE rowid > sub_ii
;SELECT rowid FROM t4 WHERE rowid < sub_ii
;SELECT rowid FROM t4 WHERE rowid > sub_ii ORDER BY +rowid DESC
;SELECT rowid FROM t4 WHERE rowid < sub_ii ORDER BY +rowid DESC;