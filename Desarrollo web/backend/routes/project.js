'use strict'
var express = require('express');
var ProjectController = require('../controllers/project');
var router = express.Router();
var multipart = require('connect-multiparty');
//const { router } = require('../app');
var multipartMiddleware = multipart({ uploadDir: './uploads' });

router.get('/home', ProjectController.home);
router.get('/test', ProjectController.test);
router.post('/save-project', ProjectController.saveProject);
router.get('/project/:id?', ProjectController.getProject); //el simbolo ? significa opcional 
router.get('/projects', ProjectController.getProjects);

router.put('/project/:id', ProjectController.updateProject);
router.delete('/project/:id', ProjectController.deleteProject);

router.post('/upload-image/:id', multipartMiddleware, ProjectController.uploadImage);
router.get('/get-image/:image', ProjectController.getImageFile);



module.exports = router;