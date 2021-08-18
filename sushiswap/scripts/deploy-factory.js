const { ethers } = require('hardhat');

// Deploy function
async function deploy() {
   [account] = await ethers.getSigners();
   deployerAddress = account.address;
   console.log(`Deploying contracts using ${deployerAddress}`);

   // deploy LP
   const lp = await ethers.getContractFactory('UniswapV2ERC20');
   const lpInstance = await lp.deploy();
   console.log(`LP deployed to : ${lpInstance.address}`);

   //Deploy WETH
   const weth = await ethers.getContractFactory('WETH');
   const wethInstance = await weth.deploy();

   console.log(`WETH deployed to : ${wethInstance.address}`);

   //Deploy Factory
   const factory = await ethers.getContractFactory('UniswapV2Factory');
   const factoryInstance = await factory.deploy(deployerAddress);

   console.log(`Factory deployed to : ${factoryInstance.address}`);

   //Deploy Router passing Factory Address and WETH Address
   const router = await ethers.getContractFactory('UniswapV2Router02');
   const routerInstance = await router.deploy(
      factoryInstance.address,
      wethInstance.address
   );
   await routerInstance.deployed();

   console.log(`Router V02 deployed to :  ${routerInstance.address}`);

   //Deploy Multicall (needed for Interface)
   const multicall = await ethers.getContractFactory('Multicall');
   const multicallInstance = await multicall.deploy();
   await multicallInstance.deployed();

   console.log(`Multicall deployed to : ${multicallInstance.address}`);

   //Deploy Tokens

   const tok1 = await ethers.getContractFactory('Token');
   const tok1Instance = await tok1.deploy('Kunyuk One', 'KUNO');

   console.log(`Token1 deployed to : ${tok1Instance.address}`);

   const tok2 = await ethers.getContractFactory('Token');
   const tok2Instance = await tok2.deploy('Kunyuk Two', 'KUTO');

   console.log(`Token2 deployed to : ${tok2Instance.address}`);

}

deploy()
   .then(() => process.exit(0))
   .catch((error) => {
      console.error(error);
      process.exit(1);
   });
