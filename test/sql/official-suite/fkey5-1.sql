-- original: fkey5.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

CREATE TABLE p1(a INTEGER PRIMARY KEY); INSERT INTO p1 VALUES(88),(89);
    CREATE TABLE p2(a INT PRIMARY KEY); INSERT INTO p2 VALUES(77),(78);
    CREATE TABLE p3(a TEXT PRIMARY KEY);
    INSERT INTO p3 VALUES(66),(67),('alpha'),('BRAVO');
    CREATE TABLE p4(a TEXT PRIMARY KEY COLLATE nocase);
    INSERT INTO p4 VALUES('alpha'),('BRAVO'),('55'),('Delta'),('ECHO');
    CREATE TABLE p5(a INTEGER PRIMARY KEY, b, c, UNIQUE(b,c));
    INSERT INTO p5 VALUES(1,'Alpha','abc'),(2,'beta','def');
    CREATE TABLE p6(a INTEGER PRIMARY KEY, b TEXT COLLATE nocase,
                    c TEXT COLLATE rtrim, UNIQUE(b,c));
    INSERT INTO p6 VALUES(1,'Alpha','abc '),(2,'bETA','def    ');

    CREATE TABLE c1(x INTEGER PRIMARY KEY references p1);
    CREATE TABLE c2(x INTEGER PRIMARY KEY references p2);
    CREATE TABLE c3(x INTEGER PRIMARY KEY references p3);
    CREATE TABLE c4(x INTEGER PRIMARY KEY references p4);
    CREATE TABLE c5(x INT references p1);
    CREATE TABLE c6(x INT references p2);
    CREATE TABLE c7(x INT references p3);
    CREATE TABLE c8(x INT references p4);
    CREATE TABLE c9(x TEXT UNIQUE references p1);
    CREATE TABLE c10(x TEXT UNIQUE references p2);
    CREATE TABLE c11(x TEXT UNIQUE references p3);
    CREATE TABLE c12(x TEXT UNIQUE references p4);
    CREATE TABLE c13(x TEXT COLLATE nocase references p3);
    CREATE TABLE c14(x TEXT COLLATE nocase references p4);
    CREATE TABLE c15(x, y, FOREIGN KEY(x,y) REFERENCES p5(b,c));
    CREATE TABLE c16(x, y, FOREIGN KEY(x,y) REFERENCES p5(c,b));
    CREATE TABLE c17(x, y, FOREIGN KEY(x,y) REFERENCES p6(b,c));
    CREATE TABLE c18(x, y, FOREIGN KEY(x,y) REFERENCES p6(c,b));
    CREATE TABLE c19(x TEXT COLLATE nocase, y TEXT COLLATE rtrim,
                     FOREIGN KEY(x,y) REFERENCES p5(b,c));
    CREATE TABLE c20(x TEXT COLLATE nocase, y TEXT COLLATE rtrim,
                     FOREIGN KEY(x,y) REFERENCES p5(c,b));
    CREATE TABLE c21(x TEXT COLLATE nocase, y TEXT COLLATE rtrim,
                     FOREIGN KEY(x,y) REFERENCES p6(b,c));
    CREATE TABLE c22(x TEXT COLLATE nocase, y TEXT COLLATE rtrim,
                     FOREIGN KEY(x,y) REFERENCES p6(c,b));

    PRAGMA foreign_key_check
;INSERT INTO c1 VALUES(90),(87),(88);
    PRAGMA foreign_key_check
;PRAGMA main.foreign_key_check
;PRAGMA temp.foreign_key_check
;PRAGMA foreign_key_check(c1)
;PRAGMA foreign_key_check(c2)
;PRAGMA main.foreign_key_check(c2)
;INSERT INTO c5 SELECT x FROM c1;
    DELETE FROM c1;
    PRAGMA foreign_key_check
;PRAGMA foreign_key_check(c5)
;PRAGMA foreign_key_check(c1)
;INSERT INTO c9 SELECT x FROM c5;
    DELETE FROM c5;
    PRAGMA foreign_key_check
