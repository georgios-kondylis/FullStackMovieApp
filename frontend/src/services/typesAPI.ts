export type HandleSubmitProps = {
  e: React.FormEvent;
  formData: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  };
  setUser: (user: any) => void;
  setLoggedIn: (loggedIn: boolean) => void;
  setMessageToUser?: React.Dispatch<React.SetStateAction<string>>;
  navigate?: any;
};
