-- original: extension01.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

CREATE TABLE t1(a INTEGER PRIMARY KEY, b TEXT);
    INSERT INTO t1 VALUES(1, readfile('./file1.txt'));
    SELECT * FROM t1
;DELETE FROM t1;
    INSERT INTO t1 VALUES(2, readfile(NULL)),(3, readfile('file2.txt'));
    SELECT a, b, typeof(b) FROM t1
;SELECT writefile('./file2.txt', 'A second test line')
;SELECT writefile('./file2.txt', NULL)
;SELECT writefile('./file2.txt', 'Another test')
;SELECT writefile(NULL, 'Another test');