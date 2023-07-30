import { FormForgotPassword } from "./components/FormForgotPassword";
import { FormLogin } from "./components/FormLogin";
import { FormRegister } from "./components/FormRegister";
import { Error500 } from "./components/UI/Error500";
import { Loading } from "./components/UI/Loading";
import { AuthenticationContext, AuthenticationContextProvider } from "./services/context/AuthenticationContext";
import { SessionContext, SessionContextProvider } from "./services/context/SessionContext";
import { getDataAsyncStorage, saveDataAsyncStorage } from "./utils/storage";
import { useWidth } from "./utils/useWidth";

module.exports = {
  AuthenticationContext,
  AuthenticationContextProvider, Error500, FormForgotPassword, FormLogin,
  FormRegister, Loading, SessionContext,
  SessionContextProvider,
  getDataAsyncStorage,
  saveDataAsyncStorage,
  useWidth
}

