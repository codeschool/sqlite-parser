-- original: e_fkey.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

DELETE FROM p WHERE a = 2;
    SELECT * FROM c1
;CREATE UNIQUE INDEX pi ON p(c);
    REPLACE INTO p VALUES(5, 'k5', 'III');
    SELECT * FROM c1
;CREATE TABLE parent(x PRIMARY KEY, y);
    CREATE TABLE child1(a, 
      b REFERENCES parent ON UPDATE NO ACTION ON DELETE RESTRICT
    );
    CREATE TABLE child2(a, 
      b REFERENCES parent ON UPDATE RESTRICT ON DELETE SET NULL
    );
    CREATE TABLE child3(a, 
      b REFERENCES parent ON UPDATE SET NULL ON DELETE SET DEFAULT
    );
    CREATE TABLE child4(a, 
      b REFERENCES parent ON UPDATE SET DEFAULT ON DELETE CASCADE
    );

    -- Create some foreign keys that use the default action -"NO ACTION"
    CREATE TABLE child5(a, b REFERENCES parent ON UPDATE CASCADE);
    CREATE TABLE child6(a, b REFERENCES parent ON DELETE RESTRICT);
    CREATE TABLE child7(a, b REFERENCES parent ON DELETE NO ACTION);
    CREATE TABLE child8(a, b REFERENCES parent ON UPDATE NO ACTION)
;PRAGMA foreign_key_list(sub_zTab)
;CREATE TABLE parent(p1, p2, PRIMARY KEY(p1, p2));
    CREATE TABLE child(c1, c2, 
      FOREIGN KEY(c1, c2) REFERENCES parent
      ON UPDATE NO ACTION
      ON DELETE NO ACTION
      DEFERRABLE INITIALLY DEFERRED
    );
    INSERT INTO parent VALUES('j', 'k');
    INSERT INTO parent VALUES('l', 'm');
    INSERT INTO child VALUES('j', 'k');
    INSERT INTO child VALUES('l', 'm')
;BEGIN;
      UPDATE parent SET p1='k' WHERE p1='j';
      DELETE FROM parent WHERE p1='l';
      SELECT * FROM child
;CREATE TABLE parent(p1, p2);
    CREATE UNIQUE INDEX parent_i ON parent(p1, p2);
    CREATE TABLE child1(c1, c2, 
      FOREIGN KEY(c2, c1) REFERENCES parent(p1, p2) ON DELETE RESTRICT
    );
    CREATE TABLE child2(c1, c2, 
      FOREIGN KEY(c2, c1) REFERENCES parent(p1, p2) ON UPDATE RESTRICT
    )
;INSERT INTO parent VALUES('a', 'b');
    INSERT INTO parent VALUES('c', 'd');
    INSERT INTO child1 VALUES('b', 'a');
    INSERT INTO child2 VALUES('d', 'c')
;CREATE TABLE parent(x PRIMARY KEY);
    CREATE TABLE child1(c REFERENCES parent ON UPDATE RESTRICT);
    CREATE TABLE child2(c REFERENCES parent ON UPDATE NO ACTION);

    INSERT INTO parent VALUES('key1');
    INSERT INTO parent VALUES('key2');
    INSERT INTO child1 VALUES('key1');
    INSERT INTO child2 VALUES('key2');

    CREATE TRIGGER parent_t AFTER UPDATE ON parent BEGIN
      UPDATE child1 set c = new.x WHERE c = old.x;
      UPDATE child2 set c = new.x WHERE c = old.x;
    END
;UPDATE parent SET x = 'key two' WHERE x = 'key2';
    SELECT * FROM child2
;CREATE TABLE parent(x PRIMARY KEY);
    CREATE TABLE child1(c REFERENCES parent ON DELETE RESTRICT);
    CREATE TABLE child2(c REFERENCES parent ON DELETE NO ACTION);

    INSERT INTO parent VALUES('key1');
    INSERT INTO parent VALUES('key2');
    INSERT INTO child1 VALUES('key1');
    INSERT INTO child2 VALUES('key2');

    CREATE TRIGGER parent_t AFTER DELETE ON parent BEGIN
      UPDATE child1 SET c = NULL WHERE c = old.x;
      UPDATE child2 SET c = NULL WHERE c = old.x;
    END
