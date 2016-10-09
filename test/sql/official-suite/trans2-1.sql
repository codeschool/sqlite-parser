-- original: trans2.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

PRAGMA cache_size=100;
    CREATE TABLE t1(
      id INTEGER PRIMARY KEY,
      u1 TEXT UNIQUE,
      z BLOB NOT NULL,
      u2 TEXT UNIQUE
    )
;INSERT INTO t1 VALUES(sub_id,sub_u1,zeroblob(sub_z),sub_u2)
;SELECT md5sum(u1), md5sum(u2) FROM t1 ORDER BY id
;SELECT md5sum(u1), md5sum(u2) FROM t1 ORDER BY id
;SELECT md5sum(u1), md5sum(u2) FROM t1 ORDER BY id
;SELECT md5sum(u1), md5sum(u2) FROM t1 ORDER BY id
;SELECT md5sum(u1), md5sum(u2) FROM t1 ORDER BY id
;SELECT md5sum(u1), md5sum(u2) FROM t1 ORDER BY id
;SELECT md5sum(u1), md5sum(u2) FROM t1 ORDER BY id
;SELECT md5sum(u1), md5sum(u2) FROM t1 ORDER BY id
;SELECT md5sum(u1), md5sum(u2) FROM t1 ORDER BY id;