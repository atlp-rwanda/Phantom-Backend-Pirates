import Permissions from '../controllers/permission';
import express from 'express';
import verifyAdmin from '../authorization/verifyAdmin';

const router = express.Router();

router.post('/api/permission', Permissions.createPermission);
router.get('/api/permission', Permissions.getAllPermissions);

export default router;
