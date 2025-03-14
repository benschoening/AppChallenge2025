function incomeTaxCalc(salary: number): number {
  const federalBrackets = {
    55867: 0.15,
    111733: 0.205,
    173205: 0.26,
    246752: 0.29,
  };

  const provincialBrackets = {
    47937: 0.0506,
    95875: 0.09,
    110076: 0.11,
    133664: 0.13,
    181232: 0.147,
    252752: 0.168,
  };

  let currSalary = salary;
  let currTax: number = 0;
  for (const bracketStr in federalBrackets) {
    const bracket = parseFloat(bracketStr);
    if (currSalary >= bracket) {
      currTax += bracket * federalBrackets[bracket];
      currSalary -= bracket;
    } else if (currSalary > 0) {
      currTax += currSalary * federalBrackets[bracket];
      currSalary = 0;
      break;
    } else {
      break;
    }
  }
  if (currSalary > 0) {
    currTax += currSalary * 0.33;
  }

  currSalary = salary;
  for (const bracketStr in provincialBrackets) {
    const bracket = parseFloat(bracketStr);
    if (currSalary >= bracket) {
      currTax += bracket * provincialBrackets[bracket];
      currSalary -= bracket;
    } else if (currSalary > 0) {
      currTax += currSalary * provincialBrackets[bracket];
      currSalary = 0;
      break;
    } else {
      break;
    }
  }
  if (currSalary > 0) {
    currTax += currSalary * 0.205;
  }

  return salary - currTax;
}

export default incomeTaxCalc;