;DELETE FROM parent WHERE x = 'key2';
    SELECT * FROM child2
;CREATE TABLE parent(x PRIMARY KEY);
    CREATE TABLE child1(c REFERENCES parent ON DELETE RESTRICT);
    CREATE TABLE child2(c REFERENCES parent ON DELETE NO ACTION);

    INSERT INTO parent VALUES('key1');
    INSERT INTO parent VALUES('key2');
    INSERT INTO child1 VALUES('key1');
    INSERT INTO child2 VALUES('key2')
;REPLACE INTO parent VALUES('key2');
    SELECT * FROM child2
;CREATE TABLE parent(x PRIMARY KEY);
    CREATE TABLE child1(c REFERENCES parent ON UPDATE RESTRICT
      DEFERRABLE INITIALLY DEFERRED
    );
    CREATE TABLE child2(c REFERENCES parent ON UPDATE NO ACTION
      DEFERRABLE INITIALLY DEFERRED
    );

    INSERT INTO parent VALUES('key1');
    INSERT INTO parent VALUES('key2');
    INSERT INTO child1 VALUES('key1');
    INSERT INTO child2 VALUES('key2');
    BEGIN
;UPDATE parent SET x = 'key two' WHERE x = 'key2'
;UPDATE child2 SET c = 'key two';
    COMMIT
;CREATE TABLE parent(x PRIMARY KEY);
    CREATE TABLE child1(c REFERENCES parent ON DELETE RESTRICT
      DEFERRABLE INITIALLY DEFERRED
    );
    CREATE TABLE child2(c REFERENCES parent ON DELETE NO ACTION
      DEFERRABLE INITIALLY DEFERRED
    );

    INSERT INTO parent VALUES('key1');
    INSERT INTO parent VALUES('key2');
    INSERT INTO child1 VALUES('key1');
    INSERT INTO child2 VALUES('key2');
    BEGIN
;DELETE FROM parent WHERE x = 'key2'
;UPDATE child2 SET c = NULL;
    COMMIT
;CREATE TABLE pA(x PRIMARY KEY);
    CREATE TABLE cA(c REFERENCES pA ON DELETE SET NULL);
    CREATE TABLE cB(c REFERENCES pA ON UPDATE SET NULL);

    INSERT INTO pA VALUES(X'ABCD');
    INSERT INTO pA VALUES(X'1234');
    INSERT INTO cA VALUES(X'ABCD');
    INSERT INTO cB VALUES(X'1234')
;DELETE FROM pA WHERE rowid = 1;
    SELECT quote(x) FROM pA
;SELECT quote(c) FROM cA
;UPDATE pA SET x = X'8765' WHERE rowid = 2;
    SELECT quote(x) FROM pA
;SELECT quote(c) FROM cB
;CREATE TABLE pA(x PRIMARY KEY);
    CREATE TABLE cA(c DEFAULT X'0000' REFERENCES pA ON DELETE SET DEFAULT);
    CREATE TABLE cB(c DEFAULT X'9999' REFERENCES pA ON UPDATE SET DEFAULT);

    INSERT INTO pA(rowid, x) VALUES(1, X'0000');
    INSERT INTO pA(rowid, x) VALUES(2, X'9999');
    INSERT INTO pA(rowid, x) VALUES(3, X'ABCD');
    INSERT INTO pA(rowid, x) VALUES(4, X'1234');

    INSERT INTO cA VALUES(X'ABCD');
    INSERT INTO cB VALUES(X'1234')
;DELETE FROM pA WHERE rowid = 3;
    SELECT quote(x) FROM pA ORDER BY rowid
;SELECT quote(c) FROM cA
;UPDATE pA SET x = X'8765' WHERE rowid = 4;
    SELECT quote(x) FROM pA ORDER BY rowid
