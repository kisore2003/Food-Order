# Copyright (c) 2025, kisore and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document
from frappe.utils import now_datetime

class VisitorMangamentSystem(Document):
    def after_insert(self):
        # Set check_in datetime after insert and persist
        check_in_time = now_datetime()
        self.db_set("check_in", check_in_time)

        # Create Visitor Form document
        visitor_form = frappe.new_doc("Visitor Form")
        visitor_form.name1 = self.name1
        visitor_form.phone = self.phone
        visitor_form.purpose = self.purpose
        visitor_form.check_in = check_in_time
        visitor_form.host = self.host
        visitor_form.checking_out = "No"
        visitor_form.insert()
        

        frappe.msgprint("Visitor Form created and mail sent.")
