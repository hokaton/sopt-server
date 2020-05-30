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

    if(foodlist[0] === undefined) {
        res.status(statusCode.BAD_REQUEST)
        .send(util.fail(statusCode.BAD_REQUEST, resMessage.NO_BLOG));
    }

    console.log(foodlist);


    res.status(statusCode.OK)
    .send(util.success(statusCode.OK, resMessage.BLOG_SUCCESS, foodlist));
});

// 일기 작성
router.post('/register', async (req, res) => {
    const {
        userId, 
        title,
        category,
        content
    } = req.body;
    const date = moment().format("MM월 DD일");
    var img;

    if(category === "일식"){
        img = "https://user-images.githubusercontent.com/39720852/83339704-6f919100-a30b-11ea-963b-303a2bb13f66.png";
    }
    else if (category === "중식"){
        img = "https://user-images.githubusercontent.com/39720852/83339843-6bb23e80-a30c-11ea-88cd-c1e3c6497a5e.png";
    }
    else if (category === "한식"){
        img = "https://user-images.githubusercontent.com/39720852/83339887-03179180-a30d-11ea-9544-f523a4d311b4.png";
    }
    else if (category === "분식"){
        img = "https://user-images.githubusercontent.com/39720852/83339898-1dea0600-a30d-11ea-8d19-a0d9f8a86b50.png";
    }
    else{
        img = "https://user-images.githubusercontent.com/39720852/83339903-2fcba900-a30d-11ea-80d3-c41fd8b42445.png";
    }
    
    try{const idx = await foodModel.diaryRegister(userId, title, img, category, content, date);
    //res.status(statusCode.Ok).send(util.success(statusCode.Ok, resMessage.BLOG_SUCCESS, {diaryIdx: idx} ));
    res.status(statusCode.OK)
    .send(util.success(statusCode.OK, resMessage.BLOG_SUCCESS, {idx: idx} ));
    } catch(err){
        console.log(err);
        throw err;
    }
});

router.get('/:uid', async (req, res) => {
    const uid = req.params.uid;
    const cal = await foodModel.showCal(uid);


    res.status(statusCode.OK)
    .send(util.success(statusCode.OK, resMessage.BLOG_SUCCESS, cal));
})

module.exports = router;