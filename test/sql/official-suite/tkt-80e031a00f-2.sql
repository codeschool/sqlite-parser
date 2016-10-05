-- original: tkt-80e031a00f.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

SELECT null NOT IN (null,'b','c','d')
;SELECT null IN t4
;SELECT null NOT IN t4
;SELECT null IN t4n
;SELECT null NOT IN t4n
;SELECT null IN t5
;SELECT null NOT IN t5
;SELECT null IN t6
;SELECT null NOT IN t6
;SELECT null IN t6n
;SELECT null NOT IN t6n
;SELECT null IN t7
;SELECT null NOT IN t7
;SELECT null IN t7n
;SELECT null NOT IN t7n
;SELECT null IN t8
;SELECT null NOT IN t8
;SELECT null IN t8n
;SELECT null NOT IN t8n;