;SELECT quote(c) FROM cB
;CREATE TABLE p1(a, b UNIQUE);
    CREATE TABLE c1(c REFERENCES p1(b) ON DELETE CASCADE, d);
    INSERT INTO p1 VALUES(NULL, NULL);
    INSERT INTO p1 VALUES(4, 4);
    INSERT INTO p1 VALUES(5, 5);
    INSERT INTO c1 VALUES(NULL, NULL);
    INSERT INTO c1 VALUES(4, 4);
    INSERT INTO c1 VALUES(5, 5);
    SELECT count(*) FROM c1
;DELETE FROM p1 WHERE a = 4;
    SELECT d, c FROM c1
;DELETE FROM p1;
    SELECT d, c FROM c1
;SELECT * FROM p1
;CREATE TABLE p1(a, b UNIQUE);
    CREATE TABLE c1(c REFERENCES p1(b) ON UPDATE CASCADE, d);
    INSERT INTO p1 VALUES(NULL, NULL);
    INSERT INTO p1 VALUES(4, 4);
    INSERT INTO p1 VALUES(5, 5);
    INSERT INTO c1 VALUES(NULL, NULL);
    INSERT INTO c1 VALUES(4, 4);
    INSERT INTO c1 VALUES(5, 5);
    SELECT count(*) FROM c1
;UPDATE p1 SET b = 10 WHERE b = 5;
    SELECT d, c FROM c1
;UPDATE p1 SET b = 11 WHERE b = 4;
    SELECT d, c FROM c1
;UPDATE p1 SET b = 6 WHERE b IS NULL;
    SELECT d, c FROM c1
;SELECT * FROM p1
;CREATE TABLE artist(
      artistid    INTEGER PRIMARY KEY, 
      artistname  TEXT
    );
    CREATE TABLE track(
      trackid     INTEGER,
      trackname   TEXT, 
      trackartist INTEGER REFERENCES artist(artistid) ON UPDATE CASCADE
    );

    INSERT INTO artist VALUES(1, 'Dean Martin');
    INSERT INTO artist VALUES(2, 'Frank Sinatra');
    INSERT INTO track VALUES(11, 'That''s Amore', 1);
    INSERT INTO track VALUES(12, 'Christmas Blues', 1);
    INSERT INTO track VALUES(13, 'My Way', 2)
;UPDATE artist SET artistid = 100 WHERE artistname = 'Dean Martin'
;SELECT * FROM artist
;SELECT * FROM track
;CREATE TABLE parent(a COLLATE nocase, b, c, PRIMARY KEY(c, a));
    CREATE TABLE child(d DEFAULT 'a', e, f DEFAULT 'c',
      FOREIGN KEY(f, d) REFERENCES parent ON UPDATE SET DEFAULT
    );

    INSERT INTO parent VALUES('A', 'b', 'c');
    INSERT INTO parent VALUES('ONE', 'two', 'three');
    INSERT INTO child VALUES('one', 'two', 'three')
;BEGIN;
      UPDATE parent SET a = '' WHERE a = 'oNe';
      SELECT * FROM child
;ROLLBACK;
    DELETE FROM parent WHERE a = 'A';
    SELECT * FROM parent
;CREATE TABLE artist(
      artistid    INTEGER PRIMARY KEY, 
      artistname  TEXT
    );
    CREATE TABLE track(
      trackid     INTEGER,
      trackname   TEXT, 
      trackartist INTEGER DEFAULT 0 REFERENCES artist(artistid) ON DELETE SET DEFAULT
    );
    INSERT INTO artist VALUES(3, 'Sammy Davis Jr.');
    INSERT INTO track VALUES(14, 'Mr. Bojangles', 3)
;INSERT INTO artist VALUES(0, 'Unknown Artist');
    DELETE FROM artist WHERE artistname = 'Sammy Davis Jr.'
