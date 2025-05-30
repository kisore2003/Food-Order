frappe.listview_settings['Material Request'] = {
    fields:['material_request_type','warehoue','name'],
    button:{
        show:function(doc){
            return '<i class="fa fa-edit"></i> Update'
        },
        get_label:function(doc){
            return __('<i class="fa fa-edit"></i> Update',null,'Add')
        },
        get_description:function(doc){
           return  __("click to edit the"+doc.name)
        },
        action:function(doc){
            frappe.db.get_doc('Material Request',doc.name).then(add=>{
                   const warehouse = add.items?.[0]?.warehouse ?? '';
                let s=new frappe.ui.Dialog({
                    title:"Welcome",
                    fields:[{
                        "label":"Purpose",
                        "fieldname":"material_request_type",
                        "fieldtype":"Select",
        "options": ["Material Transfer","Manufacture","Purchase","Material Issue","Customer Provided"],

                        default:add.material_request_type
                    },{
                        "label":"Supplier",
                        "fieldname":"set_warehoue",
                        "fieldtype":"Link",
                        "options":"Supplier",
                        default:"xyz"
                    },
                    {    "label":"Transaction Date",
                        "fieldname":"transaction_date",
                        "fieldtype":"Date",
                    
                        default:add.transaction_date}
                    ,{
                        "label":"Items",
                        "fieldname":"items",
                        "fieldtype":"Table",
                        in_list_view: 1,
                        in_place_edit: true,
                        data:(add.items||[]).map(row=>({
                            item_code:row.item_code,
                            schedule_date:row.schedule_date,
                            qty:row.qty
                        })),
                            fields:[
                                {
                                "label":"Items",
                                "fieldname":"item_code",
                                "fieldtype":"Link",
                                "options":"Item",
                                in_list_view: 1
                                },
                                {
                                "label":"Required By",
                                "fieldname":"schedule_date",
                                "fieldtype":"Date",
                            
                                in_list_view: 1
                                },
                                {
                                "label":"Quantity",
                                "fieldname":"qty",
                                "fieldtype":"Float",
                                in_list_view: 1
                                },
                            ]
                    }
                ],
                    primary_action_label:"Create Po",
                    primary_action(value){
                  frappe.call({
                    method:"frappe.client.insert",
                    args:{
                        doc:{
                            doctype:"Purchase Order",
                            material_request_type:value.material_request_type,
                            supplier:value.set_warehoue,
                            transaction_date:value.transaction_date,
                      items: value.items.map(row => ({
                                        item_code: row.item_code,
                                        qty: row.qty,
                                        schedule_date: row.schedule_date
                                    }))           },
                                
                    },
                    callback:function(r){
                    if (!r.exc) {
    const linkHtml = `<a href="/app/purchase-order/${r.message.name}" target="_blank">${r.message.name}</a>`;
    frappe.msgprint({
        title: __('Purchase Order Created'),
        message: linkHtml,
        indicator: 'green'
    });
}

                    }
                  })
                  s.hide()                
                    },
                    secondary_action_label:"Add",
                    secondary_action:function(values){
                        frappe.msgprint("Hii")
                    }
                })
                s.show()
            })
            
        }
    },

    get_indicator:function(doc){
        return [doc.name,'blue']
    }
};
