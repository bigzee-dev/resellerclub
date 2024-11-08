const dotenv = require('dotenv').config()
const axios = require('axios')
const whois = require('whois');

// Replace with your ResellerClub API key
const apiKey = process.env.API_KEY;  
const resellerId = process.env.RESELLER_ID;  // Your ResellerClub account username

function checkDomainAvailability(domain) {
  return new Promise((resolve, reject) => {
    whois.lookup(domain, (err, data) => {
      if (err) {
        reject(`Error: ${err}`);
      } else {
        resolve(data); // Resolve with data so it can be accessed outside
      }
    });
  });
}

async function main() {
  try {
    const domainName = 'bigzee.app'
    const data = await checkDomainAvailability(domainName);

    // Extract the text until the line containing '>>> Last update of WHOIS database:'
    const relevantText = data.split('>>> Last update of WHOIS database:')[0].trim();

    // Split relevant text into lines and initialize an empty object
    const lines = relevantText.split('\n');
    const whoisData = {};

    // Iterate over each line, splitting by the first colon to get key-value pairs
    lines.forEach(line => {
      const [key, ...valueParts] = line.split(':');
      if (valueParts.length > 0) {
        const value = valueParts.join(':').trim();
        const formattedKey = key.trim().replace(/\s+/g, ''); // Remove spaces from the key
        whoisData[formattedKey] = value;
      }
    });

    // console.log(whoisData)
    if (whoisData.DomainStatus === 'No Object Found') {
      console.log(`The domain ${domainName} is available`)
      getDomainPricing(domainName)

    } else {
      console.log(`The domain ${domainName} is not available`)
    }
  } catch (error) {
    console.error(error);
  }
}

main();

async function getDomainPricing(domain) {
  try {
    const extension = domain.split('.').pop(); // Get the domain extension (e.g., 'com')
    
    const response = await axios.get('https://domaincheck.httpapi.com/v2/domain/price.json', {
      params: {
        'auth-userid': resellerId,
        'api-key': apiKey,
        domain: domain,
      },
    });

    // Check if the request was successful
    if (response.data && response.data.price) {
      console.log(`Pricing for ${domain}:`);
      console.log(`Registration Price: ${response.data.price.registration}`);
      console.log(`Renewal Price: ${response.data.price.renewal}`);
      console.log(`Transfer Price: ${response.data.price.transfer}`);
    } else {
      console.log('No pricing data available for this domain.');
    }
  } catch (error) {
    console.error('Error fetching domain pricing:', error);
  }
}

// Example usage:
getDomainPricing('example.com');

