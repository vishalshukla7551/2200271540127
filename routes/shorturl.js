const express = require('express');
const router = express.Router();
const { createShortURL } = require('../services/shorturlService');
const { get, recordClick } = require('../store/urlStore');
router.post('/shorturls', (req, res) => {
  try {
    const { url, validity, shortcode } = req.body;
     const baseURL = `${req.protocol}://${req.get('host')}`;
    const result = createShortURL({ url, validity, shortcode, baseURL });
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/shorturls/:shortcode', (req, res) => {
  const { shortcode } = req.params;
  const data = get(shortcode);

  if (!data) {
    return res.status(404).json({ error: "Shortcode not found" });
  }

  if (new Date(data.expiry) < new Date()) {
    return res.status(410).json({ error: "Link expired" });
  }

  const referrer = req.get('referer') || 'direct';
  const ip = req.ip || req.connection.remoteAddress;

  const coarseLocation = ip.startsWith('192.') ? 'Local Network' : 'Unknown';
  recordClick(shortcode, referrer, coarseLocation);
  return res.json({
    shortcode,
    originalURL: data.url,
    createdAt: data.createdAt,
    expiry: data.expiry,
    totalClicks: data.clicks,
    clickHistory: data.clickData
  });
});

module.exports = router;

