-- original: select3.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

CREATE TABLE t1(n int, log int);
    BEGIN
;INSERT INTO t1 VALUES(sub_i,sub_j)
;COMMIT
;SELECT DISTINCT log FROM t1 ORDER BY log
;SELECT count(*) FROM t1
;SELECT min(n),min(log),max(n),max(log),sum(n),sum(log),avg(n),avg(log)
    FROM t1
;SELECT max(n)/avg(n), max(log)/avg(log) FROM t1
;SELECT log, count(*) FROM t1 GROUP BY log ORDER BY log
;SELECT log, min(n) FROM t1 GROUP BY log ORDER BY log
;SELECT log, avg(n) FROM t1 GROUP BY log ORDER BY log
;SELECT log, avg(n)+1 FROM t1 GROUP BY log ORDER BY log
;SELECT log, avg(n)-min(n) FROM t1 GROUP BY log ORDER BY log
;SELECT log*2+1, avg(n)-min(n) FROM t1 GROUP BY log ORDER BY log
;SELECT log*2+1 as x, count(*) FROM t1 GROUP BY x ORDER BY x
;SELECT log*2+1 AS x, count(*) AS y FROM t1 GROUP BY x ORDER BY y, x
;SELECT log*2+1 AS x, count(*) AS y FROM t1 GROUP BY x ORDER BY 10-(x+y)
;SELECT log, count(*) FROM t1 GROUP BY log HAVING log>=4 ORDER BY log
;SELECT log, count(*) FROM t1 
    GROUP BY log 
    HAVING count(*)>=4 
    ORDER BY log
;SELECT log, count(*) FROM t1 
    GROUP BY log 
    HAVING count(*)>=4 
    ORDER BY max(n)+0
;SELECT log AS x, count(*) AS y FROM t1 
    GROUP BY x
    HAVING y>=4 
    ORDER BY max(n)+0
;SELECT log AS x FROM t1 
    GROUP BY x
    HAVING count(*)>=4 
    ORDER BY max(n)+0
;SELECT log, count(*), avg(n), max(n+log*2) FROM t1 
    GROUP BY log 
    ORDER BY max(n+log*2)+0, avg(n)+0
;SELECT log, count(*), avg(n), max(n+log*2) FROM t1 
    GROUP BY log 
    ORDER BY max(n+log*2)+0, min(log,avg(n))+0
;SELECT log, min(n) FROM t1 GROUP BY log ORDER BY log
;SELECT log, min(n) FROM t1 GROUP BY log ORDER BY log DESC
;SELECT log, min(n) FROM t1 GROUP BY log ORDER BY 1
;SELECT log, min(n) FROM t1 GROUP BY log ORDER BY 1 DESC
;CREATE INDEX i1 ON t1(log);
    SELECT log, min(n) FROM t1 GROUP BY log ORDER BY log
;SELECT log, min(n) FROM t1 GROUP BY log ORDER BY log DESC
;SELECT log, min(n) FROM t1 GROUP BY log ORDER BY 1
;SELECT log, min(n) FROM t1 GROUP BY log ORDER BY 1 DESC
;CREATE TABLE t2(a,b);
    INSERT INTO t2 VALUES(1,2);
    SELECT a, sum(b) FROM t2 WHERE b=5 GROUP BY a
;SELECT a, sum(b) FROM t2 WHERE b=5
;CREATE TABLE A (
      A1 DOUBLE,
      A2 VARCHAR COLLATE NOCASE,
      A3 DOUBLE
    );
    INSERT INTO A VALUES(39136,'ABC',1201900000);
    INSERT INTO A VALUES(39136,'ABC',1207000000);
    SELECT typeof(sum(a3)) FROM a
;SELECT typeof(sum(a3)) FROM a GROUP BY a1;