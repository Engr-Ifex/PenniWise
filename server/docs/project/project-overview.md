PenniWise — Project Overview
1. Introduction

PenniWise is a WhatsApp-native investment and savings platform designed for the Nigerian market. The platform is built around the idea that users should be able to access investment, savings, KYC, and financial education services through a familiar conversational interface without needing to download a dedicated financial application or visit a physical branch.

The central product philosophy is conversation first, everything else second. WhatsApp is not intended to be merely a support channel or an add-on to the platform; it is the primary interface through which customers interact with PenniWise.

2. Vision

The vision of PenniWise is to make investing and structured saving more accessible to everyday Nigerians by removing the friction associated with traditional investment platforms.

The platform aims to allow users to:

Invest in NGX-listed equities.
Create and manage savings goals.
Complete KYC verification through conversation.
Receive investment insights and portfolio updates.
Learn about investing through AI-powered financial education.
Receive price alerts and proactive financial nudges.

These experiences are designed to happen primarily within WhatsApp.

3. The Problem

PenniWise is designed around several barriers affecting retail investment participation in Nigeria.

Friction-heavy onboarding

Traditional brokerage onboarding can require paperwork, branch visits, or complicated web interfaces that are difficult for inexperienced investors to navigate.

App fatigue

Existing investment platforms commonly require users to download and learn another application. PenniWise instead uses WhatsApp, a platform already deeply integrated into users' daily communication habits.

Trust

The product aims to provide investment services through familiar and regulated channels while operating with regulated financial partners.

Financial literacy

The product brief identifies financial literacy as a major barrier and positions conversational AI as a way to explain investment concepts and guide users through decisions in a simpler manner.

Savings fragmentation

PenniWise also addresses the gap between informal savings practices and formal, interest-bearing savings products by providing savings functionality through the same conversational interface.

4. Product Philosophy

PenniWise is designed around five core principles.

Conversation first

Users should be able to express financial intent naturally rather than navigating complex forms or screens.

Simplicity

The system should use plain language and avoid unnecessary financial jargon.

One action at a time

Each conversational message should have one primary action so that users are not overwhelmed.

Confirmation before execution

Financial transactions, especially trades, must require an explicit confirmation step before execution.

Human fallback

When the AI cannot confidently handle a request, the experience should gracefully escalate to a human agent during business hours.

5. Core Product Capabilities
5.1 User Onboarding and KYC

A new user begins by messaging the PenniWise WhatsApp number.

The onboarding process is intended to be conversational and completed in under three minutes. The planned flow includes:

User initiation through WhatsApp.
Collection and verification of BVN.
NIN verification.
Liveness/selfie verification.
Basic risk-profile assessment.
Account activation.

The brief states that KYC providers such as Smile Identity or Dojah may be used for real-time verification. A CSCS account and savings wallet are intended to be opened automatically in the backend after onboarding.

5.2 Stock Trading

PenniWise allows users to buy and sell NGX-listed equities through natural-language conversation.

The intended trading flow is:

User expresses intent
        ↓
AI interprets request
        ↓
Fetch current NGX price
        ↓
Calculate total cost
        ↓
Include commission
        ↓
Check wallet balance
        ↓
Present trade summary
        ↓
User explicitly confirms
        ↓
Submit order
        ↓
Settlement/update notification

The confirmation gate is mandatory. The system must not bypass this step when executing a trade. The user should see the relevant cost breakdown, including shares, price, and commission, before execution.

5.3 Savings

PenniWise provides a savings wallet designed around user-defined financial goals.

A user should be able to describe a goal in natural language, after which the AI can create a named savings goal and calculate the required savings target.

Two savings modes are defined:

Flexible savings

Users can withdraw funds when needed.

Locked savings

Funds remain locked until a defined target date.

The product also intends to show projected final balances including interest when the savings goal is created.

5.4 AI Intelligence

The AI layer extends beyond transaction processing.

It is intended to provide:

Personalized investment recommendations.
Portfolio guidance and nudges.
Price alerts.
Investment education.
Financial literacy coaching.

Recommendations should consider factors such as the user's risk profile, portfolio composition, and current NGX market data.

AI-generated investment recommendations must be presented as suggestions rather than financial advice.

5.5 Notifications and Alerts

PenniWise should proactively communicate important financial events to users, including:

Trade settlement updates.
Price alerts.
Savings reminders.
Goal completion.
General system notifications.

The system should support proactive interaction rather than requiring users to initiate every conversation.

6. Target Users

The initial target market is urban Nigerians between approximately 18 and 45 years old who have smartphones and use WhatsApp.

The initial customer segments identified in the brief are:

Salaried employees.
Small business owners.

The initial geographic focus is:

