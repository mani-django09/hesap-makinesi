const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const calculatorController = require('../controllers/calculatorController');

// Basic calculator
router.post('/hesap-makinesi',
  body('operation').isIn(['add', 'subtract', 'multiply', 'divide']).withMessage('Geçersiz işlem'),
  body('num1').isNumeric().withMessage('Geçersiz sayı'),
  body('num2').isNumeric().withMessage('Geçersiz sayı'),
  calculatorController.basicCalculator
);

// Percentage calculator
router.post('/yuzde-hesaplama',
  body('value').isNumeric().withMessage('Geçersiz değer'),
  body('percentage').isNumeric().withMessage('Geçersiz yüzde'),
  body('operation').optional().isIn(['find', 'increase', 'decrease']),
  calculatorController.percentageCalculator
);

// Age calculator
router.post('/yas-hesaplama',
  body('birthDate').isISO8601().withMessage('Geçersiz tarih formatı'),
  calculatorController.ageCalculator
);

// Ascending calculator
router.post('/yukselen-hesaplama',
  body('birthDate').isISO8601().withMessage('Geçersiz doğum tarihi'),
  body('birthTime').matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/).withMessage('Geçersiz saat formatı'),
  body('birthPlace').notEmpty().withMessage('Doğum yeri gerekli'),
  calculatorController.ascendingCalculator
);

// VAT calculator
router.post('/kdv-hesaplama',
  body('amount').isNumeric().withMessage('Geçersiz tutar'),
  body('vatRate').isNumeric().withMessage('Geçersiz KDV oranı'),
  body('operation').isIn(['add', 'remove']).withMessage('Geçersiz işlem'),
  calculatorController.vatCalculator
);

// Pregnancy calculator
router.post('/gebelik-hesaplama',
  body('lastPeriodDate').isISO8601().withMessage('Geçersiz tarih formatı'),
  calculatorController.pregnancyCalculator
);



// LGS score calculator
router.post('/lgs-puan-hesaplama',
  body('turkceNet').isNumeric().withMessage('Geçersiz Türkçe net'),
  body('matNet').isNumeric().withMessage('Geçersiz Matematik net'),
  body('fenNet').isNumeric().withMessage('Geçersiz Fen net'),
  body('sosyalNet').isNumeric().withMessage('Geçersiz Sosyal net'),
  body('dinNet').isNumeric().withMessage('Geçersiz Din net'),
  body('ingilizceNet').isNumeric().withMessage('Geçersiz İngilizce net'),
  calculatorController.lgsCalculator
);


module.exports = router;
