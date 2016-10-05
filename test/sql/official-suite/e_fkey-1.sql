-- original: e_fkey.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

PRAGMA foreign_keys = ON;
      CREATE TABLE p(i PRIMARY KEY);
      CREATE TABLE c(j REFERENCES p ON UPDATE CASCADE);
      INSERT INTO p VALUES('hello');
      INSERT INTO c VALUES('hello');
      UPDATE p SET i = 'world';
      SELECT * FROM c
;PRAGMA foreign_keys = ON;
      CREATE TABLE p(i PRIMARY KEY);
      CREATE TABLE c(j REFERENCES p ON UPDATE CASCADE);
      INSERT INTO p VALUES('hello');
      INSERT INTO c VALUES('hello');
      UPDATE p SET i = 'world';
      SELECT * FROM c
;PRAGMA foreign_keys
;CREATE TABLE p(i PRIMARY KEY)
;CREATE TABLE c(j REFERENCES p)
;PRAGMA table_info(c)
;PRAGMA foreign_keys
;CREATE TABLE p(i PRIMARY KEY);
    CREATE TABLE c(j REFERENCES p ON UPDATE CASCADE);
    INSERT INTO p VALUES('hello');
    INSERT INTO c VALUES('hello');
    UPDATE p SET i = 'world';
    SELECT * FROM c
;DELETE FROM c;
    DELETE FROM p;
    PRAGMA foreign_keys = ON;
    INSERT INTO p VALUES('hello');
    INSERT INTO c VALUES('hello');
    UPDATE p SET i = 'world';
    SELECT * FROM c
;PRAGMA foreign_keys
;PRAGMA foreign_keys = ON;
    PRAGMA foreign_keys
;PRAGMA foreign_keys = OFF;
    PRAGMA foreign_keys
;PRAGMA foreign_keys = ON;
    CREATE TABLE t1(a UNIQUE, b);
    CREATE TABLE t2(c, d REFERENCES t1(a));
    INSERT INTO t1 VALUES(1, 2);
    INSERT INTO t2 VALUES(2, 1);
    BEGIN;
      PRAGMA foreign_keys = OFF
;PRAGMA foreign_keys
;COMMIT;
    PRAGMA foreign_keys = OFF;
    BEGIN;
      PRAGMA foreign_keys = ON;
      DELETE FROM t1;
      PRAGMA foreign_keys
;PRAGMA foreign_keys = ON
;CREATE TABLE artist(
      artistid    INTEGER PRIMARY KEY, 
      artistname  TEXT
    );
    CREATE TABLE track(
      trackid     INTEGER, 
      trackname   TEXT, 
      trackartist INTEGER,
      FOREIGN KEY(trackartist) REFERENCES artist(artistid)
    )
;INSERT INTO artist VALUES(2, 'artist 1')
;INSERT INTO track VALUES(1, 'track 1', 2)
;DELETE FROM track WHERE trackartist = 2;
    DELETE FROM artist WHERE artistid = 2
;INSERT INTO track VALUES(1, 'track 1', NULL);
    INSERT INTO track VALUES(2, 'track 2', NULL)
;SELECT * FROM artist
;INSERT INTO artist VALUES(5, 'artist 5');
    UPDATE track SET trackartist = 5 WHERE trackid = 1
;UPDATE track SET trackartist = NULL WHERE trackid = 1;
    DELETE FROM artist WHERE artistid = 5
;SELECT count(*) FROM track WHERE NOT (
        trackartist IS NULL OR 
        EXISTS(SELECT 1 FROM artist WHERE artistid=trackartist)
      )
;CREATE TABLE artist(
      artistid    INTEGER PRIMARY KEY, 
      artistname  TEXT
    );
    CREATE TABLE track(
      trackid     INTEGER, 
      trackname   TEXT, 
      trackartist INTEGER NOT NULL,
      FOREIGN KEY(trackartist) REFERENCES artist(artistid)
    )
