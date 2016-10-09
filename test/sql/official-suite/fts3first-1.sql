-- original: fts3first.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

CREATE VIRTUAL TABLE x3 USING fts3;
  INSERT INTO x3 VALUES('A B C');
  INSERT INTO x3 VALUES('B A C');

  CREATE VIRTUAL TABLE x4 USING fts4;
  INSERT INTO x4 VALUES('A B C');
  INSERT INTO x4 VALUES('B A C')
;SELECT * FROM x3 WHERE x3 MATCH '^A'
;SELECT * FROM x4 WHERE x4 MATCH '^A';