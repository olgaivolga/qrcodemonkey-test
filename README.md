# qrcodemonkey-test

The case study emphasizes Cypress skills so for demonstration purposes everything is tested in the browser.

Test:
- use web UI to generate QR codes

Verify:
- generated requests contain expected payload
- resulting QR code contains expected information
- resulting QR code matches snapshot


In a different situation splitting higher level tests into two suites can be suggested:

1. QRCode Monkey API is available so we can create faster tests for QR code data and image that dont need a browser.
2. We also need to make sure that web UI settings are correctly interpreted by frontend code into API requests. For that Cypress can be used. These tests are slower but we may need a smaller number of them.

