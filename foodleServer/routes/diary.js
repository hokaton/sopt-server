var express = require('express');
var router = express.Router();

const util = require('../modules/util');
const statusCode = require('../modules/statusCode');
const resMessage = require('../modules/responseMessage');
const foodModel = require('../models/diary');

// 리스트 보여주기
router.get('/list', async (req, res) => {
    const foodlist = await foodModel.showFoodList();

    if(foodlist[0] === undefined) {
        res.status(statusCode.BAD_REQUEST)
        .send(util.fail(statusCode.BAD_REQUEST, resMessage.NO_BLOG));
    }

    console.log(foodlist);

    const fData = [{
        idx: foodlist[0].foodListIdx,
        title: foodlist[0].title
    },];

    res.status(statusCode.OK)
    .send(util.success(statusCode.OK, resMessage.BLOG_SUCCESS, fData));
});

// 일기 작성
router.post('/register', async (req, res) => {
    const {
        userId, 
        title,
        category,
        content
    } = req.body;

    const idx = await foodModel.diaryRegister(userId, title, category, content);
    res.status(statusCode.Ok)
    .send(util.success(statusCode.Ok, resMessage.BLOG_SUCCESS, {diaryIdx: idx}));
});

router.get('/:uid', async (req, res) => {
    const uid = req.params.uid;
    const cal = await foodModel.showCal(uid);

    const fData = [{
        idx: cal[0].foodListIdx
    }];

    res.status(statusCode.OK)
    .send(util.success(statusCode.OK, resMessage.BLOG_SUCCESS, fData));
})

module.exports = router;