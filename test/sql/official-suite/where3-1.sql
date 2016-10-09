-- original: where3.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

CREATE TABLE t1(a, b);
    CREATE TABLE t2(p, q);
    CREATE TABLE t3(x, y);
    
    INSERT INTO t1 VALUES(111,'one');
    INSERT INTO t1 VALUES(222,'two');
    INSERT INTO t1 VALUES(333,'three');
    
    INSERT INTO t2 VALUES(1,111);
    INSERT INTO t2 VALUES(2,222);
    INSERT INTO t2 VALUES(4,444);
    CREATE INDEX t2i1 ON t2(p);
    
    INSERT INTO t3 VALUES(999,'nine');
    CREATE INDEX t3i1 ON t3(x);
    
    SELECT * FROM t1, t2 LEFT JOIN t3 ON q=x WHERE p=2 AND a=q
;CREATE TABLE parent1(parent1key, child1key, Child2key, child3key);
    CREATE TABLE child1 ( child1key NVARCHAR, value NVARCHAR );
    CREATE UNIQUE INDEX PKIDXChild1 ON child1 ( child1key );
    CREATE TABLE child2 ( child2key NVARCHAR, value NVARCHAR );

    INSERT INTO parent1(parent1key,child1key,child2key)
       VALUES ( 1, 'C1.1', 'C2.1' );
    INSERT INTO child1 ( child1key, value ) VALUES ( 'C1.1', 'Value for C1.1' );
    INSERT INTO child2 ( child2key, value ) VALUES ( 'C2.1', 'Value for C2.1' );

    INSERT INTO parent1 ( parent1key, child1key, child2key )
       VALUES ( 2, 'C1.2', 'C2.2' );
    INSERT INTO child2 ( child2key, value ) VALUES ( 'C2.2', 'Value for C2.2' );

    INSERT INTO parent1 ( parent1key, child1key, child2key )
       VALUES ( 3, 'C1.3', 'C2.3' );
    INSERT INTO child1 ( child1key, value ) VALUES ( 'C1.3', 'Value for C1.3' );
    INSERT INTO child2 ( child2key, value ) VALUES ( 'C2.3', 'Value for C2.3' );

    SELECT parent1.parent1key, child1.value, child2.value
    FROM parent1
    LEFT OUTER JOIN child1 ON child1.child1key = parent1.child1key
    INNER JOIN child2 ON child2.child2key = parent1.child2key
;CREATE TABLE tA(apk integer primary key, ax);
    CREATE TABLE tB(bpk integer primary key, bx);
    CREATE TABLE tC(cpk integer primary key, cx);
    CREATE TABLE tD(dpk integer primary key, dx)
;CREATE TABLE t301(a INTEGER PRIMARY KEY,b,c);
  CREATE INDEX t301c ON t301(c);
  INSERT INTO t301 VALUES(1,2,3);
  INSERT INTO t301 VALUES(2,2,3);
  CREATE TABLE t302(x, y);
  INSERT INTO t302 VALUES(4,5);
  ANALYZE;
  explain query plan SELECT * FROM t302, t301 WHERE t302.x=5 AND t301.a=t302.y
;explain query plan
  SELECT * FROM t301, t302 WHERE t302.x=5 AND t301.a=t302.y
;SELECT * FROM t301 WHERE c=3 AND a IS NULL
;SELECT * FROM t301 WHERE c=3 AND a IS NOT NULL
;CREATE TABLE t400(a INTEGER PRIMARY KEY, b, c);
  CREATE TABLE t401(p INTEGER PRIMARY KEY, q, r);
  CREATE TABLE t402(x INTEGER PRIMARY KEY, y, z);
  EXPLAIN QUERY PLAN
  SELECT * FROM t400, t401, t402 WHERE t402.z GLOB 'abc*'
;EXPLAIN QUERY PLAN
  SELECT * FROM t400, t401, t402 WHERE t401.r GLOB 'abc*'
;EXPLAIN QUERY PLAN
  SELECT * FROM t400, t401, t402 WHERE t400.c GLOB 'abc*'
