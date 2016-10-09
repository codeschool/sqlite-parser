-- original: boundary3.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

SELECT t1.a FROM t1 JOIN t2 ON t1.rowid >= t2.r
     WHERE t2.a=56
     ORDER BY x
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid >= CAST(t2.r AS real)
     WHERE t2.a=56
     ORDER BY t1.rowid
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid >= CAST(t2.r AS real)
     WHERE t2.a=56
     ORDER BY t1.rowid DESC
;SELECT t2.a FROM t1 JOIN t2 USING(a)
     WHERE t1.rowid < 4398046511104 ORDER BY t2.a
;SELECT t2.a FROM t2 NATURAL JOIN t1
     WHERE t1.rowid < 4398046511104 ORDER BY t1.a DESC
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid < t2.r
     WHERE t2.a=56
     ORDER BY t1.rowid
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid < t2.r
     WHERE t2.a=56
     ORDER BY t1.rowid DESC
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid < t2.r
     WHERE t2.a=56
     ORDER BY x
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid < CAST(t2.r AS real)
     WHERE t2.a=56
     ORDER BY t1.rowid
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid < CAST(t2.r AS real)
     WHERE t2.a=56
     ORDER BY t1.rowid DESC
;SELECT t2.a FROM t1 JOIN t2 USING(a)
     WHERE t1.rowid <= 4398046511104 ORDER BY t2.a
;SELECT t2.a FROM t2 NATURAL JOIN t1
     WHERE t1.rowid <= 4398046511104 ORDER BY t1.a DESC
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid <= t2.r
     WHERE t2.a=56
     ORDER BY t1.rowid
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid <= t2.r
     WHERE t2.a=56
     ORDER BY t1.rowid DESC
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid <= t2.r
     WHERE t2.a=56
     ORDER BY x
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid <= CAST(t2.r AS real)
     WHERE t2.a=56
     ORDER BY t1.rowid
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid <= CAST(t2.r AS real)
     WHERE t2.a=56
     ORDER BY t1.rowid DESC
;SELECT t1.* FROM t1, t2 WHERE t1.rowid=1 AND t2.a=t1.a
;SELECT t2.* FROM t1 JOIN t2 USING(a) WHERE x='0000000000000001'
;SELECT t1.rowid, x FROM t1 JOIN t2 ON t2.r=t1.rowid WHERE t2.a=60
;SELECT t2.a FROM t1 JOIN t2 USING(a)
     WHERE t1.rowid > 1 ORDER BY t2.a
;SELECT t2.a FROM t2 NATURAL JOIN t1
     WHERE t1.rowid > 1 ORDER BY t1.a DESC
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid > t2.r
     WHERE t2.a=60
     ORDER BY t1.rowid
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid > t2.r
     WHERE t2.a=60
     ORDER BY t1.rowid DESC
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid > t2.r
     WHERE t2.a=60
     ORDER BY x
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid > CAST(t2.r AS real)
     WHERE t2.a=60
     ORDER BY t1.rowid
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid > CAST(t2.r AS real)
     WHERE t2.a=60
     ORDER BY t1.rowid DESC
;SELECT t2.a FROM t1 JOIN t2 USING(a)
     WHERE t1.rowid >= 1 ORDER BY t2.a
;SELECT t2.a FROM t2 NATURAL JOIN t1
     WHERE t1.rowid >= 1 ORDER BY t1.a DESC
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid >= t2.r
     WHERE t2.a=60
     ORDER BY t1.rowid
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid >= t2.r
     WHERE t2.a=60
     ORDER BY t1.rowid DESC
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid >= t2.r
     WHERE t2.a=60
     ORDER BY x
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid >= CAST(t2.r AS real)
     WHERE t2.a=60
     ORDER BY t1.rowid
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid >= CAST(t2.r AS real)
     WHERE t2.a=60
     ORDER BY t1.rowid DESC
;SELECT t2.a FROM t1 JOIN t2 USING(a)
     WHERE t1.rowid < 1 ORDER BY t2.a
;SELECT t2.a FROM t2 NATURAL JOIN t1
     WHERE t1.rowid < 1 ORDER BY t1.a DESC
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid < t2.r
     WHERE t2.a=60
     ORDER BY t1.rowid
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid < t2.r
     WHERE t2.a=60
     ORDER BY t1.rowid DESC
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid < t2.r
     WHERE t2.a=60
     ORDER BY x
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid < CAST(t2.r AS real)
     WHERE t2.a=60
     ORDER BY t1.rowid
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid < CAST(t2.r AS real)
     WHERE t2.a=60
     ORDER BY t1.rowid DESC
;SELECT t2.a FROM t1 JOIN t2 USING(a)
     WHERE t1.rowid <= 1 ORDER BY t2.a
;SELECT t2.a FROM t2 NATURAL JOIN t1
     WHERE t1.rowid <= 1 ORDER BY t1.a DESC
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid <= t2.r
     WHERE t2.a=60
     ORDER BY t1.rowid
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid <= t2.r
     WHERE t2.a=60
     ORDER BY t1.rowid DESC
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid <= t2.r
     WHERE t2.a=60
     ORDER BY x
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid <= CAST(t2.r AS real)
     WHERE t2.a=60
     ORDER BY t1.rowid
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid <= CAST(t2.r AS real)
     WHERE t2.a=60
     ORDER BY t1.rowid DESC
;SELECT t1.* FROM t1, t2 WHERE t1.rowid=36028797018963968 AND t2.a=t1.a
;SELECT t2.* FROM t1 JOIN t2 USING(a) WHERE x='0080000000000000'
;SELECT t1.rowid, x FROM t1 JOIN t2 ON t2.r=t1.rowid WHERE t2.a=45
;SELECT t2.a FROM t1 JOIN t2 USING(a)
     WHERE t1.rowid > 36028797018963968 ORDER BY t2.a
