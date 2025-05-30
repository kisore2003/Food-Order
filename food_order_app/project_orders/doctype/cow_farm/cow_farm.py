# Copyright (c) 2025, kisore and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document
from frappe.utils import today, date_diff, getdate

class CowFarm(Document):
    def validate(self):
        self.cow()

    def cow(self):
        if getdate(self.today_date) > getdate(today()):
            frappe.throw("Correct Your Date")
        
      
        self.total_days = date_diff(getdate(today()), getdate(self.entry_date))



