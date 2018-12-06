# usage with parse-server

#### using a config file

```
{
  appId: 'my_app_id',
  masterKey: 'my_master_key',
  // files options
  filesAdapter: {
    module: '@parse/qiniu-files-adapter',
    options: {
      bucket: '', //required
      accessKey: '', // required
      secretKey: '' //required,
      region: '',
      privateUrl: ''
    }
  }
}
```

#### passing as an instance

```
const QiniuAdapter = require('@parse/qiniu-files-adapter')

const qiniuAdapter = new QiniuAdapter({
  bucket: '', //required
  accessKey: '', // required
  secretKey: '' //required,
  region: '',
  privateUrl: ''  
})

const api = new ParseServer({
  appId: '',
  masterKey: '',
  filesAdapter: qiniuAdapter
})
```