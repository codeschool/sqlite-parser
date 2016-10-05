-- original: fts2c.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

SELECT rowid FROM email WHERE email MATCH 'mark'
;SELECT rowid FROM email WHERE email MATCH 'susan'
;SELECT rowid FROM email WHERE email MATCH 'mark susan'
;SELECT rowid FROM email WHERE email MATCH 'susan mark'
;SELECT rowid FROM email WHERE email MATCH '"mark susan"'
;SELECT rowid FROM email WHERE email MATCH 'mark -susan'
;SELECT rowid FROM email WHERE email MATCH '-mark susan'
;SELECT rowid FROM email WHERE email MATCH 'mark OR susan'
;SELECT rowid, offsets(email) FROM email
     WHERE email MATCH 'gas reminder'
;SELECT rowid, offsets(email) FROM email
     WHERE email MATCH 'subject:gas reminder'
;SELECT rowid, offsets(email) FROM email
     WHERE email MATCH 'body:gas reminder'
;SELECT rowid, offsets(email) FROM email
     WHERE subject MATCH 'gas reminder'
;SELECT rowid, offsets(email) FROM email
     WHERE body MATCH 'gas reminder'
;SELECT rowid, offsets(email) FROM email
     WHERE body MATCH 'child product' AND +rowid=32
;SELECT rowid, offsets(email) FROM email
     WHERE body MATCH '"child product"'
;SELECT snippet(email) FROM email
     WHERE email MATCH 'subject:gas reminder'
;SELECT snippet(email) FROM email
     WHERE email MATCH 'christmas candlelight'
;SELECT snippet(email) FROM email
     WHERE email MATCH 'deal sheet potential reuse'
;SELECT snippet(email,'<<<','>>>',' ') FROM email
     WHERE email MATCH 'deal sheet potential reuse'
;SELECT snippet(email,'<<<','>>>',' ') FROM email
     WHERE email MATCH 'first things'
;SELECT snippet(email) FROM email
     WHERE email MATCH 'chris is here'
;SELECT snippet(email) FROM email
     WHERE email MATCH '"pursuant to"'
;SELECT snippet(email) FROM email
     WHERE email MATCH 'ancillary load davis'
;SELECT snippet(email) FROM email
     WHERE email MATCH 'questar enron OR com'
;SELECT snippet(email) FROM email
     WHERE email MATCH 'enron OR com questar';