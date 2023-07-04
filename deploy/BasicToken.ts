import {network} from "hardhat"
import { HardhatRuntimeEnvironment } from "hardhat/types"
import { DeployFunction } from "hardhat-deploy/dist/types"
import {developmentChains} from "../helper-hardhat-config"
import { Deployment } from "hardhat-deploy/dist/types"
import {verify} from "../utils/verify"

const deployment:DeployFunction = async ({ getNamedAccounts,deployments }:HardhatRuntimeEnvironment) => {
    const {deploy, log} = deployments
    const {deployer} = await getNamedAccounts()

    log("Deploying BasicToken...")
    log("Deployer: " + deployer)
    log("-------------------------------------")
    const args = ["Kenny Token", "KNT"]

    const BasicToken:Deployment = await deploy("BasicToken", {
        from: deployer,
        log: true,
        args:args,
        waitConfirmations:1

    })

    log("BasicToken deployed to: " +  BasicToken.address)

     if(!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY){
          log("Verifying BasicNft...")
          await verify(BasicToken.address, args)
     }
     else{
      log("Skipping BasicToken verification on hardhat network")
     }

     log("-------------------------------------")

}

deployment.tags = ["BasicToken","all"]
export default deployment