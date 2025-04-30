// Copyright (c) 2025, kisore and contributors
// For license information, please see license.txt

frappe.ui.form.on('Project Order', {
    refresh: function(frm) {
        frm.add_custom_button('Save Here', function() {
            let d = new frappe.ui.Dialog({
                title: "Welcome",
                fields: [
                    {
                        label: "Series",
                        fieldname: "series",
                        fieldtype: "Data",
                        read_only:1,
                        default:frm.doc.series
                    },
                    {
                        label: "Project Name",
                        fieldname: "project_name",
                        fieldtype: "Data",
                        read_only:1,
                        default:frm.doc.project_name
                    },
					{
                        label: "Status",
                        fieldname: "status",
                        fieldtype: "Select",
                        read_only:1,
						options:["Open","Completed","Cancelled"],
                        default:"Open"
                    },
					{
                        label: "Project Type",
                        fieldname: "project_type",
                        fieldtype: "Select",
                        read_only:1,
						options:["External","Internal","Other"],
                        default:frm.doc.project_type
                    },
					{
                        label: "Is Active",
                        fieldname: "is_active",
                        fieldtype: "Select",
                        read_only:1,
						options:["Yes","No"],
                        default:frm.doc.is_active
                    },
					{
                        label: "% Complete Method",
                        fieldname: "complete_method",
                        fieldtype: "Select",
                        read_only:1,
						options:["Manual","Task Completion","Task Progress","Task Weight"],
                        default:frm.doc._complete_method
                    }
					,{
						fieldname:"column_break_2s21w",
						fieldtype:"Column Break"
					},{
						label: "% From Template",
                        fieldname: "from_template",
                        fieldtype: "Link",
                        read_only:1,
                        default:frm.doc.from_template
					},
                    {
                        label: "Expected Start Date",
                        fieldname: "expected_start_date",
                        fieldtype: "Date",
                        read_only:1,
                        default:frm.doc.expected_start_date
                    },
                    {
                        label: "Expected End Date",
                        fieldname: "expected_end_date",
                        fieldtype: "Date",
                        read_only:1,
                        default:frm.doc.expected_end_date
                    },
                    {
                        label: "Priority",
                        fieldname: "priority",
                        fieldtype: "Select",
                        read_only:1,
                        options:["High","Low","Medium"],
                        default:frm.doc.priority
                    },
                    {
                        label: "Department",
                        fieldname: "department", 
                        fieldtype: "Select",
                        read_only:1,
                        options:["Accounts","Sales","Hr","Purchase","Production"],
                        default:frm.doc.department
                    },
                    {
                        label:"Customer Details",
						fieldname:"column_break_2s21w",
						fieldtype:"Section Break",
                        read_only:1,
                        collapsible: 1
					},{
						fieldname:"column_break_2s21w",
						fieldtype:"Column Break"
					},
                    {
						label: "Customer",
                        fieldname: "customer",
                        read_only:1,
                        fieldtype: "Link",
                        options:"Customer",
                        default:frm.doc.customer
					},{
						fieldname:"column_break_2s21w",
						fieldtype:"Column Break"
					},{
						label: "Sales Order",
                        fieldname: "sales_order",
                        fieldtype: "Link",
                        options:"Sales Order",
                        read_only:1,
                        default:frm.doc.sales_order
					},{
                        label:"Notes",
						fieldname:"column_break_2s21w",
						fieldtype:"Section Break",
                        read_only:1,
                        collapsible: 1
					},
                    {
                        label:"Notes",
                        fieldname:"notes",
                        read_only:1,
                        fieldtype:"Text Editor",
                        default:frm.doc.notes
                    }

                ],
                primary_action_label: "Submit",
                primary_action(values) {
                    frappe.db.insert({
                        doctype: "Project",
                        series:values.naming_series,
                        project_name: values.project_name,
                        status: values.status,
                        project_type: values.project_type,
                        is_active: values.is_active,
                        percent_complete_method: values.complete_method,
                        from_template: values.from_template,
                        expected_start_date: values.expected_start_date,
                        expected_end_date: values.expected_end_date,
                        priority: values.priority,
                        department: values.department,
                        customer: values.customer,
                        sales_order: values.sales_order,
                        notes: values.notes

                    }).then(doc=>{
                        frappe.msgprint(`Project ${doc.name}created successfully.`);
                        d.hide();
                    })
                }
            });
            d.show();
        });
    }
});

