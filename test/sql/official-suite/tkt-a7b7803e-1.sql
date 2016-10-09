-- original: tkt-a7b7803e.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

CREATE TABLE t1(a,b);
    INSERT INTO t1 VALUES(0,'first'),(99,'fuzzy');
    SELECT (t1.a==0) AS x, b
      FROM t1
     WHERE a=0 OR x
;SELECT a, (t1.b='fuzzy') AS x
      FROM t1
     WHERE x
;SELECT (a=99) AS x, (t1.b='fuzzy') AS y, *
      FROM t1
     WHERE x AND y
;SELECT (a=99) AS x, (t1.b='first') AS y, *
      FROM t1
     WHERE x OR y
     ORDER BY a
;SELECT (M.a=99) AS x, M.b, (N.b='first') AS y, N.b
      FROM t1 M, t1 N
     WHERE x OR y
     ORDER BY M.a, N.a
;SELECT (M.a=99) AS x, M.b, (N.b='first') AS y, N.b
      FROM t1 M, t1 N
     WHERE x AND y
     ORDER BY M.a, N.a
;SELECT (M.a=99) AS x, M.b, (N.b='first') AS y, N.b
      FROM t1 M JOIN t1 N ON x AND y
     ORDER BY M.a, N.a
;SELECT (M.a=99) AS x, M.b, (N.b='first') AS y, N.b
      FROM t1 M JOIN t1 N ON x
     ORDER BY M.a, N.a;