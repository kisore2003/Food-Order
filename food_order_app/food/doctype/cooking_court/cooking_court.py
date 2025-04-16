# Copyright (c) 2025, kisore and contributors
# For license information, please see license.txt
import frappe
import traceback
from frappe.model.document import Document

class CookingCourt(Document):
    def validate(self):
        self.update_food_order()

    def update_food_order(self):
        if not self.food_order:
            frappe.throw("⚠️ No Food Order linked.")
            return

        try:
            frappe.msgprint(f"🔗 Linked Food Order: {self.food_order}")

            food_order = frappe.get_doc("Food Order", self.food_order)
            if food_order.status != self.status:
                old_status = food_order.status
                food_order.status = self.status
                food_order.save(ignore_permissions=True)

                frappe.msgprint(f"Food Order '{food_order.name}' status updated from '{old_status}' to '{food_order.status}'")
            else:
                frappe.msgprint("Status is the same as Food Order. No update required.")
        except frappe.DoesNotExistError:
            frappe.throw(f"Food Order '{self.food_order}' does not exist.")
      
