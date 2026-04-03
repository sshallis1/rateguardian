// Rate Guardian — GHL Custom Field ID Registry
// Maps internal GHL field IDs to human-readable names
// Source: GHL API /v1/custom-fields/ — pulled 2026-03-22

export const GHL_FIELD_MAP: Record<string, string> = {
  // Rate Guardian Profile
  "rTKUiJN4M4BL1BDuU8Ju": "RG_Persona_Type",
  "mP7G7Z9FTgSerGRMMfoQ": "RG_Occupation_Category",
  "KTz1NDS7TieF7WrViG8w": "RG_Lead_Source",
  "6LBWcNH19vj4RNM4A5T1": "RG_Where_In_Process",
  "CRciq7XLebkSpF2ZADI7": "RG_Lead_Status",
  "G49CfbJvYkT71Ua1S2Fi": "RG_Disposition",

  // Rosie Engine
  "XuEKFxLnlfhpGbrt5SR2": "RG_Rosie_Status",
  "Fzlge6jk79qgs9kJuZOi": "RG_Rosie_Path",
  "LcxnpBi3wTjGzRMyEjoO": "RG_Rosie_Error",
  "EIDTtj0lCZOFDtcFlPQI": "RG_Rosie_Failure_Reason",
  "KjtpagYn2va2taGs6pxC": "RG_Rosie_Reason",
  "2NgrcCzoBVrcynyr4D80": "RG_Rosie_OptIn",
  "0q1WiDMGnUSBdCxOQo12": "RG_Rosie_Last_A",
  "bvU5rFIqvZVi6phbBwIo": "RG_Rosie_Last_Q",
  "8KUmG2eqVgOcQN5NDYmn": "RG_Rosie_Snippet",
  "Kui0pRBbg6DLs4IKyaKD": "RG_Engine_Status",

  // Engine Timestamps
  "GwLYxjf0ZvwbcQ6GXoFr": "RG_Last_Run_At",
  "gd7rVOvSGBbf5t0OXY2U": "RG_Last_Evaluated",

  // Loan Details
  "O8MXTVTtFhdbMnxQW06k": "RG_Loan_Product_Type",
  "Bhm6KoAtG8gTDQVpyeG5": "RG_Loan_Product_Normalized",
  "dbBZ3ZzAP3slYlBBU2mI": "RG_Loan_Amount",
  "SNXywj5myOj3RNbPuh52": "RG_Home_Value_Est",
  "V6nDaRUUjhZfgbOywXjs": "RG_Down_Payment_Amount",
  "KAvSUtqlbhTbhDAQV0vt": "RG_Rate_Original",
  "GVCRPQfPhCm6NGLiw6kV": "RG_Todays_Rate",
  "hC8FCwPdEdodH3GkL18Y": "RG_Lender_Name",
  "j8WNCCmfW3IMYKfjLlXo": "RG_Loan_Start_Date",
  "hznlet1NWjmFTmbP4bHw": "RG_Rate_Variable",
  "mHjO57qa9Aw0WBf5JVQk": "RG_Loan_Shopping_Status",
  "kORGvW7iCqhWVpZymy1O": "RG_Rate_Lock_Date",
  "j8h84LrQ5aHsOlzoT4fs": "RG_Lead_Date_Manual",
  "lKLdP4KQats3rAKiPaZO": "RG_First_Time_Home_Buyer",

  // Property
  "UJ2zPsVflr2toOufWGbX": "RG_Target_Property_Type",
  "cdgGHFT9VnXGOA3LnqrA": "RG_Target_Property_Use",
  "7sNbpijLtS5fMyYF9EM7": "RG_Target_Property_State",
  "sABPb1nREwc3rn6KdUPO": "RG_Target_City",
  "jKAc1uxRwPl1l2y1tPWi": "RG_Target_County",

  // Qualification & Scoring
  "72d6xE1mD9EsEaGrPegl": "RG_Estimated_Credit_Score",
  "hWkxegZTOdBvw9iO3RdR": "RG_Estimated_Household_Income",
  "SVn9LX7kOqcOq7IxR9du": "RG_Opportunity_Tier",
  "K6mLQJAepqkFnqb4tk54": "RG_Oppty_Tier",
  "qHHtTx42JtVRos9k6QJo": "RG_Oppty_Score",
  "faYaJdfUwAsREo38ceWE": "RG_HERO_Eligibility",
  "pJRNeFa2LwHAnJhWj5CC": "RG_HERO_Category",
  "UA2QgKTivloyL5BKVcFI": "RG_Savings_Opportunity",
  "2BXMGn2zpt2yh9xvMKVP": "RG_Decision",

  // Analysis Results
  "rxkqWwlvNq1kE2apBllV": "RG_Eligible_Rate_Today",
  "oEs0Lt4YR6TXoOAjRkyv": "RG_Rate_Delta_bps",
  "n7yr15ngsA24PHa6eYAK": "RG_Monthly_Savings_Est",
  "OYhxqi7xd0CaPYXpyugE": "RG_Savings",
  "m1LUGIIEDdWIAMXdZwbN": "RG_Refi_Fees_Est",
  "RMjLFPtH3ZJTiWi9UfSm": "RG_Breakeven_Months",
  "B4n2hamopWWzX1h0XL57": "RG_ARM_Adjustment_Date",
  "Xcjs9JgWq4JTqFVxlpAA": "RG_Scenario",

  // Internal
  "oLFv2ghCfrdA7pzeAjLn": "RG_Notes_Internal",
  "Ks9oT258NNl7IsEE32Hi": "RG_Notes_Short",
  "FbU6lFUhlqIpsJXo0Dzp": "RG_Trigger_Flag",
  "eBo9pEsHnjRK5R0WieJE": "RG_App_Date",
};

// Reverse map: name -> ID (for writing back to GHL)
export const GHL_FIELD_REVERSE: Record<string, string> = Object.fromEntries(
  Object.entries(GHL_FIELD_MAP).map(([id, name]) => [name, id])
);

// Resolve GHL custom fields from ID-based format to named format
// Accepts both array format (from GHL API) and Record format (from our types)
export function resolveCustomFields(
  customFields: Array<{ id?: string; key?: string; value: unknown }> | Record<string, string> | undefined | null
): Record<string, string> {
  // Guard: contacts with no custom fields
  if (!customFields) return {};

  // If already a plain object (Record), resolve keys through the field map
  if (!Array.isArray(customFields)) {
    const resolved: Record<string, string> = {};
    for (const [key, value] of Object.entries(customFields)) {
      const name = GHL_FIELD_MAP[key] || key;
      if (value) resolved[name] = value;
    }
    return resolved;
  }

  const resolved: Record<string, string> = {};
  for (const field of customFields) {
    const id = field.id || field.key || "";
    const name = GHL_FIELD_MAP[id] || id;
    const value = Array.isArray(field.value)
      ? field.value.join(", ")
      : String(field.value ?? "");
    if (value) {
      resolved[name] = value;
    }
  }
  return resolved;
}
