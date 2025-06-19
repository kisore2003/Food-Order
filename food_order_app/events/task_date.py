
import frappe
from frappe.utils import get_datetime

def dateto_amr(doc, self):
    
    if doc.custom_asset_maintenance:
        task = frappe.get_doc("Asset Maintenance Request", doc.custom_asset_maintenance)
        task.excepted_completion_date = doc.exp_end_date

        if task.request_date and task.excepted_completion_date:
            start = get_datetime(task.request_date)
            end = get_datetime(task.excepted_completion_date)

            if start > end:
                frappe.throw("Expected Completion Date cannot be before Request Date.")

     
            total_seconds = (end - start).total_seconds()

    
            resolution_hours = round(total_seconds / 3600, 2)
            task.resolution_time = resolution_hours  
            if task.resolution_time:
                task.status="In Review"
        task.save()
    
