-- original: tkt-fc7bd6358f.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

CREATE TABLE t(textid TEXT);
    INSERT INTO t VALUES('12');
    INSERT INTO t VALUES('34');
    CREATE TABLE i(intid INTEGER PRIMARY KEY);
    INSERT INTO i VALUES(12);
    INSERT INTO i VALUES(34)
;PRAGMA automatic_index=ON
;PRAGMA automatic_index=OFF;