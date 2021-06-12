import React from 'react';
import { toast } from 'react-toastify';
import ToastView from './toastView';

export const TOAST_TYPE_SUCCESS = 'success';
export const TOAST_TYPE_WARN = 'warn';
export const TOAST_TYPE_ERROR = 'error';
export const TOAST_TYPE_INFO = 'info';

export const toastShow = ({
  type = TOAST_TYPE_SUCCESS, message = '', messageParam, onCloseToast, onTextClick, onLinkClick, options = {},
}) => {
  const customOptions = {
    position: 'bottom-right',
    hideProgressBar: false,
    ...options,
  };

  const toastDiv = (
    <ToastView
      message={message}
      messageParam={messageParam}
      type={type}
      onCloseToast={onCloseToast}
      onTextClick={onTextClick}
      onLinkClick={onLinkClick}
    />
  );

  switch (type) {
    case TOAST_TYPE_SUCCESS:
      toast.success(toastDiv, customOptions);
      break;
    case TOAST_TYPE_WARN:
      toast.warn(toastDiv, customOptions);
      break;
    case TOAST_TYPE_ERROR:
      toast.error(toastDiv, customOptions);
      break;
    case TOAST_TYPE_INFO:
      toast.info(toastDiv, customOptions);
      break;
    default:
      break;
  }
};
