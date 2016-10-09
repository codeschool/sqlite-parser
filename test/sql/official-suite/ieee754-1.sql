-- original: ieee754.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

SELECT ieee754(sub_float)
;SELECT ieee754(sub_rep)==sub_float
;SELECT ieee754(-sub_float)
;SELECT ieee754(-sub_rep)==-sub_float
;SELECT ieee754(1,1024), ieee754(4503599627370495,972)
;SELECT ieee754(-1,1024), ieee754(-4503599627370495,972)
;SELECT ieee754(4503599627370495,973) is null;