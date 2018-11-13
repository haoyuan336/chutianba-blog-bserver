function clipInput(k, arr)
{
	if (k < 0)
		k = 0;
	if (k > arr.length - 1)
		k = arr.length - 1;
	return arr[k];
}

function getTangent(k, factor, array)
{
	return factor * (clipInput(k + 1, array) - clipInput(k - 1,array)) / 2;
}

function cubicInterpolation(array, t, tangentFactor)
{
	if (tangentFactor == null) tangentFactor = 1;
	
	var k = Math.floor(t);
	var m = [getTangent(k, tangentFactor, array), getTangent(k + 1, tangentFactor, array)];
	var p = [clipInput(k,array), clipInput(k+1,array)];
	t -= k;
	var t2 = t * t;
	var t3 = t * t2;
	return (2 * t3 - 3 * t2 + 1) * p[0] + (t3 - 2 * t2 + t) * m[0] + ( -2 * t3 + 3 * t2) * p[1] + (t3 - t2) * m[1];
}
export default cubicInterpolation;