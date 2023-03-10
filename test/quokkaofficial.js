const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("QUOKKAOfficial", function() {
  let contract;

  beforeEach(async function() {
    const QUOKKAOfficial = await ethers.getContractFactory("QUOKKAOfficial");
    contract = await QUOKKAOfficial.deploy("QUOKKA", "QK", 18, 1000000000, 2, 2, 1000000000, 1000000000, "0x32d7e58933fceea6b73a13f8e30605d80915b616", "0x32d7e58933fceea6b73a13f8e30605d80915b616");
    await contract.deployed();
  });

  it("should set the correct name, symbol, and decimals", async function() {
    expect(await contract._name()).to.equal("QUOKKA");
    expect(await contract._symbol()).to.equal("QK");
    expect(await contract._decimals()).to.equal(18);
  });

  it("should exclude the owner from fee", async function() {
    expect(await contract.isExcludedFromFee(await contract.owner())).to.be.true;
  });

  it("should include the contract in fee", async function() {
    expect(await contract.isExcludedFromFee(await contract.address)).to.be.false;
  });

  it("should transfer tokens between accounts", async function() {
    // Transfer some tokens from the contract owner to another account
    const initialBalance = await contract.balanceOf(await contract.owner());
    await contract.transfer(await ethers.provider.getSigner(1).getAddress(), 1000);
    const newBalance = await contract.balanceOf(await ethers.provider.getSigner(1).getAddress());
    expect(newBalance).to.equal(1000);
    expect(await contract.balanceOf(await contract.owner())).to.equal(initialBalance - 1000);
  });

  it("should not allow transfer of more than the maximum allowed amount", async function() {
    const maxTxAmount = await contract._maxTxAmount();
    await expect(contract.transfer(await ethers.provider.getSigner(1).getAddress(), maxTxAmount + 1)).to.be.revertedWith("Transfer amount exceeds the max transaction amount.");
  });

  it("should not allow transfer from excluded address to excluded address", async function() {
    // Exclude an account from rewards
    await contract.excludeFromReward(await ethers.provider.getSigner(1).getAddress());
    expect(await contract.isExcludedFromReward(await ethers.provider.getSigner(1).getAddress())).to.be.true;
    // Try to transfer from the excluded address to another excluded address
    await expect(contract.transfer(await ethers.provider.getSigner(2).getAddress(), 1000, { from: await ethers.provider.getSigner(1).getAddress() })).to.be.revertedWith("Excluded addresses cannot call this function");
  });
});