;CREATE TABLE artist(
      artistid    INTEGER PRIMARY KEY, 
      artistname  TEXT
    );
    CREATE TABLE track(
      trackid     INTEGER, 
      trackname   TEXT, 
      trackartist INTEGER,
      FOREIGN KEY(trackartist) REFERENCES artist(artistid)
    );
    INSERT INTO artist VALUES(1, 'Dean Martin');
    INSERT INTO artist VALUES(2, 'Frank Sinatra');
    INSERT INTO track VALUES(11, 'That''s Amore', 1);
    INSERT INTO track VALUES(12, 'Christmas Blues', 1);
    INSERT INTO track VALUES(13, 'My Way', 2)
;INSERT INTO track VALUES(14, 'Mr. Bojangles', NULL)
;INSERT INTO artist VALUES(3, 'Sammy Davis Jr.');
    UPDATE track SET trackartist = 3 WHERE trackname = 'Mr. Bojangles';
    INSERT INTO track VALUES(15, 'Boogie Woogie', 3)
;DELETE FROM track WHERE trackname = 'My Way';
    DELETE FROM artist WHERE artistname = 'Frank Sinatra'
;DELETE FROM track WHERE trackname IN('That''s Amore', 'Christmas Blues');
    UPDATE artist SET artistid=4 WHERE artistname = 'Dean Martin'
;CREATE TABLE par(p PRIMARY KEY);
    CREATE TABLE chi(c REFERENCES par);

    INSERT INTO par VALUES(1);
    INSERT INTO par VALUES('1');
    INSERT INTO par VALUES(X'31');
    SELECT typeof(p) FROM par
;SELECT * FROM chi WHERE c IS NOT NULL AND c NOT IN (SELECT p FROM par)
;CREATE TABLE t1(a COLLATE nocase PRIMARY KEY);
    CREATE TABLE t2(b REFERENCES t1)
;INSERT INTO t1 VALUES('oNe');
    INSERT INTO t2 VALUES('one');
    INSERT INTO t2 VALUES('ONE');
    UPDATE t2 SET b = 'OnE';
    UPDATE t1 SET a = 'ONE'
;CREATE TABLE t1(a NUMERIC PRIMARY KEY);
    CREATE TABLE t2(b TEXT REFERENCES t1)
;INSERT INTO t1 VALUES(1);
    INSERT INTO t1 VALUES(2);
    INSERT INTO t1 VALUES('three');
    INSERT INTO t2 VALUES('2.0');
    SELECT b, typeof(b) FROM t2
;SELECT typeof(a) FROM t1
;CREATE TABLE t2(a REFERENCES t1(x))
;CREATE TABLE parent(a PRIMARY KEY, b UNIQUE, c, d, e, f);
    CREATE UNIQUE INDEX i1 ON parent(c, d);
    CREATE INDEX i2 ON parent(e);
    CREATE UNIQUE INDEX i3 ON parent(f COLLATE nocase);

    CREATE TABLE child1(f, g REFERENCES parent(a));                       -- Ok
    CREATE TABLE child2(h, i REFERENCES parent(b));                       -- Ok
    CREATE TABLE child3(j, k, FOREIGN KEY(j, k) REFERENCES parent(c, d)); -- Ok
    CREATE TABLE child4(l, m REFERENCES parent(e));                       -- Err
    CREATE TABLE child5(n, o REFERENCES parent(f));                       -- Err
    CREATE TABLE child6(p, q, FOREIGN KEY(p,q) REFERENCES parent(b, c));  -- Err
    CREATE TABLE child7(r REFERENCES parent(c));                          -- Err
;INSERT INTO parent VALUES(1, 2, 3, 4, 5, 6);
    INSERT INTO child1 VALUES('xxx', 1);
    INSERT INTO child2 VALUES('xxx', 2);
    INSERT INTO child3 VALUES(3, 4)
