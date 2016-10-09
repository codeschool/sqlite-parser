-- original: subtype1.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

SELECT test_getsubtype('hello')
;SELECT test_getsubtype(test_setsubtype('hello',123))
;SELECT typeof(test_setsubtype('hello',123))
;SELECT test_setsubtype('hello',123);