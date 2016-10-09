-- original: fts3shared.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

BEGIN;
    INSERT INTO t1 VALUES('The steersman''s face by his lamp gleamed white;')
;COMMIT
;CREATE VIRTUAL TABLE t1 USING fts4;
    CREATE TABLE t2ext(a, b);
    CREATE VIRTUAL TABLE t2 USING fts4(content=t2ext);
    CREATE VIRTUAL TABLE t1aux USING fts4aux(t1);
    CREATE VIRTUAL TABLE t2aux USING fts4aux(t2);

    INSERT INTO t1   VALUES('a b c');
    INSERT INTO t2(rowid, a, b) VALUES(1, 'd e f', 'g h i')
;BEGIN;
      INSERT INTO t1 VALUES('j k l')
;BEGIN;
      INSERT INTO t2(rowid, a, b) VALUES(2, 'j k l', 'm n o');