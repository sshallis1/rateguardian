# GHL AI Prompt — Rebuild Workflow 2 from Scratch

Copy and paste this into the GHL AI Workflow Builder:

---

Build a new workflow from scratch called "RG | Event | ACCOM Segment Follow-Up"

**Trigger:** Contact Tag Added = "rg_accom_nurtured"

**Settings:**
- Stop on response: ON
- Allow re-entry: OFF

**Build these steps in exact order:**

**Step 1:** If/Else — Contact has tag "RG_Manual_Owned"
- YES branch: End workflow / stop
- NO branch: Continue to Step 2

**Step 2:** Wait 1 day

**Step 3:** If/Else — Contact has tag "rg_stage_buyer"
- YES branch: Send SMS with this exact text:
"{{contact.first_name}}, quick note from Sean at U.S. Bank. Physician loan programs can get you into a home with $0 down and no PMI — even with student loans.

Want me to run the numbers? Takes 5 min: https://link.seanshallis.com/widget/bookings/usb_20m"
- NO branch: Continue to Step 4

**Step 4:** If/Else — Contact has tag "rg_stage_shopper"
- YES branch: Send SMS with this exact text:
"{{contact.first_name}}, Sean from U.S. Bank here. If you're actively shopping, the difference between the right and wrong rate strategy can be $200-$400/month on a physician loan.

Let's make sure you're not leaving money on the table: https://link.seanshallis.com/widget/bookings/usb_20m"
- NO branch: Continue to Step 5

**Step 5:** If/Else — Contact has tag "rg_stage_optimizer"
- YES branch: Send SMS with this exact text:
"{{contact.first_name}}, Rosie here 🐶 Just a heads up — I'm now monitoring your rate daily. If a savings window opens, you'll be the first to know.

In the meantime, Sean can run a free savings analysis on your current mortgage: https://link.seanshallis.com/widget/bookings/usb_20m"
- NO branch: Continue to Step 6

**Step 6:** Create Task
- Assigned to: Sean Shallis
- Title: "ACCOM Follow-Up Call — {{contact.first_name}} {{contact.last_name}}"
- Due date: Tuesday April 22, 2026 at 1:30 PM Eastern
- Description: "Follow up from ACCOM conference. Check segment tags for context."

**Step 7:** Add tag "rg_accom_segment_sent" to the contact

**IMPORTANT:** Every If/Else MUST have an action inside BOTH the YES and NO branches. The YES branch gets the SMS send action. The NO branch continues to the next step. Do not leave any branch empty.

Save as DRAFT — do not publish.
