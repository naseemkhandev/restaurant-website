const generateVerificationCodek = (length = 6): string => {
  const characters = "0123456789";
  let verficationCode = "";

  for (let i = 0; i < length; i++) {
    verficationCode += characters.charAt(
      Math.floor(Math.random() * characters.length)
    );
  }

  return verficationCode;
};

export default generateVerificationCodek;
