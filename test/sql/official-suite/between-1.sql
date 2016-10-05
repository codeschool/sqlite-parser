-- original: between.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

BEGIN;
    CREATE TABLE t1(w int, x int, y int, z int)
;INSERT INTO t1 VALUES(sub_w,sub_x,sub_y,sub_z)
;INSERT INTO t1 VALUES(:w,:x,:y,:z)
;CREATE UNIQUE INDEX i1w ON t1(w);
    CREATE INDEX i1xy ON t1(x,y);
    CREATE INDEX i1zyx ON t1(z,y,x);
    COMMIT;