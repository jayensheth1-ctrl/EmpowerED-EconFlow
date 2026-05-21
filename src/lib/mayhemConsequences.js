// ── Consequence definitions per scenario + category ──────────────────────────
// Each entry: { well, under, zero }
// well  = allocated >= wellThreshold (fraction of income)
// under = allocated > 0 but below threshold
// zero  = allocated nothing

const CONSEQUENCES = {
  student: {
    Rent: {
      wellThreshold: 0.42,
      well:  { emoji: "🏠", headline: "Paid on time.", story: "Your landlord actually smiled at you for once. Small victories.", level: "positive" },
      under: { emoji: "📞", headline: "Rent was short.", story: "Your landlord left three voicemails. You ignored all of them.", level: "negative", tip: "Tip: Consistently underpaying rent puts your housing security at serious risk." },
      zero:  { emoji: "📄", headline: "Eviction notice.", story: "You did not pay rent. A slip of paper slid under your door at 7am.", level: "critical", tip: "Tip: Housing is a non-negotiable. Always fund rent before anything else." },
    },
    Food: {
      wellThreshold: 0.17,
      well:  { emoji: "🥗", headline: "You ate real meals.", story: "Energy levels up, focus improving. Grades are following.", level: "positive" },
      under: { emoji: "🍜", headline: "Ramen four days straight.", story: "You are surviving but definitely not thriving.", level: "negative", tip: "Tip: Nutrition affects cognitive performance. Budget at least $200/month for food." },
      zero:  { emoji: "😵", headline: "You skipped meals.", story: "Concentration in class dropped. Hard to study when you are hungry.", level: "critical", tip: "Tip: Food is foundational. Skipping meals to save money costs you in other ways." },
    },
    Transport: {
      wellThreshold: 0.08,
      well:  { emoji: "🚌", headline: "Bus pass topped up.", story: "Made it to every shift on time. Boss actually noticed.", level: "positive" },
      under: { emoji: "🚶", headline: "Walking 40 minutes twice.", story: "Showed up late once this week. Boss gave you a look.", level: "negative", tip: "Tip: Unreliable transport threatens your income. It pays to fund it properly." },
      zero:  { emoji: "💸", headline: "Missed a shift.", story: "No transport budget. Lost two hours of pay. Net negative.", level: "critical", tip: "Tip: Zero transport spend can cost you more in lost wages than it saves." },
    },
    Fun: {
      wellThreshold: 0.05,
      well:  { emoji: "😊", headline: "Out with friends.", story: "Mental health: good. Burnout avoided for another month.", level: "positive" },
      under: { emoji: "😐", headline: "Stayed in all week.", story: "Not ideal but manageable. You rewatched the same show twice.", level: "neutral" },
      zero:  { emoji: "🔥", headline: "Zero social life.", story: "Starting to feel the grind. Burnout risk is rising.", level: "negative", tip: "Tip: Mental health spending is not a luxury. Burnout costs you far more in the long run." },
    },
    Savings: {
      wellThreshold: 0.05,
      well:  { emoji: "🏦", headline: "Small buffer growing.", story: "Even a tiny savings pot gives you options next month.", level: "positive" },
      under: { emoji: "🪙", headline: "Almost nothing saved.", story: "One unexpected cost and you are in trouble.", level: "neutral" },
      zero:  { emoji: "❌", headline: "Nothing saved.", story: "If anything goes wrong next month, you have no cushion.", level: "negative", tip: "Tip: Even saving 5% of income each month builds a meaningful emergency fund over time." },
    },
    Entertainment: {
      wellThreshold: 0.04,
      well:  { emoji: "🎮", headline: "Took a break.", story: "Rest and play are part of sustainable productivity.", level: "positive" },
      under: { emoji: "📺", headline: "Quiet week.", story: "Fine for now. Not sustainable long term.", level: "neutral" },
      zero:  { emoji: "😩", headline: "All hustle, no rest.", story: "Mood is dipping. The grind is real.", level: "negative", tip: "Tip: Sustainable work requires rest. Budget something for yourself." },
    },
  },

  parent: {
    Rent: {
      wellThreshold: 0.29,
      well:  { emoji: "🏡", headline: "Stable housing secured.", story: "Baby has a safe, warm home. That is everything.", level: "positive" },
      under: { emoji: "😬", headline: "Rent barely covered.", story: "Landlord is getting impatient. Stress levels creeping up.", level: "negative", tip: "Tip: Housing stability directly impacts your child's wellbeing. Prioritise it." },
      zero:  { emoji: "🚨", headline: "Rent missed entirely.", story: "With a baby in tow, housing instability is a crisis.", level: "critical", tip: "Tip: With dependants, housing insecurity is a family emergency, not just a personal one." },
    },
    Groceries: {
      wellThreshold: 0.1,
      well:  { emoji: "🥦", headline: "Healthy meals all week.", story: "Baby eating well. Your energy levels holding up. Good week.", level: "positive" },
      under: { emoji: "🍚", headline: "Budget groceries only.", story: "Getting creative with rice and beans. Nutritious but repetitive.", level: "neutral" },
      zero:  { emoji: "😨", headline: "Fridge nearly empty.", story: "This is not sustainable. Something has to give.", level: "critical", tip: "Tip: Grocery budgets for families with infants are non-negotiable nutritional investments." },
    },
    Childcare: {
      wellThreshold: 0.23,
      well:  { emoji: "👶", headline: "Great childcare secured.", story: "Baby is thriving. You actually slept six hours last night.", level: "positive" },
      under: { emoji: "😰", headline: "Childcare stretched thin.", story: "Had to leave work early twice this week to collect the baby.", level: "negative", tip: "Tip: Underfunding childcare often costs more in lost work time than it saves." },
      zero:  { emoji: "💼", headline: "Called in sick three days.", story: "No childcare arranged. Boss is not happy. This is unsustainable.", level: "critical", tip: "Tip: For working parents, childcare is a business expense, not a discretionary one." },
    },
    Healthcare: {
      wellThreshold: 0.08,
      well:  { emoji: "🩺", headline: "Checkup done.", story: "Everything looks good. Peace of mind for a new parent is priceless.", level: "positive" },
      under: { emoji: "🦷", headline: "Skipped the dentist again.", story: "Third month in a row. This will catch up eventually.", level: "neutral" },
      zero:  { emoji: "⚠️", headline: "Healthcare ignored.", story: "Minor issue went unchecked. With a baby at home, that is risky.", level: "critical", tip: "Tip: Preventive healthcare is always cheaper than treating problems that escalate." },
    },
    Savings: {
      wellThreshold: 0.07,
      well:  { emoji: "💰", headline: "Emergency fund growing.", story: "Future you says thank you. Kids have a knack for expensive surprises.", level: "positive" },
      under: { emoji: "📉", headline: "Barely anything saved.", story: "One bad month away from real trouble.", level: "negative", tip: "Tip: Parents need a larger emergency fund. Aim for three months of expenses." },
      zero:  { emoji: "🕳️", headline: "Nothing saved this month.", story: "If anything unexpected happens, you are entirely on your own.", level: "critical", tip: "Tip: Financial experts recommend saving at least 20% of income. Start small if needed." },
    },
    Entertainment: {
      wellThreshold: 0.03,
      well:  { emoji: "🎉", headline: "Family fun time.", story: "Baby laughed. You laughed. Worth every penny.", level: "positive" },
      under: { emoji: "🛋️", headline: "Quiet week at home.", story: "Manageable. Baby does not need much to be happy.", level: "neutral" },
      zero:  { emoji: "😔", headline: "Parental burnout rising.", story: "No downtime. You need to recharge to show up fully.", level: "negative", tip: "Tip: Parental wellbeing directly affects child outcomes. Self-care is not selfish." },
    },
  },

  professional: {
    Rent: {
      wellThreshold: 0.26,
      well:  { emoji: "🏢", headline: "Good apartment, focused mind.", story: "Stable living conditions mean stable productivity at work.", level: "positive" },
      under: { emoji: "😬", headline: "Rent was a stretch.", story: "Covered but stressful. Hard to focus when money is tight at home.", level: "neutral" },
      zero:  { emoji: "🚪", headline: "Rent unpaid.", story: "Landlord is threatening to terminate. Stress is affecting your work performance.", level: "critical", tip: "Tip: Housing insecurity bleeds into professional performance. Protect your home base." },
    },
    Food: {
      wellThreshold: 0.08,
      well:  { emoji: "🍱", headline: "Eating well.", story: "Meal prepping Sundays. Energy consistent throughout the week.", level: "positive" },
      under: { emoji: "☕", headline: "Running on coffee.", story: "Skipping lunch most days. Afternoon concentration dipping.", level: "negative", tip: "Tip: Nutrition affects decision quality. Underfunding food is a false economy." },
      zero:  { emoji: "😵", headline: "No food budget.", story: "Relying on office snacks and good timing near the break room.", level: "critical", tip: "Tip: Skipping meals to save money is one of the most counterproductive financial decisions." },
    },
    Loans: {
      wellThreshold: 0.14,
      well:  { emoji: "✅", headline: "Loan payment made.", story: "Credit score holding steady. Banks still like you. Keep it up.", level: "positive" },
      under: { emoji: "📉", headline: "Partial payment only.", story: "Late fee incoming. Credit score ticked down slightly. This compounds.", level: "negative", tip: "Tip: Missed payments compound. A small late fee today becomes a credit score problem tomorrow." },
      zero:  { emoji: "💳", headline: "Missed loan payment.", story: "Late fee added. Credit score dropped. This gets worse the longer it continues.", level: "critical", tip: "Tip: Student loan default can follow you for decades. Always pay the minimum at least." },
    },
    Investments: {
      wellThreshold: 0.08,
      well:  { emoji: "📈", headline: "Portfolio growing.", story: "Compound interest doing its thing. Future you is quietly building wealth.", level: "positive" },
      under: { emoji: "🌱", headline: "Tiny investment made.", story: "Better than nothing but barely moving the needle this month.", level: "neutral" },
      zero:  { emoji: "⏳", headline: "Nothing invested.", story: "Money sitting in a low-interest account. Inflation is quietly eating it.", level: "negative", tip: "Tip: Time in the market beats timing the market. Even small monthly investments compound significantly." },
    },
    Entertainment: {
      wellThreshold: 0.06,
      well:  { emoji: "🎉", headline: "Work hard, play hard.", story: "Weekend well spent. Monday motivation surprisingly high.", level: "positive" },
      under: { emoji: "📺", headline: "Quiet weekend.", story: "Fine for now. Not sustainable if it becomes a pattern.", level: "neutral" },
      zero:  { emoji: "😤", headline: "All work, no play.", story: "Burnout creeping in. Starting to resent Monday mornings.", level: "negative", tip: "Tip: Rest is productive. Consistent overwork leads to diminishing returns and eventual burnout." },
    },
    Transport: {
      wellThreshold: 0.07,
      well:  { emoji: "🚆", headline: "Commute smooth.", story: "On time every day this week. Professional reputation solid.", level: "positive" },
      under: { emoji: "🚗", headline: "Had to carpool twice.", story: "Slight awkwardness but manageable. Saved money, cost goodwill.", level: "neutral" },
      zero:  { emoji: "😤", headline: "Late to a client meeting.", story: "No transport budget. Boss pulled you aside afterward. First strike.", level: "critical", tip: "Tip: Reliable transport is part of your professional infrastructure. Do not cut it." },
    },
  },

  retiree: {
    Housing: {
      wellThreshold: 0.32,
      well:  { emoji: "🏡", headline: "Home is comfortable.", story: "Bills paid, small repair handled. Retirement as planned.", level: "positive" },
      under: { emoji: "📋", headline: "Delayed one bill.", story: "Small stress but manageable this month. Caught up just in time.", level: "neutral" },
      zero:  { emoji: "⚡", headline: "Utilities threatening disconnection.", story: "This is not how retirement should feel.", level: "critical", tip: "Tip: Housing costs in retirement are often fixed. Build them in as the first priority." },
    },
    Healthcare: {
      wellThreshold: 0.18,
      well:  { emoji: "💊", headline: "Prescriptions filled.", story: "Doctor visit done. All clear. Enjoying retirement properly.", level: "positive" },
      under: { emoji: "😬", headline: "Skipped a prescription refill.", story: "To save money this month. Not ideal at this stage of life.", level: "negative", tip: "Tip: Skipping medication to save money often leads to significantly higher costs later." },
      zero:  { emoji: "🚑", headline: "Healthcare ignored.", story: "Mild symptoms going unchecked. At this age, that is a real risk.", level: "critical", tip: "Tip: Healthcare is the single most important budget item for retirees. Do not compromise it." },
    },
    Food: {
      wellThreshold: 0.13,
      well:  { emoji: "🍽️", headline: "Cooking properly.", story: "Good nutrition supporting energy and mood. Retirement life is good.", level: "positive" },
      under: { emoji: "🥫", headline: "Getting by on tinned food.", story: "Budget week. Nutritionally passable but not sustainable.", level: "neutral" },
      zero:  { emoji: "😟", headline: "Food budget emptied.", story: "Relying on neighbours and leftovers. Dignity is taking a hit.", level: "critical", tip: "Tip: Fixed-income retirees should protect food budgets before discretionary spending." },
    },
    Leisure: {
      wellThreshold: 0.09,
      well:  { emoji: "🌿", headline: "Book club, garden, walks.", story: "Retirement looking exactly like the plan. Social and active.", level: "positive" },
      under: { emoji: "🪑", headline: "Mostly at home this week.", story: "Getting a little restless. Need more stimulation.", level: "neutral" },
      zero:  { emoji: "😶", headline: "No leisure this month.", story: "Retirement feels like just staying home. Quality of life dipping.", level: "negative", tip: "Tip: Social connection and activity reduce healthcare costs long term. Leisure pays dividends." },
    },
    "Emergency Fund": {
      wellThreshold: 0.09,
      well:  { emoji: "🛡️", headline: "Emergency fund padded.", story: "Boiler breaks next month and you will be absolutely fine.", level: "positive" },
      under: { emoji: "😰", headline: "Thin emergency buffer.", story: "One surprise bill away from a stressful month.", level: "negative", tip: "Tip: On a fixed income, emergencies hit harder. Pad your buffer every month you can." },
      zero:  { emoji: "🧺", headline: "Washing machine just broke.", story: "No emergency buffer. This is going to hurt more than it should.", level: "critical", tip: "Tip: Retirees on fixed incomes are especially vulnerable to unexpected expenses. Always save something." },
    },
    Transport: {
      wellThreshold: 0.05,
      well:  { emoji: "🚌", headline: "Getting around comfortably.", story: "Appointments kept, social visits made. Independence maintained.", level: "positive" },
      under: { emoji: "🚶", headline: "Skipped one outing.", story: "Saved the bus fare. Missed a coffee with a friend.", level: "neutral" },
      zero:  { emoji: "🏠", headline: "Stuck at home all week.", story: "No transport budget. Isolation crept in quietly.", level: "negative", tip: "Tip: Mobility maintains independence and mental health in retirement. It is worth the spend." },
    },
  },

  founder: {
    "Personal Rent": {
      wellThreshold: 0.25,
      well:  { emoji: "🏠", headline: "Rent covered.", story: "Stable place to work from. Productivity and focus intact.", level: "positive" },
      under: { emoji: "😬", headline: "Rent nearly missed.", story: "Stress levels high. Hard to think about growing a business under this pressure.", level: "negative", tip: "Tip: Personal financial stability is the foundation of entrepreneurial success." },
      zero:  { emoji: "☕", headline: "Working from a coffee shop.", story: "Landlord cut the internet. Running the startup from a corner table now.", level: "critical", tip: "Tip: Never sacrifice your living situation for the business. You need a stable base to operate from." },
    },
    "Business Costs": {
      wellThreshold: 0.38,
      well:  { emoji: "📊", headline: "Operations smooth.", story: "Tools paid for, subscriptions running. Sales up 12% this week.", level: "positive" },
      under: { emoji: "🔧", headline: "Some tools went dark.", story: "Lost access to your project management software mid-week. Two tasks fell through the cracks.", level: "negative", tip: "Tip: Business infrastructure is an investment, not an expense. Underfunding it costs more in lost productivity." },
      zero:  { emoji: "📧", headline: "Website went down.", story: "Business costs ignored. Three client emails bounced. Sales dropped to zero.", level: "critical", tip: "Tip: Letting business costs lapse can destroy customer trust overnight." },
    },
    Food: {
      wellThreshold: 0.1,
      well:  { emoji: "🍳", headline: "Eating properly.", story: "Brain is functioning. Clear decisions being made. Good output today.", level: "positive" },
      under: { emoji: "🕒", headline: "Skipping lunch most days.", story: "Cutting costs. Energy crashing by 3pm every day this week.", level: "negative", tip: "Tip: Founder burnout starts with skipping meals. Your brain needs fuel to make good decisions." },
      zero:  { emoji: "🍪", headline: "Surviving on office snacks.", story: "Your parents dropped off a container of leftovers. You were grateful.", level: "critical", tip: "Tip: Skipping meals to save money is a false economy. Cognitive performance suffers significantly." },
    },
    Marketing: {
      wellThreshold: 0.15,
      well:  { emoji: "📣", headline: "Three new leads came in.", story: "One converted to a paying customer this week. ROI: real.", level: "positive" },
      under: { emoji: "📨", headline: "One weak lead. Nothing converted.", story: "Minimal spend meant minimal reach. You exist online, but barely.", level: "neutral" },
      zero:  { emoji: "👻", headline: "Nobody knows you exist.", story: "No marketing this month. Brand awareness at zero.", level: "critical", tip: "Tip: Even a small marketing budget keeps your brand visible and customers coming back." },
    },
    Savings: {
      wellThreshold: 0.05,
      well:  { emoji: "💰", headline: "Personal savings growing.", story: "Even a small buffer keeps you from making desperate business decisions.", level: "positive" },
      under: { emoji: "📉", headline: "Barely anything saved.", story: "One bad month from needing to borrow.", level: "neutral" },
      zero:  { emoji: "🕳️", headline: "No personal safety net.", story: "If the business hits a rough patch, you have nothing to fall back on.", level: "critical", tip: "Tip: Founders need personal savings separate from the business. Keep them distinct." },
    },
    Entertainment: {
      wellThreshold: 0.03,
      well:  { emoji: "🎮", headline: "Took a real break.", story: "Came back sharper. Best product decision of the month made on Monday.", level: "positive" },
      under: { emoji: "📱", headline: "Scrolled for rest.", story: "Not truly restful. Better than nothing.", level: "neutral" },
      zero:  { emoji: "🔥", headline: "Founder burnout rising.", story: "Working every waking hour. Decision quality is declining. Not sustainable.", level: "negative", tip: "Tip: Rest is a founder's competitive advantage. Burnout destroys companies." },
    },
  },
};

