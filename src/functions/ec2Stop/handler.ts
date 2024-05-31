const AWS = require('aws-sdk');
const ec2 = new AWS.EC2();

export const call: any = async (_event, _context, _callbackent): Promise<any> => {
  // let sshPrivateKey = _event.key; 
  // let command = _event.command;
  let instanceId = "i-07ec7be845dc07a6e";


  const params = {
    InstanceIds: [instanceId]
  };

  try {
    // Ferma l'istanza EC2
    const data = await ec2.stopInstances(params).promise();
    console.log('Success', data.StoppingInstances);
    return true;

    // return {
    //   statusCode: 200,
    //   body: JSON.stringify(data)
    // };
  } catch (err) {
    console.log('Error', err);
    return {
      statusCode: 500,
      body: JSON.stringify(err)
    };
  }
};