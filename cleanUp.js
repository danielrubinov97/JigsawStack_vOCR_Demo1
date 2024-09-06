async function webScrapeAI(){
    const resp = await jigsawstack.web.ai_scrape({
        // url: "https://www.amazon.com/SAMSUNG-Smartphone-Handsfree-Interpreter-Manufacturer/dp/B0D198N6Y6/",
        url: "https://www.amazon.com/s?k=samsung+galaxy+fold+6",
        element_prompts: ["href to each unique product"],
    });
    
    console.log("RESPONSE", resp.data)
    if(resp.data.length && resp.data.length > 0){
        
        let urls = resp.data.map((eachData, dataIndex) => {
            //extract urls
            const url = eachData.selector.split("\'")
            // console.log("url", url)
            // console.log("DATA", dataIndex.toString(), eachData.results)
            return url[1];
            // if(eachData.results.length && eachData.results.length > 0){
            //     eachData.results.map((eachDataResult) => {
            //         console.log("+++++++ Attributes", eachDataResult.attributes)
            //     })
            // }
        })
    
        //For each url find the price of each item
        urls.map(async (eachURL, eachURLIndex) => {
            console.log("SEARCHING", `https://www.amazon.com${eachURL}`)
            const resp2 = await jigsawstack.web.ai_scrape({
                // url: "https://www.amazon.com/SAMSUNG-Smartphone-Handsfree-Interpreter-Manufacturer/dp/B0D198N6Y6/",
                url: `https://www.amazon.com${eachURL}`,
                element_prompts: ["title"],
            });
            console.log("RESPONSE", eachURLIndex, resp2.data.map((eachData) => JSON.stringify(eachData.results)))
        })
        
    }
}