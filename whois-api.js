const whoisResponse = `
Domain Name: webmart.co.bw
Registry Domain ID: 27211-bwnic
Updated Date: 2024-06-05T07:00:46.28Z
Creation Date: 2016-07-05T07:32:01.101Z
Registry Expiry Date: 2025-07-05T07:32:01.127Z
Registrar Registration Expiration Date: 2025-07-05T07:32:01.127Z
Domain Status: clientTransferProhibited https://icann.org/epp#clientTransferProhibited
Registry Registrant ID: 7jQJC-dwKOL
Registrant Name: Redacted | Registry Policy
Registrant Organization: Moagae Legacy (Pty) Ltd
Registrant Street: Plot 171
Registrant City: Tlokweng
Registrant Country: BW
Registrant Phone: Redacted | Registry Policy
Registrant Email: Redacted | Registry Policy
Registry Admin ID: hXDoN-5pt8Y
Admin Name: Redacted | Registry Policy
Admin Organization: Moagae Legacy (Pty) Ltd
Admin Street: Plot 171
Admin City: Tlokweng
Admin Country: BW
Admin Phone: +267.3113318
Admin Email: Redacted | Registry Policy
Registry Tech ID: mDYao-HRzoS
Tech Name: Redacted | Registry Policy
Tech Street: Redacted | Registry Policy
Tech City: Redacted | Registry Policy
Tech State/Province: Redacted | Registry Policy
Tech Country: BW
Tech Phone: Redacted | Registry Policy
Tech Email: Redacted | Registry Policy
Registry Tech ID: JDq7B-aqV9F
Tech Name: Redacted | Registry Policy
Tech Organization: Moagae Legacy (Pty) Ltd
Tech Street: Plot 171
Tech City: Tlokweng
Tech Country: BW
Tech Phone: Redacted | Registry Policy
Tech Email: Redacted | Registry Policy
Registry Billing ID: SlBUW-7oAeG
Billing Name: Redacted | Registry Policy
Billing Organization: Moagae Legacy (Pty) Ltd
Billing Street: Plot 171
Billing City: Tlokweng
Billing Country: BW
Billing Phone: Redacted | Registry Policy
Billing Email: Redacted | Registry Policy
Registrar: Webmart
Name Server: dave.ns.cloudflare.com
Name Server: lady.ns.cloudflare.com
DNSSEC: unsigned
>>> Last update of WHOIS database: 2024-11-08T14:00:09.76Z <<<`;

// Extract the text until the line containing '>>> Last update of WHOIS database:'
const relevantText = whoisResponse.split('>>> Last update of WHOIS database:')[0].trim();

// Split relevant text into lines and initialize an empty object
const lines = relevantText.split('\n');
const whoisData = {};

// Iterate over each line, splitting by the first colon to get key-value pairs
lines.forEach(line => {
    const [key, ...valueParts] = line.split(':');
    if (valueParts.length > 0) {
        const value = valueParts.join(':').trim();
        whoisData[key.trim()] = value;
    }
});

console.log(whoisData);
