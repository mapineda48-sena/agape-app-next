import { createNamespace } from "cls-hooked";

const webSession: unknown = new Proxy(createNamespace(__filename), {
  get(session, key: string) {
    if (key !== "setUser") {
      return session.get(key);
    }

    return (user: object) => {
      Object.entries(user).forEach(([key, value]: any) =>
        session.set(key, value)
      );
    };
  },

  set(session, key: string, value) {
    session.set(key, value);
    return true;
  },
});

export default webSession as IWebSession;

/**
 * Types
 */

export interface IWebSession {
  id: number;
  fullName: string;
  setUser: (user: unknown) => void;
}
