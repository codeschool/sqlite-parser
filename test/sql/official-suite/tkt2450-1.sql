-- original: tkt2450.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

CREATE TABLE "t a" ("""cb""");
    INSERT INTO "t a" ("""cb""") VALUES (1);
    SELECT """cb""" FROM "t a"
;SELECT * FROM "t a"
;SELECT "t a".* FROM "t a"
;CREATE TABLE t1(a);
    INSERT INTO t1 VALUES(2);
    SELECT * FROM "t a", t1;