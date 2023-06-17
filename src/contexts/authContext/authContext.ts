import * as React from "react";

export const UnauthedUser = {
  isAuthed: false,
  isAdmin: false,
  userId: undefined,
  name: undefined,
  image: undefined,
  about: undefined,
  teamId: undefined,
};

export const AuthContext = React.createContext(
  UnauthedUser // Default auth status
);