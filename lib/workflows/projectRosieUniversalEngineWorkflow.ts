export type WorkflowStatus = "Published" | "Draft";

export interface WorkflowMetadata {
  name: string;
  status: WorkflowStatus;
  primaryPurpose: string;
}

export interface WorkflowTrigger {
  type: "tag_added";
  tag: string;
  value: string;
}

export interface WorkflowAction {
  type: "add_to_workflow";
  workflowName: string;
}

export interface WorkflowNode {
  id: string;
  name: string;
  type: "condition" | "actions";
  description: string;
  branches?: {
    onMatch: string;
    onNoMatch: string;
  };
  matchGroups?: Array<{
    when: {
      tag: string;
      equals: "yes" | "no";
    };
    loanProducts: string[];
  }>;
  actions?: WorkflowAction[];
}

export interface WorkflowDefinition {
  metadata: WorkflowMetadata;
  trigger: WorkflowTrigger;
  nodes: WorkflowNode[];
}

const enrolledLoanProducts = [
  "30-Year Fixed (Agency)",
  "20-Year Fixed (Agency)",
  "Jumbo_Adj_10/1 yr",
];

const notEnrolledLoanProducts = [
  "30-year fixed - FHA",
  "30-year fixed - VA",
  "Jumbo_Fixed_30yr",
];

const sharedActions: WorkflowAction[] = [
  { type: "add_to_workflow", workflowName: "Internal Notification" },
  { type: "add_to_workflow", workflowName: "Contact Follow-Up" },
  { type: "add_to_workflow", workflowName: "Sub-Pipeline Login" },
];

export const projectRosieUniversalEngineWorkflow: WorkflowDefinition = {
  metadata: {
    name: "Project Rosie – Universal Engine Workflow",
    status: "Published",
    primaryPurpose:
      "Process contacts with confirmed savings opportunity and route to downstream workflows",
  },
  trigger: {
    type: "tag_added",
    tag: "rg_savings_opportunity",
    value: "yes",
  },
  nodes: [
    {
      id: "condition_rg_enrolled",
      name: "Condition Check",
      type: "condition",
      description:
        "Does contact have tag rg_enrolled? (context only; branches rejoin)",
      branches: {
        onMatch: "loan_product_identification",
        onNoMatch: "loan_product_identification",
      },
    },
    {
      id: "loan_product_identification",
      name: "Loan Product Identification",
      type: "condition",
      description:
        "Consolidated loan product matching for enrolled and not enrolled contacts",
      matchGroups: [
        {
          when: { tag: "rg_enrolled", equals: "yes" },
          loanProducts: enrolledLoanProducts,
        },
        {
          when: { tag: "rg_enrolled", equals: "no" },
          loanProducts: notEnrolledLoanProducts,
        },
      ],
      branches: {
        onMatch: "run_downstream_actions",
        onNoMatch: "run_downstream_actions",
      },
    },
    {
      id: "run_downstream_actions",
      name: "Run Downstream Workflows",
      type: "actions",
      description:
        "Add to internal notification, contact follow-up, and sub-pipeline login workflows",
      actions: sharedActions,
    },
  ],
};
