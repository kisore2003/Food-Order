import frappe
from frappe import _
def get_dashboard_data(data):
    data["transactions"].extend([
        {
            "label": _("Purchase"),
            "items": ["Purchase Order", "Purchase Invoice"]
        }
    ])

    data["fieldname"] = "project"


    data.setdefault("non_standard_fieldnames",{})
    data["non_standard_fieldnames"].update({
        "Purchase Order": "project",
        "Purchase Invoice": "project"
    })

    return data

    