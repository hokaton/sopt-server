var express = require('express');
var router = express.Router();

const util = require('../modules/util');
const statusCode = require('../modules/statusCode');
const resMessage = require('../modules/responseMessage');
const foodModel = require('../models/diary');
let moment = require('moment');

// 리스트 보여주기
router.get('/list/:uid', async (req, res) => {
    const uid = req.params.uid;
    const foodlist = await foodModel.showFoodList(uid);

    if (foodlist[0] === undefined) {
        return res.status(statusCode.BAD_REQUEST)
        .send(util.fail(statusCode.BAD_REQUEST, resMessage.NO_DIARY));
    }

    // console.log(foodlist);

    res.status(statusCode.OK)
    .send(util.success(statusCode.OK, resMessage.DIARY_SUCCESS, foodlist));
});

// 일기 작성
router.post('/register', async (req, res) => {
    const {
        uid, 
        diary_title,
        icon_category,
        diary_content
    } = req.body;
    const date = moment().format("MM월 DD일");
    var img;

    if (!uid || !diary_title || !icon_category || !diary_content) {
        return res.status(statusCode.BAD_REQUEST)
        .send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
    }

    if(icon_category === "일식"){
        img = "https://user-images.githubusercontent.com/39720852/83339704-6f919100-a30b-11ea-963b-303a2bb13f66.png";
    }
    else if (icon_category === "중식"){
        img = "https://user-images.githubusercontent.com/39720852/83339843-6bb23e80-a30c-11ea-88cd-c1e3c6497a5e.png";
    }
    else if (icon_category === "한식"){
        img = "https://user-images.githubusercontent.com/39720852/83339887-03179180-a30d-11ea-9544-f523a4d311b4.png";
    }
    else if (icon_category === "분식"){
        img = "https://user-images.githubusercontent.com/39720852/83339898-1dea0600-a30d-11ea-8d19-a0d9f8a86b50.png";
    }
    else{
        img = "https://user-images.githubusercontent.com/39720852/83339903-2fcba900-a30d-11ea-80d3-c41fd8b42445.png";
    }
    
    try {
        const idx = await foodModel.diaryRegister(uid, diary_title, img, icon_category, diary_content, date);

        res.status(statusCode.OK)
        .send(util.success(statusCode.OK, resMessage.CREATE_DIARY, {idx: idx}));
    } catch(err){
        console.log(err);
        throw err;
    }
});

// 달력 조회
router.get('/:uid', async (req, res) => {
    const uid = req.params.uid;
    const cal = await foodModel.showCal(uid);

    // if (uid === null) {
    //     return res.status(statusCode.BAD_REQUEST)
    //     .send(util.fail(statusCode.BAD_REQUEST, resMessage.OUT_OF_VALUE));
    // }

    if (cal[0] === undefined) {
        return res.status(statusCode.BAD_REQUEST)
        .send(util.fail(statusCode.BAD_REQUEST, resMessage.NO_DIARY));
    }

    res.status(statusCode.OK)
    .send(util.success(statusCode.OK, resMessage.CALENDAR_SUCCESS, cal));
})

module.exports = router;