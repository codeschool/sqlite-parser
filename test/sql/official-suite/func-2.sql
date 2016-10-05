-- original: func.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

SELECT testfunc(
       'string', 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
       'int', 1234,
       'string', 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
       'string', NULL,
       'string', 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
       'double', 1.234,
       'string', 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
       'int', 1234,
       'string', 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
       'string', NULL,
       'string', 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
       'double', 1.234
      )
;SELECT sqlite_version(*)
;PRAGMA encoding
;SELECT test_destructor('hello world'), test_destructor_count()
;SELECT test_destructor16('hello world'), test_destructor_count()
;SELECT test_destructor_count()
;SELECT test_destructor('hello')||' world'
;SELECT test_destructor_count()
;CREATE TABLE t4(x);
    INSERT INTO t4 VALUES(test_destructor('hello'));
    INSERT INTO t4 VALUES(test_destructor('world'));
    SELECT min(test_destructor(x)), max(test_destructor(x)) FROM t4
;SELECT test_destructor_count()
;DROP TABLE t4
;SELECT test_auxdata('hello world')
;CREATE TABLE t4(a, b);
    INSERT INTO t4 VALUES('abc', 'def');
    INSERT INTO t4 VALUES('ghi', 'jkl')
;SELECT test_auxdata('hello world') FROM t4
;SELECT test_auxdata('hello world', 123) FROM t4
;SELECT test_auxdata('hello world', a) FROM t4
;SELECT test_auxdata('hello'||'world', a) FROM t4
;SELECT test_auxdata('constant') FROM t4
;SELECT test_auxdata('constant') FROM t4
;SELECT test_auxdata('constant') FROM t4
;SELECT test_auxdata(sub_V), sub_V FROM t4
;SELECT test_auxdata(sub_V), sub_V FROM t4
;SELECT test_auxdata(sub_V), sub_V FROM t4
;CREATE TABLE tbl2(a, b)
;SELECT quote(a), quote(b) FROM tbl2
;CREATE TABLE t5(x);
    INSERT INTO t5 VALUES(1);
    INSERT INTO t5 VALUES(-99);
    INSERT INTO t5 VALUES(10000);
    SELECT sum(x) FROM t5
;INSERT INTO t5 VALUES(0.0);
      SELECT sum(x) FROM t5
;DELETE FROM t5;
    SELECT sum(x), total(x) FROM t5
;INSERT INTO t5 VALUES(NULL);
    SELECT sum(x), total(x) FROM t5
;INSERT INTO t5 VALUES(NULL);
    SELECT sum(x), total(x) FROM t5
;INSERT INTO t5 VALUES(123);
    SELECT sum(x), total(x) FROM t5
;CREATE TABLE t6(x INTEGER);
    INSERT INTO t6 VALUES(1);
    INSERT INTO t6 VALUES(1<<62);
    SELECT sum(x) -((1<<62)+1) from t6
;SELECT typeof(sum(x)) FROM t6
;SELECT total(x) -((1<<62)*2.0+1) FROM t6
;SELECT total(x) -((1<<62)*2+1) FROM t6
;SELECT sum(-9223372036854775805)
;SELECT match(a,b) FROM t1 WHERE 0
;SELECT soundex(sub_name)
;SELECT typeof(replace("This is the main test string", NULL, "ALT"))
;SELECT typeof(replace(NULL, "main", "ALT"))
;SELECT typeof(replace("This is the main test string", "main", NULL))
;SELECT replace("This is the main test string", "main", "ALT")
;SELECT replace("This is the main test string", "main", "larger-main")
;SELECT replace("aaaaaaa", "a", "0123456789")
;SELECT LENGTH(REPLACE(sub_str, 'C', sub_rep))
;SELECT trim('  hi  ')
;SELECT ltrim('  hi  ')
;SELECT rtrim('  hi  ')
;SELECT trim('  hi  ','xyz')
;SELECT ltrim('  hi  ','xyz')
;SELECT rtrim('  hi  ','xyz')
;SELECT trim('xyxzy  hi  zzzy','xyz')
;SELECT ltrim('xyxzy  hi  zzzy','xyz')
;SELECT rtrim('xyxzy  hi  zzzy','xyz')
;SELECT trim('  hi  ','')
;SELECT hex(trim(x'c280e1bfbff48fbfbf6869',x'6162e1bfbfc280'))
;SELECT hex(trim(x'6869c280e1bfbff48fbfbf61',
                             x'6162e1bfbfc280f48fbfbf'))
;SELECT hex(trim(x'ceb1ceb2ceb3',x'ceb1'))
;SELECT typeof(trim(NULL))
;SELECT typeof(trim(NULL,'xyz'))
;SELECT typeof(trim('hello',NULL))
;SELECT legacy_count() FROM t6
;SELECT group_concat(t1) FROM tbl1
;SELECT group_concat(t1,' ') FROM tbl1
;SELECT group_concat(t1,' ' || rowid || ' ') FROM tbl1
;SELECT group_concat(NULL,t1) FROM tbl1
;SELECT group_concat(t1,NULL) FROM tbl1
;SELECT 'BEGIN-'||group_concat(t1) FROM tbl1
;SELECT group_concat(CASE t1 WHEN 'this' THEN '' ELSE t1 END) FROM tbl1
;SELECT group_concat(CASE WHEN t1!='software' THEN '' ELSE t1 END) FROM tbl1
;SELECT group_concat(CASE t1 WHEN 'this' THEN null ELSE t1 END) FROM tbl1
;SELECT group_concat(CASE WHEN t1!='software' THEN null ELSE t1 END) FROM tbl1
;SELECT group_concat(CASE t1 WHEN 'this' THEN ''
                          WHEN 'program' THEN null ELSE t1 END) FROM tbl1
;SELECT typeof(group_concat(x)) FROM (SELECT '' AS x)
;SELECT typeof(group_concat(x,''))
      FROM (SELECT '' AS x UNION ALL SELECT '')
;SELECT test_isolation(t1,t1) FROM tbl1
;CREATE TABLE t28(x, y DEFAULT(nosuchfunc(1)))
;CREATE TABLE t29(id INTEGER PRIMARY KEY, x, y);
    INSERT INTO t29 VALUES(1, 2, 3), (2, NULL, 4), (3, 4.5, 5);
    INSERT INTO t29 VALUES(4, randomblob(1000000), 6);
    INSERT INTO t29 VALUES(5, "hello", 7)
;SELECT typeof(x), length(x), typeof(y) FROM t29 ORDER BY id
;SELECT typeof(+x) FROM t29 ORDER BY id
;SELECT sum(length(x)) FROM t29
;CREATE TABLE t29b(a,b,c,d,e,f,g,h,i);
  INSERT INTO t29b 
   VALUES(1, hex(randomblob(2000)), null, 0, 1, '', zeroblob(0),'x',x'01');
  SELECT typeof(c), typeof(d), typeof(e), typeof(f),
         typeof(g), typeof(h), typeof(i) FROM t29b
;SELECT length(f), length(g), length(h), length(i) FROM t29b
;SELECT quote(f), quote(g), quote(h), quote(i) FROM t29b
;SELECT unicode('$')
;SELECT char(36,162,8364)
;SELECT char(), length(char()), typeof(char());