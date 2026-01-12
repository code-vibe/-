#!/bin/bash
echo "Testing Autochek Backend API - All Endpoints"
echo "=============================================="
BASE_URL="http://localhost:3003/api/v1"
echo "Using API base: $BASE_URL"
echo ""

echo "1. Testing Health Check..."
curl -s "$BASE_URL/health" > /dev/null && echo "    Health endpoint working" || echo "    Health endpoint failed"
curl -s "$BASE_URL/" > /dev/null && echo "   Root endpoint working" || echo "    Root endpoint failed"



echo ""
echo "2.  Testing Vehicles API..."
curl -s "$BASE_URL/vehicles" > /dev/null && echo "    GET /vehicles working" || echo "    GET /vehicles failed"

echo "   Creating test vehicle..."
VEHICLE_RESPONSE=$(curl -s -X POST "$BASE_URL/vehicles" \
  -H "Content-Type: application/json" \
  -d '{
    "vin": "1HGCM82633A987654",
    "make": "Honda", 
    "model": "Accord",
    "year": 2022,
    "mileage": 25000,
    "condition": "Excellent"
  }')
if [[ $VEHICLE_RESPONSE == *"id"* ]]; then
  echo "    POST /vehicles working"
  VEHICLE_ID=$(echo $VEHICLE_RESPONSE | grep -o '"id":"[^"]*"' | cut -d'"' -f4)
  echo "    Created vehicle ID: $VEHICLE_ID"
  
  curl -s "$BASE_URL/vehicles/vin/1HGCM82633A987654" > /dev/null && echo "    GET /vehicles/vin/:vin working" || echo "   GET /vehicles/vin/:vin failed"
  
  curl -s "$BASE_URL/vehicles/$VEHICLE_ID" > /dev/null && echo "    GET /vehicles/:id working" || echo "   GET /vehicles/:id failed"
else
  echo "   POST /vehicles failed"
  VEHICLE_ID=""
fi

echo ""
echo "3. Testing Valuations API..."
curl -s "$BASE_URL/valuations" > /dev/null && echo "    GET /valuations working" || echo "    GET /valuations failed"
if [[ -n "$VEHICLE_ID" ]]; then
  echo "   Creating test valuation..."
  VALUATION_RESPONSE=$(curl -s -X POST "$BASE_URL/valuations" \
    -H "Content-Type: application/json" \
    -d '{
      "vehicleId": "'$VEHICLE_ID'",
      "requestedBy": "test@example.com",
      "valuationMethod": "Market Comparison",
      "notes": "Test valuation request"
    }')
  if [[ $VALUATION_RESPONSE == *"id"* ]]; then
    echo "    POST /valuations working"
    VALUATION_ID=$(echo $VALUATION_RESPONSE | grep -o '"id":"[^"]*"' | cut -d'"' -f4)
    echo "    Created valuation ID: $VALUATION_ID"
    
    curl -s "$BASE_URL/valuations/$VALUATION_ID" > /dev/null && echo "   GET /valuations/:id working" || echo "    GET /valuations/:id failed"
  else
    echo "    POST /valuations failed"
  fi
else
  echo "   Skipping valuation tests (no vehicle ID)"
fi

echo ""
echo "4.  Testing API Documentation..."
SWAGGER_RESPONSE=$(curl -s "http://localhost:3003/api/docs")
if [[ $SWAGGER_RESPONSE == *"swagger"* ]] || [[ $SWAGGER_RESPONSE == *"Swagger"* ]]; then
  echo "   Swagger documentation available at http://localhost:3003/api/docs"
else
  echo "    Swagger documentation not accessible"
fi
echo ""
echo "=============================================="
echo " API Testing Complete!"
echo ""
echo " Access URLs:"
echo "    Main API: http://localhost:3003/api/v1"
echo "    Swagger Docs: http://localhost:3003/api/docs"
echo "    Health Check: http://localhost:3003/api/v1/health"
echo ""
