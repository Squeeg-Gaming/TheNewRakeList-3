// https://stackoverflow.com/questions/3452546/how-do-i-get-the-youtube-video-id-from-a-url
export function getYoutubeIdFromUrl(url) {
    return url.match(
        /.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#\&]*).*/,
    )?.[ 1 ] ?? '';
}

export function getMedalIdFromUrl(url) {
    return url.match(/medal\.tv\/(?:clip|clips|games\/[^\/]+\/clips)\/([^\/?#]+)/)?.[ 1 ] ?? '';
}

export function getTwitchClipIdFromUrl(url) {
    let match = url.match(/clips\.twitch\.tv\/([^\/?#]+)/);
    if (match) return match[ 1 ];

    match = url.match(/twitch\.tv\/[^\/]+\/clip\/([^\/?#]+)/);
    if (match) return match[ 1 ];

    match = url.match(/twitch\.tv\/clip\/([^\/?#]+)/);
    if (match) return match[ 1 ];

    return '';
}

export function getGoogleDriveIdFromUrl(url) {
    if (!url) return '';
    let match = url.match(/drive\.google\.com\/file\/d\/([^\/?#]+)/);
    if (match) return match[ 1 ];

    match = url.match(/drive\.google\.com\/open\?id=([^&\/#]+)/);
    if (match) return match[ 1 ];

    match = url.match(/uc\?id=([^&\/#]+)/);
    if (match) return match[ 1 ];

    return '';
}

export function getVimeoIdFromUrl(url) {
    return url.match(/vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/(?:[^\/]*)\/videos\/|album\/(?:\d+)\/video\/|video\/|)(\d+)(?:$|\/|\?)/)?.[ 1 ] ?? '';
}

export function getDailymotionIdFromUrl(url) {
    return url.match(/dailymotion\.com\/video\/([a-zA-Z0-9]+)/)?.[ 1 ] ?? '';
}

export function getStreamableIdFromUrl(url) {
    return url.match(/streamable\.com\/([a-zA-Z0-9]+)/)?.[ 1 ] ?? '';
}

export function getLoomIdFromUrl(url) {
    return url.match(/loom\.com\/(?:share|embed)\/([a-zA-Z0-9]+)/)?.[ 1 ] ?? '';
}

export function getTikTokIdFromUrl(url) {
    return url.match(/tiktok\.com\/@[\w.-]+\/video\/(\d+)/)?.[ 1 ] ?? '';
}

export function getKickIdFromUrl(url) {
    return url.match(/[?&]clip=([a-zA-Z0-9_]+)/)?.[ 1 ] ?? '';
}

export function getVideoPlatform(url) {
    if (!url) return "unknown";
    
    if (/youtu\.?be/.test(url)) return "youtube";
    if (/medal\.tv/.test(url)) return "medal";
    if (/twitch\.tv/.test(url) || /clips\.twitch\.tv/.test(url)) return "twitch";
    if (/drive\.google\.com/.test(url)) return "googledrive";
    if (/vimeo\.com/.test(url)) return "vimeo";
    if (/dailymotion\.com/.test(url)) return "dailymotion";
    if (/streamable\.com/.test(url)) return "streamable";
    if (/loom\.com/.test(url)) return "loom";
    if (/tiktok\.com/.test(url)) return "tiktok";
    if (/kick\.com/.test(url)) return "kick";

    if (/\.mp4($|\?)/i.test(url)) return "mp4";

    return "unknown";
}

// ilovegoodies445
// nah nvm
export function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
export function getScratchPFP(username) {
    return "https://uploads.scratch.mit.edu/get_image/user/111315218_90x90.png?v=";
    let b = getAPI(username);
    b.then(hsdkjhwsfkjwh => { return hsdkjhwsfkjwh })
}
async function getAPI(username) {
    const res = await fetch(`https://cors.gays3xlol.workers.dev/https://api.scratch.mit.edu/users/${encodeURIComponent(username)}`);
        const obj = await res.json();
        const objParsed = JSON.parse(JSON.stringify(obj));
        if (objParsed.profile) {
            return `https://uploads.scratch.mit.edu/get_image/user/${objParsed.profile.id}_90x90.png`;
        } else {
            return "https://uploads.scratch.mit.edu/get_image/user/1_90x90.png"
        }
    }
export function getLevelThumbnail(levelPos, list) {
            if (list == undefined || levelPos == undefined) {
                return 0;
            } else {
                console.log("The List:");
                console.log(list);
                console.log("The Level Position:");
                console.log(levelPos);
                const currentLevel = list[ levelPos ][ 0 ];
                /* console.error(currentLevel);
                console.log("The List:");
                console.log(list);
                console.log("The Level Position:");
                console.log(levelPos);
                console.log("The Current Level:");
                console.log(currentLevel); */
                // do not close WHY CLOSE!!!!!!!
                // old code (yt thumbnail)
                // return `background-image: url(https://img.youtube.com/vi/${getYoutubeIdFromUrl(currentLevel.verification)}/mqdefault.jpg);`;
                return setUpThumbnailStyle(currentLevel.name);
            }
}
export function getLevelThumbnailR(levelPos, list) {
            if (list == undefined || levelPos == undefined) {
                return 0;
            } else {
                console.log("The List:");
                console.log(list);
                console.log("The Level Position:");
                console.log(levelPos);
                const currentLevel = list[ levelPos ];
                return setUpThumbnailStyle(currentLevel.name);
            }
}
function setUpThumbnailStyle(levelName) {
                if (levelName == "getting kicked out of train") {
                    return `background-image: linear-gradient(rgb(0 0 0 / 0.5), rgb(0 0 0 / 0.5)), url(https://www.amtrak.com/content/dam/projects/dotcom/english/public/images/heros/couple-cafe-window-view.jpg); background-size: cover; background-repeat: no-repeat; background-position: center;`
                } else {
                return `background-image: var(--level-button), url("${getThumbnailImage(levelName, "yea")}"); background-size: cover; background-repeat: no-repeat; background-position: center;`
                }
            }
export function getThumbnailImage(lvlName) {
    return `../assets/levels/${encodeURIComponent(lvlName)}.png`;
}
export function embed(video) {
    const platform = getVideoPlatform(video);
    let src = video;

    if (platform === "youtube") {
        src = `https://www.youtube.com/embed/${getYoutubeIdFromUrl(video)}`;
    } else if (platform === "medal") {
        src = `https://medal.tv/clip/${getMedalIdFromUrl(video)}`;
    } else if (platform === "twitch") {
        const id = getTwitchClipIdFromUrl(video);
        const parent = (typeof window !== "undefined" && window.location && window.location.hostname)
            ? window.location.hostname
            : "localhost";
        src = `https://clips.twitch.tv/embed?clip=${id}&parent=${parent}`;
    } else if (platform === "googledrive") {
        src = `https://drive.google.com/file/d/${getGoogleDriveIdFromUrl(video)}/preview`;
    } else if (platform === "vimeo") {
        src = `https://player.vimeo.com/video/${getVimeoIdFromUrl(video)}`;
    } else if (platform === "dailymotion") {
        src = `https://www.dailymotion.com/embed/video/${getDailymotionIdFromUrl(video)}`;
    } else if (platform === "streamable") {
        src = `https://streamable.com/o/${getStreamableIdFromUrl(video)}`;
    } else if (platform === "loom") {
        src = `https://www.loom.com/embed/${getLoomIdFromUrl(video)}`;
    } else if (platform === "tiktok") {
        src = `https://www.tiktok.com/embed/v2/${getTikTokIdFromUrl(video)}`;
    } else if (platform === "kick") {
        src = `https://player.kick.com/clip/${getKickIdFromUrl(video)}`;
    }

    const safeSrc = src.replace(/"/g, '&quot;');

    if (platform === "mp4") {
        return `<video class="video" id="videoframe" src="${safeSrc}" controls autoplay playsinline loop style="width: 100%; height: 100%; max-width: 100%; max-height: 100%; object-fit: contain; background: #000; border-radius: 8px;"></video>`;
    }

    return `<iframe class="video" id="videoframe" src="${safeSrc}" frameborder="0" allow="autoplay; fullscreen; encrypted-media; picture-in-picture" allowfullscreen></iframe>`;
}
export function mamaMia(swaggers) {
     console.log("../assets/" + swaggers + ".svg");
     return "../assets/" + swaggers + ".svg";
}
export async function getPeople() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
           // Typical action to be performed when the document is ready:
           console.log("yes sir");
           document.getElementById("displayVisits").innerHTML = xhttp.responseText;
        }
    };
    xhttp.open("GET", "../data/stats/displayVisits.php", true);
    xhttp.send();
}
export async function incVisits() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
           // Typical action to be performed when the document is ready:
        }
    };
    xhttp.open("GET", "../data/stats/incrementVisits.php", true);
    xhttp.send();
}
var incGDR = 0;
export async function otherStats(list) {
    incGDR = 0;
    for (let i = 0; i < list.length; i++) {
        console.log(list[ i ].find(isGDR));
    }
    var timeDifference;
    var j;
    j = new Date();
    timeDifference = Math.floor(((new Date() / 1000) - 1763410264) / 86400);
    console.log(timeDifference);
    console.log(incGDR);
    document.getElementById("displayListLength").innerHTML = list.length;
    document.getElementById("displayMostUsedEngine").innerHTML = incGDR;
    document.getElementById("displayDaysSincePublic").innerHTML = timeDifference;
}

function isGDR(level) {
  if (level === null) {
      return 0;
  } else {
      if (level.engine === "GDR") {
          incGDR++;
      }
      return level.engine === "GDR";
  }
}
export function localize(num) {
    return num.toLocaleString(undefined, { minimumFractionDigits: 2 });
}

export function doStuff(levelName) {
    return "background-image: url('../assets/levels/Greyhound.webp');";
}
export function getEngineSelect() {
    console.log("juz pomnie,.");
    let params = new URLSearchParams(document.location.search); 
    console.log(params.get("engine"));
    if (params.get("engine") == "All") {
        return null;
    } else {
        return params.get("engine");
    }
}
export function getSelectSelect(list) {
    console.log("Yayers");
    let params = new URLSearchParams(document.location.search); 
    let selectedInt = parseInt(params.get("selected"));
    console.log(params.get("selected"));
    if (selectedInt == null || isNaN(selectedInt) || selectedInt - 1 > list.length || selectedInt - 1 < 0) {
        return null;
    } else {
        return selectedInt - 1;
    }
    return selectedInt - 1;
}

export function selectRandomLevel(levels) {
    console.log("They done clicked the egg button!!!");
    let randomLevel = getRandomInt(levels.length)
    return randomLevel;
}

export function getThumbnailFromId(urlOrId) {
    const DEFAULT_THUMB = '/assets/default.png';

    if (!urlOrId) return DEFAULT_THUMB;

    const input = String(urlOrId).trim();
    const platform = getVideoPlatform(input);

    const possibleYouTubeId = input.match(/^[A-Za-z0-9_-]{6,}$/);

    if (platform === "youtube") {
        const id = getYoutubeIdFromUrl(input) || (possibleYouTubeId && possibleYouTubeId[ 0 ]);
        if (id) return `https://img.youtube.com/vi/${id}/mqdefault.jpg`;
    }

    if (platform === "unknown" && possibleYouTubeId) {
        return `https://img.youtube.com/vi/${possibleYouTubeId[ 0 ]}/mqdefault.jpg`;
    }

    if (platform === "medal") {
        const id = getMedalIdFromUrl(input);
        if (id) return `https://medal.tv/clip/${id}`;
    }

    if (platform === "twitch") {
        const id = getTwitchClipIdFromUrl(input);
        if (id) return `https://clips-media-assets2.twitch.tv/${id}-preview-480x272.jpg`;
    }

    if (platform === "googledrive") {
        const id = getGoogleDriveIdFromUrl(input);
        if (id) return `https://drive.google.com/thumbnail?id=${id}&sz=w544-h306`;
    }

    if (platform === "dailymotion") {
        const id = getDailymotionIdFromUrl(input);
        if (id) return `https://www.dailymotion.com/thumbnail/video/${id}`;
    }

    if (platform === "loom") {
        const id = getLoomIdFromUrl(input);
        if (id) return `https://cdn.loom.com/sessions/thumbnails/${id}-with-play.gif`;
    } 

    // 2. Returns fallback for unsupported platforms (Vimeo, Streamable, MP4, etc.)
    return DEFAULT_THUMB;
}

export function listLevelNameFilter() {
    if (!document.getElementById("filterForLevelName") == null)
        document.getElementById("filterForLevelName").addEventListener("keyup", () => {
        console.log(`Name: ${document.getElementById("filterForLevelName").value}`);
    });
}
export function listPlayerFilter() {
    if (!document.getElementById("filterForPlayerlName") == null)
        document.getElementById("filterForPlayerName").addEventListener("keyup", () => {
        console.log(`Name: ${document.getElementById("filterForPlayerName").value}`);
    });
}
// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
export function shuffle(array) {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {
        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [ array[ currentIndex ], array[ randomIndex ] ] = [
            array[ randomIndex ],
            array[ currentIndex ],
        ];
    }

    return array;
}
export function getFpsSelect() {
    console.log("work hello please");
    let params = new URLSearchParams(document.location.search); 
    console.log(params.get("fps"));
    if (params.get("fps") == "") {
        return null;
    } else {
        return params.get("fps");
    }
}
