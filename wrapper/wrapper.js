const axios = require("axios");

const env = process.env;

const headers = {
    Authorization: env.VALOKEY,
};

async function getRank(val){
    try {
        const response = await axios(`https://api.henrikdev.xyz/valorant/v1/mmr/eu/${val[0]}/${val[1]}`, { 
            headers: {
                "Authorization": env.VALOKEY,
            }
        });
        return response.data.data.currenttierpatched.split(" ")[0];
    } catch (error) {
        console.error('Error fetching rank:', error);
        return null;
    }
}

async function getData(val){
    try {
        const response = await axios(`https://api.henrikdev.xyz/valorant/v1/mmr/eu/${val[0]}/${val[1]}`, { 
            headers: {
                "Authorization": env.VALOKEY,
            }
        });
        
        return response.data.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}

module.exports = {getData, getRank};