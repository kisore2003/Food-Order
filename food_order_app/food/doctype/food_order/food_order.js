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
    },
    d3: function(frm, cdt, cdn) {
        let row = locals[cdt][cdn]; 
        if (row.d3) {
            frappe.call({
                method: "frappe.client.get_value",
                args: {
                    doctype: "Item",  
                    filters: { name: row.d3 }, 
                    fieldname: "custom_food_rate" 
                },
                callback: function(r) {
                    if (r.message) {
                        frappe.model.set_value(cdt, cdn, "rate", r.message.custom_food_rate);
                    }
                }
            });
        }
    },
    rate: function(frm) {
        let total_rates=0; 
        frm.doc.foods_details.forEach(function(row) {
            let r = parseFloat(row.rate);
            if (!isNaN(r)) {
                total_rates += r;
            }
        });
        frm.set_value("total_rates", total_rates);
},
foods_details_remove:function(frm){
        let total_rates = 0; 
        frm.doc.foods_details.forEach(function(row) {
            let rate = parseFloat(row.rate);  
            if (!isNaN(rate)) {
                total_rates += rate||0 
            }
        });


        frm.set_value("total_rates", total_rates);

    }
});

