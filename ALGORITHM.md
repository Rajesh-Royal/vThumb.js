This library can be used to generate video thumbnails on the client side with the help of video API and the HTML5 Canvas. this algorithm may change in future or needs to be updated. Please refer to the [Typescript Documentation](./lib/index.d.ts) of this lib for up to date documentation.

### How this library actually works ?

#### Step 1.
- User uploads a video file or add a video url and the number of thumbnails he wants, and calls the `generateVideoThumbnails` function.

#### Step 2.
- This function takes a video file or a URL as Input and check:

**The working of the Driver function**
```javascript
/**
 * @param {File} videoFile The video file
 * @param {number} numberOfThumbnails Number of thumbnails you want to generate
 * @returns {string[]} An array of `base64` images
 *
 */
```

#### Step 3.
**- If the input is video file then:**
    - Generate timeframes of video to take thumbnails, it depends on the number of thumbnails a user wants. If it fails then it reject the promise and returns the error.
    - After successfull timeframes the algorithm calls the `getVideoThumbnails()` functon to get the thumbnails for each timeframe duration. It will create and array of promises.
    - The Algo now resolves all the promises of `getVideoThumbnails()` and resolve the main promise with results of **base64** Images array.
    - If it fails to resolve promises then it rejects with error.

**- If the input is an URL then:**
    - Generates the video timeframes.
    - Get video thumbnails for each timeframe.
    - Wait for the result of all the timeframes from `getVideoThumbnails`.
    - Returns the resolved `base64` Images array.
    - If fails then returns the error result.

#### How `getVideoThumbnails()` function works.

```javascript
/**
 * @description
 * This function takes an VideoFile and Timeframe as an Input and returns the `base64` image of that particular timeFrame of video.
 * - It create video element and play it at the given time then,
 * - Create an svg element and draws the current frame of video on to svg.
 * - This svg then get converted to dataURI and sent as response.
 *
 * @param {File} file The video file
 * @param {number} videoTimeInSeconds Timeframe of video [at this particular time the thumbnail will be generated]
 * @returns {string} Returns an Array of `base64` Images
 */

```

#### How actually a single thumbnail is generated.
[Stakeoverflow link](https://stackoverflow.com/questions/23640869/create-thumbnail-from-video-file-via-file-input)
> If a browser blocks the `toDataURI` function then the algorithm will convert canvas to blob then image and returns its base64.

```javascript
/**
 * @ref - https://stackoverflow.com/questions/23640869/create-thumbnail-from-video-file-via-file-input
 * 
 * @param {string} urlOfFIle 
 * @param {number} seekTo - sktip to the frame by default
 * @returns {string} base64 image string
 */
export const getVideoCover = (urlOfFIle: string, seekTo = 0.0): Promise<string> => {}
```
**For URL**
```javascript
/**
 * @param {string} urlOfFIle 
 * @param {number} videoTimeInSeconds 
 * @returns {string} base64 image string
 */

export const generateVideoThumbnailViaUrl = (urlOfFIle: string, videoTimeInSeconds: number): Promise<string> => {}
```

#### How a local video file is processed.
- The algorithm will call the `importFileAndPreview()` function to generate the Object URI of an asset.

```javascript
/**
 * @description
 * Convert an Asset File to object URI for better performance
 * - A user can use this url as a resource url
 *      - For example it can be used as src of image, video tag.
 *
 * Refer to this link for more detailed information
 * https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL
 *
 * @param {File} file  The video file
 * @param {boolean} revoke If true the object uri will be removed after its creation
 * @returns {string} window object url ex. https://blob:video58699
 *
 */
```