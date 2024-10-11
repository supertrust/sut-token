# SUT Token

This is a project to issue ERC20-based SUT tokens.
Ownable and Pause features are included.

Deployed Token: https://polygonscan.com/token/0x98965474ecbec2f532f1f780ee37b0b05f77ca55

## Pre Required

* Nodejs 20+

### Install node_modules

you must first install node_modules.

```
yarn install
```

## Test
Unittest allows you to test your contract's functionality before deploying it to the live network.

### Unittest
You can verify that your ERC20 token is functioning properly.

```
yarn test
```

if you want to get `gas report`, set `REPORT_GAS=true` environment.

```
REPORT_GAS=true yarn test
```

### Coverage

Coverage lets you see statistics on the tested parts of your SmartContract.

```
yarn coverage
```

## Deploy Contract

There are a few steps to deploying a contract.
You can follow these steps to deploy

You can deploy to three networks: `polygon mainnet`, `polygon testnet`, and `hardhat node`.

### Environment

Record the required information in the `.env` file.
You can copy and use the `.env.example` file.

**.env**

```
PRIVATE_KEY=
ETHERSCAN_API_KEY=
```

* `PRIVATE_KEY`: The private key to deploy the smart contract with. The address that uses this private key will be the first owner of the token.
* `ETHERSCAN_API_KEY`: Create an API Key after registering at [https://polygonscan.com](https://polygonscan.com).

### Compile

Compile the smart contract into bytecode.

```
yarn compile
# or
yarn build
```

### Deploy

Deploy to the desired network.

* Hardhat Node (Local)

	* run hardhat node

		```
		npx hardhat node
		```

	* deploy

		```
		yarn deploy:local
		```

* Polygon Testnet (Amoy)

	```
	yarn deploy:testnet
	```

* Polygon Mainnet (MATIC)

	```
	yarn deploy:mainnet
	```

After deployment, you need to remember the `address` of the deployed contract.

### Verify

By registering the contract's code with Explorer, Verify gives it credibility with users.

It can be found at [https://polygonscan.com](https://polygonscan.com) and [https://amoy.polygonscan.com](https://amoy.polygonscan.com) and requires an API Key.

For `<contract_address>`, use the address you remembered from the deployment.

* Polygon Testnet (Amoy)

	```
	yarn verify:testnet <contract_address>
	```

	Open https://amoy.polygonscan.com/token/`<contract_address>`

* Polygon Mainnet (MATIC)

	```
	yarn verify:mainnet <contract_address>
	```

	Open https://polygonscan.com/token/`<contract_address>`