;SELECT * FROM artist
;SELECT * FROM track
;CREATE TABLE parent(x PRIMARY KEY);

    CREATE TRIGGER bu BEFORE UPDATE ON parent BEGIN
      INSERT INTO parent VALUES(new.x-old.x);
    END;
    CREATE TABLE child(
      a DEFAULT (maxparent()) REFERENCES parent ON UPDATE SET DEFAULT
    );
    CREATE TRIGGER au AFTER UPDATE ON parent BEGIN
      INSERT INTO parent VALUES(new.x+old.x);
    END;

    INSERT INTO parent VALUES(1);
    INSERT INTO child VALUES(1)
;UPDATE parent SET x = 22;
    SELECT * FROM parent ORDER BY rowid; SELECT 'xxx' ; SELECT a FROM child
;DELETE FROM child;
    DELETE FROM parent;
    INSERT INTO parent VALUES(-1);
    INSERT INTO child VALUES(-1);
    UPDATE parent SET x = 22;
    SELECT * FROM parent ORDER BY rowid; SELECT 'xxx' ; SELECT a FROM child
;CREATE TABLE zeus(a INTEGER COLLATE NOCASE, b, PRIMARY KEY(a, b));
    CREATE TABLE apollo(c, d, 
      FOREIGN KEY(c, d) REFERENCES zeus ON UPDATE CASCADE
    );
    INSERT INTO zeus VALUES('abc', 'xyz');
    INSERT INTO apollo VALUES('ABC', 'xyz')
;UPDATE zeus SET a = 'aBc';
    SELECT * FROM apollo
;UPDATE zeus SET a = 1, b = 1;
    SELECT * FROM apollo
;UPDATE zeus SET a = 1, b = 1;
    SELECT typeof(c), c, typeof(d), d FROM apollo
;UPDATE zeus SET a = '1';
    SELECT typeof(c), c, typeof(d), d FROM apollo
;UPDATE zeus SET b = '1';
    SELECT typeof(c), c, typeof(d), d FROM apollo
;UPDATE zeus SET b = NULL;
    SELECT typeof(c), c, typeof(d), d FROM apollo
;CREATE TABLE parent(x PRIMARY KEY);
    CREATE TABLE child(y REFERENCES parent ON UPDATE SET NULL);
    INSERT INTO parent VALUES('key');
    INSERT INTO child VALUES('key')
;UPDATE parent SET x = 'key';
    SELECT IFNULL(y, 'null') FROM child
;UPDATE parent SET x = 'key2';
    SELECT IFNULL(y, 'null') FROM child
;PRAGMA foreign_keys = OFF
;PRAGMA foreign_keys = ON
;CREATE TABLE tbl(a, b)
;CREATE TABLE 'p 1 "parent one"'(a REFERENCES 'p 1 "parent one"', b, PRIMARY KEY(b));

    CREATE TABLE c1(c, d REFERENCES 'p 1 "parent one"' ON UPDATE CASCADE);
    CREATE TABLE c2(e, f, FOREIGN KEY(f) REFERENCES 'p 1 "parent one"' ON UPDATE CASCADE);
    CREATE TABLE c3(e, 'f col 2', FOREIGN KEY('f col 2') REFERENCES 'p 1 "parent one"' ON UPDATE CASCADE);

    INSERT INTO 'p 1 "parent one"' VALUES(1, 1);
    INSERT INTO c1 VALUES(1, 1);
    INSERT INTO c2 VALUES(1, 1);
    INSERT INTO c3 VALUES(1, 1);

    -- CREATE TABLE q(a, b, PRIMARY KEY(b))
;ALTER TABLE 'p 1 "parent one"' RENAME TO p
;UPDATE p SET a = 'xxx', b = 'xxx';
    SELECT * FROM p;
    SELECT * FROM c1;
    SELECT * FROM c2;
    SELECT * FROM c3
