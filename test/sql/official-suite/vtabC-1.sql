-- original: vtabC.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

CREATE TABLE tsub_i(x)
;CREATE VIRTUAL TABLE vtsub_i USING echo(tsub_i)
;SELECT count(*) FROM sqlite_master
;SELECT name FROM sqlite_master
;CREATE TABLE m(a)
;SELECT count(*) FROM sqlite_master
;INSERT INTO m VALUES(1000);
      SELECT * FROM m
;SELECT * FROM tsub_j
;SELECT * FROM vtsub_j
;SELECT count(*) FROM sqlite_master
;INSERT INTO m VALUES(9000000);
      SELECT * FROM m
;SELECT * FROM tsub_j
;SELECT * FROM vtsub_j;