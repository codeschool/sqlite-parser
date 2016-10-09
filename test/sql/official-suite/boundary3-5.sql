-- original: boundary3.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

SELECT t2.a FROM t1 JOIN t2 USING(a)
     WHERE t1.rowid <= -140737488355328 ORDER BY t2.a
;SELECT t2.a FROM t2 NATURAL JOIN t1
     WHERE t1.rowid <= -140737488355328 ORDER BY t1.a DESC
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid <= t2.r
     WHERE t2.a=44
     ORDER BY t1.rowid
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid <= t2.r
     WHERE t2.a=44
     ORDER BY t1.rowid DESC
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid <= t2.r
     WHERE t2.a=44
     ORDER BY x
;SELECT t1.* FROM t1, t2 WHERE t1.rowid=1099511627776 AND t2.a=t1.a
;SELECT t2.* FROM t1 JOIN t2 USING(a) WHERE x='0000010000000000'
;SELECT t1.rowid, x FROM t1 JOIN t2 ON t2.r=t1.rowid WHERE t2.a=19
;SELECT t2.a FROM t1 JOIN t2 USING(a)
     WHERE t1.rowid > 1099511627776 ORDER BY t2.a
;SELECT t2.a FROM t2 NATURAL JOIN t1
     WHERE t1.rowid > 1099511627776 ORDER BY t1.a DESC
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid > t2.r
     WHERE t2.a=19
     ORDER BY t1.rowid
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid > t2.r
     WHERE t2.a=19
     ORDER BY t1.rowid DESC
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid > t2.r
     WHERE t2.a=19
     ORDER BY x
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid > CAST(t2.r AS real)
     WHERE t2.a=19
     ORDER BY t1.rowid
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid > CAST(t2.r AS real)
     WHERE t2.a=19
     ORDER BY t1.rowid DESC
;SELECT t2.a FROM t1 JOIN t2 USING(a)
     WHERE t1.rowid >= 1099511627776 ORDER BY t2.a
;SELECT t2.a FROM t2 NATURAL JOIN t1
     WHERE t1.rowid >= 1099511627776 ORDER BY t1.a DESC
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid >= t2.r
     WHERE t2.a=19
     ORDER BY t1.rowid
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid >= t2.r
     WHERE t2.a=19
     ORDER BY t1.rowid DESC
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid >= t2.r
     WHERE t2.a=19
     ORDER BY x
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid >= CAST(t2.r AS real)
     WHERE t2.a=19
     ORDER BY t1.rowid
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid >= CAST(t2.r AS real)
     WHERE t2.a=19
     ORDER BY t1.rowid DESC
;SELECT t2.a FROM t1 JOIN t2 USING(a)
     WHERE t1.rowid < 1099511627776 ORDER BY t2.a
;SELECT t2.a FROM t2 NATURAL JOIN t1
     WHERE t1.rowid < 1099511627776 ORDER BY t1.a DESC
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid < t2.r
     WHERE t2.a=19
     ORDER BY t1.rowid
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid < t2.r
     WHERE t2.a=19
     ORDER BY t1.rowid DESC
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid < t2.r
     WHERE t2.a=19
     ORDER BY x
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid < CAST(t2.r AS real)
     WHERE t2.a=19
     ORDER BY t1.rowid
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid < CAST(t2.r AS real)
     WHERE t2.a=19
     ORDER BY t1.rowid DESC
;SELECT t2.a FROM t1 JOIN t2 USING(a)
     WHERE t1.rowid <= 1099511627776 ORDER BY t2.a
;SELECT t2.a FROM t2 NATURAL JOIN t1
     WHERE t1.rowid <= 1099511627776 ORDER BY t1.a DESC
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid <= t2.r
     WHERE t2.a=19
     ORDER BY t1.rowid
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid <= t2.r
     WHERE t2.a=19
     ORDER BY t1.rowid DESC
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid <= t2.r
     WHERE t2.a=19
     ORDER BY x
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid <= CAST(t2.r AS real)
     WHERE t2.a=19
     ORDER BY t1.rowid
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid <= CAST(t2.r AS real)
     WHERE t2.a=19
     ORDER BY t1.rowid DESC
;SELECT t2.a FROM t1 JOIN t2 USING(a)
     WHERE t1.rowid > 9223372036854775807 ORDER BY t2.a
;SELECT t2.a FROM t2 NATURAL JOIN t1
     WHERE t1.rowid > 9223372036854775807 ORDER BY t1.a DESC
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid > t2.r
     WHERE t2.a=3
     ORDER BY t1.rowid
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid > t2.r
     WHERE t2.a=3
     ORDER BY t1.rowid DESC
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid > t2.r
     WHERE t2.a=3
     ORDER BY x
;SELECT t2.a FROM t1 JOIN t2 USING(a)
     WHERE t1.rowid >= 9223372036854775807 ORDER BY t2.a
;SELECT t2.a FROM t2 NATURAL JOIN t1
     WHERE t1.rowid >= 9223372036854775807 ORDER BY t1.a DESC
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid >= t2.r
     WHERE t2.a=3
     ORDER BY t1.rowid
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid >= t2.r
     WHERE t2.a=3
     ORDER BY t1.rowid DESC
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid >= t2.r
     WHERE t2.a=3
     ORDER BY x
;SELECT t2.a FROM t1 JOIN t2 USING(a)
     WHERE t1.rowid < 9223372036854775807 ORDER BY t2.a
