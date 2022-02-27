import ApiManager from './apiManager.mjs';

const datas = await ApiManager.getAll();
console.log(datas);

const chartLabels = [];
const chartDatasTemp = [];
const chartDatasRealFeel = [];
const chartDatasHumidity = [];

const DHT22_salon = datas.sensors.find(e => e.name === "DHT22" && e.location === "salon");

for(const sensorDatas of datas.sensors) {
    const allValues = datas.sensorValues.filter(e => e.sensorId === sensorDatas.id.toString());

    for(const valueDatas of allValues) {
        if(valueDatas.name === "temperature") {
            chartDatasTemp.push(valueDatas.value);
            chartLabels.push(new Date(valueDatas.date).toLocaleTimeString());
        } else if (valueDatas.name === "realFeel") {
            chartDatasRealFeel.push(valueDatas.value);
        } else if (valueDatas.name === "humidity") {
            chartDatasHumidity.push(valueDatas.value);
        }
    }
}


const labels = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
];

const data = {
    labels: chartLabels,
    datasets: [{
        label: 'Temperature',
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: chartDatasTemp,
    },{
        label: "realFeel",
        backgroundColor: 'rgb(99,125,255)',
        borderColor: 'rgb(99,125,255)',
        data: chartDatasRealFeel
    }]
};

const config = {
    type: 'line',
    data: data,
    options: {}
};

const dataHumidity = {
    labels: chartLabels,
    datasets: [{
        label: 'Humidity',
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: chartDatasHumidity,
    },]
};

const configHumidity = {
    type: 'line',
    data: dataHumidity,
    options: {}
};

// Init chart
const chartTemp = new Chart(
    document.getElementById('salon-temp'),
    config
);

const chartHumidity = new Chart(
    document.getElementById('salon-humidity'),
    configHumidity
);
