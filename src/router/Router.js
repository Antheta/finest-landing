import React from "react"
import { Route, Routes } from "react-router-dom"

import Home from "../views/index"
import Features from "../views/Features"
import Connect from "../views/Connect"

import Privacy from "../views/Legal/privacy"
import Tos from "../views/Legal/tos"

import Currencies from "../views/Currencies"
import Currency from "../views/Currencies/details"

import Login from "../views/Account/login"
import Account from "../views/Account"

const Router = () => {
    return (
        <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/features" element={<Features />} />
            <Route exact path="/connect" element={<Connect />} />
            <Route exact path="/legal/terms-of-service" element={<Tos />} />
            <Route exact path="/legal/privacy-policy" element={<Privacy />} />

            <Route path="/currencies" element={<Currencies />} />
            <Route path="/currencies/:slug" element={<Currency />} />

            <Route exact path="/login" element={<Login />} />
            <Route exact path="/account" element={<Account />} />
        </Routes>
    )
}

export default Router