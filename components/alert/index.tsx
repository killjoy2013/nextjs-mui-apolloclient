import React from 'react';
import Alert, { AlertColor } from '@mui/material/Alert';
import { FC } from 'react';
import { useReactiveVar } from '@apollo/client';
import { alertMessageVar } from 'src/cache';

type MyAlertType = {};

const MyAlert: FC<MyAlertType> = (props) => {
  const alertMessage = useReactiveVar(alertMessageVar);

  if (alertMessage) {
    return (
      <Alert severity={alertMessage?.severity}>{alertMessage?.message}</Alert>
    );
  } else {
    return null;
  }
};

export default MyAlert;
