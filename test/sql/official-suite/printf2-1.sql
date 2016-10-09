-- original: printf2.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

SELECT quote(printf()), quote(printf(NULL,1,2,3))
;SELECT printf('hello')
;SELECT printf('%d,%d,%d',55,-11,3421)
;SELECT printf('%d,%d,%d',55,'-11',3421)
;SELECT printf('%d,%d,%d,%d',55,'-11',3421)
;SELECT printf('%.2f',3.141592653)
;SELECT printf('%.*f',2,3.141592653)
;SELECT printf('%*.*f',5,2,3.141592653)
;SELECT printf('%d',314159.2653)
;SELECT printf('%lld',314159.2653)
;SELECT printf('%lld%n',314159.2653,'hi')
;SELECT printf('%n',0)
;SELECT printf('%.*z',5,'abcdefghijklmnop')
;SELECT printf('%c','abcdefghijklmnop')
;CREATE TABLE t1(a,b,c);
  INSERT INTO t1 VALUES(1,2,3);
  INSERT INTO t1 VALUES(-1,-2,-3);
  INSERT INTO t1 VALUES('abc','def','ghi');
  INSERT INTO t1 VALUES(1.5,2.25,3.125);
  SELECT printf('(%s)-%n-(%s)',a,b,c) FROM t1 ORDER BY rowid
;SELECT printf('%s=(%p)',a,a) FROM t1 ORDER BY a
;SELECT printf('%s=(%d/%g/%s)',a) FROM t1 ORDER BY a
;SELECT printf('|%110.100c|','*')
;SELECT printf('|%-110.100c|','*')
;SELECT printf('|%9.8c|%-9.8c|','*','*')
;SELECT printf('|%8.8c|%-8.8c|','*','*')
;SELECT printf('|%7.8c|%-7.8c|','*','*');