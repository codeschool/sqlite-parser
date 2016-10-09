-- original: boundary3.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

SELECT t1.a FROM t1 JOIN t2 ON t1.rowid >= t2.r
     WHERE t2.a=6
     ORDER BY t1.rowid
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid >= t2.r
     WHERE t2.a=6
     ORDER BY t1.rowid DESC
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid >= t2.r
     WHERE t2.a=6
     ORDER BY x
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid >= CAST(t2.r AS real)
     WHERE t2.a=6
     ORDER BY t1.rowid
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid >= CAST(t2.r AS real)
     WHERE t2.a=6
     ORDER BY t1.rowid DESC
;SELECT t2.a FROM t1 JOIN t2 USING(a)
     WHERE t1.rowid < 16777216 ORDER BY t2.a
;SELECT t2.a FROM t2 NATURAL JOIN t1
     WHERE t1.rowid < 16777216 ORDER BY t1.a DESC
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid < t2.r
     WHERE t2.a=6
     ORDER BY t1.rowid
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid < t2.r
     WHERE t2.a=6
     ORDER BY t1.rowid DESC
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid < t2.r
     WHERE t2.a=6
     ORDER BY x
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid < CAST(t2.r AS real)
     WHERE t2.a=6
     ORDER BY t1.rowid
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid < CAST(t2.r AS real)
     WHERE t2.a=6
     ORDER BY t1.rowid DESC
;SELECT t2.a FROM t1 JOIN t2 USING(a)
     WHERE t1.rowid <= 16777216 ORDER BY t2.a
;SELECT t2.a FROM t2 NATURAL JOIN t1
     WHERE t1.rowid <= 16777216 ORDER BY t1.a DESC
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid <= t2.r
     WHERE t2.a=6
     ORDER BY t1.rowid
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid <= t2.r
     WHERE t2.a=6
     ORDER BY t1.rowid DESC
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid <= t2.r
     WHERE t2.a=6
     ORDER BY x
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid <= CAST(t2.r AS real)
     WHERE t2.a=6
     ORDER BY t1.rowid
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid <= CAST(t2.r AS real)
     WHERE t2.a=6
     ORDER BY t1.rowid DESC
;SELECT t1.* FROM t1, t2 WHERE t1.rowid=-32769 AND t2.a=t1.a
;SELECT t2.* FROM t1 JOIN t2 USING(a) WHERE x='ffffffffffff7fff'
;SELECT t1.rowid, x FROM t1 JOIN t2 ON t2.r=t1.rowid WHERE t2.a=29
;SELECT t2.a FROM t1 JOIN t2 USING(a)
     WHERE t1.rowid > -32769 ORDER BY t2.a
;SELECT t2.a FROM t2 NATURAL JOIN t1
     WHERE t1.rowid > -32769 ORDER BY t1.a DESC
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid > t2.r
     WHERE t2.a=29
     ORDER BY t1.rowid
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid > t2.r
     WHERE t2.a=29
     ORDER BY t1.rowid DESC
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid > t2.r
     WHERE t2.a=29
     ORDER BY x
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid > CAST(t2.r AS real)
     WHERE t2.a=29
     ORDER BY t1.rowid
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid > CAST(t2.r AS real)
     WHERE t2.a=29
     ORDER BY t1.rowid DESC
;SELECT t2.a FROM t1 JOIN t2 USING(a)
     WHERE t1.rowid >= -32769 ORDER BY t2.a
;SELECT t2.a FROM t2 NATURAL JOIN t1
     WHERE t1.rowid >= -32769 ORDER BY t1.a DESC
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid >= t2.r
     WHERE t2.a=29
     ORDER BY t1.rowid
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid >= t2.r
     WHERE t2.a=29
     ORDER BY t1.rowid DESC
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid >= t2.r
     WHERE t2.a=29
     ORDER BY x
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid >= CAST(t2.r AS real)
     WHERE t2.a=29
     ORDER BY t1.rowid
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid >= CAST(t2.r AS real)
     WHERE t2.a=29
     ORDER BY t1.rowid DESC
;SELECT t2.a FROM t1 JOIN t2 USING(a)
     WHERE t1.rowid < -32769 ORDER BY t2.a
;SELECT t2.a FROM t2 NATURAL JOIN t1
     WHERE t1.rowid < -32769 ORDER BY t1.a DESC
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid < t2.r
     WHERE t2.a=29
     ORDER BY t1.rowid
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid < t2.r
     WHERE t2.a=29
     ORDER BY t1.rowid DESC
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid < t2.r
     WHERE t2.a=29
     ORDER BY x
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid < CAST(t2.r AS real)
     WHERE t2.a=29
     ORDER BY t1.rowid
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid < CAST(t2.r AS real)
     WHERE t2.a=29
     ORDER BY t1.rowid DESC
;SELECT t2.a FROM t1 JOIN t2 USING(a)
     WHERE t1.rowid <= -32769 ORDER BY t2.a
;SELECT t2.a FROM t2 NATURAL JOIN t1
     WHERE t1.rowid <= -32769 ORDER BY t1.a DESC
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid <= t2.r
     WHERE t2.a=29
     ORDER BY t1.rowid
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid <= t2.r
     WHERE t2.a=29
     ORDER BY t1.rowid DESC
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid <= t2.r
     WHERE t2.a=29
     ORDER BY x
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid <= CAST(t2.r AS real)
     WHERE t2.a=29
     ORDER BY t1.rowid
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid <= CAST(t2.r AS real)
     WHERE t2.a=29
     ORDER BY t1.rowid DESC
