exports.getBlocks = (cb) => {
  const url = 'https://blockchain.info/blocks?format=json'
  fetch(url)
    .then(res => res.json())
    .then(resJson => {
      console.log(resJson);
      cb({success: resJson})
    })
    .catch(err => {
      console.error(err);
      cb({error: err})
    });
}

exports.getBlockDetail = (hash) => {

}
