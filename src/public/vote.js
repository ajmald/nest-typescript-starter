
const app = {
    sendToServer(id){
        let baseURL = 'http://localhost:7000';
        axios.post(`${baseURL}/vote`, {id})
        .then( response => console.log('Successful'));
    },
    
    start(){
        devices = document.querySelectorAll('.poll-device');
        devices.forEach((item, index) => {
            item.addEventListener('click', (e) => {
                this.sendToServer(e.target.id);
            });
        });
    }
};

window.addEventListener('load', () => app.start());

let dataPoints = [
    {label: 'Very Bad/Très Mauvais', y:0},
    {label: 'Bad/Mauvais', y:0},
    {label: 'Neutral/Neutre', y:0},
    {label: 'Good/Bien', y:0},
    {label: 'Very Good/Très bien', y:0}
]

const chartContainer = document.querySelector('#vote-chart-container');

if (chartContainer) {
    const chart = new CanvasJS.Chart('vote-chart-container', {
        animationEnabled: true,
        theme: 'theme1',
        title: {
            text: 'Results/Résultats'
        },
        data: [
            {
                type: 'column',
                dataPoints: dataPoints
            }
        ]
    });
    
    chart.render();
    
    // Pusher
    var pusher = new Pusher('ef30bda08faa7a6c4a6e', {
        cluster: 'ap2',
        encrypted: true
    });
    
    var channel = pusher.subscribe('poll');
    channel.bind('vote', (data) => {
        dataPoints = dataPoints.map(x => {
            if(x.label ==='Very Bad/Très Mauvais') x.label ='verybad';
            if(x.label ==='Bad/Mauvais') x.label ='bad';
            if(x.label ==='Neutral/Neutre') x.label ='neutral';
            if(x.label ==='Good/Bien') x.label ='good';
            if(x.label ==='Very Good/Très bien') x.label ='verygood';
            if (x.label == data.phone.id) {
                x.y += data.points;
                return x;
            } else {
                return x;
            }
        });
        chart.render()
    });
}