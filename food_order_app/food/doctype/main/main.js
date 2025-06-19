let liveTimerInterval = null;

frappe.ui.form.on("Main", {
    refresh(frm) {
        if (liveTimerInterval) {
            clearInterval(liveTimerInterval);
            liveTimerInterval = null;
        }
        frm.clear_custom_buttons();
        frm.trigger("add_timer_buttons");

        setTimeout(() => frm.trigger("inject_timer_display"), 300);
    },

    add_timer_buttons(frm) {
        if (frm.doc.end_time) return;

        if (frm.doc.on_pause) {
            frm.add_custom_button("Resume Job", () => frm.events.resume_job(frm)).addClass("btn-primary");
        } else if (!frm.doc.start_time) {
            frm.add_custom_button("Start Job", () => frm.events.start_job(frm)).addClass("btn-primary");
        } else {
            frm.add_custom_button("Pause Job", () => frm.events.pause_job(frm));
            frm.add_custom_button("Complete Job", () => frm.events.complete_job(frm)).addClass("btn-success");
        }
    },

    start_job(frm) {
        const now = frappe.datetime.now_datetime();
        frm.set_value({
            start_time: now,
            custom_current_secounds: 0,
            end_time: null,
            on_pause: 0
        }).then(() => {
            frappe.show_alert(`✅ Job started at ${now}`);
            frm.save().then(() => frm.trigger("refresh"));
        });
    },

    pause_job(frm) {
        if (liveTimerInterval) {
            clearInterval(liveTimerInterval);
            liveTimerInterval = null;
        }

        const now = moment();
        const started = moment(frm.doc.start_time);
        const already = frm.doc.custom_current_secounds || 0;
        const additional = now.diff(started, "seconds");

        frm.set_value({
            custom_current_secounds: already + additional,
            start_time: null,
            on_pause: 1
        }).then(() => {
            frappe.show_alert("⏸ Job paused");
            frm.save().then(() => frm.trigger("refresh"));
        });
    },

    resume_job(frm) {
        const now = frappe.datetime.now_datetime();
        frm.set_value({
            start_time: now,
            on_pause: 0
        }).then(() => {
            frappe.show_alert("▶️ Job resumed");
            frm.save().then(() => frm.trigger("refresh"));
        });
    },
complete_job(frm) {
    const now = frappe.datetime.now_datetime();
    let totalSeconds = frm.doc.custom_current_secounds || 0;

    if (frm.doc.start_time) {
        totalSeconds += moment(now).diff(moment(frm.doc.start_time), "seconds");
    }

    const h = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
    const m = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
    const s = String(totalSeconds % 60).padStart(2, '0');

    frm.set_value({
        duration: `${h}:${m}:${s}`,
        end_time: now,
        start_time: null,
        on_pause: 0,
        custom_current_secounds: totalSeconds
    }).then(() => {
        if (liveTimerInterval) clearInterval(liveTimerInterval);
        frappe.show_alert("✅ Job completed");
        frm.save().then(() => frm.trigger("refresh"));
    });
}
,

    inject_timer_display(frm) {
        $("#live-timer-display").remove();
        if (frm.doc.__islocal) return;

        const timerHTML = `
            <div id="live-timer-display" style="
                font-weight:bold;
                margin:0px 13px 0px 2px;
                color:#545454;
                font-size:18px;
                display:inline-block;
                vertical-align:text-bottom;
            ">
                00:00:00
            </div>
        `;
        frm.toolbar.page.add_inner_message(timerHTML);

        const paused = frm.doc.on_pause;
        const startTime = frm.doc.start_time ? moment(frm.doc.start_time) : null;
        const totalSeconds = frm.doc.custom_current_secounds || 0;

        if (paused || !startTime || !startTime.isValid()) {
            const h = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
            const m = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
            const s = String(totalSeconds % 60).padStart(2, '0');
            $("#live-timer-display").text(paused ? `⏸ ${h}:${m}:${s}` : `${h}:${m}:${s}`);
            return;
        }

        if (liveTimerInterval) clearInterval(liveTimerInterval);

        liveTimerInterval = setInterval(() => {
            const now = moment();
            const elapsed = now.diff(startTime, "seconds");
            const combined = totalSeconds + elapsed;

            const h = String(Math.floor(combined / 3600)).padStart(2, '0');
            const m = String(Math.floor((combined % 3600) / 60)).padStart(2, '0');
            const s = String(combined % 60).padStart(2, '0');

            $("#live-timer-display").text(`⏱ ${h}:${m}:${s}`);
        }, 100);  // <- FIXED TO 1000ms
    },

    onload(frm) {
        if (liveTimerInterval) {
            clearInterval(liveTimerInterval);
            liveTimerInterval = null;
        }
    }
});

frappe.ui.form.on('Main', {
    refresh: function(frm) {
        if (!frm.fields_dict.notes_html) {
            console.warn("notes_html field not found.");
            return;
        }

            // Clear wrapper
            $(frm.fields_dict.notes_html.wrapper).empty();

            // Initialize CRMNotes
            const crm_notes = new erpnext.utils.CRMNotes({
                frm: frm,
                notes_wrapper: $(frm.fields_dict.notes_html.wrapper),
            });
            crm_notes.refresh();
        //});
    }
});
