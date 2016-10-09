-- original: orderby1.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

BEGIN;
    CREATE TABLE album(
      aid INTEGER PRIMARY KEY,
      title TEXT UNIQUE NOT NULL
    );
    CREATE TABLE track(
      tid INTEGER PRIMARY KEY,
      aid INTEGER NOT NULL REFERENCES album,
      tn INTEGER NOT NULL,
      name TEXT,
      UNIQUE(aid, tn)
    );
    INSERT INTO album VALUES(1, '1-one'), (2, '2-two'), (3, '3-three');
    INSERT INTO track VALUES
        (NULL, 1, 1, 'one-a'),
        (NULL, 2, 2, 'two-b'),
        (NULL, 3, 3, 'three-c'),
        (NULL, 1, 3, 'one-c'),
        (NULL, 2, 1, 'two-a'),
        (NULL, 3, 1, 'three-a');
    COMMIT
;SELECT name FROM album JOIN track USING (aid) ORDER BY title, tn
;EXPLAIN QUERY PLAN
    SELECT name FROM album CROSS JOIN track USING (aid) ORDER BY title, tn
;SELECT name FROM album JOIN track USING (aid) ORDER BY +title, +tn
;EXPLAIN QUERY PLAN
    SELECT name FROM album JOIN track USING (aid) ORDER BY +title, +tn
;SELECT name FROM album JOIN track USING (aid) ORDER BY title, tn
;EXPLAIN QUERY PLAN
    SELECT name FROM album JOIN track USING (aid) ORDER BY title, tn
;SELECT name FROM album JOIN track USING (aid) ORDER BY title DESC, tn
;SELECT name FROM album JOIN track USING (aid) ORDER BY +title DESC, +tn
;EXPLAIN QUERY PLAN
    SELECT name FROM album JOIN track USING (aid) ORDER BY title DESC, tn
;SELECT name FROM album JOIN track USING (aid) ORDER BY title, tn DESC
;SELECT name FROM album JOIN track USING (aid) ORDER BY +title, +tn DESC
;EXPLAIN QUERY PLAN
    SELECT name FROM album JOIN track USING (aid) ORDER BY title, tn DESC
;SELECT name FROM album CROSS JOIN track USING (aid)
     ORDER BY title DESC, tn DESC
;SELECT name FROM album CROSS JOIN track USING (aid)
     ORDER BY +title DESC, +tn DESC
;EXPLAIN QUERY PLAN
    SELECT name FROM album CROSS JOIN track USING (aid)
     ORDER BY title DESC, tn DESC
;BEGIN;
    DROP TABLE album;
    DROP TABLE track;
    CREATE TABLE album(
      aid INT PRIMARY KEY,
      title TEXT NOT NULL
    );
    CREATE INDEX album_i1 ON album(title, aid);
    CREATE TABLE track(
      aid INTEGER NOT NULL REFERENCES album,
      tn INTEGER NOT NULL,
      name TEXT,
      UNIQUE(aid, tn)
    );
    INSERT INTO album VALUES(1, '1-one'), (20, '2-two'), (3, '3-three');
    INSERT INTO track VALUES
        (1,  1, 'one-a'),
        (20, 2, 'two-b'),
        (3,  3, 'three-c'),
        (1,  3, 'one-c'),
        (20, 1, 'two-a'),
        (3,  1, 'three-a');
    COMMIT
;SELECT name FROM album JOIN track USING (aid) ORDER BY title, tn
;EXPLAIN QUERY PLAN
    SELECT name FROM album JOIN track USING (aid) ORDER BY title, tn
;SELECT name FROM album JOIN track USING (aid) ORDER BY title, aid, tn
;EXPLAIN QUERY PLAN
    SELECT name FROM album JOIN track USING (aid) ORDER BY title, aid, tn
;SELECT name FROM album JOIN track USING (aid) ORDER BY +title, +tn
;EXPLAIN QUERY PLAN
    SELECT name FROM album JOIN track USING (aid) ORDER BY +title, +tn
;SELECT name FROM album JOIN track USING (aid) ORDER BY title, tn
;EXPLAIN QUERY PLAN
    SELECT name FROM album JOIN track USING (aid) ORDER BY title, tn
;SELECT name FROM album JOIN track USING (aid) ORDER BY title DESC, tn
;SELECT name FROM album JOIN track USING (aid) ORDER BY +title DESC, +tn
;EXPLAIN QUERY PLAN
    SELECT name FROM album JOIN track USING (aid) ORDER BY title DESC, tn
;SELECT name FROM album JOIN track USING (aid) ORDER BY title, tn DESC
;SELECT name FROM album JOIN track USING (aid) ORDER BY +title, +tn DESC
;EXPLAIN QUERY PLAN
    SELECT name FROM album JOIN track USING (aid) ORDER BY title, tn DESC
