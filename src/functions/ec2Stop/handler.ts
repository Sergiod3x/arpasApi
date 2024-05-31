const AWS = require('aws-sdk');
const ec2 = new AWS.EC2();

export const call: any = async (_event, _context, _callbackent): Promise<any> => {
  // let sshPrivateKey = _event.key; 
  // let command = _event.command;
  const machineId = _event.pathParameters.machineId;

  // Log del valore per debugging (opzionale)
  console.log('machineId:', machineId);


  let instanceId = machineId;



  const params = {
    InstanceIds: [instanceId]
  };

  try {
    // Ferma l'istanza EC2
    const data = await ec2.stopInstances(params).promise();
    console.log('Success', data.StoppingInstances);


    return {
      statusCode: 200,
      body: JSON.stringify(data)
    };
  } catch (err) {
    console.log('Error', err);
    return {
      statusCode: 500,
      body: JSON.stringify(err)
    };
  }
};