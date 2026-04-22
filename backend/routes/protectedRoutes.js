const auth = require('../middleware/auth');
const authorize = require('../middleware/authorize');

router.get('/admin-dashboard', auth, authorize('admin'), (req, res) => {
  res.json("Admin only");
});

router.get('/mover-dashboard', auth, authorize('mover'), (req, res) => {
  res.json("Mover only");
});

router.get('/customer-dashboard', auth, authorize('customer'), (req, res) => {
  res.json("Customer only");
});

router.get('/company-dashboard', auth, authorize('company'), (req, res) => {
  res.json("Company only");
});