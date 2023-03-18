import React from 'react';
import { CmBanner } from '../styles/s-top';

const Banner = ({ children }) => (
  <CmBanner>
    <div>{children}</div>
  </CmBanner>
);

export default Banner;
