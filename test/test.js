const assert = require('assert')
const expect = require('expect.js')
const QiniuAdapter = require('../index')

it('create file', function(done) {
  const adapter = new QiniuAdapter({
    bucket: 'study',
    accessKey: 'hwRpmKTAHOo3OpJBmKuL6VwqsGV5oHZ8DMffohHk',
    secretKey: 'kE51DWulIo8M0dyqIRZh8uQZ7FPTVtN3_m1EO82j'
  })
  adapter
    .createFile(
      '11.txt',
      '/Users/youngxu/allin/tmp_work/mygithub/parse-server-qiniu-adapter/index.js'
    )
    .then(obj => {
      expect(obj).to.have.property('hash')
      expect(obj).to.have.property('key')
      done()
    })
    .catch(done)
})
