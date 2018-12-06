const assert = require('assert')
const expect = require('expect.js')
const QiniuAdapter = require('../index')

let key;

const config = {
  bucket: 'study',
  accessKey: '',
  secretKey: '',
  privateUrl: ''
}

it('create file', function(done) {
  const adapter = new QiniuAdapter(config)
  adapter
    .createFile(
      'test.js',
      `${process.cwd()}/index.js`
    )
    .then(obj => {
      expect(obj).to.have.property('hash')
      expect(obj).to.have.property('key')
      key = obj.key
      done()
    })
    .catch(done)
})

it('get file location', function(done) {
  const adapter = new QiniuAdapter(config)
  console.log(adapter.getFileLocation(config, key))
  done()
})

it('delete file', function(done) {
  const adapter = new QiniuAdapter(config)
  adapter
    .deleteFile(key)
    .then(obj => {
      done()
    })
    .catch(done)
})
