import schedule from 'node-schedule';

export const cronJob = () => {
    const job = schedule.scheduleJob('31 * * * *', function () {
        console.log('The answer to life, the universe, and everything!');
    });
}
cronJob()