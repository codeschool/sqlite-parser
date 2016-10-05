-- original: analyzeA.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

ANALYZE
;PRAGMA writable_schema = on;
      CREATE TABLE sqlite_stat3(tbl,idx,neq,nlt,ndlt,sample);
      INSERT INTO sqlite_stat3 
      SELECT DISTINCT tbl, idx, 
        lindex(neq,0), lindex(nlt,0), lindex(ndlt,0), test_extract(sample, 0)
      FROM sqlite_stat4
;DROP TABLE sqlite_stat4
;PRAGMA writable_schema = off
;CREATE TABLE obscure_tbl_nm(x);
    DROP TABLE obscure_tbl_nm
;ANALYZE
;PRAGMA writable_schema = on;
      CREATE TABLE sqlite_stat4(tbl,idx,neq,nlt,ndlt,sample);
      INSERT INTO sqlite_stat4 
      SELECT tbl, idx, neq, nlt, ndlt, sqlite_record(sample) 
      FROM sqlite_stat3
;DROP TABLE sqlite_stat3
;PRAGMA writable_schema = off
;CREATE TABLE obscure_tbl_nm(x);
    DROP TABLE obscure_tbl_nm
;PRAGMA writable_schema = on;
    UPDATE sqlite_stat3 SET idx = 
      CASE idx WHEN 't1b' THEN 't1c' ELSE 't1b'
    END;
    PRAGMA writable_schema = off;
    CREATE TABLE obscure_tbl_nm(x);
    DROP TABLE obscure_tbl_nm
;CREATE TABLE t1(a INTEGER PRIMARY KEY, b INT, c INT)
;INSERT INTO t1 VALUES(sub_i, sub_b, sub_c)
;CREATE INDEX t1b ON t1(b)
;CREATE INDEX t1c ON t1(c);