;SELECT sql FROM sqlite_master WHERE type = 'table'
;CREATE TABLE p(a, b, PRIMARY KEY(a, b));

    CREATE TABLE c1(c, d, FOREIGN KEY(c, d) REFERENCES p ON DELETE SET NULL);
    CREATE TABLE c2(c, d, FOREIGN KEY(c, d) REFERENCES p ON DELETE SET DEFAULT);
    CREATE TABLE c3(c, d, FOREIGN KEY(c, d) REFERENCES p ON DELETE CASCADE);
    CREATE TABLE c4(c, d, FOREIGN KEY(c, d) REFERENCES p ON DELETE RESTRICT);
    CREATE TABLE c5(c, d, FOREIGN KEY(c, d) REFERENCES p ON DELETE NO ACTION);

    CREATE TABLE c6(c, d, 
      FOREIGN KEY(c, d) REFERENCES p ON DELETE RESTRICT 
      DEFERRABLE INITIALLY DEFERRED
    );
    CREATE TABLE c7(c, d, 
      FOREIGN KEY(c, d) REFERENCES p ON DELETE NO ACTION
      DEFERRABLE INITIALLY DEFERRED
    );

    CREATE TABLE log(msg);
    CREATE TRIGGER tt AFTER DELETE ON p BEGIN
      INSERT INTO log VALUES('delete ' || old.rowid);
    END
;INSERT INTO p VALUES('a', 'b');
    INSERT INTO c1 VALUES('a', 'b');
    INSERT INTO c2 VALUES('a', 'b');
    INSERT INTO c3 VALUES('a', 'b');
    BEGIN;
      DROP TABLE p;
      SELECT * FROM c1
;SELECT * FROM c2
;SELECT * FROM c3
;SELECT * FROM log
;BEGIN;
      DELETE FROM p;
      SELECT * FROM log;
    ROLLBACK
;DELETE FROM c1;
    DELETE FROM c2;
    DELETE FROM c3
;INSERT INTO c5 VALUES('a', 'b')
;SELECT * FROM p
;SELECT * FROM p;
    SELECT * FROM c5;
    ROLLBACK
;DELETE FROM c1 ; DELETE FROM c2 ; DELETE FROM c3 ;
    DELETE FROM c4 ; DELETE FROM c5 ; DELETE FROM c6 ;
    DELETE FROM c7
;INSERT INTO c7 VALUES('a', 'b')
;BEGIN;
      DROP TABLE p
;CREATE TABLE p(a, b, PRIMARY KEY(a, b))
;INSERT INTO p VALUES('a', 'b')
;PRAGMA foreign_keys = OFF;

    CREATE TABLE p(a PRIMARY KEY, b REFERENCES nosuchtable);
    CREATE TABLE c1(c, d, FOREIGN KEY(c, d) REFERENCES a);
    CREATE TABLE c2(c REFERENCES p(b), d);
    CREATE TABLE c3(c REFERENCES p ON DELETE SET NULL, d);

    INSERT INTO p VALUES(1, 2);
    INSERT INTO c1 VALUES(1, 2);
    INSERT INTO c2 VALUES(1, 2);
    INSERT INTO c3 VALUES(1, 2)
;PRAGMA foreign_keys = ON
;BEGIN;
      DROP TABLE p;
      SELECT * FROM c3;
    ROLLBACK
;CREATE TABLE nosuchtable(x PRIMARY KEY)
;DROP TABLE c1
;DROP TABLE c2
;DELETE FROM p
;CREATE TABLE t1(a, b)
;PRAGMA foreign_keys = OFF
;ALTER TABLE t1 ADD COLUMN c DEFAULT 'xxx' REFERENCES t2
;SELECT sql FROM sqlite_master WHERE name = 't1'
;PRAGMA foreign_keys = ON
;CREATE TABLE p(a UNIQUE);
    CREATE TABLE c(b REFERENCES p(a));
    BEGIN;
      ALTER TABLE p RENAME TO parent;
      SELECT sql FROM sqlite_master WHERE name = 'c';
    ROLLBACK
;PRAGMA foreign_keys = OFF;
    ALTER TABLE p RENAME TO parent;
    SELECT sql FROM sqlite_master WHERE name = 'c'
;PRAGMA foreign_keys = ON;