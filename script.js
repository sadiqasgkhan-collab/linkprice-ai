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
  // 8. WEBSITE QUALITY SCORE
  // --------------------------------

  let qualityScore = 0;

  // DR contributes up to 50 points
  qualityScore += Math.min(dr * 0.5, 50);

  // Traffic contributes up to 40 points
  if (traffic >= 1000000) {
    qualityScore += 40;
  } else if (traffic >= 500000) {
    qualityScore += 35;
  } else if (traffic >= 100000) {
    qualityScore += 30;
  } else if (traffic >= 50000) {
    qualityScore += 25;
  } else if (traffic >= 10000) {
    qualityScore += 20;
  } else if (traffic >= 5000) {
    qualityScore += 15;
  } else if (traffic >= 1000) {
    qualityScore += 10;
  } else if (traffic > 0) {
    qualityScore += 5;
  }

  // Niche relevance contributes up to 10 points
  const nicheScore = {
    general: 5,
    technology: 8,
    saas: 10,
    business: 8,
    finance: 10,
    health: 9,
    home: 7,
    roofing: 7,
    fashion: 7
  };

  qualityScore += nicheScore[niche] || 5;

  // Maximum score = 100
  qualityScore = Math.min(Math.round(qualityScore), 100);


  // --------------------------------
  // 9. QUALITY LEVEL
  // --------------------------------

  let qualityLevel = "";

  if (qualityScore >= 80) {
    qualityLevel = "Excellent";
  } else if (qualityScore >= 60) {
    qualityLevel = "Good";
  } else if (qualityScore >= 40) {
    qualityLevel = "Average";
  } else {
    qualityLevel = "Low";
  }


  // --------------------------------
  // 10. PRICE EXPLANATION
  // --------------------------------

  let explanation = "";

  if (dr >= 50 && traffic >= 50000) {

    explanation =
      "This website has strong domain authority and significant organic traffic. " +
      "It can reasonably command a premium guest post or backlink price.";

  } else if (dr >= 30 && traffic >= 10000) {

    explanation =
      "This website has a solid SEO profile with good authority and organic traffic. " +
      "The estimated market price is suitable for a quality guest post.";

  } else if (dr >= 20 && traffic >= 5000) {

    explanation =
      "This website has moderate authority and traffic. " +
      "The market price may vary depending on content quality, niche relevance and link placement.";

  } else {

    explanation =
      "This website has relatively low authority or organic traffic. " +
      "A lower price may be more competitive unless the website has strong niche relevance.";

  }


  // --------------------------------
  // 11. RECOMMENDATION
  // --------------------------------

  let recommendation = "";

  if (qualityScore >= 80) {

    recommendation =
      "Recommended Price: $" + premiumPrice +
      ". This website appears suitable for premium link-building opportunities.";

  } else if (qualityScore >= 60) {

    recommendation =
      "Recommended Price: $" + marketPrice +
      ". This is a reasonable market price based on the website's current SEO profile.";

  } else if (qualityScore >= 40) {

    recommendation =
      "Recommended Price: $" + marketPrice +
      ". Consider negotiating based on niche relevance and link quality.";

  } else {

    recommendation =
      "Recommended Price: $" + budgetPrice +
      ". Consider improving authority and organic traffic before charging premium rates.";

  }


  // --------------------------------
  // 12. UPDATE PRICE RESULTS
  // --------------------------------

  document.getElementById("budgetPrice").textContent =
    "$" + budgetPrice;

  document.getElementById("marketPrice").textContent =
    "$" + marketPrice;

  document.getElementById("premiumPrice").textContent =
    "$" + premiumPrice;


  // --------------------------------
  // 13. UPDATE RECOMMENDATION
  // --------------------------------

  document.getElementById("recommendationText").textContent =
    recommendation;


  // --------------------------------
  // 14. ADD QUALITY SCORE
  // --------------------------------

  let scoreElement = document.getElementById("qualityScore");

  if (!scoreElement) {

    scoreElement = document.createElement("div");

    scoreElement.id = "qualityScore";

    scoreElement.style.marginTop = "25px";
    scoreElement.style.padding = "20px";
    scoreElement.style.borderRadius = "12px";
    scoreElement.style.background = "#f5f7ff";
    scoreElement.style.textAlign = "center";

    document.getElementById("result").appendChild(scoreElement);

  }

  scoreElement.innerHTML =
    "<h3>Website Quality Score</h3>" +
    "<strong style='font-size:32px;'>" +
    qualityScore +
    "/100</strong>" +
    "<p><b>" +
    qualityLevel +
    "</b></p>" +
    "<p>" +
    explanation +
    "</p>";


  // --------------------------------
  // 15. SHOW RESULT
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

  const scoreElement =
    document.getElementById("qualityScore");

  const qualityScore =
    scoreElement
      ? scoreElement.innerText
      : "Quality Score not available";


  const resultText =
    "LinkPrice AI - Guest Post Price Estimate\n\n" +
    "Budget Price: " + budget + "\n" +
    "Market Price: " + market + "\n" +
    "Premium Price: " + premium + "\n\n" +
    qualityScore + "\n\n" +
    "Recommendation: " + recommendation;


  navigator.clipboard.writeText(resultText)
    .then(function () {

      alert("Price estimate copied successfully!");

    })
    .catch(function () {

      alert("Unable to copy result. Please copy it manually.");

    });

}
