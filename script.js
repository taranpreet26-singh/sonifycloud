
let audio = new Audio()
let listSong = []
let musicNameList = []
let currIndex = -1
let currFolder
let val 
async function getSong(ns) {
    if(typeof val === "undefined"){
        ns = "all"
    }

        val = ns
    

    console.log(val,ns)
    listSong = []
    musicNameList = []
    console.log(listSong,musicNameList,"step1")
    let doc = await fetch(`http://127.0.0.1:3000/spotify_clone/music/${val}`)
    let response = await doc.text()
    console.log(response)
    let div = document.createElement("div")
    div.innerHTML = await response
    let a = div.getElementsByTagName("a")
    // console.log(a) 
    let arr = []
    listSong = []
    musicNameList = []
    
    for (let index = 0; index < a.length; index++) {
        const element = a[index];
        if (element.href.endsWith("mp3")) {
            // console.log(element.href)
            arr.push(element.href)
            let el = element.textContent.slice(0, -4)
            musicNameList.push(el)
            listSong.push(element.href)
        }

    }
    console.log(listSong,musicNameList,"step2")
    setMusicList(musicNameList)
    return arr
}



    Array.from(document.querySelector(".card-container").getElementsByClassName("card")).forEach(val => {
        val.addEventListener("click", el => {
            currFolder = val.querySelector("h4").innerHTML.toLowerCase().replace(" ", "")
            console.log(currFolder)

            if( currFolder.includes("all")){

                getSong("all")
              
            }else if(currFolder.includes("ns")){

                getSong("ns")    
            }else if(currFolder.includes("sul")){
                getSong("sul")
            }else if(currFolder.includes("dil")){
                getSong("dil")
            }else if(currFolder.includes("sat")){
                getSong("sat")
            }else if(currFolder.includes("auj")){
                getSong("auj")
            }
            else{
                getSong("ns")
            }

            main()
            
            // if(currFolder.includes("ns")){

            //     console.log("hllo1")
            //     getSong("ns")
            //     console.log("hllo2")
            //     main()
            // }
        })
    })



function setMusicList(musicName) {
    let musicListName = musicName
    let ml = document.querySelector(".music-list ul")
    ml.innerHTML = ""
    let i = 0
    musicListName.forEach(el => {
        let p = document.createElement("h6")
        p.innerHTML = el
        let li = document.createElement("li")
        let img = document.createElement("img")
        img.src = "images/wave-sound.png"
        img.classList.add("icon-width")
        li.appendChild(img)
        li.appendChild(p)
        ml.appendChild(li)

    });



}

async function main() {
    let song = await getSong(val)
    //    console.log(song[4])
    Array.from(document.querySelector(".music-list").getElementsByTagName("h6")).forEach(element => {
        // console.log(element.textContent)
        element.addEventListener("click", el => {
            console.log(element.textContent, "hello")
            musicPlay(element.textContent, song)
        })
    });
    //    audio.play()
}


function musicPlay(musicName, songList) {
    let arr = songList

    console.log(musicName)
    for (let index = 0; index < songList.length; index++) {
        const element = songList[index];
        let str = element
        str = element.replaceAll("%20", " ")
        str = str.slice(str.lastIndexOf("/") + 1,)
        str = str.slice(0, 4)
        console.log(str, " ------- ", musicName, "checking")


        if (musicName.includes(str)) {
            console.log("yes present", arr.indexOf(element))
            startPlay(arr, arr.indexOf(element))
            currIndex = arr.indexOf(element)
        } else {
            console.log("no")
        }
    }
}

function startPlay(arr, index) {
    // let audio = new Audio(arr[index]) 

    audio.src = arr[index]

    console.log(arr[index])
    // audio.play()
    let playbtn = document.getElementById("play")
    // playbtn.src ="images/pause.png"
    let nameOfSong = document.querySelector(".music-name")

    nameOfSong.innerHTML = `<p>${musicNameList[index]}</p>`
    if (audio.paused) {
        audio.play()
        playbtn.src = "images/pause.png"
    } else {
        audio.pause()
        playbtn.src = "images/play.png"

    }

}
console.log(musicNameList, "list")

prev.addEventListener("click", () => {
    console.log("prev click", listSong.length - 1)

    if (currIndex <= 0) {
        currIndex = listSong.length - 1
    } else {
        currIndex = currIndex - 1
    }
    startPlay(listSong, currIndex)
    console.log(currIndex)

})

next.addEventListener("click", () => {
    console.log("next click")
    console.log("prev click", listSong.length - 1)

    if (currIndex >= 7) {
        currIndex = 0
    } else {
        currIndex = currIndex + 1
    }
    startPlay(listSong, currIndex)
    console.log(currIndex)


})


play.addEventListener("click", () => {
    console.log("clicked play")
    let playbtn = document.getElementById("play")
    if (!audio.src) {
        audio.src = listSong[Math.floor(Math.random() * listSong.length)]
    } else {

        if (audio.paused) {
            audio.play()
            playbtn.src = "images/pause.png"

        } else {
            audio.pause()
            playbtn.src = "images/play.png"
        }
    }
})

audio.addEventListener("timeupdate", () => {
    // console.log(audio.currentTime, audio.duration)
    let durationSetting = document.querySelector(".duration")
    durationSetting.innerHTML = `<p>${Math.floor(audio.currentTime / 60)}:${Math.floor(audio.currentTime % 60)}/</p>
                                 <p>${Math.floor(audio.duration / 60)}:${Math.floor(audio.duration % 60)}</p>`

    document.querySelector(".circle").style.left = `${(audio.currentTime / audio.duration) * 100}%`
})

document.querySelector(".seek-bar").addEventListener("click", (el) => {
    let percent = ((el.offsetX / el.target.getBoundingClientRect().width) * 100) + "%"
    console.log(percent)
    document.querySelector(".circle").style.left = percent
    percent = percent.replace("%", "")
    console.log(audio.duration, percent, (audio.duration * percent) / 100)
    audio.currentTime = (audio.duration * percent) / 100

})
main()

document.querySelector(".hamburger").addEventListener("click", () => {
    document.querySelector(".left").style.left = `${0}%`
    console.log("hamburger clicked")
})

document.querySelector(".cancel").addEventListener("click", () => {
    document.querySelector(".left").style.left = `${-100}%`
    console.log("cancel clicked")

})