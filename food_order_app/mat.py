import frappe

def test(doc, method):
    if doc.material_request_type != "Purchase":
        return  
    po = frappe.new_doc("Purchase Order")
    po.supplier = "Default Supplier"  
    po.schedule_date = frappe.utils.nowdate()
    po.material_request = doc.name

    for item in doc.items:
        po.append("items", {
            "item_code": item.item_code,
            "qty": item.qty,
            "rate": item.rate or 0,
            "warehouse": item.warehouse,
            "material_request": doc.name,
            "material_request_item": item.name
        })

    po.insert(ignore_permissions=True)
    po.submit()

    frappe.msgprint(f"✅ Purchase Order {po.name} created from Material Request")
