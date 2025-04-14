# Copyright (c) 2025, kisore and contributors
# For license information, please see license.txt
import frappe
import traceback
from frappe.model.document import Document

class CookingCourt(Document):
    def trigger(self):
        frappe.msgprint("after_save triggered")  # Debug
        self.update_food_order()

    def update_food_order(self):
        if not self.food_order:
            frappe.msgprint("No Food Order ID provided.")
            return

        try:
            frappe.msgprint(f"Food Order ID entered: {self.food_order}")  

            food_order = frappe.get_doc("Food Order", self.food_order)

            food_order.status = self.status
            food_order.save(ignore_permissions=True)

            frappe.msgprint(f"Food Order '{food_order.name}' updated. New Status: {food_order.status}")

        except frappe.DoesNotExistError:
            frappe.throw(f"Food Order '{self.food_order}' does not exist.")
        except Exception as e:
            frappe.log_error(traceback.format_exc(), "Error in update_food_order")
            frappe.throw("An unexpected error occurred. Check the Error Log.")
