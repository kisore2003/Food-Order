// Copyright (c) 2025, kisore and contributors
// For license information, please see license.txt

frappe.ui.form.on('Cooking Court', {
    status: function(frm) {
        const status = frm.doc.status;

        frm.doc.confirm_order.forEach(function(row) {
            frappe.model.set_value(row.doctype, row.name, 'status', status);
        });

        frm.fields_dict.confirm_order.grid.update_docfield_property('status', 'read_only', 1);

        frm.refresh_field('confirm_order');
    }
});



