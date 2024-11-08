(async function(){
  const whois = require('whois-parsed');

  var results = await whois.lookup('bbc.co.bw');
  console.log(JSON.stringify(results, null, 2));
})()

