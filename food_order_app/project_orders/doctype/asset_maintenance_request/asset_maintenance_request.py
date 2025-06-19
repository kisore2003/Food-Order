# Copyright (c) 2025, kisore and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document


class AssetMaintenanceRequest(Document):
	pass
@frappe.whitelist()
def display(asset):
	asset_name=frappe.db.get_value("Asset",asset,"asset_name")
	return {"asset": asset_name}
@frappe.whitelist()
def employ(emp):
        employee = frappe.get_doc("Employee", emp)
        return {
            "employee_name": employee.employee_name,
            "department": employee.department
        }

@frappe.whitelist()
def new_task(name):
      doc=frappe.get_doc("Asset Maintenance Request",name)
      task_doc=frappe.new_doc("Task")
      task_doc.priority=doc.priority
      task_doc.status=doc.status
      task_doc.custom_asset_maintenance=doc.name
      task_doc.subject="Work"
      task_doc.save()
      
    

