-- original: tkt2817.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

CREATE TEMP TABLE tbl(a, b, c);
    -- INSERT INTO tbl VALUES(1, 'abc', 'def');
    -- INSERT INTO tbl VALUES(2, 'ghi', 'jkl')
;CREATE TABLE main.tbl(a, b, c); 
    CREATE INDEX main.tbli ON tbl(a, b, c);
    INSERT INTO main.tbl SELECT a, b, c FROM temp.tbl
;CREATE TEMP TABLE tmp(a, b, c);
    INSERT INTO tmp VALUES(1, 'abc', 'def');
    INSERT INTO tmp VALUES(2, 'ghi', 'jkl')
;CREATE TABLE main.tbl(a, b, c); 
    CREATE INDEX main.tbli ON tbl(a, b, c);
    INSERT INTO main.tbl SELECT a, b, c FROM temp.tmp;