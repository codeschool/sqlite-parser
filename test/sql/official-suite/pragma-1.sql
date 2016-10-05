-- original: pragma.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

PRAGMA cache_size;
    PRAGMA default_cache_size;
    PRAGMA synchronous
;PRAGMA synchronous=OFF;
    PRAGMA cache_size=1234;
    PRAGMA cache_size;
    PRAGMA default_cache_size;
    PRAGMA synchronous
;PRAGMA cache_size;
    PRAGMA default_cache_size;
    PRAGMA synchronous
;PRAGMA synchronous=OFF;
    PRAGMA cache_size;
    PRAGMA default_cache_size;
    PRAGMA synchronous
;PRAGMA cache_size=-4321;
    PRAGMA cache_size;
    PRAGMA default_cache_size;
    PRAGMA synchronous
;PRAGMA synchronous=ON;
    PRAGMA cache_size;
    PRAGMA default_cache_size;
    PRAGMA synchronous
;PRAGMA cache_size;
    PRAGMA default_cache_size;
    PRAGMA synchronous
;PRAGMA default_cache_size=-123;
    PRAGMA cache_size;
    PRAGMA default_cache_size;
    PRAGMA synchronous
;PRAGMA cache_size;
    PRAGMA default_cache_size;
    PRAGMA synchronous
;VACUUM;
      PRAGMA cache_size;
      PRAGMA default_cache_size;
      PRAGMA synchronous
;PRAGMA synchronous=NORMAL;
    PRAGMA cache_size;
    PRAGMA default_cache_size;
    PRAGMA synchronous
;PRAGMA synchronous=FULL;
    PRAGMA cache_size;
    PRAGMA default_cache_size;
    PRAGMA synchronous
;PRAGMA cache_size;
    PRAGMA default_cache_size;
    PRAGMA synchronous
;PRAGMA synchronous=0;
    PRAGMA synchronous
;PRAGMA synchronous=2;
    PRAGMA synchronous
;PRAGMA synchronous=4;
    PRAGMA synchronous
;PRAGMA synchronous=3;
    PRAGMA synchronous
;PRAGMA synchronous=10;
    PRAGMA synchronous
;PRAGMA parser_trace=ON;
    PRAGMA parser_trace=OFF
;ATTACH 'test2.db' AS aux
;pragma aux.synchronous
;pragma aux.synchronous = OFF;
      pragma aux.synchronous;
      pragma synchronous
;pragma aux.synchronous = ON;
      pragma synchronous;
      pragma aux.synchronous
;PRAGMA auto_vacuum=OFF;
    BEGIN;
    CREATE TABLE t2(a,b,c);
    CREATE INDEX i2 ON t2(a);
    INSERT INTO t2 VALUES(11,2,3);
    INSERT INTO t2 VALUES(22,3,4);
    COMMIT;
    SELECT rowid, * from t2
;SELECT rootpage FROM sqlite_master WHERE name='i2'
;PRAGMA page_size
;PRAGMA integrity_check
;PRAGMA integrity_check=1
;ATTACH DATABASE 'test.db' AS t2;
        PRAGMA integrity_check
;PRAGMA integrity_check=4
;PRAGMA integrity_check=xyz
;PRAGMA integrity_check=0
;DETACH t2
;REINDEX t2
;PRAGMA integrity_check
;PRAGMA quick_check
;PRAGMA QUICK_CHECK
;ATTACH 'testerr.db' AS t2;
        PRAGMA integrity_check
;PRAGMA integrity_check=1
;PRAGMA integrity_check=5
;PRAGMA integrity_check=4
;PRAGMA integrity_check=3
;PRAGMA integrity_check(2)
;ATTACH 'testerr.db' AS t3;
        PRAGMA integrity_check
;PRAGMA integrity_check(10)
;PRAGMA integrity_check=8
;PRAGMA integrity_check=4
;PRAGMA integrity_check
;CREATE TABLE t1(a,b);
  CREATE INDEX t1a ON t1(a);
  INSERT INTO t1 VALUES(1,1),(2,2),(3,3),(2,4),(NULL,5),(NULL,6);
  PRAGMA writable_schema=ON;
  UPDATE sqlite_master SET sql='CREATE UNIQUE INDEX t1a ON t1(a)'
   WHERE name='t1a';
  UPDATE sqlite_master SET sql='CREATE TABLE t1(a NOT NULL,b)'
   WHERE name='t1';
  PRAGMA writable_schema=OFF;
  ALTER TABLE t1 RENAME TO t1x;
  PRAGMA integrity_check
