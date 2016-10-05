-- original: speed3.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

INSERT INTO main.t1 VALUES(sub_ii, sub_text, sub_ii)
;INSERT INTO aux.t1 SELECT * FROM main.t1
;PRAGMA main.cache_size = 200000;
    PRAGMA main.auto_vacuum = 'incremental';
    ATTACH 'test2.db' AS 'aux'; 
    PRAGMA aux.auto_vacuum = 'none'
;CREATE TABLE main.t1(a INTEGER, b TEXT, c INTEGER)
;SELECT name FROM sqlite_master ORDER BY 1
;CREATE TABLE aux.t1(a INTEGER, b TEXT, c INTEGER)
;SELECT name FROM aux.sqlite_master ORDER BY 1
;SELECT count(*) FROM main.t1;
    SELECT count(*) FROM aux.t1
;PRAGMA main.auto_vacuum;
    PRAGMA aux.auto_vacuum;