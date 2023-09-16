const calculateScore = (minVal, maxVal, x, absMin, absMax, bad = false) => {
    if (absMin === absMax) return 0;
    return !bad
        ? ((maxVal - minVal) * (x - absMin)) / (absMax - absMin)
        : maxVal - ((maxVal - minVal) * (x - absMin)) / (absMax - absMin);
};

export default calculateScore;
