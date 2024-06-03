// const AWS = require('aws-sdk');
// import Client from "ssh2-sftp-client";
// const fs = require('fs')
const SSH = require('simple-ssh');

export const call: any = async (_event): Promise<any> => {
  let sshPrivateKey = process.env.sshPrivateKey;
  // const sshPrivateKey = "chiave da usare";
  // const pemfile = 'fileDellaChiave';


  const machineIp = _event.pathParameters.machineIp;
  const command = _event.pathParameters.cmd;
  const user = _event.pathParameters.user;

  // Log del valore per debugging (opzionale)
  console.log('machineIp:', machineIp);


  let instanceIP = machineIp;
  // const instanceIP = _event.instanceIP;
  // const user = user;
  const cmd = command.replaceAll('%20',' ')
  // const cmd = 'ping www.google.it'

  console.log('command:', command);

  try {
    const ssh = new SSH({
      host: instanceIP,
      user: user,
      key: sshPrivateKey
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
          console.log("output", ourout += stdout)
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
};