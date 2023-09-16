const calculateScore = (minVal, maxVal, x, absMin, absMax) => {
    if (absMin === absMax) return 0;
    return (maxVal - minVal) * (x - absMin) / (absMax - absMin);
}

export default calculateScore;
