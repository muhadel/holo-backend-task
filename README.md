# Holo Backend Task

---

## Table of Contents

- [Holo Backend Task](#holo-backend-task)
  - [Table of Contents](#table-of-contents)
  - [Overview](#overview)
    - [Features](#features)
    - [Dependencies](#dependencies)
  - [Repository structure:](#repository-structure)
  - [How to run](#how-to-run)
  - [How to run by docker compose](#how-to-run-by-docker-compose)
  - [How to test](#how-to-test)
  - [Swagger Documentation](#swagger-documentation)
  - [ERD](#erd)

---

## Overview

This project provides an API for managing voucher pools, allowing customers to use voucher codes for discounts. The API includes functionality for:

- Generating unique voucher codes.
- Managing and tracking voucher usage.
- Ensuring each voucher is used only once.

### Features

### **1. Customer Management**

- ✅ **Create a customer** → `POST /customers`
- ✅ **Retrieve all customers (paginated)** → `GET /customers?page={page}&limit={limit}`

### **2. Special Offer Management**

- ✅ **Create a special offer** → `POST /special-offers`
- ✅ **Retrieve all special offers (paginated)** → `GET /special-offers?page={page}&limit={limit}`

### **3. Voucher Management**

- ✅ **Generate a unique voucher for a customer** → `POST /vouchers/generate`
- ✅ **Redeem a voucher** → `POST /vouchers/redeem`
- ✅ **Retrieve all vouchers** → `GET /vouchers`
- ✅ **Retrieve all valid vouchers by customer email** → `GET /vouchers/customer/:email`

### **4. OpenAPI Documentation**

- ✅ **Swagger API Docs** → `GET /api-docs`

### Dependencies

| Dependencies |  Version  |
| :----------- | :-------: |
| Node.js      | >= 20.x.x |
| TypeScript   | >= 4.3.5  |
| NestJS       | >= 9.x.x  |
| Docker       | >= 20.x.x |

---

## Repository structure:

```
- prisma/
- test/
- src/
   - common/
   - config/
   - prisma/
   - customers/
   - special-offers/
   - voucher-codes/
```

## How to run

```bash
# Set up the environment variables
cp .env.example .env

# Install depencies
yarn

# Development mode
yarn start:dev
```

## How to run by docker compose

```bash
docker-compose down -v
docker-compose up --build
```

## How to test

```bash
# Run all tests
yarn test

# Run e2e tests
yarn test test:e2e
```

## Swagger Documentation

You can access Swagger documentation on [http://localhost:3000/api-docs/](http://localhost:3000/api-docs/)

## ERD

<p align="center">
  <img src="https://github.com/user-attachments/assets/4ce97947-68ed-4332-8c3c-8fafeef464cd" width="200">
</p>
