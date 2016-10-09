-- original: tkt-cbd054fa6b.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

CREATE TABLE t1(a INTEGER PRIMARY KEY, b TEXT UNIQUE NOT NULL);
    CREATE INDEX t1_x ON t1(b);
    INSERT INTO t1 VALUES (NULL, '');
    INSERT INTO t1 VALUES (NULL, 'A');
    INSERT INTO t1 VALUES (NULL, 'B');
    INSERT INTO t1 VALUES (NULL, 'C');
    INSERT INTO t1 VALUES (NULL, 'D');
    INSERT INTO t1 VALUES (NULL, 'E');
    INSERT INTO t1 VALUES (NULL, 'F');
    INSERT INTO t1 VALUES (NULL, 'G');
    INSERT INTO t1 VALUES (NULL, 'H');
    INSERT INTO t1 VALUES (NULL, 'I');
    SELECT count(*) FROM t1
;ANALYZE
;PRAGMA writable_schema = 1;
      CREATE VIEW vvv AS 
      SELECT tbl,idx,neq,nlt,ndlt,test_extract(sample,0) AS sample
      FROM sqlite_stat4;
      PRAGMA writable_schema = 0
;CREATE VIEW vvv AS 
      SELECT tbl,idx,neq,nlt,ndlt,sample FROM sqlite_stat3
;SELECT tbl,idx,group_concat(s(sample),' ') 
    FROM vvv 
    WHERE idx = 't1_x' 
    GROUP BY tbl,idx
;DROP TABLE t1;
    CREATE TABLE t1(a INTEGER PRIMARY KEY, b BLOB UNIQUE NOT NULL);
    CREATE INDEX t1_x ON t1(b);
    INSERT INTO t1 VALUES(NULL, X'');
    INSERT INTO t1 VALUES(NULL, X'41');
    INSERT INTO t1 VALUES(NULL, X'42');
    INSERT INTO t1 VALUES(NULL, X'43');
    INSERT INTO t1 VALUES(NULL, X'44');
    INSERT INTO t1 VALUES(NULL, X'45');
    INSERT INTO t1 VALUES(NULL, X'46');
    INSERT INTO t1 VALUES(NULL, X'47');
    INSERT INTO t1 VALUES(NULL, X'48');
    INSERT INTO t1 VALUES(NULL, X'49');
    SELECT count(*) FROM t1
;ANALYZE
;SELECT tbl,idx,group_concat(s(sample),' ') 
    FROM vvv 
    WHERE idx = 't1_x' 
    GROUP BY tbl,idx;