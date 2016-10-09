-- original: pager1.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

SELECT count(*) FROM ab
;PRAGMA page_size = 1024
;CREATE TABLE tsub_ii(a, b)
;PRAGMA page_size = 4096;
    PRAGMA synchronous = OFF;
    CREATE TABLE t1(a, b);
    CREATE TABLE t2(a, b)
;PRAGMA page_size = 4096;
    CREATE TABLE t1(a, b);
    CREATE TABLE t2(a, b)
;PRAGMA journal_mode = PERSIST;
      PRAGMA page_size = 1024;
      BEGIN;
        CREATE TABLE t1(a, b);
        CREATE TABLE t2(a, b);
        CREATE TABLE t3(a, b);
      COMMIT
;INSERT INTO t3 VALUES(a_string(300), a_string(300));
      INSERT INTO t3 SELECT * FROM t3;        /*  2 */
      INSERT INTO t3 SELECT * FROM t3;        /*  4 */
      INSERT INTO t3 SELECT * FROM t3;        /*  8 */
      INSERT INTO t3 SELECT * FROM t3;        /* 16 */
      INSERT INTO t3 SELECT * FROM t3;        /* 32 */
;PRAGMA cache_size = 10;
      BEGIN
;INSERT INTO t2 VALUES(1, 2)
;COMMIT;
      SELECT * FROM t2
;CREATE TABLE t6(a, b);
      CREATE TABLE t7(a, b);
      CREATE TABLE t5(a, b);
      DROP TABLE t6;
      DROP TABLE t7
;BEGIN;
        CREATE TABLE t6(a, b)
;INSERT INTO t5 VALUES(1, 2)
;COMMIT;
      SELECT * FROM t5
;PRAGMA auto_vacuum = none;
    PRAGMA page_size = 1024;
    CREATE TABLE t1(x)
;INSERT INTO t1 VALUES(zeroblob(900))
;CREATE TABLE t2(x);
    DROP TABLE t2
;BEGIN;
    CREATE TABLE t2(x)
;CREATE TABLE t3(x);
    COMMIT
;PRAGMA journal_mode = DELETE;
  PRAGMA cache_size = 10;
  BEGIN;
    CREATE TABLE zz(top PRIMARY KEY);
    INSERT INTO zz VALUES(a_string(222));
    INSERT INTO zz SELECT a_string((SELECT 222+max(rowid) FROM zz)) FROM zz;
    INSERT INTO zz SELECT a_string((SELECT 222+max(rowid) FROM zz)) FROM zz;
    INSERT INTO zz SELECT a_string((SELECT 222+max(rowid) FROM zz)) FROM zz;
    INSERT INTO zz SELECT a_string((SELECT 222+max(rowid) FROM zz)) FROM zz;
    INSERT INTO zz SELECT a_string((SELECT 222+max(rowid) FROM zz)) FROM zz;
  COMMIT;
  BEGIN;
    UPDATE zz SET top = a_string(345)
;PRAGMA journal_mode = TRUNCATE;
    PRAGMA integrity_check
;SELECT count(*) FROM zz
;SELECT count(*) FROM v;
      PRAGMA main.page_size
;SELECT count(*) FROM v;
      PRAGMA main.page_size
;PRAGMA page_size = 1024;
  PRAGMA journal_mode = PERSIST;
  PRAGMA cache_size = 10;
  BEGIN;
    CREATE TABLE t1(a INTEGER PRIMARY KEY, b BLOB);
    INSERT INTO t1 VALUES(NULL, a_string(400));
    INSERT INTO t1 SELECT NULL, a_string(400) FROM t1;          /*   2 */
    INSERT INTO t1 SELECT NULL, a_string(400) FROM t1;          /*   4 */
    INSERT INTO t1 SELECT NULL, a_string(400) FROM t1;          /*   8 */
    INSERT INTO t1 SELECT NULL, a_string(400) FROM t1;          /*  16 */
    INSERT INTO t1 SELECT NULL, a_string(400) FROM t1;          /*  32 */
    INSERT INTO t1 SELECT NULL, a_string(400) FROM t1;          /*  64 */
    INSERT INTO t1 SELECT NULL, a_string(400) FROM t1;          /* 128 */
  COMMIT;
  UPDATE t1 SET b = a_string(400)