;SELECT t1.* FROM t1, t2 WHERE t1.rowid=-140737488355329 AND t2.a=t1.a
;SELECT t2.* FROM t1 JOIN t2 USING(a) WHERE x='ffff7fffffffffff'
;SELECT t1.rowid, x FROM t1 JOIN t2 ON t2.r=t1.rowid WHERE t2.a=21
;SELECT t2.a FROM t1 JOIN t2 USING(a)
     WHERE t1.rowid > -140737488355329 ORDER BY t2.a
;SELECT t2.a FROM t2 NATURAL JOIN t1
     WHERE t1.rowid > -140737488355329 ORDER BY t1.a DESC
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid > t2.r
     WHERE t2.a=21
     ORDER BY t1.rowid
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid > t2.r
     WHERE t2.a=21
     ORDER BY t1.rowid DESC
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid > t2.r
     WHERE t2.a=21
     ORDER BY x
;SELECT t2.a FROM t1 JOIN t2 USING(a)
     WHERE t1.rowid >= -140737488355329 ORDER BY t2.a
;SELECT t2.a FROM t2 NATURAL JOIN t1
     WHERE t1.rowid >= -140737488355329 ORDER BY t1.a DESC
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid >= t2.r
     WHERE t2.a=21
     ORDER BY t1.rowid
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid >= t2.r
     WHERE t2.a=21
     ORDER BY t1.rowid DESC
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid >= t2.r
     WHERE t2.a=21
     ORDER BY x
;SELECT t2.a FROM t1 JOIN t2 USING(a)
     WHERE t1.rowid < -140737488355329 ORDER BY t2.a
;SELECT t2.a FROM t2 NATURAL JOIN t1
     WHERE t1.rowid < -140737488355329 ORDER BY t1.a DESC
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid < t2.r
     WHERE t2.a=21
     ORDER BY t1.rowid
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid < t2.r
     WHERE t2.a=21
     ORDER BY t1.rowid DESC
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid < t2.r
     WHERE t2.a=21
     ORDER BY x
;SELECT t2.a FROM t1 JOIN t2 USING(a)
     WHERE t1.rowid <= -140737488355329 ORDER BY t2.a
;SELECT t2.a FROM t2 NATURAL JOIN t1
     WHERE t1.rowid <= -140737488355329 ORDER BY t1.a DESC
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid <= t2.r
     WHERE t2.a=21
     ORDER BY t1.rowid
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid <= t2.r
     WHERE t2.a=21
     ORDER BY t1.rowid DESC
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid <= t2.r
     WHERE t2.a=21
     ORDER BY x
;SELECT t1.* FROM t1, t2 WHERE t1.rowid=2 AND t2.a=t1.a
;SELECT t2.* FROM t1 JOIN t2 USING(a) WHERE x='0000000000000002'
;SELECT t1.rowid, x FROM t1 JOIN t2 ON t2.r=t1.rowid WHERE t2.a=41
;SELECT t2.a FROM t1 JOIN t2 USING(a)
     WHERE t1.rowid > 2 ORDER BY t2.a
;SELECT t2.a FROM t2 NATURAL JOIN t1
     WHERE t1.rowid > 2 ORDER BY t1.a DESC
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid > t2.r
     WHERE t2.a=41
     ORDER BY t1.rowid
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid > t2.r
     WHERE t2.a=41
     ORDER BY t1.rowid DESC
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid > t2.r
     WHERE t2.a=41
     ORDER BY x
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid > CAST(t2.r AS real)
     WHERE t2.a=41
     ORDER BY t1.rowid
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid > CAST(t2.r AS real)
     WHERE t2.a=41
     ORDER BY t1.rowid DESC
;SELECT t2.a FROM t1 JOIN t2 USING(a)
     WHERE t1.rowid >= 2 ORDER BY t2.a
;SELECT t2.a FROM t2 NATURAL JOIN t1
     WHERE t1.rowid >= 2 ORDER BY t1.a DESC
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid >= t2.r
     WHERE t2.a=41
     ORDER BY t1.rowid
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid >= t2.r
     WHERE t2.a=41
     ORDER BY t1.rowid DESC
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid >= t2.r
     WHERE t2.a=41
     ORDER BY x
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid >= CAST(t2.r AS real)
     WHERE t2.a=41
     ORDER BY t1.rowid
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid >= CAST(t2.r AS real)
     WHERE t2.a=41
     ORDER BY t1.rowid DESC
;SELECT t2.a FROM t1 JOIN t2 USING(a)
     WHERE t1.rowid < 2 ORDER BY t2.a
;SELECT t2.a FROM t2 NATURAL JOIN t1
     WHERE t1.rowid < 2 ORDER BY t1.a DESC
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid < t2.r
     WHERE t2.a=41
     ORDER BY t1.rowid
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid < t2.r
     WHERE t2.a=41
     ORDER BY t1.rowid DESC
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid < t2.r
     WHERE t2.a=41
     ORDER BY x
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid < CAST(t2.r AS real)
     WHERE t2.a=41
     ORDER BY t1.rowid
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid < CAST(t2.r AS real)
     WHERE t2.a=41
     ORDER BY t1.rowid DESC
;SELECT t2.a FROM t1 JOIN t2 USING(a)
     WHERE t1.rowid <= 2 ORDER BY t2.a
;SELECT t2.a FROM t2 NATURAL JOIN t1
     WHERE t1.rowid <= 2 ORDER BY t1.a DESC
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid <= t2.r
     WHERE t2.a=41
     ORDER BY t1.rowid;