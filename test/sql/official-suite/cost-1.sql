-- original: cost.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

CREATE TABLE t3(id INTEGER PRIMARY KEY, b NOT NULL);
  CREATE TABLE t4(c, d, e);
  CREATE UNIQUE INDEX i3 ON t3(b);
  CREATE UNIQUE INDEX i4 ON t4(c, d)
;SELECT e FROM t3, t4 WHERE b=c ORDER BY b, d
;CREATE TABLE t1(a, b);
  CREATE INDEX i1 ON t1(a)
;SELECT * FROM t1 ORDER BY a
;CREATE TABLE t5(a INTEGER PRIMARY KEY,b,c,d,e,f,g);
  CREATE INDEX t5b ON t5(b);
  CREATE INDEX t5c ON t5(c);
  CREATE INDEX t5d ON t5(d);
  CREATE INDEX t5e ON t5(e);
  CREATE INDEX t5f ON t5(f);
  CREATE INDEX t5g ON t5(g)
;SELECT a FROM t5 
  WHERE b IS NULL OR c IS NULL OR d IS NULL 
  ORDER BY a
;CREATE TABLE t1(a, b);
  CREATE INDEX i1 ON t1(a);
  CREATE INDEX i2 ON t1(b)
;SELECT * FROM t1 WHERE likelihood(a=?, 0.014) AND b BETWEEN ? AND ?
;SELECT * FROM t1 WHERE likelihood(a=?, 0.016) AND b BETWEEN ? AND ?
;CREATE TABLE t2(x, y);
  CREATE INDEX t2i1 ON t2(x)
;SELECT * FROM t2 ORDER BY x, y
;SELECT * FROM t2 WHERE x BETWEEN ? AND ? ORDER BY rowid
;CREATE TABLE t3(a INTEGER PRIMARY KEY, b, c);
  CREATE INDEX t3i1 ON t3(b);
  CREATE INDEX t3i2 ON t3(c)
;SELECT a FROM t3 WHERE (b BETWEEN 2 AND 4) OR c=100 ORDER BY a
;CREATE TABLE t1(a INTEGER PRIMARY KEY,b,c,d,e,f,g);
  CREATE INDEX t1b ON t1(b);
  CREATE INDEX t1c ON t1(c);
  CREATE INDEX t1d ON t1(d);
  CREATE INDEX t1e ON t1(e);
  CREATE INDEX t1f ON t1(f);
  CREATE INDEX t1g ON t1(g)
;SELECT a FROM t1
     WHERE (b>=950 AND b<=1010) OR (b IS NULL AND c NOT NULL)
  ORDER BY a
;SELECT rowid FROM t1
  WHERE (+b IS NULL AND c NOT NULL AND d NOT NULL)
        OR (b NOT NULL AND c IS NULL AND d NOT NULL)
        OR (b NOT NULL AND c NOT NULL AND d IS NULL)
;SELECT rowid FROM t1 WHERE (+b IS NULL AND c NOT NULL) OR c IS NULL
;CREATE TABLE composer(
    cid INTEGER PRIMARY KEY,
    cname TEXT
  );
  CREATE TABLE album(
    aid INTEGER PRIMARY KEY,
    aname TEXT
  );
  CREATE TABLE track(
    tid INTEGER PRIMARY KEY,
    cid INTEGER REFERENCES composer,
    aid INTEGER REFERENCES album,
    title TEXT
  );
  CREATE INDEX track_i1 ON track(cid);
  CREATE INDEX track_i2 ON track(aid)
;SELECT DISTINCT aname
    FROM album, composer, track
   WHERE cname LIKE '%bach%'
     AND unlikely(composer.cid=track.cid)
     AND unlikely(album.aid=track.aid)
;CREATE TABLE t1(
    a,b,c,d,e, f,g,h,i,j,
    k,l,m,n,o, p,q,r,s,t
  );
  CREATE INDEX i1 ON t1(k,l,m,n,o,p,q,r,s,t)
;INSERT INTO t1 DEFAULT VALUES
;ANALYZE;
    CREATE INDEX i2 ON t1(a,b,c,d,e,f,g,h,i,j)
;CREATE TABLE t6(a, b, c);
    CREATE INDEX t6i1 ON t6(a, b);
    CREATE INDEX t6i2 ON t6(c)
;INSERT INTO t6 VALUES(sub_i%4, 'xyz', sub_i%8)
;SELECT rowid FROM t6 WHERE a=0 AND c=0
;SELECT rowid FROM t6 WHERE a=0 AND b='xyz' AND c=0
;SELECT rowid FROM t6 WHERE likelihood(a=0, 0.1) AND c=0
;SELECT rowid FROM t6 WHERE likelihood(a=0, 0.1) AND b='xyz' AND c=0;