;SELECT sum(length(b)) FROM t1
;PRAGMA integrity_check
;CREATE INDEX i1 ON t1(b);
  UPDATE t1 SET b = a_string(400)
;SELECT sum(length(b)) FROM t1
;PRAGMA integrity_check
;PRAGMA journal_mode = OFF;
  CREATE TABLE t1(a, b);
  BEGIN;
    INSERT INTO t1 VALUES(1, 2);
  COMMIT;
  SELECT * FROM t1
;SELECT * FROM t1
;COMMIT;
  SELECT * FROM t1
;CREATE TABLE tx(y, z);
  INSERT INTO tx VALUES('Ayutthaya', 'Beijing');
  INSERT INTO tx VALUES('London', 'Tokyo')
;PRAGMA page_size = 1024;
    CREATE TABLE t1(a, b);
    INSERT INTO t1 VALUES(a_string(500), a_string(200));
    INSERT INTO t1 SELECT a_string(500), a_string(200) FROM t1;
    INSERT INTO t1 SELECT a_string(500), a_string(200) FROM t1;
    INSERT INTO t1 SELECT a_string(500), a_string(200) FROM t1;
    INSERT INTO t1 SELECT a_string(500), a_string(200) FROM t1;
    INSERT INTO t1 SELECT a_string(500), a_string(200) FROM t1;
    INSERT INTO t1 SELECT a_string(500), a_string(200) FROM t1;
    INSERT INTO t1 SELECT a_string(500), a_string(200) FROM t1
;PRAGMA writable_schema = 1;
    UPDATE sqlite_master SET rootpage = sub_lockingpage
;CREATE TABLE t2(x);
    INSERT INTO t2 VALUES(a_string(5000))
;DELETE FROM t2;
    INSERT INTO t2 VALUES(randomblob(5000))
;CREATE TABLE t1(a, b);
    CREATE TABLE t2(a, b);
    PRAGMA writable_schema = 1;
    UPDATE sqlite_master SET rootpage=5 WHERE tbl_name = 't1';
    PRAGMA writable_schema = 0;
    ALTER TABLE t1 RENAME TO x1
;PRAGMA page_size = 1024;
    CREATE TABLE t1(x);
    INSERT INTO t1 VALUES(a_string(800));
    INSERT INTO t1 VALUES(a_string(800))
;PRAGMA page_size = 512;
    PRAGMA auto_vacuum = 1;
    CREATE TABLE t1(aa, ab, ac, ad, ae, af, ag, ah, ai, aj, ak, al, am, an,
                    ba, bb, bc, bd, be, bf, bg, bh, bi, bj, bk, bl, bm, bn,
                    ca, cb, cc, cd, ce, cf, cg, ch, ci, cj, ck, cl, cm, cn,
                    da, db, dc, dd, de, df, dg, dh, di, dj, dk, dl, dm, dn,
                    ea, eb, ec, ed, ee, ef, eg, eh, ei, ej, ek, el, em, en,
                    fa, fb, fc, fd, fe, ff, fg, fh, fi, fj, fk, fl, fm, fn,
                    ga, gb, gc, gd, ge, gf, gg, gh, gi, gj, gk, gl, gm, gn,
                    ha, hb, hc, hd, he, hf, hg, hh, hi, hj, hk, hl, hm, hn,
                    ia, ib, ic, id, ie, if, ig, ih, ii, ij, ik, il, im, ix,
                    ja, jb, jc, jd, je, jf, jg, jh, ji, jj, jk, jl, jm, jn,
                    ka, kb, kc, kd, ke, kf, kg, kh, ki, kj, kk, kl, km, kn,
                    la, lb, lc, ld, le, lf, lg, lh, li, lj, lk, ll, lm, ln,
                    ma, mb, mc, md, me, mf, mg, mh, mi, mj, mk, ml, mm, mn
    );
    CREATE TABLE t2(aa, ab, ac, ad, ae, af, ag, ah, ai, aj, ak, al, am, an,
                    ba, bb, bc, bd, be, bf, bg, bh, bi, bj, bk, bl, bm, bn,
                    ca, cb, cc, cd, ce, cf, cg, ch, ci, cj, ck, cl, cm, cn,
                    da, db, dc, dd, de, df, dg, dh, di, dj, dk, dl, dm, dn,
                    ea, eb, ec, ed, ee, ef, eg, eh, ei, ej, ek, el, em, en,
                    fa, fb, fc, fd, fe, ff, fg, fh, fi, fj, fk, fl, fm, fn,
                    ga, gb, gc, gd, ge, gf, gg, gh, gi, gj, gk, gl, gm, gn,
                    ha, hb, hc, hd, he, hf, hg, hh, hi, hj, hk, hl, hm, hn,
                    ia, ib, ic, id, ie, if, ig, ih, ii, ij, ik, il, im, ix,
                    ja, jb, jc, jd, je, jf, jg, jh, ji, jj, jk, jl, jm, jn,
                    ka, kb, kc, kd, ke, kf, kg, kh, ki, kj, kk, kl, km, kn,
                    la, lb, lc, ld, le, lf, lg, lh, li, lj, lk, ll, lm, ln,
                    ma, mb, mc, md, me, mf, mg, mh, mi, mj, mk, ml, mm, mn
    );
    INSERT INTO t1(aa) VALUES( a_string(100000) );
    INSERT INTO t2(aa) VALUES( a_string(100000) );
    VACUUM
