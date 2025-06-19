import frappe

def email(doc, method=None):
    if doc.custom_send_mail == 1:
        recipients = ["kisorecraftinteractive@gmail.com"]
        subject = f"Your Sales Invoice {doc.name}"
        message = "Please find attached your invoice."

        attachment = frappe.attach_print(
            doctype=doc.doctype,
            name=doc.name,
            print_format="Standard",
            file_name=f"Invoice-{doc.name}"
        )

  
        frappe.sendmail(
            recipients=recipients,
            subject=subject,
            message=message,
            attachments=[attachment],
            reference_doctype=doc.doctype,
            reference_name=doc.name
        )

        comm = frappe.new_doc("Communication")
        comm.communication_type = "Communication"
        comm.subject = subject
        comm.content = message
        comm.recipients = ", ".join(recipients)
        comm.reference_doctype = doc.doctype
        comm.reference_name = doc.name
        comm.sent_or_received = "Sent"
        comm.insert()  
