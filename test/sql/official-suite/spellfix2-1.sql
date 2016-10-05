-- original: spellfix2.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

CREATE VIRTUAL TABLE demo USING spellfix1;
  INSERT INTO demo(word) VALUES ('amsterdam');
  INSERT INTO demo(word) VALUES ('amsterdammetje');
  INSERT INTO demo(word) VALUES ('amsterdamania');
  INSERT INTO demo(word) VALUES ('amsterdamweg');
  INSERT INTO demo(word) VALUES ('amsterdamsestraat');
  INSERT INTO demo(word) VALUES ('amsterdamlaan')
;SELECT word, distance, matchlen FROM demo 
  WHERE word MATCH 'amstedam*' AND top=3
  ORDER BY +word
;SELECT word, distance, matchlen FROM demo WHERE 
  word MATCH 'amstedam*' AND top=3 AND distance <= 100
  ORDER BY +word
;SELECT word, distance, matchlen FROM demo WHERE 
  word MATCH 'amstedam*' AND distance <= 100
  ORDER BY +word
;INSERT INTO demo(word) VALUES ('amsterdam' || sub_l)
;SELECT count(*) FROM demo WHERE word MATCH 'amstedam*' AND distance <= 100;
  SELECT count(*) FROM demo 
  WHERE word MATCH 'amstedam*' AND distance <= 100 AND top=20
;SELECT word, distance, matchlen FROM demo 
  WHERE word MATCH 'amstedam*' AND distance <= 100
  ORDER BY distance, word
;SELECT word, distance, matchlen FROM demo 
  WHERE word MATCH 'amstedam*' AND distance <= 100 AND top=20
  ORDER BY distance, word;