// convert image to object part instead of base64 for better performance
// https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL
export const importFileandPreview = (file, revoke) => {
    return new Promise((resolve, reject) => {
        window.URL = window.URL || window.webkitURL;
        let preview = window.URL.createObjectURL(file);
        // remove reference
        if (revoke) {
            window.URL.revokeObjectURL(preview);
        }
        setTimeout(() => {
            resolve(preview);
        }, 100);
    });
}


export const generateVideoThumbnails = async (videoFile, numberOfThumbnails, type) => {
   
    let thumbnail = [];
    let fractions = [];
    return type !== "url" ? new Promise(async (resolve, reject) => {
        if (!videoFile.type?.includes("video")) reject("not a valid video file");
        await getVideoDuration(videoFile).then(async (duration) => {
            // divide the video timing into particular timestamps in respective to number of thumbnails
            // ex if time is 10 and numOfthumbnails is 4 then result will be -> 0, 2.5, 5, 7.5 ,10
            // we will use this timestamp to take snapshots
            for (let i = 0; i <= duration; i += duration / numberOfThumbnails) {
                fractions.push(Math.floor(i));
            }
            // the array of promises
            let promiseArray = fractions.map((time) => {
                return getVideoThumbnail(videoFile, time)
            })
            // console.log('promiseArray', promiseArray)
            // console.log('duration', duration)
            // console.log('fractions', fractions)
            await Promise.all(promiseArray).then((res) => {
                res.forEach((res) => {
                    // console.log('res', res.slice(0,8))
                    thumbnail.push(res);
                });
                // console.log('thumbnail', thumbnail)
                resolve(thumbnail);
            }).catch((err) => {
                console.error(err)
            }).finally((res) => {
                console.log(res);
                resolve(thumbnail);
            })
        });
        reject("something went wrong");
    })
    :  new Promise(async (resolve, reject) => {
        await getVideoDuration(videoFile).then(async (duration) => {
            console.log('duration', duration)
            // divide the video timing into particular timestamps in respective to number of thumbnails
            // ex if time is 10 and numOfthumbnails is 4 then result will be -> 0, 2.5, 5, 7.5 ,10
            // we will use this timestamp to take snapshots
            for (let i = 0; i <= duration; i += duration / numberOfThumbnails) {
                fractions.push(Math.floor(i));
            }
            // the array of promises
            let promiseArray = fractions.map((time) => {
                return getVideoThumbnail(videoFile, time)
            })
            // console.log('promiseArray', promiseArray)
            // console.log('duration', duration)
            // console.log('fractions', fractions)
            await Promise.all(promiseArray).then((res) => {
                res.forEach((res) => {
                    // console.log('res', res.slice(0,8))
                    thumbnail.push(res);
                });
                // console.log('thumbnail', thumbnail)
                resolve(thumbnail);
            }).catch((err) => {
                reject(err);
            }).finally((res) => {
                resolve(thumbnail);
            })
        });
        reject("something went wrong");
    });
};


const getVideoThumbnail = (file, videoTimeInSeconds) => {
    return new Promise((resolve, reject) => {
        if (file?.type?.match("video")) {
            importFileandPreview(file).then((urlOfFIle) => {
                generateVideoThumbnailViaUrl(urlOfFIle, videoTimeInSeconds).then((res) => {
                    resolve(res);
                })
            });
        } else if (file) {
            generateVideoThumbnailViaUrl(file, videoTimeInSeconds).then((res) => {
                resolve(res);
            }).catch((err) => {
                reject(err);
            })
        }
        else {
            reject("file not valid");
        }
    });
};

