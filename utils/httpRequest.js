const http = require('http');

function httpRequest(options, postData = null) {
  return new Promise(function (resolve, reject) {
    const req = http.request(options, function (response) {
      let data = '';

      response.on('data', function (chunk) {
        data += chunk;
      });

      response.on('end', function () {
        if (response.statusCode === 200) {
          resolve(data);
        } else {
          reject(
            new Error(`HTTP request failed : ${response.statusCode} ${response.statusMessage}`)
          );
        }
      });
    });

    req.on('error', function (error) {
      reject(error);
    });

    if (postData) {
      req.write(postData);
    }

    req.end();
  });
}

module.exports = httpRequest;
