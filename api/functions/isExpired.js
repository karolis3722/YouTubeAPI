const isExpired = (timestamp) => {
    const dayBack = Date.now() - 24 * 60 * 60 * 1000;
    return new Date(timestamp) < dayBack;
};

module.exports = isExpired;