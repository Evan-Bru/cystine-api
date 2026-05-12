# Cystine API

Cystine is a modular AI memory architecture designed to transform an Obsidian vault into a persistent contextual brain for artificial intelligence systems.

The goal of the project is to allow different AI providers (OpenAI, Anthropic, local models, or future proprietary systems) to consume structured contextual knowledge stored inside an Obsidian vault.

---

# Vision

Cystine is designed around three evolutionary stages:

## Stage 1 — Local Context Access

AI systems directly access the Obsidian vault locally through MCP (Model Context Protocol).

```text
Obsidian Vault → MCP → AI
```

This stage allows contextual conversations using local markdown files.

---

## Stage 2 — Universal Context API

The vault becomes accessible through a centralized API layer.

```text
Vault → Cystine API → OpenAI / Claude / Local Models
```

This stage introduces:

* Context retrieval
* File indexing
* Structured memory access
* AI provider abstraction
* Shared memory architecture

---

## Stage 3 — Autonomous Intelligence

Cystine evolves into a fully modular AI system capable of:

* Persistent memory
* Semantic retrieval
* Agent orchestration
* Autonomous note creation
* Worldbuilding assistance
* Narrative consistency maintenance
* Knowledge graph generation
* Multi-model orchestration

---

# Core Philosophy

Cystine treats the Obsidian vault as:

```text
A structured external memory system.
```

The vault remains:

* Human-readable
* Markdown-based
* Portable
* Model-independent
* Future-proof

No AI provider owns the memory.

The intelligence layer is replaceable.

---

# Planned Features

## Memory & Retrieval

* Markdown ingestion
* Semantic search
* Vector memory
* File correlation
* Context compression
* Lore consistency analysis

## AI Integration

* OpenAI support
* Anthropic support
* Local model support
* Multi-model routing
* MCP compatibility

## Obsidian Integration

* Vault synchronization
* Automatic indexing
* Semantic connections
* Graph enhancement
* Bidirectional updates

## Agent System (Future)

* Autonomous assistants
* Specialized memory agents
* Worldbuilding agents
* Narrative agents
* Session analysis agents

---

# Current Stack

## Existing

* Obsidian
* MCP Filesystem Server
* Claude Desktop integration
* Smart Connections

## Planned

* Node.js API
* Express backend
* OpenAI SDK
* Vector database
* Embedding pipeline
* Agent orchestration

---

# Project Structure (Planned)

```text
cystine-api/
│
├── src/
│   ├── api/
│   ├── memory/
│   ├── providers/
│   ├── agents/
│   ├── ingestion/
│   ├── embeddings/
│   └── utils/
│
├── vault/
├── config/
├── scripts/
├── docs/
└── README.md
```

---

# Example Architecture

```text
                User
                  ↓
           Cystine API
                  ↓
      ┌───────────┴───────────┐
      ↓                       ↓
 Obsidian Vault          AI Provider
      ↓                 (OpenAI/Claude)
      └───────────┬───────────┘
                  ↓
               Response
```

---

# Goals

The long-term objective of Cystine is to create:

* A persistent AI memory layer
* A modular second-brain architecture
* A provider-independent intelligence system
* A contextual worldbuilding assistant
* A scalable knowledge orchestration framework

---

# Development Philosophy

Cystine is designed to prioritize:

* Transparency
* Portability
* Local ownership of data
* Human-readable memory
* Modularity
* Interoperability

---

# Status

Current Status:

```text
Experimental / Early Architecture
```

The project is actively evolving.

---

# License

MIT License

Copyright (c) 2026 evan_bru (Bruno Manoel)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWAR
