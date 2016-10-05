-- original: tkt3997.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

create table mytext(name BLOB);
    INSERT INTO mytext VALUES('abc');
    INSERT INTO mytext VALUES('acd');
    INSERT INTO mytext VALUES('afe')
;SELECT name 
    FROM mytext 
    ORDER BY name COLLATE reverse
;SELECT name 
    FROM (SELECT name FROM mytext)  
    ORDER BY name COLLATE reverse
;CREATE TABLE mytext2(name COLLATE reverse);
    INSERT INTO mytext2 SELECT name FROM mytext
;SELECT name 
    FROM (SELECT name FROM mytext2)  
    ORDER BY name
;SELECT name 
    FROM (SELECT name FROM mytext2)
    ORDER BY name COLLATE usual;