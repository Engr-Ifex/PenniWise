# PenniWise — System Architecture

## 1. Introduction

PenniWise is designed as a WhatsApp-native financial platform where the conversational experience is the primary user interface. The architecture therefore centers on a backend platform that connects the WhatsApp interaction layer with AI capabilities, KYC services, savings infrastructure, brokerage services, market data, and internal operational systems.

## The architecture should support the core product capabilities described in the PenniWise brief: conversational onboarding and KYC, savings, NGX trading, portfolio updates, price alerts, AI-driven financial guidance, and human escalation.

# 2. Architectural Goals

The PenniWise architecture should prioritize:

* Reliability for financial operations.
* Secure handling of customer and financial information.
* Clear separation between conversational logic and financial transaction processing.
* Reliable integration with regulated financial partners.
* Strong auditability of financial and administrative actions.
* Ability to scale as the number of users increases.
* Ability to evolve the AI and conversation layer without destabilizing core financial services.
* Clear boundaries between external providers and PenniWise-owned business logic.

---

# 3. High-Level Architecture

The system can be represented conceptually as:

```text
                         CUSTOMER
                            │
                            ▼
                   WhatsApp Business API
                            │
                            ▼
                 ┌─────────────────────┐
                 │ Conversation Layer  │
                 │                     │
                 │ - Message handling  │
                 │ - Conversation state│
                 │ - Intent processing  │
                 └──────────┬──────────┘
                            │
                            ▼
                    ┌───────────────┐
                    │   AI Layer    │
                    │               │
                    │ - Intent      │
                    │ - Context     │
                    │ - Responses   │
                    │ - Suggestions │
                    └───────┬───────┘
                            │
                            ▼
                 ┌─────────────────────┐
                 │   Core Application  │
                 │       Backend       │
                 └──────────┬──────────┘
                            │
          ┌─────────────────┼─────────────────┐
          │                 │                 │
          ▼                 ▼                 ▼
       KYC Layer       Savings/Wallet      Trading
          │                 │                 │
          ▼                 ▼                 ▼
      KYC Provider       MFB Partner      Broker Partner
                              │                 │
                              └────────┬────────┘
                                       │
                                       ▼
                                External Financial
                                   Infrastructure

                 ┌─────────────────────────────┐
                 │         Data Layer          │
                 │                             │
                 │ PostgreSQL / Neon            │
                 │ Redis                        │
                 └─────────────────────────────┘

                 ┌─────────────────────────────┐
                 │   Internal Operations        │
                 │                             │
                 │ Admin API / Admin Portal     │
                 │ Audit Logs                   │
                 │ Monitoring                   │
                 └─────────────────────────────┘
```

This is a logical architecture. Specific implementation details may evolve as integrations and infrastructure are finalized.

---

# 4. Major System Components

## 4.1 WhatsApp Interface

WhatsApp is the primary customer-facing interface.

The product is intentionally designed around the idea that the conversation itself is the product rather than WhatsApp being an additional support channel.

The WhatsApp layer is responsible for:

* Receiving incoming messages.
* Sending outgoing messages.
* Handling interactive buttons and conversational responses.
* Receiving media where required for KYC/liveness.
* Passing user messages to the PenniWise backend.
* Delivering confirmations, notifications, and other system-generated messages.

The WhatsApp integration should not contain core financial business rules. It should act primarily as an interface and transport layer.

---

# 5. Conversation Layer

The conversation layer manages the state of the user's interaction.

Responsibilities include:

* Identifying the user.
* Determining the current conversation state.
* Processing incoming messages.
* Managing conversational context.
* Routing requests to the appropriate business capability.
* Maintaining confirmation states.
* Triggering human escalation where necessary.

The current product requirements include conversation states covering onboarding, KYC, risk profiling, trading, saving, trade confirmation, and human escalation.

An example flow is:

```text
Incoming WhatsApp Message
          │
          ▼
      Identify User
          │
          ▼
   Load Conversation State
          │
          ▼
      Interpret Intent
          │
          ▼
     Select Capability
          │
     ┌────┼─────┐
     ▼    ▼     ▼
    KYC  Save  Trade
          │
          ▼
    Execute/Respond
          │
          ▼
     Update State
          │
          ▼
    Send WhatsApp Reply
```

---

# 6. AI Layer

The AI layer interprets user language and provides conversational intelligence.

It is responsible for capabilities such as:

* Natural-language understanding.
* Intent detection.
* Context-aware responses.
* Financial education.
* Investment suggestions.
* Portfolio-related explanations.
* Conversational assistance.

