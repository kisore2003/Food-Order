// Copyright (c) 2025, kisore and contributors
// For license information, please see license.txt

frappe.ui.form.on("Asset Maintenance Request", {
	refresh:function(frm) {
         if (!frm.doc.request_date) {
      frm.set_value('request_date', frappe.datetime.get_today());
         }

        if(!frm.is_new()  && frm.doc.status !== "Completed"){
                        frm.add_custom_button("Create Maintenance Task",function(){
                            frappe.call({
                                method:"food_order_app.project_orders.doctype.asset_maintenance_request.asset_maintenance_request.new_task",
                                args:{
                                    "name":frm.doc.name
                                },
                                     callback:function(r){
                frappe.msgprint("Created a task")
            }
                })
        })
        }

	},

    asset:function(frm){
        frappe.call({
            method:"food_order_app.project_orders.doctype.asset_maintenance_request.asset_maintenance_request.display",
            args:{
                asset:frm.doc.asset
            },
            callback:function(r){
                frm.set_value("asset_name",r.message.asset)
            }
        })
    },
requested_by: function(frm) {
    frappe.call({
        method: "food_order_app.project_orders.doctype.asset_maintenance_request.asset_maintenance_request.employ",
        args: {
            emp: frm.doc.requested_by
        },
        callback: function(r) {
            if (r.message) {
                frm.set_value("employee_name", r.message.employee_name);
                frm.set_value("department", r.message.department);
            }
        }
    });
},

});




