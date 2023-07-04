const { run } = require("hardhat")

export const verify = async function verify(contractAdress:string, args:string[]) {
    console.log("verifying contract !!!!!!!")

    try {
        await run("verify:verify", {
            address: contractAdress,
            constructorArguments: args,
        })
        
    } catch (e:any) {
        if (e.message.toLowerCase().includes("already verified")) {
            console.log("already verified")
        } else {
            console.log(e)
        }
    }
}


