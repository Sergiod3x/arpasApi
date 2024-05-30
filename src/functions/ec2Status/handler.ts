const AWS = require('aws-sdk');
const ec2 = new AWS.EC2();

export const call: any = async (_event, _context, _callbackent): Promise<any> => {
  let sshPrivateKey = _event.key; 
  let command = _event.command;
  let instanceId = _event.instanceId;


  const params = {
    InstanceIds: [instanceId]
  };

  try {
    // Ottieni lo stato dell'istanza EC2
    const data = await ec2.describeInstanceStatus(params).promise();
    console.log('Success', data.InstanceStatuses);
    return true;

    // return {
    //   statusCode: 200,
    //   body: JSON.stringify(data.InstanceStatuses)
    // };
  } catch (err) {
    console.log('Error', err);
    return {
      statusCode: 500,
      body: JSON.stringify(err)
    };
  }
};