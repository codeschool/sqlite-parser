-- original: vtab_alter.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

CREATE TABLE t1(a, b VARCHAR, c INTEGER)
;CREATE VIRTUAL TABLE t1echo USING echo(t1)
;ALTER TABLE t1echo RENAME TO new
;DROP TABLE new;
    DROP TABLE t1;
    CREATE TABLE t1_base(a, b, c);
    CREATE VIRTUAL TABLE t1 USING echo('*_base')
;INSERT INTO t1_base VALUES(1, 2, 3);
    SELECT * FROM t1
;ALTER TABLE t1 RENAME TO x
;SELECT * FROM x
;SELECT * FROM x_base
;CREATE TABLE y_base(a, b, c)
;SELECT * FROM x;