The investor brief specifies that recommendations should consider risk profile, portfolio composition, and current market data. Recommendations must be presented as suggestions rather than financial advice.

The AI layer should **not directly control financial state changes**.

For example:

```text
User:
"Buy 100 GTCO"

AI
 ↓
Understands intent
 ↓
Produces structured trade request
 ↓
Backend validates request
 ↓
Backend calculates price/cost
 ↓
Backend presents confirmation
 ↓
User confirms
 ↓
Trading service executes order
```

This separation is especially important for financial safety.

---

# 7. Core Application Backend

The core backend contains the authoritative business logic of PenniWise.

It should provide services for:

* User management.
* Authentication and authorization.
* KYC orchestration.
* Risk profiling.
* Wallet management.
* Transactions.
* Ledger operations.
* Savings.
* Trading.
* Portfolio management.
* Notifications.
* Price alerts.
* Audit logging.
* Administrative operations.

The backend should be the system responsible for enforcing business rules, even when the original request comes from the AI layer.

---

# 8. KYC Service

The KYC service coordinates identity verification.

The intended flow includes:

```text
User
 ↓
BVN
 ↓
NIN
 ↓
Liveness
 ↓
Risk Profile
 ↓
Verification result
 ↓
Account activation
```

Potential third-party KYC providers identified in the product brief include Smile Identity and Dojah.

The KYC service should abstract the external provider from the rest of the application.

Conceptually:

```text
PenniWise KYC Service
        │
        ├── Provider Adapter
        │       ├── Smile Identity
        │       └── Dojah
        │
        └── KYC Database Records
```

This allows the provider to be changed without rewriting the complete onboarding system.

---

# 9. Wallet and Ledger System

The wallet system is responsible for representing customer financial balances and the movement of funds.

The current data model separates:

```text
Wallet
Transaction
LedgerEntry
```

This provides a foundation for maintaining a financial ledger rather than relying only on a mutable balance field.

Conceptually:

```text
                Transaction
                     │
                     ▼
              Ledger Entries
                /       \
               /         \
          DEBIT           CREDIT
             │               │
             ▼               ▼
         Wallet A          Wallet B
```

Financial operations should be performed atomically.

A transaction should not be considered successfully completed if its required ledger entries have not also been successfully recorded.

---

# 10. Savings Service

The savings service manages savings goals and associated operations.

The current product supports:

* Flexible savings.
* Locked savings.
* Savings targets.
* Target dates.
* Interest-related calculations.
* Savings completion.
* Savings notifications.

The investor brief describes the savings experience as a conversational goal-based system with projected final balances including interest.

The savings service will coordinate with the MFB integration for actual deposit infrastructure.

---

# 11. Trading Service

The trading service manages the lifecycle of investment orders.

The intended flow is:

```text
User Request
     │
     ▼
AI Intent Interpretation
     │
     ▼
Trading Service
     │
     ├── Validate instrument
     ├── Fetch current price
     ├── Calculate cost
     ├── Calculate commission
     ├── Check available funds
     │
     ▼
Confirmation Request
     │
     ▼
User CONFIRM
     │
     ▼
Broker Integration
     │
     ▼
Order Status Updates
     │
     ▼
Portfolio / Wallet Updates
     │
     ▼
Notification
```

The confirmation step is mandatory according to the product brief.

---

# 12. Brokerage Integration

The brokerage integration is an external-system boundary.

The integration is expected to support:

* NGX trading.
* CSCS account opening.
* Order submission.
* Order status.
* Settlement information.

The product brief describes the broker as the regulated infrastructure provider responsible for these capabilities.

The backend should use a dedicated brokerage integration layer rather than allowing business logic to call a broker API directly from multiple places.

Conceptually:

```text
Trading Service
      │
      ▼
Brokerage Adapter
      │
      ▼
Broker API
      │
      ▼
NGX / CSCS Infrastructure
```

---

# 13. Banking / MFB Integration

The banking integration provides the underlying savings and deposit infrastructure.

Expected capabilities include:

* Wallet creation.
* Deposit holding.
* Transfers.
* NIP payment rails.
* Relevant account information.

The product brief identifies Crest MFB and Safe Haven MFB as potential MFB partners.

The architecture should treat the MFB as an external provider.

```text
Savings Service
      │
      ▼
Banking Adapter
      │
      ▼
MFB API
      │
      ▼
Deposit Infrastructure
```

---

# 14. Market Data

Trading and AI recommendations depend on current market information.

The market-data layer should provide normalized information such as:

