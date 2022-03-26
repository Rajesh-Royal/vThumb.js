"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.getVideoDuration = exports.generateVideoThumbnails = exports.importFileandPreview = void 0;
// convert image to object part instead of base64 for better performance
// https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL
var importFileandPreview = function (file, revoke) {
    return new Promise(function (resolve, reject) {
        window.URL = window.URL || window.webkitURL;
        var preview = window.URL.createObjectURL(file);
        // remove reference
        if (revoke) {
            window.URL.revokeObjectURL(preview);
        }
        setTimeout(function () {
            resolve(preview);
        }, 100);
    });
};
exports.importFileandPreview = importFileandPreview;
/**
 *
 * @param videoFile {FIle} // the video file
 * @param numberOfThumbnails {number} //number of thumbnails you want to generate
 * @returns {string[]} // an array of base64 thumbnails images
 *
 * @abstract
 * Idea taken from - https://codepen.io/aertmann/pen/mrVaPx
 * The original functionality of getVideoThumbnail() function is customized as per working code
 * If it didn't work in future then replace it with about links working example
 */
var generateVideoThumbnails = function (videoFile, numberOfThumbnails) { return __awaiter(void 0, void 0, void 0, function () {
    var thumbnail, fractions;
    return __generator(this, function (_a) {
        thumbnail = [];
        fractions = [];
        return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!videoFile.type.includes("video"))
                                reject("not a valid video file");
                            return [4 /*yield*/, (0, exports.getVideoDuration)(videoFile).then(function (duration) { return __awaiter(void 0, void 0, void 0, function () {
                                    var i;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0:
                                                // divide the video timing into particular timestamps in respective to number of thumbnails
                                                // ex if time is 10 and numOfthumbnails is 4 then result will be -> 0, 2.5, 5, 7.5 ,10
                                                // we will use this timestamp to take snapshots
                                                for (i = 0; i <= duration; i += duration / numberOfThumbnails) {
                                                    fractions.push(i);
                                                }
                                                return [4 /*yield*/, Promise.all(fractions.map(function (time) {
                                                        return getVideoThumbnail(videoFile, time).then(function (res) {
                                                            thumbnail.push(res);
                                                        });
                                                    })).then(function (res) {
                                                        resolve(thumbnail);
                                                    })];
                                            case 1:
                                                _a.sent();
                                                return [2 /*return*/];
                                        }
                                    });
                                }); })];
                        case 1:
                            _a.sent();
                            reject("something went wront");
                            return [2 /*return*/];
                    }
                });
            }); })];
    });
}); };
exports.generateVideoThumbnails = generateVideoThumbnails;
var getVideoThumbnail = function (file, videoTimeInSeconds) {
    return new Promise(function (resolve, reject) {
        if (file.type.match("video")) {
            (0, exports.importFileandPreview)(file).then(function (urlOfFIle) {
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
                    var image = canvas.toDataURL();
                    var success = image.length > 100000;
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
                video.currentTime = videoTimeInSeconds;
                video.play();
            });
        }
        else {
            reject("file not valid");
        }
    });
};
/**
 *
 * @param videoFile {File}
 * @returns {number} the duration of video in seconds
 */
var getVideoDuration = function (videoFile) {
    return new Promise(function (resolve, reject) {
        if (videoFile) {
            if (videoFile.type.match("video")) {
                (0, exports.importFileandPreview)(videoFile).then(function (url) {
                    var video = document.createElement("video");
                    video.addEventListener("loadeddata", function () {
                        resolve(video.duration);
                    });
                    video.preload = "metadata";
                    video.src = url;
                    // Load video in Safari / IE11
                    video.muted = true;
                    video.playsInline = true;
                    video.play();
                });
            }
        }
        else {
            reject(0);
        }
    });
};
exports.getVideoDuration = getVideoDuration;
