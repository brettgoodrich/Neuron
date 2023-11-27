import { Outlet, Route, Routes as RRoutes } from "react-router-dom";

import Inspect from "./scenes/Inspect";

export default function Routes() {
  return (
    <>
      <RRoutes>
        <Route path={"/"} element={<Outlet />}>
          <Route path={"inspect"} element={<Inspect />} />
          <Route
            path={"settings"}
            element={<p className={"text-white"}>Settings</p>}
          />
        </Route>
      </RRoutes>
    </>
  );
}