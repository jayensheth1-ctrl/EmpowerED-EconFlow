// Part 3: The Magic of Saving (Lessons 9–12)
// Part 4: Intro to Credit & Debt (Lessons 13–15)
// Part 5: Growing Wealth & Big Picture Thinking (Lessons 16–20)

export const part2Units = [
  {
    id: "unit-3",
    title: "The Magic of Saving",
    description: "Shift from short-term consumer to long-term saver",
    color: "from-violet-500 to-purple-700",
    part2: true,
    lessons: [
      {
        id: "3-1",
        title: "Why Saving Money Matters",
        studyBrief: "Saving money is about more than just having a bigger bank balance — it's about buying yourself freedom and choices. Delayed gratification is the ability to resist the temptation of an immediate reward in favor of a larger, more valuable reward later. Studies show that people who practice delayed gratification consistently outperform those who don't — in finances, careers, and life. Opportunity cost is what you give up when you make a choice: spending $50 today means giving up $50 (plus its future growth) for something else. Every purchase is a trade-off. Savers have options; people with no savings are stuck in whatever situation they're in.",
        questions: [
          {
            type: "multiple_choice",
            question: "What is 'delayed gratification' in the context of saving?",
            options: [
              "Resisting a small reward now to gain a larger benefit later",
              "Waiting until payday to make a purchase",
              "Saving money only during the holidays",
              "Buying things on layaway rather than credit"
            ],
            correct: 0,
            explanation: "Delayed gratification is one of the most powerful predictors of financial success — choosing tomorrow's freedom over today's impulse."
          },
          {
            type: "true_false",
            question: "Having savings gives you more choices and options in life.",
            correct: true,
            explanation: "Savings = options. With a financial cushion, you can leave a bad job, handle emergencies, or seize opportunities. Without it, you're stuck."
          },
          {
            type: "multiple_choice",
            question: "What is 'opportunity cost'?",
            options: [
              "What you give up when you choose to spend money one way instead of another",
              "The cost of missing a sale at your favorite store",
              "The fee your bank charges for missed payments",
              "The price difference between two products"
            ],
            correct: 0,
            explanation: "Every financial choice has an opportunity cost — spending $100 on clothes means giving up $100 (and its potential growth) for savings or investing."
          },
          {
            type: "word_bank",
            question: "Saving money provides financial ___ and the ability to handle ___ without going into debt.",
            blanks: ["freedom", "emergencies"],
            options: ["freedom", "stress", "emergencies", "profits", "loans"],
            explanation: "Financial freedom means having choices. Emergency readiness means surprises don't derail your entire financial plan."
          },
          {
            type: "true_false",
            question: "People who spend all their income and save nothing have just as many life options as people who save consistently.",
            correct: false,
            explanation: "Savings gives you leverage — options to change jobs, move, start a business, or weather setbacks. No savings means being trapped by circumstances."
          }
        ]
      },
      {
        id: "3-2",
        title: "Building Your Emergency Fund",
        studyBrief: "Life is unpredictable. A broken phone screen, a flat tire, or unexpected medical expense can derail your entire budget if you have no safety net. An emergency fund is money set aside in an easily accessible account for unexpected financial crises only — not wants. Financial experts recommend 3-6 months of living expenses. For a 7th grader, start small: even $50-$200 in an emergency fund provides real peace of mind. The key rules: keep it in a separate savings account so you're not tempted to spend it, and replenish it immediately after using it. Never use it for non-emergencies.",
        questions: [
          {
            type: "multiple_choice",
            question: "What qualifies as an appropriate use of an emergency fund?",
            options: [
              "An unexpected car repair or medical expense",
              "Buying the new gaming console that just came out",
              "Going on a spontaneous trip with friends",
              "Buying birthday gifts for everyone in your family"
            ],
            correct: 0,
            explanation: "Emergency funds are for genuine unexpected expenses — not wants. Protecting this fund is critical to your financial stability."
          },
          {
            type: "true_false",
            question: "An emergency fund should be kept in a separate account from your everyday spending money.",
            correct: true,
            explanation: "Separation creates a psychological barrier — money in a separate savings account is much less likely to be casually spent."
          },
          {
            type: "multiple_choice",
            question: "How much should a fully-funded emergency fund cover?",
            options: [
              "3 to 6 months of living expenses",
              "Exactly one month's expenses",
              "At least 2 full years of expenses",
              "Only your rent or housing payment"
            ],
            correct: 0,
            explanation: "3-6 months of expenses covers most crises — job loss, medical emergencies, or major repairs — without falling into debt."
          },
          {
            type: "word_bank",
            question: "An emergency fund is your financial ___ — protecting you from unexpected ___ that can derail your budget.",
            blanks: ["cushion", "expenses"],
            options: ["cushion", "reward", "expenses", "profits", "income"],
            explanation: "Think of it as a financial shock absorber. Life throws surprises — your emergency fund absorbs the impact so you don't have to borrow."
          },
          {
            type: "true_false",
            question: "After using money from your emergency fund, you should replenish it as soon as possible.",
            correct: true,
            explanation: "An emergency fund only protects you if it has money in it. Rebuilding it immediately restores your safety net for the next crisis."
          }
        ]
      },
      {
        id: "3-3",
        title: "High-Yield Savings Accounts & Where to Keep Your Money",
        studyBrief: "Not all savings accounts are equal. Traditional brick-and-mortar bank savings accounts often pay 0.01% interest — nearly nothing. High-Yield Savings Accounts (HYSAs), typically offered by online banks, often pay 4-5% or more. On $1,000, that's the difference between earning $0.10 vs. $40-50 per year — just by choosing a smarter account. The reason online banks pay more: they have lower overhead (no physical branches). Your money is still FDIC-insured and just as safe. Meanwhile, inflation (the general rise in prices) erodes the purchasing power of cash not earning at least the inflation rate — leaving money in a low-interest account actually loses you money in real terms.",
        questions: [
          {
            type: "multiple_choice",
            question: "Why do high-yield savings accounts (HYSAs) typically pay higher interest rates?",
            options: [
              "Online banks have lower overhead costs without physical branches",
              "They take more risks with your deposits",
              "They are not FDIC insured so they offer higher rates",
              "They require a minimum balance of $100,000"
            ],
            correct: 0,
            explanation: "Online banks pass their savings (from no physical branches) to you as higher interest rates. Your money is just as safe — still FDIC insured."
          },
          {
            type: "true_false",
            question: "Leaving money in a savings account earning 0.01% interest while inflation runs at 3% means your money is losing purchasing power.",
            correct: true,
            explanation: "If your savings earn less than inflation, you're losing real value. $1,000 today buys more than $1,000 in 5 years at 3% inflation."
          },
          {
            type: "multiple_choice",
            question: "What is the main advantage of a high-yield savings account over a regular savings account?",
            options: [
              "It earns significantly more interest on your money",
              "It has no withdrawal limits or restrictions",
              "It comes with a free debit card for spending",
              "It is only available to adults with jobs"
            ],
            correct: 0,
            explanation: "The interest rate difference is massive — 4-5% vs 0.01%. On larger balances over time, this difference compounds into thousands of dollars."
          },
          {
            type: "word_bank",
            question: "___ erodes the purchasing power of cash over time, making it important to earn an ___ rate above inflation.",
            blanks: ["Inflation", "interest"],
            options: ["Inflation", "Savings", "interest", "credit", "debt"],
            explanation: "Money sitting idle loses value to inflation. A HYSA helps your money at least keep pace with rising prices."
          },
          {
            type: "true_false",
            question: "Online high-yield savings accounts are not FDIC insured and therefore riskier than traditional bank accounts.",
            correct: false,
            explanation: "Most online banks offering HYSAs are FDIC insured up to $250,000 — your money is just as protected as at any major bank."
          }
        ]
      },
      {
        id: "3-4",
        title: "The Power of Compound Interest & the Rule of 72",
        studyBrief: "Compound interest is the most powerful force in personal finance. Simple interest earns only on your original deposit. Compound interest earns interest on BOTH your original deposit AND all the interest already earned — your interest earns interest. This creates exponential growth that accelerates over time. The Rule of 72 is a mental math shortcut: divide 72 by your interest rate to find how many years to double your money. At 8%, your money doubles every 9 years. Starting at age 14 instead of 24 can mean the difference between retiring comfortably and working forever. Einstein reportedly called compound interest the eighth wonder of the world.",
        questions: [
          {
            type: "multiple_choice",
            question: "What makes compound interest more powerful than simple interest?",
            options: [
              "You earn interest on both your principal AND previously earned interest",
              "The interest rate is always higher with compound interest",
              "Banks charge you less in fees with compound interest",
              "Compound interest is guaranteed to double your money every year"
            ],
            correct: 0,
            explanation: "Compound interest snowballs — your interest earns interest, which earns more interest. The longer you wait, the faster it grows."
          },
          {
            type: "true_false",
            question: "Starting to save and invest at age 14 instead of age 24 gives you a massive financial advantage.",
            correct: true,
            explanation: "Starting 10 years earlier means roughly 2-3x more wealth at retirement thanks to compound growth. Time is the most valuable ingredient."
          },
          {
            type: "multiple_choice",
            question: "Using the Rule of 72, at a 9% annual return, how long does it take to double your money?",
            options: ["8 years", "9 years", "72 years", "18 years"],
            correct: 0,
            explanation: "72 ÷ 9 = 8 years. The Rule of 72 gives a quick estimate — no calculator needed to compare investment options."
          },
          {
            type: "word_bank",
            question: "Compound interest is so powerful because your ___ earns ___, which then earns even more interest.",
            blanks: ["interest", "interest"],
            options: ["interest", "principal", "debt", "taxes"],
            explanation: "This self-reinforcing loop — interest on interest — is what creates exponential growth over long time periods."
          },
          {
            type: "true_false",
            question: "Compound interest grows your money at a steady, linear rate over time.",
            correct: false,
            explanation: "Compound growth is exponential, not linear — it starts slow but accelerates dramatically. The gains in year 30 dwarf the gains in year 1."
          }
        ]
      }
    ]
  },
  {
    id: "unit-4",
    title: "Intro to Credit & Debt",
    description: "Demystify credit before credit card offers flood in",
    color: "from-amber-500 to-red-600",
    part2: true,
    lessons: [
      {
        id: "4-1",
        title: "Credit Scores Decoded: FICO & What Actually Matters",
        studyBrief: "A credit score is essentially your financial reputation number — it tells lenders how trustworthy you are with borrowed money. FICO scores range from 300-850: above 750 is excellent; below 580 is poor. Your score is calculated from: Payment History (35%) — do you pay on time? Credit Utilization (30%) — what percentage of available credit do you use? Length of Credit History (15%) — how long have you had accounts? New Credit (10%) and Credit Mix (10%). A low score can cost you thousands — higher interest rates on car loans, mortgages, and even affect apartment applications and job offers. Building credit early and carefully is one of the best financial moves a young person can make.",
        questions: [
          {
            type: "multiple_choice",
            question: "What is a credit score?",
            options: [
              "A number representing how reliably you repay borrowed money",
              "The total amount of money you have in all bank accounts",
              "A grade that measures your financial knowledge",
              "The interest rate your bank charges on loans"
            ],
            correct: 0,
            explanation: "Your credit score is your financial reputation — it tells lenders how likely you are to repay debts based on your past behavior."
          },
          {
            type: "true_false",
            question: "Your payment history is the single most important factor in your credit score.",
            correct: true,
            explanation: "Payment history makes up 35% of your FICO score — consistently paying on time is the most powerful thing you can do to build great credit."
          },
          {
            type: "multiple_choice",
            question: "A low credit score can affect which of the following?",
            options: [
              "All of the above — interest rates, apartment applications, and some jobs",
              "Only your ability to get a credit card",
              "Only the interest rate on car loans",
              "Nothing — credit scores only affect mortgages"
            ],
            correct: 0,
            explanation: "A poor credit score ripples through many areas of life — it's not just about credit cards. Landlords and employers check it too."
          },
          {
            type: "word_bank",
            question: "FICO scores range from ___ to ___, with higher scores indicating better creditworthiness.",
            blanks: ["300", "850"],
            options: ["300", "500", "850", "1000", "100"],
            explanation: "300-579 is poor, 580-669 is fair, 670-739 is good, 740-799 is very good, and 800+ is exceptional."
          },
          {
            type: "true_false",
            question: "Credit utilization — how much of your available credit you use — has no impact on your credit score.",
            correct: false,
            explanation: "Credit utilization makes up 30% of your score. Experts recommend keeping it below 30% — using less credit shows lenders you're not over-reliant on borrowing."
          }
        ]
      },
      {
        id: "4-2",
        title: "Credit Cards as Financial Tools: Rewards, Protections & Strategic Use",
        studyBrief: "Credit cards are not free money — but used correctly, they're powerful financial tools. The golden rule: pay your full balance every single month. If you do, you pay zero interest and effectively get a 30-day interest-free loan every month. Many cards offer rewards (1-5% cash back or travel points) on every purchase — free benefits just for using the card responsibly. Credit cards also offer consumer protections (fraud liability is $0 for the cardholder), purchase protection, and travel insurance. The danger: carrying a balance and paying only the minimum. A $1,000 balance at 24% APR with minimum payments can take 5+ years to pay off and cost hundreds in interest.",
        questions: [
          {
            type: "multiple_choice",
            question: "What is the golden rule of responsible credit card use?",
            options: [
              "Pay the full balance every month to avoid paying any interest",
              "Only use the card for large purchases over $100",
              "Always pay just the minimum payment to preserve cash",
              "Use the card for emergencies only and keep it frozen otherwise"
            ],
            correct: 0,
            explanation: "Pay in full every month and you'll pay zero interest — essentially a free 30-day loan with rewards on top. This is the key to using credit cards profitably."
          },
          {
            type: "true_false",
            question: "Carrying a balance and paying only the minimum on a credit card is an expensive financial mistake.",
            correct: true,
            explanation: "High APRs (often 20-30%) mean a $1,000 balance can cost hundreds in interest and take years to pay off with minimum payments only."
          },
          {
            type: "multiple_choice",
            question: "What is one major consumer protection advantage of using a credit card vs. a debit card?",
            options: [
              "Credit card fraud liability is typically $0 for the cardholder",
              "Credit cards charge lower fees at ATMs",
              "Credit cards automatically convert to cash if the bank fails",
              "Credit cards come with free FDIC insurance"
            ],
            correct: 0,
            explanation: "If your credit card is used fraudulently, you're protected — dispute the charge and it's reversed. Debit card fraud can drain your actual bank account."
          },
          {
            type: "word_bank",
            question: "Credit card ___ programs give you free cash or points just for using the card — as long as you pay the ___ balance every month.",
            blanks: ["rewards", "full"],
            options: ["rewards", "fees", "full", "minimum", "annual"],
            explanation: "Rewards programs are only profitable if you never carry a balance. Otherwise, the interest you pay will far exceed any rewards you earn."
          },
          {
            type: "true_false",
            question: "Credit cards are inherently dangerous and should never be used by anyone.",
            correct: false,
            explanation: "Used responsibly (paid in full monthly), credit cards build your credit score, earn rewards, and provide consumer protections. The tool isn't dangerous — misusing it is."
          }
        ]
      },
      {
        id: "4-3",
        title: "Loans, Borrowing & Interest Rates",
        studyBrief: "A loan lets you use money now in exchange for paying it back later — with interest. The principal is the original amount borrowed. Interest is the fee for borrowing, expressed as an APR (Annual Percentage Rate). Fixed interest rates stay the same throughout the loan; variable rates can change. Your monthly payment depends on the principal, interest rate, and loan term (length). The longer the term, the lower the monthly payment — but the more total interest you pay. Student loans, car loans, and mortgages are the three loans young adults will encounter most. Comparing total interest cost — not just monthly payment — is the smart way to evaluate any loan.",
        questions: [
          {
            type: "multiple_choice",
            question: "What is the 'principal' of a loan?",
            options: [
              "The original amount of money borrowed",
              "The monthly interest payment",
              "The total interest paid over the loan life",
              "The lender's profit on the loan"
            ],
            correct: 0,
            explanation: "Principal is what you actually borrowed. Interest is the extra you pay on top. Your payments gradually reduce the principal."
          },
          {
            type: "true_false",
            question: "A longer loan term always means you pay less total money overall.",
            correct: false,
            explanation: "Longer terms lower monthly payments but increase total interest paid. A 60-month car loan costs significantly more in interest than a 36-month loan."
          },
          {
            type: "multiple_choice",
            question: "What is the difference between a fixed and variable interest rate?",
            options: [
              "Fixed stays the same; variable can change over time based on market rates",
              "Fixed is always higher; variable is always lower",
              "Fixed is for mortgages only; variable is for all other loans",
              "They mean exactly the same thing to borrowers"
            ],
            correct: 0,
            explanation: "Fixed rates give predictability — your payment never changes. Variable rates can go up or down, creating uncertainty in your budget."
          },
          {
            type: "word_bank",
            question: "APR stands for ___ Percentage Rate — the annual cost of ___ expressed as a percentage.",
            blanks: ["Annual", "borrowing"],
            options: ["Annual", "Applied", "borrowing", "saving", "investing"],
            explanation: "APR is the standard way to compare loan costs. Higher APR = more expensive loan. Always compare APRs, not just monthly payments."
          },
          {
            type: "true_false",
            question: "When comparing loans, you should focus only on the monthly payment, not the total interest cost.",
            correct: false,
            explanation: "A low monthly payment can hide an enormous total cost. Always calculate: monthly payment × number of payments = total cost, then subtract the principal to see total interest."
          }
        ]
      }
    ]
  },
  {
    id: "unit-5",
    title: "Growing Wealth & Big Picture Thinking",
    description: "Investing basics, career planning, and financial freedom",
    color: "from-emerald-500 to-teal-700",
    part2: true,
    lessons: [
      {
        id: "5-1",
        title: "Saving vs. Investing: When Each Makes Sense",
        studyBrief: "Saving and investing are not the same thing. Saving means keeping money in safe, accessible accounts (like a savings account) for short-term goals or emergencies. Investing means putting money into assets like stocks, bonds, or real estate with the expectation of growth — but accepting some risk of loss. The key factors: time horizon (when do you need the money?), liquidity (how quickly can you access it?), and risk tolerance (can you handle temporary losses?). Money needed within 1-3 years should be saved, not invested — markets can drop. Money not needed for 5+ years is a candidate for investing, where compound growth can work its magic.",
        questions: [
          {
            type: "multiple_choice",
            question: "Money you'll need within the next 1-2 years should primarily be:",
            options: [
              "Kept in a safe, accessible savings account",
              "Invested in the stock market for maximum growth",
              "Put into cryptocurrency for fast returns",
              "Spent now since it can't grow meaningfully"
            ],
            correct: 0,
            explanation: "Short-term money belongs in savings — markets can drop 20-40% right when you need the money. Don't invest what you can't afford to lose temporarily."
          },
          {
            type: "true_false",
            question: "Investing always guarantees higher returns than a savings account.",
            correct: false,
            explanation: "Investing offers higher POTENTIAL returns but carries risk — your investments can lose value. Savings accounts offer lower but guaranteed returns."
          },
          {
            type: "multiple_choice",
            question: "What is 'liquidity' in personal finance?",
            options: [
              "How quickly you can convert an asset to cash without losing significant value",
              "The total amount of cash in your bank accounts",
              "The interest rate on a savings account",
              "A measure of how much debt you have"
            ],
            correct: 0,
            explanation: "High liquidity = easy to access quickly. A savings account is highly liquid; a house is illiquid (takes months to sell)."
          },
          {
            type: "word_bank",
            question: "Money needed within 3 years should be ___, while money not needed for 5+ years can potentially be ___.",
            blanks: ["saved", "invested"],
            options: ["saved", "spent", "invested", "donated", "hidden"],
            explanation: "Time horizon is the key deciding factor. Short-term money needs safety and liquidity. Long-term money can tolerate market volatility for higher growth."
          },
          {
            type: "true_false",
            question: "Risk tolerance refers to how much financial risk you can comfortably handle without panicking.",
            correct: true,
            explanation: "Your risk tolerance affects your investment choices. Investing beyond your risk tolerance leads to panic-selling at the worst possible time."
          }
        ]
      },
      {
        id: "5-2",
        title: "Why Invest? Inflation & The Time Value of Money",
        studyBrief: "Inflation is the silent wealth destroyer. When prices rise 3% per year, the purchasing power of your money shrinks every year you don't invest it. $10,000 under a mattress for 20 years loses nearly half its purchasing power. The Time Value of Money principle states that a dollar today is worth more than a dollar in the future — because today's dollar can be invested to grow. The stock market has historically returned an average of ~10% per year (before inflation). This means money invested in broad market index funds roughly doubles every 7 years. Not investing is a guaranteed way to fall behind inflation — and give up decades of compounding growth.",
        questions: [
          {
            type: "multiple_choice",
            question: "What is inflation?",
            options: [
              "The general rise in prices over time, reducing what your money can buy",
              "When the stock market goes up in value",
              "A government tax on savings accounts",
              "When interest rates at banks decrease"
            ],
            correct: 0,
            explanation: "Inflation means $100 today buys more than $100 in 10 years. This is why just saving cash is not enough — you need your money to grow faster than inflation."
          },
          {
            type: "true_false",
            question: "Keeping all your money in cash under a mattress is a risk-free strategy for preserving wealth.",
            correct: false,
            explanation: "Cash loses purchasing power to inflation every year. In 20 years at 3% inflation, $10,000 buys roughly what $5,500 buys today. 'Risk-free' cash storage is actually guaranteed loss."
          },
          {
            type: "multiple_choice",
            question: "The historical average annual return of the US stock market (S&P 500) is approximately:",
            options: ["~10% per year", "~2% per year", "~25% per year", "~0.5% per year"],
            correct: 0,
            explanation: "The S&P 500 has returned roughly 10% annually over the long run (before inflation). At that rate, money doubles approximately every 7 years."
          },
          {
            type: "word_bank",
            question: "The time value of money means a dollar ___ is worth more than a dollar in the ___ because it can be invested to grow.",
            blanks: ["today", "future"],
            options: ["today", "yesterday", "future", "past", "saved"],
            explanation: "Present dollars have more value because of their earning potential. This is why starting to invest early is so powerful."
          },
          {
            type: "true_false",
            question: "Investing in the stock market protects the purchasing power of your money better than keeping it in cash long-term.",
            correct: true,
            explanation: "Over the long run, stock market returns significantly outpace inflation — growing your wealth in real terms, not just nominally."
          }
        ]
      },
      {
        id: "5-3",
        title: "Asset Classes Simplified: Stocks, Bonds & Index Funds",
        studyBrief: "An asset class is a group of similar investments. Stocks represent ownership in companies — you buy a tiny piece of a business. Bonds are loans you make to companies or governments — they pay you back with interest. Stocks have higher potential returns but more volatility; bonds are more stable but grow slowly. An index fund is a basket of many stocks (like all 500 companies in the S&P 500) in a single investment. Index funds offer instant diversification — spreading risk across hundreds of companies. Even Warren Buffett recommends index funds for most people. Single stocks are risky; if the company fails, you could lose everything. Diversification — not putting all your eggs in one basket — is the core principle of smart investing.",
        questions: [
          {
            type: "multiple_choice",
            question: "What does owning a stock represent?",
            options: [
              "Owning a tiny piece of a company and sharing in its profits and losses",
              "Lending money to a company that promises to pay you back",
              "Buying a government guarantee of fixed returns",
              "Depositing money in a special high-interest bank account"
            ],
            correct: 0,
            explanation: "Shareholders are part-owners. When the company does well, stock value rises. When it struggles, the stock can fall — including to zero if the company fails."
          },
          {
            type: "true_false",
            question: "An index fund automatically diversifies your investment across many companies at once.",
            correct: true,
            explanation: "An S&P 500 index fund owns tiny pieces of 500 companies simultaneously. If one fails, it barely affects your portfolio — diversification reduces risk dramatically."
          },
          {
            type: "multiple_choice",
            question: "Why do financial experts recommend index funds for most investors over picking individual stocks?",
            options: [
              "They automatically diversify risk and have lower fees than actively managed funds",
              "Index funds guarantee you will never lose money",
              "They always outperform every individual stock",
              "They are only available to professional investors"
            ],
            correct: 0,
            explanation: "Studies show most actively managed funds underperform simple index funds over time, especially after fees. Index funds are low-cost, diversified, and historically reliable."
          },
          {
            type: "word_bank",
            question: "Bonds are ___ you make to companies or governments — they pay you back with ___ over time.",
            blanks: ["loans", "interest"],
            options: ["loans", "gifts", "interest", "dividends", "equity"],
            explanation: "When you buy a bond, you're the lender. The borrower (company or government) pays you interest and returns your principal when the bond matures."
          },
          {
            type: "true_false",
            question: "Putting all your savings into a single company's stock is a smart, low-risk investment strategy.",
            correct: false,
            explanation: "Single-stock concentration is extremely risky — companies can and do go bankrupt. Diversification across many investments is the cornerstone of sound investing."
          }
        ]
      },
      {
        id: "5-4",
        title: "Income Growth: Career Capital, Side Hustles & Entrepreneurship",
        studyBrief: "The fastest way to improve your financial situation is to increase your income — not just cut expenses. Career capital means the skills, experiences, and reputation you build over time that make you more valuable to employers or clients. Investing in your own skills has the highest potential return of any investment. Side hustles are additional income streams alongside a main job — lawn mowing, babysitting, tutoring, selling crafts, or freelance work. Entrepreneurship means starting a business to solve a problem people will pay you to fix. You have abundant time and energy right now — two things most adults wish they had more of. Starting small, failing cheaply, and learning young is an enormous advantage.",
        questions: [
          {
            type: "multiple_choice",
            question: "What is 'career capital'?",
            options: [
              "The skills, experiences, and reputation that make you more valuable over time",
              "The total money you earn in a career",
              "A type of retirement savings account for employees",
              "The cost of college education and training"
            ],
            correct: 0,
            explanation: "Career capital is your professional value — the more specialized skills and expertise you build, the higher your earning power becomes."
          },
          {
            type: "true_false",
            question: "Starting a small side hustle as a teenager is a great way to learn about earning, managing money, and business.",
            correct: true,
            explanation: "Teens who start businesses or side hustles learn financial lessons experientially — far more powerfully than reading about them. Failure stakes are low; learning is invaluable."
          },
          {
            type: "multiple_choice",
            question: "Why is increasing your income arguably more impactful than just cutting expenses?",
            options: [
              "Income has unlimited upside potential; expense cuts have a floor (you still need to eat and live)",
              "Cutting expenses is impossible without a drastic lifestyle change",
              "Income growth always happens automatically with age",
              "Expenses don't matter once income reaches a certain level"
            ],
            correct: 0,
            explanation: "You can only cut expenses so far. But income has no ceiling — skills, value creation, and entrepreneurship can multiply your earnings many times over."
          },
          {
            type: "word_bank",
            question: "Investing in your own ___ and skills often produces a higher ___ than any financial investment.",
            blanks: ["education", "return"],
            options: ["education", "house", "return", "debt", "savings"],
            explanation: "A skill that increases your earning power by $10K/year is worth hundreds of thousands over a career — far exceeding most investment returns."
          },
          {
            type: "true_false",
            question: "You need to be an adult with a full-time job before you can start building entrepreneurial skills.",
            correct: false,
            explanation: "Some of the most successful entrepreneurs started as teenagers — with lawn care routes, tech services, or online businesses. Youth is an advantage: low costs, lots of time, nothing to lose."
          }
        ]
      },
      {
        id: "5-5",
        title: "Defining Your Enough: Values-Based Financial Planning",
        studyBrief: "Financial independence doesn't mean being the richest person — it means having enough money that work becomes a choice, not a requirement. 'Lifestyle inflation' is the dangerous tendency to increase spending as income rises, keeping you permanently broke no matter how much you earn. True wealth is having financial freedom and security; 'looking rich' (expensive cars, designer clothes, rented luxury) is the trap that keeps high earners poor. Values-based planning asks: what do I actually want my life to look like? Then you align your spending with those answers. People who define their 'enough' — the life that genuinely satisfies them — stop the endless cycle of earning and spending and start building real, lasting wealth.",
        questions: [
          {
            type: "multiple_choice",
            question: "What is 'lifestyle inflation'?",
            options: [
              "Increasing your spending as your income grows, keeping you from building wealth",
              "When the cost of living rises due to general price inflation",
              "The strategy of spending more to attract higher-paying jobs",
              "A reward system where you upgrade your lifestyle after each promotion"
            ],
            correct: 0,
            explanation: "Lifestyle inflation is the silent wealth killer — earning more but spending proportionally more means never actually getting ahead financially."
          },
          {
            type: "true_false",
            question: "People who drive expensive cars and wear designer clothes are always financially wealthy.",
            correct: false,
            explanation: "Many 'looking rich' people are cash-poor — financing lifestyles they can't afford. True wealth is quietly building assets, not visibly spending money."
          },
          {
            type: "multiple_choice",
            question: "What is 'financial independence'?",
            options: [
              "Having enough assets that work becomes a choice, not a requirement",
              "Earning a salary of over $100,000 per year",
              "Owning your home with no mortgage",
              "Having zero debt of any kind"
            ],
            correct: 0,
            explanation: "Financial independence means your investments and savings can cover your living expenses — so you work because you want to, not because you have to."
          },
          {
            type: "word_bank",
            question: "Values-based financial planning means aligning your ___ with what truly brings you happiness, not what ___ others.",
            blanks: ["spending", "impresses"],
            options: ["spending", "debt", "impresses", "ignores", "funds"],
            explanation: "Spending aligned with your genuine values creates satisfaction. Spending to impress others creates debt and dissatisfaction."
          },
          {
            type: "true_false",
            question: "Defining your personal 'enough' and resisting lifestyle inflation is a key strategy for building lasting wealth.",
            correct: true,
            explanation: "Knowing what's enough — and stopping there — is what separates people who build real wealth from those who earn a lot but always feel broke."
          }
        ]
      }
    ]
  }
];

export function getAllPart2Lessons() {
  const lessons = [];
  part2Units.forEach(unit => {
    unit.lessons.forEach(lesson => {
      lessons.push({ ...lesson, unitId: unit.id, unitTitle: unit.title, unitColor: unit.color });
    });
  });
  return lessons;
}

export function getPart2LessonById(id) {
  for (const unit of part2Units) {
    const lesson = unit.lessons.find(l => l.id === id);
    if (lesson) return { ...lesson, unitId: unit.id, unitTitle: unit.title, unitColor: unit.color };
  }
  return null;
}