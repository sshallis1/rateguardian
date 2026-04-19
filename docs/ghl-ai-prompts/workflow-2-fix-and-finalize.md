# GHL AI Prompt — Fix & Finalize Workflow 2

Copy and paste this into the GHL AI Workflow chat:

---

Fix and finalize this workflow. Here's what needs to change:

**1. Remove the current condition** that checks for rg_lifecycle_prequal, rg_lifecycle_shopping, and rg_lifecycle_monitoring. Those tags don't exist. Replace with the correct tags below.

**2. Add a Manual Owned gate as the first step (before the wait):**
- If/Else: Contact has tag "RG_Manual_Owned"
- If YES → End workflow
- If NO → Continue

**3. Keep the 1 day wait.**

**4. Add a time gate after the wait:**
- Only continue between 8AM and 9PM Eastern time

**5. Create three separate If/Else branches checked in order:**

**Branch A — Buyer:**
- If contact has tag "rg_stage_buyer" → Send SMS:
"{{contact.first_name}}, quick note from Sean at U.S. Bank. Physician loan programs can get you into a home with $0 down and no PMI — even with student loans.

Want me to run the numbers? Takes 5 min: https://link.seanshallis.com/widget/bookings/usb_20m"

**Branch B — Shopper:**
- If contact has tag "rg_stage_shopper" → Send SMS:
"{{contact.first_name}}, Sean from U.S. Bank here. If you're actively shopping, the difference between the right and wrong rate strategy can be $200-$400/month on a physician loan.

Let's make sure you're not leaving money on the table: https://link.seanshallis.com/widget/bookings/usb_20m"

**Branch C — Optimizer:**
- If contact has tag "rg_stage_optimizer" → Send SMS:
"{{contact.first_name}}, Rosie here 🐶 Just a heads up — I'm now monitoring your rate daily. If a savings window opens, you'll be the first to know.

In the meantime, Sean can run a free savings analysis on your current mortgage: https://link.seanshallis.com/widget/bookings/usb_20m"

**6. After all branches converge, add these final steps:**

- Create a task assigned to Sean Shallis
  - Title: "ACCOM Follow-Up Call — {{contact.first_name}} {{contact.last_name}}"
  - Due date: Tuesday April 22, 2026 at 1:30 PM Eastern
  - Description: "Follow up from ACCOM conference. Check segment tags for context."

- Add tag "rg_accom_segment_sent" to the contact

**7. Workflow settings:**
- Stop on response: ON
- Allow re-entry: OFF

Keep as DRAFT — do not publish.