;CREATE TABLE c1(c REFERENCES nosuchtable, d);

    CREATE TABLE p2(a, b, UNIQUE(a, b));
    CREATE TABLE c2(c, d, FOREIGN KEY(c, d) REFERENCES p2(a, x));

    CREATE TABLE p3(a PRIMARY KEY, b);
    CREATE TABLE c3(c REFERENCES p3(b), d);

    CREATE TABLE p4(a PRIMARY KEY, b);
    CREATE UNIQUE INDEX p4i ON p4(b COLLATE nocase);
    CREATE TABLE c4(c REFERENCES p4(b), d);

    CREATE TABLE p5(a PRIMARY KEY, b COLLATE nocase);
    CREATE UNIQUE INDEX p5i ON p5(b COLLATE binary);
    CREATE TABLE c5(c REFERENCES p5(b), d);

    CREATE TABLE p6(a PRIMARY KEY, b);
    CREATE TABLE c6(c, d, FOREIGN KEY(c, d) REFERENCES p6);

    CREATE TABLE p7(a, b, PRIMARY KEY(a, b));
    CREATE TABLE c7(c, d REFERENCES p7)
;CREATE TABLE parent2(a, b, PRIMARY KEY(a,b));

    CREATE TABLE child8(x, y, FOREIGN KEY(x,y) REFERENCES parent2);     -- Ok
    CREATE TABLE child9(x REFERENCES parent2);                          -- Err
    CREATE TABLE child10(x,y,z, FOREIGN KEY(x,y,z) REFERENCES parent2); -- Err
;INSERT INTO parent2 VALUES('I', 'II');
    INSERT INTO child8 VALUES('I', 'II')
;PRAGMA foreign_keys = sub_fk
;CREATE TABLE p1(a, b, PRIMARY KEY(a, b));
    CREATE TABLE p2(a, b PRIMARY KEY);
    CREATE TABLE c1(c, d, FOREIGN KEY(c, d) REFERENCES p1);
    CREATE TABLE c2(a, b REFERENCES p2)
;CREATE TABLE parent(x, y, UNIQUE(y, x));
    CREATE TABLE c1(a, b, FOREIGN KEY(a, b) REFERENCES parent(x, y));
    CREATE TABLE c2(a, b, FOREIGN KEY(a, b) REFERENCES parent(x, y));
    CREATE TABLE c3(a, b, FOREIGN KEY(a, b) REFERENCES parent(x, y));
    CREATE INDEX c2i ON c2(a, b);
    CREATE UNIQUE INDEX c3i ON c2(b, a)
;DELETE FROM sub_c ; DELETE FROM parent
;CREATE TABLE artist(
      artistid    INTEGER PRIMARY KEY, 
      artistname  TEXT
    );
    CREATE TABLE track(
      trackid     INTEGER, 
      trackname   TEXT, 
      trackartist INTEGER,
      FOREIGN KEY(trackartist) REFERENCES artist(artistid)
    )
;PRAGMA foreign_keys = OFF;
  EXPLAIN QUERY PLAN DELETE FROM artist WHERE 1;
  EXPLAIN QUERY PLAN SELECT rowid FROM track WHERE trackartist = ?
;PRAGMA foreign_keys = ON;
  EXPLAIN QUERY PLAN DELETE FROM artist WHERE 1
;INSERT INTO artist VALUES(5, 'artist 5');
    INSERT INTO artist VALUES(6, 'artist 6');
    INSERT INTO artist VALUES(7, 'artist 7');
    INSERT INTO track VALUES(1, 'track 1', 5);
    INSERT INTO track VALUES(2, 'track 2', 6)
