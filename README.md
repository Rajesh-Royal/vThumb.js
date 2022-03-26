
# About
Generate `n` numbers of Image thumbnails of a video file.

> ## [!Live Demo](https://rajesh-royal.github.io/video-thumbnails-generator/)
<br/>

This package can be used with any `JS` framework or in vanila js.

<!-- [![NPM](https://nodei.co/npm/image-thumbnail.png)](https://nodei.co/npm/image-thumbnail/) -->

## Purpose?
This module will generate n numbers of image thumbnails of a given video file.

By default the thumbnail's file format will be the `base64`.

## Usage
### `generateVideoThumbnails(`selectedFile`, `numberOfThumbnails`)`

#### Async/Await (Typescript & ES7)
```js
generateVideoThumbnails(videoFile, numberOfThumbnails).then((thumbnailArray) => {
    // output will be arry of base64 Images
    // example - ["img1", "imgN"]

    // @todo - implement your logic here
}).catch((err) => {
    console.error(err);
})
```

#### Using promises and dynamic Import (Html5)
```js
// please change the location of index.js as needed

import("./index.js").then((res) => {
    res.generateVideoThumbnails(videoFile, noThumb).then((thumbArray) => {
        thumbArray.map((item) => {
            // type of item is base64 image

            // @todo - your logic here
        })              
    })
});

```

## Examples

#### From File Input
> complete working example is in the index.html file or you can visit the demo link
```js

 let video = document.getElementById("video");
        let inputFile = document.getElementById("inputfile");
        let numberInput = document.getElementById("numberofthumbnails");
        let numberWrapper = document.getElementById("numberWrapper");
        let buttonWrapper = document.getElementById("buttonWrapper");
        let thumbButton = document.getElementById("generatethumbnails");
        let thumbnaislWrapper = document.getElementById("thumbnails");
        let loader = document.getElementById("loader");
        let selectedFile = "";

        inputFile.addEventListener("change", function (e) {
            if (e.target.files?.length) {
                selectedFile = e.target.files[0];

                var source = document.createElement('source');
                import("./index.js").then((res) => {
                    res.importFileandPreview(e.target.files[0]).then((url) => {

                        source.setAttribute('src', url);
                        source.setAttribute('type', e.target.files[0]?.type);

                        res.generateVideoThumbnails(e.target.files[0], 1).then((thumbnails) => {
                            // video operations
                            // video.setAttribute("poster", thumbnails[1])
                            // video.setAttribute("src", url)
                            video.style.width = "auto";
                            video.style.height = "auto"
                            video.style.transform = "scale(1)"
                        })
                        // numberInput
                        numberWrapper.style.display = "block";
                        buttonWrapper.style.display = "block";
                        video.style.transform = "scale(1)"
                        video.innerHTML = "";
                        video.appendChild(source);
                    });
                })
            }
        });
        thumbButton.addEventListener("click", function () {
            thumbnaislWrapper.innerHTML = "";
            loader.style.display = "block";
            import("./index.js").then((res) => {
                res.generateVideoThumbnails(selectedFile, parseInt(numberInput.value)).then((thumbArray) => {
                    let thumbnailsImg = thumbArray.map((item) => {
                        let img = document.createElement('img');
                        img.src = item;
                        img.alt = "";
                        img.style.width = "200px";
                        img.style.objectFit = "cover";
                        img.style.margin = "10px";
                        img.style.cursor = "pointer";
                        img.addEventListener("click", function () {
                            video.setAttribute("poster", item);
                        })
                        return img;
                    })
                    thumbnaislWrapper.innerHTML = "";
                    loader.style.display = "none";
                    thumbnailsImg.forEach((item) => {
                        thumbnaislWrapper.appendChild(item);
                    })
                })
            });

        })

```
<br/>

> ### Your contributions are more than welcome 😀

<br/>

## ROADMAP 🗺
1. Generate thumbnails From Uri
2. Generate thumbnails From Base64
3. Add typescript support.
4. Add more customization options.

# License
This project is licensed under the MIT License - see the LICENSE.md file for details.