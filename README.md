# BFHL API

A REST API with mathematical operations and AI integration.

## Endpoints

### GET /health
Health check endpoint.

**Response:**
```json
{
  "is_success": true,
  "official_email": "your_email@chitkara.edu.in"
}
```

### POST /bfhl
Main API endpoint supporting multiple operations.

#### Operations

| Key | Input | Output |
|-----|-------|--------|
| fibonacci | Integer | Fibonacci series |
| prime | Integer array | Prime numbers from array |
| lcm | Integer array | LCM value |
| hcf | Integer array | HCF value |
| AI | String question | Single-word AI response |

#### Examples

**Fibonacci:**
```json
// Request
{ "fibonacci": 7 }
// Response
{ "is_success": true, "official_email": "...", "data": [0,1,1,2,3,5,8] }
```

**Prime:**
```json
// Request
{ "prime": [2,4,7,9,11] }
// Response
{ "is_success": true, "official_email": "...", "data": [2,7,11] }
```

**LCM:**
```json
// Request
{ "lcm": [12,18,24] }
// Response
{ "is_success": true, "official_email": "...", "data": 72 }
```

**HCF:**
```json
// Request
{ "hcf": [24,36,60] }
// Response
{ "is_success": true, "official_email": "...", "data": 12 }
```

**AI:**
```json
// Request
{ "AI": "What is the capital city of Maharashtra?" }
// Response
{ "is_success": true, "official_email": "...", "data": "Mumbai" }
```

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create `.env` file from example:
   ```bash
   cp .env.example .env
   ```

3. Configure environment variables in `.env`:
   - `OFFICIAL_EMAIL`: Your Chitkara email
   - `GEMINI_API_KEY`: Your Google Gemini API key (get from https://aistudio.google.com)

4. Start the server:
   ```bash
   npm start
   ```

## Deployment

### Vercel
1. Login to Vercel → New Project → Import repository
2. Configure runtime (Node.js)
3. Add environment variables
4. Deploy

### Railway
1. New Project → Deploy from GitHub
2. Select repository
3. Configure environment variables
4. Deploy

### Render
1. New Web Service → Select repository
2. Choose Node.js runtime
3. Build command: `npm install`
4. Start command: `npm start`
5. Add environment variables
6. Deploy

## Tech Stack

- Node.js
- Express.js
- Google Generative AI (Gemini)
