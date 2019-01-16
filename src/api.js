exports.getBlocks = (cb) => {
  const url = 'https://blockchain.info/blocks?format=json'
  fetch(url)
    .then(res => res.json())
    .then(resJson => {
      cb({success: resJson})
    })
    .catch(err => {
      cb({error: err})
    });
}

exports.getBlockDetail = (hash, cb) => {
  const url = `https://blockchain.info/rawblock/${hash}`
  fetch(url)
    .then(res => res.json())
    .then(resJson => {
      cb({success: resJson})
    })
    .catch(err => {
      cb({error: err})
    });
}