;CREATE TABLE aaa (id INTEGER PRIMARY KEY, type INTEGER,
                    fk INTEGER DEFAULT NULL, parent INTEGER,
                    position INTEGER, title LONGVARCHAR,
                    keyword_id INTEGER, folder_type TEXT,
                    dateAdded INTEGER, lastModified INTEGER);
  CREATE INDEX aaa_111 ON aaa (fk, type);
  CREATE INDEX aaa_222 ON aaa (parent, position);
  CREATE INDEX aaa_333 ON aaa (fk, lastModified);
  CREATE TABLE bbb (id INTEGER PRIMARY KEY, type INTEGER,
                    fk INTEGER DEFAULT NULL, parent INTEGER,
                    position INTEGER, title LONGVARCHAR,
                    keyword_id INTEGER, folder_type TEXT,
                    dateAdded INTEGER, lastModified INTEGER);
  CREATE INDEX bbb_111 ON bbb (fk, type);
  CREATE INDEX bbb_222 ON bbb (parent, position);
  CREATE INDEX bbb_333 ON bbb (fk, lastModified);

  EXPLAIN QUERY PLAN
   SELECT bbb.title AS tag_title 
     FROM aaa JOIN bbb ON bbb.id = aaa.parent  
    WHERE aaa.fk = 'constant'
      AND LENGTH(bbb.title) > 0
      AND bbb.parent = 4
    ORDER BY bbb.title COLLATE NOCASE ASC
;EXPLAIN QUERY PLAN
   SELECT bbb.title AS tag_title 
     FROM aaa JOIN aaa AS bbb ON bbb.id = aaa.parent  
    WHERE aaa.fk = 'constant'
      AND LENGTH(bbb.title) > 0
      AND bbb.parent = 4
    ORDER BY bbb.title COLLATE NOCASE ASC
;EXPLAIN QUERY PLAN
   SELECT bbb.title AS tag_title 
     FROM bbb JOIN aaa ON bbb.id = aaa.parent  
    WHERE aaa.fk = 'constant'
      AND LENGTH(bbb.title) > 0
      AND bbb.parent = 4
    ORDER BY bbb.title COLLATE NOCASE ASC
;EXPLAIN QUERY PLAN
   SELECT bbb.title AS tag_title 
     FROM aaa AS bbb JOIN aaa ON bbb.id = aaa.parent  
    WHERE aaa.fk = 'constant'
      AND LENGTH(bbb.title) > 0
      AND bbb.parent = 4
    ORDER BY bbb.title COLLATE NOCASE ASC
;CREATE TABLE t6w(a, w);
    INSERT INTO t6w VALUES(1, 'w-one');
    INSERT INTO t6w VALUES(2, 'w-two');
    INSERT INTO t6w VALUES(9, 'w-nine');
    CREATE TABLE t6x(a, x);
    INSERT INTO t6x VALUES(1, 'x-one');
    INSERT INTO t6x VALUES(3, 'x-three');
    INSERT INTO t6x VALUES(9, 'x-nine');
    CREATE TABLE t6y(a, y);
    INSERT INTO t6y VALUES(1, 'y-one');
    INSERT INTO t6y VALUES(4, 'y-four');
    INSERT INTO t6y VALUES(9, 'y-nine');
    CREATE TABLE t6z(a, z);
    INSERT INTO t6z VALUES(1, 'z-one');
    INSERT INTO t6z VALUES(5, 'z-five');
    INSERT INTO t6z VALUES(9, 'z-nine')
;CREATE TABLE t71(x1 INTEGER PRIMARY KEY, y1);
  CREATE TABLE t72(x2 INTEGER PRIMARY KEY, y2);
  CREATE TABLE t73(x3, y3);
  CREATE TABLE t74(x4, y4);
  INSERT INTO t71 VALUES(123,234);
  INSERT INTO t72 VALUES(234,345);
  INSERT INTO t73 VALUES(123,234);
  INSERT INTO t74 VALUES(234,345);
  INSERT INTO t74 VALUES(234,678);