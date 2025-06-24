// Copyright (c) 2025, kisore and contributors
// For license information, please see license.txt

 frappe.ui.form.on("Job Estimation", {
	refresh:function(frm) {
        if(frm.is_new){
            frm.set_value("estimation_date",frappe.datetime.get_today())   
        }
        if(!frm.is_new()){
            frm.add_custom_button("Create Quotation",function(){
                frappe.call({
                    method:"food_order_app.project_orders.doctype.job_estimation.job_estimation.crt_quotation",
                    args:{
                        name:frm.doc.name
                    },
                    callback:function(r){
    //                         const linkHtml = `<a href="/app/quotation/${r.message}" target="_blank">${r.message}</a>`;
    //                         frappe.msgprint({
    //                              title: __('Quotation Created'),
    //                              message: linkHtml,
    //                              indicator: 'green'
    // });
    frappe.set_route("Form","Quotation",r.message)
                    }
                })
            })
        }
	},
 });
  frappe.ui.form.on("Estimation Details", {
    item:function(frm,cdt,cdn){
        details(frm,cdt,cdn)
    },
    qty:function(frm,cdt,cdn){
        details(frm,cdt,cdn)
    },
    rate:function(frm,cdt,cdn){
        details(frm,cdt,cdn)
    },
    estimation_remove:function(frm){
        delet(frm)
    }

 });

 function details(frm,cdt,cdn){
    let s=locals[cdt][cdn]
    let amount=s.qty*s.rate
    frappe.model.set_value(cdt,cdn,"amount",amount)
    if(!s.item){
    frappe.model.set_value(cdt,cdn,"amount" || 0)
    frappe.model.set_value(cdt,cdn,"qty" || 0)
    frappe.model.set_value(cdt,cdn,"rate" || 0)  
    }
    let total_material_cost = 0;
    let total_labour_cost = 0;
    let total_service_cost = 0;

    frm.doc.estimation.forEach(function (row) {
        if (row.item_group === "Material") {
            total_material_cost += row.amount || 0;
             }else if (row.item_group === "Labour") {
            total_labour_cost += row.amount || 0;
        } else if (row.item_group === "Service") {
            total_service_cost += row.amount || 0;
        }
    });
    frm.set_value("total_material_cost", total_material_cost);
    frm.set_value("total_labour_cost", total_labour_cost);
    frm.set_value("total_service_cost", total_service_cost);

    let total=frm.doc.total_material_cost+frm.doc.total_labour_cost+frm.doc.total_service_cost
    frm.set_value("total_estimated_cost",total || 0)
 }

 function delet(frm){
    
    let total_material_cost = 0;
    let total_labour_cost = 0;
    let total_service_cost = 0;

    frm.doc.estimation.forEach(function (row) {
        if (row.item_group === "Material") {
            total_material_cost += row.amount || 0;
        } else if (row.item_group === "Labour") {
            total_labour_cost += row.amount || 0;
        } else if (row.item_group === "Service") {
            total_service_cost += row.amount || 0;
        }
    });
    frm.set_value("total_material_cost", total_material_cost);
    frm.set_value("total_labour_cost", total_labour_cost);
    frm.set_value("total_service_cost", total_service_cost);

    
    let total=frm.doc.total_material_cost+frm.doc.total_labour_cost+frm.doc.total_service_cost
    frm.set_value("total_estimated_cost",total || 0)

 }

 