;PRAGMA integrity_check(3)
;PRAGMA integrity_check(2)
;PRAGMA integrity_check(1)
;CREATE TABLE t1(a,b,c);
    WITH RECURSIVE
      c(i) AS (VALUES(1) UNION ALL SELECT i+1 FROM c WHERE i<100)
    INSERT INTO t1(a,b,c) SELECT i, printf('xyz%08x',i), 2000-i FROM c;
    CREATE INDEX t1a ON t1(a);
    CREATE INDEX t1bc ON t1(b,c)
;PRAGMA integrity_check
;DELETE FROM t1
;ATTACH 'test2.db' AS aux;
    pragma aux.cache_size;
    pragma aux.default_cache_size
;pragma aux.cache_size = 50;
    pragma aux.cache_size;
    pragma aux.default_cache_size
;pragma aux.default_cache_size = 456;
    pragma aux.cache_size;
    pragma aux.default_cache_size
;pragma cache_size;
    pragma default_cache_size
;DETACH aux;
    ATTACH 'test3.db' AS aux;
    pragma aux.cache_size;
    pragma aux.default_cache_size
;DETACH aux;
    ATTACH 'test2.db' AS aux;
    pragma aux.cache_size;
    pragma aux.default_cache_size
;pragma synchronous
;pragma synchronous
;SELECT * FROM sqlite_temp_master
;CREATE TABLE t2(a,b,c);
    pragma table_info(t2)
;pragma table_info
;CREATE TABLE t5(
      a TEXT DEFAULT CURRENT_TIMESTAMP, 
      b DEFAULT (5+3),
      c TEXT,
      d INTEGER DEFAULT NULL,
      e TEXT DEFAULT '',
      UNIQUE(b,c,d),
      PRIMARY KEY(e,b,c)
    );
    PRAGMA table_info(t5)
;CREATE TABLE t2_3(a,b INTEGER PRIMARY KEY,c);
    pragma table_info(t2_3)
;SELECT seq, "name", "unique" FROM out ORDER BY seq
;CREATE TABLE t3(a,b UNIQUE)
;CREATE INDEX t3i1 ON t3(a,b)
;SELECT seqno, cid, name FROM out ORDER BY seqno
;SELECT seqno, cid, name FROM out ORDER BY seqno
;CREATE INDEX t3i2 ON t3(b,a);
  PRAGMA index_info='t3i2';
  DROP INDEX t3i2
;CREATE TABLE trial(col_main);
      CREATE TEMP TABLE trial(col_temp)
;PRAGMA table_info(trial)
;PRAGMA temp.table_info(trial)
;PRAGMA main.table_info(trial)
;CREATE TABLE test_table(
      one INT NOT NULL DEFAULT -1, 
      two text,
      three VARCHAR(45, 65) DEFAULT 'abcde',
      four REAL DEFAULT X'abcdef',
      five DEFAULT CURRENT_TIME
    )
;SELECT cid, "name", type, "notnull", dflt_value, pk FROM out
            ORDER BY cid
;CREATE TABLE t68(a,b,c,PRIMARY KEY(a,b,a,c));
    PRAGMA table_info(t68)
;SELECT name, "origin" FROM out ORDER BY name DESC
;pragma lock_status
;pragma lock_status
;PRAGMA schema_version = 105
;PRAGMA schema_version = 106
;PRAGMA schema_version
;CREATE TABLE t4(a, b, c);
    INSERT INTO t4 VALUES(1, 2, 3);
    SELECT * FROM t4
;PRAGMA schema_version
;SELECT * FROM t4
;PRAGMA schema_version = 108
;ATTACH 'test2.db' AS aux;
      CREATE TABLE aux.t1(a, b, c);
      PRAGMA aux.schema_version = 205
;PRAGMA aux.schema_version
;PRAGMA schema_version
;ATTACH 'test2.db' AS aux;
      SELECT * FROM aux.t1
;PRAGMA aux.schema_version = 206
;PRAGMA user_version = 2
;PRAGMA user_version
;PRAGMA schema_version
;VACUUM;
      PRAGMA user_version;