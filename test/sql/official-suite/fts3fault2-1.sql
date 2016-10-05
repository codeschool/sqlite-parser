-- original: fts3fault2.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

CREATE VIRTUAL TABLE t1 USING fts4(x);
    INSERT INTO t1 VALUES('a b c');
    INSERT INTO t1 VALUES('c d e');
    CREATE VIRTUAL TABLE terms USING fts4aux(t1)
;SELECT * FROM sqlite_master
;CREATE VIRTUAL TABLE terms2 USING fts4aux(t1)
;SELECT * FROM sqlite_master
;SELECT * FROM terms
;SELECT * FROM sqlite_master
;SELECT * FROM terms WHERE term>'a' AND TERM < 'd'
;SELECT * FROM sqlite_master
;SELECT * FROM terms WHERE term='c'
;CREATE VIRTUAL TABLE tx USING fts4(a, b);
    INSERT INTO tx VALUES('a b c', 'x y z');
    CREATE VIRTUAL TABLE terms2 USING fts4aux(tx)
;SELECT * FROM sqlite_master
;SELECT * FROM terms2
;CREATE TABLE 'xx yy'(a, b)
;CREATE VIRTUAL TABLE tt USING fts4(content="xx yy")
;CREATE VIRTUAL TABLE tt USING fts4(compress=zip, uncompress=unzip)
;CREATE VIRTUAL TABLE ft USING fts4(a, b);
    INSERT INTO ft VALUES('U U T C O', 'F N D E S');
    INSERT INTO ft VALUES('P H X G B', 'I D M R U');
    INSERT INTO ft VALUES('P P X D M', 'Y V N T C');
    INSERT INTO ft VALUES('Z L Q O W', 'D F U N Q');
    INSERT INTO ft VALUES('A J D U P', 'C H M Q E');
    INSERT INTO ft VALUES('P S A O H', 'S Z C W D');
    INSERT INTO ft VALUES('T B N L W', 'C A K T I');
    INSERT INTO ft VALUES('K E Z L O', 'L L Y C E');
    INSERT INTO ft VALUES('C R E S V', 'Q V F W P');
    INSERT INTO ft VALUES('S K H G W', 'R W Q F G')
;SELECT * FROM sqlite_master
;INSERT INTO ft(ft) VALUES('rebuild')
;SELECT * FROM sqlite_master
;INSERT INTO ft VALUES('the quick brown fox')
;INSERT INTO ft VALUES(
       'theunusuallylongtokenthatjustdragsonandonandonandthendragsonsomemoreeof'
      )
;SELECT docid FROM ft WHERE ft MATCH 'th*'
;SELECT * FROM sqlite_master
;SELECT docid FROM t6 WHERE t6 MATCH '"a* b"';