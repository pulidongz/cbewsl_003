import express from 'express';

import Login from '../controllers/Login.js';
import Register from '../controllers/Register.js';
import SendOTP from '../controllers/SendOTP.js';
import Verify from '../controllers/Verify.js';
import ForgotPassword from '../controllers/ForgotPassword.js';
import {
    UpdateUserInfo,
    UpdateUserProfile,
    RevokeUser,
    SuspendUser,
    ResumeUser,
    FetchUserDetails
} from '../controllers/ManageUser.js';

// ROUTE: /api/user_management/

const UserManagementRouter = express.Router();

UserManagementRouter.post('/login', Login);
UserManagementRouter.post('/register', Register);
UserManagementRouter.post('/verify', Verify);
UserManagementRouter.post('/forgot_password', ForgotPassword);
UserManagementRouter.post('/send_otp', SendOTP);
UserManagementRouter.post('/update/user_info', UpdateUserInfo);
UserManagementRouter.post('/update/user_profile',UpdateUserProfile);
UserManagementRouter.get('/revoke/:user_id', RevokeUser);
UserManagementRouter.get('/suspend/:user_id', SuspendUser);
UserManagementRouter.get('/resume/:user_id', ResumeUser);
UserManagementRouter.get('/admin/user_details/:user_id', FetchUserDetails);

export default UserManagementRouter;