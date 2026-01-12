#!/bin/bash


echo "Starting Autochek Vehicle Valuation & Financing API..."
echo "=================================================="

cd /home/agentx/Documents/autochek-backend


if curl -s http://localhost:3003/api/v1/health > /dev/null 2>&1; then
    echo " API is already running!"
    echo ""
    echo "Swagger Documentation: http://localhost:3003/api/docs"
    echo "Main API: http://localhost:3003/api/v1"
    echo "Health Check: http://localhost:3003/api/v1/health"
    echo ""

    
    if command -v xdg-open > /dev/null 2>&1; then
        echo "Opening Swagger documentation in your browser..."
        xdg-open http://localhost:3003/api/docs
    elif command -v open > /dev/null 2>&1; then
        echo "Opening Swagger documentation in your browser..."
        open http://localhost:3003/api/docs
    else
        echo "Please open http://localhost:3003/api/docs in your browser to access the API documentation"
    fi
else
    echo "Starting the API server..."
    echo ""

    
    if [ ! -d "node_modules" ]; then
        echo "Installing dependencies..."
        npm install --silent
    fi

    echo "Starting development server..."
    echo ""
    echo "Once started, you can access:"
    echo "  Swagger API Docs: http://localhost:3003/api/docs"
    echo "  Main API: http://localhost:3003/api/v1"
    echo "  Health Check: http://localhost:3003/api/v1/health"
    echo ""
    echo "Press Ctrl+C to stop the server"
    echo "=================================================="

    PORT=3003 npx ts-node --transpile-only src/main.ts
fi
