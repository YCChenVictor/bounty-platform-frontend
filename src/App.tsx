import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { MetaMaskInpageProvider } from "@metamask/providers";
import Task from './task/index';

declare global {
  interface Window{
    ethereum?:MetaMaskInpageProvider
  }
}

function App() {
  return (
    <>
      <Task />
    </>
  );
}

export default App;
