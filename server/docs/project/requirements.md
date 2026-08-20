# PenniWise — Product Requirements

## 1. Introduction

This document defines the functional and product requirements for PenniWise based on the current product brief. It serves as a reference for product, design, engineering, AI, and integration work.

PenniWise is a WhatsApp-native investment and savings platform designed for Nigerian users. The core experience must allow users to interact with savings, investments, KYC, financial education, and portfolio services primarily through WhatsApp.

---

## 2. Product Goals

PenniWise should:

* Reduce friction associated with investing and saving.
* Allow users to complete onboarding and KYC through WhatsApp.
* Allow users to save toward financial goals.
* Allow users to buy and sell NGX-listed equities.
* Provide personalized AI-driven investment insights and financial education.
* Provide portfolio updates and price alerts.
* Provide human-agent escalation when the AI cannot appropriately handle a request.
* Operate through regulated financial partners for brokerage and deposit-holding infrastructure.

---

## 3. Target Users

The initial target users are urban Nigerians approximately 18–45 years old who have smartphones and use WhatsApp.

The initial target segments are:

* Salaried employees.
* Small business owners.

The initial geographic focus is:

* Lagos.
* Abuja.
* Port Harcourt.

---

## 4. User Onboarding Requirements

### 4.1 WhatsApp Entry

The user must be able to begin their PenniWise journey by sending a message to the official PenniWise WhatsApp number.

### 4.2 Conversational Onboarding

The onboarding experience must be conversational rather than form-heavy.

The target onboarding duration is under three minutes.

### 4.3 KYC Requirements

The onboarding flow must support:

* BVN verification.
* NIN verification.
* Liveness/selfie verification.
* Basic risk-profile assessment.

The brief identifies providers such as Smile Identity or Dojah for real-time KYC verification.

### 4.4 Account Activation

After successful onboarding:

* The user's PenniWise account should become active.
* A CSCS account should be opened through the brokerage infrastructure.
* A savings wallet should be opened through the relevant MFB infrastructure.

---

## 5. KYC Requirements

The system must maintain the state of each KYC verification.

Supported KYC types currently defined are:

* BVN.
* NIN.
* Liveness.

KYC states include:

* Pending.
* Verified.
* Failed.

The system must retain provider references and failure information needed for operational handling.

Raw KYC values should not be stored unnecessarily; the current schema is designed around hashed KYC values and provider metadata rather than storing raw BVN/NIN values.

---

## 6. Risk Profiling Requirements

The onboarding process must include a basic risk-profile assessment.

The product currently defines three risk profiles:

* Conservative.
* Moderate.
* Aggressive.

## The user's risk profile should be available to the AI recommendation layer so recommendations can be aligned with the user's stated risk profile.

## 7. Savings Requirements

### 7.1 Savings Goal Creation

Users must be able to create savings goals using natural-language instructions.

A savings goal should support:

* Goal name.
* Savings type.
* Target amount.
* Target date.
* Applicable interest rate.
* Lock status.

### 7.2 Savings Types

The system must support:

**Flexible savings**

The user can withdraw funds when needed.

**Locked savings**

The user's funds remain locked until the defined release date.

### 7.3 Savings Projection

When a savings goal is created, the system should provide a projected final balance including applicable interest.

### 7.4 Savings Notifications

The system should support savings-related reminders and nudges.

Savings milestones and completed goals should be communicated in an encouraging manner.

---

## 8. Wallet Requirements

The platform must support customer wallets.

Current wallet types include:

* Savings.
* Trading.

Wallets must support:

* Currency.
* Balance tracking.
* Ledger entries.
* Transaction reconciliation.

The current schema uses integer minor units for monetary balances and transactions.

---

## 9. Financial Transaction Requirements

The system must support financial transaction states including:

* Pending.
* Processing.
* Completed.
* Failed.
* Reversed.

Supported transaction types currently include:

* Deposit.
* Withdrawal.
* Buy trade.
* Sell trade.
* Savings lock.
* Savings unlock.
* Interest accrual.
* Fee.
* Transfer.

Transactions must be traceable through ledger entries.

Financial operations should be handled atomically so that an incomplete financial operation cannot leave the wallet and ledger in an inconsistent state.

---

## 10. Trading Requirements

### 10.1 Natural-Language Trading

Users must be able to express trading intent using conversational language.

The system must interpret the user's request and identify the relevant:

* Instrument.
* Buy or sell action.
* Quantity.

### 10.2 Market Data

Before execution, the system must obtain the relevant current market price.

The current product brief specifically describes NGX-listed equities as the initial trading product.

### 10.3 Cost Calculation

The system must calculate and present the total cost before execution.

The cost breakdown should include:

* Number of shares.
* Price.
* Brokerage commission.

The system should also verify that the user has sufficient wallet balance where applicable.

### 10.4 Mandatory Confirmation

Every trade must pass through an explicit confirmation step.

The system must not execute a financial order directly from an unconfirmed natural-language instruction.

### 10.5 Order Processing

The system must track order states including:

* Pending.
* Submitted.
* Partially filled.
* Filled.
* Cancelled.
* Failed.

## The system should retain the external broker order reference where applicable.

## 11. Portfolio Requirements

The system must maintain the user's holdings.