;SELECT rowid FROM track WHERE trackartist = 5
;SELECT rowid FROM track WHERE trackartist = 7
;SELECT rowid FROM track WHERE trackartist = 6
;CREATE TABLE parent(x, y, UNIQUE(y, x))
;PRAGMA foreign_keys = OFF
;DELETE FROM parent WHERE 1
;SELECT rowid FROM child WHERE a = ? AND b = ?
;UPDATE parent SET x=?, y=?
;SELECT rowid FROM child WHERE a = ? AND b = ?
;SELECT rowid FROM child WHERE a = ? AND b = ?
;PRAGMA foreign_keys = ON
;DELETE FROM parent WHERE 1
;UPDATE parent set x=?, y=?
;DROP TABLE child
;CREATE TABLE artist(
      artistid    INTEGER PRIMARY KEY, 
      artistname  TEXT
    );
    CREATE TABLE track(
      trackid     INTEGER,
      trackname   TEXT, 
      trackartist INTEGER REFERENCES artist
    );
    CREATE INDEX trackindex ON track(trackartist)
;INSERT INTO artist VALUES(?, ?)
;EXPLAIN QUERY PLAN UPDATE artist SET artistid = ?, artistname = ?
;EXPLAIN QUERY PLAN DELETE FROM artist
;CREATE TABLE p(x PRIMARY KEY);
    CREATE TABLE c(a, b, FOREIGN KEY(a,b) REFERENCES p)
;CREATE TABLE p(x, y, PRIMARY KEY(x,y));
    CREATE TABLE c(a REFERENCES p)
;CREATE TABLE album(
      albumartist TEXT,
      albumname TEXT,
      albumcover BINARY,
      PRIMARY KEY(albumartist, albumname)
    );
    CREATE TABLE song(
      songid INTEGER,
      songartist TEXT,
      songalbum TEXT,
      songname TEXT,
      FOREIGN KEY(songartist, songalbum) REFERENCES album(albumartist,albumname)
    )
;INSERT INTO album VALUES('Elvis Presley', 'Elvis'' Christmas Album', NULL);
    INSERT INTO song VALUES(
      1, 'Elvis Presley', 'Elvis'' Christmas Album', 'Here Comes Santa Clause'
    )
;INSERT INTO song VALUES(2, 'Elvis Presley', NULL, 'Fever');
    INSERT INTO song VALUES(3, NULL, 'Elvis Is Back', 'Soldier Boy')
;CREATE TABLE king(a, b, PRIMARY KEY(a));
    CREATE TABLE prince(c REFERENCES king, d)
;CREATE TRIGGER kt AFTER INSERT ON prince WHEN
      NOT EXISTS (SELECT a FROM king WHERE a = new.c)
    BEGIN
      INSERT INTO king VALUES(new.c, NULL);
    END
;INSERT INTO prince VALUES(1, 2)
;BEGIN;
    INSERT INTO prince VALUES(2, 3);
    DROP TRIGGER kt
;COMMIT;
    SELECT * FROM king
;CREATE TABLE parent(x, y);
    CREATE UNIQUE INDEX pi ON parent(x, y);
    CREATE TABLE child(a, b,
      FOREIGN KEY(a, b) REFERENCES parent(x, y) DEFERRABLE INITIALLY DEFERRED
    )
;CREATE TABLE parent(x, y, z, PRIMARY KEY(x,y,z));
    CREATE TABLE c1(a, b, c,
      FOREIGN KEY(a, b, c) REFERENCES parent NOT DEFERRABLE INITIALLY DEFERRED
    );
    CREATE TABLE c2(a, b, c,
      FOREIGN KEY(a, b, c) REFERENCES parent NOT DEFERRABLE INITIALLY IMMEDIATE
    );
    CREATE TABLE c3(a, b, c,
      FOREIGN KEY(a, b, c) REFERENCES parent NOT DEFERRABLE
    );
    CREATE TABLE c4(a, b, c,
      FOREIGN KEY(a, b, c) REFERENCES parent DEFERRABLE INITIALLY IMMEDIATE
    );
    CREATE TABLE c5(a, b, c,
      FOREIGN KEY(a, b, c) REFERENCES parent DEFERRABLE
    );
    CREATE TABLE c6(a, b, c, FOREIGN KEY(a, b, c) REFERENCES parent);

    -- This FK constraint is the only deferrable one.
    CREATE TABLE c7(a, b, c,
      FOREIGN KEY(a, b, c) REFERENCES parent DEFERRABLE INITIALLY DEFERRED
    );

    INSERT INTO parent VALUES('a', 'b', 'c');
    INSERT INTO parent VALUES('d', 'e', 'f');
    INSERT INTO parent VALUES('g', 'h', 'i');
    INSERT INTO parent VALUES('j', 'k', 'l');
    INSERT INTO parent VALUES('m', 'n', 'o');
    INSERT INTO parent VALUES('p', 'q', 'r');
    INSERT INTO parent VALUES('s', 't', 'u');

    INSERT INTO c1 VALUES('a', 'b', 'c');
    INSERT INTO c2 VALUES('d', 'e', 'f');
    INSERT INTO c3 VALUES('g', 'h', 'i');
    INSERT INTO c4 VALUES('j', 'k', 'l');
    INSERT INTO c5 VALUES('m', 'n', 'o');
    INSERT INTO c6 VALUES('p', 'q', 'r');
    INSERT INTO c7 VALUES('s', 't', 'u')
