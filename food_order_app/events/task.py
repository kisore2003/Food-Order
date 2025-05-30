import frappe
from frappe import _

def get_dash_board_data(data):
    data["transactions"].append({
        "label": _("Purchase Orders"),
        "items": [
            {
                "type": "route",
                "name": "Purchase Orders with Item Filter",
                "label": _("Purchase Orders (filtered by items)"),
                "route": "/app/purchase-order",
                "route_options": {
                    "filters": [
                        ["items", "item_code", "!=", ""]
                    ]
                }
            }
        ]
    })
    return data