A holding should associate:

* User.
* Instrument.
* Quantity.
* Average cost.

Users should be able to receive portfolio-related information and updates.

---

## 12. AI Requirements

The AI layer must support more than transactional commands.

It should provide:

* Investment suggestions.
* Portfolio nudges.
* Price-related insights.
* Financial literacy coaching.
* Natural-language interaction.

Recommendations should consider:

* User risk profile.
* Portfolio composition.
* Current NGX market data.

AI recommendations must be clearly labelled as suggestions and not financial advice.

---

## 13. Conversation Requirements

The conversation layer must follow these principles:

### Plain language

Use language that ordinary users can understand and avoid unnecessary financial jargon.

### One primary action

Each message should present one primary action to the user.

### Confirmation before execution

Financial operations must require explicit user confirmation.

### Graceful fallback

If the AI misunderstands or cannot safely complete the request, the interaction should be escalated to a human agent during business hours.

### Emotional tone

The system should use an encouraging tone for positive financial milestones and an empathetic, educational tone for negative financial outcomes.

---

## 14. Notification Requirements

The system must support notifications for at least:

* Trade settlement.
* Price alerts.
* Savings nudges.
* Goal completion.
* System events.

The current data model also supports notification metadata and delivery state tracking.

---

## 15. Price Alert Requirements

Users must be able to create price alerts for supported investment instruments.

A price alert should contain:

* User.
* Instrument.
* Target price.
* Direction.
* Active state.
* Triggered state.
* Trigger time.

The product should support alerts when a target price moves above or below the configured threshold.

---

## 16. Human Escalation Requirements

When the AI cannot confidently or safely handle a request, the system must provide a route to human support.

The conversation state must support escalation to an agent.

The product brief targets escalation to a human agent within 60 seconds during business hours.

---

## 17. Admin Requirements

PenniWise must provide separate administrative access for internal staff.

The current system defines:

* Support.
* Admin.
* Super Admin.

Administrative accounts must be separate from customer accounts.

## Admin actions should be auditable through the audit logging system.

## 18. Audit Requirements

The system must maintain an audit trail for significant actions.

Audit records should be able to capture:

* Actor type.
* Action.
* Resource.
* Resource ID.
* Previous state where applicable.
* New state where applicable.
* IP address where applicable.
* User agent where applicable.
* Timestamp.

---

## 19. Brokerage Integration Requirements

The brokerage integration must support the infrastructure required for:

* NGX trading access.
* CSCS account opening.
* Order execution.
* Broker order references.
* Trade settlement information.

The investor brief identifies the brokerage partner as the regulated infrastructure layer providing these capabilities.

---

## 20. Banking / MFB Integration Requirements

The banking integration must support:

* Savings wallet creation.
* Deposit holding.
* NIP transfers.
* Deposit-related infrastructure.
* Applicable AML/CFT requirements through the regulated MFB partner.

The investor brief identifies Crest MFB and Safe Haven MFB as potential partners.

---

## 21. Security Requirements

The platform must protect:

* Customer identity information.
* KYC information.
* Authentication credentials.
* Financial transactions.
* Wallet balances.
* Investment orders.
* Administrative operations.

Sensitive configuration values such as database credentials, API keys, and JWT secrets must be stored in environment configuration and must not be committed to the source repository.

---

## 22. Data Requirements

The core platform must maintain information about:

* Users.
* Administrators.
* KYC verifications.
* Wallets.
* Transactions.
* Ledger entries.
* Savings goals.
* Investment instruments.
* Holdings.
* Orders.
* Notifications.
* Price alerts.
* Audit logs.

## The current Prisma schema provides the initial data model for these requirements.

## 23. Language Requirements

The initial product should support the primary conversational language used by the initial target users.

Future versions are planned to support:

* Nigerian Pidgin.
* Yoruba.
* Hausa.
* Igbo.

These language capabilities are part of the product roadmap rather than the initial product scope.

---

## 24. MVP Requirements

The initial MVP should prioritize:

1. WhatsApp onboarding.
2. KYC verification.
3. Risk profiling.
4. Savings wallet.
5. NGX stock trading.
6. Wallet and transaction infrastructure.
7. Mandatory trade confirmation.
8. Portfolio updates.
9. Price alerts.
10. Basic AI-powered financial guidance.
11. Human-agent escalation.
12. Administrative monitoring and auditability.

These capabilities align with the private-beta and public-launch stages described in the product roadmap.

---

## 25. Future Requirements

The roadmap identifies the following future capabilities:

* Referral programme.
* Payroll savings partnerships.
* AI investment recommendations.
* Fixed-income products.
* Pidgin English NLP.
* Additional product depth and advanced capabilities.

Future requirements should be added to this document as they become formally approved product requirements.

---

## 26. Requirement Change Process

Requirements will evolve as PenniWise moves from development to beta and public launch.

When a new requirement is introduced:

1. Define the business need.
2. Define the expected user behavior.
3. Determine affected systems.
4. Update this requirements document.
5. Update the relevant technical documentation.
6. Update the database/API/architecture where necessary.
7. Implement and test the change.
8. Record the change in the changelog.

The requirements document should remain aligned with the actual product rather than becoming a historical copy of early assumptions.

