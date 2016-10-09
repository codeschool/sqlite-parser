-- original: vtab2.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

CREATE VIRTUAL TABLE schema USING schema;
    SELECT * FROM schema
;SELECT length(tablename) FROM schema GROUP by tablename
;SELECT tablename FROM schema GROUP by length(tablename)
;SELECT length(tablename) FROM schema GROUP by length(tablename)
;CREATE VIRTUAL TABLE vars USING tclvar;
    SELECT * FROM vars WHERE name='abc'
;SELECT * FROM vars WHERE name='A'
;SELECT name, value FROM vars
      WHERE name MATCH 'tcl_*' AND arrayname = '' 
      ORDER BY name
;SELECT * FROM schema WHERE dflt_value IS NULL LIMIT 1
;SELECT *, b.rowid
      FROM schema a LEFT JOIN schema b ON a.dflt_value=b.dflt_value
     WHERE a.rowid=1
;SELECT *, b.rowid
      FROM schema a LEFT JOIN schema b ON a.dflt_value IS b.dflt_value
                                      AND a.dflt_value IS NOT NULL
     WHERE a.rowid=1
;BEGIN TRANSACTION;
    CREATE TABLE t1(a INTEGER PRIMARY KEY, b, c, UNIQUE(b, c));
    CREATE TABLE fkey(
      to_tbl,
      to_col
    );
    INSERT INTO "fkey" VALUES('t1',NULL);
    COMMIT
;CREATE VIRTUAL TABLE v_col USING schema
;SELECT name FROM v_col WHERE tablename = 't1' AND pk
;UPDATE fkey 
    SET to_col = (SELECT name FROM v_col WHERE tablename = 't1' AND pk)
;SELECT * FROM fkey
;PRAGMA encoding='UTF16';