;SELECT t2.a FROM t2 NATURAL JOIN t1
     WHERE t1.rowid < 9223372036854775807 ORDER BY t1.a DESC
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid < t2.r
     WHERE t2.a=3
     ORDER BY t1.rowid
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid < t2.r
     WHERE t2.a=3
     ORDER BY t1.rowid DESC
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid < t2.r
     WHERE t2.a=3
     ORDER BY x
;SELECT t2.a FROM t1 JOIN t2 USING(a)
     WHERE t1.rowid <= 9223372036854775807 ORDER BY t2.a
;SELECT t2.a FROM t2 NATURAL JOIN t1
     WHERE t1.rowid <= 9223372036854775807 ORDER BY t1.a DESC
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid <= t2.r
     WHERE t2.a=3
     ORDER BY t1.rowid
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid <= t2.r
     WHERE t2.a=3
     ORDER BY t1.rowid DESC
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid <= t2.r
     WHERE t2.a=3
     ORDER BY x
;SELECT t1.* FROM t1, t2 WHERE t1.rowid=32768 AND t2.a=t1.a
;SELECT t2.* FROM t1 JOIN t2 USING(a) WHERE x='0000000000008000'
;SELECT t1.rowid, x FROM t1 JOIN t2 ON t2.r=t1.rowid WHERE t2.a=50
;SELECT t2.a FROM t1 JOIN t2 USING(a)
     WHERE t1.rowid > 32768 ORDER BY t2.a
;SELECT t2.a FROM t2 NATURAL JOIN t1
     WHERE t1.rowid > 32768 ORDER BY t1.a DESC
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid > t2.r
     WHERE t2.a=50
     ORDER BY t1.rowid
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid > t2.r
     WHERE t2.a=50
     ORDER BY t1.rowid DESC
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid > t2.r
     WHERE t2.a=50
     ORDER BY x
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid > CAST(t2.r AS real)
     WHERE t2.a=50
     ORDER BY t1.rowid
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid > CAST(t2.r AS real)
     WHERE t2.a=50
     ORDER BY t1.rowid DESC
;SELECT t2.a FROM t1 JOIN t2 USING(a)
     WHERE t1.rowid >= 32768 ORDER BY t2.a
;SELECT t2.a FROM t2 NATURAL JOIN t1
     WHERE t1.rowid >= 32768 ORDER BY t1.a DESC
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid >= t2.r
     WHERE t2.a=50
     ORDER BY t1.rowid
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid >= t2.r
     WHERE t2.a=50
     ORDER BY t1.rowid DESC
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid >= t2.r
     WHERE t2.a=50
     ORDER BY x
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid >= CAST(t2.r AS real)
     WHERE t2.a=50
     ORDER BY t1.rowid
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid >= CAST(t2.r AS real)
     WHERE t2.a=50
     ORDER BY t1.rowid DESC
;SELECT t2.a FROM t1 JOIN t2 USING(a)
     WHERE t1.rowid < 32768 ORDER BY t2.a
;SELECT t2.a FROM t2 NATURAL JOIN t1
     WHERE t1.rowid < 32768 ORDER BY t1.a DESC
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid < t2.r
     WHERE t2.a=50
     ORDER BY t1.rowid
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid < t2.r
     WHERE t2.a=50
     ORDER BY t1.rowid DESC
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid < t2.r
     WHERE t2.a=50
     ORDER BY x
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid < CAST(t2.r AS real)
     WHERE t2.a=50
     ORDER BY t1.rowid
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid < CAST(t2.r AS real)
     WHERE t2.a=50
     ORDER BY t1.rowid DESC
;SELECT t2.a FROM t1 JOIN t2 USING(a)
     WHERE t1.rowid <= 32768 ORDER BY t2.a
;SELECT t2.a FROM t2 NATURAL JOIN t1
     WHERE t1.rowid <= 32768 ORDER BY t1.a DESC
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid <= t2.r
     WHERE t2.a=50
     ORDER BY t1.rowid
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid <= t2.r
     WHERE t2.a=50
     ORDER BY t1.rowid DESC
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid <= t2.r
     WHERE t2.a=50
     ORDER BY x
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid <= CAST(t2.r AS real)
     WHERE t2.a=50
     ORDER BY t1.rowid
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid <= CAST(t2.r AS real)
     WHERE t2.a=50
     ORDER BY t1.rowid DESC
;SELECT t1.* FROM t1, t2 WHERE t1.rowid=-36028797018963968 AND t2.a=t1.a
;SELECT t2.* FROM t1 JOIN t2 USING(a) WHERE x='ff80000000000000'
;SELECT t1.rowid, x FROM t1 JOIN t2 ON t2.r=t1.rowid WHERE t2.a=64
;SELECT t2.a FROM t1 JOIN t2 USING(a)
     WHERE t1.rowid > -36028797018963968 ORDER BY t2.a
;SELECT t2.a FROM t2 NATURAL JOIN t1
     WHERE t1.rowid > -36028797018963968 ORDER BY t1.a DESC
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid > t2.r
     WHERE t2.a=64
     ORDER BY t1.rowid
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid > t2.r
     WHERE t2.a=64
     ORDER BY t1.rowid DESC
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid > t2.r
     WHERE t2.a=64
     ORDER BY x
;SELECT t2.a FROM t1 JOIN t2 USING(a)
     WHERE t1.rowid >= -36028797018963968 ORDER BY t2.a
;SELECT t2.a FROM t2 NATURAL JOIN t1
     WHERE t1.rowid >= -36028797018963968 ORDER BY t1.a DESC
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid >= t2.r
     WHERE t2.a=64
     ORDER BY t1.rowid
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid >= t2.r
     WHERE t2.a=64
     ORDER BY t1.rowid DESC
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid >= t2.r
     WHERE t2.a=64
     ORDER BY x;