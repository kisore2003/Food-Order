frappe.ui.form.on('Location', {
    refresh(frm) {
        console.log("aetsf")
        if (frm.doc.latitude && frm.doc.longitude) {
            setTimeout(() => {
                show_simple_map(frm);
            }, 500);
        }
    }
});

function show_simple_map(frm) {
    const wrapper = frm.fields_dict.custom_location.$wrapper;
    const lat = frm.doc.latitude;
    const lng = frm.doc.longitude;
    
    wrapper.html(`
        <iframe 
            width="100%" 
            height="300" 
            frameborder="0" 
            src="https://www.openstreetmap.org/export/embed.html?bbox=${lng-0.01},${lat-0.01},${lng+0.01},${lat+0.01}&marker=${lat},${lng}"
            style="border: 1px solid #ccc;">
        </iframe>
    `);
}