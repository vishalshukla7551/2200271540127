const urlMap = new Map();

function add(shortcode, url, expiry) {
  urlMap.set(shortcode, {
    url,
    expiry,
    createdAt: new Date(),
    clicks: 0,
    clickData: []
  });
}

function exists(shortcode) {
  return urlMap.has(shortcode);
}

function get(shortcode) {
  return urlMap.get(shortcode);
}

function recordClick(shortcode, referrer, location) {
  const entry = urlMap.get(shortcode);
  if (!entry) return;

  entry.clicks += 1;
  entry.clickData.push({
    timestamp: new Date(),
    referrer: referrer || 'unknown',
    location: location || 'unknown'
  });
}

module.exports = { add, exists, get, recordClick };
