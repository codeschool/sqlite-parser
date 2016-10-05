-- original: auth.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

SELECT name FROM sqlite_master
;SELECT name FROM sqlite_master
;SELECT name FROM sqlite_temp_master
;SELECT name FROM sqlite_temp_master
;SELECT name FROM sqlite_master
;SELECT name FROM sqlite_master
;SELECT name FROM sqlite_temp_master
;SELECT name FROM sqlite_temp_master
;SELECT name FROM sqlite_temp_master
;SELECT name FROM sqlite_master
;SELECT name FROM sqlite_master
;SELECT name FROM sqlite_master
;SELECT name FROM sqlite_temp_master
;SELECT name FROM sqlite_temp_master
;SELECT * FROM t2
;SELECT * FROM t2
;SELECT * FROM t2
;ATTACH DATABASE 'test.db' AS two
;DETACH DATABASE two
;SELECT * FROM t2
;SELECT * FROM t2
;SELECT * FROM t2
;SELECT * FROM t2
;SELECT * FROM t2
;INSERT INTO t2 VALUES(11, 2, 33)
;INSERT INTO t2 VALUES(7, 8, 9)
;SELECT * FROM t2
;SELECT name FROM sqlite_master
;SELECT name FROM sqlite_master
;SELECT name FROM sqlite_temp_master
;SELECT name FROM sqlite_temp_master
;SELECT name FROM sqlite_master
;SELECT name FROM sqlite_master
;SELECT name FROM sqlite_temp_master
;SELECT name FROM sqlite_temp_master
;SELECT name FROM sqlite_master
;SELECT name FROM sqlite_master
;SELECT name FROM sqlite_temp_master
;SELECT name FROM sqlite_temp_master
;SELECT name FROM sqlite_master
;SELECT name FROM sqlite_master
;SELECT name FROM sqlite_temp_master
;SELECT name FROM sqlite_temp_master
;SELECT name FROM sqlite_master
;SELECT name FROM sqlite_master
;SELECT name FROM sqlite_master
;SELECT name FROM sqlite_master
;SELECT name FROM sqlite_master
;SELECT name FROM sqlite_temp_master
;SELECT name FROM sqlite_temp_master
;SELECT name FROM sqlite_temp_master
;SELECT name FROM sqlite_temp_master
;SELECT name FROM sqlite_temp_master
;SELECT name FROM sqlite_master
;SELECT name FROM sqlite_master
;SELECT name FROM sqlite_master
;SELECT name FROM sqlite_master
;SELECT name FROM sqlite_master WHERE type='trigger'
;INSERT INTO t2 VALUES(1,2,3)
;SELECT * FROM tx
;SELECT name FROM sqlite_master
;SELECT name FROM sqlite_temp_master
;SELECT name FROM sqlite_temp_master
;SELECT name FROM sqlite_temp_master
;SELECT name FROM sqlite_temp_master
;SELECT name FROM sqlite_temp_master
;SELECT name FROM sqlite_master
;SELECT name FROM sqlite_master
;SELECT name FROM sqlite_master
;SELECT name FROM sqlite_master
;DROP TABLE tx;
    DELETE FROM t2 WHERE a=1 AND b=2 AND c=3;
    SELECT name FROM sqlite_master
;SELECT name FROM sqlite_temp_master
;SELECT name FROM sqlite_temp_master
;SELECT name FROM sqlite_temp_master
;SELECT name FROM sqlite_temp_master
;SELECT name FROM sqlite_temp_master
;SELECT name FROM sqlite_master
;SELECT name FROM sqlite_master
;SELECT name FROM sqlite_master
;SELECT name FROM sqlite_master
;SELECT name FROM sqlite_master
;SELECT name FROM sqlite_temp_master
;SELECT name FROM sqlite_temp_master
;SELECT name FROM sqlite_temp_master
;SELECT name FROM sqlite_temp_master
;SELECT name FROM sqlite_temp_master
;SELECT name FROM sqlite_master
;SELECT name FROM sqlite_master
;SELECT name FROM sqlite_master
;SELECT name FROM sqlite_master
;SELECT name FROM sqlite_master
;SELECT name FROM sqlite_temp_master
;SELECT name FROM sqlite_temp_master
;SELECT name FROM sqlite_temp_master
;SELECT name FROM sqlite_temp_master
;SELECT name FROM sqlite_temp_master
;SELECT * FROM t2
;SELECT * FROM t2
;DETACH test1
;ATTACH sub_attachfilename AS test1;