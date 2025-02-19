
const DaiMock = artifacts.require("DaiMock");
const Token = artifacts.require("ProductToken");
const Factory = artifacts.require("TokenFactory");

module.exports = async function (deployer, network, accounts ) {
	let daiAdress;
	let chainlinkAddress;
	if (network=='mainnet') {
		daiAdress = '0x6B175474E89094C44Da98b954EedeAC495271d0F';			// fill in the dai address from mainnet
		chainlinkAddress = '0x773616E4d11A78F511299002da57A0a94577F1f4';
	} else if (network=='kovan') {
		daiAdress = '0x4F96Fe3b7A6Cf9725f59d353F723c1bDb64CA6Aa';			// fill in the dai address from kovan
		chainlinkAddress = '0x22B58f1EbEDfCA50feF632bD73368b2FdA96D541';
	} 
	else {
		await deployer.deploy(DaiMock);
		const dai = await DaiMock.deployed();
		await dai.faucet(accounts[0], web3.utils.toWei('100', 'ether'));		// ether here just means 10 ** 18
		daiAdress = dai.address;
		chainlinkAddress = accounts[1];		// this is placeholder. Chainlink does not have a local network.
	}

	// await deployer.deploy(Token, 330000, 500, 3, web3.utils.toWei('9', 'ether'));			// initialize reserve ratio for the token in ppm, stand in for testing.
	// const token = await Token.deployed();
	
	await deployer.deploy(Factory, daiAdress, chainlinkAddress, {from: accounts[0]});
	const factory = await Factory.deployed();
	// Add a test token for the front end.
	let token = await factory.createToken("Kalon Tea", 330000, 500, 3, web3.utils.toWei('12', 'ether'), {from: accounts[0]});
	let address = await factory.retrieveToken("Kalon Tea");		// this is how you retrieve token.	

};
