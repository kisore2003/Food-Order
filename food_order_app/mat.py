import frappe
from frappe.utils import nowdate


#def Emailcreate():
#    users = frappe.db.get_all("EmailExample", fields=["name1", "email"])  
#    for user in users:
#        if user.email:
#            frappe.sendmail(
#                recipients=user.email,
#                subject="Daily Reminder",
#                message=f"Hi {user.name1},\n\nThis is your daily reminder from the system.\n\nRegards,\nFrappe Team"
 #           )
 #   frappe.log_error("Daily reminder sent to all users", "Scheduler Log")


#def test(doc, method):
#    if doc.material_request_type != "Purchase":
#        return  
#    po = frappe.new_doc("Purchase Order")
#    po.supplier = "Default Supplier"  
#    po.schedule_date = frappe.utils.nowdate()
#    po.material_request = doc.name

#    for item in doc.items:
#        po.append("items", {
#            "item_code": item.item_code,
#            "schedule_date":item.schedule_date,
#            "qty": item.qty,
 #           "rate": item.rate or 0,
  #          "warehouse": item.warehouse,
 #           "material_request": doc.name,
  #          "material_request_item": item.name
   #     })

 #   po.insert(ignore_permissions=True)
  #  po.submit()

   # frappe.msgprint(f"Purchase Order {po.name} created from Material Request",title="Success", indicator="green")



#def auto_create():
#    print("\n\n Inserting a new doc\n\n")
#    mr = frappe.new_doc("Material Request")
#    mr.material_request_type = "Purchase"
#    mr.transaction_date = nowdate()
 #   mr.schedule_date = nowdate()
 #   mr.set("items", [{
 #       "item_code": "Lenovo",     
 #       "qty": 12,
 #       "schedule_date": nowdate(),
 #       "warehouse": "Stores - X"     
 #   }])
 #   mr.insert(ignore_permissions=True)
 #   mr.submit()

  #  frappe.log_error(f"Created Material Request: {mr.name}", "Auto Scheduler")

  #  existing_po = frappe.get_all("Purchase Order", filters={"material_request": mr.name}, limit=1)
  #  if existing_po:
  #      frappe.log_error(f"PO already exists for MR {mr.name}", "Auto Scheduler")
   #     return

 #   po = frappe.new_doc("Purchase Order")
 #   po.supplier = "Default Supplier"  
 #   po.schedule_date = nowdate()
  #  po.material_request = mr.name
   # for item in mr.items:
    #    po.append("items", {
     #       "item_code": item.item_code,
  #          "qty": item.qty,
   #         "rate": item.rate or 0,
    #        "warehouse": item.warehouse,
     #       "material_request": mr.name,
     #       "material_request_item": item.name
 #       })
  #  po.insert(ignore_permissions=True)
   # frappe.log_error(f" Auto PO Created: {po.name}", "Auto Scheduler")





