var express = require('express');
var router = express.Router();

var project_controller = require('../controllers/projectController');
var workingitem_controller = require('../controllers/workingitemController');

/// PROJECT ROUTES ///

router.get('/project/create', project_controller.project_create_get);
router.post('/project/create', project_controller.project_create_post);

router.get('/project/:id/delete', project_controller.project_delete_get);
router.post('/project/:id/delete', project_controller.project_delete_post);

router.get('/project/:id/update', project_controller.project_update_get);
router.post('/project/:id/update', project_controller.project_update_post);

router.get('/project/:id', project_controller.project_detail);

router.get('/projects', project_controller.project_list);

/// WORKINGITEM ROUTES ///

router.get('/workingitem/create', workingitem_controller.workingitem_create_get);
router.post('/workingitem/create', workingitem_controller.workingitem_create_post);

router.get('/workingitem/:id/delete', workingitem_controller.workingitem_delete_get);
router.post('/workingitem/:id/delete', workingitem_controller.workingitem_delete_post);

router.get('/workingitem/:id/update', workingitem_controller.workingitem_update_get);
router.post('/workingitem/:id/update', workingitem_controller.workingitem_update_post);

router.get('/workingitem/:id', workingitem_controller.workingitem_detail);

router.get('/workingitems', workingitem_controller.workingitem_list);

module.exports = router;