* Instrument ticker.
* Instrument name.
* Current price.
* Price timestamp.
* Market status where required.

The current schema includes an `Instrument` entity containing ticker, name, exchange, last price, and price timestamp.

Market data should be isolated behind a service or adapter so the source can be changed without rewriting trading and AI logic.

---

# 15. Notification System

The notification system handles proactive communication.

Supported notification concepts currently include:

* Trade settlement.
* Price alerts.
* Savings nudges.
* Goal completion.
* System notifications.

A conceptual flow is:

```text
Event
 │
 ├── Trade completed
 ├── Price reached
 ├── Goal reached
 └── Savings reminder
       │
       ▼
Notification Service
       │
       ▼
WhatsApp
```

The notification service should eventually handle delivery status, failures, retries, and provider references.

---

# 16. Redis

Redis is part of the application infrastructure and is represented in the current environment configuration through `REDIS_URL`.

Redis may be used for infrastructure concerns such as:

* Caching.
* Short-lived conversation data.
* Rate limiting.
* Queues/background jobs.
* Temporary state.

Specific Redis responsibilities should be defined in the implementation documentation as each feature is implemented.

Redis should not be treated as the authoritative source for financial balances or permanent financial records.

PostgreSQL remains the primary persistent data store.

---

# 17. PostgreSQL / Neon

PostgreSQL is the primary relational database for PenniWise.

The current development setup uses Neon as the shared PostgreSQL environment.

The database stores core entities including:

* Users.
* Admin users.
* KYC records.
* Wallets.
* Transactions.
* Ledger entries.
* Savings goals.
* Instruments.
* Holdings.
* Orders.
* Notifications.
* Price alerts.
* Audit logs.

The database schema is managed through Prisma.

---

# 18. Prisma

Prisma acts as the ORM and database schema management layer.

Its responsibilities include:

* Defining the application's data models.
* Generating the Prisma client.
* Managing database migrations.
* Providing type-safe database access.

Schema changes should be managed through migrations rather than manually modifying the shared database.

The migration history should be committed to GitHub so that all developers work from the same database evolution history.

---

# 19. Authentication and Authorization

The application includes JWT-based authentication.

Authentication is responsible for establishing the identity of authenticated users.

Authorization is responsible for determining what an authenticated actor can access.

Administrative roles currently include:

```text
SUPPORT
ADMIN
SUPER_ADMIN
```

The customer and administrator authentication domains should remain logically separate.

JWT secrets and other credentials must be stored in environment configuration and must not be committed to GitHub.

---

# 20. Admin / Operations Layer

PenniWise requires internal operational functionality separate from the customer-facing WhatsApp experience.

The administrative system should eventually support activities such as:

* User support.
* Account monitoring.
* KYC monitoring.
* Transaction monitoring.
* Trading/order monitoring.
* Operational interventions.
* Audit review.

The current schema separates `AdminUser` from customer `User` accounts and provides role-based access through `AdminRole`.

---

# 21. Audit Layer

Financial and administrative operations need traceability.

The current architecture includes an audit-log system capable of recording:

* Actor.
* Action.
* Resource.
* Resource ID.
* Previous state.
* New state.
* IP address.
* User agent.
* Timestamp.

The audit layer should be treated as an independent cross-cutting concern rather than being implemented separately in each feature without a common approach.

---

# 22. External Integration Boundary

All third-party services should be isolated behind integration/adaptor layers.

The main external systems currently identified are:

```text
WhatsApp
   │
   ├── Business API
   │
KYC
   │
   ├── Verification provider
   │
Banking
   │
   └── MFB API
   │
Brokerage
   │
   └── Broker API
   │
Market Data
   │
   └── Market data provider
```

This architecture reduces coupling and makes providers replaceable.

---

# 23. Data Flow — Example: User Onboarding

```text
User
 │
 │ WhatsApp message
 ▼
WhatsApp API
 │
 ▼
Conversation Layer
 │
 ▼
AI / Intent Processing
 │
 ▼
KYC Service
 │
 ├── BVN verification
 ├── NIN verification
 └── Liveness verification
 │
 ▼
Risk Profile
 │
 ▼
User Account Activation
 │
 ├── CSCS account request
 └── Savings wallet request
 │
 ▼
PostgreSQL
 │
 ▼
WhatsApp confirmation
```

The intended onboarding flow is designed to be completed without the user leaving WhatsApp.

---

# 24. Data Flow — Example: Trade

