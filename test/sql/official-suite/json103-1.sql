-- original: json103.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

CREATE TABLE t1(a,b,c);
  WITH RECURSIVE c(x) AS (VALUES(1) UNION SELECT x+1 FROM c WHERE x<100)
  INSERT INTO t1(a,b,c) SELECT x, x%3, printf('n%d',x)  FROM c;
  UPDATE t1 SET a='orange' WHERE rowid=39;
  UPDATE t1 SET a=32.5 WHERE rowid=31;
  UPDATE t1 SET a=x'303132' WHERE rowid=29;
  UPDATE t1 SET a=NULL WHERE rowid=37;
  SELECT json_group_array(a) FROM t1 WHERE a<0 AND typeof(a)!='blob'
;SELECT json_group_array(a) FROM t1
   WHERE rowid BETWEEN 31 AND 39
;SELECT json_array_length(json_group_array(a)) FROM t1
   WHERE rowid BETWEEN 31 AND 39
;SELECT b, json_group_array(a) FROM t1 WHERE rowid<10 GROUP BY b ORDER BY b
;SELECT json_group_object(c,a) FROM t1 WHERE a<0 AND typeof(a)!='blob'
;SELECT json_group_object(c,a) FROM t1
   WHERE rowid BETWEEN 31 AND 39 AND rowid%2==1
;SELECT b, json_group_object(c,a) FROM t1
   WHERE rowid<7 GROUP BY b ORDER BY b;