-- original: e_dropview.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

ATTACH 'test.db2' AS aux;
    CREATE TABLE t1(a, b); 
    INSERT INTO t1 VALUES('a main', 'b main');
    CREATE VIEW v1 AS SELECT * FROM t1;
    CREATE VIEW v2 AS SELECT * FROM t1;

    CREATE TEMP TABLE t1(a, b);
    INSERT INTO temp.t1 VALUES('a temp', 'b temp');
    CREATE VIEW temp.v1 AS SELECT * FROM t1;

    CREATE TABLE aux.t1(a, b);
    INSERT INTO aux.t1 VALUES('a aux', 'b aux');
    CREATE VIEW aux.v1 AS SELECT * FROM t1;
    CREATE VIEW aux.v2 AS SELECT * FROM t1;
    CREATE VIEW aux.v3 AS SELECT * FROM t1
;SELECT 'sub_name.' || name AS x FROM sub_tbl WHERE type = 'table'
;SELECT * FROM sub_x
;CREATE VIEW "new view" AS SELECT * FROM t1 AS x, t1 AS y;
  SELECT * FROM "new view"
;;
  SELECT * FROM sqlite_master WHERE name = 'new view'
;DROP VIEW "new view";
  SELECT * FROM sqlite_master WHERE name = 'new view'
;SELECT * FROM temp.v1
;DROP VIEW temp.v1
;SELECT * FROM v1
;DROP VIEW v1
;SELECT * FROM v2
;DROP VIEW v2
;SELECT * FROM v1
;DROP VIEW v1
;SELECT * FROM aux.v2
;DROP VIEW aux.v2
;SELECT * FROM v3
;DROP VIEW v3;