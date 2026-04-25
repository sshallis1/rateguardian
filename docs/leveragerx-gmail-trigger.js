/**
 * Google Apps Script — LeverageRX Auto-Intake Trigger
 *
 * HOW TO INSTALL:
 * 1. Go to https://script.google.com
 * 2. Create new project, name it "LeverageRX Auto-Intake"
 * 3. Paste this entire file into Code.gs
 * 4. Replace WEBHOOK_SECRET below with your CRON_SECRET from Vercel
 * 5. Run > checkForNewLeads() once to authorize Gmail permissions
 * 6. Triggers > Add trigger:
 *    - Function: checkForNewLeads
 *    - Event source: Time-driven
 *    - Type: Minutes timer
 *    - Interval: Every 5 minutes
 * 7. Save
 *
 * This script checks Gmail every 5 minutes for unread LeverageRX emails,
 * parses the lead data, and POSTs it to the Vercel intake endpoint.
 * The email is then marked as read so it's not processed again.
 */

const WEBHOOK_URL = "https://shallis-site.vercel.app/api/rg/intake/leveragerx";
const WEBHOOK_SECRET = "9138ec95d26c1a7f8e6307efbd682d6d38e1a94f9dddb627a339770d7dcec729"; // Replace with CRON_SECRET from .env.local
const GMAIL_QUERY = 'from:hello@mail.leveragerx.com subject:"New Mortgage Information Request" is:unread';

function checkForNewLeads() {
  const threads = GmailApp.search(GMAIL_QUERY, 0, 10);

  if (threads.length === 0) {
    Logger.log("No new LeverageRX leads");
    return;
  }

  const leads = [];

  for (const thread of threads) {
    const messages = thread.getMessages();

    for (const message of messages) {
      if (message.isUnread()) {
        const subject = message.getSubject();
        const body = message.getPlainBody();

        const lead = parseLeadEmail(subject, body);

        if (lead) {
          leads.push(lead);
          Logger.log("Parsed lead: " + lead.firstName + " " + lead.lastName + " (" + lead.email + ")");
        } else {
          Logger.log("Could not parse email: " + subject);
        }

        // Mark as read immediately to prevent re-processing
        message.markRead();
      }
    }
  }

  if (leads.length === 0) {
    Logger.log("No parseable leads found");
    return;
  }

  // Send all leads to Vercel endpoint
  const options = {
    method: "post",
    contentType: "application/json",
    headers: {
      "x-cron-secret": WEBHOOK_SECRET
    },
    payload: JSON.stringify({ leads: leads }),
    muteHttpExceptions: true
  };

  try {
    const response = UrlFetchApp.fetch(WEBHOOK_URL, options);
    const result = JSON.parse(response.getContentText());
    Logger.log("Intake result: " + JSON.stringify(result));

    if (result.errors && result.errors.length > 0) {
      Logger.log("Errors: " + JSON.stringify(result.errors));
    }
  } catch (error) {
    Logger.log("ERROR sending to webhook: " + error.toString());
    // Don't re-mark as unread — the lead data was parsed, just the webhook failed
    // Next manual /check-leveragerx will catch it via portal scrape
  }
}

function parseLeadEmail(subject, body) {
  // Extract from subject: "New Mortgage Information Request – So Young Shin in Naperville, IL"
  var subjectMatch = subject.match(/New Mortgage Information Request\s*[–—-]\s*(.+?)\s+in\s+(.+?),\s*(\w{2})\s*$/);

  // Parse body fields
  var nameMatch = body.match(/Name\s*\n\s*\n\s*(.+)/);
  var locationMatch = body.match(/Location\s*\n\s*\n\s*(.+?),\s*(\w{2})/);
  var emailMatch = body.match(/Email\s*\n\s*\n\s*([\w.+\-]+@[\w.\-]+\.\w+)/);
  var phoneMatch = body.match(/Phone\s*\n\s*\n\s*\(?(\d{3})\)?\s*(\d{3})[\-.\)\s]*(\d{4})/);
  var loanMatch = body.match(/Loan Amount\s*\n\s*\n\s*\$?([\d,]+)/);
  var downMatch = body.match(/Down Payment\s*\n\s*\n\s*\$?([\d,]+)/);

  var fullName = (nameMatch && nameMatch[1]) ? nameMatch[1].trim() :
                 (subjectMatch && subjectMatch[1]) ? subjectMatch[1].trim() : null;

  if (!fullName || !emailMatch || !emailMatch[1]) return null;

  var nameParts = fullName.split(/\s+/);
  var lastName = nameParts.pop() || "";
  var firstName = nameParts.join(" ") || "";

  return {
    firstName: firstName,
    lastName: lastName,
    city: (locationMatch && locationMatch[1]) ? locationMatch[1].trim() :
          (subjectMatch && subjectMatch[2]) ? subjectMatch[2].trim() : "",
    state: (locationMatch && locationMatch[2]) ? locationMatch[2].trim() :
           (subjectMatch && subjectMatch[3]) ? subjectMatch[3].trim() : "",
    email: emailMatch[1].trim(),
    phone: phoneMatch ? "+1" + phoneMatch[1] + phoneMatch[2] + phoneMatch[3] : "",
    loanAmount: (loanMatch && loanMatch[1]) ? loanMatch[1].replace(/,/g, "") : "",
    downPayment: (downMatch && downMatch[1]) ? downMatch[1].replace(/,/g, "") : ""
  };
}

/**
 * Manual test function — run this to test with a specific email
 */
function testWithLatestEmail() {
  var threads = GmailApp.search('from:hello@mail.leveragerx.com subject:"New Mortgage Information Request"', 0, 1);
  if (threads.length === 0) {
    Logger.log("No LeverageRX emails found");
    return;
  }

  var message = threads[0].getMessages()[0];
  var lead = parseLeadEmail(message.getSubject(), message.getPlainBody());
  Logger.log("Parsed: " + JSON.stringify(lead));
}
