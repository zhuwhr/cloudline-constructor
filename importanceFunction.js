/*
Problem: the t in f(t) is the age of event ei, which is current time minus born time
the t in di(t) is the born time of event ei, which should be the x axis value
the t in Dmax(t) is the current time.
The three ts have different value, do I get it right?
*/


//importance function:
//imp(ei) = f(t) * g(di(t))
//input: an event object with time attribute
//output: a value representing importance that can be used to decide the size and opacity of the object in the cloudline
function importance(event) {
    let imp, t, decay, kernelDensity, dmax, density;
    
    t = event[time];
    decay = decayCalculator(t);
    
    dmax = Dmax(t);
    kernelDensity = kernelDensityEstimator(t);
    density = densityCalculator(kernelDensity, dmax);
    
    imp = decay * density;
    
    return imp;
}    

//decay function: f(t) = f(0) * e^(-t/mean)
//input: the time (age) of an event object
//output: a value representing dacay
function decayCalculator(t, mean) {
    let decay;
    //mean = -1; // don't know how to calculate yet
    decay = 1 * Math.exp(-t / mean);
    return decay;
}    
    
//density factor function: g(di(t)) = Ymax * di(t) / Dmax(t)
//input: density estimation (the value of function kernelDensity)
//output: density factor value
//Ymax is the coefficient to normalize the height of the objects to the maximum allowed height in the actual window.
function densityCalculator(kernelDensity, dmax) {
    let density, Ymax;   
    density = Ymax * kernelDensity / dmax;
    return density;
}
    
//Dmax
//input: the time (age) of an event object
//output: a value representing max density estimate in the current time window
function Dmax(t) {
    let dmax;
    return dmax;
}
    
//kernel density estimate function: di(t)
//input: the time (age) of an event object 
//output: a value of density estimation
//search this function online
function kernalDensityEstimator(ek, data, t) {
  return d3.mean(data, v => {return ek(t - v)})
}

//with closure
function kernelDensityEstimator(ek, t) {
  return function(data) {
    return d3.mean(data, v => {return ek(t - v)})
  }
}

//the example uses number 7 as the scale for smoother line, we can use it too at this time.
function epanechnikovKernel(scale) {
  return function(u) {
    return Math.abs(u /= scale) <= 1 ? .75 * (1 - u * u) / scale : 0;
  };
}