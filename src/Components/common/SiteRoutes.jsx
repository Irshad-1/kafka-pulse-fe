import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Signup } from '../Signup';
import { Login } from '../Login';
import { Details } from '../Details';
import PageNotFound from '../error-pages/PageNotFound';
import Categories from '../Categories';
import Funds from '../Funds';

function SiteRoutes() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/page-not-found" element={<PageNotFound />} />
          <Route path="*" element={<Navigate to="/page-not-found" />} />
          <Route path="/mf/data/:schemeId" element={<Funds />} />
          <Route path="/" element={<Categories />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default SiteRoutes;
