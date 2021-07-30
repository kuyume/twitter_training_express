import { findUserModelByEmail } from '../model/userModel.js';

const authenticator = async ( formData, request ) => {
  if ( request.session.userId ) {
    return true;
  }
  if ( !formData ) {
    return 'formData not exist.';
  }
  if ( !request ) {
    return 'request not exist.';
  }

  const gotUser = await findUserModelByEmail( formData.email );
  if ( !gotUser ) {
    return 'user couldn\'t find.';
  }

  if ( formData.password === gotUser.password ) {
    request.session.userId = gotUser._id;
  } else {
    request.session.userId = null;
  }
  return gotUser;
};

export default authenticator;
