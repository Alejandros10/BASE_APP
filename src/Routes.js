import React from "react"
import { Route, Routes } from "react-router-dom"
import PropTypes from "prop-types"
import { GLOBALS } from "./utils/Globals"
import { CreateEditUser } from './pages/CreateEditUser'
import { Dashboard } from "./pages/Dashboard"
export const Rout = ({ userLogged }) => (
  <>
    <Routes>
      <Route path={GLOBALS.menu.dashboard.link} exact element={<Dashboard/>} />
      <Route path={GLOBALS.menu.profile.link} exact element={<CreateEditUser/>} />
    </Routes>
  </>
);

Rout.propTypes = { userLogged: PropTypes.object.isRequired };
