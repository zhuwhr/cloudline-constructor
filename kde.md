# Instruction

In this example, I want to learn how to generate a density value by kernel density estimator(kde). 

# Example

First let's see an [example](https://bl.ocks.org/mbostock/4341954) of drawing an actual kde line:

```javascript
function kernelDensityEstimator(kernel, x) {
  return function(sample) {
    return x.map(function(x) {
      return [x, d3.mean(sample, function(v) { return kernel(x - v); })];
    });
  };
}

function epanechnikovKernel(scale) {
  return function(u) {
    return Math.abs(u /= scale) <= 1 ? .75 * (1 - u * u) / scale : 0;
  };
}
```

In this example, the kde function takes a function and an array and returns a function that produces a pair of coordinates [x, y]. This pair of coordinates can be passed to a d3 path generator to draw a line (kde line).

## Function details:

### The main function: 

kernelDensityEstimator

input: a helper function, an array (for x coordinate)

output: a function 

### Output function:

input: an array that is the actual represenation of data.

output: a map function that maps the array parameter in the main function's input to a pair of coordinate. The x value if the array parameter. 

The y value is the key part: It is the mean value of the elements in the array that is the actual representation of data. When calculate the [mean](https://github.com/d3/d3-array), it first maps the array with the main function's input function parameter as the mapping function, which in this case, the helper function(ek).

### helper function (ek):

input: a parameter used to scale the value. Could be a number, or a function.

output: a function that takes a number as input and return a number value as well.

# Our need

[Kernel density estimation](http://en.wikipedia.org/wiki/Kernel_density_estimation) is a method of estimating the probability distribution of a random variable based on a random sample. We need a value of kernel density at a certain time t (t is the x value in our cloudline chart), which is the probability value. In the above example, the kernel density value should be the value of y in coordinate.

Here is the actual kde function we need:

```javascript
function kernelDensityEstimator(ek, t) {
  return function(ages) {
    return d3.mean(ages, v => {return ek(t - v)})
  }
}

//the example uses number 7 as the scale for smoother line, we can use it too at this time.
function epanechnikovKernel(scale) {
  return function(u) {
    return Math.abs(u /= scale) <= 1 ? .75 * (1 - u * u) / scale : 0;
  };
}

//the function can be called like this:
d3.json("data.json", (error, data) => {
  if (error) throw error;
  let t = data[timeStamp];
  let kde = kernalDensityEstimator(epanechnikovKernel(7), t);
  let kdeValue = kde(data)
  //here kde is the value we want.
}
```

