-- original: pragma.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

PRAGMA schema_version
;ATTACH 'test2.db' AS aux
;PRAGMA aux.user_version
;PRAGMA aux.user_version = 3
;PRAGMA aux.user_version
;PRAGMA main.user_version
;BEGIN;
      PRAGMA aux.user_version = 10;
      PRAGMA user_version = 11
;PRAGMA aux.user_version
;PRAGMA main.user_version
;ROLLBACK;
      PRAGMA aux.user_version
;PRAGMA main.user_version
;PRAGMA user_version = -450
;PRAGMA user_version
;CREATE TEMP TABLE IF NOT EXISTS a(b)
;PRAGMA application_id
;PRAGMA Application_ID(12345); PRAGMA application_id
;PRAGMA temp_store
;PRAGMA temp_store=file;
    PRAGMA temp_store
;PRAGMA temp_store=memory;
    PRAGMA temp_store
;PRAGMA temp_store_directory
;PRAGMA temp_store_directory
;PRAGMA temp_store_directory=''
;PRAGMA temp_store_directory;
          PRAGMA temp_store=FILE;
          CREATE TEMP TABLE temp_store_directory_test(a integer);
          INSERT INTO temp_store_directory_test values (2);
          SELECT * FROM temp_store_directory_test
;PRAGMA temp_store = 0;
    PRAGMA temp_store
;PRAGMA temp_store = 1;
    PRAGMA temp_store
;PRAGMA temp_store = 2;
    PRAGMA temp_store
;PRAGMA temp_store = 3;
    PRAGMA temp_store
;SELECT * FROM temp_table;
    COMMIT
;INSERT INTO temp_table VALUES('valuable data II');
    SELECT * FROM temp_table
;PRAGMA count_changes = 1;

    CREATE TABLE t1(a PRIMARY KEY);
    CREATE TABLE t1_mirror(a);
    CREATE TABLE t1_mirror2(a);
    CREATE TRIGGER t1_bi BEFORE INSERT ON t1 BEGIN 
      INSERT INTO t1_mirror VALUES(new.a);
    END;
    CREATE TRIGGER t1_ai AFTER INSERT ON t1 BEGIN 
      INSERT INTO t1_mirror2 VALUES(new.a);
    END;
    CREATE TRIGGER t1_bu BEFORE UPDATE ON t1 BEGIN 
      UPDATE t1_mirror SET a = new.a WHERE a = old.a;
    END;
    CREATE TRIGGER t1_au AFTER UPDATE ON t1 BEGIN 
      UPDATE t1_mirror2 SET a = new.a WHERE a = old.a;
    END;
    CREATE TRIGGER t1_bd BEFORE DELETE ON t1 BEGIN 
      DELETE FROM t1_mirror WHERE a = old.a;
    END;
    CREATE TRIGGER t1_ad AFTER DELETE ON t1 BEGIN 
      DELETE FROM t1_mirror2 WHERE a = old.a;
    END
;INSERT INTO t1 VALUES(randstr(10,10))
;UPDATE t1 SET a = randstr(10,10)
;DELETE FROM t1
;PRAGMA temp.table_info('abc')
;PRAGMA temp.default_cache_size = 200;
      PRAGMA temp.default_cache_size
;PRAGMA temp.cache_size = 400;
      PRAGMA temp.cache_size
;pragma auto_vacuum = 0
;pragma page_count; pragma main.page_count
;CREATE TABLE abc(a, b, c);
      PRAGMA page_count;
      PRAGMA main.page_count;
      PRAGMA temp.page_count
;pragma PAGE_COUNT
;BEGIN;
      CREATE TABLE def(a, b, c);
      PRAGMA page_count
;pragma PAGE_COUNT
;ROLLBACK;
      PRAGMA page_count
;PRAGMA auto_vacuum = 0;
      CREATE TABLE t1(a, b, c);
      CREATE TABLE t2(a, b, c);
      CREATE TABLE t3(a, b, c);
      CREATE TABLE t4(a, b, c)
;ATTACH 'test2.db' AS aux;
      PRAGMA aux.page_count
;pragma AUX.PAGE_COUNT
;PRAGMA cache_size=59;
      PRAGMA cache_size
;CREATE TABLE newtable(a, b, c)
;SELECT * FROM sqlite_master
;PRAGMA cache_size
;PRAGMA temp_store_directory = ""
;PRAGMA lock_proxy_file="mylittleproxy";
      select * from sqlite_master
;PRAGMA lock_proxy_file
;PRAGMA lock_proxy_file="mylittleproxy"
;PRAGMA lock_proxy_file=":auto:";
      select * from sqlite_master
;PRAGMA lock_proxy_file
;PRAGMA lock_proxy_file="myotherproxy"
;PRAGMA lock_proxy_file="myoriginalproxy";
      PRAGMA lock_proxy_file="myotherproxy";
      PRAGMA lock_proxy_file
;PRAGMA lock_proxy_file=":auto:";
      PRAGMA lock_proxy_file
;PRAGMA lock_proxy_file=":auto:";
      PRAGMA lock_proxy_file
;PRAGMA lock_proxy_file="yetanotherproxy";
      PRAGMA lock_proxy_file
;create table mine(x)
;PRAGMA lock_proxy_file=":auto:";
      PRAGMA lock_proxy_file
;PRAGMA filename
;PRAGMA page_size = 1024;
    PRAGMA auto_vacuum = 0;
    CREATE TABLE t1(a PRIMARY KEY, b);
    INSERT INTO t1 VALUES(1, 1)
;INSERT INTO t1 SELECT a +(1 << sub_i), b +(1 << sub_i) FROM t1
;PRAGMA integrity_check
;ATTACH 'testerr.db' AS 'aux';
    PRAGMA integrity_check
;PRAGMA main.integrity_check
;PRAGMA aux.integrity_check
;ATTACH 'test.db' AS 'aux';
    PRAGMA integrity_check
;PRAGMA main.integrity_check
;PRAGMA aux.integrity_check
;CREATE TABLE t1(a INTEGER PRIMARY KEY,b,c,d);
    CREATE INDEX i1 ON t1(b,c);
    CREATE INDEX i2 ON t1(c,d);
    CREATE INDEX i2x ON t1(d COLLATE nocase, c DESC);
    CREATE TABLE t2(x INTEGER REFERENCES t1)
;SELECT name FROM sqlite_master
;DROP INDEX i2;
    CREATE INDEX i2 ON t1(c,d,b)
;SELECT cid, name, '|' FROM out ORDER BY seqno
;SELECT cid, name, "desc", coll, "key", '|' FROM out ORDER BY seqno
;PRAGMA index_xinfo(i2)
;PRAGMA index_xinfo(i2x)
;CREATE INDEX i3 ON t1(d,b,c)
;SELECT seq, name, "unique", origin, '|' FROM out ORDER BY seq
;ALTER TABLE t1 ADD COLUMN e
;PRAGMA table_info(t1)
;DROP TABLE t2;
    CREATE TABLE t2(x, y INTEGER REFERENCES t1);