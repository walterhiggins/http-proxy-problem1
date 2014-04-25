http-proxy-problem1
===================

source code required to reproduce http-proxy problem 

Version 1.2.1 of http-proxy introduces an intermittent problem when using https.

If the options.agent property is false or omitted (which it has to be otherwise https connections time out) then http-proxy sets the 
header.connection to 'close' on the outgoing request. 

This results in response  closing before all data is received.

To reproduce this problem :

    node proxyprob.js
    
then visit ...

https://localhost:8010/static/select2.js 

..in chrome (the problem is more visible in chrome because it won't try to render the response body if its
length is shorter than the header content.length says it should be) or any browser.

To rememdy the problem remove or comment out line 55 of common.js

https://github.com/nodejitsu/node-http-proxy/blob/master/lib/http-proxy/common.js#L55

The problem occurs intermittently but should be reproducible on a couple of reloads.
