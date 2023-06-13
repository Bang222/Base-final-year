import React, { FC } from "react";

interface FormLoginProps {
  userName: string,
  hasPassword: string,
}

//bang

const FormLogin: React.FC = ({userName, hasPassword}) => {
  return (
    <div> FormLogin </div>
  );
};

export default FormLogin;