-- original: select2.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

CREATE TABLE tbl1(f1 int, f2 int)
;BEGIN
;COMMIT
;CREATE TABLE tbl2(f1 int, f2 int, f3 int); BEGIN
;INSERT INTO tbl2 VALUES(sub_i,sub_i2,sub_i3)
;COMMIT
;DROP TABLE tbl2
;CREATE TABLE tbl2(f1 int, f2 int, f3 int); BEGIN
;INSERT INTO tbl2 VALUES(sub_i,sub_i2,sub_i3)
;COMMIT
;SELECT count(*) FROM tbl2
;SELECT count(*) FROM tbl2 WHERE f2>1000
;SELECT f1 FROM tbl2 WHERE 1000=f2
;CREATE INDEX idx1 ON tbl2(f2)
;SELECT f1 FROM tbl2 WHERE 1000=f2
;SELECT f1 FROM tbl2 WHERE f2=1000
;SELECT * FROM tbl2 WHERE 1000=f2
;SELECT * FROM tbl2 WHERE f2=1000
;DROP INDEX idx1
;SELECT f1 FROM tbl2 WHERE f2==2000
;CREATE TABLE aa(a);
    CREATE TABLE bb(b);
    INSERT INTO aa VALUES(1);
    INSERT INTO aa VALUES(3);
    INSERT INTO bb VALUES(2);
    INSERT INTO bb VALUES(4);
    SELECT * FROM aa, bb WHERE max(a,b)>2
;INSERT INTO bb VALUES(0);
    SELECT * FROM aa CROSS JOIN bb WHERE b
;SELECT * FROM aa CROSS JOIN bb WHERE NOT b
;SELECT * FROM aa, bb WHERE min(a,b)
;SELECT * FROM aa, bb WHERE NOT min(a,b)
;SELECT * FROM aa, bb WHERE CASE WHEN a=b-1 THEN 1 END
;SELECT * FROM aa, bb WHERE CASE WHEN a=b-1 THEN 0 ELSE 1 END;