class Dropbox
{
    allowedType;
    allowedExtensions;

    constructor(htmlElement, allowedType, allowedExtensions)
    {
        this.htmlElement = htmlElement;
        this.allowedType = allowedType;
        this.allowedExtensions = allowedExtensions || '*';
        this.setupListeners(htmlElement);

        this.ontypeerror,
        this.onextensionerror,
        this.onloadstart,
        this.onprogress,
        this.onload,
        this.onloadend,
        this.onerror,
        this.onabort = undefined;

    }

    setupListeners(htmlElement)
    {
        // Drag&Drop
        htmlElement.addEventListener('dragenter', this.dragEnter, false);
        htmlElement.addEventListener('dragleave', this.dragLeave, false);
        htmlElement.addEventListener('dragover', this.dragOver, false);
        htmlElement.addEventListener('drop', this.drop.bind(this), false);

        // Click
        htmlElement.addEventListener('input', this.input.bind(this), false);
    }

    dragEnter(e)
    {
        e.stopPropagation();
        e.preventDefault();
    }
    dragLeave(e)
    {
        e.stopPropagation();
        e.preventDefault();
    }
    dragOver(e)
    {
        e.stopPropagation();
        e.preventDefault();
    }
    drop(e)
    {
        e.stopPropagation();
        e.preventDefault();

        const dataTransfer = e.dataTransfer;
        const files = dataTransfer.files;

        this.handleFiles(files);
    }

    input(e)
    {
        const htmlElement = e.target;
        const files = htmlElement.files;
        this.handleFiles(files);
    }

    handleFiles(files)
    {
        for (let i = 0; i < files.length; i++)
        {
            const file = files[i];
            const type = file.type;
            const ext = type.match(/\/([a-z]+)$/)[1];
        

            if (!type.startsWith(this.allowedType))
            {
                this.ontypeerror && this.ontypeerror(type);
                continue;
            }

            if 
            (
                this.allowedExtensions !== '*'
                &&
                this.allowedExtensions.indexOf(ext) === -1
            )
            {
                this.onextensionerror && this.onextensionerror(ext);
                continue;
            }

            const reader = new FileReader();
            
            reader.onloadstart = this.onloadstart;
            reader.onprogress = this.onprogress;
            reader.onload = this.onload;
            reader.onloadend = this.onloadend;
            reader.onerror = this.onerror;
            reader.onabort = this.onabort;
            reader.readAsDataURL(file);
        }
    }


}
