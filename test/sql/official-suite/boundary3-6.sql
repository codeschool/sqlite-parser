-- original: boundary3.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

SELECT t2.a FROM t1 JOIN t2 USING(a)
     WHERE t1.rowid < -36028797018963968 ORDER BY t2.a
;SELECT t2.a FROM t2 NATURAL JOIN t1
     WHERE t1.rowid < -36028797018963968 ORDER BY t1.a DESC
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid < t2.r
     WHERE t2.a=64
     ORDER BY t1.rowid
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid < t2.r
     WHERE t2.a=64
     ORDER BY t1.rowid DESC
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid < t2.r
     WHERE t2.a=64
     ORDER BY x
;SELECT t2.a FROM t1 JOIN t2 USING(a)
     WHERE t1.rowid <= -36028797018963968 ORDER BY t2.a
;SELECT t2.a FROM t2 NATURAL JOIN t1
     WHERE t1.rowid <= -36028797018963968 ORDER BY t1.a DESC
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid <= t2.r
     WHERE t2.a=64
     ORDER BY t1.rowid
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid <= t2.r
     WHERE t2.a=64
     ORDER BY t1.rowid DESC
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid <= t2.r
     WHERE t2.a=64
     ORDER BY x
;SELECT t1.* FROM t1, t2 WHERE t1.rowid=65535 AND t2.a=t1.a
;SELECT t2.* FROM t1 JOIN t2 USING(a) WHERE x='000000000000ffff'
;SELECT t1.rowid, x FROM t1 JOIN t2 ON t2.r=t1.rowid WHERE t2.a=48
;SELECT t2.a FROM t1 JOIN t2 USING(a)
     WHERE t1.rowid > 65535 ORDER BY t2.a
;SELECT t2.a FROM t2 NATURAL JOIN t1
     WHERE t1.rowid > 65535 ORDER BY t1.a DESC
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid > t2.r
     WHERE t2.a=48
     ORDER BY t1.rowid
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid > t2.r
     WHERE t2.a=48
     ORDER BY t1.rowid DESC
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid > t2.r
     WHERE t2.a=48
     ORDER BY x
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid > CAST(t2.r AS real)
     WHERE t2.a=48
     ORDER BY t1.rowid
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid > CAST(t2.r AS real)
     WHERE t2.a=48
     ORDER BY t1.rowid DESC
;SELECT t2.a FROM t1 JOIN t2 USING(a)
     WHERE t1.rowid >= 65535 ORDER BY t2.a
;SELECT t2.a FROM t2 NATURAL JOIN t1
     WHERE t1.rowid >= 65535 ORDER BY t1.a DESC
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid >= t2.r
     WHERE t2.a=48
     ORDER BY t1.rowid
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid >= t2.r
     WHERE t2.a=48
     ORDER BY t1.rowid DESC
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid >= t2.r
     WHERE t2.a=48
     ORDER BY x
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid >= CAST(t2.r AS real)
     WHERE t2.a=48
     ORDER BY t1.rowid
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid >= CAST(t2.r AS real)
     WHERE t2.a=48
     ORDER BY t1.rowid DESC
;SELECT t2.a FROM t1 JOIN t2 USING(a)
     WHERE t1.rowid < 65535 ORDER BY t2.a
;SELECT t2.a FROM t2 NATURAL JOIN t1
     WHERE t1.rowid < 65535 ORDER BY t1.a DESC
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid < t2.r
     WHERE t2.a=48
     ORDER BY t1.rowid
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid < t2.r
     WHERE t2.a=48
     ORDER BY t1.rowid DESC
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid < t2.r
     WHERE t2.a=48
     ORDER BY x
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid < CAST(t2.r AS real)
     WHERE t2.a=48
     ORDER BY t1.rowid
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid < CAST(t2.r AS real)
     WHERE t2.a=48
     ORDER BY t1.rowid DESC
;SELECT t2.a FROM t1 JOIN t2 USING(a)
     WHERE t1.rowid <= 65535 ORDER BY t2.a
;SELECT t2.a FROM t2 NATURAL JOIN t1
     WHERE t1.rowid <= 65535 ORDER BY t1.a DESC
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid <= t2.r
     WHERE t2.a=48
     ORDER BY t1.rowid
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid <= t2.r
     WHERE t2.a=48
     ORDER BY t1.rowid DESC
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid <= t2.r
     WHERE t2.a=48
     ORDER BY x
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid <= CAST(t2.r AS real)
     WHERE t2.a=48
     ORDER BY t1.rowid
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid <= CAST(t2.r AS real)
     WHERE t2.a=48
     ORDER BY t1.rowid DESC
;SELECT t1.* FROM t1, t2 WHERE t1.rowid=4294967295 AND t2.a=t1.a
;SELECT t2.* FROM t1 JOIN t2 USING(a) WHERE x='00000000ffffffff'
;SELECT t1.rowid, x FROM t1 JOIN t2 ON t2.r=t1.rowid WHERE t2.a=14
;SELECT t2.a FROM t1 JOIN t2 USING(a)
     WHERE t1.rowid > 4294967295 ORDER BY t2.a
;SELECT t2.a FROM t2 NATURAL JOIN t1
     WHERE t1.rowid > 4294967295 ORDER BY t1.a DESC
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid > t2.r
     WHERE t2.a=14
     ORDER BY t1.rowid
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid > t2.r
     WHERE t2.a=14
     ORDER BY t1.rowid DESC
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid > t2.r
     WHERE t2.a=14
     ORDER BY x
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid > CAST(t2.r AS real)
     WHERE t2.a=14
     ORDER BY t1.rowid
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid > CAST(t2.r AS real)
     WHERE t2.a=14
     ORDER BY t1.rowid DESC
