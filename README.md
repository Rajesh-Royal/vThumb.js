<p align="center">
<img src="https://user-images.githubusercontent.com/24524924/164645918-53653f69-6ac9-4d51-9697-0daa9664c39c.png" />
</p>
<p align="center">The smallest library to generate video thumbnails on client side.</p>
<p align="center"><img src="https://user-images.githubusercontent.com/24524924/164651028-1a35b1a9-61eb-47d9-ad70-362060f8e5c7.gif" /></p>

# About
Generate `n` numbers of Image thumbnails of a video file.

<p align="center">A full working `React.js` sample code is in `./example` folder.</p>

> ### [code sandbox example](https://codesandbox.io/s/generate-video-thumbnails-3qtubg)




<!-- https://user-images.githubusercontent.com/24524924/160228836-547316dc-9ec0-4eca-aed1-09127db5de69.mp4 -->




This package can be used with any `JS` framework or in vanila js.

[![NPM](https://nodei.co/npm/@rajesh896/video-thumbnails-generator.png)](https://nodei.co/npm/@rajesh896/video-thumbnails-generator/)

## Purpose?
This module will generate n numbers of image thumbnails of a given video file.

By default the thumbnail's file format will be the `base64`.

## Usage
### `generateVideoThumbnails(selectedFile, numberOfThumbnails)`

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
1. Lib roubstness and accuracy increment. 

# License
This project is licensed under the MIT License - see the LICENSE.md file for details.