Lagos.
Abuja.
Port Harcourt.
7. Customer Experience

The intended customer experience is conversational, simple, and emotionally engaging.

For example, rather than presenting users with complex terminology, the system should use language such as:

"Your shares have settled."

instead of unnecessarily exposing users to technical settlement terminology.

The platform should also respond appropriately to different financial situations. Successful savings milestones can be celebrated, while portfolio losses should receive an empathetic and educational response.

8. Financial and Regulatory Model

PenniWise is designed to operate as a technology and distribution layer using regulated financial partners rather than independently providing all underlying regulated financial infrastructure.

The brief identifies two main categories of partners.

Brokerage partner

The brokerage partner is expected to provide:

NGX trading access.
CSCS account opening.
Order execution.
Brokerage infrastructure.
Relevant regulatory coverage.

The brief identifies Morgan Capital Securities and Citi Investment Securities as potential brokerage partners.

MFB partner

The MFB partner is expected to provide:

Savings/deposit wallet infrastructure.
Deposit holding.
NIP transfer capabilities.
Relevant banking and AML/CFT infrastructure.

Crest MFB and Safe Haven MFB are identified as potential partners.

9. Revenue Model

The business model described in the investor brief includes several revenue streams.

Brokerage commissions

PenniWise expects to earn a share of commissions generated from NGX trades.

Savings float spread

Revenue is generated from the difference between the rate earned on deposits and the rate passed to users.

Premium subscription

A premium plan is proposed for advanced analytics, unlimited price alerts, and priority order routing.

Fixed-income referrals

PenniWise may receive referral commissions for directing users toward products such as T-bills, bonds, and mutual funds through partner institutions.

Institutional data

The brief also proposes the potential sale of anonymized and aggregated retail sentiment data to institutional investors and research firms.

10. High-Level System

The product requires several interconnected technical components:

                    USER
                      │
                      ▼
              WhatsApp Interface
                      │
                      ▼
              Conversation Layer
                      │
             ┌────────┼────────┐
             │        │        │
             ▼        ▼        ▼
            KYC     Savings   Trading
             │        │        │
             └────────┼────────┘
                      │
                  AI Layer
                      │
          ┌───────────┼───────────┐
          │           │           │
          ▼           ▼           ▼
       Banking     Brokerage    Market Data
       Partner      Partner
          │           │
          └──────┬────┘
                 ▼
             Core Backend
                 │
        ┌────────┴────────┐
        ▼                 ▼
   PostgreSQL           Redis

The detailed implementation of these components will be documented separately in the architecture, API, database, AI, WhatsApp, banking, brokerage, and deployment documentation.

11. Security and Trust

Because PenniWise deals with identity information and financial activity, trust and security are core parts of the product.

The platform is expected to handle:

KYC information.
User identity.
Financial transactions.
Wallet activity.
Investment orders.
Portfolio information.
Administrative actions.

The current database design therefore includes KYC records, wallets, transactions, ledger entries, authentication-related data, and audit logs.

Security, privacy, authentication, authorization, auditability, and financial transaction controls should be treated as first-class system requirements.

12. Product Roadmap

The investor brief describes the following product progression:

Phase 1 — Pre-seed

Raise capital, establish broker and MFB partnerships, and build the core team.

Phase 2 — Private Beta

Launch the WhatsApp Business API experience and complete the end-to-end KYC flow with an initial beta user group.

Phase 3 — Public Launch

Launch full NGX trading and savings functionality, beginning with market activation in Lagos and Abuja.

Phase 4 — Growth

Introduce referral programmes and payroll savings partnerships.

Phase 5 — Product Depth

Expand into AI recommendations, fixed-income products, and Pidgin English NLP, followed by preparation for Series A.

13. Future Language Support

The initial product is designed around conversational English, with a roadmap to support:

Nigerian Pidgin.
Yoruba.
Hausa.
Igbo.

These language capabilities are identified as part of the product's future development rather than the initial MVP.

14. Current Product Scope

For the initial product, the core scope is:

WhatsApp onboarding
        ↓
KYC
        ↓
Risk profiling
        ↓
Savings
        ↓
NGX trading
        ↓
Portfolio updates
        ↓
Price alerts
        ↓
AI-assisted financial guidance
        ↓
Human escalation

Additional products and capabilities such as fixed-income investments, expanded language support, advanced AI recommendations, and other growth features can be added progressively according to the roadmap.

15. Product Goal

The fundamental goal of PenniWise is to reduce the friction between a Nigerian user's intention to save or invest and their ability to actually do it.

The product is built around a simple proposition:

The best investment platform for many Nigerians may be the financial experience built into the platform they already use every day: WhatsApp.
