enum ResponseMessages {
    tokenIssue= 'Improper token',
    tokenMissing= 'Please send token',
    success= 'Success',
    dbError= 'Unable to process your request, please try again',
    sessionExpire= 'Session expires. Please login again',
    invalidDetails= 'Invalid details',
    tryCatch= 'Something went wrong. Please contact admin.',
    dataIssue= 'Please send proper information',
    registration= 'Registration done successfully',
    invalidEmail= 'Please insert email address in correct format',
    invalidLoginDetails= 'Invalid login details',
    duplicateDetails= 'Email Address or mobile number already exists',
    emailVerify= 'Please complete email verification process',
    emailVerificationSuccess=
      'Email address successfully verified. Please login to continue',
    emailLinkExpired= 'Link has expired.',
    registrationEmailSubject= 'Welcome to typescript sequelize starter',
    passwordChanged= 'Password changed successfully',
    invalidPassword= 'Password is not valid',
    forgotPasswordSubject= 'typescript sequelize starter, Forgot password link',
    resetLink=
      'Reset link sent successfully. You will receive a link shortly if a user is registered.',
    passwordReset= 'Password has been successfully reset. Please login',
    profileUpdate= 'Profile updated successfully',
    allFieldReq= 'Please fill all required fields',
    noData= 'No information available',
    duplicateUser= 'User details already exist',
    accountDisable=
      'Please contact admin. Your account has been deleted or blocked!',
    accountActivated= 'Account is activated',
    accountDeactivated= 'Account is deactivated',
    accountReactivated= 'Account is re-activated',
    notAuthorized= 'You are not authorized to access this page'
};

export default ResponseMessages;
  