-- original: func.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

CREATE TABLE tbl1(t1 text)
;INSERT INTO tbl1 VALUES('sub_word')
;SELECT t1 FROM tbl1 ORDER BY t1
;CREATE TABLE t2(a);
     INSERT INTO t2 VALUES(1);
     INSERT INTO t2 VALUES(NULL);
     INSERT INTO t2 VALUES(345);
     INSERT INTO t2 VALUES(NULL);
     INSERT INTO t2 VALUES(67890);
     SELECT * FROM t2
;SELECT length(t1) FROM tbl1 ORDER BY t1
;SELECT length(t1), count(*) FROM tbl1 GROUP BY length(t1)
           ORDER BY length(t1)
;SELECT coalesce(length(a),-1) FROM t2
;SELECT substr(t1,1,2) FROM tbl1 ORDER BY t1
;SELECT substr(t1,2,1) FROM tbl1 ORDER BY t1
;SELECT substr(t1,3,3) FROM tbl1 ORDER BY t1
;SELECT substr(t1,-1,1) FROM tbl1 ORDER BY t1
;SELECT substr(t1,-1,2) FROM tbl1 ORDER BY t1
;SELECT substr(t1,-2,1) FROM tbl1 ORDER BY t1
;SELECT substr(t1,-2,2) FROM tbl1 ORDER BY t1
;SELECT substr(t1,-4,2) FROM tbl1 ORDER BY t1
;SELECT t1 FROM tbl1 ORDER BY substr(t1,2,20)
;SELECT substr(a,1,1) FROM t2
;SELECT substr(a,2,2) FROM t2
;DELETE FROM tbl1
;INSERT INTO tbl1 VALUES('sub_word')
;SELECT t1 FROM tbl1 ORDER BY t1
;SELECT length(t1) FROM tbl1 ORDER BY t1
;SELECT substr(t1,1,2) FROM tbl1 ORDER BY t1
;SELECT substr(t1,1,3) FROM tbl1 ORDER BY t1
;SELECT substr(t1,2,2) FROM tbl1 ORDER BY t1
;SELECT substr(t1,2,3) FROM tbl1 ORDER BY t1
;SELECT substr(t1,3,2) FROM tbl1 ORDER BY t1
;SELECT substr(t1,4,2) FROM tbl1 ORDER BY t1
;SELECT substr(t1,-1,1) FROM tbl1 ORDER BY t1
;SELECT substr(t1,-3,2) FROM tbl1 ORDER BY t1
;SELECT substr(t1,-4,3) FROM tbl1 ORDER BY t1
;DELETE FROM tbl1
;INSERT INTO tbl1 VALUES('sub_word')
;SELECT t1 FROM tbl1
;CREATE TABLE t1(a,b,c);
      INSERT INTO t1 VALUES(1,2,3);
      INSERT INTO t1 VALUES(2,12345678901234,-1234567890);
      INSERT INTO t1 VALUES(3,-2,-5)
;CREATE TABLE t1(a,b,c);
      INSERT INTO t1 VALUES(1,2,3);
      INSERT INTO t1 VALUES(2,1.2345678901234,-12345.67890);
      INSERT INTO t1 VALUES(3,-2,-5)
;SELECT abs(a) FROM t2
;SELECT abs(t1) FROM tbl1
;SELECT coalesce(round(a,2),'nil') FROM t2
;SELECT round(t1,2) FROM tbl1
;SELECT typeof(round(5.1,1))
;SELECT typeof(round(5.1))
;SELECT round(sub_x1)
;SELECT round(sub_x1,1)
;SELECT round(40223.4999999999)
;SELECT round(40224.4999999999)
;SELECT round(40225.4999999999)
;SELECT round(40223.4999999999,sub_i)
;SELECT round(40224.4999999999,sub_i)
;SELECT round(40225.4999999999,sub_i)
;SELECT round(40223.4999999999,sub_i)
;SELECT round(40224.4999999999,sub_i)
;SELECT round(40225.4999999999,sub_i)
;SELECT round(1234567890.5)
;SELECT round(12345678901.5)
;SELECT round(123456789012.5)
;SELECT round(1234567890123.5)
;SELECT round(12345678901234.5)
;SELECT round(1234567890123.35,1)
;SELECT round(1234567890123.445,2)
;SELECT round(99999999999994.5)
;SELECT round(9999999999999.55,1)
;SELECT round(9999999999999.556,2)
;SELECT upper(t1) FROM tbl1
;SELECT lower(upper(t1)) FROM tbl1
;SELECT upper(a), lower(a) FROM t2
;SELECT coalesce(a,'xyz') FROM t2
;SELECT coalesce(upper(a),'nil') FROM t2
;SELECT coalesce(nullif(1,1),'nil')
;SELECT coalesce(nullif(1,2),'nil')
;SELECT coalesce(nullif(1,NULL),'nil')
;SELECT last_insert_rowid()
;EXPLAIN SELECT sum(a) FROM t2
;SELECT sum(a), count(a), round(avg(a),2), min(a), max(a), count(*) FROM t2
;EXPLAIN SELECT sum(a) FROM t2
;SELECT sum(a), count(a), avg(a), min(a), max(a), count(*) FROM t2
;SELECT max('z+'||a||'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOP') FROM t2
;CREATE TEMP TABLE t3 AS SELECT a FROM t2 ORDER BY a DESC;
      SELECT min('z+'||a||'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOP') FROM t3
;CREATE TABLE t3 AS SELECT a FROM t2 ORDER BY a DESC;
      SELECT min('z+'||a||'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOP') FROM t3
;SELECT max('z+'||a||'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOP') FROM t3
;SELECT sum(x) FROM (SELECT '9223372036' || '854775807' AS x
                          UNION ALL SELECT -9223372036854775807)
;SELECT typeof(sum(x)) FROM (SELECT '9223372036' || '854775807' AS x
                          UNION ALL SELECT -9223372036854775807)
;SELECT typeof(sum(x)) FROM (SELECT '9223372036' || '854775808' AS x
                          UNION ALL SELECT -9223372036854775807)
;SELECT sum(x)>0.0 FROM (SELECT '9223372036' || '854775808' AS x
                          UNION ALL SELECT -9223372036850000000)
;SELECT sum(x)>0 FROM (SELECT '9223372036' || '854775808' AS x
                          UNION ALL SELECT -9223372036850000000)
;SELECT random() is not null
;SELECT typeof(random())
;SELECT randomblob(32) is not null
;SELECT typeof(randomblob(32))
;SELECT length(randomblob(32)), length(randomblob(-5)),
           length(randomblob(2000))
;SELECT hex(x'00112233445566778899aAbBcCdDeEfF')
;SELECT hex(replace('abcdefg','ef','12'))
;SELECT hex(replace('abcdefg','','12'))
;SELECT hex(replace('aabcdefg','a','aaa'))
;SELECT hex(replace('abcdefg','ef','12'))
;SELECT hex(replace('abcdefg','','12'))
;SELECT hex(replace('aabcdefg','a','aaa'))
;SELECT testfunc(
     'string', 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
     'int', 1234
    )
;SELECT testfunc(
     'string', 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
     'string', NULL
    )
;SELECT testfunc(
       'string', 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
       'double', 1.234
      );