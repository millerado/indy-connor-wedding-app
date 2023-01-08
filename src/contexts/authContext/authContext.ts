import * as React from "react";

const AuthContext = React.createContext({
  isAuthed: false,
  userId: undefined,
});

export default AuthContext;