-- original: malloc5.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

PRAGMA cache_size=1
;PRAGMA auto_vacuum=OFF;
    BEGIN;
    CREATE TABLE abc(a, b, c)
;PRAGMA cache_size=2; SELECT * FROM sqlite_master
;COMMIT;
    BEGIN;
    SELECT * FROM abc
;COMMIT
;BEGIN;
    SELECT * FROM abc;
    CREATE TABLE def(d, e, f)
;COMMIT
;INSERT INTO abc VALUES(1, 2, 3);
    INSERT INTO abc VALUES(4, 5, 6);
    INSERT INTO def VALUES(7, 8, 9);
    INSERT INTO def VALUES(10,11,12)
;BEGIN;
    SELECT * FROM def
;SELECT * FROM abc
;COMMIT
;BEGIN;
    SELECT * FROM abc
;SELECT * FROM sqlite_master;
    BEGIN;
    SELECT * FROM def
;SELECT * FROM abc; COMMIT
;SELECT * FROM def; COMMIT
;PRAGMA cache_size=2000
;BEGIN
;DELETE FROM abc
;COMMIT
;SELECT * FROM abc
;PRAGMA cache_size=1
;SELECT * FROM abc
;SELECT count(*), sum(a), sum(b) FROM abc
;BEGIN;
    CREATE TABLE abc(a, b, c);
    INSERT INTO abc VALUES('abcdefghi', 1234567890, NULL);
    INSERT INTO abc SELECT * FROM abc;
    INSERT INTO abc SELECT * FROM abc;
    INSERT INTO abc SELECT * FROM abc;
    INSERT INTO abc SELECT * FROM abc;
    INSERT INTO abc SELECT * FROM abc;
    INSERT INTO abc SELECT * FROM abc;
    INSERT INTO abc SELECT * FROM abc
;COMMIT;
    PRAGMA temp_store = memory;
    SELECT * FROM abc ORDER BY a
;PRAGMA page_size=1024;
    PRAGMA default_cache_size=2
;PRAGMA temp_store = memory;
    BEGIN;
    CREATE TABLE abc(a PRIMARY KEY, b, c);
    INSERT INTO abc VALUES(randstr(50,50), randstr(75,75), randstr(100,100));
    INSERT INTO abc 
        SELECT randstr(50,50), randstr(75,75), randstr(100,100) FROM abc;
    INSERT INTO abc 
        SELECT randstr(50,50), randstr(75,75), randstr(100,100) FROM abc;
    INSERT INTO abc 
        SELECT randstr(50,50), randstr(75,75), randstr(100,100) FROM abc;
    INSERT INTO abc 
        SELECT randstr(50,50), randstr(75,75), randstr(100,100) FROM abc;
    INSERT INTO abc 
        SELECT randstr(50,50), randstr(75,75), randstr(100,100) FROM abc;
    INSERT INTO abc 
        SELECT randstr(50,50), randstr(75,75), randstr(100,100) FROM abc;
    COMMIT
;PRAGMA cache_size=2
;PRAGMA cache_size
;PRAGMA cache_size
;SELECT * FROM abc
;SELECT * FROM abc
;SELECT * FROM abc
;BEGIN;
    UPDATE abc SET c = randstr(100,100) 
    WHERE rowid = 1 OR rowid = (SELECT max(rowid) FROM abc)
;SELECT * FROM abc;