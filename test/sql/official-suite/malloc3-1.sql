-- original: malloc3.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

SELECT tbl_name FROM sqlite_master
;SELECT tbl_name FROM sqlite_master
;SELECT * FROM abc
;SELECT * FROM abc
;SELECT * FROM abc ORDER BY a DESC
;SELECT name, tbl_name FROM sqlite_master ORDER BY name;
      SELECT * FROM abc
;SELECT count(*) FROM abc
;SELECT min(
          (oid == a) AND 'String value ' || a == b AND a == length(c) 
      ) FROM abc
;SELECT count(*) FROM abc
;SELECT min(
          (oid == a) AND 'String value ' || a == b AND a == length(c) 
      ) FROM abc
;SELECT count(*) FROM abc
;SELECT min(
          (oid == a) AND 'String value ' || a == b AND a == length(c) 
      ) FROM abc
;SELECT a, b, c FROM abc
;SELECT a, b, c FROM abc
;PRAGMA cache_size = 10
;SELECT a, count(*) FROM abc GROUP BY a
;SELECT a, count(*) FROM abc GROUP BY a
;SELECT a, count(*) FROM abc GROUP BY a
;SELECT a, count(*) FROM abc GROUP BY a
;SELECT a, count(*) FROM abc GROUP BY a
;SELECT a, count(*) FROM abc GROUP BY a
;SELECT * FROM abc
;SELECT a, count(*) FROM abc GROUP BY a
;SELECT name, tbl_name FROM sqlite_master
;SELECT name, tbl_name FROM sqlite_master
;SELECT name, tbl_name FROM sqlite_master
;SELECT * FROM def, ghi WHERE d = g
;SELECT * FROM v1 WHERE d = g
;SELECT * FROM tbl2, def WHERE d = x
;SELECT * FROM tbl2, def WHERE d = x
;SELECT * FROM ghi;