-- original: securedel.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

PRAGMA secure_delete
;ATTACH 'test2.db' AS db2;
    PRAGMA main.secure_delete=ON;
    PRAGMA db2.secure_delete
;PRAGMA main.secure_delete=OFF;
    PRAGMA db2.secure_delete
;PRAGMA secure_delete=OFF;
    PRAGMA db2.secure_delete
;PRAGMA secure_delete=ON;
    PRAGMA db2.secure_delete
;DETACH db2;
    ATTACH 'test2.db' AS db2;
    PRAGMA db2.secure_delete
;DETACH db2;
    PRAGMA main.secure_delete=OFF;
    ATTACH 'test2.db' AS db2;
    PRAGMA db2.secure_delete;