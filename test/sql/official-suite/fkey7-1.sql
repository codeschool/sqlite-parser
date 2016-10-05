-- original: fkey7.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

PRAGMA foreign_keys = 1;

  CREATE TABLE s1(a PRIMARY KEY, b);
  CREATE TABLE par(a, b REFERENCES s1, c UNIQUE, PRIMARY KEY(a));

  CREATE TABLE c1(a, b REFERENCES par);
  CREATE TABLE c2(a, b REFERENCES par);
  CREATE TABLE c3(a, b REFERENCES par(c))
;CREATE TABLE pX(x PRIMARY KEY);
    CREATE TABLE cX(a INTEGER PRIMARY KEY, b REFERENCES pX);