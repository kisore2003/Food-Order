# Copyright (c) 2025, kisore and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document
from frappe.utils import now_datetime
# from frappe.utils.file_manager import save_file
# from io import BytesIO
# import qrcode


class VisitorMangamentSystem(Document):
    def after_insert(self):
        # Set check-in time
        check_in_time = now_datetime()
        self.db_set("check_in", check_in_time)

        # Create linked Visitor Form
        visitor_form = frappe.new_doc("Visitor Form")
        visitor_form.name1 = self.name1
        visitor_form.phone = self.phone
        visitor_form.purpose = self.purpose
        visitor_form.check_in = check_in_time
        visitor_form.host = self.host
        visitor_form.checking_out = "No"
        visitor_form.insert()

        # Generate QR code
#         generate_qr_code(self)

#         frappe.msgprint("Visitor Form created and QR code generated.")


# def generate_qr_code(doc):
#     # Use a field to generate QR code (e.g., phone, name1, etc.)
#     if not doc.phone:
#         return

#     data_to_encode = f"Visitor: {doc.name1}\nPhone: {doc.phone}\nPurpose: {doc.purpose}"
#     qr = qrcode.make(data_to_encode)

#     # Save QR code image to memory
#     buffer = BytesIO()
#     qr.save(buffer)
#     buffer.seek(0)

#     # Save QR as File in Frappe and attach to the document
#     filename = f"{doc.name}_qr.png"
#     file_doc = save_file(
#         filename,
#         buffer,
#         doc.doctype,
#         doc.name,
#         is_private=0
#     )

#     # Save file URL to a field (Image field)
#     doc.db_set("qr_code_image", file_doc.file_url)
