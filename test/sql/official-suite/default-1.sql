-- original: default.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

CREATE TABLE t1(
        a INTEGER,
        b BLOB DEFAULT x'6869'
      );
      INSERT INTO t1(a) VALUES(1);
      SELECT * from t1
;CREATE TABLE t2(
      x INTEGER,
      y INTEGER DEFAULT NULL
    );
    INSERT INTO t2(x) VALUES(1);
    SELECT * FROM t2
;CREATE TABLE t4(c DEFAULT 'abc');
      PRAGMA table_info(t4)
;INSERT INTO t4 DEFAULT VALUES;
      PRAGMA table_info(t4)
;CREATE TABLE t3(
    a INTEGER PRIMARY KEY AUTOINCREMENT,
    b INT DEFAULT 12345 UNIQUE NOT NULL CHECK( b>=0 AND b<99999 ),
    c VARCHAR(123,456) DEFAULT 'hello' NOT NULL ON CONFLICT REPLACE,
    d REAL,
    e FLOATING POINT(5,10) DEFAULT 4.36,
    f NATIONAL CHARACTER(15) COLLATE RTRIM,
    g LONG INTEGER DEFAULT( 3600*12 )
  );
  INSERT INTO t3 VALUES(null, 5, 'row1', '5.25', 'xyz', 321, '432');
  SELECT a, typeof(a), b, typeof(b), c, typeof(c), 
         d, typeof(d), e, typeof(e), f, typeof(f),
         g, typeof(g) FROM t3
;DELETE FROM t3;
  INSERT INTO t3 DEFAULT VALUES;
  SELECT * FROM t3
;CREATE TABLE t300(
    a INT DEFAULT 2147483647,
    b INT DEFAULT 2147483648,
    c INT DEFAULT +9223372036854775807,
    d INT DEFAULT -2147483647,
    e INT DEFAULT -2147483648,
    f INT DEFAULT -9223372036854775808,
    g INT DEFAULT (-(-9223372036854775808)),
    h INT DEFAULT (-(-9223372036854775807))
  );
  INSERT INTO t300 DEFAULT VALUES;
  SELECT * FROM t300
;CREATE TABLE t1(a TEXT, b TEXT DEFAULT(99));
  PRAGMA writable_schema=ON;
  UPDATE sqlite_master SET sql='CREATE TABLE t1(a TEXT, b TEXT DEFAULT(:xyz))'
;INSERT INTO t1(a) VALUES('xyzzy');
  SELECT a, quote(b) FROM t1;