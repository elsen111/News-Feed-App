import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { appRouter } from "./router/AppRouter";
import { store } from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={appRouter} />
    </Provider>
  );
}

export default App;
