
  
  

    async function createLeaderboard(){ 
        const data = await fetch('/data').then(res => res.json());  
        const leaderboard = document.querySelector('.leaderboard');
    const leaderboardItem = document.createElement('li');
    const leaderboardList = document.createElement('ol');
    
        leaderboardList.classList.add('leaderboard-list');
        leaderboard.appendChild(leaderboardList);

        data.forEach((data) => {
            leaderboardItem.classList.add('leaderboard-item');
            leaderboardItem.innerHTML = `${data.name} - ${data.score}`;
            leaderboardList.append(leaderboardItem);
            console.log(data);
        })
        //add each below the other 
    // data.map((data) => {
    //     leaderboardItem.classList.add('leaderboard-item');
    //     leaderboardItem.innerHTML = `${data.name} - ${data.score}`;
    //     leaderboardList.appendChild(leaderboardItem);
    //     console.log(data);
    // })

    }
    createLeaderboard();


//      function updateLeaderboard() {

//     const response = fetch("/data");
//     const data = response.json();
//     const root = document.querySelectorAll('.leaderboard') 
//     const table = document.createElement('table');
//     const rows = data.rows
//     console.log("updateLeaderboard")
//     console.log(data); 
//     table.classList.add('lbTable');
//     table.innerHTML = `
//         <tbody>
//         </tbody>
//     `;
    
   
//         table.querySelectorAll('tbody').insertAdjacentHTML('beforeend', `
//         <tr>
//             ${ rows.map (row => `<td>${row}</td>`).join('') }
//         </tr>
//         `)
//         root.append(table);
// }
    



