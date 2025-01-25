const express = require('express');
import { methods as sendRecoveryCode } from '../controllers/sendEmail-controllers';
const router = express.Router();

router.post("/send-recovery-code", sendRecoveryCode.sendRecoveryEmailCode);
router.post("/check-email", sendRecoveryCode.checkEmailExists);
router.patch("/resetkey/:email", sendRecoveryCode.resetKey);

module.exports = router;