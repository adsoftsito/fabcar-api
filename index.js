var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var cors = require('cors');

app.use(cors());
app.use(bodyParser.json());

// Setting for Hyperledger Fabric

const { FileSystemWallet, Gateway } = require('fabric-network');
const fs = require('fs');
const path = require('path');
const ccpPath = path.resolve(__dirname, '..', 'fabric-samples', 'first-network', 'connection-org1.json');
const ccpJSON = fs.readFileSync(ccpPath, 'utf8');
const ccp = JSON.parse(ccpJSON);

app.get('/api/queryallcars', async function (req, res) {
 // to be filled in
try {// Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), '../fabric-samples/fabcar/javascript/wallet');
        const wallet = new FileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);// Check to see if we've already enrolled the user.
        console.log(ccpPath);
        console.log(ccp);
        const userExists = await wallet.exists('user1');
        if (!userExists) {
            console.log('An identity for the user "user1" does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            return;
        }// Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: 'user1', discovery: { enabled: true, asLocalhost: true } });
	// Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('mychannel');
	// Get the contract from the network.
        const contract = network.getContract('fabcar');
	// Evaluate the specified transaction.
        // queryCar transaction - requires 1 argument, ex: ('queryCar', 'CAR4')
        //         // queryAllCars transaction - requires no arguments, ex: ('queryAllCars')
                         
         const result = await contract.evaluateTransaction('queryAllCars');
         console.log(`Transaction has been evaluated, result is: ${result.toString()}`);
         res.status(200).json({response: result.toString()}); 
	 //res.status(200).json(result.toString());
	}
catch (error) {
         console.error(`Failed to evaluate transaction: ${error}`);
         res.status(500).json({error: error});
         process.exit(1);
}


});

app.get('/api/query/:car_index', async function (req, res) {
 //  // to be filled in
 });

app.post('/api/addcar/', async function (req, res) {
 //   // to be filled in
});

app.put('/api/changeowner/:car_index', async function (req, res) {
     // to be filled in
});

console.log (ccp);
app.listen(8080);
