-- original: collate9.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

CREATE TABLE xy(x COLLATE "reverse sort", y COLLATE binary);
    INSERT INTO xy VALUES('one', 'one');
    INSERT INTO xy VALUES('two', 'two');
    INSERT INTO xy VALUES('three', 'three')
;SELECT x FROM xy ORDER BY x
;SELECT y FROM xy ORDER BY y
;CREATE INDEX xy_i ON xy(x)
;SELECT x, x < 'seven' FROM xy ORDER BY x
;SELECT y, y < 'seven' FROM xy ORDER BY x
;SELECT y, y COLLATE "reverse sort" < 'seven' FROM xy ORDER BY x
;SELECT y FROM xy ORDER BY y
;SELECT y FROM xy ORDER BY y COLLATE "reverse sort"
;SELECT y COLLATE "reverse sort" AS aaa FROM xy ORDER BY aaa
;CREATE INDEX xy_i2 ON xy(y COLLATE "reverse sort")
;REINDEX "reverse sort"
;PRAGMA integrity_check
;REINDEX "reverse sort"
;PRAGMA integrity_check;