```text
User
 │
 │ "Buy 100 GTCO"
 ▼
WhatsApp
 │
 ▼
Conversation Layer
 │
 ▼
AI
 │
 ▼
Structured Trade Intent
 │
 ▼
Trading Service
 │
 ├── Market price
 ├── Cost calculation
 ├── Commission
 └── Wallet validation
 │
 ▼
Trade Confirmation
 │
 │ User confirms
 ▼
Trading Service
 │
 ▼
Brokerage Adapter
 │
 ▼
Broker
 │
 ▼
Order Status
 │
 ├── Wallet / Ledger
 ├── Holding
 └── Notification
```

The explicit user confirmation is a mandatory architectural boundary before order execution.

---

# 25. Data Flow — Example: Savings

```text
User
 │
 │ "I want to save ₦100,000 for December"
 ▼
WhatsApp
 │
 ▼
Conversation Layer
 │
 ▼
AI
 │
 ▼
Savings Service
 │
 ├── Create goal
 ├── Calculate target
 ├── Calculate projection
 └── Determine flexible/locked type
 │
 ▼
MFB Integration
 │
 ▼
Savings Infrastructure
 │
 ▼
PostgreSQL
 │
 ▼
WhatsApp confirmation
```

The savings experience is designed around natural-language goals and flexible or locked savings options.

---

# 26. Reliability and Consistency

Financial operations must prioritize consistency over convenience.

Critical operations should:

* Validate input.
* Verify authorization.
* Check current financial state.
* Execute database changes atomically.
* Record ledger information.
* Record relevant audit information.
* Notify the user after the operation reaches the appropriate state.

External provider calls should be designed to tolerate:

* Timeouts.
* Retries.
* Duplicate requests.
* Provider failures.
* Delayed responses.

Idempotency should be used for financial operations where repeated requests could otherwise create duplicate effects.

The current transaction model includes an `idempotencyKey`, which provides a foundation for this behavior.

---

# 27. Security Architecture

Security should be implemented across all layers.

Key areas include:

* Authentication.
* Role-based authorization.
* Secure environment configuration.
* KYC data protection.
* Financial transaction controls.
* API validation.
* Rate limiting.
* Audit logging.
* Secure external API credentials.
* Secure communication with external services.

No AI-generated response should directly bypass the application's authorization or financial validation layers.

---

# 28. Scalability Direction

The initial implementation can operate as a modular backend application rather than immediately adopting a large distributed microservices architecture.

The logical separation should exist even if the first implementation is deployed as one application:

```text
Application
│
├── Auth
├── Users
├── KYC
├── Conversations
├── AI
├── Wallet
├── Ledger
├── Savings
├── Trading
├── Portfolio
├── Notifications
├── Integrations
└── Admin
```

As usage grows, individual components can be separated into independent services where there is a clear operational or scalability benefit.

This avoids premature infrastructure complexity while preserving clear boundaries.

---

# 29. Source of Truth

Different parts of PenniWise should have clear sources of truth.

| Area                          | Source of Truth                                         |
| ----------------------------- | ------------------------------------------------------- |
| Product direction             | Product requirements                                    |
| Product roadmap               | Roadmap                                                 |
| Database structure            | Prisma schema + migrations                              |
| Persistent financial data     | PostgreSQL                                              |
| Temporary/cache data          | Redis                                                   |
| Financial execution           | Core backend + regulated provider                       |
| User conversation state       | Application state/database as defined by implementation |
| External account/order status | Relevant external provider                              |
| Administrative activity       | Audit logs                                              |

No individual AI response, cached value, or client-side value should be treated as the authoritative source for financial state.

---

# 30. Architecture Evolution

The architecture is expected to evolve as PenniWise progresses through:

```text
Concept
   ↓
Private Beta
   ↓
Public Launch
   ↓
Growth
   ↓
Product Expansion
```

The architecture should therefore favor:

* Clear interfaces.
* Replaceable integrations.
* Strong data integrity.
* Modular business logic.
* Observable operations.
* Secure configuration.
* Incremental scalability.

Changes to the system architecture should be reflected in this document and in related API, database, AI, WhatsApp, banking, brokerage, security, and deployment documentation.

---

# 31. Architectural Principle

The central architectural principle of PenniWise is:

**AI interprets. The application validates. Financial systems execute. The database records.**

The AI should make the experience conversational, but it should never become the authoritative financial system.

The backend remains responsible for enforcing business rules, validating financial operations, maintaining account state, and coordinating regulated external services.

This separation allows PenniWise to preserve the simplicity of a WhatsApp conversation while maintaining the reliability and controls required by a financial platform.

