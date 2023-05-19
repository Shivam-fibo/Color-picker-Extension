document.addEventListener("DOMContentLoaded", () => {
    const btn = document.querySelector(".changeColorBtn");
    const colorGrid = document.querySelector('.colorGrid')
    const colorValue = document.querySelector('.colorValue')
    
  
    btn.addEventListener("click", async() => {
    let [tab]= await chrome.tabs.query({active:true , currentWindow: true})
    color = chrome.storage.syn.get('color', ({color})=>{
        console.log(color)
    })
    chrome.scripting.executeScript({
        target : {tabId : tab.id},
        function :pickColor
    }, async(injectionResults) =>{
        const [data]= injectionResults;
        if(data.result)
        {
            const color = data.result.sRGBHex;
            colorValue.innerText = color;
            colorGrid.style.backgroundColor = color;
            try{
                await navigator.clipboard.writeText(color)
            } catch(error){
                console.error(error);
            }

        }
        console.log(data);
    });

    });
   async   function pickColor()
    {
        try{
        const eyeDroper = new EyeDropper();
       return await eyeDroper.open()

        } catch(err){
            console.error(err);

        }
    }
  });