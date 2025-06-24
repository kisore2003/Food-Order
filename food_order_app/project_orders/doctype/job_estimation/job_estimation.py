# Copyright (c) 2025, kisore and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document


class JobEstimation(Document):
	pass
@frappe.whitelist()
def crt_quotation(name):
	doc=frappe.get_doc("Job Estimation",name)
	new_one=frappe.new_doc("Quotation")
	new_one.party_name=doc.customer
	for i in doc.estimation:
		new_one.append("items",{
			"item_code":i.item,
			"qty":i.qty,
			"rate":i.rate,
			
		})
	new_one.insert()
	return new_one.name
	
