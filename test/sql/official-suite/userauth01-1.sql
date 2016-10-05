-- original: userauth01.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

CREATE TABLE t1(x);
  INSERT INTO t1 VALUES(1),(2.5),('three'),(x'4444'),(NULL);
  SELECT quote(x) FROM t1 ORDER BY x;
  SELECT name FROM sqlite_master
;SELECT quote(x) FROM t1 ORDER BY x;
    SELECT name FROM sqlite_master
;SELECT quote(x) FROM t1 ORDER BY x;
    SELECT name FROM sqlite_master
;SELECT quote(x) FROM t1 ORDER BY x;
    SELECT uname, isadmin FROM sqlite_user ORDER BY uname;
    SELECT name FROM sqlite_master ORDER BY name
;SELECT uname, isadmin FROM sqlite_user ORDER BY uname
;SELECT quote(x) FROM t1 ORDER BY x;
    SELECT name FROM sqlite_master ORDER BY name
;SELECT uname, isadmin FROM sqlite_user ORDER BY uname
;SELECT uname, isadmin FROM sqlite_user ORDER BY uname
;SELECT uname, isadmin FROM sqlite_user ORDER BY uname
;SELECT uname, isadmin FROM sqlite_user ORDER BY uname
;SELECT uname, isadmin FROM sqlite_user ORDER BY uname
;SELECT uname, isadmin FROM sqlite_user ORDER BY uname
;SELECT uname, isadmin FROM sqlite_user ORDER BY uname
;SELECT uname, isadmin FROM sqlite_user ORDER BY uname
;SELECT uname, isadmin FROM sqlite_user ORDER BY uname
;CREATE TABLE t3(a,b,c); INSERT INTO t3 VALUES(1,2,3);
    SELECT * FROM t3
;ATTACH 'test3.db' AS aux;
    SELECT * FROM t1, t3 ORDER BY x LIMIT 1;
    DETACH aux
;SELECT x FROM t1;