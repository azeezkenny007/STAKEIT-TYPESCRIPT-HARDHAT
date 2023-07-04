import {network} from "hardhat"
import { HardhatRuntimeEnvironment } from "hardhat/types"
import { DeployFunction } from "hardhat-deploy/dist/types"
import {developmentChains} from "../helper-hardhat-config"
import { Deployment } from "hardhat-deploy/dist/types"
import {verify} from "../utils/verify"



const deployment:DeployFunction = async ({ getNamedAccounts,deployments }:HardhatRuntimeEnvironment) => {
     const { deploy, log } = deployments
     const { deployer } = await getNamedAccounts()

     log("Deploying BasicNft...")
     log("Deployer: " + deployer)
     log("-------------------------------------")
     const args=["Kenny Nft Token", "KNT"]

     const BasicNft:Deployment = await deploy("BasicNft", {
         from: deployer,
         log: true,
         args: args,
         waitConfirmations:1
         
     })

     log("BasicNft deployed to: " +  BasicNft.address)

     if(!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY){
          log("Verifying BasicNft...")
          await verify(BasicNft.address, args)
     }
     else{
      log("Skipping BasicNft verification on hardhat network")
     }

     log("-------------------------------------")

    
}

deployment.tags = ["BasicNft","all"]

export default deployment