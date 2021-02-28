const express = require('express');
//===============mergeParams: true if not it will show "reiews" is null.
const router = express.Router({ mergeParams: true });
//===============
const catchAsync = require('../utils/catchAsync');
const reviews = require('../controllers/reviews')
const { isLoggedIn, validateReview } = require('../middleware')


// Reviews
router.post('/',isLoggedIn, validateReview, catchAsync(reviews.createReview))

router.delete('/:reviewId',isLoggedIn, catchAsync(reviews.deleteReview))

module.exports = router