# CopySignals – Technical Proof of Concept

This repository contains a **hands-on technical Proof of Concept (PoC)** built to explore the problem space described in the CopySignals job description.

The goal of this PoC is **not feature completeness**, but to demonstrate:

* System design thinking
* Production-grade NestJS structure
* Clear separation of concerns
* How external signals (Telegram) enter the system and are prepared for downstream processing (LLM, validation, execution, observability)

This PoC is intentionally built the way a **real fintech / trading / signal-processing backend** would be structured from day one.

---

## Repository Structure

```
copy-signals-poc/
├── backend/        # NestJS backend (core focus of this PoC)
├── frontend/       # Placeholder for future UI (not implemented yet)
└── README.md       # This document
```

At this stage, **all meaningful work is in the backend**.

---

## Backend Overview

The backend is built with **NestJS**, using a **module-first, adapter-driven architecture**.

Key principles:

* External systems are treated as **adapters**
* Business logic is **decoupled from transport**
* The system is designed to scale to multiple signal sources (Telegram today, others later)
* Everything is observable and testable from the start

---

## High-Level Architecture

```
External Source (Telegram)
        |
        v
[ Adapter Layer ]
        |
        v
[ Internal Events ]
        |
        v
[ Domain / Decision Logic ]
        |
        v
[ Execution + Observability ]
```

Only **Step 1** is implemented so far.
The remaining steps are intentionally planned and documented.

---

## Step-by-Step System Design

### ✅ Step 1 — Signal Ingestion (Completed)

**Objective:**
Reliably receive external signals and bring them into the system in a controlled, observable way.

**What this includes:**

* Telegram bot integration
* Long polling handled by the Telegram library
* A dedicated **Telegram adapter module**
* Strong boundaries between external input and internal logic
* Structured logging for observability

**Why this matters:**
Before parsing, validating, or sending anything to an LLM, a real system must first prove that:

* Signals arrive reliably
* Failures are visible
* The ingestion boundary is stable

This step intentionally avoids business logic.

---

### ⏭ Step 2 — Internal Event Emission (Planned)

**Objective:**
Convert incoming external signals into internal domain events.

**Why:**

* Decouples ingestion from processing
* Makes the system extensible (Kafka / queues later)
* Enables retries, idempotency, and replay
* Keeps adapters dumb and replaceable

---

### ⏭ Step 3 — Parsing & Normalization (Planned)

* Extract structured intent from raw messages
* Prepare clean payloads for validation and LLM usage

---

### ⏭ Step 4 — Validation & Idempotency (Planned)

* Prevent duplicate signal execution
* Validate message integrity and business rules

---

### ⏭ Step 5 — Domain Decision Layer (Planned)

* Decide whether a signal should be acted upon
* Prepare execution commands

---

### ⏭ Step 6 — Execution Adapter (Planned)

* Broker / exchange integration (mocked initially)
* Strict isolation from domain logic

---

### ⏭ Step 7 — Observability & Metrics (Planned)

* Structured logs
* Tracing
* Failure visibility
* Auditability (critical for fintech)

---

## Why NestJS + Module Architecture

NestJS is used intentionally for:

* Strong module boundaries
* Dependency injection
* Testability
* Long-term maintainability

Every external system (Telegram, future Discord, Webhooks, REST APIs) is expected to live in its **own adapter module**.

This prevents:

* God services
* Transport-coupled business logic
* Fragile systems that collapse under growth

---

## Logging & Observability

* Logging is enabled from day one
* Logs currently go to **stdout** (correct for development)
* In production, logs would be shipped by the runtime (Docker / cloud provider)

This matches how real production systems operate.

---

## Current Status

* Telegram bot connected and receiving messages
* NestJS app bootstraps cleanly
* Adapter boundary verified
* Logging verified in development

The system is intentionally stopped at **Step 1**, because later steps build on this foundation.

---

## How This PoC Is Meant To Be Used in an Interview

This repository is meant to:

* Be discussed, not just read
* Serve as a base for live feature additions
* Demonstrate architectural thinking over code volume

The most important part is not *what is built*, but **why it is built this way**.

---

## Final Note

This PoC reflects how I would start a real production system:

* Small
* Observable
* Correctly structured
* Ready to grow without rewrites