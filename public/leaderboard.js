    async function createLeaderboard(){ 
        const data = await fetch('/data').then(res => res.json());  
        const leaderboard = document.querySelector('.leaderboard');
        const leaderboardList = document.createElement('ol'); 
    
        leaderboardList.classList.add('leaderboard-list');
        leaderboard.appendChild(leaderboardList);
        
    data.map((data) => {
        const leaderboardItem = document.createElement('li');
        leaderboardItem.classList.add('leaderboard-item' + data.id);
        leaderboardItem.innerHTML = `${data.name} - ${data.score}`;
        leaderboardList.appendChild(leaderboardItem);
        console.log(data);
    })
}

    createLeaderboard();

