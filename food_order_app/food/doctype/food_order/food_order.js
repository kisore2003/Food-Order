// Copyright (c) 2025, kisore and contributors
// For license information, please see license.txt


frappe.ui.form.on('Child Food', { 
    qty: function (frm){
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
                // method: "frappe.client.get_value",
                method:"food_order_app.food.doctype.food_order.food_order.get_food_rate",
                args:{
                    item_code: row.d3
                },
                callback: function(r) {
                    if (r.message) {
                        frappe.model.set_value(cdt, cdn, "rate", r.message);
                    }
                }
            });
        }
    }, rate: function(frm) {
        let total_rates=0; 
        frm.doc.foods_details.forEach(function(row){
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
frappe.ui.form.on('Food Order', {
    refresh: function(frm) {
        frm.set_query("d3", "foods_details", function() {
            return {
                filters: {
                    item_group:"Food"
                }
            };
        });
    }
});
