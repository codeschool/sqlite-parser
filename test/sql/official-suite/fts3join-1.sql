-- original: fts3join.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

CREATE VIRTUAL TABLE ft1 USING fts4(x);
  INSERT INTO ft1 VALUES('aaa aaa');
  INSERT INTO ft1 VALUES('aaa bbb');
  INSERT INTO ft1 VALUES('bbb aaa');
  INSERT INTO ft1 VALUES('bbb bbb');

  CREATE TABLE t1(id, y);
  INSERT INTO t1 VALUES(1, 'aaa');
  INSERT INTO t1 VALUES(2, 'bbb')
;SELECT docid FROM ft1, t1 WHERE ft1 MATCH y AND id=1
;SELECT docid FROM ft1, t1 WHERE ft1 MATCH y AND id=1 ORDER BY docid
;CREATE VIRTUAL TABLE ft2 USING fts4(x);
  CREATE VIRTUAL TABLE ft3 USING fts4(y);

  INSERT INTO ft2 VALUES('abc');
  INSERT INTO ft2 VALUES('def');
  INSERT INTO ft3 VALUES('ghi');
  INSERT INTO ft3 VALUES('abc')
;SELECT * FROM ft2, ft3 WHERE x MATCH y
;SELECT * FROM ft2, ft3 WHERE y MATCH x
;SELECT * FROM ft3, ft2 WHERE x MATCH y
;SELECT * FROM ft3, ft2 WHERE y MATCH x;