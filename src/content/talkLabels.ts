// Topic and type labels for each talk, checked by three independent reviews of every CV entry (a keyword rule alone
// mislabelled many: e.g. "Machine Learning" as education, or a host organisation as a topic). Keys are the first 200
// letters/digits of the CV entry; entries not listed here (new talks) fall back to the keyword rules in the talks page.
export type TalkLabel = { kind: string; topics: string[] };
export const talkKey = (text: string) => text.toLowerCase().replace(/[^a-z0-9]+/g, "").slice(0, 200);

export const talkLabels: Record<string, TalkLabel> = {
  // Instructor, training workshop at beIN Media, “Agentic AI and
  "instructortrainingworkshopatbeinmediaagenticaiandthelimitsofautomationwhymoreautomationdoesnotmeanbettermediamay21st2026dohaqatar": { kind: "Tutorial / workshop", topics: [] },
  // Guest Lecturer, “Digital Twins in Healthcare”, MEDI210 Cours
  "guestlecturerdigitaltwinsinhealthcaremedi210courseaiinmedicinecollegeofmedicineqataruniversityapril2026": { kind: "Lecture / course", topics: ["digital-twins", "healthcare"] },
  // Guest Lecturer, “Multiplex Systemics Meets Agentic AI: Criti
  "guestlecturermultiplexsystemicsmeetsagenticaicriticalsystemsthinkingfordecisionmakinginacomplexworldphdresearchseminaronaiandinterdisciplinaryperspectivescollegeofbusinessandeconomicsqataruniversityap": { kind: "Lecture / course", topics: ["multiplexity"] },
  // Presenter, “Towards Ethical and Effective AI-Augmented Resea
  "presentertowardsethicalandeffectiveaiaugmentedresearchwritingaconceptualframeworkandpracticalguidelinesresearchworkshopseriesresearchandgraduatestudiessectionqataruniversitymarch2026": { kind: "Tutorial / workshop", topics: ["ai-ethics", "education"] },
  // Presenter, “Integrating Islamic Spirituality and Generative 
  "presenterintegratingislamicspiritualityandgenerativeaiinmentalhealthpromisepitfallsandpathwaysforward2ndinternationalsymposiumonislamicpsychologyintegratingislamicspiritualityacrossmentalhealthservice": { kind: "Invited / conference talk", topics: ["healthcare", "islamic"] },
  // Presenter, “Multiplex Systemics for AI Governance and Open C
  "presentermultiplexsystemicsforaigovernanceandopencivilizationusultalkusulacademyjanuary2026": { kind: "Invited / conference talk", topics: ["ai-governance", "multiplexity"] },
  // Presenter, “Towards Ethical and Effective AI-Augmented Learn
  "presentertowardsethicalandeffectiveaiaugmentedlearningamultiplexframeworkqucenterforexcellenceinteachingandlearningcetl17thannualforumonexcellenceinteachingandlearningteachingexcellenceintheageofintel": { kind: "Invited / conference talk", topics: ["ai-ethics", "education", "multiplexity"] },
  // Conference presentation, “Multiplex Systemics: A Both-And Fr
  "conferencepresentationmultiplexsystemicsabothandframeworkforaiimplementationincrisisresponsesettingsdrivingchangeregionalconferenceonhealthandemergingfieldsinimplementationscience2025december2025": { kind: "Invited / conference talk", topics: ["healthcare", "multiplexity"] },
  // Presenter, “Toward an Ummatic Vision for Advanced AI”, Ummat
  "presentertowardanummaticvisionforadvancedaiummaticsinstitutedecember2025": { kind: "Invited / conference talk", topics: ["islamic"] },
  // Master Class Presenter, “Multiplex Digital Twins: AI-Driven 
  "masterclasspresentermultiplexdigitaltwinsaidriventwinsforsmarterhealthmanagementworldaisummitqatardohadecember2025": { kind: "Tutorial / workshop", topics: ["digital-twins", "healthcare", "multiplexity"] },
  // Invited talk titled, “Ethical Considerations in the Use of A
  "invitedtalktitledethicalconsiderationsintheuseofaiinhealthcareatthe1stqatarconferenceonlaboratorymedicineandpathologyorganizedbythedepartmentoflaboratorymedicineandpathologyatthehamadmedicalcorporatio": { kind: "Invited / conference talk", topics: ["ai-ethics", "healthcare"] },
  // Invited talk titled, “Generative AI in Engineering Education
  "invitedtalktitledgenerativeaiinengineeringeducationinsightsfromgptclassroomsandmultiagentlearningexperimentscollegeofengineeringqataruniversityoctober2025": { kind: "Invited / conference talk", topics: ["education"] },
  // Invited talk titled, “Generative AI in Higher Education: Les
  "invitedtalktitledgenerativeaiinhighereducationlessonsfromgptclassroomsandapplicationsinstudentprojectscollegeofbusinessandeconomicsqataruniversityseptember2025": { kind: "Invited / conference talk", topics: ["education"] },
  // Invited talk “AI for social good: a critical multiplex appro
  "invitedtalkaiforsocialgoodacriticalmultiplexapproachatthe3rdpakistannationalschoolofpublicpolicynspppublicpolicyconferenceonartificialintelligenceinpublicpolicyandgovernanceaugust262025lahorepakistan": { kind: "Invited / conference talk", topics: ["ai-governance", "multiplexity"] },
  // Plenary talk titled, “Multiplex Systemics: Toward a More Hol
  "plenarytalktitledmultiplexsystemicstowardamoreholisticphilosophyoftechnologyinternationalhybridsymposiumonfundamentalsandadvancementsofbiomedicalandhealthcarecircuitsandsystemsjointlyhostedbycissgloba": { kind: "Keynote / plenary", topics: ["multiplexity"] },
  // Conference presentation titled, “AI for Learning and Teachin
  "conferencepresentationtitledaiforlearningandteachingthearabiclanguageanalyticalperspectivesconferenceonteachingarabictononnativespeakersinthedigitalspaceorganizedbythearabicfornonnativespeakerscentera": { kind: "Invited / conference talk", topics: ["education"] },
  // “Promise and Opportunities of Digital Twins: Multiplex Think
  "promiseandopportunitiesofdigitaltwinsmultiplexthinkingintheageofcomplexityatthe2ndinternationalconferenceonmarineengineeringtechnologyicmet2025muscatomannovember2025": { kind: "Invited / conference talk", topics: ["digital-twins", "multiplexity"] },
  // Master Class, “Multiplex Digital Twins: AI-Driven Twins for 
  "masterclassmultiplexdigitaltwinsaidriventwinsforsmarterhealthmanagementworldaisummitdohaqatardecember2025": { kind: "Tutorial / workshop", topics: ["digital-twins", "healthcare", "multiplexity"] },
  // Panel Member, “Bots, Brains, and Balance: The New Graduate R
  "panelmemberbotsbrainsandbalancethenewgraduateresearchequationresearchgraduatestudiessectorgraduatestudiesofficeqataruniversityseptember2025": { kind: "Panel", topics: ["education"] },
  // Panel Member, “Let's Address the Elepha(AI)nt in the Room – 
  "panelmemberletsaddresstheelephaaintintheroomimpactofgenerativeaiineducationandintheworkforceieeeeducon2025roundtablediscussionapril2025": { kind: "Panel", topics: ["education"] },
  // Panel Member, “Grand Debate: Bridging the Gap—Translating Ph
  "panelmembergranddebatebridgingthegaptranslatingpharmaceuticalresearchintoclinicalpracticeattheinternationalpharmacyeducationscienceandpracticeconference2025dohaqatarapril2025": { kind: "Panel", topics: ["healthcare"] },
  // Conference presentation titled, “Intelligence Amplification:
  "conferencepresentationtitledintelligenceamplificationahumancenteredapproachtoaimediatededucationandprofessionsin17thworldcongressofbioethicsdohaqatarjune2024": { kind: "Invited / conference talk", topics: ["ai-ethics", "education", "healthcare"] },
  // Conference presentation titled, “Ethics of Generative & Virt
  "conferencepresentationtitledethicsofgenerativevirtualexperiencesinmedicinein17thworldcongressofbioethicsdohaqatarjune2024": { kind: "Invited / conference talk", topics: ["ai-ethics", "healthcare"] },
  // “The Ghazalian Project for the AI Era: A Multiplex Critical 
  "theghazalianprojectfortheaieraamultiplexcriticalaiapproachfirstsymposiumoncomparativeeducationghazalioneducationcontemporarypracticalapplicationsfromanenduringlegacyorganizedbycollegeofislamicsciences": { kind: "Invited / conference talk", topics: ["education", "islamic", "multiplexity"] },
  // “Educating for the AI Revolution”, Invited Talk at the Bridg
  "educatingfortheairevolutioninvitedtalkatthebridgingfrontiersadvancementsinaiandsocialsciencesworkshoporganizedatthecollegeofislamicstudieshamadbinkhalifauniversityfebruary2024": { kind: "Invited / conference talk", topics: ["education"] },
  // “Educating for the AI Revolution: Fostering a Holistic Human
  "educatingfortheairevolutionfosteringaholistichumancenteredapproachbasedonwisdomandmultiplexityinvitedtalkatthegenerativeaiworkshopatdaralhekmacollegejeddahkingdomofsaudiarabiafebruary2024": { kind: "Invited / conference talk", topics: ["education", "multiplexity"] },
  // “Developing Trustworthy Educational Metaverses using Open So
  "developingtrustworthyeducationalmetaversesusingopensourcegenaiandmixedrealitymrtechnologiestutorialatieeeeducon2024kosgreecemay2024": { kind: "Tutorial / workshop", topics: ["ai-ethics", "education"] },
  // “The GUIDES Framework: Enhancing Engineering Education with 
  "theguidesframeworkenhancingengineeringeducationwithgenaifullworkshop15hoursattheengineeringeducationandinstructionaltechnologiesconferenceeeitc24conferenceorganizedbyqucollegeofengineeringandcollegeof": { kind: "Tutorial / workshop", topics: ["education"] },
  // Panel Member, Ethical Dimensions of AI-Mediated Healthcare: 
  "panelmemberethicaldimensionsofaimediatedhealthcareissuesofautomationaugmentationandauthenticitypanel2717thworldcongressofbioethicsdohaqatarjune2024": { kind: "Panel", topics: ["ai-ethics", "healthcare"] },
  // “Introduction to Generative AI: Tutorial and Ethical Issues”
  "introductiontogenerativeaitutorialandethicalissuesinvitedtalkatcenterofislamiclegislationandethicscilecollegeofislamicstudiescishamadbinkhalifauniversityhbkuaugust2023": { kind: "Tutorial / workshop", topics: ["ai-ethics"] },
  // “Educating for the AI Revolution: Fostering a Holistic Human
  "educatingfortheairevolutionfosteringaholistichumancenteredapproachbasedonwisdomandmultiplexityplenarytalk14thexcellenceineducationandlearningforumqataruniversitycenterofexcellenceinteachingandlearning": { kind: "Keynote / plenary", topics: ["education", "multiplexity"] },
  // “Engineering and Computing Education for the 21st Century: A
  "engineeringandcomputingeducationforthe21stcenturyastudentprimeracmdistinguishedspeakerprogramlectureuniversityoftechnologyandappliedsciencesibriomanmarch2023": { kind: "Invited / conference talk", topics: ["education"] },
  // “Education in the Era of ChatGPT and Generative AI”, talk gi
  "educationintheeraofchatgptandgenerativeaitalkgiventoqataruniversityqufacultyorganizedbycenterforexcellenceinteachingandlearningqataruniversitymarch2023": { kind: "Invited / conference talk", topics: ["education"] },
  // “Engineering Education in the Era of ChatGPT: Promise and Pi
  "engineeringeducationintheeraofchatgptpromiseandpitfallsofgenerativeaiforeducationtalkgiventoqataruniversitycollegeofengineeringfacultyorganizedbytechnologyinnovationandengineeringeducationtieeqataruni": { kind: "Invited / conference talk", topics: ["education"] },
  // “Engineering Education in the Age of ChatGPT and Exponential
  "engineeringeducationintheageofchatgptandexponentialaiastudentprimertalkgiventoqataruniversitystudentsorganizedbytechnologyinnovationandengineeringeducationtieeqataruniversityfeb2023": { kind: "Invited / conference talk", topics: ["education"] },
  // “Islamic ethics and AI”, invited talk given at The Future of
  "islamicethicsandaiinvitedtalkgivenatthefutureofmuslimtechprospectsandchallengesorganizedbylorentzinstituteleidenuniversityjanuary2023": { kind: "Invited / conference talk", topics: ["ai-ethics", "islamic"] },
  // Plenary Speaker, 14th Excellence in Education and Learning F
  "plenaryspeaker14thexcellenceineducationandlearningforumqataruniversitycenterofexcellenceinteachingandlearningcetljune2023": { kind: "Keynote / plenary", topics: ["education"] },
  // “Augmentation Through Generative AI and ChatGPT: Hands-On Wo
  "augmentationthroughgenerativeaiandchatgpthandsonworkshopforstudentsandresearchers4dayhandsonworkshopforstudentsandresearchersaugust7toaugust102023": { kind: "Lecture / course", topics: ["education"] },
  // “A Holistic Education for the 21st Century Engineer Based on
  "aholisticeducationforthe21stcenturyengineerbasedonwisdomandmultiplexityte2022thefutureofengineeringconferencehostedbymitsystemdesignandmanagementcambridgemausajuly2022": { kind: "Invited / conference talk", topics: ["education", "multiplexity"] },
  // “Safe and Trustworthy Artificial Intelligence”, AI Week 2022
  "safeandtrustworthyartificialintelligenceaiweek2022qataruniversitymarch2022": { kind: "Invited / conference talk", topics: ["ai-ethics"] },
  // “Introduction to Neural Networks and Deep Learning: Fundamen
  "introductiontoneuralnetworksanddeeplearningfundamentalsandhandsonimplementationieeeituihsanlabsummercoursejuly2022": { kind: "Lecture / course", topics: ["networks"] },
  // “Effective 21st Century/Beyond 2020 Computer Scientist and E
  "effective21stcenturybeyond2020computerscientistandengineersessentialcompetenciesallpakistantechandartfestival21gcuacmstudentchapterjune2021": { kind: "Invited / conference talk", topics: ["education"] },
  // “AI's Governance and Ethical Dilemmas”, 2021 International C
  "aisgovernanceandethicaldilemmas2021internationalconferenceondigitalfuturesandtransformativetechnologiesicodt2islamabadpakistanmay2021": { kind: "Keynote / plenary", topics: ["ai-ethics", "ai-governance"] },
  // “Safe and Trustworthy Artificial Intelligence”, First Intern
  "safeandtrustworthyartificialintelligencefirstinternationalconferenceonartificialintelligencedataanalyticscaidaapril2021": { kind: "Invited / conference talk", topics: ["ai-ethics"] },
  // Invited Keynote Speaker, AI's Governance and Ethical Dilemma
  "invitedkeynotespeakeraisgovernanceandethicaldilemmas2021internationalconferenceondigitalfuturesandtransformativetechnologiesicodt2islamabadpakistanmay2021": { kind: "Keynote / plenary", topics: ["ai-ethics", "ai-governance"] },
  // Moderator of Panel Discussion on “Artificial Intelligence: T
  "moderatorofpaneldiscussiononartificialintelligencetheoreticalfoundationsapplicationsandgoverningpoliciesorganizedbytheresearchcenterforislamiclegislationandethicscilehamadbinkhalifauniversityhbkuqatar": { kind: "Panel", topics: ["ai-ethics", "ai-governance"] },
  // Panel Member, Panel on Privacy, Regulation, & Surveillance C
  "panelmemberpanelonprivacyregulationsurveillancecapitalismdigitalbucketaisummit30thmarch2021": { kind: "Panel", topics: ["ai-governance"] },
  // “COVID Infodemic & the AI-Driven Hype Machine”, organized by
  "covidinfodemictheaidrivenhypemachineorganizedbyhealthsecuritypartnersandaghakhanuniversityakuhospital19thdecember2020": { kind: "Invited / conference talk", topics: ["healthcare"] },
  // “Ethics of Artificial Intelligence”, Distinguished Speaker S
  "ethicsofartificialintelligencedistinguishedspeakerseriesofaidalabprincesultanuniversitynovember2020": { kind: "Invited / conference talk", topics: ["ai-ethics"] },
  // “Outcome Based Education: International Practices”, Informat
  "outcomebasededucationinternationalpracticesinformationtechnologyuniversitynovember2020": { kind: "Invited / conference talk", topics: ["education"] },
  // “Essential Skills for Effective 21st Century Engineers and S
  "essentialskillsforeffective21stcenturyengineersandscientistsnustwebinarseriesjune2020availableonlineathttpswwwyoutubecomwatchvu5uhfyuksz8": { kind: "Invited / conference talk", topics: ["education"] },
  // “How to Thrive in Post-COVID19 Outcome Based Education”, Inf
  "howtothriveinpostcovid19outcomebasededucationinformationtechnologyuniversitymay2020availableonlineathttpswwwyoutubecomwatchv1n9ms7m8tyk": { kind: "Invited / conference talk", topics: ["education"] },
  // Invited Tutorial Speaker, “Adversarial Machine Learning & Co
  "invitedtutorialspeakeradversarialmachinelearningcognitivenetworks6thinternationalconferenceondatascienceandmachinelearningapplicationscdma2020march452020": { kind: "Tutorial / workshop", topics: ["networks"] },
  // Session Chair, IEEE Global Communications Conference (GLOBEC
  "sessionchairieeeglobalcommunicationsconferenceglobecom2020securityandprivacyiniotii": { kind: "Session chair", topics: ["networks"] },
  // “Adversarial Machine Learning & Vehicular Networks: Strategi
  "adversarialmachinelearningvehicularnetworksstrategiesforattackrobustdefenseattheieee89thvehiculartechnologyconferencevtc2019springkualalumpur2019copresenterwithalaalfuqahaandmuhammadshafique": { kind: "Invited / conference talk", topics: ["networks"] },
  // “Adversarial Machine Learning & Cognitive Networks: Strategi
  "adversarialmachinelearningcognitivenetworksstrategiesforattackrobustdefenseat15thinternationalwirelesscommunicationsmobilecomputingconferenceiwcmc2019copresenterwithalaalfuqaha": { kind: "Invited / conference talk", topics: ["networks"] },
  // “On Analyzing Self-Driving Networks: A Systems Thinking Appr
  "onanalyzingselfdrivingnetworksasystemsthinkingapproachieeecomsocsummerschool2018lahoreuniversityofmanagementscienceslumsaugust2018": { kind: "Invited / conference talk", topics: ["networks"] },
  // Distinguished Invited Talk, 11th IEEE International Conferen
  "distinguishedinvitedtalk11thieeeinternationalconferenceonopensourcesystemsandtechnologiesicosst2017lahoredecember2017": { kind: "Invited / conference talk", topics: [] },
  // Plenary Speaker, IEEE International Conference On Latest tre
  "plenaryspeakerieeeinternationalconferenceonlatesttrendsinelectricalengineeringcomputingtechnologiesintellectkarachipakistannovember2017": { kind: "Keynote / plenary", topics: [] },
  // Invited Keynote Speaker, International Wireless Communicatio
  "invitedkeynotespeakerinternationalwirelesscommunicationsmobilecomputingconferenceiwcmcconferenceenabling5gtosupportverticalindustriesworkshopvalenciaspainjune2017": { kind: "Keynote / plenary", topics: ["networks"] },
  // Session Chair, International Wireless Communications & Mobil
  "sessionchairinternationalwirelesscommunicationsmobilecomputingconferenceiwcmc2017": { kind: "Session chair", topics: ["networks"] },
  // “Learning 101 for the Online Era” at the Virtual University 
  "learning101fortheonlineeraatthevirtualuniversityvu3rdelearninganddistanceeducationconferenceeldecconferenceinlahorepakistanon15thmarch2016": { kind: "Invited / conference talk", topics: ["education"] },
  // “Big Data for Development”, University of Lancaster, UK, 26 
  "bigdatafordevelopmentuniversityoflancasteruk26february2016": { kind: "Invited / conference talk", topics: ["networks"] },
  // “Big Data for Development”, University of Stirling, UK, 12 F
  "bigdatafordevelopmentuniversityofstirlinguk12february2016": { kind: "Invited / conference talk", topics: ["networks"] },
  // “Big Data for Development”, Computer Laboratory, University 
  "bigdatafordevelopmentcomputerlaboratoryuniversityofcambridgeuk09february2016": { kind: "Invited / conference talk", topics: ["networks"] },
  // Panel Discussion Member, “Global Internet Access: An Operato
  "paneldiscussionmemberglobalinternetaccessanoperatorsviewacmsigcommglobalaccesstotheinternetforallgaia2016": { kind: "Panel", topics: ["networks"] },
  // “How To do Your Best Research”, Second Workshop on “Effectiv
  "howtodoyourbestresearchsecondworkshoponeffectivepracticesinresearchseecsnustpakistan18november2015": { kind: "Tutorial / workshop", topics: [] },
  // “Personal Reflections on Teaching Practices”, First Workshop
  "personalreflectionsonteachingpracticesfirstworkshoponbestpracticesinteachingseecsnustpakistan06august2015": { kind: "Tutorial / workshop", topics: ["education"] },
  // “Building your own Cloud with OpenStack” at ACM Frontiers of
  "buildingyourowncloudwithopenstackatacmfrontiersofinformationtechnologyfitdecember2014copresenterwithmoizarifandwaqasriazofxflowresearchinc": { kind: "Invited / conference talk", topics: ["networks"] },
  // Session Chair, IEEE International Conference on Emerging Tec
  "sessionchairieeeinternationalconferenceonemergingtechnologiesicet2013": { kind: "Session chair", topics: [] },
  // Session Chair, ACM Frontiers of Information Technology (FIT)
  "sessionchairacmfrontiersofinformationtechnologyfit2013": { kind: "Session chair", topics: [] },
  // Panel Member, Panel on Ethics of AI in Surgery at the 9th AK
  "panelmemberpanelonethicsofaiinsurgeryatthe9thakuannualsurgicalconference9aascorganizedbytheagakhanuniversity": { kind: "Panel", topics: ["ai-ethics", "healthcare"] },
};
