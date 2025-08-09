
const URL = require("../models/url");
async function handleGenerateShortId(req,res) {
    const url = req.body.url;
    if(!url){
        return res.status(400).json({error:"URL not Found"});
        
    }
    var id = require('short-id');
    const shortid = id.generate();
    const result= await URL.create({
        shortId:shortid,
        url:url,
        urlHistory: [{ timestamps: new Date() }]
    });

    return res.json({shortid:result.shortId});

}

async function handleShortIdCLick(req,res) {
    const id = req.params.shortId;
    const result = await URL.findOneAndUpdate({shortId:id},{
        $push:{
            urlHistory:{
                timestamps:new Date()
            }
        }
    })
    res.redirect(result.url);
    
}

async function handleAnalytics(req,res) {
    const id = req.params.shortId;
    const result = await URL.findOne({shortId:id});
    if (!result) {
        return res.status(404).json({ error: "Short URL not found" });
    }

    return res.json({
        totalClicks: result.urlHistory.length,
        history: result.urlHistory
    });
}
module.exports={handleGenerateShortId,handleShortIdCLick,handleAnalytics}