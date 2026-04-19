# GHL AI Workflow Builder Prompt — Workflow 2

Copy and paste this into the GHL AI Workflow Builder:

---

Build a workflow called "RG | Event | ACCOM Segment Follow-Up" with the following specifications:

**Trigger:** Contact Tag Added = "rg_accom_nurtured"

**Workflow Settings:**
- Stop on response: ON
- Allow re-entry: OFF
- From Name: Sean Shallis

**Steps in order:**

Step 1: If/Else condition — check if contact has tag "RG_Manual_Owned"
- If YES → End workflow (stop/exit)
- If NO → Continue to next step

Step 2: Wait 1 day

Step 3: Time gate — only continue between 8AM and 9PM Eastern time

Step 4: If/Else condition — check if contact has tag "rg_stage_buyer"
- If YES → Send SMS:
"{{contact.first_name}}, quick note from Sean at U.S. Bank. Physician loan programs can get you into a home with $0 down and no PMI — even with student loans.

Want me to run the numbers? Takes 5 min: https://link.seanshallis.com/widget/bookings/usb_20m"
- Then skip to the end (do not check other segments)

Step 5: If/Else condition — check if contact has tag "rg_stage_shopper"
- If YES → Send SMS:
"{{contact.first_name}}, Sean from U.S. Bank here. If you're actively shopping, the difference between the right and wrong rate strategy can be $200-$400/month on a physician loan.

Let's make sure you're not leaving money on the table: https://link.seanshallis.com/widget/bookings/usb_20m"
- Then skip to the end

Step 6: If/Else condition — check if contact has tag "rg_stage_optimizer"
- If YES → Send SMS:
"{{contact.first_name}}, Rosie here 🐶 Just a heads up — I'm now monitoring your rate daily. If a savings window opens, you'll be the first to know.

In the meantime, Sean can run a free savings analysis on your current mortgage: https://link.seanshallis.com/widget/bookings/usb_20m"

Step 7: Create a task assigned to Sean Shallis
- Title: "ACCOM Follow-Up Call — {{contact.first_name}} {{contact.last_name}}"
- Due date: Tuesday April 22, 2026 at 1:30 PM Eastern
- Description: "Follow up from ACCOM conference. Check segment tags for context."

Save as DRAFT — do not publish.
