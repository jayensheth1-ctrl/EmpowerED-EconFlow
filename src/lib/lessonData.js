// Part 1: The Basics of Money & Banking (Lessons 1–4)
// Part 2: Managing and Tracking Cash Flow (Lessons 5–8)

export const units = [
  {
    id: "unit-1",
    title: "The Basics of Money & Banking",
    description: "Understand money, banking, and financial safety",
    color: "from-emerald-400 to-emerald-600",
    lessons: [
      {
        id: "1-1",
        title: "What Is a Budget and Why It Matters",
        studyBrief: "A budget is NOT financial punishment — it's a blueprint for getting what you actually want. A budget helps you decide where your money goes before it disappears. The first step is understanding the difference between wants (things you'd like but don't need, like new sneakers) and needs (things essential for survival, like food and shelter). Scarcity means we have limited money but unlimited wants — so we have to make choices. A budget helps you prioritize, set goals, and track progress toward them. People who budget consistently are far more likely to achieve financial goals.",
        questions: [
          {
            type: "multiple_choice",
            question: "What is the main purpose of a budget?",
            options: [
              "To plan where your money goes so you can reach your goals",
              "To restrict your spending as a punishment",
              "To track only your income",
              "To make sure you spend everything you earn"
            ],
            correct: 0,
            explanation: "A budget is a blueprint — it gives every dollar a purpose so your money works for you."
          },
          {
            type: "true_false",
            question: "Wants and needs are exactly the same thing.",
            correct: false,
            explanation: "Needs are essentials (food, shelter, clothing). Wants are things you'd like but don't need to survive — like the latest phone or gaming console."
          },
          {
            type: "multiple_choice",
            question: "What does 'scarcity' mean in personal finance?",
            options: [
              "We have limited money but unlimited wants",
              "There is not enough food in the world",
              "Banks don't have enough money to lend",
              "Prices are always going up"
            ],
            correct: 0,
            explanation: "Scarcity forces us to make choices — we can't have everything, so budgeting helps us choose wisely."
          },
          {
            type: "word_bank",
            question: "A budget helps you manage ___ and ___ so you can reach your financial goals.",
            blanks: ["income", "expenses"],
            options: ["income", "expenses", "friends", "hobbies", "luck"],
            explanation: "Tracking both what comes in (income) and what goes out (expenses) is the foundation of every budget."
          },
          {
            type: "true_false",
            question: "People who budget are more likely to achieve their financial goals.",
            correct: true,
            explanation: "Budgeting gives you a plan and keeps you accountable — it's one of the most powerful financial habits you can build."
          }
        ]
      },
      {
        id: "1-2",
        title: "Banking 101: Checking, Savings & How Banks Work",
        studyBrief: "Banks are NOT giant vaults storing your cash — they are financial intermediaries. When you deposit money, the bank lends most of it out to other customers (like home loans and car loans) and pays you interest for using your money. A checking account is for everyday spending — you use a debit card to access it. A savings account is for money you don't need immediately and earns interest. The FDIC insures bank deposits up to $250,000, so your money is safe even if the bank fails. When you use a debit card, money leaves your account immediately; a credit card is borrowed money you repay later.",
        questions: [
          {
            type: "multiple_choice",
            question: "What do banks do with the money you deposit?",
            options: [
              "Lend most of it to other customers and earn interest",
              "Lock it in a vault and do nothing with it",
              "Invest it all in the stock market",
              "Send it to the government for safekeeping"
            ],
            correct: 0,
            explanation: "Banks are financial intermediaries — they pay you a little interest and lend your money to others at a higher rate."
          },
          {
            type: "true_false",
            question: "A checking account is best for everyday spending while a savings account is for money you don't need right away.",
            correct: true,
            explanation: "Checking accounts come with debit cards for daily use. Savings accounts earn interest and are for money you're setting aside."
          },
          {
            type: "multiple_choice",
            question: "What does FDIC insurance protect?",
            options: [
              "Your bank deposits up to $250,000 if the bank fails",
              "Your investments in the stock market",
              "Your credit card debt",
              "Your cash stored at home"
            ],
            correct: 0,
            explanation: "The FDIC insures deposits at member banks — your money is safe even if the bank goes out of business."
          },
          {
            type: "word_bank",
            question: "When you use a debit card, money leaves your account ___; with a credit card, you're spending ___ money.",
            blanks: ["immediately", "borrowed"],
            options: ["immediately", "eventually", "borrowed", "free", "saved"],
            explanation: "Debit = your money right now. Credit = borrowed money you must pay back — often with interest."
          },
          {
            type: "true_false",
            question: "The interest rate a bank pays you on savings is always higher than what they charge on loans.",
            correct: false,
            explanation: "Banks earn profit by lending at higher rates than they pay depositors. That spread is how banks make money."
          }
        ]
      },
      {
        id: "1-3",
        title: "Banking Security: Fraud Prevention & Digital Safety",
        studyBrief: "Your generation is highly online — which makes you a prime target for scams. Phishing is when criminals pretend to be a bank, company, or friend to steal your login credentials or money. Common red flags: urgent messages asking for your password or PIN, 'you won a prize!' texts, and fake websites that look real. A strong password is long, unique, and not reused across sites. Use two-factor authentication (2FA) when available. Never share your PIN, debit card number, or Social Security number — not even with someone claiming to be from your bank. Legitimate institutions will never ask for this over text or email.",
        questions: [
          {
            type: "multiple_choice",
            question: "What is a 'phishing' attack?",
            options: [
              "A scam where criminals impersonate trusted organizations to steal your info",
              "A type of computer virus that deletes your files",
              "A bank fee for online transactions",
              "A form of identity insurance"
            ],
            correct: 0,
            explanation: "Phishing uses fake emails, texts, or websites that look real to trick you into giving up passwords or financial info."
          },
          {
            type: "true_false",
            question: "If someone calls claiming to be from your bank and asks for your PIN, you should provide it to verify your identity.",
            correct: false,
            explanation: "Legitimate banks will NEVER ask for your PIN over the phone or by text. This is always a scam — hang up immediately."
          },
          {
            type: "multiple_choice",
            question: "What is two-factor authentication (2FA)?",
            options: [
              "A second verification step (like a text code) in addition to your password",
              "Having two separate bank accounts",
              "Using two different passwords for the same account",
              "A type of fraud insurance for online purchases"
            ],
            correct: 0,
            explanation: "2FA adds a second layer — even if someone steals your password, they still can't access your account without the second factor."
          },
          {
            type: "word_bank",
            question: "Never share your ___ or debit card number with anyone, even someone claiming to be from your ___.",
            blanks: ["PIN", "bank"],
            options: ["PIN", "username", "bank", "school", "friend"],
            explanation: "Your PIN is private. Real banks never ask for it — anyone who does is trying to scam you."
          },
          {
            type: "true_false",
            question: "Using the same password for multiple accounts is a security best practice.",
            correct: false,
            explanation: "Reusing passwords is dangerous — if one account is breached, hackers can access all your others. Use unique passwords and a password manager."
          }
        ]
      },
      {
        id: "1-4",
        title: "Direct Deposit, Bill Pay & Automating Your Financial Life",
        studyBrief: "Modern money is mostly invisible — it flows electronically without cash ever changing hands. Direct deposit means your employer sends your paycheck straight to your bank account automatically, no check to cash. Bill pay lets you set up automatic payments for recurring bills so you never miss a due date. The concept of 'set it and forget it' automation is powerful: when saving and bill payments happen automatically before you see the money, you're less tempted to spend it. Many people automate transfers to savings accounts on payday — this is called 'paying yourself first.'",
        questions: [
          {
            type: "multiple_choice",
            question: "What is direct deposit?",
            options: [
              "Your paycheck is automatically sent to your bank account electronically",
              "Depositing cash directly into an ATM",
              "A special savings account that earns higher interest",
              "Paying for things directly without a bank"
            ],
            correct: 0,
            explanation: "Direct deposit skips the paper check — your employer sends money electronically straight to your account on payday."
          },
          {
            type: "true_false",
            question: "Setting up automatic bill payments can help you avoid late fees and missed due dates.",
            correct: true,
            explanation: "Automation removes human error — bills get paid on time without you having to remember each one."
          },
          {
            type: "multiple_choice",
            question: "What does 'paying yourself first' mean?",
            options: [
              "Automatically transferring money to savings before spending on anything else",
              "Buying yourself a treat before paying bills",
              "Taking a salary from your own business first",
              "Paying off your debts before giving money to others"
            ],
            correct: 0,
            explanation: "Automating savings first ensures it actually happens — what you don't see, you won't spend."
          },
          {
            type: "word_bank",
            question: "Financial ___ means setting up systems so saving and bill payments happen ___ without manual effort.",
            blanks: ["automation", "automatically"],
            options: ["automation", "confusion", "automatically", "randomly", "never"],
            explanation: "Automation is the secret weapon of good money management — it removes temptation and eliminates forgotten payments."
          },
          {
            type: "true_false",
            question: "Most transactions today involve physical cash being transported between banks.",
            correct: false,
            explanation: "Modern money is mostly digital — payments, payroll, and transfers happen electronically. Physical cash is a small fraction of total transactions."
          }
        ]
      }
    ]
  },
  {
    id: "unit-2",
    title: "Managing and Tracking Cash Flow",
    description: "Handle income, build budgets, track spending",
    color: "from-blue-400 to-blue-600",
    lessons: [
      {
        id: "2-1",
        title: "Income, Expenses & Net Cash Flow",
        studyBrief: "Income is money flowing IN — from a job, allowance, selling things, or side gigs. Expenses are money flowing OUT — food, clothes, streaming subscriptions, etc. Net cash flow is simple math: Income minus Expenses. If it's positive, you're building financial security. If it's negative, you're going into debt. Gross income is your total pay before deductions; net income (take-home pay) is what you actually receive after taxes. Expenses split into fixed (same every month, like a phone plan) and variable (changes monthly, like groceries or entertainment).",
        questions: [
          {
            type: "multiple_choice",
            question: "What is net cash flow?",
            options: [
              "Income minus expenses — what's left over after all spending",
              "Your total paycheck before taxes",
              "Only the money in your savings account",
              "The total amount of all your debts"
            ],
            correct: 0,
            explanation: "Net cash flow = Income − Expenses. Positive means you're building wealth; negative means you're spending more than you earn."
          },
          {
            type: "true_false",
            question: "Fixed expenses stay the same every month while variable expenses change.",
            correct: true,
            explanation: "Fixed expenses (like a phone plan) are predictable. Variable expenses (like food or fun) fluctuate and are where most overspending happens."
          },
          {
            type: "multiple_choice",
            question: "What is the difference between gross and net income?",
            options: [
              "Gross is total pay before deductions; net is what you actually take home",
              "Net income is higher than gross income",
              "They are the same thing with different names",
              "Gross income is only for business owners"
            ],
            correct: 0,
            explanation: "Taxes and other deductions come out of your gross pay — what's left is your net income, the money you actually spend."
          },
          {
            type: "word_bank",
            question: "When your ___ is greater than your ___, you have a positive net cash flow.",
            blanks: ["income", "expenses"],
            options: ["income", "debt", "expenses", "taxes", "savings"],
            explanation: "Earning more than you spend is the foundation of financial health. Positive cash flow = money left to save or invest."
          },
          {
            type: "true_false",
            question: "A negative net cash flow means you are spending more money than you are earning.",
            correct: true,
            explanation: "Negative cash flow leads to debt. The fix is to increase income, cut expenses, or both."
          }
        ]
      },
      {
        id: "2-2",
        title: "The 50/30/20 Rule: A Framework for Every Budget",
        studyBrief: "The 50/30/20 rule is a simple budgeting framework that works for almost any income level. Split your net (take-home) income into three categories: 50% goes to Needs — rent, food, utilities, transportation, and minimum debt payments. 30% goes to Wants — dining out, entertainment, new clothes, subscriptions. 20% goes to Savings & Debt Repayment — emergency fund, investing, and paying down debt faster than required. This rule scales perfectly whether your allowance is $20/week or your paycheck is $2,000/month. It's a starting framework, not a rigid law.",
        questions: [
          {
            type: "multiple_choice",
            question: "In the 50/30/20 rule, what does the '20' represent?",
            options: [
              "20% for savings and paying off debt",
              "20% for entertainment and wants",
              "20% for taxes",
              "20% for food and groceries"
            ],
            correct: 0,
            explanation: "The 20% is your most powerful category — savings and debt repayment. This is how you build wealth and gain financial freedom."
          },
          {
            type: "true_false",
            question: "In the 50/30/20 rule, wants like streaming services and dining out fall into the 50% needs category.",
            correct: false,
            explanation: "Wants go in the 30% bucket. Needs are things required for basic survival and functioning — not luxuries, however enjoyable they are."
          },
          {
            type: "multiple_choice",
            question: "If you take home $1,000/month, how much should go to savings using the 50/30/20 rule?",
            options: ["$200", "$500", "$300", "$100"],
            correct: 0,
            explanation: "20% of $1,000 = $200 for savings and debt repayment. Even small consistent amounts build up significantly over time."
          },
          {
            type: "word_bank",
            question: "The 50/30/20 rule splits income into ___, wants, and ___.",
            blanks: ["needs", "savings"],
            options: ["needs", "taxes", "savings", "investments", "loans"],
            explanation: "Needs (50%), Wants (30%), Savings (20%) — a simple, powerful framework for any income level."
          },
          {
            type: "true_false",
            question: "The 50/30/20 rule can be adapted based on your personal financial situation and goals.",
            correct: true,
            explanation: "It's a guideline, not a law. If you have high debt, you might do 50/20/30 and cut wants to pay it off faster."
          }
        ]
      },
      {
        id: "2-3",
        title: "Zero-Based Budgeting & Pay Yourself First",
        studyBrief: "Zero-based budgeting means giving every single dollar a specific job until Income minus Expenses equals zero — not because you spent it all, but because you allocated every dollar intentionally (including savings). If you don't plan where your money goes, it mysteriously disappears on impulse buys. 'Pay Yourself First' is the practice of moving savings to a separate account the moment you receive income — before paying any bills or discretionary spending. Out of sight, out of mind. This removes the temptation to spend savings. The combination of these two strategies virtually eliminates mindless spending.",
        questions: [
          {
            type: "multiple_choice",
            question: "In zero-based budgeting, Income minus all allocations should equal:",
            options: [
              "Zero — every dollar has been assigned a purpose",
              "Your savings amount",
              "Your monthly expenses",
              "A positive number (unspent cash)"
            ],
            correct: 0,
            explanation: "Zero-based budgeting means you've intentionally assigned every dollar — including savings. Zero is the goal, not a problem."
          },
          {
            type: "true_false",
            question: "If you don't give every dollar a job, money tends to disappear on impulse purchases.",
            correct: true,
            explanation: "Unallocated money gets spent — usually on things you don't really value. Zero-based budgeting forces intentional decisions."
          },
          {
            type: "multiple_choice",
            question: "What does 'Pay Yourself First' mean in practice?",
            options: [
              "Move savings to a separate account the moment you get paid, before anything else",
              "Buy yourself a reward each payday",
              "Pay off debts before paying rent",
              "Keep all your money in one account for convenience"
            ],
            correct: 0,
            explanation: "Moving savings first removes temptation. What you don't see in your checking account, you won't spend."
          },
          {
            type: "word_bank",
            question: "Zero-based budgeting requires giving every ___ a specific ___ before the month begins.",
            blanks: ["dollar", "purpose"],
            options: ["dollar", "month", "purpose", "account", "friend"],
            explanation: "Intentional allocation is the antidote to mystery spending — your money has a destination before it arrives."
          },
          {
            type: "true_false",
            question: "Keeping savings in the same account as spending money makes it easier to save consistently.",
            correct: false,
            explanation: "Mixing accounts makes it tempting to dip into savings. Separate accounts create a psychological barrier that protects your savings."
          }
        ]
      },
      {
        id: "2-4",
        title: "Tracking Spending & Budget Apps",
        studyBrief: "You can't improve what you don't measure. Tracking your spending — even for just 30 days — reveals surprising 'money leaks': small recurring expenses that add up (daily drinks, random app purchases, impulse buys). Budgeting apps like Mint, YNAB (You Need A Budget), or even a simple spreadsheet connect to your bank and categorize spending automatically. Key metrics to watch: are you staying within each budget category? Where do you consistently overspend? Identifying your personal 'money leak' areas is the first step to fixing them. Many people save hundreds per month just by seeing where their money actually goes.",
        questions: [
          {
            type: "multiple_choice",
            question: "What are 'money leaks' in budgeting?",
            options: [
              "Small recurring expenses that add up and drain your budget unnoticed",
              "A bank error that removes money from your account",
              "Large one-time purchases that exceed your budget",
              "Interest charges from credit card debt"
            ],
            correct: 0,
            explanation: "Money leaks are small, often forgotten expenses — $5 here, $15 there — that compound into significant monthly spending."
          },
          {
            type: "true_false",
            question: "Tracking your spending for even 30 days can reveal surprising patterns in how you use money.",
            correct: true,
            explanation: "Most people are shocked by what they discover. Awareness is the first and most powerful step to changing spending behavior."
          },
          {
            type: "multiple_choice",
            question: "What do budgeting apps like Mint or YNAB primarily help you do?",
            options: [
              "Automatically categorize spending and track your budget in real time",
              "Invest your money in the stock market",
              "Apply for bank loans and credit cards",
              "File your taxes automatically at year end"
            ],
            correct: 0,
            explanation: "Budget apps link to your bank, categorize every transaction, and show you exactly where your money is going — no manual entry needed."
          },
          {
            type: "word_bank",
            question: "You can't ___ what you don't ___  — tracking spending is the foundation of financial awareness.",
            blanks: ["improve", "measure"],
            options: ["improve", "ignore", "measure", "guess", "spend"],
            explanation: "Data drives improvement. Seeing your actual spending patterns — not what you think you spend — is the first step to change."
          },
          {
            type: "true_false",
            question: "Most people accurately guess how much they spend in each category without tracking.",
            correct: false,
            explanation: "Studies consistently show people underestimate their spending — especially on dining, entertainment, and subscriptions. Tracking reveals the reality."
          }
        ]
      }
    ]
  }
];

export function getAllLessons() {
  const lessons = [];
  units.forEach(unit => {
    unit.lessons.forEach(lesson => {
      lessons.push({ ...lesson, unitId: unit.id, unitTitle: unit.title, unitColor: unit.color });
    });
  });
  return lessons;
}

export function getLessonById(id) {
  for (const unit of units) {
    const lesson = unit.lessons.find(l => l.id === id);
    if (lesson) return { ...lesson, unitId: unit.id, unitTitle: unit.title, unitColor: unit.color };
  }
  return null;
}

export function getNextLessonId(completedLessons) {
  const allLessons = getAllLessons();
  for (const lesson of allLessons) {
    if (!completedLessons?.includes(lesson.id)) return lesson.id;
  }
  return null;
}