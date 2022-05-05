import AssignPerm from '../controllers/assignPermissionToRole';
import verifyAdmin from '../authorization/verifyAdmin';
import express from 'express';

const router = express.Router();

router.post(
  '/api/permission/:permId/role/:roleId',
  AssignPerm.assignPermToRole
);
router.delete(
  '/api/permission/:permId/role/:roleId',
  AssignPerm.removePermToRole
);

router.get('/api/permission/role/:roleId', AssignPerm.permissionAssignedToRole);

export default router;
