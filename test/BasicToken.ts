import { network, getNamedAccounts } from "hardhat";
import { expect, assert } from "chai";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { BasicToken } from "../typechain-types";
import { deployments } from "hardhat";
import { ethers } from "hardhat";
import { BigNumber } from "ethers";

describe("BasicNft", function () {
  let chainId: number | undefined;
  let accounts: SignerWithAddress[];
  let BasicToken: BasicToken;
  let deployedBasicNft: any;
  let deployer: SignerWithAddress;

  beforeEach(async function () {
    accounts = await ethers.getSigners();
    deployer = accounts[0];
    chainId = network.config.chainId;
    await deployments.fixture("BasicToken");
    BasicToken = await ethers.getContract("BasicToken", deployer);
  });

  it("should have correct name", async function () {
    const name = await BasicToken.name();
    expect(name).to.equal("Kenny Token");
  });

  it("should have correct name", async function () {
    const symbol = await BasicToken.symbol();
    expect(symbol).to.equal("KNT");
  });

  it("should add the number together", async () => {
    const addNumbers = await BasicToken.add(2, 4);
    const addNumbers2 = await BasicToken.connect(accounts[1]).add(2, 8);
    const c: BigNumber = await BasicToken.c();
    assert.equal(c.toNumber(), 10);
  });

  it("should emit an event if the add function is called", async () => {
    const cFirstValue: BigNumber = await BasicToken.c();
    expect(cFirstValue.toString()).to.be.equal("0");
    const addNumbers = await BasicToken.add(4, 5);
    const cFinalValue: BigNumber = await BasicToken.c();
    expect(cFinalValue.toString()).to.be.equal("9");
    const eventData = await addNumbers.wait();
    if (eventData.events === undefined) throw new Error("No events emitted");
    if (eventData.events) {
      const e = eventData.events.find((e: any) => e.event === "AddedValue");
      expect(e?.args?._firstValue).to.be.equal("4");
      expect(e?.args?._secondValue).to.be.equal("5");
    }
  });

  it("should emit an event if the subtraction function is called", async () => {
    const cFirstValue: BigNumber = await BasicToken.c();
    expect(cFirstValue.toString()).to.be.equal("0");
    const subNumbers = await BasicToken.sub(7, 5);
    const cFinalValue: BigNumber = await BasicToken.c();
    expect(cFinalValue.toString()).to.be.equal("2");
    const eventData = await subNumbers.wait();
    if (eventData.events === undefined) throw new Error("No events emitted");
    if (eventData.events) {
      const e = eventData.events.find((e: any) => e.event === "AddedValue");
      expect(e?.args?._firstValue).to.be.equal("7");
      expect(e?.args?._secondValue).to.be.equal("5");
    }
  });

  it("The amount owned by the deployer should be 10**18", async () => {
    const balance = await BasicToken.balanceOf(deployer.address);
    expect(balance.toString()).to.equal("1000000000000000000");
    const balanceOfDeployer2 = await BasicToken.connect(accounts[1]).balanceOf(
      deployer.address
    );
    expect(balanceOfDeployer2.toString()).to.equal("1000000000000000000");
    const totalSupply = await BasicToken.totalSupply();
    expect(totalSupply.toString()).to.equal("1000000000000000000");
  });
});
