const { SSM } = require("@aws-sdk/client-ssm");
const SSH = require('simple-ssh');
const sm = new SSM();

export const call: any = async (_event): Promise<any> => {
  let sshPrivateKey = process.env.sshPrivateKey;
  // console.log('sshPrivateKey:', sshPrivateKey);

  const decryptedAuthorizedPrivateKey = await sm.getParameter({
    Name: sshPrivateKey,
    WithDecryption: true,
  });

  const machineIp = _event.pathParameters.machineIp;
  // console.log('machineIp:', machineIp);
  const command = _event.pathParameters.cmd;
  // console.log('command:', command);
  const user = _event.pathParameters.user;

  let instanceIP = machineIp;
  const cmd = command.replaceAll('%20', ' ')

  try {
    const ssh = new SSH({
      host: instanceIP,
      user: user,
      key: decryptedAuthorizedPrivateKey.Parameter.Value
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

  } catch (error) {
    console.log(error);
  }
};