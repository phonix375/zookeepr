const router = require('express').Router();
const animalRoutes = require('../apiRoutes/animalRoutes');
const zookeepersRouter = require('../apiRoutes/zookeeperRoutes');

router.use(animalRoutes);
router.use(zookeepersRouter)

module.exports = router;