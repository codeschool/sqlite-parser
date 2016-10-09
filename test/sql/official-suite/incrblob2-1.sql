-- original: incrblob2.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

CREATE TABLE blobs(id INTEGER PRIMARY KEY, data BLOB);
    INSERT INTO blobs VALUES(NULL, zeroblob(5000));
    INSERT INTO blobs VALUES(NULL, zeroblob(5000));
    INSERT INTO blobs VALUES(NULL, zeroblob(5000));
    INSERT INTO blobs VALUES(NULL, zeroblob(5000))
;INSERT INTO blobs VALUES(5, zeroblob(10240))
;CREATE TABLE t1(id INTEGER PRIMARY KEY, data BLOB)
;INSERT INTO t1 VALUES(sub_ii, sub_data)
;UPDATE t1 SET data = data || '' WHERE id = 3
;DELETE FROM t1 WHERE id = 14
;UPDATE t1 SET id = 102 WHERE id = 15
;INSERT OR REPLACE INTO t1 VALUES(92, zeroblob(1000))
;UPDATE OR REPLACE t1 SET id = 65 WHERE id = 35
;INSERT INTO t1 SELECT NULL, data FROM t1
;DELETE FROM t1 WHERE id >=1 AND id <= 25
;DELETE FROM t1
;INSERT INTO t1 VALUES(1, 'abcde')
;PRAGMA read_uncommitted=1
;DELETE FROM t1;
    INSERT INTO t1 VALUES(1, zeroblob(100))
;CREATE TABLE t2(B BLOB);
    INSERT INTO t2 VALUES(zeroblob(10 * 1024 * 1024))
;CREATE TABLE t3(a INTEGER UNIQUE, b TEXT);
    INSERT INTO t3 VALUES(1, 'aaaaaaaaaaaaaaaaaaaa');
    INSERT INTO t3 VALUES(2, 'bbbbbbbbbbbbbbbbbbbb');
    INSERT INTO t3 VALUES(3, 'cccccccccccccccccccc');
    INSERT INTO t3 VALUES(4, 'dddddddddddddddddddd');
    INSERT INTO t3 VALUES(5, 'eeeeeeeeeeeeeeeeeeee');