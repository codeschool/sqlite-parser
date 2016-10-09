-- original: fts3malloc.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

DROP TABLE ft1;
    DROP TABLE ft2;
    DROP TABLE ft3;
    DROP TABLE ft4;
    DROP TABLE ft6;
    DROP TABLE ft7
;CREATE VIRTUAL TABLE ft USING fts3(a, b)
;INSERT INTO ft VALUES(sub_a, sub_b)
;INSERT INTO ft VALUES(sub_a, sub_b)
;DELETE FROM ft WHERE docid>=32
;SELECT a FROM ft
;CREATE VIRTUAL TABLE ft8 USING fts3(x, tokenize porter);