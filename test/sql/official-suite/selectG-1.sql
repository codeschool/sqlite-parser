-- original: selectG.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

SELECT count(x), sum(x), avg(x), sub_microsec<10000000 FROM t1;