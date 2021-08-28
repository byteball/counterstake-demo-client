/*jslint node: true */
'use strict';
const path = require('path');
require('dotenv').config({ path: path.dirname(process.mainModule.paths[0]) + '/.env' });
const { getSigner } = require("./evm-chain.js");
const { transferEVM2Obyte, getTransfer, estimateOutput, csEvents } = require("counterstake-sdk");



async function estimate() {
	const src_network = 'Ethereum';
	const output_amount = await estimateOutput({
		amount: 0.001,
		src_network,
		src_asset: 'ETH',
		dst_network: 'Obyte',
		dst_asset: 'OETHV2',
		assistant_reward_percent: process.env.assistant_reward_percent || 1.00,
		testnet: process.env.testnet,
	});
	console.log({ output_amount });
	process.exit();
}

async function sendTransfer() {
	const src_network = 'Ethereum';
	const signer = getSigner(src_network);
	const txid = await transferEVM2Obyte({
		amount: 0.1,
		src_network,
		src_asset: 'USDC',
		dst_network: 'Obyte',
		dst_asset: 'OUSD_V2',
		recipient_address: 'EJC4A7WQGHEZEKW6RLO7F26SAR4LAQBU',
		assistant_reward_percent: process.env.assistant_reward_percent || 1.00,
		signer,
		testnet: process.env.testnet,
	});
	console.log({ txid });
//	process.exit();
}

async function checkTransfer() {
	const transfer = await getTransfer('0xe35476b263bbdb488851dc3215d06297b31b08bc8c994778c72c46de60f16923', true);
	console.log(transfer);
	process.exit();
}


csEvents.on('NewClaim', claim => {
	console.log('new claim', claim);
});

sendTransfer();
//checkTransfer();
//estimate();


process.on('unhandledRejection', up => {
	console.error('unhandledRejection event', up);
	throw up;
});
