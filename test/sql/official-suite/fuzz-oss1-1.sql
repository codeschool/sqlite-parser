-- original: fuzz-oss1.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

CREATE TABLE parameters (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,t_uuid_parent TEXT NOT NULL DEFAULT '',t_name TEXT NOT NULL,t_value TEXT NOT NULL DEFAULT '',b_blob BLOB,d_lastmodifdate DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,i_tmp INTEGER NOT NULL DEFAULT 0);
CREATE TABLE doctransaction (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,t_name TEXT NOT NULL,t_mode VARCHAR(1) DEFAULT 'U' CHECK (t_mode IN ('U', 'R')),d_date DATE NOT NULL,t_savestep VARCHAR(1) DEFAULT 'N' CHECK (t_savestep IN ('Y', 'N')),i_parent INTEGER, t_refreshviews VARCHAR(1) DEFAULT 'Y' CHECK (t_refreshviews IN ('Y', 'N')));
CREATE TABLE doctransactionitem (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, rd_doctransaction_id INTEGER NOT NULL,i_object_id INTEGER NOT NULL,t_object_table TEXT NOT NULL,t_action VARCHAR(1) DEFAULT 'I' CHECK (t_action IN ('I', 'U', 'D')),t_sqlorder TEXT NOT NULL DEFAULT '');
CREATE TABLE doctransactionmsg (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, rd_doctransaction_id INTEGER NOT NULL,t_message TEXT NOT NULL DEFAULT '',t_popup VARCHAR(1) DEFAULT 'Y' CHECK (t_popup IN ('Y', 'N')));
CREATE TABLE unit(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,t_name TEXT NOT NULL,t_symbol TEXT NOT NULL DEFAULT '',t_country TEXT NOT NULL DEFAULT '',t_type VARCHAR(1) NOT NULL DEFAULT 'C' CHECK (t_type IN ('1', '2', 'C', 'S', 'I', 'O')),t_internet_code TEXT NOT NULL DEFAULT '',i_nbdecimal INT NOT NULL DEFAULT 2,rd_unit_id INTEGER NOT NULL DEFAULT 0, t_source TEXT NOT NULL DEFAULT '');
CREATE TABLE unitvalue(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,rd_unit_id INTEGER NOT NULL,d_date DATE NOT NULL,f_quantity FLOAT NOT NULL CHECK (f_quantity>=0));
CREATE TABLE bank (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,t_name TEXT NOT NULL DEFAULT '',t_bank_number TEXT NOT NULL DEFAULT '',t_icon TEXT NOT NULL DEFAULT '');
CREATE TABLE interest(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,rd_account_id INTEGER NOT NULL,d_date DATE NOT NULL,f_rate FLOAT NOT NULL CHECK (f_rate>=0),t_income_value_date_mode VARCHAR(1) NOT NULL DEFAULT 'F' CHECK (t_income_value_date_mode IN ('F', '0', '1', '2', '3', '4', '5')),t_expenditure_value_date_mode VARCHAR(1) NOT NULL DEFAULT 'F' CHECK (t_expenditure_value_date_mode IN ('F', '0', '1', '2', '3', '4', '5')),t_base VARCHAR(3) NOT NULL DEFAULT '24' CHECK (t_base IN ('24', '360', '365')));
CREATE TABLE operation(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,i_group_id INTEGER NOT NULL DEFAULT 0,i_number INTEGER DEFAULT 0 CHECK (i_number>=0),d_date DATE NOT NULL DEFAULT '0000-00-00',rd_account_id INTEGER NOT NULL,t_mode TEXT NOT NULL DEFAULT '',r_payee_id INTEGER NOT NULL DEFAULT 0,t_comment TEXT NOT NULL DEFAULT '',rc_unit_id INTEGER NOT NULL,t_status VARCHAR(1) NOT NULL DEFAULT 'N' CHECK (t_status IN ('N', 'P', 'Y')),t_bookmarked VARCHAR(1) NOT NULL DEFAULT 'N' CHECK (t_bookmarked IN ('Y', 'N')),t_imported VARCHAR(1) NOT NULL DEFAULT 'N' CHECK (t_imported IN ('Y', 'N', 'P', 'T')),t_template VARCHAR(1) NOT NULL DEFAULT 'N' CHECK (t_template IN ('Y', 'N')),t_import_id TEXT NOT NULL DEFAULT '',i_tmp INTEGER NOT NULL DEFAULT 0,r_recurrentoperation_id INTEGER NOT NULL DEFAULT 0);
CREATE TABLE operationbalance(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,f_balance FLOAT NOT NULL DEFAULT 0,r_operation_id INTEGER NOT NULL);
CREATE TABLE refund (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,t_name TEXT NOT NULL DEFAULT '',t_comment TEXT NOT NULL DEFAULT '',t_close VARCHAR(1) DEFAULT 'N' CHECK (t_close IN ('Y', 'N')));
CREATE TABLE payee (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,t_name TEXT NOT NULL DEFAULT '',t_address TEXT NOT NULL DEFAULT '', t_bookmarked VARCHAR(1) NOT NULL DEFAULT 'N' CHECK (t_bookmarked IN ('Y', 'N')));
CREATE TABLE suboperation(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,t_comment TEXT NOT NULL DEFAULT '',rd_operation_id INTEGER NOT NULL,r_category_id INTEGER NOT NULL DEFAULT 0,f_value FLOAT NOT NULL DEFAULT 0.0,i_tmp INTEGER NOT NULL DEFAULT 0,r_refund_id INTEGER NOT NULL DEFAULT 0, t_formula TEXT NOT NULL DEFAULT '');
CREATE TABLE rule (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,t_description TEXT NOT NULL DEFAULT '',t_definition TEXT NOT NULL DEFAULT '',t_action_description TEXT NOT NULL DEFAULT '',t_action_definition TEXT NOT NULL DEFAULT '',t_action_type VARCHAR(1) DEFAULT 'S' CHECK (t_action_type IN ('S', 'U', 'A')),t_bookmarked VARCHAR(1) NOT NULL DEFAULT 'N' CHECK (t_bookmarked IN ('Y', 'N')),f_sortorder FLOAT);
CREATE TABLE budget (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,rc_category_id INTEGER NOT NULL DEFAULT 0,t_including_subcategories TEXT NOT NULL DEFAULT 'N' CHECK (t_including_subcategories IN ('Y', 'N')),f_budgeted FLOAT NOT NULL DEFAULT 0.0,f_budgeted_modified FLOAT NOT NULL DEFAULT 0.0,f_transferred FLOAT NOT NULL DEFAULT 0.0,i_year INTEGER NOT NULL DEFAULT 2010,i_month INTEGER NOT NULL DEFAULT 0 CHECK (i_month>=0 AND i_month<=12));
CREATE TABLE budgetcategory(id INTEGER NOT NULL DEFAULT 0,id_category INTEGER NOT NULL DEFAULT 0);
CREATE TABLE budgetrule (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,rc_category_id INTEGER NOT NULL DEFAULT 0,t_category_condition TEXT NOT NULL DEFAULT 'Y' CHECK (t_category_condition IN ('Y', 'N')),t_year_condition TEXT NOT NULL DEFAULT 'Y' CHECK (t_year_condition IN ('Y', 'N')),i_year INTEGER NOT NULL DEFAULT 2010,i_month INTEGER NOT NULL DEFAULT 0 CHECK (i_month>=0 AND i_month<=12),t_month_condition TEXT NOT NULL DEFAULT 'Y' CHECK (t_month_condition IN ('Y', 'N')),i_condition INTEGER NOT NULL DEFAULT 0 CHECK (i_condition IN (-1,0,1)),f_quantity FLOAT NOT NULL DEFAULT 0.0,t_absolute TEXT NOT NULL DEFAULT 'Y' CHECK (t_absolute IN ('Y', 'N')),rc_category_id_target INTEGER NOT NULL DEFAULT 0,t_category_target TEXT NOT NULL DEFAULT 'Y' CHECK (t_category_target IN ('Y', 'N')),t_rule TEXT NOT NULL DEFAULT 'N' CHECK (t_rule IN ('N', 'C', 'Y')));
CREATE TABLE "recurrentoperation" (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,d_date DATE NOT NULL DEFAULT '0000-00-00',rd_operation_id INTEGER NOT NULL,i_period_increment INTEGER NOT NULL DEFAULT 1 CHECK (i_period_increment>=0),t_period_unit TEXT NOT NULL DEFAULT 'M' CHECK (t_period_unit IN ('D', 'W', 'M', 'Y')),t_auto_write VARCHAR(1) DEFAULT 'Y' CHECK (t_auto_write IN ('Y', 'N')),i_auto_write_days INTEGER NOT NULL DEFAULT 5 CHECK (i_auto_write_days>=0),t_warn VARCHAR(1) DEFAULT 'Y' CHECK (t_warn IN ('Y', 'N')),i_warn_days INTEGER NOT NULL DEFAULT 5 CHECK (i_warn_days>=0),t_times VARCHAR(1) DEFAULT 'N' CHECK (t_times IN ('Y', 'N')),i_nb_times INTEGER NOT NULL DEFAULT 1 CHECK (i_nb_times>=0));
CREATE TABLE "category" (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,t_name TEXT NOT NULL DEFAULT '' CHECK (t_name NOT LIKE '% > %'),t_fullname TEXT,rd_category_id INT,t_bookmarked VARCHAR(1) NOT NULL DEFAULT 'N' CHECK (t_bookmarked IN ('Y', 'N')));
CREATE TABLE "account"(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,t_name TEXT NOT NULL,t_number TEXT NOT NULL DEFAULT '',t_agency_number TEXT NOT NULL DEFAULT '',t_agency_address TEXT NOT NULL DEFAULT '',t_comment TEXT NOT NULL DEFAULT '',t_close VARCHAR(1) DEFAULT 'N' CHECK (t_close IN ('Y', 'N')),t_type VARCHAR(1) NOT NULL DEFAULT 'C' CHECK (t_type IN ('C', 'D', 'A', 'I', 'L', 'W', 'O')),t_bookmarked VARCHAR(1) NOT NULL DEFAULT 'N' CHECK (t_bookmarked IN ('Y', 'N')),rd_bank_id INTEGER NOT NULL);
CREATE TABLE "node" (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,t_name TEXT NOT NULL DEFAULT '' CHECK (t_name NOT LIKE '% > %'),t_fullname TEXT,t_icon TEXT DEFAULT '',f_sortorder FLOAT,t_autostart VARCHAR(1) DEFAULT 'N' CHECK (t_autostart IN ('Y', 'N')),t_data TEXT,rd_node_id INT CONSTRAINT fk_id REFERENCES node(id) ON DELETE CASCADE);
CREATE TABLE vm_category_display_tmp(
  id INT,
  t_name TEXT,
  t_fullname TEXT,
  rd_category_id INT,
  t_bookmarked TEXT,
  i_NBOPERATIONS,
  f_REALCURRENTAMOUNT
);
CREATE TABLE vm_budget_tmp(
  id INT,
  rc_category_id INT,
  t_including_subcategories TEXT,
  f_budgeted REAL,
  f_budgeted_modified REAL,
  f_transferred REAL,
  i_year INT,
  i_month INT,
  t_CATEGORY,
  t_PERIOD,
  f_CURRENTAMOUNT,
  t_RULES
);
CREATE INDEX idx_doctransaction_parent ON doctransaction (i_parent);
CREATE INDEX idx_doctransactionitem_i_object_id ON doctransactionitem (i_object_id);
CREATE INDEX idx_doctransactionitem_t_object_table ON doctransactionitem (t_object_table);
CREATE INDEX idx_doctransactionitem_t_action ON doctransactionitem (t_action);
CREATE INDEX idx_doctransactionitem_rd_doctransaction_id ON doctransactionitem (rd_doctransaction_id);
CREATE INDEX idx_doctransactionitem_optimization ON doctransactionitem (rd_doctransaction_id, i_object_id, t_object_table, t_action, id);
CREATE INDEX idx_unit_unit_id ON unitvalue(rd_unit_id);
CREATE INDEX idx_account_bank_id ON account(rd_bank_id);
CREATE INDEX idx_account_type ON account(t_type);
CREATE INDEX idx_category_category_id ON category(rd_category_id);
CREATE INDEX idx_category_t_fullname ON category(t_fullname);
CREATE INDEX idx_operation_account_id ON operation (rd_account_id);
CREATE INDEX idx_operation_tmp1_found_transfert ON operation (rc_unit_id, d_date);
CREATE INDEX idx_operation_grouped_operation_id ON operation (i_group_id);
CREATE INDEX idx_operation_i_number ON operation (i_number);
CREATE INDEX idx_operation_i_tmp ON operation (i_tmp);
CREATE INDEX idx_operation_rd_account_id ON operation (rd_account_id);
CREATE INDEX idx_operation_rc_unit_id ON operation (rc_unit_id);
CREATE INDEX idx_operation_t_status ON operation (t_status);
CREATE INDEX idx_operation_t_import_id ON operation (t_import_id);
CREATE INDEX idx_operation_t_template ON operation (t_template);
CREATE INDEX idx_operation_d_date ON operation (d_date);
CREATE INDEX idx_operationbalance_operation_id ON operationbalance (r_operation_id);
CREATE INDEX idx_suboperation_operation_id ON suboperation (rd_operation_id);
CREATE INDEX idx_suboperation_i_tmp ON suboperation (i_tmp);
CREATE INDEX idx_suboperation_category_id ON suboperation (r_category_id);
CREATE INDEX idx_suboperation_refund_id_id ON suboperation (r_refund_id);
CREATE INDEX idx_recurrentoperation_rd_operation_id ON recurrentoperation (rd_operation_id);
CREATE INDEX idx_refund_close ON refund(t_close);
CREATE INDEX idx_interest_account_id ON interest (rd_account_id);
CREATE INDEX idx_rule_action_type ON rule(t_action_type);
CREATE INDEX idx_budget_category_id ON budget(rc_category_id);
CREATE INDEX idx_budgetcategory_id ON budgetcategory (id);
CREATE INDEX idx_budgetcategory_id_category ON budgetcategory (id_category);
CREATE UNIQUE INDEX uidx_parameters_uuid_parent_name ON parameters (t_uuid_parent, t_name);
CREATE UNIQUE INDEX uidx_node_parent_id_name ON node(t_name,rd_node_id);
CREATE UNIQUE INDEX uidx_node_fullname ON node(t_fullname);
CREATE UNIQUE INDEX uidx_unit_name ON unit(t_name);
CREATE UNIQUE INDEX uidx_unit_symbol ON unit(t_symbol);
CREATE UNIQUE INDEX uidx_unitvalue ON unitvalue(d_date,rd_unit_id);
CREATE UNIQUE INDEX uidx_bank_name ON bank(t_name);
CREATE UNIQUE INDEX uidx_account_name ON account(t_name);
CREATE UNIQUE INDEX uidx_category_parent_id_name ON category(t_name,rd_category_id);
CREATE UNIQUE INDEX uidx_category_fullname ON  category(t_fullname);
CREATE UNIQUE INDEX uidx_refund_name ON refund(t_name);
CREATE UNIQUE INDEX uidx_payee_name ON payee(t_name);
CREATE UNIQUE INDEX uidx_interest ON interest(d_date,rd_account_id);
CREATE UNIQUE INDEX uidx_budget ON budget(i_year,i_month, rc_category_id);
CREATE VIEW v_node AS SELECT * from node;
CREATE VIEW v_node_displayname AS SELECT *, t_fullname AS t_displayname from node;
CREATE VIEW v_parameters_displayname AS SELECT *, t_name AS t_displayname from parameters;
CREATE TRIGGER fkdc_parameters_parameters_uuid BEFORE DELETE ON parameters FOR EACH ROW BEGIN     DELETE FROM parameters WHERE parameters.t_uuid_parent=OLD.id||'-'||'parameters'; END;
CREATE TRIGGER fkdc_node_parameters_uuid BEFORE DELETE ON node FOR EACH ROW BEGIN     DELETE FROM parameters WHERE parameters.t_uuid_parent=OLD.id||'-'||'node'; END;
CREATE TRIGGER cpt_node_fullname1 AFTER INSERT ON node BEGIN UPDATE node SET t_fullname=CASE WHEN new.rd_node_id IS NULL OR new.rd_node_id='' OR new.rd_node_id=0 THEN new.t_name ELSE (SELECT c.t_fullname from node c where c.id=new.rd_node_id)||' > '||new.t_name END WHERE id=new.id;END;
CREATE TRIGGER cpt_node_fullname2 AFTER UPDATE OF t_name, rd_node_id ON node BEGIN UPDATE node SET t_fullname=CASE WHEN new.rd_node_id IS NULL OR new.rd_node_id='' OR new.rd_node_id=0 THEN new.t_name ELSE (SELECT c.t_fullname from node c where c.id=new.rd_node_id)||' > '||new.t_name END WHERE id=new.id;UPDATE node SET t_name=t_name WHERE rd_node_id=new.id;END;
CREATE TRIGGER fki_account_bank_rd_bank_id_id BEFORE INSERT ON account FOR EACH ROW BEGIN   SELECT RAISE(ABORT, 'Impossible d''ajouter un objet (bank est utilisé par account)
Nom de la contrainte : fki_account_bank_rd_bank_id_id')   WHERE NEW.rd_bank_id!=0 AND NEW.rd_bank_id!='' AND (SELECT id FROM bank WHERE id = NEW.rd_bank_id) IS NULL; END;
CREATE TRIGGER fku_account_bank_rd_bank_id_id BEFORE UPDATE ON account FOR EACH ROW BEGIN     SELECT RAISE(ABORT, 'Impossible de modifier un objet (bank est utilisé par account)
Nom de la contrainte : fku_account_bank_rd_bank_id_id')       WHERE NEW.rd_bank_id!=0 AND NEW.rd_bank_id!='' AND (SELECT id FROM bank WHERE id = NEW.rd_bank_id) IS NULL; END;
CREATE TRIGGER fkdc_bank_account_id_rd_bank_id BEFORE DELETE ON bank FOR EACH ROW BEGIN     DELETE FROM account WHERE account.rd_bank_id = OLD.id; END;
CREATE TRIGGER fki_budget_category_rc_category_id_id BEFORE INSERT ON budget FOR EACH ROW BEGIN   SELECT RAISE(ABORT, 'Impossible d''ajouter un objet (category est utilisé par budget)
Nom de la contrainte : fki_budget_category_rc_category_id_id')   WHERE NEW.rc_category_id!=0 AND NEW.rc_category_id!='' AND (SELECT id FROM category WHERE id = NEW.rc_category_id) IS NULL; END;
CREATE TRIGGER fku_budget_category_rc_category_id_id BEFORE UPDATE ON budget FOR EACH ROW BEGIN     SELECT RAISE(ABORT, 'Impossible de modifier un objet (category est utilisé par budget)
Nom de la contrainte : fku_budget_category_rc_category_id_id')       WHERE NEW.rc_category_id!=0 AND NEW.rc_category_id!='' AND (SELECT id FROM category WHERE id = NEW.rc_category_id) IS NULL; END;
CREATE TRIGGER fkd_budget_category_rc_category_id_id BEFORE DELETE ON category FOR EACH ROW BEGIN     SELECT RAISE(ABORT, 'Impossible de détruire un objet (category est utilisé par budget)
Nom de la contrainte : fkd_budget_category_rc_category_id_id')     WHERE (SELECT rc_category_id FROM budget WHERE rc_category_id = OLD.id) IS NOT NULL; END;
CREATE TRIGGER fki_budgetrule_category_rc_category_id_id BEFORE INSERT ON budgetrule FOR EACH ROW BEGIN   SELECT RAISE(ABORT, 'Impossible d''ajouter un objet (category est utilisé par budgetrule)
Nom de la contrainte : fki_budgetrule_category_rc_category_id_id')   WHERE NEW.rc_category_id!=0 AND NEW.rc_category_id!='' AND (SELECT id FROM category WHERE id = NEW.rc_category_id) IS NULL; END;
CREATE TRIGGER fku_budgetrule_category_rc_category_id_id BEFORE UPDATE ON budgetrule FOR EACH ROW BEGIN     SELECT RAISE(ABORT, 'Impossible de modifier un objet (category est utilisé par budgetrule)
Nom de la contrainte : fku_budgetrule_category_rc_category_id_id')       WHERE NEW.rc_category_id!=0 AND NEW.rc_category_id!='' AND (SELECT id FROM category WHERE id = NEW.rc_category_id) IS NULL; END;
CREATE TRIGGER fkd_budgetrule_category_rc_category_id_id BEFORE DELETE ON category FOR EACH ROW BEGIN     SELECT RAISE(ABORT, 'Impossible de détruire un objet (category est utilisé par budgetrule)
Nom de la contrainte : fkd_budgetrule_category_rc_category_id_id')     WHERE (SELECT rc_category_id FROM budgetrule WHERE rc_category_id = OLD.id) IS NOT NULL; END;
CREATE TRIGGER fki_budgetrule_category_rc_category_id_target_id BEFORE INSERT ON budgetrule FOR EACH ROW BEGIN   SELECT RAISE(ABORT, 'Impossible d''ajouter un objet (category est utilisé par budgetrule)
Nom de la contrainte : fki_budgetrule_category_rc_category_id_target_id')   WHERE NEW.rc_category_id_target!=0 AND NEW.rc_category_id_target!='' AND (SELECT id FROM category WHERE id = NEW.rc_category_id_target) IS NULL; END;
CREATE TRIGGER fku_budgetrule_category_rc_category_id_target_id BEFORE UPDATE ON budgetrule FOR EACH ROW BEGIN     SELECT RAISE(ABORT, 'Impossible de modifier un objet (category est utilisé par budgetrule)
Nom de la contrainte : fku_budgetrule_category_rc_category_id_target_id')       WHERE NEW.rc_category_id_target!=0 AND NEW.rc_category_id_target!='' AND (SELECT id FROM category WHERE id = NEW.rc_category_id_target) IS NULL; END;
CREATE TRIGGER fkd_budgetrule_category_rc_category_id_target_id BEFORE DELETE ON category FOR EACH ROW BEGIN     SELECT RAISE(ABORT, 'Impossible de détruire un objet (category est utilisé par budgetrule)
Nom de la contrainte : fkd_budgetrule_category_rc_category_id_target_id')     WHERE (SELECT rc_category_id_target FROM budgetrule WHERE rc_category_id_target = OLD.id) IS NOT NULL; END;
CREATE TRIGGER fki_category_category_rd_category_id_id BEFORE INSERT ON category FOR EACH ROW BEGIN   SELECT RAISE(ABORT, 'Impossible d''ajouter un objet (category est utilisé par category)
Nom de la contrainte : fki_category_category_rd_category_id_id')   WHERE NEW.rd_category_id!=0 AND NEW.rd_category_id!='' AND (SELECT id FROM category WHERE id = NEW.rd_category_id) IS NULL; END;
CREATE TRIGGER fku_category_category_rd_category_id_id BEFORE UPDATE ON category FOR EACH ROW BEGIN     SELECT RAISE(ABORT, 'Impossible de modifier un objet (category est utilisé par category)
Nom de la contrainte : fku_category_category_rd_category_id_id')       WHERE NEW.rd_category_id!=0 AND NEW.rd_category_id!='' AND (SELECT id FROM category WHERE id = NEW.rd_category_id) IS NULL; END;
CREATE TRIGGER fkdc_category_category_id_rd_category_id BEFORE DELETE ON category FOR EACH ROW BEGIN     DELETE FROM category WHERE category.rd_category_id = OLD.id; END;
CREATE TRIGGER fki_doctransactionitem_doctransaction_rd_doctransaction_id_id BEFORE INSERT ON doctransactionitem FOR EACH ROW BEGIN   SELECT RAISE(ABORT, 'Impossible d''ajouter un objet (doctransaction est utilisé par doctransactionitem)
Nom de la contrainte : fki_doctransactionitem_doctransaction_rd_doctransaction_id_id')   WHERE NEW.rd_doctransaction_id!=0 AND NEW.rd_doctransaction_id!='' AND (SELECT id FROM doctransaction WHERE id = NEW.rd_doctransaction_id) IS NULL; END;
CREATE TRIGGER fku_doctransactionitem_doctransaction_rd_doctransaction_id_id BEFORE UPDATE ON doctransactionitem FOR EACH ROW BEGIN     SELECT RAISE(ABORT, 'Impossible de modifier un objet (doctransaction est utilisé par doctransactionitem)
Nom de la contrainte : fku_doctransactionitem_doctransaction_rd_doctransaction_id_id')       WHERE NEW.rd_doctransaction_id!=0 AND NEW.rd_doctransaction_id!='' AND (SELECT id FROM doctransaction WHERE id = NEW.rd_doctransaction_id) IS NULL; END;
CREATE TRIGGER fkdc_doctransaction_doctransactionitem_id_rd_doctransaction_id BEFORE DELETE ON doctransaction FOR EACH ROW BEGIN     DELETE FROM doctransactionitem WHERE doctransactionitem.rd_doctransaction_id = OLD.id; END;
CREATE TRIGGER fki_doctransactionmsg_doctransaction_rd_doctransaction_id_id BEFORE INSERT ON doctransactionmsg FOR EACH ROW BEGIN   SELECT RAISE(ABORT, 'Impossible d''ajouter un objet (doctransaction est utilisé par doctransactionmsg)
Nom de la contrainte : fki_doctransactionmsg_doctransaction_rd_doctransaction_id_id')   WHERE NEW.rd_doctransaction_id!=0 AND NEW.rd_doctransaction_id!='' AND (SELECT id FROM doctransaction WHERE id = NEW.rd_doctransaction_id) IS NULL; END;
CREATE TRIGGER fku_doctransactionmsg_doctransaction_rd_doctransaction_id_id BEFORE UPDATE ON doctransactionmsg FOR EACH ROW BEGIN     SELECT RAISE(ABORT, 'Impossible de modifier un objet (doctransaction est utilisé par doctransactionmsg)
Nom de la contrainte : fku_doctransactionmsg_doctransaction_rd_doctransaction_id_id')       WHERE NEW.rd_doctransaction_id!=0 AND NEW.rd_doctransaction_id!='' AND (SELECT id FROM doctransaction WHERE id = NEW.rd_doctransaction_id) IS NULL; END;
CREATE TRIGGER fkdc_doctransaction_doctransactionmsg_id_rd_doctransaction_id BEFORE DELETE ON doctransaction FOR EACH ROW BEGIN     DELETE FROM doctransactionmsg WHERE doctransactionmsg.rd_doctransaction_id = OLD.id; END;
CREATE TRIGGER fki_interest_account_rd_account_id_id BEFORE INSERT ON interest FOR EACH ROW BEGIN   SELECT RAISE(ABORT, 'Impossible d''ajouter un objet (account est utilisé par interest)
Nom de la contrainte : fki_interest_account_rd_account_id_id')   WHERE NEW.rd_account_id!=0 AND NEW.rd_account_id!='' AND (SELECT id FROM account WHERE id = NEW.rd_account_id) IS NULL; END;
CREATE TRIGGER fku_interest_account_rd_account_id_id BEFORE UPDATE ON interest FOR EACH ROW BEGIN     SELECT RAISE(ABORT, 'Impossible de modifier un objet (account est utilisé par interest)
Nom de la contrainte : fku_interest_account_rd_account_id_id')       WHERE NEW.rd_account_id!=0 AND NEW.rd_account_id!='' AND (SELECT id FROM account WHERE id = NEW.rd_account_id) IS NULL; END;
CREATE TRIGGER fkdc_account_interest_id_rd_account_id BEFORE DELETE ON account FOR EACH ROW BEGIN     DELETE FROM interest WHERE interest.rd_account_id = OLD.id; END;
CREATE TRIGGER fki_node_node_rd_node_id_id BEFORE INSERT ON node FOR EACH ROW BEGIN   SELECT RAISE(ABORT, 'Impossible d''ajouter un objet (node est utilisé par node)
Nom de la contrainte : fki_node_node_rd_node_id_id')   WHERE NEW.rd_node_id!=0 AND NEW.rd_node_id!='' AND (SELECT id FROM node WHERE id = NEW.rd_node_id) IS NULL; END;
CREATE TRIGGER fku_node_node_rd_node_id_id BEFORE UPDATE ON node FOR EACH ROW BEGIN     SELECT RAISE(ABORT, 'Impossible de modifier un objet (node est utilisé par node)
Nom de la contrainte : fku_node_node_rd_node_id_id')       WHERE NEW.rd_node_id!=0 AND NEW.rd_node_id!='' AND (SELECT id FROM node WHERE id = NEW.rd_node_id) IS NULL; END;
CREATE TRIGGER fkdc_node_node_id_rd_node_id BEFORE DELETE ON node FOR EACH ROW BEGIN     DELETE FROM node WHERE node.rd_node_id = OLD.id; END;
CREATE TRIGGER fki_operation_account_rd_account_id_id BEFORE INSERT ON operation FOR EACH ROW BEGIN   SELECT RAISE(ABORT, 'Impossible d''ajouter un objet (account est utilisé par operation)
Nom de la contrainte : fki_operation_account_rd_account_id_id')   WHERE NEW.rd_account_id!=0 AND NEW.rd_account_id!='' AND (SELECT id FROM account WHERE id = NEW.rd_account_id) IS NULL; END;
CREATE TRIGGER fku_operation_account_rd_account_id_id BEFORE UPDATE ON operation FOR EACH ROW BEGIN     SELECT RAISE(ABORT, 'Impossible de modifier un objet (account est utilisé par operation)
Nom de la contrainte : fku_operation_account_rd_account_id_id')       WHERE NEW.rd_account_id!=0 AND NEW.rd_account_id!='' AND (SELECT id FROM account WHERE id = NEW.rd_account_id) IS NULL; END;
CREATE TRIGGER fkdc_account_operation_id_rd_account_id BEFORE DELETE ON account FOR EACH ROW BEGIN     DELETE FROM operation WHERE operation.rd_account_id = OLD.id; END;
CREATE TRIGGER fki_operation_payee_r_payee_id_id BEFORE INSERT ON operation FOR EACH ROW BEGIN   SELECT RAISE(ABORT, 'Impossible d''ajouter un objet (payee est utilisé par operation)
Nom de la contrainte : fki_operation_payee_r_payee_id_id')   WHERE NEW.r_payee_id!=0 AND NEW.r_payee_id!='' AND (SELECT id FROM payee WHERE id = NEW.r_payee_id) IS NULL; END;
CREATE TRIGGER fku_operation_payee_r_payee_id_id BEFORE UPDATE ON operation FOR EACH ROW BEGIN     SELECT RAISE(ABORT, 'Impossible de modifier un objet (payee est utilisé par operation)
Nom de la contrainte : fku_operation_payee_r_payee_id_id')       WHERE NEW.r_payee_id!=0 AND NEW.r_payee_id!='' AND (SELECT id FROM payee WHERE id = NEW.r_payee_id) IS NULL; END;
CREATE TRIGGER fkd_operation_payee_r_payee_id_id BEFORE DELETE ON payee FOR EACH ROW BEGIN     UPDATE operation SET r_payee_id=0 WHERE r_payee_id=OLD.id; END;
CREATE TRIGGER fki_operation_unit_rc_unit_id_id BEFORE INSERT ON operation FOR EACH ROW BEGIN   SELECT RAISE(ABORT, 'Impossible d''ajouter un objet (unit est utilisé par operation)
Nom de la contrainte : fki_operation_unit_rc_unit_id_id')   WHERE NEW.rc_unit_id!=0 AND NEW.rc_unit_id!='' AND (SELECT id FROM unit WHERE id = NEW.rc_unit_id) IS NULL; END;
CREATE TRIGGER fku_operation_unit_rc_unit_id_id BEFORE UPDATE ON operation FOR EACH ROW BEGIN     SELECT RAISE(ABORT, 'Impossible de modifier un objet (unit est utilisé par operation)
Nom de la contrainte : fku_operation_unit_rc_unit_id_id')       WHERE NEW.rc_unit_id!=0 AND NEW.rc_unit_id!='' AND (SELECT id FROM unit WHERE id = NEW.rc_unit_id) IS NULL; END;
CREATE TRIGGER fkd_operation_unit_rc_unit_id_id BEFORE DELETE ON unit FOR EACH ROW BEGIN     SELECT RAISE(ABORT, 'Impossible de détruire un objet (unit est utilisé par operation)
Nom de la contrainte : fkd_operation_unit_rc_unit_id_id')     WHERE (SELECT rc_unit_id FROM operation WHERE rc_unit_id = OLD.id) IS NOT NULL; END;
CREATE TRIGGER fki_operation_recurrentoperation_r_recurrentoperation_id_id BEFORE INSERT ON operation FOR EACH ROW BEGIN   SELECT RAISE(ABORT, 'Impossible d''ajouter un objet (recurrentoperation est utilisé par operation)
Nom de la contrainte : fki_operation_recurrentoperation_r_recurrentoperation_id_id')   WHERE NEW.r_recurrentoperation_id!=0 AND NEW.r_recurrentoperation_id!='' AND (SELECT id FROM recurrentoperation WHERE id = NEW.r_recurrentoperation_id) IS NULL; END;
CREATE TRIGGER fku_operation_recurrentoperation_r_recurrentoperation_id_id BEFORE UPDATE ON operation FOR EACH ROW BEGIN     SELECT RAISE(ABORT, 'Impossible de modifier un objet (recurrentoperation est utilisé par operation)
Nom de la contrainte : fku_operation_recurrentoperation_r_recurrentoperation_id_id')       WHERE NEW.r_recurrentoperation_id!=0 AND NEW.r_recurrentoperation_id!='' AND (SELECT id FROM recurrentoperation WHERE id = NEW.r_recurrentoperation_id) IS NULL; END;
CREATE TRIGGER fkd_operation_recurrentoperation_r_recurrentoperation_id_id BEFORE DELETE ON recurrentoperation FOR EACH ROW BEGIN     UPDATE operation SET r_recurrentoperation_id=0 WHERE r_recurrentoperation_id=OLD.id; END;
CREATE TRIGGER fki_operationbalance_operation_r_operation_id_id BEFORE INSERT ON operationbalance FOR EACH ROW BEGIN   SELECT RAISE(ABORT, 'Impossible d''ajouter un objet (operation est utilisé par operationbalance)
Nom de la contrainte : fki_operationbalance_operation_r_operation_id_id')   WHERE NEW.r_operation_id!=0 AND NEW.r_operation_id!='' AND (SELECT id FROM operation WHERE id = NEW.r_operation_id) IS NULL; END;
CREATE TRIGGER fku_operationbalance_operation_r_operation_id_id BEFORE UPDATE ON operationbalance FOR EACH ROW BEGIN     SELECT RAISE(ABORT, 'Impossible de modifier un objet (operation est utilisé par operationbalance)
Nom de la contrainte : fku_operationbalance_operation_r_operation_id_id')       WHERE NEW.r_operation_id!=0 AND NEW.r_operation_id!='' AND (SELECT id FROM operation WHERE id = NEW.r_operation_id) IS NULL; END;
CREATE TRIGGER fkd_operationbalance_operation_r_operation_id_id BEFORE DELETE ON operation FOR EACH ROW BEGIN     UPDATE operationbalance SET r_operation_id=0 WHERE r_operation_id=OLD.id; END;
CREATE TRIGGER fki_recurrentoperation_operation_rd_operation_id_id BEFORE INSERT ON recurrentoperation FOR EACH ROW BEGIN   SELECT RAISE(ABORT, 'Impossible d''ajouter un objet (operation est utilisé par recurrentoperation)
Nom de la contrainte : fki_recurrentoperation_operation_rd_operation_id_id')   WHERE NEW.rd_operation_id!=0 AND NEW.rd_operation_id!='' AND (SELECT id FROM operation WHERE id = NEW.rd_operation_id) IS NULL; END;
CREATE TRIGGER fku_recurrentoperation_operation_rd_operation_id_id BEFORE UPDATE ON recurrentoperation FOR EACH ROW BEGIN     SELECT RAISE(ABORT, 'Impossible de modifier un objet (operation est utilisé par recurrentoperation)
Nom de la contrainte : fku_recurrentoperation_operation_rd_operation_id_id')       WHERE NEW.rd_operation_id!=0 AND NEW.rd_operation_id!='' AND (SELECT id FROM operation WHERE id = NEW.rd_operation_id) IS NULL; END;
CREATE TRIGGER fkdc_operation_recurrentoperation_id_rd_operation_id BEFORE DELETE ON operation FOR EACH ROW BEGIN     DELETE FROM recurrentoperation WHERE recurrentoperation.rd_operation_id = OLD.id; END;
CREATE TRIGGER fki_suboperation_operation_rd_operation_id_id BEFORE INSERT ON suboperation FOR EACH ROW BEGIN   SELECT RAISE(ABORT, 'Impossible d''ajouter un objet (operation est utilisé par suboperation)
Nom de la contrainte : fki_suboperation_operation_rd_operation_id_id')   WHERE NEW.rd_operation_id!=0 AND NEW.rd_operation_id!='' AND (SELECT id FROM operation WHERE id = NEW.rd_operation_id) IS NULL; END;
CREATE TRIGGER fku_suboperation_operation_rd_operation_id_id BEFORE UPDATE ON suboperation FOR EACH ROW BEGIN     SELECT RAISE(ABORT, 'Impossible de modifier un objet (operation est utilisé par suboperation)
Nom de la contrainte : fku_suboperation_operation_rd_operation_id_id')       WHERE NEW.rd_operation_id!=0 AND NEW.rd_operation_id!='' AND (SELECT id FROM operation WHERE id = NEW.rd_operation_id) IS NULL; END;
CREATE TRIGGER fkdc_operation_suboperation_id_rd_operation_id BEFORE DELETE ON operation FOR EACH ROW BEGIN     DELETE FROM suboperation WHERE suboperation.rd_operation_id = OLD.id; END;
CREATE TRIGGER fki_suboperation_category_r_category_id_id BEFORE INSERT ON suboperation FOR EACH ROW BEGIN   SELECT RAISE(ABORT, 'Impossible d''ajouter un objet (category est utilisé par suboperation)
Nom de la contrainte : fki_suboperation_category_r_category_id_id')   WHERE NEW.r_category_id!=0 AND NEW.r_category_id!='' AND (SELECT id FROM category WHERE id = NEW.r_category_id) IS NULL; END;
CREATE TRIGGER fku_suboperation_category_r_category_id_id BEFORE UPDATE ON suboperation FOR EACH ROW BEGIN     SELECT RAISE(ABORT, 'Impossible de modifier un objet (category est utilisé par suboperation)
Nom de la contrainte : fku_suboperation_category_r_category_id_id')       WHERE NEW.r_category_id!=0 AND NEW.r_category_id!='' AND (SELECT id FROM category WHERE id = NEW.r_category_id) IS NULL; END;
CREATE TRIGGER fkd_suboperation_category_r_category_id_id BEFORE DELETE ON category FOR EACH ROW BEGIN     UPDATE suboperation SET r_category_id=0 WHERE r_category_id=OLD.id; END;
CREATE TRIGGER fki_suboperation_refund_r_refund_id_id BEFORE INSERT ON suboperation FOR EACH ROW BEGIN   SELECT RAISE(ABORT, 'Impossible d''ajouter un objet (refund est utilisé par suboperation)
Nom de la contrainte : fki_suboperation_refund_r_refund_id_id')   WHERE NEW.r_refund_id!=0 AND NEW.r_refund_id!='' AND (SELECT id FROM refund WHERE id = NEW.r_refund_id) IS NULL; END;
CREATE TRIGGER fku_suboperation_refund_r_refund_id_id BEFORE UPDATE ON suboperation FOR EACH ROW BEGIN     SELECT RAISE(ABORT, 'Impossible de modifier un objet (refund est utilisé par suboperation)
Nom de la contrainte : fku_suboperation_refund_r_refund_id_id')       WHERE NEW.r_refund_id!=0 AND NEW.r_refund_id!='' AND (SELECT id FROM refund WHERE id = NEW.r_refund_id) IS NULL; END;
CREATE TRIGGER fkd_suboperation_refund_r_refund_id_id BEFORE DELETE ON refund FOR EACH ROW BEGIN     UPDATE suboperation SET r_refund_id=0 WHERE r_refund_id=OLD.id; END;
CREATE TRIGGER fki_unit_unit_rd_unit_id_id BEFORE INSERT ON unit FOR EACH ROW BEGIN   SELECT RAISE(ABORT, 'Impossible d''ajouter un objet (unit est utilisé par unit)
Nom de la contrainte : fki_unit_unit_rd_unit_id_id')   WHERE NEW.rd_unit_id!=0 AND NEW.rd_unit_id!='' AND (SELECT id FROM unit WHERE id = NEW.rd_unit_id) IS NULL; END;
CREATE TRIGGER fku_unit_unit_rd_unit_id_id BEFORE UPDATE ON unit FOR EACH ROW BEGIN     SELECT RAISE(ABORT, 'Impossible de modifier un objet (unit est utilisé par unit)
Nom de la contrainte : fku_unit_unit_rd_unit_id_id')       WHERE NEW.rd_unit_id!=0 AND NEW.rd_unit_id!='' AND (SELECT id FROM unit WHERE id = NEW.rd_unit_id) IS NULL; END;
CREATE TRIGGER fkdc_unit_unit_id_rd_unit_id BEFORE DELETE ON unit FOR EACH ROW BEGIN     DELETE FROM unit WHERE unit.rd_unit_id = OLD.id; END;
CREATE TRIGGER fki_unitvalue_unit_rd_unit_id_id BEFORE INSERT ON unitvalue FOR EACH ROW BEGIN   SELECT RAISE(ABORT, 'Impossible d''ajouter un objet (unit est utilisé par unitvalue)
Nom de la contrainte : fki_unitvalue_unit_rd_unit_id_id')   WHERE NEW.rd_unit_id!=0 AND NEW.rd_unit_id!='' AND (SELECT id FROM unit WHERE id = NEW.rd_unit_id) IS NULL; END;
CREATE TRIGGER fku_unitvalue_unit_rd_unit_id_id BEFORE UPDATE ON unitvalue FOR EACH ROW BEGIN     SELECT RAISE(ABORT, 'Impossible de modifier un objet (unit est utilisé par unitvalue)
Nom de la contrainte : fku_unitvalue_unit_rd_unit_id_id')       WHERE NEW.rd_unit_id!=0 AND NEW.rd_unit_id!='' AND (SELECT id FROM unit WHERE id = NEW.rd_unit_id) IS NULL; END;
CREATE TRIGGER fkdc_unit_unitvalue_id_rd_unit_id BEFORE DELETE ON unit FOR EACH ROW BEGIN     DELETE FROM unitvalue WHERE unitvalue.rd_unit_id = OLD.id; END;
CREATE TRIGGER fkd_vm_budget_tmp_category_rc_category_id_id BEFORE DELETE ON category FOR EACH ROW BEGIN     SELECT RAISE(ABORT, 'Impossible de détruire un objet (category est utilisé par vm_budget_tmp)
Nom de la contrainte : fkd_vm_budget_tmp_category_rc_category_id_id')     WHERE (SELECT rc_category_id FROM vm_budget_tmp WHERE rc_category_id = OLD.id) IS NOT NULL; END;
CREATE TRIGGER fkdc_category_vm_category_display_tmp_id_rd_category_id BEFORE DELETE ON category FOR EACH ROW BEGIN     DELETE FROM vm_category_display_tmp WHERE vm_category_display_tmp.rd_category_id = OLD.id; END;
CREATE VIEW v_unit_displayname AS SELECT *, t_name||' ('||t_symbol||')' AS t_displayname FROM unit;
CREATE VIEW v_unit_tmp1 AS SELECT *,(SELECT count(*) FROM unitvalue s WHERE s.rd_unit_id=unit.id) AS i_NBVALUES, (CASE WHEN unit.rd_unit_id=0 THEN '' ELSE (SELECT (CASE WHEN s.t_symbol!='' THEN s.t_symbol ELSE s.t_name END) FROM unit s WHERE s.id=unit.rd_unit_id) END) AS t_UNIT,(CASE unit.t_type WHEN '1' THEN 'Monnaie principale' WHEN '2' THEN 'Monnaie secondaire' WHEN 'C' THEN 'Monnaie' WHEN 'S' THEN 'Action' WHEN 'I' THEN 'Indice' ELSE 'Objet' END) AS t_TYPENLS, (SELECT MIN(s.d_date) FROM  unitvalue s WHERE s.rd_unit_id=unit.id) AS d_MINDATE, (SELECT MAX(s.d_date) FROM  unitvalue s WHERE s.rd_unit_id=unit.id) AS d_MAXDATE from unit;
CREATE VIEW v_unit_tmp2 AS SELECT *,CASE WHEN v_unit_tmp1.t_type='1' THEN 1 ELSE IFNULL((SELECT s.f_quantity FROM unitvalue s WHERE s.rd_unit_id=v_unit_tmp1.id AND s.d_date=v_unit_tmp1.d_MAXDATE),1) END AS f_LASTVALUE from v_unit_tmp1;
CREATE VIEW v_unit AS SELECT *,v_unit_tmp2.f_LASTVALUE*IFNULL((SELECT s2.f_LASTVALUE FROM v_unit_tmp2 s2 WHERE s2.id=v_unit_tmp2.rd_unit_id) , 1) AS f_CURRENTAMOUNT from v_unit_tmp2;
CREATE VIEW v_unitvalue_displayname AS SELECT *, (SELECT t_displayname FROM v_unit_displayname WHERE unitvalue.rd_unit_id=v_unit_displayname.id)||' '||STRFTIME('%d/%m/%Y',d_date) AS t_displayname FROM unitvalue;
CREATE VIEW v_unitvalue AS SELECT * FROM unitvalue;
CREATE VIEW v_suboperation AS SELECT * FROM suboperation;
CREATE VIEW v_operation_numbers AS SELECT DISTINCT i_number, rd_account_id FROM operation;
CREATE VIEW v_operation_next_numbers AS SELECT T1.i_number+1 AS i_number FROM v_operation_numbers AS T1 LEFT OUTER JOIN v_operation_numbers T2 ON T2.rd_account_id=T1.rd_account_id AND T2.i_number=T1.i_number+1 WHERE T1.i_number!=0 AND (T2.i_number IS NULL) ORDER BY T1.i_number;
CREATE VIEW v_operation_tmp1 AS SELECT *,(SELECT t_name FROM payee s WHERE s.id=operation.r_payee_id) AS t_PAYEE,(SELECT TOTAL(s.f_value) FROM suboperation s WHERE s.rd_operation_id=operation.ID) AS f_QUANTITY,(SELECT count(*) FROM suboperation s WHERE s.rd_operation_id=operation.ID) AS i_NBSUBCATEGORY FROM operation;
CREATE VIEW v_operation AS SELECT *,(SELECT s.id FROM suboperation s WHERE s.rd_operation_id=v_operation_tmp1.id AND ABS(s.f_value)=(SELECT MAX(ABS(s2.f_value)) FROM suboperation s2 WHERE s2.rd_operation_id=v_operation_tmp1.id)) AS i_MOSTIMPSUBOP,((SELECT s.f_CURRENTAMOUNT FROM v_unit s WHERE s.id=v_operation_tmp1.rc_unit_id)*v_operation_tmp1.f_QUANTITY) AS f_CURRENTAMOUNT, (CASE WHEN v_operation_tmp1.i_group_id<>0 AND EXISTS (SELECT 1 FROM account a WHERE v_operation_tmp1.rd_account_id=a.id AND a.t_type<>'L') AND EXISTS (SELECT 1 FROM v_operation_tmp1 op2, account a WHERE op2.i_group_id=v_operation_tmp1.i_group_id AND op2.rd_account_id=a.id AND a.t_type<>'L' AND op2.rc_unit_id=v_operation_tmp1.rc_unit_id AND op2.f_QUANTITY=-v_operation_tmp1.f_QUANTITY) THEN 'Y' ELSE 'N' END) AS t_TRANSFER FROM v_operation_tmp1;
CREATE VIEW v_operation_displayname AS SELECT *, STRFTIME('%d/%m/%Y',d_date)||' '||IFNULL(t_PAYEE,'')||' '||v_operation.f_CURRENTAMOUNT||' '||(SELECT (CASE WHEN s.t_symbol!='' THEN s.t_symbol ELSE s.t_name END) FROM unit s WHERE s.id=v_operation.rc_unit_id) AS t_displayname FROM v_operation;
CREATE VIEW v_operation_delete AS SELECT *, (CASE WHEN t_status='Y' THEN 'Vous n''êtes pas autorisé à détruire cette opération car en état « rapproché »' END) t_delete_message FROM operation;
CREATE VIEW v_account AS SELECT *,(SELECT MAX(s.d_date) FROM  interest s WHERE s.rd_account_id=account.id) AS d_MAXDATE, (SELECT TOTAL(s.f_CURRENTAMOUNT) FROM v_operation s WHERE s.rd_account_id=account.id AND s.t_template='N') AS f_CURRENTAMOUNT FROM account;
CREATE VIEW v_account_delete AS SELECT *, (CASE WHEN EXISTS(SELECT 1 FROM operation WHERE rd_account_id=account.id AND d_date<>'0000-00-00' AND t_template='N' AND t_status='Y') THEN 'Vous n''êtes pas autorisé à détruire ce compte car il contient des opérations rapprochées' END) t_delete_message FROM account;
CREATE VIEW v_bank_displayname AS SELECT *, t_name AS t_displayname FROM bank;
CREATE VIEW v_account_displayname AS SELECT *, (SELECT t_displayname FROM v_bank_displayname WHERE account.rd_bank_id=v_bank_displayname.id)||'-'||t_name AS t_displayname FROM account;
CREATE VIEW v_bank AS SELECT *,(SELECT TOTAL(s.f_CURRENTAMOUNT) FROM v_account s WHERE s.rd_bank_id=bank.id) AS f_CURRENTAMOUNT FROM bank;
CREATE VIEW v_category_displayname AS SELECT *, t_fullname AS t_displayname FROM category;
CREATE VIEW v_category AS SELECT * FROM category;
CREATE VIEW v_recurrentoperation AS SELECT *,i_period_increment||' '||(CASE t_period_unit WHEN 'Y' THEN 'année(s)' WHEN 'M' THEN 'mois' WHEN 'W' THEN 'semaine(s)' ELSE 'jour(s)' END) AS t_PERIODNLS FROM recurrentoperation;
CREATE VIEW v_recurrentoperation_displayname AS SELECT *, STRFTIME('%d/%m/%Y',d_date)||' '||SUBSTR((SELECT t_displayname FROM v_operation_displayname WHERE v_operation_displayname.id=v_recurrentoperation.rd_operation_id), 11) AS t_displayname FROM v_recurrentoperation;
CREATE VIEW v_unitvalue_display AS SELECT *,IFNULL((SELECT (CASE WHEN s.t_symbol!='' THEN s.t_symbol ELSE s.t_name END) FROM unit s WHERE s.id=(SELECT s2.rd_unit_id FROM unit s2 WHERE s2.id=unitvalue.rd_unit_id)),'') AS t_UNIT,STRFTIME('%Y-%m',unitvalue.d_date) AS d_DATEMONTH,STRFTIME('%Y',unitvalue.d_date) AS d_DATEYEAR FROM unitvalue;
CREATE VIEW v_suboperation_display AS SELECT *,IFNULL((SELECT s.t_fullname FROM category s WHERE s.id=v_suboperation.r_category_id),'') AS t_CATEGORY, IFNULL((SELECT s.t_name FROM refund s WHERE s.id=v_suboperation.r_refund_id),'') AS t_REFUND, (CASE WHEN v_suboperation.f_value>=0 THEN v_suboperation.f_value ELSE 0 END) AS f_VALUE_INCOME, (CASE WHEN v_suboperation.f_value<=0 THEN v_suboperation.f_value ELSE 0 END) AS f_VALUE_EXPENSE FROM v_suboperation;
CREATE VIEW v_suboperation_displayname AS SELECT *, t_CATEGORY||' : '||f_value AS t_displayname FROM v_suboperation_display;
CREATE VIEW v_operation_display_all AS SELECT *,(SELECT s.t_name FROM account s WHERE s.id=v_operation.rd_account_id) AS t_ACCOUNT,(SELECT (CASE WHEN s.t_symbol!='' THEN s.t_symbol ELSE s.t_name END) FROM unit s WHERE s.id=v_operation.rc_unit_id) AS t_UNIT,(SELECT s.t_CATEGORY FROM v_suboperation_display s WHERE s.id=v_operation.i_MOSTIMPSUBOP) AS t_CATEGORY,(SELECT s.t_REFUND FROM v_suboperation_display s WHERE s.id=v_operation.i_MOSTIMPSUBOP) AS t_REFUND,(CASE WHEN v_operation.f_QUANTITY<0 THEN '-' WHEN v_operation.f_QUANTITY=0 THEN '' ELSE '+' END) AS t_TYPEEXPENSE, (CASE WHEN v_operation.f_QUANTITY<=0 THEN 'Dépense' ELSE 'Revenu' END) AS t_TYPEEXPENSENLS, STRFTIME('%Y-W%W',v_operation.d_date) AS d_DATEWEEK,STRFTIME('%Y-%m',v_operation.d_date) AS d_DATEMONTH,STRFTIME('%Y',v_operation.d_date)||'-Q'||(CASE WHEN STRFTIME('%m',v_operation.d_date)<='03' THEN '1' WHEN STRFTIME('%m',v_operation.d_date)<='06' THEN '2' WHEN STRFTIME('%m',v_operation.d_date)<='09' THEN '3' ELSE '4' END) AS d_DATEQUARTER, STRFTIME('%Y',v_operation.d_date)||'-S'||(CASE WHEN STRFTIME('%m',v_operation.d_date)<='06' THEN '1' ELSE '2' END) AS d_DATESEMESTER, STRFTIME('%Y',v_operation.d_date) AS d_DATEYEAR, (SELECT count(*) FROM v_recurrentoperation s WHERE s.rd_operation_id=v_operation.id) AS i_NBRECURRENT,  (CASE WHEN v_operation.f_QUANTITY>=0 THEN v_operation.f_QUANTITY ELSE 0 END) AS f_QUANTITY_INCOME, (CASE WHEN v_operation.f_QUANTITY<=0 THEN v_operation.f_QUANTITY ELSE 0 END) AS f_QUANTITY_EXPENSE, (SELECT o2.f_balance FROM operationbalance o2 WHERE o2.r_operation_id=v_operation.id ) AS f_BALANCE, (CASE WHEN v_operation.f_QUANTITY>=0 THEN v_operation.f_CURRENTAMOUNT ELSE 0 END) AS f_CURRENTAMOUNT_INCOME, (CASE WHEN v_operation.f_QUANTITY<=0 THEN v_operation.f_CURRENTAMOUNT ELSE 0 END) AS f_CURRENTAMOUNT_EXPENSE FROM v_operation;
CREATE VIEW v_operation_template_display AS SELECT * FROM v_operation_display_all WHERE t_template='Y';
CREATE VIEW v_operation_display AS SELECT * FROM v_operation_display_all WHERE d_date!='0000-00-00' AND t_template='N';
CREATE VIEW v_unit_display AS SELECT *,(SELECT TOTAL(o.f_QUANTITY) FROM v_operation_display o WHERE o.rc_unit_id=v_unit.id) AS f_QUANTITYOWNED FROM v_unit;
CREATE VIEW v_account_display AS SELECT (CASE t_type WHEN 'C' THEN 'Courant' WHEN 'D' THEN 'Carte de crédit' WHEN 'A' THEN 'Actif' WHEN 'I' THEN 'Investissement' WHEN 'W' THEN 'Portefeuille' WHEN 'L' THEN 'Prêt' WHEN 'O' THEN 'Autre' END) AS t_TYPENLS,bank.t_name  AS t_BANK,bank.t_bank_number AS t_BANK_NUMBER,bank.t_icon AS t_ICON,v_account.*,(v_account.f_CURRENTAMOUNT/(SELECT u.f_CURRENTAMOUNT FROM v_unit u, operation s WHERE u.id=s.rc_unit_id AND s.rd_account_id=v_account.id AND s.d_date='0000-00-00')) AS f_QUANTITY, (SELECT (CASE WHEN u.t_symbol!='' THEN u.t_symbol ELSE u.t_name END) FROM unit u, operation s WHERE u.id=s.rc_unit_id AND s.rd_account_id=v_account.id AND s.d_date='0000-00-00') AS t_UNIT, (SELECT TOTAL(s.f_CURRENTAMOUNT) FROM v_operation s WHERE s.rd_account_id=v_account.id AND s.t_status!='N' AND s.t_template='N') AS f_CHECKED, (SELECT TOTAL(s.f_CURRENTAMOUNT) FROM v_operation s WHERE s.rd_account_id=v_account.id AND s.t_status='N' AND s.t_template='N') AS f_COMING_SOON, (SELECT TOTAL(s.f_CURRENTAMOUNT) FROM v_operation s WHERE s.rd_account_id=v_account.id AND s.d_date<=date('now') AND s.t_template='N') AS f_TODAYAMOUNT, (SELECT count(*) FROM v_operation_display s WHERE s.rd_account_id=v_account.id) AS i_NBOPERATIONS, IFNULL((SELECT s.f_rate FROM interest s WHERE s.rd_account_id=v_account.id AND s.d_date=v_account.d_MAXDATE),0) AS f_RATE FROM v_account, bank WHERE bank.id=v_account.rd_bank_id;
CREATE VIEW v_operation_consolidated AS SELECT (SELECT s.t_TYPENLS FROM v_account_display s WHERE s.id=op.rd_account_id) AS t_ACCOUNTTYPE,(SELECT u.t_TYPENLS FROM v_unit u WHERE u.id=op.rc_unit_id) AS t_UNITTYPE,sop.id AS i_SUBOPID, sop.r_refund_id AS r_refund_id, (CASE WHEN sop.t_comment='' THEN op.t_comment ELSE sop.t_comment END) AS t_REALCOMMENT, sop.t_CATEGORY AS t_REALCATEGORY, sop.t_REFUND AS t_REALREFUND, sop.r_category_id AS i_IDCATEGORY, (CASE WHEN sop.f_value<0 THEN '-' WHEN sop.f_value=0 THEN '' ELSE '+' END) AS t_TYPEEXPENSE, (CASE WHEN sop.f_value<0 THEN 'Dépense' WHEN sop.f_value=0 THEN '' ELSE 'Revenu' END) AS t_TYPEEXPENSENLS, sop.f_value AS f_REALQUANTITY, sop.f_VALUE_INCOME AS f_REALQUANTITY_INCOME, sop.f_VALUE_EXPENSE AS f_REALQUANTITY_EXPENSE, ((SELECT u.f_CURRENTAMOUNT FROM v_unit u WHERE u.id=op.rc_unit_id)*sop.f_value) AS f_REALCURRENTAMOUNT, ((SELECT u.f_CURRENTAMOUNT FROM v_unit u WHERE u.id=op.rc_unit_id)*sop.f_VALUE_INCOME) AS f_REALCURRENTAMOUNT_INCOME, ((SELECT u.f_CURRENTAMOUNT FROM v_unit u WHERE u.id=op.rc_unit_id)*sop.f_VALUE_EXPENSE) AS f_REALCURRENTAMOUNT_EXPENSE, op.* FROM v_operation_display_all AS op, v_suboperation_display AS sop WHERE op.t_template='N' AND sop.rd_operation_id=op.ID;
CREATE VIEW v_operation_prop AS SELECT p.id AS i_PROPPID, p.t_name AS i_PROPPNAME, p.t_value AS i_PROPVALUE, op.* FROM v_operation_consolidated AS op LEFT OUTER JOIN parameters AS p ON p.t_uuid_parent=op.id||'-operation';
CREATE VIEW v_refund_delete AS SELECT *, (CASE WHEN EXISTS(SELECT 1 FROM v_operation_consolidated WHERE r_refund_id=refund.id AND t_status='Y') THEN 'Vous n''êtes pas autorisé à détruire ce suiveur car utilisé par des opérations rapprochées' END) t_delete_message FROM refund;
CREATE VIEW v_refund AS SELECT *, (SELECT TOTAL(o.f_REALCURRENTAMOUNT) FROM v_operation_consolidated o WHERE o.r_refund_id=refund.id) AS f_CURRENTAMOUNT FROM refund;
CREATE VIEW v_refund_display AS SELECT *,(SELECT MIN(o.d_date) FROM v_operation_consolidated o WHERE o.r_refund_id=v_refund.id) AS d_FIRSTDATE, (SELECT MAX(o.d_date) FROM v_operation_consolidated o WHERE o.r_refund_id=v_refund.id) AS d_LASTDATE  FROM v_refund;
CREATE VIEW v_refund_displayname AS SELECT *, t_name AS t_displayname FROM refund;
CREATE VIEW v_payee_delete AS SELECT *, (CASE WHEN EXISTS(SELECT 1 FROM operation WHERE r_payee_id=payee.id AND t_status='Y') THEN 'Vous n''êtes pas autorisé à détruire ce tiers car utilisé par des opérations rapprochées' END) t_delete_message FROM payee;
CREATE VIEW v_payee AS SELECT *, (SELECT TOTAL(o.f_CURRENTAMOUNT) FROM v_operation o WHERE o.r_payee_id=payee.id AND o.t_template='N') AS f_CURRENTAMOUNT FROM payee;
CREATE VIEW v_payee_display AS SELECT *  FROM v_payee;
CREATE VIEW v_payee_displayname AS SELECT *, t_name AS t_displayname FROM payee;
CREATE VIEW v_category_delete AS SELECT *, (CASE WHEN EXISTS(SELECT 1 FROM v_operation_consolidated WHERE (t_REALCATEGORY=category.t_fullname OR t_REALCATEGORY like category.t_fullname||'%') AND t_status='Y') THEN 'Vous n''êtes pas autorisé à détruire cette catégorie car utilisée par des opérations rapprochées' END) t_delete_message FROM category;
CREATE VIEW v_category_display_tmp AS SELECT *,(SELECT count(distinct(so.rd_operation_id)) FROM operation o, suboperation so WHERE so.rd_operation_id=o.id AND so.r_category_id=v_category.ID AND o.t_template='N') AS i_NBOPERATIONS, (SELECT TOTAL(o.f_REALCURRENTAMOUNT) FROM v_operation_consolidated o WHERE o.i_IDCATEGORY=v_category.ID) AS f_REALCURRENTAMOUNT FROM v_category;
CREATE VIEW v_category_display AS SELECT *,f_REALCURRENTAMOUNT+(SELECT TOTAL(c.f_REALCURRENTAMOUNT) FROM vm_category_display_tmp c WHERE c.t_fullname LIKE vm_category_display_tmp.t_fullname||' > %') AS f_SUMCURRENTAMOUNT, i_NBOPERATIONS+(SELECT CAST(TOTAL(c.i_NBOPERATIONS) AS INTEGER) FROM vm_category_display_tmp c WHERE c.t_fullname like vm_category_display_tmp.t_fullname||' > %') AS i_SUMNBOPERATIONS, (CASE WHEN t_bookmarked='Y' THEN 'Y' WHEN EXISTS(SELECT 1 FROM category c WHERE c.t_bookmarked='Y' AND c.t_fullname like vm_category_display_tmp.t_fullname||' > %') THEN 'C' ELSE 'N' END) AS t_HASBOOKMARKEDCHILD, (CASE WHEN vm_category_display_tmp.f_REALCURRENTAMOUNT<0 THEN '-' WHEN vm_category_display_tmp.f_REALCURRENTAMOUNT=0 THEN '' ELSE '+' END) AS t_TYPEEXPENSE,(CASE WHEN vm_category_display_tmp.f_REALCURRENTAMOUNT<0 THEN 'Dépense' WHEN vm_category_display_tmp.f_REALCURRENTAMOUNT=0 THEN '' ELSE 'Revenu' END) AS t_TYPEEXPENSENLS FROM vm_category_display_tmp;
CREATE VIEW v_recurrentoperation_display AS SELECT rop.*, op.t_ACCOUNT, op.i_number, op.t_mode, op.i_group_id, op.t_TRANSFER, op.t_PAYEE, op.t_comment, op.t_CATEGORY, op.t_status, op.f_CURRENTAMOUNT FROM v_recurrentoperation rop, v_operation_display_all AS op WHERE rop.rd_operation_id=op.ID;
CREATE VIEW v_rule AS SELECT *,(SELECT COUNT(1) FROM rule r WHERE r.f_sortorder<=rule.f_sortorder) AS i_ORDER FROM rule;
CREATE VIEW v_rule_displayname AS SELECT *, t_definition AS t_displayname FROM rule;
CREATE VIEW v_interest AS SELECT *,(SELECT s.t_name FROM account s WHERE s.id=interest.rd_account_id) AS t_ACCOUNT  FROM interest;
CREATE VIEW v_interest_displayname AS SELECT *, STRFTIME('%d/%m/%Y',d_date)||' '||f_rate||'%' AS t_displayname FROM interest;
CREATE VIEW v_budgetrule AS SELECT *, IFNULL((SELECT s.t_fullname FROM category s WHERE s.id=budgetrule.rc_category_id),'') AS t_CATEGORYCONDITION, IFNULL((SELECT s.t_fullname FROM category s WHERE s.id=budgetrule.rc_category_id_target),'') AS t_CATEGORY, (CASE WHEN budgetrule.i_condition=-1 THEN 'Négatif' WHEN budgetrule.i_condition=1 THEN 'Positif' WHEN budgetrule.i_condition=0 THEN 'Tous' END) AS t_WHENNLS, f_quantity||(CASE WHEN budgetrule.t_absolute='N' THEN '%' ELSE (SELECT t_symbol FROM unit WHERE t_type='1') END) AS t_WHATNLS,(CASE WHEN budgetrule.t_rule='N' THEN 'Suivant' WHEN budgetrule.t_rule='C' THEN 'Courant' WHEN budgetrule.t_rule='Y' THEN 'Année' END) AS t_RULENLS FROM budgetrule;
CREATE VIEW v_budgetrule_display AS SELECT *  FROM v_budgetrule;
CREATE VIEW v_budgetrule_displayname AS SELECT *, t_WHENNLS||' '||t_WHATNLS||' '||t_RULENLS||' '||t_CATEGORY AS t_displayname FROM v_budgetrule;
CREATE VIEW v_budget_tmp AS SELECT *, IFNULL((SELECT s.t_fullname FROM category s WHERE s.id=budget.rc_category_id),'') AS t_CATEGORY, (i_year||(CASE WHEN i_month=0 THEN '' WHEN i_month<10 THEN '-0'||i_month ELSE '-'||i_month END)) AS t_PERIOD, (SELECT TOTAL(o.f_REALCURRENTAMOUNT) FROM v_operation_consolidated o WHERE STRFTIME('%Y', o.d_date)=i_year AND (i_month=0 OR STRFTIME('%m', o.d_date)=i_month) AND o.i_IDCATEGORY IN (SELECT b2.id_category FROM budgetcategory b2 WHERE b2.id=budget.id)) AS f_CURRENTAMOUNT, (SELECT GROUP_CONCAT(v_budgetrule_displayname.t_displayname,',') FROM v_budgetrule_displayname WHERE (v_budgetrule_displayname.t_year_condition='N' OR budget.i_year=v_budgetrule_displayname.i_year) AND (v_budgetrule_displayname.t_month_condition='N' OR budget.i_month=v_budgetrule_displayname.i_month) AND (v_budgetrule_displayname.t_category_condition='N' OR budget.rc_category_id=v_budgetrule_displayname.rc_category_id) ORDER BY v_budgetrule_displayname.t_absolute DESC, v_budgetrule_displayname.id) AS t_RULES FROM budget;
CREATE VIEW v_budget AS SELECT *, (f_CURRENTAMOUNT-f_budgeted_modified) AS f_DELTABEFORETRANSFER, (f_CURRENTAMOUNT-f_budgeted_modified-f_transferred) AS f_DELTA FROM v_budget_tmp;
CREATE VIEW v_budget_display AS SELECT *, (f_CURRENTAMOUNT-f_budgeted_modified) AS f_DELTABEFORETRANSFER, (f_CURRENTAMOUNT-f_budgeted_modified-f_transferred) AS f_DELTA FROM vm_budget_tmp;
CREATE VIEW v_budget_displayname AS SELECT *, t_CATEGORY||' '||t_PERIOD||' '||f_budgeted_modified AS t_displayname FROM v_budget;
CREATE TRIGGER fkdc_bank_parameters_uuid BEFORE DELETE ON bank FOR EACH ROW BEGIN     DELETE FROM parameters WHERE parameters.t_uuid_parent=OLD.id||'-'||'bank'; END;
CREATE TRIGGER fkdc_account_parameters_uuid BEFORE DELETE ON account FOR EACH ROW BEGIN     DELETE FROM parameters WHERE parameters.t_uuid_parent=OLD.id||'-'||'account'; END;
CREATE TRIGGER fkdc_unit_parameters_uuid BEFORE DELETE ON unit FOR EACH ROW BEGIN     DELETE FROM parameters WHERE parameters.t_uuid_parent=OLD.id||'-'||'unit'; END;
CREATE TRIGGER fkdc_unitvalue_parameters_uuid BEFORE DELETE ON unitvalue FOR EACH ROW BEGIN     DELETE FROM parameters WHERE parameters.t_uuid_parent=OLD.id||'-'||'unitvalue'; END;
CREATE TRIGGER fkdc_category_parameters_uuid BEFORE DELETE ON category FOR EACH ROW BEGIN     DELETE FROM parameters WHERE parameters.t_uuid_parent=OLD.id||'-'||'category'; END;
CREATE TRIGGER fkdc_operation_parameters_uuid BEFORE DELETE ON operation FOR EACH ROW BEGIN     DELETE FROM parameters WHERE parameters.t_uuid_parent=OLD.id||'-'||'operation'; END;
CREATE TRIGGER fkdc_interest_parameters_uuid BEFORE DELETE ON interest FOR EACH ROW BEGIN     DELETE FROM parameters WHERE parameters.t_uuid_parent=OLD.id||'-'||'interest'; END;
CREATE TRIGGER fkdc_suboperation_parameters_uuid BEFORE DELETE ON suboperation FOR EACH ROW BEGIN     DELETE FROM parameters WHERE parameters.t_uuid_parent=OLD.id||'-'||'suboperation'; END;
CREATE TRIGGER fkdc_refund_parameters_uuid BEFORE DELETE ON refund FOR EACH ROW BEGIN     DELETE FROM parameters WHERE parameters.t_uuid_parent=OLD.id||'-'||'refund'; END;
CREATE TRIGGER fkdc_payee_parameters_uuid BEFORE DELETE ON payee FOR EACH ROW BEGIN     DELETE FROM parameters WHERE parameters.t_uuid_parent=OLD.id||'-'||'payee'; END;
CREATE TRIGGER fkdc_recurrentoperation_parameters_uuid BEFORE DELETE ON recurrentoperation FOR EACH ROW BEGIN     DELETE FROM parameters WHERE parameters.t_uuid_parent=OLD.id||'-'||'recurrentoperation'; END;
CREATE TRIGGER fkdc_rule_parameters_uuid BEFORE DELETE ON rule FOR EACH ROW BEGIN     DELETE FROM parameters WHERE parameters.t_uuid_parent=OLD.id||'-'||'rule'; END;
CREATE TRIGGER fkdc_budget_parameters_uuid BEFORE DELETE ON budget FOR EACH ROW BEGIN     DELETE FROM parameters WHERE parameters.t_uuid_parent=OLD.id||'-'||'budget'; END;
CREATE TRIGGER fkdc_budgetrule_parameters_uuid BEFORE DELETE ON budgetrule FOR EACH ROW BEGIN     DELETE FROM parameters WHERE parameters.t_uuid_parent=OLD.id||'-'||'budgetrule'; END;
CREATE TRIGGER cpt_category_fullname1 AFTER INSERT ON category BEGIN UPDATE category SET t_fullname=CASE WHEN rd_category_id IS NULL OR rd_category_id='' OR rd_category_id=0 THEN new.t_name ELSE (SELECT c.t_fullname FROM category c WHERE c.id=new.rd_category_id)||' > '||new.t_name END WHERE id=new.id;END;
CREATE TRIGGER cpt_category_fullname2 AFTER UPDATE OF t_name, rd_category_id ON category BEGIN UPDATE category SET t_fullname=CASE WHEN rd_category_id IS NULL OR rd_category_id='' OR rd_category_id=0 THEN new.t_name ELSE (SELECT c.t_fullname FROM category c WHERE c.id=new.rd_category_id)||' > '||new.t_name END WHERE id=new.id;UPDATE category SET t_name=t_name WHERE rd_category_id=new.id;END;
CREATE TRIGGER fkdc_category_delete BEFORE DELETE ON category FOR EACH ROW BEGIN     UPDATE suboperation SET r_category_id=OLD.rd_category_id WHERE r_category_id=OLD.id; END;
explain
       SELECT TOTAL(f_CURRENTAMOUNT), d_DATEMONTH
       from v_operation_display
       WHERE d_DATEMONTH IN ('2012-05', '2012-04')
       group by d_DATEMONTH, t_TYPEEXPENSE;