;PRAGMA foreign_key_check(c9)
;PRAGMA foreign_key_check(c5)
;DELETE FROM c9;
    INSERT INTO c2 VALUES(79),(77),(76);
    PRAGMA foreign_key_check
;PRAGMA foreign_key_check(c2)
;INSERT INTO c6 SELECT x FROM c2;
    DELETE FROM c2;
    PRAGMA foreign_key_check
;PRAGMA foreign_key_check(c6)
;INSERT INTO c10 SELECT x FROM c6;
    DELETE FROM c6;
    PRAGMA foreign_key_check
;PRAGMA foreign_key_check(c10)
;DELETE FROM c10;
    INSERT INTO c3 VALUES(68),(67),(65);
    PRAGMA foreign_key_check
;PRAGMA foreign_key_check(c3)
;INSERT INTO c7 SELECT x FROM c3;
    INSERT INTO c7 VALUES('Alpha'),('alpha'),('foxtrot');
    DELETE FROM c3;
    PRAGMA foreign_key_check
;PRAGMA foreign_key_check(c7)
;INSERT INTO c11 SELECT x FROM c7;
    DELETE FROM c7;
    PRAGMA foreign_key_check
;PRAGMA foreign_key_check(c11)
;DELETE FROM c11;
    INSERT INTO c4 VALUES(54),(55),(56);
    PRAGMA foreign_key_check
;PRAGMA foreign_key_check(c4)
;INSERT INTO c8 SELECT x FROM c4;
    INSERT INTO c8 VALUES('Alpha'),('ALPHA'),('foxtrot');
    DELETE FROM c4;
    PRAGMA foreign_key_check
;PRAGMA foreign_key_check(c8)
;INSERT INTO c12 SELECT x FROM c8;
    DELETE FROM c8;
    PRAGMA foreign_key_check
;PRAGMA foreign_key_check(c12)
;INSERT OR IGNORE INTO c13 SELECT * FROM c12;
    INSERT OR IGNORE INTO C14 SELECT * FROM c12;
    DELETE FROM c12;
    PRAGMA foreign_key_check
;PRAGMA foreign_key_check(c14)
;PRAGMA foreign_key_check(c13)
;DELETE FROM c13;
    DELETE FROM c14;
    INSERT INTO c19 VALUES('alpha','abc');
    PRAGMA foreign_key_check(c19)
;DELETE FROM c19;
    INSERT INTO c19 VALUES('Alpha','abc');
    PRAGMA foreign_key_check(c19)
;INSERT INTO c20 VALUES('Alpha','abc');
    PRAGMA foreign_key_check(c20)
;DELETE FROM c20;
    INSERT INTO c20 VALUES('abc','Alpha');
    PRAGMA foreign_key_check(c20)
;INSERT INTO c21 VALUES('alpha','abc    ');
    PRAGMA foreign_key_check(c21)
;DELETE FROM c21;
    INSERT INTO c19 VALUES('Alpha','abc');
    PRAGMA foreign_key_check(c21)
;INSERT INTO c22 VALUES('Alpha','abc');
    PRAGMA foreign_key_check(c22)
;DELETE FROM c22;
    INSERT INTO c22 VALUES('abc  ','ALPHA');
    PRAGMA foreign_key_check(c22)
;CREATE TABLE k1(x REFERENCES s1);
  PRAGMA foreign_key_check(k1)
;INSERT INTO k1 VALUES(NULL);
  PRAGMA foreign_key_check(k1)
;INSERT INTO k1 VALUES(1);
  PRAGMA foreign_key_check(k1)
;CREATE TABLE k2(x, y, FOREIGN KEY(x, y) REFERENCES s1(a, b));
  PRAGMA foreign_key_check(k2)
;INSERT INTO k2 VALUES(NULL, 'five');
  PRAGMA foreign_key_check(k2)
;INSERT INTO k2 VALUES('one', NULL);
  PRAGMA foreign_key_check(k2)
;INSERT INTO k2 VALUES('six', 'seven');
  PRAGMA foreign_key_check(k2);