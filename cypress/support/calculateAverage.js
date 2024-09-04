
// to calculate average Forex conversion rate, "CAD to AUD," for the recent 10 weeks / can pass any currencyPair to find average.
export function averageForexRate(response, currencyPair) {
  const observations = response.body.observations;
  let total = 0;

  observations.forEach((observation) => {
    total += parseFloat(observation[currencyPair].v);
  });

  const averageRate = total / observations.length;
  console.log(
    `The average Forex conversion rate, ${currencyPair}, for the recent 10 weeks is: ${averageRate}`
  );

  expect(averageRate).to.be.a("number");

  return averageRate;
}
