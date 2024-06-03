// const AWS = require('aws-sdk');
// import Client from "ssh2-sftp-client";
const fs = require('fs')
const SSH = require('simple-ssh');

async function test () {
  // let sshPrivateKey = process.env.sshPrivateKey;
  // const sshPrivateKey = "chiave da usare";
  // const pemfile = 'fileDellaChiave';


  // const machineIp = _event.pathParameters.machineIp;
  const machineIp = "34.242.61.173";

  // Log del valore per debugging (opzionale)
  console.log('machineIp:', machineIp);


  let instanceIP = machineIp;
  // const instanceIP = _event.instanceIP;
  const user = 'ec2-user';
  const cmd = 'echo "HELLO WORLD!"'
  // const cmd = 'ping www.google.it'

  try {
    const ssh = new SSH({
      host: instanceIP,
      user: user,
      key: fs.readFileSync('../src/keys/key.pem')
    });

    let prompt = new Promise(function (resolve, /* reject */) {

      let ourout = "";

      ssh.exec(cmd, { /// start cmd
        exit: function () { /// when cmd ends
          ourout += "\nsuccessfully exited!";
          resolve(ourout);
        },
        out: function (stdout) { /// get cmd output
          ourout += stdout;
          console.log("output",ourout += stdout)
        }
      }).start({
        success: function () {
          console.log("successful connection!");
        },
        fail: function (e) {
          console.log("failed connection, boo");
          console.log(e);
        }
      });

    });

    const res = await prompt;

    const response = {
      statusCode: 200,
      body: res,
    };
    console.log("response: ", response)
    return {
      statusCode: 200,
      body: JSON.stringify(res)
    };
    // return response;

  } catch (error) {
    console.log(error);
  }
}

// const call: any = async (_event): Promise<any> => {
//   // let sshPrivateKey = process.env.sshPrivateKey;
//   // const sshPrivateKey = "chiave da usare";
//   // const pemfile = 'fileDellaChiave';


//   const machineIp = _event.pathParameters.machineIp;

//   // Log del valore per debugging (opzionale)
//   console.log('machineIp:', machineIp);


//   let instanceIP = machineIp;
//   // const instanceIP = _event.instanceIP;
//   const user = 'ec2-user';
//   const cmd = 'echo "HELLO WORLD!"'

