
//////////////////////
//universal variables
/////////////////////

//track the picture on display
let picTracker = 0
//collect pictures from json
let slideshow
let pics = []
let filteredPics = []
//declare url for fetch
const requestUrl = "https://www.reddit.com/search.json?q="

///////////////////////////
////////universal functions 
///////////////////////////

//cycle through the slideshow
const takeTheStage = (array) => {
    //display the image found at next url in the array
    stage.src = `${array[picTracker]}`
    //increment or reset tracker to 0 to maintain loop
    if (picTracker === array.length - 1) {
        console.log(`inside tracker checker!: tracker === array.length `)
        picTracker = 0;
    } else if (picTracker >= 0 && picTracker < array.length){
        console.log(`inside tracker checker! : tracker !== array.length`)
        picTracker++
        console.log(`tracker is now ${picTracker}`)
    }
}

//filter urls and only return those that are images hosted on reddit
const siftImages = (url) =>{
    console.log(`filter running on ${url}!`)
    if  ((url.includes(".jpg") || url.includes(".png")) ) {  
        return true
    } else {
        return false
    }
}

//make fetch happen
const fetchRedditData = () => {
    fetch(`${requestUrl}${input.value}%20pictures&limit=100`)
    ///when working add+input.value+"%20pictures")
    .then((responseData) => {
        //extract the JSON data from the fetch object
        return responseData.json()
    })
    .then((jsonData) => {
        console.log(jsonData.data)
        console.log(jsonData.data.children[0].data.url)
        const jsonArray = jsonData.data.children
        
        //add images to array
        for (let i = 0; i < jsonArray.length; i++) {
            //grab image url from json
            const imageUrl = jsonArray[i].data.url
            pics[i] = `${imageUrl}`
            console.log(`captured image${i}: ${imageUrl}`)
        }
        //filter the array of urls from json
        console.log(`about to filter ${pics}`)
        filteredPics = pics.filter(siftImages)
        console.log(filteredPics)
        
        //begin the slideshow and set interval
        slideshow = setInterval(takeTheStage, 2000, filteredPics)
    
    })
    .catch((error)=>{
    console.log("ERROR")
    console.log("ERROR")})
}

const slideshowMode = () => {
    //hide form and text
    title.style.display = "none"
    instructions.style.display = "none"
    form.style.display = "none"
    //reveal stop button and image
    stopButton.style.display = "grid"
    displayContainer.style.display = "block"
    stage.style.display = "block"
    //make alt relavent
    stage.alt = 'getting ' + input.value + ' pics...'

}

/////////////////////////////////
////Event Listeners
/////////////////////////////////

//DOM Loaded Listener
document.addEventListener("DOMContentLoaded", () => {
    //submit button listener
    form.addEventListener("submit", (e) => {
        //don't let the page refresh!
        e.preventDefault()
        //make fetch happen
        fetchRedditData()
        //Hide form and text
        slideshowMode()
    })
    //////////////////////////////////////
    /////Stop Button Listener and Function
    //////////////////////////////////////
    stopButton.addEventListener('click', () =>{
        console.log("stop clicked!")
        //reset variables 
        picTracker = 0
        pics = []
        filteredPics = []

        //stop slideshow
        clearInterval(slideshow)
        //hide image and clear src and alt
        displayContainer.style.display = "none"
        stage.style.display = "none"
        stage.src = "#"
        stage.alt = "#"
        //hide STOP and clear input
        stopButton.style.display = "none"
        input.value = ""
        //reveal text and form
        title.style.display = "block"
        instructions.style.display = "block"
        form.style.display = "block"
    })
})



