#!/bin/bash
echo "🚀 Starting Deployment..."

# 1. Pull latest code
git pull origin main

# 2. Build Frontend
echo "📦 Updating Frontend..."
cd frontend && npm install && npm run build && cd ..

# 3. Update Backend
echo "⚙️ Updating Backend..."
cd backend && npm install && cd ..

# 4. Restart Everything
echo "🔄 Refreshing PM2 Processes..."
pm2 restart all

# 5.Optional addition to deploy.sh
sudo nginx -t && echo "Nginx configuration is valid!"

echo "✅ Deployment Complete!"