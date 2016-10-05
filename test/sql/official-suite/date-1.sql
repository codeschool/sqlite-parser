-- original: date.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

SELECT strftime('%s','2000-07-01 12:34:56')
;SELECT strftime('%Y-%m-%d %H:%M:%f', julianday('2006-09-24T10:50:26.047'))
;PRAGMA auto_vacuum=OFF;
      PRAGMA page_size = 1024;
      CREATE TABLE t1(x);
      INSERT INTO t1 VALUES(1.1)
;SELECT * FROM t1
;SELECT c -a FROM (SELECT julianday('now') AS a,
                               sleeper(), julianday('now') AS c)
;SELECT a==b FROM (SELECT current_timestamp AS a,
                               sleeper(), current_timestamp AS b);