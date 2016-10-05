-- original: analyze5.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

CREATE TABLE t1(t,u,v TEXT COLLATE nocase,w,x,y,z)
;INSERT INTO t1 VALUES(sub_t,sub_u,sub_v,sub_w,sub_x,sub_y,sub_z)
;CREATE INDEX t1t ON t1(t);  -- 0.5, 1.5, 2.5, and 3.5
    CREATE INDEX t1u ON t1(u);  -- text
    CREATE INDEX t1v ON t1(v);  -- mixed case text
    CREATE INDEX t1w ON t1(w);  -- integers 0, 1, 2 and a few NULLs
    CREATE INDEX t1x ON t1(x);  -- integers 1, 2, 3 and many NULLs
    CREATE INDEX t1y ON t1(y);  -- integers 0 and very few 1s
    CREATE INDEX t1z ON t1(z);  -- integers 0, 1, 2, and 3
    ANALYZE
;SELECT DISTINCT lindex(test_decode(sample),0) 
        FROM sqlite_stat4 WHERE idx='t1u' ORDER BY nlt
;SELECT sample FROM sqlite_stat3 WHERE idx='t1u' ORDER BY nlt
;SELECT DISTINCT lower(lindex(test_decode(sample), 0)) 
        FROM sqlite_stat4 WHERE idx='t1v' ORDER BY 1
;SELECT lower(sample) FROM sqlite_stat3 WHERE idx='t1v' ORDER BY 1
;SELECT idx, count(*) FROM sqlite_stat4 GROUP BY 1 ORDER BY 1
;SELECT idx, count(*) FROM sqlite_stat3 GROUP BY 1 ORDER BY 1
;UPDATE t1 SET x=NULL;
   UPDATE t1 SET x=rowid
    WHERE rowid IN (SELECT rowid FROM t1 ORDER BY random() LIMIT 5);
   ANALYZE;