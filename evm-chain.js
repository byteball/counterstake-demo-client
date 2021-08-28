const { ethers } = require("ethers");
const { createProvider } = require("./provider.js");

const { constants: { AddressZero } } = ethers;


const nativeSymbols = {
	Ethereum: 'ETH',
	BSC: 'BNB',
	Polygon: 'MATIC',
};

let providers = {};
let signers = {};


let cached_gas_price;
let last_gas_price_ts = 0;

const erc20Abi = [
	`function balanceOf(address account) public view returns (uint256)`
];


async function getMyBalance(asset, network) {
	if (asset === AddressZero)
		return await signers[network].getBalance();
	const token = new ethers.Contract(asset, erc20Abi, providers[network]);
	return await token.balanceOf(signers[network].address);
}

function getProvider(network) {
	if (!providers[network])
		start(network);
	return providers[network];
}

function getSigner(network) {
	if (!signers[network])
		start(network);
	return signers[network];
}

async function getGasPrice(network) {
	console.log('getGasPrice')
	if (cached_gas_price && last_gas_price_ts > Date.now() - 1 * 60 * 1000)
		return cached_gas_price;
	console.log('provider getGasPrice')
	cached_gas_price = (await providers[network].getGasPrice()).toNumber() / 1e9;
	last_gas_price_ts = Date.now();
	console.log(`gas price ${cached_gas_price} gwei`);
	return cached_gas_price;
}

function start(network) {
	providers[network] = createProvider(network);
//	const ethWallet = ethers.Wallet.fromMnemonic(JSON.parse(fs.readFileSync(desktopApp.getAppDataDir() + '/keys.json')).mnemonic_phrase);
	const ethWallet = ethers.Wallet.fromMnemonic(process.env.mnemonic);
	signers[network] = ethWallet.connect(providers[network]);
	console.error(`====== my ETH address on ${network}: `, signers[network].address);
}


exports.start = start;
exports.getMyBalance = getMyBalance;
exports.getProvider = getProvider;
exports.getSigner = getSigner;
exports.getGasPrice = getGasPrice;
exports.nativeSymbols = nativeSymbols;
