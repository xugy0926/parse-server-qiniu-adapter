# usage with parse-server

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