-- original: ioerr4.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

PRAGMA auto_vacuum=INCREMENTAL;
    CREATE TABLE a(i INTEGER, b BLOB)
;SELECT name FROM sqlite_master
;PRAGMA auto_vacuum
;INSERT INTO a VALUES(1, zeroblob(2000));
    INSERT INTO a VALUES(2, zeroblob(2000));
    INSERT INTO a SELECT i+2, zeroblob(2000) FROM a;
    INSERT INTO a SELECT i+4, zeroblob(2000) FROM a;
    INSERT INTO a SELECT i+8, zeroblob(2000) FROM a;
    INSERT INTO a SELECT i+16, zeroblob(2000) FROM a;
    SELECT count(*) FROM a
;PRAGMA auto_vacuum=INCREMENTAL
;PRAGMA incremental_vacuum(5);