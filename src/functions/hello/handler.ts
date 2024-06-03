
export const call: any = async (_event, _context, _callbackent): Promise<any> => {
  try {
    console.log("HELLO WORLD!");
  } catch (err) {
    console.log('Error', err);
  }
};