//   try {
//     const ssh = new SSH({
//       host: instanceIP,
//       user: user,
//       // key: fs.readFileSync(pemfile)
//       key: `
//       -----BEGIN RSA PRIVATE KEY-----
//       MIIJKAIBAAKCAgEA7O1g4aZQRJhp/8RJcQ8bIAOmJ0CgIgIRmpLvfQy3tKwgCQup
//       IVQoyEvZbv5nS5Otg37zzMAKid8c4dBhD/eyEGqepc5lPjzXhvN4KioQnZR7U0hc
//       dZOWuxgjtNc/3CuoAwJcLtHdbv8GyF0ArohuOIXh6SxC+/4sNZA44eAKyFb7amYT
//       PIgavJe1Lg25czKK5xCoaNDCAkKAi8zaYxpqL1j1/Rq5z/8wFIJPqizIWEmY+GHN
//       Chawfj0I9TBBi8pqSdEt1j4PjkHKkjOc25dYUUuCN412EfIuL346p3nGOJhYIk4G
//       QLvuU9SYiLn4lRsFhFK3sqJsn57QhfKSRvPyJWG0O/yYRXXwjdUrCWCL9Nvqke8L
//       gH3kwITFrDsbhKi7Ns7/3sAKL830sDEup3sPh+AzW6ybPSpmzOCgOhl3hx1YqwXA
//       CaCVnwDL+62PIq9FEvCQbQpFsWC7EMZu+MRP3FgldGIZQYpb5VGivUvW1nWVgJvx
//       W25NtJ0rxeT9BcNjXgofkkROECvQgvGOyR5Jo/jCj2617wq+tSuIu6xVus2ims4Y
//       pqEeuBzUN/AreAuF3K9N+i54zH0h5GHjNqUD+ZiQuH7mZdjUS8wfJhI7is/SUFCl
//       hXfoLityYZRjNvdvG9AVLaCpcQ/bHZqnts+VX0gP61tBo7uEJyij6HHSkFMCAwEA
//       AQKCAgAx2I81aiQhCl/iq403+BGg3qOqRnJqNT025Ar2qCJOJJhozsc6d9ZMrYiF
//       TYi14c/zhlYMkaql7wbIi2qgTWBtC8Fs6MtsGKjPf5GcbVUpkf+QOf0Zz386xY1d
//       kpug2p5yY6C5SPXpUEZBCTAHiDSIN8Kbp/A/y+3JJxqQiu45z/L9I5SQe6IEY3Z+
//       xexqTAvlKSAFTUZD63HX97VKfFgyteiq42CMXgfjiLbx+pH74SAJwam9oaBoLrcf
//       vpNLsb5C4XtfQ5dKOpU/xRQPLvwpvlUbEuvwQp9s5oW4jmohpguEzB2MqP0vLd8Z
//       hObDl/fFKxHyxzFLM8JzK+GSg+hBhXDXbIonrVs0VeUksXECtZWru+J5zBhT+GTS
//       k1Xt5LGkc9TJPVdlyNonT81rgOqEaEsv54rHGRQA+Ss2T/JPhDSmLTaDzTI8DdhV
//       loy1upqJObzGFE1FoJ62bSRhdRgz9P4cq/hs9Et3inQrCxuO77R75ULicKAAfoBB
//       v2agii9J1YMVnrk5P8GTOc2t8FDPRlDFsmpbbxs9NmXuFPu+t5sPCnlnMWb8fvyJ
//       4SbKyxK/qrF6j103+A+NHIlJGgTQ95pxO4NYF+BWyFUhE8KbIw5JURRr/wAwQ0rk
//       N5zDHJCKN9et32DSCNQnPoDp/nsBFAM8vauagdMrEWvAlJmL4QKCAQEA/AUGCQ83
//       0U5EIHeLbZ8wiuHbpCdo5eXPXxza7ufVyUxVyp29A9OQ3QroL6eKZC8fR0FQg2Wo
//       3Z6BML0pWzmNi75TBy7hArgPbREl8CAXPwJ880Exhd7DjWlra392T0VCMMpqIak4
//       0kiMSwDQTSIzZB2DZKE9T9gWDxrr6qKxGHCDfI+/eq0dw0jydEjWK19f6RYrlQml
//       8RZHjp8Rl8tSlvEe4s8EEvM12WZXTYfxFUiOU6+PDwVST/Srf1ho+OldhQcxCjEy
//       9wFaa4a9NPrniqv+yofLuHBlJdVFMKDs7qKwFjIPVHse9xKaoOwH/oLbOnMEVqMl
//       Y9YirBVooEXdDwKCAQEA8KtVMTjqJv5/KHTpJKcG4uNnw0/SszZrJ7ll+myMljbJ
//       Jl/1SKQuftbqDvTk01R2zfrgtB0rqOQImgyEK6BjpngP652w5yEx/6IdR8Bcxi7C
//       eHtsz5KjAMOqCWl7mOG8S2lEvF6jZ6LV6Hw+jdhSWmj+mEEyCCJFPSyyeVfhicEY
//       Gxk7/bYwGz0q1CY92QTceW3uTMldMxUAVcfKHBT+6hcubf162CyWbXIFN8FiPTXn
//       GWzb2GGXVv+GpC/xoXK1sNjByzf9uJj3Aln/r1xvLYGWFaSTScAirCMZOVWC0wkL
//       sPCaaoGfYO4891qIInNxbieevSrbE3iaRers1jBgfQKCAQBd7N1f+Pz7k+jOFN+w
//       /lhQGncKiemNbQXJU+7AhUTnHf0HY5xzVaEy0ILSZ+WrCujkXJJONlAmMJHDgWxt
//       ZFi9kTROhAk2QzT0mCSEhuFDCYFaA50aYHiPNo/jY4DLcGuH1ZiSbQgRTxqCRY5c
//       gPeYQ2uZ0IISRN2LyaPNMc9A5YYLoWNirCxggMpjzlWLmqMbMrkRdaQT4xLOM7iR
//       0yQ3vyucqjzBd0VFfd/htF2EaiMpS0/M8FXKGMzlzCRrSEYjcxeyzb1J04ZIdtID
//       cdNjmlB+WPfzCGiaHg8IXaGQGq/3xbZy7OQQfy2D9hPQpiJgeUdPpsQjnkYTznLM
//       8Ny/AoIBAQDlFGCR6rfOiB4nNykYLzg5zPVejmNjHGBgvnNYK+yhquJKeboy+7wa
//       FZ1SwT3x/grbw3oRV1bQesXJRDKmiBNySAP3ZPEW/5zk072FJ4/nQGjxX6JR7iTj
//       vFrkfJgeDHg7W6cGmhp1siRkF6c/QvIYhqoX6K6j2WMIeLwlDkZq5fZ5DMryk3E0
//       7EMRDpl+McdeegoC4wSoc8wO2o4BruZ5kbkrDsTYcZB5+rcGvDczRlSD+f9E9pek
//       QrM5Iz2fTF2vSJMmSVRjWo57mYjrtVNKAHgIf8+GurEGIp6G2WMeVxTexhZlXJ6F
//       GB/F3lGIYVRN4r6RFvLSlNBbzuLCeefNAoIBAA7/dyGuun+EVGhaM15HKLNs/IqA
//       5N6BHNU3VSWk1mf5d2tqugeQNYB41W8tdto6ZGtqyQkQQ2RL0b7h1DMQMShJUD1+
//       xY3X7UjFXMV+IMTHm5DiRINQOyWljH4xq3BxAOdxjci2CToB8fvNWF9jfeEopOI0
//       5nGzcCQpVC3gOaMtMxvaM6gdq96kleDeC+Q4ZLfQwB34pm4z08/HxRo7nv9gi5tI
//       Cw5Sk/1i4+C46kOnQ6+/5qrpNGhN8maclsTq2SQaj8J7X9jXcIsnoQu+qdvCnIuc
//       s7QhBnLz3wjVSP/CP6Awbg9rLZxXJlOhDPfjFZahG+syclmUQedeVowFv5U=
//       -----END RSA PRIVATE KEY-----
//       `,
//     });

//     let prompt = new Promise(function (resolve, /* reject */) {

//       let ourout = "";

//       ssh.exec(cmd, { /// start cmd
//         exit: function () { /// when cmd ends
//           ourout += "\nsuccessfully exited!";
//           resolve(ourout);
//         },
//         out: function (stdout) { /// get cmd output
//           ourout += stdout;
//         }
//       }).start({
//         success: function () {
//           console.log("successful connection!");
//         },
//         fail: function (e) {
//           console.log("failed connection, boo");
//           console.log(e);
//         }
//       });

//     });

//     const res = await prompt;

//     const response = {
//       statusCode: 200,
//       body: res,
//     };
//     console.log("response: ", response)
//     return {
//       statusCode: 200,
//       body: JSON.stringify(res)
//     };
//     // return response;

//   } catch (error) {
//     console.log(error);
//   }
// };

test();