-- original: colmeta.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

CREATE TABLE abc(a, b, c);
    CREATE TABLE abc2(a PRIMARY KEY COLLATE NOCASE, b VARCHAR(32), c);
    CREATE TABLE abc3(a NOT NULL, b INTEGER PRIMARY KEY, c);
    CREATE TABLE abc5(w,x,y,z,PRIMARY KEY(x,z)) WITHOUT ROWID;
    CREATE TABLE abc6(rowid TEXT COLLATE rtrim, oid REAL, _rowid_ BLOB)
;CREATE TABLE abc4(a, b INTEGER PRIMARY KEY AUTOINCREMENT, c)
;CREATE VIEW v1 AS SELECT * FROM abc2;