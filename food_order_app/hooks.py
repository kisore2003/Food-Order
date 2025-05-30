app_name = "food_order_app"
app_title = "food"
app_publisher = "kisore"
app_description = "task"
app_email = "123@gmail.com"
app_license = "MIT"

# Includes in <head>
# ------------------

# include js, css files in header of desk.html
# app_include_css = "/assets/food_order_app/css/food_order_app.css"
# app_include_js = "/assets/food_order_app/js/food_order_app.js"

# include js, css files in header of web template
# web_include_css = "/assets/food_order_app/css/food_order_app.css"
# web_include_js = "/assets/food_order_app/js/food_order_app.js"

# include custom scss in every website theme (without file extension ".scss")
# website_theme_scss = "food_order_app/public/scss/website"

# include js, css files in header of web form
# webform_include_js = {"doctype": "public/js/doctype.js"}
# webform_include_css = {"doctype": "public/css/doctype.css"}

# include js in page
# page_js = {"page" : "public/js/file.js"}

# include js in doctype views
# doctype_js = {"doctype" : "public/js/doctype.js"}

doctype_list_js = { 
     "Material Request":"public/js/listview.js"
     }
# doctype_tree_js = {"doctype" : "public/js/doctype_tree.js"}
# doctype_calendar_js = {"doctype" : "public/js/doctype_calendar.js"}

# Home Pages
# ----------

# application home page (will override Website Settings)
# home_page = "login"

# website user home page (by Role)
# role_home_page = {
# 	"Role": "home_page"
# }

# Generators
# ----------

# automatically create page for each record of this doctype
# website_generators = ["Web Page"]

# Jinja
# ----------

# add methods and filters to jinja environment
# jinja = {
# 	"methods": "food_order_app.utils.jinja_methods",
# 	"filters": "food_order_app.utils.jinja_filters"
# }

# Installation
# ------------

# before_install = "food_order_app.install.before_install"
# \after_install = "food_order_app.install.after_install"

# Uninstallation
# ------------

# before_uninstall = "food_order_app.uninstall.before_uninstall"
# after_uninstall = "food_order_app.uninstall.after_uninstall"

# Integration Setup
# ------------------
# To set up dependencies/integrations with other apps
# Name of the app being installed is passed as an argument

# before_app_install = "food_order_app.utils.before_app_install"
# after_app_install = "food_order_app.utils.after_app_install"

# Integration Cleanup
# -------------------
# To clean up dependencies/integrations with other apps
# Name of the app being uninstalled is passed as an argument

# before_app_uninstall = "food_order_app.utils.before_app_uninstall"
# after_app_uninstall = "food_order_app.utils.after_app_uninstall"

# Desk Notifications
# ------------------
# See frappe.core.notifications.get_notification_config

# notification_config = "food_order_app.notifications.get_notification_config"

# Permissions
# -----------
# Permissions evaluated in scripted ways

# permission_query_conditions = {
# 	"Event": "frappe.desk.doctype.event.event.get_permission_query_conditions",
# }
#
# has_permission = {
# 	"Event": "frappe.desk.doctype.event.event.has_permission",
# }

# DocType Class
# ---------------
# Override standard doctype classes

# override_doctype_class = {
# 	"ToDo": "custom_app.overrides.CustomToDo"
# }

# Document Events
# ---------------
# Hook on document methods and events

doc_events = {
  #
#   "Material Request":{
#        "on_submit":"food_order_app.mat.test"
  #  },
  "Purchase Order":{
      "on_update":"food_order_app.events.purchase_order.workflow"
  }
  
}

# Scheduled Tasks
# ---------------

#scheduler_events = {
#    "hourly": [
#        "food_order_app.mat.auto_create"
#	],
#	"all": [
 #       "food_order_app.mat.Emailcreate"
#	],
 #	"daily": [
 #		"food_order_app.tasks.daily"
 #	],
 #	"weekly": [
 #		"food_order_app.tasks.weekly"
 #	],
 #	"monthly": [
 #		"food_order_app.tasks.monthly"
 #	],
 #}

# Testing
# -------

# before_tests = "food_order_app.install.before_tests"

# Overriding Methods
# ------------------------------
#
# override_whitelisted_methods = {
# 	"frappe.desk.doctype.event.event.get_events": "food_order_app.event.get_events"
# }
#
# each overriding function accepts a `data` argument;
# generated from the base implementation of the doctype dashboard,
# along with any modifications made in other Frappe apps
override_doctype_dashboards = {
    "Task":"food_order_app.events.task.get_dash_board_data",
}

# exempt linked doctypes from being automatically cancelled
#
# auto_cancel_exempted_doctypes = ["Auto Repeat"]

# Ignore links to specified DocTypes when deleting documents
# -----------------------------------------------------------

# ignore_links_on_delete = ["Communication", "ToDo"]

# Request Events
# ----------------
# before_request = ["food_order_app.utils.before_request"]
# after_request = ["food_order_app.utils.after_request"]

# Job Events
# ----------
# before_job = ["food_order_app.utils.before_job"]
# after_job = ["food_order_app.utils.after_job"]

# User Data Protection
# --------------------

# user_data_fields = [
# 	{
# 		"doctype": "{doctype_1}",
# 		"filter_by": "{filter_by}",
# 		"redact_fields": ["{field_1}", "{field_2}"],
# 		"partial": 1,
# 	},
# 	{
# 		"doctype": "{doctype_2}",
# 		"filter_by": "{filter_by}",
# 		"partial": 1,
# 	},
# 	{
# 		"doctype": "{doctype_3}",
# 		"strict": False,
# 	},
# 	{
# 		"doctype": "{doctype_4}"
# 	}
# ]

# Authentication and authorization
# --------------------------------

# auth_hooks = [
# 	"food_order_app.auth.validate"
# ]

fixtures = [
    {'dt':'Custom Field','filters': [['module','=','food_order_app']]},
    {'dt':'Property Setter','filters': [['module','=','food_order_app']]}
    ]