;SELECT name FROM album JOIN track USING (aid) ORDER BY title DESC, tn DESC
;SELECT name FROM album JOIN track USING (aid) ORDER BY +title DESC, +tn DESC
;EXPLAIN QUERY PLAN
    SELECT name FROM album JOIN track USING (aid) ORDER BY title DESC, tn DESC
;BEGIN;
    DROP TABLE album;
    DROP TABLE track;
    CREATE TABLE album(
      aid INTEGER PRIMARY KEY,
      title TEXT UNIQUE NOT NULL
    );
    CREATE TABLE track(
      tid INTEGER PRIMARY KEY,
      aid INTEGER NOT NULL REFERENCES album,
      tn INTEGER NOT NULL,
      name TEXT,
      UNIQUE(aid ASC, tn DESC)
    );
    INSERT INTO album VALUES(1, '1-one'), (2, '2-two'), (3, '3-three');
    INSERT INTO track VALUES
        (NULL, 1, 1, 'one-a'),
        (NULL, 2, 2, 'two-b'),
        (NULL, 3, 3, 'three-c'),
        (NULL, 1, 3, 'one-c'),
        (NULL, 2, 1, 'two-a'),
        (NULL, 3, 1, 'three-a');
    COMMIT
;SELECT name FROM album CROSS JOIN track USING (aid) ORDER BY title, tn DESC
;EXPLAIN QUERY PLAN
    SELECT name FROM album CROSS JOIN track USING (aid) ORDER BY title, tn DESC
;SELECT name FROM album JOIN track USING (aid) ORDER BY +title, +tn DESC
;EXPLAIN QUERY PLAN
    SELECT name FROM album JOIN track USING (aid) ORDER BY +title, +tn DESC
;SELECT name FROM album JOIN track USING (aid) ORDER BY title, tn DESC
;EXPLAIN QUERY PLAN
    SELECT name FROM album JOIN track USING (aid) ORDER BY title, tn DESC
;SELECT name FROM album JOIN track USING (aid) ORDER BY title, tn
;SELECT name FROM album JOIN track USING (aid) ORDER BY +title, +tn
;EXPLAIN QUERY PLAN
    SELECT name FROM album JOIN track USING (aid) ORDER BY title, tn
;SELECT name FROM album JOIN track USING (aid) ORDER BY title DESC, tn DESC
;SELECT name FROM album JOIN track USING (aid) ORDER BY +title DESC, +tn DESC
;EXPLAIN QUERY PLAN
    SELECT name FROM album JOIN track USING (aid) ORDER BY title DESC, tn DESC
;SELECT name FROM album CROSS JOIN track USING (aid) ORDER BY title DESC, tn
;SELECT name FROM album CROSS JOIN track USING (aid)
     ORDER BY +title DESC, +tn
;EXPLAIN QUERY PLAN
    SELECT name FROM album CROSS JOIN track USING (aid) ORDER BY title DESC, tn
;CREATE TABLE t41(a INT UNIQUE NOT NULL, b INT NOT NULL);
    CREATE INDEX t41ba ON t41(b,a);
    CREATE TABLE t42(x INT NOT NULL REFERENCES t41(a), y INT NOT NULL);
    CREATE UNIQUE INDEX t42xy ON t42(x,y);
    INSERT INTO t41 VALUES(1,1),(3,1);
    INSERT INTO t42 VALUES(1,13),(1,15),(3,14),(3,16);
    
    SELECT b, y FROM t41 CROSS JOIN t42 ON x=a ORDER BY b, y
;EXPLAIN QUERY PLAN SELECT 5 ORDER BY 1
;EXPLAIN QUERY PLAN SELECT 5 UNION ALL SELECT 3 ORDER BY 1
;SELECT 5 UNION ALL SELECT 3 ORDER BY 1
;SELECT 986 AS x GROUP BY X ORDER BY X
;CREATE TABLE abc(a, b, c);
  INSERT INTO abc VALUES(1, 2, 3);
  INSERT INTO abc VALUES(4, 5, 6);
  INSERT INTO abc VALUES(7, 8, 9);
  SELECT (
    SELECT 'hardware' FROM ( 
      SELECT 'software' ORDER BY 'firmware' ASC, 'sportswear' DESC 
    ) GROUP BY 1 HAVING length(b)
  )
  FROM abc
;CREATE TABLE t7(a,b);
  CREATE INDEX t7a ON t7(a);
  CREATE INDEX t7ab ON t7(a,b);
  EXPLAIN QUERY PLAN
  SELECT * FROM t7 WHERE a=?1 ORDER BY rowid
;PRAGMA cache_size = 5;
  CREATE TABLE t1(a, b);
  CREATE INDEX i1 ON t1(a)
;SELECT * FROM t1 ORDER BY a, b
;WITH cnt(i) AS (
    SELECT 1 UNION ALL SELECT i+1 FROM cnt WHERE i<10000
  )
  INSERT INTO t1 SELECT i%2, randomblob(500) FROM cnt
;SELECT * FROM t1 ORDER BY a, b;