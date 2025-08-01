export type HandleSignUpProps = {
  e: React.FormEvent;
  formData: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  };
  setUser?: (user: any) => void;
  setMessageToUser?: React.Dispatch<React.SetStateAction<string>>;
  navigate?: any;
};
export type HandleSignInProps = {
  e: React.FormEvent;
  formData: {
    email: string;
    password: string;
  };
  loggedIn?: boolean
  setLoggedIn?: React.Dispatch<React.SetStateAction<boolean>>;
  setUser?: (user: any) => void;
  setMessageToUser?: React.Dispatch<React.SetStateAction<string>>;
  navigate?: any;
};