;CREATE TABLE one(two, three);
    INSERT INTO one VALUES('a', 'b')
;BEGIN EXCLUSIVE;
    COMMIT
;PRAGMA locking_mode = exclusive;
    PRAGMA journal_mode = persist;
    CREATE TABLE one(two, three);
    INSERT INTO one VALUES('a', 'b')
;BEGIN EXCLUSIVE;
    COMMIT
;PRAGMA cache_size = 10;
      PRAGMA journal_mode = wal;
      BEGIN;
        CREATE TABLE t1(x);
        CREATE TABLE t2(y);
        INSERT INTO t1 VALUES(a_string(800));
        INSERT INTO t1 SELECT a_string(800) FROM t1;         /*   2 */
        INSERT INTO t1 SELECT a_string(800) FROM t1;         /*   4 */
        INSERT INTO t1 SELECT a_string(800) FROM t1;         /*   8 */
        INSERT INTO t1 SELECT a_string(800) FROM t1;         /*  16 */
        INSERT INTO t1 SELECT a_string(800) FROM t1;         /*  32 */
      COMMIT
;BEGIN;
      INSERT INTO t2 VALUES('xxxx')
;PRAGMA journal_mode = WAL;
      CREATE TABLE ko(c DEFAULT 'abc', b DEFAULT 'def');
      INSERT INTO ko DEFAULT VALUES
;CREATE TABLE ko(c DEFAULT 'abc', b DEFAULT 'def');
      INSERT INTO ko DEFAULT VALUES
;PRAGMA wal_checkpoint
;PRAGMA synchronous = off;
      PRAGMA journal_mode = WAL;
      INSERT INTO ko DEFAULT VALUES
;PRAGMA wal_checkpoint
;PRAGMA journal_mode = PERSIST;
    CREATE TABLE t1(a, b)
;PRAGMA journal_mode = DELETE
;PRAGMA journal_mode = PERSIST;
    INSERT INTO t1 VALUES('Canberra', 'ACT')
;SELECT * FROM t1
;PRAGMA journal_mode = DELETE
;PRAGMA journal_mode
;PRAGMA journal_mode = PERSIST;
    INSERT INTO t1 VALUES('Darwin', 'NT');
    BEGIN IMMEDIATE
;PRAGMA journal_mode = DELETE
;PRAGMA journal_mode
;PRAGMA journal_mode = PERSIST;
    INSERT INTO t1 VALUES('Adelaide', 'SA');
    BEGIN EXCLUSIVE
