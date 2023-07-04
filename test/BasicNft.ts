import { network, getNamedAccounts } from "hardhat";
import { expect, assert } from "chai";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { BasicNft } from "../typechain-types";
import { deployments } from "hardhat";
import { ethers } from "hardhat";

describe("BasicNft", function () {
  let chainId: number | undefined;
  let accounts: SignerWithAddress[];
  let BasicNft: BasicNft;
  let deployedBasicNft: any;
  let deployer: SignerWithAddress;

  beforeEach(async function () {
    accounts = await ethers.getSigners();
    deployer = accounts[0];
    chainId = network.config.chainId;
    await deployments.fixture("BasicNft");
    BasicNft = await ethers.getContract("BasicNft", deployer);
  });

  it("should have correct name", async function () {
    const name = await BasicNft.name();
    expect(name).to.equal("Kenny Nft Token");
  });

  it("should have correct symbol", async function () {
    const symbol = await BasicNft.symbol();
    expect(symbol).to.equal("KNT");
  });

  it("mint nft when the nft function is called", async () => {
    const mint = await BasicNft.mintNft();
    const balance = await BasicNft.balanceOf(deployer.address);
    const token_uri = await BasicNft.tokenURI(1);
    const mintReceipts = await mint.wait();
    const deployerIsOwner = await BasicNft.ownerOf(1);
    expect(deployerIsOwner).to.equal(deployer.address);
    expect(balance).to.equal(1);
    assert.equal(
      token_uri,
      "ipfs://bafybeig37ioir76s7mg5oobetncojcm3c3hxasyd4rvid4jqhy4gkaheg4/?filename=0-PUG.json1"
    );
  });
});
