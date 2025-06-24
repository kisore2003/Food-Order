// Copyright (c) 2025, kisore and contributors
// For license information, please see license.txt

frappe.ui.form.on("Room Booking", {
	refresh:function(frm) {
        if(!frm.doc.time_slot){
               frm.set_value("time_slot",frappe.datetime.get_today())
        }
	},
});
