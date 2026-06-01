const { test, expect } = require('@playwright/test');
const fs = require('fs');

test('Login API and save token', async ({ request }) => {
  const response = await request.post('https://app.middleware.io/api/v1/auth/login', {
    headers: {
      'Content-Type': 'application/json',
      'Cookie': 'has_refresh_token=1; refresh_token=cb2b66df9d264104b223f6b6a563055e'
    },
    data: {
      "email": "ClUdN1Q2Juhmbtd2jJI77JR+qOncInxkBh1o54OHBtJoT0nxjW08rQD75KmVK8CHfanwor9hRgikCsuheDMHL1eYYB944n/isZpuLS0kAIZB5NJpk+Fbx/UinTwYjWu2uL1gamL6qHgT1xZM2fb+CgpqpaGlZ+KP4pfVazrFVFAKqzjv1pUkp6KnMilYktxTo01RYnrPCF0TrrkyMGWt4bKfan0/fQJ4lxbYRexYk8f/3xSgTvrnBAgL7AplyAzahwtCzxPLHI1fRRRi0fi7NgtuQ1Li2w24wEDjQTdtw/m8WYB0i527wf7izd+Z9M9LLHe2LO80yjtNY3nfhQceWA==",
      "password": "IIXBR7kmEaOyDLFNFa13crxqvwSdEp21ZvnWddyV99uxR2dxkQ9/CCQJgC2YkX9TGU3yN4+uWGT2/oHY5XstsOBG3WskynyFjJ27mi7rk2qFjud6B23X6O8n6lrW9p25EhK4t7+XHkvEQcqs9yMXbxIHIPllIVsbKQ2znFzpj0YR8AOe7Sv7SuyZaF7Bl7Ch/lY2vM+xdmkfUhCnyDg67HUydZxy8b4rwhUSghJGYvXM4vSYDonjACP114Iqp3fXDNPH+ApoJymQsJ9AzQN9K2KGcNTqyHvPGvQn9XdXgFkJ2a96MJmQme1vWrxJiRi4Czm5n335fLMbSOB05QWFFQ=="
    }
  });

  expect(response.ok()).toBeTruthy();

  const resJson = await response.json();
  const token = resJson.token;

  // Save to file
  fs.writeFileSync('./token.json', JSON.stringify({ token }));

  console.log("✅ Token saved to token.json:", token);
});


