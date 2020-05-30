const pool = require('../modules/pool');
const table = 'foodList';

const food = {
    showFoodList : async (uid) => {
        const query = `SELECT diary_title, icon_img, diary_content FROM ${table} WHERE uid = '${uid}';`;

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
    diaryRegister : async (userId, title, img, category, content, date) => {

        const fields = 'uid, diary_title, icon_img, diary_content, icon_category, diary_date';
        const questions = '?, ?, ?, ?, ?, ?'
        const values = [userId, title, img, content, category, date]
        const query = `INSERT INTO ${table}(${fields}) VALUES(${questions});`;
        ///const query =`INSERT INTO foodList (uid, diary_title, icon_category, diary_content, diary_date) VALUES(${userId}, ${title} , ${category}, ${content}, ${date});`;
        

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
        const query = `SELECT diary_date, diary_write, icon_img FROM ${table} WHERE uid = '${uid}' order by diary_date`;

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