-- original: e_blobclose.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

CREATE TABLE x1(a INTEGER PRIMARY KEY, b DOTS);
  INSERT INTO x1 VALUES(-1, sub_dots);
  INSERT INTO x1 VALUES(-10, sub_dots);
  INSERT INTO x1 VALUES(-100, sub_dots);
  INSERT INTO x1 VALUES(-1000, sub_dots);
  INSERT INTO x1 VALUES(-10000, sub_dots)
;PRAGMA lock_status
;PRAGMA lock_status
;PRAGMA lock_status
;PRAGMA lock_status
;PRAGMA lock_status
;PRAGMA lock_status
;PRAGMA lock_status
;PRAGMA lock_status
;PRAGMA lock_status
;BEGIN
;PRAGMA lock_status
;COMMIT
;PRAGMA lock_status
;PRAGMA lock_status
;PRAGMA lock_status
;INSERT INTO x1 VALUES(15, val())
;PRAGMA lock_status
;SELECT * FROM x1 WHERE a = 15
;PRAGMA lock_status
;SELECT a, val() FROM x1 LIMIT 1
;INSERT INTO x1 VALUES(1, 'abc');
    SELECT * FROM x1 WHERE a=1
;SELECT * FROM x1 WHERE a=-10
;BEGIN ; SELECT * FROM x1
;PRAGMA lock_status
;SELECT * FROM x1 WHERE a IN (1, -10);