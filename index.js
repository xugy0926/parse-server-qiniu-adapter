// QiniuAdapter

// Stores Parse files in Qiniu.

const qiniu = require('qiniu')
const optionsFromArguments = require('./lib/optionsFromArguments');

const zone = {
  'z0': qiniu.zone.Zone_z0, // 华东
  'z1': qiniu.zone.Zone_z1, // 华北
  'z2': qiniu.zone.Zone_z2, // 华南
  'na0': qiniu.zone.Zone_na0 // 北美
}

function QiniuAdapter() {
  const options = optionsFromArguments(arguments)
  this._region = options.region
  this._bucket = options.bucket
  this._baseUrl = options.baseUrl
  this._accessKey = options.accessKey
  this._secretKey = options.secretKey
  this._mac = new qiniu.auth.digest.Mac(this._accessKey, this._secretKey)
  this._config = new qiniu.conf.Config()
  this._config.zone = zone[this._region]
}

QiniuAdapter.prototype.uploadToken = function() {
  const putPolicy = new qiniu.rs.PutPolicy({ scope: this._bucket })
  return putPolicy.uploadToken(this._mac)
}

QiniuAdapter.prototype.createFile = function(filename, data, contentType) {
  return new Promise((resolve, reject) => {
    const formUploader = new qiniu.form_up.FormUploader(this._config)
    const putExtra = new qiniu.form_up.PutExtra()
    formUploader.put(this.uploadToken(), filename, data, putExtra, function(
      respErr,
      respBody,
      respInfo
    ) {
      if (respErr) {
        reject(respErr)
        return
      }
      if (respInfo.statusCode == 200) {
        resolve(respBody)
        return
      } else {
        reject(respBody)
      }
    })
  })
}

module.exports = QiniuAdapter
module.exports.default = QiniuAdapter
