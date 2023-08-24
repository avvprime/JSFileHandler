# JSFileHandler
Helps to drag&amp;drop or click file upload at client side. Apply type and extension filters to the files and keep track upload process.


```
const dropbox = new Dropbox(htmlElement, allowedType, allowedExtensions)

const dropbox = new Dropbox(myInputArea, 'image', 'webp, png, jpeg') // use '*' to allow all extensions

const dropbox = new Dropbox(myInputArea, 'text', 'css')

dropbox.ontypeerror = (err) => console.log(`Invalid type ${err}`) // returns type
dropbox.onextensionerror = (err) => console.log(`Invalid extension ${err}`) // returns extension

dropbox.onloadstart,
dropbox.onprogress,
dropbox.onload,
dropbox.onloadend,
dropbox.onerror,
dropbox.onabort  => FileReader API events, will be called for each file and returns ProgressEvent
```

