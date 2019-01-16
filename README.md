## Block Xplor

Welcome to Block Xplor: view and explore the latest blocks!

### API

##### Get latest blocks `getBlocks(cb)`

Fetches the latest blocks from https://blockchain.info/blocks?format=json

`getBlocks` takes one parameter, a callback:

 - If response is successful, the list of blocks is passed as a param of the callback

 - If there is an error, the error is passed as a param of the callback


##### Get block detail `getBlockDetail(hash, cb)`

Fetches the detail of a block.

`getBlockDetail` takes two parameters:

 - `hash`: the hash of the block we want to get details about

 - a callback that returns the data if the fetch was successful or an error if the fetch was unsuccessful
