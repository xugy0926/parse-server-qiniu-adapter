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
  this._privateUrl = options.privateUrl
  this._mac = new qiniu.auth.digest.Mac(this._accessKey, this._secretKey)
  this._config = new qiniu.conf.Config()
  this._config.zone = zone[this._region]

  this._formUploader = new qiniu.form_up.FormUploader(this._config)
  this._putExtra = new qiniu.form_up.PutExtra()
  this._bucketManager = new qiniu.rs.BucketManager(this._mac, this._config);
}

QiniuAdapter.prototype.uploadToken = function() {
  return this._putPolicy.uploadToken(this._mac)
}

QiniuAdapter.prototype.createFile = function(filename, data, contentType) {
  return new Promise((resolve, reject) => {
    this._formUploader.put(this.uploadToken(), filename, data, this._putExtra, function(
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

QiniuAdapter.prototype.deleteFile = function(filename) {
  return new Promise((resolve, reject) => {
    this._bucketManager.delete(this._bucket, filename, function(err, respBody, respInfo) {
      if (err) {
        reject(err)
      } else {
        resolve(respBody)
      }
    })
  })
}

QiniuAdapter.prototype.getFileData = function(filename) {
  return new Promise((resolve) => {
    //TODO
    resolve()
  })
}

QiniuAdapter.prototype.getFileLocation = function(config, filename) {
  return `${this._privateUrl}/${filename}`;
}

module.exports = QiniuAdapter
module.exports.default = QiniuAdapter
