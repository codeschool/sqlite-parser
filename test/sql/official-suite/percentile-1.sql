-- original: percentile.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

CREATE TABLE t1(x);
    INSERT INTO t1 VALUES(1),(4),(6),(7),(8),(9),(11),(11),(11)
;SELECT percentile(x,0) FROM t1
;SELECT percentile(x,sub_in) FROM t1
;INSERT INTO t1 VALUES(NULL),(NULL)
;SELECT percentile(x,sub_in) FROM t1
;CREATE TABLE t2(x);
    INSERT INTO t2 SELECT x+0.0 FROM t1 ORDER BY random()
;SELECT percentile(x,sub_in) FROM t2
;UPDATE t1 SET x=NULL;
    SELECT ifnull(percentile(x, 50),'NULL') FROM t1
;UPDATE t1 SET x=12345 WHERE rowid=5;
    SELECT percentile(x, 0), percentile(x, 50), percentile(x,100) FROM t1
;CREATE VIRTUAL TABLE nums USING wholenumber;
      CREATE TABLE t3(x);
      INSERT INTO t3 SELECT value-1 FROM nums WHERE value BETWEEN 1 AND 500000;
      INSERT INTO t3 SELECT value*10 FROM nums
                      WHERE value BETWEEN 500000 AND 999999;
      SELECT count(*) FROM t3
;SELECT round(percentile(x, sub_in),1) from t3;