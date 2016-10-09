-- original: bigrow.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

CREATE TABLE t1(a text, b text, c text);
    SELECT name FROM sqlite_master
      WHERE type='table' OR type='index'
      ORDER BY name
;SELECT a, c FROM t1
;SELECT b FROM t1
;SELECT b FROM t1 ORDER BY c
;SELECT c FROM t1 ORDER BY c
;DELETE FROM t1 WHERE a='abc2'
;SELECT c FROM t1
;UPDATE t1 SET a=b, b=a;
    SELECT b,c FROM t1
;SELECT * FROM t1
;INSERT INTO t1 VALUES('1','2','3');
    INSERT INTO t1 VALUES('A','B','C');
    SELECT b FROM t1 WHERE a=='1'
;SELECT b FROM t1 WHERE a=='sub_big1'
;SELECT b FROM t1 WHERE a!='sub_big1' ORDER BY a
;CREATE INDEX i1 ON t1(a)
;SELECT b FROM t1 WHERE a=='sub_big1'
;UPDATE t1 SET a=b, b=a
;SELECT b FROM t1 WHERE a=='abc'
;UPDATE t1 SET a=b, b=a
;SELECT b FROM t1 WHERE a=='sub_big1'
;DELETE FROM t1;
    INSERT INTO t1(a,b,c) VALUES('one','abcdefghijklmnopqrstuvwxyz0123','hi')
;SELECT a,length(b),c FROM t1
;UPDATE t1 SET b=b||b;
    UPDATE t1 SET b=b||b;
    UPDATE t1 SET b=b||b
;SELECT a,length(b),c FROM t1
;UPDATE t1 SET b=b||'sub_i'
;SELECT a,length(b),c FROM t1
;DELETE FROM t1;
    INSERT INTO t1(a,b,c) VALUES('one','abcdefghijklmnopqrstuvwxyz0123','hi')
;SELECT a,length(b),c FROM t1
;UPDATE t1 SET b=b||b;
    UPDATE t1 SET b=b||b;
    UPDATE t1 SET b=b||b;
    UPDATE t1 SET b=b||b;
    UPDATE t1 SET b=b||b;
    UPDATE t1 SET b=b||b;
    UPDATE t1 SET b=b||b;
    UPDATE t1 SET b=b||b;
    UPDATE t1 SET b=b||b;
    UPDATE t1 SET b=b||b;
    UPDATE t1 SET b=b||b;
    UPDATE t1 SET b=b||b
;SELECT a,length(b),c FROM t1
;UPDATE t1 SET b=substr(b,1,65515)
;SELECT a,length(b),c FROM t1
;UPDATE t1 SET b=b||'sub_i'
;SELECT a,length(b),c FROM t1
;DELETE FROM t1;
    INSERT INTO t1(a,b,c) VALUES('one','abcdefghijklmnopqrstuvwxyz0123','hi')
;SELECT a,length(b),c FROM t1
;UPDATE t1 SET b=b||b;
      SELECT a,length(b),c FROM t1
;SELECT length(b) FROM t1
;SELECT length(b) FROM t1
;DROP TABLE t1;