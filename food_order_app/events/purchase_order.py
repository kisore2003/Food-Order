import frappe

def workflow(doc, method=None):
    s = doc.workflow_state

    if s == "Approved By Department Manager":
        doc.db_set("custom_approval_status_l1", "Approved")
    else:
        doc.db_set("custom_approval_status_l1", "Draft")

    if s == "Approved":
        doc.db_set("custom_approval_status_l2", "Approved")
    else:
        doc.db_set("custom_approval_status_l2", "Draft")
