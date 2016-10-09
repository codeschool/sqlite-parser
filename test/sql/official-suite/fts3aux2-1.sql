-- original: fts3aux2.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

CREATE VIRTUAL TABLE t1 USING fts4(a, b, languageid=l);
  INSERT INTO t1(a, b, l) VALUES
    ('zero zero', 'zero zero', 0),
    ('one two', 'three four', 1),
    ('five six', 'seven eight', 2)
  ;
  CREATE VIRTUAL TABLE terms USING fts4aux(t1)
;SELECT term, documents, occurrences, languageid FROM terms WHERE col = '*'
;SELECT * FROM terms
;SELECT * FROM terms WHERE languageid=''
;SELECT * FROM terms WHERE languageid=-1
;SELECT * FROM terms WHERE languageid=9223372036854775807
;SELECT * FROM terms WHERE languageid=-9223372036854775808
;SELECT * FROM terms WHERE languageid=NULL
;SELECT term, documents, occurrences, languageid 
  FROM terms WHERE col = '*' AND languageid=1
;SELECT term, col, documents, occurrences, languageid 
  FROM terms WHERE languageid=1
;SELECT term, col, documents, occurrences, languageid 
  FROM terms WHERE languageid=1 AND term='zero'
;SELECT term, col, documents, occurrences, languageid 
  FROM terms WHERE languageid='1' AND term='two'
;SELECT term, col, documents, occurrences, languageid 
  FROM terms WHERE languageid='+1' AND term>'four'
;SELECT term, documents, occurrences, languageid 
  FROM terms WHERE col = '*' AND languageid=2
;SELECT term, col, documents, occurrences, languageid 
  FROM terms WHERE languageid=2
;SELECT term, col, documents, occurrences, languageid 
  FROM terms WHERE languageid=2 AND term='five'
;SELECT term, col, documents, occurrences, languageid 
  FROM terms WHERE term='five' AND languageid=2
;SELECT term, col, documents, occurrences, languageid 
  FROM terms WHERE term>='seven' AND languageid=2
;SELECT term, col, documents, occurrences, languageid 
  FROM terms WHERE term>='e' AND term<'seven' AND languageid=2;