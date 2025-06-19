// frappe.ui.form.on('Task', {
//     refresh(frm) {
//         // Remove previous handler on elements with data-doctype="Purchase Order"
//       //  $(document).off('click', '[data-doctype="Purchase Order"]');

//         $(document).on('click', '[data-doctype="Purchase Order"], [data-doctype="Purchase Invoice"]', function (e) {
         
//             const doctype = $(this).attr('data-doctype');
//             const project = frm.doc.project;

//             if (["Purchase Invoice", "Purchase Order"].includes(doctype)) {
//                 console.log("test2");

//                 if (project) {
//                     e.preventDefault();
//                     frappe.set_route('List', doctype, { project: project });
//                 } else {
//                     frappe.msgprint("No project linked to this Task.");
//                 }
//             }
//         });
//     }
// });
