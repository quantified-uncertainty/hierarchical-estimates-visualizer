import axios from "axios";

let data = [
  {
    source: "Thinking Fast and Slow",

    target: "The Mathematical Theory of Communication",

    distance: 99999.99999999999,

    reasoning:
      "TFS: Not original work. 1 million buyers, 0.3m readers, 0.03m did anything with it long-term. Debiasing doesn't work that much. But maybe some general sanity effects.\nMTC: foundational to half of good fields. Direct applications key to telecoms and internet, AI. Is very natural and probably invented anyway, but let's ignore replaceability. ",
  },

  {
    source: "The Global Priorities Institute's Research Agenda",

    target: "Superintelligence",

    distance: 100,

    reasoning:
      "GPI: good stuff but v v hard questions read by ~200.\nSuperintelligence: Maybe 50,000 copies? associated interview tour transformed the field.",
  },

  {
    source: "Thinking Fast and Slow",

    target: "The Global Priorities Institute's Research Agenda",

    distance: "100",

    reasoning: "",
  },

  {
    source: "The Global Priorities Institute's Research Agenda",

    target: "The Mathematical Theory of Communication",

    distance: 1000,

    reasoning: "",
  },

  {
    source: "Superintelligence",

    target: "The Mathematical Theory of Communication",

    distance: 10,

    reasoning: "",
  },

  {
    source: "Categorizing Variants of Goodhart's Law",

    target: "The Vulnerable World Hypothesis",

    distance: 10,

    reasoning: "",
  },

  {
    source: "Shallow evaluations of longtermist organizations",

    target: "The motivated reasoning critique of effective altruism",

    distance: 10,

    reasoning: "",
  },

  {
    source: "Shallow evaluations of longtermist organizations",

    target: "Categorizing Variants of Goodhart's Law",

    distance: 100,

    reasoning: "",
  },

  {
    source: "The motivated reasoning critique of effective altruism",

    target: "Categorizing Variants of Goodhart's Law",

    distance: 10,

    reasoning: "",
  },

  {
    source: "Shallow evaluations of longtermist organizations",

    target: "Thinking Fast and Slow",

    distance: 10,

    reasoning: "",
  },

  {
    source: "Thinking Fast and Slow",

    target: "The motivated reasoning critique of effective altruism",

    distance: 1,

    reasoning: "",
  },

  {
    source: "The motivated reasoning critique of effective altruism",

    target: "The Global Priorities Institute's Research Agenda",

    distance: 1000,

    reasoning: "",
  },

  {
    source: "Categorizing Variants of Goodhart's Law",

    target: "The Global Priorities Institute's Research Agenda",

    distance: 100,

    reasoning: "",
  },

  {
    source: "The Vulnerable World Hypothesis",

    target: "The Global Priorities Institute's Research Agenda",

    distance: 10,

    reasoning: "",
  },

  {
    source: "Reversals in Psychology",

    target: "A Model of Patient Spending and Movement Building",

    distance: 10,

    reasoning:
      "RiP: Cleaning up 10,000 people's brains a bit.\nMPS: far more important topic",
  },

  {
    source: "Database of orgs relevant to longtermist/x-risk work",

    target:
      "What are some low-information priors that you find practically useful for thinking about the world?",

    distance: "5",

    reasoning:
      "\nDatabase just saves a bit of time, maybe 100 counterfactual applications",
  },

  {
    source: "Reversals in Psychology",

    target: "Database of orgs relevant to longtermist/x-risk work",

    distance: 1,

    reasoning: "",
  },

  {
    source: "Database of orgs relevant to longtermist/x-risk work",

    target: "A Model of Patient Spending and Movement Building",

    distance: 10,

    reasoning: "",
  },

  {
    source:
      "What are some low-information priors that you find practically useful for thinking about the world?",

    target: "A Model of Patient Spending and Movement Building",

    distance: 2,

    reasoning: "",
  },

  {
    source: "Center for Election Science EA Wiki stub",

    target:
      "Extinguishing or preventing coal seam fires is a potential cause area",

    distance: 1000,

    reasoning: "",
  },

  {
    source: "A comment on setting up a charity",

    target: "Center for Election Science EA Wiki stub",

    distance: 10,

    reasoning: "",
  },

  {
    source: "A comment on setting up a charity",

    target: "Reversals in Psychology",

    distance: 200,

    reasoning: "",
  },

  {
    source: "Center for Election Science EA Wiki stub",

    target: "Reversals in Psychology",

    distance: 20,

    reasoning: "",
  },

  {
    source: "Reversals in Psychology",

    target:
      "Extinguishing or preventing coal seam fires is a potential cause area",

    distance: "50",

    reasoning: "",
  },

  {
    source: "Database of orgs relevant to longtermist/x-risk work",

    target:
      "Extinguishing or preventing coal seam fires is a potential cause area",

    distance: "50",

    reasoning: "",
  },

  {
    source:
      "What are some low-information priors that you find practically useful for thinking about the world?",

    target:
      "Extinguishing or preventing coal seam fires is a potential cause area",

    distance: "10",

    reasoning: "",
  },

  {
    source: "A Model of Patient Spending and Movement Building",

    target:
      "Extinguishing or preventing coal seam fires is a potential cause area",

    distance: 1,

    reasoning: "",
  },

  {
    source: "A comment on setting up a charity",

    target: "Shallow evaluations of longtermist organizations",

    distance: 1000,

    reasoning: "",
  },

  {
    source: "Center for Election Science EA Wiki stub",

    target: "Shallow evaluations of longtermist organizations",

    distance: 100,

    reasoning: "",
  },

  {
    source: "Reversals in Psychology",

    target: "Shallow evaluations of longtermist organizations",

    distance: 100,

    reasoning: "",
  },

  {
    source: "Database of orgs relevant to longtermist/x-risk work",

    target: "Shallow evaluations of longtermist organizations",

    distance: 100,

    reasoning: "",
  },
];

async function pushToMongoManually() {
  let response = await axios.post(
    "http://metaforecast-twitter-bot.herokuapp.com/utility-function-extractor",
    {
      data: data,
    }
  );
  console.log(response);
}
pushToMongoManually();

