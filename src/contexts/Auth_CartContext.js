import React from "react";
import { AuthContext as Context1} from "./AuthContext";
import { CartContext as Context2,  } from "./CartContext";

export const Auth_CartContext = React.createContext();
// This is a reusable piece that could be used by any component that requires both contexts.
const Auth_CartProvider = props => {
  return (
    <Context1.Consumer>
      {context1 => (
        <Context2.Consumer>
          {context2 => (
            <Auth_CartContext.Provider value={{ context1, context2 }}>
              {props.children}
            </Auth_CartContext.Provider>
          )}
        </Context2.Consumer>
      )}
    </Context1.Consumer>
  );
};
export default Auth_CartProvider;