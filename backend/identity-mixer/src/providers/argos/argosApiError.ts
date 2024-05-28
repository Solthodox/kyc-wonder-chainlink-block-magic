interface ArgosApiError {
  success?: boolean;
  errors?: { code: number; message: string }[];
  messages?: { code: number; message: string }[];
}

export default ArgosApiError;
