/**
 * Test Script for BFHL API
 * Tests all endpoints to verify functionality
 */

const http = require('http');

// Test configuration
const BASE_URL = 'http://localhost:4000';

/**
 * Make HTTP request
 */
function makeRequest(method, path, data = null) {
    return new Promise((resolve, reject) => {
        const url = new URL(path, BASE_URL);
        const options = {
            hostname: url.hostname,
            port: url.port,
            path: url.pathname,
            method: method,
            headers: {}
        };

        if (data) {
            const body = JSON.stringify(data);
            options.headers['Content-Type'] = 'application/json';
            options.headers['Content-Length'] = Buffer.byteLength(body);
        }

        const req = http.request(options, (res) => {
            let responseData = '';
            res.on('data', (chunk) => responseData += chunk);
            res.on('end', () => {
                try {
                    const parsed = JSON.parse(responseData);
                    resolve({ status: res.statusCode, data: parsed });
                } catch (e) {
                    resolve({ status: res.statusCode, data: responseData });
                }
            });
        });

        req.on('error', reject);

        if (data) {
            req.write(JSON.stringify(data));
        }

        req.end();
    });
}

/**
 * Run all tests
 */
async function runTests() {
    console.log('🧪 Testing BFHL API\n');
    console.log('='.repeat(60));

    try {
        // Test 1: Health Check
        console.log('\n✅ Test 1: GET /health');
        const health = await makeRequest('GET', '/health');
        console.log(`Status: ${health.status}`);
        console.log(`Response:`, JSON.stringify(health.data, null, 2));

        // Test 2: Fibonacci
        console.log('\n✅ Test 2: POST /bfhl - Fibonacci');
        const fibonacci = await makeRequest('POST', '/bfhl', { fibonacci: 7 });
        console.log(`Status: ${fibonacci.status}`);
        console.log(`Response:`, JSON.stringify(fibonacci.data, null, 2));

        // Test 3: Prime
        console.log('\n✅ Test 3: POST /bfhl - Prime');
        const prime = await makeRequest('POST', '/bfhl', { prime: [2, 4, 7, 9, 11] });
        console.log(`Status: ${prime.status}`);
        console.log(`Response:`, JSON.stringify(prime.data, null, 2));

        // Test 4: LCM
        console.log('\n✅ Test 4: POST /bfhl - LCM');
        const lcm = await makeRequest('POST', '/bfhl', { lcm: [12, 18, 24] });
        console.log(`Status: ${lcm.status}`);
        console.log(`Response:`, JSON.stringify(lcm.data, null, 2));

        // Test 5: HCF
        console.log('\n✅ Test 5: POST /bfhl - HCF');
        const hcf = await makeRequest('POST', '/bfhl', { hcf: [24, 36, 60] });
        console.log(`Status: ${hcf.status}`);
        console.log(`Response:`, JSON.stringify(hcf.data, null, 2));

        // Test 6: AI (if API key is configured)
        console.log('\n✅ Test 6: POST /bfhl - AI');
        const ai = await makeRequest('POST', '/bfhl', { AI: 'What is the capital city of Maharashtra?' });
        console.log(`Status: ${ai.status}`);
        console.log(`Response:`, JSON.stringify(ai.data, null, 2));

        // Test 7: Error case - Invalid input
        console.log('\n✅ Test 7: Error Handling - Invalid fibonacci');
        const error1 = await makeRequest('POST', '/bfhl', { fibonacci: -5 });
        console.log(`Status: ${error1.status}`);
        console.log(`Response:`, JSON.stringify(error1.data, null, 2));

        // Test 8: Error case - Multiple keys
        console.log('\n✅ Test 8: Error Handling - Multiple keys');
        const error2 = await makeRequest('POST', '/bfhl', { fibonacci: 5, prime: [2, 3] });
        console.log(`Status: ${error2.status}`);
        console.log(`Response:`, JSON.stringify(error2.data, null, 2));

        // Test 9: 404 Not Found
        console.log('\n✅ Test 9: 404 Not Found');
        const notFound = await makeRequest('GET', '/invalid-endpoint');
        console.log(`Status: ${notFound.status}`);
        console.log(`Response:`, JSON.stringify(notFound.data, null, 2));

        console.log('\n' + '='.repeat(60));
        console.log('✅ All tests completed!\n');

    } catch (error) {
        console.error('❌ Test failed:', error.message);
        process.exit(1);
    }
}

// Run tests
runTests();
