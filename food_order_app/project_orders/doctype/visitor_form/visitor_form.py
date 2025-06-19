# Copyright (c) 2025, kisore and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document
from frappe.utils import now_datetime


class VisitorForm(Document):
    def validate(self):
        if(self.checking_out=="Yes"):
            self.chk_out=now_datetime()
        # else:
        #     frappe.throw("you must check out")
            
	#pass