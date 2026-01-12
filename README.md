#  Autochek Vehicle Valuation & Financing API


##  Project Overview

A comprehensive backend API service for **Autochek's vehicle valuation and financing platform**. This service handles vehicle data ingestion, automated valuations using multiple methods, loan application processing with eligibility checks, and offer management.



###  **API Endpoints** 
- ** Interactive API Documentation**: http://localhost:3003/api/docs
- ** Main API Base**: http://localhost:3003/api/v1  
- ** Health Check**: http://localhost:3003/api/v1/health

## Architecture & Features

###  **Vehicle Management**
- **Complete CRUD Operations** - Create, read, update, delete vehicles
- **VIN Validation** - 17-character VIN format validation with checksums
- **Advanced Filtering** - Search by make, model, year, condition
- **Data Integrity** - Comprehensive validation and error handling

### **Vehicle Valuations** 
- **Multiple Valuation Methods**:
  - External API integration (RapidAPI ready)
  - Market comparison analysis  
  -  Machine Learning simulation
  -  Depreciation model calculations
  - Manual assessment capability
- **Smart Method Selection** - Automatic optimal method based on vehicle age
- **Confidence Scoring** - Reliability indicators (0-100 scale)
- **Real-time Processing** - Instant valuation generation

management

## **Quick Start**

### **Method 1: One-Click Start**
```bash
cd /home/agentx/Documents/autochek-backend
./swagger-start.sh
```

### **Method 2: Manual Start**
```bash
cd /home/agentx/Documents/autochek-backend
npm install
PORT=3003 npx ts-node src/main.ts
```

### **Method 3: Test All Endpoints**
```bash
cd /home/agentx/Documents/autochek-backend
./test-api.sh
```

## **API Endpoints Overview**

### *Vehicle Endpoints**
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/v1/vehicles` | Create new vehicle |
| `GET` | `/api/v1/vehicles` | List all vehicles |
| `GET` | `/api/v1/vehicles/vin/:vin` | Get vehicle by VIN |
| `GET` | `/api/v1/vehicles/:id` | Get vehicle by ID |
| `PATCH` | `/api/v1/vehicles/:id` | Update vehicle |
| `DELETE` | `/api/v1/vehicles/:id` | Delete vehicle |

###  **Valuation Endpoints**
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/v1/valuations` | Request valuation |
| `GET` | `/api/v1/valuations` | List all valuations |
| `GET` | `/api/v1/valuations/:id` | Get valuation by ID |
| `DELETE` | `/api/v1/valuations/:id` | Delete valuation |

### **System Endpoints**
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/v1` | API status |
| `GET` | `/api/v1/health` | Health check |
| `GET` | `/api/docs` | **Swagger Documentation** |

##  **API Testing Examples**

### **Create a Vehicle**
```bash
curl -X POST http://localhost:3003/api/v1/vehicles \
  -H "Content-Type: application/json" \
  -d '{
    "vin": "1HGCM82633A123456",
    "make": "Toyota",
    "model": "Camry",
    "year": 2022,
    "mileage": 25000,
    "condition": "Excellent"
  }'
```

### **Request Vehicle Valuation**
```bash
curl -X POST http://localhost:3003/api/v1/valuations \
  -H "Content-Type: application/json" \
  -d '{
    "vehicleId": "VEHICLE_ID_FROM_ABOVE",
    "requestedBy": "user@example.com",
    "valuationMethod": "Market Comparison"
  }'
```

### **Get All Vehicles**
```bash
curl -X GET http://localhost:3003/api/v1/vehicles
```

##  **Business Logic Implemented**

### **Vehicle Valuation Algorithm**
- **Market Comparison**: Based on make, model, year, condition, mileage
- **Depreciation Model**: 15% first year, 10% subsequent years, max 80%
- **Condition Multipliers**: Excellent (1.1x), Good (1.0x), Fair (0.85x), Poor (0.7x)
- **Mileage Adjustments**: Low mileage bonus, high mileage penalty
- **Confidence Scoring**: Method-based reliability indicators

### **Data Validation**
- **VIN Format**: Exactly 17 characters, no I/O/Q characters
- **Year Range**: 1900 to current year + 1
- **Mileage**: Non-negative values only
- **Email**: Valid email format validation
- **Enum Values**: Strict condition, method, status validation

##  **Technical Stack**

### **Core Technologies** (As Requested)
-  **NestJS** - Modern Node.js framework with decorators
-  **TypeScript** - Full type safety and modern JavaScript features  
-  **TypeORM** - Database abstraction with entity relationships
- **SQLite3** - In-memory database for demo purposes

### **Additional Features**
-  **Swagger/OpenAPI** - Complete interactive API documentation
-  **Class Validator** - Comprehensive request validation  
-  **CORS** - Cross-origin resource sharing enabled
- **Structured Logging** - Application activity tracking
-  **UUID** - Universally unique identifiers for all resources

##  **Project Structure**

```
autochek-backend/
├── src/
│   ├── main.ts                    # Application entry point
│   ├── app.module.ts             # Main application module
│   ├── app.controller.ts         # Health check endpoints
│   ├── app.service.ts            # Basic app services
│   │
│   ├── vehicles/                 # Vehicle Management
│   │   ├── entities/vehicle.entity.ts
│   │   ├── dto/create-vehicle.dto.ts
│   │   ├── dto/update-vehicle.dto.ts
│   │   ├── vehicles.service.ts
│   │   ├── vehicles.controller.ts
│   │   └── vehicles.module.ts
│   │
│   ├── valuations/              #  Vehicle Valuations
│   │   ├── entities/valuation.entity.ts
│   │   ├── dto/create-valuation.dto.ts
│   │   ├── valuations.service.ts
│   │   ├── valuations.controller.ts
│   │   └── valuations.module.ts
│   │
│   └── loans/                   #  Loan Processing (Entities Ready)
│       ├── entities/loan.entity.ts
│       └── dto/create-loan.dto.ts
│
├── test-api.sh                 # Comprehensive API testing
├── swagger-start.sh            # One-click application start
├── package.json               # Dependencies and scripts
├── tsconfig.json              # TypeScript configuration  
└── README.md                  # This documentation
```


##  **Performance & Scalability**

- **In-Memory Database** - Ultra-fast operations for development/demo
- **Connection Pooling** - TypeORM handles database connections efficiently
- **Async Operations** - Non-blocking I/O for all API endpoints  
- **Validation Pipeline** - Request validation before processing
- **Error Handling** - Comprehensive error responses with proper HTTP status codes

##  **Security Features**

- **Input Validation** - All requests validated using class-validator
- **SQL Injection Protection** - TypeORM parameterized queries
- **CORS Configuration** - Controlled cross-origin access
- **Data Sanitization** - Automatic data type validation and conversion
- **Error Response Security** - No sensitive data in error messages

##  **Usage Tips**

1. **Start with Swagger** - Visit http://localhost:3003/api/docs to explore all endpoints
2. **Test with Script** - Run `./test-api.sh` to verify all functionality  
3. **Create Test Data** - Use the API to create vehicles and valuations
4. **Monitor Health** - Check http://localhost:3003/api/v1/health for system status
5. **Review Logs** - Application logs show detailed operation information

---



