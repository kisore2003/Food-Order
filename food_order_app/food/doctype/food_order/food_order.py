# Copyright (c) 2025, kisore and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document

class FoodOrder(Document):
      def before_save(self):
        self.create_cooking_court()
      def create_cooking_court(self):
        new_doc = frappe.new_doc("Cooking Court")
        new_doc.customer_name = self.customer_name
        new_doc.status = self.status
        new_doc.rate = self.rate
        for item in self.foods_details:
                new_doc.append("confirm_order", {
                       "foods": item.d3,
                        "qty": item.qty
                            })
        new_doc.save(ignore_permissions=True)  
        frappe.msgprint("Added to Cooking Court")
        



		
    #pass
