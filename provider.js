"use strict";
const { ethers } = require("ethers");


function createProvider(network) {
	if (process.env.devnet)
		return new ethers.providers.JsonRpcProvider("http://0.0.0.0:7545") // ganache
	switch (network) {
		case 'Ethereum':
			return new ethers.providers.InfuraProvider(process.env.testnet ? "rinkeby" : "homestead", process.env.infura_project_id);
		case 'BSC':
			return new ethers.providers.JsonRpcProvider(process.env.testnet ? "https://data-seed-prebsc-1-s1.binance.org:8545" : "https://bsc-dataseed.binance.org");
		case 'Polygon':
			return new ethers.providers.JsonRpcProvider(process.env.testnet ? `https://polygon-mumbai.infura.io/v3/${process.env.infura_project_id}` : `https://polygon-mainnet.infura.io/v3/${process.env.infura_project_id}`);
	}
	throw Error(`unknown network ` + network);
}

exports.createProvider = createProvider;
