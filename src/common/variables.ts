export const inputValidationRules = {
  required: (val: unknown) => !!val || "Required",
  email: (val: string) => {
    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return pattern.test(val) || "Invalid e-mail.";
  },
  min: (val: string) => val.length >= 8 || "Min 8 characters"
};

export const snackBarTimeout = 2000;
export const successColor = "light-green darken-1";
export const errorColor = "red darken-2";
