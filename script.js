/*import { getNews } from './api.js'
// const contentWrapper = document.querySelector("contentWrapper");
// getNews().then(data => renderNews(data.article))
 getNews().then(data => console.log(articles))*/
/*function renderNews(newsData) {
    newsData.forEach(news => {
        const data = {
            urlImage: news.urlToImage,
            date: news.publishedAt,
            title: news.title,
            description: news.description,
            url: news.url
        }
        const card=`
        <div class="card2">
            <div class="card-image-wrapper">
                <img src="${data.urlImage}" alt="">
            </div>
            <div class="card-conetnt">
                <span class="card-date">
                    ${data.date}
                </span>
                <h2 class="card-title">
                    <a href="${data.url}">${data.title}</a>
                    
                </h2>
                <p class="card-description">
                    ${data.description}
                </p>
            </div>
        </div>
        `

        contentWrapper.insertAdjacentHTML("beforeend", card);

})
}*/

const stalkSecond=document.querySelector(".stalk-second");
const stalkMinute=document.querySelector(".stalk-minute");
const stalkHour=document.querySelector(".stalk-hour");
setInterval(function(){
    // console.log("Printing time");
    const date = new Date()

    const second = date.getSeconds()*6;
    const minute = date.getMinutes()*6;
    const hour = date.getHours()*30;

    stalkSecond.style.transform=`rotate(${second}deg)`;
    stalkMinute.style.transform=`rotate(${minute}deg)`;
    stalkHour.style.transform=`rotate(${hour}deg)`;

}, 1000)