;PRAGMA journal_mode = DELETE
;PRAGMA journal_mode
;PRAGMA journal_mode = off
;PRAGMA journal_mode = sub_mode
;PRAGMA journal_mode = memory
;PRAGMA journal_mode = sub_mode
;PRAGMA locking_mode = normal
;PRAGMA locking_mode = exclusive
;PRAGMA locking_mode
;PRAGMA main.locking_mode
;PRAGMA cache_size = 10;
    PRAGMA auto_vacuum = FULL;
    CREATE TABLE x1(x, y, z, PRIMARY KEY(y, z));
    CREATE TABLE x2(x, y, z, PRIMARY KEY(y, z));
    INSERT INTO x2 VALUES(a_string(400), a_string(500), a_string(600));
    INSERT INTO x2 SELECT a_string(600), a_string(400), a_string(500) FROM x2;
    INSERT INTO x2 SELECT a_string(500), a_string(600), a_string(400) FROM x2;
    INSERT INTO x2 SELECT a_string(400), a_string(500), a_string(600) FROM x2;
    INSERT INTO x2 SELECT a_string(600), a_string(400), a_string(500) FROM x2;
    INSERT INTO x2 SELECT a_string(500), a_string(600), a_string(400) FROM x2;
    INSERT INTO x2 SELECT a_string(400), a_string(500), a_string(600) FROM x2;
    INSERT INTO x1 SELECT * FROM x2
;BEGIN;
      DELETE FROM x1 WHERE rowid<32
;UPDATE x1 SET z = a_string(300) WHERE rowid>40;
    COMMIT;
    PRAGMA integrity_check;
    SELECT count(*) FROM x1
;DELETE FROM x1;
    INSERT INTO x1 SELECT * FROM x2;
    BEGIN;
      DELETE FROM x1 WHERE rowid<32;
      UPDATE x1 SET z = a_string(299) WHERE rowid>40
;PRAGMA integrity_check;
    SELECT count(*) FROM x1
;DELETE FROM x1;
    INSERT INTO x1 SELECT * FROM x2
;CREATE TABLE x3(x, y, z)
;SELECT * FROM x3
;BEGIN;
      SAVEPOINT abc;
        CREATE TABLE t1(a, b);
      ROLLBACK TO abc;
    COMMIT
;SAVEPOINT abc;
      CREATE TABLE t1(a, b);
    ROLLBACK TO abc;
    COMMIT
;PRAGMA page_size = 512;
    CREATE TABLE tbl(a PRIMARY KEY, b UNIQUE);
    BEGIN;
      INSERT INTO tbl VALUES(a_string(25), a_string(600));
      INSERT INTO tbl SELECT a_string(25), a_string(600) FROM tbl;
      INSERT INTO tbl SELECT a_string(25), a_string(600) FROM tbl;
      INSERT INTO tbl SELECT a_string(25), a_string(600) FROM tbl;
      INSERT INTO tbl SELECT a_string(25), a_string(600) FROM tbl;
      INSERT INTO tbl SELECT a_string(25), a_string(600) FROM tbl;
      INSERT INTO tbl SELECT a_string(25), a_string(600) FROM tbl;
      INSERT INTO tbl SELECT a_string(25), a_string(600) FROM tbl;
    COMMIT
;UPDATE tbl SET b = a_string(550)
;BEGIN;
      CREATE TABLE t1(a, b)
;PRAGMA journal_mode = WAL;
        CREATE TABLE t1(a, b);
        INSERT INTO t1 VALUES('a', 'b')
;SELECT * FROM t1
;PRAGMA locking_mode=exclusive
;INSERT INTO t1 VALUES('c', 'd'); COMMIT
;PRAGMA journal_mode = PERSIST;
      CREATE TABLE t1(a, b);
      INSERT INTO t1 VALUES('a', 'b')
;PRAGMA journal_mode = DELETE
;PRAGMA journal_mode = PERSIST;
      INSERT INTO t1 VALUES('c', 'd')
;BEGIN; INSERT INTO t1 VALUES('e', 'f')
;PRAGMA journal_mode = DELETE
;PRAGMA journal_mode = PERSIST;
      INSERT INTO t1 VALUES('g', 'h')
;BEGIN; INSERT INTO t1 VALUES('e', 'f')
;PRAGMA journal_mode = DELETE
;COMMIT
;PRAGMA page_size = 1024;
    PRAGMA auto_vacuum = full;
    PRAGMA locking_mode=exclusive;
    CREATE TABLE t1(a, b);
    INSERT INTO t1 VALUES(1, 2)
;PRAGMA page_size = 4096;
    VACUUM;