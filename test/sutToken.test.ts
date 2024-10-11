import hre from "hardhat";
import { expect } from "chai";
import { SutToken } from "../typechain-types";

describe("SutToken contract", function () {
  before(async function () {
    this.SutToken = await hre.ethers.getContractFactory("SuperTrust");
  });

  beforeEach(async function () {
    const signers = await hre.ethers.getSigners();
    this.ownerAddress = signers[0].address;
    this.recipientAddress = signers[1].address;
    this.newOwnerAddress = signers[2].address;

    this.sutToken = await this.SutToken.deploy();
    await this.sutToken.waitForDeployment();

    this.decimals = await this.sutToken.decimals();
    this.signerContract = this.sutToken.connect(signers[1]);
  });

  it('Creates a token with a name', async function () {
    expect(await this.sutToken.name()).to.exist;
    expect(await this.sutToken.name()).to.equal('SUPER TRUST');
  });

  it('Creates a token with a symbol', async function () {
    expect(await this.sutToken.symbol()).to.exist;
    expect(await this.sutToken.symbol()).to.equal('SUT');
  });

  it('Has a valid decimal', async function () {
    expect((await this.sutToken.decimals()).toString()).to.equal('18');
  })

  it('Has a valid total supply', async function () {
    const expectedSupply = hre.ethers.parseUnits('238403732', this.decimals);
    expect((await this.sutToken.totalSupply()).toString()).to.equal(expectedSupply);
  });

  it('Is able to query account balances', async function () {
    const ownerBalance = await this.sutToken.balanceOf(this.ownerAddress);
    expect(await this.sutToken.balanceOf(this.ownerAddress)).to.equal(ownerBalance);
  });

  it('Transfers the right amount of tokens to/from an account', async function () {
    const transferAmount = 1000;
    await expect(this.sutToken.transfer(this.recipientAddress, transferAmount)).to.changeTokenBalances(
        this.sutToken,
        [this.ownerAddress, this.recipientAddress],
        [-transferAmount, transferAmount]
      );
  });

  it('Emits a transfer event with the right arguments', async function () {
    const transferAmount = 100000;
    await expect(this.sutToken.transfer(this.recipientAddress, hre.ethers.parseUnits(transferAmount.toString(), this.decimals)))
        .to.emit(this.sutToken, "Transfer")
        .withArgs(this.ownerAddress, this.recipientAddress, hre.ethers.parseUnits(transferAmount.toString(), this.decimals))
  });

  it('Allows for allowance approvals and queries', async function () {
    const approveAmount = 10000;
    await this.signerContract.approve(this.ownerAddress, hre.ethers.parseUnits(approveAmount.toString(), this.decimals));
    expect((await this.sutToken.allowance(this.recipientAddress, this.ownerAddress))).to.equal(hre.ethers.parseUnits(approveAmount.toString(), this.decimals));
  });

  it('Emits an approval event with the right arguments', async function () {
    const approveAmount = 10000;
    await expect(this.signerContract.approve(this.ownerAddress, hre.ethers.parseUnits(approveAmount.toString(), this.decimals)))
        .to.emit(this.sutToken, "Approval")
        .withArgs(this.recipientAddress, this.ownerAddress, hre.ethers.parseUnits(approveAmount.toString(), this.decimals))
  });

  it('Allows an approved spender to transfer from owner', async function () {
    const transferAmount = 10000;
    await this.sutToken.transfer(this.recipientAddress, hre.ethers.parseUnits(transferAmount.toString(), this.decimals))
    await this.signerContract.approve(this.ownerAddress, hre.ethers.parseUnits(transferAmount.toString(), this.decimals))
    await expect(this.sutToken.transferFrom(this.recipientAddress, this.ownerAddress, transferAmount)).to.changeTokenBalances(
        this.sutToken,
        [this.ownerAddress, this.recipientAddress],
        [transferAmount, -transferAmount]
      );
  });

  it('Emits a transfer event with the right arguments when conducting an approved transfer', async function () {
    const transferAmount = 10000;
    await this.sutToken.transfer(this.recipientAddress, hre.ethers.parseUnits(transferAmount.toString(), this.decimals))
    await this.signerContract.approve(this.ownerAddress, hre.ethers.parseUnits(transferAmount.toString(), this.decimals))
    await expect(this.sutToken.transferFrom(this.recipientAddress, this.ownerAddress, hre.ethers.parseUnits(transferAmount.toString(), this.decimals)))
        .to.emit(this.sutToken, "Transfer")
        .withArgs(this.recipientAddress, this.ownerAddress, hre.ethers.parseUnits(transferAmount.toString(), this.decimals))
  });

  it('Changes this contract owner to new owner.', async function () {
    await this.sutToken.transferOwnership(this.newOwnerAddress);
    expect(await this.sutToken.owner(), this.newOwnerAddress);
  });

  it('Pause this contract.', async function () {
    expect(await this.sutToken.paused(), 'false');
    await this.sutToken.pause();
    expect(await this.sutToken.paused(), 'true');
    await this.sutToken.unpause();
    expect(await this.sutToken.paused(), 'false');
  });

  it('Pause is only possible from owner', async function () {
    await this.sutToken.transferOwnership(this.newOwnerAddress);
    await expect(this.sutToken.pause()).to.be.revertedWithCustomError(this.sutToken, 'OwnableUnauthorizedAccount');
  });
});
