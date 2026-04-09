const API_KEY = 'a3bbfad3403f4522b55e5bab5ce96440';
const BASE_URL='https://newsapi.org/v2';

export async function getNews() {
    try{
        const getNewsDataApi=await
        fetch(`${BASE_URL}/top-headlines?country=us&apiKey=${API_KEY}`);
        console.log(await getNewsDataApi.json());
    }   
    catch(error){
        console.error(error);
        displayError("An error occurred while fetching the news data. Please try again later.");
    }
}