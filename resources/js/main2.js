import { configureChains, createClient } from "@wagmi/core";

import { arbitrum, mainnet, polygon } from "@wagmi/core/chains";

import { Web3Modal } from "@web3modal/html";

import {
  EthereumClient,
  modalConnectors,
  walletConnectProvider,
} from "@web3modal/ethereum";


import { publicProvider } from '@wagmi/core/providers/public'





const projectId = 'e32aac25e898d01d74995dcf2ee8ece1'


const chains = [arbitrum, mainnet, polygon];

// Wagmi Core Client
const { provider } = configureChains(chains, [
  walletConnectProvider({ projectId }),
]);


// const { chains, provider } = configureChains(
//     [mainnet, polygon],
//     [publicProvider()],
//   )


const wagmiClient = createClient({
  autoConnect: true,
  connectors: modalConnectors({
    projectId,
    version: "2", // or "2"
    appName: "web3Modal",
    chains,
  }),
  provider,
});

// Web3Modal and Ethereum Client
const ethereumClient = new EthereumClient(wagmiClient, chains);
const web3modal = new Web3Modal(
  { projectId },
  ethereumClient
);


import { sendTransaction, prepareSendTransaction } from '@wagmi/core'
window.prepareSendTransaction = prepareSendTransaction;
window.sendTransaction = sendTransaction;


import { BigNumber } from 'ethers';
window.BigNumber = BigNumber;

import { fetchSigner } from '@wagmi/core'
window.fetchSigner = fetchSigner;