// ── Cumulative consequence escalations ──────────────────────────────────────
// If a category was underfunded/zeroed in 2+ consecutive rounds, escalate
const CUMULATIVE_ESCALATIONS = {
  student: {
    Savings: {
      negative: { emoji: "📛", headline: "Two months without savings.", story: "The gap between you and a bad month keeps growing. You are one emergency away from dropping out.", tip: "Tip: Consistent saving, even $50 a month, builds real security over time." },
    },
    Fun: {
      negative: { emoji: "💀", headline: "Two months of zero social life.", story: "Friends have stopped inviting you. Social isolation is having a measurable effect on your mental health.", tip: "Tip: Mental health maintenance is a financial priority, not a luxury." },
    },
  },
  parent: {
    Savings: {
      negative: { emoji: "⚠️", headline: "Two months, nothing saved.", story: "Your emergency fund is completely empty. One car repair away from a genuine crisis.", tip: "Tip: Parents need larger emergency funds. Aim for three months of household expenses." },
    },
    Healthcare: {
      negative: { emoji: "🏥", headline: "Two months skipping healthcare.", story: "The baby had a fever this week that worried you. Without budget headroom, you hesitated before calling the doctor.", tip: "Tip: Preventive care for children is always cheaper than reactive emergency treatment." },
    },
  },
  professional: {
    Investments: {
      negative: { emoji: "📉", headline: "Two months of zero investment.", story: "A colleague mentioned their index fund is up 18% this year. Meanwhile your savings account earned $3.40.", tip: "Tip: Every month without investing is compounding growth permanently lost." },
    },
    Loans: {
      negative: { emoji: "💳", headline: "Second missed loan payment.", story: "A debt collector left a voicemail. Your credit score has dropped into a bracket that will cost you thousands in future interest rates.", tip: "Tip: Missed payments compound. A small late fee today becomes a credit score crisis tomorrow." },
    },
  },
  retiree: {
    Healthcare: {
      negative: { emoji: "🚑", headline: "Two months without healthcare.", story: "The symptoms you ignored last month have worsened. You are now facing a more expensive treatment than a checkup would have cost.", tip: "Tip: Delayed healthcare in retirement always costs more. Prevention is the cheapest medicine." },
    },
    "Emergency Fund": {
      negative: { emoji: "🆘", headline: "Two months of zero buffer.", story: "The boiler broke. With no emergency fund, you had to dip into your monthly pension to cover it. Next month will be even tighter.", tip: "Tip: Fixed-income retirees are especially exposed to unexpected costs. A thin buffer protects your whole budget." },
    },
  },
  founder: {
    Marketing: {
      negative: { emoji: "🏴", headline: "Two months of zero marketing.", story: "A competitor just launched in your exact space and is taking your customers. They have been running ads for six weeks.", tip: "Tip: Marketing absence creates a vacuum. Competitors will fill it." },
    },
    "Business Costs": {
      negative: { emoji: "💸", headline: "Two months neglecting business costs.", story: "A client complained they cannot reach you reliably. Two tools you depended on have now sent final warning emails.", tip: "Tip: Business infrastructure failure is usually slow, then very sudden. Stay current on costs." },
    },
    Savings: {
      negative: { emoji: "😰", headline: "Two months without personal savings.", story: "You had to float yourself on a credit card this week. The interest rate is 24%. The business is now costing you personally.", tip: "Tip: Personal savings separate from the business protect your mental clarity and prevent desperate decisions." },
    },
  },
};

