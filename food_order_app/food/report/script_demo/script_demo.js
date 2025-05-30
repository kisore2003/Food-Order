// Copyright (c) 2025, kisore and contributors
// For license information, please see license.txt
/* eslint-disable */

frappe.query_reports["Script Demo"] = {
	"filters": [{
		"fieldname":"customer_name",
		"label":__("Name"),
		"fieldtype":"Data"
	},{
		"fieldname":"document",
		"label":__("Document"),
		"fieldtype":"Link",
		"options":"Food Order"
	},
	{
		"fieldname":"from_date",
		"label":__("From Date"),
		"fieldtype":"Date"
	},{
		"fieldname":"end_date",
		"label":__("End Date"),
		"fieldtype":"Date"
	},{
		"fieldname":"status",
		"label":__("Status"),
		"fieldtype":"Select",
		"options":[
			"",
			"Started",
			"Not Started",
			"Completed"
		],
		"default":"Started"
	},{
		"fieldname":"total_rates",
		"label":__("Total Rates"),
		"fieldtype":"Data",
	},
	     {
            fieldname: "check",
            label: __("Check"),
            fieldtype: "Check",
            default: 0
        }
	],
	
};
