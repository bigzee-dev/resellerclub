const axios = require('axios');
const dotenv = require('dotenv').config()

// Replace these with your actual ResellerClub API key and reseller ID
const apiKey = process.env.API_KEY;
const resellerId = process.env.RESELLER_ID;

console.log(apiKey)
console.log(resellerId)

// Function to check domain availability
async function checkDomainAvailability(fullDomain) {
  // Split the domain into the name and the TLD
  const domainParts = fullDomain.split('.');
  
  // The domain name is the first part
  const domainName = domainParts[0];
  
  // The TLD is everything after the first dot (joined together)
  const tld = domainParts.slice(1).join('.');
  
  console.log("domain: ", domainName)
  console.log("tld: ", tld)
  // ResellerClub API endpoint for checking domain availability
  const endpoint = `https://domaincheck.httpapi.com/api/domains/available.json`;

  try {
    const response = await axios.get(endpoint, {
      params: {
        'auth-userid': resellerId,
        'api-key': apiKey,
        'domain-name': domainName,
        'tlds': tld,
      },
    });

    const availability = response.data;
    console.log(`Domain availability response:`, availability);

    if (availability[fullDomain] && availability[fullDomain].status === 'available') {
      console.log(`The domain ${fullDomain} is available.`);
    } else {
      console.log(`The domain ${fullDomain} is not available.`);
    }
  } catch (error) {
    console.error(`Error checking domain availability:`, error.response ? error.response.data : error.message);
  }
}

// Run the function with a domain as a single string
const domainToCheck = 'bigzee.app';  // Replace with the domain you want to check
checkDomainAvailability(domainToCheck);


