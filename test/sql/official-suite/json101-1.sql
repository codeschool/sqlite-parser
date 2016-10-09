-- original: json101.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

SELECT json_array(1,2.5,null,'hello')
;SELECT json_array(1,json_object('abc',2.5,'def',null,'ghi','hello'),99);
  -- the second term goes in as JSON
;SELECT hex(json_array('String " Test'))
;SELECT json_array(-9223372036854775808,9223372036854775807,0,1,-1,
                    0.0, 1.0, -1.0, -1e99, +2e100,
                    'one','two','three',
                    4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
                    19, NULL, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
                    'abcdefghijklmnopqrstuvwyxzABCDEFGHIJKLMNOPQRSTUVWXYZ',
                    'abcdefghijklmnopqrstuvwyxzABCDEFGHIJKLMNOPQRSTUVWXYZ',
                    'abcdefghijklmnopqrstuvwyxzABCDEFGHIJKLMNOPQRSTUVWXYZ',
                    99)
;SELECT json_object('a',1,'b',2.5,'c',null,'d','String Test')
;SELECT * FROM j1 WHERE NOT json_valid(char(0x20,0x09,0x0a,0x0d)||x)
;SELECT * FROM j1 WHERE NOT json_valid(x||char(0x20,0x09,0x0a,0x0d))
;SELECT json_valid(''), json_valid(char(0x20,0x09,0x0a,0x0d))
;SELECT x FROM j1 WHERE json_remove(x)<>x
;SELECT x FROM j1 WHERE json_replace(x)<>x
;SELECT x FROM j1 WHERE json_set(x)<>x
;SELECT x FROM j1 WHERE json_insert(x)<>x
;SELECT count(*) FROM j1 WHERE json_type(x) IN ('object','array');
  SELECT x FROM j1
   WHERE json_extract(x,'$')<>x
     AND json_type(x) IN ('object','array')
;SELECT id, json_valid(json), json_type(json), '|' FROM j2 ORDER BY id
;SELECT j2.rowid, jx.rowid, fullkey, path, key
    FROM j2, json_tree(j2.json) AS jx
   WHERE fullkey!=(path || CASE WHEN typeof(key)=='integer' THEN '['||key||']'
                                ELSE '.'||key END)
;SELECT j2.rowid, jx.rowid, fullkey, path, key
    FROM j2, json_each(j2.json) AS jx
   WHERE fullkey!=(path || CASE WHEN typeof(key)=='integer' THEN '['||key||']'
                                ELSE '.'||key END)
;SELECT j2.rowid, jx.rowid, fullkey, path, key
    FROM j2, json_each(j2.json) AS jx
   WHERE jx.json<>j2.json
;SELECT j2.rowid, jx.rowid, fullkey, path, key
    FROM j2, json_tree(j2.json) AS jx
   WHERE jx.json<>j2.json
;SELECT j2.rowid, jx.rowid, fullkey, path, key
    FROM j2, json_each(j2.json) AS jx
   WHERE jx.value<>jx.atom AND type NOT IN ('array','object')
;SELECT j2.rowid, jx.rowid, fullkey, path, key
    FROM j2, json_tree(j2.json) AS jx
   WHERE jx.value<>jx.atom AND type NOT IN ('array','object')
;SELECT json_valid('["a",55,"b",72,]')
;SELECT json_valid('["a",55,"b",72]');