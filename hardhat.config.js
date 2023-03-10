require("@nomiclabs/hardhat-waffle");

/**
 * @type import('hardhat/config').HardhatUserConfig
 */

const Private_Key = "0732f804598188c61b65983f65db20724a6d5b919116ef7d191e4939e01b8558"

module.exports = {
  solidity: "0.6.12",
  networks: {
    goerli: {
        url: `https://orbital-misty-rain.ethereum-goerli.discover.quiknode.pro/5e2f24f55e1c926b295540a0d578de8d14bd2038/`,
        accounts: [`0x${Private_Key}`],
        gas: "auto",
        gasPrice: 1000000000, // 1 gwei
        gasMultiplier: 1.5,
    }
  }
};