// ── Threshold helpers ─────────────────────────────────────────────────────────

function getLevel(scenarioId, cat, value, income) {
  const sc = CONSEQUENCES[scenarioId];
  if (!sc || !sc[cat]) return null;
  const def = sc[cat];
  const threshold = def.wellThreshold * income;
  if (value === 0) return "zero";
  if (value >= threshold) return "well";
  return "under";
}

// ── Build consequence cards for a round ──────────────────────────────────────
// allocation: { cat: value }
// scenarioId: string
// income: number
// history: array of previous round allocations (oldest first)
// Returns array of card objects

export function buildConsequenceCards(scenarioId, allocation, income, history = [], roundFailed = false, failReason = "") {
  const sc = CONSEQUENCES[scenarioId];
  if (!sc) return [];

  // If round failed due to overspending or time, generate critical failure cards
  if (roundFailed) {
    const failedCards = [];
    const failMsg = failReason === "timeup"
      ? "You ran out of time to balance your budget."
      : failReason === "overspent"
      ? "You spent more than you earned this month."
      : "You left too much unallocated — money was wasted.";

    // Pick up to 4 tracked categories and mark them as critical failures
    const trackedCats = Object.keys(allocation).filter(cat => sc[cat]);
    trackedCats.slice(0, 4).forEach(cat => {
      const def = sc[cat];
      const value = allocation[cat] ?? 0;
      // Use "under" or "zero" card depending on allocation, but always negative/critical
      const base = value === 0 ? def.zero : def.under;
      if (!base) return;
      failedCards.push({
        ...base,
        cat,
        isCumulative: false,
        level: value === 0 ? "critical" : "negative",
        story: base.story + (failedCards.length === 0 ? ` ${failMsg}` : ""),
      });
    });

    // Always ensure the summary is negative — inject a sentinel critical card if needed
    if (!failedCards.some(c => c.level === "critical" || c.level === "negative")) {
      failedCards.unshift({
        emoji: "💥", headline: "Budget collapsed this month.", story: failMsg,
        cat: "Budget", level: "critical", isCumulative: false,
      });
    } else if (!failedCards.some(c => c.level === "critical")) {
      failedCards.unshift({
        emoji: "💥", headline: "Budget collapsed this month.", story: failMsg,
        cat: "Budget", level: "critical", isCumulative: false,
      });
    }

    return failedCards.slice(0, 4);
  }

  const cards = [];

  Object.entries(allocation).forEach(([cat, value]) => {
    if (!sc[cat]) return;
    const def = sc[cat];
    const level = getLevel(scenarioId, cat, value, income);
    if (!level) return;

    let card;
    if (level === "well") card = { ...def.well, cat, isCumulative: false };
    else if (level === "under") card = { ...def.under, cat, isCumulative: false };
    else card = { ...def.zero, cat, isCumulative: false };

    // Check for cumulative escalation (2+ consecutive bad rounds for this cat)
    if ((level === "under" || level === "zero") && history.length >= 1) {
      const prevAlloc = history[history.length - 1];
      const prevValue = prevAlloc?.[cat] ?? null;
      if (prevValue !== null) {
        const prevLevel = getLevel(scenarioId, cat, prevValue, income);
        if (prevLevel === "under" || prevLevel === "zero") {
          const escalation = CUMULATIVE_ESCALATIONS[scenarioId]?.[cat]?.[level === "zero" ? "negative" : "negative"];
          if (escalation) {
            card = { ...escalation, cat, level: "critical", isCumulative: true };
          }
        }
      }
    }

    // Check for cumulative positive (2+ consecutive well rounds)
    if (level === "well" && history.length >= 1) {
      const prevAlloc = history[history.length - 1];
      const prevValue = prevAlloc?.[cat] ?? null;
      if (prevValue !== null) {
        const prevLevel = getLevel(scenarioId, cat, prevValue, income);
        if (prevLevel === "well" && cat === "Savings" || cat === "Investments" || cat === "Emergency Fund") {
          card = {
            ...card,
            headline: card.headline + " (2nd month running!)",
            isCumulative: true,
            cumulativePositive: true,
          };
        }
      }
    }

    cards.push(card);
  });

  // Limit to 4 most interesting cards: sort by severity (critical > negative > neutral > positive), then cumulative first
  const ORDER = { critical: 0, negative: 1, neutral: 2, positive: 3 };
  cards.sort((a, b) => {
    if (a.isCumulative !== b.isCumulative) return a.isCumulative ? -1 : 1;
    return (ORDER[a.level] ?? 4) - (ORDER[b.level] ?? 4);
  });

  return cards.slice(0, 4);
}

// ── Overall month summary line ────────────────────────────────────────────────
export function getMonthSummary(cards) {
  const criticals = cards.filter(c => c.level === "critical").length;
  const negatives = cards.filter(c => c.level === "negative").length;
  const positives = cards.filter(c => c.level === "positive").length;
  const hasBudgetCollapse = cards.some(c => c.cat === "Budget" && c.level === "critical");
  if (hasBudgetCollapse || criticals >= 2) return { text: "This character is struggling. Budget collapsed.", color: "#EF4444" };
  if (criticals === 1 || negatives >= 2) return { text: "Tough month. Barely surviving.", color: "#F97316" };
  if (positives >= 2) return { text: "Strong month overall.", color: "#22C55E" };
  return { text: "Steady. Could be better.", color: "#F1C40F" };
}