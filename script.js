// LinkPrice AI - Guest Post Price Calculator

function calculatePrice() {

  // Get user inputs
  const country = document.getElementById("country").value;
  const niche = document.getElementById("niche").value;
  const dr = Number(document.getElementById("dr").value);
  const traffic = Number(document.getElementById("traffic").value);
  const linkType = document.getElementById("linkType").value;
  const content = document.getElementById("content").value;

  // Validation
  if (!dr || !traffic) {
    alert("Please enter both Domain Rating (DR) and Monthly Organic Traffic.");
    return;
  }

  if (dr < 0 || dr > 100) {
    alert("Domain Rating must be between 0 and 100.");
    return;
  }

  if (traffic < 0) {
    alert("Organic traffic cannot be negative.");
    return;
  }


  // --------------------------------
  // 1. BASE PRICE
  // --------------------------------

  let basePrice = 20;

  // Domain Rating Factor
  if (dr >= 70) {
    basePrice += 80;
  } else if (dr >= 60) {
    basePrice += 60;
  } else if (dr >= 50) {
    basePrice += 45;
  } else if (dr >= 40) {
    basePrice += 30;
  } else if (dr >= 30) {
    basePrice += 20;
  } else if (dr >= 20) {
    basePrice += 10;
  }


  // --------------------------------
  // 2. ORGANIC TRAFFIC FACTOR
  // --------------------------------

  if (traffic >= 1000000) {
    basePrice += 100;
  } else if (traffic >= 500000) {
    basePrice += 80;
  } else if (traffic >= 100000) {
    basePrice += 60;
  } else if (traffic >= 50000) {
    basePrice += 45;
  } else if (traffic >= 10000) {
    basePrice += 30;
  } else if (traffic >= 5000) {
    basePrice += 20;
  } else if (traffic >= 1000) {
    basePrice += 10;
  }


  // --------------------------------
  // 3. COUNTRY FACTOR
  // --------------------------------

  const countryMultiplier = {
    usa: 1.25,
    uk: 1.20,
    australia: 1.20,
    canada: 1.15,
    pakistan: 0.75,
    other: 1.00
  };

  basePrice *= countryMultiplier[country] || 1;


  // --------------------------------
  // 4. NICHE FACTOR
  // --------------------------------

  const nicheMultiplier = {
    general: 1.00,
    technology: 1.15,
    saas: 1.25,
    business: 1.15,
    finance: 1.30,
    health: 1.25,
    home: 1.10,
    roofing: 1.10,
    fashion: 1.05
  };

  basePrice *= nicheMultiplier[niche] || 1;


  // --------------------------------
  // 5. LINK TYPE
  // --------------------------------

  if (linkType === "guest") {
    basePrice *= 1.10;
  } else if (linkType === "insertion") {
    basePrice *= 0.85;
  }


  // --------------------------------
  // 6. CONTENT FACTOR
  // --------------------------------

  if (content === "yes") {
    basePrice += 15;
  }


  // --------------------------------
  // 7. PRICE LEVELS
  // --------------------------------

  const budgetPrice = Math.round(basePrice * 0.75);
  const marketPrice = Math.round(basePrice);
  const premiumPrice = Math.round(basePrice * 1.50);


  // --------------------------------
  // 8. UPDATE RESULTS
  // --------------------------------

  document.getElementById("budgetPrice").textContent =
    "$" + budgetPrice;

  document.getElementById("marketPrice").textContent =
    "$" + marketPrice;

  document.getElementById("premiumPrice").textContent =
    "$" + premiumPrice;


  // --------------------------------
  // 9. RECOMMENDATION
  // --------------------------------

  let recommendation = "";

  if (dr >= 50 && traffic >= 50000) {

    recommendation =
      "This is a high-authority website with strong organic traffic. " +
      "A premium price around $" + premiumPrice +
      " may be justified.";

  } else if (dr >= 30 && traffic >= 10000) {

    recommendation =
      "This website has a solid SEO profile. " +
      "A market price around $" + marketPrice +
      " is a reasonable estimate.";

  } else if (dr >= 20 && traffic >= 5000) {

    recommendation =
      "This website has moderate authority and traffic. " +
      "A budget-to-market price around $" + marketPrice +
      " may be appropriate.";

  } else {

    recommendation =
      "This website has relatively low authority or traffic. " +
      "Consider starting near the budget price of $" + budgetPrice +
      " and adjusting based on niche relevance and link quality.";

  }


  document.getElementById("recommendationText").textContent =
    recommendation;


  // --------------------------------
  // 10. SHOW RESULT
  // --------------------------------

  document.getElementById("result").classList.remove("hidden");

}


// --------------------------------
// COPY RESULT
// --------------------------------

function copyResult() {

  const budget =
    document.getElementById("budgetPrice").textContent;

  const market =
    document.getElementById("marketPrice").textContent;

  const premium =
    document.getElementById("premiumPrice").textContent;

  const recommendation =
    document.getElementById("recommendationText").textContent;


  const resultText =
    "LinkPrice AI - Guest Post Price Estimate\n\n" +
    "Budget Price: " + budget + "\n" +
    "Market Price: " + market + "\n" +
    "Premium Price: " + premium + "\n\n" +
    "Recommendation: " + recommendation;


  navigator.clipboard.writeText(resultText)
    .then(function () {

      alert("Price estimate copied successfully!");

    })
    .catch(function () {

      alert("Unable to copy result. Please copy it manually.");

    });

}
