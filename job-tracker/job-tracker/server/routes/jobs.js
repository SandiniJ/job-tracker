const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { getJobs, getJob, createJob, updateJob, deleteJob } = require('../controllers/jobController');

router.use(auth);

router.get('/', getJobs);
router.get('/:id', getJob);
router.post('/', createJob);
router.put('/:id', updateJob);
router.delete('/:id', deleteJob);

module.exports = router;