const generateVideoThumbnailViaUrl = (urlOfFIle, videoTimeInSeconds) => {
    return new Promise((resolve, reject) => {
        try {
            var video = document.createElement("video");
        var timeupdate = function () {
            if (snapImage()) {
                video.removeEventListener("timeupdate", timeupdate);
                video.pause();
            }
        };
        video.addEventListener("loadeddata", function () {
            if (snapImage()) {
                video.removeEventListener("timeupdate", timeupdate);
            }
        });
        var snapImage = function () {
            var canvas = document.createElement("canvas");
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);
            var image = canvas.toBlob(
                    blob => {
                        var reader = new FileReader();
                        reader.readAsDataURL(blob); 
                        reader.onloadend = function() {
                        var base64data = reader.result;                
                        resolve(base64data);
                        }
                    },
                    "image/jpeg",
                    1 /* quality */
                );
            var success = image?.length > 100000;
            if (success) {
                URL.revokeObjectURL(urlOfFIle);
                resolve(image);
            }
            return success;
        };
        video.addEventListener("timeupdate", timeupdate);
        video.preload = "metadata";
        video.src = urlOfFIle;
        // Load video in Safari / IE11
        video.muted = true;
        video.playsInline = true;
        video.setAttribute('crossOrigin', '');
        video.currentTime = videoTimeInSeconds;
            video.play().then().catch((err) => {
                reject({
                    status: 500,
                    reason: `Access to video at ${urlOfFIle} from origin ${window.location.hostname} has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.`,
                    message: err
                })
            
        })
        } catch (error) {
            reject(error);
        }
   })
}

export const getVideoDuration = (videoFile)=> {
    return new Promise((resolve, reject) => {
        if (videoFile) {
            if (videoFile?.type?.match("video")) {
                importFileandPreview(videoFile).then((url) => {
                    generateVideoDuration(url).then((res) => {
                        resolve(res);
                    })
                });
            } else {
                generateVideoDuration(videoFile).then((res) => {
                    resolve(res)
                })
            }
        } else {
            reject(0);
        }
    });
};


const generateVideoDuration = (url) => {
    return new Promise((resolve, reject) => {
        let video = document.createElement("video");
        video.addEventListener("loadeddata", function () {
            resolve(video.duration);
            window.URL.revokeObjectURL(url);
        });
        video.preload = "metadata";
        video.src = url;
        // Load video in Safari / IE11
        video.muted = true;
        video.playsInline = true;
        video.play();
    })
}

// ref - https://stackoverflow.com/questions/23640869/create-thumbnail-from-video-file-via-file-input
export const getVideoCover = (file, seekTo = 0.0) => {
    return new Promise((resolve, reject) => {
        // load the file to a video player
        const videoPlayer = document.createElement('video');
        videoPlayer.setAttribute('src', URL.createObjectURL(file));
        videoPlayer.load();
        videoPlayer.addEventListener('error', (ex) => {
            reject("error when loading video file", ex);
        });
        // load metadata of the video to get video duration and dimensions
        videoPlayer.addEventListener('loadedmetadata', () => {
            // seek to user defined timestamp (in seconds) if possible
            if (videoPlayer.duration < seekTo) {
                reject("video is too short.");
                return;
            }
            // delay seeking or else 'seeked' event won't fire on Safari
            setTimeout(() => {
              videoPlayer.currentTime = seekTo;
            }, 200);
            // extract video thumbnail once seeking is complete
            videoPlayer.addEventListener('seeked', () => {
                // console.log('video is now paused at %ss.', seekTo);
                // define a canvas to have the same dimension as the video
                const canvas = document.createElement("canvas");
                canvas.width = videoPlayer.videoWidth;
                canvas.height = videoPlayer.videoHeight;
                // draw the video frame to canvas
                const ctx = canvas.getContext("2d");
                ctx.drawImage(videoPlayer, 0, 0, canvas.width, canvas.height);
                // return the canvas image as a blob
                ctx.canvas.toBlob(
                    blob => {
                        var reader = new FileReader();
                        reader.readAsDataURL(blob); 
                        reader.onloadend = function() {
                        var base64data = reader.result;                
                        resolve(base64data);
                        }
                    },
                    "image/jpeg",
                    1 /* quality */
                );
            });
        });
    });
}