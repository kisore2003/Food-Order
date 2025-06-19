# Copyright (c) 2025, kisore and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document

class FoodOrder(Document):
    def after_insert(self):  
        self.create_cooking_court()

    def create_cooking_court(self):
        new_doc = frappe.new_doc("Cooking Court")
        new_doc.customer_name = self.customer_name
        new_doc.status = self.status
        new_doc.date= self.date
        new_doc.food_order = self.name  

        for item in self.foods_details:
            new_doc.append("confirm_order", {
                "foods": item.d3,
                "qty": item.qty
            })
        new_doc.save()
        frappe.msgprint(" Cooking Court created and linked!")

    
    


		
    #pass


@frappe.whitelist()
def get_food_rate(item_code):
    rate = frappe.db.get_value("Item",item_code,"custom_food_rate")
    
    return rate
    