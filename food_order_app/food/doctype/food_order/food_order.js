// Copyright (c) 2025, kisore and contributors
// For license information, please see license.txt


frappe.ui.form.on('Child Food', { 
    qty: function (frm) {
        let total_quantity = 0;

        frm.doc.foods_details.forEach(function (row) {
            total_quantity += row.qty
        });

        frm.set_value('total_quantity', total_quantity);
    },
    foods_details_remove:function(frm){
         let total_quantity = 0;

        frm.doc.foods_details.forEach(function (row) {
            total_quantity += row.qty || 0; 
        });

        frm.set_value('total_quantity', total_quantity);
    }
});