;SELECT t2.a FROM t2 NATURAL JOIN t1
     WHERE t1.rowid > 36028797018963968 ORDER BY t1.a DESC
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid > t2.r
     WHERE t2.a=45
     ORDER BY t1.rowid
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid > t2.r
     WHERE t2.a=45
     ORDER BY t1.rowid DESC
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid > t2.r
     WHERE t2.a=45
     ORDER BY x
;SELECT t2.a FROM t1 JOIN t2 USING(a)
     WHERE t1.rowid >= 36028797018963968 ORDER BY t2.a
;SELECT t2.a FROM t2 NATURAL JOIN t1
     WHERE t1.rowid >= 36028797018963968 ORDER BY t1.a DESC
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid >= t2.r
     WHERE t2.a=45
     ORDER BY t1.rowid
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid >= t2.r
     WHERE t2.a=45
     ORDER BY t1.rowid DESC
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid >= t2.r
     WHERE t2.a=45
     ORDER BY x
;SELECT t2.a FROM t1 JOIN t2 USING(a)
     WHERE t1.rowid < 36028797018963968 ORDER BY t2.a
;SELECT t2.a FROM t2 NATURAL JOIN t1
     WHERE t1.rowid < 36028797018963968 ORDER BY t1.a DESC
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid < t2.r
     WHERE t2.a=45
     ORDER BY t1.rowid
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid < t2.r
     WHERE t2.a=45
     ORDER BY t1.rowid DESC
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid < t2.r
     WHERE t2.a=45
     ORDER BY x
;SELECT t2.a FROM t1 JOIN t2 USING(a)
     WHERE t1.rowid <= 36028797018963968 ORDER BY t2.a
;SELECT t2.a FROM t2 NATURAL JOIN t1
     WHERE t1.rowid <= 36028797018963968 ORDER BY t1.a DESC
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid <= t2.r
     WHERE t2.a=45
     ORDER BY t1.rowid
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid <= t2.r
     WHERE t2.a=45
     ORDER BY t1.rowid DESC
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid <= t2.r
     WHERE t2.a=45
     ORDER BY x
;SELECT t1.* FROM t1, t2 WHERE t1.rowid=-2147483649 AND t2.a=t1.a
;SELECT t2.* FROM t1 JOIN t2 USING(a) WHERE x='ffffffff7fffffff'
;SELECT t1.rowid, x FROM t1 JOIN t2 ON t2.r=t1.rowid WHERE t2.a=47
;SELECT t2.a FROM t1 JOIN t2 USING(a)
     WHERE t1.rowid > -2147483649 ORDER BY t2.a
;SELECT t2.a FROM t2 NATURAL JOIN t1
     WHERE t1.rowid > -2147483649 ORDER BY t1.a DESC
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid > t2.r
     WHERE t2.a=47
     ORDER BY t1.rowid
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid > t2.r
     WHERE t2.a=47
     ORDER BY t1.rowid DESC
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid > t2.r
     WHERE t2.a=47
     ORDER BY x
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid > CAST(t2.r AS real)
     WHERE t2.a=47
     ORDER BY t1.rowid
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid > CAST(t2.r AS real)
     WHERE t2.a=47
     ORDER BY t1.rowid DESC
;SELECT t2.a FROM t1 JOIN t2 USING(a)
     WHERE t1.rowid >= -2147483649 ORDER BY t2.a
;SELECT t2.a FROM t2 NATURAL JOIN t1
     WHERE t1.rowid >= -2147483649 ORDER BY t1.a DESC
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid >= t2.r
     WHERE t2.a=47
     ORDER BY t1.rowid
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid >= t2.r
     WHERE t2.a=47
     ORDER BY t1.rowid DESC
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid >= t2.r
     WHERE t2.a=47
     ORDER BY x
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid >= CAST(t2.r AS real)
     WHERE t2.a=47
     ORDER BY t1.rowid
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid >= CAST(t2.r AS real)
     WHERE t2.a=47
     ORDER BY t1.rowid DESC
;SELECT t2.a FROM t1 JOIN t2 USING(a)
     WHERE t1.rowid < -2147483649 ORDER BY t2.a
;SELECT t2.a FROM t2 NATURAL JOIN t1
     WHERE t1.rowid < -2147483649 ORDER BY t1.a DESC
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid < t2.r
     WHERE t2.a=47
     ORDER BY t1.rowid
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid < t2.r
     WHERE t2.a=47
     ORDER BY t1.rowid DESC
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid < t2.r
     WHERE t2.a=47
     ORDER BY x
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid < CAST(t2.r AS real)
     WHERE t2.a=47
     ORDER BY t1.rowid
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid < CAST(t2.r AS real)
     WHERE t2.a=47
     ORDER BY t1.rowid DESC
;SELECT t2.a FROM t1 JOIN t2 USING(a)
     WHERE t1.rowid <= -2147483649 ORDER BY t2.a
;SELECT t2.a FROM t2 NATURAL JOIN t1
     WHERE t1.rowid <= -2147483649 ORDER BY t1.a DESC
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid <= t2.r
     WHERE t2.a=47
     ORDER BY t1.rowid
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid <= t2.r
     WHERE t2.a=47
     ORDER BY t1.rowid DESC
;SELECT t1.a FROM t1 JOIN t2 ON t1.rowid <= t2.r
     WHERE t2.a=47
     ORDER BY x;