;CREATE TABLE artist(
      artistid    INTEGER PRIMARY KEY, 
      artistname  TEXT
    );
    CREATE TABLE track(
      trackid     INTEGER,
      trackname   TEXT, 
      trackartist INTEGER REFERENCES artist(artistid) DEFERRABLE INITIALLY DEFERRED
    )
;BEGIN;
      INSERT INTO track VALUES(1, 'White Christmas', 5)
;INSERT INTO artist VALUES(5, 'Bing Crosby');
    COMMIT
;CREATE TABLE t1(a PRIMARY KEY,
      b REFERENCES t1 DEFERRABLE INITIALLY DEFERRED
    );
    INSERT INTO t1 VALUES(1, 1);
    INSERT INTO t1 VALUES(2, 2);
    INSERT INTO t1 VALUES(3, 3)
;BEGIN;
      SAVEPOINT one;
        INSERT INTO t1 VALUES(4, 5);
      RELEASE one
;UPDATE t1 SET a = 5 WHERE a = 4;
    COMMIT
;SAVEPOINT one;
      SAVEPOINT two;
        INSERT INTO t1 VALUES(6, 7);
      RELEASE two
;UPDATE t1 SET a = 7 WHERE a = 6;
    RELEASE one
;SAVEPOINT one;
      SAVEPOINT two;
        INSERT INTO t1 VALUES(9, 10);
      RELEASE two
;ROLLBACK TO one ; RELEASE one
;DELETE FROM t1 WHERE a>3;
    SELECT * FROM t1
;BEGIN;
      INSERT INTO t1 VALUES(4, 4);
      SAVEPOINT one;
        INSERT INTO t1 VALUES(5, 6);
        SELECT * FROM t1
;ROLLBACK TO one;
    COMMIT;
    SELECT * FROM t1
;SAVEPOINT a;
      INSERT INTO t1 VALUES(5, 5);
      SAVEPOINT b;
        INSERT INTO t1 VALUES(6, 7);
        SAVEPOINT c;
          INSERT INTO t1 VALUES(7, 8)
;ROLLBACK TO c
;ROLLBACK TO b;
    RELEASE a;
    SELECT * FROM t1
;CREATE TABLE p(a, b PRIMARY KEY, c);
    CREATE TABLE c1(d, e, f DEFAULT 'k0' REFERENCES p 
      ON UPDATE SET DEFAULT
      ON DELETE SET NULL
    );

    INSERT INTO p VALUES(0, 'k0', '');
    INSERT INTO p VALUES(1, 'k1', 'I');
    INSERT INTO p VALUES(2, 'k2', 'II');
    INSERT INTO p VALUES(3, 'k3', 'III');

    INSERT INTO c1 VALUES(1, 'xx', 'k1');
    INSERT INTO c1 VALUES(2, 'xx', 'k2');
    INSERT INTO c1 VALUES(3, 'xx', 'k3')
;UPDATE p SET b = 'k4' WHERE a = 1;
    SELECT * FROM c1;