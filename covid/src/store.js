import thunk from "redux-thunk";
import rootReducer from "./reducers";
import promise from "redux-promise-middleware";
import errorMiddleware from "./middleware/error";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
// import hardSet from "redux-persist/lib/stateReconciler/hardSet";

const middleware = applyMiddleware(errorMiddleware, thunk, promise);
const enhancer = composeWithDevTools(middleware);
const persistConfig = {
  key: "spaces",
  storage
  // stateReconciler: hardSet
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default () => {
  let store = createStore(persistedReducer, enhancer);
  let persistor = persistStore(store);
  return { store, persistor };
};
