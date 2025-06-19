import frappe

def todo_fetching(doc, self):
    if doc.reference_type == "Task":
        task_doc = frappe.get_doc("Task", doc.reference_name)
        asset_name = task_doc.custom_asset_maintenance
        if asset_name:
            asset_doc = frappe.get_doc("Asset Maintenance Request", asset_name)
            asset_doc.status="In Progress"
            asset_doc.save()
    else:
        frappe.throw("error")

