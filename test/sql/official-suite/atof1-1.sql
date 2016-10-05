-- original: atof1.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

SELECT sub_xf=sub_x
;SELECT real2hex(sub_xf), real2hex(sub_x)
;SELECT sub_xf+0.0 AS a, sub_x AS b
;SELECT sub_x=CAST(quote(sub_x) AS real)
;SELECT real2hex(sub_x) a, real2hex(CAST(quote(sub_x) AS real)) b
;SELECT quote(sub_x)
;SELECT CAST(quote(sub_x) AS real) c;