;SELECT t2.a FROM t1 JOIN t2 USING(a)
     WHERE t1.rowid >= 4294967295 ORDER BY t2.a
;SELECT t2.a FROM t2 NATURAL JOIN t1
     WHERE t1.rowid >= 4294967295 ORDER BY t1.a DESC
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid >= t2.r
     WHERE t2.a=14
     ORDER BY t1.rowid
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid >= t2.r
     WHERE t2.a=14
     ORDER BY t1.rowid DESC
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid >= t2.r
     WHERE t2.a=14
     ORDER BY x
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid >= CAST(t2.r AS real)
     WHERE t2.a=14
     ORDER BY t1.rowid
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid >= CAST(t2.r AS real)
     WHERE t2.a=14
     ORDER BY t1.rowid DESC
;SELECT t2.a FROM t1 JOIN t2 USING(a)
     WHERE t1.rowid < 4294967295 ORDER BY t2.a
;SELECT t2.a FROM t2 NATURAL JOIN t1
     WHERE t1.rowid < 4294967295 ORDER BY t1.a DESC
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid < t2.r
     WHERE t2.a=14
     ORDER BY t1.rowid
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid < t2.r
     WHERE t2.a=14
     ORDER BY t1.rowid DESC
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid < t2.r
     WHERE t2.a=14
     ORDER BY x
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid < CAST(t2.r AS real)
     WHERE t2.a=14
     ORDER BY t1.rowid
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid < CAST(t2.r AS real)
     WHERE t2.a=14
     ORDER BY t1.rowid DESC
;SELECT t2.a FROM t1 JOIN t2 USING(a)
     WHERE t1.rowid <= 4294967295 ORDER BY t2.a
;SELECT t2.a FROM t2 NATURAL JOIN t1
     WHERE t1.rowid <= 4294967295 ORDER BY t1.a DESC
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid <= t2.r
     WHERE t2.a=14
     ORDER BY t1.rowid
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid <= t2.r
     WHERE t2.a=14
     ORDER BY t1.rowid DESC
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid <= t2.r
     WHERE t2.a=14
     ORDER BY x
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid <= CAST(t2.r AS real)
     WHERE t2.a=14
     ORDER BY t1.rowid
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid <= CAST(t2.r AS real)
     WHERE t2.a=14
     ORDER BY t1.rowid DESC
;SELECT t1.* FROM t1, t2 WHERE t1.rowid=1099511627775 AND t2.a=t1.a
;SELECT t2.* FROM t1 JOIN t2 USING(a) WHERE x='000000ffffffffff'
;SELECT t1.rowid, x FROM t1 JOIN t2 ON t2.r=t1.rowid WHERE t2.a=57
;SELECT t2.a FROM t1 JOIN t2 USING(a)
     WHERE t1.rowid > 1099511627775 ORDER BY t2.a
;SELECT t2.a FROM t2 NATURAL JOIN t1
     WHERE t1.rowid > 1099511627775 ORDER BY t1.a DESC
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid > t2.r
     WHERE t2.a=57
     ORDER BY t1.rowid
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid > t2.r
     WHERE t2.a=57
     ORDER BY t1.rowid DESC
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid > t2.r
     WHERE t2.a=57
     ORDER BY x
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid > CAST(t2.r AS real)
     WHERE t2.a=57
     ORDER BY t1.rowid
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid > CAST(t2.r AS real)
     WHERE t2.a=57
     ORDER BY t1.rowid DESC
;SELECT t2.a FROM t1 JOIN t2 USING(a)
     WHERE t1.rowid >= 1099511627775 ORDER BY t2.a
;SELECT t2.a FROM t2 NATURAL JOIN t1
     WHERE t1.rowid >= 1099511627775 ORDER BY t1.a DESC
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid >= t2.r
     WHERE t2.a=57
     ORDER BY t1.rowid
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid >= t2.r
     WHERE t2.a=57
     ORDER BY t1.rowid DESC
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid >= t2.r
     WHERE t2.a=57
     ORDER BY x
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid >= CAST(t2.r AS real)
     WHERE t2.a=57
     ORDER BY t1.rowid
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid >= CAST(t2.r AS real)
     WHERE t2.a=57
     ORDER BY t1.rowid DESC
;SELECT t2.a FROM t1 JOIN t2 USING(a)
     WHERE t1.rowid < 1099511627775 ORDER BY t2.a
;SELECT t2.a FROM t2 NATURAL JOIN t1
     WHERE t1.rowid < 1099511627775 ORDER BY t1.a DESC
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid < t2.r
     WHERE t2.a=57
     ORDER BY t1.rowid
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid < t2.r
     WHERE t2.a=57
     ORDER BY t1.rowid DESC
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid < t2.r
     WHERE t2.a=57
     ORDER BY x
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid < CAST(t2.r AS real)
     WHERE t2.a=57
     ORDER BY t1.rowid
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid < CAST(t2.r AS real)
     WHERE t2.a=57
     ORDER BY t1.rowid DESC
;SELECT t2.a FROM t1 JOIN t2 USING(a)
     WHERE t1.rowid <= 1099511627775 ORDER BY t2.a
;SELECT t2.a FROM t2 NATURAL JOIN t1
     WHERE t1.rowid <= 1099511627775 ORDER BY t1.a DESC
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid <= t2.r
     WHERE t2.a=57
     ORDER BY t1.rowid
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid <= t2.r
     WHERE t2.a=57
     ORDER BY t1.rowid DESC;