const pool = require('../modules/pool');
const table = 'foodList';

const food = {
    showFoodList : async () => {
        const query = `SELECT * FROM ${table}`;

        try {
            const result = await pool.queryParam(query);
            return result;
        } catch (err) {
            if (err.errno == 1062) {
                console.log('showFoodList ERROR: ', err.errno, err.code);
                return -1;
            }
            console.log('showFoodList ERROR: ', err);
            throw err;
        }
    },
    diaryRegister : async (userId, title, category, content) => {
        const fields = 'uid, diary_title, img_category, diary_content';
        const questions = '?, ?, ?, ?'
        const values = [userId, title, category, content]
        const query = `INSERT INTO ${table}(${fields}) VALUES(${questions})`;

        try {
            const result = await pool.queryParamArr(query, values);
            // INSERT 문이 실행되었을 때 삽입된 데이터의 id 얻는 방법
            const insertId = result.insertId;
            return insertId;
        } catch (err) {
            if (err.errno == 1062) {
                console.log('diaryRegister ERROR: ', err.errno, err.code);
                return -1;
            }
            console.log('diaryRegister ERROR: ', err);
            throw err;
        }
    },
    showCal : async (uid) => {
        const query = `SELECT * FROM ${table} WHERE uid = '${uid}'`;

        try {
            const result = await pool.queryParam(query);
            return result;
        } catch (err) {
            if (err.errno == 1062) {
                console.log('showCal ERROR: ', err.errno, err.code);
                return -1;
            }
            console.log('showCal ERROR: ', err);
            throw err;
        }
    }
}

module.exports = food;