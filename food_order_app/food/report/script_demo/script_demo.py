# Copyright (c) 2025, kisore and contributors
# For license information, please see license.txt

import frappe
from frappe import _


def execute(filters=None):
    if not filters:
        filters = {}
    columns = get_columns()
    data = get_cs_data(filters)
    charts=get_chart_data(data)
    
    return columns, data,None,charts


def get_columns():
    return [
        {
            "fieldname": "customer_name",
            "label": _("Name"),
            "fieldtype": "Data",
            "width":145
        },
        {
            "fieldname": "date",
            "label": _("Date"),
            "fieldtype": "Date",
            "width":145
        },
        {
            "fieldname": "status",
            "label": _("Status"),
            "fieldtype": "Data",
           "width":145
        },{
            "fieldname":"name",
            "label":_("Doc Id"),
            "fieldtype":"Data",
            "width":145
		},{
            "fieldname":"d3",
            "label":_("Food"),
            "fieldtype":"Data",
            "width":145
		},{
            "fieldname":"qty",
            "label":_("Quantity"),
            "fieldtype":"Data",
            "width":145
		},{
            "fieldname":"rate",
            "label":_("Rate"),
            "fieldtype":"Data",
            "width":145
            },{
                "fieldname":"total_rates",
                "label":_("Total Rate"),
                "fieldtype":"Data",
                "width":145
			}
    ]

def get_cs_data(filters):
    customer_name = filters.get("customer_name")
    status = filters.get("status")
    from_date = filters.get("from_date")
    to_date = filters.get("end_date")
    food=filters.get('document')
    tot=filters.get('total_rates')
    check=filters.get('check')

    conditions = " "
    values = {}

    if customer_name:
        conditions += " AND s.customer_name = %(customer_name)s"
        values["customer_name"] = customer_name
    if from_date:
        conditions += " AND s.date >= %(from_date)s"
        values["from_date"] = from_date

    if to_date:
        conditions += " AND s.date <= %(to_date)s"
        values["to_date"] = to_date
    if status:
        conditions += " AND status = %(status)s"
        values["status"] = status
    if food:
        conditions += " AND s.name = %(food)s"
        values["food"] = food
    if tot:
        conditions+="AND s.total_rates =%(tot)s"
        values["tot"]=tot
    if check:
        pass
  


    query = f"""
        SELECT s.customer_name,s.date,
        e.d3,e.qty,e.rate,s.name,s.total_rates,s.status
        FROM `tabFood Order` s
        LEFT JOIN `tabChild Food` e ON e.parent=s.name
        WHERE 1=1 {conditions}
        ORDER BY date DESC 
    """
    return frappe.db.sql(query, values, as_dict=True)



def get_chart_data(data):
    labels = []
    values = []
    customer_totals = {}

    for row in data:
        customer = row["customer_name"]
        total = float(row["total_rates"] or 0)
        customer_totals[customer] = customer_totals.get(customer, 0) + total

    for customer, total in customer_totals.items():
        labels.append(customer)
        values.append(total)
    return {
        "data": {
            "labels": labels,
            "datasets": [
                {
                    "name": "Total Rates",
                    "values": values
                }
            ]
        },
        "type": "bar",  # or "line", "pie"
        "colors": ["#7cd6fd"]
    }
